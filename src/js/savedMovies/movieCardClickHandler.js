import { classesControlBar } from "../controlBar/controlBarVars";
import { handleRemoveMovieClick } from "./removeBtnHandler";

export function movieCardClickHandler(evt, storageProperty) {
  const controlBar = evt.target.closest("." + classesControlBar.controlBar);
  const clickOnRemBtn =
    controlBar && controlBar.classList.contains(classesControlBar.controlBar);
  if (clickOnRemBtn) {
    handleRemoveMovieClick(evt, storageProperty);
  } else {
    const movieElem = evt.target.closest(".movie-card");
    const movie_id = movieElem.getAttribute("data-id");
    window.location.href = `movie.html?id=${movie_id}`;
  }
}
