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
      <div className="linkTableDiv">
          <table className="linkTable">
            <tbody>
              <tr>
              <td>
                <button type="button" className="btn btn-default btn-circle" onClick={this.loadAllUser.bind(this)}>
                  <i className="glyphicon glyphicon-forward"></i>
                  <span>ALLE</span>
                </button>
              </td>
              <td>
                <button type="submit" className="btn btn-default btn-circle" onClick={this.loadOrgTypeRanking.bind(this, 'PRIVATE', 'PrivatPersonen')}>
                  <i className="glyphicon glyphicon-forward"></i>
                  <span>PRIVAT</span>
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-default btn-circle" onClick={this.loadOrgTypeRanking.bind(this, 'COMMERCIAL', 'Firmen')}>
                  <i className="glyphicon glyphicon-forward"></i>
                  <span>FIRMA</span>
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-default btn-circle" onClick={this.loadOrgTypeRanking.bind(this, 'NONPROFIT', 'Non-Profit Organisationen')}>
                  <i className="glyphicon glyphicon-forward"></i>
                  <span>NON-PROFIT ORG.</span>
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-default btn-circle" onClick={this.loadOrgTypeRanking.bind(this, 'EDUCATIONAL', 'Schulen')}>
                  <i className="glyphicon glyphicon-forward"></i>
                  <span>SCHULEN</span>
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-default btn-circle" onClick={this.loadBestTeams.bind(this)}>
                  <i className="glyphicon glyphicon-forward"></i>
                  <span>TEAMS</span>
                </button>
              </td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}
