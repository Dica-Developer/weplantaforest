import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Accounting from 'accounting';

import Boostrap from 'bootstrap';

require("./rankingItem.less");

export default class RankingItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let co2Rounded = Accounting.formatNumber(this.props.content.co2Saved, 3, ".", ",");
    let imageUrl = 'http://localhost:8081/' + this.props.imageFolder + '/image/' + this.props.content.imageName + '/60/60';
    return (
      <div className="rankingItem">
        <div className="rankingNumber">{this.props.rankNumber}</div>
        <img className="ranking-img" src={imageUrl} alt="logo"/>
        <div className="rankingSummary">
          <p >
            <Link to={`/` + this.props.imageFolder + `/` + this.props.content.name}>
              <span className="name">{this.props.content.name}</span>
            </Link>
            <br/>
            <span className="stats">B&auml;ume gepflant:&nbsp;{this.props.content.amount}</span><br/>
            <span className="stats">CO<sub>2</sub>&nbsp;gebunden:</span>
            <span className="stats">{co2Rounded}&nbsp;t</span>
          </p>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
