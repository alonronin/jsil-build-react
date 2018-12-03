import { updateDomProperties } from './';

const TEXT_ELEMENT = 'TEXT ELEMENT';

export function instantiate(element) {
	const { type, props } = element;
	const isDomElement = typeof type === 'string';

	if (isDomElement) {
		// Instantiate DOM element
		const isTextElement = type === TEXT_ELEMENT;
		const dom = isTextElement
			? document.createTextNode('')
			: document.createElement(type);

		updateDomProperties(dom, [], props);

		const children = props.children || [];
		const childInstances = children.map(instantiate);
		const childDoms = childInstances.map(childInstance => childInstance.dom);

		childDoms.forEach(childDom => dom.appendChild(childDom));

		return { dom, element, childInstances };
	} else {
		// Instantiate component element
		const instance = {};
		const publicInstance = createPublicInstance(element, instance);
		const childElement = publicInstance.render();
		const childInstance = instantiate(childElement);
		const dom = childInstance.dom;

		Object.assign(instance, { dom, element, childInstance, publicInstance });
		return instance;
	}
}

function createPublicInstance(element, internalInstance) {
	const { type, props } = element;
	const publicInstance = new type(props);

	publicInstance.__internalInstance = internalInstance;

	return publicInstance;
}
