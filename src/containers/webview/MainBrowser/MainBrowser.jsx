import React, { Component } from 'react';
import FestivalBrowser from '../FestivalBrowser/FestivalBrowser.jsx';
import { Button, Grid, Container } from 'semantic-ui-react';
import WebviewFooterMenu from '../WebviewFooterMenu.jsx'
import Search from '../../../components/Search/Search.jsx';

export class mainBrowser extends Component {
	render() {
		return (
      <div>
        <Container>
        <Grid centered>
					<Grid.Row>
						<Button.Group size='large' fluid>
							<Button color="teal">Festival</Button>
							<Button.Or />
							<Button color="black">Artist</Button>
						</Button.Group>
          </Grid.Row>
          </Grid>
        </Container>
          <div>
          <Search style={{ margin: '15px auto' }} fluid />
        </div>

          
					
				

					
						<p>Day/Location tabs</p>
						<p>search bar</p>

						<p>list festivals</p>

						<p>list festivals</p>
						<p>
							List artist/GET STARTED(call to action acces token)
						</p>
						<p>list countries</p>
					
            
        
			</div>
		);
	}
}

export default mainBrowser;
