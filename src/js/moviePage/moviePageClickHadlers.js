import { classesBanner, classesInfo } from "./movieVars";
import { moveToPage } from "../moveToPage";

function toggleCastElementLength(evtTarget) {
  const hiddenPart = evtTarget.closest("." + classesInfo.hiddenCast);
  const btnElem = evtTarget.closest("." + classesInfo.castBtn);
  hiddenPart.classList.toggle(castHiddenClassName);

  if (hiddenPart.classList.contains(classesInfo.hiddenCast)) {
    btnElem.textContent = "see more...";
    return;
  }
  btnElem.textContent = "see less";
}

function showOtherMovies(evtTarget) {
  const genreId = evtTarget.dataset.id;
  if (!genreId) {
    moveToPage(evtTarget, "genre");
  }
}

export function handleMovieInfoClick(evt) {
  if (evt.target.closest("a")) {
    return;
  }

  if (evt.target.closest("." + classesBanner.banner)) {
    return movieCardClickHandler(evt);
  }

  if (evt.target.closest("." + classesInfo.castBtn)) {
    return toggleCastElementLength(
      evt.target.closest("." + classesInfo.castBtn)
    );
  }

  if (evt.target.closest("." + classesInfo.genre)) {
    return showOtherMovies(evt.target.closest("." + classesInfo.genre));
  }
}
