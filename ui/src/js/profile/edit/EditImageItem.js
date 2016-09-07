import axios from 'axios';
import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';

import UploadButton from './UploadButton';
import FileChooseAndUploadButton from './FileChooseAndUploadButton';

export default class EditImageItem extends Component {
  constructor(props) {
    super(props);
    this.state = ({imageName: ''});
  }

  uploadImage(file) {
    this.props.uploadImage(file);
  }

  setImageName(imageName) {
    this.setState({imageName: imageName});
  }

  render() {
    return (
      <div className="editItem">
        <div className="left">
          <span className="bold">Bild/Logo:&nbsp;</span>{this.state.imageName}
        </div>
        <div className="right">
          <FileChooseAndUploadButton userName={this.props.userName} uploadImage={this.uploadImage.bind(this)} setImageName={this.setImageName.bind(this)}/>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
