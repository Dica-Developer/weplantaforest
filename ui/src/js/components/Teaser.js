import React, {Component} from 'react';
import Boostrap from 'bootstrap';
import axios from 'axios';

import ArticleTeaser from '../components/teaser/ArticleTeaser';
import ProjectTeaser from '../components/teaser/ProjectTeaser';
import RankingTeaser from '../components/teaser/RankingTeaser';
import LoadingItem from '../components/LoadingItem';

export default class Teaser extends Component {
  constructor() {
    super();
    this.state = {
      projects: {
        content: []
      },
      teaser: {
        content: []
      },
      bestUserRanking: {
        content: []
      },
      bestCompanyRanking: {
        content: []
      }
    };
  }

  componentWillMount() {
    var that = this;

    axios.get('http://localhost:8081/reports/activeProjects?page=0&size=2').then(function(response) {
      var result = response.data;
      that.setState({projects: result});
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

    axios.get('http://localhost:8083/articles/BLOG?page=0&size=2').then(function(response) {
      var result = response.data;
      that.setState({teaser: result});
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

    axios.get('http://localhost:8081/ranking/bestUser?page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({bestUserRanking: result});
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

    axios.get('http://localhost:8081/ranking/bestUser?page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({bestCompanyRanking: result});
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
    var project1 = [];
    var project2 = [];

    var article1 = [];
    var article2 = [];

    var bestUser = [];
    var bestCompany = [];

    if (this.state.projects.content[0]) {
      project1.push(<ProjectTeaser content={this.state.projects.content[0]}/>);
    } else {
      project1.push(<LoadingItem/>);
    }
    if (this.state.teaser.content[0]) {
      article1.push(<ArticleTeaser content={this.state.teaser.content[0]}/>);
    } else {
      article1.push(<LoadingItem/>);
    }
    if (this.state.projects.content[1]) {
      project2.push(<ProjectTeaser content={this.state.projects.content[1]}/>);
    } else {
      project2.push(<LoadingItem/>);
    }
    if (this.state.teaser.content[1]) {
      article2.push(<ArticleTeaser content={this.state.teaser.content[1]}/>);
    } else {
      article2.push(<LoadingItem/>);
    }

    if (this.state.bestUserRanking.content[0]) {
      bestUser.push(<RankingTeaser title="Beste Pflanzer" content={this.state.bestUserRanking} background="lightBlue" imageFolder="user"/>);
    } else {
      bestUser.push(<LoadingItem background="#51a8be"/>);
    }

    if (this.state.bestCompanyRanking.content[0]) {
      bestCompany.push(<RankingTeaser title="Beste Firmen" content={this.state.bestCompanyRanking} background="violett" imageFolder="user"/>);
    } else {
      bestCompany.push(<LoadingItem background="#813d59"/>);
    }

    return (
      <div>
        <div className="row teaser">
          {project1}
          {article1}
          {bestUser}
        </div>
        <div className="row teaser">
          {project2}
          {article2}
          {bestCompany}
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
