#!/bin/bash

# Setup script for Danny's CV Testimonial System
echo "🚀 Setting up Danny's CV Testimonial System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create data directory
echo "📁 Creating data directories..."
mkdir -p data/pending
mkdir -p data/approved

# Create initial data files
echo "[]" > data/pending-testimonials.json
echo "[]" > data/approved-testimonials.json

echo "✅ Data directories and files created"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the server:"
echo "  npm start    (Production)"
echo "  npm run dev  (Development with auto-restart)"
echo ""
echo "URLs:"
echo "  Website: http://localhost:3000"
echo "  Admin Panel: http://localhost:3000/admin"
echo ""
echo "📝 Note: The admin panel is currently unprotected."
echo "   In production, add authentication!"
echo ""
