import React, { Component } from 'react';

class UnfinishedTodoHeader extends Component {
  render() {
    const {
      title,
      priority,
      showModal,
      handleDelete,
    } = this.props;
  
    const initCircle = priority => {
      switch (priority) {
        case 0:
          return <span className="dot red" />;
        case 1:
          return <span className="dot yellow" />;
        case 2:
          return <span className="dot green" />;
      }
    };
    const priorityCircle = initCircle(priority);

    return (
      <>
        <span id="todo-title">
          {title}&nbsp;{priorityCircle} 
        </span>
        <div className="float-right">
          <button 
            type="button" 
            className="btn btn-primary btn-sm" 
            data-toggle="modal" 
            onClick={showModal}
          >
            Edit
          </button>
          &nbsp;&nbsp;
          <button
            onClick={handleDelete}
            className="btn btn-default btn-sm"
          >
            Delete
          </button>
        </div>
      </>
    );
  }
}
export default UnfinishedTodoHeader;