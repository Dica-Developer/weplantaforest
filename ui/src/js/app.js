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
    console.log('error: ', error);
    console.log(error.response);
    browserHistory.push('/forbidden?calledUrl=' + error.response.data.path);
    // Do something with response error
    return Promise.reject(error);
  });

render(<Routes />, document.getElementById('app'));
