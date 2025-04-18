import { createControlBarElem } from "./controlBar/createControlBar";
import { classesControlBar } from "./controlBar/controlBarVars";
import { handleControlBarClick } from "./controlBar/controlBarBtnHandlers";
import { domenPartUrl, basePosterUrl } from "./commonVars";
import { moveToPage } from "./moveToPage";
import { pathForSearchById } from "./commonVars";
import { fetchData } from "./fetchData";
import { defaultPosterPath } from "./commonVars";

const NO_DATA_PLACEHOLDER = "Unknown";

// Обработчик клика по элементу с id "movie"
export async function showPopUp(evt, movie_id) {
  document.querySelector(".popup").dataset.id = movie_id;
  // используем функцию fetchData импортированную из fetchData.js
  const movieData = await fetchData(`${pathForSearchById}?movie_id=${movie_id}`);
  if (!movieData) {
    // если фетч не получился, fetchData вернет null, а мы просто не покажем попап
    return;
  }

  const popupElement = document.getElementById("movie-popup");
  preparePopup(popupElement, movie_id, movieData);
  openPopup(popupElement);
}

// Эта функция импортирована в movies-genres/genres.js
export function handlePopupClick(evt) {
  if (evt.target.closest("a")) {
    return; // чтобы работала клик по ссылке на tmbd
  }
  // проверяем кликнул ли пользователь на кнопку закрытия попапа
  if (evt.target.closest(".popup__close-btn")) {
    closePopup(document.getElementById("movie-popup"));
    // проверяем кликнул ли пользователь на кнопки в control bar
  } else if (evt.target.closest(`.${classesControlBar.controlBar}`)) {
    // отправляем к функции которая хэндлит нажатия на кнопки в control bar
    handleControlBarClick(evt);
    // проверяем кликнул ли пользователь на что то другое в попапе
  } else if (evt.target.closest(".popup")) {
    // перенаправляем на страницу фильма
    moveToPage(document.querySelector(".popup"), "movie");
  }
}

function preparePopup(popupElement, movie_id, movieData) {
  // Заполняем левую колонку popup: задаём src для постера
  popupElement.querySelector(".popup__poster").src = movieData.poster_path
      ? basePosterUrl + movieData.poster_path
      : defaultPosterPath;

  // Заполняем правую колонку:
  popupElement.querySelector(".popup__title").textContent = movieData.title || NO_DATA_PLACEHOLDER;
  popupElement.querySelector(".popup__year").textContent = movieData.release_date
      ? movieData.release_date.slice(0, 4) // первые 4 символа из release_date (например, "2009" из "2009-12-15")
      : NO_DATA_PLACEHOLDER;
  popupElement.querySelector(".popup__tmdb-link").href = "https://www.themoviedb.org/movie/" + movie_id;
  // Краткое описание фильма
  popupElement.querySelector(".popup__overview").textContent = movieData.overview || NO_DATA_PLACEHOLDER;

  const controlBarContainer = popupElement.querySelector(".popup__control-bar-container");
  // Очищаем контейнер перед добавлением новой панели
  controlBarContainer.innerHTML = "";
  const controlBar = createControlBarElem(movieData);
  controlBarContainer.append(controlBar);
}

function openPopup(popupElement) {
  // Отображаем popup, добавляя класс "active" (в CSS это делает popup видимым)
  popupElement.classList.add("active");
}

function closePopup(popupElement) {
  popupElement.classList.remove("active"); //закрываем попап
}

