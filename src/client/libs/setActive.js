import * as actions from '../store/actions';

const setActive = (index) => {
  return (dispatch, getState) => {
    dispatch({ type: actions.SET_ACTIVE, data: index });
  }
};

export default setActive;