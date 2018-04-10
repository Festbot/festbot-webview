import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux'; 
import reducer	from './store/reducer.js'
import {Provider} from 'react-redux'

import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';
import 'babel-polyfill'
import 'typeface-roboto'
import './index.css';

const store = createStore(reducer);

const render = Component => {



	ReactDOM.render(

		<Provider store={store}>
			<AppContainer>
				<Component />
			</AppContainer>
		</Provider>,
		document.getElementById('root')
	);
};

render(App);

if (module.hot) {
	module.hot.accept('./App.jsx', () => {
		const NextApp = require('./App.jsx').default;
		render(NextApp);
	});
}
