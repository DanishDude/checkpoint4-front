const initialState = {
  loading: false,
  list: [],
  error: '',
};

const shows = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCH_SHOWS': {
      console.log('Start fetch');
      return {
        ...state,
        loading: true,
      };
    }
    case 'FETCH_SUCCESS_SHOWS': {
      return {
        ...state,
        loading: false,
        list: [...action.shows],
        error: '',
      };
    }
    case 'FETCH_ERROR_SHOWS': {
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

export default shows;
