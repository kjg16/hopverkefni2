import List from './lib/list';
import Lecture from './lib/lecture';
import initButtons, { getFilters } from './lib/lectures';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
    // const page1 = document.querySelector('body');
    // page1.COMMENT_NODE = '';
  } else {
    initButtons();
    const list = new List();
    list.load(getFilters());
  }
});
