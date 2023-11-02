import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import './PostsList.css';
import PostCard from '../PostCard/PostCard';
import Paginator from '../Paginator/Paginator';
import useLocalStorage from '../../hooks/useLocalStorage';


const PostsList = ({postsList}) => {
  const [postsCountLimit, setPostsCountLimit] = useState(0);
  const {
    storedValue: storedPostsCountLimit,
    setStoredValue: setStoredPostsCountLimit
  } = useLocalStorage('postsCountLimit', 10);

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
              <button className="posts-list__add-button">ADD POST</button>
            </li>
            {
              postsList?.map((post, index) => {
                return (index < postsCountLimit &&
                  <PostCard
                    key={post.id}
                    title={post.title}
                    body={post.body}
                    userId={post.userId}
                  />
                );
              })
            }
          </ul>
          <Paginator setPostsCountLimit={setPostsCountLimit}/>
        </>
      }
    </section>
  );
};

PostsList.propTypes = {
  postsList: PropTypes.array
};

export default PostsList;