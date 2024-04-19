const { extractFromSource } = require('../../src/extractor');

describe('jupyterlab_jupyterlab-git', () => {
    it('jupyterlab_jupyterlab-git\\tests\\commands.spec.tsx', () => {
        const sourceCode = `
			import \{ JupyterFrontEnd \} from '@jupyterlab/application';
			import \{ showDialog \} from '@jupyterlab/apputils';
			import \{ FileBrowserModel \} from '@jupyterlab/filebrowser';
			import \{ nullTranslator \} from '@jupyterlab/translation';
			import \{ CommandRegistry \} from '@lumino/commands';
			import 'jest';
			import \{ CommandArguments, addCommands \} from '../src/commandsAndMenu';
			import * as git from '../src/git';
			import \{ GitExtension \} from '../src/model';
			import \{ ContextCommandIDs, CommandIDs, Git \} from '../src/tokens';
			import \{
			  defaultMockedResponses,
			  DEFAULT_REPOSITORY_PATH,
			  IMockedResponses,
			  mockedRequestAPI
			\} from './utils';
			
			jest.mock('../src/git');
			jest.mock('@jupyterlab/apputils');
			jest.mock('@jupyterlab/filebrowser');
			
			describe('git-commands', () => \{
			  const mockGit = git as jest.Mocked<typeof git>;
			  let commands: CommandRegistry;
			  let model: GitExtension;
			  let mockResponses: IMockedResponses;
			
			  const mockedFileBrowserModel = \{
			    manager: \{
			      closeAll: jest
			        .fn<Promise<void>, any[]>()
			        .mockImplementation(() => Promise.resolve())
			    \}
			  \} as any as FileBrowserModel;
			
			  beforeEach(async () => \{
			    jest.restoreAllMocks();
			
			    mockResponses = \{
			      ...defaultMockedResponses
			    \};
			
			    mockGit.requestAPI.mockImplementation(mockedRequestAPI(mockResponses));
			
			    commands = new CommandRegistry();
			    const app = \{
			      commands,
			      shell: null as any
			    \};
			
			    model = new GitExtension(app as any);
			    addCommands(
			      app as JupyterFrontEnd,
			      model,
			      mockedFileBrowserModel,
			      null,
			      nullTranslator
			    );
			  \});
			
			  describe('git:context-discard', () => \{
			    ['staged', 'partially-staged', 'unstaged', 'untracked'].forEach(status => \{
			      [' ', 'M', 'A'].forEach(x => \{
			        it(\`status:\$\{status\} - x:\$\{x\} may reset and/or checkout\`, async () => \{
			          const mockDialog = showDialog as jest.MockedFunction<
			            typeof showDialog
			          >;
			          mockDialog.mockResolvedValue(\{
			            button: \{
			              accept: true,
			              actions: [],
			              caption: '',
			              className: '',
			              displayType: 'default',
			              iconClass: '',
			              iconLabel: '',
			              label: ''
			            \},
			            value: undefined
			          \});
			          const spyReset = jest.spyOn(model, 'reset');
			          spyReset.mockResolvedValueOnce(undefined);
			          const spyCheckout = jest.spyOn(model, 'checkout');
			          spyCheckout.mockResolvedValueOnce(undefined);
			
			          const path = 'file/path.ext';
			          model.pathRepository = DEFAULT_REPOSITORY_PATH;
			          await model.ready;
			
			          await commands.execute(ContextCommandIDs.gitFileDiscard, \{
			            files: [
			              \{
			                x,
			                y: ' ',
			                from: 'from',
			                to: path,
			                status: status as Git.Status,
			                is_binary: false
			              \}
			            ]
			          \} as CommandArguments.IGitContextAction as any);
			
			          if (status === 'staged' || status === 'partially-staged') \{
			            expect(spyReset).toHaveBeenCalledWith(path);
			          \} else if (status === 'unstaged') \{
			            expect(spyReset).not.toHaveBeenCalled();
			            expect(spyCheckout).toHaveBeenCalledWith(\{ filename: path \});
			          \} else if (status === 'partially-staged') \{
			            expect(spyReset).toHaveBeenCalledWith(path);
			            if (x !== 'A') \{
			              expect(spyCheckout).toHaveBeenCalledWith(\{ filename: path \});
			            \} else \{
			              expect(spyCheckout).not.toHaveBeenCalled();
			            \}
			          \}
			
			          spyReset.mockRestore();
			          spyCheckout.mockRestore();
			        \});
			      \});
			    \});
			  \});
			
			  describe('git:reset-to-remote', () => \{
			    [true, false].forEach(checked => \{
			      it(
			        checked
			          ? 'should close all opened files when the checkbox is checked'
			          : 'should not close all opened files when the checkbox is not checked',
			        async () => \{
			          const mockDialog = showDialog as jest.MockedFunction<
			            typeof showDialog
			          >;
			          mockDialog.mockResolvedValue(\{
			            button: \{
			              accept: true,
			              actions: [],
			              caption: '',
			              className: '',
			              displayType: 'default',
			              iconClass: '',
			              iconLabel: '',
			              label: ''
			            \},
			            value: \{
			              checked
			            \} as Git.ICheckboxFormValue
			          \});
			
			          const spyCloseAll = jest.spyOn(
			            mockedFileBrowserModel.manager,
			            'closeAll'
			          );
			          spyCloseAll.mockResolvedValueOnce(undefined);
			
			          mockGit.requestAPI.mockImplementation(
			            mockedRequestAPI(\{
			              ...mockResponses,
			              reset_to_commit: \{
			                body: () => \{
			                  return \{ code: 0 \};
			                \}
			              \}
			            \})
			          );
			
			          const path = DEFAULT_REPOSITORY_PATH;
			          model.pathRepository = path;
			          await model.ready;
			
			          await commands.execute(CommandIDs.gitResetToRemote);
			
			          if (checked) \{
			            expect(spyCloseAll).toHaveBeenCalled();
			          \} else \{
			            expect(spyCloseAll).not.toHaveBeenCalled();
			          \}
			
			          spyCloseAll.mockRestore();
			        \}
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\commands.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('jupyterlab_jupyterlab-git\\tests\\model.spec.tsx', () => {
        const sourceCode = `
			import \{ testEmission \} from '@jupyterlab/testutils';
			import 'jest';
			import * as git from '../src/git';
			import \{ GitExtension \} from '../src/model';
			import \{ Git, IGitExtension \} from '../src/tokens';
			import \{
			  defaultMockedResponses,
			  DEFAULT_REPOSITORY_PATH,
			  IMockedResponses,
			  mockedRequestAPI
			\} from './utils';
			
			jest.mock('../src/git');
			
			describe('IGitExtension', () => \{
			  const mockGit = git as jest.Mocked<typeof git>;
			  let model: IGitExtension;
			  const docmanager = jest.mock('@jupyterlab/docmanager') as any;
			  let mockResponses: IMockedResponses;
			
			  beforeEach(async () => \{
			    jest.restoreAllMocks();
			    docmanager.findWidget = jest.fn();
			    const docregistry = \{
			      getFileTypesForPath: jest.fn().mockReturnValue([])
			    \};
			
			    mockResponses = \{
			      responses: \{ ...defaultMockedResponses \}
			    \};
			
			    mockGit.requestAPI.mockImplementation(mockedRequestAPI(mockResponses));
			
			    model = new GitExtension(docmanager as any, docregistry as any);
			  \});
			
			  describe('#pathRepository', () => \{
			    it('should be null if not in a git repository', async () => \{
			      const path = DEFAULT_REPOSITORY_PATH;
			      expect(model.pathRepository).toBeNull();
			
			      model.pathRepository = path;
			      await model.ready;
			      expect(model.pathRepository).toBe(path);
			
			      model.pathRepository = null;
			      await model.ready;
			      expect(model.pathRepository).toBeNull();
			    \});
			
			    it('should be equal to the top repository folder', async () => \{
			      mockResponses.path = DEFAULT_REPOSITORY_PATH + '/subdir';
			
			      mockResponses.responses['show_prefix'] = \{
			        body: () => \{
			          return \{
			            code: 0,
			            path: 'subdir/'
			          \};
			        \}
			      \};
			
			      model.pathRepository = mockResponses.path;
			      await model.ready;
			      expect(model.pathRepository).toBe(DEFAULT_REPOSITORY_PATH);
			    \});
			
			    it('should not be ready before all requests have be processed.', async () => \{
			      mockResponses.path = DEFAULT_REPOSITORY_PATH + '/subdir';
			
			      expect(model.isReady).toBe(true);
			
			      model.pathRepository = mockResponses.path;
			      expect(model.isReady).toBe(false);
			      await model.ready;
			      expect(model.isReady).toBe(true);
			      expect(model.pathRepository).toBe(mockResponses.path);
			
			      model.pathRepository = mockResponses.path;
			      model.ready.then(() => \{
			        expect(model.isReady).toBe(false);
			      \});
			      model.pathRepository = null;
			      model.ready.then(() => \{
			        expect(model.isReady).toBe(false);
			      \});
			
			      mockResponses.path = DEFAULT_REPOSITORY_PATH;
			      model.pathRepository = mockResponses.path;
			      expect(model.isReady).toBe(false);
			      await model.ready;
			      expect(model.isReady).toBe(true);
			      expect(model.pathRepository).toBe(mockResponses.path);
			    \});
			
			    it('should emit repositoryChanged signal and request a refresh', async () => \{
			      let path = DEFAULT_REPOSITORY_PATH;
			
			      const testPathSignal = testEmission(model.repositoryChanged, \{
			        test: (model, change) => \{
			          expect(change.newValue).toBe(path);
			        \}
			      \});
			
			      model.pathRepository = path;
			      await model.ready;
			      await testPathSignal;
			
			      path = null;
			      model.pathRepository = path;
			      await model.ready;
			      await testPathSignal;
			    \});
			  \});
			
			  describe('#showPrefix', () => \{
			    it('should return a string if the folder is a git repository', async () => \{
			      const fakeRepo = 'cwd/';
			      mockResponses.path = 'repo/cwd';
			      mockResponses.responses['show_prefix'] = \{
			        body: () => \{
			          return \{ code: 0, path: fakeRepo \};
			        \}
			      \};
			      const relativePath = await model.showPrefix(mockResponses.path);
			      expect(relativePath).toEqual(fakeRepo);
			    \});
			
			    it('should return null if the repository is not a git repository', async () => \{
			      mockResponses.path = 'repo/cwd';
			      mockResponses.responses['show_prefix'] = \{
			        body: () => \{
			          return \{ code: 128, path: null \};
			        \},
			        status: 500
			      \};
			      const topLevel = await model.showPrefix(mockResponses.path);
			      expect(topLevel).toBeNull();
			    \});
			
			    it('should throw an exception if the server otherwise', async () => \{
			      mockResponses.path = 'repo/cwd';
			      mockResponses.responses['show_prefix'] = \{
			        body: () => \{
			          return \{ code: 128 \};
			        \},
			        status: 401
			      \};
			      try \{
			        await model.showPrefix(mockResponses.path);
			      \} catch (error) \{
			        expect(error).toBeInstanceOf(Git.GitResponseError);
			      \}
			    \});
			  \});
			
			  describe('#showTopLevel', () => \{
			    it('should return a string if the folder is a git repository', async () => \{
			      mockResponses.path = DEFAULT_REPOSITORY_PATH + '/cwd';
			      const fakeRepo = '/path/to/repo';
			      mockResponses.responses['show_top_level'] = \{
			        body: () => \{
			          return \{ code: 0, path: fakeRepo \};
			        \}
			      \};
			      const topLevel = await model.showTopLevel(mockResponses.path);
			      expect(topLevel).toEqual(fakeRepo);
			    \});
			
			    it('should return null if the repository is not a git repository', async () => \{
			      mockResponses.path = DEFAULT_REPOSITORY_PATH + '/cwd';
			      mockResponses.responses['show_top_level'] = \{
			        body: () => \{
			          return \{ code: 128 \};
			        \},
			        status: 500
			      \};
			      const topLevel = await model.showTopLevel(mockResponses.path);
			      expect(topLevel).toBeNull();
			    \});
			
			    it('should throw an exception if the server otherwise', async () => \{
			      mockResponses.path = DEFAULT_REPOSITORY_PATH + '/cwd';
			      mockResponses.responses['show_top_level'] = \{
			        body: () => \{
			          return \{ code: 128 \};
			        \},
			        status: 401
			      \};
			      try \{
			        await model.showTopLevel(mockResponses.path);
			      \} catch (error) \{
			        expect(error).toBeInstanceOf(Git.GitResponseError);
			      \}
			    \});
			  \});
			
			  describe('#status', () => \{
			    it('should be clear if not in a git repository', async () => \{
			      let status: Partial<Git.IStatusResult> = \{
			        branch: null,
			        remote: null,
			        ahead: 0,
			        behind: 0,
			        files: []
			      \};
			
			      mockResponses.responses['status'] = \{
			        body: () => \{
			          return \{ code: 0, ...status \} as any;
			        \}
			      \};
			      expect(model.pathRepository).toBeNull();
			      expect(model.status.branch).toBeNull();
			      expect(model.status.files).toHaveLength(0);
			
			      model.pathRepository = DEFAULT_REPOSITORY_PATH;
			      const branch = 'master';
			      await model.ready;
			      status = \{
			        branch,
			        remote: null,
			        ahead: 0,
			        behind: 0,
			        files: [\{ x: '', y: '', from: '', to: '', is_binary: null \}]
			      \};
			      await model.refreshStatus();
			      expect(model.status.branch).toEqual(branch);
			      expect(model.status.files).toHaveLength(1);
			
			      model.pathRepository = null;
			      await model.ready;
			      await model.refreshStatus();
			      expect(model.status.branch).toBeNull();
			      expect(model.status.files).toHaveLength(0);
			    \});
			
			    it('should emit a signal if when set', async () => \{
			      const branch = 'master';
			      const status: Partial<Git.IStatusResult> = \{
			        branch,
			        remote: null,
			        ahead: 0,
			        behind: 0,
			        files: [\{ x: '', y: '', from: '', to: '', is_binary: null \}]
			      \};
			
			      mockResponses.responses['status'] = \{
			        body: () => \{
			          return \{ code: 0, ...status \} as any;
			        \}
			      \};
			
			      const testSignal = testEmission(model.statusChanged, \{
			        test: (model, receivedStatus) => \{
			          expect(receivedStatus.branch).toEqual(branch);
			          expect(receivedStatus.files).toHaveLength(status.files.length);
			          expect(receivedStatus.files[0]).toMatchObject<Git.IStatusFileResult>(\{
			            ...status.files[0]
			          \});
			        \}
			      \});
			
			      model.pathRepository = DEFAULT_REPOSITORY_PATH;
			      await model.ready;
			
			      await model.refreshStatus();
			      await testSignal;
			    \});
			  \});
			
			  describe('#getFile', () => \{
			    it.each([
			      ['dir1/dir2/repo/somefolder/file', 'somefolder/file', 'dir1/dir2/repo'],
			      ['repo/file', 'file', 'repo'],
			      ['repo/somefolder/file', 'somefolder/file', 'repo'],
			      ['somefolder/file', 'somefolder/file', ''],
			      ['file', 'file', ''],
			      ['file', null, null],
			      ['other_repo/file', null, 'repo'],
			      ['root/other_repo/file', null, 'root/repo']
			    ])(
			      '%s should return unmodified status with path relative to the repository',
			      async (path, expected, repo) => \{
			        // Given
			        mockResponses.path = repo;
			        model.pathRepository = repo;
			        await model.ready;
			        // When
			        const status = model.getFile(path);
			        // Then
			        if (expected === null) \{
			          expect(status).toBeNull();
			        \} else \{
			          expect(status.status).toEqual('unmodified');
			          expect(status.to).toEqual(expected);
			        \}
			      \}
			    );
			  \});
			
			  describe('#getRelativeFilePath', () => \{
			    it.each([
			      ['somefolder/file', 'dir1/dir2/repo', 'dir1/dir2/repo/somefolder/file'],
			      ['file', 'repo', 'repo/file'],
			      ['somefolder/file', 'repo', 'repo/somefolder/file'],
			      ['somefolder/file', '', 'somefolder/file'],
			      ['file', '', 'file'],
			      ['file', null, null]
			    ])(
			      '%s should return relative path correctly ',
			      async (path, repo, expected) => \{
			        // Given
			        mockResponses.path = repo;
			        model.pathRepository = repo;
			        await model.ready;
			        // When
			        const relativePath = model.getRelativeFilePath(path);
			        // Then
			        expect(relativePath).toEqual(expected);
			      \}
			    );
			  \});
			
			  describe('#checkout', () => \{
			    it('should emit headChanged signal if checkout branch', async () => \{
			      mockResponses.responses['checkout'] = \{
			        body: () => \{
			          return \{\};
			        \}
			      \};
			      mockResponses.responses['branch'] = \{
			        body: () => \{
			          return \{
			            code: 0,
			            branches: [
			              \{
			                is_current_branch: true,
			                is_remote_branch: false,
			                name: 'master',
			                upstream: null,
			                top_commit: '52263564aac988a0888060becc3c76d1023e680f',
			                tag: null
			              \},
			              \{
			                is_current_branch: false,
			                is_remote_branch: false,
			                name: 'test-branch',
			                upstream: null,
			                top_commit: '52263564aac988a0888060becc3c76d1023e680f',
			                tag: null
			              \}
			            ],
			            current_branch: \{
			              is_current_branch: true,
			              is_remote_branch: false,
			              name: 'master',
			              upstream: null,
			              top_commit: '52263564aac988a0888060becc3c76d1023e680f',
			              tag: null
			            \}
			          \};
			        \}
			      \};
			      mockResponses.responses['changed_files'] = \{
			        body: () => \{
			          return \{
			            code: 0,
			            files: ['']
			          \};
			        \}
			      \};
			
			      model.pathRepository = DEFAULT_REPOSITORY_PATH;
			      await model.ready;
			
			      const testSignal = testEmission(model.headChanged, \{
			        test: (model, _) => \{
			          expect(_).toBeUndefined();
			        \}
			      \});
			
			      await model.refreshBranch();
			      await model.checkout(\{ branchname: 'test-branch' \});
			      await testSignal;
			    \});
			  \});
			
			  describe('#pull', () => \{
			    it('should refresh branches if successful', async () => \{
			      const spy = jest.spyOn(GitExtension.prototype, 'refreshBranch');
			      mockResponses.responses['pull'] = \{
			        body: () => null
			      \};
			
			      model.pathRepository = DEFAULT_REPOSITORY_PATH;
			      await model.ready;
			
			      await model.pull();
			      expect(spy).toHaveBeenCalledTimes(1);
			      expect(spy).toHaveBeenCalledWith();
			
			      spy.mockReset();
			      spy.mockRestore();
			    \});
			  \});
			
			  describe('#push', () => \{
			    it('should refresh branches  if successful', async () => \{
			      const spy = jest.spyOn(GitExtension.prototype, 'refreshBranch');
			      mockResponses.responses['push'] = \{
			        body: () => null
			      \};
			
			      model.pathRepository = DEFAULT_REPOSITORY_PATH;
			      await model.ready;
			
			      await model.push();
			      expect(spy).toHaveBeenCalledTimes(1);
			      expect(spy).toHaveBeenCalledWith();
			
			      spy.mockReset();
			      spy.mockRestore();
			    \});
			  \});
			
			  describe('#resetToCommit', () => \{
			    it('should refresh branches if successfully reset to commit', async () => \{
			      const spy = jest.spyOn(GitExtension.prototype, 'refreshBranch');
			      mockResponses.responses['reset_to_commit'] = \{
			        body: () => null
			      \};
			      mockResponses.responses['changed_files'] = \{
			        body: () => \{
			          return \{
			            code: 0,
			            files: ['made-up-file.md']
			          \};
			        \}
			      \};
			
			      model.pathRepository = DEFAULT_REPOSITORY_PATH;
			      await model.ready;
			
			      await model.resetToCommit('dummyhash');
			      expect(spy).toHaveBeenCalledTimes(1);
			      expect(spy).toHaveBeenCalledWith();
			
			      spy.mockReset();
			      spy.mockRestore();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\model.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(16)
    });
    it('jupyterlab_jupyterlab-git\\tests\\plugin.spec.ts', () => {
        const sourceCode = `
			import 'jest';
			import * as git from '../src/git';
			import plugins from '../src/index';
			import \{ version \} from '../src/version';
			import \{ ISettingRegistry, SettingRegistry \} from '@jupyterlab/settingregistry';
			import \{ JupyterLab \} from '@jupyterlab/application';
			import \{ showErrorMessage \} from '@jupyterlab/apputils';
			import \{ URLExt \} from '@jupyterlab/coreutils';
			import \{
			  defaultMockedResponses,
			  IMockedResponses,
			  mockedRequestAPI
			\} from './utils';
			
			jest.mock('../src/git');
			jest.mock('@jupyterlab/application');
			jest.mock('@jupyterlab/apputils');
			jest.mock('@jupyterlab/settingregistry');
			
			const plugin = plugins[0];
			
			describe('plugin', () => \{
			  const mockGit = git as jest.Mocked<typeof git>;
			  let app: jest.Mocked<JupyterLab>;
			  let mockResponses: IMockedResponses = \{\};
			  let settingRegistry: jest.Mocked<ISettingRegistry>;
			
			  beforeAll(() => \{
			    app = new JupyterLab() as jest.Mocked<JupyterLab>;
			    settingRegistry = new SettingRegistry(\{
			      connector: null
			    \}) as jest.Mocked<SettingRegistry>;
			  \});
			
			  beforeEach(() => \{
			    jest.resetAllMocks();
			    mockResponses = \{ responses: \{ ...defaultMockedResponses \} \};
			    mockGit.requestAPI.mockImplementation(mockedRequestAPI(mockResponses));
			  \});
			
			  describe('#activate', () => \{
			    it('should fail if no git is installed', async () => \{
			      // Given
			      const endpoint = 'settings' + URLExt.objectToQueryString(\{ version \});
			      mockResponses.responses[endpoint] = \{
			        body: request => \{
			          return \{
			            gitVersion: null,
			            frontendVersion: version,
			            serverVersion: version
			          \};
			        \}
			      \};
			      const mockedErrorMessage = showErrorMessage as jest.MockedFunction<
			        typeof showErrorMessage
			      >;
			
			      // When
			      const extension = await plugin.activate(
			        app,
			        null,
			        null,
			        \{ tracker: \{ currentWidget: null \} \},
			        null,
			        settingRegistry
			      );
			
			      // Then
			      expect(extension).toBeNull(); // Token is null
			      expect(mockedErrorMessage).toHaveBeenCalledWith(
			        'Failed to load the jupyterlab-git server extension',
			        'git command not found - please ensure you have Git > 2 installed',
			        [undefined] // The warning button is undefined as the module @jupyterlab/apputils is mocked
			      );
			    \});
			
			    it('should fail if git version is < 2', async () => \{
			      // Given
			      const endpoint = 'settings' + URLExt.objectToQueryString(\{ version \});
			      mockResponses.responses[endpoint] = \{
			        body: request => \{
			          return \{
			            gitVersion: '1.8.7',
			            frontendVersion: version,
			            serverVersion: version
			          \};
			        \}
			      \};
			      const mockedErrorMessage = showErrorMessage as jest.MockedFunction<
			        typeof showErrorMessage
			      >;
			
			      // When
			      const extension = await plugin.activate(
			        app,
			        null,
			        null,
			        \{ tracker: \{ currentWidget: null \} \},
			        null,
			        settingRegistry
			      );
			
			      // Then
			      expect(extension).toBeNull(); // Token is null
			      expect(mockedErrorMessage).toHaveBeenCalledWith(
			        'Failed to load the jupyterlab-git server extension',
			        'git command version must be > 2; got 1.8.7.',
			        [undefined] // The warning button is undefined as the module @jupyterlab/apputils is mocked
			      );
			    \});
			    it('should fail if server and extension version do not match', async () => \{
			      // Given
			      const endpoint = 'settings' + URLExt.objectToQueryString(\{ version \});
			      mockResponses.responses[endpoint] = \{
			        body: request => \{
			          return \{
			            gitVersion: '2.22.0',
			            frontendVersion: version,
			            serverVersion: '0.1.0'
			          \};
			        \}
			      \};
			      const mockedErrorMessage = showErrorMessage as jest.MockedFunction<
			        typeof showErrorMessage
			      >;
			
			      // When
			      const extension = await plugin.activate(
			        app,
			        null,
			        null,
			        \{ tracker: \{ currentWidget: null \} \},
			        null,
			        settingRegistry
			      );
			
			      // Then
			      expect(extension).toBeNull(); // Token is null
			      expect(mockedErrorMessage).toHaveBeenCalledWith(
			        'Failed to load the jupyterlab-git server extension',
			        'The versions of the JupyterLab Git server frontend and backend do not match. ' +
			          \`The @jupyterlab/git frontend extension has version: \$\{version\} \` +
			          'while the python package has version 0.1.0. ' +
			          'Please install identical version of jupyterlab-git Python package and the @jupyterlab/git extension. Try running: pip install --upgrade jupyterlab-git',
			        [undefined] // The warning button is undefined as the module @jupyterlab/apputils is mocked
			      );
			    \});
			    it('should fail if the server extension is not installed', async () => \{
			      // Given
			      const endpoint = 'settings' + URLExt.objectToQueryString(\{ version \});
			      mockResponses.responses[endpoint] = \{
			        status: 404
			      \};
			      const mockedErrorMessage = showErrorMessage as jest.MockedFunction<
			        typeof showErrorMessage
			      >;
			
			      // When
			      const extension = await plugin.activate(
			        app,
			        null,
			        null,
			        \{ tracker: \{ currentWidget: null \} \},
			        null,
			        settingRegistry
			      );
			
			      // Then
			      expect(extension).toBeNull(); // Token is null
			      expect(mockedErrorMessage).toHaveBeenCalledWith(
			        'Failed to load the jupyterlab-git server extension',
			        'Git server extension is unavailable. Please ensure you have installed the ' +
			          'JupyterLab Git server extension by running: pip install --upgrade jupyterlab-git. ' +
			          'To confirm that the server extension is installed, run: jupyter server extension list.',
			        [undefined] // The warning button is undefined as the module @jupyterlab/apputils is mocked
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\plugin.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\BranchMenu.spec.tsx', () => {
        const sourceCode = `
			import \{ mount, render, shallow \} from 'enzyme';
			import \{ showDialog \} from '@jupyterlab/apputils';
			import 'jest';
			import * as React from 'react';
			import \{ ActionButton \} from '../../src/components/ActionButton';
			import \{ BranchMenu, IBranchMenuProps \} from '../../src/components/BranchMenu';
			import * as git from '../../src/git';
			import \{ Logger \} from '../../src/logger';
			import \{ GitExtension \} from '../../src/model';
			import \{ listItemClass, nameClass \} from '../../src/style/BranchMenu';
			import \{
			  mockedRequestAPI,
			  defaultMockedResponses,
			  DEFAULT_REPOSITORY_PATH
			\} from '../utils';
			import ClearIcon from '@material-ui/icons/Clear';
			import \{ nullTranslator \} from '@jupyterlab/translation';
			
			jest.mock('../../src/git');
			jest.mock('@jupyterlab/apputils');
			
			const BRANCHES = [
			  \{
			    is_current_branch: true,
			    is_remote_branch: false,
			    name: 'master',
			    upstream: '',
			    top_commit: '',
			    tag: ''
			  \},
			  \{
			    is_current_branch: false,
			    is_remote_branch: false,
			    name: 'feature-1',
			    upstream: '',
			    top_commit: '',
			    tag: ''
			  \},
			  \{
			    is_current_branch: false,
			    is_remote_branch: false,
			    name: 'feature-2',
			    upstream: '',
			    top_commit: '',
			    tag: ''
			  \},
			  \{
			    is_current_branch: false,
			    is_remote_branch: true,
			    name: 'patch-007',
			    upstream: 'origin/patch-007',
			    top_commit: '',
			    tag: ''
			  \}
			];
			
			async function createModel() \{
			  const model = new GitExtension();
			  model.pathRepository = DEFAULT_REPOSITORY_PATH;
			
			  await model.ready;
			  return model;
			\}
			
			describe('BranchMenu', () => \{
			  let model: GitExtension;
			  const trans = nullTranslator.load('jupyterlab_git');
			
			  beforeEach(async () => \{
			    jest.restoreAllMocks();
			
			    const mock = git as jest.Mocked<typeof git>;
			    mock.requestAPI.mockImplementation(
			      mockedRequestAPI(\{
			        ...defaultMockedResponses,
			        'branch/delete': \{
			          body: () => \{
			            return \{ code: 0 \};
			          \}
			        \},
			        checkout: \{
			          body: () => \{
			            return \{
			              code: 0
			            \};
			          \}
			        \}
			      \})
			    );
			
			    model = await createModel();
			  \});
			
			  function createProps(props?: Partial<IBranchMenuProps>): IBranchMenuProps \{
			    return \{
			      currentBranch: BRANCHES[0].name,
			      branches: BRANCHES,
			      model: model,
			      branching: false,
			      commands: \{
			        execute: jest.fn()
			      \} as any,
			      logger: new Logger(),
			      trans: trans,
			      ...props
			    \};
			  \}
			
			  describe('constructor', () => \{
			    it('should return a new instance', () => \{
			      const menu = shallow(<BranchMenu \{...createProps()\} />);
			      expect(menu.instance()).toBeInstanceOf(BranchMenu);
			    \});
			
			    it('should set the default menu filter to an empty string', () => \{
			      const menu = shallow(<BranchMenu \{...createProps()\} />);
			      expect(menu.state('filter')).toEqual('');
			    \});
			
			    it('should set the default flag indicating whether to show a dialog to create a new branch to \`false\`', () => \{
			      const menu = shallow(<BranchMenu \{...createProps()\} />);
			      expect(menu.state('branchDialog')).toEqual(false);
			    \});
			  \});
			
			  describe('render', () => \{
			    it('should display placeholder text for the menu filter', () => \{
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			      const node = component.find('input[type="text"]').first();
			      expect(node.prop('placeholder')).toEqual('Filter');
			    \});
			
			    it('should set a \`title\` attribute on the input element to filter a branch menu', () => \{
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			      const node = component.find('input[type="text"]').first();
			      expect(node.prop('title').length > 0).toEqual(true);
			    \});
			
			    it('should display a button to clear the menu filter once a filter is provided', () => \{
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			      component.setState(\{
			        filter: 'foo'
			      \});
			      const nodes = component.find(ClearIcon);
			      expect(nodes.length).toEqual(1);
			    \});
			
			    it('should set a \`title\` on the button to clear the menu filter', () => \{
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			      component.setState(\{
			        filter: 'foo'
			      \});
			      const html = component.find(ClearIcon).first().html();
			      expect(html.includes('<title>')).toEqual(true);
			    \});
			
			    it('should display a button to create a new branch', () => \{
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			      const node = component.find('input[type="button"]').first();
			      expect(node.prop('value')).toEqual('New Branch');
			    \});
			
			    it('should set a \`title\` attribute on the button to create a new branch', () => \{
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			      const node = component.find('input[type="button"]').first();
			      expect(node.prop('title').length > 0).toEqual(true);
			    \});
			
			    it('should display a list of branches', () => \{
			      const component = render(<BranchMenu \{...createProps()\} />);
			      const nodes = component.find(\`.\$\{nameClass\}\`);
			
			      const branches = BRANCHES;
			      expect(nodes.length).toEqual(branches.length);
			
			      // Should contain the branch names...
			      for (let i = 0; i < branches.length; i++) \{
			        // @ts-ignore
			        expect(nodes[i].lastChild.data).toEqual(branches[i].name);
			      \}
			    \});
			
			    [
			      \{
			        is_current_branch: true,
			        is_remote_branch: false,
			        name: 'current',
			        upstream: '',
			        top_commit: '',
			        tag: ''
			      \},
			      \{
			        is_current_branch: false,
			        is_remote_branch: false,
			        name: 'master',
			        upstream: '',
			        top_commit: '',
			        tag: ''
			      \},
			      \{
			        is_current_branch: false,
			        is_remote_branch: true,
			        name: 'master',
			        upstream: '',
			        top_commit: '',
			        tag: ''
			      \}
			    ].forEach(branch => \{
			      const display = !(branch.is_current_branch || branch.is_remote_branch);
			      it(\`should\$\{
			        display ? ' ' : 'not '
			      \}display delete and merge buttons for \$\{JSON.stringify(branch)\}\`, () => \{
			        const menu = mount(
			          <BranchMenu
			            \{...createProps(\{
			              currentBranch: 'current',
			              branches: [branch]
			            \})\}
			          />
			        );
			
			        const item = menu.find(\`.\$\{listItemClass\}\`);
			
			        expect(item.find(ActionButton).length).toEqual(display ? 2 : 0);
			      \});
			    \});
			
			    it('should call delete branch when clicked on the delete button', async () => \{
			      const mockDialog = showDialog as jest.MockedFunction<typeof showDialog>;
			      let resolveDialog: (value?: unknown) => void;
			      const waitOnDialog = new Promise(resolve => \{
			        resolveDialog = resolve;
			      \});
			      mockDialog.mockImplementation(() => \{
			        resolveDialog();
			        return Promise.resolve(\{
			          button: \{
			            accept: true,
			            actions: [],
			            caption: '',
			            className: '',
			            displayType: 'default',
			            iconClass: '',
			            iconLabel: '',
			            label: ''
			          \},
			          value: undefined
			        \});
			      \});
			
			      const spy = jest.spyOn(GitExtension.prototype, 'deleteBranch');
			      const branchName = 'master';
			
			      const menu = mount(
			        <BranchMenu
			          \{...createProps(\{
			            currentBranch: 'current',
			            branches: [
			              \{
			                is_current_branch: false,
			                is_remote_branch: false,
			                name: branchName,
			                upstream: '',
			                top_commit: '',
			                tag: ''
			              \}
			            ]
			          \})\}
			        />
			      );
			
			      const item = menu.find(\`.\$\{listItemClass\}\`);
			      const button = item.find(ActionButton);
			      button.at(0).simulate('click');
			
			      // Need to wait that the dialog is resolve so 'deleteBranch' is called before
			      // this test ends.
			      await waitOnDialog;
			
			      expect(spy).toHaveBeenCalledTimes(1);
			      expect(spy).toHaveBeenCalledWith(branchName);
			      spy.mockRestore();
			    \});
			
			    it('should call merge branch when clicked on the merge button', async () => \{
			      const branchName = 'master';
			      const fakeExecutioner = jest.fn();
			
			      const menu = mount(
			        <BranchMenu
			          \{...createProps(\{
			            currentBranch: 'current',
			            branches: [
			              \{
			                is_current_branch: false,
			                is_remote_branch: false,
			                name: branchName,
			                upstream: '',
			                top_commit: '',
			                tag: ''
			              \}
			            ],
			            commands: \{
			              execute: fakeExecutioner
			            \} as any
			          \})\}
			        />
			      );
			
			      const item = menu.find(\`.\$\{listItemClass\}\`);
			      const button = item.find(ActionButton);
			      button.at(1).simulate('click');
			
			      expect(fakeExecutioner).toHaveBeenCalledTimes(1);
			      expect(fakeExecutioner).toHaveBeenCalledWith('git:merge', \{branch: branchName\});
			    \});
			
			    it('should set a \`title\` attribute for each displayed branch', () => \{
			      const component = render(<BranchMenu \{...createProps()\} />);
			      const nodes = component.find(\`.\$\{listItemClass\}\`);
			
			      const branches = BRANCHES;
			      expect(nodes.length).toEqual(branches.length);
			
			      for (let i = 0; i < branches.length; i++) \{
			        // @ts-ignore
			        expect(nodes[i].attribs['title'].length).toBeGreaterThanOrEqual(0);
			      \}
			    \});
			
			    it('should not, by default, show a dialog to create a new branch', () => \{
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			      const node = component.find('NewBranchDialog').first();
			      expect(node.prop('open')).toEqual(false);
			    \});
			
			    it('should show a dialog to create a new branch when the flag indicating whether to show the dialog is \`true\`', () => \{
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			      component.setState(\{
			        branchDialog: true
			      \});
			      const node = component.find('NewBranchDialog').first();
			      expect(node.prop('open')).toEqual(true);
			    \});
			  \});
			
			  describe('switch branch', () => \{
			    it('should not switch to a specified branch upon clicking its corresponding element when branching is disabled', () => \{
			      const spy = jest.spyOn(GitExtension.prototype, 'checkout');
			
			      const component = mount(<BranchMenu \{...createProps()\} />);
			      const nodes = component.find(
			        \`.\$\{listItemClass\}[title*="\$\{BRANCHES[1].name\}"]\`
			      );
			      nodes.at(0).simulate('click');
			
			      expect(spy).toHaveBeenCalledTimes(0);
			      spy.mockRestore();
			    \});
			
			    it('should switch to a specified branch upon clicking its corresponding element when branching is enabled', () => \{
			      const spy = jest.spyOn(GitExtension.prototype, 'checkout');
			
			      const component = mount(
			        <BranchMenu \{...createProps(\{ branching: true \})\} />
			      );
			      const nodes = component.find(
			        \`.\$\{listItemClass\}[title*="\$\{BRANCHES[1].name\}"]\`
			      );
			      nodes.at(0).simulate('click');
			
			      expect(spy).toHaveBeenCalledTimes(1);
			      expect(spy).toHaveBeenCalledWith(\{
			        branchname: BRANCHES[1].name
			      \});
			
			      spy.mockRestore();
			    \});
			  \});
			
			  describe('create branch', () => \{
			    it('should not allow creating a new branch when branching is disabled', () => \{
			      const spy = jest.spyOn(GitExtension.prototype, 'checkout');
			
			      const component = shallow(<BranchMenu \{...createProps()\} />);
			
			      const node = component.find('input[type="button"]').first();
			      node.simulate('click');
			
			      expect(component.state('branchDialog')).toEqual(false);
			      expect(spy).toHaveBeenCalledTimes(0);
			      spy.mockRestore();
			    \});
			
			    it('should display a dialog to create a new branch when branching is enabled and the new branch button is clicked', () => \{
			      const spy = jest.spyOn(GitExtension.prototype, 'checkout');
			
			      const component = shallow(
			        <BranchMenu \{...createProps(\{ branching: true \})\} />
			      );
			
			      const node = component.find('input[type="button"]').first();
			      node.simulate('click');
			
			      expect(component.state('branchDialog')).toEqual(true);
			      expect(spy).toHaveBeenCalledTimes(0);
			      spy.mockRestore();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\BranchMenu.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(20)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\CommitBox.spec.tsx', () => {
        const sourceCode = `
			import \{ nullTranslator \} from '@jupyterlab/translation';
			import \{ CommandRegistry \} from '@lumino/commands';
			import Button from '@material-ui/core/Button';
			import \{ shallow \} from 'enzyme';
			import 'jest';
			import * as React from 'react';
			import \{ CommitBox, ICommitBoxProps \} from '../../src/components/CommitBox';
			import \{ CommitMessage \} from '../../src/components/CommitMessage';
			import \{ WarningBox \} from '../../src/components/WarningBox';
			import \{ CommandIDs \} from '../../src/tokens';
			
			describe('CommitBox', () => \{
			  const defaultCommands = new CommandRegistry();
			  defaultCommands.addKeyBinding(\{
			    keys: ['Accel Enter'],
			    command: CommandIDs.gitSubmitCommand,
			    selector: '.jp-git-CommitBox'
			  \});
			
			  const trans = nullTranslator.load('jupyterlab_git');
			
			  const defaultProps: ICommitBoxProps = \{
			    onCommit: async () => \{\},
			    setSummary: () => \{\},
			    setDescription: () => \{\},
			    setAmend: () => \{\},
			    summary: '',
			    description: '',
			    amend: false,
			    hasFiles: false,
			    commands: defaultCommands,
			    trans: trans,
			    label: 'Commit'
			  \};
			
			  describe('#constructor()', () => \{
			    it('should return a new instance', () => \{
			      const box = new CommitBox(defaultProps);
			      expect(box).toBeInstanceOf(CommitBox);
			    \});
			  \});
			
			  describe('#render()', () => \{
			    it('should display placeholder text for the commit message summary', () => \{
			      const props = defaultProps;
			      const component = shallow(<CommitBox \{...props\} />);
			      const node = component.find(CommitMessage);
			      expect(node.prop('summaryPlaceholder')).toEqual(
			        'Summary (Ctrl+Enter to commit)'
			      );
			    \});
			
			    it('should adjust placeholder text for the commit message summary when keybinding changes', () => \{
			      const adjustedCommands = new CommandRegistry();
			      adjustedCommands.addKeyBinding(\{
			        keys: ['Shift Enter'],
			        command: CommandIDs.gitSubmitCommand,
			        selector: '.jp-git-CommitBox'
			      \});
			      const props = \{
			        ...defaultProps,
			        commands: adjustedCommands
			      \};
			      const component = shallow(<CommitBox \{...props\} />);
			      const node = component.find(CommitMessage);
			      expect(node.prop('summaryPlaceholder')).toEqual(
			        'Summary (Shift+Enter to commit)'
			      );
			    \});
			
			    it('should display a button to commit changes', () => \{
			      const props = defaultProps;
			      const component = shallow(<CommitBox \{...props\} />);
			      const node = component.find(Button).first();
			      expect(node.text()).toEqual('Commit');
			    \});
			
			    it('should set a \`title\` attribute on the button to commit changes', () => \{
			      const props = defaultProps;
			      const component = shallow(<CommitBox \{...props\} />);
			      const node = component.find(Button).first();
			      expect(node.prop('title').length > 0).toEqual(true);
			    \});
			
			    it('should apply a class to disable the commit button when no files have changes to commit', () => \{
			      const props = defaultProps;
			      const component = shallow(<CommitBox \{...props\} />);
			      const node = component.find(Button).first();
			      const prop = node.prop('disabled');
			      expect(prop).toEqual(true);
			    \});
			
			    it('should apply a class to disable the commit button when files have changes to commit, but the user has not entered a commit message summary', () => \{
			      const props = \{
			        ...defaultProps,
			        hasFiles: true
			      \};
			      const component = shallow(<CommitBox \{...props\} />);
			      const node = component.find(Button).first();
			      const prop = node.prop('disabled');
			      expect(prop).toEqual(true);
			    \});
			
			    it('should not apply a class to disable the commit button when files have changes to commit and the user has entered a commit message summary', () => \{
			      const props = \{
			        ...defaultProps,
			        summary: 'beep boop',
			        hasFiles: true
			      \};
			      const component = shallow(<CommitBox \{...props\} />);
			      const node = component.find(Button).first();
			      const prop = node.prop('disabled');
			      expect(prop).toEqual(false);
			    \});
			
			    it('should apply a class to disable the commit input fields in amend mode', () => \{
			      const props = \{
			        ...defaultProps,
			        summary: 'beep boop',
			        amend: true
			      \};
			      const component = shallow(<CommitBox \{...props\} />);
			      expect(component.find(CommitMessage).length).toEqual(0);
			    \});
			
			    it('should not apply a class to disable the commit button in amend mode', () => \{
			      const props = \{
			        ...defaultProps,
			        hasFiles: true,
			        amend: true
			      \};
			      const component = shallow(<CommitBox \{...props\} />);
			      const node = component.find(Button).first();
			      const prop = node.prop('disabled');
			      expect(prop).toEqual(false);
			    \});
			
			    it('should render a warning box when there are dirty staged files', () => \{
			      const props = \{
			        ...defaultProps,
			        warning: <WarningBox title="Warning" content="Warning content."></WarningBox>
			      \};
			      const component = shallow(<CommitBox \{...props\} />);
			      expect(component.find(WarningBox).length).toEqual(1);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\CommitBox.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\CommitMessage.spec.tsx', () => {
        const sourceCode = `
			import \{ nullTranslator \} from '@jupyterlab/translation';
			import Input from '@material-ui/core/Input';
			import \{ shallow \} from 'enzyme';
			import 'jest';
			import * as React from 'react';
			import \{
			  CommitMessage,
			  ICommitMessageProps
			\} from '../../src/components/CommitMessage';
			
			describe('CommitMessage', () => \{
			  const trans = nullTranslator.load('jupyterlab_git');
			
			  const defaultProps: ICommitMessageProps = \{
			    setSummary: () => \{\},
			    setDescription: () => \{\},
			    summary: '',
			    description: '',
			    trans: trans
			  \};
			
			  it('should set a \`title\` attribute on the input element to provide a commit message summary', () => \{
			    const props = defaultProps;
			    const component = shallow(<CommitMessage \{...props\} />);
			    const node = component.find(Input).first();
			    expect(node.prop('title').length > 0).toEqual(true);
			  \});
			
			  it('should display placeholder text for the commit message description', () => \{
			    const props = defaultProps;
			    const component = shallow(<CommitMessage \{...props\} />);
			    const node = component.find(Input).last();
			    expect(node.prop('placeholder')).toEqual('Description (optional)');
			  \});
			
			  it('should set a \`title\` attribute on the input element to provide a commit message description', () => \{
			    const props = defaultProps;
			    const component = shallow(<CommitMessage \{...props\} />);
			    const node = component.find(Input).last();
			    expect(node.prop('title').length > 0).toEqual(true);
			  \});
			
			  it('should disable summary input if disabled is true', () => \{
			    const props = \{ ...defaultProps, disabled: true \};
			    const component = shallow(<CommitMessage \{...props\} />);
			    const node = component.find(Input).first();
			    expect(node.prop('disabled')).toEqual(true);
			  \});
			
			  it('should disable description input if disabled is true', () => \{
			    const props = \{ ...defaultProps, disabled: true \};
			    const component = shallow(<CommitMessage \{...props\} />);
			    const node = component.find(Input).last();
			    expect(node.prop('disabled')).toEqual(true);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\CommitMessage.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\DiffModel.spec.tsx', () => {
        const sourceCode = `
			import \{ testEmission \} from '@jupyterlab/testutils';
			import 'jest';
			import \{ DiffModel \} from '../../src/components/diff/model';
			import \{ Git \} from '../../src/tokens';
			
			describe('DiffModel', () => \{
			  let model: DiffModel;
			
			  /**
			   * Helper to test changed signal.
			   */
			  const testChangedSignal = (type: Git.Diff.IModelChange['type']) =>
			    testEmission(model.changed, \{
			      test: (_, change) => \{
			        expect(change.type).toEqual(type);
			      \}
			    \});
			
			  beforeEach(() => \{
			    model = new DiffModel(\{
			      filename: 'KrabbyPattySecretFormula.txt',
			      repositoryPath: '/',
			      challenger: \{
			        content: () => Promise.resolve('content'),
			        label: 'challenger',
			        source: 'challenger'
			      \},
			      reference: \{
			        content: () => Promise.resolve('content'),
			        label: 'reference',
			        source: 'reference'
			      \}
			    \});
			  \});
			
			  it('should emit a signal if reference changes', async () => \{
			    const testReference = testChangedSignal('reference');
			
			    model.reference = \{
			      content: () => Promise.resolve('content2'),
			      label: 'reference2',
			      source: 'reference2'
			    \};
			
			    await testReference;
			  \});
			
			  it('should emit a signal if challenger changes', async () => \{
			    const testChallenger = testChangedSignal('challenger');
			
			    model.challenger = \{
			      content: () => Promise.resolve('content2'),
			      label: 'challenger2',
			      source: 'challenger2'
			    \};
			
			    await testChallenger;
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\DiffModel.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\FileItem.spec.tsx', () => {
        const sourceCode = `
			import \{ FileItem, IFileItemProps \} from '../../src/components/FileItem';
			import * as React from 'react';
			import 'jest';
			import \{ shallow \} from 'enzyme';
			import \{ nullTranslator \} from '@jupyterlab/translation';
			
			describe('FileItem', () => \{
			  const trans = nullTranslator.load('jupyterlab_git');
			
			  const props: IFileItemProps = \{
			    contextMenu: () => \{\},
			    file: \{
			      x: '',
			      y: 'M',
			      to: 'some/file/path/file-name',
			      from: '',
			      is_binary: null,
			      status: null
			    \},
			    model: null,
			    onDoubleClick: () => \{\},
			    selected: false,
			    setSelection: (file) => \{\},
			    style: \{\},
			    trans
			  \};
			
			  describe('#render()', () => \{
			    const component = shallow(<FileItem \{...props\} />);
			    it('should display the full path on hover', () => \{
			      expect(
			        component.find('[title="some/file/path/file-name • Modified"]')
			      ).toHaveLength(1);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\FileItem.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\GitPanel.spec.tsx', () => {
        const sourceCode = `
			import * as apputils from '@jupyterlab/apputils';
			import \{ nullTranslator \} from '@jupyterlab/translation';
			import \{ JSONObject \} from '@lumino/coreutils';
			import \{ shallow \} from 'enzyme';
			import 'jest';
			import React from 'react';
			import \{ CommitBox \} from '../../src/components/CommitBox';
			import \{ GitPanel, IGitPanelProps \} from '../../src/components/GitPanel';
			import * as git from '../../src/git';
			import \{ Logger \} from '../../src/logger';
			import \{ GitExtension as GitModel \} from '../../src/model';
			import \{
			  defaultMockedResponses,
			  DEFAULT_REPOSITORY_PATH,
			  IMockedResponses,
			  mockedRequestAPI
			\} from '../utils';
			
			jest.mock('../../src/git');
			jest.mock('@jupyterlab/apputils');
			
			const mockedResponses: IMockedResponses = \{
			  ...defaultMockedResponses,
			  commit: \{ body: () => null \},
			  log: \{
			    body: () => \{
			      return \{
			        code: 0,
			        commits: []
			      \};
			    \}
			  \}
			\};
			
			/**
			 * Returns a bare minimum "settings" object for use within the Git panel.
			 *
			 * @private
			 * @returns mock settings
			 */
			function MockSettings(commitAndPush = true) \{
			  return \{
			    changed: \{
			      connect: () => true,
			      disconnect: () => true
			    \},
			    composite: \{
			      commitAndPush
			    \}
			  \};
			\}
			
			describe('GitPanel', () => \{
			  const trans = nullTranslator.load('jupyterlab_git');
			
			  const props: IGitPanelProps = \{
			    model: null,
			    commands: null,
			    logger: new Logger(),
			    settings: null,
			    filebrowser: \{
			      path: '/dummy/path'
			    \} as any,
			    trans: trans
			  \};
			
			  beforeEach(async () => \{
			    jest.restoreAllMocks();
			
			    const mock = git as jest.Mocked<typeof git>;
			    mock.requestAPI.mockImplementation(mockedRequestAPI(mockedResponses));
			
			    props.model = new GitModel();
			    props.model.pathRepository = DEFAULT_REPOSITORY_PATH;
			
			    props.settings = MockSettings() as any;
			
			    await props.model.ready;
			  \});
			
			  describe('#constructor()', () => \{
			    it('should return a new instance', () => \{
			      const panel = new GitPanel(props);
			      expect(panel).toBeInstanceOf(GitPanel);
			    \});
			
			    it('should set the default commit message summary to an empty string', () => \{
			      const panel = new GitPanel(props);
			      expect(panel.state.commitSummary).toEqual('');
			    \});
			
			    it('should set the default commit message description to an empty string', () => \{
			      const panel = new GitPanel(props);
			      expect(panel.state.commitDescription).toEqual('');
			    \});
			  \});
			
			  describe('#commitFiles()', () => \{
			    let panel: GitPanel;
			    let commitSpy: jest.SpyInstance<Promise<void>>;
			    let configSpy: jest.SpyInstance<Promise<void | JSONObject>>;
			
			    const commitSummary = 'Fix really stupid bug';
			    const commitDescription = 'This will probably break everything :)';
			    const commitUser = \{
			      'user.name': 'John Snow',
			      'user.email': 'john.snow@winteris.com'
			    \};
			
			    const mockUtils = apputils as jest.Mocked<typeof apputils>;
			    const dialogValue: apputils.Dialog.IResult<any> = \{
			      button: \{
			        accept: true,
			        actions: [],
			        caption: '',
			        className: '',
			        displayType: 'default',
			        iconClass: '',
			        iconLabel: '',
			        label: ''
			      \},
			      value: \{
			        name: commitUser['user.name'],
			        email: commitUser['user.email']
			      \}
			    \};
			
			    /**
			     * Mock identity look up (GitModel.config)
			     */
			    const mockConfigImplementation = (key: 'user.email' | 'user.name') => \{
			      return (options?: JSONObject): Promise<JSONObject> => \{
			        const response = \{
			          options: \{
			            [key]: commitUser[key]
			          \}
			        \};
			        return Promise.resolve<JSONObject>(
			          options === undefined
			            ? response // When getting config options
			            : null // When setting config options
			        );
			      \};
			    \};
			
			    beforeEach(() => \{
			      commitSpy = jest.spyOn(GitModel.prototype, 'commit').mockResolvedValue();
			      configSpy = jest.spyOn(GitModel.prototype, 'config');
			
			      const panelWrapper = shallow<GitPanel>(<GitPanel \{...props\} />);
			      panel = panelWrapper.instance();
			    \});
			
			    it('should commit when commit message is provided', async () => \{
			      configSpy.mockResolvedValue(\{ options: commitUser \});
			      panel.setState(\{ commitSummary, commitDescription \});
			      await panel.commitFiles();
			      expect(configSpy).toHaveBeenCalledTimes(1);
			      expect(commitSpy).toHaveBeenCalledTimes(1);
			      expect(commitSpy).toHaveBeenCalledWith(
			        commitSummary + '\\n\\n' + commitDescription + '\\n'
			      );
			
			      // Only erase commit message upon success
			      expect(panel.state.commitSummary).toEqual('');
			      expect(panel.state.commitDescription).toEqual('');
			    \});
			
			    it('should not commit without a commit message', async () => \{
			      await panel.commitFiles();
			      expect(configSpy).not.toHaveBeenCalled();
			      expect(commitSpy).not.toHaveBeenCalled();
			    \});
			
			    it('should prompt for user identity if user.name is not set', async () => \{
			      configSpy.mockImplementation(mockConfigImplementation('user.email'));
			      mockUtils.showDialog.mockResolvedValue(dialogValue);
			
			      panel.setState(\{ commitSummary \});
			      await panel.commitFiles();
			      expect(configSpy).toHaveBeenCalledTimes(2);
			      expect(configSpy.mock.calls[0]).toHaveLength(0);
			      expect(configSpy.mock.calls[1]).toEqual([commitUser]);
			      expect(commitSpy).toHaveBeenCalledTimes(1);
			      expect(commitSpy).toHaveBeenCalledWith(commitSummary);
			    \});
			
			    it('should prompt for user identity if user.email is not set', async () => \{
			      configSpy.mockImplementation(mockConfigImplementation('user.name'));
			      mockUtils.showDialog.mockResolvedValue(dialogValue);
			
			      panel.setState(\{ commitSummary \});
			      await panel.commitFiles();
			      expect(configSpy).toHaveBeenCalledTimes(2);
			      expect(configSpy.mock.calls[0]).toHaveLength(0);
			      expect(configSpy.mock.calls[1]).toEqual([commitUser]);
			      expect(commitSpy).toHaveBeenCalledTimes(1);
			      expect(commitSpy).toHaveBeenCalledWith(commitSummary);
			    \});
			
			    it('should not commit if no user identity is set and the user rejects the dialog', async () => \{
			      configSpy.mockResolvedValue(\{ options: \{\} \});
			      mockUtils.showDialog.mockResolvedValue(\{
			        button: \{
			          ...dialogValue.button,
			          accept: false
			        \},
			        value: null
			      \});
			
			      panel.setState(\{ commitSummary, commitDescription \});
			      try \{
			        await panel.commitFiles();
			      \} catch (error) \{
			        expect(error.message).toEqual(
			          'Failed to set your identity. User refused to set identity.'
			        );
			      \}
			      expect(configSpy).toHaveBeenCalledTimes(1);
			      expect(configSpy).toHaveBeenCalledWith();
			      expect(commitSpy).not.toHaveBeenCalled();
			
			      // Should not erase commit message
			      expect(panel.state.commitSummary).toEqual(commitSummary);
			      expect(panel.state.commitDescription).toEqual(commitDescription);
			    \});
			  \});
			
			  describe('#render()', () => \{
			    beforeEach(() => \{
			      props.commands = \{
			        keyBindings: \{ find: jest.fn() \}
			      \} as any;
			      props.model = \{
			        branches: [],
			        stashChanged: \{
			          connect: jest.fn()
			        \},
			        branchesChanged: \{
			          connect: jest.fn()
			        \},
			        headChanged: \{
			          connect: jest.fn()
			        \},
			        markChanged: \{
			          connect: jest.fn()
			        \},
			        repositoryChanged: \{
			          connect: jest.fn()
			        \},
			        statusChanged: \{
			          connect: jest.fn()
			        \},
			        selectedHistoryFileChanged: \{
			          connect: jest.fn()
			        \},
			        notifyRemoteChanges: \{
			          connect: jest.fn()
			        \},
			        dirtyFilesStatusChanged: \{
			          connect: jest.fn()
			        \}
			      \} as any;
			
			      props.settings = MockSettings() as any;
			    \});
			
			    it('should render Commit and Push if there is a remote branch', () => \{
			      (props.model as any).branches = [
			        \{
			          is_remote_branch: true,
			          is_current_branch: false,
			          name: 'remote',
			          tag: null,
			          top_commit: 'hash',
			          upstream: 'origin'
			        \}
			      ];
			
			      const panel = shallow(<GitPanel \{...props\} />);
			      panel.setState(\{
			        repository: '/path'
			      \});
			      expect(panel.find(CommitBox).prop('label')).toEqual('Commit and Push');
			    \});
			
			    it('should render Commit if there is no remote branch', () => \{
			      (props.model as any).branches = [
			        \{
			          is_remote_branch: false,
			          is_current_branch: false,
			          name: 'local',
			          tag: null,
			          top_commit: 'hash',
			          upstream: null
			        \}
			      ];
			
			      const panel = shallow(<GitPanel \{...props\} />);
			      panel.setState(\{
			        repository: '/path'
			      \});
			      expect(panel.find(CommitBox).prop('label')).toEqual('Commit');
			    \});
			
			    it('should render Commit if there is a remote branch but commitAndPush is false', () => \{
			      (props.model as any).branches = [
			        \{
			          is_remote_branch: true,
			          is_current_branch: false,
			          name: 'remote',
			          tag: null,
			          top_commit: 'hash',
			          upstream: 'origin'
			        \}
			      ];
			      props.settings = MockSettings(false) as any;
			
			      const panel = shallow(<GitPanel \{...props\} />);
			      panel.setState(\{
			        repository: '/path'
			      \});
			      expect(panel.find(CommitBox).prop('label')).toEqual('Commit');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\GitPanel.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\HistorySideBar.spec.tsx', () => {
        const sourceCode = `
			import * as React from 'react';
			import \{ shallow \} from 'enzyme';
			import \{
			  HistorySideBar,
			  IHistorySideBarProps
			\} from '../../src/components/HistorySideBar';
			import 'jest';
			
			import \{ PastCommitNode \} from '../../src/components/PastCommitNode';
			import \{ GitExtension \} from '../../src/model';
			import \{ nullTranslator \} from '@jupyterlab/translation';
			import \{ FileItem \} from '../../src/components/FileItem';
			import \{ DocumentRegistry \} from '@jupyterlab/docregistry';
			import \{ SinglePastCommitInfo \} from '../../src/components/SinglePastCommitInfo';
			
			describe('HistorySideBar', () => \{
			  const trans = nullTranslator.load('jupyterlab-git');
			
			  const props: IHistorySideBarProps = \{
			    commits: [
			      \{
			        commit: null,
			        author: null,
			        date: null,
			        commit_msg: null,
			        pre_commits: [null]
			      \}
			    ],
			    branches: [],
			    model: \{
			      selectedHistoryFile: null
			    \} as GitExtension,
			    commands: null,
			    trans,
			    referenceCommit: null,
			    challengerCommit: null,
			    onSelectForCompare: _ => async _ => null,
			    onCompareWithSelected: _ => async _ => null
			  \};
			
			  beforeEach(() => \{
			    Object.defineProperty(global, 'ResizeObserver', \{
			      writable: true,
			      value: jest.fn().mockImplementation(() => (\{
			        observe: jest.fn(() => 'Mocking works'),
			        unobserve: jest.fn(),
			        disconnect: jest.fn()
			      \}))
			    \});
			  \});
			
			  it('renders the commit nodes', () => \{
			    const historySideBar = shallow(<HistorySideBar \{...props\} />);
			    expect(historySideBar.find(PastCommitNode)).toHaveLength(1);
			    expect(historySideBar.find(SinglePastCommitInfo)).toHaveLength(1);
			    // Selected history file element
			    expect(historySideBar.find(FileItem)).toHaveLength(0);
			  \});
			
			  it('shows a message if no commits are found', () => \{
			    const propsWithoutCommits: IHistorySideBarProps = \{ ...props, commits: [] \};
			    const historySideBar = shallow(<HistorySideBar \{...propsWithoutCommits\} />);
			    expect(historySideBar.find(PastCommitNode)).toHaveLength(0);
			
			    const noHistoryFound = historySideBar.find('li');
			    expect(noHistoryFound).toHaveLength(1);
			    expect(noHistoryFound.text()).toEqual('No history found.');
			  \});
			
			  it('correctly shows the selected history file', () => \{
			    const propsWithSelectedFile: IHistorySideBarProps = \{
			      ...props,
			      model: \{
			        selectedHistoryFile: \{
			          x: '',
			          y: '',
			          to: '/path/to/file',
			          from: '',
			          is_binary: null,
			          status: 'unmodified',
			          type: \{\} as DocumentRegistry.IFileType
			        \}
			      \} as GitExtension
			    \};
			
			    const historySideBar = shallow(
			      <HistorySideBar \{...propsWithSelectedFile\} />
			    );
			    const selectedHistoryFile = historySideBar.find(FileItem);
			    expect(selectedHistoryFile).toHaveLength(1);
			    expect(selectedHistoryFile.prop('file')).toEqual(
			      propsWithSelectedFile.model.selectedHistoryFile
			    );
			    // Only renders with repository history
			    expect(historySideBar.find(SinglePastCommitInfo)).toHaveLength(0);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\HistorySideBar.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\ManageRemoteDialogue.spec.tsx', () => {
        const sourceCode = `
			// @ts-nocheck
			import \{ shallow, mount \} from 'enzyme';
			import 'jest';
			import * as React from 'react';
			import \{ ActionButton \} from '../../src/components/ActionButton';
			import \{
			  ManageRemoteDialogue,
			  IManageRemoteDialogueProps
			\} from '../../src/components/ManageRemoteDialogue';
			import * as git from '../../src/git';
			import \{ GitExtension \} from '../../src/model';
			import \{ createButtonClass \} from '../../src/style/NewBranchDialog';
			import \{
			  mockedRequestAPI,
			  defaultMockedResponses,
			  DEFAULT_REPOSITORY_PATH
			\} from '../utils';
			import ClearIcon from '@material-ui/icons/Clear';
			import \{ nullTranslator \} from '@jupyterlab/translation';
			
			jest.mock('../../src/git');
			jest.mock('@jupyterlab/apputils');
			
			const REMOTES = [
			  \{
			    name: 'test',
			    url: 'https://test.com'
			  \},
			  \{
			    name: 'origin',
			    url: 'https://origin.com'
			  \}
			];
			
			async function createModel() \{
			  const model = new GitExtension();
			  model.pathRepository = DEFAULT_REPOSITORY_PATH;
			
			  await model.ready;
			  return model;
			\}
			
			describe('ManageRemoteDialogue', () => \{
			  let model: GitExtension;
			  const trans = nullTranslator.load('jupyterlab_git');
			
			  beforeEach(async () => \{
			    jest.restoreAllMocks();
			
			    const mock = git as jest.Mocked<typeof git>;
			    mock.requestAPI.mockImplementation(
			      mockedRequestAPI(\{
			        responses: \{
			          ...defaultMockedResponses,
			          'remote/add': \{
			            body: () => \{
			              return \{ code: 0 \};
			            \}
			          \},
			          'remote/show': \{
			            body: () => \{
			              return \{ code: 0, remotes: REMOTES \};
			            \}
			          \}
			        \}
			      \})
			    );
			
			    model = await createModel();
			  \});
			
			  function createProps(
			    props?: Partial<IManageRemoteDialogueProps>
			  ): IManageRemoteDialogueProps \{
			    return \{
			      model: model,
			      trans: trans,
			      onClose: () => null,
			      ...props
			    \};
			  \}
			
			  describe('constructor', () => \{
			    it('should return a new instance with initial state', () => \{
			      const remoteDialogue = shallow(
			        <ManageRemoteDialogue \{...createProps()\} />
			      );
			      expect(remoteDialogue.instance()).toBeInstanceOf(ManageRemoteDialogue);
			      const initialState = \{
			        newRemote: \{
			          name: '',
			          url: ''
			        \},
			        existingRemotes: null
			      \};
			      expect(remoteDialogue.state()).toEqual(initialState);
			    \});
			
			    it('should set the correct state after mounting', async () => \{
			      const spyGitGetRemotes = jest.spyOn(GitExtension.prototype, 'getRemotes');
			      const spyComponentDidMount = jest.spyOn(
			        ManageRemoteDialogue.prototype,
			        'componentDidMount'
			      );
			      const remoteDialogue = shallow(
			        <ManageRemoteDialogue \{...createProps()\} />
			      );
			      await remoteDialogue.instance().componentDidMount();
			      expect(remoteDialogue.state()).toEqual(\{
			        newRemote: \{
			          name: '',
			          url: ''
			        \},
			        existingRemotes: REMOTES
			      \});
			      expect(spyGitGetRemotes).toHaveBeenCalledTimes(2);
			      expect(spyComponentDidMount).toHaveBeenCalledTimes(2);
			    \});
			  \});
			
			  describe('render', () => \{
			    it('should display a title for the dialogue "Manage Remotes"', () => \{
			      const remoteDialogue = shallow(
			        <ManageRemoteDialogue \{...createProps()\} />
			      );
			      const node = remoteDialogue.find('p').first();
			      expect(node.text()).toEqual('Manage Remotes');
			    \});
			    it('should display a button to close the dialogue', () => \{
			      const remoteDialogue = shallow(
			        <ManageRemoteDialogue \{...createProps()\} />
			      );
			      const nodes = remoteDialogue.find(ClearIcon);
			      expect(nodes.length).toEqual(1);
			    \});
			
			    it('should display two input boxes for entering new remote name and url', () => \{
			      const remoteDialogue = shallow(
			        <ManageRemoteDialogue \{...createProps()\} />
			      );
			      const nameInput = remoteDialogue.find('input[placeholder="name"]');
			      const urlInput = remoteDialogue.find(
			        'input[placeholder="Remote Git repository URL"]'
			      );
			      expect(nameInput.length).toEqual(1);
			      expect(urlInput.length).toEqual(1);
			    \});
			
			    it('should display a button to add a new remote', () => \{
			      const remoteDialogue = shallow(
			        <ManageRemoteDialogue \{...createProps()\} />
			      );
			      const node = remoteDialogue.find(\`.\$\{createButtonClass\}\`).first();
			      expect(node.prop('value')).toEqual('Add');
			    \});
			
			    it('should display buttons to remove existing remotes', async () => \{
			      const remoteDialogue = shallow(
			        <ManageRemoteDialogue \{...createProps()\} />
			      );
			      await remoteDialogue.instance().componentDidMount();
			      const nodes = remoteDialogue.find(ActionButton);
			      expect(nodes.length).toEqual(REMOTES.length);
			    \});
			  \});
			
			  describe('functionality', () => \{
			    it('should add a new remote', async () => \{
			      const remoteDialogue = shallow(
			        <ManageRemoteDialogue \{...createProps()\} />
			      );
			      const newRemote = \{
			        name: 'newRemote',
			        url: 'newremote.com'
			      \};
			      await remoteDialogue.setState(\{
			        newRemote
			      \});
			
			      const spyGitAddRemote = jest.spyOn(GitExtension.prototype, 'addRemote');
			      const addRemoteButton = remoteDialogue
			        .find(\`.\$\{createButtonClass\}\`)
			        .first();
			      addRemoteButton.simulate('click');
			
			      expect(spyGitAddRemote).toHaveBeenCalledTimes(1);
			      expect(spyGitAddRemote).toHaveBeenCalledWith(
			        newRemote.url,
			        newRemote.name
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\ManageRemoteDialogue.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\NotebookDiff.spec.tsx', () => {
        const sourceCode = `
			import 'jest';
			import \{ DiffModel \} from '../../src/components/diff/model';
			import \{
			  NotebookDiff,
			  ROOT_CLASS
			\} from '../../src/components/diff/NotebookDiff';
			import \{ requestAPI \} from '../../src/git';
			import \{ Git \} from '../../src/tokens';
			import * as diffResponse from './data/nbDiffResponse.json';
			
			jest.mock('../../src/git');
			
			describe('NotebookDiff', () => \{
			  it('should render notebook diff in success case', async () => \{
			    // Given
			    const model = new DiffModel(\{
			      challenger: \{
			        content: () => Promise.resolve('challenger'),
			        label: 'WORKING',
			        source: Git.Diff.SpecialRef.WORKING
			      \},
			      reference: \{
			        content: () => Promise.resolve('reference'),
			        label: '83baee',
			        source: '83baee'
			      \},
			      filename: 'to/File.ipynb',
			      repositoryPath: 'path'
			    \});
			
			    (requestAPI as jest.Mock).mockResolvedValueOnce(diffResponse);
			
			    // When
			    const widget = new NotebookDiff(model, null);
			    await widget.ready;
			
			    // Then
			    let resolveTest: (value?: any) => void;
			    const terminateTest = new Promise(resolve => \{
			      resolveTest = resolve;
			    \});
			    setImmediate(() => \{
			      expect(requestAPI).toHaveBeenCalled();
			      expect(requestAPI).toBeCalledWith('diffnotebook', 'POST', \{
			        currentContent: 'challenger',
			        previousContent: 'reference'
			      \});
			      expect(widget.node.querySelectorAll('.jp-git-diff-error')).toHaveLength(
			        0
			      );
			      expect(widget.node.querySelectorAll(\`.\$\{ROOT_CLASS\}\`)).toHaveLength(1);
			      expect(widget.node.querySelectorAll('.jp-Notebook-diff')).toHaveLength(1);
			      resolveTest();
			    \});
			    await terminateTest;
			  \});
			
			  it('should render error in if API response is failed', async () => \{
			    // Given
			    const model = new DiffModel(\{
			      challenger: \{
			        content: () => Promise.resolve('challenger'),
			        label: 'WORKING',
			        source: Git.Diff.SpecialRef.WORKING
			      \},
			      reference: \{
			        content: () => Promise.resolve('reference'),
			        label: '83baee',
			        source: '83baee'
			      \},
			      filename: 'to/File.ipynb',
			      repositoryPath: 'path'
			    \});
			
			    (requestAPI as jest.Mock).mockRejectedValueOnce(
			      new Git.GitResponseError(
			        new Response('', \{ status: 401 \}),
			        'TEST_ERROR_MESSAGE'
			      )
			    );
			
			    // When
			    const widget = new NotebookDiff(model, null);
			    await widget.ready;
			
			    // Then
			    let resolveTest: (value?: any) => void;
			    const terminateTest = new Promise(resolve => \{
			      resolveTest = resolve;
			    \});
			    setImmediate(() => \{
			      expect(requestAPI).toHaveBeenCalled();
			      expect(requestAPI).toBeCalledWith('diffnotebook', 'POST', \{
			        currentContent: 'challenger',
			        previousContent: 'reference'
			      \});
			      expect(
			        widget.node.querySelector('.jp-git-diff-error').innerHTML
			      ).toContain('TEST_ERROR_MESSAGE');
			      resolveTest();
			    \});
			    await terminateTest;
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\NotebookDiff.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\PastCommitNode.spec.tsx', () => {
        const sourceCode = `
			import \{ nullTranslator \} from '@jupyterlab/translation';
			import \{ shallow \} from 'enzyme';
			import 'jest';
			import * as React from 'react';
			import \{
			  IPastCommitNodeProps,
			  PastCommitNode
			\} from '../../src/components/PastCommitNode';
			import \{ Git \} from '../../src/tokens';
			
			describe('PastCommitNode', () => \{
			  const trans = nullTranslator.load('jupyterlab-git');
			
			  const notMatchingBranches: Git.IBranch[] = [
			    \{
			      is_current_branch: false,
			      is_remote_branch: false,
			      name: 'name1',
			      upstream: 'upstream',
			      top_commit: 'abcdefghijklmnopqrstuvwxyz01234567890123',
			      tag: 'v1.0.4'
			    \},
			    \{
			      is_current_branch: false,
			      is_remote_branch: true,
			      name: 'name2',
			      upstream: 'upstream',
			      top_commit: 'abcdefghijklmnopqrstuvwxyz01234567890123',
			      tag: null
			    \}
			  ];
			  const matchingBranches: Git.IBranch[] = [
			    \{
			      is_current_branch: false,
			      is_remote_branch: false,
			      name: 'name3',
			      upstream: 'upstream',
			      top_commit: '2414721b194453f058079d897d13c4e377f92dc6',
			      tag: 'v1.0.4-14-g2414721'
			    \},
			    \{
			      is_current_branch: false,
			      is_remote_branch: true,
			      name: 'name4',
			      upstream: 'upstream',
			      top_commit: '2414721b194453f058079d897d13c4e377f92dc6',
			      tag: 'v1.0.5-0-g2414721'
			    \}
			  ];
			  const branches: Git.IBranch[] = notMatchingBranches.concat(matchingBranches);
			  const toggleCommitExpansion = jest.fn();
			  const props: IPastCommitNodeProps = \{
			    model: null,
			    commit: \{
			      commit: '2414721b194453f058079d897d13c4e377f92dc6',
			      author: 'author',
			      date: 'date',
			      commit_msg: 'message',
			      pre_commits: ['pre_commit']
			    \},
			    branches: branches,
			    commands: null,
			    trans,
			    onCompareWithSelected: null,
			    onSelectForCompare: null,
			    expanded: false,
			    toggleCommitExpansion,
			    setRef: () => null
			  \};
			
			  test('Includes commit info', () => \{
			    const node = shallow(<PastCommitNode \{...props\} />);
			    expect(node.text()).toMatch(props.commit.author);
			    expect(node.text()).toMatch(props.commit.commit.slice(0, 7));
			    expect(node.text()).toMatch(props.commit.date);
			    expect(node.text()).toMatch(props.commit.commit_msg);
			  \});
			
			  test('Includes only relevant branch info', () => \{
			    const node = shallow(<PastCommitNode \{...props\} />);
			    expect(node.text()).toMatch('name3');
			    expect(node.text()).toMatch('name4');
			    expect(node.text()).not.toMatch('name1');
			    expect(node.text()).not.toMatch('name2');
			  \});
			
			  test('Toggle show details', () => \{
			    // simulates SinglePastCommitInfo child
			    const node = shallow(
			      <PastCommitNode \{...props\}>
			        <div id="singlePastCommitInfo"></div>
			      </PastCommitNode>
			    );
			    node.simulate('click');
			    expect(toggleCommitExpansion).toBeCalledTimes(1);
			    expect(toggleCommitExpansion).toHaveBeenCalledWith(props.commit.commit);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\PastCommitNode.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\PlainTextDiff.spec.tsx', () => {
        const sourceCode = `
			import 'jest';
			import \{ mergeView \} from '../../src/components/diff/mergeview';
			import \{ DiffModel \} from '../../src/components/diff/model';
			import \{ PlainTextDiff \} from '../../src/components/diff/PlainTextDiff';
			import \{ Git \} from '../../src/tokens';
			
			jest.mock('../../src/git');
			jest.mock('../../src/components/diff/mergeview');
			
			describe('PlainTextDiff', () => \{
			  it('should render file diff', async () => \{
			    // Given
			    const model = new DiffModel(\{
			      challenger: \{
			        content: () => Promise.resolve('challenger'),
			        label: 'WORKING',
			        source: Git.Diff.SpecialRef.WORKING
			      \},
			      reference: \{
			        content: () => Promise.resolve('reference'),
			        label: '83baee',
			        source: '83baee'
			      \},
			      filename: 'to/File.py',
			      repositoryPath: 'path'
			    \});
			
			    const mockMergeView = mergeView as jest.Mocked<typeof mergeView>;
			
			    // When
			    const widget = new PlainTextDiff(model);
			    await widget.ready;
			
			    // Then
			    let resolveTest: (value?: any) => void;
			    const terminateTest = new Promise(resolve => \{
			      resolveTest = resolve;
			    \});
			    setImmediate(() => \{
			      expect(widget.node.querySelectorAll('.jp-git-diff-error')).toHaveLength(
			        0
			      );
			      // merge view was not called as it happens when the widget got attach
			      expect(mockMergeView).not.toHaveBeenCalled();
			      resolveTest();
			    \});
			    await terminateTest;
			  \});
			
			  it('should render error in if API response is failed', async () => \{
			    // Given
			    const model = new DiffModel(\{
			      challenger: \{
			        content: () => Promise.reject('TEST_ERROR_MESSAGE'),
			        label: 'WORKING',
			        source: Git.Diff.SpecialRef.WORKING
			      \},
			      reference: \{
			        content: () => Promise.resolve('reference'),
			        label: '83baee',
			        source: '83baee'
			      \},
			      filename: 'to/File.py',
			      repositoryPath: 'path'
			    \});
			
			    const mockMergeView = mergeView as jest.Mocked<typeof mergeView>;
			
			    // When
			    const widget = new PlainTextDiff(model);
			    await widget.ready;
			
			    // Then
			    let resolveTest: (value?: any) => void;
			    const terminateTest = new Promise(resolve => \{
			      resolveTest = resolve;
			    \});
			    setImmediate(() => \{
			      expect(
			        widget.node.querySelector('.jp-git-diff-error').innerHTML
			      ).toContain('TEST_ERROR_MESSAGE');
			      expect(mockMergeView).not.toHaveBeenCalled();
			      resolveTest();
			    \});
			    await terminateTest;
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\PlainTextDiff.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('jupyterlab_jupyterlab-git\\tests\\test-components\\Toolbar.spec.tsx', () => {
        const sourceCode = `
			import \{ nullTranslator \} from '@jupyterlab/translation';
			import \{ refreshIcon \} from '@jupyterlab/ui-components';
			import \{ shallow \} from 'enzyme';
			import 'jest';
			import * as React from 'react';
			import \{ ActionButton \} from '../../src/components/ActionButton';
			import \{ IToolbarProps, Toolbar \} from '../../src/components/Toolbar';
			import * as git from '../../src/git';
			import \{ Logger \} from '../../src/logger';
			import \{ GitExtension \} from '../../src/model';
			import \{ pullIcon, pushIcon \} from '../../src/style/icons';
			import \{ toolbarMenuButtonClass \} from '../../src/style/Toolbar';
			import \{ DEFAULT_REPOSITORY_PATH, mockedRequestAPI \} from '../utils';
			import \{ CommandIDs \} from '../../src/tokens';
			
			jest.mock('../../src/git');
			
			async function createModel() \{
			  const model = new GitExtension();
			  model.pathRepository = DEFAULT_REPOSITORY_PATH;
			
			  await model.ready;
			  return model;
			\}
			
			describe('Toolbar', () => \{
			  let model: GitExtension;
			  const trans = nullTranslator.load('jupyterlab_git');
			
			  function createProps(props?: Partial<IToolbarProps>): IToolbarProps \{
			    return \{
			      currentBranch: 'master',
			      branches: [
			        \{
			          is_current_branch: true,
			          is_remote_branch: false,
			          name: 'master',
			          upstream: 'origin/master',
			          top_commit: '',
			          tag: ''
			        \},
			        \{
			          is_current_branch: false,
			          is_remote_branch: true,
			          name: 'origin/master',
			          upstream: '',
			          top_commit: '',
			          tag: ''
			        \}
			      ],
			      repository: model.pathRepository,
			      model: model,
			      branching: false,
			      logger: new Logger(),
			      nCommitsAhead: 0,
			      nCommitsBehind: 0,
			      commands: \{
			        execute: jest.fn()
			      \} as any,
			      trans: trans,
			      ...props
			    \};
			  \}
			
			  beforeEach(async () => \{
			    jest.restoreAllMocks();
			
			    const mock = git as jest.Mocked<typeof git>;
			    mock.requestAPI.mockImplementation(mockedRequestAPI());
			
			    model = await createModel();
			  \});
			
			  describe('constructor', () => \{
			    it('should return a new instance', () => \{
			      const el = shallow(<Toolbar \{...createProps()\} />);
			      expect(el.instance()).toBeInstanceOf(Toolbar);
			    \});
			
			    it('should set the default flag indicating whether to show a branch menu to \`false\`', () => \{
			      const el = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      expect(el.state().branchMenu).toEqual(false);
			    \});
			  \});
			
			  describe('render', () => \{
			    it('should display a button to pull the latest changes', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const nodes = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === pullIcon);
			      expect(nodes.length).toEqual(1);
			
			      expect(
			        toolbar.find('[data-test-id="pull-badge"]').prop('invisible')
			      ).toEqual(true);
			    \});
			
			    it('should set the \`title\` attribute on the button to pull the latest changes', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const button = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === pullIcon);
			
			      expect(button.prop('title')).toEqual('Pull latest changes');
			    \});
			
			    it('should display a badge on pull icon if behind', () => \{
			      const toolbar = shallow<Toolbar>(
			        <Toolbar \{...createProps(\{ nCommitsBehind: 1 \})\} />
			      );
			
			      expect(
			        toolbar.find('[data-test-id="pull-badge"]').prop('invisible')
			      ).toEqual(false);
			    \});
			
			    it('should display a button to push the latest changes', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const nodes = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === pushIcon);
			      expect(nodes.length).toEqual(1);
			
			      expect(
			        toolbar.find('[data-test-id="push-badge"]').prop('invisible')
			      ).toEqual(true);
			    \});
			
			    it('should set the \`title\` attribute on the button to push the latest changes', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const button = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === pushIcon)
			        .first();
			
			      expect(button.prop('title')).toEqual('Push committed changes');
			    \});
			
			    it('should display a badge on pull icon if behind', () => \{
			      const toolbar = shallow<Toolbar>(
			        <Toolbar \{...createProps(\{ nCommitsAhead: 1 \})\} />
			      );
			
			      expect(
			        toolbar.find('[data-test-id="push-badge"]').prop('invisible')
			      ).toEqual(false);
			    \});
			
			    it('should display a button to refresh the current repository', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const nodes = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === refreshIcon);
			
			      expect(nodes.length).toEqual(1);
			    \});
			
			    it('should set the \`title\` attribute on the button to refresh the current repository', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const button = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === refreshIcon)
			        .first();
			
			      expect(button.prop('title')).toEqual(
			        'Refresh the repository to detect local and remote changes'
			      );
			    \});
			
			    it('should display a button to toggle a repository menu', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const button = toolbar.find(\`.\$\{toolbarMenuButtonClass\}\`).first();
			
			      const text = button.text();
			      expect(text.includes('Current Repository')).toEqual(true);
			    \});
			
			    it('should set the \`title\` attribute on the button to toggle a repository menu', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const button = toolbar.find(\`.\$\{toolbarMenuButtonClass\}\`).first();
			
			      const bool = button.prop('title').includes('Current repository: ');
			      expect(bool).toEqual(true);
			    \});
			
			    it('should display a button to toggle a branch menu', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const button = toolbar.find(\`.\$\{toolbarMenuButtonClass\}\`).at(1);
			
			      const text = button.text();
			      expect(text.includes('Current Branch')).toEqual(true);
			    \});
			
			    it('should set the \`title\` attribute on the button to toggle a branch menu', () => \{
			      const currentBranch = 'master';
			      const toolbar = shallow<Toolbar>(
			        <Toolbar \{...createProps(\{ currentBranch \})\} />
			      );
			      const button = toolbar.find(\`.\$\{toolbarMenuButtonClass\}\`).at(1);
			
			      expect(button.prop('title')).toEqual('Manage branches and tags');
			    \});
			  \});
			
			  describe('branch menu', () => \{
			    it('should not, by default, display a branch menu', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const nodes = toolbar.find('BranchMenu');
			
			      expect(nodes.length).toEqual(0);
			    \});
			
			    it('should display a branch menu when the button to display a branch menu is clicked', () => \{
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const button = toolbar.find(\`.\$\{toolbarMenuButtonClass\}\`).at(1);
			
			      button.simulate('click');
			      expect(toolbar.find('BranchMenu').length).toEqual(1);
			    \});
			  \});
			
			  describe('pull changes', () => \{
			    it('should pull changes when the button to pull the latest changes is clicked', () => \{
			      const mockedExecute = jest.fn();
			      const toolbar = shallow<Toolbar>(
			        <Toolbar
			          \{...createProps(\{
			            commands: \{
			              execute: mockedExecute
			            \} as any
			          \})\}
			        />
			      );
			      const button = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === pullIcon)
			        .first();
			
			      button.simulate('click');
			      expect(mockedExecute).toHaveBeenCalledTimes(1);
			      expect(mockedExecute).toHaveBeenCalledWith(CommandIDs.gitPull);
			    \});
			
			    it('should not pull changes when the pull button is clicked but there is no remote branch', () => \{
			      const mockedExecute = jest.fn();
			      const toolbar = shallow<Toolbar>(
			        <Toolbar
			          \{...createProps(\{
			            branches: [
			              \{
			                is_current_branch: true,
			                is_remote_branch: false,
			                name: 'master',
			                upstream: '',
			                top_commit: '',
			                tag: ''
			              \}
			            ],
			            commands: \{
			              execute: mockedExecute
			            \} as any
			          \})\}
			        />
			      );
			      const button = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === pullIcon)
			        .first();
			
			      button.simulate('click');
			      expect(mockedExecute).toHaveBeenCalledTimes(0);
			    \});
			  \});
			
			  describe('push changes', () => \{
			    it('should push changes when the button to push the latest changes is clicked', () => \{
			      const mockedExecute = jest.fn();
			      const toolbar = shallow<Toolbar>(
			        <Toolbar
			          \{...createProps(\{
			            commands: \{
			              execute: mockedExecute
			            \} as any
			          \})\}
			        />
			      );
			      const button = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === pushIcon)
			        .first();
			
			      button.simulate('click');
			      expect(mockedExecute).toHaveBeenCalledTimes(1);
			      expect(mockedExecute).toHaveBeenCalledWith(CommandIDs.gitPush);
			    \});
			
			    it('should not push changes when the push button is clicked but there is no remote branch', () => \{
			      const mockedExecute = jest.fn();
			      const toolbar = shallow<Toolbar>(
			        <Toolbar
			          \{...createProps(\{
			            branches: [
			              \{
			                is_current_branch: true,
			                is_remote_branch: false,
			                name: 'master',
			                upstream: '',
			                top_commit: '',
			                tag: ''
			              \}
			            ],
			            commands: \{
			              execute: mockedExecute
			            \} as any
			          \})\}
			        />
			      );
			      const button = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === pushIcon)
			        .first();
			
			      button.simulate('click');
			      expect(mockedExecute).toHaveBeenCalledTimes(0);
			    \});
			  \});
			
			  describe('refresh repository', () => \{
			    it('should refresh the repository when the button to refresh the repository is clicked', () => \{
			      const spy = jest.spyOn(model, 'refresh');
			      const toolbar = shallow<Toolbar>(<Toolbar \{...createProps()\} />);
			      const button = toolbar
			        .find(ActionButton)
			        .findWhere(n => n.prop('icon') === refreshIcon)
			        .first();
			
			      button.simulate('click');
			      expect(spy).toHaveBeenCalledTimes(1);
			
			      spy.mockReset();
			      spy.mockRestore();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\tests\\test-components\\Toolbar.spec.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(21)
    });
    it('jupyterlab_jupyterlab-git\\ui-tests\\tests\\commit-diff.spec.ts', () => {
        const sourceCode = `
			import \{ test \} from '@jupyterlab/galata';
			import \{ expect \} from '@playwright/test';
			import path from 'path';
			import \{ extractFile \} from './utils';
			
			const baseRepositoryPath = 'test-repository.tar.gz';
			test.use(\{ autoGoto: false \});
			
			test.describe('Commits diff', () => \{
			  test.beforeEach(async (\{ baseURL, page, tmpPath \}) => \{
			    await extractFile(
			      baseURL,
			      path.resolve(__dirname, 'data', baseRepositoryPath),
			      path.join(tmpPath, 'repository.tar.gz')
			    );
			
			    // URL for merge conflict example repository
			    await page.goto(\`tree/\$\{tmpPath\}/repository\`);
			  \});
			
			  test('should display commits diff from history', async (\{ page \}) => \{
			    await page.sidebar.openTab('jp-git-sessions');
			    await page.click('button:has-text("History")');
			    const commits = page.locator('li[title="View commit details"]');
			
			    expect(await commits.count()).toBeGreaterThanOrEqual(2);
			
			    await commits.last().locator('button[title="Select for compare"]').click();
			
			    expect(
			      await page.waitForSelector('text=No challenger commit selected.')
			    ).toBeTruthy();
			    await commits
			      .first()
			      .locator('button[title="Compare with selected"]')
			      .click();
			
			    expect(await page.waitForSelector('text=Changed')).toBeTruthy();
			  \});
			
			  test('should display diff from single file history', async (\{ page \}) => \{
			    await page.sidebar.openTab('filebrowser');
			    await page.pause();
			    await page.click('#filebrowser >> text=example.ipynb', \{
			      button: 'right'
			    \});
			    await page.hover('ul[role="menu"] >> text=Git');
			    await page.click('#jp-contextmenu-git >> text=History');
			
			    await page.waitForSelector('#jp-git-sessions >> ol >> text=example.ipynb');
			
			    const commits = page.locator('li[title="View file changes"]');
			
			    expect(await commits.count()).toBeGreaterThanOrEqual(2);
			
			    await commits.last().locator('button[title="Select for compare"]').click();
			    await commits
			      .first()
			      .locator('button[title="Compare with selected"]')
			      .click();
			
			    await expect(
			      page.locator('.nbdime-Widget >> .jp-git-diff-banner')
			    ).toHaveText(
			      /79fe96219f6eaec1ae607c7c8d21d5b269a6dd29[\\n\\s]+51fe1f8995113884e943201341a5d5b7a1393e24/
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\ui-tests\\tests\\commit-diff.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('jupyterlab_jupyterlab-git\\ui-tests\\tests\\file-selection.spec.ts', () => {
        const sourceCode = `
			import \{ test \} from '@jupyterlab/galata';
			import \{ expect \} from '@playwright/test';
			import path from 'path';
			import \{ extractFile \} from './utils';
			
			const baseRepositoryPath = 'test-repository-dirty.tar.gz';
			test.use(\{ autoGoto: false \});
			
			test.describe('File selection for normal staging', () => \{
			  test.beforeEach(async (\{ baseURL, page, tmpPath \}) => \{
			    await extractFile(
			      baseURL,
			      path.resolve(__dirname, 'data', baseRepositoryPath),
			      path.join(tmpPath, 'repository.tar.gz')
			    );
			
			    // URL for merge conflict example repository
			    await page.goto(\`tree/\$\{tmpPath\}/test-repository\`);
			  \});
			
			  test('should select two files with ctlr-click', async (\{ page \}) => \{
			    await page.sidebar.openTab('jp-git-sessions');
			    await page.click('button:has-text("Changes")');
			
			    // Click another_file.txt
			    await page.locator('#jp-git-sessions >> text=another_file.txt').click();
			    // Control-click master_file.ts
			    await page.locator('#jp-git-sessions >> text=master_file.ts').click(\{
			      modifiers: ['Control', 'Meta']
			    \});
			
			    const selectedFileCount = await page.locator('[data-test-selected=true]').count();
			    expect(selectedFileCount).toEqual(2);
			  \});
			
			  test('should select four files with shift-click', async (\{ page \}) => \{
			    await page.sidebar.openTab('jp-git-sessions');
			    await page.click('button:has-text("Changes")');
			
			    // Click another_file.txt
			    await page.locator('#jp-git-sessions >> text=another_file.txt').click();
			    // Shift-click master_file.ts
			    await page.locator('#jp-git-sessions >> text=master_file.ts').click(\{
			      modifiers: ['Shift']
			    \});
			
			    const selectedFiles = page.locator('[data-test-selected=true]');
			    expect(await selectedFiles.count()).toBeGreaterThanOrEqual(4);
			  \});
			\});
			
			
			
			test.describe('File selection for simple staging', () => \{
			  test.beforeEach(async (\{ baseURL, page, tmpPath \}) => \{
			    await extractFile(
			      baseURL,
			      path.resolve(__dirname, 'data', baseRepositoryPath),
			      path.join(tmpPath, 'repository.tar.gz')
			    );
			
			    // URL for merge conflict example repository
			    await page.goto(\`tree/\$\{tmpPath\}/test-repository\`);
			
			    // Click [aria-label="main"] >> text=Git
			    await page.locator('[aria-label="main"] >> text=Git').click();
			    // Click text=Simple staging
			    await page.getByRole('menuitem', \{ name: 'Simple staging' \}).click();
			  \});
			
			  test('should mark four files with shift-click', async (\{ page \}) => \{
			    await page.sidebar.openTab('jp-git-sessions');
			    await page.click('button:has-text("Changes")');
			
			    // Click another_file.txt
			    await page.locator('#jp-git-sessions >> text=another_file.txt').click();
			    // Shift-click master_file.ts
			    await page.locator('#jp-git-sessions >> text=master_file.ts').click(\{
			      modifiers: ['Shift']
			    \});
			
			    const markedFiles = page.locator('[data-test-checked=true]');
			    expect(await markedFiles.count()).toBeGreaterThanOrEqual(4);
			  \});
			
			  test('should unmark all files by clicking de/select all button', async (\{ page \}) => \{
			    await page.sidebar.openTab('jp-git-sessions');
			    await page.click('button:has-text("Changes")');
			
			    let markedFiles = page.locator('[data-test-checked=true]');
			    expect(await markedFiles.count()).toBeGreaterThanOrEqual(4);
			
			    await page.locator('[data-test-id=SelectAllButton]').click();
			
			    markedFiles = page.locator('[data-test-checked=true]');
			    expect(await markedFiles.count()).toBeLessThanOrEqual(0);
			
			    
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\ui-tests\\tests\\file-selection.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('jupyterlab_jupyterlab-git\\ui-tests\\tests\\git-stash.spec.ts', () => {
        const sourceCode = `
			import \{ expect \} from '@playwright/test';
			import \{ test \} from '@jupyterlab/galata';
			import path from 'path';
			import \{ extractFile \} from './utils';
			
			const baseRepositoryPath = 'test-repository-stash.tar.gz';
			test.use(\{ autoGoto: false \});
			
			test.describe('Git Stash Commands', () => \{
			  test.beforeEach(async (\{ baseURL, page, tmpPath \}) => \{
			    await extractFile(
			      baseURL,
			      path.resolve(__dirname, 'data', baseRepositoryPath),
			      path.join(tmpPath, 'repository.tar.gz')
			    );
			
			    // Open Git panel
			    await page.goto(\`tree/\$\{tmpPath\}/test-repository\`);
			    await page.sidebar.openTab('jp-git-sessions');
			    await page.getByRole('tab', \{ name: 'Changes' \}).click();
			    // Let stash list finish loading
			    await page.waitForSelector(
			      '[data-test-id="num-stashes"][data-loading="false"]'
			    );
			  \});
			
			  test('should show the current stash list of two items', async (\{ page \}) => \{
			    const stashButton = await page.getByRole('button', \{
			      name: 'Stash latest changes'
			    \});
			    const numberOfStashes = await page.locator('[data-test-id="num-stashes"]');
			
			    await page.getByText('Stash', \{ exact: true \}).click();
			
			    expect.soft(stashButton).toBeTruthy();
			    await expect(await numberOfStashes.innerText()).toBe('(2)');
			  \});
			
			  test('should drop a single stash entry when \`stash drop\` button is clicked', async (\{
			    page
			  \}) => \{
			    // Open the stash list
			    await page.getByText('Stash', \{ exact: true \}).click();
			    // Hover on the stash list
			    const stashSection = await page.getByText('Stash(2)');
			    await stashSection.hover();
			
			    // Click drop stash on the first item
			    const dropFirstStashBtn = await page
			      .locator('span')
			      .filter(\{ hasText: 'notebook stash (on master)' \})
			      .getByRole('button', \{ name: 'Drop stash entry' \});
			
			    await dropFirstStashBtn.click();
			
			    // Wait for the number of stashes to change
			    await page.waitForFunction(() => \{
			      const element = document.querySelector('[data-test-id="num-stashes"]');
			      return element && !(element.textContent ?? '').includes('(2)');
			    \});
			
			    // Now there should be only one stash
			    const numberOfStashes = await page.locator('[data-test-id="num-stashes"]');
			
			    await expect(await numberOfStashes.innerText()).toBe('(1)');
			  \});
			
			  test('should clear all the stashes when \`stash clear\` button is clicked', async (\{
			    page
			  \}) => \{
			    // Open the stash list
			    await page.getByText('Stash', \{ exact: true \}).click();
			    // Hover on the stash list
			    const stashSection = await page.getByText('Stash(2)');
			    await stashSection.hover();
			
			    // Click clear all stash button
			    await page
			      .getByRole('button', \{
			        name: 'Clear the entire stash'
			      \})
			      .click();
			
			    // Wait for the number of stashes to change
			    await page.waitForFunction(() => \{
			      const element = document.querySelector('[data-test-id="num-stashes"]');
			      return element && !(element.textContent ?? '').includes('(2)');
			    \});
			
			    // Now there should be only one stash
			    const numberOfStashes = await page.locator('[data-test-id="num-stashes"]');
			
			    await expect(await numberOfStashes.innerText()).toBe('(0)');
			  \});
			
			  test('should add a stash when the \`stash changes\` button is clicked', async (\{
			    page
			  \}) => \{
			    // open the first affected file in the stash entry
			    await page.getByRole('tab', \{ name: 'File Browser ' \}).click();
			
			    await page
			      .getByRole('region', \{ name: 'File Browser Section' \})
			      .getByText('file.txt', \{ exact: true \})
			      .dblclick();
			
			    // go back to git panel
			    await page.getByRole('tab', \{ name: 'Git' \}).click();
			
			    // Click stash changes
			    // Hover
			    await page.getByText('Stash(2)').hover();
			
			    // Should have the old tetx
			
			    const oldText = await page.locator('text="This is some dirty changes"');
			    await expect.soft(await oldText.count()).toBe(1);
			    const stashButton = await page.getByRole('button', \{
			      name: 'Stash latest changes'
			    \});
			    await stashButton.click();
			
			    // add placeholder
			    await page
			      .getByPlaceholder('Stash message (optional)')
			      .fill('some stash message');
			    // click yes
			    await page.getByRole('button', \{ name: 'Stash' \}).click();
			
			    // Wait
			    await page.waitForFunction(() => \{
			      const element = document.querySelector('[data-test-id="num-stashes"]');
			      return element && !(element.textContent ?? '').includes('(2)');
			    \});
			
			    // See if the nStashes becomes (3)
			    const numberOfStashes = await page.locator('[data-test-id="num-stashes"]');
			
			    await expect.soft(await numberOfStashes.innerText()).toBe('(3)');
			    // check that our stash message showed up properly
			    await expect
			      .soft(await page.getByText('some stash message (on master)'))
			      .toBeTruthy();
			    await page.waitForTimeout(100);
			    // Check that the stash removed the old text disappears
			    await expect(await oldText.count()).toBe(0);
			  \});
			
			  test('should apply a stash entry when the \`stash apply\` button is clicked (does not remove stash entry from list)', async (\{
			    page
			  \}) => \{
			    // open the first affected file in hte stash entry
			    await page.getByRole('tab', \{ name: 'File Browser' \}).click();
			
			    await page
			      .getByRole('region', \{ name: 'File Browser Section' \})
			      .getByText('master_file.ts')
			      .dblclick();
			
			    // go back to git panel
			    await page.getByRole('tab', \{ name: 'Git' \}).click();
			
			    // Show the stash entries and hover on the stash entry
			    await page.getByText('Stash(2)').click();
			    await page
			      .locator('span')
			      .filter(\{ hasText: 'stashy stash (on master)' \})
			      .hover();
			
			    const applyStashBtn = await page
			      .locator('span')
			      .filter(\{ hasText: 'stashy stash (on master)' \})
			      .getByRole('button', \{ name: 'Apply stash entry' \});
			
			    await applyStashBtn.click();
			
			    // Check that the stash applies
			    await expect
			      .soft(await page.getByText('console.log("dirty changes");'))
			      .toBeTruthy();
			
			    // open the second file has changes applied
			    await page.getByRole('tab', \{ name: 'File Browser' \}).click();
			
			    await page
			      .getByRole('region', \{ name: 'File Browser Section' \})
			      .getByText('another_file.txt')
			      .dblclick();
			
			    await expect
			      .soft(await page.getByText('This is some dirty changes'))
			      .toBeTruthy();
			
			    // See if the nStashes remains the same
			    const numberOfStashes = await page.locator('[data-test-id="num-stashes"]');
			    await expect(await numberOfStashes.innerText()).toBe('(2)');
			  \});
			
			  test('should pop a stash entry when the \`stash pop\` button is clicked (apply stash then remove from list)', async (\{
			    page
			  \}) => \{
			    // open the first affected file in hte stash entry
			    await page.getByRole('tab', \{ name: 'File Browser' \}).click();
			
			    await page
			      .getByRole('region', \{ name: 'File Browser Section' \})
			      .getByText('master_file.ts')
			      .dblclick();
			
			    // go back to git panel
			    await page.getByRole('tab', \{ name: 'Git' \}).click();
			
			    // Discard all changes so we can pop the stash
			    await page.getByText('Changed').hover();
			    await page.getByRole('button', \{ name: 'Discard All Changes' \}).click();
			    await page.getByRole('button', \{ name: 'Discard', exact: true \}).click();
			
			    // Show the stash entries and hover on the stash entry
			    // await page.getByText('Stash(2)').hover();
			    await page.getByText('Stash', \{ exact: true \}).click();
			
			    await page
			      .locator('span')
			      .filter(\{ hasText: 'stashy stash (on master)' \})
			      .hover();
			
			    const popStashBtn = await page
			      .locator('span')
			      .filter(\{ hasText: 'stashy stash (on master)' \})
			      .getByRole('button', \{ name: 'Pop stash entry' \});
			
			    await popStashBtn.click();
			
			    // Wait for the number of stashes to change
			    await page.waitForFunction(() => \{
			      const element = document.querySelector('[data-test-id="num-stashes"]');
			      return element && !(element.textContent ?? '').includes('(2)');
			    \});
			    await page.waitForTimeout(100);
			    // Check that the stash applies
			    const firstStashFileText = await page
			      .locator('pre')
			      .filter(\{ hasText: 'console.log("dirty changes");' \});
			
			    await expect.soft(await firstStashFileText.count()).toBe(1);
			
			    // open the second file has changes applied
			    await page.getByRole('tab', \{ name: 'File Browser' \}).click();
			
			    await page
			      .getByRole('region', \{ name: 'File Browser Section' \})
			      .getByText('another_file.txt')
			      .dblclick();
			
			    // Wait for revertFile to finish
			    await page.waitForTimeout(100);
			
			    const secondStashFileText = await page
			      .locator('pre')
			      .filter(\{ hasText: 'This is some dirty changes' \});
			
			    await expect.soft(await secondStashFileText.count()).toBe(1);
			
			    // See if the nStashes remains the same
			
			    await page.waitForFunction(() => \{
			      const element = document.querySelector('[data-test-id="num-stashes"]');
			      return element && !(element.textContent ?? '').includes('(2)');
			    \});
			
			    const numberOfStashes = await page.locator('[data-test-id="num-stashes"]');
			    await expect(await numberOfStashes.innerText()).toBe('(1)');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\ui-tests\\tests\\git-stash.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    // it('jupyterlab_jupyterlab-git\\ui-tests\\tests\\image-diff.spec.ts', () => {
    //     const sourceCode = `
	// 		import \{ test \} from '@jupyterlab/galata';
	// 		import \{ expect \} from '@playwright/test';
	// 		import path from 'path';
	// 		import \{ extractFile \} from './utils';
			
	// 		const baseRepositoryPath = 'test-repository.tar.gz';
	// 		test.use(\{ autoGoto: false \});
			
	// 		test.describe('Image diff', () => \{
	// 		  test.beforeEach(async (\{ baseURL, page, tmpPath \}) => \{
	// 		    await extractFile(
	// 		      baseURL,
	// 		      path.resolve(__dirname, 'data', baseRepositoryPath),
	// 		      path.join(tmpPath, 'repository.tar.gz')
	// 		    );
			
	// 		    // URL for merge conflict example repository
	// 		    await page.goto(\`tree/\$\{tmpPath\}/repository\`);
	// 		  \});
			
	// 		  test('should display image diff from history', async (\{ page \}) => \{
	// 		    await page.sidebar.openTab('jp-git-sessions');
	// 		    await page.click('button:has-text("History")');
	// 		    const commits = page.getByTitle('View commit details');
			
	// 		    await commits.first().click();
			    
	// 		    await page.getByTitle("git_workflow.jpg").getByRole("button", \{name: "View file changes"\}).click();
			
	// 		    expect.soft(await page.locator('.jp-git-image-diff').screenshot()).toMatchSnapshot('jpeg_diff.png')
			    
	// 		    await page.getByTitle("jupyter.png").getByRole("button", \{name: "View file changes"\}).click();
			
	// 		    expect(await page.locator('.jp-git-image-diff').last().screenshot()).toMatchSnapshot('png_diff.png')
	// 		  \});
	// 		\});
	// 		`

	// 	const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\ui-tests\\tests\\image-diff.spec.ts')
	// 	const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
	// 	const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

	// 	expect(tests.length).toBe(1)
	// 	expect(snapshotAssertions).toBe(2)
    // });
	// it('jupyterlab_jupyterlab-git\\ui-tests\\tests\\image-diff.spec.ts 2', () => {
    //     const sourceCode = `
	// 		  test('should display image diff from history', async (\{ page \}) => \{
	// 		    await page.sidebar.openTab('jp-git-sessions');
	// 		    await page.click('button:has-text("History")');
	// 		    const commits = page.getByTitle('View commit details');
			
	// 		    await commits.first().click();
			    
	// 		    await page.getByTitle("git_workflow.jpg").getByRole("button", \{name: "View file changes"\}).click();
			
	// 		    expect.soft(await page.locator('.jp-git-image-diff').screenshot()).toMatchSnapshot('jpeg_diff.png')
			    
	// 		  \});
	// 		`

	// 	const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\ui-tests\\tests\\image-diff.spec.ts')
	// 	const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
	// 	const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

	// 	expect(tests.length).toBe(1)
	// 	expect(snapshotAssertions).toBe(1)
    // });
    it('jupyterlab_jupyterlab-git\\ui-tests\\tests\\merge-commit.spec.ts', () => {
        const sourceCode = `
			import \{ test \} from '@jupyterlab/galata';
			import \{ expect \} from '@playwright/test';
			import path from 'path';
			import \{ extractFile \} from './utils';
			
			const baseRepositoryPath = 'test-repository-merge-commits.tar.gz';
			test.use(\{ autoGoto: false \});
			
			test.describe('Merge commit tests', () => \{
			  test.beforeEach(async (\{ baseURL, page, tmpPath \}) => \{
			    await extractFile(
			      baseURL,
			      path.resolve(__dirname, 'data', baseRepositoryPath),
			      path.join(tmpPath, 'repository.tar.gz')
			    );
			
			    // URL for merge commit example repository
			    await page.goto(\`tree/\$\{tmpPath\}/repository\`);
			
			    await page.sidebar.openTab('jp-git-sessions');
			
			    await page.getByRole('tab', \{ name: 'History' \}).click();
			  \});
			
			  test('should correctly display num files changed, insertions, and deletions', async (\{
			    page
			  \}) => \{
			    const mergeCommit = await page.getByText("Merge branch 'sort-names'");
			
			    await mergeCommit.click();
			
			    const filesChanged = await mergeCommit.getByTitle('# Files Changed');
			    const insertions = await mergeCommit.getByTitle('# Insertions');
			    const deletions = await mergeCommit.getByTitle('# Deletions');
			
			    await filesChanged.waitFor();
			
			    await expect(await filesChanged.innerText()).toBe('3');
			    await expect(await insertions.innerText()).toBe('18240');
			    await expect(await deletions.innerText()).toBe('18239');
			  \});
			
			  test('should correctly display files changed', async (\{ page \}) => \{
			    const mergeCommit = await page.getByText("Merge branch 'sort-names'");
			
			    await mergeCommit.click();
			
			    const helloWorldFile = page.getByRole('listitem', \{
			      name: 'hello-world.py'
			    \});
			    const namesFile = page.getByRole('listitem', \{ name: 'names.txt' \});
			    const newFile = page.getByRole('listitem', \{ name: 'new-file.txt' \});
			
			    expect(helloWorldFile).toBeTruthy();
			    expect(namesFile).toBeTruthy();
			    expect(newFile).toBeTruthy();
			  \});
			
			  test('should diff file after clicking', async (\{ page \}) => \{
			    const mergeCommit = await page.getByText("Merge branch 'sort-names'");
			
			    await mergeCommit.click();
			
			    const file = page.getByRole('listitem', \{ name: 'hello-world.py' \});
			    await file.click();
			
			    await page
			      .getByRole('tab', \{ name: 'hello-world.py' \})
			      .waitFor(\{ state: 'visible' \});
			
			    expect(page.waitForSelector('.jp-git-diff-root')).toBeTruthy();
			  \});
			
			  test('should revert merge commit', async (\{ page \}) => \{
			    const mergeCommit = await page.getByText("Merge branch 'sort-names'");
			
			    await mergeCommit.click();
			    await page
			      .getByRole('button', \{ name: 'Revert changes introduced by this commit' \})
			      .click();
			
			    const dialog = await page.getByRole('dialog');
			    await dialog.waitFor(\{ state: 'visible' \});
			
			    await expect(dialog).toBeTruthy();
			
			    await dialog.getByRole('button', \{ name: 'Submit' \}).click();
			    await dialog.waitFor(\{ state: 'detached' \});
			
			    const revertMergeCommit = await page
			      .locator('#jp-git-sessions')
			      .getByText("Revert 'Merge branch 'sort-names''");
			
			    await revertMergeCommit.waitFor(\{ state: 'visible' \});
			
			    expect(revertMergeCommit).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\ui-tests\\tests\\merge-commit.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('jupyterlab_jupyterlab-git\\ui-tests\\tests\\merge-conflict.spec.ts', () => {
        const sourceCode = `
			import \{ test \} from '@jupyterlab/galata';
			import \{ expect \} from '@playwright/test';
			import path from 'path';
			import \{ extractFile \} from './utils';
			
			const baseRepositoryPath = 'test-repository.tar.gz';
			test.use(\{ autoGoto: false \});
			
			test.describe('Merge conflict tests', () => \{
			  test.beforeEach(async (\{ baseURL, page, tmpPath \}) => \{
			    await extractFile(
			      baseURL,
			      path.resolve(__dirname, 'data', baseRepositoryPath),
			      path.join(tmpPath, 'repository.tar.gz')
			    );
			
			    // URL for merge conflict example repository
			    await page.goto(\`tree/\$\{tmpPath\}/repository\`);
			
			    await page.sidebar.openTab('jp-git-sessions');
			
			    await page.locator('button:has-text("Current Branchmaster")').click();
			
			    // Click on a-branch merge button
			    await page.locator('text=a-branch').hover();
			    await page.locator('text=a-branchmaster >> button').nth(1).click();
			
			    // Hide branch panel
			    await page.locator('button:has-text("Current Branchmaster")').click();
			
			    // Force refresh
			    await page
			      .locator(
			        'button[title="Refresh the repository to detect local and remote changes"]'
			      )
			      .click();
			  \});
			
			  test('should diff conflicted text file', async (\{ page \}) => \{
			    await page.click('[title="file.txt • Conflicted"]', \{ clickCount: 2 \});
			    await page.waitForSelector(
			      '.jp-git-diff-parent-widget[id^="Current-Incoming"] .jp-spinner',
			      \{ state: 'detached' \}
			    );
			    await page.waitForSelector('.jp-git-diff-root');
			
			    // Verify 3-way merge view appears
			    const banner = page.locator('.jp-git-merge-banner');
			    await expect(banner).toHaveText(/Current/);
			    await expect(banner).toHaveText(/Result/);
			    await expect(banner).toHaveText(/Incoming/);
			
			    const mergeDiff = page.locator('.CodeMirror-merge-3pane');
			    await expect(mergeDiff).toBeVisible();
			  \});
			
			  test('should diff conflicted notebook file', async (\{ page \}) => \{
			    await page.click('[title="example.ipynb • Conflicted"]', \{
			      clickCount: 2
			    \});
			    await page.waitForSelector(
			      '.jp-git-diff-parent-widget[id^="Current-Incoming"] .jp-spinner',
			      \{ state: 'detached' \}
			    );
			    await page.waitForSelector('.jp-git-diff-root');
			
			    // Verify notebook merge view appears
			    const banner = page.locator('.jp-git-merge-banner');
			    await expect(banner).toHaveText(/Current/);
			    await expect(banner).toHaveText(/Incoming/);
			
			    const mergeDiff = page.locator('.jp-Notebook-merge');
			    await expect(mergeDiff).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'jupyterlab_jupyterlab-git\\ui-tests\\tests\\merge-conflict.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
});
