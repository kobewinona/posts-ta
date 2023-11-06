import {useCallback, useState} from 'react';


function useFormWithValidation(initialValues) {
  const [currentValues, setCurrentValues] = useState({});
  const [inputsValidity, setInputsValidity] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const inputs = Array.from(event.currentTarget.elements);

    setCurrentValues(prevValues => ({ ...prevValues, [name]: value }));

    const currentInputsValidity = inputs.reduce((validity, input) => {
      validity[input.name] = input.validity.valid;
      return validity;
    }, {});

    currentInputsValidity[name] = target.validity.valid;

    setInputsValidity(currentInputsValidity);

    setIsFormValid(Object.values(currentInputsValidity).every(Boolean));

    if (initialValues) {
      setIsFormValid(Object.keys(currentValues).every(key => value !== initialValues?.[key]));
    }
  };

  const resetForm = useCallback((newValues = {}, newIsValid = false) => {
    setInputsValidity(newValues);
    setIsFormValid(newIsValid);
  }, [setInputsValidity, setIsFormValid]);

  const setFormValid = () => {
    setIsFormValid(true);
  };

  return {inputsValidity, isFormValid, handleChange, resetForm, setFormValid};
}

export default useFormWithValidation;