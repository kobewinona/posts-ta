const initialState = {
  postsList: [],
  bookmarkedPostsList: [],
  selectedPostsList: [],
  usersList: [],
  commentsList: []
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS_LIST':
      return { ...state, postsList: action.payload };
    case 'SET_BOOKMARKED_POSTS_LIST':
      return { ...state, bookmarkedPostsList: action.payload };
    case 'SET_SELECTED_POSTS_LIST':
      return { ...state, selectedPostsList: action.payload };
    case 'SET_USERS_LIST':
      return { ...state, usersList: action.payload };
    case 'SET_COMMENTS_LIST':
      return { ...state, commentsList: action.payload };
    default:
      return state;
  }
};

export default dataReducer;