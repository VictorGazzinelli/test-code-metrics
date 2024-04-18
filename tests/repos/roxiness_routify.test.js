const { extractFromSource } = require('../../src/extractor');

describe('roxiness_routify', () => {
    it('roxiness_routify\\examples\\starter-vitest\\test\\dom.test.js', () => {
        const sourceCode = `
			/** @type \{ Router \} */
			let router
			
			beforeAll(async () => \{
			    await import('../src/main')
			    router = globalThis.__routify.routers[0]
			    await router.ready()
			\})
			
			test('can see frontpage', async () => \{
			    expect(document.body.innerHTML).toContain('Routify 3 App')
			\})
			
			test('can see /hello-world', async () => \{
			    await router.url.push('/hello-world')
			
			    expect(document.body.innerHTML).toContain('Hello world!')
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\examples\\starter-vitest\\test\\dom.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('roxiness_routify\\examples\\typescript-tailwind-playwright\\tests\\home.spec.ts', () => {
        const sourceCode = `
			import \{ expect, test \} from '@playwright/test';
			
			test('index page has expected h1', async (\{ page \}) => \{
			    await page.goto('/');
			
			    expect(await page.textContent('h1')).toBe('Routify 3');
			\});
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\examples\\typescript-tailwind-playwright\\tests\\home.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('roxiness_routify\\lib\\buildtime\\plugins\\metaFromFile\\spec\\metaFromFile\\metaFromFile.spec.js', () => {
        const sourceCode = `
			import \{ dirname \} from 'path'
			import \{ fileURLToPath \} from 'url'
			import \{
			    metaFromFile,
			    htmlComments,
			    getExternalMeta,
			\} from '../../../../../buildtime/plugins/metaFromFile/metaFromFile.js'
			import fse from 'fs-extra'
			import \{ filemapper \} from '../../../../../buildtime/plugins/filemapper/lib/index.js'
			import \{ RoutifyBuildtime \} from '../../../../../buildtime/RoutifyBuildtime.js'
			import externalMetaCb from './example/externalMeta.meta.js'
			const externalMetaJS = externalMetaCb()
			
			/** @ts-ignore for some reason this one isn't picking up es2020 from tsconfig.json */
			const __dirname = dirname(fileURLToPath(import.meta.url))
			
			const expectedInline = \{
			    'equal-sign-trimmed': 'meta',
			    'equal-sign-right ': 'meta',
			    'equal-sign-left': 'meta',
			    'equal-sign-center ': 'meta',
			    'an-array': ['item1', 'item2'],
			    'an-object': \{ prop: \{ nested: 'value' \} \},
			    directive: true,
			\}
			
			const options = \{
			    routifyDir: \`\$\{__dirname\}/temp\`,
			    routesDir: \{ default: \`\$\{__dirname\}/example\` \},
			\}
			beforeEach(() => \{
			    fse.emptyDirSync(options.routifyDir)
			\})
			
			test('inline meta', async () => \{
			    const path = \`\$\{__dirname\}/example/inlineMeta.svelte\`
			    const meta = await htmlComments(path)
			    expect(meta).toEqual(expectedInline)
			\})
			
			test('external meta util', async () => \{
			    const path = \`\$\{__dirname\}/example/externalMeta.svelte\`
			    const meta = getExternalMeta(path)
			
			    expect(meta.toString()).toEqual(externalMetaJS.toString())
			\})
			
			describe('metaFromFile middleware', () => \{
			    test('metaFromFile middleware', async () => \{
			        const instance = new RoutifyBuildtime(options)
			        await filemapper(\{ instance \})
			        await metaFromFile(\{ instance \})
			
			        const inlineMetaNode = instance.nodeIndex.find(node => node.name === 'inlineMeta')
			        const externalMetaNode = instance.nodeIndex.find(
			            node => node.name === 'externalMeta',
			        )
			
			        expect(\{ ...inlineMetaNode.meta \}).toEqual(expectedInline)
			        expect(await externalMetaNode.meta.explicit).toBe("I'm explicit")
			
			        await metaFromFile(\{ instance \})
			
			        // todo should we use the below expect?
			        // expect(\{ ...externalMetaNode.meta \}).toEqual(\{
			        //     ...(await externalMetaJS),
			        //     inlined: true,
			        //     directive: true,
			        // \})
			    \})
			\})
			// todo meta can be json stringified with classless
			// todo plugins should be used as \`instance.use(plugin)\`
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\buildtime\\plugins\\metaFromFile\\spec\\metaFromFile\\metaFromFile.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('roxiness_routify\\lib\\buildtime\\plugins\\namedModule\\spec\\namedModule.test.js', () => {
        const sourceCode = `
			import \{ setNamedModule \} from '../index.js'
			
			test('named module', () => \{
			    const node = \{ file: \{ name: '_module-some-name' \}, meta: \{\} \}
			    setNamedModule(node)
			    assert.deepEqual(node, \{
			        file: \{ name: '_module-some-name' \},
			        meta: \{ moduleName: 'some-name' \},
			    \})
			\})
			
			test('using reset', () => \{
			    const node = \{ file: \{ name: 'some-page@some-module' \}, meta: \{\} \}
			    setNamedModule(node)
			    assert.deepEqual(node, \{
			        name: 'some-page',
			        file: \{ name: 'some-page@some-module' \},
			        meta: \{ reset: 'some-module' \},
			    \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\buildtime\\plugins\\namedModule\\spec\\namedModule.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('roxiness_routify\\lib\\common\\spec\\helpers.spec.js', () => {
        const sourceCode = `
			import \{ findNearestParent \} from '../helpers.js'
			
			const treeGrandChild = \{
			    name: 'grand child',
			    parent: \{
			        name: 'child',
			        parent: \{
			            name: 'me',
			            parent: \{
			                name: 'parent',
			                parent: \{
			                    name: 'grand parent',
			                \},
			            \},
			        \},
			    \},
			\}
			const treeChild = treeGrandChild.parent
			const treeMe = treeGrandChild.parent.parent
			const treeParent = treeGrandChild.parent.parent.parent
			const treeGrandParent = treeGrandChild.parent.parent.parent.parent
			
			test('findNearestParent can return parent', async () => \{
			    const child = findNearestParent(treeGrandChild, node => node.name === 'child')
			    expect(child).toEqual(treeChild)
			\})
			
			test('findNearestParent can return grand parent', async () => \{
			    const me = findNearestParent(treeGrandChild, node => node.name === 'me')
			    expect(me).toEqual(treeMe)
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\common\\spec\\helpers.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('roxiness_routify\\lib\\common\\spec\\RNode.spec.js', () => {
        const sourceCode = `
			import \{ RoutifyRuntime \} from '../../runtime/Instance/RoutifyRuntime.js'
			import \{ mockRoutes \} from '../utils.js'
			
			const instance = new RoutifyRuntime(\{\})
			instance.rootNodes.default = mockRoutes(instance, \{
			    module: \{
			        about: \{\},
			        posts: \{ '[slug]-by-[author]': \{\} \},
			        admin: \{ crud: \{\}, users: \{\} \},
			        '[...404]': \{
			            '[catch-one]': \{
			                'i-exist': \{\},
			            \},
			            'specific-error': \{\},
			        \},
			    \},
			\})
			
			const module = instance.rootNodes.default
			
			const nodeChainToNameAndParams = nodeChains =>
			    nodeChains.map(nodeChain => [nodeChain.node.name, nodeChain.params])
			
			test('can travel to root', () => \{
			    const result = module.getChainTo('/')
			    assert.deepEqual(nodeChainToNameAndParams(result), [['module', \{\}]])
			\})
			
			test('spreads catches direct matches', () => \{
			    const result = module.getChainTo('/no-exist')
			    assert.deepEqual(nodeChainToNameAndParams(result), [
			        ['module', \{\}],
			        ['[...404]', \{ 404: ['no-exist'] \}],
			    ])
			\})
			
			test('can travel to specific inside spread', () => \{
			    const result = module.getChainTo('/no-exist/specific-error')
			    assert.deepEqual(nodeChainToNameAndParams(result), [
			        ['module', \{\}],
			        ['[...404]', \{ 404: ['no-exist'] \}],
			        ['specific-error', \{\}],
			    ])
			\})
			
			test('can fallback to spread from inside specific', () => \{
			    const result = module.getChainTo('/about/specific-error/no-exist')
			    assert.deepEqual(nodeChainToNameAndParams(result), [
			        ['module', \{\}],
			        ['[...404]', \{ 404: ['about', 'specific-error'] \}],
			        ['[catch-one]', \{ 'catch-one': 'no-exist' \}],
			    ])
			\})
			
			test('bad travel inside specific inside spread will resume spread', () => \{
			    const result = module.getChainTo('/no-exist/specific-error/no-exist')
			    assert.deepEqual(nodeChainToNameAndParams(result), [
			        ['module', \{\}],
			        ['[...404]', \{ 404: ['no-exist', 'specific-error'] \}],
			        ['[catch-one]', \{ 'catch-one': 'no-exist' \}],
			    ])
			\})
			
			test('bad travel inside specific inside spread will resume spread2', () => \{
			    const result = module.getChainTo('/no-exist/specific-error/no-exist/i-exist')
			    assert.deepEqual(nodeChainToNameAndParams(result), [
			        ['module', \{\}],
			        ['[...404]', \{ 404: ['no-exist', 'specific-error'] \}],
			        ['[catch-one]', \{ 'catch-one': 'no-exist' \}],
			        ['i-exist', \{\}],
			    ])
			\})
			
			test('can travel to node with two params', () => \{
			    const result = module.getChainTo('/posts/some-story-by-john-doe')
			    assert.deepEqual(nodeChainToNameAndParams(result), [
			        ['module', \{\}],
			        ['posts', \{\}],
			        ['[slug]-by-[author]', \{ author: 'john-doe', slug: 'some-story' \}],
			    ])
			\})
			
			test('throws error if static node not found', () => \{
			    let error
			    try \{
			        // set allowDynamic to false
			        module.getChainTo('/posts/some-story-by-john-doe', \{ allowDynamic: false \})
			    \} catch (err) \{
			        error = err
			    \}
			    assert.equal(error.message, 'module/posts could not travel to some-story-by-john-doe')
			\})
			
			test('throws error if dynamic node not found', () => \{
			    const instance = new RoutifyRuntime(\{\})
			    instance.rootNodes.default = mockRoutes(instance, \{
			        module: \{
			            about: \{\},
			        \},
			    \})
			
			    const module = instance.rootNodes.default
			    let error
			    try \{
			        module.getChainTo('/no-exist')
			    \} catch (err) \{
			        error = err
			    \}
			    assert.equal(error.message, 'Could not find path "/no-exist" from module')
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\common\\spec\\RNode.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('roxiness_routify\\lib\\common\\spec\\utils.spec.js', () => {
        const sourceCode = `
			import \{ RoutifyRuntime \} from '../../runtime/Instance/RoutifyRuntime.js'
			
			import \{ RoutifyBuildtime \} from '../../buildtime/RoutifyBuildtime.js'
			import \{ mockRoutes, next \} from '../utils.js'
			import \{ writable \} from 'svelte/store'
			
			test('mock routes', () => \{
			    const instance = new RoutifyBuildtime(\{\})
			    instance.rootNodes.default = mockRoutes(instance, \{
			        module: \{
			            about: \{\},
			            posts: \{ '[slug]': \{\} \},
			            admin: \{ crud: \{\}, users: \{\} \},
			        \},
			    \})
			    expect(instance.rootNodes.default.name).toBe('module')
			    expect(instance.rootNodes.default.children[0].name).toBe('about')
			\})
			
			test('mock runtime routes', () => \{
			    const instance = new RoutifyRuntime(\{\})
			    instance.rootNodes.default = mockRoutes(instance, \{
			        module: \{
			            about: \{\},
			            posts: \{ '[slug]': \{\} \},
			            admin: \{ crud: \{\}, users: \{\} \},
			        \},
			    \})
			    const module = instance.rootNodes.default
			    expect(module.name).toBe('module')
			    expect(module.traverse('./posts').name).toBe('posts')
			    expect(module.traverse('./about').name).toBe('about')
			    expect(module.traverse('./posts/[slug]').name).toBe('[slug]')
			\})
			
			test('next store value', () => \{
			    test('next with any', async () => \{
			        const events = []
			        const store = writable('foo')
			        const promise = next(store).then(value => events.push(value))
			        store.set('bar')
			        await promise
			        assert.deepEqual(events, ['bar'])
			    \})
			    test('next with specific', async () => \{
			        const events = []
			        const store = writable('foo')
			        const promise = next(store, 'i-want-this').then(value => events.push(value))
			        store.set('ignore-me')
			        store.set('and-me')
			        store.set('i-want-this')
			        await promise
			        assert.deepEqual(events, ['i-want-this'])
			    \})
			    test('next with callback', async () => \{
			        const events = []
			        const store = writable('foo')
			        const promise = next(store, val => val === 'i-want-this').then(value =>
			            events.push(value),
			        )
			        store.set('ignore-me')
			        store.set('and-me')
			        store.set('i-want-this')
			        await promise
			        assert.deepEqual(events, ['i-want-this'])
			    \})
			\})
			
			// test('resolveValues', () => \{
			//     const obj = \{
			//         plan: \{ text: 'nothing to see here' \},
			//         nested: \{ nested2: \{ text: 'nor here' \} \},
			//         value: \{ value: \{ text: 'resolve me' \} \},
			//         nestedValue: \{ nested2: \{ value: \{ text: 'resolve me too' \} \} \},
			//     \}
			//     const newObj = resolveValues(obj)
			//     expect(newObj).not.toEqual(obj)
			//     expect(newObj).toEqual(\{
			//         plan: \{ text: 'nothing to see here' \},
			//         nested: \{ nested2: \{ text: 'nor here' \} \},
			//         value: \{ text: 'resolve me' \},
			//         nestedValue: \{ nested2: \{ text: 'resolve me too' \} \},
			//     \})
			// \})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\common\\spec\\utils.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('roxiness_routify\\lib\\runtime\\Global\\spec\\BrowserAdapter.spec.js', () => {
        const sourceCode = `
			import \{ createBrowserAdapter \} from '../BrowserAdapter.js'
			
			const browserAdapter = createBrowserAdapter()
			const \{ toBrowser, toRouter \} = browserAdapter
			
			const urlWithoutDefault = 'r2=/r2/address;r3=/r3/address'
			const urlWithDefault = '/primary/address;r2=/r2/address;r3=/r3/address'
			
			const router1 = \{ name: '', url: \{ external: () => '/primary/address' \} \}
			const router2 = \{ name: 'r2', url: \{ external: () => '/r2/address' \} \}
			const router3 = \{ name: 'r3', url: \{ external: () => '/r3/address' \} \}
			
			test('should be able to get internal url for default router', () => \{
			    const url = toRouter(urlWithDefault, \{ name: '' \})
			    expect(url).toBe('/primary/address')
			\})
			
			test('should be able to get internal url for router thats not default', () => \{
			    const url = toRouter(urlWithDefault, \{ name: 'r2' \})
			    expect(url).toBe('/r2/address')
			\})
			
			test('should be able to get internal url with no default router', () => \{
			    const url = toRouter(urlWithoutDefault, \{ name: 'r2' \})
			    expect(url).toBe('/r2/address')
			\})
			
			test('should be able to get external urls with default', () => \{
			    const res = toBrowser([router1, router2, router3])
			    expect(res).toBe(urlWithDefault)
			\})
			
			test('should be able to get external urls without default', () => \{
			    const res = toBrowser([router2, router3])
			    expect(res).toBe(urlWithoutDefault)
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\Global\\spec\\BrowserAdapter.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('roxiness_routify\\lib\\runtime\\helpers\\spec\\helpers.spec.js', () => {
        const sourceCode = `
			import \{ mockRoutes \} from '../../../common/utils.js'
			import \{ RoutifyRuntime \} from '../../../runtime/Instance/RoutifyRuntime.js'
			import \{ traverseNode, getPath, getMRCA, isActiveUrl \} from '../index.js'
			
			const instance = new RoutifyRuntime(\{\})
			instance.rootNodes.default = mockRoutes(instance, \{
			    module: \{
			        index: \{\},
			        about: \{\},
			        posts: \{ '[slug]': \{\} \},
			        admin: \{
			            index: \{\},
			            crud: \{ index: \{\} \},
			            users: \{ index: \{\} \},
			        \},
			    \},
			\})
			
			const mockRouter = \{ rootNode: instance.rootNodes.default \}
			
			const moduleNode = Object.values(instance.rootNodes)[0]
			const slugNode = instance.nodeIndex.find(node => node.name === '[slug]')
			const crudNode = instance.nodeIndex.find(node => node.name === 'crud')
			const adminNode = instance.nodeIndex.find(node => node.name === 'admin')
			
			test('can resolve parent', () => \{
			    const parent = traverseNode(crudNode, '..', mockRouter)
			    expect(parent.name).toBe('admin')
			\})
			
			test('can resolve grandparent', () => \{
			    const grandparent = traverseNode(crudNode, '../..', mockRouter)
			    expect(grandparent.name).toBe('module')
			\})
			
			test('can resolve sibling', () => \{
			    const res = traverseNode(crudNode, '../users', mockRouter)
			    expect(res.name).toBe('users')
			\})
			
			test('can resolve absolute', () => \{
			    const res = traverseNode(crudNode, '/about', mockRouter)
			    expect(res.name).toBe('about')
			\})
			
			test('can resolve named', () => \{
			    const res = traverseNode(crudNode, 'admin', mockRouter)
			    expect(res.name).toBe('admin')
			\})
			
			test('can find mrca', () => \{
			    const mrcaNode = getMRCA(slugNode, crudNode)
			    expect(mrcaNode).toBe(moduleNode)
			\})
			
			test('can find self as mrca', () => \{
			    const mrcaNode = getMRCA(crudNode, adminNode)
			    expect(mrcaNode).toBe(adminNode)
			\})
			
			test('can find self as mrca reversed', () => \{
			    const mrcaNode = getMRCA(adminNode, crudNode)
			    expect(mrcaNode).toBe(adminNode)
			\})
			
			test('can get path backwards', () => \{
			    const path = '../'
			    const _path = getPath(crudNode, adminNode)
			    expect(_path).toBe(path)
			\})
			
			test('can get path forward', () => \{
			    const path = 'crud'
			    const _path = getPath(adminNode, crudNode)
			    expect(_path).toBe(path)
			\})
			
			test('can get path back and forward', () => \{
			    const path = '../../admin/crud'
			    const _path = getPath(slugNode, crudNode)
			    expect(_path).toBe(path)
			\})
			
			test('traverseNode can be reversed with getPath', () => \{
			    const path = getPath(slugNode, crudNode)
			    expect(traverseNode(slugNode, path)).toBe(crudNode)
			\})
			
			test('isActive detects active routes', () => \{
			    // simulate browser url of /path/123
			    const isActive = isActiveUrl('/path/123', \{ slug: '123' \})
			
			    test('should match exact url', () =>
			        expect(isActive('/path/123/index', \{\}, \{ recursive: false \})).toBeTruthy())
			
			    test('should match recursively by default', () =>
			        expect(isActive('/path/index', \{\})).toBeTruthy())
			
			    test('recursive matching should be optional', () =>
			        expect(isActive('/path/index', \{\}, \{ recursive: false \})).toBeFalsy())
			
			    test('unspecified param should match all params', () =>
			        expect(isActive('/path/[slug]', \{\})).toBeTruthy())
			
			    test('specified params should match correct url', () =>
			        expect(isActive('/path/[slug]', \{ slug: '123' \})).toBeTruthy())
			
			    test('specified params should not match incorrect url', () =>
			        expect(isActive('/path/[slug]', \{ slug: 'abc' \})).toBeFalsy())
			
			    test('should handle explicit index', () => \{
			        const isActive = isActiveUrl('/path/index')
			
			        test('should match exact url', () =>
			            expect(isActive('/path/index', \{\}, \{ recursive: false \})).toBeTruthy())
			
			        test('should match url with recursive mode', () =>
			            expect(isActive('/path/index', \{\})).toBeTruthy())
			
			        test('should not match inactive url', () =>
			            expect(isActive('/path/badpath', \{\})).toBeFalsy())
			    \})
			
			    test('should handle queries', () => \{
			        const isActive = isActiveUrl('/post?id=123', \{ id: '123' \})
			
			        test('should match path with matching params', () =>
			            expect(isActive('/post', \{ id: '123' \})).toBeTruthy())
			
			        test('should not match path with mismatching params', () =>
			            expect(isActive('/post', \{ id: '456' \})).toBeFalsy())
			    \})
			
			    test('should handle empty pathname', () => \{
			        const isActive = isActiveUrl('')
			        expect(isActive('/index')).toBeTruthy()
			    \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\helpers\\spec\\helpers.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(27)
    });
    it('roxiness_routify\\lib\\runtime\\Instance\\spec\\RNodeRuntime.spec.js', () => {
        const sourceCode = `
			import \{ RoutifyRuntime \} from '../RoutifyRuntime.js'
			
			const instance = new RoutifyRuntime(\{\})
			const node = instance.createNode('my-node')
			node.createChild('normal')
			node.createChild('_underscored')
			node.createChild('_fallback')
			node.createChild('index')
			
			test('pages should exclude index and underscored files', () => \{
			    expect(node.pages.length).toBe(1)
			    expect(node.pages[0].name).toBe('normal')
			\})
			
			// test('children.public should return normal children', () => \{
			//     expect(node.children.public.length).toBe(2)
			//     expect(node.children.public[0].name).toBe('normal')
			//     expect(node.children.public[1].name).toBe('index')
			// \})
			
			test('children returns all children', () => \{
			    expect(node.children.length).toBe(4)
			\})
			
			test('children.normal returns a child named normal', () => \{
			    expect(node.traverse('./normal').name).toBe('normal')
			\})
			
			test('children should have keys from array, filters and child nodes', () => \{
			    expect(Reflect.ownKeys(node.children)).toEqual(['0', '1', '2', '3', 'length'])
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\Instance\\spec\\RNodeRuntime.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('roxiness_routify\\lib\\runtime\\Instance\\spec\\UrlParamUtils.spec.js', () => {
        const sourceCode = `
			import \{ UrlParamUtils \} from '../UrlParamUtils.js'
			
			const \{ getFieldsFromName, getRegexFromName, getValuesFromPath, mapFieldsWithValues \} =
			    new UrlParamUtils()
			
			const name = 'article-[slug]-[id]'
			const path = 'article-superleague-123'
			
			test('can get fields from name', async () => \{
			    const fields = getFieldsFromName(name)
			    expect(fields).toEqual(['slug', 'id'])
			\})
			
			test('gets empty array of fields from fieldless name', async () => \{
			    const fields = getFieldsFromName('abc')
			    expect(fields).toEqual([])
			\})
			
			test('can create regex from name', async () => \{
			    const regex = getRegexFromName(name)
			    expect(regex.source).toBe('^article-(.+)-(.+)\$')
			\})
			
			test('regex is 1:1 for fieldless names', async () => \{
			    const regex = getRegexFromName('abc')
			    expect(regex.source).toBe('^abc\$')
			\})
			
			test('can get values from path', async () => \{
			    const regex = getRegexFromName(name)
			    const values = getValuesFromPath(regex, path)
			    expect(values).toEqual(['superleague', '123'])
			\})
			
			test('gets empty array of values if path doesnt match regex', async () => \{
			    const regex = getRegexFromName(name)
			    const values = getValuesFromPath(regex, 'bad-path')
			    expect(values).toEqual([])
			\})
			
			test('can map fields with values', async () => \{
			    const map = mapFieldsWithValues(['slug', 'id'], ['superleague', '123'])
			    expect(map).toEqual(\{ slug: 'superleague', id: '123' \})
			\})
			
			test('mapping fields and values requires equal length', async () => \{
			    let error
			    try \{
			        mapFieldsWithValues(['slug', 'id', 'oops'], ['superleague', '123'])
			    \} catch (err) \{
			        error = err
			    \}
			
			    expect(error.message).toBe(
			        'fields and values should be of same length' +
			            '\\nfields: ["slug","id","oops"]' +
			            '\\nvalues: ["superleague","123"]',
			    )
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\Instance\\spec\\UrlParamUtils.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('roxiness_routify\\lib\\runtime\\plugins\\reset\\spec\\reset.test.js', () => {
        const sourceCode = `
			import \{ Router \} from '../../../Router/Router.js'
			import \{ Route \} from '../../../Route/Route.js'
			
			const exported = \{
			    meta: \{\},
			    module: () => '_default',
			    name: '',
			    rootName: 'default',
			    children: [
			        \{
			            meta: \{ moduleName: 'wide' \},
			            id: '_default__module_wide_svelte',
			            name: '_module-wide',
			            children: [],
			        \},
			        \{
			            module: () => '_default_blog',
			            name: 'blog',
			            children: [
			                \{
			                    meta: \{ reset: 'wide' \},
			                    id: '_default_blog_fullscreen_wide_svelte',
			                    name: 'fullscreen',
			                    children: [],
			                \},
			                \{
			                    meta: \{ reset: 'wide+' \},
			                    id: '_default_blog_prepend-fullscreen_wide____svelte',
			                    name: 'prepend-fullscreen',
			                    children: [],
			                \},
			                \{
			                    meta: \{ reset: true \},
			                    id: '_default_blog_reset-me____svelte',
			                    name: 'reset-me',
			                    children: [],
			                \},
			                \{
			                    meta: \{ reset: 1 \},
			                    id: '_default_blog_reset-one____svelte',
			                    name: 'reset-one',
			                    children: [],
			                \},
			                \{
			                    meta: \{\},
			                    id: '_default_blog_regular_svelte',
			                    name: 'regular',
			                    children: [],
			                \},
			            ],
			        \},
			    ],
			\}
			
			const router = new Router(\{ routes: exported \})
			
			test('regular route has normal module', async () => \{
			    const route = new Route(router, '/blog/regular', 'pushState')
			    await route.runBeforeUrlChangeHooks()
			    expect(route.fragments.map(f => f.node.name)).toEqual(['', 'blog', 'regular'])
			\})
			
			test('reset route has no module', async () => \{
			    const route = new Route(router, '/blog/reset-me', 'pushState')
			    await route.runBeforeUrlChangeHooks()
			    expect(route.fragments.map(f => f.node.name)).toEqual(['reset-me'])
			\})
			
			test('reset with number route has x modules', async () => \{
			    const route = new Route(router, '/blog/reset-one', 'pushState')
			    await route.runBeforeUrlChangeHooks()
			    expect(route.fragments.map(f => f.node.name)).toEqual(['', 'reset-one'])
			\})
			
			test('string reset route has only requested module', async () => \{
			    const route = new Route(router, '/blog/fullscreen', 'pushState')
			    await route.runBeforeUrlChangeHooks()
			    expect(route.fragments.map(f => f.node.name)).toEqual(['_module-wide', 'fullscreen'])
			\})
			
			test('string reset with prepend prepends module', async () => \{
			    const route = new Route(router, '/blog/prepend-fullscreen', 'pushState')
			    await route.runBeforeUrlChangeHooks()
			    expect(route.fragments.map(f => f.node.name)).toEqual([
			        '_module-wide',
			        '',
			        'blog',
			        'prepend-fullscreen',
			    ])
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\plugins\\reset\\spec\\reset.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('roxiness_routify\\lib\\runtime\\Route\\spec\\Route.spec.js', () => {
        const sourceCode = `
			import \{ Router \} from '../../Router/Router.js'
			import \{ Route \} from '../Route.js'
			
			const exported = \{
			    meta: \{\},
			    module: () => '_default',
			    name: '',
			    rootName: 'default',
			    children: [
			        \{
			            meta: \{ reset: true \},
			            module: () => '_default_admin',
			            name: 'admin',
			            children: [],
			        \},
			        \{
			            module: () => '_default__[...falback]',
			            name: '[...fallback]',
			            meta: \{ dynamicSpread: true, dynamic: true \},
			            children: [],
			        \},
			        \{
			            module: () => '_default_blog',
			            name: 'blog',
			            children: [
			                \{
			                    module: () => '_default_blog_latest',
			                    name: 'latest',
			                    children: [],
			                \},
			                \{
			                    module: () => '_default_blog_[slug]',
			                    name: '[slug]',
			                    meta: \{ dynamic: true \},
			                    children: [
			                        \{
			                            module: () => '_default_blog_[slug]_index',
			                            name: 'index',
			                            children: [],
			                        \},
			                    ],
			                \},
			            ],
			        \},
			    ],
			\}
			
			const router = new Router(\{ routes: exported \})
			
			test('creates correct fragments for a route', () => \{
			    const route = new Route(router, '/admin', 'pushState')
			
			    expect(route.fragments.map(f => f.node.name)).toEqual(['', 'admin'])
			\})
			
			test('creates correct fragments for a nested route', () => \{
			    const route = new Route(router, '/blog/latest', 'pushState')
			    expect(route.fragments.map(f => f.node.name)).toEqual(['', 'blog', 'latest'])
			\})
			
			test('creates correct fragments for a missing route with fallback', () => \{
			    const route = new Route(router, '/admin/oops', 'pushState')
			
			    expect(route.fragments.map(f => f.node.name)).toEqual(['', '[...fallback]'])
			\})
			
			test('creates correct params', () => \{
			    const route = new Route(router, '/blog/my-story', 'pushState')
			    expect(route.params).toEqual(\{ slug: 'my-story' \})
			\})
			
			// test('params are reactive', async () => \{
			//     let value = \{\}
			
			//     const unsub = router.activeRoute.subscribe(route => (value = route?.params))
			
			//     await router.url.push('/blog/my-story')
			//     expect(value).toEqual(\{ slug: 'my-story' \})
			
			//     await router.url.push('/blog/my-story-2')
			//     expect(value).toEqual(\{ slug: 'my-story-2' \})
			//     unsub()
			
			//     await router.url.push('/blog/my-story-3')
			//     expect(value).toEqual(\{ slug: 'my-story-2' \})
			// \})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\Route\\spec\\Route.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('roxiness_routify\\lib\\runtime\\Route\\spec\\utils.spec.js', () => {
        const sourceCode = `
			import \{ LoadCache \} from '../utils.js'
			
			const delayedPromise = (value, time) =>
			    new Promise(resolve => setTimeout(() => resolve(value), time))
			
			test('can cache', async () => \{
			    const loadCache = new LoadCache()
			
			    const firstPromise = loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			    \})
			
			    const secondPromise = loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			    \})
			
			    await delayedPromise(null, 100)
			
			    const thirdPromise = loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			    \})
			
			    const fourthPromise = loadCache.fetch('bar', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			    \})
			
			    const [firstResult, secondResult, thirdResult, fourthResult] = await Promise.all([
			        firstPromise,
			        secondPromise,
			        thirdPromise,
			        fourthPromise,
			    ])
			
			    assert.equal(firstResult, secondResult)
			    assert.equal(firstResult, thirdResult)
			    assert.notEqual(firstResult, fourthResult)
			\})
			
			test('cache can do instant clear', async () => \{
			    const loadCache = new LoadCache()
			    const firstResult = await loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			    \})
			
			    const secondResult = await loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			        clear: () => true,
			    \})
			
			    const thirdResult = await loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			    \})
			
			    assert.equal(firstResult, secondResult)
			    assert.notEqual(firstResult, thirdResult)
			\})
			
			test('cache can do delayed clear', async () => \{
			    const loadCache = new LoadCache()
			    const firstResult = await loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			        clear: () => 100,
			    \})
			
			    const secondResult = await loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			    \})
			
			    await new Promise(resolve => setTimeout(resolve, 100))
			
			    const thirdResult = await loadCache.fetch('foo', \{
			        hydrate: () => delayedPromise('thing' + Math.random(), 0),
			    \})
			
			    assert.equal(firstResult, secondResult)
			    assert.notEqual(firstResult, thirdResult)
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\Route\\spec\\utils.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('roxiness_routify\\lib\\runtime\\Router\\utils\\index.spec.js', () => {
        const sourceCode = `
			import \{ normalizeRouterOptions \} from './index.js'
			
			const baseOpts = \{
			    name: '',
			    beforeRouterInit: [],
			    afterRouterInit: [],
			    urlRewrite: [],
			    beforeUrlChange: [],
			    afterUrlChange: [],
			    transformFragments: [],
			    onDestroy: [],
			\}
			
			test('empty options should return base options', () => \{
			    const opts = normalizeRouterOptions(\{\})
			    assert.deepEqual(opts, baseOpts)
			\})
			
			test('hook props are transformed to arrays', () => \{
			    const input = \{ urlRewrite: 'x' \}
			    //  @ts-ignore
			    const opts = normalizeRouterOptions(input)
			    assert.deepEqual(opts, \{ ...baseOpts, urlRewrite: ['x'] \})
			\})
			
			test('plugins are flattened', () => \{
			    const input = \{
			        urlRewrite: 'z',
			        plugins: [
			            \{ urlRewrite: 'x1', plugins: [\{ urlRewrite: 'x2' \}] \},
			            \{ urlRewrite: 'y1' \},
			        ],
			    \}
			
			    //  @ts-ignore
			    const opts = normalizeRouterOptions(input)
			
			    assert.deepEqual(opts, \{
			        ...baseOpts,
			        urlRewrite: ['x2', 'x1', 'y1', 'z'],
			    \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\Router\\utils\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('roxiness_routify\\lib\\runtime\\utils\\spec\\utils.spec.js', () => {
        const sourceCode = `
			import \{ fromEntries, populateUrl, pushToOrReplace \} from '../index.js'
			
			const mockRoute = \{
			    router: \{
			        queryHandler: \{
			            parse: search => fromEntries(new URLSearchParams(search)),
			            stringify: params => \{
			                const query = new URLSearchParams(params).toString()
			                return query ? \`?\$\{query\}\` : ''
			            \},
			        \},
			    \},
			\}
			
			test('populateUrl', () => \{
			    test('can do root url', () => \{
			        const url = populateUrl('/', \{\}, mockRoute)
			        assert.equal(url, '/')
			    \})
			
			    test('can do plain url', () => \{
			        const url = populateUrl('/foo/bar', \{\}, mockRoute)
			        assert.equal(url, '/foo/bar')
			    \})
			
			    test('can do url with params', () => \{
			        const url = populateUrl('/car/[make]', \{ make: 'ford' \}, mockRoute)
			        assert.equal(url, '/car/ford')
			    \})
			
			    test('can do urls with spread params', () => \{
			        const str = ['hello', 'world']
			        const url = populateUrl('/spread/[...str]', \{ str \}, mockRoute)
			        assert.equal(url, '/spread/hello/world')
			    \})
			
			    test('can do overloads', () => \{
			        const str = ['hello', 'world']
			        const url = populateUrl('/overload', \{ str \}, mockRoute)
			        assert.equal(url, '/overload?str=hello%2Fworld')
			    \})
			\})
			
			test('pushToOrReplace', () => \{
			    const arr = [1, 2, 3]
			    test('constructable functions are added', () => \{
			        function constructable() \{\}
			        const newArr = pushToOrReplace(arr, constructable)
			        assert.deepEqual(newArr, [...arr, constructable])
			    \})
			    test('input can be an array', () => \{
			        const newArr = pushToOrReplace(arr, ['a', 'b', 'c'])
			        assert.deepEqual(newArr, [...arr, 'a', 'b', 'c'])
			    \})
			    test('anonymous functions reset the array', () => \{
			        const anonFn = _arr => ['a']
			        const newArr = pushToOrReplace(arr, anonFn)
			        assert.deepEqual(newArr, ['a'])
			    \})
			    test("anonymous functions error if they don't return array", async () => \{
			        let err
			        try \{
			            const newArr = pushToOrReplace(arr, () => \{\})
			        \} catch (_err) \{
			            err = _err
			        \}
			        assert.equal(err?.toString(), 'Error: anonymous callback did not return array')
			    \})
			    test('anonymous functions can compose arrays', () => \{
			        const anonFn = _arr => [arr[0], 'a', arr[1], 'b', arr[2]]
			        const newArr = pushToOrReplace(arr, anonFn)
			        assert.deepEqual(newArr, [1, 'a', 2, 'b', 3])
			    \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\lib\\runtime\\utils\\spec\\utils.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('roxiness_routify\\test\\e2e\\an-app\\app.test.js', () => {
        const sourceCode = `
			import \{ createDirname \} from '../../../lib/buildtime/utils.js'
			import \{ getExamplesPath, runViteDev \} from '../../utils.js'
			const __dirname = createDirname(import.meta)
			
			beforeAll(() => page.setDefaultTimeout(25000))
			
			test('should see starter front page', async () => \{
			    const \{ kill, port \} = await runViteDev(\`\$\{__dirname\}/app\`)
			    await page.goto(\`http://localhost:\$\{port\}\`)
			    const result = await page.waitForSelector('h1')
			    expect(result).toBeTruthy()
			    await kill()
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\e2e\\an-app\\app.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('roxiness_routify\\test\\examples\\buildtime-data.test.js', () => {
        const sourceCode = `
			import \{ getExamplesPath, runViteDev \} from '../utils.js'
			
			beforeAll(() => page.setDefaultTimeout(25000))
			
			test('should see buildtime-data front page', async () => \{
			    const \{ kill, port \} = await runViteDev(getExamplesPath('buildtime-data'))
			    await page.goto(\`http://localhost:\$\{port\}\`)
			
			    expect(await page.waitForSelector('pre:has-text("Skywalker")')).toBeTruthy()
			
			    await page.click('"show dynamic imported meta"')
			    expect(await page.waitForSelector('pre:has-text("homeworld")')).toBeTruthy()
			
			    await kill()
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\examples\\buildtime-data.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('roxiness_routify\\test\\examples\\starter.test.js', () => {
        const sourceCode = `
			import \{ getExamplesPath, runViteDev \} from '../utils.js'
			
			beforeAll(() => page.setDefaultTimeout(25000))
			
			test('should see starter front page', async () => \{
			    const \{ kill, port \} = await runViteDev(getExamplesPath('starter'))
			    await page.goto(\`http://localhost:\$\{port\}\`)
			    const result = await page.waitForSelector('h1')
			    expect(result).toBeTruthy()
			    await kill()
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\examples\\starter.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('roxiness_routify\\test\\examples\\sveltekit.test.js', () => {
        const sourceCode = `
			import \{ getExamplesPath, runViteDev \} from '../utils.js'
			
			beforeAll(() => page.setDefaultTimeout(25000))
			
			test('should see sveltekit front page', async (\{ skip \}) => \{
			    return skip('kit starter needs fixing')
			    const \{ kill, port \} = await runViteDev(getExamplesPath('sveltekit'))
			    await page.goto(\`http://localhost:\$\{port\}\`)
			    const result = await page.waitForSelector('"Welcome to SvelteKit + Routify"')
			    expect(result).toBeTruthy()
			    await kill()
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\examples\\sveltekit.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('roxiness_routify\\test\\integration\\meta\\meta.test.js', () => {
        const sourceCode = `
			import \{ RoutifyBuildtime \} from '../../../lib/buildtime/RoutifyBuildtime.js'
			import \{ createDirname \} from '../../../lib/buildtime/utils.js'
			import \{ RoutifyRuntime \} from '../../../lib/runtime/Instance/RoutifyRuntime.js'
			import fse from 'fs-extra'
			
			const __dirname = createDirname(import.meta)
			
			const buildtimeInstance = new RoutifyBuildtime(\{
			    routifyDir: __dirname + '/temp',
			    routesDir: \{
			        default: __dirname + '/example',
			    \},
			\})
			
			beforeAll(async () => \{
			    fse.emptyDirSync(__dirname + '/temp')
			    await buildtimeInstance.start()
			\})
			
			test('buildtime node can see own meta', async () => \{
			    const rootNode = Object.values(buildtimeInstance.rootNodes)[0]
			    expect(rootNode.meta.plain).toBe('Im plain')
			    expect(rootNode.meta.function()).toBe('Im a function')
			\})
			
			test('buildtime node can see parents scoped meta and own meta', async () => \{
			    const node = buildtimeInstance.nodeIndex.find(c => c.name === 'page').children[0]
			    expect(node.name).toBe('hello')
			    expect(node.meta.plain).toBeFalsy()
			    expect(node.meta.function).toBeFalsy()
			    expect(node.meta.overwritten).toBe('new value')
			\})
			
			test('runtime node can see own meta', async () => \{
			    const \{ default: routes \} = await import('./temp/routes.default.js')
			    const instance = new RoutifyRuntime(\{ routes \})
			    const rootNode = Object.values(instance.rootNodes)[0]
			    expect(rootNode.meta.plain).toBe('Im plain')
			\})
			
			test('runtime node can see parents scoped meta', async () => \{
			    const \{ default: routes \} = await import('./temp/routes.default.js')
			    const instance = new RoutifyRuntime(\{ routes \})
			    const node = instance.nodeIndex.find(c => c.name === 'page').children[0]
			    expect(node.meta.plain).toBeFalsy()
			    expect(node.meta.function).toBeFalsy()
			    // todo should we support functions?
			    expect(node.meta.overwritten).toBe('new value')
			\})
			
			test('split metadata gets compiled', async () => \{
			    const \{ default: routes \} = await import('./temp/routes.default.js')
			    const instance = new RoutifyRuntime(\{ routes \})
			    const node = instance.nodeIndex.find(c => c.name === 'compiled')
			    expect(node.meta.plain).toBe('Im plain')
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\integration\\meta\\meta.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('roxiness_routify\\test\\integration\\routify\\routify.test.js', () => {
        const sourceCode = `
			import \{ RoutifyBuildtime \} from '../../../lib/buildtime/RoutifyBuildtime.js'
			import \{ createDirname \} from '../../../lib/buildtime/utils.js'
			import \{ resolve \} from 'path'
			import \{ readFileSync \} from 'fs'
			
			const __dirname = createDirname(import.meta)
			
			test('can run routify with bundled plugins', async () => \{
			    const instance = new RoutifyBuildtime(\{
			        routifyDir: resolve(__dirname, 'temp', '.routify'),
			        routesDir: resolve(__dirname, 'example'),
			    \})
			    await instance.start()
			    expect(
			        readFileSync(
			            resolve(__dirname, 'temp', '.routify', 'routes.default.js'),
			            'utf-8',
			        ),
			    ).toMatchSnapshot('routify')
			
			    expect(
			        readFileSync(
			            resolve(__dirname, 'temp', '.routify', 'bundles', '_default_admin-bundle.js'),
			            'utf-8',
			        ),
			    ).toMatchSnapshot('bundles')
			\})
			
			test('can transform output files', async () => \{
			    const bundlePath = resolve(
			        __dirname,
			        'temp',
			        '.routify-transform',
			        'bundles',
			        '_default_admin-bundle.js',
			    )
			
			    const baseInstance = new RoutifyBuildtime(\{
			        routifyDir: resolve(__dirname, 'temp', '.routify-transform'),
			        routesDir: resolve(__dirname, 'example'),
			    \})
			    await baseInstance.start()
			
			    let baseExpectedContent = readFileSync(bundlePath, 'utf-8')
			    expect(baseExpectedContent).toMatchSnapshot('routify-transform')
			
			    let ids = []
			
			    const emptyTransformInstance = new RoutifyBuildtime(\{
			        routifyDir: resolve(__dirname, 'temp', '.routify-transform'),
			        routesDir: resolve(__dirname, 'example'),
			        plugins: [
			            \{
			                transform: (id, content) => \{
			                    ids.push(id)
			                \},
			            \},
			        ],
			    \})
			
			    await emptyTransformInstance.start()
			
			    expect(ids[0]).toMatch(/_default_admin-bundle.js\$/)
			    expect(ids[1]).toMatch(/routes.default.js\$/)
			    expect(ids[2]).toMatch(/instance.default.js\$/)
			
			    const emptyTransformExpectedContent = readFileSync(bundlePath, 'utf-8')
			    expect(emptyTransformExpectedContent).toEqual(baseExpectedContent)
			
			    const transformInstance = new RoutifyBuildtime(\{
			        routifyDir: resolve(__dirname, 'temp', '.routify-transform'),
			        routesDir: resolve(__dirname, 'example'),
			        plugins: [
			            \{
			                transform: (id, content) => content + '\\nhello',
			            \},
			        ],
			    \})
			    await transformInstance.start()
			    const transformExpectedContent = readFileSync(bundlePath, 'utf-8')
			    expect(transformExpectedContent).toEqual(baseExpectedContent + '\\nhello')
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\integration\\routify\\routify.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('roxiness_routify\\test\\integration\\routify-runtime\\routify.test.js', () => {
        const sourceCode = `
			import \{ RoutifyRuntime \} from '../../../lib/runtime/Instance/RoutifyRuntime.js'
			
			test('RoutifyRuntimes uses RNodeRuntime', async () => \{
			    const instance = new RoutifyRuntime(\{\})
			    const child = instance.createNode('test')
			    expect(child.constructor.name).toBe('RNodeRuntime')
			\})
			
			test('RNodeRuntime has regex prop', async () => \{
			    const instance = new RoutifyRuntime(\{\})
			    const child = instance.createNode('test')
			    expect(child.regex).toBeTruthy()
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\integration\\routify-runtime\\routify.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('roxiness_routify\\test\\integration\\watcher\\watcher.test.js', () => {
        const sourceCode = `
			import \{ RoutifyBuildtime \} from '../../../lib/buildtime/RoutifyBuildtime.js'
			import \{ createDirname \} from '../../../lib/buildtime/utils.js'
			import \{ resolve \} from 'path'
			import \{ unlinkSync, writeFileSync \} from 'fs'
			import fse from 'fs-extra'
			
			const __dirname = createDirname(import.meta)
			
			/** @type \{RoutifyBuildtime\} */
			let instance
			
			beforeAll(async () => \{
			    fse.emptyDirSync(resolve(__dirname, 'example', 'temp'))
			    fse.emptyDirSync(resolve(__dirname, 'temp'))
			
			    instance = new RoutifyBuildtime(\{
			        routifyDir: resolve(__dirname, 'temp', '.routify'),
			        routesDir: resolve(__dirname, 'example'),
			        watch: true,
			    \})
			    await instance.start()
			\})
			
			afterAll(async () => \{
			    await instance.close()
			\})
			
			const filepath = resolve(__dirname, 'example', 'temp', 'NewFile.svelte')
			const renamedFilepath = resolve(__dirname, 'example', 'temp', 'NewFile2.svelte')
			
			test('detects new files', async () => \{
			    expect(Object.values(instance.rootNodes)[0].descendants.length).toBe(3)
			    writeFileSync(filepath, '<!-- hello -->')
			    await new Promise(resolve => instance.on.buildComplete(resolve))
			    expect(Object.values(instance.rootNodes)[0].descendants.length).toBe(4)
			\})
			
			test('detects removed files', async () => \{
			    expect(Object.values(instance.rootNodes)[0].descendants.length).toBe(4)
			    unlinkSync(filepath)
			    await new Promise(resolve => instance.on.buildComplete(resolve))
			    expect(Object.values(instance.rootNodes)[0].descendants.length).toBe(3)
			\})
			
			test('detects renamed files', async () => \{
			    writeFileSync(filepath, '<!-- hello -->')
			    await new Promise(resolve => instance.on.buildComplete(resolve))
			    expect(Object.values(instance.rootNodes)[0].descendants.length).toBe(4)
			    fse.renameSync(filepath, renamedFilepath)
			    await new Promise(resolve => instance.on.buildComplete(resolve))
			    // required
			    await new Promise(resolve => setTimeout(resolve, 50))
			    expect(
			        Object.values(instance.rootNodes)[0].descendants.find(
			            node => node.name === 'NewFile2',
			        ),
			    ).toBeTruthy()
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\integration\\watcher\\watcher.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('roxiness_routify\\test\\unit\\bundler\\bundler.test.js', () => {
        const sourceCode = `
			import \{ dirname \} from 'path'
			import \{ fileURLToPath \} from 'url'
			
			import \{ readFileSync \} from 'fs'
			import \{ filemapper \} from '../../../lib/buildtime/plugins/filemapper/lib/index.js'
			import \{ createBundles \} from '../../../lib/buildtime/plugins/bundler/bundler.js'
			import \{ metaFromFile \} from '../../../lib/buildtime/plugins/metaFromFile/metaFromFile.js'
			import \{ RoutifyBuildtime \} from '../../../lib/buildtime/RoutifyBuildtime.js'
			
			const __dirname = dirname(fileURLToPath(import.meta.url))
			
			const options = \{
			    routesDir: \{ default: \`\$\{__dirname\}/example\` \},
			    filemapper: \{
			        moduleFiles: ['_module.svelte', '_reset.svelte'],
			        resetFiles: ['_reset.svelte'],
			    \},
			\}
			
			const instance = new RoutifyBuildtime(options)
			test('bundler writes files', async () => \{
			    await filemapper(\{ instance \})
			    await metaFromFile(\{ instance \})
			    await createBundles(Object.values(instance.rootNodes)[0], __dirname + '/temp')
			
			    expect(
			        readFileSync(__dirname + '/temp/bundles/_default_admin-bundle.js', 'utf-8'),
			    ).toBe(
			        "export * as _default_admin from '../../example/admin/_reset.svelte'" +
			            "\\nexport * as _default_admin_index_svelte from '../../example/admin/index.svelte'" +
			            "\\nexport * as _default_admin_page_svelte from '../../example/admin/page.svelte'",
			    )
			\})
			
			test('bundled files have correct module', () => \{
			    const adminNode = instance.nodeIndex.find(node => node.name === 'admin')
			
			    const adminImports = [adminNode, ...adminNode.descendants].map(
			        node => node.asyncModule,
			    )
			
			    expect(adminImports).toEqual([
			        '() => import("./bundles/_default_admin-bundle.js").then(r => r._default_admin)::_EVAL',
			        '() => import("./bundles/_default_admin-bundle.js").then(r => r._default_admin_index_svelte)::_EVAL',
			        '() => import("./bundles/_default_admin-bundle.js").then(r => r._default_admin_page_svelte)::_EVAL',
			    ])
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\unit\\bundler\\bundler.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('roxiness_routify\\test\\unit\\exporter\\exporter.test.js', () => {
        const sourceCode = `
			import fse from 'fs-extra'
			import \{ dirname, resolve \} from 'path'
			import \{ fileURLToPath \} from 'url'
			import \{ exportNode \} from '../../../lib/buildtime/plugins/exporter/exporter.js'
			import \{ filemapper \} from '../../../lib/buildtime/plugins/filemapper/lib/index.js'
			import \{ RoutifyBuildtime \} from '../../../lib/buildtime/RoutifyBuildtime.js'
			
			const __dirname = dirname(fileURLToPath(import.meta.url))
			const options = \{
			    routesDir: \{ default: __dirname + '/example' \},
			\}
			
			const instance = new RoutifyBuildtime(options)
			
			test('can build route tree', async () => \{
			    await filemapper(\{ instance \})
			    expect(Object.values(instance.rootNodes)[0].descendants.length).toEqual(8)
			\})
			
			test('can export a route tree', async () => \{
			    await exportNode(Object.values(instance.rootNodes)[0], __dirname + '/temp/.routify')
			    const content = fse.readFileSync(
			        resolve(__dirname, 'temp/.routify', 'routes.default.js'),
			        'utf-8',
			    )
			    expect(content).toMatchSnapshot()
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\unit\\exporter\\exporter.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('roxiness_routify\\test\\unit\\filemapper\\filemapper.test.js', () => {
        const sourceCode = `
			import \{ dirname \} from 'path'
			import \{ fileURLToPath \} from 'url'
			import \{ createNodesFromFiles \} from '../../../lib/buildtime/plugins/filemapper/lib/utils/createNodesFromFiles.js'
			import \{ moveModuleToParentNode \} from '../../../lib/buildtime/plugins/filemapper/lib/utils/moveModuleToParentNode.js'
			import \{ filenameToOptions \} from '../../../lib/buildtime/plugins/filemapper/lib/utils/filenameToOptions.js'
			import \{ filemapper \} from '../../../lib/buildtime/plugins/filemapper/lib/index.js'
			import \{ RoutifyBuildtime \} from '../../../lib/buildtime/RoutifyBuildtime.js'
			
			const __dirname = dirname(fileURLToPath(import.meta.url))
			
			const options = \{
			    routesDir: \{ default: \`\$\{__dirname\}/example/routes\` \},
			    filemapper: \{
			        moduleFiles: ['_module.svelte', '_reset.svelte'],
			        resetFiles: ['_reset.svelte'],
			    \},
			\}
			
			const instance = new RoutifyBuildtime(options)
			
			let rootNode = instance.createNode()
			rootNode.rootName = 'default'
			
			test('files are mapped', async () => \{
			    await createNodesFromFiles(rootNode, options.routesDir.default)
			    expect(instance.nodeIndex.length).toBe(12)
			    expect(rootNode).toMatchSnapshot('1.filemap-only')
			\})
			
			test('modules are merged with parent node', async () => \{
			    moveModuleToParentNode(rootNode)
			    expect(instance.nodeIndex.length).toBe(10)
			    expect(rootNode).toMatchSnapshot('2.filemap-with-modules')
			\})
			
			test('options get added', async () => \{
			    filenameToOptions(rootNode)
			    expect(rootNode).toMatchSnapshot('3.filemap-with-resets')
			\})
			
			test('filemapper', async () => \{
			    const instance = new RoutifyBuildtime(options)
			    await filemapper(\{ instance \})
			    expect(Object.values(instance.rootNodes)[0]).toMatchSnapshot(
			        '4.filemap-with-components',
			    )
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\unit\\filemapper\\filemapper.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('roxiness_routify\\test\\unit\\importer\\importer.test.js', () => {
        const sourceCode = `
			import \{ RoutifyRuntime \} from '../../../lib/runtime/Instance/RoutifyRuntime.js'
			
			const exported = \{
			    meta: \{
			        aString: 'my-string',
			    \},
			    module: '_default',
			    id: '_default',
			    rootName: 'default',
			    file: \{ path: 'test/unit/exporter/example/_module.svelte' \},
			    children: [
			        \{
			            meta: \{ reset: true \},
			            module: '_default_admin',
			            id: '_default_admin',
			            name: 'admin',
			            file: \{ path: 'test/unit/exporter/example/admin/_reset.svelte' \},
			            children: [],
			        \},
			    ],
			\}
			
			test('importTree', () => \{
			    const instance = new RoutifyRuntime(\{\})
			    instance.rootNodes.default = instance.createNode().importTree(exported)
			
			    expect(Object.values(instance.rootNodes)[0].id).toBe('_default')
			    expect(Object.values(instance.rootNodes)[0].children[0].id).toBe('_default_admin')
			\})
			
			test('can import', () => \{
			    const instance = new RoutifyRuntime(\{ routes: exported \})
			    expect(Object.values(instance.rootNodes).length).toBe(1)
			    expect(Object.values(instance.rootNodes)[0].id).toBe('_default')
			    expect(Object.values(instance.rootNodes)[0].children[0].id).toBe('_default_admin')
			\})
			
			test('nodes created by instance have correct constructor', () => \{
			    const instance = new RoutifyRuntime(\{ routes: exported \})
			    const child = instance.createNode('test')
			    expect(child.constructor.name).toBe('RNodeRuntime')
			\})
			
			test('imported nodes have correct constructor', () => \{
			    const instance = new RoutifyRuntime(\{ routes: exported \})
			    expect(Object.values(instance.rootNodes)[0].constructor.name).toBe('RNodeRuntime')
			\})
			
			test('meta is imported', () => \{
			    const instance = new RoutifyRuntime(\{ routes: exported \})
			    const \{ meta \} = Object.values(instance.rootNodes)[0]
			    expect(meta.aString).toEqual(exported.meta.aString)
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\unit\\importer\\importer.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('roxiness_routify\\test\\unit\\instance\\instance.test.js', () => {
        const sourceCode = `
			import \{ RNodeBuildtime \} from '../../../lib/buildtime/RNodeBuildtime.js'
			import \{ RoutifyBuildtime \} from '../../../lib/buildtime/RoutifyBuildtime.js'
			
			/** @type \{RoutifyBuildtime\} */
			let instance
			/** @type \{RNodeBuildtime\} */
			let rootNode
			
			test('new instance has one empty super node', () => \{
			    instance = new RoutifyBuildtime(\{\})
			    expect(instance.nodeIndex.length).toBe(0)
			\})
			
			// test('super node has no descendants', () => \{
			//     expect(instance.superNode.descendants.length).toBe(0)
			// \})
			
			test('can create node', () => \{
			    rootNode = instance.createNode('firstRoot')
			    expect(rootNode.name).toBe('firstRoot')
			\})
			
			test('new node is in nodeIndex', () => \{
			    expect(instance.nodeIndex.length).toBe(1)
			    expect(instance.nodeIndex[0]).toBe(rootNode)
			\})
			
			// todo readd?
			// test("rootNodes' children do not bleed over", () => \{
			//     const rootNode2 = instance.createNode('rootNode2')
			//     instance.superNode.appendChild(rootNode2)
			//     const childNode = instance.createNode('childNode')
			//     Object.values(instance.rootNodes)[0].appendChild(childNode)
			
			//     expect(instance.nodeIndex.length).toBe(4)
			//     expect(rootNode.children[0]).toBe(childNode)
			//     expect(rootNode2.children.length).toBe(0)
			// \})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\unit\\instance\\instance.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('roxiness_routify\\test\\unit\\node\\node.test.js', () => {
        const sourceCode = `
			import \{ RoutifyBuildtime \} from '../../../lib/buildtime/RoutifyBuildtime.js'
			
			const instance = new RoutifyBuildtime(\{\})
			const node = instance.createNode('my-node')
			
			test('can create node', async () => \{
			    expect(node.name).toBe('my-node')
			\})
			
			test('can appendChild', async () => \{
			    const child = instance.createNode('appended-child')
			    node.appendChild(child)
			    expect(node.children[0].name).toBe('appended-child')
			\})
			
			test('can createChild', async () => \{
			    node.createChild('created-child')
			    expect(node.children[1].name).toBe('created-child')
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\unit\\node\\node.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('roxiness_routify\\test\\unit\\routify\\plugins.test.js', () => {
        const sourceCode = `
			import \{ RoutifyRuntime \} from '../../../lib/runtime/Instance/RoutifyRuntime.js'
			
			// todo should instance plugins be readded?
			test('dummy', () => \{\})
			
			// /**
			//  * @type \{RoutifyPlugin\}
			//  */
			// const aPlugin = \{
			//     init: (\{ instance \}) => \{
			//         const node = instance.createNode('my-node')
			//         instance.superNode.appendChild(node)
			//     \},
			// \}
			// /**
			//  * @type \{RoutifyPlugin\}
			//  */
			// const anotherPlugin = \{
			//     init: (\{ instance \}) => \{
			//         const node = instance.createNode('my-2nd-node')
			//         instance.superNode.appendChild(node)
			//     \},
			// \}
			
			// test('can run plugin', async () => \{
			//     const instance = new RoutifyRuntime(\{
			//         plugins: [aPlugin],
			//     \})
			//     await instance.start()
			//     expect(instance.superNode.descendants[0]).toBeTruthy()
			//     expect(instance.superNode.descendants[0].name).toBe('my-node')
			// \})
			
			// test('can run multiple plugins', async () => \{
			//     const instance = new RoutifyRuntime(\{
			//         plugins: [aPlugin, anotherPlugin],
			//     \})
			//     await instance.start()
			//     expect(instance.superNode.descendants[0].name).toBe('my-node')
			//     expect(instance.superNode.descendants[1].name).toBe('my-2nd-node')
			// \})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\unit\\routify\\plugins.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('roxiness_routify\\test\\unit\\routify\\sortPlugins.test.js', () => {
        const sourceCode = `
			import \{ normalizePlugins, sortPlugins \} from '../../../lib/common/utils.js'
			
			test('sortPlugins can sort plugins', async () => \{
			    const plugins = [
			        \{ name: 'third', after: 'second' \},
			        \{ name: 'second' \},
			        \{ name: 'first', before: 'second' \},
			    ]
			
			    const res = sortPlugins(normalizePlugins(plugins))
			    expect(res.map(p => p.name).join(',')).toBe('first,second,third')
			\})
			
			test('sortPlugins preserves order when possible', async () => \{
			    const plugins = [
			        \{ name: 'second', after: 'first' \},
			        \{ name: 'first' \},
			        \{ name: 'fourth' \},
			        \{ name: 'fifth' \},
			        \{ name: 'third', before: 'fourth' \},
			        \{ name: 'sixth' \},
			    ]
			
			    const res = sortPlugins(normalizePlugins(plugins))
			    expect(res.map(p => p.name).join(',')).toBe('first,second,third,fourth,fifth,sixth')
			\})
			
			test('sortPlugins reports loops', async () => \{
			    const plugins = [
			        \{ name: 'third', after: 'second' \},
			        \{ name: 'second' \},
			        \{ name: 'first', before: 'second' \},
			        \{ name: 'impossible', before: 'second', after: 'third' \},
			    ]
			
			    try \{
			        sortPlugins(normalizePlugins(plugins))
			    \} catch (err) \{
			        expect(err.message).toBe(
			            'found infinite loop in plugins. Repeating pattern:\\n' +
			                'impossible (before: second; after: third )\\n' +
			                'third ( after: second )\\n' +
			                'second ',
			        )
			    \}
			\})
			`

		const tests = extractFromSource(sourceCode, 'roxiness_routify\\test\\unit\\routify\\sortPlugins.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
});
