const { extractFromSource } = require('../../src/extractor');

describe('reactjsresources_react-webpack-babel', () => {
    it('reactjsresources_react-webpack-babel\\src\\__tests__\\app.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ configure, shallow \} from 'enzyme';
			import Adapter from 'enzyme-adapter-react-16';
			import \{ App \}  from '../app';
			
			configure(\{ adapter: new Adapter() \});
			
			
			describe('app', () => \{
			  it('renders <App /> components', () => \{
			    const component = shallow(<App />);
			    expect(component).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'reactjsresources_react-webpack-babel\\src\\__tests__\\app.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
});
