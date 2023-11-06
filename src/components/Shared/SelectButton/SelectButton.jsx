import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import './SelectButton.css';


const SelectButton = ({postId, onSelectPost}) => {
  const selectedPostsList = useSelector((state) => state.data.selectedPostsList);

  const [isSelected, setIsSelected] = useState(false);

  const handlePostSelect = () => {
    setIsSelected(!isSelected);
    onSelectPost();
  };

  useEffect(() => {
    const isSelected = selectedPostsList?.some((id) => {
      return id === postId;
    });

    setIsSelected(isSelected);
  }, [selectedPostsList, postId]);

  return (
    <div className="select-button">
      <button
        className={`select-button__button ${isSelected && 'select-button__button_active'}`}
        onClick={handlePostSelect}
        aria-label="Select post."
      ></button>
    </div>
  );
};

SelectButton.propTypes = {
  postId: PropTypes.number,
  onSelectPost: PropTypes.func
};

export default SelectButton;