import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Snowflake from './KochSnowflake';

ReactDOM.render(
  <React.StrictMode>
    <Snowflake />
  </React.StrictMode>,
  document.getElementById('root')
);