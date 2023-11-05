import PropTypes from 'prop-types';
import React from 'react';

import Popup from '../Popup/Popup';
import Spinner from '../Spinner/Spinner';

import './ConfirmDialog.css';


const ConfirmDialog = ({isOpen, onSubmit, isUpdating, onClose}) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Popup
      isOpen={isOpen}
      title="Confirmation"
      onClose={onClose}
    >
      <p className="confirm-dialog__title">Are you sure?</p>
      <div className="confirm-dialog__buttons-container">
        <button
          className="confirm-dialog__button confirm-dialog__button_type_confirm"
          onClick={handleSubmit}
        >{isUpdating ? <Spinner/> : 'Confirm'}</button>
        <button
          className="confirm-dialog__button confirm-dialog__button_type_cancel"
          onClick={onClose}
        >Cancel
        </button>
      </div>
    </Popup>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  isUpdating: PropTypes.bool,
  onClose: PropTypes.func
};

export default ConfirmDialog;