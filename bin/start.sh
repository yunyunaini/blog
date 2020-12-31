sudo /usr/sbin/sshd
sudo mkdir -p /export/App/logs
sudo mkdir -p /dev/shm/nginx_temp/client_body
cp ../nginx.conf /export/servers/nginx/conf/domains
sudo /export/servers/nginx/sbin/nginx -c /export/servers/nginx/conf/nginx.conf &> /export/Logs/node_install.log
cd /export/App/
NODE_ENV=production pm2 start pm2.json &>> /export/Logs/node_install.log
sudo sleep 9999999d