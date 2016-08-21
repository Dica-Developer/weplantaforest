import axios from 'axios';
import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import {
  Map,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';
import Accounting from 'accounting';
import {
  Link
} from 'react-router';

import Boostrap from 'bootstrap';

export default class ProjectRankingTeaser extends Component {
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
    axios.get('http://localhost:8081/ranking/' + this.props.rankingType + '/project?projectName=' + this.props.projectName + '&page=' + that.state.pageCount + '&size=5').then(function(response) {
      var result = response.data;
      that.setState({
        ranking: result
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

  callNextPage() {
    var that = this;
    if (!this.state.ranking.last) {
      var newPage = this.state.pageCount + 1;
      axios.get('http://localhost:8081/ranking/' + this.props.rankingType + '/project?projectName=' + this.props.projectName + '&page=' + newPage + '&size=5').then(function(response) {
        var result = response.data;
        that.setState({
          ranking: result
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
      this.setState({
        pageCount: newPage
      });
    }
  }

  callPreviousPage() {
    var that = this;
    if (!this.state.ranking.first) {
      var newPage = this.state.pageCount - 1;
      axios.get('http://localhost:8081/ranking/' + this.props.rankingType + '/project?projectName=' + this.props.projectName + '&page=' + newPage + '&size=5').then(function(response) {
        var result = response.data;
        that.setState({
          ranking: result
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
      this.setState({
        pageCount: newPage
      });
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
      <div className={"col-md-4 " + this.props.background + " projectRanking"}>
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
          let co2Rounded = Accounting.formatNumber(content.co2Saved, 3, ".", ",");
          let imageUrl = 'http://localhost:8081/' + imageFolder + '/image/' + content.imageName + '/60/60';
          rankCnt++;
          return (
            <div>
              <div className="rankingNumber">{page * 5 + rankCnt}</div>
              <img className="ranking-img" src={imageUrl} alt="logo"/>
              <div className="rankingSummary">
                <p >
                  <Link to={`/` + imageFolder + `/` + content.name}>
                    <span className="name">{content.name}</span>
                  </Link>
                  <br/>
                  <span className="stats">B&auml;ume gepflant:&nbsp;{content.amount}</span><br/>
                  <span className="stats">CO<sub>2</sub>&nbsp;gebunden:</span>
                  <span className="stats">{co2Rounded}&nbsp;t</span>
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
