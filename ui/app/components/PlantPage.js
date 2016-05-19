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
      <form className="form-inline">
          <div className="form-group">
            <label className="sr-only" for="treeInput">Höchstgrenze für Baumspende (in Euro)</label>
            <div className="input-group">
              <div className="input-group-addon">€</div>
              <input id="treeInput" type="text" className="form-control" placeholder="Höchstgrenze für Baumspende" onChange={this.properties.parent.toggleButtonStateCustom.bind(this.properties.parent)} />
              <div className="input-group-addon">.00</div>
            </div>
          </div>
        </form>
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
  }

  toggleButtonStateCustom() {
    var that = this;
    var amount = jQuery('#treeInput').val() * 100;
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
  }

  toggleButtonState(amount) {
    var that = this;
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
    this.state.customPaymentButtonSelected = false;
  }

  showCustomPayment() {
    var state = this.state;
    state.customPaymentButtonSelected = true;
    this.setState(state);
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/plantProposal/500').then(function(response) {
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
            <label className="btn btn-primary active" onClick={this.toggleButtonState.bind(this, 500)}>
              <input type="radio" autocomplete="off"/>5€
            </label>
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 1000)}>
              <input type="radio" autocomplete="off"/>10€
            </label>
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 1500)}>
              <input type="radio" autocomplete="off"/>15€
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
