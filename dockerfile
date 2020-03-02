FROM nginx:latest

LABEL maintainer="double_cl@163.com"

COPY redis.conf /etc/nginx/conf.d

COPY ./dist /root/web/redis-app/

EXPOSE 80 443