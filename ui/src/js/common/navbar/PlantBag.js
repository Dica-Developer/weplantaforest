import React, {
  Component
} from 'react';
import Accounting from 'accounting';
import axios from 'axios';

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

  updatePlantBag(price, projectItems, projectName) {
    this.state.plantBag.price = parseInt(this.state.plantBag.price) + parseInt(price * 100);
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

  donateTrees() {
    this.showPlantItems();
    var that = this;
    axios.post('http://localhost:8081/donateTrees', this.state.plantBag).then(function(response) {
      console.log('You paid successful');
      var emptyPlantBag = {
        price: 0,
        projects: {}
      };
      localStorage.setItem('plantBag', JSON.stringify(emptyPlantBag));
      var emptyPlantBagTemp = JSON.parse(localStorage.getItem('plantBag'));
      that.state.plantBag = emptyPlantBagTemp;
      that.forceUpdate();
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
      console.error('Payment failed');
    });
  }

  render() {
    return (
      <div>
        <button className="navbar-right green-button" onClick={this.donateTrees.bind(this)}>
          <div className="wrapper">
            <div className="image-wrapper">
              <p className="price">{Accounting.formatNumber(this.state.plantBag.price / 100, 2, ".", ",")}&nbsp;€</p>
              <img className="nav-img" src="/assets/images/Schubkarre.png" alt="mein Pflanzkorb" width="60" height="30"/>
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
