import {useCallback, useEffect, useState} from 'react';


function useBookmarkFilter(postsList, bookmarkedPostsList) {
  const [filterName, setFilterName] = useState('');
  const [filterValue, setFilterValue] = useState(false);
  const [
    filteredByBookmarkedPosts,
    setFilteredByBookmarkedPosts
  ] = useState([]);

  const filterPosts = useCallback(() => {
    setFilteredByBookmarkedPosts(postsList.filter((post) => {
      return bookmarkedPostsList.includes(post.id);
    }));
  }, [postsList, bookmarkedPostsList]);

  useEffect(() => {
    console.log('postsList', postsList);

    if (filterName && filterValue) {
      filterPosts();
    } else {
      setFilteredByBookmarkedPosts(postsList);
    }
  }, [postsList, filterName, filterValue]);

  const handleBookmarksFilterUpdate = (name, value) => {
    setFilterName(name);
    setFilterValue(value);
  };

  return {
    filteredByBookmarkedPosts,
    handleBookmarksFilterUpdate
  };
}

export default useBookmarkFilter;