const movie_container = document.querySelector(".movies-container");
const loadMoreButton = document.getElementById("load-more");
let currentPage;
export let moviesByGenre;
let totalPage;
let moviesArr;
let genreId

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
  return filteredArr[0];
}

export function mainGenrePageFunction() {
  moviesByGenre = filterMoviesArr();
  if(!filterMoviesArr()){
    moviesByGenre = fetchData(`/search/genre/genre?genre_id=${genreId}`);
  }
  else{ movie_container.textContent =
        "Oops! Something went wrong. Please try again ";
      return;}

  if (moviesByGenre.results && moviesByGenre.results.length > 0) {
    createCards(moviesByGenre.results, movie_container);
    currentPage = moviesByGenre.page;
    totalPage = moviesByGenre.total_pages;
    
  } else {
    movie_container.textContent =
      "There are no available results. Please choose another genre";
  }

  checkPages(moviesByGenre)
  if(isLastPage){
    loadMoreButton.style.display = "none";
  }
  else{loadMoreButton.style.display = "block";
    return;
  }
}

function checkPages(recievedData){
  let isLastPage;
  if(recievedData.page < recievedData.total_pages){
    isLastPage=false;
  } 
  else isLastPage=true;
  return isLastPage;
}

export function fetchNextPageData(recievedData){
  let newData = recievedData.page(currentPage);
 
  if(!recievedData){
    newData = fetchData(`/search/genre/genre?genre_id=${genreId}&page=${currentPage}`);
  }
  return newData.results;
}

function addCards(data, container){
  let cards = createCards(fetchNextPageData(data), container);
  container.append(cards);
}

function loadMoreHandler(data, container){
  currentPage++;
  let newResults = fetchNextPageData(data);
  addCards(newResults, container);
  checkPages(data)
}

// export function loadMoreAddHide(recievedData, containerParam) {
  
//   if (recievedData.page < recievedData.total_pages) {
//     loadMoreButton.style.display = "block";

//     loadMoreButton.addEventListener("click", loadMoreHandler);
//   }else {
//     loadMoreButton.style.display = "none";
//   }

// function loadMoreHandler(){
//   currentPage++;
//   recievedData.page = currentPage;
//         console.log(recievedData);
//         const container = containerParam;
//         console.log("Received data:", recievedData);
//         console.log("Container:", container);
//         if(container){
//           console.log("container before creating card:", container);
//           // const moreElements= 
//           container.append(createCards(recievedData.results, container));
//           // container.innerHTML += moreElements;
       
//           if (currentPage >= recievedData.total_pages) {
//             loadMoreButton.style.display = "none";
//           }
//         }
//         else{
//           console.error("Container us undefined when trying to create cards");
          
//         }
// }
// }

// OLD FUNCTION
// export function loadMoreAddHide(results) {
//   if (results.page < results.total_pages) {
//     loadMoreButton.style.display = "block";
//     loadMoreButton.addEventListener(
//       "click",
//       () => {
//         currentPage++;
//         mainGenrePageFunction(currentPage);
//         if (currentPage === results.total_pages) {
//           loadMoreButton.style.display = "none";
//         }
//       },
//       { once: true }
//     );
//   } else {
//     loadMoreButton.style.display = "none";
//   }
// }



// document.addEventListener("DOMContentLoaded", () => {
//   mainGenrePageFunction();
//   loadMoreAddHide(moviesByGenre, movie_container);
// });
