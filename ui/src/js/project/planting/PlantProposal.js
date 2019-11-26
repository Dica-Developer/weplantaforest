import axios from 'axios';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import IconButton from '../../common/components/IconButton';
import Notification from '../../common/components/Notification';
import BottomPart from '../../planting/BottomPart';
import ButtonBar from './ButtonBar';
import PlantItem from './PlantItem';


require('../../planting/bottomPart.less');

export default class PlantProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trees: {
        plantItems: []
      },
      overallPrice: 0,
      amount: 0,
      slideIn: false,
      areThereTreesToPlant: true,
      errorMessages: []
    };
  }

  componentDidMount(){
    this.getPlantProposal(this.props.amount);
  }

  updatePlantBag() {
    for (var plantItem in this.state.trees.plantItems) {
      var price = this.state.trees.plantItems[plantItem].amount * this.state.trees.plantItems[plantItem].treePrice;
      var projectItems = {};
      projectItems[this.state.trees.plantItems[plantItem].treeType] = {
        amount: parseInt(this.state.trees.plantItems[plantItem].amount),
        price: parseInt(this.state.trees.plantItems[plantItem].treePrice),
        imageFile: this.state.trees.plantItems[plantItem].imageFile
      };
      this.props.updatePlantBag(price, projectItems, this.props.projectName);
    }
  }

  getPlantProposal(value) {
    var that = this;
    this.setState({slideIn: true});
    axios.get('http://localhost:8081/simplePlantProposalForTrees/project?projectName=' + this.props.projectName + '&amountOfTrees=' + value).then(function(response) {
      var result = response.data;
      that.sleep(500);
      that.setState({
        trees: result,
        slideIn: false
      });
    }).catch(function(error) {
      if(error.response.status == 400){
        let messages = []
        for(let errorInfo of error.response.data.errorInfos){
          messages.push(counterpart.translate(errorInfo.errorCode));
        }
        that.setState({areThereTreesToPlant: false, errorMessages: messages});
      }else{
        that.refs.notification.handleError(error);
      }
    });
  }

  componentDidUpdate() {
    if (this.state.amount != this.props.amount) {
      this.setState({amount: this.props.amount});
      this.getPlantProposal(this.props.amount);
    }
  }

  sleep(milliseconds) {
    var e = new Date().getTime() + (milliseconds);
    while (new Date().getTime() <= e) {}
  }

  switchToOfferProjectPage() {
    browserHistory.push('/projectOffer');
  }

  switchToContactPage() {
    browserHistory.push('/contact');
  }

  render() {
    return (
      <div>
        <div className={(this.state.areThereTreesToPlant ? '' : 'no-display')}>
          <ButtonBar chosen={this.props.amount} setAmount={this.props.setAmount.bind(this)}/>
        </div>
        <div className={"plantItemDesc align-center bold plantItemDesc "+ (this.state.areThereTreesToPlant ? '' : 'no-display')}>
          <div>
            <p>
              {counterpart.translate('TREETYPE')}<br/>{counterpart.translate('PRICE_PER_ITEM')}
            </p>
          </div>
          <div>
            {counterpart.translate('NUMBER')}
          </div>
          <div></div>
          <div>
            {counterpart.translate('SUB_TOTAL')}
          </div>
        </div>
        <div ref="plantItems" className={(this.state.slideIn
          ? 'sliding-in '
          : 'sliding-out ') + 'align-center plantItems' + (this.state.areThereTreesToPlant ? '' : 'no-display')}>
          {this.state.trees.plantItems.map(function(plantItem, i) {
            return (<PlantItem plantItem={plantItem} key={i}/>);
          })}
        </div>
        <div className={(!this.state.areThereTreesToPlant ? '' : 'no-display')}>
          {this.state.errorMessages.map(function(message, i) {
            return(<p className='align-center error-message' key={i} >{message}</p>);
          })}
          <div className="align-center offer-acreage">
            <p>{counterpart.translate('AREA_QUESTION')}</p>
            <IconButton glyphIcon="glyphicon-forward" text={counterpart.translate('OFFER_AREA')} onClick={this.switchToOfferProjectPage.bind(this)}/>
          </div>
          <div className="align-center offer-acreage">
            <p>{counterpart.translate('HELP_WITH_NO_TREE_DONATION')}</p>
            <IconButton glyphIcon="glyphicon-forward" text={counterpart.translate('CONTACT')} onClick={this.switchToContactPage.bind(this)}/>
          </div>
        </div>
        <div className={(this.state.areThereTreesToPlant ? '' : 'no-display')}>
          <BottomPart updatePlantBag={this.updatePlantBag.bind(this)} overallPrice={this.state.trees.actualPrice}/>
        </div>
        <Notification ref="notification"/>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
