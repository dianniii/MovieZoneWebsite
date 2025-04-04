import {fetchData, fetchNextPageData } from "./fetchData.js"
import { createCards} from "./search.js";
import { getMoviesFromStorage } from "./localStorage.js";
import { getIdFromWindowLocation } from "./getCheckUrlData.js";
import { pathForSearchByGenre } from "./commonVars.js";
// import { filterMovieData } from "./moviePage/getMovieData.js";
import {showErrorMsg} from "./moviePage/loadMoviePage.js";


export const movie_container = document.querySelector(".movies-container");
const loadMoreButton = document.getElementById("load-more");
let currentPage;
let totalPage;
let genreId;

export async function mainGenrePageFunction() {
  genreId=Number(getIdFromWindowLocation());
  const movieArr = getMoviesFromStorage("movies");
  let moviesByGenre;
  // loadMoreButton.style.display = "block";
  if(movieArr && movieArr.length >0){
    moviesByGenre=filterMoviesArr()
  }else{
    moviesByGenre = await fetchData(`/search/genre?genre_id=${genreId}`)
  }
if(
  !moviesByGenre || !moviesByGenre.results || moviesByGenre.results.length <1
){
  showErrorMsg();
  return;
}

createCards(moviesByGenre.results, movie_container);
currentPage = moviesByGenre.page;
totalPage = moviesByGenre.total_pages;

const check = isLastPage(moviesByGenre);
enableDisableBtn(loadMoreButton, check);
}

export function filterMoviesArr(movieArr){
  if(movieArr && movieArr.length>0){
    const filteredArr = filterMoviesArr.filter((movie)=>{
      return moviegenre_id === Number(getIdFromWindowLocation());
    });
    return filteredArr[0];
  }
}


function isLastPage(){
  return currentPage < totalPage;
}

function enableDisableBtn (btn, check){
  if (check){
    btn.style.display = "block";
    return;
  }
  btn.style.display = "none";
}

export async function loadMoreHandler(){
  const pathAndSearchParams = `${pathForSearchByGenre}?genre_id=${genreId}`;
  newResults = await fetchNextPageData( pathAndSearchParams, currentPage+1);

  if(!newResults || newResults>0) {
    showErrorMsg();
    return;
  }
 createCards(newResults, movie_container);
currentPage+=1;
enableDisableBtn(loadMoreButton, isLastPage());
}


