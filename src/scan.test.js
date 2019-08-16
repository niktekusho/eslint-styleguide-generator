const scan = require('./scan');
const {CLIEngineMock} = require('./testutils');

const defaultESLintRulesCount = 266;

describe('Scanner tests', () => {
	it('creating a scanner without an instance of CLIEngine and an instance of the engine configuration should throw', () => {
		expect(() => scan()).toThrowError('You have to specify an ESLint engine instance or a configuration object for it.');
	});

	it('creating a scanner with an instance of the CLIEngine should return the rules picked up by it', () => {
		const engine = new CLIEngineMock();

		expect(scan({engine})).toHaveLength(0);
		expect(engine.executeOnTextArgs).toStrictEqual(['']);
	});

	it('creating a scanner with the configuration options and without the engine should create a new CLIEngine', () => {
		expect(scan({engineConfig: {rules: {}, useEslintRc: false}})).toHaveLength(defaultESLintRulesCount);
	});

	it('wrong configuration options should throw directly from ESLint', () => {
		const msg = `ESLint configuration in CLIOptions is invalid:
	- Property "rules" is the wrong type (expected object but got \`[]\`).
`;
		expect(() => scan({engineConfig: {rules: []}})).toThrowError(msg);
	});
});
