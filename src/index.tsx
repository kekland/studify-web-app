import 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Icons from './icons'
import './design/index.css'
import { store } from './state/store'
import { Provider as ReduxProvider } from 'react-redux'

import { library } from '@fortawesome/fontawesome-svg-core'
Icons.forEach(icon => library.add(icon))

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
