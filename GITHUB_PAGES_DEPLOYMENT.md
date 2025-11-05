# GitHub Pages Deployment Guide for Mutiraon

This guide will walk you through deploying the Mutiraon frontend to GitHub Pages.

## Prerequisites

1. Your repository must be named `Mutiraon` (case-sensitive)
2. The repository should be public (GitHub Pages only works with public repositories unless you have GitHub Pro)

## Step 1: Configure GitHub Pages Settings

1. Go to your repository on GitHub: https://github.com/TerexitariusStomp/Mutiraon
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

## Step 2: Create GitHub Actions Workflow

Create a `.github/workflows/deploy.yml` file in your repository root:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Install dependencies
        run: npm ci
        
      - name: Build with Next.js
        run: npm run build
        working-directory: ./frontendnew
        env:
          NODE_ENV: production
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './frontendnew/out'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Step 3: Update Package.json Scripts

Add a build script to your frontend package.json:

```json
{
  "scripts": {
    "build": "next build",
    "export": "next export",
    "build:pages": "NODE_ENV=production next build && next export"
  }
}
```

## Step 4: Local Testing

Before deploying, test the build locally:

```bash
cd frontendnew
npm run build
npm run export
```

This creates an `out` directory with your static files.

## Step 5: Deploy

1. Push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Build your Next.js application
   - Generate static files
   - Deploy to GitHub Pages

## Step 6: Access Your Site

After deployment (usually takes 2-5 minutes), your site will be available at:
**https://TerexitariusStomp.github.io/Mutiraon/**

## Troubleshooting

### Common Issues:

1. **404 Errors on Page Refresh**: 
   - This is expected with Next.js client-side routing
   - The site works correctly but GitHub Pages doesn't handle client-side routes by default
   - Consider creating a custom 404.html or using a different hosting solution for production

2. **Build Fails**:
   - Check that all environment variables are properly set
   - Ensure Node.js version compatibility (we're using Node 18)
   - Verify all dependencies are properly installed

3. **Images Not Loading**:
   - The config already handles this with `unoptimized: true`
   - Make sure all images use absolute paths or the configured base path

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to your `frontendnew/public/` directory with your domain
2. Configure your domain's DNS settings
3. Update GitHub Pages settings to use your custom domain

## Environment Variables

If your app uses environment variables:
1. Add them to the GitHub Actions workflow
2. Create `.env.production` file in the frontendnew directory
3. Never commit sensitive environment variables

## Continuous Deployment

Every time you push to the `main` branch:
1. GitHub Actions automatically builds and deploys
2. The changes are live within 2-5 minutes
3. Previous deployments are preserved and can be rolled back if needed

## Current Configuration

Your `next.config.ts` is already configured for GitHub Pages:
- Static export enabled for production
- Base path set to `/mutiraon`
- Images configured for static hosting
- Trailing slashes enabled for better compatibility