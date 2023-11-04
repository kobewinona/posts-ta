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
import DeletePostPopup from '../DeletePostPopup/DeletePostPopup';
import useLocalStorage from '../../hooks/useLocalStorage';


function App({dispatch, postsList}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);
  const [isEditPostPopupOpen, setIsEditPostPopupOpen] = useState(false);
  const [isDeletePostPopupOpen, setIsDeletePostPopupOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState({});
  const [postToDelete, setPostToDelete] = useState(0);
  const [bookmarksList, setBookmarksList] = useState([]);
  const {
    storedValue: storedBookmarksList,
    setStoredValue: setStoredBookmarksList
  } = useLocalStorage('bookmarksList', []);

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

  const addPost = ({author, title, body}) => {
    setIsUpdating(true);

    api.addPost({userId: author, title, body})
      .then((post) => {
        dispatch(setPostsList([post, ...postsList]));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups()
        setIsUpdating(false);
      });
  };

  const editPost = (patchedPost, postId) => {
    setIsUpdating(true);

    api.editPost(patchedPost, postId)
      .then((patchedPost) => {
        const updatedPostsList = postsList.map((post) => {
          if (post.id === postId) {
            return (patchedPost);
          } else {
            return (post);
          }
        })
        dispatch(setPostsList(updatedPostsList));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups()
        setIsUpdating(false);
      });
  };

  const addPostToBookmarks = (postId) => {
    console.log('postId', postId);
    setBookmarksList((prevState) => ([...prevState, postId]));
  };

  const deletePost = (postId) => {
    setIsUpdating(true);

    api.deletePost(postId)
      .then(() => {
        const updatedPostsList = postsList.filter((post) => {
          if (post.id !== postId) {
            return (post);
          }
        })
        dispatch(setPostsList(updatedPostsList));
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

  const openEditPostPopup = (post) => {
    setPostToEdit(post);
    setIsEditPostPopupOpen(true);
  };

  const openDeletePostPopup = (postId) => {
    setPostToDelete(postId);
    setIsDeletePostPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAddPostPopupOpen(false);
    setIsEditPostPopupOpen(false);
    setIsDeletePostPopupOpen(false);
  };

  useEffect(() => {
    setStoredBookmarksList(bookmarksList);
  }, [bookmarksList]);

  useEffect(() => {
    getAllPosts();
    getAllUsers();
    getAllComments();
  }, []);

  return (
    <>
      <Header/>
      <Main
        bookmarksList={storedBookmarksList}
        onOpenAddPostPopup={openAddPostPopup}
        onOpenEditPostPopup={openEditPostPopup}
        onAddPostToBookmarks={addPostToBookmarks}
        onOpenDeletePostPopup={openDeletePostPopup}
      />
      <Footer/>
      <AddPostPopup
        isOpen={isAddPostPopupOpen}
        onAddPost={addPost}
        isUpdating={isUpdating}
        onClose={closeAllPopups}
      />
      <EditPostPopup
        isOpen={isEditPostPopupOpen}
        postToEdit={postToEdit}
        onEditPost={editPost}
        isUpdating={isUpdating}
        onClose={closeAllPopups}
      />
      <DeletePostPopup
        isOpen={isDeletePostPopupOpen}
        postToDelete={postToDelete}
        onDeletePost={deletePost}
        isUpdating={isUpdating}
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
