#!/bin/bash

echo "🚀 Installing Latest Node.js and npm"
echo "====================================="

# Install nvm (Node Version Manager)
echo "📦 Step 1: Installing nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Load nvm into current shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install latest LTS version of Node.js
echo "📦 Step 2: Installing latest Node.js LTS..."
nvm install --lts

# Set it as default
echo "⚙️  Step 3: Setting as default..."
nvm alias default node

# Verify installations
echo "✅ Step 4: Verifying installation..."
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Install project dependencies
echo "📦 Step 5: Installing project dependencies..."
cd /home/mman/Projects/2_mamka_webovky/prague-tour-guide
rm -rf node_modules package-lock.json
npm install

echo ""
echo "✅ Installation complete!"
echo "========================="
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo ""
echo "🎉 Ready to start! Run: npm start"