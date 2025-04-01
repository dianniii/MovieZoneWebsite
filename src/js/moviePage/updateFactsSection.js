import { appendLitElem } from "../elementCreation";
import { clssInfo, lstClasses } from "./movieVars2";
import {
  appendLitElem,
  changeElemContent,
  extractNames,
  makePlural,
} from "./helperFuns";

export function pasteToFacts(movieObj) {
  const factsContainer = document.querySelector("." + clssInfo.facts);

  //year
  const yearContainer = factsContainer.querySelector("." + clssInfo.year);
  pasteYearContent(yearContainer, movieObj.release_date);

  //countries
  const countryContainer = factsContainer.querySelector("." + clssInfo.country);
  pasteCountryContent(countryContainer, movieObj.origin_country);

  //languages
  const langContainer = factsContainer.querySelector("." + clssInfo.language);
  pasteLanguageContent(langContainer, movieObj.spoken_languages);

  //duration
  const runtimeContainer = factsContainer.querySelector("." + clssInfo.runtime);
  pasteRuntimeContent(runtimeContainer, movieObj.runtime);

  //rating
  const ratingContainer = factsContainer.querySelector("." + clssInfo.rating);
  updateRatingContent(ratingContainer, movieObj.vote_average);
}

function pasteYearContent(yearContainer, date) {
  if (date) {
    const yearPar = yearContainer.querySelector("p");
    yearPar.textContent = date.slice(0, 4);
  }
}

function pasteCountryContent(countryElem, countries) {
  if (countries.length > 0) {
    changeElemContent(countryElem, countries);
  }
}

function pasteLanguageContent(langContainer, languages) {
  if (Array.isArray(languages) && languages.length) {
    const titleElem = langContainer.querySelector("h2");
    makePlural(titleElem, languages);

    const langList = langContainer.querySelector("ul");
    updateLangLst(langList, languages);
  }
}

function updateLangLst(ulElem, languages) {
  ulElem.innerHTML = "";
  const languageNamesArr = extractNames(languages, "english_name");
  appendLitElem(languageNamesArr, ulElem, lstClasses.items);
}

function pasteRuntimeContent(runtimeContainer, runtime) {
  if (runtime) {
    const runtimePar = runtimeContainer.querySelector("p");
    runtimePar.textContent = runtime + "min.";
  }
}

function updateRatingContent(ratingContainer, rating) {
  if (rating) {
    const ratingPar = ratingContainer.querySelector("p");
    ratingPar.textContent = rating.toFixed(1);
  }
}
