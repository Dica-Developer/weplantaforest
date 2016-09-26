import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import axios from 'axios';
import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';
import Boostrap from 'bootstrap';

import ConsignorGiftItem from './ConsignorGiftItem';
import RecipientGiftItem from './RecipientGiftItem';

require("./gifts.less");

export default class ProjectOfferPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.params.userName,
      consignorGifts: [],
      recipientGifts: []
    };
  }

  componentDidMount() {
    var that = this;
    axios.get('http://localhost:8081/gift/search/consignor?userName=' + this.state.userName).then(function(response) {
      var result = response.data;
      that.setState({consignorGifts: result});
      console.log(result);
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
    });

    axios.get('http://localhost:8081/gift/search/recipient?userName=' + this.state.userName).then(function(response) {
      var result = response.data;
      that.setState({recipientGifts: result});
    }).catch(function(response) {
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

  render() {

    return (
      <div>
        <NavBar/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row gifts">
            <div className="col-md-12">
              <h2>Gutschein-Übersicht</h2>

              <h3>Erstellte Gutscheine:</h3>
              {this.state.consignorGifts.map(function(gift, i) {
                return (<ConsignorGiftItem gift={gift}  key={i}/>);
              })}
              <h3>Eingelöste Gutscheine:</h3>
              {this.state.recipientGifts.map(function(gift, i) {
                return (<RecipientGiftItem gift={gift}  key={i}/>);
              })}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
