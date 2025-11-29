# फय्यझ शेख — नगरसेवक उमेदवार वेबसाइट

एक आधुनिक, प्रवेशयोग्य आणि SEO-optimized राजकीय प्रचार वेबसाइट.

## 🌟 वैशिष्ट्ये

- ✅ प्रवेशयोग्यता (Accessibility) - WCAG 2.1 AA मानकांनुसार
- ✅ SEO Optimized - Meta tags, Open Graph, Structured Data
- ✅ Responsive Design - Desktop, Tablet आणि Mobile साठी
- ✅ द्विभाषिक समर्थन - मराठी आणि इंग्रजी
- ✅ Modern UI/UX - Clean design with smooth animations
- ✅ Fast Performance - Optimized images आणि lazy loading
- ✅ Contact Forms - Volunteer आणि Contact forms with validation
- ✅ Gallery with Lightbox - Photo आणि video gallery
- ✅ Events Calendar - Dynamic upcoming events
- ✅ Social Media Integration - Facebook, Twitter, Instagram, YouTube
- ✅ Downloadable PDFs - Manifesto आणि Voting Guide

## 📁 प्रकल्प संरचना

```
political-campaign-website/
├── index.html                 # मुख्य HTML फाइल
├── manifesto-template.html    # Manifesto PDF template
├── content/
│   └── site-content.json      # सर्व मजकूर content (Marathi/English)
├── assets/
│   ├── css/
│   │   └── styles.css         # मुख्य CSS styles
│   ├── js/
│   │   ├── content-manager.js # Content management आणि language switching
│   │   └── main.js           # मुख्य JavaScript functionality
│   ├── images/               # Images आणि logos
│   └── pdfs/                 # Downloadable PDFs
└── README.md                 # हा फाइल
```

## 🚀 स्थापना आणि वापर

### 1. Download करा
```bash
# Clone या repository ला किंवा download करा ZIP
git clone [repository-url]
cd political-campaign-website
```

### 2. Local Server चालवा
कोणत्याही local server सह उघडा:
```bash
# Python सह
python -m http.server 8000

# PHP सह
php -S localhost:8000

# Node.js सह
npx http-server
```

### 3. Browser मध्ये उघडा
`http://localhost:8000` ला भेट द्या

## ⚙️ कस्टमाइजेशन

### Content बदलण्यासाठी

1. **मजकूर संपादित करा**: `content/site-content.json` मध्ये Marathi आणि English मजकूर बदला
2. **Images बदला**: `assets/images/` मध्ये आपल्या images ठेवा
3. **PDFs बदला**: `assets/pdfs/` मध्ये आपले manifesto आणि voting guide PDFs ठेवा

### Images Replace करणे

```bash
# Logo placeholders बदला
assets/images/
├── logo-top-placeholder.png      → आपला मुख्य logo
├── logo-bottom-placeholder.png   → Footer logo
├── candidate-portrait-placeholder.jpg → उमेदवाराचे photo
├── gallery/                       → Campaign photos
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   └── ...
└── favicon.ico                   → Website favicon
```

### PDF Files तयार करणे

1. `manifesto-template.html` ला edit करा आपल्या content ने
2. Browser मध्ये उघडून "Print to PDF" करा
3. `assets/pdfs/manifesto.pdf` म्हणून save करा

### Contact Information बदला

`content/site-content.json` मध्ये:

```json
{
  "contact": {
    "office_address": "आपला पत्ता येथे",
    "office_address_en": "Your address here",
    "phone": "+91-XXXXXXXXXX",
    "whatsapp": "+91-XXXXXXXXXX"
  }
}
```

### Social Media Links बदला

```json
{
  "social": {
    "facebook": "https://facebook.com/yourpage",
    "twitter": "https://twitter.com/yourhandle",
    "instagram": "https://instagram.com/yourhandle",
    "youtube": "https://youtube.com/yourchannel"
  }
}
```

## 🎨 Color Scheme

- **Primary**: #1a365d (Dark Blue)
- **Secondary**: #ff6b35 (Saffron/Orange)
- **Accent**: #ff8c42 (Light Orange)
- **Text**: #1a365d (Dark Blue)
- **Background**: #ffffff (White)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Technical Details

### Technologies वापरलेल्या

- **HTML5** - Semantic markup with ARIA attributes
- **CSS3** - Modern CSS with Grid, Flexbox, and animations
- **Vanilla JavaScript** - No frameworks, lightweight
- **JSON** - Content management system

### Performance Optimizations

- ✅ Lazy loading images
- ✅ Minified CSS/JS (recommended for production)
- ✅ Optimized images (WebP format recommended)
- ✅ Preconnect for external fonts
- ✅ Efficient DOM manipulation

## 🌐 SEO आणि Social Sharing

### Meta Tags समाविष्ट

- Title आणि Description (Marathi/English)
- Open Graph tags (Facebook sharing)
- Twitter Card tags
- Structured Data (Organization/Person)

### Search Console साठी

1. Google Search Console मध्ये website add करा
2. Sitemap submit करा
3. Meta tags verify करा

## 📞 Contact Forms

Forms use `mailto:` fallback. Production मध्ये backend API add करा:

```javascript
// Backend API integration example
async function submitForm(formData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
}
```

## 🚨 Important Notes

### Security
- Forms मध्ये server-side validation add करा
- HTTPS वापरा production मध्ये
- Input sanitization करा

### Browser Support
- Modern browsers: Chrome, Firefox, Safari, Edge
- IE11+ support (with polyfills if needed)

### Accessibility
- Screen reader tested
- Keyboard navigation supported
- High contrast support
- Focus management implemented

## 🤝 योगदान

Issues आणि pull requests welcome!

## 📄 License

© 2025 फय्यझ शेख — सर्व हक्क राखीव

---

**Contact**: फय्यझ शेख — [+91-9876543210](tel:+919876543210)
**Website**: [fayyazshaikh.in](https://fayyazshaikh.in)


