import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Accounting from 'accounting';
import {Link} from 'react-router';
import moment from 'moment';

import Boostrap from 'bootstrap';

export default class ProjectTimeRankingTeaser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: {
        content: []
      },
      pageCount: 0
    };

    this.callNextPage = this.callNextPage.bind(this);
    this.callPreviousPage = this.callPreviousPage.bind(this);
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/ranking/lastPlantedTrees/project?projectName=' + this.props.projectName + '&page=' + that.state.pageCount + '&size=5').then(function(response) {
      var result = response.data;
      that.setState({ranking: result});
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
    var that = this;
    if (!this.state.ranking.last) {
      var newPage = this.state.pageCount + 1;
      axios.get('http://localhost:8081/ranking/lastPlantedTrees/project?projectName=' + this.props.projectName + '&page=' + newPage + '&size=5').then(function(response) {
        var result = response.data;
        that.setState({ranking: result});
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
      this.setState({pageCount: newPage});
    }
  }

  callPreviousPage() {
    var that = this;
    if (!this.state.ranking.first) {
      var newPage = this.state.pageCount - 1;
      axios.get('http://localhost:8081/ranking/lastPlantedTrees/project?projectName=' + this.props.projectName + '&page=' + newPage + '&size=5').then(function(response) {
        var result = response.data;
        that.setState({ranking: result});
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
      this.setState({pageCount: newPage});
    }
  }

  render() {
    var imageFolder = this.props.imageFolder;
    var content = this.state.ranking.content;
    var rankCnt = 0;
    var page = this.state.pageCount;

    var topIcon;
    if (!this.state.ranking.first) {
      topIcon = "glyphicon-menu-up";
    } else {
      topIcon = "glyphicon-minus";
    };

    var bottomIcon = "";
    if (!this.state.ranking.last) {
      bottomIcon = "glyphicon-menu-down";
    } else {
      bottomIcon = "glyphicon-minus";
    };
    return (
      <div className={"col-md-4 " + this.props.background + " projectTimeRanking"}>
        <h2>
          <i>{this.props.title}</i>
        </h2>
        <a className="pagingLink" role="button" onClick={this.callPreviousPage}>
          <div>
            <span className={"glyphicon " + topIcon}></span>
          </div>
        </a>
        <div className="rankingWrapper">
          {content.map(function(content) {
            let imageUrl = 'http://localhost:8081/' + imageFolder + '/image/' + content.treeTypeImageName + '/60/60';
            return (
              <div>
                <img className="ranking-img" src={imageUrl} alt="logo"/>
                <div className="rankingSummary">
                  <p >
                    <Link to={`/user/` + content.name}>
                      <span className="name">{content.name}</span>
                    </Link><br/>
                    <span className="stats">B&auml;ume gepflant:&nbsp;{content.amount}</span><br/>
                    <span className="stats">Datum:</span>
                    <span className="stats">{moment(content.plantedOn).format("DD.MM.YYYY")}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <a className="pagingLink" role="button" onClick={this.callNextPage}>
          <div>
            <span className={"glyphicon " + bottomIcon}></span>
          </div>
        </a>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
