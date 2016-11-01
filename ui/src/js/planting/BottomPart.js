import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {Link, browserHistory} from 'react-router';

import ImageButton from '../common/components/ImageButton';
import IconButton from '../common/components/IconButton';

require("./bottomPart.less");

export default class BottomPart extends Component {

  switchToOfferProjectPage() {
    browserHistory.push('/projectOffer');
  }


  render() {
    return (
      <div className="bottomPart">
        <div className="button-and-price">
          <div className="price">
            <span>GESAMT:&nbsp;{Accounting.formatNumber(this.props.overallPrice / 100, 2, ".", ",")}&nbsp;€</span>
          </div>
          <div className="plantBagButton">
            <ImageButton text="AB IN MEINEN<br/>PFLANZKORB" onClick={this.props.updatePlantBag.bind(this)} imagePath="/assets/images/Schubkarre_braun.png" imageWidth="50" imageHeight="25"/>
          </div>
        </div>
        <div className="line">Dir stehen Flächen zur Verfügung und Du hast Interesse daran, dass I Plant a Tree diese bepflanzt?
          <br/>
          Hier kanns Du eine&nbsp;
          <IconButton glyphIcon="glyphicon-forward" text="PROJEKTFLÄCHE ANBIETEN" onClick={this.switchToOfferProjectPage.bind(this)}/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
