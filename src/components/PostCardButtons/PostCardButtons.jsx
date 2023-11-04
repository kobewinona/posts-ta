import PropTypes from 'prop-types';
import React, {useState} from 'react';

import './PostCardButtons.css';
import PostCardButton from './PostCardButton';


const PostCardButtons = (props) => {
  const [isActive, setIsActive] = useState(false);

  const toggleShowComments = () => {
    setIsActive(!isActive);

    props.onShowComments();
  };

  console.log('onAddToBookmarks', props.onAddToBookmarks);

  return (
    <div className="post-card-buttons">
      <div className="post-card-buttons__safe-buttons">
        <PostCardButton
          name="comments"
          title="Show comments"
          onButtonClick={toggleShowComments}
          isToggleOn={true}
        />
        <PostCardButton
          name="edit"
          title="Edit post"
          onButtonClick={props.onOpenEditPostPopup}
          isToggleOn={false}
        />
        <PostCardButton
          name="bookmark"
          title="Save post to bookmarks"
          onButtonClick={props.onAddToBookmarks}
          isToggleOn={true}
        />
      </div>
      <PostCardButton
        name="delete"
        title="Delete post"
        onButtonClick={props.onOpenDeletePostPopup}
        isToggleOn={false}
      />
    </div>
  );
};

PostCardButtons.propTypes = {
  onShowComments: PropTypes.func,
  onOpenEditPostPopup: PropTypes.func,
  onAddToBookmarks: PropTypes.func,
  onOpenDeletePostPopup: PropTypes.func
};

export default PostCardButtons;