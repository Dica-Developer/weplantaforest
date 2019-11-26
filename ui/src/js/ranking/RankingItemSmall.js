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
    let text = Accounting.formatNumber(this.props.content.amount, 0, '.', ',') + ' ' + counterpart.translate('PLANTED_TREES');
    return (
      <div className="smallRankingItem">
        <div className="smallRankingNumber">{this.props.rankNumber}</div>
        <div className="name">
          <Link to={this.props.profileUrl}>
            <span className="name">{he.decode(this.props.content.name)}</span>
          </Link>
        </div>
        <div className="trees">
          <p style={{
            width: this.props.percentTree + '%',
            whiteSpace: 'nowrap'
          }}>
            {text}
          </p>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
