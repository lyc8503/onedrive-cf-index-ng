Forked onedrive-vercel-index and renamed to onedrive-cf-index-ng

Changes:
- Migrate to Web Api to adapt to edge runtime (Use `path-browserify` and `redaxios`)
- Use KV to replace Redis
- Remove i18n (requires `fs` which is not compatible with Cloudflare Workers)
- pnpm update & a few packages update
- IT WORKS on Cloudflare Pages now!

TODO:
- Cache headers and some todos left in API code
- Remove redundant configs 
- Polish Webui and fix small problems
- Dockerfile for local deploy
- More tests

Below is the original README
---


<div align="center">
  <img src="./public/header.png" alt="onedrive-cf-index-ng" />
  <h3><a href="https://pan.lyc8503.site">onedrive-cf-index-ng</a></h3>
  <p><em>OneDrive public directory listing forked from <a href="https://github.com/spencerwooo/onedrive-vercel-index">onedrive-vercel-index</a>, powered by Cloudflare and Next.js</em></p>

  <img src="https://img.shields.io/badge/OneDrive-2C68C3?style=flat&logo=microsoft-onedrive&logoColor=white" alt="OneDrive" />
  <img src="https://img.shields.io/badge/Cloudflare-f38020?style=flat&logo=Cloudflare&logoColor=white" alt="Cloudflare" />
  <img src="https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white" alt="Next.js" />
  <a href="https://github.com/lyc8503/onedrive-cf-index-ng/wiki"><img src="https://img.shields.io/badge/Documentation-black?style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABeUlEQVRIie2VwUrDQBCGZ5ZubNmS0Ba9tF6CUqTHpg+g+AhCn8R30DfpM3jRezdHoZJroaBJQ2qgsIEdD7YSsCtJVBTxP87u/t/u7M4swDcLTQNSSseyLFbERCmlPc9LCgF83z/jnE9s294vvk+AJEmesiwbe553awQEQbCXZVnY7/ebjBXa/Ju01jCbzVIA6AwGA7WN1/KT4jg+6vV6TcYYpGlKq9UKiQgAAOr1OnU6HWNKGWPQarWa8/n8GADudwIQ0UJ89QjDEKMoOiEitRm7tm37gnNuPAUiAiJa+VjNNJmIYDgcPiAiAQD4vh9tT1NG5RJdQT8PkFKak/5ZgJTyUgjxPJ1Ob4josArAeMmWZYHrulftdhvX6/X5YrEwPtFKgG63C7ApxEajga7rVvH/BZf8D/hjACJSVRpabj1su+9OgBAiiOM41VqXNtdaw3K5TIUQQT7+rjqllKec84njOAdlAEmSPCqlxqPR6O5DQA70JZ/+t+sFAb2R22dSZ7wAAAAASUVORK5CYII=" alt="Documentation" /></a>
</div>

