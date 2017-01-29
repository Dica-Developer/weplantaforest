import React, {Component} from 'react';

import {Router, Route, browserHistory} from 'react-router';

import NavBar from './common/navbar/NavBar';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';

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
import ProjectsPage from './projects/ProjectsPage'
import StatisticsPage from './statistics/StatisticsPage';
import TeamPage from './team/TeamPage';
import BlogPage from './blog/BlogPage';
import BlogOverviewPage from './blog/BlogOverviewPage';
import SuccessCC from './payment/SuccessCC';
import ErrorCC from './payment/ErrorCC';
import Co2Calculator from './co2/Co2Calculator';
import FAQ from './faq/FaqView';
import HelpUs from './common/footer/pages/HelpUs';
import Links from './common/footer/pages/Links';
import Disclaimer from './common/footer/pages/Disclaimer';
import Imprint from './common/footer/pages/Imprint';
import BackOfficeOverview from './backOffice/BackOfficeOverview';
import ArticleManager from './backOffice/articleManager/ArticleManager';
import ArticleCreater from './backOffice/articleManager/ArticleCreater';
import ArticleEditor from './backOffice/articleManager/ArticleEditor';
import CartOverview from './backOffice/cartManager/CartOverview';
import UserOverview from './backOffice/userManager/UserOverview';
import ProjectOverview from './backOffice/projectManager/ProjectOverview';
import ProjectEditor from './backOffice/projectManager/ProjectEditor';
import TreeTypeOverview from './backOffice/treeTypeManager/TreeTypeOverview';

export default class Routes extends Component {

  reRender() {
    this.forceUpdate();
  }

  updatePlantBag(price, projectItems, projectName, isGift) {
    this.refs["navbar"].updatePlantBag(price, projectItems, projectName, isGift);
  }

  updatePlantBagFromLocaleStorage() {
    this.refs["navbar"].updatePlantBagFromLocaleStorage();
  }

  updateNavbarComponents() {
    this.refs["navbar"].updateComponents();
  }

  render() {
    return (
      <div>
        <NavBar ref="navbar" reRender={this.reRender.bind(this)}/>
        <Header/>
        <Router history={browserHistory}>
          <Route path="/" component={MainPage} reRender={this.reRender.bind(this)}/>
          <Route path="/plant/:amount" component={ProposalPlantPage} updatePlantBag={this.updatePlantBag.bind(this)} reRender={this.reRender.bind(this)} header="online pflanzen" isGift={false} isAbo={false}/>
          <Route path="/plant3" component={CustomPlantPage} updatePlantBag={this.updatePlantBag.bind(this)} reRender={this.reRender.bind(this)} header="online pflanzen" isGift={false} isAbo={false}/>
          <Route path="/plantGift/:amount" component={ProposalPlantPage} updatePlantBag={this.updatePlantBag.bind(this)} reRender={this.reRender.bind(this)} header="Gutschein erstellen" isGift={true} isAbo={false}/>
          <Route path="/plantGift2" component={CustomPlantPage} updatePlantBag={this.updatePlantBag.bind(this)} reRender={this.reRender.bind(this)} header="Gutschein erstellen" isGift={true} isAbo={false}/>
          <Route path="/projects" component={ProjectsPage} reRender={this.reRender.bind(this)}/>
          <Route path="/projects/:projectName" component={ProjectDetailsPage} updatePlantBag={this.updatePlantBag.bind(this)} reRender={this.reRender.bind(this)}/>
          <Route path="/user/:userName" component={ProfilePage} reRender={this.reRender.bind(this)}/>
          <Route path="/ranking" component={RankingPage} reRender={this.reRender.bind(this)}/>
          <Route path="/projectOffer" component={ProjectOfferPage} reRender={this.reRender.bind(this)}/>
          <Route path="/selfPlant" component={SelfPlantPage} reRender={this.reRender.bind(this)}/>
          <Route path="/plantBag" component={PlantBagPage} reRender={this.reRender.bind(this)} updatePlantBag={this.updatePlantBagFromLocaleStorage.bind(this)}/>
          <Route path="/payCart/:cartId" component={PaymentPage} reRender={this.reRender.bind(this)} updateComponents={this.updateNavbarComponents.bind(this)}/>
          <Route path="/payGift/:cartId/:giftId" component={PaymentPage} reRender={this.reRender.bind(this)} updateComponents={this.updateNavbarComponents.bind(this)}/>
          <Route path="/registration" component={RegistrationPage} reRender={this.reRender.bind(this)}/>
          <Route path="/userActivation" component={ActivationPage} reRender={this.reRender.bind(this)}/>
          <Route path="/forgotPassword" component={ForgotPasswordPage} reRender={this.reRender.bind(this)}/>
          <Route path="/password_reset" component={ResetPasswordPage} reRender={this.reRender.bind(this)}/>
          <Route path="/gifts/:userName" component={GiftOverview} reRender={this.reRender.bind(this)}/>
          <Route path="/gift/redeem" component={RedeemGiftPage} reRender={this.reRender.bind(this)}/>
          <Route path="/certificate/find" component={FindTreePage} reRender={this.reRender.bind(this)}/>
          <Route path="/statistics" component={StatisticsPage} reRender={this.reRender.bind(this)}/>
          <Route path="/team/:teamName" component={TeamPage} reRender={this.reRender.bind(this)}/>
          <Route path="/blog/:articleId" component={BlogPage} reRender={this.reRender.bind(this)}/>
          <Route path="/blog" component={BlogOverviewPage} reRender={this.reRender.bind(this)}/>
          <Route path="/payCC/succes/:cartId" component={SuccessCC} reRender={this.reRender.bind(this)}/>
          <Route path="/payCC/error/:cartId" component={ErrorCC} reRender={this.reRender.bind(this)}/>
          <Route path="/co2Calculator" component={Co2Calculator} reRender={this.reRender.bind(this)}/>
          <Route path="/faq" component={FAQ} reRender={this.reRender.bind(this)}/>
          <Route path="/helpUs" component={HelpUs} reRender={this.reRender.bind(this)}/>
          <Route path="/links" component={Links} reRender={this.reRender.bind(this)}/>
          <Route path="/disclaimer" component={Disclaimer} reRender={this.reRender.bind(this)}/>
          <Route path="/imprint" component={Imprint} reRender={this.reRender.bind(this)}/>
          <Route path="/backOffice" component={BackOfficeOverview} reRender={this.reRender.bind(this)}/>
          <Route path="/article-manager" component={ArticleManager} reRender={this.reRender.bind(this)}/>
          <Route path="/article-create" component={ArticleCreater} reRender={this.reRender.bind(this)}/>
          <Route path="/article-edit/:articleId" component={ArticleEditor} reRender={this.reRender.bind(this)}/>
          <Route path="/cart-manager" component={CartOverview} reRender={this.reRender.bind(this)}/>
          <Route path="/user-manager" component={UserOverview} reRender={this.reRender.bind(this)}/>
          <Route path="/project-manager" component={ProjectOverview} reRender={this.reRender.bind(this)}/>
          <Route path="/project-edit/:projectId" component={ProjectEditor} reRender={this.reRender.bind(this)}/>
          <Route path="/treeType-manager" component={TreeTypeOverview} reRender={this.reRender.bind(this)}/>
          <Route path="*" component={NotFoundPage} reRender={this.reRender.bind(this)}/>
        </Router>
        <Footer/>
      </div>
    );
  }
};
