import { combineReducers } from 'redux';

import shows from './shows';
import programes from './programe'

const allReducers = combineReducers({
  shows,
  programes,
});

export default allReducers