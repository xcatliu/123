/* eslint-env browser */
/* eslint no-var:0, prefer-arrow-callback:0, func-names:0 */

(function () {
  var searchForm = document.getElementById('search-form');
  var searchInput = document.getElementById('search-input');
  var searchStyle = document.getElementById('search-style');

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
  });

  searchInput.addEventListener('keyup', function () {
    var query = searchInput.value.trim().toLowerCase();
    searchStyle.innerHTML = `
      [data-tags*="${query}"] {
        background-color: #f2f2f2;
        order: -1;
      }
      [data-name*="${query}"] {
        background-color: #f2f2f2;
        order: -2;
      }
    `;
  });
}());
