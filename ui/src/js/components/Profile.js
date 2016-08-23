import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Boostrap from 'bootstrap';
import moment from 'moment';
import Accounting from 'accounting';

import TimeRankingTeaserLarge from '../components/teaser/TimeRankingTeaserLarge';
import LoadingItem from '../components/LoadingItem';
import UserDetails from '../components/profile/UserDetails';
import TeamDetails from '../components/profile/TeamDetails';
import Tools from '../components/profile/Tools';
import NoTeamAvailable from '../components/profile/NoTeamAvailable';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        co2Data: {}
      },
      team: {
        co2Data: {}
      }
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/user?userName=' + encodeURIComponent(this.props.userName)).then(function(response) {
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

  }

  render() {
    return (
      <div>
        <div className="row profile ">
          <UserDetails user={this.state.user}/>
          <TeamDetails teamName={this.state.user.teamName} team={this.state.team}/>
        </div>
        <TimeRankingTeaserLarge userName={this.props.userName}/>
        <Tools/>
      </div>
    );
  }
}
