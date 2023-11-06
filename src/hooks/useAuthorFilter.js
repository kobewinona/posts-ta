import {useState, useEffect} from 'react';

function useAuthorFilter(postsList) {
  const [filterName, setFilterName] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [
    filteredByAuthorPosts,
    setFilteredByAuthorPosts
  ] = useState([]);

  const filterPosts = () => {
    setFilteredByAuthorPosts(postsList.filter((post) => {
      return post.userId === filterValue;
    }))
  };

  useEffect(() => {
    console.log('filterValue', filterValue);

    if (filterName && filterValue) {
      filterPosts();
    } else {
      setFilteredByAuthorPosts(postsList);
    }
  }, [postsList, filterName, filterValue]);

  const handleAuthorFilterChange = (name, value) => {
    setFilterName(name);
    setFilterValue(value);
  };

  return {filteredByAuthorPosts, handleAuthorFilterChange};
}

export default useAuthorFilter;
