import React, { Component } from './react';

class Framework extends Component {
	constructor(props) {
		super(props);
		this.state = { likes: Math.ceil(Math.random() * 100) };
	}
	like() {
		this.setState({
			likes: this.state.likes + 1
		});
	}

	render() {
		const { name, url, title } = this.props;
		const { likes } = this.state;
		return (
			<li>
				<button onClick={e => this.like()}><span>{likes}</span><span>❤️</span></button>
				<a href={url}><b>{name}</b> - {title}</a>
			</li>
		);
	}
}

export default Framework;
