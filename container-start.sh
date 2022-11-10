#! /bin/sh

cd /usr/src/yt-dlp-rpc
sh ./fetch-yt-dlp.sh

YT_DLP_PATH=./yt-dlp 

lighttpd -D -f /usr/src/yt-dlp-vue/lighttpd.conf &

./yt-dlp-rpc
