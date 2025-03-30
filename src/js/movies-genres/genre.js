import { showPopUp, handlePopupClick } from "../popup";
// обработчик события click после загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.getElementById("main");
  if (mainContainer) {
    mainContainer.addEventListener("click", handleItemClick);
  } else {
    console.warn("Элемент <main> не найден.");
  }
});
//запрос на добавление жанров
async function getGenres() {
  try {
    const response = await fetch("https://movies.gila.workers.dev/genres");
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const data = await response.json();

    const genresArray = data.genres;

    if (!Array.isArray(genresArray)) {
      throw new Error("Данные жанров не являются массивом");
    }
    const container = document.getElementById("genres");
  } catch (error) {
    console.error("Ошибка:", error);
    const errorContainer = document.getElementById("error-message");
    if (errorContainer) {
      errorContainer.textContent = `Ошибка при загрузке жанров: ${error.message}`;
    }
  }
}
document.addEventListener("DOMContentLoaded", getGenres);

// Функция, которая добавляет объект жанра в массив
const genresList = [
  { genre_id: 28, genre_name: "Action" },
  { genre_id: 12, genre_name: "Adventure" },
  { genre_id: 16, genre_name: "Animation" },
  { genre_id: 35, genre_name: "Comedy" },
  { genre_id: 80, genre_name: "Crime" },
  { genre_id: 99, genre_name: "Documentary" },
  { genre_id: 18, genre_name: "Drama" },
  { genre_id: 10751, genre_name: "Family" },
  { genre_id: 14, genre_name: "Fantasy" },
  { genre_id: 36, genre_name: "History" },
  { genre_id: 27, genre_name: "Horror" },
  { genre_id: 10402, genre_name: "Music" },
  { genre_id: 9648, genre_name: "Mystery" },
  { genre_id: 10749, genre_name: "Romance" },
  { genre_id: 878, genre_name: "Science Fiction" },
  { genre_id: 10770, genre_name: "TV Movie" },
  { genre_id: 53, genre_name: "Thriller" },
  { genre_id: 10752, genre_name: "War" },
  { genre_id: 37, genre_name: "Western" },
];

// Массив для хранения результатов
const genresArray = [];

