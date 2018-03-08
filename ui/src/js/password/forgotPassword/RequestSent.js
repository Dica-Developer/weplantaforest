import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

export default class RequestSent extends Component {

  render() {
    return (
      <div className="col-md-12">
        <h1>Passwort kann nun zurückgesetzt werden!</h1>
          Wir haben dir eine Mail geschickt, welche einen Link enthält, mit dem du dein Passwort zurücksetzen kannst.
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
