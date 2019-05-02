import * as actions from '../store/actions';

const deleteCampaign = (index) => {
  return (dispatch, getState) => {
    dispatch({ type: actions.DELETE, data: index });
  }
};

export default deleteCampaign;