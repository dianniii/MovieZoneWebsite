export function addMoviesToSessionStorage(moviesArr) {
  window.sessionStorage.setItem("movies", JSON.stringify(moviesArr));
}

export function isInSessionStorage(key) {
  const data = sessionStorage.getItem(key);
  return data && JSON.parse(data).length > 0;
}

export function getFromSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}
