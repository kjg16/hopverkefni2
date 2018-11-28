import { el, empty } from './helpers';
// import { generateImg, generateTitle } from '.converter';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = '../lectures.json';
  }

  loadLecture(inputSlug) {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return res.json();
      })
      .then((data) => {
        const found = data.lectures.find(lecture => lecture.slug === inputSlug);
        if (!found) {
          throw new Error('Fyrirlestur fannst ekki');
        }
        return found;
      });
  }

  setHeader(title, category, image) {
    const imgPath = `../${image}`;
    console.log(title);
    console.log(category);
    console.log(imgPath);
  }

  embedVideo(link) {
    // console.log(link);
  }

  renderImg(img, caption) {
    const imgdiv = document.createElement('div');
    imgdiv.classList.add('img');
    // console.log(img);
    // console.log(caption);
  }

  createTextEl(type, data) {
    let addition;
    const lecture = document.getElementsByClassName('lecture')[0];

    if (type === 'text' || type === 'code') {
      const dataLines = data.split('\n');
      addition = el('div');
      for (let i = 0; i < dataLines.length; i += 1) {
        addition.appendChild(el('p', dataLines[i]));
      }
    } else if (type === 'heading') {
      addition = el('h1', data);
    } else {
      addition = el('p', data);
    }
    addition.classList.add(`lecture-${type}`)

    lecture.appendChild(addition);
  }

  createList(listArray) {
    const list = document.createElement('li');
    for (let i = 0; i < listArray.length; i += 1) {
      const item = el('ul', listArray[i]);
      list.appendChild(item);
    }
    const page = document.getElementsByClassName('lecture')[0];
    page.appendChild(list);
  }

  addContent(content) {
    console.log(content);
    for (let i = 0; i < content.length; i += 1) {
      const { type, data, caption } = content[i];
      if (type === 'youtube') {
        this.embedVideo(data);
      } else if (type === 'image') {
        this.renderImg(data, caption);
      } else if (type === 'list') {
        this.createList(data);
      } else {
        this.createTextEl(type, data);
      }
    }
  }

  addFinishButton() {
    console.log('Bæta við takka!');
    // Þarf einnig að bæta virkni svo að ef ýtt er á takkann fer slug í storage
  }

  addBackLink() {
    console.log('Bæta við link á heimasíðu!');
  }

  renderData(data) {
    empty(this.container);
    this.setHeader(data.title, data.category, data.image);
    this.addContent(data.content);
    this.addFinishButton();
    this.addBackLink();
  }

  load() {
    // Þarf að gera: Fá js til að sækja slug síðunnar
    const qs = new URLSearchParams(window.localStorage.search);
    const slug = qs.get('slug');
    console.log(slug);
    // Virkar ekki núna fyrir hvaða fyrirlestur sem er!!
    // Byrja á að fá gögn til að birtast!!
    this.loadLecture('html-sagan').then(data => this.renderData(data));
  }
}
