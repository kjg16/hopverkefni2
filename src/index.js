import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const page1 = document.querySelector('body');
    page1.COMMENT_NODE = '';
  } else {
    const list = new List();
    list.load();
  }
});
