/**
 * SkillCircle Storage Manager
 * Handles localStorage persistence for the app
 */

const Storage = {
  // Keys
  KEYS: {
    CARDS: 'skillcircle_cards',
    CONNECTIONS: 'skillcircle_connections',
    STATS: 'skillcircle_stats',
  },

  // Initialize storage with default data
  init() {
    if (!this.get(this.KEYS.CARDS)) {
      this.set(this.KEYS.CARDS, this.getDefaultCards());
    }
    if (!this.get(this.KEYS.CONNECTIONS)) {
      this.set(this.KEYS.CONNECTIONS, []);
    }
    if (!this.get(this.KEYS.STATS)) {
      this.set(this.KEYS.STATS, {
        totalPosts: 0,
        totalConnections: 0,
      });
    }
  },

  // Get data from localStorage
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  // Set data in localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  // Get all cards
  getCards() {
    return this.get(this.KEYS.CARDS) || [];
  },

  // Add a new card
  addCard(card) {
    const cards = this.getCards();
    const newCard = {
      id: Date.now(),
      ...card,
      connected: false,
      createdAt: new Date().toISOString(),
    };
    cards.unshift(newCard);
    this.set(this.KEYS.CARDS, cards);

    // Update stats
    const stats = this.get(this.KEYS.STATS) || {};
    stats.totalPosts = (stats.totalPosts || 0) + 1;
    this.set(this.KEYS.STATS, stats);

    return newCard;
  },

  // Update a card
  updateCard(id, updates) {
    const cards = this.getCards();
    const index = cards.findIndex((c) => c.id === id);
    if (index !== -1) {
      cards[index] = { ...cards[index], ...updates };
      this.set(this.KEYS.CARDS, cards);
      return cards[index];
    }
    return null;
  },

  // Delete a card
  deleteCard(id) {
    const cards = this.getCards();
    const filtered = cards.filter((c) => c.id !== id);
    this.set(this.KEYS.CARDS, filtered);
    return filtered;
  },

  // Get all connections
  getConnections() {
    return this.get(this.KEYS.CONNECTIONS) || [];
  },

  // Add a connection
  addConnection(connection) {
    const connections = this.getConnections();
    const newConnection = {
      id: Date.now(),
      ...connection,
      createdAt: new Date().toISOString(),
    };
    connections.unshift(newConnection);
    this.set(this.KEYS.CONNECTIONS, connections);

    // Update card as connected
    this.updateCard(connection.cardId, { connected: true });

    // Update stats
    const stats = this.get(this.KEYS.STATS) || {};
    stats.totalConnections = (stats.totalConnections || 0) + 1;
    this.set(this.KEYS.STATS, stats);

    return newConnection;
  },

  // Get stats
  getStats() {
    return this.get(this.KEYS.STATS) || { totalPosts: 0, totalConnections: 0 };
  },

  // Default cards for initial load
  getDefaultCards() {
    return [
      {
        id: 1,
        name: 'Amara K.',
        location: 'Kigali, Rwanda',
        offer: 'French lessons',
        need: 'Web design basics',
        desc: 'Native French speaker, can teach conversation & grammar. Looking for help building a simple portfolio site.',
        category: 'Language',
        type: 'offer',
        connected: false,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        name: 'David M.',
        location: 'Nairobi, Kenya',
        offer: 'Python programming',
        need: 'Guitar lessons',
        desc: '5 years of coding experience. Would love to finally learn to play acoustic guitar in exchange!',
        category: 'Tech',
        type: 'offer',
        connected: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        name: 'Sofia R.',
        location: 'Lagos, Nigeria',
        offer: 'Graphic design',
        need: 'Accounting help',
        desc: 'I do logos, branding, social media graphics. Really struggling with bookkeeping for my small business.',
        category: 'Arts',
        type: 'offer',
        connected: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 4,
        name: 'James O.',
        location: 'Accra, Ghana',
        offer: 'Cooking (West African)',
        need: 'English writing',
        desc: 'Can teach jollof rice, fufu, and more! I need help improving my formal writing for job applications.',
        category: 'Health',
        type: 'offer',
        connected: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 5,
        name: 'Leila A.',
        location: 'Cairo, Egypt',
        offer: 'Arabic calligraphy',
        need: 'Photography basics',
        desc: 'Teaching traditional calligraphy. Would love to learn how to photograph my artwork properly.',
        category: 'Arts',
        type: 'request',
        connected: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 6,
        name: 'Carlos V.',
        location: 'Bogotá, Colombia',
        offer: 'Spanish tutoring',
        need: 'Excel & spreadsheets',
        desc: 'Patient Spanish teacher. My business needs someone who can help me organize finances in Excel.',
        category: 'Education',
        type: 'offer',
        connected: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 7,
        name: 'Priya N.',
        location: 'Mumbai, India',
        offer: 'Yoga & meditation',
        need: 'App development help',
        desc: 'Certified yoga instructor. Looking to build a simple mobile app to manage class bookings.',
        category: 'Health',
        type: 'offer',
        connected: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 8,
        name: 'Tariq H.',
        location: 'Kampala, Uganda',
        offer: 'Car repair basics',
        need: 'Social media management',
        desc: "Mechanic with 10 years experience. Need help growing my workshop's online presence.",
        category: 'Trades',
        type: 'request',
        connected: false,
        createdAt: new Date().toISOString(),
      },
    ];
  },

  // Clear all data
  clear() {
    localStorage.clear();
  },
};

// Initialize storage when script loads
document.addEventListener('DOMContentLoaded', () => {
  Storage.init();
});
