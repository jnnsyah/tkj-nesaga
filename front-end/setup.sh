#!/bin/bash

# Load NVM
export NVM_DIR="$HOME/.config/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Install and use LTS Node.js
nvm install --lts
nvm use --lts

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Initialize package.json
if [ ! -f package.json ]; then
  npm init -y
fi

# Install dependencies (React, Vite, Tailwind, etc.)
npm install react react-dom react-router-dom framer-motion clsx tailwind-merge lucide-react class-variance-authority
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer @types/react @types/react-dom @types/node

# Initialize Tailwind config
npx tailwindcss init -p

# Create vite.config.js
cat <<EOF > vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
EOF

# Create index.html
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TKJ Nesaga</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# Create src directory and main.jsx
mkdir -p src
cat <<EOF > src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# Create App.jsx placeholder
cat <<EOF > src/App.jsx
import React from 'react'

function App() {
  return (
    <div className="text-3xl font-bold underline">
      Hello world!
    </div>
  )
}

export default App
EOF

# Create index.css
cat <<EOF > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

echo "Setup complete!"
