import { showPopUp, handlePopupClick } from "../popup";
import { moveToPage } from "../moveToPage";
import {
  domenPartUrl,
  pathForAllGenres,
  pathForSearchByGenre,
} from "../commonVars";
import { showErrorMsg } from "../errorMsg";

async function getGenres() {
  try {
    const response = await fetch(`${domenPartUrl}${pathForAllGenres}`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    const errorContainer = document.getElementById("error-message");
    errorContainer.textContent = "Cannot load page. Please, try again later";
  }
}
// const genresArray = data.genres;
// if (!Array.isArray(genresArray)) {
//     throw new Error("Данные жанров не являются массивом");
//   }
//   const container = document.getElementById("genres");
