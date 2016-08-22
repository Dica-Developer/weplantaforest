import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';
import {Link} from 'react-router';

import Boostrap from 'bootstrap';
import LoadingItem from '../../components/LoadingItem';
import NoTreesAvailable from '../../components/teaser/NoTreesAvailable';
import RankingItem from '../../components/teaser/TimeRankingLarge/RankingItem';

export default class TimeRankingTeaserLarge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newestPlantRanking: {
        content: []
      },
      pageCount: 0
    };

    this.callNextPage = this.callNextPage.bind(this);
    this.callPreviousPage = this.callPreviousPage.bind(this);
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/trees/owner/' + encodeURIComponent(this.props.userName) + '?page=' + that.state.pageCount + '&size=10').then(function(response) {
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

  callNextPage() {
    var that = this;
    if (!this.state.newestPlantRanking.last) {
      var newPage = this.state.pageCount + 1;
      axios.get('http://localhost:8081/trees/owner/' + encodeURIComponent(this.props.userName) + '?page=' + newPage + '&size=10').then(function(response) {
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
      this.setState({pageCount: newPage});
    }
  }

  callPreviousPage() {
    var that = this;
    if (!this.state.newestPlantRanking.first) {
      var newPage = this.state.pageCount - 1;
      axios.get('http://localhost:8081/trees/owner/' + encodeURIComponent(this.props.userName) + '?page=' + newPage + '&size=10').then(function(response) {
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
      this.setState({pageCount: newPage});
    }
  }

  render() {
    var first5Trees = [];
    var last5Trees = [];
    var counter = 1;
    var page = this.state.pageCount;
    var pageContent = [];

    var leftIcon;
    var rightIcon;

    if (this.state.newestPlantRanking.first) {
      leftIcon = "";
    } else {
      leftIcon = "glyphicon-chevron-left";
    };

    if (this.state.newestPlantRanking.last) {
      rightIcon = "";
    } else {
      rightIcon = "glyphicon-chevron-right";
    };

    if (this.state.newestPlantRanking.totalElements >= 0) {
      if (this.state.newestPlantRanking.totalElements > 0) {

        this.state.newestPlantRanking.content.map(function(content) {
          let imageUrl = 'http://localhost:8081/treeType/image/' + content.treeType.imageFile + '/60/60';
          if (counter <= 5) {
            first5Trees.push(<RankingItem imageUrl={imageUrl} rankNumber={page * 10 + counter} content={content}/>);
          } else {
            last5Trees.push(<RankingItem imageUrl={imageUrl} rankNumber={page * 10 + counter} content={content}/>);
          };
          counter++;
        });

        pageContent.push(
          <div>
            <div className="col-md-12">
              <h2>Pflanzungen</h2>
            </div>
            <div className="col-md-6 left">
              <div className="rankingWrapper">
                {first5Trees}
              </div>
              <a className="carousel-control pagingLink" role="button" role="button" onClick={this.callPreviousPage}>
                <span className={"glyphicon " + leftIcon}></span>
              </a>
            </div>
            <div className="col-md-6 right">
              <a className="carousel-control pagingLink rightLink" role="button" onClick={this.callNextPage}>
                <span className={"glyphicon " + rightIcon}></span>
              </a>
              <div className="rankingWrapper">
                {last5Trees}
              </div>
            </div>
          </div>
        );
      } else {
        pageContent.push(<NoTreesAvailable/>);
      }
    } else {
      pageContent.push(<LoadingItem background="#cccccc" colSize="col-md-12"/>);
    };

    return (
      <div className="row timeRankingLarge">
        {pageContent}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
