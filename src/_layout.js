/* eslint no-use-before-define:0, prefer-template:0 */

const nodeUrl = require('url');
const pinyin = require('pinyin');

const CHINESE = /[\u4e00-\u9fa5]/;

module.exports = ({ relativeToRoot, config }) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0,
        maximum-scale=1.0, user-scalable=no"/>
      
      <title>${config.title}</title>

      <link rel="stylesheet" href="${relativeToRoot}/css/mobi.css/mobi.min.css" />
      <link rel="stylesheet" href="${relativeToRoot}/css/site.css" />
    </head>
    <body>
      <div class="flex-center">
        <div class="container">
          ${renderSearch()}
          ${renderBookmarks({ bookmarks: config.bookmarks })}
        </div>
      </div>

      <script src="${relativeToRoot}/js/search.js"></script>
    </body>
  </html>
`;

function renderSearch() {
  return `
    <style id="search-style"></style>
    <form id="search-form" class="form">
      <input id="search-input" type="search" placeholder="Type to search" autocomplete="off" />
    </form>
  `;
}

function renderBookmarks({ bookmarks }) {
  return `
    <ul class="site-bookmark-ul flex-left flex-wrap units-gap">
      ${bookmarks.map(renderBookmark).join('')}
    </ul>
  `;
}

function renderBookmark({ name, url, tags = '', favicon }) {
  return `
    <li
      class="site-bookmark-li unit-0"
      data-tags="${addPinyin(tags).toLowerCase()}"
      data-name="${addPinyin(name).toLowerCase()}"
    >
      <a href="${url}" class="site-bookmark-a flex-middle">
        <img src="${getFavicon({ url, favicon })}" height="16" width="16" />
        <span class="site-bookmark-name">${name}</span>
      </a>
    </li>
  `;
}

function addPinyin(str) {
  if (!CHINESE.test(str)) {
    return str;
  }

  return str + ' ' + pinyin(str, {
    style: pinyin.STYLE_NORMAL,   // 普通风格，即不带音标。
  }).join('');
}

function getFavicon({ url, favicon = '/favicon.ico' }) {
  return nodeUrl.resolve(url, favicon);
}
