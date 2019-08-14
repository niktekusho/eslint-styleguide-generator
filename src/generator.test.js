const Generator = require('./generator');

const {LoggerMock} = require('./testutils');

describe('Generator tests', () => {
	it('should log run', () => {
		const logger = new LoggerMock();

		const generator = new Generator({logger});
		generator.run();

		expect(logger.logOps[0].args[0]).toStrictEqual('Run');
	});
});
