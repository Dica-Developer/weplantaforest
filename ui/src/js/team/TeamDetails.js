import Accounting from 'accounting';
import axios from 'axios';
import counterpart from 'counterpart';
import moment from 'dayjs';
import he from 'he';
import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { browserHistory } from 'react-router';
import IconButton from '../common/components/IconButton';
import Notification from '../common/components/Notification';
import { createTeamImageUrl } from '../common/ImageHelper';

export default class TeamDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeamAdmin: false,
      isTeamMember: false,
      isLoggedIn: localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != ''
    };
    if (this.props.team.teamId && this.state.isLoggedIn) {
      this.checkIfTeamAdmin(this.props.team.teamId);
      this.checkIfTeamMember(this.props.team.teamId);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoggedIn: localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' });
    if (nextProps.team.teamId && this.state.isLoggedIn) {
      this.checkIfTeamAdmin(nextProps.team.teamId);
      this.checkIfTeamMember(nextProps.team.teamId);
    }
  }

  switchToTeamPage() {
    browserHistory.push('/team/' + encodeURIComponent(this.props.team.teamName));
  }

  checkIfTeamAdmin(teamId) {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios
      .get('http://localhost:8081/team/isAdmin?teamId=' + teamId, config)
      .then(function(response) {
        var result = response.data;
        that.setState({
          isTeamAdmin: result
        });
      })
      .catch(function(response) {
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

  checkIfTeamMember(teamId) {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios
      .get('http://localhost:8081/team/isMember?teamId=' + teamId, config)
      .then(function(response) {
        var result = response.data;
        that.setState({
          isTeamMember: result
        });
      })
      .catch(function(response) {
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

  deleteTeam() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios
      .delete('http://localhost:8081/team/delete?teamId=' + this.props.team.teamId, config)
      .then(function(response) {
        that.props.deleteAction();
      })
      .catch(function(response) {
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

  editTeam() {
    this.props.editTeam(true);
  }

  joinTeam() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios
      .post('http://localhost:8081/team/join?teamId=' + this.props.team.teamId, {}, config)
      .then(function(response) {
        that.refs.notification.addNotification(counterpart.translate('TEAM_JOINED'), counterpart.translate('TEAM_JOINED_TEXT'), 'success');
        that.setState({
          isTeamMember: true
        });
        that.props.loadTeamMember();
      })
      .catch(function(response) {
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

  leaveTeam() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios
      .post('http://localhost:8081/team/leave', {}, config)
      .then(function(response) {
        that.refs.notification.addNotification(counterpart.translate('TEAM_LEFT'), counterpart.translate('TEAM_LEFT_TEXT'), 'success');
        that.props.loadTeamMember();
        that.setState({
          isTeamMember: false
        });
        that.forceUpdate();
      })
      .catch(function(response) {
        that.refs.notification.addNotification(counterpart.translate('TEAM_LEFT_ERROR'), counterpart.translate('TEAM_LEFT_ERROR_TEXT'), 'error');
      });
  }

  createDeleteConfirmation() {
    this.refs.notificationSystem.addNotification({
      title: counterpart.translate('TEAM_DELETE_CONFIRMATION_TITLE'),
      position: 'tc',
      autoDismiss: 0,
      message: counterpart.translate('ARE_YOU_SURE'),
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
          <button>Nein</button>
          <button
            onClick={() => {
              this.deleteTeam();
            }}
          >
            Ja
          </button>
        </div>
      )
    });
  }

  createLeaveConfirmation() {
    this.refs.notificationSystem.addNotification({
      title: counterpart.translate('TEAM_LEAVE_CONFIRMATION_TITLE'),
      position: 'tc',
      autoDismiss: 0,
      message: counterpart.translate('ARE_YOU_SURE'),
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
          <button>Nein</button>
          <button
            onClick={() => {
              this.leaveTeam();
            }}
          >
            Ja
          </button>
        </div>
      )
    });
  }

  render() {
    let teamImageUrl;
    if (this.props.team) {
      teamImageUrl = createTeamImageUrl(this.props.team.teamId, 150, 150);
    }

    let buttons = '';
    if (this.state.isTeamAdmin) {
      buttons = (
        <div>
          <IconButton text={counterpart.translate('TEAM_EDIT')} glyphIcon="glyphicon-cog" onClick={this.editTeam.bind(this)} />{' '}
          <IconButton text={counterpart.translate('TEAM_DELETE')} glyphIcon="glyphicon-remove" onClick={this.createDeleteConfirmation.bind(this)} />
        </div>
      );
    } else if (!this.state.isTeamMember && this.state.isLoggedIn) {
      buttons = (
        <div>
          <IconButton text={counterpart.translate('TEAM_JOIN')} glyphIcon="glyphicon-share-alt" onClick={this.joinTeam.bind(this)} />
        </div>
      );
    } else if (this.state.isTeamMember) {
      buttons = (
        <div>
          <IconButton text={counterpart.translate('TEAM_LEAVE')} glyphIcon="glyphicon-remove" onClick={this.createLeaveConfirmation.bind(this)} />
        </div>
      );
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
        <h1>Team</h1>
        <div className="imageDiv">
          <object data={teamImageUrl} type="image/jpg" alt="profile" width="150" height="150">
            <img src="/assets/images/default_team.jpg" wdth="150" height="150" />
          </object>
        </div>
        <p className="teamName" onClick={this.switchToTeamPage.bind(this)}>
          {this.props.team.teamName ? he.decode(this.props.team.teamName) : ''}
        </p>
        <div className="stats">
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="bold">{counterpart.translate('RANK')}:&nbsp;</span>
                  {this.props.team.rank}
                </td>
                <td>
                  <span className="bold">{counterpart.translate('FOUNDED')}:&nbsp;</span>
                  {moment(this.props.team.regDate).format('DD.MM.YYYY')}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="bold">{counterpart.translate('TREES_PLANTED')}:&nbsp;</span>
                  {Accounting.formatNumber(this.props.team.co2Data.treesCount, 0, '.', ',')}
                </td>
                <td>
                  <span className="bold">{counterpart.translate('TEAM_LEAD')}:&nbsp;</span>
                  {this.props.team.adminName ? he.decode(this.props.team.adminName) : ''}
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    className="bold"
                    dangerouslySetInnerHTML={{
                      __html: counterpart.translate('CO2_BOUND_WITHOUT_TONS')
                    }}
                  ></span>
                  :&nbsp;{Accounting.formatNumber(this.props.team.co2Data.co2, 3, '.', ',')}&nbsp;t
                </td>
                <td>
                  <span className="bold">{counterpart.translate('MEMBERS')}:&nbsp;</span>
                  {this.props.team.memberCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="teamDesc">
          <p>
            <i>{this.props.team.description ? he.decode(this.props.team.description) : ''}</i>
          </p>
        </div>
        <div className="align-center teamButtons">{buttons}</div>
        <NotificationSystem ref="notificationSystem" style={style} />
        <Notification ref="notification" />
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
