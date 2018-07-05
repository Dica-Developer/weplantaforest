import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import FileUploadProgress from 'react-fileupload-progress';
import Boostrap from 'bootstrap';
import counterpart from 'counterpart';

import IconButton from '../../common/components/IconButton';

export default class FileChooseAndUploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      imageUrl: 'http://localhost:8081/user/image/' + this.props.imageFileName + '/80/80'
    }
  }

  componentDidMount() {
    this.loadImage();
  }

  beforeSend(req) {
    req.setRequestHeader('X-AUTH-TOKEN', localStorage.getItem('jwt'));
    return req
  }

  formGetter() {
    let data = new FormData(document.getElementById('customForm'));
    data.append('userName', localStorage.getItem('username'));
    return data;
  }

  customFormRenderer(onSubmit) {
    let uploadButton;
    if (this.state.fileName != '') {
      uploadButton = <IconButton text="Upload" glyphIcon="glyphicon-upload" onClick={onSubmit}/>;
    } else {
      uploadButton = '';
    }
    return (
      <form id='customForm' className="file-choser-form">
        <label className="fileContainer">
          <span className='glyphicon glyphicon-search' aria-hidden="true"></span>
          {counterpart.translate('CHOOSE_FILE')}
          <input type="file" name='file' id="exampleInputFile" ref="fileChooser" onChange={ (e) => this.fileChanged(e.target.files) } />
        </label>
        <div>
          <label className="file-name">{this.state.fileName}</label>
          {uploadButton}
        </div>
     </form>
    );
  }

  fileChanged(files) {
    if (files && files.length > 0) {
      this.setState({
        fileName: files[0].name
      });
    }
  }

  loadImage() {
    const component = this;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);

      var dataURL = canvas.toDataURL("image/png");
      component.setState({
        liveImage: dataURL
      });
    };

    img.src = `${this.props.image}?${new Date().getTime()}`;
    this.setState({
      loadingImage: img
    });

    var myImageElement = document.getElementById(this.props.imageId);
    myImageElement.src = this.state.imageUrl + '?random=' + Math.random();
  }

  render() {
    let imageUrl;
    let image;

    if (this.props.imageFileName) {
      image = <img id={this.props.imageId} src={this.state.liveImage} alt="profile"/>;
    } else {
      image = '';
    }
    return (
      <div className="file-choser row">
        <div className="col-md-2">
          <label>{counterpart.translate('IMG_LOGO')}:</label>
          {image}
        </div>
        <div className="col-md-10">
          <FileUploadProgress ref="fileupload" key='ex1' url='http://localhost:8081/user/image/upload'
            onProgress={(e, request, progress) => {}}
            onLoad={ (e, request) => { this.loadImage(); }}
            onError={ (e, request) => {}}
            onAbort={ (e, request) => {}}
            beforeSend={this.beforeSend.bind(this)}
            formGetter={this.formGetter.bind(this)}
            formRenderer={this.customFormRenderer.bind(this)} />
        </div>
      </div>
    );
  }
}
