import PropTypes from 'prop-types';
import React from 'react';

import Posts from '../Posts/Posts';

import './Main.css';


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