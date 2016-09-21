import React, {Component} from 'react';

import {Router, Route, browserHistory} from 'react-router';

import MainPage from './main/MainPage';
import PlantPage from './views/PlantPage';
import PlantSuccessPage from './views/PlantSuccessPage';
import NotFoundPage from './views/NotFoundPage';
import ExplorePage from './views/ExplorePage';
import ProjectDetailsPage from './project/ProjectDetailsPage';
import ProfilePage from './profile/ProfilePage';
import RankingPage from './ranking/RankingPage';
import ProjectOfferPage from './offer/ProjectOfferPage';
import SelfPlantPage from './selfPlant/SelfPlantPage';
import PlantBagPage from './plantBag/PlantBagPage';
import PaymentPage from './payment/PaymentPage';
import RegistrationPage from './registration/RegistrationPage';

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainPage}/>
        <Route path="/plant" component={PlantPage}/>
        <Route path="/plant/succcess" component={PlantSuccessPage}/>
        <Route path="/explore" component={ExplorePage}/>
        <Route path="/projects/:projectName" component={ProjectDetailsPage}/>
        <Route path="/user/:userName" component={ProfilePage}/>
        <Route path="/ranking" component={RankingPage}/>
        <Route path="/projectOffer" component={ProjectOfferPage}/>
        <Route path="/selfPlant" component={SelfPlantPage}/>
        <Route path="/plantBag" component={PlantBagPage}/>
        <Route path="/payment/:cartId" component={PaymentPage}/>
        <Route path="/registration" component={RegistrationPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Router>
    );
  }
};
