import React from 'react'
import Footer from './todo/Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

import Header from './header';

const TodoContainer = () => (
  <div>
    <Header />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default TodoContainer