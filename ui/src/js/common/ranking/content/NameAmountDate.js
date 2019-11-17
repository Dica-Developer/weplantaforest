import React, {
  Component
} from 'react';

import moment from 'dayjs';

import he from 'he';

import counterpart from 'counterpart';

export default class NameAmountDate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rankingSummary">
        <p>
          <span className="name">{he.decode(this.props.name)}</span><br/>
          <span className="stats">{counterpart.translate('TREES_PLANTED')}:&nbsp;{this.props.amount}</span><br/>
          <span className="stats">{counterpart.translate('DATE')}:</span>
          <span className="stats">{moment(this.props.plantedOn).format('DD.MM.YYYY')}</span>
        </p>
      </div>
    );
  }
}
/* vim: set softtabstop=2:shiftwidth=2:expandtab */
