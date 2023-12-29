import * as React from "react"
import intro from '../images/intro.svg'
import workflow from '../images/workflow.svg'
import { Trophies } from '../components/trophy.jsx';
import ModalPlayer, {ModalItem, ModalPlaylist} from '../components/modalPlayer.tsx';
import { web } from '../components/playlistHelpers.tsx';
import { GetGlobalActivityStore } from '../components/activityStore.tsx';
import { playlistWithAward, comingSoonPage } from '../components/awardUtils.tsx';
import {TradeEmailDataSection, TradeNameDataSection } from '../components/tradeDataSection.jsx';
import IncentivesSection from '../components/incentives.tsx';
import { coinUnlockModalItem } from '../components/coinUnlockModalItem.jsx';
import QuizSection from '../components/quiz.jsx';
import Layout from '../components/Layout.jsx';

// tiles:
import hab from '../images/tiles/hab.svg'
import flashlight from '../images/tiles/flashlight.svg'
import zest from '../images/tiles/zest.svg'
import subway from '../images/tiles/subway.svg'
import stacks from '../images/tiles/stacks.svg'
import rwr from '../images/tiles/rwr.svg'
import babynames from '../images/tiles/babynames.svg'
import table from '../images/tiles/table.svg'
import instagrade from '../images/tiles/instagrade.svg'
import content from '../images/tiles/content.svg'
import { withPrefix } from 'gatsby-link';

interface IndexState {
	playlist?: ModalPlaylist;
}

export default class IndexPage extends React.Component<{}, IndexState> {
  activityStore: any;
  cancelActivityStoreListener?: () => void;

