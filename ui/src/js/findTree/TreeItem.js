import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'dayjs';
import {Link} from 'react-router';
import Accounting from 'accounting';
import counterpart from 'counterpart';

import Boostrap from 'bootstrap';

export default class RankingItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="treeItem">
        <img src={this.props.imageUrl} title={this.props.content.treeType.name} alt={this.props.content.treeType.name}/>
        <div>
          <p>
            <span className="bold">{counterpart.translate('NUMBER')}:&nbsp;</span>{Accounting.formatNumber(this.props.content.amount, 0, '.', ',')}<br/>
            <span className="bold">{counterpart.translate('PROJECT')}:&nbsp;</span>
            <Link to={'/projects/' + this.props.content.projectArticle.project.name}>
               {this.props.content.projectArticle.project.name}
             </Link>
             <br/>
            <span className="bold">{counterpart.translate('DATE')}:&nbsp;</span>
            <span >{moment(this.props.content.plantedOn).format('DD.MM.YYYY')}</span>
          </p>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
