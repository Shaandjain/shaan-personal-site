# Git & Vercel Auto-Deploy Setup

Your git repository has been initialized! Follow these steps to connect it to GitHub and enable auto-deployment on Vercel.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it: `personal-site` (or your preferred name)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

## Step 2: Connect Local Repo to GitHub

Run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
# Add GitHub remote (replace YOUR_USERNAME and repo name)
git remote add origin https://github.com/YOUR_USERNAME/personal-site.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

Or if you prefer SSH:
```bash
git remote add origin git@github.com:YOUR_USERNAME/personal-site.git
git branch -M main
git push -u origin main
```

## Step 3: Connect to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import your GitHub repository (`personal-site`)
4. Vercel will auto-detect settings:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**

That's it! Now every `git push` to the `main` branch will automatically trigger a new deployment on Vercel.

### Option B: Via Vercel CLI

```bash
# Link existing project
vercel link

# Follow prompts to connect to your GitHub repo
```

## Step 4: Verify Auto-Deploy

1. Make a small change to any file
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push
   ```
3. Check your Vercel dashboard - you should see a new deployment start automatically!

## Future Workflow

```bash
# Make changes to your code
# ...

# Commit changes
git add .
git commit -m "Your commit message"
git push

# Vercel automatically deploys! 🚀
```

## Branch Protection (Optional)

You can set up branch protection in GitHub:
- Settings → Branches → Add rule
- Branch name: `main`
- Require pull request reviews (optional)
- This ensures code is reviewed before auto-deploying

## Custom Domain

After connecting to Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Vercel will provide DNS instructions

---

**Your site is now set up for continuous deployment!** 🎉

