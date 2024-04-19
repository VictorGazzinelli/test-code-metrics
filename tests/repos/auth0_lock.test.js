const { extractFromSource } = require('../../src/extractor');

describe('auth0_lock', () => {
    it('auth0_lock\\src\\__tests__\\auth_button.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent \} from 'testUtils';
			
			import AuthButton from 'ui/button/auth_button';
			
			describe('AuthButton', () => \{
			  const defaultProps = \{
			    label: 'label',
			    onClick: jest.fn(),
			    strategy: 'strategy'
			  \};
			  it('renders correctly', () => \{
			    expectComponent(<AuthButton \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders with style customizations', () => \{
			    expectComponent(
			      <AuthButton
			        \{...defaultProps\}
			        icon="test"
			        primaryColor="primaryColor"
			        foregroundColor="foregroundColor"
			      />
			    ).toMatchSnapshot();
			  \});
			  it('should trigger onClick when clicked', () => \{
			    const wrapper = mount(<AuthButton \{...defaultProps\} />);
			    wrapper.find('a').simulate('click');
			    expect(defaultProps.onClick.mock.calls.length).toBe(1);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\auth_button.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\src\\__tests__\\connection\\database\\actions.test.js', () => {
        const sourceCode = `
			import Immutable, \{ List, Map \} from 'immutable';
			import \{ signUp \} from '../../../connection/database/actions';
			import \{ swap, setEntity \} from '../../../store';
			
			const webApiMock = () => require('core/web_api');
			const coreActionsMock = () => require('core/actions');
			jest.mock('core/actions', () => (\{
			  validateAndSubmit: jest.fn()
			\}));
			
			jest.mock('core/web_api', () => (\{
			  signUp: jest.fn()
			\}));
			
			describe('database/actions.js', () => \{
			  beforeEach(() => \{
			    jest.resetAllMocks();
			  \});
			
			  it('signUp splits root attributes correctly', () => \{
			    const id = 1;
			    const hookRunner = jest.fn((str, m, context, fn) => fn());
			
			    require('connection/database/index').databaseConnectionName = () => 'test-connection';
			    require('connection/database/index').shouldAutoLogin = () => true;
			
			    const m = Immutable.fromJS(\{
			      field: \{
			        email: \{
			          value: 'test@email.com'
			        \},
			        password: \{
			          value: 'testpass'
			        \},
			        family_name: \{
			          value: 'test-family-name'
			        \},
			        given_name: \{
			          value: 'test-given-name'
			        \},
			        name: \{
			          value: 'test-name'
			        \},
			        nickname: \{
			          value: 'test-nickname'
			        \},
			        picture: \{
			          value: 'test-pic'
			        \},
			        other_prop: \{
			          value: 'test-other'
			        \}
			      \},
			      database: \{
			        additionalSignUpFields: [
			          \{ name: 'family_name', storage: 'root' \},
			          \{ name: 'given_name', storage: 'root' \},
			          \{ name: 'name', storage: 'root' \},
			          \{ name: 'nickname', storage: 'root' \},
			          \{ name: 'picture', storage: 'root' \},
			          \{ name: 'other_prop' \}
			        ]
			      \},
			      core: \{
			        hookRunner
			      \}
			    \});
			    swap(setEntity, 'lock', id, m);
			    signUp(id);
			    const \{
			      validateAndSubmit: \{ mock: validateAndSubmitMock \}
			    \} = coreActionsMock();
			    expect(validateAndSubmitMock.calls.length).toBe(1);
			    expect(validateAndSubmitMock.calls[0][0]).toBe(id);
			    expect(validateAndSubmitMock.calls[0][1]).toContain('email');
			    expect(validateAndSubmitMock.calls[0][1]).toContain('password');
			    validateAndSubmitMock.calls[0][2](m);
			    const \{
			      signUp: \{ mock: signUpMock \}
			    \} = webApiMock();
			    expect(signUpMock.calls.length).toBe(1);
			    expect(signUpMock.calls[0][0]).toBe(id);
			    expect(signUpMock.calls[0][1]).toMatchObject(\{
			      connection: 'test-connection',
			      email: 'test@email.com',
			      password: 'testpass',
			      autoLogin: true,
			      family_name: 'test-family-name',
			      given_name: 'test-given-name',
			      name: 'test-name',
			      nickname: 'test-nickname',
			      picture: 'test-pic',
			      user_metadata: \{
			        other_prop: 'test-other'
			      \}
			    \});
			  \});
			
			  it('runs the signingUp hook on signUp', () => \{
			    const id = 1;
			
			    require('connection/database/index').databaseConnectionName = () => 'test-connection';
			    require('connection/database/index').shouldAutoLogin = () => true;
			
			    const hookRunner = jest.fn((str, m, context, fn) => fn());
			
			    const m = Immutable.fromJS(\{
			      field: \{
			        email: \{
			          value: 'test@email.com'
			        \},
			        password: \{
			          value: 'testpass'
			        \}
			      \},
			      core: \{
			        hookRunner
			      \}
			    \});
			
			    swap(setEntity, 'lock', id, m);
			
			    signUp(id);
			
			    const \{
			      validateAndSubmit: \{ mock: validateAndSubmitMock \}
			    \} = coreActionsMock();
			
			    validateAndSubmitMock.calls[0][2](m);
			
			    const \{
			      signUp: \{ mock: signUpMock \}
			    \} = webApiMock();
			
			    expect(hookRunner).toHaveBeenCalledTimes(1);
			    expect(hookRunner).toHaveBeenCalledWith('signingUp', m, null, expect.any(Function));
			    expect(signUpMock.calls.length).toBe(1);
			    expect(signUpMock.calls[0][0]).toBe(id);
			  \});
			
			  it('sanitizes additionalSignUp fields using dompurify', () => \{
			    const id = 1;
			    const hookRunner = jest.fn((str, m, context, fn) => fn());
			
			    require('connection/database/index').databaseConnectionName = () => 'test-connection';
			    require('connection/database/index').shouldAutoLogin = () => true;
			
			    // Test different fields using some examples from DOMPurify
			    // https://github.com/cure53/DOMPurify#some-purification-samples-please
			    const m = Immutable.fromJS(\{
			      field: \{
			        email: \{
			          value: 'test@email.com'
			        \},
			        password: \{
			          value: 'testpass'
			        \},
			        family_name: \{
			          value: 'Test <a href="https://www.google.co.uk">Fake link</a>' // HTML but not malicious
			        \},
			        given_name: \{
			          value: '<img src=x onerror=alert(1)//>'
			        \},
			        name: \{
			          value: '<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'
			        \},
			        other_name: \{
			          value:
			            '<div onclick=alert(0)><form onsubmit=alert(1)><input onfocus=alert(2) name=parentNode>123</form></div>'
			        \}
			      \},
			      database: \{
			        additionalSignUpFields: [
			          \{ name: 'family_name', storage: 'root' \},
			          \{ name: 'given_name', storage: 'root' \},
			          \{ name: 'name', storage: 'root' \},
			          \{ name: 'other_name' \}
			        ]
			      \},
			      core: \{
			        hookRunner
			      \}
			    \});
			
			    swap(setEntity, 'lock', id, m);
			    signUp(id);
			
			    const \{
			      validateAndSubmit: \{ mock: validateAndSubmitMock \}
			    \} = coreActionsMock();
			
			    validateAndSubmitMock.calls[0][2](m);
			
			    const \{
			      signUp: \{ mock: signUpMock \}
			    \} = webApiMock();
			
			    expect(signUpMock.calls[0][1]).toMatchObject(\{
			      connection: 'test-connection',
			      email: 'test@email.com',
			      password: 'testpass',
			      autoLogin: true,
			      family_name: 'Test Fake link',
			      given_name: '',
			      name: 'abc',
			      user_metadata: \{
			        other_name: '123'
			      \}
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\database\\actions.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\src\\__tests__\\connection\\database\\index.test.js', () => {
        const sourceCode = `
			import Immutable, \{ List, Map \} from 'immutable';
			import \{
			  databaseUsernameValue,
			  initDatabase,
			  databaseUsernameStyle
			\} from '../../../connection/database';
			
			describe('database/index.js', () => \{
			  describe('databaseUsernameValue', () => \{
			    const getModel = (email, username, usernameRequired) =>
			      Immutable.fromJS(\{
			        field: \{
			          email: \{
			            value: email
			          \},
			          username: \{
			            value: username
			          \}
			        \},
			        core: \{
			          transient: \{
			            connections: \{
			              database: [
			                \{
			                  requireUsername: usernameRequired
			                \}
			              ]
			            \}
			          \}
			        \}
			      \});
			
			    beforeEach(() => \{
			      jest.resetAllMocks();
			    \});
			
			    describe('for database connection without username required', () => \{
			      const model = getModel('user@auth0.com', null, false);
			
			      it('should get the email', () => \{
			        expect(databaseUsernameValue(model)).toEqual('user@auth0.com');
			      \});
			    \});
			
			    describe('for database connection with username required', () => \{
			      const model = getModel('user@auth0.com', 'user', true);
			
			      it('should get the username when \`emailFirst\` is not set', () => \{
			        expect(databaseUsernameValue(model)).toEqual('user');
			      \});
			      it('should get the username when \`emailFirst\` is false', () => \{
			        expect(databaseUsernameValue(model, \{ emailFirst: false \})).toEqual('user');
			      \});
			      it('should get the email when \`emailFirst\` is true', () => \{
			        expect(databaseUsernameValue(model, \{ emailFirst: true \})).toEqual('user@auth0.com');
			      \});
			
			      describe('and only email address is filled in', () => \{
			        const model = getModel('user@auth0.com', null, true);
			
			        it('should get the email address', () => \{
			          expect(databaseUsernameValue(model)).toEqual('user@auth0.com');
			        \});
			      \});
			    \});
			  \});
			
			  describe('databaseUsernameStyle', () => \{
			    beforeEach(() => \{
			      jest.resetAllMocks();
			    \});
			
			    it('it should resolve to "username" if a connectionResolver is present', () => \{
			      const model = Immutable.fromJS(\{
			        core: \{
			          connectionResolver: () => true,
			          transient: \{
			            connections: \{
			              database: [
			                \{
			                  requireUsername: false
			                \}
			              ]
			            \}
			          \}
			        \}
			      \});
			
			      expect(databaseUsernameStyle(model)).toBe('username');
			    \});
			  \});
			
			  describe('initDatabase', () => \{
			    describe('calls initNS with the correct additionalSignUpFields', () => \{
			      describe('uses the \`storage\` attribute', () => \{
			        const model = Immutable.fromJS(\{\});
			        const modelOut = initDatabase(model, \{
			          additionalSignUpFields: [
			            \{
			              type: 'hidden',
			              name: 'hidden_field',
			              value: 'hidden_value',
			              storage: 'root'
			            \}
			          ]
			        \});
			        const modelOutJS = modelOut.toJS();
			        expect(modelOutJS.database.additionalSignUpFields).toEqual([
			          \{
			            type: 'hidden',
			            name: 'hidden_field',
			            value: 'hidden_value',
			            storage: 'root'
			          \}
			        ]);
			      \});
			      describe('with a valid hidden field', () => \{
			        const model = Immutable.fromJS(\{\});
			        const modelOut = initDatabase(model, \{
			          additionalSignUpFields: [
			            \{
			              type: 'hidden',
			              name: 'hidden_field',
			              value: 'hidden_value'
			            \}
			          ]
			        \});
			        const modelOutJS = modelOut.toJS();
			        expect(modelOutJS.field).toEqual(\{
			          hidden_field: \{ showInvalid: false, valid: true, value: 'hidden_value' \}
			        \});
			        expect(modelOutJS.database.additionalSignUpFields).toEqual([
			          \{
			            type: 'hidden',
			            name: 'hidden_field',
			            value: 'hidden_value'
			          \}
			        ]);
			      \});
			      describe('with a hidden field without a value', () => \{
			        const model = Immutable.fromJS(\{\});
			        const modelOut = initDatabase(model, \{
			          additionalSignUpFields: [
			            \{
			              type: 'hidden',
			              name: 'hidden_field'
			            \}
			          ]
			        \});
			        expect(modelOut.toJS().database.additionalSignUpFields.length).toBe(0);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\database\\index.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('auth0_lock\\src\\__tests__\\connection\\database\\login_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import I from 'immutable';
			import \{ expectShallowComponent \} from 'testUtils';
			import LoginPane from '../../../connection/database/login_pane';
			
			const lock = I.fromJS(\{ id: '__lock-id__' \});
			
			jest.mock('core/index');
			
			jest.mock('engine/classic');
			jest.mock('connection/enterprise');
			
			describe('LoginPane', () => \{
			  const defaultProps = \{
			    emailInputPlaceholder: '',
			    forgotPasswordAction: '',
			    i18n: \{\},
			    passwordInputPlaceholder: '',
			    showForgotPasswordLink: true,
			    showPassword: true,
			    usernameInputPlaceholder: '',
			    lock
			  \};
			
			  beforeEach(() => \{
			    jest.resetAllMocks();
			  \});
			
			  it('renders correctly', async () => \{
			    expectShallowComponent(<LoginPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders a captcha', () => \{
			    require('core/index').captcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    expectShallowComponent(<LoginPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('hides the captcha for SSO connections', () => \{
			    require('core/index').captcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    require('engine/classic').isSSOEnabled.mockReturnValue(true);
			
			    expectShallowComponent(<LoginPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('shows the captcha for SSO (ADFS) connections', () => \{
			    require('core/index').captcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    require('engine/classic').isSSOEnabled.mockReturnValue(true);
			    require('connection/enterprise').isHRDDomain.mockReturnValue(true);
			
			    expectShallowComponent(<LoginPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\database\\login_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('auth0_lock\\src\\__tests__\\connection\\database\\password_reset_confirmation.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import I from 'immutable';
			
			import \{ expectComponent \} from 'testUtils';
			
			import PasswordResetConfirmation from '../../../connection/database/password_reset_confirmation';
			
			const lock = I.fromJS(\{ id: '__lock-id__' \});
			
			describe('PasswordResetConfirmation', () => \{
			  it('renders correctly', async () => \{
			    expectComponent(<PasswordResetConfirmation lock=\{lock\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\database\\password_reset_confirmation.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\connection\\database\\reset_password.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ expectComponent, mockComponent \} from 'testUtils';
			import I from 'immutable';
			import \{ setField \} from '../../../field';
			
			jest.mock('connection/database/reset_password_pane', () => mockComponent('reset_password_pane'));
			
			const getScreen = () => \{
			  const ResetPasswordScreen = require('connection/database/reset_password').default;
			  return new ResetPasswordScreen();
			\};
			
			const getComponent = () => \{
			  const screen = getScreen();
			  return screen.render();
			\};
			
			describe('ResetPasswordScreen', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('connection/database/index', () => (\{
			      databaseUsernameValue: (model, options) => \{
			        expect(options.emailFirst).toBe(true);
			        return 'foo@test.com';
			      \}
			    \}));
			
			    jest.mock('connection/enterprise', () => (\{
			      isEnterpriseDomain: () => true
			    \}));
			
			    jest.mock('i18n', () => (\{
			      str: (_, keys) => keys.join(',')
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 'id',
			      setGlobalError: 'setGlobalError',
			      clearGlobalError: 'clearGlobalError',
			      connectionResolver: jest.fn().mockReturnValue(undefined),
			      ui: \{
			        allowAutocomplete: () => false
			      \},
			      submitting: () => false
			    \}));
			
			    jest.mock('store/index', () => (\{
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			  \});
			
			  it('isSubmitDisabled returns true when \`isEnterpriseDomain\` is true', () => \{
			    jest.useFakeTimers();
			    require('connection/enterprise').isEnterpriseDomain = () => true;
			    const screen = getScreen();
			    expect(screen.isSubmitDisabled()).toBe(true);
			    jest.advanceTimersByTime(50);
			    expect(require('store/index').swap.mock.calls[0]).toMatchSnapshot();
			  \});
			
			  it('isSubmitDisabled returns false when \`isEnterpriseDomain\` is false', () => \{
			    require('connection/enterprise').isEnterpriseDomain = () => false;
			    const screen = getScreen();
			    expect(screen.isSubmitDisabled()).toBe(false);
			    expect(require('store/index').swap.mock.calls[0]).toMatchSnapshot();
			  \});
			
			  describe('a custom connection resolver is being used', () => \{
			    let lock;
			    let i18n;
			
			    beforeEach(() => \{
			      lock = I.fromJS(\{
			        id: '__lock-id__'
			      \});
			
			      i18n = \{
			        html: jest.fn(),
			        str: jest.fn()
			      \};
			    \});
			
			    it('copies the username to the email field if an email address was entered', () => \{
			      require('core/index').connectionResolver.mockReturnValue(() => () => true);
			      const store = require('store/index');
			      const Component = getComponent();
			
			      // Set a field on Lock to set the username field, then check it was set as the email
			      const l = setField(lock, 'username', 'test@test.com');
			
			      expectComponent(<Component i18n=\{i18n\} model=\{l\} />).toMatchSnapshot();
			
			      expect(store.swap).toHaveBeenCalledWith(
			        'updateEntity',
			        'lock',
			        'id',
			        expect.anything(),
			        'test@test.com',
			        false
			      );
			    \});
			
			    it('sets the email field to a blank value if username is not an email address', () => \{
			      require('core/index').connectionResolver.mockReturnValue(() => () => true);
			      const store = require('store/index');
			      const Component = getComponent();
			
			      // Set a field on Lock to set the username field, then check it was set as the email
			      const l = setField(lock, 'username', 'some-username');
			
			      expectComponent(<Component i18n=\{i18n\} model=\{l\} />).toMatchSnapshot();
			
			      expect(store.swap).toHaveBeenCalledWith(
			        'updateEntity',
			        'lock',
			        'id',
			        expect.anything(),
			        '',
			        false
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\database\\reset_password.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('auth0_lock\\src\\__tests__\\connection\\database\\signed_up_confirmation.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import I from 'immutable';
			
			import \{ expectComponent \} from 'testUtils';
			
			import SignedUpConfirmation from '../../../connection/database/signed_up_confirmation';
			
			const lock = I.fromJS(\{ id: '__lock-id__' \});
			
			describe('SignedUpConfirmation', () => \{
			  it('renders correctly', async () => \{
			    expectComponent(<SignedUpConfirmation lock=\{lock\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\database\\signed_up_confirmation.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\connection\\enterprise\\actions.test.js', () => {
        const sourceCode = `
			import I from 'immutable';
			import \{ logIn \} from '../../../connection/enterprise/actions';
			import * as l from '../../../core/index';
			import \{ setField \} from '../../../field/index';
			
			jest.mock('connection/database/index', () => (\{
			  databaseLogInWithEmail: jest.fn(() => true),
			  databaseUsernameValue: jest.fn()
			\}));
			
			jest.mock('store/index', () => (\{
			  read: jest.fn(() => 'model'),
			  getEntity: 'getEntity',
			  swap: jest.fn(),
			  updateEntity: 'updateEntity'
			\}));
			
			jest.mock('connection/enterprise', () => (\{
			  matchConnection: jest.fn(),
			  enterpriseActiveFlowConnection: jest.fn(),
			  isHRDActive: jest.fn(),
			  isEnterpriseDomain: jest.fn()
			\}));
			
			jest.mock('core/actions', () => (\{
			  logIn: jest.fn()
			\}));
			
			describe('Login with connection scopes', () => \{
			  let lock;
			
			  beforeEach(() => \{
			    lock = I.fromJS(\{ id: '__lock__' \});
			    require('store/index').read.mockReturnValue(lock);
			  \});
			
			  afterEach(() => \{
			    jest.resetAllMocks();
			  \});
			
			  describe('for an SSO connection', () => \{
			    it('passes connectionScopes to the connection', () => \{
			      lock = l.setup('__lock__', 'client', 'domain', \{
			        auth: \{
			          connectionScopes: \{
			            'sso-connection': ['offline_access']
			          \}
			        \}
			      \});
			
			      lock = setField(lock, 'email', 'test@test.com');
			
			      require('store/index').read.mockReturnValue(lock);
			
			      require('connection/enterprise').matchConnection.mockReturnValue(
			        I.fromJS(\{ name: 'sso-connection' \})
			      );
			
			      const coreActions = require('core/actions');
			
			      logIn('__lock__');
			
			      expect(coreActions.logIn).toHaveBeenCalledWith('__lock__', ['email'], \{
			        connection_scope: ['offline_access'],
			        connection: 'sso-connection',
			        login_hint: 'test@test.com'
			      \});
			    \});
			
			    it('should not throw an error if the captcha was not completed', () => \{
			      lock = l.setup('__lock__', 'client', 'domain', \{\});
			      lock = setField(lock, 'email', 'test@test.com');
			
			      // This will be specified in the response from the /challenge endpoint if the
			      // dashboard settings have Captcha as 'required', regardless of connection being used.
			      lock = l.setCaptcha(lock, \{
			        required: true,
			        provider: 'recaptcha_v2'
			      \});
			
			      require('store/index').read.mockReturnValue(lock);
			
			      require('connection/enterprise').matchConnection.mockReturnValue(
			        I.fromJS(\{ name: 'sso-connection' \})
			      );
			
			      const coreActions = require('core/actions');
			
			      logIn('__lock__');
			      expect(coreActions.logIn).toHaveBeenCalled();
			    \});
			  \});
			
			  describe('for a non-SSO connection', () => \{
			    it('passes connectionScopes to the connection', () => \{
			      lock = l.setup('__lock__', 'client', 'domain', \{
			        auth: \{
			          connectionScopes: \{
			            'enterprise-connection': ['offline_access']
			          \}
			        \}
			      \});
			
			      lock = setField(lock, 'password', 'test');
			      lock = setField(lock, 'username', 'test');
			
			      require('store/index').read.mockReturnValue(lock);
			
			      require('connection/enterprise').enterpriseActiveFlowConnection.mockReturnValue(
			        I.fromJS(\{ name: 'enterprise-connection' \})
			      );
			
			      const coreActions = require('core/actions');
			
			      logIn('__lock__');
			
			      expect(coreActions.logIn).toHaveBeenCalledWith(
			        '__lock__',
			        ['password', 'username'],
			        \{
			          connection_scope: ['offline_access'],
			          connection: 'enterprise-connection',
			          username: 'test',
			          password: 'test',
			          login_hint: 'test'
			        \},
			        expect.any(Function)
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\enterprise\\actions.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\src\\__tests__\\connection\\enterprise\\hrd_pane.test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ expectShallowComponent \} from 'testUtils';
			import I from 'immutable';
			import * as i18n from '../../../i18n';
			import HRDPane from '../../../connection/enterprise/hrd_pane';
			
			const lock = I.fromJS(\{ id: '__lock-id__' \});
			
			jest.mock('core/index');
			
			describe('HRDPane', () => \{
			  const defaultProps = \{
			    model: lock,
			    header: <header></header>,
			    i18n,
			    passwordInputPlaceholder: 'password',
			    usernameInputPlaceholder: 'username'
			  \};
			
			  beforeEach(() => \{
			    jest.resetAllMocks();
			  \});
			
			  it('renders correctly', () => \{
			    expectShallowComponent(<HRDPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders the captcha if required', () => \{
			    require('core/index').captcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    expectShallowComponent(<HRDPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\enterprise\\hrd_pane.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\connection\\enterprise\\hrd_screen.test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mockComponent, expectComponent \} from 'testUtils';
			import I from 'immutable';
			import \{ dataFns \} from '../../../utils/data_utils';
			import * as i18n from '../../../i18n';
			
			const \{ set \} = dataFns(['i18n']);
			
			jest.mock('engine/classic');
			jest.mock('connection/enterprise/hrd_pane', () => mockComponent('hrd_pane'));
			jest.mock('connection/enterprise', () => (\{
			  enterpriseDomain: jest.fn(() => 'domain.com')
			\}));
			
			const getComponent = () => \{
			  const HRDScreen = require('connection/enterprise/hrd_screen').default;
			  const screen = new HRDScreen();
			  return screen.render();
			\};
			
			describe('HRDScreen Component', () => \{
			  let i18nProp;
			  let lock;
			
			  beforeEach(() => \{
			    lock = I.fromJS(\{ id: '__lock-id__' \});
			
			    jest.resetModules();
			
			    const lang = I.fromJS(\{
			      enterpriseLoginIntructions: 'Login with your corporate credentials.',
			      enterpriseActiveLoginInstructions: 'Please enter your corporate credentials at %s.'
			    \});
			
			    lock = set(lock, 'strings', lang);
			
			    i18nProp = \{
			      str: (keypath, ...args) => i18n.str(lock, keypath, args)
			    \};
			  \});
			
			  it('renders correctly when there is an enterprise domain', () => \{
			    const Component = getComponent();
			    expectComponent(<Component model=\{lock\} i18n=\{i18nProp\} />).toMatchSnapshot();
			  \});
			
			  it('renders correctly when there is no enterprise domain', () => \{
			    require('connection/enterprise').enterpriseDomain.mockImplementation(() => null);
			    const Component = getComponent();
			    expectComponent(<Component model=\{lock\} i18n=\{i18nProp\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\enterprise\\hrd_screen.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\connection\\enterprise\\quick_auth_screen.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import I from 'immutable';
			import \{ expectComponent \} from 'testUtils';
			
			jest.mock('engine/classic');
			
			const getComponent = () => \{
			  const MFALoginScreen = require('connection/enterprise/quick_auth_screen').default;
			  const screen = new MFALoginScreen();
			  return screen.render();
			\};
			
			describe('The quick auth screen', () => \{
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(','),
			      html: jest.fn()
			    \}
			  \};
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    const mockConnection = I.fromJS(\{
			      name: 'Test',
			      domains: ['test.com']
			    \});
			
			    jest.mock('connection/social/index', () => (\{
			      hasScreen: false,
			      authButtonsTheme: jest.fn(() => (\{
			        get: jest.fn()
			      \}))
			    \}));
			
			    jest.mock('connection/enterprise', () => (\{
			      quickAuthConnection: jest.fn(() => mockConnection)
			    \}));
			
			    jest.mock('core/index', () => (\{
			      ui: \{
			        preferConnectionDisplayName: jest.fn(() => false)
			      \}
			    \}));
			  \});
			
			  it('renders the connection using the domain', async () => \{
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders the connection using the display name when preferConnectionDisplayName is true', () => \{
			    const mockConnection = I.fromJS(\{
			      name: 'Test',
			      domains: ['test.com'],
			      displayName: 'My Connection'
			    \});
			
			    const \{ quickAuthConnection \} = require('connection/enterprise');
			    quickAuthConnection.mockReturnValue(mockConnection);
			
			    const l = require('core/index');
			    l.ui.preferConnectionDisplayName.mockReturnValue(true);
			
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders the connection using the connection domain when preferConnectionDisplayName is true, but no display name available', () => \{
			    const mockConnection = I.fromJS(\{
			      name: 'Test',
			      domains: ['test.com']
			    \});
			
			    const \{ quickAuthConnection \} = require('connection/enterprise');
			    quickAuthConnection.mockReturnValue(mockConnection);
			
			    const l = require('core/index');
			    l.ui.preferConnectionDisplayName.mockReturnValue(true);
			
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders the connection using the connection display name when preferConnectionDisplayName is true and there are no IdP domains configured', () => \{
			    const mockConnection = I.fromJS(\{
			      name: 'Test',
			      displayName: 'My Connection'
			    \});
			
			    const \{ quickAuthConnection \} = require('connection/enterprise');
			    quickAuthConnection.mockReturnValue(mockConnection);
			
			    const l = require('core/index');
			    l.ui.preferConnectionDisplayName.mockReturnValue(true);
			
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders the connection using the connection name when there is no domain available', () => \{
			    const mockConnection = I.fromJS(\{
			      name: 'Test'
			    \});
			
			    const \{ quickAuthConnection \} = require('connection/enterprise');
			    quickAuthConnection.mockReturnValue(mockConnection);
			
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\enterprise\\quick_auth_screen.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('auth0_lock\\src\\__tests__\\connection\\passwordless\\ask_vcode.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mockComponent \} from 'testUtils';
			import I from 'immutable';
			import \{ setField \} from '../../../field';
			import * as i18n from '../../../i18n';
			import \{ expectComponent \} from '../../testUtils';
			import \{ dataFns \} from '../../../utils/data_utils';
			import \{ setPhoneNumber, initLocation \} from '../../../field/phone_number';
			
			const \{ set \} = dataFns(['i18n']);
			
			jest.mock('engine/classic');
			jest.mock('field/vcode/vcode_pane', () => mockComponent('vcode_pane'));
			jest.mock('field/phone-number/locations', () => (\{
			  __esModule: true,
			  default: [['United Kingdom', 'UK', '+44']]
			\}));
			
			jest.mock('connection/passwordless/index', () => (\{
			  isEmail: jest.fn()
			\}));
			
			const getComponent = () => \{
			  const VCodeScreen = require('connection/passwordless/ask_vcode').default;
			  const screen = new VCodeScreen();
			  return screen.render();
			\};
			
			describe('AskVCode', () => \{
			  let lock;
			  let i18nProp;
			
			  beforeEach(() => \{
			    lock = I.fromJS(\{ id: '__lock-id__' \});
			
			    jest.resetModules();
			
			    const lang = I.fromJS(\{
			      passwordlessEmailCodeInstructions: 'An email with the code has been sent to %s.',
			      passwordlessSMSCodeInstructions: 'An SMS with the code has been sent to %s.'
			    \});
			
			    lock = set(lock, 'strings', lang);
			
			    i18nProp = \{
			      str: (keypath, ...args) => i18n.str(lock, keypath, args)
			    \};
			  \});
			
			  it('renders correctly when logging in with email', () => \{
			    require('connection/passwordless/index').isEmail.mockImplementation(() => true);
			
			    const Component = getComponent();
			    const l = setField(lock, 'email', 'test@user.com');
			
			    expectComponent(<Component model=\{l\} i18n=\{i18nProp\} />).toMatchSnapshot();
			  \});
			
			  it('renders correctly when logging in with a phone number', () => \{
			    require('connection/passwordless/index').isEmail.mockImplementation(() => false);
			
			    const Component = getComponent();
			    let l = setPhoneNumber(lock, '456 789');
			    l = initLocation(l, 'UK');
			
			    expectComponent(<Component model=\{l\} i18n=\{i18nProp\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\passwordless\\ask_vcode.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\connection\\passwordless\\email_sent_confirmation.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import I from 'immutable';
			
			import \{ expectComponent \} from 'testUtils';
			
			import EmailSentConfirmation from '../../../connection/passwordless/email_sent_confirmation';
			
			const lock = I.fromJS(\{ id: '__lock-id__' \});
			
			describe('EmailSentConfirmation', () => \{
			  it('renders correctly', async () => \{
			    expectComponent(<EmailSentConfirmation lock=\{lock\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\passwordless\\email_sent_confirmation.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\connection\\passwordless\\passwordless.actions.test.js', () => {
        const sourceCode = `
			import Immutable from 'immutable';
			import passwordless from 'connection/passwordless/actions';
			import \{ expectMockToMatch \} from 'testUtils';
			
			jest.useFakeTimers();
			
			describe('passwordless actions', () => \{
			  let mockFns;
			  let actions;
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('connection/passwordless/index', () => (\{
			      isEmail: jest.fn(),
			      isSendLink: jest.fn(),
			      resend: 'resend',
			      restartPasswordless: jest.fn(),
			      send: () => 'send',
			      setPasswordlessStarted: jest.fn(),
			      setResendFailed: jest.fn(),
			      setResendSuccess: jest.fn(),
			      toggleTermsAcceptance: jest.fn()
			    \}));
			    jest.mock('field/phone_number', () => (\{
			      phoneNumberWithDiallingCode: () => 'phoneNumberWithDiallingCode'
			    \}));
			    jest.mock('field/index', () => (\{
			      getFieldValue: (m, field) => field
			    \}));
			    jest.mock('core/web_api', () => (\{
			      startPasswordless: jest.fn(),
			      passwordlessVerify: jest.fn(),
			      getPasswordlessChallenge: jest.fn()
			    \}));
			    jest.mock('core/actions', () => (\{
			      closeLock: jest.fn(),
			      logIn: jest.fn(),
			      validateAndSubmit: jest.fn(),
			      logInSuccess: jest.fn()
			    \}));
			    jest.mock('i18n', () => (\{ html: (_, keys) => keys.join(',') \}));
			    jest.mock('core/index', () => (\{
			      id: () => 'id',
			      setSubmitting: jest.fn(m => m),
			      auth: \{
			        params: () => (\{
			          toJS: () => (\{
			            auth: 'params'
			          \})
			        \})
			      \},
			      emitAuthorizationErrorEvent: jest.fn(),
			      connections: jest.fn(),
			      useCustomPasswordlessConnection: jest.fn(() => false),
			      passwordlessCaptcha: jest.fn()
			    \}));
			    jest.mock('store/index', () => (\{
			      read: jest.fn(() => 'model'),
			      getEntity: 'getEntity',
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			
			    actions = require('connection/passwordless/actions');
			
			    require('core/index').connections.mockImplementation(() => Immutable.fromJS([]));
			  \});
			  describe('requestPasswordlessEmail()', () => \{
			    it('calls validateAndSubmit()', () => \{
			      actions.requestPasswordlessEmail('id');
			      expectMockToMatch(require('core/actions').validateAndSubmit, 1);
			    \});
			    it('calls startPasswordless', () => \{
			      actions.requestPasswordlessEmail('id');
			      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			      expectMockToMatch(require('core/web_api').startPasswordless, 1);
			    \});
			    it('calls startPasswordless with a custom email connection name', () => \{
			      actions.requestPasswordlessEmail('id');
			
			      require('core/index').connections.mockImplementation(() =>
			        Immutable.fromJS([
			          \{
			            name: 'custom-connection',
			            strategy: 'email',
			            type: 'passwordless'
			          \}
			        ])
			      );
			
			      require('core/index').useCustomPasswordlessConnection.mockReturnValue(true);
			
			      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			      expectMockToMatch(require('core/web_api').startPasswordless, 1);
			    \});
			    it('calls setPasswordlessStarted() on success', () => \{
			      actions.requestPasswordlessEmail('id');
			      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			
			      require('core/web_api').startPasswordless.mock.calls[0][2](null);
			
			      const \{ swap \} = require('store/index');
			      expectMockToMatch(swap, 1);
			
			      swap.mock.calls[0][3]('model');
			      expectMockToMatch(require('core/index').setSubmitting, 1);
			      expectMockToMatch(require('connection/passwordless/index').setPasswordlessStarted, 1);
			    \});
			    describe('normalizes the error message', () => \{
			      it('with a generic error', () => \{
			        actions.requestPasswordlessEmail('id');
			        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			        const error = new Error('foobar');
			        error.error = 'some_error_code';
			        require('core/web_api').startPasswordless.mock.calls[0][2](error);
			
			        jest.runAllTimers();
			
			        const \{ read, swap \} = require('store/index');
			        expectMockToMatch(read, 1);
			        expectMockToMatch(swap, 1);
			      \});
			      it('with a sms_provider_error error and description includes (Code: 21211)', () => \{
			        actions.requestPasswordlessEmail('id');
			        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			        const error = new Error('foobar');
			        error.error = 'sms_provider_error';
			        error.description = 'something (Code: 21211)';
			        require('core/web_api').startPasswordless.mock.calls[0][2](error);
			
			        jest.runAllTimers();
			
			        const \{ read, swap \} = require('store/index');
			        expectMockToMatch(swap, 1);
			      \});
			    \});
			  \});
			  describe('resendEmail()', () => \{
			    it('calls setResendSuccess() on success', () => \{
			      actions.resendEmail('id');
			
			      const \{ read, swap \} = require('store/index');
			      expectMockToMatch(read, 1);
			      expectMockToMatch(swap, 1);
			
			      require('core/web_api').startPasswordless.mock.calls[0][2](null);
			
			      swap.mock.calls[1][3]('model');
			      expectMockToMatch(require('connection/passwordless/index').setResendSuccess, 1);
			    \});
			    it('calls setResendFailed on error', () => \{
			      actions.resendEmail('id');
			
			      const \{ read, swap \} = require('store/index');
			      expectMockToMatch(read, 1);
			      expectMockToMatch(swap, 1);
			
			      require('core/web_api').startPasswordless.mock.calls[0][2](new Error('foobar'));
			      jest.runAllTimers();
			      swap.mock.calls[1][3]('model');
			      expectMockToMatch(require('connection/passwordless/index').setResendFailed, 1);
			    \});
			  \});
			  describe('sendSMS()', () => \{
			    it('calls validateAndSubmit()', () => \{
			      actions.sendSMS('id');
			      expectMockToMatch(require('core/actions').validateAndSubmit, 1);
			    \});
			    it('calls startPasswordless', () => \{
			      actions.sendSMS('id');
			      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			      expectMockToMatch(require('core/web_api').startPasswordless, 1);
			    \});
			    it('calls startPasswordless with a custom SMS connection', () => \{
			      actions.sendSMS('id');
			
			      require('core/index').connections.mockImplementation(() =>
			        Immutable.fromJS([
			          \{
			            name: 'custom-connection',
			            strategy: 'sms',
			            type: 'passwordless'
			          \}
			        ])
			      );
			
			      require('core/index').useCustomPasswordlessConnection.mockReturnValue(true);
			      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			
			      expectMockToMatch(require('core/web_api').startPasswordless, 1);
			    \});
			    it('calls setPasswordlessStarted() on success', () => \{
			      actions.sendSMS('id');
			      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			
			      require('core/web_api').startPasswordless.mock.calls[0][2](null);
			
			      const \{ swap \} = require('store/index');
			      expectMockToMatch(swap, 1);
			
			      swap.mock.calls[0][3]('model');
			      expectMockToMatch(require('core/index').setSubmitting, 1);
			      expectMockToMatch(require('connection/passwordless/index').setPasswordlessStarted, 1);
			    \});
			    describe('normalizes the error message', () => \{
			      it('with a generic error', () => \{
			        actions.sendSMS('id');
			        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			        const error = new Error('foobar');
			        error.error = 'some_error_code';
			        require('core/web_api').startPasswordless.mock.calls[0][2](error);
			
			        jest.runAllTimers();
			
			        const \{ read, swap \} = require('store/index');
			        expectMockToMatch(read, 1);
			        expectMockToMatch(swap, 1);
			      \});
			      it('with a sms_provider_error error and description includes (Code: 21211)', () => \{
			        actions.sendSMS('id');
			        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			        const error = new Error('foobar');
			        error.error = 'sms_provider_error';
			        error.description = 'something (Code: 21211)';
			        require('core/web_api').startPasswordless.mock.calls[0][2](error);
			
			        jest.runAllTimers();
			
			        const \{ read, swap \} = require('store/index');
			        expectMockToMatch(swap, 1);
			      \});
			      it('emits the "authorization_error" event', () => \{
			        actions.sendSMS('id');
			        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
			        const error = new Error('foobar');
			        error.error = 'some_error_code';
			        require('core/web_api').startPasswordless.mock.calls[0][2](error);
			
			        jest.runAllTimers();
			
			        expectMockToMatch(require('core/index').emitAuthorizationErrorEvent, 1);
			      \});
			    \});
			  \});
			  describe('login()', () => \{
			    it('sets setSubmitting to true', () => \{
			      actions.logIn('id');
			
			      const \{ read, swap \} = require('store/index');
			      expectMockToMatch(read, 1);
			      expectMockToMatch(swap, 1);
			    \});
			
			    it('calls webApi.passwordlessVerify() with sms options', () => \{
			      actions.logIn('id');
			      expectMockToMatch(require('core/web_api').passwordlessVerify, 1);
			    \});
			
			    it('calls webApi.passwordlessVerify() with email options', () => \{
			      require('connection/passwordless/index').isEmail = () => true;
			      actions.logIn('id');
			      expectMockToMatch(require('core/web_api').passwordlessVerify, 1);
			    \});
			
			    describe('on webApi.passwordlessVerify() callback', () => \{
			      describe('when there is an error', () => \{
			        it('formats the error', () => \{
			          actions.logIn('id');
			
			          const error = new Error('foobar');
			          error.error = 'some_error_code';
			          require('core/web_api').passwordlessVerify.mock.calls[0][2](error);
			
			          const \{ swap \} = require('store/index');
			          expectMockToMatch(swap, 2);
			        \});
			
			        it('emits the "authorization_error" event', () => \{
			          actions.logIn('id');
			
			          const error = new Error('foobar');
			          error.error = 'some_error_code';
			          require('core/web_api').passwordlessVerify.mock.calls[0][2](error);
			
			          expectMockToMatch(require('core/index').emitAuthorizationErrorEvent, 1);
			        \});
			      \});
			
			      it('calls logInSuccess on success', () => \{
			        actions.logIn('id');
			        require('core/web_api').passwordlessVerify.mock.calls[0][2](null, \{ result: true \});
			
			        expectMockToMatch(require('core/actions').logInSuccess, 1);
			      \});
			    \});
			  \});
			  describe('toggleTermsAcceptance()', () => \{
			    it('calls internalToggleTermsAcceptance()', () => \{
			      actions.toggleTermsAcceptance('id');
			
			      const \{ swap \} = require('store/index');
			      expectMockToMatch(swap, 1);
			
			      swap.mock.calls[0][3]('model');
			
			      expectMockToMatch(require('connection/passwordless/index').toggleTermsAcceptance, 1);
			    \});
			  \});
			  it('restart calls restartPasswordless', () => \{
			    actions.restart('id');
			
			    const \{ swap \} = require('store/index');
			    expectMockToMatch(swap, 1);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\passwordless\\passwordless.actions.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(23)
    });
    it('auth0_lock\\src\\__tests__\\connection\\passwordless\\passwordless.test.js', () => {
        const sourceCode = `
			import \{ expectMockToMatch \} from 'testUtils';
			
			describe('passwordless connection', () => \{
			  let mockFns;
			  beforeEach(() => \{
			    jest.resetModules();
			
			    mockFns = \{
			      get: jest.fn(),
			      initNS: jest.fn(),
			      tget: jest.fn(),
			      tremove: jest.fn(),
			      tset: jest.fn()
			    \};
			
			    jest.mock('utils/data_utils', () => (\{
			      dataFns: arr => \{
			        return mockFns;
			      \}
			    \}));
			    jest.mock('field/phone_number', () => (\{
			      initLocation: jest.fn()
			    \}));
			    jest.mock('core/web_api', () => (\{
			      getUserCountry: jest.fn()
			    \}));
			    jest.mock('sync', () => jest.fn());
			    jest.mock('core/index', () => (\{
			      id: () => 'id'
			    \}));
			  \});
			  describe('initPasswordless()', () => \{
			    let initPasswordless;
			    beforeEach(() => \{
			      initPasswordless = require('connection/passwordless/index').initPasswordless;
			    \});
			    describe('calls initNS ', () => \{
			      it('with send:code when opts.passwordlessMethod is undefined', () => \{
			        initPasswordless(null, \{\});
			        expectMockToMatch(mockFns.initNS, 1);
			      \});
			      it('with send:code when opts.passwordlessMethod is code', () => \{
			        initPasswordless(null, \{
			          passwordlessMethod: 'code'
			        \});
			        expectMockToMatch(mockFns.initNS, 1);
			      \});
			      it('with send:link when opts.passwordlessMethod is link', () => \{
			        initPasswordless(null, \{
			          passwordlessMethod: 'link'
			        \});
			        expectMockToMatch(mockFns.initNS, 1);
			      \});
			      it('with mustAcceptTerms:true when opts.mustAcceptTerms is true', () => \{
			        initPasswordless(null, \{
			          mustAcceptTerms: true
			        \});
			        expectMockToMatch(mockFns.initNS, 1);
			      \});
			      it('with mustAcceptTerms:false when opts.mustAcceptTerms is false', () => \{
			        initPasswordless(null, \{
			          mustAcceptTerms: false
			        \});
			        expectMockToMatch(mockFns.initNS, 1);
			      \});
			      it('with showTerms:true when opts.showTerms is undefined', () => \{
			        initPasswordless(null, \{\});
			        expectMockToMatch(mockFns.initNS, 1);
			      \});
			      it('with showTerms:true when opts.showTerms is true', () => \{
			        initPasswordless(null, \{
			          showTerms: true
			        \});
			        expectMockToMatch(mockFns.initNS, 1);
			      \});
			      it('with showTerms:false when opts.showTerms is false', () => \{
			        initPasswordless(null, \{
			          showTerms: false
			        \});
			        expectMockToMatch(mockFns.initNS, 1);
			      \});
			    \});
			    it('should load default location via options.defaultLocation', () => \{
			      initPasswordless(null, \{
			        defaultLocation: 'en'
			      \});
			      expectMockToMatch(require('field/phone_number').initLocation, 1);
			    \});
			    it('should call webAPI.getUserCountry when there is no default location', () => \{
			      initPasswordless(null, \{\});
			      const sync = require('sync');
			      expectMockToMatch(sync, 1);
			
			      const \{ syncFn, successFn \} = sync.mock.calls[0][2];
			      syncFn(null, 'cb');
			      expectMockToMatch(require('core/web_api').getUserCountry, 1);
			
			      successFn('model', 'en');
			      expectMockToMatch(require('field/phone_number').initLocation, 1);
			    \});
			  \});
			  describe('mustAcceptTerms()', () => \{
			    it('should return \`mustAcceptTerms\`', () => \{
			      require('connection/passwordless/index').mustAcceptTerms('model');
			      expectMockToMatch(mockFns.get, 1);
			    \});
			  \});
			  describe('toggleTermsAcceptance()', () => \{
			    it('should tset \`termsAccepted\` to false when \`termsAccepted\` is true', () => \{
			      mockFns.get.mockReturnValue(true);
			      require('connection/passwordless/index').toggleTermsAcceptance('model');
			      expectMockToMatch(mockFns.tset, 1);
			    \});
			    it('should tset \`termsAccepted\` to true when \`termsAccepted\` is false', () => \{
			      mockFns.get.mockReturnValue(false);
			      require('connection/passwordless/index').toggleTermsAcceptance('model');
			      expectMockToMatch(mockFns.tset, 1);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\connection\\passwordless\\passwordless.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(13)
    });
    it('auth0_lock\\src\\__tests__\\core\\actions.test.js', () => {
        const sourceCode = `
			import \{ checkSession, logIn \} from '../../core/actions';
			import \{ expectMockToMatch \} from 'testUtils';
			import * as l from 'core/index';
			import \{ read \} from 'store/index';
			import webApi from '../../core/web_api';
			import \{ fromJS \} from 'immutable';
			
			jest.mock('../../core/web_api', () => (\{
			  __esModule: true,
			  default: \{
			    logIn: jest.fn(),
			    checkSession: jest.fn()
			  \}
			\}));
			
			jest.mock('store/index', () => (\{
			  read: jest.fn(() => 'model'),
			  getEntity: 'getEntity',
			  swap: jest.fn(),
			  updateEntity: 'updateEntity',
			  read: jest.fn()
			\}));
			
			jest.mock('core/index');
			
			describe('core.actions', () => \{
			  beforeEach(() => \{
			    jest.resetAllMocks();
			
			    l.submitting.mockReturnValue(true);
			    l.id.mockReturnValue('id');
			    l.auth.params.mockReturnValue(fromJS(\{\}));
			  \});
			
			  describe('checkSession', () => \{
			    it('should set submitting on start', () => \{
			      checkSession('id', 'params', 'cb');
			      const \{ read, swap \} = require('store/index');
			      expectMockToMatch(read, 1);
			      expectMockToMatch(swap, 1);
			      swap.mock.calls[0][3]('model');
			      expectMockToMatch(require('core/index').setSubmitting, 1);
			    \});
			  \});
			
			  describe('logIn', () => \{
			    it('run the loggingIn hook', done => \{
			      const m = \{\};
			      read.mockReturnValue(m);
			
			      webApi.logIn.mockImplementation((id, params, authParams, cb) => \{
			        cb(null, \{\});
			        done();
			      \});
			
			      l.runHook.mockImplementation((m, hook, context, fn) => \{
			        expect(hook).toEqual('loggingIn');
			        fn();
			      \});
			
			      logIn();
			    \});
			
			    it('should display an error if one was thrown from the hook', done => \{
			      const m = \{\};
			      read.mockReturnValue(m);
			
			      const store = require('store/index');
			
			      store.swap.mockImplementation((entity, n, id, fn, value, error) => \{
			        if (error) \{
			          expect(error).toEqual('This is a hook error');
			          done();
			        \}
			      \});
			
			      l.loginErrorMessage.mockImplementation((m, error) => error.description);
			
			      l.runHook.mockImplementation((m, hook, fn) => \{
			        expect(hook).toEqual('loggingIn');
			        throw \{ code: 'hook_error', description: 'This is a hook error' \};
			      \});
			
			      logIn();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\actions.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\src\\__tests__\\core\\client\\index.test.js', () => {
        const sourceCode = `
			import Immutable from 'immutable';
			import \{ initClient \} from '../../../core/client';
			
			describe('core/client/index', () => \{
			  describe('initClient', () => \{
			    ['none', 'low', 'fair', 'good', 'excellent'].forEach(policy => \{
			      it(\`loads password policy '\$\{policy\}' correctly without a password_complexity_options option\`, () => \{
			        const client = \{
			          strategies: [
			            \{
			              name: 'auth0',
			              connections: [
			                \{
			                  name: 'Username-Password-Authentication',
			                  passwordPolicy: policy
			                \}
			              ]
			            \}
			          ]
			        \};
			        const result = initClient(Immutable.fromJS(\{\}), client).toJS();
			        expect(result.client.connections.database[0].passwordPolicy.length).toMatchSnapshot();
			      \});
			      it(\`loads password policy '\$\{policy\}' correctly with a password_complexity_options option\`, () => \{
			        const client = \{
			          strategies: [
			            \{
			              name: 'auth0',
			              connections: [
			                \{
			                  name: 'Username-Password-Authentication',
			                  passwordPolicy: policy,
			                  password_complexity_options: \{ min_length: 4 \}
			                \}
			              ]
			            \}
			          ]
			        \};
			        const result = initClient(Immutable.fromJS(\{\}), client).toJS();
			        expect(result.client.connections.database[0].passwordPolicy.length).toMatchSnapshot();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\client\\index.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\core\\index.test.js', () => {
        const sourceCode = `
			import Immutable from 'immutable';
			import \{ dataFns \} from '../../utils/data_utils';
			import \{ clientID, domain, loginErrorMessage \} from '../../core/index';
			import \{ initI18n \} from '../../i18n';
			import \{ setURL \} from '../testUtils';
			
			const setResolvedConnection = (...params) => require('core/index').setResolvedConnection(...params);
			const setup = (...params) => require('core/index').setup(...params);
			
			const mockLock = 'm';
			let mockSet;
			let mockInit;
			
			jest.mock('i18n', () => (\{
			  initI18n: jest.fn(),
			  html: (...keys) => keys.join()
			\}));
			
			jest.mock('utils/data_utils', () => (\{
			  dataFns: () => (\{
			    get: jest.fn(),
			    set: mockSet,
			    init: mockInit
			  \})
			\}));
			
			describe('setup', () => \{
			  beforeEach(() => \{
			    mockInit = jest.fn();
			    jest.resetModules();
			  \});
			
			  it('default redirectUrl should not include location.hash', () => \{
			    setURL('https://test.com/path/#not-this-part');
			    const options = \{\};
			    setup('id', 'clientID', 'domain', options, 'hookRunner', 'emitEventFn');
			    const \{ mock \} = mockInit;
			    expect(mock.calls.length).toBe(1);
			    const model = mock.calls[0][1].toJS();
			    expect(model.auth.redirectUrl).toBe('https://test.com/path/');
			  \});
			
			  it.only('default redirectUrl should work when \`window.location.origin\` is not available', () => \{
			    jsdom.reconfigure(\{
			      url: 'https://test.com/path/#not-this-part'
			    \});
			
			    const options = \{\};
			    setup('id', 'clientID', 'domain', options, 'hookRunner', 'emitEventFn');
			    const \{ mock \} = mockInit;
			    expect(mock.calls.length).toBe(1);
			    const model = mock.calls[0][1].toJS();
			    expect(model.auth.redirectUrl).toBe('https://test.com/path/');
			  \});
			
			  it('should work with redirect:false and responseType:id_token', () => \{
			    const options = \{
			      auth: \{
			        redirect: false,
			        responseType: 'id_token'
			      \}
			    \};
			
			    setup('id', 'clientID', 'domain', options, 'hookRunner', 'emitEventFn', 'handleEventFn');
			    const \{ mock \} = mockInit;
			    expect(mock.calls.length).toBe(1);
			    const model = mock.calls[0][1].toJS();
			    expect(model).toMatchSnapshot();
			  \});
			
			  describe('clientBaseUrl', () => \{
			    it('should default to the specified domain', () => \{
			      const \{ mock \} = mockInit;
			
			      setup(
			        'id',
			        'clientID',
			        'my-tenant.us.auth0.com',
			        \{\},
			        'hookRunner',
			        'emitEventFn',
			        'handleEventFn'
			      );
			
			      expect(mock.calls.length).toBe(1);
			
			      const model = mock.calls[0][1].toJS();
			      expect(model.clientBaseUrl).toBe('https://my-tenant.us.auth0.com');
			    \});
			
			    it('should use the clientBaseUrl option if given', () => \{
			      const \{ mock \} = mockInit;
			
			      setup(
			        'id',
			        'clientID',
			        'my-tenant.us.auth0.com',
			        \{
			          clientBaseUrl: 'https://client-base-url.example.com',
			          configurationBaseUrl: 'https://config-base-url.example.com',
			          assetsUrl: 'https://assets-url.example.com'
			        \},
			        'hookRunner',
			        'emitEventFn',
			        'handleEventFn'
			      );
			
			      expect(mock.calls.length).toBe(1);
			
			      const model = mock.calls[0][1].toJS();
			      expect(model.clientBaseUrl).toBe('https://client-base-url.example.com');
			    \});
			
			    it('should use configurationBaseUrl if given', () => \{
			      const \{ mock \} = mockInit;
			
			      setup(
			        'id',
			        'clientID',
			        'my-tenant.us.auth0.com',
			        \{
			          configurationBaseUrl: 'https://config-base-url.example.com',
			          assetsUrl: 'https://assets-url.example.com'
			        \},
			        'hookRunner',
			        'emitEventFn',
			        'handleEventFn'
			      );
			
			      expect(mock.calls.length).toBe(1);
			
			      const model = mock.calls[0][1].toJS();
			      expect(model.clientBaseUrl).toBe('https://config-base-url.example.com');
			    \});
			
			    it('should use assetsUrl if given', () => \{
			      const \{ mock \} = mockInit;
			
			      setup(
			        'id',
			        'clientID',
			        'my-tenant.us.auth0.com',
			        \{
			          assetsUrl: 'https://assets-url.example.com'
			        \},
			        'hookRunner',
			        'emitEventFn',
			        'handleEventFn'
			      );
			
			      expect(mock.calls.length).toBe(1);
			
			      const model = mock.calls[0][1].toJS();
			      expect(model.clientBaseUrl).toBe('https://assets-url.example.com');
			    \});
			  \});
			
			  describe('tenantBaseUrl', () => \{
			    it('should default to domain URL when using auth0.com', () => \{
			      const \{ mock \} = mockInit;
			
			      setup(
			        'id',
			        'clientID',
			        'my-tenant.us.auth0.com',
			        \{
			          __useTenantInfo: true
			        \},
			        'hookRunner',
			        'emitEventFn',
			        'handleEventFn'
			      );
			
			      expect(mock.calls.length).toBe(1);
			
			      const model = mock.calls[0][1].toJS();
			      expect(model.tenantBaseUrl).toBe('https://my-tenant.us.auth0.com/tenants/v1/my-tenant.js');
			    \});
			
			    it('should default to domain URL when using a custom domain', () => \{
			      const \{ mock \} = mockInit;
			
			      setup(
			        'id',
			        'clientID',
			        'auth.my-tenant.com',
			        \{
			          __useTenantInfo: true
			        \},
			        'hookRunner',
			        'emitEventFn',
			        'handleEventFn'
			      );
			
			      expect(mock.calls.length).toBe(1);
			
			      const model = mock.calls[0][1].toJS();
			      expect(model.tenantBaseUrl).toBe('https://auth.my-tenant.com/info-v1.js');
			    \});
			
			    it('should use configurationBaseUrl if specified', () => \{
			      const \{ mock \} = mockInit;
			
			      setup(
			        'id',
			        'clientID',
			        'auth.my-tenant.com',
			        \{
			          __useTenantInfo: true,
			          configurationBaseUrl: 'https://config-base-url.com'
			        \},
			        'hookRunner',
			        'emitEventFn',
			        'handleEventFn'
			      );
			
			      expect(mock.calls.length).toBe(1);
			
			      const model = mock.calls[0][1].toJS();
			      expect(model.tenantBaseUrl).toBe('https://config-base-url.com/info-v1.js');
			    \});
			
			    it('should use configurationBaseUrl with a custom tenant if specified', () => \{
			      const \{ mock \} = mockInit;
			
			      setup(
			        'id',
			        'clientID',
			        'auth.my-tenant.com',
			        \{
			          __useTenantInfo: true,
			          configurationBaseUrl: 'https://config-base-url.com',
			          overrides: \{
			            __tenant: 'custom-tenant'
			          \}
			        \},
			        'hookRunner',
			        'emitEventFn',
			        'handleEventFn'
			      );
			
			      expect(mock.calls.length).toBe(1);
			
			      const model = mock.calls[0][1].toJS();
			      expect(model.tenantBaseUrl).toBe('https://config-base-url.com/tenants/v1/custom-tenant.js');
			    \});
			  \});
			\});
			
			describe('setResolvedConnection', () => \{
			  beforeEach(() => \{
			    mockSet = jest.fn();
			    jest.resetModules();
			  \});
			  it('sets undefined when is called with undefined', () => \{
			    setResolvedConnection(mockLock, undefined);
			    expect(mockSet.mock.calls.length).toBe(1);
			    expect(mockSet.mock.calls[0]).toMatchSnapshot();
			  \});
			  it('validates format', () => \{
			    expect(() => setResolvedConnection(mockLock, \{\})).toThrowErrorMatchingSnapshot();
			    expect(() => setResolvedConnection(mockLock, \{ type: 'foo' \})).toThrowErrorMatchingSnapshot();
			    expect(() => setResolvedConnection(mockLock, \{ name: 'bar' \})).toThrowErrorMatchingSnapshot();
			  \});
			  it('accepts only database connections', () => \{
			    expect(() =>
			      setResolvedConnection(mockLock, \{ type: 'foo', name: 'bar' \})
			    ).toThrowErrorMatchingSnapshot();
			  \});
			  it('sets the connection', () => \{
			    setResolvedConnection(mockLock, \{ type: 'database', name: 'bar' \});
			    expect(mockSet.mock.calls.length).toBe(1);
			    expect(mockSet.mock.calls[0]).toMatchSnapshot();
			  \});
			  it('sets the connection as a Map instance', () => \{
			    setResolvedConnection(mockLock, \{ type: 'database', name: 'bar' \});
			    expect(mockSet.mock.calls.length).toBe(1);
			    expect(Immutable.Map.isMap(mockSet.mock.calls[0][2])).toBe(true);
			  \});
			\});
			
			describe('loginErrorMessage', () => \{
			  it('maps \`password_expired\` to \`password_change_required\`', () => \{
			    const result = loginErrorMessage(mockLock, \{ code: 'password_expired' \}, 'type');
			
			    expect(result).toBe([mockLock, 'error', 'login', 'password_change_required'].join());
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\index.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(16)
    });
    it('auth0_lock\\src\\__tests__\\core\\remote_data.test.js', () => {
        const sourceCode = `
			import * as l from '../../core/index';
			
			const getSyncRemoteData = () => require('core/remote_data').syncRemoteData;
			
			jest.mock('sync', () => jest.fn());
			
			jest.mock('connection/enterprise', () => (\{
			  isADEnabled: () => true
			\}));
			
			jest.mock('core/index', () => (\{
			  useTenantInfo: () => true,
			  id: () => 'id',
			  emitEvent: jest.fn()
			\}));
			
			jest.mock('core/sso/data', () => (\{
			  fetchSSOData: jest.fn((id, adEnabled, cb) => cb(null, \{\}))
			\}));
			
			describe('remote_data.syncRemoteData()', () => \{
			  beforeEach(() => \{
			    jest.clearAllMocks();
			  \});
			
			  describe('calls getSSOData with AD information', () => \{
			    [true, false].forEach(isAdEnabled => \{
			      it(\`when isADEnabled is \$\{isAdEnabled\}\`, () => \{
			        require('connection/enterprise').isADEnabled = () => isAdEnabled;
			
			        const syncRemoteData = getSyncRemoteData();
			        syncRemoteData();
			
			        const ssoCall = require('sync').mock.calls.find(c => c[1] === 'sso');
			        ssoCall[2].syncFn('model', jest.fn());
			
			        const [, sendADInformation, ,] = require('core/sso/data').fetchSSOData.mock.calls[0];
			
			        expect(sendADInformation).toBe(isAdEnabled);
			        expect(l.emitEvent).toHaveBeenCalledWith('model', 'ssodata fetched', expect.anything());
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\remote_data.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\core\\signed_in_confirmation.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import I from 'immutable';
			
			import \{ expectComponent \} from 'testUtils';
			
			import SignedInConfirmation from '../../core/signed_in_confirmation';
			
			const lock = I.fromJS(\{ id: '__lock-id__' \});
			
			describe('SignedInConfirmation', () => \{
			  it('renders correctly', async () => \{
			    expectComponent(<SignedInConfirmation lock=\{lock\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\signed_in_confirmation.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\core\\sso\\last_login_screen.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			import Immutable from 'immutable';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent, setURL \} from 'testUtils';
			
			jest.mock('ui/pane/quick_auth_pane', () => mockComponent('quick_auth_pane'));
			
			//there's a circular dependency with this module, so we need to mock it
			jest.mock('engine/classic');
			
			const getComponent = () => \{
			  const LastLoginScreen = require('core/sso/last_login_screen').default;
			  const screen = new LastLoginScreen();
			  return screen.render();
			\};
			
			describe('LastLoginScreen', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('quick-auth/actions', () => (\{
			      logIn: jest.fn(),
			      checkSession: jest.fn(),
			      skipQuickAuth: jest.fn()
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 'id',
			      domain: () => 'me.auth0.com'
			    \}));
			
			    jest.mock('core/sso/index', () => (\{
			      lastUsedConnection: () => (\{
			        get: () => 'lastUsedConnection'
			      \}),
			      lastUsedUsername: () => 'lastUsedUsername'
			    \}));
			
			    jest.mock('connection/social/index', () => (\{
			      STRATEGIES: \{
			        twitter: 'Twitter'
			      \},
			      authButtonsTheme: () => (\{
			        get: () => undefined
			      \})
			    \}));
			  \});
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(','),
			      group: (...keys) => keys.join(','),
			      html: (...keys) => keys.join(',')
			    \},
			    model: 'model'
			  \};
			  it('renders correctly', () => \{
			    const Component = getComponent();
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders with custom connection theme', () => \{
			    require('connection/social/index').authButtonsTheme = () => (\{
			      get: () =>
			        Immutable.fromJS(\{
			          primaryColor: 'primaryColor',
			          foregroundColor: 'foregroundColor',
			          icon: 'icon'
			        \})
			    \});
			    const Component = getComponent();
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  describe('renders correct icon', () => \{
			    const testStrategy = strategy => \{
			      it(\`when strategy is \$\{strategy\}\`, () => \{
			        require('core/sso/index').lastUsedConnection = () =>
			          Immutable.fromJS(\{
			            strategy
			          \});
			        const Component = getComponent();
			        expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			      \});
			    \};
			    const testStrategyName = 'this-strategy-exists';
			    require('connection/social/index').STRATEGIES = \{
			      [testStrategyName]: 'Test Strategy'
			    \};
			    const strategies = [
			      testStrategyName,
			      'google-apps',
			      'adfs',
			      'office365',
			      'waad',
			      'some-other-strategy'
			    ].forEach(testStrategy);
			
			    it(\`when strategy is empty, use name instead\`, () => \{
			      require('core/sso/index').lastUsedConnection = () =>
			        Immutable.fromJS(\{
			          name: testStrategyName
			        \});
			      const Component = getComponent();
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			  \});
			  describe('renders correct buttonLabel', () => \{
			    it('uses SOCIAL_STRATEGY mapping when there is not a lastUsedUsername', () => \{
			      require('core/sso/index').lastUsedConnection = () => (\{
			        get: () => 'twitter'
			      \});
			      require('core/sso/index').lastUsedUsername = () => undefined;
			      const Component = getComponent();
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('uses lastUsedConnectionName when there is not a lastUsedUsername and no SOCIAL_STRATEGY mapping', () => \{
			      require('core/sso/index').lastUsedUsername = () => undefined;
			      const Component = getComponent();
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			  \});
			  it('calls checkSession in the buttonClickHandler when outside of the universal login page', () => \{
			    setURL('https://other-url.auth0.com');
			    const Component = getComponent();
			    const wrapper = mount(<Component \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			    props.buttonClickHandler();
			    const \{ mock \} = require('quick-auth/actions').checkSession;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0][0]).toBe('id');
			    expect(mock.calls[0][1].get()).toBe('lastUsedConnection');
			    expect(mock.calls[0][2]).toBe('lastUsedUsername');
			  \});
			  it('calls logIn in the buttonClickHandler when inside of the universal login page', () => \{
			    setURL('https://me.auth0.com');
			    const Component = getComponent();
			    const wrapper = mount(<Component \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			    props.buttonClickHandler();
			    const \{ mock \} = require('quick-auth/actions').logIn;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0][0]).toBe('id');
			    expect(mock.calls[0][1].get()).toBe('lastUsedConnection');
			    expect(mock.calls[0][2]).toBe('lastUsedUsername');
			  \});
			  it('calls skipQuickAuth in the alternativeClickHandler', () => \{
			    const Component = getComponent();
			    const wrapper = mount(<Component \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			    props.alternativeClickHandler();
			    const \{ mock \} = require('quick-auth/actions').skipQuickAuth;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0][0]).toBe('id');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\sso\\last_login_screen.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('auth0_lock\\src\\__tests__\\core\\tenant.test.js', () => {
        const sourceCode = `
			const getInitTenant = () => require('core/tenant/index').initTenant;
			
			const CLIENT_ID = 'client_id';
			
			const runTest = (initTenant, mockDataFns, client) => \{
			  initTenant(\{\}, CLIENT_ID, client);
			  expect(mockDataFns.initNS.mock.calls.length).toBe(1);
			  const tenantInfo = mockDataFns.initNS.mock.calls[0][1].toJS();
			  expect(tenantInfo).toMatchSnapshot();
			\};
			
			describe('initTenant()', () => \{
			  let initTenant;
			  let mockDataFns;
			  beforeEach(() => \{
			    jest.resetModules();
			
			    mockDataFns = \{
			      initNS: jest.fn(),
			      get: jest.fn()
			    \};
			    jest.mock('utils/data_utils', () => (\{
			      dataFns: () => mockDataFns
			    \}));
			
			    jest.mock('core/index', () => (\{
			      findConnection: jest.fn()
			    \}));
			    initTenant = getInitTenant();
			  \});
			  describe('with database connection', () => \{
			    it('maps connection correctly with defaults', () => \{
			      const client = \{
			        connections: \{
			          database: [
			            \{
			              name: 'test-connection-database',
			              strategy: 'auth0'
			            \}
			          ]
			        \}
			      \};
			      runTest(initTenant, mockDataFns, client);
			    \});
			    it('maps connection correctly with all the properties', () => \{
			      const client = \{
			        connections: \{
			          database: [
			            \{
			              allowForgot: false,
			              allowSignup: false,
			              name: 'test-connection-database',
			              requiresUsername: true,
			              strategy: 'auth0',
			              validation: \{
			                username: \{
			                  min: 4,
			                  max: 5
			                \}
			              \}
			            \}
			          ]
			        \}
			      \};
			      runTest(initTenant, mockDataFns, client);
			    \});
			    it('maps password policy correctly', () => \{
			      const client = \{
			        connections: \{
			          database: [
			            \{
			              allowForgot: false,
			              allowSignup: false,
			              name: 'test-connection-database',
			              requiresUsername: true,
			              strategy: 'auth0',
			              validation: \{
			                passwordPolicy: 'low', //minLength: 6
			                username: \{
			                  min: 4,
			                  max: 5
			                \}
			              \}
			            \}
			          ]
			        \}
			      \};
			      runTest(initTenant, mockDataFns, client);
			    \});
			    it('fixes validation when values are not numbers', () => \{
			      const client = \{
			        connections: \{
			          database: [
			            \{
			              allowForgot: false,
			              allowSignup: false,
			              name: 'test-connection-database',
			              requiresUsername: true,
			              strategy: 'auth0',
			              validation: \{
			                username: \{
			                  min: 'foo',
			                  max: 'bar'
			                \}
			              \}
			            \}
			          ]
			        \}
			      \};
			      runTest(initTenant, mockDataFns, client);
			    \});
			    it('fixes validation when username.min > username.max', () => \{
			      const client = \{
			        connections: \{
			          database: [
			            \{
			              allowForgot: false,
			              allowSignup: false,
			              name: 'test-connection-database',
			              requiresUsername: true,
			              strategy: 'auth0',
			              validation: \{
			                username: \{
			                  min: 5,
			                  max: 4
			                \}
			              \}
			            \}
			          ]
			        \}
			      \};
			      runTest(initTenant, mockDataFns, client);
			    \});
			  \});
			  describe('with enterprise connection', () => \{
			    it('maps connection correctly', () => \{
			      const client = \{
			        connections: \{
			          enterprise: [
			            \{
			              name: 'test-connection-enterprise',
			              domains: 'domains',
			              strategy: 'auth0'
			            \}
			          ]
			        \}
			      \};
			      runTest(initTenant, mockDataFns, client);
			    \});
			  \});
			  describe('with other connection types', () => \{
			    it('maps connection correctly', () => \{
			      const client = \{
			        connections: \{
			          social: [
			            \{
			              name: 'test-connection-other_type',
			              strategy: 'auth0'
			            \}
			          ],
			          unknown: [
			            \{
			              name: '??',
			              strategy: '??'
			            \}
			          ]
			        \}
			      \};
			      runTest(initTenant, mockDataFns, client);
			    \});
			  \});
			  describe('with passwordless connection', () => \{
			    it('maps connection correctly', () => \{
			      const client = \{
			        connections: \{
			          passwordless: [
			            \{
			              name: 'sms',
			              strategy: 'sms'
			            \}
			          ]
			        \}
			      \};
			      runTest(initTenant, mockDataFns, client);
			    \});
			  \});
			  test('filters clientConnections', () => \{
			    const client = \{
			      connections: \{
			        database: [
			          \{
			            name: 'test-connection-database',
			            strategy: 'auth0'
			          \},
			          \{
			            name: 'test-not-this-one',
			            strategy: 'auth0'
			          \}
			        ]
			      \},
			      clientsConnections: \{
			        [CLIENT_ID]: ['test-connection-database']
			      \}
			    \};
			    runTest(initTenant, mockDataFns, client);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\tenant.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('auth0_lock\\src\\__tests__\\core\\web_api\\helper.test.js', () => {
        const sourceCode = `
			import \{ webAuthOverrides, normalizeError \} from 'core/web_api/helper';
			
			describe('webAuthOverrides', () => \{
			  it('should return overrides if any field is compatible with WebAuth', function() \{
			    expect(
			      webAuthOverrides(\{
			        __tenant: 'tenant1',
			        __token_issuer: 'issuer1',
			        __jwks_uri: 'https://jwks.com'
			      \})
			    ).toMatchSnapshot();
			  \});
			
			  it('should omit overrides that are not compatible with WebAuth', function() \{
			    expect(
			      webAuthOverrides(\{
			        __tenant: 'tenant1',
			        __token_issuer: 'issuer1',
			        __jwks_uri: 'https://jwks.com',
			        backgroundColor: 'blue'
			      \})
			    ).toMatchSnapshot();
			  \});
			
			  it('should return null if no fields are compatible with WebAuth', function() \{
			    expect(webAuthOverrides(\{ backgroundColor: 'blue' \})).toBe(null);
			  \});
			\});
			
			describe('normalizeError', () => \{
			  it('does nothing when there is no error', () => \{
			    const normalized = normalizeError(undefined);
			    expect(normalized).toBe(undefined);
			  \});
			
			  describe('access_denied to invalid_user_password mapping', function() \{
			    const domainMock = 'domainMock';
			    const errorObjWithError = \{
			      error: 'access_denied',
			      description: 'foobar'
			    \};
			    const errorObjWithCode = \{
			      code: 'access_denied',
			      description: 'foobar'
			    \};
			    let currentWindowObj;
			
			    beforeAll(function() \{
			      currentWindowObj = window.window;
			      window.window = \{
			        locaction: \{
			          host: domainMock
			        \}
			      \};
			    \});
			
			    afterAll(function() \{
			      window.window = currentWindowObj;
			    \});
			
			    describe('domain is undefined', function() \{
			      it('should map access_denied error to invalid_user_password when error.error === access_denied', () => \{
			        const actualError = normalizeError(errorObjWithError);
			        expect(actualError).toMatchSnapshot();
			      \});
			      it('should map access_denied error to invalid_user_password when error.code === access_denied', () => \{
			        const actualError = normalizeError(errorObjWithCode);
			        expect(actualError).toMatchSnapshot();
			      \});
			    \});
			
			    describe("domain doesn't match current host", function() \{
			      it('should map access_denied error to invalid_user_password when error.error === access_denied', () => \{
			        const actualError = normalizeError(errorObjWithError, 'loremIpsum');
			        expect(actualError).toMatchSnapshot();
			      \});
			      it('should map access_denied error to invalid_user_password when error.code === access_denied', () => \{
			        const actualError = normalizeError(errorObjWithCode, 'loremIpsum');
			        expect(actualError).toMatchSnapshot();
			      \});
			    \});
			
			    describe('domain match current host', function() \{
			      it('should not map access_denied error to invalid_user_password when error.error === access_denied', () => \{
			        const actualError = normalizeError(errorObjWithError, domainMock);
			        expect(actualError).toMatchSnapshot();
			      \});
			      it('should not map access_denied error to invalid_user_password when error.code === access_denied', () => \{
			        const actualError = normalizeError(errorObjWithCode, domainMock);
			        expect(actualError).toMatchSnapshot();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\web_api\\helper.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('auth0_lock\\src\\__tests__\\core\\web_api\\p2_api.test.js', () => {
        const sourceCode = `
			import \{ setURL \} from 'testUtils';
			
			jest.mock('auth0-js');
			
			const getClient = (options = \{\}) => \{
			  const lockId = 'lockId';
			  const clientId = 'cid';
			  const domain = 'me.auth0.com';
			  const Auth0APIClient = require('core/web_api/p2_api').default;
			  const client = new Auth0APIClient(lockId, clientId, domain, options);
			  client.client.popup = \{
			    authorize: jest.fn(),
			    loginWithCredentials: jest.fn()
			  \};
			  client.client.client = \{
			    login: jest.fn(),
			    signup: jest.fn(),
			    changePassword: jest.fn(),
			    passwordlessStart: jest.fn(),
			    passwordlessLogin: jest.fn(),
			    getUserCountry: jest.fn(),
			    getSSOData: jest.fn()
			  \};
			  return client;
			\};
			
			const getAuth0ClientMock = () => require('auth0-js');
			const assertCallWithCallback = (mock, callbackFunction) => \{
			  expect(mock.calls.length).toBe(1);
			  expect(mock.calls[0][0]).toMatchSnapshot();
			  mock.calls[0][1]();
			  expect(callbackFunction.mock.calls.length).toBe(1);
			\};
			describe('Auth0APIClient', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			    require('auth0-js').version.raw = 'a0js.version';
			    require('core/web_api/helper').getVersion = () => 'lock.version';
			  \});
			  describe('init', () => \{
			    describe('with overrides', () => \{
			      it('always uses telemetry set in the \`auth0Client\` query param and inside the ULP', () => \{
			        const telemetryIn = \{ name: 'test-sdk', version: '1.0.0', env: \{ envOverride: true \} \};
			        setURL(\`https://me.auth0.com/authorize?auth0Client=\$\{btoa(JSON.stringify(telemetryIn))\}\`);
			        const options = \{
			          audience: 'foo',
			          redirectUrl: '//localhost:8080/login/callback',
			          responseMode: 'query',
			          responseType: 'code',
			          leeway: 30,
			          _telemetryInfo: \{ ignored: true \}
			        \};
			        getClient(options);
			        const mock = getAuth0ClientMock();
			        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo).toMatchSnapshot();
			      \});
			      it('overrides telemetry when outside the ULP', () => \{
			        setURL(\`https://auth.myapp.com/authorize\`);
			        const options = \{
			          audience: 'foo',
			          redirectUrl: '//localhost:8080/login/callback',
			          responseMode: 'query',
			          responseType: 'code',
			          leeway: 30,
			          _telemetryInfo: \{ name: 'test-sdk', version: '1.0.0', env: \{ envOverride: true \} \}
			        \};
			        getClient(options);
			        const mock = getAuth0ClientMock();
			        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo).toMatchSnapshot();
			      \});
			      it('uses default telemetry key when outside the ULP', () => \{
			        setURL(\`https://auth.myapp.com/authorize\`);
			        getClient();
			        const mock = getAuth0ClientMock();
			        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo.name).toEqual('lock.js');
			        expect(Object.keys(mock.WebAuth.mock.calls[0][0]._telemetryInfo.env)).toContain('auth0.js');
			      \});
			      it('overrides auth0.js telemetry key', () => \{
			        setURL(\`https://auth.myapp.com/authorize\`);
			        const options = \{
			          audience: 'foo',
			          redirectUrl: '//localhost:8080/login/callback',
			          responseMode: 'query',
			          responseType: 'code',
			          leeway: 30,
			          _telemetryInfo: \{
			            name: 'test-sdk',
			            version: '1.0.0',
			            env: \{ 'auth0.js': 'this-will-be-overriden' \}
			          \}
			        \};
			        getClient(options);
			        const mock = getAuth0ClientMock();
			        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo.env['auth0.js']).toBe('a0js.version');
			      \});
			      it('uses different telemetry key when inside the ULP', () => \{
			        setURL('https://me.auth0.com/');
			        getClient();
			        const mock = getAuth0ClientMock();
			        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo.name).toEqual('lock.js-ulp');
			        expect(Object.keys(mock.WebAuth.mock.calls[0][0]._telemetryInfo.env)).toContain(
			          'auth0.js-ulp'
			        );
			      \});
			      it('forwards options to WebAuth', () => \{
			        setURL(\`https://auth.myapp.com/authorize\`);
			        const options = \{
			          audience: 'foo',
			          redirectUrl: '//localhost:8080/login/callback',
			          responseMode: 'query',
			          responseType: 'code',
			          leeway: 30,
			          overrides: \{
			            __tenant: 'tenant1',
			            __token_issuer: 'issuer1',
			            __jwks_uri: 'https://jwks.com'
			          \},
			          plugins: [
			            \{
			              name: 'ExamplePlugin'
			            \}
			          ],
			          params: \{
			            nonce: 'nonce',
			            state: 'state',
			            scope: 'custom_scope'
			          \}
			        \};
			        const client = getClient(options);
			        const mock = getAuth0ClientMock();
			        expect(mock.WebAuth.mock.calls[0][0]).toMatchSnapshot();
			      \});
			
			      it('forwards options to WebAuth with a default leeway', () => \{
			        setURL(\`https://auth.myapp.com/authorize\`);
			        const options = \{
			          audience: 'foo',
			          redirectUrl: '//localhost:8080/login/callback',
			          responseMode: 'query',
			          responseType: 'code',
			          overrides: \{
			            __tenant: 'tenant1',
			            __token_issuer: 'issuer1',
			            __jwks_uri: 'https://jwks.com'
			          \},
			          plugins: [
			            \{
			              name: 'ExamplePlugin'
			            \}
			          ],
			          params: \{
			            nonce: 'nonce',
			            state: 'state',
			            scope: 'custom_scope'
			          \}
			        \};
			        const client = getClient(options);
			        const mock = getAuth0ClientMock();
			        expect(mock.WebAuth.mock.calls[0][0]).toMatchSnapshot();
			      \});
			    \});
			
			    describe('should set authOpt according options', () => \{
			      it('should set sso:true when inside the universal login page', () => \{
			        setURL('https://me.auth0.com/');
			        const options = \{
			          sso: true
			        \};
			        const client = getClient(options);
			        expect(client.authOpt.sso).toBe(true);
			      \});
			      it('should set sso:false when inside the universal login page', () => \{
			        setURL('https://me.auth0.com/');
			        const options = \{
			          sso: false
			        \};
			        const client = getClient(options);
			        expect(client.authOpt.sso).toBe(false);
			      \});
			      it('should set sso:undefined when outside the universal login page', () => \{
			        setURL('https://other-url.auth0.com/');
			        const options = \{\};
			        const client = getClient(options);
			        expect(client.authOpt.sso).toBe(undefined);
			      \});
			      it('should set state from options.state', () => \{
			        const client = getClient(\{
			          state: 'foo'
			        \});
			        expect(client.authOpt.state).toBe('foo');
			      \});
			      it('should set state from options.params.state', () => \{
			        const client = getClient(\{
			          params: \{
			            state: 'foo'
			          \}
			        \});
			        expect(client.authOpt.state).toBe('foo');
			      \});
			      it('options.params.state should prevail over options.state', () => \{
			        const client = getClient(\{
			          state: 'bar',
			          params: \{
			            state: 'foo'
			          \}
			        \});
			        expect(client.authOpt.state).toBe('foo');
			      \});
			      it('should set nonce from options.nonce', () => \{
			        const client = getClient(\{
			          nonce: 'foo'
			        \});
			        expect(client.authOpt.nonce).toBe('foo');
			      \});
			      it('should set nonce from options.params.nonce', () => \{
			        const client = getClient(\{
			          params: \{
			            nonce: 'foo'
			          \}
			        \});
			        expect(client.authOpt.nonce).toBe('foo');
			      \});
			      it('options.params.nonce should prevail over options.nonce', () => \{
			        const client = getClient(\{
			          nonce: 'bar',
			          params: \{
			            nonce: 'foo'
			          \}
			        \});
			        expect(client.authOpt.nonce).toBe('foo');
			      \});
			      it('should set scope from options.params.scope', () => \{
			        const client = getClient(\{
			          params: \{
			            scope: 'foo'
			          \}
			        \});
			        expect(client.authOpt.scope).toBe('foo');
			      \});
			    \});
			  \});
			  describe('logIn', () => \{
			    describe('with social/enterprise (without username and email)', () => \{
			      it('should call authorize when redirect===true', () => \{
			        const client = getClient(\{
			          redirect: true
			        \});
			        const callback = jest.fn();
			        client.logIn(\{\}, \{\}, callback);
			        const mock = getAuth0ClientMock();
			        const authorizeMock = mock.WebAuth.mock.instances[0].authorize.mock;
			        assertCallWithCallback(authorizeMock, callback);
			      \});
			      it('should call popup.authorize when redirect===false', () => \{
			        const client = getClient(\{
			          redirect: false
			        \});
			        const callback = jest.fn();
			        client.logIn(\{\}, \{\}, callback);
			        const mock = getAuth0ClientMock();
			        const authorizeMock = mock.WebAuth.mock.instances[0].popup.authorize.mock;
			        assertCallWithCallback(authorizeMock, callback);
			      \});
			    \});
			    describe('with credentials', () => \{
			      it('should call client.login', () => \{
			        const client = getClient(\{
			          redirect: true
			        \});
			        const callback = jest.fn();
			        client.logIn(
			          \{
			            username: 'foo'
			          \},
			          \{\},
			          callback
			        );
			        const mock = getAuth0ClientMock();
			        const loginMock = mock.WebAuth.mock.instances[0].login.mock;
			        assertCallWithCallback(loginMock, callback);
			      \});
			      it('should use the provided login_hint', () => \{
			        const client = getClient(\{
			          redirect: true
			        \});
			        const callback = jest.fn();
			        client.logIn(
			          \{
			            email: 'foo',
			            login_hint: 'valid_hint@test.com'
			          \},
			          \{
			            login_hint: 'invalid_hint@test.com'
			          \},
			          callback
			        );
			        const mock = getAuth0ClientMock();
			        const loginMock = mock.WebAuth.mock.instances[0].login.mock;
			        expect(loginMock.calls[0][0].login_hint).toBe('valid_hint@test.com');
			      \});
			      it('should call popup.loginWithCredentials when redirect is false and sso is false', () => \{
			        const client = getClient(\{
			          redirect: false,
			          sso: false
			        \});
			        const callback = jest.fn();
			        client.logIn(
			          \{
			            username: 'foo'
			          \},
			          \{\},
			          callback
			        );
			        const mock = getAuth0ClientMock();
			        const loginWithCredentialsMock =
			          mock.WebAuth.mock.instances[0].popup.loginWithCredentials.mock;
			        assertCallWithCallback(loginWithCredentialsMock, callback);
			      \});
			      it('should call popup.loginWithCredentials when redirect is false and sso is true', () => \{
			        const client = getClient(\{
			          redirect: false,
			          sso: true
			        \});
			        const callback = jest.fn();
			        client.logIn(
			          \{
			            username: 'foo'
			          \},
			          \{\},
			          callback
			        );
			        const mock = getAuth0ClientMock();
			        const loginWithCredentialsMock =
			          mock.WebAuth.mock.instances[0].popup.loginWithCredentials.mock;
			        assertCallWithCallback(loginWithCredentialsMock, callback);
			      \});
			    \});
			    describe('should trim spaces in', () => \{
			      let client;
			      let callback;
			      let getMock = () => getAuth0ClientMock().WebAuth.mock.instances[0].login.mock;
			      beforeEach(() => \{
			        client = getClient(\{
			          redirect: true
			        \});
			        callback = jest.fn();
			      \});
			      it('the username', () => \{
			        client.logIn(
			          \{
			            username: ' foo '
			          \},
			          \{\},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the username with a space', () => \{
			        client.logIn(
			          \{
			            username: ' foo bar '
			          \},
			          \{\},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the email', () => \{
			        client.logIn(
			          \{
			            email: ' foo@example.com '
			          \},
			          \{\},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the mfa_code', () => \{
			        client.logIn(
			          \{
			            username: 'foo',
			            mfa_code: ' 123456 '
			          \},
			          \{\},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			    \});
			  \});
			  describe('signUp', () => \{
			    describe('should trim spaces in', () => \{
			      let client;
			      let callback;
			      let getMock = () => getAuth0ClientMock().WebAuth.mock.instances[0].signup.mock;
			      beforeEach(() => \{
			        client = getClient(\{
			          redirect: true
			        \});
			        callback = jest.fn();
			      \});
			      it('the username', () => \{
			        client.signUp(
			          \{
			            username: ' foo '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the username with a space', () => \{
			        client.signUp(
			          \{
			            username: ' foo bar '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the email', () => \{
			        client.signUp(
			          \{
			            email: ' foo@example.com '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			    \});
			  \});
			  describe('resetPassword', () => \{
			    describe('should trim spaces in', () => \{
			      let client;
			      let callback;
			      let getMock = () => getAuth0ClientMock().WebAuth.mock.instances[0].changePassword.mock;
			      beforeEach(() => \{
			        client = getClient(\{
			          redirect: true
			        \});
			        callback = jest.fn();
			      \});
			      it('the username', () => \{
			        client.resetPassword(
			          \{
			            username: ' foo '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the username with a space', () => \{
			        client.resetPassword(
			          \{
			            username: ' foo bar '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the email', () => \{
			        client.resetPassword(
			          \{
			            email: ' foo@example.com '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			    \});
			  \});
			  describe('passwordlessStart', () => \{
			    it('should call client.passwordlessStart', () => \{
			      const client = getClient(\{\});
			      client.passwordlessStart(
			        \{
			          foo: 'bar'
			        \},
			        () => \{\}
			      );
			      const \{ mock \} = client.client.passwordlessStart;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			    describe('should trim spaces in', () => \{
			      let client;
			      let callback;
			      let getMock = () => getAuth0ClientMock().WebAuth.mock.instances[0].passwordlessStart.mock;
			      beforeEach(() => \{
			        client = getClient(\{
			          redirect: true
			        \});
			        callback = jest.fn();
			      \});
			      it('the email', () => \{
			        client.passwordlessStart(
			          \{
			            email: ' foo@example.com '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the phoneNumber', () => \{
			        client.passwordlessStart(
			          \{
			            phoneNumber: ' +554899999 '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			    \});
			  \});
			  describe('passwordlessVerify', () => \{
			    it('should call client.passwordlessLogin', () => \{
			      const client = getClient(\{\});
			      client.passwordlessVerify(
			        \{
			          foo: 'bar'
			        \},
			        () => \{\}
			      );
			      const \{ mock \} = client.client.passwordlessLogin;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			    describe('should trim spaces in', () => \{
			      let client;
			      let callback;
			      let getMock = () => getAuth0ClientMock().WebAuth.mock.instances[0].passwordlessLogin.mock;
			      beforeEach(() => \{
			        client = getClient(\{
			          redirect: true
			        \});
			        callback = jest.fn();
			      \});
			      it('the email', () => \{
			        client.passwordlessVerify(
			          \{
			            email: ' foo@example.com '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			      it('the phoneNumber', () => \{
			        client.passwordlessVerify(
			          \{
			            phoneNumber: ' +554899999 '
			          \},
			          callback
			        );
			        assertCallWithCallback(getMock(), callback);
			      \});
			    \});
			  \});
			
			  it('getUserCountry should call getUserCountry', () => \{
			    const client = getClient(\{\});
			    client.getUserCountry('cb');
			    const \{ mock \} = client.client.client.getUserCountry;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  it('getSSOData should call client.client.getSSOData', () => \{
			    const client = getClient(\{\});
			    client.getSSOData(true, () => \{\});
			    const \{ mock \} = client.client.client.getSSOData;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  describe('parseHash', () => \{
			    it('should pass __enableIdPInitiatedLogin:false when options._enableImpersonation and options._enableIdPInitiatedLogin are not present', () => \{
			      const client = getClient(\{\});
			      client.parseHash('hash', 'cb');
			      const mock = getAuth0ClientMock();
			      const parseHashMock = mock.WebAuth.mock.instances[0].parseHash.mock;
			      expect(parseHashMock.calls.length).toBe(1);
			      expect(parseHashMock.calls[0]).toMatchSnapshot();
			    \});
			    it('should pass __enableIdPInitiatedLogin when options._enableImpersonation===true', () => \{
			      const client = getClient(\{
			        _enableImpersonation: true
			      \});
			      client.parseHash('hash', 'cb');
			      const mock = getAuth0ClientMock();
			      const parseHashMock = mock.WebAuth.mock.instances[0].parseHash.mock;
			      expect(parseHashMock.calls.length).toBe(1);
			      expect(parseHashMock.calls[0]).toMatchSnapshot();
			    \});
			    it('should pass __enableIdPInitiatedLogin when options._enableIdPInitiatedLogin===true', () => \{
			      const client = getClient(\{
			        _enableIdPInitiatedLogin: true
			      \});
			      client.parseHash('hash', 'cb');
			      const mock = getAuth0ClientMock();
			      const parseHashMock = mock.WebAuth.mock.instances[0].parseHash.mock;
			      expect(parseHashMock.calls.length).toBe(1);
			      expect(parseHashMock.calls[0]).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\web_api\\p2_api.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(44)
    });
    it('auth0_lock\\src\\__tests__\\core\\web_api.test.js', () => {
        const sourceCode = `
			import Auth0WebApi from '../../core/web_api';
			
			describe('Auth0WebApi', () => \{
			  let originalWindow;
			
			  const LOCK_ID = 'lock-id';
			  const CLIENT_ID = 'client-id';
			  const DEFAULT_DOMAIN = 'test.com';
			  const client = () => Auth0WebApi.clients[LOCK_ID];
			
			  beforeEach(() => \{
			    originalWindow = window.window;
			  \});
			
			  afterEach(() => \{
			    window.window = originalWindow;
			  \});
			
			  describe('setupClient', () => \{
			    it('sets the correct options when is on the hosted login page', () => \{
			      delete window.location;
			      window.location = \{ ...originalWindow.location, host: DEFAULT_DOMAIN, search: '' \};
			      Auth0WebApi.setupClient(LOCK_ID, CLIENT_ID, DEFAULT_DOMAIN, \{ redirect: true \});
			
			      expect(client()).toEqual(
			        expect.objectContaining(\{
			          isUniversalLogin: true,
			          domain: DEFAULT_DOMAIN,
			          authOpt: \{
			            popup: false
			          \}
			        \})
			      );
			    \});
			
			    it('sets redirect: true when on the same origin as the specified domain', () => \{
			      delete window.location;
			      window.location = \{ ...originalWindow.location, host: DEFAULT_DOMAIN, search: '' \};
			
			      Auth0WebApi.setupClient(LOCK_ID, CLIENT_ID, DEFAULT_DOMAIN, \{\});
			      expect(client().authOpt.popup).toBe(false);
			    \});
			
			    it('sets redirect: false when on a different origin as the specified domain', () => \{
			      delete window.location;
			      window.location = \{ ...originalWindow.location, host: 'test-other.com', search: '' \};
			
			      Auth0WebApi.setupClient(LOCK_ID, CLIENT_ID, DEFAULT_DOMAIN, \{\});
			      expect(client().authOpt.popup).toBe(true);
			    \});
			
			    it('forces popup and sso mode for cordova, only when not running in the hosted environment', () => \{
			      delete window.location;
			      window.location = \{ ...originalWindow.location, host: DEFAULT_DOMAIN, search: '' \};
			      window.cordova = true;
			
			      Auth0WebApi.setupClient(LOCK_ID, CLIENT_ID, DEFAULT_DOMAIN, \{\});
			      expect(client().authOpt.popup).toBe(false);
			      expect(client().authOpt.sso).toBeUndefined();
			    \});
			
			    it('forces popup and sso mode for electron, only when not running in the hosted environment', () => \{
			      delete window.location;
			      window.location = \{ ...originalWindow.location, host: DEFAULT_DOMAIN, search: '' \};
			      window.electron = true;
			
			      Auth0WebApi.setupClient(LOCK_ID, CLIENT_ID, DEFAULT_DOMAIN, \{\});
			      expect(client().authOpt.popup).toBe(false);
			      expect(client().authOpt.sso).toBeUndefined();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\core\\web_api.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('auth0_lock\\src\\__tests__\\engine\\classic\\login.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			
			import \{ expectComponent, mockComponent \} from 'testUtils';
			
			jest.mock('core/pane_separator', () => mockComponent('pane_separator'));
			jest.mock('field/social/social_buttons_pane', () => mockComponent('social_buttons_pane'));
			jest.mock('connection/database/login_pane', () => mockComponent('login_pane'));
			jest.mock('connection/database/login_sign_up_tabs', () => mockComponent('login_sign_up_tabs'));
			jest.mock('connection/enterprise/single_sign_on_notice', () =>
			  mockComponent('single_sign_on_notice')
			);
			
			const getComponent = () => \{
			  const LoginScreen = require('engine/classic/login').default;
			  const screen = new LoginScreen();
			  return screen.render();
			\};
			
			describe('LoginScreen', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('connection/database/index', () => (\{
			      databaseConnection: () => false,
			      databaseUsernameValue: () => false,
			      databaseUsernameStyle: () => false,
			      defaultDatabaseConnection: () => false,
			      hasInitialScreen: () => false,
			      hasScreen: () => false,
			      signUpLink: () => false
			    \}));
			
			    jest.mock('connection/database/actions', () => (\{ logIn: jest.fn() \}));
			
			    jest.mock('connection/enterprise', () => (\{
			      defaultEnterpriseConnection: () => false,
			      findADConnectionWithoutDomain: () => false,
			      isHRDDomain: () => false
			    \}));
			
			    jest.mock('connection/enterprise/actions', () => (\{
			      logIn: jest.fn(),
			      startHRD: jest.fn()
			    \}));
			
			    jest.mock('core/signed_in_confirmation', () => (\{
			      renderSignedInConfirmation: jest.fn()
			    \}));
			
			    jest.mock('engine/classic', () => (\{
			      hasOnlyClassicConnections: () => false,
			      isSSOEnabled: () => false
			    \}));
			
			    jest.mock('i18n', () => (\{ str: (_, keys) => keys.join(',') \}));
			
			    jest.mock('core/index', () => (\{
			      hasSomeConnections: () => false,
			      countConnections: () => 0
			    \}));
			  \});
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(','),
			      html: (...keys) => keys.join(',')
			    \},
			    model: 'model'
			  \};
			  it('renders empty div by default', () => \{
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders SocialButtonsPane when has social connections', () => \{
			    require('core/index').hasSomeConnections = (m, connection) => connection === 'social';
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders SingleSignOnNotice when SSO is enabled', () => \{
			    require('engine/classic').isSSOEnabled = () => true;
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  describe('renders LoginSignUpTabs', () => \{
			    it('when database connection is enabled and has screen signUp', () => \{
			      require('core/index').hasSomeConnections = (m, connection) => connection === 'database';
			      require('connection/database/index').hasScreen = (m, screenName) => screenName === 'signUp';
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('when social connection is enabled and has initial screen signUp and has screen signUp', () => \{
			      require('core/index').hasSomeConnections = (m, connection) => connection === 'database';
			      require('connection/database/index').hasInitialScreen = (m, screenName) =>
			        screenName === 'signUp';
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			  \});
			  describe('renders LoginPane', () => \{
			    it('when SSO is enabled', () => \{
			      require('engine/classic').isSSOEnabled = () => true;
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('when has database connection', () => \{
			      require('core/index').hasSomeConnections = (m, connection) => connection === 'database';
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('when has enterprise connection', () => \{
			      require('core/index').hasSomeConnections = (m, connection) => connection === 'enterprise';
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\engine\\classic\\login.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('auth0_lock\\src\\__tests__\\engine\\classic\\mfa_login_screen.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('connection/database/mfa_pane', () => mockComponent('mfa_pane'));
			
			//there's a circular dependency with this module, so we need to mock it
			jest.mock('engine/classic');
			
			const getComponent = () => \{
			  const MFALoginScreen = require('engine/classic/mfa_login_screen').default;
			  const screen = new MFALoginScreen();
			  return screen.render();
			\};
			
			describe('MFALoginScreen', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('connection/database/index', () => (\{
			      hasScreen: () => false
			    \}));
			
			    jest.mock('connection/database/actions', () => (\{
			      cancelMFALogin: jest.fn(),
			      logIn: jest.fn()
			    \}));
			
			    jest.mock('core/signed_in_confirmation', () => (\{
			      renderSignedInConfirmation: jest.fn()
			    \}));
			  \});
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(',')
			    \},
			    model: 'model'
			  \};
			  it('renders correctly', () => \{
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\engine\\classic\\mfa_login_screen.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\engine\\classic\\sign_up_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ expectComponent, mockComponent \} from 'testUtils';
			import \{ expectShallowComponent \} from '../../testUtils';
			
			jest.mock('field/email/email_pane', () => mockComponent('email_pane'));
			jest.mock('field/password/password_pane', () => mockComponent('password_pane'));
			jest.mock('field/username/username_pane', () => mockComponent('username_pane'));
			jest.mock('field/custom_input', () => mockComponent('custom_input'));
			
			jest.mock('core/index', () => (\{
			  captcha: jest.fn()
			\}));
			
			jest.mock('engine/classic', () => (\{
			  isSSOEnabled: jest.fn()
			\}));
			
			jest.mock('connection/enterprise', () => (\{
			  isHRDDomain: jest.fn()
			\}));
			
			const getComponent = () => require('engine/classic/sign_up_pane').default;
			
			describe('SignUpPane', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('connection/database/index', () => (\{
			      additionalSignUpFields: () => [],
			      databaseConnectionRequiresUsername: () => false,
			      passwordStrengthPolicy: () => 'passwordStrengthPolicy',
			      signUpFieldsStrictValidation: () => true,
			      databaseUsernameValue: () => null
			    \}));
			  \});
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(','),
			      html: (...keys) => keys.join(',')
			    \},
			    model: 'model',
			    emailInputPlaceholder: 'emailInputPlaceholder',
			    onlyEmail: true,
			    passwordInputPlaceholder: 'passwordInputPlaceholder',
			    passwordStrengthMessages: 'passwordStrengthMessages',
			    usernameInputPlaceholder: 'usernameInputPlaceholder',
			    strictValidation: false
			  \};
			  it('renders only email by default', () => \{
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('shows header when instructions are available', () => \{
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} instructions="instructions" />).toMatchSnapshot();
			  \});
			
			  it('shows the Captcha pane', () => \{
			    require('core/index').captcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    require('engine/classic').isSSOEnabled.mockReturnValue(false);
			
			    const Component = getComponent();
			
			    expectShallowComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('hides the Captcha pane for SSO connections', () => \{
			    require('core/index').captcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    require('engine/classic').isSSOEnabled.mockReturnValue(true);
			
			    const Component = getComponent();
			
			    expectShallowComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('shows the Captcha pane for SSO (ADFS) connections', () => \{
			    require('core/index').captcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    require('engine/classic').isSSOEnabled.mockReturnValue(true);
			    require('connection/enterprise').isHRDDomain.mockReturnValue(true);
			
			    const Component = getComponent();
			
			    expectShallowComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  describe('onlyEmail is false', () => \{
			    it('shows PasswordPane', () => \{
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} onlyEmail=\{false\} />).toMatchSnapshot();
			    \});
			    it('shows custom fields when additionalSignUpFields returns additional fields', () => \{
			      require('connection/database/index').additionalSignUpFields = () => [
			        \{ get: key => \`\$\{key\}1\` \},
			        \{ get: key => \`\$\{key\}2\` \}
			      ];
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} onlyEmail=\{false\} />).toMatchSnapshot();
			    \});
			    it('shows UsernamePane when databaseConnectionRequiresUsername is true and signUpHideUsernameField is false', () => \{
			      require('connection/database/index').databaseConnectionRequiresUsername = () => true;
			      require('connection/database/index').signUpHideUsernameField = () => false;
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} onlyEmail=\{false\} />).toMatchSnapshot();
			    \});
			    it('hide UsernamePane when databaseConnectionRequiresUsername is true and signUpHideUsernameField is true', () => \{
			      require('connection/database/index').databaseConnectionRequiresUsername = () => true;
			      require('connection/database/index').signUpHideUsernameField = () => true;
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\engine\\classic\\sign_up_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('auth0_lock\\src\\__tests__\\engine\\classic\\sign_up_screen.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('engine/classic/sign_up_pane', () => mockComponent('sign_up_pane'));
			jest.mock('core/pane_separator', () => mockComponent('pane_separator'));
			jest.mock('connection/database/sign_up_terms', () => mockComponent('sign_up_terms'));
			jest.mock('field/social/social_buttons_pane', () => mockComponent('social_buttons_pane'));
			jest.mock('connection/database/login_sign_up_tabs', () => mockComponent('login_sign_up_tabs'));
			jest.mock('connection/enterprise/single_sign_on_notice', () =>
			  mockComponent('single_sign_on_notice')
			);
			
			const getScreen = () => \{
			  const SignUpScreen = require('engine/classic/sign_up_screen').default;
			  return new SignUpScreen();
			\};
			
			const getComponent = () => \{
			  return getScreen().render();
			\};
			
			describe('SignUpScreen', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('connection/database/index', () => (\{
			      databaseUsernameValue: (model, options) => \{
			        expect(options.emailFirst).toBe(true);
			        return 'foo@bar.com';
			      \},
			      termsAccepted: () => true,
			      hasScreen: () => false,
			      mustAcceptTerms: () => false,
			      showTerms: () => true
			    \}));
			
			    jest.mock('connection/database/actions', () => (\{
			      signUp: jest.fn(),
			      toggleTermsAcceptance: jest.fn()
			    \}));
			    jest.mock('engine/classic', () => (\{
			      hasOnlyClassicConnections: () => false,
			      isSSOEnabled: (model, options) => \{
			        expect(options.emailFirst).toBe(true);
			        return false;
			      \}
			    \}));
			    jest.mock('core/signed_in_confirmation', () => (\{
			      renderSignedInConfirmation: jest.fn()
			    \}));
			    jest.mock('connection/database/signed_up_confirmation', () => (\{
			      renderSignedUpConfirmation: jest.fn()
			    \}));
			
			    jest.mock('field/index', () => (\{
			      renderOptionSelection: () => false
			    \}));
			
			    jest.mock('connection/enterprise', () => (\{
			      isHRDDomain: () => false
			    \}));
			
			    jest.mock('connection/enterprise/actions', () => (\{
			      logIn: jest.fn()
			    \}));
			
			    jest.mock('i18n', () => (\{ str: (_, keys) => keys.join(',') \}));
			
			    jest.mock('core/index', () => (\{
			      hasSomeConnections: () => false,
			      id: () => 'id'
			    \}));
			  \});
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(','),
			      group: (...keys) => keys.join(','),
			      html: (...keys) => keys.join(',')
			    \},
			    model: 'model'
			  \};
			  it('renders empty div by default', () => \{
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders SocialButtonsPane when has social connections', () => \{
			    require('core/index').hasSomeConnections = (m, connection) => connection === 'social';
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('disables SocialButtonsPane when terms were not accepted', () => \{
			    require('core/index').hasSomeConnections = (m, connection) => connection === 'social';
			    require('connection/database/index').termsAccepted = () => false;
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders SingleSignOnNotice when SSO is enabled and has screen login', () => \{
			    require('engine/classic').isSSOEnabled = () => true;
			    require('connection/database/index').hasScreen = (m, screenName) => screenName === 'login';
			
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders LoginSignUpTabs SSO is disabled and has screen login', () => \{
			    require('connection/database/index').hasScreen = (m, screenName) => screenName === 'login';
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  describe('renders SignUpPane', () => \{
			    it('when has database connection', () => \{
			      require('core/index').hasSomeConnections = (m, connection) => connection === 'database';
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('when has enterprise connection', () => \{
			      require('core/index').hasSomeConnections = (m, connection) => connection === 'enterprise';
			      const Component = getComponent();
			
			      expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			    \});
			  \});
			  describe('on Submit, uses \`options.emailFirst=true\` and', () => \{
			    it('calls signup', () => \{
			      const screen = getScreen();
			      screen.submitHandler()();
			      const \{ mock \} = require('connection/database/actions').signUp;
			      expect(mock.calls.length).toBe(1);
			    \});
			  \});
			  describe('renders SignupTerms', () => \{
			    it('when showTerms() && \`terms\` are truthy', () => \{
			      const screen = getScreen();
			      const terms = screen.renderTerms('m', true);
			      expect(terms).not.toBe(null);
			    \});
			    it('with a checkbox when mustAcceptTerms() is true', () => \{
			      require('connection/database/index').mustAcceptTerms = () => true;
			      const screen = getScreen();
			      const terms = screen.renderTerms('m', true);
			      expect(terms.props.showCheckbox).toBe(true);
			    \});
			    it('without a checkbox when mustAcceptTerms() is true', () => \{
			      require('connection/database/index').mustAcceptTerms = () => false;
			      const screen = getScreen();
			      const terms = screen.renderTerms('m', true);
			      expect(terms.props.showCheckbox).toBe(false);
			    \});
			  \});
			  it('do not render SignupTerms when showTerms() is false', () => \{
			    require('connection/database/index').showTerms = () => false;
			    const screen = getScreen();
			    const terms = screen.renderTerms('m', true);
			    expect(terms).toBe(null);
			  \});
			  it('do not render SignupTerms when \`terms\` is falsy', () => \{
			    const screen = getScreen();
			    const terms = screen.renderTerms('m', undefined);
			    expect(terms).toBe(null);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\engine\\classic\\sign_up_screen.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(13)
    });
    it('auth0_lock\\src\\__tests__\\engine\\classic.test.js', () => {
        const sourceCode = `
			const getClassic = () => require('engine/classic').default;
			
			describe('Classic Engine', () => \{
			  beforeEach(() => \{
			    jest.mock('connection/database/index', () => (\{
			      resolveAdditionalSignUpFields: m => (\{ ...m, resolveAdditionalSignUpFields: true \}),
			      overrideDatabaseOptions: m => (\{ ...m, overrideDatabaseOptions: true \})
			    \}));
			    jest.mock('sync', () => (\{
			      isSuccess: () => false
			    \}));
			  \});
			  test('willShow calls \`resolveAdditionalSignUpFields\`', () => \{
			    const classic = getClassic();
			    const model = classic.willShow(model, \{\});
			    expect(model.resolveAdditionalSignUpFields).toBe(true);
			  \});
			  test('willShow calls \`overrideDatabaseOptions\`', () => \{
			    const classic = getClassic();
			    const model = classic.willShow(model, \{\});
			    expect(model.overrideDatabaseOptions).toBe(true);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\engine\\classic.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\engine\\passwordless\\social_or_email_login_screen.test.js', () => {
        const sourceCode = `
			import React from 'react';
			
			import \{ expectComponent, mockComponent \} from 'testUtils';
			
			jest.mock('connection/enterprise');
			jest.mock('core/index');
			
			jest.mock('field/social/social_buttons_pane', () => mockComponent('social_buttons_pane'));
			jest.mock('field/email/email_pane', () => mockComponent('email_pane'));
			jest.mock('field/captcha/captcha_pane', () => mockComponent('captcha_pane'));
			jest.mock('core/pane_separator', () => mockComponent('pane_separator'));
			jest.mock('connection/database/sign_up_terms', () => mockComponent('sign_up_terms'));
			jest.mock('connection/passwordless/index', () => (\{
			  isEmail: jest.fn()
			\}));
			
			const getComponent = () => \{
			  const SocialOrEmailScreen = require('engine/passwordless/social_or_email_login_screen').default;
			  const screen = new SocialOrEmailScreen();
			  return screen.render();
			\};
			
			describe('email passwordless', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			    jest.resetAllMocks();
			
			    jest.mock('connection/database/index', () => (\{
			      hasScreen: () => false,
			      databaseUsernameValue: jest.fn()
			    \}));
			
			    jest.mock('connection/database/actions', () => (\{
			      cancelMFALogin: jest.fn(),
			      logIn: jest.fn()
			    \}));
			
			    jest.mock('core/signed_in_confirmation', () => (\{
			      renderSignedInConfirmation: jest.fn()
			    \}));
			
			    jest.mock('connection/enterprise', () => (\{
			      isHRDEmailValid: jest.fn(() => false),
			      isHRDDomain: jest.fn(() => true)
			    \}));
			
			    jest.mock('core/index', () => (\{
			      hasSomeConnections: jest.fn(() => true),
			      passwordlessCaptcha: jest.fn()
			    \}));
			  \});
			
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(','),
			      html: (...keys) => keys.join(',')
			    \},
			    model: 'model'
			  \};
			
			  it('renders correctly', () => \{
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders a captcha', () => \{
			    const Component = getComponent();
			
			    require('core/index').passwordlessCaptcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\engine\\passwordless\\social_or_email_login_screen.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\engine\\passwordless\\social_or_phone_number_login_screen.test.js', () => {
        const sourceCode = `
			import React from 'react';
			
			import \{ expectComponent, mockComponent \} from 'testUtils';
			
			jest.mock('connection/enterprise');
			jest.mock('core/index');
			
			jest.mock('field/social/social_buttons_pane', () => mockComponent('social_buttons_pane'));
			jest.mock('field/phone-number/phone_number_pane', () => mockComponent('phone_number_pane'));
			jest.mock('field/captcha/captcha_pane', () => mockComponent('captcha_pane'));
			jest.mock('core/pane_separator', () => mockComponent('pane_separator'));
			jest.mock('connection/database/sign_up_terms', () => mockComponent('sign_up_terms'));
			jest.mock('connection/passwordless/index', () => (\{
			  isEmail: jest.fn()
			\}));
			
			const getComponent = () => \{
			  const SocialOrPhoneNumberScreen = require('engine/passwordless/social_or_phone_number_login_screen').default;
			  const screen = new SocialOrPhoneNumberScreen();
			  return screen.render();
			\};
			
			describe('sms passwordless', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			    jest.resetAllMocks();
			
			    jest.mock('connection/database/index', () => (\{
			      hasScreen: () => false,
			      databaseUsernameValue: jest.fn()
			    \}));
			
			    jest.mock('connection/database/actions', () => (\{
			      cancelMFALogin: jest.fn(),
			      logIn: jest.fn()
			    \}));
			
			    jest.mock('core/signed_in_confirmation', () => (\{
			      renderSignedInConfirmation: jest.fn()
			    \}));
			
			    jest.mock('connection/enterprise', () => (\{
			      isHRDEmailValid: jest.fn(() => false),
			      isHRDDomain: jest.fn(() => true)
			    \}));
			
			    jest.mock('core/index', () => (\{
			      hasSomeConnections: jest.fn(() => true),
			      passwordlessCaptcha: jest.fn()
			    \}));
			  \});
			
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(','),
			      html: (...keys) => keys.join(',')
			    \},
			    model: 'model'
			  \};
			
			  it('renders correctly', () => \{
			    const Component = getComponent();
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders a captcha', () => \{
			    const Component = getComponent();
			
			    require('core/index').passwordlessCaptcha.mockReturnValue(\{
			      get() \{
			        return true;
			      \}
			    \});
			
			    expectComponent(<Component \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\engine\\passwordless\\social_or_phone_number_login_screen.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\engine\\passwordless.test.js', () => {
        const sourceCode = `
			import \{ mockComponent \} from 'testUtils';
			const getEngine = () => require('engine/passwordless').default;
			
			jest.mock('core/error_screen', () => mockComponent('error_screen'));
			jest.mock('core/loading_screen', () => mockComponent('loading_screen'));
			jest.mock('engine/passwordless/social_or_email_login_screen', () =>
			  mockComponent('social_or_email_login_screen')
			);
			jest.mock('engine/passwordless/social_or_phone_number_login_screen', () =>
			  mockComponent('social_or_phone_number_login_screen')
			);
			jest.mock('connection/passwordless/ask_vcode', () => mockComponent('ask_vcode'));
			jest.mock('core/sso/last_login_screen', () => mockComponent('last_login_screen'));
			
			describe('Passwordless Engine', () => \{
			  describe('didReceiveClientSettings calls setPrefill', () => \{
			    beforeEach(() => \{
			      jest.resetModules();
			      jest.mock('core/index', () => (\{
			        hasSomeConnections: () => true,
			        prefill: () => (\{
			          toJS() \{
			            return \{
			              email: 'prefill@example.com',
			              phoneNumber: '12354'
			            \};
			          \}
			        \})
			      \}));
			      jest.mock('field/email', () => (\{
			        setEmail: jest.fn(m => m)
			      \}));
			      jest.mock('field/phone_number', () => (\{
			        setPhoneNumber: jest.fn(m => m)
			      \}));
			    \});
			    it('when prefill options has \`email\` value', () => \{
			      const engine = getEngine();
			      engine.didReceiveClientSettings('model');
			      const setEmailMockCalls = require('field/email').setEmail.mock.calls;
			      expect(setEmailMockCalls.length).toBe(1);
			      expect(setEmailMockCalls[0][0]).toBe('model');
			      expect(setEmailMockCalls[0][1]).toBe('prefill@example.com');
			    \});
			    it('when prefill options has \`phoneNumber\` value', () => \{
			      const engine = getEngine();
			      engine.didReceiveClientSettings('model');
			      const setPhoneNumberMockCalls = require('field/phone_number').setPhoneNumber.mock.calls;
			      expect(setPhoneNumberMockCalls.length).toBe(1);
			      expect(setPhoneNumberMockCalls[0][0]).toBe('model');
			      expect(setPhoneNumberMockCalls[0][1]).toBe('12354');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\engine\\passwordless.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\field\\captcha\\recaptchav2.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ shallow \} from 'enzyme';
			import I from 'immutable';
			
			import \{ ReCAPTCHA \} from '../../../field/captcha/recaptcha';
			
			const createLockMock = (\{ provider = 'none', sitekey = '' \} = \{\}) =>
			  I.fromJS(\{
			    id: '__lock-id__',
			    core: \{
			      captcha: \{ provider, sitekey \},
			      transient: \{
			        ui: \{
			          language: 'en-US'
			        \}
			      \}
			    \}
			  \});
			
			describe('Recaptcha v2', () => \{
			  it('should match the snapshot', () => \{
			    const mockLock = createLockMock(\{ provider: 'recaptcha_v2', sitekey: 'mySiteKey' \});
			    const wrapper = shallow(
			      <ReCAPTCHA provider=\{'recaptcha_v2'\} lock=\{mockLock\} sitekey=\{'mySiteKey'\} />
			    );
			
			    expect(wrapper).toMatchSnapshot();
			  \});
			
			  describe('render', () => \{
			    beforeAll(() => \{
			      document.body.innerHTML = "<div id='renderTest'></div>";
			    \});
			    afterAll(() => \{
			      document.getElementById('renderTest').remove();
			    \});
			    it('injects the script', () => \{
			      ReCAPTCHA.loadScript(\{ hl: 'en-US', provider: 'recaptcha_v2' \}, document.body);
			      expect(document.body.innerHTML).toContain('<div id="renderTest">');
			      expect(document.body.innerHTML).toContain(
			        '<script src="https://www.recaptcha.net/recaptcha/api.js?hl=en-US'
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\captcha\\recaptchav2.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\field\\captcha\\recaptcha_enterprise.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ shallow \} from 'enzyme';
			import I from 'immutable';
			
			import \{ ReCAPTCHA \} from '../../../field/captcha/recaptcha';
			
			const createLockMock = (\{ provider = 'none', sitekey = '' \} = \{\}) =>
			  I.fromJS(\{
			    id: '__lock-id__',
			    core: \{
			      captcha: \{ provider, sitekey \},
			      transient: \{
			        ui: \{
			          language: 'en-US'
			        \}
			      \}
			    \}
			  \});
			
			describe('Recaptcha Enterprise', () => \{
			  it('should match the snapshot', () => \{
			    const mockLock = createLockMock(\{ provider: 'recaptcha_enterprise', sitekey: 'mySiteKey' \});
			    const wrapper = shallow(
			      <ReCAPTCHA provider=\{'recaptcha_enterprise'\} lock=\{mockLock\} sitekey=\{'mySiteKey'\} />
			    );
			
			    expect(wrapper).toMatchSnapshot();
			  \});
			
			  describe('render', () => \{
			    beforeAll(() => \{
			      document.body.innerHTML = "<div id='renderTest'></div>";
			    \});
			    afterAll(() => \{
			      document.getElementById('renderTest').remove();
			    \});
			    it('injects the script', () => \{
			      ReCAPTCHA.loadScript(\{ hl: 'en-US', provider: 'recaptcha_enterprise' \}, document.body);
			      expect(document.body.innerHTML).toContain('<div id="renderTest">');
			      expect(document.body.innerHTML).toContain(
			        '<script src="https://www.recaptcha.net/recaptcha/enterprise.js?render=explicit'
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\captcha\\recaptcha_enterprise.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\src\\__tests__\\field\\captcha.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			import I from 'immutable';
			
			import CaptchaPane from '../../field/captcha/captcha_pane';
			import \{ ReCAPTCHA \} from '../../field/captcha/recaptcha';
			import CaptchaInput from '../../ui/input/captcha_input';
			
			const createLockMock = (\{ provider = 'auth0', required = true, siteKey = '' \} = \{\}) =>
			  I.fromJS(\{
			    id: '__lock-id__',
			    core: \{
			      captcha: \{ provider, siteKey, required: required \}
			    \}
			  \});
			
			const createI18nMock = () => (\{
			  str: jest.fn().mockReturnValue('My i18N Compliant Language')
			\});
			
			describe('CaptchaPane', () => \{
			  describe('CaptchaInput', () => \{
			    let wrapper;
			    beforeAll(() => \{
			      const lockMock = createLockMock();
			      const i8nMock = createI18nMock();
			      const onReloadMock = jest.fn();
			
			      wrapper = mount(<CaptchaPane lock=\{lockMock\} onReload=\{onReloadMock\} i18n=\{i8nMock\} />);
			    \});
			
			    it('should render CaptchaInput if no provider is specified', () => \{
			      expect(wrapper.find(CaptchaInput)).toHaveLength(1);
			    \});
			  \});
			
			  describe('recaptchav2', () => \{
			    let wrapper;
			    beforeAll(() => \{
			      const lockMock = createLockMock(\{
			        provider: 'recaptcha_v2',
			        siteKey: 'mySiteKey'
			      \});
			      const i8nMock = createI18nMock();
			      const onReloadMock = jest.fn();
			
			      wrapper = mount(<CaptchaPane lock=\{lockMock\} onReload=\{onReloadMock\} i18n=\{i8nMock\} />);
			    \});
			
			    it('should render reCaptcha if provider is recaptchav2', () => \{
			      expect(wrapper.find(ReCAPTCHA)).toHaveLength(1);
			    \});
			
			    it('should pass the sitekey', () => \{
			      expect(wrapper.find(ReCAPTCHA).props().sitekey).toBe('mySiteKey');
			    \});
			  \});
			
			  describe('recaptcha enterprise', () => \{
			    let wrapper;
			    beforeAll(() => \{
			      const lockMock = createLockMock(\{
			        provider: 'recaptcha_enterprise',
			        siteKey: 'mySiteKey'
			      \});
			      const i8nMock = createI18nMock();
			      const onReloadMock = jest.fn();
			
			      wrapper = mount(<CaptchaPane lock=\{lockMock\} onReload=\{onReloadMock\} i18n=\{i8nMock\} />);
			    \});
			
			    it('should render reCaptcha if provider is recaptcha_enterprise', () => \{
			      expect(wrapper.find(ReCAPTCHA)).toHaveLength(1);
			    \});
			
			    it('should pass the sitekey', () => \{
			      expect(wrapper.find(ReCAPTCHA).props().sitekey).toBe('mySiteKey');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\captcha.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('auth0_lock\\src\\__tests__\\field\\custom_input.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/input/text_input', () => mockComponent('text_input'));
			jest.mock('ui/input/select_input', () => mockComponent('select_input'));
			
			const getComponent = () => require('field/custom_input').default;
			
			describe('CustomInput', () => \{
			  const defaultProps = \{
			    iconUrl: 'iconUrl',
			    placeholder: 'placeholder',
			    ariaLabel: 'Custom Input',
			    name: 'custom_input',
			    model: \{\},
			    validator: 'validator'
			  \};
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('core/index', () => (\{
			      id: () => 1
			    \}));
			
			    jest.mock('field/actions', () => (\{
			      changeField: jest.fn(),
			      startOptionSelection: jest.fn()
			    \}));
			
			    jest.mock('field/index', () => (\{
			      getFieldInvalidHint: (model, name) => \`invalid-hint-\$\{name\}\`,
			      getFieldLabel: jest.fn(),
			      getFieldValue: (model, name) => \`field-value-\$\{name\}\`,
			      isFieldVisiblyInvalid: () => true
			    \}));
			
			    jest.mock('store/index', () => (\{
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			  \});
			  describe('when type === select', () => \{
			    beforeEach(() => (defaultProps.type = 'select'));
			    it('renders correctly as a SelectInput', () => \{
			      const CustomInput = getComponent();
			
			      expectComponent(<CustomInput \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('sets isValid as true when \`isFieldVisiblyInvalid\` is false', () => \{
			      require('field/index').isFieldVisiblyInvalid = () => false;
			      let CustomInput = getComponent();
			
			      expectComponent(<CustomInput \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('calls \`startOptionSelection\` when clicked', () => \{
			      let CustomInput = getComponent();
			
			      const wrapper = mount(<CustomInput \{...defaultProps\} />);
			      const props = extractPropsFromWrapper(wrapper);
			
			      props.onClick();
			
			      const \{ mock \} = require('field/actions').startOptionSelection;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			  \});
			  describe('when type == input', () => \{
			    beforeEach(() => (defaultProps.type = 'input'));
			    it('renders correctly as a TextInput', () => \{
			      const CustomInput = getComponent();
			
			      expectComponent(<CustomInput \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('sets isValid as true when \`isFieldVisiblyInvalid\` is false', () => \{
			      require('field/index').isFieldVisiblyInvalid = () => false;
			      let CustomInput = getComponent();
			
			      expectComponent(<CustomInput \{...defaultProps\} />).toMatchSnapshot();
			    \});
			    it('calls \`changeField\` when changed', () => \{
			      let CustomInput = getComponent();
			
			      const wrapper = mount(<CustomInput \{...defaultProps\} />);
			      const props = extractPropsFromWrapper(wrapper);
			
			      props.onChange(\{ target: \{ value: 'newUser' \} \});
			
			      const \{ mock \} = require('field/actions').changeField;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			  \});
			  describe('when type == checkbox', () => \{
			    beforeEach(() => (defaultProps.type = 'checkbox'));
			    it('renders correctly as a CheckBoxInput', () => \{
			      const CustomInput = getComponent();
			
			      expectComponent(<CustomInput \{...defaultProps\} />).toMatchSnapshot();
			    \});
			
			    describe('and when placeholderHTML is set', () => \{
			      it('renders correctly as a CheckBoxInput', () => \{
			        const CustomInput = getComponent();
			
			        expectComponent(
			          <CustomInput \{...defaultProps\} placeholderHTML=\{'<b>Placeholder</b>'\} />
			        ).toMatchSnapshot();
			      \});
			    \});
			  \});
			  describe('when type == hidden', () => \{
			    beforeEach(() => \{
			      defaultProps.type = 'hidden';
			      defaultProps.value = 'hidden_value';
			    \});
			    it('renders correctly as a input[type=hidden]', () => \{
			      const CustomInput = getComponent();
			
			      expectComponent(<CustomInput \{...defaultProps\} />).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\custom_input.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('auth0_lock\\src\\__tests__\\field\\email.test.js', () => {
        const sourceCode = `
			import \{ isEmail, emailDomain \} from '../../field/email';
			
			describe('field/email', () => \{
			  describe('isEmail', () => \{
			    it('validates correctly', () => \{
			      expect(isEmail('test@test.com')).toBe(true);
			      expect(isEmail('test@test.com.br')).toBe(true);
			      expect(isEmail('test@移动.移动')).toBe(true);
			      expect(isEmail('test@test.com ')).toBe(true);
			      expect(isEmail(' test@test.com')).toBe(true);
			      expect(isEmail(1)).toBe(false);
			      expect(isEmail('test@testcom')).toBe(false);
			      expect(isEmail('test.test.com')).toBe(false);
			      expect(isEmail('test..@test.com')).toBe(true);
			      expect(isEmail('test..@test.com', false)).toBe(true);
			      expect(isEmail('test..@test.com', true)).toBe(false);
			    \});
			    it('returns false when there is a white space in the middle of the string', () => \{
			      expect(isEmail('test@test. com')).toBe(false);
			    \});
			  \});
			  describe('emailDomain', () => \{
			    it('extracts email domain correctly', () => \{
			      expect(emailDomain('test@test.com')).toBe('test.com');
			      expect(emailDomain('test@test.com.br')).toBe('test.com.br');
			      expect(emailDomain('test@移动.移动')).toBe('移动.移动');
			      expect(emailDomain(1)).toBe('');
			      expect(emailDomain('test@testcom')).toBe('');
			      expect(emailDomain('test.test.com')).toBe('');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\email.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\src\\__tests__\\field\\email_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import Immutable from 'immutable';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/input/email_input', () => mockComponent('email_input'));
			
			const getComponent = () => require('field/email/email_pane').default;
			
			describe('EmailPane', () => \{
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(',')
			    \},
			    lock: \{\},
			    placeholder: 'placeholder',
			    strictValidation: false
			  \};
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    const mockEmail = 'user@example.com';
			    const mockEmailField = Immutable.fromJS(\{
			      value: mockEmail
			    \});
			    jest.mock('field/index', () => (\{
			      email: () => mockEmail,
			      getField: () => mockEmailField,
			      getFieldValue: () => mockEmail,
			      isFieldVisiblyInvalid: () => true
			    \}));
			
			    jest.mock('field/email', () => (\{
			      setEmail: 'setEmail'
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 1,
			      submitting: () => false,
			      ui: \{
			        avatar: () => false,
			        allowAutocomplete: () => false
			      \}
			    \}));
			
			    jest.mock('avatar', () => (\{
			      requestAvatar: jest.fn(),
			      debouncedRequestAvatar: jest.fn()
			    \}));
			
			    jest.mock('store/index', () => (\{
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			  \});
			
			  it('renders correctly', () => \{
			    const EmailPane = getComponent();
			    expectComponent(<EmailPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets \`blankErrorHint\` when username is empty', () => \{
			    const fieldIndexMock = require('field/index');
			    fieldIndexMock.username = () => undefined;
			    fieldIndexMock.getFieldValue = () => undefined;
			    fieldIndexMock.getField = () =>
			      Immutable.fromJS(\{
			        value: undefined
			      \});
			    const EmailPane = getComponent();
			
			    expectComponent(<EmailPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets isValid as true when \`isFieldVisiblyInvalid\` is false', () => \{
			    require('field/index').isFieldVisiblyInvalid = () => false;
			    let EmailPane = getComponent();
			
			    expectComponent(<EmailPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets autoComplete to true when \`allowAutocomplete\` is true', () => \{
			    require('core/index').ui.allowAutocomplete = () => true;
			    let EmailPane = getComponent();
			
			    expectComponent(<EmailPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('fetches the avatar on componentDidMount if ui.avatar is true and there is a username', () => \{
			    require('core/index').ui.avatar = () => true;
			    let EmailPane = getComponent();
			
			    mount(<EmailPane \{...defaultProps\} />);
			
			    const \{ mock \} = require('avatar').requestAvatar;
			    expect(mock.calls.length).toBe(1);
			  \});
			  it('fetches the avatar onChange if ui.avatar is true', () => \{
			    require('core/index').ui.avatar = () => true;
			    let EmailPane = getComponent();
			
			    const wrapper = mount(<EmailPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			    props.onChange(\{ target: \{ value: 'newUser@example.com' \} \});
			
			    const \{ mock \} = require('avatar').debouncedRequestAvatar;
			    expect(mock.calls.length).toBe(1);
			  \});
			  it('calls \`swap\` onChange', () => \{
			    let EmailPane = getComponent();
			
			    const wrapper = mount(<EmailPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			    props.onChange(\{ target: \{ value: 'newUser@example.com' \} \});
			
			    const \{ mock \} = require('store/index').swap;
			    expect(mock.calls.length).toBe(2);
			    expect(mock.calls[1]).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\email_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('auth0_lock\\src\\__tests__\\field\\field.test.js', () => {
        const sourceCode = `
			import Immutable from 'immutable';
			import \{ setField \} from '../../field';
			
			const createModel = field =>
			  Immutable.fromJS(\{
			    field: \{
			      [field]: \`old_test_\$\{field\}\`
			    \}
			  \});
			
			const testField = (field, maxLength) => \{
			  const m = createModel(field);
			  expect(setField(m, field, '').toJS().field[field].valid).toBe(false);
			  expect(setField(m, field, 'test_value').toJS().field[field].valid).toBe(true);
			  if (maxLength) \{
			    expect(setField(m, field, 'a'.repeat(maxLength + 1)).toJS().field[field].valid).toBe(false);
			  \}
			\};
			describe('field/index', () => \{
			  describe('default validation', () => \{
			    it('validates family_name', () => \{
			      testField('family_name', 150);
			    \});
			    it('validates family_name', () => \{
			      testField('given_name', 150);
			    \});
			    it('validates name', () => \{
			      testField('name', 300);
			    \});
			    it('validates nickname', () => \{
			      testField('nickname', 300);
			    \});
			    it('validates other fields', () => \{
			      testField('test');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\field.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('auth0_lock\\src\\__tests__\\field\\login_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, mockComponent \} from 'testUtils';
			
			jest.mock('field/email/email_pane', () => mockComponent('email_pane'));
			jest.mock('field/username/username_pane', () => mockComponent('username_pane'));
			jest.mock('field/password/password_pane', () => mockComponent('password_pane'));
			
			jest.mock('connection/database/index');
			jest.mock('connection/database/actions');
			
			const mockId = 1;
			jest.mock('core/index', () => (\{
			  id: () => mockId,
			  captcha: () => undefined,
			  connectionResolver: jest.fn()
			\}));
			
			import LoginPane from 'connection/database/login_pane';
			
			describe('LoginPane', () => \{
			  const defaultProps = \{
			    emailInputPlaceholder: 'emailInputPlaceholder',
			    forgotPasswordAction: 'forgotPasswordAction',
			    i18n: \{\},
			    lock: \{\},
			    passwordInputPlaceholder: 'passwordInputPlaceholder',
			    showForgotPasswordLink: true,
			    showPassword: true,
			    usernameInputPlaceholder: 'usernameInputPlaceholder'
			  \};
			  const databaseIndexMock = require('connection/database/index');
			  const coreMock = require('core/index');
			
			  beforeEach(() => \{
			    databaseIndexMock.hasScreen.mockImplementation(() => true);
			    databaseIndexMock.forgotPasswordLink.mockImplementation(() => 'forgotPasswordLink');
			  \});
			
			  afterEach(() => \{
			    jest.resetAllMocks();
			  \});
			
			  it('renders correctly', () => \{
			    expectComponent(<LoginPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('shows header when instructions is not empty', () => \{
			    expectComponent(<LoginPane \{...defaultProps\} instructions="instructions" />).toMatchSnapshot();
			  \});
			  it('shows email pane when user usernameStyle === email', () => \{
			    expectComponent(<LoginPane \{...defaultProps\} usernameStyle="email" />).toMatchSnapshot();
			  \});
			  it('shows username pane when connectionResolver is specified, even if usernameStyle is email', () => \{
			    coreMock.connectionResolver.mockImplementation(() => () => true);
			    expectComponent(<LoginPane \{...defaultProps\} usernameStyle="email" />).toMatchSnapshot();
			  \});
			  it('shows username pane when user usernameStyle !== email', () => \{
			    expectComponent(<LoginPane \{...defaultProps\} usernameStyle="any" />).toMatchSnapshot();
			    expectComponent(<LoginPane \{...defaultProps\} usernameStyle="username" />).toMatchSnapshot();
			  \});
			  it('hides password pane when showPassword===false', () => \{
			    expectComponent(<LoginPane \{...defaultProps\} showPassword=\{false\} />).toMatchSnapshot();
			  \});
			  describe('hides password link', () => \{
			    it('when showForgotPasswordLink === false', () => \{
			      expectComponent(
			        <LoginPane \{...defaultProps\} showForgotPasswordLink=\{false\} />
			      ).toMatchSnapshot();
			    \});
			    it('when lock does not have the screen \`forgotPassword\`', () => \{
			      databaseIndexMock.hasScreen.mockImplementation((l, screenName) =>
			        screenName === 'forgotPassword' ? false : true
			      );
			      expectComponent(<LoginPane \{...defaultProps\} />).toMatchSnapshot();
			    \});
			  \});
			  it('clicking password forgot link calls showResetPasswordActivity() when forgotPasswordLink() is undefined', () => \{
			    databaseIndexMock.forgotPasswordLink.mockImplementation(() => undefined);
			    const wrapper = mount(<LoginPane \{...defaultProps\} />);
			    wrapper.find('a.auth0-lock-alternative-link').simulate('click');
			
			    const actions = require('connection/database/actions');
			    const \{ calls \} = actions.showResetPasswordActivity.mock;
			    expect(calls.length).toBe(1);
			    expect(calls[0][0]).toBe(mockId);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\login_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('auth0_lock\\src\\__tests__\\field\\mfa_code_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/input/mfa_code_input', () => mockComponent('mfa_code_input'));
			
			const getComponent = () => require('field/mfa-code/mfa_code_pane').default;
			
			describe('MFACodePane', () => \{
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(',')
			    \},
			    lock: \{\},
			    placeholder: 'placeholder'
			  \};
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('field/index', () => (\{
			      getFieldValue: () => 'mfa',
			      isFieldVisiblyInvalid: () => true
			    \}));
			
			    jest.mock('field/password', () => (\{
			      getMFACodeValidation: () => 'getMFACodeValidation',
			      setMFACode: 'setMFACode'
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 1,
			      submitting: () => false,
			      ui: \{
			        avatar: () => false
			      \}
			    \}));
			
			    jest.mock('store/index', () => (\{
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			  \});
			
			  it('renders correctly', () => \{
			    const MFACodePane = getComponent();
			    expectComponent(<MFACodePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets isValid as true when \`isFieldVisiblyInvalid\` is false', () => \{
			    require('field/index').isFieldVisiblyInvalid = () => false;
			    let MFACodePane = getComponent();
			
			    expectComponent(<MFACodePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('calls \`swap\` onChange', () => \{
			    let MFACodePane = getComponent();
			
			    const wrapper = mount(<MFACodePane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			    props.onChange(\{ target: \{ value: 'newUser' \} \});
			
			    const \{ mock \} = require('store/index').swap;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\mfa_code_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\src\\__tests__\\field\\option_selection_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/list', () => mockComponent('list'));
			
			const getComponent = () => require('field/option_selection_pane').default;
			
			describe('OptionSelectionPane', () => \{
			  const defaultProps = \{
			    iconUrl: 'iconUrl',
			    icon: 'icon',
			    items: 'items',
			    name: 'option_selection_pane',
			    model: \{
			      get: () => 'id'
			    \}
			  \};
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('field/actions', () => (\{
			      cancelOptionSelection: jest.fn(),
			      selectOption: jest.fn()
			    \}));
			  \});
			  it('renders correctly', () => \{
			    const OptionSelectionPane = getComponent();
			    expectComponent(<OptionSelectionPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('calls \`selectOption\` when selected', () => \{
			    let OptionSelectionPane = getComponent();
			
			    const wrapper = mount(<OptionSelectionPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			
			    props.onSelect('selected');
			
			    const \{ mock \} = require('field/actions').selectOption;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  it('calls \`cancelOptionSelection\` when cancelled', () => \{
			    let OptionSelectionPane = getComponent();
			
			    const wrapper = mount(<OptionSelectionPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			
			    props.onCancel();
			
			    const \{ mock \} = require('field/actions').cancelOptionSelection;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\option_selection_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\src\\__tests__\\field\\password.test.js', () => {
        const sourceCode = `
			import Immutable from 'immutable';
			
			describe('field/password', () => \{
			  let passwordField;
			  beforeEach(() => \{
			    jest.resetModules();
			    jest.mock('password-sheriff/lib/policy');
			    passwordField = require('field/password');
			  \});
			  describe('validatePassword()', () => \{
			    it(\`returns false when there is no password\`, () => \{
			      const value = passwordField.validatePassword('');
			      expect(value).toBe(false);
			    \});
			    it(\`returns true when there is no policy\`, () => \{
			      const value = passwordField.validatePassword('the-password');
			      expect(value).toBe(true);
			    \});
			    it(\`validates password correctly when there is a policy\`, () => \{
			      const model = \{
			        toJS: jest.fn()
			      \};
			      passwordField.validatePassword('the-password', model);
			      const \{ mock \} = require('password-sheriff/lib/policy').prototype.check;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0][0]).toBe('the-password');
			      expect(model.toJS).toHaveBeenCalledTimes(1);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\password.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\src\\__tests__\\field\\password_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/input/password_input', () => mockComponent('password_input'));
			
			const getComponent = () => require('field/password/password_pane').default;
			
			describe('PasswordPane', () => \{
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(','),
			      html: (...keys) => keys.join(',')
			    \},
			    lock: \{\},
			    placeholder: 'placeholder',
			    policy: 'policy',
			    strengthMessages: \{\}
			  \};
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('field/index', () => (\{
			      isFieldValid: () => true,
			      getFieldValue: (m, field) => field,
			      isFieldVisiblyInvalid: () => true
			    \}));
			
			    jest.mock('field/password', () => (\{
			      setPassword: 'setPassword'
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 1,
			      submitting: () => false,
			      ui: \{
			        allowShowPassword: () => false
			      \}
			    \}));
			
			    jest.mock('store/index', () => (\{
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			  \});
			
			  it('renders correctly', () => \{
			    const PasswordPane = getComponent();
			    expectComponent(<PasswordPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders correctly when \`allowShowPassword\` is true', () => \{
			    require('core/index').ui.allowShowPassword = () => true;
			    const PasswordPane = getComponent();
			    expectComponent(<PasswordPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('renders correct css className when \`hidden\` is true', () => \{
			    const PasswordPane = getComponent();
			    expectComponent(<PasswordPane \{...defaultProps\} hidden />).toMatchSnapshot();
			  \});
			  it('disables input when submitting', () => \{
			    require('core/index').submitting = () => true;
			    const PasswordPane = getComponent();
			
			    expectComponent(<PasswordPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets showPasswordStrengthMessage as true when \`isFieldValid\` is false', () => \{
			    require('field/index').isFieldValid = () => false;
			    let PasswordPane = getComponent();
			
			    expectComponent(<PasswordPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets showPasswordStrengthMessage as false when \`isFieldValid\` is true', () => \{
			    require('field/index').isFieldValid = () => true;
			    let PasswordPane = getComponent();
			
			    expectComponent(<PasswordPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets isValid as true when \`isFieldVisiblyInvalid\` is false', () => \{
			    require('field/index').isFieldVisiblyInvalid = () => false;
			    let PasswordPane = getComponent();
			
			    expectComponent(<PasswordPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('calls \`swap\` when password changes', () => \{
			    let PasswordPane = getComponent();
			
			    const wrapper = mount(<PasswordPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper, 1);
			    props.onChange(\{ target: \{ value: 'newPassword' \} \});
			
			    const \{ mock \} = require('store/index').swap;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  it('calls \`swap\` when checkbox is clicked', () => \{
			    require('core/index').ui.allowShowPassword = () => true;
			    let PasswordPane = getComponent();
			
			    const wrapper = mount(<PasswordPane \{...defaultProps\} />);
			    const props = wrapper.find('div input').props();
			    props.onChange(\{ target: \{ checked: true \} \});
			
			    const \{ mock \} = require('store/index').swap;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  it('sets \`blankErrorHint\` when password is empty', () => \{
			    require('field/index').getFieldValue = (m, field) => '';
			    const PasswordPane = getComponent();
			    expectComponent(<PasswordPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\password_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('auth0_lock\\src\\__tests__\\field\\phone_number_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/input/phone_number_input', () => mockComponent('phone_number_input'));
			jest.mock('ui/input/select_input', () => mockComponent('select_input'));
			
			const getComponent = () => require('field/phone-number/phone_number_pane').default;
			
			describe('PhoneNumberPane', () => \{
			  const defaultProps = \{
			    lock: \{\},
			    placeholder: 'placeholder'
			  \};
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('field/index', () => (\{
			      phoneNumber: () => 'phoneNumber',
			      isFieldVisiblyInvalid: () => true
			    \}));
			
			    jest.mock('field/phone_number', () => (\{
			      humanLocation: () => 'humanLocation',
			      setPhoneNumber: 'setPhoneNumber'
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 1,
			      submitting: () => false
			    \}));
			
			    jest.mock('field/actions', () => (\{
			      startOptionSelection: jest.fn()
			    \}));
			
			    jest.mock('store/index', () => (\{
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			  \});
			
			  it('renders correctly', () => \{
			    const PhoneNumberPane = getComponent();
			    expectComponent(<PhoneNumberPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('shows header when instructions are available', () => \{
			    const PhoneNumberPane = getComponent();
			    expectComponent(
			      <PhoneNumberPane \{...defaultProps\} instructions=\{<span>instructions</span>\} />
			    ).toMatchSnapshot();
			  \});
			  it('disables input when submitting', () => \{
			    require('core/index').submitting = () => true;
			    const PhoneNumberPane = getComponent();
			
			    expectComponent(<PhoneNumberPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets isValid as true when \`isFieldVisiblyInvalid\` is false', () => \{
			    require('field/index').isFieldVisiblyInvalid = () => false;
			    let PhoneNumberPane = getComponent();
			
			    expectComponent(<PhoneNumberPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('calls \`startOptionSelection\` when SelectInput is clicked', () => \{
			    let PhoneNumberPane = getComponent();
			
			    const wrapper = mount(<PhoneNumberPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper, 1);
			
			    props.onClick();
			
			    const \{ mock \} = require('field/actions').startOptionSelection;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  it('calls \`swap\` when PhoneNumberInput changes', () => \{
			    let PhoneNumberPane = getComponent();
			
			    const wrapper = mount(<PhoneNumberPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper, 2);
			
			    props.onChange(\{ target: \{ value: 'newPhoneNumber' \} \});
			
			    const \{ mock \} = require('store/index').swap;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\phone_number_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('auth0_lock\\src\\__tests__\\field\\social_buttons_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/button/auth_button', () => mockComponent('auth_button'));
			
			const getComponent = () => require('field/social/social_buttons_pane').default;
			
			describe('SocialButtonsPane', () => \{
			  const defaultProps = \{
			    lock: \{
			      get: p => \{
			        expect(p).toBe('id');
			        return 'lock-id-1';
			      \}
			    \},
			    labelFn: (...keys) => keys.join(','),
			    showLoading: false,
			    signUp: false,
			    disabled: false
			  \};
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('quick-auth/actions', () => (\{
			      logIn: jest.fn()
			    \}));
			
			    jest.mock('connection/social/index', () => (\{
			      displayName: () => 'displayName',
			      socialConnections: () => [
			        \{ item: 1, get: key => \`socialConnections1-\$\{key\}\` \},
			        \{ item: 2, get: key => \`socialConnections2-\$\{key\}\` \}
			      ],
			      authButtonsTheme: () => (\{
			        get: () => (\{
			          get: key => \`authButtonsTheme-\$\{key\}\`
			        \})
			      \})
			    \}));
			
			    jest.mock('connection/database/index', () => (\{
			      termsAccepted: () => false
			    \}));
			
			    jest.mock('connection/database/actions', () => (\{
			      signUpError: jest.fn()
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 1,
			      emitEvent: jest.fn()
			    \}));
			  \});
			
			  it('renders correctly', () => \{
			    const SocialButtonsPane = getComponent();
			    expectComponent(<SocialButtonsPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('calls signUpError when isSignUp===true and terms were not accepted', () => \{
			    const SocialButtonsPane = getComponent();
			
			    const wrapper = mount(<SocialButtonsPane \{...defaultProps\} signUp=\{true\} />);
			    const props = extractPropsFromWrapper(wrapper, 2);
			
			    props.onClick();
			
			    const \{ mock \} = require('connection/database/actions').signUpError;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  it('shows loading when showLoading === true', () => \{
			    const SocialButtonsPane = getComponent();
			    expectComponent(<SocialButtonsPane \{...defaultProps\} showLoading />).toMatchSnapshot();
			  \});
			  it('shows header when instructions are available', () => \{
			    const SocialButtonsPane = getComponent();
			    expectComponent(
			      <SocialButtonsPane \{...defaultProps\} instructions="instructions" />
			    ).toMatchSnapshot();
			  \});
			  it('calls \`logIn\` with social connection 1 when first button is clicked', () => \{
			    let SocialButtonsPane = getComponent();
			
			    const wrapper = mount(<SocialButtonsPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper, 2);
			
			    props.onClick();
			
			    const \{ mock \} = require('quick-auth/actions').logIn;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  it('calls \`logIn\` with social connection 2 when second button is clicked', () => \{
			    let SocialButtonsPane = getComponent();
			
			    const wrapper = mount(<SocialButtonsPane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper, 3);
			
			    props.onClick();
			
			    const \{ mock \} = require('quick-auth/actions').logIn;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\social_buttons_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('auth0_lock\\src\\__tests__\\field\\username.test.js', () => {
        const sourceCode = `
			import Immutable from 'immutable';
			
			describe('field/username', () => \{
			  let username;
			  let dbConnection;
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('field/index', () => (\{
			      setField: jest.fn()
			    \}));
			
			    jest.mock('field/email', () => (\{
			      validateEmail: s => s
			    \}));
			
			    jest.mock('connection/database', () => (\{
			      databaseConnection: m => m
			    \}));
			
			    username = require('field/username');
			    dbConnection = Immutable.fromJS(\{
			      validation: null
			    \});
			  \});
			  describe('usernameLooksLikeEmail()', () => \{
			    it('checks for @ and .', () => \{
			      expect(username.usernameLooksLikeEmail('t@t.com')).toBe(true);
			      expect(username.usernameLooksLikeEmail('test.email@t.com')).toBe(true);
			      expect(username.usernameLooksLikeEmail('tt.com')).toBe(false);
			      expect(username.usernameLooksLikeEmail('t@tcom')).toBe(false);
			    \});
			  \});
			  describe('getUsernameValidation()', () => \{
			    it(\`returns database connection's username validation\`, () => \{
			      expect(
			        username.getUsernameValidation(
			          Immutable.fromJS(\{
			            validation: \{
			              username: \{ min: 1, max: 2 \}
			            \}
			          \})
			        )
			      ).toMatchSnapshot();
			    \});
			    it(\`returns null there's no db connection username validation\`, () => \{
			      expect(username.getUsernameValidation(dbConnection)).toBe(null);
			    \});
			  \});
			  describe('setUsername()', () => \{
			    it(\`calls setField\`, () => \{
			      username.setUsername(dbConnection, 'a-username', 'username', true);
			      const \{ mock \} = require('field/index').setField;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			    describe('field validation', () => \{
			      it('validates when usernameStyle is \`email\`', () => \{
			        const email = 'a@a.com';
			        username.setUsername(dbConnection, email, 'email', true);
			        const \{ mock \} = require('field/index').setField;
			        expect(mock.calls[0][3](email)).toBe(email);
			      \});
			      it('validates when usernameStyle is \`username\`', () => \{
			        const theUsername = 'the_user';
			        username.setUsername(dbConnection, theUsername, 'username', true);
			        const \{ mock \} = require('field/index').setField;
			        expect(mock.calls[0][3](theUsername)).toBe(true);
			      \});
			      it('validates when username looks like an email', () => \{
			        const email = 'a@a.com';
			        username.setUsername(dbConnection, email, null, true);
			        const \{ mock \} = require('field/index').setField;
			        expect(mock.calls[0][3](email)).toBe(email);
			      \});
			      it('validates when username does not look like an email', () => \{
			        const theUsername = 'the_user';
			        username.setUsername(dbConnection, theUsername, null, true);
			        const \{ mock \} = require('field/index').setField;
			        expect(mock.calls[0][3](theUsername)).toBe(true);
			      \});
			      it('defaults usernameStyle to \`username\`', () => \{
			        const theUsername = 'the_user';
			        username.setUsername(dbConnection, theUsername, undefined, true);
			        const \{ mock \} = require('field/index').setField;
			        expect(mock.calls[0][3](theUsername)).toBe(true);
			      \});
			      it('defaults validateUsernameFormat to \`true\`', () => \{
			        const theUsername = 'the_user';
			        username.setUsername(dbConnection, theUsername, 'username', undefined);
			        const \{ mock \} = require('field/index').setField;
			        expect(mock.calls[0][3](theUsername)).toBe(true);
			      \});
			      describe('when in username mode', () => \{
			        const expectToFailWith = theUsername => \{
			          username.setUsername(dbConnection, theUsername, 'username', true);
			          const \{ mock \} = require('field/index').setField;
			          expect(mock.calls[0][3](theUsername)).toBe(false);
			        \};
			        const expectToSuccedWith = theUsername => \{
			          username.setUsername(dbConnection, theUsername, 'username', true);
			          const \{ mock \} = require('field/index').setField;
			          expect(mock.calls[0][3](theUsername)).toBe(true);
			        \};
			        describe('validates if the username is not empty', () => \{
			          it('when \`validateUsernameFormat\` is true but there is no db connection validation', () => \{
			            const theUsername = '';
			            username.setUsername(dbConnection, theUsername, 'username', true);
			            const \{ mock \} = require('field/index').setField;
			            expect(mock.calls[0][3](theUsername)).toBe(false);
			          \});
			          it('when \`validateUsernameFormat\` is false and there is db connection validation', () => \{
			            const theUsername = '';
			            const customDbConnection = Immutable.fromJS(\{
			              validation: \{
			                username: \{ min: 1, max: 2 \}
			              \}
			            \});
			            username.setUsername(customDbConnection, theUsername, 'username', false);
			            const \{ mock \} = require('field/index').setField;
			            expect(mock.calls[0][3](theUsername)).toBe(false);
			          \});
			        \});
			        describe('with a db connection validation', () => \{
			          beforeEach(() => \{
			            dbConnection = Immutable.fromJS(\{
			              validation: \{
			                username: \{ min: 3, max: 5 \}
			              \}
			            \});
			          \});
			          it('validates min length', () => \{
			            expectToFailWith('aa');
			          \});
			          it('validates max length', () => \{
			            expectToFailWith('aaaaaa');
			          \});
			          it('email is used as user name', () => \{
			            expectToFailWith('a@a.com');
			          \});
			          it('validates invalid chars', () => \{
			            const invalidChars = \`\{\}[],;?/\\\\%¨&*()¹²³ªº§£¢¬<>|" \`.split('');
			            invalidChars.forEach(i => expectToFailWith(\`aa\$\{i\}\`));
			          \});
			          it('accepts letters, numbers, \`_\`, \`-\`, \`+\` and \`.\`', () => \{
			            const validChars = \`_+-.!#\$'^\\\`~@\`.split('');
			            validChars.forEach(i => expectToSuccedWith(\`aa\$\{i\}\`));
			          \});
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\username.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('auth0_lock\\src\\__tests__\\field\\username_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/input/username_input', () => mockComponent('username_input'));
			
			const getComponent = () => require('field/username/username_pane').default;
			
			describe('UsernamePane', () => \{
			  const defaultProps = \{
			    i18n: \{
			      str: (...keys) => keys.join(',')
			    \},
			    lock: \{\},
			    placeholder: 'placeholder',
			    validateFormat: false,
			    usernameStyle: 'any',
			    showForgotPasswordLink: true,
			    showPassword: true,
			    usernameInputPlaceholder: 'usernameInputPlaceholder',
			    strictValidation: false
			  \};
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    const mockUsername = 'username';
			    jest.mock('field/index', () => (\{
			      username: () => mockUsername,
			      getFieldValue: () => mockUsername,
			      isFieldVisiblyInvalid: () => true
			    \}));
			
			    jest.mock('field/username', () => (\{
			      getUsernameValidation: () => undefined,
			      usernameLooksLikeEmail: () => true,
			      setUsername: 'setUsername'
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 1,
			      submitting: () => false,
			      ui: \{
			        avatar: () => false,
			        allowAutocomplete: () => false
			      \}
			    \}));
			
			    jest.mock('avatar', () => (\{
			      requestAvatar: jest.fn(),
			      debouncedRequestAvatar: jest.fn()
			    \}));
			
			    jest.mock('store/index', () => (\{
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			  \});
			
			  it('renders correctly', () => \{
			    const UsernamePane = getComponent();
			    expectComponent(<UsernamePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets \`blankErrorHint\` when username is empty', () => \{
			    const fieldIndexMock = require('field/index');
			    fieldIndexMock.username = () => undefined;
			    fieldIndexMock.getFieldValue = () => undefined;
			    const UsernamePane = getComponent();
			
			    expectComponent(<UsernamePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets \`usernameFormatErrorHint\` when usernameLooksLikeEmail() returns false and \`validateFormat\` is true', () => \{
			    const fieldUsernameMock = require('field/username');
			    fieldUsernameMock.getUsernameValidation = () => (\{ min: 'min', max: 'max' \});
			    fieldUsernameMock.usernameLooksLikeEmail = () => false;
			    const UsernamePane = getComponent();
			
			    expectComponent(<UsernamePane \{...defaultProps\} validateFormat />).toMatchSnapshot();
			  \});
			  it('sets isValid as true when \`isFieldVisiblyInvalid\` is false', () => \{
			    require('field/index').isFieldVisiblyInvalid = () => false;
			    let UsernamePane = getComponent();
			
			    expectComponent(<UsernamePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets autoComplete to true when \`allowAutocomplete\` is true', () => \{
			    require('core/index').ui.allowAutocomplete = () => true;
			    let UsernamePane = getComponent();
			
			    expectComponent(<UsernamePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('fetches the avatar on componentDidMount if ui.avatar is true and there is a username', () => \{
			    require('core/index').ui.avatar = () => true;
			    let UsernamePane = getComponent();
			
			    mount(<UsernamePane \{...defaultProps\} />);
			
			    const \{ mock \} = require('avatar').requestAvatar;
			    expect(mock.calls.length).toBe(1);
			  \});
			  it('fetches the avatar onChange if ui.avatar is true', () => \{
			    require('core/index').ui.avatar = () => true;
			    let UsernamePane = getComponent();
			
			    const wrapper = mount(<UsernamePane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			    props.onChange(\{ target: \{ value: 'newUser' \} \});
			
			    const \{ mock \} = require('avatar').debouncedRequestAvatar;
			    expect(mock.calls.length).toBe(1);
			  \});
			  it('calls \`swap\` onChange', () => \{
			    let UsernamePane = getComponent();
			
			    const wrapper = mount(<UsernamePane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper);
			    props.onChange(\{ target: \{ value: 'newUser' \} \});
			
			    const \{ mock \} = require('store/index').swap;
			    expect(mock.calls.length).toBe(2);
			    expect(mock.calls[1]).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\username_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('auth0_lock\\src\\__tests__\\field\\vcode.test.js', () => {
        const sourceCode = `
			import Immutable from 'immutable';
			
			describe('field/vcode', () => \{
			  let vcode;
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('field/index', () => (\{
			      setField: jest.fn()
			    \}));
			
			    vcode = require('field/vcode');
			  \});
			  describe('setVcode()', () => \{
			    it(\`removes spaces from code\`, () => \{
			      vcode.setVcode(Immutable.fromJS(\{\}), ' 123 456 ');
			      const \{ mock \} = require('field/index').setField;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\vcode.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\field\\vcode_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent, extractPropsFromWrapper, mockComponent \} from 'testUtils';
			
			jest.mock('ui/input/vcode_input', () => mockComponent('vcode_input'));
			
			const getComponent = () => require('field/vcode/vcode_pane').default;
			
			describe('VcodePane', () => \{
			  const defaultProps = \{
			    lock: \{\},
			    placeholder: 'placeholder',
			    resendLabel: 'resendLabel',
			    onRestart: jest.fn()
			  \};
			  beforeEach(() => \{
			    jest.resetModules();
			
			    jest.mock('field/index', () => (\{
			      vcode: () => 'vcode',
			      isFieldVisiblyInvalid: () => true
			    \}));
			
			    jest.mock('field/phone_number', () => (\{
			      setVcode: 'setVcode'
			    \}));
			
			    jest.mock('core/index', () => (\{
			      id: () => 1,
			      submitting: () => false,
			      globalError: () => true
			    \}));
			
			    jest.mock('utils/media_utils', () => (\{
			      isSmallScreen: () => true
			    \}));
			
			    jest.mock('store/index', () => (\{
			      swap: jest.fn(),
			      updateEntity: 'updateEntity'
			    \}));
			  \});
			
			  it('renders correctly', () => \{
			    const VcodePane = getComponent();
			
			    expectComponent(<VcodePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('shows header when instructions are available', () => \{
			    const VcodePane = getComponent();
			
			    expectComponent(
			      <VcodePane \{...defaultProps\} instructions=\{<span>instructions</span>\} />
			    ).toMatchSnapshot();
			  \});
			  it('disable input when submitting', () => \{
			    require('core/index').submitting = () => true;
			    const VcodePane = getComponent();
			
			    expectComponent(<VcodePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets isValid as true when \`isFieldVisiblyInvalid\` is false and globalError() is false', () => \{
			    require('field/index').isFieldVisiblyInvalid = () => false;
			    require('core/index').globalError = () => false;
			    let VcodePane = getComponent();
			
			    expectComponent(<VcodePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('sets autoFocus as true when \`isSmallScreen\` is false', () => \{
			    require('utils/media_utils').isSmallScreen = () => false;
			    let VcodePane = getComponent();
			
			    expectComponent(<VcodePane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			  it('calls \`onRestart\` when alternative link is clicked', () => \{
			    let VcodePane = getComponent();
			
			    const wrapper = mount(<VcodePane \{...defaultProps\} />);
			    wrapper.find('.auth0-lock-alternative-link').simulate('click');
			
			    const \{ mock \} = defaultProps.onRestart;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			  it('calls \`swap\` when VcodeInput changes', () => \{
			    let VcodePane = getComponent();
			
			    const wrapper = mount(<VcodePane \{...defaultProps\} />);
			    const props = extractPropsFromWrapper(wrapper, 1);
			
			    props.onChange(\{ preventDefault: jest.fn(), target: \{ value: 'newCode' \} \});
			
			    const \{ mock \} = require('store/index').swap;
			    expect(mock.calls.length).toBe(1);
			    expect(mock.calls[0]).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\field\\vcode_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('auth0_lock\\src\\__tests__\\i18n.test.js', () => {
        const sourceCode = `
			import Immutable from 'immutable';
			import flatten from 'flat';
			
			import enDictionary from '../i18n/en';
			import esDictionary from '../i18n/es';
			
			import * as sync from '../sync';
			import * as l from '../core/index';
			import \{ initSanitizer \} from '../sanitizer';
			
			describe('i18n', () => \{
			  let syncSpy;
			  let langSpy;
			
			  beforeEach(() => \{
			    syncSpy = jest.spyOn(sync, 'default');
			
			    langSpy = jest.spyOn(l.ui, 'language').mockImplementation(() => \{
			      return 'en';
			    \});
			  \});
			
			  afterEach(() => \{
			    syncSpy.mockRestore();
			    langSpy.mockRestore();
			  \});
			
			  describe('load i18n configuration', () => \{
			    it('should have a defaultDictionary', () => \{
			      const i18n = require('../i18n');
			
			      // We need to initialize the state
			      var m = Immutable.fromJS(\{\});
			
			      // Initialize i18n.
			      const initialized = i18n.initI18n(m);
			
			      let language = flatten(initialized.getIn(['i18n', 'strings']).toJS());
			      const en = flatten(enDictionary);
			
			      expect(language).toEqual(en);
			    \});
			  \});
			
			  describe('when en language is selected', () => \{
			    it('should allow check for external en dictionaries', () => \{
			      const i18n = require('../i18n');
			
			      i18n.initI18n(Immutable.fromJS(\{\}));
			      expect(syncSpy).toHaveBeenCalledTimes(1);
			    \});
			  \});
			
			  describe('when html is called', () => \{
			    it('should sanitize the input and not allow for javascript to be passed through', () => \{
			      const i18n = require('../i18n');
			      const strings = \{
			        test: '<img src=1 href=1 onerror="javascript:alert(1)"></img>'
			      \};
			      const m = Immutable.fromJS(\{ i18n: \{ strings \} \});
			      const html = i18n.html(m, 'test');
			      expect(html.props.dangerouslySetInnerHTML.__html).not.toMatch(/javascript:alert/);
			      expect(html.props.dangerouslySetInnerHTML.__html).toEqual('<img href="1" src="1">');
			    \});
			
			    it('should allow target=_blank with noopener noreferrer attributes', () => \{
			      initSanitizer();
			
			      const i18n = require('../i18n');
			
			      const strings = \{
			        test: '<a href="#" target="_blank">link</a>'
			      \};
			
			      const m = Immutable.fromJS(\{ i18n: \{ strings \} \});
			      const html = i18n.html(m, 'test');
			
			      expect(html.props.dangerouslySetInnerHTML.__html).toEqual(
			        '<a href="#" target="_blank" rel="noopener noreferrer">link</a>'
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\i18n.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('auth0_lock\\src\\__tests__\\quick-auth\\actions.test.js', () => {
        const sourceCode = `
			import \{ logIn \} from '../../quick-auth/actions';
			
			jest.mock('../../core/actions', () => (\{
			  logIn: jest.fn()
			\}));
			
			jest.mock('store/index', () => (\{
			  read: jest.fn(() => 'model'),
			  getEntity: 'getEntity',
			  swap: jest.fn(),
			  updateEntity: 'updateEntity'
			\}));
			
			jest.mock('../../core/index', () => (\{
			  id: () => 'id',
			  auth: \{
			    connectionScopes: jest.fn(() => (\{
			      get: jest.fn()
			    \})),
			    redirect: jest.fn(() => true)
			  \},
			  setSuppressSubmitOverlay: jest.fn()
			\}));
			
			describe('quick-auth.actions', () => \{
			  beforeEach(() => \{
			    jest.clearAllMocks();
			  \});
			
			  it('calls logIn with the correct parameters', () => \{
			    const connection = \{
			      get: jest.fn(key => \{
			        switch (key) \{
			          case 'name':
			            return 'name';
			          case 'strategy':
			            return 'google';
			        \}
			      \})
			    \};
			
			    logIn('id', connection, 'hint', 'prompt');
			
			    const coreActions = require('../../core/actions');
			
			    expect(coreActions.logIn.mock.calls.length).toBe(1);
			    expect(coreActions.logIn.mock.calls[0]).toMatchSnapshot();
			  \});
			
			  it('sets display to "popup" when using facebook and there\\'s no redirect', () => \{
			    const connection = \{
			      get: jest.fn(key => \{
			        switch (key) \{
			          case 'name':
			            return 'name';
			          case 'strategy':
			            return 'facebook';
			        \}
			      \})
			    \};
			
			    const core = require('../../core/index');
			    core.auth.redirect = jest.fn(() => false);
			
			    logIn('id', connection);
			
			    const coreActions = require('../../core/actions');
			
			    expect(coreActions.logIn.mock.calls.length).toBe(1);
			    expect(coreActions.logIn.mock.calls[0]).toMatchSnapshot();
			  \});
			
			  it('calls setSuppressSubmitOverlay with true when using Apple connection', () => \{
			    const connection = \{
			      get: jest.fn(key => \{
			        switch (key) \{
			          case 'name':
			            return 'name';
			          case 'strategy':
			            return 'apple';
			        \}
			      \})
			    \};
			
			    logIn('id', connection);
			
			    const \{ swap \} = require('store/index');
			    const l = require('../../core/index');
			
			    expect(swap.mock.calls.length).toBe(1);
			    expect(swap.mock.calls[0][3]).toBe(l.setSupressSubmitOverlay);
			    expect(swap.mock.calls[0][4]).toBe(true);
			  \});
			
			  it('calls setSuppressSubmitOverlay with false when not using Apple connection', () => \{
			    const connection = \{
			      get: jest.fn(key => \{
			        switch (key) \{
			          case 'name':
			            return 'name';
			          case 'strategy':
			            return 'facebook';
			        \}
			      \})
			    \};
			
			    logIn('id', connection);
			
			    const \{ swap \} = require('store/index');
			    const l = require('../../core/index');
			
			    expect(swap.mock.calls.length).toBe(1);
			    expect(swap.mock.calls[0][3]).toBe(l.setSupressSubmitOverlay);
			    expect(swap.mock.calls[0][4]).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\quick-auth\\actions.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('auth0_lock\\src\\__tests__\\ui\\box\\chrome.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import immutable from 'immutable';
			
			import \{ expectComponent, mockComponent \} from 'testUtils';
			const getComponent = () => require('ui/box/chrome').default;
			
			jest.mock('ui/box/header', () => mockComponent('header'));
			jest.mock('ui/box/multisize_slide', () => mockComponent('div'));
			jest.mock('ui/box/global_message', () => mockComponent('div'));
			
			let mockEventRegister = \{\};
			
			const triggerEvent = name => \{
			  if (name in mockEventRegister) \{
			    return mockEventRegister[name]();
			  \}
			
			  throw new Error(\`Unknown event '\$\{name\}'\`);
			\};
			
			jest.mock('core/index', () => (\{
			  handleEvent: jest.fn((_, event, fn) => \{
			    mockEventRegister[event] = fn;
			  \}),
			  ui: \{
			    forceAutoHeight: jest.fn().mockReturnValue(false)
			  \},
			  id: jest.fn(() => 'lock')
			\}));
			
			const defaultProps = \{
			  contentComponent: mockComponent('content'),
			  contentProps: \{
			    model: immutable.fromJS(\{
			      id: '__lock_id__'
			    \})
			  \},
			  avatar: 'avatar',
			  isSubmitting: false,
			  logo: 'logo',
			  primaryColor: 'white',
			  screenName: 'screen name',
			  classNames: '',
			  color: 'black'
			\};
			
			describe('Chrome', () => \{
			  let Chrome;
			
			  beforeEach(() => \{
			    Chrome = getComponent();
			    Chrome.prototype.getHeaderSize = jest.fn(() => 200);
			
			    mockEventRegister = \{\};
			  \});
			
			  it('renders correctly with basic props', () => \{
			    expectComponent(<Chrome \{...defaultProps\} />).toMatchSnapshot();
			  \});
			
			  it('renders correctly when there is a global message', () => \{
			    const props = \{
			      ...defaultProps,
			      error: 'There is an error'
			    \};
			
			    expectComponent(<Chrome \{...props\} />).toMatchSnapshot();
			  \});
			
			  it('renders correctly when there is a global success message', () => \{
			    const props = \{
			      ...defaultProps,
			      success: 'This is a success message'
			    \};
			
			    expectComponent(<Chrome \{...props\} />).toMatchSnapshot();
			  \});
			
			  it('renders correctly when there is a global information message', () => \{
			    const props = \{
			      ...defaultProps,
			      info: 'This is an information message'
			    \};
			
			    expectComponent(<Chrome \{...props\} />).toMatchSnapshot();
			  \});
			
			  it('can dislay all global messages together', () => \{
			    const props = \{
			      ...defaultProps,
			      info: 'This is an information message',
			      success: 'This is a success message',
			      error: 'There is an error'
			    \};
			
			    expectComponent(<Chrome \{...props\} />).toMatchSnapshot();
			  \});
			
			  it('adds the auto-height class when forceAutoHeight UI prop is true', () => \{
			    require('core/index').ui.forceAutoHeight.mockReturnValue(true);
			
			    const props = \{
			      ...defaultProps,
			      info: 'This is an information message',
			      success: 'This is a success message',
			      error: 'There is an error'
			    \};
			
			    expectComponent(<Chrome \{...props\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\ui\\box\\chrome.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('auth0_lock\\src\\__tests__\\ui\\box\\confirmation_pane.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import I from 'immutable';
			
			import \{ expectComponent \} from 'testUtils';
			
			import ConfirmationPane from '../../../ui/box/confirmation_pane';
			
			const defaultProps = \{
			  lock: I.fromJS(\{ id: '__lock-id__' \}),
			  backHandler: () => \{\},
			  closeHandler: () => \{\},
			  children: <span>test</span>,
			  svg: <svg>svg</svg>
			\};
			
			describe('ConfirmationPane', () => \{
			  it('renders correctly', async () => \{
			    expectComponent(<ConfirmationPane \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\ui\\box\\confirmation_pane.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\ui\\box\\container.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import immutable from 'immutable';
			import \{ expectComponent, mockComponent \} from '../../testUtils';
			
			jest.mock('store/index', () => (\{
			  swap: jest.fn(),
			  updateEntity: 'updateEntity'
			\}));
			
			jest.mock('ui/box/chrome', () => mockComponent('chrome'));
			
			const mockEvent = \{
			  preventDefault: () => \{\}
			\};
			
			const getContainer = opts => \{
			  const Container = require('ui/box/container').default;
			
			  const props = Object.assign(
			    \{\},
			    \{
			      contentProps: \{
			        i18n: \{\},
			        model: immutable.fromJS(\{
			          client: \{
			            connections: \{
			              database: [\{ name: 'dbA' \}, \{ name: 'dbB' \}]
			            \},
			            id: 'alksdkhasd__test-lock__alsdkhalkshd'
			          \},
			          field: \{
			            email: \{
			              invalidHint: null,
			              showInvalid: false,
			              valid: true,
			              value: 'peter_picked@pickledpepper.com'
			            \}
			          \}
			        \})
			      \}
			    \},
			    opts
			  );
			
			  return new Container(props);
			\};
			
			describe('Container', () => \{
			  it('does not call \`connectionResolver\` on submit when there is no custom \`connectionResolver\`', () => \{
			    const c = getContainer();
			
			    c.handleSubmit(mockEvent);
			    const \{ mock \} = require('store/index').swap;
			    expect(mock.calls.length).toBe(0);
			  \});
			
			  it('should submit the form when the form is not yet submitting', () => \{
			    const c = getContainer(\{ isSubmitting: false \});
			    const connectionResolverMock = jest.fn();
			    require('core/index').connectionResolver = () => connectionResolverMock;
			
			    c.handleSubmit(mockEvent);
			    expect(connectionResolverMock).toHaveBeenCalled();
			  \});
			
			  it('should not submit the form when the form is already submitting', () => \{
			    const c = getContainer(\{ isSubmitting: true \});
			    const connectionResolverMock = jest.fn();
			    require('core/index').connectionResolver = () => connectionResolverMock;
			
			    c.handleSubmit(mockEvent);
			    expect(connectionResolverMock).not.toHaveBeenCalled();
			  \});
			
			  describe('with a custom \`connectionResolver\`', () => \{
			    let connectionResolverMock;
			    let setResolvedConnectionMock;
			
			    beforeEach(() => \{
			      connectionResolverMock = jest.fn();
			      setResolvedConnectionMock = jest.fn();
			      require('core/index').connectionResolver = () => connectionResolverMock;
			      require('core/index').setResolvedConnection = setResolvedConnectionMock;
			    \});
			
			    it('calls \`connectionResolver\` onSubmit', () => \{
			      const c = getContainer();
			      c.handleSubmit(mockEvent);
			
			      const \{ mock \} = connectionResolverMock;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			    it('calls \`swap\` in the \`connectionResolver\` callback', () => \{
			      const c = getContainer();
			      c.handleSubmit(mockEvent);
			
			      connectionResolverMock.mock.calls[0][2]('resolvedConnection');
			      const \{ mock \} = require('store/index').swap;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			    it('calls \`setResolvedConnection\` in the \`swap\` callback', () => \{
			      const c = getContainer();
			      c.handleSubmit(mockEvent);
			
			      connectionResolverMock.mock.calls[0][2]('resolvedConnection');
			      require('store/index').swap.mock.calls[0][3]('model');
			      const \{ mock \} = setResolvedConnectionMock;
			      expect(mock.calls.length).toBe(1);
			      expect(mock.calls[0]).toMatchSnapshot();
			    \});
			  \});
			
			  describe('when suppressSubmitOverlay is true', () => \{
			    it('it does not display the overlay when submitting', () => \{
			      const Container = require('ui/box/container').default;
			
			      const props = \{
			        autoFocus: false,
			        badgeLink: 'http://badge.link',
			        contentComponent: null,
			        contentProps: \{\},
			        disableSubmitButton: false,
			        isMobile: false,
			        isModal: false,
			        isSubmitting: true,
			        logo: '',
			        primaryColor: '',
			        screenName: 'Test',
			        showBadge: false,
			        classNames: '',
			        suppressSubmitOverlay: true
			      \};
			
			      // Emitted snapshot should not add 'auth0-lock-mode-loading' class to the container div
			      expectComponent(<Container \{...props\} />).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\ui\\box\\container.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('auth0_lock\\src\\__tests__\\ui\\box\\global_message.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			
			import \{ expectComponent \} from '../../testUtils';
			
			import GlobalMessage from 'ui/box/global_message';
			
			describe('GlobalMessage', () => \{
			  it('renders correctly given a success type', () => \{
			    expectComponent(<GlobalMessage type="success" message="Success!" />).toMatchSnapshot();
			  \});
			  it('renders correctly given an error type', () => \{
			    expectComponent(<GlobalMessage type="error" message="An error occurred." />).toMatchSnapshot();
			  \});
			  it('renders correctly given an info type', () => \{
			    expectComponent(
			      <GlobalMessage type="info" message="Some additional information." />
			    ).toMatchSnapshot();
			  \});
			  it('should call scrollIntoView if parameter is set and top < 0', () => \{
			    const wrapper = mount(<GlobalMessage type="success" message="foo" scrollIntoView=\{true\} />);
			    const getBoundingClientRectSpy = jest.fn().mockReturnValue(\{ top: -1 \});
			    const scrollIntoViewSpy = jest.fn();
			    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRectSpy;
			    wrapper.getDOMNode().scrollIntoView = scrollIntoViewSpy;
			
			    wrapper.instance().componentDidMount();
			
			    expect(getBoundingClientRectSpy).toHaveBeenCalled();
			    expect(scrollIntoViewSpy).toHaveBeenCalledWith(true);
			  \});
			  it('should not call scrollIntoView if parameter is set and top >= 0', () => \{
			    const wrapper = mount(<GlobalMessage type="success" message="foo" scrollIntoView=\{true\} />);
			    const getBoundingClientRectSpy = jest.fn().mockReturnValue(\{ top: 0 \});
			    const scrollIntoViewSpy = jest.fn();
			    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRectSpy;
			    wrapper.getDOMNode().scrollIntoView = scrollIntoViewSpy;
			
			    wrapper.instance().componentDidMount();
			
			    expect(getBoundingClientRectSpy).toHaveBeenCalled();
			    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
			  \});
			  it('should call scrollIntoView if parameter is not set (default is true)', () => \{
			    const wrapper = mount(<GlobalMessage type="success" message="foo" />);
			    const getBoundingClientRectSpy = jest.fn().mockReturnValue(\{ top: -1 \});
			    const scrollIntoViewSpy = jest.fn();
			    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRectSpy;
			    wrapper.getDOMNode().scrollIntoView = scrollIntoViewSpy;
			
			    wrapper.instance().componentDidMount();
			
			    expect(getBoundingClientRectSpy).toHaveBeenCalled();
			    expect(scrollIntoViewSpy).toHaveBeenCalledWith(true);
			  \});
			  it('should not call scrollIntoView if parameter is set to false', () => \{
			    const wrapper = mount(<GlobalMessage type="success" message="foo" scrollIntoView=\{false\} />);
			    const getBoundingClientRectSpy = jest.fn().mockReturnValue(\{ top: -1 \});
			    const scrollIntoViewSpy = jest.fn();
			    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRectSpy;
			    wrapper.getDOMNode().scrollIntoView = scrollIntoViewSpy;
			
			    wrapper.instance().componentDidMount();
			
			    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
			  \});
			  it('should NOT strip out HTML tags if given a React node', () => \{
			    const message = React.createElement('span', \{
			      dangerouslySetInnerHTML: \{ __html: '<b>Success!</b>' \}
			    \});
			    const wrapper = mount(<GlobalMessage type="success" message=\{message\} />);
			    expect(wrapper.html()).toBe(
			      '<div class="auth0-global-message auth0-global-message-success"><span class="animated fadeInUp">' +
			        '<span><b>Success!</b></span></span></div>'
			    );
			  \});
			  it('should strip out HTML tags if given a string', () => \{
			    const wrapper = mount(<GlobalMessage type="success" message="<b>Success!</b>" />);
			
			    expect(wrapper.html()).toBe(
			      '<div class="auth0-global-message auth0-global-message-success"><span class="animated fadeInUp">' +
			        '&lt;b&gt;Success!&lt;/b&gt;</span></div>'
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\ui\\box\\global_message.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('auth0_lock\\src\\__tests__\\ui\\input\\email_input.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			import \{ expectComponent \} from 'testUtils';
			
			import \{ mockComponent \} from 'testUtils';
			import \{ extractPropsFromWrapper \} from '../../testUtils';
			
			jest.mock('ui/input/input_wrap', () => mockComponent('input_wrap'));
			
			const getComponent = () => require('ui/input/email_input').default;
			
			describe('EmailInput', () => \{
			  const defaultProps = \{
			    autoComplete: false,
			    invalidHint: 'invalidHint',
			    isValid: true,
			    onChange: jest.fn(),
			    value: 'value',
			    lockId: 1
			  \};
			
			  test('renders without issue', () => \{
			    const Input = getComponent();
			    const component = mount(<Input \{...defaultProps\} />);
			
			    expect(component.html()).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\ui\\input\\email_input.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\ui\\input\\input_wrap.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			
			import \{ expectComponent \} from 'testUtils';
			import InputWrap from '../../../ui/input/input_wrap';
			
			describe('InputWrap', () => \{
			  const defaultProps = \{
			    after: <span>after</span>,
			    isValid: true,
			    name: 'name'
			  \};
			
			  test('renders correctly with the \`after\` prop', () => \{
			    expectComponent(<InputWrap \{...defaultProps\} />).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\ui\\input\\input_wrap.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\ui\\input\\password\\password_strength.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount \} from 'enzyme';
			import PasswordStrength from '../../../../ui/input/password/password_strength';
			
			describe('PasswordStrength', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			  \});
			  describe('validatePassword()', () => \{
			    it(\`validates password correctly with invalid password\`, () => \{
			      const policy = \{
			        toJS: () => (\{
			          length: \{
			            minLength: 20
			          \}
			        \})
			      \};
			      const messages = \{ foo: 'the-message' \};
			      const wrapper = mount(
			        <PasswordStrength policy=\{policy\} password="the-password" messages=\{messages\} />
			      );
			      expect(wrapper.html()).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\ui\\input\\password\\password_strength.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\src\\__tests__\\ui\\input\\password_input.test.jsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ mount, shallow \} from 'enzyme';
			
			import \{ mockComponent \} from 'testUtils';
			import \{ extractPropsFromWrapper \} from '../../testUtils';
			import InputWrap from '../../../ui/input/input_wrap';
			
			jest.mock('ui/input/input_wrap', () => mockComponent('input_wrap'));
			jest.mock('ui/input/password/password_strength', () => mockComponent('password_strength'));
			
			jest.mock('core/index', () => (\{
			  ui: \{
			    allowPasswordAutocomplete: () => false
			  \},
			  id: jest.fn(() => 'lock')
			\}));
			
			const getComponent = () => require('ui/input/password_input').default;
			
			describe('PasswordInput', () => \{
			  const defaultProps = \{
			    invalidHint: 'invalidHint',
			    showPasswordStrengthMessage: true,
			    isValid: true,
			    onChange: jest.fn(),
			    policy: 'policy',
			    strengthMessages: \{ strengthMessages: 'strengthMessages' \},
			    value: 'value',
			    showPassword: false,
			    lock: \{\}
			  \};
			  test('sends PasswordStrength as the \`after\` param', () => \{
			    const Input = getComponent();
			    const wrapper = mount(<Input \{...defaultProps\} />);
			    wrapper.find('input').simulate('focus');
			    wrapper.find('input').simulate('change', \{ target: \{ value: 'pass' \} \});
			    const props = extractPropsFromWrapper(wrapper);
			    expect(props.after.props).toEqual(\{
			      messages: \{ strengthMessages: 'strengthMessages' \},
			      password: 'value',
			      policy: 'policy'
			    \});
			  \});
			  test('\`allowPasswordAutocomplete=true\` sets \`autoComplete\` as on', () => \{
			    require('core/index').ui.allowPasswordAutocomplete = () => true;
			    const Input = getComponent();
			    const wrapper = mount(<Input \{...defaultProps\} />);
			    expect(wrapper.find('input').props().autoComplete).toBe('on');
			  \});
			  test('\`allowPasswordAutocomplete=false\` sets \`autoComplete\` as off', () => \{
			    require('core/index').ui.allowPasswordAutocomplete = () => false;
			    const Input = getComponent();
			    const wrapper = mount(<Input \{...defaultProps\} />);
			    expect(wrapper.find('input').props().autoComplete).toBe('off');
			  \});
			  test('shows invalid Hint', () => \{
			    const Input = getComponent();
			    const wrapper = mount(<Input \{...defaultProps\} />);
			    expect(wrapper.find(InputWrap).props().invalidHint).toBe('invalidHint');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\ui\\input\\password_input.test.jsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('auth0_lock\\src\\__tests__\\utils\\format.test.js', () => {
        const sourceCode = `
			import format from '../../utils/format';
			
			describe('format', () => \{
			  it('can format a string', () => \{
			    expect(format('a string')).toEqual('a string');
			  \});
			
			  it('can replace a string', () => \{
			    expect(format('%s', 'test')).toEqual('test');
			  \});
			
			  it('can replace a string inside a string', () => \{
			    expect(format('a string: %s', 'test')).toEqual('a string: test');
			  \});
			
			  it('can replace multiple strings', () => \{
			    expect(format('%s:%s', 'a', 'b')).toEqual('a:b');
			  \});
			
			  it('can replace with a number', () => \{
			    expect(format('%d', 12)).toEqual('12');
			  \});
			
			  it('can format an object', () => \{
			    expect(format('%j', \{ key: 'value' \})).toEqual('\{"key":"value"\}');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\utils\\format.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('auth0_lock\\src\\__tests__\\utils\\url_utils.test.js', () => {
        const sourceCode = `
			import \{ getOriginFromUrl, getLocationFromUrl \} from '../../utils/url_utils';
			
			describe('url utils', () => \{
			  describe('getOriginFromUrl', function() \{
			    it('should return undefined if there is no url', function() \{
			      expect(getOriginFromUrl()).toBe(undefined);
			      expect(getOriginFromUrl('')).toBe(undefined);
			      expect(getOriginFromUrl(null)).toBe(undefined);
			    \});
			    it('should parse the url and return the origin with https', function() \{
			      var url = 'https://test.com/example';
			      expect(getOriginFromUrl(url)).toBe('https://test.com');
			    \});
			    it('should parse the url and return the origin with http', function() \{
			      var url = 'http://test.com/example';
			      expect(getOriginFromUrl(url)).toBe('http://test.com');
			    \});
			    it('should include the \`port\` when available', function() \{
			      var url = 'https://localhost:3000/example';
			      expect(getOriginFromUrl(url)).toBe('https://localhost:3000');
			    \});
			  \});
			  describe('getLocationFromUrl', function() \{
			    it('should return null for invalid urls', () => \{
			      expect(getLocationFromUrl('banana')).toBe(null);
			    \});
			    const mapping = \{
			      'http://localhost:3000/foo?id=1': \{
			        href: 'http://localhost:3000/foo?id=1',
			        protocol: 'http:',
			        host: 'localhost:3000',
			        hostname: 'localhost',
			        port: '3000',
			        pathname: '/foo',
			        search: '?id=1',
			        hash: ''
			      \},
			      'https://localhost:3000/foo?id=1': \{
			        href: 'https://localhost:3000/foo?id=1',
			        protocol: 'https:',
			        host: 'localhost:3000',
			        hostname: 'localhost',
			        port: '3000',
			        pathname: '/foo',
			        search: '?id=1',
			        hash: ''
			      \},
			      'https://auth0.com/foo': \{
			        href: 'https://auth0.com/foo',
			        protocol: 'https:',
			        host: 'auth0.com',
			        hostname: 'auth0.com',
			        port: undefined,
			        pathname: '/foo',
			        search: '',
			        hash: ''
			      \},
			      'https://auth0.com/#access_token=foo': \{
			        href: 'https://auth0.com/#access_token=foo',
			        protocol: 'https:',
			        host: 'auth0.com',
			        hostname: 'auth0.com',
			        port: undefined,
			        pathname: '/',
			        search: '',
			        hash: '#access_token=foo'
			      \},
			      'https://auth0.com/#/foo/access_token=foo': \{
			        href: 'https://auth0.com/#/foo/access_token=foo',
			        protocol: 'https:',
			        host: 'auth0.com',
			        hostname: 'auth0.com',
			        port: undefined,
			        pathname: '/',
			        search: '',
			        hash: '#/foo/access_token=foo'
			      \}
			    \};
			    for (const url in mapping) \{
			      it('should map urls correctly: ' + url, function() \{
			        expect(getLocationFromUrl(url)).toMatchObject(mapping[url]);
			      \});
			    \}
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\src\\__tests__\\utils\\url_utils.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('auth0_lock\\test\\captcha.corporate.test.js', () => {
        const sourceCode = `
			'use strict';
			
			import expect from 'expect.js';
			import * as h from './helper/ui';
			import en from '../src/i18n/en';
			
			const lockOpts = \{
			  allowedConnections: ['db'],
			  rememberLastLogin: false
			\};
			
			const svgCaptchaRequiredResponse1 = \{
			  required: true,
			  image: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			  type: 'code'
			\};
			
			const svgCaptchaRequiredResponse2 = \{
			  required: true,
			  image: 'data:image/gif;base64,blibli',
			  type: 'code'
			\};
			
			const recaptchav2Response = \{
			  required: true,
			  provider: 'recaptcha_v2',
			  siteKey: 'my_site_key'
			\};
			
			const lockConfigName = 'single corporate';
			
			describe('captcha (corporate connection)', function () \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe('svg-captcha', () => \{
			    describe('when the api returns a new challenge', function () \{
			      beforeEach(function (done) \{
			        this.stub = h.stubGetChallenge([svgCaptchaRequiredResponse1, svgCaptchaRequiredResponse2]);
			        this.lock = h.displayLock(lockConfigName, lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should show the captcha input', function (done) \{
			        setTimeout(() => \{
			          expect(h.qInput(this.lock, 'captcha', false)).to.be.ok();
			          done();
			        \}, 500);
			      \});
			
			      it('should require another challenge when clicking the refresh button', function (done) \{
			        h.clickRefreshCaptchaButton(this.lock);
			
			        setTimeout(() => \{
			          expect(h.q(this.lock, '.auth0-lock-captcha-image').style.backgroundImage).to.equal(
			            \`url("\$\{svgCaptchaRequiredResponse2.image\}")\`
			          );
			          done();
			        \}, 200);
			      \});
			
			      it('should submit the captcha provided by the user', function (done) \{
			        h.logInWithUsernamePasswordAndCaptcha(this.lock, () => \{
			          expect(h.wasLoginAttemptedWith(\{ captcha: 'captchaValue' \})).to.be.ok();
			          done();
			        \});
			      \});
			
			      it('should not submit the form if the captcha is not provided', function (done) \{
			        h.logInWithUsernameAndPassword(this.lock, () => \{
			          h.waitUntilErrorExists(this.lock, () => \{
			            expect(h.wasLoginAttemptedWith(\{\})).to.not.be.ok();
			            expect(h.hasErrorMessage(this.lock, en.error.login.invalid_captcha)).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe('when the challenge api returns required: false', function () \{
			      beforeEach(function (done) \{
			        h.stubGetChallenge(\{
			          required: false
			        \});
			
			        this.lock = h.displayLock(lockConfigName, lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should not show the captcha input', function () \{
			        expect(h.qInput(this.lock, 'captcha', false)).to.not.be.ok();
			      \});
			
			      describe('when the form submission fails and the transaction starts requiring a challenge', function () \{
			        beforeEach(function (done) \{
			          h.assertAuthorizeRedirection((lockID, options, authParams, cb) => \{
			            cb(new Error('bad request'));
			            setTimeout(done, 300);
			          \});
			
			          h.stubGetChallenge(svgCaptchaRequiredResponse1);
			          h.fillUsernameInput(this.lock, 'someone');
			          h.fillPasswordInput(this.lock, 'mypass');
			          h.submitForm(this.lock);
			        \});
			
			        it('should call the challenge api again and show the input', function (done) \{
			          h.waitUntilCaptchaExists(this.lock, () => \{
			            expect(h.qInput(this.lock, 'captcha', false)).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			  \});
			
			  describe('recaptchav2', () => \{
			    describe('when the api returns a new challenge', function () \{
			      beforeEach(function (done) \{
			        this.stub = h.stubGetChallenge([recaptchav2Response]);
			        this.lock = h.displayLock(lockConfigName, lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should load the captcha script', function (done) \{
			        h.waitUntilExists(this.lock, '.auth0-lock-recaptchav2', () => \{
			          expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.be.ok();
			          done();
			        \});
			      \});
			
			      it('should show the captcha input', function () \{
			        expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.be.ok();
			      \});
			
			      it('should not submit the form if the captcha is not provided', function (done) \{
			        h.logInWithUsernameAndPassword(this.lock, () => \{
			          h.waitUntilErrorExists(this.lock, () => \{
			            expect(h.wasLoginAttemptedWith(\{\})).to.not.be.ok();
			            expect(h.hasErrorMessage(this.lock, en.error.login.invalid_recaptcha)).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe('when the challenge api returns required: false', function () \{
			      let notRequiredStub;
			      beforeEach(function (done) \{
			        notRequiredStub = h.stubGetChallenge(\{
			          required: false
			        \});
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should not show the captcha input', function () \{
			        expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.not.be.ok();
			      \});
			
			      describe('when the form submission fails and the transaction starts requiring a challenge', function () \{
			        let challengeStub;
			        beforeEach(function (done) \{
			          h.assertAuthorizeRedirection((lockID, options, authParams, cb) => \{
			            cb(new Error('bad request'));
			            // We wait 250ms to display errors
			            setTimeout(done, 260);
			          \});
			
			          challengeStub = h.stubGetChallenge(recaptchav2Response);
			          h.fillUsernameInput(this.lock, 'someone@example.com');
			          h.fillPasswordInput(this.lock, 'mypass');
			          h.submitForm(this.lock);
			        \});
			
			        it('should call the challenge api again and show the input', function (done) \{
			          h.waitUntilExists(this.lock, '.auth0-lock-recaptchav2', () => \{
			            expect(notRequiredStub.calledOnce).to.be.true;
			            expect(challengeStub.calledOnce).to.be.true;
			            expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\captcha.corporate.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('auth0_lock\\test\\captcha.test.js', () => {
        const sourceCode = `
			'use strict';
			
			import expect from 'expect.js';
			import * as h from './helper/ui';
			import en from '../src/i18n/en';
			
			const lockOpts = \{
			  allowedConnections: ['db'],
			  rememberLastLogin: false
			\};
			
			const svgCaptchaRequiredResponse1 = \{
			  required: true,
			  image: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			  type: 'code'
			\};
			
			const svgCaptchaRequiredResponse2 = \{
			  required: true,
			  image: 'data:image/gif;base64,blibli',
			  type: 'code'
			\};
			
			const recaptchav2Response = \{
			  required: true,
			  provider: 'recaptcha_v2',
			  siteKey: 'my_site_key'
			\};
			
			describe('captcha', function () \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe('svg-captcha', () => \{
			    describe('when the api returns a new challenge', function () \{
			      beforeEach(function (done) \{
			        this.stub = h.stubGetChallenge([svgCaptchaRequiredResponse1, svgCaptchaRequiredResponse2]);
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should show the captcha input', function (done) \{
			        setTimeout(() => \{
			          expect(h.qInput(this.lock, 'captcha', false)).to.be.ok();
			          done();
			        \}, 500);
			      \});
			
			      it('should require another challenge when clicking the refresh button', function (done) \{
			        h.waitUntilExists(this.lock, '.auth0-lock-captcha-refresh', () => \{
			          h.clickRefreshCaptchaButton(this.lock);
			
			          setTimeout(() => \{
			            expect(h.q(this.lock, '.auth0-lock-captcha-image').style.backgroundImage).to.equal(
			              \`url("\$\{svgCaptchaRequiredResponse2.image\}")\`
			            );
			            done();
			          \}, 200);
			        \});
			      \});
			
			      it('should submit the captcha provided by the user', function () \{
			        h.logInWithEmailPasswordAndCaptcha(this.lock, () => \{
			          expect(h.wasLoginAttemptedWith(\{ captcha: 'captchaValue' \})).to.be.ok();
			        \});
			      \});
			
			      it('should not submit the form if the captcha is not provided', function (done) \{
			        h.logInWithEmailAndPassword(this.lock, () => \{
			          h.waitUntilErrorExists(this.lock, () => \{
			            expect(h.wasLoginAttemptedWith(\{\})).to.not.be.ok();
			            expect(h.hasErrorMessage(this.lock, en.error.login.invalid_captcha)).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe('when the challenge api returns required: false', function () \{
			      beforeEach(function (done) \{
			        h.stubGetChallenge(\{
			          required: false
			        \});
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should not show the captcha input', function () \{
			        expect(h.qInput(this.lock, 'captcha', false)).to.not.be.ok();
			      \});
			
			      describe('when the form submission fails and the transaction starts requiring a challenge', function () \{
			        beforeEach(function (done) \{
			          h.assertAuthorizeRedirection((lockID, options, authParams, cb) => \{
			            cb(new Error('bad request'));
			            setTimeout(done, 300);
			          \});
			
			          h.stubGetChallenge(svgCaptchaRequiredResponse1);
			          h.fillEmailInput(this.lock, 'someone@example.com');
			          h.fillPasswordInput(this.lock, 'mypass');
			          h.submitForm(this.lock);
			        \});
			
			        it('should call the challenge api again and show the input', function (done) \{
			          h.waitUntilCaptchaExists(this.lock, () => \{
			            expect(h.qInput(this.lock, 'captcha', false)).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			  \});
			
			  describe('recaptchav2', () => \{
			    describe('when the api returns a new challenge', function () \{
			      beforeEach(function (done) \{
			        this.stub = h.stubGetChallenge([recaptchav2Response]);
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should load the captcha script and show input', function (done) \{
			        h.waitUntilExists(this.lock, '.auth0-lock-recaptchav2', () => \{
			          expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.be.ok();
			          done();
			        \});
			      \});
			
			      it('should not submit the form if the captcha is not provided', function (done) \{
			        h.logInWithEmailAndPassword(this.lock, () => \{
			          h.waitUntilErrorExists(this.lock, () => \{
			            expect(h.wasLoginAttemptedWith(\{\})).to.not.be.ok();
			            expect(h.hasErrorMessage(this.lock, en.error.login.invalid_recaptcha)).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe('when the challenge api returns required: false', function () \{
			      let notRequiredStub;
			      beforeEach(function (done) \{
			        notRequiredStub = h.stubGetChallenge(\{
			          required: false
			        \});
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should not show the captcha input', function () \{
			        expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.not.be.ok();
			      \});
			
			      describe('when the form submission fails and the transaction starts requiring a challenge', function () \{
			        let challengeStub;
			        beforeEach(function (done) \{
			          h.assertAuthorizeRedirection((lockID, options, authParams, cb) => \{
			            cb(new Error('bad request'));
			            // We wait 250ms to display errors
			            setTimeout(done, 260);
			          \});
			
			          challengeStub = h.stubGetChallenge(recaptchav2Response);
			          h.fillEmailInput(this.lock, 'someone@example.com');
			          h.fillPasswordInput(this.lock, 'mypass');
			          h.submitForm(this.lock);
			        \});
			
			        it('should call the challenge api again and show the input', function (done) \{
			          h.waitUntilExists(this.lock, '.auth0-lock-recaptchav2', () => \{
			            expect(notRequiredStub.calledOnce).to.be.true;
			            expect(challengeStub.calledOnce).to.be.true;
			            expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\captcha.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('auth0_lock\\test\\captcha_signup.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as h from './helper/ui';
			import en from '../src/i18n/en';
			
			const lockOpts = \{
			  allowedConnections: ['db'],
			  rememberLastLogin: false,
			  initialScreen: 'signUp'
			\};
			
			const svgCaptchaRequiredResponse1 = \{
			  required: true,
			  image: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			  type: 'code'
			\};
			
			const svgCaptchaRequiredResponse2 = \{
			  required: true,
			  image: 'data:image/gif;base64,blibli',
			  type: 'code'
			\};
			
			const recaptchav2Response = \{
			  required: true,
			  provider: 'recaptcha_v2',
			  siteKey: 'my_site_key'
			\};
			
			describe('captcha on signup', function () \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe('svg-captcha', () => \{
			    describe('when the api returns a new challenge', function () \{
			      beforeEach(function (done) \{
			        this.stub = h.stubGetChallenge([svgCaptchaRequiredResponse1, svgCaptchaRequiredResponse2]);
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('sign-up tab should be active', function (done) \{
			        h.waitUntilExists(this.lock, '.auth0-lock-tabs-current', () => \{
			          expect(h.isSignUpTabCurrent(this.lock)).to.be.ok();
			          done();
			        \});
			      \});
			
			      it('should show the captcha input', function (done) \{
			        setTimeout(() => \{
			          expect(h.qInput(this.lock, 'captcha', false)).to.be.ok();
			          done();
			        \}, 500);
			      \});
			
			      it('should require another challenge when clicking the refresh button', function (done) \{
			        h.waitUntilExists(this.lock, '.auth0-lock-captcha-refresh', () => \{
			          h.clickRefreshCaptchaButton(this.lock);
			
			          setTimeout(() => \{
			            expect(h.q(this.lock, '.auth0-lock-captcha-image').style.backgroundImage).to.equal(
			              \`url("\$\{svgCaptchaRequiredResponse2.image\}")\`
			            );
			            done();
			          \}, 200);
			        \});
			      \});
			
			      it('should submit the captcha provided by the user', function (done) \{
			        h.signUpWithEmailPasswordAndCaptcha(this.lock, () => \{
			          expect(h.wasSignUpAttemptedWith(\{ captcha: 'captchaValue' \})).to.be.ok();
			          done();
			        \});
			      \});
			
			      it('should not submit the form if the captcha is not provided', function (done) \{
			        h.signUpWithEmailAndPassword(this.lock, () => \{
			          h.waitUntilErrorExists(this.lock, () => \{
			            expect(h.wasSignUpAttemptedWith(\{\})).to.not.be.ok();
			            expect(h.hasErrorMessage(this.lock, en.error.login.invalid_captcha)).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe('when the challenge api returns required: false', function () \{
			      beforeEach(function (done) \{
			        h.stubGetChallenge(\{
			          required: false
			        \});
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should not show the captcha input', function () \{
			        expect(h.qInput(this.lock, 'captcha', false)).to.not.be.ok();
			      \});
			
			      describe('when the form submission fails and the transaction starts requiring a challenge', function () \{
			        it('should call the challenge api again and show the input', function (done) \{
			          h.assertSignUp((lockID, options, cb) => \{
			            cb(new Error('bad request'));
			            setTimeout(done, 300);
			          \});
			
			          h.waitForEmailAndPasswordInput(this.lock, () => \{
			            h.stubGetChallenge(svgCaptchaRequiredResponse1);
			            h.fillEmailInput(this.lock, 'someone@example.com');
			            h.fillComplexPassword(this.lock);
			            h.submitForm(this.lock);
			
			            h.waitUntilInputExists(this.lock, 'captcha', () => \{
			              expect(h.qInput(this.lock, 'captcha', false)).to.be.ok();
			            \});
			          \});
			        \});
			      \});
			    \});
			  \});
			
			  describe('recaptcha', () => \{
			    describe('when the api returns a new challenge', function () \{
			      beforeEach(function (done) \{
			        this.stub = h.stubGetChallenge([recaptchav2Response]);
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should load the captcha script and input', function (done) \{
			        h.waitUntilExists(this.lock, '.auth0-lock-recaptchav2', () => \{
			          expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.be.ok();
			          done();
			        \});
			      \});
			
			      it('should not submit the form if the captcha is not provided', function (done) \{
			        h.waitForEmailAndPasswordInput(this.lock, () => \{
			          h.signUpWithEmailAndPassword(this.lock, () => \{
			            h.waitUntilErrorExists(this.lock, () => \{
			              expect(h.wasSignUpAttemptedWith(\{\})).not.to.be.ok();
			              expect(h.hasErrorMessage(this.lock, en.error.login.invalid_recaptcha)).to.be.ok();
			              done();
			            \});
			          \});
			        \});
			      \});
			    \});
			
			    describe('when the challenge api returns required: false', function () \{
			      let notRequiredStub;
			      beforeEach(function (done) \{
			        notRequiredStub = h.stubGetChallenge(\{
			          required: false
			        \});
			        this.lock = h.displayLock('', lockOpts, done);
			      \});
			
			      afterEach(function () \{
			        this.lock.hide();
			      \});
			
			      it('should not show the captcha input', function () \{
			        expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.not.be.ok();
			      \});
			
			      describe('when the form submission fails and the transaction starts requiring a challenge', function () \{
			        let challengeStub;
			        beforeEach(function (done) \{
			          h.assertSignUp((lockID, options, cb) => \{
			            cb(new Error('bad request'));
			            // We wait 250ms to display errors
			            setTimeout(done, 260);
			          \});
			
			          challengeStub = h.stubGetChallenge(recaptchav2Response);
			          h.fillEmailInput(this.lock, 'someone@example.com');
			          h.fillComplexPassword(this.lock);
			          h.submitForm(this.lock);
			        \});
			
			        it('should call the challenge api again and show the input', function () \{
			          expect(notRequiredStub.calledOnce).to.be.true;
			          expect(challengeStub.calledOnce).to.be.true;
			          expect(h.q(this.lock, '.auth0-lock-recaptchav2')).to.be.ok();
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\captcha_signup.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('auth0_lock\\test\\connection_pick.ui.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as h from './helper/ui';
			
			describe('connection pick', function () \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe('with several connections of all types', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('all', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('logs in with the first database connection in the client settings', function () \{
			      h.logInWithEmailAndPassword(this.lock, () => \{
			        expect(h.wasLoginAttemptedWith(\{ connection: 'db' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with single database connection', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['db'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('logs in with the only one available', function () \{
			      h.logInWithEmailAndPassword(this.lock, () => \{
			        expect(h.wasLoginAttemptedWith(\{ connection: 'db' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with multiple database connections', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['db', 'db1'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('logins with first one', function () \{
			      h.logInWithEmailAndPassword(this.lock, () => \{
			        expect(h.wasLoginAttemptedWith(\{ connection: 'db' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with multiple database connections, providing a default', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['db', 'db1'],
			        defaultDatabaseConnection: 'db1',
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('logins with the default one', function () \{
			      h.logInWithEmailAndPassword(this.lock, () => \{
			        expect(h.wasLoginAttemptedWith(\{ connection: 'db1' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with enterprise and database connection', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['db', 'auth0.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email matches the enterprise connection', function () \{
			      beforeEach(function (done) \{
			        h.waitForEmailAndPasswordInput(this.lock, () => \{
			          h.fillEmailInput(this.lock, 'someone@auth0.com');
			          done();
			        \});
			      \});
			
			      it('logins with the enterprise connection', function (done) \{
			        h.waitForSSONotice(this.lock, () => \{
			          h.submit(this.lock);
			          expect(h.wasLoginAttemptedWith(\{ connection: 'auth0.com' \})).to.be.ok();
			          done();
			        \})
			      \});
			    \});
			
			    describe("when the email doesn't match the enterprise connection", function () \{
			      beforeEach(function (done) \{
			        h.logInWithEmailAndPassword(this.lock, done);
			      \});
			
			      it('logins with the database connection', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        expect(h.wasLoginAttemptedWith(\{ connection: 'db' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with an enterprise and a corporate connection', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['auth0.com', 'rolodato.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email matches the enterprise connection', function () \{
			      beforeEach(function () \{
			        h.fillEmailInput(this.lock, 'someone@auth0.com');
			      \});
			
			      it('logs in with the enterprise connection', function (done) \{
			        h.waitForSSONotice(this.lock, () => \{
			          h.submit(this.lock);
			          expect(h.wasLoginAttemptedWith(\{ connection: 'auth0.com' \})).to.be.ok();
			          done();
			        \})
			      \});
			    \});
			
			    describe('when the email matches the corporate connection', function () \{
			      beforeEach(function () \{
			        h.fillEmailInput(this.lock, 'someone@rolodato.com');
			      \});
			
			      it('ask for the corporate credentials', function (done) \{
			        h.waitForSSONotice(this.lock, () => \{
			          h.submit(this.lock);
			
			          h.waitForUsernameAndPasswordInput(this.lock, () => \{
			            expect(h.hasUsernameInput(this.lock, 'someone'));
			            expect(h.hasPasswordInput(this.lock));
			            done()
			          \});
			        \});
			      \});
			
			      describe('and logins with corporate credentials', function () \{        
			        it('uses the proper corporate connection', function (done) \{
			          h.submit(this.lock);
			
			          h.wasLoginAttemptedWithAsync(\{ connection: 'rolodato.com' \}, (params) => \{
			            expect(params).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe("when the email doesn't match any connection", function () \{
			      beforeEach(function () \{
			        h.fillEmailInput(this.lock, 'someone@example.com');
			      \});
			
			      it.skip('shows an error', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        h.submit(this.lock);
			        // TODO: an error should be displayed
			        expect(false).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with multiple corporate connections, one without domain', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['corporate-no-domain', 'rolodato.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email matches a corporate connection', function () \{
			      beforeEach(function (done) \{
			        h.fillUsernameInput(this.lock, 'someone@rolodato.com');
			        done();
			      \});
			
			      it('asks for the corporate credentials', function (done) \{
			        h.waitForSSONotice(this.lock, () => \{
			          h.submit(this.lock);
			
			          h.waitForUsernameAndPasswordInput(this.lock, () => \{
			            expect(h.hasUsernameInput(this.lock, 'someone'));
			            expect(h.hasPasswordInput(this.lock));
			            done();
			          \});
			        \})
			      \});
			
			      describe('and logs in with corporate credentials', function () \{
			        it('uses the proper corporate connection', function (done) \{
			          h.submit(this.lock);
			
			          h.wasLoginAttemptedWithAsync(\{ connection: 'rolodato.com' \}, params => \{
			            expect(params).to.be.ok();
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe("when the email doesn't match a corporate connection", function () \{
			      beforeEach(function () \{
			        h.logInWithUsernameAndPassword(this.lock);
			      \});
			
			      it('logins with the one without domain', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        expect(h.wasLoginAttemptedWith(\{ connection: 'corporate-no-domain' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with multiple corporate connections without domain', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['corporate-no-domain', 'corporate-no-domain1'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email and password inputs are filled', function () \{
			      it('logins with the first one', function (done) \{
			        h.logInWithUsernameAndPassword(this.lock, () => \{
			          expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			          expect(h.wasLoginAttemptedWith(\{ connection: 'corporate-no-domain' \})).to.be.ok();
			          done();
			        \});
			      \});
			    \});
			  \});
			
			  describe('with multiple corporate connections without domain, providing a default', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['corporate-no-domain', 'corporate-no-domain1'],
			        defaultEnterpriseConnection: 'corporate-no-domain1',
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email and password inputs are filled', function () \{
			      beforeEach(function () \{
			        h.logInWithUsernameAndPassword(this.lock);
			      \});
			
			      it('logins with the default one', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        expect(h.wasLoginAttemptedWith(\{ connection: 'corporate-no-domain1' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a database and a corporate connection without domain', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['corporate-no-domain', 'db'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email and password inputs are filled', function () \{
			      beforeEach(function (done) \{
			        h.logInWithEmailAndPassword(this.lock, done);
			      \});
			
			      it('logins with the database connection', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        expect(h.wasLoginAttemptedWith(\{ connection: 'db' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a database and a corporate connection without domain, providing a default database', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['corporate-no-domain', 'db'],
			        defaultDatabaseConnection: 'db',
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email and password inputs are filled', function () \{
			      beforeEach(function (done) \{
			        h.logInWithEmailAndPassword(this.lock, done);
			      \});
			
			      it('logins with the database connection', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        expect(h.wasLoginAttemptedWith(\{ connection: 'db' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a database and a corporate connection without domain, providing a default corporate', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['corporate-no-domain', 'db'],
			        defaultEnterpriseConnection: 'corporate-no-domain',
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email and password inputs are filled', function () \{
			      beforeEach(function (done) \{
			        h.logInWithEmailAndPassword(this.lock, done);
			      \});
			
			      it('logins with the corporate connection', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        expect(h.wasLoginAttemptedWith(\{ connection: 'corporate-no-domain' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a database and a corporate connection without domain, providing database and corporate defaults', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['corporate-no-domain', 'db'],
			        defaultDatabaseConnection: 'db',
			        defaultEnterpriseConnection: 'corporate-no-domain',
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email and password inputs are filled', function () \{
			      beforeEach(function (done) \{
			        h.logInWithEmailAndPassword(this.lock, done);
			      \});
			
			      it('logins with the database connection', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        expect(h.wasLoginAttemptedWith(\{ connection: 'db' \})).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single corporate connection', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['corporate'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    describe('when the email and password inputs are filled', function () \{
			      beforeEach(function () \{
			        h.logInWithUsernameAndPassword(this.lock);
			      \});
			
			      it('logins with the database connection', function () \{
			        expect(h.hasSSONotice(this.lock)).to.not.be.ok();
			        expect(h.wasLoginAttemptedWith(\{ connection: 'corporate' \})).to.be.ok();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\connection_pick.ui.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(19)
    });
    it('auth0_lock\\test\\enterprise_quick_auth.ui.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as h from './helper/ui';
			
			describe('enterprise quick auth', function () \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe("when there's only an ad connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['ad.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it("doesn't show a quick auth screen", function (done) \{
			      h.waitUntilInputExists(this.lock, 'username', () => \{
			        expect(h.hasNoQuickAuthButton(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.be.ok(); // checks for corporate login
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only an adfs connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['adfs.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the windows icon', function () \{
			      expect(h.hasQuickAuthButton(this.lock, 'windows', 'adfs.com')).to.be.ok();
			    \});
			  \});
			
			  describe("when there's only an auth0-adldap connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['auth0-adldap.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it("doesn't show a quick auth screen", function (done) \{
			      h.waitUntilInputExists(this.lock, 'username', () => \{
			        expect(h.hasNoQuickAuthButton(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.be.ok(); // checks for corporate login
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only a custom connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['custom.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the default icon', function (done) \{
			      h.waitForQuickAuthButton(this.lock, 'auth0', () => \{
			        expect(h.hasQuickAuthButton(this.lock, 'auth0', 'custom.com')).to.be.ok();
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only a google-apps connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['google-apps.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the google icon', function (done) \{
			      h.waitUntilExists(this.lock, '.auth0-lock-social-button', () => \{
			        expect(h.hasQuickAuthButton(this.lock, 'google-apps', 'google-apps.com')).to.be.ok();
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only an ip connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['ip.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the default icon', function (done) \{
			      h.waitForQuickAuthButton(this.lock, 'auth0', () => \{
			        expect(h.hasQuickAuthButton(this.lock, 'auth0', 'ip.com')).to.be.ok();
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only a mscrm connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['mscrm.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the default icon', function (done) \{
			      h.waitForQuickAuthButton(this.lock, 'auth0', () => \{
			        expect(h.hasQuickAuthButton(this.lock, 'auth0', 'mscrm.com')).to.be.ok();
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only an office365 connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['office365.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the windows icon', function (done) \{
			      h.waitForQuickAuthButton(this.lock, 'windows', () => \{
			        expect(h.hasQuickAuthButton(this.lock, 'windows', 'office365.com')).to.be.ok();
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only a pingfederate connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['pingfederate.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the default icon', function (done) \{
			      h.waitForQuickAuthButton(this.lock, 'auth0', () => \{
			        expect(h.hasQuickAuthButton(this.lock, 'auth0', 'pingfederate.com')).to.be.ok();
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only a samlp connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['samlp.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the default icon', function (done) \{
			      h.waitForQuickAuthButton(this.lock, 'auth0', () => \{
			        expect(h.hasQuickAuthButton(this.lock, 'auth0', 'samlp.com')).to.be.ok();
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only a sharepoint connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['sharepoint.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the default icon', function (done) \{
			      h.waitForQuickAuthButton(this.lock, 'auth0', () => \{
			        expect(h.hasQuickAuthButton(this.lock, 'auth0', 'sharepoint.com')).to.be.ok();
			        done();
			      \});
			    \});
			  \});
			
			  describe("when there's only an waad connection", function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        allowedConnections: ['waad.com'],
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('shows a login button with the windows icon', function () \{
			      h.waitUntilExists(
			        this.lock,
			        \`.auth0-lock-social-button\`,
			        () => expect(h.hasQuickAuthButton(this.lock, 'windows', 'waad.com')).to.be.ok(),
			        500
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\enterprise_quick_auth.ui.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(12)
    });
    it('auth0_lock\\test\\hooks.test.js', () => {
        const sourceCode = `
			import * as h from './helper/ui';
			import en from '../src/i18n/en';
			
			describe('executing public hooks', () => \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe('when a hook has been defined', function() \{
			    describe('during login', function() \{
			      it('should run the loggingIn hook', function(done) \{
			        const options = \{
			          rememberLastLogin: false,
			          hooks: \{
			            loggingIn: function() \{
			              done();
			            \}
			          \}
			        \};
			
			        const lock = h.displayLock('test', options, () => \{
			          h.logInWithEmailAndPassword(lock, () => \{
			            expect(h.hasErrorMessage(lock)).not.to.be.ok();
			          \});
			        \});
			      \});
			
			      it('should display the custom error on exception', function(done) \{
			        const options = \{
			          rememberLastLogin: false,
			          hooks: \{
			            loggingIn: function() \{
			              throw \{ code: 'hook_error', description: 'This is a custom error' \};
			            \}
			          \}
			        \};
			
			        const lock = h.displayLock('test', options, () => \{
			          h.logInWithEmailAndPassword(lock, () => \{
			            h.waitUntilErrorExists(
			              lock,
			              () => \{
			                expect(h.hasErrorMessage(lock, 'This is a custom error')).to.be.ok();
			                lock.hide();
			                done();
			              \},
			              1000
			            );
			          \});
			        \});
			      \});
			
			      it('should display the fallback error on exception', function(done) \{
			        const options = \{
			          rememberLastLogin: false,
			          hooks: \{
			            loggingIn: function() \{
			              throw 'Should not run this';
			            \}
			          \}
			        \};
			
			        const lock = h.displayLock('test', options, () => \{
			          h.logInWithEmailAndPassword(lock, () => \{
			            h.waitUntilErrorExists(
			              lock,
			              () => \{
			                expect(h.hasErrorMessage(lock, en.error.login['lock.fallback'])).to.be.ok();
			                lock.hide();
			                done();
			              \},
			              1000
			            );
			          \});
			        \});
			      \});
			    \});
			
			    describe('during signUp', function() \{
			      it('should run the signingUp hook', function(done) \{
			        const options = \{
			          rememberLastLogin: false,
			          initialScreen: 'signUp',
			          hooks: \{
			            signingUp: function() \{
			              done();
			            \}
			          \}
			        \};
			
			        const lock = h.displayLock('test', options, () => \{
			          expect(h.isSignUpTabCurrent(lock)).to.be.ok();
			          h.signUpWithEmailAndPassword(lock, () => \{
			            expect(h.hasErrorMessage(lock)).not.to.be.ok();
			          \});
			        \});
			      \});
			
			      it('should display the custom error on exception', function(done) \{
			        const options = \{
			          rememberLastLogin: false,
			          initialScreen: 'signUp',
			          hooks: \{
			            signingUp: function() \{
			              throw \{ code: 'hook_error', description: 'This is a custom error' \};
			            \}
			          \}
			        \};
			
			        const lock = h.displayLock('test', options, () => \{
			          h.signUpWithEmailAndPassword(lock, () => \{
			            h.waitUntilErrorExists(
			              lock,
			              () => \{
			                expect(h.hasErrorMessage(lock, 'This is a custom error')).to.be.ok();
			                lock.hide();
			                done();
			              \},
			              2000
			            );
			          \});
			        \});
			      \});
			
			      it('should display the fallback error on exception', function(done) \{
			        const options = \{
			          rememberLastLogin: false,
			          initialScreen: 'signUp',
			          hooks: \{
			            signingUp: function() \{
			              throw 'Should not run this';
			            \}
			          \}
			        \};
			
			        const lock = h.displayLock('test', options, () => \{
			          h.signUpWithEmailAndPassword(lock, () => \{
			            h.waitUntilErrorExists(
			              lock,
			              () => \{
			                expect(h.hasErrorMessage(lock, en.error.signUp['lock.fallback'])).to.be.ok();
			                lock.hide();
			                done();
			              \},
			              1000
			            );
			          \});
			        \});
			      \});
			    \});
			
			    it('should not run a hook that Lock does not know about', function(done) \{
			      const options = \{
			        rememberLastLogin: false,
			        hooks: \{
			          someOtherHook: function() \{
			            throw 'Should not run this';
			          \}
			        \}
			      \};
			
			      const lock = h.displayLock('test', options, () => \{
			        h.logInWithEmailAndPassword(lock, () => \{
			          expect(h.hasErrorMessage(lock)).not.to.be.ok();
			          done();
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\hooks.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('auth0_lock\\test\\i18n.test.js', () => {
        const sourceCode = `
			'use strict';
			import \{ stub \} from 'sinon';
			
			import expect from 'expect.js';
			import Immutable from 'immutable';
			import flatten from 'flat';
			
			import enDictionary from '../src/i18n/en';
			import esDictionary from '../src/i18n/es';
			
			import * as sync from '../src/sync';
			
			describe('load i18n configuration', () => \{
			  before(function() \{
			    stub(sync, 'default', (m, key, opts) => \{
			      m = opts.successFn(m, esDictionary);
			      return m;
			    \});
			  \});
			
			  after(function() \{
			    sync.default.restore();
			  \});
			
			  it('should merge and warn missing keys', () => \{
			    let i18n = require('../src/i18n');
			
			    // We need to initialize the state
			    var m = Immutable.fromJS(\{
			      languageBaseUrl: 'https://cdn.auth0.com',
			      ui: \{
			        disableWarnings: true,
			        language: 'es'
			      \}
			    \});
			
			    // Initialize i18n.
			    m = i18n.initI18n(m);
			
			    let language = flatten(m.getIn(['i18n', 'strings']).toJS());
			    let en = flatten(enDictionary);
			    let es = flatten(esDictionary);
			
			    // We should check that the language has all the keys in the
			    // en language and its values should be either es or en.
			    Object.keys(en).forEach(key => \{
			      expect(language).to.have.property(key);
			      expect([en[key], es[key]]).to.contain(language[key]);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\i18n.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\test\\layout.ui.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as h from './helper/ui';
			
			describe('layout', function() \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe('with all connection types', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('all', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function(done) \{
			      h.waitUntilExists(
			        this.lock,
			        'button.auth0-lock-submit',
			        () => \{
			          expect(h.hasBackButton(this.lock)).to.not.be.ok();
			          expect(h.hasLoginSignUpTabs(this.lock)).to.be.ok();
			          expect(h.isLoginTabCurrent(this.lock)).to.be.ok();
			          expect(h.hasSocialButtons(this.lock)).to.be.ok();
			          expect(h.hasEmailInput(this.lock)).to.be.ok();
			          expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			          expect(h.hasPasswordInput(this.lock)).to.be.ok();
			          expect(h.hasAlternativeLink(this.lock)).to.be.ok(); // forgot password
			          expect(h.hasSubmitButton(this.lock)).to.be.ok();
			          done();
			        \},
			        1000
			      );
			    \});
			  \});
			
			  describe('with all connection types, starting on sign up', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        initialScreen: 'signUp',
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('all', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the sign up screen with the right controls', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.be.ok();
			        expect(h.isSignUpTabCurrent(this.lock)).to.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok();
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with all connection types, starting on forgot password', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        initialScreen: 'forgotPassword',
			        rememberLastLogin: false
			      \};
			      this.lock = h.displayLock('all', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the forgot password screen with the right controls', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.not.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok();
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with all connection types, not allowing sign up', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        allowSignUp: false,
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('all', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with all connection types, not allowing forgot password', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        allowForgotPassword: false,
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('all', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.be.ok();
			        expect(h.isLoginTabCurrent(this.lock)).to.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with all connection types, only allowing login', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        allowForgotPassword: false,
			        allowSignUp: false,
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('all', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single enterprise connection', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single enterprise', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasOneSocialBigButton(this.lock)).to.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.not.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.not.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			        expect(h.hasSubmitButtonVisible(this.lock)).to.not.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with multiple enterprise connections', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('multiple enterprise', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasHiddenPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with an enterprise and a corporate connections', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('enterprise and corporate', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasHiddenPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single corporate connection', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single corporate', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the quick auth screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasOneSocialBigButton(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.not.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok();
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with multiple corporate connections, one without domain', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('multiple corporate, one without domain', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasOneSocialBigButton(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.not.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single database connection', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.be.ok();
			        expect(h.isLoginTabCurrent(this.lock)).to.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single database connection, starting on sign up', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        initialScreen: 'signUp',
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the sign up screen with the right controls', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.be.ok();
			        expect(h.isSignUpTabCurrent(this.lock)).to.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok();
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single database connection, starting on forgot password', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        initialScreen: 'forgotPassword',
			        rememberLastLogin: false
			      \};
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the forgot password screen with the right controls', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.not.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok();
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single database connection, not allowing sign up', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        allowSignUp: false,
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single database connection, not allowing forgot password', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        allowForgotPassword: false,
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.be.ok();
			        expect(h.isLoginTabCurrent(this.lock)).to.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with a single database connection, only allowing login', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        allowForgotPassword: false,
			        allowSignUp: false,
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('already logged in with a database connection', function() \{
			    beforeEach(function(done) \{
			      const opts = \{\};
			
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the quick auth screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasOneSocialBigButton(this.lock)).to.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.not.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.not.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.be.ok(); // not my account
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			        expect(h.hasSubmitButtonVisible(this.lock)).to.not.be.ok();
			      \});
			    \});
			  \});
			
			  describe('in a corporate network', function() \{
			    beforeEach(h.stubWebApisForKerberos);
			    beforeEach(function(done) \{
			      const opts = \{
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('kerberos', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			    beforeEach(h.unStubWebApisForKerberos);
			
			    it('renders the quick auth screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasOneSocialBigButton(this.lock)).to.not.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.not.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // not your account
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('with multiple social connections', function() \{
			    beforeEach(function(done) \{
			      const opts = \{
			        allowForgotPassword: false,
			        allowSignUp: false,
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('multiple social', opts, done);
			    \});
			
			    afterEach(function() \{
			      this.lock.hide();
			    \});
			
			    it('renders the login screen with the right contols', function() \{
			      h.waitUntilExists(this.lock, 'button.auth0-lock-submit', () => \{
			        expect(h.hasBackButton(this.lock)).to.not.be.ok();
			        expect(h.hasLoginSignUpTabs(this.lock)).to.not.be.ok();
			        expect(h.hasSocialButtons(this.lock)).to.be.ok();
			        expect(h.hasEmailInput(this.lock)).to.not.be.ok();
			        expect(h.hasUsernameInput(this.lock)).to.not.be.ok();
			        expect(h.hasPasswordInput(this.lock)).to.not.be.ok();
			        expect(h.hasAlternativeLink(this.lock)).to.not.be.ok(); // forgot password
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			        expect(h.hasSubmitButtonVisible(this.lock)).to.not.be.ok();
			      \});
			    \});
			  \});
			\});
			
			// TODO: besides of displaying different lock by customizing the allowed
			// connections we should consider when those connections come from the
			// client settings given the code paths are different.
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\layout.ui.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(20)
    });
    it('auth0_lock\\test\\mfa_ro.ui.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as h from './helper/ui';
			import \{ stub \} from 'sinon';
			import webApi from '../src/core/web_api';
			
			describe('mfa ro', function() \{
			  beforeEach(h.stubWebApis);
			  afterEach(h.restoreWebApis);
			
			  describe('for sign in', function() \{
			    describe('when mfa is required', function() \{
			      describe('and when mfa code is valid', function() \{
			        beforeEach(function(done) \{
			          const error = new Error();
			          error.error = 'a0.mfa_required';
			
			          webApi.logIn.yields(error);
			
			          const opts = \{
			            allowedConnections: ['db'],
			            rememberLastLogin: false
			          \};
			
			          this.lock = h.displayLock('', opts, done);
			        \});
			
			        afterEach(function() \{
			          this.lock.hide();
			        \});
			
			        it('logs in using mfa screen', function(done) \{
			          h.waitForEmailAndPasswordInput(this.lock, () => \{
			            h.fillEmailInput(this.lock, 'someone@example.com');
			            h.fillPasswordInput(this.lock, 'mypass');
			            h.submitForm(this.lock);
			
			            h.waitUntilInputExists(this.lock, 'mfa_code', () =>
			              h.testAsync(() => \{
			                h.fillMFACodeInput(this.lock, '123456');
			                h.submit(this.lock);
			
			                expect(
			                  h.wasLoginAttemptedWith(\{
			                    connection: 'db',
			                    username: 'someone@example.com',
			                    password: 'mypass',
			                    mfa_code: '123456'
			                  \})
			                ).to.be.ok();
			              \}, done)
			            );
			          \});
			        \});
			      \});
			
			      describe('and when mfa code is invalid', function() \{
			        beforeEach(function(done) \{
			          const mfaRequireError = new Error();
			          mfaRequireError.error = 'a0.mfa_required';
			
			          const invalidCodeError = new Error();
			          invalidCodeError.error = 'a0.mfa_invalid_code';
			
			          webApi.logIn
			            .onFirstCall()
			            .yields(mfaRequireError)
			            .onSecondCall()
			            .yields(invalidCodeError);
			
			          const opts = \{
			            allowedConnections: ['db'],
			            rememberLastLogin: false
			          \};
			
			          this.lock = h.displayLock('', opts, done);
			        \});
			
			        afterEach(function() \{
			          this.lock.hide();
			        \});
			
			        it('shows wrong code error', function(done) \{
			          h.waitForEmailAndPasswordInput(this.lock, () => \{
			            h.fillEmailInput(this.lock, 'someone@example.com');
			            h.fillPasswordInput(this.lock, 'mypass');
			            h.submitForm(this.lock);
			
			            h.waitUntilInputExists(this.lock, 'mfa_code', () => \{
			              h.fillMFACodeInput(this.lock, '123456');
			              h.submitForm(this.lock);
			
			              h.waitUntilErrorExists(this.lock, () => \{
			                h.testAsync(() => \{
			                  expect(h.haveShownError(this.lock, 'Wrong code. Please try again.')).to.be.ok();
			                \}, done);
			              \});
			            \});
			          \});
			        \});
			      \});
			    \});
			
			    describe('when mfa enrollment is required', function() \{
			      beforeEach(function(done) \{
			        const error = new Error();
			        error.error = 'a0.mfa_registration_required';
			
			        webApi.logIn.yields(error);
			
			        const opts = \{
			          allowedConnections: ['db'],
			          rememberLastLogin: false
			        \};
			
			        this.lock = h.displayLock('', opts, done);
			      \});
			
			      afterEach(function() \{
			        this.lock.hide();
			      \});
			
			      it('show an error', function(done) \{
			        h.waitForEmailAndPasswordInput(this.lock, () => \{
			          h.fillEmailInput(this.lock, 'someone@example.com');
			          h.fillPasswordInput(this.lock, 'mypass');
			          h.submitForm(this.lock);
			
			          h.waitUntilErrorExists(this.lock, () =>
			            h.testAsync(
			              () => \{
			                expect(
			                  h.haveShownError(
			                    this.lock,
			                    'Multifactor authentication is required but your ' +
			                      'device is not enrolled. Please enroll it before moving on.'
			                  )
			                ).to.be.ok();
			              \},
			              done,
			              2000
			            )
			          );
			        \});
			      \});
			    \});
			  \});
			
			  describe('for sign up', function() \{
			    describe('when mfa enrollment is required', function() \{
			      beforeEach(function(done) \{
			        const opts = \{
			          initialScreen: 'signUp',
			          rememberLastLogin: false
			        \};
			
			        const error = new Error();
			        error.error = 'a0.mfa_registration_required';
			
			        webApi.logIn.yields(error);
			        webApi.signUp.restore();
			        stub(webApi, 'signUp').yields();
			
			        this.lock = h.displayLock('single database', opts, done);
			      \});
			
			      afterEach(function() \{
			        webApi.signUp.restore();
			        this.lock.hide();
			      \});
			
			      it('show an error', function(done) \{
			        h.waitForEmailAndPasswordInput(this.lock, () => \{
			          h.fillEmailInput(this.lock, 'someone@example.com');
			          h.fillPasswordInput(this.lock, 'mYpass123');
			          h.submitForm(this.lock);
			
			          h.waitUntilErrorExists(this.lock, () =>
			            h.testAsync(() => \{
			              expect(
			                h.haveShownError(
			                  this.lock,
			                  'Multifactor authentication is required but your device ' +
			                    'is not enrolled. Please enroll it before moving on.'
			                )
			              ).to.be.ok();
			            \}, done)
			          );
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\mfa_ro.ui.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('auth0_lock\\test\\out-of-date\\cred\\index.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import Immutable from 'immutable';
			import * as c from '../../src/field/index';
			import * as cc from '../../src/field/country_codes';
			
			let emptyEntity = Immutable.fromJS(\{\});
			
			const invalidPhoneNumber = 'abc';
			const phoneNumber = '0303456';
			
			describe('setting a phone number', function() \{
			  let entity;
			
			  describe('when is valid', function() \{
			    beforeEach(function() \{
			      entity = c.setPhoneNumber(emptyEntity, phoneNumber);
			    \});
			
			    it('updates the phone number', function() \{
			      expect(c.phoneNumber(entity)).to.be(phoneNumber);
			    \});
			
			    it('marks the phone number as valid', function() \{
			      expect(c.validPhoneNumber(entity)).to.be(true);
			    \});
			
			    it('unmarks the phone number as visibly invalid', function() \{
			      expect(c.visiblyInvalidPhoneNumber(entity)).to.be(false);
			    \});
			  \});
			
			  describe('when is invalid', function() \{
			    beforeEach(function() \{
			      entity = c.setPhoneNumber(emptyEntity, invalidPhoneNumber);
			    \});
			
			    it('updates the phone number', function() \{
			      expect(c.phoneNumber(entity)).to.be(invalidPhoneNumber);
			    \});
			
			    it('unmarks the phone number as valid', function() \{
			      expect(c.validPhoneNumber(entity)).to.be(false);
			    \});
			  \});
			
			  describe('when marked as visibly invalid', function() \{
			    beforeEach(function() \{
			      entity = c.setShowInvalidPhoneNumber(emptyEntity, true);
			    \});
			
			    describe('and is valid', function() \{
			      beforeEach(function() \{
			        entity = c.setPhoneNumber(entity, phoneNumber);
			      \});
			
			      it('unmarks the phone number as visibly invalid', function() \{
			        expect(c.visiblyInvalidPhoneNumber(entity)).to.be(false);
			      \});
			    \});
			
			    describe('and is invalid', function() \{
			      beforeEach(function() \{
			        entity = c.setPhoneNumber(entity, invalidPhoneNumber);
			      \});
			
			      it('unmarks the phone number as visibly invalid', function() \{
			        expect(c.visiblyInvalidPhoneNumber(entity)).to.be(false);
			      \});
			    \});
			  \});
			\});
			
			describe('validating a phone number', function() \{
			  let entity;
			
			  it('fails when there is just one number', function() \{
			    entity = c.setPhoneNumber(emptyEntity, '1');
			    expect(c.validPhoneNumber(entity)).to.be(false);
			  \});
			
			  it('success when there is at least two numbers', function() \{
			    entity = c.setPhoneNumber(emptyEntity, '12');
			    expect(c.validPhoneNumber(entity)).to.be(true);
			  \});
			
			  it('success when there are spaces or hyphens between numbers', function() \{
			    entity = c.setPhoneNumber(emptyEntity, '123 4567-8901');
			    expect(c.validPhoneNumber(entity)).to.be(true);
			  \});
			
			  it('fails when it is the empty string', function() \{
			    entity = c.setPhoneNumber(emptyEntity, '');
			    expect(c.validPhoneNumber(entity)).to.be(false);
			  \});
			
			  it('fails when there are letters', function() \{
			    entity = c.setPhoneNumber(emptyEntity, '123a456');
			    expect(c.validPhoneNumber(entity)).to.be(false);
			  \});
			\});
			
			describe('accessing a phone number', function() \{
			  let entity;
			
			  describe('when is set', function() \{
			    beforeEach(function() \{
			      entity = c.setPhoneNumber(emptyEntity, phoneNumber);
			    \});
			
			    it('returns the number', function() \{
			      expect(c.phoneNumber(entity)).to.be(phoneNumber);
			    \});
			  \});
			
			  describe('when is not set', function() \{
			    beforeEach(function() \{
			      entity = emptyEntity;
			    \});
			
			    it('returns the empty string', function() \{
			      expect(c.phoneNumber(entity)).to.be('');
			    \});
			  \});
			\});
			
			const location = cc.countryCodes.first();
			
			describe('accessing a dialing code', function() \{
			  let entity;
			
			  describe('when a location is set', function() \{
			    beforeEach(function() \{
			      entity = c.setPhoneLocation(emptyEntity, location);
			    \});
			
			    it("returns the location's dialing code", function() \{
			      expect(c.phoneDialingCode(entity)).to.be(cc.dialingCode(location));
			      expect(cc.dialingCode(location)).to.not.be(cc.dialingCode(cc.defaultLocation)); // sanity check
			    \});
			  \});
			
			  describe('when a location is not set', function() \{
			    beforeEach(function() \{
			      entity = emptyEntity;
			    \});
			
			    it('returns the default dialing code', function() \{
			      expect(c.phoneDialingCode(entity)).to.be(cc.dialingCode(cc.defaultLocation));
			    \});
			  \});
			\});
			
			describe('accessing a full phone number', function() \{
			  let entity;
			
			  describe('when the phone number is set', function() \{
			    beforeEach(function() \{
			      entity = c.setPhoneNumber(emptyEntity, phoneNumber);
			    \});
			
			    it('returns the dialing code concatenated with the number', function() \{
			      expect(c.fullPhoneNumber(entity)).to.be(c.phoneDialingCode(entity) + c.phoneNumber(entity));
			    \});
			  \});
			
			  describe('when the phone number is not set', function() \{
			    beforeEach(function() \{
			      entity = emptyEntity;
			    \});
			
			    it('returns the dialing code', function() \{
			      expect(c.fullPhoneNumber(entity)).to.be(c.phoneDialingCode(entity));
			    \});
			  \});
			\});
			
			describe('accessing a human readable full phone number', function() \{
			  let entity;
			
			  describe('when the phone number is set', function() \{
			    beforeEach(function() \{
			      entity = c.setPhoneNumber(emptyEntity, phoneNumber);
			    \});
			
			    it('returns the dialing code separated from the number', function() \{
			      expect(c.fullHumanPhoneNumber(entity)).to.be(
			        \`\$\{c.phoneDialingCode(entity)\} \$\{c.phoneNumber(entity)\}\`
			      );
			    \});
			  \});
			
			  describe('when the phone number is not set', function() \{
			    beforeEach(function() \{
			      entity = emptyEntity;
			    \});
			
			    it('returns the dialing code and a space', function() \{
			      expect(c.fullHumanPhoneNumber(entity)).to.be(\`\$\{c.phoneDialingCode(entity)\} \`);
			    \});
			  \});
			\});
			
			const invalidEmail = 'abc';
			const email = 'someone@auth0.com';
			
			describe('setting an email', function() \{
			  let entity;
			
			  describe('when is valid', function() \{
			    beforeEach(function() \{
			      entity = c.setEmail(emptyEntity, email);
			    \});
			
			    it('updates the email', function() \{
			      expect(c.email(entity)).to.be(email);
			    \});
			
			    it('marks the email as valid', function() \{
			      expect(c.validEmail(entity)).to.be(true);
			    \});
			
			    it('unmarks the email as visibly invalid', function() \{
			      expect(c.visiblyInvalidEmail(entity)).to.be(false);
			    \});
			  \});
			
			  describe('when is invalid', function() \{
			    beforeEach(function() \{
			      entity = c.setEmail(emptyEntity, invalidEmail);
			    \});
			
			    it('updates the email', function() \{
			      expect(c.email(entity)).to.be(invalidEmail);
			    \});
			
			    it('unmarks the email as valid', function() \{
			      expect(c.validEmail(entity)).to.be(false);
			    \});
			  \});
			
			  describe('when marked as visibly invalid', function() \{
			    beforeEach(function() \{
			      entity = c.setShowInvalidEmail(emptyEntity, true);
			    \});
			
			    describe('and is valid', function() \{
			      beforeEach(function() \{
			        entity = c.setEmail(entity, email);
			      \});
			
			      it('unmarks the email as visibly invalid', function() \{
			        expect(c.visiblyInvalidEmail(entity)).to.be(false);
			      \});
			    \});
			
			    describe('and is invalid', function() \{
			      beforeEach(function() \{
			        entity = c.setEmail(entity, invalidEmail);
			      \});
			
			      it('unmarks the email as visibly invalid', function() \{
			        expect(c.visiblyInvalidEmail(entity)).to.be(false);
			      \});
			    \});
			  \});
			\});
			
			describe('validating an email', function() \{
			  let entity;
			
			  it('success when it contains all of its parts', function() \{
			    entity = c.setEmail(emptyEntity, 'someone@auth0.com');
			    expect(c.validEmail(entity)).to.be(true);
			  \});
			
			  it('fails when the @ is missing', function() \{
			    entity = c.setEmail(emptyEntity, 'someoneauth0.com');
			    expect(c.validEmail(entity)).to.be(false);
			  \});
			
			  it('fails when it is the empty string', function() \{
			    entity = c.setEmail(emptyEntity, '');
			    expect(c.validEmail(entity)).to.be(false);
			  \});
			
			  it('fails when the local part is missing', function() \{
			    entity = c.setEmail(emptyEntity, '@auth0.com');
			    expect(c.validEmail(entity)).to.be(false);
			  \});
			
			  it('fails when the domain is missing', function() \{
			    entity = c.setEmail(emptyEntity, 'someone@');
			    expect(c.validEmail(entity)).to.be(false);
			  \});
			
			  it('fails when the domain is incomplete', function() \{
			    entity = c.setEmail(emptyEntity, 'someone@auth0.c');
			    expect(c.validEmail(entity)).to.be(false);
			  \});
			\});
			
			describe('accessing an email', function() \{
			  let entity;
			
			  describe('when is set', function() \{
			    beforeEach(function() \{
			      entity = c.setEmail(emptyEntity, email);
			    \});
			
			    it('returns the email', function() \{
			      expect(c.email(entity)).to.be(email);
			    \});
			  \});
			
			  describe('when is not set', function() \{
			    beforeEach(function() \{
			      entity = emptyEntity;
			    \});
			
			    it('returns the empty string', function() \{
			      expect(c.email(entity)).to.be('');
			    \});
			  \});
			\});
			
			const invalidVcode = '';
			const vcode = '123456';
			
			describe('setting a vcode', function() \{
			  let entity;
			
			  describe('when is valid', function() \{
			    beforeEach(function() \{
			      entity = c.setVcode(emptyEntity, vcode);
			    \});
			
			    it('updates the vcode', function() \{
			      expect(c.vcode(entity)).to.be(vcode);
			    \});
			
			    it('marks the vcode as valid', function() \{
			      expect(c.validVcode(entity)).to.be(true);
			    \});
			
			    it('unmarks the vcode as visibly invalid', function() \{
			      expect(c.visiblyInvalidVcode(entity)).to.be(false);
			    \});
			  \});
			
			  describe('when is invalid', function() \{
			    beforeEach(function() \{
			      entity = c.setVcode(emptyEntity, invalidVcode);
			    \});
			
			    it('updates the vcode', function() \{
			      expect(c.vcode(entity)).to.be(invalidVcode);
			    \});
			
			    it('unmarks the vcode as valid', function() \{
			      expect(c.validVcode(entity)).to.be(false);
			    \});
			  \});
			
			  describe('when marked as visibly invalid', function() \{
			    beforeEach(function() \{
			      entity = c.setShowInvalidVcode(emptyEntity, true);
			    \});
			
			    describe('and is valid', function() \{
			      beforeEach(function() \{
			        entity = c.setVcode(entity, vcode);
			      \});
			
			      it('unmarks the vcode as visibly invalid', function() \{
			        expect(c.visiblyInvalidVcode(entity)).to.be(false);
			      \});
			    \});
			
			    describe('and is invalid', function() \{
			      beforeEach(function() \{
			        // TODO: We need to perform a value change but the only invalid code is
			        // the empty string.
			        entity = c.setVcode(entity, '1');
			        entity = c.setShowInvalidVcode(entity, true);
			
			        entity = c.setVcode(entity, invalidVcode);
			      \});
			
			      it('unmarks the vcode as visibly invalid', function() \{
			        expect(c.visiblyInvalidVcode(entity)).to.be(false);
			      \});
			    \});
			  \});
			\});
			
			describe('validating a vcode', function() \{
			  let entity;
			
			  it('success when there is at least one character', function() \{
			    entity = c.setVcode(emptyEntity, 'a');
			    expect(c.validVcode(entity)).to.be(true);
			  \});
			
			  it('fails when it is the empty string', function() \{
			    entity = c.setVcode(emptyEntity, '');
			    expect(c.validVcode(entity)).to.be(false);
			  \});
			\});
			
			describe('accessing a vcode', function() \{
			  let entity;
			
			  describe('when is set', function() \{
			    beforeEach(function() \{
			      entity = c.setVcode(emptyEntity, vcode);
			    \});
			
			    it('returns the vcode', function() \{
			      expect(c.vcode(entity)).to.be(vcode);
			    \});
			  \});
			
			  describe('when is not set', function() \{
			    beforeEach(function() \{
			      entity = emptyEntity;
			    \});
			
			    it('returns the empty string', function() \{
			      expect(c.vcode(entity)).to.be('');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\out-of-date\\cred\\index.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(46)
    });
    it('auth0_lock\\test\\out-of-date\\gravatar\\index.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import \{ Map \} from 'immutable';
			import * as g from '../../src/gravatar/index';
			
			const emptyGravatar = new Map(\{\});
			const displayName = 'someone';
			const imageUrl = 'https://secure.gravatar.com/avatar/b91fa14e9ce922cc2fdedb2f84dba3a5?d=404';
			
			describe('an empty gravatar', function() \{
			  it("doesn't have a display name", function() \{
			    expect(g.displayName(emptyGravatar)).to.be(undefined);
			  \});
			
			  it("doesn't have an imageUrl", function() \{
			    expect(g.imageUrl(emptyGravatar)).to.be(undefined);
			  \});
			
			  it("isn't loaded", function() \{
			    expect(g.loaded(emptyGravatar)).to.be(false);
			  \});
			\});
			
			describe('updating a gravatar', function() \{
			  describe('setting a display name', function() \{
			    let gravatarWithDisplayName;
			
			    beforeEach(function() \{
			      gravatarWithDisplayName = g.setDisplayName(emptyGravatar, displayName);
			    \});
			
			    it('updates its value', function() \{
			      expect(g.displayName(gravatarWithDisplayName)).to.be(displayName);
			    \});
			
			    it("doesn't mark it as loaded", function() \{
			      expect(g.loaded(gravatarWithDisplayName)).to.be(false);
			    \});
			  \});
			
			  describe('setting an image url', function() \{
			    let gravatarWithImageUrl;
			
			    beforeEach(function() \{
			      gravatarWithImageUrl = g.setImageUrl(emptyGravatar, imageUrl);
			    \});
			
			    it('updates its value', function() \{
			      expect(g.imageUrl(gravatarWithImageUrl)).to.be(imageUrl);
			    \});
			
			    it("doesn't mark it as loaded", function() \{
			      expect(g.loaded(gravatarWithImageUrl)).to.be(false);
			    \});
			  \});
			
			  describe('setting a display name and a image url', function() \{
			    let loadedGravatar;
			
			    beforeEach(function() \{
			      loadedGravatar = g.setDisplayName(emptyGravatar, displayName);
			      loadedGravatar = g.setImageUrl(loadedGravatar, imageUrl);
			    \});
			
			    it('marks it as loaded', function() \{
			      expect(g.loaded(loadedGravatar)).to.be(true);
			    \});
			  \});
			\});
			
			describe('normalizing an email', function() \{
			  it('lowercases upercased letters', function() \{
			    const email = 'SomeOne@Auth0.com';
			    expect(g.normalizeGravatarEmail(email)).to.be(email.toLowerCase());
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\out-of-date\\gravatar\\index.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('auth0_lock\\test\\out-of-date\\gravatar\\web_api.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import \{ spy, stub \} from 'sinon';
			import * as api from '../../src/gravatar/web_api';
			import jsonp from '../../src/utils/jsonp_utils';
			
			const email = 'someone@auth0.com';
			const emailMD5 = 'b91fa14e9ce922cc2fdedb2f84dba3a5';
			const invalidEmail = 'invalidEmail';
			let fail, success;
			
			describe('fetching image', function() \{
			  let img;
			
			  // TODO: stub preload.img and add tests for preload.
			  function getCallback(name) \{
			    for (var i = 0; i < img.addEventListener.callCount; i++) \{
			      if (img.addEventListener.getCall(i).args[0] == name) \{
			        return img.addEventListener.getCall(i);
			      \}
			    \}
			  \}
			
			  function invokeCallback(name) \{
			    const args = [name === 'error' ? \{\} : undefined];
			    return getCallback(name).args[1].apply(undefined, args);
			  \}
			
			  beforeEach(function() \{
			    img = \{ addEventListener: spy() \};
			    stub(window.document, 'createElement').returns(img);
			    success = spy();
			    fail = spy();
			  \});
			
			  afterEach(function() \{
			    window.document.createElement.restore();
			  \});
			
			  describe('for an invalid email', function() \{
			    beforeEach(function() \{
			      api.img(invalidEmail, success, fail);
			    \});
			
			    it("invokes the 'fail' callback", function() \{
			      expect(fail.calledOnce).to.be(true);
			      expect(fail.calledWithExactly(invalidEmail)).to.be(true);
			    \});
			  \});
			
			  describe('for a valid email', function() \{
			    beforeEach(function() \{
			      api.img(email, success, fail);
			    \});
			
			    it('constructs the expected URL', function() \{
			      const url = \`https://secure.gravatar.com/avatar/\$\{emailMD5\}?d=404\`;
			      expect(img.src).to.be(url);
			    \});
			
			    it("setups a 'load' and a 'error' callback", function() \{
			      expect(img.addEventListener.calledTwice).to.be(true);
			      expect(img.addEventListener.withArgs('load').calledOnce).to.be(true);
			      expect(img.addEventListener.withArgs('error').calledOnce).to.be(true);
			    \});
			
			    describe('with an associated Gravatar image', function() \{
			      beforeEach(function() \{
			        invokeCallback('load');
			      \});
			
			      it("invokes the 'success' callback with \`email\` and \`img\`", function() \{
			        expect(success.calledOnce).to.be(true);
			        expect(success.calledWithExactly(email, img)).to.be(true);
			      \});
			    \});
			
			    describe('without an associated Gravatar image', function() \{
			      beforeEach(function() \{
			        invokeCallback('error');
			      \});
			
			      it("invokes the 'fail' callback with \`email\`", function() \{
			        expect(fail.calledOnce).to.be(true);
			        expect(fail.calledWithExactly(email)).to.be(true);
			      \});
			    \});
			  \});
			\});
			
			describe('fetching profile', function() \{
			  const email = 'someone@auth0.com';
			  const emailMD5 = 'b91fa14e9ce922cc2fdedb2f84dba3a5';
			  const invalidEmail = 'invalidEmail';
			
			  function invokeCallback(err, obj) \{
			    return jsonp.get.lastCall.args[1].call(undefined, err, obj);
			  \}
			
			  beforeEach(function() \{
			    success = spy();
			    fail = spy();
			    stub(jsonp, 'get');
			  \});
			
			  afterEach(function() \{
			    jsonp.get.restore();
			  \});
			
			  describe('for an invalid email', function() \{
			    beforeEach(function() \{
			      api.profile(invalidEmail, success, fail);
			    \});
			
			    it("invokes the 'fail' callback", function() \{
			      expect(fail.calledOnce).to.be(true);
			      expect(fail.calledWithExactly(invalidEmail)).to.be(true);
			    \});
			  \});
			
			  describe('for a valid email', function() \{
			    beforeEach(function() \{
			      api.profile(email, success, fail);
			    \});
			
			    it('performs a request to the expected URL', function() \{
			      const url = \`https://secure.gravatar.com/\$\{emailMD5\}.json\`;
			      expect(jsonp.get.calledOnce).to.be(true);
			      expect(jsonp.get.withArgs(url).calledOnce).to.be(true);
			    \});
			
			    describe('with an associated Gravatar profile', function() \{
			      const response = \{ entry: [\{ someAttr: 'someAttr' \}] \};
			
			      beforeEach(function() \{
			        invokeCallback(null, response);
			      \});
			
			      it("invokes the 'success' callback with \`email\` and \`img\`", function() \{
			        expect(success.calledOnce).to.be(true);
			        expect(success.calledWithExactly(email, response.entry[0])).to.be(true);
			      \});
			    \});
			
			    describe('with an associated empty Gravatar profile', function() \{
			      const response = \{ entry: [] \};
			
			      beforeEach(function() \{
			        invokeCallback(null, response);
			      \});
			
			      it("invokes the 'success' callback with \`email\` and \`img\`", function() \{
			        expect(fail.calledOnce).to.be(true);
			        expect(fail.calledWithExactly(email)).to.be(true);
			      \});
			    \});
			
			    describe('without an associated Gravatar profile', function() \{
			      const error = \{ code: 'someCode' \};
			
			      beforeEach(function() \{
			        invokeCallback(error);
			      \});
			
			      it("invokes the 'fail' callback with \`email\`", function() \{
			        expect(fail.calledOnce).to.be(true);
			        expect(fail.calledWithExactly(email, error)).to.be(true);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\out-of-date\\gravatar\\web_api.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('auth0_lock\\test\\out-of-date\\index.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import \{ spy, stub \} from 'sinon';
			
			import Auth0LockPasswordless from '../src/index';
			import WebAPI from '../src/core/web_api';
			
			describe('.parseHash', function() \{
			  beforeEach(function() \{
			    this.lock = new Auth0LockPasswordless('c', 'd');
			    this.client = getLockClient(this.lock);
			  \});
			
			  it('delegates the call to an Auth0 instance', function() \{
			    const hash = 'a hash';
			    const returnValue = 'fake return value';
			    stub(this.client, 'parseHash').returns(returnValue);
			
			    expect(this.lock.parseHash(hash)).to.be(returnValue);
			
			    expect(this.client.parseHash.calledOnce).to.be.ok();
			    expect(this.client.parseHash.lastCall.calledWithExactly(hash)).to.be.ok();
			  \});
			\});
			
			describe('.getProfile', function() \{
			  beforeEach(function() \{
			    this.lock = new Auth0LockPasswordless('c', 'd');
			    this.client = getLockClient(this.lock);
			  \});
			
			  it('delegates the call to an Auth0 instance', function() \{
			    const token = 'a token';
			    const cb = () => \{\};
			    const returnValue = 'fake return value';
			    stub(this.client, 'getProfile').returns(returnValue);
			
			    expect(this.lock.getProfile(token, cb)).to.be(returnValue);
			
			    expect(this.client.getProfile.calledOnce).to.be.ok();
			    expect(this.client.getProfile.lastCall.calledWithExactly(token, cb)).to.be.ok();
			  \});
			\});
			
			function getLockClient(lock) \{
			  const client = WebAPI.clients[lock.id];
			  if (!client) \{
			    throw new Error("Couldn't find Auth0 client for Lock");
			  \}
			
			  return client;
			\}
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\out-of-date\\index.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('auth0_lock\\test\\out-of-date\\lock\\index.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import Immutable from 'immutable';
			import * as l from '../../src/core/index';
			
			let lock;
			
			const clientID = 'someClientID';
			const lockID = 'someLockID';
			const domain = 'tenant.auth0.com';
			
			describe('initializing a lock', function() \{
			  beforeEach(function() \{
			    lock = l.setup(\{
			      clientID: clientID,
			      domain: domain,
			      id: lockID,
			      nonexistent: 'nonexistent'
			    \});
			  \});
			
			  it('sets the id', function() \{
			    expect(l.id(lock)).to.be(lockID);
			  \});
			
			  it('sets the client id', function() \{
			    expect(l.clientID(lock)).to.be(clientID);
			  \});
			
			  it('sets the domain', function() \{
			    expect(l.domain(lock)).to.be(domain);
			  \});
			
			  it("doesn't set unknown attributes", function() \{
			    expect(lock.get('nonexistent')).to.be(undefined);
			  \});
			
			  it("doesn't set any mode", function() \{
			    expect(l.modeName(lock)).to.be(undefined);
			  \});
			
			  it("doesn't need to be shown", function() \{
			    expect(l.show(lock)).to.be(false);
			  \});
			
			  it("isn't submitting", function() \{
			    expect(l.submitting(lock)).to.be(false);
			  \});
			
			  it("doesn't have a global error", function() \{
			    expect(l.globalError(lock)).to.be('');
			  \});
			
			  it("doesn't need to be rendered", function() \{
			    expect(l.rendering(lock)).to.be(false);
			  \});
			\});
			
			describe('rendering a lock', function() \{
			  let renderedLock;
			  const modeName = 'someMode';
			  const modeOptions = \{ someModeOption: 'someModeOption' \};
			
			  beforeEach(function() \{
			    lock = l.setup(\{ clientID: clientID, domain: domain, id: lockID \});
			    renderedLock = l.render(lock, modeName, \{ mode: modeOptions \});
			  \});
			
			  it('sets the mode', function() \{
			    expect(l.modeName(renderedLock)).to.be(modeName);
			  \});
			
			  it('sets the mode options', function() \{
			    const assginedModeOptions = Immutable.fromJS(modeOptions).toJS();
			    assginedModeOptions.name = modeName;
			    expect(l.modeOptions(renderedLock).toJS()).to.eql(assginedModeOptions);
			  \});
			
			  it("it isn't being shown yet", function() \{
			    expect(l.show(renderedLock)).to.be(false);
			  \});
			
			  it('needs to be rendered', function() \{
			    expect(l.rendering(renderedLock)).to.be(true);
			  \});
			
			  it('choses a container id automatically', function() \{
			    expect(l.ui.containerID(renderedLock)).to.be(\`auth0-lock-container-\$\{l.id(lock)\}\`);
			  \});
			
			  it('can append a container when needed', function() \{
			    expect(l.ui.appendContainer(renderedLock)).to.be(true);
			  \});
			
			  it('uses the auth0 logo', function() \{
			    expect(l.ui.icon(renderedLock)).to.be(
			      '//cdn.auth0.com/styleguide/components/1.0.8/media/logos/img/badge.png'
			    );
			  \});
			
			  it('can be closed', function() \{
			    expect(l.ui.closable(renderedLock)).to.be(true);
			  \});
			
			  // TODO: focusInput test, but remove isSmallScreen dependency first
			
			  it('displays user name and picture obtained from Gravatar', function() \{
			    expect(l.ui.gravatar(renderedLock)).to.be(true);
			  \});
			
			  describe('with ui option', function() \{
			    describe('\`container\`', function() \{
			      const container = 'someId';
			
			      beforeEach(function() \{
			        renderedLock = l.render(lock, modeName, \{ container: container \});
			      \});
			
			      it('assigns it as the container id', function() \{
			        expect(l.ui.containerID(renderedLock)).to.be(container);
			      \});
			
			      it('prohibits appending a container', function() \{
			        expect(l.ui.appendContainer(renderedLock)).to.be(false);
			      \});
			
			      it("doesn't allow to close it (by default)", function() \{
			        expect(l.ui.closable(renderedLock)).to.be(false);
			      \});
			
			      // TODO: focusInput test, but (again) remove isSmallScreen dependency first
			    \});
			
			    describe('\`appendContainer\`', function() \{
			      beforeEach(function() \{
			        renderedLock = l.render(lock, modeName, \{ appendContainer: false \});
			      \});
			
			      it("doesn't affect whether a container can be appended or not", function() \{
			        expect(l.ui.appendContainer(renderedLock)).to.be(true);
			      \});
			    \});
			
			    describe('\`icon\`', function() \{
			      const icon = 'my_company_icon.svg';
			
			      beforeEach(function() \{
			        renderedLock = l.render(lock, modeName, \{ icon: icon \});
			      \});
			
			      it('sets a customs icon', function() \{
			        expect(l.ui.icon(renderedLock)).to.be(icon);
			      \});
			    \});
			
			    describe('\`closable\`', function() \{
			      describe('without \`container\`', function() \{
			        beforeEach(function() \{
			          renderedLock = l.render(lock, modeName, \{ closable: false \});
			        \});
			
			        it('can stop the user from closing the lock', function() \{
			          expect(l.ui.closable(renderedLock)).to.be(false);
			        \});
			      \});
			
			      describe('with \`container\`', function() \{
			        beforeEach(function() \{
			          renderedLock = l.render(lock, modeName, \{ closable: true, container: 'someId' \});
			        \});
			
			        it("it doesn't have any effect (doesn't allow the user to close the lock)", function() \{
			          expect(l.ui.closable(renderedLock)).to.be(false);
			        \});
			      \});
			    \});
			
			    // TODO: focusInput test, but (again) remove isSmallScreen dependency first
			
			    describe('\`gravatar\`', function() \{
			      beforeEach(function() \{
			        renderedLock = l.render(lock, modeName, \{ gravatar: false \});
			      \});
			
			      it("doesn't display user name and picture obtained from Gravatar", function() \{
			        expect(l.ui.gravatar(renderedLock)).to.be(false);
			      \});
			    \});
			  \});
			
			  describe('then opening it', function() \{
			    let openedLock;
			    beforeEach(function() \{
			      openedLock = l.setShow(renderedLock, true);
			    \});
			
			    it('needs to be shown now', function() \{
			      expect(l.show(openedLock)).to.be(true);
			    \});
			
			    describe('and closing it', function() \{
			      let closedLock;
			      beforeEach(function() \{
			        closedLock = l.close(openedLock);
			      \});
			
			      it("doesn't need to be shown anymore", function() \{
			        expect(l.show(closedLock)).to.be(false);
			      \});
			
			      it('still needs to be rendered', function() \{
			        expect(l.rendering(closedLock)).to.be(true);
			      \});
			    \});
			  \});
			\});
			
			describe('rerendering a lock', function() \{
			  let renderedLock, reRenderedLock;
			  const modeName = 'someMode';
			
			  beforeEach(function() \{
			    lock = l.setup(\{ clientID: clientID, domain: domain, id: lockID \});
			    renderedLock = l.render(lock, modeName, \{\});
			    reRenderedLock = l.render(renderedLock, modeName, \{\});
			  \});
			
			  it("doesn't change the container id", function() \{
			    expect(l.ui.containerID(reRenderedLock)).to.be(l.ui.containerID(renderedLock));
			  \});
			
			  it("doesn't change whether it allows to append a container or not", function() \{
			    expect(l.ui.appendContainer(reRenderedLock)).to.be(l.ui.appendContainer(renderedLock));
			  \});
			
			  it("doesn't change the icon", function() \{
			    expect(l.ui.icon(reRenderedLock)).to.be(l.ui.icon(renderedLock));
			  \});
			
			  it("doesn't change whether it can be closed or not", function() \{
			    expect(l.ui.closable(reRenderedLock)).to.be(l.ui.closable(renderedLock));
			  \});
			
			  // TODO: focusInput test, but (again) remove isSmallScreen dependency first
			
			  it("doesn't change whether it displays info obtained from Gravatar or not", function() \{
			    expect(l.ui.gravatar(reRenderedLock)).to.be(l.ui.gravatar(renderedLock));
			  \});
			
			  describe('with UI option', function() \{
			    const reopenOptions = \{
			      container: 'someId',
			      icon: 'my_company_icon.svg',
			      closable: false,
			      gravatar: false
			    \};
			
			    describe('\`container\`', function() \{
			      beforeEach(function() \{
			        reRenderedLock = l.render(renderedLock, modeName, \{ container: reopenOptions.container \});
			      \});
			
			      it("doesn't change the container's id", function() \{
			        expect(l.ui.containerID(reRenderedLock)).to.be(l.ui.containerID(renderedLock));
			        expect(l.ui.containerID(reRenderedLock)).to.not.be(reopenOptions.container); // sanity check
			      \});
			
			      it("doesn't affect whether a container can be appended or not", function() \{
			        expect(l.ui.appendContainer(reRenderedLock)).to.be(l.ui.appendContainer(renderedLock));
			        expect(l.ui.appendContainer(reRenderedLock)).to.be(true); // sanity check
			      \});
			
			      it("doesn't change whether it can be closed or not", function() \{
			        expect(l.ui.closable(reRenderedLock)).to.be(l.ui.closable(renderedLock));
			        expect(l.ui.closable(reRenderedLock)).to.be(true); // sanity check
			      \});
			    \});
			
			    describe('\`appendContainer\`', function() \{
			      beforeEach(function() \{
			        reRenderedLock = l.render(renderedLock, modeName, \{ appendContainer: false \});
			      \});
			
			      it("doesn't affect whether a container can be appended or not", function() \{
			        expect(l.ui.appendContainer(reRenderedLock)).to.be(l.ui.appendContainer(renderedLock));
			        expect(l.ui.appendContainer(reRenderedLock)).to.be(true); // sanity check
			      \});
			    \});
			
			    describe('\`icon\`', function() \{
			      beforeEach(function() \{
			        reRenderedLock = l.render(renderedLock, modeName, \{ icon: reopenOptions.icon \});
			      \});
			
			      it('changes the icon', function() \{
			        expect(l.ui.icon(reRenderedLock)).to.be(reopenOptions.icon);
			        expect(l.ui.icon(renderedLock)).to.not.be(reopenOptions.icon); // sanity check
			      \});
			    \});
			
			    describe('\`closable\`', function() \{
			      beforeEach(function() \{
			        reRenderedLock = l.render(renderedLock, modeName, \{ closable: reopenOptions.closable \});
			      \});
			
			      it('changes whether it can be closed or not', function() \{
			        expect(l.ui.closable(reRenderedLock)).to.be(reopenOptions.closable);
			        expect(l.ui.closable(renderedLock)).to.not.be(reopenOptions.closable); // sanity check
			      \});
			    \});
			
			    // TODO: focusInput test, but (again) remove isSmallScreen dependency first
			
			    describe('\`gravatar\`', function() \{
			      beforeEach(function() \{
			        reRenderedLock = l.render(renderedLock, modeName, \{ gravatar: reopenOptions.gravatar \});
			      \});
			
			      it('changes whether it displays info obtained from Gravatar or not', function() \{
			        expect(l.ui.gravatar(reRenderedLock)).to.be(reopenOptions.gravatar);
			        expect(l.ui.gravatar(renderedLock)).to.not.be(reopenOptions.gravatar); // sanity check
			      \});
			    \});
			  \});
			
			  describe('in another mode', function() \{
			    const otherModeName = 'otherMode';
			    let notRerenderedLock;
			
			    beforeEach(function() \{
			      notRerenderedLock = l.render(reRenderedLock, otherModeName, \{ gravatar: false \});
			    \});
			
			    it("doesn't change anything", function() \{
			      expect(reRenderedLock).to.be(notRerenderedLock);
			    \});
			  \});
			\});
			
			describe('trying to render a lock that is being shown', function() \{
			  let openedLock, reRenderedLock;
			  const modeName = 'someMode';
			
			  beforeEach(function() \{
			    lock = l.setup(\{ clientID: clientID, domain: domain, id: lockID \});
			    openedLock = l.setShow(l.render(lock, modeName, \{\}), true);
			    reRenderedLock = l.render(openedLock, modeName, \{ gravatar: false \});
			  \});
			
			  it("doesn't change anything", function() \{
			    expect(reRenderedLock).to.be(openedLock);
			  \});
			\});
			
			describe('submitting', function() \{
			  let lockWithGlobalError, submittingLock;
			  const globalError = 'Something went wrong.';
			
			  beforeEach(function() \{
			    lock = l.setup(\{ clientID: clientID, domain: domain, id: lockID \});
			    lockWithGlobalError = l.setGlobalError(lock, globalError);
			    submittingLock = l.setSubmitting(lockWithGlobalError, true);
			  \});
			
			  it('updates the submit status', function() \{
			    expect(l.submitting(submittingLock)).to.be(true);
			    expect(l.submitting(lockWithGlobalError)).to.be(false); // sanity check
			  \});
			
			  it('clears the global error', function() \{
			    expect(l.globalError(submittingLock)).to.be('');
			  \});
			
			  describe('providing a global error', function() \{
			    beforeEach(function() \{
			      // TODO: this is confusing, split \`setSubmitting\` into \`startSubmit\` and
			      // \`stopSubmit\`.
			      submittingLock = l.setSubmitting(lockWithGlobalError, true, globalError);
			    \});
			
			    it('updates the submit status', function() \{
			      expect(l.submitting(submittingLock)).to.be(true);
			      expect(l.submitting(lockWithGlobalError)).to.be(false); // sanity check
			    \});
			
			    it('clears the global error anyway', function() \{
			      expect(l.globalError(submittingLock)).to.be('');
			      expect(globalError).to.not.be(''); // sanity check
			    \});
			  \});
			
			  describe('a successful request', function() \{
			    beforeEach(function() \{
			      submittingLock = l.setSubmitting(lock, false);
			    \});
			
			    it('updates the submit status', function() \{
			      expect(l.submitting(submittingLock)).to.be(false);
			    \});
			
			    it("doesn't record any global error", function() \{
			      expect(l.globalError(submittingLock)).to.be('');
			    \});
			  \});
			
			  describe('an unsuccessful request', function() \{
			    beforeEach(function() \{
			      submittingLock = l.setSubmitting(lock, false, globalError);
			    \});
			
			    it('updates the submit status', function() \{
			      expect(l.submitting(submittingLock)).to.be(false);
			    \});
			
			    it('records a global error', function() \{
			      expect(l.globalError(submittingLock)).to.be(globalError);
			    \});
			  \});
			\});
			
			describe('accessing Gravatar info', function() \{
			  const gravatar = Immutable.fromJS(\{ displayName: 'someName', imageUrl: 'someUrl' \});
			  const modeName = 'someMode';
			  let renderedLock;
			
			  beforeEach(function() \{
			    lock = l.setup(\{ clientID: clientID, domain: domain, id: lockID \});
			  \});
			
			  describe('when it has to be displayed', function() \{
			    beforeEach(function() \{
			      renderedLock = l.render(lock, modeName, \{ gravatar: true \});
			    \});
			
			    describe("and it isn't available", function() \{
			      it('returns undefined', function() \{
			        expect(l.gravatar(renderedLock)).to.be(undefined);
			      \});
			    \});
			
			    describe('and it is available', function() \{
			      beforeEach(function() \{
			        renderedLock = renderedLock.set('gravatar', gravatar);
			      \});
			
			      it('returns it', function() \{
			        expect(l.gravatar(renderedLock)).to.be(gravatar);
			      \});
			    \});
			  \});
			
			  describe("when available but it doesn't have to be displayed", function() \{
			    beforeEach(function() \{
			      renderedLock = l.render(lock, modeName, \{ gravatar: false \});
			      renderedLock = renderedLock.set('gravatar', gravatar);
			    \});
			
			    it('returns undefined', function() \{
			      expect(l.gravatar(renderedLock)).to.be(undefined);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\out-of-date\\lock\\index.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(54)
    });
    it('auth0_lock\\test\\out-of-date\\passwordless\\emailcode.acceptance.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as u from '../acceptance_test_utils';
			
			describe('.emailcode acceptance', function() \{
			  before(u.stubWebApis);
			  after(u.restoreWebApis);
			
			  describe('constructing a Lock', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			    \});
			
			    it("doesn't render a thing", function() \{
			      expect(u.isRendered(this.lock)).to.not.be.ok();
			    \});
			  \});
			
			  describe('opening a Lock', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it("doesn't open the Lock immediately", function() \{
			      u.openLock(this.lock, 'emailcode');
			
			      expect(u.isRendered(this.lock)).to.be.ok();
			      expect(u.isOpened(this.lock)).to.not.be.ok();
			    \});
			
			    it('opens it after a few ms', function(done) \{
			      setTimeout(() => \{
			        expect(u.isOpened(this.lock)).to.be.ok();
			        done();
			      \}, 17);
			    \});
			
			    it('displays an empty input for the email', function() \{
			      expect(u.qInputValue(this.lock, 'email')).to.be('');
			    \});
			  \});
			
			  describe('entering an invalid email', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      u.openLock(this.lock, 'emailcode');
			      u.fillInput(this.lock, 'email', 'invalid email');
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it("doesn't mark the input as invalid", function() \{
			      expect(u.isInputInvalid(this.lock, 'email')).to.not.be.ok();
			    \});
			
			    describe('when attempting a submit', function() \{
			      before(function() \{
			        u.submit(this.lock);
			      \});
			
			      it('marks the input as invalid', function() \{
			        expect(u.isInputInvalid(this.lock, 'email')).to.be.ok();
			      \});
			
			      it("doesn't perform any request", function() \{
			        expect(u.hasStartedPasswordless(false)).to.be.ok();
			        expect(u.isInputInvalid(this.lock, 'email')).to.be.ok();
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      describe('when fixing the email', function() \{
			        before(function() \{
			          u.fillInput(this.lock, 'email', 'someone@auth0.com');
			        \});
			
			        it('clears the input error', function() \{
			          expect(u.isInputInvalid(this.lock, 'email')).to.not.be.ok();
			        \});
			
			        describe('and entering an invalid email again', function() \{
			          before(function() \{
			            u.fillInput(this.lock, 'email', 'invalid email');
			          \});
			
			          it("doesn't mark the input as invalid", function() \{
			            expect(u.isInputInvalid(this.lock, 'email')).to.not.be.ok();
			          \});
			        \});
			      \});
			    \});
			  \});
			
			  describe('successfully submitting an email', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'emailcode');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{
			        authParams: \{\},
			        callbackURL: undefined,
			        email: 'someone@auth0.com',
			        forceJSONP: undefined,
			        responseType: 'token',
			        send: 'code',
			        sso: true
			      \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        u.simulateStartPasswordlessResponse();
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it('waits until the vcode credential pane appears', function(done) \{
			        this.timeout(u.CRED_PANE_DELAY + 3000);
			        setTimeout(done, u.CRED_PANE_DELAY);
			      \});
			
			      it("doesn't show an input for the email", function() \{
			        expect(u.qInput(this.lock, 'email')).to.not.be.ok();
			      \});
			
			      it('shows an input for the vcode', function() \{
			        expect(u.qInput(this.lock, 'vcode')).to.be.ok();
			      \});
			
			      it("doesn't invoke the provided callback with the entered email", function() \{
			        expect(this.cb.called).to.not.be.ok();
			      \});
			    \});
			  \});
			
			  describe('unsuccessful attempt to submit an email', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'emailcode');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{
			        authParams: \{\},
			        callbackURL: undefined,
			        email: 'someone@auth0.com',
			        forceJSONP: undefined,
			        responseType: 'token',
			        send: 'code',
			        sso: true
			      \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function(done) \{
			        u.simulateStartPasswordlessResponse(\{ error: 'unknown' \});
			        setTimeout(done, 300);
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it('still shows an input for the email', function() \{
			        expect(u.qInput(this.lock, 'email')).to.be.ok();
			      \});
			
			      it("doesn't show an input for the vcode", function() \{
			        expect(u.qInput(this.lock, 'vcode')).to.not.be.ok();
			      \});
			
			      it("doesn't invoke the provided callback", function() \{
			        expect(this.cb.called).to.not.be.ok();
			      \});
			
			      it('shows a generic error', function() \{
			        const errorMessage = "We're sorry, something went wrong when sending the email";
			        expect(u.isSomethingWrong(this.lock, errorMessage)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('submitting an empty vcode', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'emailcode');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			      u.submit(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('waits until the vcode credential pane appears', function(done) \{
			      this.timeout(u.CRED_PANE_DELAY + 3000);
			      setTimeout(done, u.CRED_PANE_DELAY);
			    \});
			
			    it('marks the input as invalid', function() \{
			      expect(u.isInputInvalid(this.lock, 'vcode')).to.be.ok();
			    \});
			
			    it("doesn't perform any request", function() \{
			      expect(u.hasStartedPasswordless(false)).to.be.ok();
			      expect(u.isLoading(this.lock)).to.not.be.ok();
			    \});
			
			    describe('when filling the vcode', function() \{
			      before(function() \{
			        u.fillInput(this.lock, 'vcode', '1');
			      \});
			
			      it('clears the input error', function() \{
			        expect(u.isInputInvalid(this.lock, 'vcode')).to.not.be.ok();
			      \});
			
			      describe('and clearing the vcode', function() \{
			        before(function() \{
			          u.fillInput(this.lock, 'vcode', '');
			        \});
			
			        it("doesn't mark the input as invalid", function() \{
			          expect(u.isInputInvalid(this.lock, 'vcode')).to.not.be.ok();
			        \});
			      \});
			    \});
			  \});
			
			  describe('successfully submitting the vcode', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'emailcode');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('waits until the vcode credential pane appears', function(done) \{
			      this.timeout(u.CRED_PANE_DELAY + 3000);
			      setTimeout(done, u.CRED_PANE_DELAY);
			    \});
			
			    it('submits the vcode', function() \{
			      u.fillInput(this.lock, 'vcode', '1234');
			      u.submit(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('attempts to sign in with the entered cred', function() \{
			      expect(u.hasSignedInWith(\{ email: 'someone@auth0.com', passcode: '1234' \})).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        u.simulateSingInResponse();
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it.skip("doesn't show an input for the vcode", function() \{
			        expect(u.qInput(this.lock, 'vcode')).to.not.be.ok();
			      \});
			
			      it('invokes the provided callback', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        // TODO: "fake arg" is a detail implementation of the utils module, so
			        // it should be handled over there.
			        expect(this.cb.calledWithExactly(null, 'fake arg')).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('unsuccessful attempt to submit the vcode', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'emailcode');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('waits until the vcode credential pane appears', function(done) \{
			      this.timeout(u.CRED_PANE_DELAY + 3000);
			      setTimeout(done, u.CRED_PANE_DELAY);
			    \});
			
			    it('submits the vcode', function() \{
			      u.fillInput(this.lock, 'vcode', '1234');
			      u.submit(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('attempts to sign in with the entered cred', function() \{
			      expect(u.hasSignedInWith(\{ email: 'someone@auth0.com', passcode: '1234' \})).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function(done) \{
			        this.error = \{ error: 'invalid_user_password' \};
			        u.simulateSingInResponse(this.error);
			        setTimeout(done, 300);
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it('still shows an input for the vcode', function() \{
			        expect(u.qInput(this.lock, 'vcode')).to.be.ok();
			      \});
			
			      it("doesn't close the Lock", function() \{
			        expect(u.isOpened(this.lock)).to.be.ok();
			      \});
			
			      it('invokes the provided callback', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        expect(this.cb.calledWithExactly(this.error)).to.be.ok();
			      \});
			
			      it('shows the received error description', function() \{
			        expect(u.isSomethingWrong(this.lock, 'Wrong email or verification code')).to.be.ok();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\out-of-date\\passwordless\\emailcode.acceptance.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(43)
    });
    it('auth0_lock\\test\\out-of-date\\passwordless\\magiclink.acceptance.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as u from '../acceptance_test_utils';
			
			describe('.magiclink acceptance', function() \{
			  before(u.stubWebApis);
			  after(u.restoreWebApis);
			
			  describe('constructing a Lock', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			    \});
			
			    it("doesn't render a thing", function() \{
			      expect(u.isRendered(this.lock)).to.not.be.ok();
			    \});
			  \});
			
			  describe('opening a Lock', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it("doesn't open the Lock immediately", function() \{
			      u.openLock(this.lock, 'emailcode');
			
			      expect(u.isRendered(this.lock)).to.be.ok();
			      expect(u.isOpened(this.lock)).to.not.be.ok();
			    \});
			
			    it('opens it after a few ms', function(done) \{
			      setTimeout(() => \{
			        expect(u.isOpened(this.lock)).to.be.ok();
			        done();
			      \}, 17);
			    \});
			
			    it('displays an empty input for the email', function() \{
			      expect(u.qInputValue(this.lock, 'email')).to.be('');
			    \});
			  \});
			
			  describe('entering an invalid email', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      u.openLock(this.lock, 'magiclink');
			      u.fillInput(this.lock, 'email', 'invalid email');
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it("doesn't mark the input as invalid", function() \{
			      expect(u.isInputInvalid(this.lock, 'email')).to.not.be.ok();
			    \});
			
			    describe('when attempting a submit', function() \{
			      before(function() \{
			        u.submit(this.lock);
			      \});
			
			      it('marks the input as invalid', function() \{
			        expect(u.isInputInvalid(this.lock, 'email')).to.be.ok();
			      \});
			
			      it("doesn't perform any request", function() \{
			        expect(u.hasStartedPasswordless(false)).to.be.ok();
			        expect(u.isInputInvalid(this.lock, 'email')).to.be.ok();
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      describe('when fixing the email', function() \{
			        before(function() \{
			          u.fillInput(this.lock, 'email', 'someone@auth0.com');
			        \});
			
			        it('clears the input error', function() \{
			          expect(u.isInputInvalid(this.lock, 'email')).to.not.be.ok();
			        \});
			
			        describe('and entering an invalid email again', function() \{
			          before(function() \{
			            u.fillInput(this.lock, 'email', 'invalid email');
			          \});
			
			          it("doesn't mark the input as invalid", function() \{
			            expect(u.isInputInvalid(this.lock, 'email')).to.not.be.ok();
			          \});
			        \});
			      \});
			    \});
			  \});
			
			  describe('successfully submitting an email', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'magiclink');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{
			        authParams: \{\},
			        callbackURL: undefined,
			        email: 'someone@auth0.com',
			        forceJSONP: undefined,
			        responseType: 'token',
			        send: 'link',
			        sso: true
			      \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        u.simulateStartPasswordlessResponse();
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it.skip("doesn't show an input for the email", function() \{
			        expect(u.qInput(this.lock, 'email')).to.not.be.ok();
			      \});
			
			      it('shows a confirmation screen', function() \{
			        expect(u.isShowingConfirmation(this.lock)).to.be.ok();
			      \});
			
			      it('invokes the provided callback with the entered email', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        expect(this.cb.calledWithExactly(null, 'someone@auth0.com')).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('unsuccessful attempt to submit an email', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'magiclink');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{
			        authParams: \{\},
			        callbackURL: undefined,
			        email: 'someone@auth0.com',
			        forceJSONP: undefined,
			        responseType: 'token',
			        send: 'link',
			        sso: true
			      \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function(done) \{
			        this.error = \{ error: 'unknown' \};
			        u.simulateStartPasswordlessResponse(this.error);
			        setTimeout(done, 300);
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it('still shows an input for the email', function() \{
			        expect(u.qInput(this.lock, 'email')).to.be.ok();
			      \});
			
			      it("doesn't show a confirmation screen", function() \{
			        expect(u.isShowingConfirmation(this.lock)).to.not.be.ok();
			      \});
			
			      it('invokes the provided callback with the error', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        expect(this.cb.calledWithExactly(this.error)).to.be.ok();
			      \});
			
			      it('shows a generic error', function() \{
			        const errorMessage = "We're sorry, something went wrong when sending the email";
			        expect(u.isSomethingWrong(this.lock, errorMessage)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe.skip('successfully resending the email', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'magiclink');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			      this.cb.reset();
			      u.clickResendLink(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isResendingLink(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{
			        authParams: \{\},
			        email: 'someone@auth0.com',
			        send: 'link',
			        responseType: 'token',
			        callbackURL: undefined,
			        forceJSONP: undefined,
			        sso: true
			      \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        u.simulateStartPasswordlessResponse();
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isResendingLink(this.lock)).to.not.be.ok();
			      \});
			
			      it('informs the link has been successfully resent', function() \{
			        expect(u.hasLinkBeenResent(this.lock)).to.be.ok();
			      \});
			
			      it('invokes the provided callback with the entered email', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        expect(this.cb.calledWithExactly(null, 'someone@auth0.com')).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('unsuccessful attempt to resend a link', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'magiclink');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			      this.cb.reset();
			      u.clickResendLink(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isResendingLink(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{
			        authParams: \{\},
			        email: 'someone@auth0.com',
			        send: 'link',
			        responseType: 'token',
			        callbackURL: undefined,
			        forceJSONP: undefined,
			        sso: true
			      \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        this.error = \{\};
			        u.simulateStartPasswordlessResponse(this.error);
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isResendingLink(this.lock)).to.not.be.ok();
			      \});
			
			      it('informs something went wrong', function() \{
			        expect(u.hasResendingFailed(this.lock)).to.be.ok();
			      \});
			
			      it('allows to retry', function() \{
			        expect(u.isRetryAvailable(this.lock)).to.be.ok();
			      \});
			
			      it('invokes the provided callback with the error', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        expect(this.cb.calledWithExactly(this.error)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('successfully retrying to send a link', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'magiclink');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			      u.clickResendLink(this.lock);
			      u.simulateStartPasswordlessResponse(\{\});
			      this.cb.reset();
			      u.clickResendLink(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isResendingLink(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{
			        authParams: \{\},
			        email: 'someone@auth0.com',
			        send: 'link',
			        responseType: 'token',
			        callbackURL: undefined,
			        forceJSONP: undefined,
			        sso: true
			      \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        u.simulateStartPasswordlessResponse();
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isResendingLink(this.lock)).to.not.be.ok();
			      \});
			
			      it('informs the link has been successfully resent', function() \{
			        expect(u.hasLinkBeenResent(this.lock)).to.be.ok();
			      \});
			
			      it('invokes the provided callback with the entered email', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        expect(this.cb.calledWithExactly(null, 'someone@auth0.com')).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('unsuccessful attempt to retry to send a link', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'magiclink');
			      u.fillInput(this.lock, 'email', 'someone@auth0.com');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			      u.clickResendLink(this.lock);
			      u.simulateStartPasswordlessResponse(\{\});
			      this.cb.reset();
			      u.clickResendLink(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isResendingLink(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{
			        authParams: \{\},
			        email: 'someone@auth0.com',
			        send: 'link',
			        responseType: 'token',
			        callbackURL: undefined,
			        forceJSONP: undefined,
			        sso: true
			      \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        this.error = \{\};
			        u.simulateStartPasswordlessResponse(this.error);
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isResendingLink(this.lock)).to.not.be.ok();
			      \});
			
			      it('informs something went wrong', function() \{
			        expect(u.hasResendingFailed(this.lock)).to.be.ok();
			      \});
			
			      it('allows to retry', function() \{
			        expect(u.isRetryAvailable(this.lock)).to.be.ok();
			      \});
			
			      it('invokes the provided callback with the error', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        expect(this.cb.calledWithExactly(this.error)).to.be.ok();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\out-of-date\\passwordless\\magiclink.acceptance.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(43)
    });
    it('auth0_lock\\test\\out-of-date\\passwordless\\sms.acceptance.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as u from '../acceptance_test_utils';
			import * as cc from '../../src/field/country_codes';
			
			describe('.sms acceptance', function() \{
			  before(u.stubWebApis);
			  after(u.restoreWebApis);
			
			  describe('constructing a Lock', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			    \});
			
			    it("doesn't render a thing", function() \{
			      expect(u.isRendered(this.lock)).to.not.be.ok();
			    \});
			  \});
			
			  describe('opening a Lock', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it("doesn't open the Lock immediately", function() \{
			      u.openLock(this.lock, 'sms');
			
			      expect(u.isRendered(this.lock)).to.be.ok();
			      expect(u.isOpened(this.lock)).to.not.be.ok();
			    \});
			
			    it('opens it after a few ms', function(done) \{
			      setTimeout(() => \{
			        expect(u.isOpened(this.lock)).to.be.ok();
			        done();
			      \}, 17);
			    \});
			
			    it('displays an empty input for the phone number', function() \{
			      expect(u.qInputValue(this.lock, 'phone-number')).to.be('');
			    \});
			
			    it('displays an input with for the location with a default value', function() \{
			      expect(u.qInputValue(this.lock, 'location')).to.be('+1 United States');
			    \});
			  \});
			
			  describe('opening the location selector', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      u.openLock(this.lock, 'sms');
			    \});
			
			    after(function() \{
			      u.clickFirstLocation(this.lock); // necessary for the close button to show up
			      u.closeLock(this.lock);
			    \});
			
			    describe('when clicking the location input', function() \{
			      before(function() \{
			        u.clickInput(this.lock, 'location');
			      \});
			
			      it('shows the location selector', function() \{
			        expect(u.isShowingLocationSelector(this.lock)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('filtering locations', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      u.openLock(this.lock, 'sms');
			      u.clickInput(this.lock, 'location');
			    \});
			
			    after(function() \{
			      u.clickFirstLocation(this.lock); // necessary for the close button to show up
			      u.closeLock(this.lock);
			    \});
			
			    it('shows all locations available by default', function() \{
			      expect(u.qLocations(this.lock).length).to.be(cc.countryCodes.size);
			    \});
			
			    describe('when entering an unexistent location name', function() \{
			      before(function() \{
			        u.filterLocations(this.lock, 'nowhere');
			      \});
			
			      it("doesn't show any locations", function() \{
			        expect(u.qLocations(this.lock).length).to.be(0);
			      \});
			    \});
			
			    describe('when entering a few letters that match a few locations', function() \{
			      before(function() \{
			        u.filterLocations(this.lock, 'united');
			      \});
			
			      it('shows that locations', function() \{
			        expect(u.qLocations(this.lock).length).to.be.within(2, 10);
			      \});
			    \});
			
			    describe('when entering an exact location name', function() \{
			      before(function() \{
			        u.filterLocations(this.lock, 'spain');
			      \});
			
			      it('shows only that location', function() \{
			        expect(u.qLocations(this.lock).length).to.be(1);
			      \});
			    \});
			  \});
			
			  describe.skip('selecting a location', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      u.openLock(this.lock, 'sms');
			      u.clickInput(this.lock, 'location');
			      u.filterLocations(this.lock, 'spain');
			      u.clickFirstLocation(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('closes the location selector', function(done) \{
			      // NOTE: to tell whether or not the location selector has been closed, we
			      // need to wait for the enter transition to finish.
			      setTimeout(() => \{
			        expect(u.isShowingLocationSelector(this.lock)).to.not.be.ok();
			        done();
			      \}, u.AUXILIARY_PANE_DELAY);
			    \});
			
			    it('updates the location input', function() \{
			      expect(u.qInputValue(this.lock, 'location')).to.be('Spain +34');
			    \});
			
			    describe('when submiting', function() \{
			      before(function() \{
			        u.fillInput(this.lock, 'phone-number', '0303456');
			        u.submit(this.lock);
			      \});
			
			      it('starts the passwordless flow with the given location', function() \{
			        const params = \{ phoneNumber: '+340303456' \};
			        expect(u.hasStartedPasswordless(params)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('entering an invalid phone number', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      u.openLock(this.lock, 'sms');
			      u.fillInput(this.lock, 'phone-number', 'invalid number');
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it("doesn't mark the input as invalid", function() \{
			      expect(u.isInputInvalid(this.lock, 'phone-number')).to.not.be.ok();
			    \});
			
			    describe('when attempting a submit', function() \{
			      before(function() \{
			        u.submit(this.lock);
			      \});
			
			      it('marks the input as invalid', function() \{
			        expect(u.isInputInvalid(this.lock, 'phone-number')).to.be.ok();
			      \});
			
			      it("doesn't perform any request", function() \{
			        expect(u.hasStartedPasswordless(false)).to.be.ok();
			        expect(u.isInputInvalid(this.lock, 'phone-number')).to.be.ok();
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      describe('when fixing the phone number', function() \{
			        before(function() \{
			          u.fillInput(this.lock, 'phone-number', '0303456');
			        \});
			
			        it('clears the input error', function() \{
			          expect(u.isInputInvalid(this.lock, 'phone-number')).to.not.be.ok();
			        \});
			
			        describe('and entering an invalid phone number again', function() \{
			          before(function() \{
			            u.fillInput(this.lock, 'phone-number', 'invalid number');
			          \});
			
			          it("doesn't mark the input as invalid", function() \{
			            expect(u.isInputInvalid(this.lock, 'phone-number')).to.not.be.ok();
			          \});
			        \});
			      \});
			    \});
			  \});
			
			  describe('successfully submitting a phone number', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'sms');
			      u.fillInput(this.lock, 'phone-number', '0303456');
			      u.submit(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{ phoneNumber: '+10303456' \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        u.simulateStartPasswordlessResponse();
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it('waits until the vcode credential pane appears', function(done) \{
			        this.timeout(u.CRED_PANE_DELAY + 3000);
			        setTimeout(done, u.CRED_PANE_DELAY);
			      \});
			
			      it("doesn't show an input for the phone number", function() \{
			        expect(u.qInput(this.lock, 'phone-number')).to.not.be.ok();
			      \});
			
			      it('shows an input for the vcode', function() \{
			        expect(u.qInput(this.lock, 'vcode')).to.be.ok();
			      \});
			
			      it("doesn't invoke the provided callback", function() \{
			        expect(this.cb.called).to.not.be.ok();
			      \});
			    \});
			  \});
			
			  describe('unsuccessful attempt to submit a phone number', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'sms');
			      u.fillInput(this.lock, 'phone-number', '0303456');
			      u.submit(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('starts the passwordless flow', function() \{
			      const params = \{ phoneNumber: '+10303456' \};
			      expect(u.hasStartedPasswordless(params)).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function(done) \{
			        u.simulateStartPasswordlessResponse(\{ error: 'unknown' \});
			        setTimeout(done, 300);
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it('still shows an input for the phone number', function() \{
			        expect(u.qInput(this.lock, 'phone-number')).to.be.ok();
			      \});
			
			      it("doesn't show an input for the vcode", function() \{
			        expect(u.qInput(this.lock, 'vcode')).to.not.be.ok();
			      \});
			
			      it("doesn't invoke the provided callback", function() \{
			        expect(this.cb.called).to.not.be.ok();
			      \});
			
			      it('shows a generic error', function() \{
			        const errorMessage = "We're sorry, something went wrong when sending the SMS";
			        expect(u.isSomethingWrong(this.lock, errorMessage)).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('submitting an empty vcode', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'sms');
			      u.fillInput(this.lock, 'phone-number', '123456');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			      u.submit(this.lock);
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('waits until the vcode credential pane appears', function(done) \{
			      this.timeout(u.CRED_PANE_DELAY + 3000);
			      setTimeout(done, u.CRED_PANE_DELAY);
			    \});
			
			    it('marks the input as invalid', function() \{
			      expect(u.isInputInvalid(this.lock, 'vcode')).to.be.ok();
			    \});
			
			    it("doesn't perform any request", function() \{
			      expect(u.hasStartedPasswordless(false)).to.be.ok();
			      expect(u.isLoading(this.lock)).to.not.be.ok();
			    \});
			
			    describe('when filling the vcode', function() \{
			      before(function() \{
			        u.fillInput(this.lock, 'vcode', '1');
			      \});
			
			      it('clears the input error', function() \{
			        expect(u.isInputInvalid(this.lock, 'vcode')).to.not.be.ok();
			      \});
			
			      describe('and clearing the vcode', function() \{
			        before(function() \{
			          u.fillInput(this.lock, 'vcode', '');
			        \});
			
			        it("doesn't mark the input as invalid", function() \{
			          expect(u.isInputInvalid(this.lock, 'vcode')).to.not.be.ok();
			        \});
			      \});
			    \});
			  \});
			
			  describe('successfully submitting the vcode', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'sms');
			      u.fillInput(this.lock, 'phone-number', '0303456');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('waits until the vcode credential pane appears', function(done) \{
			      this.timeout(u.CRED_PANE_DELAY + 3000);
			      setTimeout(done, u.CRED_PANE_DELAY);
			    \});
			
			    it('submits the vcode', function() \{
			      u.fillInput(this.lock, 'vcode', '1234');
			      u.submit(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('attempts to sign in with the entered cred', function() \{
			      expect(u.hasSignedInWith(\{ phoneNumber: '+10303456', passcode: '1234' \})).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function() \{
			        u.simulateSingInResponse();
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it.skip("doesn't show an input for the vcode", function() \{
			        expect(u.qInput(this.lock, 'vcode')).to.not.be.ok();
			      \});
			
			      it('invokes the provided callback', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        // TODO: "fake arg" is a detail implementation of the utils module, so
			        // it should be handled over there.
			        expect(this.cb.calledWithExactly(null, 'fake arg')).to.be.ok();
			      \});
			    \});
			  \});
			
			  describe('unsuccessful attempt to submit the vcode', function() \{
			    before(function() \{
			      this.lock = u.constructLock();
			      this.cb = u.openLock(this.lock, 'sms');
			      u.fillInput(this.lock, 'phone-number', '0303456');
			      u.submit(this.lock);
			      u.simulateStartPasswordlessResponse();
			    \});
			
			    after(function() \{
			      u.closeLock(this.lock);
			    \});
			
			    it('waits until the vcode credential pane appears', function(done) \{
			      this.timeout(u.CRED_PANE_DELAY + 3000);
			      setTimeout(done, u.CRED_PANE_DELAY);
			    \});
			
			    it('submits the vcode', function() \{
			      u.fillInput(this.lock, 'vcode', '1234');
			      u.submit(this.lock);
			    \});
			
			    it('shows a loading indicator until a response is obtained', function() \{
			      expect(u.isLoading(this.lock)).to.be.ok();
			    \});
			
			    it('attempts to sign in with the entered cred', function() \{
			      expect(u.hasSignedInWith(\{ phoneNumber: '+10303456', passcode: '1234' \})).to.be.ok();
			    \});
			
			    describe('when response arrives', function() \{
			      before(function(done) \{
			        this.error = \{ error: 'invalid_user_password' \};
			        u.simulateSingInResponse(this.error);
			        setTimeout(done, 300);
			      \});
			
			      it('hides the loading indicator', function() \{
			        expect(u.isLoading(this.lock)).to.not.be.ok();
			      \});
			
			      it('still shows an input for the vcode', function() \{
			        expect(u.qInput(this.lock, 'vcode')).to.be.ok();
			      \});
			
			      it("doesn't close the Lock", function() \{
			        expect(u.isOpened(this.lock)).to.be.ok();
			      \});
			
			      it('invokes the provided callback', function() \{
			        expect(this.cb.calledOnce).to.be.ok();
			        expect(this.cb.calledWithExactly(this.error)).to.be.ok();
			      \});
			
			      it('shows the received error description', function() \{
			        expect(u.isSomethingWrong(this.lock, 'Wrong phone number or verification code')).to.be.ok();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\out-of-date\\passwordless\\sms.acceptance.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(52)
    });
    it('auth0_lock\\test\\override_options.test.js', () => {
        const sourceCode = `
			'use strict';
			import \{ stub \} from 'sinon';
			
			import expect from 'expect.js';
			import Immutable from 'immutable';
			
			import \{ overrideOptions \} from '../src/core/index';
			import * as i18n from '../src/i18n';
			
			describe('Override state with options on show', () => \{
			  before(function() \{
			    stub(i18n, 'initI18n', m => \{
			      return m;
			    \});
			  \});
			
			  after(function() \{
			    i18n.initI18n.restore();
			  \});
			
			  it('should merge and warn missing keys', () => \{
			    var m = Immutable.fromJS(\{\});
			
			    var new_options = \{
			      allowedConnections: 'facebook',
			      languageDictionary: \{
			        title: 'new_title'
			      \},
			      flashMessage: \{
			        type: 'success',
			        text: 'test'
			      \},
			      auth: \{
			        params: \{
			          state: '1234'
			        \}
			      \},
			      language: 'es',
			      theme: \{
			        primaryColor: 'red',
			        logo: 'http://test.com/logo.png'
			      \}
			    \};
			
			    m = overrideOptions(m, new_options);
			
			    expect(m.toJS()).to.eql(\{
			      core: \{
			        transient: \{
			          globalSuccess: 'test',
			          allowedConnections: 'facebook',
			          ui: \{
			            primaryColor: 'red',
			            logo: 'http://test.com/logo.png',
			            language: 'es',
			            dict: \{
			              title: 'new_title'
			            \}
			          \},
			          authParams: \{
			            state: '1234'
			          \}
			        \}
			      \}
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\override_options.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\test\\regression.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import webApi from '../src/core/web_api';
			import * as h from './helper/ui';
			
			describe('regression', function() \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  beforeEach(function(done) \{
			    const opts = \{
			      rememberLastLogin: false
			    \};
			
			    this.lock = h.displayLock('all', opts, done);
			  \});
			
			  afterEach(function() \{
			    this.lock.hide();
			  \});
			
			  it('does not attempt to log in with an empty email input', function() \{
			    h.fillEmailInput(this.lock, 'test@test.te');
			    h.fillEmailInput(this.lock, '');
			    h.fillPasswordInput(this.lock, 'anypass');
			
			    h.submit(this.lock);
			
			    expect(webApi.logIn.callCount).to.equal(0);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\regression.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\test\\show_with_flash_message.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import Auth0Lock from '../src/index';
			import * as h from './helper/ui';
			
			describe('show lock with flash message', function () \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe('with invalid options', function () \{
			    beforeEach(function (done) \{
			      this.lock = new Auth0Lock('cid', 'domain');
			      done();
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('should fail if type is not provided', function (done) \{
			      this.lock.on('unrecoverable_error', function (err) \{
			        done();
			      \});
			
			      this.lock.show(\{
			        flashMessage: \{
			          text: 'error'
			        \}
			      \});
			    \});
			
			    it('should fail if type value is not valid', function (done) \{
			      this.lock.on('unrecoverable_error', function (err) \{
			        done();
			      \});
			
			      this.lock.show(\{
			        flashMessage: \{
			          type: 'not-valid',
			          text: 'error'
			        \}
			      \});
			    \});
			
			    it('should fail if text is not provided', function (done) \{
			      this.lock.on('unrecoverable_error', function (err) \{
			        done();
			      \});
			
			      this.lock.show(\{
			        flashMessage: \{
			          type: 'error'
			        \}
			      \});
			    \});
			  \});
			
			  describe('with valid options', function () \{
			    it('should show an error flash message', function (done) \{
			      const lock = new Auth0Lock('cid', 'domain');
			
			      lock.on('show', () => \{
			        h.waitUntilErrorExists(lock, () => \{
			          const hasErrorMessage = h.hasErrorMessage(lock, 'error message');
			          expect(hasErrorMessage).to.be.ok();
			          lock.hide();
			          done();
			        \});
			      \});
			
			      lock.show(\{
			        flashMessage: \{
			          type: 'error',
			          text: 'error message'
			        \}
			      \});
			    \});
			
			    it('should show a success flash message', function (done) \{
			      const lock = new Auth0Lock('cid', 'domain');
			
			      lock.on('show', () => \{
			        h.waitUntilSuccessFlashExists(lock, () => \{
			          var hasSuccessMessage = h.hasSuccessMessage(lock, 'success message');
			          expect(hasSuccessMessage).to.be.ok();
			          lock.hide();
			          done();
			        \});
			      \});
			
			      lock.show(\{
			        flashMessage: \{
			          type: 'success',
			          text: 'success message'
			        \}
			      \});
			    \});
			
			    it('should show an info flash message', function (done) \{
			      const lock = new Auth0Lock('cid', 'domain');
			
			      lock.on('show', () => \{
			        h.waitUntilInfoFlashExists(lock, () => \{
			          var hasInfoMessage = h.hasInfoMessage(lock, 'an info message');
			          expect(hasInfoMessage).to.be.ok();
			          lock.hide();
			          done();
			        \});
			      \});
			
			      lock.show(\{
			        flashMessage: \{
			          type: 'info',
			          text: 'an info message'
			        \}
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\show_with_flash_message.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('auth0_lock\\test\\sign_up_terms_agreement.ui.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as h from './helper/ui';
			
			describe('sign up terms agreement', function () \{
			  before(h.stubWebApis);
			  after(h.restoreWebApis);
			
			  describe('without a mustAcceptTerms opt', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        initialScreen: 'signUp',
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('should not ask the user to accept terms', function () \{
			      expect(h.hasSubmitButton(this.lock)).to.be.ok();
			      expect(h.isSubmitButtonDisabled(this.lock)).to.not.be.ok();
			      expect(h.hasTermsCheckbox(this.lock)).to.not.be.ok();
			    \});
			  \});
			
			  describe('with a mustAcceptTerms opt', function () \{
			    beforeEach(function (done) \{
			      const opts = \{
			        initialScreen: 'signUp',
			        mustAcceptTerms: true,
			        rememberLastLogin: false
			      \};
			
			      this.lock = h.displayLock('single database', opts, done);
			    \});
			
			    afterEach(function () \{
			      this.lock.hide();
			    \});
			
			    it('asks the user to accept terms before sumbitting', function () \{
			      expect(h.isSubmitButtonDisabled(this.lock)).to.be.ok();
			      expect(h.hasTermsCheckbox(this.lock)).to.be.ok();
			    \});
			
			    describe('when the terms are accepted', function () \{
			      beforeEach(function () \{
			        h.clickTermsCheckbox(this.lock);
			      \});
			
			      it('lets the user sign up', function (done) \{
			        expect(h.hasTermsCheckbox(this.lock)).to.be.ok();
			        expect(h.hasSubmitButton(this.lock)).to.be.ok();
			
			        h.waitUntilExists(
			          this.lock,
			          'button.auth0-lock-submit',
			          () => \{
			            expect(h.isSubmitButtonDisabled(this.lock)).to.not.be.ok();
			            done();
			          \},
			          10000
			        );
			      \});
			
			      describe('and then rejected', function () \{
			        beforeEach(function () \{
			          h.clickTermsCheckbox(this.lock);
			        \});
			
			        it('lets the user sign up', function () \{
			          expect(h.hasTermsCheckbox(this.lock)).to.be.ok();
			          expect(h.isSubmitButtonDisabled(this.lock)).to.be.ok();
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\sign_up_terms_agreement.ui.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('auth0_lock\\test\\social_login.test.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as h from './helper/ui';
			
			describe('show lock connection scopes', function() \{
			  beforeEach(function(done) \{
			    h.stubWebApis();
			    const opts = \{
			      auth: \{
			        connectionScopes: \{
			          facebook: ['scope_1', 'scope_2']
			        \}
			      \}
			    \};
			    this.lock = h.displayLock('multiple social', opts, done);
			  \});
			
			  afterEach(function() \{
			    this.lock.hide();
			    h.restoreWebApis();
			  \});
			
			  it('should redirect to /authorize for social login using Facebook', function(done) \{
			    h.assertAuthorizeRedirection((lockID, options, authParams) => \{
			      expect(options).to.be.an('object');
			      expect(options.connection).to.be('facebook');
			      expect(options.connection_scope).to.be.an('array');
			      expect(options.connection_scope).to.have.length(2);
			      expect(options.connection_scope).to.contain('scope_1');
			      expect(options.connection_scope).to.contain('scope_2');
			      done();
			    \});
			
			    h.waitUntilExists(this.lock, '.auth0-lock-social-button', () =>
			      h.clickSocialConnectionButton(this.lock, 'facebook')
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\social_login.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('auth0_lock\\test\\utils\\id_utils.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import * as idu from '../../src/utils/id_utils';
			import \{ Set \} from 'immutable';
			
			describe('building a set of random ids', function() \{
			  const count = 10;
			  let subject;
			
			  before(function() \{
			    subject = new Set();
			    for (let i = 0; i < 10; i++) \{
			      subject = subject.add(idu.random());
			    \}
			  \});
			
			  it('is always a string', function() \{
			    expect(subject.every(x => typeof x === 'string')).to.be(true);
			  \});
			
			  it('always contains only lowercase letters and numbers', function() \{
			    expect(subject.every(x => /[a-z0-9]+/.test(x))).to.be(true);
			  \});
			
			  it('returns a new value every time', function() \{
			    expect(subject.size).to.be(10);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\utils\\id_utils.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('auth0_lock\\test\\utils\\string_utils.js', () => {
        const sourceCode = `
			import expect from 'expect.js';
			import \{ matches \} from '../../src/utils/string_utils';
			
			describe('matching a string', function() \{
			  it('returns true for a substring, regardless of its capitalization', function() \{
			    expect(matches('Abc', 'aBcd')).to.be(true);
			    expect(matches('abC', 'zAbc')).to.be(true);
			    expect(matches('ABc', 'aBCz')).to.be(true);
			    expect(matches('abcd', 'abc')).to.be(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'auth0_lock\\test\\utils\\string_utils.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
});
