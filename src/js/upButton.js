export function initUpButton() {
  // Создаем кнопку "Up" через createElement
  const scrollButton = document.createElement("button");
  // Задаем уникальный id для кнопки (используем для поиска и стилизации)
  scrollButton.id = "scrollToTopButton";
  // Задаем текст кнопки
  scrollButton.textContent = "Up";
  // Добавляем класс для стилизации (CSS-стили определены ниже)
  scrollButton.classList.add("scroll-top");

  // Добавляем кнопку в конец элемента <body>
  document.body.appendChild(scrollButton);

  // Слушаем событие прокрутки страницы
  window.addEventListener("scroll", () => {
    // Если страница прокручена больше чем на 300px по вертикали,
    // добавляем класс "visible", чтобы показать кнопку,
    // иначе удаляем класс "visible", чтобы скрыть кнопку.
    if (window.scrollY > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  });

  // Добавляем обработчик клика на кнопку:
  // При клике происходит плавный переход в начало страницы.
  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
