import { clssInfo, castIds } from "./movieVars";
import { classesBanner } from "../movieBanner/bannerVars";
import { moveToPage } from "../moveToPage";
import { movieCardClickHandler } from "../movieCardClickHandler";

function toggleCastElementLength(evtTarget) {
  const btnElem = evtTarget;
  const hiddenPart = document.getElementById(castIds.hidden);

  hiddenPart.classList.toggle(clssInfo.hiddenCast);

  if (hiddenPart.classList.contains(clssInfo.hiddenCast)) {
    btnElem.textContent = "see more...";
    return;
  }
  btnElem.textContent = "see less";
}

function showOtherMovies(evtTarget) {
  const genreId = evtTarget.dataset.id;
  if (genreId) {
    moveToPage(evtTarget, "genre");
  }
}

export function handleFullMovieClick(evt) {
  if (evt.target.closest("a")) {
    return;
  }

  if (evt.target.closest("." + classesBanner.banner)) {
    return movieCardClickHandler(evt);
  }

  if (evt.target.closest("." + clssInfo.castBtn)) {
    return toggleCastElementLength(evt.target.closest("." + clssInfo.castBtn));
  }

  if (evt.target.closest("." + clssInfo.genre)) {
    return showOtherMovies(evt.target.closest("." + clssInfo.genre));
  }
}
