import counterpart from 'counterpart';
import React, { Component } from 'react';

require('./article.less');

export default class ArticleDesc extends Component {
  render() {
    return (
      <div className="articleDesc bold">
        <div></div>
        <div>
          <p>
            {counterpart.translate('TREETYPE')}
            <br />
            {counterpart.translate('PRICE_PER_ITEM')}
          </p>
        </div>
        <div>
          {counterpart.translate('NUMBER')}
          &nbsp;/&nbsp;{counterpart.translate('AVAILABLE')}
        </div>
        <div>{counterpart.translate('SUB_TOTAL')}</div>
      </div>
    );
  }
}

/* vim: set softtabstop=2:shiftwidth=2:expandtab */
