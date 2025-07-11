import { createControlBarElem } from "./controlBar/createControlBar";
import { classesControlBar } from "./controlBar/controlBarVars";
import { handleControlBarClick } from "./controlBar/controlBarBtnHandlers";
import { domenPartUrl, basePosterUrl } from "./commonVars";
import { moveToPage } from "./moveToPage";
import { pathForSearchById } from "./commonVars";
import { fetchData } from "./fetchData";
import { defaultPosterPath } from "./commonVars";

const NO_DATA_PLACEHOLDER = "Unknown";

export async function showPopUp(evt, movie_id) {
  document.querySelector(".popup").dataset.id = movie_id;
  const movieData = await fetchData(`${pathForSearchById}?movie_id=${movie_id}`);
  if (!movieData) {
    return;
  }

  const popupElement = document.getElementById("movie-popup");
  preparePopup(popupElement, movie_id, movieData);
  openPopup(popupElement);
}

export function handlePopupClick(evt) {
  if (evt.target.closest("a")) {
    return; 
  }
  if (evt.target.closest(".popup__close-btn")) {
    closePopup(document.getElementById("movie-popup"));
  } else if (evt.target.closest(`.${classesControlBar.controlBar}`)) {
    handleControlBarClick(evt);
  } else if (evt.target.closest(".popup")) {
    moveToPage(document.querySelector(".popup"), "movie");
  }
}

function preparePopup(popupElement, movie_id, movieData) {
  popupElement.querySelector(".popup__poster").src = movieData.poster_path

      ? basePosterUrl + movieData.poster_path
      : defaultPosterPath;
  popupElement.querySelector(".popup__title").textContent = movieData.title || NO_DATA_PLACEHOLDER;
  popupElement.querySelector(".popup__year").textContent = movieData.release_date
      ? movieData.release_date.slice(0, 4) 
      : NO_DATA_PLACEHOLDER;
  popupElement.querySelector(".popup__tmdb-link").href = "https://www.themoviedb.org/movie/" + movie_id;

  popupElement.querySelector(".popup__overview").textContent = movieData.overview || NO_DATA_PLACEHOLDER;

  const controlBarContainer = popupElement.querySelector(".popup__control-bar-container");

  controlBarContainer.innerHTML = "";
  const controlBar = createControlBarElem(movieData);
  controlBarContainer.append(controlBar);
}

function openPopup(popupElement) {
  popupElement.classList.add("active");
}

function closePopup(popupElement) {
  popupElement.classList.remove("active"); 
}

