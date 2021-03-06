import React, { Component } from 'react';

export default class TextArea extends Component {
  constructor() {
    super();
  }

  updateValue(event) {
    this.props.updateValue(this.props.toUpdate, event.target.value);
  }

  render() {
    return (
      <div>
        <textarea className={this.props.cssclass} placeholder={this.props.placeholderText} rows="4" cols="50" onBlur={this.updateValue.bind(this)} />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
