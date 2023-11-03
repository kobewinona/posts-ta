import {useEffect, useState} from 'react';


export default function useInputWithValidation(defaultName, defaultValue) {
  const [inputName, setInputName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setInputName(name);
    setInputValue(value);

    setIsInputValid(target.validity.valid);
    setErrorMessage(target.validationMessage);
  };

  const setInputValues = (name, value) => {
    setInputName(name);
    setInputValue(value);
    setIsInputValid(true);
    setErrorMessage('');
  };

  useEffect(() => {
    if (defaultValue) {
      setInputName(defaultName);
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  return {
    inputName,
    inputValue,
    isInputValid,
    errorMessage,
    handleInputChange,
    setInputValues
  };
}