import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import CommentsList from '../CommentsList/CommentsList';
import SelectButton from '../Shared/SelectButton/SelectButton';

import './PostCard.css';


const PostCard = ({postId, title, body, userId, usersList, bookmarkedPostsList, ...props}) => {
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
    props.onAddPostToBookmarks(postId);
    setIsBookmarkButtonActive(!isBookmarkButtonActive);
  };

  const handleOpenDeletePopup = () => {
    props.onOpenDeletePostPopup(postId);
  };

  const handlePostSelect = () => {
    props.onSelectPost(postId);
  };

  useEffect(() => {
    const isBookmarked = bookmarkedPostsList?.some((id) => {
      return id === postId;
    });

    setIsBookmarkButtonActive(isBookmarked);
  }, [postId]);

  return (
    <li className="post-card unfold">
      {isCommentsShown
        ? <CommentsList postId={postId}/>
        : <div>
            <div className="post-card__details-container">
              <div>
                <p className="post-card__author">{authorName}</p>
                <h3 className="post-card__title" title={title}>{title?.toUpperCase()}</h3>
              </div>
              <SelectButton postId={postId} onSelectPost={handlePostSelect}/>
            </div>
            <p className="post-card__text">{body}</p>
          </div>
      }
      <div className="post-card__buttons">
        <div className="post-card__buttons-container">
          <button
            className={`
            post-card__button
            ${isCommentsButtonActive
                  ? `post-card__button_type_comments_active`
                  : `post-card__button_type_comments`}
            `}
            onClick={handleShowComments}
            name="comments"
            title="Show comments"
          ></button>
          <button
            className="post-card__button post-card__button_type_edit"
            onClick={handleOpenEditPopup}
            name="edit"
            title="Edit post"
          ></button>
          <button
            className={`
            post-card__button
            ${isBookmarkButtonActive
              ? `post-card__button_type_bookmark_active`
              : `post-card__button_type_bookmark`}
            `}
            onClick={handleBookmarkButtonClick}
            name="bookmark"
            title="Save post to bookmarks"
          ></button>
        </div>
        <button
          className="post-card__button post-card__button_type_delete"
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
  bookmarkedPostsList: PropTypes.array,
  isSavedOnLoad: PropTypes.bool,
  onAddPostToBookmarks: PropTypes.func,
  onOpenDeletePostPopup: PropTypes.func,
  onSelectPost: PropTypes.func
};

const mapStateToProps = (state) => ({
  usersList: state.data.usersList,
  bookmarkedPostsList: state.data.bookmarkedPostsList
});

export default connect(mapStateToProps)(PostCard);