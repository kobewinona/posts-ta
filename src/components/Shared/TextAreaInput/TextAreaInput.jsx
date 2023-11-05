import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import './TextAreaInput.css';


const TextAreaInput = ({isShown, defaultValue, onUpdate, name}) => {
  const [inputValue, setInputValue] = useState('');

  const handleValuesChange = (event) => {
    const value = event.target.value;

    setInputValue(value);
    onUpdate(name, value);
  };

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    } else {
      setInputValue('');
    }
  }, [isShown, defaultValue]);

  return (
    <textarea
      className="text-area-input"
      value={inputValue || ''}
      onChange={handleValuesChange}
      name={name}
      cols="30"
      rows="10"
    ></textarea>
  );
};

TextAreaInput.propTypes = {
  isShown: PropTypes.bool,
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default TextAreaInput;