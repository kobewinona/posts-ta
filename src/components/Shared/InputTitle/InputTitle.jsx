import PropTypes from 'prop-types';
import React from 'react';

import './InputTitle.css';


const InputTitle = ({title}) => {
  return (
    <p className="input-title">{title}</p>
  );
};

InputTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default InputTitle;