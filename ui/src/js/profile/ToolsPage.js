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
