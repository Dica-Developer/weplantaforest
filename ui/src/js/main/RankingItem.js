import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';

import {htmlDecode} from '../common/language/HtmlHelper';
import {getTextForSelectedLanguage} from '../common/language/LanguageHelper';

export default class RankingItem extends Component {
  constructor(props) {
    super(props);
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    let co2Rounded = Accounting.formatNumber(this.props.content.co2Saved * 1000 / 1000, 3, ".", ",");
    let imageUrl = 'http://localhost:8081/' + this.props.imageFolder + '/image/' + this.props.content.imageName + '/60/60';
    return (
      <div >
        <a role="button" onClick={() => {
          this.linkTo(`/` + this.props.imageFolder + `/` + this.props.content.name)
        }}>
          <img className="ranking-img" src={imageUrl} alt={htmlDecode(this.props.content.name) + "-logo"}/>
          <div className="rankingSummary">
            <p>
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
