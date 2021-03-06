import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import IconButton from '../common/components/IconButton';
import Notification from '../common/components/Notification';

export default class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {
        name: '',
        description: ''
      }
    };
  }

  createTeam() {
    var that = this;
    if (this.state.team.name) {
      var config = {
        headers: {
          'X-AUTH-TOKEN': localStorage.getItem('jwt')
        }
      };
      axios
        .post('http://localhost:8081/team/create', this.state.team, config)
        .then(function(response) {
          that.props.teamCreatedAction(that.state.team.name);
        })
        .catch(function(error) {
          that.refs.notification.handleError(error);
        });
    } else {
      this.refs.notification.addNotification(counterpart.translate('CREATE_TEAM_ERROR_TITLE'), counterpart.translate('CREATE_TEAM_ERROR_TEXT'), 'error');
    }
  }

  editTeam(toEdit, event) {
    this.state.team[toEdit] = event.target.value;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('TEAM_CREATE')}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 form-group">
            <label htmlFor="team_name">{counterpart.translate('TEAM_NAME')}:</label>
            <input type="text" className="form-control" id="team_name" placeholder="" onBlur={e => this.editTeam('name', e)} />
          </div>
          <div className="col-md-12 form-group">
            <label htmlFor="team_description">{counterpart.translate('TEAM_DESCRIPTION')}:</label>
            <textarea className="form-control" rows="10" id="team_description" onBlur={e => this.editTeam('description', e)} />
          </div>
        </div>
        <div className="row align-center bottomButton">
          <IconButton text={counterpart.translate('TEAM_CREATE')} glyphIcon="glyphicon glyphicon-plus" onClick={this.createTeam.bind(this)} />
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
