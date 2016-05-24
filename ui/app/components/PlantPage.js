import React, {
  Component
} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Bootstrap from 'bootstrap';
import Accounting from 'accounting';
import axios from 'axios';

class CustomPaymentButton extends Component {
  constructor(props) {
    super();
    this.properties = props;
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
      projects: []
    };
    this.proposalTimeout = null;
  }

  toggleButtonStateCustom(elementId) {
    var that = this;
    var amount = jQuery('#' + elementId).val() * 100;
    window.clearTimeout(this.proposalTimeout);
    this.proposalTimeout = window.setTimeout(function () {
    axios.get('http://localhost:8081/plantProposal/' + amount).then(function(response) {
      that.setState(response.data);
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
    axios.get('http://localhost:8081/simplePlantProposalForTrees/' + amount).then(function(response) {
      that.setState(response.data);
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
      that.setState(response.data);
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

  render() {
    var that = this;
    var customPaymentButton = '';
    if (this.state.customPaymentButtonSelected) {
      customPaymentButton = <CustomPaymentButton parent={this} />;
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
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 3)}>
              <input type="radio" autocomplete="off"/>3 Bäume
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
                      <span className="badge">{(() => {
                        return Accounting.formatMoney(that.state.projects[projectName].plantItems[treeName].treePrice / 100, { thousand: '.', decimal: ',', symbol: '€', format: '%v %s' });
                      })()}</span>
                      <span className="badge">{that.state.projects[projectName].plantItems[treeName].amount}</span>
                      {treeName}
                    </li>);
                  })}
                  </ul>
                </div>
              </div>);
          })}
          <button type="button" className="btn btn-group-justified btn-default btn-lg">Nehme ich für {(() => {
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
