import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useInput from '../../../hooks/useInput';

import './TextAreaInput.css';


const TextAreaInput = ({isShown, defaultValue, onUpdate, name}) => {
  const {inputValue, handleInputChange, resetInputValues} = useInput(name, defaultValue);

  useEffect(() => {
    onUpdate(name, inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (!defaultValue) {
      resetInputValues();
    }
  }, [isShown, defaultValue]);

  return (
    <textarea
      className="text-area-input"
      value={inputValue || ''}
      onChange={handleInputChange}
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