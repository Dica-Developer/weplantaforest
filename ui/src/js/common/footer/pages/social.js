import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

require("./social.less");

export default class Social extends Component {
  render() {
    var that = this;
    return (
      <div className="container paddingTopBottom15 social">
          <div className="row">
            <div className="col-md-12">
              <h2>Social</h2>
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
