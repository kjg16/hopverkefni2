import {
  empty,
  el,
} from './helpers';
import { loadSavedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures');
  }

  onClickLecture(e) {
    window.location.href = e.currentTarget.children[0].textContent;
  }

  createListItem(lecture) {
    const div = el('div');
    div.classList.add('lectures__box');
    div.addEventListener('click', this.onClickLecture);

    const url = el('span');
    url.classList.add('hidden');
    url.textContent = `../../fyrirlestur.html?slug=${lecture.slug}`;
    div.appendChild(url);

    if (lecture.thumbnail) {
      const thumbnail = el('img');
      thumbnail.src = `${lecture.thumbnail}`;
      thumbnail.classList.add('lectures__thumbnail');
      div.appendChild(thumbnail);
    }

    const category = el('div', `${lecture.category}`);
    category.classList.add('lectures__category');
    div.appendChild(category);

    const title = el('div', `${lecture.title}`);
    title.classList.add('lectures__title');
    div.appendChild(title);

    const fin = loadSavedLectures();
    if (fin.find(l => l === `${lecture.slug}`)) {
      const span = el('span');
      span.classList.add('lectures__fin');
      span.textContent = '✓';
      div.appendChild(span);
    }

    // const link = el('a', div);
    // link.href = `../../fyrirlestur.html?slug=${lecture.slug}`;
    // link.classList.add('lecture__link');

    return div;
  }

  init(data, filters) {
    if (data === null) return;
    if (this.container !== null) empty(this.container);

    data.lectures.forEach((lecture) => {
      // eslint-disable-next-line no-bitwise
      if ((filters.htmlFilter & filters.cssFilter & filters.jsFilter)
        // eslint-disable-next-line no-bitwise
        || (!filters.htmlFilter & !filters.cssFilter & !filters.jsFilter)) {
        this.container.appendChild(this.createListItem(lecture));
      } else {
        if (filters.htmlFilter && lecture.category === 'html') this.container.appendChild(this.createListItem(lecture));
        if (filters.cssFilter && lecture.category === 'css') this.container.appendChild(this.createListItem(lecture));
        if (filters.jsFilter && lecture.category === 'javascript') this.container.appendChild(this.createListItem(lecture));
      }
    });
  }

  load(filters) {
    fetch('../../lectures.json')
      .then(responce => responce.json())
      .then(json => this.init(json, filters))
      // eslint-disable-next-line no-console
      .catch(error => console.log('error', error));
  }
}
