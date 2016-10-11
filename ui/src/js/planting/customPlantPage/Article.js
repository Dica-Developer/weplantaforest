import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {
  Link,
  browserHistory
} from 'react-router';

import NavBar from '../../common/navbar/NavBar';
import Header from '../../common/header/Header';
import Footer from '../../common/Footer';

import ButtonBar from '../ButtonBar';
import BottomPart from '../BottomPart';

export default class Article extends Component {

  constructor() {
    super();
    this.state={
      amount: null
    }
  }

  getAmount(){
    return this.state.amount;
  }

  getPrice(){
    return this.props.article.price.priceAsLong;
  }

  updateAmount(event){
    this.state.amount = event.target.value;
    this.props.updatePrice();
    this.forceUpdate();
  }

  render() {
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.article.treeType.imageFile + '/60/60';
    return (
      <div className="article">
        <div>
          <img src={imageUrl} />
        </div>
        <div>
          <p><span className="bold uppercase">{this.props.article.treeType.name}</span><br/>Stk.&nbsp;<span className="bold">{Accounting.formatNumber(this.props.article.price.priceAsLong/100, 2, ".", ",")}&nbsp;€</span></p>
        </div>
        <div>
          <input type="text" value={this.state.value} onChange={this.updateAmount.bind(this)}/>
          &nbsp;/&nbsp;{this.props.article.amount - this.props.article.alreadyPlanted}
        </div>
        <div>
          <span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span>
        </div>
        <div>
          <p className="bold">{Accounting.formatNumber(this.state.amount * this.props.article.price.priceAsLong / 100, 2, ".", ",")}&nbsp;€</p>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
