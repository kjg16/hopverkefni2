import List from './lib/list';
import initButtons, { getFilters } from './lib/fyrirlestrar';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const page1 = document.querySelector('body');
    page1.COMMENT_NODE = '';
  } else {
    initButtons();

    const filters = getFilters();
    const list = new List();
    list.load(filters);
  }
});
