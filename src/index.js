import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { composeWithDevTools } from 'remote-redux-devtools';

import requireAuth from './components/require_authentication';
import App from './components/app';
import Resources from './components/resources';
import TodoComponent from './components/TodoComponent';
import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware()(createStore);
const createStoreWithMiddleware = createStore(reducers, /* preloadedState, */ composeWithDevTools(
  applyMiddleware(),
  //applyMiddleware(...middleware),
  //// other store enhancers if any
));

ReactDOM.render(
  //createStoreWithMiddleware(reducers)
  <Provider store={createStoreWithMiddleware}>
    <Router history={browserHistory} >
      <Route path="/" component={App} />
      <Route path="resources" component={requireAuth(Resources)} />
      <Route path="todo" component={TodoComponent} />
    </Router>
  </Provider>
  , document.querySelector('.container-fluid'));
