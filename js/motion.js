/* =========================================================================
   VAISHNAV CIBU — PORTFOLIO
   js/motion.js · premium motion layer (GSAP 3 + ScrollTrigger, anime.js 3).
   Loaded after the libraries with `defer`.

   Rules this file follows:
   - Nothing here is required to read or use the page. If the CDN fails or the
     visitor prefers reduced motion, the page stays fully static and readable.
   - Animate transform / opacity only (plus SVG stroke offsets).
   - GSAP = scroll-linked motion. anime.js = small self-contained sequences
     (illustrations, the toolkit grid, the journey path, the Why panels).
   - Nothing animates off screen: loops pause when they leave the viewport,
     and set-up is split into small tasks so the page stays responsive while
     it loads on slower phones.
   - Section headings are revealed by CSS (see "headIn" in css/style.css).

   01 Setup
   02 Cursor spotlight on cards
   03 Magnetic primary buttons
   04 Hero: scroll parallax
   05 Marquees that speed up with scroll velocity
   06 About: scroll-lit manifesto, ID-card tilt, journey path
   07 Projects: stacked cards + animated illustrations
   08 Toolkit: grid entrance + filter animation
   09 Process: pinned horizontal sequence (desktop) / filling rail (phones)
   10 Why: staggered text when a panel opens
   11 Footer wordmark: rise, shimmer, settle
   ========================================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     01 · SETUP
     ----------------------------------------------------------------------- */
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;                       // static page, by request

  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  var anime = window.anime;
  var hasGsap = !!(gsap && ST);
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (anime) root.classList.add('has-anime');
  if (hasGsap) {
    gsap.registerPlugin(ST);
    ST.config({ ignoreMobileResize: true });
    root.classList.add('has-gsap');
  }
  var mm = hasGsap ? gsap.matchMedia() : null;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  var desktop = window.matchMedia('(min-width: 1024px)').matches;

  /* Set-up order. ScrollTrigger work runs right away so all triggers are
     measured in ONE pass when the page finishes loading (creating them later,
     one by one, would re-measure the page each time). Pointer-only and
     anime.js set-up is queued into small tasks after that. */
  var queue = [];
  function task(fn) { queue.push(fn); }
  function now(fn) { fn(); }
  function runQueue() {
    var fn = queue.shift();
    if (!fn) return;
    fn();
    if (queue.length) setTimeout(runQueue, 0);
  }

  /* Call onEnter / onLeave as el enters / leaves the viewport */
  function inView(el, onEnter, onLeave, margin) {
    if (!('IntersectionObserver' in window)) { onEnter(); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) onEnter();
        else if (onLeave) onLeave();
      });
    }, { rootMargin: margin || '0px 0px -12% 0px' }).observe(el);
  }

  /* Hide an SVG stroke so anime.js can draw it in later */
  function primeStroke(path) {
    var len = path.getTotalLength ? path.getTotalLength() : 0;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
  }
  function drawStrokes(targets, opts) {
    return anime(Object.assign({
      targets: targets,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1400,
      easing: 'easeInOutSine',
      delay: anime.stagger(160)
    }, opts || {}));
  }


  /* -----------------------------------------------------------------------
     02 · CURSOR SPOTLIGHT — a soft red glow follows the pointer on cards
     ----------------------------------------------------------------------- */
  if (finePointer) task(function () {
    $$('[data-glow]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  });


  /* -----------------------------------------------------------------------
     03 · MAGNETIC BUTTONS — primary pills lean toward the pointer
     ----------------------------------------------------------------------- */
  if (hasGsap && finePointer) task(function () {
    $$('.nav__cta, .work__links .pill, .projects__more .pill').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.22);
        yTo((e.clientY - r.top - r.height / 2) * 0.32);
      });
      el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  });


  /* -----------------------------------------------------------------------
     04 · HERO — gentle depth as you scroll away
     ----------------------------------------------------------------------- */
  if (hasGsap && desktop && $('.hero')) now(function () {
    gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    })
      .to('.stage__orb, .stage__ring, .stage__shadow', { yPercent: 22, ease: 'none' }, 0)
      .to('.stage__beam', { opacity: 0.35, ease: 'none' }, 0)
      .to('.hero__title', { yPercent: -12, ease: 'none' }, 0)
      .to('.hero__copy, .hotspots', { y: -36, ease: 'none' }, 0);
  });


  /* -----------------------------------------------------------------------
     05 · MARQUEES — constant drift, faster while you scroll. Each one only
     runs while it is on screen. (main.js duplicated the track contents.)
     ----------------------------------------------------------------------- */
  if (hasGsap) now(function () {
    $$('.marquee').forEach(function (band) {
      var track = $('[data-marquee]', band);
      if (!track) return;
      var rev = band.classList.contains('marquee--reverse');
      var loop = gsap.fromTo(track,
        { xPercent: rev ? -50 : 0 },
        { xPercent: rev ? 0 : -50, duration: rev ? 70 : 48, ease: 'none', repeat: -1, paused: true });
      if (!desktop) {           // phones: steady drift, no scroll listener
        inView(band, function () { loop.play(); }, function () { loop.pause(); }, '0px');
        return;
      }
      ST.create({
        trigger: band, start: 'top bottom', end: 'bottom top',
        onToggle: function (self) { if (self.isActive) loop.play(); else loop.pause(); },
        onUpdate: function (self) {
          var boost = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 5);
          gsap.to(loop, {
            timeScale: boost, duration: 0.2, overwrite: true,
            onComplete: function () { gsap.to(loop, { timeScale: 1, duration: 1.4, ease: 'power2.out' }); }
          });
        }
      });
    });
  });


  /* -----------------------------------------------------------------------
     06 · ABOUT
     ----------------------------------------------------------------------- */
  // a) Manifesto: words light up as you read down the page.
  //    Dim words stay at .38 opacity so the text still passes WCAG AA (large).
  var manifesto = $('[data-words]');
  if (hasGsap && manifesto) now(function () {
    var words = manifesto.textContent.trim().split(/\s+/);
    manifesto.textContent = '';
    words.forEach(function (w, i) {
      var s = document.createElement('span');
      s.className = 'w';
      s.textContent = w;
      manifesto.appendChild(s);
      if (i < words.length - 1) manifesto.appendChild(document.createTextNode(' '));
    });
    gsap.fromTo($$('.w', manifesto), { opacity: 0.38 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: manifesto, start: 'top 82%', end: 'bottom 48%', scrub: true }
    });
  });

  // b) ID card: tilts toward the pointer, the orb drifts inside it
  var idFrame = $('.about__frame');
  var idPanel = $('[data-tilt]');
  if (hasGsap && finePointer && idFrame && idPanel) task(function () {
    var orb = $('[data-orb]', idPanel);
    gsap.set(idFrame, { transformPerspective: 1000 });
    var rx = gsap.quickTo(idFrame, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    var ry = gsap.quickTo(idFrame, 'rotationY', { duration: 0.8, ease: 'power3.out' });
    var ox = orb ? gsap.quickTo(orb, 'x', { duration: 1, ease: 'power3.out' }) : null;
    var oy = orb ? gsap.quickTo(orb, 'y', { duration: 1, ease: 'power3.out' }) : null;
    idFrame.addEventListener('pointermove', function (e) {
      var r = idFrame.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      rx(-py * 7); ry(px * 7);
      if (ox) { ox(px * 46); oy(py * 34); }
    });
    idFrame.addEventListener('pointerleave', function () {
      rx(0); ry(0);
      if (ox) { ox(0); oy(0); }
    });
  });

  // c) Journey path: nodes appear in order and the red line draws between them
  var path = $('.about__path');
  if (anime && path) task(function () {
    var nodes = $$('li', path);
    var lines = $$('i', path);
    anime.set(nodes, { opacity: 0, translateY: 16 });
    anime.set(lines, { scaleX: 0 });
    var done = false;
    inView(path, function () {
      if (done) return;
      done = true;
      anime.timeline({ easing: 'easeOutExpo' })
        .add({ targets: nodes, opacity: [0, 1], translateY: [16, 0], duration: 900, delay: anime.stagger(160) })
        .add({ targets: lines, scaleX: [0, 1], duration: 900, delay: anime.stagger(160), easing: 'easeInOutQuart' }, 200);
    });
  });


  /* -----------------------------------------------------------------------
     07 · PROJECTS
     ----------------------------------------------------------------------- */
  // a) Stacked cards (desktop): the card being covered shrinks and dims
  if (mm) now(function () {
    mm.add('(min-width: 1024px)', function () {
      var works = $$('.work');
      works.forEach(function (w, i) {
        var next = works[i + 1];
        if (!next) return;
        gsap.to($('.work__card', w), {
          scale: 0.92, '--shade': 0.6, ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: function () { return 'top top+=' + parseFloat(getComputedStyle(next).top); },
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      });
    });
  });

  // b) Illustrations: draw once on first view, loop only while visible
  if (anime) $$('.work__media').forEach(function (media) {
    task(function () {
      var svg = $('.art', media);
      if (!svg || $('img', media)) return;      // a screenshot replaces the art
      var draws = $$('.a-draw', svg);
      draws.forEach(primeStroke);
      var loops = [];
      var started = false;

      var mover = $('.a-mover', svg);
      var track = $('.a-route', svg) || $('.a-dash', svg);
      if (mover && track) {
        var p = anime.path(track);
        loops.push(anime({
          targets: mover, translateX: p('x'), translateY: p('y'),
          duration: svg.classList.contains('art--fes') ? 2600 : 4800,
          easing: 'easeInOutSine', loop: true, autoplay: false,
          begin: function () { mover.style.opacity = 1; }
        }));
      }
      if (svg.classList.contains('art--ocr')) {
        var scan = $('.a-scan', svg);
        loops.push(anime({
          targets: scan, translateY: [0, 318], duration: 2600, direction: 'alternate',
          easing: 'easeInOutSine', loop: true, autoplay: false,
          begin: function () { scan.style.opacity = 1; }
        }));
        loops.push(anime({
          targets: $$('.a-chip', svg), opacity: [0.15, 1], translateX: [-14, 0],
          delay: anime.stagger(420), duration: 700, endDelay: 1400,
          direction: 'alternate', loop: true, easing: 'easeOutExpo', autoplay: false
        }));
      }
      if (svg.classList.contains('art--spf')) {
        loops.push(anime({
          targets: $('.a-red', svg), strokeDashoffset: [anime.setDashoffset, 0], duration: 1800, endDelay: 1600,
          direction: 'alternate', loop: true, easing: 'easeInOutSine', autoplay: false
        }));
      }
      if (svg.classList.contains('art--nest')) {
        loops.push(anime({
          targets: $('.a-window', svg), opacity: [1, 0.45, 1], duration: 3200,
          loop: true, easing: 'easeInOutSine', autoplay: false
        }));
      }

      inView(media, function () {
        media.classList.add('is-live');
        if (!started) {
          started = true;
          if (draws.length) drawStrokes(draws, { duration: 1600 });
          var bars = $$('.a-bar', svg);
          if (bars.length) anime({ targets: bars, scaleY: [0, 1], duration: 1100, delay: anime.stagger(140, { start: 300 }), easing: 'easeOutExpo' });
          var nodes = $$('.a-node', svg);
          if (nodes.length) anime({ targets: nodes, scale: [0, 1], duration: 900, delay: anime.stagger(90), easing: 'easeOutBack' });
        }
        loops.forEach(function (a) { a.play(); });
      }, function () {
        media.classList.remove('is-live');
        loops.forEach(function (a) { a.pause(); });
      }, '0px');
    });
  });


  /* -----------------------------------------------------------------------
     08 · TOOLKIT
     ----------------------------------------------------------------------- */
  var kit = $('[data-kit]');
  if (anime && kit) task(function () {
    var grid = $('.kit__grid', kit);
    var tiles = $$('.el', kit);
    var entered = false;
    var cols = function () { return getComputedStyle(grid).gridTemplateColumns.split(' ').length; };

    anime.set(tiles, { opacity: 0, translateY: 28, scale: 0.92 });
    inView(grid, function () {
      if (entered) return;
      entered = true;
      var c = cols();
      anime({
        targets: tiles, opacity: 1, translateY: 0, scale: 1,
        duration: 1000, easing: 'easeOutExpo',
        delay: anime.stagger(32, { grid: [c, Math.ceil(tiles.length / c)], from: 'center' })
      });
    });

    // Filter: matching tiles ripple back in from the first match, others recede
    kit.addEventListener('kit:filter', function () {
      entered = true;
      var on = tiles.filter(function (t) { return !t.classList.contains('is-dim'); });
      var off = tiles.filter(function (t) { return t.classList.contains('is-dim'); });
      var first = tiles.indexOf(on[0]);
      var c = cols();
      anime.remove(tiles);
      anime({ targets: off, opacity: 0.16, scale: 0.94, translateY: 0, duration: 500, easing: 'easeOutQuad' });
      anime({
        targets: on, opacity: 1, scale: [0.9, 1], translateY: 0, duration: 800, easing: 'easeOutExpo',
        delay: anime.stagger(40, { grid: [c, Math.ceil(tiles.length / c)], from: Math.max(first, 0) })
      });
    });
  });


  /* -----------------------------------------------------------------------
     09 · PROCESS
     ----------------------------------------------------------------------- */
  var proc = $('[data-proc]');
  if (hasGsap && proc) now(function () {
    var steps = $$('.pstep', proc);
    var cur = $('.proc__cur', proc);
    var active = -1;
    var setStep = function (i) {
      if (i === active) return;
      active = i;
      steps.forEach(function (s, j) { s.classList.toggle('is-active', j === i); });
      if (cur) cur.textContent = (i < 9 ? '0' : '') + (i + 1);
      if (anime) drawStrokes($$('.pstep__art .d', steps[i]), { duration: 1100, delay: anime.stagger(140) });
    };

    // Desktop: pin the stage and slide the steps sideways
    mm.add('(min-width: 1024px)', function () {
      var pin = $('.proc__pin', proc);
      var track = $('.proc__track', proc);
      var ghost = $('.proc__ghost', proc);
      var bar = $('.proc__bar', proc);
      proc.classList.add('proc--pinned');
      var dist = function () { return Math.max(0, track.scrollWidth - pin.clientWidth); };
      var setDist = function () { proc.style.setProperty('--dist', dist() + 'px'); };
      setDist();
      setStep(0);

      gsap.timeline({
        scrollTrigger: {
          trigger: proc, start: 'top top', end: 'bottom bottom', scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: setDist,
          onUpdate: function (self) {
            bar.style.setProperty('--p', self.progress.toFixed(4));
            setStep(Math.round(self.progress * (steps.length - 1)));
          }
        }
      })
        .to(track, { x: function () { return -dist(); }, ease: 'none' }, 0)
        .to(ghost, { x: function () { return -dist() * 0.35; }, ease: 'none' }, 0);

      return function () {
        proc.classList.remove('proc--pinned');
        proc.style.removeProperty('--dist');
        gsap.set([track, ghost], { clearProps: 'transform' });
        active = -1;
      };
    });

    // Phones & tablets: the rail fills and the step under the reading line lights up
    mm.add('(max-width: 1023px)', function () {
      var track = $('.proc__track', proc);
      gsap.fromTo(track, { '--p': 0 }, {
        '--p': 1, ease: 'none',
        scrollTrigger: { trigger: track, start: 'top 62%', end: 'bottom 62%', scrub: true }
      });
      // a thin "reading line" at 62% of the screen picks the active step
      if (!('IntersectionObserver' in window)) return function () { active = -1; };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) setStep(steps.indexOf(e.target)); });
      }, { rootMargin: '-62% 0px -37% 0px' });
      steps.forEach(function (s) { io.observe(s); });
      return function () { io.disconnect(); active = -1; };
    });
  });


  /* -----------------------------------------------------------------------
     10 · WHY — the opened panel's text arrives line by line
     ----------------------------------------------------------------------- */
  var why = $('[data-why]');
  if (anime && why) task(function () {
    why.addEventListener('why:change', function (e) {
      if (!window.matchMedia('(min-width: 1024px)').matches) return;
      var parts = $$('.why__no, .why__title, .why__text', e.detail.item);
      anime.remove(parts);
      anime({
        targets: parts, opacity: [0, 1], translateY: [22, 0],
        duration: 900, easing: 'easeOutExpo', delay: anime.stagger(80, { start: 260 })
      });
    });
  });


  /* -----------------------------------------------------------------------
     11 · FOOTER WORDMARK — only the giant "VAISHNAV CIBU" at the very bottom
     moves; the footer itself is the original, unchanged.
     - Scrolling down into the footer: the name rises out of its clip line
       and fades in, in step with the scroll.
     - Once it has settled: a soft light sweeps across it with a brief halo.
     - Scrolling back up: it fades and sinks back down (same scrub, reversed).
     The wordmark is the last thing on the page, so the bottom of the page is
     where it settles; nothing extra is added below the footer.
     ----------------------------------------------------------------------- */
  var mark = $('.foot__mark');
  if (hasGsap && mark) now(function () {
    mark.classList.add('is-live');
    var shone = false;
    var shining = false;

    var shimmer = function () {
      if (shining) return;
      shining = true;
      var s = { shine: -40, glow: 0, a: 0 };
      var paint = function () {
        mark.style.setProperty('--shine', s.shine.toFixed(1) + '%');
        mark.style.setProperty('--glow', s.glow.toFixed(1) + 'px');
        mark.style.setProperty('--glow-a', s.a.toFixed(3));
      };
      mark.classList.add('is-glow');
      var done = function () {
        mark.classList.remove('is-glow');
        mark.style.setProperty('--shine', '-40%');
        shining = false;
      };
      if (anime) {
        anime.timeline({ targets: s, update: paint, complete: done })
          .add({ shine: 140, duration: 1700, easing: 'easeInOutSine' }, 450)
          .add({ glow: 22, a: 0.55, duration: 700, easing: 'easeOutQuad' }, 650)
          .add({ glow: 0, a: 0, duration: 1200, easing: 'easeInOutSine' }, 1350);
      } else {
        gsap.timeline({ onUpdate: paint, onComplete: done, delay: 0.45 })
          .to(s, { shine: 140, duration: 1.7, ease: 'sine.inOut' }, 0)
          .to(s, { glow: 22, a: 0.55, duration: 0.7, ease: 'power1.out' }, 0.2)
          .to(s, { glow: 0, a: 0, duration: 1.2, ease: 'sine.inOut' }, 0.9);
      }
    };

    gsap.fromTo(mark, { '--rise': '75%', '--fade': 0 }, {
      '--rise': '0%', '--fade': 1, ease: 'power2.out',
      scrollTrigger: {
        trigger: mark,
        start: 'top bottom',        // its top edge reaches the bottom of the screen
        end: 'bottom bottom',       // the bottom of the page
        scrub: 0.9,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          if (!shone && self.direction > 0 && self.progress > 0.96) { shone = true; shimmer(); }
        },
        // shine again on the next visit (only once it has really scrolled away)
        onLeaveBack: function () { shone = false; }
      }
    });
  });

  /* Keep every trigger measured correctly when the page height changes after
     load: web fonts arrive (their stylesheet switches on after load), images
     are added, the window is resized... Debounced, and only on real changes. */
  if (hasGsap) now(function () {
    // Before the load event ScrollTrigger measures everything itself, so only
    // changes that happen after load need a re-measure.
    var loaded = document.readyState === 'complete';
    var lastH = -1;
    var timer;
    var remeasure = function () {
      if (!loaded) return;
      clearTimeout(timer);
      timer = setTimeout(function () { ST.refresh(); }, 180);
    };
    if (!loaded) window.addEventListener('load', function () { loaded = true; });
    if ('ResizeObserver' in window) {
      new ResizeObserver(function (entries) {
        var h = Math.round(entries[0].contentRect.height);   // no forced layout
        if (lastH !== -1 && Math.abs(h - lastH) > 1) remeasure();
        lastH = h;
      }).observe(document.body);
    }
    if (document.fonts && document.fonts.addEventListener) {
      document.fonts.addEventListener('loadingdone', remeasure);
    }
  });

  runQueue();
})();
