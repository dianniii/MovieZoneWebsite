const movie_container=document.querySelector('.movies-container');
const loadMoreButton = document.getElementById('load-more'); 
let currentPage = 1;
export let moviesByGenre;
let moviesArr;

import { createCards, createCard } from "./search.js";

export function getIdFromWindowLocation(){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

export function getLocalStorageData(jsonName){
moviesArr = JSON.parse(window.localStorage.getItem(jsonName));
if(!moviesArr){
  movie_container.textContent ="Oops! Something went wrong. Please try again "
  return;
};
return moviesArr;
}

export function filterMoviesArr(){
  getLocalStorageData('movies');
  const filteredArr = moviesArr.filter((movie) =>{
   return movie.genre_id === Number(getIdFromWindowLocation());
});
return filteredArr[0];
}

export function mainGenrePageFunction(){
  moviesByGenre = filterMoviesArr();
  movie_container.innerHTML='';

  if(moviesByGenre.results && moviesByGenre.results.length >0){
      createCards(moviesByGenre.results, movie_container);
       movie_container.addEventListener("click", (evt) => { 
                  
              const controlBar = evt.target.closest(
                  "." + classesControlBar.controlBar
              );
              const clickOnbtns =
                  controlBar &&
                  controlBar.classList.contains(classesControlBar.controlBar);
              if (!clickOnbtns) {
                  const movieElem = evt.target.closest(".movie-card");
                  if (movieElem) { 
                      const movie_id = movieElem.getAttribute("data-id");
                      window.location.href = `movie.html?id=${movie_id}`;
                  }
              }
              });
  }else{
     movie_container.textContent="There are no available results. Please choose another genre";
  }


} 


export function loadMoreAddHide(results){
    if (results.page < results.total_pages) {
        loadMoreButton.style.display = 'block'; 
        loadMoreButton.addEventListener('click', () => {
            currentPage++;
            mainGenrePageFunction(currentPage);
            if (currentPage === results.total_pages) {
                loadMoreButton.style.display = 'none'; 
            }
        },{once: true});
    } else {
        loadMoreButton.style.display = 'none';
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    mainGenrePageFunction();
    loadMoreAddHide(moviesByGenre);
})