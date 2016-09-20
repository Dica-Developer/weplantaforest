import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import {browserHistory} from 'react-router';
import Accounting from 'accounting';
import NavBar from '../common/navbar/NavBar';
import Footer from '../common/Footer';
import Header from '../common/header/Header';
import Boostrap from 'bootstrap';

import PlantBagProject from './PlantBagProject';
import PlantBagItem from './PlantBagItem'
import IconButton from '../common/components/IconButton';

require("./plantBagPage.less");

export default class PlantBagPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plantBag: JSON.parse(localStorage.getItem('plantBag'))
    };
  }

  switchTOPaymentPage() {
    var config = {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('jwt')
      }
    };
    axios.post('http://localhost:8081/donateTrees', this.state.plantBag, config).then(function(response) {
      browserHistory.push('/payment/' + response.data);
    }).catch(function(response) {
      if (response instanceof Error) {
        console.error('Error', response.message);
      } else {
        console.error(response.data);
        console.error(response.status);
        console.error(response.headers);
        console.error(response.config);
      }
      console.error('Payment failed');
    });

  }

  render() {
    var that = this;
    return (
      <div>
        <NavBar/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row plantBagPage">
            <div className="col-md-12">
              <h2>Dein Pflanzkorb</h2>
              <div className="overview">
                {Object.keys(this.state.plantBag.projects).map(function(project, i) {
                  return (
                    <PlantBagProject projectName={project} plantItems={that.state.plantBag.projects[project].plantItems} key={i}>
                      {Object.keys(that.state.plantBag.projects[project].plantItems).map(function(plantItem, i) {
                        return (<PlantBagItem plantItemName={plantItem} plantBagitem={that.state.plantBag.projects[project].plantItems[plantItem]} key={i}/>);
                      })}
                    </PlantBagProject>
                  );
                })}
                <div className="doubledLine"/>
                <div className="overallPrice">
                  GESAMT:&nbsp;{Accounting.formatNumber(this.state.plantBag.price / 100, 2, ".", ",")}&nbsp;€
                </div>
                <div className="align-right">
                  <IconButton glyphIcon="glyphicon-euro" text="WEITER ZUR KASSE" onClick={this.switchTOPaymentPage.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
