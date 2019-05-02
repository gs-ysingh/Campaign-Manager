import * as actions from './actions';

const initialState = {
  activeIndex: 1,
  userName: 'Yogesh',
  data: {
    '1': {
      name: 'Campaign 1 - Emails',
      createdAt: 1556718487098,
      createdBy: 'Yogesh',
      isRunning: false,
      userActions: [
        {
          name: 'Created',
          by: 'Yogesh',
          label: 'Campaign Created',
        },
        {
          name: 'Added',
          by: 'Manish',
          label: 'Comment Added',
          value: 'Good Luck',
        },
        {
          name: 'Renamed',
          by: 'Manish',
          label: 'Campaign renamed',
          prevValue: 'Campaign 1 - Email',
          currentValue: 'Campaign 1 - Emails',
        },
        {
          name: 'Paused',
          by: 'Yogesh',
          label: 'Campaign Paused',
        }
      ]
    },
    '2': {
      name: 'Campaign 2 - Push Notification',
      createdAt: 1556735440663,
      createdBy: 'Manish',
      isRunning: false,
      userActions: [
        {
          name: 'Created',
          by: 'Manish',
          label: 'Campaign Created',
        },
        {
          name: 'Added',
          by: 'Yogesh',
          label: 'Comment Added',
          value: 'Hello',
        }
      ]
    }
  }
};

const reducer = (state = initialState, action) => {
  let key = null;
  let obj = null;
  switch(action.type) {
    case actions.SET_ACTIVE:
      return { ...state, activeIndex: action.data };
    case actions.CREATE:
      const prevData = state.data;
      const currentData = action.data;
      const data = { ...prevData, ...currentData };
      return { ...state, data: data };
    case actions.CHANGE_STATUS:
      key = action.data.key;
      obj = action.data;
      delete obj.key;
      state.data[key].userActions = state.data[key].userActions.concat(obj);
      state.data[key].isRunning = !state.data[key].isRunning;
      return state;
    case actions.DELETE:
      delete state.data[action.data];
      return state;
    case actions.RENAME:
      key = action.data.key;
      obj = action.data;
      delete obj.key;
      state.data[key].userActions = state.data[key].userActions.concat(obj);
      state.data[key].name = obj.currentValue;
      return state;
    case actions.COMMENT:
      key = action.data.key;
      obj = action.data;
      delete obj.key;
      state.data[key].userActions = state.data[key].userActions.concat(obj);
      return state;
    default:
      return state;
  }
}

export default reducer;