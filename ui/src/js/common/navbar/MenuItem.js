import React, {Component} from 'react';
import {Link} from 'react-router';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var link;
    if (this.props.inactive == 'true') {
      link = <span className="inactive">{this.props.children}</span>;
    } else {
      link = <Link to={this.props.hash}>
        {this.props.children}
      </Link>;
    };
    return (
      <div className="menu-item">{link}</div>
    );
  }
}
