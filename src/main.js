import "./assets/styles/normalize.css";
import "./main.css";

import { getPathFromWindowLocation, getPageName } from "./js/getCheckUrlData";
import { loadMoviePage } from "./js/moviePage/loadMoviePage.js";
import { loadSavedMovies } from "./js/savedMovies/getAndLoadSavedMovies.js";

if (getPathFromWindowLocation() === "/movie.html") {
  document.addEventListener("DOMContentLoaded", loadMoviePage);
}

if (
  getPathFromWindowLocation() === "/favorites.html" ||
  getPathFromWindowLocation() === "/watchlist.html"
) {
  document.addEventListener("DOMContentLoaded", () =>
    loadSavedMovies(getPageName())
  );
}

// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";

// document.querySelector("#app").innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));
