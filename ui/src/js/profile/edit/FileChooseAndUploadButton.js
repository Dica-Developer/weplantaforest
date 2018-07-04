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
      imageHash: 0
    }
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
    if(this.state.fileName != ''){
      uploadButton = <IconButton text="Upload" glyphIcon="glyphicon-upload" onClick={onSubmit}/>;
    }else{
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

  fileChanged(files){
    if(files && files.length > 0){
      let newImgHash = this.state.imageHash + 1;
      this.setState({fileName: files[0].name, imageHash: newImgHash});
    }
  }

  render() {
    let imageUrl;
    let image;

    if (this.props.imageFileName) {
      imageUrl = 'http://localhost:8081/user/image/' + this.props.imageFileName + '/80/80';
      image = <img src={imageUrl + '?' + this.state.imageHash} alt="profile"/>;
    }else{
      image= '';
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
            onLoad={ (e, request) => { this.forceUpdate();}}
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
