import React, { Component } from 'react';
import { browserHistory } from 'react-router';


require('./rankingItem.less');

export default class RankingItem extends Component {
  constructor(props) {
    super(props);
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    return (
      <div className="rankingItem">
        <a role="button" onClick={() => {
          this.linkTo(this.props.linkTo);
        }}>
        <div className={'rankingNumber' + (this.props.showRankNumber ? ' ' : ' invisible')}>
          {this.props.rankNumber}
        </div>
        <img className="ranking-img" src={this.props.imageUrl}/>
        {this.props.children}
        </a>
      </div>
    );
  }
}



/* vim: set softtabstop=2:shiftwidth=2:expandtab */
