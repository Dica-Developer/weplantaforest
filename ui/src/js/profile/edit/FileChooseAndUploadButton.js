import counterpart from 'counterpart';
import React, { Component } from 'react';
import FileUploadProgress from 'react-fileupload-progress';
import IconButton from '../../common/components/IconButton';
import { createProfileImageUrl } from '../../common/ImageHelper';
import Notification from '../../common/components/Notification';

export default class FileChooseAndUploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      fileWarning: '',
    };
    this.styles = {
      progressWrapper: {
        height: '15px',
        marginTop: '10px',
        width: '100%',
        float: 'left',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
      },
      progressBar: {
        float: 'left',
        height: '100%',
        textAlign: 'center',
        backgroundColor: '#82AB1f',
        WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        WebkitTransition: 'width .6s ease',
        Otransition: 'width .6s ease',
        transition: 'width .6s ease',
      },
    };
  }

  componentDidMount() {
    this.loadImage(this.props.imageFileName);
  }

  beforeSend(req) {
    req.setRequestHeader('X-AUTH-TOKEN', localStorage.getItem('jwt'));
    return req;
  }

  formGetter() {
    let data = new FormData(document.getElementById('userIamgeForm'));
    data.append('userName', localStorage.getItem('username'));
    return data;
  }

  customFormRenderer(onSubmit) {
    let uploadButton;
    if (this.state.fileName != '') {
      uploadButton = <IconButton text="Upload" glyphIcon="glyphicon-upload" onClick={onSubmit} />;
    } else {
      uploadButton = '';
    }
    return (
      <form id="userIamgeForm" className="file-choser-form">
        <label className="fileContainer">
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          {counterpart.translate('CHOOSE_FILE')}
          <input type="file" name="file" id="exampleInputFile" ref="fileChooser" onChange={(e) => this.fileChanged(e.target.files)} accept="image/png, image/jpeg" />
        </label>
        <div>
          <label className="file-name">{this.state.fileName}</label>
          <label className="file-error">{this.state.fileWarning}</label>
          {uploadButton}
        </div>
      </form>
    );
  }

  customProgressRenderer(progress, hasError, cancelHandler) {
    if (hasError || progress > -1) {
      let barStyle = Object.assign({}, this.styles.progressBar);
      barStyle.width = progress + '%';

      let message = <span>{barStyle.width}</span>;
      if (progress === 100 && !hasError) {
        message = <span>{counterpart.translate('UPLOAD_FINISHED')}</span>;
      }

      return (
        <div>
          <div style={this.styles.progressWrapper}>
            <div style={barStyle}></div>
          </div>
          <div style={{ clear: 'left' }}>{message}</div>
        </div>
      );
    } else {
      return;
    }
  }

  fileChanged(files) {
    let acceptedTypes = ['image/png', 'image/jpeg'];
    if (files && files.length > 0) {
      if (files[0].size > 1048576) {
        this.setState({
          fileWarning: counterpart.translate('FILE_TOO_BIG'),
        });
      } 
      else if (!acceptedTypes.includes[files[0].type]) {
        this.setState({
          fileWarning: counterpart.translate('WRONG_IMAGE_TYPE'),
        });
      }
       else {
        this.setState({
          fileName: files[0].name,
          fileWarning: '',
        });
      }
    }
  }

  loadImage(imageName) {
    const component = this;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0);
      var dataURL = canvas.toDataURL();
      component.setState({
        liveImage: dataURL,
      });
    };

    img.src = createProfileImageUrl(imageName, 80, 80);
    this.setState({
      loadingImage: img,
    });
    this.props.updateImageName(imageName);
  }

  render() {
    let image;

    if (this.props.imageFileName) {
      image = <img id={this.props.imageId} src={this.state.liveImage} alt="profile" width="80" height="80" />;
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
          <FileUploadProgress
            ref="fileupload"
            key="ex1"
            url="http://localhost:8081/user/image/upload"
            method="POST"
            onProgress={(e, request, progress) => {}}
            onLoad={(e, request) => {
              this.loadImage(request.responseText);
            }}
            onError={(e, request) => {
              let error = JSON.parse(e.target.response);
              this.refs.notification.addNotification(counterpart.translate('UPLOAD_FAILED'), counterpart.translate(error.errorInfos[0].errorCode), 'error');
            }}
            onAbort={(e, request) => {}}
            beforeSend={this.beforeSend.bind(this)}
            formGetter={this.formGetter.bind(this)}
            formRenderer={this.customFormRenderer.bind(this)}
            progressRenderer={this.customProgressRenderer.bind(this)}
          />
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}
