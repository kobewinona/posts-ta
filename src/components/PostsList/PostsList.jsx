import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import './PostsList.css';
import PostCard from '../PostCard/PostCard';


const PostsList = ({postsList}) => {
  const [postsCountLimit, setPostsCountLimit] = useState(0);

  useEffect(() => {
    setPostsCountLimit(10);
  }, []);

  return (
    <section className="posts-list">
      {
        <>
          <ul className="posts-list__container">
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
        </>
      }
    </section>
  );
};

PostsList.propTypes = {
  postsList: PropTypes.array
};

export default PostsList;