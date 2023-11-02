import {postsApiConfig, setRequest, returnRes} from './props';

export const getPosts = () => {
  return setRequest(`${postsApiConfig['url']}/posts`, {
    method: 'GET',
    credentials: 'include',
    headers: {...postsApiConfig['headers']}
  }).then(res => returnRes(res));
};