## What's different
- Now it can be deployed on Cloudflare Pages for free!
- No more dependency on Upstash / 3rd-party service
- Maybe some future maintenance or improvements from me ([@lyc8503](https://github.com/lyc8503))

*Special thanks to the original author of this project [@spencerwooo](https://github.com/spencerwooo) and all contributors*


## TL;DR

Showcase, share, preview, and download files inside *your* OneDrive with onedrive-cf-index-ng -

- Completely free to host 💸
- Super fast ⚡ and responsive 💦
- Takes less than 15 minutes to setup ⏱️
- Highly customisable ⚒️

🍌 More importantly, we are pretty (●'◡'●)

## Quick start

🚀 Quick start: [Getting started](https://github.com/lyc8503/onedrive-cf-index-ng/wiki/Getting-Started).

## Discussion

*If you happen to like this project, please give it a star!* :3

## Demo

Live demo at [lyc8503's Fileshare](https://pan.lyc8503.site).

![demo](./public/demo.png)

## Features

<table>
  <tbody>
    <tr>
      <td>
        <a
          href="https://drive.swo.moe/Lecture%20and%20Coursework%20CS%20(BIT)/2019%20-%20%E5%A4%A7%E4%B8%89%E4%B8%8B%20-%20%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86%E4%B8%8E%E8%AE%BE%E8%AE%A1/n1570.pdf"
          >👀 File preview</a
        >
      </td>
      <td>
        <a
          href="https://drive.swo.moe/%F0%9F%8D%87%20Wallpaper"
          >💠  List / Grid layouts</a
        >
      </td>
      <td>
        <a
          href="https://drive.swo.moe/%F0%9F%8D%A1%20Genshin%20PV/New%20version%20PV/TGA2021%E3%80%8A%E5%8E%9F%E7%A5%9E%E3%80%8B%E5%8F%82%E9%80%89%E8%A7%86%E9%A2%91.mp4"
          >🎥 Video and audio</a
        >
      </td>
    </tr>
    <tr>
      <td>PDF, EPUB, markdown, code, plain text</td>
      <td>For previewing images and documents with thumbnails</td>
      <td>mp4, mp3, ..., play online or with IINA, PotPlayer ... with subtitles!</td>
    </tr>
    <tr>
      <td>
        <a
          href="https://drive.swo.moe/Lecture%20and%20Coursework%20CS%20(BIT)/2017%20-%20%E5%A4%A7%E4%BA%8C%E4%B8%8A%20-%20%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/1%20%E7%BB%AA%E8%AE%BA.pptx"
          >📄 Office preview</a
        >
      </td>
      <td><a href="https://drive.swo.moe/%F0%9F%A5%9F%20Some%20test%20files/Articles">📝 README.md preview</a></td>
      <td><a href="https://drive.swo.moe/%F0%9F%A5%9F%20Some%20test%20files/Imagenette">📑 Pagination</a></td>
    </tr>
    <tr>
      <td>docx, pptx, xlsx, ...</td>
      <td>Also renders code blocks, images with relative links, ...</td>
      <td>For folders with 200 or more items</td>
    </tr>
    <tr>
      <td><a href="https://drive.swo.moe/%F0%9F%8C%9E%20Private%20folder">🔒 Protected folders</a></td>
      <td><a href="https://drive.swo.moe/%F0%9F%8D%8A%20Weibo%20emotes/Source2">⏬ Multi-file download</a></td>
      <td>🔎 Native Search</td>
    </tr>
    <tr>
      <td>Password protected routes and files. <a href="https://ovi.swo.moe/docs/features/protected-folders">Details here</a></td>
      <td>
        Compress and download multiple files or folders.
        <a href="https://ovi.swo.moe/docs/features/multi-file-folder-download">Details here</a>
      </td>
      <td>
        Searching through your shared OneDrive files (with some caveats 🥺).
        <a href="https://ovi.swo.moe/docs/features/search-for-files-and-folders">Details here</a>
      </td>
    </tr>
  </tbody>
</table>

... and more:

- Streamlined deployment, without having to get your tokens manually anymore!
- Direct raw-file serving and hosting ...
- Full dark mode support, style and website customisations ...

> **Note**: This project is focused on showcasing and providing a way for others to download files from your OneDrive. Emphasis on **free** and **serverless**. If you have your own server / need WebDAV / use cloud providers other than OneDrive, checkout [alist](https://github.com/alist-org/alist).

## Documentation

Documentation is hosted at [ovi.swo.moe](https://ovi.swo.moe/).

- [How can I get started and deploy?](https://ovi.swo.moe/docs/getting-started)
- [How can I configure ... ?](https://ovi.swo.moe/docs/custom-configs)
- Where is feature ... ?
  - [Docs - Password protected folders](https://ovi.swo.moe/docs/features/protected-folders)
  - [Docs - Multi-file and folder download](https://ovi.swo.moe/docs/features/multi-file-folder-download)
  - [Docs - Hosting files (images) directly](https://ovi.swo.moe/docs/features/hosting-images-directly)
  - [Docs - Search for files and folders](https://ovi.swo.moe/docs/features/search-for-files-and-folders)
  - [Docs - Load video subtitles](https://ovi.swo.moe/docs/features/load-video-subtitles)
- [I deployed this before, how can I upgrade to the latest version?](https://ovi.swo.moe/docs/migration/updating-to-latest-version)
- [I was here before 2022, how can I migrate to the new version?](https://ovi.swo.moe/docs/migration/if-you-deployed-before-2022)
- [I got a problem during deployment ...](https://ovi.swo.moe/docs/faqs/error-on-deployment)
- I didn't find a solution / My problem is unique? [Find help in discussion forum](https://github.com/spencerwooo/onedrive-vercel-index/discussions).

## Server-*less* (free)?

Yes! Completely free with no backend server what-so-ever.

## License

[MIT](LICENSE)

<div align="center">
  <img src="./public/footer.png" />
  <em>made with ❤️ by <a href="https://www.lyc8503.site">lyc8503</a> & <a href="https://spencerwoo.com">spencer woo</a></em>
</div>
