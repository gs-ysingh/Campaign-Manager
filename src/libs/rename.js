import * as actions from '../store/actions';

const rename = (obj) => {
  return (dispatch, getState) => {
    dispatch({ type: actions.RENAME, data: obj });
  }
};

export default rename;