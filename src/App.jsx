import React, { Component } from './react';
import Framework from './Framework';

class App extends Component {
	render() {
		const { frameworks } = this.props;

		return (
			<div>
				<h1>Which Framework / Library do you Like the best?</h1>
				<ul>
					{frameworks.map(({ name, url, title }) => {
						return <Framework name={name} url={url} title={title} />;
					})}
				</ul>
			</div>
		);
	}
}

export default App;
