import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { composeWithDevTools } from 'remote-redux-devtools';

import requireAuth from './components/require_authentication';
import App from './components/app';
import Signin from './components/auth/signin';
import Resources from './components/resources';
import TodoComponent from './components/TodoComponent';
import UserList from './components/user_list';
import reducers from './reducers';

import Async from './middlewares/async';
import reduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(Async, reduxThunk)(createStore);
// const createStoreWithMiddleware = createStore(reducers, /* preloadedState, */ composeWithDevTools(
//   applyMiddleware(),
//   //applyMiddleware(...middleware),
//   //// other store enhancers if any
// ));

ReactDOM.render(
  //createStoreWithMiddleware
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} >
      <Route path="/" component={App} >
        <Route path="/signin" component={Signin} />
        <Route path="/resources" component={requireAuth(Resources)} />
        <Route path="/todo" component={TodoComponent} />
        <Route path="/users" component={UserList} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
