import "./assets/styles/normalize.css";
import "./main.css";

import { getPathFromWindowLocation, getPageName } from "./js/getCheckUrlData";
import { loadMoviePage } from "./js/moviePage/loadMoviePage.js";
import { loadSavedMovies } from "./js/savedMovies/getAndLoadSavedMovies.js";
import { renderMovieBanner } from "./js/randomMovieBanner/renderMovieBanner.js";
import { loadMainPage } from "./js/mainPage/mainPageNastya.js";
import { initUpButton } from "./js/upButton.js";
import { searchHandle } from "./js/header.js";
import { mainSearchFunction } from "./js/search.js";
import { mainGenrePageFunction, setUpBtnListener } from "./js/genrePage.js";

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
    setUpBtnListener();
  });
}

document.addEventListener("DOMContentLoaded", searchHandle);

if (getPathFromWindowLocation() === "/search.html") {
  document.addEventListener("DOMContentLoaded", () => {
    mainSearchFunction();
    initUpButton();
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
