import PropTypes from 'prop-types';
import React from 'react';

import Popup from '../Shared/Popup/Popup';

import './InfoTooltip.css';


const InfoTooltip = ({isOpen, isUpdateSuccessful, toolTipMessage, onClose}) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="info-tooltip">
        <div
          className={`
            info-tooltip__pict
            info-tooltip__pict_status_${isUpdateSuccessful ? 'accept' : 'reject'}
          `}
        >
        </div>
        <p className="info-tooltip__message">{toolTipMessage}</p>
      </div>
    </Popup>
  );
};

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool,
  isUpdateSuccessful: PropTypes.bool,
  toolTipMessage: PropTypes.string,
  onClose: PropTypes.func
};

export default InfoTooltip;