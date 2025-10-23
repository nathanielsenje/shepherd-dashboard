# Deployment Guide

This guide covers deploying the Shepherd Dashboard to various hosting platforms.

## Before Deployment

### 1. Update Environment Variables

Create production `.env` file:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### 2. Build the Application

```bash
npm run build
```

This creates a `dist/` folder with optimized production files:
- `index.html` - Main HTML file
- `assets/` - CSS and JavaScript bundles

### 3. Test Production Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## Deployment Options

### Option 1: Vercel (Recommended)

**Easiest and fastest deployment with automatic CI/CD**

#### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add `VITE_API_BASE_URL`
5. Click "Deploy"

**Automatic Features:**
- ✅ HTTPS enabled
- ✅ CDN distribution
- ✅ Automatic deployments on push
- ✅ Preview deployments for PRs

---

### Option 2: Netlify

**Great alternative with similar features**

#### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Connect your repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables**: Add `VITE_API_BASE_URL`
5. Click "Deploy site"

#### Configure Redirects

Create `public/_redirects`:

```
/* /index.html 200
```

This ensures React Router works correctly.

---

### Option 3: AWS S3 + CloudFront

**For enterprise-grade hosting with full control**

#### Step 1: Build the Application

```bash
npm run build
```

#### Step 2: Create S3 Bucket

```bash
aws s3 mb s3://shepherd-dashboard
aws s3 website s3://shepherd-dashboard --index-document index.html
```

#### Step 3: Upload Files

```bash
aws s3 sync dist/ s3://shepherd-dashboard --delete
```

#### Step 4: Configure Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::shepherd-dashboard/*"
    }
  ]
}
```

#### Step 5: Create CloudFront Distribution

1. Go to CloudFront console
2. Create distribution
3. Set origin to S3 bucket
4. Configure custom error responses:
   - 404 → /index.html (200)
   - 403 → /index.html (200)
5. Enable HTTPS
6. Deploy

---

### Option 4: GitHub Pages

**Free hosting for open source projects**

#### Step 1: Install gh-pages

```bash
npm install -D gh-pages
```

#### Step 2: Add Scripts to package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### Step 3: Configure Base URL

Update `vite.config.js`:

```javascript
export default defineConfig({
  base: '/shepherd-dashboard/',
  // ... rest of config
});
```

#### Step 4: Deploy

```bash
npm run deploy
```

Access at: `https://yourusername.github.io/shepherd-dashboard/`

---

### Option 5: Docker

**For containerized deployments**

#### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Create nginx.conf

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

#### Build and Run

```bash
# Build image
docker build -t shepherd-dashboard .

# Run container
docker run -p 80:80 shepherd-dashboard
```

---

### Option 6: Traditional Web Host

**For cPanel or shared hosting**

#### Step 1: Build

```bash
npm run build
```

#### Step 2: Upload

Upload contents of `dist/` folder to your web host:
- Via FTP/SFTP
- Via hosting panel file manager
- To `public_html` or `www` directory

#### Step 3: Configure .htaccess

Create `.htaccess` in the root directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Post-Deployment Checklist

### 1. Verify Deployment

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Assets load (CSS, JS)
- [ ] Images/icons display
- [ ] API connection works

### 2. Test Authentication

- [ ] Login works
- [ ] Token refresh works
- [ ] Protected routes work
- [ ] Logout works

### 3. Test Features

- [ ] Dashboard displays
- [ ] Member list loads
- [ ] Create member works
- [ ] Edit member works
- [ ] Delete member works (if admin)
- [ ] Engagement view works
- [ ] Unconnected view works

### 4. Test Responsive Design

- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works

### 5. Performance Check

- [ ] Page load < 3 seconds
- [ ] No console errors
- [ ] No 404s for assets
- [ ] HTTPS enabled
- [ ] Gzip compression active

### 6. SEO & Analytics (Optional)

- [ ] Add Google Analytics
- [ ] Configure meta tags
- [ ] Add favicon
- [ ] Set up error tracking (Sentry)

---

## Environment Variables

### Production

```env
VITE_API_BASE_URL=https://api.yourchurch.org/api
```

### Staging

```env
VITE_API_BASE_URL=https://staging-api.yourchurch.org/api
```

### Development

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## HTTPS / SSL

**All production deployments should use HTTPS**

### Automatic SSL (Recommended)
- Vercel: Automatic
- Netlify: Automatic
- CloudFront: Via ACM

### Manual SSL
- Let's Encrypt: Free SSL certificates
- Cloudflare: Free SSL proxy

---

## Domain Configuration

### Custom Domain Setup

#### For Vercel
1. Go to project settings
2. Click "Domains"
3. Add custom domain
4. Update DNS records:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

#### For Netlify
1. Go to site settings
2. Click "Domain management"
3. Add custom domain
4. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

---

## Performance Optimization

### 1. Enable Gzip Compression

Most hosting platforms enable this automatically.

### 2. Enable Caching

Configure cache headers:

```
Cache-Control: max-age=31536000, immutable
```

### 3. Use CDN

All recommended platforms include CDN:
- Vercel Edge Network
- Netlify CDN
- CloudFront

### 4. Optimize Build

Current build stats:
- **HTML**: 0.46 kB
- **CSS**: 31 kB (6.22 kB gzipped)
- **JS**: 506 kB (159 kB gzipped)

---

## Monitoring

### Error Tracking

#### Sentry Setup

```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### Analytics

#### Google Analytics

Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Rollback Strategy

### Vercel/Netlify
- Dashboard → Deployments → Select previous → "Restore"

### AWS S3
- Enable versioning on S3 bucket
- Keep previous versions

### Manual
- Keep backup of `dist/` folder
- Can redeploy previous version

---

## Troubleshooting

### Issue: 404 on Refresh

**Solution**: Configure server to serve `index.html` for all routes

### Issue: API Not Connecting

**Solution**: Check `VITE_API_BASE_URL` is set correctly

### Issue: Assets Not Loading

**Solution**: Check base URL in `vite.config.js`

### Issue: White Screen

**Solution**: Check browser console for errors

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] No sensitive data in client code
- [ ] API using CORS correctly
- [ ] Rate limiting on API
- [ ] Authentication working
- [ ] JWT tokens secure

---

## Support

For deployment issues:
1. Check build logs
2. Check browser console
3. Verify environment variables
4. Test API connection
5. Check hosting platform status

---

**Recommended**: Start with Vercel for the easiest deployment experience.

Happy Deploying! 🚀
