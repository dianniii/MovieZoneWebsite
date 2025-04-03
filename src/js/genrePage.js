export const movie_container = document.querySelector(".movies-container");
const loadMoreButton = document.getElementById("load-more");
let currentPage;
export let moviesByGenre;
let totalPage;
let moviesArr;
let genreId;
let isLastPage;

import { createCards, createCard, fetchData } from "./search.js";
// import { getLocalStorageData } from "./localStorage.js"

export function getIdFromWindowLocation() {
  const urlParams = new URLSearchParams(window.location.search);
genreId = urlParams.get("id");
return genreId;
}

export function getLocalStorageData(propertyName) {
  moviesArr = JSON.parse(window.localStorage.getItem(propertyName));
  // if (!moviesArr) {
  //   movie_container.textContent =
  //     "Oops! Something went wrong. Please try again ";
  //   return;
  // }
  return moviesArr;
}


export function filterMoviesArr() {
  getLocalStorageData("movies");
  const filteredArr = moviesArr.filter((movie) => {
    return movie.genre_id === Number(getIdFromWindowLocation());
  });
  console.log(filteredArr[0]);
  return filteredArr[0];
}

export function mainGenrePageFunction() {
  moviesByGenre = filterMoviesArr();
  // if(!filterMoviesArr()){
  //   moviesByGenre = fetchData(`/search/genre/genre?genre_id=${genreId}`);
  // }
  // // else{ movie_container.textContent =
  // //       `Oops! Something went wrong. Please try again.`;
  // //     return;}

  if (moviesByGenre.results && moviesByGenre.results.length > 0) {
    createCards(moviesByGenre.results, movie_container);
    currentPage = moviesByGenre.page;
    totalPage = moviesByGenre.total_pages;
    
  } else {
    movie_container.textContent =
      "There are no available results. Please choose another genre";
  }

  checkPages(moviesByGenre)
  if(!isLastPage){
    loadMoreButton.style.display = "block";
  }
  else{loadMoreButton.style.display = "none";
  }

}

function checkPages(recievedData){

  if(recievedData.page < recievedData.total_pages){
    isLastPage=false;
  } 
  else isLastPage=true;
  return isLastPage;
}

export function fetchNextPageData(recievedData){
  recievedData.page = currentPage;
  let newData = recievedData;
 
  if(!recievedData){
    newData = fetchData(`/search/genre/genre?genre_id=${genreId}&page=${currentPage}`);
  }
  console.log(newData);
  return newData.results;
}

function addCards(data, container){
  let cards = createCards(data, container);
  container.append(cards);
}

function loadMoreHandler(data, container){
  currentPage++;
  let newResults = fetchNextPageData(data);
  addCards(newResults, container);
  if(!checkPages(data)){
    loadMoreButton.style.display = "none";
  }
}

export function loadMoreEventListener(data, container){
loadMoreButton.addEventListener("click",loadMoreHandler(data, container));
}

