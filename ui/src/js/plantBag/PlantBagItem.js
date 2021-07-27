import Accounting from 'accounting';
import React, { Component } from 'react';
import IconButton from '../common/components/IconButton';

require('./plantBagItem.less');

export default class PlantBagItem extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillUnmount() {
    const elm = this.refs.result;
    // elm.removeEventListener('animationend', this.scalingDone);
  }
  scalingDone() {
    this.setState({ scaleResult: false });
  }

  componentDidMount() {
    const elm = this.refs.result;
    elm.addEventListener('animationend', this.scalingDone);
  }

  updateAmount(event) {
    this.props.setPlantBagItemAmount(event.target.value);
  }

  render() {
    let imageUrl = 'http://localhost:8081/treeType/image/' + this.props.plantBagitem.imageFile + '/60/60';
    return (
      <div className="plantBagItem">
        <div className="image">
          <img src={imageUrl} />
        </div>
        <div className="treeTypeInfo">
          <p>
            <span className="bold uppercase">{this.props.plantItemName}</span>
            <br />
            <span className="bold">{Accounting.formatNumber(this.props.plantBagitem.price / 100, 2, '.', ',')}&nbsp;€</span>
          </p>
        </div>
        <div className="customizer">
          <input ref="amountInput" type="number" value={this.props.plantBagitem.amount} onChange={this.updateAmount.bind(this)} />
        </div>
        <div ref="result" className={'result'}>
          <p className="bold">{Accounting.formatNumber((this.props.plantBagitem.amount * this.props.plantBagitem.price) / 100, 2, '.', ',')}&nbsp;€</p>
          <IconButton glyphIcon="glyphicon-trash" onClick={this.props.removePlantBagItem.bind(this)} />
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
