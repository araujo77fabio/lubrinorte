// ============================================
// LUBRINORTE ANIMATIONS
// GSAP 3.12.5 + Lenis smooth scroll
// ============================================

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  gestureOrientation: 'vertical',
  normalizeWheel: false,
  smoothTouch: false,
});

// Integrate Lenis with requestAnimationFrame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ============================================
// HERO ANIMATIONS
// ============================================
const heroTimeline = gsap.timeline();

heroTimeline
  .from('.badge', {
    opacity: 0,
    y: 20,
    duration: 0.6,
  }, 0.2)
  .from('h1', {
    opacity: 0,
    y: 30,
    duration: 0.8,
  }, 0.3)
  .from('.hero p', {
    opacity: 0,
    y: 20,
    duration: 0.6,
  }, 0.5)
  .from('.hero-actions .btn', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.15,
  }, 0.7)
  .from('.hero-card', {
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
  }, 0.4);

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Section head animations
gsap.utils.toArray('.section-head').forEach((element) => {
  gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 50%',
      scrub: 0.5,
    },
  });
});

// Card stagger animations
gsap.utils.toArray('.cards').forEach((cardsContainer) => {
  gsap.from(cardsContainer.querySelectorAll('.card'), {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.15,
    scrollTrigger: {
      trigger: cardsContainer,
      start: 'top 75%',
      end: 'top 25%',
      scrub: 0.5,
    },
  });
});

// Catalog items animation
gsap.utils.toArray('.catalog').forEach((catalogContainer) => {
  gsap.from(catalogContainer.querySelectorAll('.catalog-item'), {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: catalogContainer,
      start: 'top 75%',
      end: 'top 25%',
      scrub: 0.5,
    },
  });
});

// Quote box animation
gsap.from('.quote-box', {
  opacity: 0,
  y: 50,
  duration: 0.8,
  scrollTrigger: {
    trigger: '.quote-box',
    start: 'top 80%',
    end: 'top 50%',
    scrub: 0.5,
  },
});

// ============================================
// PARALLAX EFFECTS
// ============================================

// Hero background parallax
gsap.to('.hero::after', {
  y: 100,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
});

// ============================================
// TRUCK FLEET SECTION (if present)
// ============================================

const truckFleetTitle = document.querySelector('.truck-fleet-title');
if (truckFleetTitle) {
  // Animate title spans
  gsap.from('.truck-fleet-title span', {
    duration: 0.8,
    clipPath: 'inset(0 100% 0 0)',
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.3,
    scrollTrigger: {
      trigger: '.truck-fleet-section',
      start: 'top 70%',
    },
  });

  // Animate subtitle
  gsap.from('.truck-fleet-subtitle', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.6,
    scrollTrigger: {
      trigger: '.truck-fleet-section',
      start: 'top 70%',
    },
  });

  // Animate stats with counter
  gsap.utils.toArray('.truck-fleet-stat').forEach((stat, index) => {
    const strongEl = stat.querySelector('strong');
    if (strongEl && strongEl.textContent.match(/\d+/)) {
      const finalValue = parseInt(strongEl.textContent);
      gsap.to({ value: 0 }, {
        value: finalValue,
        duration: 1.5,
        delay: 0.8 + index * 0.1,
        onUpdate: function() {
          strongEl.textContent = Math.floor(this.targets()[0].value).toLocaleString('pt-BR');
        },
        scrollTrigger: {
          trigger: '.truck-fleet-section',
          start: 'top 50%',
        },
      });
    }
  });
}

// ============================================
// SCROLL INDICATORS
// ============================================

// Add scroll indicator animation for hero
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  gsap.to(scrollIndicator, {
    y: 10,
    opacity: 0.3,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });
}

// ============================================
// FORM INTERACTIONS
// ============================================

// Form inputs focus animation
gsap.utils.toArray('input, textarea, select').forEach((input) => {
  input.addEventListener('focus', () => {
    gsap.to(input, {
      boxShadow: '0 0 20px rgba(216, 177, 74, 0.3)',
      duration: 0.3,
    });
  });

  input.addEventListener('blur', () => {
    gsap.to(input, {
      boxShadow: '0 0 0px rgba(216, 177, 74, 0)',
      duration: 0.3,
    });
  });
});

// Button hover animation
gsap.utils.toArray('.btn').forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.2,
      overwrite: 'auto',
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.2,
      overwrite: 'auto',
    });
  });
});

// ============================================
// CUSTOM CURSOR (Desktop only)
// ============================================

if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<div class="cursor-dot"></div>';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      overwrite: 'auto',
    });
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.matches('a, button, .btn')) {
      gsap.to(cursor, { scale: 2, duration: 0.2 });
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.matches('a, button, .btn')) {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    }
  });
}

console.log('✅ Lubrinorte animations loaded');
