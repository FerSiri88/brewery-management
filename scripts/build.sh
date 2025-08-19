#!/bin/bash

# Build script for the beer warehouse management assistant
# This script handles platform-specific dependencies and ensures a clean build

echo "🚀 Starting build process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist
rm -rf .vite

# Install dependencies with platform-specific handling
echo "📦 Installing dependencies..."
npm install --no-optional

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output: dist/"
else
    echo "❌ Build failed!"
    exit 1
fi
