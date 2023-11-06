import {createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    postsList: [],
    bookmarkedPostsList: [],
    selectedPostsList: [],
    usersList: [],
    commentsList: [],
  },
  reducers: {
    setPostsList: (state, action) => {
      state.postsList = action.payload;
    },
    setBookmarkedPostsList: (state, action) => {
      state.bookmarkedPostsList = action.payload;
    },
    setSelectedPostsList: (state, action) => {
      state.selectedPostsList = action.payload;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    setCommentsList: (state, action) => {
      state.commentsList = action.payload;
    },
  },
});

export const {
  setPostsList,
  setBookmarkedPostsList,
  setSelectedPostsList,
  setUsersList,
  setCommentsList,
} = dataSlice.actions;

export default dataSlice.reducer;
