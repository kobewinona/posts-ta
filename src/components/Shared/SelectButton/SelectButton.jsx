import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import './SelectButton.css';


const SelectButton = ({selectedPostsList, postId, onSelectPost}) => {
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
  selectedPostsList: PropTypes.array,
  postId: PropTypes.number,
  onSelectPost: PropTypes.func
};

const mapStateToProps = (state) => ({
  selectedPostsList: state.data.selectedPostsList
});

export default connect(mapStateToProps)(SelectButton);