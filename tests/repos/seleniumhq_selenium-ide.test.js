const { extractFromSource } = require('../../src/extractor');

describe('seleniumhq_selenium-ide', () => {
    it('seleniumhq_selenium-ide\\packages\\browser-info\\__tests__\\chrome.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			jest.mock('os')
			jest.mock('../src/sh')
			import * as os from 'os'
			import \{ Chrome \} from '../src/chrome'
			import \{ sh, makeError \} from '../src/sh'
			
			const \{ getBrowserInfo, ChromeChannel \} = Chrome
			const mockSh = sh as unknown as jest.Mock<any, any>
			const mockPlatform = os.platform as unknown as jest.Mock<any, any>
			
			describe('chrome browser info', () => \{
			  describe('macOS', () => \{
			    beforeAll(() => \{
			      mockPlatform.mockReturnValue('darwin')
			    \})
			
			    afterAll(() => \{
			      mockPlatform.mockReset()
			    \})
			
			    it('should get stable chrome browser info', async () => \{
			      mockSh.mockReturnValueOnce(
			        Promise.resolve(\{ stdout: 'Google Chrome 76.0.3809.132\\n', stderr: '' \})
			      )
			      expect(await getBrowserInfo(ChromeChannel.stable)).toEqual(\{
			        binary: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			        version: '76.0.3809.132',
			        channel: 'stable',
			      \})
			    \})
			    it('should fail to get chrome info when its not installed', async () => \{
			      mockSh.mockReturnValueOnce(Promise.reject(makeError('error', 1, '', '')))
			      expect.assertions(1)
			      try \{
			        await getBrowserInfo(ChromeChannel.stable)
			      \} catch (err) \{
			        // @ts-expect-error
			        expect(err.message).toBe('Unable to find Chrome installation')
			      \}
			    \})
			    it('should get all chrome info', async () => \{
			      mockSh.mockImplementation((binary) => \{
			        if (binary.includes('Canary')) \{
			          return Promise.resolve(\{
			            stdout: 'Google Chrome 79.0.3915.0 canary\\n',
			            stderr: '',
			          \})
			        \} else if (binary.includes('Beta')) \{
			          return Promise.resolve(\{
			            stdout: 'Google Chrome 75.0.3770.75 beta\\n',
			            stderr: '',
			          \})
			        \} else \{
			          return Promise.resolve(\{
			            stdout: 'Google Chrome 76.0.3809.132\\n',
			            stderr: '',
			          \})
			        \}
			      \})
			      expect(await getBrowserInfo()).toEqual([
			        \{
			          binary:
			            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			          version: '76.0.3809.132',
			          channel: 'stable',
			        \},
			        \{
			          binary:
			            '/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome',
			          version: '75.0.3770.75',
			          channel: 'beta',
			        \},
			        \{
			          binary:
			            '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
			          version: '79.0.3915.0',
			          channel: 'canary',
			        \},
			      ])
			      mockSh.mockReset()
			    \})
			    it('should get partial chrome info if some installations do not exist', async () => \{
			      mockSh.mockImplementation((binary) => \{
			        if (binary.includes('Canary')) \{
			          return Promise.resolve(\{
			            stdout: 'Google Chrome 79.0.3915.0 canary\\n',
			            stderr: '',
			          \})
			        \} else if (binary.includes('Beta')) \{
			          return Promise.reject(makeError('error', 1, '', ''))
			        \} else \{
			          return Promise.resolve(\{
			            stdout: 'Google Chrome 76.0.3809.132\\n',
			            stderr: '',
			          \})
			        \}
			      \})
			      expect(await getBrowserInfo()).toEqual([
			        \{
			          binary:
			            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			          version: '76.0.3809.132',
			          channel: 'stable',
			        \},
			        \{
			          binary:
			            '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
			          version: '79.0.3915.0',
			          channel: 'canary',
			        \},
			      ])
			      mockSh.mockReset()
			    \})
			  \})
			  describe('linux', () => \{
			    beforeAll(() => \{
			      mockPlatform.mockReturnValue('linux')
			    \})
			
			    afterAll(() => \{
			      mockPlatform.mockReset()
			    \})
			
			    it('should get stable chrome browser info', async () => \{
			      mockSh.mockReturnValueOnce(
			        Promise.resolve(\{ stdout: 'Google Chrome 76.0.3809.132\\n', stderr: '' \})
			      )
			      expect(await getBrowserInfo(ChromeChannel.stable)).toEqual(\{
			        binary: '/usr/local/sbin/google-chrome',
			        version: '76.0.3809.132',
			        channel: 'stable',
			      \})
			    \})
			    it('should fail to get chrome info when its not installed', async () => \{
			      mockSh.mockReturnValueOnce(Promise.reject(makeError('error', 1, '', '')))
			      expect.assertions(1)
			      try \{
			        await getBrowserInfo(ChromeChannel.stable)
			      \} catch (err) \{
			        // @ts-expect-error
			        expect(err.message).toBe('Unable to find Chrome installation')
			      \}
			    \})
			    it('should fail to get canary chrome channel since it is not available on linux', async () => \{
			      expect.assertions(1)
			      try \{
			        await getBrowserInfo(ChromeChannel.canary)
			      \} catch (err) \{
			        // @ts-expect-error
			        expect(err.message).toBe('Unsupported channel canary')
			      \}
			    \})
			    it('should get all chrome info', async () => \{
			      mockSh.mockImplementation((binary) => \{
			        if (binary.includes('beta')) \{
			          return Promise.resolve(\{
			            stdout: 'Google Chrome 75.0.3770.75 beta\\n',
			            stderr: '',
			          \})
			        \} else \{
			          return Promise.resolve(\{
			            stdout: 'Google Chrome 76.0.3809.132\\n',
			            stderr: '',
			          \})
			        \}
			      \})
			      expect(await getBrowserInfo()).toEqual([
			        \{
			          binary: '/usr/local/sbin/google-chrome',
			          version: '76.0.3809.132',
			          channel: 'stable',
			        \},
			        \{
			          binary: '/usr/local/sbin/google-chrome-beta',
			          version: '75.0.3770.75',
			          channel: 'beta',
			        \},
			      ])
			      mockSh.mockReset()
			    \})
			    it('should get partial chrome info if some installations do not exist', async () => \{
			      mockSh.mockImplementation((binary) => \{
			        if (binary.includes('beta')) \{
			          return Promise.reject(makeError('error', 1, '', ''))
			        \} else \{
			          return Promise.resolve(\{
			            stdout: 'Google Chrome 76.0.3809.132\\n',
			            stderr: '',
			          \})
			        \}
			      \})
			      expect(await getBrowserInfo()).toEqual([
			        \{
			          binary: '/usr/local/sbin/google-chrome',
			          version: '76.0.3809.132',
			          channel: 'stable',
			        \},
			      ])
			      mockSh.mockReset()
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\browser-info\\__tests__\\chrome.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('seleniumhq_selenium-ide\\packages\\browser-info\\__tests__\\index.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import * as index from '../src'
			
			describe('browser-info', () => \{
			  it('should export all the required things', () => \{
			    expect(index.Chrome.getBrowserInfo).toBeDefined()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\browser-info\\__tests__\\index.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('seleniumhq_selenium-ide\\packages\\browser-info\\__tests__\\sh.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ sh \} from '../src/sh'
			
			describe('sh', () => \{
			  it('should run a process', async () => \{
			    try \{
			      await sh('node', ['-e', '""'])
			    \} catch \{
			      // should not reach this place
			      expect(true).toBeFalsy()
			    \}
			  \})
			  it('should return stdout and stderr', async () => \{
			    const \{ stdout, stderr \} = await sh('node', [
			      '-e',
			      'console.log(\`out\`);console.error(\`err\`);',
			    ])
			    expect(stdout).toBe('out\\n')
			    expect(stderr).toBe('err\\n')
			  \})
			  it('should return stdout and stderr even if the process crashes', async () => \{
			    expect.assertions(3)
			    try \{
			      await sh('node', [
			        '-e',
			        'console.log(\`out\`);console.error(\`err\`);process.exit(1);',
			      ])
			    \} catch (err) \{
			      // @ts-expect-error
			      expect(err.stdout).toBe('out\\n')
			      // @ts-expect-error
			      expect(err.stderr).toBe('err\\n')
			      // @ts-expect-error
			      expect(err.code).toBe(1)
			    \}
			  \})
			  it('should fail to start a process that does not exist', async () => \{
			    expect.assertions(1)
			    try \{
			      await sh('command-that-does-not-exist')
			    \} catch (err) \{
			      // @ts-expect-error
			      expect(err.code).toBe(1)
			    \}
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\browser-info\\__tests__\\sh.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-csharp-commons\\__test__\\src\\command.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Command from '../../src/command'
			import \{
			  Commands,
			  ControlFlowCommandNames,
			\} from '../../../selenium-ide/src/neo/models/Command'
			import \{ opts \} from '../../src/index'
			import \{ codeExport as exporter \} from '@seleniumhq/side-code-export'
			
			const commandPrefixPadding = opts.commandPrefixPadding
			
			async function prettify(command, \{ fullPayload \} = \{\}) \{
			  const commandBlock = await Command.emit(command)
			  const result = exporter.prettify(commandBlock, \{
			    commandPrefixPadding,
			  \})
			  return fullPayload ? result : result.body
			\}
			
			describe('command code emitter', () => \{
			  it.skip('should emit all known commands', () => \{
			    let result = []
			    Commands.array.forEach(command => \{
			      if (!Command.canEmit(command)) \{
			        result.push(command)
			      \}
			    \})
			    expect(() => \{
			      if (result.length) \{
			        if (result.length === 1) \{
			          throw new Error(\`\$\{result[0]\} has no emitter, write one!\`)
			        \} else \{
			          throw new Error(\`No emitters for \$\{result.join(', ')\}. Write them!\`)
			        \}
			      \}
			    \}).not.toThrow()
			  \})
			  it('should emit \`add selection\` command', () => \{
			    const command = \{
			      command: 'addSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert\` command', () => \{
			    const command = \{
			      command: 'assert',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert alert\` command', () => \{
			    const command = \{
			      command: 'assertAlert',
			      target: 'an alert',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert checked\` command', () => \{
			    const command = \{
			      command: 'assertChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert confirmation\` command', () => \{
			    const command = \{
			      command: 'assertConfirmation',
			      target: 'a confirmation',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert editable\` command', () => \{
			    const command = \{
			      command: 'assertEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element present\` command', () => \{
			    const command = \{
			      command: 'assertElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element not present\` command', () => \{
			    const command = \{
			      command: 'assertElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not checked\` command', () => \{
			    const command = \{
			      command: 'assertNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not editable\` command', () => \{
			    const command = \{
			      command: 'assertNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not selected value\` command', () => \{
			    const command = \{
			      command: 'assertNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not text\` command', () => \{
			    const command = \{
			      command: 'assertNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert prompt\` command', () => \{
			    const command = \{
			      command: 'assertPrompt',
			      target: 'a prompt',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'assert selected label' command", () => \{
			    const command = \{
			      command: 'assertSelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert selected value\` command', () => \{
			    const command = \{
			      command: 'assertSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert text\` command', () => \{
			    const command = \{
			      command: 'assertText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert title\` command', () => \{
			    const command = \{
			      command: 'assertTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert value\` command', () => \{
			    const command = \{
			      command: 'assertValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click\` command', () => \{
			    const command = \{
			      command: 'click',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click at\` command', () => \{
			    const command = \{
			      command: 'clickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`check\` command', () => \{
			    const command = \{
			      command: 'check',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`close\` command', () => \{
			    const command = \{
			      command: 'close',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`do\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.do,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click\` command', () => \{
			    const command = \{
			      command: 'doubleClick',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click at\` command', () => \{
			    const command = \{
			      command: 'doubleClickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`drag and drop to object\` command', () => \{
			    const command = \{
			      command: 'dragAndDropToObject',
			      target: 'link=dragged',
			      value: 'link=dropped',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command', () => \{
			    const command = \{
			      command: 'echo',
			      target: 'blah',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command with variables', () => \{
			    const command = \{
			      command: 'echo',
			      target: '\$\{blah\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`edit content\` command', () => \{
			    const command = \{
			      command: 'editContent',
			      target: 'id=contentEditable',
			      value: '<button>test</button>',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.else,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.elseIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`end\` command', async () => \{
			    const command = \{
			      command: ControlFlowCommandNames.end,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command with return string value', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'return "a"',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute async script\` command', () => \{
			    const command = \{
			      command: 'executeAsyncScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`forEach\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: 'collection',
			      value: 'iteratorVar',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.if,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down\` command', () => \{
			    const command = \{
			      command: 'mouseDown',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down at\` event', () => \{
			    const command = \{
			      command: 'mouseDownAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it.skip('should emit \`mouse move\` event', () => \{
			    const command = \{
			      command: 'mouseMove',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse move at\` event', () => \{
			    const command = \{
			      command: 'mouseMoveAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse out\` event', () => \{
			    const command = \{
			      command: 'mouseOut',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse over\` event', () => \{
			    const command = \{
			      command: 'mouseOver',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up\` event', () => \{
			    const command = \{
			      command: 'mouseUp',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up at\` event', () => \{
			    const command = \{
			      command: 'mouseUpAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`open\` with absolute url', () => \{
			    const command = \{
			      command: 'open',
			      target: 'https://www.seleniumhq.org/',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`pause\` command', () => \{
			    const command = \{
			      command: 'pause',
			      target: '300',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`remove selection\` command', () => \{
			    const command = \{
			      command: 'removeSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`repeatIf\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.repeatIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run\` command', () => \{
			    const command = \{
			      command: 'run',
			      target: 'some test case',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run script\` command', () => \{
			    const command = \{
			      command: 'runScript',
			      target: "alert('test');alert('Im annoying');",
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select\` command', () => \{
			    const command = \{
			      command: 'select',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select frame\` to select the top frame', () => \{
			    const command = \{
			      command: 'selectFrame',
			      target: 'relative=top',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should fail to emit \`select window\` by using unknown locator', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'notExisting=something',
			      value: '',
			    \}
			    return expect(prettify(command)).rejects.toThrow(
			      'Can only emit \`select window\` using handles'
			    )
			  \})
			  it('should emit \`select window\` to select a window by handle', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'handle=\$\{window\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by name', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'name=window',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by the local keyword', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_local',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by implicit index', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_12',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a variable input', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: '\$\{blah\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a key press', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'SuperSecretPassword!\$\{KEY_ENTER\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`set speed\`', () => \{
			    const command = \{ command: 'setSpeed', target: '1000' \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`setWindowSize\`', () => \{
			    const command = \{
			      command: 'setWindowSize',
			      target: '1440x1177',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should skip playback supported commands, that are not supported in webdriver', () => \{
			    return Promise.all([
			      expect(
			        prettify(\{ command: 'answerOnNextPrompt', target: 'blah' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextPrompt' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseOkOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			    ])
			  \})
			  it('should emit \`store\` command', () => \{
			    const command = \{
			      command: 'store',
			      target: 'some value',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store attribute\` command', () => \{
			    const command = \{
			      command: 'storeAttribute',
			      target: 'xpath=button[3]@id',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store text\` command', () => \{
			    const command = \{
			      command: 'storeText',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store json\` command', () => \{
			    const command = \{
			      command: 'storeJson',
			      target: '[\{"a":0\}]',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store title\` command', () => \{
			    const command = \{
			      command: 'storeTitle',
			      target: 'blah',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store value\` command', () => \{
			    const command = \{
			      command: 'storeValue',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store window handle\` command', () => \{
			    const command = \{
			      command: 'storeWindowHandle',
			      target: 'windowName',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store xpath count\` command', () => \{
			    const command = \{
			      command: 'storeXpathCount',
			      target: 'xpath=button',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`submit\` command', () => \{
			    const command = \{
			      command: 'submit',
			      target: 'id=form',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`times\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.times,
			      target: '5',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`type\` command', () => \{
			    const command = \{
			      command: 'type',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`uncheck\` command', () => \{
			    const command = \{
			      command: 'uncheck',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify\` command', () => \{
			    const command = \{
			      command: 'verify',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify checked\` command', () => \{
			    const command = \{
			      command: 'verifyChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify editable\` command', () => \{
			    const command = \{
			      command: 'verifyEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element present\` command', () => \{
			    const command = \{
			      command: 'verifyElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element not present\` command', () => \{
			    const command = \{
			      command: 'verifyElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not checked\` command', () => \{
			    const command = \{
			      command: 'verifyNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not editable\` command', () => \{
			    const command = \{
			      command: 'verifyNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not selected value\` command', () => \{
			    const command = \{
			      command: 'verifyNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not text\` command', () => \{
			    const command = \{
			      command: 'verifyNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'verify selected label' command", () => \{
			    const command = \{
			      command: 'verifySelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify value\` command', () => \{
			    const command = \{
			      command: 'verifyValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify selected value\` command', () => \{
			    const command = \{
			      command: 'verifySelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify text\` command', () => \{
			    const command = \{
			      command: 'verifyText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify title\` command', () => \{
			    const command = \{
			      command: 'verifyTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForText\` command', () => \{
			    const command = \{
			      command: 'waitForText',
			      target: 'css=#blah',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`answer on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverAnswerOnVisiblePrompt',
			      target: 'an answer',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose cancel on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseCancelOnVisiblePrompt',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose ok on visible confirmation\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseOkOnVisibleConfirmation',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`while\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.while,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit new window handling, if command opens a new window', () => \{
			    const command = \{
			      command: 'click',
			      target: 'css=button',
			      value: '',
			      opensWindow: true,
			      windowHandleName: 'newWin',
			      windowTimeout: 2000,
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-csharp-commons\\__test__\\src\\command.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(101)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-csharp-commons\\__test__\\src\\location.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/location'
			
			describe('location code emitter', () => \{
			  it('should fail to emit empty string', () => \{
			    return expect(() => \{
			      emit('')
			    \}).toThrow("Locator can't be empty")
			  \})
			  it('should fail to emit unknown locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown locator notExists')
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.Id("\$\{selector\}")\`
			    )
			  \})
			  it('should emit link locator', () => \{
			    const type = 'link'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.LinkText("\$\{selector\}")\`
			    )
			  \})
			  it('should emit linkText locator', () => \{
			    const type = 'linkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.LinkText("\$\{selector\}")\`
			    )
			  \})
			  it('should emit partialLinkText locator', () => \{
			    const type = 'partialLinkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.PartialLinkText("\$\{selector\}")\`
			    )
			  \})
			  it('should emit css locator', () => \{
			    const type = 'css'
			    const selector = 'someCss'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.CssSelector("\$\{selector\}")\`
			    )
			  \})
			  it('should emit css locator with \`=\` sign', () => \{
			    const type = 'css'
			    const selector = 'a[title=JScript]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.CssSelector("\$\{selector\}")\`
			    )
			  \})
			  it('should escape quotes in locator strings', () => \{
			    const type = 'css'
			    const selector = 'a[title="escaped"]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit xpath locator', () => \{
			    const type = 'xpath'
			    const selector = 'someXpath'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.XPath("\$\{selector\}")\`
			    )
			  \})
			  it('should emit implicit xpath locator', () => \{
			    const selector = '//test=xpath'
			    return expect(emit(selector)).resolves.toBe(\`By.XPath("\$\{selector\}")\`)
			  \})
			  it('should emit name locator', () => \{
			    const type = 'name'
			    const selector = 'someName'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.Name("\$\{selector\}")\`
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-csharp-commons\\__test__\\src\\location.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-csharp-commons\\__test__\\src\\selection.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/selection'
			
			describe('selection location code emitter', () => \{
			  it('should fail to emit unknown selection locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown selection locator notExists')
			  \})
			  it('should assume when no selector is given that it is the label locator', () => \{
			    return expect(emit('label')).resolves.toBe(
			      \`By.XPath("//option[. = 'label']")\`
			    )
			  \})
			  it('should emit label locator', () => \{
			    const type = 'label'
			    const selector = 'a label'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.XPath("//option[. = '\$\{selector\}']")\`
			    )
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.CssSelector("*[id='\$\{selector\}']")\`
			    )
			  \})
			  it('should emit value locator', () => \{
			    const type = 'value'
			    const selector = 'someValue'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.CssSelector("*[value='\$\{selector\}']")\`
			    )
			  \})
			  it('should emit index locator', () => \{
			    const type = 'index'
			    const selector = '2'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.CssSelector("*:nth-child(\$\{selector\})")\`
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-csharp-commons\\__test__\\src\\selection.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-csharp-nunit\\__test__\\src\\command.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Command from '../../src/command'
			import \{
			  Commands,
			  ControlFlowCommandNames,
			\} from '../../../selenium-ide/src/neo/models/Command'
			import \{ opts \} from '../../src/index'
			import \{ codeExport as exporter \} from '@seleniumhq/side-code-export'
			
			const commandPrefixPadding = opts.commandPrefixPadding
			
			async function prettify(command, \{ fullPayload \} = \{\}) \{
			  const commandBlock = await Command.emit(command)
			  const result = exporter.prettify(commandBlock, \{
			    commandPrefixPadding,
			  \})
			  return fullPayload ? result : result.body
			\}
			
			describe('command code emitter', () => \{
			  it.skip('should emit all known commands', () => \{
			    let result = []
			    Commands.array.forEach(command => \{
			      if (!Command.canEmit(command)) \{
			        result.push(command)
			      \}
			    \})
			    expect(() => \{
			      if (result.length) \{
			        if (result.length === 1) \{
			          throw new Error(\`\$\{result[0]\} has no emitter, write one!\`)
			        \} else \{
			          throw new Error(\`No emitters for \$\{result.join(', ')\}. Write them!\`)
			        \}
			      \}
			    \}).not.toThrow()
			  \})
			  it('should emit \`add selection\` command', () => \{
			    const command = \{
			      command: 'addSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert\` command', () => \{
			    const command = \{
			      command: 'assert',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert alert\` command', () => \{
			    const command = \{
			      command: 'assertAlert',
			      target: 'an alert',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert checked\` command', () => \{
			    const command = \{
			      command: 'assertChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert confirmation\` command', () => \{
			    const command = \{
			      command: 'assertConfirmation',
			      target: 'a confirmation',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert editable\` command', () => \{
			    const command = \{
			      command: 'assertEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element present\` command', () => \{
			    const command = \{
			      command: 'assertElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element not present\` command', () => \{
			    const command = \{
			      command: 'assertElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not checked\` command', () => \{
			    const command = \{
			      command: 'assertNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not editable\` command', () => \{
			    const command = \{
			      command: 'assertNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not selected value\` command', () => \{
			    const command = \{
			      command: 'assertNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not text\` command', () => \{
			    const command = \{
			      command: 'assertNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert prompt\` command', () => \{
			    const command = \{
			      command: 'assertPrompt',
			      target: 'a prompt',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'assert selected label' command", () => \{
			    const command = \{
			      command: 'assertSelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert selected value\` command', () => \{
			    const command = \{
			      command: 'assertSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert text\` command', () => \{
			    const command = \{
			      command: 'assertText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert title\` command', () => \{
			    const command = \{
			      command: 'assertTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert value\` command', () => \{
			    const command = \{
			      command: 'assertValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click\` command', () => \{
			    const command = \{
			      command: 'click',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click at\` command', () => \{
			    const command = \{
			      command: 'clickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`check\` command', () => \{
			    const command = \{
			      command: 'check',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`close\` command', () => \{
			    const command = \{
			      command: 'close',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`do\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.do,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click\` command', () => \{
			    const command = \{
			      command: 'doubleClick',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click at\` command', () => \{
			    const command = \{
			      command: 'doubleClickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`drag and drop to object\` command', () => \{
			    const command = \{
			      command: 'dragAndDropToObject',
			      target: 'link=dragged',
			      value: 'link=dropped',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command', () => \{
			    const command = \{
			      command: 'echo',
			      target: 'blah',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command with variables', () => \{
			    const command = \{
			      command: 'echo',
			      target: '\$\{blah\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`edit content\` command', () => \{
			    const command = \{
			      command: 'editContent',
			      target: 'id=contentEditable',
			      value: '<button>test</button>',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.else,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.elseIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`end\` command', async () => \{
			    const command = \{
			      command: ControlFlowCommandNames.end,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command with return string value', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'return "a"',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute async script\` command', () => \{
			    const command = \{
			      command: 'executeAsyncScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`forEach\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: 'collection',
			      value: 'iteratorVar',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.if,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down\` command', () => \{
			    const command = \{
			      command: 'mouseDown',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down at\` event', () => \{
			    const command = \{
			      command: 'mouseDownAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it.skip('should emit \`mouse move\` event', () => \{
			    const command = \{
			      command: 'mouseMove',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse move at\` event', () => \{
			    const command = \{
			      command: 'mouseMoveAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse out\` event', () => \{
			    const command = \{
			      command: 'mouseOut',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse over\` event', () => \{
			    const command = \{
			      command: 'mouseOver',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up\` event', () => \{
			    const command = \{
			      command: 'mouseUp',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up at\` event', () => \{
			    const command = \{
			      command: 'mouseUpAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`open\` with absolute url', () => \{
			    const command = \{
			      command: 'open',
			      target: 'https://www.seleniumhq.org/',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`pause\` command', () => \{
			    const command = \{
			      command: 'pause',
			      target: '300',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`remove selection\` command', () => \{
			    const command = \{
			      command: 'removeSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`repeatIf\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.repeatIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run\` command', () => \{
			    const command = \{
			      command: 'run',
			      target: 'some test case',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run script\` command', () => \{
			    const command = \{
			      command: 'runScript',
			      target: "alert('test');alert('Im annoying');",
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select\` command', () => \{
			    const command = \{
			      command: 'select',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select frame\` to select the top frame', () => \{
			    const command = \{
			      command: 'selectFrame',
			      target: 'relative=top',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should fail to emit \`select window\` by using unknown locator', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'notExisting=something',
			      value: '',
			    \}
			    return expect(prettify(command)).rejects.toThrow(
			      'Can only emit \`select window\` using handles'
			    )
			  \})
			  it('should emit \`select window\` to select a window by handle', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'handle=\$\{window\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by name', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'name=window',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by the local keyword', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_local',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by implicit index', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_12',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a variable input', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: '\$\{blah\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a key press', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'SuperSecretPassword!\$\{KEY_ENTER\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`set speed\`', () => \{
			    const command = \{ command: 'setSpeed', target: '1000' \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`setWindowSize\`', () => \{
			    const command = \{
			      command: 'setWindowSize',
			      target: '1440x1177',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should skip playback supported commands, that are not supported in webdriver', () => \{
			    return Promise.all([
			      expect(
			        prettify(\{ command: 'answerOnNextPrompt', target: 'blah' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextPrompt' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseOkOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			    ])
			  \})
			  it('should emit \`store\` command', () => \{
			    const command = \{
			      command: 'store',
			      target: 'some value',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store attribute\` command', () => \{
			    const command = \{
			      command: 'storeAttribute',
			      target: 'xpath=button[3]@id',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store text\` command', () => \{
			    const command = \{
			      command: 'storeText',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store json\` command', () => \{
			    const command = \{
			      command: 'storeJson',
			      target: '[\{"a":0\}]',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store title\` command', () => \{
			    const command = \{
			      command: 'storeTitle',
			      target: 'blah',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store value\` command', () => \{
			    const command = \{
			      command: 'storeValue',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store window handle\` command', () => \{
			    const command = \{
			      command: 'storeWindowHandle',
			      target: 'windowName',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store xpath count\` command', () => \{
			    const command = \{
			      command: 'storeXpathCount',
			      target: 'xpath=button',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`submit\` command', () => \{
			    const command = \{
			      command: 'submit',
			      target: 'id=form',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`times\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.times,
			      target: '5',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`type\` command', () => \{
			    const command = \{
			      command: 'type',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`uncheck\` command', () => \{
			    const command = \{
			      command: 'uncheck',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify\` command', () => \{
			    const command = \{
			      command: 'verify',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify checked\` command', () => \{
			    const command = \{
			      command: 'verifyChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify editable\` command', () => \{
			    const command = \{
			      command: 'verifyEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element present\` command', () => \{
			    const command = \{
			      command: 'verifyElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element not present\` command', () => \{
			    const command = \{
			      command: 'verifyElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not checked\` command', () => \{
			    const command = \{
			      command: 'verifyNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not editable\` command', () => \{
			    const command = \{
			      command: 'verifyNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not selected value\` command', () => \{
			    const command = \{
			      command: 'verifyNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not text\` command', () => \{
			    const command = \{
			      command: 'verifyNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'verify selected label' command", () => \{
			    const command = \{
			      command: 'verifySelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify value\` command', () => \{
			    const command = \{
			      command: 'verifyValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify selected value\` command', () => \{
			    const command = \{
			      command: 'verifySelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify text\` command', () => \{
			    const command = \{
			      command: 'verifyText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify title\` command', () => \{
			    const command = \{
			      command: 'verifyTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForText\` command', () => \{
			    const command = \{
			      command: 'waitForText',
			      target: 'css=#blah',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`answer on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverAnswerOnVisiblePrompt',
			      target: 'an answer',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose cancel on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseCancelOnVisiblePrompt',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose ok on visible confirmation\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseOkOnVisibleConfirmation',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`while\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.while,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit new window handling, if command opens a new window', () => \{
			    const command = \{
			      command: 'click',
			      target: 'css=button',
			      value: '',
			      opensWindow: true,
			      windowHandleName: 'newWin',
			      windowTimeout: 2000,
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-csharp-nunit\\__test__\\src\\command.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(101)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-csharp-nunit\\__test__\\src\\index.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import fs from 'fs'
			import path from 'path'
			import codeExport, \{
			  emitTest,
			  emitSuite,
			  _emitMethod,
			  _findTestByName,
			\} from '../../src'
			import Command from '../../src/command'
			import \{ project as projectProcessor \} from '@seleniumhq/side-code-export'
			
			function readFile(filename) \{
			  return JSON.parse(
			    fs.readFileSync(
			      path.join(
			        __dirname,
			        '..',
			        '..',
			        '..',
			        'side-code-export',
			        '__test__',
			        'test-files',
			        filename
			      )
			    )
			  )
			\}
			
			describe('Code Export C# NUnit', () => \{
			  it('should export a test', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with grid execution', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			      beforeEachOptions: \{
			        browserName: 'Firefox',
			        gridUrl: 'http://localhost:4444/wd/hub',
			      \},
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite', async () => \{
			    const project = normalizeProject(readFile('single-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[1],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('select-window.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite that uses control flow commands', async () => \{
			    const project = normalizeProject(readFile('control-flow-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with commands that open a new window inside of a reused test method', async () => \{
			    const project = normalizeProject(readFile('nested-select-window.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with just one new window util method when there are multiple commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('nested-select-window-v2.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export the command emitter', () => \{
			    expect(Command.emit).toStrictEqual(codeExport.emit.command)
			  \})
			\})
			
			function normalizeProject(project) \{
			  let _project = \{ ...project \}
			  _project.suites.forEach(suite => \{
			    projectProcessor.normalizeTestsInSuite(\{ suite, tests: _project.tests \})
			  \})
			  return _project
			\}
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-csharp-nunit\\__test__\\src\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-csharp-xunit\\__test__\\src\\command.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Command from '../../src/command'
			import \{ Commands \} from '../../../selenium-ide/src/neo/models/Command'
			import \{ opts \} from '../../src/index'
			import \{ codeExport as exporter \} from '@seleniumhq/side-code-export'
			
			const commandPrefixPadding = opts.commandPrefixPadding
			
			async function prettify(command, \{ fullPayload \} = \{\}) \{
			  const commandBlock = await Command.emit(command)
			  const result = exporter.prettify(commandBlock, \{
			    commandPrefixPadding,
			  \})
			  return fullPayload ? result : result.body
			\}
			
			describe('command code emitter', () => \{
			  it.skip('should emit all known commands', () => \{
			    let result = []
			    Commands.array.forEach(command => \{
			      if (!Command.canEmit(command)) \{
			        result.push(command)
			      \}
			    \})
			    expect(() => \{
			      if (result.length) \{
			        if (result.length === 1) \{
			          throw new Error(\`\$\{result[0]\} has no emitter, write one!\`)
			        \} else \{
			          throw new Error(\`No emitters for \$\{result.join(', ')\}. Write them!\`)
			        \}
			      \}
			    \}).not.toThrow()
			  \})
			  it('should emit \`assert\` command', () => \{
			    const command = \{
			      command: 'assert',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert alert\` command', () => \{
			    const command = \{
			      command: 'assertAlert',
			      target: 'an alert',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert checked\` command', () => \{
			    const command = \{
			      command: 'assertChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert confirmation\` command', () => \{
			    const command = \{
			      command: 'assertConfirmation',
			      target: 'a confirmation',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert editable\` command', () => \{
			    const command = \{
			      command: 'assertEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element present\` command', () => \{
			    const command = \{
			      command: 'assertElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element not present\` command', () => \{
			    const command = \{
			      command: 'assertElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not checked\` command', () => \{
			    const command = \{
			      command: 'assertNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not editable\` command', () => \{
			    const command = \{
			      command: 'assertNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not selected value\` command', () => \{
			    const command = \{
			      command: 'assertNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not text\` command', () => \{
			    const command = \{
			      command: 'assertNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert prompt\` command', () => \{
			    const command = \{
			      command: 'assertPrompt',
			      target: 'a prompt',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'assert selected label' command", () => \{
			    const command = \{
			      command: 'assertSelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert selected value\` command', () => \{
			    const command = \{
			      command: 'assertSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert text\` command', () => \{
			    const command = \{
			      command: 'assertText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert title\` command', () => \{
			    const command = \{
			      command: 'assertTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert value\` command', () => \{
			    const command = \{
			      command: 'assertValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify\` command', () => \{
			    const command = \{
			      command: 'verify',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify checked\` command', () => \{
			    const command = \{
			      command: 'verifyChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify editable\` command', () => \{
			    const command = \{
			      command: 'verifyEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element present\` command', () => \{
			    const command = \{
			      command: 'verifyElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element not present\` command', () => \{
			    const command = \{
			      command: 'verifyElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not checked\` command', () => \{
			    const command = \{
			      command: 'verifyNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not editable\` command', () => \{
			    const command = \{
			      command: 'verifyNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not selected value\` command', () => \{
			    const command = \{
			      command: 'verifyNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not text\` command', () => \{
			    const command = \{
			      command: 'verifyNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'verify selected label' command", () => \{
			    const command = \{
			      command: 'verifySelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify value\` command', () => \{
			    const command = \{
			      command: 'verifyValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify selected value\` command', () => \{
			    const command = \{
			      command: 'verifySelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify text\` command', () => \{
			    const command = \{
			      command: 'verifyText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify title\` command', () => \{
			    const command = \{
			      command: 'verifyTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-csharp-xunit\\__test__\\src\\command.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(31)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-csharp-xunit\\__test__\\src\\index.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import fs from 'fs'
			import path from 'path'
			import codeExport, \{
			  emitTest,
			  emitSuite,
			  _emitMethod,
			  _findTestByName,
			\} from '../../src'
			import Command from '../../src/command'
			import \{ project as projectProcessor \} from '@seleniumhq/side-code-export'
			
			function readFile(filename) \{
			  return JSON.parse(
			    fs.readFileSync(
			      path.join(
			        __dirname,
			        '..',
			        '..',
			        '..',
			        'side-code-export',
			        '__test__',
			        'test-files',
			        filename
			      )
			    )
			  )
			\}
			
			describe('Code Export C# xUnit', () => \{
			  it('should export a test', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with grid execution', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			      beforeEachOptions: \{
			        browserName: 'Firefox',
			        gridUrl: 'http://localhost:4444/wd/hub',
			      \},
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite', async () => \{
			    const project = normalizeProject(readFile('single-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[1],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('select-window.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite that uses control flow commands', async () => \{
			    const project = normalizeProject(readFile('control-flow-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with commands that open a new window inside of a reused test method', async () => \{
			    const project = normalizeProject(readFile('nested-select-window.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with just one new window util method when there are multiple commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('nested-select-window-v2.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export the command emitter', () => \{
			    expect(Command.emit).toStrictEqual(codeExport.emit.command)
			  \})
			\})
			
			function normalizeProject(project) \{
			  let _project = \{ ...project \}
			  _project.suites.forEach(suite => \{
			    projectProcessor.normalizeTestsInSuite(\{ suite, tests: _project.tests \})
			  \})
			  return _project
			\}
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-csharp-xunit\\__test__\\src\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-java-junit\\__test__\\src\\command.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Command from '../../src/command'
			import \{
			  Commands,
			  ControlFlowCommandNames,
			\} from '../../../selenium-ide/src/neo/models/Command'
			import \{ opts \} from '../../src/index'
			import \{ codeExport as exporter \} from '@seleniumhq/side-code-export'
			
			const commandPrefixPadding = opts.commandPrefixPadding
			
			async function prettify(command, \{ fullPayload \} = \{\}) \{
			  const commandBlock = await Command.emit(command)
			  const result = exporter.prettify(commandBlock, \{
			    commandPrefixPadding,
			  \})
			  return fullPayload ? result : result.body
			\}
			
			describe('command code emitter', () => \{
			  it.skip('should emit all known commands', () => \{
			    let result = []
			    Commands.array.forEach(command => \{
			      if (!Command.canEmit(command)) \{
			        result.push(command)
			      \}
			    \})
			    expect(() => \{
			      if (result.length) \{
			        if (result.length === 1) \{
			          throw new Error(\`\$\{result[0]\} has no emitter, write one!\`)
			        \} else \{
			          throw new Error(\`No emitters for \$\{result.join(', ')\}. Write them!\`)
			        \}
			      \}
			    \}).not.toThrow()
			  \})
			  it('should emit \`add selection\` command', () => \{
			    const command = \{
			      command: 'addSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert\` command', () => \{
			    const command = \{
			      command: 'assert',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert alert\` command', () => \{
			    const command = \{
			      command: 'assertAlert',
			      target: 'an alert',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert checked\` command', () => \{
			    const command = \{
			      command: 'assertChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert confirmation\` command', () => \{
			    const command = \{
			      command: 'assertConfirmation',
			      target: 'a confirmation',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert editable\` command', () => \{
			    const command = \{
			      command: 'assertEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element present\` command', () => \{
			    const command = \{
			      command: 'assertElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element not present\` command', () => \{
			    const command = \{
			      command: 'assertElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not checked\` command', () => \{
			    const command = \{
			      command: 'assertNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not editable\` command', () => \{
			    const command = \{
			      command: 'assertNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not selected value\` command', () => \{
			    const command = \{
			      command: 'assertNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not text\` command', () => \{
			    const command = \{
			      command: 'assertNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert prompt\` command', () => \{
			    const command = \{
			      command: 'assertPrompt',
			      target: 'a prompt',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'assert selected label' command", () => \{
			    const command = \{
			      command: 'assertSelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert selected value\` command', () => \{
			    const command = \{
			      command: 'assertSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert text\` command', () => \{
			    const command = \{
			      command: 'assertText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert title\` command', () => \{
			    const command = \{
			      command: 'assertTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert value\` command', () => \{
			    const command = \{
			      command: 'assertValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click\` command', () => \{
			    const command = \{
			      command: 'click',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click at\` command', () => \{
			    const command = \{
			      command: 'clickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`check\` command', () => \{
			    const command = \{
			      command: 'check',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`close\` command', () => \{
			    const command = \{
			      command: 'close',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`do\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.do,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click\` command', () => \{
			    const command = \{
			      command: 'doubleClick',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click at\` command', () => \{
			    const command = \{
			      command: 'doubleClickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`drag and drop to object\` command', () => \{
			    const command = \{
			      command: 'dragAndDropToObject',
			      target: 'link=dragged',
			      value: 'link=dropped',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command', () => \{
			    const command = \{
			      command: 'echo',
			      target: 'blah',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command with variables', () => \{
			    const command = \{
			      command: 'echo',
			      target: '\$\{blah\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`edit content\` command', () => \{
			    const command = \{
			      command: 'editContent',
			      target: 'id=contentEditable',
			      value: '<button>test</button>',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.else,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.elseIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`end\` command', async () => \{
			    const command = \{
			      command: ControlFlowCommandNames.end,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command with return string value', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'return "a"',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute async script\` command', () => \{
			    const command = \{
			      command: 'executeAsyncScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`forEach\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: 'collection',
			      value: 'iteratorVar',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.if,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down\` command', () => \{
			    const command = \{
			      command: 'mouseDown',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down at\` event', () => \{
			    const command = \{
			      command: 'mouseDownAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it.skip('should emit \`mouse move\` event', () => \{
			    const command = \{
			      command: 'mouseMove',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse move at\` event', () => \{
			    const command = \{
			      command: 'mouseMoveAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse out\` event', () => \{
			    const command = \{
			      command: 'mouseOut',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse over\` event', () => \{
			    const command = \{
			      command: 'mouseOver',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up\` event', () => \{
			    const command = \{
			      command: 'mouseUp',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up at\` event', () => \{
			    const command = \{
			      command: 'mouseUpAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`open\` with absolute url', () => \{
			    const command = \{
			      command: 'open',
			      target: 'https://www.seleniumhq.org/',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`pause\` command', () => \{
			    const command = \{
			      command: 'pause',
			      target: '300',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`remove selection\` command', () => \{
			    const command = \{
			      command: 'removeSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`repeatIf\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.repeatIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run\` command', () => \{
			    const command = \{
			      command: 'run',
			      target: 'some test case',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run script\` command', () => \{
			    const command = \{
			      command: 'runScript',
			      target: "alert('test');alert('Im annoying');",
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select\` command', () => \{
			    const command = \{
			      command: 'select',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select frame\` to select the top frame', () => \{
			    const command = \{
			      command: 'selectFrame',
			      target: 'relative=top',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should fail to emit \`select window\` by using unknown locator', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'notExisting=something',
			      value: '',
			    \}
			    return expect(prettify(command)).rejects.toThrow(
			      'Can only emit \`select window\` using handles'
			    )
			  \})
			  it('should emit \`select window\` to select a window by handle', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'handle=\$\{window\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by name', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'name=window',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by the local keyword', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_local',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by implicit index', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_12',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a variable input', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: '\$\{blah\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a key press', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'SuperSecretPassword!\$\{KEY_ENTER\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`set speed\`', () => \{
			    const command = \{ command: 'setSpeed', target: '1000' \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`setWindowSize\`', () => \{
			    const command = \{
			      command: 'setWindowSize',
			      target: '1440x1177',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should skip playback supported commands, that are not supported in webdriver', () => \{
			    return Promise.all([
			      expect(
			        prettify(\{ command: 'answerOnNextPrompt', target: 'blah' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextPrompt' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseOkOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			    ])
			  \})
			  it('should emit \`store\` command', () => \{
			    const command = \{
			      command: 'store',
			      target: 'some value',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store attribute\` command', () => \{
			    const command = \{
			      command: 'storeAttribute',
			      target: 'xpath=button[3]@id',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store text\` command', () => \{
			    const command = \{
			      command: 'storeText',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it.skip('should emit \`store json\` command', () => \{
			    const command = \{
			      command: 'storeJson',
			      target: '[\{"a":0\}]',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store title\` command', () => \{
			    const command = \{
			      command: 'storeTitle',
			      target: 'blah',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store value\` command', () => \{
			    const command = \{
			      command: 'storeValue',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store window handle\` command', () => \{
			    const command = \{
			      command: 'storeWindowHandle',
			      target: 'windowName',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store xpath count\` command', () => \{
			    const command = \{
			      command: 'storeXpathCount',
			      target: 'xpath=button',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`submit\` command', () => \{
			    const command = \{
			      command: 'submit',
			      target: 'id=form',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`times\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.times,
			      target: '5',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`type\` command', () => \{
			    const command = \{
			      command: 'type',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`uncheck\` command', () => \{
			    const command = \{
			      command: 'uncheck',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify\` command', () => \{
			    const command = \{
			      command: 'verify',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify checked\` command', () => \{
			    const command = \{
			      command: 'verifyChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify editable\` command', () => \{
			    const command = \{
			      command: 'verifyEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element present\` command', () => \{
			    const command = \{
			      command: 'verifyElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element not present\` command', () => \{
			    const command = \{
			      command: 'verifyElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not checked\` command', () => \{
			    const command = \{
			      command: 'verifyNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not editable\` command', () => \{
			    const command = \{
			      command: 'verifyNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not selected value\` command', () => \{
			    const command = \{
			      command: 'verifyNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not text\` command', () => \{
			    const command = \{
			      command: 'verifyNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'verify selected label' command", () => \{
			    const command = \{
			      command: 'verifySelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify value\` command', () => \{
			    const command = \{
			      command: 'verifyValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify selected value\` command', () => \{
			    const command = \{
			      command: 'verifySelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify text\` command', () => \{
			    const command = \{
			      command: 'verifyText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify title\` command', () => \{
			    const command = \{
			      command: 'verifyTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForText\` command', () => \{
			    const command = \{
			      command: 'waitForText',
			      target: 'css=#blah',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`answer on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverAnswerOnVisiblePrompt',
			      target: 'an answer',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose cancel on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseCancelOnVisiblePrompt',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose ok on visible confirmation\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseOkOnVisibleConfirmation',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`while\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.while,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit new window handling, if command opens a new window', () => \{
			    const command = \{
			      command: 'click',
			      target: 'css=button',
			      value: '',
			      opensWindow: true,
			      windowHandleName: 'newWin',
			      windowTimeout: 2000,
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-java-junit\\__test__\\src\\command.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(100)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-java-junit\\__test__\\src\\index.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import fs from 'fs'
			import path from 'path'
			import codeExport, \{
			  emitTest,
			  emitSuite,
			  _emitMethod,
			  _findTestByName,
			\} from '../../src'
			import Command from '../../src/command'
			import \{ project as projectProcessor \} from '@seleniumhq/side-code-export'
			
			function readFile(filename) \{
			  return JSON.parse(
			    fs.readFileSync(
			      path.join(
			        __dirname,
			        '..',
			        '..',
			        '..',
			        'side-code-export',
			        '__test__',
			        'test-files',
			        filename
			      )
			    )
			  )
			\}
			
			describe('Code Export Java JUnit', () => \{
			  it('should export a test', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with a grid configuration', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			      beforeEachOptions: \{
			        browserName: 'Firefox',
			        gridUrl: 'http://localhost:4444/wd/hub',
			      \},
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite', async () => \{
			    const project = normalizeProject(readFile('single-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[1],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('select-window.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite that uses control flow commands', async () => \{
			    const project = normalizeProject(readFile('control-flow-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with commands that open a new window inside of a reused test method', async () => \{
			    const project = normalizeProject(readFile('nested-select-window.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with just one new window util method when there are multiple commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('nested-select-window-v2.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export the command emitter', () => \{
			    expect(Command.emit).toStrictEqual(codeExport.emit.command)
			  \})
			\})
			
			function normalizeProject(project) \{
			  let _project = \{ ...project \}
			  _project.suites.forEach(suite => \{
			    projectProcessor.normalizeTestsInSuite(\{ suite, tests: _project.tests \})
			  \})
			  return _project
			\}
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-java-junit\\__test__\\src\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-java-junit\\__test__\\src\\location.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/location'
			
			describe('location code emitter', () => \{
			  it('should fail to emit empty string', () => \{
			    return expect(() => \{
			      emit('')
			    \}).toThrow("Locator can't be empty")
			  \})
			  it('should fail to emit unknown locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown locator notExists')
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.id("\$\{selector\}")\`
			    )
			  \})
			  it('should emit link locator', () => \{
			    const type = 'link'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.linkText("\$\{selector\}")\`
			    )
			  \})
			  it('should emit linkText locator', () => \{
			    const type = 'linkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.linkText("\$\{selector\}")\`
			    )
			  \})
			  it('should emit partialLinkText locator', () => \{
			    const type = 'partialLinkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.partialLinkText("\$\{selector\}")\`
			    )
			  \})
			  it('should emit css locator', () => \{
			    const type = 'css'
			    const selector = 'someCss'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.cssSelector("\$\{selector\}")\`
			    )
			  \})
			  it('should emit css locator with \`=\` sign', () => \{
			    const type = 'css'
			    const selector = 'a[title=JScript]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.cssSelector("\$\{selector\}")\`
			    )
			  \})
			  it('should escape quotes in locator strings', () => \{
			    const type = 'css'
			    const selector = 'a[title="escaped"]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit xpath locator', () => \{
			    const type = 'xpath'
			    const selector = 'someXpath'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.xpath("\$\{selector\}")\`
			    )
			  \})
			  it('should emit implicit xpath locator', () => \{
			    const selector = '//test=xpath'
			    return expect(emit(selector)).resolves.toBe(\`By.xpath("\$\{selector\}")\`)
			  \})
			  it('should emit name locator', () => \{
			    const type = 'name'
			    const selector = 'someName'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.name("\$\{selector\}")\`
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-java-junit\\__test__\\src\\location.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-java-junit\\__test__\\src\\selection.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/selection'
			
			describe('selection location code emitter', () => \{
			  it('should fail to emit unknown selection locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown selection locator notExists')
			  \})
			  it('should assume when no selector is given that it is the label locator', () => \{
			    return expect(emit('label')).resolves.toBe(
			      \`By.xpath("//option[. = 'label']")\`
			    )
			  \})
			  it('should emit label locator', () => \{
			    const type = 'label'
			    const selector = 'a label'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.xpath("//option[. = '\$\{selector\}']")\`
			    )
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.cssSelector("*[id='\$\{selector\}']")\`
			    )
			  \})
			  it('should emit value locator', () => \{
			    const type = 'value'
			    const selector = 'someValue'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.cssSelector("*[value='\$\{selector\}']")\`
			    )
			  \})
			  it('should emit index locator', () => \{
			    const type = 'index'
			    const selector = '2'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toBe(
			      \`By.cssSelector("*:nth-child(\$\{selector\})")\`
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-java-junit\\__test__\\src\\selection.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-javascript-mocha\\__test__\\src\\command.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Command from '../../src/command'
			import \{
			  Commands,
			  ControlFlowCommandNames,
			\} from '../../../selenium-ide/src/neo/models/Command'
			import \{ opts \} from '../../src/index'
			import \{ codeExport as exporter \} from '@seleniumhq/side-code-export'
			
			const commandPrefixPadding = opts.commandPrefixPadding
			
			async function prettify(command, \{ fullPayload \} = \{\}) \{
			  const commandBlock = await Command.emit(command)
			  const result = exporter.prettify(commandBlock, \{
			    commandPrefixPadding,
			  \})
			  return fullPayload ? result : result.body
			\}
			
			describe('command code emitter', () => \{
			  it('should emit all known commands', () => \{
			    let result = []
			    Commands.array.forEach(command => \{
			      if (!Command.canEmit(command)) \{
			        result.push(command)
			      \}
			    \})
			    expect(() => \{
			      if (result.length) \{
			        if (result.length === 1) \{
			          throw new Error(\`\$\{result[0]\} has no emitter, write one!\`)
			        \} else \{
			          throw new Error(\`No emitters for \$\{result.join(', ')\}. Write them!\`)
			        \}
			      \}
			    \}).not.toThrow()
			  \})
			  it('should emit \`add selection\` command', () => \{
			    const command = \{
			      command: 'addSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert\` command', () => \{
			    const command = \{
			      command: 'assert',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert alert\` command', () => \{
			    const command = \{
			      command: 'assertAlert',
			      target: 'an alert',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert checked\` command', () => \{
			    const command = \{
			      command: 'assertChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert confirmation\` command', () => \{
			    const command = \{
			      command: 'assertConfirmation',
			      target: 'a confirmation',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert editable\` command', () => \{
			    const command = \{
			      command: 'assertEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element present\` command', () => \{
			    const command = \{
			      command: 'assertElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element not present\` command', () => \{
			    const command = \{
			      command: 'assertElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not checked\` command', () => \{
			    const command = \{
			      command: 'assertNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not editable\` command', () => \{
			    const command = \{
			      command: 'assertNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not selected value\` command', () => \{
			    const command = \{
			      command: 'assertNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not text\` command', () => \{
			    const command = \{
			      command: 'assertNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert prompt\` command', () => \{
			    const command = \{
			      command: 'assertPrompt',
			      target: 'a prompt',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'assert selected label' command", () => \{
			    const command = \{
			      command: 'assertSelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert selected value\` command', () => \{
			    const command = \{
			      command: 'assertSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert text\` command', () => \{
			    const command = \{
			      command: 'assertText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert title\` command', () => \{
			    const command = \{
			      command: 'assertTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert value\` command', () => \{
			    const command = \{
			      command: 'assertValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click\` command', () => \{
			    const command = \{
			      command: 'click',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click at\` command', () => \{
			    const command = \{
			      command: 'clickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`check\` command', () => \{
			    const command = \{
			      command: 'check',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`close\` command', () => \{
			    const command = \{
			      command: 'close',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`do\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.do,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click\` command', () => \{
			    const command = \{
			      command: 'doubleClick',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click at\` command', () => \{
			    const command = \{
			      command: 'doubleClickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`drag and drop to object\` command', () => \{
			    const command = \{
			      command: 'dragAndDropToObject',
			      target: 'link=dragged',
			      value: 'link=dropped',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command', () => \{
			    const command = \{
			      command: 'echo',
			      target: 'blah',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command with variables', () => \{
			    const command = \{
			      command: 'echo',
			      target: '\$\{blah\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`edit content\` command', () => \{
			    const command = \{
			      command: 'editContent',
			      target: 'id=contentEditable',
			      value: '<button>test</button>',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.else,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.elseIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`end\` command', async () => \{
			    const command = \{
			      command: ControlFlowCommandNames.end,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command with return string value', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'return "a"',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute async script\` command', () => \{
			    const command = \{
			      command: 'executeAsyncScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`forEach\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: 'collection',
			      value: 'iteratorVar',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.if,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down\` command', () => \{
			    const command = \{
			      command: 'mouseDown',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down at\` event', () => \{
			    const command = \{
			      command: 'mouseDownAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it.skip('should emit \`mouse move\` event', () => \{
			    const command = \{
			      command: 'mouseMove',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse move at\` event', () => \{
			    const command = \{
			      command: 'mouseMoveAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse out\` event', () => \{
			    const command = \{
			      command: 'mouseOut',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse over\` event', () => \{
			    const command = \{
			      command: 'mouseOver',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up\` event', () => \{
			    const command = \{
			      command: 'mouseUp',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up at\` event', () => \{
			    const command = \{
			      command: 'mouseUpAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`open\` with absolute url', () => \{
			    const command = \{
			      command: 'open',
			      target: 'https://www.seleniumhq.org/',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`pause\` command', () => \{
			    const command = \{
			      command: 'pause',
			      target: '300',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`remove selection\` command', () => \{
			    const command = \{
			      command: 'removeSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`repeatIf\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.repeatIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run\` command', () => \{
			    const command = \{
			      command: 'run',
			      target: 'some test case',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run script\` command', () => \{
			    const command = \{
			      command: 'runScript',
			      target: "alert('test');alert('Im annoying');",
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select\` command', () => \{
			    const command = \{
			      command: 'select',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select frame\` to select the top frame', () => \{
			    const command = \{
			      command: 'selectFrame',
			      target: 'relative=top',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should fail to emit \`select window\` by using unknown locator', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'notExisting=something',
			      value: '',
			    \}
			    return expect(prettify(command)).rejects.toThrow(
			      'Can only emit \`select window\` using handles'
			    )
			  \})
			  it('should emit \`select window\` to select a window by handle', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'handle=\$\{window\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by name', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'name=window',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by the local keyword', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_local',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by implicit index', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_12',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a variable input', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: '\$\{blah\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a key press', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'SuperSecretPassword!\$\{KEY_ENTER\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`set speed\`', () => \{
			    return expect(
			      prettify(\{ command: 'setSpeed', target: '1000' \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`setWindowSize\`', () => \{
			    const command = \{
			      command: 'setWindowSize',
			      target: '1440x1177',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should skip playback supported commands, that are not supported in webdriver', () => \{
			    return Promise.all([
			      expect(
			        prettify(\{ command: 'answerOnNextPrompt', target: 'blah' \})
			      ).resolves.toBe(undefined),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextConfirmation' \})
			      ).resolves.toBe(undefined),
			      expect(prettify(\{ command: 'chooseCancelOnNextPrompt' \})).resolves.toBe(
			        undefined
			      ),
			      expect(prettify(\{ command: 'chooseOkOnNextConfirmation' \})).resolves.toBe(
			        undefined
			      ),
			    ])
			  \})
			  it('should emit \`store\` command', () => \{
			    const command = \{
			      command: 'store',
			      target: 'some value',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store attribute\` command', () => \{
			    const command = \{
			      command: 'storeAttribute',
			      target: 'xpath=button[3]@id',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store text\` command', () => \{
			    const command = \{
			      command: 'storeText',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store json\` command', () => \{
			    const command = \{
			      command: 'storeJson',
			      target: '[\{"a":0\}]',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store title\` command', () => \{
			    const command = \{
			      command: 'storeTitle',
			      target: 'blah',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store value\` command', () => \{
			    const command = \{
			      command: 'storeValue',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store window handle\` command', () => \{
			    const command = \{
			      command: 'storeWindowHandle',
			      target: 'windowName',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store xpath count\` command', () => \{
			    const command = \{
			      command: 'storeXpathCount',
			      target: 'xpath=button',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`submit\` command', () => \{
			    const command = \{
			      command: 'submit',
			      target: 'id=form',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`times\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.times,
			      target: '5',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`type\` command', () => \{
			    const command = \{
			      command: 'type',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`uncheck\` command', () => \{
			    const command = \{
			      command: 'uncheck',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify\` command', () => \{
			    const command = \{
			      command: 'verify',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify checked\` command', () => \{
			    const command = \{
			      command: 'verifyChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify editable\` command', () => \{
			    const command = \{
			      command: 'verifyEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element present\` command', () => \{
			    const command = \{
			      command: 'verifyElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element not present\` command', () => \{
			    const command = \{
			      command: 'verifyElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not checked\` command', () => \{
			    const command = \{
			      command: 'verifyNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not editable\` command', () => \{
			    const command = \{
			      command: 'verifyNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not selected value\` command', () => \{
			    const command = \{
			      command: 'verifyNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not text\` command', () => \{
			    const command = \{
			      command: 'verifyNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'verify selected label' command", () => \{
			    const command = \{
			      command: 'verifySelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify value\` command', () => \{
			    const command = \{
			      command: 'verifyValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify selected value\` command', () => \{
			    const command = \{
			      command: 'verifySelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify text\` command', () => \{
			    const command = \{
			      command: 'verifyText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify title\` command', () => \{
			    const command = \{
			      command: 'verifyTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForText\` command', () => \{
			    const command = \{
			      command: 'waitForText',
			      target: 'css=#blah',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`answer on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverAnswerOnVisiblePrompt',
			      target: 'an answer',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose cancel on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseCancelOnVisiblePrompt',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose ok on visible confirmation\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseOkOnVisibleConfirmation',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`while\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.while,
			      target: 'true',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit new window handling, if command opens a new window', () => \{
			    const command = \{
			      command: 'click',
			      target: 'css=button',
			      value: '',
			      opensWindow: true,
			      windowHandleName: 'newWin',
			      windowTimeout: 2000,
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-javascript-mocha\\__test__\\src\\command.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(102)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-javascript-mocha\\__test__\\src\\index.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import fs from 'fs'
			import path from 'path'
			import codeExport, \{
			  emitTest,
			  emitSuite,
			  _emitMethod,
			  _findTestByName,
			\} from '../../src'
			import Command from '../../src/command'
			import \{ project as projectProcessor \} from '@seleniumhq/side-code-export'
			
			function readFile(filename) \{
			  return JSON.parse(
			    fs.readFileSync(
			      path.join(
			        __dirname,
			        '..',
			        '..',
			        '..',
			        'side-code-export',
			        '__test__',
			        'test-files',
			        filename
			      )
			    )
			  )
			\}
			
			describe('Code Export JavaScript Mocha', () => \{
			  it('should export a test', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with grid execution', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			      beforeEachOptions: \{
			        browserName: 'Firefox',
			        gridUrl: 'http://localhost:4444/wd/hub',
			      \},
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite', async () => \{
			    const project = normalizeProject(readFile('single-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[1],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite that uses control flow commands', async () => \{
			    const project = normalizeProject(readFile('control-flow-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('select-window.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with commands that open a new window inside of a reused test method', async () => \{
			    const project = normalizeProject(readFile('nested-select-window.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with just one new window util method when there are multiple commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('nested-select-window-v2.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export the command emitter', () => \{
			    expect(Command.emit).toStrictEqual(codeExport.emit.command)
			  \})
			\})
			
			function normalizeProject(project) \{
			  let _project = \{ ...project \}
			  _project.suites.forEach(suite => \{
			    projectProcessor.normalizeTestsInSuite(\{ suite, tests: _project.tests \})
			  \})
			  return _project
			\}
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-javascript-mocha\\__test__\\src\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-javascript-mocha\\__test__\\src\\location.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/location'
			
			describe('location code emitter', () => \{
			  it('should fail to emit empty string', () => \{
			    return expect(() => \{
			      emit('')
			    \}).toThrow("Locator can't be empty")
			  \})
			  it('should fail to emit unknown locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown locator notExists')
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.id("someId")\`
			    )
			  \})
			  it('should emit link locator', () => \{
			    const type = 'link'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.linkText("someLink")\`
			    )
			  \})
			  it('should emit linkText locator', () => \{
			    const type = 'linkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.linkText("someLink")\`
			    )
			  \})
			  it('should emit partialLinkText locator', () => \{
			    const type = 'partialLinkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.partialLinkText("someLink")\`
			    )
			  \})
			  it('should emit css locator', () => \{
			    const type = 'css'
			    const selector = 'someCss'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.css("someCss")\`
			    )
			  \})
			  it('should emit css locator with \`=\` sign', () => \{
			    const type = 'css'
			    const selector = 'a[title=JScript]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.css("a[title=JScript]")\`
			    )
			  \})
			  it('should escape quotes in locator strings', () => \{
			    const type = 'css'
			    const selector = 'a[title="escaped"]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit xpath locator', () => \{
			    const type = 'xpath'
			    const selector = 'someXpath'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.xpath("someXpath")\`
			    )
			  \})
			  it('should emit implicit xpath locator', () => \{
			    const selector = '//test=xpath'
			    return expect(emit(selector)).resolves.toEqual(\`By.xpath("//test=xpath")\`)
			  \})
			  it('should emit name locator', () => \{
			    const type = 'name'
			    const selector = 'someName'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.name("someName")\`
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-javascript-mocha\\__test__\\src\\location.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-javascript-mocha\\__test__\\src\\selection.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/selection'
			
			describe('selection location code emitter', () => \{
			  it('should fail to emit unknown selection locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown selection locator notExists')
			  \})
			  it('should assume when no selector is given that it is the label locator', () => \{
			    return expect(emit('label')).resolves.toEqual(
			      \`By.xpath("//option[. = 'label']")\`
			    )
			  \})
			  it('should emit label locator', () => \{
			    const type = 'label'
			    const selector = 'a label'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.xpath("//option[. = '\$\{selector\}']")\`
			    )
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.css("*[id='\$\{selector\}']")\`
			    )
			  \})
			  it('should emit value locator', () => \{
			    const type = 'value'
			    const selector = 'someValue'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.css("*[value='\$\{selector\}']")\`
			    )
			  \})
			  it('should emit index locator', () => \{
			    const type = 'index'
			    const selector = '2'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.css("*:nth-child(\$\{selector\})")\`
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-javascript-mocha\\__test__\\src\\selection.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-python-pytest\\__test__\\src\\command.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Command from '../../src/command'
			import \{
			  Commands,
			  ControlFlowCommandNames,
			\} from '../../../selenium-ide/src/neo/models/Command'
			import \{ opts \} from '../../src/index'
			import \{ codeExport as exporter \} from '@seleniumhq/side-code-export'
			
			const commandPrefixPadding = opts.commandPrefixPadding
			
			async function prettify(command, \{ fullPayload \} = \{\}) \{
			  const commandBlock = await Command.emit(command)
			  const result = exporter.prettify(commandBlock, \{
			    commandPrefixPadding,
			  \})
			  return fullPayload ? result : result.body
			\}
			
			describe('command code emitter', () => \{
			  it('should emit all known commands', () => \{
			    let result = []
			    Commands.array.forEach(command => \{
			      if (!Command.canEmit(command)) \{
			        result.push(command)
			      \}
			    \})
			    expect(() => \{
			      if (result.length) \{
			        if (result.length === 1) \{
			          throw new Error(\`\$\{result[0]\} has no emitter, write one!\`)
			        \} else \{
			          throw new Error(\`No emitters for \$\{result.join(', ')\}. Write them!\`)
			        \}
			      \}
			    \}).not.toThrow()
			  \})
			  it('should emit \`add selection\` command', () => \{
			    const command = \{
			      command: 'addSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert\` command', () => \{
			    const command = \{
			      command: 'assert',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert alert\` command', () => \{
			    const command = \{
			      command: 'assertAlert',
			      target: 'an alert',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert checked\` command', () => \{
			    const command = \{
			      command: 'assertChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert confirmation\` command', () => \{
			    const command = \{
			      command: 'assertConfirmation',
			      target: 'a confirmation',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert editable\` command', () => \{
			    const command = \{
			      command: 'assertEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element present\` command', () => \{
			    const command = \{
			      command: 'assertElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element not present\` command', () => \{
			    const command = \{
			      command: 'assertElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not checked\` command', () => \{
			    const command = \{
			      command: 'assertNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not editable\` command', () => \{
			    const command = \{
			      command: 'assertNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not selected value\` command', () => \{
			    const command = \{
			      command: 'assertNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not text\` command', () => \{
			    const command = \{
			      command: 'assertNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert prompt\` command', () => \{
			    const command = \{
			      command: 'assertPrompt',
			      target: 'a prompt',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'assert selected label' command", () => \{
			    const command = \{
			      command: 'assertSelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert selected value\` command', () => \{
			    const command = \{
			      command: 'assertSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert text\` command', () => \{
			    const command = \{
			      command: 'assertText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert title\` command', () => \{
			    const command = \{
			      command: 'assertTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert value\` command', () => \{
			    const command = \{
			      command: 'assertValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click\` command', () => \{
			    const command = \{
			      command: 'click',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click at\` command', () => \{
			    const command = \{
			      command: 'clickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`check\` command', () => \{
			    const command = \{
			      command: 'check',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`close\` command', () => \{
			    const command = \{
			      command: 'close',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`do\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.do,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click\` command', () => \{
			    const command = \{
			      command: 'doubleClick',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click at\` command', () => \{
			    const command = \{
			      command: 'doubleClickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`drag and drop to object\` command', () => \{
			    const command = \{
			      command: 'dragAndDropToObject',
			      target: 'link=dragged',
			      value: 'link=dropped',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command', () => \{
			    const command = \{
			      command: 'echo',
			      target: 'blah',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command with variables', () => \{
			    const command = \{
			      command: 'echo',
			      target: 'blah = \$\{blah\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`edit content\` command', () => \{
			    const command = \{
			      command: 'editContent',
			      target: 'id=contentEditable',
			      value: '<button>test</button>',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.else,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.elseIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`end\` command', async () => \{
			    const command = \{
			      command: ControlFlowCommandNames.end,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command with return string value', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'return "a"',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute async script\` command', () => \{
			    const command = \{
			      command: 'executeAsyncScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`forEach\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: 'collection',
			      value: 'iteratorVar',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.if,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down\` command', () => \{
			    const command = \{
			      command: 'mouseDown',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down at\` event', () => \{
			    const command = \{
			      command: 'mouseDownAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it.skip('should emit \`mouse move\` event', () => \{
			    const command = \{
			      command: 'mouseMove',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse move at\` event', () => \{
			    const command = \{
			      command: 'mouseMoveAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse out\` event', () => \{
			    const command = \{
			      command: 'mouseOut',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse over\` event', () => \{
			    const command = \{
			      command: 'mouseOver',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up\` event', () => \{
			    const command = \{
			      command: 'mouseUp',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up at\` event', () => \{
			    const command = \{
			      command: 'mouseUpAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`open\` with absolute url', () => \{
			    const command = \{
			      command: 'open',
			      target: 'https://www.seleniumhq.org/',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`pause\` command', () => \{
			    const command = \{
			      command: 'pause',
			      target: '300',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`remove selection\` command', () => \{
			    const command = \{
			      command: 'removeSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`repeatIf\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.repeatIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run\` command', () => \{
			    const command = \{
			      command: 'run',
			      target: 'some test case',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run script\` command', () => \{
			    const command = \{
			      command: 'runScript',
			      target: "alert('test');alert('Im annoying');",
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select\` command', () => \{
			    const command = \{
			      command: 'select',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select frame\` to select the top frame', () => \{
			    const command = \{
			      command: 'selectFrame',
			      target: 'relative=top',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should fail to emit \`select window\` by using unknown locator', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'notExisting=something',
			      value: '',
			    \}
			    return expect(prettify(command)).rejects.toThrow(
			      'Can only emit \`select window\` using handles'
			    )
			  \})
			  it('should emit \`select window\` to select a window by handle', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'handle=\$\{window\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by name', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'name=window',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by the local keyword', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_local',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by implicit index', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_12',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a variable input', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: '\$\{blah\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a key press', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'SuperSecretPassword!\$\{KEY_ENTER\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`set speed\`', () => \{
			    const command = \{ command: 'setSpeed', target: '1000' \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`setWindowSize\`', () => \{
			    const command = \{
			      command: 'setWindowSize',
			      target: '1440x1177',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should skip playback supported commands, that are not supported in webdriver', () => \{
			    return Promise.all([
			      expect(
			        prettify(\{ command: 'answerOnNextPrompt', target: 'blah' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextPrompt' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseOkOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			    ])
			  \})
			  it('should emit \`store\` command', () => \{
			    const command = \{
			      command: 'store',
			      target: 'some value',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store attribute\` command', () => \{
			    const command = \{
			      command: 'storeAttribute',
			      target: 'xpath=button[3]@id',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store text\` command', () => \{
			    const command = \{
			      command: 'storeText',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store json\` command', () => \{
			    const command = \{
			      command: 'storeJson',
			      target: '[\{"a":0\}]',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store title\` command', () => \{
			    const command = \{
			      command: 'storeTitle',
			      target: 'blah',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store value\` command', () => \{
			    const command = \{
			      command: 'storeValue',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store window handle\` command', () => \{
			    const command = \{
			      command: 'storeWindowHandle',
			      target: 'windowName',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store xpath count\` command', () => \{
			    const command = \{
			      command: 'storeXpathCount',
			      target: 'xpath=button',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`submit\` command', () => \{
			    const command = \{
			      command: 'submit',
			      target: 'id=form',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`times\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.times,
			      target: '5',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`type\` command', () => \{
			    const command = \{
			      command: 'type',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`uncheck\` command', () => \{
			    const command = \{
			      command: 'uncheck',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify\` command', () => \{
			    const command = \{
			      command: 'verify',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify checked\` command', () => \{
			    const command = \{
			      command: 'verifyChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify editable\` command', () => \{
			    const command = \{
			      command: 'verifyEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element present\` command', () => \{
			    const command = \{
			      command: 'verifyElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element not present\` command', () => \{
			    const command = \{
			      command: 'verifyElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not checked\` command', () => \{
			    const command = \{
			      command: 'verifyNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not editable\` command', () => \{
			    const command = \{
			      command: 'verifyNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not selected value\` command', () => \{
			    const command = \{
			      command: 'verifyNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not text\` command', () => \{
			    const command = \{
			      command: 'verifyNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'verify selected label' command", () => \{
			    const command = \{
			      command: 'verifySelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify value\` command', () => \{
			    const command = \{
			      command: 'verifyValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify selected value\` command', () => \{
			    const command = \{
			      command: 'verifySelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify text\` command', () => \{
			    const command = \{
			      command: 'verifyText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify title\` command', () => \{
			    const command = \{
			      command: 'verifyTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForText\` command', () => \{
			    const command = \{
			      command: 'waitForText',
			      target: 'css=#blah',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`answer on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverAnswerOnVisiblePrompt',
			      target: 'an answer',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose cancel on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseCancelOnVisiblePrompt',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose ok on visible confirmation\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseOkOnVisibleConfirmation',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`while\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.while,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit new window handling, if command opens a new window', () => \{
			    const command = \{
			      command: 'click',
			      target: 'css=button',
			      value: '',
			      opensWindow: true,
			      windowHandleName: 'newWin',
			      windowTimeout: 2000,
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-python-pytest\\__test__\\src\\command.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(102)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-python-pytest\\__test__\\src\\index.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import fs from 'fs'
			import path from 'path'
			import codeExport, \{
			  emitTest,
			  emitSuite,
			  _emitMethod,
			  _findTestByName,
			\} from '../../src'
			import Command from '../../src/command'
			import \{ project as projectProcessor \} from '@seleniumhq/side-code-export'
			
			function readFile(filename) \{
			  return JSON.parse(
			    fs.readFileSync(
			      path.join(
			        __dirname,
			        '..',
			        '..',
			        '..',
			        'side-code-export',
			        '__test__',
			        'test-files',
			        filename
			      )
			    )
			  )
			\}
			
			describe('Code Export Python pytest', () => \{
			  it('should export a test', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with grid execution', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			      beforeEachOptions: \{
			        browserName: 'Firefox',
			        gridUrl: 'http://localhost:4444/wd/hub',
			      \},
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite', async () => \{
			    const project = normalizeProject(readFile('single-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[1],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite that uses control flow commands', async () => \{
			    const project = normalizeProject(readFile('control-flow-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('select-window.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with commands that open a new window inside of a reused test method', async () => \{
			    const project = normalizeProject(readFile('nested-select-window.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with just one new window util method when there are multiple commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('nested-select-window-v2.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export the command emitter', () => \{
			    expect(Command.emit).toStrictEqual(codeExport.emit.command)
			  \})
			\})
			
			function normalizeProject(project) \{
			  let _project = \{ ...project \}
			  _project.suites.forEach(suite => \{
			    projectProcessor.normalizeTestsInSuite(\{ suite, tests: _project.tests \})
			  \})
			  return _project
			\}
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-python-pytest\\__test__\\src\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-python-pytest\\__test__\\src\\location.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/location'
			
			describe('location code emitter', () => \{
			  it('should fail to emit empty string', () => \{
			    return expect(() => \{
			      emit('')
			    \}).toThrow("Locator can't be empty")
			  \})
			  it('should fail to emit unknown locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown locator notExists')
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.ID, "someId"\`
			    )
			  \})
			  it('should emit link locator', () => \{
			    const type = 'link'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.LINK_TEXT, "someLink"\`
			    )
			  \})
			  it('should emit linkText locator', () => \{
			    const type = 'linkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.LINK_TEXT, "someLink"\`
			    )
			  \})
			  it('should emit partialLinkText locator', () => \{
			    const type = 'partialLinkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.PARTIAL_LINK_TEXT, "someLink"\`
			    )
			  \})
			  it('should emit css locator', () => \{
			    const type = 'css'
			    const selector = 'someCss'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.CSS_SELECTOR, "someCss"\`
			    )
			  \})
			  it('should emit css locator with \`=\` sign', () => \{
			    const type = 'css'
			    const selector = 'a[title=JScript]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.CSS_SELECTOR, "a[title=JScript]"\`
			    )
			  \})
			  it('should escape quotes in locator strings', () => \{
			    const type = 'css'
			    const selector = 'a[title="escaped"]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit xpath locator', () => \{
			    const type = 'xpath'
			    const selector = 'someXpath'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.XPATH, "someXpath"\`
			    )
			  \})
			  it('should emit implicit xpath locator', () => \{
			    const selector = '//test=xpath'
			    return expect(emit(selector)).resolves.toEqual(\`By.XPATH, "//test=xpath"\`)
			  \})
			  it('should emit name locator', () => \{
			    const type = 'name'
			    const selector = 'someName'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.NAME, "someName"\`
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-python-pytest\\__test__\\src\\location.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-python-pytest\\__test__\\src\\selection.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/selection'
			
			describe('selection location code emitter', () => \{
			  it('should fail to emit unknown selection locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown selection locator notExists')
			  \})
			  it('should assume when no selector is given that it is the label locator', () => \{
			    return expect(emit('label')).resolves.toEqual(
			      \`By.XPATH, "//option[. = 'label']"\`
			    )
			  \})
			  it('should emit label locator', () => \{
			    const type = 'label'
			    const selector = 'a label'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.XPATH, "//option[. = '\$\{selector\}']"\`
			    )
			  \})
			  it('should emit label locator with variable', () => \{
			    const type = 'label'
			    const selector = 'self.vars["label"]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.XPATH, "//option[. = '\{\}']".format(\$\{selector\})\`
			    )
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.CSS_SELECTOR, "*[id='\$\{selector\}']"\`
			    )
			  \})
			  it('should emit value locator', () => \{
			    const type = 'value'
			    const selector = 'someValue'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.CSS_SELECTOR, "*[value='\$\{selector\}']"\`
			    )
			  \})
			  it('should emit index locator', () => \{
			    const type = 'index'
			    const selector = '2'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toEqual(
			      \`By.CSS_SELECTOR, "*:nth-child(\$\{selector\})"\`
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-python-pytest\\__test__\\src\\selection.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-ruby-rspec\\__test__\\src\\command.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Command from '../../src/command'
			import \{
			  Commands,
			  ControlFlowCommandNames,
			\} from '../../../selenium-ide/src/neo/models/Command'
			import \{ opts \} from '../../src/index'
			import \{ codeExport as exporter \} from '@seleniumhq/side-code-export'
			
			const commandPrefixPadding = opts.commandPrefixPadding
			
			async function prettify(command, \{ fullPayload, startingLevel \} = \{\}) \{
			  const commandBlock = await Command.emit(command)
			  const result = exporter.prettify(commandBlock, \{
			    commandPrefixPadding,
			    startingLevel,
			  \})
			  return fullPayload ? result : result.body
			\}
			
			describe('command code emitter', () => \{
			  it('should emit all known commands', () => \{
			    let result = []
			    Commands.array.forEach(command => \{
			      if (!Command.canEmit(command)) \{
			        result.push(command)
			      \}
			    \})
			    expect(() => \{
			      if (result.length) \{
			        if (result.length === 1) \{
			          throw new Error(\`\$\{result[0]\} has no emitter, write one!\`)
			        \} else \{
			          throw new Error(\`No emitters for \$\{result.join(', ')\}. Write them!\`)
			        \}
			      \}
			    \}).not.toThrow()
			  \})
			  it('should emit \`add selection\` command', () => \{
			    const command = \{
			      command: 'addSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert\` command', () => \{
			    const command = \{
			      command: 'assert',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert alert\` command', () => \{
			    const command = \{
			      command: 'assertAlert',
			      target: 'an alert',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert checked\` command', () => \{
			    const command = \{
			      command: 'assertChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert confirmation\` command', () => \{
			    const command = \{
			      command: 'assertConfirmation',
			      target: 'a confirmation',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert editable\` command', () => \{
			    const command = \{
			      command: 'assertEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element present\` command', () => \{
			    const command = \{
			      command: 'assertElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert element not present\` command', () => \{
			    const command = \{
			      command: 'assertElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not checked\` command', () => \{
			    const command = \{
			      command: 'assertNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not editable\` command', () => \{
			    const command = \{
			      command: 'assertNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not selected value\` command', () => \{
			    const command = \{
			      command: 'assertNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert not text\` command', () => \{
			    const command = \{
			      command: 'assertNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert prompt\` command', () => \{
			    const command = \{
			      command: 'assertPrompt',
			      target: 'a prompt',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'assert selected label' command", () => \{
			    const command = \{
			      command: 'assertSelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert selected value\` command', () => \{
			    const command = \{
			      command: 'assertSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert text\` command', () => \{
			    const command = \{
			      command: 'assertText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert title\` command', () => \{
			    const command = \{
			      command: 'assertTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`assert value\` command', () => \{
			    const command = \{
			      command: 'assertValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click\` command', () => \{
			    const command = \{
			      command: 'click',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`click at\` command', () => \{
			    const command = \{
			      command: 'clickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`check\` command', () => \{
			    const command = \{
			      command: 'check',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`close\` command', () => \{
			    const command = \{
			      command: 'close',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`do\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.do,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click\` command', () => \{
			    const command = \{
			      command: 'doubleClick',
			      target: 'link=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`double click at\` command', () => \{
			    const command = \{
			      command: 'doubleClickAt',
			      target: 'link=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`drag and drop to object\` command', () => \{
			    const command = \{
			      command: 'dragAndDropToObject',
			      target: 'link=dragged',
			      value: 'link=dropped',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command', () => \{
			    const command = \{
			      command: 'echo',
			      target: 'blah',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`echo\` command with variables', () => \{
			    const command = \{
			      command: 'echo',
			      target: '\$\{blah\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`edit content\` command', () => \{
			    const command = \{
			      command: 'editContent',
			      target: 'id=contentEditable',
			      value: '<button>test</button>',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.else,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`else if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.elseIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`end\` command', async () => \{
			    const command = \{
			      command: ControlFlowCommandNames.end,
			      target: '',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute script\` command with return string value', () => \{
			    const command = \{
			      command: 'executeScript',
			      target: 'return "a"',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`execute async script\` command', () => \{
			    const command = \{
			      command: 'executeAsyncScript',
			      target: 'javascript',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`forEach\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: 'collection',
			      value: 'iteratorVar',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`if\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.if,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down\` command', () => \{
			    const command = \{
			      command: 'mouseDown',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse down at\` event', () => \{
			    const command = \{
			      command: 'mouseDownAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it.skip('should emit \`mouse move\` event', () => \{
			    const command = \{
			      command: 'mouseMove',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse move at\` event', () => \{
			    const command = \{
			      command: 'mouseMoveAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse out\` event', () => \{
			    const command = \{
			      command: 'mouseOut',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse over\` event', () => \{
			    const command = \{
			      command: 'mouseOver',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up\` event', () => \{
			    const command = \{
			      command: 'mouseUp',
			      target: 'id=button',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`mouse up at\` event', () => \{
			    const command = \{
			      command: 'mouseUpAt',
			      target: 'id=button',
			      value: '10,20',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`open\` with absolute url', () => \{
			    const command = \{
			      command: 'open',
			      target: 'https://www.seleniumhq.org/',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`pause\` command', () => \{
			    const command = \{
			      command: 'pause',
			      target: '300',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`remove selection\` command', () => \{
			    const command = \{
			      command: 'removeSelection',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`repeatIf\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.repeatIf,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ startingLevel: 1 \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run\` command', () => \{
			    const command = \{
			      command: 'run',
			      target: 'some test case',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`run script\` command', () => \{
			    const command = \{
			      command: 'runScript',
			      target: "alert('test');alert('Im annoying');",
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select\` command', () => \{
			    const command = \{
			      command: 'select',
			      target: 'css=select',
			      value: 'label=A label',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select frame\` to select the top frame', () => \{
			    const command = \{
			      command: 'selectFrame',
			      target: 'relative=top',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should fail to emit \`select window\` by using unknown locator', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'notExisting=something',
			      value: '',
			    \}
			    return expect(prettify(command)).rejects.toThrow(
			      'Can only emit \`select window\` using handles'
			    )
			  \})
			  it('should emit \`select window\` to select a window by handle', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'handle=\$\{window\}',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by name', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'name=window',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by the local keyword', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_local',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`select window\` to select a window by implicit index', () => \{
			    const command = \{
			      command: 'selectWindow',
			      target: 'win_ser_12',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a variable input', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: '\$\{blah\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`send keys\` command with a key press', () => \{
			    const command = \{
			      command: 'sendKeys',
			      target: 'id=input',
			      value: 'SuperSecretPassword!\$\{KEY_ENTER\}',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`set speed\`', () => \{
			    const command = \{ command: 'setSpeed', target: '1000' \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`setWindowSize\`', () => \{
			    const command = \{
			      command: 'setWindowSize',
			      target: '1440x1177',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should skip playback supported commands, that are not supported in webdriver', () => \{
			    return Promise.all([
			      expect(
			        prettify(\{ command: 'answerOnNextPrompt', target: 'blah' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseCancelOnNextPrompt' \})
			      ).resolves.toMatchSnapshot(),
			      expect(
			        prettify(\{ command: 'chooseOkOnNextConfirmation' \})
			      ).resolves.toMatchSnapshot(),
			    ])
			  \})
			  it('should emit \`store\` command', () => \{
			    const command = \{
			      command: 'store',
			      target: 'some value',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store attribute\` command', () => \{
			    const command = \{
			      command: 'storeAttribute',
			      target: 'xpath=button[3]@id',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store text\` command', () => \{
			    const command = \{
			      command: 'storeText',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store json\` command', () => \{
			    const command = \{
			      command: 'storeJson',
			      target: '[\{"a":0\}]',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store title\` command', () => \{
			    const command = \{
			      command: 'storeTitle',
			      target: 'blah',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store value\` command', () => \{
			    const command = \{
			      command: 'storeValue',
			      target: 'id=someElement',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store window handle\` command', () => \{
			    const command = \{
			      command: 'storeWindowHandle',
			      target: 'windowName',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`store xpath count\` command', () => \{
			    const command = \{
			      command: 'storeXpathCount',
			      target: 'xpath=button',
			      value: 'myVar',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`submit\` command', () => \{
			    const command = \{
			      command: 'submit',
			      target: 'id=form',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`times\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.times,
			      target: '5',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`type\` command', () => \{
			    const command = \{
			      command: 'type',
			      target: 'id=input',
			      value: 'example input',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`uncheck\` command', () => \{
			    const command = \{
			      command: 'uncheck',
			      target: 'id=f',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify\` command', () => \{
			    const command = \{
			      command: 'verify',
			      target: 'varrrName',
			      value: 'blah',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify checked\` command', () => \{
			    const command = \{
			      command: 'verifyChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify editable\` command', () => \{
			    const command = \{
			      command: 'verifyEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element present\` command', () => \{
			    const command = \{
			      command: 'verifyElementPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify element not present\` command', () => \{
			    const command = \{
			      command: 'verifyElementNotPresent',
			      target: 'id=element',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not checked\` command', () => \{
			    const command = \{
			      command: 'verifyNotChecked',
			      target: 'id=check',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not editable\` command', () => \{
			    const command = \{
			      command: 'verifyNotEditable',
			      target: 'id=text',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not selected value\` command', () => \{
			    const command = \{
			      command: 'verifyNotSelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify not text\` command', () => \{
			    const command = \{
			      command: 'verifyNotText',
			      target: 'id=test',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it("should emit 'verify selected label' command", () => \{
			    const command = \{
			      command: 'verifySelectedLabel',
			      target: 'id=test',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify value\` command', () => \{
			    const command = \{
			      command: 'verifyValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify selected value\` command', () => \{
			    const command = \{
			      command: 'verifySelectedValue',
			      target: 'id=select',
			      value: 'test',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify text\` command', () => \{
			    const command = \{
			      command: 'verifyText',
			      target: 'id=test',
			      value: 'some text that should be here',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`verify title\` command', () => \{
			    const command = \{
			      command: 'verifyTitle',
			      target: 'example title',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotEditable\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotEditable',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotPresent\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotPresent',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForElementNotVisible\` command', () => \{
			    const command = \{
			      command: 'waitForElementNotVisible',
			      target: 'css=#blah',
			      value: '5000',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`waitForText\` command', () => \{
			    const command = \{
			      command: 'waitForText',
			      target: 'css=#blah',
			      value: 'text',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`answer on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverAnswerOnVisiblePrompt',
			      target: 'an answer',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose cancel on visible prompt\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseCancelOnVisiblePrompt',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`choose ok on visible confirmation\` command', () => \{
			    const command = \{
			      command: 'webdriverChooseOkOnVisibleConfirmation',
			      target: '',
			      value: '',
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			  it('should emit \`while\` command', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.while,
			      target: 'true',
			      value: '',
			    \}
			    return expect(
			      prettify(command, \{ fullPayload: true \})
			    ).resolves.toMatchSnapshot()
			  \})
			  it('should emit new window handling, if command opens a new window', () => \{
			    const command = \{
			      command: 'click',
			      target: 'css=button',
			      value: '',
			      opensWindow: true,
			      windowHandleName: 'newWin',
			      windowTimeout: 2000,
			    \}
			    return expect(prettify(command)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-ruby-rspec\\__test__\\src\\command.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(102)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-ruby-rspec\\__test__\\src\\index.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import fs from 'fs'
			import path from 'path'
			import codeExport, \{
			  emitTest,
			  emitSuite,
			  _emitMethod,
			  _findTestByName,
			\} from '../../src'
			import Command from '../../src/command'
			import \{ project as projectProcessor \} from '@seleniumhq/side-code-export'
			
			function readFile(filename) \{
			  return JSON.parse(
			    fs.readFileSync(
			      path.join(
			        __dirname,
			        '..',
			        '..',
			        '..',
			        'side-code-export',
			        '__test__',
			        'test-files',
			        filename
			      )
			    )
			  )
			\}
			
			describe('Code Export Ruby RSpec', () => \{
			  it('should export a test', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with a grid configuration', async () => \{
			    const project = readFile('single-test.side')
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			      beforeEachOptions: \{
			        browserName: 'Firefox',
			        gridUrl: 'http://localhost:4444/wd/hub',
			      \},
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite', async () => \{
			    const project = normalizeProject(readFile('single-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[1],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with a reused test method', async () => \{
			    const project = normalizeProject(readFile('test-case-reuse.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite that uses control flow commands', async () => \{
			    const project = normalizeProject(readFile('control-flow-suite.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a test with commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('select-window.side'))
			    const results = await emitTest(\{
			      baseUrl: project.url,
			      test: project.tests[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with commands that open a new window inside of a reused test method', async () => \{
			    const project = normalizeProject(readFile('nested-select-window.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export a suite with just one new window util method when there are multiple commands that open a new window', async () => \{
			    const project = normalizeProject(readFile('nested-select-window-v2.side'))
			    const results = await emitSuite(\{
			      baseUrl: project.url,
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    expect(results.body).toBeDefined()
			    expect(results.body).toMatchSnapshot()
			  \})
			  it('should export the command emitter', () => \{
			    expect(Command.emit).toStrictEqual(codeExport.emit.command)
			  \})
			\})
			
			function normalizeProject(project) \{
			  let _project = \{ ...project \}
			  _project.suites.forEach(suite => \{
			    projectProcessor.normalizeTestsInSuite(\{ suite, tests: _project.tests \})
			  \})
			  return _project
			\}
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-ruby-rspec\\__test__\\src\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-ruby-rspec\\__test__\\src\\location.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/location'
			
			describe('location code emitter', () => \{
			  it('should fail to emit empty string', () => \{
			    return expect(() => \{
			      emit('')
			    \}).toThrow("Locator can't be empty")
			  \})
			  it('should fail to emit unknown locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown locator notExists')
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit link locator', () => \{
			    const type = 'link'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit linkText locator', () => \{
			    const type = 'linkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit partialLinkText locator', () => \{
			    const type = 'partialLinkText'
			    const selector = 'someLink'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit css locator', () => \{
			    const type = 'css'
			    const selector = 'someCss'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit css locator with \`=\` sign', () => \{
			    const type = 'css'
			    const selector = 'a[title=JScript]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should escape quotes in locator strings', () => \{
			    const type = 'css'
			    const selector = 'a[title="escaped"]'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit xpath locator', () => \{
			    const type = 'xpath'
			    const selector = 'someXpath'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit implicit xpath locator', () => \{
			    const selector = '//test=xpath'
			    return expect(emit(selector)).resolves.toMatchSnapshot()
			  \})
			  it('should emit name locator', () => \{
			    const type = 'name'
			    const selector = 'someName'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-ruby-rspec\\__test__\\src\\location.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('seleniumhq_selenium-ide\\packages\\code-export-ruby-rspec\\__test__\\src\\selection.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ emit \} from '../../src/selection'
			
			describe('selection location code emitter', () => \{
			  it('should fail to emit unknown selection locator', () => \{
			    return expect(() => \{
			      emit('notExists=element')
			    \}).toThrow('Unknown selection locator notExists')
			  \})
			  it('should assume when no selector is given that it is the label locator', () => \{
			    return expect(emit('label')).resolves.toEqual(
			      \`:xpath, "//option[. = 'label']"\`
			    )
			  \})
			  it('should emit label locator', () => \{
			    const type = 'label'
			    const selector = 'a label'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit id locator', () => \{
			    const type = 'id'
			    const selector = 'someId'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit value locator', () => \{
			    const type = 'value'
			    const selector = 'someValue'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			  it('should emit index locator', () => \{
			    const type = 'index'
			    const selector = '2'
			    return expect(emit(\`\$\{type\}=\$\{selector\}\`)).resolves.toMatchSnapshot()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\code-export-ruby-rspec\\__test__\\src\\selection.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('seleniumhq_selenium-ide\\packages\\get-driver\\__tests__\\download-driver.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import * as fs from 'fs-extra'
			import * as os from 'os'
			import * as path from 'path'
			import \{ spawn \} from 'child_process'
			import downloadDriver from '../src/download-driver'
			
			jest.setTimeout(60_000)
			describe('download-driver', () => \{
			  let tempDir: string
			  beforeEach(async () => \{
			    tempDir = await createRandomDirectory()
			  \})
			  afterEach(async () => \{
			    await fs.remove(tempDir)
			  \})
			  it('should download the driver for the current platform', async () => \{
			    expect.assertions(2)
			    const chromedriver = await downloadDriver(\{
			      downloadDirectory: tempDir,
			      browser: 'electron',
			      platform: os.platform(),
			      arch: os.arch(),
			      version: '6.0.9',
			    \})
			    const cp = spawn(chromedriver, ['--version'])
			    let stdout = ''
			    let processExit: () => \{\}
			    const p = new Promise((res) => \{
			      processExit = res as () => \{\}
			    \})
			    cp.stdout.on('data', (data) => \{
			      stdout += data
			    \})
			    cp.on('close', (code) => \{
			      expect(code).toBe(0)
			      processExit()
			    \})
			    await p
			    expect(stdout).toEqual(expect.stringMatching(/chromedriver/i))
			  \})
			
			  it('should download chromedriver for the current platform', async () => \{
			    expect.assertions(2)
			    const chromedriver = await downloadDriver(\{
			      downloadDirectory: tempDir,
			      browser: 'chrome',
			      platform: os.platform(),
			      arch: os.arch(),
			      version: '78.0.3904.11',
			    \})
			    const cp = spawn(chromedriver, ['--version'])
			    let stdout = ''
			    let processExit: () => \{\}
			    const p = new Promise((res) => \{
			      processExit = res as () => \{\}
			    \})
			    cp.stdout.on('data', (data) => \{
			      stdout += data
			    \})
			    cp.on('close', (code) => \{
			      expect(code).toBe(0)
			      processExit()
			    \})
			    await p
			    expect(stdout).toEqual(expect.stringMatching(/chromedriver/i))
			  \})
			
			  it('should download geckodriver for the current platform', async () => \{
			    expect.assertions(2)
			    const geckodriver = await downloadDriver(\{
			      downloadDirectory: tempDir,
			      browser: 'firefox',
			      platform: os.platform(),
			      arch: os.arch(),
			      version: '69.0.1',
			    \})
			    const cp = spawn(geckodriver, ['--version'])
			    let stdout = ''
			    let processExit: () => \{\}
			    const p = new Promise((res) => \{
			      processExit = res as () => \{\}
			    \})
			    cp.stdout.on('data', (data) => \{
			      stdout += data
			    \})
			    cp.on('close', (code) => \{
			      expect(code).toBe(0)
			      processExit()
			    \})
			    await p
			    expect(stdout).toEqual(expect.stringMatching(/geckodriver/i))
			  \})
			
			  it('should fail to download a non-existent driver', async () => \{
			    expect.assertions(1)
			    try \{
			      await downloadDriver(\{
			        downloadDirectory: tempDir,
			        browser: 'electron',
			        platform: 'darwin',
			        arch: 'ia32',
			        version: '6.0.9',
			      \})
			    \} catch (err) \{
			      // @ts-expect-error
			      expect(err.message).toBe('Failed to download driver')
			    \}
			  \})
			\})
			
			async function createRandomDirectory() \{
			  const randomName = \`__side__test__\$\{Math.floor(Math.random() * 100000)\}\`
			  const res = path.join(os.tmpdir(), randomName)
			  await fs.mkdir(res)
			  return res
			\}
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\get-driver\\__tests__\\download-driver.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('seleniumhq_selenium-ide\\packages\\get-driver\\__tests__\\index.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import * as index from '../src'
			
			describe('get-driver', () => \{
			  it('should export all the required things', () => \{
			    expect(index.downloadDriver).toBeDefined()
			    expect(index.resolveDriverUrl).toBeDefined()
			    expect(index.resolveDriverName).toBeDefined()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\get-driver\\__tests__\\index.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('seleniumhq_selenium-ide\\packages\\get-driver\\__tests__\\resolve-driver.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import * as os from 'os'
			import nock from 'nock'
			import \{ resolveDriverUrl, resolveDriverName \} from '../src/resolve-driver'
			
			describe('resolve-driver', () => \{
			  describe('resolveDriverUrl', () => \{
			    it('should resolve a download link of an electron driver', async () => \{
			      expect(
			        await resolveDriverUrl(\{
			          browser: 'electron',
			          platform: os.platform(),
			          arch: os.arch(),
			          version: '6.0.9',
			        \})
			      ).toBe(
			        \`https://github.com/electron/electron/releases/download/v6.0.9/chromedriver-v6.0.9-\$\{
			          os.platform
			        \}-\$\{os.arch()\}.zip\`
			      )
			    \})
			    it('should resolve a download link of a chrome driver', async () => \{
			      const scope = nock('https://chromedriver.storage.googleapis.com')
			        .get('/LATEST_RELEASE_78')
			        .reply(200, '78.0.3904.11')
			      expect(
			        await resolveDriverUrl(\{
			          browser: 'chrome',
			          platform: 'darwin',
			          arch: os.arch(),
			          version: '78.0.3904.11',
			        \})
			      ).toBe(
			        'https://chromedriver.storage.googleapis.com/78.0.3904.11/chromedriver_mac64.zip'
			      )
			      scope.done()
			    \})
			    it('should resolve a download link of a firefox driver', async () => \{
			      expect(
			        await resolveDriverUrl(\{
			          browser: 'firefox',
			          platform: 'darwin',
			          arch: os.arch(),
			          version: '59.0',
			        \})
			      ).toBe(
			        'https://github.com/mozilla/geckodriver/releases/download/v0.25.0/geckodriver-v0.25.0-macos.tar.gz'
			      )
			      expect(
			        await resolveDriverUrl(\{
			          browser: 'firefox',
			          platform: 'darwin',
			          arch: os.arch(),
			          version: '70.0',
			        \})
			      ).toBe(
			        'https://github.com/mozilla/geckodriver/releases/download/v0.26.0/geckodriver-v0.26.0-macos.tar.gz'
			      )
			    \})
			  \})
			  describe('resolveDriverName', () => \{
			    it('should resolve a driver name for mac (POSIX based)', () => \{
			      expect(
			        resolveDriverName(\{
			          browser: 'electron',
			          platform: 'darwin',
			          version: '6.0.9',
			        \})
			      ).toBe('chromedriver-v6.0.9')
			    \})
			    it('should resolve a driver name for Windows', () => \{
			      expect(
			        resolveDriverName(\{
			          browser: 'electron',
			          platform: 'win32',
			          version: '6.0.9',
			        \})
			      ).toBe('chromedriver-v6.0.9.exe')
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\get-driver\\__tests__\\resolve-driver.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\emit.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{
			  emitCommand,
			  emitLocation,
			  emitSelection,
			  emitOriginTracing,
			\} from '../../../src/code-export/emit'
			import TestCase from '../../../../selenium-ide/src/neo/models/TestCase'
			import Command from '../../../../selenium-ide/src/neo/models/Command'
			
			describe('Command emitter', () => \{
			  describe('validation', () => \{
			    it('invalid command', () => \{
			      let command = new Command(undefined, 'chec')
			      return expect(() => \{
			        emitCommand(command)
			      \}).toThrow("Invalid command 'chec'")
			    \})
			    it('missing target param', () => \{
			      let command = new Command(undefined, 'check')
			      return expect(() => \{
			        emitCommand(command)
			      \}).toThrow("Incomplete command 'check'. Missing expected target argument")
			    \})
			    it('missing value param', () => \{
			      let command = new Command(undefined, 'assertNotSelectedValue', 'blah')
			      return expect(() => \{
			        emitCommand(command)
			      \}).toThrow(
			        "Incomplete command 'assertNotSelectedValue'. Missing expected value argument"
			      )
			    \})
			    it('optional param not provided', async () => \{
			      let command = new Command(undefined, 'times', 10)
			      await expect(emitCommand(command)).resolves
			      command = new Command(undefined, 'while', true)
			      await expect(emitCommand(command)).resolves
			      command = new Command(undefined, 'executeScript', 'return "blah"')
			      return expect(emitCommand(command)).resolves
			    \})
			    it("single param commands don't trigger validation", () => \{
			      let command = new Command(undefined, 'assertAlert', 'asdf')
			      return expect(() => \{
			        emitCommand(command)
			      \}).not.toThrow()
			    \})
			    it('ignores disabled commands', async () => \{
			      let command = new Command(undefined, '//assertAlert', 'asdf')
			      await expect(() => \{
			        emitCommand(command)
			      \}).not.toThrow()
			      command = new Command(undefined, '//blah')
			      await expect(() => \{
			        emitCommand(command)
			      \}).not.toThrow()
			    \})
			  \})
			\})
			
			describe('Location emitter', () => \{
			  it('emits by sync emitter', () => \{
			    const emitters = \{
			      id: selector => \{
			        return \`By.id("\$\{selector\}")\`
			      \},
			    \}
			    expect(emitLocation('id=blah', emitters)).toEqual(\`By.id("blah")\`)
			  \})
			  it('emits by async emitter', () => \{
			    const emitters = \{
			      id: selector => \{
			        return Promise.resolve(\`By.id("\$\{selector\}")\`)
			      \},
			    \}
			    expect(emitLocation('id=blah', emitters)).resolves.toBe(\`By.id("blah")\`)
			  \})
			  it('should fail to emit empty string', () => \{
			    return expect(() => emitLocation('', \{\})).toThrow("Locator can't be empty")
			  \})
			  it('should fail to emit unknown locator', () => \{
			    return expect(() => emitLocation('notExists=element', \{\})).toThrow(
			      'Unknown locator notExists'
			    )
			  \})
			\})
			
			describe('Selection emitter', () => \{
			  it('emits by sync emitter', () => \{
			    const emitters = \{
			      id: id => \{
			        return \`By.css(\\\`*[id="\$\{id\}"]\\\`)\`
			      \},
			    \}
			    expect(emitSelection('id=blah', emitters)).toEqual(
			      \`By.css(\\\`*[id="blah"]\\\`)\`
			    )
			  \})
			  it('emits by async emitter', () => \{
			    const emitters = \{
			      id: id => \{
			        return Promise.resolve(\`By.css(\\\`*[id="\$\{id\}"]\\\`)\`)
			      \},
			    \}
			    expect(emitSelection('id=blah', emitters)).resolves.toBe(
			      \`By.css(\\\`*[id="blah"]\\\`)\`
			    )
			  \})
			  it('should fail to emit empty string', () => \{
			    return expect(() => emitSelection('', \{\})).toThrow(
			      "Location can't be empty"
			    )
			  \})
			  it('should fail to emit unknown locator', () => \{
			    return expect(() => emitSelection('notExists=element', \{\})).toThrow(
			      'Unknown selection locator notExists'
			    )
			  \})
			\})
			
			describe('Trace emitter', () => \{
			  it('should emit original test step number and details', () => \{
			    const test = new TestCase()
			    test.createCommand(undefined, 'a', 'foo', 'bar')
			    test.createCommand(undefined, 'b', 'baz', 'qux', 'a comment')
			    expect(emitOriginTracing(test, \{ commentPrefix: '//' \}, true, false)).toEqual([
			      '// Test name: Untitled Test',
			      '// Step # | name | target | value | comment',
			      '// 1 | a | foo | bar | ',
			      '// 2 | b | baz | qux | a comment',
			    ])
			    expect(emitOriginTracing(test, \{ commentPrefix: '//' \}, true, true)).toEqual([
			      '// Test name: Untitled Test',
			      '// Step # | name | target | value',
			      '// 1 | a | foo | bar',
			      '// 2 | b | baz | qux\\n// a comment',
			    ])
			    expect(emitOriginTracing(test, \{ commentPrefix: '//' \}, false, true)).toEqual([
			      '',
			      '// a comment',
			    ])
			    expect(emitOriginTracing(test, \{ commentPrefix: '//' \}, false, false)).toEqual([
			      '',
			      '',
			    ])
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\emit.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(15)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\find.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{
			  findReusedTestMethods,
			  findCommandThatOpensWindow,
			\} from '../../../src/code-export/find'
			import TestCase from '../../../../selenium-ide/src/neo/models/TestCase'
			import Command from '../../../../selenium-ide/src/neo/models/Command'
			
			describe('find', () => \{
			  describe('findCommandThatOpensWindow', () => \{
			    it('should find a command that opens a window if present in a test', () => \{
			      const test = new TestCase(undefined, 'blah')
			      test.createCommand(undefined, 'open', '/')
			      const command = new Command(undefined, 'click', 'id=blah')
			      command.opensWindow = true
			      test.addCommand(command)
			      const result = findCommandThatOpensWindow(test)
			      expect(result.command).toEqual('click')
			    \})
			    it('should not find a command that opens a window if one is not present in a test', () => \{
			      const test = new TestCase(undefined, 'blah')
			      test.createCommand(undefined, 'open', '/')
			      const command = new Command(undefined, 'click', 'id=blah')
			      test.addCommand(command)
			      const result = findCommandThatOpensWindow(test)
			      expect(result).toBeUndefined()
			    \})
			    it('should find a command within a reused test method', () => \{
			      const test = new TestCase()
			      test.createCommand(undefined, 'run', 'blah')
			      const anotherTest = new TestCase(undefined, 'blah')
			      const command = new Command(undefined, 'click', 'id=blah')
			      command.opensWindow = true
			      anotherTest.addCommand(command)
			      const tests = [test, anotherTest]
			      const result = findCommandThatOpensWindow(test, tests)
			      expect(result).toBeTruthy()
			    \})
			  \})
			  describe('findReusedTestMethods', () => \{
			    it('should find a reused test method', () => \{
			      const test = new TestCase()
			      test.createCommand(undefined, 'run', 'blah')
			      const anotherTest = new TestCase(undefined, 'blah')
			      anotherTest.createCommand(undefined, 'open', '/')
			      const tests = [anotherTest]
			      const result = findReusedTestMethods(test, tests)
			      expect(result.length).toEqual(1)
			      expect(result[0].name).toEqual('blah')
			      expect(result[0].commands[0].command).toEqual('open')
			      expect(result[0].commands[0].target).toEqual('/')
			    \})
			    it('should find reused test methods recursively', () => \{
			      const test = new TestCase()
			      test.createCommand(undefined, 'run', 'blah')
			      const anotherTest = new TestCase(undefined, 'blah')
			      anotherTest.createCommand(undefined, 'run', 'blahblah')
			      const yetAnotherTest = new TestCase(undefined, 'blahblah')
			      const tests = [anotherTest, yetAnotherTest]
			      const result = findReusedTestMethods(test, tests)
			      expect(result.length).toEqual(2)
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\find.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\hook.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Hook from '../../../src/code-export/hook'
			
			describe('Hooks', () => \{
			  it('should clear registered commands', () => \{
			    const hook = new Hook()
			    hook.register(() => \{
			      return 'blah'
			    \})
			    hook.clearRegister()
			    expect(hook.emitters).toEqual([])
			  \})
			  it('should not error when no emitters registered', async () => \{
			    const hook = new Hook()
			    const result = await hook.emit()
			    expect(result.commands).toEqual([])
			  \})
			  it('should emit command object', () => \{
			    const hook = new Hook(\{
			      startingSyntax: 'blah1',
			      endingSyntax: 'blah99',
			      registrationLevel: 1,
			    \})
			    hook.register(() => \{
			      return Promise.resolve('blah2')
			    \})
			    hook.register(() => \{
			      return 'blah3'
			    \})
			    expect(hook.emit()).resolves.toEqual(\{
			      commands: [
			        \{ level: 0, statement: 'blah1' \},
			        \{ level: 1, statement: 'blah2' \},
			        \{ level: 1, statement: 'blah3' \},
			        \{ level: 0, statement: 'blah99' \},
			      ],
			    \})
			  \})
			  it('should optionally emit commands', () => \{
			    const hook = new Hook(\{ startingSyntax: 'blah1', endingSyntax: 'blah99' \})
			    expect(hook.emit(\{ isOptional: true \})).resolves.toBeUndefined()
			    expect(hook.emit(\{ isOptional: false \})).resolves.toEqual(\{
			      commands: [
			        \{ level: 0, statement: 'blah1' \},
			        \{ level: 0, statement: 'blah99' \},
			      ],
			    \})
			  \})
			  it('should emit a command with empty string', () => \{
			    const hook = new Hook(\{ startingSyntax: 'a', endingSyntax: 'b' \})
			    hook.register(() => \{
			      return Promise.resolve('')
			    \})
			    expect(hook.emit(\{ isOptional: false \})).resolves.toEqual(\{
			      commands: [
			        \{ level: 0, statement: 'a' \},
			        \{ level: 0, statement: '' \},
			        \{ level: 0, statement: 'b' \},
			      ],
			    \})
			  \})
			  it('should check if a command is already registered', () => \{
			    const hook = new Hook()
			    hook.register(() => \{
			      return 'blah'
			    \})
			    hook.register(() => \{
			      return 1234
			    \})
			    expect(hook.isRegistered('blah')).resolves.toBeTruthy()
			    expect(hook.isRegistered(1234)).resolves.toBeTruthy()
			    expect(hook.isRegistered('halb')).resolves.toBeFalsy()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\hook.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\parsers.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ sanitizeName, capitalize \} from '../../../src/code-export/parsers'
			
			describe('parsers', () => \{
			  it('should sanitize the name', () => \{
			    expect(sanitizeName('blah blah')).toEqual('blahblah')
			  \})
			  it('should trim whitespace from the name', () => \{
			    expect(sanitizeName(' blah blah ')).toEqual('blahblah')
			  \})
			  it('should capitalize the name', () => \{
			    expect(capitalize('blahblah')).toEqual('Blahblah')
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\parsers.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\preprocessor.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{
			  defaultPreprocessor,
			  scriptPreprocessor,
			  keysPreprocessor,
			\} from '../../../src/code-export/preprocessor'
			
			describe('preprocessors', () => \{
			  const variableLookup = varName => \{
			    return \`vars.get("\$\{varName\}").toString()\`
			  \}
			
			  describe('default', () => \{
			    it('should interpolate stored variables', () => \{
			      const command = \{
			        command: 'echo',
			        target: '\$\{var\}',
			      \}
			      return expect(
			        defaultPreprocessor(command.target, variableLookup)
			      ).toMatch('vars.get("var").toString()')
			    \})
			  \})
			  describe('script', () => \{
			    it('should not affect hardcoded strings', async () => \{
			      const command = \{
			        command: 'executeScript',
			        target: 'return \{\}',
			        value: '',
			      \}
			      return expect(await scriptPreprocessor(command.target).script).toMatch(
			        \`return \{\}\`
			      )
			    \})
			    it('should pass a single argument', async () => \{
			      const command = \{
			        command: 'executeScript',
			        target: 'return \$\{x\}',
			        value: '',
			      \}
			      return expect(await scriptPreprocessor(command.target).script).toMatch(
			        \`return arguments[0]\`
			      )
			    \})
			    it('should pass multiple arguments', async () => \{
			      const command = \{
			        command: 'executeScript',
			        target: 'return \$\{x\} + \$\{y\} + \$\{x\}',
			        value: '',
			      \}
			      return expect(await scriptPreprocessor(command.target).script).toMatch(
			        \`return arguments[0] + arguments[1] + arguments[0]\`
			      )
			    \})
			  \})
			  describe('keys', () => \{
			    it('should not affect hardcoded strings', async () => \{
			      const command = \{
			        command: 'sendKeys',
			        target: 'id=t',
			        value: 'test',
			      \}
			      return expect(await keysPreprocessor(command.value)[0]).toMatch(\`test\`)
			    \})
			    it('should convert a single key', async () => \{
			      const command = \{
			        command: 'sendKeys',
			        target: 'id=t',
			        value: '\$\{KEY_ENTER\}',
			      \}
			      return expect(await keysPreprocessor(command.value)[0]).toMatch(
			        \`Key['ENTER']\`
			      )
			    \})
			    it('should convert a string and a key', async () => \{
			      const command = \{
			        command: 'sendKeys',
			        target: 'id=t',
			        value: 'test\$\{KEY_ENTER\}',
			      \}
			      return expect(await keysPreprocessor(command.value)).toEqual([
			        'test',
			        \`Key['ENTER']\`,
			      ])
			    \})
			    it('should convert multiple strings and keys', async () => \{
			      const command = \{
			        command: 'sendKeys',
			        target: 'id=t',
			        value: 'test\$\{KEY_ENTER\}foo\$\{KEY_DOWN\}bar',
			      \}
			      return expect(await keysPreprocessor(command.value)).toEqual([
			        'test',
			        \`Key['ENTER']\`,
			        'foo',
			        \`Key['DOWN']\`,
			        'bar',
			      ])
			    \})
			    it('should convert keys and interpolate vars', async () => \{
			      const command = \{
			        command: 'sendKeys',
			        target: 'id=t',
			        value: 'test\$\{var\}foo\$\{KEY_ENTER\}',
			      \}
			      return expect(
			        await keysPreprocessor(command.value, variableLookup)
			      ).toEqual(['test', 'vars.get("var").toString()', 'foo', \`Key['ENTER']\`])
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\preprocessor.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\prettify.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import prettify from '../../../src/code-export/prettify'
			
			describe('Prettify', () => \{
			  const commandPrefixPadding = '  '
			  it('should render from a command array', () => \{
			    const commandBlock = \{
			      commands: [
			        \{ level: 0, statement: 'blah' \},
			        \{ level: 1, statement: 'blah' \},
			      ],
			    \}
			    expect(prettify(commandBlock, \{ commandPrefixPadding \}).body).toBe(
			      \`blah\\n  blah\`
			    )
			  \})
			  it('should render from a command string', () => \{
			    const commandString = 'blah\\nblah'
			    expect(prettify(commandString, \{ commandPrefixPadding \}).body).toBe(
			      \`blah\\nblah\`
			    )
			  \})
			  it('command string can render from a starting level', () => \{
			    const commandString = 'blah\\nblah'
			    expect(
			      prettify(commandString, \{
			        commandPrefixPadding,
			        startingLevel: 1,
			      \}).body
			    ).toBe(\`\$\{commandPrefixPadding\}blah\\n\$\{commandPrefixPadding\}blah\`)
			  \})
			  it('command array can render from a starting level', () => \{
			    const commandBlock = \{
			      commands: [
			        \{ level: 0, statement: 'blah' \},
			        \{ level: 0, statement: 'blah' \},
			      ],
			    \}
			    const startingLevel = 1
			    expect(
			      prettify(commandBlock, \{ commandPrefixPadding, startingLevel \}).body
			    ).toBe(\`\$\{commandPrefixPadding\}blah\\n\$\{commandPrefixPadding\}blah\`)
			  \})
			  it('command array can render nested commands from a non-zero starting level', () => \{
			    const commandBlock = \{
			      commands: [
			        \{ level: 0, statement: 'if \{' \},
			        \{ level: 1, statement: 'blah' \},
			        \{ level: 0, statement: '\}' \},
			      ],
			    \}
			    const startingLevel = 1
			    expect(
			      prettify(commandBlock, \{ commandPrefixPadding, startingLevel \}).body
			    ).toBe(
			      \`\$\{commandPrefixPadding\}if \{\\n\$\{commandPrefixPadding\}\$\{commandPrefixPadding\}blah\\n\$\{commandPrefixPadding\}\}\`
			    )
			  \})
			  it('command string returns an ending level', () => \{
			    const commandString = 'blah\\nblah'
			    const result = prettify(commandString, \{ commandPrefixPadding \})
			    expect(result.endingLevel).toBe(0)
			  \})
			  it('command array returns an absolute ending level', () => \{
			    const commandBlock = \{
			      commands: [
			        \{ level: 0, statement: 'blah' \},
			        \{ level: 1, statement: 'blah' \},
			      ],
			    \}
			    const startingLevel = 4
			    const result = prettify(commandBlock, \{
			      commandPrefixPadding,
			      startingLevel,
			    \})
			    expect(result.endingLevel).toBe(5)
			  \})
			  it('command array can specify an adjustment to the ending level', () => \{
			    const commandBlock = \{
			      commands: [
			        \{ level: 0, statement: 'blah' \},
			        \{ level: 1, statement: 'blah' \},
			      ],
			      endingLevelAdjustment: +1,
			    \}
			    const result = prettify(commandBlock, \{ commandPrefixPadding \})
			    expect(result.endingLevel).toBe(2)
			  \})
			  it('command array can specify an adjustment to the starting level', () => \{
			    const commandBlock = \{
			      commands: [
			        \{ level: 0, statement: 'blah' \},
			        \{ level: 1, statement: 'blah' \},
			      ],
			      startingLevelAdjustment: -1,
			    \}
			    const startingLevel = 1
			    const result = prettify(commandBlock, \{
			      commandPrefixPadding,
			      startingLevel,
			    \})
			    expect(result.body).toBe(\`blah\\n\$\{commandPrefixPadding\}blah\`)
			    expect(result.endingLevel).toBe(1)
			  \})
			  it('individual command emitting can be skipped', () => \{
			    const commandBlock = \{
			      commands: [\{ level: 0, statement: '' \}],
			      skipEmitting: true,
			      endingLevelAdjustment: -1,
			    \}
			    const result = prettify(commandBlock, \{
			      commandPrefixPadding,
			      startingLevel: 1,
			    \})
			    expect(result.body).toBeFalsy()
			    expect(result.endingLevel).toBe(0)
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\prettify.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\register.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ registerCommandEmitter \} from '../../../src/code-export/register'
			
			describe('Register', () => \{
			  describe('Command Emitters', () => \{
			    it('should register a new command emitter', () => \{
			      const emitters = \{
			        blah: 'blah',
			      \}
			      const command = 'foo'
			      const emitter = 'bar'
			      registerCommandEmitter(\{ command, emitter, emitters \})
			      expect(emitters).toEqual(\{ blah: 'blah', foo: 'bar' \})
			    \})
			    it('should throw when trying to overwrite an existing command emitter', () => \{
			      const emitters = \{
			        blah: 'blah',
			      \}
			      const command = 'blah'
			      const emitter = 'blah'
			      expect(() => \{
			        registerCommandEmitter(\{ command, emitter, emitters \})
			      \}).toThrow()
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\register.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\render.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import render from '../../../src/code-export/render'
			import \{ renderCommands \} from '../../../src/code-export/render'
			import \{ emitOriginTracing \} from '../../../src/code-export/emit'
			import TestCase from '../../../../selenium-ide/src/neo/models/TestCase'
			
			describe('Render', () => \{
			  const commandPrefixPadding = '  '
			  const commentPrefix = '//'
			
			  it('should render with command tracing', () => \{
			    const test = new TestCase()
			    test.createCommand(undefined, 'a')
			    test.createCommand(undefined, 'b', undefined, undefined, 'comment')
			    const commandStatements = ['blah', 'andblah']
			    let originTracing = emitOriginTracing(test, \{ commentPrefix \}, true, false)
			    let result = renderCommands(commandStatements, \{
			      startingLevel: 1,
			      commandPrefixPadding,
			      originTracing,
			      enableOriginTracing: true,
			    \})
			    expect(result).toMatch(
			      \`\$\{commandPrefixPadding\}\$\{commentPrefix\} Test name: Untitled Test\\n\$\{commandPrefixPadding\}\$\{commentPrefix\} Step # | name | target | value | comment\\n\$\{commandPrefixPadding\}\$\{commentPrefix\} 1 | a |  |  | \\n\$\{commandPrefixPadding\}blah\\n\$\{commandPrefixPadding\}\$\{commentPrefix\} 2 | b |  |  | comment\\n\$\{commandPrefixPadding\}andblah\`
			    )
			    originTracing = emitOriginTracing(test, \{ commentPrefix \}, true, true)
			    result = renderCommands(commandStatements, \{
			      startingLevel: 1,
			      commandPrefixPadding,
			      originTracing,
			      enableOriginTracing: true,
			    \})
			    expect(result).toMatch(
			      \`\$\{commandPrefixPadding\}\$\{commentPrefix\} Test name: Untitled Test\\n\$\{commandPrefixPadding\}\$\{commentPrefix\} Step # | name | target | value\\n\$\{commandPrefixPadding\}\$\{commentPrefix\} 1 | a |  | \\n\$\{commandPrefixPadding\}blah\\n\$\{commandPrefixPadding\}\$\{commentPrefix\} 2 | b |  | \\n\$\{commandPrefixPadding\}\$\{commentPrefix\} comment\\n\$\{commandPrefixPadding\}andblah\`
			    )
			    originTracing = emitOriginTracing(test, \{ commentPrefix \}, false, true)
			    result = renderCommands(commandStatements, \{
			      startingLevel: 1,
			      commandPrefixPadding,
			      originTracing,
			      enableOriginTracing: false,
			    \})
			    expect(result).toMatch(
			      \`\$\{commandPrefixPadding\}blah\\n\$\{commandPrefixPadding\}\$\{commentPrefix\} comment\\n\$\{commandPrefixPadding\}andblah\`
			    )
			    originTracing = emitOriginTracing(test, \{ commentPrefix \}, false, false)
			    result = renderCommands(commandStatements, \{
			      startingLevel: 1,
			      commandPrefixPadding,
			      originTracing,
			      enableOriginTracing: false,
			    \})
			    expect(result).toMatch(
			      \`\$\{commandPrefixPadding\}blah\\n\$\{commandPrefixPadding\}andblah\`
			    )
			  \})
			  it('should render without command tracing', () => \{
			    const commandStatements = ['blah', 'andblah']
			    const result = renderCommands(commandStatements, \{
			      startingLevel: 0,
			      commandPrefixPadding,
			    \})
			    expect(result).toMatch(\`blah\\nandblah\`)
			  \})
			  it('should render with empty string', () => \{
			    const commandPrefixPadding = '  '
			    const input = ''
			    const result = render(commandPrefixPadding, input, \{ startingLevel: 1 \})
			    expect(result).toMatch(commandPrefixPadding)
			  \})
			  //it('should skip emitting', () => \{
			  //\})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\code-export\\render.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\project\\index.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import fs from 'fs'
			import path from 'path'
			import \{
			  normalizeTestsInSuite,
			  sanitizeProjectName,
			\} from '../../../src/project'
			
			describe('Normalize Project', () => \{
			  it('converts suite.tests guids to names', () => \{
			    const project = JSON.parse(
			      fs.readFileSync(
			        path.join(__dirname, '..', '..', 'test-files', 'single-suite.side')
			      )
			    )
			    const normalizedSuite = normalizeTestsInSuite(\{
			      suite: project.suites[0],
			      tests: project.tests,
			    \})
			    const testNames = project.tests.map(test => test.name)
			    expect(testNames).toEqual(normalizedSuite.tests)
			  \})
			  describe('save', () => \{
			    describe('filename', () => \{
			      it('allows alpha-numeric characters', () => \{
			        const input = 'asdf1234'
			        expect(sanitizeProjectName(input)).toEqual(input)
			      \})
			      it('allows limited special characters', () => \{
			        let input = 'asdf-1234'
			        expect(sanitizeProjectName(input)).toEqual(input)
			        input = 'asdf_1234'
			        expect(sanitizeProjectName(input)).toEqual(input)
			        input = 'asdf.1234'
			        expect(sanitizeProjectName(input)).toEqual(input)
			        input = 'asdf 1234'
			        expect(sanitizeProjectName(input)).toEqual(input)
			      \})
			      it('ignores illegal filesystem characters', () => \{
			        const input = 'blah:/blah'
			        expect(sanitizeProjectName(input)).toEqual('blahblah')
			      \})
			      it('with URI returns the root', () => \{
			        const input = 'http://a.b.com'
			        expect(sanitizeProjectName(input)).toEqual('a.b.com')
			      \})
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\project\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\string-escape\\index.spec.js', () => {
        const sourceCode = `
			const stringEscape = require('../../../src/string-escape')
			
			describe('String escape', () => \{
			  it('should return an empty string on undefined input', () => \{
			    expect(stringEscape()).toEqual('')
			  \})
			  it('should escape backticks', () => \{
			    expect(stringEscape('AAAAA\`BBBBB')).toEqual('AAAAA\\\\\`BBBBB')
			  \})
			  it('should escape backslashes', () => \{
			    expect(stringEscape('AAAAA\\\\\`BBBBB')).toEqual('AAAAA\\\\\\\\\\\\\`BBBBB') // eslint-disable-line
			  \})
			  it('should escape single-quotes', () => \{
			    expect(stringEscape("AAAAA'BBBBB")).toEqual("AAAAA\\\\'BBBBB")
			  \})
			  it('should escape double-quotes', () => \{
			    expect(stringEscape(\`AAAAA"BBBBB\`)).toEqual(\`AAAAA\\\\"BBBBB\`)
			  \})
			  it('should escape newline characters', () => \{
			    expect(stringEscape(\`AAAAA\\nBBBBB\`)).toEqual(\`AAAAA\\\\nBBBBB\`)
			    expect(stringEscape(\`AAAAA\\rBBBBB\`)).toEqual(\`AAAAA\\\\rBBBBB\`)
			  \})
			  it('should escape unicode line seperators', () => \{
			    expect(stringEscape(\`\\u2028\`)).toEqual(\`\\\\u2028\`)
			    expect(stringEscape(\`\\u2029\`)).toEqual(\`\\\\u2029\`)
			  \})
			  it('should escape for just the provided target character', () => \{
			    expect(stringEscape(\`AAAAA"BBBBB\`, '"')).toEqual(\`AAAAA\\\\"BBBBB\`)
			    expect(stringEscape(\`AAAAA'BBBBB\`, '"')).toEqual(\`AAAAA'BBBBB\`)
			    expect(stringEscape('AAAAA\`BBBBB', "'")).toEqual('AAAAA\`BBBBB')
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-code-export\\__test__\\src\\string-escape\\index.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\legacy\\migrate.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import fs from 'fs'
			import path from 'path'
			import \{
			  verifyFile,
			  FileTypes,
			  parseSuiteRequirements,
			  migrateTestCase,
			  migrateProject,
			  migrateUrls,
			\} from '../../src/legacy/migrate'
			
			describe('file classifier', () => \{
			  it('should recognize suite', () => \{
			    const suite = fs
			      .readFileSync(
			        path.join(__dirname, 'IDE_test_4/000_clear_mandant_Suite.html')
			      )
			      .toString()
			    expect(verifyFile(suite)).toBe(FileTypes.Suite)
			  \})
			  it('should recognize test case', () => \{
			    const test = fs
			      .readFileSync(path.join(__dirname, 'IDE_test.html'))
			      .toString()
			    expect(verifyFile(test)).toBe(FileTypes.TestCase)
			  \})
			  it('should throw when another file is given', () => \{
			    expect(() => \{
			      verifyFile('something is wrong here')
			    \}).toThrowError('Unknown file was received')
			  \})
			\})
			
			describe('selenium test case migration', () => \{
			  it('should migrate the set example', () => \{
			    const file = fs
			      .readFileSync(path.join(__dirname, 'IDE_test.html'))
			      .toString()
			    const \{ test \} = migrateTestCase(file)
			    expect(test.commands.length).toBe(4)
			    const command = test.commands[0]
			    expect(command.command).toBe('open')
			    expect(command.target).toBe(
			      '/?gfe_rd=cr&dcr=0&ei=9vz6Way_KdPPXqjmsbgI&gws_rd=ssl'
			    )
			    expect(command.value).toBe('')
			  \})
			  it('should migrate the second example', () => \{
			    const file = fs
			      .readFileSync(path.join(__dirname, 'IDE_test_2.html'))
			      .toString()
			    const \{ test \} = migrateTestCase(file)
			    expect(test.commands.length).toBe(26)
			  \})
			  it('should join line breaks to <br /> in the target field', () => \{
			    const file = fs
			      .readFileSync(path.join(__dirname, 'IDE_test_2.html'))
			      .toString()
			    const \{ test \} = migrateTestCase(file)
			    expect(test.commands[8].target).toBe(
			      "//a[contains(text(),'Most\\\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followers')]"
			    )
			  \})
			  it('should sanitize the input prior to converting', () => \{
			    const file = fs
			      .readFileSync(path.join(__dirname, 'IDE_test_3.html'))
			      .toString()
			    const \{ test \} = migrateTestCase(file)
			    expect(test.name).toBe('Show Details')
			    expect(test.commands[0].target).toBe(
			      'http://unknow.url/?func=ll&objid=2838227'
			    )
			  \})
			  it('should decode the input post conversion', () => \{
			    const file = fs
			      .readFileSync(path.join(__dirname, 'IDE_test_8.html'))
			      .toString()
			    const \{ test \} = migrateTestCase(file)
			    expect(test.commands[14].target).toBe(
			      '//a[@onclick=\\'return confirm("Wollen Sie den Datensatz wirklich löschen?")\\']'
			    )
			  \})
			  it('should import a test case with a comment in it', () => \{
			    const file = fs
			      .readFileSync(path.join(__dirname, 'IDE_test_9.html'))
			      .toString()
			    const \{ test \} = migrateTestCase(file)
			    expect(test.commands.length).toBe(2)
			  \})
			  it('should import a test case with a command in it', () => \{
			    const file = fs
			      .readFileSync(path.join(__dirname, 'IDE_test_10.html'))
			      .toString()
			    const \{ test \} = migrateTestCase(file)
			    expect(test.commands.length).toBe(1)
			  \})
			  it('should remove unimplemented wait commands from the test case', () => \{
			    const file = fs
			      .readFileSync(path.join(__dirname, 'IDE_test_wait.html'))
			      .toString()
			    const \{ test \} = migrateTestCase(file)
			    expect(test.commands.length).toBe(1)
			    expect(test.commands[0].command).toBe('waitForElementPresent')
			  \})
			\})
			
			describe('selenium suite migration', () => \{
			  it('should give a list of required test cases', () => \{
			    const suite = fs
			      .readFileSync(
			        path.join(__dirname, 'IDE_test_4/000_clear_mandant_Suite.html')
			      )
			      .toString()
			    const required = parseSuiteRequirements(suite)
			    expect(required.length).toBe(3)
			    expect(required).toEqual([
			      'einzeltests/MH_delete.html',
			      'einzeltests/kontakte_leeren.html',
			      'einzeltests/DMS_clear.html',
			    ])
			  \})
			  it('should reduct multiple same named test cases', () => \{
			    const suite = fs
			      .readFileSync(
			        path.join(__dirname, 'IDE_test_10/Suite login_multiple cases.htm')
			      )
			      .toString()
			    const required = parseSuiteRequirements(suite)
			    expect(required.length).toBe(2)
			    expect(required).toEqual(['Log in as test user.htm', 'Log out from BO.htm'])
			  \})
			  it('should migrate the suite', () => \{
			    const files = [
			      \{
			        name: '000_clear_mandant_Suite.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', '000_clear_mandant_Suite.html')
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/DMS_clear.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', 'einzeltests/DMS_clear.html')
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/kontakte_leeren.html',
			        contents: fs
			          .readFileSync(
			            path.join(
			              __dirname,
			              'IDE_test_4',
			              'einzeltests/kontakte_leeren.html'
			            )
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/MH_delete.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', 'einzeltests/MH_delete.html')
			          )
			          .toString(),
			      \},
			    ]
			    expect(migrateProject(files).suites.length).toBe(1)
			  \})
			  it('should fail to migrate due to missing test case', () => \{
			    const files = [
			      \{
			        name: '000_clear_mandant_Suite.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', '000_clear_mandant_Suite.html')
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/DMS_clear.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', 'einzeltests/DMS_clear.html')
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/kontakte_leeren.html',
			        contents: fs
			          .readFileSync(
			            path.join(
			              __dirname,
			              'IDE_test_4',
			              'einzeltests/kontakte_leeren.html'
			            )
			          )
			          .toString(),
			      \},
			    ]
			    expect(() => \{
			      migrateProject(files)
			    \}).toThrow(
			      "The file einzeltests/MH_delete.html is missing, suite can't be migrated"
			    )
			  \})
			  it('should migrate multiple suites', () => \{
			    const files = [
			      \{
			        name: '000_clear_mandant_Suite.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', '000_clear_mandant_Suite.html')
			          )
			          .toString(),
			      \},
			      \{
			        name: '001_clear_mandant_Suite.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', '000_clear_mandant_Suite.html')
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/DMS_clear.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', 'einzeltests/DMS_clear.html')
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/kontakte_leeren.html',
			        contents: fs
			          .readFileSync(
			            path.join(
			              __dirname,
			              'IDE_test_4',
			              'einzeltests/kontakte_leeren.html'
			            )
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/MH_delete.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', 'einzeltests/MH_delete.html')
			          )
			          .toString(),
			      \},
			    ]
			    const project = migrateProject(files)
			    expect(project.suites.length).toBe(2)
			    expect(project.tests.length).toBe(3)
			  \})
			  it('should create a suite if none was given', () => \{
			    const files = [
			      \{
			        name: 'einzeltests/DMS_clear.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', 'einzeltests/DMS_clear.html')
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/kontakte_leeren.html',
			        contents: fs
			          .readFileSync(
			            path.join(
			              __dirname,
			              'IDE_test_4',
			              'einzeltests/kontakte_leeren.html'
			            )
			          )
			          .toString(),
			      \},
			      \{
			        name: 'einzeltests/MH_delete.html',
			        contents: fs
			          .readFileSync(
			            path.join(__dirname, 'IDE_test_4', 'einzeltests/MH_delete.html')
			          )
			          .toString(),
			      \},
			    ]
			    const project = migrateProject(files)
			    expect(project.suites.length).toBe(1)
			    expect(project.tests.length).toBe(3)
			  \})
			\})
			
			describe('url migration', () => \{
			  it('should migrate all urls to absolute ones', () => \{
			    const test = \{
			      commands: [
			        \{
			          command: 'open',
			          target: '/index.html',
			        \},
			        \{
			          command: 'open',
			          target: '/users',
			        \},
			      ],
			    \}
			    const baseUrl = 'https://seleniumhq.org/'
			    const migrated = migrateUrls(test, baseUrl)
			    expect(migrated.commands[0].target).toBe(
			      'https://seleniumhq.org/index.html'
			    )
			    expect(migrated.commands[1].target).toBe('https://seleniumhq.org/users')
			  \})
			  it('should not migrate absolute urls', () => \{
			    const test = \{
			      commands: [
			        \{
			          command: 'open',
			          target: 'https://seleniumhq.org/index.html',
			        \},
			      ],
			    \}
			    const baseUrl = 'https://wikipedia.org'
			    const migrated = migrateUrls(test, baseUrl)
			    expect(migrated.commands[0].target).toBe(
			      'https://seleniumhq.org/index.html'
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\legacy\\migrate.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(19)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrate.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import UpgradeProject, \{ VERSIONS \} from '../src/migrate'
			
			describe('project migrator', () => \{
			  it('should migrate a project to the latest version', () => \{
			    const project = \{
			      tests: [],
			      suites: [],
			      version: '1.0',
			    \}
			    expect(UpgradeProject(project).version).toBe(VERSIONS[VERSIONS.length - 1])
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrate.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\implicit-locators.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/implicit-locators'
			
			describe('project migrator', () => \{
			  it('should be included in 1.1', () => \{
			    expect(migrate.version).toBe('1.1')
			  \})
			  it('should migrate implicit locators commands', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'click',
			              target: 'anId',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '//somexpath',
			              targets: [
			                ['something', 'id'],
			                ['id=something', 'id'],
			                ["(//a[contains(text(),'number line')])[2]", 'xpath:link'],
			                ["xpath=//a[contains(text(),'number density')]", 'xpath:link'],
			                ["//a[contains(text(),'number density')]", 'xpath:link'],
			                [
			                  "//div[@id='mw-content-text']/div/p[2]/a[5]",
			                  'xpath:idRelative',
			                ],
			                ["//a[contains(@href, '/wiki/Number_density')]", 'xpath:href'],
			                ['//a[5]', 'xpath:position'],
			              ],
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '//another=xpath',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'xpath=//ignorethis',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'linkText=ignorethis',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'id=ignorethis',
			              value: '',
			            \},
			            \{
			              command: 'pause',
			              target: '1000',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'click',
			              target: 'id=anId',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'xpath=//somexpath',
			              targets: [
			                ['id=something', 'id'],
			                ['id=something', 'id'],
			                [
			                  "xpath=(//a[contains(text(),'number line')])[2]",
			                  'xpath:link',
			                ],
			                ["xpath=//a[contains(text(),'number density')]", 'xpath:link'],
			                ["xpath=//a[contains(text(),'number density')]", 'xpath:link'],
			                [
			                  "xpath=//div[@id='mw-content-text']/div/p[2]/a[5]",
			                  'xpath:idRelative',
			                ],
			                [
			                  "xpath=//a[contains(@href, '/wiki/Number_density')]",
			                  'xpath:href',
			                ],
			                ['xpath=//a[5]', 'xpath:position'],
			              ],
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'xpath=//another=xpath',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'xpath=//ignorethis',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'linkText=ignorethis',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'id=ignorethis',
			              value: '',
			            \},
			            \{
			              command: 'pause',
			              target: '1000',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\implicit-locators.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\pause.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/pause'
			
			describe('project migrator', () => \{
			  it('should be included in 1.1', () => \{
			    expect(migrate.version).toBe('1.1')
			  \})
			  it('should migrate pause commands', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'pause',
			              target: '',
			              value: '100',
			            \},
			            \{
			              command: 'pause',
			              target: '100',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'pause',
			              target: '100',
			              value: '',
			            \},
			            \{
			              command: 'pause',
			              target: '100',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\pause.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\prompt.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/prompt'
			
			describe('project migrator', () => \{
			  it('should be included in 3.0', () => \{
			    expect(migrate.version).toBe('3.0')
			  \})
			  it('should migrate prompt commands', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'assertAlert',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'answerOnNextPrompt',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'webdriverAnswerOnVisiblePrompt',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'chooseCancelOnNextPrompt',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'webdriverChooseCancelOnVisiblePrompt',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'chooseOkOnNextConfirmation',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'webdriverChooseOkOnVisibleConfirmation',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'chooseCancelOnNextConfirmation',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'webdriverChooseCancelOnVisibleConfirmation',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'assertAlert',
			              target: '',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'assertAlert',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'acceptAlert',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'answerPrompt',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'dismissPrompt',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'acceptConfirmation',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'dismissConfirmation',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'assertAlert',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'acceptAlert',
			              target: '',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\prompt.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\script-interpolation.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/script-interpolation'
			
			describe('project migrator', () => \{
			  it('should be included in 1.1', () => \{
			    expect(migrate.version).toBe('1.1')
			  \})
			  it('should migrate variables that are interpolated into strings in scripts and expressions', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'executeScript',
			              target: 'return "\$\{x\}"',
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: "return '\$\{x\}'",
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: 'return \`\$\{x\}\`',
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: "return '\$\{x\}'.substr(0, 1);",
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: "return '\$\{x\}' + '\$\{xyz\}'",
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: "return '\$\{xyz2\}'",
			              value: '',
			            \},
			            \{
			              command: 'if',
			              target: "'\$\{x\}' == '2'",
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'executeScript',
			              target: 'return \$\{x\}',
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: 'return \$\{x\}',
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: 'return \$\{x\}',
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: 'return \$\{x\}.substr(0, 1);',
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: 'return \$\{x\} + \$\{xyz\}',
			              value: '',
			            \},
			            \{
			              command: 'executeScript',
			              target: 'return \$\{xyz2\}',
			              value: '',
			            \},
			            \{
			              command: 'if',
			              target: "\$\{x\} == '2'",
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\script-interpolation.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\select-window.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/select-window'
			
			describe('project migrator', () => \{
			  it('should be included in 2.0', () => \{
			    expect(migrate.version).toBe('2.0')
			  \})
			  it('should migrate select window commands', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'open',
			              target: '/',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'css=button',
			              value: '',
			            \},
			            \{
			              command: 'selectWindow',
			              target: 'win_ser_1',
			              value: '',
			            \},
			            \{
			              command: 'selectWindow',
			              target: 'win_ser_local',
			              value: '',
			            \},
			            \{
			              command: 'close',
			              target: 'win_ser_local',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toMatchObject(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'open',
			              target: '/',
			              value: '',
			            \},
			            \{
			              command: 'storeWindowHandle',
			              target: 'root',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'css=button',
			              value: '',
			              opensWindow: true,
			              windowHandleName: expect.stringContaining('win'),
			              windowTimeout: 2000,
			            \},
			            \{
			              command: 'selectWindow',
			              target: expect.stringMatching(/handle=\\\$\\\{.*\\\}/),
			              value: '',
			            \},
			            \{
			              command: 'selectWindow',
			              target: 'handle=\$\{root\}',
			              value: '',
			            \},
			            \{
			              command: 'close',
			              target: '',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\select-window.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\store-element-count.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/store-element-count'
			
			describe('project migrator', () => \{
			  it('should be included in 3.0', () => \{
			    expect(migrate.version).toBe('3.0')
			  \})
			  it('should migrate \`store xpath count\` commands', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'storeXpathCount',
			              target: 'xpath=//table',
			              value: 'var',
			            \},
			            \{
			              command: 'storeXpathCount',
			              target: '//table',
			              value: 'var',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'storeElementCount',
			              target: 'xpath=//table',
			              value: 'var',
			            \},
			            \{
			              command: 'storeElementCount',
			              target: 'xpath=//table',
			              value: 'var',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\store-element-count.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\target-fallback.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/target-fallback'
			
			describe('project migrator', () => \{
			  it('should be included in 3.0', () => \{
			    expect(migrate.version).toBe('3.0')
			  \})
			  it('should migrate targets', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'click',
			              target: 'something',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'something',
			              targets: [
			                ['first', 'strat'],
			                ['second', 'start'],
			              ],
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'click',
			              target: 'something',
			              value: '',
			            \},
			            \{
			              command: 'click',
			              target: 'something',
			              targetFallback: [
			                ['first', 'strat'],
			                ['second', 'start'],
			              ],
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\target-fallback.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\title.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/title'
			
			describe('project migrator', () => \{
			  it('should be included in 3.0', () => \{
			    expect(migrate.version).toBe('3.0')
			  \})
			  it('should migrate \`store title\` commands', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'storeTitle',
			              target: 'aaa',
			              value: 'var',
			            \},
			            \{
			              command: 'storeTitle',
			              target: '',
			              value: 'var',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'storeTitle',
			              target: 'var',
			              value: '',
			            \},
			            \{
			              command: 'storeTitle',
			              target: 'var',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\title.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\variable-name.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/variable-name'
			
			describe('project migrator', () => \{
			  it('should be included in 1.1', () => \{
			    expect(migrate.version).toBe('1.1')
			  \})
			  it('should migrate variable reference by interpolation into variable reference by name', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'assert',
			              target: '\$\{x\}',
			              value: '',
			            \},
			            \{
			              command: 'verify',
			              target: '\$\{x\}',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'assert',
			              target: 'x',
			              value: '',
			            \},
			            \{
			              command: 'verify',
			              target: 'x',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\variable-name.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\wait-for-commands.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import migrate from '../../src/migrations/wait-for-commands'
			
			describe('project migrator', () => \{
			  it('should be included in 1.1', () => \{
			    expect(migrate.version).toBe('1.1')
			  \})
			  it('should migrate legacy element based waitFor commands to the new naming convention', () => \{
			    const project = \{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'waitForVisible',
			              target: 'css=blah',
			              value: '',
			            \},
			            \{
			              command: 'waitForEditable',
			              target: 'css=blah',
			              value: '',
			            \},
			            \{
			              command: 'waitForElementPresent',
			              target: 'css=blah',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \}
			    const upgraded = migrate(project)
			    expect(upgraded).toEqual(\{
			      tests: [
			        \{
			          id: '1',
			          commands: [
			            \{
			              command: 'waitForElementVisible',
			              target: 'css=blah',
			              value: '',
			            \},
			            \{
			              command: 'waitForElementEditable',
			              target: 'css=blah',
			              value: '',
			            \},
			            \{
			              command: 'waitForElementPresent',
			              target: 'css=blah',
			              value: '',
			            \},
			          ],
			        \},
			      ],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-migrate\\__tests__\\migrations\\wait-for-commands.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\arg-type.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import ArgType from '../../src/args/arg-type'
			import Argument from '../../src/args/argument'
			
			describe('ArgType', () => \{
			  describe('exact', () => \{
			    it('should extend an argument', () => \{
			      const argInput = new Argument(\{
			        name: 'num',
			        description: 'desc',
			        identify: (n: number) => typeof n === 'number',
			        validate: (n: number) => n === 1,
			      \})
			      const at = ArgType.exact(argInput)
			
			      expect(at.validate(2)).toBeFalsy()
			      expect(at.validate(1)).toBeTruthy()
			    \})
			  \})
			
			  it('should allow undefined for optional arg-types', () => \{
			    const argInput = new Argument(\{
			      name: 'num',
			      description: 'desc',
			      identify: (n: number) => typeof n === 'number',
			      validate: (n: number) => n === 1,
			    \})
			    const at = ArgType.exact(argInput)
			
			    expect(at.validate(undefined)).toBeTruthy()
			  \})
			
			  it('should not allow undefined for optional arg-types', () => \{
			    const argInput = new Argument(\{
			      name: 'num',
			      description: 'desc',
			      identify: (n: number) => typeof n === 'number',
			      validate: (n: number) => n === 1,
			    \})
			    const at = ArgType.exact(argInput).isRequired()
			
			    expect(() => at.validate(undefined)).toThrow('Argument is required')
			  \})
			
			  describe('oneOf', () => \{
			    it('should identify the argument', () => \{
			      const numArg = new Argument(\{
			        name: 'num',
			        description: 'desc',
			        identify: (n: number) => typeof n === 'number',
			        validate: (n: number) => n === 1,
			      \})
			      const strArg = new Argument(\{
			        name: 'str',
			        description: 'desc',
			        identify: (s: string) => typeof s === 'string',
			        validate: (s: string) => s === 'str',
			      \})
			
			      const at = ArgType.oneOf([numArg, strArg])
			      expect.assertions(3)
			      expect(at.identify(1)).toBe(numArg)
			      expect(at.identify('1')).toBe(strArg)
			
			      const arg = at.identify(1)
			      if (numArg.is(arg)) \{
			        expect(arg.validate(1)).toBeTruthy()
			      \}
			    \})
			
			    it('should validate the arguments', () => \{
			      const numArg = new Argument(\{
			        name: 'num',
			        description: 'desc',
			        identify: (n: number) => typeof n === 'number',
			        validate: (n: number) => n === 1,
			      \})
			      const strArg = new Argument(\{
			        name: 'str',
			        description: 'desc',
			        identify: (s: string) => typeof s === 'string',
			        validate: (s: string) => s === 'str',
			      \})
			
			      const at = ArgType.oneOf([numArg, strArg])
			      expect(at.validate(1)).toBeTruthy()
			      expect(at.validate(2)).toBeFalsy()
			      expect(at.validate('str')).toBeTruthy()
			      expect(at.validate('tomer')).toBeFalsy()
			    \})
			
			    it('should work with extending', () => \{
			      const numArg = new Argument(\{
			        name: 'num',
			        description: 'desc',
			        identify: (n: number) => typeof n === 'number',
			        validate: (n: number) => n === 1,
			      \})
			      const numArg2 = new Argument(\{
			        name: 'num',
			        description: 'desc',
			        identify: (n: number) => typeof n === 'number',
			        validate: (n: number) => n === 1,
			        extending: numArg,
			      \})
			      const numArg3 = new Argument(\{
			        name: 'num',
			        description: 'desc',
			        identify: (n: number) => typeof n === 'number',
			        validate: (n: number) => n === 1,
			        extending: numArg2,
			      \})
			      const strArg = new Argument(\{
			        name: 'str',
			        description: 'desc',
			        identify: (s: string) => typeof s === 'string',
			        validate: (s: string) => s === 'str',
			      \})
			
			      const at = ArgType.oneOf([numArg3, strArg])
			      expect.assertions(4)
			      expect(at.identify(1)).toBe(numArg3)
			      expect(at.identify('1')).toBe(strArg)
			
			      const arg = at.identify(1)
			      if (numArg3.is(arg)) \{
			        expect(arg.validate(1)).toBeTruthy()
			        expect(arg.extensionOf(numArg)).toBeTruthy()
			      \}
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\arg-type.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\argument.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Argument from '../../src/args/argument'
			
			describe('argument schema', () => \{
			  it('should be able to create an argument', () => \{
			    expect(
			      new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: () => true,
			        validate: () => false,
			      \})
			    ).toBeDefined()
			  \})
			
			  it('should have a name and description', () => \{
			    const arg = new Argument(\{
			      name: 'arg',
			      description: 'desc',
			      identify: () => true,
			      validate: () => false,
			    \})
			    expect(arg.name).toBe('arg')
			    expect(arg.description).toBe('desc')
			  \})
			
			  it('should have an identifying function', () => \{
			    const arg = new Argument(\{
			      name: 'arg',
			      description: 'desc',
			      identify: (value: any) => typeof value === 'number',
			      validate: () => false,
			    \})
			
			    expect(arg.identify(1)).toBeTruthy()
			    expect(arg.identify('1')).toBeFalsy()
			  \})
			
			  it('should have a verify function', () => \{
			    const arg = new Argument(\{
			      name: 'arg',
			      description: 'desc',
			      identify: () => true,
			      validate: (value: number) => value === 1,
			    \})
			
			    expect(arg.validate(1)).toBeTruthy()
			    expect(arg.validate(2)).toBeFalsy()
			  \})
			
			  describe('extending', () => \{
			    it('should not extend anything by default', () => \{
			      const arg = new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: () => true,
			        validate: () => false,
			      \})
			
			      expect(arg.extending).toBeUndefined()
			    \})
			
			    it('should not extend a different argument', () => \{
			      const arg = new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: () => true,
			        validate: () => false,
			      \})
			      const arg2 = new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: () => true,
			        validate: () => false,
			      \})
			
			      expect(arg2.extensionOf(arg)).toBeFalsy()
			    \})
			
			    it('should extend an argument', () => \{
			      const arg = new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: () => true,
			        validate: () => false,
			      \})
			      const arg2 = new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: () => true,
			        validate: () => false,
			        extending: arg,
			      \})
			
			      expect(arg2.extensionOf(arg)).toBeTruthy()
			    \})
			
			    it('should extend an extended argument', () => \{
			      const arg = new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: (_: number) => true,
			        validate: (n: number) => n === 1,
			      \})
			      const arg2 = new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: (_: string) => true,
			        validate: (_: string) => false,
			        extending: arg,
			      \})
			      const arg3 = new Argument(\{
			        name: 'arg',
			        description: 'desc',
			        identify: (_: boolean) => true,
			        validate: (_: boolean) => false,
			        extending: arg2,
			      \})
			
			      expect(arg3.extensionOf(arg)).toBeTruthy()
			      expect(arg3.extending!.extending!.validate(1)).toBeTruthy()
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\argument.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\index.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import * as args from '../../src/args'
			
			describe('arguments index', () => \{
			  it('should have all the arguments', () => \{
			    expect(Object.keys(args)).toEqual(
			      expect.arrayContaining(['text', 'variable'])
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\index.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\text.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import text from '../../src/args/text'
			
			describe('text schema', () => \{
			  describe('validate', () => \{
			    it('should allow text', () => \{
			      expect(text.validate('hello')).toBeTruthy()
			    \})
			    it('should allow empty text', () => \{
			      expect(text.validate('')).toBeTruthy()
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\text.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\variable.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import variable from '../../src/args/variable'
			
			describe('variable schema', () => \{
			  describe('verify', () => \{
			    it('should verify a valid variable name', () => \{
			      expect(variable.validate('tomer')).toBeTruthy()
			      expect(variable.validate('tomer2')).toBeTruthy()
			      expect(variable.validate('tomer_steinfeld')).toBeTruthy()
			    \})
			
			    it('should throw for a variable with an invalid character', () => \{
			      expect(() => variable.validate('aå')).toThrow('Unexpected token å')
			    \})
			
			    it('should throw for variable starting with a number', () => \{
			      expect(() => variable.validate('5a')).toThrow('Unexpected token 5')
			    \})
			
			    describe('property access', () => \{
			      it('should allow to access a property', () => \{
			        expect(variable.validate('tomer.steinfeld')).toBeTruthy()
			      \})
			
			      it('should throw when trying to access an un-declared property', () => \{
			        expect(() => variable.validate('tomer..steinfeld')).toThrow(
			          'Unexpected token .'
			        )
			      \})
			
			      it('should throw for a variable with an invalid property', () => \{
			        expect(() => variable.validate('tomer.aå')).toThrow(
			          'Unexpected token å'
			        )
			      \})
			
			      it('should throw for variable property starting with a number', () => \{
			        expect(() => variable.validate('tomer.5a')).toThrow(
			          'Unexpected token 5'
			        )
			      \})
			    \})
			
			    describe('array access', () => \{
			      it('should allow access to an array by index', () => \{
			        expect(variable.validate('tomer[0]')).toBeTruthy()
			        expect(variable.validate('tomer[10]')).toBeTruthy()
			        expect(variable.validate('tomer[1318237]')).toBeTruthy()
			      \})
			      it('should allow access to nested variables by index', () => \{
			        expect(variable.validate('tomer[1][2]')).toBeTruthy()
			      \})
			      it('should fail to access an array with an invalid integer index', () => \{
			        expect(() => variable.validate('tomer[00]')).toThrow(
			          'Unexpected token 0'
			        )
			      \})
			      it('should not allow two opening brackets', () => \{
			        expect(() => variable.validate('tomer[[1]')).toThrow(
			          'Unexpected token ['
			        )
			      \})
			      it('should not allow an opening bracket without a closing one', () => \{
			        expect(() => variable.validate('tomer[1')).toThrow('Missing token ]')
			      \})
			      it('should not allow two closing tags', () => \{
			        expect(() => variable.validate('tomer]]')).toThrow('Unexpected token ]')
			      \})
			      it('should not allow empty accessing array with no index', () => \{
			        expect(() => variable.validate('tomer[]')).toThrow('Unexpected token ]')
			      \})
			      it('should not allow [.] syntax', () => \{
			        expect(() => variable.validate('tomer[.]')).toThrow(
			          'Unexpected token .'
			        )
			      \})
			      it('should allow accessing array via variable index', () => \{
			        expect(variable.validate('tomer[steinfeld]')).toBeTruthy()
			      \})
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\args\\variable.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(16)
    });
    it('seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\commands\\command.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Command from '../../src/commands/command'
			import ArgType from '../../src/args/arg-type'
			import Argument from '../../src/args/argument'
			
			describe('command', () => \{
			  it('should have name and description', () => \{
			    const cmd = new Command(\{
			      name: 'cmd',
			      description: 'desc',
			      args: \{\},
			      validate: () => true,
			    \})
			
			    expect(cmd.name).toBe('cmd')
			    expect(cmd.description).toBe('desc')
			  \})
			
			  it('should have an arg-type', () => \{
			    const arg = new Argument(\{
			      name: 'arg',
			      description: 'arg',
			      identify: (n: number) => typeof n === 'number',
			      validate: (n: number) => n === 1,
			    \})
			    const at = new ArgType([arg])
			    const cmd = new Command(\{
			      name: 'cmd',
			      description: 'desc',
			      args: \{ num: at \},
			      validate: (\{ num \}) => at.validate(num),
			    \})
			    expect(cmd.validate(\{ num: 1 \})).toBeTruthy()
			    expect(cmd.validate(\{ num: 2 \})).toBeFalsy()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\commands\\command.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\commands\\store.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import store from '../../src/commands/store'
			
			describe('store schema', () => \{
			  describe('validate', () => \{
			    it('text should be required', () => \{
			      expect(() => store.validate(\{ text: undefined, variable: 'a' \})).toThrow(
			        'Argument is required'
			      )
			    \})
			
			    it('variable should be required', () => \{
			      expect(() => store.validate(\{ text: 'a', variable: undefined \})).toThrow(
			        'Argument is required'
			      )
			    \})
			
			    it('should validate', () => \{
			      expect(store.validate(\{ text: 'a', variable: 'a' \})).toBeTruthy()
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\commands\\store.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\index.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ Commands, ArgTypes \} from '../src'
			
			describe('module', () => \{
			  it('should export the correct values', () => \{
			    expect(Commands).toBeDefined()
			    expect(ArgTypes).toBeDefined()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-model\\__tests__\\index.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runner\\src\\__tests__\\capabilities.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Capabilities from '../capabilities'
			
			describe('capabilities string parser', () => \{
			  it('should parse capability key', () => \{
			    const capabilities = 'browserName=chrome'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      browserName: 'chrome',
			    \})
			  \})
			  it('should parse multiple capabilities keys', () => \{
			    const capabilities =
			      'browserName=chrome platform=MAC unexpectedAlertBehaviour=ignore'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      browserName: 'chrome',
			      platform: 'MAC',
			      unexpectedAlertBehaviour: 'ignore',
			    \})
			  \})
			  it('should parse quoted capability key', () => \{
			    const capabilities = 'browserName="chrome"'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      browserName: 'chrome',
			    \})
			  \})
			  it('should parse multiword capability key', () => \{
			    const capabilities =
			      'binary="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      binary: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			    \})
			    const capabilities2 =
			      "binary='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'"
			    expect(Capabilities.parseString(capabilities2)).toEqual(\{
			      binary: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			    \})
			  \})
			  it('should parse multiple multiword capability keys', () => \{
			    const expected = \{
			      browserName: 'internet explorer',
			      version: 10,
			      platform: 'Windows 8.1',
			    \}
			    const capabilitiesSingleQuotes =
			      "browserName='internet explorer' version=10.0 platform='Windows 8.1'"
			    expect(Capabilities.parseString(capabilitiesSingleQuotes)).toEqual(expected)
			    const capabilitiesDoubleQuotes =
			      'browserName="internet explorer" version=10.0 platform="Windows 8.1"'
			    expect(Capabilities.parseString(capabilitiesDoubleQuotes)).toEqual(expected)
			  \})
			  it('should parse boolean capability key', () => \{
			    const capabilities = 'javascriptEnabled=false databaseEnabled=true'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      javascriptEnabled: false,
			      databaseEnabled: true,
			    \})
			  \})
			  it('should parse integer capability key', () => \{
			    const capabilities = 'elementScrollBehavior=1'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      elementScrollBehavior: 1,
			    \})
			  \})
			  it('should parse dot-notation capability key', () => \{
			    const capabilities = 'webdriver.remote.sessionid=someId'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      webdriver: \{
			        remote: \{
			          sessionid: 'someId',
			        \},
			      \},
			    \})
			  \})
			  it('should parse multiple dot-notation capability key', () => \{
			    const capabilities = \`
			webdriver.remote.sessionid=someId
			webdriver.remote.username=username
			    \`
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      webdriver: \{
			        remote: \{
			          sessionid: 'someId',
			          username: 'username',
			        \},
			      \},
			    \})
			  \})
			  it('should parse dot-notation arrays', () => \{
			    const capabilities = 'chromeOptions.args=[disable-infobars, headless]'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      chromeOptions: \{
			        args: ['disable-infobars', 'headless'],
			      \},
			    \})
			  \})
			  it('should parse space separated capability keys', () => \{
			    const capabilities =
			      'browserName =chrome platform= MAC unexpectedAlertBehaviour = ignore'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      browserName: 'chrome',
			      platform: 'MAC',
			      unexpectedAlertBehaviour: 'ignore',
			    \})
			  \})
			  it('should trim the capability values', () => \{
			    const capabilities =
			      'platform="  macOS 10.13   " chromeOptions.args=[   disable-infobars  ,  headless   ]'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      platform: 'macOS 10.13',
			      chromeOptions: \{
			        args: ['disable-infobars', 'headless'],
			      \},
			    \})
			  \})
			  it('should parse urls in list', () => \{
			    const capabilities = 'bypass=[http://localhost:434, http://localhost:321]'
			    expect(Capabilities.parseString(capabilities)).toEqual(\{
			      bypass: ['http://localhost:434', 'http://localhost:321'],
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runner\\src\\__tests__\\capabilities.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(13)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runner\\src\\__tests__\\config.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import path from 'path'
			import Config from '../config'
			
			describe('configuration loader', () => \{
			  it('should load the config from a file', () => \{
			    const configuration = Config.load(path.join(__dirname, 'config_1.yml'))
			    expect(configuration.capabilities).toBeDefined()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runner\\src\\__tests__\\config.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runner\\src\\__tests__\\proxy.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import ParseProxy from '../proxy'
			
			describe('proxy parser', () => \{
			  it('should parse a direct proxy', () => \{
			    expect(ParseProxy('direct')).toEqual(\{
			      proxyType: 'direct',
			    \})
			  \})
			  it('should parse a system proxy', () => \{
			    expect(ParseProxy('system')).toEqual(\{
			      proxyType: 'system',
			    \})
			  \})
			  it('should parse a pac proxy', () => \{
			    expect(ParseProxy('pac', 'http://localhost/pac')).toEqual(\{
			      proxyType: 'pac',
			      proxyOptions: 'http://localhost/pac',
			    \})
			  \})
			  it('should throw if no pac file was given', () => \{
			    expect(() => ParseProxy('pac')).toThrowError(
			      'A proxy autoconfig URL was not passed (e.g. --proxy-options="http://localhost/pac")'
			    )
			  \})
			  it('should parse a manual proxy', () => \{
			    expect(ParseProxy('manual', \{\})).toEqual(\{
			      proxyType: 'manual',
			      proxyOptions: \{\},
			    \})
			  \})
			  it('should omit redundant keys from the proxy', () => \{
			    expect(
			      ParseProxy('manual', \{ test: 4, http: 'http://localhost:4324' \})
			    ).toEqual(\{
			      proxyType: 'manual',
			      proxyOptions: \{
			        http: 'http://localhost:4324',
			      \},
			    \})
			  \})
			  it('should whitelist the allowed proxy protocols', () => \{
			    expect(
			      ParseProxy('manual', \{
			        test: 4,
			        http: 'http://localhost:4324',
			        https: 'http://localhost:4324',
			        ftp: 'http://localhost:4324',
			        bypass: ['http://something.com'],
			      \})
			    ).toEqual(\{
			      proxyType: 'manual',
			      proxyOptions: \{
			        http: 'http://localhost:4324',
			        https: 'http://localhost:4324',
			        ftp: 'http://localhost:4324',
			        bypass: ['http://something.com'],
			      \},
			    \})
			  \})
			  it('should return an empty object if no options were given to manual proxy', () => \{
			    expect(ParseProxy('manual')).toEqual(\{
			      proxyType: 'manual',
			      proxyOptions: \{\},
			    \})
			  \})
			  it('should throw if non object was passed to manual proxy type', () => \{
			    // @ts-expect-error intentionally invalid type
			    expect(() => ParseProxy('manual', 5)).toThrowError(
			      'Proxy options were not passed to manual proxy (e.g. --proxy-options="http=localhost:321 ftp=localhost:4324")'
			    )
			  \})
			  it('should parse socks proxy', () => \{
			    expect(ParseProxy('socks', \{ socksProxy: 'localhost:213' \})).toEqual(\{
			      proxyType: 'socks',
			      proxyOptions: \{
			        socksProxy: 'localhost:213',
			      \},
			    \})
			  \})
			  it('should parse socks proxy version', () => \{
			    expect(
			      ParseProxy('socks', \{ socksProxy: 'localhost:213', socksVersion: 5 \})
			    ).toEqual(\{
			      proxyType: 'socks',
			      proxyOptions: \{
			        socksProxy: 'localhost:213',
			        socksVersion: 5,
			      \},
			    \})
			    expect(
			      ParseProxy('socks', \{ socksProxy: 'localhost:213', socksVersion: '5' \})
			    ).toEqual(\{
			      proxyType: 'socks',
			      proxyOptions: \{
			        socksProxy: 'localhost:213',
			        socksVersion: 5,
			      \},
			    \})
			  \})
			  it('should throw if no socks proxy url was given', () => \{
			    expect(() => ParseProxy('socks')).toThrowError(
			      'Proxy options were not passed to socks proxy (e.g. --proxy-options="socksProxy=localhost:321")'
			    )
			    expect(() => ParseProxy('socks', \{\})).toThrowError(
			      'Proxy options were not passed to socks proxy (e.g. --proxy-options="socksProxy=localhost:321")'
			    )
			  \})
			  it('should throw if a non-number was passed as socks version', () => \{
			    expect(() =>
			      ParseProxy('socks', \{ socksProxy: 'localhost:434', socksVersion: 'test' \})
			    ).toThrowError(
			      'Proxy socks version is invalid (e.g. --proxy-options="socksProxy=localhost:321 socksVersion=5")'
			    )
			  \})
			  it('should throw if an invalid proxy type was passed', () => \{
			    // @ts-expect-error intentionally invalid type
			    expect(() => ParseProxy('invalid')).toThrowError(
			      'An unknown proxy type was passed, use one of: direct, system, manual, socks or pac (e.g. --proxy-type="direct")'
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runner\\src\\__tests__\\proxy.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runner\\src\\__tests__\\versioner.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Satisfies from '../versioner'
			
			describe('semantic versioner', () => \{
			  it('should return \`undefined\` for exact version match', () => \{
			    expect(Satisfies('2.1', '2.1')).toBeUndefined()
			  \})
			  it('should return a runner upgrade warning for upper minor version mismatch', () => \{
			    expect(Satisfies('2.1', '2.0')).toEqual(
			      'runner is older than project file, in case of issues upgrade the runner using: \`npm i -g selenium-side-runner@latest\`'
			    )
			  \})
			  it('should return an IDE upgrade warning for lower minor version mismatch', () => \{
			    expect(Satisfies('2.1', '2.2')).toEqual(
			      'project file is older than recommended, in case of issues upgrade the project via the IDE'
			    )
			  \})
			  it('should throw a runner upgrade error for upper major version mismatch', () => \{
			    expect(() => Satisfies('2.1', '1.1')).toThrow(
			      'runner is too old to run the project file, upgrade the runner using: \`npm i -g selenium-side-runner@latest\`'
			    )
			  \})
			  it('should throw an IDE upgrade error for lower major version mismatch', () => \{
			    expect(() => Satisfies('2.1', '3.1')).toThrow(
			      'project file is too old for the runner, upgrade the project via the IDE'
			    )
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runner\\src\\__tests__\\versioner.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\callstack.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Callstack from '../src/callstack'
			
			describe('Call stack', () => \{
			  it('should be able to call and unwind', () => \{
			    const callee = \{
			      id: 2,
			      commands: [
			        \{
			          command: 'open',
			          target: '',
			          value: '',
			        \},
			      ],
			    \}
			
			    const proc = \{
			      callee,
			      caller: \{
			        position: undefined,
			        tree: undefined,
			      \},
			    \}
			
			    const cs = new Callstack()
			    expect(cs.length).toBe(0)
			    cs.call(proc)
			    expect(cs.length).toBe(1)
			    expect(cs.unwind()).toBe(proc)
			    expect(cs.length).toBe(0)
			  \})
			  it('should throw if trying to unwind an empty stack', () => \{
			    const cs = new Callstack()
			    expect(() => cs.unwind()).toThrow()
			  \})
			  it('should access the current executing procedure', () => \{
			    const cs = new Callstack()
			    const proc = \{\}
			    cs.call(proc)
			    expect(cs.top()).toBe(proc)
			    expect(cs.length).toBe(1)
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\callstack.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\integration\\playback-webdriver.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ promisify \} from 'util'
			import \{ By \} from 'selenium-webdriver'
			import \{ createHeadlessChrome \} from '@seleniumhq/webdriver-testkit'
			import \{ createStaticSite \} from '@seleniumhq/side-testkit'
			import Playback from '../../src/playback'
			import Variables from '../../src/Variables'
			import WebDriverExecutor from '../../src/webdriver'
			
			jest.setTimeout(30000)
			
			describe('Playback using webdriver', () => \{
			  const app = createStaticSite()
			  let port, close, driver, executor, variables
			  beforeAll(async () => \{
			    await new Promise(res => \{
			      const server = app.listen(() => \{
			        port = server.address().port
			        close = promisify(server.close.bind(server))
			        res()
			      \})
			    \})
			  \})
			  afterEach(() => \{
			    executor.hooks = undefined
			  \})
			  afterAll(async () => \{
			    await close()
			  \})
			  beforeAll(async () => \{
			    variables = new Variables()
			    driver = await createHeadlessChrome()
			    executor = new WebDriverExecutor(\{ driver, implicitWait: 50 \})
			  \})
			  afterAll(async () => \{
			    await driver.quit()
			  \})
			  afterEach(async () => \{
			    try \{
			      await driver.actions(\{ bridge: true \}).clear()
			    \} catch (err) \{
			      // chromedriver doesn't support clear()
			    \}
			  \})
			  it('should run a test using WebDriverExecutor', async () => \{
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/check.html',
			          value: '',
			        \},
			        \{
			          command: 'uncheck',
			          target: 'id=t',
			          value: '',
			        \},
			        \{
			          command: 'check',
			          target: 'id=f',
			          value: '',
			        \},
			      ],
			    \}
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    await (await playback.play(test))()
			    const element = await driver.findElement(By.id('f'))
			    expect(await element.isSelected()).toBeTruthy()
			  \})
			  it('should utilize before and after commands', async () => \{
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/check.html',
			          value: '',
			        \},
			        \{
			          command: 'uncheck',
			          target: 'id=t',
			          value: '',
			        \},
			        \{
			          command: 'check',
			          target: 'id=f',
			          value: '',
			        \},
			      ],
			    \}
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    executor.hooks = \{
			      onAfterCommand: jest.fn(),
			      onBeforeCommand: jest.fn(),
			    \}
			    await (await playback.play(test))()
			    expect(executor.hooks.onBeforeCommand).toHaveBeenCalledTimes(3)
			    expect(executor.hooks.onAfterCommand).toHaveBeenCalledTimes(3)
			    expect(executor.hooks.onBeforeCommand.mock.calls[0]).toEqual([
			      \{
			        command: test.commands[0],
			      \},
			    ])
			    expect(executor.hooks.onAfterCommand.mock.calls[0]).toEqual([
			      \{
			        command: test.commands[0],
			      \},
			    ])
			  \})
			  it('should inform of a new window', async () => \{
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/windows.html',
			          value: '',
			        \},
			        \{
			          command: 'click',
			          target: 'css=a',
			          value: '',
			          opensWindow: true,
			          windowHandleName: 'new',
			          windowTimeout: 200,
			        \},
			      ],
			    \}
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    executor.hooks = \{
			      onWindowAppeared: jest.fn(),
			    \}
			    await (await playback.play(test))()
			    expect(executor.hooks.onWindowAppeared).toHaveBeenCalledTimes(1)
			    expect(executor.hooks.onWindowAppeared.mock.calls[0]).toMatchObject([
			      \{
			        command: test.commands[1],
			        windowHandleName: test.commands[1].windowHandleName,
			        windowHandle: expect.stringMatching(/^CDwindow-/),
			      \},
			    ])
			  \})
			  it('should wait for hook execution to complete', async () => \{
			    let didExecute = false
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/windows.html',
			          value: '',
			        \},
			        \{
			          command: 'click',
			          target: 'css=a',
			          value: '',
			          opensWindow: true,
			          windowHandleName: 'new',
			          windowTimeout: 200,
			        \},
			      ],
			    \}
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    executor.hooks = \{
			      onWindowAppeared: () => \{
			        return new Promise(res => \{
			          setTimeout(() => \{
			            didExecute = true
			            res()
			          \}, 10)
			        \})
			      \},
			    \}
			    await (await playback.play(test))()
			    expect(didExecute).toBeTruthy()
			  \})
			  it('should perform locator fallback', async () => \{
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/check.html',
			          value: '',
			        \},
			        \{
			          command: 'uncheck',
			          target: 'id=nan',
			          value: '',
			          targetFallback: [
			            ['id=stillnan', 'id'],
			            ['id=t', 'id'],
			            ['id=broken', 'id'],
			          ],
			        \},
			      ],
			    \}
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    await (await playback.play(test))()
			    const element = await driver.findElement(By.id('t'))
			    expect(await element.isSelected()).toBeFalsy()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\integration\\playback-webdriver.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\integration\\recording-syncronizer-webdriver.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ promisify \} from 'util'
			import \{ createHeadlessChrome \} from '@seleniumhq/webdriver-testkit'
			import \{ createStaticSite \} from '@seleniumhq/side-testkit'
			import Playback from '../../src/playback'
			import Variables from '../../src/Variables'
			import WebDriverExecutor from '../../src/webdriver'
			import createRecorderSyncronizerForWebdriverExecutor from '../../src/recording-syncronizer-webdriver'
			
			jest.setTimeout(30000)
			
			describe('recording syncronizer webdriver', () => \{
			  const app = createStaticSite()
			  let port, close, driver, executor, variables
			  beforeAll(async () => \{
			    await new Promise(res => \{
			      const server = app.listen(() => \{
			        port = server.address().port
			        close = promisify(server.close.bind(server))
			        res()
			      \})
			    \})
			  \})
			  afterEach(() => \{
			    executor.hooks = undefined
			  \})
			  afterAll(async () => \{
			    await close()
			  \})
			  beforeAll(async () => \{
			    variables = new Variables()
			    driver = await createHeadlessChrome()
			    executor = new WebDriverExecutor(\{ driver, implicitWait: 50 \})
			  \})
			  afterAll(async () => \{
			    await driver.quit()
			  \})
			  afterEach(async () => \{
			    try \{
			      await driver.actions(\{ bridge: true \}).clear()
			    \} catch (err) \{
			      // chromedriver doesn't support clear()
			    \}
			  \})
			
			  it('should syncronize the current window with the recorder through hooks', async () => \{
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/windows.html',
			          value: '',
			        \},
			        \{
			          command: 'storeWindowHandle',
			          target: 'current',
			          value: '',
			        \},
			      ],
			    \}
			    await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			    const \{
			      hooks: \{ onStoreWindowHandle, onWindowAppeared, onWindowSwitched \},
			    \} = createRecorderSyncronizerForWebdriverExecutor(\{
			      sessionId: 'default',
			      executor,
			    \})
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    // eslint-disable-next-line require-atomic-updates
			    executor.hooks = \{
			      onStoreWindowHandle: async (...args) => \{
			        await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			        return onStoreWindowHandle(...args)
			      \},
			      onWindowAppeared,
			      onWindowSwitched: async (...args) => \{
			        await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			        return onWindowSwitched(...args)
			      \},
			    \}
			    await (await playback.play(test))()
			
			    const \{ handleCalls \} = await getPageScriptCalls(executor.driver)
			
			    expect(handleCalls.length).toBe(1)
			    expect(handleCalls[0].sessionId).toBe('default')
			    expect(handleCalls[0].windowHandle).toBe('current')
			  \})
			
			  it('should syncronize a new window with the recorder through hooks', async () => \{
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/windows.html',
			          value: '',
			        \},
			        \{
			          command: 'click',
			          target: 'css=a',
			          value: '',
			          opensWindow: true,
			          windowHandleName: 'new',
			          windowTimeout: 200,
			        \},
			        \{
			          command: 'selectWindow',
			          target: 'handle=\$\{new\}',
			          value: '',
			        \},
			      ],
			    \}
			    await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			    const \{
			      hooks: \{ onWindowAppeared, onWindowSwitched \},
			    \} = createRecorderSyncronizerForWebdriverExecutor(\{
			      sessionId: 'default',
			      executor,
			    \})
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    // eslint-disable-next-line require-atomic-updates
			    executor.hooks = \{
			      onWindowAppeared,
			      onWindowSwitched: async (...args) => \{
			        await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			        return onWindowSwitched(...args)
			      \},
			    \}
			    await (await playback.play(test))()
			
			    const \{ handleCalls \} = await getPageScriptCalls(executor.driver)
			
			    expect(handleCalls.length).toBe(1)
			    expect(handleCalls[0].sessionId).toBe('default')
			    expect(handleCalls[0].windowHandle).toBe('new')
			  \})
			
			  it('should syncronize a new window with the recorder manually', async () => \{
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/windows.html',
			          value: '',
			        \},
			        \{
			          command: 'click',
			          target: 'css=a',
			          value: '',
			          opensWindow: true,
			          windowHandleName: 'new',
			          windowTimeout: 200,
			        \},
			      ],
			    \}
			    await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			    const \{
			      hooks: \{ onWindowAppeared, onWindowSwitched \},
			      syncAllPendingWindows,
			    \} = createRecorderSyncronizerForWebdriverExecutor(\{
			      sessionId: 'default',
			      executor,
			    \})
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    // eslint-disable-next-line require-atomic-updates
			    executor.hooks = \{
			      onWindowAppeared,
			      onWindowSwitched: async (...args) => \{
			        await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			        return onWindowSwitched(...args)
			      \},
			    \}
			    await (await playback.play(test))()
			
			    await executor.driver.switchTo().window(variables.get('new'))
			    await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			    let \{ handleCalls \} = await getPageScriptCalls(executor.driver)
			    expect(handleCalls.length).toBe(0)
			
			    await syncAllPendingWindows()
			
			    await executor.driver.switchTo().window(variables.get('new'))
			    handleCalls = (await getPageScriptCalls(executor.driver)).handleCalls
			
			    expect(handleCalls.length).toBe(1)
			    expect(handleCalls[0].sessionId).toBe('default')
			    expect(handleCalls[0].windowHandle).toBe('new')
			  \})
			
			  it('should syncronize a new window with the recorder through hooks', async () => \{
			    const test = \{
			      id: 1,
			      commands: [
			        \{
			          command: 'open',
			          target: '/windows.html',
			          value: '',
			        \},
			      ],
			    \}
			    await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			    const \{
			      hooks: \{ onWindowAppeared, onWindowSwitched \},
			    \} = createRecorderSyncronizerForWebdriverExecutor(\{
			      sessionId: 'default',
			      executor,
			    \})
			    const playback = new Playback(\{
			      executor,
			      variables,
			      baseUrl: \`http://localhost:\$\{port\}/\`,
			    \})
			    // eslint-disable-next-line require-atomic-updates
			    executor.hooks = \{
			      onWindowAppeared,
			      onWindowSwitched: async (...args) => \{
			        await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			        return onWindowSwitched(...args)
			      \},
			    \}
			    await (await playback.play(test))()
			    await executor.driver.executeScript(PAGE_SCRIPT_MOCK_JS)
			
			    const \{ contextCalls \} = await getPageScriptCalls(executor.driver)
			
			    expect(contextCalls.length).toBe(1)
			    expect(contextCalls[0].sessionId).toBe('default')
			  \})
			\})
			
			async function getPageScriptCalls(driver) \{
			  return await driver.executeScript(
			    'return \{handleCalls: window.__side.handleCalls, contextCalls: window.__side.contextCalls\}'
			  )
			\}
			
			const PAGE_SCRIPT_MOCK_JS = \`window.__side = \{
			handleCalls: [],
			contextCalls: [],
			setWindowHandle: async (handle, sessionId) => \{
			window.__side.handleCalls.push(\{windowHandle: handle, sessionId\})
			return Promise.resolve()
			\},
			setActiveContext: async sessionId => \{
			window.__side.contextCalls.push(\{sessionId\})
			return Promise.resolve()
			\},
			\}\`
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\integration\\recording-syncronizer-webdriver.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback-tree\\command-leveler.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ ControlFlowCommandNames \} from '../../src/playback-tree/commands'
			import \{ deriveCommandLevels \} from '../../src/playback-tree/command-leveler'
			
			function createCommand(command) \{
			  return \{
			    command,
			    target: '',
			    value: '',
			  \}
			\}
			
			describe('Control Flow', () => \{
			  describe('Preprocess', () => \{
			    describe('Leveling', () => \{
			      test('returns leveled command stack', () => \{
			        let stack = deriveCommandLevels([
			          createCommand(ControlFlowCommandNames.if),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand(ControlFlowCommandNames.while),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand(ControlFlowCommandNames.do),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.while),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand(ControlFlowCommandNames.repeatIf),
			          createCommand(ControlFlowCommandNames.forEach),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand(ControlFlowCommandNames.end),
			        ])
			        expect(stack[0]).toEqual(0) //  if
			        expect(stack[1]).toEqual(1) //    command
			        expect(stack[2]).toEqual(0) //  else
			        expect(stack[3]).toEqual(1) //    while
			        expect(stack[4]).toEqual(2) //      command
			        expect(stack[5]).toEqual(1) //    end
			        expect(stack[6]).toEqual(1) //    do
			        expect(stack[7]).toEqual(2) //      command
			        expect(stack[8]).toEqual(2) //      while
			        expect(stack[9]).toEqual(3) //        command
			        expect(stack[10]).toEqual(2) //     end
			        expect(stack[11]).toEqual(1) //   repeatIf
			        expect(stack[12]).toEqual(1) //   forEach
			        expect(stack[13]).toEqual(1) //   end
			        expect(stack[14]).toEqual(0) //  end
			      \})
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback-tree\\command-leveler.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback-tree\\command-node.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ ControlFlowCommandNames \} from '../../src/playback-tree/commands'
			import \{ CommandNode \} from '../../src/playback-tree/command-node'
			import Variables from '../../src/Variables'
			
			describe('Command Node', () => \{
			  let variables
			  beforeEach(() => \{
			    variables = new Variables()
			  \})
			  it('control flow check returns correct result', () => \{
			    let node = new CommandNode(undefined)
			    node.right = 'asdf'
			    expect(node.isControlFlow()).toBeTruthy()
			    node.left = undefined
			    node.right = 'asdf'
			    expect(node.isControlFlow()).toBeTruthy()
			  \})
			  it('retry limit defaults to 1000', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.times,
			      target: '',
			      value: '',
			    \}
			    const node = new CommandNode(command)
			    node.timesVisited = 999
			    expect(node._isRetryLimit()).toBeFalsy()
			    node.timesVisited = 1000
			    expect(node._isRetryLimit()).toBeTruthy()
			  \})
			  it('retry limit can be overriden', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.repeatIf,
			      target: '',
			      value: 5,
			    \}
			    const node = new CommandNode(command)
			    node.timesVisited = 5
			    expect(node._isRetryLimit()).toBeTruthy()
			  \})
			  it('forEach fetches count from preset variable', () => \{
			    const collectionName = 'blah'
			    variables.set(collectionName, [
			      \{ a: 'a1', b: 'b1' \},
			      \{ a: 'a2', b: 'b2' \},
			    ])
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: collectionName,
			      value: 'iteratorVar',
			    \}
			    const node = new CommandNode(command)
			    expect(node.evaluateForEach(variables)).toEqual(true)
			  \})
			  it('forEach errors without a valid variable', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: 'asdf',
			      value: '',
			    \}
			    const node = new CommandNode(command)
			    node.evaluateForEach(variables).then(result => \{
			      expect(result.result).toEqual('Invalid variable provided.')
			    \})
			  \})
			  it('forEach stores iterated collection entry on a variable using the provided name', () => \{
			    const collectionName = 'asdf'
			    variables.set(collectionName, [
			      \{ a: 'a1', b: 'b1' \},
			      \{ a: 'a2', b: 'b2' \},
			    ])
			    const command = \{
			      command: ControlFlowCommandNames.forEach,
			      target: collectionName,
			      value: 'iteratorVar',
			    \}
			    const node = new CommandNode(command)
			    node.evaluateForEach(variables)
			    expect(variables.get('iteratorVar')).toEqual(\{ a: 'a1', b: 'b1' \})
			  \})
			  it('forEach resets timesVisited after completing', () => \{
			    const collection = \{ name: 'asdf', value: [\{ a: 'a' \}, \{ b: 'b' \}] \}
			    variables.set(collection.name, collection.value)
			    const node = new CommandNode(\{
			      command: ControlFlowCommandNames.forEach,
			      target: collection.name,
			      value: 'iteratorVar',
			    \})
			    node.timesVisited = collection.value.length + 1
			    node.evaluateForEach(variables)
			    expect(node.timesVisited).toEqual(-1)
			  \})
			  it('execute resolves with an error message when too many retries attempted in a loop', () => \{
			    const command = \{
			      command: ControlFlowCommandNames.while,
			      target: '',
			      value: 2,
			    \}
			    const node = new CommandNode(command)
			    node.timesVisited = 3
			    return node.execute().catch(err => \{
			      expect(err.message).toEqual(
			        'Max retry limit exceeded. To override it, specify a new limit in the value input field.'
			      )
			    \})
			  \})
			  it("evaluate resolves with an error message on 'times' when an invalid number is provided", () => \{
			    const command = \{
			      command: ControlFlowCommandNames.times,
			      target: 'asdf',
			      value: '',
			    \}
			    const node = new CommandNode(command)
			    return node._evaluate(\{ variables: new Variables() \}).catch(err => \{
			      expect(err.message).toEqual('Invalid number provided as a target.')
			    \})
			  \})
			  it('timesVisited only incremenrts for control flow commands', () => \{
			    let command = \{
			      command: ControlFlowCommandNames.times,
			      target: '',
			      value: '',
			    \}
			    let node = new CommandNode(command)
			    expect(node.timesVisited).toBe(0)
			    node._incrementTimesVisited()
			    expect(node.timesVisited).toBe(1)
			    command = \{
			      command: 'command',
			      target: '',
			      value: '',
			    \}
			    node = new CommandNode(command)
			    expect(node.timesVisited).toBe(0)
			    node._incrementTimesVisited()
			    expect(node.timesVisited).toBe(0)
			  \})
			  it("evaluationResult returns the 'right' node on true", () => \{
			    const command = \{
			      command: 'a',
			      target: '',
			      value: '',
			    \}
			    const node = new CommandNode(command)
			    node.right = 'b'
			    node.left = 'c'
			    const result = node._evaluationResult(\{ result: 'success', value: true \})
			    expect(result.next).toEqual('b')
			  \})
			  it("evaluationResult returns the 'left' node on false", () => \{
			    const command = \{
			      command: 'a',
			      target: '',
			      value: '',
			    \}
			    const node = new CommandNode(command)
			    node.right = 'b'
			    node.left = 'c'
			    const result = node._evaluationResult(\{ result: 'success', value: false \})
			    expect(result.next).toEqual('c')
			  \})
			  it("executionResult returns the 'next' node on non-controlflow commands", () => \{
			    const command = \{
			      command: 'open',
			      target: '',
			      value: '',
			    \}
			    let nodeA = new CommandNode(command)
			    const nodeB = new CommandNode(command)
			    nodeA.next = nodeB
			    expect(nodeA._executionResult().next).toEqual(nodeB)
			  \})
			  it("executionResult returns a 'next' node on control flow", () => \{
			    const command = \{
			      command: ControlFlowCommandNames.if,
			      target: '',
			      value: '',
			    \}
			    let nodeA = new CommandNode(command)
			    nodeA.left = 'asdf'
			    const nodeB = new CommandNode(command)
			    expect(
			      nodeA._executionResult(\{
			        next: nodeB,
			      \}).next
			    ).toEqual(nodeB)
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback-tree\\command-node.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback-tree\\playback-tree.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{
			  createPlaybackTree,
			  createCommandNodesFromCommandStack,
			\} from '../../src/playback-tree'
			import \{ ControlFlowCommandNames \} from '../../src/playback-tree/commands'
			
			function createCommand(command) \{
			  return \{
			    command,
			    target: '',
			    value: '',
			  \}
			\}
			
			describe('Control Flow', () => \{
			  describe('Process', () => \{
			    describe('Linked List Validation', () => \{
			      test('nodes contain command references and levels', () => \{
			        let input = [createCommand('command1'), createCommand('command2')]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].command).toEqual(input[0])
			        expect(stack[0].level).toEqual(0)
			        expect(stack[1].command).toEqual(input[1])
			        expect(stack[1].level).toEqual(0)
			      \})
			      test('command-command', () => \{
			        let input = [createCommand('command1'), createCommand('command2')]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toEqual(stack[1])
			        expect(stack[0].left).toBeUndefined()
			        expect(stack[0].right).toBeUndefined()
			        expect(stack[1].next).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        expect(stack[1].right).toBeUndefined()
			      \})
			      test('if-command-elseIf-command-else-command-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.elseIf),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        // if
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[2])
			        // command
			        expect(stack[1].next).toEqual(stack[6])
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        // elseIf
			        expect(stack[2].next).toBeUndefined()
			        expect(stack[2].right).toEqual(stack[3])
			        expect(stack[2].left).toEqual(stack[4])
			        // command
			        expect(stack[3].next).toEqual(stack[6])
			        expect(stack[3].right).toBeUndefined()
			        expect(stack[3].left).toBeUndefined()
			        // else
			        expect(stack[4].next).toEqual(stack[5])
			        expect(stack[4].right).toBeUndefined()
			        expect(stack[4].left).toBeUndefined()
			        // command
			        expect(stack[5].next).toEqual(stack[6])
			        expect(stack[5].right).toBeUndefined()
			        expect(stack[5].left).toBeUndefined()
			        // end
			        expect(stack[6].next).toBeUndefined()
			        expect(stack[6].right).toBeUndefined()
			        expect(stack[6].left).toBeUndefined()
			      \})
			      test('while-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.while),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[1])
			        expect(stack[1].next).toBeUndefined()
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			      \})
			      test('while-command-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.while),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[2])
			        expect(stack[1].next).toEqual(stack[0])
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        expect(stack[2].next).toBeUndefined()
			        expect(stack[2].right).toBeUndefined()
			        expect(stack[2].left).toBeUndefined()
			      \})
			      test('while-command-command-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.while),
			          createCommand('command'),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[3])
			        expect(stack[1].next).toEqual(stack[2])
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        expect(stack[2].next).toEqual(stack[0])
			        expect(stack[2].right).toBeUndefined()
			        expect(stack[2].left).toBeUndefined()
			        expect(stack[3].next).toBeUndefined()
			        expect(stack[3].right).toBeUndefined()
			        expect(stack[3].left).toBeUndefined()
			      \})
			      test('while-if-end-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.while), // 0
			          createCommand(ControlFlowCommandNames.if), // 1
			          createCommand('command'), // 2
			          createCommand(ControlFlowCommandNames.end), // 3
			          createCommand(ControlFlowCommandNames.end), // 4
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[4])
			        expect(stack[1].next).toBeUndefined()
			        expect(stack[1].right).toEqual(stack[2])
			        expect(stack[1].left).toEqual(stack[3])
			        expect(stack[2].next).toEqual(stack[3])
			        expect(stack[2].right).toBeUndefined()
			        expect(stack[2].left).toBeUndefined()
			        expect(stack[3].next).toEqual(stack[0])
			        expect(stack[3].right).toBeUndefined()
			        expect(stack[3].left).toBeUndefined()
			        expect(stack[4].next).toBeUndefined()
			        expect(stack[4].right).toBeUndefined()
			        expect(stack[4].left).toBeUndefined()
			      \})
			      test('while-if-end-command-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.while), // 0
			          createCommand(ControlFlowCommandNames.if), // 1
			          createCommand('command'), // 2
			          createCommand(ControlFlowCommandNames.end), // 3
			          createCommand('command'), // 4
			          createCommand(ControlFlowCommandNames.end), // 5
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[5])
			        expect(stack[1].next).toBeUndefined()
			        expect(stack[1].right).toEqual(stack[2])
			        expect(stack[1].left).toEqual(stack[3])
			        expect(stack[2].next).toEqual(stack[3])
			        expect(stack[2].right).toBeUndefined()
			        expect(stack[2].left).toBeUndefined()
			        expect(stack[3].next).toEqual(stack[4])
			        expect(stack[3].right).toBeUndefined()
			        expect(stack[3].left).toBeUndefined()
			        expect(stack[4].next).toEqual(stack[0])
			        expect(stack[4].right).toBeUndefined()
			        expect(stack[4].left).toBeUndefined()
			        expect(stack[5].next).toBeUndefined()
			        expect(stack[5].right).toBeUndefined()
			        expect(stack[5].left).toBeUndefined()
			      \})
			      test('if-command-while-command-end-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.while),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        // if
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[5])
			        // command
			        expect(stack[1].next).toEqual(stack[2])
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        // while
			        expect(stack[2].next).toBeUndefined()
			        expect(stack[2].right).toEqual(stack[3])
			        expect(stack[2].left).toEqual(stack[4])
			        // command
			        expect(stack[3].next).toEqual(stack[2])
			        expect(stack[3].right).toBeUndefined()
			        expect(stack[3].left).toBeUndefined()
			        // end
			        expect(stack[4].next).toEqual(stack[5])
			        expect(stack[4].right).toBeUndefined()
			        expect(stack[4].left).toBeUndefined()
			        // end
			        expect(stack[5].next).toBeUndefined()
			        expect(stack[5].right).toBeUndefined()
			        expect(stack[5].left).toBeUndefined()
			      \})
			      test('if-while-command-end-command-else-command-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.while),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        // if
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[5])
			        // while
			        expect(stack[1].next).toBeUndefined()
			        expect(stack[1].right).toEqual(stack[2])
			        expect(stack[1].left).toEqual(stack[3])
			        // command
			        expect(stack[2].next).toEqual(stack[1])
			        expect(stack[2].right).toBeUndefined()
			        expect(stack[2].left).toBeUndefined()
			        // end
			        expect(stack[3].next).toEqual(stack[4])
			        expect(stack[3].right).toBeUndefined()
			        expect(stack[3].left).toBeUndefined()
			        // command
			        expect(stack[4].next).toEqual(stack[7])
			        expect(stack[4].right).toBeUndefined()
			        expect(stack[4].left).toBeUndefined()
			        // else
			        expect(stack[5].next).toEqual(stack[6])
			        expect(stack[5].right).toBeUndefined()
			        expect(stack[5].left).toBeUndefined()
			        // command
			        expect(stack[6].next).toEqual(stack[7])
			        expect(stack[6].right).toBeUndefined()
			        expect(stack[6].left).toBeUndefined()
			        // end
			        expect(stack[7].next).toBeUndefined()
			        expect(stack[7].right).toBeUndefined()
			        expect(stack[7].left).toBeUndefined()
			      \})
			      test('do-command-repeatIf-command', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.do),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.repeatIf),
			          createCommand('command'),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toEqual(stack[1])
			        expect(stack[0].right).toBeUndefined()
			        expect(stack[0].left).toBeUndefined()
			        expect(stack[1].next).toEqual(stack[2])
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        expect(stack[2].next).toBeUndefined()
			        expect(stack[2].right).toEqual(stack[0])
			        expect(stack[2].left).toEqual(stack[3])
			      \})
			      test('do-command-while-command-end-repeatIf', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.do),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.while),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand(ControlFlowCommandNames.repeatIf),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toEqual(stack[1])
			        expect(stack[0].right).toBeUndefined()
			        expect(stack[0].left).toBeUndefined()
			        expect(stack[1].next).toEqual(stack[2])
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        expect(stack[2].next).toBeUndefined()
			        expect(stack[2].right).toEqual(stack[3])
			        expect(stack[2].left).toEqual(stack[4])
			        expect(stack[3].next).toEqual(stack[2])
			        expect(stack[3].right).toBeUndefined()
			        expect(stack[3].left).toBeUndefined()
			        expect(stack[4].next).toEqual(stack[5])
			        expect(stack[4].right).toBeUndefined()
			        expect(stack[4].left).toBeUndefined()
			        expect(stack[5].next).toBeUndefined()
			        expect(stack[5].right).toEqual(stack[0])
			        expect(stack[5].left).toBeUndefined()
			      \})
			      test('times-command-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.times),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[2])
			        expect(stack[1].next).toEqual(stack[0])
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        expect(stack[2].next).toBeUndefined()
			        expect(stack[2].right).toBeUndefined()
			        expect(stack[2].left).toBeUndefined()
			      \})
			      test('forEach-command-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.forEach),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[2])
			        expect(stack[1].next).toEqual(stack[0])
			        expect(stack[1].right).toBeUndefined()
			        expect(stack[1].left).toBeUndefined()
			        expect(stack[2].next).toBeUndefined()
			        expect(stack[2].right).toBeUndefined()
			        expect(stack[2].left).toBeUndefined()
			      \})
			      test('if-if-if-if-end-end-end-command-end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand('command'),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        let stack = createCommandNodesFromCommandStack(input)
			        expect(stack[0].next).toBeUndefined()
			        expect(stack[0].right).toEqual(stack[1])
			        expect(stack[0].left).toEqual(stack[8])
			        expect(stack[1].next).toBeUndefined()
			        expect(stack[1].right).toEqual(stack[2])
			        expect(stack[1].left).toEqual(stack[6])
			        expect(stack[2].next).toBeUndefined()
			        expect(stack[2].right).toEqual(stack[3])
			        expect(stack[2].left).toEqual(stack[5])
			        expect(stack[3].next).toBeUndefined()
			        expect(stack[3].right).toEqual(stack[4])
			        expect(stack[3].left).toEqual(stack[4])
			        expect(stack[4].next).toEqual(stack[5])
			        expect(stack[4].right).toBeUndefined()
			        expect(stack[4].left).toBeUndefined()
			        expect(stack[5].next).toEqual(stack[6])
			        expect(stack[5].right).toBeUndefined()
			        expect(stack[5].left).toBeUndefined()
			        expect(stack[6].next).toEqual(stack[7])
			        expect(stack[6].right).toBeUndefined()
			        expect(stack[6].left).toBeUndefined()
			        expect(stack[7].next).toEqual(stack[8])
			        expect(stack[7].right).toBeUndefined()
			        expect(stack[7].left).toBeUndefined()
			        expect(stack[8].next).toBeUndefined()
			        expect(stack[8].right).toBeUndefined()
			        expect(stack[8].left).toBeUndefined()
			      \})
			    \})
			  \})
			  describe('Processed', () => \{
			    it('knows if there are control flow commands within the command stack', () => \{
			      let input = [
			        createCommand(ControlFlowCommandNames.do),
			        createCommand('command'),
			        createCommand(ControlFlowCommandNames.repeatIf),
			      ]
			      const tree = createPlaybackTree(input)
			      expect(tree.containsControlFlow).toBeTruthy()
			    \})
			    it('do-command-repeatIf-end skips do', () => \{
			      let input = [
			        createCommand(ControlFlowCommandNames.do),
			        createCommand('command'),
			        createCommand(ControlFlowCommandNames.repeatIf),
			      ]
			      let tree = createPlaybackTree(input)
			      expect(tree.startingCommandNode.command).toEqual(input[0])
			      expect(tree.startingCommandNode.next.command).toEqual(input[1])
			      expect(tree.startingCommandNode.next.next.command).toEqual(input[2])
			      expect(tree.startingCommandNode.next.next.right.command).toEqual(input[0])
			      expect(tree.startingCommandNode.next.next.left).toBeUndefined()
			    \})
			    it('populated tree exists with correct values', () => \{
			      let input = [
			        createCommand(ControlFlowCommandNames.if),
			        createCommand('command'),
			        createCommand(ControlFlowCommandNames.else),
			        createCommand(ControlFlowCommandNames.while),
			        createCommand('command'),
			        createCommand(ControlFlowCommandNames.end),
			        createCommand(ControlFlowCommandNames.do),
			        createCommand('command'),
			        createCommand(ControlFlowCommandNames.while),
			        createCommand('command'),
			        createCommand(ControlFlowCommandNames.end),
			        createCommand(ControlFlowCommandNames.repeatIf),
			        createCommand(ControlFlowCommandNames.end),
			      ]
			      let tree = createPlaybackTree(input)
			      expect(tree.startingCommandNode.command).toEqual(input[0]) //                                                  if
			      expect(tree.startingCommandNode.right.command).toEqual(input[1]) //                                            if -> command
			      expect(tree.startingCommandNode.right.next.command).toEqual(input[12]) //                                      if -> end
			      expect(tree.startingCommandNode.left.command).toEqual(input[2]) //                                             if -> while -> else
			      expect(tree.startingCommandNode.left.next.right.command).toEqual(input[4]) //                                  while -> command
			      expect(tree.startingCommandNode.left.next.left.command).toEqual(input[5]) //                                   while -> end
			      expect(tree.startingCommandNode.left.next.left.next.command).toEqual(
			        input[6]
			      ) //                              do
			      expect(
			        tree.startingCommandNode.left.next.left.next.next.next.right.command
			      ).toEqual(input[9]) //              do -> while -> command
			      expect(
			        tree.startingCommandNode.left.next.left.next.next.next.left.command
			      ).toEqual(input[10]) //              do -> while -> end
			      expect(
			        tree.startingCommandNode.left.next.left.next.next.next.left.next.right
			          .command
			      ).toEqual(input[6]) //    repeatIf -> do
			      expect(
			        tree.startingCommandNode.left.next.left.next.next.next.left.next.left
			          .command
			      ).toEqual(input[12]) //    repeatIf -> end
			      expect(
			        tree.startingCommandNode.left.next.left.next.next.next.left.next.left
			          .next
			      ).toBeUndefined() //          end
			      expect(
			        tree.startingCommandNode.left.next.left.next.next.next.left.next.left
			          .right
			      ).toBeUndefined() //         end
			      expect(
			        tree.startingCommandNode.left.next.left.next.next.next.left.next.left
			          .left
			      ).toBeUndefined() //          end
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback-tree\\playback-tree.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(18)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback-tree\\syntax-validation.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ validateControlFlowSyntax \} from '../../src/playback-tree/syntax-validation'
			import \{ ControlFlowCommandNames \} from '../../src/playback-tree/commands'
			
			function createCommand(command) \{
			  return \{
			    command,
			    target: '',
			    value: '',
			  \}
			\}
			
			describe('Control Flow', () => \{
			  describe('Preprocess', () => \{
			    describe('Syntax Validation', () => \{
			      test('if, end', () => \{
			        let result = validateControlFlowSyntax([
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.end),
			        ])
			        expect(result).toBeTruthy()
			      \})
			      test('if, else, end', () => \{
			        let result = validateControlFlowSyntax([
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand(ControlFlowCommandNames.end),
			        ])
			        expect(result).toBeTruthy()
			      \})
			      test('if, elseIf, end', () => \{
			        let result = validateControlFlowSyntax([
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.elseIf),
			          createCommand(ControlFlowCommandNames.end),
			        ])
			        expect(result).toBeTruthy()
			      \})
			      test('if, elseIf, else, end', () => \{
			        let result = validateControlFlowSyntax([
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.elseIf),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand(ControlFlowCommandNames.end),
			        ])
			        expect(result).toBeTruthy()
			      \})
			      test('while, end', () => \{
			        let result = new validateControlFlowSyntax([
			          createCommand(ControlFlowCommandNames.while),
			          createCommand(ControlFlowCommandNames.end),
			        ])
			        expect(result).toBeTruthy()
			      \})
			      test('times, end', () => \{
			        let result = validateControlFlowSyntax([
			          createCommand('times'),
			          createCommand(ControlFlowCommandNames.end),
			        ])
			        expect(result).toBeTruthy()
			      \})
			      test('do, repeatIf', () => \{
			        let result = validateControlFlowSyntax([
			          createCommand(ControlFlowCommandNames.do),
			          createCommand(ControlFlowCommandNames.repeatIf),
			        ])
			        expect(result).toBeTruthy()
			      \})
			      test('do, while, end, repeatIf', () => \{
			        let result = validateControlFlowSyntax([
			          createCommand(ControlFlowCommandNames.do),
			          createCommand(ControlFlowCommandNames.while),
			          createCommand(ControlFlowCommandNames.end),
			          createCommand(ControlFlowCommandNames.repeatIf),
			        ])
			        expect(result).toBeTruthy()
			      \})
			    \})
			    describe('Syntax Invalidation', () => \{
			      test('if', () => \{
			        let input = [createCommand(ControlFlowCommandNames.if)]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Incomplete block at if')
			      \})
			      test('if, if, end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Incomplete block at if')
			      \})
			      test('if, else, elseIf, end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand(ControlFlowCommandNames.elseIf),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Incorrect command order of else if / else')
			      \})
			      test('if, else, else, end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Too many else commands used')
			      \})
			      test('else', () => \{
			        let input = [createCommand(ControlFlowCommandNames.else)]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('An else used outside of an if block')
			      \})
			      test('else, else', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.else),
			          createCommand(ControlFlowCommandNames.else),
			        ]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('An else used outside of an if block')
			      \})
			      test('elseIf', () => \{
			        let input = [createCommand(ControlFlowCommandNames.elseIf)]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('An else if used outside of an if block')
			      \})
			      test('while', () => \{
			        let input = [createCommand(ControlFlowCommandNames.while)]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Incomplete block at while')
			      \})
			      test('if, while', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.while),
			        ]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Incomplete block at while')
			      \})
			      test('if, while, end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.while),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Incomplete block at if')
			      \})
			      test('if, while, else, end', () => \{
			        let input = [
			          createCommand(ControlFlowCommandNames.if),
			          createCommand(ControlFlowCommandNames.while),
			          createCommand(ControlFlowCommandNames.else),
			          createCommand(ControlFlowCommandNames.end),
			        ]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('An else used outside of an if block')
			      \})
			      test('times', () => \{
			        let input = [createCommand('times')]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Incomplete block at times')
			      \})
			      test('forEach', () => \{
			        let input = [createCommand(ControlFlowCommandNames.forEach)]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow(\`Incomplete block at \$\{ControlFlowCommandNames.forEach\}\`)
			      \})
			      test('repeatIf', () => \{
			        let input = [createCommand(ControlFlowCommandNames.repeatIf)]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('A repeat if used without a do block')
			      \})
			      test('do', () => \{
			        let input = [createCommand(ControlFlowCommandNames.do)]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Incomplete block at do')
			      \})
			      test('end', () => \{
			        let input = [createCommand(ControlFlowCommandNames.end)]
			        expect(function() \{
			          validateControlFlowSyntax(input)
			        \}).toThrow('Use of end without an opening keyword')
			      \})
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback-tree\\syntax-validation.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(24)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import Playback, \{
			  PlaybackEvents,
			  PlaybackStates,
			  CommandStates,
			  CallstackChange,
			\} from '../src/playback'
			import \{ AssertionError, VerificationError \} from '../src/errors'
			import FakeExecutor from './util/FakeExecutor'
			import Variables from '../src/Variables'
			
			describe('Playback', () => \{
			  describe('Event emitting', () => \{
			    describe('Control Flow', () => \{
			      it('forEach', async () => \{
			        const test = \{
			          id: 1,
			          commands: [
			            \{
			              id: 'asdf0',
			              command: 'forEach',
			              target: 'collectionVarName',
			              value: 'iteratorVarName',
			            \},
			            \{
			              id: 'asdf1',
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			            \{
			              id: 'asdf2',
			              command: 'end',
			              target: '',
			              value: '',
			            \},
			          ],
			        \}
			        const executor = new FakeExecutor(\{\})
			        executor.doOpen = jest.fn(async () => \{\})
			        const variables = new Variables()
			        variables.set('collectionVarName', ['a', 'b', 'c'])
			        const playback = new Playback(\{
			          executor,
			          variables,
			        \})
			        const cb = jest.fn()
			        playback.on(PlaybackEvents.CONTROL_FLOW_CHANGED, cb)
			        await (await playback.play(test))().catch(() => \{\})
			        const results = flat(cb.mock.calls)
			        expect(results).toMatchSnapshot()
			      \})
			    \})
			  \})
			  describe('Playback test queue', () => \{
			    it('should play a test', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      await (await playback.play(test))()
			      expect(executor.doOpen).toHaveBeenCalledTimes(3)
			    \})
			
			    it('should play a test twice', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      await (await playback.play(test))()
			      await (await playback.play(test))()
			      expect(executor.doOpen).toHaveBeenCalledTimes(6)
			    \})
			
			    it("should throw if trying to run a test when a driver isn't initialized", async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect.assertions(1)
			      await (await playback.play(test))()
			      executor.cleanup()
			      try \{
			        await (await playback.play(test))()
			      \} catch (err) \{
			        expect(err.message).toBe('executor is dead')
			      \}
			    \})
			
			    it('should throw if trying to play while a test is running', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      await playback.play(test)
			      expect.assertions(1)
			      try \{
			        await (await playback.play(test))()
			      \} catch (err) \{
			        expect(err.message).toBe(
			          "Can't start playback while a different playback is running"
			        )
			      \}
			    \})
			
			    it("should not throw an uncought error if finish wasn't called", () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'error',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      playback.play(test)
			      return psetTimeout(2)
			    \})
			
			    it('should fail to play a test with an unknown command', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'fail',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect.assertions(1)
			      try \{
			        await (await playback.play(test))()
			      \} catch (err) \{
			        expect(err.message).toBe('Unknown command fail')
			      \}
			    \})
			
			    it('should pass a test with a failing verify', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'verifyText',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doVerifyText = jest.fn(async () => \{
			        throw new VerificationError('failed to verify')
			      \})
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect(async () => await (await playback.play(test))()).not.toThrow()
			    \})
			
			    it('should play a single command', async () => \{
			      const command = \{
			        command: 'open',
			        target: '',
			        value: '',
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      await playback.playSingleCommand(command)
			      expect(executor.doOpen).toHaveBeenCalledTimes(1)
			    \})
			
			    it('should play a single command twice', async () => \{
			      const command = \{
			        command: 'open',
			        target: '',
			        value: '',
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      await playback.playSingleCommand(command)
			      await playback.playSingleCommand(command)
			      expect(executor.doOpen).toHaveBeenCalledTimes(2)
			    \})
			
			    it('should not be able to play a single command twice at the same time', async () => \{
			      const command = \{
			        command: 'open',
			        target: '',
			        value: '',
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => psetTimeout(1))
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect.assertions(1)
			      playback.playSingleCommand(command)
			      try \{
			        await playback.playSingleCommand(command)
			      \} catch (err) \{
			        expect(err.message).toBe(
			          "Can't play a command while playback is running"
			        )
			      \}
			    \})
			
			    it('should play a single command while a test case is paused and then continue', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => psetTimeout(5))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const playPromise = await playback.play(test)
			      await psetTimeout(7)
			      await playback.pause()
			      await playback.playSingleCommand(\{
			        command: 'open',
			        target: '',
			        value: '',
			      \})
			      await playback.resume()
			      await playPromise()
			      expect(executor.doOpen).toHaveBeenCalledTimes(4)
			    \})
			
			    it('should not be able to play a single command while a test case is playing', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => psetTimeout(1))
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect.assertions(1)
			      await playback.play(test)
			
			      try \{
			        await playback.playSingleCommand(\{
			          command: 'open',
			          target: '',
			          value: '',
			        \})
			      \} catch (err) \{
			        expect(err.message).toBe(
			          "Can't play a command while playback is running"
			        )
			      \}
			    \})
			
			    it('should play a nested test case', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'run',
			            target: 'test2',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			
			      const test2 = \{
			        id: 2,
			        commands: [
			          \{
			            id: 4,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 5,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 6,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(0))
			      const playback = new Playback(\{
			        executor,
			        getTestByName: () => test2,
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.CALL_STACK_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      await (await playback.play(test))()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(2)
			      expect(results[0].change).toBe(CallstackChange.CALLED)
			      expect(results[1].change).toBe(CallstackChange.UNWINDED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			
			    it("should fail to execute a nested test without providing 'getTestByName'", async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'run',
			            target: 'test2',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(0))
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect.assertions(1)
			      try \{
			        await (await playback.play(test))()
			      \} catch (err) \{
			        expect(err.message).toBe("'run' command is not supported")
			      \}
			    \})
			
			    it("should fail to execute a nested test if the test doesn't exist", async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'run',
			            target: 'test2',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(0))
			      const playback = new Playback(\{
			        executor,
			        getTestByName: () => undefined,
			      \})
			      expect.assertions(1)
			      try \{
			        await (await playback.play(test))()
			      \} catch (err) \{
			        expect(err.message).toBe("Can't run unknown test: test2")
			      \}
			    \})
			    it('should play a test step by step', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => psetTimeout(0))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const playPromise = await playback.play(test, \{ pauseImmediately: true \})
			      expect(executor.doOpen).toHaveBeenCalledTimes(0)
			      await psetTimeout(1)
			      await playback.step()
			      expect(executor.doOpen).toHaveBeenCalledTimes(1)
			      await playback.step(2)
			      expect(executor.doOpen).toHaveBeenCalledTimes(3)
			      await playback.resume()
			      await playPromise()
			      expect(executor.doOpen).toHaveBeenCalledTimes(3)
			    \})
			
			    it('should reject step if one of the steps failed', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'fail',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => psetTimeout(0))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const playPromise = await playback.play(test, \{ pauseImmediately: true \})
			      playPromise().catch(() => \{\})
			      await psetTimeout(1)
			      await playback.step()
			      expect.assertions(2)
			      expect(executor.doOpen).toHaveBeenCalledTimes(1)
			      try \{
			        await playback.step(2)
			      \} catch (err) \{
			        expect(err.message).toBe('Playback stopped prematurely')
			      \}
			      await playPromise()
			    \})
			  \})
			
			  describe('play to and from', () => \{
			    it('should play to a point and continue to the end', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      const playPromise = await playback.playTo(test, test.commands[2])
			      expect(executor.doOpen).toHaveBeenCalledTimes(2)
			      await playback.resume()
			      await playPromise()
			      expect(executor.doOpen).toHaveBeenCalledTimes(3)
			    \})
			    it('should fail to play to a point that does not exist in the test', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect.assertions(1)
			      try \{
			        await playback.playTo(test, \{\})
			      \} catch (err) \{
			        expect(err.message).toBe('Command not found in test')
			      \}
			    \})
			    it('should replay a command when in a control flow loop', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'forEach',
			            target: 'collectionVarName',
			            value: 'iteratorVarName',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'end',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const variables = new Variables()
			      variables.set('collectionVarName', [0, 1, 2])
			      const playback = new Playback(\{
			        executor,
			        variables,
			      \})
			      const playPromise = await playback.playFrom(test, test.commands[0])
			      await playPromise()
			      expect(executor.doOpen).toHaveBeenCalledTimes(3)
			    \})
			    it('should fail to play to an unreachable point', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'if',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'end',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      executor.evaluateConditional = jest.fn(async () => false)
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect.assertions(1)
			      try \{
			        await playback.playTo(test, test.commands[2])
			      \} catch (err) \{
			        expect(err.message).toBe(
			          "Playback finished before reaching the requested command, check to make sure control flow isn't preventing this"
			        )
			      \}
			    \})
			    it('should play from a point', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      const playPromise = await playback.playFrom(test, test.commands[1])
			      await playPromise()
			      expect(executor.doOpen).toHaveBeenCalledTimes(2)
			    \})
			    it('should play to a command from a command', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: 't1',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: 't2',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: 't3',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: 't4',
			            value: '',
			          \},
			        ],
			      \}
			
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      await playback.playTo(test, test.commands[2], test.commands[1])
			      expect(executor.doOpen).toHaveBeenCalledTimes(1)
			      expect(executor.doOpen).toHaveBeenCalledWith('t2', '', test.commands[1])
			    \})
			    it('should fail to play to a point that exists, from a point that does not exist in the test', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      expect.assertions(1)
			      try \{
			        await playback.playTo(test, test.commands[0], \{\})
			      \} catch (err) \{
			        expect(err.message).toBe('Command to start from not found in test')
			      \}
			    \})
			  \})
			
			  describe('resume', () => \{
			    it('should resume a paused test', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			      playbackPromise().catch(() => \{\})
			
			      await psetTimeout(15)
			      await playback.pause()
			      await psetTimeout(15)
			      await playback.resume()
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(5)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.PAUSED)
			      expect(results[3].state).toBe(PlaybackStates.PLAYING)
			      expect(results[4].state).toBe(PlaybackStates.FINISHED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			
			    it("resume is a no-op if test isn't paused", async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(0))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const playbackPromise = await playback.play(test)
			      expect(() => playback.resume()).not.toThrow()
			
			      await playbackPromise().catch(() => \{\})
			    \})
			
			    it('resume after hitting a breakpoint', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			            isBreakpoint: true,
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			
			      await psetTimeout(15)
			      await playback.resume()
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(5)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.BREAKPOINT)
			      expect(results[3].state).toBe(PlaybackStates.PLAYING)
			      expect(results[4].state).toBe(PlaybackStates.FINISHED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			  \})
			
			  describe('stop', () => \{
			    it('should stop a test', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			
			      await psetTimeout(15)
			      await playback.stop()
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(3)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.STOPPED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			
			    it('should stop a paused test', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			
			      await psetTimeout(15)
			      await playback.pause()
			      await psetTimeout(15)
			      await playback.stop()
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(4)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.PAUSED)
			      expect(results[3].state).toBe(PlaybackStates.STOPPED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			  \})
			
			  describe('abort', () => \{
			    it('should abort a test', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			
			      await psetTimeout(15)
			      await playback.abort()
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(3)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.ABORTED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			
			    it('should abort a test after attempting to stop', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			      playbackPromise().catch(err => \{
			        expect(err.message).toBe('playback is dead')
			      \})
			
			      await psetTimeout(15)
			      playback.stop()
			      await psetTimeout(2)
			      await playback.abort()
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(3)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.ABORTED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			
			    it('should abort a paused test', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			      playbackPromise().catch(err => \{
			        expect(err.message).toBe('playback is dead')
			      \})
			
			      await psetTimeout(15)
			      await playback.pause()
			      await psetTimeout(15)
			      await playback.abort()
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(4)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.PAUSED)
			      expect(results[3].state).toBe(PlaybackStates.ABORTED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			  \})
			
			  describe('pause on exceptions', () => \{
			    it('should pause until the command is fixed', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{
			        throw new Error('error')
			      \})
			      const playback = new Playback(\{
			        executor,
			        options: \{
			          pauseOnExceptions: true,
			        \},
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			      playbackPromise().catch(() => \{\})
			
			      await psetTimeout(5)
			      await playback.resume()
			      await psetTimeout(5)
			      executor.doOpen.mockImplementation(async () => \{\})
			      await playback.resume()
			      await psetTimeout(100)
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(7)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.BREAKPOINT)
			      expect(results[3].state).toBe(PlaybackStates.PLAYING)
			      expect(results[4].state).toBe(PlaybackStates.BREAKPOINT)
			      expect(results[5].state).toBe(PlaybackStates.PLAYING)
			      expect(results[6].state).toBe(PlaybackStates.FINISHED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			
			    it('should pause for every type of error', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'verify',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'assert',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{
			        throw new Error('error')
			      \})
			      executor.doVerify = jest.fn(async () => \{
			        throw new VerificationError('error in verify')
			      \})
			      executor.doAssert = jest.fn(async () => \{
			        throw new AssertionError('error in assert')
			      \})
			      const playback = new Playback(\{
			        executor,
			        options: \{
			          pauseOnExceptions: true,
			        \},
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			      playbackPromise().catch(() => \{\})
			
			      await psetTimeout(5)
			      executor.doOpen.mockImplementation(async () => \{\})
			      await playback.resume()
			      await psetTimeout(5)
			      executor.doVerify.mockImplementation(async () => \{\})
			      await playback.resume()
			      await psetTimeout(5)
			      executor.doAssert.mockImplementation(async () => \{\})
			      await psetTimeout(5)
			      await playback.resume()
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(9)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.BREAKPOINT)
			      expect(results[3].state).toBe(PlaybackStates.PLAYING)
			      expect(results[4].state).toBe(PlaybackStates.BREAKPOINT)
			      expect(results[5].state).toBe(PlaybackStates.PLAYING)
			      expect(results[6].state).toBe(PlaybackStates.BREAKPOINT)
			      expect(results[7].state).toBe(PlaybackStates.PLAYING)
			      expect(results[8].state).toBe(PlaybackStates.FINISHED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			  \})
			
			  describe('ignore breakpoints', () => \{
			    it('should ignore breakpoints', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			            isBreakpoint: true,
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(1))
			      const playback = new Playback(\{
			        executor,
			        options: \{
			          ignoreBreakpoints: true,
			        \},
			      \})
			      const cb = jest.fn()
			      playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      const playbackPromise = await playback.play(test)
			
			      await playbackPromise()
			
			      const results = flat(cb.mock.calls)
			      expect(results.length).toBe(3)
			      expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			      expect(results[1].state).toBe(PlaybackStates.PLAYING)
			      expect(results[2].state).toBe(PlaybackStates.FINISHED)
			
			      expect(commandResults).toMatchSnapshot()
			    \})
			  \})
			
			  describe('delay between commands', () => \{
			    it('should delay between commands', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			        options: \{
			          delay: 5,
			        \},
			      \})
			      const d = new Date()
			      const playbackPromise = await playback.play(test)
			      await playbackPromise()
			      expect(new Date() - d).toBeGreaterThan(10)
			    \})
			
			    it('should be able to pause mid-delay', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			        options: \{
			          delay: 500,
			        \},
			      \})
			      const d = new Date()
			      await playback.play(test)
			      await psetTimeout(2)
			      await playback.pause()
			
			      expect(new Date() - d).toBeLessThan(30)
			    \})
			
			    it('should be able to stop mid-delay', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			        options: \{
			          delay: 500,
			        \},
			      \})
			      const d = new Date()
			      await playback.play(test)
			      await psetTimeout(2)
			      await playback.stop()
			
			      expect(new Date() - d).toBeLessThan(30)
			    \})
			
			    it('should be able to abort mid-delay', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			        options: \{
			          delay: 500,
			        \},
			      \})
			      const d = new Date()
			      const playbackPromise = await playback.play(test)
			      playbackPromise().catch(err => \{
			        expect(err.message).toBe('playback is dead')
			      \})
			      await psetTimeout(2)
			      await playback.abort()
			
			      expect(new Date() - d).toBeLessThan(30)
			    \})
			  \})
			
			  describe('skip', () => \{
			    it('should skip a command', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			            skip: true,
			          \},
			          \{
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      await (await playback.play(test))()
			      expect(executor.doOpen).toHaveBeenCalledTimes(2)
			    \})
			    it('should send a skipped status for skipped commands', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			            skip: true,
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      await (await playback.play(test))()
			
			      expect(commandResults[3].state).toBe(CommandStates.SKIPPED)
			    \})
			    it('should skip when playing single command', async () => \{
			      const command = \{
			        command: 'open',
			        target: '',
			        value: '',
			        skip: true,
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(async () => \{\})
			      const playback = new Playback(\{
			        executor,
			      \})
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			
			      await playback.playSingleCommand(command)
			
			      expect(executor.doOpen).toHaveBeenCalledTimes(0)
			      expect(commandResults[1].state).toBe(CommandStates.SKIPPED)
			    \})
			    it('should skip control flow commands', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'if',
			            target: '',
			            value: '',
			            skip: true,
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'end',
			            target: '',
			            value: '',
			            skip: true,
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      await (await playback.play(test))()
			
			      expect(executor.doOpen).toHaveBeenCalledTimes(1)
			      expect(commandResults[1].state).toBe(CommandStates.SKIPPED)
			      expect(commandResults[5].state).toBe(CommandStates.SKIPPED)
			    \})
			    it('should fail to play a test with invalid control flow structure due to skipping commands', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'if',
			            target: '',
			            value: '',
			            skip: true,
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'end',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			
			      expect.assertions(1)
			
			      try \{
			        await playback.play(test)
			      \} catch (err) \{
			        expect(err.message).toBe('Use of end without an opening keyword')
			      \}
			    \})
			
			    it('should fail to play a test with undetermined control flow structure due to skipping commands', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'if',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 3,
			            command: 'end',
			            target: '',
			            value: '',
			            skip: true,
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			
			      expect.assertions(1)
			
			      try \{
			        await playback.play(test)
			      \} catch (err) \{
			        expect(err.message).toBe('Incomplete block at if')
			      \}
			    \})
			
			    it('should support skipping \`run\` command', async () => \{
			      const test = \{
			        id: 1,
			        commands: [
			          \{
			            id: 1,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			          \{
			            id: 2,
			            command: 'run',
			            target: 'test',
			            value: '',
			            skip: true,
			          \},
			          \{
			            id: 3,
			            command: 'open',
			            target: '',
			            value: '',
			          \},
			        ],
			      \}
			      const executor = new FakeExecutor(\{\})
			      executor.doOpen = jest.fn(() => psetTimeout(10))
			      const playback = new Playback(\{
			        executor,
			      \})
			      const commandResults = []
			      playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, r =>
			        commandResults.push(r)
			      )
			      await (await playback.play(test))()
			
			      expect(commandResults[3].state).toBe(CommandStates.SKIPPED)
			    \})
			  \})
			
			  describe('Events', () => \{
			    describe("'command-state-changed'", () => \{
			      it('should listen to pending and pass changes', async () => \{
			        const test = \{
			          id: 1,
			          commands: [
			            \{
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			          ],
			        \}
			        const executor = new FakeExecutor(\{\})
			        executor.doOpen = jest.fn(async () => \{\})
			        const playback = new Playback(\{
			          executor,
			        \})
			        const cb = jest.fn()
			        playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, cb)
			        await (await playback.play(test))()
			        const results = flat(cb.mock.calls)
			        expect(results.length).toBe(2)
			        expect(results[0].state).toBe(CommandStates.EXECUTING)
			        expect(results[1].state).toBe(CommandStates.PASSED)
			      \})
			      it('should listen to fail changes', async () => \{
			        const test = \{
			          id: 1,
			          commands: [
			            \{
			              command: 'verifyText',
			              target: '',
			              value: '',
			            \},
			          ],
			        \}
			        const executor = new FakeExecutor(\{\})
			        executor.doVerifyText = jest.fn(async () => \{
			          throw new VerificationError('failed to verify')
			        \})
			        const playback = new Playback(\{
			          executor,
			        \})
			        const cb = jest.fn()
			        playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, cb)
			        await (await playback.play(test))().catch(() => \{\})
			        const results = flat(cb.mock.calls)
			        expect(results.length).toBe(2)
			        expect(results[0].state).toBe(CommandStates.EXECUTING)
			        expect(results[1].state).toBe(CommandStates.FAILED)
			      \})
			      it('should listen to error changes', async () => \{
			        const test = \{
			          id: 1,
			          commands: [
			            \{
			              command: 'fatal',
			              target: '',
			              value: '',
			            \},
			          ],
			        \}
			        const executor = new FakeExecutor(\{\})
			        const playback = new Playback(\{
			          executor,
			        \})
			        const cb = jest.fn()
			        playback.on(PlaybackEvents.COMMAND_STATE_CHANGED, cb)
			        await (await playback.play(test))().catch(() => \{\})
			        const results = flat(cb.mock.calls)
			        expect(results.length).toBe(2)
			        expect(results[0].state).toBe(CommandStates.EXECUTING)
			        expect(results[1].state).toBe(CommandStates.ERRORED)
			      \})
			    \})
			    describe("'playback-state-changed'", () => \{
			      it('should finish test successfully', async () => \{
			        const test = \{
			          id: 1,
			          commands: [
			            \{
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			          ],
			        \}
			        const executor = new FakeExecutor(\{\})
			        executor.doOpen = jest.fn(async () => \{\})
			        const playback = new Playback(\{
			          executor,
			        \})
			        const cb = jest.fn()
			        playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			        await (await playback.play(test))()
			        const results = flat(cb.mock.calls)
			        expect(results.length).toBe(3)
			        expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			        expect(results[1].state).toBe(PlaybackStates.PLAYING)
			        expect(results[2].state).toBe(PlaybackStates.FINISHED)
			      \})
			      it('should fail due to verify', async () => \{
			        const test = \{
			          id: 1,
			          commands: [
			            \{
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'verifyText',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			          ],
			        \}
			        const executor = new FakeExecutor(\{\})
			        executor.doOpen = jest.fn(async () => \{\})
			        executor.doVerifyText = jest.fn(async () => \{
			          throw new VerificationError('failed to verify')
			        \})
			        const playback = new Playback(\{
			          executor,
			        \})
			        const cb = jest.fn()
			        playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			        await (await playback.play(test))()
			        const results = flat(cb.mock.calls)
			        expect(results.length).toBe(3)
			        expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			        expect(results[1].state).toBe(PlaybackStates.PLAYING)
			        expect(results[2].state).toBe(PlaybackStates.FAILED)
			      \})
			      it('should fail due to assertion', async () => \{
			        const test = \{
			          id: 1,
			          commands: [
			            \{
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'assertText',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			          ],
			        \}
			        const executor = new FakeExecutor(\{\})
			        executor.doOpen = jest.fn(async () => \{\})
			        executor.doAssertText = jest.fn(async () => \{
			          throw new AssertionError('failed to assert')
			        \})
			        const playback = new Playback(\{
			          executor,
			        \})
			        const cb = jest.fn()
			        playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			        await (await playback.play(test))().catch(() => \{\})
			        const results = flat(cb.mock.calls)
			        expect(results.length).toBe(3)
			        expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			        expect(results[1].state).toBe(PlaybackStates.PLAYING)
			        expect(results[2].state).toBe(PlaybackStates.FAILED)
			      \})
			      it('should fail due to error', async () => \{
			        const test = \{
			          id: 1,
			          commands: [
			            \{
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'assertText',
			              target: '',
			              value: '',
			            \},
			            \{
			              command: 'open',
			              target: '',
			              value: '',
			            \},
			          ],
			        \}
			        const executor = new FakeExecutor(\{\})
			        executor.doOpen = jest.fn(async () => \{\})
			        executor.doAssertText = jest.fn(async () => \{
			          throw new Error('error in command')
			        \})
			        const playback = new Playback(\{
			          executor,
			        \})
			        const cb = jest.fn()
			        playback.on(PlaybackEvents.PLAYBACK_STATE_CHANGED, cb)
			        await (await playback.play(test))().catch(() => \{\})
			        const results = flat(cb.mock.calls)
			        expect(results.length).toBe(3)
			        expect(results[0].state).toBe(PlaybackStates.PREPARATION)
			        expect(results[1].state).toBe(PlaybackStates.PLAYING)
			        expect(results[2].state).toBe(PlaybackStates.ERRORED)
			      \})
			    \})
			  \})
			\})
			
			const psetTimeout = timeout =>
			  new Promise(res => \{
			    setTimeout(res, timeout)
			  \})
			
			const flat = arr => arr.reduce((f, a) => [...f, ...a], [])
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\playback.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(54)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\preprocessors.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{
			  composePreprocessors,
			  preprocessArray,
			  interpolateScript,
			  interpolateString,
			\} from '../src/preprocessors'
			import Variables from '../src/Variables'
			import FakeExecutor from './util/FakeExecutor'
			
			let variables
			beforeEach(() => \{
			  variables = new Variables()
			\})
			
			describe('preprocessor composition', () => \{
			  it('should do nothing if the command takes no arguments', () => \{
			    const fn = jest.fn()
			    const f = composePreprocessors(fn)
			    f()
			    expect(fn).toHaveBeenCalledWith()
			  \})
			  it('should compose target preprocessor', () => \{
			    variables.set('a', 'a')
			    const fn = jest.fn()
			    FakeExecutor.prototype.doFake = composePreprocessors(interpolateString, fn)
			    const exec = new FakeExecutor()
			    exec.init(\{ variables \})
			    exec.doFake('\$\{a\}')
			    expect(fn).toHaveBeenCalledWith('a')
			  \})
			  it('should compose value preprocessor', () => \{
			    variables.set('a', 'a')
			    const fn = jest.fn()
			    FakeExecutor.prototype.doFake = composePreprocessors(
			      interpolateString,
			      interpolateString,
			      fn
			    )
			    const exec = new FakeExecutor()
			    exec.init(\{ variables \})
			    exec.doFake('\$\{a\}', '\$\{a\}')
			    expect(fn).toHaveBeenCalledWith('a', 'a')
			  \})
			  it('should compose targets preprocessor', () => \{
			    variables.set('a', 'a')
			    const fn = jest.fn()
			    FakeExecutor.prototype.doFake = composePreprocessors(
			      interpolateString,
			      interpolateString,
			      \{ targets: preprocessArray(interpolateString) \},
			      fn
			    )
			    const exec = new FakeExecutor()
			    exec.init(\{ variables \})
			    exec.doFake('\$\{a\}', '\$\{a\}', \{
			      targets: [
			        ['\$\{a\}', 's'],
			        ['\$\{a\}', 's'],
			      ],
			    \})
			    expect(fn).toHaveBeenCalledWith('a', 'a', \{
			      targets: [
			        ['a', 's'],
			        ['a', 's'],
			      ],
			    \})
			  \})
			  it('should ignore preprocess if null is passed', () => \{
			    variables.set('a', 'a')
			    const fn = jest.fn()
			    FakeExecutor.prototype.doFake = composePreprocessors(
			      interpolateString,
			      null,
			      fn
			    )
			    const exec = new FakeExecutor()
			    exec.init(\{ variables \})
			    exec.doFake('\$\{a\}', '\$\{a\}')
			    expect(fn).toHaveBeenCalledWith('a', '\$\{a\}')
			  \})
			  it('should skip targets preprocessing if it is undefined', () => \{
			    variables.set('a', 'a')
			    const fn = jest.fn()
			    FakeExecutor.prototype.doFake = composePreprocessors(
			      interpolateString,
			      interpolateString,
			      preprocessArray(interpolateString),
			      fn
			    )
			    const exec = new FakeExecutor()
			    exec.init(\{ variables \})
			    exec.doFake('\$\{a\}', '\$\{a\}')
			    expect(fn).toHaveBeenCalledWith('a', 'a')
			  \})
			\})
			
			describe('array preprocessing', () => \{
			  it('should preprocess array of string using a single interpolator', () => \{
			    variables.set('a', 'a')
			    const arr = [
			      ['\$\{a\}a', 's'],
			      ['\$\{a\}b', 's'],
			    ]
			    expect(preprocessArray(interpolateString)(arr, variables)).toEqual([
			      ['aa', 's'],
			      ['ab', 's'],
			    ])
			  \})
			\})
			
			describe('interpolate string', () => \{
			  it('should interpolate false values', () => \{
			    variables.set('a', undefined)
			    expect(interpolateString('\$\{a\}', variables)).toBe('undefined')
			    variables.set('a', null)
			    expect(interpolateString('\$\{a\}', variables)).toBe('null')
			    variables.set('a', false)
			    expect(interpolateString('\$\{a\}', variables)).toBe('false')
			    variables.set('a', 0)
			    expect(interpolateString('\$\{a\}', variables)).toBe('0')
			    variables.set('a', '')
			    expect(interpolateString('\$\{a\}', variables)).toBe('')
			  \})
			\})
			
			describe('interpolate script', () => \{
			  it('should not interpolate a script without variables', () => \{
			    const script = 'return 1'
			    expect(interpolateScript(script, variables).script).toEqual(script)
			  \})
			  it('should interpolate a script with a single argument', () => \{
			    variables.set('a', 1)
			    const script = 'return \$\{a\}'
			    const r = interpolateScript(script, variables)
			    expect(r.script).toEqual('return arguments[0]')
			    expect(r.argv[0]).toBe(1)
			  \})
			  it('should interpolate a script with multiple arguments', () => \{
			    variables.set('a', 1)
			    variables.set('b', false)
			    const script = 'return \$\{a\} + \$\{a\} || \$\{b\}'
			    const r = interpolateScript(script, variables)
			    expect(r.script).toEqual(
			      'return arguments[0] + arguments[0] || arguments[1]'
			    )
			    expect(r.argv[0]).toBe(1)
			    expect(r.argv[1]).toBe(false)
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\preprocessors.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(11)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\utils.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ absolutifyUrl \} from '../src/utils'
			
			describe('url absolutifier', () => \{
			  it('should append to the base url', () => \{
			    expect(absolutifyUrl('/test.html', 'https://localhost')).toBe(
			      'https://localhost/test.html'
			    )
			  \})
			  it('should replace the path', () => \{
			    expect(absolutifyUrl('/test.html', 'http://localhost/a/b')).toBe(
			      'http://localhost/test.html'
			    )
			  \})
			  it('should append to the path', () => \{
			    expect(absolutifyUrl('test.html', 'http://localhost/a/b/')).toBe(
			      'http://localhost/a/b/test.html'
			    )
			  \})
			  it('should resolve from the path', () => \{
			    expect(absolutifyUrl('../test.html', 'http://localhost/a/b/')).toBe(
			      'http://localhost/a/test.html'
			    )
			  \})
			  it('should resolve from file ending path', () => \{
			    expect(absolutifyUrl('test.html', 'http://localhost/a/b.html')).toBe(
			      'http://localhost/a/test.html'
			    )
			  \})
			  it('should replace the base url with an absolute url', () => \{
			    expect(
			      absolutifyUrl('http://absolute/test.html', 'http://localhost/test.html')
			    ).toBe('http://absolute/test.html')
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\utils.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\webdriver.spec.js', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ promisify \} from 'util'
			import \{ By, WebElement \} from 'selenium-webdriver'
			import \{
			  createHeadlessChrome,
			  createHeadlessFirefox,
			\} from '@seleniumhq/webdriver-testkit'
			import \{ createStaticSite \} from '@seleniumhq/side-testkit'
			import \{ Commands \} from '@seleniumhq/side-model'
			import \{ ControlFlowCommandNames \} from '../src/playback-tree/commands'
			import Variables from '../src/Variables'
			import WebDriverExecutor from '../src/webdriver'
			
			jest.setTimeout(30000)
			
			describe('webdriver executor', () => \{
			  it('should implement all the Selenium commands', () => \{
			    Object.keys(Commands).forEach(command => \{
			      if (!ControlFlowCommandNames[command]) \{
			        expect(() => \{
			          if (
			            !WebDriverExecutor.prototype[
			              \`do\$\{command.charAt(0).toUpperCase() + command.slice(1)\}\`
			            ]
			          ) \{
			            throw new Error(\`\$\{command\} is not implemented!\`)
			          \}
			        \}).not.toThrow()
			      \}
			    \})
			  \})
			  describe.each([
			    ['chrome', createHeadlessChrome],
			    ['firefox', createHeadlessFirefox],
			  ])('commands on %s', (_browserName, createDriver) => \{
			    const app = createStaticSite()
			    let port, close, driver, executor, variables
			    beforeAll(async () => \{
			      await new Promise(res => \{
			        const server = app.listen(() => \{
			          port = server.address().port
			          close = promisify(server.close.bind(server))
			          res()
			        \})
			      \})
			    \})
			    afterAll(async () => \{
			      await close()
			    \})
			    beforeAll(async () => \{
			      variables = new Variables()
			      driver = await createDriver()
			      executor = new WebDriverExecutor(\{ driver \})
			      await executor.init(\{ variables \})
			    \})
			    afterAll(async () => \{
			      await driver.quit()
			    \})
			    afterEach(async () => \{
			      try \{
			        await driver.actions(\{ bridge: true \}).clear()
			      \} catch (err) \{
			        // chromedriver doesn't support clear()
			      \}
			    \})
			    describe('plugins', () => \{
			      it('should be able to register a command', async () => \{
			        expect.assertions(3)
			        executor.registerCommand('commandName', async function(target, value) \{
			          expect(this).toBe(executor)
			          expect(target).toBe('target')
			          expect(value).toBe('value')
			        \})
			        await executor.doCommandName('target', 'value')
			      \})
			    \})
			    describe('accept alert', () => \{
			      it('should dismiss an alert', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/popup/alert.html\`)
			        const element = await driver.findElement(By.css('button'))
			        await element.click()
			        await executor.doAcceptAlert()
			        await element.click()
			        // accepting twice to make sure that we can interact with the page
			        // after accepting initially
			        await executor.doAcceptAlert()
			      \})
			    \})
			    describe('add selection', () => \{
			      it('should select a single select item', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/select.html\`)
			        const element = await driver.findElement(By.css('select'))
			        expect(await element.getAttribute('value')).toBe('1')
			        await executor.doAddSelection('css=select', 'label=Two')
			        expect(await element.getAttribute('value')).toBe('2')
			      \})
			      it('should add to a multi select element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/select.html\`)
			        const element = await driver.findElement(By.id('mult'))
			        expect(
			          (
			            await driver.executeScript(
			              'return arguments[0].selectedOptions',
			              element
			            )
			          ).length
			        ).toBe(0)
			        await executor.doAddSelection('id=mult', 'label=Volvo')
			        const selections = await driver.executeScript(
			          'return arguments[0].selectedOptions',
			          element
			        )
			        expect(selections.length).toBe(1)
			        expect(await selections[0].getAttribute('value')).toBe('volvo')
			        await executor.doAddSelection('id=mult', 'value=volvo')
			        // no deselections by mistake
			        expect(
			          (
			            await driver.executeScript(
			              'return arguments[0].selectedOptions',
			              element
			            )
			          ).length
			        ).toBe(1)
			        await executor.doAddSelection('id=mult', 'value=audi')
			        expect(
			          (
			            await driver.executeScript(
			              'return arguments[0].selectedOptions',
			              element
			            )
			          ).length
			        ).toBe(2)
			      \})
			    \})
			    describe('answer prompt', () => \{
			      it('should answer prompt', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/popup/prompt.html\`)
			        const element = await driver.findElement(By.css('button'))
			        await element.click()
			        await executor.doAnswerPrompt('hello')
			        await driver.sleep(10)
			        expect(await driver.getTitle()).toBe('hello')
			        await element.click()
			        await executor.doAnswerPrompt('world')
			        await driver.sleep(10)
			        expect(await driver.getTitle()).toBe('world')
			        await element.click()
			        await executor.doAnswerPrompt('')
			        await driver.sleep(10)
			        expect(await driver.getTitle()).toBe('empty')
			      \})
			    \})
			    describe('assert alert', () => \{
			      it('should assert alert visibility', async () => \{
			        expect.assertions(1)
			        await driver.get(\`http://localhost:\$\{port\}/popup/alert.html\`)
			        const element = await driver.findElement(By.css('button'))
			        await element.click()
			        await executor.doAssertAlert('test')
			        await expect(executor.doAssertAlert('wat')).rejects.toThrow(
			          "Actual alert text 'test' did not match 'wat'"
			        )
			        await driver
			          .switchTo()
			          .alert()
			          .accept()
			      \})
			    \})
			    describe('assert confirmation', () => \{
			      it('should assert confirmation visibility', async () => \{
			        expect.assertions(1)
			        await driver.get(\`http://localhost:\$\{port\}/popup/confirm.html\`)
			        const element = await driver.findElement(By.css('button'))
			        await element.click()
			        await executor.doAssertConfirmation('test')
			        await expect(executor.doAssertConfirmation('wat')).rejects.toThrow(
			          "Actual confirm text 'test' did not match 'wat'"
			        )
			        await driver
			          .switchTo()
			          .alert()
			          .dismiss()
			      \})
			    \})
			    describe('assert editable', () => \{
			      it('should assert wether different inputs are editable', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/editable.html\`)
			        await executor.doAssertEditable('id=e')
			        await expect(executor.doAssertEditable('id=d')).rejects.toThrow(
			          'Element is not editable'
			        )
			        await expect(executor.doAssertEditable('id=r')).rejects.toThrow(
			          'Element is not editable'
			        )
			      \})
			      it('should assert wether different inputs are not editable', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/editable.html\`)
			        await executor.doAssertNotEditable('id=d')
			        await executor.doAssertNotEditable('id=r')
			        await expect(executor.doAssertNotEditable('id=e')).rejects.toThrow(
			          'Element is editable'
			        )
			      \})
			    \})
			    describe('assert prompt', () => \{
			      it('should assert prompt visibility', async () => \{
			        expect.assertions(1)
			        await driver.get(\`http://localhost:\$\{port\}/popup/prompt.html\`)
			        const element = await driver.findElement(By.css('button'))
			        await element.click()
			        await executor.doAssertPrompt('test')
			        await expect(executor.doAssertPrompt('wat')).rejects.toThrow(
			          "Actual prompt text 'test' did not match 'wat'"
			        )
			        await driver
			          .switchTo()
			          .alert()
			          .dismiss()
			      \})
			    \})
			    describe('click and click at', () => \{
			      it('should click', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/click.html\`)
			        await executor.doClick('id=c')
			        const r = await driver.findElement(By.id('r'))
			        expect(await r.getText()).toMatch(/^click/)
			      \})
			      it('should click (using click at)', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/click.html\`)
			        await executor.doClickAt('id=c', '10,5')
			        const r = await driver.findElement(By.id('r'))
			        expect(await r.getText()).toMatch(/^click/)
			      \})
			      it.skip('should click at a specific coordinate', async () => \{
			        // skip until chromedriver implements actions api correctly
			        await driver.get(\`http://localhost:\$\{port\}/click.html\`)
			        await executor.doClickAt('id=c', '10,5')
			        const r = await driver.findElement(By.id('r'))
			        expect(await r.getText()).toBe('click 58,13')
			      \})
			    \})
			    describe('dismiss confirmation', () => \{
			      it('should dismiss a confirmation', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/popup/confirm.html\`)
			        const element = await driver.findElement(By.css('button'))
			        await element.click()
			        await executor.doDismissConfirmation()
			        await element.click()
			        // accepting twice to make sure that we can interact with the page
			        // after accepting initially
			        await executor.doDismissConfirmation()
			      \})
			    \})
			    describe('dismiss prompt', () => \{
			      it('should dismiss a prompt', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/popup/prompt.html\`)
			        const element = await driver.findElement(By.css('button'))
			        await element.click()
			        await executor.doDismissPrompt()
			        await element.click()
			        // accepting twice to make sure that we can interact with the page
			        // after accepting initially
			        await executor.doDismissPrompt()
			      \})
			    \})
			    describe('double click and double click at', () => \{
			      it('should double click', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/click.html\`)
			        await executor.doDoubleClick('id=d')
			        const r = await driver.findElement(By.id('r'))
			        expect(await r.getText()).toMatch(/^double/)
			      \})
			      it('should double click (using double click at)', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/click.html\`)
			        await executor.doDoubleClickAt('id=d', '10,5')
			        const r = await driver.findElement(By.id('r'))
			        expect(await r.getText()).toMatch(/^double/)
			      \})
			      it.skip('should double click at a specific coordinate', async () => \{
			        // skip until chromedriver implements actions api correctly
			        await driver.get(\`http://localhost:\$\{port\}/click.html\`)
			        await executor.doDoubleClickAt('id=d', '10,5')
			        const r = await driver.findElement(By.id('r'))
			        expect(await r.getText()).toBe('double 58,13')
			      \})
			    \})
			    describe.skip('drag and drop', () => \{
			      // skip until webdriver implements html5 dnd
			      it('should drag and drop an element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/dnd.html\`)
			        await executor.doDragAndDropToObject('id=p1', 'id=target')
			        const r = await driver.findElement(By.id('target'))
			        expect(await r.getText()).toBe('dropped')
			      \})
			    \})
			    describe('edit content', () => \{
			      it('should set the content of a content editable element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/contenteditable.html\`)
			        await executor.doEditContent('id=c', 'hello world')
			        const r = await driver.findElement(By.id('c'))
			        expect(await r.getText()).toBe('hello world')
			      \})
			      it('should escape HTML when put into a content editable element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/contenteditable.html\`)
			        await executor.doEditContent('id=c', '<b>hello world</b>')
			        const r = await driver.findElement(By.id('c'))
			        expect(await r.getText()).toBe('<b>hello world</b>')
			      \})
			      it('should throw if trying to set the content of a non-content editable element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/editable.html\`)
			        await expect(
			          executor.doEditContent('id=e', 'hello world')
			        ).rejects.toThrow('Element is not content editable')
			      \})
			    \})
			    describe('mouse down and mouse down at', () => \{
			      it('it should move and press the left mouse button on an element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/mouse/updown.html\`)
			        await executor.doMouseDown('id=a')
			        const r = await driver.findElement(By.id('a'))
			        expect(await r.getText()).toMatch(/^down/)
			      \})
			      it('it should move and press the left mouse button on an element (using mouse down at)', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/mouse/updown.html\`)
			        await executor.doMouseDownAt('id=a', '100,50')
			        const r = await driver.findElement(By.id('a'))
			        expect(await r.getText()).toMatch(/^down/)
			      \})
			      it.skip('it should move and press the left mouse button on an element at a specific point', async () => \{
			        // decide wether coordinates are relative to center or to the top-left corner
			        await driver.get(\`http://localhost:\$\{port\}/mouse/updown.html\`)
			        await executor.doMouseDownAt('id=a', '100,5')
			        const r = await driver.findElement(By.id('a'))
			        expect(await r.getText()).toBe('down 10,5')
			      \})
			    \})
			    describe('mouse move at', () => \{
			      it('it should move to a specific point in an element', async () => \{
			        // decide wether coordinates are relative to center or to the top-left corner
			        await driver.get(\`http://localhost:\$\{port\}/mouse/move.html\`)
			        await executor.doMouseMoveAt('id=a', '100,5')
			        const r = await driver.findElement(By.id('a'))
			        expect(await r.getText()).toBe('move 350,255')
			      \})
			    \})
			    describe('mouse out', () => \{
			      it('should move out of an element through the top', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/mouse/out.html?y=1\`)
			        const r = await driver.findElement(By.id('cont'))
			        await driver
			          .actions(\{ bridge: true \})
			          .move(\{ origin: r \})
			          .perform()
			        await executor.doMouseOut('id=cont')
			        expect(await r.getText()).toBe('out 250,-1')
			      \})
			      it('should move out of an element through the right', async () => \{
			        await driver
			          .manage()
			          .window()
			          .setRect(\{ height: 1000, width: 1000 \})
			        await driver.get(\`http://localhost:\$\{port\}/mouse/out.html?x=0&y=0\`)
			        const r = await driver.findElement(By.id('cont'))
			        await driver
			          .actions(\{ bridge: true \})
			          .move(\{ origin: r \})
			          .perform()
			        await executor.doMouseOut('id=cont')
			        expect(await r.getText()).toBe('out 501,250')
			      \})
			      it('should move out of an element through the bottom', async () => \{
			        await driver
			          .manage()
			          .window()
			          .setRect(\{ height: 1000, width: 1000 \})
			        await driver.get(
			          \`http://localhost:\$\{port\}/mouse/out.html?x=0&y=0&w=1000\`
			        )
			        const r = await driver.findElement(By.id('cont'))
			        await driver
			          .actions(\{ bridge: true \})
			          .move(\{ origin: r \})
			          .perform()
			        await executor.doMouseOut('id=cont')
			        expect(await r.getText()).toBe('out 500,501')
			      \})
			      it('should move out of an element through the left', async () => \{
			        await driver
			          .manage()
			          .window()
			          .setRect(\{ height: 400, width: 1000 \})
			        await driver.get(
			          \`http://localhost:\$\{port\}/mouse/out.html?x=1&y=0&w=1000&h=400\`
			        )
			        const r = await driver.findElement(By.id('cont'))
			        await driver
			          .actions(\{ bridge: true \})
			          .move(\{ origin: r \})
			          .perform()
			        await executor.doMouseOut('id=cont')
			        expect(await r.getText()).toMatch(/^out -1,/)
			      \})
			      it('should throw if the element takes up the entire viewport', async () => \{
			        await driver
			          .manage()
			          .window()
			          .setRect(\{ height: 400, width: 400 \})
			        await driver.get(
			          \`http://localhost:\$\{port\}/mouse/out.html?x=0&y=0&w=500&h=500\`
			        )
			        await expect(executor.doMouseOut('id=cont')).rejects.toThrow(
			          'Unable to perform mouse out as the element takes up the entire viewport'
			        )
			      \})
			    \})
			    describe('mouse over', () => \{
			      it('should be able to move the pointer over an element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/mouse/over.html\`)
			        await executor.doMouseOver('id=a')
			        const r = await driver.findElement(By.id('a'))
			        expect(await r.getText()).toMatch(/^over/)
			      \})
			    \})
			    describe('mouse up and mouse up at', () => \{
			      it('it should move and release the left mouse button on an element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/mouse/updown.html\`)
			        const r = await driver.findElement(By.id('a'))
			        await driver
			          .actions(\{ bridge: true \})
			          .move(\{ origin: r \})
			          .press()
			          .perform()
			        await executor.doMouseUp('id=a')
			        expect(await r.getText()).toMatch(/^up/)
			      \})
			      it('it should move and press the release mouse button on an element (using mouse up at)', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/mouse/updown.html\`)
			
			        const r = await driver.findElement(By.id('a'))
			        await driver
			          .actions(\{ bridge: true \})
			          .move(\{ origin: r \})
			          .press()
			          .perform()
			        await executor.doMouseUpAt('id=a', '100,50')
			        expect(await r.getText()).toMatch(/^up/)
			      \})
			      it.skip('it should move and release the left mouse button on an element at a specific point', async () => \{
			        // decide wether coordinates are relative to center or to the top-left corner
			        await driver.get(\`http://localhost:\$\{port\}/mouse/updown.html\`)
			        const r = await driver.findElement(By.id('a'))
			        await driver
			          .actions(\{ bridge: true \})
			          .move(\{ origin: r \})
			          .press()
			          .perform()
			        await executor.doMouseUpAt('id=a', '100,5')
			        expect(await r.getText()).toBe('up 10,5')
			      \})
			    \})
			    describe('remove selection', () => \{
			      it('should throw when trying to use with a single item select', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/select.html\`)
			        await expect(
			          executor.doRemoveSelection('css=select', 'label=Two')
			        ).rejects.toThrow('Given element is not a multiple select type element')
			      \})
			      it('should remove from a multi select element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/select.html\`)
			        const element = await driver.findElement(By.id('mult'))
			        const opt1 = await element.findElement(By.css('option:nth-child(1)'))
			        const opt4 = await element.findElement(By.css('option:nth-child(4)'))
			        await opt1.click()
			        await opt4.click()
			        expect(
			          (
			            await driver.executeScript(
			              'return arguments[0].selectedOptions',
			              element
			            )
			          ).length
			        ).toBe(2)
			        await executor.doRemoveSelection('id=mult', 'label=Volvo')
			        const selections = await driver.executeScript(
			          'return arguments[0].selectedOptions',
			          element
			        )
			        expect(selections.length).toBe(1)
			        await executor.doRemoveSelection('id=mult', 'value=volvo')
			        // no selections by mistake
			        expect(
			          (
			            await driver.executeScript(
			              'return arguments[0].selectedOptions',
			              element
			            )
			          ).length
			        ).toBe(1)
			        await executor.doRemoveSelection('id=mult', 'value=audi')
			        expect(
			          (
			            await driver.executeScript(
			              'return arguments[0].selectedOptions',
			              element
			            )
			          ).length
			        ).toBe(0)
			      \})
			    \})
			    describe('store json', () => \{
			      it('should the JSON string as an object', async () => \{
			        const varName = 'blah'
			        await executor.doStoreJson('\{"blah":"blah"\}', varName)
			        const result = executor.variables.get(varName)
			        expect(typeof result).toMatch('object')
			        expect(result.blah).toMatch('blah')
			      \})
			    \})
			    describe('store attribute', () => \{
			      it('should store the attribute of an element', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/store/attributes.html\`)
			        await executor.doStoreAttribute('id=disabled@disabled', 'd')
			        expect(executor.variables.get('d')).toBe('true')
			        await executor.doStoreAttribute('id=disabled@type', 't')
			        expect(executor.variables.get('t')).toBe('text')
			        await executor.doStoreAttribute('id=disabled@nan', 'n')
			        expect(executor.variables.get('n')).toBe(null)
			      \})
			    \})
			    describe('store title', () => \{
			      it('should store the title of a page', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/title.html\`)
			        await executor.doStoreTitle('t')
			        expect(executor.variables.get('t')).toBe('test title')
			      \})
			    \})
			    describe('store element count', () => \{
			      it('should store the number of elements in a page', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/store/nodes.html\`)
			        await executor.doStoreElementCount('css=.testclass', 'n')
			        expect(executor.variables.get('n')).toBe(6)
			        await executor.doStoreElementCount('css=.nan', 'n')
			        expect(executor.variables.get('n')).toBe(0)
			      \})
			    \})
			    describe('wait for element editable', () => \{
			      it('should wait for an element to be editable', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/editable.html\`)
			        const button = await driver.findElement(By.id('b'))
			        await button.click()
			        await executor.doWaitForElementEditable('id=t', '500')
			        const input = await driver.findElement(By.id('t'))
			        await input.sendKeys('hey')
			        expect(await input.getAttribute('value')).toBe('hey')
			      \})
			      it('should timeout trying to wait for an element to be editable', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/editable.html\`)
			        await expect(
			          executor.doWaitForElementEditable('id=t', '100')
			        ).rejects.toThrow()
			      \})
			      it('should wait for an element to be not editable', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/not-editable.html\`)
			        const button = await driver.findElement(By.id('b'))
			        await button.click()
			        await executor.doWaitForElementNotEditable('id=t', '500')
			        const input = await driver.findElement(By.id('t'))
			        await expect(input.sendKeys('hey')).rejects.toThrow()
			      \})
			      it('should timeout trying to wait for an element to be not editable', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/not-editable.html\`)
			        await expect(
			          executor.doWaitForElementNotEditable('id=t', '100')
			        ).rejects.toThrow()
			      \})
			    \})
			    describe('wait for element present', () => \{
			      it('should wait for an element to appear', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/present.html\`)
			        const button = await driver.findElement(By.id('b'))
			        await button.click()
			        await executor.doWaitForElementPresent('id=t', '500')
			        expect(await driver.findElement(By.id('t'))).toBeInstanceOf(WebElement)
			      \})
			      it('should timeout trying to wait for an element to appear', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/present.html\`)
			        await expect(
			          executor.doWaitForElementPresent('id=t', '100')
			        ).rejects.toThrow()
			      \})
			      it('should wait for an element to disappear', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/not-present.html\`)
			        expect(await driver.findElement(By.id('t'))).toBeInstanceOf(WebElement)
			        const button = await driver.findElement(By.id('b'))
			        await button.click()
			        await executor.doWaitForElementNotPresent('id=t', '500')
			        await expect(driver.findElement(By.id('t'))).rejects.toThrow()
			      \})
			      it('should timeout trying to wait for an element to disappear', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/not-present.html\`)
			        await expect(
			          executor.doWaitForElementNotPresent('id=t', '100')
			        ).rejects.toThrow()
			      \})
			    \})
			    describe('wait for element visible', () => \{
			      it('should wait for an element to be visible', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/visible.html\`)
			        const button = await driver.findElement(By.id('b'))
			        await button.click()
			        await executor.doWaitForElementVisible('id=t', '500')
			        expect(await driver.findElement(By.id('t'))).toBeInstanceOf(WebElement)
			      \})
			      it('should timeout trying to wait for an element to be visible', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/visible.html\`)
			        await expect(
			          executor.doWaitForElementVisible('id=t', '100')
			        ).rejects.toThrow()
			      \})
			      it('should wait for an element to be invisible', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/not-visible.html\`)
			        const elem = await driver.findElement(By.id('t'))
			        expect(await elem.isDisplayed()).toBeTruthy()
			        const button = await driver.findElement(By.id('b'))
			        await button.click()
			        await executor.doWaitForElementNotVisible('id=t', '500')
			        expect(await elem.isDisplayed()).toBeFalsy()
			      \})
			      it('should timeout trying to wait for an element to be invisible', async () => \{
			        await driver.get(\`http://localhost:\$\{port\}/wait/not-visible.html\`)
			        await expect(
			          executor.doWaitForElementNotVisible('id=t', '100')
			        ).rejects.toThrow()
			      \})
			    \})
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\side-runtime\\__tests__\\webdriver.spec.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(50)
    });
    it('seleniumhq_selenium-ide\\packages\\webdriver-testkit\\__tests__\\driver.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import \{ createHeadlessChrome, createHeadlessFirefox \} from '../src/driver'
			
			jest.setTimeout(30000)
			
			describe('driver testkit', () => \{
			  it('should create headless chrome', async () => \{
			    const driver = await createHeadlessChrome()
			    await driver.quit()
			  \})
			
			  it('should create headless firefox', async () => \{
			    const driver = await createHeadlessFirefox()
			    await driver.quit()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\webdriver-testkit\\__tests__\\driver.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('seleniumhq_selenium-ide\\packages\\webdriver-testkit\\__tests__\\index.spec.ts', () => {
        const sourceCode = `
			// Licensed to the Software Freedom Conservancy (SFC) under one
			// or more contributor license agreements.  See the NOTICE file
			// distributed with this work for additional information
			// regarding copyright ownership.  The SFC licenses this file
			// to you under the Apache License, Version 2.0 (the
			// "License"); you may not use this file except in compliance
			// with the License.  You may obtain a copy of the License at
			//
			//   http://www.apache.org/licenses/LICENSE-2.0
			//
			// Unless required by applicable law or agreed to in writing,
			// software distributed under the License is distributed on an
			// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			// KIND, either express or implied.  See the License for the
			// specific language governing permissions and limitations
			// under the License.
			
			import * as index from '../src'
			
			describe('webdriver-testkit', () => \{
			  it('should export all the required things', () => \{
			    expect(index.updateDrivers).toBeDefined()
			    expect(index.createDriver).toBeDefined()
			    expect(index.createHeadlessChrome).toBeDefined()
			    expect(index.createHeadlessFirefox).toBeDefined()
			  \})
			\})
			`

		const tests = extractFromSource(sourceCode, 'seleniumhq_selenium-ide\\packages\\webdriver-testkit\\__tests__\\index.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
});
