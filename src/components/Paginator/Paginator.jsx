import React from 'react';

import './Paginator.css';
import PropTypes from 'prop-types';


const Paginator = ({setPostsCountLimit}) => {
  return (
    <div className="paginator">
      <button
        className="paginator__button"
        onClick={() => setPostsCountLimit(10)}
      >10</button>
      <button
        className="paginator__button"
        onClick={() => setPostsCountLimit(20)}
      >20</button>
      <button
        className="paginator__button"
        onClick={() => setPostsCountLimit(50)}
      >50</button>
      <button
        className="paginator__button"
        onClick={() => setPostsCountLimit(100)}
      >100</button>
      <button
        className="paginator__button"
        onClick={() => setPostsCountLimit(Number.MAX_SAFE_INTEGER)}
      >all</button>
    </div>
  );
};

Paginator.propTypes = {
  setPostsCountLimit: PropTypes.func
};

export default Paginator;