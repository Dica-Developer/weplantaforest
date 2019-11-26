import counterpart from 'counterpart';
import React, { Component } from 'react';

var svgParams = require('./svgParams.js');

require('./svgButton.less');

export default class svgButton extends Component {

  constructor(props) {
    super(props);
  }

  onMouseUp(event) {
    this.props.onClick(event.nativeEvent);
  }

  render() {
    let buttonType = this.props.buttonType;
    let svgButton = [];
    svgButton.push('<svg width="' + svgParams[buttonType].width + '" height="' + svgParams[buttonType].height + '" viewBox="' + svgParams[buttonType].viewBox + '">');
    svgButton.push('<title>' + counterpart.translate('SVG_TITLES.' + buttonType)+ '</title>');
    for(let transformFunction of svgParams[buttonType].transform){
      svgButton.push('<g transform="' + transformFunction + '">');
    }
    svgButton.push('<path d="' + svgParams[buttonType].path + '"/>');
    for(let transformValue of svgParams[buttonType].transform){
      svgButton.push('</g>');
    }
    svgButton.push('</svg>');

    return (
      <div className={"svgButton " + (this.props.className ? this.props.className : '')}>
        <a role="button" onMouseUp={(event) => {
          this.onMouseUp(event);
        }}>
          <div dangerouslySetInnerHTML={{ __html: svgButton }} />
          <p>
            {this.props.text.split('<br/>').map(function(item, i) {
              return (
                <span key={i}>
                  {item}
                  <br/>
                </span>
              );
            })}
          </p>
        </a>
      </div>
    );
  }
}
