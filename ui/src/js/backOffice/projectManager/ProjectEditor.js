import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import {
  browserHistory
} from 'react-router';
import {
  Map,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';

import IconButton from '../../common/components/IconButton';
import InputText from '../../common/components/InputText';
import TextEditor from '../../common/components/TextEditor';
import Notification from '../../common/components/Notification';
import RadioButton from '../../common/components/RadioButton';

import {
  getTextForSelectedLanguage,
  getTextForLanguage,
  createMultiLanguageEntry
} from '../../common/language/LanguageHelper';

require("./projectEditor.less");

class ProjectArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
      treeTypes: this.props.treeTypes
    }
  }

  componentDidMount(){
    for (var i = 0; i < this.refs.select.options.length; i++) {
      if (this.refs.select.options[i].value == this.state.article.treeType.id) {
        this.refs.select.options[i].selected = true;
        break;
      }
    }
  }

  updateValue(toUpdate, value) {
    this.state.article[toUpdate] = value;
    this.forceUpdate();
  }

  updatePriceValue(toUpdate, value) {
    this.state.article.price[toUpdate] = value;
    this.forceUpdate();
  }

  updateTreeType(event) {
    this.state.article.treeType.id = event.target.value;
    this.state.article.treeType.name = this.refs.select.options[this.refs.select.selectedIndex].text;
    this.forceUpdate();
  }

  deleteProjectArticle(){
    var that = this;
    axios.post('http://localhost:8084/project/article/remove?articleId=' + this.state.article.articleId, {}, {}).then(function(response) {
      that.refs.notification.addNotification('Geschafft!', 'Artikel wurde entfernt.', 'success');
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

  getArticle() {
    return this.state.article;
  }

  render() {
    return (
      <div className="row projectArticle">
          <div className="col-md-3">
            Baumtyp:
          </div>
          <div className="col-md-3">
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
          <div className="col-md-3">
            Anzahl:
          </div>
          <div className="col-md-3">
            <input type="text" value={this.state.article.amount} onChange={(event) => {
              this.updateValue("amount", event.target.value)
            }}/>
          </div>
          <div className="col-md-3">
            Preis:
          </div>
          <div className="col-md-3">
            <input type="text" value={this.state.article.price.amount} onChange={(event) => {
              this.updatePriceValue("amount", event.target.value)
            }}/>
          </div>
          <div className="col-md-3">
            Marge:
          </div>
          <div className="col-md-3">
            <input type="text" value={this.state.article.price.marge} onChange={(event) => {
              this.updatePriceValue("marge", event.target.value)
            }}/>
          </div>
          <div className="col-md-3">
            Funding:
          </div>
          <div className="col-md-3">
            <input type="text" value={this.state.article.price.funding} onChange={(event) => {
              this.updatePriceValue("funding", event.target.value)
            }}/>
          </div>
          <div className="col-md-3">
            Skonto:
          </div>
          <div className="col-md-3">
            <input type="text" value={this.state.article.price.sconto} onChange={(event) => {
              this.updatePriceValue("sconto", event.target.value)
            }}/>
          </div>
          <div className="col-md-12 align-left">
            <IconButton glyphIcon="glyphicon-trash" text="BAUMTYP LÖSCHEN" onClick={this.deleteProjectArticle.bind(this)}/>
          </div>
          <Notification ref="notification"/>
        </div>
    );
  }
}
export default class ProjectEditor extends Component {

  constructor() {
    super();
    this.state = {
      project: {
        id: null,
        name: '',
        imageFileName: '',
        latitude: 0,
        longitude: 0,
        description: '',
        shopActive: false,
        visible: true,
        manager: {
          name: ''
        },
        articles: [],
        images: []
      },
      descriptionDe: '',
      descriptionEn: '',
      treeTypes: []
    }
  }

  componentDidMount() {
    if (this.props.params.projectId != 'new') {
      this.loadProject();
    }
    this.loadTreeTypes();
  }

  loadProject() {
    var that = this;
    axios.get('http://localhost:8084/project?projectId=' + encodeURIComponent(this.props.params.projectId)).then(function(response) {
      var result = response.data;
      var descriptionDe = getTextForLanguage(result.description, 'DEUTSCH');
      var descriptionEn = getTextForLanguage(result.description, 'ENGLISH');
      that.setState({
        project: result,
        descriptionDe: descriptionDe,
        descriptionEn: descriptionEn
      });
      that.refs["editor_de"].refreshEditor();
      that.refs["editor_en"].refreshEditor();
      axios.get('http://localhost:8084/project/articles?projectId=' + encodeURIComponent(that.props.params.projectId)).then(function(response) {
        var result = response.data;
        that.state.project["articles"] = result;
        that.forceUpdate();
      });
      axios.get('http://localhost:8084/project/images?projectId=' + encodeURIComponent(that.props.params.projectId)).then(function(response) {
        var result = response.data;
        that.state.project["images"] = result;
        that.forceUpdate();
      });
    });
  }

  loadTreeTypes() {
    var that = this;
    axios.get('http://localhost:8081/treeTypes').then(function(response) {
      var result = response.data;
      that.setState({
        treeTypes: result
      });
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
    this.state.project[toUpdate] = value;
    this.forceUpdate();
  }

  handleDescriptionChangeForDe(e) {
    this.setState({
      descriptionDe: e.target.getContent()
    });
  }

  handleDescriptionChangeForEn(e) {
    this.setState({
      descriptionEn: e.target.getContent()
    });
  }

  updateVisibility(event) {
    var value;
    if (event.target.value == "1") {
      value = true;
    } else {
      value = false;
    }
    this.state.project.visible = value;
    this.forceUpdate();
  }

  updateShopActive(event) {
    var value;
    if (event.target.value == "1") {
      value = true;
    } else {
      value = false;
    }
    this.state.project.shopActive = value;
    this.forceUpdate();
  }

  updateProjectPositionFromMapClick(event) {
    this.state.project.latitude = parseFloat(event.latlng.lat);
    this.state.project.longitude = parseFloat(event.latlng.lng);
    this.refs.marker.leafletElement._latlng.lat = event.latlng.lat;
    this.refs.marker.leafletElement._latlng.lng = event.latlng.lng;
    this.forceUpdate();
  }

  updateProjectPositionFromMarkerDrag() {
    this.state.project.latitude = parseFloat(this.refs.marker.leafletElement._latlng.lat);
    this.state.project.longitude = parseFloat(this.refs.marker.leafletElement._latlng.lng);
    this.forceUpdate();
  }

  updateProject() {
    var that = this;
    var description = createMultiLanguageEntry(this.state.descriptionDe, this.state.descriptionEn);
    this.state.project.description = description;
    axios.post('http://localhost:8084/project/edit', this.state.project, {}).then(function(response) {
      that.refs.notification.addNotification('Geschafft!', 'Projekt wurde aktualisiert.', 'success');
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler!', 'Bei der Aktualisierung ist ein Fehler aufgetreten. ' + response.data, 'error');
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

  addProjectArticle(){
    var article = {
        amount: 0,
        articleId: null,
        price: {
          priceId: null,
          amount: 0.00,
          funding: 0,
          marge: 0.00,
          sconto: 0,
          scontoType: 'NONE'
        },
        treeType: {
          id: 1,
          name: 'Buche'
        }
    };
    this.state.project.articles.push(article);
    this.forceUpdate();
  }

  render() {
    var that = this;
    var articles = [];
    if (this.state.project.articles) {
      for(var article in this.state.project.articles){
        articles.push(<ProjectArticle article={this.state.project.articles[article]} key={article} treeTypes={this.state.treeTypes}/>);
      }
    } else {
      articles = '';
    }
    return (
      <div className="container paddingTopBottom15 projectEditor">
          <div className="row ">
            <div className="col-md-12">
              <h2>Projekt-Editor</h2>
            </div>
          </div>
          <div className="row project-data">
            <div className="col-md-4">
              Projektname:
            </div>
            <div className="col-md-8">
              <input type="text" value={this.state.project.name} onChange={(event) => {
                this.updateValue("name", event.target.value)
              }}/>
            </div>
          </div>
          <div className="row project-data">
            <div className="col-md-4">
              sichtbar:
            </div>
            <div className="col-md-8">
              <RadioButton id="radio-c-1" value="1" checked={this.state.project.visible} onChange={this.updateVisibility.bind(this)} text="&nbsp; ja&nbsp;&nbsp;"/>
              <RadioButton id="radio-c-0" value="0" checked={!this.state.project.visible} onChange={this.updateVisibility.bind(this)} text="&nbsp; nein"/>
            </div>
          </div>
          <div className="row project-data">
            <div className="col-md-4">
              shop active:
            </div>
            <div className="col-md-8">
              <RadioButton id="radio-s-1" value="1" checked={this.state.project.shopActive} onChange={this.updateShopActive.bind(this)} text="&nbsp; ja&nbsp;&nbsp;"/>
              <RadioButton id="radio-s-0" value="0" checked={!this.state.project.shopActive} onChange={this.updateShopActive.bind(this)} text="&nbsp; nein"/>
            </div>
          </div>
          <div className="row project-data">
            <div className="col-md-4">
              Beschreibung:<br/>(deutsch)
            </div>
            <div className="col-md-8">
              <TextEditor ref="editor_de" content={this.state.descriptionDe} handleContentChange={this.handleDescriptionChangeForDe.bind(this)}/>
            </div>
          </div>
          <div className="row project-data">
            <div className="col-md-4">
              Beschreibung:<br/>(englisch)
            </div>
            <div className="col-md-8">
              <TextEditor ref="editor_en" content={this.state.descriptionEn} handleContentChange={this.handleDescriptionChangeForEn.bind(this)}/>
            </div>
          </div>
          <div className="row project-data">
            <div className="col-md-4">
              Lage:
            </div>
            <div className="col-md-8">
              <Map center={[this.state.project.latitude, this.state.project.longitude]} zoom={8} onClick={this.updateProjectPositionFromMapClick.bind(this)}>
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                <Marker position={[this.state.project.latitude, this.state.project.longitude]}  draggable="true" ref="marker" onDragEnd={this.updateProjectPositionFromMarkerDrag.bind(this)}/>
              </Map>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3>Projektbäume:</h3>
            </div>
          </div>
          {articles}
          <div className="row">
            <div className="col-md-12 align-right">
              <IconButton glyphIcon="glyphicon-plus" text="BAUMTYP HINZUFÜGEN" onClick={this.addProjectArticle.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 align-center">
              <IconButton glyphIcon="glyphicon-floppy-open" text="ÄNDERUNGEN SPEICHERN" onClick={this.updateProject.bind(this)}/>
            </div>
          </div>
          <Notification ref="notification"/>
        </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
