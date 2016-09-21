import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

export default class InputText extends Component {
  updateValue(event) {
    this.props.updateValue(this.props.toUpdate, event.target.checked);
  }

  render() {
    return (
      <div>
      <input type="checkbox" onChange={this.updateValue.bind(this)} checked={this.props.value}/> {this.props.text}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
