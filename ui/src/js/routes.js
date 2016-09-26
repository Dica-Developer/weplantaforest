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
import ActivationPage from './activation/ActivationPage';
import ForgotPasswordPage from './password/forgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './password/resetPassword/ResetPasswordPage';
import GiftOverview from './gifts/GiftOverview';

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
        <Route path="/payCart/:cartId" component={PaymentPage}/>
        <Route path="/payGift/:cartId/:giftId" component={PaymentPage}/>
        <Route path="/registration" component={RegistrationPage}/>
        <Route path="/userActivation" component={ActivationPage}/>
        <Route path="/forgotPassword" component={ForgotPasswordPage}/>
        <Route path="/password_reset" component={ResetPasswordPage}/>
        <Route path="/gifts/:userName" component={GiftOverview}/>
        <Route path="*" component={NotFoundPage}/>
      </Router>
    );
  }
};
