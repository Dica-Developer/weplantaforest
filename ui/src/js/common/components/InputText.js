import React, { Component } from 'react';

export default class InputText extends Component {
  constructor() {
    super();
  }

  updateValue(event) {
    this.props.updateValue(this.props.toUpdate, event.target.value);
  }

  render() {
    return (
      <div>
        <input
          id={this.props.id}
          value={this.props.value}
          className={this.props.cssclass}
          placeholder={this.props.placeholderText}
          type={this.props.type ? this.props.type : 'text'}
          onChange={this.updateValue.bind(this)}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
