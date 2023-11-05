import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import './CommentsList.css';


const CommentsList = ({postId, commentsList}) => {
  const [currentPostComments, setCurrentPostComments] = useState([]);

  useEffect(() => {
    const filteredComments = commentsList.filter((comment) => comment.postId === postId);
    setCurrentPostComments(filteredComments);
  }, [postId, commentsList]);

  return (
    <ul className="comments-list">
      {
        currentPostComments?.length > 0
          ? currentPostComments.map((comment) => {
            return (
              <li key={comment.id} className="comments-list__comment">
                <p className="comments-list__comment-name" title={comment.name}>
                  <span className="comments-list__comment_accent">Name:</span> {comment.name}</p>
                <p className="comments-list__comment-email" title={comment.email}>
                  <span className="comments-list__comment_accent">Email:</span> {comment.email}</p>
                <p className="comments-list__comment-text">Body: {comment.body}</p>
              </li>
            );
          })
          : <p className="comments-list__no-comments">NO COMMENTS</p>
      }
    </ul>
  );
};

CommentsList.propTypes = {
  postId: PropTypes.number.isRequired,
  commentsList: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  commentsList: state.data.commentsList
});

export default connect(mapStateToProps)(CommentsList);