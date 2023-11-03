import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import './PostCard.css';


const PostCard = ({title, body, userId, usersList}) => {
  const findUserName = (userId) => {
    const user = usersList.find((user) => user.id === userId);
    return user ? user.name : 'anonymous';
  };

  const authorName = findUserName(userId);

  return (
    <li className="post-card">
      <p className="post-card__author">{authorName}</p>
      <h3 className="post-card__title" title={title}>{title}</h3>
      <p className="post-card__text">{body}</p>
      <div className="post-card__controls">
        <div className="post-card__controls_safe-controls">
          <button
            className="post-card__controls-button post-card__controls-button_type_comments"
            aria-label="Comments."
            title="Show comments"
          ></button>
          <button
            className="post-card__controls-button post-card__controls-button_type_edit"
            aria-label="Edit."
            title="Edit post"
          ></button>
          <button
            className="post-card__controls-button post-card__controls-button_type_bookmark"
            aria-label="Bookmark."
            title="Save post to bookmarks"
          ></button>
        </div>
        <button
          className="post-card__controls-button post-card__controls-button_type_delete"
          aria-label="Delete."
          title="Delete post"
        ></button>
      </div>
    </li>
  );
};

PostCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  userId: PropTypes.number,
  usersList: PropTypes.array
};

const mapStateToProps = (state) => ({
  usersList: state.data.usersList,
});

export default connect(mapStateToProps)(PostCard);