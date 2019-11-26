import counterpart from 'counterpart';
import React, { Component } from 'react';

export default class MultiLineErrorObject extends Component {

  render() {
    return (
      <div>
      {this.props.lines.map(function(line, i) {
        return (<div key={i}>{counterpart.translate(line.errorCode)}</div>);
      })}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
