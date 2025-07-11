import {
  domenPartUrl,
  pathForAllGenres,
  pathForSearchByGenre,
  basePosterUrl,
  defaultPosterPath,
} from "../commonVars.js";
import { showErrorMsg } from "../errorMsg.js";
import { createElementWithProps } from "../elementCreation.js";
import { genreClss, movieClss } from "./mainPageVars.js";
import { addMoviesToLocalStorage } from "../localStorage.js";
import {
  addMoviesToSessionStorage,
  isInSessionStorage,
  getFromSessionStorage,
} from "../sessionStorage.js";
import { handleItemClick } from "./itemClickHandler.js";
import { fetchData } from "../fetchData.js";

const genresContainer = document.querySelector(".genres");
const genresArr = [];

export async function loadMainPage() {
  let isStored = isInSessionStorage("movies");
  if (isStored) {
    loadMoviesFromStorage();
  } else {
    await loadMoviesFromServer();
  }
  const main = document.getElementById("main");
  main.addEventListener("click", handleItemClick);
}

function loadMoviesFromStorage() {
  const genreMoviesArr = getFromSessionStorage("movies");
  genreMoviesArr.forEach((genreMovies) => renderGenre(genreMovies));
}

async function loadMoviesFromServer() {
  const genresObj = await fetchData(`${pathForAllGenres}`);
  const genres = genresObj.genres;

  for (let genreObj of genres) {
    const genreMovies = await fetchData(
      `${pathForSearchByGenre}?genre_id=${genreObj.id}`
    );
    updateGenreObj(genreMovies, genreObj.id, genreObj.name);
    renderGenre(genreMovies);
    genresArr.push(genreMovies);
  }

  addMoviesToLocalStorage(genresArr);
  addMoviesToSessionStorage(genresArr);
}


function updateGenreObj(genreObj, genre_id, genre_name) {
  genreObj.genre_id = genre_id;
  genreObj.genre_name = genre_name;
}

function renderGenre(genreMovies) {
  if (!genreMovies || !genreMovies.results || genreMovies.results.length < 1) {
    showErrorMsg(genresContainer);
    return;
  }
  const genreElem = createGenreElem(
    genreMovies.genre_id,
    genreMovies.genre_name
  );
  const moviesContainer = createMoviesElem(genreMovies.results);
  genreElem.append(moviesContainer);
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
  const btn = createElementWithProps("button", genreClss.btn, false, "See all");
  genreElem.append(title, btn);
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
