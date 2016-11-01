import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

import Notification from '../common/components/Notification';
import IconButton from '../common/components/IconButton';
import InputText from '../common/components/InputText';
import TextArea from '../common/components/TextArea';
import Captcha from '../common/components/Captcha';

export default class ProjectOffer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first: '',
      name: '',
      mail: '',
      location: '',
      size: '',
      size: '',
      owner: '',
      isAfforestation: false,
      purpose: '',
      isSelling: false,
      isLeasing: false,
      lease: '',
      comment: ''
    };
  }

  updateValue(toUpdate, value) {
    this.setState({[toUpdate]: value});
  }

  updateAfforestation(event) {
    if (event.target.value == "1") {
      this.setState({isAfforestation: true});
    } else {
      this.setState({isAfforestation: false});
    }
  }

  updateSelling(event) {
    if (event.target.value == "1") {
      this.setState({isSelling: true});
    } else {
      this.setState({isSelling: false});
    }
  }

  updateLeasing(event) {
    if (event.target.value == "1") {
      this.setState({isLeasing: true});
    } else {
      this.setState({isLeasing: false});
    }
  }

  sendOffer() {
    if (this.refs.captcha.validateCaptcha()) {
      var that = this;
      var config = {
        headers: {
          'X-AUTH-TOKEN': localStorage.getItem('jwt')
        }
      };

      axios.post('http://localhost:8081/project/offer', this.state, config).then(function(response) {
        console.log('call child');
        that.props.setThankYou(true);
      }).catch(function(response) {
        that.refs.notification.addNotification('Ein Fehler ist aufgetreten!', 'Bitte füll alle notwendigen Felder aus!', 'error');
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
  }

  render() {
    return (
      <div className="col-md-12">
        <h2>Projektfläche anbieten</h2>
        <p>Wir würden gern Flächen kaufen, um sie zu langfristig, gemeinnützig, nachhaltig betriebenen Wäldern umzuwandeln. Wir suchen Flächen, die:</p>
        <ul>
          <li>für eine Aufforstung in Frage kommen, für die wir also eine Aufforstungsgenehmigung bekommen können (also keine Trockenrasen oder Streuobstwiesen)</li>
          <li>zwischen 2 und 20 Hektar groß sind, im Idealfall an einer Straße / Fahrradweg liegen und gut von Publikum eingesehen werden können</li>
          <li>über einen Kauf oder Schenkung an I Plant A Tree gebunden werden können</li>
          <li>idealerweise Mischflächen sind, wo bereits Wald steht, aber noch anliegende Flächen aufgeforstet werden können</li>
          <li>möglichst in den neuen Bundesländern liegen (am besten in Sachsen-Anhalt, Sachsen, Thüringen und rund um Berlin) - aber wir suchen auch in anderen Bundesländern, in Abhängigkeit vom Preis</li>
          <li>nach Möglichkeit maximal 4.000 Euro/ha kosten</li>
        </ul>
        <br/>
        <p className="bold">Bitte trage die nötigen Daten in das Formular ein. Wir werden uns dann bei Dir melden.</p>
        <div className="offerForm">
          <div className="desc-value">
            <div className="desc">
              Name:</div>
            <div className="value">
              <InputText toUpdate="first" updateValue={this.updateValue.bind(this)}/>
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Vorname:</div>
            <div className="value">
              <InputText toUpdate="name" updateValue={this.updateValue.bind(this)}/>
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              E-Mail:</div>
            <div className="value">
              <InputText toUpdate="mail" updateValue={this.updateValue.bind(this)}/>
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Ort der Fläche:</div>
            <div className="value">
              <InputText toUpdate="location" updateValue={this.updateValue.bind(this)}/>
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Größe der Fläche:</div>
            <div className="value">
              <InputText toUpdate="size" updateValue={this.updateValue.bind(this)}/>
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Eigentümer:</div>
            <div className="value">
              <InputText toUpdate="owner" updateValue={this.updateValue.bind(this)}/>
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Aufforstung:</div>
            <div className="value">
              <input type="radio" name="afforestation" checked={this.state.isAfforestation} value="1" onChange={this.updateAfforestation.bind(this)}/>&nbsp; möglich&nbsp;&nbsp;
              <input type="radio" name="afforestation" checked={!this.state.isAfforestation} value="0" onChange={this.updateAfforestation.bind(this)}/>&nbsp; nicht möglich
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Nutzen der Fläche:</div>
            <div className="value">
              Wie wurde die Fläche bisher genutzt?<br/>
              <TextArea toUpdate="purpose" updateValue={this.updateValue.bind(this)}/>
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Verkauf:</div>
            <div className="value">
              Steht die Fläche zum Verkauf?<br/>
              <input type="radio" name="selling" checked={this.state.isSelling} value="1" onChange={this.updateSelling.bind(this)}/>&nbsp; ja&nbsp;&nbsp;
              <input type="radio" name="selling" checked={!this.state.isSelling} value="0" onChange={this.updateSelling.bind(this)}/>&nbsp; nein
            </div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Pachtverträge:</div>
            <div className="value">
              Sind Pachtverträge abgeschlossen?<br/>
              <input type="radio" name="leasing" checked={this.state.isLeasing} value="1" onChange={this.updateLeasing.bind(this)}/>&nbsp; ja&nbsp;&nbsp;
              <input type="radio" name="leasing" checked={!this.state.isLeasing} value="0" onChange={this.updateLeasing.bind(this)}/>&nbsp; nein
              <br/>
              Wenn ja, wie lange laufen diese noch?<br/>
              <InputText toUpdate="lease" updateValue={this.updateValue.bind(this)}/></div>
          </div>
          <div className="desc-value">
            <div className="desc">
              Bemerkungen:</div>
            <div className="value">
              <TextArea toUpdate="comment" updateValue={this.updateValue.bind(this)}/>
            </div>
          </div>
          <div className="align-center">
            <Captcha ref="captcha"/><br/>
            <IconButton text="ANGEBOT ABSCHICKEN" glyphIcon="glyphicon-envelope" onClick={this.sendOffer.bind(this)}/>
          </div>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
