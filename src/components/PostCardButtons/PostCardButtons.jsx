import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import './PostCardButtons.css';
import PostCardButton from './PostCardButton';


const PostCardButtons = ({onShowComments}) => {
  const [isActive, setIsActive] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});

  const toggleShowComments = (event) => {
    console.log('event.target.name', event.target.name);

    setIsActive(!isActive);

    setActiveButtons((prevState) => ({
      ...prevState,
        [event.target.name]: isActive
    }))

    onShowComments();
  };

  useEffect(() => {
    console.log('activeButtons', activeButtons);
  }, [activeButtons]);

  return (
    <div className="post-card-buttons">
      <div className="post-card-buttons__safe-buttons">
        <PostCardButton
          name="comments"
          ariaLabel="Show comments."
          title="Show comments"
          onButtonClick={toggleShowComments}
        />
        <PostCardButton
          name="edit"
          ariaLabel="Edit post."
          title="Edit post"
        />
        <PostCardButton
          name="bookmark"
          ariaLabel="Save post to bookmarks."
          title="Save post to bookmarks"
        />
      </div>
      <PostCardButton
        name="delete"
        ariaLabel="Delete post."
        title="Delete post"
      />
    </div>
  );
};

PostCardButtons.propTypes = {
  onShowComments: PropTypes.func.isRequired
};

export default PostCardButtons;