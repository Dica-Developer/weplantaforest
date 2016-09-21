import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

export default class RegistrationDone extends Component {

  render() {
    return (
      <div className="col-md-12 registrationDone">
        <h2>Du wurdest angemeldet!</h2>
        <div>
         Um deinen Nutzer zu aktivieren haben wir dir einen Aktivierungslink an die angegebene E-Mail Adresse geschickt.
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
