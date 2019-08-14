const {noop} = require('./testutils');
const {
	hasRequiredProperties,
	isFunction,
	isNullOrUndefined,
	isString
} = require('./utils');

describe('Utils function tests', () => {
	describe('isNullOrUndefined', () => {
		it('should return true on null', () => {
			expect(isNullOrUndefined(null)).toStrictEqual(true);
		});

		it('should return true on undefined', () => {
			expect(isNullOrUndefined()).toStrictEqual(true);
		});

		it('should return false on blank string', () => {
			expect(isNullOrUndefined('')).toStrictEqual(false);
		});

		it('should return false on 0', () => {
			expect(isNullOrUndefined(0)).toStrictEqual(false);
		});

		it('should return false on booleans', () => {
			expect(isNullOrUndefined(true)).toStrictEqual(false);
			expect(isNullOrUndefined(false)).toStrictEqual(false);
		});

		it('should return false on empty array', () => {
			expect(isNullOrUndefined([])).toStrictEqual(false);
		});

		it('should return false on empty object', () => {
			expect(isNullOrUndefined({})).toStrictEqual(false);
		});

		it('should return false on function', () => {
			expect(isNullOrUndefined(noop)).toStrictEqual(false);
		});
	});

	describe('isFunction', () => {
		it('should return false on null', () => {
			expect(isFunction(null)).toStrictEqual(false);
		});

		it('should return false on undefined', () => {
			expect(isFunction()).toStrictEqual(false);
		});

		it('should return false on blank string', () => {
			expect(isFunction('')).toStrictEqual(false);
		});

		it('should return false on 0', () => {
			expect(isFunction(0)).toStrictEqual(false);
		});

		it('should return false on booleans', () => {
			expect(isFunction(true)).toStrictEqual(false);
			expect(isFunction(false)).toStrictEqual(false);
		});

		it('should return false on empty array', () => {
			expect(isFunction([])).toStrictEqual(false);
		});

		it('should return false on empty object', () => {
			expect(isFunction({})).toStrictEqual(false);
		});

		it('should return true on function', () => {
			expect(isFunction(noop)).toStrictEqual(true);
		});

		it('should return true on class', () => {
			expect(isFunction(class Test {})).toStrictEqual(true);
		});
	});

	describe('isString', () => {
		it('should return false on null', () => {
			expect(isString(null)).toStrictEqual(false);
		});

		it('should return false on undefined', () => {
			expect(isString()).toStrictEqual(false);
		});

		it('should return true on blank string', () => {
			expect(isString('')).toStrictEqual(true);
		});

		it('should return false on 0', () => {
			expect(isString(0)).toStrictEqual(false);
		});

		it('should return false on booleans', () => {
			expect(isString(true)).toStrictEqual(false);
			expect(isString(false)).toStrictEqual(false);
		});

		it('should return false on empty array', () => {
			expect(isString([])).toStrictEqual(false);
		});

		it('should return false on empty object', () => {
			expect(isString({})).toStrictEqual(false);
		});

		it('should return false on function', () => {
			expect(isString(noop)).toStrictEqual(false);
		});
	});

	describe('hasRequiredProperties', () => {
		it('should throw on missing keys', () => {
			expect(() => hasRequiredProperties(null)).toThrowError('Expected at least 1 required property, but received none.');
		});

		it('should return false on null', () => {
			expect(hasRequiredProperties(null, 'aKey')).toStrictEqual(false);
		});

		it('should return false on undefined', () => {
			expect(hasRequiredProperties(undefined, 'aKey')).toStrictEqual(false);
		});

		it('should return false on a missing key', () => {
			expect(hasRequiredProperties({bKey: 1}, 'aKey')).toStrictEqual(false);
		});

		it('should return true when all keys are present', () => {
			const obj = {aKey: 'a', bKey: 1, 2: 3};
			expect(hasRequiredProperties(obj, 'aKey')).toStrictEqual(true);
			expect(hasRequiredProperties(obj, 'aKey', 'bKey', 2)).toStrictEqual(true);
		});
	});
});
