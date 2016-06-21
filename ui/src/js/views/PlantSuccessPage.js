import React, {
  Component
} from 'react';
import Accounting from 'accounting';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Bootstrap from 'bootstrap';

export default class PlantSuccessPage extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div>
          You paid successful
        </div>
        <Footer/>
      </div>);
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
