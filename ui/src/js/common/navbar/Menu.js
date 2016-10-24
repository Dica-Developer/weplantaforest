import React, {Component} from 'react';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({visible: true});
    document.addEventListener("click", this.hide);
  }

  test() {
    this.setState({visible: false});
  }

  hide() {
    document.removeEventListener("click", this.hide);
    this.setState({visible: false});
  }

  render() {
    return (
      <div className="menu">
        <div className={(this.state.visible
          ? "visible "
          : "notvisible ") + this.props.alignment}>
          <div className="closeMenu">
            <button onClick={this.hide.bind(this)}>
              X
            </button>
          </div>
          {this.props.children}</div>
      </div>
    );
  }
}
