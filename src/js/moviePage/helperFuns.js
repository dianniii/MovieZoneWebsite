export function makePlural(elem, array) {
  if (array.length > 1) elem.textContent += "s";
}

export function changeElemContent(elem, content) {
  const titleElem = elem.querySelector("h2");
  const parElem = elem.querySelector("p");
  if (content.length > 1) makePlural(titleElem, content);
  parElem.textContent = content.join(".");
}
