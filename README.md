# My Movie App

Структура папок
/project-root
│── /node*modules # Папка с зависимостями (не редактируется)
│── /public # Статические файлы (изображения, favicon и т.д.)
│── /src # Исходный код проекта
│ │── /assets # Стили, изображения, шрифты и другие ресурсы
│ │ │── /styles # SCSS/CSS файлы
| | | │── /blocks # SCSS файлы для разных блоков, !важно начинайте названия с * чтобы они не компилировались (например, \_header.scss)
| | | │── \_base.scss # базовый scss
| | | │── \_vars.scss # scss с переменными
| | | │── \_mixins.scss # scss с миксинами
| | | │── \normalize.css
│ │ │── /images # Изображения проекта
│ │ │── /fonts # Шрифты
│ │ │── /icons # Иконки
│ │── /js # JavaScript-код
│ │── main.js # Главный JS-файл
│ │── main.scss # Главный SCSS-файл
│── index.html # Главная HTML-страница
│── package.json # Файл зависимостей проекта
│── package-lock.json # Автоматически создаваемый файл npm
│── vite.config.js # Конфигурация Vite (если нужна)
│── README.md # Документация проекта
