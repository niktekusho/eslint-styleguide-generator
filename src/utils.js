const isNullOrUndefined = obj => obj === undefined || obj === null;

const isString = obj => typeof obj === 'string';

const isFunction = obj => typeof obj === 'function';

const hasRequiredProperties = (target, ...keys) => {
	if (keys.length === 0) {
		throw new Error('Expected at least 1 required property, but received none.');
	}

	if (isNullOrUndefined(target)) {
		return false;
	}

	for (const key of keys) {
		if (isNullOrUndefined(target[key])) {
			return false;
		}
	}

	return true;
};

module.exports = {
	hasRequiredProperties,
	isFunction,
	isNullOrUndefined,
	isString
};
