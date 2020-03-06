import Accounting from 'accounting';
import counterpart from 'counterpart';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import SvgButton from '../common/components/SvgButton';

require('./bottomPart.less');

export default class BottomPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasPutIntoPlantBag: false
    };
  }

  updatePlantBag() {
    this.props.updatePlantBag();
    this.setState({ wasPutIntoPlantBag: true });
  }

  goToOverview() {
    browserHistory.push('/plantBag');
  }

  render() {
    let button;
    if (this.state.wasPutIntoPlantBag) {
      button = <SvgButton text={counterpart.translate('TO_OVERVIEW')} buttonType="barrow" onClick={this.goToOverview.bind(this)} className="to-overview scale" />;
    } else {
      button = <SvgButton text={counterpart.translate('PUT_INTO_PLANTBAG')} buttonType="trees" onClick={this.updatePlantBag.bind(this)} />;
    }
    return (
      <div className="bottomPart">
        <div className="button-and-price">
          <div className="price">
            <span>
              {counterpart.translate('PRICE_TOTAL')}:&nbsp;{Accounting.formatNumber(this.props.overallPrice / 100, 2, '.', ',')}&nbsp;€
            </span>
          </div>
          <div className="plantBagButton">{button}</div>
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
