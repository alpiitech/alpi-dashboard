#!/usr/bin/env bash
set -euo pipefail

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔍 Running typecheck..."
npm run typecheck

echo ""
echo "🧹 Running lint..."
npm run lint

echo ""
echo "🏗️  Running production build..."
npm run build

echo ""
echo "✅ All checks passed. Starting development server..."
npm run dev
