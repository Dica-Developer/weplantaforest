import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';

import IconButton from '../common/components/IconButton';
import CircleButton from '../common/components/CircleButton';

export default class ButtonBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "clickedIndex": 0
    }
  }

  loadAllUser() {
    this.state.clickedIndex = 0;
    this.props.loadAllUser(true);
  }

  loadOrgTypeRanking(orgType, orgTypeDesc, index) {
    this.state.clickedIndex = index;
    this.props.loadOrgTypeRanking(orgType, orgTypeDesc, true);
  }

  loadBestTeams() {
    this.state.clickedIndex = 5;
    this.props.loadBestTeams(true);
  }

  render() {
    var clickedIndex = this.state.clickedIndex;
    return (
      <div className="buttonBar row">
        <div className="col-md-10">
          <CircleButton text="Alle" onClick={this.loadAllUser.bind(this)} glyphIcon="glyphicon-forward" className={clickedIndex == 0
            ? 'circleButtonActive'
            : ''}/>
          <CircleButton text="Privat" onClick={() => {
            this.loadOrgTypeRanking('PRIVATE', 'Privatpersonen', 1)
          }} glyphIcon="glyphicon-forward" className={clickedIndex == 1
            ? 'circleButtonActive'
            : ''}/>
          <CircleButton text="Unternehmen" onClick={() => {
            this.loadOrgTypeRanking('COMMERCIAL', 'Unternehmen', 2)
          }} glyphIcon="glyphicon-forward" className={clickedIndex == 2
            ? 'circleButtonActive'
            : ''}/>
          <CircleButton text="Non-Profit Org." onClick={() => {
            this.loadOrgTypeRanking('NONPROFIT', 'Non-Profit Organisationen', 3)
          }} glyphIcon="glyphicon-forward" className={clickedIndex == 3
            ? 'circleButtonActive'
            : ''}/>
          <CircleButton text="Schulen" onClick={() => {
            this.loadOrgTypeRanking('EDUCATIONAL', 'Schulen', 4)
          }} glyphIcon="glyphicon-forward" className={clickedIndex == 4
            ? 'circleButtonActive'
            : ''}/>
          <CircleButton text="Teams" onClick={this.loadBestTeams.bind(this)} glyphIcon="glyphicon-forward" className={clickedIndex == 5
            ? 'circleButtonActive'
            : ''}/>
        </div>
      </div>
    );
  }
}
