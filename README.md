# SkillCircle

A modern skill exchange platform built with HTML, CSS, and JavaScript. Connect and trade skills directly—no money, no fees.

## Features

- Landing page with hero and animations
- Browse and post skills
- Real-time search and filtering
- How It Works guide
- FAQ section
- Local data persistence with localStorage

## Tech Stack

- HTML5, CSS3, JavaScript
- Font Awesome icons
- Google Fonts (Fraunces, DM Sans)
- No backend required

## Get Started

1. Open `index.html` in your browser
2. Browse skills or post your own
3. Connect with others to exchange skills
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
