import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; // import for redux-form

import authenticationReducer from './authentication';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import users from './users';
import home from './home';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  todos,
  visibilityFilter,
  users,
  form,
  home
});

export default rootReducer;
