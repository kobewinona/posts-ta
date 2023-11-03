import PropTypes from 'prop-types';
import React, {useState} from 'react';

import './PostCardButtons.css';
import PostCardButton from './PostCardButton';


const PostCardButtons = ({onShowComments, onOpenEditPostPopup}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleShowComments = () => {
    setIsActive(!isActive);

    onShowComments();
  };

  return (
    <div className="post-card-buttons">
      <div className="post-card-buttons__safe-buttons">
        <PostCardButton
          name="comments"
          ariaLabel="Show comments."
          title="Show comments"
          onButtonClick={toggleShowComments}
          isToggleOn={true}
        />
        <PostCardButton
          name="edit"
          ariaLabel="Edit post."
          title="Edit post"
          onButtonClick={onOpenEditPostPopup}
          isToggleOn={false}
        />
        <PostCardButton
          name="bookmark"
          ariaLabel="Save post to bookmarks."
          title="Save post to bookmarks"
          isToggleOn={true}
        />
      </div>
      <PostCardButton
        name="delete"
        ariaLabel="Delete post."
        title="Delete post"
        isToggleOn={false}
      />
    </div>
  );
};

PostCardButtons.propTypes = {
  onShowComments: PropTypes.func,
  onOpenEditPostPopup: PropTypes.func
};

export default PostCardButtons;