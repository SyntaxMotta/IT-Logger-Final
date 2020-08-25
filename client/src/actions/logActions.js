import {
  GET_LOGS,
  FILTER_LOGS,
  CLEAR_FILTER,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
} from './types';

import axios from 'axios';

// Get logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('/api/logs');

    dispatch({
      type: GET_LOGS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText, // You might have to change this to err.response.data.error
    });
  }
};

// export const getLogs = () => async (dispatch) => {
//   try {
//     setLoading();

//     const res = await fetch('/logs');
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data,
//     });
//   } catch (err) {
//     dispatch({
//       type: LOGS_ERROR,
//       payload: err.response.statusText,
//     });
//   }
// };

// Add new log
export const addLog = (log) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    setLoading();

    const res = await axios.post('/api/logs', log, config);

    dispatch({
      type: ADD_LOG,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete log from server

export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/api/logs/${id}`);

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// export const deleteLog = (id) => async (dispatch) => {
//   try {
//     setLoading();

//     await fetch(`/logs/${id}`, {
//       method: 'DELETE',
//     });

//     dispatch({
//       type: DELETE_LOG,
//       payload: id,
//     });
//   } catch (err) {
//     dispatch({
//       type: LOGS_ERROR,
//       payload: err.response.statusText,
//     });
//   }
// };

// Update log on server
export const updateLog = (log) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_LOG,
      payload: log,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Search Logs
export const filterLogs = (text) => async (dispatch) => {
  try {
    dispatch({
      type: FILTER_LOGS,
      payload: text,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Clear Filter

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
};

// Set current log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};
// Clear Current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
