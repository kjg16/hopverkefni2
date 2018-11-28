export const LOCALSTORAGE_KEY = 'fin_lectures';

export function loadSavedLectures() {
  const finJSON = localStorage.getItem(LOCALSTORAGE_KEY);
  const fin = JSON.parse(finJSON) || [];
  return fin;
}

export function saveLectures(slug) {
  const fin = loadSavedLectures();
  const index = fin.indexOf(slug);
  if (index >= 0) {
    fin.splice(index, 1);
  } else {
    fin.push(slug);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(fin));
}
