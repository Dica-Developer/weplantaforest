import React, {Component} from 'react';

import {Router, Route, browserHistory} from 'react-router';

import MainPage from './main/MainPage';
import ProposalPlantPage from './planting/proposalPlantPage/ProposalPlantPage';
import SliderPlantPage from './planting/sliderPlantPage/SliderPlantPage';
import CustomPlantPage from './planting/customPlantPage/CustomPlantPage';
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
import GiftOverview from './gifts/overview/GiftOverview';
import RedeemGiftPage from './gifts/redeem/RedeemGiftPage'
import FindTreePage from './findTree/FindTreePage';

export default class Routes extends Component {

  reRender(){
    this.forceUpdate();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainPage} reRender={this.reRender.bind(this)}/>
        <Route path="/plant/:amount" component={ProposalPlantPage} reRender={this.reRender.bind(this)} header="online pflanzen" isGift={false} isAbo={false}/>
        <Route path="/plant2" component={SliderPlantPage} reRender={this.reRender.bind(this)} header="online pflanzen" isGift={false} isAbo={false}/>
        <Route path="/plant3" component={CustomPlantPage} reRender={this.reRender.bind(this)} header="online pflanzen" isGift={false} isAbo={false}/>
        <Route path="/explore" component={ExplorePage} reRender={this.reRender.bind(this)}/>
        <Route path="/projects/:projectName" component={ProjectDetailsPage} reRender={this.reRender.bind(this)}/>
        <Route path="/user/:userName" component={ProfilePage} reRender={this.reRender.bind(this)}/>
        <Route path="/ranking" component={RankingPage} reRender={this.reRender.bind(this)}/>
        <Route path="/projectOffer" component={ProjectOfferPage} reRender={this.reRender.bind(this)}/>
        <Route path="/selfPlant" component={SelfPlantPage} reRender={this.reRender.bind(this)}/>
        <Route path="/plantBag" component={PlantBagPage} reRender={this.reRender.bind(this)}/>
        <Route path="/payCart/:cartId" component={PaymentPage} reRender={this.reRender.bind(this)}/>
        <Route path="/payGift/:cartId/:giftId" component={PaymentPage} reRender={this.reRender.bind(this)}/>
        <Route path="/registration" component={RegistrationPage} reRender={this.reRender.bind(this)}/>
        <Route path="/userActivation" component={ActivationPage} reRender={this.reRender.bind(this)}/>
        <Route path="/forgotPassword" component={ForgotPasswordPage} reRender={this.reRender.bind(this)}/>
        <Route path="/password_reset" component={ResetPasswordPage} reRender={this.reRender.bind(this)}/>
        <Route path="/gifts/:userName" component={GiftOverview} reRender={this.reRender.bind(this)}/>
        <Route path="/gift/redeem" component={RedeemGiftPage} reRender={this.reRender.bind(this)}/>
        <Route path="/certificate/find" component={FindTreePage} reRender={this.reRender.bind(this)}/>
        <Route path="*" component={NotFoundPage} reRender={this.reRender.bind(this)}/>
      </Router>
    );
  }
};
