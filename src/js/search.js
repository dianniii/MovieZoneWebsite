import { classesControlBar } from "./controlBar/controlBarVars";
import { createControlBarElem } from "./controlBar/createControlBar";
import { basePosterUrl, domenPartUrl, pathForAllGenres, pathForSearchByGenre, pathForFullMovieDescription, pathForSearchByTitle, pathForSearchById, pathForPopularMovies } from "./commonVars";
import { movieCardClickHandler } from "./movieCardClickHandler";
import { searchMedia } from "./header";


const movie_container = document.getElementById("movie-cards");

function searchTitle() {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  return title;
}

export async function fetchData(pathParam){
   try {

      let response = await fetch(`${domenPartUrl}${pathParam}`);
    
      if (!response.ok) {
        console.log("Cannot fetch data form the server");
        throw new Error("HTTP Error: " + response.status);
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Error while loading movie information", error);
      return null;
    }
  }

function filterMoviesProps(data) {
  const propsArray = [];
  data.results.forEach((item) => {
    propsArray.push({
      id: item.id,
      title: item.title,
      poster_path: item.poster_path,
      release_date: item.release_date,
      overview: item.overview,
    });
  });

  return propsArray;
}

export async function mainSearchFunction() {
  
    const title = searchTitle();
    if (!title) return;
    const title_search = searchMedia(title);
    let movies = await fetchData(`/search/movie/byTitle?title=${title_search}`);
    if(movies == null){
        displayErrorMsg(error);
    }

    if (movies && movies.results.length > 0) {
      const filtered_results = filterMoviesProps(movies);
      createCards(filtered_results, movie_container);
    } else {
      movie_container.classList.add("errorMessage");
      movie_container.textContent = "No results found 😔";
    }
  } 

  function displayErrorMsg(error){
    movie_container.classList.add("errorMessage");
    movie_container.textContent = `An error occured: ${error.message} 😔 Please try again later`;
  }

export function createCards(arrayOfObjs, container) {
  // container.innerHTML = "";
  if (Array.isArray(arrayOfObjs)) {
    arrayOfObjs.forEach((movie) => {
      const card = createCard(movie);
      container.appendChild(card);
    });
  }
}

export function createCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");
  movieCard.setAttribute("data-id", movie.id);

  //вот тут была ошибка в пути к дефолтной картинке вместо постера, путь должен быть относительно html а не js
  const posterPath = movie.poster_path
    ? `${basePosterUrl}${movie.poster_path}`
    : "./src/assets/images/no-Image-Placeholder.svg";

  movieCard.innerHTML = ` <div class="movie-card__poster-container"> <img class="movie-card__poster" src="${posterPath}" alt ="${
    movie.title
  } Poster"> </div>
    <div class="movie-card__text-container"> <h3 class="movie-card__movieTitle">${
      movie.title
    }</h3>
    <p>${movie.release_date ? movie.release_date.slice(0, 4) : ""}</p>
    <p class="movie-card__movie-info">${movie.overview}</p> </div>
    `;
  movieCard
    .querySelector(".movie-card__text-container")
    .append(createControlBarElem(movie));
  // вешаю слушатель события на созданную карточку
  movieCard.addEventListener("click", (evt) => movieCardClickHandler(evt));
  return movieCard;
}

mainSearchFunction();
