import { domenPartUrl, pathForPopularMovies } from "../commonVars";

export async function fetchPopularMovies() {
  //выбираем рандомно страницу из первых 15 страницы популярных фильмов
  const randomPage = getRandomNum(16);

  try {
    const response = await fetch(
      domenPartUrl + pathForPopularMovies + `?page=${randomPage}`
    );

    if (!response.ok) {
      console.log("Cannot fetch data form the server");
      throw new Error("HTTP Error: " + response.status);
    }

    const movies = await response.json();

    return movies;
  } catch (error) {
    console.error("Error while loading movie information", error);
    return null;
  }
}

export function getRandomMovie(movies) {
  if (!movies || Object.keys(movies).length === 0) {
    console.error("Error: No movies is empty.");
    return null;
  }
  return movies.results[getRandomMovie(21)];
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}
