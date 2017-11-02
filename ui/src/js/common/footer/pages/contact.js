import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

require("./contact.less");

export default class Contact extends Component {
  render() {
    var that = this;
    return (
      <div className="container paddingTopBottom15 contact">
          <div className="row">
            <div className="col-md-12">
              <h2>Kontakt</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">

            </div>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
