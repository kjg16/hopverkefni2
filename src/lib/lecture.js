import { el, empty } from './helpers';
import { saveLectures, isSaved } from './storage';

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
    const videodiv = el('div');
    videodiv.classList.add('lecture__video');
    const video = el('iframe');
    video.setAttribute('src', link);
    video.setAttribute('frameborder', 0);
    videodiv.appendChild(video);
    const lecture = this.container;
    lecture.appendChild(videodiv);
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
    const additiondiv = el('div');
    const lecture = this.container;

    if (type === 'text') {
      const dataLines = data.split('\n');
      for (let i = 0; i < dataLines.length; i += 1) {
        additiondiv.appendChild(el('p', dataLines[i]));
      }
    } else if (type === 'code') {
      const dataLines = data.split('\n');
      for (let i = 0; i < dataLines.length; i += 1) {
        additiondiv.appendChild(el('pre', dataLines[i]));
      }
    } else if (type === 'heading') {
      additiondiv.appendChild(el('h1', data));
    } else if (type === 'quote') {
      additiondiv.appendChild(el('blockquote', data));
      if (attribute) {
        additiondiv.appendChild(el('cite', attribute));
      }
    }
    additiondiv.classList.add(`lecture__${type}`);

    lecture.appendChild(additiondiv);
  }

  createList(listArray) {
    const listdiv = el('div');
    listdiv.classList.add('lecture__list__container');
    const list = el('ul');
    list.classList.add('lecture__list');
    for (let i = 0; i < listArray.length; i += 1) {
      const item = el('li', listArray[i]);
      item.classList.add('lecture__list__item');
      list.appendChild(item);
    }
    listdiv.appendChild(list);
    const lecture = this.container;
    lecture.appendChild(listdiv);
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

  finishLecture(e) {
    const { target } = e;
    const { innerText } = target;
    if (innerText === 'Klára fyrirlestur') {
      target.innerText = '✓ Fyrirlestur kláraður';
    } else {
      target.innerText = 'Klára fyrirlestur';
    }
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');
    saveLectures(slug);
  }

  addFinishButton(slug) {
    const buttondiv = el('div');
    buttondiv.classList.add('button__div');
    const button = el('button');
    if (isSaved(slug)) {
      button.innerText = '✓ Fyrirlestur kláraður';
    } else {
      button.innerText = 'Klára fyrirlestur';
    }
    button.classList.add('finish__button');
    button.addEventListener('click', this.finishLecture);
    buttondiv.appendChild(button);
    const lecture = this.container;
    lecture.appendChild(buttondiv);
  }

  addBackLink() {
    const linkdiv = el('div');
    linkdiv.classList.add('link__div');
    const link = el('a', 'Til baka');
    link.href = '../../index.html';
    link.classList.add('lecture__link');
    linkdiv.appendChild(link);
    const lecture = this.container;
    lecture.appendChild(linkdiv);
  }

  renderData(data) {
    const lecture = this.container;
    empty(lecture);
    this.setHeader(data.title, data.category, data.image);
    this.addContent(data.content);
    this.addFinishButton(data.slug);
    this.addBackLink();
  }

  load() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');
    this.loadLecture(slug).then(data => this.renderData(data));
  }
}
