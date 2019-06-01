import React, { Component } from 'react';
import Navbar from './Navbar';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const Todo = props => (
        <tr>
            <td>{props.todo.todo_title}</td>
        <td>{props.todo.todo_desc}</td>
        <Link to={"/update/" + props.todo._id}>
            <td>Edit</td>
        </Link>
        </tr>
)

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos:[]
        };
    }

    componentDidMount() {
        Axios.get("http://localhost:4000/todos/").then(res => {
            this.setState({
                todos: res.data
            })
        })
    }

    componentDidUpdate() {
        Axios.get("http://localhost:4000/todos/").then(res => {
            this.setState({
                todos: res.data
            })
        })
    }

    todoList() {
        return (
            this.state.todos.map((todo, i) => {
                return <Todo todo={todo} key={i} />
            })
        );
    }

    

    render() {
        return (
            <React.Fragment>
                <Navbar/>
                    <div>
                        <h3>Todos List</h3>
                        <table className="table table-striped" style={{ marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.todoList()}
                            </tbody>
                        </table>
                    </div>
            </React.Fragment>
        );
    }
}

export default TodoList;