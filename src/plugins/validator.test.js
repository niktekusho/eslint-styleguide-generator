const {LoggerMock, noop} = require('../testutils');
const validate = require('./validator');

const missingIdMsg = 'Plugin id must be specified.';
const nullOrUndefinedPluginMsg = 'Plugin can either be an object or a function. It cannot be null or undefined.';
const missingHandlerMsg = 'Plugin with id \'test\' is missing the handler function.';

describe('Validate Plugin function tests', () => {
	describe('when the options argument is missing', () => {
		it('should throw if the plugin is null or undefined', () => {
			expect(() => validate()).toThrowError(nullOrUndefinedPluginMsg);
			expect(() => validate(null)).toThrowError(nullOrUndefinedPluginMsg);
		});

		it('should throw if the plugin is missing the \'id\' property', () => {
			expect(() => validate({})).toThrowError(missingIdMsg);
		});

		it('should throw if the plugin is missing the \'handler\' property', () => {
			expect(() => validate({id: 'test'})).toThrowError(missingHandlerMsg);
		});

		it('should return true if the plugin is formally correct', () => {
			expect(validate({id: 'test', handler: noop})).toStrictEqual(true);
		});
	});

	describe('when the options argument is defined', () => {
		it('should throw if it does not have the logger property', () => {
			expect(() => validate(null, {})).toThrowError(nullOrUndefinedPluginMsg);
		});

		it('should throw if it does not have the logger property', () => {
			expect(() => validate(null, {logger: new LoggerMock()})).toThrowError(nullOrUndefinedPluginMsg);
		});

		it('should throw if it does have the logger and strict is true', () => {
			expect(() => validate(null, {logger: new LoggerMock(), strict: true})).toThrowError(nullOrUndefinedPluginMsg);
		});

		describe('and strict is turned off', () => {
			it('should return false if the plugin is null or undefined and log messages on the warn level', () => {
				const logger = new LoggerMock();

				expect(validate(undefined, {logger, strict: false})).toStrictEqual(false);
				expect(validate(null, {logger, strict: false})).toStrictEqual(false);

				expect(logger.warnOps.length).toStrictEqual(2);
				expect(logger.warnOps[0]).toStrictEqual(logger.warnOps[1]);
			});

			it('should return false if the plugin is missing the \'id\' property and log messages on the warn level', () => {
				const logger = new LoggerMock();

				expect(validate({}, {logger, strict: false})).toStrictEqual(false);
				expect(logger.warnOps.length).toStrictEqual(1);
				expect(logger.warnOps[0].args[0]).toStrictEqual(missingIdMsg);
			});

			it('should return false if the plugin is missing the \'handler\' property and log messages on the warn level', () => {
				const logger = new LoggerMock();

				expect(validate({id: 'test'}, {logger, strict: false})).toStrictEqual(false);
				expect(logger.warnOps.length).toStrictEqual(1);
				expect(logger.warnOps[0].args[0]).toStrictEqual(missingHandlerMsg);
			});
		});
	});
});
