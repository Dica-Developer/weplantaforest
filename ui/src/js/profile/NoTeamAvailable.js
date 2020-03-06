import counterpart from 'counterpart';
import React, { Component } from 'react';
import IconButton from '../common/components/IconButton';

export default class NoTeamAvailable extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != ''
    };
  }

  goToCreateTeam() {
    this.props.openCreateTeamPart();
  }

  render() {
    let createTeamButton;
    if (this.state.isLoggedIn && this.props.isMyProfile) {
      createTeamButton = (
        <div className="row align-center bottomButton">
          <IconButton text={counterpart.translate('TEAM_CREATE')} glyphIcon="glyphicon glyphicon-plus" onClick={this.goToCreateTeam.bind(this)} />
        </div>
      );
    } else {
      createTeamButton = '';
    }
    let noTeamMessage = counterpart.translate('NO_TEAM_VISITOR');
    if (this.props.isMyProfile) {
      noTeamMessage = counterpart.translate('NO_TEAM_ME');
    }
    return (
      <div>
        <h1>{noTeamMessage}</h1>
        {createTeamButton}
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
