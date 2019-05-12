import * as actions from '../store/actions';

const comment = (obj) => {
  return (dispatch, getState) => {
    dispatch({ type: actions.COMMENT, data: obj });
  }
};

export default comment;