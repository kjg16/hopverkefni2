import {
  empty,
  el,
} from './helpers';


export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  createLecture(lecture) {
    const div = el('div');
    div.classList.add('lecture');

    const thumbnail = el('img');
    thumbnail.src = `${lecture.thumbnail}`;
    thumbnail.classList.add('lecture__thumbnail');

    const category = el('div', `${lecture.category}`);
    category.classList.add('lecture__category');

    const title = el('div', `${lecture.title}`);
    title.classList.add('lecture__title');

    div.appendChild(thumbnail);
    div.appendChild(category);
    div.appendChild(title);

    const link = el('a', div);
    link.href = `../../fyrirlestur.html?slug=${lecture.slug}`;
    title.classList.add('lecture__link');

    return link;
  }

  init(data, filters) {
    if (data === null) return;
    empty(this.container);

    console.log(filters);
    data.lectures.forEach((lecture) => {
      if ((filters.htmlFilter & filters.cssFilter & filters.jsFilter) ||
        (!filters.htmlFilter & !filters.cssFilter & !filters.jsFilter)) {
        this.container.appendChild(this.createLecture(lecture));
      } else {
        if (filters.htmlFilter && lecture.category === 'html') this.container.appendChild(this.createLecture(lecture));
        if (filters.cssFilter && lecture.category === 'css') this.container.appendChild(this.createLecture(lecture));
        if (filters.jsFilter && lecture.category === 'javascript') this.container.appendChild(this.createLecture(lecture));
      }
    });
  }

  load(filters) {
    fetch('../../lectures.json')
      .then(responce => responce.json())
      .then(json => this.init(json, filters));
    // .then(responce => console.log('succsess', JSON.stringify(responce)))
    // .catch(error => console.log('error', error));
  }
}
