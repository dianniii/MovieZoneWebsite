import {
  classesControlRemBar,
  savedMoviesClss,
} from "./savedMovies/savedMoviesVars";
import { handleRemoveMovieClick } from "./savedMovies/removeBtnHandler";
import { handleControlBarClick } from "./controlBar/controlBarBtnHandlers";

export function movieCardClickHandler(evt) {
  if (evt.target.closest("." + classesControlRemBar.controlBarElem[1])) {
    console.log("close");
    handleRemoveMovieClick(evt);
  } else if (evt.target.closest("." + classesControlRemBar.controlBarElem[0])) {
    handleControlBarClick(evt);
  } else if (evt.target.closest("." + savedMoviesClss.movieCard)) {
    const movieElem = evt.target.closest(".movie-card");
    const movie_id = movieElem.dataset.id;
    window.location.href = `movie.html?id=${movie_id}`;
  }
}
