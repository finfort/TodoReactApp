import { combineReducers } from 'redux';

import authenticationReducer from './authentication';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import users from './users';

const rootReducer = combineReducers({
  authenticated: authenticationReducer,
  todos,
  visibilityFilter,
  users
});

export default rootReducer;
