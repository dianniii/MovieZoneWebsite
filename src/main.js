import "./assets/styles/normalize.css";
import "./main.css";

import { getPathFromWindowLocation, getPageName } from "./js/getCheckUrlData";
import { loadMoviePage } from "./js/moviePage/loadMoviePage.js";
import { loadSavedMovies } from "./js/savedMovies/getAndLoadSavedMovies.js";
import { renderMovieBanner } from "./js/randomMovieBanner/renderMovieBanner.js";
import { searchHandle } from "./js/header.js";
import { mainSearchFunction } from "./js/search.js";
import { mainGenrePageFunction, loadMoreHandler} from "./js/genrePage.js";

if (
  getPathFromWindowLocation() === "/" ||
  getPathFromWindowLocation() === "/index.html"
) {
  document.addEventListener("DOMContentLoaded", renderMovieBanner);
}

if (getPathFromWindowLocation() === "/movie.html") {
  document.addEventListener("DOMContentLoaded", loadMoviePage);
}


if (getPathFromWindowLocation() === "/genre.html") {
  document.addEventListener("DOMContentLoaded", ()=>{
      mainGenrePageFunction();
      const loadMoreButton = document.getElementById("load-more");
    loadMoreButton.addEventListener("click", loadMoreHandler);
  })
}


document.addEventListener("DOMContentLoaded", searchHandle);



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
