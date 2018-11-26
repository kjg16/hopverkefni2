/*
import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  load() {
    let data = null;

    empty(this.container);

    fetch('./lectures.json')
      .then(res => {
        res.json();
        data = JSON.stringify(res);
        return data;
      }
    // .then(responce => console.log('succsess', JSON.stringify(responce)))
    // .catch(error => console.log('error', error));
  }
}
*/
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
    empty(this.container);
    this.loadLectures()
      .then(data => console.log(data));
  }
}
