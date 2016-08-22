import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Boostrap from 'bootstrap';
import Accounting from 'accounting';

export default class Ranking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ranking: {
        content: []

      },
      orgTypeDesc: 'Alle'
    };
  }

  componentDidMount() {
    this.loadAllUser();
  }

  loadAllUser() {
    var that = this;
    axios.get('http://localhost:8081/ranking/bestUser?page=0&size=25').then(function(response) {
      var result = response.data;
      that.setState({ranking: result});
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
    this.setState({orgTypeDesc: 'Alle'})
  }

  loadBestTeams() {
    var that = this;
    axios.get('http://localhost:8081/ranking/bestTeam?page=0&size=25').then(function(response) {
      var result = response.data;
      that.setState({ranking: result});
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
    this.setState({orgTypeDesc: 'Teams'})
  }

  loadOrgTypeRanking(orgType, orgTypeDesc) {
    var that = this;
    axios.get('http://localhost:8081/ranking/bestOrgType/' + orgType + '?page=0&size=25').then(function(response) {
      var result = response.data;
      that.setState({ranking: result});
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
    this.setState({orgTypeDesc: orgTypeDesc})
  }

  render() {
    var content = this.state.ranking.content;
    var first10Trees = [];
    var last15Trees = [];
    var counter = 1;
    var page = 0;
    var percentTree = 100;
    var percentCo2 = 100;
    var maxTree;
    var maxCo2;
    var orgTypeDesc = this.state.orgTypeDesc;

    content.map(function(content) {
      if (counter == 1) {
        maxTree = content.amount;
        maxCo2 = content.co2Saved;
      }

      if (counter > 1) {
        percentTree = 100 * content.amount / maxTree;
        percentCo2 = 100 * content.co2Saved / maxCo2;
      }

      if (counter <= 10) {
        var imageUrl;
        if(orgTypeDesc != 'Teams'){
          imageUrl = 'http://localhost:8081/user/image/' + content.imageName + '/60/60';
        }else{
          imageUrl = 'http://localhost:8081/team/image/' + content.imageName + '/60/60';
        }
        first10Trees.push(
          <div className="rankingItem">
            <div className="rankingNumber">{page * 25 + counter}</div>
            <img className="ranking-img" src={imageUrl} alt="logo"/>
            <div className="rankingSummary">
              <Link to={`/user/` + content.name}>
                <span className="name">{content.name}</span>
              </Link>
              <br/>
              <p style={{
                width: percentTree + '%'
              }}>
                <span className="stats">&nbsp;{Accounting.formatNumber(content.amount, 0, ".", ",")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="text">
                  <i>B&auml;ume gepflant</i>
                </span><br/>
              </p>
              <p style={{
                width: percentCo2 + '%'
              }}>
                <span className="stats">&nbsp;{Accounting.formatNumber(content.co2Saved, 3, ".", ",")}&nbsp;</span>
                <span className="text">
                  <i>Tonnen CO<sub>2</sub>&nbsp;gebunden</i>
                </span>
              </p>
            </div>
          </div>
        );
      } else {
        last15Trees.push(
          <div className="smallRankingItem">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="smallRankingNumber">{page * 25 + counter}</div>
                  </td>
                  <td>
                    <Link to={`/user/` + content.name}>
                      <span className="name">{content.name}</span>
                    </Link>
                  </td>
                  <td>
                    <p style={{
                      width: percentTree + '%'
                    }}>
                      <span className="stats">&nbsp;{Accounting.formatNumber(content.amount, 0, ".", ",")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span className="text">
                        <i>B&auml;ume gepflant</i>
                      </span><br/>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      };
      counter++;
    });

    return (
      <div className="col-md-12 rankingPage">
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
        <h2>Bestenliste&nbsp;/&nbsp;{this.state.orgTypeDesc}</h2>
        {first10Trees}
        {last15Trees}
      </div>
    );
  }
}
