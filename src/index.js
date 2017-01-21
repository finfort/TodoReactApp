import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import { composeWithDevTools } from 'remote-redux-devtools';

import requireAuth from './components/require_authentication';
import App from './components/app';
import HomePage from './components/homePage';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Resources from './components/resources';
import TodoComponent from './components/TodoComponent';
import UserList from './components/user_list';
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


  // auto sign in user
  const token = localStorage.getItem('token');
  if(token){
    // if we have token here log user in 
    store.dispatch({type: AUTH_USER});
  }

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} >
        <IndexRoute component={HomePage}/>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/resources" component={requireAuth(Resources)} />
        <Route path="/todo" component={TodoComponent} />
        <Route path="/users" component={UserList} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
