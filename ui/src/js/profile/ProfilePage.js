import React, {Component} from 'react';
import {render} from 'react-dom';
import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';
import Boostrap from 'bootstrap';
import axios from 'axios';

import UserDetails from './UserDetails';
import EditUserDetails from './edit/EditUserDetails';
import TeamDetails from './TeamDetails';
import NoTeamAvailable from './NoTeamAvailable';
import Tools from './tools/Tools';
import LargeRankingContainer from '../common/ranking/LargeRankingContainer';
import RankingItem from '../common/ranking/RankingItem';
import RankingItemContent from '../common/ranking/content/AmountProjectDate';
import NoTreesAvailable from '../common/ranking/NoTreesAvailable';

require("./profile.less");

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        co2Data: {}
      },
      editUser: false,
      team: {
        co2Data: {}
      },
      newestPlantRanking: {
        content: []
      },
      pageCount: 0
    };

  }

  componentDidMount() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.get('http://localhost:8081/user?userName=' + encodeURIComponent(this.props.params.userName), config).then(function(response) {
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

    axios.get('http://localhost:8081/trees/owner?userName=' + encodeURIComponent(this.props.params.userName) + '&page=0&size=15').then(function(response) {
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
    var newPage = this.state.pageCount + 1;
    this.callPage(newPage);
    this.setState({pageCount: newPage});
  }

  callPreviousPage() {
    var newPage = this.state.pageCount - 1;
    this.callPage(newPage);
    this.setState({pageCount: newPage});
  }

  callPage(page) {
    var that = this;
    axios.get('http://localhost:8081/trees/owner?userName=' + encodeURIComponent(this.props.params.userName) + '&page=' + page + '&size=15').then(function(response) {
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

  showEditUser() {
    this.setState({editUser: true});
  }

  showProfile() {
    var that = this;
    this.setState({editUser: false});
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.get('http://localhost:8081/user?userName=' + encodeURIComponent(this.props.params.userName), config).then(function(response) {
      var result = response.data;
      that.setState({user: result});
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

  updateLanguage(value) {
    this.refs['navbar'].updateLanguage(value);
  }

  render() {
    var that = this;
    var userPart;
    var teamPart;
    var treePart;
    var toolsPart;
    var page = this.state.pageCount;

    if (!this.state.editUser) {
      userPart = <UserDetails user={this.state.user} showEditUser={this.showEditUser.bind(this)}/>;
    } else {
      userPart = <EditUserDetails user={this.state.user} showProfile={this.showProfile.bind(this)} updateLanguage={this.updateLanguage.bind(this)}/>;
    }

    if (this.state.user.teamName != '') {
      teamPart = <TeamDetails team={this.state.team}/>;
    } else {
      teamPart = <NoTeamAvailable/>;
    }
    if (this.state.newestPlantRanking.numberOfElements != 0) {
      treePart = <LargeRankingContainer styleClass="ranking" callPreviousPage={this.callPreviousPage.bind(this)} callNextPage={this.callNextPage.bind(this)} isFirstPage={this.state.newestPlantRanking.first} isLastPage={this.state.newestPlantRanking.last}>
        {this.state.newestPlantRanking.content.map(function(content, i) {
          let imageUrl;
          if (content.imagePath != null && content.imagePath != '') {
            imageUrl = 'http://localhost:8081/tree/image/' + content.imagePath + '/60/60'
          } else {
            imageUrl = 'http://localhost:8081/treeType/image/' + content.treeType.imageFile + '/60/60'
          }
          var linkTo;
          if(content.projectArticle != null){
            linkTo = '/projects/' + content.projectArticle.project.name;
          }else{
            linkTo = '/user/' + that.props.params.userName;
          }
          return (
            <RankingItem imageUrl={imageUrl} rankNumber={page * 15 + (i + 1)} content={content} key={i} showRankNumber={true} showName={false} linkTo={linkTo}>
              <RankingItemContent content={content}/>
            </RankingItem>
          );
        })}
      </LargeRankingContainer >;
    } else {
      treePart = <NoTreesAvailable/>;
    }

    if (this.state.user.editAllowed) {
      toolsPart = <Tools/>;
    } else {
      toolsPart = '';
    }

    return (
      <div className="container paddingTopBottom15 profile">
        <div className="row details">
          <div className="col-md-6 ">
            {userPart}
          </div>
          <div className="col-md-6">
            {teamPart}
          </div>
        </div>
        <div className="row">
          {treePart}
        </div>
        {toolsPart}
      </div>
    );
  }
}
