import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useFormWithValidation from '../../../hooks/useFormWithValidation';

import Spinner from '../Spinner/Spinner';

import './Form.css';


const Form = ({isShown, isValidByDefault, initialValues, onSubmit, ...props}) => {
  const {
    isFormValid,
    handleChange,
    resetForm,
    setFormValid
  } = useFormWithValidation(initialValues);

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit();

    resetForm();
  };

  useEffect(() => {
    if (!isValidByDefault) {
      resetForm();
    } else {
      setFormValid();
    }
  }, [isShown]);

  return (
    <form
      className="form"
      onChange={handleChange}
      onSubmit={handleSubmit}
      name={props.name}
      noValidate
    >
      {props.children}
      <button
        className={`form__submit
          ${!isFormValid && 'form__submit_disabled'}
          ${props.isUpdating && 'form__submit_updated'}`}
        type="submit"
        name="submit"
        disabled={!isFormValid || props.isUpdating}
      >{props.isUpdating ? <Spinner/> : props.submitText || 'Сохранить'}
      </button>
    </form>
  );
};

Form.propTypes = {
  isShown: PropTypes.bool,
  isValidByDefault: PropTypes.bool,
  initialValues: PropTypes.object,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  isUpdating: PropTypes.bool,
  children: PropTypes.any
};

export default Form;