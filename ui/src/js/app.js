import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';

require('../less/main.less');

render(<Routes />, document.getElementById('app'));
