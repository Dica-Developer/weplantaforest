import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';

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
      trashButton = <IconButton text={counterpart.translate('DISCARD')} glyphIcon="glyphicon-trash" onClick={this.undo.bind(this)}/>;
    } else {
      trashButton = '';
    }
    return (
      <div>
        <input type="file" className="hiddenInput" ref="fileChooser" accept="image/*" onChange={this.saveFile.bind(this)}/>
        <IconButton text={counterpart.translate('CHOOSE_FILE')} glyphIcon="glyphicon-search" onClick={this.chooseFile.bind(this)}/>
        {trashButton}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
