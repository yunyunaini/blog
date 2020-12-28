FROM base_image

RUN mkdir -p /home/admin/frontend

#注意代码不能放到/export目录下！
ADD . /home/admin/frontend

RUN cd /home/admin/frontend && ls -lh && \
  npm install && npm run build && rm -f /opt/nginx/html/index.html && cp -R dist/* /opt/nginx/html

#需要配置 nginx /opt/nginx/conf/domains/frontend.jd.com

ENTRYPOINT /usr/sbin/sshd  && mkdir -p /export/logs/ && mkdir -p /dev/shm/nginx_temp/client_body && \
  mkdir -p /export/Logs/servers/nginx/logs && /opt/nginx/sbin/nginx && sleep 9999999d