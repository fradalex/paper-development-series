/** Schedule one-week and day-of seminar reminders through Kit's Broadcast API.
 * Run locally without --send to preview decisions. Requires KIT_API_KEY to send.
 */
import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const localDate = now => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(now);
const dateOnly = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '');
const dayDifference = (later, earlier) =>
  (Date.parse(`${later}T00:00:00Z`) - Date.parse(`${earlier}T00:00:00Z`)) / 86400000;
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const prettyDate = value => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${value}T12:00:00Z`));
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
  const broadcasts = [];
  let cursor;
  do {
    const query = new URLSearchParams({ per_page: '500' });
    if (cursor) query.set('after', cursor);
    const result = await kit('GET', `/broadcasts?${query}`);
    for (const broadcast of result.broadcasts || []) {
      if (broadcast.description?.startsWith('PDS reminder | ')) broadcasts.push(broadcast);
    }
    cursor = result.pagination?.has_next_page ? result.pagination.end_cursor : undefined;
  } while (cursor);
  return broadcasts;
}

function mailingAudience() {
  console.log('Audience: all Kit subscribers (Kit excludes unsubscribed and unconfirmed contacts).');
  return [{ all: [{ type: 'all_subscribers' }] }];
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

// 10:00 Italy time, including the UTC offset on the actual sending date.
export function tenInRome(date) {
  const probe = new Date(`${date}T10:00:00Z`);
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome', hour: '2-digit', hourCycle: 'h23',
  }).format(probe));
  return new Date(probe.getTime() - (hour - 10) * 3600000).toISOString();
}

export function planReminders(sessions, now) {
  const today = localDate(now);
  const all = sessions.flatMap(session => {
    if (session.reminders === false) return [];
    if (!dateOnly(session.date) || !session.speaker?.trim() || !session.title?.trim()) return [];
    if ([session.speaker.trim(), session.title.trim()].some(value => /^tbd$/i.test(value))) return [];
    if (!session.time?.trim()) return [];
    return [7, 0].map(days => {
      const date = new Date(Date.parse(`${session.date}T12:00:00Z`) - days * 86400000).toISOString().slice(0, 10);
      const kind = days === 7 ? 'week' : 'today';
      return { session, kind, date, sendAt: tenInRome(date),
        marker: `PDS reminder | ${session.date} | ${session.time.trim()} | ${kind}` };
    });
  });
  // Past dates are never caught up automatically. Today can be recovered late.
  const candidates = all.filter(item => {
    const days = dayDifference(item.date, today);
    return days >= 0 && days <= 7;
  });
  if (new Set(all.map(item => item.marker)).size !== all.length) {
    throw new Error('Two sessions have the same date and time. Give them distinct times before scheduling.');
  }
  return { all, candidates };
}

export async function runReminders(sessions, now = new Date(), send = false) {
  const { all, candidates } = planReminders(sessions, now);
  console.log(`Planning on ${localDate(now)}: ${candidates.length} reminders for today and the next seven days.`);
  if (!send) {
    for (const item of candidates) console.log(`${item.marker}: ${item.sendAt} (dry run; overdue today will be queued in ten minutes).`);
    return;
  }
  if (!process.env.KIT_API_KEY) throw new Error('KIT_API_KEY is missing. Add it as a GitHub Actions repository secret.');
  const audience = mailingAudience();
  const existing = await existingReminders();
  const desired = new Map(all.map(item => [item.marker, item]));
  const known = new Map();
  for (const broadcast of existing) {
    if (broadcast.status === 'aborted') continue;
    if (known.has(broadcast.description)) throw new Error(`Duplicate reminder records in Kit: ${broadcast.description}. Review these in Kit.`);
    known.set(broadcast.description, broadcast);
    // Remove a cancelled/moved session from the sending queue, retaining a draft.
    // Sent/sending records are immutable; no other newsletters are touched.
    if (broadcast.status === 'scheduled' && !desired.has(broadcast.description)) {
      const result = await kit('PUT', `/broadcasts/${broadcast.id}`, {
        send_at: null, public: false,
        description: broadcast.description.replace('PDS reminder | ', 'PDS cancelled | '),
      });
      if (result.broadcast?.status !== 'draft') throw new Error(`Could not confirm cancellation of broadcast ${broadcast.id}. Check Kit before proceeding.`);
      console.log(`Cancelled outdated reminder ${broadcast.id}; retained as a draft.`);
    }
  }
  // Also reconcile previously booked future reminders even if now outside the window.
  const pending = new Map(candidates.map(item => [item.marker, item]));
  for (const broadcast of existing) {
    const item = desired.get(broadcast.description);
    if (item && broadcast.status === 'scheduled' && item.date >= localDate(now)) pending.set(item.marker, item);
  }
  for (const { session, kind, marker, sendAt } of pending.values()) {
    const prior = known.get(marker);
    if (prior && ['completed', 'sending'].includes(prior.status)) {
      console.log(`${marker}: already sent or sending; skipping.`);
      continue;
    }
    if (prior && !['scheduled', 'draft'].includes(prior.status)) {
      throw new Error(`Unexpected status for broadcast ${prior.id}: ${prior.status}; inspect Kit.`);
    }
    const email = message(session, kind);
    // Do not push an existing scheduled broadcast back on every retry.
    const actualSendAt = prior?.status === 'scheduled' ? prior.send_at
      : new Date(Math.max(Date.parse(sendAt), now.getTime() + 10 * 60000)).toISOString();
    const body = { ...email, description: marker, public: false,
      published_at: actualSendAt, send_at: actualSendAt,
      email_address: 'info@paperdevelopmentseries.org', subscriber_filter: audience };
    if (prior?.status === 'scheduled') {
      // Avoid racing Kit once a queued message reaches its sending time.
      if (Date.parse(prior.send_at) <= now.getTime() + 60000) {
        console.log(`${marker}: already queued for delivery; skipping.`);
        continue;
      }
      const unchanged = Object.entries(email).every(([key, value]) => prior[key] === value)
        && JSON.stringify(prior.subscriber_filter) === JSON.stringify(audience)
        && prior.email_address === body.email_address;
      if (unchanged) {
        console.log(`${marker}: already scheduled in Kit for ${prior.send_at}; skipping.`);
        continue;
      }
    }
    const result = await kit(prior ? 'PUT' : 'POST', prior ? `/broadcasts/${prior.id}` : '/broadcasts', body);
    if (result.broadcast?.status !== 'scheduled') {
      throw new Error(`Kit did not confirm scheduling for ${marker}; inspect broadcast ${result.broadcast?.id ?? prior?.id ?? 'unknown'}.`);
    }
    console.log(`${marker}: ${prior ? 'updated' : 'scheduled'} in Kit as broadcast ${result.broadcast.id} for ${actualSendAt}.`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dataSource = fs.readFileSync(new URL('../site-data.js', import.meta.url), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(dataSource, sandbox, { timeout: 1000 });
  if (process.argv.includes('--check')) {
    if (!process.env.KIT_API_KEY) throw new Error('KIT_API_KEY is missing.');
    mailingAudience();
    await existingReminders();
    console.log('Kit API connection is ready; broadcasts target all subscribers. No emails were scheduled.');
  } else {
    await runReminders(sandbox.window.PDS_DATA.sessions, new Date(), process.argv.includes('--send'));
  }
}
