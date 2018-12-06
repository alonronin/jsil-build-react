import { instantiate } from './instance';
import { updateDomProperties } from './';

export function reconcile(parentDom, instance, element) {
	if (instance === null) {
		const newInstance = instantiate(element);

		parentDom.appendChild(newInstance.dom);

		return newInstance;
	} else if (element === null) {
		parentDom.removeChild(instance.dom);

		return null;
	} else if (instance.element.type !== element.type) {
		const newInstance = instantiate(element);

		parentDom.replaceChild(newInstance.dom, instance.dom);

		return newInstance;
	} else if (typeof element.type === 'string') {
		updateDomProperties(instance.dom, instance.element.props, element.props);
		instance.childInstances = reconcileChildren(instance, element);
		instance.element = element;
		return instance;
	} else {
		instance.publicInstance.props = element.props;
		const childElement = instance.publicInstance.render();
		const oldChildInstance = instance.childInstance;
		const childInstance = reconcile(
			parentDom,
			oldChildInstance,
			childElement
		);

		instance.dom = childInstance.dom;
		instance.childInstance = childInstance;
		instance.element = element;

		return instance;
	}
}

function reconcileChildren(instance, element) {
	const dom = instance.dom;
	const childInstances = instance.childInstances;
	const nextChildElements = element.props.children || [];
	const newChildInstances = [];
	const count = Math.max(childInstances.length, nextChildElements.length);

	for (let i = 0; i < count; i++) {
		const childInstance = childInstances[i];
		const childElement = nextChildElements[i];
		const newChildInstance = reconcile(dom, childInstance, childElement);
		newChildInstances.push(newChildInstance);
	}

	return newChildInstances.filter(instance => instance !== null);
}

export function updateInstance(internalInstance) {
	const parentDom = internalInstance.dom.parentNode;
	const element = internalInstance.element;

	reconcile(parentDom, internalInstance, element);
}
