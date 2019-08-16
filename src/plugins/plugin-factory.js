const {isFunction, isNullOrUndefined, isString} = require('../utils');

const createPlugin = (id, handler) => {
	if (isNullOrUndefined(id)) {
		throw new Error('Plugin id must be specified.');
	}

	if (!isString(id)) {
		throw new TypeError(`Plugin id must be of type 'string', but received '${typeof id}'.`);
	}

	if (isNullOrUndefined(handler)) {
		throw new Error('Plugin handler function must be specified.');
	}

	if (!isFunction(handler)) {
		throw new TypeError(`Plugin handler must be of type 'function', but received '${typeof handler}'.`);
	}

	const plugin = (() => handler)();

	plugin.handler = handler;
	plugin.id = id;

	return Object.freeze(plugin);
};

module.exports = createPlugin;
