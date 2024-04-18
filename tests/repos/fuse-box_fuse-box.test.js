const { extractFromSource } = require('../../src/extractor');

describe('fuse-box_fuse-box', () => {
    it('fuse-box_fuse-box\\playground\\angular_playground\\src\\app\\app.component.spec.ts', () => {
        const sourceCode = `
			import \{ TestBed, async \} from '@angular/core/testing';
			import \{ RouterTestingModule \} from '@angular/router/testing';
			import \{ AppComponent \} from './app.component';
			
			describe('AppComponent', () => \{
			  beforeEach(async(() => \{
			    TestBed.configureTestingModule(\{
			      imports: [
			        RouterTestingModule
			      ],
			      declarations: [
			        AppComponent
			      ],
			    \}).compileComponents();
			  \}));
			
			  it('should create the app', () => \{
			    const fixture = TestBed.createComponent(AppComponent);
			    const app = fixture.debugElement.componentInstance;
			    expect(app).toBeTruthy();
			  \});
			
			  it(\`should have as title 'hello'\`, () => \{
			    const fixture = TestBed.createComponent(AppComponent);
			    const app = fixture.debugElement.componentInstance;
			    expect(app.title).toEqual('hello');
			  \});
			
			  it('should render title', () => \{
			    const fixture = TestBed.createComponent(AppComponent);
			    fixture.detectChanges();
			    const compiled = fixture.debugElement.nativeElement;
			    expect(compiled.querySelector('.content span').textContent).toContain('hello app is running!');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\playground\\angular_playground\\src\\app\\app.component.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('fuse-box_fuse-box\\src\\bundle\\__tests__\\bundleRouter.test.ts', () => {
        const sourceCode = `
			import \{ createIntegrationTest, createTestWorkspace \} from '../../testUtils/integrationTest';
			import \{ ITestBrowserResponse \} from '../../testUtils/browserEnv/testBrowserEnv';
			import * as path from 'path';
			import \{ EnvironmentType \} from '../../config/EnvironmentType';
			
			describe('Bundle router test', () => \{
			  describe('When no bundle configuration is provided', () => \{
			    let test;
			    beforeAll(() => \{
			      test = async (workspace): Promise<ITestBrowserResponse> => \{
			        const test = createIntegrationTest(\{
			          config: \{
			            cache: \{ enabled: true, strategy: 'fs' \},
			            entry: path.join(workspace.sourceDir, 'index.ts'),
			            target: 'browser',
			          \},
			          envType: EnvironmentType.PRODUCTION,
			          workspace,
			        \});
			
			        const response = await test.runProd();
			        return await response.runBrowser();
			      \};
			    \});
			    afterAll(() => \{
			      test = null;
			    \});
			    describe('And does not include mappings', () => \{
			      it('should create a single app bundle', async done => \{
			        const workspace = createTestWorkspace(\{
			          files: \{
			            'foo.ts': 'export const foo = "foo"',
			            'index.ts': \`
			              import * as foo from "./foo"
			              (() => import("@scope/package"))();
			              import 'package';
			              const data = \{ foo \}
			              export \{ data \}\`,
			          \},
			          modules: \{
			            '@scope/package': \{
			              'component.ts': 'export const packageName = "@scoped/package"',
			              'index.ts': 'export * from "./component"',
			              'package.json': JSON.stringify(\{
			                main: 'index.ts',
			                name: '@scope/package',
			                version: '1.0.0',
			              \}),
			            \},
			            package: \{
			              'component.ts': 'export const packageName = "package"',
			              'index.ts': 'export * from "./component"',
			              'package.json': JSON.stringify(\{
			                main: 'index.ts',
			                name: 'package',
			                version: '1.0.0',
			              \}),
			            \},
			          \},
			        \});
			        const result = await test(workspace);
			        expect(result.runResponse.bundles.length).toEqual(1);
			        const appBundle = result.runResponse.bundles.find(b => b.relativePath == 'app.js');
			        expect(appBundle).toBeDefined();
			        expect(appBundle.bundle.contents.indexOf('packageName = "@scoped/package";')).toBeGreaterThan(-1);
			        expect(appBundle.bundle.contents.indexOf('packageName = "package";')).toBeGreaterThan(-1);
			
			        done();
			      \});
			    \});
			  \});
			  describe('When bundle configuration is provided', () => \{
			    let test;
			    beforeAll(() => \{
			      test = async (workspace, runProps): Promise<ITestBrowserResponse> => \{
			        const test = createIntegrationTest(\{
			          config: \{
			            cache: \{ enabled: true, strategy: 'fs' \},
			            entry: path.join(workspace.sourceDir, 'index.ts'),
			            target: 'browser',
			          \},
			          envType: EnvironmentType.PRODUCTION,
			          workspace,
			          runProps,
			        \});
			
			        const response = await test.runProd();
			        return await response.runBrowser();
			      \};
			    \});
			    afterAll(() => \{
			      test = null;
			    \});
			    describe('And does not include mappings', () => \{
			      it('should create an app and vendor bundle', async done => \{
			        const workspace = createTestWorkspace(\{
			          files: \{
			            'foo.ts': 'export const foo = "foo"',
			            'index.ts': \`
			              import * as foo from "./foo"
			              (() => import("@scope/package"))();
			              import 'package';
			              const data = \{ foo \}
			              export \{ data \}\`,
			          \},
			          modules: \{
			            '@scope/package': \{
			              'component.ts': 'export const packageName = "@scoped/package"',
			              'index.ts': 'export * from "./component"',
			              'package.json': JSON.stringify(\{
			                main: 'index.ts',
			                name: '@scope/package',
			                version: '1.0.0',
			              \}),
			            \},
			            package: \{
			              'component.ts': 'export const packageName = "package"',
			              'index.ts': 'export * from "./component"',
			              'package.json': JSON.stringify(\{
			                main: 'index.ts',
			                name: 'package',
			                version: '1.0.0',
			              \}),
			            \},
			          \},
			        \});
			        const result = await test(workspace, \{
			          bundles: \{
			            app: './app.js',
			            vendor: './vendor.js',
			          \},
			        \});
			        expect(result.runResponse.bundles.length).toEqual(2);
			        expect(result.runResponse.bundles.find(b => b.relativePath == 'app.js')).toBeDefined();
			        const vendorBundle = result.runResponse.bundles.find(b => b.relativePath == 'vendor.js');
			        expect(vendorBundle).toBeDefined();
			        expect(vendorBundle.bundle.contents.indexOf('packageName = "@scoped/package";')).toBeGreaterThan(-1);
			        expect(vendorBundle.bundle.contents.indexOf('packageName = "package";')).toBeGreaterThan(-1);
			        done();
			      \});
			    \});
			    describe('And includes mappings', () => \{
			      it('should create an app and vendor bundle and as many vendor bundles as mappings are defined', async done => \{
			        const workspace = createTestWorkspace(\{
			          files: \{
			            'foo.ts': 'export const foo = "foo"',
			            'index.ts': \`
			              import * as foo from "./foo"
			              (() => import("@scope/package"))();
			              import 'package';
			              import 'vendor';
			              const data = \{ foo \}
			              export \{ data \}\`,
			          \},
			          modules: \{
			            '@scope/package': \{
			              'component.ts': 'export const packageName = "@scoped/package"',
			              'index.ts': 'export * from "./component"',
			              'package.json': JSON.stringify(\{
			                main: 'index.ts',
			                name: '@scope/package',
			                version: '1.0.0',
			              \}),
			            \},
			            package: \{
			              'component.ts': 'export const packageName = "package"',
			              'index.ts': 'export * from "./component"',
			              'package.json': JSON.stringify(\{
			                main: 'index.ts',
			                name: 'package',
			                version: '1.0.0',
			              \}),
			            \},
			            vendor: \{
			              'component.ts': 'export const packageName = "vendor"',
			              'index.ts': 'export * from "./component"',
			              'package.json': JSON.stringify(\{
			                main: 'index.ts',
			                name: 'vendor',
			                version: '1.0.0',
			              \}),
			            \},
			          \},
			        \});
			        const result = await test(workspace, \{
			          bundles: \{
			            app: './app.js',
			            mapping: [
			              \{ matching: '@scope*', target: './vendor.scoped.js' \},
			              \{ matching: 'package', target: './vendor.module.js' \},
			            ],
			            vendor: './vendor.js',
			          \},
			        \});
			        expect(result.runResponse.bundles.length).toEqual(4);
			        expect(result.runResponse.bundles.find(b => b.relativePath == 'app.js')).toBeDefined();
			        const scopedBundle = result.runResponse.bundles.find(b => b.relativePath == 'vendor.scoped.js');
			        expect(scopedBundle).toBeDefined();
			        expect(scopedBundle.bundle.contents.indexOf('packageName = "@scoped/package";')).toBeGreaterThan(-1);
			        expect(result.runResponse.bundles.find(b => b.relativePath == 'vendor.module.js')).toBeDefined();
			        expect(result.runResponse.bundles.find(b => b.relativePath == 'vendor.js')).toBeDefined();
			
			        done();
			      \});
			    \});
			  \});
			
			  describe('When css bundle created', () => \{
			    let test;
			    beforeAll(() => \{
			      test = async (workspace, runProps): Promise<ITestBrowserResponse> => \{
			        const test = createIntegrationTest(\{
			          config: \{
			            cache: \{ enabled: true, strategy: 'fs' \},
			            entry: path.join(workspace.sourceDir, 'index.ts'),
			            target: 'browser',
			          \},
			          envType: EnvironmentType.PRODUCTION,
			          workspace,
			          runProps,
			        \});
			
			        const response = await test.runProd();
			        return await response.runBrowser();
			      \};
			    \});
			    afterAll(() => \{
			      test = null;
			    \});
			    it('css bundle should be resolved in the order in which they were called', async done => \{
			      const workspace = createTestWorkspace(\{
			        files: \{
			          'foo.ts': \`
			            import "./a.css";
			            import "./b.css";
			            import "./c.css";
			          \`,
			          'index.ts': \`
			            import "./foo.ts"
			            import "./d.css"
			          \`,
			          'a.css': \`
			            body \{font-size: 1px;\}
			          \`,
			          'b.css': \`
			            body \{font-size: 2px;\}
			          \`,
			          'c.css': \`
			            body \{font-size: 3px;\}
			          \`,
			          'd.css': \`
			            body \{font-size: 4px;\}
			          \`,
			        \},
			      \});
			      const result = await test(workspace, \{
			        bundles: \{
			          app: './app.js',
			        \},
			      \});
			
			      const cssBundle = result.runResponse.bundles.find(b => /\\.css\$/.test(b.relativePath));
			      expect(cssBundle).toBeDefined();
			      expect(cssBundle.bundle.contents).toEqual("body\{font-size:1px\}body\{font-size:2px\}body\{font-size:3px\}body\{font-size:4px\}");
			      done();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\bundle\\__tests__\\bundleRouter.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('fuse-box_fuse-box\\src\\bundleRuntime\\__tests__\\bundleRuntimeCore.test.ts', () => {
        const sourceCode = `
			import \{ bundleRuntimeCore, BUNDLE_RUNTIME_NAMES \} from '../bundleRuntimeCore';
			
			describe('Bundle runtime core test', () => \{
			  function run(code: string, expose: 'window' | 'global'): any \{
			    const obj = \{ __env: expose \};
			    var res = new Function(expose, code);
			    res(obj);
			
			    return obj;
			  \}
			
			  function runIsolated(code: string): any \{
			    const obj = \{\};
			    code += \`\\n__injected.exposed = \$\{BUNDLE_RUNTIME_NAMES.GLOBAL_OBJ\}\`;
			    var res = new Function('__injected', code);
			    res(obj);
			    return obj;
			  \}
			  const Name = BUNDLE_RUNTIME_NAMES.GLOBAL_OBJ;
			
			  describe('Target integrity', () => \{
			    it('should create browser env ', () => \{
			      const code = bundleRuntimeCore(\{ target: 'browser', isIsolated: false \});
			
			      const result = run(code, 'window');
			
			      expect(result[Name]).toBeTruthy();
			      expect(result[Name].modules).toEqual(\{\});
			    \});
			
			    it('should create electron env ', () => \{
			      const code = bundleRuntimeCore(\{ target: 'electron', isIsolated: false \});
			      const result = run(code, 'window');
			
			      expect(result[Name]).toBeTruthy();
			      expect(result[Name].modules).toEqual(\{\});
			    \});
			
			    it('should create server env', () => \{
			      const code = bundleRuntimeCore(\{ target: 'server', isIsolated: false \});
			      const result = run(code, 'global');
			
			      expect(result[Name]).toBeTruthy();
			      expect(result[Name].modules).toEqual(\{\});
			    \});
			
			    it('should create an isolated browser env ', () => \{
			      const code = bundleRuntimeCore(\{ target: 'browser', isIsolated: true \});
			      const result = runIsolated(code);
			      expect(result.exposed.modules).toBeTruthy();
			    \});
			
			    it('should create an isolated env despite isIsolated false', () => \{
			      const code = bundleRuntimeCore(\{ target: 'web-worker', isIsolated: false \});
			      const result = runIsolated(code);
			      expect(result.exposed.modules).toBeTruthy();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\bundleRuntime\\__tests__\\bundleRuntimeCore.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('fuse-box_fuse-box\\src\\bundleRuntime\\__tests__\\bundleSource.test.ts', () => {
        const sourceCode = `
			import \{ BUNDLE_RUNTIME_NAMES, bundleRuntimeCore, IBundleRuntimeCore \} from '../bundleRuntimeCore';
			import \{ createBundleSource \} from '../bundleSource';
			
			const Fuse = BUNDLE_RUNTIME_NAMES.GLOBAL_OBJ;
			const RequireFunc = BUNDLE_RUNTIME_NAMES.REQUIRE_FUNCTION;
			
			function createInteropCall(args) \{
			  return Fuse + '.' + BUNDLE_RUNTIME_NAMES.INTEROP_REQUIRE_DEFAULT_FUNCTION + '(' + JSON.stringify(args) + ');';
			\}
			describe('Bundle source test', () => \{
			  function runWithoutApi(code: string, props?: IBundleRuntimeCore): any \{
			    props = props || \{ target: 'browser' \};
			
			    const globalObj = props.target === 'browser' || props.target === 'electron' ? 'window' : 'global';
			    const serverExports = \{\};
			    const obj = \{\};
			    const api = bundleRuntimeCore(props);
			    code = api + \`\\n var \$\{Fuse\} = \$\{globalObj\}.\$\{Fuse\};\\n\` + code;
			
			    var res = new Function(globalObj, 'exports', code);
			    res(obj, props.target === 'server' ? serverExports : undefined);
			    return \{
			      obj,
			      serverExports,
			      req: (num: number) => \{
			        return obj[Fuse][RequireFunc](num);
			      \},
			    \};
			  \}
			
			  describe('Generic require', () => \{
			    it('should execute 1 file', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			      source.modules = [\{ contents: 'exports.Foo = "bar"', id: 1 \}];
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ req \} = runWithoutApi(result.content.toString());
			      expect(req(1)).toEqual(\{ Foo: 'bar' \});
			    \});
			
			    it('should execute first file having 2 files', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			      source.modules = [
			        \{ contents: 'exports.Foo = "bar"', id: 1 \},
			        \{ contents: 'exports.Second = true', id: 2 \},
			      ];
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ req \} = runWithoutApi(result.content.toString());
			      expect(req(1)).toEqual(\{ Foo: 'bar' \});
			      expect(req(2)).toEqual(\{ Second: true \});
			    \});
			
			    it('should execute 1 file only once', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			      source.modules = [
			        \{
			          contents: \`
			            let counter = 0;
			            exports.counter = ++counter\`,
			          id: 1,
			        \},
			      ];
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ req \} = runWithoutApi(result.content.toString());
			      expect(req(1)).toEqual(\{ counter: 1 \});
			      expect(req(1)).toEqual(\{ counter: 1 \});
			    \});
			  \});
			
			  describe('Bundle entries', () => \{
			    it('should call entry 1', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			
			      source.modules = [
			        \{
			          contents: \`window.wasCalled = true;\`,
			          id: 1,
			        \},
			      ];
			      source.entries = [\{ id: 1 \}];
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ obj \} = runWithoutApi(result.content.toString());
			      expect(obj.wasCalled).toEqual(true);
			    \});
			
			    it('should call 2 entries', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			
			      source.modules = [
			        \{
			          contents: \`window.FirstCalled = true;\`,
			          id: 1,
			        \},
			        \{
			          contents: \`window.SecondCalled = true;\`,
			          id: 2,
			        \},
			      ];
			      source.entries = [\{ id: 1 \}, \{ id: 2 \}];
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ obj \} = runWithoutApi(result.content.toString());
			      expect(obj.FirstCalled).toEqual(true);
			      expect(obj.SecondCalled).toEqual(true);
			    \});
			
			    it('should polyfil default', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			
			      source.modules = [
			        \{
			          contents: \`window.FirstCalled = \$\{createInteropCall(\{ foo: 'bar' \})\}\`,
			          id: 1,
			        \},
			      ];
			      source.entries = [\{ id: 1 \}];
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ obj \} = runWithoutApi(result.content.toString(), \{ interopRequireDefault: true, target: 'browser' \});
			      expect(obj.FirstCalled.default).toEqual(\{ foo: 'bar' \});
			    \});
			
			    it('should take the existing default (obj)', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			
			      source.modules = [
			        \{
			          contents: \`window.FirstCalled = \$\{createInteropCall(\{ __esModule: true, default: 'bar' \})\}\`,
			          id: 1,
			        \},
			      ];
			      source.entries = [\{ id: 1 \}];
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ obj \} = runWithoutApi(result.content.toString(), \{ interopRequireDefault: true, target: 'browser' \});
			
			      expect(obj.FirstCalled).toEqual(\{ __esModule: true, default: 'bar' \});
			    \});
			
			    it('should take  default (number)', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			
			      source.modules = [
			        \{
			          contents: \`window.FirstCalled = \$\{createInteropCall(1)\}\`,
			          id: 1,
			        \},
			      ];
			      source.entries = [\{ id: 1 \}];
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ obj \} = runWithoutApi(result.content.toString(), \{ interopRequireDefault: true, target: 'browser' \});
			      expect(obj.FirstCalled.default).toEqual(1);
			    \});
			  \});
			
			  describe('Bundle expose', () => \{
			    it('should expose on window with target browser', () => \{
			      const source = createBundleSource(\{ target: 'browser' \});
			
			      source.modules = [
			        \{
			          contents: \`exports.Foo = "bar"\`,
			          id: 1,
			        \},
			      ];
			      source.entries = [\{ id: 1 \}];
			      source.exported = true;
			      const result = source.generate(\{ runtimeCore: null \});
			
			      const \{ obj \} = runWithoutApi(result.content.toString());
			
			      expect(obj['Foo']).toEqual('bar');
			    \});
			
			    it('should expose on window with target electron', () => \{
			      const target = 'electron';
			      const source = createBundleSource(\{ target: target \});
			
			      source.modules = [
			        \{
			          contents: \`exports.Foo = "bar"\`,
			          id: 1,
			        \},
			      ];
			      source.entries = [\{ id: 1 \}];
			      source.exported = true;
			      const result = source.generate(\{ runtimeCore: null \});
			
			      const \{ obj \} = runWithoutApi(result.content.toString(), \{ target \});
			      expect(obj['Foo']).toEqual('bar');
			    \});
			
			    it('should expose using "exports" for server', () => \{
			      const target = 'server';
			      const source = createBundleSource(\{ target: target \});
			
			      source.modules = [
			        \{
			          contents: \`exports.Foo = "bar"\`,
			          id: 1,
			        \},
			      ];
			      source.entries = [\{ id: 1 \}];
			      source.exported = true;
			      const result = source.generate(\{ runtimeCore: null \});
			      const \{ serverExports \} = runWithoutApi(result.content.toString(), \{ target \});
			      expect(serverExports['Foo']).toEqual('bar');
			    \});
			  \});
			
			  describe('Source maps', () => \{
			    it('should write source maps', () => \{
			      const target = 'server';
			      const source = createBundleSource(\{ target: target \});
			
			      const sourceMapObject = \{
			        mappings: ';;;AAEAA,QAAQC,IAAIC,WAAKC;AAEjBH,QAAQC,IAAI;;AAEZD,QAAQC,IAAI',
			        names: ['console', 'log', 'foo_1', 'oi_2'],
			        sources: ['first.js'],
			        sourcesContent: ['console.log(foo)'],
			        version: 3,
			      \};
			      const sourceMapObject2 = \{
			        mappings: ';;;AAEAA,QAAQC,IAAIC,WAAKC;AAEjBH,QAAQC,IAAI;;AAEZD,QAAQC,IAAI',
			        names: ['console', 'log', 'foo_1', 'oi_2'],
			        sources: ['second/index.js'],
			        sourcesContent: ['console.log(foo)'],
			        version: 3,
			      \};
			      source.modules = [
			        \{
			          contents: \`exports.Foo = "bar"\`,
			          id: 1,
			          isSourceMapRequired: true,
			          sourceMap: JSON.stringify(sourceMapObject),
			        \},
			        \{
			          contents: \`exports.Foo = "bar"\`,
			          id: 1,
			          isSourceMapRequired: true,
			          sourceMap: JSON.stringify(sourceMapObject2),
			        \},
			      ];
			      source.expose = [\{ moduleId: 1, name: 'FooLib' \}];
			      const result = source.generate(\{ runtimeCore: null \});
			
			      expect(result.sourceMap).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\bundleRuntime\\__tests__\\bundleSource.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('fuse-box_fuse-box\\src\\cache\\__tests__\\cache.integration.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ EnvironmentType \} from '../../config/EnvironmentType';
			import \{ ITestBrowserResponse \} from '../../testUtils/browserEnv/testBrowserEnv';
			import \{ createIntegrationTest, createTestWorkspace, ITestWorkspace \} from '../../testUtils/integrationTest';
			
			describe('Cache intergation test', () => \{
			  const test = async (workspace): Promise<ITestBrowserResponse> => \{
			    const test = createIntegrationTest(\{
			      config: \{
			        cache: \{ enabled: true, strategy: 'fs' \},
			        entry: path.join(workspace.sourceDir, 'index.ts'),
			        target: 'browser',
			      \},
			      envType: EnvironmentType.DEVELOPMENT,
			      workspace,
			    \});
			
			    const response = await test.runDev();
			    return await response.runBrowser();
			  \};
			
			  describe(\`[ FS ] Workspace simple manupulations\`, () => \{
			    let workspace: ITestWorkspace;
			
			    function initWorkspace() \{
			      return (workspace = createTestWorkspace(\{
			        files: \{
			          'foo.ts': 'export const foo = "foo"',
			          'index.ts': \`
			            import * as foo from "./foo"
			            const data = \{ foo \}
			            export \{ data \}\`,
			        \},
			      \}));
			    \}
			
			    it('should give the initial data', async () => \{
			      await initWorkspace();
			      const result = await test(workspace);
			
			      expect(result.eval().entry().data).toEqual(\{ foo: \{ __esModule: true, foo: 'foo' \} \});
			    \});
			
			    it('after adding a new file should remain the same', async () => \{
			      workspace.setFile('bar.ts', 'export const bar = "bar"');
			      const result = await test(workspace);
			      expect(result.eval().entry().data.foo).toBeTruthy();
			    \});
			
			    it('include bar into foo', async () => \{
			      workspace.setFile(
			        'foo.ts',
			        \`
			          export \{ bar \} from "./bar";
			          export const foo = "foo"
			      \`,
			      );
			      const result = await test(workspace);
			
			      expect(result.eval().entry().data).toEqual(\{ foo: \{ __esModule: true, bar: 'bar', foo: 'foo' \} \});
			    \});
			
			    it('removing bar should yield an error', async () => \{
			      workspace.removeFile('bar.ts');
			      const result = await test(workspace);
			      expect(() => result.eval()).toThrowError();
			    \});
			
			    it('bringing back bar', async () => \{
			      workspace.setFile('bar.ts', 'export const bar = "bar"');
			      const result = await test(workspace);
			      expect(result.eval().entry().data).toEqual(\{ foo: \{ __esModule: true, bar: 'bar', foo: 'foo' \} \});
			    \});
			
			    it('Should modify bar', async () => \{
			      workspace.setFile('bar.ts', 'export const bar = "new_bar"');
			      const result = await test(workspace);
			      expect(result.eval().entry().data).toEqual(\{ foo: \{ __esModule: true, bar: 'new_bar', foo: 'foo' \} \});
			    \});
			
			    it('Should handle recursion', async () => \{
			      workspace.setFile(
			        'bar.ts',
			        \`
			        import \{ mod_1 \} from "./mod_1";
			        export const bar = mod_1()
			      \`,
			      );
			      workspace.setFile(
			        'mod_1.ts',
			        \`
			        import \{ mod_2 \} from "./mod_2";
			        export function mod_1()\{
			          return "mod_1"+ mod_2();
			        \}
			      \`,
			      );
			
			      workspace.setFile(
			        'mod_2.ts',
			        \`
			        import "./mod_1"
			        export function mod_2()\{
			          return "mod_2";
			        \}
			      \`,
			      );
			
			      const result = await test(workspace);
			      expect(result.eval().entry().data).toEqual(\{ foo: \{ __esModule: true, bar: 'mod_1mod_2', foo: 'foo' \} \});
			    \});
			
			    it('Should handle recursion (removing 1)', async () => \{
			      workspace.removeFile('mod_2.ts');
			      const result = await test(workspace);
			      expect(() => result.eval()).toThrowError();
			    \});
			
			    it('Should handle recursion (reverting mode_2)', async () => \{
			      workspace.setFile(
			        'mod_2.ts',
			        \`
			        import "./mod_1"
			        export function mod_2()\{
			          return "mod_2";
			        \}
			      \`,
			      );
			      const result = await test(workspace);
			      expect(result.eval().entry().data).toEqual(\{ foo: \{ __esModule: true, bar: 'mod_1mod_2', foo: 'foo' \} \});
			    \});
			  \});
			
			  describe(\`[ FS ] Workspace module manupulation\`, () => \{
			    let workspace: ITestWorkspace;
			
			    function initWorkspace() \{
			      workspace = createTestWorkspace(\{
			        files: \{
			          'index.ts': 'export const foo = require("foo")',
			        \},
			        modules: \{
			          foo: \{
			            'index.ts': \`export const fooPackage = 1\`,
			            'package.json': JSON.stringify(\{ main: 'index.ts', name: 'foo', version: '1.0.0' \}),
			          \},
			        \},
			      \});
			    \}
			
			    it('should get package foo', async () => \{
			      initWorkspace();
			      const result = await test(workspace);
			      expect(result.eval().entry()).toEqual(\{ __esModule: true, foo: \{ __esModule: true, fooPackage: 1 \} \});
			    \});
			
			    it('should update package foo', async () => \{
			      workspace.setModuleFile('foo/package.json', JSON.stringify(\{ main: 'index.ts', name: 'foo', version: '2.0.0' \}));
			      workspace.setModuleFile('foo/index.ts', \`export const fooPackage = 2\`);
			      const result = await test(workspace);
			      expect(result.eval().entry()).toEqual(\{ __esModule: true, foo: \{ __esModule: true, fooPackage: 2 \} \});
			    \});
			
			    it('should change package foo entry', async () => \{
			      workspace.setModuleFile(
			        'foo/package.json',
			        JSON.stringify(\{ main: 'new_index.ts', name: 'foo', version: '3.0.0' \}),
			      );
			      workspace.setModuleFile('foo/new_index.ts', \`export const fooPackage = 'new_foo'\`);
			      const result = await test(workspace);
			      expect(result.eval().entry()).toEqual(\{ __esModule: true, foo: \{ __esModule: true, fooPackage: 'new_foo' \} \});
			    \});
			
			    it('should introduce a new package within', async () => \{
			      workspace.setModuleFile('foo/package.json', JSON.stringify(\{ main: 'index.ts', name: 'foo', version: '4.0.0' \}));
			      workspace.setModuleFile('foo/index.ts', \`export const fooPackage = require("bar")\`);
			
			      workspace.setModuleFile('bar/package.json', JSON.stringify(\{ main: 'index.ts', name: 'bar', version: '1.0.0' \}));
			      workspace.setModuleFile('bar/index.ts', \`export const barPackage = "bar"\`);
			
			      const result = await test(workspace);
			
			      expect(result.eval().entry()).toEqual(\{
			        __esModule: true,
			        foo: \{ __esModule: true, fooPackage: \{ __esModule: true, barPackage: 'bar' \} \},
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\cache\\__tests__\\cache.integration.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(26)
    });
    it('fuse-box_fuse-box\\src\\cache\\__tests__\\cache.meta.fs.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ EnvironmentType \} from '../../config/EnvironmentType';
			import \{ ICacheStrategy \} from '../../config/ICacheProps';
			import \{ ITestBrowserResponse \} from '../../testUtils/browserEnv/testBrowserEnv';
			import \{ createIntegrationTest, createTestWorkspace, ITestWorkspace \} from '../../testUtils/integrationTest';
			
			describe('Cache intergation test', () => \{
			  const test = async (workspace): Promise<ITestBrowserResponse> => \{
			    const test = createIntegrationTest(\{
			      config: \{
			        cache: \{ enabled: true, strategy: 'fs' as ICacheStrategy \},
			        entry: path.join(workspace.sourceDir, 'index.ts'),
			        target: 'browser',
			      \},
			      envType: EnvironmentType.DEVELOPMENT,
			      workspace,
			    \});
			
			    const response = await test.runDev();
			    return await response.runBrowser();
			  \};
			
			  let workspace: ITestWorkspace;
			  function initWorkspace() \{
			    return (workspace = createTestWorkspace(\{
			      files: \{
			        'foo.ts': 'export const foo = "foo"',
			        'index.ts': \`
			            import * as foo from "./foo"
			            const data = \{ foo \}
			            export \{ data \}\`,
			      \},
			    \}));
			  \}
			
			  /**** THOSE TEST CAN"T RUN WITHOUT EACH OTHER ****/
			  /**** DO NOT TRY .only ****/
			  describe('Check module files constency', () => \{
			    it('should give the initial data', async () => \{
			      await initWorkspace();
			      await test(workspace);
			      expect(workspace.getCacheWorkspace().getCachedFiles()).toHaveLength(2);
			    \});
			
			    it('after adding a new file should remain the same', async () => \{
			      workspace.setFile('bar.ts', 'export const bar = "bar"');
			      await test(workspace);
			      expect(workspace.getCacheWorkspace().getCachedFiles()).toHaveLength(2);
			    \});
			
			    it('include bar into foo', async () => \{
			      workspace.setFile(
			        'foo.ts',
			        \`
			        export \{ bar \} from "./bar";
			        export const foo = "foo"
			    \`,
			      );
			      await test(workspace);
			      expect(workspace.getCacheWorkspace().getCachedFiles()).toHaveLength(3);
			    \});
			
			    it('modyfying bar should keep the amount to 3', async () => \{
			      workspace.setFile('bar.ts', 'export const bar = "bar1"');
			      await test(workspace);
			      expect(workspace.getCacheWorkspace().getCachedFiles()).toHaveLength(3);
			    \});
			  \});
			
			  /**** THOSE TEST CAN"T RUN WITHOUT EACH OTHER ****/
			  /**** DO NOT TRY .only ****/
			
			  describe('Verify meta consistency', () => \{
			    let barData;
			    it('should give the initial data', async () => \{
			      await test(workspace);
			      const meta = workspace.getCacheWorkspace().getMetaFile();
			      barData = meta.findModule('bar.ts\$');
			      expect(barData).toBeTruthy();
			    \});
			
			    it('bar data should remain unchanged', async () => \{
			      await test(workspace);
			      const meta = workspace.getCacheWorkspace().getMetaFile();
			
			      expect(meta.findModule('bar.ts\$')).toEqual(barData);
			    \});
			
			    it('bar data should change (mtime)', async () => \{
			      workspace.setFile('bar.ts', 'export const bar = "bar2"');
			      await test(workspace);
			      const meta = workspace.getCacheWorkspace().getMetaFile();
			
			      const bar = meta.findModule('bar.ts\$');
			      expect(bar.id).toEqual(barData.id);
			      expect(bar.mtime).toBeGreaterThan(barData.id);
			
			      await meta.writeMeta(\`@invalidjson@\`);
			    \});
			
			    it('should handle json corruation', async () => \{
			      workspace.setFile('bar.ts', 'export const bar = "bar2"');
			      await test(workspace);
			      const meta = workspace.getCacheWorkspace().getMetaFile();
			
			      const bar = meta.findModule('bar.ts\$');
			
			      expect(bar.id).toEqual(barData.id);
			      expect(bar.mtime).toBeGreaterThan(barData.id);
			    \});
			
			    it('should give the same id for bar after removal', async () => \{
			      workspace.removeFile('bar.ts');
			      await test(workspace);
			
			      workspace.setFile('bar.ts', 'export const bar = "bar2"');
			      await test(workspace);
			
			      const meta = workspace.getCacheWorkspace().getMetaFile();
			
			      const bar = meta.findModule('bar.ts\$');
			
			      expect(bar.id).toEqual(barData.id);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\cache\\__tests__\\cache.meta.fs.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(19)
    });
    it('fuse-box_fuse-box\\src\\compiler\\helpers\\__tests__\\htmlEntitiesToUnicode.test.ts', () => {
        const sourceCode = `
			import \{ htmlEntitiesToUnicode \} from '../entities';
			
			describe('Html entities', () => \{
			  it('should repalce', () => \{
			    const data = htmlEntitiesToUnicode('hello &copy; that &atilde; and &copy; && &nbsp;');
			    expect(data).toEqual(\`hello \\\\u00A9 that \\\\u00E3 and \\\\u00A9 && \\\\u00A0\`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\helpers\\__tests__\\htmlEntitiesToUnicode.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\compiler\\static_compute\\__tests__\\computeBinaryExpression.test.ts', () => {
        const sourceCode = `
			import \{ ASTNode \} from '../../interfaces/AST';
			import \{ parseTypeScript \} from '../../parser';
			import \{ computeBinaryExpression \} from '../computeBinaryExpression';
			
			function getAst(expression: string): ASTNode \{
			  const ast = parseTypeScript(expression);
			  return ast.body[0]['expression'];
			\}
			describe('Compute binary expression', () => \{
			  it('sample 1', () => \{
			    const res = computeBinaryExpression(getAst('1+2*2'));
			    expect(res.value).toEqual(5);
			  \});
			
			  it('sample 2', () => \{
			    const res = computeBinaryExpression(getAst('1+2*2+(5*2)'));
			    expect(res.value).toEqual(15);
			  \});
			  it('sample 3', () => \{
			    const res = computeBinaryExpression(getAst('1+2*2+(5*0x23)'));
			    expect(res.value).toEqual(180);
			  \});
			  it('sample 4', () => \{
			    const res = computeBinaryExpression(getAst('10%2'));
			    expect(res.value).toEqual(0);
			  \});
			  it('sample 5', () => \{
			    const res = computeBinaryExpression(getAst('1<<2'));
			    expect(res.value).toEqual(4);
			  \});
			  it('sample 6', () => \{
			    const res = computeBinaryExpression(getAst('1>>2'));
			    expect(res.value).toEqual(0);
			  \});
			  it('sample 7', () => \{
			    const res = computeBinaryExpression(getAst('5>>>1'));
			    expect(res.value).toEqual(2);
			  \});
			  it('sample 8', () => \{
			    const res = computeBinaryExpression(getAst('2**10'));
			    expect(res.value).toEqual(1024);
			  \});
			
			  it('sample 1 with variable', () => \{
			    const res = computeBinaryExpression(getAst('Read | Write'), \{
			      Read: 1 << 1,
			      Write: 1 << 2,
			    \});
			    expect(res.value).toEqual(6);
			  \});
			
			  it('sample 2 with variable', () => \{
			    const res = computeBinaryExpression(getAst('(Read | 1 << 2) + 20 / 10'), \{
			      Read: 1 << 1,
			      Write: 1 << 2,
			    \});
			    expect(res.value).toEqual(8);
			  \});
			
			  it('sample 3 with variable', () => \{
			    const res = computeBinaryExpression(getAst('(Read | Write) + 20'), \{
			      Read: 2,
			      Write: 4,
			    \});
			    expect(res.value).toEqual(26);
			  \});
			
			  describe('Math', () => \{
			    it('Math.sin', () => \{
			      const res = computeBinaryExpression(getAst('20 + Math.sin(2)'), \{
			        Read: 2,
			        Write: 4,
			      \});
			      expect(res.value).toEqual(20.90929742682568);
			    \});
			    it('Math - uknown function', () => \{
			      const res = computeBinaryExpression(getAst('20 + Math.hey(2)'), \{
			        Read: 2,
			        Write: 4,
			      \});
			      expect(res.value).toEqual(NaN);
			    \});
			
			    it('Uknown function', () => \{
			      const res = computeBinaryExpression(getAst('20 + Some'), \{
			        Read: 2,
			        Write: 4,
			      \});
			      expect(res.value).toEqual(NaN);
			    \});
			
			    it('Math without params', () => \{
			      const res = computeBinaryExpression(getAst('20 + Math.sin'), \{
			        Read: 2,
			        Write: 4,
			      \});
			      expect(res.value).toEqual(NaN);
			    \});
			
			    it('Math without function', () => \{
			      const res = computeBinaryExpression(getAst('20 + Math'), \{
			        Read: 2,
			        Write: 4,
			      \});
			      expect(res.value).toEqual(NaN);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\static_compute\\__tests__\\computeBinaryExpression.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(16)
    });
    it('fuse-box_fuse-box\\src\\compiler\\transformers\\ts\\decorators\\__tests__\\annoations.test.ts', () => {
        const sourceCode = `
			import * as parser from '@typescript-eslint/typescript-estree';
			import '../../../../../utils/test_utils';
			import \{ convertTypeAnnotation, KNOWN_IDENTIFIERS \} from '../Annotations';
			
			function conv(typeAnnotation?: string) \{
			  const ast = parser.parse(\`function a(\$\{typeAnnotation ? 'c : ' + typeAnnotation : 'c'\})\{\}\`, \{\}) as any;
			  //console.log(JSON.stringify(ast, null, 2));
			  return convertTypeAnnotation(ast.body[0].params[0].typeAnnotation);
			\}
			
			const generics = ['string', 'number', 'Number', 'String'];
			const voidZero = ['undefined', 'never', 'void', 'null'];
			const other = ['any', '\{\}', '[]', "'a'", '1', '() => \{\}', 'true', 'false', '0x22', 'keyof S'];
			
			const KNOWN = Object.keys(KNOWN_IDENTIFIERS);
			
			describe('Annotation test', () => \{
			  // it('should give an object without annotation', () => \{
			  //   const res = conv();
			  //   expect(res).toMatchSnapshot();
			  // \});
			
			  describe('other', () => \{
			    for (const name of other) \{
			      it(\`should detect "\$\{name\}"\`, () => \{
			        const res = conv(name);
			
			        expect(JSON.stringify(res)).toMatchSnapshot();
			      \});
			    \}
			  \});
			
			  describe('Void Zero', () => \{
			    for (const name of voidZero) \{
			      it(\`should detect "\$\{name\}"\`, () => \{
			        const res = conv(name);
			        //console.log(name, '=>', res);
			
			        expect(JSON.stringify(res)).toMatchSnapshot();
			      \});
			    \}
			  \});
			
			  describe('Known identifiers', () => \{
			    for (const name of KNOWN) \{
			      it(\`should detect "\$\{name\}"\`, () => \{
			        const res = conv(name);
			        expect(JSON.stringify(res)).toMatchSnapshot();
			      \});
			    \}
			  \});
			
			  describe('Generics', () => \{
			    for (const name of generics) \{
			      it(\`should detect "\$\{name\}"\`, () => \{
			        const res = conv(name);
			        //console.log(name, '=>', res);
			        expect(JSON.stringify(res)).toMatchSnapshot();
			      \});
			    \}
			  \});
			
			  describe('Maybe objects', () => \{
			    it(\`should detect SomeObject as maybe 1\`, () => \{
			      const res = conv('SomeStuff');
			
			      expect(JSON.stringify(res)).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\transformers\\ts\\decorators\\__tests__\\annoations.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\angular.url.transformer.test.ts', () => {
        const sourceCode = `
			describe('Angular url transformer', () => \{
			  it('should', () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\angular.url.transformer.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\browser.process.transform.test.ts', () => {
        const sourceCode = `
			import \{ ITarget \} from '../../config/ITarget';
			import \{ initCommonTransform \} from '../testUtils';
			import \{ BrowserProcessTransformer \} from '../transformers/bundle/BrowserProcessTransformer';
			import \{ BundleFastConditionUnwrapper \} from '../transformers/bundle/BundleFastConditionTransformer';
			import \{ RequireStatementInterceptor \} from '../transformers/bundle/RequireStatementInterceptor';
			
			describe('Browser process transformer test', () => \{
			  const testTranspile = (props: \{ NODE_ENV?: string; code: string; target?: ITarget \}) => \{
			    return initCommonTransform(\{
			      code: props.code,
			      compilerOptions: \{
			        buildTarget: props.target || 'browser',
			        processEnv: \{ NODE_ENV: props.NODE_ENV || 'development' \},
			      \},
			      transformers: [BrowserProcessTransformer(), BundleFastConditionUnwrapper(), RequireStatementInterceptor()],
			    \});
			  \};
			  it('should unwrap dev', () => \{
			    const res = testTranspile(\{
			      code: \`
			      if ( process.env.NODE_ENV === "development")\{
			        console.log("dev")
			      \}
			    \`,
			    \});
			
			    expect(res.code).toMatchSnapshot();
			  \});
			
			  it('should unwrap dev with alternate', () => \{
			    const res = testTranspile(\{
			      NODE_ENV: 'production',
			      code: \`
			      if ( process.env.NODE_ENV === "development")\{
			        console.log("dev")
			      \} else \{
			        console.log("this is dev")
			      \}
			    \`,
			    \});
			    expect(res.code).toMatchSnapshot();
			  \});
			
			  it('should not emit require statement', () => \{
			    const res = testTranspile(\{
			      NODE_ENV: 'production',
			      code: \`
			      if ( process.env.NODE_ENV === "development")\{
			        require("./dev")
			      \} else \{
			        console.log("this is dev")
			      \}
			    \`,
			    \});
			
			    expect(res.requireStatementCollection).toEqual([]);
			  \});
			
			  it('should not touch other statements', () => \{
			    const res = testTranspile(\{
			      NODE_ENV: 'production',
			      code: \`
			      if ( a.b ) \{
			         console.log(1)
			      \} else \{
			        console.log(2)
			      \}
			    \`,
			    \});
			    expect(res.code).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\browser.process.transform.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\build.env.transformer.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ BuildEnvTransformer \} from '../transformers/bundle/BuildEnvTransformer';
			
			describe('Build env transformer', () => \{
			  const testTranspile = (props: \{ buildEnv?: Record<string, any>; code: string \}) => \{
			    return initCommonTransform(\{
			      code: props.code,
			      compilerOptions: \{
			        buildEnv: props.buildEnv,
			      \},
			
			      transformers: [BuildEnvTransformer()],
			    \});
			  \};
			  it('should replace a string', () => \{
			    const res = testTranspile(\{
			      buildEnv: \{ foo: '"this is foo"' \},
			      code: \`
			        __build_env.foo;
			    \`,
			    \});
			
			    expect(res.code).toContain(\`"this is foo";\`);
			  \});
			
			  it('should throw an exception', () => \{
			    expect(() => \{
			      testTranspile(\{
			        buildEnv: \{ foo: 'oi oi oi' \},
			        code: \`
			          __build_env.foo;
			      \`,
			      \});
			    \}).toThrowError();
			  \});
			
			  it('should replace an array', () => \{
			    const res = testTranspile(\{
			      buildEnv: \{ foo: [1, 2] \},
			      code: \`__build_env.foo;\`,
			    \});
			    expect(res.code).toContain(\`[1, 2];\`);
			  \});
			
			  it('should replace an object', () => \{
			    const res = testTranspile(\{
			      buildEnv: \{ foo: \{ hello: 'world' \} \},
			      code: \`console.log(__build_env.foo)\`,
			    \});
			    expect(res.code).toContain(\`"hello": "world"\`);
			  \});
			
			  it('should replace a nested object', () => \{
			    const res = testTranspile(\{
			      buildEnv: \{ foo: \{ hello: \{ world: 'baz' \} \} \},
			      code: \`console.log(__build_env.foo)\`,
			    \});
			
			    expect(res.code).toMatchInlineSnapshot(\`
			      "console.log(\{
			        \\\\"hello\\\\": \{
			          \\\\"world\\\\": \\\\"baz\\\\"
			        \}
			      \});
			      "
			    \`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\build.env.transformer.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\bundle.fast.condition.test.ts', () => {
        const sourceCode = `
			import \{ ITarget \} from '../../config/ITarget';
			import \{ initCommonTransform \} from '../testUtils';
			import \{ BrowserProcessTransformer \} from '../transformers/bundle/BrowserProcessTransformer';
			import \{ BundleFastConditionUnwrapper \} from '../transformers/bundle/BundleFastConditionTransformer';
			import \{ RequireStatementInterceptor \} from '../transformers/bundle/RequireStatementInterceptor';
			
			const testTranspile = (props: \{ NODE_ENV?: string; code: string; target?: ITarget \}) => \{
			  return initCommonTransform(\{
			    code: props.code,
			    compilerOptions: \{
			      buildTarget: props.target || 'browser',
			      processEnv: \{ NODE_ENV: props.NODE_ENV || 'development' \},
			    \},
			    transformers: [BundleFastConditionUnwrapper(), BrowserProcessTransformer(), RequireStatementInterceptor()],
			  \});
			\};
			
			describe('Browser fast condition', () => \{
			  describe('Process env', () => \{
			    it('should emit require statement', () => \{
			      const res = testTranspile(\{
			        NODE_ENV: 'production',
			        code: \`
			        if ( process.env.NODE_ENV === "development")\{
			          require("./dev")
			        \} else \{
			          require("./prod")
			        \}
			      \`,
			      \});
			
			      expect(res.requireStatementCollection).toHaveLength(1);
			      expect(res.requireStatementCollection[0].statement.arguments[0].value).toEqual('./prod');
			    \});
			  \});
			
			  describe('Fast condition', () => \{
			    it('should unwrap isBrowser', () => \{
			      const res = testTranspile(\{
			        NODE_ENV: 'production',
			        code: \`
			        if ( FuseBox.isBrowser)\{
			          console.log("isBrowser")
			        \}
			      \`,
			        target: 'browser',
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should unwrap isServer', () => \{
			      const res = testTranspile(\{
			        NODE_ENV: 'production',
			        code: \`
			        if ( FuseBox.isServer)\{
			          console.log("isServer")
			        \}
			      \`,
			        target: 'server',
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\bundle.fast.condition.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\bundle.polyfill.transform.test.ts', () => {
        const sourceCode = `
			import \{ ITarget \} from '../../config/ITarget';
			import \{ ImportType \} from '../interfaces/ImportType';
			import \{ initCommonTransform \} from '../testUtils';
			import \{ BundlePolyfillTransformer \} from '../transformers/bundle/BundlePolyfillTransformer';
			import \{ RequireStatementInterceptor \} from '../transformers/bundle/RequireStatementInterceptor';
			
			const testTranspile = (props: \{ code: string; fileName?: string; target?: ITarget \}) => \{
			  return initCommonTransform(\{
			    props: \{
			      module: \{ publicPath: props.fileName || '/test/file.js' \},
			    \},
			
			    compilerOptions: \{
			      buildTarget: props.target || 'browser',
			    \},
			
			    code: props.code,
			    transformers: [BundlePolyfillTransformer(), RequireStatementInterceptor()],
			  \});
			\};
			
			const PolyfillEssentialConfig = \{
			  Buffer: 'buffer',
			
			  buffer: 'buffer',
			
			  http: 'http',
			  https: 'https',
			  process: 'process',
			  stream: 'stream',
			\};
			
			describe('Bundle polyfill transform test', () => \{
			  describe('Common transform ', () => \{
			    it('should replace __dirname', () => \{
			      const result = testTranspile(\{
			        code: \`
			           console.log(__dirname)
			      \`,
			        fileName: '/some-dir/file.ts',
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should replace __filename', () => \{
			      const result = testTranspile(\{
			        code: \`
			           console.log(__filename)
			      \`,
			        fileName: '/some-dir/file.ts',
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should replace global with window for browser target', () => \{
			      const result = testTranspile(\{
			        code: \`console.log(global)\`,
			        target: 'browser',
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should replace global with self for web-worker target', () => \{
			      const result = testTranspile(\{
			        code: \`console.log(global)\`,
			        target: 'web-worker',
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('polyfills', () => \{
			    describe('Single reference', () => \{
			      for (const name in PolyfillEssentialConfig) \{
			        const moduleName = PolyfillEssentialConfig[name];
			        it(\`shuold insert \$\{moduleName\}\`, () => \{
			          const result = testTranspile(\{
			            code: \`console.log(\$\{moduleName\})\`,
			          \});
			          expect(result.requireStatementCollection).toEqual([
			            \{
			              importType: ImportType.REQUIRE,
			              statement: \{
			                arguments: [\{ type: 'Literal', value: moduleName \}],
			                callee: \{ name: 'require', type: 'Identifier' \},
			                type: 'CallExpression',
			              \},
			            \},
			          ]);
			          expect(result.code).toMatchSnapshot();
			        \});
			      \}
			    \});
			
			    describe('Member reference reference', () => \{
			      for (const name in PolyfillEssentialConfig) \{
			        const moduleName = PolyfillEssentialConfig[name];
			        it(\`shuold insert \$\{moduleName\} with method reference\`, () => \{
			          const result = testTranspile(\{
			            code: \`console.log(\$\{moduleName\}.method)\`,
			          \});
			
			          expect(result.code).toMatchSnapshot();
			        \});
			      \}
			    \});
			    describe('Member reference with a call', () => \{
			      for (const name in PolyfillEssentialConfig) \{
			        const moduleName = PolyfillEssentialConfig[name];
			        it(\`shuold insert \$\{moduleName\} with method reference with a call\`, () => \{
			          const result = testTranspile(\{
			            code: \`console.log(\$\{moduleName\}.method() )\`,
			          \});
			
			          expect(result.code).toMatchSnapshot();
			        \});
			      \}
			    \});
			
			    describe('Should not add anything', () => \{
			      it('should not add Buffer because its been hoisted', () => \{
			        const result = testTranspile(\{
			          code: \`
			            exports.Buffer = Buffer;
			            function Buffer()\{\}
			          \`,
			        \});
			
			        expect(result.code).toMatchSnapshot();
			      \});
			
			      it('should not add Buffer because its has been defined', () => \{
			        const result = testTranspile(\{
			          code: \`
			            function some()\{
			              const buffer = \{\};
			              console.log(buffer)
			            \}
			          \`,
			        \});
			        expect(result.code).toMatchSnapshot();
			      \});
			
			      it('should not add Buffer because it has NOT been defined', () => \{
			        const result = testTranspile(\{
			          code: \`
			            function some()\{
			              console.log(buffer)
			            \}
			          \`,
			        \});
			
			        expect(result.code).toMatchSnapshot();
			      \});
			
			      it('should add buffer only once', () => \{
			        const result = testTranspile(\{
			          code: \`
			            console.log(Buffer)
			            console.log(Buffer)
			          \`,
			        \});
			        expect(result.code).toMatchSnapshot();
			      \});
			
			      it('should respect import', () => \{
			        const result = testTranspile(\{
			          code: \`
			            import global from "some"
			            function main()\{
			              console.log(global)
			            \}
			          \`,
			        \});
			        expect(result.code).toMatchSnapshot();
			      \});
			
			      it('should respect local scope', () => \{
			        const result = testTranspile(\{
			          code: \`
			
			            function main(global)\{
			              console.log(global)
			            \}
			          \`,
			        \});
			
			        expect(result.code).toMatchSnapshot();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\bundle.polyfill.transform.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(13)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\class-constructor-properties.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ExportTransformer \} from '../transformers/shared/ExportTransformer';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			import \{ ClassConstructorPropertyTransformer \} from '../transformers/ts/ClassConstructorPropertyTransformer';
			import \{ CommonTSfeaturesTransformer \} from '../transformers/ts/CommonTSfeaturesTransformer';
			import \{ DecoratorTransformer \} from '../transformers/ts/decorators/DecoratorTransformer';
			
			describe('Class constructor properties', () => \{
			  const testTranspile = (props: \{ code: string; jsx?: boolean \}) => \{
			    return initCommonTransform(\{
			      code: props.code,
			      compilerOptions: \{ experimentalDecorators: true \},
			      jsx: props.jsx,
			      transformers: [
			        DecoratorTransformer(),
			        ClassConstructorPropertyTransformer(),
			        CommonTSfeaturesTransformer(),
			        ImportTransformer(),
			        ExportTransformer(),
			      ],
			    \});
			  \};
			
			  it('should initialize constructor properties in the constructor', () => \{
			    const result = testTranspile(\{
			      code: \`
			
			            class HelloWorld \{
			
			                constructor(public welcome: string,
			                            private to: string,
			                            protected awesomeness: string,
			                            of: number,
			                            fuse?: boolean) \{
			
			                    this.fuse = fuse;
			                \}
			            \}
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle class expression', () => \{
			    const result = testTranspile(\{
			      code: \`
			      export const exception = <Ex extends new (...args: any[]) => any>(constructor: Ex) => \{
			        return class extends constructor \{
			          public name = constructor.name;
			        \};
			      \};
			
			        \`,
			      jsx: false,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should work with super classes', () => \{
			    const result = testTranspile(\{
			      code: \`
			            class Amazing \{\}
			
			            class HelloWorld extends Amazing \{
			
			                constructor(public welcome: string,
			                            private to: string,
			                            protected awesomeness: string,
			                            of: number,
			                            fuse?: boolean) \{
			
			                    super();
			
			                    this.fuse = fuse;
			                \}
			            \}
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should not add initializer calls in standard block statements', () => \{
			    const result = testTranspile(\{
			      code: \`
			            class Amazing \{\}
			
			            class HelloWorld extends Amazing \{
			
			                constructor(public welcome: string,
			                            private to: string,
			                            protected awesomeness: string,
			                            of: number,
			                            fuse?: boolean) \{
			
			                    super();
			
			                    (() => \{console.log('Freaky block statement here.');\})();
			
			                    this.fuse = fuse;
			                \}
			
			                welcomeToTheBlock() \{
			
			                \}
			            \}
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should leave classes without constructor props alone', () => \{
			    const result = testTranspile(\{
			      code: \`
			
			            class HelloWorld \{
			
			                constructor(welcome: string,
			                            to: string,
			                            awesomeness: string,
			                            of: number,
			                            fuse?: boolean) \{
			
			                    this.fuse = fuse;
			                \}
			            \}
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should deal with inner classes', () => \{
			    const result = testTranspile(\{
			      code: \`
			            class Amazing \{\}
			
			            class HelloWorld extends Amazing \{
			
			                constructor(@foo public welcome: string,
			                            @foo() private to: string,
			                            @foo(123, "ab") protected awesomeness: string,
			                            of: number,
			                            fuse?: boolean) \{
			
			                    super();
			                    class Hey extends Amazing \{
			                      constructor(@foo public welcome: string,
			                        @foo() private to: string,
			                        fuse?: boolean) \{
			                          super();
			                        \}
			                      static someM = () => \{\}
			                    \}
			                    this.fuse = fuse;
			                \}
			
			                welcomeToTheBlock() \{
			
			                \}
			            \}
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should deal with immediate function calls on initialized properties', () => \{
			    const result = testTranspile(\{
			      code: \`
			
			            class HelloWorld \{
			
			                constructor(public welcome : string) \{
			                  console.log(this.welcome);
			                \}
			            \}
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should deal with multiple class definitions following each other', () => \{
			    const result = testTranspile(\{
			      code: \`
			
			            class HelloWorld \{
			
			                constructor(public welcome : string) \{
			                  console.log(this.welcome);
			                \}
			            \}
			            class HelloWorld2 \{
			
			              constructor(public welcome2 : string) \{
			                console.log(this.welcome2);
			              \}
			          \}
			          class HelloWorld3 \{
			
			            constructor(public welcome3 : string) \{
			              console.log(this.welcome3);
			            \}
			        \}
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should work with class as a default value', () => \{
			    const result = testTranspile(\{
			      code: \`
			      class A \{
			        constructor(
			          public name = class \{
			            constructor(public hey = 2) \{\}
			          \},
			        ) \{\}
			      \}
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  describe('Class props', () => \{
			    it("should remove property that's not inited", () => \{
			      const result = testTranspile(\{
			        code: \`
			        class A \{
			          public name : string;
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove add a property without constructor', () => \{
			      const result = testTranspile(\{
			        code: \`
			        class A \{
			          public name : string = "hey"
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should create constructor with extends', () => \{
			      const result = testTranspile(\{
			        code: \`
			        class A extends B \{
			          public name : string = "hey"
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should create constructor with extends being in export default', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export default class extends B \{
			          public name : string = "hey"
			        \}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect existing constructor with extends being in export default', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export default class extends B \{
			          public name : string = "hey"
			          constructor(private oi : number)\{
			            super(oi)
			          \}
			        \}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove add a property to the existing constructor', () => \{
			      const result = testTranspile(\{
			        code: \`
			        class A \{
			          public name : string = "hey";
			          constructor()\{\}
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove add a property to the existing constructor respecting other public methods', () => \{
			      const result = testTranspile(\{
			        code: \`
			        class A \{
			          public name : string = "hey";
			          constructor(private hey : string = "key")\{
			            console.log( this.name )
			          \}
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should handle constructor overrides', () => \{
			      const result = testTranspile(\{
			        code: \`
			        class A \{
			          public name : string = "hey";
			          constructor(number)
			          constructor(private hey : string = "key")\{
			
			          \}
			        \}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should create a computed prop', () => \{
			      const result = testTranspile(\{
			        code: \`
			        const foo = "prop"
			        class A  \{
			          public [foo] : string = "hey"
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should create a computed prop respecting imports', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import foo from "mod";
			        class A  \{
			          public [foo] : string = "hey"
			        \}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should create a computed prop respecting export', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export const IsException = Symbol();
			        export default class \{
			          public [IsException] = true;
			        \}
			
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Static properties', () => \{
			    it('should handle a static default property', () => \{
			      const result = testTranspile(\{
			        code: \`
			        class A \{
			          public static hey : string = "some"
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should not add an empty static property', () => \{
			      const result = testTranspile(\{
			        code: \`
			        class A \{
			          public static hey : string;
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should add a computed property', () => \{
			      const result = testTranspile(\{
			        code: \`
			        const hey = "oi"
			        class A \{
			          public static [hey] : string = "some value"
			        \}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should add a computed property respecting imports', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import hey from "mod";
			        class A \{
			          public static [hey] : string = "some value"
			        \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should add a computed property respecting existing export', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export const IsException = Symbol();
			        export default class \{
			          public static [IsException] = true;
			        \}
			
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should static prop with class assigned to a const', () => \{
			      const result = testTranspile(\{
			        code: \`
			
			        const foo = class A \{
			          public static oi = true;
			        \}
			
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should static prop with class assigned to a const 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			
			        const foo = class A \{
			          public static oi = true;
			        \}, b = class \{
			          public static oops = 1;
			        \}
			
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should static prop with class assigned to a const 2 (with return)', () => \{
			      const result = testTranspile(\{
			        code: \`
			
			        export const exception = <Ex extends new (...args: any[]) => any>(constructor: Ex) => \{
			          return class extends constructor \{
			            public static hey = 1;
			          \};
			        \};
			
			
			        \`,
			        jsx: false,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should static prop with class assigned to a const 2 (with return combo)', () => \{
			      const result = testTranspile(\{
			        code: \`
			
			        export const exception = <Ex extends new (...args: any[]) => any>(constructor: Ex) => \{
			          return class extends constructor \{
			            public static hey = 1;
			            public oi = 1;
			          \};
			        \};
			
			
			        \`,
			        jsx: false,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('static props in export default class with decorators', () => \{
			      const result = testTranspile(\{
			        code: \`
			        @Injectable()
			        export default class ApiService \{
			          static foo = () => \{\}
			          static bar = () => \{\}
			        \}
			        \`,
			        jsx: false,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\class-constructor-properties.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(30)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\common-features.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ClassConstructorPropertyTransformer \} from '../transformers/ts/ClassConstructorPropertyTransformer';
			import \{ CommonTSfeaturesTransformer \} from '../transformers/ts/CommonTSfeaturesTransformer';
			
			describe('Common features test', () => \{
			  const testTranspile = (props: \{ code: string; jsx?: boolean \}) => \{
			    return initCommonTransform(\{
			      jsx: props.jsx,
			      transformers: [ClassConstructorPropertyTransformer(), CommonTSfeaturesTransformer()],
			      code: props.code,
			    \});
			  \};
			
			  describe('Abstract methods', () => \{
			    it('should remove abstract methods', () => \{
			      const result = testTranspile(\{
			        code: \`
			          abstract  class A \{
			            constructor(public name)\{\}
			            abstract hello()
			        \}
			
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Should remove declare', () => \{
			    it('should remove consts', () => \{
			      const result = testTranspile(\{
			        code: \`
			        alert(1)
			        declare const A: any, B: any;
			        alert(2)
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Interface removal', () => \{
			    it('should remove export interface', () => \{
			      const result = testTranspile(\{
			        code: \`
			          console.log(1);
			          export interface Foo \{
			
			          \}
			          console.log(2);
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove interface', () => \{
			      const result = testTranspile(\{
			        code: \`
			           alert(1);
			           interface Foo \{\}
			           alert(2);
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should ignore export declare', () => \{
			      const result = testTranspile(\{
			        code: \`
			        alert(1)
			        export declare const A: any, B: any, oi = 2;
			        alert(2)
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should ignore export declare', () => \{
			      const result = testTranspile(\{
			        code: \`
			        type plain = \{
			          [key: string]: plain | any;
			        \};
			        declare module '*.graphql' \{
			          const value: string;
			          export default value;
			        \}
			        declare module '*.docx' \{
			          const value: any;
			          export = value;
			        \}
			        alert(1)
			
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Various', () => \{
			    it('should remove type assertion', () => \{
			      const result = testTranspile(\{
			        code: \`
			          if( (<any>_e.target) === 1)\{\}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should handle NotNullExpression', () => \{
			      const result = testTranspile(\{
			        code: \`
			        function hey(res)\{
			          return res!;
			      \}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('This typing', () => \{
			    it('should remove 1', () => \{
			      const result = testTranspile(\{
			        code: \`
			          function hey(this : string, a)\{\}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			          const hey = function(this : string, a)\{
			            console.log(this)
			          \}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove 3', () => \{
			      const result = testTranspile(\{
			        code: \`
			          class A \{
			            foo(this : string)\{
			            \}
			          \}
			        \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should and preserve other args', () => \{
			      const result = testTranspile(\{
			        code: \`
			          class A \{
			            foo(this : string, some : number)\{\}
			          \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should transform export expression', () => \{
			      const result = testTranspile(\{
			        code: \`
			          export = \{foo : "bar"\}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\common-features.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(13)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\computed.statement.import.test.ts', () => {
        const sourceCode = `
			import \{ computedStatementToPath, expressionValueTypes \} from '../helpers/importHelpers';
			import \{ ASTNode \} from '../interfaces/AST';
			import \{ parseTypeScript \} from '../parser';
			
			function getAst(expression: string): ASTNode \{
			  const ast = parseTypeScript(expression);
			  return ast.body[0]['expression'];
			\}
			
			describe('Computed statements in imports', () => \{
			  it(\`import('./atoms/' + a) should return a valid pattern\`, () => \{
			    // Tests the case:
			    // import('./atoms/' + b);
			    const \{ paths \} = computedStatementToPath(getAst(\`'./atoms/' + a\`));
			    expect(paths).toEqual(['./atoms/', expressionValueTypes.SINGLE_ASTERISK]);
			  \});
			
			  it(\`import('./atoms/' + b + '/' + c) should return a valid pattern\`, () => \{
			    // Tests the case:
			    // import('./atoms/' + b + '/' + c);
			    const \{ paths \} = computedStatementToPath(getAst(\`'./atoms/' + b + '/' + c\`));
			    expect(paths).toEqual([
			      './atoms/',
			      expressionValueTypes.DOUBLE_ASTERISK,
			      '/',
			      expressionValueTypes.SINGLE_ASTERISK,
			    ]);
			  \});
			
			  it(\`import(b + '/' + c) should fail and return an error object\`, () => \{
			    // Tests the case:
			    // import(b + '/' + c);
			    const \{ error \} = computedStatementToPath(getAst(\`b + '/' + c\`));
			    expect(error).toEqual(\`You're computed import needs to start with a string! i.e. './'\`);
			  \});
			
			  it('import(\`./atoms/\$\{a\}\`) should return a valid pattern', () => \{
			    // Tests the case:
			    // import(\`./atoms/\$\{a\}\`);
			    const \{ paths \} = computedStatementToPath(getAst('\`./atoms/\$\{a\}\`'));
			    expect(paths).toEqual(['./atoms/', expressionValueTypes.SINGLE_ASTERISK]);
			  \});
			
			  it('import(\`./atoms/\$\{b\}/\$\{c\}\`) should return a valid pattern', () => \{
			    // Tests the case:
			    // import(\`./atoms/\$\{b\}/\$\{c\}\`);
			    const \{ paths \} = computedStatementToPath(getAst('\`./atoms/\$\{b\}/\$\{c\}\`'));
			    expect(paths).toEqual([
			      './atoms/',
			      expressionValueTypes.DOUBLE_ASTERISK,
			      '/',
			      expressionValueTypes.SINGLE_ASTERISK,
			    ]);
			  \});
			
			  it('import(\`./atoms/\$\{b\}\$\{c\}\`) should return a valid pattern', () => \{
			    // Tests the case:
			    // import(\`./atoms/\$\{b\}\$\{c\}\`);
			    const \{ paths \} = computedStatementToPath(getAst('\`./atoms/\$\{b\}\$\{c\}\`'));
			    expect(paths).toEqual(['./atoms/', expressionValueTypes.SINGLE_ASTERISK]);
			  \});
			
			  it('import(\`./atoms/\$\{b\}\$\{c\}/\$\{d\}\`) should return a valid pattern', () => \{
			    // Tests the case:
			    // import(\`./atoms/\$\{b\}\$\{c\}\`);
			    const \{ paths \} = computedStatementToPath(getAst('\`./atoms/\$\{b\}\$\{c\}/\$\{d\}\`'));
			    expect(paths).toEqual([
			      './atoms/',
			      expressionValueTypes.DOUBLE_ASTERISK,
			      '/',
			      expressionValueTypes.SINGLE_ASTERISK,
			    ]);
			  \});
			
			  it("import(\`./atoms/\$\{b + '/' + c\}\`) should return a valid pattern", () => \{
			    // Tests the case:
			    // import(\`./atoms/\$\{b + '/' + c\}\`);
			    const \{ paths \} = computedStatementToPath(getAst("\`./atoms/\$\{b + '/' + c\}\`"));
			    expect(paths).toEqual([
			      './atoms/',
			      expressionValueTypes.DOUBLE_ASTERISK,
			      '/',
			      expressionValueTypes.SINGLE_ASTERISK,
			    ]);
			  \});
			
			  it("import(\`./atoms/\$\{b + '/' + c\}\`) should return a valid pattern", () => \{
			    // Tests the case:
			    // import(\`./atoms/\$\{b + '/' + c\}\`);
			    const \{ paths \} = computedStatementToPath(getAst("\`./atoms/\$\{b + '/' + c\}\`"));
			    expect(paths).toEqual([
			      './atoms/',
			      expressionValueTypes.DOUBLE_ASTERISK,
			      '/',
			      expressionValueTypes.SINGLE_ASTERISK,
			    ]);
			  \});
			
			  it(\`import('./assets/' + var + '.svg');  should return a valid pattern\`, () => \{
			    // Tests the case:
			    // import('./assets/' + var + '.svg');
			    const \{ paths \} = computedStatementToPath(getAst(\`'./assets/' + a + '.svg'\`));
			    expect(paths).toEqual(['./assets/', expressionValueTypes.DOUBLE_ASTERISK, '.svg']);
			  \});
			
			  it(\`import('./' + path + (() => 'test')); should return an error object\`, () => \{
			    // Tests the case:
			    // import('./' + path + (() => 'test'));
			    const \{ error \} = computedStatementToPath(getAst(\`'./' + path + (() => 'test')\`));
			    expect(error).toEqual(\`Unsupported type provided to computed statement import\`);
			  \});
			
			  it(\`import('./a' + func()); should return an error object\`, () => \{
			    // Tests the case:
			    // import('./' + path + (() => 'test'));
			    const \{ error \} = computedStatementToPath(getAst(\`'./a' + func()\`));
			    expect(error).toEqual(\`Unsupported type provided to computed statement import\`);
			  \});
			
			  it('import(\`./a/\$\{func()\}\`); should return an error object', () => \{
			    // Tests the case:
			    // import('./' + path + (() => 'test'));
			    const \{ error \} = computedStatementToPath(getAst('\`./a/\$\{func()\}\`'));
			    expect(error).toEqual(\`Unsupported type provided to computed statement import\`);
			  \});
			
			  it('const b = \`b\`; should return an error object', () => \{
			    // Tests the case:
			    // Complete different AST
			    const \{ error \} = computedStatementToPath(\{
			      kind: 'const',
			      type: 'VariableDeclaration',
			    \});
			    expect(error).toEqual(\`Unsupported root node provided\`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\computed.statement.import.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\decorators.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ExportTransformer \} from '../transformers/shared/ExportTransformer';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			import \{ ClassConstructorPropertyTransformer \} from '../transformers/ts/ClassConstructorPropertyTransformer';
			import \{ CommonTSfeaturesTransformer \} from '../transformers/ts/CommonTSfeaturesTransformer';
			import \{ DecoratorTransformer \} from '../transformers/ts/decorators/DecoratorTransformer';
			
			describe('Decorators test', () => \{
			  const testTranspile = (props: \{ code: string; emitDecoratorMetadata?: boolean; jsx?: boolean \}) => \{
			    return initCommonTransform(\{
			      jsx: props.jsx,
			
			      code: props.code,
			      compilerOptions: \{
			        emitDecoratorMetadata: props.emitDecoratorMetadata,
			        experimentalDecorators: true,
			      \},
			      transformers: [
			        DecoratorTransformer(),
			        ClassConstructorPropertyTransformer(),
			        CommonTSfeaturesTransformer(),
			        ImportTransformer(),
			        ExportTransformer(),
			      ],
			    \});
			  \};
			
			  describe('Class decorators', () => \{
			    it('Should inject 1 decorator ', () => \{
			      const res = testTranspile(\{
			        code: \`
			        @hey
			        class Foo \{\}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('Should inject 2 decorators ', () => \{
			      const res = testTranspile(\{
			        code: \`
			        @foo
			        @bar()
			        class Foo \{\}
			    \`,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('Should inject a decorator on export class', () => \{
			      const res = testTranspile(\{
			        code: \`
			        @bar()
			        export class Foo \{\}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('Should inject a decorator on export default class with a name', () => \{
			      const res = testTranspile(\{
			        code: \`
			        @bar()
			        export default class Foo \{\}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('Should inject a decorator on export default class without a name', () => \{
			      const res = testTranspile(\{
			        code: \`
			        @bar()
			        export default class \{\}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('Should inject inside a default function', () => \{
			      const res = testTranspile(\{
			        code: \`
			       export default function()\{
			        @bar()
			        class SomeClass \{\}
			       \}
			    \`,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('Should consider import variables too', () => \{
			      const res = testTranspile(\{
			        code: \`
			       import hey from "./mod";
			       export default function()\{
			        @bar(\{ hey \})
			        class SomeClass \{\}
			       \}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('Should have no problems transforming further', () => \{
			      const res = testTranspile(\{
			        code: \`
			        @bar()
			        export default class \{
			          public name : string = "Bob"
			        \}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Class Properties', () => \{
			    it('should decorate name 1', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class A \{
			          @foo
			          public name : string;
			        \}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should decorate name 2', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class A \{
			          @foo
			          public name : string = "hey";
			        \}
			    \`,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Method decorators', () => \{
			    it('should decorate class method', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class A \{
			          @foo
			          public hey()\{\}
			        \}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should decorate class static method', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class A \{
			          @foo
			          public static hey()\{\}
			        \}
			    \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Method param decorators', () => \{
			    it('should contain 1 decorator ', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class A \{
			
			          hey(@foo a : string)\{\}
			        \}
			    \`,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should contain 2 decorators ', () => \{
			      const res = testTranspile(\{
			        code: \`
			      class A \{
			
			        hey(@foo @bar() a : string)\{\}
			      \}
			  \`,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should contain 3 decorators ', () => \{
			      const res = testTranspile(\{
			        code: \`
			      class A \{
			
			        hey(@foo @bar() a : string, @oi b : string)\{\}
			      \}
			  \`,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should contain 1 decorator with a static method ', () => \{
			      const res = testTranspile(\{
			        code: \`
			      class A \{
			
			        static hey(@foo a : string)\{\}
			      \}
			  \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Metadata', () => \{
			    describe('Constructor metadata', () => \{
			      it('should handle normal properties', () => \{
			        const res = testTranspile(\{
			          code: \`
			          @a
			          @b()
			          export class HomeComponent \{
			            constructor(env: Env, bar: Runkari) \{\}
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			        expect(res.code).toMatchSnapshot();
			      \});
			
			      it('should handle properties with visibility', () => \{
			        const res = testTranspile(\{
			          code: \`
			          @a
			          @b()
			          export class HomeComponent \{
			            constructor(public env: Env, bar) \{\}
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			
			        expect(res.code).toMatchSnapshot();
			      \});
			
			      it('should respect imports', () => \{
			        const res = testTranspile(\{
			          code: \`
			          import Env from "./some-data";
			          @a
			          @b()
			          export class HomeComponent \{
			            constructor(public env: Env, bar) \{\}
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			
			        expect(res.code).toMatchSnapshot();
			      \});
			
			      it('should handle overload gracefully', () => \{
			        const res = testTranspile(\{
			          code: \`
			          import Env from "./some-data";
			          @a
			          @b()
			          export class HomeComponent \{
			            constructor(name : string)
			            constructor(public env: Env, bar) \{\}
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			        expect(res.code).toMatchSnapshot();
			      \});
			
			      it('should work ok without any props', () => \{
			        const res = testTranspile(\{
			          code: \`
			          @a
			          @b()
			          export class HomeComponent \{
			            constructor() \{\}
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			        expect(res.code).toMatchSnapshot();
			      \});
			
			      it('should work ok without constructor', () => \{
			        const res = testTranspile(\{
			          code: \`
			          @a
			          @b()
			          export class HomeComponent \{
			
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			
			        expect(res.code).toMatchSnapshot();
			      \});
			    \});
			
			    describe('Paramater decorators', () => \{
			      it('should add 1', () => \{
			        const res = testTranspile(\{
			          code: \`
			          export class HomeComponent \{
			            @hey
			            public name: string;
			          \}
			
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			        expect(res.code).toMatchSnapshot();
			      \});
			
			      it('should add 2 decorators', () => \{
			        const res = testTranspile(\{
			          code: \`
			          export class HomeComponent \{
			            @hey
			            @oi(\{\})
			            public name: string;
			          \}
			
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			        expect(res.code).toMatchSnapshot();
			      \});
			    \});
			
			    describe('method params meta', () => \{
			      it('should handle 1', () => \{
			        const res = testTranspile(\{
			          code: \`
			          class Application \{
			            @hey
			            @gay
			            name(@kukka @sukka kakka: string) \{\}
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			        expect(res.code).toMatchSnapshot();
			      \});
			
			      it('should handle with return type', () => \{
			        const res = testTranspile(\{
			          code: \`
			          class Application \{
			            @hey
			            @gay
			            name(@kukka @sukka kakka: string) : HelloSomeObject \{\}
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			
			        expect(res.code).toMatchSnapshot();
			      \});
			
			      it('should handle 2', () => \{
			        const res = testTranspile(\{
			          code: \`
			          class Application \{
			            @oi
			            name(some: string): HelloSomeObject \{\}
			          \}
			    \`,
			          emitDecoratorMetadata: true,
			        \});
			
			        expect(res.code).toMatchSnapshot();
			      \});
			    \});
			  \});
			
			  describe('Cosntructor decorators', () => \{
			    it('should not create decorators', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class Application \{
			          constructor(hey : string)\{\}
			        \}
			  \`,
			        emitDecoratorMetadata: true,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should create decorator wrapper', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class Application \{
			          constructor(@oi hey, name : string)\{\}
			        \}
			  \`,
			        emitDecoratorMetadata: true,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should create decorator def with 2 decorators', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class Application \{
			          constructor(@oi @foo hey, name : string)\{\}
			        \}
			  \`,
			        emitDecoratorMetadata: true,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should create decorators on 3 properties', () => \{
			      const res = testTranspile(\{
			        code: \`
			        class Application \{
			          constructor(@oi @foo hey, @hey name : string)\{\}
			        \}
			  \`,
			        emitDecoratorMetadata: true,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should create a parent property decorator + constructor props all in one wrapper', () => \{
			      const res = testTranspile(\{
			        code: \`
			        @Injectable(\{\})
			        class Application \{
			          constructor(@oi hey : number)\{\}
			        \}
			  \`,
			        emitDecoratorMetadata: true,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\decorators.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(32)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\dynamic.import.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ DynamicImportTransformer \} from '../transformers/shared/DynamicImportTransformer';
			
			describe('Dynamic import test', () => \{
			  const testTranspile = (props: \{ code: string; emitDecoratorMetadata?: boolean; jsx?: boolean \}) => \{
			    return initCommonTransform(\{
			      code: props.code,
			      jsx: props.jsx,
			      transformers: [DynamicImportTransformer()],
			    \});
			  \};
			
			  it('should handle dynamic import', () => \{
			    const result = testTranspile(\{
			      code: \`
			        async function hey() \{
			          console.log(1);
			          await import('./hello');
			          console.log(2);
			        \}
			    \`,
			    \});
			
			    expect(result.code).toMatchInlineSnapshot(\`
			      "async function hey() \{
			        console.log(1);
			        await Promise.resolve().then(() => require(\\\\"./hello\\\\"));
			        console.log(2);
			      \}
			      "
			    \`);
			    expect(result.requireStatementCollection).toHaveLength(1);
			    expect(result.requireStatementCollection[0].statement.arguments[0].value).toEqual('./hello');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\dynamic.import.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\enum.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ EnumTransformer \} from '../transformers/ts/EnumTransformer';
			
			describe('Enums test', () => \{
			  const testTranspile = (props: \{ code: string; jsx?: boolean \}) => \{
			    return initCommonTransform(\{
			      jsx: props.jsx,
			      transformers: [EnumTransformer()],
			      code: props.code,
			    \});
			  \};
			
			  it('should work with a simple enum', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          first,
			          second,
			        \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should work with a custom numner enum', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          first,
			          second = 30,
			        \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should compute binary', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          first,
			          second = 1 << 2,
			        \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should compute binary and do some math', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          first,
			          second = 1 << 2 + 10 - 30 * (2 / 10),
			        \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should compute binary and do some math with Math.function', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          first,
			          second = 1 << 2 + 10 - 30 * Math.sin(2 / 3),
			        \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should compute crazy enum and reference is in another enum', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          First = 1 << 1,
			          Second = 1 << (2 + 10 - 30 * Math.sin(2 / 3)),
			          Third = (((Second / 2) * 3) / First) * 2,
			        \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should respect local enum references if not able to compute', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          First = 1 << 1,
			          Second = Hey + 1 + First,
			        \}
			    \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should respect string value 1', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          'foo'
			        \}
			    \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should respect string value 2', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          'foo' = 'bar'
			        \}
			    \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should convert to sting if defined', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          foo = 'bar'
			        \}
			    \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should be able to handle numbers', () => \{
			    const result = testTranspile(\{
			      code: \`
			        enum Stuff \{
			          foo = 1
			        \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\enum.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(11)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\es.exports.statement.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ExportTransformer \} from '../transformers/shared/ExportTransformer';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			
			describe('Es exports statement integrity with interop', () => \{
			  const test = (props: \{ code: string \}) => \{
			    return initCommonTransform(\{
			      code: props.code,
			      compilerOptions: \{
			        esModuleInterop: true,
			        esModuleStatement: true,
			      \},
			      transformers: [ImportTransformer(), ExportTransformer()],
			    \});
			  \};
			
			  describe('__esModule', () => \{
			    it('Should not add (unused)', () => \{
			      const result = test(\{
			        code: \`
			        import some from "some"
			      \`,
			      \});
			
			      expect(result.code).not.toContain('exports.__esModule = true');
			    \});
			
			    it('Should add only once', () => \{
			      const result = test(\{
			        code: \`
			        import some from "some";
			        console.log(some);
			        export \{ some \}
			      \`,
			      \});
			
			      expect(result.code).toMatchInlineSnapshot(\`
			        "exports.__esModule = true;
			        var some_1 = require(\\\\"some\\\\");
			        var some_1d = __fuse.dt(some_1);
			        console.log(some_1d.default);
			        exports.some = some_1d.default;
			        "
			      \`);
			    \});
			
			    it('Should add with import (with interop)', () => \{
			      const result = test(\{
			        code: \`
			        import some from "some"
			        console.log(some);
			      \`,
			      \});
			      expect(result.code).toContain('exports.__esModule = true');
			    \});
			
			    it('should add exports.__esModule = true', () => \{
			      const result = test(\{
			        code: \`
			        export default function ()\{\}
			      \`,
			      \});
			      expect(result.code).toContain('exports.__esModule = true');
			    \});
			
			    it('should add with export \{\}', () => \{
			      const result = test(\{
			        code: \`
			        const stuff = 1;
			        export \{ stuff  \};
			      \`,
			      \});
			      expect(result.code).toContain('exports.__esModule = true');
			    \});
			
			    it('should add with export var', () => \{
			      const result = test(\{
			        code: \`
			        export var FooBar;
			        (function (FooBar) \{
			        \})(FooBar || (FooBar = \{\}));
			      \`,
			      \});
			      expect(result.code).toContain('exports.__esModule = true');
			    \});
			
			    it('should add with export star', () => \{
			      const result = test(\{
			        code: \`
			        export * from "./foo"
			      \`,
			      \});
			      expect(result.code).toContain('exports.__esModule = true');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\es.exports.statement.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\es.exports.test.ts', () => {
        const sourceCode = `
			import \{ ICompilerOptions \} from '../../compilerOptions/interfaces';
			import \{ ImportType \} from '../interfaces/ImportType';
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ExportTransformer \} from '../transformers/shared/ExportTransformer';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			import \{ CommonTSfeaturesTransformer \} from '../transformers/ts/CommonTSfeaturesTransformer';
			import \{ EnumTransformer \} from '../transformers/ts/EnumTransformer';
			
			const testTranspile = (props: \{ code: string; compilerOptions?: ICompilerOptions; jsx?: boolean \}) => \{
			  return initCommonTransform(\{
			    code: props.code,
			    compilerOptions: props.compilerOptions || \{\},
			    jsx: props.jsx,
			    transformers: [ImportTransformer(), EnumTransformer(), ExportTransformer(), CommonTSfeaturesTransformer()],
			  \});
			\};
			
			describe('Es exports tests', () => \{
			  describe('export typescript objects', () => \{
			    it('should remove interface', () => \{
			      const result = testTranspile(\{
			        code: \`
			         export interface Hey\{\}
			         alert(1)
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove export default interface', () => \{
			      const result = testTranspile(\{
			        code: \`
			         export default interface Hey\{\}
			         alert(1)
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove type', () => \{
			      const result = testTranspile(\{
			        code: \`
			         export type Some = Map<string,string>;
			         alert(2)
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Object export / function/ class', () => \{
			    it('should export function', () => \{
			      const result = testTranspile(\{
			        code: \`
			         export function hello()\{\}
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Mix import and export', () => \{
			    it('should export object with keys', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import stuff from "./stuff";
			        export \{ stuff  \};
			            \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export object with keys (import all)', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import * as stuff from "./stuff";
			        export \{ stuff  \};
			            \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export object with keys (import all) with alias', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import * as stuff from "./stuff";
			        export \{ stuff as oi  \};
			            \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Export var with value', () => \{
			    it('should export a variable 1', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{ Observable \} from '../Observable';
			        import \{ noop \} from '../util/noop';
			        export var NEVER = new Observable(noop);
			        console.log(NEVER);
			            \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			    it('should trace down an undefined variable', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export var FooBar;
			        (function (FooBar) \{
			        \})(FooBar || (FooBar = \{\}));
			            \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should trace down all varaiables ignore assignements (local scope)', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export var __assign = function() \{
			          __assign = Object.assign || function __assign() \{\};
			          return __assign.apply(this, arguments);
			        \};
			            \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export a variable 1', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export const a = function() \{
			          console.log(Foo);
			        \};
			        console.log(a);
			        export var Foo = \{ foo: "bar" \};
			            \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect locals within an anon function', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import TweenLite, \{ _gsScope, globals \} from './TweenLite.js';
			
			        some(function() \{
			          var TweenMax = \{\};
			          TweenMax.version = "2.0.2";
			          TweenMax.hey = "1";
			          console.log(TweenMax);
			          return TweenMax;
			        \});
			        export var Foo = globals.TweenMax;
			            \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Object export', () => \{
			    it('should export object with keys', () => \{
			      const result = testTranspile(\{
			        code: \`
			          const name1 = 2;
			          const name2 = 3;
			          export \{name1, name2\}
			            \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export enum', () => \{
			      const result = testTranspile(\{
			        code: \`
			        enum Foo \{
			          Oi,
			        \}
			        export \{ Foo \};
			            \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export object with keys2 (late) 1', () => \{
			      const result = testTranspile(\{
			        code: \`
			          export \{name1 as fun, name2\}
			          const name1 = 1;
			          const name2 = 2;
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export the same object with different names', () => \{
			      const result = testTranspile(\{
			        code: \`
			          export \{foo, foo as foo1\}
			          const foo = 1;
			
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export the same object with different names (multiple refs in the code)', () => \{
			      const result = testTranspile(\{
			        code: \`
			          var AnimationDriver = /** @class */ (function() \{
			            function AnimationDriver() \{\}
			            AnimationDriver.NOOP = new NoopAnimationDriver();
			            return AnimationDriver;
			          \})();
			          export \{ AnimationDriver, AnimationDriver as ɵAnimationDriver \};
			
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export object with keys2 (late)  function', () => \{
			      const result = testTranspile(\{
			        code: \`
			          export \{name1 as fun, name2\}
			          function name1()\{\}
			          const name2 = 2;
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export object with keys2 (late) function reversed order', () => \{
			      const result = testTranspile(\{
			        code: \`
			          function name1()\{\}
			          const name2 = 2;
			          export \{name1 as fun, name2\}
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export object with keys2 (late) 2 ( function )', () => \{
			      const result = testTranspile(\{
			        code: \`
			          console.log(1);
			          export \{name1 as fun, name2\}
			          function name1() \{\}
			          console.log(2);
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export object with keys2 (late) 2 ( class )', () => \{
			      const result = testTranspile(\{
			        code: \`
			          console.log(1);
			          export \{MySuperClass as fun, name2\}
			          class MySuperClass \{\}
			          console.log(2);
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Exports const', () => \{
			    it('should export constants', () => \{
			      const result = testTranspile(\{
			        code: \`
			      export const foo = 1, bar = 3
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export constants and use globally', () => \{
			      const result = testTranspile(\{
			        code: \`
			      export const foo = 1, bar = 3;
			      function test()\{
			        console.log(foo)
			      \}
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export constants and avoid collision', () => \{
			      const result = testTranspile(\{
			        code: \`
			      export const foo = 1, bar = 3;
			      function test(foo)\{
			        console.log(foo)
			      \}
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Export default declaration', () => \{
			    it('should export default ', () => \{
			      const result = testTranspile(\{
			        code: \`
			        const add = function()\{\}
			        export default add;
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export default (should play nicely with import) ', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import add from "./some";
			        export default add;
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export default (inverse order) ', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export default add;
			        function add()\{\}
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should not replace the scope ', () => \{
			      const result = testTranspile(\{
			        code: \`
			        function hello() \{
			          console.log(add);
			        \}
			        export default add;
			        function add() \{\}
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export expression ', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export default \{ add : add \}
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export a shorthand expression with import reference ', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import hey from "some_package";
			        export default \{ hey \}
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export default function with a name', () => \{
			      const result = testTranspile(\{
			        code: \`
			        console.log(foo)
			        export default function foo()\{\}
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should export obj', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import * as core from '@uirouter/core';
			        export \{ core \};
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export default function without a name', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export default function()\{\}
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export default class without a name', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export default class \{\}
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Export from source', () => \{
			    it('should handle shorhand', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import zipWith from './zipWith.js';
			        const foo = 1;
			        export default \{
			          zipWith, foo
			        \}
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export 1', () => \{
			      const result = testTranspile(\{
			        code: \`export \{ name \} from "./foo" \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export 1 with alias', () => \{
			      const result = testTranspile(\{
			        code: \`export \{ name as hey \} from "./foo" \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export 2 vars', () => \{
			      const result = testTranspile(\{
			        code: \`export \{ oi, name as hey \} from "./foo" \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export default', () => \{
			      const result = testTranspile(\{
			        code: \`export \{ default \} from "./foo" \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export all', () => \{
			      const result = testTranspile(\{
			        code: \`export * from "./foo" \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should emit require call', () => \{
			      const result = testTranspile(\{
			        code: \`export * from "./foo" \`,
			      \});
			      expect(result.requireStatementCollection).toEqual([
			        \{
			          importType: ImportType.FROM,
			          statement: \{
			            arguments: [\{ type: 'Literal', value: './foo' \}],
			            callee: \{ name: 'require', type: 'Identifier' \},
			            type: 'CallExpression',
			          \},
			        \},
			      ]);
			    \});
			  \});
			
			  describe('Default interop', () => \{
			    it('should export with interop', () => \{
			      const result = testTranspile(\{
			        code: \`export \{default\} from "./foo"\`,
			        compilerOptions: \{ esModuleInterop: true \},
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should export with interop', () => \{
			      const result = testTranspile(\{
			        code: \`export \{default as oi\} from "./foo"\`,
			        compilerOptions: \{ esModuleInterop: true \},
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Edge cases', () => \{
			    describe('Overriden compiler reserved exports', () => \{
			      it('User defines a compiler reserved keywors "exports"', () => \{
			        const result = testTranspile(\{
			          code: \`
			            var exports = \{\};
			            export \{ exports as default \};
			            exports.foo = function()\{\}
			          \`,
			        \});
			
			        expect(result.code).toMatchSnapshot();
			      \});
			    \});
			  \});
			
			  describe('export type', () => \{
			    it('should ignore export type"', () => \{
			      const result = testTranspile(\{
			        code: \`
			          export type \{ foo \} from "bar"
			          console.log(1)
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should remove empty export declaration"', () => \{
			      const result = testTranspile(\{
			        code: \`
			          export \{\}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\es.exports.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(46)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\es.imports.test.ts', () => {
        const sourceCode = `
			import \{ ImportType \} from '../interfaces/ImportType';
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ExportTransformer \} from '../transformers/shared/ExportTransformer';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			import \{ CommonTSfeaturesTransformer \} from '../transformers/ts/CommonTSfeaturesTransformer';
			
			/**
			 to test:
			    import * as hey from "./oi"
			    hey.something();
			*/
			
			const testTranspile = (props: \{ code: string; jsx?: boolean \}) => \{
			  return initCommonTransform(\{
			    code: props.code,
			    jsx: props.jsx,
			    transformers: [ImportTransformer(), ExportTransformer(), CommonTSfeaturesTransformer()],
			  \});
			\};
			
			describe('Es imports tests', () => \{
			  describe('import =', () => \{
			    it('should handle ImportEqualStatement', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import _ = require('lodash');
			          \`,
			      \});
			      expect(result.requireStatementCollection).toEqual([
			        \{
			          importType: ImportType.RAW_IMPORT,
			          statement: \{
			            arguments: [\{ type: 'Literal', value: 'lodash' \}],
			            callee: \{ name: 'require', type: 'Identifier' \},
			            type: 'CallExpression',
			          \},
			        \},
			      ]);
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			  describe('Local variable replacement', () => \{
			    it('should not collide with local scope', () => \{
			      const result = testTranspile(\{
			        code: \`
			              import \{ foo, bar as stuff \} from "./hello";
			              function hello(foo) \{
			                  console.log(foo, stuff);
			              \}
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should not collide with local scope 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			              import \{ foo, bar as stuff \} from "./hello";
			              function hello(foo) \{
			                  console.log(foo, stuff);
			              \}
			              console.log(foo, stuff)
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import something a trace it down', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{foobar\} from "foo"
			            console.log(1);
			            foobar();
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import something a trace it down 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{FooBar\} from "foo"
			            console.log(1);
			            new FooBar();
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import something a trace it down 3', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{Foobar\} from "foo"
			            console.log(Foobar)
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import something a trace it down 4', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{Foobar\} from "foo"
			            console.log([Foobar])
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import something a trace it down 5', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import FooBar from "foo"
			            console.log(FooBar)
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import multiple and trace it down', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import a, \{b\} from "c";
			            console.log(a, b)
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import multiple and trace it down 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{a, b\} from "c";
			            console.log(a, b)
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import everything and replace in an object', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{oi\} from "c";
			            const a = \{
			              oi : oi(String)
			            \}
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should import with alias', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{ ng as angular \} from './angular';
			            angular.module()
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import everything use it', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import * as tslib_1 from "tslib";
			            tslib_1.something()
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import everything use it 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import MySuperClass, * as everything from "module-name";
			          everything.something();
			          new MySuperClass();
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import everything use it 3', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import  * as everything from "module-name";
			          console.log(everything)
			
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import everything amd remove it (override)', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import * as everything from "module-name";
			          const everything = \{\}
			          console.log(everything)
			
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should trace down assignable', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{ foo \} from "foo";
			            Oi.prototype[foo] = function()\{\}
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import and replace in extends', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{ Foo \} from "foo";
			            class App extends Foo \{
			
			            \}
			          \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Should import with sideeffects', () => \{
			      const result = testTranspile(\{
			        code: \`
			                    console.log(1);
			                    import "foo"
			                    console.log(2);
			                \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should not mess with the scope 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import \{foo, bar\} from "foo"
			            const foo = 1;
			            console.log(foo, bar);
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should not mess with the scope 3', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import func from './function.js';
			
			          var mixin = (function(func) \{
			            console.log(func)
			          \});
			          \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Import interfaces', () => \{
			    it('should ignore the import of an interface', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import \{ Type \} from './types';
			
			          export function hey(t: Type) \{
			            return 1;
			          \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should  keey the statement if at least one of the imports are used', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import \{ Type, oi \} from './types';
			
			          export function hey(t: Type) \{
			            return oi();
			          \}
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Test require statement collection', () => \{
			    it('should not emit a require statement ', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import \{ Type, oi \} from './types';
			
			          export function hey(t: Type) \{
			
			          \}
			        \`,
			      \});
			      expect(result.requireStatementCollection).toEqual([]);
			    \});
			
			    it('should emit require statement ', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import \{ Type, oi \} from './types';
			
			          export function hey(t: Type) \{
			            console.log(oi);
			          \}
			        \`,
			      \});
			
			      expect(result.requireStatementCollection).toEqual([
			        \{
			          importType: ImportType.FROM,
			          statement: \{
			            arguments: [\{ type: 'Literal', value: './types' \}],
			            callee: \{ name: 'require', type: 'Identifier' \},
			            type: 'CallExpression',
			          \},
			        \},
			      ]);
			    \});
			
			    it('should emit raw import statement ', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import "./foo"
			        \`,
			      \});
			
			      expect(result.requireStatementCollection).toEqual([
			        \{
			          importType: ImportType.RAW_IMPORT,
			          statement: \{
			            arguments: [\{ type: 'Literal', value: './foo' \}],
			            callee: \{ name: 'require', type: 'Identifier' \},
			            type: 'CallExpression',
			          \},
			        \},
			      ]);
			    \});
			  \});
			
			  describe('Edge cases', () => \{
			    it('should handle lodash edge case 1', () => \{
			      const result = testTranspile(\{
			        code: \`
			            import toString from './toString.js';
			            import upperFirst from './upperFirst.js';
			            function capitalize(string) \{
			              return upperFirst(toString(string).toLowerCase());
			            \}
			            export default capitalize;
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Naming should always be correct', () => \{
			    it('should start every unique module with 1', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import \{ test \} from 'react';
			          import \{ useEffect \} from 'react';
			          import \{ someOther \} from './someOther';
			          useEffect(() => \{
			            console.log(test);
			            console.log(someOther);
			          \});
			      \`,
			      \});
			      expect(result.code).toMatch(/react_1/);
			      expect(result.code).toMatch(/react_2/);
			      expect(result.code).toMatch(/someOther_1/);
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('import type', () => \{
			    it('should ignore export type"', () => \{
			      const result = testTranspile(\{
			        code: \`
			          import type \{ foo \} from "bar"
			          console.log(foo)
			        \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\es.imports.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(29)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\jsx.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			import \{ JSXTransformer \} from '../transformers/shared/JSXTransformer';
			
			const testTranspile = (props: \{ code: string; jsx?: boolean \}) => \{
			  return initCommonTransform(\{
			    code: props.code,
			    compilerOptions: \{
			      jsxFactory: 'React.createElement',
			    \},
			    jsx: true,
			    props: \{ module: \{ props: \{ extension: '.tsx' \} \} \},
			    transformers: [JSXTransformer(), ImportTransformer()],
			  \});
			\};
			
			describe('JSX', () => \{
			  it('should parse simple jsx', () => \{
			    const result = testTranspile(\{
			      code: \`
			        function test()\{
			            return <div></div>
			        \}
			          \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should add text', () => \{
			    const result = testTranspile(\{
			      code: \`
			        function test()\{
			            return <div>1</div>
			        \}
			          \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should add just attributes', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import oi from "./oi";
			        function test()\{
			          return (<i id="1" f=\{oi\} ></i>)
			        \}
			          \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should add key literal attributes', () => \{
			    const result = testTranspile(\{
			      code: \`
			      function hey() \{
			        return <div data-automation="df"></div>;
			      \}\`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should convert attributes without vales to boolean', () => \{
			    const result = testTranspile(\{
			      code: \`
			      function hey() \{
			        return <div some></div>;
			      \}\`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should add just attributes and spread', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import oi from "./oi";
			        function test()\{
			          return (<i id="1" f=\{oi\} \{...props\} ></i>)
			        \}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should spread correctly', () => \{
			    const result = testTranspile(\{
			      code: \`
			        function EventList () \{
			          const cameraIDs = ['a'];
			          return <Foo jo='test' \{...entry\} cameraIDs=\{cameraIDs\} key='123' />;
			        \}
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should have only one spread props', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import oi from "./oi";
			        function test()\{
			          return (<i \{...props\} ></i>)
			        \}
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should keep the order', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import oi from "./oi";
			        function test()\{
			          return (<i id=\{1\} f=\{oi\} \{...props\} s=\{2\} \{...rest\}></i>)
			        \}
			          \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should remove empty expressions', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import oi from "./oi";
			        function test()\{
			          return (<i> \{/* <i></i> */\} </i>)
			        \}
			          \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle JSX fragment', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import React from "react";
			        function test()\{
			          return (
			            <div>
			              <>
			                <div>1</div>
			              </>
			            </div>
			          )
			        \}
			          \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle dotted JSX elements', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import React from "react";
			        function test()\{
			          return <animated.div>1</animated.div>
			        \}
			          \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle dotted JSX elements deep', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import React from "react";
			        function test()\{
			          return <this.state.foo.bar.animated.div/>
			        \}
			          \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should work with JSXSpreadChild', () => \{
			    const result = testTranspile(\{
			      code: \`
			
			        function test()\{
			          return (<i>\{...children\}</i>)
			        \}
			          \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\jsx.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\namespaces.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ExportTransformer \} from '../transformers/shared/ExportTransformer';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			import \{ NamespaceTransformer \} from '../transformers/ts/NameSpaceTransformer';
			
			const testTranspile = (props: \{ code: string; jsx?: boolean \}) => \{
			  return initCommonTransform(\{
			    jsx: true,
			    transformers: [NamespaceTransformer(), ImportTransformer(), ExportTransformer()],
			    code: props.code,
			  \});
			\};
			
			describe('Namespaces', () => \{
			  it('should compile namespace', () => \{
			    const result = testTranspile(\{
			      code: \`
			        import oi from "./oi";
			        export const b = 1;
			        namespace Foo \{
			            export const a = 1;
			            export function hello() \{\}
			            console.log(a, oi, b);
			        \}
			        console.log(a, foo, oi, b);
			        \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should export namespace', () => \{
			    const result = testTranspile(\{
			      code: \`
			      export namespace Hey \{
			        export function hello() \{\}
			      \}
			        \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			  // testing all of that is a waste of time, namespaces should be deprecated
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\namespaces.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\NullishCoalescing.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ NullishCoalescingTransformer \} from '../transformers/nullishCoalescing/NullishCoalescingTransformer';
			import \{ OptionalChaningTransformer \} from '../transformers/optionalChaining/OptionalChainingTransformer';
			
			const testTranspile = (props: \{ code: string; jsx?: boolean \}) => \{
			  return initCommonTransform(\{
			    code: props.code,
			    jsx: true,
			    transformers: [NullishCoalescingTransformer(), OptionalChaningTransformer()],
			  \});
			\};
			
			describe('NullishCoalescing', () => \{
			  it('case 1', () => \{
			    const result = testTranspile(\{
			      code: \`
			         a ?? b
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('case 1 with obj', () => \{
			    const result = testTranspile(\{
			      code: \`
			         a.c ?? d
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('case 1 with option call', () => \{
			    const result = testTranspile(\{
			      code: \`
			         a.c() ?? d
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('long 1', () => \{
			    const result = testTranspile(\{
			      code: \`
			         foo.bar ?? oi ?? soi ?? doi.o
			        \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('long with optional chaning', () => \{
			    const result = testTranspile(\{
			      code: \`
			         foo?.bar ?? oi ?? soi ?? doi?.o
			        \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\NullishCoalescing.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\optionalChaning\\optional.chaining.transformer.test.ts', () => {
        const sourceCode = `
			import \{ writeFileSync \} from 'fs';
			import * as path from 'path';
			import * as ts from 'typescript';
			import \{ fileExists, readJSONFile \} from '../../../utils/utils';
			import \{ generate \} from '../../generator/generator';
			import \{ parseJavascript \} from '../../parser';
			import \{ initCommonTransform \} from '../../testUtils';
			import \{ OptionalChaningTransformer \} from '../../transformers/optionalChaining/OptionalChainingTransformer';
			
			const testTranspile = (props: \{ code: string; jsx?: boolean \}) => \{
			  return initCommonTransform(\{
			    code: props.code,
			    jsx: true,
			    props: \{ module: \{\} \},
			    transformers: [OptionalChaningTransformer()],
			  \});
			\};
			
			const cases: Array<string> = [
			  'a?.b',
			  'a?.b?.c',
			  'a?.b.c',
			  'a?.b?.c?.d',
			  'a?.b?.c?.d?.e',
			  'a?.b?.c?.d?.e?.f',
			  'a.b?.c?.d?.e?.f',
			  'a.b.c?.d?.e?.f',
			  'a.b.c.d?.e?.f',
			  'a.b?.c.d?.e.f',
			  'a.b?.c.d?.e?.f',
			
			  // handle computed properties
			  'a?.[0]',
			  'a?.c[0]',
			  'a?.c?.[0]',
			  'a?.["foo"]',
			  'a?.c["foo"]',
			  'a?.c?.["foo"]?.d',
			  'a.c?.["foo"]?.d.e?.f',
			
			  // optional calls set 1
			  'a?.()',
			  'a?.b?.()',
			  'a?.b.c?.()',
			  'a?.b.c?.(1,2,3,4)',
			  'a?.b.c?.d.e?.()',
			  'a?.b.c?.d.e?.().g()',
			
			  // optional calls set 2
			  'a?.()?.()',
			  'a?.()?.a.b?.c',
			  'a?.().a.k?.c',
			  'a?.()?.(1)(2)(3)',
			  'a?.()?.(1)[foo.bar]',
			  'a?.()?.(1)?.(2)?.(3)',
			  'a?.()?.(1)?.(2)?.(3)?.a.b?.()()',
			  'a?.()?.(1)?.(2)?.(3)?.a["b"]?.()()',
			
			  // optional calls set 3
			  'a.b.c().d?.e?.()',
			  'a.b.c().d?.e?.().f()?.()',
			  'a.b.c()?.[d.e]?.["one"]()?.f()?.()',
			
			  // starting expressions
			  'a.b()?.().a',
			  'a["foo"]?.();',
			  'a["foo"]?.()?.()()',
			  'a.b()?.()?.()',
			  'a["foo"]()?.o()?.().k()?.c',
			  'a().b()?.c',
			  'a()?.b',
			  '(a || b)?.c',
			];
			
			const TYPESCRIPT_SNAPSHOT_FILE = path.join(__dirname, 'typescript.snapshot.json');
			let TYPESCRIPT_SHAPSHOTS;
			function createTypeScriptSnapshots(cases: Array<string>) \{
			  TYPESCRIPT_SHAPSHOTS = \{\};
			  for (const str of cases) \{
			    const compilerOptions: ts.CompilerOptions = \{
			      module: ts.ModuleKind.CommonJS,
			      target: ts.ScriptTarget.ES2019,
			    \};
			    const code = ts.transpileModule(str, \{
			      compilerOptions,
			      fileName: __filename,
			    \});
			    let transpiled = code.outputText;
			    // replace typescript _a with fusebox numbers
			    let alphabet = ['-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
			
			    transpiled = transpiled.replace(/_([a-z])/gm, (input) => \{
			      const varName = input.split('_')[1];
			      return \`_\$\{alphabet.indexOf(varName)\}_\`;
			    \});
			
			    const ast = parseJavascript(transpiled);
			    TYPESCRIPT_SHAPSHOTS[str] = generate(ast, \{\});
			  \}
			  writeFileSync(TYPESCRIPT_SNAPSHOT_FILE, JSON.stringify(TYPESCRIPT_SHAPSHOTS, null, 2));
			\}
			
			if (!fileExists(TYPESCRIPT_SNAPSHOT_FILE)) \{
			  createTypeScriptSnapshots(cases);
			\} else \{
			  TYPESCRIPT_SHAPSHOTS = readJSONFile(TYPESCRIPT_SNAPSHOT_FILE);
			\}
			
			describe('Optional chaining', () => \{
			  describe('Snapshot test', () => \{
			    for (const str of cases) \{
			      it(\`Should handle \$\{str\}\`, () => \{
			        const res = testTranspile(\{ code: str \});
			        expect(res.code).toEqual(TYPESCRIPT_SHAPSHOTS[str]);
			      \});
			    \}
			  \});
			
			  describe('Corner cases', () => \{
			    it('should handle asExpression', () => \{
			      const res = testTranspile(\{
			        code: \`
			        (a as string)?.b?.c;
			        a?.b?.c;
			        \`,
			      \});
			      expect(res).toMatchSnapshot();
			    \});
			
			    it('should await expression 1', () => \{
			      const res = testTranspile(\{
			        code: \`
			        async function main()\{
			          await a?.b
			        \}
			        \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should await expression 2', () => \{
			      const res = testTranspile(\{
			        code: \`
			        async function main()\{
			          await a?.b()
			        \}
			        \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should handle this expression', () => \{
			      const res = testTranspile(\{
			        code: \`this.a?.b\`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should handle not null expression', () => \{
			      const res = testTranspile(\{
			        code: \`a?.b!;\`,
			      \});
			      expect(res.code).toMatchSnapshot();
			    \});
			
			    it('should await expression with ?? ', () => \{
			      const res = testTranspile(\{
			        code: \`
			        let b = async (a, c) => \{
			          const b = await a?.a() ?? await c?.d;
			        \};
			        \`,
			      \});
			
			      expect(res.code).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\optionalChaning\\optional.chaining.transformer.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\process.transform.test.ts', () => {
        const sourceCode = `
			import \{ ImportType \} from '../interfaces/ImportType';
			
			import \{ ITarget \} from '../../config/ITarget';
			import \{ initCommonTransform \} from '../testUtils';
			import \{ BrowserProcessTransformer \} from '../transformers/bundle/BrowserProcessTransformer';
			
			const testTranspile = (props: \{ code: string; env?: any; target?: ITarget \}) => \{
			  return initCommonTransform(\{
			    compilerOptions: \{
			      buildTarget: props.target || 'browser',
			      processEnv: props.env || \{\},
			    \},
			    props: \{
			      ctx: \{ config: \{ env: props.env || \{\}, target: props.target || 'browser' \} \},
			    \},
			
			    code: props.code,
			    transformers: [BrowserProcessTransformer()],
			  \});
			\};
			
			describe('Process transform test', () => \{
			  describe('process.env.***', () => \{
			    it('should replace process.env.NODE_ENV', () => \{
			      const result = testTranspile(\{
			        code: \`
			          console.log(process.env.NODE_ENV);
			      \`,
			        env: \{ NODE_ENV: 'development' \},
			        target: 'browser',
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should replace with undefined if value not found', () => \{
			      const result = testTranspile(\{
			        code: \`
			          console.log(process.env.NODE_ENV);
			      \`,
			        env: \{\},
			        target: 'browser',
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Should not touch process', () => \{
			    it('should transform process.version', () => \{
			      const result = testTranspile(\{
			        code: \`
			          var process = \{\};
			          console.log(process.version);
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should inject process on assignment', () => \{
			      const result = testTranspile(\{
			        code: \`
			          process.env.NODE_ENV = "hey";
			
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			  describe('process.xxx', () => \{
			    it('should transform process.version', () => \{
			      const result = testTranspile(\{
			        code: \`
			          console.log(process.version);
			      \`,
			      \});
			
			      expect(result.code).toMatch(/console.log\\("v\\d+/);
			    \});
			
			    it('should transform process.versions', () => \{
			      const result = testTranspile(\{
			        code: \`console.log(process.versions);\`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should transform process.title', () => \{
			      const result = testTranspile(\{
			        code: \`console.log(process.title);\`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should transform process.umask', () => \{
			      const result = testTranspile(\{
			        code: \`console.log(process.umask);\`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should transform process.browser', () => \{
			      const result = testTranspile(\{
			        code: \`console.log(process.browser);\`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should transform process.cwd', () => \{
			      const result = testTranspile(\{
			        code: \`console.log(process.cwd());\`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should transform process.env', () => \{
			      const result = testTranspile(\{
			        code: \`console.log(process.env);\`,
			        env: \{ foo: 'bar' \},
			        target: 'browser',
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should transform process.env (not add twice)', () => \{
			      const result = testTranspile(\{
			        code: \`
			        alert(process.env)
			        console.log(process.env);
			        \`,
			        env: \{ foo: 'bar' \},
			        target: 'browser',
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should inject process if a variable is not recognized', () => \{
			      const result = testTranspile(\{
			        code: \`
			        console.log(process.some());
			        \`,
			      \});
			
			      expect(result.requireStatementCollection).toEqual([
			        \{
			          importType: ImportType.REQUIRE,
			          statement: \{
			            arguments: [\{ type: 'Literal', value: 'process' \}],
			            callee: \{ name: 'require', type: 'Identifier' \},
			            type: 'CallExpression',
			          \},
			        \},
			      ]);
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\process.transform.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(13)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\require.statement.interceptor.test.ts', () => {
        const sourceCode = `
			import \{ ImportType \} from '../interfaces/ImportType';
			import \{ initCommonTransform \} from '../testUtils';
			import \{ RequireStatementInterceptor \} from '../transformers/bundle/RequireStatementInterceptor';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			
			const testTranspile = (props: \{ code: string; fileName?: string; target?: string \}) => \{
			  return initCommonTransform(\{
			    code: props.code,
			    transformers: [RequireStatementInterceptor(), ImportTransformer()],
			  \});
			\};
			
			describe('Require statement intercepto', () => \{
			  it('should emit require', () => \{
			    const result = testTranspile(\{
			      code: \`
			      console.log(require("./a"))
			    \`,
			    \});
			
			    expect(result.requireStatementCollection).toEqual([
			      \{
			        importType: ImportType.REQUIRE,
			        statement: \{
			          arguments: [\{ type: 'Literal', value: './a' \}],
			          callee: \{ name: 'require', type: 'Identifier' \},
			          optional: false,
			          type: 'CallExpression',
			        \},
			      \},
			    ]);
			  \});
			
			  it('should emit only twice', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import hey from "./hey";
			      console.log(require("./a"), hey)
			    \`,
			    \});
			    expect(result.requireStatementCollection).toEqual([
			      \{
			        importType: ImportType.REQUIRE,
			        statement: \{
			          optional: false,
			          type: 'CallExpression',
			
			          arguments: [\{ type: 'Literal', value: './a' \}],
			          callee: \{ name: 'require', type: 'Identifier' \},
			        \},
			      \},
			      \{
			        importType: ImportType.FROM,
			        statement: \{
			          arguments: [\{ type: 'Literal', value: './hey' \}],
			          callee: \{ name: 'require', type: 'Identifier' \},
			          type: 'CallExpression',
			        \},
			      \},
			    ]);
			  \});
			
			  it('it should honor custom require', () => \{
			    const result = testTranspile(\{
			      code: \`
			      function foo(require) \{
			        const b = require("./a");
			        console.log(b);
			      \}
			      console.log(foo);
			    \`,
			    \});
			    expect(result.requireStatementCollection).toHaveLength(0);
			  \});
			
			  it('it should replace typeof require', () => \{
			    const result = testTranspile(\{
			      code: \`
			      console.log(typeof require);
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('it should replace typeof require is defined in the scope', () => \{
			    const result = testTranspile(\{
			      code: \`
			      function some(require)\{
			        console.log(typeof require);
			      \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('it should replace require ref', () => \{
			    const result = testTranspile(\{
			      code: \`
			      if (typeof require === 'function' && require) \{
			        console.log(1);
			      \}
			    \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('it should replace require ref 2', () => \{
			    const result = testTranspile(\{
			      code: \`
			      if (typeof require === 'function' && typeof require.ensure) \{
			        console.log(1);
			      \}
			    \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\require.statement.interceptor.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('fuse-box_fuse-box\\src\\compiler\\__tests__\\scopes.test.ts', () => {
        const sourceCode = `
			import \{ initCommonTransform \} from '../testUtils';
			import \{ ExportTransformer \} from '../transformers/shared/ExportTransformer';
			import \{ ImportTransformer \} from '../transformers/shared/ImportTransformer';
			import \{ ClassConstructorPropertyTransformer \} from '../transformers/ts/ClassConstructorPropertyTransformer';
			import \{ CommonTSfeaturesTransformer \} from '../transformers/ts/CommonTSfeaturesTransformer';
			
			const testTranspile = (props: \{ code: string; fileName?: string; target?: string \}) => \{
			  return initCommonTransform(\{
			    code: props.code,
			    transformers: [
			      ImportTransformer(),
			      ExportTransformer(),
			      CommonTSfeaturesTransformer(),
			      ClassConstructorPropertyTransformer(),
			    ],
			  \});
			\};
			
			describe('scope test', () => \{
			  it('option 1', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ hey \} from 'oi';
			      function hey()\{\}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('option 2', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ hey \} from 'oi';
			      function hey()\{\}
			      console.log(hey);
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('variation 3', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ hey \} from 'oi';
			      function foo(hey)\{\}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('variation 4', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ hey \} from 'oi';
			      const hey = (hey) => \{\}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('variation 5', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ hey \} from 'oi';
			      const hey = (hey) => \{
			        console.log(hey)
			      \}
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			  it('variation 6', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ hey \} from 'oi';
			      console.log(hey);
			      const hey = (hey) => \{
			        console.log(hey)
			      \}
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('variation 7', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ Hey \} from 'oi';
			      class Hey \{
			        foo(hey)\{ console.log(hey)\}
			      \}
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('variation with class After', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ Hey \} from 'oi';
			      console.log(Hey);
			      class Hey \{
			        foo(hey)\{ console.log(hey)\}
			      \}
			      new Hey()
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('variation with arrow expression', () => \{
			    const result = testTranspile(\{
			      code: \`
			      export const a = () => \{\};
			      console.log(() => a);
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('variation compute properties', () => \{
			    const result = testTranspile(\{
			      code: \`
			      export const a = () => \{\};
			      const b = \{[a] : 1\}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('variation normal prop', () => \{
			    const result = testTranspile(\{
			      code: \`
			      export const a = () => \{\};
			      const b = \{a : a\}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('Array pattern', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import foo from "oi";
			      function one(props)\{
			        const [foo] = props;
			        console.log(foo)
			      \}
			      console.log(foo)
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			  it('Object pattern', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import foo from "oi";
			      function one(props)\{
			        const \{foo\} = props;
			        console.log(foo)
			      \}
			      console.log(foo)
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('Object pattern with spread', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import foo from "oi";
			      function one(props)\{
			        const \{foo, ...rest\} = props;
			        console.log(foo)
			      \}
			      console.log(foo)
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('Object respect spread in Object', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{foo, rest\} from "oi";
			      function one(props)\{
			        const \{foo, ...rest\} = props;
			        console.log(rest)
			
			      \}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('Object respect spread in Array', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{foo, rest\} from "oi";
			      function one(props)\{
			        const [foo, ...rest] = props;
			        console.log(rest)
			      \}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should work with nulll', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{foo, rest\} from "oi";
			      function one(props)\{
			        const [, foo, ...rest] = props;
			        console.log(rest)
			      \}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted variable', () => \{
			    const result = testTranspile(\{
			      code: \`
			      export var Foo = (function() \{
			        console.log(Foo);
			        function Foo() \{\}
			      \})();
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted variable deep', () => \{
			    const result = testTranspile(\{
			      code: \`
			      export var Foo = (function() \{
			        function Bar()\{
			          console.log(Foo);
			        \}
			        function Foo() \{\}
			      \})();
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted variable 2', () => \{
			    const result = testTranspile(\{
			      code: \`
			      function some() \{\}
			      export var Disposable = (function() \{
			        function Disposable() \{\}
			        return Disposable;
			      \})();
			      console.log(Disposable);
			
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted var inside', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ execute \} from 'stuff';
			      function hello() \{\}
			      function some() \{
			        function execute()\{\}
			      \}
			      execute();
			
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted var inside 2', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ execute \} from 'stuff';
			
			      function some() \{
			        function execute()\{\}
			      \}
			      execute();
			
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted var inside 3', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ execute \} from 'stuff';
			      function execute()\{\}
			      execute();
			
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted var inside 4', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ isFunction, noop \} from '../utils/js_utils';
			      export var Disposable = (function() \{
			        function Disposable(action) \{\}
			
			        return Disposable;
			      \})();
			      console.log(Disposable);
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted var inside 5', () => \{
			    const result = testTranspile(\{
			      code: \`
			      export var Disposable = (function() \{
			        function Disposable(action) \{\}
			
			        return Disposable;
			      \})();
			      console.log(Disposable);
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted var inside 6', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ isFunction, noop \} from '../utils/js_utils';
			      export var Disposable = (function() \{
			        function Disposable(action) \{
			          console.log(isFunction)
			        \}
			
			        return Disposable;
			      \})();
			      console.log(Disposable);
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted var Buffer', () => \{
			    const result = testTranspile(\{
			      code: \`
			      'use strict'
			
			      var base64 = require('base64-js');
			      var ieee754 = require('ieee754');
			
			      exports.Buffer = Buffer;
			      function Buffer()\{\}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle hoisted var Buffer 2', () => \{
			    const result = testTranspile(\{
			      code: \`
			      'use strict'
			      function two()\{\}
			      function one()\{\}
			      console.log(Buffer)
			      function Buffer()\{\}
			      function three()\{\}
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle import buffer', () => \{
			    const result = testTranspile(\{
			      code: \`
			      'use strict'
			      import Buffer from "other"
			      function two()\{\}
			      function one()\{\}
			      console.log(Buffer)
			
			      function three()\{\}
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should trace down an import 1', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import zenObservable from 'zen-observable';
			      var Observable = zenObservable;
			
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should correctly transpile export default with defined const', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ SomeName \} from './type';
			      const SomeName = () => \{\};
			      export default SomeName;
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should correctly transpile export default with defined var', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ SomeName \} from './type';
			      export default SomeName;
			      var SomeName = () => \{\};
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should correctly transpile export default with defined case : 2', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ SomeName \} from './type';
			      export \{ SomeName \}
			      var SomeName = () => \{\};
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should correctly transpile export default with defined case : 3', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ SomeName \} from './type';
			      export \{ SomeName \}
			
			      \`,
			    \});
			
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  it('should handle multiple scenarious at one', () => \{
			    const result = testTranspile(\{
			      code: \`
			      import \{ execute \} from 'shit';
			      import foo from 'oi';
			      import \{ Hey \} from 'hey';
			
			      function hello() \{\}
			      function some() \{
			        const execute = \{\};
			      \}
			      execute();
			
			      function one(props) \{
			        const \{ foo, ...rest \} = props;
			        console.log(foo);
			      \}
			      console.log(foo);
			
			      console.log(Hey);
			      class Hey \{
			        foo(hey) \{
			          console.log(hey);
			        \}
			      \}
			      new Hey();
			
			      function some() \{\}
			      export var Disposable = (function() \{
			        function Disposable() \{\}
			        return Disposable;
			      \})();
			      console.log(Disposable);
			
			      \`,
			    \});
			    expect(result.code).toMatchSnapshot();
			  \});
			
			  describe('Iterator scope', () => \{
			    it('Export spread 1', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import i from 'mod';
			        for (var i = 0; i <= 0; i++) \{
			          console.log(i);
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('for in', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import i from 'mod';
			        for (var i in foo) \{
			          console.log(i);
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Spread', () => \{
			    it('spread and defined var', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import oi from "./oi"
			        function foo()\{
			          function boo()\{
			            const \{foo : \{ bar : [ oi ] \}\} = \{\}
			            function another()\{
			              console.log(oi);
			            \}
			          \}
			          console.log(oi);
			        \}
			
			
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Export spread 1', () => \{
			      const result = testTranspile(\{
			        code: \`
			        const [foo, bar] = []
			        export \{foo, bar\}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Export spread 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			        const \{foo, bar\} = \{\}
			        export \{foo, bar\}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Export spread 3', () => \{
			      const result = testTranspile(\{
			        code: \`
			        const \{foo : \{ bar \}\} = \{\}
			        export \{ bar \}
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Export spread 4 (deep)', () => \{
			      const result = testTranspile(\{
			        code: \`
			        const \{foo : \{ bar : [ oi ] \}\} = \{\}
			        export \{ oi \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('Export spread 4 (deep) skip key', () => \{
			      const result = testTranspile(\{
			        code: \`
			        const \{foo : \{ bar : [ oi ] \}\} = \{\}
			        export \{ oi, bar \}
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('classes', () => \{
			    it('should respect method prop', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{ bar \} from "bar";
			        class Foo \{
			          method_1(bar)\{
			            console.log(bar)
			          \}
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect constructor prop', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{ bar \} from "bar";
			        class Foo \{
			          constructor(bar)\{
			            console.log(bar)
			          \}
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect constructor prop with public accessibility', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{ bar \} from "bar";
			        class Foo \{
			          constructor(public bar)\{
			            console.log(bar)
			          \}
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect catch clause', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import someException from 'someException';
			        function oi() \{\}
			        function hey() \{
			          try \{
			            oi();
			          \} catch (someException) \{
			            console.log(someException);
			          \}
			        \}
			
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Import qualifiers', () => \{
			    it('should iqnore qualifer ref', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{Foo\} from 'oi';
			        import Bar = Foo;
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should iqnore qualifer ref deep', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{Foo\} from 'oi';
			        import Bar = Foo.baz;
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should replace qualifer ref', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{Foo\} from 'oi';
			        import Bar = Foo.baz;
			
			        function oi()\{
			          console.log(Bar)
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should replace qualifer ref 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{Foo\} from 'oi';
			        import Bar = Foo;
			
			        function oi()\{
			          console.log(Bar)
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should replace qualifer ref 2 times correctly', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{Foo\} from 'oi';
			        import Bar = Foo.hey;
			
			        function oi()\{
			          console.log(Bar)
			          function other()\{
			            console.log(Bar)
			          \}
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should replace qualifer ref and respect local scope', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{Foo\} from 'oi';
			        import Bar = Foo.hey;
			
			        function oi()\{
			          console.log(Bar)
			          function other(Bar)\{
			            console.log(Bar)
			          \}
			        \}
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect assignment pattern', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import foo from './foo';
			        function hello(foo = 1) \{
			          console.log(foo);
			        \}
			
			      \`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect ArrowFunction expression', () => \{
			      const result = testTranspile(\{
			        code: \`
			        export const foo = oi(foo => some(foo));
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect assignment pattern 2', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import \{ getSome \} from 'store/actions';
			        const hey = (\{ getSome \}) => getSome();\`,
			      \});
			
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect assignment pattern inside const', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import foo from 'foo';
			        const \{ foo = false \} = options;
			        console.log(foo);
			
			
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			    it('should respect another edge case with assignment', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import bar from 'bar';
			        function foo(hello = bar) \{\}
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			
			    it('var scope has function level scope', () => \{
			      const result = testTranspile(\{
			        code: \`
			        import t from 'bar';
			        function a() \{
			          for (var t = []; t.length < 3;) \{
			            t.push(1);
			          \}
			          console.log(t);
			        \}
			        t(a);
			      \`,
			      \});
			      expect(result.code).toMatchSnapshot();
			    \});
			
			
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compiler\\__tests__\\scopes.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(59)
    });
    it('fuse-box_fuse-box\\src\\compilerOptions\\__tests__\\compilerOptions.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ testUtils \} from '../../utils/test_utils';
			import \{ findTsConfig \} from '../findTSConfig';
			testUtils();
			const cases = path.join(__dirname, 'cases');
			
			describe('Find typescript config', () => \{
			  it('Should find by directory', () => \{
			    const data = findTsConfig(\{
			      directory: path.join(cases, 'case1/src/foo/bar'),
			      root: cases,
			    \});
			
			    expect(data).toMatchFilePath('cases/case1/tsconfig.json\$');
			  \});
			
			  it('Should find by fileName', () => \{
			    const data = findTsConfig(\{
			      fileName: path.join(cases, 'case1/src/foo/bar/hello.js'),
			      root: cases,
			    \});
			
			    expect(data).toMatchFilePath('cases/case1/tsconfig.json\$');
			  \});
			
			  it('Should not find', () => \{
			    const data = findTsConfig(\{
			      directory: path.join(cases, 'case1/src/foo/bar'),
			      root: path.join(cases, 'case1/src'),
			    \});
			
			    expect(data).toBeUndefined();
			  \});
			
			  it('Should not find (max iterations reached)', () => \{
			    const directories = [cases];
			    for (let i = 0; i <= 30; i++) \{
			      directories.push(\`dir_\$\{i\}\`);
			    \}
			    const data = findTsConfig(\{
			      directory: path.join(...directories),
			      root: cases,
			    \});
			
			    expect(data).toBeUndefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compilerOptions\\__tests__\\compilerOptions.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('fuse-box_fuse-box\\src\\compilerOptions\\__tests__\\typescriptReferences.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ env \} from '../../env';
			import \{ testUtils \} from '../../utils/test_utils';
			import \{ buildMappings, groupByPackage, mappingsToResolver \} from '../typescriptReferences';
			const P = path.join; // use P for joining and normalizing paths
			const fuseRoot = env.APP_ROOT;
			const cases = path.relative(fuseRoot, P(__dirname, 'cases'));
			const case3 = P(cases, 'case3');
			testUtils();
			
			/*
			function toPortablePath(p) \{
			    if (process.platform !== 'win32') return p;
			    return (p.match(/^[a-zA-Z]:.*\$/) ? \`/\$\{p\}\` : p).replace(/\\\\/g, \`/\`);
			\}
			*/
			
			describe('test case 3', () => \{
			  const references = [\{ path: P('pkgA', 'tsconfig.json') \}];
			
			  const expectedMappings = new Map<string, string>([
			    [P(fuseRoot, case3, \`/pkgA/dist/alpha.js\`), P(fuseRoot, case3, \`/pkgA/src/alpha.ts\`)],
			    [P(fuseRoot, case3, \`/pkgB/dist/beta.js\`), P(fuseRoot, case3, \`/pkgB/src/beta.ts\`)],
			    [P(fuseRoot, case3, \`/pkgC/output/charlie.js\`), P(fuseRoot, case3, \`/pkgC/input/charlie.ts\`)],
			    [P(fuseRoot, case3, \`/pkgC/output/main.js\`), P(fuseRoot, case3, \`/pkgC/input/main.ts\`)],
			  ]);
			
			  const expectedGrouped = new Map<string, Map<string, string>>([
			    // has paths that are relative to the immediate parent packages
			    [P(fuseRoot, case3, \`/pkgA\`), new Map<string, string>([[P(\`dist/alpha.js\`), P(\`src/alpha.ts\`)]])],
			    [P(fuseRoot, case3, \`/pkgB\`), new Map<string, string>([[P(\`dist/beta.js\`), P(\`src/beta.ts\`)]])],
			    [
			      P(fuseRoot, case3, \`/pkgC\`),
			      new Map<string, string>([
			        [P(\`output/charlie.js\`), P(\`input/charlie.ts\`)],
			        [P(\`output/main.js\`), P(\`input/main.ts\`)],
			      ]),
			    ],
			    // and also has paths that are relative to the common ancestor package
			    // the fuse-box root is one because it has a package.json
			    [
			      P(fuseRoot),
			      new Map<string, string>([
			        [P(case3, \`pkgA/dist/alpha.js\`), P(case3, \`pkgA/src/alpha.ts\`)],
			        [P(case3, \`pkgB/dist/beta.js\`), P(case3, \`pkgB/src/beta.ts\`)],
			        [P(case3, \`pkgC/output/charlie.js\`), P(case3, \`pkgC/input/charlie.ts\`)],
			        [P(case3, \`pkgC/output/main.js\`), P(case3, \`pkgC/input/main.ts\`)],
			      ]),
			    ],
			  ]);
			
			  it('throws meaningful error on bad reference path', () => \{
			    expect(() => \{
			      buildMappings(references, P(\`/i/dont/exist\`));
			    \}).toThrow();
			  \});
			
			  it('builds the expected out->in mappings from test case 3', () => \{
			    const mappings = buildMappings(references, path.resolve(fuseRoot, case3));
			    expect(mappings).toEqual(expectedMappings);
			  \});
			
			  it('groups the set of mappings by package', () => \{
			    const grouped = groupByPackage(expectedMappings);
			    // in case the tester happens to have any packge.json above the fuse-box root,
			    // tsreference will have added groups for those as it should
			    // so we'll just ignore those here
			    for (const dir of ancestorsOf(fuseRoot)) grouped.delete(dir);
			    const expected = expectedGrouped;
			    expect(grouped).toEqual(expected);
			  \});
			
			  it('creates a working resolver from grouped mappings', () => \{
			    const resolver = mappingsToResolver(expectedGrouped);
			    expect(resolver).toBeTruthy();
			
			    // an import of 'pkg-c/output/charlie'
			    // will already have the 'pkg-c' part resolved to the 'pkgC' folder's path
			    // so all that is left is to resolve from that folder to 'output/charlie'
			    // and if everything works, we should get back 'input/charlie.ts'
			    // which is the input corresponding to that output
			    expect(resolver(\{ fileDir: P(fuseRoot, case3, \`pkgC\`), target: P(\`output/charlie\`) \})).toEqual(\{
			      absPath: P(fuseRoot, case3, \`pkgC/input/charlie.ts\`),
			      extension: '.ts',
			      fileExists: true,
			    \});
			
			    // this should work even if we include the output's extension
			    expect(resolver(\{ fileDir: P(fuseRoot, case3, \`pkgC\`), target: P(\`output/charlie.js\`) \})).toEqual(\{
			      absPath: P(fuseRoot, case3, \`pkgC/input/charlie.ts\`),
			      extension: '.ts',
			      fileExists: true,
			    \});
			
			    // this should also be able to resolve the package "main"
			    // since pkg-c's "main" is "output/index.js" we should get back "input/index.ts"
			    expect(resolver(\{ fileDir: P(fuseRoot, case3, \`pkgC\`), target: \`\` \})).toEqual(\{
			      absPath: P(fuseRoot, case3, \`pkgC/input/main.ts\`),
			      customIndex: true,
			      extension: '.ts',
			      fileExists: true,
			      isDirectoryIndex: true,
			    \});
			  \});
			\});
			
			function* ancestorsOf(absPath: string) \{
			  const start = path.normalize(absPath);
			  for (let dir = parentDir(start); dir !== undefined; dir = parentDir(dir)) \{
			    yield dir;
			  \}
			\}
			
			function parentDir(normalizedPath: string): undefined | string \{
			  const parent = path.dirname(normalizedPath);
			  if (parent === normalizedPath) return undefined;
			  return parent;
			\}
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\compilerOptions\\__tests__\\typescriptReferences.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('fuse-box_fuse-box\\src\\config\\__tests__\\config.test.ts', () => {
        const sourceCode = `
			import \{ createContext \} from '../../core/context';
			import \{ EnvironmentType \} from '../EnvironmentType';
			import \{ IConfig, IPublicConfig \} from '../IConfig';
			
			describe('Config test', () => \{
			  function test(config: IPublicConfig): IConfig \{
			    const ctx = createContext(\{
			      envType: EnvironmentType.DEVELOPMENT,
			      publicConfig: \{ ...\{ entry: __filename \}, ...config \},
			      runProps: \{\},
			    \});
			    return ctx.config;
			  \}
			
			  describe('Depdndencies field', () => \{
			    it('should give default include field for browser', () => \{
			      const res = test(\{ target: 'browser' \});
			      expect(res.dependencies.include).toEqual([]);
			    \});
			
			    it('should give default fields for server', () => \{
			      const res = test(\{ target: 'server' \});
			      expect(res.dependencies.serverIgnoreExternals).toEqual(true);
			    \});
			
			    it('should override serverIgnoreExternals', () => \{
			      const res = test(\{ dependencies: \{ serverIgnoreExternals: false \}, target: 'server' \});
			      expect(res.dependencies.serverIgnoreExternals).toEqual(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\config\\__tests__\\config.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('fuse-box_fuse-box\\src\\core\\__tests__\\config.test.ts', () => {
        const sourceCode = `
			describe('Config test', () => \{
			  it('should', () => \{\});
			  // it('should set homeDir automatically', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.homeDir).toEqual(env.APP_ROOT);
			  // \});
			  // it('should set homeDir manually', () => \{
			  //   const config = createConfig(\{ homeDir: __dirname \});
			  //   expect(config.homeDir).toEqual(__dirname);
			  // \});
			
			  // it('should have default modules', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.modules).toEqual([env.FUSE_MODULES]);
			  // \});
			
			  // it('should have default modules and user modules', () => \{
			  //   const config = createConfig(\{ modules: ['foo'] \});
			  //   expect(config.modules).toEqual([env.FUSE_MODULES, 'foo']);
			  // \});
			
			  // it('should have output undefined', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.output).toBeUndefined();
			  // \});
			
			  // it('should have output set', () => \{
			  //   const config = createConfig(\{ output: 'dist/\$name' \});
			  //   expect(config.output).toEqual('dist/\$name');
			  // \});
			
			  // it('should have alias undefined', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.alias).toBeUndefined();
			  // \});
			
			  // it('should have alias set', () => \{
			  //   const config = createConfig(\{ alias: \{ foo: 'bar' \} \});
			  //   expect(config.alias).toEqual(\{ foo: 'bar' \});
			  // \});
			
			  // it('should have production not set', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.production).toEqual(undefined);
			  // \});
			
			  // it('should have production set', () => \{
			  //   const config = createConfig(\{ production: \{\} \});
			  //   expect(config.production).toEqual(\{\});
			  // \});
			
			  // it('should have webIndex not set', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.webIndex).toEqual(undefined);
			  // \});
			
			  // it('should have webIndex set', () => \{
			  //   const config = createConfig(\{ webIndex: \{\} \});
			  //   expect(config.webIndex).toEqual(\{\});
			  // \});
			
			  // it('should have logging not set', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.logging).toEqual(undefined);
			  // \});
			
			  // it('should have logging  set', () => \{
			  //   const config = createConfig(\{ logging: \{ level: 'succinct' \} \});
			  //   expect(config.logging).toEqual(\{ level: 'succinct' \});
			  // \});
			
			  // it('should not have plugins', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.plugins).toEqual([]);
			  // \});
			
			  // it('should have user plugins', () => \{
			  //   const config = createConfig(\{ plugins: [() => \{\}] \});
			  //   expect(config.plugins).toHaveLength(1);
			  // \});
			
			  // it('should not have entry', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.entry).toBeUndefined();
			  // \});
			
			  // it('should not entry', () => \{
			  //   const config = createConfig(\{ entry: 'foo' \});
			  //   expect(config.options.entries).toEqual(['foo']);
			  // \});
			
			  // it('Should setup options case 1', () => \{
			  //   const config = createConfig(\{\});
			
			  //   expect(config.options.vendorSourceMap).toEqual(false);
			  //   expect(config.options.projectSourceMap).toEqual(true);
			  //   expect(config.options.cssSourceMap).toEqual(true);
			  //   expect(config.options.sourceRoot).toEqual('/src');
			  // \});
			
			  // it('Should setup options (vendor false)', () => \{
			  //   const config = createConfig(\{
			  //     sourceMap: \{
			  //       vendor: true,
			  //     \},
			  //   \});
			  //   expect(config.options.vendorSourceMap).toEqual(true);
			  //   expect(config.options.projectSourceMap).toEqual(true);
			  //   expect(config.options.cssSourceMap).toEqual(true);
			  //   expect(config.options.sourceRoot).toEqual('/src');
			  // \});
			
			  // it('Should setup options (project false)', () => \{
			  //   const config = createConfig(\{
			  //     sourceMap: \{
			  //       project: false,
			  //     \},
			  //   \});
			  //   expect(config.options.vendorSourceMap).toEqual(false);
			  //   expect(config.options.projectSourceMap).toEqual(false);
			  //   expect(config.options.cssSourceMap).toEqual(true);
			  //   expect(config.options.sourceRoot).toEqual('/src');
			  // \});
			
			  // it('Should setup options (project false)', () => \{
			  //   const config = createConfig(\{
			  //     sourceMap: \{
			  //       sourceRoot: '/foo',
			  //     \},
			  //   \});
			  //   expect(config.options.vendorSourceMap).toEqual(false);
			  //   expect(config.options.projectSourceMap).toEqual(true);
			  //   expect(config.options.cssSourceMap).toEqual(true);
			  //   expect(config.options.sourceRoot).toEqual('/foo');
			  // \});
			
			  // it('Shoul have cache boolean', () => \{
			  //   const config = createConfig(\{
			  //     cache: true,
			  //   \});
			  //   expect(config.cache).toEqual(true);
			  //   expect(config.options.cacheEnabled).toEqual(true);
			  // \});
			
			  // it('Shoul  have cache 1', () => \{
			  //   const config = createConfig(\{
			  //     cache: \{ enabled: true \},
			  //   \});
			  //   expect(config.options.cacheEnabled).toEqual(true);
			  // \});
			
			  // it('Should have cache root', () => \{
			  //   const config = createConfig(\{
			  //     cache: \{ root: '/' \},
			  //   \});
			  //   expect(config.options.cacheRoot).toEqual(\`/\$\{env.VERSION\}\`);
			  // \});
			
			  // it('Should have watcher disabled', () => \{
			  //   const config = createConfig(\{\});
			  //   expect(config.options.watcherEnabled).toEqual(false);
			  // \});
			
			  // it('Should have watcher enabled', () => \{
			  //   const config = createConfig(\{
			  //     watch: true,
			  //   \});
			  //   expect(config.options.watcherEnabled).toEqual(true);
			  // \});
			
			  // it('Should have watcher enabled', () => \{
			  //   const config = createConfig(\{
			  //     watch: \{ ignored: [] \},
			  //   \});
			  //   expect(config.options.watcherEnabled).toEqual(true);
			  //   expect(config.options.watcherProps).toEqual(\{ ignored: [] \});
			  // \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\core\\__tests__\\config.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\core\\__tests__\\WeakModuleReferences.test.ts', () => {
        const sourceCode = `
			import \{ createTestContext \} from '../../utils/test_utils';
			import \{ WeakModuleReferences, createWeakModuleReferences \} from '../WeakModuleReferences';
			import \{ createContext \} from '../context';
			
			describe('WeakModuleReferences', () => \{
			  function create(): WeakModuleReferences \{
			    const ctx = createTestContext();
			    return createWeakModuleReferences(ctx);
			  \}
			  it('should be 0 at start', () => \{
			    const ref = create();
			    expect(Object.keys(ref.collection)).toHaveLength(0);
			  \});
			
			  it('should add one ref', () => \{
			    const ref = create();
			    ref.add('/foo', '/bar');
			    expect(Object.keys(ref.collection)).toHaveLength(1);
			  \});
			
			  it('should not add the same ref', () => \{
			    const ref = create();
			    ref.add('/foo', '/bar');
			    ref.add('/foo', '/bar');
			    expect(Object.keys(ref.collection)).toHaveLength(1);
			  \});
			
			  it('should flush', () => \{
			    const ref = create();
			    ref.add('/foo', '/bar');
			    ref.add('/foo', '/bar');
			    ref.flush();
			    expect(Object.keys(ref.collection)).toHaveLength(0);
			  \});
			
			  it('should find', () => \{
			    const ref = create();
			    ref.add('/foo', '/bar');
			    const res = ref.find('/foo');
			    expect(res).toEqual(['/bar']);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\core\\__tests__\\WeakModuleReferences.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('fuse-box_fuse-box\\src\\devServer\\__tests__\\devServer.test.ts', () => {
        const sourceCode = `
			import \{ BundleType, createBundle \} from '../../bundle/bundle';
			import \{ createContext \} from '../../core/context';
			import \{ mockModule \} from '../../utils/test_utils';
			import \{ createExpressApp \} from '../devServer';
			
			let __mock_expressListen;
			let __mock_expressUse;
			
			jest.mock('http', () => \{
			  return \{
			    createServer: jest.fn(),
			  \};
			\});
			
			jest.mock('ws', () => \{
			  return \{
			    Server: class \{
			      on() \{\}
			    \},
			  \};
			\});
			
			jest.mock('express', () => \{
			  const fn = () => \{
			    return \{
			      listen: __mock_expressListen,
			      use: __mock_expressUse,
			      all: () => \{\},
			    \};
			  \};
			
			  fn.static = jest.fn();
			  return fn;
			\});
			
			describe('Dev server test', () => \{
			  it('should test', () => \{\});
			  // beforeEach(() => \{
			  //   __mock_expressListen = jest.fn();
			  //   __mock_expressUse = jest.fn();
			  // \});
			  // it('Should inject fuse-box-hot-reload', () => \{
			  //   const data = mockModule(\{
			  //     config: \{
			  //       devServer: true,
			  //     \},
			  //     moduleProps: \{\},
			  //     packageProps: \{ isDefaultPackage: true \},
			  //   \});
			  //   // data.pkg.entry = data.module;
			  //   // data.module.analysis = \{ imports: [] \};
			
			  //   // data.ctx.ict.sync('assemble_after_transpile', \{ module: data.module \});
			  //   // expect(data.module.analysis.imports).toHaveLength(1);
			  //   // expect(data.module.analysis.imports[0].literal).toEqual('fuse-box-hot-reload');
			  // \});
			
			  // it('Should not inject fuse-box-hot-reload', () => \{
			  //   const data = mockModule(\{
			  //     config: \{
			  //       devServer: true,
			  //     \},
			  //     moduleProps: \{\},
			  //     packageProps: \{ isDefaultPackage: false \},
			  //   \});
			  //   // data.pkg.entry = data.module;
			  //   // data.module.analysis = \{ imports: [] \};
			
			  //   // data.ctx.ict.sync('assemble_after_transpile', \{ module: data.module \});
			  //   // expect(data.module.analysis.imports).toHaveLength(0);
			  // \});
			
			  // it('Should inject code with hmr', () => \{
			  //   const data = mockModule(\{
			  //     config: \{
			  //       devServer: true,
			  //     \},
			  //     moduleProps: \{\},
			  //     packageProps: \{ isDefaultPackage: true \},
			  //   \});
			  //   const bundle = createBundle(\{ ctx: data.ctx, name: 's', type: BundleType.PROJECT_JS \});
			  //   data.ctx.ict.sync('before_bundle_write', \{ bundle \});
			  //   expect(bundle.generate().contents).toEqual(\`FuseBox.import("fuse-box-hot-reload").connect(\{"useCurrentURL":true\})\`);
			  // \});
			
			  // it('Should not inject code with hmr', () => \{
			  //   const data = mockModule(\{
			  //     config: \{
			  //       devServer: true,
			  //     \},
			  //     moduleProps: \{\},
			  //     packageProps: \{ isDefaultPackage: true \},
			  //   \});
			  //   const bundle = createBundle(\{ ctx: data.ctx, name: 's', type: BundleType.VENDOR_JS \});
			  //   data.ctx.ict.sync('before_bundle_write', \{ bundle \});
			  //   expect(bundle.generate().contents).not.toContain('fuse-box-hot-reload');
			  // \});
			
			  // it('Should launch http server', () => \{
			  //   __mock_expressListen = jest.fn();
			  //   const data = mockModule(\{
			  //     config: \{
			  //       devServer: true,
			  //       logging: \{ level: 'disabled' \},
			  //     \},
			  //     moduleProps: \{\},
			  //     packageProps: \{ isDefaultPackage: false \},
			  //   \});
			  //   data.ctx.ict.sync('complete', \{ bundles: [], ctx: data.ctx \});
			  //   expect(__mock_expressListen).toHaveBeenCalled();
			  // \});
			
			  // it('Should launch hmr server on different port', () => \{
			  //   const data = mockModule(\{
			  //     config: \{
			  //       devServer: \{
			  //         httpServer: false,
			  //       \},
			  //       logging: \{ level: 'disabled' \},
			  //     \},
			  //     moduleProps: \{\},
			  //     packageProps: \{ isDefaultPackage: false \},
			  //   \});
			  //   data.ctx.ict.sync('complete', \{ bundles: [], ctx: data.ctx \});
			  // \});
			
			  // it('Should call onClientMessage', () => \{
			  //   const data = mockModule(\{
			  //     config: \{
			  //       devServer: \{
			  //         httpServer: true,
			  //       \},
			  //       logging: \{ level: 'disabled' \},
			  //     \},
			  //     moduleProps: \{\},
			  //     packageProps: \{ isDefaultPackage: true \},
			  //   \});
			  //   data.ctx.ict.sync('complete', \{ bundles: [], ctx: data.ctx \});
			  //   data.ctx.devServer.clientSend('foo', \{\});
			  // \});
			
			  // it('Should call clientSend', () => \{
			  //   const data = mockModule(\{
			  //     config: \{
			  //       devServer: \{
			  //         httpServer: true,
			  //       \},
			  //       logging: \{ level: 'disabled' \},
			  //     \},
			  //     moduleProps: \{\},
			  //     packageProps: \{ isDefaultPackage: true \},
			  //   \});
			  //   data.ctx.ict.sync('complete', \{ bundles: [], ctx: data.ctx \});
			  //   data.ctx.devServer.onClientMessage((name, data) => \{\});
			  // \});
			
			  // describe('Create express app', () => \{
			  //   it('should send a fallback file', () => \{
			  //     const fallback = 'fallback.html';
			  //     __mock_expressListen = (port, fn) => \{
			  //       fn();
			  //     \};
			
			  //     __mock_expressUse = (path: string, cb) => \{
			  //       if (path === '*') \{
			  //         cb(
			  //           \{\},
			  //           \{
			  //             sendFile: file => \{
			  //               expect(file).toEqual(fallback);
			  //             \},
			  //           \},
			  //         );
			  //       \}
			  //     \};
			  //     createExpressApp(createContext(\{\}), \{ fallback: fallback, root: '/' \});
			  //   \});
			  // \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\devServer\\__tests__\\devServer.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\devServer\\__tests__\\devServerProps.test.ts', () => {
        const sourceCode = `
			import \{ EnvironmentType \} from '../../config/EnvironmentType';
			import \{ IPublicConfig \} from '../../config/IConfig';
			import \{ IRunProps \} from '../../config/IRunProps';
			import \{ createContext \} from '../../core/context';
			import '../../utils/test_utils';
			import \{ createDevServerConfig \} from '../devServerProps';
			function configure(config?: IPublicConfig) \{
			  config.watcher = false;
			  config.hmr = false;
			  config.entry = __filename;
			  const ctx = createContext(\{ envType: EnvironmentType.DEVELOPMENT, publicConfig: config, scriptRoot: __dirname \});
			  return createDevServerConfig(ctx);
			\}
			function configureProd(config: IPublicConfig, prodProps?: IRunProps) \{
			  config.watcher = false;
			  config.entry = __filename;
			  config.hmr = false;
			  const ctx = createContext(\{ envType: EnvironmentType.PRODUCTION, publicConfig: config, scriptRoot: __dirname \});
			  return createDevServerConfig(ctx);
			\}
			
			describe('devServerProps test', () => \{
			  it('should be disabled 1', () => \{
			    const data = configure(\{\});
			    expect(data.enabled).toEqual(false);
			  \});
			
			  it('should be disabled 2', () => \{
			    const data = configure(\{ devServer: false \});
			    expect(data.enabled).toEqual(false);
			  \});
			
			  function defaultCheck(data) \{
			    expect(data.httpServer['enabled']).toEqual(true);
			    expect(data.httpServer['fallback']).toMatchFilePath('dist/index.html\$');
			    expect(data.httpServer['root']).toMatchFilePath('__tests__/dist\$');
			    expect(data.hmrServer['enabled']).toEqual(true);
			    expect(data.hmrServer['port']).toEqual(4444);
			  \}
			
			  it('should be enabled', () => \{
			    const data = configure(\{ devServer: true \});
			    defaultCheck(data);
			  \});
			
			  it('should be enabled with invalid args', () => \{
			    const opts: any = \{ devServer: 1 \};
			    const data = configure(opts);
			    defaultCheck(data);
			  \});
			
			  it('should be enabled with hmrServer true', () => \{
			    const data = configure(\{ devServer: \{ hmrServer: true \} \});
			    defaultCheck(data);
			  \});
			
			  it('should be enabled with hmrServer \{\}', () => \{
			    const data = configure(\{ devServer: \{ hmrServer: \{\} \} \});
			    defaultCheck(data);
			  \});
			
			  it('should be enabled with httpServer true', () => \{
			    const data = configure(\{ devServer: \{ hmrServer: true \} \});
			    defaultCheck(data);
			  \});
			
			  it('should be enabled with httpServer \{\}', () => \{
			    const data = configure(\{ devServer: \{ hmrServer: \{\} \} \});
			    defaultCheck(data);
			  \});
			
			  it('httpServer disabled', () => \{
			    const data = configure(\{ devServer: \{ httpServer: false \} \});
			    expect(data.httpServer['enabled']).toEqual(false);
			  \});
			
			  it('hmrServer disabled', () => \{
			    const data = configure(\{ devServer: \{ hmrServer: false \} \});
			    expect(data.hmrServer['enabled']).toEqual(false);
			  \});
			
			  it('should have http port', () => \{
			    const data = configure(\{ devServer: \{ httpServer: \{ port: 1 \} \} \});
			    expect(data.httpServer['port']).toEqual(1);
			  \});
			
			  it('should have the same hmr port', () => \{
			    const data = configure(\{ devServer: \{ httpServer: \{ port: 1 \} \} \});
			    expect(data.httpServer['port']).toEqual(1);
			    expect(data.hmrServer['port']).toEqual(1);
			  \});
			
			  it('should have a different port', () => \{
			    const data = configure(\{ devServer: \{ hmrServer: \{ port: 2 \} \} \});
			    expect(data.httpServer['port']).toEqual(4444);
			    expect(data.hmrServer['port']).toEqual(2);
			  \});
			
			  it('should http disabled but hmr enabled', () => \{
			    const data = configure(\{ devServer: \{ hmrServer: \{ port: 2 \}, httpServer: false \} \});
			    expect(data.httpServer['enabled']).toEqual(false);
			    expect(data.hmrServer['port']).toEqual(2);
			  \});
			
			  it('should have root set', () => \{
			    const data = configure(\{ devServer: \{ httpServer: \{ root: '/' \} \} \});
			    expect(data.httpServer['root']).toEqual('/');
			  \});
			
			  it('should have fallback set', () => \{
			    const data = configure(\{ devServer: \{ httpServer: \{ fallback: 'foo.html' \} \} \});
			    expect(data.httpServer['fallback']).toEqual('foo.html');
			  \});
			
			  it('should have it disabled when server', () => \{
			    const data = configure(\{ devServer: true, target: 'server' \});
			    expect(data.hmrServer['enabled']).toEqual(false);
			  \});
			
			  it('should have it disabled when production', () => \{
			    const data = configureProd(\{ devServer: false \}, \{\});
			
			    expect(data.hmrServer['enabled']).toEqual(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\devServer\\__tests__\\devServerProps.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(18)
    });
    it('fuse-box_fuse-box\\src\\devServer\\__tests__\\hmrServer.test.ts', () => {
        const sourceCode = `
			import \{ createContext \} from '../../core/context';
			
			let mock__ws = \{
			  connections: [],
			  events: \{\},
			  instances: [],
			  params: \{\},
			  sentData: [],
			\};
			jest.mock('ws', () => \{
			  class SocketConnection \{
			    public events;
			    constructor() \{
			      this.events = \{\};
			    \}
			    on(type: string, fn) \{
			      this.events[type] = fn;
			    \}
			    send(msg: string) \{
			      mock__ws.sentData.push(msg);
			    \}
			  \}
			  return \{
			    Server: class Socket \{
			      constructor(params) \{
			        mock__ws.params = params;
			        mock__ws.instances.push(this);
			      \}
			      triggerConnection() \{
			        if (mock__ws.events['connection']) \{
			          const connection = new SocketConnection();
			          mock__ws.connections.push(connection);
			          mock__ws.events['connection'](connection);
			        \}
			      \}
			      triggerClient(name, message) \{
			        mock__ws.connections.forEach(connection => \{
			          connection.events[name](message);
			        \});
			      \}
			
			      on(eventType: string, fn) \{
			        mock__ws.events[eventType] = fn;
			      \}
			    \},
			  \};
			\});
			
			import \{ createTestContext \} from '../../utils/test_utils';
			import \{ createHMRServer \} from '../hmrServer';
			describe('HMR server test', () => \{
			  beforeEach(() => \{
			    mock__ws = \{
			      connections: [],
			      events: \{\},
			      instances: [],
			      params: \{\},
			      sentData: [],
			    \};
			  \});
			  it('should create and bind events', () => \{
			    const ctx = createTestContext();
			    createHMRServer(\{ ctx, opts: \{ enabled: true \} \});
			    expect(mock__ws.instances).toHaveLength(1);
			    expect(mock__ws.events['connection']).toBeTruthy();
			  \});
			
			  it('should create with internal server', () => \{
			    const ctx = createTestContext();
			    const internalServer = \{ foo: 'server' \};
			    createHMRServer(\{ ctx, internalServer: internalServer, opts: \{ enabled: true \} \});
			    expect(mock__ws.instances).toHaveLength(1);
			    expect(mock__ws.params).toEqual(\{ server: \{ foo: 'server' \} \});
			    expect(mock__ws.events['connection']).toBeTruthy();
			  \});
			
			  it('should create with port', () => \{
			    const ctx = createTestContext();
			
			    createHMRServer(\{ ctx, opts: \{ enabled: true, port: 2222 \} \});
			    expect(mock__ws.instances).toHaveLength(1);
			    expect(mock__ws.params).toEqual(\{ port: 2222 \});
			    expect(mock__ws.events['connection']).toBeTruthy();
			  \});
			
			  it('should dispatch a message', () => \{
			    const ctx = createTestContext();
			    const server = createHMRServer(\{ ctx, opts: \{ enabled: true \} \});
			    const instance = mock__ws.instances[0];
			    instance.triggerConnection();
			    server.onMessage((name, payload) => \{
			      expect(name).toEqual('foo');
			      expect(payload).toEqual(\{ bar: 1 \});
			    \});
			    instance.triggerClient('message', JSON.stringify(\{ name: 'foo', payload: \{ bar: 1 \} \}));
			  \});
			
			  it('should send an a message', () => \{
			    const ctx = createTestContext();
			    const server = createHMRServer(\{ ctx, opts: \{ enabled: true \} \});
			    const instance = mock__ws.instances[0];
			    instance.triggerConnection();
			
			    const data = \{ name: 'some', payload: \{ hello: 'world' \} \};
			    server.sendEvent(data.name, data.payload);
			
			    expect(mock__ws.sentData).toEqual([JSON.stringify(data)]);
			  \});
			
			  it('should close an connection', () => \{
			    const ctx = createTestContext();
			    createHMRServer(\{ ctx, opts: \{ enabled: true \} \});
			    const instance = mock__ws.instances[0];
			    instance.triggerConnection();
			
			    instance.triggerClient('close', \{\});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\devServer\\__tests__\\hmrServer.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('fuse-box_fuse-box\\src\\integration\\__tests__\\webIndex.test.ts', () => {
        const sourceCode = `
			describe('WebIndex integration test', () => \{
			  it('should refactor', () => \{\});
			  // it('should verify webindex scripts ', async () => \{
			  //   const test = createTestBundle(
			  //     \{ entry: 'index.js', homeDir: __dirname, webIndex: \{ template: 'index.html' \} \},
			  //     createFileSet(__dirname, \{ 'index.js': 'console.log(1)', 'index.html': \`\$bundles\` \}),
			  //   );
			  //   await test.fuse.runDev();
			  //   const indexFile = test.helper.findInDist('index.html');
			  //   const scripts = test.helper.extractScripts(indexFile.contents);
			  //   expect(scripts.jsPaths).toHaveLength(3);
			
			  //   scripts.jsPaths.forEach(p => \{
			  //     expect(p[0]).toEqual('/');
			  //   \});
			
			  //   test.mock.flush();
			  // \});
			
			  // describe('public path', () => \{
			  //   it('should verify webindex scripts publicPath 1', async () => \{
			  //     const test = createTestBundle(
			  //       \{ entry: 'index.js', homeDir: __dirname, webIndex: \{ template: 'index.html', publicPath: '/oi' \} \},
			  //       createFileSet(__dirname, \{ 'index.js': 'console.log(1)', 'index.html': \`\$bundles\` \}),
			  //     );
			  //     await test.fuse.runDev();
			  //     const indexFile = test.helper.findInDist('index.html');
			  //     const scripts = test.helper.extractScripts(indexFile.contents);
			  //     expect(scripts.jsPaths).toHaveLength(3);
			
			  //     scripts.jsPaths.forEach(p => \{
			  //       expect(p).toMatch(/\\/oi\\//);
			  //     \});
			
			  //     test.mock.flush();
			  //   \});
			
			  //   it('should verify webindex scripts publicPath 2', async () => \{
			  //     const test = createTestBundle(
			  //       \{ entry: 'index.js', homeDir: __dirname, webIndex: \{ template: 'index.html', publicPath: '.' \} \},
			  //       createFileSet(__dirname, \{ 'index.js': 'console.log(1)', 'index.html': \`\$bundles\` \}),
			  //     );
			  //     await test.fuse.runDev();
			  //     const indexFile = test.helper.findInDist('index.html');
			  //     const scripts = test.helper.extractScripts(indexFile.contents);
			  //     expect(scripts.jsPaths).toHaveLength(3);
			
			  //     //const listed = test.helper.listDistFiles();
			
			  //     scripts.jsPaths.forEach(p => \{
			  //       expect(p[0]).not.toEqual('/');
			  //     \});
			
			  //     test.mock.flush();
			  //   \});
			  // \});
			
			  // describe('distFileName', () => \{
			  //   it('should be able to customise distFileName', async () => \{
			  //     const test = createTestBundle(
			  //       \{ entry: 'index.js', homeDir: __dirname, webIndex: \{ template: 'index.html', distFileName: 'shmindex.html' \} \},
			  //       createFileSet(__dirname, \{ 'index.js': 'console.log(1)', 'index.html': \`\$bundles\` \}),
			  //     );
			  //     await test.fuse.runDev();
			  //     const indexFile = test.helper.findInDist('shmindex.html');
			  //     expect(indexFile).not.toBeUndefined();
			  //     expect(indexFile.name).toMatchFilePath('shmindex.html\$');
			  //     test.mock.flush();
			  //   \});
			  // \});
			
			  // describe('embedIndexedBundles', () => \{
			  //   it('embedIndexedBundles with dev (should be the same)', async () => \{
			  //     const test = createTestBundle(
			  //       \{ entry: 'index.js', homeDir: __dirname, webIndex: \{ template: 'index.html', embedIndexedBundles: true \} \},
			  //       createFileSet(__dirname, \{ 'index.js': 'console.log(1)', 'index.html': \`\$bundles\` \}),
			  //     );
			  //     await test.fuse.runDev();
			  //     const indexFile = test.helper.findInDist('index.html');
			  //     const scripts = test.helper.extractScripts(indexFile.contents);
			
			  //     expect(scripts.jsPaths).toHaveLength(3);
			
			  //     const filesInDist = test.helper.listDistFiles();
			
			  //     expect(filesInDist).toHaveLength(7);
			  //     test.mock.flush();
			  //   \});
			
			  //   // it.only('embedIndexedBundles with prod (should inline js)', async () => \{
			  //   //   const test = createTestBundle(
			  //   //     \{ entry: 'index.js', homeDir: __dirname, webIndex: \{ template: 'index.html', embedIndexedBundles: true \} \},
			  //   //     createFileSet(__dirname, \{ 'index.js': 'console.log(1)', 'index.html': \`\$bundles\` \}),
			  //   //   );
			  //   //   await test.fuse.runProd();
			  //   //   // const indexFile = test.helper.findInDist('index.html');
			  //   //   // const scripts = test.helper.extractScripts(indexFile.contents);
			
			  //   //   const filesInDist = test.helper.listDistFiles();
			  //   //   console.log(filesInDist);
			  //   //   test.mock.flush();
			  //   // \});
			  // \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\integration\\__tests__\\webIndex.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\interceptor\\__tests__\\interceptor.test.ts', () => {
        const sourceCode = `
			import \{ Context, createContext \} from '../../core/context';
			
			import \{ IModule \} from '../../moduleResolver/module';
			import \{ createTestContext \} from '../../utils/test_utils';
			import \{ createInterceptor \} from '../interceptor';
			
			describe('Interceptor', () => \{
			  let _module: IModule;
			  let ctx: Context;
			  beforeEach(() => \{
			    ctx = createTestContext();
			    _module = \{ absPath: '/', ctx: ctx, extension: '.js' \};
			  \});
			  it('Should create an interceptor', () => \{
			    const interceptor = createInterceptor();
			    expect(typeof interceptor.on).toBe('function');
			    expect(typeof interceptor.sync).toBe('function');
			  \});
			
			  it('should promise and resolve', async () => \{
			    const icp = createInterceptor();
			    const responses = [];
			    icp.promise(() => \{
			      return new Promise((resolve, reject) => \{
			        setTimeout(() => \{
			          responses.push(1);
			          return resolve();
			        \}, 1);
			      \});
			    \});
			    icp.promise(() => \{
			      return new Promise((resolve, reject) => \{
			        setTimeout(() => \{
			          responses.push(2);
			          return resolve();
			        \}, 2);
			      \});
			    \});
			    await icp.resolve();
			    expect(responses).toEqual([1, 2]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\interceptor\\__tests__\\interceptor.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('fuse-box_fuse-box\\src\\moduleResolver\\__tests__\\module.resolution.test.ts', () => {
        const sourceCode = `
			import \{ EnvironmentType \} from '../../config/EnvironmentType';
			import \{ createIntegrationTest \} from '../../testUtils/integrationTest';
			
			describe('Module resolution test', () => \{
			  it('should ', async () => \{
			    // const test = createIntegrationTest(\{
			    //   config: \{ entry: 'index.ts', target: 'browser' \},
			    //   envType: EnvironmentType.DEVELOPMENT,
			    //   files: \{
			    //     'hello.ts': 'export function hello()\{\}',
			    //     'index.ts': \`require("./hello")\`,
			    //   \},
			    // \});
			    // const tool = await test.runDev();
			    // tool.runBundleInBrowser();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\moduleResolver\\__tests__\\module.resolution.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\output\\__tests__\\distWriter.test.ts', () => {
        const sourceCode = `
			describe('Output parser', () => \{
			  it('should hello', () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\output\\__tests__\\distWriter.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\output\\__tests__\\OutputConfigConverter.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ outputConfigConverter \} from '../OutputConfigConverter';
			
			describe('Output Config converter', () => \{
			  // values for those keys aren't hardcoded
			  // since they can change
			  // we verify the consistency
			  it('should get default configuration ', () => \{
			    const res = outputConfigConverter(\{
			      defaultRoot: 'dist',
			    \});
			    expect(res.distRoot).toEqual(path.join(__dirname, 'dist'));
			    expect(res.app).toBeTruthy();
			    expect(res.vendor).toBeTruthy();
			    expect(res.codeSplitting).toBeTruthy();
			  \});
			
			  it('should give user root ', () => \{
			    const res = outputConfigConverter(\{
			      defaultRoot: __dirname,
			      publicConfig: \{
			        distRoot: 'build',
			      \},
			    \});
			    expect(res.distRoot).toEqual(path.join(__dirname, 'build'));
			  \});
			
			  it('should give default app if non specified ', () => \{
			    const res = outputConfigConverter(\{
			      defaultRoot: __dirname,
			      publicConfig: \{
			        distRoot: 'build',
			      \},
			    \});
			    expect(res.distRoot).toEqual(path.join(__dirname, 'build'));
			    expect(res.app).toBeTruthy();
			  \});
			
			  it('should give user vendor and a default app ', () => \{
			    const res = outputConfigConverter(\{
			      defaultRoot: __dirname,
			      publicConfig: \{
			        distRoot: 'build',
			        vendor: 'external.\$hash.js',
			      \},
			    \});
			    expect(res.distRoot).toEqual(path.join(__dirname, 'build'));
			    expect(res.app).toBeTruthy();
			    expect(res.vendor.path).toEqual('external.\$hash.js');
			  \});
			
			  it('should give users app and vendor ', () => \{
			    const res = outputConfigConverter(\{
			      defaultRoot: __dirname,
			      publicConfig: \{
			        app: 'myapp.\$hash.js',
			        distRoot: 'build',
			        vendor: 'external.\$hash.js',
			      \},
			    \});
			    expect(res.distRoot).toEqual(path.join(__dirname, 'build'));
			    expect(res.app.path).toEqual('myapp.\$hash.js');
			    expect(res.vendor.path).toEqual('external.\$hash.js');
			  \});
			
			  it('should give custom configs for users app and vendor ', () => \{
			    const res = outputConfigConverter(\{
			      defaultRoot: __dirname,
			      publicConfig: \{
			        app: \{ maxBundleSize: 10, path: 'foo.js' \},
			        distRoot: 'build',
			        vendor: \{ maxBundleSize: 20, path: 'bar.js' \},
			      \},
			    \});
			    expect(res.distRoot).toEqual(path.join(__dirname, 'build'));
			
			    expect(res.app.path).toEqual('foo.js');
			    expect(res.app.maxBundleSize).toEqual(10);
			
			    expect(res.vendor.path).toEqual('bar.js');
			    expect(res.vendor.maxBundleSize).toEqual(20);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\output\\__tests__\\OutputConfigConverter.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('fuse-box_fuse-box\\src\\output\\__tests__\\stripHash.test.ts', () => {
        const sourceCode = `
			import \{ stripHash \} from '../distWriter';
			
			describe('Strip hash', () => \{
			  const scenarions = [
			    \{ input: '\$name.\$hash.js', value: '\$name.js' \},
			    \{ input: '\$name.\$hash.css', value: '\$name.css' \},
			    \{ input: '\$name.\$hash.scss', value: '\$name.scss' \},
			    \{ input: '\$name.js', value: '\$name.js' \},
			    \{ input: '\$hash.\$name.js', value: '\$name.js' \},
			    \{ input: '\$hash.\$name.scss', value: '\$name.scss' \},
			
			    \{ input: '\$name-\$hash.js', value: '\$name.js' \},
			    \{ input: '\$name-\$hash.css', value: '\$name.css' \},
			    \{ input: '\$name-\$hash.scss', value: '\$name.scss' \},
			
			    \{ input: '\$name_\$hash.js', value: '\$name.js' \},
			    \{ input: '\$name_\$hash.css', value: '\$name.css' \},
			    \{ input: '\$name_\$hash.scss', value: '\$name.scss' \},
			  ];
			  for (const item of scenarions) \{
			    it(\`\$\{item.input\} => \$\{item.value\}\`, () => \{
			      expect(stripHash(item.input)).toEqual(item.value);
			    \});
			  \}
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\output\\__tests__\\stripHash.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\plugins\\core\\__tests__\\plugin_angular.test.ts', () => {
        const sourceCode = `
			import \{ EnvironmentType \} from '../../../config/EnvironmentType';
			import \{
			  EnvironmentTypesTestable,
			  createTestWorkspace,
			  testBrowser,
			  ITestWorkspace,
			\} from '../../../testUtils/integrationTest';
			import \{ pluginAngular \} from '../plugin_angular';
			import \{ pluginCSS \} from '../plugin_css';
			
			describe('Cache intergation test', () => \{
			  describe('Initial replacement', () => \{
			    function initWorkspace() \{
			      return createTestWorkspace(\{
			        files: \{
			          'app.component.css': 'body \{ color: red \}',
			          'app.component.html': '<div></div>',
			          'index.ts': \`
			             export function hello()\{
			              return \{
			                styleUrls: ['./app.component.css'],
			                templateUrl: './app.component.html'
			              \}
			             \}
			          \`,
			        \},
			      \});
			    \}
			
			    for (const env of EnvironmentTypesTestable) \{
			      it(\`should work correctly \$\{EnvironmentType[env]\}\`, async () => \{
			        const response = await testBrowser(\{
			          workspace: initWorkspace(),
			          type: env,
			          config: \{
			            plugins: [pluginCSS(\{ asText: true \}), pluginAngular('*')],
			          \},
			        \});
			        const window = await response.eval(\{\});
			        const index = window.entry();
			        expect(index.hello()).toEqual(\{ styles: ['body \{ color: red \}'], template: '<div></div>' \});
			      \});
			    \}
			  \});
			
			  describe('Cache validation', () => \{
			    let workspace: ITestWorkspace;
			    function initWorkspace() \{
			      return createTestWorkspace(\{
			        files: \{
			          'app.component.css': 'body \{ color: red \}',
			          'app.component.html': '<div></div>',
			          'index.ts': \`
			             export function hello()\{
			              return \{
			                styleUrls: ['./app.component.css'],
			                templateUrl: './app.component.html'
			              \}
			             \}
			          \`,
			        \},
			      \});
			    \}
			
			    it(\`should bundle initially correctly\`, async () => \{
			      workspace = initWorkspace();
			      const response = await testBrowser(\{
			        workspace,
			        type: EnvironmentType.DEVELOPMENT,
			        config: \{
			          cache: true,
			          plugins: [pluginCSS(\{ asText: true \}), pluginAngular('*')],
			        \},
			      \});
			      const window = await response.eval(\{\});
			      const index = window.entry();
			      expect(index.hello()).toEqual(\{ styles: ['body \{ color: red \}'], template: '<div></div>' \});
			    \});
			
			    it(\`After modifying "component css" the entry point should be flushed too\`, async () => \{
			      workspace.setFile('app.component.css', 'body \{ color: blue \}');
			      const response = await testBrowser(\{
			        workspace,
			        type: EnvironmentType.DEVELOPMENT,
			        config: \{
			          plugins: [pluginCSS(\{ asText: true \}), pluginAngular('*')],
			        \},
			      \});
			      const window = await response.eval(\{\});
			      const index = window.entry();
			      expect(index.hello()).toEqual(\{ styles: ['body \{ color: blue \}'], template: '<div></div>' \});
			    \});
			
			    it(\`After modifying "component html" the entry point should be flushed too\`, async () => \{
			      workspace.setFile('app.component.html', '<h1></h1>');
			      const response = await testBrowser(\{
			        workspace,
			        type: EnvironmentType.DEVELOPMENT,
			        config: \{
			          plugins: [pluginCSS(\{ asText: true \}), pluginAngular('*')],
			        \},
			      \});
			      const window = await response.eval(\{\});
			      const index = window.entry();
			      expect(index.hello()).toEqual(\{ styles: ['body \{ color: blue \}'], template: '<h1></h1>' \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\plugins\\core\\__tests__\\plugin_angular.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('fuse-box_fuse-box\\src\\plugins\\core\\__tests__\\plugin_css_in_jsx.test.ts', () => {
        const sourceCode = `
			import \{ EnvironmentType \} from '../../../config/EnvironmentType';
			import \{ EnvironmentTypesTestable, createTestWorkspace, testBrowser \} from '../../../testUtils/integrationTest';
			import \{ pluginCSSInJSX \} from '../plugin_css_in_jsx';
			
			describe('CSS in JSX intergation test', () => \{
			  describe('JSX factory', () => \{
			    function initWorkspace() \{
			      return createTestWorkspace(\{
			        files: \{
			          'index.ts': \`
			            import \{ css \} from '@emotion/core';
			            import * as React from 'react';
			
			            const styles1 = css(\{
			              backgroundColor: 'hotpink'
			            \});
			            const styles2 = css(\{
			              color: 'white'
			            \});
			            export const App = () => (
			              <div css=\{[styles1, styles2]\}>Super Duper Useful</div>
			            );
			          \`,
			        \},
			      \});
			    \}
			
			    for (const env of EnvironmentTypesTestable) \{
			      it(\`should work correctly \$\{EnvironmentType[env]\}\`, async () => \{
			        const response = await testBrowser(\{
			          workspace: initWorkspace(),
			          type: env,
			          config: \{
			            plugins: [
			              pluginCSSInJSX(\{
			                autoInject: true,
			                autoLabel: true,
			                cssPropOptimization: true,
			                emotionCoreAlias: '@emotion/core',
			                jsxFactory: 'jsx',
			                labelFormat: '[dirname]--[local]',
			                sourceMap: true,
			                test: /src\\/(.*?)\\.(js|jsx|ts|tsx)\$/,
			              \}),
			            ],
			          \},
			        \});
			
			        const window = await response.eval(\{\});
			        const index = window.entry();
			        // @todo: Fix integration tests for react/this
			        expect(index).toEqual(\{\});
			      \});
			    \}
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\plugins\\core\\__tests__\\plugin_css_in_jsx.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\plugins\\core\\__tests__\\plugin_replace.test.ts', () => {
        const sourceCode = `
			import \{ mockModule, mockWriteFile \} from '../../../utils/test_utils';
			import \{ pluginReplace \} from '../plugin_replace';
			const fileMock = mockWriteFile();
			describe('Plugin replace test', () => \{
			  beforeEach(async () => await fileMock.flush());
			  afterAll(() => \{
			    fileMock.unmock();
			  \});
			  it('should match a file', () => \{
			    const mock = mockModule(\{\});
			
			    fileMock.addFile(__filename, '\$version');
			    mock.module.absPath = __filename;
			
			    const data = pluginReplace('plugin_replace.test.ts', \{ \$version: '1.0.0' \});
			
			    data(mock.ctx);
			    mock.ctx.ict.sync('module_init', \{ module: mock.module \});
			    expect(mock.module.contents).toEqual('1.0.0');
			  \});
			
			  it('should match all files', () => \{
			    const mock = mockModule(\{\});
			
			    fileMock.addFile(__filename, '\$version');
			    mock.module.absPath = __filename;
			
			    const data = pluginReplace(\{ \$version: '1.0.0' \});
			
			    data(mock.ctx);
			    mock.ctx.ict.sync('module_init', \{ module: mock.module \});
			
			    expect(mock.module.contents).toEqual('1.0.0');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\plugins\\core\\__tests__\\plugin_replace.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('fuse-box_fuse-box\\src\\plugins\\__tests__\\pluginUtils.test.ts', () => {
        const sourceCode = `
			import \{ testPath, parsePluginOptions \} from '../pluginUtils';
			
			describe('Plugin utils test', () => \{
			  describe('testPath', () => \{
			    it('should pass 1', () => \{
			      const res = testPath('hello.json', '*.json');
			
			      expect(res).toEqual(true);
			    \});
			    it('should pass 2', () => \{
			      const res = testPath('foo/hello.json', 'foo/*.json');
			      expect(res).toEqual(true);
			    \});
			
			    it('should pass 3', () => \{
			      const res = testPath('foo\\\\hello.json', 'foo/*.json');
			      expect(res).toEqual(true);
			    \});
			
			    it('should not pass 3', () => \{
			      const res = testPath('foo\\\\hello.json', 'foo/*.js\$');
			      expect(res).toEqual(false);
			    \});
			  \});
			
			  describe('parsePluginOptions', () => \{
			    it('should parse 1 argument', () => \{
			      const [opts, matcher] = parsePluginOptions<any>(\{ foo: 'bar' \});
			      expect(opts).toEqual(\{ foo: 'bar' \});
			      expect(matcher).toBeUndefined();
			    \});
			
			    it('should parse 2 arguments', () => \{
			      const [opts, matcher] = parsePluginOptions<any>('*.json', \{ foo: 'bar' \});
			      expect(opts).toEqual(\{ foo: 'bar' \});
			      expect(matcher).toBeInstanceOf(RegExp);
			    \});
			
			    it('should parse 2 args and give a default value', () => \{
			      const [opts, matcher] = parsePluginOptions<any>(undefined, undefined, \{ foo: 'bar' \});
			      expect(opts).toEqual(\{ foo: 'bar' \});
			      expect(matcher).toBeUndefined();
			    \});
			
			    it('should parse 2 args and give a default value with a matcher', () => \{
			      const [opts, matcher] = parsePluginOptions<any>('*.json', undefined, \{ foo: 'bar' \});
			      expect(opts).toEqual(\{ foo: 'bar' \});
			      expect(matcher).toBeInstanceOf(RegExp);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\plugins\\__tests__\\pluginUtils.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('fuse-box_fuse-box\\src\\production\\__tests__\\CodeSplitting.test.ts', () => {
        const sourceCode = `
			/**
			 * This file tests the codesplitting phase
			 * - It checks the creation of split modules
			 * - It checks on circular dependencies within splits
			 * - It flags commonly used modules within splits
			 * - It checks differently import methods
			 */
			import * as path from 'path';
			import \{ IProductionContext \} from '../ProductionContext';
			import \{ ISplitEntry \} from '../module/SplitEntries';
			import \{ CodeSplittingPhase \} from '../phases/CodeSplittingPhase';
			import \{ WarmupPhase \} from '../phases/WarmupPhase';
			import \{ createTestEnvironment, ITestEnvironment \} from './testUtils';
			
			describe('Code Splitting test', () => \{
			  let environment: ITestEnvironment;
			  let cachedModule: ISplitEntry;
			
			  const getProductionContext = async (files: Record<string, string>): Promise<IProductionContext> => \{
			    environment = await createTestEnvironment(\{ entry: 'index.ts' \}, files);
			    const context = await environment.run([WarmupPhase, CodeSplittingPhase]);
			    return context;
			  \};
			
			  /**
			   * Helper function to get the SplitEntry based on the original filename
			   * This is convenient cause orders of modules might change in the future.
			   * @param fileName
			   * @param entries
			   */
			  const getSplitEntry = (fileName: string, entries: Array<ISplitEntry>): ISplitEntry => \{
			    if (!!cachedModule && cachedModule.entry.absPath === path.join(environment.sourceDir + fileName)) \{
			      return cachedModule;
			    \}
			    cachedModule = undefined;
			    for (const entry of entries) \{
			      const moduleFileName = entry.entry.absPath.replace(environment.sourceDir + path.sep, '');
			      if (fileName === moduleFileName) \{
			        cachedModule = entry;
			        break;
			      \}
			    \}
			    return cachedModule;
			  \};
			
			  // cleanup after each test
			  afterEach(() => \{
			    if (environment) \{
			      environment.cleanup();
			      environment = undefined;
			    \}
			    cachedModule = undefined;
			  \});
			
			  /**
			   * This test is to ensure we have a splitted module
			   * 'bar' is dynamically required, so we would have 1 splitEntry
			   */
			  it('should have splitEntry', async () => \{
			    const context = await getProductionContext(\{
			      'bar.ts': \`
			        export default function() \{\}
			      \`,
			      'foo.ts': \`
			        export default function() \{\}
			      \`,
			      'index.ts': \`
			        import './foo';
			        async function load() \{
			          const dynamicFunc = await import('./bar');
			        \}
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(3);
			    expect(entries).toHaveLength(1);
			
			    const barModule = getSplitEntry('bar.ts', entries);
			    expect(barModule.modules).toHaveLength(1);
			    expect(barModule.modules[0].publicPath).toContain('src/bar.ts');
			    expect(barModule.references).toHaveLength(1);
			    expect(barModule.references[0].module.publicPath).toContain('src/index.ts');
			  \});
			
			  /**
			   * This test ensures we have a split entry
			   * and modules required by that entry should end up in the
			   * subModules of the splitted module
			   */
			  it('should have splitEntry with submodules', async () => \{
			    const context = await getProductionContext(\{
			      'bar.ts': \`
			        import './foo';
			        export default function() \{\}
			      \`,
			      'foo.ts': \`
			        export default function() \{\}
			      \`,
			      'index.ts': \`
			        async function load() \{
			          const dynamicFunc = await import('./bar');
			        \}
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(3);
			    expect(entries).toHaveLength(1);
			
			    const barModule = getSplitEntry('bar.ts', entries);
			    expect(barModule.modules).toHaveLength(2);
			    expect(barModule.modules[0].publicPath).toContain('src/bar.ts');
			    expect(barModule.modules[1].publicPath).toContain('src/foo.ts');
			    expect(barModule.references).toHaveLength(1);
			    expect(barModule.references[0].module.publicPath).toContain('src/index.ts');
			  \});
			
			  /**
			   * In this test case, we have one dynamic import 'bar.ts'
			   *
			   * 1.
			   * index.ts AND bar.ts import the module './test'
			   * - 'test' should not be in bar.subModules
			   * 2.
			   * bar requires 'ignored.ts' but doesn't use it
			   * - 'ignored' should not be in bar.subModules
			   */
			  it('should drop imported module thats required directly somewhere else', async () => \{
			    const context = await getProductionContext(\{
			      'bar.ts': \`
			        import \{ test \} from './test';
			        import \{ ignored \} from './ignored';
			        export default function() \{\};
			
			        console.log(test);
			      \`,
			      'foo.ts': \`
			        export function foo() \{\}
			      \`,
			      'ignored.ts': \`
			        export const ignored = 'this module is being ignored';
			      \`,
			      'index.ts': \`
			        import './foo';
			        import \{ test \} from './test';
			
			        async function load() \{
			          const dynamicFunc = await import('./bar');
			        \}
			
			        console.log(test);
			      \`,
			      'test.ts': \`
			        export const test = 'test';
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(4);
			    expect(entries).toHaveLength(1);
			
			    const barModule = getSplitEntry('bar.ts', entries);
			    expect(barModule.modules).toHaveLength(1);
			    expect(barModule.modules[0].publicPath).toContain('src/bar.ts');
			  \});
			
			  /**
			   * In this test case we make sure we can have multiple
			   * splitEntries and each entry has it's own isolated submodules
			   */
			  it('should have multiple splitEntries with submodules', async () => \{
			    const context = await getProductionContext(\{
			      'bar.ts': \`
			        import './foo';
			        export default function() \{\}
			      \`,
			      'foo.ts': \`
			        export default function() \{\}
			      \`,
			      'index.ts': \`
			        async function load() \{
			          const bar = await import('./bar');
			          const oi = await import('./oi');
			        \}
			      \`,
			      'oi.ts': \`
			        import './utils';
			        export default function() \{\}
			      \`,
			      'utils.ts': \`
			        export default function() \{\}
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(5);
			    expect(entries).toHaveLength(2);
			
			    const barModule = getSplitEntry('bar.ts', entries);
			    expect(barModule.modules).toHaveLength(2);
			    expect(barModule.modules[0].publicPath).toContain('src/bar.ts');
			    expect(barModule.modules[1].publicPath).toContain('src/foo.ts');
			    expect(barModule.references).toHaveLength(1);
			    expect(barModule.references[0].module.publicPath).toContain('src/index.ts');
			
			    const oiModule = getSplitEntry('oi.ts', entries);
			    expect(oiModule.modules).toHaveLength(2);
			    expect(oiModule.modules[0].publicPath).toContain('src/oi.ts');
			    expect(oiModule.modules[1].publicPath).toContain('src/utils.ts');
			    expect(oiModule.references).toHaveLength(1);
			    expect(oiModule.references[0].module.publicPath).toContain('src/index.ts');
			  \});
			
			  /**
			   * This test case will test that a module required by a splitted module
			   * but also required by a module outside of the split is being dropped
			   * from the subModules of the splitEntry
			   */
			  it('should drop imported module thats required directly somewhere else', async () => \{
			    const context = await getProductionContext(\{
			      'ai.ts': \`
			        export const ai = 'ai';
			      \`,
			      'bar.ts': \`
			        import \{ oi \} from './oi';
			        console.log(oi);
			        export default function() \{\};
			      \`,
			      'foo.ts': \`
			        export default function() \{\};
			      \`,
			      'index.ts': \`
			        import './foo';
			        import \{ oi \} from './oi';
			        import \{ ai \} from './ai';
			
			        async function load() \{
			          const dynamicFunc = await import('./bar');
			        \}
			        console.log(oi);
			        console.log(ai);
			      \`,
			      'oi.ts': \`
			        export const oi = 'oi!';
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(5);
			    expect(entries).toHaveLength(1);
			
			    const barModule = getSplitEntry('bar.ts', entries);
			    expect(barModule.modules).toHaveLength(1);
			    expect(barModule.modules[0].publicPath).toContain('src/bar.ts');
			  \});
			
			  /**
			   * Another test to test multiple split entries.
			   */
			  it('should have multiple splitEntries with submodules', async () => \{
			    const context = await getProductionContext(\{
			      'bar.ts': \`
			        import './foo';
			        export default function() \{\}
			      \`,
			      'foo.ts': \`
			        async function load() \{
			          const oi = await import('./oi');
			        \}
			        export default function() \{\}
			      \`,
			      'index.ts': \`
			        async function load() \{
			          const bar = await import('./bar');
			        \}
			      \`,
			      'oi.ts': \`
			        import './utils';
			        export default function() \{\}
			      \`,
			      'utils.ts': \`
			        export default function() \{\}
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(5);
			    expect(entries).toHaveLength(2);
			
			    const barModule = getSplitEntry('bar.ts', entries);
			    expect(barModule.modules).toHaveLength(2);
			    expect(barModule.modules[0].publicPath).toContain('src/bar.ts');
			    expect(barModule.modules[1].publicPath).toContain('src/foo.ts');
			    expect(barModule.references).toHaveLength(1);
			    expect(barModule.references[0].module.publicPath).toContain('src/index.ts');
			
			    const oiModule = getSplitEntry('oi.ts', entries);
			    expect(oiModule.modules).toHaveLength(2);
			    expect(oiModule.modules[0].publicPath).toContain('src/oi.ts');
			    expect(oiModule.modules[1].publicPath).toContain('src/utils.ts');
			    expect(oiModule.references).toHaveLength(1);
			    expect(oiModule.references[0].module.publicPath).toContain('src/foo.ts');
			  \});
			
			  /**
			   * This is a test where we test that a dynamic imported module can ALSO
			   * dynamically import modules and those will have their own splitEntry
			   */
			  it('should work with dynamic in dynamic in dynamic', async () => \{
			    const context = await getProductionContext(\{
			      'bar.ts': \`
			        console.log('empty');
			      \`,
			      'entry1.ts': \`
			        import('./one');
			      \`,
			      'foo.ts': \`
			        import './bar';
			      \`,
			      'index.ts': \`
			        import './entry1';
			      \`,
			      'one.ts': \`
			        import './foo';
			        import('./two');
			      \`,
			      'three.ts': \`
			        import './utils';
			      \`,
			      'two.ts': \`
			        import('./three');
			        import './bar';
			      \`,
			      'utils.ts': \`
			        console.log('empty');
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(8);
			    expect(entries).toHaveLength(3);
			
			    // we're not splitting commons atm
			    const oneModule = getSplitEntry('one.ts', entries);
			    expect(oneModule.entry.publicPath).toContain('src/one.ts');
			    // expect(oneModule.modules).toHaveLength(3);
			    expect(oneModule.modules).toHaveLength(2);
			
			    const twoModule = getSplitEntry('two.ts', entries);
			    expect(twoModule.entry.publicPath).toContain('src/two.ts');
			    // expect(twoModule.modules).toHaveLength(2);
			    expect(twoModule.modules).toHaveLength(1);
			
			    const threeModule = getSplitEntry('three.ts', entries);
			    expect(threeModule.entry.publicPath).toContain('src/three.ts');
			    expect(threeModule.modules).toHaveLength(2);
			
			    expect(modules[7].isCommonsEligible).toBe(false);
			    // expect(modules[7].isCommonsEligible).toBe(true);
			  \});
			
			  /**
			   * If a module is required from within different splitEntries and not outside
			   * of splittedModules it should be flagged as commons, so we can create
			   * another isolated splitted module
			   *
			   * This feature is disabled until further notice
			   */
			  it('should NOT flag commons', async () => \{
			    const context = await getProductionContext(\{
			      'bar.ts': \`
			        import './utils';
			        import './foo';
			        export default function() \{\}
			      \`,
			      'foo.ts': \`
			        export default function() \{\}
			      \`,
			      'index.ts': \`
			        import './foo';
			        async function load() \{
			          await import('./bar');
			          await import('./one');
			        \}
			      \`,
			      'one.ts': \`
			        import './utils';
			      \`,
			      'utils.ts': \`
			        console.log('empty');
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(5);
			    expect(entries).toHaveLength(2);
			    // utils.ts
			    expect(modules[2].isCommonsEligible).toBe(false);
			    // expect(modules[2].isCommonsEligible).toBe(true);
			    // foo.ts
			    expect(modules[4].isCommonsEligible).toBe(false);
			  \});
			
			  /**
			   * If there's an circular dependency, we prevent entering
			   * a loop of death and prevent duplicate subModules
			   */
			  it('should detect circular dependency', async () => \{
			    const context = await getProductionContext(\{
			      'a.ts': \`
			        import './b';
			        export default function() \{\};
			      \`,
			      'b.ts': \`
			        import './c';
			      \`,
			      'c.ts': \`
			        import './b';
			      \`,
			      'index.ts': \`
			        async function load() \{
			          const dynamicFunc = await import('./a');
			        \}
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(4);
			    // we only have 1 split
			    expect(entries).toHaveLength(1);
			    // the split we have has 3 modules: a, b, c
			    expect(getSplitEntry('a.ts', entries).modules).toHaveLength(3);
			  \});
			
			  /**
			   * This test is to ensure that a 'deep' circular dependency
			   * is resolved too.
			   */
			  it('should detect deep circular dependency', async () => \{
			    const context = await getProductionContext(\{
			      'a.ts': \`
			        import './b';
			        export default function() \{\};
			      \`,
			      'b.ts': \`
			        import './c';
			      \`,
			      'c.ts': \`
			        import './d';
			      \`,
			      'd.ts': \`
			        import './e';
			      \`,
			      'e.ts': \`
			        import './f';
			      \`,
			      'f.ts': \`
			        import './g';
			      \`,
			      'g.ts': \`
			        import './b';
			      \`,
			      'index.ts': \`
			        async function load() \{
			          const dynamicFunc = await import('./a');
			        \}
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(8);
			    // we only have 1 split
			    expect(entries).toHaveLength(1);
			    // the split we have has 7 modules: a, b, c, d, e, f, g
			    expect(getSplitEntry('a.ts', entries).modules).toHaveLength(7);
			  \});
			
			  /**
			   * Another dynamic in dynamic test
			   */
			  it('should detect dynamic in dynamic', async () => \{
			    const context = await getProductionContext(\{
			      'entry1.ts': \`
			        import('./one');
			      \`,
			      'index.ts': \`
			        import './entry1';
			      \`,
			      'one.ts': \`
			        import('./two');
			      \`,
			      'three.ts': \`
			        import './utils';
			      \`,
			      'two.ts': \`
			        import('./three');
			      \`,
			      'utils.ts': \`
			        console.log('emtpy');
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(6);
			    expect(entries).toHaveLength(3);
			
			    expect(getSplitEntry('one.ts', entries).modules).toHaveLength(1);
			    expect(getSplitEntry('two.ts', entries).modules).toHaveLength(1);
			    expect(getSplitEntry('three.ts', entries).modules).toHaveLength(2);
			  \});
			
			  /**
			   * A weird badly written code base shouldn't fail
			   */
			  it('should handle funky setups', async () => \{
			    const context = await getProductionContext(\{
			      'entry1.ts': \`
			        import('./one');
			        import('./two');
			      \`,
			      'foo.ts': \`
			        import './utils';
			      \`,
			      'index.ts': \`
			        import './entry1';
			      \`,
			      'one.ts': \`
			        import './two';
			        import './utils';
			      \`,
			      'three.ts': \`
			        import './utils';
			      \`,
			      'two.ts': \`
			        import './foo';
			      \`,
			      'utils.ts': \`
			        console.log('emtpy');
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    // three.ts isn't required, so being dropped
			    expect(modules).toHaveLength(6);
			    // two is required normally, so shouldn't be a dynamic!
			    expect(entries).toHaveLength(1);
			
			    expect(getSplitEntry('one.ts', entries).modules).toHaveLength(1);
			    expect(getSplitEntry('two.ts', entries)).toBe(undefined);
			  \});
			
			  /**
			   * We support all types of imports for modules in the splitEntry
			   * With this test we ensure that that works ;)
			   */
			  it('should handle all type import types; require, import and export from', async () => \{
			    const context = await getProductionContext(\{
			      'a.ts': \`
			        console.log('emtpy');
			      \`,
			      'b.ts': \`
			        import './utils';
			        export const b = 'b';
			      \`,
			      'c.ts': \`
			        console.log('emtpy');
			      \`,
			      'd.ts': \`
			        import './two';
			        import './utils';
			      \`,
			      'entry1.ts': \`
			        import \{ c \} from './c';
			        import('./d');
			        const a = require('./a');
			        export \{ b \} from './b';
			
			        console.log(c);
			        console.log(a);
			
			        export default function() \{\};
			      \`,
			      'index.ts': \`
			        import a, \{ b \} from './entry1';
			        console.log(a, b);
			      \`,
			      'two.ts': \`
			        console.log('emtpy');
			      \`,
			      'utils.ts': \`
			        console.log('emtpy');
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    // three.ts isn't required, so being dropped
			    expect(modules).toHaveLength(8);
			    expect(entries).toHaveLength(1);
			
			    expect(getSplitEntry('d.ts', entries).modules).toHaveLength(2);
			  \});
			
			  /**
			   * We support circular dependencies without erroring
			   * We should also be able to support multiple circular dependencies
			   */
			  it('should handle multiple circular dependencies', async () => \{
			    const context = await getProductionContext(\{
			      'a.ts': \`
			        import './b';
			      \`,
			      'b.ts': \`
			        import './c';
			      \`,
			      'c.ts': \`
			        import './b';
			        import './d';
			      \`,
			      'd.ts': \`
			        import './b';
			      \`,
			      'index.ts': \`
			        import('./a');
			      \`,
			    \});
			    const \{
			      modules,
			      splitEntries: \{ entries \},
			    \} = context;
			    expect(modules).toHaveLength(5);
			    expect(entries).toHaveLength(1);
			    expect(getSplitEntry('a.ts', entries).modules).toHaveLength(4);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\production\\__tests__\\CodeSplitting.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('fuse-box_fuse-box\\src\\production\\__tests__\\ModuleTree.test.ts', () => {
        const sourceCode = `
			import \{ IProductionContext \} from '../ProductionContext';
			import \{ WarmupPhase \} from '../phases/WarmupPhase';
			import \{ createTestEnvironment, ITestEnvironment \} from './testUtils';
			
			describe('ModuleTree test', () => \{
			  let environment: ITestEnvironment;
			
			  const getProductionContext = async (files: Record<string, string>): Promise<IProductionContext> => \{
			    environment = await createTestEnvironment(\{ entry: 'index.ts' \}, files);
			    const context = environment.run([WarmupPhase]);
			    return context;
			  \};
			
			  // cleanup after each test
			  afterEach(() => \{
			    if (environment) \{
			      environment.cleanup();
			      environment = undefined;
			    \}
			  \});
			
			  it('should have dependant', async () => \{
			    const context = await getProductionContext(\{
			      'foo.ts': 'export function foo()\{\}',
			      'index.ts': \`import "./foo"\`,
			    \});
			    const \{ modules \} = context;
			    expect(modules).toHaveLength(2);
			    expect(modules[1].moduleTree.dependants).toHaveLength(1);
			    expect(modules[1].moduleTree.dependants[0].module).toEqual(modules[0]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\production\\__tests__\\ModuleTree.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('fuse-box_fuse-box\\src\\production\\__tests__\\WarmupPhase_Export.test.ts', () => {
        const sourceCode = `
			import \{ IProductionContext \} from '../ProductionContext';
			import \{ IExportReference \} from '../module/ExportReference';
			import \{ WarmupPhase \} from '../phases/WarmupPhase';
			import \{ createTestEnvironment, ITestEnvironment \} from './testUtils';
			
			describe('Phase 1 export', () => \{
			  let environment: ITestEnvironment;
			  async function getProductionContext(code: string): Promise<IProductionContext> \{
			    environment = await createTestEnvironment(
			      \{ entry: 'index.ts' \},
			      \{
			        'foo.ts': \`
			        console.log('foo');
			      \`,
			        'index.ts': code,
			      \},
			    );
			    environment.run([WarmupPhase]);
			    return environment.productionContext;
			  \}
			
			  async function getReferences(code: string): Promise<Array<IExportReference>> \{
			    const context = await getProductionContext(code);
			    return context.modules[0].moduleTree.exportReferences.references;
			  \}
			
			  describe('Basic structures', () => \{
			    // cleanup after each test
			    afterEach(() => \{
			      if (environment) \{
			        environment.cleanup();
			        environment = undefined;
			      \}
			    \});
			
			    describe('Normal single object export', () => \{
			      it('export function foo', async () => \{
			        const refs = await getReferences(\`
			          export function foo()\{\}
			        \`);
			        expect(refs).toHaveLength(1);
			        expect(refs[0].name).toEqual('foo');
			      \});
			
			      it('export class Foo', async () => \{
			        const refs = await getReferences(\`
			          export class Foo \{\}
			        \`);
			        expect(refs).toHaveLength(1);
			        expect(refs[0].name).toEqual('Foo');
			      \});
			
			      it('should have both normal exports ', async () => \{
			        const refs = await getReferences(\`
			          export function foo()\{\}
			          export class Foo \{\}
			        \`);
			        expect(refs).toHaveLength(2);
			        expect(refs[0].name).toEqual('foo');
			        expect(refs[1].name).toEqual('Foo');
			      \});
			    \});
			
			    describe('Normal default object export', () => \{
			      it('export default function foo', async () => \{
			        const refs = await getReferences(\`
			          export default function foo()\{\}
			        \`);
			        expect(refs).toHaveLength(1);
			        expect(refs[0].name).toEqual('default');
			        expect(refs[0].local).toEqual('foo');
			      \});
			
			      it('export default class Foo', async () => \{
			        const refs = await getReferences(\`
			          export default class Foo\{\}
			        \`);
			        expect(refs).toHaveLength(1);
			        expect(refs[0].name).toEqual('default');
			        expect(refs[0].local).toEqual('Foo');
			      \});
			
			      it('export default class (anon', async () => \{
			        const refs = await getReferences(\`
			          export default class \{\}
			        \`);
			        expect(refs).toHaveLength(1);
			        expect(refs[0].name).toEqual('default');
			        expect(refs[0].local).toEqual(undefined);
			      \});
			
			      it('export default function (anon)', async () => \{
			        const refs = await getReferences(\`
			          export default function()\{\}
			        \`);
			        expect(refs).toHaveLength(1);
			        expect(refs[0].name).toEqual('default');
			        expect(refs[0].local).toEqual(undefined);
			      \});
			    \});
			  \});
			
			  describe('Export local refs', () => \{
			    it('should find local ref', async () => \{
			      const refs = await getReferences(\`
			        function foo()\{\}
			        export \{ foo \}
			      \`);
			      expect(refs).toHaveLength(1);
			      expect(refs[0].targetObjectAst).toBeTruthy();
			    \});
			
			    it('should not find local ref', async () => \{
			      const refs = await getReferences(\`
			        export \{ foo \}
			      \`);
			      expect(refs).toHaveLength(1);
			      expect(refs[0].targetObjectAst).toBeUndefined();
			    \});
			  \});
			
			  describe('Internal export references', () => \{
			    it('Function foo should have 1 internal export reference', async () => \{
			      const refs = await getReferences(\`
			        function bar()\{\}
			        function foo()\{
			          console.log(1);
			          return bar();
			        \}
			        export \{ foo, bar \}
			      \`);
			      expect(refs).toHaveLength(2);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\production\\__tests__\\WarmupPhase_Export.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('fuse-box_fuse-box\\src\\production\\__tests__\\WarmupPhase_Import.test.ts', () => {
        const sourceCode = `
			import \{ IProductionContext \} from '../ProductionContext';
			import \{ ImportType, IImport \} from '../module/ImportReference';
			import \{ WarmupPhase \} from '../phases/WarmupPhase';
			import \{ createTestEnvironment, ITestEnvironment \} from './testUtils';
			
			let environment: ITestEnvironment;
			async function getProductionContext(code: string): Promise<IProductionContext> \{
			  environment = await createTestEnvironment(
			    \{ entry: 'index.ts' \},
			    \{
			      'foo.ts': \`
			      console.log('foo');
			    \`,
			      'index.ts': code,
			    \},
			  );
			  environment.run([WarmupPhase]);
			  return environment.productionContext;
			\}
			
			async function getReferences(code: string): Promise<Array<IImport>> \{
			  const context = await getProductionContext(code);
			  return context.modules[0].moduleTree.importReferences.references;
			\}
			
			describe('Phase 1 - Imports test', () => \{
			  // cleanup after each test
			  afterEach(() => \{
			    if (environment) \{
			      environment.cleanup();
			      environment = undefined;
			    \}
			  \});
			
			  it(\`sideEffectImport import './foo'\`, async () => \{
			    const refs = await getReferences(\`
			      import './foo';
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source).toEqual('./foo');
			    expect(refs[0].type).toEqual(ImportType.SIDE_EFFECT_IMPORT);
			  \});
			
			  it(\`sideEffectImport import './foo' should be removed\`, async () => \{
			    const refs = await getReferences(\`
			      import './foo';
			    \`);
			    expect(refs).toHaveLength(1);
			    refs[0].remove();
			    expect(refs[0].removed).toBe(true);
			    refs.splice(0, 1);
			    expect(refs).toHaveLength(0);
			  \});
			
			  it(\`regularImport import foo from './foo'\`, async () => \{
			    const refs = await getReferences(\`
			      import foo from './foo';
			      console.log(foo);
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			    expect(refs[0].specifiers).toHaveLength(1);
			    expect(refs[0].specifiers[0].local === 'foo');
			    expect(refs[0].specifiers[0].name === 'default');
			  \});
			
			  it(\`regularImport import \{ foo, bar as baz \} from './foo'\`, async () => \{
			    const refs = await getReferences(\`
			      import \{ foo, bar as baz \} from './foo';
			      console.log(foo, baz);
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			    expect(refs[0].specifiers).toHaveLength(2);
			    expect(refs[0].specifiers[0].local === 'foo');
			    expect(refs[0].specifiers[0].name === 'foo');
			    expect(refs[0].specifiers[1].local === 'baz');
			    expect(refs[0].specifiers[1].name === 'bar');
			  \});
			
			  it(\`regularImport import foo, \{ bar \} from './foo'\`, async () => \{
			    const refs = await getReferences(\`
			      import foo, \{ bar \} from './foo';
			      console.log(foo, bar);
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			    expect(refs[0].specifiers).toHaveLength(2);
			    expect(refs[0].specifiers[0].local === 'foo');
			    expect(refs[0].specifiers[0].name === 'default');
			    expect(refs[0].specifiers[1].local === 'bar');
			    expect(refs[0].specifiers[1].name === 'bar');
			  \});
			
			  it(\`regularImport import * as bar from './foo'\`, async () => \{
			    const refs = await getReferences(\`
			      import * as bar from './foo';
			      console.log(bar);
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			    expect(refs[0].specifiers).toHaveLength(1);
			    expect(refs[0].specifiers[0].local === 'bar');
			    expect(refs[0].specifiers[0].name === undefined);
			  \});
			
			  it(\`regularImport import \{ bar \} from './bar' should be ignored\`, async () => \{
			    const refs = await getReferences(\`
			      import \{ bar \} from './bar';
			    \`);
			    expect(refs).toHaveLength(0);
			  \});
			
			  it(\`regularRequire const foo = require('./foo')\`, async () => \{
			    const refs = await getReferences(\`
			      const foo = require('./foo');
			      console.log(foo);
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`sideEffectImportRequire import bar = require('./foo')\`, async () => \{
			    const refs = await getReferences(\`
			      import bar = require('./foo');
			      console.log(bar);
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`exportAllImport export * from './foo'\`, async () => \{
			    const refs = await getReferences(\`
			      export * from './foo';
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`exportSpecifierImport export \{ default \} from './foo'\`, async () => \{
			    const refs = await getReferences(\`
			      export \{ default \} from './foo';
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			    expect(refs[0].specifiers).toHaveLength(1);
			    expect(refs[0].specifiers[0].local === 'default');
			    expect(refs[0].specifiers[0].name === 'default');
			  \});
			
			  it(\`exportSpecifierImport export \{ foo, bar as baz \} from './foo'\`, async () => \{
			    const refs = await getReferences(\`
			      export \{ foo, bar as baz \} from './foo';
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			    expect(refs[0].specifiers).toHaveLength(2);
			    expect(refs[0].specifiers[0].local === 'foo');
			    expect(refs[0].specifiers[0].name === 'foo');
			    expect(refs[0].specifiers[0].local === 'baz');
			    expect(refs[0].specifiers[0].name === 'bar');
			  \});
			
			  it(\`regularRequire require('./foo')\`, async () => \{
			    const refs = await getReferences(\`
			      require('./foo');
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`regularRequire require() should be ignored\`, async () => \{
			    const refs = await getReferences(\`
			      require();
			    \`);
			    expect(refs).toHaveLength(0);
			  \});
			
			  it(\`regularRequire require(1) should be ignored\`, async () => \{
			    const refs = await getReferences(\`
			      require(1);
			    \`);
			    expect(refs).toHaveLength(0);
			  \});
			
			  it(\`regularRequire in scope async () => \{ require('./foo') \}\`, async () => \{
			    const refs = await getReferences(\`
			      function a() \{
			        require('./foo');
			      \}
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`dynamicImport with async await\`, async () => \{
			    const refs = await getReferences(\`
			      async function foo()\{
			        await import('./foo');
			      \}
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`dynamicImport import(1) should be ignored\`, async () => \{
			    const refs = await getReferences(\`
			      async function foo()\{
			        await import(1);
			      \}
			    \`);
			    expect(refs).toHaveLength(0);
			  \});
			
			  it(\`dynamicImport () => import('./foo')\`, async () => \{
			    const refs = await getReferences(\`
			      const foo = () => import('./foo');
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`dynamicImport const foo = import('./foo')\`, async () => \{
			    const refs = await getReferences(\`
			      const foo = import('./foo');
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`dynamicImport const \{ foo \} = import('./foo')\`, async () => \{
			    const refs = await getReferences(\`
			      const \{ foo \} = import('./foo');
			    \`);
			    expect(refs).toHaveLength(1);
			    expect(refs[0].source === './foo');
			  \});
			
			  it(\`dynamicImport const bar = import('./bar') should be ignored\`, async () => \{
			    const refs = await getReferences(\`
			      const bar = import('./bar');
			    \`);
			    expect(refs).toHaveLength(0);
			  \});
			\});
			
			/**
			 * @todo:
			 *
			 * These test should work in the future when we support computed import statements
			 * So make sure to refactor these tests accordingly!
			 */
			describe('Phase 1 - Imports test - computed statements', () => \{
			  // cleanup after each test
			  afterEach(async () => \{
			    if (environment) \{
			      environment.cleanup();
			      environment = undefined;
			    \}
			  \});
			  it(\`regularRequire require('./foo' + b) should be ignored\`, async () => \{
			    const refs = await getReferences(\`
			      const b = '/some-file.ts';
			      require('./foo' + b);
			    \`);
			    expect(refs).toHaveLength(0);
			  \});
			
			  it(\`regularRequire in scope async () => \{ require('./foo' + b) \} should be ingored\`, async () => \{
			    const refs = await getReferences(\`
			      const b = '/some-file.ts';
			      function a() \{
			        require('./foo' + b);
			      \}
			    \`);
			    expect(refs).toHaveLength(0);
			  \});
			
			  it(\`dynamicImport import('./foo' + b) should be ignored\`, async () => \{
			    const refs = await getReferences(\`
			      async function foo()\{
			        const b = '/some-file.ts';
			        await import('./foo' + b);
			      \}
			    \`);
			    expect(refs).toHaveLength(0);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\production\\__tests__\\WarmupPhase_Import.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(25)
    });
    it('fuse-box_fuse-box\\src\\resolver\\__tests__\\fileLookup.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ fileLookup \} from '../fileLookup';
			const cases = path.join(__dirname, 'cases/lk');
			import '../../utils/test_utils';
			describe('lookup test', () => \{
			  it('Should resolve (with ext', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'a/index.js' \});
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toContain('index.js');
			  \});
			
			  it('Should resolve (with ext not found)', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'a/index.jsx' \});
			    expect(response.fileExists).toBe(false);
			    expect(response.absPath).toContain('index.jsx');
			  \});
			
			  it('Should resolve directory index.js', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'a/' \});
			    expect(response.isDirectoryIndex).toBe(true);
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toMatch(/index\\.js\$/);
			  \});
			
			  it('Should resolve directory index.jsx', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'b/' \});
			    expect(response.isDirectoryIndex).toBe(true);
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toMatch(/index\\.jsx\$/);
			  \});
			
			  it('Should resolve directory index.ts', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'c/' \});
			
			    expect(response.isDirectoryIndex).toBe(true);
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toMatch(/index\\.ts\$/);
			  \});
			
			  it('Should resolve directory index.tsx', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'd/' \});
			    expect(response.isDirectoryIndex).toBe(true);
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toMatch(/index\\.tsx\$/);
			  \});
			
			  it('Should resolve directory with package.json in it', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'e/' \});
			    expect(response.isDirectoryIndex).toBe(true);
			    expect(response.fileExists).toBe(true);
			    expect(response.customIndex).toBe(true);
			    expect(response.absPath).toMatch(/foo.js\$/);
			  \});
			
			  it('Should resolve file .js', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'f/foo' \});
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toMatch(/foo.js\$/);
			  \});
			
			  it('Should resolve file .jsx', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'f/bar' \});
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toMatch(/bar.jsx\$/);
			  \});
			
			  it('Should resolve file .ts', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'f/aha' \});
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toMatch(/aha.ts\$/);
			  \});
			
			  it('Should resolve file .tsx', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'f/moi' \});
			    expect(response.fileExists).toBe(true);
			    expect(response.absPath).toMatch(/moi.tsx\$/);
			  \});
			
			  it('Should not fail on an uknown directory', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'g' \});
			    expect(response.fileExists).toEqual(false);
			  \});
			
			  it('Should resolve a json file', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'z/foo' \});
			    expect(response.customIndex).toEqual(true);
			    expect(response.absPath).toMatchFilePath('z/foo.json\$');
			    expect(response.fileExists).toBe(true);
			    expect(response.extension).toBe('.json');
			  \});
			
			  it('Should resolve mjs file', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'k/foo' \});
			    expect(response.absPath).toMatchFilePath('k/foo.mjs\$');
			    expect(response.fileExists).toBe(true);
			    expect(response.extension).toBe('.mjs');
			  \});
			
			  it('Should resolve a js file while .min is specified', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'min_lookup/file.min' \});
			
			    expect(response.absPath).toMatchFilePath('min_lookup/file.min.js\$');
			    expect(response.fileExists).toBe(true);
			    expect(response.extension).toBe('.js');
			  \});
			
			  it('Should not ignore local:main', () => \{
			    const response = fileLookup(\{ fileDir: cases, target: 'local_main/some' \});
			    expect(response.absPath).toMatchFilePath('some/index3.ts\$');
			  \});
			
			  it('Should read local:main', () => \{
			    const response = fileLookup(\{ isDev: true, fileDir: cases, target: 'local_main/some' \});
			    expect(response.absPath).toMatchFilePath('some/index3.ts\$');
			  \});
			
			  it('Should do index search on value of package main', () => \{
			    // if package.json has \{"main": "main"\}
			    // then should include main/index.js in search
			    const response = fileLookup(\{ fileDir: cases, target: 'w' \});
			    expect(response.absPath).toMatchFilePath('main/index.js\$');
			  \})
			
			  it('Should do extensions search on value of package main', () => \{
			    // if package.json has \{"main": "main"\}
			    // then should include main.js in search
			    const response = fileLookup(\{ fileDir: cases, target: 'x' \});
			    expect(response.absPath).toMatchFilePath('main.js\$');
			  \})
			
			  it('Should fallback if package main is not a module', () => \{
			    // if package.json has \{"main": "main"\}
			    // but there is no "main.js", "main/index.js", etc.
			    // then it should fallback to "index.js"
			    const response = fileLookup(\{ fileDir: cases, target: 'y' \});
			    expect(response.absPath).toMatchFilePath('y/index.js\$');
			  \})
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\resolver\\__tests__\\fileLookup.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(20)
    });
    it('fuse-box_fuse-box\\src\\resolver\\__tests__\\nodeModuleLookup.test.ts', () => {
        const sourceCode = `
			import * as appRoot from 'app-root-path';
			import * as path from 'path';
			const P = path.join; // use P for joining and normalizing paths
			import \{ resolve as pathResolve \} from 'path';
			import '../../utils/test_utils';
			import \{ createRealNodeModule \} from '../../utils/test_utils';
			import \{ ensureDir, ensurePackageJson \} from '../../utils/utils';
			import \{ findTargetFolder, isNodeModule, nodeModuleLookup, parseAllModulePaths \} from '../nodeModuleLookup';
			
			const cases = path.join(__dirname, 'cases');
			
			const PROJECT_NODE_MODULES = path.join(appRoot.path, 'node_modules');
			describe('isNodeModule', () => \{
			  it('case 1', () => \{
			    const res = isNodeModule('foo');
			    expect(res).toEqual(\{ name: 'foo' \});
			  \});
			
			  it('case 2', () => \{
			    const res = isNodeModule('foo/');
			    expect(res).toEqual(\{ name: 'foo' \});
			  \});
			  it('case 3', () => \{
			    const res = isNodeModule('foo/some.js');
			    expect(res).toEqual(\{ name: 'foo', target: 'some.js' \});
			  \});
			  it('case 4', () => \{
			    const res = isNodeModule('foo/some');
			    expect(res).toEqual(\{ name: 'foo', target: 'some' \});
			  \});
			
			  it('case 4', () => \{
			    const res = isNodeModule('@core/foo');
			    expect(res).toEqual(\{ name: '@core/foo' \});
			  \});
			
			  it('case 5', () => \{
			    const res = isNodeModule('@core/foo/');
			    expect(res).toEqual(\{ name: '@core/foo' \});
			  \});
			
			  it('case 6', () => \{
			    const res = isNodeModule('@core/foo/something');
			    expect(res).toEqual(\{ name: '@core/foo', target: 'something' \});
			  \});
			
			  it('case 9', () => \{
			    const res = isNodeModule('some-stuff-here');
			    expect(res).toEqual(\{ name: 'some-stuff-here' \});
			  \});
			
			  it('case 10', () => \{
			    const res = isNodeModule('some-stuff_here');
			    expect(res).toEqual(\{ name: 'some-stuff_here' \});
			  \});
			
			  it('case 11', () => \{
			    const res = isNodeModule('@angular/platform-browser-dynamic');
			    expect(res).toEqual(\{ name: '@angular/platform-browser-dynamic' \});
			  \});
			
			  it('case 12', () => \{
			    const res = isNodeModule('@angular/platform-browser-dynamic/bar');
			    expect(res).toEqual(\{ name: '@angular/platform-browser-dynamic', target: 'bar' \});
			  \});
			
			  it('case 13', () => \{
			    const res = isNodeModule('lodash.isNull');
			    expect(res).toEqual(\{ name: 'lodash.isNull' \});
			  \});
			
			  it('case 14', () => \{
			    const res = isNodeModule('chart.js');
			    expect(res).toEqual(\{ name: 'chart.js' \});
			  \});
			
			  it('case 15', () => \{
			    const res = isNodeModule('validate.io-undefined');
			    expect(res).toEqual(\{ name: 'validate.io-undefined' \});
			  \});
			\});
			
			describe('NodeModule lookup', () => \{
			  const modules = path.join(__dirname, 'cases/_modules');
			  const filePath = path.join(cases, 'src2/index.ts');
			  it('should fail to look up a module', () => \{
			    const res = nodeModuleLookup(\{ filePath: filePath, target: '__foo' \}, \{ name: '__foo' \});
			    expect('error' in res && res.error).toContain('Cannot resolve "__foo"');
			  \});
			
			  it('should fail to look up a module without package.json', () => \{
			    const res = nodeModuleLookup(
			      \{ filePath: filePath, modules: [modules], target: 'incomplete_module' \},
			      \{ name: 'incomplete_module' \},
			    );
			
			    expect('error' in res && res.error).toBeTruthy();
			  \});
			
			  it('should extract fuse-box info from package.json', () => \{
			    const result = nodeModuleLookup(
			      \{ filePath: filePath, modules: [modules], target: 'system_module' \},
			      \{ name: 'system_module' \},
			    );
			    expect(!('error' in result) && result.meta.fusebox.system).toEqual(true);
			  \});
			
			  it('should throw an error if an entry point is not found', () => \{
			    //expect(() => \{
			    const res = nodeModuleLookup(
			      \{ filePath: filePath, modules: [modules], target: 'wrong_entry' \},
			      \{ name: 'wrong_entry' \},
			    );
			    expect('error' in res && res.error).toContain('Failed to resolve an entry point in package');
			  \});
			\});
			
			describe('parseAllModulePaths', () => \{
			  it('Should skip node_modules directories', () => \{
			    const path = pathResolve('/a/node_modules/@angular/core/node_modules/foo/node_modules/bar/far/woo/index.js');
			    const actual = parseAllModulePaths(path);
			    const expected = [
			      '/node_modules',
			      '/a/node_modules',
			      '/a/node_modules/@angular/node_modules',
			      '/a/node_modules/@angular/core/node_modules',
			      '/a/node_modules/@angular/core/node_modules/foo/node_modules',
			      '/a/node_modules/@angular/core/node_modules/foo/node_modules/bar/node_modules',
			      '/a/node_modules/@angular/core/node_modules/foo/node_modules/bar/far/node_modules',
			      '/a/node_modules/@angular/core/node_modules/foo/node_modules/bar/far/woo/node_modules',
			    ].map(p => pathResolve(p));
			    expect(actual).toStrictEqual(expected);
			  \});
			
			  it('Should give all node_modules paths ', () => \{
			    const path = pathResolve('/some/user/file');
			    const actual = parseAllModulePaths(path);
			    const expected = ['/node_modules', '/some/node_modules', '/some/user/node_modules'].map(p => pathResolve(p));
			    expect(actual).toStrictEqual(expected);
			  \});
			\});
			
			describe('folder lookup', () => \{
			  ensureDir(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-b'));
			  ensurePackageJson(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/b/node_modules/d/'));
			  ensureDir(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/crazy-module/'));
			  ensureDir(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/nm-lookup-test-b'));
			  it('case 1', () => \{
			    const dir = ensureDir(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/b/node_modules/c/'));
			    const target = path.join(dir, 'foo/bar/index.js');
			    const result = findTargetFolder(\{ filePath: target, target: 'a' \}, 'd');
			    expect(result).toEqual(\{
			      folder: P(PROJECT_NODE_MODULES, \`nm-lookup-test-a/node_modules/b/node_modules/d\`),
			      isUserOwned: false,
			    \})
			  \});
			
			  it('case 2', () => \{
			    const dir = ensureDir(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/b/node_modules/c/'));
			    ensurePackageJson(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/crazy-module/'));
			    const target = path.join(dir, 'foo/bar/index.js');
			    const result = findTargetFolder(\{ filePath: target, target: 'a' \}, 'crazy-module');
			    expect(result).toEqual(\{
			      folder: P(PROJECT_NODE_MODULES, \`nm-lookup-test-a/node_modules/crazy-module\`),
			      isUserOwned: false,
			    \})
			  \});
			
			  it('case 3', () => \{
			    const dir = ensureDir(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/b/node_modules/c/'));
			    ensurePackageJson(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/nm-lookup-test-b'));
			    const target = path.join(dir, 'foo/bar/index.js');
			    const result = findTargetFolder(\{ filePath: target, target: 'a' \}, 'nm-lookup-test-b');
			    expect(result).toEqual(\{
			      folder: P(PROJECT_NODE_MODULES, \`nm-lookup-test-a/node_modules/nm-lookup-test-b\`),
			      isUserOwned: false,
			    \})
			  \});
			
			  it('case 4', () => \{
			    const target = path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/index.js');
			    const result = findTargetFolder(\{ filePath: target, target: 'a' \}, 'nm-lookup-test-b');
			    expect(result).toEqual(\{
			      folder: P(PROJECT_NODE_MODULES, \`nm-lookup-test-a/node_modules/nm-lookup-test-b\`),
			      isUserOwned: false,
			    \})
			  \});
			
			  it('case 5 (not inside node_modules)', () => \{
			    const target = path.join(__dirname, 'nm-lookup-test-b');
			    ensurePackageJson(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-b'));
			    const result = findTargetFolder(\{ filePath: target, target: 'a' \}, 'nm-lookup-test-b');
			    expect(result).toEqual(\{
			      folder: P(PROJECT_NODE_MODULES, \`nm-lookup-test-b\`),
			      isUserOwned: false,
			    \})
			  \});
			
			  it('case 6 (only package.json)', () => \{
			    // this one should not match (has no package.json)
			    const deep = ensureDir(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/b'));
			    ensureDir(path.join(deep, 'b/node_modules/c/'));
			    // this one should match (has package.json)
			    const shallow = ensureDir(path.join(PROJECT_NODE_MODULES, 'nm-lookup-test-a/node_modules/c'));
			    ensurePackageJson(shallow);
			    const target = path.join(deep, 'foo/bar/index.js');
			    const result = findTargetFolder(\{ filePath: target, target: 'a' \}, 'c');
			    expect(result).toEqual(\{
			      folder: P(PROJECT_NODE_MODULES, \`nm-lookup-test-a/node_modules/c\`),
			      isUserOwned: false,
			    \})
			  \});
			
			  describe('Nested lookup', () => \{
			    createRealNodeModule(
			      'fuse-box-resolver-parent',
			      \{
			        main: 'index.js',
			        version: '1.0.1',
			      \},
			      \{
			        'index.js': 'import "fuse-box-resolver-conflict"',
			      \},
			    );
			
			    createRealNodeModule(
			      'fuse-box-flat-parent/node_modules/fuse-box-resolver-conflict',
			      \{
			        main: 'index.js',
			        version: '4.0.0',
			      \},
			      \{
			        'index.js': 'module.exports = \{\}',
			      \},
			    );
			
			    createRealNodeModule(
			      'fuse-box-resolver-conflict',
			      \{
			        main: 'index.js',
			        version: '5.0.0',
			      \},
			      \{
			        'index.js': 'module.exports = \{\}',
			      \},
			    );
			
			    it('should look up nested with src/index.js', () => \{
			      const result = findTargetFolder(
			        \{
			          filePath: path.join(appRoot.path, 'node_modules/fuse-box-flat-parent/src/index.js'),
			          target: 'fuse-box-resolver-conflict',
			        \},
			        'fuse-box-resolver-conflict',
			      );
			
			      expect(result).toEqual(\{
			        folder: P(PROJECT_NODE_MODULES, \`fuse-box-flat-parent/node_modules/fuse-box-resolver-conflict\`),
			        isUserOwned: false,
			      \});
			    \});
			
			    it('should look up nested with index.js (direct)', () => \{
			      const result = findTargetFolder(
			        \{
			          filePath: path.join(appRoot.path, 'node_modules/fuse-box-flat-parent/index.js'),
			          target: 'fuse-box-resolver-conflict',
			        \},
			        'fuse-box-resolver-conflict',
			      );
			
			      expect(result).toEqual(\{
			        folder: P(PROJECT_NODE_MODULES, \`fuse-box-flat-parent/node_modules/fuse-box-resolver-conflict\`),
			        isUserOwned: false,
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\resolver\\__tests__\\nodeModuleLookup.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(28)
    });
    it('fuse-box_fuse-box\\src\\resolver\\__tests__\\pathsLookup.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import '../../utils/test_utils';
			import \{ pathsLookup \} from '../pathsLookup';
			const CASE1 = path.join(__dirname, 'cases/paths_lookup/src1');
			
			describe('Paths lookup', () => \{
			  describe('Basic lookup based on listing', () => \{
			    it('Should lookup and resolve baseURL . (tsx)', () => \{
			      const result = pathsLookup(\{ baseURL: CASE1, target: 'bar/Bar' \});
			
			      expect(result.fileExists).toBe(true);
			      expect(result.absPath).toMatch(/Bar\\.tsx\$/);
			      expect(result.absPath).toMatchFilePath('Bar.tsx\$');
			    \});
			
			    it('Should lookup and resolve baseURL . (foo/index.ts)', () => \{
			      const result = pathsLookup(\{ baseURL: CASE1, target: 'foo' \});
			      expect(result.fileExists).toBe(true);
			
			      expect(result.absPath).toMatchFilePath('foo/index.ts\$');
			    \});
			
			    it('Should lookup and resolve baseURL . (foo/index.ts) with slash', () => \{
			      const result = pathsLookup(\{ baseURL: CASE1, target: 'foo/' \});
			      expect(result.fileExists).toBe(true);
			      expect(result.absPath).toMatchFilePath('foo/index.ts\$');
			    \});
			
			    it('Should fail to resolve', () => \{
			      const result = pathsLookup(\{ baseURL: CASE1, target: 'foosome/' \});
			      expect(result).toBe(undefined);
			    \});
			
			    it('Should result just a file name Moi.ts', () => \{
			      const result = pathsLookup(\{ baseURL: CASE1, target: 'Moi' \});
			      expect(result.fileExists).toBe(true);
			
			      expect(result.absPath).toMatchFilePath('Moi.ts\$');
			    \});
			  \});
			
			  describe('Lookup based on paths', () => \{
			    it('should look up an find @app', () => \{
			      const result = pathsLookup(\{
			        baseURL: CASE1,
			        paths: \{
			          '@app/*': ['something/app/*'],
			        \},
			        target: '@app/Foo',
			      \});
			      expect(result.fileExists).toBe(true);
			      expect(result.extension).toEqual('.tsx');
			      expect(result.absPath).toMatchFilePath('something/app/Foo.tsx\$');
			    \});
			
			    it('should look up and find in 2 directories', () => \{
			      const result = pathsLookup(\{
			        baseURL: CASE1,
			
			        paths: \{
			          '@app/*': ['something/app/*', 'something/other/*'],
			        \},
			        target: '@app/AnotherFile',
			      \});
			      expect(result.fileExists).toBe(true);
			      expect(result.extension).toEqual('.jsx');
			      expect(result.absPath).toMatchFilePath('something/other/AnotherFile.jsx\$');
			    \});
			
			    it('should look up and find @app/*/foo (middle star)', () => \{
			      const result = pathsLookup(\{
			        baseURL: CASE1,
			
			        paths: \{
			          '@app/*/foo': ['something/*/Foo'],
			        \},
			        target: '@app/app/foo',
			      \});
			      expect(result.fileExists).toBe(true);
			      expect(result.extension).toEqual('.tsx');
			      expect(result.absPath).toMatchFilePath('something/app/Foo.tsx\$');
			    \});
			
			    it('should look up and find @app/* (key with star | dir no star)', () => \{
			      const result = pathsLookup(\{
			        baseURL: CASE1,
			
			        paths: \{
			          '@app/*': ['foo'],
			        \},
			        target: '@app/anything',
			      \});
			      expect(result.fileExists).toBe(true);
			      expect(result.extension).toEqual('.ts');
			      expect(result.absPath).toMatchFilePath('foo/index.ts\$');
			    \});
			
			    it('should look up and find @app* (key with star, no slash)', () => \{
			      const result = pathsLookup(\{
			        baseURL: CASE1,
			
			        paths: \{
			          '@app*': ['foo'],
			        \},
			        target: '@appFindFoo',
			      \});
			      expect(result.fileExists).toBe(true);
			      expect(result.extension).toEqual('.ts');
			      expect(result.absPath).toMatchFilePath('foo/index.ts\$');
			    \});
			
			    it("should look up and find 'path' (alias to foo/index.js)", () => \{
			      const result = pathsLookup(\{
			        baseURL: CASE1,
			
			        paths: \{
			          path: ['foo'],
			        \},
			        target: 'path',
			      \});
			      expect(result.fileExists).toBe(true);
			      expect(result.extension).toEqual('.ts');
			      expect(result.absPath).toMatchFilePath('foo/index.ts\$');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\resolver\\__tests__\\pathsLookup.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(11)
    });
    it('fuse-box_fuse-box\\src\\resolver\\__tests__\\resolver.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ ImportType \} from '../../compiler/interfaces/ImportType';
			import \{ createRealNodeModule \} from '../../utils/test_utils';
			import \{ resolveModule \} from '../resolver';
			const cases = path.join(__dirname, 'cases/');
			const customModules = path.join(cases, '_modules');
			createRealNodeModule(
			  'resolver-test_a',
			  \{
			    browser: 'something-for-browser.js',
			    main: 'index.js',
			    version: '1.0.1',
			  \},
			  \{
			    'components/MyComponent.jsx': '',
			    'foobar.js': 'module.exports = \{\}',
			    'index.js': 'module.exports = \{\}',
			    'something-for-browser.js': '',
			    'sub/package.json': JSON.stringify(\{
			      main: 'subindex.js',
			    \}),
			    'sub/subindex.js': '',
			  \},
			);
			
			createRealNodeModule(
			  'resolver-test_b',
			  \{
			    browser: \{ './foobar.js': './sub/subindex.js', oops: false \},
			    main: 'index.js',
			    version: '1.0.1',
			  \},
			  \{
			    'components/MyComponent.jsx': '',
			    'deepa/index.js': \`require('../foobar')\`,
			    'foobar.js': 'module.exports = \{\}',
			    'index.js': 'module.exports = \{\}',
			    'something-for-browser.js': '',
			    'sub/package.json': JSON.stringify(\{
			      main: 'subindex.js',
			    \}),
			    'sub/subindex.js': '',
			  \},
			);
			
			createRealNodeModule(
			  'resolver-test_cc',
			  \{
			    browser: \{ './index.js': './browser-index.js' \},
			    main: 'index.js',
			    version: '1.0.1',
			  \},
			  \{
			    'browser-index.js': 'module.exports = \{ browser : true \}',
			    'index.js': 'module.exports = \{ main : true \}',
			  \},
			);
			
			describe('Resolver test', () => \{
			  describe('External modules', () => \{
			    it('Should resolve external target', () => \{
			      const info = resolveModule(\{ target: 'http://foo.com/some.js' \});
			      expect(info).toEqual(\{ isExternal: true \});
			    \});
			  \});
			
			  describe('Folder resolution', () => \{
			    const homeDir = path.join(cases, 'src1');
			    const filePath = path.join(homeDir, 'foo.js');
			
			    it('Should resolve index.js', () => \{
			      const info = resolveModule(\{
			        filePath: filePath,
			
			        target: './some1',
			      \});
			
			      expect(info.extension).toEqual('.js');
			      expect(info.absPath).toMatchFilePath('cases/src1/some1/index.js');
			    \});
			
			    it('Should resolve index.jsx', () => \{
			      const info = resolveModule(\{
			        filePath: filePath,
			
			        target: './some2',
			      \});
			      expect(info.extension).toEqual('.jsx');
			      expect(info.absPath).toMatchFilePath('cases/src1/some2/index.jsx');
			    \});
			
			    it('Should resolve index.ts', () => \{
			      const info = resolveModule(\{
			        filePath: filePath,
			
			        target: './some3',
			      \});
			      expect(info.extension).toEqual('.ts');
			      expect(info.absPath).toMatchFilePath('cases/src1/some3/index.ts');
			    \});
			
			    it('Should resolve index.tsx', () => \{
			      const info = resolveModule(\{
			        filePath: filePath,
			
			        target: './some4',
			      \});
			      expect(info.extension).toEqual('.tsx');
			      expect(info.absPath).toMatchFilePath('cases/src1/some4/index.tsx');
			    \});
			
			    it('Should resolve with importType DYNAMIC', () => \{
			      const info = resolveModule(\{
			        filePath: filePath,
			
			        importType: ImportType.DYNAMIC,
			        target: './some4',
			      \});
			
			      expect(info.extension).toEqual('.tsx');
			
			      expect(info.absPath).toMatchFilePath('cases/src1/some4/index.tsx');
			    \});
			  \});
			
			  describe('Alias replacement', () => \{
			    const homeDir = path.join(cases, 'src1');
			    const filePath = path.join(homeDir, 'foo.js');
			    it('Should replace alias 1', () => \{
			      const info = resolveModule(\{
			        alias: \{
			          gibberish\$: './some5',
			        \},
			        filePath: filePath,
			
			        target: 'gibberish',
			      \});
			      expect(info.absPath).toMatchFilePath('cases/src1/some5/foo.js\$');
			    \});
			
			    it('Should replace alias 2', () => \{
			      const info = resolveModule(\{
			        alias: \{
			          ololo\$: './some1',
			        \},
			        filePath: filePath,
			
			        target: 'ololo',
			      \});
			
			      expect(info.absPath).toMatchFilePath('some1/index.js\$');
			    \});
			
			    it('Should replace alias 3', () => \{
			      const info = resolveModule(\{
			        alias: \{
			          react: 'resolver-test_a',
			        \},
			        filePath: filePath,
			
			        target: 'react',
			      \});
			      expect(info.package.targetAbsPath).toMatchFilePath('node_modules/resolver-test_a/index.js');
			    \});
			
			    it('Should not Replace alias and have forcedStatement false', () => \{
			      const info = resolveModule(\{
			        alias: \{
			          ololo\$: './some1',
			        \},
			        filePath: filePath,
			
			        target: './some1',
			      \});
			      expect(info.absPath).toMatchFilePath('some1/index.js\$');
			    \});
			  \});
			
			  describe('Typescripts paths resolution', () => \{
			    const homeDir = path.join(cases, 'paths_lookup/src1');
			    const filePath = path.join(homeDir, 'Moi.ts');
			    it('Should resolve with ts paths and just baseURL', () => \{
			      const info = resolveModule(\{
			        filePath: filePath,
			
			        target: 'bar/Bar',
			        typescriptPaths: \{
			          baseURL: homeDir,
			        \},
			      \});
			
			      expect(info.absPath).toMatchFilePath('src1/bar/Bar.tsx\$');
			    \});
			
			    it('Should resolve with ts paths and custom paths 1', () => \{
			      const result = resolveModule(\{
			        filePath: filePath,
			
			        target: '@app/Foo',
			        typescriptPaths: \{
			          baseURL: homeDir,
			          paths: \{
			            '@app/*': ['something/app/*'],
			          \},
			        \},
			      \});
			      expect(result.extension).toEqual('.tsx');
			      expect(result.absPath).toMatchFilePath('something/app/Foo.tsx\$');
			    \});
			
			    it('Should resolve with ts paths and custom paths 2', () => \{
			      const result = resolveModule(\{
			        filePath: filePath,
			
			        target: '@app/AnotherFile',
			        typescriptPaths: \{
			          baseURL: homeDir,
			          paths: \{
			            '@app/*': ['something/app/*', 'something/other/*'],
			          \},
			        \},
			      \});
			      expect(result.extension).toEqual('.jsx');
			      expect(result.absPath).toMatchFilePath('something/other/AnotherFile.jsx\$');
			    \});
			  \});
			
			  describe('Package resolution', () => \{
			    const homeDir = path.join(cases, 'src1');
			    const filePath = path.join(homeDir, 'foo.js');
			    describe('From the current project', () => \{
			      it('should resolve a simple package', () => \{
			        const info = resolveModule(\{
			          filePath: filePath,
			
			          target: 'resolver-test_a',
			        \});
			
			        const meta = info.package.meta;
			        expect(meta.name).toEqual('resolver-test_a');
			        expect(meta.packageRoot).toMatchFilePath('node_modules/resolver-test_a\$');
			        expect(meta.version).toEqual('1.0.1');
			        expect(meta.packageJSONLocation).toMatchFilePath('node_modules/resolver-test_a/package.json\$');
			        expect(meta.entryFuseBoxPath).toEqual('index.js');
			        expect(info.package.isEntry).toEqual(true);
			        expect(info.package.targetAbsPath).toMatchFilePath('node_modules/resolver-test_a/index.js\$');
			        expect(info.package.targetFuseBoxPath).toEqual('index.js');
			      \});
			
			      it('should resolve a simple package with browser target', () => \{
			        const info = resolveModule(\{
			          buildTarget: 'browser',
			          filePath: filePath,
			
			          target: 'resolver-test_a',
			        \});
			
			        const meta = info.package.meta;
			
			        expect(meta.entryFuseBoxPath).toEqual('something-for-browser.js');
			        expect(info.package.isEntry).toEqual(true);
			        expect(info.package.targetAbsPath).toMatchFilePath('node_modules/resolver-test_a/something-for-browser.js\$');
			        expect(info.package.targetFuseBoxPath).toEqual('something-for-browser.js');
			      \});
			
			      it('should partially resolve package', () => \{
			        const info = resolveModule(\{
			          filePath: filePath,
			
			          target: 'resolver-test_a/foobar',
			        \});
			
			        const meta = info.package.meta;
			        expect(meta.name).toEqual('resolver-test_a');
			        expect(meta.packageRoot).toMatchFilePath('node_modules/resolver-test_a\$');
			        expect(meta.version).toEqual('1.0.1');
			        expect(meta.packageJSONLocation).toMatchFilePath('node_modules/resolver-test_a/package.json\$');
			
			        expect(info.package.isEntry).toEqual(false);
			        expect(info.package.targetAbsPath).toMatchFilePath('node_modules/resolver-test_a/foobar.js');
			        expect(info.package.targetFuseBoxPath).toEqual('foobar.js');
			      \});
			
			      it('should partially resolve package (with ext)', () => \{
			        const info = resolveModule(\{
			          filePath: filePath,
			
			          target: 'resolver-test_a/foobar.js',
			        \});
			
			        const meta = info.package.meta;
			        expect(meta.name).toEqual('resolver-test_a');
			        expect(meta.packageRoot).toMatchFilePath('node_modules/resolver-test_a\$');
			        expect(meta.version).toEqual('1.0.1');
			        expect(meta.packageJSONLocation).toMatchFilePath('node_modules/resolver-test_a/package.json\$');
			        expect(info.package.isEntry).toEqual(false);
			        expect(info.package.targetAbsPath).toMatchFilePath('node_modules/resolver-test_a/foobar.js');
			        expect(info.package.targetFuseBoxPath).toEqual('foobar.js');
			      \});
			
			      it('should partially resolve package (subfile with package.json)', () => \{
			        const info = resolveModule(\{
			          filePath: filePath,
			
			          target: 'resolver-test_a/sub',
			        \});
			
			        const meta = info.package.meta;
			        expect(meta.name).toEqual('resolver-test_a');
			        expect(meta.packageRoot).toMatchFilePath('node_modules/resolver-test_a\$');
			        expect(meta.version).toEqual('1.0.1');
			        expect(meta.packageJSONLocation).toMatchFilePath('node_modules/resolver-test_a/package.json\$');
			
			        expect(info.package.isEntry).toEqual(false);
			        expect(info.package.targetAbsPath).toMatchFilePath('node_modules/resolver-test_a/sub/subindex.js');
			        expect(info.package.targetFuseBoxPath).toEqual('sub/subindex.js');
			      \});
			
			      it('should partially resolve package (subfile with package.json) with alias', () => \{
			        const info = resolveModule(\{
			          alias: \{
			            '^oi': 'resolver-test_a',
			          \},
			          filePath: filePath,
			
			          target: 'oi/sub',
			        \});
			
			        const meta = info.package.meta;
			        expect(meta.name).toEqual('resolver-test_a');
			        expect(meta.packageRoot).toMatchFilePath('node_modules/resolver-test_a\$');
			        expect(meta.version).toEqual('1.0.1');
			        expect(meta.packageJSONLocation).toMatchFilePath('node_modules/resolver-test_a/package.json\$');
			
			        expect(info.package.isEntry).toEqual(false);
			        expect(info.package.targetAbsPath).toMatchFilePath('node_modules/resolver-test_a/sub/subindex.js');
			        expect(info.package.targetFuseBoxPath).toEqual('sub/subindex.js');
			      \});
			    \});
			
			    describe('From existing package', () => \{
			      const packageInfo = resolveModule(\{
			        filePath: filePath,
			
			        target: 'resolver-test_a',
			      \});
			
			      const pkg = packageInfo.package;
			      it('should resolve a file being in a package', () => \{
			        const info = resolveModule(\{
			          filePath: packageInfo.package.targetAbsPath,
			
			          packageMeta: pkg.meta,
			          target: './components/MyComponent',
			        \});
			
			        expect(info.extension).toEqual('.jsx');
			        expect(info.absPath).toMatchFilePath('node_modules/resolver-test_a/components/MyComponent.jsx');
			      \});
			
			      it('should resolve a file being in a package 2', () => \{
			        const info = resolveModule(\{
			          filePath: packageInfo.package.targetAbsPath,
			
			          packageMeta: pkg.meta,
			          target: './sub',
			        \});
			
			        expect(info.extension).toEqual('.js');
			        expect(info.absPath).toMatchFilePath('node_modules/resolver-test_a/sub/subindex.js');
			      \});
			    \});
			
			    describe('resolution with browser field', () => \{
			      const packageInfoB = resolveModule(\{
			        filePath: filePath,
			
			        target: 'resolver-test_b',
			      \});
			      it('should resolve a file being in a package 2 (build target uknown)', () => \{
			        const info = resolveModule(\{
			          filePath: packageInfoB.package.targetAbsPath,
			
			          packageMeta: packageInfoB.package.meta,
			          target: './foobar',
			        \});
			
			        expect(info.absPath).toMatchFilePath('node_modules/resolver-test_b/foobar.js');
			      \});
			
			      it('should override an entry point', () => \{
			        const info = resolveModule(\{
			          buildTarget: 'browser',
			          filePath: __dirname,
			
			          target: 'resolver-test_cc',
			        \});
			        expect(info.package.targetAbsPath).toMatchFilePath('browser-index.js');
			        expect(info.package.targetFuseBoxPath).toEqual('browser-index.js');
			        expect(info.package.meta.entryAbsPath).toMatchFilePath('browser-index.js');
			      \});
			
			      it('should resolve a file being in a package with browser fields', () => \{
			        const info = resolveModule(\{
			          buildTarget: 'browser',
			          filePath: packageInfoB.package.targetAbsPath,
			
			          packageMeta: packageInfoB.package.meta,
			          target: './foobar',
			        \});
			
			        expect(info.absPath).toMatchFilePath('node_modules/resolver-test_b/sub/subindex.js\$');
			      \});
			
			      it('should resolve a file being in a package with browser fields 2', () => \{
			        const filePath = path.join(path.dirname(packageInfoB.package.targetAbsPath), 'deepa/index.js');
			
			        const info = resolveModule(\{
			          buildTarget: 'browser',
			          filePath: filePath,
			
			          packageMeta: packageInfoB.package.meta,
			          target: '../foobar',
			        \});
			
			        expect(info.absPath).toMatchFilePath('resolver-test_b/sub/subindex.js\$');
			      \});
			
			      it('should resolve a file being in a package with browser fields 3', () => \{
			        const info = resolveModule(\{
			          buildTarget: 'browser',
			          filePath: __filename,
			
			          packageMeta: packageInfoB.package.meta,
			          target: 'resolver-test_b/foobar',
			        \});
			
			        expect(info.package.targetAbsPath).toMatchFilePath('resolver-test_b/sub/subindex.js\$');
			
			        expect(info.package.targetFuseBoxPath).toEqual('sub/subindex.js');
			      \});
			
			      it('should replace the file with an empty package', () => \{
			        const info = resolveModule(\{
			          buildTarget: 'browser',
			          filePath: packageInfoB.package.targetAbsPath,
			
			          modules: [customModules],
			          packageMeta: packageInfoB.package.meta,
			          target: 'oops',
			        \});
			
			        expect(info.package.meta.name).toEqual('fuse-empty-package');
			        expect(info.package.targetAbsPath).toMatchFilePath('cases/_modules/fuse-empty-package/index.js\$');
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\resolver\\__tests__\\resolver.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(27)
    });
    it('fuse-box_fuse-box\\src\\resolver\\__tests__\\shared.test.ts', () => {
        const sourceCode = `
			import \{ getFolderEntryPointFromPackageJSON \} from '../shared';
			
			describe('shared functions', () => \{
			  describe('getFolderEntryPointFromPackageJSON', () => \{
			    it('Should return brwoser field', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{ json: \{ browser: 'foo.js' \}, isBrowserBuild: true \});
			      expect(res).toEqual('foo.js');
			    \});
			
			    it('Should module despite having brwoser', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{ json: \{ browser: 'foo.js', module: 'mod.js' \} \});
			      expect(res).toEqual('mod.js');
			    \});
			
			    it('Should return module', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{ json: \{ module: 'mod.js' \} \});
			      expect(res).toEqual('mod.js');
			    \});
			
			    it('Should return ts:main', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{ json: \{ 'ts:main': 'mod.ts' \} \});
			      expect(res).toEqual('mod.ts');
			    \});
			
			    it('Should return main', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{ json: \{ main: 'oi.js' \} \});
			      expect(res).toEqual('oi.js');
			    \});
			
			    it('Should return index without anything', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{ json: \{\} \});
			      expect(res).toEqual('index.js');
			    \});
			
			    it('Precedence test - all types & useLocalField: true - should return "local:main"', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{
			        useLocalField: true,
			        json: \{ main: 'main.js', 'ts:main': 'tsmain.ts', 'local:main': 'localmain.js', module: 'module.js' \},
			      \});
			      expect(res).toEqual('localmain.js');
			    \});
			
			    it('Precedence test - all types & useLocalField: false - should return "ts:main"', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{
			        json: \{ main: 'main.js', 'ts:main': 'tsmain.ts', 'local:main': 'localmain.js', module: 'module.js' \},
			      \});
			      expect(res).toEqual('tsmain.ts');
			    \});
			
			    it('Precedence test - missing ts:main - should return "module"', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{
			        json: \{ main: 'main.js', 'local:main': 'localmain.js', module: 'module.js' \},
			      \});
			      expect(res).toEqual('module.js');
			    \});
			
			    it('Precedence test - missing ts:main or module - should return "main"', () => \{
			      const res = getFolderEntryPointFromPackageJSON(\{
			        json: \{ main: 'main.js', 'local:main': 'localmain.js' \},
			      \});
			      expect(res).toEqual('main.js');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\resolver\\__tests__\\shared.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('fuse-box_fuse-box\\src\\sparky\\__tests__\\sparky.test.ts', () => {
        const sourceCode = `
			import '../../utils/test_utils';
			import \{ sparky \} from '../sparky';
			import \{ env \} from '../../env';
			import * as path from 'path';
			
			function mockSparkySrc(glob: string) \{
			  class SparkyContext \{\}
			  const \{ src \} = sparky<SparkyContext>(SparkyContext);
			  return src(glob);
			\}
			describe('Sparky test', () => \{
			  it('should give a list', async () => \{
			    const chain = mockSparkySrc(\`\$\{__dirname\}/stubs/case-a/**/**.*\`);
			
			    const list = await chain.exec();
			
			    expect(list).toHaveLength(3);
			  \});
			  it('should filter with function true', async () => \{
			    const chain = mockSparkySrc(\`\$\{__dirname\}/stubs/case-a/**/**.*\`);
			
			    const list = await chain.filter(() => true).exec();
			
			    expect(list).toHaveLength(3);
			  \});
			
			  it('should filter with function false', async () => \{
			    const chain = mockSparkySrc(\`\$\{__dirname\}/stubs/case-a/**/**.*\`);
			
			    const list = await chain.filter(() => false).exec();
			
			    expect(list).toHaveLength(0);
			  \});
			
			  it('should filter with function false 2', async () => \{
			    const chain = mockSparkySrc(\`\$\{__dirname\}/stubs/case-a/**/**.*\`);
			
			    const list = await chain.filter(file => file.includes('a.txt')).exec();
			
			    expect(list).toHaveLength(1);
			  \});
			
			  it('should filter with regex', async () => \{
			    const chain = mockSparkySrc(\`\$\{__dirname\}/stubs/case-a/**/**.*\`);
			
			    const list = await chain.filter(/a\\.txt\$/).exec();
			
			    expect(list).toHaveLength(1);
			  \});
			
			  it('should call 2 filters', async () => \{
			    const chain = mockSparkySrc(\`\$\{__dirname\}/stubs/case-a/**/**.*\`);
			    const list = await chain
			      .filter(/.*\\.(txt|md)\$/)
			      .filter(/foo\\.md\$/)
			      .exec();
			
			    expect(list).toHaveLength(1);
			  \});
			
			  it('should replace contents (with string 2 regex)', async () => \{
			    const chain = mockSparkySrc(\`\$\{__dirname\}/stubs/case-a/**/**.*\`);
			    await chain
			      .contentsOf('a.txt', str => \{
			        return 'some text';
			      \})
			      .exec();
			    const readFiles = chain['__scope']().readFiles;
			    expect(readFiles[Object.keys(readFiles)[0]]).toEqual('some text');
			  \});
			
			  it('should replace contents (with regex)', async () => \{
			    const chain = mockSparkySrc(\`\$\{__dirname\}/stubs/case-a/**/**.*\`);
			    await chain
			      .contentsOf(/a\\.txt/, str => \{
			        return 'some text';
			      \})
			      .exec();
			    const readFiles = chain['__scope']().readFiles;
			    expect(readFiles[Object.keys(readFiles)[0]]).toEqual('some text');
			  \});
			
			  it('sparky script path check 1 - base:"__test__/case1/"', async () => \{
			    //
			    // override ENV so we simulate script staretd somewhere else
			    // set to subfolder './case1
			    env.SCRIPT_PATH = path.normalize(\`\$\{__dirname\}/case1/\`);
			
			    class SparkyContext \{\}
			    const \{ src, rm \} = sparky<SparkyContext>(SparkyContext);
			
			    // remove old if any
			    rm('./dist');
			    await src(\`../stubs/**/**.*\`)
			      .dest('dist', 'stubs')
			      .exec();
			
			    // check if it have file
			    const chain = mockSparkySrc(\`dist/case-a/**/**.*\`);
			    const list = await chain
			      .filter(/.*\\.(txt|md)\$/) // check if filter works
			      .filter(/foo\\.md\$/)
			      .exec();
			    expect(list).toHaveLength(1);
			
			    // cleanup and test
			    rm('dist');
			    const chain2 = mockSparkySrc(\`dist/case-a/**/**.*\`);
			    const list2 = await chain2
			      .filter(/.*\\.(txt|md)\$/)
			      .filter(/foo\\.md\$/)
			      .exec();
			    expect(list2).toHaveLength(0);
			  \});
			
			  it('sparky script path check 2 - base:"__test__/"', async () => \{
			    // override ENV so we simulate script staretd somewhere else
			    // use current script path
			    env.SCRIPT_PATH = path.normalize(\`\$\{__dirname\}\`);
			
			    class SparkyContext \{\}
			    const \{ src, rm \} = sparky<SparkyContext>(SparkyContext);
			
			    // remove old if any
			    rm('./case1/dist');
			    await src(\`./stubs/**/**.*\`) // check if filter works
			      .dest('case1/dist', 'stubs')
			      .exec();
			
			    const chain = mockSparkySrc(\`./case1/dist/case-a/**/**.*\`);
			    const list = await chain
			      .filter(/.*\\.(txt|md)\$/)
			      .filter(/foo\\.md\$/)
			      .exec();
			    expect(list).toHaveLength(1);
			
			    // cleanup and test
			    rm('./case1/dist');
			    const chain2 = mockSparkySrc(\`./case1/dist/case-a/**/**.*\`);
			    const list2 = await chain2
			      .filter(/.*\\.(txt|md)\$/)
			      .filter(/foo\\.md\$/)
			      .exec();
			    expect(list2).toHaveLength(0);
			  \});
			
			  it('sparky script path check 3 - base:"__test__/" with parent path on checks', async () => \{
			    // override ENV so we simulate script staretd somewhere else
			    // use current script file path
			    env.SCRIPT_PATH = path.normalize(\`\$\{__dirname\}\`);
			
			    class SparkyContext \{\}
			    const \{ src, rm \} = sparky<SparkyContext>(SparkyContext);
			
			    // remove old if any
			    rm('./case1/dist');
			    await src(\`./stubs/**/**.*\`) // check if filter works
			      .dest('case1/dist', 'stubs')
			      .exec();
			
			    // go crazy and change paths of script again tp parent folder
			    // can user also do this ?
			    env.SCRIPT_PATH = path.normalize(path.resolve(__dirname, '../'));
			
			    const chain = mockSparkySrc(\`__tests__/case1/dist/case-a/**/**.*\`);
			    const list = await chain
			      .filter(/.*\\.(txt|md)\$/)
			      .filter(/foo\\.md\$/)
			      .exec();
			    expect(list).toHaveLength(1);
			
			    // cleanup and test
			    rm('__tests__/case1/dist');
			    const chain2 = mockSparkySrc(\`__tests__/case1/dist/case-a/**/**.*\`);
			    const list2 = await chain2
			      .filter(/.*\\.(txt|md)\$/)
			      .filter(/foo\\.md\$/)
			      .exec();
			    expect(list2).toHaveLength(0);
			  \});
			
			  it('sparky script path check 3 - bump check', async () => \{
			    // override ENV so we simulate script staretd somewhere else
			    // use ./case1
			    env.SCRIPT_PATH = path.normalize(\`\$\{__dirname\}/case1\`);
			
			    class SparkyContext \{\}
			    const \{ src, rm \} = sparky<SparkyContext>(SparkyContext);
			
			    // remove old if any
			    rm('dist');
			
			    // make copy, so we dont modify original
			    await src('pack.json')
			      .dest('dist/', env.SCRIPT_PATH)
			      .exec();
			
			    // bump and make copy like build does
			    await src('dist/pack.json')
			      .bumpVersion('dist/pack.json', \{ type: 'next' \})
			      .write()
			      .dest('dist/modified', 'dist')
			      .exec();
			
			    // get both files and check version
			    const chain = mockSparkySrc(\`dist/**/**.*\`);
			    const list = await chain
			      .contentsOf(/pack\\.json\$/, str => \{
			        const json = JSON.parse(str);
			        expect(json.version).toEqual('4.0.0-next.137');
			        return json;
			      \})
			      .exec();
			    expect(list).toHaveLength(2);
			
			    // cleanup and test
			    rm('dist');
			    const chain2 = mockSparkySrc(\`dist/**/**.*\`);
			    const list2 = await chain2.filter(/pack\\.json\$/).exec();
			    expect(list2).toHaveLength(0);
			  \});
			
			  // it('should filter with function false', async () => \{
			  //   const \{ src \} = mockSparky();
			  //   const list = await src(\`\$\{__dirname\}/../**/**.*\`)
			  //     .filter(file => \{
			  //       if (file.includes('sparky.ts')) \{
			  //         return true;
			  //       \}
			  //     \})
			  //     .exec();
			
			  //   expect(list).toHaveLength(1);
			  //   expect(list[0]).toMatchFilePath('sparky/sparky.ts');
			  // \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\sparky\\__tests__\\sparky.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('fuse-box_fuse-box\\src\\stylesheet\\__tests__\\cssParser.test.ts', () => {
        const sourceCode = `
			const \{ mockWriteFile \} = require('../../utils/test_utils');
			const fileMock = mockWriteFile();
			import * as path from 'path';
			import \{ readCSSImports, cssParser, CCSExtractorContext, ICSSDependencyExtractorProps \} from '../cssParser';
			
			describe('CSS dependency extractor test', () => \{
			  describe('readCSSImports', () => \{
			    it('should import 1', () => \{
			      const res = readCSSImports(\`@import "foo"\`);
			      expect(res).toEqual(['foo']);
			    \});
			
			    it('should import 2', () => \{
			      const res = readCSSImports(\`@import 'foo'\`);
			      expect(res).toEqual(['foo']);
			    \});
			
			    it('should import multiline', () => \{
			      const res = readCSSImports(\`
			      @import 'foo'
			      \`);
			      expect(res).toEqual(['foo']);
			    \});
			
			    it('should import 2 times', () => \{
			      const res = readCSSImports(\`
			
			        @import 'foo'
			        @import 'bar'
			      \`);
			      expect(res).toEqual(['foo', 'bar']);
			    \});
			  \});
			
			  describe('collectDependencies', () => \{
			    beforeEach(async () => fileMock.flush());
			    afterAll(() => \{
			      fileMock.unmock();
			    \});
			
			    function createMock(props: ICSSDependencyExtractorProps, entryContents: string): CCSExtractorContext \{
			      const root = path.join(__dirname, 'cases');
			      const entryAbsPath = path.join(root, 'foo.scss');
			      fileMock.addFile(entryAbsPath, entryContents);
			      fileMock.addFile(path.join(root, 'bar.scss'));
			      fileMock.addFile(path.join(root, 'woo.scss'));
			      return cssParser(\{ ...props, entryAbsPath, entryContents, collectDependencies: true \});
			    \}
			    it('should find without config on a specific extension', () => \{
			      const output = createMock(\{\}, \`@import "bar.scss"\`);
			      expect(output.files).toHaveLength(1);
			      expect(output.files[0]).toMatchFilePath('cases/bar.scss\$');
			    \});
			
			    it('should find with suggested extension', () => \{
			      const output = createMock(
			        \{
			          tryExtensions: ['.scss'],
			        \},
			        \`@import "bar"\`,
			      );
			      expect(output.files).toHaveLength(1);
			      expect(output.files[0]).toMatchFilePath('cases/bar.scss\$');
			    \});
			
			    it('should not find with suggested extension', () => \{
			      const output = createMock(
			        \{
			          tryExtensions: ['.foo'],
			        \},
			        \`@import "bar"\`,
			      );
			      expect(output.files).toHaveLength(0);
			    \});
			
			    it('should multiline find with suggested extension', () => \{
			      const output = createMock(
			        \{
			          tryExtensions: ['.scss'],
			        \},
			        \`
			          @import "bar"
			          @import "woo"
			        \`,
			      );
			      expect(output.files).toHaveLength(2);
			      expect(output.files[0]).toMatchFilePath('cases/bar.scss\$');
			      expect(output.files[1]).toMatchFilePath('cases/woo.scss\$');
			    \});
			
			    it('should find recursively', () => \{
			      const root = path.join(__dirname, 'cases');
			      const entryAbsPath = path.join(root, 'foo.scss');
			      const entryContents = '@import "bar"';
			      fileMock.addFile(entryAbsPath, entryContents);
			      fileMock.addFile(path.join(root, 'bar.scss'), '@import "woo"');
			      fileMock.addFile(path.join(root, 'woo.scss'), 'some');
			
			      const output = cssParser(\{ entryAbsPath, tryExtensions: ['.scss'], entryContents, collectDependencies: true \});
			
			      expect(output.files[0]).toMatchFilePath('cases/bar.scss\$');
			      expect(output.files[1]).toMatchFilePath('cases/woo.scss\$');
			    \});
			
			    it('should find recursively (missing file)', () => \{
			      const root = path.join(__dirname, 'cases');
			      const entryAbsPath = path.join(root, 'foo.scss');
			      const entryContents = '@import "bar"';
			      fileMock.addFile(entryAbsPath, entryContents);
			      fileMock.addFile(path.join(root, 'bar.scss'), '@import "woo"');
			
			      const output = cssParser(\{ entryAbsPath, tryExtensions: ['.scss'], entryContents, collectDependencies: true \});
			      expect(output.files).toHaveLength(1);
			      expect(output.files[0]).toMatchFilePath('cases/bar.scss\$');
			    \});
			
			    it('should find recursively (self reference)', () => \{
			      const root = path.join(__dirname, 'cases');
			      const entryAbsPath = path.join(root, 'foo.scss');
			      const entryContents = '@import "bar"';
			      fileMock.addFile(entryAbsPath, entryContents);
			      fileMock.addFile(path.join(root, 'bar.scss'), \`@import "bar"\`);
			
			      const output = cssParser(\{ entryAbsPath, tryExtensions: ['.scss'], entryContents, collectDependencies: true \});
			      expect(output.files).toHaveLength(1);
			      expect(output.files[0]).toMatchFilePath('cases/bar.scss\$');
			    \});
			
			    it('should respect sass style 1', () => \{
			      const root = path.join(__dirname, 'cases');
			      const entryAbsPath = path.join(root, 'foo.scss');
			      const entryContents = '@import "bar"';
			      fileMock.addFile(entryAbsPath, entryContents);
			      fileMock.addFile(path.join(root, '_bar.scss'), ' ');
			
			      const output = cssParser(\{
			        entryAbsPath,
			        entryContents,
			        tryExtensions: ['.scss'],
			        sassStyle: true,
			        collectDependencies: true,
			      \});
			      expect(output.files).toHaveLength(1);
			      expect(output.files[0]).toMatchFilePath('cases/_bar.scss\$');
			    \});
			
			    it('should respect sass style 2', () => \{
			      const root = path.join(__dirname, 'cases');
			      const entryAbsPath = path.join(root, 'foo.scss');
			      const entryContents = '@import "_bar"';
			      fileMock.addFile(entryAbsPath, entryContents);
			      fileMock.addFile(path.join(root, '_bar.scss'), ' ');
			
			      const output = cssParser(\{
			        entryAbsPath,
			        entryContents,
			        tryExtensions: ['.scss'],
			        sassStyle: true,
			        collectDependencies: true,
			      \});
			      expect(output.files).toHaveLength(1);
			      expect(output.files[0]).toMatchFilePath('cases/_bar.scss\$');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\stylesheet\\__tests__\\cssParser.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(13)
    });
    it('fuse-box_fuse-box\\src\\stylesheet\\__tests__\\cssResolveURL.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ createContext \} from '../../core/context';
			import \{ distWriter \} from '../../output/distWriter';
			import \{ createTestContext, mockWriteFile \} from '../../utils/test_utils';
			import \{ cssResolveURL \} from '../cssResolveURL';
			
			const fileMock = mockWriteFile();
			
			describe('CSS Resolve URL test', () => \{
			  afterAll(() => fileMock.unmock());
			  beforeEach(() => fileMock.flush());
			
			  it('should resolve image 1', () => \{
			    fileMock.addFile(path.join(__dirname, 'hello.png'), '');
			
			    const ctx = createTestContext();
			    ctx.writer = distWriter(\{ root: __dirname \});
			    const props = \{
			      contents: \`url("./hello.png")\`,
			      ctx: ctx,
			      filePath: __filename,
			      options: \{\},
			    \};
			    const res = cssResolveURL(props);
			    expect(res.contents).toContain(\`url("/resources\`);
			  \});
			
			  it('should not resolve svg filter', () => \{
			    fileMock.addFile(path.join(__dirname, 'hello.png'), '');
			    const ctx = createTestContext();
			    const props = \{
			      contents: \`url(#svgFilter)\`,
			      ctx: ctx,
			      filePath: __filename,
			      options: \{\},
			    \};
			    const res = cssResolveURL(props);
			    expect(res.contents).toEqual(\`url(#svgFilter)\`);
			  \});
			
			  it('should not resolve svg filter ( keep formatting 1)', () => \{
			    fileMock.addFile(path.join(__dirname, 'hello.png'), '');
			    const ctx = createTestContext();
			    const props = \{
			      contents: \`url('#svgFilter')\`,
			      ctx: ctx,
			      filePath: __filename,
			      options: \{\},
			    \};
			    const res = cssResolveURL(props);
			    expect(res.contents).toEqual(\`url('#svgFilter')\`);
			  \});
			
			  it('should not resolve svg filter ( keep formatting 1)', () => \{
			    fileMock.addFile(path.join(__dirname, 'hello.png'), '');
			    const ctx = createTestContext();
			    const props = \{
			      contents: \`url("#svgFilter")\`,
			      ctx: ctx,
			      filePath: __filename,
			      options: \{\},
			    \};
			    const res = cssResolveURL(props);
			    expect(res.contents).toEqual(\`url("#svgFilter")\`);
			  \});
			
			  it('should keep http references', () => \{
			    fileMock.addFile(path.join(__dirname, 'hello.png'), '');
			    const ctx = createTestContext();
			    const props = \{
			      contents: \`url(http://foo.com/hello.png)\`,
			      ctx: ctx,
			      filePath: __filename,
			      options: \{\},
			    \};
			    const res = cssResolveURL(props);
			    expect(res.contents).toContain(\`url(http://foo.com/hello.png\`);
			  \});
			
			  it('should keep mixin', () => \{
			    fileMock.addFile(path.join(__dirname, 'hello.png'), '');
			    const ctx = createTestContext();
			    const props = \{
			      contents: \`
			      @mixin svg(\$url) \{
			        mask-image: url(\$url) no-repeat 100% 100%;
			      \}
			
			      \`,
			      ctx: ctx,
			      filePath: __filename,
			      options: \{\},
			    \};
			    const res = cssResolveURL(props);
			    expect(res.contents).toContain(\`url(\$url)\`);
			  \});
			
			  it('should skip and data:', () => \{
			    fileMock.addFile(path.join(__dirname, 'hello.png'), '');
			    const ctx = createTestContext();
			    const props = \{
			      contents: \`url('data:image/png;base64,iVBO')\`,
			      ctx: ctx,
			      filePath: __filename,
			      options: \{\},
			    \};
			
			    const res = cssResolveURL(props);
			    expect(res.contents).toEqual(\`url('data:image/png;base64,iVBO')\`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\stylesheet\\__tests__\\cssResolveURL.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('fuse-box_fuse-box\\src\\stylesheet\\__tests__\\cssSourceMap.test.ts', () => {
        const sourceCode = `
			import * as path from 'path';
			import \{ env \} from '../../env';
			import \{ mockModule \} from '../../utils/test_utils';
			import \{ alignCSSSourceMap \} from '../cssSourceMap';
			describe('css source map test', () => \{
			  function mockSources(list: Array<string>) \{
			    const json = \{ sources: list \};
			    return new Buffer(JSON.stringify(json));
			  \}
			  it('should not parse if not valid', () => \{
			    const \{ ctx, module \} = mockModule(\{
			      config: \{ homeDir: __dirname \},
			      moduleProps: \{ absPath: path.join(__dirname, 'index.ts') \},
			      packageProps: \{ isDefaultPackage: true \},
			    \});
			
			    const res = alignCSSSourceMap(\{ ctx, module, sourceMap: new Buffer('\{\}') \});
			
			    expect(JSON.parse(res)).toEqual(\{\});
			  \});
			
			  it('should parse default package source', () => \{
			    const \{ ctx, module \} = mockModule(\{
			      config: \{ homeDir: __dirname \},
			      moduleProps: \{ absPath: path.join(__dirname, 'index.ts') \},
			      packageProps: \{ isDefaultPackage: true \},
			    \});
			
			    const res = alignCSSSourceMap(\{ ctx, module, sourceMap: mockSources(['foo.scss']) \});
			
			    expect(JSON.parse(res)).toEqual(\{ sources: ['src/stylesheet/__tests__/foo.scss'] \});
			  \});
			
			  it('should parse node_module', () => \{
			    const \{ ctx, module, pkg \} = mockModule(\{
			      config: \{ homeDir: __dirname \},
			      moduleProps: \{ absPath: path.join(env.APP_ROOT, 'node_modules/foobar', 'index.ts') \},
			      packageProps: \{ isDefaultPackage: false \},
			    \});
			
			    pkg.meta.name = 'foobar';
			    pkg.meta.version = '1.0.0';
			    pkg.meta.packageRoot = path.join(env.APP_ROOT, 'node_modules/foobar');
			    const res = alignCSSSourceMap(\{ ctx, module, sourceMap: mockSources(['foo.scss']) \});
			
			    expect(JSON.parse(res)).toEqual(\{ sources: ['node_modules/foobar/foo.scss'] \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\stylesheet\\__tests__\\cssSourceMap.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('fuse-box_fuse-box\\src\\utils\\__tests__\\utils.test.ts', () => {
        const sourceCode = `
			import \{
			  path2Regex,
			  createRequireConst,
			  replaceExt,
			  extractFuseBoxPath,
			  makeFuseBoxPath,
			  ensurePublicExtension,
			  getExtension,
			  ensureFuseBoxPath,
			  joinFuseBoxPath,
			  createStringConst,
			  createVarString,
			  parseVersion,
			  beautifyBundleName,
			  path2RegexPattern,
			  excludeRedundantFolders,
			\} from '../utils';
			import \{ findUp \} from '../findUp';
			import \{ join \} from 'path';
			
			describe('utils', () => \{
			  describe('beautifyBundleName', () => \{
			    it('should beautifyBundleName 1', () => \{
			      const name = beautifyBundleName('foo/bar/oi.js', 20);
			      expect(name).toEqual('foo-bar-oi');
			    \});
			    it('should beautifyBundleName 2', () => \{
			      const name = beautifyBundleName('oi.js', 20);
			      expect(name).toEqual('oi');
			    \});
			    it('should beautifyBundleName 3', () => \{
			      const name = beautifyBundleName('./not-found-page/not-found-page/not-found-page.module', 20);
			      expect(name).toEqual('not-found-page');
			    \});
			    it('should beautifyBundleName 4', () => \{
			      const name = beautifyBundleName('./not-found-page/not-found-page/not-found-page.module');
			      expect(name).toEqual('not-found-page-not-found-page-not-found-page');
			    \});
			
			    it('should beautifyBundleName 5', () => \{
			      const name = beautifyBundleName('./not-found-page/not-found-page/not-found-page.module', 10);
			      expect(name).toEqual('not-found-page');
			    \});
			
			    it('should beautifyBundleName 6', () => \{
			      const name = beautifyBundleName('./this/path/is/wild/right/ok.module');
			      expect(name).toEqual('this-path-is-wild-right-ok');
			    \});
			
			    it('should beautifyBundleName 6', () => \{
			      const name = beautifyBundleName('./site/not-found/not-found.module');
			      expect(name).toEqual('site-not-found-not-found');
			    \});
			
			    it('should beautifyBundleName 6', () => \{
			      const name = beautifyBundleName('ngc/browser/site/not-found/not-found.module.js');
			      expect(name).toEqual('ngc-browser-site-not-found-not-found.module');
			    \});
			
			    it('should beautifyBundleName 7', () => \{
			      const name = beautifyBundleName('./ngc/browser/site/not-found/not-found.module.js');
			      expect(name).toEqual('ngc-browser-site-not-found-not-found.module');
			    \});
			  \});
			  describe('parseVersion', () => \{
			    it('should parse with v', () => \{
			      const res = parseVersion('v11.13.0');
			
			      expect(res).toEqual([11, 13, 0]);
			    \});
			
			    it('should parse without v', () => \{
			      const res = parseVersion('11.13.0');
			      expect(res).toEqual([11, 13, 0]);
			    \});
			  \});
			  describe('path2Regex', () => \{
			    it('should convert', () => \{
			      const a = path2Regex('foo/bar.js');
			      expect(a).toEqual(/foo\\/bar.js/);
			    \});
			
			    it('should be cached', () => \{
			      const a = path2Regex('foo/bar.js');
			      expect(a).toEqual(/foo\\/bar.js/);
			    \});
			  \});
			
			  describe('createStringConst', () => \{
			    it('should create createStringConst', () => \{
			      const str = createStringConst('foo', 'b\\'a"r');
			      expect(str).toEqual(\`const foo = "b'a\\\\"r";\`);
			    \});
			  \});
			
			  describe('createVarString', () => \{
			    it('should create createVarConst', () => \{
			      const str = createVarString('foo', 'b\\'a"r');
			      expect(str).toEqual(\`var foo = "b'a\\\\"r";\`);
			    \});
			  \});
			
			  describe('createRequireConst', () => \{
			    it('should create a default statement', () => \{
			      expect(createRequireConst('foo')).toEqual('var foo = require("foo");');
			    \});
			
			    it('should create a statement', () => \{
			      expect(createRequireConst('foo', 'bar')).toEqual('var bar = require("foo");');
			    \});
			  \});
			
			  describe('replaceExt', () => \{
			    it('should be ok with empty value', () => \{
			      expect(replaceExt('', '.js')).toEqual('');
			    \});
			
			    it('should replace existing ext', () => \{
			      expect(replaceExt('foo.js', '.ts')).toEqual('foo.ts');
			    \});
			
			    it('should add ext', () => \{
			      expect(replaceExt('foo', '.ts')).toEqual('foo.ts');
			    \});
			  \});
			
			  describe('extractFuseBoxPath', () => \{
			    it('extractFuseBoxPath', () => \{
			      expect(extractFuseBoxPath('/home/my/dir', '/home/my/dir/foo/bar.ts')).toEqual('foo/bar.ts');
			    \});
			  \});
			
			  describe('makeFuseBoxPath', () => \{
			    it('makeFuseBoxPath', () => \{
			      expect(makeFuseBoxPath('/home/my/dir', '/home/my/dir/foo/bar.ts')).toEqual('foo/bar.js');
			    \});
			  \});
			
			  describe('ensurePublicExtension', () => \{
			    it('ensurePublicExtension', () => \{
			      expect(ensurePublicExtension('bar.ts')).toEqual('bar.js');
			      expect(ensurePublicExtension('bar.tsx')).toEqual('bar.jsx');
			    \});
			  \});
			
			  describe('getExtension', () => \{
			    it('getExtension', () => \{
			      expect(getExtension('bar.ts')).toEqual('.ts');
			    \});
			  \});
			
			  describe('ensureFuseBoxPath', () => \{
			    it('ensureFuseBoxPath', () => \{
			      expect(ensureFuseBoxPath(\`windows\\\\bar.ts\`)).toEqual('windows/bar.ts');
			    \});
			  \});
			
			  describe('joinFuseBoxPath', () => \{
			    it('joinFuseBoxPath', () => \{
			      expect(joinFuseBoxPath(\`windows\\\\bar\`, 'foo/', 'oi')).toEqual('windows/bar/foo/oi');
			      expect(joinFuseBoxPath('http://sdf', 'bar')).toEqual('http://sdf/bar');
			
			      //expect(joinFuseBoxPath(\`windows\\\\bar\`, 'foo/', 'oi')).toEqual('windows/bar.ts');
			    \});
			  \});
			
			  describe('path2RegexPattern', () => \{
			    it('ensureFuseBoxPath - check \\\\ vs /', () => \{
			      expect(path2RegexPattern(\`users\\\\documents\\\\bar.ts\`).test('users/documents/bar.ts')).toEqual(true);
			    \});
			
			    it('ensureFuseBoxPath - check / vs \\\\', () => \{
			      expect(path2RegexPattern(\`users/documents/bar.ts\`).test('users\\\\documents\\\\bar.ts')).toEqual(true);
			    \});
			
			    it('ensureFuseBoxPath - check single dir using /', () => \{
			      expect(path2RegexPattern(\`/documents/\`).test('users\\\\documents\\\\bar.ts')).toEqual(true);
			    \});
			
			    it('ensureFuseBoxPath - check single dir using \\\\', () => \{
			      expect(path2RegexPattern(\`\\\\documents\\\\\`).test('users/documents/bar.ts')).toEqual(true);
			    \});
			  \});
			
			  // These tests will fail if this test file is moved.
			  describe('findUp', () => \{
			    const currentDir = __dirname;
			    const target = "package.json";
			    const projectRoot = join(currentDir, "../../../");
			    const targetPath = join(projectRoot, target);
			
			    it('findUp - target in start dir', () => \{
			      expect(findUp(currentDir, target)).toEqual(targetPath);
			    \});
			
			    it('findUp - target in parent of start dir', () => \{
			      expect(findUp(currentDir, target)).toEqual(targetPath);
			    \});
			
			    it('findUp - target at inclusive boundary', () => \{
			      expect(findUp(currentDir, target, \{
			        boundary: projectRoot,
			        inclusive: true,
			      \})).toEqual(targetPath);
			    \});
			
			    it('findUp - target at exclusive boundary', () => \{
			      expect(findUp(currentDir, target, \{
			        boundary: projectRoot,
			        inclusive: false,
			      \})).toEqual(null);
			    \});
			  \})
			
			  describe('excludeRedundantFolders - removes redundant root folders', () => \{
			    const input: string[] = [
			      \`/one/two/three\`, // <-- exclude because of /one/two
			      \`/one/two\`,
			      \`/three/four/five/..\`,
			      \`/three/four/size\`, // <-- exclude because of /three/four/five/..
			    ];
			    const actual = excludeRedundantFolders(input);
			    const expected = [
			      '/one/two',
			      '/three/four',
			    ]
			    expect(actual).toEqual(expected);
			  \})
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\utils\\__tests__\\utils.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(34)
    });
    it('fuse-box_fuse-box\\src\\webIndex\\__tests__\\webIndex.test.ts', () => {
        const sourceCode = `
			import \{ join \} from 'path';
			import \{ env \} from '../../env';
			import \{ FuseBoxLogAdapter \} from '../../fuseLog/FuseBoxLogAdapter';
			import \{ createTestContext, mockWriteFile \} from '../../utils/test_utils';
			import \{ getEssentialWebIndexParams, replaceWebIndexStrings \} from '../webIndex';
			const fileMock = mockWriteFile();
			
			const WEBINDEX_DEFAULT_TEMPLATE = \`<!DOCTYPE html>
			<html lang="en">
			  <head>
			    <meta charset="UTF-8" />
			    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
			    <title></title>
			    \$css
			  </head>
			  <body>
			    \$bundles
			  </body>
			</html>
			
			\`;
			
			describe('WebIndex test', () => \{
			  describe('replaceWebIndexStrings', () => \{
			    it('should replace in one line', () => \{
			      const result = replaceWebIndexStrings(\`\$name\`, \{ name: 'foo' \});
			      expect(result).toEqual('foo');
			    \});
			
			    it('should replace in 2 lines', () => \{
			      const result = replaceWebIndexStrings(
			        \`
			        \$name
			        \$bar
			      \`,
			        \{ bar: 'bar', name: 'foo' \},
			      );
			      expect(result).toEqual('\\n        foo\\n        bar\\n      ');
			    \});
			
			    it('should replace the same items', () => \{
			      const result = replaceWebIndexStrings(\`\$name \$name\`, \{ name: 'foo' \});
			      expect(result).toEqual('foo foo');
			    \});
			
			    it('should replace not found keys with empty string', () => \{
			      const result = replaceWebIndexStrings(\`\$name \$bar\`, \{ name: 'foo' \});
			      expect(result).toEqual('foo ');
			    \});
			
			    it('should treat an object', () => \{
			      const result = replaceWebIndexStrings(\`\$name\`, \{ name: \{ foo: 'bar' \} \});
			      expect(result).toEqual(\`\{"foo":"bar"\}\`);
			    \});
			  \});
			
			  describe('webindex', () => \{
			    beforeEach(() => \{
			      fileMock.flush();
			      fileMock.addFile(join(env.FUSE_MODULES, 'web-index-default-template/template.html'), WEBINDEX_DEFAULT_TEMPLATE);
			    \});
			    afterAll(() => \{
			      fileMock.unmock();
			    \});
			
			    it('should be disabled', () => \{
			      const ctx = createTestContext(\{ webIndex: false \});
			      expect(ctx.webIndex.isDisabled).toBe(true);
			    \});
			
			    it('should throw NO error if file not found, but use default template', async () => \{
			      const opts = getEssentialWebIndexParams(\{ template: 'foo' \}, new FuseBoxLogAdapter(\{\}));
			      expect(opts.templateContent).toEqual(WEBINDEX_DEFAULT_TEMPLATE);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\webIndex\\__tests__\\webIndex.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('fuse-box_fuse-box\\src\\__tests__\\codeSplitting.integration.test.ts', () => {
        const sourceCode = `
			import \{ EnvironmentType \} from '../config/EnvironmentType';
			import \{ pluginSass \} from '../plugins/core/plugin_sass';
			import \{ runBrowserTest, runServerTest \} from '../testUtils/integrationHelper';
			describe('Code splitting integration test', () => \{
			  describe('JS + CSS code splitting', () => \{
			    describe('Browser', () => \{
			      it('should load a file + css', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            export async function test()\{
			              return import("./foo")
			            \}
			          \`,
			            'foo.ts': \`
			              import "./foo.css";
			              const foo = 'foo_module'
			              export \{ foo \};
			            \`,
			            'foo.css': \`body \{ color: red\}\`,
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        const entry = scope.entry();
			
			        expect(scope.\$loadedCSSFiles).toHaveLength(0);
			        const result = await entry.test();
			        expect(scope.\$loadedCSSFiles).toHaveLength(1);
			        expect(result.foo).toEqual('foo_module');
			      \});
			
			      it('should load a file + css module', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          config: \{
			            plugins: [pluginSass('foo.scss', \{ asModule: \{\} \})],
			          \},
			          files: \{
			            'index.ts': \`
			            export async function test()\{
			              return import("./foo")
			            \}
			          \`,
			            'foo.ts': \`
			              import * as foo from "./foo.scss";
			              export \{ foo \};
			            \`,
			            'foo.scss': \`.item \{ color: red\}\`,
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        const entry = scope.entry();
			
			        expect(scope.\$loadedCSSFiles).toHaveLength(0);
			        const result = await entry.test();
			        expect(scope.\$loadedCSSFiles).toHaveLength(1);
			        expect(result.foo.item).toBeTruthy();
			      \});
			    \});
			
			    describe('Server', () => \{
			      it('should load a JS module and ignore the css', async () => \{
			        const env = await runServerTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            export async function test()\{
			              return import("./foo")
			            \}
			          \`,
			            'foo.ts': \`
			              import "./foo.css";
			              const foo = 'foo_module'
			              export \{ foo \};
			            \`,
			            'foo.css': \`body \{ color: red\}\`,
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        const entry = scope.entry();
			        const result = await entry.test();
			        expect(result.foo).toEqual('foo_module');
			      \});
			
			      it('should load a file + css module', async () => \{
			        const env = await runServerTest(\{
			          env: EnvironmentType.PRODUCTION,
			          config: \{
			            plugins: [pluginSass('foo.scss', \{ asModule: \{\} \})],
			          \},
			          files: \{
			            'index.ts': \`
			            export async function test()\{
			              return import("./foo")
			            \}
			          \`,
			            'foo.ts': \`
			              import * as foo from "./foo.scss";
			              export \{ foo \};
			            \`,
			            'foo.scss': \`.item \{ color: red\}\`,
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        const entry = scope.entry();
			
			        const result = await entry.test();
			
			        expect(result.foo.item).toBeTruthy();
			      \});
			    \});
			  \});
			  describe('javascript code splitting', () => \{
			    describe('Browser', () => \{
			      it('should load a file', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            export async function test()\{
			              return import("./foo")
			            \}
			          \`,
			            'foo.ts': \`
			              const foo = 'foo_module'
			              export \{foo\};
			            \`,
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        const entry = scope.entry();
			
			        const result = await entry.test();
			
			        expect(result.foo).toEqual('foo_module');
			      \});
			
			      it('should load 2 files', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            export async function test()\{
			              const \{foo\} = await import("./foo")
			              const \{bar\} = await import("./bar")
			              return [foo, bar]
			            \}
			          \`,
			            'foo.ts': \`
			              const foo = 'foo_module'
			              export \{foo\};
			            \`,
			            'bar.ts': \`
			              const bar = 'bar_module'
			              export \{bar\};
			            \`,
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        const entry = scope.entry();
			
			        const result = await entry.test();
			
			        expect(result).toEqual(['foo_module', 'bar_module']);
			      \});
			    \});
			
			    describe('Server', () => \{
			      it('should load a file', async () => \{
			        const env = await runServerTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            export async function test()\{
			              return import("./foo")
			            \}
			          \`,
			            'foo.ts': \`
			              const foo = 'foo_module'
			              export \{foo\};
			            \`,
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        const entry = scope.entry();
			
			        const result = await entry.test();
			
			        expect(result.foo).toEqual('foo_module');
			      \});
			
			      it('should load 2 files', async () => \{
			        const env = await runServerTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            export async function test()\{
			              const \{foo\} = await import("./foo")
			              const \{bar\} = await import("./bar")
			              return [foo, bar]
			            \}
			          \`,
			            'foo.ts': \`
			              const foo = 'foo_module'
			              export \{foo\};
			            \`,
			            'bar.ts': \`
			              const bar = 'bar_module'
			              export \{bar\};
			            \`,
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        const entry = scope.entry();
			
			        const result = await entry.test();
			
			        expect(result).toEqual(['foo_module', 'bar_module']);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\__tests__\\codeSplitting.integration.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('fuse-box_fuse-box\\src\\__tests__\\css.integration.test.ts', () => {
        const sourceCode = `
			import \{ EnvironmentType \} from '../config/EnvironmentType';
			import \{ pluginCSS \} from '../plugins/core/plugin_css';
			import \{ pluginSass \} from '../plugins/core/plugin_sass';
			import \{ runBrowserTest, runServerTest \} from '../testUtils/integrationHelper';
			import \{ readFile \} from '../utils/utils';
			
			describe('CSS integration test', () => \{
			  describe('CSS', () => \{
			    describe('Browser', () => \{
			      it('should have js css during development', async () => \{
			        const css = 'body \{ color: red \}';
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.DEVELOPMENT,
			          files: \{ 'index.ts': \`import "./main.css"\`, 'main.css': css \},
			          config: \{
			            target: 'browser',
			          \},
			        \});
			
			        const scope = await env.response.eval();
			        expect(scope.\$createdDOMElements).toHaveLength(1);
			        expect(scope.\$createdDOMElements[0].innerHTML).toEqual(css);
			      \});
			
			      it('should extract css for production', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{ 'index.ts': \`import "./main.css"\`, 'main.css': 'body \{ color: red \}' \},
			          config: \{
			            target: 'browser',
			          \},
			        \});
			
			        const r = await env.response.eval();
			
			        const dist = env.workspace.getDist();
			
			        const app = dist.getAppContents();
			        expect(app).not.toMatch(/cssHandler/); // should not include dev css
			        expect(dist.findFile(/\\.css\$/)).toBeTruthy();
			        expect(r.entry()).toBeTruthy();
			      \});
			
			      it('should extract 2 css files for production', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            import "./main.css";
			            import "./second.css"
			          \`,
			            'main.css': 'body \{ color: #000010 \}',
			            'second.css': 'h1 \{ color: #00c011 \}',
			          \},
			          config: \{
			            target: 'browser',
			          \},
			        \});
			
			        await env.response.eval();
			
			        const dist = env.workspace.getDist();
			
			        const app = dist.getAppContents();
			        expect(app).not.toMatch(/cssHandler/); // should not include dev css
			        const css = readFile(dist.findFile(/\\.css\$/));
			        expect(css).toEqual('body\{color:#000010\}h1\{color:#00c011\}');
			      \});
			
			      it('should extract css for production (require) top level', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            console.log(1)
			            require("./main.css")
			          \`,
			            'main.css': 'body \{ color: red \}',
			          \},
			          config: \{
			            target: 'browser',
			          \},
			        \});
			
			        const r = await env.response.eval();
			
			        const dist = env.workspace.getDist();
			
			        const app = dist.getAppContents();
			        expect(app).not.toMatch(/cssHandler/); // should not include dev css
			        expect(dist.findFile(/\\.css\$/)).toBeTruthy();
			        expect(r.entry()).toBeTruthy();
			      \});
			
			      it('should extract css for production (require) nested', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            function foo()\{
			              require("./main.css")
			            \}
			          \`,
			            'main.css': 'body \{ color: red \}',
			          \},
			          config: \{
			            target: 'browser',
			          \},
			        \});
			
			        const r = await env.response.eval();
			
			        const dist = env.workspace.getDist();
			
			        const app = dist.getAppContents();
			        expect(app).not.toMatch(/cssHandler/); // should not include dev css
			        expect(dist.findFile(/\\.css\$/)).toBeTruthy();
			        expect(r.entry()).toBeTruthy();
			      \});
			
			      it('should ignore development css (require)', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            function foo()\{
			              if ( process.env.NODE_ENV === "development")\{
			                require("./main.css")
			              \}
			            \}
			          \`,
			            'main.css': 'body \{ color: red \}',
			          \},
			          config: \{
			            target: 'browser',
			          \},
			        \});
			
			        const r = await env.response.eval();
			
			        const dist = env.workspace.getDist();
			
			        expect(dist.findFile(/\\.css\$/)).toBeFalsy();
			        expect(r.entry()).toBeTruthy();
			      \});
			
			      it('should work correctly with css modules', async () => \{
			        const env = await runBrowserTest(\{
			          env: EnvironmentType.PRODUCTION,
			          config: \{
			            plugins: [pluginSass('main.scss', \{ asModule: \{\} \})],
			          \},
			          files: \{
			            'index.ts': \`
			            import * as foo from "./main.scss"
			            export \{ foo \}
			          \`,
			            'main.scss': '.item \{ color: red \}',
			          \},
			        \});
			
			        const r = await env.response.eval();
			        const result = r.entry();
			
			        expect(result.foo.item).toBeTruthy();
			        const dist = env.workspace.getDist();
			
			        expect(dist.findFile(/\\.css\$/)).toBeTruthy();
			      \});
			    \});
			
			    describe('Server', () => \{
			      it('should ignore css during development', async () => \{
			        const css = 'body \{ color: red \}';
			        const env = await runServerTest(\{
			          env: EnvironmentType.DEVELOPMENT,
			          files: \{ 'index.ts': \`import "./main.css";console.log(1)\`, 'main.css': css \},
			        \});
			
			        env.response.eval();
			        const scope = await env.response.eval();
			
			        expect(scope.entry()).toBeTruthy();
			      \});
			
			      it('should ignore css during production', async () => \{
			        const css = 'body \{ color: red \}';
			        const env = await runServerTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{ 'index.ts': \`import "./main.css";console.log(1)\`, 'main.css': css \},
			        \});
			
			        env.response.eval();
			        const scope = await env.response.eval();
			        expect(scope.entry()).toBeTruthy();
			      \});
			
			      it('should ignore css for production (require) nested', async () => \{
			        const env = await runServerTest(\{
			          env: EnvironmentType.PRODUCTION,
			          files: \{
			            'index.ts': \`
			            function foo()\{
			              require("./main.css")
			            \}
			          \`,
			            'main.css': 'body \{ color: red \}',
			          \},
			        \});
			
			        const r = await env.response.eval();
			
			        const dist = env.workspace.getDist();
			
			        expect(dist.findFile(/\\.css\$/)).toBeFalsy();
			        expect(r.entry()).toBeTruthy();
			      \});
			
			      it('should work correctly with css modules', async () => \{
			        const env = await runServerTest(\{
			          env: EnvironmentType.PRODUCTION,
			          config: \{
			            plugins: [pluginSass('main.scss', \{ asModule: \{\} \})],
			          \},
			          files: \{
			            'index.ts': \`
			            import * as foo from "./main.scss"
			            export \{ foo \}
			          \`,
			            'main.scss': '.item \{ color: red \}',
			          \},
			        \});
			
			        const r = await env.response.eval();
			        const result = r.entry();
			
			        expect(result.foo.item).toBeTruthy();
			        const dist = env.workspace.getDist();
			
			        expect(dist.findFile(/\\.css\$/)).toBeFalsy();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\__tests__\\css.integration.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(11)
    });
    it('fuse-box_fuse-box\\src\\__tests__\\dependencies.integration.test.ts', () => {
        const sourceCode = `
			import \{ EnvironmentType \} from '../config/EnvironmentType';
			import \{ runBrowserTest, runServerTest \} from '../testUtils/integrationHelper';
			import \{ EnvironmentTypesTestable \} from '../testUtils/integrationTest';
			
			describe('User dependencies test', () => \{
			  describe('Electron cases', () => \{
			    for (const env of EnvironmentTypesTestable) \{
			      it(\`should polyfill path depenedency [ \$\{EnvironmentType[env]\} ] \`, async () => \{
			        const \{ response \} = await runBrowserTest(\{
			          config: \{
			            target: 'electron',
			          \},
			          env,
			          files: \{
			            'index.ts': \`
			            import * as path from "path"
			            export function test()\{
			              return path.join("a", "b")
			            \}
			          \`,
			          \},
			        \});
			
			        const data = response.eval();
			        const fnRes = data.entry().test();
			        expect(fnRes).toEqual('a/b');
			      \});
			
			      it(\`should not polyfill path depenedency [ \$\{EnvironmentType[env]\} ] \`, async () => \{
			        const \{ response \} = await runBrowserTest(\{
			          config: \{
			            target: 'electron',
			            electron: \{ nodeIntegration: true \},
			          \},
			          env,
			          files: \{
			            'index.ts': \`
			            import * as path from "path"
			            export function test()\{
			              return path.join("a", "b")
			            \}
			          \`,
			          \},
			        \});
			
			        const data = response.eval(\{
			          extendGlobal: \{
			            require: target => \{
			              if (target === 'path') return \{ join: () => 'mocked' \};
			              return \{\};
			            \},
			          \},
			        \});
			        const fnRes = data.entry().test();
			        expect(fnRes).toEqual('mocked');
			      \});
			    \}
			  \});
			  describe('Manually including dependencies', () => \{
			    it('should include package foo', async () => \{
			      const \{ response \} = await runBrowserTest(\{
			        config: \{
			          dependencies: \{ include: ['foo'] \},
			        \},
			        env: EnvironmentType.DEVELOPMENT,
			        files: \{
			          'index.ts': \`export function something()\{\}\`,
			        \},
			        modules: \{
			          foo: \{
			            'index.ts': \`export function that_external_package()\{\}\`,
			            'package.json': JSON.stringify(\{ main: 'index.ts', name: 'foo', version: '1.0.0' \}),
			          \},
			        \},
			      \});
			      const packagePresent = response.runResponse.modules.find(m => /that_external_package/.test(m.contents));
			      expect(packagePresent).toBeTruthy();
			    \});
			
			    it('should include an extra file that is relative', async () => \{
			      const \{ response \} = await runBrowserTest(\{
			        config: \{
			          dependencies: \{ include: ['./oi'] \},
			        \},
			        env: EnvironmentType.DEVELOPMENT,
			        files: \{
			          'index.ts': \`export function something()\{\}\`,
			          'oi.ts': \`export function that_new_oi_file()\`,
			        \},
			      \});
			
			      const packagePresent = response.runResponse.modules.find(m => /that_new_oi_file/.test(m.contents));
			      expect(packagePresent).toBeTruthy();
			    \});
			
			    for (const env of EnvironmentTypesTestable) \{
			      it(\`should exlude and ignore all external deps env :[ \$\{EnvironmentType[env]\} ] \`, async () => \{
			        const \{ response \} = await runServerTest(\{
			          config: \{
			            dependencies: \{ serverIgnoreExternals: true \},
			          \},
			          env: env,
			          files: \{
			            'foo.ts': 'export const foo = "foo"',
			            'index.ts': \`
			              import \{ oi\} from "some_server_package"
			              import \{foo\} from "./foo"
			              console.log(oi, foo)
			            \`,
			          \},
			          modules: \{
			            some_server_package: \{
			              'index.ts': \`export function something()\{\}\`,
			              'package.json': JSON.stringify(\{ main: 'index.ts', name: 'some_server_package', version: '1.0.0' \}),
			            \},
			          \},
			        \});
			
			        // index and foo
			        expect(response.runResponse.modules).toHaveLength(2);
			
			        const requires = [];
			        response.eval(\{
			          onServerRequire: args => \{
			            // this should be called on a "real" nodejs require module which is mocked
			            // we're jsut returning some object
			            requires.push(args);
			            return \{ real: true \};
			          \},
			        \});
			
			        expect(requires).toEqual([['some_server_package']]);
			      \});
			
			      it('Should exclude specific module', async () => \{
			        const \{ response \} = await runServerTest(\{
			          config: \{
			            dependencies: \{ ignore: ['second_package'], serverIgnoreExternals: false \},
			          \},
			          env: env,
			          files: \{
			            'foo.ts': 'export const foo = "foo"',
			            'index.ts': \`
			              import * as some_server_package from "some_server_package"
			              import * as second_package from "second_package"
			              console.log(some_server_package, second_package)
			            \`,
			          \},
			          modules: \{
			            second_package: \{
			              'index.ts': \`export const res = "second_package"\`,
			              'package.json': JSON.stringify(\{ main: 'index.ts', name: 'second_package', version: '1.0.0' \}),
			            \},
			            some_server_package: \{
			              'index.ts': \`export const res = "some_server_package"\`,
			              'package.json': JSON.stringify(\{ main: 'index.ts', name: 'some_server_package', version: '1.0.0' \}),
			            \},
			          \},
			        \});
			
			        const logs = [];
			        response.eval(\{
			          onConsoleLog: args => logs.push(args),
			          onServerRequire: args => \{
			            // this should be called on a "real" nodejs require module which is mocked
			            // we're jsut returning some object
			            if (args[0] === 'second_package') return \{ native_second_package: true \};
			          \},
			        \});
			        expect(logs).toEqual([[\{ __esModule: true, res: 'some_server_package' \}, \{ native_second_package: true \}]]);
			      \});
			    \}
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'fuse-box_fuse-box\\src\\__tests__\\dependencies.integration.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
});
