export function loadMoviePage() {
  const movieContainer = document.getElementById("movie");
  //   let movie_id = "27205";
  // let movie_id = "19";
  const domenPartUrl = "https://movies.gila.workers.dev";
  const pathForFullMovieDescription = "/search/movie/description?";
  // const searchParameters = `movie_id=${movie_id}`;

  const tmbdUrl = `https://www.themoviedb.org/movie/`;

  const baseBackdropUrl = "https://image.tmdb.org/t/p/original";
  const basePosterUrl = "https://media.themoviedb.org/t/p/w220_and_h330_face";

  const movieBlockName = "full-movie__";
  const likeIconPath = "/icons/likeIcon.svg";
  const addIconPath = "/icons/plusIcon.svg";
  const TMBDIconPath = "/icons/TMBD.svg";
  const filmIconPath = "/icons/filmIcon.svg";

  const propertyNames = [
    "id",
    "title",
    "tagline",
    "backdrop_path",
    "genres", // (array)
    "homepage",
    "origin_country", // (array)
    "spoken_languages", //(array of objects, where we need english_name)
    "overview",
    "release_date",
    "vote_average",
    "runtime",
    "cast", // (array)
    "directors", // (array)
  ];

  const idS = {
    likeBtnId: "likeMovieBtn",
    addBtnId: "addMovieBtn",
    shownCastPart: "castMainPart",
    hiddenCastPart: "castAdditionalPart",
    castBtn: "castMovieBtn",
  };

  const classesBanner = {
    banner: `${movieBlockName}banner`,
    title: `${movieBlockName}title`,
    tagline: [`${movieBlockName}tagline`, `${movieBlockName}feature`],
    controlBar: `${movieBlockName}control-bar`,
    button: `${movieBlockName}banner-btn`,
    icon: `${movieBlockName}banner-icon`,
  };

  const lstClasses = {
    lst: [`${movieBlockName}lst`, `${movieBlockName}feature-value`],
    items: `${movieBlockName}lst-item`,
  };

  const classesInfo = {
    content: `${movieBlockName}content`,
    facts: `${movieBlockName}facts`,
    feature: `${movieBlockName}feature`,
    featureName: `${movieBlockName}feature-name`,
    featureVal: `${movieBlockName}feature-value`,
    shownCast: `${movieBlockName}feature-value--shown`,
    hiddenCast: `${movieBlockName}feature-value--hidden`,
    castBtn: `${movieBlockName}cast-btn`,
    links: [`${movieBlockName}feature-value`, `${movieBlockName}links`],
    link: `${movieBlockName}link`,
    linkIcon: `${movieBlockName}link-icon`,
    facts: `${movieBlockName}facts`,
  };

  function createMovieBannerElem(movieDescription) {
    const bannerElem = createElementWithProps("div", `${movieBlockName}banner`);

    const titleElem = createTitleBannerElem(movieDescription);
    bannerElem.append(titleElem);

    if (movieDescription.tagline) {
      const taglineElem = createElementWithProps(
        "p",
        classesBanner.tagline,
        false,
        movieDescription.tagline
      );

      bannerElem.append(taglineElem);
    }

    bannerElem.append(createControlBarElem());
    return bannerElem;
  }

  function createTitleBannerElem(movieDescription) {
    const titleElem = createElementWithProps(
      "h1",
      classesBanner.title,
      false,
      movieDescription.title || "Unknown"
    );
    titleElem.setAttribute("data-id", movieDescription.id);
    return titleElem;
  }

  function changeBannerBG(movieDescription) {
    const bannerElem = document.querySelector(`.${movieBlockName}banner`);
    const currentBg = getComputedStyle(bannerElem).backgroundImage;
    const imagePath =
      movieDescription.backdrop_path || movieDescription.poster_path;
    if (imagePath) {
      const baseUrl = movieDescription.backdrop_path
        ? baseBackdropUrl
        : basePosterUrl;
      const fullUrl = baseUrl + imagePath;

      if (isValidUrl(fullUrl)) {
        const updatedBg = currentBg.replace(
          /url\(["']?(.*?)["']?\)/,
          `url("${baseUrl + imagePath}")`
        );
        bannerElem.style.backgroundImage = updatedBg;
      }
    }
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  function createElementWithProps(tag, className, id = false, text = false) {
    const element = document.createElement(tag);

    Array.isArray(className)
      ? className.forEach((name) => element.classList.add(name))
      : element.classList.add(className);

    id && element.setAttribute("id", id); //&& возвращает первое ложное или, если оба истины, последнее истинное
    if (text) element.textContent = text;

    return element;
  }

  function createImgElem(className, src, alt) {
    const imgElem = createElementWithProps("img", className);
    imgElem.setAttribute("src", src);
    imgElem.setAttribute("alt", alt);
    return imgElem;
  }

  function createButtonWithIcon(id, iconSrc, alt) {
    const btn = createElementWithProps("button", classesBanner.button, id);
    btn.append(createImgElem(classesBanner.icon, iconSrc, alt));
    return btn;
  }

  function createControlBarElem() {
    const controlBarElem = createElementWithProps(
      "div",
      classesBanner.controlBar
    );

    const likeBtnElem = createButtonWithIcon(
      idS.button,
      classesBanner.button,
      likeIconPath,
      "like icon"
    );

    const addBtnElem = createButtonWithIcon(
      idS.button,
      classesBanner.button,
      addIconPath,
      "plus icon"
    );

    controlBarElem.append(likeBtnElem, addBtnElem);

    return controlBarElem;
  }

  function createInfoBlock(movieDescription) {
    const infoBlockElem = createElementWithProps(
      "div",
      `${movieBlockName}info`
    );
    const contentSectionElem = createContentSection(movieDescription);
    const factsSectionElem = createFactsSection(movieDescription);
    infoBlockElem.append(contentSectionElem, factsSectionElem);
    return infoBlockElem;
  }

  function createContentSection(movieDescription) {
    const contentSectionElem = createElementWithProps(
      "section",
      classesInfo.content
    );

    const directorContainer = createDirectorElem(movieDescription);
    const castContainer = createCastElem(movieDescription);
    const descriptionContainer = createDescriptionElem(movieDescription);
    const genreContainer = createGenresElem(movieDescription);
    const linksContainer = createLinksElem(movieDescription);
    contentSectionElem.append(
      directorContainer,
      castContainer,
      descriptionContainer,
      genreContainer,
      linksContainer
    );
    return contentSectionElem;
  }

  function createDirectorElem(movieDescription) {
    let directors = ["Unknown"];

    if (movieDescription.directors && movieDescription.directors.length) {
      directors = movieDescription.directors;
    }
    const featureElem = createElementWithProps("div", classesInfo.feature);
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      directors.length > 1 ? "Directors:" : "Director:"
    );
    const parElem = createElementWithProps(
      "p",
      classesInfo.featureVal,
      false,
      directors.join(", ")
    );
    featureElem.append(subtitleElem, parElem);
    return featureElem;
  }

  function createCastElem(movieDescription) {
    let cast = ["Unknown"];
    if (movieDescription.cast && movieDescription.cast.length)
      cast = movieDescription.cast;

    const featureElem = createElementWithProps("div", classesInfo.feature);
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      "Cast:"
    );
    const parElem = createElementWithProps("p", classesInfo.featureVal, false);

    if (cast.length > 5) {
      const [firstPart, secondPart] = splitAndJoinCastArr(cast);
      const shownCastElem = createElementWithProps(
        "span",
        classesInfo.shownCast,
        false,
        firstPart + ", "
      );
      const hiddenCastElem = createElementWithProps(
        "span",
        classesInfo.hiddenCast,
        idS.hiddenCastPart,
        secondPart + " "
      );
      const castBtn = createElementWithProps(
        "button",
        classesInfo.castBtn,
        idS.castBtn,
        "see more..."
      );
      parElem.append(shownCastElem, hiddenCastElem, castBtn);
    } else {
      parElem.textContent = cast.join(", ");
    }

    featureElem.append(subtitleElem, parElem);
    return featureElem;
  }

  //this fun should be used only if castArr length > 5
  function splitAndJoinCastArr(castArr) {
    const firstFiveArr = castArr.slice(0, 5);
    const firstFiveStr = firstFiveArr.join(", ");
    const restArr = castArr.slice(5);
    const restStr = restArr.join(", ");
    return [firstFiveStr, restStr];
  }

  function createDescriptionElem(movieDescription) {
    const description = movieDescription.overview || "Unknown";
    const featureElem = createElementWithProps("div", classesInfo.feature);
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      "Description:"
    );
    const parElem = createElementWithProps(
      "p",
      classesInfo.featureVal,
      false,
      description
    );
    featureElem.append(subtitleElem, parElem);
    return featureElem;
  }

  function createGenresElem(movieDescription) {
    const featureElem = createElementWithProps("div", classesInfo.feature);
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      "Genres: "
    );

    let genres = ["Unknown"];
    if (movieDescription.genres && movieDescription.genres.length) {
      genres = getGenreNames(movieDescription.genres);
    }

    const genreLstElem = createListElem(genres);
    featureElem.append(subtitleElem, genreLstElem);
    return featureElem;
  }

  function getGenreNames(genres) {
    const genreNames = [];
    genres.forEach((genre) => genreNames.push(genre.name));
    return genreNames;
  }

  function createLinksElem(movieDescription) {
    const featureElem = createElementWithProps("div", classesInfo.feature);
    const subtitleElem = createElementWithProps("h2", classesInfo.featureName);
    const parElem = createElementWithProps("p", classesInfo.links);
    const tmbdLinkElem = createLinkWithIcon(
      // classesInfo.link,
      // classesInfo.linkIcon,
      tmbdUrl + getMovieId(),
      TMBDIconPath,
      "TMBD icon"
    );
    parElem.append(tmbdLinkElem);
    const homepageUrl = movieDescription.homepage;
    if (homepageUrl) {
      const homepageLinkElem = createLinkWithIcon(
        homepageUrl,
        filmIconPath,
        "film icon"
      );
      parElem.append(homepageLinkElem);
    }
    featureElem.append(subtitleElem, parElem);
    return featureElem;
  }

  function getMovieId() {
    return sessionStorage.getItem("movie_id");
  }

  function createLinkWithIcon(href, iconSrc, alt) {
    const linkElem = createElementWithProps("a", classesInfo.link);
    linkElem.setAttribute("target", "_blank");
    linkElem.setAttribute("href", href);
    const iconElem = createImgElem(classesInfo.linkIcon, iconSrc, alt);
    linkElem.append(iconElem);
    return linkElem;
  }

  function createListElem(arr) {
    const lstElem = createElementWithProps("ul", lstClasses.lst);
    arr.forEach((item) => {
      const liElem = createElementWithProps(
        "li",
        lstClasses.items,
        false,
        item
      );
      lstElem.append(liElem);
    });
    return lstElem;
  }

  function createFactsSection(movieDescription) {
    const factsSectionElem = createElementWithProps(
      "section",
      classesInfo.facts
    );
    const yearContainer = createYearElem(movieDescription);
    const countryContainer = createCountryElem(movieDescription);
    const languagesContainer = createLanguageElem(movieDescription);
    const durationContainer = createDurationElem(movieDescription);
    const ratingContainer = createRatingElem(movieDescription);
    factsSectionElem.append(
      yearContainer,
      countryContainer,
      languagesContainer,
      durationContainer,
      ratingContainer
    );
    return factsSectionElem;
  }

  function createYearElem(movieDescription) {
    const featureElem = createElementWithProps("div", classesInfo.feature);
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      "Release Year:"
    );
    const releaseDate = movieDescription.release_date;
    const year = releaseDate ? releaseDate.slice(0, 4) : "Unknown";
    const parElem = createElementWithProps(
      "p",
      classesInfo.featureVal,
      false,
      year
    );
    featureElem.append(subtitleElem, parElem);
    return featureElem;
  }

  function createCountryElem(movieDescription) {
    const featureElem = createElementWithProps("div", classesInfo.feature);
    let countryArr = movieDescription.origin_country;
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      countryArr.length < 2 ? "Country:" : "Countries:"
    );
    const parElem = createElementWithProps(
      "p",
      classesInfo.featureVal,
      false,
      countryArr.length ? countryArr.join(" ") : "Unknown"
    );
    featureElem.append(subtitleElem, parElem);
    return featureElem;
  }

  function createLanguageElem(movieDescription) {
    const featureElem = createElementWithProps("div", classesInfo.feature);

    const languages = movieDescription.spoken_languages;
    const languageNamesArr = getLanguageNames(languages);
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      languageNamesArr.length < 2 ? "Language:" : "Languages:"
    );
    const listElem = createListElem(languageNamesArr);
    featureElem.append(subtitleElem, listElem);
    return featureElem;
  }

  function getLanguageNames(languages) {
    const languageNames = [];
    languages.forEach((language) => languageNames.push(language.english_name));
    return languageNames;
  }

  function createDurationElem(movieDescription) {
    const featureElem = createElementWithProps("div", classesInfo.feature);
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      "Duration:"
    );
    const duration = movieDescription.runtime;
    const parElem = createElementWithProps(
      "p",
      classesInfo.featureVal,
      false,
      duration ? duration + " min." : "Unknown"
    );
    featureElem.append(subtitleElem, parElem);
    return featureElem;
  }

  function createRatingElem(movieDescription) {
    const featureElem = createElementWithProps("div", classesInfo.feature);
    const subtitleElem = createElementWithProps(
      "h2",
      classesInfo.featureName,
      false,
      "TMBD Rating:"
    );
    const rating = movieDescription.vote_average;
    const parElem = createElementWithProps(
      "p",
      classesInfo.featureVal,
      false,
      rating ? rating.toFixed(1) : "Unknown"
    );
    featureElem.append(subtitleElem, parElem);
    return featureElem;
  }

  function renderMovie(movieData) {
    try {
      movieContainer.setAttribute("data-id", movieData.id);

      const bannerElem = createMovieBannerElem(movieData);

      const infoBlockElem = createInfoBlock(movieData);

      movieContainer.append(bannerElem, infoBlockElem);

      changeBannerBG(movieData);
    } catch (error) {
      console.error("Error during rendering movie:", error);
    }
  }

  async function fetchMovieObj(movie_id) {
    try {
      const searchParameters = `movie_id=${movie_id}`;
      let response = await fetch(
        domenPartUrl + pathForFullMovieDescription + searchParameters
      );

      if (!response.ok) {
        console.log("Cannot fetch data form the server");
        throw new Error("HTTP Error: " + response.status);
      }

      let movieData;
      try {
        movieData = await response.json();
      } catch (jsonError) {
        throw new Error("Cannot parse JSON: " + jsonError.message);
      }

      return movieData;
    } catch (error) {
      console.error("Error while loading movie information", error);
      return null;
    }
  }

  function filterMovieData(movieData) {
    if (!movieData || Object.keys(movieData).length === 0) {
      console.error("Error: Movie data is empty.");
      return null;
    }

    const movieDescriptionObj = Object.fromEntries(
      Object.entries(movieData).filter((arr) => propertyNames.includes(arr[0]))
    );

    return movieDescriptionObj;
  }

  async function getAndShowMovie(movie_id) {
    try {
      const rawMovieData = await fetchMovieObj(movie_id);

      if (!rawMovieData) {
        showErrorMessage();
        return;
      }

      const movieData = filterMovieData(rawMovieData);
      if (!movieData) {
        showErrorMessage();
        console.warn("Movie object is empty. Cannot filter movie info");
        return;
      }
      renderMovie(movieData);
      // console.log(movieData);
      const movieLoadedEvent = new CustomEvent("movieLoaded", {
        detail: movieData,
      });
      document.dispatchEvent(movieLoadedEvent);
    } catch (error) {
      console.error("Error during movie processing:", error);
      showErrorMessage();
      const movieErrorEvent = new CustomEvent("movieError", {
        detail: error.message,
      });
      document.dispatchEvent(movieErrorEvent);
    }
  }

  function showErrorMessage() {
    movieContainer.classList.add("error-msg");
    movieContainer.innerHTML = "Cannot load movie. Please, try again later";
  }

  // document.addEventListener("DOMContentLoaded", getAndShowMovie());
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
      console.error("Movie ID is missing in the URL");
      return;
    }
    sessionStorage.setItem("movie_id", movieId);
    getAndShowMovie(movieId);
  });
}
