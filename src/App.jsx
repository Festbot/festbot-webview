import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import Aux from './hoc/Aux/Aux.jsx';
import Layout from './hoc/Layout/Layout.jsx';
import MusicFestivalWebViewLayout from './hoc/Layout/MusicFestivalWebviewLayout.jsx';
import classes from './App.css';
import FestbotBrowserContainer from './containers/webview/FestbotBrowserContainer/FestbotBrowserContainer.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import { BrowserRouter } from 'react-router-dom';
import FestivalProgramContainer from './containers/webview/FestivalProgramContainer/FestivalProgramContainer.jsx'
import DiscoverContainer from './containers/webview/Discover/DiscoverContainer.jsx'
import LandingPageContainer from './containers/www/LandingPage/LandingPageContainer.jsx'
import VisibiltyControl from './hoc/VisibilityControl/VisibilityControl.jsx'


import { hot } from 'react-hot-loader';

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

class App extends Component {
	render() {

		return (
			<BrowserRouter>
			<MuiThemeProvider muiTheme={muiTheme}>


						<Route path="/" exact render={()=>(
							<Layout>
								<Route path='/' exact component={LandingPageContainer}/>
							</Layout>
						)}/>
							
				
						<Route path='/webview' render={()=>(
							<MusicFestivalWebViewLayout className={classes.App}>
								<Route path='/webview' exact component={FestbotBrowserContainer}/>
								<Route path='/webview/festival/:festival_name' exact component={FestivalProgramContainer}/>
								<Route path='/webview/artist/:artist_name' exact render={(data) => {console.log(data);return <h1>hello</h1>}} />
								<Route path='/webview/discover/:artist_name?' exact component={DiscoverContainer}/>
						</MusicFestivalWebViewLayout>
						)}/>

						

					

	

			</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}

export default hot(module)(App);
