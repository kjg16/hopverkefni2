import {
  empty,
  el,
} from './helpers';


export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  createListItem(lecture) {
    const div = el('div');
    div.classList.add('lecture');

    if (lecture.thumbnail) {
      const thumbnail = el('img');
      thumbnail.src = `${lecture.thumbnail}`;
      thumbnail.classList.add('lecture__thumbnail');
      div.appendChild(thumbnail);
    }

    const category = el('div', `${lecture.category}`);
    category.classList.add('lecture__category');
    div.appendChild(category);

    const title = el('div', `${lecture.title}`);
    title.classList.add('lecture__title');
    div.appendChild(title);

    const link = el('a', div);
    link.href = `../../fyrirlestur.html?slug=${lecture.slug}`;
    link.classList.add('lecture__link');

    return link;
  }

  init(data, filters) {
    if (data === null) return;
    if (this.container !== null) empty(this.container);

    console.log(filters);
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
