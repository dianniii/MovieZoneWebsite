import { setUpMovieCastBtn } from "./js/expandCast.js";
import { loadMoviePage } from "./js/fullMovieDescription.js";

// Слушаем события
document.addEventListener("movieLoaded", setUpMovieCastBtn);

document.addEventListener("movieError", function (event) {
  console.error("Ошибка при загрузке фильма:", event.detail);
});

loadMoviePage();
