import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions';



let nextTodoId = 0;
let Todo = ({dispatch }) => {
    let input;

    return (
        <div>
            

            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    //dispatch(addTodo(input.value))// not dispatch but use connect 
                    dispatch({
                        type: 'ADD_TODO',
                        id: nextTodoId++,
                        text: input.value
                    })
                    input.value = ''
                } }>
                    <input ref={node => {
                        input = node
                    } } />
                    <button type="submit">
                        Add Todo
                        </button>
                </form>
            </div>
            <ul>
                {/*this.props.todos.map(todo =>
                    <li
                        key={todo.id}
                        {...todo}
                        
                        ></li>
                )*/}
            </ul>

        </div>
    );
}



export default connect()(Todo);