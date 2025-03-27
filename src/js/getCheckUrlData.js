export function getIdFromWindowLocation() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

export function getPathFromWindowLocation() {
  return window.location.pathname;
}

export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
