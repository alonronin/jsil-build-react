import { reconcile } from './reconcile';

let rootInstance = null;

export function render(element, container) {
	rootInstance = reconcile(container, rootInstance, element);
}

export function updateDomProperties(dom, prevProps, nextProps) {
	const isEvent = name => name.startsWith('on');
	const isAttribute = name => !isEvent(name) && name !== 'children';

	for(const [name, value] of Object.entries(prevProps)) {
		if(isEvent(name)) {
			const eventType = name.toLowerCase().replace(/^on/, '');
			dom.removeEventListener(eventType, value);
		}

		if(isAttribute(name)) {
			dom[name] = null;
		}
	}

	for(const [name, value] of Object.entries(nextProps)) {
		if(isEvent(name)) {
			const eventType = name.toLowerCase().replace(/^on/, '');
			dom.addEventListener(eventType, value);
		}

		if(isAttribute(name)) {
			dom[name] = value;
		}
	}
}
