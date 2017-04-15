/* eslint no-use-before-define:0, prefer-template:0 */

const pinyin = require('pinyin');

const CHINESE = /[\u4e00-\u9fa5]/;

module.exports = ({ relativeToRoot, config }) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0,
          maximum-scale=1.0, user-scalable=no"/>
        
        <title>${config.title}</title>

        <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
        <link rel="stylesheet" href="${relativeToRoot}/css/mobi.css/mobi.min.css" />
        <link rel="stylesheet" href="${relativeToRoot}/css/site.css" />
      </head>
      <body>
        <div class="flex-center">
          <div class="container">
            ${renderSearch()}
            ${renderBookmarks()}
            ${renderFooter()}
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
        <input id="search-input" type="search" placeholder="Type to search" autocomplete="off" tabindex="1" />
      </form>
    `;
  }

  function renderBookmarks() {
    return `
      <ul class="site-bookmark-ul flex-left flex-wrap units-gap">
        ${config.bookmarks.map(renderBookmark).join('')}
      </ul>
    `;
  }

  function renderBookmark({ category, name, url, favicon }) {
    if (category) {
      return `
        <li class="site-bookmark-li site-bookmark-category unit-1 top-gap text-muted text-small">${category}</li>
      `;
    }
    return `
      <li
        class="site-bookmark-li unit-0"
        data-name="${addPinyin(name).toLowerCase()}"
      >
        <a href="${url}" class="site-bookmark-a flex-middle" tabindex="9">
          ${renderFavicon(favicon)}
          <span>${name}</span>
        </a>
      </li>
    `;
  }

  function renderFavicon(favicon) {
    if (!favicon) {
      return '';
    }
    return `<img class="site-bookmark-img" src="${relativeToRoot}/img/${favicon}" height="16" width="16" />`;
  }

  function renderFooter() {
    return `
      <footer class="text-center top-gap-big text-muted text-small">
        <hr/>
        <p>Like this page? <a class="text-muted" href="https://github.com/xcatliu/123">Fork me</a> to create your own!</p>
      </footer>
    `;
  }
};

function addPinyin(str) {
  if (!CHINESE.test(str)) {
    return str;
  }

  return str + ' ' + pinyin(str, {
    style: pinyin.STYLE_NORMAL,   // 普通风格，即不带音标。
  }).join('');
}
