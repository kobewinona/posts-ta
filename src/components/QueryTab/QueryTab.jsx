import PropTypes from 'prop-types';
import React from 'react';

import SelectInput from '../Shared/SelectInput/SelectInput';
import FilterCheckbox from '../Shared/FilterCheckbox/FilterCheckbox';

import './QueryTab.css';
import SearchQuery from '../Shared/SearchQuery/SearchQuery';


const QueryTab = ({onSearch, onBookmarksFilter, onAuthorFilter}) => {
  return (
    <section className="query-tab">
      <p className="query-tab__filter-name">Search</p>
      <SearchQuery
        defaultValue={''}
        onUpdate={onSearch}
        name="post-title"
        type="text"
        aria-label="Post title query."
        placeholder="post title"
      />
      <p className="query-tab__filter-name">Author</p>
      <SelectInput
        onUpdate={onAuthorFilter}
        name="author"
        type="checkbox"
        aria-label="Filter posts by author."
        placeholder="Filter posts by author"
      />
      <p className="query-tab__filter-name">Bookmarks</p>
      <FilterCheckbox
        onUpdate={onBookmarksFilter}
        name="bookmarks"
        type="checkbox"
        aria-label="Show bookmarked posts."
        placeholder="Show bookmarked posts"
      />
    </section>
  );
};

QueryTab.propTypes = {
  onSearch: PropTypes.func,
  onBookmarksFilter: PropTypes.func,
  onAuthorFilter: PropTypes.func,
}

export default QueryTab;