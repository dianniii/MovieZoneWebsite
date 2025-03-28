//запрос на добавление жанров 
async function getGenres() {
    try {
        const response = await fetch("https://movies.gila.workers.dev/genres");
        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`);
        }
        const data = await response.json();
        console.log("Полученные данные:", data);

        const genresArray = data.genres; 

        if (!Array.isArray(genresArray)) {
            throw new Error("Данные жанров не являются массивом");
        }
        const container = document.getElementById('genres');
        container.innerHTML = ''; // Очистка контейнера перед вставкой новых данных

        // genresArray.forEach(genre => {
        //     const genreHtml = `
        //         <div class="genre" data-id="${genre.id}">
        //              <h2 class="genre__title">${genre.name}</h2>
        //          </div>`;
        //      container.innerHTML += genreHtml;
        //  });
    } catch (error) {
        console.error("Ошибка:", error);
        // Выводим сообщение об ошибке в интерфейс пользователя, если есть необходимость
        const errorContainer = document.getElementById('error-message');
        if (errorContainer) {
            errorContainer.textContent = `Ошибка при загрузке жанров: ${error.message}`;
        }
    }
}
document.addEventListener('DOMContentLoaded', getGenres);


//запрос на жанр


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
    { genre_id: 37, genre_name: "Western" }
];

  // Массив для хранения результатов
  const genresArray = [];
  
  // Функция для получения данных о жанрах
async function fetchMoviesByGenre(genreId, genreName) {
    try {
    const response = await fetch(`https://movies.gila.workers.dev/search/genre?genre_id=${genreId}`);
    
    if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
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

    } catch (error) {
    console.error("Произошла ошибка:", error.message);
    }
}
  // Цикл для добавления всех жанров
genresList.forEach(({ genre_id, genre_name }) => {
    fetchMoviesByGenre(genre_id, genre_name);
});
  
  // Добавьте задержку для обеспечения выполнения всех асинхронных вызовов
setTimeout(() => {
    console.log(genresArray);
}, 3000);


// Функция для отображения информации о фильмах из genresArray
function displayMovieInfo(genresArray) {
    genresArray.forEach((genreData) => {
      if (genreData.results && Array.isArray(genreData.results)) {
        console.log(`Жанр: ${genreData.genre_name} (ID: ${genreData.genre_id})`);
  
        // Перебираем каждый фильм в result данного жанра
        genreData.results.forEach((movie) => {
          const { title, poster_path, release_date } = movie;
  
          console.log(`  - Название: ${title}`);
          console.log(`    Постер: https://image.tmdb.org/t/p/w200${poster_path}`);
          console.log(`    Дата выхода: ${release_date}`);
        });
      } else {
        console.warn(`Нет данных о фильмах для жанра ${genreData.genre_name}`);
      }
    });
  }
  
  // Используем setTimeout для того, чтобы дождаться заполнения массива genresArray
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
        genreContainer.setAttribute("id", "genreContainer");
        genreContainer.setAttribute("data-id", genre_id);
  
        // Добавляем название жанра
        const genreTitle = document.createElement("h2");
        genreTitle.classList.add("genre__title");
        genreTitle.textContent = genre_name;
  
        // Создаем контейнер с горизонтальной прокруткой для фильмов
        const moviesScrollableContainer = document.createElement("div");
        moviesScrollableContainer.classList.add("movies__scrollable");
  
        // Берем только первые 10 фильмов из результатов
        const top10Movies = genreData.results.slice(0, 10);
  
        // Формируем элементы внутри контейнера
        top10Movies.forEach((movie) => {
          const { id, title, poster_path, release_date } = movie;
  
          // Формируем HTML-разметку для каждого фильма
          const movieMarkup = `
            <div class="movie" data-id="${id}">
                <img src="https://image.tmdb.org/t/p/w200${poster_path}" alt="${title}" class="movie__img">
                <div class="movie__info">
                    <h3 class="movie__title">${title}</h3>
                    <p class="movie__year">${release_date ? release_date.split("-")[0] : "N/A"}</p>
                </div>
            </div>
          `;
  
          // Добавляем разметку фильма в контейнер с прокруткой
          moviesScrollableContainer.innerHTML += movieMarkup;
        });
  
        // Собираем контейнер жанра
        genreContainer.appendChild(genreTitle); // Добавляем название жанра
        genreContainer.appendChild(moviesScrollableContainer); // Добавляем контейнер с прокруткой
  
        // Добавляем контейнер жанра в общий контейнер
        genresContainer.appendChild(genreContainer);
      } else {
        console.warn(`Нет данных о фильмах для жанра ${genreData.genre_name}`);
      }
    });
  
    // Находим контейнер <main> и добавляем в начало нашего HTML
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
  