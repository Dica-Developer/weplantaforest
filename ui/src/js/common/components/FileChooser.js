import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';

import IconButton from './IconButton';

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
      trashButton = <IconButton text="VERWERFEN" glyphIcon="glyphicon-trash" onClick={this.undo.bind(this)}/>;
    } else {
      trashButton = '';
    }
    return (
      <div>
        <span>{this.state.imageName}</span>
        <input type="file" className="hiddenInput" ref="fileChooser" accept="image/*" onChange={this.saveFile.bind(this)}/>
        <IconButton text="DATEI AUSWÄHLEN" glyphIcon="glyphicon-search" onClick={this.chooseFile.bind(this)}/>
        {trashButton}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
