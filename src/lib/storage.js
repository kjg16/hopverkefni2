export const LOCALSTORAGE_KEY = 'fin_lectures';

export function loadSavedLectures() {
  const finJSON = localStorage.getItem(LOCALSTORAGE_KEY);
  const fin = JSON.parse(finJSON) || [];
  return fin;
}

export function isSaved(slug) {
  const fin = loadSavedLectures();
  const count = fin.indexOf(slug);
  return (count >= 0);
}

export function saveLectures(slug) {
  const fin = loadSavedLectures();
  const count = fin.indexOf(slug);
  if (isSaved(slug)) {
    fin.splice(count, 1);
  } else {
    fin.push(slug);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(fin));
}
