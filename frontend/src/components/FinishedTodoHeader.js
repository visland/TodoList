import React, { Component } from 'react';

class FinishedTodoHeader extends Component {
  render() {
    const { title, handleDelete } = this.props;
    return (
      <>
        <span className="font-weight-lighter text-muted">
          <del>{title}</del>
        </span>
        <div className="float-right">
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

export default FinishedTodoHeader ;