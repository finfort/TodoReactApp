import { combineReducers } from 'redux';

import authenticationReducer from './authentication';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  authenticated: authenticationReducer,
  todos,
  visibilityFilter
});

export default rootReducer;
