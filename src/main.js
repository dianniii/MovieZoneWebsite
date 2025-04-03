import "./assets/styles/normalize.css";
import "./main.css";

import { getPathFromWindowLocation, getPageName } from "./js/getCheckUrlData";
import { loadMoviePage } from "./js/moviePage/loadMoviePage.js";
import { loadSavedMovies } from "./js/savedMovies/getAndLoadSavedMovies.js";
import { renderMovieBanner } from "./js/randomMovieBanner/renderMovieBanner.js";

if (
  getPathFromWindowLocation() === "/" ||
  getPathFromWindowLocation() === "/index.html"
) {
  document.addEventListener("DOMContentLoaded", renderMovieBanner);
}

if (getPathFromWindowLocation() === "/movie.html") {
  document.addEventListener("DOMContentLoaded", loadMoviePage);
}

import { moviesByGenre, movie_container, getLocalStorageData, filterMoviesArr, mainGenrePageFunction, loadMoreEventListener} from "./js/genrePage.js";

if (getPathFromWindowLocation() === "/genre.html") {
  document.addEventListener("DOMContentLoaded", ()=>{
      getLocalStorageData('movies');
      filterMoviesArr();
      mainGenrePageFunction();
      loadMoreEventListener(moviesByGenre, movie_container);
  })
}

import { searchHandle } from "./js/header.js";

document.addEventListener("DOMContentLoaded", searchHandle);

import { mainSearchFunction } from "./js/search.js";

if (getPathFromWindowLocation() === "/search.html") {
  document.addEventListener("DOMContentLoaded", mainSearchFunction());
}

if (
  getPathFromWindowLocation() === "/favorites.html" ||
  getPathFromWindowLocation() === "/watchlist.html"
) {
  document.addEventListener("DOMContentLoaded", () =>
    loadSavedMovies(getPageName())
  );
}
