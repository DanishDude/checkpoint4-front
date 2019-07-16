const initialState = {
  loading: false,
  list: [],
  error: '',
};

const worksite = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCH_START_FETCH_SHOWS': {
      console.log('Start fetch');
      return {
        ...state,
        loading: true,
      };
    }
    case 'FFETCH_SUCCESS_SHOW': {
      return {
        ...state,
        loading: false,
        list: [...action.show],
        error: '',
      };
    }
    case 'FETCH_ERROR_SHOW': {
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

export default worksite;
