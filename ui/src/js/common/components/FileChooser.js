import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

require("./fileChooser.less");

export default class FileChooser extends Component {

  constructor() {
    super();
    this.state = {
      file: null,
      imageName: ''
    };
  }

  chooseFile() {
    this.refs.fileChooser.click();
  }

  saveFile() {
    this.setState({
      file: this.refs.fileChooser.files[0],
      imageName: this.refs.fileChooser.files[0].name
    });
    this.props.updateFile(this.refs.fileChooser.files[0].name, this.refs.fileChooser.files[0]);
  }

  undo() {
    this.setState({
      file: null,
      imageName: ''
    });
    this.props.updateFile('', null);
  }

  render() {
    var trashButton;
    if (this.state.imageName != '') {
      trashButton = <div><a role="button" onClick={this.undo.bind(this)}>
        <div>
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          <span>
            VERWERFEN
          </span>
        </div>
      </a></div>;
    } else {
      trashButton = '';
    }
    return (
      <div className="fileChooser">
        <span>{this.state.imageName}</span>
        <input type="file" className="hiddenInput" ref="fileChooser" accept="image/*" onChange={this.saveFile.bind(this)}/>
        <a role="button" onClick={this.chooseFile.bind(this)}>
          <div>
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            <span>DATEI AUSWÄHLEN</span>
          </div>
        </a>
        {trashButton}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
