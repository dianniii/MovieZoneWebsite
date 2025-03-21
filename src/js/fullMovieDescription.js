const movieContainer = document.getElementById("movie");
let movie_id = "27205";
const domenPartUrl = "https://movies.gila.workers.dev";
const pathForFullMovieDescription = "/search/movie/description?";
const searchParameters = `movie_id=${movie_id}`;

async function fetchMovieObj() {
  try {
    let response = await fetch(
      domenPartUrl + pathForFullMovieDescription + searchParameters
    );

    if (!response.ok) {
      movieContainer.innerHTML =
        "Не удалось загрузить данные фильма. Попробуйте позже.";
      return;
    }

    const movieData = await response.json();
    console.log(movieData);
    console.log(typeof movieData);
    return movieData;
  } catch (error) {
    console.error("Ошибка:", error);
    movieContainer.innerHTML =
      "Произошла ошибка при загрузке данных. Попробуйте позже.";
  }
}

fetchMovieObj();
