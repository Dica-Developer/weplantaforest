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
import EditImageItem from '../profile/edit/EditImageItem';
import EditItem from '../profile/edit/EditItem';
import Notification from '../common/components/Notification';

import Boostrap from 'bootstrap';

export default class EditTeamDetails extends Component {
  constructor(props) {
    super(props);
  }

  uploadImage(file) {
    var data = new FormData();
    data.append('teamId', this.props.team.teamId);
    data.append('file', file);
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.post('http://localhost:8081/team/image/upload', data, config).then(function(response) {}).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  leaveEditMode(){
    this.props.editTeam(false);
  }

  editTeam(toEdit, event) {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.post('http://localhost:8081/team/edit?teamId=' + this.props.team.teamId + '&toEdit=' + toEdit + "&newEntry=" + event.target.value, {}, config).then(function(response) {
      that.props.loadTeamDetails();
      that.refs.notification.addNotification('Änderung wurde übernommen', 'Deine Änderung wurde erfolgreich gespeichert.', 'success');
    }).catch(function(response) {
      that.refs.notification.addNotification('Es ist ein Fehler aufgetreten!', response.data, 'error');
    });
  }

  render() {

    return (
      <div>
        <div className="row">
          <h2>Team bearbeiten</h2>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EditImageItem uploadImage={this.uploadImage.bind(this)}/>
          </div>
          <div className="col-md-12 form-group">
            <label htmlFor="team_description">Team-Beschreibung</label>
            <textarea className="form-control" rows="10" id="team_description" onBlur={(e) => this.editTeam('descirption', e)} defaultValue={this.props.team.description}/>
          </div>
        </div>
        <div className="row align-center bottomButton">
          <IconButton text="Anschauen" glyphIcon="glyphicon-eye-open" onClick={this.leaveEditMode.bind(this)}/>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