// Функция для получения данных о жанрах
async function fetchMoviesByGenre(genreId, genreName) {
  try {
    const response = await fetch(
      `https://movies.gila.workers.dev/search/genre?genre_id=${genreId}`
    );

    if (!response.ok) {
      throw new Error(
        `Ошибка сети: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();

    if (!data || typeof data !== "object" || !Array.isArray(data.results)) {
      throw new Error("Некорректный формат данных от API");
    }

    const updatedGenre = {
      ...data,
      genre_id: genreId,
      genre_name: genreName,
    };

    genresArray.push(updatedGenre);
    window.localStorage.setItem("movies", JSON.stringify(genresArray));
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
// Цикл для добавления всех жанров
genresList.forEach(({ genre_id, genre_name }) => {
  fetchMoviesByGenre(genre_id, genre_name);
});

// setTimeout(() => {
//   console.log(genresArray);
// }, 1000);

// Функция для отображения информации о фильмах из genresArray
function displayMovieInfo(genresArray) {
  genresArray.forEach((genreData) => {
    if (genreData.results && Array.isArray(genreData.results)) {
    } else {
      console.warn(`Нет данных о фильмах для жанра ${genreData.genre_name}`);
    }
  });
}
setTimeout(() => {
  displayMovieInfo(genresArray);
}, 3000);

function createMovieMarkup(genresArray) {
  // Основной контейнер для всех жанров
  const genresContainer = document.createElement("div");
  genresContainer.classList.add("genres");

  // Проходим по каждому жанру
  genresArray.forEach((genreData) => {
    if (genreData.results && Array.isArray(genreData.results)) {
      const { genre_id, genre_name } = genreData;

      // Создаем контейнер для каждого жанра
      const genreContainer = document.createElement("div");
      genreContainer.classList.add("genre");
      genreContainer.setAttribute("data-id", genre_id);

      const genreTitle = document.createElement("h2");
      genreTitle.classList.add("genre__title");
      genreTitle.textContent = genre_name;

      // Создаем кнопку Watch All
      const watchAllButton = document.createElement("button");
      watchAllButton.classList.add("genre__watch-all");
      watchAllButton.textContent = "See All >";

      genreContainer.appendChild(genreTitle);
      genreContainer.appendChild(watchAllButton);

      const moviesScrollableContainer = document.createElement("div");
      moviesScrollableContainer.classList.add("genre__scrollable");

      // Берем только первые 10 фильмов из результатов
      const top10Movies = genreData.results.slice(0, 10);

      // Формируем элементы внутри контейнера
      top10Movies.forEach((movie) => {
        const { id, title, poster_path, release_date } = movie;

        const movieMarkup = `
                    <div class="movie" data-id="${id}">
                        <img src="https://image.tmdb.org/t/p/w200${poster_path}" alt="${title}" class="movie__img">
                        <div class="movie__info">
                            <h3 class="movie__title">${title}</h3>
                            <p class="movie__year">${
                              release_date ? release_date.split("-")[0] : "N/A"
                            }</p>
                        </div>
                    </div>
                `;

        moviesScrollableContainer.innerHTML += movieMarkup;
      });

      // Собираем контейнер жанра
      genreContainer.appendChild(moviesScrollableContainer);

      genresContainer.appendChild(genreContainer);
    } else {
      console.warn(`Нет данных о фильмах для жанра ${genreData.genre_name}`);
    }
  });

  const mainContainer = document.querySelector("main");
  if (mainContainer) {
    mainContainer.prepend(genresContainer);
  } else {
    console.warn("Тег <main> не найден на странице.");
  }
}

// Используем setTimeout для того, чтобы дождаться заполнения массива genresArray
setTimeout(() => {
  createMovieMarkup(genresArray);
}, 3000);

//функция клика фильма, жанра и кнопки
// function handleItemClick(evt) {
//   console.log("Клик по элементу:", evt.target); // Проверяем, что клики вообще регистрируются

//   // Проверяем, кликнул ли пользователь на фильм
//   const movieElement = evt.target.closest(".movie");
//   if (movieElement) {
//     console.log("Нашли элемент фильма:", movieElement);
//     showPopUp(evt); // Важно передать `evt`
//     return; // Завершаем выполнение, чтобы дальше код не выполнялся
//   }

//   // Проверяем, кликнул ли пользователь на кнопку "Watch All"
//   const buttonElement = evt.target.closest(".genre__watch-all");
//   if (buttonElement) {
//     const genreId = buttonElement.getAttribute("data-id");
//     if (genreId) {
//       console.log("Переход на страницу жанра:", genreId);
//       window.location.href = `genre.html?id=${genreId}`;
//       return;
//     }
//   }

//   // Проверяем, кликнул ли пользователь на сам блок жанра
//   const genreElement = evt.target.closest(".genre");
//   if (genreElement) {
//     const genreId = genreElement.getAttribute("data-id");
//     if (genreId) {
//       console.log("Переход на страницу жанра (по контейнеру):", genreId);
//       window.location.href = `genre.html?id=${genreId}`;
//     }
//   }
// }

//функция клика фильма, жанра и кнопки
function handleItemClick(evt) {
  // console.log("Клик по элементу:", evt.target); // Проверяем, что клики вообще регистрируются

  if (evt.target.closest(".popup__movie")) {
    //пользователь нажал на что-то в попапе, запускаем функцию хэндлинга клика на элементы попапа
    handlePopupClick(evt);
  } else if (evt.target.closest(".movie")) {
    //пользователь нажал на фильм, открываем попап
    showPopUp(evt);
  } else if (evt.target.closest(".genre")) {
    // Проверяем, кликнул ли пользователь на сам блок жанра или на кнопку в блоке жанра (выделять отдельно кнопку и жанр не надо, тк у них у обоих в closest будет .genre)
    const genreElement = evt.target.closest(".genre");
    const genreId = genreElement.getAttribute("data-id");
    if (genreId) {
      console.log("Переход на страницу жанра (по контейнеру):", genreId);
      window.location.href = `genre.html?id=${genreId}`;
    }
  }
}

const main = document.getElementById("main");
main.addEventListener("DOMContentLoaded", () => handleItemClick(evt));
