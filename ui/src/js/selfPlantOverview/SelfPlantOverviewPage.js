import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import Notification from '../common/components/Notification';
import DateField from '../common/components/DateField';
import IconButton from '../common/components/IconButton';
import FileChooser from '../common/components/FileChooser';
import { getTextForSelectedLanguage } from '../common/language/LanguageHelper';

require('./selfPlantOverview.less');

export default class SelfPlantOverviewPage extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      selfPlantData: {
        latitude: 0,
        longitude: 0,
        plantedOn: new Date().getTime(),
        description: '',
        amount: 1,
        imageName: '',
        treeTypeId: 1
      },
      imageFile: null,
      treeTypes: [],
      treePosition: [51.499807, 11.956521],
      trees: [],
      myTree: { latitude: 0, longitude: 0 },
      treeId: null,
      allowEdit: localStorage.getItem('isAdmin') === 'true'
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:8081/treeTypes')
      .then(function(response) {
        var result = response.data;
        result.splice(result.length - 1, 0, result.splice(0, 1)[0]);
        that.setState({ treeTypes: result });
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
    axios
      .get('http://localhost:8081/trees/selfPlanted')
      .then(function(response) {
        var result = response.data;
        that.setState({ trees: result });
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });
    that.getMyTree();
  }

  getMyTree() {
    var that = this;
    axios
      .get('http://localhost:8081/tree/' + this.props.params.treeId)
      .then(function(response) {
        var result = response.data;
        that.setState({
          myTree: {
            latitude: result.latitude,
            longitude: result.longitude
          },
          selfPlantData: {
            latitude: result.latitude,
            longitude: result.longitude,
            plantedOn: result.plantedOn,
            description: result.description,
            amount: result.amount,
            imageName: result.imagePath,
            treeTypeId: result.treeType.id
          },
          treeId: result.id,
          allowEdit: that.state.allowEdit || localStorage.getItem('username') === result.owner.name,
          treeOwner: result.owner.name
        });
        that.refs.description.value = result.description;
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });
  }

  updatePlantedOn(value) {
    this.state.selfPlantData.plantedOn = value;
    this.forceUpdate();
  }

  updateAmount(event) {
    this.state.selfPlantData.amount = event.target.value;
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
      this.state.selfPlantData.description = this.refs.description.value;
      axios
        .put('http://localhost:8081/plantSelf?id=' + this.state.treeId, this.state.selfPlantData, config)
        .then(function(response) {
          if (that.state.imageFile != null) {
            config = {};
            var data = new FormData();
            data.append('treeId', response.data);
            data.append('file', that.state.imageFile);

            axios
              .post('http://localhost:8081/plantSelf/upload', data, config)
              .then(function(response) {
                that.refs.notification.addNotification(counterpart.translate('PLANTING_CREATED'), '', 'success');
                that.setState({ edit: false });
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
                that.setState({ edit: false });
              });
          } else {
            that.refs.notification.addNotification(counterpart.translate('PLANTING_CREATED'), '', 'success');
            that.setState({ edit: false });
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
          that.setState({ edit: false });
        });
    }
  }

  startEdit() {
    this.setState({ edit: true });
  }

  updateTreePositionFromMapClick(event) {
    if (this.state.edit) {
      this.state.selfPlantData.latitude = parseFloat(event.latlng.lat);
      this.state.selfPlantData.longitude = parseFloat(event.latlng.lng);
      this.state.myTree.latitude = parseFloat(event.latlng.lat);
      this.state.myTree.longitude = parseFloat(event.latlng.lng);
      this.refs.marker.leafletElement._latlng.lat = event.latlng.lat;
      this.refs.marker.leafletElement._latlng.lng = event.latlng.lng;
      this.forceUpdate();
    }
  }

  updateTreePositionFromMarkerDrag() {
    if (this.state.edit) {
      this.state.selfPlantData.latitude = parseFloat(this.refs.marker.leafletElement._latlng.lat);
      this.state.selfPlantData.longitude = parseFloat(this.refs.marker.leafletElement._latlng.lng);
      this.state.myTree.latitude = parseFloat(this.refs.marker.leafletElement._latlng.lat);
      this.state.myTree.longitude = parseFloat(this.refs.marker.leafletElement._latlng.lng);
      this.forceUpdate();
    }
  }

  openDeleteConfirmation() {
    this.refs.notificationSystem.addNotification({
      title: counterpart.translate('WARNING') + '!',
      position: 'tc',
      autoDismiss: 0,
      message: counterpart.translate('DELETE_SELFPLANTING_CONFIRMATION_TEXT'),
      level: 'warning',
      children: (
        <div className="delete-confirmation align-center">
          <button>{counterpart.translate('ABORT')}</button>
          <button
            onClick={() => {
              this.deleteTree();
            }}
          >
            OK
          </button>
        </div>
      )
    });
  }

  deleteTree() {
     var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    var that = this;
    axios
      .delete('http://localhost:8081/plantSelf?treeId=' + this.state.treeId, config)
      .then(function(response) {
        browserHistory.push('/user/' + encodeURIComponent(that.state.treeOwner));
      })
      .catch(function(error) {
        that.refs.notification.handleError(error);
      });
  }

  render() {
    let that = this;
    let myIcon = L.divIcon({ className: 'glyphicon glyphicon-tree-deciduous' });
    let myTreeIcon = L.divIcon({ className: 'glyphicon glyphicon-tree-deciduous my-tree' });
    var confirmBoxStyle = {
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
      <div className="container paddingTopBottom15 selfPlantOverview">
        <div className="row">
          <div className="col-md-12">
            <h1>
              {counterpart.translate('TREE_LOCATION')}
              <div className={this.state.allowEdit? 'delete-btn ' : 'no-display '}>
                <IconButton glyphIcon="glyphicon-trash" text="" onClick={this.openDeleteConfirmation.bind(this)} />
              </div>
              <div className={this.state.allowEdit && !this.state.edit ? '' : 'no-display '}>
                <IconButton glyphIcon="glyphicon-pencil" text="" onClick={this.startEdit.bind(this)} />
              </div>
            </h1>
          </div>
        </div>
        <div className={'row ' + (this.state.edit ? '' : 'no-display')}>
          <div className="form-group col-md-6">
            <label htmlFor="when">{counterpart.translate('WHEN')}:</label>
            <DateField id="when" date={this.state.selfPlantData.plantedOn} updateDateValue={this.updatePlantedOn.bind(this)} noFuture="true" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="howmuch">
              {counterpart.translate('HOW_MANY')}&nbsp;<span className="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>:&nbsp;{this.state.selfPlantData.amount}
            </label>
            <input
              className="tree-slider"
              type="range"
              min="1"
              max={localStorage.getItem('isAdmin') === 'true' ? 10000 : 10}
              value={this.state.selfPlantData.amount}
              step="1"
              onChange={this.updateAmount.bind(this)}
            />
            <br />
            <span>{counterpart.translate('HOW_MANY_HINT')}</span>
          </div>
        </div>
        <div className={'row ' + (this.state.edit ? '' : 'no-display')}>
          <div className="form-group col-md-6">
            <label htmlFor="photo">{counterpart.translate('FOTO')}:</label>
            <FileChooser id="photo" updateFile={this.updateImage.bind(this)} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="treeType">{counterpart.translate('TREETYPE')}:</label>
            <select id="treeType" className="form-control" onChange={this.updateTreeType.bind(this)} ref="select">
              {this.state.treeTypes.map(function(treeType, i) {
                if (treeType.name != 'Default') {
                  if (treeType.id === that.state.selfPlantData.treeTypeId) {
                    return (
                      <option value={treeType.id} key={i} selected="selected">
                        {getTextForSelectedLanguage(treeType.name)}
                      </option>
                    );
                  } else {
                    return (
                      <option value={treeType.id} key={i}>
                        {getTextForSelectedLanguage(treeType.name)}
                      </option>
                    );
                  }
                } else {
                  if (treeType.id === that.state.selfPlantData.treeTypeId) {
                    return (
                      <option value={treeType.id} key={i} selected="selected">
                        {counterpart.translate('OTHER')}
                      </option>
                    );
                  } else {
                    return (
                      <option value={treeType.id} key={i}>
                        {counterpart.translate('OTHER')}
                      </option>
                    );
                  }
                }
              })}
            </select>
          </div>
        </div>
        <div className={'row ' + (this.state.edit ? '' : 'no-display')}>
          <div className="form-group col-md-12">
            <label htmlFor="description">{counterpart.translate('SHORT_DESCRIPTION')}:</label>
            <div>
              <textarea rows="4" cols="50" ref="description" />
            </div>
          </div>
        </div>
        <div className={'row ' + (this.state.edit ? '' : 'no-display')}>
          <div className="col-md-12 align-left">
            <IconButton text="Planzung aktualisieren" glyphIcon="glyphicon-tree-deciduous" onClick={this.sendSelfPlantedTree.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Map id="all-self-planted-map" center={[this.state.myTree.latitude, this.state.myTree.longitude]} zoom={10} onClick={this.updateTreePositionFromMapClick.bind(this)}>
              <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors' />
              <Marker
                position={[this.state.myTree.latitude, this.state.myTree.longitude]}
                ref="marker"
                draggable={this.state.edit}
                icon={myTreeIcon}
                onDragEnd={this.updateTreePositionFromMarkerDrag.bind(this)}
              />
              {this.state.trees.map(function(tree, i) {
                if (tree.latitude && tree.longitude) {
                  if (tree.id != that.props.params.treeId) {
                    return <Marker key={i} position={[tree.latitude, tree.longitude]} ref={'marker-' + i} icon={myIcon} />;
                  }
                } else {
                  return '';
                }
              })}
            </Map>
          </div>
        </div>
        <Notification ref="notification" />
        <NotificationSystem ref="notificationSystem" style={confirmBoxStyle} />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
