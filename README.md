# yt-dlp-vue

Vue3 frontend for [yt-dlp-rpc](https://github.com/marcopeocchi/yt-dlp-rpc)

Heavily inspired by [vueTorrent](https://github.com/WDaan/VueTorrent)

![hello](https://i.ibb.co/BNCg1PT/image-2022-11-10-14-14-21.png)

## Run with Docker (All-in-One image)
```sh
docker run -p 80:80 -p 4444:4444 -v YOUR_DIR:/usr/src/yt-dlp-rpc/downloads yt-dlp-vue
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
