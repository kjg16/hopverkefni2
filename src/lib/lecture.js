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
    // console.log(title);
    // console.log(category);
    // console.log(imgPath);
  }

  embedVideo(link) {
    // console.log(link);
  }

  renderImg(img, caption) {
    // console.log(img);
    // console.log(caption);
  }

  createEl(type, data) {
    // console.log(type);
    // console.log(data);
  }

  createList(listArray) {
    for (let i = 0; i < listArray.length; i+=1) {
      console.log(listArray[i]);
    }
  }

  addContent(content) {
    console.log(content);
    for (let i = 0; i < content.length; i+=1) {
      if (content[i].type === 'youtube') {
        this.embedVideo(content[i].data);
      } else if (content[i].type === 'image') {
        this.renderImg(content[i].data, content[i].caption);
      } else if (content[i].type === 'list') {
        this.createList(content[i].data);
      } else {
        this.createEl(content[i].type, content[i].data);
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
