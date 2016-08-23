import React, {
  Component
} from 'react';
import Boostrap from 'bootstrap';

import Co2Bar from './Co2Bar';
import ButtonBar from './ButtonBar';

export default class Header extends Component {

  render() {

    return (
        <div className="container header">
          <div className="row">
            <div className="col-md-4"><Co2Bar/></div>
            <div className="col-md-4 outline-logo">
              <img src="/assets/images/outline_logo.png" alt="selbst pflanzen" width="200" height="200"/></div>
            <div className="col-md-4"><ButtonBar/></div>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
