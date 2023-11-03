import PropTypes from 'prop-types';
import React, {useState} from 'react';

import Popup from '../Shared/Popup/Popup';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';
import SelectInput from '../Shared/SelectInput/SelectInput';
import InputTitle from '../Shared/InputTitle/InputTitle';
import TextAreaInput from '../Shared/TextAreaInput/TextAreaInput';

import './AddPostpopup.css';


const AddPostPopup = ({isOpen, onAddPost, isUpdating, onClose}) => {
  const [inputValues, setInputValues] = useState({});

  const handleValuesUpdate = (name, value) => {
    setInputValues(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = () => {
    onAddPost(inputValues);
  };

  return (
    <Popup
      name="add-post"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isUpdating={isUpdating}
      onClose={onClose}
      title="Add Post"
    >
      <InputTitle title="Author"/>
      <SelectInput
        onUpdate={handleValuesUpdate}
        name="author"
        required
      />
      <InputTitle title="Title"/>
      <InputWithErrorMessage
        onUpdate={handleValuesUpdate}
        name="title"
        placeholder="Title"
        type="text"
        aria-label="Post title."
        minLength="2"
        required
      />
      <InputTitle title="Body"/>
      <TextAreaInput
        onUpdate={handleValuesUpdate}
        name="body"
        required
      />
    </Popup>
  );
};

AddPostPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAddPost: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default AddPostPopup;