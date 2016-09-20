import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import axios from 'axios';
import Boostrap from 'bootstrap';

import Notification from '../common/components/Notification';
import IconButton from '../common/components/IconButton';
import InputText from '../common/components/InputText';
import TextArea from '../common/components/TextArea';

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
    this.setState({
      [toUpdate]: value
    });
  }

  updateAfforestation(event) {
    if (event.target.value == "1") {
      this.setState({
        isAfforestation: true
      });
    } else {
      this.setState({
        isAfforestation: false
      });
    }
  }

  updateSelling(event) {
    if (event.target.value == "1") {
      this.setState({
        isSelling: true
      });
    } else {
      this.setState({
        isSelling: false
      });
    }
  }

  updateLeasing(event) {
    if (event.target.value == "1") {
      this.setState({
        isLeasing: true
      });
    } else {
      this.setState({
        isLeasing: false
      });
    }
  }

  sendOffer() {
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
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td><InputText toUpdate="first" updateValue={this.updateValue.bind(this)}/></td>
                </tr>
                <tr>
                  <td>Vorname:</td>
                  <td><InputText toUpdate="name" updateValue={this.updateValue.bind(this)}/></td>
                </tr>
                <tr>
                  <td>E-Mail:</td>
                  <td><InputText toUpdate="mail" updateValue={this.updateValue.bind(this)}/></td>
                </tr>
                <tr>
                  <td colSpan="2"></td>
                </tr>
                <tr>
                  <td>Ort der Fläche:</td>
                  <td><InputText toUpdate="location" updateValue={this.updateValue.bind(this)}/></td>
                </tr>
                <tr>
                  <td>Größe der Fläche:</td>
                  <td><InputText toUpdate="size" updateValue={this.updateValue.bind(this)}/></td>
                </tr>
                <tr>
                  <td>Eigentümer:</td>
                  <td><InputText toUpdate="owner" updateValue={this.updateValue.bind(this)}/></td>
                </tr>
                <tr>
                  <td>Aufforstung:</td>
                  <td>
                    <input type="radio" name="afforestation" checked={this.state.isAfforestation} value="1" onChange={this.updateAfforestation.bind(this)}/>&nbsp; möglich&nbsp;&nbsp;
                    <input type="radio" name="afforestation" checked={!this.state.isAfforestation} value="0" onChange={this.updateAfforestation.bind(this)}/>&nbsp; nicht möglich</td>
                  </tr>
                  <tr>
                    <td>Nutzen der Fläche:</td>
                    <td>Wie wurde die Fläche vorher genutzt bzw. wird sie heute genutzt?
                      <br/><TextArea toUpdate="purpose" updateValue={this.updateValue.bind(this)}/></td>
                  </tr>
                  <tr>
                    <td>Verkauf:</td>
                    <td>
                      Steht die Fläche zum Verkauf?<br/>
                      <input type="radio" name="selling" checked={this.state.isSelling} value="1" onChange={this.updateSelling.bind(this)}/>&nbsp; ja&nbsp;&nbsp;
                      <input type="radio" name="selling" checked={!this.state.isSelling} value="0" onChange={this.updateSelling.bind(this)}/>&nbsp; nein</td>
                  </tr>
                  <tr>
                    <td>Pachtverträge:</td>
                    <td>
                      Sind Pachtverträge abgeschlossen?<br/>
                      <input type="radio" name="leasing" checked={this.state.isLeasing} value="1" onChange={this.updateLeasing.bind(this)}/>&nbsp; ja&nbsp;&nbsp;
                        <input type="radio" name="leasing" checked={!this.state.isLeasing} value="0" onChange={this.updateLeasing.bind(this)}/>&nbsp; nein
                        <br/>
                      Wenn ja, wie lange laufen diese noch?<br/>
                        <InputText toUpdate="lease" updateValue={this.updateValue.bind(this)}/><br/>
                    </td>
                  </tr>
                  <tr>
                    <td>Bemerkungen:</td>
                    <td><TextArea toUpdate="comment" updateValue={this.updateValue.bind(this)}/></td>
                  </tr>
                </tbody>
              </table>
              <div className="align-center">
                <IconButton text="ANGEBOT ABSCHICKEN" glyphIcon="glyphicon-envelope" onClick={this.sendOffer.bind(this)}/>
              </div>
            </div>
            <Notification ref="notification"/>
          </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
