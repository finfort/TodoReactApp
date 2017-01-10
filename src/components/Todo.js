import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions';

import Header from './header';

let Todo = ({todos, dispatch }) => {
    let input;

    return (
        <div>
            <Header />

            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(addTodo(input.value))// not dispatch but use connect 
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