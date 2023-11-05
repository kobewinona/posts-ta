import PropTypes from 'prop-types';
import React from 'react';

import Popup from '../Shared/Popup/Popup';

import './DeletePostPopup.css';


const DeletePostPopup = ({isOpen, postToDelete, onDeletePost, isUpdating, onClose}) => {
  const handleSubmit = () => {
    onDeletePost(postToDelete);
  };

  return (
    <Popup
      isOpen={isOpen}
      isValidByDefault={true}
      submitText="Удалить"
      onSubmit={handleSubmit}
      isUpdating={isUpdating}
      onClose={onClose}
      title="Delete Post"
      name="delete-post"
    >
      <p className="delete-post-popup">Уверены?</p>
    </Popup>
  );
};

DeletePostPopup.propTypes = {
  isOpen: PropTypes.bool,
  postToDelete: PropTypes.number,
  onDeletePost: PropTypes.func,
  isUpdating: PropTypes.bool,
  onClose: PropTypes.func
};

export default DeletePostPopup;