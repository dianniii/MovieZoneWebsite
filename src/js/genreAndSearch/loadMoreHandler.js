export function setUpBtnListener(pathAndSearchParams) {
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.addEventListener("click", () => {
    loadMoreHandler(pathAndSearchParams);
  });
}

export async function loadMoreHandler(pathAndSearchParams) {
  // const pathAndSearchParams = `${pathForSearchByGenre}?genre_id=${genreId}`;
  const newResults = await fetchNextPageData(
    pathAndSearchParams,
    currentPage + 1
  );

  if (!newResults || newResults < 1) {
    showErrorMsg(movie_container);
    return;
  }

  createCards(newResults, movie_container);
  currentPage += 1;
  enableDisableBtn(loadMoreButton, isLastPage(currentPage, totalPage));
}
