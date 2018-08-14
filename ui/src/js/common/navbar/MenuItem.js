import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class MenuItem extends Component {
  constructor() {
    super();
  }

  linkTo(url, event) {
    this.props.hide();
    if(event.nativeEvent.which == 1) {
      browserHistory.push(url);
    }else if(event.nativeEvent.which == 2){
      window.open("http://localhost:8080" + url, "_blank");
    }
  }

  render() {
    var link;
    if (this.props.inactive) {
      link = <span className="inactive">{this.props.children}</span>;
    } else {
      link = <a role="button" onMouseUp={(event) => {
        this.linkTo(this.props.hash, event);
      }}>
      <div dangerouslySetInnerHTML={{ __html: this.props.children }} />
      </a>;
    };
    return (
      <div className="menu-item">{link}</div>
    );
  }
}
