const {isNullOrUndefined, isFunction} = require('../utils');

const shouldThrow = options => isNullOrUndefined(options) ||
	isNullOrUndefined(options.logger) ||
	isNullOrUndefined(options.strict) ||
	options.strict;

/**
 * Validate the specified plugin.
 *
 * @param {object|function} plugin Plugin object or function
 * @param {object} options Validator function options.
 * @returns {boolean} true if the plugin is valid, false otherwise.
 */
module.exports = (plugin, options) => {
	// Throw when options is not specified or strict is truthy
	const errHandler = shouldThrow(options) ? msg => {
		throw new Error(msg);
	} : msg => options.logger.warn(msg);

	if (isNullOrUndefined(plugin)) {
		errHandler('Plugin can either be an object or a function. It cannot be null or undefined.');
		return false;
	}

	if (isNullOrUndefined(plugin.id)) {
		errHandler('Plugin id must be specified.');
		return false;
	}

	if (!isFunction(plugin.handler)) {
		errHandler(`Plugin with id '${plugin.id}' is missing the handler function.`);
		return false;
	}

	return true;
};
