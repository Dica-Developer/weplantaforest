import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import PolygonMap from '../common/components/PolygonMap';
import SvgButton from '../common/components/SvgButton';
import { createProfileImageUrl, createTeamImageUrl } from '../common/ImageHelper';
import RankingContentNameAmountCo2 from '../common/ranking/content/NameAmountCo2';
import RankingContentNameAmountDate from '../common/ranking/content/NameAmountDate';
import RankingItem from '../common/ranking/RankingItem';
import SmallRankingContainer from '../common/ranking/SmallRankingContainer';
import ProjectPlanting from './planting/ProjectPlantingWithoutSlider';
import ProjectCarousel from './ProjectCarousel';
import ProjectDetails from './ProjectDetails';

require('./projectPage.less');

export default class ProjectDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        projectReportData: {
          projectName: 'default project',
          description: '',
          projectImageFileName: 'test.jpg',
          latitude: 0,
          longitude: 0,
          amountOfMaximumTreesToPlant: 0,
          amountOfPlantedTrees: 0
        },
        images: [],
        positions: []
      },
      articles: [],
      detailsActive: true,
      bestTeam: {
        content: []
      },
      bestTeamPage: 0,
      bestUser: {
        content: []
      },
      bestUserPage: 0,
      lastPlantedTrees: {
        content: []
      },
      lastPlantedTreesPage: 0
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:8081/projects/search/name/extended/' + encodeURIComponent(this.props.params.projectName))
      .then(function(response) {
        var result = response.data;
        that.setState({
          project: result
        });
      })
      .catch(function(response) {
        if (response instanceof Error) {
          console.error('Error', response.message);
        } else {
          console.error(response.data);
          console.error(response.status);
          console.error(response.headers);
          console.error(response.config);
        }
      });

    axios
      .get('http://localhost:8081/ranking/bestUser/project?projectName=' + this.props.params.projectName + '&page=0&size=5')
      .then(function(response) {
        var result = response.data;
        that.setState({
          bestUser: result
        });
      })
      .catch(function(response) {
        if (response instanceof Error) {
          console.error('Error', response.message);
        } else {
          console.error(response.data);
          console.error(response.status);
          console.error(response.headers);
          console.error(response.config);
        }
      });

    axios
      .get('http://localhost:8081/ranking/bestTeam/project?projectName=' + this.props.params.projectName + '&page=0&size=5')
      .then(function(response) {
        var result = response.data;
        that.setState({
          bestTeam: result
        });
      })
      .catch(function(response) {
        if (response instanceof Error) {
          console.error('Error', response.message);
        } else {
          console.error(response.data);
          console.error(response.status);
          console.error(response.headers);
          console.error(response.config);
        }
      });

    axios
      .get('http://localhost:8081/ranking/lastPlantedTrees/project?projectName=' + this.props.params.projectName + '&page=0&size=5')
      .then(function(response) {
        var result = response.data;
        that.setState({
          lastPlantedTrees: result
        });
      })
      .catch(function(response) {
        if (response instanceof Error) {
          console.error('Error', response.message);
        } else {
          console.error(response.data);
          console.error(response.status);
          console.error(response.headers);
          console.error(response.config);
        }
      });
    axios
      .get('http://localhost:8081/project/articles?projectName=' + this.props.params.projectName)
      .then(function(response) {
        var result = response.data;
        that.setState({
          articles: result
        });
      })
      .catch(function(response) {
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

  callNextPage(rankingType, page) {
    var that = this;
    var newPage = page + 1;
    axios
      .get('http://localhost:8081/ranking/' + rankingType + '/project?projectName=' + this.props.params.projectName + '&page=' + newPage + '&size=5')
      .then(function(response) {
        var result = response.data;
        that.setState({
          [rankingType]: result
        });
      })
      .catch(function(response) {
        if (response instanceof Error) {
          console.error('Error', response.message);
        } else {
          console.error(response.data);
          console.error(response.status);
          console.error(response.headers);
          console.error(response.config);
        }
      });
    that.setState({
      [rankingType + 'Page']: newPage
    });
  }

  callPreviousPage(rankingType, page) {
    var that = this;
    var newPage = page - 1;
    axios
      .get('http://localhost:8081/ranking/' + rankingType + '/project?projectName=' + this.props.params.projectName + '&page=' + newPage + '&size=5')
      .then(function(response) {
        var result = response.data;
        that.setState({
          [rankingType]: result
        });
      })
      .catch(function(response) {
        if (response instanceof Error) {
          console.error('Error', response.message);
        } else {
          console.error(response.data);
          console.error(response.status);
          console.error(response.headers);
          console.error(response.config);
        }
      });
    that.setState({
      [rankingType + 'Page']: newPage
    });
  }

  setDetailsActive(value) {
    this.setState({
      detailsActive: value
    });
    window.scrollTo(0, 0);
  }

  updatePlantBag(overallPrice, projectItems, projectName) {
    this.props.route.updatePlantBag(overallPrice, projectItems, projectName, false);
  }

  render() {
    let bestUserPage = this.state.bestUserPage;
    let bestTeamPage = this.state.bestTeamPage;
    let lastPlantedTreesPage = this.state.lastPlantedTreesPage;
    let mainPart;
    let plantButton;
    let map;

    if (this.state.detailsActive) {
      mainPart = (
        <div>
          <ProjectCarousel projectName={this.props.params.projectName} slides={this.state.project.images.reverse()} />
          <ProjectDetails project={this.state.project} />
        </div>
      );
      map = (
        <div className="row project-map">
          <div className="col-md-12">
            <PolygonMap positions={this.state.project.positions} />
          </div>
        </div>
      );
    } else {
      mainPart = (
        <ProjectPlanting
          projectName={this.props.params.projectName}
          showDetails={() => {
            this.setDetailsActive(true);
          }}
          articles={this.state.articles}
          updatePlantBag={this.updatePlantBag.bind(this)}
          amount="5"
        />
      );
      map = '';
    }

    if (
      this.state.project.projectReportData.active &&
      this.state.detailsActive &&
      this.state.project.projectReportData.amountOfPlantedTrees < this.state.project.projectReportData.amountOfMaximumTreesToPlant
    ) {
      plantButton = (
        <SvgButton
          text={counterpart.translate('PLANT_HERE')}
          buttonType="mouse"
          onClick={() => {
            this.setDetailsActive(false);
          }}
        />
      );
    } else {
      plantButton = '';
    }

    return (
      <div className="container paddingTopBottom15 projectPage">
        <div className="row">
          <div className="col-md-12">{mainPart}</div>
        </div>
        {map}
        <div className="row plant-button">
          <div className="col-md-12">
            <div className="align-center">{plantButton}</div>
          </div>
        </div>
        <div className="row projectRankings">
          <div className="col-md-4">
            <SmallRankingContainer
              title={counterpart.translate('BEST_TEAMS')}
              withPaging={true}
              rankingType="bestTeam"
              page={bestTeamPage}
              callPreviousPage={this.callPreviousPage.bind(this)}
              callNextPage={this.callNextPage.bind(this)}
              isFirstPage={this.state.bestTeam.first}
              isLastPage={this.state.bestTeam.last}
            >
              {this.state.bestTeam.content.map(function(content, i) {
                let imageUrl = createTeamImageUrl(content.imageName, 60, 60);
                let linkTo = '/team/' + encodeURIComponent(content.name);
                return (
                  <RankingItem content={content} key={i} rankNumber={bestTeamPage * 5 + (i + 1)} imageUrl={imageUrl} showRankNumber="true" linkTo={linkTo}>
                    <RankingContentNameAmountCo2 content={content} />
                  </RankingItem>
                );
              })}
            </SmallRankingContainer>
          </div>
          <div className="col-md-4">
            <SmallRankingContainer
              title={counterpart.translate('BEST_PLANTERS')}
              withPaging={true}
              rankingType="bestUser"
              page={bestUserPage}
              callPreviousPage={this.callPreviousPage.bind(this)}
              callNextPage={this.callNextPage.bind(this)}
              isFirstPage={this.state.bestUser.first}
              isLastPage={this.state.bestUser.last}
            >
              {this.state.bestUser.content.map(function(content, i) {
                let imageUrl = createProfileImageUrl(content.imageName, 60, 60);
                let linkTo = '/user/' + encodeURIComponent(content.name);
                return (
                  <RankingItem content={content} key={i} rankNumber={bestUserPage * 5 + (i + 1)} imageUrl={imageUrl} showRankNumber="true" linkTo={linkTo}>
                    <RankingContentNameAmountCo2 content={content} />
                  </RankingItem>
                );
              })}
            </SmallRankingContainer>
          </div>
          <div className="col-md-4">
            <SmallRankingContainer
              title={counterpart.translate('NEWEST_PLANTINGS')}
              withPaging={true}
              rankingType="lastPlantedTrees"
              page={lastPlantedTreesPage}
              callPreviousPage={this.callPreviousPage.bind(this)}
              callNextPage={this.callNextPage.bind(this)}
              isFirstPage={this.state.lastPlantedTrees.first}
              isLastPage={this.state.lastPlantedTrees.last}
            >
              {this.state.lastPlantedTrees.content.map(function(content, i) {
                let imageUrl = 'http://localhost:8081/treeType/image/' + content.treeTypeImageName + '/60/60';
                let linkTo = '/user/' + encodeURIComponent(content.name);
                return (
                  <RankingItem imageUrl={imageUrl} key={i} linkTo={linkTo}>
                    <RankingContentNameAmountDate name={content.name} amount={content.amount} plantedOn={content.plantedOn} />
                  </RankingItem>
                );
              })}
            </SmallRankingContainer>
          </div>
        </div>
      </div>
    );
  }
}
