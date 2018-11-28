import { el, empty } from './helpers';
import { saveLectures } from './storage';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.header = document.querySelector('.lecture__header');
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
    // Skoða betur
    const imgPath = `../${image}`;
    const header = el('div');
    header.classList.add('lecture__header');
    header.style.backgroundImage = `url(${imgPath})`;
    header.appendChild(el('h1', title));
    header.appendChild(el('h2', category));
    const lecture = this.header;
    lecture.appendChild(header);
  }

  embedVideo(link) {
    const video = el('iframe');
    video.setAttribute('src', link);
    const lecture = this.container;
    lecture.appendChild(video);
  }

  renderImg(image, caption) {
    const imgdiv = el('div');
    imgdiv.classList.add('img__div');
    const img = el('img');
    img.setAttribute('src', image);
    const cap = el('p', caption);
    cap.classList.add('img__caption');
    imgdiv.appendChild(img);
    imgdiv.appendChild(cap);
    const lecture = this.container;
    lecture.appendChild(imgdiv);
  }

  createTextEl(type, data) {
    let addition;
    const lecture = this.container;

    if (type === 'text' || type === 'code') {
      const dataLines = data.split('\n');
      addition = el('div');
      for (let i = 0; i < dataLines.length; i += 1) {
        addition.appendChild(el('p', dataLines[i]));
      }
    } else if (type === 'heading') {
      addition = el('h1', data);
    } else {
      // quote, skoða betur
      addition = el('p', data);
    }
    addition.classList.add(`lecture__${type}`);

    lecture.appendChild(addition);
  }

  createList(listArray) {
    const list = document.createElement('li');
    for (let i = 0; i < listArray.length; i += 1) {
      const item = el('ul', listArray[i]);
      list.appendChild(item);
    }
    const lecture = this.container;
    lecture.appendChild(list);
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

  finishLecture(e) {
    console.log(e);
    console.log('Klárakláraklára');
    // const { target } = e;
    // this.saveLectures(this.slug);
  }

  addFinishButton() {
    const button = el('button', 'Klára fyrirlestur');
    button.classList.add('finish__button');
    button.addEventListener('click', this.finishLecture);
    const lecture = this.container;
    lecture.appendChild(button);
    console.log('Klára takka!');
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
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');
    this.loadLecture(slug).then(data => this.renderData(data));
  }
}
