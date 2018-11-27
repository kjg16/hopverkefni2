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
        console.log(data.lectures);
        const found = data.lectures.find(lecture => lecture.slug === inputSlug);
        if (!found) {
          throw new Error('Fyrirlestur fannst ekki');
        }
        console.log(found);
        return found;
      });
  }

  renderData(data) {
    //
  }

  load() {
    const qs = new URLSearchParams(window.localStorage.search);
    console.log(window.localStorage.search);
    const slug = qs.get('slug');
    console.log(slug);
    // Virkar ekki núna fyrir hvaða fyrirlestur sem er!!
    // Byrja á að fá gögn til að birtast!!
    this.loadLecture("html-sagan").then(data => renderData(data));
  }
}
