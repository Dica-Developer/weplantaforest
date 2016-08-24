import React, {Component} from 'react';
import {render} from 'react-dom';
import NavBar from '../components/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';
import Boostrap from 'bootstrap';
import axios from 'axios';

import UserDetails from './UserDetails';
import TeamDetails from './TeamDetails';
import NoTeamAvailable from './NoTeamAvailable';
import Tools from './Tools';
import UserRankingContainer from './ranking/UserRankingContainer';
import RankingItem from './ranking/RankingItem';
import NoTreesAvailable from './ranking/NoTreesAvailable';

require("./profile.less");

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        co2Data: {}
      },
      team: {
        co2Data: {}
      },
      newestPlantRanking: {
        content: []
      },
      pageCount: 0
    };
  }

  componentWillMount() {
    var that = this;
    axios.get('http://localhost:8081/user?userName=' + encodeURIComponent(this.props.params.userName)).then(function(response) {
      var result = response.data;
      that.setState({user: result});
      if (that.state.user.teamName != '') {
        axios.get('http://localhost:8081/team?teamName=' + that.state.user.teamName).then(function(response) {
          var result = response.data;
          that.setState({team: result});
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

    axios.get('http://localhost:8081/trees/owner/' + this.props.params.userName + '?page=0&size=10').then(function(response) {
      var result = response.data;
      that.setState({newestPlantRanking: result});
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

  callNextPage() {
    var that = this;
    var newPage = this.state.pageCount + 1;
    axios.get('http://localhost:8081/trees/owner/' + this.props.params.userName + '?page=' + newPage + '&size=10').then(function(response) {
      var result = response.data;
      that.setState({newestPlantRanking: result});
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
    this.setState({pageCount: newPage});
  }

  callPreviousPage() {
    var that = this;
    var newPage = this.state.pageCount - 1;
    axios.get('http://localhost:8081/trees/owner/' + this.props.params.userName + '?page=' + newPage + '&size=10').then(function(response) {
      var result = response.data;
      that.setState({newestPlantRanking: result});
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
    this.setState({pageCount: newPage});

  }

  render() {
    var teamPart;
    var treePart;
    var page = this.state.pageCount;
    if (this.state.user.teamName != '') {
      teamPart = <TeamDetails team={this.state.team}/>;
    } else {
      teamPart = <NoTeamAvailable/>;
    }
    if (this.state.newestPlantRanking.numberOfElements != 0) {
      treePart = <UserRankingContainer callPreviousPage={this.callPreviousPage.bind(this)} callNextPage={this.callNextPage.bind(this)} isFirstPage={this.state.newestPlantRanking.first} isLastPage={this.state.newestPlantRanking.last}>
        {this.state.newestPlantRanking.content.map(function(content, i) {
          let imageUrl = 'http://localhost:8081/treeType/image/' + content.treeType.imageFile + '/60/60';
          return (<RankingItem imageUrl={imageUrl} rankNumber={page * 10 + (i + 1)} content={content} key={i}/>);
        })}
      </UserRankingContainer>;
    } else {
      treePart = <NoTreesAvailable/>;
    }
    return (
      <div className="profile">
        <NavBar/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row details">
            <div className="col-md-6 ">
              <UserDetails user={this.state.user}/>
            </div>
            <div className="col-md-6">
              {teamPart}
            </div>
          </div>
          <div className="row">
            {treePart}
          </div>
          <div className="row tools">
            <Tools/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
