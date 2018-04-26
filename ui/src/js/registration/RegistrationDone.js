import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

export default class RegistrationDone extends Component {

  render() {
    return (
      <div className="registrationDone">
        <div className="row">
          <div className="col-md-12 align-left">
            <h1>Du wurdest angemeldet!</h1>
            <p>Um deinen Nutzer zu aktivieren, haben wir dir einen Aktivierungslink an die angegebene E-Mail Adresse geschickt.</p>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
