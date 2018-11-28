import { createElement } from './helpers';

export function generateImg(imgPath) {
  if (!imgPath) {
    return document.createElement('div');
  }
  const imgElement = createElement('img');
  imgElement.src = `../../${imgPath}`;
  return imgElement;
}

export function generateTitle(title, slug) {
  const link = document.createElement('a');
  link.href = `/fyrirlestur.html?slug=${slug}`;
  const titleEl = document.createElement('h1', title);
  titleEl.appendChild(document.createTextNode(link));
  link.appendChild(titleEl);
  return link;
}
