import PropTypes from 'prop-types';
import React from 'react';

import './Main.css';

import Posts from '../Posts/Posts';


const Main = ({onOpenAddPostPopup, onOpenEditPostPopup}) => {
  return (
    <>
      <Posts
        onOpenAddPostPopup={onOpenAddPostPopup}
        onOpenEditPostPopup={onOpenEditPostPopup}
      />
    </>
  );
};

Main.propTypes = {
  onOpenAddPostPopup: PropTypes.func.isRequired,
  onOpenEditPostPopup: PropTypes.func.isRequired
};

export default Main;