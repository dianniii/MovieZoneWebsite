import { fetchData } from "../fetchData.js";
import {
  createCards,
  changeMainTitle,
  isLastPage,
  enableDisableBtn,
} from "./genreSearchCommon.js";
import {
  pathAndSearchParams,
  totalPages,
  movie_container,
  loadMoreButton,
} from "./genreSearchVars.js";
import { getMoviesFromStorage } from "../localStorage.js";
import { getIdFromWindowLocation } from "../getCheckUrlData.js";
import { pathForSearchByGenre } from "../commonVars.js";
import { showErrorMsg } from "../errorMsg.js";

// const movie_container = document.querySelector(".movie-cards");
// const loadMoreButton = document.getElementById("load-more");
let currentPage = 1;
// let totalPage;

export async function mainGenrePageFunction() {
  savePathAndSearchGenre();
  const movieArr = getMoviesFromStorage("movies");

  let moviesByGenre;

  if (movieArr && movieArr.length > 0) {
    moviesByGenre = filterMoviesArr(movieArr);
  } else {
    moviesByGenre = await fetchData(pathAndSearchParams.genre);
  }

  if (
    !moviesByGenre ||
    !moviesByGenre.results ||
    moviesByGenre.results.length < 1
  ) {
    enableDisableBtn(loadMoreButton, false);
    showErrorMsg(movie_container);
    return;
  }

  loadGenreContent(moviesByGenre);
}

function savePathAndSearchGenre() {
  const genreId = Number(getIdFromWindowLocation());
  pathAndSearchParams.genre = `${pathForSearchByGenre}?genre_id=${genreId}`;
}

function filterMoviesArr(movieArr) {
  if (movieArr && movieArr.length > 0) {
    const filteredArr = movieArr.filter((movie) => {
      return movie.genre_id === Number(getIdFromWindowLocation());
    });
    return filteredArr[0];
  }
}

function loadGenreContent(moviesByGenre) {
  changeMainTitle(moviesByGenre.genre_name);
  createCards(moviesByGenre.results, movie_container);
  totalPages.genre = moviesByGenre.total_pages;
  const check = isLastPage(currentPage, totalPages.genre);
  enableDisableBtn(loadMoreButton, check);
}
