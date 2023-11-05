export const postsURL = 'https://jsonplaceholder.typicode.com';

export const postsApiConfig = {
  url: `${postsURL}`,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
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
      const errorMessage = `Error: ${res.status}: ${err.message}`;
      return Promise.reject(errorMessage);
    });
  }
};