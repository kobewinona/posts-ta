import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';

import CommentsList from '../CommentsList/CommentsList';
import PostCardButtons from '../PostCardButtons/PostCardButtons';

import './PostCard.css';


const PostCard = ({postId, title, body, userId, usersList}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);

  const findUserName = (userId) => {
    const user = usersList.find((user) => user.id === userId);
    return user ? user.name : 'anonymous';
  };

  const authorName = findUserName(userId);

  const handleShowComments = () => {
    setIsCommentsShown(!isCommentsShown);
  };

  return (
    <li className="post-card unfold">
      {isCommentsShown
        ? <CommentsList postId={postId}/>
        : <div>
          <p className="post-card__author">{authorName}</p>
          <h3 className="post-card__title" title={title}>{title.toUpperCase()}</h3>
          <p className="post-card__text">{body}</p>
        </div>
      }
      <PostCardButtons onShowComments={handleShowComments}/>
    </li>
  );
};

PostCard.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  usersList: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  usersList: state.data.usersList
});

export default connect(mapStateToProps)(PostCard);