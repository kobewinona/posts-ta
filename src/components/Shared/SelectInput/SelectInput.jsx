import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import './SelectInput.css';


const SelectInput = ({onUpdate, name, usersList, ...props}) => {
  const handleValuesChange = (event) => {
    onUpdate(name, event.target.value);
  };

  return (
    <select
      className="select-input"
      onChange={handleValuesChange}
      name={name} {...props}
    >
      {usersList.map((user) => {
        return (
          <option key={user.id} value={user.id}>{user.name}</option>
        );
      })}
    </select>
  );
};

SelectInput.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  usersList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  usersList: state.data.usersList,
  props: PropTypes.any
});

export default connect(mapStateToProps)(SelectInput);