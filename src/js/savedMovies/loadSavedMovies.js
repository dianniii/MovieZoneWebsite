import { createElementWithProps } from "../moviePage/movieUtils";
import { savedMoviesClss } from "./savedMoviesVars";

const moviesContainer = document.querySelector(".movies");

function getSavedMovies(listName) {
  return JSON.parse(window.localStorage.getItem(listName));
}

function createMovieElem(movieData) {
  const movieContainer = createElementWithProps();
}
