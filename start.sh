#!/bin/bash

echo "🚀 Starting application..."

# Start backend di background
echo "🔧 Starting Ruby backend..."
cd backend
bundle exec rackup -p 3000 -o 0.0.0.0 &

# Start frontend
echo "🎨 Starting Nuxt frontend..."
cd ../frontend
npm run start