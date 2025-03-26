export function isMovieStored(movie_id, property) {
  const moviesStored = JSON.parse(window.localStorage.getItem(property)) || [];
  return moviesStored.some((movie) => Number(movie.id) === movie_id);
}

export function deleteMovieFromStorage(movie_id, property) {
  const moviesStored = JSON.parse(window.localStorage.getItem(property)) || [];
  if (!isMovieStored(movie_id, property)) {
    return;
  }
  const newMovies = moviesStored.filter(
    (movie) => Number(movie.id) !== movie_id
  );
  window.localStorage.setItem(property, newMovies);
}

export function addMovieToStorage(movieObj, property) {
  if (isMovieStored(movieObj.id, property)) {
    return;
  }
  const moviesStored = JSON.parse(window.localStorage.getItem(property)) || [];
  moviesStored.push(movieObj);
  window.localStorage.setItem(property, JSON.stringify(moviesStored));
}