	constructor(props: any) {
		super(props);
		this.activityStore = GetGlobalActivityStore();
		this.state = {};
	}
	componentDidMount() {
		this.cancelActivityStoreListener = this.activityStore.changeAnnouncer.listen(() => {
			this.forceUpdate();
		});
	}
	componentWillUnmount() {
		if (this.cancelActivityStoreListener) {
			this.cancelActivityStoreListener();
			this.cancelActivityStoreListener = undefined;
		}
	}
	playWithRewards(awardId: string, items: (ModalItem | undefined)[], options?: any) {
		// filter out undefined in `items` since web() may return null:
		const items2 = items.filter(item => !!item) as ModalItem[];
		
		let onDismiss = () => this.setState({playlist: undefined});
		let playlist = playlistWithAward(awardId, items2, this.activityStore, onDismiss, options);
		if (playlist.items.length === 0) {
			return;
		}
		this.setState({ playlist });
	}
	playPlaylist(playlist: any) {
		this.setState({ playlist });
	}
	render() {
		return (
		<Layout>
			<div className='index-page'>
					<ModalPlayer playlist={this.state.playlist} onDone={() => this.setState({playlist: undefined})} />
				
					<div className='intro' onClick={() => this.setState({playlist: new ModalPlaylist([coinUnlockModalItem(() => {}, false)])})}>
						<img className='readable-width' src={intro} alt="Nate Parrott dot com: developer, designer and gamification enthusiast." />
					</div>

					<div className='readable-width boxed-content workflow section'>
						<h3>How this site works</h3>
						<img src={workflow} alt="Consume content, earn points, get exclusive experiences!" />
					</div>

					<div className='readable-width section'>
						<h3>Recent work!<div className='tooltip'>1 point per click</div></h3>
						<div className='content-tiles'>
							<Tile src={zest} alt="Designing Arc" onClick={ () => this.playWithRewards('arc', [ web(withPrefix('/arc/index.html')) ], {category: 'content'}) } />
							<Tile src={zest} alt="Arc Max: AI in Arc" onClick={ () => this.playWithRewards('max', [ web(withPrefix('/arc-max/index.html')) ], {category: 'content'}) } />
							<Tile src={zest} alt="Arc Boosts: Edit the web" onClick={ () => this.playWithRewards('boosts', [ web(withPrefix('/arc-boosts/index.html')) ], {category: 'content'}) } />	
							<Tile src={zest} alt="A more personal news feed" onClick={ () => this.playWithRewards('feeeed', [ web('https://feeeed.nateparrott.com/') ], {category: 'content'}) } />
						</div>
					</div>

					<div className='cashcash section'>
						<div className='bg' />
						<div className='readable-width'>
							<h3>Exclusive unlockable content!</h3>
							<IncentivesSection activityStore={this.activityStore} playPlaylist={this.playPlaylist.bind(this)} />
						</div>
					</div>

					<div className='readable-width section'>
						<h3>Learn about <span className='nowrap'>things I’ve made! <div className='tooltip'>1 point per click</div></span></h3>
						<div className='content-tiles'>
							<Tile src={hab} alt="Design and branding for a beginner-friendly hackathon" onClick={ () => this.playWithRewards('hab', [ web(withPrefix('/hab/index.html')) ], {category: 'content'}) } />
							<Tile src={flashlight} alt="A popular natural-language interface to Mac OS" onClick={ () => this.playWithRewards('flashlight', [ web(withPrefix('/flashlight/index.html')) ], {category: 'content'}) } />
							<Tile src={instagrade} alt="An app that grades paper quizzes instantly" onClick={ () => this.playWithRewards('instagrade', [ web(withPrefix('/instagrade/index.html')) ], {category: 'content'}) } />	
							<Tile src={zest} alt="A spice rack powered by computer vision" onClick={ () => this.playWithRewards('zest', [ web('http://zest.nateparrott.com/') ], {category: 'content'}) } />
						</div>
					</div>

					<div className='readable-width section'>
						<h3>Why not <span className='nowrap'>consume more content? <div className='tooltip'>5 coins per click</div></span></h3>
							
						<div className='content-tiles'>
							<Tile src={table} alt="An augmented-reality table prototype" onClick={ () => this.playWithRewards('table', [ web('http://table.nateparrott.com/') ]) } />
							<Tile src={subway} alt="An subway map that visualizes travel time" onClick={ () => this.playWithRewards('subway', [ web('http://subway.nateparrott.com/') ]) } />
						</div>
					</div>

					<TradeNameDataSection activityStore={this.activityStore} />	

					<div className='trophies section'>
						<div className='bg' />
						<div className='readable-width'>
							<h3>Why not earn some trophies??</h3>
							<Trophies activityStore={this.activityStore} playWithRewards={this.playWithRewards.bind(this)} />
						</div>
					</div>
					<div className='readable-width section'>
						<h3>There’s so <span className='nowrap'>much rewarding content!<div className='tooltip'>5 coins per click</div></span></h3>
						<div className='content-tiles'>
							<Tile src={content} alt="An app for creating exciting animations" onClick={ () => this.playWithRewards('content', [ web('http://content.nateparrott.com/') ], {category: 'content'}) } />
							<Tile src={stacks} alt="An app for making your own social network" onClick={ () => this.playWithRewards('stacks', [ web(withPrefix('/stacks/index.html')) ], {category: 'content'}) } />
						</div>
					</div>
					<QuizSection activityStore={this.activityStore} />
					<div className='readable-width section'>
						<h3><span className='nowrap'>Read more!<div className='tooltip'>5 coins per click</div></span></h3>
						<div className='content-tiles'>
							<Tile src={rwr} alt="An online vocabulary workbook based on hip-hop lyrics" onClick={ () => this.playWithRewards('rwr', [ comingSoonPage() ], {category: 'content'}) } />
							<Tile src={babynames} alt="A neural network for generating new baby names" onClick={ () => this.playWithRewards('names', [ web(withPrefix('/names/index.html')) ], {category: 'content'}) } />
						</div>
					</div>
					<TradeEmailDataSection activityStore={this.activityStore} />
					<div className='readable-width section footer'>
							October 2018. Made with <a href='https://www.gatsbyjs.org/'>Gatsby</a> and React. <a href='.' onClick={this.reset.bind(this)}>Reset</a> Thanks for reading!
					</div>
			</div>
		  </Layout>
		)
	}
	reset() {
		this.activityStore.unsave();
	}
}

interface TileProps {
	src: string;
	alt?: string;
	onClick: () => void;
}
let Tile = ({src, alt, onClick}: TileProps) => (
	<div className='tile hover-offset' style={{backgroundImage: `url(${src})`}} aria-label={alt} onClick={onClick} />
)

// const container = document.getElementById('app');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript

// if (container.children.length > 0) {
// 	hydrateRoot(container, <IndexPage />);
// } else {
// 	root.render(<IndexPage />);
// }
