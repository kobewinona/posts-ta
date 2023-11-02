export const postsURL = 'https://jsonplaceholder.typicode.com';

export const postsApiConfig = {
  url: `${postsURL}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export const setRequest = (url, config) => {
  return fetch(url, config);
}

export const returnRes = res => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then(err => {
      const errorMessage = `Ошибка: ${res.status}: ${err.message}`;
      return Promise.reject(errorMessage);
    });
  }
};