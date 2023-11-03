import PropTypes from 'prop-types';
import React from 'react';

import './TextAreaInput.css';


const TextAreaInput = ({onUpdate, name}) => {
  const handleValuesChange = (event) => {
    onUpdate(name, event.target.value);
  };

  return (
    <textarea
      className="text-area-input"
      onChange={handleValuesChange}
      name={name}
      cols="30"
      rows="10"
    ></textarea>
  );
};

TextAreaInput.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default TextAreaInput;