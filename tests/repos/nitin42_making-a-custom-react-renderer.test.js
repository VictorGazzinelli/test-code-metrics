const { extractFromSource } = require('../../src/extractor');

describe('nitin42_making-a-custom-react-renderer', () => {
    it('nitin42_making-a-custom-react-renderer\\__tests__\\Text.test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ Text \} from '../src/';
			import render from '../src/testRenderer';
			
			it('sanity check', () => \{
			  const App = () => <Text>Hello World!</Text>;
			  expect(render(<App />)).toMatchSnapshot();
			\});
			
			it('should render the children', () => \{
			  const App = () => (
			    <Text>Hello ! This is a test for rendering the children!</Text>
			  );
			
			  expect(render(<App />)).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'nitin42_making-a-custom-react-renderer\\__tests__\\Text.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
});
