import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Accounting from 'accounting';
import Boostrap from 'bootstrap';
import {browserHistory} from 'react-router';
import counterpart from 'counterpart';

import {
  getTextForSelectedLanguage
} from '../../language/LanguageHelper';
import {
  htmlDecode
} from '../../language/HtmlHelper';

export default class NameAmountCo2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      let co2Rounded = Accounting.formatNumber(this.props.content.co2Saved, 3, '.', ',');
    return (
      <div className="rankingSummary">
        <p >
          <span className="name">{htmlDecode(this.props.content.name)}</span>
          <br/>
          <span className="stats">{counterpart.translate('TREES_PLANTED')}:&nbsp;{this.props.content.amount}</span><br/>
          <span className="stats" dangerouslySetInnerHTML={{
              __html: counterpart.translate('CO2_BOUND_WITHOUT_TONS')
            }}></span>:&nbsp;
          <span className="stats">{co2Rounded}&nbsp;t</span>
        </p>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
