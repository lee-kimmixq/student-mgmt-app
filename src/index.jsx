import React from 'react';
import { render } from 'react-dom';

import '../dist/output.scss';

import App from './App.jsx';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
render(<App />, rootElement);
