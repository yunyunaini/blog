#!/bin/bash

cp ../nginx/nginx.conf /export/servers/nginx/conf/domains/my.conf

mkdir -p /dev/shm/nginx_temp/client_body /export/Logs/servers/nginx/logs/nethp.node.jd.com

sudo /export/servers/nginx/sbin/nginx -c /export/servers/nginx/conf/nginx.conf
# Or restart
pm2 start /export/App/bin/start.json