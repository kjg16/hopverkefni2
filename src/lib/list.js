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
      }
    // .then(responce => console.log('succsess', JSON.stringify(responce)))
    // .catch(error => console.log('error', error));
  }
}
