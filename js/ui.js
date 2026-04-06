/**
 * SkillCircle UI Utilities
 * Handles modals, toasts, and common UI interactions
 */

const UI = {
  // Show toast notification
  showToast(message, type = 'default') {
    const existingToast = document.getElementById('toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `toast ${type}`;
    toast.textContent = message;

    if (type === 'success') {
      toast.classList.add('toast-success');
    } else if (type === 'error') {
      toast.classList.add('toast-error');
    }

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  // Open modal
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  // Close modal
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  // Toggle modal
  toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (modal.classList.contains('open')) {
        this.closeModal(modalId);
      } else {
        this.openModal(modalId);
      }
    }
  },

  // Get initials from name
  getInitials(name) {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },

  // Scroll to element
  scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  },

  // Add scroll reveal animation to elements
  addScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const reveal = () => {
      revealElements.forEach((el) => {
        if (this.isInViewport(el)) {
          el.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
  },

  // Create loading skeleton
  createSkeleton(count = 6) {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton-card';
      skeletons.push(skeleton);
    }
    return skeletons;
  },

  // Debounce function
  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach((modal) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal-overlay.open');
    openModals.forEach((modal) => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
