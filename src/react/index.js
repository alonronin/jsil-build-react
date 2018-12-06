import { updateInstance } from '../react-dom/reconcile';

const TEXT_ELEMENT = 'TEXT ELEMENT';

function createElement(type, config, ...args) {
	const props = Object.assign({}, config);
	const hasChildren = args.length > 0;
	const rawChildren = hasChildren ? [].concat(...args) : [];

	props.children = rawChildren
		.filter(c => c != null && c !== false)
		.map(c => c instanceof Object ? c : createTextElement(c));
	return { type, props };
}

function createTextElement(value) {
	return createElement(TEXT_ELEMENT, { nodeValue: value });
}

export class Component {
	constructor(props) {
		this.props = props;
		this.state = this.state || {};
	}

	setState(partialState) {
		this.state = {...this.state, ...partialState};
		updateInstance(this.__internalInstance);
	}
}

const React = {
	createElement,
	Component
};

export default React;
