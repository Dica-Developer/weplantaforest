import React, { Component } from 'react';

export default class InputText extends Component {
  updateValue(event) {
    this.props.updateValue(this.props.toUpdate, event.target.checked);
  }

  render() {
    return (
      <div>
        <label><input type="checkbox" onChange={this.updateValue.bind(this)} checked={this.props.value}/> <span dangerouslySetInnerHTML={{__html: this.props.text}}></span></label>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
