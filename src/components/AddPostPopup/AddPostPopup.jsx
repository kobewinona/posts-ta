import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import Popup from '../Shared/Popup/Popup';
import Form from '../Shared/Form/Form';
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

  useEffect(() => {
    setInputValues({});
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Add Post"
    >
      <Form
        isShown={isOpen}
        isValidByDefault={false}
        name={name}
        submitText="Add"
        onSubmit={handleSubmit}
        isUpdating={isUpdating}
      >
        <InputTitle title="Author"/>
        <SelectInput
          isShown={isOpen}
          onUpdate={handleValuesUpdate}
          name="author"
          placeholder="Author"
        />
        <InputTitle title="Title"/>
        <InputWithErrorMessage
          isShown={isOpen}
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
          onUpdate={handleValuesUpdate}
          name="body"
          required
        />
      </Form>
    </Popup>
  );
};

AddPostPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAddPost: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default AddPostPopup;