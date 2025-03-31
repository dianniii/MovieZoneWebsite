export function moveToPage(elem, pageName) {
  const id = elem.dataset.id;
  window.location.href = `${pageName}.html?id=${id}`;
}
