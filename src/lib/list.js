import {
  empty,
  el,
} from './helpers';
import { loadSavedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures__row');
  }

  onClickLecture(e) {
    window.location.href = e.currentTarget.children[0].textContent;
  }

  createCol() {
    const div = el('div');
    div.classList.add('lectures__col');
    div.addEventListener('click', this.onClickLecture);
    return div;
  }

  createUrl(lecture) {
    const url = el('span');
    url.classList.add('hidden');
    url.textContent = `./fyrirlestur.html?slug=${lecture.slug}`;
    return url;
  }

  createThumbnail(lecture) {
    const thumbnail = el('img');
    thumbnail.src = `${lecture.thumbnail}`;
    thumbnail.classList.add('lectures__thumbnail');
    return thumbnail;
  }

  createCategory(lecture) {
    const category = el('div', `${lecture.category}`);
    category.classList.add('lectures__category');
    return category;
  }

  createFin() {
    const fin = el('span');
    fin.classList.add('lectures__fin');
    fin.textContent = '✔';
    return fin;
  }

  createTitle(lecture) {
    const title = el('div');
    title.classList.add('lectures__title');

    const titleText = el('div', `${lecture.title}`);
    titleText.classList.add('lectures__titleText');
    title.appendChild(titleText);

    const fin = loadSavedLectures();
    if (fin.find(l => l === `${lecture.slug}`)) {
      title.appendChild(this.createFin());
    }
    return title;
  }

  createDescription(lecture) {
    const description = el('div');
    description.classList.add('lectures__description');
    description.appendChild(this.createCategory(lecture));
    description.appendChild(this.createTitle(lecture));
    return description;
  }

  createLecture(lecture) {
    const div = this.createCol(lecture);
    div.appendChild(this.createUrl(lecture));
    if (lecture.thumbnail) div.appendChild(this.createThumbnail(lecture));
    div.appendChild(this.createDescription(lecture));
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
        this.container.appendChild(this.createLecture(lecture));
      } else {
        if (filters.htmlFilter && lecture.category === 'html') this.container.appendChild(this.createLecture(lecture));
        if (filters.cssFilter && lecture.category === 'css') this.container.appendChild(this.createLecture(lecture));
        if (filters.jsFilter && lecture.category === 'javascript') this.container.appendChild(this.createLecture(lecture));
      }
    });
  }

  load(filters) {
    fetch('lectures.json')
      .then(responce => responce.json())
      .then(json => this.init(json, filters))
      // eslint-disable-next-line no-console
      .catch(error => console.log('error', error));
  }
}
