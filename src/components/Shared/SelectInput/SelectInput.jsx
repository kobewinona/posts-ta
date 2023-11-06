import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import useInput from '../../../hooks/useInput';

import './SelectInput.css';


const SelectInput = ({isShown, defaultValue, onUpdate, usersList, ...props}) => {
  const {inputValue, handleInputChange, resetInputValues} = useInput(name, defaultValue);

  useEffect(() => {
    console.log('inputValue', inputValue);
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
  placeholder: PropTypes.string,
  usersList: PropTypes.array
};

const mapStateToProps = (state) => ({
  usersList: state.data.usersList
});

export default connect(mapStateToProps)(SelectInput);