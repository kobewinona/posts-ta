import PropTypes from 'prop-types';
import React from 'react';

import './Main.css';

import Posts from '../Posts/Posts';


const Main = () => {
  return (
    <>
      <Posts/>
    </>
  );
};

Main.propTypes = {
  postsList: PropTypes.array
};

export default Main;