import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import useInput from '../../../hooks/useInput';

import './SelectInput.css';


const SelectInput = ({isShown, defaultValue, onUpdate, ...props}) => {
  const usersList = useSelector((state) => state.data.usersList);

  const {inputValue, handleInputChange, resetInputValues} = useInput(name, defaultValue);

  useEffect(() => {
    onUpdate(props.name, parseInt(inputValue, 10));
  }, [inputValue]);

  useEffect(() => {
    if (!defaultValue) {
      resetInputValues();
    }
  }, [isShown, defaultValue]);

  return (
    <select
      className="select-input"
      onChange={handleInputChange}
      value={inputValue || ''}
      {...props}
    >
      <option value="">Select an author</option>
      {usersList.map((user) => {
        return (
          <option key={user.id} value={user.id}>{user.name}</option>
        );
      })}
    </select>
  );
};

SelectInput.propTypes = {
  isShown: PropTypes.bool,
  defaultValue: PropTypes.number,
  onUpdate: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string
};

export default SelectInput;