import React, {Component} from 'react';
import {Link} from 'react-router';

require("./footer.less");

export default class Footer extends Component {
  render() {
    return (
      <div className='row footer'>
        <div className='container '>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-4">
                <Link to="/">
                  HILF UNS
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/">
                  LINKS
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/">
                  AGB
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-4">
                <Link to="/">
                IMPRESSUM
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/">
                  KONTAKT
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/">
                  SITEMAP
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <p className="copyRight">Copyright © 2007-2016 I Plant A Tree. Alle Rechte vorbehalten.</p>
          </div>

        </div>
      </div>
    );
  }
} / * vim : set softtabstop = 2 : shiftwidth = 2 : expandtab * /
