import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {Link, browserHistory} from 'react-router';
import counterpart from 'counterpart';

import SvgButton from '../common/components/SvgButton';
import IconButton from '../common/components/IconButton';

require('./bottomPart.less');

export default class BottomPart extends Component {

  switchToOfferProjectPage() {
    browserHistory.push('/projectOffer');
  }


  render() {
    return (
      <div className="bottomPart">
        <div className="button-and-price">
          <div className="price">
            <span>{counterpart.translate('PRICE_TOTAL')}:&nbsp;{Accounting.formatNumber(this.props.overallPrice / 100, 2, '.', ',')}&nbsp;€</span>
          </div>
          <div className="plantBagButton">
            <SvgButton text=  {counterpart.translate('PUT_INTO_PLANTBAG')} buttonType="barrow" onClick={this.props.updatePlantBag.bind(this)} />
          </div>
        </div>
        <div className="line">{counterpart.translate('YOU_HAVE_AREA_TO_PLANT_FOR')}
        </div>
        <div className="iconButtonWrapper">
          <IconButton className="iconButton" glyphIcon="glyphicon-forward" text={counterpart.translate('NAVBAR.OFFER_ACREAGE')} onClick={this.switchToOfferProjectPage.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
