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
import {
  htmlDecode
} from '../common/language/HtmlHelper';
import IconButton from '../common/components/IconButton';
import NotificationSystem from 'react-notification-system';

import Boostrap from 'bootstrap';

export default class TeamDetails extends Component {
  constructor(props) {
    super(props);
  }

  deleteTeam() {
    this.props.deleteTeam();
  }

  createDeleteConfirmation(){
    this.refs.notificationSystem.addNotification({
      title: 'Du bist im Begriff dein Team zu löschen!',
      position: 'tc',
      autoDismiss: 0,
      message: 'Möchtest du dein Team wirklich löschen?',
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
          <button>Nein</button>
          <button onClick={() => {
            this.deleteTeam()
          }}>Ja</button>
        </div>
      )
    });
  }

  render() {
    let teamImageUrl;
    if (this.props.team.teamName) {
      teamImageUrl = 'http://localhost:8081/team/image/' + this.props.team.teamId + '/150/150';
    }

    let buttons = '';
    if (this.props.isTeamAdmin) {
      buttons = <IconButton text="Team löschen" glyphIcon="glyphicon-remove" onClick={this.createDeleteConfirmation.bind(this)}/>;
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
        <p className="teamName">{htmlDecode(this.props.team.teamName)}</p>
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
          {buttons}
        </div>
        <NotificationSystem ref="notificationSystem" style={style}/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
