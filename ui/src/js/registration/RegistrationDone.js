import counterpart from 'counterpart';
import React, { Component } from 'react';

export default class RegistrationDone extends Component {
  render() {
    return (
      <div className="registrationDone">
        <div className="row">
          <div className="col-md-12 align-left">
            <h1>{counterpart.translate('SIGNUP_DONE')}</h1>
            <p>{counterpart.translate('SIGNUP_DONE_TEXT')}</p>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
