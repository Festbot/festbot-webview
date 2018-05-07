import React, { Component } from 'react';
import classes from './LandingPageContainer.css';
import Hero from '../hero/HeroContainer.jsx';
import ContentBlockContainer from '../../../hoc/ui/ContentBlockContainer.jsx';
import ContentBlockImage from '../ContentBlock/ContentBlockImage.jsx';
import ContentBlockText from '../ContentBlock/ContentBlockText.jsx';
import ContentBlockWrapper from '../ContentBlock/ContentBlockWrapper.jsx';
import HighlightsBlock from '../Highlights/HighlightsBlock.jsx';
import HighlightsContainer from '../Highlights/HighlightsContainer.jsx';
import VisibiltyControl from '../../../hoc/VisibilityControl/VisibilityControl.jsx';

export class LandingPageContainer extends Component {
	render() {
		return (
			<div className={classes.contentContainer}>
				<VisibiltyControl effect="fade">
					<Hero />
				</VisibiltyControl>

				<VisibiltyControl effect="fade" always={true}>
					<ContentBlockContainer backgroundColor="white">
						<ContentBlockWrapper>
							<VisibiltyControl effect="zoom" always={true}>
								<ContentBlockImage videoUrl="http://festbot.com/assets/video/plan_your_festival.mp4" />
							</VisibiltyControl>
						</ContentBlockWrapper>
						<ContentBlockWrapper>
							<VisibiltyControl effect="right" always={true}>
								<ContentBlockText
									alignDirection="left"
									title="Plan your festival"
									description="Browse the festival catalog. Check the tour locations of your favourite Artist. Listen their best relases, and save the event to your festival calendar with Festbot."
								/>
							</VisibiltyControl>
						</ContentBlockWrapper>
					</ContentBlockContainer>
				</VisibiltyControl>

				<VisibiltyControl effect="fade" always={true}>
					<ContentBlockContainer backgroundColor="rgb(203, 217, 224)">
						<ContentBlockWrapper>
							<VisibiltyControl effect="left" always={true}>
								<ContentBlockText
									alignDirection="right"
									title="Take your personal assistant with you"
									description="Check your upcoming events with Festbot. Ask for useful informations during the show, eg. where to find Mexican food, lockers, toilets nearby."
								/>
							</VisibiltyControl>
						</ContentBlockWrapper>
						<ContentBlockWrapper>
							<VisibiltyControl effect="zoom" always={true}>
								<ContentBlockImage videoUrl="http://festbot.com/assets/video/plan_your_festival.mp4" />
							</VisibiltyControl>
						</ContentBlockWrapper>
					</ContentBlockContainer>
				</VisibiltyControl>

				<VisibiltyControl effect="fade" always={true}>
					<ContentBlockContainer backgroundColor="white">
						<ContentBlockWrapper>
							<VisibiltyControl effect="zoom" always={true}>
								<ContentBlockImage videoUrl="http://festbot.com/assets/video/plan_your_festival.mp4" />
							</VisibiltyControl>
						</ContentBlockWrapper>
						<ContentBlockWrapper>
							<VisibiltyControl effect="right" always={true}>
								<ContentBlockText
									alignDirection="left"
									title="Meet new people"
									description="Festbot will help you to connect with others. Have fun, enjoy an event together, drink a beer or just walk around. You can choose from many options, and maybe you will find love."
								/>
							</VisibiltyControl>
						</ContentBlockWrapper>
					</ContentBlockContainer>
				</VisibiltyControl>

				<VisibiltyControl effect="fade" always={true}>
					<HighlightsContainer backgroundColor="#37474F">
						<VisibiltyControl effect="zoom" always={true}>
							<HighlightsBlock
								alignDirection="left"
								title="It's free"
								description="Festbot is free, easy to start. Click on the Get Started button or search for Festbot at Messenger."
							/>
						</VisibiltyControl>
						<VisibiltyControl effect="zoom" always={true}>
							<HighlightsBlock
								alignDirection="left"
								title="No app download"
								description="Festbot is working on the Messenger Platform as a converstaion thread. Just say Hi to Festbot, that's all."
							/>
						</VisibiltyControl>
						<VisibiltyControl effect="zoom" always={true}>
							<HighlightsBlock
								alignDirection="left"
								title="It is for you"
								description="Festbot is learning and collecting the information what suits you the best."
							/>
						</VisibiltyControl>
					</HighlightsContainer>
				</VisibiltyControl>

				<ContentBlockContainer backgroundColor="rgb(203, 217, 224)" />

				<ContentBlockContainer backgroundColor="white" />
			</div>
		);
	}
}

export default LandingPageContainer;
