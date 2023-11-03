import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import PostCard from '../PostCard/PostCard';
import Paginator from '../Paginator/Paginator';
import useLocalStorage from '../../hooks/useLocalStorage';
import {DEFAULT_POSTS_LIMIT} from '../../utils/constants';
import {setPostsList} from '../../actions/actions';

import './PostsList.css';


const PostsList = ({postsList, onOpenAddPostPopup, onOpenEditPostPopup}) => {
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
              >ADD POST</button>
            </li>
            {
              postsList?.map((post, index) => {
                return (index < postsCountLimit &&
                  <PostCard
                    key={index + 1}
                    postId={post.id}
                    title={post.title}
                    body={post.body}
                    userId={post.userId}
                    onOpenEditPostPopup={onOpenEditPostPopup}
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
  postsList: PropTypes.array.isRequired,
  setPostsList: PropTypes.func.isRequired,
  onOpenAddPostPopup: PropTypes.func.isRequired,
  onOpenEditPostPopup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  postsList: state.data.postsList,
});

export default connect(mapStateToProps, {setPostsList})(PostsList);