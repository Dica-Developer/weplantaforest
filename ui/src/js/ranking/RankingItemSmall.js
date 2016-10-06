import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';

import {htmlDecode} from '../common/language/HtmlHelper';

export default class RankingItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="smallRankingItem">
        <table>
          <tbody>
            <tr>
              <td>
                <div className="smallRankingNumber">{this.props.rankNumber}</div>
              </td>
              <td>
                <Link to={`/user/` + this.props.content.name}>
                  <span className="name">{htmlDecode(this.props.content.name)}</span>
                </Link>
              </td>
              <td>
                <p style={{
                  width: this.props.percentTree + '%'
                }}>
                  <span className="stats">&nbsp;{Accounting.formatNumber(this.props.content.amount, 0, ".", ",")}</span>
                  <span className="text">
                    B&auml;ume gepflant
                  </span><br/>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
