import { setUpMovieCastBtn } from "./js/moviePage/movieCastExpand.js";
import { loadMoviePage } from "./js/moviePage/fullMovieDescription.js";
// import { loadMoviePage } from "./js/moviePage/renderMovie.js";

// Слушаем события
document.addEventListener("movieLoaded", setUpMovieCastBtn);

document.addEventListener("movieError", function (event) {
  console.error("Ошибка при загрузке фильма:", event.detail);
});

loadMoviePage();
