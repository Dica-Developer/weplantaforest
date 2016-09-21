import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import NavBar from '../common/navbar/NavBar';
import Header from '../common/header/Header';
import Footer from '../common/Footer';
import Boostrap from 'bootstrap';

import DoRegistration from './DoRegistration';
import RegistrationDone from './RegistrationDone';

require("./registrationPage.less");

export default class RegistrationPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registrated: true
    };
  }

  setRegistrated(value){
    this.setState({registrated: value});
  }

  render() {
    var content;

    if(this.state.registrated){
      content = <RegistrationDone />;
    }else{
      content = <DoRegistration setRegistrated={()=>{this.setRegistrated(true)}}/>
    }

    return (
      <div>
        <NavBar/>
        <Header/>
        <div className="container paddingTopBottom15">
          <div className="row registrationPage">
            {content}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
