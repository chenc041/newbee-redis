FROM nginx:1.19.6-alpine

LABEL author="double_cl@163.com"

WORKDIR /etc/nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY dist /etc/nginx/dist

RUN chmod -R o+rx /etc/nginx/dist/assets

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
