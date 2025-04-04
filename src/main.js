import "./assets/styles/normalize.css";
import "./main.css";

import { getPathFromWindowLocation, getPageName } from "./js/getCheckUrlData";
import { loadMoviePage } from "./js/moviePage/loadMoviePage.js";
import { loadSavedMovies } from "./js/savedMovies/getAndLoadSavedMovies.js";
import { renderMovieBanner } from "./js/randomMovieBanner/renderMovieBanner.js";
import { loadMainPage } from "./js/mainPage/mainPageNastya.js";
import { initUpButton } from "./js/upButton.js";
import { searchHandle } from "./js/header.js";
import { mainSearchFunction } from "./js/genreAndSearch/search.js";
import { mainGenrePageFunction } from "./js/genreAndSearch/genrePage.js";
import { setLoadMoreListener } from "./js/genreAndSearch/loadMoreHandler.js";

if (
  getPathFromWindowLocation() === "/" ||
  getPathFromWindowLocation() === "/index.html"
) {
  document.addEventListener("DOMContentLoaded", () => {
    renderMovieBanner();
    loadMainPage();
    initUpButton();
  });
}

if (getPathFromWindowLocation() === "/movie.html") {
  document.addEventListener("DOMContentLoaded", loadMoviePage);
}

if (getPathFromWindowLocation() === "/genre.html") {
  document.addEventListener("DOMContentLoaded", () => {
    mainGenrePageFunction();
    initUpButton();
    setLoadMoreListener();
  });
}

document.addEventListener("DOMContentLoaded", searchHandle);

if (getPathFromWindowLocation() === "/search.html") {
  document.addEventListener("DOMContentLoaded", () => {
    mainSearchFunction();
    initUpButton();
    setLoadMoreListener();
  });
}

if (
  getPathFromWindowLocation() === "/favorites.html" ||
  getPathFromWindowLocation() === "/watchlist.html"
) {
  document.addEventListener("DOMContentLoaded", () => {
    loadSavedMovies(getPageName());
    initUpButton();
  });
}
