import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBxO7iWz-h536C8CuHoROkufbumqKf3PsI';

//Create a new component. Component should produce some HTML
class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null 
		};
		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term}, videos => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
			// evaluates to --> this.setState({videos: videos})
			// only works when key and property are the same name
		});

	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);	

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
					//onVideoSelect uses a callback with video_list.js then video_list_item.js
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
