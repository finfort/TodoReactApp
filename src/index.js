import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import { composeWithDevTools } from 'remote-redux-devtools';

import 'bootstrap/dist/css/bootstrap.css';

import requireAuth from './components/require_authentication';
import App from './components/app';
import HomePage from './components/homePage';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
// import Resources from './components/resources';
// import TodoComponent from './components/TodoComponent';
import Users from './components/admin/users';
import UserSearch from './components/admin/user-search';

import Mine from './components/Mine';
import NotFound from './components/not-found';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import Async from './middlewares/async';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(Async, reduxThunk)
));

//TODO
// FACEBOOK authorization
// google coordinates selection and memorization on map
// debugging from vs code
// serving react from express


// auto sign in user
const token = localStorage.getItem('token');
if (token) {
  // if we have token here log user in 
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} >
        <IndexRoute component={HomePage} />
        <Route path="mine/:mineId" component={requireAuth(Mine)} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        {/*<Route path="resources" component={requireAuth(Resources)} />*/}
        {/*<Route path="todo" component={TodoComponent} />*/}
        {/*<Route path="users" component={UserList} />*/}

        {/*<Route path="/admin" component={App}>*/}
        <Route path="admin/users" component={Users} />
        <Route path="/admin" component={App}>
          <Route path="users1" component={UserSearch} />
          {/*<Route path="users/:id" component={UserDetails} />*/}
          <Route path="*" component={NotFound} />
        </Route>
      
      <Route path="*" component={NotFound} />
      </Route>

    </Router>
  </Provider>
  , document.querySelector('.app-body'));
