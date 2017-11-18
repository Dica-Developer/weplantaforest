import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Link,
  browserHistory
} from 'react-router';
import moment from 'moment';
import Accounting from 'accounting';
import NotificationSystem from 'react-notification-system';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';

import {
  htmlDecode
} from '../common/language/HtmlHelper';
import IconButton from '../common/components/IconButton';

import Boostrap from 'bootstrap';

export default class TeamDetails extends Component {
  constructor(props) {
    super(props);
  }

  switchToTeamPage() {
    browserHistory.push('/team/' + this.props.team.teamName);
  }

  createLeaveConfirmation(){
    this.refs.notificationSystem.addNotification({
      title: counterpart.translate('TEAM_LEAVE_CONFIRMATION_TITLE'),
      position: 'tc',
      autoDismiss: 0,
      message: counterpart.translate('ARE_YOU_SURE'),
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
          <button>Nein</button>
          <button onClick={() => {
            this.leaveTeam()
          }}>Ja</button>
        </div>
      )
    });
  }

  leaveTeam() {
    var that = this;
    this.props.leaveTeam();
  }

  render() {
    let teamImageUrl;
    if (this.props.team.teamName) {
      teamImageUrl = 'http://localhost:8081/team/image/' + this.props.team.teamId + '/150/150';
    }

    var style = {
      Containers: {
        DefaultStyle: {
          zIndex: 11000
        },
        tc: {
          top: '50%',
          bottom: 'auto',
          margin: '0 auto',
          left: '50%'
        }
      }
    };
    return (
      <div >
        <h2>Team</h2>
        <div className="imageDiv">
          <img src={teamImageUrl} alt="profile"/>
        </div>
        <p className="teamName" onClick={this.switchToTeamPage.bind(this)}>{htmlDecode(this.props.team.teamName)}</p>
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
                  <span className="bold">Teamleiter:&nbsp;</span>{htmlDecode(this.props.team.adminName)}</td>
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
            <i>{htmlDecode(this.props.team.description)}</i>
          </p>
        </div>
        <div className="align-center teamButtons">
          <IconButton text={counterpart.translate('TEAM_LEAVE')} glyphIcon="glyphicon-remove"  onClick={this.createLeaveConfirmation.bind(this)}/>
        </div>
        <NotificationSystem ref="notificationSystem" style={style}/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
