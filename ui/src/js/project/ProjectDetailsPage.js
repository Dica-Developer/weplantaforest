import React, {Component} from 'react';
import {render} from 'react-dom';
import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';
import Boostrap from 'bootstrap';
import axios from 'axios';

import ProjectCarousel from './ProjectCarousel';
import ProjectDetails from './ProjectDetails';
import ProjectPlanting from './planting/ProjectPlanting';
import ProjectRankingContainer from './ranking/ProjectRankingContainer';
import RankingItem from './ranking/RankingItem';
import TimeRankingItem from './ranking/TimeRankingItem';

require("./projectPage.less");

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
        images: []
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
    axios.get('http://localhost:8081/projects/search/name/extended/' + encodeURIComponent(this.props.params.projectName)).then(function(response) {
      var result = response.data;
      that.setState({project: result});
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

    axios.get('http://localhost:8081/ranking/bestUser/project?projectName=' + this.props.params.projectName + '&page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({bestUser: result});
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

    axios.get('http://localhost:8081/ranking/bestTeam/project?projectName=' + this.props.params.projectName + '&page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({bestTeam: result});
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

    axios.get('http://localhost:8081/ranking/lastPlantedTrees/project?projectName=' + this.props.params.projectName + '&page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({lastPlantedTrees: result});
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
    axios.get('http://localhost:8081/project/articles?projectName=' + this.props.params.projectName).then(function(response) {
      var result = response.data;
      that.setState({articles: result});
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

  callNextPage(rankingType, page) {
    var that = this;
    var newPage = page + 1;
    axios.get('http://localhost:8081/ranking/' + rankingType + '/project?projectName=' + this.props.params.projectName + '&page=' + newPage + '&size=5').then(function(response) {
      var result = response.data;
      that.setState({[rankingType]: result});
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
    that.setState({
      [rankingType + 'Page']: newPage
    });
  }

  callPreviousPage(rankingType, page) {
    var that = this;
    var newPage = page - 1;
    axios.get('http://localhost:8081/ranking/' + rankingType + '/project?projectName=' + this.props.params.projectName + '&page=' + newPage + '&size=5').then(function(response) {
      var result = response.data;
      that.setState({[rankingType]: result});
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
    that.setState({
      [rankingType + 'Page']: newPage
    });
  }

  setDetailsActive(value) {
    this.setState({detailsActive: value});
  }

  updatePlantBag(overallPrice, projectItems, projectName){
    this.refs['navBar'].updatePlantBag(overallPrice, projectItems, projectName);
  }

  render() {
    var bestUserPage = this.state.bestUserPage;
    var bestTeamPage = this.state.bestTeamPage;
    var lastPlantedTreesPage = this.state.lastPlantedTreesPage;
    var mainPart;

    if (this.state.detailsActive) {
      mainPart = <div><ProjectCarousel projectName={this.props.params.projectName} slides={this.state.project.images}/>
        <ProjectDetails project={this.state.project} showPlanting={()=>{this.setDetailsActive(false)}}/></div>;
    } else {
      mainPart = <ProjectPlanting projectName={this.props.params.projectName} showDetails={()=>{this.setDetailsActive(true)}} articles={this.state.articles} updatePlantBag={this.updatePlantBag.bind(this)}/>;
    };

    return (
      <div className="projectPage">
        <NavBar ref="navBar"/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row">
            <div className="col-md-12">
              {mainPart}
            </div>
            <div className="projectRankings">
              <div className="col-md-4">
                <ProjectRankingContainer title="Beste Teams im Projekt" rankingType="bestTeam" page={bestUserPage} callPreviousPage={this.callPreviousPage.bind(this)} callNextPage={this.callNextPage.bind(this)} isFirstPage={this.state.bestTeam.first} isLastPage={this.state.bestTeam.last}>
                  {this.state.bestTeam.content.map(function(content, i) {
                    return (<RankingItem content={content} imageFolder="team" key={i} rankNumber={bestTeamPage * 5 + (i + 1)}/>);
                  })}
                </ProjectRankingContainer>
              </div>
              <div className="col-md-4">
                <ProjectRankingContainer title="Beste Pflanzer im Projekt" rankingType="bestUser" page={bestUserPage} callPreviousPage={this.callPreviousPage.bind(this)} callNextPage={this.callNextPage.bind(this)} isFirstPage={this.state.bestUser.first} isLastPage={this.state.bestUser.last}>
                  {this.state.bestUser.content.map(function(content, i) {
                    return (<RankingItem content={content} imageFolder="user" key={i} rankNumber={bestUserPage * 5 + (i + 1)}/>);
                  })}
                </ProjectRankingContainer>
              </div>
              <div className="col-md-4">
                <ProjectRankingContainer title="Neueste Pflanzungen im Projekt" rankingType="lastPlantedTrees" page={lastPlantedTreesPage} callPreviousPage={this.callPreviousPage.bind(this)} callNextPage={this.callNextPage.bind(this)} isFirstPage={this.state.lastPlantedTrees.first} isLastPage={this.state.lastPlantedTrees.last}>
                  {this.state.lastPlantedTrees.content.map(function(content, i) {
                    return (<TimeRankingItem content={content} imageFolder="treeType" key={i}/>);
                  })}
                </ProjectRankingContainer>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
