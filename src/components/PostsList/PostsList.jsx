import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import PostCard from '../PostCard/PostCard';
import Paginator from '../Paginator/Paginator';
import useLocalStorage from '../../hooks/useLocalStorage';
import {DEFAULT_POSTS_LIMIT} from '../../utils/constants';

import './PostsList.css';


const PostsList = ({postsList, onOpenAddPostPopup, ...props}) => {
  const [postsCountLimit, setPostsCountLimit] = useState(0);
  const {
    storedValue: storedPostsCountLimit,
    setStoredValue: setStoredPostsCountLimit
  } = useLocalStorage('postsCountLimit', DEFAULT_POSTS_LIMIT);

  useEffect(() => {
    setStoredPostsCountLimit(postsCountLimit);
  }, [postsCountLimit]);

  useEffect(() => {
    if (storedPostsCountLimit) {
      setPostsCountLimit(storedPostsCountLimit);
    }
  }, []);

  return (
    <section className="posts-list">
      {
        <>
          <ul className="posts-list__container">
            <li className="posts-list__add-button-container">
              <button
                className="posts-list__add-button"
                onClick={onOpenAddPostPopup}
              >ADD POST
              </button>
            </li>
            {
              postsList?.map((post, index) => {
                return (index < postsCountLimit &&
                  <PostCard
                    key={index}
                    postId={post.id}
                    title={post.title}
                    body={post.body}
                    userId={post.userId}
                    {...props}
                  />
                );
              })
            }
          </ul>
          <Paginator
            postsCountLimit={postsCountLimit}
            setPostsCountLimit={setPostsCountLimit}
          />
        </>
      }
    </section>
  );
};

PostsList.propTypes = {
  postsList: PropTypes.array,
  setPostsList: PropTypes.func,
  onOpenAddPostPopup: PropTypes.func,
  bookmarkedPostsList: PropTypes.array,
  props: PropTypes.any
};

const mapStateToProps = (state) => ({
  postsList: state.data.postsList
});

export default connect(mapStateToProps)(PostsList);