import React, {
  Component
} from 'react';
import Boostrap from 'bootstrap';
import axios from 'axios';

import {
  Map,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';
import {
  Link
} from 'react-router';

import ArticleTeaser from '../components/teaser/ArticleTeaser';
import ProjectTeaser from '../components/teaser/ProjectTeaser';
import RankingTeaser from '../components/teaser/RankingTeaser';

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
      that.setState({
        projects: result
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

    axios.get('http://localhost:8083/articles/BLOG?page=0&size=2').then(function(response) {
      var result = response.data;
      that.setState({
        teaser: result
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

    axios.get('http://localhost:8081/ranking/bestUser?page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({
        bestUserRanking: result
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

    axios.get('http://localhost:8081/ranking/bestUser?page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({
        bestCompanyRanking: result
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

  render() {
    return (
      <div >
        <div className="row teaser">
          <ProjectTeaser content={this.state.projects.content[0]}/>
          <ArticleTeaser content={this.state.teaser.content[0]}/>
          <RankingTeaser title="Beste Pflanzer" content={this.state.bestUserRanking} imageFolder="user" background="#51a8be"/>
        </div>
        <div className="row teaser">
          <ProjectTeaser content={this.state.projects.content[1]}/>
          <ArticleTeaser content={this.state.teaser.content[1]}/>
          <RankingTeaser title="Beste Firmen" content={this.state.bestCompanyRanking} imageFolder="user" background="#813d59"/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
