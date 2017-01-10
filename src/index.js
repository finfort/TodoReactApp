import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';


import App from './components/app';
import Resources from './components/resources';
import Todo from './components/Todo';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} >
      <Route path="/" component={App} />
        <Route path="resources" component={Resources} />
        <Route path="todo" component={Todo} />
    </Router>
  </Provider>
  , document.querySelector('.container-fluid'));
