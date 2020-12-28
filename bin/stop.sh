#!/bin/bash
cd /app/
  
APPNAME=smonitor
  
pm2 stop ${APPNAME}
  
exit 0