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
          <CircleButton text="Alle" onClick={this.loadAllUser.bind(this)} glyphIcon="glyphicon-forward"/>
          <CircleButton text="Privat" onClick={() => {
            this.loadOrgTypeRanking('PRIVATE', 'Privatpersonen')
            }} glyphIcon="glyphicon-forward" />
          <CircleButton text="Unternehmen" onClick={() => {
            this.loadOrgTypeRanking('COMMERCIAL', 'Unternehmen')
            }} glyphIcon="glyphicon-forward" />
          <CircleButton text="Non-Profit Org." onClick={() => {
            this.loadOrgTypeRanking('NONPROFIT', 'Non-Profit Organisationen')
            }} glyphIcon="glyphicon-forward" />
          <CircleButton text="Schulen" onClick={() => {
            this.loadOrgTypeRanking('EDUCATIONAL', 'Schulen')
            }} glyphIcon="glyphicon-forward" />
          <CircleButton text="Teams" onClick={this.loadBestTeams.bind(this)} glyphIcon="glyphicon-forward" />
        </div>
      </div>
    );
  }
}
