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
    const imgPath = `../${image}`;
    const header = el('div');
    header.classList.add('lecture__header');
    header.style.backgroundImage = `url(${imgPath})`;
    header.appendChild(el('h2', category));
    header.appendChild(el('h1', title));
    const lecture = this.header;
    lecture.appendChild(header);
  }

  embedVideo(link) {
    // bæta við iframe elementi með src=link
    const video = el('iframe');
    video.setAttribute('src', link);
    video.setAttribute('frameborder', 0);
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

  createTextEl(type, data, attribute) {
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
    } else if (type === 'quote') {
      addition = el('blockquote', data);
      if (attribute) {
        const cite = el('cite', attribute);
        addition.appendChild(cite);
      }
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
    for (let i = 0; i < content.length; i += 1) {
      const {
        type, data, caption, attribute,
      } = content[i];
      if (type === 'youtube') {
        this.embedVideo(data);
      } else if (type === 'image') {
        this.renderImg(data, caption);
      } else if (type === 'list') {
        this.createList(data);
      } else {
        this.createTextEl(type, data, attribute);
      }
    }
  }

  finishLecture() {
    // Bæta við meiri virkni?
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');
    saveLectures(slug);
  }

  addFinishButton() {
    const button = el('button', 'Klára fyrirlestur');
    button.classList.add('finish__button');
    button.addEventListener('click', this.finishLecture);
    const lecture = this.container;
    lecture.appendChild(button);
  }

  addBackLink() {
    const link = el('a', 'Til baka');
    link.href = '../../index.html';
    link.classList.add('lecture__link');
    const lecture = this.container;
    lecture.appendChild(link);
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
