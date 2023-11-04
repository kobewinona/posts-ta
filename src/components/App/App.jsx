import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import * as api from '../../utils/postsApi';
import {
  setPostsList,
  setBookmarkedPostsList,
  setSelectedPostsList,
  setUsersList,
  setCommentsList
} from '../../actions/actions';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AddPostPopup from '../AddPostPopup/AddPostPopup';
import EditPostPopup from '../EditPostPopup/EditPostPopup';
import DeletePostPopup from '../DeletePostPopup/DeletePostPopup';
import MultiActionTab from '../MultiActionTab/MultiActionTab';

import './App.css';


function App({dispatch, postsList, bookmarkedPostsList, selectedPostsList}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);
  const [isEditPostPopupOpen, setIsEditPostPopupOpen] = useState(false);
  const [isDeletePostPopupOpen, setIsDeletePostPopupOpen] = useState(false);

  const [postToEdit, setPostToEdit] = useState({});
  const [postToDelete, setPostToDelete] = useState(0);


  // handle posts

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
    const isBookmarked = bookmarkedPostsList?.some((id) => {
      return id === postId;
    });

    if (!isBookmarked) {
      const updatedBookmarkedPosts = [...bookmarkedPostsList, postId];

      dispatch(setBookmarkedPostsList(updatedBookmarkedPosts));
    } else {
      const updatedBookmarkedPosts = bookmarkedPostsList?.filter((id) => id !== postId);

      dispatch(setBookmarkedPostsList(updatedBookmarkedPosts));
    }
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
        dispatch(setSelectedPostsList([]));
      });
  };

  // const deleteSelectedPosts = (postIds) => {
  //
  // };

  const handlePostSelect = (postId) => {
    const isSelected = selectedPostsList?.some((id) => {
      return id === postId;
    });

    if (!isSelected) {
      const updatedSelectedPosts = [...selectedPostsList, postId];

      dispatch(setSelectedPostsList(updatedSelectedPosts));
    } else {
      const updatedSelectedPosts = selectedPostsList?.filter((id) => id !== postId);

      dispatch(setSelectedPostsList(updatedSelectedPosts));
    }
  };


  // handle popups

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


  // on mount

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
        onAddPostToBookmarks={addPostToBookmarks}
        onOpenDeletePostPopup={openDeletePostPopup}
        onSelectPost={handlePostSelect}
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
      <MultiActionTab/>
    </>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postsList: PropTypes.array,
  bookmarkedPostsList: PropTypes.array,
  selectedPostsList: PropTypes.array
};

const mapStateToProps = (state) => ({
  postsList: state.data.postsList,
  bookmarkedPostsList: state.data.bookmarkedPostsList,
  selectedPostsList: state.data.selectedPostsList
});

export default connect(mapStateToProps)(App);
