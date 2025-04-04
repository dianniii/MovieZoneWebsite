// genrePage.js (main.js смотри ниже)

// Не знаю как в js, но обычно все импорты указываются в самом начале файла
import {fetchData } from "./fetchData.js"
import { createCards } from "./search.js";
import { getMoviesFromStorage } from "./localStorage.js"; //импортируем уже написанную функцию
import { getIdFromWindowLocation } from "./getCheckUrlData.js"; //импортируем уже написанную функцию
import { pathForSearchByGenre } from "./commonVars.js";

export const movie_container = document.querySelector(".movies-container");
const loadMoreButton = document.getElementById("load-more");
let currentPage;
// export let moviesByGenre; // не вижу смысла делать ее глобальной
let totalPage;
let genreId;
// let isLastPage;

export async function mainGenrePageFunction() {
  genreId = Number(getIdFromWindowLocation()); //вытащили id
  const movieArr = getMoviesFromStorage("movies"); //посмотрели local storage

  let moviesByGenre; //объявили переменную куда будем сохранять
  //проверяем что пришло из local storage
  if (movieArr && movieArr.length > 0) {
    // если все ок, фильтруем
    moviesByGenre = filterMoviesArr();
  } else {
    // если нет, фетчим
    moviesByGenre = await fetchData(`/search/genre?genre_id=${genreId}`);
  }
  //проверяем пришедшие данные
  //если все плохо, показать error msg
  if (
    !moviesByGenre ||
    !moviesByGenre.results ||
    moviesByGenre.results.length < 1
  ) {
    //вынести в отдельную функцию:
    movie_container.textContent =
      "There are no available results. Please choose another genre";
    return;
  }
  // если дошли до сюда, то все ок
  // создаем карточки
  createCards(moviesByGenre.results, movie_container);
  // записываем current page, total page
  currentPage = moviesByGenre.page;
  totalPage = moviesByGenre.total_pages;
  // проверяем последняя ли страница
  const check = isLastPage(moviesByGenre);
  // и отправляем результат в функцию, которая выключит или включит кнопку
  enableDisableBtn(loadMoreButton, check);
}

export function filterMoviesArr(moviesArr) {
  if (moviesArr && moviesArr.length > 0) {
    const filteredArr = moviesArr.filter((movie) => {
      return movie.genre_id === Number(getIdFromWindowLocation());
    });
    return filteredArr[0];
  }
}

function isLastPage() {
  // if (recievedData.page < recievedData.total_pages) {
  //   isLastPage = false;
  // } else isLastPage = true;
  // return isLastPage;
  return currentPage < totalPage;
}

function enableDisableBtn(btn, check) {
  if (check) {
    btn.style.display = "block";
    return;
  }
  btn.style.display = "none";
}

// ЭТА Ф-ИЯ УЖЕ ЕСТЬ В getCheckUrlData.js И Я ЕЕ ИМПОРТИРОВАЛА (СМ НАЧАЛО ДОКУМЕНТА)
// export function getIdFromWindowLocation() {
//   const urlParams = new URLSearchParams(window.location.search);
//   genreId = urlParams.get("id");
//   console.log(typeof genreId);
//   return genreId;
// }

// ЭТА Ф-ИЯ УЖЕ ЕСТЬ В localStorage.js И Я ЕЕ ИМПОРТИРОВАЛА (СМ НАЧАЛО ДОКУМЕНТА)
// export function getLocalStorageData(propertyName) {
//    moviesArr = JSON.parse(window.localStorage.getItem(propertyName));
//    if (!moviesArr) {
//      movie_container.textContent =
//        "Oops! Something went wrong. Please try again ";
//      return;
//    }
//      return JSON.parse(window.localStorage.getItem(propertyName));
// }

export async function loadMoreHandler() {
  // создаем переменную с частью ссылки, которая нужна для фетча
  const pathAndSearchParams = `${pathForSearchByGenre}?genre_id=${genreId}`;
  // фетчим
  const newResults = await fetchNextPageData(
    pathAndSearchParams,
    currentPage + 1
  );
  // проверяем все ли ок
  if (!newResults || newResults > 0) {
    //тут должен быть вызов show Error Message
    return;
  }
  // если дошли до сюда, то все ок
  // создаем карточки
  createCards(newResults, movie_container);
  // обновляем current page
  currentPage += 1;
  enableDisableBtn(loadMoreButton, isLastPage());
}

//теперь fetchNextPageData можно использовать в search тоже
// ее бы хорошо вместе с fetchData вынести в отдельный документ
export async function fetchNextPageData(pathAndSearchParams, pageNum) {
  const newData = await fetchData(`${pathAndSearchParams}&page=${pageNum}`);
  return newData.results;
}



// import {fetchData, fetchNextPageData } from "./fetchData.js"
// import { createCards} from "./search.js";
// import { getMoviesFromStorage } from "./localStorage.js";
// import { getIdFromWindowLocation } from "./getCheckUrlData.js";
// import { pathForSearchByGenre } from "./commonVars.js";
// // import { filterMovieData } from "./moviePage/getMovieData.js";
// // import {showErrorMsg} from "./moviePage/loadMoviePage.js";


// export const movie_container = document.querySelector(".movies-container");
// const mainTitle = document.querySelector(".main-title");
// const loadMoreButton = document.getElementById("load-more");
// let currentPage;
// let totalPage;
// let genreId;

// export async function mainGenrePageFunction() {
//   genreId=Number(getIdFromWindowLocation());
//   const movieArr = getMoviesFromStorage("movies");
//   let moviesByGenre;
//   // loadMoreButton.style.display = "block";
//   if(movieArr && movieArr.length >0){
//     moviesByGenre = filterMoviesArr(movieArr);
//   }else{
//     moviesByGenre = await fetchData(`/search/genre?genre_id=${genreId}`)
//   }
// if(
//   !moviesByGenre || !moviesByGenre.results || moviesByGenre.results.length <1
// ){
//   // showErrorMsg();
//   const errorElem = document.querySelector(".error-msg");
//   errorElem.style.display = "block";
//   movie_container.style.display = "none";
//   console.log(movieArr);
//   console.log(moviesByGenre);
//   return;
// }

// createCards(moviesByGenre.results, movie_container);
// currentPage = moviesByGenre.page;
// totalPage = moviesByGenre.total_pages;

// const check = isLastPage(moviesByGenre);
// enableDisableBtn(loadMoreButton, check);
// }

// export function filterMoviesArr(movieArr){
//   if(movieArr && movieArr.length>0) {
//     const filteredArr = movieArr.filter((movie)=>{
//       return movie.genre_id === Number(getIdFromWindowLocation());
//     });
//     return filteredArr[0];
//   }
// }


// function isLastPage(){
//   return currentPage < totalPage;
// }

// function enableDisableBtn (btn, check){
//   if (check){
//     btn.style.display = "block";
//     return;
//   }
//   btn.style.display = "none";
// }

// export async function loadMoreHandler(){
//   const pathAndSearchParams = `${pathForSearchByGenre}?genre_id=${genreId}`;
//   newResults = await fetchNextPageData( pathAndSearchParams, currentPage+1);

//   if(!newResults || newResults>0) {
//     const errorElem = document.querySelector(".error-msg");
//     errorElem.style.display = "block";
//     movie_container.style.display = "none";
//     // showErrorMsg();
//     return;
//   }
//  createCards(newResults, movie_container);
// currentPage+=1;
// enableDisableBtn(loadMoreButton, isLastPage());
// }


