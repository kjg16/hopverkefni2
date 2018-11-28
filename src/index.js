import List from './lib/list';
import Lecture from './lib/lecture';
import initButtons, { getFilters } from './lib/fyrirlestrar';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
<<<<<<< HEAD
    const page1 = document.querySelector('body');
    page1.COMMENT_NODE = '';
=======
    // const page1 = document.querySelector('body');
    // page1.COMMENT_NODE = '';
>>>>>>> ug2
  } else {
    initButtons();

    const filters = getFilters();
    const list = new List();
    list.load(filters);
  }
});
