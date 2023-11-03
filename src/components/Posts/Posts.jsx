import PropTypes from 'prop-types';
import React from 'react';

import PostsList from '../PostsList/PostsList';

import './Posts.css';


const Posts = ({onOpenAddPostPopup, onOpenEditPostPopup, onOpenDeletePostPopup}) => {
  return (
    <>
      <PostsList
        onOpenAddPostPopup={onOpenAddPostPopup}
        onOpenEditPostPopup={onOpenEditPostPopup}
        onOpenDeletePostPopup={onOpenDeletePostPopup}
      />
    </>
  );
};

Posts.propTypes = {
  onOpenAddPostPopup: PropTypes.func,
  onOpenEditPostPopup: PropTypes.func,
  onOpenDeletePostPopup: PropTypes.func
};

export default Posts;