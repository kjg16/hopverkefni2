export function empty(element) {
  if (!element.firstChild) {
    return;
  }
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function createElement(el, text) {
  const element = document.createElement(el);
  if (text) {
    element.appendChild(document.createTextNode(text));
  }
  return element;
}
