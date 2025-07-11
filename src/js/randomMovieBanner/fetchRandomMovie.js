import { pathForPopularMovies } from "../commonVars";
import { fetchData } from "../fetchData";

export async function fetchPopularMovies() {
  const randomPage = getRandomNum(5, true);
  const movies = await fetchData(`${pathForPopularMovies}?page=${randomPage}`);
  return movies;
}

export function getRandomMovieWithBackdrop(movies) {
  let movie;
  let ifBackdrop = false;
  while (!ifBackdrop) {
    movie = getRandomMovie(movies);
    ifBackdrop = hasBackdrop(movie);
  }
  return movie;
}

function getRandomMovie(movies) {
  return movies.results[getRandomNum(movies.results.length + 1)];
}

function hasBackdrop(movie) {
  return movie && typeof movie.backdrop_path === "string";
}

function getRandomNum(max, startFromOne = false) {
  return startFromOne
    ? Math.floor(Math.random() * max) + 1
    : Math.floor(Math.random() * (max + 1));
}
