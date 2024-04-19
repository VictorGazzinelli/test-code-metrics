const { extractFromSource } = require('../../src/extractor');

describe('geekyants_react-native-easy-grid', () => {
    it('geekyants_react-native-easy-grid\\Components\\_tests_\\Col.test.js', () => {
        const sourceCode = `
			import "react-native";
			import React from "react";
			import Col from "../Col";
			import renderer from "react-test-renderer";
			
			test("renders correctly", () => \{
			  const tree = renderer.create(<Col />).toJSON();
			  expect(tree).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'geekyants_react-native-easy-grid\\Components\\_tests_\\Col.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('geekyants_react-native-easy-grid\\Components\\_tests_\\Grid.test.js', () => {
        const sourceCode = `
			import "react-native";
			import React from "react";
			import Grid from "../Grid";
			import renderer from "react-test-renderer";
			
			test("renders correctly", () => \{
			  const tree = renderer.create(<Grid />).toJSON();
			  expect(tree).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'geekyants_react-native-easy-grid\\Components\\_tests_\\Grid.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('geekyants_react-native-easy-grid\\Components\\_tests_\\Row.test.js', () => {
        const sourceCode = `
			import "react-native";
			import React from "react";
			import Row from "../Row";
			import renderer from "react-test-renderer";
			
			test("renders correctly", () => \{
			  const tree = renderer.create(<Row />).toJSON();
			  expect(tree).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'geekyants_react-native-easy-grid\\Components\\_tests_\\Row.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
});
