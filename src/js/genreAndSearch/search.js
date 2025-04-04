import { pathForSearchByTitle } from "../commonVars.js";
import { getTitleName } from "../getCheckUrlData.js";
import { fetchData } from "../fetchData.js";
import { showErrorMsg } from "../errorMsg.js";
import { searchMedia } from "../header.js";
import {
  createCards,
  isLastPage,
  enableDisableBtn,
  changeMainTitle,
} from "./genreSearchCommon.js";
import {
  pathAndSearchParams,
  totalPages,
  movie_container,
  loadMoreButton,
} from "./genreSearchVars.js";

let title;
let currentPage = 1;

export async function mainSearchFunction() {
  savePathAndSearchSearch();

  if (!pathAndSearchParams.search) {
    showErrorMsg(movie_container);
    return;
  }

  let movies = await fetchData(pathAndSearchParams.search);

  if (!movies || movies.results.length < 1) {
    showErrorMsg(movie_container, "No movies found");
    return;
  }

  loadSearchContent(movies);
}

function savePathAndSearchSearch() {
  title = getTitleName();
  if (!title) return;
  const title_search = searchMedia(title);
  pathAndSearchParams.search = `${pathForSearchByTitle}?title=${title_search}`;
}

function loadSearchContent(movies) {
  changeMainTitle(`Search results for "${title}":`);

  const filtered_results = filterMoviesProps(movies);
  createCards(filtered_results, movie_container);

  totalPages.search = movies.total_pages;

  enableDisableBtn(loadMoreButton, isLastPage(currentPage, totalPages.search));
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
