/* =====================================================================
   main.js — renders the CV from js/data.js and wires up interactions
   (navigation, dark mode, scroll reveal, Download PDF).
   You normally do NOT need to edit this file — edit js/data.js instead.
   ===================================================================== */
(function () {
  'use strict';

  var D = window.CV_DATA || {};

  /* ---------- Helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function has(v) {
    if (Array.isArray(v)) { return v.length > 0; }
    return !!(v && String(v).trim());
  }
  function prettyUrl(u) {
    return String(u).replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  }
  function extLink(href) {
    return ' href="' + esc(href) + '" target="_blank" rel="noopener noreferrer"';
  }

  /* ---------- Inline SVG icons ---------- */
  function svg(inner, filled) {
    var attrs = filled
      ? 'fill="currentColor"'
      : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    return '<svg viewBox="0 0 24 24" ' + attrs + ' aria-hidden="true">' + inner + '</svg>';
  }
  var ICONS = {
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    phone: svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'),
    github: svg('<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>', true),
    linkedin: svg('<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>', true),
    globe: svg('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
    pin: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    calendar: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
    briefcase: svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
    cap: svg('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'),
    award: svg('<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>'),
    code: svg('<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'),
    chart: svg('<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>'),
    users: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
    heart: svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    external: svg('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>'),
    copy: svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    lang: svg('<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>'),
    zoom: svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    tag: svg('<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/>')
  };
  function icon(name) { return ICONS[name] || ICONS.tag; }

  /* ---------- Sections (order matters for numbering) ---------- */
  var SECTIONS = [
    { id: 'about',          show: function () { return has(D.about) || (D.objective && has(D.objective.text)); } },
    { id: 'education',      show: function () { return has(D.education); } },
    { id: 'experience',     show: function () { return has(D.experience); } },
    { id: 'skills',         show: function () { return has(D.skills); } },
    { id: 'projects',       show: function () { return has(D.projects); } },
    { id: 'certifications', show: function () { return has(D.certifications); } },
    { id: 'contact',        show: function () { return true; } }
  ];

  /* ---------- Render: hero ---------- */
  function renderHero() {
    var name = D.name || '';
    document.title = name + ' — Curriculum Vitae';
    $('#hero-name').textContent = name;
    $('#brand-name').textContent = name;

    var initials = D.initials || name.split(/\s+/).filter(Boolean).map(function (w) { return w[0]; }).join('').slice(-2).toUpperCase();
    $('#brand-mark').textContent = initials;
    $('#hero-initials').textContent = initials;

    $('#hero-title').textContent = D.title || '';
    $('#hero-tagline').textContent = D.tagline || '';

    var img = $('#hero-img');
    var initialsEl = $('#hero-initials');
    if (has(D.photo)) {
      img.alt = 'Portrait of ' + name;
      img.onload = function () { img.hidden = false; initialsEl.hidden = true; };
      img.onerror = function () { img.hidden = true; initialsEl.hidden = false; };
      img.src = D.photo;
    }

    var c = D.contact || {};
    var meta = [];
    if (has(D.location)) { meta.push('<span>' + icon('pin') + esc(D.location) + '</span>'); }
    if (has(c.email))    { meta.push('<a href="mailto:' + esc(c.email) + '">' + icon('mail') + esc(c.email) + '</a>'); }
    if (has(c.phone))    { meta.push('<a href="tel:' + esc(c.phoneHref || c.phone) + '">' + icon('phone') + esc(c.phone) + '</a>'); }
    if (has(c.github))   { meta.push('<a' + extLink(c.github) + '>' + icon('github') + esc(prettyUrl(c.github)) + '</a>'); }
    if (has(c.linkedin)) { meta.push('<a' + extLink(c.linkedin) + '>' + icon('linkedin') + esc(prettyUrl(c.linkedin)) + '</a>'); }
    if (has(c.website))  { meta.push('<a' + extLink(c.website) + '>' + icon('globe') + esc(prettyUrl(c.website)) + '</a>'); }
    $('#hero-meta').innerHTML = meta.join('');

    if (has(c.email)) { $('#hero-cta').href = 'mailto:' + c.email; }

    if (has(D.highlights)) {
      $('#highlights').innerHTML = D.highlights.map(function (h) {
        return '<li class="reveal">' + esc(h) + '</li>';
      }).join('');
    } else {
      $('#highlights-wrap').hidden = true;
    }
  }

  /* ---------- Render: about ---------- */
  function renderAbout() {
    $('#about-text').innerHTML = (D.about || []).map(function (p) {
      return '<p>' + esc(p) + '</p>';
    }).join('');

    var o = D.objective;
    var card = $('#objective-card');
    if (o && (has(o.heading) || has(o.text))) {
      card.innerHTML =
        '<p class="label">' + esc(o.label || 'Objective') + '</p>' +
        (has(o.heading) ? '<h3>' + esc(o.heading) + '</h3>' : '') +
        (has(o.text) ? '<p>' + esc(o.text) + '</p>' : '');
    } else {
      card.hidden = true;
      $('#about-grid').classList.add('single');
    }
  }

  /* ---------- Render: timeline (education & experience) ---------- */
  function renderTimeline(containerId, items, kind) {
    $('#' + containerId).innerHTML = (items || []).map(function (it) {
      var title = kind === 'edu' ? it.degree : it.role;
      var org = kind === 'edu' ? it.school : it.company;
      var meta = [];
      if (has(it.period))   { meta.push('<span>' + icon('calendar') + esc(it.period) + '</span>'); }
      if (has(it.location)) { meta.push('<span>' + icon('pin') + esc(it.location) + '</span>'); }
      if (has(it.type))     { meta.push('<span>' + icon(kind === 'edu' ? 'cap' : 'briefcase') + esc(it.type) + '</span>'); }

      // Optional picture of the diploma / certificate cover, opened in the lightbox
      var hasImg = has(it.image);
      var caption = has(it.imageCaption) ? it.imageCaption : title;
      var thumb = hasImg
        ? '<a class="tl-thumb" href="' + esc(it.image) + '" data-lightbox data-caption="' + esc(caption) + '" aria-label="View: ' + esc(caption) + '">' +
            '<img src="' + esc(it.thumb || it.image) + '" alt="' + esc(caption) + '" loading="lazy">' +
            '<span class="cert-zoom">' + icon('zoom') + 'View</span>' +
          '</a>'
        : '';

      return '<article class="tl-item reveal"><div class="card' + (hasImg ? ' has-image' : '') + '">' +
        '<div class="tl-body">' +
          '<div class="tl-head"><h3>' + esc(title) + '</h3>' +
            (has(it.badge) ? '<span class="badge">' + esc(it.badge) + '</span>' : '') +
          '</div>' +
          (has(org) ? '<p class="tl-org">' + esc(org) + '</p>' : '') +
          (meta.length ? '<div class="tl-meta">' + meta.join('') + '</div>' : '') +
          (has(it.details) ? '<ul class="bullets">' + it.details.map(function (d) {
            return '<li>' + esc(d) + '</li>';
          }).join('') + '</ul>' : '') +
        '</div>' +
        thumb +
      '</div></article>';
    }).join('');
  }

  /* ---------- Render: skills ---------- */
  function renderSkills() {
    $('#skills-grid').innerHTML = (D.skills || []).map(function (g) {
      return '<article class="card skill-card reveal">' +
        '<h3><span class="ico">' + icon(g.icon || 'tag') + '</span>' + esc(g.group) + '</h3>' +
        '<div class="chips">' + (g.items || []).map(function (s) {
          return '<span class="chip">' + esc(s) + '</span>';
        }).join('') + '</div>' +
      '</article>';
    }).join('');
  }

  /* ---------- Render: projects ---------- */
  function renderProjects() {
    var sub = $('#projects-sub');
    if (has(D.projectsIntro)) { sub.textContent = D.projectsIntro; } else { sub.hidden = true; }

    $('#projects-grid').innerHTML = (D.projects || []).map(function (p) {
      var hasImg = has(p.image);
      var alt = has(p.imageAlt) ? p.imageAlt : p.name + ' screenshot';
      var thumb = hasImg
        ? '<a class="project-thumb" href="' + esc(p.image) + '" data-lightbox data-caption="' + esc(p.name) + '" aria-label="View screenshot: ' + esc(p.name) + '">' +
            '<img src="' + esc(p.thumb || p.image) + '" alt="' + esc(alt) + '" loading="lazy">' +
            '<span class="cert-zoom">' + icon('zoom') + 'View</span>' +
          '</a>'
        : '';
      return '<article class="card project-card reveal' + (hasImg ? ' has-image' : '') + '">' +
        thumb +
        '<div class="project-body">' +
          '<div class="project-head"><h3>' + esc(p.name) + '</h3>' +
            (has(p.status) ? '<span class="badge">' + esc(p.status) + '</span>' : '') +
          '</div>' +
          (has(p.period) ? '<div class="project-meta"><span>' + icon('calendar') + esc(p.period) + '</span></div>' : '') +
          (has(p.description) ? '<p>' + esc(p.description) + '</p>' : '') +
          (has(p.tech) ? '<div class="tags">' + p.tech.map(function (t) {
            return '<span class="tag">' + esc(t) + '</span>';
          }).join('') + '</div>' : '') +
          (has(p.link) ? '<a class="project-link"' + extLink(p.link) + '>' + esc(p.linkLabel || 'View project') + icon('external') + '</a>' : '') +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ---------- Render: certifications ---------- */
  function renderCerts() {
    var items = D.certifications || [];
    function card(c) {
      var meta = [c.issuer, c.year].filter(has).join(' · ');
      var hasImg = has(c.image);
      // "link" style: text-only card with a button that opens the picture; default: preview thumbnail on the card
      var linkOnly = hasImg && c.imageStyle === 'link';
      var thumb = hasImg && !linkOnly
        ? '<a class="cert-thumb" href="' + esc(c.image) + '" data-lightbox data-caption="' + esc(c.name) + '" aria-label="View certificate: ' + esc(c.name) + '">' +
            '<img src="' + esc(c.thumb || c.image) + '" alt="' + esc(c.name) + ' certificate" loading="lazy">' +
            '<span class="cert-zoom">' + icon('zoom') + 'View</span>' +
          '</a>'
        : '';
      var viewBtn = linkOnly
        ? '<a class="project-link cert-view" href="' + esc(c.image) + '" data-lightbox data-caption="' + esc(c.name) + '" aria-label="View certificate: ' + esc(c.name) + '">View certificate' + icon('zoom') + '</a>'
        : '';
      return '<article class="card cert-card reveal' + (thumb ? ' has-image' : '') + '">' +
        thumb +
        '<div class="cert-body">' +
          '<span class="ico">' + icon('award') + '</span>' +
          '<div>' +
            '<h3>' + esc(c.name) + '</h3>' +
            (has(meta) ? '<p class="meta">' + esc(meta) + '</p>' : '') +
            (has(c.score) ? '<p class="score">' + esc(c.score) + '</p>' : '') +
            viewBtn +
            (has(c.link) ? '<a class="project-link"' + extLink(c.link) + '>Verify' + icon('external') + '</a>' : '') +
          '</div>' +
        '</div>' +
      '</article>';
    }

    var container = $('#certifications-grid');
    var grouped = items.some(function (c) { return has(c.group); });
    if (!grouped) {
      container.className = 'certs-grid';
      container.innerHTML = items.map(card).join('');
      return;
    }

    // Keep groups in the order they first appear in the data
    var order = [];
    var byGroup = {};
    items.forEach(function (c) {
      var g = has(c.group) ? c.group : 'Other';
      if (!byGroup[g]) { byGroup[g] = []; order.push(g); }
      byGroup[g].push(c);
    });
    container.className = 'certs-groups';
    container.innerHTML = order.map(function (g) {
      return '<div class="certs-group">' +
        '<h3 class="certs-group-title reveal">' + esc(g) + '</h3>' +
        '<div class="certs-grid">' + byGroup[g].map(card).join('') + '</div>' +
      '</div>';
    }).join('');
  }

  /* ---------- Render: contact ---------- */
  function renderContact() {
    var c = D.contact || {};
    var cards = [];

    function card(href, ico, label, value, external) {
      var tag = href ? 'a' : 'div';
      var attrs = href ? (external ? extLink(href) : ' href="' + esc(href) + '"') : '';
      return '<' + tag + ' class="card contact-card reveal"' + attrs + '>' +
        '<span class="ico">' + icon(ico) + '</span>' +
        '<span><span class="lbl">' + esc(label) + '</span><span class="val">' + esc(value) + '</span></span>' +
      '</' + tag + '>';
    }

    if (has(c.email))    { cards.push(card('mailto:' + c.email, 'mail', 'Email', c.email)); }
    if (has(c.phone))    { cards.push(card('tel:' + (c.phoneHref || c.phone), 'phone', 'Phone', c.phone)); }
    if (has(c.github))   { cards.push(card(c.github, 'github', 'GitHub', prettyUrl(c.github), true)); }
    if (has(c.linkedin)) { cards.push(card(c.linkedin, 'linkedin', 'LinkedIn', prettyUrl(c.linkedin), true)); }
    if (has(c.website))  { cards.push(card(c.website, 'globe', 'Website', prettyUrl(c.website), true)); }
    if (has(D.location)) { cards.push(card('', 'pin', 'Location', D.location)); }
    $('#contact-grid').innerHTML = cards.join('');

    var cta = $('#contact-cta');
    if (has(c.email)) {
      cta.innerHTML =
        '<a class="btn btn-primary" href="mailto:' + esc(c.email) + '">' + icon('mail') + '<span>Send me an email</span></a>' +
        '<button class="btn btn-outline" type="button" id="copy-email">' + icon('copy') + '<span>Copy email address</span></button>';
      $('#copy-email').addEventListener('click', function () { copyText(c.email, this); });
    } else {
      cta.hidden = true;
    }

    var langs = $('#languages');
    if (has(D.languages)) {
      langs.innerHTML = '<h3>' + icon('lang') + 'Languages</h3><div class="chips">' +
        D.languages.map(function (l) {
          return '<span class="chip"><strong>' + esc(l.name) + '</strong>' + (has(l.level) ? ' · ' + esc(l.level) : '') + '</span>';
        }).join('') + '</div>';
    } else {
      langs.hidden = true;
    }
  }

  function copyText(text, btn) {
    var label = btn.querySelector('span');
    var original = label.textContent;
    function done() {
      label.textContent = 'Copied!';
      setTimeout(function () { label.textContent = original; }, 1600);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  /* ---------- Render: footer ---------- */
  function renderPrintNote() {
    var el = $('#print-note');
    if (!el) { return; }
    var bits = [];
    if (has(D.siteUrl)) { bits.push('Online version with certificate images and project previews: ' + esc(prettyUrl(D.siteUrl))); }
    if (has(D.lastUpdated)) { bits.push('Last updated ' + esc(D.lastUpdated)); }
    if (bits.length) { el.innerHTML = bits.join(' &nbsp;·&nbsp; '); } else { el.hidden = true; }
  }

  function renderFooter() {
    var bits = ['© ' + new Date().getFullYear() + ' ' + esc(D.name || '')];
    if (has(D.lastUpdated)) { bits.push('Last updated ' + esc(D.lastUpdated)); }
    $('#footer-text').innerHTML = bits.join(' &nbsp;·&nbsp; ');
  }

  /* ---------- Hide empty sections, renumber, re-alternate backgrounds ---------- */
  function pruneSections() {
    var n = 0;
    SECTIONS.forEach(function (s) {
      var sec = document.getElementById(s.id);
      var link = $('[data-nav="' + s.id + '"]');
      if (!sec) { return; }
      if (!s.show()) {
        sec.hidden = true;
        if (link) { link.parentNode.hidden = true; }
        return;
      }
      n += 1;
      var eb = $('.eyebrow', sec);
      if (eb) { eb.textContent = (n < 10 ? '0' : '') + n; }
    });
    $$('main .section').filter(function (s) { return !s.hidden; }).forEach(function (s, i) {
      s.classList.toggle('alt', i % 2 === 1);
    });
  }

  /* ---------- Theme (light / dark) ---------- */
  function initTheme() {
    var btn = $('#theme-toggle');
    var meta = $('meta[name="theme-color"]');
    function apply(t) {
      document.documentElement.setAttribute('data-theme', t);
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      if (meta) { meta.content = t === 'dark' ? '#0b1315' : '#0f766e'; }
    }
    apply(document.documentElement.getAttribute('data-theme') || 'light');
    btn.addEventListener('click', function () {
      var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(t);
      try { localStorage.setItem('cv-theme', t); } catch (e) {}
    });
  }

  /* ---------- Navigation: mobile menu, scroll spy, header shadow ---------- */
  function initNav() {
    var toggle = $('#nav-toggle');
    var links = $('#nav-links');

    function setOpen(open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    toggle.addEventListener('click', function () { setOpen(!links.classList.contains('open')); });
    $$('a', links).forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) { setOpen(false); }
    });

    var header = $('#site-header');
    function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window) {
      var navLinks = $$('.nav-links a');
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) { return; }
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('data-nav') === en.target.id);
          });
        });
      }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });
      $$('main .section').filter(function (s) { return !s.hidden; }).forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = $$('.reveal');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduce) {
      els.forEach(function (e) { e.classList.add('visible'); });
      return;
    }
    // Small stagger between sibling cards for a gentle cascade
    els.forEach(function (e) {
      var siblings = e.parentNode ? $$(':scope > .reveal', e.parentNode) : [];
      var i = siblings.indexOf(e);
      if (i > 0) { e.style.transitionDelay = Math.min(i * 70, 350) + 'ms'; }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Lightbox for certificate images ---------- */
  function initLightbox() {
    var box = $('#lightbox');
    if (!box) { return; }
    var img = $('#lightbox-img');
    var cap = $('#lightbox-caption');
    var closeBtn = $('#lightbox-close');
    var lastFocus = null;

    function open(src, caption) {
      lastFocus = document.activeElement;
      img.src = src;
      img.alt = caption;
      cap.textContent = caption;
      box.hidden = false;
      document.body.classList.add('no-scroll');
      closeBtn.focus();
    }
    function close() {
      box.hidden = true;
      img.removeAttribute('src');
      document.body.classList.remove('no-scroll');
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest ? e.target.closest('[data-lightbox]') : null;
      if (trigger) {
        e.preventDefault();
        open(trigger.getAttribute('href'), trigger.getAttribute('data-caption') || '');
        return;
      }
      if (!box.hidden && (e.target === box || (e.target.closest && e.target.closest('#lightbox-close')))) { close(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !box.hidden) { close(); }
    });
  }

  /* ---------- Download PDF (browser print → "Save as PDF") ---------- */
  function initPrint() {
    var btn = $('#print-btn');
    if (has(D.pdfFile)) {
      // Open the pre-built PDF in a new tab: the browser viewer shows a preview and offers its own save / print buttons
      btn.setAttribute('href', D.pdfFile);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    } else {
      btn.setAttribute('href', '#');
      btn.setAttribute('title', 'Save this CV as a PDF (choose Save as PDF in the print dialog)');
      btn.addEventListener('click', function (e) { e.preventDefault(); window.print(); });
    }
    window.addEventListener('beforeprint', function () {
      $$('.reveal').forEach(function (e) { e.classList.add('visible'); });
    });
  }

  /* ---------- Boot ---------- */
  function init() {
    renderHero();
    renderAbout();
    renderTimeline('education-list', D.education, 'edu');
    renderTimeline('experience-list', D.experience, 'exp');
    renderSkills();
    renderProjects();
    renderCerts();
    renderContact();
    renderFooter();
    renderPrintNote();
    pruneSections();
    initTheme();
    initNav();
    initReveal();
    initLightbox();
    initPrint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
