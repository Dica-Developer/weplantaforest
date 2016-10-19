import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Accounting from 'accounting';
import moment from 'moment';
import Boostrap from 'bootstrap';

import {htmlDecode} from '../../common/language/HtmlHelper';
import {getTextForSelectedLanguage} from '../../common/language/LanguageHelper';

require("./rankingItem.less");

export default class TimeRankingItem extends Component {
  constructor(props) {
    super(props);
  }

  linkTo(url) {
    browserHistory.push(url);
  }

  render() {
    let imageUrl = 'http://localhost:8081/' + this.props.imageFolder + '/image/' + this.props.content.treeTypeImageName + '/60/60';
    return (
      <div className="rankingItem">
        <a role="button" onClick={() => {
          this.linkTo(`/user/` + this.props.content.name)
        }}>
          <div className="ranking-img-div">
            <span className="align-vert-Mid"></span>
            <img className="ranking-img" src={imageUrl} title={getTextForSelectedLanguage(this.props.content.treeTypeName)} alt={getTextForSelectedLanguage(this.props.content.treeTypeName)}/>
          </div>
          <div className="rankingSummary">
            <p >
              <span className="name">{htmlDecode(this.props.content.name)}</span><br/>
              <span className="stats">B&auml;ume gepflant:&nbsp;{this.props.content.amount}</span><br/>
              <span className="stats">Datum:</span>
              <span className="stats">{moment(this.props.content.plantedOn).format("DD.MM.YYYY")}</span>
            </p>
          </div>
        </a>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
