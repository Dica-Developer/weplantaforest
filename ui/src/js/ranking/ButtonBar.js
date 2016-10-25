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

export default class ButtonBar extends Component {

  constructor(props) {
    super(props);
  }

  loadAllUser(){
    this.props.loadAllUser();
  }

  loadOrgTypeRanking(orgType, orgTypeDesc){
    this.props.loadOrgTypeRanking(orgType, orgTypeDesc);
  }

  loadBestTeams(){
    this.props.loadBestTeams();
  }

  render() {
    return (
      <div className="buttonBar">
        <IconButton text="ALLE" onClick={this.loadAllUser.bind(this)} glyphIcon="glyphicon-forward"/>
        <IconButton text="PRIVAT" onClick={() => {
          this.loadOrgTypeRanking('PRIVATE', 'PrivatPersonen')
          }}  glyphIcon="glyphicon-forward"/>
        <IconButton text="FIRMEN" onClick={() => {
          this.loadOrgTypeRanking('COMMERCIAL', 'Firmen')
          }}  glyphIcon="glyphicon-forward"/>
        <IconButton text="NON-PROFIT ORG." onClick={() => {
          this.loadOrgTypeRanking('NONPROFIT', 'Non-Profit Organisationen')
          }}  glyphIcon="glyphicon-forward"/>
        <IconButton text="SCHULEN" onClick={() => {
          this.loadOrgTypeRanking('EDUCATIONAL', 'Schulen')
          }}  glyphIcon="glyphicon-forward"/>
        <IconButton text="TEAMS" onClick={this.loadBestTeams.bind(this)}  glyphIcon="glyphicon-forward"/>
      </div>
    );
  }
}
