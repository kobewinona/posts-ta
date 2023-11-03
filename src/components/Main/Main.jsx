import PropTypes from 'prop-types';
import React from 'react';

import './Main.css';

import Posts from '../Posts/Posts';


const Main = ({onOpenAddPostPopup, onOpenEditPostPopup, onOpenDeletePostPopup}) => {
  return (
    <main>
      <Posts
        onOpenAddPostPopup={onOpenAddPostPopup}
        onOpenEditPostPopup={onOpenEditPostPopup}
        onOpenDeletePostPopup={onOpenDeletePostPopup}
      />
    </main>
  );
};

Main.propTypes = {
  onOpenAddPostPopup: PropTypes.func,
  onOpenEditPostPopup: PropTypes.func,
  onOpenDeletePostPopup: PropTypes.func
};

export default Main;