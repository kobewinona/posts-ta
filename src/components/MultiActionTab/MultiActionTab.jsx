import PropTypes from 'prop-types';
import React from 'react';

import './MultiActionTab.css';


const MultiActionTab = ({isShown, ...props}) => {
  const handleAddPostsToBookmarksClick = () => {
    props.onOpenConfirmDialog(() => {
      return () => props.onAddSelectedPostsToBookmarks();
    });
  };

  const handleDeletePostsClick = () => {
    props.onOpenConfirmDialog(() => {
      return () => props.onDeleteSelectedPosts();
    });
  };

  return (
    <div className={`multi-action-tab ${isShown && 'multi-action-tab_active'}`}>
      <button
        className="multi-action-tab__button"
        onClick={handleAddPostsToBookmarksClick}
      >Add to bookmarks
      </button>
      <button
        className="multi-action-tab__button"
        onClick={handleDeletePostsClick}
      >Delete
      </button>
    </div>
  );
};

MultiActionTab.propTypes = {
  isShown: PropTypes.bool,
  onAddSelectedPostsToBookmarks: PropTypes.func,
  onDeleteSelectedPosts: PropTypes.func,
  onOpenConfirmDialog: PropTypes.func
};

export default MultiActionTab;