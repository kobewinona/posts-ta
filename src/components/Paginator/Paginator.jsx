import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {DEFAULT_POSTS_LIMIT, POSTS_LIMITS} from '../../utils/constants';

import './Paginator.css';


const Paginator = ({setPostsCountLimit}) => {
  const [activeButtonValue, setActiveButtonValue] = useState(DEFAULT_POSTS_LIMIT);

  const handleButtonClick = (value) => {
    setActiveButtonValue(value);
    setPostsCountLimit(value);
  }

  return (
    <div className="paginator">
      {POSTS_LIMITS.map((postsLimit) => {
        return (
          <button
            key={postsLimit}
            className={`paginator__button ${activeButtonValue === postsLimit && 'paginator__button_active'}`}
            onClick={() => handleButtonClick(postsLimit)}
          >{postsLimit === Number.MAX_SAFE_INTEGER ? 'all' : postsLimit}</button>
        )
      })}
    </div>
  );
};

Paginator.propTypes = {
  setPostsCountLimit: PropTypes.func
};

export default Paginator;