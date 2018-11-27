import {
  empty,
  el,
} from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  init(data) {
    if (data === null) return;

    empty(this.container);

    let cnt = 0;
    data.lectures.forEach((lecture) => {
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
      link.href = `../../fyrirlestur.html?id=${cnt}`;

      this.container.appendChild(link);
      cnt += 1;
    });
  }

  load() {
    fetch('../../lectures.json')
      .then(responce => responce.json())
      .then(json => this.init(json));
    // .then(responce => console.log('succsess', JSON.stringify(responce)))
    // .catch(error => console.log('error', error));
  }
}
/*
import { empty, createElement } from './helpers';
import { generateImg, generateTitle } from './converter';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.url = '../lectures.json';
  }

  loadLectures() {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return res.json();
      });
  }

  renderItem(item) {
    const titleEl = generateTitle(item.title, item.slug);
    this.container.appendChild(titleEl);
    const imageEl = generateImg(item.thumbnail);
    this.container.appendChild(imageEl);

    // let imageElement = document.createElement('img');
    // imageElement.src = `../../${item.thumbnail}`;
  }

  renderData(data) {
    // let dataElement = createElement('p', JSON.stringify(data));
    // this.container.appendChild(dataElement);
    data.lectures.map((item) => {
      const Item = this.renderItem(item);
      return Item;
    });
  }

  load() {
    console.log(this.container);
    /*empty(this.container);
    this.loadLectures()
      .then(data => console.log(data));
  }
}
*/