// ============================================================
//  SIRA CHAUFFEUR — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // ---- MOBILE MENU ----
  const hamburger = document.querySelector('.hamburger');
  let mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && !mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <button class="mobile-close" style="position:absolute;top:30px;right:30px;background:none;border:none;color:#C9A84C;font-size:28px;cursor:pointer;">✕</button>
      <a href="../index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="fleet.html">Our Fleet</a>
      <a href="pricing.html">Pricing</a>
      <a href="booking.html">Book Now</a>
      <a href="contact.html">Contact</a>
    `;
    document.body.appendChild(mobileMenu);

    const closeBtn = mobileMenu.querySelector('.mobile-close');
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }

  // ---- FLEET TABS ----
  const fleetTabs = document.querySelectorAll('.fleet-tab');
  const fleetCards = document.querySelectorAll('.fleet-card');

  fleetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.fleet;

      fleetTabs.forEach(t => t.classList.remove('active'));
      fleetCards.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const card = document.querySelector(`.fleet-card[data-fleet="${target}"]`);
      if (card) card.classList.add('active');
    });
  });

  // ---- FADE IN ANIMATIONS ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
        }, 25);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObserver.observe(el));

  // ---- BOOKING FORM ----
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Sending Request...</span>';
      btn.disabled = true;

      setTimeout(() => {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.3);
          padding: 24px;
          text-align: center;
          margin-top: 20px;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: #C9A84C;
          text-transform: uppercase;
        `;
        successMsg.textContent = '✦ Your request has been received. We\'ll contact you within 30 minutes.';
        bookingForm.appendChild(successMsg);
        btn.innerHTML = originalText;
        btn.disabled = false;
        bookingForm.reset();
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => successMsg.remove(), 6000);
      }, 1500);
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    }
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
