# Zuza Prague Tours Website 🏰

A modern, SEO-optimized React website for Prague tour guide services by Zuzana Manova.

## 🌟 Features

- **Modern React 18** with TypeScript
- **SEO Optimized** with React Helmet Async
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** with Framer Motion
- **Fast Performance** - Optimized for Google PageSpeed
- **Accessibility** - WCAG compliant
- **Structured Data** for rich Google search results
- **Contact Forms** with WhatsApp integration

## 📱 Pages

1. **Home** - Hero section, features, about preview, and call-to-action
2. **Tours** - Detailed tour offerings with pricing and highlights
3. **Contact** - Multiple contact methods including phone, email, and WhatsApp

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ (recommended: Node 16+)
- npm 6+

### Installation

```bash
# Navigate to project directory
cd prague-tour-guide

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

```bash
# Start development server with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📦 Building for Production

```bash
# Create optimized production build
npm run build
```

This creates a `build/` folder with optimized static files ready for deployment.

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. **Via Netlify CLI**:
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

2. **Via Netlify Dashboard**:
   - Push code to GitHub
   - Connect repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `build`
   - Domain: Configure `zuzapragtour.de`

### Option 2: Vercel

```bash
npm install -g vercel
npm run build
vercel --prod
```

### Option 3: GitHub Pages

1. Add to `package.json`:
```json
"homepage": "https://zuzapragtour.de"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Traditional Hosting (cPanel, FTP)

1. Build the project:
```bash
npm run build
```

2. Upload contents of `build/` folder to your web server's public directory
3. Configure `.htaccess` for React Router (see below)

#### .htaccess for React Router

Create `.htaccess` in your build folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔍 SEO Optimization

The website includes:

- ✅ **Meta Tags** - Optimized title, description, keywords
- ✅ **Open Graph Tags** - Social media sharing
- ✅ **Structured Data** - Schema.org markup for rich snippets
- ✅ **Sitemap.xml** - For search engine crawling
- ✅ **Robots.txt** - Crawler instructions
- ✅ **Semantic HTML** - Proper heading hierarchy
- ✅ **Alt Tags** - Image descriptions (add your images)
- ✅ **Fast Loading** - Optimized assets
- ✅ **Mobile Responsive** - Mobile-first design

### Post-Deployment SEO Tasks

1. **Google Search Console**
   - Verify ownership: https://search.google.com/search-console
   - Submit sitemap: `https://zuzapragtour.de/sitemap.xml`

2. **Google My Business**
   - Create/claim business listing
   - Add photos and tour information
   - Collect reviews

3. **Google Analytics**
   - Create GA4 property
   - Add tracking code to `public/index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

4. **Social Media Setup**
   - Update social media links in Footer.tsx
   - Add social media icons/profiles

## 📝 Content Customization

### Update Contact Information

File: `src/components/Footer.tsx`, `src/components/Header.tsx`, `src/components/Contact.tsx`

- Phone: `+420 721 231 933`
- Email: `zuzanamanova@email.cz`
- WhatsApp: https://wa.me/420721231933

### Add Tours

File: `src/components/Tours.tsx`

Edit the `toursData` array to add/modify tour offerings.

### Update SEO Data

File: `src/utils/seo.ts`

Update structured data with actual business information.

### Add Images

1. Add images to `public/images/` folder
2. Update image references in components
3. Optimize images (use WebP format, compress)
4. Add descriptive alt text

## 🎨 Styling

The website uses CSS variables for easy theming.

File: `src/styles/App.css`

```css
:root {
  --primary-color: #b91c1c;  /* Prague red */
  --secondary-color: #fbbf24; /* Gold accent */
  /* ... customize colors */
}
```

## 📊 Performance Optimization

- Code splitting enabled
- Image lazy loading
- CSS minification
- JavaScript minification
- Gzip compression (server-side)

### Test Performance

- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

## 🔒 Security

- HTTPS required (use Let's Encrypt for free SSL)
- No sensitive data in client code
- Environment variables for API keys (if needed)

## 📞 Support

For questions about customization, contact the developer or refer to:

- React Documentation: https://react.dev/
- React Router: https://reactrouter.com/
- Framer Motion: https://www.framer.com/motion/

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ for Zuzana's Prague Tours**

Website: https://zuzapragtour.de
Phone: +420 721 231 933
Email: zuzanamanova@email.cz
