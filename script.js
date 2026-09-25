(() => {
  'use strict';
  const data = window.PDS_DATA || {};
  const $ = id => document.getElementById(id);
  const isValidDate = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + 'T12:00:00');
    return !Number.isNaN(date.getTime()) && [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-') === value;
  };
  const sessions = Array.isArray(data.sessions) ? data.sessions.filter(s => s && isValidDate(s.date) && s.title && s.speaker) : [];
  const excludedDates = new Set(Array.isArray(data.excludedDates) ? data.excludedDates.filter(isValidDate) : []);
  const today = new Date();
  const localDay = () => {
    const date = new Date();
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  };
  const formatDate = value => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value + 'T12:00:00'));
  const el = (tag, className, value) => { const node = document.createElement(tag); if (className) node.className = className; if (value != null) node.textContent = value; return node; };
  const validLink = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } };
  const dialog = $('session-dialog');
  const dialogContent = $('session-dialog-content');
  const archiveScroll = $('archive-scroll');
  const upcomingScroll = $('upcoming-scroll');
  const upcomingList = $('upcoming-list');
  const archiveList = $('past-list');
  let lastSessionTrigger;

  function openSessionCard(session, trigger) {
    lastSessionTrigger = trigger;
    const title = el('h3', 'session-dialog-title', session.title);
    title.id = 'session-dialog-title';
    dialogContent.replaceChildren(el('p', 'session-dialog-date', formatDate(session.date)), title);
    dialogContent.append(el('p', 'session-dialog-speaker', session.speaker));
    if (session.placeholder) dialogContent.append(el('p', 'session-dialog-abstract', 'Speaker and paper details will be announced.'));
    if (session.affiliation) dialogContent.append(el('p', 'session-dialog-affiliation', session.affiliation));
    if (Array.isArray(session.coauthors) && session.coauthors.length) {
      const names = session.coauthors.filter(Boolean).join(', ');
      if (names) dialogContent.append(el('p', 'session-dialog-coauthors', (session.coauthors.length === 1 ? 'Coauthor: ' : 'Coauthors: ') + names));
    }
    const summary = session.abstract || session.description;
    if (summary) {
      dialogContent.append(el('h4', 'session-dialog-subheading', session.abstract ? 'Abstract' : 'About the session'));
      dialogContent.append(el('p', 'session-dialog-abstract', summary));
    }
    if (session.time || session.location) {
      dialogContent.append(el('p', 'session-dialog-location', [session.time, session.location].filter(Boolean).join(' · ')));
    }
    const url = validLink(session.link);
    if (url) { const link = el('a', 'session-link', 'Session details ↗'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; dialogContent.append(link); }
    dialog.showModal();
    $('session-dialog-close').focus();
  }

  function archiveRow(session) {
    const row = el('button', 'archive-row');
    row.type = 'button';
    row.append(el('span', 'archive-row-date', formatDate(session.date)),
               el('span', 'archive-row-speaker', session.speaker),
               el('span', 'archive-row-title', session.title));
    row.setAttribute('aria-label', formatDate(session.date) + ': ' + session.speaker + ', ' + session.title + '. View session details');
    row.addEventListener('click', () => openSessionCard(session, row));
    return row;
  }

  function updateListFades() {
    for (const [container, list] of [[archiveScroll, archiveList], [upcomingScroll, upcomingList]]) {
      container.classList.toggle('is-at-end', list.scrollTop + list.clientHeight >= list.scrollHeight - 2);
    }
  }

  function nextPlaceholders(day) {
    const start = new Date(2026, 10, 1);
    const current = new Date(day + 'T12:00:00');
    const month = new Date(current.getFullYear(), current.getMonth(), 1);
    if (month < start) month.setTime(start.getTime());
    const result = [];
    for (let i = 0; i < 14 && result.length < 12; i++) {
      const year = month.getFullYear();
      const mon = month.getMonth();
      const firstWednesday = 1 + (3 - new Date(year, mon, 1).getDay() + 7) % 7;
      const date = [year, String(mon + 1).padStart(2, '0'), String(firstWednesday + 7).padStart(2, '0')].join('-');
      if (date >= day && !excludedDates.has(date) && !sessions.some(s => s.date === date)) result.push({ date, speaker: 'TBD', title: 'TBD', placeholder: true });
      month.setMonth(month.getMonth() + 1);
    }
    return result;
  }

  function renderProgramme() {
    const day = localDay();
    const upcoming = [...sessions.filter(s => s.date >= day), ...nextPlaceholders(day)].sort((a, b) => a.date.localeCompare(b.date));
    const past = sessions.filter(s => s.date < day).sort((a, b) => b.date.localeCompare(a.date));
    upcomingList.replaceChildren(...(upcoming.length ? upcoming.map(archiveRow) : [el('p', 'empty-state', 'Dates and speakers will appear here as they are confirmed.')]));
    archiveList.replaceChildren(...(past.length ? past.map(archiveRow) : [el('p', 'empty-state', 'Past sessions will be collected here.')]));
    $('upcoming-count').textContent = String(upcoming.length).padStart(2, '0');
    $('past-count').textContent = String(past.length).padStart(2, '0');
    const content = $('next-session').querySelector('.featured-content');
    if (upcoming.length) {
      const next = upcoming[0];
      content.replaceChildren(el('p', 'featured-date', formatDate(next.date) + (next.time ? ' · ' + next.time : '')), el('h3', '', next.title), el('p', '', next.speaker + (next.affiliation ? ' · ' + next.affiliation : '')));
      if (next.location) content.append(el('p', 'featured-location', next.location));
      const url = validLink(next.link);
      if (url) { const link = el('a', 'featured-link', 'Session details ↗'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; content.append(link); }
    } else {
      content.replaceChildren(el('h3', '', 'Next session to be announced'), el('p', '', 'We are putting the programme together. Check back soon for the next discussion.'));
    }
    requestAnimationFrame(updateListFades);
  }

  $('session-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => lastSessionTrigger?.focus());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  archiveList.addEventListener('scroll', updateListFades, { passive: true });
  upcomingList.addEventListener('scroll', updateListFades, { passive: true });
  window.addEventListener('resize', updateListFades);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) renderProgramme(); });
  function scheduleNextDay() {
    const midnight = new Date();
    midnight.setHours(24, 0, 1, 0);
    setTimeout(() => { renderProgramme(); scheduleNextDay(); }, midnight.getTime() - Date.now());
  }
  renderProgramme();
  scheduleNextDay();

  const proposalUrl = validLink(data.proposalUrl);
  const email = typeof data.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? data.email : '';
  if (proposalUrl || email) {
    const a = el('a', 'button button-light', proposalUrl ? 'Propose a session ↗' : 'Get in touch ↗');
    a.href = proposalUrl || 'mailto:' + email;
    if (proposalUrl) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    $('participate-action').replaceChildren(a);
  }
  if (Array.isArray(data.organisers) && data.organisers.length) {
    $('organiser-list').replaceChildren(...data.organisers.filter(Boolean).map(name => el('span', 'organiser-name', name)));
    $('organisers').querySelector('.organisers-grid > div:last-child > p').textContent = 'The Paper Development Series is organised collaboratively by:';
  }
  if (email) { const a = el('a', 'contact-link', 'Contact the organisers ↗'); a.href = 'mailto:' + email; $('contact-action').append(a); }
  $('year').textContent = today.getFullYear();

  const toggle = document.querySelector('.menu-toggle');
  const nav = $('primary-nav');
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); } });
})();


