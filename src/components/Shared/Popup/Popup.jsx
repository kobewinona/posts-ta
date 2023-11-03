import PropTypes from 'prop-types';
import React, {useRef, useEffect} from 'react';

import Form from '../Form/Form';

import './Popup.css';
import CloseButton from '../CloseButton/CloseButton';


const Popup = ({isOpen, title, onClose, children}) => {
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
        className={`popup__container ${isOpen ? 'grow' : 'shrink'}`}
        onClick={event => event.stopPropagation()}
      >
        <div className="popup__header">
          <h2 className="popup__title">{title.toUpperCase()}</h2>
          <CloseButton onClose={onClose}/>
        </div>
        <Form

        >
          {children}
        </Form>
      </div>
    </section>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any
}

export default Popup;