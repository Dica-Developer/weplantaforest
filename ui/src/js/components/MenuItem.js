import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router';

export default class MenuItem extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="menu-item">  <Link to={this.props.hash}>
          {this.props.children}  </Link></div>);
  }
}
