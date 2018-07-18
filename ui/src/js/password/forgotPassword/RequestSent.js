import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';

export default class RequestSent extends Component {

  render() {
    return (
      <div className="col-md-12">
        <h1>{counterpart.translate('PASSWORD_CAN_BE_RESETTED')}</h1>
          {counterpart.translate('PASSWORD_CAN_BE_RESETTED_TEXT')}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
