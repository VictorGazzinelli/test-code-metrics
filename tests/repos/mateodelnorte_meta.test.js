const { extractFromSource } = require('../../src/extractor');

describe('mateodelnorte_meta', () => {
    it('mateodelnorte_meta\\lib\\__tests__\\findPlugins.js', () => {
        const sourceCode = `
			jest.mock('fs');
			
			const findPlugins = require('../findPlugins');
			const cp = require('child_process');
			const fs = require('fs');
			
			describe('findPlugins', () => \{
			  beforeEach(() => \{
			    fs.reset();
			    process.env.NODE_PATH = '';
			  \});
			
			  it('ignores non-plugins', () => \{
			    fs.write('/node_modules/@foo/bar/index.js', '');
			    fs.write('/node_modules/foo/index.js', '');
			    expect(findPlugins('/')).toMatchSnapshot();
			  \});
			
			  it('finds scoped plugins', () => \{
			    fs.write('/node_modules/@foo/meta-foo/index.js', '');
			    expect(findPlugins('/')).toMatchSnapshot();
			  \});
			
			  it('finds non-scoped plugins', () => \{
			    fs.write('/node_modules/meta-foo/index.js', '');
			    expect(findPlugins('/')).toMatchSnapshot();
			  \});
			
			  it('skips plugins whose name is already in use', () => \{
			    fs.write('/node_modules/@foo/meta-foo/index.js', '');
			    fs.write('/node_modules/meta-foo/index.js', '');
			    expect(findPlugins('/')).toMatchSnapshot();
			  \});
			
			  it('searches every parent directory', () => \{
			    fs.write('/node_modules/meta-0/index.js', '');
			    fs.write('/1/node_modules/meta-1/index.js', '');
			    fs.write('/1/2/node_modules/meta-2/index.js', '');
			    fs.write('/1/2/3/node_modules/meta-3/index.js', '');
			    fs.write('/1/2/3/index.js', '');
			    expect(findPlugins('/1/2/3')).toMatchSnapshot();
			  \});
			
			  it('searches every global directory', () => \{
			    fs.write('/foo/meta-foo/index.js', '');
			    fs.write('/bar/@foo/meta-bar/index.js', '');
			
			    process.env.NODE_PATH = '/foo:/bar';
			    expect(findPlugins('/dev')).toMatchSnapshot();
			  \});
			
			  it('falls back to (npm root -g) when \$NODE_PATH is empty', () => \{
			    fs.write('/npm/root/foo/index.js', '');
			    fs.write('/npm/root/meta-1/index.js', '');
			    fs.write('/npm/root/@foo/meta-2/index.js', '');
			
			    delete process.env.NODE_PATH;
			    const oldFn = cp.execSync;
			    cp.execSync = jest.fn(() => '/npm/root');
			
			    expect(findPlugins('/')).toMatchSnapshot();
			    expect(cp.execSync.mock.calls).toEqual([['npm root -g']]);
			    cp.execSync = oldFn;
			  \});
			
			  it('tolerates missing "node_modules" when searching parent directories', () => \{
			    fs.write('/1/node_modules/meta-1/index.js', '');
			    fs.write('/1/2/3/node_modules/meta-3/index.js', '');
			    fs.write('/1/2/3/4/index.js', '');
			
			    // Directories #2 and #4 have no "node_modules"
			    expect(findPlugins('/1/2/3/4')).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'mateodelnorte_meta\\lib\\__tests__\\findPlugins.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('mateodelnorte_meta\\__tests__\\index.js', () => {
        const sourceCode = `
			const index = require('../index.js');
			
			jest.spyOn(process, 'exit').mockImplementation(() => \{\});
			
			describe('index.js', () => \{
			  it('should exist', () => \{
			    expect(index).toBeDefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'mateodelnorte_meta\\__tests__\\index.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('mateodelnorte_meta\\__tests__\\plugins\\index.js', () => {
        const sourceCode = `
			const cp = require('child_process');
			
			describe('plugins', () => \{
			  it('can be executed using exact executable name', () => \{
			    const cmd = cp.execSync('npx meta-project').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('can be executed using git style subcommands', () => \{
			    const cmd = cp.execSync('npx meta project').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('can be executed using local plugin discovery', () => \{
			    const cmd = cp.execSync('./bin/meta project').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('should include meta gh as dev dependency', () => \{
			    const cmd = cp.execSync('./bin/meta gh').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('should include meta git as dependency', () => \{
			    const cmd = cp.execSync('./bin/meta git').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('should include meta init as dependency', () => \{
			    const cmd = cp.execSync('./bin/meta init').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('should include meta exec as dependency', () => \{
			    const cmd = cp.execSync('./bin/meta exec').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('should include meta npm as dev dependency', () => \{
			    const cmd = cp.execSync('./bin/meta npm').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('should include meta project as dependency', () => \{
			    const cmd = cp.execSync('./bin/meta project').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			  it('should include meta yarn as dev dependency', () => \{
			    const cmd = cp.execSync('./bin/meta yarn').toString();
			    expect(cmd).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'mateodelnorte_meta\\__tests__\\plugins\\index.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
});
