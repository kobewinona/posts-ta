import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import CloseButton from '../CloseButton/CloseButton';

import './Popup.css';


const Popup = ({isOpen, title, onClose, children}) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
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
        {children}
      </div>
    </section>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.any
};

export default Popup;