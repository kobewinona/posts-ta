import PropTypes from 'prop-types';
import React from 'react';

import PostsList from '../PostsList/PostsList';

import './Posts.css';


const Posts = ({onOpenAddPostPopup, onOpenEditPostPopup}) => {
  return (
    <>
      <PostsList
        onOpenAddPostPopup={onOpenAddPostPopup}
        onOpenEditPostPopup={onOpenEditPostPopup}
      />
    </>
  );
};

Posts.propTypes = {
  onOpenAddPostPopup: PropTypes.func.isRequired,
  onOpenEditPostPopup: PropTypes.func.isRequired
};

export default Posts;