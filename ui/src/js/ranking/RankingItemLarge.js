import Accounting from 'accounting';
import counterpart from 'counterpart';
import he from 'he';
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RankingItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rankingItemLarge">
        <div className="rankingNumber">{this.props.rankNumber}</div>
        <div className="ranking-img-div">
          <div className="defaultTeamImage">
            <object width="60" height="60" data={this.props.imageUrl} alt="logo">
              <img src="/assets/images/default_team.jpg" />
            </object>
          </div>
        </div>
        <div className="rankingSummary">
          <Link to={this.props.profileUrl}>
            <span className="name">{he.decode(this.props.content.name)}</span>
          </Link>
          <br />
          <p
            style={{
              width: this.props.percentTree + '%'
            }}
          >
            <span className="stats">&nbsp;{Accounting.formatNumber(this.props.content.amount, 0, '.', ',')}</span>
            <span className="text">{counterpart.translate('PLANTED_TREES')}</span>
            <br />
          </p>
          <p
            style={{
              width: this.props.percentCo2 + '%'
            }}
          >
            <span className="stats">&nbsp;{Accounting.formatNumber(this.props.content.co2Saved, 1, '.', ',')}&nbsp;</span>
            <span
              className="text"
              dangerouslySetInnerHTML={{
                __html: counterpart.translate('CO2_BOUND')
              }}
            ></span>
          </p>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
