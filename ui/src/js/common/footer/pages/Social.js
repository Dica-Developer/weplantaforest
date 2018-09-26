import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

import counterpart from 'counterpart';

require('./social.less');

export default class Social extends Component {
  render() {
    var that = this;
    return (
      <div className="container paddingTopBottom15 social">
          <div className="row">
            <div className="col-md-12">
              <h1>{counterpart.translate('FOOTER_PAGES.SOCIAL')}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <a href="https://de-de.facebook.com/iplantatree/">
                <img src="/assets/images/facebook.png" alt={'facebook'} height="80"/>
              </a>
            </div>
            <div className="col-md-4">
              <a href="https://twitter.com/iplantatree?lang=de">
                <img src="/assets/images/twitter.png" alt={'twitter'} height="80"/>
              </a>
            </div>
            <div className="col-md-4">
              <a href="https://www.youtube.com/channel/UC3N_Y8sxT7HA0fIXRLvSi7A">
                <img src="/assets/images/youtube.jpg" alt={'youtube'} height="80"/>
              </a>
            </div>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
