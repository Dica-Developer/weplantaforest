import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Link,  browserHistory
} from 'react-router';
import moment from 'moment';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';
import NotificationSystem from 'react-notification-system';


import IconButton from '../common/components/IconButton';
import {getConfig} from '../common/RestHelper';
import Notification from '../common/components/Notification';


import {
  htmlDecode
} from '../common/language/HtmlHelper';

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restConfig: getConfig()
    }
  }

  showEditUser() {
    this.props.showEditUser();
  }

  createConfirmation(id) {
    this.refs.notificationSystem.addNotification({
      title: 'Achtung!',
      position: 'tc',
      autoDismiss: 0,
      message: 'Dadurch wird dein User anonymisiert! Diese Aktion kann nicht rückgängig gemacht werden!',
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
        <button>Abbrechen</button>
        <button onClick={() => {
          this.anonymizeUser(id);
        }}>OK</button>
      </div>
      )
    });
  }

  anonymizeUser(userId) {
    var that = this;
    axios.post('http://localhost:8081/user/anonymize?userName=' + this.props.user.userName, {}, this.state.restConfig).then(function(response) {
      localStorage.setItem('jwt', '');
      localStorage.setItem('username', '');
      localStorage.setItem('isAdmin', false);
      localStorage.setItem('userDetails', '');
      browserHistory.push('/');
      window.location.reload(); 
    }).catch(function(response) {
      that.refs.notification.addNotification('Bei der Aktion ist ein Fehler aufgetreten!', 'Bitte wende dich über das Kontaktformular an uns, damit das Anonymisieren deines Accounts durchgeführt werden kann.', 'error');
    });
  }

  render() {
    let imageUrl;
    if (this.props.user.userName) {
      imageUrl = 'http://localhost:8081/user/image/' + this.props.user.imageFileName + '/150/150';
    }

    var editLink;
    if (this.props.user.editAllowed) {
      editLink = <div><IconButton text="Bearbeiten" glyphIcon="glyphicon-cog" onClick={this.showEditUser.bind(this)}/>
                      <div className="anonymize-button">
                        <a role="button" title="Account anonymisieren" onClick={this.createConfirmation.bind(this)}>
                          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </a>
                      </div>
                  </div>;
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
      <div>
        <h1>Profil</h1>
        <div className="imageDiv">
          <img src={imageUrl} alt="profile"/>
        </div>
        <p className="userName">{htmlDecode(this.props.user.userName)}</p>
        <div className="stats">
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="bold">Rang:&nbsp;</span>{this.props.user.rank}
                </td>
                <td>
                  <span className="bold">Mitglied seit:&nbsp;</span>{moment(this.props.user.regDate).format('DD.MM.YYYY')}</td>
              </tr>
              <tr>
                <td>
                  <span className="bold">B&auml;ume gepflanzt:&nbsp;</span>{Accounting.formatNumber(this.props.user.co2Data.treesCount, 0, '.', ',')}</td>
                <td>
                  <span className="bold">letzter Besuch:&nbsp;</span>{moment(this.props.user.lastVisit).format('DD.MM.YYYY')}</td>
              </tr>
              <tr>
                <td>
                  <span className="bold">CO<sub>2</sub>&nbsp;gebunden:&nbsp;</span>{Accounting.formatNumber(this.props.user.co2Data.co2, 3, '.', ',')}&nbsp;t</td>
                <td>
                  <span className="bold">Typ:&nbsp;</span>{this.props.user.organizationType}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="align-center bottomButton">
          {editLink}
        </div>
        <NotificationSystem ref="notificationSystem" style={style}/>
        <Notification ref="notification"/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
