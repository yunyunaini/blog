echo "smonitor sentry api start ......!"
sudo /usr/sbin/sshd
sudo mkdir -p /export/logs
sudo mkdir -p /dev/shm/nginx_temp/client_body
sudo /opt/nginx/sbin/nginx -c /opt/nginx/conf/nginx.conf &> /export/Logs/node_install.log
cd /export/App/
pm2 start pm2.json &>> /export/Logs/node_install.log
sudo sleep 9999999d