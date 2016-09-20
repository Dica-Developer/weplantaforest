import React, {
  Component
} from 'react';
import Accounting from 'accounting';
import {browserHistory } from 'react-router';

require("./plantBag.less");

export default class PlantBag extends Component {
  constructor() {
    super();
    this.state = {
      plantBag: {}
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('plantBag')) {
      var plantBag = {
        price: 0,
        projects: {}
      };
      localStorage.setItem('plantBag', JSON.stringify(plantBag));
    }

    var plantBagTemp = JSON.parse(localStorage.getItem('plantBag'));
    this.state.plantBag = plantBagTemp;
    this.forceUpdate();
  }

  resetPlantBag(){
    var plantBag = {
      price: 0,
      projects: {}
    };
    localStorage.setItem('plantBag', JSON.stringify(plantBag));
    this.setState({plantBag: plantBag});
  }

  updatePlantBagFromLocaleStorage(){
    this.setState({plantBag: JSON.parse(localStorage.getItem('plantBag'))});
  }

  updatePlantBag(price, projectItems, projectName) {
    this.state.plantBag.price = parseInt(this.state.plantBag.price) + parseInt(price);
    if (projectName in this.state.plantBag.projects) {
      this.setPlantItems(projectItems, projectName);
    } else {
      this.state.plantBag.projects[projectName] = {};
      this.forceUpdate();
      this.state.plantBag.projects[projectName]['plantItems'] = {};
      this.forceUpdate();
      this.setPlantItems(projectItems, projectName);
      this.forceUpdate();
    }

    this.forceUpdate();
    localStorage.setItem('plantBag', JSON.stringify(this.state.plantBag));
    this.showPlantItems();
  }

  setPlantItems(projectItems, projectName) {
    for (var projectItem in projectItems) {
      if (projectItem in this.state.plantBag.projects[projectName].plantItems) {
        this.state.plantBag.projects[projectName].plantItems[projectItem].amount = parseInt(this.state.plantBag.projects[projectName].plantItems[projectItem].amount) + parseInt(projectItems[projectItem].amount);
      } else {
        this.state.plantBag.projects[projectName].plantItems[projectItem] = projectItems[projectItem];
      }
    }
  }

  showPlantItems() {
    for (var project in this.state.plantBag.projects) {
      console.log('project: ' + project);
      for (var projectItem in this.state.plantBag.projects[project]['plantItems']) {
        console.log('article: ' + projectItem + " | amount: " + this.state.plantBag.projects[project]['plantItems'][projectItem].amount);
      }
    }
  }

  showPlantBagPage(){
    browserHistory.push('/plantBag');
  }

  render() {
    return (
      <div className="plantBag">
        <button onClick={this.showPlantBagPage.bind(this)}>
          <div className="wrapper">
            <div className="image-wrapper">
              <p className="price">{Accounting.formatNumber(this.state.plantBag.price / 100, 2, ".", ",")}&nbsp;€</p>
              <img src="/assets/images/Schubkarre.png" alt="mein Pflanzkorb" width="60" height="30"/>
            </div>
            <div className="green-button-text">
              <span className="buttonText">PFLANZKORB</span>
            </div>
          </div>
        </button>
      </div>
    );
  }
}
