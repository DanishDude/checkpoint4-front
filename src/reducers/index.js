import { combineReducers } from 'redux';

import shows from './shows';

const allReducers = combineReducers({
  shows,
});

export default allReducers