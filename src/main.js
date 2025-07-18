import "./assets/styles/normalize.css";
import "./main.css";

import { getPathFromWindowLocation, getPageName } from "./js/getCheckUrlData";
import { loadMoviePage } from "./js/moviePage/loadMoviePage.js";
import { loadSavedMovies } from "./js/savedMovies/getAndLoadSavedMovies.js";
import { renderMovieBanner } from "./js/randomMovieBanner/renderMovieBanner.js";
import { loadMainPage } from "./js/mainPage/mainPage.js";
import { initUpButton } from "./js/upButton.js";
import { searchHandle } from "./js/header.js";
import { mainSearchFunction } from "./js/genreAndSearch/search.js";
import { mainGenrePageFunction } from "./js/genreAndSearch/genrePage.js";
import { setLoadMoreListener } from "./js/genreAndSearch/loadMoreHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const curPath = getPathFromWindowLocation();

  searchHandle();
  initUpButton();

  switch (curPath) {
    case "/":
    case "/index.html":
      renderMovieBanner();
      loadMainPage();
      break;
    case "/movie.html":
      loadMoviePage();
      break;
    case "/genre.html":
      mainGenrePageFunction();
      setLoadMoreListener();
      break;
    case "/search.html":
      mainSearchFunction();
      setLoadMoreListener();
      break;
    case "/favorites.html":
    case "/watchlist.html":
      loadSavedMovies(getPageName());
      break;
  }
});
