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

module.exports = {
	LoggerMock,
	noop
};
