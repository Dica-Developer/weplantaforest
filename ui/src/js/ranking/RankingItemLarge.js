import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';

import he from 'he';

export default class RankingItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rankingItemLarge">
        <div className="rankingNumber">{this.props.rankNumber}</div>
        <div className="ranking-img-div">
          <img className="ranking-img" src={this.props.imageUrl} alt="logo"/>
        </div>
        <div className="rankingSummary">
          <Link to={this.props.profileUrl}>
            <span className="name">{he.decode(this.props.content.name)}</span>
          </Link>
          <br/>
          <p style={{
            width: this.props.percentTree + '%'
          }}>
            <span className="stats">&nbsp;{Accounting.formatNumber(this.props.content.amount, 0, '.', ',')}</span>
            <span className="text">
              {counterpart.translate('PLANTED_TREES')}
            </span><br/>
          </p>
          <p style={{
            width: this.props.percentCo2 + '%'
          }}>
            <span className="stats">&nbsp;{Accounting.formatNumber(this.props.content.co2Saved, 1, '.', ',')}&nbsp;</span>
            <span className="text" dangerouslySetInnerHTML={{
          __html: counterpart.translate('CO2_BOUND')
            }}></span>
          </p>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
