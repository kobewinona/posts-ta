import PropTypes from 'prop-types';
import React from 'react';

import PostsList from '../PostsList/PostsList';

import './Main.css';
import MultiActionTab from '../MultiActionTab/MultiActionTab';


const Main = (props) => {
  return (
    <main>
      <PostsList {...props}/>
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
  handleOpenConfirmDialog: PropTypes.func,
  addSelectedPostsToBookmarks: PropTypes.func,
  deleteSelectedPosts: PropTypes.func,
  props: PropTypes.any
};

export default Main;