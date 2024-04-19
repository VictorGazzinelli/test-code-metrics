const { extractFromSource } = require('../../src/extractor');

describe('babel_minify', () => {
    it('babel_minify\\packages\\babel-helper-mark-eval-scopes\\__tests__\\helper-mark-eval-scopes-test.js', () => {
        const sourceCode = `
			jest.autoMockOff();
			
			const babel = require("@babel/core");
			const helper = require("../src");
			
			function getPath(source) \{
			  let path;
			
			  babel.transform(source, \{
			    babelrc: false,
			    plugins: [
			      function(\{ traverse \}) \{
			        (traverse.clearCache || traverse.cache.clear)();
			        return \{
			          visitor: \{
			            Program(programPath) \{
			              path = programPath;
			            \}
			          \}
			        \};
			      \}
			    ]
			  \});
			
			  return path;
			\}
			
			describe("babel-helper-mark-eval-scopes", () => \{
			  it("getEvalScopes - should give a set of scopes which contains eval", () => \{
			    const source = \`
			      function foo() \{
			        function bar() \{
			          eval(";");
			        \}
			        function baz() \{
			          noeval();
			        \}
			      \}
			    \`;
			
			    const program = getPath(source);
			    const evalScopes = [...helper.getEvalScopes(program)];
			
			    expect(evalScopes).toContain(program.scope);
			    expect(evalScopes).toContain(program.get("body.0.body.body.0").scope);
			    expect(evalScopes).not.toContain(program.get("body.0.body.body.1").scope);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\packages\\babel-helper-mark-eval-scopes\\__tests__\\helper-mark-eval-scopes-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('babel_minify\\packages\\babel-minify\\__tests__\\cli-tests.js', () => {
        const sourceCode = `
			jest.autoMockOff();
			jest.setTimeout(25000);
			
			const \{ spawn \} = require("child_process");
			const path = require("path");
			const fs = require("fs");
			const promisify = require("util.promisify");
			const rimraf = require("rimraf");
			const minifyCli = require.resolve("../bin/minify");
			
			const readFileAsync = promisify(fs.readFile);
			const readFile = file => readFileAsync(file).then(out => out.toString());
			const unlink = promisify(rimraf);
			
			function runCli(args = [], stdin) \{
			  return new Promise((resolve, reject) => \{
			    const child = spawn("node", [minifyCli, ...args], \{
			      stdio: [stdin ? "pipe" : "inherit", "pipe", "pipe"],
			      shell: true
			    \});
			
			    if (stdin) \{
			      child.stdin.end(stdin);
			    \}
			
			    let stdout = "";
			    let stderr = "";
			
			    child.stdout.on("data", data => (stdout += data));
			    child.stderr.on("data", data => (stderr += data));
			    child.on(
			      "close",
			      code =>
			        code === 0 ? resolve(\{ stdout, stderr \}) : reject(\{ code, stderr \})
			    );
			  \});
			\}
			
			let tempSource = \`
			function foo() \{
			  const bar = x(1);
			  const baz = y(2);
			  return z(bar, baz);
			\}
			\`;
			
			const sampleInputFile = path.join(__dirname, "fixtures/out-file/foo.js");
			const sampleInputDir = path.join(__dirname, "fixtures/out-dir/a");
			const sampleInputModule = path.join(__dirname, "fixtures/module/mod.js");
			
			const tempOutFile = path.join(__dirname, "fixtures/out-file/foo.min.js");
			const tempOutDir = path.join(__dirname, "fixtures/out-dir/min");
			const tempOutDirFile = path.join(__dirname, "fixtures/out-dir/min/foo.js");
			
			describe("babel-minify CLI", () => \{
			  afterEach(async () => \{
			    await unlink(tempOutDir);
			    await unlink(tempOutFile);
			  \});
			
			  it("should show help for --help", () => \{
			    return expect(runCli(["--help"])).resolves.toBeDefined();
			  \});
			
			  it("should show version for --version", () => \{
			    const \{ version \} = require("../package");
			    return expect(
			      runCli(["--version"]).then((\{ stdout \}) => stdout.trim())
			    ).resolves.toBe(version);
			  \});
			
			  it("should throw on all invalid options", () => \{
			    return expect(runCli(["--foo", "--bar"])).rejects.toMatchSnapshot();
			  \});
			
			  it("stdin + stdout", () => \{
			    return expect(
			      runCli(["--mangle.topLevel"], tempSource)
			    ).resolves.toMatchSnapshot();
			  \});
			
			  it("stdin + outFile", async () => \{
			    await runCli(["--out-file", tempOutFile], tempSource);
			    expect(await readFile(tempOutFile)).toMatchSnapshot();
			  \});
			
			  it("input file + stdout", async () => \{
			    return expect(runCli([sampleInputFile])).resolves.toMatchSnapshot();
			  \});
			
			  it("input file + outFile", async () => \{
			    await runCli([sampleInputFile, "--out-file", tempOutFile]);
			    expect(await readFile(tempOutFile)).toMatchSnapshot();
			  \});
			
			  it("input file + outDir", async () => \{
			    await runCli([sampleInputFile, "--out-dir", tempOutDir]);
			    expect(await readFile(tempOutDirFile)).toMatchSnapshot();
			  \});
			
			  it("input dir + outdir", async () => \{
			    await runCli([sampleInputDir, "--out-dir", tempOutDir]);
			    expect(await readFile(tempOutDirFile)).toMatchSnapshot();
			  \});
			
			  it("should handle source type", async () => \{
			    return expect(runCli([sampleInputModule, "--sourceType module"])).resolves;
			  \});
			
			  it("should handle comments", async () => \{
			    return expect(
			      Promise.all([
			        runCli([sampleInputModule, "--sourceType module", "--comments false"]),
			        runCli([sampleInputModule, "--sourceType module", "--comments true"])
			      ])
			    ).resolves.toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\packages\\babel-minify\\__tests__\\cli-tests.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('babel_minify\\packages\\babel-minify\\__tests__\\node-api-tests.js', () => {
        const sourceCode = `
			jest.autoMockOff();
			
			const minify = require("../src/index");
			
			const sampleInput = \`
			function foo() \{
			  const bar = x(1);
			  const baz = y(2);
			  return z(bar, baz);
			\}
			\`;
			
			describe("babel-minify Node API", () => \{
			  it("simple usage", () => \{
			    expect(minify(sampleInput).code).toMatchSnapshot();
			  \});
			
			  it("throw on invalid options", () => \{
			    expect(() => minify(sampleInput, \{ foo: false, bar: true \}).code).toThrow();
			  \});
			
			  it("override default minify options", () => \{
			    const minifyOpts = \{ mangle: false \};
			    expect(minify(sampleInput, minifyOpts).code).toMatchSnapshot();
			  \});
			
			  it("override nested minify options", () => \{
			    const minifyOpts = \{ mangle: \{ keepFnName: false \} \};
			    expect(minify(sampleInput, minifyOpts).code).toMatchSnapshot();
			  \});
			
			  it("preserve default comments", () => \{
			    const code = \`
			      /* @license MIT */
			      (function() \{
			        /*! mylib.js */
			        function a() \{\}
			        a();
			      \})();
			    \`;
			
			    expect(minify(code, \{\}).code).toMatchSnapshot();
			  \});
			
			  it("remove comments ", () => \{
			    const code = \`
			      /* foo */
			      var a = 10;
			
			      !function()\{\}() // blah
			    \`;
			
			    expect(minify(code, \{\}).code).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\packages\\babel-minify\\__tests__\\node-api-tests.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('babel_minify\\packages\\babel-plugin-minify-dead-code-elimination\\__tests__\\dead-code-elimination-test.js', () => {
        const sourceCode = `
			jest.autoMockOff();
			
			const babel = require("@babel/core");
			const unpad = require("unpad");
			const deadcode = require("../src/index");
			const simplify = require("../../babel-plugin-minify-simplify/src/index");
			const thePlugin = require("test-transform")(deadcode);
			
			function transformWithSimplify(code) \{
			  return babel.transformSync(code, \{
			    plugins: [deadcode, simplify],
			    sourceType: "script"
			  \}).code;
			\}
			
			describe("dce-plugin", () => \{
			  thePlugin.skip(
			    "should latch on to exisiting vars",
			    \`
			   function x(a) \{
			     if (a) \{
			       var x = a.wat;
			       foo(x);
			     \}
			     var z = a.foo, b = b.bar;
			     return z + b;
			   \}
			  \`,
			    \`
			    function x(a) \{
			      if (a) \{
			        x = a.wat;
			
			        foo(x);
			      \}
			      var z = a.foo,
			          b = b.bar,
			          x;
			      return z + b;
			    \}
			  \`,
			    \{
			      plugins: [[deadcode, \{ optimizeRawSize: true \}]]
			    \}
			  );
			
			  thePlugin.skip(
			    "should evaluate and remove falsy code",
			    \`
			    foo(0 && bar());
			  \`,
			    \`
			    foo(0);
			  \`
			  );
			
			  // https://github.com/babel/minify/issues/265
			  it("should integrate with simplify plugin changing scopes", () => \{
			    const source = unpad(\`
			      function getParentConditionalPath(path) \{
			        let parentPath;
			        while (parentPath = path.parentPath) \{
			          if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) \{
			            if (path.key === "test") \{
			              return;
			            \} else \{
			              return parentPath;
			            \}
			          \} else \{
			            path = parentPath;
			          \}
			        \}
			      \}
			    \`);
			    const expected = unpad(\`
			      function getParentConditionalPath(path) \{
			        for (let parentPath; parentPath = path.parentPath;) \{
			          if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) return path.key === "test" ? void 0 : parentPath;
			          path = parentPath;
			        \}
			      \}
			    \`);
			    expect(transformWithSimplify(source)).toBe(expected);
			  \});
			
			  thePlugin.skip(
			    "should optimize to void 0 for lets referenced before init declarations",
			    \`
			      function foo() \{
			        bar(a); // Should be a ReferenceError
			        let a = 1;
			      \}
			    \`,
			    \{
			      plugins: [[deadcode, \{ tdz: true \}]]
			    \}
			  );
			\});
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\packages\\babel-plugin-minify-dead-code-elimination\\__tests__\\dead-code-elimination-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('babel_minify\\packages\\babel-plugin-minify-simplify\\__tests__\\pattern-match.js', () => {
        const sourceCode = `
			jest.autoMockOff();
			
			const PatternMatch = require("../src/pattern-match");
			
			describe("simplify-plugin - pattern-match", () => \{
			  it("should match simple patterns", () => \{
			    const patterns = [
			      ["a", "b", "c"],
			      ["foo", "bar"],
			      ["bar", "bar", true],
			      [1, true, "foo"],
			      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			      ["foo", 1, a => a]
			    ];
			    const matcher = new PatternMatch(patterns);
			
			    patterns.forEach(pattern => \{
			      const input = pattern.slice(0, pattern.length - 1);
			      const result = matcher.match(input);
			      expect(result.match).toBe(true);
			      expect(result.value).toBe(pattern[pattern.length - 1]);
			    \});
			  \});
			
			  it("should match simple patterns 2", () => \{
			    const patterns = [
			      [true, false],
			      [true, true],
			      ["foo", "bar"],
			      [1, 2, 3],
			      ["a", 1, true]
			    ];
			    const matcher = new PatternMatch(
			      patterns.map(pattern => \{
			        return [
			          ...pattern,
			          pattern1 => \{
			            expect(pattern1).toEqual(pattern);
			          \}
			        ];
			      \})
			    );
			    patterns.forEach(pattern => \{
			      const result = matcher.match(pattern);
			      expect(result.match).toBe(true);
			      result.value(pattern);
			    \});
			  \});
			
			  it("should throw when a pattern contains less than 2 entries", () => \{
			    expect(() => \{
			      new PatternMatch([["foo", "bar"], ["baz"]]);
			    \}).toThrowError("at least 2 elements required in a pattern");
			  \});
			
			  it("should accept a custom matcher", () => \{
			    const BOOL = a => typeof a === "boolean";
			    const NUMBER = a => typeof a === "number";
			    const STRING = a => typeof a === "string";
			    const MATCHER = a => a instanceof PatternMatch;
			
			    const matcher = new PatternMatch([
			      [BOOL, NUMBER, "foo"],
			      [NUMBER, ["foo", "bar", BOOL], "foobarbaz"],
			      [BOOL, STRING, NUMBER, "baz"],
			      [STRING, MATCHER, "foobar"]
			    ]);
			
			    const inputs = [
			      [true, 1],
			      [false, 10.4],
			      [100, "foo"],
			      [0.5, "bar"],
			      [1, false],
			      [false, "foo", 10],
			      ["bar", matcher]
			    ];
			
			    const expected = [
			      "foo",
			      "foo",
			      "foobarbaz",
			      "foobarbaz",
			      "foobarbaz",
			      "baz",
			      "foobar"
			    ];
			
			    inputs.forEach((input, index) => \{
			      const result = matcher.match(input, customMatchFunction);
			      expect(result.match).toBe(true);
			      expect(result.value).toBe(expected[index]);
			    \});
			
			    function customMatchFunction(pattern, input) \{
			      if (typeof pattern === "function") \{
			        return pattern(input);
			      \}
			      if (Array.isArray(pattern)) \{
			        for (let i = 0; i < pattern.length; i++) \{
			          if (customMatchFunction(pattern[i], input)) \{
			            return true;
			          \}
			        \}
			        return false;
			      \}
			      return pattern === input;
			    \}
			  \});
			
			  it("should match in order - first match should win", () => \{
			    const matcher = new PatternMatch([[1, true, "foo"], [1, true, "bar"]]);
			    const result = matcher.match([1, true]);
			    expect(result.match).toBe(true);
			    expect(result.value).toBe("foo");
			  \});
			
			  it("should handle case no match found", () => \{
			    const matcher = new PatternMatch([
			      [1, 2, 3],
			      [2, 2, 4, 5],
			      [3, 2, 1, 6],
			      [1, 2, 4, 3],
			      [4, 3, 2, 1]
			    ]);
			    const result = matcher.match([1, 2, 5]);
			    expect(result.match).toBe(false);
			    expect(result.value).toBe(void 0);
			  \});
			
			  it("should match the first found pattern even if it's less specific", () => \{
			    const matcher = new PatternMatch([
			      ["foo", "bar", "baz"],
			      ["foo", "bar", "baz", true]
			    ]);
			    const result = matcher.match(["foo", "bar"]);
			    expect(result.match).toBe(true);
			    expect(result.value).toBe("baz");
			  \});
			
			  it("should match the first found pattern even if it's less specific 2", () => \{
			    const matcher = new PatternMatch([
			      [1, 2, 3],
			      [1, 2, 3, 4],
			      [1, 3],
			      [1, 3, 5]
			    ]);
			
			    expect(matcher.match([1])).toEqual(\{
			      match: true,
			      value: 3,
			      keys: [1]
			    \});
			
			    expect(matcher.match([1, 2])).toEqual(\{
			      match: true,
			      value: 3,
			      keys: [1, 2]
			    \});
			
			    expect(matcher.match([1, 3])).toEqual(\{
			      match: true,
			      value: 5,
			      keys: [1, 3]
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\packages\\babel-plugin-minify-simplify\\__tests__\\pattern-match.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('babel_minify\\packages\\babel-plugin-minify-type-constructors\\__tests__\\type-constructors-test.js', () => {
        const sourceCode = `
			jest.autoMockOff();
			
			const babel = require("@babel/core");
			const plugin = require("../src/index");
			const unpad = require("unpad");
			const thePlugin = require("test-transform")(plugin);
			
			describe("type-constructors-plugin", () => \{
			  // options tests
			  it("should respect the options disabling optomizations", () => \{
			    const types = \{
			      boolean: "Boolean",
			      number: "Number",
			      array: "Array",
			      object: "Object",
			      string: "String"
			    \};
			    const names = Object.keys(types);
			    for (let i = 0; i < names.length; i++) \{
			      const source = unpad(
			        \`
			        (function () \{
			          var foo = \$\{types[names[i]]\}(1);
			          var bar = \$\{types[names[i]]\}(x);
			          var baz = \$\{types[names[i]]\}();
			        \})();
			      \`
			      );
			      expect(
			        babel.transformSync(source, \{
			          plugins: [[plugin, \{ [names[i]]: false \}]],
			          sourceType: "script"
			        \}).code
			      ).toBe(source);
			    \}
			  \});
			
			  // https://github.com/babel/minify/issues/206
			  thePlugin(
			    "should handle floating point numbers in \`Array()\`",
			    \`
			    new Array(-0.01);
			    new Array(-1);
			  \`,
			    \`
			    Array(-0.01);
			    Array(-1);
			  \`
			  );
			\});
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\packages\\babel-plugin-minify-type-constructors\\__tests__\\type-constructors-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('babel_minify\\packages\\babel-preset-minify\\__tests__\\options-tests.js', () => {
        const sourceCode = `
			jest.autoMockOff();
			
			const mocks = [
			  "babel-plugin-minify-builtins",
			  "babel-plugin-minify-constant-folding",
			  "babel-plugin-minify-dead-code-elimination",
			  "babel-plugin-minify-flip-comparisons",
			  "babel-plugin-minify-guarded-expressions",
			  "babel-plugin-minify-infinity",
			  "babel-plugin-minify-mangle-names",
			  "babel-plugin-minify-numeric-literals",
			  "babel-plugin-minify-replace",
			  "babel-plugin-minify-simplify",
			  "babel-plugin-minify-type-constructors",
			  "babel-plugin-transform-inline-consecutive-adds",
			  "babel-plugin-transform-member-expression-literals",
			  "babel-plugin-transform-merge-sibling-variables",
			  "babel-plugin-transform-minify-booleans",
			  "babel-plugin-transform-property-literals",
			  "babel-plugin-transform-regexp-constructors",
			  "babel-plugin-transform-remove-console",
			  "babel-plugin-transform-remove-debugger",
			  "babel-plugin-transform-remove-undefined",
			  "babel-plugin-transform-simplify-comparison-operators",
			  "babel-plugin-transform-undefined-to-void"
			];
			
			mocks.forEach(mockName => \{
			  // it's called mockName for jest(babel-jest-plugin) workaround
			  jest.mock(mockName, () => mockName);
			\});
			
			const preset = require("../src/index");
			
			function getPlugins(opts) \{
			  return preset(\{\}, opts).presets[0].plugins;
			\}
			
			function testOpts(opts) \{
			  expect(\{
			    input: opts,
			    output: getPlugins(opts)
			  \}).toMatchSnapshot();
			\}
			
			describe("preset-options", () => \{
			  it("should be a function", () => \{
			    expect(typeof preset).toBe("function");
			  \});
			
			  it("should return defaults with no options", () => \{
			    expect(getPlugins()).toMatchSnapshot();
			    expect(getPlugins(\{\})).toMatchSnapshot();
			    expect(getPlugins(null)).toMatchSnapshot();
			  \});
			
			  it("should handle simple options", () => \{
			    testOpts(\{
			      mangle: false,
			      deadcode: false
			    \});
			  \});
			
			  it("should pass options to respective plugin when its an object", () => \{
			    testOpts(\{
			      mangle: \{
			        exclude: ["foo", "bar"]
			      \}
			    \});
			  \});
			
			  it("should handle options that are delegated to multiple other options", () => \{
			    testOpts(\{
			      keepFnName: false,
			      keepClassName: false
			    \});
			    testOpts(\{
			      keepFnName: true,
			      keepClassName: true,
			      mangle: \{
			        exclude: ["foo", "bar"]
			      \}
			    \});
			    testOpts(\{
			      keepFnName: true,
			      keepClassName: true,
			      mangle: \{
			        exclude: ["baz"],
			        keepFnName: false,
			        keepClassName: false
			      \}
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\packages\\babel-preset-minify\\__tests__\\options-tests.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('babel_minify\\packages\\gulp-babel-minify\\__tests__\\gulp-babili-test.js', () => {
        const sourceCode = `
			jest.autoMockOff();
			
			const File = require("vinyl");
			const babelCore = require("@babel/core");
			const minifyPreset = require("babel-preset-minify");
			
			const unpad = require("unpad");
			const gulpBabelMinify = require("../src/index");
			
			describe("gulp-babel-minify", () => \{
			  it("should work with a good default", () => \{
			    return new Promise((resolve, reject) => \{
			      const stream = gulpBabelMinify();
			
			      const source = unpad(\`
			        function foo() \{
			          const a = 10;
			          return a;
			        \}
			      \`);
			      const expected = "function foo()\{return 10\}";
			
			      stream.on("data", function(file) \{
			        expect(file.contents.toString()).toBe(expected);
			        resolve();
			      \});
			      stream.on("error", reject);
			
			      stream.write(
			        new File(\{
			          path: "defaults.js",
			          contents: new Buffer(source)
			        \})
			      );
			    \});
			  \});
			
			  it("should take options and pass them to babel-minify", () => \{
			    return new Promise((resolve, reject) => \{
			      const stream = gulpBabelMinify(\{
			        mangle: \{
			          exclude: \{
			            bar: true
			          \}
			        \}
			      \});
			
			      const source = unpad(\`
			        function foo(bar, baz) \{
			          return bar + baz;
			        \}
			      \`);
			      const expected = "function foo(bar,a)\{return bar+a\}";
			
			      stream.on("data", function(file) \{
			        expect(file.contents.toString()).toBe(expected);
			        resolve();
			      \});
			      stream.on("error", reject);
			
			      stream.write(
			        new File(\{
			          path: "options.js",
			          contents: new Buffer(source)
			        \})
			      );
			    \});
			  \});
			
			  it("should take custom babel and babel-minify", () => \{
			    return new Promise((resolve, reject) => \{
			      const babel = Object.assign(\{\}, babelCore);
			
			      let usedTransform = false;
			      Object.defineProperty(babel, "transformSync", \{
			        get() \{
			          usedTransform = true;
			          return babelCore.transformSync;
			        \}
			      \});
			
			      let usedPreset = false;
			      const minify = function(...args) \{
			        usedPreset = true;
			        return minifyPreset(...args);
			      \};
			
			      const stream = gulpBabelMinify(
			        \{\},
			        \{
			          babel,
			          minifyPreset: minify
			        \}
			      );
			
			      stream.on("data", function() \{
			        expect(usedTransform).toBe(true);
			        expect(usedPreset).toBe(true);
			        resolve();
			      \});
			      stream.on("error", reject);
			
			      stream.write(
			        new File(\{
			          path: "custom-transformers.js",
			          contents: new Buffer("foo()")
			        \})
			      );
			    \});
			  \});
			
			  describe("comments", () => \{
			    const source = unpad(
			      \`
			      /**
			       * @license
			       * This is a test
			       */
			      function foo()\{\}
			      // this is another comment
			      bar();
			      /* YAC - yet another comment */
			      var a = baz();
			    \`
			    );
			
			    let file;
			
			    beforeEach(() => \{
			      file = new File(\{
			        path: "comments.js",
			        contents: new Buffer(source)
			      \});
			    \});
			
			    it("should remove comments by default except license and preserve", () => \{
			      return new Promise((resolve, reject) => \{
			        const stream = gulpBabelMinify();
			        stream.on("data", function(file) \{
			          expect(file.contents.toString()).toMatchSnapshot();
			          resolve();
			        \});
			        stream.on("error", reject);
			        stream.write(file);
			      \});
			    \});
			
			    it("should remove all comments when false", () => \{
			      return new Promise((resolve, reject) => \{
			        const stream = gulpBabelMinify(
			          \{\},
			          \{
			            comments: false
			          \}
			        );
			        stream.on("data", () => \{
			          expect(file.contents.toString()).toMatchSnapshot();
			          resolve();
			        \});
			        stream.on("error", reject);
			        stream.write(file);
			      \});
			    \});
			
			    it("should take a custom function", () => \{
			      return new Promise((resolve, reject) => \{
			        const stream = gulpBabelMinify(
			          \{\},
			          \{
			            comments(contents) \{
			              return contents.indexOf("YAC") !== -1;
			            \}
			          \}
			        );
			        stream.on("data", () => \{
			          expect(file.contents.toString()).toMatchSnapshot();
			          resolve();
			        \});
			        stream.on("error", reject);
			        stream.write(file);
			      \});
			    \});
			  \});
			
			  it("should remove comments while doing DCE and simplify", () => \{
			    return new Promise((resolve, reject) => \{
			      const stream = gulpBabelMinify(
			        \{\},
			        \{
			          comments(contents) \{
			            return contents.indexOf("optimized") !== -1;
			          \}
			        \}
			      );
			
			      const source = unpad(\`
			        /**
			         * @license
			         * throw away
			         */
			        var a = function()\{
			          // Hell yeah
			          function test()\{
			            // comments should be optimized away
			            const flag = true;
			            if (flag) \{
			              // comments
			              foo();
			            \}
			            // remove this also
			            bar();
			            // should remove this as well
			            baz();
			          \}
			          test();
			        \}
			      \`);
			
			      stream.on("data", function(file) \{
			        expect(file.contents.toString()).toMatchSnapshot();
			        resolve();
			      \});
			      stream.on("error", reject);
			
			      stream.write(
			        new File(\{
			          path: "options.js",
			          contents: new Buffer(source)
			        \})
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\packages\\gulp-babel-minify\\__tests__\\gulp-babili-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('babel_minify\\utils\\test-runner\\src\\index.js', () => {
        const sourceCode = `
			/* eslint-disable no-console */
			jest.setTimeout(25000);
			const fs = require("./fs");
			const path = require("path");
			const babel = require("@babel/core");
			const parseArgs = require("./argParser");
			
			/**
			 * Jest changes __dirname to relative path and the require of relative path
			 * that doesn't start with "." will be a module require -
			 *
			 * require("./packages/babel-plugin...") vs require("packages/babel-plugin..");
			 *
			 * So we start the path with a "./"
			 */
			function pathJoin(...parts) \{
			  if (path.isAbsolute(parts[0])) \{
			    return path.join(...parts);
			  \}
			  return "." + path.sep + path.join(...parts);
			\}
			
			function testRunner(dir) \{
			  const pkgDir = pathJoin(dir, "../");
			
			  const packageJson = JSON.parse(
			    fs.readFileSync(pathJoin(pkgDir, "package.json"))
			  );
			  const pkgName = packageJson.name;
			
			  const fixturesDir = pathJoin(pkgDir, "__tests__/fixtures");
			
			  const fixtures = fs
			    .readdirSync(fixturesDir)
			    .filter(dir => fs.isDirectorySync(pathJoin(fixturesDir, dir)));
			
			  const flags = parseArgs(process.argv);
			  const updateFixtures =
			    !!process.env.OVERWRITE || Boolean(flags["update-fixtures"]);
			
			  describe(pkgName, () => \{
			    for (const fixture of fixtures) \{
			      const actualFile = pathJoin(fixturesDir, fixture, "actual.js");
			      const expectedFile = pathJoin(fixturesDir, fixture, "expected.js");
			      const skipFile = pathJoin(fixturesDir, fixture, "skip");
			      const optionsFile = pathJoin(fixturesDir, fixture, "options.json");
			      const babelOptionsFile = pathJoin(fixturesDir, fixture, "babel.json");
			
			      if (fs.isFileSync(skipFile)) \{
			        test.skip(fixture, () => \{\});
			        continue;
			      \}
			
			      test(fixture, async () => \{
			        const actual = await fs.readFile(actualFile);
			
			        let options = \{\};
			        if (await fs.isFile(optionsFile)) \{
			          options = JSON.parse(await fs.readFile(optionsFile));
			        \}
			
			        let babelOpts = \{
			          // set the default sourcetype to be script
			          sourceType: "script"
			        \};
			
			        if (await fs.isFile(babelOptionsFile)) \{
			          Object.assign(
			            babelOpts,
			            JSON.parse(await fs.readFile(babelOptionsFile))
			          );
			        \}
			
			        const currentPlugin = pathJoin(pkgDir, "src/index.js");
			
			        if (Array.isArray(babelOpts.plugins)) \{
			          babelOpts.plugins = [[currentPlugin, options], ...babelOpts.plugins];
			        \} else \{
			          babelOpts.plugins = [[currentPlugin, options]];
			        \}
			
			        // don't consider the project's babel.config.js
			        babelOpts.configFile = false;
			
			        const actualTransformed = babel.transformSync(actual, babelOpts).code;
			
			        if (!(await fs.isFile(expectedFile))) \{
			          await fs.writeFile(expectedFile, actualTransformed);
			          console.warn("Created fixture's expected file - " + expectedFile);
			        \} else if (updateFixtures) \{
			          const expected = await fs.readFile(expectedFile);
			          if (expected !== actualTransformed) \{
			            await fs.writeFile(expectedFile, actualTransformed);
			            console.warn("Updated fixture's expected file - " + expectedFile);
			          \}
			        \} else \{
			          const expected = await fs.readFile(expectedFile);
			          expect(actualTransformed).toBe(expected);
			        \}
			      \});
			    \}
			  \});
			\}
			
			module.exports = testRunner;
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\utils\\test-runner\\src\\index.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('babel_minify\\utils\\test-transform\\src\\test-transform.js', () => {
        const sourceCode = `
			const babel = require("@babel/core");
			
			const unpad = require("unpad");
			
			function _transform(source, options) \{
			  // reset defaults to older babel
			  // babel-7 current beta defaults to sourceType module
			  options.sourceType = defaults(options, "sourceType", "script");
			
			  // don't use config file - babel.config.js to apply transformations
			  // this is almost never required as babel.config.js represents the
			  // project's configuration and not the config for test environment
			  options.configFile = false;
			
			  return babel.transformSync(unpad(source), options).code.trim();
			\}
			
			function makeTester(
			  plugins,
			  opts,
			  \{ transform = _transform, check, test = it \},
			  excludeKeys = []
			) \{
			  if (!Array.isArray(plugins)) \{
			    plugins = [plugins];
			  \}
			
			  const thePlugin = (name, source, expected = source, babelOpts) => \{
			    if (typeof expected === "object") \{
			      babelOpts = expected;
			      expected = source;
			    \}
			
			    const \{ stack \} = new Error();
			    const options = Object.assign(
			      \{ plugins, sourceType: "script" \},
			      opts,
			      babelOpts
			    );
			
			    test(name, () => \{
			      const transformed = transform(source, options);
			
			      try \{
			        check(\{
			          transformed,
			          expected: unpad(expected),
			          source: unpad(source)
			        \});
			      \} catch (e) \{
			        // use the stack from outside the it() clause
			        // (the one inside the clause doesn’t show the actual test code)
			        e.stack = stack;
			        throw e;
			      \}
			    \});
			  \};
			
			  thePlugin.skip = name => test.skip(name, () => \{\});
			
			  if (excludeKeys.indexOf("inEachLine") === -1) \{
			    thePlugin.inEachLine = makeTester(
			      plugins,
			      opts,
			      \{
			        test,
			        transform(source, options) \{
			          return unpad(source)
			            .split("\\n")
			            .map(line => _transform(line, options))
			            .join("\\n");
			        \},
			        check
			      \},
			      excludeKeys.concat("inEachLine")
			    );
			  \}
			
			  if (excludeKeys.indexOf("only") === -1) \{
			    thePlugin.only = makeTester(
			      plugins,
			      opts,
			      \{
			        test: test.only,
			        transform,
			        check
			      \},
			      excludeKeys.concat("only")
			    );
			  \}
			
			  return thePlugin;
			\}
			
			exports = module.exports = (plugins, opts) =>
			  makeTester(plugins, opts, \{
			    check(\{ transformed, expected \}) \{
			      expect(transformed).toBe(expected);
			    \}
			  \});
			
			exports.snapshot = (plugins, opts) =>
			  makeTester(plugins, opts, \{
			    check(\{ transformed, source \}) \{
			      // Jest arranges in alphabetical order, So keeping it as _source
			      expect(\{ _source: source, expected: transformed \}).toMatchSnapshot();
			    \}
			  \});
			
			function defaults(o, key, def) \{
			  return hop(o, key) ? o[key] : def;
			\}
			
			function hop(o, key) \{
			  return Object.prototype.hasOwnProperty.call(o, key);
			\}
			`

		const tests = extractFromSource(sourceCode, 'babel_minify\\utils\\test-transform\\src\\test-transform.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
});
