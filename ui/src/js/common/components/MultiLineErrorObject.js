import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';

export default class MultiLineErrorObject extends Component {

  render() {
    return (
      <div>
      {this.props.lines.map(function(line, i) {
        return (<div key={i}>{counterpart.translate("errors." + line.errorCode)}</div>);
      })}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
