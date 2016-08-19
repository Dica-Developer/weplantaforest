import React, {Component} from 'react';
import Boostrap from 'bootstrap';
import axios from 'axios';

import ArticleTeaser from '../components/teaser/ArticleTeaser';
import ProjectTeaser from '../components/teaser/ProjectTeaser';
import RankingTeaser from '../components/teaser/RankingTeaser';

export default class Teaser extends Component {
  constructor() {
    super();
    this.state = {
      projects: {
        content: [
          {
            projectId: '',
            projectName: '',
            description: '',
            longitude: 0,
            latitude: 0,
            amountOfMaximumTreesToPlant: '',
            amountOfPlantedTrees: ''
          }, {
            projectId: '',
            projectName: '',
            description: '',
            longitude: 0,
            latitude: 0,
            amountOfMaximumTreesToPlant: '',
            amountOfPlantedTrees: ''
          }
        ]
      },
      teaser: {
        content: [
          {
            id: '',
            title: '',
            imageFileName: '',
            intro: ''
          }, {
            id: '',
            title: '',
            imageFileName: '',
            intro: ''
          }
        ]
      },
      bestUserRanking: {
        content: [
          {
            name: '',
            amount: 0,
            co2Saved: 0.0,
            imageName: ''
          }
        ]
      },
      bestCompanyRanking: {
        content: [
          {
            name: '',
            amount: 0,
            co2Saved: 0.0,
            imageName: ''
          }
        ]
      }
    };
  }

  componentDidMount() {
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
    return (
      <div>
        <div className="row teaser is-table-row">
          <ProjectTeaser content={this.state.projects.content[0]}/>
          <ArticleTeaser content={this.state.teaser.content[0]}/>
          <RankingTeaser title="Beste Pflanzer" content={this.state.bestUserRanking} background="lightBlue" rankingGroup="user"/>
        </div>
        <div className="row teaser is-table-row">
          <ProjectTeaser content={this.state.projects.content[1]}/>
          <ArticleTeaser content={this.state.teaser.content[1]}/>
          <RankingTeaser title="Beste Firmen" content={this.state.bestCompanyRanking} background="violett" rankingGroup="user"/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
