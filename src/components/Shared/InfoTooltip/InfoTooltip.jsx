import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import CloseButton from '../CloseButton/CloseButton';

import './InfoTooltip.css';


const InfoTooltip = ({isOpen, isUpdateSuccessful, toolTipMessage, onClose}) => {
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
    <section
      className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`}
      onClick={onClose}
    >
      <div
        className={`info-tooltip__container ${isOpen ? 'unfold' : 'fold'}`}
        onClick={event => event.stopPropagation()}
      >
        <div className="info-tooltip__close-button-container">
          <CloseButton onClose={onClose}/>
        </div>
        <div
          className={`
            info-tooltip__pict
            info-tooltip__pict_status_${isUpdateSuccessful ? 'accept' : 'reject'}
          `}
        >
        </div>
        <p className="info-tooltip__message">{toolTipMessage}</p>
      </div>
    </section>
  );
};

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool,
  isUpdateSuccessful: PropTypes.bool,
  toolTipMessage: PropTypes.string,
  onClose: PropTypes.func
};

export default InfoTooltip;