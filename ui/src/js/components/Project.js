import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Boostrap from 'bootstrap';
import PieChart from 'react-simple-pie-chart';
import Accounting from 'accounting';
import {Link} from 'react-router';
import ProjectCarousel from '../components/ProjectCarousel';
import RankingTeaser from '../components/teaser/RankingTeaser';
import ProjectRankingTeaser from '../components/teaser/ProjectRankingTeaser';
import TimeRankingTeaser from '../components/teaser/TimeRankingTeaser';

export default class Project extends Component {

  constructor() {
    super();
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
      bestTeamRanking: {
        content: []
      },
      bestUserRanking: {
        content: []
      },
      newestPlantRanking: {
        content: []
      }
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/projects/search/name/extended/' + encodeURIComponent(this.props.projectName)).then(function(response) {
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

    axios.get('http://localhost:8081/ranking/bestUser/project?projectName=' + this.props.projectName + '&page=0&size=5').then(function(response) {
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

    axios.get('http://localhost:8081/ranking/bestTeam/project?projectName=' + this.props.projectName + '&page=0&size=5').then(function(response) {
      var result = response.data;
      that.setState({bestTeamRanking: result});
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

    axios.get('http://localhost:8081/ranking/lastPlantedTrees/project?projectName=' + this.props.projectName + '&page=0&size=5').then(function(response) {
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

  render() {
    let project = this.state.project;
    var percent = project.projectReportData.amountOfPlantedTrees / project.projectReportData.amountOfMaximumTreesToPlant * 100;
    var formattedPercent = Accounting.formatNumber(percent, 0, ".", ",")
    return (
      <div>
        <div className="row project">
          <div className="col-md-12 carousel">
            <ProjectCarousel projectName={project.projectReportData.projectName} slides={project.images}/>
          </div>
          <div className="col-md-12 ">
            <div></div>
            <h2>Projektfläche:&nbsp;
              <i>{project.projectReportData.projectName}</i>
            </h2>
            <table align="center">
              <tbody>
                <tr>
                  <td>
                    <div className="floatRight">
                      <span className="greenValue">{formattedPercent}%</span><br/>
                      <span className="tableText">
                        <i>bepflanzt</i>
                      </span>
                    </div>
                  </td>
                  <td className="midTd">
                    <PieChart slices={[
                      {
                        color: '#82ab1f',
                        value: percent
                      }, {
                        color: '#fff',
                        value: 100 - percent
                      }
                    ]}/>
                  </td>
                  <td >
                    <span className="greenValue">{Accounting.formatNumber(project.projectReportData.amountOfPlantedTrees, 0, ".", ",")}</span><br/>
                    <span className="tableText">
                      <i>von {Accounting.formatNumber(project.projectReportData.amountOfMaximumTreesToPlant, 0, ".", ",")}&nbsp;Bäumen</i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="description">
              <p>{project.projectReportData.description}</p>
            </div>
          </div>

          <div className="col-md-4 "></div>
          <div className="col-md-4 ">
            <Link to="/plant" className="plantLink">
              <div>
                <img src="/assets/images/Maus.png" alt="online pflanzen" width="50" height="50"/>
                <span className="no-link-deco">HIER PFLANZEN</span>
              </div>
            </Link>
          </div>
          <div className="col-md-4 "></div>
        </div>
        <div className="row teaser">
          <ProjectRankingTeaser title="Beste Teams im Projekt" rankingType="bestTeam" projectName={this.props.projectName} background="lightBlue" imageFolder="team"/>
          <ProjectRankingTeaser title="Beste Pflanzer im Projekt" rankingType="bestUser" projectName={this.props.projectName} background="grey" imageFolder="user"/>
          <TimeRankingTeaser title="Neueste Pflanzungen im Projekt" content={this.state.newestPlantRanking} background="violett" imageFolder="treeType"/>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
