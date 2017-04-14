/* eslint-env browser */
/* eslint no-var:0, prefer-arrow-callback:0, func-names:0, vars-on-top:0 */

(function () {
  var W_REGEXP = /\w/;

  var searchForm = document.getElementById('search-form');
  var searchInput = document.getElementById('search-input');
  var searchStyle = document.getElementById('search-style');

  document.addEventListener('keyup', function (e) {
    var c = String.fromCharCode(e.keyCode).toLowerCase();
    if (c.match(W_REGEXP) && document.activeElement !== searchInput) {
      searchInput.focus();
      searchInput.value = c;
    }
  });

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var focusedResult = document.querySelector('.site-bookmark-a-focus');
    if (focusedResult) {
      location.href = focusedResult.href;
    }
  });

  searchInput.addEventListener('keyup', function () { 
    var focusedResult = document.querySelector('.site-bookmark-a-focus');
    if (focusedResult) {
      focusedResult.classList.remove('site-bookmark-a-focus');
    }

    var query = searchInput.value.trim().toLowerCase();
    if (query === '') {
      searchStyle.innerHTML = '';
      return;
    }
    searchStyle.innerHTML = `
      .site-bookmark-a {
        opacity: 0.3;
      }
      [data-name*="${query}"] {
        order: -2;
      }
      [data-name*="${query}"] .site-bookmark-a {
        opacity: 1;
      }
    `;

    var firstResult = document.querySelector(`[data-name*="${query}"] .site-bookmark-a`);
    if (firstResult) {
      firstResult.classList.add('site-bookmark-a-focus');
    }
  });

  searchInput.addEventListener('blur', function () {
    var focusedResult = document.querySelector('.site-bookmark-a-focus');
    if (focusedResult) {
      focusedResult.classList.remove('site-bookmark-a-focus');
    }
  });
}());
