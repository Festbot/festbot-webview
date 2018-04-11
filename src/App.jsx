import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import Aux from './hoc/Aux/Aux.jsx';
import Layout from './hoc/Layout/Layout.jsx';
import MusicFestivalWebViewLayout from './hoc/Layout/MusicFestivalWebviewLayout.jsx';
import MainBrowser from './containers/webview/MainBrowser/MainBrowser.jsx';
import { Container } from 'semantic-ui-react';
import classes from './App.css';
import FestbotBrowserContainer from './containers/webview/FestbotBrowserContainer/FestbotBrowserContainer.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import { BrowserRouter } from 'react-router-dom';
import FestivalProgramContainer from './containers/webview/FestivalProgramContainer/FestivalProgramContainer.jsx'



import semanticLess from '../my-semantic-theme/semantic.less';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.orange700,
    primary2Color: colors.orange900,
		primary3Color: colors.grey400,
		
  },
  appBar: {
    height: 50,
  },
});


export class App extends Component {

	
	render() {
		return (
			<BrowserRouter>
			<MuiThemeProvider muiTheme={muiTheme}>
				<Container>
					<Switch>
							
						<MusicFestivalWebViewLayout>
							
							<Route path='/' exact component={FestbotBrowserContainer}/>
							<Route path='/festival/:festival_name' exact component={FestivalProgramContainer}/>
							<Route path='/artist/:artist_name' exact render={(data) => {console.log(data);return <h1>hello</h1>}} />
						</MusicFestivalWebViewLayout>

						<Layout />

					</Switch>
				</Container>
			</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}

export default App;
