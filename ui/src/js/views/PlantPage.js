import React, {
  Component
} from 'react';
import Accounting from 'accounting';
import axios from 'axios';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Bootstrap from 'bootstrap';

class CustomPaymentButton extends Component {
  constructor(props) {
    super();
    this.properties = props;
  }

  componentDidMount() {
    this.properties.parent.toggleButtonStateCustom('maxAmountSlider');
  }

  render() {
    return (
      <div>
        <input id="maxAmountSlider" type="range" min="1" max="1000" step="1" stepUp="5" defaultValue="10" onChange={this.properties.parent.toggleButtonStateCustom.bind(this.properties.parent, 'maxAmountSlider')}/>
      </div>
    );
  }
}

class PaymentBar extends Component {

  constructor() {
    super();
    this.state = {
      actualPrice: 0,
      projects: [],
      plantItems: []
    };
    this.proposalTimeout = null;
  }

  toggleButtonStateCustom(elementId) {
    var that = this;
    var amount = jQuery('#' + elementId).val() * 100;
    window.clearTimeout(this.proposalTimeout);
    this.proposalTimeout = window.setTimeout(function () {
      axios.get('http://localhost:8081/plantProposal/' + amount).then(function(response) {
        var result = response.data;
        result.plantItems = [];
        that.setState(result);
      }).catch(function (response) {
        if (response instanceof Error) {
          console.error('Error', response.message);
        } else {
          console.error(response.data);
          console.error(response.status);
          console.error(response.headers);
          console.error(response.config);
        }
      });
    }, 250);
  }

  toggleButtonState(amount) {
    var that = this;
    var token = localStorage.getItem('jwt');
    var config = {
      headers: {'X-AUTH-TOKEN': token}
    };

    axios.get('http://localhost:8081/simplePlantProposalForTrees/' + amount, config).then(function(response) {
      var result = response.data;
      result.projects = [];
      that.setState(result);
    }).catch(function (response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
    this.state.customPaymentButtonSelected = false;
  }

  showCustomPayment() {
    var state = this.state;
    state.customPaymentButtonSelected = true;
    this.setState(state);
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/simplePlantProposalForTrees/1').then(function(response) {
      var result = response.data;
      result.projects = [];
      that.setState(result);
    }).catch(function (response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });
    this.state.customPaymentButtonSelected = false;
  }

  simpleDonation() {
    axios.post('http://localhost:8081/simpleDonateTrees', this.state).then(function(response) {
      console.log('You paid successful');
      window.location = '/plant/succcess';
    }).catch(function (response) {
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

  complexDonation() {
    axios.post('http://localhost:8081/donateTrees', this.state).then(function(response) {
      console.log('You paid successful');
      window.location = '/plant/succcess';
    }).catch(function (response) {
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
    var that = this;
    var customPaymentButton = '';
    var paymentHandler = this.simpleDonation;
    if (this.state.customPaymentButtonSelected) {
      customPaymentButton = <CustomPaymentButton parent={this} />;
      paymentHandler = this.complexDonation;
    }
    return (<div className="container">
          Hier kannst Du Bäume pflanzen. Du wählst aus wieviel Bäume oder für wieviel Geld wir für Dich Bäume pflanzen.
          <br/>
          <div className="btn-group btn-group-justified btn-group-lg" role="group" data-toggle="buttons">
            <label className="btn btn-primary active" onClick={this.toggleButtonState.bind(this, 1)}>
              <input type="radio" autocomplete="off"/>1 Baum
            </label>
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 2)}>
              <input type="radio" autocomplete="off"/>2 Bäume
            </label>
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 4)}>
              <input type="radio" autocomplete="off"/>4 Bäume
            </label>
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 8)}>
              <input type="radio" autocomplete="off"/>8 Bäume
            </label>
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 16)}>
              <input type="radio" autocomplete="off"/>16 Bäume
            </label>
            <label className="btn btn-primary" onClick={this.showCustomPayment.bind(this)}>
              <input type="radio" autocomplete="off"/>Benutzerdefiniert
            </label>
          </div>
          <br />
          {customPaymentButton}
          <br />
          {Object.keys(that.state.projects).map(function (projectName) {
            return (<div className="panel panel-default">
              <div className="panel-heading">{projectName}</div>
                <div className="panel-body">
                  <ul className="list-group">
                  {Object.keys(that.state.projects[projectName].plantItems).map(function (treeName) {
                  return (<li className="list-group-item">
                      <div className="pull-right">
                      <span className="label label-danger">{(() => {
                        return Accounting.formatMoney(that.state.projects[projectName].plantItems[treeName].treePrice / 100, { thousand: '.', decimal: ',', symbol: '€', format: '%v %s' });
                      })()}</span>
                      <span className="label label-primary">{that.state.projects[projectName].plantItems[treeName].amount}</span>
                      </div>
                      {treeName}
                      </li>);
                  })}
                  </ul>
                </div>
              </div>);
          })}
          <ul className="list-group">
          {Object.keys(that.state.plantItems).map(function (index) {
            var treeItem = that.state.plantItems[index];
            return (
                    <li className="list-group-item">
                      <div className="pull-right">
                      <span className="label label-danger">{(() => {
                        return Accounting.formatMoney(treeItem.treePrice / 100, { thousand: '.', decimal: ',', symbol: '€', format: '%v %s' });
                      })()}</span>
                      <span className="label label-primary">{treeItem.amount}</span>
                      <span className="label label-success">{treeItem.projectName}</span>
                      </div>
                      {treeItem.treeType}
                    </li>
            );
          })}
          </ul>
          <button type="button" className="btn btn-group-justified btn-default btn-lg" onClick={paymentHandler.bind(this)}>Nehme ich für {(() => {
            return Accounting.formatMoney(this.state.actualPrice / 100, { thousand: '.', decimal: ',', symbol: '€', format: '%v %s' });
          })()}</button>
          <br />
        </div>);
  }
}

export default class PlantPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <PaymentBar />
        <Footer/>
      </div>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
