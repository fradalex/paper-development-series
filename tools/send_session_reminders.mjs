/** Schedule one-week and day-of seminar reminders through Kit's Broadcast API.
 * Run locally without --send to preview decisions. Requires KIT_API_KEY to send.
 */
import fs from 'node:fs';
import vm from 'node:vm';

const dataSource = fs.readFileSync(new URL('../site-data.js', import.meta.url), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox, { timeout: 1000 });
const sessions = sandbox.window.PDS_DATA.sessions;
const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());
const dateOnly = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '');
const dayDifference = (later, earlier) =>
  (Date.parse(`${later}T00:00:00Z`) - Date.parse(`${earlier}T00:00:00Z`)) / 86400000;
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const prettyDate = value => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${value}T12:00:00Z`));
const send = process.argv.includes('--send');

if (send && !process.env.KIT_API_KEY) {
  console.log('KIT_API_KEY is absent; reminders are inactive.');
  process.exit(0);
}

async function kit(method, path, body) {
  const response = await fetch(`https://api.kit.com/v4${path}`, {
    method,
    headers: { 'X-Kit-Api-Key': process.env.KIT_API_KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`Kit ${method} ${path} returned ${response.status}: ${await response.text()}`);
  return response.json();
}

async function existingReminders() {
  const descriptions = new Set();
  let cursor;
  do {
    const query = new URLSearchParams({ slim: 'true', per_page: '500' });
    if (cursor) query.set('after', cursor);
    const result = await kit('GET', `/broadcasts?${query}`);
    for (const broadcast of result.broadcasts || []) {
      if (broadcast.status !== 'aborted' && broadcast.description) descriptions.add(broadcast.description);
    }
    cursor = result.pagination?.has_next_page ? result.pagination.end_cursor : undefined;
  } while (cursor);
  return descriptions;
}

function message(session, kind) {
  const when = prettyDate(session.date);
  const title = escape(session.title.trim());
  const speaker = escape(session.speaker.trim());
  const speakerLabel = /,|\s+and\s+|\s*&\s*/i.test(session.speaker.trim()) ? 'Speakers' : 'Speaker';
  const affiliation = typeof session.affiliation === 'string' ? session.affiliation.trim() : '';
  const schedule = [when, session.time?.trim()].filter(Boolean).map(escape).join(' · ');
  const venue = session.location?.trim();
  const link = session.link?.trim();
  const safeLink = link && /^https:\/\/[^\s"<>]+$/i.test(link) ? link : '';
  const heading = kind === 'week' ? 'Coming up next week' : 'Today’s discussion';
  const parts = [
    `<p>${heading} in the Paper Development Series:</p>`,
    `<h2>${title}</h2>`,
    `<p><strong>${speakerLabel}:</strong> ${speaker}`,
    affiliation ? `<br><strong>${speakerLabel === 'Speakers' ? 'Affiliations' : 'Affiliation'}:</strong> ${escape(affiliation)}` : '',
    `<br><strong>When:</strong> ${schedule}`,
    venue ? `<br><strong>Where:</strong> ${escape(venue)}` : '',
    '</p>',
    session.description?.trim() ? `<p>${escape(session.description.trim())}</p>` : '',
    safeLink ? `<p><a href="${escape(safeLink)}">Join the online discussion</a></p>` : '',
    '<p>We look forward to discussing the work together.</p>',
    '<p>Paper Development Series</p>',
  ];
  return {
    subject: `${kind === 'week' ? 'Next week' : 'Today'}: ${session.title.trim()} | Paper Development Series`,
    preview_text: `${speaker} · ${schedule}`,
    content: parts.join(''),
  };
}

const candidates = sessions.flatMap(session => {
  if (session.reminders === false) return [];
  if (!dateOnly(session.date) || !session.speaker?.trim() || !session.title?.trim()) return [];
  if ([session.speaker.trim(), session.title.trim()].some(value => /^tbd$/i.test(value))) return [];
  // A reminder needs a clear time. No guessed start time is sent to subscribers.
  if (!session.time?.trim()) return [];
  const days = dayDifference(session.date, today);
  if (days !== 7 && days !== 0) return [];
  return [{ session, kind: days === 7 ? 'week' : 'today',
    // Stable across edits to title, description and link on the sending day.
    marker: `PDS reminder | ${session.date} | ${session.time.trim()} | ${days === 7 ? 'week' : 'today'}` }];
});

if (!candidates.length) {
  console.log(`${today}: no confirmed sessions due for a reminder.`);
  process.exit(0);
}

const known = send ? await existingReminders() : new Set();
for (const { session, kind, marker } of candidates) {
  if (known.has(marker)) {
    console.log(`${marker}: already exists in Kit; skipping.`);
    continue;
  }
  if (!send) {
    console.log(`${marker}: ready to schedule (dry run).`);
    continue;
  }
  // Allow Kit time to queue a broadcast. If Actions is delayed, send later that day.
  const sendAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const result = await kit('POST', '/broadcasts', {
    ...message(session, kind),
    description: marker,
    public: false,
    published_at: sendAt,
    send_at: sendAt,
    email_address: 'info@paperdevelopmentseries.org',
    subscriber_filter: [{ all: [{ type: 'all_subscribers' }] }],
  });
  if (result.broadcast?.status !== 'scheduled') {
    throw new Error(`Kit did not confirm scheduling for ${marker}; inspect broadcast ${result.broadcast?.id ?? 'unknown'}.`);
  }
  known.add(marker);
  console.log(`${marker}: scheduled in Kit as broadcast ${result.broadcast.id}.`);
}
