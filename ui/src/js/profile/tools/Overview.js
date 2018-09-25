import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Link
} from 'react-router';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';

import IconButton from '../../common/components/IconButton';
import ButtonBar from './ButtonBar';

export default class Overview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overview">
        <div className="col-md-12">
          <h1>Tools</h1>
        </div>
        <div className="col-md-4">
          <a role="button" onClick={() => { this.props.switchTo('widgets', 1); }} className="link-without-deco">
            <img src="/assets/images/widgets.png" alt="widgets" width="250" height="350"/>
            <h3>{counterpart.translate('WIDGETS')}</h3>
            <div className="desc">
              <p>
                <span className="bold">Tue Gutes und sprich darüber!</span><br/>Wir generieren Dir ein paar Zeilen Code, den Du nur in Deine WebSeite einfügen brauchst, um Dein Engagement auf iplantatree.org der Welt zu zeigen.<br/>
                  Kopieren - Einfügen - Fertig.
              </p>
            </div>
          </a>
        </div>
        <div className="col-md-4">
          <a role="button" onClick={() => { this.props.switchTo('certificates', 2); }} className="link-without-deco">
            <img src="/assets/images/certificate.jpg" alt="certificate" width="250" height="350"/>
            <h3>{counterpart.translate('CERTIFICATES')}</h3>
            <div className="desc">
              <p>
                <span className="bold">Dein Beitrag überzeugt!</span><br/>Erstelle ganz einfach dein eigenes Zertifikat im PDF-Format mit individuellem Text (wie z. B. einer Widmung)
              </p>
            </div>
          </a>
        </div>
        <div className="col-md-4">
          <a role="button" onClick={() => { this.props.switchTo('banner', 3); }} className="link-without-deco">
            <img src="/assets/images/banner.png" alt="banner" width="250" height="350"/><br/>
            <h3>{counterpart.translate('BANNER')}</h3>
            <div className="desc">
              <p>
                <span className="bold">Mit Engagement werben!</span><br/>IPAT-Banner in gängigen Größen für Deine Homepage.
                </p>
            </div>
          </a>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
