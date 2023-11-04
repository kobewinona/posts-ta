import PropTypes from 'prop-types';
import React from 'react';

import './Main.css';

import Posts from '../Posts/Posts';


const Main = (props) => {
  return (
    <main>
      <Posts {...props}/>
    </main>
  );
};

Main.propTypes = {
  props: PropTypes.any
};

export default Main;