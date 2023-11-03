const initialState = {
  postsList: [],
  usersList: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS_LIST':
      return { ...state, postsList: action.payload };
    case 'SET_USERS_LIST':
      return { ...state, usersList: action.payload };
    default:
      return state;
  }
};

export default dataReducer;