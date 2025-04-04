export function addMoviesToSessionStorage(moviesArr) {
  window.sessionStorage.setItem("movies", JSON.stringify(moviesArr));
}

export function isInSessionStorage(key) {
  return sessionStorage.getItem(key);
}

export function getFromSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}
