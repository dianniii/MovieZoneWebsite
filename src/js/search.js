import { classesControlBar } from "./controlBar/controlBarVars";
import { createControlBarElem } from "./controlBar/createControlBar";
import { basePosterUrl } from "./commonVars";
import { movieCardClickHandler } from "./movieCardClickHandler";
import { searchMedia } from "./header";
import {fetchData, fetchNextPageData } from "./fetchData.js"
import {showErrorMsg} from "./moviePage/loadMoviePage.js"


const movie_container = document.getElementById("movie-cards");

function searchTitle() {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  return title;
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
        showErrorMsg();
    }

    if (movies && movies.results.length > 0) {
      const filtered_results = filterMoviesProps(movies);
      createCards(filtered_results, movie_container);
    } else {
      showErrorMsg()
      // movie_container.classList.add("errorMessage");
      // movie_container.textContent = "No results found 😔";
    }
  } 

  // function displayErrorMsg(error){
  //   movie_container.classList.add("errorMessage");
  //   movie_container.textContent = `An error occured 😔 Please try again later`;
  // }

export function createCards(arrayOfObjs, container) {
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
