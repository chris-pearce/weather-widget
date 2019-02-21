import React from 'react';
import ReactDOM from 'react-dom';
import 'backpack.css';
import 'src/assets/css/global.css';
import { Layout } from 'src/components';
import { CheckSupport } from 'src/features';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Layout>
    <CheckSupport />
  </Layout>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
