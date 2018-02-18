import React, {Component} from 'react';
import {render} from 'react-dom';

import Boostrap from 'bootstrap';

import IconButton from '../../common/components/IconButton';

export default class FileChooseAndUploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  chooseFile() {
    this.refs.fileChooser.click();
  }

  saveFile() {
    this.setState({file: this.refs.fileChooser.files[0]});
    this.props.setImageName(this.refs.fileChooser.files[0].name);
  }

  undo() {
    this.setState({file: null});
    this.props.setImageName('');
  }

  uploadImage() {
    this.props.uploadImage(this.state.file);
    this.setState({file: null});
    this.props.setImageName('');
  }

  render() {
    var filePart;
    var uploadPart;
    if (this.state.file) {
      filePart = <IconButton text="verwerfen" glyphIcon="glyphicon-trash" onClick={this.undo.bind(this)}/>;
      uploadPart = <IconButton text="hochladen" glyphIcon="glyphicon-upload" onClick={this.uploadImage.bind(this)}/>;
    } else {
      filePart = <div className="left">
          <input type="file" className="hiddenInput" ref="fileChooser" accept="image/*" onChange={this.saveFile.bind(this)}/>
          <IconButton text="Datei auswählen" glyphIcon="glyphicon-search" onClick={this.chooseFile.bind(this)}/>
      </div>;
      uploadPart = <div className="left noUpload">
        <span className="glyphicon glyphicon-upload" aria-hidden="true"></span>
        <span>
          HOCHLADEN
        </span>
      </div>;
    }

    return (
      <div>
        {filePart}&nbsp; {uploadPart}
      </div>
    );
  }
}
