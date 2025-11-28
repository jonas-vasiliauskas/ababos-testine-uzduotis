#!/bin/bash

# FRONTEND
echo "Building frontend..."
cd /var/www/movie-list/frontend
npm install
npm run build

echo "Frontend build complete"

# BACKEND
echo "Starting backend..."
cd /var/www/movie-list/backend
npm install
npm run build
node dist/main.js &
BACKEND_PID=$!

echo "Backend running on PID $BACKEND_PID"

# Start local Nginx viewer for frontend
echo "Serving frontend via Nginx... (keep terminal open)"
echo "Press CTRL+C to stop both services"
wait $BACKEND_PID
