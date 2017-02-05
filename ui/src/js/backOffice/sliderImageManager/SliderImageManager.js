import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import {browserHistory} from 'react-router';

import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';
import NotificationSystem from 'react-notification-system';
import FileChooser from '../../common/components/FileChooser';

require("./sliderImageManager.less");

class SliderImage extends Component {

  constructor(props){
    super(props);
    this.state = {
      file: null,
      imageFileName: this.props.image.imageFileName,
      imageId: this.props.image.imageId,
      fileSrc: null
    };
  }

  updateValue(toUpdate, value) {
    this.state[toUpdate] = value;
    this.forceUpdate();
  }

  updateImage(imageName, file) {
    this.setState({file: file});
    if (file != null) {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function(e) {
        this.setState({
          fileSrc: [reader.result]
        })
      }.bind(this);
    }
    this.forceUpdate();
  }

  deleteImageConfirmation(){
    this.refs.notificationSystem.addNotification({
      title: 'Achtung!',
      position: 'tc',
      autoDismiss: 0,
      message: 'Möchtest du dieses Bild wirklich löschen?',
      level: 'warning',
      children: (
        <div>
          <button>Abbrechen</button>
          <button onClick={() => {
            this.deleteImage()
          }}>OK</button>
        </div>
      )
    });
  }

  deleteImage(){
    if (this.state.imageId != null) {
      var that = this;
      axios.delete('http://localhost:8083/mainSliderImage/delete?imageId=' + this.state.imageId).then(function(response) {
        that.props.removeImage(that.props.arrayIndex);
        that.refs.notification.addNotification('Geschafft!', 'Bild wurde gelöscht.', 'success');
      }).catch(function(response) {
        that.refs.notification.addNotification('Fehler!', response.data, 'error');
        if (response instanceof Error) {
          console.error('Error', response.message);
        } else {
          console.error(response.data);
          console.error(response.status);
          console.error(response.headers);
          console.error(response.config);
        }
      });
    } else {
      this.props.removeImage(this.props.arrayIndex);
      this.refs.notification.addNotification('Geschafft!', 'Bild wurde gelöscht.', 'success');
    }
  }

  saveImage(){
    var that = this;
    var imageData = {
      imageId: this.state.imageId,
      imageFileName: this.state.imageFileName
    };

    axios.post('http://localhost:8083/mainSliderImage/save', imageData, {}).then(function(response) {
      console.log('image object created!');
      if (that.state.file != null) {
        var imageId = response.data;
        var imageFile = new FormData();
        imageFile.append('imageId', imageId);
        imageFile.append('file', that.state.file);
        axios.post('http://localhost:8083/mainSliderImage/upload', imageFile, {}).then(function(response) {
          console.log('image uploaded');

          that.refs.notification.addNotification('Geschafft!', 'Bild wurde hochgeladen!', 'success');
        }).catch(function(response) {
          that.refs.notification.addNotification('Fehler!', response.data, 'error');
          if (response instanceof Error) {
            console.error('Error', response.message);
          } else {
            console.error(response.data);
            console.error(response.status);
            console.error(response.headers);
            console.error(response.config);
          }
        });
      } else {
        that.refs.notification.addNotification('Geschafft!', 'Daten wurden geupdatet!', 'success');
      }

    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler!', response.data, 'error');
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
  }

  render() {
    var image;
    if (this.state.file != null) {
      image = <img src={this.state.fileSrc} height="1160" width="640"/>;
    } else {
      let imageUrl = 'http://localhost:8081/mainSliderImage/' + this.state.imageFileName + '/570/320'
      image = <img src={imageUrl}/>;
    }
    var style = {
                  Containers: {
                    DefaultStyle: {
                      zIndex: 11000
                    },
                    tc: {
                      top: '50%',
                      bottom: 'auto',
                      margin: '0 auto',
                      left: '50%'
                    }
                  }
                };
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            Dateiname: <br/>
            <input type="text" value={this.state.imageFileName} onChange={(event) => {
              this.updateValue("imageFileName", event.target.value)
            }}/><br/>
            <FileChooser updateFile={this.updateImage.bind(this)}/>
            <IconButton glyphIcon="glyphicon-trash" text="BILD LÖSCHEN" onClick={this.deleteImageConfirmation.bind(this)}/><br/>
            <IconButton glyphIcon="glyphicon-floppy-save" text="BILD SPEICHERN" onClick={this.saveImage.bind(this)}/>
          </div>
          <div className="col-md-8">
            {image}
          </div>
        </div>
        <Notification ref="notification"/>
        <NotificationSystem ref="notificationSystem" style={style}/>
      </div>
    );
  }

}

export default class SliderImageManager extends Component {

  constructor() {
    super();
      this.state = {
        slides: []
      };
    }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/mainSliderImages').then(function(response) {
      var result = response.data;
      that.setState({slides: result});
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });

  }

  removeImage(index){
    this.state.slides.splice(index, 1);
    for (var image in this.state.slides) {
      this.refs["image_" + image].updateImageFromParent(this.state.slides[image]);
    }
    this.forceUpdate();
  }

  createSliderImage(index) {
    return <SliderImage ref={"image_" + index} image={this.state.slides[index]} arrayIndex={index} key={index} removeImage={this.removeImage.bind(this)}/>;
  }

  createSliderImages() {
    var sliderImages = [];
    if (this.state.slides) {
      for (var image in this.state.slides) {
        sliderImages.push(this.createSliderImage(image));
      }
    } else {
      sliderImages = '';
    }
    return sliderImages;
  }

  addImage() {
    var image = {
      imageId: null,
      imageFileName: ''
    };
    this.state.slides.push(image);
    this.forceUpdate();

  }


  render() {
    var sliderImages = this.createSliderImages();

    return (
        <div className="container paddingTopBottom15 sliderImageManager">
          <div className="row ">
            <div className="col-md-12">
              <h2>Image Manager Mainpage</h2>
            </div>
          </div>
          {sliderImages}
          <div className="row">
            <div className="col-md-12 align-right">
              <IconButton glyphIcon="glyphicon-plus" text="BILD HINZUFÜGEN" onClick={this.addImage.bind(this)}/>
            </div>
          </div>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
