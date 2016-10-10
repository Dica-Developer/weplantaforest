import React, {Component} from 'react';
import axios from 'axios';

import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';

import Carousel from './Carousel';
import ArticleTeaser from './ArticleTeaser';
import ProjectTeaser from './ProjectTeaser';
import RankingContainer from './RankingContainer';
import RankingItem from './RankingItem';

require("./teaser.less");

import Boostrap from 'bootstrap';

export default class MainPage extends Component {
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

    axios.get('http://localhost:8082/articles/BLOG?page=0&size=2').then(function(response) {
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
        <NavBar ref="navbar" reRender={this.props.routes[0].reRender.bind(this)}/>
        <Header/>
        <div className="container paddingTopBottom15">
          <Carousel/>
          <div className="teaser">
            <div className="row firstRow">
              <div className="col-md-4">
                <ProjectTeaser content={this.state.projects.content[0]}/>
              </div>
              <div className="col-md-4">
                <ArticleTeaser content={this.state.teaser.content[0]}/>
              </div>
              <div className="col-md-4">
                <RankingContainer title="Beste Pflanzer">
                  {this.state.bestUserRanking.content.map(function(content, i) {
                    return (<RankingItem content={content} imageFolder="user" key={i}/>);
                  })}
                </RankingContainer>
              </div>
            </div>
            <div className="row secondRow">
              <div className="col-md-4">
                <ProjectTeaser content={this.state.projects.content[1]}/>
              </div>
              <div className="col-md-4">
                <ArticleTeaser content={this.state.teaser.content[1]}/>
              </div>
              <div className="col-md-4">
                <RankingContainer title="Beste Firmen">
                  {this.state.bestCompanyRanking.content.map(function(content, i) {
                    return (<RankingItem content={content} imageFolder="user" key={i}/>);
                  })}
                </RankingContainer>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
