# from project root (be careful, edit before running)
DOMAIN=example.com
FRONTEND=/var/www/movie-list/frontend
BACKEND=/var/www/movie-list/backend

# Build frontend
cd $FRONTEND
npm install
npm run build
sudo chown -R www-data:www-data $FRONTEND/dist
sudo chmod -R 755 $FRONTEND/dist

# Build backend
cd $BACKEND
npm install
npm run build

# Restart backend systemd service
sudo systemctl daemon-reload
sudo systemctl restart movie-list-backend

# Test nginx conf and reload
sudo nginx -t && sudo systemctl reload nginx

# my edition


cd /var/www/movie-list/backend
npm run start:dev

cd /var/www/movie-list/frontend
npm run dev

