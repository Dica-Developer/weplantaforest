import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import Boostrap from 'bootstrap';

export default class Tools extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="row tools">
        <div className="col-md-12">
          <h2>Tools</h2>
        </div>
        <div className="col-md-3"><img src="/assets/images/certificate.jpg" alt="widgets" width="250" height="350"/><br/>
          <button type="button" className="btn btn-default btn-circle">
            <i className="glyphicon glyphicon-forward"></i>
            <span>WIDGETS</span>
          </button>
          <p>
            <span className="bold">Tue Gutes und sprich darüber!</span><br/>Wir generieren Dir ein paar Zeilen Code, den Du nur in Deine WebSeite einfügen brauchst, um Dein Engagement auf iplantatree.org der Welt zu zeigen.<br/>
            Kopieren - Einfügen - Fertig.
          </p>
        </div>
        <div className="col-md-3"><img src="/assets/images/certificate.jpg" alt="certificate" width="250" height="350"/><br/>
          <button type="button" className="btn btn-default btn-circle">
            <i className="glyphicon glyphicon-forward"></i>
            <span>ZERTIFIKATE</span>
          </button>
          <p>
            <span className="bold">Dein Beitrag überzeugt!</span><br/>Erstelle ganz einfach dein eigenes Zertifikat im PDF-Format mit individuellem Text (wie z. B. einer Widmung)
          </p>
        </div>
        <div className="col-md-3"><img src="/assets/images/receipt.jpg" alt="receipt" width="250" height="350"/><br/>
          <button type="button" className="btn btn-default btn-circle">
            <i className="glyphicon glyphicon-forward"></i>
            <span>QUITTUNGEN</span>
          </button>
          <p>
            <span className="bold">Ganz offiziell!</span><br/>Hier kannst Du Deine Spenden als PDF-Dokumente einsehen und herunterladen.
          </p>
        </div>
        <div className="col-md-3"><img src="/assets/images/receipt.jpg" alt="banner" width="250" height="350"/><br/>
          <button type="button" className="btn btn-default btn-circle">
            <i className="glyphicon glyphicon-forward"></i>
            <span>BANNER</span>
          </button>
          <p>
            <span className="bold">Mit Engagement werben!</span><br/>IPAT-Banner in gängigen Größen für Deine Homepage.
          </p>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
