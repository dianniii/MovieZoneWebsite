import { createElementWithProps } from "../moviePage/movieUtils";

const moviesContainer = document.querySelector(".movies");

function getSavedMovies(listName) {
  return JSON.parse(window.localStorage.getItem(listName));
}

// function createMovieElem(movieData) {
//     const movieContainer = createElementWithProps()
// }
