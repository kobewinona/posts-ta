import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import Popup from '../Shared/Popup/Popup';

import './EditPostPopup.css';
import InputWithErrorMessage from '../Shared/InputWithErrorMessage/InputWithErrorMessage';
import InputTitle from '../Shared/InputTitle/InputTitle';
import SelectInput from '../Shared/SelectInput/SelectInput';
import TextAreaInput from '../Shared/TextAreaInput/TextAreaInput';


const EditPostPopup = ({isOpen, postToEdit, onEditPost, isUpdating, onClose}) => {
  const [inputValues, setInputValues] = useState({});

  const handleValuesUpdate = (name, value) => {
    setInputValues(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = () => {
    onEditPost(inputValues, postToEdit.id);
  };

  useEffect(() => {
    setInputValues({});
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isUpdating={isUpdating}
      onClose={onClose}
      title="Edit Post"
      name="edit-post"
    >
      <InputTitle title="Author"/>
      <SelectInput
        isShown={isOpen}
        defaultValue={postToEdit.userId}
        onUpdate={handleValuesUpdate}
        name="userId"
        placeholder="Author"
      />
      <InputTitle title="Title"/>
      <InputWithErrorMessage
        isShown={isOpen}
        defaultValue={postToEdit.title}
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
        isShown={isOpen}
        defaultValue={postToEdit.body}
        onUpdate={handleValuesUpdate}
        name="body"
        placeholder="Body"
        required
      />
    </Popup>
  );
};

EditPostPopup.propTypes = {
  isOpen: PropTypes.bool,
  postToEdit: PropTypes.object,
  onEditPost: PropTypes.func,
  isUpdating: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}

export default EditPostPopup;