import PropTypes from 'prop-types';
import React from 'react';

import Popup from '../Shared/Popup/Popup';

import './EditPostPopup.css';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';


const EditPostPopup = ({isOpen, onClose}) => {
  return (
    <Popup
      isOpen={isOpen}
      title="Edit Post"
      onClose={onClose}
    >
      <InputWithErrorMessage/>
    </Popup>
  );
};

EditPostPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}

export default EditPostPopup;