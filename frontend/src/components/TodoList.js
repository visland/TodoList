import React, { Component } from 'react';
import Todo from './Todo';
import AppModal from './Modal';
import axios from "axios";
import UnifinishedTodoListHeader from './UnfinishedTodoListHeader'
import '../style/todo_list.css'
import { NON, PRIORITY } from './constants';

class TodoList extends Component {
  state = {
    todos: [],
    id:"",
    title:"",
    content:"",
    finished: false,
    visible: false,
    orderOption: NON,
  }

  componentDidMount() {
    this.refreshTodos();
  }

  refreshTodos = () => {
    axios
      .get("http://127.0.0.1:8000/api/todos")
      .then(response => 
        this.setState({
          todos: response.data,
        })
      );
  };

  renderUnfinishedTodoList = () => {
    return this.state.todos
        .filter(item => !item.finished)
        // https://www.w3schools.com/js/js_array_sort.asp
        // Please note that this implementation is not decent enough because
        // it sorts an array every time it renders. Ideally we want two have
        // two different arrays in state: unfinished and finished ones. Thus
        // we could do the sorting for `unfinished` whenever
        // `handleOrderOptionChange` is called instead of doing it here.
        .sort((lhs, rhs) => {
          const { orderOption } = this.state;
          switch(orderOption) {
            case NON:
              // Sort by ID's increasing order.
              return lhs.id - rhs.id;
            case PRIORITY:
              // Sort by priority's increasing order. That being said, the
              // smaller (higher) priority comes first.
              return lhs.priority - rhs.priority;
            default:
              console.error('Unexpected order option: ', orderOption);
              return -1;
          }
        })
        .map((todo, idx) => (
          <Todo
            key={idx}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            priority={todo.priority}
            finished={todo.finished}
            removeTodo={this.removeTodo}
            updateTodo={this.updateTodo}
          />
        ));
  }

  renderFinishedTodoList = () => {
    return this.state.todos
      .filter(item => item.finished === true)
      .map((todo, idx) => (
        <Todo
          key={idx}
          id={todo.id}
          title={todo.title}
          content={todo.content}
          priority={todo.priority}
          finished={todo.finished}
          removeTodo={this.removeTodo}
          updateTodo={this.updateTodo}
        />)
      );
  }

  addTodo = todo => {
    this.setState({
      todos: [...this.state.todos, todo]
    });
  }

  removeTodo = id => {
    this.setState({
      todos: this.state.todos.filter(item => item.id !== id)
    });
  }

  updateTodo = todo => {
    this.refreshTodos();
  }

  showModal = () => {
    this.setState({ visible: true })
  }
  
  closeModal = () => {
    this.setState({visible: false});
  }

  handleOrderOptionChange = event => {
    this.setState({
      orderOption: event.target.value
    });
  }

  render() {
    return (
      <div className="container">
          <div className="row" id="headline">
           <h2 className="col-lg-5" id="title">My Todo List</h2>
           <div className="col-lg-3" id="main-btm">
            <button
              type="submit"
              id="main-btn"
              className="btn btn-primary btn-embossed btn-wid btn-hg"
              onClick={this.showModal}
            >
              Create a New Todo!
            </button>
          </div>
          </div>
          <div className="row">
          <div className="col-lg-7">
            <UnifinishedTodoListHeader
              orderOption={this.state.orderOption}
              handleOrderOptionChange={this.handleOrderOptionChange}
            />
            {this.renderUnfinishedTodoList()}
          </div>

          <div className="col-md">
            <h5>Finished</h5>
            {this.renderFinishedTodoList()}
          </div>
        </div>

        {this.state.visible && (
          <AppModal
            visible={this.state.visible}
            closeModal={this.closeModal}
            id={this.props.id}
            title={this.props.title}
            content={this.props.content}
            finished={this.props.finished}
            addTodo={this.addTodo}
            modalTitle="Add New Todo"
          />
        )}
      </div>
    );
  }
}

export default TodoList;
