import {useEffect, useState} from 'react';

function useSearch(postsList) {
  const [searchedPosts, setSearchedPosts] = useState(postsList);
  const [inputName, setInputName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const searchPosts = (name, value) => {
    setInputName(name);
    setInputValue(value);

    setSearchedPosts(() => {
      if (!value) {
        return postsList;
      } else {
        return postsList.filter((post) =>
          post.title.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
  };

  useEffect(() => {
    searchPosts(inputName, inputValue);
  }, [postsList]);

  return {searchedPosts, searchPosts};
}

export default useSearch;
