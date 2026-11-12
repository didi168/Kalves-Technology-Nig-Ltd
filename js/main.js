/* ==========================================================================
   Kalves Technology Nig Ltd — Main Script
   Blocks: Smooth Scroll & Motion | Header & Mobile Drawer | Showcase Tabs |
           FAQ Accordion | Static Quote & Newsletter Forms
   ========================================================================== */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice =
    window.matchMedia('(hover: none), (pointer: coarse)').matches ||
    'ontouchstart' in window;

  let lenis = null;

  /* ------------------------------------------------------------------------
     1. Failsafe reveal & GSAP + Lenis initialization
     ------------------------------------------------------------------------ */
  const revealAllFallback = () => {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
      el.style.opacity = '';
      el.style.transform = '';
    });
  };

  // Reveal content if CDNs fail or slow down on limited mobile data
  const failsafeTimer = window.setTimeout(revealAllFallback, 2200);

  const initMotion = () => {
    const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
    const hasLenis = typeof window.Lenis !== 'undefined';

    if (prefersReducedMotion || !hasGSAP) {
      window.clearTimeout(failsafeTimer);
      revealAllFallback();
      return;
    }

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Smooth scroll only on non-touch desktops when motion is allowed
    if (hasLenis && !isTouchDevice) {
      lenis = new window.Lenis({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // Hero entrance — subtle vertical settle without hiding LCP text
      const heroItems = document.querySelectorAll('[data-hero-reveal]');
      if (heroItems.length) {
        gsap.from(heroItems, {
          y: 12,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform',
        });
      }

      // Section scroll reveals
      document.querySelectorAll('[data-reveal]:not([data-hero-reveal])').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
            onStart: () => el.classList.add('is-revealed'),
          }
        );
      });
    });

    mm.add('(max-width: 767px)', () => {
      // Lightweight reveal on mobile — no pinned or scrub-heavy effects
      revealAllFallback();
    });

    window.addEventListener('orientationchange', () => {
      window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });

    window.clearTimeout(failsafeTimer);
  };

  /* ------------------------------------------------------------------------
     2. Sticky Header State & Smooth Anchor Navigation
     ------------------------------------------------------------------------ */
  const initHeaderAndAnchors = () => {
    const header = document.querySelector('.site-header');
    if (header) {
      const updateHeader = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      };
      updateHeader();
      window.addEventListener('scroll', updateHeader, { passive: true });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        revealAllFallback();
        const headerOffset = 78;

        if (lenis) {
          lenis.scrollTo(target, { offset: -headerOffset });
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({
            top: Math.max(0, top),
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
      });
    });
  };

  /* ------------------------------------------------------------------------
     3. Accessible Mobile Menu Drawer (Focus Trap, Esc, Outside & Link Close)
     ------------------------------------------------------------------------ */
  const initMobileMenu = () => {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.getElementById('mobile-menu');
    if (!toggleBtn || !drawer) return;

    const closeBtn = drawer.querySelector('.mobile-drawer-close');
    const backdrop = drawer.querySelector('.mobile-drawer-backdrop');
    const panel = drawer.querySelector('.mobile-drawer-panel');
    const navLinks = drawer.querySelectorAll('a');

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    const openMenu = () => {
      drawer.hidden = false;
      requestAnimationFrame(() => drawer.classList.add('is-open'));
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      if (lenis) lenis.stop();
      closeBtn?.focus();
    };

    const closeMenu = ({ restoreFocus = true } = {}) => {
      if (drawer.hidden) return;
      drawer.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (lenis) lenis.start();

      window.setTimeout(() => {
        if (!drawer.classList.contains('is-open')) {
          drawer.hidden = true;
        }
      }, 260);

      if (restoreFocus) toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeMenu();
      else openMenu();
    });

    closeBtn?.addEventListener('click', () => closeMenu());
    backdrop?.addEventListener('click', () => closeMenu());
    navLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu({ restoreFocus: false }));
    });

    document.addEventListener('keydown', (e) => {
      if (drawer.hidden) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  };

  /* ------------------------------------------------------------------------
     4. Showcase Tabs (All Channels / Perimeter PTZ / Mobile & Tablet)
     ------------------------------------------------------------------------ */
  const initShowcaseTabs = () => {
    const tabs = document.querySelectorAll('[role="tab"][data-showcase-tab]');
    const panels = document.querySelectorAll('[role="tabpanel"][data-showcase-panel]');
    if (!tabs.length || !panels.length) return;

    const activateTab = (tab) => {
      const targetKey = tab.getAttribute('data-showcase-tab');
      tabs.forEach((btn) => {
        const isCurrent = btn === tab;
        btn.classList.toggle('is-active', isCurrent);
        btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        btn.setAttribute('tabindex', isCurrent ? '0' : '-1');
      });

      panels.forEach((panel) => {
        const matches = panel.getAttribute('data-showcase-panel') === targetKey;
        panel.hidden = !matches;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (e) => {
        let nextIndex = null;
        if (e.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (e.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (nextIndex !== null) {
          e.preventDefault();
          tabs[nextIndex].focus();
          activateTab(tabs[nextIndex]);
        }
      });
    });
  };

  /* ------------------------------------------------------------------------
     5. FAQ Accordion
     ------------------------------------------------------------------------ */
  const initFAQ = () => {
    const triggers = document.querySelectorAll('.faq-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const panelId = trigger.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (!panel) return;

        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        panel.hidden = isOpen;
      });
    });
  };

  /* ------------------------------------------------------------------------
     6. Static Forms (No network request — UI validation only)
     ------------------------------------------------------------------------ */
  const initForms = () => {
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      const statusBox = document.getElementById('quote-form-status');

      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let firstInvalid = null;

        quoteForm.querySelectorAll('.field').forEach((wrap) => {
          const input = wrap.querySelector('input, select, textarea');
          const err = wrap.querySelector('.field-error');
          wrap.classList.remove('is-invalid');
          if (err) err.textContent = '';

          if (input && input.hasAttribute('required') && !input.value.trim()) {
            wrap.classList.add('is-invalid');
            if (err) err.textContent = 'Please fill in this field.';
            if (!firstInvalid) firstInvalid = input;
          } else if (input && input.type === 'email' && input.value.trim()) {
            const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
            if (!validEmail) {
              wrap.classList.add('is-invalid');
              if (err) err.textContent = 'Enter a valid email address.';
              if (!firstInvalid) firstInvalid = input;
            }
          }
        });

        if (firstInvalid) {
          firstInvalid.focus();
          if (statusBox) statusBox.hidden = true;
          return;
        }

        if (statusBox) {
          statusBox.hidden = false;
          statusBox.textContent =
            'Quote details captured (demo form). For an immediate response, tap Chat on WhatsApp or call +234 815 239 5154.';
        }
        quoteForm.reset();
      });
    }

    const footerForm = document.getElementById('footer-newsletter-form');
    if (footerForm) {
      const note = document.getElementById('footer-newsletter-note');
      footerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = footerForm.querySelector('input[type="email"]');
        if (!emailInput || !emailInput.value.trim()) {
          emailInput?.focus();
          return;
        }
        if (note) {
          note.textContent = 'Thank you. Reach us directly on WhatsApp or +234 815 239 5154 anytime.';
        }
        footerForm.reset();
      });
    }
  };

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initMotion();
    initHeaderAndAnchors();
    initMobileMenu();
    initShowcaseTabs();
    initFAQ();
    initForms();

    if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();
