import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import useBookmarkFilter from '../../hooks/useBookmarkFilter';

import QueryTab from '../QueryTab/QueryTab';
import PostsList from '../PostsList/PostsList';
import MultiActionTab from '../MultiActionTab/MultiActionTab';


import './Main.css';
import useSearch from '../../hooks/useSearch';
import useAuthorFilter from '../../hooks/useAuthorFilter';


const Main = ({postsList, bookmarkedPostsList, ...props}) => {
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

  useEffect(() => {
    console.log('filteredByAuthorPosts', filteredByAuthorPosts);
  }, [filteredByAuthorPosts]);

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
  postsList: PropTypes.array,
  bookmarkedPostsList: PropTypes.array,
  isMultiActionTabShown: PropTypes.bool,
  onOpenConfirmDialog: PropTypes.func,
  onAddSelectedPostsToBookmarks: PropTypes.func,
  onDeleteSelectedPosts: PropTypes.func,
  onUseToolTip: PropTypes.func,
  props: PropTypes.any
};

const mapStateToProps = (state) => ({
  postsList: state.data.postsList,
  bookmarkedPostsList: state.data.bookmarkedPostsList
});

export default connect(mapStateToProps)(Main);