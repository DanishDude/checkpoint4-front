const initialState = {
  loading: false,
  list: [],
  error: '',
};

const programes = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCH_PROGRAMES': {
      console.log('Start fetch');
      return {
        ...state,
        loading: true,
      };
    }
    case 'FETCH_SUCCESS_PROGRAMES': {
      return {
        ...state,
        loading: false,
        list: [...action.programes],
        error: '',
      };
    }
    case 'FETCH_ERROR_PROGRAMES': {
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

export default programes;
