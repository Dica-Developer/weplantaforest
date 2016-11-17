import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

import ButtonBar from './ButtonBar';
import RankingItemLarge from './RankingItemLarge';
import RankingItemSmall from './RankingItemSmall';

require("./rankingPage.less");

export default class RankingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ranking: {
        content: []

      },
      orgTypeDesc: 'Alle',
      slideIn: false
    };
  }

  componentDidMount() {
    this.loadAllUser();
  }

  loadAllUser() {
    this.setState({slideIn: true})
    var that = this;
    axios.get('http://localhost:8081/ranking/bestUser?page=0&size=25').then(function(response) {
      var result = response.data;
      that.sleep(500);
      that.setState({ranking: result, slideIn: false});
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
    this.setState({orgTypeDesc: 'Teams', slideIn: true})
    var that = this;
    axios.get('http://localhost:8081/ranking/bestTeam?page=0&size=25').then(function(response) {
      var result = response.data;
      that.sleep(500);
      that.setState({ranking: result, slideIn: false});
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

  }

  loadOrgTypeRanking(orgType, orgTypeDesc) {
    this.setState({orgTypeDesc: orgTypeDesc, slideIn: true})
    var that = this;
    axios.get('http://localhost:8081/ranking/bestOrgType/' + orgType + '?page=0&size=25').then(function(response) {
      var result = response.data;
      that.sleep(500);
      that.setState({ranking: result, slideIn: false});
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
  }

  sleep(milliseconds) {
    var e = new Date().getTime() + (milliseconds);
    while (new Date().getTime() <= e) {}
  }

  render() {
    var orgTypeDesc = this.state.orgTypeDesc;
    var page = 0;
    var percentTree = 100;
    var percentCo2 = 100;
    var maxTree;
    var maxCo2;
    return (
      <div className="container paddingTopBottom15">
        <div className="row rankingPage">
          <div className="col-md-12">
            <ButtonBar loadAllUser={this.loadAllUser.bind(this)} loadBestTeams={this.loadBestTeams.bind(this)} loadOrgTypeRanking={this.loadOrgTypeRanking.bind(this)}/>
          </div>
          <div ref="ranking" className={(this.state.slideIn
            ? 'sliding-in '
            : 'sliding-out ') + "col-md-12 rankingItems"}>
            <h2>Bestenliste&nbsp;/&nbsp;{this.state.orgTypeDesc}</h2>
            {this.state.ranking.content.map(function(content, i) {
              if (i == 0) {
                maxTree = content.amount;
                maxCo2 = content.co2Saved;
              }
              if (i > 0) {
                percentTree = 100 * content.amount / maxTree;
                percentCo2 = 100 * content.co2Saved / maxCo2;
              }
              var imageUrl;
              if (orgTypeDesc != 'Teams') {
                imageUrl = 'http://localhost:8081/user/image/' + content.imageName + '/60/60';
              } else {
                imageUrl = 'http://localhost:8081/team/image/' + content.imageName + '/60/60';
              }
              if (i < 10) {
                return (<RankingItemLarge imageUrl={imageUrl} content={content} rankNumber={page * 25 + (i + 1)} key={i} percentTree={percentTree} percentCo2={percentCo2}/>);
              } else {
                return (<RankingItemSmall content={content} rankNumber={page * 25 + (i + 1)} key={i} percentTree={percentTree}/>);
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
