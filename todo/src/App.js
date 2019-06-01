import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodoList from './component/TodoList';
import createTodoList from './component/CreateTodo';
import editTodoList from './component/EditTodo';
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={TodoList} />
                <Route path='/add' component={createTodoList} />
                <Route path='/update/:id' component={editTodoList}/>
            </Switch>
        </Router>
  );
}

export default App;
