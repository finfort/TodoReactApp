import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  CHANGE_AUTH,
  FETCH_USERS
} from './types';

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

let nextTodoId = 0
export const addTodo = (text) => {
  //return simple object what to do with state
  //change data only through actions
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}


export function fetch_users() {
  const request = axios.get('https://jsonplaceholder.typicode.com/users');
  return {
    type: FETCH_USERS,
    payload: request
  }
}

const ROOT_URL = 'http://localhost:3090'; // api url

//action creator should always return an object but
// with redux thunk it returns a function
// function(redux-thunk) get direct access to dispatch method (return function(dispacth) {})
export function signinUser({email, password}) {
  return function (dispatch) {
    //Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password }) //es6 String Substitution
      .then(response => {
        //response from server
        // if request is good...

        // - Update state to indicate is authenticated

        // - Save JWT token

        // -redirect to the route '/resources' protected route
        browserHistory.push('/resources');
      })
      .catch(() => {

        // if request is bad

        // - show an error to ther user
      })

  }

}