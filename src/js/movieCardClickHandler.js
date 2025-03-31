import {
  classesControlRemBar,
  savedMoviesClss,
} from "./savedMovies/savedMoviesVars";
import { handleRemoveMovieClick } from "./savedMovies/removeBtnHandler";
import { handleControlBarClick } from "./controlBar/controlBarBtnHandlers";
import { classesBanner } from "./moviePage/movieVars";
import { classesControlBar } from "../js/controlBar/controlBarVars";
import { moveToPage } from "./moveToPage";

export function movieCardClickHandler(evt) {
  if (evt.target.closest("a")) return;

  if (evt.target.closest("." + classesControlRemBar.controlBarElem[1])) {
    return handleRemoveMovieClick(evt);
  }

  if (evt.target.closest("." + classesControlBar.controlBar)) {
    return handleControlBarClick(evt);
  }

  if (evt.target.closest("." + savedMoviesClss.movieCard)) {
    return moveToPage(evt.target.closest(".movie-card"), "movie");
  }

  if (evt.target.closest("." + classesBanner.banner)) {
    return moveToPage(evt.target.closest("." + classesBanner.banner), "movie");
  }
}
