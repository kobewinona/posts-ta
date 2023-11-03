import {postsApiConfig, setRequest, returnRes} from './props';

export const getPosts = () => {
  return setRequest(`${postsApiConfig['url']}/posts`, {
    method: 'GET',
    headers: {...postsApiConfig['headers']}
  }).then(res => returnRes(res));
};

export const getUsers = () => {
  return setRequest(`${postsApiConfig['url']}/users`, {
    method: 'GET',
    headers: {...postsApiConfig['headers']}
  }).then(res => returnRes(res));
};

export const getComments = () => {
  return setRequest(`${postsApiConfig['url']}/comments`, {
    method: 'GET',
    headers: {...postsApiConfig['headers']}
  }).then(res => returnRes(res));
};

export const addPost = (post) => {
  return setRequest(`${postsApiConfig['url']}/posts`, {
    method: 'POST',
    headers: {...postsApiConfig['headers']},
    body: JSON.stringify(post)
  }).then(res => returnRes(res));
};