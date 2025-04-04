import { showPopUp, handlePopupClick } from "../popup";
import { moveToPage } from "../moveToPage";
import {
  domenPartUrl,
  pathForAllGenres,
  pathForSearchByGenre,
  basePosterUrl,
  defaultPosterPath,
} from "../commonVars";
import { showErrorMsg } from "../errorMsg";
import { createElementWithProps } from "../elementCreation";
import { genreClss, movieClss } from "./mainPageVars";
import { addMoviesToLocalStorage } from "../localStorage";
import { addMoviesToSessionStorage } from "../sessionStorage";

const erContainer = document.querySelector(".error-msg");
const genresContainer = document.querySelector(".genres");
const genresArr = [];

async function getGenres() {
  try {
    const response = await fetch(`${domenPartUrl}${pathForAllGenres}`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    showErrorMsg(erContainer, genresContainer);
  }
}

async function getMoviesByGenre(genre_id) {
  try {
    const response = await fetch(
      `${domenPartUrl}${pathForSearchByGenre}?genre_id=${genre_id}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    showErrorMsg(erContainer, genresContainer);
  }
}

function updateGenreObj(genreObj, genre_id, genre_name) {
  genreObj.genre_id = genre_id;
  genreObj.genre_id = genre_name;
  return genreObj;
}

export async function loadMainPage() {
  const genresObj = await getGenres();
  const genresArray = genresObj.genres;
  let isStored = false;

  for (let genreObj of genresArray) {
    const genreMovies = await getMoviesByGenre(genreObj.id);
    const updated = updateGenreObj(genreMovies, genreObj.id, genreObj.name);
    renderGenre(updated);
    if (!isStored) {
      genresArr.push(updated);
    }
  }
  addMoviesToLocalStorage(genresArr);
  addMoviesToSessionStorage(genresArr);
}

function renderGenre(genreMovies) {
  if (!genreMovies || !genreMovies.results || genreMovies.results.length < 1) {
    showErrorMsg(erContainer, genresContainer);
    return;
  }
  const genreElem = createGenreElem(
    genreMovies.genre_id,
    genreMovies.genre_name
  );
  //for every movie create card
  const moviesContainer = createMoviesElem(genreMovies.results);
  genreElem.append(moviesContainer);
  // append genre container to genres
  genresContainer.append(genreElem);
}

function createGenreElem(genreId, genreName) {
  const genreElem = createElementWithProps("div", genreClss.genre);
  genreElem.dataset.id = genreId;
  const title = createElementWithProps(
    "h2",
    genreClss.genreTitle,
    false,
    genreName
  );
  genreElem.append(title);
  return genreElem;
}

function createMoviesElem(moviesArr) {
  const tenMovies = moviesArr.slice(0, 10);
  const moviesContainer = createElementWithProps("div", genreClss.scroll);
  tenMovies.forEach((movie) => {
    const markup = createMovieMarkup(movie);
    moviesContainer.innerHTML += markup;
  });
  return moviesContainer;
}

function createMovieMarkup(movieObj) {
  const { id, title, poster_path, release_date } = movieObj;
  let yearPar = "";
  if (release_date) {
    yearPar = `<p class="${movieClss.year}">${release_date.slice(0, 4)}</p>`;
  }
  const posterSrc = poster_path
    ? `${basePosterUrl}${poster_path}`
    : defaultPosterPath;
  const movieMarkup = `
                    <div class="${movieClss.movie}" data-id="${id}">
                        <img src="${posterSrc}" alt="${title}" class="${movieClss.img}">
                        <div class="${movieClss.info}">
                            <h3 class="${movieClss.title}">${title}</h3>
                            ${yearPar}
                        </div>
                    </div>
                `;
  return movieMarkup;
}

document.addEventListener("DOMContentLoaded", loadMainPage);
