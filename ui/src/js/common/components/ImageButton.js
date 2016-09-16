import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

require("./imageButton.less");

export default class ImageButton extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="imageButton">
        <a role="button" onClick={this.props.onClick.bind(this)}>
          <img src={this.props.imagePath} alt={this.props.imageAlt} width={this.props.imageWidth} height={this.props.imageHeight}/>
          <span>{this.props.text}</span>
        </a>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
