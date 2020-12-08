import Accounting from 'accounting';
import axios from 'axios';
import React, { Component } from 'react';
import Notification from '../../common/components/Notification';
import SvgButton from '../../common/components/SvgButton';
import { getConfig } from '../../common/RestHelper';
import Project from '../../planting/customPlantPage/Project';

export default class CodeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      eventId: null,
      userId: null,
      amount: 0,
      projects: [],
      overallPrice: 0,
      restConfig: getConfig()
    };
    this.updatePrice = this.updatePrice.bind(this);
  }

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects() {
    var that = this;
    axios
      .get('http://localhost:8081/reports/activeProjects')
      .then(function(response) {
        var result = response.data;
        that.setState({ projects: result });
        that.forceUpdate();
      })
      .catch(function(response) {
        that.refs.notification.addNotification('Fehler beim Laden der aktiven Projekte!', response.data + response.message, 'error');
      });
  }

  setEventId(eventId) {
    this.setState({ eventId: eventId });
  }

  setUserId(userId) {
    this.setState({ userId: userId });
  }

  updateAmount(amount) {
    this.setState({ amount: amount });
  }

  generateCodes() {
    var that = this;
    var plantBag = this.updatePlantBag();
    axios
      .post('http://localhost:8081/validatePlantBag', plantBag, {})
      .then(function(response) {
        // console.log('plantbag is valid');
        var request = {
          amountOfPlantBags: that.state.amount,
          cartState: 'GENERATED',
          userId: that.state.userId,
          plantBag: plantBag
        };
        axios
          .post('http://localhost:8081/plantForUser/', request, that.state.restConfig)
          .then(function(response) {
            // console.log('carts generated!');
            // console.log(response.data);
            var cartIds = response.data;
            that.loadProjects();
            axios
              .post('http://localhost:8083/event/codes/' + that.state.eventId, cartIds, that.state.restConfig)
              .then(function(response) {
                // console.log('codes generated!');
                that.props.loadCodesForEvent();
                that.refs.notification.addNotification('Codes wurden dem Event hinzugefügt!', '', 'success');
              })
              .catch(function(response) {
                // console.log(response);
                that.refs.notification.addNotification('Fehler beim Generieren der Codes!', '', 'error');
              });
          })
          .catch(function(response) {
            that.refs.notification.addNotification('Fehler beim Erzeugen der Pflanzkörbe!', '', 'error');
          });
      })
      .catch(function(response) {
        // console.log(response);
        var errorMessage = '';
        that.refs.notification.addNotification('Fehler beim Validieren der Pflanzkörbe!', errorMessage, 'error');
      });
  }

  updatePrice() {
    var price = 0;
    for (var project in this.state.projects) {
      price = price + parseInt(this.refs['project_' + project].getPrice());
    }
    this.state.overallPrice = price;
    this.forceUpdate();
  }

  updatePlantBag() {
    var totalPrice = 0;
    var plantBag = {}; 
    plantBag.projects = {};
    for (var project in this.state.projects) {
      var projectItems = {};
      plantBag.projects[this.state.projects[project].projectName] = {};
      plantBag.projects[this.state.projects[project].projectName].plantItems = projectItems;
      for (var article in this.refs['project_' + project].getArticles()) {
        if (this.refs['project_' + project].getArticleValue(article) != null && this.refs['project_' + project].getArticleValue(article) > 0) {
          projectItems[this.refs['project_' + project].getArticles()[article].treeType.name] = {
            amount: parseInt(this.refs['project_' + project].getArticleValue(article)),
            price: parseInt(this.refs['project_' + project].getArticles()[article].price.priceAsLong),
            imageFile: this.refs['project_' + project].getArticles()[article].treeType.imageFile
          };
          //price = price + parseInt(this.refs['project_' + project].getPrice());
          totalPrice = totalPrice + (parseInt(this.refs['project_' + project].getArticles()[article].price.priceAsLong) * parseInt(this.refs['project_' + project].getArticleValue(article)));
        }
      }
    }
    plantBag.price = totalPrice;
    return plantBag;
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
          <div className="col-md-4">
            <label className="input-label">Anzahl der zu generierenden Codes</label>
          </div>
          <div className="col-md-8">
            <input
              type="text"
              value={this.state.amount}
              onChange={event => {
                this.updateAmount(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div>
              {this.state.projects.map(function(project, i) {
                return <Project key={i} project={project} ref={'project_' + i} updatePrice={that.updatePrice.bind(this)} />;
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 plant-div">
            <div className="price">
              <span>GESAMT:&nbsp;{Accounting.formatNumber(this.state.overallPrice / 100, 2, '.', ',')}&nbsp;€</span>
            </div>
            <SvgButton text="CODES GENERIEREN" buttonType="barrow" onClick={this.generateCodes.bind(this)} />
          </div>
        </div>
        <Notification ref="notification" />
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
