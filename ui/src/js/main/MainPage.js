import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import Notification from '../common/components/Notification';
import { createProfileImageUrl } from '../common/ImageHelper';
import RankingItemContent from '../common/ranking/content/NameAmountCo2';
import RankingItemContentForNewest from '../common/ranking/content/NameAmountDate';
import RankingItem from '../common/ranking/RankingItem';
import RankingContainer from '../common/ranking/SmallRankingContainer';
import ArticleTeaser from './ArticleTeaser';
import Carousel from './Carousel';
import ProjectTeaser from './ProjectTeaser';

require('./teaser.less');

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      projects: {
        content: [{ positions: [{ lat: 0, lng: 0 }] }, { positions: [{ lat: 0, lng: 0 }] }]
      },
      teaser: {
        content: []
      },
      bestUserRanking: {
        content: []
      },
      bestCompanyRanking: {
        content: []
      },
      lastPlantedTrees: {
        content: []
      }
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:8081/projects/paged?page=0&size=2')
      .then(function(response) {
        var result = response.data;
        that.setState({ projects: result });
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });

    axios
      .get('http://localhost:8082/articlesPaged?articleType=BLOG&language=' + localStorage.getItem('language') + '&page=0&size=4')
      .then(function(response) {
        var result = response.data;
        that.setState({ teaser: result });
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });

    axios
      .get('http://localhost:8081/ranking/bestOrgType/PRIVATE?page=0&size=5&lastYear=true')
      .then(function(response) {
        var result = response.data;
        that.setState({ bestUserRanking: result });
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });

    axios
      .get('http://localhost:8081/ranking/bestOrgType/COMMERCIAL?page=0&size=5&lastYear=true')
      .then(function(response) {
        var result = response.data;
        that.setState({ bestCompanyRanking: result });
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });

    axios
      .get('http://localhost:8081/ranking/lastPlantedTrees?page=0&size=5')
      .then(function(response) {
        var result = response.data;
        that.setState({ lastPlantedTrees: result });
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });
  }

  render() {
    return (
      <div className="container paddingTopBottom15">
        <Carousel />
        <div className="teaser">
          <div className="row firstRow">
            <div className="col-md-4">
              <ArticleTeaser content={this.state.teaser.content[0]} />
            </div>
            <div className="col-md-4">
              <ArticleTeaser content={this.state.teaser.content[1]} />
            </div>
            <div className="col-md-4">
              <RankingContainer title={counterpart.translate('LAST_PLANTED_TREES')}>
                {this.state.lastPlantedTrees.content.map(function(content, i) {
                  let imageUrl = 'http://localhost:8081/treeType/image/' + content.treeTypeImageName + '/60/60';
                  let linkTo = '/user/' + encodeURIComponent(content.name);
                  return (
                    <RankingItem key={i} imageUrl={imageUrl} linkTo={linkTo}>
                      <RankingItemContentForNewest name={content.name} amount={content.amount} plantedOn={content.plantedOn} />
                    </RankingItem>
                  );
                })}
              </RankingContainer>
            </div>
          </div>
          <div className="row secondRow">
            <div className="col-md-4">
              <ProjectTeaser content={this.state.projects.content[0]} />
            </div>
            <div className="col-md-4">
              <ProjectTeaser content={this.state.projects.content[1]} />
            </div>
            <div className="col-md-4">
              <RankingContainer title={counterpart.translate('BEST_COMPANIES')}>
                {this.state.bestCompanyRanking.content.map(function(content, i) {
                  let imageUrl = createProfileImageUrl(content.imageName, 60, 60);
                  let linkTo = '/user/' + encodeURIComponent(content.name);
                  return (
                    <RankingItem key={i} imageUrl={imageUrl} linkTo={linkTo}>
                      <RankingItemContent content={content} />
                    </RankingItem>
                  );
                })}
              </RankingContainer>
            </div>
          </div>
          <div className="row firstRow">
            <div className="col-md-4">
              <ArticleTeaser content={this.state.teaser.content[2]} />
            </div>
            <div className="col-md-4">
              <ArticleTeaser content={this.state.teaser.content[3]} />
            </div>
            <div className="col-md-4">
              <RankingContainer title={counterpart.translate('BEST_PRIVATES')}>
                {this.state.bestUserRanking.content.map(function(content, i) {
                  let imageUrl = createProfileImageUrl(content.imageName, 60, 60);
                  let linkTo = '/user/' + encodeURIComponent(content.name);
                  return (
                    <RankingItem key={i} imageUrl={imageUrl} linkTo={linkTo}>
                      <RankingItemContent content={content} />
                    </RankingItem>
                  );
                })}
              </RankingContainer>
            </div>
          </div>
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}
