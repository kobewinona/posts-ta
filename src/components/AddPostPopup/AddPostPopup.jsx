import PropTypes from 'prop-types';
import React from 'react';

import Popup from '../Shared/Popup/Popup';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';

import './AddPostpopup.css';


const AddPostPopup = ({isOpen, onClose}) => {
  return (
    <Popup
      isOpen={isOpen}
      title="Add Post"
      onClose={onClose}
    >
      <InputWithErrorMessage/>
    </Popup>
  );
};

AddPostPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}

export default AddPostPopup;