const initialState = {
  loading: false,
  newShow: {},
  error: '',
};

const newShow = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCH_NEW_SHOW': {
      console.log('Start fetch');
      return {
        ...state,
        loading: true,
      };
    }
    case 'FETCH_SUCCESS_NEW_SHOW': {
      return {
        ...state,
        loading: false,
        newShow: {...action.newShow},
        error: '',
      };
    }
    case 'FETCH_ERROR_NEW_SHOW': {
      return {
        ...state,
        loading: false,
        error: action.err,
      };
    }
    default:
      return state;
  }
};

export default newShow;
