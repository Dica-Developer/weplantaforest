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
      // TODO in case of 401 or invalid token set token to null and isAmdin false
      // TODO in any other case store the new token
      if (error.response.status == 403) {
        browserHistory.push('/forbidden?calledUrl=' + error.response.config.url);
      } else if (error.response.status == 402) {
        location.href = error.response.data;
      }
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

render(<Routes />, document.getElementById('app'));
