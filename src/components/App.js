import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import youtube from './apis/youtube';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.onTermSubmit = this.onTermSubmit.bind(this);
		this.state = {
			videos: [],
			selectedVideo: null
		}
	}

	async onTermSubmit(term) {
		const response = await youtube.get('/search', {
			params: {
				// q = query, term = word user puts in input
				q: term
			}
		});

		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0]
		});
	}

	componentDidMount() {
		// application first loads, first loads results when you search "Youtube"
		this.onTermSubmit('Youtube');
	}

	onVideoSelect = (video) => {
		this.setState({
			selectedVideo: video
		});
	}

	render() {
		return (
			<div className="ui container">
				<SearchBar onFormSubmit={ this.onTermSubmit } />
				<div className="ui grid">
					<div className="ui row">
						<div className="eleven wide column">
							<VideoDetail video={ this.state.selectedVideo }/>
						</div>
						<div className="five wide column">
							<VideoList
								onVideoSelect={ this.onVideoSelect }
								videos={ this.state.videos }
							/>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

export default App;
