import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import './SelectInput.css';


const SelectInput = ({isShown, defaultValue, onUpdate, name, placeholder, usersList}) => {
  const [inputValue, setInputValue] = useState('');

  const handleValuesChange = (event) => {
    const value = event.target.value;

    setInputValue(value);
    onUpdate(name, parseInt(value, 10));
  };

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    } else {
      setInputValue('');
    }
  }, [isShown, defaultValue]);

  return (
    <select
      className="select-input"
      onChange={handleValuesChange}
      name={name}
      placeholder={placeholder}
      value={inputValue || ''}
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