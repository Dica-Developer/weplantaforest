import React, {Component} from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import Bootstrap from 'bootstrap';
import Accounting from 'accounting';

class PaymentBar extends Component {

  constructor() {
    super();
    this.state = {price: 500, trees: [{count: 5, treeType: {name: "Buche"}}]};
  }

  toggleButtonState(amount) {
    switch (amount) {
      case 500:
        this.setState({price: 500, trees: [{count: 5, treeType: {name: "Buche"}}]});
        break;
      case 1000:
        this.setState({price: 1000, trees: [{count: 5, treeType: {name: "Buche"}}, {count: 3, treeType: {name: "Erle"}}, {count: 2, treeType: {name: "Eiche"}}]});
        break;
      case 1500:
        this.setState({price: 1500, trees: [{count: 5, treeType: {name: "Buche"}}, {count: 3, treeType: {name: "Erle"}}, {count: 2, treeType: {name: "Eiche"}}, {count: 10, treeType: {name: "Fichte"}}]});
        break;
    }
  }

  componentDidMount() {
  }

  render() {
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
          <ul className="list-group">
          {this.state.trees.map(function (item) {
            return (<li className="list-group-item">
              <span className="badge">{item.count}</span>
              {item.treeType.name}
            </li>);
          })}
          <br />
          <button type="button" className="btn btn-default btn-lg">Nehme ich für {(() => {
            return Accounting.formatMoney(this.state.price / 100, { thousand: '.', decimal: ',', symbol: '€',  format: '%v %s' });
          })()}</button>
          </ul>
        </div>)
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

