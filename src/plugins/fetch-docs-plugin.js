const got = require('got');

const createPlugin = require('./plugin-factory');

const defaultOptions = {
	failOnError: true,
	failOnMissingDocsProperty: false,
	logger: console
};

module.exports = (options = {}) => createPlugin('fetch-docs', async rule => {
	const opt = {
		...defaultOptions,
		options
	};

	if (rule && rule.docs && rule.docs.url) {
		try {
			const {body} = await got(rule.docs.url);

			console.log(body);

			return {
				...rule,
				docs: {
					content: body
				}
			};
		} catch (error) {
			if (opt.failOnError) {
				throw error;
			}

			opt.logger.log(`Could not fetch rule '${rule.name}' documentation from '${rule.docs.url}'.`, error);
			return rule;
		}
	}

	if (opt.failOnMissingDocsProperty) {
		throw new Error(`Rule '${rule.name}' doesn't have the docs.url value.`);
	}

	return rule;
});
