export const LOCALSTORAGE_KEY = 'fin_lectures';

export function loadSavedLectures() {
  const finJSON = localStorage.getItem(LOCALSTORAGE_KEY);
  const fin = JSON.parse(finJSON) || [];
  return fin;
}

export function saveLectures(slug) {
  const fin = loadSavedLectures();
  const count = fin.indexOf(slug);
  if (count >= 0) {
    fin.splice(count, 1);
  } else {
    fin.push(slug);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(fin));
}
