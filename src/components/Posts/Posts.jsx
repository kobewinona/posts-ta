import PropTypes from 'prop-types';
import React from 'react';

import PostsList from '../PostsList/PostsList';

import './Posts.css';


const Posts = (props) => {
  return (
    <>
      <PostsList {...props}/>
    </>
  );
};

Posts.propTypes = {
  props: PropTypes.any
};

export default Posts;