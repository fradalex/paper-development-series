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
  const today = new Date();
  const currentDay = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
  const upcoming = sessions.filter(s => s.date >= currentDay).sort((a, b) => a.date.localeCompare(b.date));
  const past = sessions.filter(s => s.date < currentDay).sort((a, b) => b.date.localeCompare(a.date));
  const formatDate = value => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value + 'T12:00:00'));
  const el = (tag, className, value) => { const node = document.createElement(tag); if (className) node.className = className; if (value != null) node.textContent = value; return node; };
  const validLink = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } };

  function sessionCard(session) {
    const article = el('article', 'session-card');
    const date = el('div', 'session-date', formatDate(session.date));
    if (session.time) date.append(el('span', 'session-time', session.time));
    const body = el('div', 'session-body');
    body.append(el('h4', '', session.title), el('p', 'session-speaker', session.speaker + (session.affiliation ? ' · ' + session.affiliation : '')));
    if (session.description) body.append(el('p', 'session-description', session.description));
    if (session.location) body.append(el('p', 'session-location', session.location));
    const url = validLink(session.link);
    if (url) { const a = el('a', 'session-link', 'Details ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; body.append(a); }
    article.append(date, body);
    return article;
  }
  function renderList(id, items) {
    if (!items.length) return;
    const list = $(id); list.replaceChildren(...items.map(sessionCard));
  }
  renderList('upcoming-list', upcoming);
  renderList('past-list', past);
  $('upcoming-count').textContent = String(upcoming.length).padStart(2, '0');
  $('past-count').textContent = String(past.length).padStart(2, '0');
  if (upcoming.length) {
    const next = upcoming[0];
    const content = $('next-session').querySelector('.featured-content');
    content.replaceChildren(el('p', 'featured-date', formatDate(next.date) + (next.time ? ' · ' + next.time : '')), el('h3', '', next.title), el('p', '', next.speaker + (next.affiliation ? ' · ' + next.affiliation : '')));
    if (next.location) content.append(el('p', 'featured-location', next.location));
    const url = validLink(next.link);
    if (url) { const a = el('a', 'featured-link', 'Session details ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; content.append(a); }
  }

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
  const date = document.getElementById('pulse-date');
  const pageNumber = document.getElementById('pulse-page-number');
  const controls = document.getElementById('pulse-controls');
  const pause = document.getElementById('pulse-pause');
  const progress = document.getElementById('pulse-progress-bar');
  if (!card || !page || !title || !date || !pageNumber || !controls || !pause || !progress) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let entries = [];
  let index = 0;
  let timer;
  let turning = false;
  let paused = motion;

  function render(next) {
    index = next;
    title.textContent = entries[index].question;
    pageNumber.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(entries.length).padStart(2, '0');
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
    incoming.querySelector('.pulse-page-number').textContent =
      String(next + 1).padStart(2, '0') + ' / ' + String(entries.length).padStart(2, '0');
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
    pause.textContent = paused ? '▶' : 'Ⅱ';
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
      const parsed = new Date(issue.updated + 'T12:00:00Z');
      if (!Number.isNaN(parsed.getTime())) date.textContent = 'Updated ' +
        new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(parsed);
      controls.replaceChildren();
      entries.forEach((entry, n) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = String(n + 1).padStart(2, '0');
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
        pause.textContent = '▶';
      }
      schedule();
    })
    .catch(() => { date.textContent = 'New questions coming soon'; });
})();
