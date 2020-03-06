import counterpart from 'counterpart';
import React, { Component } from 'react';
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

    var file = this.refs.fileChooser.files[0];
    var reader = new FileReader();
    reader.width = 100;
    reader.height = 100;
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);

    this.props.updateFile(this.refs.fileChooser.files[0].name, this.refs.fileChooser.files[0]);
  }

  undo() {
    this.setState({
      file: null,
      imageName: '',
      imagePreviewUrl: ''
    });
    this.props.updateFile('', null);
  }

  render() {
    var trashButton;
    if (this.state.imageName != '') {
      trashButton = <IconButton text={counterpart.translate('DISCARD')} glyphIcon="glyphicon-trash" onClick={this.undo.bind(this)} />;
    } else {
      trashButton = '';
    }

    let image;
    if (this.state.imagePreviewUrl && this.state.imagePreviewUrl != '') {
      image = <img src={this.state.imagePreviewUrl} height="100" width="100" />;
    } else {
      image = '';
    }
    return (
      <div>
        <input type="file" className="hiddenInput" ref="fileChooser" accept="image/*" onChange={this.saveFile.bind(this)} />
        <IconButton text={counterpart.translate('CHOOSE_FILE')} glyphIcon="glyphicon-search" onClick={this.chooseFile.bind(this)} />
        &nbsp;
        {trashButton}
        <br />
        {image}
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
