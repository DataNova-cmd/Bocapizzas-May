/* =====================================================
   BOCAPIZZAS MAY — JavaScript
   ===================================================== */

(function () {
  'use strict';

  /* ---- Nav burger ---- */
  const burger  = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* ---- Fade-in on scroll (IntersectionObserver) ---- */
  const fadeTargets = document.querySelectorAll(
    '.menu-card, .salsa-item, .review-card, .contact-card, .horario-card, .section-header'
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeTargets.forEach((el, i) => {
      el.classList.add('fade-in');
      // Stagger delay per item (capped)
      el.style.transitionDelay = Math.min(i * 60, 300) + 'ms';
      io.observe(el);
    });
  } else {
    // Fallback: show everything
    fadeTargets.forEach(el => el.classList.add('visible'));
  }

  /* ---- Navbar scroll style ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.style.background = window.scrollY > 50
        ? 'rgba(17,24,39,0.99)'
        : 'rgba(17,24,39,0.96)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Active bottom bar button on scroll ---- */
  const sections = document.querySelectorAll('section[id], main section[id]');
  const bottomBtns = document.querySelectorAll('.bottombar__btn');

  if (sections.length && bottomBtns.length) {
    const activateBtn = (id) => {
      bottomBtns.forEach(btn => {
        const href = btn.getAttribute('href');
        btn.classList.toggle('active', href === '#' + id);
      });
    };

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activateBtn(entry.target.id);
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
  }

})();
