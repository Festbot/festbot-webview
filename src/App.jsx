import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Aux from './hoc/Aux/Aux.jsx';
import Layout from './hoc/Layout/Layout.jsx';
import MusicFestivalWebViewLayout from './hoc/Layout/MusicFestivalWebviewLayout.jsx';
import classes from './App.css';
import FestbotBrowserContainer from './containers/webview/FestbotBrowserContainer/FestbotBrowserContainer.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import { BrowserRouter } from 'react-router-dom';
import FestivalProgramContainer from './containers/webview/FestivalProgramContainer/FestivalProgramContainer.jsx';
import DiscoverContainer from './containers/webview/Discover/DiscoverContainer.jsx';
import ComingSoonPage from './containers/webview/ComingSoonPage.jsx'
import ZerkingContainer from './containers/webview/Zerking/ZerkingContainer.jsx'
import NavigatorContainer from './containers/webview/Navigator/NavigatorContainer.jsx'


import VisibiltyControl from './hoc/VisibilityControl/VisibilityControl.jsx';

import { hot } from 'react-hot-loader';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: colors.orange700,
		primary2Color: colors.orange900,
		primary3Color: colors.grey400
	},
	appBar: {
		height: 50
	}
});

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<MuiThemeProvider muiTheme={muiTheme}>
					<Route
						path="/"
						render={() => (
							<MusicFestivalWebViewLayout className={classes.App}>
							<Switch>
								<Route path="/" exact component={FestbotBrowserContainer} />
								<Route path="/festivals" exact component={FestbotBrowserContainer} />
								<Route path="/festival-list" exact component={FestbotBrowserContainer} />
								<Route path="/festival/:festival_id" exact component={FestivalProgramContainer} />
								<Route
									path="/artist/:artist_name"
									exact
									render={data => {

										return <h1>hello</h1>;
									}}
								/>
								<Route path="/discover/:artist_name?" exact component={DiscoverContainer} />
								<Route path="/zerking" exact component={ZerkingContainer} />
								<Route path="/navigator" exact component={NavigatorContainer} />
								<Route component={ComingSoonPage} />
							</Switch>
							</MusicFestivalWebViewLayout>
						)}
					/>
				</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}

export default hot(module)(App);
