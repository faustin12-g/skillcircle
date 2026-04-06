# SkillCircle — Community Skill Exchange Platform

A modern, fully functional skill exchange platform built with vanilla HTML, CSS, and JavaScript. No backend required. Works entirely in the browser using localStorage for data persistence.

## 🎯 Project Vision

Enable millions of people with valuable skills to connect directly with others who need them—without money, without platforms taking fees, just pure human-to-human skill exchange.

## 📁 Project Structure

```
SkillCircle/
├── index.html              # Landing page with hero and features
├── css/
│   ├── variables.css       # Design system variables & typography
│   ├── components.css      # Reusable UI components (buttons, cards, forms, modals)
│   ├── landing.css         # Landing page animations & styles
│   └── browse.css          # Browse page layout & components
├── js/
│   ├── storage.js          # localStorage management & data persistence
│   ├── ui.js               # UI utilities (modals, toasts, animations)
│   ├── browse.js           # Browse page logic & interactions
│   └── landing.js          # Landing page animations
├── pages/
│   ├── browse.html         # Main skill exchange board
│   ├── how-it-works.html   # Step-by-step guide
│   └── faq.html            # Frequently asked questions
├── assets/                 # Folder for future icons & images
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Ink**: #1a1612 (primary dark text)
- **Paper**: #f5f0e8 (primary light background)
- **Warm**: #e8dfc8 (accent light)
- **Accent**: #c84b2f (coral/orange for requests)
- **Accent2**: #2f6b4b (green for offerings)
- **Gold**: #d4952a (premium highlight)
- **Muted**: #8a7f6e (secondary text)

### Typography
- **Serif**: Fraunces (headlines, brand)
- **Sans-serif**: DM Sans (body, UI)
- **Weights**: 300, 400, 500, 600, 700, 900

### Components
- Buttons (primary, secondary, success, outline)
- Cards with hover animations
- Forms with focus states
- Modals with backdrop blur
- Toast notifications
- Badges & pills
- Tabs & filters

## 🚀 Features

### Landing Page (`index.html`)
- Smooth hero section with animated gradients
- Feature cards with staggered animations
- Statistics section
- How-it-works step guide
- Call-to-action sections
- Scroll reveal animations

### Browse Page (`pages/browse.html`)
- Post form for creating skill exchanges
- Real-time filtering & search
- Card grid with smooth animations
- Connection modal with messaging
- Statistics tracking
- Responsive design

### How It Works (`pages/how-it-works.html`)
- Step-by-step guide to using the platform
- Tips for successful exchanges
- Clear explanations

### FAQ (`pages/faq.html`)
- Expandable Q&A sections
- Smooth animations on expand/collapse
- Common questions answered

## 💾 Data Persistence

All data is stored locally in the browser using localStorage:
- **skilcircle_cards**: All posted skill exchanges
- **skillcircle_connections**: Connection records
- **skillcircle_stats**: Platform statistics

Data persists across sessions but is cleared if browser storage is cleared.

## 🎭 Animation Features

### Landing Page
- Floating gradient backgrounds
- Fade-up-in animations on scroll
- Staggered card animations
- Bounce effects on icons
- Scale-in transitions for modals

### Browse Page
- Card entry animations with stagger effect
- Smooth filter transitions
- Toast notifications with slide effect
- Modal backdrop blur
- Hover animations on cards and buttons

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 768px for tablets
- Full desktop support
- Touch-friendly buttons and interactions
- Responsive navigation

## 🔒 Privacy & Security

- **No backend/server**: All data stored locally in browser
- **No tracking**: No analytics or data collection
- **No authentication needed**: Use pseudonyms if desired
- **No data sync**: Information stays on user's device

## 🛠️ How to Use

1. Open `index.html` in a modern web browser
2. Click "Get Started" to go to the browse page
3. Fill out the post form to share your skills
4. Browse other community members' posts
5. Click "Connect" to send someone a message
6. Exchange skills directly with that person

## 📊 Data Model

### Card (Skill Exchange Post)
```javascript
{
  id: number,
  name: string,
  location: string,
  offer: string,
  need: string,
  desc: string (optional),
  category: string,
  type: 'offer' | 'request',
  connected: boolean,
  createdAt: ISO string
}
```

### Connection
```javascript
{
  id: number,
  cardId: number,
  senderName: string,
  message: string,
  status: 'pending' | 'accepted' | 'completed',
  createdAt: ISO string
}
```

## 🎯 Categories

- 📚 Education & tutoring
- 💻 Tech & digital
- 🎨 Arts & creativity
- 🌿 Health & wellness
- 🔧 Trades & DIY
- 🌍 Language & culture
- 📈 Business & finance
- ✨ Other

## 🔄 Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Future Enhancements

- User profiles & reputation system
- Image uploads
- Video tutorials
- Messaging system (in-app)
- Geographic matching
- Skill ratings & reviews
- Calendar integration
- Mobile app
- Multiple languages

## 📝 License

Open source. Free to use, modify, and distribute.

## 💡 Contributing

Found a bug? Have an idea? Feel free to suggest improvements!

---

**SkillCircle** — Because your skills are someone's solution.
