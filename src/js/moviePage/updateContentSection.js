import { createElementWithProps, createLinkWithIcon } from "../elementCreation";
import { tmbdUrl } from "../commonVars";
import { clssInfo, lstClasses, iconPaths } from "./movieVars2";
import { makePlural, changeElemContent } from "./helperFuns";

export function pasteToContent(movieObj) {
  const contentElem = document.querySelector("." + clssInfo.content);

  //directors
  const directorContainer = contentElem.querySelector("." + clssInfo.director);
  pasteDirectorsContent(directorContainer, movieObj.directors);

  //cast
  const castContainer = contentElem.querySelector("." + clssInfo.cast);
  pasteCastContent(castContainer, movieObj.cast);

  //description
  pasteDescription(movieObj.overview);

  //genres
  const genresContainer = contentElem.querySelector("." + clssInfo.genres);
  pasteGenreContent(genresContainer, movieObj.genres);

  //links
  const linksContainer = contentElem.querySelector("." + clssInfo.links);
  updateLinksContent(linksContainer, movieObj);
}

function pasteDirectorsContent(directorContainer, directors) {
  if (Array.isArray(directors) && directors.length > 0) {
    changeElemContent(directorContainer, directors);
  }
}

function pasteCastContent(castContainer, cast) {
  if (Array.isArray(cast) && cast.length) {
    const castPar = castContainer.querySelector("p");
    createCastContent(castPar, cast);
  }
}

function createCastContent(parElem, cast) {
  if (cast.length > 5) {
    const [firstPart, secondPart] = splitAndJoinCastArr(cast);
    const shownPart = createElementWithProps(
      "span",
      clssInfo.shownCast,
      false,
      firstPart + ", "
    );
    const hiddenPart = createElementWithProps(
      "span",
      clssInfo.hiddenCast,
      castIds.hidden,
      secondPart + " "
    );
    const btn = createElementWithProps(
      "button",
      clssInfo.castBtn,
      castIds.btn,
      "see more..."
    );

    parElem.append(shownPart, hiddenPart, btn);
  } else {
    parElem.textContent = cast.join(", ");
  }
  return parElem;
}

function splitAndJoinCastArr(castArr) {
  const firstFiveArr = castArr.slice(0, 5);
  const firstFiveStr = firstFiveArr.join(", ");
  const restArr = castArr.slice(5);
  const restStr = restArr.join(", ");
  return [firstFiveStr, restStr];
}

function pasteDescription(description) {
  if (description) {
    const descriptionContainer = contentElem.querySelector(
      "." + clssInfo.description
    );
    changeElemContent(descriptionContainer, description);
  }
}

function pasteGenreContent(genresContainer, genres) {
  if (Array.isArray(genres) && genres.length) {
    const titleElem = genresContainer.querySelector("h2");
    makePlural(titleElem, genres);
    const genreList = genresContainer.querySelector("ul");
    genreList.innerHTML = "";
    updateGenresList(genreList, genres);
  }
}

function updateGenresList(ulElem, genres) {
  const genresParsed = exctractValues(genres);
  appendLitElem(genresParsed, ulElem, lstClasses.genreItems, true);
}

function appendLitElem(arr, ulElem, liClass, nestedArr = false) {
  arr.forEach((item) => {
    const liElem = createElementWithProps(
      "li",
      liClass,
      false,
      nestedArr ? item[1] : item
    );
    ulElem.append(liElem);
    if (nestedArr) liElem.dataset.id = item[0];
  });
}

function updateLinksContent(linksContainer, movieObj) {
  addTmdbHref(linksContainer, movieObj.id);

  if (movieObj.homepage) {
    const linksParElem = linksContainer.querySelector("p");
    linksParElem.append(
      createLinkWithIcon(
        clssInfo.link,
        clssInfo.linkIcon,
        movieObj.homepage,
        iconPaths.filmIcon,
        "film icon"
      )
    );
  }
}

function addTmdbHref(linksContainer, movie_id) {
  const linkElem = linksContainer.querySelector("a");
  linkElem.setAttribute("href", `${tmbdUrl}${movie_id}`);
}
