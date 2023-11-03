import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';

import CommentsList from '../CommentsList/CommentsList';
import PostCardButtons from '../PostCardButtons/PostCardButtons';

import './PostCard.css';


const PostCard = ({postId, title, body, userId, usersList, onOpenEditPostPopup, onOpenDeletePostPopup}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);

  const findUserName = (userId) => {
    const user = usersList.find((user) => user.id === userId);
    return user ? user.name : 'anonymous';
  };

  const authorName = findUserName(userId);

  const handleShowComments = () => {
    setIsCommentsShown(!isCommentsShown);
  };

  const handleOpenEditPopup = () => {
    const postToEdit = {id: postId, title, body, userId};

    onOpenEditPostPopup(postToEdit);
  };

  const handleOpenDeletePopup = () => {
    onOpenDeletePostPopup(postId);
  };

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
      <PostCardButtons
        onShowComments={handleShowComments}
        onOpenEditPostPopup={handleOpenEditPopup}
        onOpenDeletePostPopup={handleOpenDeletePopup}
      />
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
  onOpenDeletePostPopup: PropTypes.func
};

const mapStateToProps = (state) => ({
  usersList: state.data.usersList
});

export default connect(mapStateToProps)(PostCard);