FROM ghcr.io/marcopeocchi/yt-dlp-rpc:master

WORKDIR /usr/src/yt-dlp-vue

RUN apk add nodejs npm lighttpd

COPY . .
RUN npm i
RUN npm run build

# cleanup
RUN rm -rf node_modules 

RUN mkdir -p /var/www
RUN cp -r ./dist /var/www
RUN chmod +x ./container-start.sh

EXPOSE 80
EXPOSE 4444

CMD ["./container-start.sh"]