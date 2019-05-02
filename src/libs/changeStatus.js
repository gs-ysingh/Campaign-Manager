import * as actions from '../store/actions';

const changeStatus = (obj) => {
  return (dispatch, getState) => {
    dispatch({ type: actions.CHANGE_STATUS, data: obj });
  }
};

export default changeStatus;