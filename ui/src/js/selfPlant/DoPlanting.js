import React, {Component} from 'react';
import {render} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import Notification from '../common/components/Notification';
import TextArea from '../common/components/TextArea';
import DateField from '../common/components/DateField';
import FileChooser from '../common/components/FileChooser';
import IconButton from '../common/components/IconButton';
import Captcha from '../common/components/Captcha';

import {getTextForSelectedLanguage} from '../common/language/LanguageHelper';

export default class DoPlanting extends Component {

  constructor() {
    super();
    this.state = {
      selfPlantData: {
        plantedOn: new Date().getTime(),
        description: '',
        amount: 1,
        imageName: '',
        treeTypeId: 1
      },
      imageFile: null,
      treeTypes: [],
      treePosition: [51.499807, 11.956521]
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/treeTypes').then(function(response) {
      var result = response.data;
      that.setState({treeTypes: result, treeType: that.state.treeTypes[0]});
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

  updateValue(toUpdate, value) {
    this.state.selfPlantData[toUpdate] = value;
    this.forceUpdate();
  }

  updateAmount(event) {
    this.state.selfPlantData.amount = event.target.value;
    this.forceUpdate();
  }

  updatePlantedOn(value) {
    this.state.selfPlantData.plantedOn = value;
    this.forceUpdate();
  }

  updateImage(imageName, file) {
    this.state.selfPlantData.imageName = imageName;
    this.state.imageFile = file;
    this.forceUpdate();
  }

  updateTreeType(event) {
    this.state.selfPlantData.treeTypeId = event.target.value;
    this.forceUpdate();
  }

  sendSelfPlantedTree() {
    if (localStorage.getItem('jwt') == null || localStorage.getItem('jwt') == '') {
      this.refs.notification.addNotification('Kein authentifizierter Nutzer!', 'Um eine Pflanzung erstellen zu können, musst du als Nutzer eingeloggt sein.', 'error');
    } else if (this.refs.captcha.validateCaptcha()) {
      var that = this;
      var config = {
        headers: {
          'X-AUTH-TOKEN': localStorage.getItem('jwt')
        }
      };
      axios.post('http://localhost:8081/plantSelf', this.state.selfPlantData, config).then(function(response) {
        that.props.setPlantingDone(true);
        if (that.state.imageFile != null) {
          config = {};
          var data = new FormData();
          data.append('treeId', response.data);
          data.append('file', that.state.imageFile);

          axios.post('http://localhost:8081/plantSelf/upload', data, config).then(function(response) {}).catch(function(response) {
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
      }).catch(function(response) {
        that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', 'Bei der Verarbeitung ist ein Fehler aufgetreten! Bitte versuche es noch einmal.', 'error');
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
  }

  updateTreePositionFromMapClick(event) {
    this.state.selfPlantData.latitude = parseFloat(event.latlng.lat);
    this.state.selfPlantData.longitude = parseFloat(event.latlng.lng);
    this.state.treePosition[0] = parseFloat(event.latlng.lat);
    this.state.treePosition[1] = parseFloat(event.latlng.lng);
    this.refs.marker.leafletElement._latlng.lat = event.latlng.lat;
    this.refs.marker.leafletElement._latlng.lng = event.latlng.lng;
    this.forceUpdate();
  }

  updateTreePositionFromMarkerDrag() {
    this.state.selfPlantData.latitude = parseFloat(this.refs.marker.leafletElement._latlng.lat);
    this.state.selfPlantData.longitude = parseFloat(this.refs.marker.leafletElement._latlng.lng);
    this.state.treePosition[0] = parseFloat(this.refs.marker.leafletElement._latlng.lat);
    this.state.treePosition[1] = parseFloat(this.refs.marker.leafletElement._latlng.lng);
    this.forceUpdate();
  }

  render() {
    var myIcon = L.divIcon({className: 'glyphicon glyphicon-tree-deciduous'});
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Eigene Pflanzung erstellen</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
            Wann:
          </div>
          <div className="col-md-5">
            <DateField updateDateValue={this.updatePlantedOn.bind(this)} noFuture="true"/>
          </div>
          <div className="col-md-1">
            Wieviele&nbsp;<span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>:</div>
          <div className="col-md-5"><input className="tree-slider" type="range" min="1" max="10" value={this.state.selfPlantData.amount} step="1" onChange={this.updateAmount.bind(this)}/>
            <p className="tree-amount">&nbsp;{this.state.selfPlantData.amount}</p>
            <br/>
            <span>Bei mehr als 10 kontaktiere uns bitte, da wir einen Nachweis benötigen.</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
            Foto:
          </div>
          <div className="col-md-5">
            <FileChooser updateFile={this.updateImage.bind(this)}/>
          </div>
          <div className="col-md-1">
            Baumart:</div>
          <div className="col-md-5">
            <select onChange={this.updateTreeType.bind(this)} ref="select">
              {this.state.treeTypes.map(function(treeType, i) {
                if (treeType.name == 'Default') {
                  return (
                    <option value={treeType.id} key={i}>keiner der genannten</option>
                  );
                } else {
                  return (
                    <option value={treeType.id} key={i}>{getTextForSelectedLanguage(treeType.name)}</option>
                  );
                }
              })}

            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 white-line">
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
            Beschreibung:
          </div>
          <div className="col-md-11">
            <TextArea toUpdate="description" updateValue={this.updateValue.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
            Wo:
          </div>
          <div className="col-md-11">
            <Map center={this.state.treePosition} zoom={5} onClick={this.updateTreePositionFromMapClick.bind(this)}>
              <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
              <Marker position={this.state.treePosition} draggable="true" ref="marker" icon={myIcon} onDragEnd={this.updateTreePositionFromMarkerDrag.bind(this)}/>
            </Map>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 align-center">
            <Captcha ref="captcha"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 align-center">
          <IconButton text="PFLANZUNG ERSTELLEN" glyphIcon="glyphicon-tree-deciduous" onClick={this.sendSelfPlantedTree.bind(this)}/>
          </div>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
