import {
    CHANGE_AUTH
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


