import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import CommentsList from '../CommentsList/CommentsList';

import './PostCard.css';


const PostCard = ({postId, title, body, userId, usersList, isSavedOnLoad, ...props}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [isCommentsButtonActive, setIsCommentsButtonActive] = useState(false);
  const [isBookmarkButtonActive, setIsBookmarkButtonActive] = useState(false);

  const findUserName = (userId) => {
    const user = usersList.find((user) => user.id === userId);
    return user ? user.name : 'anonymous';
  };

  const authorName = findUserName(userId);

  const handleShowComments = () => {
    setIsCommentsButtonActive(!isCommentsButtonActive);
    setIsCommentsShown(!isCommentsShown);
  };

  const handleOpenEditPopup = () => {
    const postToEdit = {id: postId, title, body, userId};

    props.onOpenEditPostPopup(postToEdit);
  };

  const handleBookmarkButtonClick = () => {
    setIsBookmarkButtonActive(!isBookmarkButtonActive);
  };

  const handleOpenDeletePopup = () => {
    props.onOpenDeletePostPopup(postId);
  };

  useEffect(() => {
    setIsBookmarkButtonActive(isSavedOnLoad);
  }, [isSavedOnLoad]);

  return (
    <li className="post-card unfold">
      {isCommentsShown
        ? <CommentsList postId={postId}/>
        : <div>
          <p className="post-card__author">{authorName}</p>
          <h3 className="post-card__title" title={title}>{title?.toUpperCase()}</h3>
          <p className="post-card__text">{body}</p>
        </div>
      }
      <div className="post-card-buttons">
        <div className="post-card-buttons__safe-buttons">
          <button
            className={`
            post-card-button
            ${isCommentsButtonActive
                  ? `post-card-button_type_comments_active`
                  : `post-card-button_type_comments`}
            `}
            onClick={handleShowComments}
            name="comments"
            title="Show comments"
          ></button>
          <button
            className="post-card-button post-card-button_type_edit"
            onClick={handleOpenEditPopup}
            name="edit"
            title="Edit post"
          ></button>
          <button
            className={`
            post-card-button
            ${isBookmarkButtonActive
              ? `post-card-button_type_bookmark_active`
              : `post-card-button_type_bookmark`}
            `}
            onClick={handleBookmarkButtonClick}
            name="bookmark"
            title="Save post to bookmarks"
          ></button>
        </div>
        <button
          className="post-card-button post-card-button_type_delete"
          onClick={handleOpenDeletePopup}
          name="delete"
          title="Delete post"
        ></button>
      </div>
    </li>
  );
};

PostCard.propTypes = {
  postId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  userId: PropTypes.number,
  usersList: PropTypes.array,
  onOpenEditPostPopup: PropTypes.func,
  bookmarksList: PropTypes.array,
  isSavedOnLoad: PropTypes.bool,
  onAddPostToBookmarks: PropTypes.func,
  onOpenDeletePostPopup: PropTypes.func
};

const mapStateToProps = (state) => ({
  usersList: state.data.usersList
});

export default connect(mapStateToProps)(PostCard);