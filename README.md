# Sumukha Portfolio - Business Development Manager at KIP

A professional portfolio website for Sumukha, Business Development Manager at Kannan Iyengar Photography.

## Design Inspiration

The design and color scheme are inspired by [Kannan Iyengar Photography](https://kannaniyengarphotography.com/), featuring:
- Elegant cream and beige color palette
- Professional typography (Playfair Display & Inter fonts)
- Clean, minimalist layout
- Smooth scrolling and animations

## Setup Instructions

### 1. Logo Setup

To add the KIP logo:

**Option 1: Manual Download**
1. Visit https://kannaniyengarphotography.com/
2. Right-click on the logo in the header
3. Select "Save image as..."
4. Save it as `logo.png` in the project root directory

**Option 2: Browser Developer Tools**
1. Open https://kannaniyengarphotography.com/ in your browser
2. Press F12 to open Developer Tools
3. Go to the Network tab and filter by "Img"
4. Refresh the page
5. Find the logo image and right-click to save it as `logo.png`

**Option 3: Use the provided script**
Run the `get-logo.ps1` PowerShell script (if available) to attempt automatic download.

**Note:** If the logo is not found, the site will automatically display "KIP" as text fallback.

### 2. Instagram Link

Update the Instagram link in `index.html` (line 152) with the correct Instagram profile URL:
```html
<a href="https://www.instagram.com/YOUR_INSTAGRAM_HANDLE" ...>
```

### 3. Contact Information

Update the contact details in `index.html`:
- Email address (line 122)
- Phone number (line 129)
- Location if different (line 136)

### 4. View the Site

Simply open `index.html` in your web browser, or use a local server:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit http://localhost:8000

**Using Node.js (http-server):**
```bash
npx http-server
```

## File Structure

```
Sumukha/
├── index.html      # Main HTML file
├── styles.css      # Stylesheet with KIP-inspired design
├── script.js       # JavaScript for interactivity
├── logo.png        # KIP logo (to be added)
└── README.md       # This file
```

## Features

- ✅ Responsive design (mobile-friendly)
- ✅ Smooth scrolling navigation
- ✅ Instagram icon link in footer
- ✅ Professional color scheme matching KIP website
- ✅ Elegant typography and animations
- ✅ Contact section with email, phone, and location

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

You can customize:
- Colors in `styles.css` (CSS variables at the top)
- Content in `index.html`
- Animations and interactions in `script.js`

---

© 2025 Sumukha - Business Development Manager at Kannan Iyengar Photography

