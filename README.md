# React Portfolio Project

A modern, responsive portfolio website built with React, Vite, and TailwindCSS featuring smooth animations and multi-language support.

## Features

- 🚀 Built with Vite for fast development
- 🎨 Styled with TailwindCSS and custom gradients
- ✨ Smooth animations with Framer Motion and GSAP
- 🌐 Multi-language support (English/Hindi)
- 📱 Mobile-first responsive design
- 🎯 Smooth scrolling with Lenis
- 📊 Scroll progress indicator
- 🔄 Infinite scrolling brand logos
- 📧 Contact form with validation

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install additional required packages:**
   ```bash
   npm install @tailwindcss/typography
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── BottomNav.jsx
│   ├── ScrollProgress.jsx
│   └── LanguageToggle.jsx
├── pages/              # Page sections
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Brands.jsx
│   ├── Skills.jsx
│   ├── Certifications.jsx
│   ├── Portfolio.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── context/            # React context
│   └── LanguageContext.jsx
├── utils/              # Utility functions
│   └── animations.js
├── text/               # Translation files
│   ├── en.json
│   └── hi.json
└── App.jsx
```

## Media Assets

### Suggested Sources:
- **Backgrounds**: Unsplash (abstract gradients, tech backgrounds)
- **Project Images**: Pexels Videos for dynamic content
- **Icons**: Simple Icons CDN (already integrated)
- **Skill Logos**: Place custom logos in `/public/media/skills/`

### Current Image Sources:
- Hero background: Unsplash tech/gradient image
- Project thumbnails: Unsplash tech-related images
- Brand/skill icons: Simple Icons CDN

## Customization

1. **Update personal information** in `/src/text/en.json` and `/src/text/hi.json`
2. **Replace placeholder images** with your own assets
3. **Modify color scheme** in `tailwind.config.js`
4. **Add your projects** in the text files
5. **Update social links** in Contact component

## Technologies Used

- React 18
- Vite
- TailwindCSS
- Framer Motion
- GSAP with ScrollTrigger
- Lenis (smooth scroll)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)