import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';

import ImageButton from '../../common/components/ImageButton';
import Project from '../../planting/customPlantPage/Project';
import Notification from '../../common/components/Notification';

export default class CodeGenerator extends Component {

  constructor() {
    super();
    this.state = {
      eventId: null,
      amount: 0,
      projects: [],
      overallPrice: 0,
    };
    this.updatePrice = this.updatePrice.bind(this);
  }

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects() {
    var that = this;
    axios.get('http://localhost:8081/reports/activeProjects').then(function(response) {
      var result = response.data;
      that.setState({
        projects: result
      });
      that.forceUpdate();
    }).catch(function(response) {
      that.refs.notification.addNotification('Fehler beim Laden der aktiven Projekte!', response.data + response.message, 'error');
    });
  }

  setEventId(eventId){
    this.setState({eventId: eventId});
  }

  updateAmount(amount) {
    this.setState({
      amount: amount
    });
  }

  generateCodes() {
    var that = this;
    this.updatePlantBag();
    var plantBag = JSON.parse(localStorage.getItem('plantBag'));

    console.log('generating ' + this.state.amount + ' plantBags for event ' + this.state.eventId);
    console.log(plantBag);
  }

  updatePrice() {
    var price = 0;
    for (var project in this.state.projects) {
      price = price + parseInt(this.refs["project_" + project].getPrice());
    }
    this.state.overallPrice = price;
    this.forceUpdate();
  }

  updatePlantBag() {
    for (var project in this.state.projects) {
      var projectItems = {};
      var updateProject = false;
      for (var article in this.refs["project_" + project].getArticles()) {
        if (this.refs["project_" + project].getArticleValue(article) != null && this.refs["project_" + project].getArticleValue(article) > 0) {
          projectItems[this.refs["project_" + project].getArticles()[article].treeType.name] = {
            amount: parseInt(this.refs["project_" + project].getArticleValue(article)),
            price: parseInt(this.refs["project_" + project].getArticles()[article].price.priceAsLong),
            imageFile: this.refs["project_" + project].getArticles()[article].treeType.imageFile
          };
          updateProject = true;
        }
      }
      if (updateProject) {
        this.props.updatePlantBag(this.refs["project_" + project].getPrice(), projectItems, this.state.projects[project].projectName);
      }
    }
  }

  render() {
    var that = this;
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h3>Code-Generator</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"><label className="input-label">Anzahl der zu generierenden Codes</label></div>
          <div className="col-md-8"><input type="text" value={this.state.amount} onChange={(event) => {
            this.updateAmount(event.target.value)
          }}/></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div>
              {this.state.projects.map(function(project, i) {
                return (<Project key={i} project={project} ref={"project_" + i} updatePrice={that.updatePrice.bind(this)}/>);
              })}
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col-md-12 plant-div">
            <div className="price">
              <span>GESAMT:&nbsp;{Accounting.formatNumber(this.state.overallPrice / 100, 2, ".", ",")}&nbsp;€</span>
            </div>
            <ImageButton text="CODES GENERIEREN" onClick={this.generateCodes.bind(this)} imagePath="/assets/images/Schubkarre_braun.png" imageWidth="50" imageHeight="25"/>
          </div>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
