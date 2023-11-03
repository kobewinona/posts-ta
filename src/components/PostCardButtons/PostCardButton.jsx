import PropTypes from 'prop-types';
import React, {useState} from 'react';

import './PostCardButton.css';


const PostCardButton = ({name, onButtonClick, ...props}) => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleButtonClick = (event) => {
    setIsButtonActive(!isButtonActive);

    if (onButtonClick) {
      onButtonClick(event);
    }
  };

  return (
    <button
      className={`
        post-card-button
        ${isButtonActive
          ? `post-card-button_type_${name}_active`
          : `post-card-button_type_${name}`}
      `}
      onClick={handleButtonClick}
      {...props}
    ></button>
  );
};

PostCardButton.propTypes = {
  name: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func
}

export default PostCardButton;