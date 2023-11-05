import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {POSTS_LIMITS} from '../../utils/constants';

import './Paginator.css';


const Paginator = ({postsCountLimit, setPostsCountLimit}) => {
  const [activeButtonValue, setActiveButtonValue] = useState(postsCountLimit);

  const handleButtonClick = (value) => {
    setActiveButtonValue(value);
    setPostsCountLimit(value);
  };

  useEffect(() => {
    setActiveButtonValue(postsCountLimit);
  }, [postsCountLimit]);

  return (
    <div className="paginator">
      {POSTS_LIMITS.map((postsLimit, index) => {
        return (
          <button
            key={index}
            className={`paginator__button ${activeButtonValue === postsLimit && 'paginator__button_active'}`}
            onClick={() => handleButtonClick(postsLimit)}
          >{postsLimit === Number.MAX_SAFE_INTEGER ? 'all' : postsLimit}</button>
        );
      })}
    </div>
  );
};

Paginator.propTypes = {
  postsCountLimit: PropTypes.number,
  setPostsCountLimit: PropTypes.func
};

export default Paginator;