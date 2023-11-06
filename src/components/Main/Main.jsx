import PropTypes from 'prop-types';
import React from 'react';
import {useSelector} from 'react-redux';

import useBookmarkFilter from '../../hooks/useBookmarkFilter';
import useAuthorFilter from '../../hooks/useAuthorFilter';
import useSearch from '../../hooks/useSearch';

import QueryTab from '../QueryTab/QueryTab';
import PostsList from '../PostsList/PostsList';
import MultiActionTab from '../MultiActionTab/MultiActionTab';

import './Main.css';


const Main = ({...props}) => {
  const postsList = useSelector((state) => state.data.postsList);
  const bookmarkedPostsList = useSelector((state) => state.data.bookmarkedPostsList);

  const {
    filteredByBookmarkedPosts,
    handleBookmarksFilterUpdate
  } = useBookmarkFilter(postsList, bookmarkedPostsList);
  const {
    filteredByAuthorPosts,
    handleAuthorFilterChange
  } = useAuthorFilter(filteredByBookmarkedPosts);
  const {
    searchedPosts,
    searchPosts
  } = useSearch(filteredByAuthorPosts);

  return (
    <main>
      <QueryTab
        onBookmarksFilter={handleBookmarksFilterUpdate}
        onAuthorFilter={handleAuthorFilterChange}
        onSearch={searchPosts}
      />
      <PostsList searchedPosts={searchedPosts} {...props}/>
      <MultiActionTab
        isShown={props.isMultiActionTabShown}
        onOpenConfirmDialog={props.onOpenConfirmDialog}
        onAddSelectedPostsToBookmarks={props.onAddSelectedPostsToBookmarks}
        onDeleteSelectedPosts={props.onDeleteSelectedPosts}
      />
    </main>
  );
};

Main.propTypes = {
  isMultiActionTabShown: PropTypes.bool,
  onOpenConfirmDialog: PropTypes.func,
  onAddSelectedPostsToBookmarks: PropTypes.func,
  onDeleteSelectedPosts: PropTypes.func,
  onUseToolTip: PropTypes.func,
  props: PropTypes.any
};

export default Main;