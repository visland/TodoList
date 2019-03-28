import React, { Component } from 'react';
import { NON, PRIORITY } from './constants';

class UnfinishedTodoListHeader extends Component {
  render() {
    const { handleOrderOptionChange } = this.props;
    return (
    <div className="row">
      <h5 className="col">Todos</h5>
      {/* https://www.freecodecamp.org/forum/t/react-onclick-get-li-clicked-solved/68112 */}
      <div className="col">
        <div className="float-right" >
          <select 
            className="form-control select-primary"  
            id="selector" 
            onChange={event => handleOrderOptionChange(event)}
          >
            <option value={NON}> Default Order </option>
            <option value={PRIORITY}> Ordered by {PRIORITY} </option>
          </select>
        </div>
      </div>
    </div>
  );
  }
}
export default UnfinishedTodoListHeader;