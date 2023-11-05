import {postsApiConfig, setRequest, returnRes} from './apiConfig';

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

export const addPost = (newPost) => {
  return setRequest(`${postsApiConfig['url']}/posts`, {
    method: 'POST',
    headers: {...postsApiConfig['headers']},
    body: JSON.stringify(newPost)
  }).then(res => returnRes(res));
};

export const editPost = (patchedPost, postId) => {
  return setRequest(`${postsApiConfig['url']}/posts/${postId}`, {
    method: 'PATCH',
    headers: {...postsApiConfig['headers']},
    body: JSON.stringify(patchedPost)
  }).then(res => returnRes(res));
};

export const deletePost = (postId) => {
  return setRequest(`${postsApiConfig['url']}/posts/${postId}`, {
    method: 'DELETE'
  }).then(res => returnRes(res));
};