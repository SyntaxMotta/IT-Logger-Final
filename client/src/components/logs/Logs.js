import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import PreLoader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading, filtered }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <PreLoader />;
  }

  if (!loading && logs.length === 0) {
    return <p className="center">No logs to show...</p>;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {filtered != null
        ? filtered.map((log) => <LogItem log={log} key={log._id} />)
        : logs.map((log) => <LogItem log={log} key={log._id} />)}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
  filtered: state.filtered,
});

export default connect(mapStateToProps, { getLogs })(Logs);
