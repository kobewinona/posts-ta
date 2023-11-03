import PropTypes from 'prop-types';
import React, {useRef, useEffect} from 'react';

import Form from '../Form/Form';

import './Popup.css';
import CloseButton from '../CloseButton/CloseButton';


const Popup = ({isOpen, isValidByDefault, submitText, onSubmit, isUpdating, onClose, title, name, children}) => {
  const submitButtonRef = useRef();

  if (isOpen) {
    setTimeout(() => submitButtonRef.current?.focus(), 50);
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <section className={`popup ${isOpen && 'popup_open'}`} onClick={onClose}>
      <div
        className={`popup__container ${isOpen ? 'unfold' : 'fold'}`}
        onClick={event => event.stopPropagation()}
      >
        <div className="popup__header">
          <h2 className="popup__title">{title.toUpperCase()}</h2>
          <CloseButton onClose={onClose}/>
        </div>
        <Form
          isShown={isOpen}
          isValidByDefault={isValidByDefault}
          name={name}
          submitText={submitText}
          onSubmit={onSubmit}
          isUpdating={isUpdating}
        >
          {children}
        </Form>
      </div>
    </section>
  );
};

Popup.propTypes = {
  name: PropTypes.string,
  isOpen: PropTypes.bool,
  isValidByDefault: PropTypes.bool,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
  isUpdating: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any
}

export default Popup;