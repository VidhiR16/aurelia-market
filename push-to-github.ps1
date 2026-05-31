# PowerShell script to initialize git and push to GitHub
# Run this in PowerShell on your machine (requires Git installed and configured)

$repo = "https://github.com/VidhiR16/aurelia-market.git"

Write-Host "Initializing git repository, committing, and pushing to $repo"

# Initialize repo if not already
if (-not (Test-Path .git)) {
  git init
}

git add .
git commit -m "Initial commit from local workspace" -q

git branch -M main

# Set remote (will fail if remote already exists - remove or rename first)
try {
  git remote add origin $repo
} catch {
  Write-Host "Remote 'origin' already exists; updating URL instead"
  git remote set-url origin $repo
}

# Push (may prompt for credentials)
Write-Host "Pushing to origin main..."
git push -u origin main

Write-Host "Done. Check https://github.com/VidhiR16/aurelia-market"