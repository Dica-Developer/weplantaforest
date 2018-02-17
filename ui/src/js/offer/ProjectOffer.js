import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

import Notification from '../common/components/Notification';
import IconButton from '../common/components/IconButton';
import InputText from '../common/components/InputText';
import TextArea from '../common/components/TextArea';
import Captcha from '../common/components/Captcha';
import RadioButton from '../common/components/RadioButton';

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
      <div className="projectOffer container">
        <div className="row">
          <div className="col-md-12 item-align-start">
            <h1>Projektfläche anbieten</h1>
            <p>Wir würden gern Flächen kaufen, um sie zu langfristig, gemeinnützig, nachhaltig betriebenen Wäldern umzuwandeln. Wir suchen Flächen, die:</p>
            <ul>
              <li>für eine Aufforstung in Frage kommen, für die wir also eine Aufforstungsgenehmigung bekommen können (also keine Trockenrasen oder Streuobstwiesen)</li>
              <li>zwischen 2 und 20 Hektar groß sind, im Idealfall an einer Straße / Fahrradweg liegen und gut von Publikum eingesehen werden können</li>
              <li>über einen Kauf oder Schenkung an I Plant A Tree gebunden werden können</li>
              <li>idealerweise Mischflächen sind, wo bereits Wald steht, aber noch anliegende Flächen aufgeforstet werden können</li>
              <li>möglichst in den neuen Bundesländern liegen (am besten in Sachsen-Anhalt, Sachsen, Thüringen und rund um Berlin) - aber wir suchen auch in anderen Bundesländern, in Abhängigkeit vom Preis</li>
              <li>nach Möglichkeit maximal 4.000 Euro/ha kosten</li>
            </ul>
            <h3>Bitte trage die nötigen Daten in das Formular ein. Wir werden uns dann bei Dir melden.</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 item-align-start">
            <p>Name:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <InputText cssclass="form-control" toUpdate="first" updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="col-md-6 item-align-start">
            <p>Vorname:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <InputText cssclass="form-control" toUpdate="name" updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="col-md-6 item-align-start">
            <p>E-Mail:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <InputText cssclass="form-control" toUpdate="mail" updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="col-md-6 item-align-start">
            <p>Ort der Fläche:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <InputText cssclass="form-control" toUpdate="location" updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="col-md-6 item-align-start">
            <p>Eigentümer:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <InputText cssclass="form-control" toUpdate="owner" updateValue={this.updateValue.bind(this)}/>
          </div>
          <div className="col-md-6 item-align-start">
            <p>Aufforstung:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <RadioButton className="form-control" id="radio-c-1" value="1" checked={this.state.isAfforestation} onChange={this.updateAfforestation.bind(this)} text="&nbsp; möglich&nbsp;&nbsp;"/>
            <RadioButton className="form-control" id="radio-c-0" value="0" checked={!this.state.isAfforestation} onChange={this.updateAfforestation.bind(this)} text="&nbsp; nicht möglich"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 item-align-start">
            <p>Nutzen der Fläche:</p>
          </div>
          <div className="col-md-6 item-align-start">
            Wie wurde die Fläche bisher genutzt?<br/>
            <TextArea className="form-control" toUpdate="purpose" updateValue={this.updateValue.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 item-align-start">
            <p>Pachtverträge:</p>
          </div>
          <div className="col-md-6 item-align-start">
            Sind Pachtverträge abgeschlossen?<br/>
            <RadioButton className="form-control" id="radio-leasing-1" value="1" checked={this.state.isLeasing} onChange={this.updateLeasing.bind(this)} text="&nbsp; ja&nbsp;&nbsp;"/>
            <RadioButton className="form-control" id="radio-leasing-0" value="0" checked={!this.state.isLeasing} onChange={this.updateLeasing.bind(this)} text="&nbsp; nein"/>
          </div>
          <div className="col-md-6 item-align-start">&nbsp;</div>
          <div className="col-md-6 item-align-start">
            Wenn ja, wie lange laufen diese noch?<br/>
            <InputText cssclass="form-control" toUpdate="lease" updateValue={this.updateValue.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 item-align-start">
            <p>Bemerkungen:</p>
          </div>
          <div className="col-md-6 item-align-start">
            <TextArea className="form-control" toUpdate="comment" updateValue={this.updateValue.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 item-align-start">&nbsp;</div>
          <div className="col-md-6 item-align-start">
            <Captcha ref="captcha"/>
          </div>
          <div className="col-md-6 item-align-start">&nbsp;</div>
          <div className="col-md-6 item-align-start">
            <IconButton text="Angebot abschicken" glyphIcon="glyphicon-envelope" onClick={this.sendOffer.bind(this)}/>
          </div>
          <div className="col-md-6 item-align-start">&nbsp;</div>
          <div className="col-md-6 item-align-start">
            <Notification ref="notification"/>
          </div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
