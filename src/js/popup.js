import { createControlBarElem } from "./controlBar/createControlBar";
import { classesControlBar } from "./controlBar/controlBarVars";
import { handleControlBarClick } from "./controlBar/controlBarBtnHandlers";
import { domenPartUrl, basePosterUrl } from "./commonVars";
import { moveToPage } from "./moveToPage";

/**
 * Функция для запроса данных о фильме по ID (19995 = «Аватар»).
 * Возвращает объект с информацией о фильме в формате JSON.
 */
async function fetchMovieDataById(id) {
  // Формируем URL для запроса, используя полученный id
  const url = `${domenPartUrl}/search/movie/byId?movie_id=${id}`;
  try {
    // Выполняем запрос к API
    const response = await fetch(url);

    // Если HTTP-статус не 200-299, считаем, что произошла ошибка
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }

    // Преобразуем ответ в JSON-объект
    const data = await response.json();
    return data; // Возвращаем полученные данные
  } catch (error) {
    // Выводим ошибку в консоль для отладки
    console.error("Failed to load movie information:", error);
    // Можем пробросить ошибку дальше, чтобы ее обработал вызывающий код
    throw error;
  }
}

// Обработчик клика по элементу с id "movie"
export async function showPopUp(evt, movie_id) {
  // Проверяем, что клик произошёл именно по элементу с классом "movie" или его потомку
  const movieElem = evt.target.closest(".movie");
  // if (!movieElem) {
  //   // Если клик произошёл вне элемента .movie, выводим сообщение в консоль и выходим
  //   return;
  // }

  // Извлекаем ID фильма из data-атрибута
  document.querySelector(".popup__movie").dataset.id = movie_id;

  try {
    // Запрашиваем данные о фильме по ID через нашу функцию fetchMovieDataById
    const movieData = await fetchMovieDataById(movie_id);
    if (movieData.poster_path) {
      // Заполняем левую колонку popup: задаём src для постера
      document.querySelector(".popup__poster").src =
        basePosterUrl + movieData.poster_path;
    } else {
      document.querySelector(".popup__poster").src =
        "./src/assets/images/no-Image-Placeholder.svg";
    }
    // Заполняем правую колонку:
    // Название фильма
    document.querySelector(".popup__title").textContent =
      movieData.title || "Unknown";
    // Год выпуска: берём первые 4 символа из release_date (например, "2009" из "2009-12-15")
    document.querySelector(".popup__year").textContent = movieData.release_date
      ? movieData.release_date.slice(0, 4)
      : "не указан";
    // Ссылка на страницу фильма на TMDB (используем movie_id для формирования URL)
    document.querySelector(".popup__tmdb-link").href =
      "https://www.themoviedb.org/movie/" + movie_id;
    // Краткое описание фильма
    document.querySelector(".popup__overview").textContent =
      movieData.overview || "Unknown";

    const controlBarContainer = document.querySelector(
      ".popup__control-bar-container"
    );
    // Очищаем контейнер перед добавлением новой панели
    controlBarContainer.innerHTML = "";
    // делаем новый
    const controlBar = createControlBarElem(movieData);
    controlBarContainer.append(controlBar);

    // Отображаем popup, добавляя класс "active" (в CSS это делает popup видимым)
    document.getElementById("movie-popup").classList.add("active");

    // Обработчик клика по кнопке закрытия popup или клика на фильм
    // document.getElementById("movie-popup").addEventListener("click", (evt) => {
    //   handlePopupClick(evt);
    // });
  } catch (error) {
    // Если произошла ошибка при запросе или обработке данных, выводим сообщение в консоль
    console.error("Error fetching data:", error);
    // Можно здесь вывести сообщение пользователю (например, через alert)
    alert("Failed to load movie information");
  }
}

//Эта функция импортирована в movies-genres/genres.js
export function handlePopupClick(evt) {
  if (evt.target.closest("a")) {
    return; // чтобы работала клик по ссылке на tmbd
  }
  //проверяем кликнул ли пользователь на кнопку закрытия попапа
  if (evt.target.closest(".popup__close-btn")) {
    document.getElementById("movie-popup").classList.remove("active"); //закрываем попап
    //проверяем кликнул ли пользователь на кнопки в control bar
  } else if (evt.target.closest(`.${classesControlBar.controlBar}`)) {
    //отправляем к функции которая хэндлит нажатия на кнопки в control bar
    handleControlBarClick(evt);
    // проверяем кликнул ли пользователь на что то другое в попапе
  } else if (evt.target.closest(".popup")) {
    // перенаправляем на страницу фильма
    moveToPage(document.querySelector(".popup"), "movie");
  }
}

//вот код который ее запускает, он лежит в дианином js так как слушатель события привязан к main и только если юзер ткнул что то на попапе запускается эта функция:

// const main = document.getElementById("main");
// main.addEventListener("DOMContentLoaded", () => handleItemClick(evt));

// //функция клика фильма, жанра и кнопки
// function handleItemClick(evt) {
//   // console.log("Клик по элементу:", evt.target); // Проверяем, что клики вообще регистрируются

//   if (evt.target.closest(".popup")) {
//     //пользователь нажал на что-то в попапе, запускаем функцию хэндлинга клика на элементы попапа
//     handlePopupClick(evt);
//   } else if (evt.target.closest(".movie")) {
//     //пользователь нажал на фильм, открываем попап
//    достать id
//     showPopUp(evt);
//   } else if (evt.target.closest(".genre")) {
//     // Проверяем, кликнул ли пользователь на сам блок жанра или на кнопку в блоке жанра (выделять отдельно кнопку и жанр не надо, тк у них у обоих в closest будет .genre)
//     const genreElement = evt.target.closest(".genre");
//     const genreId = genreElement.getAttribute("data-id");
//     if (genreId) {
//       console.log("Переход на страницу жанра (по контейнеру):", genreId);
//       window.location.href = `genre.html?id=${genreId}`;
//     }
//   }
// }
