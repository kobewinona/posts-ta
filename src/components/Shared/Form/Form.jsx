import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useFormWithValidation from '../../../hooks/useFormWithValidation';

import Spinner from '../Spinner/Spinner';

import './Form.css';


const Form = ({isShown, initialValues, name, submitText, onSubmit, isUpdating, children}) => {
  const {isFormValid, handleChange, resetForm} = useFormWithValidation(initialValues);

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit();

    resetForm();
  };

  useEffect(() => {
    resetForm();
  }, [isShown]);

  return (
    <form
      className="form"
      onChange={handleChange}
      onSubmit={handleSubmit}
      name={name}
      noValidate
    >
      {children}
      <button
        className={`form__submit
          ${!isFormValid && 'form__submit_disabled'}
          ${isUpdating && 'form__submit_updated'}`}
        type="submit"
        name="submit"
        disabled={!isFormValid || isUpdating}
      >{isUpdating ? <Spinner/> : submitText || 'Сохранить'}
      </button>
    </form>
  );
};

Form.propTypes = {
  isShown: PropTypes.bool,
  initialValues: PropTypes.object,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  isUpdating: PropTypes.bool,
  children: PropTypes.any,
};

export default Form;