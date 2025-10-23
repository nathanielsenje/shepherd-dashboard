# CORS Fix Guide

## Problem
CORS error when frontend tries to access backend API:
```
Access to XMLHttpRequest at 'http://localhost:3000/api/auth/login'
from origin 'http://localhost:5175' has been blocked by CORS policy
```

## Solution Applied (Frontend Proxy)

I've configured a Vite proxy to forward API requests through the same origin, avoiding CORS issues.

### Changes Made:

**1. Updated `vite.config.js`:**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

**2. Updated `.env`:**
```env
VITE_API_BASE_URL=/api
```

Now all requests to `/api/*` will be proxied to `http://localhost:3000/api/*`.

### How to Apply:

1. **Restart the development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **Test the login:**
   - Go to http://localhost:5173 (or whatever port Vite shows)
   - Try logging in with your credentials
   - CORS error should be gone!

---

## Alternative: Fix Backend CORS (Recommended for Production)

If you want to properly fix CORS on the backend side (which you'll need for production anyway), update your backend's `main.ts`:

### NestJS Backend Fix:

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for development
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:3001',
      // Add your production domain later:
      // 'https://yourdomain.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(3000);
}
bootstrap();
```

### Quick Development Fix (Allow All):

```typescript
// ⚠️ ONLY FOR LOCAL DEVELOPMENT
app.enableCors({
  origin: '*',
  credentials: true,
});
```

### Environment-Based CORS:

```typescript
app.enableCors({
  origin: process.env.NODE_ENV === 'development'
    ? '*'
    : ['https://yourdomain.com'],
  credentials: true,
});
```

---

## Which Approach to Use?

### Use Proxy (Current Fix) When:
- ✅ Quick development setup
- ✅ Don't want to modify backend
- ✅ Testing locally

### Use Backend CORS When:
- ✅ Preparing for production
- ✅ Multiple frontend apps
- ✅ Mobile app needs API access
- ✅ Third-party integrations

---

## Production Deployment

For production, you MUST configure proper CORS on the backend:

1. **Remove the proxy** from `vite.config.js`
2. **Update `.env` for production:**
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com/api
   ```
3. **Configure backend CORS** to allow your production domain
4. **Use HTTPS** for both frontend and backend

---

## Testing

After restarting the dev server, test these:

1. **Login** - Should work without CORS error
2. **Dashboard** - Should load member data
3. **Create Member** - Should save successfully
4. **Console** - Should show no CORS errors

---

## Troubleshooting

### Still Getting CORS Error?

1. **Hard refresh browser:** Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. **Clear browser cache**
3. **Check dev server is running** on the port shown in terminal
4. **Verify backend is running** on port 3000
5. **Check browser console** for the actual API URL being called

### Wrong API URL in Requests?

Make sure you've restarted the dev server after changing `.env`:
```bash
# Stop server: Ctrl+C
npm run dev
```

### Backend Not Running?

Start your NestJS backend:
```bash
cd path/to/backend
npm run start:dev
```

---

**Current Status:** ✅ Proxy configured, ready to test!

**Next Step:** Restart dev server and try logging in.
