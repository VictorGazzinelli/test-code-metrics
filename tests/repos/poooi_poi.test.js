const { extractFromSource } = require('../../src/extractor');

describe('poooi_poi', () => {
    it('poooi_poi\\lib\\__tests__\\utils.sepc.ts', () => {
        const sourceCode = `
			import \{ mergeConfig \} from '../utils'
			
			describe('config merging', () => \{
			  const defaultConfig = \{
			    single: true,
			    foo: 'bar',
			    year: 2018,
			    bits: [0, 1],
			    galaxy: \{
			      answer: 42,
			    \},
			  \}
			
			  it('returns new object', () => \{
			    expect(mergeConfig(defaultConfig, \{\})).not.toBe(defaultConfig)
			  \})
			
			  it('default config value is not the same type of that user config, use default configs value', () => \{
			    expect(mergeConfig(defaultConfig, \{\})).toEqual(defaultConfig)
			    expect(mergeConfig(defaultConfig, \{ galaxy: [42] \})).toEqual(defaultConfig)
			    expect(mergeConfig(defaultConfig, \{ galaxy: null \})).toEqual(defaultConfig)
			    expect(mergeConfig(defaultConfig, \{ bits: '0' \})).toEqual(defaultConfig)
			    expect(mergeConfig(defaultConfig, \{ year: '0' \})).toEqual(defaultConfig)
			    expect(mergeConfig(defaultConfig, \{ foo: 42 \})).toEqual(defaultConfig)
			    expect(mergeConfig(defaultConfig, \{ single: 10 \})).toEqual(defaultConfig)
			  \})
			
			  it('value of correct type in user config is honored', () => \{
			    expect(mergeConfig(defaultConfig, \{ galaxy: \{ answer: -1 \} \})).toEqual(\{
			      ...defaultConfig,
			      galaxy: \{ answer: -1 \},
			    \})
			    expect(mergeConfig(defaultConfig, \{ bits: ['lll'] \})).toEqual(\{
			      ...defaultConfig,
			      bits: ['lll'],
			    \})
			    expect(mergeConfig(defaultConfig, \{ year: 999 \})).toEqual(\{ ...defaultConfig, year: 999 \})
			    expect(mergeConfig(defaultConfig, \{ foo: 'tanaka' \})).toEqual(\{
			      ...defaultConfig,
			      foo: 'tanaka',
			    \})
			    expect(mergeConfig(defaultConfig, \{ single: false \})).toEqual(\{
			      ...defaultConfig,
			      single: false,
			    \})
			  \})
			
			  it('other user config values exist in result', () => \{
			    expect(mergeConfig(defaultConfig, \{ chi: 'ba' \})).toEqual(\{ ...defaultConfig, chi: 'ba' \})
			    expect(mergeConfig(defaultConfig, \{ galaxy: \{ chi: 'ba' \} \})).toEqual(\{
			      ...defaultConfig,
			      galaxy: \{ ...defaultConfig.galaxy, chi: 'ba' \},
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'poooi_poi\\lib\\__tests__\\utils.sepc.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
		expect(assertions).toBe(15)
    });
    it('poooi_poi\\views\\redux\\info\\__tests__\\airbase.spec.ts', () => {
        const sourceCode = `
			import \{ reducer \} from '../airbase'
			
			// FIXME: cannot find a good fixture for createAPIReqMapNextResponseAction
			
			import \{
			  createAPIGetMemberMapinfoResponseAction,
			  createAPIReqAirCorpsSetPlaneResponseAction,
			  createAPIReqAirCorpsChangeNameResponseAction,
			  createAPIReqAirCorpsSetActionResponseAction,
			  createAPIReqAirCorpsSupplyResponseAction,
			  createAPIPortPortResponseAction,
			\} from '../../actions'
			
			import mapInfoFixture from './__fixtures__/api_get_member_mapinfo.json'
			import setPlaneFixture from './__fixtures__/api_req_air_corps_set_plane.json'
			import changeNameFixture from './__fixtures__/api_req_air_corps_change_name.json'
			import setActionFixture from './__fixtures__/api_req_air_corps_set_action.json'
			import supplyFixture from './__fixtures__/api_req_air_corps_supply.json'
			
			describe('airbase reduer', () => \{
			  const initialState = reducer([], createAPIGetMemberMapinfoResponseAction(mapInfoFixture))
			
			  it('empty action', () => \{
			    // @ts-expect-error testing empty reducer
			    expect(reducer(undefined, \{\})).toEqual([])
			  \})
			
			  it('createAPIGetMemberMapinfoResponseAction', () => \{
			    // @ts-expect-error testing empty reducer
			    expect(reducer([], createAPIGetMemberMapinfoResponseAction(\{ body: \{\} \}))).toEqual([])
			
			    expect(reducer([], createAPIGetMemberMapinfoResponseAction(mapInfoFixture))).toMatchSnapshot()
			  \})
			
			  it('createAPIReqAirCorpsSetPlaneResponseAction', () => \{
			    expect(initialState).toMatchDiffSnapshot(
			      reducer(initialState, createAPIReqAirCorpsSetPlaneResponseAction(setPlaneFixture)),
			    )
			  \})
			
			  it('createAPIReqAirCorpsChangeNameResponseAction', () => \{
			    expect(initialState).toMatchDiffSnapshot(
			      reducer(initialState, createAPIReqAirCorpsChangeNameResponseAction(changeNameFixture)),
			    )
			  \})
			
			  it('createAPIReqAirCorpsSetActionResponseAction', () => \{
			    expect(initialState).toMatchDiffSnapshot(
			      reducer(initialState, createAPIReqAirCorpsSetActionResponseAction(setActionFixture)),
			    )
			  \})
			
			  it('createAPIReqAirCorpsSupplyResponseAction', () => \{
			    expect(initialState).toMatchDiffSnapshot(
			      reducer(initialState, createAPIReqAirCorpsSupplyResponseAction(supplyFixture)),
			    )
			  \})
			
			  it('createAPIPortPortResponseAction', () => \{
			    expect(initialState).toMatchDiffSnapshot(
			      // @ts-expect-error testing empty reducer
			      reducer(initialState, createAPIPortPortResponseAction(\{\})),
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'poooi_poi\\views\\redux\\info\\__tests__\\airbase.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
		expect(assertions).toBe(8)
    });
    it('poooi_poi\\views\\utils\\__tests__\\tools.spec.ts', () => {
        const sourceCode = `
			import _ from 'lodash'
			import path from 'path'
			import \{ isSubdirectory, compareUpdate, cjkSpacing, constructArray \} from '../tools'
			
			const pathPatterns = [
			  ['/foo', '/foo', true],
			  ['/foo', '/bar', false],
			  ['/foo', '/foo/bar', true],
			  ['/foo/bar', '/foo/foo', false],
			  ['/foo/bar', '/foo/foo/bar', false],
			  ['/foo/bar', '/bar/foo', false],
			  ['/foo/bar', '/bar/../foo/bar', true],
			  ['/foo/bar', '/foo/./bar', true],
			  ['/foo/bar', './bar', false],
			]
			
			const win32PathPatterns = [
			  ['C:\\\\Foo', 'C:\\\\Foo\\\\Bar', true],
			  ['C:\\\\foo', 'D:\\\\foo', false],
			  ['C:\\\\foo', 'D:\\\\foo\\\\bar', false],
			  ['C:\\\\foo', 'C:\\\\bar', false],
			]
			
			describe('views/utils/tools', () => \{
			  describe('isSubdirectory', () => \{
			    it('should work under current os', () => \{
			      const subdir = path.resolve(__dirname, './ddddd')
			      expect(isSubdirectory(__dirname, subdir)).toBe(true)
			
			      const otherDir = path.resolve(__dirname, '../other')
			      expect(isSubdirectory(__dirname, otherDir)).toBe(false)
			    \})
			
			    it('should work with given paths', () => \{
			      _.each(pathPatterns, ([parent, dir, result]) => \{
			        expect(isSubdirectory(parent, dir)).toBe(result)
			      \})
			    \})
			
			    if (process.platform === 'win32') \{
			      it('should work for windows', () => \{
			        _.each(win32PathPatterns, ([parent, dir, result]) => \{
			          expect(isSubdirectory(parent, dir)).toBe(result)
			        \})
			      \})
			    \}
			  \})
			
			  describe('compareUpdate', () => \{
			    const test = (a: any, b: any, d?: number) => \{
			      const c = compareUpdate(a, b, d)
			      return [c !== a, c]
			    \}
			
			    it('should work with cases below', () => \{
			      expect(test(2, 2)).toEqual([false, 2])
			      expect(test(\{ 1: 'a' \}, \{ 2: 'b' \})).toEqual([true, \{ 1: 'a', 2: 'b' \}])
			      expect(test(\{ 1: 'a' \}, \{ 1: 'b' \})).toEqual([true, \{ 1: 'b' \}])
			      expect(test(\{ 1: 'a' \}, \{ 1: 'a' \})).toEqual([false, \{ 1: 'a' \}])
			      expect(test(\{ 1: \{ 1: 2 \} \}, \{ 1: \{ 1: 2 \} \})).toEqual([false, \{ 1: \{ 1: 2 \} \}])
			      expect(test(\{ 1: \{ 1: [], 2: ['g'] \} \}, \{ 1: \{ 1: [] \} \})).toEqual([true, \{ 1: \{ 1: [] \} \}])
			      expect(test(\{ 1: \{ 1: [], 2: ['g'] \} \}, \{ 1: \{ 1: [] \} \}, 2)).toEqual([
			        false,
			        \{ 1: \{ 1: [], 2: ['g'] \} \},
			      ])
			
			      const a = []
			      a[1] = \{ 1: 2 \}
			      expect(test([\{ 1: 1 \}], a)).toEqual([true, [\{ 1: 1 \}, \{ 1: 2 \}]])
			    \})
			  \})
			
			  describe('cjkSpacing', () => \{
			    expect(cjkSpacing('你好world')).toMatchInlineSnapshot(\`"你好 world"\`)
			    expect(cjkSpacing('こんいちわworld')).toMatchInlineSnapshot(\`"こんいちわ world"\`)
			    expect(cjkSpacing('芸術は爆發だ!')).toMatchInlineSnapshot(\`"芸術は爆發だ！"\`)
			  \})
			
			  describe('constructArray', () => \{
			    expect(constructArray([1], ['foo'])).toMatchInlineSnapshot(\`
			      Array [
			        ,
			        "foo",
			      ]
			    \`)
			    expect(constructArray([-1], ['foo'])).toMatchInlineSnapshot(\`Array []\`)
			    // @ts-expect-error testing passing non number
			    expect(constructArray(['bar'], ['foo'])).toMatchInlineSnapshot(\`Array []\`)
			    expect(constructArray([0.92], ['foo'])).toMatchInlineSnapshot(\`
			      Array [
			        "foo",
			      ]
			    \`)
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'poooi_poi\\views\\utils\\__tests__\\tools.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
		expect(assertions).toBe(12)
    });
});
