import React, {
  Component
} from 'react';

export default class MenuItem extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }

  render() {
    return (
      <div className="menu-item">{this.props.children}</div>);
  }
}
