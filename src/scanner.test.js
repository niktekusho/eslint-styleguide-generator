const {CLIEngine} = require('eslint');
// TODO: not very proud of this...
const {buildConfig} = require('xo/lib/options-manager');

const Scanner = require('./scanner');

describe('Scanner tests', () => {
	it('creating a scanner without an instance of CLIEngine and an instance of the engine configuration should throw', () => {
		expect(() => new Scanner()).toThrowError('You have to specify an ESLint engine instance or a configuration object for it.');
	});

	it('creating a scanner with an instance of the CLIEngine should return the rules picked up by it', () => {
		// We turn down esnext because for some reason it fails to load
		// Failed to load config "xo/esnext" to extend from. Referenced from: BaseConfig
		const currentProjectConfig = buildConfig({esnext: false});
		const engine = new CLIEngine(currentProjectConfig);
		const scanner = new Scanner({engine});
		console.log(scanner.scan());
	});
});
