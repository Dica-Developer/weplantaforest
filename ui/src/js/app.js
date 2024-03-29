import axios from 'axios';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import '../js/common/header/header.less';
import '../less/main.less';
import Routes from './routes';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status == 403) {
        browserHistory.push('/forbidden?calledUrl=' + error.response.config.url);
      } else if (error.response.status == 402) {
        location.href = error.response.data;
      }
    } else {
    }
    return Promise.reject(error);
  }
);

render(<Routes />, document.getElementById('app'));
