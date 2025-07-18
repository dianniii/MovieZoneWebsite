import { getPageName } from "../getCheckUrlData";
import { fetchNextPageData } from "../fetchData.js";
import {
  createCards,
  isLastPage,
  toggleBtnState,
} from "./genreSearchCommon.js";
import {
  pathAndSearchParams,
  totalPages,
  movie_container,
  loadMoreButton,
} from "./genreSearchVars.js";

let currentPage = 1;

export function setLoadMoreListener() {
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.addEventListener("click", loadMoreHandler);
}

export async function loadMoreHandler() {
  const pageName = getPageName();
  const newResults = await fetchNextPageData(
    pathAndSearchParams[pageName],
    currentPage + 1
  );

  if (!newResults || newResults < 1) {
    showErrorMsg(movie_container);
    return;
  }

  createCards(newResults, movie_container);
  currentPage += 1;
  toggleBtnState(loadMoreButton, isLastPage(currentPage, totalPages[pageName]));
}