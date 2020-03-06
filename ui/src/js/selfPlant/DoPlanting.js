import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { browserHistory } from 'react-router';
import DateField from '../common/components/DateField';
import FileChooser from '../common/components/FileChooser';
import IconButton from '../common/components/IconButton';
import Notification from '../common/components/Notification';
import TextArea from '../common/components/TextArea';
import { getTextForSelectedLanguage } from '../common/language/LanguageHelper';

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
    axios
      .get('http://localhost:8081/treeTypes')
      .then(function(response) {
        var result = response.data;
        //move first element('Other') to the last position
        result.splice(result.length - 1, 0, result.splice(0, 1)[0]);
        that.setState({ treeTypes: result, treeType: that.state.treeTypes[0] });
      })
      .catch(function(response) {
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
      this.refs.notification.addNotification(counterpart.translate('NO_AUTH_USER_TITLE'), counterpart.translate('NO_AUTH_USER_TEXT'), 'error');
    } else {
      var that = this;
      var config = {
        headers: {
          'X-AUTH-TOKEN': localStorage.getItem('jwt')
        }
      };
      axios
        .post('http://localhost:8081/plantSelf', this.state.selfPlantData, config)
        .then(function(response) {
          that.refs.notification.addNotification(counterpart.translate('PLANTING_CREATED'), '', 'success');
          that.props.loadUserDetails();
          if (that.state.imageFile != null) {
            config = {};
            var data = new FormData();
            data.append('treeId', response.data);
            data.append('file', that.state.imageFile);

            axios
              .post('http://localhost:8081/plantSelf/upload', data, config)
              .then(function(response) {
                browserHistory.push('/user/' + encodeURIComponent(localStorage.getItem('username')));
              })
              .catch(function(response) {
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
            browserHistory.push('/user/' + encodeURIComponent(localStorage.getItem('username')));
          }
        })
        .catch(function(response) {
          that.refs.notification.addNotification(counterpart.translate('ERROR'), counterpart.translate('TRY_AGAIN'), 'error');
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
    var myIcon = L.divIcon({ className: 'glyphicon glyphicon-tree-deciduous' });
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1>{counterpart.translate('CREATE_PLANTING')}</h1>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="when">{counterpart.translate('WHEN')}:</label>
            <DateField id="when" updateDateValue={this.updatePlantedOn.bind(this)} noFuture="true" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="howmuch">
              {counterpart.translate('HOW_MANY')}&nbsp;<span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>:&nbsp;{this.state.selfPlantData.amount}
            </label>
            <input className="tree-slider" type="range" min="1" max="10" value={this.state.selfPlantData.amount} step="1" onChange={this.updateAmount.bind(this)} />
            <br />
            <span>{counterpart.translate('HOW_MANY_HINT')}</span>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="photo">{counterpart.translate('FOTO')}:</label>
            <FileChooser id="photo" updateFile={this.updateImage.bind(this)} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="treeType">{counterpart.translate('TREETYPE')}:</label>
            <select id="treeType" className="form-control" onChange={this.updateTreeType.bind(this)} ref="select">
              {this.state.treeTypes.map(function(treeType, i) {
                if (treeType.name != 'Default') {
                  return (
                    <option value={treeType.id} key={i}>
                      {getTextForSelectedLanguage(treeType.name)}
                    </option>
                  );
                } else {
                  return (
                    <option value={treeType.id} key={i}>
                      {counterpart.translate('OTHER')}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <label htmlFor="description">{counterpart.translate('SHORT_DESCRIPTION')}:</label>
            <TextArea ide="description" toUpdate="description" updateValue={this.updateValue.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <label htmlFor="where">{counterpart.translate('WHERE')}:</label>
            <Map id="where" center={this.state.treePosition} zoom={5} onClick={this.updateTreePositionFromMapClick.bind(this)} scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors' />
              <Marker position={this.state.treePosition} draggable={true} ref="marker" icon={myIcon} onDragEnd={this.updateTreePositionFromMarkerDrag.bind(this)} />
            </Map>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 align-left">
            <IconButton text={counterpart.translate('CREATE_PLANTING')} glyphIcon="glyphicon-tree-deciduous" onClick={this.sendSelfPlantedTree.bind(this)} />
          </div>
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
