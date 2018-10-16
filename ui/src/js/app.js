import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import axios from 'axios';
import { browserHistory } from 'react-router';

import '../less/main.less';
import '../js/common/header/header.less';

axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
  }, (error) => {
    if(error.response.status == 403) {
      browserHistory.push('/forbidden?calledUrl=' + error.response.data.path);
    }
    return Promise.reject(error);
  });

render(<Routes />, document.getElementById('app'));
