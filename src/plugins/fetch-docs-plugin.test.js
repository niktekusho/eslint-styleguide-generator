const {sampleRules} = require('../testutils');
const fetchDocsPlugin = require('./fetch-docs-plugin');

describe('Fetch rule\'s document plugin test', () => {
	describe('using the default options', () => {
		const fetchDocs = fetchDocsPlugin();

		it('should return the same object if the rule has no property at `rule.docs.url`', async () => {
			expect(await fetchDocs()).toStrictEqual(undefined);
			expect(await fetchDocs({docs: null})).toStrictEqual({docs: null});
			expect(await fetchDocs({docs: {description: 'something'}})).toStrictEqual({docs: {description: 'something'}});
		});

		it('should return the same object with the `rule.docs.content` property if the rule has a valid value at `rule.docs.url`', async () => {
			const rule = sampleRules[0];
			const expectedRule = {
				...rule,
				docs: {
					content: 'todo'
				}
			};
			await fetchDocs(rule);
			// expect().toStrictEqual(expectedRule);
		});
	});
});
