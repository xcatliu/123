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
    var c = String.fromCharCode(e.keyCode).toLowerCase();
    if (c.match(/\w/) && document.activeElement !== searchInput) {
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

    setSearchStyle(query);
    setTabindex(query);
    setFocus(query);
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

  function setSearchStyle(query) {
    searchStyle.innerHTML = `
      .site-bookmark-category {
        display: none;
      }
      .site-bookmark-a {
        opacity: 0.3;
      }
      [data-name*="${query}"] {
        order: -1;
      }
      [data-name*="${query}"] .site-bookmark-a {
        opacity: 1;
      }
    `;
  }

  function setTabindex(query) {
    var filteredItems = document.querySelectorAll(`[data-name*="${query}"] .site-bookmark-a`);

    filteredItems.forEach((item) => {
      item.setAttribute('tabindex', '2');
    });
  }

  function setFocus(query) {
    var firstItem = document.querySelector(`[data-name*="${query}"] .site-bookmark-a`);
    if (firstItem) {
      firstItem.classList.add('site-bookmark-a-focus');
    }
  }
}());
