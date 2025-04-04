import { createControlBarElem } from "../controlBar/createControlBar.js";
import { basePosterUrl, pathForSearchByTitle } from "../commonVars.js";
import { movieCardClickHandler } from "../movieCardClickHandler.js";
import { searchMedia } from "../header.js";
import { fetchData, fetchNextPageData } from "../fetchData.js";
import { isLastPage, enableDisableBtn } from "./genreSearchCommon.js";
// import {showErMsg} from "./errorMsg.js";

const movie_container = document.getElementById("movie-cards");
const loadMoreButton = document.getElementById("load-more");
const mainTitle = document.querySelector(".main-title");
let title_search;
let currentPage;
let totalPage;
let pathAndSearchParams;

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
  title_search = searchMedia(title);
  pathAndSearchParams = `${pathForSearchByTitle}?title=${title_search}`;

  let movies = await fetchData(`/search/movie/byTitle?title=${title_search}`);

  if (movies == null) {
    // showErrorMsg();
    const errorElem = document.querySelector(".error-msg");
    errorElem.style.display = "block";
    movie_container.style.display = "none";
  }
  if (movies && movies.results.length > 0) {
    mainTitle.textContent = `Results for your search on "${title}":`;
    const filtered_results = filterMoviesProps(movies);
    createCards(filtered_results, movie_container);
    currentPage = movies.page;
    totalPage = movies.total_pages;
    console.log(movies);
    console.log(filtered_results);

    const check = isLastPage(movies);
    console.log(check);
    enableDisableBtn(loadMoreButton, check);
  } else {
    // showErrorMsg()
    const errorElem = document.querySelector(".error-msg");
    errorElem.style.display = "block";
    movie_container.style.display = "none";
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
