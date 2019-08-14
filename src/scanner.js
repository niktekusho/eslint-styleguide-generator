const {CLIEngine} = require('eslint');

const {isNullOrUndefined} = require('./utils');

const defaultOptions = {
	engine: null
};

class Scanner {
	constructor(options = {}) {
		this.options = {
			...defaultOptions,
			...options
		};

		if (isNullOrUndefined(this.options.engine) && isNullOrUndefined(this.options.engineConfig)) {
			throw new Error('You have to specify an ESLint engine instance or a configuration object for it.');
		}
	}

	scan() {
		// TODO: here we create a new engine everytime if the user does not give it to us. Should we cache the engine?
		const engine = isNullOrUndefined(this.options.engine) ? new CLIEngine(this.options.engineConfig) : this.options.engine;

		// Run eslint so that it lazy loads the configurations
		engine.executeOnText('');

		// Now that engine.getRules() has picked up the rules, create an array of with the name of the rule and the 'meta' property
		const rules = [];
		for (const [name, {meta}] of engine.getRules()) {
			rules.push({
				name,
				...meta
			});
		}

		return rules;
	}
}

module.exports = Scanner;
