import { pathForPopularMovies } from "../commonVars";
import { fetchData } from "../fetchData";

export async function fetchPopularMovies() {
  //выбираем рандомно страницу из первых 15 страницы популярных фильмов
  const randomPage = getRandomNum(5, true);
  const movies = await fetchData(`${pathForPopularMovies}?page=${randomPage}`);
  return movies;
  // try {
  //   const response = await fetch(
  //     domenPartUrl + pathForPopularMovies + `?page=${randomPage}`
  //   );

  //   if (!response.ok) {
  //     console.log("Cannot fetch data form the server");
  //     throw new Error("HTTP Error: " + response.status);
  //   }

  //   const movies = await response.json();
  //   return movies;
  // } catch (error) {
  //   console.error("Error while loading movie information", error);
  //   return null;
  // }
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
    ? Math.floor(Math.random() * max) + 1 // От 1 до max
    : Math.floor(Math.random() * (max + 1)); // От 0 до max
}
