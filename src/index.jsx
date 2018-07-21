import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store.js';
import {Provider} from 'react-redux'
import App from './App.jsx';
import 'babel-polyfill'
import './index.css';


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
