#!/bin/bash

echo "🚀 Starting build process..."

# Build backend (Ruby)
echo "📦 Building Ruby backend..."
cd backend
bundle install
cd ..

# Build frontend (Nuxt)
echo "📦 Building Nuxt frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build completed!"