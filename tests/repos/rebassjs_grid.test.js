const { extractFromSource } = require('../../src/extractor');

describe('rebassjs_grid', () => {
    it('rebassjs_grid\\tests\\emotion.js', () => {
        const sourceCode = `
			import React from 'react'
			import \{ create as render \} from 'react-test-renderer'
			import serializer from 'jest-emotion'
			import \{ Box, Flex \} from '../dist/emotion'
			
			expect.addSnapshotSerializer(serializer)
			
			const renderJSON = el => render(el).toJSON()
			
			// Box
			test('Box renders', () => \{
			  const json = renderJSON(<Box m=\{2\} px=\{3\} />)
			  expect(json).toMatchSnapshot()
			\})
			
			test('Box renders with props', () => \{
			  const json = renderJSON(<Box
			    m=\{[ 1, 2 ]\}
			    px=\{[ 1, 2 ]\}
			    width=\{1\}
			    flex='1 1 auto'
			    alignSelf='flex-start'
			  />)
			  expect(json).toMatchSnapshot()
			\})
			
			// Flex
			test('Flex renders', () => \{
			  const json = renderJSON(<Flex />)
			  expect(json).toMatchSnapshot()
			\})
			
			test('Flex renders with props', () => \{
			  const json = renderJSON(
			    <Flex
			      flexWrap='wrap'
			      flexDirection='column'
			      alignItems='center'
			      justifyContent='space-between'
			    />
			  )
			  expect(json).toMatchSnapshot()
			\})
			
			test('Flex renders with flexDirection prop', () => \{
			  const json = renderJSON(
			    <Flex
			      flexDirection='column'
			    />
			  )
			  expect(json).toMatchSnapshot()
			\})
			
			test('Flex renders with responsive props', () => \{
			  const json = renderJSON(
			    <Flex
			      flexWrap=\{[ 'wrap', 'nowrap' ]\}
			      flexDirection=\{[ 'column', 'row' ]\}
			      alignItems=\{[ 'stretch', 'center' ]\}
			      justifyContent=\{[ 'space-between', 'center' ]\}
			    />
			  )
			  expect(json).toMatchSnapshot()
			\})
			`

		const tests = extractFromSource(sourceCode, 'rebassjs_grid\\tests\\emotion.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('rebassjs_grid\\tests\\index.js', () => {
        const sourceCode = `
			import React from 'react'
			import \{ create as render \} from 'react-test-renderer'
			import \{ Box, Flex \} from '../src'
			import 'jest-styled-components'
			
			const renderJSON = el => render(el).toJSON()
			
			// Box
			test('Box renders', () => \{
			  const json = renderJSON(<Box m=\{2\} px=\{3\} />)
			  expect(json).toMatchSnapshot()
			\})
			
			test('Box renders with props', () => \{
			  const json = renderJSON(<Box
			    m=\{[ 1, 2 ]\}
			    px=\{[ 1, 2 ]\}
			    width=\{1\}
			    flex='1 1 auto'
			    alignSelf='flex-start'
			  />)
			  expect(json).toMatchSnapshot()
			  expect(json).toHaveStyleRule('width', '100%')
			  expect(json).toHaveStyleRule('flex', '1 1 auto')
			  expect(json).toHaveStyleRule('align-self', 'flex-start')
			  expect(json).toHaveStyleRule('margin', '4px')
			\})
			
			// Flex
			test('Flex renders', () => \{
			  const json = renderJSON(<Flex />)
			  expect(json).toMatchSnapshot()
			  expect(json).toHaveStyleRule('display', 'flex')
			\})
			
			test('Flex renders with props', () => \{
			  const json = renderJSON(
			    <Flex
			      flexWrap='wrap'
			      flexDirection='column'
			      alignItems='center'
			      justifyContent='space-between'
			    />
			  )
			  expect(json).toMatchSnapshot()
			  expect(json).toHaveStyleRule('flex-wrap', 'wrap')
			  expect(json).toHaveStyleRule('flex-direction', 'column')
			  expect(json).toHaveStyleRule('align-items', 'center')
			  expect(json).toHaveStyleRule('justify-content', 'space-between')
			\})
			
			test('Flex renders with flexDirection prop', () => \{
			  const json = renderJSON(
			    <Flex
			      flexDirection='column'
			    />
			  )
			  expect(json).toMatchSnapshot()
			  expect(json).toHaveStyleRule('flex-direction', 'column')
			\})
			
			test('Flex renders with responsive props', () => \{
			  const json = renderJSON(
			    <Flex
			      flexWrap=\{[ 'wrap', 'nowrap' ]\}
			      flexDirection=\{[ 'column', 'row' ]\}
			      alignItems=\{[ 'stretch', 'center' ]\}
			      justifyContent=\{[ 'space-between', 'center' ]\}
			    />
			  )
			  expect(json).toMatchSnapshot()
			\})
			
			test('Box accepts a css prop', () => \{
			  const json = renderJSON(
			    <Box
			      css=\{\{
			        outline: '4px solid red'
			      \}\}
			    />
			  )
			  expect(json).toMatchSnapshot()
			  expect(json).toHaveStyleRule('outline', '4px solid red')
			\})
			`

		const tests = extractFromSource(sourceCode, 'rebassjs_grid\\tests\\index.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
});
