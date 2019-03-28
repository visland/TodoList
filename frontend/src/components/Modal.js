import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from "axios";

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height:'57%'
  }
};

class AppModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: this.props.visible,
      inputTitle: this.props.title,
      inputContent: this.props.content,
      priority: this.props.priority,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  onSubmit = event => {
    const { inputTitle, inputContent, finished, priority } = this.state;
    const { closeModal, id } = this.props;
 
    if (id) {
      axios
          .put(`http://127.0.0.1:8000/api/todos/${id}/`,
              {'title': inputTitle, 'content': inputContent, 'finished': finished, 'priority': priority})
          .then(response => {
            this.props.updateTodo(response.data);
            closeModal();
          });
    } else {
      axios
          .post("http://127.0.0.1:8000/api/todos/",
              {'title': inputTitle, 'content': inputContent, 'finished': finished, 'priority': priority})
          .then(response => {
            this.props.addTodo(response.data);
            closeModal();
          });
    }
  }

  onChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onPriorityChange = pri => {
    this.setState({
      'priority': pri
    });
  }

  render() {
    const { closeModal } = this.props;
    const { priority } = this.state;
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
      >
        <h2>{this.props.modalTitle}</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <h5 htmlFor="title">Title</h5>
            <input 
              type="text"
              name="inputTitle"
              defaultValue={this.props.title}
              onChange={this.onChange} 
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-group">
            <h5 htmlFor="content">Content</h5>
            <textarea 
              type="text"
              name="inputContent"
              defaultValue={this.props.content}
              onChange={this.onChange} 
              className="form-control form-control-lg"
              rows="3"
            />
          </div>
          <div className="form-group">
            <h5 htmlFor="priority">Priority</h5>
            <div className="radio">
              <p>
                <input 
                  type="radio"
                  name="priority"
                  checked={priority === 0}
                  onChange={_ => this.onPriorityChange(0)} 
                  />
                  &nbsp;Urgent&nbsp;&nbsp;
                  <input 
                    type="radio" 
                    name="priority"
                    checked={priority === 1} 
                    onChange={_ => this.onPriorityChange(1)} 
                  />
                  &nbsp;Normal&nbsp;&nbsp;
                  <input 
                    type="radio"
                    name="priority"
                    checked={priority === 2}
                    onChange={_ => this.onPriorityChange(2)}
                  />
                  &nbsp;Low priority&nbsp;&nbsp;
                  </p>
              </div>
          </div>
          <div className="float-right">
            <button 
              type="submit"
              className="btn btn-primary btn-embossed"
            > 
            Submit 
            </button>
            &nbsp;&nbsp;
            <button 
              onClick={() => closeModal()}
              className="btn btn-default"
            >
            Close
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}
export default AppModal;