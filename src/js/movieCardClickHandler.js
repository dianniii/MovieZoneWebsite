import {
  classesControlRemBar,
  savedMoviesClss,
} from "./savedMovies/savedMoviesVars";
import { handleRemoveMovieClick } from "./savedMovies/removeBtnHandler";
import { handleControlBarClick } from "./controlBar/controlBarBtnHandlers";
import { classesBanner } from "./moviePage/movieVars";
import { classesControlBar } from "../js/controlBar/controlBarVars";

export function movieCardClickHandler(evt) {
  if (evt.target.closest("." + classesControlRemBar.controlBarElem[1])) {
    handleRemoveMovieClick(evt);
  } else if (evt.target.closest("." + classesControlBar.controlBar)) {
    handleControlBarClick(evt);
  } else if (evt.target.closest("." + savedMoviesClss.movieCard)) {
    moveToMoviePage(evt.target.closest(".movie-card"), "movie");
  } else if (evt.target.closest("." + classesBanner.banner)) {
    moveToMoviePage(evt.target.closest("." + classesBanner.banner), "movie");
  }
}

export function moveToMoviePage(elem, pageName) {
  console.log(elem);
  const id = elem.dataset.id;
  window.location.href = `${pageName}.html?id=${id}`;
}
