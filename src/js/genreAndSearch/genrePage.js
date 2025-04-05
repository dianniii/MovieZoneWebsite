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
import {
  pathForAllGenres,
  pathForSearchByGenre,
  websiteNameToAdd,
} from "../commonVars.js";
import { showErrorMsg } from "../errorMsg.js";

let currentPage = 1;
let genreId;

export async function mainGenrePageFunction() {
  savePathAndSearchGenre();
  const movieArr = getMoviesFromStorage("movies");

  let moviesByGenre;

  if (movieArr && movieArr.length > 0) {
    moviesByGenre = filterMoviesArr(movieArr);
  } else {
    moviesByGenre = await fetchData(pathAndSearchParams.genre);
    changeDocTitle();
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
  genreId = Number(getIdFromWindowLocation());
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

async function changeDocTitle() {
  const genreName = await getGenreName();
  if (genreName) {
    document.title = `${genreName}${websiteNameToAdd}`;
  }
}

async function getGenreName() {
  const genres = await fetchData(pathForAllGenres);
  const genresArr = genres.genres;
  const genre = genresArr.find((genre) => genre.id === genreId);
  return genre.name;
}

function loadGenreContent(moviesByGenre) {
  changeMainTitle(moviesByGenre.genre_name);
  createCards(moviesByGenre.results, movie_container);
  totalPages.genre = moviesByGenre.total_pages;
  const check = isLastPage(currentPage, totalPages.genre);
  enableDisableBtn(loadMoreButton, check);
}
