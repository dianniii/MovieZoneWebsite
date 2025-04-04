import { appendListElem } from "../elementCreation";
import { clssInfo, lstClasses } from "./movieVars";
import { changeElemContent, extractNames, makePlural } from "./helperFuns";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

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

function pasteCountryContent(countryElem, countryCodes) {
  if (countryCodes.length > 0) {
    const countries = getCountryNames(countryCodes);
    changeElemContent(countryElem, countries);
  }
}

function getCountryNames(countryCodes) {
  return countryCodes.map((code) => countries.alpha2ToAlpha3(code));
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
  appendListElem(languageNamesArr, ulElem, lstClasses.items);
}

function pasteRuntimeContent(runtimeContainer, runtime) {
  if (runtime) {
    const runtimePar = runtimeContainer.querySelector("p");
    runtimePar.textContent = runtime + " min";
  }
}

function updateRatingContent(ratingContainer, rating) {
  if (rating) {
    const ratingPar = ratingContainer.querySelector("p");
    ratingPar.textContent = rating.toFixed(1);
  }
}
