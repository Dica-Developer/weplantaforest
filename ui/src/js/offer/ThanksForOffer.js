import counterpart from 'counterpart';
import React, { Component } from 'react';
import IconButton from '../common/components/IconButton';


require('./projectOffer.less');

export default class ProjectOfferPage extends Component {

  constructor() {
    super();

  }

  setThankYou(){
    this.props.setThankYou(false);
  }

  render() {
    return (
      <div className="col-md-12">
        <h2 className="thanks">{counterpart.translate('THANKS_FOR_OFFER')}</h2>
        <br/>
        <div className="align-center">
          <IconButton text={counterpart.translate('ONE_MORE_OFFER')} glyphIcon="glyphicon-backward" onClick={this.setThankYou.bind(this)}/>
        </div>
        <br/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
