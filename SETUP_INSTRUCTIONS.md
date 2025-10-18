# Complete Setup Instructions

## 🚀 Quick Setup Guide

### 1. Google OAuth Setup (Required)

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create/Select Project**
3. **Enable Google+ API**
4. **OAuth Consent Screen:**
   - User Type: External
   - App Name: MediConnect Academy
   - Add your email as test user
5. **Create Credentials:**
   - Type: OAuth 2.0 Client ID
   - Application: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://your-domain.vercel.app/api/auth/callback/google`

### 2. Environment Variables

Update `.env.local` with your credentials:

```env
# Get from Google Cloud Console
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your_32_character_secret

# Your domain
NEXTAUTH_URL=http://localhost:3000

# AI Keys (optional for testing auth)
GEMINI_API_KEY=your_gemini_key
```

### 3. Test Authentication

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Visit test page:**
   - Go to `http://localhost:3000/auth/test`
   - Click "Sign In" button
   - Test Google OAuth flow

3. **Check protected routes:**
   - `/profile` - Should require login
   - `/course-requests` - Should require login
   - `/courses/[id]/learn` - Should require login

### 4. Production Deployment

For Vercel deployment with PostgreSQL:

1. **Add Vercel Postgres:**
   ```bash
   vercel postgres create
   ```

2. **Update environment variables in Vercel:**
   - Add all variables from `.env.local`
   - Update `DATABASE_URL` to PostgreSQL connection string

3. **Update schema for production:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

## ✅ Verification Checklist

- [ ] Google OAuth credentials created
- [ ] Environment variables set
- [ ] Development server running
- [ ] Can sign in with Google
- [ ] Protected routes redirect to login
- [ ] User profile shows correct data
- [ ] Database stores user sessions

## 🔧 Troubleshooting

**OAuth Error:** Check redirect URIs match exactly
**Database Error:** Run `npx prisma db push`
**Session Error:** Verify NEXTAUTH_SECRET is set
**Build Error:** Check all environment variables in production