import * as actions from '../store/actions';

const create = (obj) => {
  return (dispatch, getState) => {
    dispatch({ type: actions.CREATE, data: obj });
  }
};

export default create;