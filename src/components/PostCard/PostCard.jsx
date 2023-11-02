import PropTypes from 'prop-types';
import React from 'react';

import './PostCard.css';


const PostCard = ({title, body, userId}) => {
  return (
    <li className="post-card">
      <h3 className="post-card__title" title={title}>{title}</h3>
      <p>{userId}</p>
      <p>{body}</p>
    </li>
  );
};

PostCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  userId: PropTypes.number
};

export default PostCard;