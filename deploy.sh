#!/bin/bash

sudo mkdir /var/www/131.104.49.100
sudo chmod 755 -R /var/www/131.104.49.100/
sudo chown -R socs:www-data /var/www/131.104.49.100/

sudo mv 131.104.49.100 /etc/nginx/sites-available/

sudo unlink /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/131.104.49.100 /etc/nginx/sites-enabled/

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

sudo mv self-signed.conf /etc/nginx/snippets/
sudo mv ssl-params.conf /etc/nginx/snippets/

sudo cp /etc/nginx/sites-available/131.104.49.100 /etc/nginx/sites-available/131.104.49.100.bak

sudo systemctl restart nginx

cd client

npm run build

mv -v build/* /var/www/131.104.49.100/

sudo systemctl restart nginx