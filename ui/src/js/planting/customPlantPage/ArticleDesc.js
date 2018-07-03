import React, {
  Component
} from 'react';
import {
  render
} from 'react-dom';
import Boostrap from 'bootstrap';
import axios from 'axios';
import Accounting from 'accounting';
import {
  Link,
  browserHistory
} from 'react-router';
import counterpart from 'counterpart';

require('./article.less');

export default class ArticleDesc extends Component {

  render() {
    return (
      <div className="articleDesc bold">
        <div>
          <p>
            {counterpart.translate('TREETYPE')}<br/>{counterpart.translate('PRICE_PER_ITEM')}
          </p>
        </div>
        <div>
          {counterpart.translate('NUMBER')}
        </div>
        <div>
          &nbsp;/&nbsp;{counterpart.translate('AVAILABLE')}
        </div>
        <div>
          {counterpart.translate('SUB_TOTAL')}
        </div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
