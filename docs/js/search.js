/* eslint-env browser */
/* eslint no-var:0, prefer-arrow-callback:0, func-names:0, vars-on-top:0, no-use-before-define:0 */

(function () {
  var searchForm = document.getElementById('search-form');
  var searchInput = document.getElementById('search-input');
  var searchStyle = document.getElementById('search-style');

  document.addEventListener('keyup', handleGlobalKeyup);
  searchForm.addEventListener('submit', handleSearchFormSubmit);
  searchInput.addEventListener('keyup', handleSearchInputKeyup);

  function handleGlobalKeyup(e) {
    if (e.altKey || e.ctrlKey || e.metaKey || document.activeElement === searchInput) {
      return;
    }
    var c = String.fromCharCode(e.keyCode).toLowerCase();
    if (c.match(/\w/)) {
      searchInput.focus();
      searchInput.value = c;
      handleSearchInputKeyup();
    }
  }

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    var focusedResult = document.querySelector('.site-bookmark-a-focus');
    if (focusedResult) {
      location.href = focusedResult.href;
    }
  }

  function handleSearchInputKeyup() {
    clearTabindex();
    clearFocus();

    var query = searchInput.value.trim().toLowerCase();
    if (query === '') {
      searchStyle.innerHTML = '';
      return;
    }

    var splitedQuery = query.split(/\s+/);

    setSearchStyle(splitedQuery);
    setTabindex(splitedQuery);
    setFocus(splitedQuery);
  }

  searchInput.addEventListener('blur', function () {
    var focusedResult = document.querySelector('.site-bookmark-a-focus');
    if (focusedResult) {
      focusedResult.classList.remove('site-bookmark-a-focus');
    }
  });

  function clearTabindex() {
    document.querySelectorAll('[tabindex="2"]').forEach((element) => {
      element.setAttribute('tabindex', '9');
    });
  }

  function clearFocus() {
    document.querySelectorAll('.site-bookmark-a-focus').forEach((element) => {
      element.classList.remove('site-bookmark-a-focus');
    });
  }

  function setSearchStyle(splitedQuery) {
    searchStyle.innerHTML = `
      .site-bookmark-category {
        display: none;
      }
      .site-bookmark-a {
        opacity: 0.3;
      }
      ${generateQuerySelectorQuery(splitedQuery)} {
        order: -1;
        -ms-flex-order: -1;
      }
      ${generateQuerySelectorQuery(splitedQuery)} .site-bookmark-a {
        opacity: 1;
      }
    `;
  }

  function setTabindex(splitedQuery) {
    var filteredItems = document.querySelectorAll(`${generateQuerySelectorQuery(splitedQuery)} .site-bookmark-a`);

    filteredItems.forEach((item) => {
      item.setAttribute('tabindex', '2');
    });
  }

  function setFocus(splitedQuery) {
    var firstItem = document.querySelector(`${generateQuerySelectorQuery(splitedQuery)} .site-bookmark-a`);
    if (firstItem) {
      firstItem.classList.add('site-bookmark-a-focus');
    }
  }

  function generateQuerySelectorQuery(splitedQuery) {
    return splitedQuery.map(query => `[data-name*="${query}"]`).join('');
  }
}());
