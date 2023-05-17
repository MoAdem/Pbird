wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.buster_amd64.deb
chmod -R 777 wkhtmltox_0.12.6-1.buster_amd64.deb
dpkg -i wkhtmltox_0.12.6-1.buster_amd64.deb
apt-get -fy install
wkhtmltopdf --version
gunicorn --bind=0.0.0.0 --timeout 600 pbird.wsgi
