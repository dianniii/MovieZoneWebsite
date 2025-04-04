import { basePosterUrl } from "../commonVars";
import { movieCardClickHandler } from "../movieCardClickHandler";
import { createControlBarElem } from "../controlBar/createControlBar";

export function createCards(arrayOfObjs, container) {
  if (Array.isArray(arrayOfObjs)) {
    arrayOfObjs.forEach((movie) => {
      const card = createCard(movie);
      container.appendChild(card);
    });
  }
}

export function createCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");
  movieCard.setAttribute("data-id", movie.id);

  const posterPath = movie.poster_path
    ? `${basePosterUrl}${movie.poster_path}`
    : "./src/assets/images/no-Image-Placeholder.svg";

  movieCard.innerHTML = ` <div class="movie-card__poster-container"> <img class="movie-card__poster" src="${posterPath}" alt ="${
    movie.title
  } Poster"> </div>
    <div class="movie-card__text-container"> <h3 class="movie-card__movieTitle">${
      movie.title
    }</h3>
    <p>${movie.release_date ? movie.release_date.slice(0, 4) : ""}</p>
    <p class="movie-card__movie-info">${movie.overview}</p> </div>
    `;
  movieCard
    .querySelector(".movie-card__text-container")
    .append(createControlBarElem(movie));
  // вешаю слушатель события на созданную карточку
  movieCard.addEventListener("click", (evt) => movieCardClickHandler(evt));
  return movieCard;
}

export function changeTitle(title) {
  const mainTitle = document.querySelector(".main-title");
  mainTitle.textContent = title;
}

export function isLastPage(currentPage, totalPage) {
  return currentPage < totalPage;
}

export function enableDisableBtn(btn, check) {
  if (check) {
    btn.style.display = "block";
    return;
  }
  btn.style.display = "none";
}
