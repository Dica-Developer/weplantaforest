import axios from 'axios';
import React, { Component } from 'react';
import createFilterOptions from 'react-select-fast-filter-options';
import VirtualizedSelect from 'react-virtualized-select';
import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';
import { getConfig } from '../../common/RestHelper';
import CodeGenerator from './CodeGenerator';
import CodeOverview from './CodeOverview';


require('./eventEditor.less');

export default class EventEditor extends Component {

  constructor() {
    super();
    this.state = {
      eventt: {
        id: null,
        name: '',
        team: {
          id: null,
          name: ''
        },
        user: {
          id: null,
          name: ''
        }
      },
      codes: [],
      teams: [],
      users: [],
      restConfig: getConfig()
    };
    this.updatePlantBag = this.updatePlantBag.bind(this);
  }

  componentDidMount() {
    if (this.props.params.eventId != 'new') {
      this.loadEvent();
    }
    this.loadUser();
    this.loadTeams();
  }

  loadEvent() {
    var that = this;
    axios.get('http://localhost:8083/event/' + encodeURIComponent(this.props.params.eventId), this.state.restConfig).then(function(response) {
      var result = response.data;
      if (!result.team) {
        result.team = {
          id: null,
          name: ''
        };
      }
      that.setState({
        eventt: result
      });
      that.refs.codegenerator.setEventId(result.id);
      that.refs.codegenerator.setUserId(result.user.id);

      that.loadCodesForEvent();
    });
  }

  loadCodesForEvent() {
    var that = this;
    let eventId = this.state.eventt.id;
    axios.get('http://localhost:8083/event/codes/' + encodeURIComponent(eventId), this.state.restConfig).then(function(response) {
      var result = response.data;
      that.setState({codes: result});
      that.refs.codes.setCodesAndCreateRows(result);
    });
  }

  loadUser() {
    var that = this;
    axios.get('http://localhost:8083/users', this.state.restConfig).then(function(response) {
      var result = response.data;
      that.createValueLabelPairsForUser(result);
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler beim Laden der Nutzer!', response.data + response.message, 'error');
    });
  }

  loadTeams() {
    var that = this;
    axios.get('http://localhost:8083/teams', this.state.restConfig).then(function(response) {
      var result = response.data;
      that.createValueLabelPairsForTeams(result);
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler beim Laden der Teams!', response.data + response.message, 'error');
    });
  }

  createValueLabelPairsForUser(users) {
    var options = [];
    for (var user in users) {
      var option = {
        value: users[user].id,
        label: users[user].name
      };
      options.push(option);
    }
    this.setState({
      users: options,
      usersFilter: createFilterOptions({ options })
    });
  }

  createValueLabelPairsForTeams(teams) {
    var options = [];
    options.push({
      value: null,
      label: '- kein Team ausgewählt -'
    });
    for (var team in teams) {
      var option = {
        value: teams[team].id,
        label: teams[team].name
      };
      options.push(option);
    }
    this.setState({
      teams: options
    });
  }

  updateEventName(value) {
    this.state.eventt.name = value;
    this.forceUpdate();
  }

  updateUserForEvent(user) {
    this.state.eventt.user.id = user.value;
    this.state.eventt.user.name = user.label;
    this.forceUpdate();
  }

  updateTeamForEvent(team) {
    this.state.eventt.team.id = team.value;
    this.state.eventt.team.name = team.label;
    this.forceUpdate();
  }

  updatePlantBag(price, projectItems, projectName){
    this.props.route.updatePlantBag(price, projectItems, projectName, false);
  }

  saveEvent() {
    var that = this;
    let eventToCreate = {};
    eventToCreate.id = this.state.eventt.id;
    eventToCreate.name = this.state.eventt.name;
    eventToCreate.team = this.state.eventt.team.id ? this.state.eventt.team : null;
    eventToCreate.user = this.state.eventt.user;
    if (this.state.eventt.user.id && this.state.eventt.name) {
      if (this.state.eventt.id != null) {
        axios.put('http://localhost:8083/event', eventToCreate, this.state.restConfig).then(function(response) {
          var result = response.data;
          if (!result.team) {
            result.team = {
              id: null,
              name: ''
            };
          }
          that.setState({
            eventt: result
          });
          that.refs.codegenerator.setUserId(result.user.id);
          that.refs.notification.addNotification('Geschafft!', 'Event wurde aktualisiert.', 'success');
          that.forceUpdate();
        }).catch(function(response) {
          that.refs.notification.addNotification('Fehler!', 'Bei der Aktualisierung ist ein Fehler aufgetreten. ' + response.data + response.message, 'error');
        });
      } else {
        axios.post('http://localhost:8083/event', eventToCreate, this.state.restConfig).then(function(response) {
          var result = response.data;
          if (!result.team) {
            result.team = {
              id: null,
              name: ''
            };
          }
          that.setState({
            eventt: result
          });
          that.refs.codegenerator.setEventId(result.id);
          that.refs.codegenerator.setUserId(result.user.id);
          that.refs.notification.addNotification('Geschafft!', 'Event wurde erzeugt.', 'success');
          that.forceUpdate();
        }).catch(function(response) {
          that.refs.notification.addNotification('Fehler!', 'Bei der Aktualisierung ist ein Fehler aufgetreten. ' + response.data + response.message, 'error');
        });
      }
    } else {
      that.refs.notification.addNotification('Fehler!', 'User und/oder Name fehlt!', 'error');
    }
  }

  render() {
    return (
      <div className="container paddingTopBottom15 eventEditor">
        <div className="row ">
          <div className="col-md-12">
            <h1>Event-Editor</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"><label className="input-label">Name</label></div>
            <div className="col-md-8"><input type="text" value={this.state.eventt.name} onChange={(event) => {
              this.updateEventName(event.target.value);
            }}/></div>
        </div>
        <div className="row">
          <div className="col-md-4"><label className="select-label">User</label></div>
          <div className="col-md-8">
            <VirtualizedSelect name="user-select" value={this.state.eventt.user.id} filterOptions={this.state.usersFilter} options={this.state.users} onChange={this.updateUserForEvent.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"><label className="select-label">Team</label></div>
          <div className="col-md-8">
            <VirtualizedSelect name="team-select" value={this.state.eventt.team ? this.state.eventt.team.id : null} options={this.state.teams} onChange={this.updateTeamForEvent.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 save">
            <IconButton glyphIcon="glyphicon-floppy-open" text="EVENT SPEICHERN" onClick={this.saveEvent.bind(this)}/>
          </div>
        </div>
        <div className={this.state.eventt.id ? '' : 'no-display'}>
          <CodeGenerator ref="codegenerator" updatePlantBag={this.updatePlantBag.bind(this)} loadCodesForEvent={this.loadCodesForEvent.bind(this)}/>
          <CodeOverview ref="codes" codes={this.state.codes}/>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
