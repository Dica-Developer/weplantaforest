import counterpart from 'counterpart';
import React, { Component } from 'react';

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
          <div style={{ marginBottom: 10 + 'px' }}>{counterpart.translate('NEWSLETTER.BODY')}</div>
          <iframe
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            scrolling="no"
            width="100%"
            height="91"
            allowtransparency="true"
            src="https://t924dfe8a.emailsys1a.net/126/2029/86f32163be/subscribe/form.html"
          ></iframe>
        </div>
        <div className="row">
          <div style={{ marginBottom: 10 + 'px' }}>{counterpart.translate('NEWSLETTER.SOCIAL')}</div>
          <div className="col-md-4">
            <a href="https://de-de.facebook.com/iplantatree/">
              <img src="/assets/images/facebook.png" alt={'facebook'} height="80" />
            </a>
          </div>
          <div className="col-md-4">
            <a href="https://twitter.com/iplantatree?lang=de">
              <img src="/assets/images/twitter.png" alt={'twitter'} height="80" />
            </a>
          </div>
          <div className="col-md-4">
            <a href="https://www.youtube.com/channel/UC3N_Y8sxT7HA0fIXRLvSi7A">
              <img src="/assets/images/youtube.jpg" alt={'youtube'} height="80" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
