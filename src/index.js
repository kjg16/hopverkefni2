import List from './lib/list';
import Lecture from './lib/lecture';
import initButtons, { getFilters } from './lib/filter';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    initButtons();
    const list = new List();
    list.load(getFilters());
  }
});
