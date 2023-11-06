import {useEffect, useState} from 'react';


function useInput(defaultName, defaultValue) {
  const [inputName, setInputName] = useState(defaultName);
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    if (event.target.type === 'checkbox') {
      setInputName(name);
      setInputValue(target.checked);
    } else {
      setInputName(name);
      setInputValue(target.value);
    }
  };

  const resetInputValues = () => {
    setInputValue(undefined);
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
    handleInputChange,
    resetInputValues
  };
}

export default useInput;