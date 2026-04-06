/**
 * SkillCircle Browse Page
 * Main logic for displaying and filtering skill exchanges
 */

const App = {
  activeFilter: 'all',
  currentConnectId: null,

  // Category icons mapping
  CATEGORY_ICONS: {
    Education: 'fa-book',
    Tech: 'fa-laptop',
    Arts: 'fa-palette',
    Health: 'fa-heart',
    Trades: 'fa-tools',
    Language: 'fa-globe',
    Business: 'fa-chart-line',
    Other: 'fa-star',
  },

  // Initialize the app
  init() {
    this.setupEventListeners();
    this.renderCards();
    this.updateStats();
    UI.addScrollReveal();
  },

  // Setup event listeners
  setupEventListeners() {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const headerNav = document.getElementById('headerNav');
    
    if (hamburger && headerNav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        headerNav.classList.toggle('active');
      });

      // Close menu when a link is clicked
      headerNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          headerNav.classList.remove('active');
        });
      });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setFilter(btn);
      });
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener(
        'input',
        UI.debounce(() => this.renderCards(), 200)
      );
    }

    // Post form
    const postBtn = document.querySelector('.btn-post');
    if (postBtn) {
      postBtn.addEventListener('click', () => this.postCard());
    }

    // Modal actions - setup after DOM load
    setTimeout(() => {
      const sendBtn = document.querySelector('.btn-send');
      if (sendBtn) {
        sendBtn.addEventListener('click', () => this.sendMessage());
      }

      const cancelBtn = document.querySelector('.btn-cancel');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => UI.closeModal('modalBg'));
      }
    }, 100);
  },

  // Set filter
  setFilter(btn) {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    this.activeFilter = btn.dataset.filter || btn.textContent.toLowerCase();
    this.renderCards();
  },

  // Render cards based on filters
  renderCards() {
    const grid = document.getElementById('cardsGrid');
    if (!grid) return;

    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    let cards = Storage.getCards();

    // Apply filters
    const filtered = cards.filter((card) => {
      const matchFilter =
        this.activeFilter === 'all' ||
        card.type === this.activeFilter ||
        card.category === this.activeFilter;

      const matchSearch =
        !searchQuery ||
        card.offer.toLowerCase().includes(searchQuery) ||
        card.need.toLowerCase().includes(searchQuery) ||
        card.name.toLowerCase().includes(searchQuery) ||
        card.category.toLowerCase().includes(searchQuery);

      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <span class="empty-state-icon"><i class="fas fa-search"></i></span>
          <h3>No exchanges found</h3>
          <p>Try adjusting your filters or be the first to post one!</p>
          <button class="btn btn-primary" onclick="document.querySelector('.post-form').scrollIntoView({behavior: 'smooth'})">Post a skill exchange</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((card, index) => this.createCardHTML(card, index))
      .join('');

    // Add event listeners to connect buttons
    document.querySelectorAll('.btn-connect').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cardId = parseInt(btn.dataset.id);
        this.openConnect(cardId);
      });
    });
  },

  // Create card HTML
  createCardHTML(card, index) {
    const typeLabel = card.type === 'offer' ? 'Offering' : 'Seeking';
    const mainSkill = card.type === 'offer' ? card.offer : card.need;
    const counterSkill = card.type === 'offer' ? card.need : card.offer;

    return `
      <div class="card-skill" style="animation-delay: ${index * 0.05}s;">
        <div class="card-type-bar ${card.type}"></div>
        <div class="card-header">
          <div class="card-user">
            <div class="avatar ${card.type}">${UI.getInitials(card.name)}</div>
            <div class="card-user-info">
              <div class="card-name">${this.escapeHtml(card.name)}</div>
              <div class="card-location">
                <i class="fas fa-map-pin"></i>
                <span>${this.escapeHtml(card.location || 'Somewhere')}</span>
              </div>
            </div>
          </div>
          <span class="type-badge ${card.type}">${typeLabel}</span>
        </div>
        <div class="card-title">${this.escapeHtml(mainSkill)}</div>
        ${card.desc ? `<div class="card-desc">${this.escapeHtml(card.desc)}</div>` : ''}
        <div class="card-footer">
          <span class="card-category">
            <i class="fas ${this.CATEGORY_ICONS[card.category] || 'fa-star'}"></i>
            <span>${this.escapeHtml(card.category)}</span>
          </span>
          <span class="card-exchange">
            needs <strong>${this.escapeHtml(counterSkill)}</strong>
          </span>
          <button class="btn-connect ${card.connected ? 'connected' : ''}" 
                  data-id="${card.id}"
                  ${card.connected ? 'disabled' : ''}>
            ${card.connected ? '<i class="fas fa-check"></i> Connected' : 'Connect'}
          </button>
        </div>
      </div>
    `;
  },

  // Open connection modal
  openConnect(cardId) {
    const card = Storage.getCards().find((c) => c.id === cardId);
    if (!card) return;

    this.currentConnectId = cardId;

    const title = document.getElementById('modalTitle');
    const desc = document.getElementById('modalDesc');
    const message = document.getElementById('modalMessage');

    if (title) title.textContent = `Connect with ${this.escapeHtml(card.name)}`;

    const skillInfo =
      card.type === 'offer'
        ? `offers ${this.escapeHtml(card.offer)} and needs help with ${this.escapeHtml(card.need)}`
        : `needs ${this.escapeHtml(card.need)} and offers ${this.escapeHtml(card.offer)}`;

    if (desc)
      desc.textContent = `${this.escapeHtml(card.name)} ${skillInfo}. Send them a message to start the exchange.`;

    if (message) {
      const firstName = card.name.split(' ')[0];
      message.value = `Hi ${this.escapeHtml(firstName)}! I came across your post on SkillCircle. I think we could do a great exchange — `;
    }

    UI.openModal('modalBg');
  },

  // Send connection message
  sendMessage() {
    if (this.currentConnectId === null) return;

    const messageText = document.getElementById('modalMessage')?.value.trim();
    if (!messageText) {
      UI.showToast('Please write a message!', 'error');
      return;
    }

    const card = Storage.getCards().find((c) => c.id === this.currentConnectId);
    if (!card) return;

    // Add connection to storage
    Storage.addConnection({
      cardId: this.currentConnectId,
      senderName: 'You',
      message: messageText,
      status: 'pending',
    });

    // Close modal
    UI.closeModal('modalBg');
    this.currentConnectId = null;

    // Reset form
    const messageField = document.getElementById('modalMessage');
    if (messageField) messageField.value = '';

    // Update display
    this.renderCards();
    this.updateStats();

    UI.showToast(
      `✓ Message sent to ${card.name.split(' ')[0]}! Your skill exchange journey begins.`,
      'success'
    );
  },

  // Post a new card
  postCard() {
    const name = (document.getElementById('fName')?.value || '').trim();
    const location = (document.getElementById('fLocation')?.value || '').trim();
    const offer = (document.getElementById('fOffer')?.value || '').trim();
    const need = (document.getElementById('fNeed')?.value || '').trim();
    const desc = (document.getElementById('fDesc')?.value || '').trim();
    const category = document.getElementById('fCategory')?.value || 'Other';
    const type = document.getElementById('fType')?.value || 'offer';

    // Validation
    if (!name || !offer || !need) {
      UI.showToast('⚠️ Please fill in your name, what you offer, and what you need.', 'error');
      return;
    }

    // Add card to storage
    const newCard = Storage.addCard({
      name,
      location: location || 'Your community',
      offer,
      need,
      desc,
      category,
      type,
    });

    // Clear form
    document.getElementById('fName').value = '';
    document.getElementById('fLocation').value = '';
    document.getElementById('fOffer').value = '';
    document.getElementById('fNeed').value = '';
    document.getElementById('fDesc').value = '';
    document.getElementById('fCategory').value = 'Education';
    document.getElementById('fType').value = 'offer';

    // Update display
    this.renderCards();
    this.updateStats();

    UI.showToast('✓ Your skill exchange is live! Someone will connect with you soon.', 'success');
  },

  // Update stats display
  updateStats() {
    const stats = Storage.getStats();
    const totalCountEl = document.getElementById('totalCount');
    const connectCountEl = document.getElementById('connectCount');

    if (totalCountEl) {
      totalCountEl.textContent = Storage.getCards().length;
    }
    if (connectCountEl) {
      connectCountEl.textContent = stats.totalConnections || 0;
    }
  },

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
