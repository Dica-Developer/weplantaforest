import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';

import Tools from './tools/Tools';

export default class ToolsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
      },
      pageCount: 0
    };
  }

  callNextPage() {
    var newPage = this.state.pageCount + 1;
    this.callPage(newPage);
    this.setState({pageCount: newPage});
  }

  callPreviousPage() {
    var newPage = this.state.pageCount - 1;
    this.callPage(newPage);
    this.setState({pageCount: newPage});
  }

  callPage(page) {
    var that = this;
    axios.get('http://localhost:8081/trees/owner?userName=' + encodeURIComponent(this.props.params.userName) + '&page=' + page + '&size=15').then(function(response) {
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

  updateLanguage(value) {
    this.refs['navbar'].updateLanguage(value);
  }

  render() {
    var that = this;
    var toolsPart;
    var page = this.state.pageCount;

    if (this.state.user.editAllowed) {
      toolsPart = <Tools/>;
    } else {
      toolsPart = '';
    }

    toolsPart = <Tools/>;

    return (
      <div className="container paddingTopBottom15">
        {toolsPart}
      </div>
    );
  }
}
