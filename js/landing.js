/**
 * SkillCircle Landing Page
 * Smooth animations and interactions for the landing page
 */

const Landing = {
  // Initialize landing page
  init() {
    this.setupScrollAnimations();
    this.setupIntersectionObserver();
    this.attachEventListeners();
  },

  // Setup scroll animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });
  },

  // Setup intersection observer
  setupIntersectionObserver() {
    const options = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, options);

    document.querySelectorAll('.feature-card, .step-card, .stat-item').forEach((el) => {
      observer.observe(el);
    });
  },

  // Attach event listeners
  attachEventListeners() {
    // Get Started button
    const getStartedBtn = document.querySelectorAll('[data-action="get-started"]');
    getStartedBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        window.location.href = 'pages/browse.html';
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Hover animations on feature cards
    document.querySelectorAll('.feature-card').forEach((card) => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  },

  // Parallax effect on hero
  addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroElements = hero.querySelectorAll('[data-parallax]');
      heroElements.forEach((el) => {
        const speed = el.dataset.parallax || 0.5;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  },
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Landing.init();
});
