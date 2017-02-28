import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// webpack allows you to import styles in js
// can tie css to the component
import './reset.css';
import './style.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
