import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';

import {getTextForSelectedLanguage} from '../../common/language/LanguageHelper';
import {htmlDecode} from '../../common/language/HtmlHelper';

require("./rankingItem.less");

export default class RankingItem extends Component {
  constructor(props) {
    super(props);
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    let co2Rounded = Accounting.formatNumber(this.props.content.co2Saved, 3, ".", ",");
    let imageUrl = 'http://localhost:8081/' + this.props.imageFolder + '/image/' + this.props.content.imageName + '/60/60';
    return (
      <div className="rankingItem">
        <a role="button" onClick={() => {
          this.linkTo(`/` + this.props.imageFolder + `/` + this.props.content.name)
        }}>
          <div className="rankingNumber">
            <span className="align-vert-Mid"></span>{this.props.rankNumber}</div>
          <div className="ranking-img-div">
            <span className="align-vert-Mid"></span>
            <img className="ranking-img" src={imageUrl} alt={htmlDecode(this.props.content.name) + "-logo"}/>
          </div>
          <div className="rankingSummary">
            <p >
              <span className="name">{htmlDecode(this.props.content.name)}</span>
              <br/>
              <span className="stats">B&auml;ume gepflant:&nbsp;{this.props.content.amount}</span><br/>
              <span className="stats">CO<sub>2</sub>&nbsp;gebunden:</span>
              <span className="stats">{co2Rounded}&nbsp;t</span>
            </p>
          </div>
        </a>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
