import React, { Component } from 'react';

require('./iconButton.less');

export default class IconButton extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="iconButton">
        <a role="button" onClick={this.props.onClick.bind(this)}>
          <span className={'glyphicon ' + this.props.glyphIcon} aria-hidden="true" title={this.props.title}></span>
          <span>{this.props.text}</span>
        </a>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
