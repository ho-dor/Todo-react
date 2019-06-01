import React, { Component } from 'react';
import Navbar from './Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from 'axios';

class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this)
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this)
        this.state = {
            todo_title: "",
            todo_desc:""
        };
    }

    componentDidMount() {
        Axios.get("http://localhost:4000/todos/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_title: response.data.todo_title,
                    todo_desc: response.data.todo_desc
                })
            }

      )
    }

    onChangeTodoTitle = event => {
        this.setState({
            todo_title:event.target.value,
        })
    }

    onChangeTodoDescription = event => {
        this.setState({
            todo_desc:event.target.value,
        })
    }

    onSubmit = event => {
        event.preventDefault();

        let todo = {
            todo_title: this.state.todo_title,
            todo_desc: this.state.todo_desc
        }
        Axios.post("http://localhost:4000/todos/update/" + this.props.match.params.id, todo).then(res =>
            console.log(res.data)
        );
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div>
                    <h3>Update Todo</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.todo_title}
                                onChange={this.onChangeTodoTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.todo_desc}
                                onChange={this.onChangeTodoDescription}
                            />
                        </div>
                            <br />
                            <div className="form-group">
                                <input type="submit" value="Update Todo" className="btn btn-primary" />
                            </div>
                    </form>
                </div>
            </React.Fragment>
            

        );
    }
}

export default EditTodo;