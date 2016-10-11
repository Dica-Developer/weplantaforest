import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {
  Link,
  browserHistory
} from 'react-router';

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
          <table className="bottomTable">
            <tbody>
              <tr>
                <td></td>
                <td>
                  <span>GESAMT:&nbsp;{Accounting.formatNumber(this.props.overallPrice / 100, 2, ".", ",")}&nbsp;€</span>
                </td>
                <td>
                  <ImageButton text="AB IN MEINEN<br/>PFLANZKORB" onClick={this.props.updatePlantBag.bind(this)} imagePath="/assets/images/Schubkarre_braun.png" imageWidth="72" imageHeight="40"/>
                </td>
              </tr>
            </tbody>
          </table>
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
