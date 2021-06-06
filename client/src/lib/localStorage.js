export function saveToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocal(key) {
  const localData = localStorage.getItem(key);
  return JSON.parse(localData);
}
