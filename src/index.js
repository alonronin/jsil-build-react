import React from './react';
import { render } from './react-dom';

import './style';
import App from './App';

const frameworks = [
	{ name: 'React', title: 'A JavaScript library for building user interfaces', url: 'https://reactjs.org/' },
	{ name: 'Angular ', title: 'One framework. Mobile & desktop.', url: 'https://angular.io/' },
	{ name: 'Vue', title: 'The Progressive JavaScript Framework', url: 'https://vuejs.org/' },
	{ name: 'SlimJS', title: 'Fast & Robust Front-End Micro-framework based on modern standards', url: 'http://slimjs.com' },
	{ name: 'AngularJS', title: 'Superheroic JavaScript MVW Framework', url: 'https://angularjs.org/' }
];

render(<App frameworks={frameworks} />, document.body);
