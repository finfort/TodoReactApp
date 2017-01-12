import axios from 'axios';
import {
    CHANGE_AUTH,
    FETCH_USERS
} from './types';

export function authenticate(isLoggedIn){
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


export function fetch_users (){
  const request = axios.get('https://jsonplaceholder.typicode.com/users');
  return { 
    type: FETCH_USERS,
    payload: request
  }
}