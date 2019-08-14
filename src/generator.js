const defaultOptions = {
	/**
	 * Flag that signals the generator to throw an Error when encountering non-blocking issues
	 */
	strict: true,
	/**
	 * Logger object. Must provide .error, .warn and .log functions.
	 */
	logger: console
};

class Generator {
	constructor(options = {}) {
		this.options = {
			...defaultOptions,
			...options
		};

		this.plugins = {};
	}

	registerPlugins(...plugins) {
		this.options.logger.log(plugins);
	}

	run() {
		this.options.logger.log('Run');
	}
}

module.exports = Generator;
