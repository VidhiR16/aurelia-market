# Ecommerce Frontend

This repository is the frontend for the ecommerce demo.

To push this local project to your GitHub repository `https://github.com/VidhiR16/aurelia-market`, run the included PowerShell helper or the commands below.

PowerShell (from project root):

```powershell
./push-to-github.ps1
```

Manual git commands:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VidhiR16/aurelia-market.git
git push -u origin main
```

This repo is configured for GitHub Pages deployment from the `gh-pages` branch.
The build outputs are generated into `docs/`.

After pushing to GitHub, the CI workflow will build and publish the site automatically.

Requirements:
- Git installed and configured with your GitHub credentials
- GitHub repository `VidhiR16/aurelia-market` created and accessible
