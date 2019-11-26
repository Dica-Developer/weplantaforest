import counterpart from 'counterpart';
import React, { Component } from 'react';
import CircleButton from '../../common/components/CircleButton';


export default class ButtonBar extends Component {
  constructor(props) {
    super(props);
  }

  switchTo(page, index){
    this.props.switchTo(page, index);
  }

  render() {
    return (
      <div className="buttons">
        <div className="col-md-3 align-center">
          <CircleButton text={counterpart.translate('TOOLS')} onClick={()=>{this.switchTo('overview', 0);}} glyphIcon="glyphicon-forward" className={this.props.clickedIndex == 0
            ? 'circleButtonActive'
            : ''}/>
        </div>
        <div className={'col-md-3 align-center'}>
          <CircleButton text={counterpart.translate('WIDGETS')} onClick={()=>{this.switchTo('widgets', 1);}} glyphIcon="glyphicon-forward" className={this.props.clickedIndex == 1
            ? 'circleButtonActive'
            : ''}/>
        </div>
        <div className={'col-md-3 align-center'}>
          <CircleButton text={counterpart.translate('CERTIFICATES')} onClick={()=>{this.switchTo('certificates', 2);}} glyphIcon="glyphicon-forward" className={this.props.clickedIndex == 2
            ? 'circleButtonActive'
            : ''}/>
        </div>
        <div className={'col-md-3 align-center'}>
          <CircleButton text={counterpart.translate('BANNER')} onClick={()=>{this.switchTo('banner', 3);}} glyphIcon="glyphicon-forward" className={this.props.clickedIndex == 3
            ? 'circleButtonActive'
            : ''}/>
        </div>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
