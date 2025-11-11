# Quick Deploy Guide

Your React portfolio is ready to deploy! Here are the fastest options:

## 🚀 Option 1: Vercel CLI (Fastest - 2 minutes)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? personal-site (or your choice)
# - Directory? ./
# - Override settings? N

# For production deployment:
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

## 🌐 Option 2: Vercel Dashboard (No CLI needed)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "New Project" → Import your repository

4. Vercel auto-detects Vite settings (already configured)

5. Click "Deploy" → Done! 🎉

## 📦 Option 3: Netlify Drag & Drop (Instant)

```bash
# Build the project
npm run build

# Then:
# 1. Go to https://app.netlify.com/drop
# 2. Drag the 'dist' folder
# 3. Your site is live!
```

## 🔧 Option 4: GitHub Pages

If you want to use GitHub Pages:

1. Update `vite.config.ts`:
   ```ts
   base: '/your-repo-name/',
   ```

2. Push to GitHub - the workflow will auto-deploy

3. Enable Pages in repo settings: Settings → Pages → Source: `gh-pages`

---

## Recommended: Vercel

Vercel is recommended because:
- ✅ Free SSL/HTTPS
- ✅ Custom domain support
- ✅ Automatic deployments on git push
- ✅ Fast global CDN
- ✅ Zero configuration needed

---

## After Deployment

1. **Add your portrait**: Upload `/public/portrait.png` (800x800px recommended)

2. **Custom domain** (optional):
   - Vercel: Project Settings → Domains
   - Netlify: Site Settings → Domain Management

3. **Update SEO**: Edit `index.html` meta tags with your actual domain

4. **Analytics** (optional): Uncomment analytics in `App.tsx` footer

---

## Troubleshooting

**Build fails?**
- Make sure all dependencies are installed: `npm install`
- Check Node version: `node --version` (should be 18+)

**Portrait not showing?**
- Make sure `/public/portrait.png` exists
- Check browser console for image errors

**Routes not working?**
- Vercel/Netlify configs already handle SPA routing
- If issues persist, check the `vercel.json` or `netlify.toml` files

