import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import Preloader from '../Shared/Preloader/Preloader';
import PostCard from '../PostCard/PostCard';
import Paginator from '../Paginator/Paginator';
import useLocalStorage from '../../hooks/useLocalStorage';
import {DEFAULT_POSTS_LIMIT} from '../../utils/constants';

import './PostsList.css';


const PostsList = ({isLoading, searchedPosts, onOpenAddPostPopup, ...props}) => {
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
        isLoading
          ?
          <Preloader/>
          :
          <>
            <ul className="posts-list__container">
              <li className="posts-list__add-button-container">
                <button
                  className="posts-list__add-button"
                  onClick={onOpenAddPostPopup}
                >ADD POST
                </button>
                <div className="posts-list__add-button-gap"></div>
              </li>
              {
                searchedPosts?.length === 0
                  ?
                  <li className="posts-list__no-posts">
                    <p>NO POSTS FOUND</p>
                  </li>
                  :
                  searchedPosts?.map((post, index) => {
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
  isLoading: PropTypes.bool,
  searchedPosts: PropTypes.array,
  onOpenAddPostPopup: PropTypes.func,
  props: PropTypes.any
};

export default PostsList;