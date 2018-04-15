import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';
import reducer	from './store/reducer.js'
import {Provider} from 'react-redux'
import App from './App.jsx';
import 'babel-polyfill'
import './index.css';

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
