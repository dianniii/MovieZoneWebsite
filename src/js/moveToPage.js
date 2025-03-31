export function moveToPage(elem, pageName) {
  console.log(elem);
  const id = elem.dataset.id;
  window.location.href = `${pageName}.html?id=${id}`;
}