// Published questions advance locally; visitors never call research services.
(() => {
  'use strict';
  const card = document.querySelector('.pulse');
  const page = document.getElementById('pulse-page');
  const title = document.getElementById('pulse-title');
  const controls = document.getElementById('pulse-controls');
  const pause = document.getElementById('pulse-pause');
  const progress = document.getElementById('pulse-progress-bar');
  if (!card || !page || !title || !controls || !pause || !progress) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let entries = [];
  let index = 0;
  let timer;
  let turning = false;
  let paused = motion;

  function render(next) {
    index = next;
    title.textContent = entries[index].question;
    [...controls.children].forEach((button, n) => button.setAttribute('aria-pressed', String(n === index)));
  }
  function schedule() {
    clearTimeout(timer);
    progress.classList.remove('is-running');
    card.classList.toggle('is-paused', paused);
    if (paused || document.hidden || entries.length < 2) return;
    // Restart the visual timer at the beginning of each page.
    void progress.offsetWidth;
    progress.classList.add('is-running');
    timer = setTimeout(() => turn((index + 1) % entries.length), 12000);
  }
  function turn(next) {
    if (turning || next === index || next < 0 || next >= entries.length) return;
    clearTimeout(timer);
    if (motion) {
      render(next);
      schedule();
      return;
    }
    turning = true;
    const incoming = page.cloneNode(true);
    incoming.removeAttribute('id');
    incoming.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    incoming.querySelector('h2').textContent = entries[next].question;
    incoming.setAttribute('aria-hidden', 'true');
    incoming.classList.add('is-incoming', 'is-fading-in');
    page.parentElement.append(incoming);
    page.classList.add('is-fading-out');
    setTimeout(() => {
      render(next);
      page.classList.remove('is-fading-out');
      incoming.remove();
      turning = false;
      schedule();
    }, 820);
  }

  pause.addEventListener('click', () => {
    paused = !paused;
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Resume automatic questions' : 'Pause automatic questions');
    pause.title = paused ? 'Resume automatic questions' : 'Pause automatic questions';
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);

  fetch('research-pulse.json', { cache: 'no-cache' })
    .then(response => { if (!response.ok) throw Error('Unavailable'); return response.json(); })
    .then(issue => {
      entries = Array.isArray(issue.questions) ? issue.questions.filter(
        item => item && typeof item.question === 'string' && item.question.trim()
      ).slice(0, 3) : [];
      if (!entries.length) return;
      controls.replaceChildren();
      entries.forEach((entry, n) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = String(n + 1);
        button.setAttribute('aria-label', 'Show ' + (entry.topic || 'research') + ' question');
        button.addEventListener('click', () => turn(n));
        controls.append(button);
      });
      render(0);
      pause.hidden = entries.length < 2;
      if (motion) {
        pause.setAttribute('aria-pressed', 'true');
        pause.setAttribute('aria-label', 'Resume automatic questions');
        pause.title = 'Resume automatic questions';
      }
      schedule();
    })
    .catch(() => { title.textContent = 'New questions coming soon'; });
})();
