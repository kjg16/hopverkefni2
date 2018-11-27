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

  addContent(content) {
    console.log(content);
  }

  renderData(data) {
    empty(this.container);
    this.setHeader(data.title, data.category, data.image);
    this.addContent(data.content);
    console.log(data);
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
