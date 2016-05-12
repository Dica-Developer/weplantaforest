import React, {Component} from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import Bootstrap from 'bootstrap';
import Accounting from 'accounting';
import axios from 'axios';

class PaymentBar extends Component {

  constructor() {
    super();
    this.state = {actualPrice: 500, projects: []};
  }

  toggleButtonState(amount) {
    var that = this;
    axios.get('http://localhost:8081/plantProposal/' + amount).then(function(response) {
      that.setState(response.data);
    });
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/plantProposal/500').then(function(response) {
      that.setState(response.data);
    });
  }

  render() {
        var that = this;
        return (<div className="container">
          Hier kannst Du Bäume pflanzen. Du wählst aus wieviel Bäume oder für wieviel Geld wir für Dich Bäume pflanzen.
          <br/>
          <div className="btn-group btn-group-justified btn-group-lg" role="group" data-toggle="buttons">
            <label className="btn btn-primary active" onClick={this.toggleButtonState.bind(this, 500)}>
              <input type="radio" defaultChecked autocomplete="off"/>5€
            </label>
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 1000)}>
              <input type="radio" autocomplete="off"/>10€
            </label>
            <label className="btn btn-primary" onClick={this.toggleButtonState.bind(this, 1500)}>
              <input type="radio" autocomplete="off"/>15€
            </label>
          </div>
          <br />
          <br />
          {Object.keys(that.state.projects).map(function (projectName) {
            return (<div className="panel panel-default">
              <div className="panel-heading">{projectName}</div>
                <div className="panel-body">
                  <ul className="list-group">
                  {Object.keys(that.state.projects[projectName].plantItems).map(function (treeName) {
                    return (<li className="list-group-item">
                      <span className="badge">{that.state.projects[projectName].plantItems[treeName].amount}</span>
                      {treeName}
                    </li>)
                  })}
                  </ul>
                </div>
              </div>)
          })}
          <button type="button" className="btn btn-group-justified btn-default btn-lg">Nehme ich für {(() => {
            return Accounting.formatMoney(this.state.actualPrice / 100, { thousand: '.', decimal: ',', symbol: '€',  format: '%v %s' });
          })()}</button>
          <br />
        </div>)
  }
}
         /* {this.state.projects.entries.each(function(projectName, trees) {
            return (<div class="panel panel-default">
              <div class="panel-heading">{projectName}</div>
                <div class="panel-body">
                  <ul className="list-group">
                  for (var i = 0; i < trees.entries.length; i++) {
                    <li className="list-group-item">
                      <span className="badge">{tress.entries[i].value.amount}</span>
                      {item.entries[i].key}
                    </li>
                  }
                  </ul>
                </div>
              </div>)
          })}*/

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

