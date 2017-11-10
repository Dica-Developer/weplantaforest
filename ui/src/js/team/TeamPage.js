import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import {
  browserHistory
} from 'react-router';

import TeamDetails from './TeamDetails';
import TeamMember from './TeamMember';
import LargeRankingContainer from '../common/ranking/LargeRankingContainer';
import RankingItem from '../common/ranking/RankingItem';
import RankingItemContent from '../common/ranking/content/AmountProjectDate';
import NoTreesAvailable from '../common/ranking/NoTreesAvailable';
import Notification from '../common/components/Notification';

require("./team.less");

export default class TeamPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      team: {
        co2Data: {}
      },
      newestPlantRanking: {
        content: []
      },
      pageCount: 0,
      teamMember: {
        content: []
      },
      isTeamAdmin: false
    };
  }

  componentDidMount() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.get('http://localhost:8081/team?teamName=' + encodeURIComponent(this.props.params.teamName)).then(function(response) {
      var result = response.data;
      that.setState({
        team: result
      });
      that.checkIfTeamAdmin();
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

    axios.get('http://localhost:8081/trees/team?teamName=' + encodeURIComponent(this.props.params.teamName) + '&page=0&size=15').then(function(response) {
      var result = response.data;
      that.setState({
        newestPlantRanking: result
      });
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
    axios.get('http://localhost:8081/team/member?teamName=' + encodeURIComponent(this.props.params.teamName) + '&page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({
        teamMember: result
      });
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

  checkIfTeamAdmin() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.get('http://localhost:8081/team/isAdmin?teamId=' + this.state.team.teamId, config).then(function(response) {
      var result = response.data;
      that.setState({
        isTeamAdmin: result
      });
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
    this.setState({
      pageCount: newPage
    });
  }

  callPreviousPage() {
    var newPage = this.state.pageCount - 1;
    this.callPage(newPage);
    this.setState({
      pageCount: newPage
    });
  }

  callPage(page) {
    var that = this;
    axios.get('http://localhost:8081/trees/team/' + this.props.params.teamName + '?page=' + page + '&size=15').then(function(response) {
      var result = response.data;
      that.setState({
        newestPlantRanking: result
      });
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

  deleteTeam() {
    var that = this;
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.delete('http://localhost:8081/team/delete?teamId=' + this.state.team.teamId, config).then(function(response) {
      that.refs.notification.addNotification('Team gelöscht', 'Dein Team wurde so eben gelöscht.', 'success');
      // browserHistory.push('/')
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

  render() {
    var treePart;
    var page = this.state.pageCount;

    if (this.state.newestPlantRanking.numberOfElements != 0) {
      treePart = <LargeRankingContainer styleClass="teamRanking" callPreviousPage={this.callPreviousPage.bind(this)} callNextPage={this.callNextPage.bind(this)} isFirstPage={this.state.newestPlantRanking.first} isLastPage={this.state.newestPlantRanking.last}>
        {this.state.newestPlantRanking.content.map(function(content, i) {
          let imageUrl;
          if (content.imagePath != null && content.imagePath != '') {
            imageUrl = 'http://localhost:8081/tree/image/' + content.imagePath + '/60/60'
          } else {
            imageUrl = 'http://localhost:8081/treeType/image/' + content.treeType.imageFile + '/60/60'
          }
          let linkTo = '/projects/' + content.projectArticle.project.name;
          return (<RankingItem imageUrl={imageUrl} rankNumber={page * 15 + (i + 1)} key={i} showRankNumber="true" showName="true"  linkTo={linkTo}>
          <RankingItemContent content={content}/>
          </RankingItem>
        );
        })}
      </LargeRankingContainer>;
    } else {
      treePart = <NoTreesAvailable/>;
    }

    return (
      <div className="container paddingTopBottom15 teamPage">
        <div className="row details">
          <div className="col-md-6 ">
            <TeamDetails team={this.state.team} isTeamAdmin={this.state.isTeamAdmin} deleteTeam={this.deleteTeam.bind(this)}/>
          </div>
          <div className="col-md-6">
            <TeamMember teamMember={this.state.teamMember}/>
          </div>
        </div>
        <div className="row">
          {treePart}
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}
