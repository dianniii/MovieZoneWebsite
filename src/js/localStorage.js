export function isMovieStored(movie_id, propName) {
  const moviesStored = JSON.parse(window.localStorage.getItem(propName)) || [];
  return moviesStored.some((movie) => +movie.id === movie_id);
}
