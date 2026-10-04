(function() {
  // ── Particles ──────────────────────────────────────
  var container = document.getElementById('particles');
  if (container) {
    for (var i = 0; i < 30; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      var size = Math.random() * 3 + 1;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-10px';
      p.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
      p.style.animationDuration = (Math.random() * 10 + 8) + 's';
      p.style.animationDelay = (Math.random() * 8) + 's';
      container.appendChild(p);
    }
  }

  // ── Navbar scroll ──────────────────────────────────
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Active nav link ────────────────────────────────
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActive() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function(sec) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        var active = document.querySelector('.nav-link[data-section="' + sec.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // ── Mobile menu ────────────────────────────────────
  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ── Scroll reveal ──────────────────────────────────
  var revealSelectors = [
    '.reveal-item', '.reveal-card', '.reveal-timeline',
    '.reveal-project', '.reveal-ai', '.reveal-ai-tech',
    '.reveal-skill', '.reveal-edu'
  ];

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealSelectors.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) { observer.observe(el); });
  });

  // ── Hero entrance ──────────────────────────────────
  var heroItems = document.querySelectorAll('.hero .reveal-item');
  heroItems.forEach(function(item, i) {
    setTimeout(function() { item.classList.add('visible'); }, 300 + i * 150);
  });

  // ── Scroll hint hide ───────────────────────────────
  var scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    window.addEventListener('scroll', function() {
      scrollHint.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
  }

  // ── Smooth scroll for anchor links ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
