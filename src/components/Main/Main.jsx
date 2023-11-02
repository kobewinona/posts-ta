import PropTypes from 'prop-types';
import React from 'react';

import './Main.css';

import Posts from '../Posts/Posts';


const Main = ({postsList}) => {
  return (
    <>
      <Posts postsList={postsList}/>
    </>
  );
};

Main.propTypes = {
  postsList: PropTypes.array
};

export default Main;