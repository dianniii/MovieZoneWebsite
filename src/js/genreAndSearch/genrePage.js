import { fetchData, fetchNextPageData } from "../fetchData.js";
import {
  createCards,
  changeTitle,
  isLastPage,
  enableDisableBtn,
} from "./genreSearchCommon.js";
import { getMoviesFromStorage } from "../localStorage.js";
import { getIdFromWindowLocation } from "../getCheckUrlData.js";
import { pathForSearchByGenre } from "../commonVars.js";
// import { filterMovieData } from "./moviePage/getMovieData.js";
import { showErrorMsg } from "../errorMsg.js";

export const movie_container = document.querySelector(".movies-container");
const loadMoreButton = document.getElementById("load-more");
let currentPage;
let totalPage;
let genreId;
let pathAndSearchParams;

export async function mainGenrePageFunction() {
  createSearchParamVar();
  const movieArr = getMoviesFromStorage("movies");

  let moviesByGenre;

  if (movieArr && movieArr.length > 0) {
    moviesByGenre = filterMoviesArr(movieArr);
  } else {
    moviesByGenre = await fetchData(`/search/genre?genre_id=${genreId}`);
  }

  if (
    !moviesByGenre ||
    !moviesByGenre.results ||
    moviesByGenre.results.length < 1
  ) {
    showErrorMsg(document.querySelector(".error-msg"), movie_container);
    return;
  }

  loadGenreContent(moviesByGenre);
}

function createSearchParamVar() {
  genreId = Number(getIdFromWindowLocation());
  pathAndSearchParams = `${pathForSearchByGenre}?genre_id=${genreId}`;
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
  changeTitle(moviesByGenre.genre_name);
  createCards(moviesByGenre.results, movie_container);
  currentPage = moviesByGenre.page;
  totalPage = moviesByGenre.total_pages;

  const check = isLastPage(currentPage, totalPage);
  enableDisableBtn(loadMoreButton, check);
}

export function setUpBtnListener() {
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.addEventListener("click", loadMoreHandler);
}

export async function loadMoreHandler() {
  const pathAndSearchParams = `${pathForSearchByGenre}?genre_id=${genreId}`;
  const newResults = await fetchNextPageData(
    pathAndSearchParams,
    currentPage + 1
  );

  if (!newResults || newResults < 1) {
    showErrorMsg(document.querySelector(".error-msg"), movie_container);
    return;
  }

  createCards(newResults, movie_container);
  currentPage += 1;
  enableDisableBtn(loadMoreButton, isLastPage(currentPage, totalPage));
}
