import PropTypes from 'prop-types';
import React from 'react';

import PostsList from '../PostsList/PostsList';

import './Posts.css';


const Posts = ({postsList}) => {
  return (
    <>
      <PostsList postsList={postsList}/>
    </>
  );
};

Posts.propTypes = {
  postsList: PropTypes.array
};

export default Posts;