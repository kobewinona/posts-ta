export const setPostsList = (posts) => ({
  type: 'SET_POSTS_LIST',
  payload: posts,
});

export const setBookmarkedPostsList = (bookmarkedPosts) => ({
  type: 'SET_BOOKMARKED_POSTS_LIST',
  payload: bookmarkedPosts,
});

export const setSelectedPostsList = (selectedPosts) => ({
  type: 'SET_SELECTED_POSTS_LIST',
  payload: selectedPosts,
});

export const setUsersList = (users) => ({
  type: 'SET_USERS_LIST',
  payload: users,
});

export const setCommentsList = (comments) => ({
  type: 'SET_COMMENTS_LIST',
  payload: comments,
});