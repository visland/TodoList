import React, { Component } from 'react';
import axios from "axios";
import AppModal from './Modal';
import FinishedTodoHeader from './FinishedTodoHeader';
import UnfinishedTodoHeader from './UnfinishedTodoHeader';
import '../style/todo.css'

class Todo extends Component {
  state = {
    visible: false,
  }

  handleDelete = todo => {
    const { removeTodo } = this.props;
    axios
      .delete(`http://127.0.0.1:8000/api/todos/${this.props.id}`)
      .then(response => {
        removeTodo(this.props.id)
      });
  }

  onCheck = event => {
    const { checked } = event.target;
    const { title, content, id, priority } = this.props;
    axios
      .put(`http://127.0.0.1:8000/api/todos/${id}/`,
          {id:id, title: title, content: content, finished: checked, priority:priority})
      .then(response => {
        this.props.updateTodo();
      });
  }

  showModal = () => {
    this.setState({ visible: true })
  }
  
  closeModal = () => {
    this.setState({visible: false});
  }

  render() {
    const {
      title,
      content,
      priority,
    } = this.props;

    return (
      <div className="card">
        <h6 className="card-header">
          <input
            type="checkbox"
            name="finished"
            checked={this.props.finished}
            onChange={this.onCheck} 
          />
          &nbsp;&nbsp;&nbsp;
          {this.props.finished ? 
            <FinishedTodoHeader
              title={title}
              handleDelete={this.handleDelete}
            /> :
            <UnfinishedTodoHeader
              title={title}
              priority={priority}
              showModal={this.showModal}
              handleDelete={this.handleDelete}
            />
          }
        </h6>
        <div className="card-body disabled">
          {this.props.finished ? 
            <p className="font-weight-lighter text-muted">
              <del>{content}</del>
            </p> :
            <p>{content}</p>
          }
        </div>
        {this.state.visible && (
          <AppModal
            visible={this.state.visible}
            closeModal={this.closeModal}
            id={this.props.id}
            title={this.props.title}
            content={this.props.content}
            priority={priority}
            modalTitle="Edit Todo"
          />
        )}
      </div>
    );
  }
}

export default Todo;