const domenPartUrl = "https://movies.gila.workers.dev";
const path1 = "/genres";
const path2 = "/search/genre";


// async function getGenres() {
//   const response = await fetch("https://movies.gila.workers.dev/genres");
//   const data = await response.json();
//   console.log(data);
// }

// // async function getByGenre() {
// //   const id = "28";
// //   const response = await fetch(`${domenPartUrl}${path2}?genre_id=${id}`);
// //   const data = await response.json();
// //   console.log(data);
// // }

// getGenres();
// getByGenre();
async function getGenres() {
  try {
    const response = await fetch("https://movies.gila.workers.dev/genres");

    // Проверка успешности запроса
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

getGenres();