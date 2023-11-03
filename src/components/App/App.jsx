import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as api from '../../utils/postsApi';

import {setPostsList, setUsersList} from '../../actions/actions';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';
import PropTypes from 'prop-types';


function App({dispatch}) {
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
  };

  useEffect(() => {
    getAllPosts();
    getAllUsers();
  }, []);

  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
    </>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(App);
