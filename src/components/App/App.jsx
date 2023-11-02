import React, {useEffect, useState} from 'react';

import * as api from '../../utils/postsApi';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';


function App() {
  const [postsList, setPostsList] = useState([]);

  const getAllPosts = () => {
    api.getPosts()
      .then((data) => {
        setPostsList(data);
      });
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    console.log('postsList', postsList);
  }, [postsList]);

  return (
    <>
      <Header/>
      <Main postsList={postsList}/>
      <Footer/>
    </>
  );
}

export default App;
