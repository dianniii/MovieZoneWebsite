import { createControlBarElem } from "./controlBar/createControlBar";
import { controlBarIconPaths } from "./controlBar/controlBarVars";
import { domenPartUrl, basePosterUrl } from "./commonVars";

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

export async function handleMovieClick(evt) {
  // Проверяем, что клик произошёл именно по элементу с классом "movie" или его потомку
  const movieElem = evt.target.closest(".movie");
  if (!movieElem) {
    // Если клик произошёл вне элемента .movie, выводим сообщение в консоль и выходим
    console.warn("Клик вне области фильма. Popup не вызывается.");
    return;
  }

  // Извлекаем ID фильма из data-атрибута
  const movie_id = movieElem.getAttribute("data-id");

  try {
    // Запрашиваем данные о фильме по ID через нашу функцию fetchMovieDataById
    const movieData = await fetchMovieDataById(movie_id);

    // Заполняем левую колонку popup: задаём src для постера
    document.querySelector(".movie-card__poster").src =
    basePosterUrl + movieData.poster_path;
    
    // Заполняем правую колонку:
    // Название фильма
    document.querySelector(".movie-card__title").textContent =
      movieData.title || "Нет названия";
    // Год выпуска: берём первые 4 символа из release_date (например, "2009" из "2009-12-15")
    document.querySelector(".movie-card__year").textContent = (movieData.release_date ? movieData.release_date.slice(0, 4) : "не указан");
    // Ссылка на страницу фильма на TMDB (используем movie_id для формирования URL)
    document.querySelector(".movie-card__tmdb-link").href =
      "https://www.themoviedb.org/movie/" + movie_id;
    // Краткое описание фильма
    document.querySelector(".movie-card__overview").textContent =
      movieData.overview || "Описание недоступно";

    const controlBarContainer = document.querySelector(".control-bar__container");
    // Очищаем контейнер перед добавлением новой панели
    controlBarContainer.innerHTML = "";
    // делаем новый 
    const controlBar = createControlBarElem(movieData);
    controlBarContainer.append(controlBar);

    // Отображаем popup, добавляя класс "active" (в CSS это делает popup видимым)
    document.getElementById("movie-popup").classList.add("active");
  } catch (error) {
    // Если произошла ошибка при запросе или обработке данных, выводим сообщение в консоль
    console.error("Error fetching data:", error);
    // Можно здесь вывести сообщение пользователю (например, через alert)
    alert("Failed to load movie information");
  }
} 

// Обработчик клика по элементу с id "movie"
document.getElementById("movie").addEventListener("click", handleMovieClick);

// Обработчик клика по кнопке закрытия popup
document.getElementById("close-popup-btn").addEventListener("click", () => {
  document.getElementById("movie-popup").classList.remove("active");
});