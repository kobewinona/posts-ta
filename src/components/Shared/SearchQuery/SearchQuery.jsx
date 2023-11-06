import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import useInput from '../../../hooks/useInput';

import './SearchQuery.css';


const SearchQuery = ({defaultValue, onUpdate, name, ...props}) => {
  const {inputName, inputValue, handleInputChange} = useInput(name, defaultValue);

  useEffect(() => {
    onUpdate(inputName, inputValue);
  }, [inputValue]);

  return (
    <input
      className="search-query"
      value={inputValue || ''}
      onChange={handleInputChange}
      name={name}
      {...props}
    />
  );
};

SearchQuery.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func,
  name: PropTypes.string,
  props: PropTypes.any
}

export default SearchQuery;