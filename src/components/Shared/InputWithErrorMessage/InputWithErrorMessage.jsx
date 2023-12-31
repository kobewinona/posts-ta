import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useInputWithValidation from '../../../hooks/useInputWithValidation';

import './InputWithErrorMessage.css';


const InputWithErrorMessage = ({isShown, defaultValue, onUpdate, name, ...props}) => {
  const {
    inputName,
    inputValue,
    isInputValid,
    errorMessage,
    handleInputChange,
    setInputValues
  } = useInputWithValidation(name, defaultValue);

  useEffect(() => {
    if (inputName && inputValue) {
      onUpdate(inputName, inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValues(name, defaultValue);
  }, [isShown]);

  return (
    <div className="input-with-error-message">
      <input
        className={`input-with-error-message__input
        ${!isInputValid && 'input-with-error-message__input_invalid'}`}
        onChange={handleInputChange}
        value={inputValue || ''}
        name={name}
        {...props}
      />
      <span
        className="input-with-error-message__error-message">
        {!isInputValid && errorMessage}
      </span>
    </div>
  );
};

InputWithErrorMessage.propTypes = {
  isShown: PropTypes.bool,
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func,
  name: PropTypes.string,
  props: PropTypes.any
};

export default InputWithErrorMessage;