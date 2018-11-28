import List from './list';

let htmlButton; // takki sem filterar fyrir html
let cssButton; // takki sem filterar fyrir css
let jsButton; // takki sem filterar fyrir javascript

let filterHtml = false;
let filterCss = false;
let filterJS = false;

const list = new List();

export function getFilters() {
  return {
    htmlFilter: filterHtml,
    cssFilter: filterCss,
    jsFilter: filterJS,
  };
}

/**
 * event handler fyrir html filter.
 */
function onFilterHtml() {
  filterHtml = !filterHtml;
  list.load(getFilters());
}

/**
 * event handler fyrir css filter.
 */
function onFilterCss() {
  filterCss = !filterCss;
  list.load(getFilters());
}

/**
 * event handler fyrir javascript filter.
 */
function onFilterJS() {
  filterJS = !filterJS;
  list.load(getFilters());
}

/**
 * finnur öll DOM element og setur upp event handlera.
 */
export default function initButtons() {
  htmlButton = document.querySelector('.htmlButton');
  cssButton = document.querySelector('.cssButton');
  jsButton = document.querySelector('.jsButton');

  htmlButton.addEventListener('click', onFilterHtml);
  cssButton.addEventListener('click', onFilterCss);
  jsButton.addEventListener('click', onFilterJS);
}
