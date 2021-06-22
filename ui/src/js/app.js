import axios from 'axios';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import '../js/common/header/header.less';
import '../less/main.less';
import Routes from './routes';

function storeToken(response) {
  if (response.headers['x-auth-token']) {
    let token = response.headers['x-auth-token'];
    localStorage.setItem('jwt', token);
  }
}

axios.interceptors.response.use(
  (response) => {
    storeToken(response);
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status == 403) {
        browserHistory.push('/forbidden?calledUrl=' + error.response.config.url);
      } else if (error.response.status == 402) {
        location.href = error.response.data;
      } else if (error.response.status == 401) {
        localStorage.setItem('jwt', '');
        localStorage.setItem('username', '');
        localStorage.setItem('userDetails', '');
        localStorage.setItem('isAdmin', false);
      }
      storeToken(error.response);
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

render(<Routes />, document.getElementById('app'));
