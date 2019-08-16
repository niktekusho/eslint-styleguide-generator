const {CLIEngine} = require('eslint');

const {isNullOrUndefined} = require('./utils');

const defaultOptions = {
	engine: null
};

const scan = (options = {}) => {
	const opts = {
		...defaultOptions,
		...options
	};

	const useNewEngine = isNullOrUndefined(opts.engine);

	if (useNewEngine && isNullOrUndefined(opts.engineConfig)) {
		throw new Error('You have to specify an ESLint engine instance or a configuration object for it.');
	}

	// TODO: here we create a new engine everytime if the user does not give it to us. Should we cache the engine?
	const engine = useNewEngine ? new CLIEngine(opts.engineConfig) : opts.engine;

	// Run ESLint so that it lazy loads its configuration
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
};

module.exports = scan;
