import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterLogs, clearFilter } from '../../actions/logActions';

const SearchBar = ({ filterLogs, clearFilter, filtered }) => {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
    console.log(filtered);
  }, [filtered]);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterLogs(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <nav style={{ marginBottom: '30px' }} className="black">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="filter"
              type="text"
              placeholder="Filter Logs..."
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="filter">
              <i className="material-icons">search</i>
            </label>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  filterLogs: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filtered: state.filtered,
});

export default connect(mapStateToProps, { filterLogs, clearFilter })(SearchBar);
