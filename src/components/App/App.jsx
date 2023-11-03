import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import * as api from '../../utils/postsApi';
import {
  setPostsList,
  setUsersList,
  setCommentsList
} from '../../actions/actions';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AddPostPopup from '../AddPostPopup/AddPostPopup';
import EditPostPopup from '../EditPostPopup/EditPostPopup';

import './App.css';


function App({dispatch, postsList}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);
  const [isEditPostPopupOpen, setIsEditPostPopupOpen] = useState(false);

  const getAllPosts = () => {
    api.getPosts()
      .then((posts) => {
        dispatch(setPostsList(posts));
      });
  };

  const getAllUsers = () => {
    api.getUsers()
      .then((users) => {
        dispatch(setUsersList(users));
      })
      .catch((err) => console.log(err));
  };

  const getAllComments = () => {
    api.getComments()
      .then((comments) => {
        dispatch(setCommentsList(comments));
      })
      .catch((err) => console.log(err));
  };

  const addNewPost = (newPostData) => {
    setIsUpdating(true);

    api.addPost(newPostData)
      .then((post) => {
        dispatch(setPostsList([post, ...postsList]));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups()
        setIsUpdating(false);
      });
  };

  const openAddPostPopup = () => {
    setIsAddPostPopupOpen(true);
  };

  const openEditPostPopup = () => {
    setIsEditPostPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAddPostPopupOpen(false);
    setIsEditPostPopupOpen(false);
  };

  useEffect(() => {
    getAllPosts();
    getAllUsers();
    getAllComments();
  }, []);

  return (
    <>
      <Header/>
      <Main
        onOpenAddPostPopup={openAddPostPopup}
        onOpenEditPostPopup={openEditPostPopup}
      />
      <Footer/>
      <AddPostPopup
        isOpen={isAddPostPopupOpen}
        onAddPost={addNewPost}
        isUpdating={isUpdating}
        onClose={closeAllPopups}
      />
      <EditPostPopup
        isOpen={isEditPostPopupOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postsList: PropTypes.array
};

const mapStateToProps = (state) => ({
  postsList: state.data.postsList,
});

export default connect(mapStateToProps)(App);
