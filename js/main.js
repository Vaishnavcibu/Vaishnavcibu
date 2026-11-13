/* =========================================================================
   VAISHNAV CIBU — PORTFOLIO
   js/main.js · vanilla JS, no dependencies, loaded with `defer`

   01 Editable content (numbers, contact form)
   02 Helpers
   03 Stats: apply values + count-up on scroll
   04 Nav: scrolled state + active section
   05 Mobile menu (focus trap, Esc, scroll lock)
   06 Scroll reveal
   07 Marquee
   08 Custom cursor
   09 Contact form
   10 Footer year
   ========================================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     01 · EDITABLE CONTENT
     Change the numbers here — this is the single source of truth.
     (The numbers written in index.html are only a no-JS fallback.)
     ----------------------------------------------------------------------- */
  var STATS = {
    shipped:  { value: 10,   suffix: '+', label: 'Products shipped' },         // hero hotspot
    products: { value: 10,   suffix: '+', label: 'Products designed' },        // 08 Numbers
    modules:  { value: 40,   suffix: '+', label: 'Enterprise modules built' }, // 08 Numbers
    hours:    { value: 1000, suffix: '+', label: 'Development hours' }         // 08 Numbers
  };

  /* Contact form.
     With a Web3Forms key, messages are delivered straight to INBOX.
     Leave WEB3FORMS_KEY empty to fall back to opening the visitor's mail app. */
  var INBOX         = 'vaishnavcibu@gmail.com';
  var WEB3FORMS_KEY = 'fab818e2-40c2-4219-8a88-d6bbaf48b001';
  var ENDPOINT      = WEB3FORMS_KEY ? 'https://api.web3forms.com/submit' : '';


  /* -----------------------------------------------------------------------
     02 · HELPERS
     ----------------------------------------------------------------------- */
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function fmt(n) { return Number(n).toLocaleString('en-IN'); }


  /* -----------------------------------------------------------------------
     03 · STATS
     Bug fix: the old markup shipped "0" and relied on an animation to fill
     the number in, so anything that didn't run it (link previews, crawlers,
     screenshots, background tabs) showed "0+". Now the real value is always
     in the DOM; the count-up only starts once the card is on screen, and if
     a frame never runs the final value simply stays put.
     ----------------------------------------------------------------------- */
  Object.keys(STATS).forEach(function (key) {
    var s = STATS[key];
    $$('[data-stat="' + key + '"]').forEach(function (el) { el.textContent = fmt(s.value); });
    $$('[data-stat-suffix="' + key + '"]').forEach(function (el) { el.textContent = s.suffix; });
    $$('[data-stat-label="' + key + '"]').forEach(function (el) { el.textContent = s.label; });
    $$('[data-stat-text="' + key + '"]').forEach(function (el) { el.textContent = fmt(s.value) + s.suffix; });
  });

  function countUp(el) {
    var stat = STATS[el.getAttribute('data-stat')];
    if (!stat || reduceMotion) return;
    var target = stat.value, start = null, dur = 1600;
    function frame(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  if (hasIO && !reduceMotion) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        $$('[data-stat]', e.target).forEach(countUp);
        statIO.unobserve(e.target);
      });
    }, { threshold: 0.35 });
    $$('[data-stat-card]').forEach(function (card) { statIO.observe(card); });
  }


  /* -----------------------------------------------------------------------
     04 · NAV — blurred floating state + active link
     ----------------------------------------------------------------------- */
  var nav = $('#nav');
  var ticking = false;
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  var navLinks = $$('[data-nav]');
  var navIds = navLinks.map(function (a) { return a.getAttribute('data-nav'); })
                       .filter(function (id, i, arr) { return arr.indexOf(id) === i; });
  var navSections = navIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (a) {
      var on = a.getAttribute('data-nav') === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }

  if (hasIO && navSections.length) {
    var visible = {};
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var current = null;
      navSections.forEach(function (s) { if (visible[s.id]) current = s.id; });
      setActive(current);
    }, { rootMargin: '-40% 0px -55% 0px' });
    navSections.forEach(function (s) { navIO.observe(s); });
  }


  /* -----------------------------------------------------------------------
     05 · MOBILE MENU
     ----------------------------------------------------------------------- */
  var burger = $('#burger');
  var menu = $('#menu');
  var desktopMQ = window.matchMedia('(min-width: 1024px)');

  function focusables() {
    return [burger].concat($$('a[href], button:not([disabled])', menu));
  }
  function setMenu(open, returnFocus) {
    menu.classList.toggle('is-open', open);
    root.classList.toggle('is-menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = $('a', menu);
      if (first) window.setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
    } else if (returnFocus) {
      burger.focus({ preventScroll: true });
    }
  }
  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'), true);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false, false);
  });
  document.addEventListener('keydown', function (e) {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') { setMenu(false, true); return; }
    if (e.key !== 'Tab') return;
    var items = focusables();
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  function onDesktop(mq) { if (mq.matches && menu.classList.contains('is-open')) setMenu(false, false); }
  if (desktopMQ.addEventListener) desktopMQ.addEventListener('change', onDesktop);
  else if (desktopMQ.addListener) desktopMQ.addListener(onDesktop);


  /* -----------------------------------------------------------------------
     06 · SCROLL REVEAL
     ----------------------------------------------------------------------- */
  var reveals = $$('[data-rv]');
  if (hasIO && !reduceMotion) {
    var rvIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        rvIO.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { rvIO.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }


  /* -----------------------------------------------------------------------
     07 · MARQUEE — duplicate the track so the -50% loop is seamless
     ----------------------------------------------------------------------- */
  $$('[data-marquee]').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });


  /* -----------------------------------------------------------------------
     08 · CUSTOM CURSOR — small red dot, desktop + fine pointer only
     ----------------------------------------------------------------------- */
  var cursor = $('.cursor');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cursor && finePointer && !reduceMotion) {
    root.classList.add('has-cursor');
    var x = -100, y = -100, queued = false;
    function paint() {
      cursor.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      queued = false;
    }
    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      cursor.classList.add('is-visible');
      if (!queued) { window.requestAnimationFrame(paint); queued = true; }
    }, { passive: true });
    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      cursor.classList.toggle('is-text', !!t.closest('input, textarea'));
      cursor.classList.toggle('is-hover', !!t.closest('a, button, label, .svc, .why__card'));
    });
    document.documentElement.addEventListener('mouseleave', function () {
      cursor.classList.remove('is-visible');
    });
  }


  /* -----------------------------------------------------------------------
     09 · CONTACT FORM — Web3Forms, with a mailto fallback
     ----------------------------------------------------------------------- */
  var form = $('#form');
  var note = $('#formnote');
  if (form && note) {
    var fields = { name: $('#fname'), email: $('#femail'), message: $('#fmsg') };

    function setNote(text, isError) {
      note.textContent = text;
      note.classList.toggle('is-error', !!isError);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = fields.name.value.trim();
      var em = fields.email.value.trim();
      var m = fields.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

      Object.keys(fields).forEach(function (k) {
        var f = fields[k];
        var bad = !f.value.trim() || (k === 'email' && !emailOk);
        f.closest('.field').classList.toggle('is-invalid', bad);
        f.setAttribute('aria-invalid', bad ? 'true' : 'false');
      });

      if (!n || !em || !m) { setNote('Add your name, email and a short message first.', true); return; }
      if (!emailOk) { setNote('That email address doesn\'t look right.', true); fields.email.focus(); return; }

      if (!ENDPOINT) {
        setNote('Opening your mail app…');
        var subject = encodeURIComponent('Project enquiry from ' + n);
        var body = encodeURIComponent(m + '\n\n—\n' + n + '\n' + em);
        window.location.href = 'mailto:' + INBOX + '?subject=' + subject + '&body=' + body;
        return;
      }

      setNote('Sending…');
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: n, email: em, message: m,
          subject: 'Portfolio enquiry from ' + n,
          from_name: 'Portfolio site'
        })
      })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r; })
        .then(function () {
          form.reset();
          setNote('Message sent. You will get a reply at ' + em + '.');
        })
        .catch(function () {
          setNote('That did not go through. Email ' + INBOX + ' directly.', true);
        });
    });

    Object.keys(fields).forEach(function (k) {
      fields[k].addEventListener('input', function () {
        fields[k].closest('.field').classList.remove('is-invalid');
        fields[k].removeAttribute('aria-invalid');
      });
    });
  }


  /* -----------------------------------------------------------------------
     10 · FOOTER YEAR
     ----------------------------------------------------------------------- */
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
