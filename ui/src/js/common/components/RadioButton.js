import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

require('./radioButton.less');

export default class RadioButton extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="radioButton">
      <input type="radio" checked={this.props.checked} id={this.props.id} value={this.props.value} onChange={this.props.onChange.bind(this)}/>
        <label htmlFor={this.props.id}>{this.props.text}</label>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
