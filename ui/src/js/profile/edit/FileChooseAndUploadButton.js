import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';

import Boostrap from 'bootstrap';

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
    this.setState({
      file: this.refs.fileChooser.files[0]
    });
    this.props.setImageName(this.refs.fileChooser.files[0].name);
  }

  undo() {
    this.setState({
      file: null
    });
    this.props.setImageName('');
  }

  uploadImage() {
    this.props.uploadImage(this.state.file);
    this.setState({
      file: null
    });
    this.props.setImageName('');
  }

  render() {
    var filePart;
    var uploadPart;
    if (this.state.file) {
      filePart = <div className="left"><a role="button" className="link" onClick={this.undo.bind(this)}>
          <div className="right">
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            <span className="no-link-deco">
              VERWERFEN
            </span>
          </div>
        </a></div>;
      uploadPart = <a role="button" className="link upload" onClick={this.uploadImage.bind(this)}>
        <div className="left">
          <span className="glyphicon glyphicon-upload" aria-hidden="true"></span>
          <span className="no-link-deco">
          HOCHLADEN
          </span>
        </div>
      </a>;
    } else {
      filePart =
        <div className="left">
          <input type="file" className="hiddenInput" ref="fileChooser" accept="image/*" onChange={this.saveFile.bind(this)}/>
          <a role="button" className="link upload" onClick={this.chooseFile.bind(this)}>
          <div>
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            <span className="no-link-deco">
              DATEI AUSWÄHLEN
            </span>
          </div>
        </a>
      </div>;
      uploadPart = <div className="left noUpload">
          <span className="glyphicon glyphicon-upload" aria-hidden="true"></span>
          <span className="no-link-deco">
          HOCHLADEN
          </span>
        </div>;
    }

    return (
      <div>
        {filePart}
        {uploadPart}
      </div>
    );
  }
}
