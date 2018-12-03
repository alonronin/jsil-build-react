import { reconcile } from './reconcile';

let rootInstance = null;

export function render(element, container) {
	rootInstance = reconcile(container, rootInstance, element);
}

export function updateDomProperties(dom, prevProps, nextProps) {
	const isEvent = name => name.startsWith('on');
	const isAttribute = name => !isEvent(name) && name !== 'children';

	// Remove event listeners
	Object.keys(prevProps).filter(isEvent).forEach(name => {
		const eventType = name.toLowerCase().replace(/^on/, '');
		dom.removeEventListener(eventType, prevProps[name]);
	});

	// Remove attributes
	Object.keys(prevProps).filter(isAttribute).forEach(name => {
		dom[name] = null;
	});

	// Set attributes
	Object.keys(nextProps).filter(isAttribute).forEach(name => {
		dom[name] = nextProps[name];
	});

	// Add event listeners
	Object.keys(nextProps).filter(isEvent).forEach(name => {
		const eventType = name.toLowerCase().substring(2);
		dom.addEventListener(eventType, nextProps[name]);
	});
}
