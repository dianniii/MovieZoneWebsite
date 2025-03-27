export function isMovieStored(movie_id, property) {
  if (!window.localStorage.getItem(property)) {
    window.localStorage.setItem(property, JSON.stringify([]));
    return false;
  }
  const moviesStored = JSON.parse(window.localStorage.getItem(property));
  return moviesStored.some((movie) => Number(movie.id) === movie_id);
}

export function deleteMovieFromStorage(movie_id, property) {
  if (!isMovieStored(movie_id, property)) {
    return;
  }
  const moviesStored = JSON.parse(window.localStorage.getItem(property));
  const newMovies = moviesStored.filter(
    (movie) => Number(movie.id) !== movie_id
  );
  window.localStorage.setItem(property, JSON.stringify(newMovies));
}

export function addMovieToStorage(movieObj, property) {
  const moviesStored = JSON.parse(window.localStorage.getItem(property));
  if (!isMovieStored(movieObj.id, property)) {
    moviesStored.push(movieObj);
    window.localStorage.setItem(property, JSON.stringify(moviesStored));
  }
}
