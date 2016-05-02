import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    return (
<footer id="footer" className="footer">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <button type="button" className="btn btn-default pull-right switch-language" >Sprache ändern</button>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <ul className="list-unstyled site-map">
          <li>
          <h4>Pflanzungen</h4>
          </li>
          <li>
          <a href="#">Pflanzungen</a>
          </li>
          <li>
          <a href="#">Projektflächen</a>
          </li>
          <li>
          <a href="#">Zertifikat</a>
          </li>
          <li>
          <a href="#">Gutschein</a>
          </li>
        </ul>
      </div>
      <div className="col-md-4">
        <ul className="list-unstyled site-map">
          <li>
          <h4>Bestenliste</h4>
          </li>
          <li>
          <a href="#">Alle</a>
          </li>
          <li>
          <a href="#">Privat</a>
          </li>
          <li>
          <a href="#">Firma</a>
          </li>
          <li>
          <a href="#">Non-Profit Org.</a>
          </li>
          <li>
          <a href="#">Schulen</a>
          </li>
          <li>
          <a href="#">Teams</a>
          </li>
        </ul>
      </div>
      <div className="col-md-4">
        <ul className="list-unstyled site-map">
          <li>
          <h4>Unternehmen</h4>
          </li>
          <li>
          <a href="#">Idee</a>
          </li>
          <li>
          <a href="#">Kodex</a>
          </li>
          <li>
          <a href="#">Team</a>
          </li>
          <li>
          <a href="#">Partner</a>
          </li>
          <li>
          <a href="#">Finanzen</a>
          </li>
          <li>
          <a href="#">Jobs</a>
          </li>
          <li>
          <a href="#">Presse</a>
          </li>
        </ul>
      </div>
    </div>
    <p>Copyright © 2007-2016 I Plant A Tree. All rights reserved.</p>
    </div>
    </footer>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */ 

