FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./web /usr/share/nginx/html

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

