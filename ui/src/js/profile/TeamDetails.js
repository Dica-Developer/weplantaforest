import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import moment from 'moment';
import Accounting from 'accounting';

import Boostrap from 'bootstrap';

export default class TeamDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let teamImageUrl;
    if (this.props.team.teamName) {
      teamImageUrl = 'http://localhost:8081/team/image/' + this.props.team.teamId + '/150/150';
    }
    return (
      <div >
        <h2>Team</h2>
        <div className="imageDiv">
          <img src={teamImageUrl} alt="profile"/>
        </div>
        <p className="userName">{this.props.team.teamName}</p>
        <div className="stats">
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="bold">Rang:&nbsp;</span>{this.props.team.rank}
                </td>
                <td>
                  <span className="bold">gegründet:&nbsp;</span>{moment(this.props.team.regDate).format("DD.MM.YYYY")}</td>
              </tr>
              <tr>
                <td>
                  <span className="bold">B&auml;ume gepflanzt:&nbsp;</span>{Accounting.formatNumber(this.props.team.co2Data.treesCount, 0, ".", ",")}</td>
                <td>
                  <span className="bold">Teamleiter:&nbsp;</span>{this.props.team.adminName}</td>
              </tr>
              <tr>
                <td>
                  <span className="bold">CO<sub>2</sub>&nbsp;gebunden:&nbsp;</span>{Accounting.formatNumber(this.props.team.co2Data.co2, 3, ".", ",")}&nbsp;t</td>
                <td>
                  <span className="bold">Mitglieder:&nbsp;</span>{this.props.team.memberCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="teamDesc">
          <p>
            <i>{this.props.team.description}</i>
          </p>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to="/" className="teamLink">
                  <div className="imgDiv">
                    <img src="/assets/images/mail.jpg" alt="mail" width="65" height="45"/>
                  </div>
                  <div className="textDiv1Line">
                    <div>RUNDMAIL</div>
                  </div>
                </Link>
              </td>
              <td>
                <Link to="/" className="teamLink">
                  <div className="imgDiv">
                    <img src="/assets/images/message.jpg" alt="message" width="45" height="45"/>
                  </div>
                  <div className="textDiv2Lines">
                    <div>NACHRICHT<br/>SCHREIBEN</div>
                  </div>
                </Link>
              </td>
              <td>
                <Link to="/" className="teamLink">
                  <div className="imgDiv">
                    <img src="/assets/images/leave.jpg" alt="leave" width="45" height="45"/>
                  </div>
                  <div className="textDiv2Lines">
                    <div>TEAM<br/>VERLASSEN</div>
                  </div>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
