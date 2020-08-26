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
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterLogs(e.target.value);
      console.log(filtered);
    } else {
      clearFilter();
    }
  };

  return (
    <nav style={{ marginBottom: '30px' }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              type="text"
              placeholder="Filter Logs..."
              ref={text}
              onChange={onChange}
            />
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
