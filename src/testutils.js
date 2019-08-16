const noop = () => {};

class LoggerMock {
	constructor() {
		this.ops = [];
	}

	log(...args) {
		this.ops.push({
			type: 'log',
			args
		});
	}

	get logOps() {
		return this.ops.filter(op => op.type === 'log');
	}

	warn(...args) {
		this.ops.push({
			type: 'warn',
			args
		});
	}

	get warnOps() {
		return this.ops.filter(op => op.type === 'warn');
	}

	error(...args) {
		this.ops.push({
			type: 'error',
			args
		});
	}

	get errorOps() {
		return this.ops.filter(op => op.type === 'error');
	}
}

class CLIEngineMock {
	constructor(rules = [], ...args) {
		this.initArgs = args;
		this.rules = rules;
	}

	executeOnText(...args) {
		this.executeOnTextArgs = args;
	}

	getRules() {
		return this.rules;
	}
}

const sampleRules = [
	{
		name: 'accessor-pairs',
		type: 'suggestion',
		docs: {
			description: 'enforce getter and setter pairs in objects',
			category: 'Best Practices',
			recommended: false,
			url: 'https://eslint.org/docs/rules/accessor-pairs'
		},
		schema: [
			{
				type: 'object',
				properties: {
					getWithoutSet: {
						type: 'boolean',
						default: false
					},
					setWithoutGet: {
						type: 'boolean',
						default: true
					}
				},
				additionalProperties: false
			}
		],
		messages: {
			getter: 'Getter is not present.',
			setter: 'Setter is not present.'
		}
	}
];

module.exports = {
	CLIEngineMock,
	LoggerMock,
	noop,
	sampleRules
};
