#!/bin/bash
source ~/.config/nvm/nvm.sh
nvm use --lts

echo "Verifying project build..."
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful!"
else
  echo "Build failed!"
  exit 1
fi
