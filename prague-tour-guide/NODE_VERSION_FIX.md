# ⚠️ IMPORTANT: Node.js Version Compatibility

## Current Issue

Your system is running **Node.js v10.19.0**, which is too old for the modern dependencies in this project.

## Solutions

### Option 1: Upgrade Node.js (Recommended)

Upgrade to Node.js 16 or higher:

```bash
# Using nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16
nvm alias default 16

# Verify installation
node --version  # Should show v16.x.x or higher

# Then reinstall dependencies
cd /home/mman/Projects/2_mamka_webovky/prague-tour-guide
rm -rf node_modules package-lock.json
npm install
npm start
```

### Option 2: Use Older React Scripts (Quick Fix)

If you can't upgrade Node, downgrade react-scripts:

```bash
cd /home/mman/Projects/2_mamka_webovky/prague-tour-guide

# Update package.json to use compatible versions
npm install react-scripts@4.0.3 --save
npm install

# Start server
npm start
```

### Option 3: Use Docker

Run the project in a Docker container with the correct Node version:

```bash
# Create Dockerfile in project root
cat > Dockerfile << 'EOF'
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
EOF

# Build and run
docker build -t prague-tours .
docker run -p 3000:3000 prague-tours
```

## Production Build

If you can't run the development server, you can still build for production:

### On Your Local Machine (with Node 16+)

```bash
npm run build
```

The `build/` folder will contain production-ready files.

### Using CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './build'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Check Your Node Version

```bash
node --version
```

**Required**: Node.js 14.x or higher
**Recommended**: Node.js 16.x or 18.x

## Next Steps

1. Choose one of the options above
2. Follow the instructions
3. Run `npm start` to launch the development server
4. The website will open at http://localhost:3000

## Need Help?

If you continue to have issues:
1. Check Node.js is properly installed: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

---

**Note**: This is a common issue with older Linux distributions that ship with outdated Node.js versions. Upgrading Node is safe and recommended for modern web development.
