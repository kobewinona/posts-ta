import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import * as api from '../../utils/postsApi';
import {
  setBookmarkedPostsList,
  setCommentsList,
  setPostsList,
  setSelectedPostsList,
  setUsersList
} from '../../actions/actions';
import {
  POST_ADD_SUCCESSFUL,
  POST_DELETE_SUCCESSFUL,
  POST_EDIT_SUCCESSFUL,
  POSTS_BOOKMARK_SUCCESSFUL,
  POSTS_DELETE_SUCCESSFUL
} from '../../utils/tooltipMessages';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AddPostPopup from '../AddPostPopup/AddPostPopup';
import EditPostPopup from '../EditPostPopup/EditPostPopup';
import MultiActionTab from '../MultiActionTab/MultiActionTab';
import InfoTooltip from '../Shared/InfoTooltip/InfoTooltip';
import ConfirmDialog from '../Shared/ConfirmDialog/ConfirmDialog';

import './App.css';


function App({dispatch, postsList, bookmarkedPostsList, selectedPostsList}) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);
  const [isEditPostPopupOpen, setIsEditPostPopupOpen] = useState(false);
  const [isMultiActionTabShown, setIsMultiActionTabShown] = useState(false);

  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const [postToEdit, setPostToEdit] = useState({});


  // handle posts

  const getAllPosts = () => {
    api.getPosts()
      .then((posts) => {
        dispatch(setPostsList(posts));
      })
      .catch((err) => console.log(err));
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

        handleInfoToolTip(true, POST_ADD_SUCCESSFUL);
      })
      .catch((err) => handleInfoToolTip(false, err))
      .finally(() => {
        closeAllPopups();
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
        });

        dispatch(setPostsList(updatedPostsList));

        handleInfoToolTip(true, POST_EDIT_SUCCESSFUL);
      })
      .catch((err) => handleInfoToolTip(false, err))
      .finally(() => {
        closeAllPopups();
        setIsUpdating(false);
      });
  };

  const addPostToBookmarks = (postId) => {
    const isBookmarked = bookmarkedPostsList?.some((id) => {
      return id === postId;
    });

    if (!isBookmarked) {
      dispatch(setBookmarkedPostsList([...bookmarkedPostsList, postId]));
    } else {
      dispatch(setBookmarkedPostsList(bookmarkedPostsList?.filter((id) => {
        return id !== postId;
      })));
    }
  };

  const addSelectedPostsToBookmarks = () => {
    setIsUpdating(true);

    const updatedBookmarkedPostsList = [
      ...bookmarkedPostsList,
      ...selectedPostsList
    ];

    dispatch(setBookmarkedPostsList(updatedBookmarkedPostsList));
    dispatch(setSelectedPostsList([]));

    closeConfirmDialog();

    setIsUpdating(false);

    handleInfoToolTip(true, POSTS_BOOKMARK_SUCCESSFUL);
  };

  const deletePost = (postId) => {
    setIsUpdating(true);

    api.deletePost(postId)
      .then(() => {
        const updatedPostsList = postsList.filter((post) => {
          if (post.id !== postId) {
            return (post);
          }
        });

        dispatch(setPostsList(updatedPostsList));

        handleInfoToolTip(true, POST_DELETE_SUCCESSFUL);
      })
      .catch((err) => handleInfoToolTip(false, err))
      .finally(() => {
        closeAllPopups();
        closeConfirmDialog();
        dispatch(setSelectedPostsList([]));
        setIsUpdating(false);
      });
  };

  const deleteSelectedPosts = () => {
    setIsUpdating(true);

    const deletedPostIds = [];
    const deletePromises = selectedPostsList.map((postId) => {
      return api.deletePost(postId)
        .then(() => deletedPostIds.push(postId));
    });

    Promise.all(deletePromises)
      .then(() => {
        const updatedPostsList = postsList.filter((post) => {
          return !deletedPostIds.includes(post.id);
        });

        dispatch(setPostsList(updatedPostsList));

        handleInfoToolTip(true, POSTS_DELETE_SUCCESSFUL);
      })
      .catch((err) => handleInfoToolTip(false, err))
      .finally(() => {
        closeAllPopups();
        closeConfirmDialog();
        dispatch(setSelectedPostsList([]));
        setIsUpdating(false);
      });
  };

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

  const closeAllPopups = () => {
    setIsAddPostPopupOpen(false);
    setIsEditPostPopupOpen(false);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setConfirmAction(null);
  };

  const handleOpenConfirmDialog = (action) => {
    setConfirmAction(action);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };


  // handle multi actions

  useEffect(() => {
    if (selectedPostsList?.length > 0) {
      setIsMultiActionTabShown(true);
    } else {
      setIsMultiActionTabShown(false);
    }
  }, [selectedPostsList]);


  // handle tooltip

  const openInfoToolTip = () => {
    setIsInfoToolTipOpen(true);
  };

  const closeInfoToolTip = () => {
    setIsInfoToolTipOpen(false);
  };

  const handleInfoToolTip = (isSuccessful, toolTipMessage) => {
    setIsUpdateSuccessful(isSuccessful);
    setToolTipMessage(toolTipMessage);
    openInfoToolTip();
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
        onDeletePost={deletePost}
        onOpenConfirmDialog={handleOpenConfirmDialog}
        onSelectPost={handlePostSelect}
        isUpdating={isUpdating}
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
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onSubmit={handleConfirm}
        isUpdating={isUpdating}
        onClose={closeConfirmDialog}
      />
      <MultiActionTab
        isShown={isMultiActionTabShown}
        onOpenConfirmDialog={handleOpenConfirmDialog}
        onAddSelectedPostsToBookmarks={addSelectedPostsToBookmarks}
        onDeleteSelectedPosts={deleteSelectedPosts}
      />
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        isUpdateSuccessful={isUpdateSuccessful}
        toolTipMessage={toolTipMessage}
        onClose={closeInfoToolTip}
      />
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
