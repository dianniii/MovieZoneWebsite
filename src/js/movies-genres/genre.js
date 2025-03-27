//запрос на добавление жанров 
async function getGenres() {
    try {
        const response = await fetch("https://movies.gila.workers.dev/genres");
        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`);
        }
        const data = await response.json();
        console.log("Полученные данные:", data);

        const genresArray = data.genres; 

        if (!Array.isArray(genresArray)) {
            throw new Error("Данные жанров не являются массивом");
        }
        const container = document.getElementById('genres');
        container.innerHTML = ''; // Очистка контейнера перед вставкой новых данных

        genresArray.forEach(genre => {
            const genreHtml = `
                <div class="genre" data-id="${genre.id}">
                    <h2 class="genre__title">${genre.name}</h2>
                </div>`;
            container.innerHTML += genreHtml;
        });
    } catch (error) {
        console.error("Ошибка:", error);
        // Выводим сообщение об ошибке в интерфейс пользователя, если есть необходимость
        const errorContainer = document.getElementById('error-message');
        if (errorContainer) {
            errorContainer.textContent = `Ошибка при загрузке жанров: ${error.message}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', getGenres);

