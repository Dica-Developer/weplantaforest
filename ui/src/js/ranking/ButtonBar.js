import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Link
} from 'react-router';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';

import IconButton from '../common/components/IconButton';
import CircleButton from '../common/components/CircleButton';

export default class ButtonBar extends Component {

  constructor(props) {
    super(props);
  }

  loadAllUser(){
    this.props.loadAllUser(true);
  }

  loadOrgTypeRanking(orgType, orgTypeDesc){
    this.props.loadOrgTypeRanking(orgType, orgTypeDesc, true);
  }

  loadBestTeams(){
    this.props.loadBestTeams(true);
  }

  render() {
    return (
      <div className="buttonBar row">
        <div className="col-md-10">
          <CircleButton text="ALLE" onClick={this.loadAllUser.bind(this)} glyphIcon="glyphicon-forward"/>
          <CircleButton text="PRIVAT" onClick={() => {
            this.loadOrgTypeRanking('PRIVATE', 'Beste Privatpersonen')
            }} glyphIcon="glyphicon-forward" />
          <CircleButton text="FIRMEN" onClick={() => {
            this.loadOrgTypeRanking('COMMERCIAL', 'Firmen')
            }} glyphIcon="glyphicon-forward" />
          <CircleButton text="NON-PROFIT ORG." onClick={() => {
            this.loadOrgTypeRanking('NONPROFIT', 'Non-Profit Organisationen')
            }} glyphIcon="glyphicon-forward" />
          <CircleButton text="SCHULEN" onClick={() => {
            this.loadOrgTypeRanking('EDUCATIONAL', 'Schulen')
            }} glyphIcon="glyphicon-forward" />
          <CircleButton text="TEAMS" onClick={this.loadBestTeams.bind(this)} glyphIcon="glyphicon-forward" />
        </div>
      </div>
    );
  }
}
