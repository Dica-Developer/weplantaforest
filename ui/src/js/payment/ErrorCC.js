import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

export default class ErrorCC extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var content;
    if(this.state.submitted){
      content = <div className="col-md-12">
        <h1>Zahlung erfolgreich abgeschlossen!</h1>
          Vielen Dank für deine Spende!
      </div>;
    }else{
      content = '';
    }

    return (
      <div className="container paddingTopBottom15">
        <div className="row paymentPage">
          Ein Fehler ist aufgetreten
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
