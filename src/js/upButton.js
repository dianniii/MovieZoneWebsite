export function initUpButton() {
  const scrollButton = document.createElement("button");
  scrollButton.id = "scrollToTopButton";
  scrollButton.textContent = "Up";
  scrollButton.classList.add("scroll-top");
  document.body.appendChild(scrollButton);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
