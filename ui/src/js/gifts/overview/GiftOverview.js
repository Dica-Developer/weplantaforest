import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

import ConsignorGiftItem from './ConsignorGiftItem';
import RecipientGiftItem from './RecipientGiftItem';
import RedeemGiftContent from '../RedeemGiftContent';

require("./gifts.less");

export default class GiftOverview extends Component {

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
      <div className="container paddingTopBottom15">
        <div className="row gifts">
          <div className="col-md-12">
            <h2>Gutschein-Übersicht</h2>
            <h3>Erstellte Gutscheine:</h3>
            <div className="giftItem">
              <div>
                Code:
              </div>
              <div>
                Status:
              </div>
              <div>
                Eingelöst von:
              </div>
            </div>
              {this.state.consignorGifts.map(function(gift, i) {
                return (<ConsignorGiftItem gift={gift}  key={i}/>);
              })}
            <h3>Eingelöste Gutscheine:</h3>
            <div className="giftItem">
              <div>
                Code:
              </div>
              <div>
                Erstellt von:
              </div>
            </div>
              {this.state.recipientGifts.map(function(gift, i) {
                return (<RecipientGiftItem gift={gift}  key={i}/>);
              })}
          </div>
        </div>
        <div className="row">
          <RedeemGiftContent></RedeemGiftContent>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
