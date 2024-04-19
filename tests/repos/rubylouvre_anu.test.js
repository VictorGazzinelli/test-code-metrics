const { extractFromSource } = require('../../src/extractor');

describe('rubylouvre_anu', () => {
    it('rubylouvre_anu\\packages\\core\\__tests__\\createReactClassIntegration-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let PropTypes;
			let React;
			let ReactDOM;
			let ReactTestUtils;
			let createReactClass;
			
			describe('create-react-class-integration', () => \{
			    beforeEach(() => \{
			        jest.resetModules();
			        PropTypes = require('prop-types');
			        React = require('react');
			        ReactDOM = require('react-dom');
			        ReactTestUtils = require('test-utils');
			        createReactClass = require("create-react-class")
			    \});
			
			    it('should throw when \`render\` is not specified', () => \{
			        expect(function () \{
			            createReactClass(\{\});
			        \}).toThrowError(
			            'createClass(...): Class specification must implement a \`render\` method.',
			        );
			    \});
			
			    it('should copy prop types onto the Constructor', () => \{
			        const propValidator = jest.fn();
			        const TestComponent = createReactClass(\{
			            propTypes: \{
			                value: propValidator,
			            \},
			            render: function () \{
			                return <div />;
			            \},
			        \});
			
			        expect(TestComponent.propTypes).toBeDefined();
			        expect(TestComponent.propTypes.value).toBe(propValidator);
			    \});
			
			    it('should warn on invalid prop types', () => \{
			        return 
			        expect(() =>
			            createReactClass(\{
			                displayName: 'Component',
			                propTypes: \{
			                    prop: null,
			                \},
			                render: function () \{
			                    return <span>\{this.props.prop\}</span>;
			                \},
			            \}),
			        ).toWarnDev(
			            'Warning: Component: prop type \`prop\` is invalid; ' +
			            'it must be a function, usually from React.PropTypes.',
			        );
			    \});
			
			    it('should warn on invalid context types', () => \{
			        return
			        expect(() =>
			            createReactClass(\{
			                displayName: 'Component',
			                contextTypes: \{
			                    prop: null,
			                \},
			                render: function () \{
			                    return <span>\{this.props.prop\}</span>;
			                \},
			            \}),
			        ).toWarnDev(
			            'Warning: Component: context type \`prop\` is invalid; ' +
			            'it must be a function, usually from React.PropTypes.',
			        );
			    \});
			
			    it('should throw on invalid child context types', () => \{
			        return
			        expect(() =>
			            createReactClass(\{
			                displayName: 'Component',
			                childContextTypes: \{
			                    prop: null,
			                \},
			                render: function () \{
			                    return <span>\{this.props.prop\}</span>;
			                \},
			            \}),
			        ).toWarnDev(
			            'Warning: Component: child context type \`prop\` is invalid; ' +
			            'it must be a function, usually from React.PropTypes.',
			        );
			    \});
			
			    it('should warn when misspelling shouldComponentUpdate', () => \{
			        return
			        expect(() =>
			            createReactClass(\{
			                componentShouldUpdate: function () \{
			                    return false;
			                \},
			                render: function () \{
			                    return <div />;
			                \},
			            \}),
			        ).toWarnDev(
			            'Warning: A component has a method called componentShouldUpdate(). Did you ' +
			            'mean shouldComponentUpdate()? The name is phrased as a question ' +
			            'because the function is expected to return a value.',
			        );
			
			        expect(() =>
			            createReactClass(\{
			                displayName: 'NamedComponent',
			                componentShouldUpdate: function () \{
			                    return false;
			                \},
			                render: function () \{
			                    return <div />;
			                \},
			            \}),
			        ).toWarnDev(
			            'Warning: NamedComponent has a method called componentShouldUpdate(). Did you ' +
			            'mean shouldComponentUpdate()? The name is phrased as a question ' +
			            'because the function is expected to return a value.',
			        );
			    \});
			
			    it('should warn when misspelling componentWillReceiveProps', () => \{
			        return
			        expect(() =>
			            createReactClass(\{
			                componentWillRecieveProps: function () \{
			                    return false;
			                \},
			                render: function () \{
			                    return <div />;
			                \},
			            \}),
			        ).toWarnDev(
			            'Warning: A component has a method called componentWillRecieveProps(). Did you ' +
			            'mean componentWillReceiveProps()?',
			        );
			    \});
			
			    it('should warn when misspelling UNSAFE_componentWillReceiveProps', () => \{
			        return
			        expect(() =>
			            createReactClass(\{
			                UNSAFE_componentWillRecieveProps: function () \{
			                    return false;
			                \},
			                render: function () \{
			                    return <div />;
			                \},
			            \}),
			        ).toWarnDev(
			            'Warning: A component has a method called UNSAFE_componentWillRecieveProps(). ' +
			            'Did you mean UNSAFE_componentWillReceiveProps()?',
			        );
			    \});
			
			    it('should throw if a reserved property is in statics', () => \{
			        expect(function () \{
			            createReactClass(\{
			                statics: \{
			                    getDefaultProps: function () \{
			                        return \{
			                            foo: 0,
			                        \};
			                    \},
			                \},
			
			                render: function () \{
			                    return <span />;
			                \},
			            \});
			        \}).toThrowError(
			            'getDefaultProps is not statics',
			        );
			    \});
			
			    // TODO: Consider actually moving these to statics or drop this unit test.
			    xit('should warn when using deprecated non-static spec keys', () => \{
			        expect(() =>
			            createReactClass(\{
			                mixins: [\{\}],
			                propTypes: \{
			                    foo: PropTypes.string,
			                \},
			                contextTypes: \{
			                    foo: PropTypes.string,
			                \},
			                childContextTypes: \{
			                    foo: PropTypes.string,
			                \},
			                render: function () \{
			                    return <div />;
			                \},
			            \}),
			        ).toWarnDev([
			            'createClass(...): \`mixins\` is now a static property and should ' +
			            'be defined inside "statics".',
			            'createClass(...): \`propTypes\` is now a static property and should ' +
			            'be defined inside "statics".',
			            'createClass(...): \`contextTypes\` is now a static property and ' +
			            'should be defined inside "statics".',
			            'createClass(...): \`childContextTypes\` is now a static property and ' +
			            'should be defined inside "statics".',
			        ]);
			    \});
			
			    it('should support statics', () => \{
			        const Component = createReactClass(\{
			            statics: \{
			                abc: 'def',
			                def: 0,
			                ghi: null,
			                jkl: 'mno',
			                pqr: function () \{
			                    return this;
			                \},
			            \},
			
			            render: function () \{
			                return <span />;
			            \},
			        \});
			        let instance = <Component />;
			        instance = ReactTestUtils.renderIntoDocument(instance);
			        expect(instance.constructor.abc).toBe('def');
			        expect(Component.abc).toBe('def');
			        expect(instance.constructor.def).toBe(0);
			        expect(Component.def).toBe(0);
			        expect(instance.constructor.ghi).toBe(null);
			        expect(Component.ghi).toBe(null);
			        expect(instance.constructor.jkl).toBe('mno');
			        expect(Component.jkl).toBe('mno');
			        expect(instance.constructor.pqr()).toBe(Component);
			        expect(Component.pqr()).toBe(Component);
			    \});
			
			    it('should work with object getInitialState() return values', () => \{
			        const Component = createReactClass(\{
			            getInitialState: function () \{
			                return \{
			                    occupation: 'clown',
			                \};
			            \},
			            render: function () \{
			                return <span />;
			            \},
			        \});
			        let instance = <Component />;
			        instance = ReactTestUtils.renderIntoDocument(instance);
			        expect(instance.state.occupation).toEqual('clown');
			    \});
			
			    it('should work with getDerivedStateFromProps() return values', () => \{
			        const Component = createReactClass(\{
			            getInitialState() \{
			                return \{\};
			            \},
			            render: function () \{
			                return <span />;
			            \},
			        \});
			        Component.getDerivedStateFromProps = () => \{
			            return \{ occupation: 'clown' \};
			        \};
			        let instance = <Component />;
			        instance = ReactTestUtils.renderIntoDocument(instance);
			        expect(instance.state.occupation).toEqual('clown');
			    \});
			
			    it('renders based on context getInitialState', () => \{
			        const Foo = createReactClass(\{
			            contextTypes: \{
			                className: PropTypes.string,
			            \},
			            getInitialState() \{
			                return \{ className: this.context.className \};
			            \},
			            render() \{
			                return <span className=\{this.state.className\} />;
			            \},
			        \});
			
			        const Outer = createReactClass(\{
			            childContextTypes: \{
			                className: PropTypes.string,
			            \},
			            getChildContext() \{
			                return \{ className: 'foo' \};
			            \},
			            render() \{
			                return <Foo />;
			            \},
			        \});
			
			        const container = document.createElement('div');
			        ReactDOM.render(<Outer />, container);
			        expect(container.firstChild.className).toBe('foo');
			    \});
			
			    it('should throw with non-object getInitialState() return values', () => \{
			        [['an array'], 'a string', 1234].forEach(function (state) \{
			            const Component = createReactClass(\{
			                getInitialState: function () \{
			                    return state;
			                \},
			                render: function () \{
			                    return <span />;
			                \},
			            \});
			            let instance = <Component />;
			            expect(function () \{
			                instance = ReactTestUtils.renderIntoDocument(instance);
			            \}).toThrowError(
			                'Component.getInitialState(): must return an object or null',
			            );
			        \});
			    \});
			
			    it('should work with a null getInitialState() return value', () => \{
			        const Component = createReactClass(\{
			            getInitialState: function () \{
			                return null;
			            \},
			            render: function () \{
			                return <span />;
			            \},
			        \});
			        expect(() =>
			            ReactTestUtils.renderIntoDocument(<Component />),
			        ).not.toThrow();
			    \});
			
			    it('should throw when using legacy factories', () => \{
			        
			        const Component = createReactClass(\{
			            render() \{
			                return <div />;
			            \},
			        \});
			        expect(() => expect(() => Component()).toThrow()).toWarnDev(
			            'Warning: Something is calling a React component directly. Use a ' +
			            'factory or JSX instead. See: https://fb.me/react-legacyfactory',
			        );
			    \});
			
			    it('replaceState and callback works', () => \{
			         //不实现
			        const ops = [];
			        const Component = createReactClass(\{
			            getInitialState() \{
			                return \{ step: 0 \};
			            \},
			            render() \{
			                ops.push('Render: ' + this.state.step);
			                return <div />;
			            \},
			        \});
			
			        const instance = ReactTestUtils.renderIntoDocument(<Component />);
			        expect(() => \{
			            instance.replaceState(\{ step: 1 \}, () => \{
			                ops.push('Callback: ' + instance.state.step);
			            \});
			        \}).toThrow("replaceState is deprecated")
			    \});
			
			    it('getDerivedStateFromProps updates state when props change', () => \{
			        const Component = createReactClass(\{
			            getInitialState() \{
			                return \{
			                    count: 1,
			                \};
			            \},
			            render() \{
			                return <div>count:\{this.state.count\}</div>;
			            \},
			        \});
			        Component.getDerivedStateFromProps = (nextProps, prevState) => (\{
			            count: prevState.count + nextProps.incrementBy,
			        \});
			
			        const container = document.createElement('div');
			        const instance = ReactDOM.render(
			            <div>
			                <Component incrementBy=\{0\} />
			            </div>,
			            container,
			        );
			        expect(instance.textContent).toEqual('count:1');
			        ReactDOM.render(
			            <div>
			                <Component incrementBy=\{2\} />
			            </div>,
			            container,
			        );
			        expect(instance.textContent).toEqual('count:3');
			    \});
			
			    it('should support the new static getDerivedStateFromProps method', () => \{
			        let instance;
			        const Component = createReactClass(\{
			            statics: \{
			                getDerivedStateFromProps: function () \{
			                    return \{ foo: 'bar' \};
			                \},
			            \},
			
			            getInitialState() \{
			                return \{\};
			            \},
			
			            render: function () \{
			                instance = this;
			                return null;
			            \},
			        \});
			        ReactDOM.render(<Component />, document.createElement('div'));
			        expect(instance.state.foo).toBe('bar');
			    \});
			
			    it('warns if getDerivedStateFromProps is not static', () => \{
			        const Foo = createReactClass(\{
			            getDerivedStateFromProps() \{
			                return \{\};
			            \},
			            render() \{
			                return <div />;
			            \},
			        \});
			        expect(() =>
			            ReactDOM.render(<Foo foo="foo" />, document.createElement('div')),
			        ).toWarnDev(
			            'Component: getDerivedStateFromProps() is defined as an instance method ' +
			            'and will be ignored. Instead, declare it as a static method.',
			        );
			    \});
			
			    it('warns if getDerivedStateFromCatch is not static', () => \{
			        const Foo = createReactClass(\{
			            getDerivedStateFromCatch() \{
			                return \{\};
			            \},
			            render() \{
			                return <div />;
			            \},
			        \});
			        expect(() =>
			            ReactDOM.render(<Foo foo="foo" />, document.createElement('div')),
			        ).toWarnDev(
			            'Component: getDerivedStateFromCatch() is defined as an instance method ' +
			            'and will be ignored. Instead, declare it as a static method.',
			        );
			    \});
			
			    it('warns if getSnapshotBeforeUpdate is static', () => \{
			        const Foo = createReactClass(\{
			            statics: \{
			                getSnapshotBeforeUpdate: function () \{
			                    return null;
			                \},
			            \},
			            render() \{
			                return <div />;
			            \},
			        \});
			        expect(() =>
			            ReactDOM.render(<Foo foo="foo" />, document.createElement('div')),
			        ).toWarnDev(
			            'Component: getSnapshotBeforeUpdate() is defined as a static method ' +
			            'and will be ignored. Instead, declare it as an instance method.',
			        );
			    \});
			
			    it('should warn if state is not properly initialized before getDerivedStateFromProps', () => \{
			        const Component = createReactClass(\{
			            statics: \{
			                getDerivedStateFromProps: function () \{
			                    return null;
			                \},
			            \},
			            render: function () \{
			                return null;
			            \},
			        \});
			        expect(() =>
			            ReactDOM.render(<Component />, document.createElement('div')),
			        ).toWarnDev('Did not properly initialize state during construction.');
			    \});
			
			    it('should not invoke deprecated lifecycles (cWM/cWRP/cWU) if new static gDSFP is present', () => \{
			        return
			        const Component = createReactClass(\{
			            statics: \{
			                getDerivedStateFromProps: function () \{
			                    return null;
			                \},
			            \},
			            componentWillMount: function () \{
			                throw Error('unexpected');
			            \},
			            componentWillReceiveProps: function () \{
			                throw Error('unexpected');
			            \},
			            componentWillUpdate: function () \{
			                throw Error('unexpected');
			            \},
			            getInitialState: function () \{
			                return \{\};
			            \},
			            render: function () \{
			                return null;
			            \},
			        \});
			
			        expect(() => \{
			            ReactDOM.render(<Component />, document.createElement('div'));
			        \}).toWarnDev(
			            'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			            'Component uses getDerivedStateFromProps() but also contains the following legacy lifecycles:\\n' +
			            '  componentWillMount\\n' +
			            '  componentWillReceiveProps\\n' +
			            '  componentWillUpdate\\n\\n' +
			            'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			            'https://fb.me/react-async-component-lifecycle-hooks',
			        );
			        ReactDOM.render(<Component foo=\{1\} />, document.createElement('div'));
			    \});
			
			    it('should not invoke deprecated lifecycles (cWM/cWRP/cWU) if new getSnapshotBeforeUpdate is present', () => \{
			        return
			        const Component = createReactClass(\{
			            getSnapshotBeforeUpdate: function () \{
			                return null;
			            \},
			            componentWillMount: function () \{
			                throw Error('unexpected');
			            \},
			            componentWillReceiveProps: function () \{
			                throw Error('unexpected');
			            \},
			            componentWillUpdate: function () \{
			                throw Error('unexpected');
			            \},
			            componentDidUpdate: function () \{ \},
			            render: function () \{
			                return null;
			            \},
			        \});
			
			        expect(() => \{
			            ReactDOM.render(<Component />, document.createElement('div'));
			        \}).toWarnDev(
			            'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			            'Component uses getSnapshotBeforeUpdate() but also contains the following legacy lifecycles:\\n' +
			            '  componentWillMount\\n' +
			            '  componentWillReceiveProps\\n' +
			            '  componentWillUpdate\\n\\n' +
			            'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			            'https://fb.me/react-async-component-lifecycle-hooks',
			        );
			        ReactDOM.render(<Component foo=\{1\} />, document.createElement('div'));
			    \});
			
			    it('should invoke both deprecated and new lifecycles if both are present', () => \{
			        const log = [];
			
			        const Component = createReactClass(\{
			            mixins: [
			                \{
			                    componentWillMount: function () \{
			                        log.push('componentWillMount');
			                    \},
			                    componentWillReceiveProps: function () \{
			                        log.push('componentWillReceiveProps');
			                    \},
			                    componentWillUpdate: function () \{
			                        log.push('componentWillUpdate');
			                    \},
			                \},
			            ],
			            displayName: "Ctt",
			            UNSAFE_componentWillMount: function () \{
			                log.push('UNSAFE_componentWillMount');
			            \},
			            UNSAFE_componentWillReceiveProps: function () \{
			                log.push('UNSAFE_componentWillReceiveProps');
			            \},
			            UNSAFE_componentWillUpdate: function () \{
			                log.push('UNSAFE_componentWillUpdate');
			            \},
			            render: function () \{
			                return null;
			            \},
			        \});
			
			        const div = document.createElement('div');
			        var a = ReactDOM.render(<Component foo="bar" />, div);
			
			        expect(a.constructor.displayName).toBe("Ctt")
			
			        expect(log).toEqual(['componentWillMount',
			            'UNSAFE_componentWillMount'
			        ]);
			
			        log.length = 0;
			
			        ReactDOM.render(<Component foo="baz" />, div);
			        expect(log).toEqual([
			            'componentWillReceiveProps',
			            'UNSAFE_componentWillReceiveProps',
			            'componentWillUpdate',
			            'UNSAFE_componentWillUpdate',
			        ]);
			    \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\createReactClassIntegration-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(26)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\forwardRef-test.internal.js', () => {
        const sourceCode = `
			'use strict';
			
			describe('forwardRef', () => \{
			  let React;
			  let ReactFeatureFlags;
			  let ReactNoop;
			  ReactNoop = require('react-noop-renderer');
			  beforeEach(() => \{
			    jest.resetModules();
			   // ReactFeatureFlags = require('shared/ReactFeatureFlags');
			   // ReactFeatureFlags.debugRenderPhaseSideEffectsForStrictMode = false;
			   
			    //ReactNoop = require('react-noop-renderer');
			
			    React = ReactNoop
			  \});
			  afterEach(() => \{
			    ReactNoop.reset()
			  \})
			
			  it('should work without a ref to be forwarded', () => \{
			    class Child extends React.Component \{
			      render() \{
			        ReactNoop.yield(this.props.value);
			        return null;
			      \}
			    \}
			
			    function Wrapper(props) \{
			      return <Child \{...props\} ref=\{props.forwardedRef\} />;
			    \}
			
			    const RefForwardingComponent = React.forwardRef((props, ref) => (
			      <Wrapper \{...props\} forwardedRef=\{ref\} />
			    ));
			
			    ReactNoop.render(<RefForwardingComponent value=\{123\} />);
			    expect(ReactNoop.flush()).toEqual([123]);
			  \});
			
			  it('should forward a ref for a single child', () => \{
			    class Child extends React.Component \{
			      render() \{
			        ReactNoop.yield(this.props.value);
			        return null;
			      \}
			    \}
			
			    function Wrapper(props) \{
			      return <Child \{...props\} ref=\{props.forwardedRef\} />;
			    \}
			
			    const RefForwardingComponent = React.forwardRef((props, ref) => (
			      <Wrapper \{...props\} forwardedRef=\{ref\} />
			    ));
			
			    const ref = React.createRef();
			
			    ReactNoop.render(<RefForwardingComponent ref=\{ref\} value=\{123\} />);
			    expect(ReactNoop.flush()).toEqual([123]);
			    expect(ref.current instanceof Child).toBe(true);
			  \});
			
			  it('should forward a ref for multiple children', () => \{
			    class Child extends React.Component \{
			      render() \{
			        ReactNoop.yield(this.props.value);
			        return null;
			      \}
			    \}
			
			    function Wrapper(props) \{
			      return <Child \{...props\} ref=\{props.forwardedRef\} />;
			    \}
			
			    const RefForwardingComponent = React.forwardRef((props, ref) => (
			      <Wrapper \{...props\} forwardedRef=\{ref\} />
			    ));
			
			    const ref = React.createRef();
			
			    ReactNoop.render(
			      <div>
			        <div />
			        <RefForwardingComponent ref=\{ref\} value=\{123\} />
			        <div />
			      </div>,
			    );
			    expect(ReactNoop.flush()).toEqual([123]);
			    expect(ref.current instanceof Child).toBe(true);
			  \});
			
			  it('should update refs when switching between children', () => \{
			    function FunctionalComponent(\{forwardedRef, setRefOnDiv\}) \{
			      return (
			        <section>
			          <div ref=\{setRefOnDiv ? forwardedRef : null\}>First</div>
			          <span ref=\{setRefOnDiv ? null : forwardedRef\}>Second</span>
			        </section>
			      );
			    \}
			
			    const RefForwardingComponent = React.forwardRef((props, ref) => (
			      <FunctionalComponent \{...props\} forwardedRef=\{ref\} />
			    ));
			
			    const ref = React.createRef();
			
			    ReactNoop.render(<RefForwardingComponent ref=\{ref\} setRefOnDiv=\{true\} />);
			    ReactNoop.flush();
			    expect(ref.current.type).toBe('div');
			
			    ReactNoop.render(<RefForwardingComponent ref=\{ref\} setRefOnDiv=\{false\} />);
			    ReactNoop.flush();
			    expect(ref.current.type).toBe('span');
			  \});
			
			  it('should maintain child instance and ref through updates', () => \{
			  
			    class Child extends React.Component \{
			      constructor(props) \{
			        super(props);
			      \}
			      render() \{
			        ReactNoop.yield(this.props.value);
			        return null;
			      \}
			    \}
			
			    function Wrapper(props) \{
			      return <Child \{...props\} ref=\{props.forwardedRef\} />;
			    \}
			
			    const RefForwardingComponent = React.forwardRef((props, ref) => (
			      <Wrapper \{...props\} forwardedRef=\{ref\} />
			    ));
			
			    let setRefCount = 0;
			    let ref;
			
			    const setRef = r => \{
			      setRefCount++;
			      ref = r;
			    \};
			
			    ReactNoop.render(<RefForwardingComponent ref=\{setRef\} value=\{123\} />);
			    expect(ReactNoop.flush()).toEqual([123]);
			    expect(ref instanceof Child).toBe(true);
			    expect(setRefCount).toBe(1);
			    ReactNoop.render(<RefForwardingComponent ref=\{setRef\} value=\{456\} />);
			    expect(ReactNoop.flush()).toEqual([456]);
			    expect(ref instanceof Child).toBe(true);
			    expect(setRefCount).toBe(1);
			  \});
			
			  it('should not break lifecycle error handling', () => \{
			    class ErrorBoundary extends React.Component \{
			      state = \{error: null\};
			      componentDidCatch(error) \{
			        ReactNoop.yield('ErrorBoundary.componentDidCatch');
			        this.setState(\{error\});
			      \}
			      render() \{
			        if (this.state.error) \{
			          ReactNoop.yield('ErrorBoundary.render: catch');
			          return null;
			        \}
			        ReactNoop.yield('ErrorBoundary.render: try');
			        return this.props.children;
			      \}
			    \}
			
			    class BadRender extends React.Component \{
			      render() \{
			        ReactNoop.yield('BadRender throw');
			        throw new Error('oops!');
			      \}
			    \}
			
			    function Wrapper(props) \{
			      ReactNoop.yield('Wrapper');
			      return <BadRender \{...props\} ref=\{props.forwardedRef\} />;
			    \}
			
			    const RefForwardingComponent = React.forwardRef((props, ref) => (
			      <Wrapper \{...props\} forwardedRef=\{ref\} />
			    ));
			
			    const ref = React.createRef();
			
			    ReactNoop.render(
			      <ErrorBoundary>
			        <RefForwardingComponent ref=\{ref\} />
			      </ErrorBoundary>,
			    );
			    expect(ReactNoop.flush()).toEqual([
			      'ErrorBoundary.render: try',
			      'Wrapper',
			      'BadRender throw',
			      'ErrorBoundary.componentDidCatch',
			      'ErrorBoundary.render: catch',
			    ]);
			    expect(ref.current).toBe(null);
			  \});
			
			  it('should support rendering null', () => \{
			    const RefForwardingComponent = React.forwardRef((props, ref) => null);
			
			    const ref = React.createRef();
			
			    ReactNoop.render(<RefForwardingComponent ref=\{ref\} />);
			    ReactNoop.flush();
			    expect(ref.current).toBe(null);
			  \});
			
			  it('should support rendering null for multiple children', () => \{
			    const RefForwardingComponent = React.forwardRef((props, ref) => null);
			
			    const ref = React.createRef();
			
			    ReactNoop.render(
			      <div>
			        <div />
			        <RefForwardingComponent ref=\{ref\} />
			        <div />
			      </div>,
			    );
			    ReactNoop.flush();
			    expect(ref.current).toBe(null);
			  \});
			
			  it('should warn if not provided a callback during creation', () => \{
			    expect(() => React.forwardRef(undefined)).toWarnDev(
			      'forwardRef requires a render function but was given undefined.',
			    );
			    expect(() => React.forwardRef(null)).toWarnDev(
			      'forwardRef requires a render function but was given null.',
			    );
			    expect(() => React.forwardRef('foo')).toWarnDev(
			      'forwardRef requires a render function but was given string.',
			    );
			  \});
			
			  it('should warn if no render function is provided', () => \{
			    expect(React.forwardRef).toWarnDev(
			      'forwardRef requires a render function but was given undefined.',
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\forwardRef-test.internal.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\onlyChild-test.js', () => {
        const sourceCode = `
			describe("onlyChild", () => \{
			    let React;
			    let WrapComponent;
			  
			    beforeEach(() => \{
			        React = require("react");
			      
			        WrapComponent = class extends React.Component \{
			            render() \{
			                return (
			                    <div>
			                        \{React.Children.only(this.props.children, this.props.mapFn, this)\}
			                    </div>
			                );
			            \}
			        \};
			    \});
			  
			    it("should fail when passed two children", () => \{
			        expect(function() \{
			            const instance = (
			                <WrapComponent>
			                    <div />
			                    <span />
			                </WrapComponent>
			            );
			            React.Children.only(instance.props.children);
			        \}).toThrow();
			    \});
			    it("should fail when passed nully values", () => \{
			        expect(function() \{
			            const instance = <WrapComponent>\{null\}</WrapComponent>;
			            React.Children.only(instance.props.children);
			        \}).toThrow();
			  
			        expect(function() \{
			            const instance = <WrapComponent>\{undefined\}</WrapComponent>;
			            React.Children.only(instance.props.children);
			        \}).toThrow();
			    \});
			  
			    it("should fail when key/value objects", () => \{
			        expect(function() \{
			            const instance = <WrapComponent>\{[<span key="abc" />]\}</WrapComponent>;
			            React.Children.only(instance.props.children);
			        \}).toThrow();
			    \});
			  
			    it("should not fail when passed interpolated single child", () => \{
			        expect(function() \{
			            const instance = <WrapComponent>\{<span />\}</WrapComponent>;
			            React.Children.only(instance.props.children);
			        \}).not.toThrow();
			    \});
			  
			    it("should return the only child", () => \{
			        const instance = (
			            <WrapComponent>
			                <span />
			            </WrapComponent>
			        );
			        expect(React.Children.only(instance.props.children)).toEqual(<span />);
			    \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\onlyChild-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactChildren-test.js', () => {
        const sourceCode = `
			
			"use strict";
			
			describe("ReactChildren", () => \{
			    let React;
			    let ReactTestUtils;
			
			    beforeEach(() => \{
			        jest.resetModules();
			        React = require("react");
			        ReactTestUtils = require("test-utils");
			    \});
			    it("should support identity for simple", () => \{
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            expect(index).toBe(0);
			            return kid;
			        \});
			
			        var simpleKid = <span key="simple" />;
			
			        // First pass children into a component to fully simulate what happens when
			        // using structures that arrive from transforms.
			
			        var instance = <div>\{simpleKid\}</div>;
			        React.Children.forEach(instance.props.children, callback, context);
			        expect(callback).toHaveBeenCalledWith(simpleKid, 0);
			        callback.calls.reset();
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        expect(callback).toHaveBeenCalledWith(simpleKid, 0);
			        expect(mappedChildren[0]).toEqual(<span key=".\$simple" />);
			    \});
			
			    it("should treat single arrayless child as being in array", () => \{
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            expect(index).toBe(0);
			            return kid;
			        \});
			
			        var simpleKid = <span />;
			        var instance = <div>\{simpleKid\}</div>;
			        React.Children.forEach(instance.props.children, callback, context);
			        expect(callback).toHaveBeenCalledWith(simpleKid, 0);
			        callback.calls.reset();
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        expect(callback).toHaveBeenCalledWith(simpleKid, 0);
			        expect(mappedChildren[0]).toEqual(<span key=".0" />);
			    \});
			
			    it("should treat single child in array as expected", () => \{
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        var simpleKid = <span key="simple" />;
			        var instance = <div>\{[simpleKid]\}</div>;
			        React.Children.forEach(instance.props.children, callback, context);
			        expect(callback).toHaveBeenCalledWith(simpleKid, 0);
			        callback.calls.reset();
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        expect(callback).toHaveBeenCalledWith(simpleKid, 0);
			        expect(mappedChildren[0]).toEqual(<span key=".\$simple" />);
			    \});
			
			    it("should be called for each child", () => \{
			        var zero = <div key="keyZero" />;
			        var one = null;
			        var two = <div key="keyTwo" />;
			        var three = null;
			        var four = <div key="keyFour" />;
			        var context = \{\};
			
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        var instance = (
			            <div>
			                \{zero\}
			                \{one\}
			                \{two\}
			                \{three\}
			                \{four\}
			            </div>
			        );
			
			        function assertCalls() \{
			            expect(callback).toHaveBeenCalledWith(zero, 0);
			            expect(callback).toHaveBeenCalledWith(one, 1);
			            expect(callback).toHaveBeenCalledWith(two, 2);
			            expect(callback).toHaveBeenCalledWith(three, 3);
			            expect(callback).toHaveBeenCalledWith(four, 4);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        assertCalls();
			        expect(mappedChildren).toEqual([<div key=".\$keyZero" />,
			        <div key=".\$keyTwo" />, <div key=".\$keyFour" />]);
			    \});
			    it("React.Children.forEach不处理null void 0", () => \{
			        var i = 0;
			        React.Children.forEach(null, function () \{
			            i++;
			        \});
			        React.Children.forEach(void 0, function () \{
			            i++;
			        \});
			        expect(i).toBe(0);
			    \});
			    it("should traverse children of different kinds", () => \{
			        var div = <div key="divNode" />;
			        var span = <span key="spanNode" />;
			        var a = <a key="aNode" />;
			
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			        var instance = (
			            <div>
			                \{div\}
			                \{[[span]]\}
			                \{[a]\}
			                \{"string"\}
			                \{1234\}
			                \{true\}
			                \{false\}
			                \{null\}
			                \{undefined\}
			            </div>
			        );
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(9);
			            expect(callback).toHaveBeenCalledWith(div, 0);
			            expect(callback).toHaveBeenCalledWith(span, 1);
			            expect(callback).toHaveBeenCalledWith(a, 2);
			            expect(callback).toHaveBeenCalledWith("string", 3);
			            expect(callback).toHaveBeenCalledWith(1234, 4);
			            expect(callback).toHaveBeenCalledWith(null, 5);
			            expect(callback).toHaveBeenCalledWith(null, 6);
			            expect(callback).toHaveBeenCalledWith(null, 7);
			            expect(callback).toHaveBeenCalledWith(null, 8);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        assertCalls();
			        expect(mappedChildren).toEqual([<div key=".\$divNode" />,
			        <span key=".1:0:\$spanNode" />,
			        <a key=".2:\$aNode" />, "string", 1234]);
			    \});
			
			    it("should be called for each child in nested structure", () => \{
			        var zero = <div key="keyZero" />;
			        var one = null;
			        var two = <div key="keyTwo" />;
			        var three = null;
			        var four = <div key="keyFour" />;
			        var five = <div key="keyFive" />;
			
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        var instance = <div>\{[[zero, one, two], [three, four], five]\}</div>;
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(6);
			            expect(callback).toHaveBeenCalledWith(zero, 0);
			            expect(callback).toHaveBeenCalledWith(one, 1);
			            expect(callback).toHaveBeenCalledWith(two, 2);
			            expect(callback).toHaveBeenCalledWith(three, 3);
			            expect(callback).toHaveBeenCalledWith(four, 4);
			            expect(callback).toHaveBeenCalledWith(five, 5);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        assertCalls();
			        expect(mappedChildren).toEqual([<div key=".0:\$keyZero" />, <div key=".0:\$keyTwo" />, <div key=".1:\$keyFour" />, <div key=".\$keyFive" />]);
			    \});
			
			    it("should retain key across two mappings", () => \{
			        var zeroForceKey = <div key="keyZero" />;
			        var oneForceKey = <div key="keyOne" />;
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			        var forcedKeys = (
			            <div>
			                \{zeroForceKey\}
			                \{oneForceKey\}
			            </div>
			        );
			
			        function assertCalls() \{
			            expect(callback).toHaveBeenCalledWith(zeroForceKey, 0);
			            expect(callback).toHaveBeenCalledWith(oneForceKey, 1);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(forcedKeys.props.children, callback, context);
			        assertCalls();
			
			        var mappedChildren = React.Children.map(forcedKeys.props.children, callback, context);
			        assertCalls();
			        expect(mappedChildren).toEqual([<div key=".\$keyZero" />, <div key=".\$keyOne" />]);
			    \});
			
			    it("should be called for each child in an iterable without keys", () => \{
			        //spyOn(console, "error");
			        var threeDivIterable = \{
			            "@@iterator": function () \{
			                var i = 0;
			                return \{
			                    next: function () \{
			                        if (i++ < 3) \{
			                            return \{ value: <div />, done: false \};
			                        \} else \{
			                            return \{ value: undefined, done: true \};
			                        \}
			                    \}
			                \};
			            \}
			        \};
			
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        var instance = <div>\{threeDivIterable\}</div>;
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(3);
			            expect(callback).toHaveBeenCalledWith(<div />, 0);
			            expect(callback).toHaveBeenCalledWith(<div />, 1);
			            expect(callback).toHaveBeenCalledWith(<div />, 2);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        assertCalls();
			        var compareChildren = [<div key=".0" />, <div key=".1" />, <div key=".2" />];
			        expect(mappedChildren).toEqual(compareChildren);
			    \});
			
			    it("should be called for each child in an iterable with keys", () => \{
			        var threeDivIterable = \{
			            "@@iterator": function () \{
			                var i = 0;
			                return \{
			                    next: function () \{
			                        if (i++ < 3) \{
			                            return \{ value: <div key=\{"#" + i\} />, done: false \};
			                        \} else \{
			                            return \{ value: undefined, done: true \};
			                        \}
			                    \}
			                \};
			            \}
			        \};
			
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        var instance = <div>\{threeDivIterable\}</div>;
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(3);
			            expect(callback).toHaveBeenCalledWith(<div key="#1" />, 0);
			            expect(callback).toHaveBeenCalledWith(<div key="#2" />, 1);
			            expect(callback).toHaveBeenCalledWith(<div key="#3" />, 2);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        assertCalls();
			        expect(mappedChildren).toEqual([<div key=".\$#1" />, <div key=".\$#2" />, <div key=".\$#3" />]);
			    \});
			
			    it("should not enumerate enumerable numbers (#4776)", () => \{
			        /*eslint-disable no-extend-native */
			        Number.prototype["@@iterator"] = function () \{
			            throw new Error("number iterator called");
			        \};
			        /*eslint-enable no-extend-native */
			
			        try \{
			            var instance = (
			                <div>
			                    \{5\}
			                    \{12\}
			                    \{13\}
			                </div>
			            );
			
			            var context = \{\};
			            var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			                expect(this).toBe(context);
			                return kid;
			            \});
			
			            var assertCalls = function () \{
			                expect(callback.calls.count()).toBe(3);
			                expect(callback).toHaveBeenCalledWith(5, 0);
			                expect(callback).toHaveBeenCalledWith(12, 1);
			                expect(callback).toHaveBeenCalledWith(13, 2);
			                callback.calls.reset();
			            \};
			
			            React.Children.forEach(instance.props.children, callback, context);
			            assertCalls();
			
			            var mappedChildren = React.Children.map(instance.props.children, callback, context);
			            assertCalls();
			            expect(mappedChildren).toEqual([5, 12, 13]);
			        \} finally \{
			            delete Number.prototype["@@iterator"];
			        \}
			    \});
			
			    it("should allow extension of native prototypes", () => \{
			        /*eslint-disable no-extend-native */
			        String.prototype.key = "react";
			        Number.prototype.key = "rocks";
			        /*eslint-enable no-extend-native */
			
			        var instance = (
			            <div>
			                \{"a"\}
			                \{13\}
			            </div>
			        );
			
			        var context = \{\};
			        var callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(2, 0);
			            expect(callback).toHaveBeenCalledWith("a", 0);
			            expect(callback).toHaveBeenCalledWith(13, 1);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        var mappedChildren = React.Children.map(instance.props.children, callback, context);
			        assertCalls();
			        expect(mappedChildren).toEqual(["a", 13]);
			
			        delete String.prototype.key;
			        delete Number.prototype.key;
			    \});
			
			    it("should pass key to returned component", () => \{
			        var mapFn = function (kid, index) \{
			            return <div>\{kid\}</div>;
			        \};
			
			        var simpleKid = <span key="simple" />;
			
			        var instance = <div>\{simpleKid\}</div>;
			        var mappedChildren = React.Children.map(instance.props.children, mapFn);
			
			        expect(React.Children.count(mappedChildren)).toBe(1);
			        expect(mappedChildren[0]).not.toBe(simpleKid);
			        expect(mappedChildren[0].props.children).toBe(simpleKid);
			        expect(mappedChildren[0].key).toBe(".\$simple");
			    \});
			
			    it("should invoke callback with the right context", () => \{
			        var lastContext;
			        var callback = function (kid, index) \{
			            lastContext = this;
			            return this;
			        \};
			
			        // TODO: Use an object to test, after non-object fragments has fully landed.
			        var scopeTester = "scope tester";
			
			        var simpleKid = <span key="simple" />;
			        var instance = <div>\{simpleKid\}</div>;
			        React.Children.forEach(instance.props.children, callback, scopeTester);
			        expect(lastContext).toBe(scopeTester);
			
			        var mappedChildren = React.Children.map(instance.props.children, callback, scopeTester);
			
			        expect(React.Children.count(mappedChildren)).toBe(1);
			        expect(mappedChildren[0]).toBe(scopeTester);
			    \});
			
			    it("should be called for each child", () => \{
			        const zero = <div key="keyZero" />;
			        const one = null;
			        const two = <div key="keyTwo" />;
			        const three = null;
			        const four = <div key="keyFour" />;
			        const context = \{\};
			
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        const instance = (
			            <div>
			                \{zero\}
			                \{one\}
			                \{two\}
			                \{three\}
			                \{four\}
			            </div>
			        );
			
			        function assertCalls() \{
			            expect(callback).toHaveBeenCalledWith(zero, 0);
			            expect(callback).toHaveBeenCalledWith(one, 1);
			            expect(callback).toHaveBeenCalledWith(two, 2);
			            expect(callback).toHaveBeenCalledWith(three, 3);
			            expect(callback).toHaveBeenCalledWith(four, 4);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			            context,
			        );
			        assertCalls();
			        expect(mappedChildren).toEqual([
			            <div key=".\$keyZero" />,
			            <div key=".\$keyTwo" />,
			            <div key=".\$keyFour" />,
			        ]);
			    \});
			    it('should traverse children of different kinds', () => \{
			        const div = <div key="divNode" />;
			        const span = <span key="spanNode" />;
			        const a = <a key="aNode" />;
			
			        const context = \{\};
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        const instance = (
			            <div>
			                \{div\}
			                \{[[span]]\}
			                \{[a]\}
			                \{'string'\}
			                \{1234\}
			                \{true\}
			                \{false\}
			                \{null\}
			                \{undefined\}
			            </div>
			        );
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(9);
			            expect(callback).toHaveBeenCalledWith(div, 0);
			            expect(callback).toHaveBeenCalledWith(span, 1);
			            expect(callback).toHaveBeenCalledWith(a, 2);
			            expect(callback).toHaveBeenCalledWith('string', 3);
			            expect(callback).toHaveBeenCalledWith(1234, 4);
			            expect(callback).toHaveBeenCalledWith(null, 5);
			            expect(callback).toHaveBeenCalledWith(null, 6);
			            expect(callback).toHaveBeenCalledWith(null, 7);
			            expect(callback).toHaveBeenCalledWith(null, 8);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			            context,
			        );
			        assertCalls();
			        expect(mappedChildren).toEqual([
			            <div key=".\$divNode" />,
			            <span key=".1:0:\$spanNode" />,
			            <a key=".2:\$aNode" />,
			            'string',
			            1234,
			        ]);
			    \});
			
			    it('should be called for each child in nested structure', () => \{
			        const zero = <div key="keyZero" />;
			        const one = null;
			        const two = <div key="keyTwo" />;
			        const three = null;
			        const four = <div key="keyFour" />;
			        const five = <div key="keyFive" />;
			
			        const context = \{\};
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            return kid;
			        \});
			
			        const instance = <div>\{[[zero, one, two], [three, four], five]\}</div>;
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(6);
			            expect(callback).toHaveBeenCalledWith(zero, 0);
			            expect(callback).toHaveBeenCalledWith(one, 1);
			            expect(callback).toHaveBeenCalledWith(two, 2);
			            expect(callback).toHaveBeenCalledWith(three, 3);
			            expect(callback).toHaveBeenCalledWith(four, 4);
			            expect(callback).toHaveBeenCalledWith(five, 5);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			            context,
			        );
			        assertCalls();
			        expect(mappedChildren).toEqual([
			            <div key=".0:\$keyZero" />,
			            <div key=".0:\$keyTwo" />,
			            <div key=".1:\$keyFour" />,
			            <div key=".\$keyFive" />,
			        ]);
			    \});
			
			    it('should retain key across two mappings', () => \{
			        const zeroForceKey = <div key="keyZero" />;
			        const oneForceKey = <div key="keyOne" />;
			        const context = \{\};
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        const forcedKeys = (
			            <div>
			                \{zeroForceKey\}
			                \{oneForceKey\}
			            </div>
			        );
			
			        function assertCalls() \{
			            expect(callback).toHaveBeenCalledWith(zeroForceKey, 0);
			            expect(callback).toHaveBeenCalledWith(oneForceKey, 1);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(forcedKeys.props.children, callback, context);
			        assertCalls();
			
			        const mappedChildren = React.Children.map(
			            forcedKeys.props.children,
			            callback,
			            context,
			        );
			        assertCalls();
			        expect(mappedChildren).toEqual([
			            <div key=".\$keyZero" />,
			            <div key=".\$keyOne" />,
			        ]);
			    \});
			
			    it('should be called for each child in an iterable without keys', () => \{
			        const threeDivIterable = \{
			            '@@iterator': function () \{
			                let i = 0;
			                return \{
			                    next: function () \{
			                        if (i++ < 3) \{
			                            return \{ value: <div />, done: false \};
			                        \} else \{
			                            return \{ value: undefined, done: true \};
			                        \}
			                    \},
			                \};
			            \},
			        \};
			
			        const context = \{\};
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        let instance;
			        expect(() => (instance = <div>\{threeDivIterable\}</div>)).toWarnDev(
			            'Warning: Each child in an array or iterator should have a unique "key" prop.',
			        );
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(3);
			            expect(callback).toHaveBeenCalledWith(<div />, 0);
			            expect(callback).toHaveBeenCalledWith(<div />, 1);
			            expect(callback).toHaveBeenCalledWith(<div />, 2);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			            context,
			        );
			        assertCalls();
			        expect(mappedChildren).toEqual([
			            <div key=".0" />,
			            <div key=".1" />,
			            <div key=".2" />,
			        ]);
			    \});
			
			
			    it('should be called for each child in an iterable without keys', () => \{
			        const threeDivIterable = \{
			            '@@iterator': function () \{
			                let i = 0;
			                return \{
			                    next: function () \{
			                        if (i++ < 3) \{
			                            return \{ value: <div />, done: false \};
			                        \} else \{
			                            return \{ value: undefined, done: true \};
			                        \}
			                    \},
			                \};
			            \},
			        \};
			
			        const context = \{\};
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        let instance;
			        expect(() => (instance = <div>\{threeDivIterable\}</div>)).toWarnDev(
			            'Warning: Each child in an array or iterator should have a unique "key" prop.',
			        );
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(3);
			            expect(callback).toHaveBeenCalledWith(<div />, 0);
			            expect(callback).toHaveBeenCalledWith(<div />, 1);
			            expect(callback).toHaveBeenCalledWith(<div />, 2);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			            context,
			        );
			        assertCalls();
			        expect(mappedChildren).toEqual([
			            <div key=".0" />,
			            <div key=".1" />,
			            <div key=".2" />,
			        ]);
			    \});
			
			    it('should be called for each child in an iterable with keys', () => \{
			        const threeDivIterable = \{
			            '@@iterator': function () \{
			                let i = 0;
			                return \{
			                    next: function () \{
			                        if (i++ < 3) \{
			                            return \{ value: <div key=\{'#' + i\} />, done: false \};
			                        \} else \{
			                            return \{ value: undefined, done: true \};
			                        \}
			                    \},
			                \};
			            \},
			        \};
			
			        const context = \{\};
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        const instance = <div>\{threeDivIterable\}</div>;
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(3);
			            expect(callback).toHaveBeenCalledWith(<div key="#1" />, 0);
			            expect(callback).toHaveBeenCalledWith(<div key="#2" />, 1);
			            expect(callback).toHaveBeenCalledWith(<div key="#3" />, 2);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			            context,
			        );
			        assertCalls();
			        expect(mappedChildren).toEqual([
			            <div key=".\$#1" />,
			            <div key=".\$#2" />,
			            <div key=".\$#3" />,
			        ]);
			    \});
			
			    it('should not enumerate enumerable numbers (#4776)', () => \{
			        /*eslint-disable no-extend-native */
			        Number.prototype['@@iterator'] = function () \{
			            throw new Error('number iterator called');
			        \};
			        /*eslint-enable no-extend-native */
			
			        try \{
			            const instance = (
			                <div>
			                    \{5\}
			                    \{12\}
			                    \{13\}
			                </div>
			            );
			
			            const context = \{\};
			            const callback = jasmine.createSpy().and.callFake(function (kid) \{
			                expect(this).toBe(context);
			                return kid;
			            \});
			
			            const assertCalls = function () \{
			                expect(callback.calls.count()).toBe(3);
			                expect(callback).toHaveBeenCalledWith(5, 0);
			                expect(callback).toHaveBeenCalledWith(12, 1);
			                expect(callback).toHaveBeenCalledWith(13, 2);
			                callback.calls.reset();
			            \};
			
			            React.Children.forEach(instance.props.children, callback, context);
			            assertCalls();
			
			            const mappedChildren = React.Children.map(
			                instance.props.children,
			                callback,
			                context,
			            );
			            assertCalls();
			            expect(mappedChildren).toEqual([5, 12, 13]);
			        \} finally \{
			            delete Number.prototype['@@iterator'];
			        \}
			    \});
			
			    it('should allow extension of native prototypes', () => \{
			        /*eslint-disable no-extend-native */
			        String.prototype.key = 'react';
			        Number.prototype.key = 'rocks';
			        /*eslint-enable no-extend-native */
			
			        const instance = (
			            <div>
			                \{'a'\}
			                \{13\}
			            </div>
			        );
			
			        const context = \{\};
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            expect(this).toBe(context);
			            return kid;
			        \});
			
			        function assertCalls() \{
			            expect(callback.calls.count()).toBe(2, 0);
			            expect(callback).toHaveBeenCalledWith('a', 0);
			            expect(callback).toHaveBeenCalledWith(13, 1);
			            callback.calls.reset();
			        \}
			
			        React.Children.forEach(instance.props.children, callback, context);
			        assertCalls();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			            context,
			        );
			        assertCalls();
			        expect(mappedChildren).toEqual(['a', 13]);
			
			        delete String.prototype.key;
			        delete Number.prototype.key;
			    \});
			
			    it('should pass key to returned component', () => \{
			        const mapFn = function (kid, index) \{
			            return <div>\{kid\}</div>;
			        \};
			
			        const simpleKid = <span key="simple" />;
			
			        const instance = <div>\{simpleKid\}</div>;
			        const mappedChildren = React.Children.map(instance.props.children, mapFn);
			
			        expect(React.Children.count(mappedChildren)).toBe(1);
			        expect(mappedChildren[0]).not.toBe(simpleKid);
			        expect(mappedChildren[0].props.children).toBe(simpleKid);
			        expect(mappedChildren[0].key).toBe('.\$simple');
			    \});
			
			    it('should invoke callback with the right context', () => \{
			        let lastContext;
			        const callback = function (kid, index) \{
			            lastContext = this;
			            return this;
			        \};
			
			        // TODO: Use an object to test, after non-object fragments has fully landed.
			        const scopeTester = 'scope tester';
			
			        const simpleKid = <span key="simple" />;
			        const instance = <div>\{simpleKid\}</div>;
			        React.Children.forEach(instance.props.children, callback, scopeTester);
			        expect(lastContext).toBe(scopeTester);
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			            scopeTester,
			        );
			
			        expect(React.Children.count(mappedChildren)).toBe(1);
			        expect(mappedChildren[0]).toBe(scopeTester);
			    \});
			
			    it('should be called for each child', () => \{
			        const zero = <div key="keyZero" />;
			        const one = null;
			        const two = <div key="keyTwo" />;
			        const three = null;
			        const four = <div key="keyFour" />;
			
			        const mapped = [
			            <div key="giraffe" />, // Key should be joined to obj key
			            null, // Key should be added even if we don't supply it!
			            <div />, // Key should be added even if not supplied!
			            <span />, // Map from null to something.
			            <div key="keyFour" />,
			        ];
			        const callback = jasmine.createSpy().and.callFake(function (kid, index) \{
			            return mapped[index];
			        \});
			
			        const instance = (
			            <div>
			                \{zero\}
			                \{one\}
			                \{two\}
			                \{three\}
			                \{four\}
			            </div>
			        );
			
			        React.Children.forEach(instance.props.children, callback);
			        expect(callback).toHaveBeenCalledWith(zero, 0);
			        expect(callback).toHaveBeenCalledWith(one, 1);
			        expect(callback).toHaveBeenCalledWith(two, 2);
			        expect(callback).toHaveBeenCalledWith(three, 3);
			        expect(callback).toHaveBeenCalledWith(four, 4);
			        callback.calls.reset();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			        );
			        expect(callback.calls.count()).toBe(5);
			        expect(React.Children.count(mappedChildren)).toBe(4);
			        // Keys default to indices.
			        expect([
			            mappedChildren[0].key,
			            mappedChildren[1].key,
			            mappedChildren[2].key,
			            mappedChildren[3].key,
			        ]).toEqual(['giraffe/.\$keyZero', '.\$keyTwo', '.3', '.\$keyFour']);
			
			        expect(callback).toHaveBeenCalledWith(zero, 0);
			        expect(callback).toHaveBeenCalledWith(one, 1);
			        expect(callback).toHaveBeenCalledWith(two, 2);
			        expect(callback).toHaveBeenCalledWith(three, 3);
			        expect(callback).toHaveBeenCalledWith(four, 4);
			
			        expect(mappedChildren[0]).toEqual(<div key="giraffe/.\$keyZero" />);
			        expect(mappedChildren[1]).toEqual(<div key=".\$keyTwo" />);
			        expect(mappedChildren[2]).toEqual(<span key=".3" />);
			        expect(mappedChildren[3]).toEqual(<div key=".\$keyFour" />);
			    \});
			
			    it('should be called for each child in nested structure', () => \{
			        const zero = <div key="keyZero" />;
			        const one = null;
			        const two = <div key="keyTwo" />;
			        const three = null;
			        const four = <div key="keyFour" />;
			        const five = <div key="keyFive" />;
			
			        const zeroMapped = <div key="giraffe" />; // Key should be overridden
			        const twoMapped = <div />; // Key should be added even if not supplied!
			        const fourMapped = <div key="keyFour" />;
			        const fiveMapped = <div />;
			
			        const callback = jasmine.createSpy().and.callFake(function (kid) \{
			            switch (kid) \{
			                case zero:
			                    return zeroMapped;
			                case two:
			                    return twoMapped;
			                case four:
			                    return fourMapped;
			                case five:
			                    return fiveMapped;
			                default:
			                    return kid;
			            \}
			        \});
			
			        const frag = [[zero, one, two], [three, four], five];
			        const instance = <div>\{[frag]\}</div>;
			
			        React.Children.forEach(instance.props.children, callback);
			        expect(callback.calls.count()).toBe(6);
			        expect(callback).toHaveBeenCalledWith(zero, 0);
			        expect(callback).toHaveBeenCalledWith(one, 1);
			        expect(callback).toHaveBeenCalledWith(two, 2);
			        expect(callback).toHaveBeenCalledWith(three, 3);
			        expect(callback).toHaveBeenCalledWith(four, 4);
			        expect(callback).toHaveBeenCalledWith(five, 5);
			        callback.calls.reset();
			
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            callback,
			        );
			        expect(callback.calls.count()).toBe(6);
			        expect(callback).toHaveBeenCalledWith(zero, 0);
			        expect(callback).toHaveBeenCalledWith(one, 1);
			        expect(callback).toHaveBeenCalledWith(two, 2);
			        expect(callback).toHaveBeenCalledWith(three, 3);
			        expect(callback).toHaveBeenCalledWith(four, 4);
			        expect(callback).toHaveBeenCalledWith(five, 5);
			
			        expect(React.Children.count(mappedChildren)).toBe(4);
			        // Keys default to indices.
			        expect([
			            mappedChildren[0].key,
			            mappedChildren[1].key,
			            mappedChildren[2].key,
			            mappedChildren[3].key,
			        ]).toEqual([
			            'giraffe/.0:0:\$keyZero',
			            '.0:0:\$keyTwo',
			            '.0:1:\$keyFour',
			            '.0:\$keyFive',
			        ]);
			
			        expect(mappedChildren[0]).toEqual(<div key="giraffe/.0:0:\$keyZero" />);
			        expect(mappedChildren[1]).toEqual(<div key=".0:0:\$keyTwo" />);
			        expect(mappedChildren[2]).toEqual(<div key=".0:1:\$keyFour" />);
			        expect(mappedChildren[3]).toEqual(<div key=".0:\$keyFive" />);
			    \});
			
			    it('should retain key across two mappings', () => \{
			        const zeroForceKey = <div key="keyZero" />;
			        const oneForceKey = <div key="keyOne" />;
			
			        // Key should be joined to object key
			        const zeroForceKeyMapped = <div key="giraffe" />;
			        // Key should be added even if we don't supply it!
			        const oneForceKeyMapped = <div />;
			
			        const mapFn = function (kid, index) \{
			            return index === 0 ? zeroForceKeyMapped : oneForceKeyMapped;
			        \};
			
			        const forcedKeys = (
			            <div>
			                \{zeroForceKey\}
			                \{oneForceKey\}
			            </div>
			        );
			
			        const expectedForcedKeys = ['giraffe/.\$keyZero', '.\$keyOne'];
			        const mappedChildrenForcedKeys = React.Children.map(
			            forcedKeys.props.children,
			            mapFn,
			        );
			        const mappedForcedKeys = mappedChildrenForcedKeys.map(c => c.key);
			        expect(mappedForcedKeys).toEqual(expectedForcedKeys);
			
			        const expectedRemappedForcedKeys = [
			            'giraffe/.\$giraffe/.\$keyZero',
			            '.\$.\$keyOne',
			        ];
			        const remappedChildrenForcedKeys = React.Children.map(
			            mappedChildrenForcedKeys,
			            mapFn,
			        );
			        expect(remappedChildrenForcedKeys.map(c => c.key)).toEqual(
			            expectedRemappedForcedKeys,
			        );
			    \});
			
			    it('should not throw if key provided is a dupe with array key', () => \{
			        const zero = <div />;
			        const one = <div key="0" />;
			
			        const mapFn = function () \{
			            return null;
			        \};
			
			        const instance = (
			            <div>
			                \{zero\}
			                \{one\}
			            </div>
			        );
			
			        expect(function () \{
			            React.Children.map(instance.props.children, mapFn);
			        \}).not.toThrow();
			    \});
			
			    it('should use the same key for a cloned element', () => \{
			        const instance = (
			            <div>
			                <div />
			            </div>
			        );
			
			        const mapped = React.Children.map(
			            instance.props.children,
			            element => element,
			        );
			
			        const mappedWithClone = React.Children.map(
			            instance.props.children,
			            element => React.cloneElement(element),
			        );
			
			        expect(mapped[0].key).toBe(mappedWithClone[0].key);
			    \});
			
			    it('should use the same key for a cloned element with key', () => \{
			        const instance = (
			            <div>
			                <div key="unique" />
			            </div>
			        );
			
			        const mapped = React.Children.map(
			            instance.props.children,
			            element => element,
			        );
			
			        const mappedWithClone = React.Children.map(
			            instance.props.children,
			            element => React.cloneElement(element, \{ key: 'unique' \}),
			        );
			
			        expect(mapped[0].key).toBe(mappedWithClone[0].key);
			    \});
			
			    it('should return 0 for null children', () => \{
			        const numberOfChildren = React.Children.count(null);
			        expect(numberOfChildren).toBe(0);
			    \});
			
			    it('should return 0 for undefined children', () => \{
			        const numberOfChildren = React.Children.count(undefined);
			        expect(numberOfChildren).toBe(0);
			    \});
			
			    it('should return 1 for single child', () => \{
			        const simpleKid = <span key="simple" />;
			        const instance = <div>\{simpleKid\}</div>;
			        const numberOfChildren = React.Children.count(instance.props.children);
			        expect(numberOfChildren).toBe(1);
			    \});
			
			    it('should count the number of children in flat structure', () => \{
			        const zero = <div key="keyZero" />;
			        const one = null;
			        const two = <div key="keyTwo" />;
			        const three = null;
			        const four = <div key="keyFour" />;
			
			        const instance = (
			            <div>
			                \{zero\}
			                \{one\}
			                \{two\}
			                \{three\}
			                \{four\}
			            </div>
			        );
			        const numberOfChildren = React.Children.count(instance.props.children);
			        expect(numberOfChildren).toBe(5);
			    \});
			
			    it('should count the number of children in nested structure', () => \{
			        const zero = <div key="keyZero" />;
			        const one = null;
			        const two = <div key="keyTwo" />;
			        const three = null;
			        const four = <div key="keyFour" />;
			        const five = <div key="keyFive" />;
			
			        const instance = (
			            <div>\{[[[zero, one, two], [three, four], five], null]\}</div>
			        );
			        const numberOfChildren = React.Children.count(instance.props.children);
			        expect(numberOfChildren).toBe(7);
			    \});
			
			    it('should flatten children to an array', () => \{
			        expect(React.Children.toArray(undefined)).toEqual([]);
			        expect(React.Children.toArray(null)).toEqual([]);
			
			        expect(React.Children.toArray(<div />).length).toBe(1);
			        expect(React.Children.toArray([<div />]).length).toBe(1);
			        expect(React.Children.toArray(<div />)[0].key).toBe(
			            React.Children.toArray([<div />])[0].key,
			        );
			
			        const flattened = React.Children.toArray([
			            [<div key="apple" />, <div key="banana" />, <div key="camel" />],
			            [<div key="banana" />, <div key="camel" />, <div key="deli" />],
			        ]);
			        expect(flattened.length).toBe(6);
			        expect(flattened[1].key).toContain('banana');
			        expect(flattened[3].key).toContain('banana');
			        expect(flattened[1].key).not.toBe(flattened[3].key);
			
			        const reversed = React.Children.toArray([
			            [<div key="camel" />, <div key="banana" />, <div key="apple" />],
			            [<div key="deli" />, <div key="camel" />, <div key="banana" />],
			        ]);
			        expect(flattened[0].key).toBe(reversed[2].key);
			        expect(flattened[1].key).toBe(reversed[1].key);
			        expect(flattened[2].key).toBe(reversed[0].key);
			        expect(flattened[3].key).toBe(reversed[5].key);
			        expect(flattened[4].key).toBe(reversed[4].key);
			        expect(flattened[5].key).toBe(reversed[3].key);
			
			        // null/undefined/bool are all omitted
			        expect(React.Children.toArray([1, 'two', null, undefined, true])).toEqual([
			            1,
			            'two',
			        ]);
			    \});
			
			    it('should escape keys', () => \{
			        const zero = <div key="1" />;
			        const one = <div key="1=::=2" />;
			        const instance = (
			            <div>
			                \{zero\}
			                \{one\}
			            </div>
			        );
			        const mappedChildren = React.Children.map(
			            instance.props.children,
			            kid => kid,
			        );
			        expect(mappedChildren).toEqual([
			            <div key=".\$1" />,
			            <div key=".\$1=0=2=2=02" />,
			        ]);
			    \});
			
			    it("should throw on object", () => \{
			        // 'Objects are not valid as a React child (found: object with keys ' +
			        // '\{a, b\}). If you meant to render a collection of children, use an ' +
			        // 'array instead.',
			        expect(function () \{
			            React.Children.forEach(\{ a: 1, b: 2 \}, function () \{ \}, null);
			        \}).toThrow("children: type is invalid.");
			    \});
			
			    it("should throw on regex", () => \{
			        // Really, we care about dates (#4840) but those have nondeterministic
			        // serialization (timezones) so let's test a regex instead:
			        expect(function () \{
			            React.Children.forEach(/abc/, function () \{ \}, null);
			        \}).toThrow("children: type is invalid.");
			    \});
			
			    it("复杂的孩子转换", function () \{
			        function getString(nodes) \{
			            var str = [];
			            for (var i = 0, node; (node = nodes[i++]);) \{
			                if (node.nodeType === 8 && node.nodeValue.indexOf("react-text") !== 0) \{
			                    continue;
			                \}
			                str.push(node.nodeName.toLowerCase());
			            \}
			            return str.join(" ");
			        \}
			        var index = 0;
			        var map = [
			            <div>
			                1111<p>ddd</p>
			                <span>333</span>
			                <Link />
			            </div>,
			            <div>
			                <em>新的</em>
			                <span>111</span>222<span>333</span>
			                <b>444</b>
			                <Link />
			            </div>,
			            <div>
			                <span>33</span>
			            </div>
			        ];
			        function Link() \{
			            return index == 1 ? <strong>ddd</strong> : <i>ddd</i>;
			        \}
			        class App extends React.Component \{
			            constructor(props) \{
			                super(props);
			                this.state = \{
			                    aaa: "aaa"
			                \};
			            \}
			            change(a) \{
			                this.setState(\{
			                    aaa: a
			                \});
			            \}
			            componentDidMount() \{
			            \}
			            componentWillUpdate() \{
			            \}
			            render() \{
			                return map[index++];
			            \}
			        \}
			        var div = document.createElement("div")
			        var s = ReactDOM.render(<App />, div);
			
			        expect(getString(div.firstChild.childNodes)).toBe("#text p span strong");
			        s.change(100);
			        expect(getString(div.firstChild.childNodes)).toBe("em span #text span b i");
			        s.change(100);
			        expect(getString(div.firstChild.childNodes)).toBe("span");
			    \});
			
			    it("对一个容器节点反复渲染组件或元素 ", () => \{
			        class Comp extends React.Component \{
			            render() \{
			                return <span>span in a component</span>;
			            \}
			        \}
			        var div = document.createElement("div")
			        function test(content) \{
			            React.render(content, div);
			        \}
			
			        test(<Comp />);
			        test(<div>just a div</div>);
			        test(<Comp />);
			
			        expect(div.firstChild.innerHTML).toEqual("span in a component");
			    \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactChildren-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(45)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactContextValidator-test.js', () => {
        const sourceCode = `
			// This test doesn't really have a good home yet. I'm leaving it here since this
			// behavior belongs to the old propTypes system yet is currently implemented
			// in the core ReactCompositeComponent. It should technically live in core's
			// test suite but I'll leave it here to indicate that this is an issue that
			// needs to be fixed.
			
			'use strict';
			
			let PropTypes;
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			describe('ReactContextValidator', () => \{
				beforeEach(() => \{
					jest.resetModules();
			
					PropTypes = require('prop-types');
					React = require('react');
					ReactDOM = require('react-dom');
					ReactTestUtils = require('test-utils');
				\});
			
				// TODO: This behavior creates a runtime dependency on propTypes. We should
				// ensure that this is not required for ES6 classes with Flow.
			
				it('should filter out context not in contextTypes', () => \{
					class Component extends React.Component \{
						render() \{
							return <div />;
						\}
					\}
					Component.contextTypes = \{
						foo: PropTypes.string,
					\};
			
					class ComponentInFooBarContext extends React.Component \{
						getChildContext() \{
							return \{
								foo: 'abc',
								bar: 123,
							\};
						\}
			
						render() \{
							return <Component ref="child" />;
						\}
					\}
					ComponentInFooBarContext.childContextTypes = \{
						foo: PropTypes.string,
						bar: PropTypes.number,
					\};
			
					const instance = ReactTestUtils.renderIntoDocument(<ComponentInFooBarContext />);
					expect(instance.refs.child.context).toEqual(\{ foo: 'abc' \});
				\});
			
				it('should pass next context to lifecycles', () => \{
					let actualComponentWillReceiveProps;
					let actualShouldComponentUpdate;
					let actualComponentWillUpdate;
			
					class Parent extends React.Component \{
						getChildContext() \{
							return \{
								foo: this.props.foo,
								bar: 'bar',
							\};
						\}
			
						render() \{
							return <Component />;
						\}
					\}
					Parent.childContextTypes = \{
						foo: PropTypes.string.isRequired,
						bar: PropTypes.string.isRequired,
					\};
			
					class Component extends React.Component \{
						UNSAFE_componentWillReceiveProps(nextProps, nextContext) \{
							actualComponentWillReceiveProps = nextContext;
							return true;
						\}
			
						shouldComponentUpdate(nextProps, nextState, nextContext) \{
							actualShouldComponentUpdate = nextContext;
							return true;
						\}
			
						UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) \{
							actualComponentWillUpdate = nextContext;
						\}
			
						render() \{
							return <div />;
						\}
					\}
					Component.contextTypes = \{
						foo: PropTypes.string,
					\};
			
					const container = document.createElement('div');
					ReactDOM.render(<Parent foo="abc" />, container);
					ReactDOM.render(<Parent foo="def" />, container);
					expect(actualComponentWillReceiveProps).toEqual(\{ foo: 'def' \});
					expect(actualShouldComponentUpdate).toEqual(\{ foo: 'def' \});
					expect(actualComponentWillUpdate).toEqual(\{ foo: 'def' \});
				\});
				it('React.createContext 通过 Provider 传入数据', () => \{
			    const container = document.createElement('div');
					const ThemeContext = React.createContext('light');
			
					class CreateContext extends React.Component \{
						render() \{
							// Use a Provider to pass the current theme to the tree below.
							// Any component can read it, no matter how deep it is.
							// In this example, we're passing "dark" as the current value.
							return (
								<ThemeContext.Provider value="dark">
									<Toolbar />
								</ThemeContext.Provider>
							);
						\}
					\}
			
					// A component in the middle doesn't have to
					// pass the theme down explicitly anymore.
					function Toolbar(props) \{
						return (
							<div class="toolbar">
								<ThemedButton />
							</div>
						);
					\}
			    var theme = "light"
					function ThemedButton(props) \{
						// Use a Consumer to read the current theme context.
						// React will find the closest theme Provider above and use its value.
			      // In this example, the current theme is "dark".
			     
						return <ThemeContext.Consumer>\{theme => <Button \{...props\} theme=\{theme\} />\}</ThemeContext.Consumer>;
					\}
			
					function Button(props) \{
			      theme = props.theme;
						return (
							<div>
								正确值应该是传入的dark，现在传入值为：
								<span style=\{\{ color: 'red' \}\}>\{props.theme\}</span>
							</div>
						);
					\}
			    ReactDOM.render(<CreateContext />, container);
			    expect(theme).toBe("dark")
			    
				\});
				it('should check context types', () => \{
					class Component extends React.Component \{
						render() \{
							return <div />;
						\}
					\}
					Component.contextTypes = \{
						foo: PropTypes.string.isRequired,
					\};
			
					expect(() => ReactTestUtils.renderIntoDocument(<Component />)).toWarnDev(
						'Warning: Failed context type: ' +
							'The context \`foo\` is marked as required in \`Component\`, but its value ' +
							'is \`undefined\`.\\n' +
							'    in Component (at **)'
					);
			
					class ComponentInFooStringContext extends React.Component \{
						getChildContext() \{
							return \{
								foo: this.props.fooValue,
							\};
						\}
			
						render() \{
							return <Component />;
						\}
					\}
					ComponentInFooStringContext.childContextTypes = \{
						foo: PropTypes.string,
					\};
			
					// No additional errors expected
					ReactTestUtils.renderIntoDocument(<ComponentInFooStringContext fooValue=\{'bar'\} />);
			
					class ComponentInFooNumberContext extends React.Component \{
						getChildContext() \{
							return \{
								foo: this.props.fooValue,
							\};
						\}
			
						render() \{
							return <Component />;
						\}
					\}
					ComponentInFooNumberContext.childContextTypes = \{
						foo: PropTypes.number,
					\};
			
					expect(() => ReactTestUtils.renderIntoDocument(<ComponentInFooNumberContext fooValue=\{123\} />)).toWarnDev(
						'Warning: Failed context type: ' +
							'Invalid context \`foo\` of type \`number\` supplied ' +
							'to \`Component\`, expected \`string\`.\\n' +
							'    in Component (at **)\\n' +
							'    in ComponentInFooNumberContext (at **)'
					);
				\});
			
				it('should check child context types', () => \{
					class Component extends React.Component \{
						getChildContext() \{
							return this.props.testContext;
						\}
			
						render() \{
							return <div />;
						\}
					\}
					Component.childContextTypes = \{
						foo: PropTypes.string.isRequired,
						bar: PropTypes.number,
					\};
			
					expect(() => ReactTestUtils.renderIntoDocument(<Component testContext=\{\{ bar: 123 \}\} />)).toWarnDev(
						'Warning: Failed child context type: ' +
							'The child context \`foo\` is marked as required in \`Component\`, but its ' +
							'value is \`undefined\`.\\n' +
							'    in Component (at **)'
					);
			
					expect(() => ReactTestUtils.renderIntoDocument(<Component testContext=\{\{ foo: 123 \}\} />)).toWarnDev(
						'Warning: Failed child context type: ' +
							'Invalid child context \`foo\` of type \`number\` ' +
							'supplied to \`Component\`, expected \`string\`.\\n' +
							'    in Component (at **)'
					);
			
					// No additional errors expected
					ReactTestUtils.renderIntoDocument(<Component testContext=\{\{ foo: 'foo', bar: 123 \}\} />);
			
					ReactTestUtils.renderIntoDocument(<Component testContext=\{\{ foo: 'foo' \}\} />);
				\});
			
				// TODO (bvaughn) Remove this test and the associated behavior in the future.
				// It has only been added in Fiber to match the (unintentional) behavior in Stack.
				it('should warn (but not error) if getChildContext method is missing', () => \{
					class ComponentA extends React.Component \{
						static childContextTypes = \{
							foo: PropTypes.string.isRequired,
						\};
						render() \{
							return <div />;
						\}
					\}
					class ComponentB extends React.Component \{
						static childContextTypes = \{
							foo: PropTypes.string.isRequired,
						\};
						render() \{
							return <div />;
						\}
					\}
			
					expect(() => ReactTestUtils.renderIntoDocument(<ComponentA />)).toWarnDev(
						'Warning: ComponentA.childContextTypes is specified but there is no ' +
							'getChildContext() method on the instance. You can either define ' +
							'getChildContext() on ComponentA or remove childContextTypes from it.'
					);
			
					// Warnings should be deduped by component type
					ReactTestUtils.renderIntoDocument(<ComponentA />);
			
					expect(() => ReactTestUtils.renderIntoDocument(<ComponentB />)).toWarnDev(
						'Warning: ComponentB.childContextTypes is specified but there is no ' +
							'getChildContext() method on the instance. You can either define ' +
							'getChildContext() on ComponentB or remove childContextTypes from it.'
					);
				\});
			
				// TODO (bvaughn) Remove this test and the associated behavior in the future.
				// It has only been added in Fiber to match the (unintentional) behavior in Stack.
				it('should pass parent context if getChildContext method is missing', () => \{
					class ParentContextProvider extends React.Component \{
						static childContextTypes = \{
							foo: PropTypes.string,
						\};
						getChildContext() \{
							return \{
								foo: 'FOO',
							\};
						\}
						render() \{
							return <MiddleMissingContext />;
						\}
					\}
			
					class MiddleMissingContext extends React.Component \{
						static childContextTypes = \{
							bar: PropTypes.string.isRequired,
						\};
						render() \{
							return <ChildContextConsumer />;
						\}
					\}
			
					let childContext;
					class ChildContextConsumer extends React.Component \{
						render() \{
							childContext = this.context;
							return <div />;
						\}
					\}
					ChildContextConsumer.contextTypes = \{
						bar: PropTypes.string.isRequired,
						foo: PropTypes.string.isRequired,
					\};
			
					expect(() => ReactTestUtils.renderIntoDocument(<ParentContextProvider />)).toWarnDev([
						'Warning: MiddleMissingContext.childContextTypes is specified but there is no getChildContext() method on the ' +
							'instance. You can either define getChildContext() on MiddleMissingContext or remove childContextTypes from ' +
							'it.',
						'Warning: Failed context type: The context \`bar\` is marked as required in \`ChildContextConsumer\`, but its ' +
							'value is \`undefined\`.',
					]);
					expect(childContext.bar).toBeUndefined();
					expect(childContext.foo).toBe('FOO');
				\});
				it('setState后子组件的context处理', () => \{
					const container = document.createElement('div');
			
					class App extends React.Component \{
						state = \{
							text: 111,
						\};
						getChildContext() \{
							return \{
								table: \{
									title: 'title',
								\},
							\};
						\}
						static childContextTypes = \{
							table: function() \{
								return null;
							\},
						\};
						render() \{
							return (
								<div>
									<Head ref="head" className="xxx" />
								</div>
							);
						\}
					\}
			
					class Head extends React.Component \{
						constructor(a, b) \{
							super(a, b);
							this.state = \{
								a: 3333,
							\};
						\}
						render() \{
							return (
								<strong>
									\{this.state.a\}
									<b>\{this.context.table.title\}</b>
								</strong>
							);
						\}
					\}
			
					Head.contextTypes = \{
						table: function() \{
							return null;
						\},
					\};
			
					var a = ReactDOM.render(<App id="app" />, container);
					expect(container.textContent.trim()).toBe('3333title');
					a.refs.head.setState(\{
						a: 4444,
					\});
			
					expect(container.textContent.trim()).toBe('4444title');
				\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactContextValidator-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactElement-test.js', () => {
        const sourceCode = `
			/**
			 * Copyright (c) 2013-present, Facebook, Inc.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 *
			 * @emails react-core
			 */
			
			'use strict';
			
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			describe('ReactElement', () => \{
			    let ComponentClass;
			    let originalSymbol;
			
			    beforeEach(() => \{
			        jest.resetModules();
			
			        // Delete the native Symbol if we have one to ensure we test the
			        // unpolyfilled environment.
			        originalSymbol = global.Symbol;
			        global.Symbol = undefined;
			
			        React = require('react');
			        ReactDOM = require('react-dom');
			        ReactTestUtils = require('test-utils');
			        // NOTE: We're explicitly not using JSX here. This is intended to test
			        // classic JS without JSX.
			        ComponentClass = class extends React.Component \{
			            render() \{
			                return React.createElement('div');
			            \}
			        \};
			    \});
			
			    afterEach(() => \{
			        global.Symbol = originalSymbol;
			    \});
			
			    it('uses the fallback value when in an environment without Symbol', () => \{
			        expect(<div />.\$\$typeof).toBe(0xeac7);
			    \});
			
			    it('returns a complete element according to spec', () => \{
			        const element = React.createFactory(ComponentClass)();
			        expect(element.type).toBe(ComponentClass);
			        expect(element.key).toBe(null);
			        expect(element.ref).toBe(null);
			        if (__DEV__) \{
			            expect(Object.isFrozen(element)).toBe(true);
			            expect(Object.isFrozen(element.props)).toBe(true);
			        \}
			        expect(element.props).toEqual(\{\});
			    \});
			
			    it('should warn when \`key\` is being accessed on composite element', () => \{
			        const container = document.createElement('div');
			        class Child extends React.Component \{
			            render() \{
			                return <div> \{this.props.key\} </div>;
			            \}
			        \}
			        class Parent extends React.Component \{
			            render() \{
			                return (
			                    <div>
			                        <Child key="0" />
			                        <Child key="1" />
			                        <Child key="2" />
			                    </div>
			                );
			            \}
			        \}
			        expect(() => ReactDOM.render(<Parent />, container)).toWarnDev(
			            'Child: \`key\` is not a prop. Trying to access it will result ' +
			            'in \`undefined\` being returned. If you need to access the same ' +
			            'value within the child component, you should pass it as a different ' +
			            'prop. (https://fb.me/react-special-props)',
			        );
			    \});
			
			    it('should warn when \`key\` is being accessed on a host element', () => \{
			        const element = <div key="3" />;
			        expect(() => void element.props.key).toWarnDev(
			            'div: \`key\` is not a prop. Trying to access it will result ' +
			            'in \`undefined\` being returned. If you need to access the same ' +
			            'value within the child component, you should pass it as a different ' +
			            'prop. (https://fb.me/react-special-props)',
			        );
			    \});
			
			    it('should warn when \`ref\` is being accessed', () => \{
			        const container = document.createElement('div');
			        class Child extends React.Component \{
			            render() \{
			                return <div> \{this.props.ref\} </div>;
			            \}
			        \}
			        class Parent extends React.Component \{
			            render() \{
			                return (
			                    <div>
			                        <Child ref="childElement" />
			                    </div>
			                );
			            \}
			        \}
			        expect(() => ReactDOM.render(<Parent />, container)).toWarnDev(
			            'Child: \`ref\` is not a prop. Trying to access it will result ' +
			            'in \`undefined\` being returned. If you need to access the same ' +
			            'value within the child component, you should pass it as a different ' +
			            'prop. (https://fb.me/react-special-props)',
			        );
			    \});
			
			    it('allows a string to be passed as the type', () => \{
			        const element = React.createFactory('div')();
			        expect(element.type).toBe('div');
			        expect(element.key).toBe(null);
			        expect(element.ref).toBe(null);
			        if (__DEV__) \{
			            expect(Object.isFrozen(element)).toBe(true);
			            expect(Object.isFrozen(element.props)).toBe(true);
			        \}
			        expect(element.props).toEqual(\{\});
			    \});
			
			    it('returns an immutable element', () => \{
			        const element = React.createFactory(ComponentClass)();
			        if (__DEV__) \{
			            expect(() => (element.type = 'div')).toThrow();
			        \} else \{
			            expect(() => (element.type = 'div')).not.toThrow();
			        \}
			    \});
			
			    it('does not reuse the original config object', () => \{
			        const config = \{ foo: 1 \};
			        const element = React.createFactory(ComponentClass)(config);
			        expect(element.props.foo).toBe(1);
			        config.foo = 2;
			        expect(element.props.foo).toBe(1);
			    \});
			
			    it('does not fail if config has no prototype', () => \{
			        const config = Object.create(null, \{ foo: \{ value: 1, enumerable: true \} \});
			        const element = React.createFactory(ComponentClass)(config);
			        expect(element.props.foo).toBe(1);
			    \});
			
			    it('extracts key and ref from the config', () => \{
			        const element = React.createFactory(ComponentClass)(\{
			            key: '12',
			            ref: '34',
			            foo: '56',
			        \});
			        expect(element.type).toBe(ComponentClass);
			        expect(element.key).toBe('12');
			        expect(element.ref).toBe('34');
			        if (__DEV__) \{
			            expect(Object.isFrozen(element)).toBe(true);
			            expect(Object.isFrozen(element.props)).toBe(true);
			        \}
			        expect(element.props).toEqual(\{ foo: '56' \});
			    \});
			
			    it('extracts null key and ref', () => \{
			        const element = React.createFactory(ComponentClass)(\{
			            key: null,
			            ref: null,
			            foo: '12',
			        \});
			        expect(element.type).toBe(ComponentClass);
			        expect(element.key).toBe('null');
			        expect(element.ref).toBe(null);
			        if (__DEV__) \{
			            expect(Object.isFrozen(element)).toBe(true);
			            expect(Object.isFrozen(element.props)).toBe(true);
			        \}
			        expect(element.props).toEqual(\{ foo: '12' \});
			    \});
			
			    it('ignores undefined key and ref', () => \{
			        const props = \{
			            foo: '56',
			            key: undefined,
			            ref: undefined,
			        \};
			        const element = React.createFactory(ComponentClass)(props);
			        expect(element.type).toBe(ComponentClass);
			        expect(element.key).toBe(null);
			        expect(element.ref).toBe(null);
			        if (__DEV__) \{
			            expect(Object.isFrozen(element)).toBe(true);
			            expect(Object.isFrozen(element.props)).toBe(true);
			        \}
			        expect(element.props).toEqual(\{ foo: '56' \});
			    \});
			
			    it('ignores key and ref warning getters', () => \{
			        const elementA = React.createElement('div');
			        const elementB = React.createElement('div', elementA.props);
			        expect(elementB.key).toBe(null);
			        expect(elementB.ref).toBe(null);
			    \});
			
			    it('coerces the key to a string', () => \{
			        const element = React.createFactory(ComponentClass)(\{
			            key: 12,
			            foo: '56',
			        \});
			        expect(element.type).toBe(ComponentClass);
			        expect(element.key).toBe('12');
			        expect(element.ref).toBe(null);
			        if (__DEV__) \{
			            expect(Object.isFrozen(element)).toBe(true);
			            expect(Object.isFrozen(element.props)).toBe(true);
			        \}
			        expect(element.props).toEqual(\{ foo: '56' \});
			    \});
			
			    it('preserves the owner on the element', () => \{
			        return
			        const Component = React.createFactory(ComponentClass);
			        let element;
			
			        class Wrapper extends React.Component \{
			            render() \{
			                element = Component();
			                return element;
			            \}
			        \}
			
			        const instance = ReactTestUtils.renderIntoDocument(
			            React.createElement(Wrapper),
			        );
			        expect(element._owner.stateNode).toBe(instance);
			    \});
			
			    it('merges an additional argument onto the children prop', () => \{
			        const a = 1;
			        const element = React.createFactory(ComponentClass)(
			            \{
			                children: 'text',
			            \},
			            a,
			        );
			        expect(element.props.children).toBe(a);
			    \});
			
			    it('does not override children if no rest args are provided', () => \{
			        const element = React.createFactory(ComponentClass)(\{
			            children: 'text',
			        \});
			        expect(element.props.children).toBe('text');
			    \});
			
			    it('overrides children if null is provided as an argument', () => \{
			        const element = React.createFactory(ComponentClass)(
			            \{
			                children: 'text',
			            \},
			            null,
			        );
			        expect(element.props.children).toBe(null);
			    \});
			
			    it('merges rest arguments onto the children prop in an array', () => \{
			        const a = 1;
			        const b = 2;
			        const c = 3;
			        const element = React.createFactory(ComponentClass)(null, a, b, c);
			        expect(element.props.children).toEqual([1, 2, 3]);
			    \});
			
			    // NOTE: We're explicitly not using JSX here. This is intended to test
			    // classic JS without JSX.
			    it('allows static methods to be called using the type property', () => \{
			        class StaticMethodComponentClass extends React.Component \{
			            render() \{
			                return React.createElement('div');
			            \}
			        \}
			        StaticMethodComponentClass.someStaticMethod = () => 'someReturnValue';
			
			        const element = React.createElement(StaticMethodComponentClass);
			        expect(element.type.someStaticMethod()).toBe('someReturnValue');
			    \});
			
			    // NOTE: We're explicitly not using JSX here. This is intended to test
			    // classic JS without JSX.
			    it('identifies valid elements', () => \{
			        class Component extends React.Component \{
			            render() \{
			                return React.createElement('div');
			            \}
			        \}
			
			        expect(React.isValidElement(React.createElement('div'))).toEqual(true);
			        expect(React.isValidElement(React.createElement(Component))).toEqual(true);
			
			        expect(React.isValidElement(null)).toEqual(false);
			        expect(React.isValidElement(true)).toEqual(false);
			        expect(React.isValidElement(\{\})).toEqual(false);
			        expect(React.isValidElement('string')).toEqual(false);
			        expect(React.isValidElement(React.createFactory('div'))).toEqual(false);
			        expect(React.isValidElement(Component)).toEqual(false);
			        expect(React.isValidElement(\{ type: 'div', props: \{\} \})).toEqual(false);
			
			        const jsonElement = JSON.stringify(React.createElement('div'));
			        expect(React.isValidElement(JSON.parse(jsonElement))).toBe(true);
			    \});
			
			    // NOTE: We're explicitly not using JSX here. This is intended to test
			    // classic JS without JSX.
			    it('is indistinguishable from a plain object', () => \{
			        const element = React.createElement('div', \{ className: 'foo' \});
			        const object = \{\};
			        expect(element.constructor).toBe(object.constructor);
			    \});
			
			    // NOTE: We're explicitly not using JSX here. This is intended to test
			    // classic JS without JSX.
			    it('should use default prop value when removing a prop', () => \{
			        class Component extends React.Component \{
			            render() \{
			                return React.createElement('span');
			            \}
			        \}
			        Component.defaultProps = \{ fruit: 'persimmon' \};
			
			        const container = document.createElement('div');
			        const instance = ReactDOM.render(
			            React.createElement(Component, \{ fruit: 'mango' \}),
			            container,
			        );
			        expect(instance.props.fruit).toBe('mango');
			
			        ReactDOM.render(React.createElement(Component), container);
			        expect(instance.props.fruit).toBe('persimmon');
			    \});
			
			    // NOTE: We're explicitly not using JSX here. This is intended to test
			    // classic JS without JSX.
			    it('should normalize props with default values', () => \{
			        return
			        class Component extends React.Component \{
			            render() \{
			                return React.createElement('span', null, this.props.prop);
			            \}
			        \}
			        Component.defaultProps = \{ prop: 'testKey' \};
			
			        const instance = ReactTestUtils.renderIntoDocument(
			            React.createElement(Component),
			        );
			        expect(instance.props.prop).toBe('testKey');
			
			        const inst2 = ReactTestUtils.renderIntoDocument(
			            React.createElement(Component, \{ prop: null \}),
			        );
			        expect(inst2.props.prop).toBe(null);
			    \});
			
			    it('throws when changing a prop (in dev) after element creation', () => \{
			        return
			        class Outer extends React.Component \{
			            render() \{
			                const el = <div className="moo" />;
			
			                if (__DEV__) \{
			                    expect(function () \{
			                        el.props.className = 'quack';
			                    \}).toThrow();
			                    expect(el.props.className).toBe('moo');
			                \} else \{
			                    el.props.className = 'quack';
			                    expect(el.props.className).toBe('quack');
			                \}
			
			                return el;
			            \}
			        \}
			        const outer = ReactTestUtils.renderIntoDocument(<Outer color="orange" />);
			        if (__DEV__) \{
			            expect(ReactDOM.findDOMNode(outer).className).toBe('moo');
			        \} else \{
			            expect(ReactDOM.findDOMNode(outer).className).toBe('quack');
			        \}
			    \});
			
			    it('throws when adding a prop (in dev) after element creation', () => \{
			        return
			        const container = document.createElement('div');
			        class Outer extends React.Component \{
			            render() \{
			                const el = <div>\{this.props.sound\}</div>;
			
			                if (__DEV__) \{
			                    expect(function () \{
			                        el.props.className = 'quack';
			                    \}).toThrow();
			                    expect(el.props.className).toBe(undefined);
			                \} else \{
			                    el.props.className = 'quack';
			                    expect(el.props.className).toBe('quack');
			                \}
			
			                return el;
			            \}
			        \}
			        Outer.defaultProps = \{ sound: 'meow' \};
			        const outer = ReactDOM.render(<Outer />, container);
			        expect(ReactDOM.findDOMNode(outer).textContent).toBe('meow');
			        if (__DEV__) \{
			            expect(ReactDOM.findDOMNode(outer).className).toBe('');
			        \} else \{
			            expect(ReactDOM.findDOMNode(outer).className).toBe('quack');
			        \}
			    \});
			
			    it('does not warn for NaN props', () => \{
			        return
			        class Test extends React.Component \{
			            render() \{
			                return <div />;
			            \}
			        \}
			        const test = ReactTestUtils.renderIntoDocument(<Test value=\{+undefined\} />);
			        expect(test.props.value).toBeNaN();
			    \});
			
			    // NOTE: We're explicitly not using JSX here. This is intended to test
			    // classic JS without JSX.
			    it('identifies elements, but not JSON, if Symbols are supported', () => \{
			        // Rudimentary polyfill
			        // Once all jest engines support Symbols natively we can swap this to test
			        // WITH native Symbols by default.
			        const REACT_ELEMENT_TYPE = function () \{ \}; // fake Symbol
			        const OTHER_SYMBOL = function () \{ \}; // another fake Symbol
			        global.Symbol = function (name) \{
			            return OTHER_SYMBOL;
			        \};
			        global.Symbol.for = function (key) \{
			            if (key === 'react.element') \{
			                return REACT_ELEMENT_TYPE;
			            \}
			            return OTHER_SYMBOL;
			        \};
			
			        jest.resetModules();
			
			        React = require('react');
			
			        class Component extends React.Component \{
			            render() \{
			                return React.createElement('div');
			            \}
			        \}
			
			        expect(React.isValidElement(React.createElement('div'))).toEqual(true);
			        expect(React.isValidElement(React.createElement(Component))).toEqual(true);
			
			        expect(React.isValidElement(null)).toEqual(false);
			        expect(React.isValidElement(true)).toEqual(false);
			        expect(React.isValidElement(\{\})).toEqual(false);
			        expect(React.isValidElement('string')).toEqual(false);
			        expect(React.isValidElement(React.createFactory('div'))).toEqual(false);
			        expect(React.isValidElement(Component)).toEqual(false);
			        expect(React.isValidElement(\{ type: 'div', props: \{\} \})).toEqual(false);
			
			        const jsonElement = JSON.stringify(React.createElement('div'));
			        if (__DEV__) \{ //这个在不同nodejs环境有问题
			            expect(React.isValidElement(JSON.parse(jsonElement))).toBe(false);
			        \}
			    \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactElement-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(28)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactElementClone-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let PropTypes;
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			describe('ReactElementClone', () => \{
			  let ComponentClass;
			
			  beforeEach(() => \{
			    PropTypes = require('prop-types');
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			
			    // NOTE: We're explicitly not using JSX here. This is intended to test
			    // classic JS without JSX.
			    ComponentClass = class extends React.Component \{
			      render() \{
			        return React.createElement('div');
			      \}
			    \};
			  \});
			
			  it('should clone a DOM component with new props', () => \{
			    class Grandparent extends React.Component \{
			      render() \{
			        return <Parent child=\{<div className="child" />\} />;
			      \}
			    \}
			    class Parent extends React.Component \{
			      render() \{
			        return (
			          <div className="parent">
			            \{React.cloneElement(this.props.child, \{className: 'xyz'\})\}
			          </div>
			        );
			      \}
			    \}
			    const component = ReactTestUtils.renderIntoDocument(<Grandparent />);
			    expect(ReactDOM.findDOMNode(component).childNodes[0].className).toBe('xyz');
			  \});
			
			  it('should clone a composite component with new props', () => \{
			    class Child extends React.Component \{
			      render() \{
			        return <div className=\{this.props.className\} />;
			      \}
			    \}
			    class Grandparent extends React.Component \{
			      render() \{
			        return <Parent child=\{<Child className="child" />\} />;
			      \}
			    \}
			    class Parent extends React.Component \{
			      render() \{
			        return (
			          <div className="parent">
			            \{React.cloneElement(this.props.child, \{className: 'xyz'\})\}
			          </div>
			        );
			      \}
			    \}
			    const component = ReactTestUtils.renderIntoDocument(<Grandparent />);
			    expect(ReactDOM.findDOMNode(component).childNodes[0].className).toBe('xyz');
			  \});
			
			  it('does not fail if config has no prototype', () => \{
			    const config = Object.create(null, \{foo: \{value: 1, enumerable: true\}\});
			    React.cloneElement(<div />, config);
			  \});
			
			  it('should keep the original ref if it is not overridden', () => \{
			    class Grandparent extends React.Component \{
			      render() \{
			        return <Parent child=\{<div ref="yolo" />\} />;
			      \}
			    \}
			
			    class Parent extends React.Component \{
			      render() \{
			        return (
			          <div>\{React.cloneElement(this.props.child, \{className: 'xyz'\})\}</div>
			        );
			      \}
			    \}
			
			    const component = ReactTestUtils.renderIntoDocument(<Grandparent />);
			    expect(component.refs.yolo.tagName).toBe('DIV');
			  \});
			
			  it('should transfer the key property', () => \{
			    class Component extends React.Component \{
			      render() \{
			        return null;
			      \}
			    \}
			    const clone = React.cloneElement(<Component />, \{key: 'xyz'\});
			    expect(clone.key).toBe('xyz');
			  \});
			
			  it('should transfer children', () => \{
			    class Component extends React.Component \{
			      render() \{
			        expect(this.props.children).toBe('xyz');
			        return <div />;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(
			      React.cloneElement(<Component />, \{children: 'xyz'\}),
			    );
			  \});
			
			  it('should shallow clone children', () => \{
			    class Component extends React.Component \{
			      render() \{
			        expect(this.props.children).toBe('xyz');
			        return <div />;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(
			      React.cloneElement(<Component>xyz</Component>, \{\}),
			    );
			  \});
			
			  it('should accept children as rest arguments', () => \{
			    class Component extends React.Component \{
			      render() \{
			        return null;
			      \}
			    \}
			
			    const clone = React.cloneElement(
			      <Component>xyz</Component>,
			      \{children: <Component />\},
			      <div />,
			      <span />,
			    );
			
			    expect(clone.props.children).toEqual([<div />, <span />]);
			  \});
			
			  it('should override children if undefined is provided as an argument', () => \{
			    const element = React.createElement(
			      ComponentClass,
			      \{
			        children: 'text',
			      \},
			      undefined,
			    );
			    expect(element.props.children).toBe(undefined);
			
			    const element2 = React.cloneElement(
			      React.createElement(ComponentClass, \{
			        children: 'text',
			      \}),
			      \{\},
			      undefined,
			    );
			    expect(element2.props.children).toBe(undefined);
			  \});
			
			  it('should support keys and refs', () => \{
			    class Parent extends React.Component \{
			      render() \{
			        const clone = React.cloneElement(this.props.children, \{
			          key: 'xyz',
			          ref: 'xyz',
			        \});
			        expect(clone.key).toBe('xyz');
			        expect(clone.ref).toBe('xyz');
			        return <div>\{clone\}</div>;
			      \}
			    \}
			
			    class Grandparent extends React.Component \{
			      render() \{
			        return (
			          <Parent ref="parent">
			            <span key="abc" />
			          </Parent>
			        );
			      \}
			    \}
			
			    const component = ReactTestUtils.renderIntoDocument(<Grandparent />);
			    expect(component.refs.parent.refs.xyz.tagName).toBe('SPAN');
			  \});
			
			  it('should steal the ref if a new ref is specified', () => \{
			    class Parent extends React.Component \{
			      render() \{
			        const clone = React.cloneElement(this.props.children, \{ref: 'xyz'\});
			        return <div>\{clone\}</div>;
			      \}
			    \}
			
			    class Grandparent extends React.Component \{
			      render() \{
			        return (
			          <Parent ref="parent">
			            <span ref="child" />
			          </Parent>
			        );
			      \}
			    \}
			
			    const component = ReactTestUtils.renderIntoDocument(<Grandparent />);
			    expect(component.refs.child).toBeUndefined();
			    expect(component.refs.parent.refs.xyz.tagName).toBe('SPAN');
			  \});
			
			  it('should overwrite props', () => \{
			    class Component extends React.Component \{
			      render() \{
			        expect(this.props.myprop).toBe('xyz');
			        return <div />;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(
			      React.cloneElement(<Component myprop="abc" />, \{myprop: 'xyz'\}),
			    );
			  \});
			
			  it('should normalize props with default values', () => \{
			    class Component extends React.Component \{
			      render() \{
			        return <span />;
			      \}
			    \}
			    Component.defaultProps = \{prop: 'testKey'\};
			
			    const instance = React.createElement(Component);
			    const clonedInstance = React.cloneElement(instance, \{prop: undefined\});
			    expect(clonedInstance.props.prop).toBe('testKey');
			    const clonedInstance2 = React.cloneElement(instance, \{prop: null\});
			    expect(clonedInstance2.props.prop).toBe(null);
			
			    const instance2 = React.createElement(Component, \{prop: 'newTestKey'\});
			    const cloneInstance3 = React.cloneElement(instance2, \{prop: undefined\});
			    expect(cloneInstance3.props.prop).toBe('testKey');
			    const cloneInstance4 = React.cloneElement(instance2, \{\});
			    expect(cloneInstance4.props.prop).toBe('newTestKey');
			  \});
			
			  it('warns for keys for arrays of elements in rest args', () => \{
			    expect(() =>
			      React.cloneElement(<div />, null, [<div />, <div />]),
			    ).toWarnDev(
			      'Each child in an array or iterator should have a unique "key" prop.',
			    );
			  \});
			
			  it('does not warns for arrays of elements with keys', () => \{
			    React.cloneElement(<div />, null, [<div key="#1" />, <div key="#2" />]);
			  \});
			
			  it('does not warn when the element is directly in rest args', () => \{
			    React.cloneElement(<div />, null, <div />, <div />);
			  \});
			
			  it('does not warn when the array contains a non-element', () => \{
			    React.cloneElement(<div />, null, [\{\}, \{\}]);
			  \});
			
			  it('should check declared prop types after clone', () => \{
			    class Component extends React.Component \{
			      static propTypes = \{
			        color: PropTypes.string.isRequired,
			      \};
			      render() \{
			        return React.createElement('div', null, 'My color is ' + this.color);
			      \}
			    \}
			    class Parent extends React.Component \{
			      render() \{
			        return React.cloneElement(this.props.child, \{color: 123\});
			      \}
			    \}
			    class GrandParent extends React.Component \{
			      render() \{
			        return React.createElement(Parent, \{
			          child: React.createElement(Component, \{color: 'red'\}),
			        \});
			      \}
			    \}
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(React.createElement(GrandParent)),
			    ).toWarnDev(
			      'Warning: Failed prop type: ' +
			        'Invalid prop \`color\` of type \`number\` supplied to \`Component\`, ' +
			        'expected \`string\`.\\n' +
			        '    in Component (created by GrandParent)\\n' +
			        '    in Parent (created by GrandParent)\\n' +
			        '    in GrandParent',
			    );
			  \});
			
			  it('should ignore key and ref warning getters', () => \{
			    const elementA = React.createElement('div');
			    const elementB = React.cloneElement(elementA, elementA.props);
			    expect(elementB.key).toBe(null);
			    expect(elementB.ref).toBe(null);
			  \});
			
			  it('should ignore undefined key and ref', () => \{
			    const element = React.createFactory(ComponentClass)(\{
			      key: '12',
			      ref: '34',
			      foo: '56',
			    \});
			    const props = \{
			      key: undefined,
			      ref: undefined,
			      foo: 'ef',
			    \};
			    const clone = React.cloneElement(element, props);
			    expect(clone.type).toBe(ComponentClass);
			    expect(clone.key).toBe('12');
			    expect(clone.ref).toBe('34');
			    if (__DEV__) \{
			      expect(Object.isFrozen(element)).toBe(true);
			      expect(Object.isFrozen(element.props)).toBe(true);
			    \}
			    expect(clone.props).toEqual(\{foo: 'ef'\});
			  \});
			
			  it('should extract null key and ref', () => \{
			    const element = React.createFactory(ComponentClass)(\{
			      key: '12',
			      ref: '34',
			      foo: '56',
			    \});
			    const props = \{
			      key: null,
			      ref: null,
			      foo: 'ef',
			    \};
			    const clone = React.cloneElement(element, props);
			    expect(clone.type).toBe(ComponentClass);
			    expect(clone.key).toBe('null');
			    expect(clone.ref).toBe(null);
			    if (__DEV__) \{
			      expect(Object.isFrozen(element)).toBe(true);
			      expect(Object.isFrozen(element.props)).toBe(true);
			    \}
			    expect(clone.props).toEqual(\{foo: 'ef'\});
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactElementClone-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(21)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactElementValidator-test.internal.js', () => {
        const sourceCode = `
			
			let PropTypes;
			let ReactFeatureFlags;
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			describe('ReactElementValidator', () => \{
			  let ComponentClass;
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    PropTypes = require('prop-types');
			  //  ReactFeatureFlags = require('shared/ReactFeatureFlags');
			  //  ReactFeatureFlags.replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			    ComponentClass = class extends React.Component \{
			      render() \{
			        return React.createElement('div');
			      \}
			    \};
			  \});
			
			  it('warns for keys for arrays of elements in rest args', () => \{
			    const Component = React.createFactory(ComponentClass);
			
			    expect(() => \{
			      Component(null, [Component(), Component()]);
			    \}).toWarnDev(
			      'Each child in an array or iterator should have a unique "key" prop.',
			    );
			  \});
			
			  it('warns for keys for arrays of elements with owner info', () => \{
			    const Component = React.createFactory(ComponentClass);
			
			    class InnerClass extends React.Component \{
			      render() \{
			        return Component(null, this.props.childSet);
			      \}
			    \}
			
			    const InnerComponent = React.createFactory(InnerClass);
			
			    class ComponentWrapper extends React.Component \{
			      render() \{
			        return InnerComponent(\{childSet: [Component(), Component()]\});
			      \}
			    \}
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(React.createElement(ComponentWrapper));
			    \}).toWarnDev(
			      'Each child in an array or iterator should have a unique "key" prop.' +
			        '\\n\\nCheck the render method of \`InnerClass\`. ' +
			        'It was passed a child from ComponentWrapper. ',
			    );
			  \});
			
			  it('warns for keys for arrays with no owner or parent info', () => \{
			    function Anonymous() \{
			      return <div />;
			    \}
			    Object.defineProperty(Anonymous, 'name', \{value: undefined\});
			
			    const divs = [<div />, <div />];
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(<Anonymous>\{divs\}</Anonymous>);
			    \}).toWarnDev(
			      'Warning: Each child in an array or iterator should have a unique ' +
			        '"key" prop. See https://fb.me/react-warning-keys for more information.\\n' +
			        '    in div (at **)',
			    );
			  \});
			
			  it('warns for keys for arrays of elements with no owner info', () => \{
			    const divs = [<div />, <div />];
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(<div>\{divs\}</div>);
			    \}).toWarnDev(
			      'Warning: Each child in an array or iterator should have a unique ' +
			        '"key" prop.\\n\\nCheck the top-level render call using <div>. See ' +
			        'https://fb.me/react-warning-keys for more information.\\n' +
			        '    in div (at **)',
			    );
			  \});
			
			  it('warns for keys with component stack info', () => \{
			    function Component() \{
			      return <div>\{[<div />, <div />]\}</div>;
			    \}
			
			    function Parent(props) \{
			      return React.cloneElement(props.child);
			    \}
			
			    function GrandParent() \{
			      return <Parent child=\{<Component />\} />;
			    \}
			
			    expect(() => ReactTestUtils.renderIntoDocument(<GrandParent />)).toWarnDev(
			      'Warning: Each child in an array or iterator should have a unique ' +
			        '"key" prop.\\n\\nCheck the render method of \`Component\`. See ' +
			        'https://fb.me/react-warning-keys for more information.\\n' +
			        '    in div (at **)\\n' +
			        '    in Component (at **)\\n' +
			        '    in Parent (at **)\\n' +
			        '    in GrandParent (at **)',
			    );
			  \});
			
			  it('does not warn for keys when passing children down', () => \{
			    function Wrapper(props) \{
			      return (
			        <div>
			          \{props.children\}
			          <footer />
			        </div>
			      );
			    \}
			
			    ReactTestUtils.renderIntoDocument(
			      <Wrapper>
			        <span />
			        <span />
			      </Wrapper>,
			    );
			  \});
			
			  it('warns for keys for iterables of elements in rest args', () => \{
			    const Component = React.createFactory(ComponentClass);
			
			    const iterable = \{
			      '@@iterator': function() \{
			        let i = 0;
			        return \{
			          next: function() \{
			            const done = ++i > 2;
			            return \{value: done ? undefined : Component(), done: done\};
			          \},
			        \};
			      \},
			    \};
			
			    expect(() => Component(null, iterable)).toWarnDev(
			      'Each child in an array or iterator should have a unique "key" prop.',
			    );
			  \});
			
			  it('does not warns for arrays of elements with keys', () => \{
			    const Component = React.createFactory(ComponentClass);
			
			    Component(null, [Component(\{key: '#1'\}), Component(\{key: '#2'\})]);
			  \});
			
			  it('does not warns for iterable elements with keys', () => \{
			    const Component = React.createFactory(ComponentClass);
			
			    const iterable = \{
			      '@@iterator': function() \{
			        let i = 0;
			        return \{
			          next: function() \{
			            const done = ++i > 2;
			            return \{
			              value: done ? undefined : Component(\{key: '#' + i\}),
			              done: done,
			            \};
			          \},
			        \};
			      \},
			    \};
			
			    Component(null, iterable);
			  \});
			
			  it('does not warn when the element is directly in rest args', () => \{
			    const Component = React.createFactory(ComponentClass);
			
			    Component(null, Component(), Component());
			  \});
			
			  it('does not warn when the array contains a non-element', () => \{
			    const Component = React.createFactory(ComponentClass);
			
			    Component(null, [\{\}, \{\}]);
			  \});
			
			  it('should give context for PropType errors in nested components.', () => \{
			    // In this test, we're making sure that if a proptype error is found in a
			    // component, we give a small hint as to which parent instantiated that
			    // component as per warnings about key usage in ReactElementValidator.
			    function MyComp(props) \{
			      return React.createElement('div', null, 'My color is ' + props.color);
			    \}
			    MyComp.propTypes = \{
			      color: PropTypes.string,
			    \};
			    function ParentComp() \{
			      return React.createElement(MyComp, \{color: 123\});
			    \}
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(React.createElement(ParentComp));
			    \}).toWarnDev(
			      'Warning: Failed prop type: ' +
			        'Invalid prop \`color\` of type \`number\` supplied to \`MyComp\`, ' +
			        'expected \`string\`.\\n' +
			        '    in MyComp (created by ParentComp)\\n' +
			        '    in ParentComp',
			    );
			  \});
			
			  it('gives a helpful error when passing invalid types', () => \{
			    expect(() => \{
			      React.createElement(undefined);
			      React.createElement(null);
			      React.createElement(true);
			      React.createElement(\{x: 17\});
			      React.createElement(\{\});
			    \}).toThrow();
			
			    // Should not log any additional warnings
			    React.createElement('div');
			  \});
			
			  it('includes the owner name when passing null, undefined, boolean, or number', () => \{
			    function ParentComp() \{
			      return React.createElement(null);
			    \}
			
			    expect(() => \{
			      expect(() => \{
			        ReactTestUtils.renderIntoDocument(React.createElement(ParentComp));
			      \}).toThrow(
			      );
			    \}).toWarnDev(
			      'children中存在非法的对象',
			    );
			  \});
			
			  it('should check default prop values', () => \{
			    class Component extends React.Component \{
			      static propTypes = \{prop: PropTypes.string.isRequired\};
			      static defaultProps = \{prop: null\};
			      render() \{
			        return React.createElement('span', null, this.props.prop);
			      \}
			    \}
			
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(React.createElement(Component)),
			    ).toWarnDev(
			      'Warning: Failed prop type: The prop \`prop\` is marked as required in ' +
			        '\`Component\`, but its value is \`null\`.\\n' +
			        '    in Component',
			    );
			  \});
			
			  it('should not check the default for explicit null', () => \{
			    class Component extends React.Component \{
			      static propTypes = \{prop: PropTypes.string.isRequired\};
			      static defaultProps = \{prop: 'text'\};
			      render() \{
			        return React.createElement('span', null, this.props.prop);
			      \}
			    \}
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(
			        React.createElement(Component, \{prop: null\}),
			      );
			    \}).toWarnDev(
			      'Warning: Failed prop type: The prop \`prop\` is marked as required in ' +
			        '\`Component\`, but its value is \`null\`.\\n' +
			        '    in Component',
			    );
			  \});
			
			  it('should check declared prop types', () => \{
			    class Component extends React.Component \{
			      static propTypes = \{
			        prop: PropTypes.string.isRequired,
			      \};
			      render() \{
			        return React.createElement('span', null, this.props.prop);
			      \}
			    \}
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(React.createElement(Component));
			      ReactTestUtils.renderIntoDocument(
			        React.createElement(Component, \{prop: 42\}),
			      );
			    \}).toWarnDev([
			      'Warning: Failed prop type: ' +
			        'The prop \`prop\` is marked as required in \`Component\`, but its value ' +
			        'is \`undefined\`.\\n' +
			        '    in Component',
			      'Warning: Failed prop type: ' +
			        'Invalid prop \`prop\` of type \`number\` supplied to ' +
			        '\`Component\`, expected \`string\`.\\n' +
			        '    in Component',
			    ]);
			
			    // Should not error for strings
			    ReactTestUtils.renderIntoDocument(
			      React.createElement(Component, \{prop: 'string'\}),
			    );
			  \});
			
			  it('should warn if a PropType creator is used as a PropType', () => \{
			    class Component extends React.Component \{
			      static propTypes = \{
			        myProp: PropTypes.shape,
			      \};
			      render() \{
			        return React.createElement('span', null, this.props.myProp.value);
			      \}
			    \}
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(
			        React.createElement(Component, \{myProp: \{value: 'hi'\}\}),
			      );
			    \}).toWarnDev(
			      'Warning: Component: type specification of prop \`myProp\` is invalid; ' +
			        'the type checker function must return \`null\` or an \`Error\` but ' +
			        'returned a function. You may have forgotten to pass an argument to ' +
			        'the type checker creator (arrayOf, instanceOf, objectOf, oneOf, ' +
			        'oneOfType, and shape all require an argument).',
			    );
			  \});
			
			  it('should warn if component declares PropTypes instead of propTypes', () => \{
			    class MisspelledPropTypesComponent extends React.Component \{
			      static PropTypes = \{
			        prop: PropTypes.string,
			      \};
			      render() \{
			        return React.createElement('span', null, this.props.prop);
			      \}
			    \}
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(
			        React.createElement(MisspelledPropTypesComponent, \{prop: 'Hi'\}),
			      );
			    \}).toWarnDev(
			      'Warning: Component MisspelledPropTypesComponent declared \`PropTypes\` ' +
			        'instead of \`propTypes\`. Did you misspell the property assignment?',
			    );
			  \});
			
			  it('should warn when accessing .type on an element factory', () => \{
			    function TestComponent() \{
			      return <div />;
			    \}
			
			    let TestFactory = React.createFactory(TestComponent);
			    expect(() => TestFactory.type).toLowPriorityWarnDev(
			      'Warning: Factory.type is deprecated. Access the class directly before ' +
			        'passing it to createFactory.',
			    );
			
			    // Warn once, not again
			    expect(TestFactory.type).toBe(TestComponent);
			  \});
			
			  it('does not warn when using DOM node as children', () => \{
			    class DOMContainer extends React.Component \{
			      render() \{
			        return <div />;
			      \}
			      componentDidMount() \{
			        ReactDOM.findDOMNode(this).appendChild(this.props.children);
			      \}
			    \}
			
			    const node = document.createElement('div');
			    // This shouldn't cause a stack overflow or any other problems (#3883)
			    ReactTestUtils.renderIntoDocument(<DOMContainer>\{node\}</DOMContainer>);
			  \});
			
			  it('should not enumerate enumerable numbers (#4776)', () => \{
			    /*eslint-disable no-extend-native */
			    Number.prototype['@@iterator'] = function() \{
			      throw new Error('number iterator called');
			    \};
			    /*eslint-enable no-extend-native */
			
			    try \{
			      void (
			        <div>
			          \{5\}
			          \{12\}
			          \{13\}
			        </div>
			      );
			    \} finally \{
			      delete Number.prototype['@@iterator'];
			    \}
			  \});
			
			  it('does not blow up with inlined children', () => \{
			    // We don't suggest this since it silences all sorts of warnings, but we
			    // shouldn't blow up either.
			
			    const child = \{
			      \$\$typeof: <div />.\$\$typeof,
			      type: 'span',
			      key: null,
			      ref: null,
			      props: \{\},
			      _owner: null,
			    \};
			
			    void <div>\{[child]\}</div>;
			  \});
			
			  it('does not blow up on key warning with undefined type', () => \{
			    const Foo = undefined;
			    expect(() => \{
			      void <Foo>\{[<div />]\}</Foo>;
			    \}).toThrow(
			      "React.createElement: type is invalid."
			     /* 'Warning: React.createElement: type is invalid -- expected a string ' +
			        '(for built-in components) or a class/function (for composite ' +
			        'components) but got: undefined. You likely forgot to export your ' +
			        "component from the file it's defined in, or you might have mixed up " +
			        'default and named imports.\\n\\nCheck your code at **.',*/
			    );
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactElementValidator-test.internal.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(24)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactES6Class-test.js', () => {
        const sourceCode = `
			let PropTypes;
			let React;
			let ReactDOM;
			
			describe('ReactES6Class', () => \{
			  let container;
			  const freeze = function (expectation) \{
			    Object.freeze(expectation);
			    return expectation;
			  \};
			  let Inner;
			  let attachedListener = null;
			  let renderedName = null;
			
			  beforeEach(() => \{
			
			    React = require('react');
			    PropTypes = React.PropTypes;
			    ReactDOM = require('react-dom');
			    container = document.createElement('div');
			    attachedListener = null;
			    renderedName = null;
			    Inner = class extends React.Component \{
			      getName() \{
			        return this.props.name;
			      \}
			      render() \{
			        attachedListener = this.props.onClick;
			        renderedName = this.props.name;
			        return <div className=\{this.props.name\} />;
			      \}
			    \};
			  \});
			
			  function test(element, expectedTag, expectedClassName) \{
			    const instance = ReactDOM.render(element, container);
			    expect(container.firstChild).not.toBeNull();
			    expect(container.firstChild.tagName).toBe(expectedTag);
			    expect(container.firstChild.className).toBe(expectedClassName);
			    return instance;
			  \}
			
			  it('preserves the name of the class for use in error messages', () => \{
			    class Foo extends React.Component \{ \}
			    expect(Foo.name).toBe('Foo');
			  \});
			
			  it('throws if no render function is defined', () => \{
			    class Foo extends React.Component \{ \}
			    expect(() =>
			      expect(() => ReactDOM.render(<Foo />, container)).toThrow(),
			    ).toWarnDev([
			      // A failed component renders twice in DEV
			      'Warning: Foo(...): No \`render\` method found on the returned component ' +
			      'instance: you may have forgotten to define \`render\`.',
			      'Warning: Foo(...): No \`render\` method found on the returned component ' +
			      'instance: you may have forgotten to define \`render\`.',
			    ]);
			  \});
			
			  it('renders a simple stateless component with prop', () => \{
			    class Foo extends React.Component \{
			      render() \{
			        return <Inner name=\{this.props.bar\} />;
			      \}
			    \}
			    test(<Foo bar="foo" />, 'DIV', 'foo');
			    test(<Foo bar="bar" />, 'DIV', 'bar');
			  \});
			
			  it('renders based on state using initial values in this.props', () => \{
			    class Foo extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{ bar: this.props.initialValue \};
			      \}
			      render() \{
			        return <span className=\{this.state.bar\} />;
			      \}
			    \}
			    test(<Foo initialValue="foo" />, 'SPAN', 'foo');
			  \});
			
			  it('renders based on state using props in the constructor', () => \{
			    class Foo extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{ bar: props.initialValue \};
			      \}
			      changeState() \{
			        this.setState(\{ bar: 'bar' \});
			      \}
			      render() \{
			        if (this.state.bar === 'foo') \{
			          return <div className="foo" />;
			        \}
			        return <span className=\{this.state.bar\} />;
			      \}
			    \}
			    const instance = test(<Foo initialValue="foo" />, 'DIV', 'foo');
			    instance.changeState();
			    test(<Foo />, 'SPAN', 'bar');
			  \});
			
			  it('sets initial state with value returned by static getDerivedStateFromProps', () => \{
			    class Foo extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps(nextProps, prevState) \{
			        return \{
			          foo: nextProps.foo,
			          bar: 'bar',
			        \};
			      \}
			      render() \{
			        return <div className=\{\`\$\{this.state.foo\} \$\{this.state.bar\}\`\} />;
			      \}
			    \}
			    test(<Foo foo="foo" />, 'DIV', 'foo bar');
			  \});
			
			  it('warns if getDerivedStateFromProps is not static', () => \{
			    class Foo extends React.Component \{
			      getDerivedStateFromProps() \{
			        return \{\};
			      \}
			      render() \{
			        return <div />;
			      \}
			    \}
			    expect(() => ReactDOM.render(<Foo foo="foo" />, container)).toWarnDev(
			      'Foo: getDerivedStateFromProps() is defined as an instance method ' +
			      'and will be ignored. Instead, declare it as a static method.',
			    );
			  \});
			
			  it('warns if getDerivedStateFromCatch is not static', () => \{
			    class Foo extends React.Component \{
			      getDerivedStateFromCatch() \{
			        return \{\};
			      \}
			      render() \{
			        return <div />;
			      \}
			    \}
			    expect(() => ReactDOM.render(<Foo foo="foo" />, container)).toWarnDev(
			      'Foo: getDerivedStateFromCatch() is defined as an instance method ' +
			      'and will be ignored. Instead, declare it as a static method.',
			    );
			  \});
			
			  it('warns if getSnapshotBeforeUpdate is static', () => \{
			    class Foo extends React.Component \{
			      static getSnapshotBeforeUpdate() \{ \}
			      render() \{
			        return <div />;
			      \}
			    \}
			    expect(() => ReactDOM.render(<Foo foo="foo" />, container)).toWarnDev(
			      'Foo: getSnapshotBeforeUpdate() is defined as a static method ' +
			      'and will be ignored. Instead, declare it as an instance method.',
			    );
			  \});
			
			  it('warns if state not initialized before static getDerivedStateFromProps', () => \{
			    class Foo extends React.Component \{
			      static getDerivedStateFromProps(nextProps, prevState) \{
			        return \{
			          foo: nextProps.foo,
			          bar: 'bar',
			        \};
			      \}
			      render() \{
			        return <div className=\{\`\$\{this.state.foo\} \$\{this.state.bar\}\`\} />;
			      \}
			    \}
			    expect(() => ReactDOM.render(<Foo foo="foo" />, container)).toWarnDev(
			      'Foo: Did not properly initialize state during construction. ' +
			      'Expected state to be an object, but it was undefined.',
			    );
			  \});
			
			  it('updates initial state with values returned by static getDerivedStateFromProps', () => \{
			    class Foo extends React.Component \{
			      state = \{
			        foo: 'foo',
			        bar: 'bar',
			      \};
			      static getDerivedStateFromProps(nextProps, prevState) \{
			        return \{
			          foo: \`not-\$\{prevState.foo\}\`,
			        \};
			      \}
			      render() \{
			        return <div className=\{\`\$\{this.state.foo\} \$\{this.state.bar\}\`\} />;
			      \}
			    \}
			    test(<Foo />, 'DIV', 'not-foo bar');
			  \});
			
			  it('renders updated state with values returned by static getDerivedStateFromProps', () => \{
			    class Foo extends React.Component \{
			      state = \{
			        value: 'initial',
			      \};
			      static getDerivedStateFromProps(nextProps, prevState) \{
			        if (nextProps.update) \{
			          return \{
			            value: 'updated',
			          \};
			        \}
			        return null;
			      \}
			      render() \{
			        return <div className=\{this.state.value\} />;
			      \}
			    \}
			    test(<Foo update=\{false\} />, 'DIV', 'initial');
			    test(<Foo update=\{true\} />, 'DIV', 'updated');
			  \});
			
			  it('renders based on context in the constructor', () => \{
			    class Foo extends React.Component \{
			      constructor(props, context) \{
			        super(props, context);
			        this.state = \{ tag: context.tag, className: this.context.className \};
			      \}
			      render() \{
			        const Tag = this.state.tag;
			        return <Tag className=\{this.state.className\} />;
			      \}
			    \}
			    Foo.contextTypes = \{
			      tag: PropTypes.string,
			      className: PropTypes.string,
			    \};
			
			    class Outer extends React.Component \{
			      getChildContext() \{
			        return \{ tag: 'span', className: 'foo' \};
			      \}
			      render() \{
			        return <Foo />;
			      \}
			    \}
			    Outer.childContextTypes = \{
			      tag: PropTypes.string,
			      className: PropTypes.string,
			    \};
			    test(<Outer />, 'SPAN', 'foo');
			  \});
			
			  it('renders only once when setting state in componentWillMount', () => \{
			    let renderCount = 0;
			    class Foo extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{ bar: props.initialValue \};
			      \}
			      UNSAFE_componentWillMount() \{
			        this.setState(\{ bar: 'bar' \});
			      \}
			      render() \{
			        renderCount++;
			        return <span className=\{this.state.bar\} />;
			      \}
			    \}
			    test(<Foo initialValue="foo" />, 'SPAN', 'bar');
			    expect(renderCount).toBe(1);
			  \});
			
			  it('should warn with non-object in the initial state property', () => \{
			    [['an array'], 'a string', 1234].forEach(function (state) \{
			      class Foo extends React.Component \{
			        constructor() \{
			          super();
			          this.state = state;
			        \}
			        render() \{
			          return <span />;
			        \}
			      \}
			      expect(() => test(<Foo />, 'SPAN', '')).toWarnDev(
			        'Foo.state: must be set to an object or null',
			      );
			    \});
			  \});
			
			  it('should render with null in the initial state property', () => \{
			    class Foo extends React.Component \{
			      constructor() \{
			        super();
			        this.state = null;
			      \}
			      render() \{
			        return <span />;
			      \}
			    \}
			    test(<Foo />, 'SPAN', '');
			  \});
			
			  it('setState through an event handler', () => \{
			    class Foo extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{ bar: props.initialValue \};
			      \}
			      handleClick() \{
			        this.setState(\{ bar: 'bar' \});
			      \}
			      render() \{
			        return (
			          <Inner name=\{this.state.bar\} onClick=\{this.handleClick.bind(this)\} />
			        );
			      \}
			    \}
			    test(<Foo initialValue="foo" />, 'DIV', 'foo');
			    attachedListener();
			    expect(renderedName).toBe('bar');
			  \});
			
			  it('should not implicitly bind event handlers', () => \{
			    class Foo extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{ bar: props.initialValue \};
			      \}
			      handleClick() \{
			        this.setState(\{ bar: 'bar' \});
			      \}
			      render() \{
			        return <Inner name=\{this.state.bar\} onClick=\{this.handleClick\} />;
			      \}
			    \}
			    test(<Foo initialValue="foo" />, 'DIV', 'foo');
			    expect(attachedListener).toThrow();
			  \});
			
			  it('renders using forceUpdate even when there is no state', () => \{
			    class Foo extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.mutativeValue = props.initialValue;
			      \}
			      handleClick() \{
			        this.mutativeValue = 'bar';
			        this.forceUpdate();
			      \}
			      render() \{
			        return (
			          <Inner
			            name=\{this.mutativeValue\}
			            onClick=\{this.handleClick.bind(this)\}
			          />
			        );
			      \}
			    \}
			    test(<Foo initialValue="foo" />, 'DIV', 'foo');
			    attachedListener();
			    expect(renderedName).toBe('bar');
			  \});
			
			  it('will call all the normal life cycle methods', () => \{
			    let lifeCycles = [];
			    class Foo extends React.Component \{
			      constructor() \{
			        super();
			        this.state = \{\};
			      \}
			      UNSAFE_componentWillMount() \{
			        lifeCycles.push('will-mount');
			      \}
			      componentDidMount() \{
			        lifeCycles.push('did-mount');
			      \}
			      UNSAFE_componentWillReceiveProps(nextProps) \{
			        lifeCycles.push('receive-props', nextProps);
			      \}
			      shouldComponentUpdate(nextProps, nextState) \{
			        lifeCycles.push('should-update', nextProps, nextState);
			        return true;
			      \}
			      UNSAFE_componentWillUpdate(nextProps, nextState) \{
			        lifeCycles.push('will-update', nextProps, nextState);
			      \}
			      componentDidUpdate(prevProps, prevState) \{
			        lifeCycles.push('did-update', prevProps, prevState);
			      \}
			      componentWillUnmount() \{
			        lifeCycles.push('will-unmount');
			      \}
			      render() \{
			        return <span className=\{this.props.value\} />;
			      \}
			    \}
			    test(<Foo value="foo" />, 'SPAN', 'foo');
			    expect(lifeCycles).toEqual(['will-mount', 'did-mount']);
			    lifeCycles = []; // reset
			    test(<Foo value="bar" />, 'SPAN', 'bar');
			    // prettier-ignore
			    expect(lifeCycles).toEqual([
			      'receive-props', freeze(\{ value: 'bar' \}),
			      'should-update', freeze(\{ value: 'bar' \}), \{\},
			      'will-update', freeze(\{ value: 'bar' \}), \{\},
			      'did-update', freeze(\{ value: 'foo' \}), \{\},
			    ]);
			    lifeCycles = []; // reset
			    ReactDOM.unmountComponentAtNode(container);
			    expect(lifeCycles).toEqual(['will-unmount']);
			  \});
			
			  it('warns when classic properties are defined on the instance, but does not invoke them.', () => \{
			    let getDefaultPropsWasCalled = false;
			    let getInitialStateWasCalled = false;
			    class Foo extends React.Component \{
			      constructor() \{
			        super();
			        this.contextTypes = \{\};
			        this.propTypes = \{\};
			      \}
			      getInitialState() \{
			        getInitialStateWasCalled = true;
			        return \{\};
			      \}
			      getDefaultProps() \{
			        getDefaultPropsWasCalled = true;
			        return \{\};
			      \}
			      render() \{
			        return <span className="foo" />;
			      \}
			    \}
			
			    expect(() => test(<Foo />, 'SPAN', 'foo')).toWarnDev([
			      'getInitialState was defined on Foo, a plain JavaScript class.',
			      'getDefaultProps was defined on Foo, a plain JavaScript class.',
			      'propTypes was defined as an instance property on Foo.',
			      'contextTypes was defined as an instance property on Foo.',
			    ]);
			    expect(getInitialStateWasCalled).toBe(false);
			    expect(getDefaultPropsWasCalled).toBe(false);
			  \});
			
			  it('does not warn about getInitialState() on class components if state is also defined.', () => \{
			    class Foo extends React.Component \{
			      state = this.getInitialState();
			      getInitialState() \{
			        return \{\};
			      \}
			      render() \{
			        return <span className="foo" />;
			      \}
			    \}
			    test(<Foo />, 'SPAN', 'foo');
			  \});
			
			  it('should warn when misspelling shouldComponentUpdate', () => \{
			    class NamedComponent extends React.Component \{
			      componentShouldUpdate() \{
			        return false;
			      \}
			      render() \{
			        return <span className="foo" />;
			      \}
			    \}
			
			    expect(() => test(<NamedComponent />, 'SPAN', 'foo')).toWarnDev(
			      'Warning: ' +
			      'NamedComponent has a method called componentShouldUpdate(). Did you ' +
			      'mean shouldComponentUpdate()? The name is phrased as a question ' +
			      'because the function is expected to return a value.',
			    );
			  \});
			
			  it('should warn when misspelling componentWillReceiveProps', () => \{
			    class NamedComponent extends React.Component \{
			      componentWillRecieveProps() \{
			        return false;
			      \}
			      render() \{
			        return <span className="foo" />;
			      \}
			    \}
			
			    expect(() => test(<NamedComponent />, 'SPAN', 'foo')).toWarnDev(
			      'Warning: ' +
			      'NamedComponent has a method called componentWillRecieveProps(). Did ' +
			      'you mean componentWillReceiveProps()?',
			    );
			  \});
			
			  it('should warn when misspelling UNSAFE_componentWillReceiveProps', () => \{
			    class NamedComponent extends React.Component \{
			      UNSAFE_componentWillRecieveProps() \{
			        return false;
			      \}
			      render() \{
			        return <span className="foo" />;
			      \}
			    \}
			
			    expect(() => test(<NamedComponent />, 'SPAN', 'foo')).toWarnDev(
			      'Warning: ' +
			      'NamedComponent has a method called UNSAFE_componentWillRecieveProps(). ' +
			      'Did you mean UNSAFE_componentWillReceiveProps()?',
			    );
			  \});
			
			  it('should throw AND warn when trying to access classic APIs', () => \{
			
			    const instance = test(<Inner name="foo" />, 'DIV', 'foo');
			    expect(() =>
			      instance.replaceState(\{\})
			    ).toThrow(
			    )
			    expect(() =>
			      instance.isMounted()
			    ).toThrow(
			    );
			  \});
			
			  it('supports this.context passed via getChildContext', () => \{
			    class Bar extends React.Component \{
			      render() \{
			        return <div className=\{this.context.bar\} />;
			      \}
			    \}
			    Bar.contextTypes = \{ bar: PropTypes.string \};
			    class Foo extends React.Component \{
			      getChildContext() \{
			        return \{ bar: 'bar-through-context' \};
			      \}
			      render() \{
			        return <Bar />;
			      \}
			    \}
			    Foo.childContextTypes = \{ bar: PropTypes.string \};
			    test(<Foo />, 'DIV', 'bar-through-context');
			  \});
			
			  it('supports classic refs', () => \{
			    class Foo extends React.Component \{
			      render() \{
			        return <Inner name="foo" ref="inner" />;
			      \}
			    \}
			    const instance = test(<Foo />, 'DIV', 'foo');
			    expect(instance.refs.inner.getName()).toBe('foo');
			  \});
			
			  it('supports drilling through to the DOM using findDOMNode', () => \{
			    const instance = test(<Inner name="foo" />, 'DIV', 'foo');
			    const node = ReactDOM.findDOMNode(instance);
			    expect(node).toBe(container.firstChild);
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactES6Class-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(56)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactJSXElement-test.js', () => {
        const sourceCode = `
			
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			describe('ReactJSXElement', () => \{
			  let Component;
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			    Component = class extends React.Component \{
			      render() \{
			        return <div />;
			      \}
			    \};
			  \});
			
			  it('returns a complete element according to spec', () => \{
			    const element = <Component />;
			    expect(element.type).toBe(Component);
			    expect(element.key).toBe(null);
			    expect(element.ref).toBe(null);
			    const expectation = \{\};
			    Object.freeze(expectation);
			    expect(element.props).toEqual(expectation);
			  \});
			
			  it('allows a lower-case to be passed as the string type', () => \{
			    const element = <div />;
			    expect(element.type).toBe('div');
			    expect(element.key).toBe(null);
			    expect(element.ref).toBe(null);
			    const expectation = \{\};
			    Object.freeze(expectation);
			    expect(element.props).toEqual(expectation);
			  \});
			
			  it('allows a string to be passed as the type', () => \{
			    const TagName = 'div';
			    const element = <TagName />;
			    expect(element.type).toBe('div');
			    expect(element.key).toBe(null);
			    expect(element.ref).toBe(null);
			    const expectation = \{\};
			    Object.freeze(expectation);
			    expect(element.props).toEqual(expectation);
			  \});
			
			  it('returns an immutable element', () => \{
			    const element = <Component />;
			    if (__DEV__) \{
			      expect(() => (element.type = 'div')).toThrow();
			    \} else \{
			      expect(() => (element.type = 'div')).not.toThrow();
			    \}
			  \});
			
			  it('does not reuse the object that is spread into props', () => \{
			    const config = \{foo: 1\};
			    const element = <Component \{...config\} />;
			    expect(element.props.foo).toBe(1);
			    config.foo = 2;
			    expect(element.props.foo).toBe(1);
			  \});
			
			  it('extracts key and ref from the rest of the props', () => \{
			    const element = <Component key="12" ref="34" foo="56" />;
			    expect(element.type).toBe(Component);
			    expect(element.key).toBe('12');
			    expect(element.ref).toBe('34');
			    const expectation = \{foo: '56'\};
			    Object.freeze(expectation);
			    expect(element.props).toEqual(expectation);
			  \});
			
			  it('coerces the key to a string', () => \{
			    const element = <Component key=\{12\} foo="56" />;
			    expect(element.type).toBe(Component);
			    expect(element.key).toBe('12');
			    expect(element.ref).toBe(null);
			    const expectation = \{foo: '56'\};
			    Object.freeze(expectation);
			    expect(element.props).toEqual(expectation);
			  \});
			
			  it('merges JSX children onto the children prop', () => \{
			    const a = 1;
			    const element = <Component children="text">\{a\}</Component>;
			    expect(element.props.children).toBe(a);
			  \});
			
			  it('does not override children if no JSX children are provided', () => \{
			    const element = <Component children="text" />;
			    expect(element.props.children).toBe('text');
			  \});
			
			  it('overrides children if null is provided as a JSX child', () => \{
			    const element = <Component children="text">\{null\}</Component>;
			    expect(element.props.children).toBe(null);
			  \});
			
			  it('overrides children if undefined is provided as an argument', () => \{
			    const element = <Component children="text">\{undefined\}</Component>;
			    expect(element.props.children).toBe(undefined);
			
			    const element2 = React.cloneElement(
			      <Component children="text" />,
			      \{\},
			      undefined,
			    );
			    expect(element2.props.children).toBe(undefined);
			  \});
			
			  it('merges JSX children onto the children prop in an array', () => \{
			    const a = 1;
			    const b = 2;
			    const c = 3;
			    const element = (
			      <Component>
			        \{a\}
			        \{b\}
			        \{c\}
			      </Component>
			    );
			    expect(element.props.children).toEqual([1, 2, 3]);
			  \});
			
			  it('allows static methods to be called using the type property', () => \{
			    class StaticMethodComponent \{
			      static someStaticMethod() \{
			        return 'someReturnValue';
			      \}
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    const element = <StaticMethodComponent />;
			    expect(element.type.someStaticMethod()).toBe('someReturnValue');
			  \});
			
			  it('identifies valid elements', () => \{
			    expect(React.isValidElement(<div />)).toEqual(true);
			    expect(React.isValidElement(<Component />)).toEqual(true);
			
			    expect(React.isValidElement(null)).toEqual(false);
			    expect(React.isValidElement(true)).toEqual(false);
			    expect(React.isValidElement(\{\})).toEqual(false);
			    expect(React.isValidElement('string')).toEqual(false);
			    expect(React.isValidElement(Component)).toEqual(false);
			    expect(React.isValidElement(\{type: 'div', props: \{\}\})).toEqual(false);
			  \});
			
			  it('is indistinguishable from a plain object', () => \{
			    const element = <div className="foo" />;
			    const object = \{\};
			    expect(element.constructor).toBe(object.constructor);
			  \});
			
			  it('should use default prop value when removing a prop', () => \{
			    Component.defaultProps = \{fruit: 'persimmon'\};
			
			    const container = document.createElement('div');
			    const instance = ReactDOM.render(<Component fruit="mango" />, container);
			    expect(instance.props.fruit).toBe('mango');
			
			    ReactDOM.render(<Component />, container);
			    expect(instance.props.fruit).toBe('persimmon');
			  \});
			
			  it('should normalize props with default values', () => \{
			    class NormalizingComponent extends React.Component \{
			      render() \{
			        return <span>\{this.props.prop\}</span>;
			      \}
			    \}
			    NormalizingComponent.defaultProps = \{prop: 'testKey'\};
			
			    const instance = ReactTestUtils.renderIntoDocument(
			      <NormalizingComponent />,
			    );
			    expect(instance.props.prop).toBe('testKey');
			
			    const inst2 = ReactTestUtils.renderIntoDocument(
			      <NormalizingComponent prop=\{null\} />,
			    );
			    expect(inst2.props.prop).toBe(null);
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactJSXElement-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactJSXElementValidator-test.js', () => {
        const sourceCode = `
			
			// TODO: All these warnings should become static errors using Flow instead
			// of dynamic errors when using JSX with Flow.
			let React;
			let ReactDOM;
			let ReactTestUtils;
			let PropTypes;
			
			describe('ReactJSXElementValidator', () => \{
			  let Component;
			  let RequiredPropComponent;
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    PropTypes = require('prop-types');
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			
			    Component = class extends React.Component \{
			      render() \{
			        return <div />;
			      \}
			    \};
			
			    RequiredPropComponent = class extends React.Component \{
			      render() \{
			        return <span>\{this.props.prop\}</span>;
			      \}
			    \};
			    RequiredPropComponent.displayName = 'RequiredPropComponent';
			    RequiredPropComponent.propTypes = \{prop: PropTypes.string.isRequired\};
			  \});
			
			  it('warns for keys for arrays of elements in children position', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(
			        <Component>\{[<Component />, <Component />]\}</Component>,
			      ),
			    ).toWarnDev(
			      'Each child in an array or iterator should have a unique "key" prop.',
			    );
			  \});
			
			  it('warns for keys for arrays of elements with owner info', () => \{
			    class InnerComponent extends React.Component \{
			      render() \{
			        return <Component>\{this.props.childSet\}</Component>;
			      \}
			    \}
			
			    class ComponentWrapper extends React.Component \{
			      render() \{
			        return <InnerComponent childSet=\{[<Component />, <Component />]\} />;
			      \}
			    \}
			
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<ComponentWrapper />),
			    ).toWarnDev(
			      'Each child in an array or iterator should have a unique "key" prop.' +
			        '\\n\\nCheck the render method of \`InnerComponent\`. ' +
			        'It was passed a child from ComponentWrapper. ',
			    );
			  \});
			
			  it('warns for keys for iterables of elements in rest args', () => \{
			    const iterable = \{
			      '@@iterator': function() \{
			        let i = 0;
			        return \{
			          next: function() \{
			            const done = ++i > 2;
			            return \{value: done ? undefined : <Component />, done: done\};
			          \},
			        \};
			      \},
			    \};
			
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<Component>\{iterable\}</Component>),
			    ).toWarnDev(
			      'Each child in an array or iterator should have a unique "key" prop.',
			    );
			  \});
			
			  it('does not warn for arrays of elements with keys', () => \{
			    ReactTestUtils.renderIntoDocument(
			      <Component>\{[<Component key="#1" />, <Component key="#2" />]\}</Component>,
			    );
			  \});
			
			  it('does not warn for iterable elements with keys', () => \{
			    const iterable = \{
			      '@@iterator': function() \{
			        let i = 0;
			        return \{
			          next: function() \{
			            const done = ++i > 2;
			            return \{
			              value: done ? undefined : <Component key=\{'#' + i\} />,
			              done: done,
			            \};
			          \},
			        \};
			      \},
			    \};
			
			    ReactTestUtils.renderIntoDocument(<Component>\{iterable\}</Component>);
			  \});
			
			  it('does not warn for numeric keys in entry iterable as a child', () => \{
			    const iterable = \{
			      '@@iterator': function() \{
			        let i = 0;
			        return \{
			          next: function() \{
			            const done = ++i > 2;
			            return \{value: done ? undefined : [i, <Component />], done: done\};
			          \},
			        \};
			      \},
			    \};
			    iterable.entries = iterable['@@iterator'];
			
			    ReactTestUtils.renderIntoDocument(<Component>\{iterable\}</Component>);
			  \});
			
			  it('does not warn when the element is directly as children', () => \{
			    ReactTestUtils.renderIntoDocument(
			      <Component>
			        <Component />
			        <Component />
			      </Component>,
			    );
			  \});
			
			  it('does not warn when the child array contains non-elements', () => \{
			    void <Component>\{[\{\}, \{\}]\}</Component>;
			  \});
			
			  it('should give context for PropType errors in nested components.', () => \{
			    // In this test, we're making sure that if a proptype error is found in a
			    // component, we give a small hint as to which parent instantiated that
			    // component as per warnings about key usage in ReactElementValidator.
			    class MyComp extends React.Component \{
			      render() \{
			        return <div>My color is \{this.color\}</div>;
			      \}
			    \}
			    MyComp.propTypes = \{
			      color: PropTypes.string,
			    \};
			    class ParentComp extends React.Component \{
			      render() \{
			        return <MyComp color=\{123\} />;
			      \}
			    \}
			    expect(() => ReactTestUtils.renderIntoDocument(<ParentComp />)).toWarnDev(
			      'Warning: Failed prop type: ' +
			        'Invalid prop \`color\` of type \`number\` supplied to \`MyComp\`, ' +
			        'expected \`string\`.\\n' +
			        '    in MyComp (at **)\\n' +
			        '    in ParentComp (at **)',
			    );
			  \});
			
			  it('should update component stack after receiving next element', () => \{
			    function MyComp() \{
			      return null;
			    \}
			    MyComp.propTypes = \{
			      color: PropTypes.string,
			    \};
			    function MiddleComp(props) \{
			      return <MyComp color=\{props.color\} />;
			    \}
			    function ParentComp(props) \{
			      if (props.warn) \{
			        // This element has a source thanks to JSX.
			        return <MiddleComp color=\{42\} />;
			      \}
			      // This element has no source.
			      return React.createElement(MiddleComp, \{color: 'blue'\});
			    \}
			
			    const container = document.createElement('div');
			    ReactDOM.render(<ParentComp warn=\{false\} />, container);
			    expect(() =>
			      ReactDOM.render(<ParentComp warn=\{true\} />, container),
			    ).toWarnDev(
			      'Warning: Failed prop type: ' +
			        'Invalid prop \`color\` of type \`number\` supplied to \`MyComp\`, ' +
			        'expected \`string\`.\\n' +
			        '    in MyComp (at **)\\n' +
			        '    in MiddleComp (at **)\\n' +
			        '    in ParentComp (at **)',
			    );
			  \});
			
			  it('gives a helpful error when passing null, undefined, or boolean', () => \{
			    const Undefined = undefined;
			    const Null = null;
			    const True = true;
			    const Div = 'div';
			    expect(() => void <Undefined />).toThrow(
			     
			    );
			    expect(() => void <Null />).toThrow(
			      
			    );
			    expect(() => void <True />).toThrow(
			      
			    );
			    // No error expected
			    void <Div />;
			  \});
			
			  it('should check default prop values', () => \{
			    RequiredPropComponent.defaultProps = \{prop: null\};
			
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<RequiredPropComponent />),
			    ).toWarnDev(
			      'Warning: Failed prop type: The prop \`prop\` is marked as required in ' +
			        '\`RequiredPropComponent\`, but its value is \`null\`.\\n' +
			        '    in RequiredPropComponent (at **)',
			    );
			  \});
			
			  it('should not check the default for explicit null', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<RequiredPropComponent prop=\{null\} />),
			    ).toWarnDev(
			      'Warning: Failed prop type: The prop \`prop\` is marked as required in ' +
			        '\`RequiredPropComponent\`, but its value is \`null\`.\\n' +
			        '    in RequiredPropComponent (at **)',
			    );
			  \});
			
			  it('should check declared prop types', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<RequiredPropComponent />),
			    ).toWarnDev(
			      'Warning: Failed prop type: ' +
			        'The prop \`prop\` is marked as required in \`RequiredPropComponent\`, but ' +
			        'its value is \`undefined\`.\\n' +
			        '    in RequiredPropComponent (at **)',
			    );
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<RequiredPropComponent prop=\{42\} />),
			    ).toWarnDev(
			      'Warning: Failed prop type: ' +
			        'Invalid prop \`prop\` of type \`number\` supplied to ' +
			        '\`RequiredPropComponent\`, expected \`string\`.\\n' +
			        '    in RequiredPropComponent (at **)',
			    );
			
			    // Should not error for strings
			    ReactTestUtils.renderIntoDocument(<RequiredPropComponent prop="string" />);
			  \});
			
			  it('should warn on invalid prop types', () => \{
			    // Since there is no prevalidation step for ES6 classes, there is no hook
			    // for us to issue a warning earlier than element creation when the error
			    // actually occurs. Since this step is skipped in production, we should just
			    // warn instead of throwing for this case.
			    class NullPropTypeComponent extends React.Component \{
			      render() \{
			        return <span>\{this.props.prop\}</span>;
			      \}
			    \}
			    NullPropTypeComponent.propTypes = \{
			      prop: null,
			    \};
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<NullPropTypeComponent />),
			    ).toWarnDev(
			      'NullPropTypeComponent: prop type \`prop\` is invalid; it must be a ' +
			        'function, usually from the \`prop-types\` package,',
			    );
			  \});
			
			  it('should warn on invalid context types', () => \{
			    class NullContextTypeComponent extends React.Component \{
			      render() \{
			        return <span>\{this.props.prop\}</span>;
			      \}
			    \}
			    NullContextTypeComponent.contextTypes = \{
			      prop: null,
			    \};
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<NullContextTypeComponent />),
			    ).toWarnDev(
			      'NullContextTypeComponent: context type \`prop\` is invalid; it must ' +
			        'be a function, usually from the \`prop-types\` package,',
			    );
			  \});
			
			  it('should warn if getDefaultProps is specificed on the class', () => \{
			    class GetDefaultPropsComponent extends React.Component \{
			      render() \{
			        return <span>\{this.props.prop\}</span>;
			      \}
			    \}
			    GetDefaultPropsComponent.getDefaultProps = () => (\{
			      prop: 'foo',
			    \});
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<GetDefaultPropsComponent />),
			    ).toWarnDev(
			      'getDefaultProps is only used on classic React.createClass definitions.' +
			        ' Use a static property named \`defaultProps\` instead.',
			    );
			  \});
			
			  it('should warn if component declares PropTypes instead of propTypes', () => \{
			    class MisspelledPropTypesComponent extends React.Component \{
			      render() \{
			        return <span>\{this.props.prop\}</span>;
			      \}
			    \}
			    MisspelledPropTypesComponent.PropTypes = \{
			      prop: PropTypes.string,
			    \};
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(
			        <MisspelledPropTypesComponent prop="hi" />,
			      ),
			    ).toWarnDev(
			      'Warning: Component MisspelledPropTypesComponent declared \`PropTypes\` ' +
			        'instead of \`propTypes\`. Did you misspell the property assignment?',
			    );
			  \});
			
			  it('warns for fragments with illegal attributes', () => \{
			    class Foo extends React.Component \{
			      render() \{
			        return <React.Fragment a=\{1\}>hello</React.Fragment>;
			      \}
			    \}
			
			    expect(() => ReactTestUtils.renderIntoDocument(<Foo />)).toWarnDev(
			      'Invalid prop \`a\` supplied to \`React.Fragment\`. React.Fragment ' +
			        'can only have \`key\` and \`children\` props.',
			    );
			  \});
			
			  it('warns for fragments with refs', () => \{
			    class Foo extends React.Component \{
			      render() \{
			        return (
			          <React.Fragment
			            ref=\{bar => \{
			              this.foo = bar;
			            \}\}>
			            hello
			          </React.Fragment>
			        );
			      \}
			    \}
			
			    expect(() => ReactTestUtils.renderIntoDocument(<Foo />)).toWarnDev(
			      'Invalid attribute \`ref\` supplied to \`React.Fragment\`.',
			    );
			  \});
			
			  it('does not warn for fragments of multiple elements without keys', () => \{
			    ReactTestUtils.renderIntoDocument(
			      <React.Fragment>
			        <span>1</span>
			        <span>2</span>
			      </React.Fragment>,
			    );
			  \});
			
			  it('warns for fragments of multiple elements with same key', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(
			        <React.Fragment>
			          <span key="a">1</span>
			          <span key="a">2</span>
			          <span key="b">3</span>
			        </React.Fragment>,
			      ),
			    ).toWarnDev('Encountered two children with the same key, \`a\`.');
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactJSXElementValidator-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(22)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactProxy-test.js', () => {
        const sourceCode = `
			let PropTypes;
			let React;
			let ReactDOM;
			
			describe('ReactProxy', () => \{
			    let container;
			    let createProxy = require('../../../lib/ReactProxy');
			    let deepForceUpdate = require('../../../lib/deepForceUpdate');
			    beforeEach(() => \{
			
			        React = require('react');
			        PropTypes = React.PropTypes;
			        ReactDOM = require('react-dom');
			        container = document.createElement('div');
			    \});
			
			
			    it('hot-loader', () => \{
			        class ComponentVersion1 extends React.Component \{
			            render() \{
			              return <div>Before hot update.</div>;
			            \}
			          \}
			          
			          class ComponentVersion2 extends React.Component \{
			            render() \{
			              return <div>After hot update!</div>;
			            \}
			          \}
			     
			          // Create a proxy object, given the initial React component class.
			          const proxy = createProxy(ComponentVersion1);
			          
			          // Obtain a React class that acts exactly like the initial version.
			          // This is what we'll use in our app instead of the real component class.
			          const Proxy = proxy.get();
			          
			          // Render the component (proxy, really).
			          const rootInstance = ReactDOM.render(<Proxy />, container);
			          
			          // Point the proxy to the new React component class by calling update().
			          // Instances will stay mounted and their state will be intact, but their methods will be updated.
			          proxy.update(ComponentVersion2);
			          
			          deepForceUpdate(rootInstance)
			          expect(container.textContent.trim()).toBe("After hot update!")
			    \});
			
			
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactProxy-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('rubylouvre_anu\\packages\\core\\__tests__\\ReactPureComponent-test.js', () => {
        const sourceCode = `
			
			'use strict';
			
			let React;
			let ReactDOM;
			
			describe('ReactPureComponent', () => \{
			  beforeEach(() => \{
			    React = require('react');
			    ReactDOM = require('react-dom');
			  \});
			
			  it('should render', () => \{
			    let renders = 0;
			    class Component extends React.PureComponent \{
			      constructor() \{
			        super();
			        this.state = \{type: 'mushrooms'\};
			      \}
			      render() \{
			        renders++;
			        return <div>\{this.props.text[0]\}</div>;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    let text;
			    let component;
			
			    text = ['porcini'];
			    component = ReactDOM.render(<Component text=\{text\} />, container);
			    expect(container.textContent).toBe('porcini');
			    expect(renders).toBe(1);
			
			    text = ['morel'];
			    component = ReactDOM.render(<Component text=\{text\} />, container);
			    expect(container.textContent).toBe('morel');
			    expect(renders).toBe(2);
			
			    text[0] = 'portobello';
			    component = ReactDOM.render(<Component text=\{text\} />, container);
			    expect(container.textContent).toBe('morel');
			    expect(renders).toBe(2);
			
			    // Setting state without changing it doesn't cause a rerender.
			    component.setState(\{type: 'mushrooms'\});
			    expect(container.textContent).toBe('morel');
			    expect(renders).toBe(2);
			
			    // But changing state does.
			    component.setState(\{type: 'portobello mushrooms'\});
			    expect(container.textContent).toBe('portobello');
			    expect(renders).toBe(3);
			  \});
			
			  it('can override shouldComponentUpdate', () => \{
			    let renders = 0;
			    class Component extends React.PureComponent \{
			      render() \{
			        renders++;
			        return <div />;
			      \}
			      shouldComponentUpdate() \{
			        return true;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    expect(() => ReactDOM.render(<Component />, container)).toWarnDev(
			      'Warning: ' +
			        'Component has a method called shouldComponentUpdate(). ' +
			        'shouldComponentUpdate should not be used when extending React.PureComponent. ' +
			        'Please extend React.Component if shouldComponentUpdate is used.',
			    );
			    ReactDOM.render(<Component />, container);
			    expect(renders).toBe(2);
			  \});
			
			  it('extends React.Component', () => \{
			    let renders = 0;
			    class Component extends React.PureComponent \{
			      render() \{
			        expect(this instanceof React.Component).toBe(true);
			        expect(this instanceof React.PureComponent).toBe(true);
			        renders++;
			        return <div />;
			      \}
			    \}
			    ReactDOM.render(<Component />, document.createElement('div'));
			    expect(renders).toBe(1);
			  \});
			
			  it('should warn when shouldComponentUpdate is defined on React.PureComponent', () => \{
			    class PureComponent extends React.PureComponent \{
			      shouldComponentUpdate() \{
			        return true;
			      \}
			      render() \{
			        return <div />;
			      \}
			    \}
			    const container = document.createElement('div');
			    expect(() => ReactDOM.render(<PureComponent />, container)).toWarnDev(
			      'Warning: ' +
			        'PureComponent has a method called shouldComponentUpdate(). ' +
			        'shouldComponentUpdate should not be used when extending React.PureComponent. ' +
			        'Please extend React.Component if shouldComponentUpdate is used.',
			    );
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\core\\__tests__\\ReactPureComponent-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\findDOMNode-test.js', () => {
        const sourceCode = `
			"use strict";
			
			const React = require("react");
			const ReactDOM = require("react-dom");
			const ReactTestUtils = require("test-utils");
			
			describe("findDOMNode", () => \{
			    it("findDOMNode should return null if passed null", () => \{
			        expect(ReactDOM.findDOMNode(null)).toBe(null);
			    \});
			    it("findDOMNode should return null if passed undefined", () => \{
			        expect(ReactDOM.findDOMNode(void 666)).toBe(null);
			    \});
			
			    it("findDOMNode should find dom element", () => \{
			        class MyNode extends React.Component \{
			            render() \{
			                return (
			                    <div>
			                        <span>Noise</span>
			                    </div>
			                );
			            \}
			        \}
			
			        const myNode = ReactTestUtils.renderIntoDocument(<MyNode />);
			        const myDiv = ReactDOM.findDOMNode(myNode);
			        const mySameDiv = ReactDOM.findDOMNode(myDiv);
			        expect(myDiv.tagName).toBe("DIV");
			        expect(mySameDiv).toBe(myDiv);
			    \});
			
			    it("findDOMNode should find dom element after an update from null", () => \{
			        function Bar(\{flag\}) \{
			            if (flag) \{
			                return <span>A</span>;
			            \}
			            return null;
			        \}
			        class MyNode extends React.Component \{
			            render() \{
			                return <Bar flag=\{this.props.flag\} />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			
			        const myNodeA = ReactDOM.render(<MyNode />, container);
			        const a = ReactDOM.findDOMNode(myNodeA);
			        expect(a).toBe(null);
			
			        const myNodeB = ReactDOM.render(<MyNode flag=\{true\} />, container);
			        expect(myNodeA === myNodeB).toBe(true);
			
			        const b = ReactDOM.findDOMNode(myNodeB);
			        expect(b.tagName).toBe("SPAN");
			    \});
			
			    it("findDOMNode should reject random objects", () => \{
			        expect(function() \{
			            ReactDOM.findDOMNode(\{foo: "bar"\});
			        \}).toThrowError(
			            // 'Element appears to be neither ReactComponent nor DOMNode. Keys: foo',
			        );
			    \});
			
			    it("findDOMNode should reject unmounted objects with render func", () => \{
			        class Foo extends React.Component \{
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        const inst = ReactDOM.render(<Foo />, container);
			        ReactDOM.unmountComponentAtNode(container);
			        //这里与官方不一致
			        expect(() => ReactDOM.findDOMNode(inst)).not.toThrowError(
			     
			        );
			    \});
			
			    it("findDOMNode should not throw an error when called within a component that is not mounted", () => \{
			        class Bar extends React.Component \{
			            UNSAFE_componentWillMount() \{
			                expect(ReactDOM.findDOMNode(this)).toBeNull();
			            \}
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        expect(() => ReactTestUtils.renderIntoDocument(<Bar />)).not.toThrow();
			    \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\findDOMNode-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactComponent-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let React;
			let ReactDOM;
			let ReactDOMServer;
			let ReactTestUtils;
			
			describe('ReactComponent', () => \{
			  function normalizeCodeLocInfo(str) \{
			    return str && str.replace(/\\(at .+?:\\d+\\)/g, '(at **)');
			  \}
			
			  beforeEach(() => \{
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactDOMServer = require('react-server-renderer');
			    ReactTestUtils = require('test-utils');
			  \});
			
			  it('should throw on invalid render targets', () => \{
			    const container = document.createElement('div');
			    // jQuery objects are basically arrays; people often pass them in by mistake
			    expect(function () \{
			      ReactDOM.render(<div />, [container]);
			    \}).toThrowError();
			
			    expect(function () \{
			      ReactDOM.render(<div />, null);
			    \}).toThrowError();
			  \});
			
			  it('should throw when supplying a ref outside of render method', () => \{
			    let instance = <div ref="badDiv" />;
			    expect(function () \{
			      instance = ReactTestUtils.renderIntoDocument(instance);
			    \}).toThrow();
			  \});
			
			  it('should throw (in dev) when children are mutated during render', () => \{
			    function Wrapper(props) \{
			      props.children[1] = <p key=\{1\} />; // Mutation is illegal
			      return <div>\{props.children\}</div>;
			    \}
			    if (__DEV__) \{
			      expect(() => \{
			        ReactTestUtils.renderIntoDocument(
			          <Wrapper>
			            <span key=\{0\} />
			            <span key=\{1\} />
			            <span key=\{2\} />
			          </Wrapper>,
			        );
			      \}).toThrowError(/Cannot assign to read only property.*/);
			    \} else \{
			      ReactTestUtils.renderIntoDocument(
			        <Wrapper>
			          <span key=\{0\} />
			          <span key=\{1\} />
			          <span key=\{2\} />
			        </Wrapper>,
			      );
			    \}
			  \});
			
			  it('should throw (in dev) when children are mutated during update', () => \{
			    class Wrapper extends React.Component \{
			      componentDidMount() \{
			        this.props.children[1] = <p key=\{1\} />; // Mutation is illegal
			        this.forceUpdate();
			      \}
			
			      render() \{
			        return <div>\{this.props.children\}</div>;
			      \}
			    \}
			
			    if (__DEV__) \{
			      expect(() => \{
			        ReactTestUtils.renderIntoDocument(
			          <Wrapper>
			            <span key=\{0\} />
			            <span key=\{1\} />
			            <span key=\{2\} />
			          </Wrapper>,
			        );
			      \}).toThrowError(/Cannot assign to read only property.*/);
			    \} else \{
			      ReactTestUtils.renderIntoDocument(
			        <Wrapper>
			          <span key=\{0\} />
			          <span key=\{1\} />
			          <span key=\{2\} />
			        </Wrapper>,
			      );
			    \}
			  \});
			
			  it('should support refs on owned components', () => \{
			    const innerObj = \{\};
			    const outerObj = \{\};
			
			    class Wrapper extends React.Component \{
			      getObject = () => \{
			        return this.props.object;
			      \};
			
			      render() \{
			        return <div>\{this.props.children\}</div>;
			      \}
			    \}
			
			    class Component extends React.Component \{
			      render() \{
			        const inner = <Wrapper object=\{innerObj\} ref="inner" />;
			        const outer = (
			          <Wrapper object=\{outerObj\} ref="outer">
			            \{inner\}
			          </Wrapper>
			        );
			        return outer;
			      \}
			
			      componentDidMount() \{
			        expect(this.refs.inner.getObject()).toEqual(innerObj);
			        expect(this.refs.outer.getObject()).toEqual(outerObj);
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Component />);
			  \});
			
			  it('should not have refs on unmounted components', () => \{
			    class Parent extends React.Component \{
			      render() \{
			        return (
			          <Child>
			            <div ref="test" />
			          </Child>
			        );
			      \}
			
			      componentDidMount() \{
			        expect(this.refs && this.refs.test).toEqual(undefined);
			      \}
			    \}
			
			    class Child extends React.Component \{
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Parent child=\{<span />\} />);
			  \});
			
			  it('should support callback-style refs', () => \{
			    const innerObj = \{\};
			    const outerObj = \{\};
			
			    class Wrapper extends React.Component \{
			      getObject = () => \{
			        return this.props.object;
			      \};
			
			      render() \{
			        return <div>\{this.props.children\}</div>;
			      \}
			    \}
			
			    let mounted = false;
			
			    class Component extends React.Component \{
			      render() \{
			        const inner = (
			          <Wrapper object=\{innerObj\} ref=\{c => (this.innerRef = c)\} />
			        );
			        const outer = (
			          <Wrapper object=\{outerObj\} ref=\{c => (this.outerRef = c)\}>
			            \{inner\}
			          </Wrapper>
			        );
			        return outer;
			      \}
			
			      componentDidMount() \{
			        expect(this.innerRef.getObject()).toEqual(innerObj);
			        expect(this.outerRef.getObject()).toEqual(outerObj);
			        mounted = true;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Component />);
			    expect(mounted).toBe(true);
			  \});
			
			  it('should support object-style refs', () => \{
			    const innerObj = \{\};
			    const outerObj = \{\};
			
			    class Wrapper extends React.Component \{
			      getObject = () => \{
			        return this.props.object;
			      \};
			
			      render() \{
			        return <div>\{this.props.children\}</div>;
			      \}
			    \}
			
			    let mounted = false;
			
			    class Component extends React.Component \{
			      constructor() \{
			        super();
			        this.innerRef = React.createRef();
			        this.outerRef = React.createRef();
			      \}
			      render() \{
			        const inner = <Wrapper object=\{innerObj\} ref=\{this.innerRef\} />;
			        const outer = (
			          <Wrapper object=\{outerObj\} ref=\{this.outerRef\}>
			            \{inner\}
			          </Wrapper>
			        );
			        return outer;
			      \}
			
			      componentDidMount() \{
			        expect(this.innerRef.current.getObject()).toEqual(innerObj);
			        expect(this.outerRef.current.getObject()).toEqual(outerObj);
			        mounted = true;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Component />);
			    expect(mounted).toBe(true);
			  \});
			
			  it('should support new-style refs with mixed-up owners', () => \{
			    class Wrapper extends React.Component \{
			      getTitle = () => \{
			        return this.props.title;
			      \};
			
			      render() \{
			        return this.props.getContent();
			      \}
			    \}
			
			    let mounted = false;
			
			    class Component extends React.Component \{
			      getInner = () => \{
			        // (With old-style refs, it's impossible to get a ref to this div
			        // because Wrapper is the current owner when this function is called.)
			        return <div className="inner" ref=\{c => (this.innerRef = c)\} />;
			      \};
			
			      render() \{
			        return (
			          <Wrapper
			            title="wrapper"
			            ref=\{c => (this.wrapperRef = c)\}
			            getContent=\{this.getInner\}
			          />
			        );
			      \}
			
			      componentDidMount() \{
			        // Check .props.title to make sure we got the right elements back
			        expect(this.wrapperRef.getTitle()).toBe('wrapper');
			        expect(ReactDOM.findDOMNode(this.innerRef).className).toBe('inner');
			        mounted = true;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Component />);
			    expect(mounted).toBe(true);
			  \});
			
			  it('should call refs at the correct time', () => \{
			    const log = [];
			
			    class Inner extends React.Component \{
			      render() \{
			        log.push(\`inner \$\{this.props.id\} render\`);
			        return <div />;
			      \}
			
			      componentDidMount() \{
			        log.push(\`inner \$\{this.props.id\} componentDidMount\`);
			      \}
			
			      componentDidUpdate() \{
			        log.push(\`inner \$\{this.props.id\} componentDidUpdate\`);
			      \}
			
			      componentWillUnmount() \{
			        log.push(\`inner \$\{this.props.id\} componentWillUnmount\`);
			      \}
			    \}
			
			    class Outer extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <Inner
			              id=\{1\}
			              ref=\{c => \{
			                log.push(\`ref 1 got \$\{c ? \`instance \$\{c.props.id\}\` : 'null'\}\`);
			              \}\}
			            />
			            <Inner
			              id=\{2\}
			              ref=\{c => \{
			                log.push(\`ref 2 got \$\{c ? \`instance \$\{c.props.id\}\` : 'null'\}\`);
			              \}\}
			            />
			          </div>
			        );
			      \}
			
			      componentDidMount() \{
			        log.push('outer componentDidMount');
			      \}
			
			      componentDidUpdate() \{
			        log.push('outer componentDidUpdate');
			      \}
			
			      componentWillUnmount() \{
			        log.push('outer componentWillUnmount');
			      \}
			    \}
			
			    // mount, update, unmount
			    const el = document.createElement('div');
			    log.push('start mount');
			    ReactDOM.render(<Outer />, el);
			    log.push('start update');
			    ReactDOM.render(<Outer />, el);
			    log.push('start unmount');
			    ReactDOM.unmountComponentAtNode(el);
			
			    /* eslint-disable indent */
			    expect(log).toEqual([
			      'start mount',
			      'inner 1 render',
			      'inner 2 render',
			      'inner 1 componentDidMount',
			      'ref 1 got instance 1',
			      'inner 2 componentDidMount',
			      'ref 2 got instance 2',
			      'outer componentDidMount',
			      'start update',
			      // Previous (equivalent) refs get cleared
			      // Fiber renders first, resets refs later
			      'inner 1 render',
			      'inner 2 render',
			      'ref 1 got null',
			      'ref 2 got null',
			      'inner 1 componentDidUpdate',
			      'ref 1 got instance 1',
			      'inner 2 componentDidUpdate',
			      'ref 2 got instance 2',
			      'outer componentDidUpdate',
			      'start unmount',
			      'outer componentWillUnmount',
			      'ref 1 got null',
			      'inner 1 componentWillUnmount',
			      'ref 2 got null',
			      'inner 2 componentWillUnmount',
			    ]);
			    /* eslint-enable indent */
			  \});
			
			  it('fires the callback after a component is rendered', () => \{
			    const callback = jest.fn();
			    const container = document.createElement('div');
			    ReactDOM.render(<div />, container, callback);
			    expect(callback.mock.calls.length).toBe(1);
			    ReactDOM.render(<div className="foo" />, container, callback);
			    expect(callback.mock.calls.length).toBe(2);
			    ReactDOM.render(<span />, container, callback);
			    expect(callback.mock.calls.length).toBe(3);
			  \});
			
			  it('throws usefully when rendering badly-typed elements', () => \{
			    const X = undefined;
			    expect(() => \{
			      expect(() => ReactTestUtils.renderIntoDocument(<X />)).toWarnDev(
			        "React.createElement: type is invalid"
			        // 'React.createElement: type is invalid -- expected a string (for built-in components) ' +
			        //   'or a class/function (for composite components) but got: undefined.',
			      );
			    \}).toThrowError(
			      "React.createElement: type is invalid"
			      /*
			    'Element type is invalid: expected a string (for built-in components) ' +
			      'or a class/function (for composite components) but got: undefined.' +
			      (__DEV__
			        ? " You likely forgot to export your component from the file it's " +
			          'defined in, or you might have mixed up default and named imports.'
			        : ''),
			        */
			    );
			
			    const Y = null;
			    expect(() => \{
			      expect(() => ReactTestUtils.renderIntoDocument(<Y />)).toWarnDev(
			        /*  'React.createElement: type is invalid -- expected a string (for built-in components) ' +
			            'or a class/function (for composite components) but got: null.',
			            */
			        "React.createElement: type is invalid"
			      );
			    \}).toThrowError(
			      /* 'Element type is invalid: expected a string (for built-in components) ' +
			         'or a class/function (for composite components) but got: null.',
			         */
			      "React.createElement: type is invalid"
			    );
			  \});
			
			  it('includes owner name in the error about badly-typed elements', () => \{
			    const X = undefined;
			
			    function Indirection(props) \{
			      return <div>\{props.children\}</div>;
			    \}
			
			    function Bar() \{
			      return (
			        <Indirection>
			          <X />
			        </Indirection>
			      );
			    \}
			
			    function Foo() \{
			      return <Bar />;
			    \}
			
			    expect(() => \{
			      expect(() => ReactTestUtils.renderIntoDocument(<Foo />)).toWarnDev(
			        /*'React.createElement: type is invalid -- expected a string (for built-in components) ' +
			          'or a class/function (for composite components) but got: undefined.',
			          */
			        "React.createElement: type is invalid"
			      );
			    \}).toThrowError(
			      /*'Element type is invalid: expected a string (for built-in components) ' +
			        'or a class/function (for composite components) but got: undefined.' +
			        (__DEV__
			          ? " You likely forgot to export your component from the file it's " +
			            'defined in, or you might have mixed up default and named imports.' +
			            '\\n\\nCheck the render method of \`Bar\`.'
			          : ''),
			          */
			      "React.createElement: type is invalid"
			    );
			  \});
			
			  it('throws if a plain object is used as a child', () => \{
			    const children = \{
			      x: <span />,
			      y: <span />,
			      z: <span />,
			    \};
			    const element = <div>\{[children]\}</div>;
			    const container = document.createElement('div');
			    let ex;
			    try \{
			      ReactDOM.render(element, container);
			    \} catch (e) \{
			      ex = e;
			    \}
			    expect(ex).toBeDefined();
			    /*  expect(normalizeCodeLocInfo(ex.message)).toBe(
			        'Objects are not valid as a React child (found: object with keys \{x, y, z\}).' +
			          (__DEV__
			            ? ' If you meant to render a collection of children, use ' +
			              'an array instead.' +
			              '\\n    in div (at **)'
			            : ''),
			      );
			      */
			  \});
			
			  it('throws if a plain object even if it is in an owner', () => \{
			    class Foo extends React.Component \{
			      render() \{
			        const children = \{
			          a: <span />,
			          b: <span />,
			          c: <span />,
			        \};
			        return <div>\{[children]\}</div>;
			      \}
			    \}
			    const container = document.createElement('div');
			    let ex;
			    try \{
			      ReactDOM.render(<Foo />, container);
			    \} catch (e) \{
			      ex = e;
			    \}
			    expect(ex).toBeDefined();
			    /*
			    expect(normalizeCodeLocInfo(ex.message)).toBe(
			      'Objects are not valid as a React child (found: object with keys \{a, b, c\}).' +
			        (__DEV__
			          ? ' If you meant to render a collection of children, use ' +
			            'an array instead.\\n' +
			            '    in div (at **)\\n' +
			            '    in Foo (at **)'
			          : ''),
			    );
			    */
			  \});
			
			  it('throws if a plain object is used as a child when using SSR', async () => \{
			    const children = \{
			      x: <span />,
			      y: <span />,
			      z: <span />,
			    \};
			    const element = <div>\{[children]\}</div>;
			    let ex;
			    try \{
			      ReactDOMServer.renderToString(element);
			    \} catch (e) \{
			      ex = e;
			    \}
			    expect(ex).toBeDefined();
			    /*
			    expect(normalizeCodeLocInfo(ex.message)).toBe(
			      'Objects are not valid as a React child (found: object with keys \{x, y, z\}).' +
			        (__DEV__
			          ? ' If you meant to render a collection of children, use ' +
			            'an array instead.' +
			            '\\n    in div (at **)'
			          : ''),
			    );
			    */
			  \});
			
			  it('throws if a plain object even if it is in an owner when using SSR', async () => \{
			    console.log("以后要处理这个")
			    return
			    class Foo extends React.Component \{
			      render() \{
			        const children = \{
			          a: <span />,
			          b: <span />,
			          c: <span />,
			        \};
			        return <div>\{[children]\}</div>;
			      \}
			    \}
			    const container = document.createElement('div');
			    let ex;
			    try \{
			      ReactDOMServer.renderToString(<Foo />, container);
			    \} catch (e) \{
			      ex = e;
			    \}
			    expect(ex).toBeDefined();
			    /*
			    expect(normalizeCodeLocInfo(ex.message)).toBe(
			      'Objects are not valid as a React child (found: object with keys \{a, b, c\}).' +
			        (__DEV__
			          ? ' If you meant to render a collection of children, use ' +
			            'an array instead.\\n' +
			            '    in div (at **)\\n' +
			            '    in Foo (at **)'
			          : ''),
			    );
			    */
			  \});
			
			  describe('with new features', () => \{
			    it('warns on function as a return value from a function', () => \{
			      function Foo() \{
			        return Foo;
			      \}
			      const container = document.createElement('div');
			      expect(() => ReactDOM.render(<Foo />, container)).toWarnDev(
			        'Warning: Functions are not valid as a React child. This may happen if ' +
			        'you return a Component instead of <Component /> from render. ' +
			        'Or maybe you meant to call this function rather than return it.\\n' +
			        '    in Foo (at **)',
			      );
			    \});
			
			    it('warns on function as a return value from a class', () => \{
			      class Foo extends React.Component \{
			        render() \{
			          return Foo;
			        \}
			      \}
			      const container = document.createElement('div');
			      expect(() => ReactDOM.render(<Foo />, container)).toWarnDev(
			        'Warning: Functions are not valid as a React child. This may happen if ' +
			        'you return a Component instead of <Component /> from render. ' +
			        'Or maybe you meant to call this function rather than return it.\\n' +
			        '    in Foo (at **)',
			      );
			    \});
			
			    it('warns on function as a child to host component', () => \{
			      function Foo() \{
			        return (
			          <div>
			            <span>\{Foo\}</span>
			          </div>
			        );
			      \}
			      const container = document.createElement('div');
			      expect(() => ReactDOM.render(<Foo />, container)).toWarnDev(
			        'Warning: Functions are not valid as a React child. This may happen if ' +
			        'you return a Component instead of <Component /> from render. ' +
			        'Or maybe you meant to call this function rather than return it.\\n' +
			        '    in span (at **)\\n' +
			        '    in div (at **)\\n' +
			        '    in Foo (at **)',
			      );
			    \});
			
			    it('does not warn for function-as-a-child that gets resolved', () => \{
			      function Bar(props) \{
			        return props.children();
			      \}
			      function Foo() \{
			        return <Bar>\{() => 'Hello'\}</Bar>;
			      \}
			      const container = document.createElement('div');
			      ReactDOM.render(<Foo />, container);
			      expect(container.innerHTML).toBe('Hello');
			    \});
			
			    it('deduplicates function type warnings based on component type', () => \{
			      class Foo extends React.PureComponent \{
			        constructor() \{
			          super();
			          this.state = \{ type: 'mushrooms' \};
			        \}
			        render() \{
			          return (
			            <div>
			              \{Foo\}
			              \{Foo\}
			              <span>
			                \{Foo\}
			                \{Foo\}
			              </span>
			            </div>
			          );
			        \}
			      \}
			      const container = document.createElement('div');
			      let component;
			      expect(() => \{
			        component = ReactDOM.render(<Foo />, container);
			      \}).toWarnDev([
			        'Warning: Functions are not valid as a React child. This may happen if ' +
			        'you return a Component instead of <Component /> from render. ' +
			        'Or maybe you meant to call this function rather than return it.\\n' +
			        '    in div (at **)\\n' +
			        '    in Foo (at **)',
			        'Warning: Functions are not valid as a React child. This may happen if ' +
			        'you return a Component instead of <Component /> from render. ' +
			        'Or maybe you meant to call this function rather than return it.\\n' +
			        '    in span (at **)\\n' +
			        '    in div (at **)\\n' +
			        '    in Foo (at **)',
			      ]);
			      component.setState(\{ type: 'portobello mushrooms' \});
			    \});
			
			  \});
			  it("确保context对象存在", () => \{
			    class Foo extends React.Component \{
			      constructor() \{
			        super();
			        this.state = \{ type: 'mushrooms' \};
			      \}
			      render() \{
			        return <p>xxx</p>
			      \}
			    \}
			    const container = document.createElement('div');
			    var instance = ReactDOM.render(<Foo />, container);
			    expect(!!instance.context).toBe(true);
			  \})
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactComponent-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(23)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactComponentLifeCycle-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let React;
			let ReactDOM;
			let ReactTestUtils;
			let PropTypes;
			
			const clone = function(o) \{
			  return JSON.parse(JSON.stringify(o));
			\};
			
			const GET_INIT_STATE_RETURN_VAL = \{
			  hasWillMountCompleted: false,
			  hasRenderCompleted: false,
			  hasDidMountCompleted: false,
			  hasWillUnmountCompleted: false,
			\};
			
			const INIT_RENDER_STATE = \{
			  hasWillMountCompleted: true,
			  hasRenderCompleted: false,
			  hasDidMountCompleted: false,
			  hasWillUnmountCompleted: false,
			\};
			
			const DID_MOUNT_STATE = \{
			  hasWillMountCompleted: true,
			  hasRenderCompleted: true,
			  hasDidMountCompleted: false,
			  hasWillUnmountCompleted: false,
			\};
			
			const NEXT_RENDER_STATE = \{
			  hasWillMountCompleted: true,
			  hasRenderCompleted: true,
			  hasDidMountCompleted: true,
			  hasWillUnmountCompleted: false,
			\};
			
			const WILL_UNMOUNT_STATE = \{
			  hasWillMountCompleted: true,
			  hasDidMountCompleted: true,
			  hasRenderCompleted: true,
			  hasWillUnmountCompleted: false,
			\};
			
			const POST_WILL_UNMOUNT_STATE = \{
			  hasWillMountCompleted: true,
			  hasDidMountCompleted: true,
			  hasRenderCompleted: true,
			  hasWillUnmountCompleted: true,
			\};
			
			
			function getLifeCycleState(instance) \{
			  return instance.updater.isMounted(instance) ? 'MOUNTED' : 'UNMOUNTED';
			\}
			
			/**
			 * TODO: We should make any setState calls fail in
			 * \`getInitialState\` and \`componentWillMount\`. They will usually fail
			 * anyways because \`this._renderedComponent\` is empty, however, if a component
			 * is *reused*, then that won't be the case and things will appear to work in
			 * some cases. Better to just block all updates in initialization.
			 */
			describe('ReactComponentLifeCycle', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			    PropTypes = require('prop-types');
			  \});
			
			  it('should not reuse an instance when it has been unmounted', () => \{
			    const container = document.createElement('div');
			
			    class StatefulComponent extends React.Component \{
			      state = \{\};
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    const element = <StatefulComponent />;
			    const firstInstance = ReactDOM.render(element, container);
			    ReactDOM.unmountComponentAtNode(container);
			    const secondInstance = ReactDOM.render(element, container);
			    expect(firstInstance).not.toBe(secondInstance);
			  \});
			
			  /**
			   * If a state update triggers rerendering that in turn fires an onDOMReady,
			   * that second onDOMReady should not fail.
			   */
			  it('it should fire onDOMReady when already in onDOMReady', () => \{
			    const _testJournal = [];
			
			    class Child extends React.Component \{
			      componentDidMount() \{
			        _testJournal.push('Child:onDOMReady');
			      \}
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    class SwitcherParent extends React.Component \{
			      constructor(props) \{
			        super(props);
			        _testJournal.push('SwitcherParent:getInitialState');
			        this.state = \{showHasOnDOMReadyComponent: false\};
			      \}
			
			      componentDidMount() \{
			        _testJournal.push('SwitcherParent:onDOMReady');
			        this.switchIt();
			      \}
			
			      switchIt = () => \{
			        this.setState(\{showHasOnDOMReadyComponent: true\});
			      \};
			
			      render() \{
			        return (
			          <div>
			            \{this.state.showHasOnDOMReadyComponent ? <Child /> : <div />\}
			          </div>
			        );
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<SwitcherParent />);
			    expect(_testJournal).toEqual([
			      'SwitcherParent:getInitialState',
			      'SwitcherParent:onDOMReady',
			      'Child:onDOMReady',
			    ]);
			  \});
			
			  // You could assign state here, but not access members of it, unless you
			  // had provided a getInitialState method.
			  it('throws when accessing state in componentWillMount', () => \{
			    class StatefulComponent extends React.Component \{
			      UNSAFE_componentWillMount() \{
			        void this.state.yada;
			      \}
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    let instance = <StatefulComponent />;
			    expect(function() \{
			      instance = ReactTestUtils.renderIntoDocument(instance);
			    \}).toThrow();
			  \});
			
			  it('should allow update state inside of componentWillMount', () => \{
			    class StatefulComponent extends React.Component \{
			      UNSAFE_componentWillMount() \{
			        this.setState(\{stateField: 'something'\});
			      \}
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    let instance = <StatefulComponent />;
			    expect(function() \{
			      instance = ReactTestUtils.renderIntoDocument(instance);
			    \}).not.toThrow();
			  \});
			
			  it('should not allow update state inside of getInitialState', () => \{
			    class StatefulComponent extends React.Component \{
			      constructor(props, context) \{
			        super(props, context);
			        this.setState(\{stateField: 'something'\});
			
			        this.state = \{stateField: 'somethingelse'\};
			      \}
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(<StatefulComponent />);
			    \}).toWarnDev(
			      "Warning: Can't call setState on a component that is not yet mounted. " +
			        'This is a no-op, but it might indicate a bug in your application. ' +
			        'Instead, assign to \`this.state\` directly or define a \`state = \{\};\` ' +
			        'class property with the desired state in the StatefulComponent component.',
			    );
			
			    // Check deduplication; (no extra warnings should be logged).
			    ReactTestUtils.renderIntoDocument(<StatefulComponent />);
			  \});
			
			  it('should correctly determine if a component is mounted', () => \{
			    class Component extends React.Component \{
			      _isMounted() \{
			        // No longer a public API, but we can test that it works internally by
			        // reaching into the updater.
			        return this.updater.isMounted(this);
			      \}
			      UNSAFE_componentWillMount() \{
			        expect(this._isMounted()).toBeFalsy();
			      \}
			      componentDidMount() \{
			        expect(this._isMounted()).toBeTruthy();
			      \}
			      render() \{
			        expect(this._isMounted()).toBeFalsy();
			        return <div />;
			      \}
			    \}
			
			    const element = <Component />;
			
			    expect(() => \{
			      const instance = ReactTestUtils.renderIntoDocument(element);
			      expect(instance._isMounted()).toBeTruthy();
			    \}).toWarnDev('Component is accessing isMounted inside its render()');
			  \});
			
			  it('should correctly determine if a null component is mounted', () => \{
			    class Component extends React.Component \{
			      _isMounted() \{
			        // No longer a public API, but we can test that it works internally by
			        // reaching into the updater.
			        return this.updater.isMounted(this);
			      \}
			      UNSAFE_componentWillMount() \{
			        expect(this._isMounted()).toBeFalsy();
			      \}
			      componentDidMount() \{
			        expect(this._isMounted()).toBeTruthy();
			      \}
			      render() \{
			        expect(this._isMounted()).toBeFalsy();
			        return null;
			      \}
			    \}
			
			    const element = <Component />;
			
			    expect(() => \{
			      const instance = ReactTestUtils.renderIntoDocument(element);
			      expect(instance._isMounted()).toBeTruthy();
			    \}).toWarnDev('Component is accessing isMounted inside its render()');
			  \});
			
			  it('isMounted should return false when unmounted', () => \{
			    class Component extends React.Component \{
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    const instance = ReactDOM.render(<Component />, container);
			
			    // No longer a public API, but we can test that it works internally by
			    // reaching into the updater.
			    expect(instance.updater.isMounted(instance)).toBe(true);
			
			    ReactDOM.unmountComponentAtNode(container);
			
			    expect(instance.updater.isMounted(instance)).toBe(false);
			  \});
			
			  it('warns if findDOMNode is used inside render', () => \{
			    class Component extends React.Component \{
			      state = \{isMounted: false\};
			      componentDidMount() \{
			        this.setState(\{isMounted: true\});
			      \}
			      render() \{
			        if (this.state.isMounted) \{
			          expect(ReactDOM.findDOMNode(this).tagName).toBe('DIV');
			        \}
			        return <div />;
			      \}
			    \}
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(<Component />);
			    \}).toWarnDev('Component is accessing findDOMNode inside its render()');
			  \});
			
			  it('should carry through each of the phases of setup', () => \{
			    class LifeCycleComponent extends React.Component \{
			      constructor(props, context) \{
			        super(props, context);
			        this._testJournal = \{\};
			        const initState = \{
			          hasWillMountCompleted: false,
			          hasDidMountCompleted: false,
			          hasRenderCompleted: false,
			          hasWillUnmountCompleted: false,
			        \};
			        this._testJournal.returnedFromGetInitialState = clone(initState);
			        this._testJournal.lifeCycleAtStartOfGetInitialState = getLifeCycleState(
			          this,
			        );
			        this.state = initState;
			      \}
			
			      UNSAFE_componentWillMount() \{
			        this._testJournal.stateAtStartOfWillMount = clone(this.state);
			        this._testJournal.lifeCycleAtStartOfWillMount = getLifeCycleState(this);
			        this.state.hasWillMountCompleted = true;
			      \}
			
			      componentDidMount() \{
			        this._testJournal.stateAtStartOfDidMount = clone(this.state);
			        this._testJournal.lifeCycleAtStartOfDidMount = getLifeCycleState(this);
			        this.setState(\{hasDidMountCompleted: true\});
			      \}
			
			      render() \{
			        const isInitialRender = !this.state.hasRenderCompleted;
			        if (isInitialRender) \{
			          this._testJournal.stateInInitialRender = clone(this.state);
			          this._testJournal.lifeCycleInInitialRender = getLifeCycleState(this);
			        \} else \{
			          this._testJournal.stateInLaterRender = clone(this.state);
			          this._testJournal.lifeCycleInLaterRender = getLifeCycleState(this);
			        \}
			        // you would *NEVER* do anything like this in real code!
			        this.state.hasRenderCompleted = true;
			        return <div ref="theDiv">I am the inner DIV</div>;
			      \}
			
			      componentWillUnmount() \{
			        this._testJournal.stateAtStartOfWillUnmount = clone(this.state);
			        this._testJournal.lifeCycleAtStartOfWillUnmount = getLifeCycleState(
			          this,
			        );
			        this.state.hasWillUnmountCompleted = true;
			      \}
			    \}
			
			    // A component that is merely "constructed" (as in "constructor") but not
			    // yet initialized, or rendered.
			    //
			    const container = document.createElement('div');
			
			    let instance;
			    expect(() => \{
			      instance = ReactDOM.render(<LifeCycleComponent />, container);
			    \}).toWarnDev(
			      'LifeCycleComponent is accessing isMounted inside its render() function',
			    );
			
			    // getInitialState
			    expect(instance._testJournal.returnedFromGetInitialState).toEqual(
			      GET_INIT_STATE_RETURN_VAL,
			    );
			    expect(instance._testJournal.lifeCycleAtStartOfGetInitialState).toBe(
			      'UNMOUNTED',
			    );
			
			    // componentWillMount
			    expect(instance._testJournal.stateAtStartOfWillMount).toEqual(
			      instance._testJournal.returnedFromGetInitialState,
			    );
			    expect(instance._testJournal.lifeCycleAtStartOfWillMount).toBe('UNMOUNTED');
			
			    // componentDidMount
			    expect(instance._testJournal.stateAtStartOfDidMount).toEqual(
			      DID_MOUNT_STATE,
			    );
			    expect(instance._testJournal.lifeCycleAtStartOfDidMount).toBe('MOUNTED');
			
			    // initial render
			    expect(instance._testJournal.stateInInitialRender).toEqual(
			      INIT_RENDER_STATE,
			    );
			    expect(instance._testJournal.lifeCycleInInitialRender).toBe('UNMOUNTED');
			
			    expect(getLifeCycleState(instance)).toBe('MOUNTED');
			
			    // Now *update the component*
			    instance.forceUpdate();
			
			    // render 2nd time
			    expect(instance._testJournal.stateInLaterRender).toEqual(NEXT_RENDER_STATE);
			    expect(instance._testJournal.lifeCycleInLaterRender).toBe('MOUNTED');
			
			    expect(getLifeCycleState(instance)).toBe('MOUNTED');
			
			    ReactDOM.unmountComponentAtNode(container);
			
			    expect(instance._testJournal.stateAtStartOfWillUnmount).toEqual(
			      WILL_UNMOUNT_STATE,
			    );
			    // componentWillUnmount called right before unmount.
			    expect(instance._testJournal.lifeCycleAtStartOfWillUnmount).toBe('MOUNTED');
			
			    // But the current lifecycle of the component is unmounted.
			    expect(getLifeCycleState(instance)).toBe('UNMOUNTED');
			    expect(instance.state).toEqual(POST_WILL_UNMOUNT_STATE);
			  \});
			
			  it('should not throw when updating an auxiliary component', () => \{
			    class Tooltip extends React.Component \{
			      render() \{
			        return <div>\{this.props.children\}</div>;
			      \}
			
			      componentDidMount() \{
			        this.container = document.createElement('div');
			        this.updateTooltip();
			      \}
			
			      componentDidUpdate() \{
			        this.updateTooltip();
			      \}
			
			      updateTooltip = () => \{
			        // Even though this.props.tooltip has an owner, updating it shouldn't
			        // throw here because it's mounted as a root component
			        ReactDOM.render(this.props.tooltip, this.container);
			      \};
			    \}
			
			    class Component extends React.Component \{
			      render() \{
			        return (
			          <Tooltip ref="tooltip" tooltip=\{<div>\{this.props.tooltipText\}</div>\}>
			            \{this.props.text\}
			          </Tooltip>
			        );
			      \}
			    \}
			
			    const container = document.createElement('div');
			    ReactDOM.render(<Component text="uno" tooltipText="one" />, container);
			
			    // Since \`instance\` is a root component, we can set its props. This also
			    // makes Tooltip rerender the tooltip component, which shouldn't throw.
			    ReactDOM.render(<Component text="dos" tooltipText="two" />, container);
			  \});
			
			  it('should allow state updates in componentDidMount', () => \{
			    /**
			     * calls setState in an componentDidMount.
			     */
			    class SetStateInComponentDidMount extends React.Component \{
			      state = \{
			        stateField: this.props.valueToUseInitially,
			      \};
			
			      componentDidMount() \{
			        this.setState(\{stateField: this.props.valueToUseInOnDOMReady\});
			      \}
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    let instance = (
			      <SetStateInComponentDidMount
			        valueToUseInitially="hello"
			        valueToUseInOnDOMReady="goodbye"
			      />
			    );
			    instance = ReactTestUtils.renderIntoDocument(instance);
			    expect(instance.state.stateField).toBe('goodbye');
			  \});
			
			  it('should call nested legacy lifecycle methods in the right order', () => \{
			    let log;
			    const logger = function(msg) \{
			      return function() \{
			        // return true for shouldComponentUpdate
			        log.push(msg);
			        return true;
			      \};
			    \};
			    class Outer extends React.Component \{
			      UNSAFE_componentWillMount = logger('outer componentWillMount');
			      componentDidMount = logger('outer componentDidMount');
			      UNSAFE_componentWillReceiveProps = logger(
			        'outer componentWillReceiveProps',
			      );
			      shouldComponentUpdate = logger('outer shouldComponentUpdate');
			      UNSAFE_componentWillUpdate = logger('outer componentWillUpdate');
			      componentDidUpdate = logger('outer componentDidUpdate');
			      componentWillUnmount = logger('outer componentWillUnmount');
			      render() \{
			        return (
			          <div>
			            <Inner x=\{this.props.x\} />
			          </div>
			        );
			      \}
			    \}
			
			    class Inner extends React.Component \{
			      UNSAFE_componentWillMount = logger('inner componentWillMount');
			      componentDidMount = logger('inner componentDidMount');
			      UNSAFE_componentWillReceiveProps = logger(
			        'inner componentWillReceiveProps',
			      );
			      shouldComponentUpdate = logger('inner shouldComponentUpdate');
			      UNSAFE_componentWillUpdate = logger('inner componentWillUpdate');
			      componentDidUpdate = logger('inner componentDidUpdate');
			      componentWillUnmount = logger('inner componentWillUnmount');
			      render() \{
			        return <span>\{this.props.x\}</span>;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    log = [];
			    ReactDOM.render(<Outer x=\{1\} />, container);
			    expect(log).toEqual([
			      'outer componentWillMount',
			      'inner componentWillMount',
			      'inner componentDidMount',
			      'outer componentDidMount',
			    ]);
			
			    // Dedup warnings
			    log = [];
			    ReactDOM.render(<Outer x=\{2\} />, container);
			    expect(log).toEqual([
			      'outer componentWillReceiveProps',
			      'outer shouldComponentUpdate',
			      'outer componentWillUpdate',
			      'inner componentWillReceiveProps',
			      'inner shouldComponentUpdate',
			      'inner componentWillUpdate',
			      'inner componentDidUpdate',
			      'outer componentDidUpdate',
			    ]);
			
			    log = [];
			    ReactDOM.unmountComponentAtNode(container);
			    expect(log).toEqual([
			      'outer componentWillUnmount',
			      'inner componentWillUnmount',
			    ]);
			  \});
			
			  it('should call nested new lifecycle methods in the right order', () => \{
			    let log;
			    const logger = function(msg) \{
			      return function() \{
			        // return true for shouldComponentUpdate
			        log.push(msg);
			        return true;
			      \};
			    \};
			    class Outer extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps(props, prevState) \{
			        logger('outer getDerivedStateFromProps')();
			        return null;
			      \}
			      componentDidMount = logger('outer componentDidMount');
			      shouldComponentUpdate = logger('outer shouldComponentUpdate');
			      getSnapshotBeforeUpdate = logger('outer getSnapshotBeforeUpdate');
			      componentDidUpdate = logger('outer componentDidUpdate');
			      componentWillUnmount = logger('outer componentWillUnmount');
			      render() \{
			        return (
			          <div>
			            <Inner x=\{this.props.x\} />
			          </div>
			        );
			      \}
			    \}
			
			    class Inner extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps(props, prevState) \{
			        logger('inner getDerivedStateFromProps')();
			        return null;
			      \}
			      componentDidMount = logger('inner componentDidMount');
			      shouldComponentUpdate = logger('inner shouldComponentUpdate');
			      getSnapshotBeforeUpdate = logger('inner getSnapshotBeforeUpdate');
			      componentDidUpdate = logger('inner componentDidUpdate');
			      componentWillUnmount = logger('inner componentWillUnmount');
			      render() \{
			        return <span>\{this.props.x\}</span>;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    log = [];
			    ReactDOM.render(<Outer x=\{1\} />, container);
			    expect(log).toEqual([
			      'outer getDerivedStateFromProps',
			      'inner getDerivedStateFromProps',
			      'inner componentDidMount',
			      'outer componentDidMount',
			    ]);
			
			    // Dedup warnings
			    log = [];
			    ReactDOM.render(<Outer x=\{2\} />, container);
			    expect(log).toEqual([
			      'outer getDerivedStateFromProps',
			      'outer shouldComponentUpdate',
			      'inner getDerivedStateFromProps',
			      'inner shouldComponentUpdate',
			      'inner getSnapshotBeforeUpdate',
			      'outer getSnapshotBeforeUpdate',
			      'inner componentDidUpdate',
			      'outer componentDidUpdate',
			    ]);
			
			    log = [];
			    ReactDOM.unmountComponentAtNode(container);
			    expect(log).toEqual([
			      'outer componentWillUnmount',
			      'inner componentWillUnmount',
			    ]);
			  \});
			
			  it('should not invoke deprecated lifecycles (cWM/cWRP/cWU) if new static gDSFP is present', () => \{
			    class Component extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps() \{
			        return null;
			      \}
			      componentWillMount() \{
			        throw Error('unexpected');
			      \}
			      componentWillReceiveProps() \{
			        throw Error('unexpected');
			      \}
			      componentWillUpdate() \{
			        throw Error('unexpected');
			      \}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    expect(() => ReactDOM.render(<Component />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.',
			    );
			  \});
			
			  it('should not invoke deprecated lifecycles (cWM/cWRP/cWU) if new getSnapshotBeforeUpdate is present', () => \{
			    class Component extends React.Component \{
			      state = \{\};
			      getSnapshotBeforeUpdate() \{
			        return null;
			      \}
			      componentWillMount() \{
			        throw Error('unexpected');
			      \}
			      componentWillReceiveProps() \{
			        throw Error('unexpected');
			      \}
			      componentWillUpdate() \{
			        throw Error('unexpected');
			      \}
			      componentDidUpdate() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    expect(() => ReactDOM.render(<Component value=\{1\} />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.',
			    );
			    ReactDOM.render(<Component value=\{2\} />, container);
			  \});
			
			  it('should not invoke new unsafe lifecycles (cWM/cWRP/cWU) if static gDSFP is present', () => \{
			    class Component extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps() \{
			        return null;
			      \}
			      UNSAFE_componentWillMount() \{
			        throw Error('unexpected');
			      \}
			      UNSAFE_componentWillReceiveProps() \{
			        throw Error('unexpected');
			      \}
			      UNSAFE_componentWillUpdate() \{
			        throw Error('unexpected');
			      \}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    expect(() => ReactDOM.render(<Component value=\{1\} />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.',
			    );
			    ReactDOM.render(<Component value=\{2\} />, container);
			  \});
			
			  it('should warn about deprecated lifecycles (cWM/cWRP/cWU) if new static gDSFP is present', () => \{
			    const container = document.createElement('div');
			
			    class AllLegacyLifecycles extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps() \{
			        return null;
			      \}
			      componentWillMount() \{\}
			      UNSAFE_componentWillReceiveProps() \{\}
			      componentWillUpdate() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    expect(() => ReactDOM.render(<AllLegacyLifecycles />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			        'AllLegacyLifecycles uses getDerivedStateFromProps() but also contains the following legacy lifecycles:\\n' +
			        '  componentWillMount\\n' +
			        '  UNSAFE_componentWillReceiveProps\\n' +
			        '  componentWillUpdate\\n\\n' +
			        'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			        'https://fb.me/react-async-component-lifecycle-hooks',
			    );
			
			    class WillMount extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps() \{
			        return null;
			      \}
			      UNSAFE_componentWillMount() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    expect(() => ReactDOM.render(<WillMount />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			        'WillMount uses getDerivedStateFromProps() but also contains the following legacy lifecycles:\\n' +
			        '  UNSAFE_componentWillMount\\n\\n' +
			        'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			        'https://fb.me/react-async-component-lifecycle-hooks',
			    );
			
			    class WillMountAndUpdate extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps() \{
			        return null;
			      \}
			      componentWillMount() \{\}
			      UNSAFE_componentWillUpdate() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    expect(() => ReactDOM.render(<WillMountAndUpdate />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			        'WillMountAndUpdate uses getDerivedStateFromProps() but also contains the following legacy lifecycles:\\n' +
			        '  componentWillMount\\n' +
			        '  UNSAFE_componentWillUpdate\\n\\n' +
			        'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			        'https://fb.me/react-async-component-lifecycle-hooks',
			    );
			
			    class WillReceiveProps extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps() \{
			        return null;
			      \}
			      componentWillReceiveProps() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    expect(() => ReactDOM.render(<WillReceiveProps />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			        'WillReceiveProps uses getDerivedStateFromProps() but also contains the following legacy lifecycles:\\n' +
			        '  componentWillReceiveProps\\n\\n' +
			        'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			        'https://fb.me/react-async-component-lifecycle-hooks',
			    );
			  \});
			
			  it('should warn about deprecated lifecycles (cWM/cWRP/cWU) if new getSnapshotBeforeUpdate is present', () => \{
			    const container = document.createElement('div');
			
			    class AllLegacyLifecycles extends React.Component \{
			      state = \{\};
			      getSnapshotBeforeUpdate() \{\}
			      componentWillMount() \{\}
			      UNSAFE_componentWillReceiveProps() \{\}
			      componentWillUpdate() \{\}
			      componentDidUpdate() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    expect(() => ReactDOM.render(<AllLegacyLifecycles />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			        'AllLegacyLifecycles uses getSnapshotBeforeUpdate() but also contains the following legacy lifecycles:\\n' +
			        '  componentWillMount\\n' +
			        '  UNSAFE_componentWillReceiveProps\\n' +
			        '  componentWillUpdate\\n\\n' +
			        'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			        'https://fb.me/react-async-component-lifecycle-hooks',
			    );
			
			    class WillMount extends React.Component \{
			      state = \{\};
			      getSnapshotBeforeUpdate() \{\}
			      UNSAFE_componentWillMount() \{\}
			      componentDidUpdate() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    expect(() => ReactDOM.render(<WillMount />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			        'WillMount uses getSnapshotBeforeUpdate() but also contains the following legacy lifecycles:\\n' +
			        '  UNSAFE_componentWillMount\\n\\n' +
			        'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			        'https://fb.me/react-async-component-lifecycle-hooks',
			    );
			
			    class WillMountAndUpdate extends React.Component \{
			      state = \{\};
			      getSnapshotBeforeUpdate() \{\}
			      componentWillMount() \{\}
			      UNSAFE_componentWillUpdate() \{\}
			      componentDidUpdate() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    expect(() => ReactDOM.render(<WillMountAndUpdate />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			        'WillMountAndUpdate uses getSnapshotBeforeUpdate() but also contains the following legacy lifecycles:\\n' +
			        '  componentWillMount\\n' +
			        '  UNSAFE_componentWillUpdate\\n\\n' +
			        'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			        'https://fb.me/react-async-component-lifecycle-hooks',
			    );
			
			    class WillReceiveProps extends React.Component \{
			      state = \{\};
			      getSnapshotBeforeUpdate() \{\}
			      componentWillReceiveProps() \{\}
			      componentDidUpdate() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    expect(() => ReactDOM.render(<WillReceiveProps />, container)).toWarnDev(
			      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +
			        'WillReceiveProps uses getSnapshotBeforeUpdate() but also contains the following legacy lifecycles:\\n' +
			        '  componentWillReceiveProps\\n\\n' +
			        'The above lifecycles should be removed. Learn more about this warning here:\\n' +
			        'https://fb.me/react-async-component-lifecycle-hooks',
			    );
			  \});
			
			  it('calls effects on module-pattern component', function() \{
			   
			  \});
			
			  it('should warn if getDerivedStateFromProps returns undefined', () => \{
			    class MyComponent extends React.Component \{
			      state = \{\};
			      static getDerivedStateFromProps() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const div = document.createElement('div');
			    expect(() => ReactDOM.render(<MyComponent />, div)).toWarnDev(
			      'MyComponent.getDerivedStateFromProps(): A valid state object (or null) must ' +
			        'be returned. You have returned undefined.',
			    );
			
			    // De-duped
			    ReactDOM.render(<MyComponent />, div);
			  \});
			
			  it('should warn if state is not initialized before getDerivedStateFromProps', () => \{
			    class MyComponent extends React.Component \{
			      static getDerivedStateFromProps() \{
			        return null;
			      \}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const div = document.createElement('div');
			    expect(() => ReactDOM.render(<MyComponent />, div)).toWarnDev(
			      'MyComponent: Did not properly initialize state during construction. ' +
			        'Expected state to be an object, but it was undefined.',
			    );
			
			    // De-duped
			    ReactDOM.render(<MyComponent />, div);
			  \});
			
			  it('should invoke both deprecated and new lifecycles if both are present', () => \{
			    const log = [];
			
			    class MyComponent extends React.Component \{
			      componentWillMount() \{
			        log.push('componentWillMount');
			      \}
			      componentWillReceiveProps() \{
			        log.push('componentWillReceiveProps');
			      \}
			      componentWillUpdate() \{
			        log.push('componentWillUpdate');
			      \}
			      UNSAFE_componentWillMount() \{
			        log.push('UNSAFE_componentWillMount');
			      \}
			      UNSAFE_componentWillReceiveProps() \{
			        log.push('UNSAFE_componentWillReceiveProps');
			      \}
			      UNSAFE_componentWillUpdate() \{
			        log.push('UNSAFE_componentWillUpdate');
			      \}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const div = document.createElement('div');
			    ReactDOM.render(<MyComponent foo="bar" />, div);
			    expect(log).toEqual(['componentWillMount', 'UNSAFE_componentWillMount']);
			
			    log.length = 0;
			
			    ReactDOM.render(<MyComponent foo="baz" />, div);
			    expect(log).toEqual([
			      'componentWillReceiveProps',
			      'UNSAFE_componentWillReceiveProps',
			      'componentWillUpdate',
			      'UNSAFE_componentWillUpdate',
			    ]);
			  \});
			
			  it('should not override state with stale values if prevState is spread within getDerivedStateFromProps', () => \{
			    const divRef = React.createRef();
			    let childInstance;
			
			    class Child extends React.Component \{
			      state = \{local: 0\};
			      static getDerivedStateFromProps(nextProps, prevState) \{
			        return \{...prevState, remote: nextProps.remote\};
			      \}
			      updateState = () => \{
			        this.setState(state => (\{local: state.local + 1\}));
			        this.props.onChange(this.state.remote + 1);
			      \};
			      render() \{
			        childInstance = this;
			        return (
			          <div onClick=\{this.updateState\} ref=\{divRef\}>\{\`remote:\$\{
			            this.state.remote
			          \}, local:\$\{this.state.local\}\`\}</div>
			        );
			      \}
			    \}
			
			    class Parent extends React.Component \{
			      state = \{value: 0\};
			      handleChange = value => \{
			        this.setState(\{value\});
			      \};
			      render() \{
			        return <Child remote=\{this.state.value\} onChange=\{this.handleChange\} />;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Parent />);
			    expect(divRef.current.textContent).toBe('remote:0, local:0');
			
			    // Trigger setState() calls
			    childInstance.updateState();
			    expect(divRef.current.textContent).toBe('remote:1, local:1');
			
			    // Trigger batched setState() calls
			    ReactTestUtils.Simulate.click(divRef.current);
			    expect(divRef.current.textContent).toBe('remote:2, local:2');
			  \});
			
			  it('should pass the return value from getSnapshotBeforeUpdate to componentDidUpdate', () => \{
			    const log = [];
			
			    class MyComponent extends React.Component \{
			      state = \{
			        value: 0,
			      \};
			      static getDerivedStateFromProps(nextProps, prevState) \{
			        return \{
			          value: prevState.value + 1,
			        \};
			      \}
			      getSnapshotBeforeUpdate(prevProps, prevState) \{
			        log.push(
			          \`getSnapshotBeforeUpdate() prevProps:\$\{prevProps.value\} prevState:\$\{
			            prevState.value
			          \}\`,
			        );
			        return 'abc';
			      \}
			      componentDidUpdate(prevProps, prevState, snapshot) \{
			        log.push(
			          \`componentDidUpdate() prevProps:\$\{prevProps.value\} prevState:\$\{
			            prevState.value
			          \} snapshot:\$\{snapshot\}\`,
			        );
			      \}
			      render() \{
			        log.push('render');
			        return null;
			      \}
			    \}
			
			    const div = document.createElement('div');
			    ReactDOM.render(
			      <div>
			        <MyComponent value="foo" />
			      </div>,
			      div,
			    );
			    expect(log).toEqual(['render']);
			    log.length = 0;
			
			    ReactDOM.render(
			      <div>
			        <MyComponent value="bar" />
			      </div>,
			      div,
			    );
			    expect(log).toEqual([
			      'render',
			      'getSnapshotBeforeUpdate() prevProps:foo prevState:1',
			      'componentDidUpdate() prevProps:foo prevState:1 snapshot:abc',
			    ]);
			    log.length = 0;
			
			    ReactDOM.render(
			      <div>
			        <MyComponent value="baz" />
			      </div>,
			      div,
			    );
			    expect(log).toEqual([
			      'render',
			      'getSnapshotBeforeUpdate() prevProps:bar prevState:2',
			      'componentDidUpdate() prevProps:bar prevState:2 snapshot:abc',
			    ]);
			    log.length = 0;
			
			    ReactDOM.render(<div />, div);
			    expect(log).toEqual([]);
			  \});
			
			  it('should call getSnapshotBeforeUpdate before mutations are committed', () => \{
			    const log = [];
			
			    class MyComponent extends React.Component \{
			      divRef = React.createRef();
			      getSnapshotBeforeUpdate(prevProps, prevState) \{
			        log.push('getSnapshotBeforeUpdate');
			        expect(this.divRef.current.textContent).toBe(
			          \`value:\$\{prevProps.value\}\`,
			        );
			        return 'foobar';
			      \}
			      componentDidUpdate(prevProps, prevState, snapshot) \{
			        log.push('componentDidUpdate');
			        expect(this.divRef.current.textContent).toBe(
			          \`value:\$\{this.props.value\}\`,
			        );
			        expect(snapshot).toBe('foobar');
			      \}
			      render() \{
			        log.push('render');
			        return <div ref=\{this.divRef\}>\{\`value:\$\{this.props.value\}\`\}</div>;
			      \}
			    \}
			
			    const div = document.createElement('div');
			    ReactDOM.render(<MyComponent value="foo" />, div);
			    expect(log).toEqual(['render']);
			    log.length = 0;
			
			    ReactDOM.render(<MyComponent value="bar" />, div);
			    expect(log).toEqual([
			      'render',
			      'getSnapshotBeforeUpdate',
			      'componentDidUpdate',
			    ]);
			    log.length = 0;
			  \});
			
			  it('should warn if getSnapshotBeforeUpdate returns undefined', () => \{
			    class MyComponent extends React.Component \{
			      getSnapshotBeforeUpdate() \{\}
			      componentDidUpdate() \{\}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const div = document.createElement('div');
			    ReactDOM.render(<MyComponent value="foo" />, div);
			    expect(() => ReactDOM.render(<MyComponent value="bar" />, div)).toWarnDev(
			      'MyComponent.getSnapshotBeforeUpdate(): A snapshot value (or null) must ' +
			        'be returned. You have returned undefined.',
			    );
			
			    // De-duped
			    ReactDOM.render(<MyComponent value="baz" />, div);
			  \});
			
			  it('should warn if getSnapshotBeforeUpdate is defined with no componentDidUpdate', () => \{
			    class MyComponent extends React.Component \{
			      getSnapshotBeforeUpdate() \{
			        return null;
			      \}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const div = document.createElement('div');
			    expect(() => ReactDOM.render(<MyComponent />, div)).toWarnDev(
			      'MyComponent: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). ' +
			        'This component defines getSnapshotBeforeUpdate() only.',
			    );
			
			    // De-duped
			    ReactDOM.render(<MyComponent />, div);
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactComponentLifeCycle-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(28)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactCompositeComponent-test.js', () => {
        const sourceCode = `
			"use strict";
			
			let ChildUpdates;
			let MorphingComponent;
			let React;
			let ReactDOM;
			let ReactDOMServer;
			let ReactCurrentOwner;
			let ReactTestUtils;
			let PropTypes;
			let shallowEqual;
			let shallowCompare;
			
			describe("ReactCompositeComponent", () => \{
			    beforeEach(() => \{
			        jest.resetModules();
			        React = require("react");
			        ReactDOM = require("react-dom");
			        ReactDOMServer = require("react-server-renderer");
			        // ReactCurrentOwner = require('react')
			        //     .__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
			        ReactTestUtils = require("test-utils");
			        PropTypes = require("prop-types");
			        shallowCompare = require("lib/shallowCompare");
			
			        MorphingComponent = class extends React.Component \{
			            state = \{ activated: false \};
			
			            _toggleActivatedState = () => \{
			                this.setState(\{ activated: !this.state.activated \});
			            \};
			
			            render() \{
			                const toggleActivatedState = this._toggleActivatedState;
			                return !this.state.activated ? (
			                    <a ref="x" onClick=\{toggleActivatedState\} />
			                ) : (
			                    <b ref="x" onClick=\{toggleActivatedState\} />
			                );
			            \}
			        \};
			
			        /**
			         * We'll use this to ensure that an old version is not cached when it is
			         * reallocated again.
			         */
			        ChildUpdates = class extends React.Component \{
			            getAnchor = () => \{
			                return this.refs.anch;
			            \};
			
			            render() \{
			                const className = this.props.anchorClassOn ? "anchorClass" : "";
			                return this.props.renderAnchor ? (
			                    <a ref="anch" className=\{className\} />
			                ) : (
			                    <b />
			                );
			            \}
			        \};
			    \});
			
			    it("should support module pattern components", () => \{
			        function Child(\{ test \}) \{
			         
			             return <div>\{test\}</div>;
			
			        \}
			
			        const el = document.createElement("div");
			        ReactDOM.render(<Child test="test" />, el);
			
			        expect(el.textContent).toBe("test");
			    \});
			
			    it("should support rendering to different child types over time", () => \{
			        const instance = ReactTestUtils.renderIntoDocument(
			            <MorphingComponent />
			        );
			        let el = ReactDOM.findDOMNode(instance);
			        expect(el.tagName).toBe("A");
			
			        instance._toggleActivatedState();
			        el = ReactDOM.findDOMNode(instance);
			        expect(el.tagName).toBe("B");
			
			        instance._toggleActivatedState();
			        el = ReactDOM.findDOMNode(instance);
			        expect(el.tagName).toBe("A");
			    \});
			
			    it("should not thrash a server rendered layout with client side one", () => \{
			        class Child extends React.Component \{
			            render() \{
			                return null;
			            \}
			        \}
			
			        class Parent extends React.Component \{
			            render() \{
			                return (
			                    <div>
			                        <Child />
			                    </div>
			                );
			            \}
			        \}
			
			        const markup = ReactDOMServer.renderToString(<Parent />);
			
			        // Old API based on heuristic
			        let container = document.createElement("div");
			        container.innerHTML = markup;
			        expect(() =>
			            ReactDOM.render(<Parent />, container)
			        ).toLowPriorityWarnDev(
			            "render(): Calling ReactDOM.render() to hydrate server-rendered markup " +
			                "will stop working in React v17. Replace the ReactDOM.render() call " +
			                "with ReactDOM.hydrate() if you want React to attach to the server HTML."
			        );
			
			        // New explicit API
			        container = document.createElement("div");
			        container.innerHTML = markup;
			        ReactDOM.hydrate(<Parent />, container);
			    \});
			
			    it("should react to state changes from callbacks", () => \{
			        const instance = ReactTestUtils.renderIntoDocument(
			            <MorphingComponent />
			        );
			        let el = ReactDOM.findDOMNode(instance);
			        expect(el.tagName).toBe("A");
			
			        ReactTestUtils.Simulate.click(el);
			        el = ReactDOM.findDOMNode(instance);
			        expect(el.tagName).toBe("B");
			    \});
			
			    it("should rewire refs when rendering to different child types", () => \{
			        const instance = ReactTestUtils.renderIntoDocument(
			            <MorphingComponent />
			        );
			
			        expect(ReactDOM.findDOMNode(instance.refs.x).tagName).toBe("A");
			        instance._toggleActivatedState();
			        expect(ReactDOM.findDOMNode(instance.refs.x).tagName).toBe("B");
			        instance._toggleActivatedState();
			        expect(ReactDOM.findDOMNode(instance.refs.x).tagName).toBe("A");
			    \});
			
			    it("should not cache old DOM nodes when switching constructors", () => \{
			        const container = document.createElement("div");
			        const instance = ReactDOM.render(
			            <ChildUpdates renderAnchor=\{true\} anchorClassOn=\{false\} />,
			            container
			        );
			        ReactDOM.render(
			            // Warm any cache
			            <ChildUpdates renderAnchor=\{true\} anchorClassOn=\{true\} />,
			            container
			        );
			        ReactDOM.render(
			            // Clear out the anchor
			            <ChildUpdates renderAnchor=\{false\} anchorClassOn=\{true\} />,
			            container
			        );
			        ReactDOM.render(
			            // rerender
			            <ChildUpdates renderAnchor=\{true\} anchorClassOn=\{false\} />,
			            container
			        );
			        expect(instance.getAnchor().className).toBe("");
			    \});
			
			    it("should use default values for undefined props", () => \{
			        class Component extends React.Component \{
			            static defaultProps = \{ prop: "testKey" \};
			
			            render() \{
			                return <span />;
			            \}
			        \}
			
			        const instance1 = ReactTestUtils.renderIntoDocument(<Component />);
			        expect(instance1.props).toEqual(\{ prop: "testKey" \});
			
			        const instance2 = ReactTestUtils.renderIntoDocument(
			            <Component prop=\{undefined\} />
			        );
			        expect(instance2.props).toEqual(\{ prop: "testKey" \});
			
			        const instance3 = ReactTestUtils.renderIntoDocument(
			            <Component prop=\{null\} />
			        );
			        expect(instance3.props).toEqual(\{ prop: null \});
			    \});
			
			    it("should not mutate passed-in props object", () => \{
			        class Component extends React.Component \{
			            static defaultProps = \{ prop: "testKey" \};
			
			            render() \{
			                return <span />;
			            \}
			        \}
			
			        const inputProps = \{\};
			        let instance1 = <Component \{...inputProps\} />;
			        instance1 = ReactTestUtils.renderIntoDocument(instance1);
			        expect(instance1.props.prop).toBe("testKey");
			
			        // We don't mutate the input, just in case the caller wants to do something
			        // with it after using it to instantiate a component
			        expect(inputProps.prop).not.toBeDefined();
			    \});
			
			    it("should warn about \`forceUpdate\` on not-yet-mounted components", () => \{
			        class MyComponent extends React.Component \{
			            constructor(props) \{
			                super(props);
			                this.forceUpdate();
			            \}
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        expect(() => ReactDOM.render(<MyComponent />, container)).toWarnDev(
			            "Warning: Can't call forceUpdate on a component that is not yet mounted. " +
			                "This is a no-op, but it might indicate a bug in your application. " +
			                "Instead, assign to \`this.state\` directly or define a \`state = \{\};\` " +
			                "class property with the desired state in the MyComponent component."
			        );
			
			        // No additional warning should be recorded
			        const container2 = document.createElement("div");
			        ReactDOM.render(<MyComponent />, container2);
			    \});
			
			    it("should warn about \`setState\` on not-yet-mounted components", () => \{
			        class MyComponent extends React.Component \{
			            constructor(props) \{
			                super(props);
			                this.setState();
			            \}
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        expect(() => ReactDOM.render(<MyComponent />, container)).toWarnDev(
			            "Warning: Can't call setState on a component that is not yet mounted. " +
			                "This is a no-op, but it might indicate a bug in your application. " +
			                "Instead, assign to \`this.state\` directly or define a \`state = \{\};\` " +
			                "class property with the desired state in the MyComponent component."
			        );
			
			        // No additional warning should be recorded
			        const container2 = document.createElement("div");
			        ReactDOM.render(<MyComponent />, container2);
			    \});
			
			    it("should warn about \`forceUpdate\` on unmounted components", () => \{
			        const container = document.createElement("div");
			        document.body.appendChild(container);
			
			        class Component extends React.Component \{
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        let instance = <Component />;
			        expect(instance.forceUpdate).not.toBeDefined();
			
			        instance = ReactDOM.render(instance, container);
			        instance.forceUpdate();
			
			        ReactDOM.unmountComponentAtNode(container);
			
			        expect(() => instance.forceUpdate()).toWarnDev(
			            "Warning: Can't call setState (or forceUpdate) on an unmounted " +
			                "component. This is a no-op, but it indicates a memory leak in your " +
			                "application. To fix, cancel all subscriptions and asynchronous " +
			                "tasks in the componentWillUnmount method.\\n" +
			                "    in Component (at **)"
			        );
			
			        // No additional warning should be recorded
			        instance.forceUpdate();
			    \});
			
			    it("should warn about \`setState\` on unmounted components", () => \{
			        const container = document.createElement("div");
			        document.body.appendChild(container);
			
			        let renders = 0;
			
			        class Component extends React.Component \{
			            state = \{ value: 0 \};
			
			            render() \{
			                renders++;
			                return <div />;
			            \}
			        \}
			
			        let instance;
			        ReactDOM.render(
			            <div>
			                <span>
			                    <Component ref=\{c => (instance = c || instance)\} />
			                </span>
			            </div>,
			            container
			        );
			
			        expect(renders).toBe(1);
			
			        instance.setState(\{ value: 1 \});
			
			        expect(renders).toBe(2);
			
			        ReactDOM.render(<div />, container);
			
			        expect(() => \{
			            instance.setState(\{ value: 2 \});
			        \}).toWarnDev(
			            "Warning: Can't call setState (or forceUpdate) on an unmounted " +
			                "component. This is a no-op, but it indicates a memory leak in your " +
			                "application. To fix, cancel all subscriptions and asynchronous " +
			                "tasks in the componentWillUnmount method.\\n" +
			                "    in Component (at **)\\n" +
			                "    in span"
			        );
			
			        expect(renders).toBe(2);
			    \});
			
			    it("should silently allow \`setState\`, not call cb on unmounting components", () => \{
			        let cbCalled = false;
			        const container = document.createElement("div");
			        document.body.appendChild(container);
			
			        class Component extends React.Component \{
			            state = \{ value: 0 \};
			
			            componentWillUnmount() \{
			                expect(() => \{
			                    this.setState(\{ value: 2 \}, function() \{
			                        cbCalled = true;
			                    \});
			                \}).not.toThrow();
			            \}
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const instance = ReactDOM.render(<Component />, container);
			        instance.setState(\{ value: 1 \});
			
			        ReactDOM.unmountComponentAtNode(container);
			        expect(cbCalled).toBe(false);
			    \});
			
			    it("should warn when rendering a class with a render method that does not extend React.Component", () => \{
			        const container = document.createElement("div");
			        class ClassWithRenderNotExtended \{
			            render() \{
			                return <div />;
			            \}
			        \}
			        //anujs没有这个限制，只要返回JSX就行了
			
			        expect(() => \{
			            expect(() => \{
			                ReactDOM.render(<ClassWithRenderNotExtended />, container);
			            \}).toWarnDev(
			                \`ClassWithRenderNotExtended doesn't extend React.Component\`
			            );
			        \}).toThrow();
			    \});
			
			    it("should warn about \`setState\` in render", () => \{
			        const container = document.createElement("div");
			
			        let renderedState = -1;
			        let renderPasses = 0;
			
			        class Component extends React.Component \{
			            state = \{ value: 0 \};
			
			            render() \{
			                renderPasses++;
			                renderedState = this.state.value;
			                if (this.state.value === 0) \{
			                    this.setState(\{ value: 1 \});
			                \}
			                return <div />;
			            \}
			        \}
			
			        let instance;
			
			        expect(() => \{
			            instance = ReactDOM.render(<Component />, container);
			        \}).toWarnDev(
			            "Cannot update during an existing state transition (such as within " +
			                "\`render\` or another component's constructor). Render methods should " +
			                "be a pure function of props and state; constructor side-effects are " +
			                "an anti-pattern, but can be moved to \`componentWillMount\`."
			        );
			
			        // The setState call is queued and then executed as a second pass. This
			        // behavior is undefined though so we're free to change it to suit the
			        // implementation details.
			        expect(renderPasses).toBe(2);
			        expect(renderedState).toBe(1);
			        expect(instance.state.value).toBe(1);
			
			        // Forcing a rerender anywhere will cause the update to happen.
			        const instance2 = ReactDOM.render(<Component prop=\{123\} />, container);
			        expect(instance).toBe(instance2);
			        expect(renderedState).toBe(1);
			        expect(instance2.state.value).toBe(1);
			
			        // Test deduplication; (no additional warnings are expected).
			        ReactDOM.unmountComponentAtNode(container);
			        ReactDOM.render(<Component prop=\{123\} />, container);
			    \});
			
			    it("should warn about \`setState\` in getChildContext", () => \{
			        const container = document.createElement("div");
			
			        let renderPasses = 0;
			
			        class Component extends React.Component \{
			            state = \{ value: 0 \};
			
			            getChildContext() \{
			                if (this.state.value === 0) \{
			                    this.setState(\{ value: 1 \});
			                \}
			            \}
			
			            render() \{
			                renderPasses++;
			                return <div />;
			            \}
			        \}
			        Component.childContextTypes = \{\};
			
			        let instance;
			
			        expect(() => \{
			            instance = ReactDOM.render(<Component />, container);
			        \}).toWarnDev(
			            "Warning: setState(...): Cannot call setState() inside getChildContext()"
			        );
			
			        expect(renderPasses).toBe(2);
			        expect(instance.state.value).toBe(1);
			
			        // Test deduplication; (no additional warnings are expected).
			        ReactDOM.unmountComponentAtNode(container);
			        ReactDOM.render(<Component />, container);
			    \});
			
			    it("should cleanup even if render() fatals", () => \{
			        console.log("不测试ReactCurrentOwner");
			        return;
			        class BadComponent extends React.Component \{
			            render() \{
			                throw new Error();
			            \}
			        \}
			
			        let instance = <BadComponent />;
			
			        expect(ReactCurrentOwner.current).toBe(null);
			
			        expect(() => \{
			            instance = ReactTestUtils.renderIntoDocument(instance);
			        \}).toThrow();
			
			        expect(ReactCurrentOwner.current).toBe(null);
			    \});
			
			    it("should call componentWillUnmount before unmounting", () => \{
			        const container = document.createElement("div");
			        let innerUnmounted = false;
			
			        class Component extends React.Component \{
			            render() \{
			                return (
			                    <div>
			                        <Inner />
			                        Text
			                    </div>
			                );
			            \}
			        \}
			
			        class Inner extends React.Component \{
			            componentWillUnmount() \{
			                innerUnmounted = true;
			            \}
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        ReactDOM.render(<Component />, container);
			        ReactDOM.unmountComponentAtNode(container);
			        expect(innerUnmounted).toBe(true);
			    \});
			
			    it("should warn when shouldComponentUpdate() returns undefined", () => \{
			        class Component extends React.Component \{
			            state = \{ bogus: false \};
			
			            shouldComponentUpdate() \{
			                return undefined;
			            \}
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const instance = ReactTestUtils.renderIntoDocument(<Component />);
			
			        expect(() => instance.setState(\{ bogus: true \})).toWarnDev(
			            "Warning: Component.shouldComponentUpdate(): Returned undefined instead of a " +
			                "boolean value. Make sure to return true or false."
			        );
			    \});
			
			    it("should warn when componentDidUnmount method is defined", () => \{
			        class Component extends React.Component \{
			            componentDidUnmount = () => \{\};
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        expect(() =>
			            ReactTestUtils.renderIntoDocument(<Component />)
			        ).toWarnDev(
			            "Warning: Component has a method called " +
			                "componentDidUnmount(). But there is no such lifecycle method. " +
			                "Did you mean componentWillUnmount()?"
			        );
			    \});
			
			    it("should warn when componentDidReceiveProps method is defined", () => \{
			        class Component extends React.Component \{
			            componentDidReceiveProps = () => \{\};
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        expect(() =>
			            ReactTestUtils.renderIntoDocument(<Component />)
			        ).toWarnDev(
			            "Warning: Component has a method called " +
			                "componentDidReceiveProps(). But there is no such lifecycle method. " +
			                "If you meant to update the state in response to changing props, " +
			                "use componentWillReceiveProps(). If you meant to fetch data or " +
			                "run side-effects or mutations after React has updated the UI, use componentDidUpdate()."
			        );
			    \});
			
			    it("should warn when defaultProps was defined as an instance property", () => \{
			        class Component extends React.Component \{
			            constructor(props) \{
			                super(props);
			                this.defaultProps = \{ name: "Abhay" \};
			            \}
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        expect(() =>
			            ReactTestUtils.renderIntoDocument(<Component />)
			        ).toWarnDev(
			            "Warning: Setting defaultProps as an instance property on Component is not supported " +
			                "and will be ignored. Instead, define defaultProps as a static property on Component."
			        );
			    \});
			
			    it("should pass context to children when not owner", () => \{
			        class Parent extends React.Component \{
			            render() \{
			                return (
			                    <Child>
			                        <Grandchild />
			                    </Child>
			                );
			            \}
			        \}
			
			        class Child extends React.Component \{
			            static childContextTypes = \{
			                foo: PropTypes.string
			            \};
			
			            getChildContext() \{
			                return \{
			                    foo: "bar"
			                \};
			            \}
			
			            render() \{
			                return React.Children.only(this.props.children);
			            \}
			        \}
			
			        class Grandchild extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string
			            \};
			
			            render() \{
			                return <div>\{this.context.foo\}</div>;
			            \}
			        \}
			
			        const component = ReactTestUtils.renderIntoDocument(<Parent />);
			        expect(ReactDOM.findDOMNode(component).innerHTML).toBe("bar");
			    \});
			
			    it("should skip update when rerendering element in container", () => \{
			        window.xxx = true;
			        class Parent extends React.Component \{
			            render() \{
			                return <div>\{this.props.children\}</div>;
			            \}
			        \}
			
			        let childRenders = 0;
			
			        class Child extends React.Component \{
			            render() \{
			                childRenders++;
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        const child = <Child />;
			
			        ReactDOM.render(<Parent>\{child\}</Parent>, container);
			
			        ReactDOM.render(<Parent>\{child\}</Parent>, container);
			        window.xxx = false;
			        expect(childRenders).toBe(1);
			    \});
			
			    it("should pass context when re-rendered for static child", () => \{
			        let parentInstance = null;
			        let childInstance = null;
			
			        class Parent extends React.Component \{
			            static childContextTypes = \{
			                foo: PropTypes.string,
			                flag: PropTypes.bool
			            \};
			
			            state = \{
			                flag: false
			            \};
			
			            getChildContext() \{
			                return \{
			                    foo: "bar",
			                    flag: this.state.flag
			                \};
			            \}
			
			            render() \{
			                return React.Children.only(this.props.children);
			            \}
			        \}
			
			        class Middle extends React.Component \{
			            render() \{
			                return this.props.children;
			            \}
			        \}
			
			        class Child extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string,
			                flag: PropTypes.bool
			            \};
			
			            render() \{
			                childInstance = this;
			                return <span>Child</span>;
			            \}
			        \}
			
			        parentInstance = ReactTestUtils.renderIntoDocument(
			            <Parent>
			                <Middle>
			                    <Child />
			                </Middle>
			            </Parent>
			        );
			
			        expect(parentInstance.state.flag).toBe(false);
			        expect(childInstance.context).toEqual(\{ foo: "bar", flag: false \});
			
			        parentInstance.setState(\{ flag: true \});
			        expect(parentInstance.state.flag).toBe(true);
			        expect(childInstance.context).toEqual(\{ foo: "bar", flag: true \});
			    \});
			
			    it("should pass context when re-rendered for static child within a composite component", () => \{
			        class Parent extends React.Component \{
			            static childContextTypes = \{
			                flag: PropTypes.bool
			            \};
			
			            state = \{
			                flag: true
			            \};
			
			            getChildContext() \{
			                return \{
			                    flag: this.state.flag
			                \};
			            \}
			
			            render() \{
			                return <div>\{this.props.children\}</div>;
			            \}
			        \}
			
			        class Child extends React.Component \{
			            static contextTypes = \{
			                flag: PropTypes.bool
			            \};
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        class Wrapper extends React.Component \{
			            render() \{
			                return (
			                    <Parent ref="parent">
			                        <Child ref="child" />
			                    </Parent>
			                );
			            \}
			        \}
			
			        const wrapper = ReactTestUtils.renderIntoDocument(<Wrapper />);
			
			        expect(wrapper.refs.parent.state.flag).toEqual(true);
			        expect(wrapper.refs.child.context).toEqual(\{ flag: true \});
			
			        // We update <Parent /> while <Child /> is still a static prop relative to this update
			        wrapper.refs.parent.setState(\{ flag: false \});
			
			        expect(wrapper.refs.parent.state.flag).toEqual(false);
			        expect(wrapper.refs.child.context).toEqual(\{ flag: false \});
			    \});
			
			    it("should pass context transitively", () => \{
			        let childInstance = null;
			        let grandchildInstance = null;
			
			        class Parent extends React.Component \{
			            static childContextTypes = \{
			                foo: PropTypes.string,
			                depth: PropTypes.number
			            \};
			
			            getChildContext() \{
			                return \{
			                    foo: "bar",
			                    depth: 0
			                \};
			            \}
			
			            render() \{
			                return <Child />;
			            \}
			        \}
			
			        class Child extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string,
			                depth: PropTypes.number
			            \};
			
			            static childContextTypes = \{
			                depth: PropTypes.number
			            \};
			
			            getChildContext() \{
			                return \{
			                    depth: this.context.depth + 1
			                \};
			            \}
			
			            render() \{
			                childInstance = this;
			                return <Grandchild />;
			            \}
			        \}
			
			        class Grandchild extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string,
			                depth: PropTypes.number
			            \};
			
			            render() \{
			                grandchildInstance = this;
			                return <div />;
			            \}
			        \}
			
			        ReactTestUtils.renderIntoDocument(<Parent />);
			        expect(childInstance.context).toEqual(\{ foo: "bar", depth: 0 \});
			        expect(grandchildInstance.context).toEqual(\{ foo: "bar", depth: 1 \});
			    \});
			
			    it("should pass context when re-rendered", () => \{
			        // "暂不测试unstable API"
			
			        let parentInstance = null;
			        let childInstance = null;
			
			        class Parent extends React.Component \{
			            static childContextTypes = \{
			                foo: PropTypes.string,
			                depth: PropTypes.number
			            \};
			
			            state = \{
			                flag: false
			            \};
			
			            getChildContext() \{
			                return \{
			                    foo: "bar",
			                    depth: 0
			                \};
			            \}
			
			            render() \{
			                let output = <Child />;
			                if (!this.state.flag) \{
			                    output = <span>Child</span>;
			                \}
			                return output;
			            \}
			        \}
			
			        class Child extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string,
			                depth: PropTypes.number
			            \};
			
			            render() \{
			                childInstance = this;
			                return <span>Child</span>;
			            \}
			        \}
			
			        parentInstance = ReactTestUtils.renderIntoDocument(<Parent />);
			        expect(childInstance).toBeNull();
			
			        expect(parentInstance.state.flag).toBe(false);
			        ReactDOM.unstable_batchedUpdates(function() \{
			            parentInstance.setState(\{ flag: true \});
			        \});
			        expect(parentInstance.state.flag).toBe(true);
			
			        expect(childInstance.context).toEqual(\{ foo: "bar", depth: 0 \});
			    \});
			
			    it("unmasked context propagates through updates", () => \{
			        class Leaf extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string.isRequired
			            \};
			
			            UNSAFE_componentWillReceiveProps(nextProps, nextContext) \{
			                expect("foo" in nextContext).toBe(true);
			            \}
			
			            shouldComponentUpdate(nextProps, nextState, nextContext) \{
			                expect("foo" in nextContext).toBe(true);
			                return true;
			            \}
			
			            render() \{
			                return <span>\{this.context.foo\}</span>;
			            \}
			        \}
			
			        class Intermediary extends React.Component \{
			            UNSAFE_componentWillReceiveProps(nextProps, nextContext) \{
			                expect("foo" in nextContext).toBe(false);
			            \}
			
			            shouldComponentUpdate(nextProps, nextState, nextContext) \{
			                expect("foo" in nextContext).toBe(false);
			                return true;
			            \}
			
			            render() \{
			                return <Leaf />;
			            \}
			        \}
			
			        class Parent extends React.Component \{
			            static childContextTypes = \{
			                foo: PropTypes.string
			            \};
			
			            getChildContext() \{
			                return \{
			                    foo: this.props.cntxt
			                \};
			            \}
			
			            render() \{
			                return <Intermediary />;
			            \}
			        \}
			
			        const div = document.createElement("div");
			        ReactDOM.render(<Parent cntxt="noise" />, div);
			        expect(div.children[0].innerHTML).toBe("noise");
			        console.log("不支持修改DOM");
			        // div.children[0].innerHTML = 'aliens';
			        div.children[0].id = "aliens";
			        expect(div.children[0].innerHTML).toBe("noise");
			        expect(div.children[0].id).toBe("aliens");
			        ReactDOM.render(<Parent cntxt="bar" />, div);
			        expect(div.children[0].innerHTML).toBe("bar");
			        expect(div.children[0].id).toBe("aliens");
			    \});
			
			    it("should trigger componentWillReceiveProps for context changes", () => \{
			        let contextChanges = 0;
			        let propChanges = 0;
			
			        class GrandChild extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string.isRequired
			            \};
			
			            UNSAFE_componentWillReceiveProps(nextProps, nextContext) \{
			                expect("foo" in nextContext).toBe(true);
			
			                if (nextProps !== this.props) \{
			                    propChanges++;
			                \}
			
			                if (nextContext !== this.context) \{
			                    contextChanges++;
			                \}
			            \}
			
			            render() \{
			                return (
			                    <span className="grand-child">\{this.props.children\}</span>
			                );
			            \}
			        \}
			
			        class ChildWithContext extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string.isRequired
			            \};
			
			            UNSAFE_componentWillReceiveProps(nextProps, nextContext) \{
			                expect("foo" in nextContext).toBe(true);
			
			                if (nextProps !== this.props) \{
			                    propChanges++;
			                \}
			
			                if (nextContext !== this.context) \{
			                    contextChanges++;
			                \}
			            \}
			
			            render() \{
			                return <div className="child-with">\{this.props.children\}</div>;
			            \}
			        \}
			
			        class ChildWithoutContext extends React.Component \{
			            UNSAFE_componentWillReceiveProps(nextProps, nextContext) \{
			                expect("foo" in nextContext).toBe(false);
			
			                if (nextProps !== this.props) \{
			                    propChanges++;
			                \}
			
			                if (nextContext !== this.context) \{
			                    contextChanges++;
			                \}
			            \}
			
			            render() \{
			                return (
			                    <div className="child-without">\{this.props.children\}</div>
			                );
			            \}
			        \}
			
			        class Parent extends React.Component \{
			            static childContextTypes = \{
			                foo: PropTypes.string
			            \};
			
			            state = \{
			                foo: "abc"
			            \};
			
			            getChildContext() \{
			                return \{
			                    foo: this.state.foo
			                \};
			            \}
			
			            render() \{
			                return <div className="parent">\{this.props.children\}</div>;
			            \}
			        \}
			
			        const div = document.createElement("div");
			
			        let parentInstance = null;
			        ReactDOM.render(
			            <Parent ref=\{inst => (parentInstance = inst)\}>
			                <ChildWithoutContext>
			                    A1
			                    <GrandChild>A2</GrandChild>
			                </ChildWithoutContext>
			
			                <ChildWithContext>
			                    B1
			                    <GrandChild>B2</GrandChild>
			                </ChildWithContext>
			            </Parent>,
			            div
			        );
			
			        parentInstance.setState(\{
			            foo: "def"
			        \});
			
			        expect(propChanges).toBe(0);
			        expect(contextChanges).toBe(3); // ChildWithContext, GrandChild x 2
			    \});
			
			    it("should disallow nested render calls", () => \{
			        class Inner extends React.Component \{
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        class Outer extends React.Component \{
			            render() \{
			                ReactTestUtils.renderIntoDocument(<Inner />);
			                return <div />;
			            \}
			        \}
			
			        expect(() => ReactTestUtils.renderIntoDocument(<Outer />)).toWarnDev(
			            "Render methods should be a pure function of props and state; " +
			                "triggering nested component updates from render is not allowed. If " +
			                "necessary, trigger nested updates in componentDidUpdate.\\n\\nCheck the " +
			                "render method of Outer."
			        );
			    \});
			
			    it("only renders once if updated in componentWillReceiveProps", () => \{
			        let renders = 0;
			
			        class Component extends React.Component \{
			            state = \{ updated: false \};
			
			            UNSAFE_componentWillReceiveProps(props) \{
			                expect(props.update).toBe(1);
			                expect(renders).toBe(1);
			                this.setState(\{ updated: true \});
			                expect(renders).toBe(1);
			            \}
			
			            render() \{
			                renders++;
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        const instance = ReactDOM.render(<Component update=\{0\} />, container);
			        expect(renders).toBe(1);
			        expect(instance.state.updated).toBe(false);
			        ReactDOM.render(<Component update=\{1\} />, container);
			        expect(renders).toBe(2);
			        expect(instance.state.updated).toBe(true);
			    \});
			
			    it("only renders once if updated in componentWillReceiveProps when batching", () => \{
			        // "暂不测试unstable API"
			        return;
			        let renders = 0;
			
			        class Component extends React.Component \{
			            state = \{ updated: false \};
			
			            UNSAFE_componentWillReceiveProps(props) \{
			                expect(props.update).toBe(1);
			                expect(renders).toBe(1);
			                this.setState(\{ updated: true \});
			                expect(renders).toBe(1);
			            \}
			
			            render() \{
			                renders++;
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        const instance = ReactDOM.render(<Component update=\{0\} />, container);
			        expect(renders).toBe(1);
			        expect(instance.state.updated).toBe(false);
			        ReactDOM.unstable_batchedUpdates(() => \{
			            ReactDOM.render(<Component update=\{1\} />, container);
			        \});
			        expect(renders).toBe(2);
			        expect(instance.state.updated).toBe(true);
			    \});
			
			    it("should update refs if shouldComponentUpdate gives false", () => \{
			        class Static extends React.Component \{
			            shouldComponentUpdate() \{
			                return false;
			            \}
			
			            render() \{
			                return <div>\{this.props.children\}</div>;
			            \}
			        \}
			
			        class Component extends React.Component \{
			            render() \{
			                if (this.props.flipped) \{
			                    return (
			                        <div>
			                            <Static ref="static0" key="B">
			                                B (ignored)
			                            </Static>
			                            <Static ref="static1" key="A">
			                                A (ignored)
			                            </Static>
			                        </div>
			                    );
			                \} else \{
			                    return (
			                        <div>
			                            <Static ref="static0" key="A">
			                                A
			                            </Static>
			                            <Static ref="static1" key="B">
			                                B
			                            </Static>
			                        </div>
			                    );
			                \}
			            \}
			        \}
			
			        const container = document.createElement("div");
			        const comp = ReactDOM.render(<Component flipped=\{false\} />, container);
			        expect(ReactDOM.findDOMNode(comp.refs.static0).textContent).toBe("A");
			        expect(ReactDOM.findDOMNode(comp.refs.static1).textContent).toBe("B");
			
			        // When flipping the order, the refs should update even though the actual
			        // contents do not
			        ReactDOM.render(<Component flipped=\{true\} />, container);
			        expect(ReactDOM.findDOMNode(comp.refs.static0).textContent).toBe("B");
			        expect(ReactDOM.findDOMNode(comp.refs.static1).textContent).toBe("A");
			    \});
			
			    it("should allow access to findDOMNode in componentWillUnmount", () => \{
			        let a = null;
			        let b = null;
			
			        class Component extends React.Component \{
			            componentDidMount() \{
			                a = ReactDOM.findDOMNode(this);
			                expect(a).not.toBe(null);
			            \}
			
			            componentWillUnmount() \{
			                b = ReactDOM.findDOMNode(this);
			                expect(b).not.toBe(null);
			            \}
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        expect(a).toBe(container.firstChild);
			        ReactDOM.render(<Component />, container);
			        ReactDOM.unmountComponentAtNode(container);
			        expect(a).toBe(b);
			    \});
			
			    it("context should be passed down from the parent", () => \{
			        class Parent extends React.Component \{
			            static childContextTypes = \{
			                foo: PropTypes.string
			            \};
			
			            getChildContext() \{
			                return \{
			                    foo: "bar"
			                \};
			            \}
			
			            render() \{
			                return <div>\{this.props.children\}</div>;
			            \}
			        \}
			
			        class Component extends React.Component \{
			            static contextTypes = \{
			                foo: PropTypes.string.isRequired
			            \};
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const div = document.createElement("div");
			        ReactDOM.render(
			            <Parent>
			                <Component />
			            </Parent>,
			            div
			        );
			    \});
			
			    it("should replace state", () => \{
			        // 不测试replaceState"
			        return;
			        class Moo extends React.Component \{
			            state = \{ x: 1 \};
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const moo = ReactTestUtils.renderIntoDocument(<Moo />);
			        // No longer a public API, but we can test that it works internally by
			        // reaching into the updater.
			        moo.updater.enqueueReplaceState(moo, \{ y: 2 \});
			        expect("x" in moo.state).toBe(false);
			        expect(moo.state.y).toBe(2);
			    \});
			
			    it("should support objects with prototypes as state", () => \{
			        // "暂不测试unstable API"
			        return;
			        const NotActuallyImmutable = function(str) \{
			            this.str = str;
			        \};
			        NotActuallyImmutable.prototype.amIImmutable = function() \{
			            return true;
			        \};
			        class Moo extends React.Component \{
			            state = new NotActuallyImmutable("first");
			            // No longer a public API, but we can test that it works internally by
			            // reaching into the updater.
			            _replaceState = update =>
			                this.updater.enqueueReplaceState(this, update);
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const moo = ReactTestUtils.renderIntoDocument(<Moo />);
			        expect(moo.state.str).toBe("first");
			        expect(moo.state.amIImmutable()).toBe(true);
			
			        const secondState = new NotActuallyImmutable("second");
			        moo._replaceState(secondState);
			        expect(moo.state.str).toBe("second");
			        expect(moo.state.amIImmutable()).toBe(true);
			        expect(moo.state).toBe(secondState);
			
			        moo.setState(\{ str: "third" \});
			        expect(moo.state.str).toBe("third");
			        // Here we lose the prototype.
			        expect(moo.state.amIImmutable).toBe(undefined);
			
			        // When more than one state update is enqueued, we have the same behavior
			        const fifthState = new NotActuallyImmutable("fifth");
			        ReactDOM.unstable_batchedUpdates(function() \{
			            moo.setState(\{ str: "fourth" \});
			            moo._replaceState(fifthState);
			        \});
			        expect(moo.state).toBe(fifthState);
			
			        // When more than one state update is enqueued, we have the same behavior
			        const sixthState = new NotActuallyImmutable("sixth");
			        ReactDOM.unstable_batchedUpdates(function() \{
			            moo._replaceState(sixthState);
			            moo.setState(\{ str: "seventh" \});
			        \});
			        expect(moo.state.str).toBe("seventh");
			        expect(moo.state.amIImmutable).toBe(undefined);
			    \});
			
			    it("should not warn about unmounting during unmounting", () => \{
			        const container = document.createElement("div");
			        const layer = document.createElement("div");
			
			        class Component extends React.Component \{
			            componentDidMount() \{
			                ReactDOM.render(<div />, layer);
			            \}
			
			            componentWillUnmount() \{
			                ReactDOM.unmountComponentAtNode(layer);
			            \}
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        class Outer extends React.Component \{
			            render() \{
			                return <div>\{this.props.children\}</div>;
			            \}
			        \}
			
			        ReactDOM.render(
			            <Outer>
			                <Component />
			            </Outer>,
			            container
			        );
			        ReactDOM.render(<Outer />, container);
			    \});
			
			    it("should warn when mutated props are passed", () => \{
			        const container = document.createElement("div");
			
			        class Foo extends React.Component \{
			            constructor(props) \{
			                const _props = \{ idx: props.idx + "!" \};
			                super(_props);
			            \}
			
			            render() \{
			                return <span />;
			            \}
			        \}
			
			        expect(() => ReactDOM.render(<Foo idx="qwe" />, container)).toWarnDev(
			            "Foo(...): When calling super() in \`Foo\`, make sure to pass " +
			                "up the same props that your component's constructor was passed."
			        );
			    \});
			
			    it("should only call componentWillUnmount once", () => \{
			        let app;
			        let count = 0;
			
			        class App extends React.Component \{
			            render() \{
			                if (this.props.stage === 1) \{
			                    return <UnunmountableComponent />;
			                \} else \{
			                    return null;
			                \}
			            \}
			        \}
			
			        class UnunmountableComponent extends React.Component \{
			            componentWillUnmount() \{
			                app.setState(\{\});
			                count++;
			                throw Error("always fails");
			            \}
			
			            render() \{
			                return <div>Hello \{this.props.name\}</div>;
			            \}
			        \}
			
			        const container = document.createElement("div");
			
			        const setRef = ref => \{
			            if (ref) \{
			                app = ref;
			            \}
			        \};
			
			        expect(() => \{
			            ReactDOM.render(<App ref=\{setRef\} stage=\{1\} />, container);
			            ReactDOM.render(<App ref=\{setRef\} stage=\{2\} />, container);
			        \}).toThrow();
			        expect(count).toBe(1);
			    \});
			
			    it("prepares new child before unmounting old", () => \{
			        const log = [];
			
			        class Spy extends React.Component \{
			            UNSAFE_componentWillMount() \{
			                log.push(this.props.name + " componentWillMount");
			            \}
			            render() \{
			                log.push(this.props.name + " render");
			                return <div />;
			            \}
			            componentDidMount() \{
			                log.push(this.props.name + " componentDidMount");
			            \}
			            componentWillUnmount() \{
			                log.push(this.props.name + " componentWillUnmount");
			            \}
			        \}
			
			        class Wrapper extends React.Component \{
			            render() \{
			                return <Spy key=\{this.props.name\} name=\{this.props.name\} />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        ReactDOM.render(<Wrapper name="A" />, container);
			        ReactDOM.render(<Wrapper name="B" />, container);
			
			        expect(log).toEqual([
			            "A componentWillMount",
			            "A render",
			            "A componentDidMount",
			
			            "B componentWillMount",
			            "B render",
			            "A componentWillUnmount",
			            "B componentDidMount"
			        ]);
			    \});
			
			    it("respects a shallow shouldComponentUpdate implementation", () => \{
			        let renderCalls = 0;
			        class PlasticWrap extends React.Component \{
			            constructor(props, context) \{
			                super(props, context);
			                this.state = \{
			                    color: "green"
			                \};
			            \}
			
			            render() \{
			                return <Apple color=\{this.state.color\} ref="apple" />;
			            \}
			        \}
			
			        class Apple extends React.Component \{
			            state = \{
			                cut: false,
			                slices: 1
			            \};
			
			            shouldComponentUpdate(nextProps, nextState) \{
			                return shallowCompare(this, nextProps, nextState);
			            \}
			
			            cut() \{
			                this.setState(\{
			                    cut: true,
			                    slices: 10
			                \});
			            \}
			
			            eatSlice() \{
			                this.setState(\{
			                    slices: this.state.slices - 1
			                \});
			            \}
			
			            render() \{
			                renderCalls++;
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        const instance = ReactDOM.render(<PlasticWrap />, container);
			        expect(renderCalls).toBe(1);
			
			        // Do not re-render based on props
			        instance.setState(\{ color: "green" \});
			        expect(renderCalls).toBe(1);
			
			        // Re-render based on props
			        instance.setState(\{ color: "red" \});
			        expect(renderCalls).toBe(2);
			
			        // Re-render base on state
			        instance.refs.apple.cut();
			        expect(renderCalls).toBe(3);
			
			        // No re-render based on state
			        instance.refs.apple.cut();
			        expect(renderCalls).toBe(3);
			
			        // Re-render based on state again
			        instance.refs.apple.eatSlice();
			        expect(renderCalls).toBe(4);
			    \});
			
			    it("does not do a deep comparison for a shallow shouldComponentUpdate implementation", () => \{
			        function getInitialState() \{
			            return \{
			                foo: [1, 2, 3],
			                bar: \{ a: 4, b: 5, c: 6 \}
			            \};
			        \}
			
			        let renderCalls = 0;
			        const initialSettings = getInitialState();
			
			        class Component extends React.Component \{
			            state = initialSettings;
			
			            shouldComponentUpdate(nextProps, nextState) \{
			                return shallowCompare(this, nextProps, nextState);
			            \}
			
			            render() \{
			                renderCalls++;
			                return <div />;
			            \}
			        \}
			
			        const container = document.createElement("div");
			        const instance = ReactDOM.render(<Component />, container);
			        expect(renderCalls).toBe(1);
			
			        // Do not re-render if state is equal
			        const settings = \{
			            foo: initialSettings.foo,
			            bar: initialSettings.bar
			        \};
			        instance.setState(settings);
			        expect(renderCalls).toBe(1);
			
			        // Re-render because one field changed
			        initialSettings.foo = [1, 2, 3];
			        instance.setState(initialSettings);
			        expect(renderCalls).toBe(2);
			
			        // Re-render because the object changed
			        instance.setState(getInitialState());
			        expect(renderCalls).toBe(3);
			    \});
			
			    it("should call setState callback with no arguments", () => \{
			        let mockArgs;
			        class Component extends React.Component \{
			            componentDidMount() \{
			                this.setState(\{\}, (...args) => (mockArgs = args));
			            \}
			            render() \{
			                return false;
			            \}
			        \}
			
			        ReactTestUtils.renderIntoDocument(<Component />);
			        expect(mockArgs.length).toEqual(0);
			    \});
			
			    it("this.state should be updated on setState callback inside componentWillMount", () => \{
			        const div = document.createElement("div");
			        let stateSuccessfullyUpdated = false;
			
			        class Component extends React.Component \{
			            constructor(props, context) \{
			                super(props, context);
			                this.state = \{
			                    hasUpdatedState: false
			                \};
			            \}
			
			            UNSAFE_componentWillMount() \{
			                this.setState(
			                    \{ hasUpdatedState: true \},
			                    () =>
			                        (stateSuccessfullyUpdated = this.state.hasUpdatedState)
			                );
			            \}
			
			            render() \{
			                return <div>\{this.props.children\}</div>;
			            \}
			        \}
			
			        ReactDOM.render(<Component />, div);
			        expect(stateSuccessfullyUpdated).toBe(true);
			    \});
			
			    it("should call the setState callback even if shouldComponentUpdate = false", done => \{
			        const mockFn = jest.fn().mockReturnValue(false);
			        const div = document.createElement("div");
			
			        let instance;
			
			        class Component extends React.Component \{
			            constructor(props, context) \{
			                super(props, context);
			                this.state = \{
			                    hasUpdatedState: false
			                \};
			            \}
			
			            UNSAFE_componentWillMount() \{
			                instance = this;
			            \}
			
			            shouldComponentUpdate() \{
			                return mockFn();
			            \}
			
			            render() \{
			                return <div>\{this.state.hasUpdatedState\}</div>;
			            \}
			        \}
			
			        ReactDOM.render(<Component />, div);
			
			        expect(instance).toBeDefined();
			        expect(mockFn).not.toBeCalled();
			
			        instance.setState(\{ hasUpdatedState: true \}, () => \{
			            expect(mockFn).toBeCalled();
			            expect(instance.state.hasUpdatedState).toBe(true);
			            done();
			        \});
			    \});
			
			    it("should return a meaningful warning when constructor is returned", () => \{
			        class RenderTextInvalidConstructor extends React.Component \{
			            constructor(props) \{
			                super(props);
			                return \{ something: false \};
			            \}
			
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        expect(() => \{
			            expect(() => \{
			                ReactTestUtils.renderIntoDocument(
			                    <RenderTextInvalidConstructor />
			                );
			            \}).toWarnDev(
			                "Warning: RenderTextInvalidConstructor(...): No \`render\` method found on the returned component instance: " +
			                    "did you accidentally return an object from the constructor?"
			            );
			        \}).toThrow();
			    \});
			
			    it("should return error if render is not defined", () => \{
			        class RenderTestUndefinedRender extends React.Component \{\}
			
			        expect(() => \{
			            expect(() => \{
			                ReactTestUtils.renderIntoDocument(
			                    <RenderTestUndefinedRender />
			                );
			            \}).toWarnDev(
			                "Warning: RenderTestUndefinedRender(...): No \`render\` method found on the returned " +
			                    "component instance: you may have forgotten to define \`render\`."
			            );
			        \}).toThrow();
			    \});
			
			    it("上面的context没变，componentWillReceiveProps不会触发", () => \{
			        class ListViewDemo extends React.Component \{
			            static childContextTypes = \{
			                testItems: PropTypes.array
			            \};
			            constructor(props) \{
			                super(props);
			                this.state = \{
			                    testItems: [1, 2, 3]
			                \};
			            \}
			            getChildContext() \{
			                return \{ testItems: this.state.testItems \};
			            \}
			            render() \{
			                return (
			                    <div>
			                        <Hello ref="hello" />
			                    </div>
			                );
			            \}
			        \}
			        var list = [];
			        class Hello extends React.Component \{
			            static contextTypes = \{
			                testItems: PropTypes.array
			            \};
			            constructor(props) \{
			                super(props);
			                this.state = \{
			                    hello: "world"
			                \};
			            \}
			            componentWillReceiveProps(nextProps) \{
			                list.push("componentWillReceiveProps");
			            \}
			            componentDidUpdate() \{
			                list.push("componentDidUpdate");
			            \}
			            changeHello() \{
			                this.setState(\{
			                    hello: "woooo"
			                \});
			            \}
			            render() \{
			                return (
			                    <div ref="div" onClick=\{this.changeHello.bind(this)\}>
			                        \{this.state.hello\}
			                    </div>
			                );
			            \}
			        \}
			        var div = document.createElement("div");
			        var instance = ReactDOM.render(<ListViewDemo />, div);
			        instance.refs.hello.changeHello();
			        expect(list).toEqual(["componentDidUpdate"]);
			    \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactCompositeComponent-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(50)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactCompositeComponentNestedState-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			describe('ReactCompositeComponentNestedState-state', () => \{
			  beforeEach(() => \{
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			  \});
			
			  it('should provide up to date values for props', () => \{
			    class ParentComponent extends React.Component \{
			      state = \{color: 'blue'\};
			
			      handleColor = color => \{
			        this.props.logger('parent-handleColor', this.state.color);
			        this.setState(\{color: color\}, function() \{
			          this.props.logger('parent-after-setState', this.state.color);
			        \});
			      \};
			
			      render() \{
			        this.props.logger('parent-render', this.state.color);
			        return (
			          <ChildComponent
			            logger=\{this.props.logger\}
			            color=\{this.state.color\}
			            onSelectColor=\{this.handleColor\}
			          />
			        );
			      \}
			    \}
			
			    class ChildComponent extends React.Component \{
			      constructor(props) \{
			        super(props);
			        props.logger('getInitialState', props.color);
			        this.state = \{hue: 'dark ' + props.color\};
			      \}
			
			      handleHue = (shade, color) => \{
			        this.props.logger('handleHue', this.state.hue, this.props.color);
			        this.props.onSelectColor(color);
			        this.setState(
			          function(state, props) \{
			            this.props.logger(
			              'setState-this',
			              this.state.hue,
			              this.props.color,
			            );
			            this.props.logger('setState-args', state.hue, props.color);
			            return \{hue: shade + ' ' + props.color\};
			          \},
			          function() \{
			            this.props.logger(
			              'after-setState',
			              this.state.hue,
			              this.props.color,
			            );
			          \},
			        );
			      \};
			
			      render() \{
			        this.props.logger('render', this.state.hue, this.props.color);
			        return (
			          <div>
			            <button onClick=\{this.handleHue.bind(this, 'dark', 'blue')\}>
			              Dark Blue
			            </button>
			            <button onClick=\{this.handleHue.bind(this, 'light', 'blue')\}>
			              Light Blue
			            </button>
			            <button onClick=\{this.handleHue.bind(this, 'dark', 'green')\}>
			              Dark Green
			            </button>
			            <button onClick=\{this.handleHue.bind(this, 'light', 'green')\}>
			              Light Green
			            </button>
			          </div>
			        );
			      \}
			    \}
			
			    const container = document.createElement('div');
			    document.body.appendChild(container);
			
			    const logger = jest.fn();
			
			    void ReactDOM.render(<ParentComponent logger=\{logger\} />, container);
			
			    // click "light green"
			    ReactTestUtils.Simulate.click(container.childNodes[0].childNodes[3]);
			
			    expect(logger.mock.calls).toEqual([
			      ['parent-render', 'blue'],
			      ['getInitialState', 'blue'],
			      ['render', 'dark blue', 'blue'],
			      ['handleHue', 'dark blue', 'blue'],
			      ['parent-handleColor', 'blue'],
			      ['parent-render', 'green'],
			      ['setState-this', 'dark blue', 'blue'],
			      ['setState-args', 'dark blue', 'green'],
			      ['render', 'light green', 'green'],
			      ['after-setState', 'light green', 'green'],
			      ['parent-after-setState', 'green'],
			    ]);
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactCompositeComponentNestedState-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactCompositeComponentState-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let React;
			let ReactDOM;
			
			let TestComponent;
			
			describe('ReactCompositeComponent-state', () => \{
			    beforeEach(() => \{
			        React = require('react');
			        ReactDOM = require('react-dom');
			
			        TestComponent = class extends React.Component \{
			            constructor(props) \{
			                super(props);
			                this.peekAtState('getInitialState', undefined, props);
			                this.state = \{ color: 'red' \};
			            \}
			
						peekAtState = (from, state = this.state, props = this.props) => \{
						    props.stateListener(from, state && state.color);
						\};
			
						peekAtCallback = from => \{
						    return () => this.peekAtState(from);
						\};
			
						setFavoriteColor(nextColor) \{
						    this.setState(\{ color: nextColor \}, this.peekAtCallback('setFavoriteColor'));
						\}
			
						render() \{
						    this.peekAtState('render');
						    return <div> \{this.state.color\} </div>;
						\}
			
						UNSAFE_componentWillMount() \{
						    this.peekAtState('componentWillMount-start');
						    this.setState(function(state) \{
						        this.peekAtState('before-setState-sunrise', state);
						    \});
						    this.setState(\{ color: 'sunrise' \}, this.peekAtCallback('setState-sunrise'));
						    this.setState(function(state) \{
						        this.peekAtState('after-setState-sunrise', state);
						    \});
						    this.peekAtState('componentWillMount-after-sunrise');
						    this.setState(\{ color: 'orange' \}, this.peekAtCallback('setState-orange'));
						    this.setState(function(state) \{
						        this.peekAtState('after-setState-orange', state);
						    \});
						    this.peekAtState('componentWillMount-end');
						\}
			
						componentDidMount() \{
						    this.peekAtState('componentDidMount-start');
						    this.setState(\{ color: 'yellow' \}, this.peekAtCallback('setState-yellow'));
						    this.peekAtState('componentDidMount-end');
						\}
			
						UNSAFE_componentWillReceiveProps(newProps) \{
						    this.peekAtState('componentWillReceiveProps-start');
						    if (newProps.nextColor) \{
						        this.setState(function(state) \{
						            this.peekAtState('before-setState-receiveProps', state);
						            return \{ color: newProps.nextColor \};
						        \});
						        // No longer a public API, but we can test that it works internally by
						        // reaching into the updater.
						        //  this.updater.enqueueReplaceState(this, \{color: undefined\});
						        this.setState(function(state) \{
						            this.peekAtState('before-setState-again-receiveProps', state);
						            return \{ color: newProps.nextColor \};
						        \}, this.peekAtCallback('setState-receiveProps'));
						        this.setState(function(state) \{
						            this.peekAtState('after-setState-receiveProps', state);
						        \});
						    \}
						    this.peekAtState('componentWillReceiveProps-end');
						\}
			
						shouldComponentUpdate(nextProps, nextState) \{
						    this.peekAtState('shouldComponentUpdate-currentState');
						    this.peekAtState('shouldComponentUpdate-nextState', nextState);
						    return true;
						\}
			
						UNSAFE_componentWillUpdate(nextProps, nextState) \{
						    this.peekAtState('componentWillUpdate-currentState');
						    this.peekAtState('componentWillUpdate-nextState', nextState);
						\}
			
						componentDidUpdate(prevProps, prevState) \{
						    this.peekAtState('componentDidUpdate-currentState');
						    this.peekAtState('componentDidUpdate-prevState', prevState);
						\}
			
						componentWillUnmount() \{
						    this.peekAtState('componentWillUnmount');
						\}
			        \};
			    \});
			
			    it('should support setting state', () => \{
			        const container = document.createElement('div');
			        document.body.appendChild(container);
			
			        const stateListener = jest.fn();
			        const instance = ReactDOM.render(
			            <TestComponent stateListener=\{stateListener\} />,
			            container,
			            function peekAtInitialCallback() \{
			                this.peekAtState('initial-callback');
			            \}
			        );
			        ReactDOM.render(
			            <TestComponent stateListener=\{stateListener\} nextColor="green" />,
			            container,
			            instance.peekAtCallback('setProps')
			        );
			        instance.setFavoriteColor('blue');
			        instance.forceUpdate(instance.peekAtCallback('forceUpdate'));
			
			        ReactDOM.unmountComponentAtNode(container);
			
			        let expected = [
			            // there is no state when getInitialState() is called
			            ['getInitialState', null],
			            ['componentWillMount-start', 'red'],
			            // setState()'s only enqueue pending states.
			            ['componentWillMount-after-sunrise', 'red'],
			            ['componentWillMount-end', 'red'],
			            // pending state queue is processed
			            ['before-setState-sunrise', 'red'],
			            ['after-setState-sunrise', 'sunrise'],
			            ['after-setState-orange', 'orange'],
			            // pending state has been applied
			            ['render', 'orange'],
			            ['componentDidMount-start', 'orange'],
			            // setState-sunrise and setState-orange should be called here,
			            // after the bug in #1740
			            // componentDidMount() called setState(\{color:'yellow'\}), which is async.
			            // The update doesn't happen until the next flush.
			            ['componentDidMount-end', 'orange'],
			            ['setState-sunrise', 'orange'],
			            ['setState-orange', 'orange'],
			            ['initial-callback', 'orange'],
			            ['shouldComponentUpdate-currentState', 'orange'],
			            ['shouldComponentUpdate-nextState', 'yellow'],
			            ['componentWillUpdate-currentState', 'orange'],
			            ['componentWillUpdate-nextState', 'yellow'],
			            ['render', 'yellow'],
			            ['componentDidUpdate-currentState', 'yellow'],
			            ['componentDidUpdate-prevState', 'orange'],
			            //** ['componentDidUpdate-prevState', 'yellow'],
			            ['setState-yellow', 'yellow'],
			            ['componentWillReceiveProps-start', 'yellow'],
			            // setState(\{color:'green'\}) only enqueues a pending state.
			            ['componentWillReceiveProps-end', 'yellow'],
			            // pending state queue is processed
			            // We keep updates in the queue to support
			            // replaceState(prevState => newState).
			            ['before-setState-receiveProps', 'yellow'],
			            ['before-setState-again-receiveProps', 'green'],
			            ['after-setState-receiveProps', 'green'],
			            ['shouldComponentUpdate-currentState', 'yellow'],
			            ['shouldComponentUpdate-nextState', 'green'],
			            ['componentWillUpdate-currentState', 'yellow'],
			            ['componentWillUpdate-nextState', 'green'],
			            ['render', 'green'],
			            ['componentDidUpdate-currentState', 'green'],
			            ['componentDidUpdate-prevState', 'yellow'],
			            ['setState-receiveProps', 'green'],
			            ['setProps', 'green'],
			            // setFavoriteColor('blue')
			            ['shouldComponentUpdate-currentState', 'green'],
			            ['shouldComponentUpdate-nextState', 'blue'],
			            ['componentWillUpdate-currentState', 'green'],
			            ['componentWillUpdate-nextState', 'blue'],
			            ['render', 'blue'],
			            ['componentDidUpdate-currentState', 'blue'],
			            //** ['componentDidUpdate-prevState', 'yellow'],
			            ['componentDidUpdate-prevState', 'green'],
			            ['setFavoriteColor', 'blue'],
			            // forceUpdate()
			            ['componentWillUpdate-currentState', 'blue'],
			            ['componentWillUpdate-nextState', 'blue'],
			            ['render', 'blue'],
			            ['componentDidUpdate-currentState', 'blue'],
			            ['componentDidUpdate-prevState', 'blue'],
			            //**  ['componentDidUpdate-prevState', 'yellow'],
			            ['forceUpdate', 'blue'],
			            // unmountComponent()
			            // state is available within \`componentWillUnmount()\`
			            ['componentWillUnmount', 'blue']
			        ];
			
			        expect(stateListener.mock.calls.join('\\n')).toEqual(expected.join('\\n'));
			    \});
			
			    it('should call componentDidUpdate of children first', () => \{
			        // "暂不测试unstable API"
			
			        const container = document.createElement('div');
			
			        let ops = [];
			
			        let child = null;
			        let parent = null;
			
			        class Child extends React.Component \{
						state = \{ bar: false \};
						componentDidMount() \{
						    child = this;
						\}
						componentDidUpdate() \{
						    ops.push('child did update');
						\}
						render() \{
						    return <div />;
						\}
			        \}
			
			        let shouldUpdate = true;
			
			        class Intermediate extends React.Component \{
			            shouldComponentUpdate() \{
			                return shouldUpdate;
			            \}
			            render() \{
			                return <Child />;
			            \}
			        \}
			
			        class Parent extends React.Component \{
						state = \{ foo: false \};
						componentDidMount() \{
						    parent = this;
						\}
						componentDidUpdate() \{
						    ops.push('parent did update');
						\}
						render() \{
						    return <Intermediate />;
						\}
			        \}
			
			        ReactDOM.render(<Parent />, container);
			
			        ReactDOM.unstable_batchedUpdates(() => \{
			            parent.setState(\{ foo: true \});
			            child.setState(\{ bar: true \});
			        \});
			        // When we render changes top-down in a batch, children's componentDidUpdate
			        // happens before the parent.
			        expect(ops).toEqual(['child did update', 'parent did update']);
			
			        shouldUpdate = false;
			
			        ops = [];
			
			        ReactDOM.unstable_batchedUpdates(() => \{
			            parent.setState(\{ foo: false \});
			            child.setState(\{ bar: false \});
			        \});
			        // We expect the same thing to happen if we bail out in the middle.
			        expect(ops).toEqual(['child did update', 'parent did update']);
			    \});
			
			    it('should batch unmounts', () => \{
			        let outer;
			
			        class Inner extends React.Component \{
			            render() \{
			                return <div />;
			            \}
			
			            componentWillUnmount() \{
			                // This should get silently ignored (maybe with a warning), but it
			                // shouldn't break React.
			                outer.setState(\{ showInner: false \});
			            \}
			        \}
			
			        class Outer extends React.Component \{
						state = \{ showInner: true \};
			
						render() \{
						    return <div> \{this.state.showInner && <Inner />\} </div>;
						\}
			        \}
			
			        const container = document.createElement('div');
			        outer = ReactDOM.render(<Outer />, container);
			        expect(() => \{
			            ReactDOM.unmountComponentAtNode(container);
			        \}).not.toThrow();
			    \});
			
			    it('should update state when called from child cWRP', function() \{
			        const log = [];
			        class Parent extends React.Component \{
						state = \{ value: 'one' \};
						render() \{
						    log.push('parent render ' + this.state.value);
						    return <Child parent=\{this\} value=\{this.state.value\} />;
						\}
			        \}
			        let updated = false;
			        class Child extends React.Component \{
			            UNSAFE_componentWillReceiveProps() \{
			                if (updated) \{
			                    return;
			                \}
			                log.push('child componentWillReceiveProps ' + this.props.value);
			                this.props.parent.setState(\{ value: 'two' \});
			                log.push('child componentWillReceiveProps done ' + this.props.value);
			                updated = true;
			            \}
			            render() \{
			                log.push('child render ' + this.props.value);
			                return <div> \{this.props.value\} </div>;
			            \}
			        \}
			        const container = document.createElement('div');
			        ReactDOM.render(<Parent />, container);
			        ReactDOM.render(<Parent />, container);
			        expect(log).toEqual([
			            'parent render one',
			            'child render one',
			            'parent render one',
			            'child componentWillReceiveProps one',
			            'child componentWillReceiveProps done one',
			            'child render one',
			            'parent render two',
			            'child render two'
			        ]);
			    \});
			
			    it('should merge state when sCU returns false', function() \{
			        const log = [];
			        class Test extends React.Component \{
						state = \{ a: 0 \};
						render() \{
						    return null;
						\}
						shouldComponentUpdate(nextProps, nextState) \{
						    log.push('scu from ' + Object.keys(this.state) + ' to ' + Object.keys(nextState));
						    return false;
						\}
			        \}
			
			        const container = document.createElement('div');
			        const test = ReactDOM.render(<Test />, container);
			        test.setState(\{ b: 0 \});
			        expect(log.length).toBe(1);
			        test.setState(\{ c: 0 \});
			        expect(log.length).toBe(2);
			        expect(log).toEqual(['scu from a to a,b', 'scu from a,b to a,b,c']);
			    \});
			
			    it('should treat assigning to this.state inside cWRP as a replaceState, with a warning', () => \{
			        let ops = [];
			        class Test extends React.Component \{
						state = \{ step: 1, extra: true \};
						UNSAFE_componentWillReceiveProps() \{
						    this.setState(\{ step: 2 \}, () => \{
						        // Tests that earlier setState callbacks are not dropped
						        ops.push(\`callback -- step: \$\{this.state.step\}, extra: \$\{!!this.state.extra\}\`);
						    \});
						    // Treat like replaceState
						    this.state = \{ step: 3 \};
						\}
						render() \{
						    ops.push(\`render -- step: \$\{this.state.step\}, extra: \$\{!!this.state.extra\}\`);
						    return null;
						\}
			        \}
			
			        // Mount
			        const container = document.createElement('div');
			        ReactDOM.render(<Test />, container);
			        // Update
			        expect(() => ReactDOM.render(<Test />, container)).toWarnDev(
			            'Warning: Test.componentWillReceiveProps(): Assigning directly to ' +
							'this.state is deprecated (except inside a component\\'s constructor). ' +
							'Use setState instead.'
			        );
			
			        expect(ops).toEqual([
			            'render -- step: 1, extra: true',
			            'render -- step: 2, extra: false',
			            'callback -- step: 2, extra: false'
			        ]);
			
			        // Check deduplication; (no additional warnings are expected)
			        ReactDOM.render(<Test />, container);
			    \});
			
			    it('should treat assigning to this.state inside cWM as a replaceState, with a warning', () => \{
			        let ops = [];
			        class Test extends React.Component \{
						state = \{ step: 1, extra: true \};
						UNSAFE_componentWillMount() \{
						    this.setState(\{ step: 2 \}, () => \{
						        // Tests that earlier setState callbacks are not dropped
						        ops.push(\`callback -- step: \$\{this.state.step\}, extra: \$\{!!this.state.extra\}\`);
						    \});
						    // Treat like replaceState
						    this.state = \{ step: 3 \};
						\}
						render() \{
						    ops.push(\`render -- step: \$\{this.state.step\}, extra: \$\{!!this.state.extra\}\`);
						    return null;
						\}
			        \}
			
			        // Mount
			        const container = document.createElement('div');
			        expect(() => ReactDOM.render(<Test />, container)).toWarnDev(
			            'Warning: Test.componentWillMount(): Assigning directly to ' +
							'this.state is deprecated (except inside a component\\'s constructor). ' +
							'Use setState instead.'
			        );
			
			        expect(ops).toEqual(['render -- step: 2, extra: false', 'callback -- step: 2, extra: false']);
			    \});
			
			    it('should support stateful module pattern components', () => \{\});
			
			    it('should support getDerivedStateFromProps for module pattern components', () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactCompositeComponentState-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMComponentTree-test.js', () => {
        const sourceCode = `
			describe("ReactDOMComponentTree", () => \{
			  let React;
			  let ReactDOM;
			  let container;
			
			  beforeEach(() => \{
			    jest.resetModules();
			    React = require("react");
			    ReactDOM = require("react-dom");
			    container = document.createElement("div");
			    document.body.appendChild(container);
			  \});
			
			  afterEach(() => \{
			    ReactDOM.unmountComponentAtNode(container);
			    //  document.body.removeChild(container);
			    container = null;
			  \});
			
			  it("finds nodes for instances on events", () => \{
			    const mouseOverID = "mouseOverID";
			    const clickID = "clickID";
			    let currentTargetID = null;
			    // the current target of an event is set to result of getNodeFromInstance
			    // when an event is dispatched so we can test behavior by invoking
			    // events on elements in the tree and confirming the expected node is
			    // set as the current target
			    class Component extends React.Component \{
			      handler = e => \{
			        currentTargetID = e.currentTarget.id;
			      \};
			      render() \{
			        return (
			          <div id=\{mouseOverID\} onMouseOver=\{this.handler\}>
			            <div id=\{clickID\} onClick=\{this.handler\} />
			          </div>
			        );
			      \}
			    \}
			
			    function simulateMouseEvent(elem, type) \{
			      const event = new MouseEvent(type, \{
			        bubbles: true
			      \});
			      elem.dispatchEvent(event);
			    \}
			
			    const component = <Component />;
			    ReactDOM.render(component, container);
			    expect(currentTargetID).toBe(null);
			    simulateMouseEvent(document.getElementById(mouseOverID), "mouseover");
			    expect(currentTargetID).toBe(mouseOverID);
			    simulateMouseEvent(document.getElementById(clickID), "click");
			    expect(currentTargetID).toBe(clickID);
			  \});
			
			  it("finds closest instance for node when an event happens", () => \{
			    const nonReactElemID = "aID";
			    const innerHTML = \{ __html: \`<div id="\$\{nonReactElemID\}"></div>\` \};
			    const closestInstanceID = "closestInstance";
			    let currentTargetID = null;
			
			    class ClosestInstance extends React.Component \{
			      _onClick = e => \{
			        currentTargetID = e.currentTarget.id;
			      \};
			      render() \{
			        return (
			          <div
			            id=\{closestInstanceID\}
			            onClick=\{this._onClick\}
			            dangerouslySetInnerHTML=\{innerHTML\}
			          />
			        );
			      \}
			    \}
			
			    function simulateClick(elem) \{
			      const event = new MouseEvent("click", \{
			        bubbles: true
			      \});
			      elem.dispatchEvent(event);
			    \}
			
			    const component = <ClosestInstance />;
			    ReactDOM.render(<section>\{component\}</section>, container);
			    expect(currentTargetID).toBe(null);
			    simulateClick(document.getElementById(nonReactElemID));
			    expect(currentTargetID).toBe(closestInstanceID);
			  \});
			
			  it("updates event handlers from fiber props", () => \{
			    let action = "";
			    let instance;
			    const handlerA = () => (action = "A");
			    const handlerB = () => (action = "B");
			
			    function simulateMouseOver(target) \{
			      const event = new MouseEvent("mouseover", \{
			        bubbles: true
			      \});
			      target.dispatchEvent(event);
			    \}
			
			    class HandlerFlipper extends React.Component \{
			      state = \{ flip: false \};
			      flip() \{
			        this.setState(\{ flip: true \});
			      \}
			      render() \{
			        return (
			          <div
			            id="update"
			            onMouseOver=\{this.state.flip ? handlerB : handlerA\}
			          />
			        );
			      \}
			    \}
			
			    ReactDOM.render(
			      <HandlerFlipper key="1" ref=\{n => (instance = n)\} />,
			      container
			    );
			    const node = container.firstChild;
			    simulateMouseOver(node);
			    expect(action).toEqual("A");
			    action = "";
			    // Render with the other event handler.
			    instance.flip();
			    simulateMouseOver(node);
			    expect(action).toEqual("B");
			  \});
			
			  it("finds a controlled instance from node and gets its current fiber props", () => \{
			    const inputID = "inputID";
			    const startValue = undefined;
			    const finishValue = "finish";
			
			    class Controlled extends React.Component \{
			      state = \{ value: startValue \};
			      a = null;
			      _onChange = e => this.setState(\{ value: e.currentTarget.value \});
			      render() \{
			        return (
			          <input
			            id=\{inputID\}
			            type="text"
			            ref=\{n => (this.a = n)\}
			            value=\{this.state.value\}
			            onChange=\{this._onChange\}
			          />
			        );
			      \}
			    \}
			
			    const setUntrackedInputValue = Object.getOwnPropertyDescriptor(
			      HTMLInputElement.prototype,
			      "value"
			    ).set;
			
			    function simulateInput(elem, value) \{
			      const inputEvent = new Event("input", \{
			        bubbles: true
			      \});
			      setUntrackedInputValue.call(elem, value);
			      elem.dispatchEvent(inputEvent);
			    \}
			
			    const component = <Controlled />;
			    const instance = ReactDOM.render(component, container);
			    expect(() => simulateInput(instance.a, finishValue)).toWarnDev(
			      "Warning: A component is changing an uncontrolled input of " +
			        "type text to be controlled. Input elements should not " +
			        "switch from uncontrolled to controlled (or vice versa). " +
			        "Decide between using a controlled or uncontrolled input " +
			        "element for the lifetime of the component. More info: " +
			        "https://fb.me/react-controlled-components"
			    );
			  \});
			
			  it("finds instance of node that is attempted to be unmounted", () => \{
			    const component = <div />;
			    const node = ReactDOM.render(<div>\{component\}</div>, container);
			    expect(() => ReactDOM.unmountComponentAtNode(node)).toWarnDev(
			      "unmountComponentAtNode(): The node you're attempting to unmount " +
			        "was rendered by React and is not a top-level container. You may " +
			        "have accidentally passed in a React root node instead of its " +
			        "container."
			    );
			  \});
			
			  it("finds instance from node to stop rendering over other react rendered components", () => \{
			    const component = (
			      <div>
			        <span>Hello</span>
			      </div>
			    );
			    const anotherComponent = <div />;
			    const instance = ReactDOM.render(component, container);
			    expect(() => ReactDOM.render(anotherComponent, instance)).toWarnDev(
			      "render(...): Replacing React-rendered children with a new root " +
			        "component. If you intended to update the children of this node, " +
			        "you should instead have the existing children update their state " +
			        "and render the new components instead of calling ReactDOM.render."
			    );
			  \});
			
			  it("属性操作应该与插入操作提前到所有effects之前", () => \{
			    class DifferentParent extends React.Component \{
			      box = React.createRef();
			      componentDidMount() \{
			        expect(this.box.current.parentElement.style.height).toBe("400px");
			      \}
			      render() \{
			        return <div ref=\{this.box\}>box</div>;
			      \}
			    \}
			    ReactDOM.render(
			      <div style=\{\{ height: 400 \}\}>
			        <DifferentParent />
			      </div>,
			      container
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMComponentTree-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMEventListener-test.js', () => {
        const sourceCode = `
			'use strict';
			
			describe('ReactDOMEventListener', () => \{
			
			  let React = require('react');
			  let ReactDOM = require('react-dom');
			  let ReactTestUtils = require('test-utils');
			  beforeEach(() => \{
			    jest.resetModules();
			
			  \});
			
			  it('should dispatch events from outside React tree', () => \{
			    return
			    const mock = jest.fn();
			
			    const container = document.createElement('div');
			    const node = ReactDOM.render(<div onMouseEnter=\{mock\} />, container);
			    const otherNode = document.createElement('h1');
			    document.body.appendChild(container);
			    document.body.appendChild(otherNode);
			
			    otherNode.dispatchEvent(
			      new MouseEvent('mouseout', \{
			        bubbles: true,
			        cancelable: true,
			        relatedTarget: node,
			      \}),
			    );
			    expect(mock).toBeCalled();
			  \});
			
			  describe('Propagation', () => \{
			    let container
			    beforeEach(() => \{
			      jest.resetModules();
			      container = document.createElement("div")
			      document.body.appendChild(container)
			    \});
			    afterEach(() => \{
			      document.body.removeChild(container);
			
			    \});
			    it('should propagate events one level down', () => \{
			      const mouseOut = jest.fn();
			      const onMouseOut = event => mouseOut(event.currentTarget);
			
			      const childContainer = document.createElement('div');
			      const parentContainer = document.createElement('div');
			      const childNode = ReactDOM.render(
			        <div onMouseOut=\{onMouseOut\}>Child</div>,
			        childContainer,
			      );
			      const parentNode = ReactDOM.render(
			        <div onMouseOut=\{onMouseOut\}>div</div>,
			        parentContainer,
			      );
			      parentNode.appendChild(childContainer);
			      document.body.appendChild(parentContainer);
			
			      const nativeEvent = document.createEvent('Event');
			      nativeEvent.initEvent('mouseout', true, true);
			      childNode.dispatchEvent(nativeEvent);
			
			      expect(mouseOut).toBeCalled();
			      expect(mouseOut.mock.calls.length).toBe(2);
			      expect(mouseOut.mock.calls[0][0]).toEqual(childNode);
			      expect(mouseOut.mock.calls[1][0]).toEqual(parentNode);
			
			      document.body.removeChild(parentContainer);
			    \});
			
			    it('should propagate events two levels down', () => \{
			      const mouseOut = jest.fn();
			      const onMouseOut = event => mouseOut(event.currentTarget);
			
			      const childContainer = document.createElement('div');
			      const parentContainer = document.createElement('div');
			      const grandParentContainer = document.createElement('div');
			      const childNode = ReactDOM.render(
			        <div onMouseOut=\{onMouseOut\}>Child</div>,
			        childContainer,
			      );
			      const parentNode = ReactDOM.render(
			        <div onMouseOut=\{onMouseOut\}>Parent</div>,
			        parentContainer,
			      );
			      const grandParentNode = ReactDOM.render(
			        <div onMouseOut=\{onMouseOut\}>Parent</div>,
			        grandParentContainer,
			      );
			      parentNode.appendChild(childContainer);
			      grandParentNode.appendChild(parentContainer);
			
			      document.body.appendChild(grandParentContainer);
			
			      const nativeEvent = document.createEvent('Event');
			      nativeEvent.initEvent('mouseout', true, true);
			      childNode.dispatchEvent(nativeEvent);
			
			      expect(mouseOut).toBeCalled();
			      expect(mouseOut.mock.calls.length).toBe(3);
			      expect(mouseOut.mock.calls[0][0]).toEqual(childNode);
			      expect(mouseOut.mock.calls[1][0]).toEqual(parentNode);
			      expect(mouseOut.mock.calls[2][0]).toEqual(grandParentNode);
			
			      document.body.removeChild(grandParentContainer);
			    \});
			
			    // Regression test for https://github.com/facebook/react/issues/1105
			    it('should not get confused by disappearing elements', () => \{
			
			      class MyComponent extends React.Component \{
			        state = \{ clicked: false \};
			        handleClick = () => \{
			          this.setState(\{ clicked: true \});
			        \};
			        componentDidMount() \{
			          expect(ReactDOM.findDOMNode(this)).toBe(container.firstChild);
			        \}
			        componentDidUpdate() \{
			          expect(ReactDOM.findDOMNode(this)).toBe(container.firstChild);
			        \}
			        render() \{
			          if (this.state.clicked) \{
			            return <span>clicked!</span>;
			          \} else \{
			            return <button onClick=\{this.handleClick\}>not yet clicked</button>;
			          \}
			        \}
			      \}
			      ReactDOM.render(<MyComponent />, container);
			      container.firstChild.dispatchEvent(
			        new MouseEvent('click', \{
			          bubbles: true,
			        \}),
			      );
			      expect(container.firstChild.textContent).toBe('clicked!');
			
			    \});
			
			    it('should batch between handlers from different roots', () => \{
			      const mock = jest.fn();
			
			      const childContainer = document.createElement('div');
			      const handleChildMouseOut = () => \{
			        ReactDOM.render(<div>1</div>, childContainer);
			        mock(childNode.textContent);
			      \};
			
			      const parentContainer = document.createElement('div');
			      const handleParentMouseOut = () => \{
			        ReactDOM.render(<div>2</div>, childContainer);
			        mock(childNode.textContent);
			      \};
			
			      const childNode = ReactDOM.render(
			        <div onMouseOut=\{handleChildMouseOut\}>Child</div>,
			        childContainer,
			      );
			      const parentNode = ReactDOM.render(
			        <div onMouseOut=\{handleParentMouseOut\}>Parent</div>,
			        parentContainer,
			      );
			      parentNode.appendChild(childContainer);
			      document.body.appendChild(parentContainer);
			
			      const nativeEvent = document.createEvent('Event');
			      nativeEvent.initEvent('mouseout', true, true);
			      childNode.dispatchEvent(nativeEvent);
			
			      // Child and parent should both call from event handlers.
			      expect(mock.mock.calls.length).toBe(2);
			      // The first call schedules a render of '1' into the 'Child'.
			      // However, we're batching so it isn't flushed yet.
			      expect(mock.mock.calls[0][0]).toBe('Child');
			      // The first call schedules a render of '2' into the 'Child'.
			      // We're still batching so it isn't flushed yet either.
			      expect(mock.mock.calls[1][0]).toBe('Child');
			      // By the time we leave the handler, the second update is flushed.
			      expect(childNode.textContent).toBe('2');
			      document.body.removeChild(parentContainer);
			    \});
			
			
			    it('should not fire duplicate events for a React DOM tree', () => \{
			      const mouseOut = jest.fn();
			      const onMouseOut = event => mouseOut(event.target);
			
			      class Wrapper extends React.Component \{
			        getInner = () => \{
			          return this.refs.inner;
			        \};
			
			        render() \{
			          const inner = <div ref="inner">Inner</div>;
			          return (
			            <div>
			              <div onMouseOut=\{onMouseOut\} id="outer">
			                \{inner\}
			              </div>
			            </div>
			          );
			        \}
			      \}
			
			      const instance = ReactDOM.render(<Wrapper />, container);
			
			
			      const nativeEvent = document.createEvent('Event');
			      nativeEvent.initEvent('mouseout', true, true);
			      instance.getInner().dispatchEvent(nativeEvent);
			
			      expect(mouseOut).toBeCalled();
			      expect(mouseOut.mock.calls.length).toBe(1);
			      expect(mouseOut.mock.calls[0][0]).toEqual(instance.getInner());
			
			      ReactDOM.unmountComponentAtNode(container);
			    \});
			
			    it("冒泡", function () \{
			
			      var aaa = "";
			      class App extends React.PureComponent \{
			        constructor(props) \{
			          super(props);
			          this.state = \{
			            aaa: \{
			              a: 7
			            \}
			          \};
			        \}
			
			        click() \{
			          aaa += "aaa ";
			        \}
			        click2(e) \{
			          aaa += "bbb ";
			          e.stopPropagation();
			        \}
			        click3(e) \{
			          aaa += "ccc ";
			        \}
			        render() \{
			          return (
			            <div onClick=\{this.click\}>
			              <p>=========</p>
			              <div onClick=\{this.click2\}>
			                <p>=====</p>
			                <div ref="bubble" onClick=\{this.click3\}>
			                  \{this.state.aaa.a\}
			                </div>
			              </div>
			            </div>
			          );
			        \}
			      \}
			
			      var s = ReactDOM.render(<App />, container);
			      ReactTestUtils.Simulate.click(s.refs.bubble);
			
			      expect(aaa.trim()).toBe("ccc bbb");
			
			      ReactDOM.unmountComponentAtNode(container);
			
			    \});
			    it("捕获", function () \{
			      var aaa = "";
			      class App extends React.PureComponent \{
			        constructor(props) \{
			          super(props);
			          this.state = \{
			            aaa: \{
			              a: 7
			            \}
			          \};
			        \}
			
			        click() \{
			          aaa += "aaa ";
			        \}
			        click2(e) \{
			          aaa += "bbb ";
			          e.preventDefault();
			          e.stopPropagation();
			        \}
			        click3(e) \{
			          aaa += "ccc ";
			        \}
			        render() \{
			          return (
			            <div onClickCapture=\{this.click\}>
			              <p>=========</p>
			              <div onClickCapture=\{this.click2\}>
			                <p>=====</p>
			                <div ref="capture" onClickCapture=\{this.click3\}>
			                  \{this.state.aaa.a\}
			                </div>
			              </div>
			            </div>
			          );
			        \}
			      \}
			
			      var s = ReactDOM.render(<App />, container);
			
			      ReactTestUtils.Simulate.click(s.refs.capture);
			      expect(aaa.trim()).toBe("aaa bbb");
			      ReactDOM.unmountComponentAtNode(container);
			    \});
			    it("1.1.2checkbox绑定onChange事件会触发两次", async () => \{
			      var logIndex = 0;
			      function refFn(e) \{
			        logIndex++;
			      \}
			
			      var dom = ReactDOM.render(<input type="checkbox" onChange=\{refFn\} />, container);
			      dom.click()
			
			
			      expect(logIndex).toBe(1);
			      ReactDOM.unmountComponentAtNode(container);
			    \});
			    it("让focus能冒泡", () => \{
			      var aaa = "";
			      class App extends React.Component \{
			        constructor(props) \{
			          super(props);
			          this.state = \{
			            aaa: \{
			              a: 7
			            \}
			          \};
			        \}
			
			        onFocus1() \{
			          aaa += "aaa ";
			        \}
			        onFocus2(e) \{
			          aaa += "bbb ";
			        \}
			
			        render() \{
			          return (
			            <div
			              onFocus=\{this.onFocus2\}
			              style=\{\{
			                width: 200,
			                height: 200
			              \}\}
			            >
			              <div
			                ref="focus2"
			                tabIndex=\{-1\}
			                onFocus=\{this.onFocus1\}
			                style=\{\{
			                  width: 100,
			                  height: 100
			                \}\}
			              >
			                222
			                      </div>
			            </div>
			          );
			        \}
			      \}
			
			      var s = ReactDOM.render(<App />, container);
			      s.refs.focus2.focus()
			      expect(aaa.trim()).toBe("aaa bbb");
			      ReactDOM.unmountComponentAtNode(container);
			    \});
			
			
			    it("合并点击事件中的setState", async () => \{
			      var list = [];
			      class App extends React.Component \{
			        constructor(props) \{
			          super(props);
			          this.__merge = true
			          this.state = \{
			            path: "111"
			          \};
			        \}
			
			        render() \{
			          list.push("render " + this.state.path);
			          return (
			            <div>
			              <span ref="click2time" onClick=\{this.onClick.bind(this)\}>
			                \{this.state.path\}
			              </span>
			            </div>
			          );
			        \}
			
			        onClick() \{
			          this.setState(
			            \{
			              path: "click"
			            \},
			            function () \{
			              list.push("click....");
			            \}
			          );
			          this.setState(
			            \{
			              path: "click2"
			            \},
			            function () \{
			              list.push("click2....");
			            \}
			          );
			        \}
			        componentWillUpdate() \{
			          list.push("will update");
			        \}
			        componentDidUpdate() \{
			          list.push("did update");
			        \}
			      \}
			
			      var s = ReactDOM.render(<App />, container, function () \{
			        list.push("ReactDOM cb");
			      \});
			      var list2 = ["render 111", "ReactDOM cb", "will update", "render click2", "did update", "click....", "click2...."];
			      ReactTestUtils.Simulate.click(s.refs.click2time);
			      expect(list).toEqual(list2);
			
			      ReactDOM.unmountComponentAtNode(container);
			
			
			    \});
			
			
			
			
			  \});
			
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMEventListener-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMFiber-test.js', () => {
        const sourceCode = `
			'use strict';
			
			const React = require('react');
			const ReactDOM = require('react-dom');
			const ReactTestUtils = require('test-utils');
			const PropTypes = require('prop-types');
			
			describe('ReactDOMFiber', () => \{
				let container;
			
				beforeEach(() => \{
				
					container = document.createElement('div');
				\});
				afterEach(() => \{
					ReactDOM.unmountComponentAtNode(container);
				\}, 5000);
			
				it('should render strings as children', () => \{
					const Box = (\{ value \}) => <div>\{value\}</div>;
			
					ReactDOM.render(<Box value="foo" />, container);
					expect(container.textContent).toEqual('foo');
				\});
			
				it('should render numbers as children', () => \{
					const Box = (\{ value \}) => <div>\{value\}</div>;
			
					ReactDOM.render(<Box value=\{10\} />, container);
			
					expect(container.textContent).toEqual('10');
				\});
			
				it('should be called a callback argument', () => \{
					// mounting phase
					let called = false;
					ReactDOM.render(<div>Foo</div>, container, () => (called = true));
					expect(called).toEqual(true);
			
					// updating phase
					called = false;
					ReactDOM.render(<div>Foo</div>, container, () => (called = true));
					expect(called).toEqual(true);
				\});
			
				it('should call a callback argument when the same element is re-rendered', () => \{
					class Foo extends React.Component \{
						render() \{
							return <div>Foo</div>;
						\}
					\}
					const element = <Foo />;
			
					// mounting phase
					let called = false;
					ReactDOM.render(element, container, () => (called = true));
					expect(called).toEqual(true);
			
					// updating phase
					called = false;
					ReactDOM.unstable_batchedUpdates(() => \{
						ReactDOM.render(element, container, () => (called = true));
					\});
					expect(called).toEqual(true);
				\});
			
				it('should render a component returning strings directly from render', () => \{
					const Text = (\{ value \}) => value;
			
					ReactDOM.render(<Text value="foo" />, container);
					expect(container.textContent).toEqual('foo');
				\});
			
				it('should render a component returning numbers directly from render', () => \{
					const Text = (\{ value \}) => value;
			
					ReactDOM.render(<Text value=\{10\} />, container);
			
					expect(container.textContent).toEqual('10');
				\});
			
				it('finds the DOM Text node of a string child', () => \{
					class Text extends React.Component \{
						render() \{
							return this.props.value;
						\}
					\}
			
					let instance = null;
					ReactDOM.render(<Text value="foo" ref=\{ref => (instance = ref)\} />, container);
			
					const textNode = ReactDOM.findDOMNode(instance);
					expect(textNode).toBe(container.firstChild);
					expect(textNode.nodeType).toBe(3);
					expect(textNode.nodeValue).toBe('foo');
				\});
			
				it('finds the first child when a component returns a fragment', () => \{
					class Fragment extends React.Component \{
						render() \{
							return [<div key="a" />, <span key="b" />];
						\}
					\}
			
					let instance = null;
					ReactDOM.render(<Fragment ref=\{ref => (instance = ref)\} />, container);
			
					expect(container.childNodes.length).toBe(2);
			
					const firstNode = ReactDOM.findDOMNode(instance);
					expect(firstNode).toBe(container.firstChild);
					expect(firstNode.tagName).toBe('DIV');
				\});
			
				it('finds the first child even when fragment is nested', () => \{
					class Wrapper extends React.Component \{
						render() \{
							return this.props.children;
						\}
					\}
			
					class Fragment extends React.Component \{
						render() \{
							return [
								<Wrapper key="a">
									<div />
								</Wrapper>,
								<span key="b" />,
							];
						\}
					\}
			
					let instance = null;
					ReactDOM.render(<Fragment ref=\{ref => (instance = ref)\} />, container);
			
					expect(container.childNodes.length).toBe(2);
			
					const firstNode = ReactDOM.findDOMNode(instance);
					expect(firstNode).toBe(container.firstChild);
					expect(firstNode.tagName).toBe('DIV');
				\});
			
				it('finds the first child even when first child renders null', () => \{
					class NullComponent extends React.Component \{
						render() \{
							return null;
						\}
					\}
			
					class Fragment extends React.Component \{
						render() \{
							return [<NullComponent key="a" />, <div key="b" />, <span key="c" />];
						\}
					\}
			
					let instance = null;
					ReactDOM.render(<Fragment ref=\{ref => (instance = ref)\} />, container);
			
					expect(container.childNodes.length).toBe(2);
			
					const firstNode = ReactDOM.findDOMNode(instance);
					expect(firstNode).toBe(container.firstChild);
					expect(firstNode.tagName).toBe('DIV');
				\});
			
				let svgEls, htmlEls, mathEls;
				const expectSVG = \{ ref: el => svgEls.push(el) \};
				const expectHTML = \{ ref: el => htmlEls.push(el) \};
				const expectMath = \{ ref: el => mathEls.push(el) \};
			
				const usePortal = function(tree) \{
					return ReactDOM.createPortal(tree, document.createElement('div'));
				\};
			
				const assertNamespacesMatch = function(tree) \{
					container = document.createElement('div');
					svgEls = [];
					htmlEls = [];
					mathEls = [];
			
					ReactDOM.render(tree, container);
					svgEls.forEach(el => \{
						expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
					\});
					htmlEls.forEach(el => \{
						expect(el.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
					\});
					mathEls.forEach(el => \{
						expect(el.namespaceURI).toBe('http://www.w3.org/1998/Math/MathML');
					\});
			
					ReactDOM.unmountComponentAtNode(container);
					expect(container.innerHTML).toBe('');
				\};
			
				it('should render one portal', () => \{
					const portalContainer = document.createElement('div');
			
					ReactDOM.render(<div>\{ReactDOM.createPortal(<div>portal</div>, portalContainer)\}</div>, container);
					expect(portalContainer.innerHTML).toBe('<div>portal</div>');
					expect(container.innerHTML).toBe('<div></div>');
			
					ReactDOM.unmountComponentAtNode(container);
					expect(portalContainer.innerHTML).toBe('');
					expect(container.innerHTML).toBe('');
				\});
			
				// TODO: remove in React 17
				it('should support unstable_createPortal alias', () => \{
					const portalContainer = document.createElement('div');
					const createPortal = ReactDOM.createPortal;
			
					expect(() =>
						ReactDOM.render(<div>\{createPortal(<div>portal</div>, portalContainer)\}</div>, container)
					).toLowPriorityWarnDev(
						'The ReactDOM.unstable_createPortal() alias has been deprecated, ' +
							'and will be removed in React 17+. Update your code to use ' +
							'ReactDOM.createPortal() instead. It has the exact same API, ' +
							'but without the "unstable_" prefix.'
					);
					expect(portalContainer.innerHTML).toBe('<div>portal</div>');
					expect(container.innerHTML).toBe('<div></div>');
			
					ReactDOM.unmountComponentAtNode(container);
					expect(portalContainer.innerHTML).toBe('');
					expect(container.innerHTML).toBe('');
				\});
			
				it('should render many portals', () => \{
					const portalContainer1 = document.createElement('div');
					const portalContainer2 = document.createElement('div');
			
					const ops = [];
					class Child extends React.Component \{
						componentDidMount() \{
							ops.push(\`\$\{this.props.name\} componentDidMount\`);
						\}
						componentDidUpdate() \{
							ops.push(\`\$\{this.props.name\} componentDidUpdate\`);
						\}
						componentWillUnmount() \{
							ops.push(\`\$\{this.props.name\} componentWillUnmount\`);
						\}
						render() \{
							return <div>\{this.props.name\}</div>;
						\}
					\}
			
					class Parent extends React.Component \{
						componentDidMount() \{
							ops.push(\`Parent:\$\{this.props.step\} componentDidMount\`);
						\}
						componentDidUpdate() \{
							ops.push(\`Parent:\$\{this.props.step\} componentDidUpdate\`);
						\}
						componentWillUnmount() \{
							ops.push(\`Parent:\$\{this.props.step\} componentWillUnmount\`);
						\}
						render() \{
							const \{ step \} = this.props;
							return [
								<Child key="a" name=\{\`normal[0]:\$\{step\}\`\} />,
								ReactDOM.createPortal(<Child key="b" name=\{\`portal1[0]:\$\{step\}\`\} />, portalContainer1),
								<Child key="c" name=\{\`normal[1]:\$\{step\}\`\} />,
								ReactDOM.createPortal(
									[<Child key="d" name=\{\`portal2[0]:\$\{step\}\`\} />, <Child key="e" name=\{\`portal2[1]:\$\{step\}\`\} />],
									portalContainer2
								),
							];
						\}
					\}
			
					ReactDOM.render(<Parent step="a" />, container);
					expect(portalContainer1.innerHTML).toBe('<div>portal1[0]:a</div>');
					expect(portalContainer2.innerHTML).toBe('<div>portal2[0]:a</div><div>portal2[1]:a</div>');
					expect(container.innerHTML).toBe('<div>normal[0]:a</div><div>normal[1]:a</div>');
					expect(ops).toEqual([
						'normal[0]:a componentDidMount',
						'portal1[0]:a componentDidMount',
						'normal[1]:a componentDidMount',
						'portal2[0]:a componentDidMount',
						'portal2[1]:a componentDidMount',
						'Parent:a componentDidMount',
					]);
			
					ops.length = 0;
					ReactDOM.render(<Parent step="b" />, container);
					expect(portalContainer1.innerHTML).toBe('<div>portal1[0]:b</div>');
					expect(portalContainer2.innerHTML).toBe('<div>portal2[0]:b</div><div>portal2[1]:b</div>');
					expect(container.innerHTML).toBe('<div>normal[0]:b</div><div>normal[1]:b</div>');
					expect(ops).toEqual([
						'normal[0]:b componentDidUpdate',
						'portal1[0]:b componentDidUpdate',
						'normal[1]:b componentDidUpdate',
						'portal2[0]:b componentDidUpdate',
						'portal2[1]:b componentDidUpdate',
						'Parent:b componentDidUpdate',
					]);
			
					ops.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(portalContainer1.innerHTML).toBe('');
					expect(portalContainer2.innerHTML).toBe('');
					expect(container.innerHTML).toBe('');
					expect(ops).toEqual([
						'Parent:b componentWillUnmount',
						'normal[0]:b componentWillUnmount',
						'portal1[0]:b componentWillUnmount',
						'normal[1]:b componentWillUnmount',
						'portal2[0]:b componentWillUnmount',
						'portal2[1]:b componentWillUnmount',
					]);
				\});
				it("复杂的插入点机制测试", () => \{
			        function prev(el)\{
						return el.previousSibling || \{\}
					\}
					var div = document.createElement("div")
					class InnerBox extends React.PureComponent \{
						state = \{
							current: 0,
						\}
						componentDidMount() \{
							console.log('InnerBox render');
							setTimeout(() => \{
								console.log('current跟上次不一样)');
								this.setState(\{ current: 1 \}, ()=>\{
									expect(prev(this.refs.aaa).id).toBe("a2")
								\});
							\}, 50);
							setTimeout(() => \{
								console.log('current跟上次一样，dom位置互换');
								this.setState(\{ current: 1 \}, ()=>\{
									expect(prev(this.refs.aaa).id).toBe("a2")
								\});
							\}, 100);
							setTimeout(() => \{
								console.log('current跟上次不一样，dom位置复原');
								this.setState(\{ current: 2 \}, ()=>\{
									expect(prev(this.refs.aaa).id).toBe("a2")
								\});
							\}, 150);
							setTimeout(() => \{
								console.log('current跟上次一样，dom位置互换');
								this.setState(\{ current: 2 \}, ()=>\{
									expect(prev(this.refs.aaa).id).toBe("a2")
								\});
							\}, 200);
						\}
						render() \{
							console.log('inner render trigger');
							return (
								<div id="a3" ref="aaa">
									<div style=\{\{ height: 100 \}\}>内部组件\{this.state.current\}</div>
								</div>
							);
						\}
						
					\};
			
					class WrapBox extends React.PureComponent \{
						state = \{
							value: 1,
						\}
						componentDidMount() \{
							console.log('WrapBox render');
							// 此处如果在组件创建以后，再次setState，会导致dom位置错误的现象发生
							setTimeout(() => \{
								console.log('父容器state值改变');
								this.setState(\{
									value: 1,
								\});
							\}, 70);
						\}
						render() \{
							console.log('wrap render trigger');
							return (
								<quoteblock>
									<div id="a1">标题区域1</div>
									<div id="a2">标题区域2</div>
									<InnerBox />
									<div id="a4">标题区域3</div>
								</quoteblock>
							);
						\}
					\}
				
					ReactDOM.render(
						<div>
							<WrapBox />
							<div>hello anu!</div>
						</div>,
						div
					);
					
				\})
			
				it('should render nested portals', () => \{
					const portalContainer1 = document.createElement('div');
					const portalContainer2 = document.createElement('div');
					const portalContainer3 = document.createElement('div');
			
					ReactDOM.render(
						[
							<div key="a">normal[0]</div>,
							ReactDOM.createPortal(
								[
									<div key="b">portal1[0]</div>,
									ReactDOM.createPortal(<div key="c">portal2[0]</div>, portalContainer2),
									ReactDOM.createPortal(<div key="d">portal3[0]</div>, portalContainer3),
									<div key="e">portal1[1]</div>,
								],
								portalContainer1
							),
							<div key="f">normal[1]</div>,
						],
						container
					);
					expect(portalContainer1.innerHTML).toBe('<div>portal1[0]</div><div>portal1[1]</div>');
					expect(portalContainer2.innerHTML).toBe('<div>portal2[0]</div>');
					expect(portalContainer3.innerHTML).toBe('<div>portal3[0]</div>');
					expect(container.innerHTML).toBe('<div>normal[0]</div><div>normal[1]</div>');
			
					ReactDOM.unmountComponentAtNode(container);
					expect(portalContainer1.innerHTML).toBe('');
					expect(portalContainer2.innerHTML).toBe('');
					expect(portalContainer3.innerHTML).toBe('');
					expect(container.innerHTML).toBe('');
				\});
			
				it('should reconcile portal children', () => \{
					const portalContainer = document.createElement('div');
			
					ReactDOM.render(<div>\{ReactDOM.createPortal(<div>portal:1</div>, portalContainer)\}</div>, container);
					expect(portalContainer.innerHTML).toBe('<div>portal:1</div>');
					expect(container.innerHTML).toBe('<div></div>');
			
					ReactDOM.render(<div>\{ReactDOM.createPortal(<div>portal:2</div>, portalContainer)\}</div>, container);
					expect(portalContainer.innerHTML).toBe('<div>portal:2</div>');
					expect(container.innerHTML).toBe('<div></div>');
			
					ReactDOM.render(<div>\{ReactDOM.createPortal(<p>portal:3</p>, portalContainer)\}</div>, container);
					expect(portalContainer.innerHTML).toBe('<p>portal:3</p>');
					expect(container.innerHTML).toBe('<div></div>');
			
					ReactDOM.render(<div>\{ReactDOM.createPortal(['Hi', 'Bye'], portalContainer)\}</div>, container);
					expect(portalContainer.innerHTML).toBe('HiBye');
					expect(container.innerHTML).toBe('<div></div>');
			
					ReactDOM.render(<div>\{ReactDOM.createPortal(['Bye', 'Hi'], portalContainer)\}</div>, container);
					expect(portalContainer.innerHTML).toBe('ByeHi');
					expect(container.innerHTML).toBe('<div></div>');
			
					ReactDOM.render(<div>\{ReactDOM.createPortal(null, portalContainer)\}</div>, container);
					expect(portalContainer.innerHTML).toBe('');
					expect(container.innerHTML).toBe('<div></div>');
				\});
			
				it('should keep track of namespace across portals (simple)', () => \{
					assertNamespacesMatch(
						<svg \{...expectSVG\}>
							<image \{...expectSVG\} />
							\{usePortal(<div \{...expectHTML\} />)\}
							<image \{...expectSVG\} />
						</svg>
					);
					assertNamespacesMatch(
						<math \{...expectMath\}>
							<mi \{...expectMath\} />
							\{usePortal(<div \{...expectHTML\} />)\}
							<mi \{...expectMath\} />
						</math>
					);
					assertNamespacesMatch(
						<div \{...expectHTML\}>
							<p \{...expectHTML\} />
							\{usePortal(
								<svg \{...expectSVG\}>
									<image \{...expectSVG\} />
								</svg>
							)\}
							<p \{...expectHTML\} />
						</div>
					);
				\});
			
				it('should keep track of namespace across portals (medium)', () => \{
					assertNamespacesMatch(
						<svg \{...expectSVG\}>
							<image \{...expectSVG\} />
							\{usePortal(<div \{...expectHTML\} />)\}
							<image \{...expectSVG\} />
							\{usePortal(<div \{...expectHTML\} />)\}
							<image \{...expectSVG\} />
						</svg>
					);
					assertNamespacesMatch(
						<div \{...expectHTML\}>
							<math \{...expectMath\}>
								<mi \{...expectMath\} />
								\{usePortal(
									<svg \{...expectSVG\}>
										<image \{...expectSVG\} />
									</svg>
								)\}
							</math>
							<p \{...expectHTML\} />
						</div>
					);
					assertNamespacesMatch(
						<math \{...expectMath\}>
							<mi \{...expectMath\} />
							\{usePortal(
								<svg \{...expectSVG\}>
									<image \{...expectSVG\} />
									<foreignObject \{...expectSVG\}>
										<p \{...expectHTML\} />
										<math \{...expectMath\}>
											<mi \{...expectMath\} />
										</math>
										<p \{...expectHTML\} />
									</foreignObject>
									<image \{...expectSVG\} />
								</svg>
							)\}
							<mi \{...expectMath\} />
						</math>
					);
					assertNamespacesMatch(
						<div \{...expectHTML\}>
							\{usePortal(
								<svg \{...expectSVG\}>
									\{usePortal(<div \{...expectHTML\} />)\}
									<image \{...expectSVG\} />
								</svg>
							)\}
							<p \{...expectHTML\} />
						</div>
					);
					assertNamespacesMatch(
						<svg \{...expectSVG\}>
							<svg \{...expectSVG\}>
								\{usePortal(<div \{...expectHTML\} />)\}
								<image \{...expectSVG\} />
							</svg>
							<image \{...expectSVG\} />
						</svg>
					);
				\});
			
				it('should keep track of namespace across portals (complex)', () => \{
					assertNamespacesMatch(
						<div \{...expectHTML\}>
							\{usePortal(
								<svg \{...expectSVG\}>
									<image \{...expectSVG\} />
								</svg>
							)\}
							<p \{...expectHTML\} />
							<svg \{...expectSVG\}>
								<image \{...expectSVG\} />
							</svg>
							<svg \{...expectSVG\}>
								<svg \{...expectSVG\}>
									<image \{...expectSVG\} />
								</svg>
								<image \{...expectSVG\} />
							</svg>
							<p \{...expectHTML\} />
						</div>
					);
					assertNamespacesMatch(
						<div \{...expectHTML\}>
							<svg \{...expectSVG\}>
								<svg \{...expectSVG\}>
									<image \{...expectSVG\} />
									\{usePortal(
										<svg \{...expectSVG\}>
											<image \{...expectSVG\} />
											<svg \{...expectSVG\}>
												<image \{...expectSVG\} />
											</svg>
											<image \{...expectSVG\} />
										</svg>
									)\}
									<image \{...expectSVG\} />
									<foreignObject \{...expectSVG\}>
										<p \{...expectHTML\} />
										\{usePortal(<p \{...expectHTML\} />)\}
										<p \{...expectHTML\} />
									</foreignObject>
								</svg>
								<image \{...expectSVG\} />
							</svg>
							<p \{...expectHTML\} />
						</div>
					);
					assertNamespacesMatch(
						<div \{...expectHTML\}>
							<svg \{...expectSVG\}>
								<foreignObject \{...expectSVG\}>
									<p \{...expectHTML\} />
									\{usePortal(
										<svg \{...expectSVG\}>
											<image \{...expectSVG\} />
											<svg \{...expectSVG\}>
												<image \{...expectSVG\} />
												<foreignObject \{...expectSVG\}>
													<p \{...expectHTML\} />
												</foreignObject>
												\{usePortal(<p \{...expectHTML\} />)\}
											</svg>
											<image \{...expectSVG\} />
										</svg>
									)\}
									<p \{...expectHTML\} />
								</foreignObject>
								<image \{...expectSVG\} />
							</svg>
							<p \{...expectHTML\} />
						</div>
					);
				\});
			
				it('should unwind namespaces on uncaught errors', () => \{
					function BrokenRender() \{
						throw new Error('Hello');
					\}
			
					expect(() => \{
						assertNamespacesMatch(
							<svg \{...expectSVG\}>
								<BrokenRender />
							</svg>
						);
					\}).toThrow('Hello');
					assertNamespacesMatch(<div \{...expectHTML\} />);
				\});
			
				it('should unwind namespaces on caught errors', () => \{
					function BrokenRender() \{
						throw new Error('Hello');
					\}
			
					class ErrorBoundary extends React.Component \{
						state = \{ error: null \};
						componentDidCatch(error) \{
							this.setState(\{ error \});
						\}
						render() \{
							if (this.state.error) \{
								return <p \{...expectHTML\} />;
							\}
							return this.props.children;
						\}
					\}
			
					assertNamespacesMatch(
						<svg \{...expectSVG\}>
							<foreignObject \{...expectSVG\}>
								<ErrorBoundary>
									<math \{...expectMath\}>
										<BrokenRender />
									</math>
								</ErrorBoundary>
							</foreignObject>
							<image \{...expectSVG\} />
						</svg>
					);
					assertNamespacesMatch(<div \{...expectHTML\} />);
				\});
			
				it('should unwind namespaces on caught errors in a portal', () => \{
					function BrokenRender() \{
						throw new Error('Hello');
					\}
			
					class ErrorBoundary extends React.Component \{
						state = \{ error: null \};
						componentDidCatch(error) \{
							this.setState(\{ error \});
						\}
						render() \{
							if (this.state.error) \{
								return <image \{...expectSVG\} />;
							\}
							return this.props.children;
						\}
					\}
			
					assertNamespacesMatch(
						<svg \{...expectSVG\}>
							<ErrorBoundary>
								\{usePortal(
									<div \{...expectHTML\}>
										<math \{...expectMath\}>
											<BrokenRender />)
										</math>
									</div>
								)\}
							</ErrorBoundary>
							\{usePortal(<div \{...expectHTML\} />)\}
						</svg>
					);
				\});
			
				it('should pass portal context when rendering subtree elsewhere', () => \{
					const portalContainer = document.createElement('div');
			
					class Component extends React.Component \{
						static contextTypes = \{
							foo: PropTypes.string.isRequired,
						\};
			
						render() \{
							return <div>\{this.context.foo\}</div>;
						\}
					\}
			
					class Parent extends React.Component \{
						static childContextTypes = \{
							foo: PropTypes.string.isRequired,
						\};
			
						getChildContext() \{
							return \{
								foo: 'bar',
							\};
						\}
			
						render() \{
							return ReactDOM.createPortal(<Component />, portalContainer);
						\}
					\}
			
					ReactDOM.render(<Parent />, container);
					expect(container.innerHTML).toBe('');
					expect(portalContainer.innerHTML).toBe('<div>bar</div>');
				\});
			
				it('should update portal context if it changes due to setState', () => \{
					const portalContainer = document.createElement('div');
			
					class Component extends React.Component \{
						static contextTypes = \{
							foo: PropTypes.string.isRequired,
							getFoo: PropTypes.func.isRequired,
						\};
			
						render() \{
							return <div>\{this.context.foo + '-' + this.context.getFoo()\}</div>;
						\}
					\}
			
					class Parent extends React.Component \{
						static childContextTypes = \{
							foo: PropTypes.string.isRequired,
							getFoo: PropTypes.func.isRequired,
						\};
			
						state = \{
							bar: 'initial',
						\};
			
						getChildContext() \{
							return \{
								foo: this.state.bar,
								getFoo: () => this.state.bar,
							\};
						\}
			
						render() \{
							return ReactDOM.createPortal(<Component />, portalContainer);
						\}
					\}
			
					const instance = ReactDOM.render(<Parent />, container);
					expect(portalContainer.innerHTML).toBe('<div>initial-initial</div>');
					expect(container.innerHTML).toBe('');
					instance.setState(\{ bar: 'changed' \});
					expect(portalContainer.innerHTML).toBe('<div>changed-changed</div>');
					expect(container.innerHTML).toBe('');
				\});
			
				it('should update portal context if it changes due to re-render', () => \{
					const portalContainer = document.createElement('div');
			
					class Component extends React.Component \{
						static contextTypes = \{
							foo: PropTypes.string.isRequired,
							getFoo: PropTypes.func.isRequired,
						\};
			
						render() \{
							return <div>\{this.context.foo + '-' + this.context.getFoo()\}</div>;
						\}
					\}
			
					class Parent extends React.Component \{
						static childContextTypes = \{
							foo: PropTypes.string.isRequired,
							getFoo: PropTypes.func.isRequired,
						\};
			
						getChildContext() \{
							return \{
								foo: this.props.bar,
								getFoo: () => this.props.bar,
							\};
						\}
			
						render() \{
							return ReactDOM.createPortal(<Component />, portalContainer);
						\}
					\}
			
					ReactDOM.render(<Parent bar="initial" />, container);
					expect(portalContainer.innerHTML).toBe('<div>initial-initial</div>');
					expect(container.innerHTML).toBe('');
					ReactDOM.render(<Parent bar="changed" />, container);
					expect(portalContainer.innerHTML).toBe('<div>changed-changed</div>');
					expect(container.innerHTML).toBe('');
				\});
			
				it('findDOMNode should find dom element after expanding a fragment', () => \{
					class MyNode extends React.Component \{
						render() \{
							return !this.props.flag ? [<div key="a" />] : [<span key="b" />, <div key="a" />];
						\}
					\}
			
					const myNodeA = ReactDOM.render(<MyNode />, container);
					const a = ReactDOM.findDOMNode(myNodeA);
					expect(a.tagName).toBe('DIV');
			
					const myNodeB = ReactDOM.render(<MyNode flag=\{true\} />, container);
					expect(myNodeA === myNodeB).toBe(true);
			
					const b = ReactDOM.findDOMNode(myNodeB);
					expect(b.tagName).toBe('SPAN');
				\});
			
				it('should bubble events from the portal to the parent', () => \{
					const portalContainer = document.createElement('div');
			
					const ops = [];
					let portal = null;
			
					ReactDOM.render(
						<div onClick=\{() => ops.push('parent clicked')\}>
							\{ReactDOM.createPortal(
								<div onClick=\{() => ops.push('portal clicked')\} ref=\{n => (portal = n)\}>
									portal
								</div>,
								portalContainer
							)\}
						</div>,
						container
					);
			
					expect(portal.tagName).toBe('DIV');
			
					const fakeNativeEvent = \{\};
					ReactTestUtils.simulateNativeEventOnNode('topClick', portal, fakeNativeEvent);
			
					expect(ops).toEqual(['portal clicked', 'parent clicked']);
				\});
			
				it('should not onMouseLeave when staying in the portal', () => \{
					console.log('现在无法模仿onMouseLeave');
					return;
					const portalContainer = document.createElement('div');
			
					let ops = [];
					let firstTarget = null;
					let secondTarget = null;
					let thirdTarget = null;
			
					function simulateMouseMove(from, to) \{
						if (from) \{
							ReactTestUtils.simulateNativeEventOnNode('topMouseOut', from, \{
								target: from,
								relatedTarget: to,
							\});
						\}
						if (to) \{
							ReactTestUtils.simulateNativeEventOnNode('topMouseOver', to, \{
								target: to,
								relatedTarget: from,
							\});
						\}
					\}
			
					ReactDOM.render(
						<div>
							<div onMouseEnter=\{() => ops.push('enter parent')\} onMouseLeave=\{() => ops.push('leave parent')\}>
								<div ref=\{n => (firstTarget = n)\} />
								\{ReactDOM.createPortal(
									<div
										onMouseEnter=\{() => ops.push('enter portal')\}
										onMouseLeave=\{() => ops.push('leave portal')\}
										ref=\{n => (secondTarget = n)\}
									>
										portal
									</div>,
									portalContainer
								)\}
							</div>
							<div ref=\{n => (thirdTarget = n)\} />
						</div>,
						container
					);
			
					simulateMouseMove(null, firstTarget);
					expect(ops).toEqual(['enter parent']);
			
					ops = [];
			
					simulateMouseMove(firstTarget, secondTarget);
					expect(ops).toEqual([
						// Parent did not invoke leave because we're still inside the portal.
						'enter portal',
					]);
			
					ops = [];
			
					simulateMouseMove(secondTarget, thirdTarget);
					expect(ops).toEqual([
						'leave portal',
						'leave parent', // Only when we leave the portal does onMouseLeave fire.
					]);
				\});
			
				it('should throw on bad createPortal argument', () => \{
					ReactDOM.createPortal(<div>portal</div>, document.createElement('div'));
					/*
			    expect(() => \{
			      ReactDOM.createPortal(<div>portal</div>, null);
			    \}).toThrow('Target container is not a DOM element.');
			    expect(() => \{
			      ReactDOM.createPortal(<div>portal</div>, document.createTextNode('hi'));
			    \}).toThrow('Target container is not a DOM element.');
			    */
				\});
			
				it('should warn for non-functional event listeners', () => \{
					class Example extends React.Component \{
						render() \{
							return <div onClick="woops" />;
						\}
					\}
					expect(() => ReactDOM.render(<Example />, container)).toWarnDev(
						'Expected \`onClick\` listener to be a function, instead got a value of \`string\` type.\\n' +
							'    in div (at **)\\n' +
							'    in Example (at **)'
					);
				\});
			
				it('should warn with a special message for \`false\` event listeners', () => \{
					class Example extends React.Component \{
						render() \{
							return <div onClick=\{false\} />;
						\}
					\}
					expect(() => ReactDOM.render(<Example />, container)).toWarnDev(
						'Expected \`onClick\` listener to be a function, instead got \`false\`.\\n\\n' +
							'If you used to conditionally omit it with onClick=\{condition && value\}, ' +
							'pass onClick=\{condition ? value : undefined\} instead.\\n',
						'    in div (at **)\\n' + '    in Example (at **)'
					);
				\});
			
				it('should not update event handlers until commit', () => \{
					let ops = [];
					const handlerA = () => ops.push('A');
					const handlerB = () => ops.push('B');
			
					class Example extends React.Component \{
						state = \{ flip: false, count: 0 \};
						flip() \{
							this.setState(\{ flip: true, count: this.state.count + 1 \});
						\}
						tick() \{
							this.setState(\{ count: this.state.count + 1 \});
						\}
						render() \{
							const useB = !this.props.forceA && this.state.flip;
							return <div onClick=\{useB ? handlerB : handlerA\} />;
						\}
					\}
			
					class Click extends React.Component \{
						constructor() \{
							super();
							click(node);
						\}
						render() \{
							return null;
						\}
					\}
			
					let inst;
					ReactDOM.render([<Example key="a" ref=\{n => (inst = n)\} />], container);
					const node = container.firstChild;
					expect(node.tagName).toEqual('DIV');
			
					function click(target) \{
						const fakeNativeEvent = \{\};
						ReactTestUtils.simulateNativeEventOnNode('topClick', target, fakeNativeEvent);
					\}
			
					click(node);
			
					expect(ops).toEqual(['A']);
					ops = [];
			
					// Render with the other event handler.
					inst.flip();
			
					click(node);
			
					expect(ops).toEqual(['B']);
					ops = [];
			
					// Rerender without changing any props.
					inst.tick();
			
					click(node);
			
					expect(ops).toEqual(['B']);
					ops = [];
			
					// Render a flip back to the A handler. The second component invokes the
					// click handler during render to simulate a click during an aborted
					// render. I use this hack because at current time we don't have a way to
					// test aborted ReactDOM renders.
					ReactDOM.render([<Example key="a" forceA=\{true\} />, <Click key="b" />], container);
			
					// Because the new click handler has not yet committed, we should still
					// invoke B.
					expect(ops).toEqual(['B']);
					ops = [];
			
					// Any click that happens after commit, should invoke A.
					click(node);
					expect(ops).toEqual(['A']);
				\});
			
				it('should not crash encountering low-priority tree', () => \{
					ReactDOM.render(
						<div hidden=\{true\}>
							<div />
						</div>,
						container
					);
				\});
			
				it('should not warn when rendering into an empty container', () => \{
					ReactDOM.render(<div>foo</div>, container);
					expect(container.innerHTML).toBe('<div>foo</div>');
					ReactDOM.render(null, container);
					expect(container.innerHTML).toBe('');
					ReactDOM.render(<div>bar</div>, container);
					expect(container.innerHTML).toBe('<div>bar</div>');
				\});
				
			
				it('should warn when doing an update to a container manually updated outside of React', () => \{
					// when not messing with the DOM outside of React
					ReactDOM.render(<div>foo</div>, container);
					ReactDOM.render(<div>bar</div>, container);
					expect(container.innerHTML).toBe('<div>bar</div>');
					// then we mess with the DOM before an update
					container.innerHTML = '<div>MEOW.</div>';
					// expect(() => ReactDOM.render(<div>baz</div>, container)).toWarnDev(
					//   'render(...): ' +
					//     'It looks like the React-rendered content of this container was ' +
					//     'removed without using React. This is not supported and will ' +
					//     'cause errors. Instead, call ReactDOM.unmountComponentAtNode ' +
					//     'to empty a container.',
					// );
				\});
			
				it('should warn when doing an update to a container manually cleared outside of React', () => \{
					// when not messing with the DOM outside of React
					ReactDOM.render(<div>foo</div>, container);
					ReactDOM.render(<div>bar</div>, container);
					expect(container.innerHTML).toBe('<div>bar</div>');
					// then we mess with the DOM before an update
					container.innerHTML = '';
					// expect(() => ReactDOM.render(<div>baz</div>, container)).toWarnDev(
					//   'render(...): ' +
					//     'It looks like the React-rendered content of this container was ' +
					//     'removed without using React. This is not supported and will ' +
					//     'cause errors. Instead, call ReactDOM.unmountComponentAtNode ' +
					//     'to empty a container.',
					// );
				\});
			
				it('should render a text component with a text DOM node on the same document as the container', () => \{
					console.log("这不测试有问题，iframe无法跨域")
					return
					// 1. Create a new document through the use of iframe
					// 2. Set up the spy to make asserts when a text component
					//    is rendered inside the iframe container
					const textContent = 'Hello world';
					const iframe = document.createElement('iframe');
				
					document.body.appendChild(iframe);
					const iframeDocument = iframe.contentDocument;
					iframeDocument.domain = document.domain;
					iframeDocument.write('<!DOCTYPE html><html><head></head><body><div></div></body></html>');
					iframeDocument.close();
					const iframeContainer = iframeDocument.body.firstChild;
			
					let actualDocument;
					let textNode;
					//anu只使用insertBefore
					let oldInsertBefore = iframeContainer.insertBefore;
					iframeContainer.insertBefore = function(node, insertPoint) \{
						actualDocument = node.ownerDocument;
						textNode = node;
						return oldInsertBefore.call(this, node, insertPoint);
					\};
					// spyOnDevAndProd(iframeContainer, 'appendChild').and.callFake(node => \{
					//   actualDocument = node.ownerDocument;
					//   textNode = node;
					// \});
			
					ReactDOM.render(textContent, iframeContainer);
			
					expect(textNode.textContent).toBe(textContent);
					// expect(actualDocument).not.toBe(document);
					expect(actualDocument).toBe(iframeDocument);
					expect(iframeContainer.appendChild).toHaveBeenCalledTimes(1);
				\});
			
				it('should mount into a document fragment', () => \{
					const fragment = document.createDocumentFragment();
					ReactDOM.render(<div>foo</div>, fragment);
					expect(container.innerHTML.trim()).toBe('');
					container.appendChild(fragment);
					expect(container.innerHTML.trim()).toBe('<div>foo</div>');
				\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMFiber-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(38)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMInput-test.js', () => {
        const sourceCode = `
			
			'use strict';
			
			const emptyFunction = function()\{\}
			
			describe('ReactDOMInput', () => \{
			  let React;
			  let ReactDOM;
			  let ReactDOMServer;
			  let ReactTestUtils;
			  let setUntrackedValue;
			
			  function dispatchEventOnNode(node, type) \{
			    node.dispatchEvent(new Event(type, \{bubbles: true, cancelable: true\}));
			  \}
			
			  beforeEach(() => \{
			    jest.resetModules();
			
			    setUntrackedValue = Object.getOwnPropertyDescriptor(
			      HTMLInputElement.prototype,
			      'value',
			    ).set;
			
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactDOMServer = require('react-server-renderer');
			    ReactTestUtils = require('test-utils');
			  \});
			
			  it('should properly control a value even if no event listener exists', () => \{
			    const container = document.createElement('div');
			    let stub;
			
			    expect(() => \{
			      stub = ReactDOM.render(<input type="text" value="lion" />, container);
			    \}).toWarnDev(
			      'Failed prop type: You provided a \`value\` prop to a form field without an \`onChange\` handler.',
			    );
			
			    document.body.appendChild(container);
			
			    const node = ReactDOM.findDOMNode(stub);
			
			    setUntrackedValue.call(node, 'giraffe');
			
			    // This must use the native event dispatching. If we simulate, we will
			    // bypass the lazy event attachment system so we won't actually test this.
			    dispatchEventOnNode(node, 'change');
			
			    expect(node.value).toBe('lion');
			
			    document.body.removeChild(container);
			  \});
			
			  it('should control a value in reentrant events', () => \{
			   
			     return
			    
			    class ControlledInputs extends React.Component \{
			      state = \{value: 'lion'\};
			      a = null;
			      b = null;
			      switchedFocus = false;
			      change(newValue) \{
			        this.setState(\{value: newValue\});
			        // Calling focus here will blur the text box which causes a native
			        // change event. Ideally we shouldn't have to fire this ourselves.
			        // Don't remove unless you've verified the fix in #8240 is still covered.
			        dispatchEventOnNode(this.a, 'change');
			        this.b.focus();
			      \}
			      blur(currentValue) \{
			        this.switchedFocus = true;
			        // currentValue should be 'giraffe' here because we should not have
			        // restored it on the target yet.
			        this.setState(\{value: currentValue\});
			      \}
			      render() \{
			        return (
			          <div>
			            <input
			              type="text"
			              ref=\{n => (this.a = n)\}
			              value=\{this.state.value\}
			              onChange=\{e => this.change(e.target.value)\}
			              onBlur=\{e => this.blur(e.target.value)\}
			            />
			            <input type="text" ref=\{n => (this.b = n)\} />
			          </div>
			        );
			      \}
			    \}
			
			    const container = document.createElement('div');
			    const instance = ReactDOM.render(<ControlledInputs />, container);
			
			    // We need it to be in the body to test native event dispatching.
			    document.body.appendChild(container);
			
			    // Focus the field so we can later blur it.
			    // Don't remove unless you've verified the fix in #8240 is still covered.
			    instance.a.focus();
			    setUntrackedValue.call(instance.a, 'giraffe');
			    // This must use the native event dispatching. If we simulate, we will
			    // bypass the lazy event attachment system so we won't actually test this.
			    dispatchEventOnNode(instance.a, 'change');
			    dispatchEventOnNode(instance.a, 'blur');
			
			    expect(instance.a.value).toBe('giraffe');
			    expect(instance.switchedFocus).toBe(true);
			
			    document.body.removeChild(container);
			  \});
			
			  it('should control values in reentrant events with different targets', () => \{
			    class ControlledInputs extends React.Component \{
			      state = \{value: 'lion'\};
			      a = null;
			      b = null;
			      change(newValue) \{
			        // This click will change the checkbox's value to false. Then it will
			        // invoke an inner change event. When we finally, flush, we need to
			        // reset the checkbox's value to true since that is its controlled
			        // value.
			        this.b.click();
			      \}
			      render() \{
			        return (
			          <div>
			            <input
			              type="text"
			              ref=\{n => (this.a = n)\}
			              value="lion"
			              onChange=\{e => this.change(e.target.value)\}
			            />
			            <input
			              type="checkbox"
			              ref=\{n => (this.b = n)\}
			              checked=\{true\}
			              onChange=\{() => \{\}\}
			            />
			          </div>
			        );
			      \}
			    \}
			
			    const container = document.createElement('div');
			    const instance = ReactDOM.render(<ControlledInputs />, container);
			
			    // We need it to be in the body to test native event dispatching.
			    document.body.appendChild(container);
			
			    setUntrackedValue.call(instance.a, 'giraffe');
			    // This must use the native event dispatching. If we simulate, we will
			    // bypass the lazy event attachment system so we won't actually test this.
			    dispatchEventOnNode(instance.a, 'input');
			
			    expect(instance.a.value).toBe('lion');
			    expect(instance.b.checked).toBe(true);
			
			    document.body.removeChild(container);
			  \});
			
			  describe('switching text inputs between numeric and string numbers', () => \{
			    it('does change the number 2 to "2.0" with no change handler', () => \{
			      let stub = <input type="text" value=\{2\} onChange=\{jest.fn()\} />;
			      stub = ReactTestUtils.renderIntoDocument(stub);
			      const node = ReactDOM.findDOMNode(stub);
			
			      node.value = '2.0';
			
			      ReactTestUtils.Simulate.change(stub);
			
			      expect(node.getAttribute('value')).toBe('2');
			      expect(node.value).toBe('2');
			    \});
			
			    it('does change the string "2" to "2.0" with no change handler', () => \{
			      let stub = <input type="text" value=\{'2'\} onChange=\{jest.fn()\} />;
			      stub = ReactTestUtils.renderIntoDocument(stub);
			      const node = ReactDOM.findDOMNode(stub);
			
			      node.value = '2.0';
			
			      ReactTestUtils.Simulate.change(stub);
			
			      expect(node.getAttribute('value')).toBe('2');
			      expect(node.value).toBe('2');
			    \});
			
			    it('changes the number 2 to "2.0" using a change handler', () => \{
			      class Stub extends React.Component \{
			        state = \{
			          value: 2,
			        \};
			        onChange = event => \{
			          this.setState(\{value: event.target.value\});
			        \};
			        render() \{
			          const \{value\} = this.state;
			
			          return <input type="text" value=\{value\} onChange=\{this.onChange\} />;
			        \}
			      \}
			
			      const stub = ReactTestUtils.renderIntoDocument(<Stub />);
			      const node = ReactDOM.findDOMNode(stub);
			
			      node.value = '2.0';
			
			      ReactTestUtils.Simulate.change(node);
			
			      expect(node.getAttribute('value')).toBe('2.0');
			      expect(node.value).toBe('2.0');
			    \});
			  \});
			
			  it('does change the string ".98" to "0.98" with no change handler', () => \{
			    class Stub extends React.Component \{
			      state = \{
			        value: '.98',
			      \};
			      render() \{
			        return <input type="number" value=\{this.state.value\} />;
			      \}
			    \}
			
			    let stub;
			    expect(() => \{
			      stub = ReactTestUtils.renderIntoDocument(<Stub />);
			    \}).toWarnDev(
			      'You provided a \`value\` prop to a form field ' +
			        'without an \`onChange\` handler.',
			    );
			    const node = ReactDOM.findDOMNode(stub);
			    stub.setState(\{value: '0.98'\});
			
			    expect(node.value).toEqual('0.98');
			  \});
			
			  it('performs a state change from "" to 0', () => \{
			    class Stub extends React.Component \{
			      state = \{
			        value: '',
			      \};
			      render() \{
			        return <input type="number" value=\{this.state.value\} readOnly=\{true\} />;
			      \}
			    \}
			
			    const stub = ReactTestUtils.renderIntoDocument(<Stub />);
			    const node = ReactDOM.findDOMNode(stub);
			    stub.setState(\{value: 0\});
			
			    expect(node.value).toEqual('0');
			  \});
			
			  it('updates the value on radio buttons from "" to 0', function() \{
			    const container = document.createElement('div');
			    ReactDOM.render(
			      <input type="radio" value="" onChange=\{function() \{\}\} />,
			      container,
			    );
			    ReactDOM.render(
			      <input type="radio" value=\{0\} onChange=\{function() \{\}\} />,
			      container,
			    );
			    expect(container.firstChild.value).toBe('0');
			    expect(container.firstChild.getAttribute('value')).toBe('0');
			  \});
			
			  it('updates the value on checkboxes from "" to 0', function() \{
			    const container = document.createElement('div');
			    ReactDOM.render(
			      <input type="checkbox" value="" onChange=\{function() \{\}\} />,
			      container,
			    );
			    ReactDOM.render(
			      <input type="checkbox" value=\{0\} onChange=\{function() \{\}\} />,
			      container,
			    );
			    expect(container.firstChild.value).toBe('0');
			    expect(container.firstChild.getAttribute('value')).toBe('0');
			  \});
			
			  it('distinguishes precision for extra zeroes in string number values', () => \{
			    class Stub extends React.Component \{
			      state = \{
			        value: '3.0000',
			      \};
			      render() \{
			        return <input type="number" value=\{this.state.value\} />;
			      \}
			    \}
			
			    let stub;
			
			    expect(() => \{
			      stub = ReactTestUtils.renderIntoDocument(<Stub />);
			    \}).toWarnDev(
			      'You provided a \`value\` prop to a form field ' +
			        'without an \`onChange\` handler.',
			    );
			    const node = ReactDOM.findDOMNode(stub);
			    stub.setState(\{value: '3'\});
			
			    expect(node.value).toEqual('3');
			  \});
			
			  it('should display \`defaultValue\` of number 0', () => \{
			    let stub = <input type="text" defaultValue=\{0\} />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.getAttribute('value')).toBe('0');
			    expect(node.value).toBe('0');
			  \});
			
			  it('only assigns defaultValue if it changes', () => \{
			    class Test extends React.Component \{
			      render() \{
			        return <input defaultValue="0" />;
			      \}
			    \}
			
			    const component = ReactTestUtils.renderIntoDocument(<Test />);
			    const node = ReactDOM.findDOMNode(component);
			
			    Object.defineProperty(node, 'defaultValue', \{
			      get() \{
			        return '0';
			      \},
			      set(value) \{
			        throw new Error(
			          \`defaultValue was assigned \$\{value\}, but it did not change!\`,
			        );
			      \},
			    \});
			
			    component.forceUpdate();
			  \});
			
			  it('should display "true" for \`defaultValue\` of \`true\`', () => \{
			    let stub = <input type="text" defaultValue=\{true\} />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.value).toBe('true');
			  \});
			
			  it('should display "false" for \`defaultValue\` of \`false\`', () => \{
			    let stub = <input type="text" defaultValue=\{false\} />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.value).toBe('false');
			  \});
			
			  it('should update \`defaultValue\` for uncontrolled input', () => \{
			    const container = document.createElement('div');
			
			    const node = ReactDOM.render(
			      <input type="text" defaultValue="0" />,
			      container,
			    );
			
			    expect(node.value).toBe('0');
			
			    ReactDOM.render(<input type="text" defaultValue="1" />, container);
			
			    expect(node.value).toBe('0');
			    expect(node.defaultValue).toBe('1');
			  \});
			
			  it('should update \`defaultValue\` for uncontrolled date/time input', () => \{
			    const container = document.createElement('div');
			
			    const node = ReactDOM.render(
			      <input type="date" defaultValue="1980-01-01" />,
			      container,
			    );
			
			    expect(node.value).toBe('1980-01-01');
			
			    ReactDOM.render(<input type="date" defaultValue="2000-01-01" />, container);
			
			    expect(node.value).toBe('1980-01-01');
			    expect(node.defaultValue).toBe('2000-01-01');
			
			    ReactDOM.render(<input type="date" />, container);
			  \});
			
			  it('should take \`defaultValue\` when changing to uncontrolled input', () => \{
			    const container = document.createElement('div');
			    const node = ReactDOM.render(
			      <input type="text" value="0" readOnly="true" />,
			      container,
			    );
			    expect(node.value).toBe('0');
			    expect(() =>
			      ReactDOM.render(<input type="text" defaultValue="1" />, container),
			    ).toWarnDev(
			      'A component is changing a controlled input of type ' +
			        'text to be uncontrolled.',
			    );
			    expect(node.value).toBe('0');
			  \});
			
			  it('should render defaultValue for SSR', () => \{
			    const markup = ReactDOMServer.renderToString(
			      <input type="text" defaultValue="1" />,
			    );
			    const div = document.createElement('div');
			    div.innerHTML = markup;
			    expect(div.firstChild.getAttribute('value')).toBe('1');
			    expect(div.firstChild.getAttribute('defaultValue')).toBe(null);
			  \});
			
			  it('should render value for SSR', () => \{
			    const element = <input type="text" value="1" onChange=\{() => \{\}\} />;
			    const markup = ReactDOMServer.renderToString(element);
			    const div = document.createElement('div');
			    div.innerHTML = markup;
			    expect(div.firstChild.getAttribute('value')).toBe('1');
			    expect(div.firstChild.getAttribute('defaultValue')).toBe(null);
			  \});
			
			  it('should render name attribute if it is supplied', () => \{
			    const container = document.createElement('div');
			    const node = ReactDOM.render(<input type="text" name="name" />, container);
			    expect(node.name).toBe('name');
			    expect(container.firstChild.getAttribute('name')).toBe('name');
			  \});
			
			  it('should render name attribute if it is supplied for SSR', () => \{
			    const element = <input type="text" name="name" />;
			    const markup = ReactDOMServer.renderToString(element);
			    const div = document.createElement('div');
			    div.innerHTML = markup;
			    expect(div.firstChild.getAttribute('name')).toBe('name');
			  \});
			
			  it('should not render name attribute if it is not supplied', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<input type="text" />, container);
			    expect(container.firstChild.getAttribute('name')).toBe(null);
			  \});
			
			  it('should not render name attribute if it is not supplied for SSR', () => \{
			    const element = <input type="text" />;
			    const markup = ReactDOMServer.renderToString(element);
			    const div = document.createElement('div');
			    div.innerHTML = markup;
			    expect(div.firstChild.getAttribute('name')).toBe(null);
			  \});
			
			  it('should display "foobar" for \`defaultValue\` of \`objToString\`', () => \{
			    const objToString = \{
			      toString: function() \{
			        return 'foobar';
			      \},
			    \};
			
			    let stub = <input type="text" defaultValue=\{objToString\} />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.value).toBe('foobar');
			  \});
			
			  it('should display \`value\` of number 0', () => \{
			    let stub = <input type="text" value=\{0\} />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.value).toBe('0');
			  \});
			
			  it('should allow setting \`value\` to \`true\`', () => \{
			    const container = document.createElement('div');
			    let stub = <input type="text" value="yolo" onChange=\{emptyFunction\} />;
			    const node = ReactDOM.render(stub, container);
			
			    expect(node.value).toBe('yolo');
			
			    stub = ReactDOM.render(
			      <input type="text" value=\{true\} onChange=\{emptyFunction\} />,
			      container,
			    );
			    expect(node.value).toEqual('true');
			  \});
			
			  it('should allow setting \`value\` to \`false\`', () => \{
			    const container = document.createElement('div');
			    let stub = <input type="text" value="yolo" onChange=\{emptyFunction\} />;
			    const node = ReactDOM.render(stub, container);
			
			    expect(node.value).toBe('yolo');
			
			    stub = ReactDOM.render(
			      <input type="text" value=\{false\} onChange=\{emptyFunction\} />,
			      container,
			    );
			    expect(node.value).toEqual('false');
			  \});
			
			  it('should allow setting \`value\` to \`objToString\`', () => \{
			    const container = document.createElement('div');
			    let stub = <input type="text" value="foo" onChange=\{emptyFunction\} />;
			    const node = ReactDOM.render(stub, container);
			
			    expect(node.value).toBe('foo');
			
			    const objToString = \{
			      toString: function() \{
			        return 'foobar';
			      \},
			    \};
			    stub = ReactDOM.render(
			      <input type="text" value=\{objToString\} onChange=\{emptyFunction\} />,
			      container,
			    );
			    expect(node.value).toEqual('foobar');
			  \});
			
			  it('should not incur unnecessary DOM mutations', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<input value="a" onChange=\{() => \{\}\} />, container);
			
			    const node = container.firstChild;
			    let nodeValue = 'a';
			    const nodeValueSetter = jest.genMockFn();
			    Object.defineProperty(node, 'value', \{
			      get: function() \{
			        return nodeValue;
			      \},
			      set: nodeValueSetter.mockImplementation(function(newValue) \{
			        nodeValue = newValue;
			      \}),
			    \});
			
			    ReactDOM.render(<input value="a" onChange=\{() => \{\}\} />, container);
			    expect(nodeValueSetter.mock.calls.length).toBe(0);
			
			    ReactDOM.render(<input value="b" onChange=\{() => \{\}\} />, container);
			    expect(nodeValueSetter.mock.calls.length).toBe(1);
			  \});
			
			  it('should not incur unnecessary DOM mutations for numeric type conversion', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<input value="0" onChange=\{() => \{\}\} />, container);
			
			    const node = container.firstChild;
			    let nodeValue = '0';
			    const nodeValueSetter = jest.genMockFn();
			    Object.defineProperty(node, 'value', \{
			      get: function() \{
			        return nodeValue;
			      \},
			      set: nodeValueSetter.mockImplementation(function(newValue) \{
			        nodeValue = newValue;
			      \}),
			    \});
			
			    ReactDOM.render(<input value=\{0\} onChange=\{() => \{\}\} />, container);
			    expect(nodeValueSetter.mock.calls.length).toBe(0);
			  \});
			
			  it('should not incur unnecessary DOM mutations for the boolean type conversion', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<input value="true" onChange=\{() => \{\}\} />, container);
			
			    const node = container.firstChild;
			    let nodeValue = 'true';
			    const nodeValueSetter = jest.genMockFn();
			    Object.defineProperty(node, 'value', \{
			      get: function() \{
			        return nodeValue;
			      \},
			      set: nodeValueSetter.mockImplementation(function(newValue) \{
			        nodeValue = newValue;
			      \}),
			    \});
			
			    ReactDOM.render(<input value=\{true\} onChange=\{() => \{\}\} />, container);
			    expect(nodeValueSetter.mock.calls.length).toBe(0);
			  \});
			
			  it('should properly control a value of number \`0\`', () => \{
			    let stub = <input type="text" value=\{0\} onChange=\{emptyFunction\} />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    node.value = 'giraffe';
			    ReactTestUtils.Simulate.change(node);
			    expect(node.value).toBe('0');
			  \});
			
			  it('should properly control 0.0 for a text input', () => \{
			    let stub = <input type="text" value=\{0\} onChange=\{emptyFunction\} />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    node.value = '0.0';
			    ReactTestUtils.Simulate.change(node, \{target: \{value: '0.0'\}\});
			    expect(node.value).toBe('0');
			  \});
			
			  it('should properly control 0.0 for a number input', () => \{
			    let stub = <input type="number" value=\{0\} onChange=\{emptyFunction\} />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    node.value = '0.0';
			    //hack
			    node.__events.vnode.props.value = "0.0"
			    ReactTestUtils.Simulate.change(node);
			    expect(node.value).toBe('0.0');
			    
			  \});
			
			  it('should properly transition from an empty value to 0', function() \{
			    const container = document.createElement('div');
			
			    ReactDOM.render(<input type="text" value="" />, container);
			    ReactDOM.render(<input type="text" value=\{0\} />, container);
			
			    const node = container.firstChild;
			
			    expect(node.value).toBe('0');
			    expect(node.defaultValue).toBe('0');
			  \});
			
			  it('should properly transition from 0 to an empty value', function() \{
			    const container = document.createElement('div');
			
			    ReactDOM.render(<input type="text" value=\{0\} />, container);
			    ReactDOM.render(<input type="text" value="" />, container);
			
			    const node = container.firstChild;
			
			    expect(node.value).toBe('');
			    expect(node.defaultValue).toBe('');
			  \});
			
			  it('should properly transition a text input from 0 to an empty 0.0', function() \{
			    const container = document.createElement('div');
			
			    ReactDOM.render(<input type="text" value=\{0\} />, container);
			    ReactDOM.render(<input type="text" value="0.0" />, container);
			
			    const node = container.firstChild;
			
			    expect(node.value).toBe('0.0');
			    expect(node.defaultValue).toBe('0.0');
			  \});
			
			  it('should properly transition a number input from "" to 0', function() \{
			    const container = document.createElement('div');
			
			    ReactDOM.render(<input type="number" value="" />, container);
			    ReactDOM.render(<input type="number" value=\{0\} />, container);
			
			    const node = container.firstChild;
			
			    expect(node.value).toBe('0');
			    expect(node.defaultValue).toBe('0');
			  \});
			
			  it('should properly transition a number input from "" to "0"', function() \{
			    const container = document.createElement('div');
			
			    ReactDOM.render(<input type="number" value="" />, container);
			    ReactDOM.render(<input type="number" value="0" />, container);
			
			    const node = container.firstChild;
			
			    expect(node.value).toBe('0');
			    expect(node.defaultValue).toBe('0');
			  \});
			
			  it('should have the correct target value', () => \{
			    let handled = false;
			    const handler = function(event) \{
			      expect(event.target.nodeName).toBe('INPUT');
			      handled = true;
			    \};
			    const stub = <input type="text" value=\{0\} onChange=\{handler\} />;
			    const container = document.createElement('div');
			    const node = ReactDOM.render(stub, container);
			
			    setUntrackedValue.call(node, 'giraffe');
			
			    const fakeNativeEvent = function() \{\};
			    fakeNativeEvent.target = node;
			    fakeNativeEvent.path = [node, container];
			    ReactTestUtils.simulateNativeEventOnNode('change', node, fakeNativeEvent);
			
			    expect(handled).toBe(true);
			  \});
			
			  it('should not set a value for submit buttons unnecessarily', () => \{
			    let stub = <input type="submit" />;
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    // The value shouldn't be '', or else the button will have no text; it
			    // should have the default "Submit" or "Submit Query" label. Most browsers
			    // report this as not having a \`value\` attribute at all; IE reports it as
			    // the actual label that the user sees.
			    expect(
			      !node.hasAttribute('value') || node.getAttribute('value').length > 0,
			    ).toBe(true);
			  \});
			
			  it('should control radio buttons', () => \{
			    class RadioGroup extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <input
			              ref="a"
			              type="radio"
			              name="fruit"
			              checked=\{true\}
			              onChange=\{emptyFunction\}
			            />
			            A
			            <input ref="b" type="radio" name="fruit" onChange=\{emptyFunction\} />
			            B
			            <form>
			              <input
			                ref="c"
			                type="radio"
			                name="fruit"
			                defaultChecked=\{true\}
			                onChange=\{emptyFunction\}
			              />
			            </form>
			          </div>
			        );
			      \}
			    \}
			
			    const stub = ReactTestUtils.renderIntoDocument(<RadioGroup />);
			    const aNode = stub.refs.a;
			    const bNode = stub.refs.b;
			    const cNode = stub.refs.c;
			
			    expect(aNode.checked).toBe(true);
			    expect(bNode.checked).toBe(false);
			    // c is in a separate form and shouldn't be affected at all here
			    expect(cNode.checked).toBe(true);
			
			    bNode.checked = true;
			    // This next line isn't necessary in a proper browser environment, but
			    // jsdom doesn't uncheck the others in a group (which makes this whole test
			    // a little less effective)
			    aNode.checked = false;
			    expect(cNode.checked).toBe(true);
			
			    // Now let's run the actual ReactDOMInput change event handler
			    ReactTestUtils.Simulate.change(bNode);
			
			    // The original state should have been restored
			    expect(aNode.checked).toBe(true);
			    expect(cNode.checked).toBe(true);
			  \});
			
			  it('should check the correct radio when the selected name moves', () => \{
			    class App extends React.Component \{
			      state = \{
			        updated: false,
			      \};
			      onClick = () => \{
			        this.setState(\{updated: true\});
			      \};
			      render() \{
			        const \{updated\} = this.state;
			        const radioName = updated ? 'secondName' : 'firstName';
			        return (
			          <div>
			            <button type="button" onClick=\{this.onClick\} />
			            <input
			              type="radio"
			              name=\{radioName\}
			              onChange=\{emptyFunction\}
			              checked=\{updated === true\}
			            />
			            <input
			              type="radio"
			              name=\{radioName\}
			              onChange=\{emptyFunction\}
			              checked=\{updated === false\}
			            />
			          </div>
			        );
			      \}
			    \}
			
			    const stub = ReactTestUtils.renderIntoDocument(<App />);
			    const buttonNode = ReactDOM.findDOMNode(stub).childNodes[0];
			    const firstRadioNode = ReactDOM.findDOMNode(stub).childNodes[1];
			    expect(firstRadioNode.checked).toBe(false);
			    ReactTestUtils.Simulate.click(buttonNode);
			    expect(firstRadioNode.checked).toBe(true);
			  \});
			
			  it('should control radio buttons if the tree updates during render', () => \{
			    const sharedParent = document.createElement('div');
			    const container1 = document.createElement('div');
			    const container2 = document.createElement('div');
			
			    sharedParent.appendChild(container1);
			
			    let aNode;
			    let bNode;
			    class ComponentA extends React.Component \{
			      componentDidMount() \{
			        ReactDOM.render(<ComponentB />, container2);
			      \}
			      render() \{
			        return (
			          <div>
			            <input
			              ref=\{n => (aNode = n)\}
			              type="radio"
			              name="fruit"
			              checked=\{true\}
			              onChange=\{emptyFunction\}
			            />
			            A
			          </div>
			        );
			      \}
			    \}
			
			    class ComponentB extends React.Component \{
			      state = \{changed: false\};
			      handleChange = () => \{
			        this.setState(\{
			          changed: true,
			        \});
			      \};
			      componentDidUpdate() \{
			        sharedParent.appendChild(container2);
			      \}
			      render() \{
			        return (
			          <div>
			            <input
			              ref=\{n => (bNode = n)\}
			              type="radio"
			              name="fruit"
			              checked=\{false\}
			              onChange=\{this.handleChange\}
			            />
			            B
			          </div>
			        );
			      \}
			    \}
			
			    ReactDOM.render(<ComponentA />, container1);
			
			    expect(aNode.checked).toBe(true);
			    expect(bNode.checked).toBe(false);
			
			    bNode.checked = true;
			    // This next line isn't necessary in a proper browser environment, but
			    // jsdom doesn't uncheck the others in a group (which makes this whole test
			    // a little less effective)
			    aNode.checked = false;
			
			    // Now let's run the actual ReactDOMInput change event handler
			    ReactTestUtils.Simulate.change(bNode);
			
			    // The original state should have been restored
			    expect(aNode.checked).toBe(true);
			    expect(bNode.checked).toBe(false);
			  \});
			
			  it('should warn with value and no onChange handler and readOnly specified', () => \{
			    ReactTestUtils.renderIntoDocument(
			      <input type="text" value="zoink" readOnly=\{true\} />,
			    );
			
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(
			        <input type="text" value="zoink" readOnly=\{false\} />,
			      ),
			    ).toWarnDev(
			      'Warning: Failed prop type: You provided a \`value\` prop to a form ' +
			        'field without an \`onChange\` handler. This will render a read-only ' +
			        'field. If the field should be mutable use \`defaultValue\`. ' +
			        'Otherwise, set either \`onChange\` or \`readOnly\`.\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should have a this value of undefined if bind is not used', () => \{
			    const unboundInputOnChange = function() \{
			      expect(this).toBe(undefined);
			    \};
			
			    let instance = <input type="text" onChange=\{unboundInputOnChange\} />;
			    instance = ReactTestUtils.renderIntoDocument(instance);
			
			    ReactTestUtils.Simulate.change(instance);
			  \});
			
			  it('should warn with checked and no onChange handler with readOnly specified', () => \{
			    ReactTestUtils.renderIntoDocument(
			      <input type="checkbox" checked="false" readOnly=\{true\} />,
			    );
			
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(
			        <input type="checkbox" checked="false" readOnly=\{false\} />,
			      ),
			    ).toWarnDev(
			      'Failed prop type: You provided a \`checked\` prop to a form field without an \`onChange\` handler. ' +
			        'This will render a read-only field. If the field should be mutable use \`defaultChecked\`. ' +
			        'Otherwise, set either \`onChange\` or \`readOnly\`.',
			    );
			  \});
			
			  it('should update defaultValue to empty string', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<input type="text" defaultValue=\{'foo'\} />, container);
			    ReactDOM.render(<input type="text" defaultValue=\{''\} />, container);
			    expect(container.firstChild.defaultValue).toBe('');
			  \});
			
			  it('should warn if value is null', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<input type="text" value=\{null\} />),
			    ).toWarnDev(
			      '\`value\` prop on \`input\` should not be null. ' +
			        'Consider using an empty string to clear the component or \`undefined\` ' +
			        'for uncontrolled components.',
			    );
			
			    ReactTestUtils.renderIntoDocument(<input type="text" value=\{null\} />);
			  \});
			
			  it('should warn if checked and defaultChecked props are specified', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(
			        <input
			          type="radio"
			          checked=\{true\}
			          defaultChecked=\{true\}
			          readOnly=\{true\}
			        />,
			      ),
			    ).toWarnDev(
			      'A component contains an input of type radio with both checked and defaultChecked props. ' +
			        'Input elements must be either controlled or uncontrolled ' +
			        '(specify either the checked prop, or the defaultChecked prop, but not ' +
			        'both). Decide between using a controlled or uncontrolled input ' +
			        'element and remove one of these props. More info: ' +
			        'https://fb.me/react-controlled-components',
			    );
			
			    ReactTestUtils.renderIntoDocument(
			      <input
			        type="radio"
			        checked=\{true\}
			        defaultChecked=\{true\}
			        readOnly=\{true\}
			      />,
			    );
			  \});
			
			  it('should warn if value and defaultValue props are specified', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(
			        <input type="text" value="foo" defaultValue="bar" readOnly=\{true\} />,
			      ),
			    ).toWarnDev(
			      'A component contains an input of type text with both value and defaultValue props. ' +
			        'Input elements must be either controlled or uncontrolled ' +
			        '(specify either the value prop, or the defaultValue prop, but not ' +
			        'both). Decide between using a controlled or uncontrolled input ' +
			        'element and remove one of these props. More info: ' +
			        'https://fb.me/react-controlled-components',
			    );
			
			    ReactTestUtils.renderIntoDocument(
			      <input type="text" value="foo" defaultValue="bar" readOnly=\{true\} />,
			    );
			  \});
			
			  it('should warn if controlled input switches to uncontrolled (value is undefined)', () => \{
			    const stub = (
			      <input type="text" value="controlled" onChange=\{emptyFunction\} />
			    );
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() => ReactDOM.render(<input type="text" />, container)).toWarnDev(
			      'Warning: A component is changing a controlled input of type text to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if controlled input switches to uncontrolled (value is null)', () => \{
			    const stub = (
			      <input type="text" value="controlled" onChange=\{emptyFunction\} />
			    );
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="text" value=\{null\} />, container),
			    ).toWarnDev([
			      '\`value\` prop on \`input\` should not be null. ' +
			        'Consider using an empty string to clear the component or \`undefined\` for uncontrolled components',
			      'Warning: A component is changing a controlled input of type text to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    ]);
			  \});
			
			  it('should warn if controlled input switches to uncontrolled with defaultValue', () => \{
			    const stub = (
			      <input type="text" value="controlled" onChange=\{emptyFunction\} />
			    );
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(
			        <input type="text" defaultValue="uncontrolled" />,
			        container,
			      ),
			    ).toWarnDev(
			      'Warning: A component is changing a controlled input of type text to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if uncontrolled input (value is undefined) switches to controlled', () => \{
			    const stub = <input type="text" />;
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="text" value="controlled" />, container),
			    ).toWarnDev(
			      'Warning: A component is changing an uncontrolled input of type text to be controlled. ' +
			        'Input elements should not switch from uncontrolled to controlled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if uncontrolled input (value is null) switches to controlled', () => \{
			    const stub = <input type="text" value=\{null\} />;
			    const container = document.createElement('div');
			    expect(() => ReactDOM.render(stub, container)).toWarnDev(
			      '\`value\` prop on \`input\` should not be null. ' +
			        'Consider using an empty string to clear the component or \`undefined\` for uncontrolled components.',
			    );
			    expect(() =>
			      ReactDOM.render(<input type="text" value="controlled" />, container),
			    ).toWarnDev(
			      'Warning: A component is changing an uncontrolled input of type text to be controlled. ' +
			        'Input elements should not switch from uncontrolled to controlled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if controlled checkbox switches to uncontrolled (checked is undefined)', () => \{
			    const stub = (
			      <input type="checkbox" checked=\{true\} onChange=\{emptyFunction\} />
			    );
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="checkbox" />, container),
			    ).toWarnDev(
			      'Warning: A component is changing a controlled input of type checkbox to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if controlled checkbox switches to uncontrolled (checked is null)', () => \{
			    const stub = (
			      <input type="checkbox" checked=\{true\} onChange=\{emptyFunction\} />
			    );
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="checkbox" checked=\{null\} />, container),
			    ).toWarnDev(
			      'Warning: A component is changing a controlled input of type checkbox to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if controlled checkbox switches to uncontrolled with defaultChecked', () => \{
			    const stub = (
			      <input type="checkbox" checked=\{true\} onChange=\{emptyFunction\} />
			    );
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(
			        <input type="checkbox" defaultChecked=\{true\} />,
			        container,
			      ),
			    ).toWarnDev(
			      'Warning: A component is changing a controlled input of type checkbox to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if uncontrolled checkbox (checked is undefined) switches to controlled', () => \{
			    const stub = <input type="checkbox" />;
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="checkbox" checked=\{true\} />, container),
			    ).toWarnDev(
			      'Warning: A component is changing an uncontrolled input of type checkbox to be controlled. ' +
			        'Input elements should not switch from uncontrolled to controlled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if uncontrolled checkbox (checked is null) switches to controlled', () => \{
			    const stub = <input type="checkbox" checked=\{null\} />;
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="checkbox" checked=\{true\} />, container),
			    ).toWarnDev(
			      'Warning: A component is changing an uncontrolled input of type checkbox to be controlled. ' +
			        'Input elements should not switch from uncontrolled to controlled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if controlled radio switches to uncontrolled (checked is undefined)', () => \{
			    const stub = <input type="radio" checked=\{true\} onChange=\{emptyFunction\} />;
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() => ReactDOM.render(<input type="radio" />, container)).toWarnDev(
			      'Warning: A component is changing a controlled input of type radio to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if controlled radio switches to uncontrolled (checked is null)', () => \{
			    const stub = <input type="radio" checked=\{true\} onChange=\{emptyFunction\} />;
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="radio" checked=\{null\} />, container),
			    ).toWarnDev(
			      'Warning: A component is changing a controlled input of type radio to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if controlled radio switches to uncontrolled with defaultChecked', () => \{
			    const stub = <input type="radio" checked=\{true\} onChange=\{emptyFunction\} />;
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="radio" defaultChecked=\{true\} />, container),
			    ).toWarnDev(
			      'Warning: A component is changing a controlled input of type radio to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if uncontrolled radio (checked is undefined) switches to controlled', () => \{
			    const stub = <input type="radio" />;
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="radio" checked=\{true\} />, container),
			    ).toWarnDev(
			      'Warning: A component is changing an uncontrolled input of type radio to be controlled. ' +
			        'Input elements should not switch from uncontrolled to controlled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should warn if uncontrolled radio (checked is null) switches to controlled', () => \{
			    const stub = <input type="radio" checked=\{null\} />;
			    const container = document.createElement('div');
			    ReactDOM.render(stub, container);
			    expect(() =>
			      ReactDOM.render(<input type="radio" checked=\{true\} />, container),
			    ).toWarnDev(
			      'Warning: A component is changing an uncontrolled input of type radio to be controlled. ' +
			        'Input elements should not switch from uncontrolled to controlled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('should not warn if radio value changes but never becomes controlled', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<input type="radio" value="value" />, container);
			    ReactDOM.render(<input type="radio" />, container);
			    ReactDOM.render(
			      <input type="radio" value="value" defaultChecked=\{true\} />,
			      container,
			    );
			    ReactDOM.render(
			      <input type="radio" value="value" onChange=\{() => null\} />,
			      container,
			    );
			    ReactDOM.render(<input type="radio" />, container);
			  \});
			
			  it('should not warn if radio value changes but never becomes uncontrolled', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(
			      <input type="radio" checked=\{false\} onChange=\{() => null\} />,
			      container,
			    );
			    ReactDOM.render(
			      <input
			        type="radio"
			        value="value"
			        defaultChecked=\{true\}
			        checked=\{false\}
			        onChange=\{() => null\}
			      />,
			      container,
			    );
			  \});
			
			  it('should warn if radio checked false changes to become uncontrolled', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(
			      <input
			        type="radio"
			        value="value"
			        checked=\{false\}
			        onChange=\{() => null\}
			      />,
			      container,
			    );
			    expect(() =>
			      ReactDOM.render(<input type="radio" value="value" />, container),
			    ).toWarnDev(
			      'Warning: A component is changing a controlled input of type radio to be uncontrolled. ' +
			        'Input elements should not switch from controlled to uncontrolled (or vice versa). ' +
			        'Decide between using a controlled or uncontrolled input ' +
			        'element for the lifetime of the component. More info: https://fb.me/react-controlled-components\\n' +
			        '    in input (at **)',
			    );
			  \});
			
			  it('sets type, step, min, max before value always', () => \{
			    return
			    const log = [];
			    const originalCreateElement = document.createElement;
			    spyOnDevAndProd(document, 'createElement').and.callFake(function(type) \{
			      const el = originalCreateElement.apply(this, arguments);
			      let value = '';
			
			      if (type === 'input') \{
			        Object.defineProperty(el, 'value', \{
			          get: function() \{
			            return value;
			          \},
			          set: function(val) \{
			            value = '' + val;
			            log.push('set property value');
			          \},
			        \});
			        spyOnDevAndProd(el, 'setAttribute').and.callFake(function(name) \{
			          log.push('set attribute ' + name);
			        \});
			      \}
			      return el;
			    \});
			
			    ReactTestUtils.renderIntoDocument(
			      <input
			        value="0"
			        onChange=\{() => \{\}\}
			        type="range"
			        min="0"
			        max="100"
			        step="1"
			      />,
			    );
			    expect(log).toEqual([
			      'set attribute type',
			      'set attribute min',
			      'set attribute max',
			      'set attribute step',
			      'set property value',
			      'set attribute value',
			      'set attribute checked',
			      'set attribute checked',
			    ]);
			  \});
			
			  it('sets value properly with type coming later in props', () => \{
			    const input = ReactTestUtils.renderIntoDocument(
			      <input value="hi" type="radio" />,
			    );
			    expect(input.value).toBe('hi');
			  \});
			
			  it('does not raise a validation warning when it switches types', () => \{
			    class Input extends React.Component \{
			      state = \{type: 'number', value: 1000\};
			
			      render() \{
			        const \{value, type\} = this.state;
			        return <input onChange=\{() => \{\}\} type=\{type\} value=\{value\} />;
			      \}
			    \}
			
			    const input = ReactTestUtils.renderIntoDocument(<Input />);
			    const node = ReactDOM.findDOMNode(input);
			
			    // If the value is set before the type, a validation warning will raise and
			    // the value will not be assigned.
			    input.setState(\{type: 'text', value: 'Test'\});
			    expect(node.value).toEqual('Test');
			  \});
			
			  it('resets value of date/time input to fix bugs in iOS Safari', () => \{
			    function strify(x) \{
			      return JSON.stringify(x, null, 2);
			    \}
			   
			
			    var node = ReactTestUtils.renderIntoDocument(
			      <input type="date" defaultValue="1980-01-01" />,
			    );
			    expect(node.type).toBe("date")
			    expect(node.value).toBe("1980-01-01")
			    expect(node.getAttribute("value")).toBe("1980-01-01")
			   
			  \});
			
			  describe('assigning the value attribute on controlled inputs', function() \{
			    function getTestInput() \{
			      return class extends React.Component \{
			        state = \{
			          value: this.props.value == null ? '' : this.props.value,
			        \};
			        onChange = event => \{
			          this.setState(\{value: event.target.value\});
			        \};
			        render() \{
			          const type = this.props.type;
			          const value = this.state.value;
			
			          return <input type=\{type\} value=\{value\} onChange=\{this.onChange\} />;
			        \}
			      \};
			    \}
			
			    it('always sets the attribute when values change on text inputs', function() \{
			      const Input = getTestInput();
			      const stub = ReactTestUtils.renderIntoDocument(<Input type="text" />);
			      const node = ReactDOM.findDOMNode(stub);
			
			      ReactTestUtils.Simulate.change(node, \{target: \{value: '2'\}\});
			
			      expect(node.getAttribute('value')).toBe('2');
			    \});
			
			    it('does not set the value attribute on number inputs if focused', () => \{
			      //先忽略
			      return
			      const Input = getTestInput();
			      const stub = ReactTestUtils.renderIntoDocument(
			        <Input type="number" value="1" />,
			      );
			      const node = ReactDOM.findDOMNode(stub);
			
			      node.focus();
			
			      ReactTestUtils.Simulate.change(node, \{target: \{value: '2'\}\});
			
			      expect(node.getAttribute('value')).toBe('1');
			    \});
			
			    it('sets the value attribute on number inputs on blur', () => \{
			      const Input = getTestInput();
			      const stub = ReactTestUtils.renderIntoDocument(
			        <Input type="number" value="1" />,
			      );
			      const node = ReactDOM.findDOMNode(stub);
			
			      ReactTestUtils.Simulate.change(node, \{target: \{value: '2'\}\});
			      ReactTestUtils.SimulateNative.blur(node);
			
			      expect(node.getAttribute('value')).toBe('2');
			    \});
			
			    it('an uncontrolled number input will not update the value attribute on blur', () => \{
			      const stub = ReactTestUtils.renderIntoDocument(
			        <input type="number" defaultValue="1" />,
			      );
			      const node = ReactDOM.findDOMNode(stub);
			
			      node.value = 4;
			
			      ReactTestUtils.SimulateNative.blur(node);
			
			      expect(node.getAttribute('value')).toBe('1');
			    \});
			
			    it('an uncontrolled text input will not update the value attribute on blur', () => \{
			      const stub = ReactTestUtils.renderIntoDocument(
			        <input type="text" defaultValue="1" />,
			      );
			      const node = ReactDOM.findDOMNode(stub);
			
			      node.value = 4;
			
			      ReactTestUtils.SimulateNative.blur(node);
			
			      expect(node.getAttribute('value')).toBe('1');
			    \});
			  \});
			
			  describe('setting a controlled input to undefined', () => \{
			    let input;
			
			    function renderInputWithStringThenWithUndefined() \{
			      class Input extends React.Component \{
			        state = \{value: 'first'\};
			        render() \{
			          return (
			            <input
			              onChange=\{e => this.setState(\{value: e.target.value\})\}
			              value=\{this.state.value\}
			            />
			          );
			        \}
			      \}
			
			      const stub = ReactTestUtils.renderIntoDocument(<Input />);
			      input = ReactDOM.findDOMNode(stub);
			      ReactTestUtils.Simulate.change(input, \{target: \{value: 'latest'\}\});
			     // ReactTestUtils.Simulate.change(input, \{target: \{value: undefined\}\});
			    \}
			
			    it('reverts the value attribute to the initial value', () => \{
			      return
			      renderInputWithStringThenWithUndefined()
			      expect(input.getAttribute('value')).toBe('latest');
			    \});
			
			    it('preserves the value property', () => \{
			      renderInputWithStringThenWithUndefined()
			      expect(input.value).toBe('latest');
			    \});
			  \});
			
			  describe('setting a controlled input to null', () => \{
			    let input;
			
			    function renderInputWithStringThenWithNull() \{
			      class Input extends React.Component \{
			        state = \{value: 'first'\};
			        render() \{
			          return (
			            <input
			              onChange=\{e => this.setState(\{value: e.target.value\})\}
			              value=\{this.state.value\}
			            />
			          );
			        \}
			      \}
			
			      const stub = ReactTestUtils.renderIntoDocument(<Input />);
			      input = ReactDOM.findDOMNode(stub);
			      ReactTestUtils.Simulate.change(input, \{target: \{value: 'latest'\}\});
			     // ReactTestUtils.Simulate.change(input, \{target: \{value: null\}\});
			    \}
			
			    it('reverts the value attribute to the initial value', () => \{
			     renderInputWithStringThenWithNull()
			      expect(input.getAttribute('value')).toBe('latest');
			    \});
			
			    it('preserves the value property', () => \{
			      renderInputWithStringThenWithNull()
			      expect(input.value).toBe('latest');
			    \});
			  \});
			
			  describe('When given a Symbol value', function() \{
			    it('treats initial Symbol value as an empty string', function() \{
			      const container = document.createElement('div');
			      expect(() =>
			        ReactDOM.render(
			          <input value=\{Symbol('foobar')\} onChange=\{() => \{\}\} />,
			          container,
			        ),
			      ).toWarnDev('Invalid value for prop \`value\`');
			      const node = container.firstChild;
			
			      expect(node.value).toBe('');
			      expect(node.getAttribute('value')).toBe('');
			    \});
			
			    it('treats updated Symbol value as an empty string', function() \{
			      const container = document.createElement('div');
			      ReactDOM.render(<input value="foo" onChange=\{() => \{\}\} />, container);
			      expect(() =>
			        ReactDOM.render(
			          <input value=\{Symbol('foobar')\} onChange=\{() => \{\}\} />,
			          container,
			        ),
			      ).toWarnDev('Invalid value for prop \`value\`');
			      const node = container.firstChild;
			
			      expect(node.value).toBe('');
			      expect(node.getAttribute('value')).toBe('');
			    \});
			
			    it('treats initial Symbol defaultValue as an empty string', function() \{
			      const container = document.createElement('div');
			      ReactDOM.render(<input defaultValue=\{Symbol('foobar')\} />, container);
			      const node = container.firstChild;
			
			      expect(node.value).toBe('');
			      expect(node.getAttribute('value')).toBe('');
			      // TODO: we should warn here.
			    \});
			
			    it('treats updated Symbol defaultValue as an empty string', function() \{
			      const container = document.createElement('div');
			      ReactDOM.render(<input defaultValue="foo" />, container);
			      ReactDOM.render(<input defaultValue=\{Symbol('foobar')\} />, container);
			      const node = container.firstChild;
			
			      expect(node.value).toBe('foo');
			      expect(node.getAttribute('value')).toBe('');
			      // TODO: we should warn here.
			    \});
			  \});
			
			  describe('When given a function value', function() \{
			    it('treats initial function value as an empty string', function() \{
			      const container = document.createElement('div');
			    
			        ReactDOM.render(
			          <input value=\{() => \{\}\} onChange=\{() => \{\}\} />,
			          container,
			        )
			    
			      const node = container.firstChild;
			
			      expect(node.value).toBe('');
			      expect(node.getAttribute('value')).toBe('');
			    \});
			
			    it('treats updated function value as an empty string', function() \{
			      const container = document.createElement('div');
			      ReactDOM.render(<input value="foo" onChange=\{() => \{\}\} />, container);
			      expect(() =>
			        ReactDOM.render(
			          <input value=\{() => \{\}\} onChange=\{() => \{\}\} />,
			          container,
			        ),
			      ).toWarnDev('Invalid value for prop \`value\`');
			      const node = container.firstChild;
			
			      expect(node.value).toBe('');
			      expect(node.getAttribute('value')).toBe('');
			    \});
			
			    it('treats initial function defaultValue as an empty string', function() \{
			      const container = document.createElement('div');
			      ReactDOM.render(<input defaultValue=\{() => \{\}\} />, container);
			      const node = container.firstChild;
			
			      expect(node.value).toBe('');
			      expect(node.getAttribute('value')).toBe('');
			      // TODO: we should warn here.
			    \});
			
			    it('treats updated function defaultValue as an empty string', function() \{
			      const container = document.createElement('div');
			      ReactDOM.render(<input defaultValue="foo" />, container);
			      ReactDOM.render(<input defaultValue=\{() => \{\}\} />, container);
			      const node = container.firstChild;
			
			      expect(node.value).toBe('foo');
			      expect(node.getAttribute('value')).toBe('');
			      // TODO: we should warn here.
			    \});
			  \});
			
			  describe('checked inputs without a value property', function() \{
			    // In absence of a value, radio and checkboxes report a value of "on".
			    // Between 16 and 16.2, we assigned a node's value to it's current
			    // value in order to "dettach" it from defaultValue. This had the unfortunate
			    // side-effect of assigning value="on" to radio and checkboxes
			    it('does not add "on" in absence of value on a checkbox', function() \{
			      const container = document.createElement('div');
			      ReactDOM.render(
			        <input type="checkbox" defaultChecked=\{true\} />,
			        container,
			      );
			      const node = container.firstChild;
			
			      expect(node.value).toBe('on');
			      expect(node.hasAttribute('value')).toBe(false);
			    \});
			
			    it('does not add "on" in absence of value on a radio', function() \{
			      const container = document.createElement('div');
			      ReactDOM.render(<input type="radio" defaultChecked=\{true\} />, container);
			      const node = container.firstChild;
			
			      expect(node.value).toBe('on');
			      expect(node.hasAttribute('value')).toBe(false);
			      ReactDOM.unmountComponentAtNode(container)
			    \});
			
			
			    it('只执行一次', function() \{
			      const container = document.createElement('div');
			      document.body.appendChild(container)
			      var logIndex = 0;
			        function refFn(e) \{
			            logIndex++;
			        \}
			
			        var dom = ReactDOM.render(<input type="checkbox" onChange=\{refFn\} />, container);
			        dom.click()
			        expect(logIndex).toBe(1)
			        ReactDOM.unmountComponentAtNode(container)
			        document.body.removeChild(container)
			    \});
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMInput-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(94)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMOption-test.js', () => {
        const sourceCode = `
			
			describe('ReactDOMOption', () => \{
			    let React;
			    let ReactDOM;
			    let ReactTestUtils;
			  
			    beforeEach(() => \{
			      React = require('react');
			      ReactDOM = require('react-dom');
			      ReactTestUtils = require('test-utils');
			    \});
			  
			    it('should flatten children to a string', () => \{
			      let stub = (
			        <option>
			          \{1\} \{'foo'\}
			        </option>
			      );
			      stub = ReactTestUtils.renderIntoDocument(stub);
			      const node = ReactDOM.findDOMNode(stub);
			  
			      expect(node.innerHTML).toBe('1 foo');
			    \});
			  
			    it('should ignore and warn invalid children types', () => \{
			      const el = (
			        <option>
			          \{1\} <div /> \{2\}
			        </option>
			      );
			      let node;
			      expect(() => \{
			        node = ReactTestUtils.renderIntoDocument(el);
			      \}).toWarnDev(
			        '<div> cannot appear as a child of <option>.\\n' +
			          '    in div (at **)\\n' +
			          '    in option (at **)',
			      );
			      expect(node.innerHTML).toBe('1  2');
			      ReactTestUtils.renderIntoDocument(el);
			    \});
			  
			    it('should ignore null/undefined/false children without warning', () => \{
			      let stub = (
			        <option>
			          \{1\} \{false\}
			          \{true\}
			          \{null\}
			          \{undefined\} \{2\}
			        </option>
			      );
			      stub = ReactTestUtils.renderIntoDocument(stub);
			  
			      const node = ReactDOM.findDOMNode(stub);
			      expect(node.innerHTML).toBe('1  2');
			    \});
			  
			    it('should be able to use dangerouslySetInnerHTML on option', () => \{
			      let stub = <option dangerouslySetInnerHTML=\{\{__html: 'foobar'\}\} />;
			      stub = ReactTestUtils.renderIntoDocument(stub);
			  
			      const node = ReactDOM.findDOMNode(stub);
			      expect(node.innerHTML).toBe('foobar');
			    \});
			  
			    it('should set attribute for empty value', () => \{
			      const container = document.createElement('div');
			      const option = ReactDOM.render(<option value="" />, container);
			      expect(option.hasAttribute('value')).toBe(true);
			      expect(option.getAttribute('value')).toBe('');
			  
			      ReactDOM.render(<option value="lava" />, container);
			      expect(option.hasAttribute('value')).toBe(true);
			      expect(option.getAttribute('value')).toBe('lava');
			    \});
			  
			    it('should allow ignoring \`value\` on option', () => \{
			      const a = 'a';
			      let stub = (
			        <select value="giraffe" onChange=\{() => \{\}\}>
			          <option>monkey</option>
			          <option>gir\{a\}ffe</option>
			          <option>gorill\{a\}</option>
			        </select>
			      );
			      const options = stub.props.children;
			      const container = document.createElement('div');
			      stub = ReactDOM.render(stub, container);
			      const node = ReactDOM.findDOMNode(stub);
			  
			      expect(node.selectedIndex).toBe(1);
			  
			      ReactDOM.render(<select value="gorilla">\{options\}</select>, container);
			      expect(node.selectedIndex).toEqual(2);
			    \});
			  \});
			  `

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMOption-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMSelect-test.js', () => {
        const sourceCode = `
			/**
			 * Copyright (c) 2013-present, Facebook, Inc.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 *
			 * @emails react-core
			 */
			
			"use strict";
			
			describe("ReactDOMSelect", () => \{
			  let React;
			  let ReactDOM;
			  let ReactDOMServer;
			  let ReactTestUtils;
			
			  const noop = function() \{\};
			
			  beforeEach(() => \{
			    jest.resetModules();
			    React = require("react");
			    ReactDOM = require("react-dom");
			    ReactDOMServer = require("react-server-renderer");
			    ReactTestUtils = require("test-utils");
			  \});
			
			  it("should allow setting \`defaultValue\`", () => \{
			    let stub = (
			      <select defaultValue="giraffe">
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			    expect(node.value).toBe("giraffe");
			    // Changing \`defaultValue\` should do nothing.
			    ReactDOM.render(
			      <select defaultValue="gorilla">\{options\}</select>,
			      container
			    );
			    expect(node.value).toEqual("giraffe");
			  \});
			
			  it("should not throw with \`defaultValue\` and without children", () => \{
			    const stub = <select defaultValue="dummy" />;
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(stub);
			    \}).not.toThrow();
			  \});
			
			  it("should not control when using \`defaultValue\`", () => \{
			    const el = (
			      <select defaultValue="giraffe">
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const container = document.createElement("div");
			    const stub = ReactDOM.render(el, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.value).toBe("giraffe");
			
			    node.value = "monkey";
			    ReactDOM.render(el, container);
			    // Uncontrolled selects shouldn't change the value after first mounting
			    expect(node.value).toEqual("monkey");
			  \});
			
			  
			  it("should allow setting \`defaultValue\` with multiple", () => \{
			    let stub = (
			      <select multiple=\{true\} defaultValue=\{["giraffe", "gorilla"]\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(true); // gorilla
			
			    // Changing \`defaultValue\` should do nothing.
			    ReactDOM.render(
			      <select multiple=\{true\} defaultValue=\{["monkey"]\}>
			        \{options\}
			      </select>,
			      container
			    );
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(true); // gorilla
			  \});
			
			  it("should allow setting \`value\`", () => \{
			    let stub = (
			      <select value="giraffe" onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.value).toBe("giraffe");
			
			    // Changing the \`value\` prop should change the selected option.
			    ReactDOM.render(
			      <select value="gorilla" onChange=\{noop\}>
			        \{options\}
			      </select>,
			      container
			    );
			    expect(node.value).toEqual("gorilla");
			  \});
			
			  it("should default to the first non-disabled option", () => \{
			    let stub = (
			      <select defaultValue="">
			        <option disabled=\{true\}>Disabled</option>
			        <option disabled=\{true\}>Still Disabled</option>
			        <option>0</option>
			        <option disabled=\{true\}>Also Disabled</option>
			      </select>
			    );
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			    expect(node.options[0].selected).toBe(false);
			    expect(node.options[2].selected).toBe(true);
			  \});
			
			  it("should allow setting \`value\` to __proto__", () => \{
			    let stub = (
			      <select value="__proto__" onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="__proto__">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.value).toBe("__proto__");
			
			    // Changing the \`value\` prop should change the selected option.
			    ReactDOM.render(
			      <select value="gorilla" onChange=\{noop\}>
			        \{options\}
			      </select>,
			      container
			    );
			    expect(node.value).toEqual("gorilla");
			  \});
			
			  it("should not throw with \`value\` and without children", () => \{
			    const stub = <select value="dummy" onChange=\{noop\} />;
			
			    expect(() => \{
			      ReactTestUtils.renderIntoDocument(stub);
			    \}).not.toThrow();
			  \});
			
			  it("should allow setting \`value\` with multiple", () => \{
			    let stub = (
			      <select multiple=\{true\} value=\{["giraffe", "gorilla"]\} onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(true); // gorilla
			
			    // Changing the \`value\` prop should change the selected options.
			    ReactDOM.render(
			      <select multiple=\{true\} value=\{["monkey"]\} onChange=\{noop\}>
			        \{options\}
			      </select>,
			      container
			    );
			
			    expect(node.options[0].selected).toBe(true); // monkey
			    expect(node.options[1].selected).toBe(false); // giraffe
			    expect(node.options[2].selected).toBe(false); // gorilla
			  \});
			
			  it("should allow setting \`value\` to __proto__ with multiple", () => \{
			    let stub = (
			      <select multiple=\{true\} value=\{["__proto__", "gorilla"]\} onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="__proto__">A __proto__!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // __proto__
			    expect(node.options[2].selected).toBe(true); // gorilla
			
			    // Changing the \`value\` prop should change the selected options.
			    ReactDOM.render(
			      <select multiple=\{true\} value=\{["monkey"]\} onChange=\{noop\}>
			        \{options\}
			      </select>,
			      container
			    );
			
			    expect(node.options[0].selected).toBe(true); // monkey
			    expect(node.options[1].selected).toBe(false); // __proto__
			    expect(node.options[2].selected).toBe(false); // gorilla
			  \});
			
			  it("should not select other options automatically", () => \{
			    let stub = (
			      <select multiple=\{true\} value=\{["12"]\} onChange=\{noop\}>
			        <option value="1">one</option>
			        <option value="2">two</option>
			        <option value="12">twelve</option>
			      </select>
			    );
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(false); // one
			    expect(node.options[1].selected).toBe(false); // two
			    expect(node.options[2].selected).toBe(true); // twelve
			  \});
			
			  it("should reset child options selected when they are changed and \`value\` is set", () => \{
			    let stub = <select multiple=\{true\} value=\{["a", "b"]\} onChange=\{noop\} />;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			
			    ReactDOM.render(
			      <select multiple=\{true\} value=\{["a", "b"]\} onChange=\{noop\}>
			        <option value="a">a</option>
			        <option value="b">b</option>
			        <option value="c">c</option>
			      </select>,
			      container
			    );
			
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(true); // a
			    expect(node.options[1].selected).toBe(true); // b
			    expect(node.options[2].selected).toBe(false); // c
			  \});
			
			  it("should allow setting \`value\` with \`objectToString\`", () => \{
			    const objectToString = \{
			      animal: "giraffe",
			      toString: function() \{
			        return this.animal;
			      \}
			    \};
			
			    const el = (
			      <select multiple=\{true\} value=\{[objectToString]\} onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const container = document.createElement("div");
			    const stub = ReactDOM.render(el, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(false); // gorilla
			
			    // Changing the \`value\` prop should change the selected options.
			    objectToString.animal = "monkey";
			
			    const el2 = (
			      <select multiple=\{true\} value=\{[objectToString]\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    ReactDOM.render(el2, container);
			
			    expect(node.options[0].selected).toBe(true); // monkey
			    expect(node.options[1].selected).toBe(false); // giraffe
			    expect(node.options[2].selected).toBe(false); // gorilla
			  \});
			
			  it("should allow switching to multiple", () => \{
			    let stub = (
			      <select defaultValue="giraffe">
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(false); // gorilla
			
			    // When making it multiple, giraffe and gorilla should be selected
			    ReactDOM.render(
			      <select multiple=\{true\} defaultValue=\{["giraffe", "gorilla"]\}>
			        \{options\}
			      </select>,
			      container
			    );
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(true); // gorilla
			  \});
			
			  it("should allow switching from multiple", () => \{
			    let stub = (
			      <select multiple=\{true\} defaultValue=\{["giraffe", "gorilla"]\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(true); // gorilla
			
			    // When removing multiple, defaultValue is applied again, being omitted
			    // means that "monkey" will be selected
			    ReactDOM.render(
			      <select defaultValue="gorilla">\{options\}</select>,
			      container
			    );
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(false); // giraffe
			    expect(node.options[2].selected).toBe(true); // gorilla
			  \});
			
			  it("should remember value when switching to uncontrolled", () => \{
			    let stub = (
			      <select value=\{"giraffe"\} onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(false); // gorilla
			
			    ReactDOM.render(<select>\{options\}</select>, container);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(false); // gorilla
			  \});
			
			  it("should remember updated value when switching to uncontrolled", () => \{
			    let stub = (
			      <select value=\{"giraffe"\} onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const options = stub.props.children;
			    const container = document.createElement("div");
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    ReactDOM.render(
			      <select value="gorilla" onChange=\{noop\}>
			        \{options\}
			      </select>,
			      container
			    );
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(false); // giraffe
			    expect(node.options[2].selected).toBe(true); // gorilla
			
			    ReactDOM.render(<select>\{options\}</select>, container);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(false); // giraffe
			    expect(node.options[2].selected).toBe(true); // gorilla
			  \});
			
			  it("should support server-side rendering", () => \{
			    const stub = (
			      <select value="giraffe" onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const markup = ReactDOMServer.renderToString(stub);
			    expect(markup).toContain('<option selected="" value="giraffe"');
			    expect(markup).not.toContain('<option selected="" value="monkey"');
			    expect(markup).not.toContain('<option selected="" value="gorilla"');
			  \});
			
			  it("should support server-side rendering with defaultValue", () => \{
			    const stub = (
			      <select defaultValue="giraffe">
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const markup = ReactDOMServer.renderToString(stub);
			    expect(markup).toContain('<option selected="" value="giraffe"');
			    expect(markup).not.toContain('<option selected="" value="monkey"');
			    expect(markup).not.toContain('<option selected="" value="gorilla"');
			  \});
			
			  it("should support server-side rendering with multiple", () => \{
			    const stub = (
			      <select multiple=\{true\} value=\{["giraffe", "gorilla"]\} onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    const markup = ReactDOMServer.renderToString(stub);
			    expect(markup).toContain('<option selected="" value="giraffe"');
			    expect(markup).toContain('<option selected="" value="gorilla"');
			    expect(markup).not.toContain('<option selected="" value="monkey"');
			  \});
			
			  it("should not control defaultValue if readding options", () => \{
			    const container = document.createElement("div");
			
			    const select = ReactDOM.render(
			      <select multiple=\{true\} defaultValue=\{["giraffe"]\}>
			        <option key="monkey" value="monkey">
			          A monkey!
			        </option>
			        <option key="giraffe" value="giraffe">
			          A giraffe!
			        </option>
			        <option key="gorilla" value="gorilla">
			          A gorilla!
			        </option>
			      </select>,
			      container
			    );
			    const node = ReactDOM.findDOMNode(select);
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(true); // giraffe
			    expect(node.options[2].selected).toBe(false); // gorilla
			
			    ReactDOM.render(
			      <select multiple=\{true\} defaultValue=\{["giraffe"]\}>
			        <option key="monkey" value="monkey">
			          A monkey!
			        </option>
			        <option key="gorilla" value="gorilla">
			          A gorilla!
			        </option>
			      </select>,
			      container
			    );
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(false); // gorilla
			
			    ReactDOM.render(
			      <select multiple=\{true\} defaultValue=\{["giraffe"]\}>
			        <option key="monkey" value="monkey">
			          A monkey!
			        </option>
			        <option key="giraffe" value="giraffe">
			          A giraffe!
			        </option>
			        <option key="gorilla" value="gorilla">
			          A gorilla!
			        </option>
			      </select>,
			      container
			    );
			
			    expect(node.options[0].selected).toBe(false); // monkey
			    expect(node.options[1].selected).toBe(false); // giraffe
			    expect(node.options[2].selected).toBe(false); // gorilla
			  \});
			
			  it("should warn if value is null", () => \{
			    ReactTestUtils.renderIntoDocument(
			      <select value=\{null\}>
			        <option value="test" />
			      </select>
			    ),
			      ReactTestUtils.renderIntoDocument(
			        <select value=\{null\}>
			          <option value="test" />
			        </select>
			      );
			  \});
			
			  it("should warn if selected is set on <option>", () => \{
			    ReactTestUtils.renderIntoDocument(
			      <select>
			        <option selected=\{true\} />
			        <option selected=\{true\} />
			      </select>
			    ),
			      ReactTestUtils.renderIntoDocument(
			        <select>
			          <option selected=\{true\} />
			          <option selected=\{true\} />
			        </select>
			      );
			  \});
			
			  it("should warn if value is null and multiple is true", () => \{
			    ReactTestUtils.renderIntoDocument(
			      <select value=\{null\} multiple=\{true\}>
			        <option value="test" />
			      </select>
			    ),
			      ReactTestUtils.renderIntoDocument(
			        <select value=\{null\} multiple=\{true\}>
			          <option value="test" />
			        </select>
			      );
			  \});
			
			  it("should refresh state on change", () => \{
			    let stub = (
			      <select value="giraffe" onChange=\{noop\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    stub = ReactTestUtils.renderIntoDocument(stub);
			    const node = ReactDOM.findDOMNode(stub);
			
			    ReactTestUtils.Simulate.change(node);
			
			    expect(node.value).toBe("giraffe");
			  \});
			
			  it("should warn if value and defaultValue props are specified", () => \{
			    ReactTestUtils.renderIntoDocument(
			      <select value="giraffe" defaultValue="giraffe" readOnly=\{true\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			
			    ReactTestUtils.renderIntoDocument(
			      <select value="giraffe" defaultValue="giraffe" readOnly=\{true\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			  \});
			
			  it("should be able to safely remove select onChange", () => \{
			    function changeView() \{
			      ReactDOM.unmountComponentAtNode(container);
			    \}
			
			    const container = document.createElement("div");
			    let stub = (
			      <select value="giraffe" onChange=\{changeView\}>
			        <option value="monkey">A monkey!</option>
			        <option value="giraffe">A giraffe!</option>
			        <option value="gorilla">A gorilla!</option>
			      </select>
			    );
			    stub = ReactDOM.render(stub, container);
			    const node = ReactDOM.findDOMNode(stub);
			
			    expect(() => ReactTestUtils.Simulate.change(node)).not.toThrow();
			  \});
			
			  it("should select grandchild options nested inside an optgroup", () => \{
			    const stub = (
			      <select value="b" onChange=\{noop\}>
			        <optgroup label="group">
			          <option value="a">a</option>
			          <option value="b">b</option>
			          <option value="c">c</option>
			        </optgroup>
			      </select>
			    );
			    const container = document.createElement("div");
			    const node = ReactDOM.render(stub, container);
			
			    expect(node.options[0].selected).toBe(false); // a
			    expect(node.options[1].selected).toBe(true); // b
			    expect(node.options[2].selected).toBe(false); // c
			  \});
			
			  it("should allow controlling \`value\` in a nested render", () => \{
			    let selectNode;
			
			    class Parent extends React.Component \{
			      state = \{
			        value: "giraffe"
			      \};
			
			      componentDidMount() \{
			        this._renderNested();
			      \}
			
			      componentDidUpdate() \{
			        this._renderNested();
			      \}
			
			      _handleChange(event) \{
			        this.setState(\{ value: event.target.value \});
			      \}
			
			      _renderNested() \{
			        ReactDOM.render(
			          <select
			            onChange=\{this._handleChange.bind(this)\}
			            ref=\{n => (selectNode = n)\}
			            value=\{this.state.value\}
			          >
			            <option value="monkey">A monkey!</option>
			            <option value="giraffe">A giraffe!</option>
			            <option value="gorilla">A gorilla!</option>
			          </select>,
			          this._nestingContainer
			        );
			      \}
			
			      render() \{
			        return <div ref=\{n => (this._nestingContainer = n)\} />;
			      \}
			    \}
			
			    const container = document.createElement("div");
			
			    document.body.appendChild(container);
			
			    ReactDOM.render(<Parent />, container);
			    //ref问题
			    expect(selectNode.value).toBe("giraffe");
			
			    selectNode.value = "gorilla";
			
			    let nativeEvent = document.createEvent("Event");
			    nativeEvent.initEvent("input", true, true);
			    selectNode.dispatchEvent(nativeEvent);
			
			    expect(selectNode.value).toEqual("gorilla");
			
			    nativeEvent = document.createEvent("Event");
			    nativeEvent.initEvent("change", true, true);
			    selectNode.dispatchEvent(nativeEvent);
			
			    expect(selectNode.value).toEqual("gorilla");
			
			    document.body.removeChild(container);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMSelect-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(29)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMSVG-test.js', () => {
        const sourceCode = `
			
			
			
			    'use strict';
			
			    let React;
			    let ReactDOM;
			    let ReactDOMServer;
			    
			    describe('ReactDOMSVG', () => \{
			      beforeEach(() => \{
			        React = require('react');
			        ReactDOM = require('react-dom');
			        ReactDOMServer = require('react-server-renderer');
			      \});
			    
			      it('creates initial namespaced markup', () => \{
			        const markup = ReactDOMServer.renderToString(
			          <svg>
			            <image xlinkHref="http://i.imgur.com/w7GCRPb.png" />
			          </svg>,
			        );
			        expect(markup).toContain('xlink:href="http://i.imgur.com/w7GCRPb.png"');
			      \});
			    
			      it('creates elements with SVG namespace inside SVG tag during mount', () => \{
			        const node = document.createElement('div');
			        let div,
			          div2,
			          div3,
			          foreignObject,
			          foreignObject2,
			          g,
			          image,
			          image2,
			          image3,
			          p,
			          svg,
			          svg2,
			          svg3,
			          svg4;
			        ReactDOM.render(
			          <div>
			            <svg ref=\{el => (svg = el)\}>
			              <g ref=\{el => (g = el)\} strokeWidth="5">
			                <svg ref=\{el => (svg2 = el)\}>
			                  <foreignObject ref=\{el => (foreignObject = el)\}>
			                    <svg ref=\{el => (svg3 = el)\}>
			                      <svg ref=\{el => (svg4 = el)\} />
			                      <image
			                        ref=\{el => (image = el)\}
			                        xlinkHref="http://i.imgur.com/w7GCRPb.png"
			                      />
			                    </svg>
			                    <div ref=\{el => (div = el)\} />
			                  </foreignObject>
			                </svg>
			                <image
			                  ref=\{el => (image2 = el)\}
			                  xlinkHref="http://i.imgur.com/w7GCRPb.png"
			                />
			                <foreignObject ref=\{el => (foreignObject2 = el)\}>
			                  <div ref=\{el => (div2 = el)\} />
			                </foreignObject>
			              </g>
			            </svg>
			            <p ref=\{el => (p = el)\}>
			              <svg>
			                <image
			                  ref=\{el => (image3 = el)\}
			                  xlinkHref="http://i.imgur.com/w7GCRPb.png"
			                />
			              </svg>
			            </p>
			            <div ref=\{el => (div3 = el)\} />
			          </div>,
			          node,
			        );
			        [svg, svg2, svg3, svg4].forEach(el => \{
			          expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
			          // SVG tagName is case sensitive.
			          expect(el.tagName).toBe('svg');
			        \});
			        expect(g.namespaceURI).toBe('http://www.w3.org/2000/svg');
			        expect(g.tagName).toBe('g');
			        expect(g.getAttribute('stroke-width')).toBe('5');
			        expect(p.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
			        // DOM tagName is capitalized by browsers.
			        expect(p.tagName).toBe('P');
			        [image, image2, image3].forEach(el => \{
			          expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
			          expect(el.tagName).toBe('image');
			          expect(el.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(
			            'http://i.imgur.com/w7GCRPb.png',
			          );
			        \});
			        [foreignObject, foreignObject2].forEach(el => \{
			          expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
			          expect(el.tagName).toBe('foreignObject');
			        \});
			        [div, div2, div3].forEach(el => \{
			          expect(el.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
			          expect(el.tagName).toBe('DIV');
			        \});
			      \});
			    
			      it('creates elements with SVG namespace inside SVG tag during update', () => \{
			        let inst,
			          div,
			          div2,
			          foreignObject,
			          foreignObject2,
			          g,
			          image,
			          image2,
			          svg,
			          svg2,
			          svg3,
			          svg4;
			    
			        class App extends React.Component \{
			          state = \{step: 0\};
			          render() \{
			            inst = this;
			            const \{step\} = this.state;
			            if (step === 0) \{
			              return null;
			            \}
			            return (
			              <g ref=\{el => (g = el)\} strokeWidth="5">
			                <svg ref=\{el => (svg2 = el)\}>
			                  <foreignObject ref=\{el => (foreignObject = el)\}>
			                    <svg ref=\{el => (svg3 = el)\}>
			                      <svg ref=\{el => (svg4 = el)\} />
			                      <image
			                        ref=\{el => (image = el)\}
			                        xlinkHref="http://i.imgur.com/w7GCRPb.png"
			                      />
			                    </svg>
			                    <div ref=\{el => (div = el)\} />
			                  </foreignObject>
			                </svg>
			                <image
			                  ref=\{el => (image2 = el)\}
			                  xlinkHref="http://i.imgur.com/w7GCRPb.png"
			                />
			                <foreignObject ref=\{el => (foreignObject2 = el)\}>
			                  <div ref=\{el => (div2 = el)\} />
			                </foreignObject>
			              </g>
			            );
			          \}
			        \}
			    
			        const node = document.createElement('div');
			        ReactDOM.render(
			          <svg ref=\{el => (svg = el)\}>
			            <App />
			          </svg>,
			          node,
			        );
			        inst.setState(\{step: 1\});
			    
			        [svg, svg2, svg3, svg4].forEach(el => \{
			          expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
			          // SVG tagName is case sensitive.
			          expect(el.tagName).toBe('svg');
			        \});
			        expect(g.namespaceURI).toBe('http://www.w3.org/2000/svg');
			        expect(g.tagName).toBe('g');
			        expect(g.getAttribute('stroke-width')).toBe('5');
			        [image, image2].forEach(el => \{
			          expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
			          expect(el.tagName).toBe('image');
			          expect(el.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(
			            'http://i.imgur.com/w7GCRPb.png',
			          );
			        \});
			        [foreignObject, foreignObject2].forEach(el => \{
			          expect(el.namespaceURI).toBe('http://www.w3.org/2000/svg');
			          expect(el.tagName).toBe('foreignObject');
			        \});
			        [div, div2].forEach(el => \{
			          expect(el.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
			          // DOM tagName is capitalized by browsers.
			          expect(el.tagName).toBe('DIV');
			        \});
			      \});
			    
			      it('can render SVG into a non-React SVG tree', () => \{
			        const outerSVGRoot = document.createElementNS(
			          'http://www.w3.org/2000/svg',
			          'svg',
			        );
			        const container = document.createElementNS(
			          'http://www.w3.org/2000/svg',
			          'g',
			        );
			        outerSVGRoot.appendChild(container);
			        let image;
			        ReactDOM.render(<image ref=\{el => (image = el)\} />, container);
			        expect(image.namespaceURI).toBe('http://www.w3.org/2000/svg');
			        expect(image.tagName).toBe('image');
			      \});
			    
			      it('can render HTML into a foreignObject in non-React SVG tree', () => \{
			        const outerSVGRoot = document.createElementNS(
			          'http://www.w3.org/2000/svg',
			          'svg',
			        );
			        const container = document.createElementNS(
			          'http://www.w3.org/2000/svg',
			          'foreignObject',
			        );
			        outerSVGRoot.appendChild(container);
			        let div;
			        ReactDOM.render(<div ref=\{el => (div = el)\} />, container);
			        expect(div.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
			        expect(div.tagName).toBe('DIV');
			      \});
			    \});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMSVG-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMTextarea-test.js', () => {
        const sourceCode = `
			
			const emptyFunction = function()\{\}
			
			describe('ReactDOMTextarea', () => \{
			  let React;
			  let ReactDOM;
			  let ReactDOMServer;
			  let ReactTestUtils;
			
			  let renderTextarea;
			
			  beforeEach(() => \{
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactDOMServer = require('react-server-renderer');
			    ReactTestUtils = require('test-utils');
			
			    renderTextarea = function(component, container) \{
			      if (!container) \{
			        container = document.createElement('div');
			      \}
			      const node = ReactDOM.render(component, container);
			
			      // Fixing jsdom's quirky behavior -- in reality, the parser should strip
			      // off the leading newline but we need to do it by hand here.
			      node.defaultValue = node.innerHTML.replace(/^\\n/, '');
			      return node;
			    \};
			  \});
			
			  it('should allow setting \`defaultValue\`', () => \{
			    const container = document.createElement('div');
			    const node = renderTextarea(<textarea defaultValue="giraffe" />, container);
			
			    expect(node.value).toBe('giraffe');
			
			    // Changing \`defaultValue\` should do nothing.
			    renderTextarea(<textarea defaultValue="gorilla" />, container);
			    expect(node.value).toEqual('giraffe');
			
			    node.value = 'cat';
			
			    renderTextarea(<textarea defaultValue="monkey" />, container);
			    expect(node.value).toEqual('cat');
			  \});
			
			  it('should display \`defaultValue\` of number 0', () => \{
			    const stub = <textarea defaultValue=\{0\} />;
			    const node = renderTextarea(stub);
			
			    expect(node.value).toBe('0');
			  \});
			
			  it('should display "false" for \`defaultValue\` of \`false\`', () => \{
			    const stub = <textarea defaultValue=\{false\} />;
			    const node = renderTextarea(stub);
			
			    expect(node.value).toBe('false');
			  \});
			
			  it('should display "foobar" for \`defaultValue\` of \`objToString\`', () => \{
			    const objToString = \{
			      toString: function() \{
			        return 'foobar';
			      \},
			    \};
			
			    const stub = <textarea defaultValue=\{objToString\} />;
			    const node = renderTextarea(stub);
			
			    expect(node.value).toBe('foobar');
			  \});
			
			  it('should set defaultValue', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<textarea defaultValue="foo" />, container);
			    ReactDOM.render(<textarea defaultValue="bar" />, container);
			    ReactDOM.render(<textarea defaultValue="noise" />, container);
			    expect(container.firstChild.defaultValue).toBe('noise');
			  \});
			
			  it('should not render value as an attribute', () => \{
			    const stub = <textarea value="giraffe" onChange=\{emptyFunction\} />;
			    const node = renderTextarea(stub);
			
			    expect(node.getAttribute('value')).toBe(null);
			  \});
			
			  it('should display \`value\` of number 0', () => \{
			    const stub = <textarea value=\{0\} />;
			    const node = renderTextarea(stub);
			
			    expect(node.value).toBe('0');
			  \});
			
			  it('should update defaultValue to empty string', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<textarea defaultValue=\{'foo'\} />, container);
			    ReactDOM.render(<textarea defaultValue=\{''\} />, container);
			    expect(container.firstChild.defaultValue).toBe('');
			  \});
			
			  it('should allow setting \`value\` to \`giraffe\`', () => \{
			    const container = document.createElement('div');
			    let stub = <textarea value="giraffe" onChange=\{emptyFunction\} />;
			    const node = renderTextarea(stub, container);
			
			    expect(node.value).toBe('giraffe');
			
			    stub = ReactDOM.render(
			      <textarea value="gorilla" onChange=\{emptyFunction\} />,
			      container,
			    );
			    expect(node.value).toEqual('gorilla');
			  \});
			
			  it('should render defaultValue for SSR', () => \{
			    const markup = ReactDOMServer.renderToString(<textarea defaultValue="1" />);
			    const div = document.createElement('div');
			    div.innerHTML = markup;
			    expect(div.firstChild.innerHTML).toBe('1');
			    expect(div.firstChild.getAttribute('defaultValue')).toBe(null);
			  \});
			
			  it('should render value for SSR', () => \{
			    const element = <textarea value="1" onChange=\{function() \{\}\} />;
			    const markup = ReactDOMServer.renderToString(element);
			    const div = document.createElement('div');
			    div.innerHTML = markup;
			    expect(div.firstChild.innerHTML).toBe('1');
			    expect(div.firstChild.getAttribute('defaultValue')).toBe(null);
			  \});
			
			  it('should allow setting \`value\` to \`true\`', () => \{
			    const container = document.createElement('div');
			    let stub = <textarea value="giraffe" onChange=\{emptyFunction\} />;
			    const node = renderTextarea(stub, container);
			
			    expect(node.value).toBe('giraffe');
			
			    stub = ReactDOM.render(
			      <textarea value=\{true\} onChange=\{emptyFunction\} />,
			      container,
			    );
			    expect(node.value).toEqual('true');
			  \});
			
			  it('should allow setting \`value\` to \`false\`', () => \{
			    const container = document.createElement('div');
			    let stub = <textarea value="giraffe" onChange=\{emptyFunction\} />;
			    const node = renderTextarea(stub, container);
			
			    expect(node.value).toBe('giraffe');
			
			    stub = ReactDOM.render(
			      <textarea value=\{false\} onChange=\{emptyFunction\} />,
			      container,
			    );
			    expect(node.value).toEqual('false');
			  \});
			
			  it('should allow setting \`value\` to \`objToString\`', () => \{
			    const container = document.createElement('div');
			    let stub = <textarea value="giraffe" onChange=\{emptyFunction\} />;
			    const node = renderTextarea(stub, container);
			
			    expect(node.value).toBe('giraffe');
			
			    const objToString = \{
			      toString: function() \{
			        return 'foo';
			      \},
			    \};
			    stub = ReactDOM.render(
			      <textarea value=\{objToString\} onChange=\{emptyFunction\} />,
			      container,
			    );
			    expect(node.value).toEqual('foo');
			  \});
			
			  it('should take updates to \`defaultValue\` for uncontrolled textarea', () => \{
			    const container = document.createElement('div');
			
			    const node = ReactDOM.render(<textarea defaultValue="0" />, container);
			
			    expect(node.value).toBe('0');
			
			    ReactDOM.render(<textarea defaultValue="1" />, container);
			
			    expect(node.value).toBe('0');
			  \});
			
			  it('should take updates to children in lieu of \`defaultValue\` for uncontrolled textarea', () => \{
			    const container = document.createElement('div');
			
			    const node = ReactDOM.render(<textarea defaultValue="0" />, container);
			
			    expect(node.value).toBe('0');
			
			    ReactDOM.render(<textarea>1</textarea>, container);
			
			    expect(node.value).toBe('0');
			  \});
			
			  it('should not incur unnecessary DOM mutations', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<textarea value="a" onChange=\{emptyFunction\} />, container);
			
			    const node = container.firstChild;
			    let nodeValue = 'a';
			    const nodeValueSetter = jest.genMockFn();
			    Object.defineProperty(node, 'value', \{
			      get: function() \{
			        return nodeValue;
			      \},
			      set: nodeValueSetter.mockImplementation(function(newValue) \{
			        nodeValue = newValue;
			      \}),
			    \});
			
			    ReactDOM.render(<textarea value="a" onChange=\{emptyFunction\} />, container);
			    expect(nodeValueSetter.mock.calls.length).toBe(0);
			
			    ReactDOM.render(<textarea value="b" onChange=\{emptyFunction\} />, container);
			    expect(nodeValueSetter.mock.calls.length).toBe(1);
			  \});
			
			  it('should properly control a value of number \`0\`', () => \{
			    const stub = <textarea value=\{0\} onChange=\{emptyFunction\} />;
			    const node = renderTextarea(stub);
			
			    node.value = 'giraffe';
			    ReactTestUtils.Simulate.change(node);
			    expect(node.value).toBe('0');
			  \});
			
			  it('should treat children like \`defaultValue\`', () => \{
			    const container = document.createElement('div');
			    let stub = <textarea>giraffe</textarea>;
			    let node;
			
			
			    node = renderTextarea(stub, container);
			 
			
			    expect(node.value).toBe('giraffe');
			
			    // Changing children should do nothing, it functions like \`defaultValue\`.
			    stub = ReactDOM.render(<textarea>gorilla</textarea>, container);
			    expect(node.value).toEqual('giraffe');
			  \});
			
			  it('should keep value when switching to uncontrolled element if not changed', () => \{
			    return
			    const container = document.createElement('div');
			
			    const node = renderTextarea(
			      <textarea value="kitten" onChange=\{emptyFunction\} />,
			      container,
			    );
			
			    expect(node.value).toBe('kitten');
			
			    ReactDOM.render(<textarea defaultValue="gorilla" />, container);
			
			    expect(node.value).toEqual('kitten');
			  \});
			
			  it('should keep value when switching to uncontrolled element if changed', () => \{
			    const container = document.createElement('div');
			
			    const node = renderTextarea(
			      <textarea value="kitten" onChange=\{emptyFunction\} />,
			      container,
			    );
			
			    expect(node.value).toBe('kitten');
			
			    ReactDOM.render(
			      <textarea value="puppies" onChange=\{emptyFunction\} />,
			      container,
			    );
			
			    expect(node.value).toBe('puppies');
			
			    ReactDOM.render(<textarea defaultValue="gorilla" />, container);
			
			    expect(node.value).toEqual('puppies');
			  \});
			
			  it('should allow numbers as children', () => \{
			    let  node = renderTextarea(<textarea>\{17\}</textarea>);
			 
			    expect(node.value).toBe('17');
			  \});
			
			  it('should allow booleans as children', () => \{
			return
			    let node;
			    expect(() => \{
			      node = renderTextarea(<textarea>\{false\}</textarea>);
			    \}).toWarnDev(
			      'Use the \`defaultValue\` or \`value\` props instead of setting children on <textarea>.',
			    );
			    expect(node.value).toBe('false');
			  \});
			
			  it('should allow objects as children', () => \{
			    const obj = \{
			      toString: function() \{
			        return 'sharkswithlasers';
			      \},
			    \};
			    let node;
			    expect(() => \{
			      node = renderTextarea(<textarea>\{obj\}</textarea>);
			    \}).toWarnDev(
			      'Use the \`defaultValue\` or \`value\` props instead of setting children on <textarea>.',
			    );
			    expect(node.value).toBe('sharkswithlasers');
			  \});
			
			  it('should throw with multiple or invalid children', () => \{
			   
			      expect(() =>
			        ReactTestUtils.renderIntoDocument(
			          <textarea>
			            \{'hello'\}
			            \{'there'\}
			          </textarea>,
			        ),
			      ).not.toThrow();
			
			    let node;
			    expect(() => \{
			      expect(
			        () =>
			          (node = renderTextarea(
			            <textarea>
			              <strong />
			            </textarea>,
			          )),
			      ).toWarnDev(
			        'Use the \`defaultValue\` or \`value\` props instead of setting children on <textarea>.',
			      );
			    \}).not.toThrow();
			
			   // expect(node.value).toBe('[object Object]');
			  \});
			
			  it('should unmount', () => \{
			    const container = document.createElement('div');
			    renderTextarea(<textarea />, container);
			    ReactDOM.unmountComponentAtNode(container);
			  \});
			
			  it('should warn if value is null', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<textarea value=\{null\} />),
			    ).toWarnDev(
			      '\`value\` prop on \`textarea\` should not be null. ' +
			        'Consider using an empty string to clear the component or \`undefined\` ' +
			        'for uncontrolled components.',
			    );
			
			    // No additional warnings are expected
			    ReactTestUtils.renderIntoDocument(<textarea value=\{null\} />);
			  \});
			
			  it('should warn if value and defaultValue are specified', () => \{
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(
			        <textarea value="foo" defaultValue="bar" readOnly=\{true\} />,
			      ),
			    ).toWarnDev(
			      'Textarea elements must be either controlled or uncontrolled ' +
			        '(specify either the value prop, or the defaultValue prop, but not ' +
			        'both). Decide between using a controlled or uncontrolled textarea ' +
			        'and remove one of these props. More info: ' +
			        'https://fb.me/react-controlled-components',
			    );
			
			    // No additional warnings are expected
			    ReactTestUtils.renderIntoDocument(
			      <textarea value="foo" defaultValue="bar" readOnly=\{true\} />,
			    );
			  \});
			\}); `

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMTextarea-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(28)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMTextComponent-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let React;
			let ReactDOM;
			let ReactDOMServer;
			
			// In standard React, TextComponent keeps track of different Text templates
			// using comments. However, in React Fiber, those comments are not outputted due
			// to the way Fiber keeps track of the templates.
			// This function "Normalizes" childNodes lists to avoid the presence of comments
			// and make the child list identical in standard React and Fiber
			function filterOutComments(nodeList) \{
			  return [].slice.call(nodeList).filter(node => !(node instanceof Comment));
			\}
			
			describe('ReactDOMTextComponent', () => \{
			  beforeEach(() => \{
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactDOMServer = require('react-server-renderer');
			  \});
			
			  it('updates a mounted text component in place', () => \{
			    const el = document.createElement('div');
			    let inst = ReactDOM.render(
			      <div>
			        <span />
			        \{'foo'\}
			        \{'bar'\}
			      </div>,
			      el,
			    );
			    let nodes = filterOutComments(ReactDOM.findDOMNode(inst).childNodes);
			
			    let foo = nodes[1];
			    let bar = nodes[2];
			    expect(foo.data).toBe('foobar');
			  //  expect(foo.data).toBe('foo');
			  //  expect(bar.data).toBe('bar');
			
			    inst = ReactDOM.render(
			      <div>
			        <span />
			        \{'baz'\}
			        \{'qux'\}
			      </div>,
			      el,
			    );
			    // After the update, the text nodes should have stayed in place (as opposed
			    // to getting unmounted and remounted)
			    nodes = filterOutComments(ReactDOM.findDOMNode(inst).childNodes);
			    expect(nodes[1]).toBe(foo);
			   // expect(nodes[2]).toBe(bar);
			   // expect(foo.data).toBe('baz');
			   // expect(bar.data).toBe('qux');
			    expect(foo.data).toBe("bazqux");
			  \});
			
			  it('can be toggled in and out of the markup', () => \{
			    const el = document.createElement('div');
			    let inst = ReactDOM.render(
			      <div>
			        \{'foo'\}
			        <div />
			        \{'bar'\}
			      </div>,
			      el,
			    );
			
			    let container = ReactDOM.findDOMNode(inst);
			    let childNodes = filterOutComments(container.childNodes);
			    let childDiv = childNodes[1];
			
			    inst = ReactDOM.render(
			      <div>
			        \{null\}
			        <div />
			        \{null\}
			      </div>,
			      el,
			    );
			    container = ReactDOM.findDOMNode(inst);
			    childNodes = filterOutComments(container.childNodes);
			    expect(childNodes.length).toBe(1);
			    expect(childNodes[0]).toBe(childDiv);
			
			    inst = ReactDOM.render(
			      <div>
			        \{'foo'\}
			        <div />
			        \{'bar'\}
			      </div>,
			      el,
			    );
			    container = ReactDOM.findDOMNode(inst);
			    childNodes = filterOutComments(container.childNodes);
			    expect(childNodes.length).toBe(3);
			    expect(childNodes[0].data).toBe('foo');
			    expect(childNodes[1]).toBe(childDiv);
			    expect(childNodes[2].data).toBe('bar');
			  \});
			
			  /**
			   * The following Node.normalize() tests are intentionally failing.
			   * See #9836 tracking whether we'll need to fix this or if it's unnecessary.
			   */
			
			  xit('can reconcile text merged by Node.normalize() alongside other elements', () => \{
			    const el = document.createElement('div');
			    let inst = ReactDOM.render(
			      <div>
			        \{'foo'\}
			        \{'bar'\}
			        \{'baz'\}
			        <span />
			        \{'qux'\}
			      </div>,
			      el,
			    );
			
			    let container = ReactDOM.findDOMNode(inst);
			    container.normalize();
			
			    inst = ReactDOM.render(
			      <div>
			        \{'bar'\}
			        \{'baz'\}
			        \{'qux'\}
			        <span />
			        \{'foo'\}
			      </div>,
			      el,
			    );
			    container = ReactDOM.findDOMNode(inst);
			    expect(container.textContent).toBe('barbazquxfoo');
			  \});
			
			  xit('can reconcile text merged by Node.normalize()', () => \{
			    const el = document.createElement('div');
			    let inst = ReactDOM.render(
			      <div>
			        \{'foo'\}
			        \{'bar'\}
			        \{'baz'\}
			      </div>,
			      el,
			    );
			
			    let container = ReactDOM.findDOMNode(inst);
			    container.normalize();
			
			    inst = ReactDOM.render(
			      <div>
			        \{'bar'\}
			        \{'baz'\}
			        \{'qux'\}
			      </div>,
			      el,
			    );
			    container = ReactDOM.findDOMNode(inst);
			    expect(container.textContent).toBe('barbazqux');
			  \});
			
			  it('can reconcile text from pre-rendered markup', () => \{
			    const el = document.createElement('div');
			    let reactEl = (
			      <div>
			        \{'foo'\}
			        \{'bar'\}
			        \{'baz'\}
			      </div>
			    );
			    el.innerHTML = ReactDOMServer.renderToString(reactEl);
			
			    ReactDOM.hydrate(reactEl, el);
			    expect(el.textContent).toBe('foobarbaz');
			
			    ReactDOM.unmountComponentAtNode(el);
			
			    reactEl = (
			      <div>
			        \{''\}
			        \{''\}
			        \{''\}
			      </div>
			    );
			    el.innerHTML = ReactDOMServer.renderToString(reactEl);
			
			    ReactDOM.hydrate(reactEl, el);
			    expect(el.textContent).toBe('');
			  \});
			
			  xit('can reconcile text arbitrarily split into multiple nodes', () => \{
			    const el = document.createElement('div');
			    let inst = ReactDOM.render(
			      <div>
			        <span />
			        \{'foobarbaz'\}
			      </div>,
			      el,
			    );
			
			    let container = ReactDOM.findDOMNode(inst);
			    let childNodes = filterOutComments(ReactDOM.findDOMNode(inst).childNodes);
			    let textNode = childNodes[1];
			    textNode.textContent = 'foo';
			    container.insertBefore(
			      document.createTextNode('bar'),
			      childNodes[1].nextSibling,
			    );
			    container.insertBefore(
			      document.createTextNode('baz'),
			      childNodes[1].nextSibling,
			    );
			
			    inst = ReactDOM.render(
			      <div>
			        <span />
			        \{'barbazqux'\}
			      </div>,
			      el,
			    );
			    container = ReactDOM.findDOMNode(inst);
			    expect(container.textContent).toBe('barbazqux');
			  \});
			
			  xit('can reconcile text arbitrarily split into multiple nodes on some substitutions only', () => \{
			    const el = document.createElement('div');
			    let inst = ReactDOM.render(
			      <div>
			        <span />
			        \{'bar'\}
			        <span />
			        \{'foobarbaz'\}
			        \{'foo'\}
			        \{'barfoo'\}
			        <span />
			      </div>,
			      el,
			    );
			
			    let container = ReactDOM.findDOMNode(inst);
			    let childNodes = filterOutComments(ReactDOM.findDOMNode(inst).childNodes);
			    let textNode = childNodes[3];
			    textNode.textContent = 'foo';
			    container.insertBefore(
			      document.createTextNode('bar'),
			      childNodes[3].nextSibling,
			    );
			    container.insertBefore(
			      document.createTextNode('baz'),
			      childNodes[3].nextSibling,
			    );
			    let secondTextNode = childNodes[5];
			    secondTextNode.textContent = 'bar';
			    container.insertBefore(
			      document.createTextNode('foo'),
			      childNodes[5].nextSibling,
			    );
			
			    inst = ReactDOM.render(
			      <div>
			        <span />
			        \{'baz'\}
			        <span />
			        \{'barbazqux'\}
			        \{'bar'\}
			        \{'bazbar'\}
			        <span />
			      </div>,
			      el,
			    );
			    container = ReactDOM.findDOMNode(inst);
			    expect(container.textContent).toBe('bazbarbazquxbarbazbar');
			  \});
			
			  xit('can unmount normalized text nodes', () => \{
			    const el = document.createElement('div');
			    ReactDOM.render(
			      <div>
			        \{''\}
			        \{'foo'\}
			        \{'bar'\}
			      </div>,
			      el,
			    );
			    el.normalize();
			    ReactDOM.render(<div />, el);
			    expect(el.innerHTML).toBe('<div></div>');
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactDOMTextComponent-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactEmptyComponent-test.js', () => {
        const sourceCode = `
			
			let React;
			let ReactDOM;
			let ReactTestUtils;
			let TogglingComponent;
			
			let log;
			
			describe('ReactEmptyComponent', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			
			    log = jasmine.createSpy();
			
			    TogglingComponent = class extends React.Component \{
			      state = \{component: this.props.firstComponent\};
			
			      componentDidMount() \{
			        log(ReactDOM.findDOMNode(this));
			        this.setState(\{component: this.props.secondComponent\});
			      \}
			
			      componentDidUpdate() \{
			        log(ReactDOM.findDOMNode(this));
			      \}
			
			      render() \{
			        const Component = this.state.component;
			        return Component ? <Component /> : null;
			      \}
			    \};
			  \});
			
			  it('should not produce child DOM nodes for null and false', () => \{
			    class Component1 extends React.Component \{
			      render() \{
			        return null;
			      \}
			    \}
			
			    class Component2 extends React.Component \{
			      render() \{
			        return false;
			      \}
			    \}
			
			    const container1 = document.createElement('div');
			    ReactDOM.render(<Component1 />, container1);
			    expect(container1.children.length).toBe(0);
			
			    const container2 = document.createElement('div');
			    ReactDOM.render(<Component2 />, container2);
			    expect(container2.children.length).toBe(0);
			  \});
			
			  it('should still throw when rendering to undefined', () => \{
			    class Component extends React.Component \{
			      render() \{\}
			    \}
			
			   // expect(function() \{
			      ReactTestUtils.renderIntoDocument(<Component />);
			   // \}).toThrowError(
			   //   'Component(...): Nothing was returned from render. This usually means a return statement is missing. ' +
			   //     'Or, to render nothing, return null.',
			   // );
			  \});
			
			  it('should be able to switch between rendering null and a normal tag', () => \{
			    const instance1 = (
			      <TogglingComponent firstComponent=\{null\} secondComponent=\{'div'\} />
			    );
			    const instance2 = (
			      <TogglingComponent firstComponent=\{'div'\} secondComponent=\{null\} />
			    );
			
			    ReactTestUtils.renderIntoDocument(instance1);
			    ReactTestUtils.renderIntoDocument(instance2);
			
			    expect(log.calls.count()).toBe(4);
			    expect(log.calls.argsFor(0)[0]).toBe(null);
			    expect(log.calls.argsFor(1)[0].tagName).toBe('DIV');
			    expect(log.calls.argsFor(2)[0].tagName).toBe('DIV');
			    expect(log.calls.argsFor(3)[0]).toBe(null);
			  \});
			
			  it('should be able to switch in a list of children', () => \{
			    const instance1 = (
			      <TogglingComponent firstComponent=\{null\} secondComponent=\{'div'\} />
			    );
			
			    ReactTestUtils.renderIntoDocument(
			      <div>
			        \{instance1\}
			        \{instance1\}
			        \{instance1\}
			      </div>,
			    );
			
			    expect(log.calls.count()).toBe(6);
			    expect(log.calls.argsFor(0)[0]).toBe(null);
			    expect(log.calls.argsFor(1)[0]).toBe(null);
			    expect(log.calls.argsFor(2)[0]).toBe(null);
			    expect(log.calls.argsFor(3)[0].tagName).toBe('DIV');
			    expect(log.calls.argsFor(4)[0].tagName).toBe('DIV');
			    expect(log.calls.argsFor(5)[0].tagName).toBe('DIV');
			  \});
			
			  it('should distinguish between a script placeholder and an actual script tag', () => \{
			    const instance1 = (
			      <TogglingComponent firstComponent=\{null\} secondComponent=\{'script'\} />
			    );
			    const instance2 = (
			      <TogglingComponent firstComponent=\{'script'\} secondComponent=\{null\} />
			    );
			
			    expect(function() \{
			      ReactTestUtils.renderIntoDocument(instance1);
			    \}).not.toThrow();
			    expect(function() \{
			      ReactTestUtils.renderIntoDocument(instance2);
			    \}).not.toThrow();
			
			    expect(log.calls.count()).toBe(4);
			    expect(log.calls.argsFor(0)[0]).toBe(null);
			    expect(log.calls.argsFor(1)[0].tagName).toBe('SCRIPT');
			    expect(log.calls.argsFor(2)[0].tagName).toBe('SCRIPT');
			    expect(log.calls.argsFor(3)[0]).toBe(null);
			  \});
			
			  it(
			    'should have findDOMNode return null when multiple layers of composite ' +
			      'components render to the same null placeholder',
			    () => \{
			      class GrandChild extends React.Component \{
			        render() \{
			          return null;
			        \}
			      \}
			
			      class Child extends React.Component \{
			        render() \{
			          return <GrandChild />;
			        \}
			      \}
			
			      const instance1 = (
			        <TogglingComponent firstComponent=\{'div'\} secondComponent=\{Child\} />
			      );
			      const instance2 = (
			        <TogglingComponent firstComponent=\{Child\} secondComponent=\{'div'\} />
			      );
			
			      expect(function() \{
			        ReactTestUtils.renderIntoDocument(instance1);
			      \}).not.toThrow();
			      expect(function() \{
			        ReactTestUtils.renderIntoDocument(instance2);
			      \}).not.toThrow();
			
			      expect(log.calls.count()).toBe(4);
			      expect(log.calls.argsFor(0)[0].tagName).toBe('DIV');
			      expect(log.calls.argsFor(1)[0]).toBe(null);
			      expect(log.calls.argsFor(2)[0]).toBe(null);
			      expect(log.calls.argsFor(3)[0].tagName).toBe('DIV');
			    \},
			  );
			
			  it('works when switching components', () => \{
			    let assertions = 0;
			
			    class Inner extends React.Component \{
			      render() \{
			        return <span />;
			      \}
			
			      componentDidMount() \{
			        // Make sure the DOM node resolves properly even if we're replacing a
			        // \`null\` component
			        expect(ReactDOM.findDOMNode(this)).not.toBe(null);
			        assertions++;
			      \}
			
			      componentWillUnmount() \{
			        // Even though we're getting replaced by \`null\`, we haven't been
			        // replaced yet!
			        expect(ReactDOM.findDOMNode(this)).not.toBe(null);
			        assertions++;
			      \}
			    \}
			
			    class Wrapper extends React.Component \{
			      render() \{
			        return this.props.showInner ? <Inner /> : null;
			      \}
			    \}
			
			    const el = document.createElement('div');
			    let component;
			
			    // Render the <Inner /> component...
			    component = ReactDOM.render(<Wrapper showInner=\{true\} />, el);
			    expect(ReactDOM.findDOMNode(component)).not.toBe(null);
			
			    // Switch to null...
			    component = ReactDOM.render(<Wrapper showInner=\{false\} />, el);
			    expect(ReactDOM.findDOMNode(component)).toBe(null);
			
			    // ...then switch back.
			    component = ReactDOM.render(<Wrapper showInner=\{true\} />, el);
			    expect(ReactDOM.findDOMNode(component)).not.toBe(null);
			
			    expect(assertions).toBe(3);
			  \});
			
			  it('can render null at the top level', () => \{
			    const div = document.createElement('div');
			    ReactDOM.render(null, div);
			    expect(div.innerHTML).toBe('');
			  \});
			
			  it('does not break when updating during mount', () => \{
			    class Child extends React.Component \{
			      componentDidMount() \{
			        if (this.props.onMount) \{
			          this.props.onMount();
			        \}
			      \}
			
			      render() \{
			        if (!this.props.visible) \{
			          return null;
			        \}
			
			        return <div>hello world</div>;
			      \}
			    \}
			
			    class Parent extends React.Component \{
			      update = () => \{
			        this.forceUpdate();
			      \};
			
			      render() \{
			        return (
			          <div>
			            <Child key="1" visible=\{false\} />
			            <Child key="0" visible=\{true\} onMount=\{this.update\} />
			            <Child key="2" visible=\{false\} />
			          </div>
			        );
			      \}
			    \}
			
			    expect(function() \{
			      ReactTestUtils.renderIntoDocument(<Parent />);
			    \}).not.toThrow();
			  \});
			
			  it('preserves the dom node during updates', () => \{
			    class Empty extends React.Component \{
			      render() \{
			        return null;
			      \}
			    \}
			
			    const container = document.createElement('div');
			
			    ReactDOM.render(<Empty />, container);
			    const noscript1 = container.firstChild;
			    expect(noscript1).toBe(null);
			
			    // This update shouldn't create a DOM node
			    ReactDOM.render(<Empty />, container);
			    const noscript2 = container.firstChild;
			    expect(noscript2).toBe(null);
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactEmptyComponent-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactErrorBoundaries-test.internal.js', () => {
        const sourceCode = `
			'use strict';
			
			let PropTypes;
			let React;
			let ReactDOM;
			let ReactFeatureFlags;
			
			describe('ReactErrorBoundaries', () => \{
				let log;
			
				let BrokenConstructor;
				let BrokenComponentWillMount;
				let BrokenComponentDidMount;
				let BrokenComponentWillReceiveProps;
				let BrokenComponentWillUpdate;
				let BrokenComponentDidUpdate;
				let BrokenComponentWillUnmount;
				let BrokenRenderErrorBoundary;
				let BrokenComponentWillMountErrorBoundary;
				let BrokenComponentDidMountErrorBoundary;
				let BrokenRender;
				let ErrorBoundary;
				let ErrorMessage;
				let NoopErrorBoundary;
				let RetryErrorBoundary;
				let Normal;
			    let NO = 0
				beforeEach(() => \{
					jest.resetModules();
					PropTypes = require('prop-types');
					// ReactFeatureFlags = require('shared/ReactFeatureFlags');
					//  ReactFeatureFlags.replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
					ReactDOM = require('react-dom');
					React = require('react');
			
					log = [];
					BrokenConstructor = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('BrokenConstructor constructor [!]');
							throw new Error('Hello');
						\}
						render() \{
							log.push('BrokenConstructor render');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenConstructor componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenConstructor componentDidMount');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenConstructor componentWillReceiveProps');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenConstructor componentWillUpdate');
						\}
						componentDidUpdate() \{
							log.push('BrokenConstructor componentDidUpdate');
						\}
						componentWillUnmount() \{
							log.push('BrokenConstructor componentWillUnmount');
						\}
					\};
			
					BrokenComponentWillMount = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('BrokenComponentWillMount constructor');
						\}
						render() \{
							log.push('BrokenComponentWillMount render');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenComponentWillMount componentWillMount [!]');
							throw new Error('Hello');
						\}
						componentDidMount() \{
							log.push('BrokenComponentWillMount componentDidMount');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenComponentWillMount componentWillReceiveProps');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenComponentWillMount componentWillUpdate');
						\}
						componentDidUpdate() \{
							log.push('BrokenComponentWillMount componentDidUpdate');
						\}
						componentWillUnmount() \{
							log.push('BrokenComponentWillMount componentWillUnmount');
						\}
					\};
			
					BrokenComponentDidMount = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('BrokenComponentDidMount constructor');
						\}
						render() \{
							log.push('BrokenComponentDidMount render');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenComponentDidMount componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenComponentDidMount componentDidMount [!]');
							throw new Error('Hello');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenComponentDidMount componentWillReceiveProps');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenComponentDidMount componentWillUpdate');
						\}
						componentDidUpdate() \{
							log.push('BrokenComponentDidMount componentDidUpdate');
						\}
						componentWillUnmount() \{
							log.push('BrokenComponentDidMount componentWillUnmount');
						\}
					\};
			
					BrokenComponentWillReceiveProps = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('BrokenComponentWillReceiveProps constructor');
						\}
						render() \{
							log.push('BrokenComponentWillReceiveProps render');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenComponentWillReceiveProps componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenComponentWillReceiveProps componentDidMount');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenComponentWillReceiveProps componentWillReceiveProps [!]');
							throw new Error('Hello');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenComponentWillReceiveProps componentWillUpdate');
						\}
						componentDidUpdate() \{
							log.push('BrokenComponentWillReceiveProps componentDidUpdate');
						\}
						componentWillUnmount() \{
							log.push('BrokenComponentWillReceiveProps componentWillUnmount');
						\}
					\};
			
					BrokenComponentWillUpdate = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('BrokenComponentWillUpdate constructor');
						\}
						render() \{
							log.push('BrokenComponentWillUpdate render');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenComponentWillUpdate componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenComponentWillUpdate componentDidMount');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenComponentWillUpdate componentWillReceiveProps');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenComponentWillUpdate componentWillUpdate [!]');
							throw new Error('Hello');
						\}
						componentDidUpdate() \{
							log.push('BrokenComponentWillUpdate componentDidUpdate');
						\}
						componentWillUnmount() \{
							log.push('BrokenComponentWillUpdate componentWillUnmount');
						\}
					\};
			
					BrokenComponentDidUpdate = class extends React.Component \{
						static defaultProps = \{
							errorText: 'Hello',
						\};
						constructor(props) \{
							super(props);
							log.push('BrokenComponentDidUpdate constructor');
						\}
						render() \{
							log.push('BrokenComponentDidUpdate render');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenComponentDidUpdate componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenComponentDidUpdate componentDidMount');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenComponentDidUpdate componentWillReceiveProps');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenComponentDidUpdate componentWillUpdate');
						\}
						componentDidUpdate() \{
							log.push('BrokenComponentDidUpdate componentDidUpdate [!]');
							throw new Error(this.props.errorText);
						\}
						componentWillUnmount() \{
							log.push('BrokenComponentDidUpdate componentWillUnmount');
						\}
					\};
			
					BrokenComponentWillUnmount = class extends React.Component \{
						static defaultProps = \{
							errorText: 'Hello',
						\};
						constructor(props) \{
							super(props);
							log.push('BrokenComponentWillUnmount constructor');
						\}
						render() \{
							log.push('BrokenComponentWillUnmount render');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenComponentWillUnmount componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenComponentWillUnmount componentDidMount');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenComponentWillUnmount componentWillReceiveProps');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenComponentWillUnmount componentWillUpdate');
						\}
						componentDidUpdate() \{
							log.push('BrokenComponentWillUnmount componentDidUpdate');
						\}
						componentWillUnmount() \{
							log.push('BrokenComponentWillUnmount componentWillUnmount [!]');
							throw new Error(this.props.errorText);
						\}
					\};
			
					BrokenComponentWillMountErrorBoundary = class extends React.Component \{
						constructor(props) \{
							super(props);
							this.state = \{ error: null \};
							log.push('BrokenComponentWillMountErrorBoundary constructor');
						\}
						render() \{
							if (this.state.error) \{
								log.push('BrokenComponentWillMountErrorBoundary render error');
								return <div>Caught an error: \{this.state.error.message\}.</div>;
							\}
							log.push('BrokenComponentWillMountErrorBoundary render success');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenComponentWillMountErrorBoundary componentWillMount [!]');
							throw new Error('Hello');
						\}
						componentDidMount() \{
							log.push('BrokenComponentWillMountErrorBoundary componentDidMount');
						\}
						componentWillUnmount() \{
							log.push('BrokenComponentWillMountErrorBoundary componentWillUnmount');
						\}
						componentDidCatch(error) \{
							log.push('BrokenComponentWillMountErrorBoundary componentDidCatch');
							this.setState(\{ error \});
						\}
					\};
			
					BrokenComponentDidMountErrorBoundary = class extends React.Component \{
						constructor(props) \{
							super(props);
							this.state = \{ error: null \};
							log.push('BrokenComponentDidMountErrorBoundary constructor');
						\}
						render() \{
							if (this.state.error) \{
								log.push('BrokenComponentDidMountErrorBoundary render error');
								return <div>Caught an error: \{this.state.error.message\}.</div>;
							\}
							log.push('BrokenComponentDidMountErrorBoundary render success');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenComponentDidMountErrorBoundary componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenComponentDidMountErrorBoundary componentDidMount [!]');
							throw new Error('Hello');
						\}
						componentWillUnmount() \{
							log.push('BrokenComponentDidMountErrorBoundary componentWillUnmount');
						\}
						componentDidCatch(error) \{
							log.push('BrokenComponentDidMountErrorBoundary componentDidCatch');
							this.setState(\{ error \});
						\}
					\};
			
					BrokenRenderErrorBoundary = class extends React.Component \{
						constructor(props) \{
							super(props);
							this.state = \{ error: null \};
							log.push('BrokenRenderErrorBoundary constructor');
						\}
						render() \{
							if (this.state.error) \{
								log.push('BrokenRenderErrorBoundary render error [!]');
								throw new Error('Hello');
							\}
							log.push('BrokenRenderErrorBoundary render success');
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenRenderErrorBoundary componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenRenderErrorBoundary componentDidMount');
						\}
						componentWillUnmount() \{
							log.push('BrokenRenderErrorBoundary componentWillUnmount');
						\}
						componentDidCatch(error) \{
							log.push('BrokenRenderErrorBoundary componentDidCatch');
							this.setState(\{ error \});
						\}
					\};
			
					BrokenRender = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('BrokenRender constructor');
						\}
						render() \{
							log.push('BrokenRender render [!]');
							throw new Error('Hello');
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenRender componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenRender componentDidMount');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenRender componentWillReceiveProps');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenRender componentWillUpdate');
						\}
						componentDidUpdate() \{
							log.push('BrokenRender componentDidUpdate');
						\}
						componentWillUnmount() \{
							log.push('BrokenRender componentWillUnmount');
						\}
					\};
			
					NoopErrorBoundary = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('NoopErrorBoundary constructor');
						\}
						render() \{
							log.push('NoopErrorBoundary render');
							return <BrokenRender />;
						\}
						UNSAFE_componentWillMount() \{
							log.push('NoopErrorBoundary componentWillMount');
						\}
						componentDidMount() \{
							log.push('NoopErrorBoundary componentDidMount');
						\}
						componentWillUnmount() \{
							log.push('NoopErrorBoundary componentWillUnmount');
						\}
						componentDidCatch() \{
							log.push('NoopErrorBoundary componentDidCatch');
						\}
					\};
			
					Normal = class extends React.Component \{
						static defaultProps = \{
							logName: 'Normal',
						\};
						constructor(props) \{
							super(props);
							log.push(\`\$\{this.props.logName\} constructor\`);
						\}
						render() \{
							log.push(\`\$\{this.props.logName\} render\`);
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							log.push(\`\$\{this.props.logName\} componentWillMount\`);
						\}
						componentDidMount() \{
							log.push(\`\$\{this.props.logName\} componentDidMount\`);
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push(\`\$\{this.props.logName\} componentWillReceiveProps\`);
						\}
						UNSAFE_componentWillUpdate() \{
							log.push(\`\$\{this.props.logName\} componentWillUpdate\`);
						\}
						componentDidUpdate() \{
							log.push(\`\$\{this.props.logName\} componentDidUpdate\`);
						\}
						componentWillUnmount() \{
							log.push(\`\$\{this.props.logName\} componentWillUnmount\`);
						\}
					\};
			
					ErrorBoundary = class extends React.Component \{
						constructor(props) \{
							super(props);
							this.state = \{ error: null \};
							log.push(\`\$\{this.props.logName\} constructor\`);
						\}
						render() \{
							if (this.state.error && !this.props.forceRetry) \{
								log.push(\`\$\{this.props.logName\} render error\`);
								return this.props.renderError(this.state.error, this.props);
							\}
							log.push(\`\$\{this.props.logName\} render success\`);
							return <div>\{this.props.children\}</div>;
						\}
						componentDidCatch(error) \{
							log.push(\`\$\{this.props.logName\} componentDidCatch\`);
							this.setState(\{ error \});
						\}
						UNSAFE_componentWillMount() \{
							log.push(\`\$\{this.props.logName\} componentWillMount\`);
						\}
						componentDidMount() \{
							log.push(\`\$\{this.props.logName\} componentDidMount\`);
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push(\`\$\{this.props.logName\} componentWillReceiveProps\`);
						\}
						UNSAFE_componentWillUpdate() \{
							log.push(\`\$\{this.props.logName\} componentWillUpdate\`);
						\}
						componentDidUpdate() \{
							log.push(\`\$\{this.props.logName\} componentDidUpdate\`);
						\}
						componentWillUnmount() \{
							log.push(\`\$\{this.props.logName\} componentWillUnmount\`);
						\}
					\};
					ErrorBoundary.defaultProps = \{
						logName: 'ErrorBoundary',
						renderError(error, props) \{
							return <div ref=\{props.errorMessageRef\}>Caught an error: \{error.message\}.</div>;
						\},
					\};
			
					RetryErrorBoundary = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('RetryErrorBoundary constructor');
						\}
						render() \{
							log.push('RetryErrorBoundary render');
							return <BrokenRender />;
						\}
						UNSAFE_componentWillMount() \{
							log.push('RetryErrorBoundary componentWillMount');
						\}
						componentDidMount() \{
							log.push('RetryErrorBoundary componentDidMount');
						\}
						componentWillUnmount() \{
							log.push('RetryErrorBoundary componentWillUnmount');
						\}
						componentDidCatch(error) \{
							log.push('RetryErrorBoundary componentDidCatch [!]');
							// In Fiber, calling setState() (and failing) is treated as a rethrow.
							this.setState(\{\});
						\}
					\};
			
					ErrorMessage = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('ErrorMessage constructor');
						\}
						UNSAFE_componentWillMount() \{
							log.push('ErrorMessage componentWillMount');
						\}
						componentDidMount() \{
							log.push('ErrorMessage componentDidMount');
						\}
						componentWillUnmount() \{
							log.push('ErrorMessage componentWillUnmount');
						\}
						render() \{
							log.push('ErrorMessage render');
							return <div>Caught an error: \{this.props.message\}.</div>;
						\}
					\};
				\});
			
				it('does not swallow exceptions on mounting without boundaries', () => \{//0
					let container = document.createElement('div');
					expect(() => \{
						ReactDOM.render(<BrokenRender />, container);
					\}).toThrow('Hello');
			
					container = document.createElement('div');
					expect(() => \{
						ReactDOM.render(<BrokenComponentWillMount />, container);
					\}).toThrow('Hello');
			
					container = document.createElement('div');
					expect(() => \{
						ReactDOM.render(<BrokenComponentDidMount />, container);
					\}).toThrow('Hello');
				\});
			
				it('does not swallow exceptions on updating without boundaries', () => \{//1
					let container = document.createElement('div');
					ReactDOM.render(<BrokenComponentWillUpdate />, container);
					expect(() => \{
						ReactDOM.render(<BrokenComponentWillUpdate />, container);
					\}).toThrow('Hello');
			
					container = document.createElement('div');
					ReactDOM.render(<BrokenComponentWillReceiveProps />, container);
					expect(() => \{
						ReactDOM.render(<BrokenComponentWillReceiveProps />, container);
					\}).toThrow('Hello');
			
					container = document.createElement('div');
					ReactDOM.render(<BrokenComponentDidUpdate />, container);
					expect(() => \{
						ReactDOM.render(<BrokenComponentDidUpdate />, container);
					\}).toThrow('Hello');
				\});
			
				it('does not swallow exceptions on unmounting without boundaries', () => \{//2
					const container = document.createElement('div');
					ReactDOM.render(<BrokenComponentWillUnmount />, container);
					expect(() => \{
						ReactDOM.unmountComponentAtNode(container);
					\}).toThrow('Hello');
				\});
			
				it('prevents errors from leaking into other roots', () => \{//3
					const container1 = document.createElement('div');
					const container2 = document.createElement('div');
					const container3 = document.createElement('div');
			
					ReactDOM.render(<span>Before 1</span>, container1);
					expect(() => \{
						ReactDOM.render(<BrokenRender />, container2);
					\}).toThrow('Hello');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenRender />
						</ErrorBoundary>,
						container3
					);
					expect(container1.firstChild.textContent).toBe('Before 1');
					expect(container2.firstChild).toBe(null);
					expect(container3.firstChild.textContent).toBe('Caught an error: Hello.');
			
					ReactDOM.render(<span>After 1</span>, container1);
					ReactDOM.render(<span>After 2</span>, container2);
					ReactDOM.render(<ErrorBoundary forceRetry=\{true\}>After 3</ErrorBoundary>, container3);
					expect(container1.firstChild.textContent).toBe('After 1');
					expect(container2.firstChild.textContent).toBe('After 2');
					expect(container3.firstChild.textContent).toBe('After 3');
			
					ReactDOM.unmountComponentAtNode(container1);
					ReactDOM.unmountComponentAtNode(container2);
					ReactDOM.unmountComponentAtNode(container3);
					expect(container1.firstChild).toBe(null);
					expect(container2.firstChild).toBe(null);
					expect(container3.firstChild).toBe(null);
				\});
			
				it('renders an error state if child throws in render', () => \{//4
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenRender />
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// Fiber mounts with null children before capturing error
						'ErrorBoundary componentDidMount',
						// Catch and render an error message
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('renders an error state if child throws in constructor', () => \{//5
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenConstructor />
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'BrokenConstructor constructor [!]',
						// Fiber mounts with null children before capturing error
						'ErrorBoundary componentDidMount',
						// Catch and render an error message
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('renders an error state if child throws in componentWillMount', () => \{//6
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenComponentWillMount />
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'BrokenComponentWillMount constructor',
						'BrokenComponentWillMount componentWillMount [!]',
						'ErrorBoundary componentDidMount',
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('renders an error state if context provider throws in componentWillMount', () => \{//7
					class BrokenComponentWillMountWithContext extends React.Component \{
						static childContextTypes = \{ foo: PropTypes.number \};
						getChildContext() \{
							return \{ foo: 42 \};
						\}
						render() \{
							return <div>\{this.props.children\}</div>;
						\}
						UNSAFE_componentWillMount() \{
							throw new Error('Hello');
						\}
					\}
			
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenComponentWillMountWithContext />
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
				\});
			
				it('renders an error state if module-style context provider throws in componentWillMount', () => \{
					// no support
				\});
			
				it('mounts the error message if mounting fails', () => \{//9
					function renderError(error) \{
						return <ErrorMessage message=\{error.message\} />;
					\}
			
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary renderError=\{renderError\}>
							<BrokenRender />
						</ErrorBoundary>,
						container
					);
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						'ErrorBoundary componentDidMount',
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorMessage constructor',
						'ErrorMessage componentWillMount',
						'ErrorMessage render',
						'ErrorMessage componentDidMount',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount', 'ErrorMessage componentWillUnmount']);
				\});
				it('propagates errors on retry on mounting', () => \{//10
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<RetryErrorBoundary>
								<BrokenRender />
							</RetryErrorBoundary>
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
			
					let official = [
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'RetryErrorBoundary constructor',
						'RetryErrorBoundary componentWillMount',
						'RetryErrorBoundary render',
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// In Fiber, failed error boundaries render null before attempting to recover
						'RetryErrorBoundary componentDidMount',
						'RetryErrorBoundary componentDidCatch [!]',
						'ErrorBoundary componentDidMount',
						// Retry
						'RetryErrorBoundary render',
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// This time, the error propagates to the higher boundary
						'RetryErrorBoundary componentWillUnmount',
						'ErrorBoundary componentDidCatch',
						// Render the error
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					];
					expect(log).toEqual(official);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('propagates errors inside boundary during componentWillMount', () => \{//11
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenComponentWillMountErrorBoundary />
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'BrokenComponentWillMountErrorBoundary constructor',
						'BrokenComponentWillMountErrorBoundary componentWillMount [!]',
						// The error propagates to the higher boundary
						'ErrorBoundary componentDidMount',
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('propagates errors inside boundary while rendering error state', () => \{//12
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenRenderErrorBoundary>
								<BrokenRender />
							</BrokenRenderErrorBoundary>
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'BrokenRenderErrorBoundary constructor',
						'BrokenRenderErrorBoundary componentWillMount',
						'BrokenRenderErrorBoundary render success',
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// The first error boundary catches the error
						// It adjusts state but throws displaying the message
						// Finish mounting with null children
						'BrokenRenderErrorBoundary componentDidMount',
						// Attempt to handle the error
						'BrokenRenderErrorBoundary componentDidCatch',
						'ErrorBoundary componentDidMount',
						'BrokenRenderErrorBoundary render error [!]',
						// Boundary fails with new error, propagate to next boundary
						'BrokenRenderErrorBoundary componentWillUnmount',
						// Attempt to handle the error again
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
			 	it('does not call componentWillUnmount when aborting initial mount', () => \{//13
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
							<BrokenRender />
							<Normal />
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						// Render first child
						'Normal constructor',
						'Normal componentWillMount',
						'Normal render',
						// Render second child (it throws)
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// Render third child, even though an earlier sibling threw.
						'Normal constructor',
						'Normal componentWillMount',
						'Normal render',
						// Finish mounting with null children
						'ErrorBoundary componentDidMount',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						// Render the error message
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
				it('resets callback refs if mounting aborts', () => \{//14
					function childRef(x) \{
						log.push('Child ref is set to ' + x);
					\}
					function errorMessageRef(x) \{
						log.push('Error message ref is set to ' + x);
					\}
			
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary errorMessageRef=\{errorMessageRef\}>
							<div ref=\{childRef\} />
							<BrokenRender />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// Handle error:
						// Finish mounting with null children
						'ErrorBoundary componentDidMount',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						// Render the error message
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'Error message ref is set to [object HTMLDivElement]',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount', 'Error message ref is set to null']);
				\});
			
				it('resets object refs if mounting aborts', () => \{//15
					let childRef = React.createRef();
					let errorMessageRef = React.createRef();
			
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary errorMessageRef=\{errorMessageRef\}>
							<div ref=\{childRef\} />
							<BrokenRender />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// Handle error:
						// Finish mounting with null children
						'ErrorBoundary componentDidMount',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						// Render the error message
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
					expect(errorMessageRef.current.toString()).toEqual('[object HTMLDivElement]');
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
					expect(errorMessageRef.current).toEqual(null);
				\});
			
				it('successfully mounts if no error occurs', () => \{//16
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<div>Mounted successfully.</div>
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Mounted successfully.');
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'ErrorBoundary componentDidMount',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('catches if child throws in constructor during update', () => \{//17
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
						</ErrorBoundary>,
						container
					);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
							<Normal logName="Normal2" />
							<BrokenConstructor />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						'Normal componentWillReceiveProps',
						'Normal componentWillUpdate',
						'Normal render',
						// Normal2 will attempt to mount:
						'Normal2 constructor',
						'Normal2 componentWillMount',
						'Normal2 render',
						// BrokenConstructor will abort rendering:
						'BrokenConstructor constructor [!]',
						// Finish updating with null children
						'Normal componentWillUnmount',
						'ErrorBoundary componentDidUpdate',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						// Render the error message
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('catches if child throws in componentWillMount during update', () => \{//18
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
						</ErrorBoundary>,
						container
					);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
							<Normal logName="Normal2" />
							<BrokenComponentWillMount />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						'Normal componentWillReceiveProps',
						'Normal componentWillUpdate',
						'Normal render',
						// Normal2 will attempt to mount:
						'Normal2 constructor',
						'Normal2 componentWillMount',
						'Normal2 render',
						// BrokenComponentWillMount will abort rendering:
						'BrokenComponentWillMount constructor',
						'BrokenComponentWillMount componentWillMount [!]',
						// Finish updating with null children
						'Normal componentWillUnmount',
						'ErrorBoundary componentDidUpdate',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						// Render the error message
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('catches if child throws in componentWillReceiveProps during update', () => \{//19
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
							<BrokenComponentWillReceiveProps />
						</ErrorBoundary>,
						container
					);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
							<BrokenComponentWillReceiveProps />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						'Normal componentWillReceiveProps',
						'Normal componentWillUpdate',
						'Normal render',
						// BrokenComponentWillReceiveProps will abort rendering:
						'BrokenComponentWillReceiveProps componentWillReceiveProps [!]',
						// Finish updating with null children
						'Normal componentWillUnmount',
						'BrokenComponentWillReceiveProps componentWillUnmount',
						'ErrorBoundary componentDidUpdate',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('catches if child throws in componentWillUpdate during update', () => \{//20
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
							<BrokenComponentWillUpdate />
						</ErrorBoundary>,
						container
					);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
							<BrokenComponentWillUpdate />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						'Normal componentWillReceiveProps',
						'Normal componentWillUpdate',
						'Normal render',
						// BrokenComponentWillUpdate will abort rendering:
						'BrokenComponentWillUpdate componentWillReceiveProps',
						'BrokenComponentWillUpdate componentWillUpdate [!]',
						// Finish updating with null children
						'Normal componentWillUnmount',
						'BrokenComponentWillUpdate componentWillUnmount',
						'ErrorBoundary componentDidUpdate',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('catches if child throws in render during update', () => \{//21
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
						</ErrorBoundary>,
						container
					);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
							<Normal logName="Normal2" />
							<BrokenRender />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						'Normal componentWillReceiveProps',
						'Normal componentWillUpdate',
						'Normal render',
						// Normal2 will attempt to mount:
						'Normal2 constructor',
						'Normal2 componentWillMount',
						'Normal2 render',
						// BrokenRender will abort rendering:
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// Finish updating with null children
						'Normal componentWillUnmount',
						'ErrorBoundary componentDidUpdate',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('keeps refs up-to-date during updates', () => \{//22
					function child1Ref(x) \{
						log.push('Child1 ref is set to ' + x);
					\}
					function child2Ref(x) \{
						log.push('Child2 ref is set to ' + x);
					\}
					function errorMessageRef(x) \{
						log.push('Error message ref is set to ' + x);
					\}
			
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary errorMessageRef=\{errorMessageRef\}>
							<div ref=\{child1Ref\} />
						</ErrorBoundary>,
						container
					);
					expect(log).toEqual([
						'ErrorBoundary constructor',
						'ErrorBoundary componentWillMount',
						'ErrorBoundary render success',
						'Child1 ref is set to [object HTMLDivElement]',
						'ErrorBoundary componentDidMount',
					]);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary errorMessageRef=\{errorMessageRef\}>
							<div ref=\{child1Ref\} />
							<div ref=\{child2Ref\} />
							<BrokenRender />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						// BrokenRender will abort rendering:
						'BrokenRender constructor',
						'BrokenRender componentWillMount',
						'BrokenRender render [!]',
						// Finish updating with null children render及render之前的抛错在didUpdate中清空？
						'Child1 ref is set to null',
						'ErrorBoundary componentDidUpdate',
						// Handle the error
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render error',
						'Error message ref is set to [object HTMLDivElement]',
						// Child2 ref is never set because its mounting aborted
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount', 'Error message ref is set to null']);
				\});
			
				it('recovers from componentWillUnmount errors on update', () => \{//23
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenComponentWillUnmount />
							<BrokenComponentWillUnmount />
							<Normal />
						</ErrorBoundary>,
						container
					);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenComponentWillUnmount />
						</ErrorBoundary>,
						container
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						// Update existing child:
						'BrokenComponentWillUnmount componentWillReceiveProps',
						'BrokenComponentWillUnmount componentWillUpdate',
						'BrokenComponentWillUnmount render',
						// Unmounting throws:
						'BrokenComponentWillUnmount componentWillUnmount [!]',
						// Fiber proceeds with lifecycles despite errors
						'Normal componentWillUnmount',
						// The components have updated in this phase
						'BrokenComponentWillUnmount componentDidUpdate',
						'ErrorBoundary componentDidUpdate',
						// Now that commit phase is done, Fiber unmounts the boundary's children
						'BrokenComponentWillUnmount componentWillUnmount [!]',
						'ErrorBoundary componentDidCatch',
						// The initial render was aborted, so
						// Fiber retries from the root.
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary componentDidUpdate',
						// The second willUnmount error should be captured and logged, too.
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						// Render an error now (stack will do it later)
						'ErrorBoundary render error',
						// Attempt to unmount previous child:
						// Done
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('recovers from nested componentWillUnmount errors on update', () => \{//24
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<Normal>
								<BrokenComponentWillUnmount />
							</Normal>
							<BrokenComponentWillUnmount />
						</ErrorBoundary>,
						container,
					);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary>
							<Normal>
								<BrokenComponentWillUnmount />
							</Normal>
						</ErrorBoundary>,
						container,
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						// Update existing children:
						'Normal componentWillReceiveProps',
						'Normal componentWillUpdate',
						'Normal render',
						'BrokenComponentWillUnmount componentWillReceiveProps',
						'BrokenComponentWillUnmount componentWillUpdate',
						'BrokenComponentWillUnmount render',
						// Unmounting throws:
						'BrokenComponentWillUnmount componentWillUnmount [!]',
						// Fiber proceeds with lifecycles despite errors
						'BrokenComponentWillUnmount componentDidUpdate',
						'Normal componentDidUpdate',
						'ErrorBoundary componentDidUpdate',
						'Normal componentWillUnmount',
						'BrokenComponentWillUnmount componentWillUnmount [!]',
						// Now that commit phase is done, Fiber handles errors
						'ErrorBoundary componentDidCatch',
						// The initial render was aborted, so
						// Fiber retries from the root.
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary componentDidUpdate',
						// The second willUnmount error should be captured and logged, too.
						'ErrorBoundary componentDidCatch',
						'ErrorBoundary componentWillUpdate',
						// Render an error now (stack will do it later)
						'ErrorBoundary render error',
						// Done
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				\});
			
				it('picks the right boundary when handling unmounting errors', () => \{//25
					function renderInnerError(error) \{
						return <div>Caught an inner error: \{error.message\}.</div>;
					\}
					function renderOuterError(error) \{
						return <div>Caught an outer error: \{error.message\}.</div>;
					\}
			
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary
							logName="OuterErrorBoundary"
							renderError=\{renderOuterError\}>
							<ErrorBoundary
								logName="InnerErrorBoundary"
								renderError=\{renderInnerError\}>
								<BrokenComponentWillUnmount />
							</ErrorBoundary>
						</ErrorBoundary>,
						container,
					);
			
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary
							logName="OuterErrorBoundary"
							renderError=\{renderOuterError\}>
							<ErrorBoundary
								logName="InnerErrorBoundary"
								renderError=\{renderInnerError\}
							/>
						</ErrorBoundary>,
						container,
					);
					expect(container.textContent).toBe('Caught an inner error: Hello.');
					expect(log).toEqual([
						// Update outer boundary
						'OuterErrorBoundary componentWillReceiveProps',
						'OuterErrorBoundary componentWillUpdate',
						'OuterErrorBoundary render success',
						// Update inner boundary
						'InnerErrorBoundary componentWillReceiveProps',
						'InnerErrorBoundary componentWillUpdate',
						'InnerErrorBoundary render success',
						// Try unmounting child
						'BrokenComponentWillUnmount componentWillUnmount [!]',
						// Fiber proceeds with lifecycles despite errors
						// Inner and outer boundaries have updated in this phase
						'InnerErrorBoundary componentDidUpdate',
						'OuterErrorBoundary componentDidUpdate',
						// Now that commit phase is done, Fiber handles errors
						// Only inner boundary receives the error:
						'InnerErrorBoundary componentDidCatch',
						'InnerErrorBoundary componentWillUpdate',
						// Render an error now
						'InnerErrorBoundary render error',
						// In Fiber, this was a local update to the
						// inner boundary so only its hook fires
						'InnerErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual([
						'OuterErrorBoundary componentWillUnmount',
						'InnerErrorBoundary componentWillUnmount',
					]);
				\});
			
				it('can recover from error state', () => \{//26
					const container = document.createElement('div');
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenRender />
						</ErrorBoundary>,
						container,
					);
			
					ReactDOM.render(
						<ErrorBoundary>
							<Normal />
						</ErrorBoundary>,
						container,
					);
					// Error boundary doesn't retry by itself:
					expect(container.textContent).toBe('Caught an error: Hello.');
			
					// Force the success path:
					log.length = 0;
					ReactDOM.render(
						<ErrorBoundary forceRetry=\{true\}>
							<Normal />
						</ErrorBoundary>,
						container,
					);
					expect(container.textContent).not.toContain('Caught an error');
					expect(log).toEqual([
						'ErrorBoundary componentWillReceiveProps',
						'ErrorBoundary componentWillUpdate',
						'ErrorBoundary render success',
						// Mount children:
						'Normal constructor',
						'Normal componentWillMount',
						'Normal render',
						// Finalize updates:
						'Normal componentDidMount',
						'ErrorBoundary componentDidUpdate',
					]);
			
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual([
						'ErrorBoundary componentWillUnmount',
						'Normal componentWillUnmount',
					]);
				\});
			
				it('can update multiple times in error state', () => \{//27
					const container = document.createElement('div');
					ReactDOM.render(
					  <ErrorBoundary>
						<BrokenRender />
					  </ErrorBoundary>,
					  container,
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
				
					ReactDOM.render(
					  <ErrorBoundary>
						<BrokenRender />
					  </ErrorBoundary>,
					  container,
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
				
					ReactDOM.render(<div>Other screen</div>, container);
					expect(container.textContent).toBe('Other screen');
				
					ReactDOM.unmountComponentAtNode(container);
				  \});
				
				  it("doesn't get into inconsistent state during removals", () => \{//28
					const container = document.createElement('div');
					ReactDOM.render(
					  <ErrorBoundary>
						<Normal />
						<BrokenComponentWillUnmount />
						<Normal />
					  </ErrorBoundary>,
					  container,
					);
				
					ReactDOM.render(<ErrorBoundary />, container);
					expect(container.textContent).toBe('Caught an error: Hello.');
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				  \});
			
				  it("doesn't get into inconsistent state during additions", () => \{//29
					const container = document.createElement('div');
					ReactDOM.render(<ErrorBoundary />, container);
					ReactDOM.render(
					  <ErrorBoundary>
						<Normal />
						<BrokenRender />
						<Normal />
					  </ErrorBoundary>,
					  container,
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				  \});
				
				  it("doesn't get into inconsistent state during reorders", () => \{//30
					function getAMixOfNormalAndBrokenRenderElements() \{
					  const elements = [];
					  for (let i = 0; i < 100; i++) \{
						elements.push(<Normal key=\{i\} />);
					  \}
					  elements.push(<MaybeBrokenRender key=\{100\} />);
				
					  let currentIndex = elements.length;
					  while (0 !== currentIndex) \{
						const randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex -= 1;
						const temporaryValue = elements[currentIndex];
						elements[currentIndex] = elements[randomIndex];
						elements[randomIndex] = temporaryValue;
					  \}
					  return elements;
					\}
				
					class MaybeBrokenRender extends React.Component \{
					  render() \{
						if (fail) \{
						  throw new Error('Hello');
						\}
						return <div>\{this.props.children\}</div>;
					  \}
					\}
				
					let fail = false;
					const container = document.createElement('div');
					ReactDOM.render(
					  <ErrorBoundary>\{getAMixOfNormalAndBrokenRenderElements()\}</ErrorBoundary>,
					  container,
					);
					expect(container.textContent).not.toContain('Caught an error');
				
					fail = true;
					ReactDOM.render(
					  <ErrorBoundary>\{getAMixOfNormalAndBrokenRenderElements()\}</ErrorBoundary>,
					  container,
					);
					expect(container.textContent).toBe('Caught an error: Hello.');
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				  \});
			
				  it('catches errors originating downstream', () => \{//31
					let fail = false;
					class Stateful extends React.Component \{
					  state = \{shouldThrow: false\};
				
					  render() \{
						if (fail) \{
						  log.push('Stateful render [!]');
						  throw new Error('Hello');
						\}
						return <div>\{this.props.children\}</div>;
					  \}
					\}
				
					let statefulInst;
					const container = document.createElement('div');
					ReactDOM.render(
					  <ErrorBoundary>
						<Stateful ref=\{inst => (statefulInst = inst)\} />
					  </ErrorBoundary>,
					  container,
					);
				
					log.length = 0;
					expect(() => \{
					  fail = true;
					  statefulInst.forceUpdate();
					\}).not.toThrow();
				
					expect(log).toEqual([
					  'Stateful render [!]',
					  'ErrorBoundary componentDidCatch',
					  'ErrorBoundary componentWillUpdate',
					  'ErrorBoundary render error',
					  'ErrorBoundary componentDidUpdate',
					]);
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				  \});
			
				  it('catches errors in componentDidMount', () => \{//32
					const container = document.createElement('div');
					ReactDOM.render(
					  <ErrorBoundary>
						<BrokenComponentWillUnmount>
						  <Normal />
						</BrokenComponentWillUnmount>
						<BrokenComponentDidMount />
						<Normal logName="LastChild" />
					  </ErrorBoundary>,
					  container,
					);
					expect(log).toEqual([
					  'ErrorBoundary constructor',
					  'ErrorBoundary componentWillMount',
					  'ErrorBoundary render success',
					  'BrokenComponentWillUnmount constructor',
					  'BrokenComponentWillUnmount componentWillMount',
					  'BrokenComponentWillUnmount render',
					  'Normal constructor',
					  'Normal componentWillMount',
					  'Normal render',
					  'BrokenComponentDidMount constructor',
					  'BrokenComponentDidMount componentWillMount',
					  'BrokenComponentDidMount render',
					  'LastChild constructor',
					  'LastChild componentWillMount',
					  'LastChild render',
					  // Start flushing didMount queue
					  'Normal componentDidMount',
					  'BrokenComponentWillUnmount componentDidMount',
					  'BrokenComponentDidMount componentDidMount [!]',
					  // Continue despite the error
					  'LastChild componentDidMount',
					  'ErrorBoundary componentDidMount',
					  // Now we are ready to handle the error
					  // Safely unmount every child
					  'BrokenComponentWillUnmount componentWillUnmount [!]',
					  // Continue unmounting safely despite any errors
					  'Normal componentWillUnmount',
					  'BrokenComponentDidMount componentWillUnmount',
					  'LastChild componentWillUnmount',
					  // Handle the error
					  'ErrorBoundary componentDidCatch',
					  'ErrorBoundary componentWillUpdate',
					  // The willUnmount error should be captured and logged, too.
					  'ErrorBoundary componentDidUpdate',
					  'ErrorBoundary componentDidCatch',
					  'ErrorBoundary componentWillUpdate',
					  'ErrorBoundary render error',
					  // The update has finished
					  'ErrorBoundary componentDidUpdate',
					]);
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				  \});
				
				  it('catches errors in componentDidUpdate', () => \{//33
					const container = document.createElement('div');
					ReactDOM.render(
					  <ErrorBoundary>
						<BrokenComponentDidUpdate />
					  </ErrorBoundary>,
					  container,
					);
				
					log.length = 0;
					ReactDOM.render(
					  <ErrorBoundary>
						<BrokenComponentDidUpdate />
					  </ErrorBoundary>,
					  container,
					);
					expect(log).toEqual([
					  'ErrorBoundary componentWillReceiveProps',
					  'ErrorBoundary componentWillUpdate',
					  'ErrorBoundary render success',
					  'BrokenComponentDidUpdate componentWillReceiveProps',
					  'BrokenComponentDidUpdate componentWillUpdate',
					  'BrokenComponentDidUpdate render',
					  // All lifecycles run
					  'BrokenComponentDidUpdate componentDidUpdate [!]',
					  'ErrorBoundary componentDidUpdate',
					  'BrokenComponentDidUpdate componentWillUnmount',
					  // Then, error is handled
					  'ErrorBoundary componentDidCatch',
					  'ErrorBoundary componentWillUpdate',
					  'ErrorBoundary render error',
					  'ErrorBoundary componentDidUpdate',
					]);
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				  \});
			
				  it('propagates errors inside boundary during componentDidMount', () => \{//34
					const container = document.createElement('div');
					ReactDOM.render(
					  <ErrorBoundary>
						<BrokenComponentDidMountErrorBoundary
						  renderError=\{error => (
							<div>We should never catch our own error: \{error.message\}.</div>
						  )\}
						/>
					  </ErrorBoundary>,
					  container,
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
					  'ErrorBoundary constructor',
					  'ErrorBoundary componentWillMount',
					  'ErrorBoundary render success',
					  'BrokenComponentDidMountErrorBoundary constructor',
					  'BrokenComponentDidMountErrorBoundary componentWillMount',
					  'BrokenComponentDidMountErrorBoundary render success',
					  'BrokenComponentDidMountErrorBoundary componentDidMount [!]',
					  // Fiber proceeds with the hooks
					  'ErrorBoundary componentDidMount',
					  'BrokenComponentDidMountErrorBoundary componentWillUnmount',
					  // The error propagates to the higher boundary
					  'ErrorBoundary componentDidCatch',
					  // Fiber retries from the root
					  'ErrorBoundary componentWillUpdate',
					  'ErrorBoundary render error',
					  'ErrorBoundary componentDidUpdate',
					]);
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['ErrorBoundary componentWillUnmount']);
				  \});
				
				  it('calls componentDidCatch for each error that is captured', () => \{//35
					console.log("以后处理")
				    return
					function renderUnmountError(error) \{
					  return <div>Caught an unmounting error: \{error.message\}.</div>;
					\}
					function renderUpdateError(error) \{
					  return <div>Caught an updating error: \{error.message\}.</div>;
					\}
				
					const container = document.createElement('div');
					ReactDOM.render(
					  <ErrorBoundary logName="OuterErrorBoundary">
						<ErrorBoundary
						  logName="InnerUnmountBoundary"
						  renderError=\{renderUnmountError\}>
						  <BrokenComponentWillUnmount errorText="E1" />
						  <BrokenComponentWillUnmount errorText="E2" />
						</ErrorBoundary>
						<ErrorBoundary
						  logName="InnerUpdateBoundary"
						  renderError=\{renderUpdateError\}>
						  <BrokenComponentDidUpdate errorText="E3" />
						  <BrokenComponentDidUpdate errorText="E4" />
						</ErrorBoundary>
					  </ErrorBoundary>,
					  container,
					);
				
					log.length = 0;
					ReactDOM.render(
					  <ErrorBoundary logName="OuterErrorBoundary">
						<ErrorBoundary
						  logName="InnerUnmountBoundary"
						  renderError=\{renderUnmountError\}
						/>
						<ErrorBoundary
						  logName="InnerUpdateBoundary"
						  renderError=\{renderUpdateError\}>
						  <BrokenComponentDidUpdate errorText="E3" />
						  <BrokenComponentDidUpdate errorText="E4" />
						</ErrorBoundary>
					  </ErrorBoundary>,
					  container,
					);
				
				/*	expect(container.firstChild.textContent).toBe(
					  'Caught an unmounting error: E2.' + 'Caught an updating error: E4.',
					);
					*/
					expect(log).toEqual([
					  // Begin update phase
					  'OuterErrorBoundary componentWillReceiveProps',
					  'OuterErrorBoundary componentWillUpdate',
					  'OuterErrorBoundary render success',
					  'InnerUnmountBoundary componentWillReceiveProps',
					  'InnerUnmountBoundary componentWillUpdate',
					  'InnerUnmountBoundary render success',
					  'InnerUpdateBoundary componentWillReceiveProps',
					  'InnerUpdateBoundary componentWillUpdate',
					  'InnerUpdateBoundary render success',
					  // First come the updates
					  'BrokenComponentDidUpdate componentWillReceiveProps',
					  'BrokenComponentDidUpdate componentWillUpdate',
					  'BrokenComponentDidUpdate render',
					  'BrokenComponentDidUpdate componentWillReceiveProps',
					  'BrokenComponentDidUpdate componentWillUpdate',
					  'BrokenComponentDidUpdate render',
					  // We're in commit phase now, deleting
					  'BrokenComponentWillUnmount componentWillUnmount [!]',
					  'BrokenComponentWillUnmount componentWillUnmount [!]',
					  // Continue despite errors, handle them after commit is done
					  'InnerUnmountBoundary componentDidUpdate',
					  // We're still in commit phase, now calling update lifecycles
					  'BrokenComponentDidUpdate componentDidUpdate [!]',
					  // Again, continue despite errors, we'll handle them later
					  'BrokenComponentDidUpdate componentDidUpdate [!]',
					  'InnerUpdateBoundary componentDidUpdate',
					  'OuterErrorBoundary componentDidUpdate',
					  // After the commit phase, attempt to recover from any errors that
					  // were captured
					  'BrokenComponentDidUpdate componentWillUnmount',
					  'BrokenComponentDidUpdate componentWillUnmount',
					  'InnerUnmountBoundary componentDidCatch',
					  'InnerUnmountBoundary componentDidCatch',
					  'InnerUpdateBoundary componentDidCatch',
					  'InnerUpdateBoundary componentDidCatch',
					  'InnerUnmountBoundary componentWillUpdate',
					  'InnerUnmountBoundary render error',
					  'InnerUpdateBoundary componentWillUpdate',
					  'InnerUpdateBoundary render error',
					  'InnerUnmountBoundary componentDidUpdate',
					  'InnerUpdateBoundary componentDidUpdate',
					]);
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual([
					  'OuterErrorBoundary componentWillUnmount',
					  'InnerUnmountBoundary componentWillUnmount',
					  'InnerUpdateBoundary componentWillUnmount',
					]);
				  \});
			
				  it('discards a bad root if the root component fails', () => \{//36
					const X = null;
					const Y = undefined;
					let err1;
					let err2;
				
					try \{
					  let container = document.createElement('div');
					  expect(() => ReactDOM.render(<X />, container)).toWarnDev(
						'React.createElement: type is invalid.',
					  );
					\} catch (err) \{
					  err1 = err;
					\}
					try \{
					  let container = document.createElement('div');
					  expect(() => ReactDOM.render(<Y />, container)).toWarnDev(
						'React.createElement: type is invalid.',
					  );
					\} catch (err) \{
					  err2 = err;
					\}
				    //anujs不能准备获得类型
					//expect(err1.message).toMatch(/got: null/);
					//expect(err2.message).toMatch(/got: undefined/);
				  \});
				
				  it('renders empty output if error boundary does not handle the error', () => \{
					const container = document.createElement('div');
					ReactDOM.render(
					  <div>
						Sibling
						<NoopErrorBoundary>
						  <BrokenRender />
						</NoopErrorBoundary>
					  </div>,
					  container,
					);
					expect(container.firstChild.textContent).toBe('Sibling');
					expect(log).toEqual([
					  'NoopErrorBoundary constructor',
					  'NoopErrorBoundary componentWillMount',
					  'NoopErrorBoundary render',
					  'BrokenRender constructor',
					  'BrokenRender componentWillMount',
					  'BrokenRender render [!]',
					  // In Fiber, noop error boundaries render null
					  'NoopErrorBoundary componentDidMount',
					  'NoopErrorBoundary componentDidCatch',
					  // Nothing happens.
					]);
				
					log.length = 0;
					ReactDOM.unmountComponentAtNode(container);
					expect(log).toEqual(['NoopErrorBoundary componentWillUnmount']);
				  \});
				
				  it('passes first error when two errors happen in commit', () => \{
					let errors = [], caughtError;
					class Parent extends React.Component \{
					  render() \{
						return <Child />;
					  \}
					  componentDidMount() \{
						errors.push('parent sad');
						throw new Error('parent sad');
					  \}
					\}
					class Child extends React.Component \{
					  render() \{
						return <div />;
					  \}
					  componentDidMount() \{
						errors.push('child sad');
						throw new Error('child sad');
					  \}
					\}
					const container = document.createElement('div');
					try \{
			
					  ReactDOM.render(<Parent />, container);
					\} catch (e) \{
					  if (e.message !== 'parent sad' && e.message !== 'child sad') \{
						throw e;
					  \}
					  caughtError = e;
					\}
					expect(errors).toEqual(['child sad', 'parent sad']);
					expect(caughtError.message).toBe('child sad');
			
			
							  // Here, we test the behavior where there is no error boundary and we
					  // delegate to the host root.
				  \});
				  it('propagates uncaught error inside unbatched initial mount', () => \{
					function Foo() \{
					  throw new Error('foo error');
					\}
					const container = document.createElement('div');
					expect(() => \{
					  ReactDOM.unstable_batchedUpdates(() => \{
						ReactDOM.render(<Foo />, container);
					  \});
					\}).toThrow('foo error');
				  \});
				
				  it('handles errors that occur in before-mutation commit hook', () => \{
					const errors = [];
					let caughtError;
					class Parent extends React.Component \{
					  getSnapshotBeforeUpdate() \{
						errors.push('parent sad');
						throw new Error('parent sad');
					  \}
					  componentDidUpdate() \{\}
					  render() \{
						return <Child \{...this.props\} />;
					  \}
					\}
					class Child extends React.Component \{
					  getSnapshotBeforeUpdate() \{
						errors.push('child sad');
						throw new Error('child sad');
					  \}
					  componentDidUpdate() \{\}
					  render() \{
						return <div />;
					  \}
					\}
				
					const container = document.createElement('div');
					ReactDOM.render(<Parent value=\{1\} />, container);
					try \{
					  ReactDOM.render(<Parent value=\{2\} />, container);
					\} catch (e) \{
					  if (e.message !== 'parent sad' && e.message !== 'child sad') \{
						throw e;
					  \}
					  caughtError = e;
					\}
				
					expect(errors).toEqual(['child sad', 'parent sad']);
					// Error should be the first thrown
					expect(caughtError.message).toBe('child sad');
				  \}); 
			
				  /*
			var a = 1
				  BrokenRender = class extends React.Component \{
						constructor(props) \{
							super(props);
							log.push('BrokenRender constructor');
						\}
						render() \{
							if(a === 1)\{
			                  log.push('BrokenRender render');
			                   return <p>xxxx</p>
							\}else\{
								log.push('BrokenRender render [!]');
						      	throw new Error('Hello');
							\}
							
						\}
						UNSAFE_componentWillMount() \{
							log.push('BrokenRender componentWillMount');
						\}
						componentDidMount() \{
							log.push('BrokenRender componentDidMount');
						\}
						UNSAFE_componentWillReceiveProps() \{
							log.push('BrokenRender componentWillReceiveProps');
						\}
						UNSAFE_componentWillUpdate() \{
							log.push('BrokenRender componentWillUpdate');
						\}
						componentDidUpdate() \{
							log.push('BrokenRender componentDidUpdate');
						\}
						componentWillUnmount() \{
							log.push('BrokenRender componentWillUnmount');
						\}
					\};
			 ReactDOM.render(
						<ErrorBoundary>
							<BrokenRender />
						</ErrorBoundary>,
						container
					);
					a = 0
					ReactDOM.render(
						<ErrorBoundary>
							<BrokenRender />
						</ErrorBoundary>,
						container
					);
					expect(container.firstChild.textContent).toBe('Caught an error: Hello.');
					expect(log).toEqual([
					"ErrorBoundary constructor", 
					"ErrorBoundary componentWillMount",
					"ErrorBoundary render success",
					"BrokenRender constructor", 
					"BrokenRender componentWillMount",
					"BrokenRender render",
					"BrokenRender componentDidMount", 
					"ErrorBoundary componentDidMount",
					"ErrorBoundary componentWillReceiveProps",
					"ErrorBoundary componentWillUpdate", 
					"ErrorBoundary render success",
					"BrokenRender componentWillReceiveProps", 
					"BrokenRender componentWillUpdate",
					"BrokenRender render [!]", 
					"ErrorBoundary componentDidUpdate",
					"ErrorBoundary componentDidCatch",
					"ErrorBoundary componentWillUpdate",
					"ErrorBoundary render error",
					"BrokenRender componentWillUnmount",
					"ErrorBoundary componentDidUpdate"
					]);
				  */
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactErrorBoundaries-test.internal.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(41)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactHook-test.js', () => {
        const sourceCode = `
			"use strict";
			
			let ChildUpdates;
			let MorphingComponent;
			let React;
			let ReactDOM;
			
			describe("ReactHook-test", () => \{
			    beforeEach(() => \{
			        jest.resetModules();
			        React = require("react");
			        ReactDOM = require("react-dom");
			    \});
			
			    it("should support useState", () => \{
			        var fn 
			        function Child() \{
			            var [todoName, setTodoName] = React.useState('todo')
			           fn = setTodoName
			           return <div>\{todoName\}</div>;
			        \}
			        const el = document.createElement("div");
			        ReactDOM.render(<Child />, el);
			        expect(el.textContent).toBe("todo");
			        fn('new')
			        expect(el.textContent).toBe("new");
			        fn(1111)
			        expect(el.textContent).toBe("1111");
			    \});
			
			    it("should support useCallback", () => \{
			        var onClick 
			        function Child() \{
			          var [todoName, setTodoName] = React.useState('todo')
			           onClick = React.useCallback((e)=>\{
			              setTodoName(e.target.value)
			           \}, [])
			           return <input value=\{todoName\} onClick=\{onClick \} /> 
			        \}
			        const el = document.createElement("div");
			        ReactDOM.render(<Child />, el);
			        var onClick1 = onClick;
			     
			        ReactDOM.render(<Child />, el);
			        expect(onClick1).toBe(onClick)
			    \});
			    it("should support useImperativeHandle", () => \{
			      
			       var runing  = 1, refOuter
			      const Lorry = React.forwardRef((props, ref) => \{
			        const startLorry = () => \{
			            runing = 'start'
			        \}
			
			        const stopLorry = () => \{
			            runing = 'stop'
			        \}
			        refOuter = ref
			        React.useImperativeHandle(
			          ref,
			          () =>(\{
			              startLorry,
			              stopLorry
			          \})
			        )
			
			        return (
			         <span>SPAN</span>
			        )
			      \})
			
			      function Main()\{
			          let lorryRef = React.useRef(null)
			          React.useEffect(()=>\{
			              lorryRef.current.startLorry() //报错，因为lorryRef.current为null
			          \},[])
			         return  <p>111<Lorry ref=\{lorryRef\}></Lorry></p>
			      \}
			      const el = document.createElement("div");
			      ReactDOM.render(<Main />, el);
			      expect(runing).toBe('start')
			      expect(Object.keys(refOuter.current).length).toBe(2)
			    \})
			
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactHook-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactIdentity-test.js', () => {
        const sourceCode = `
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			describe('ReactIdentity', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			  \});
			
			  it('should allow key property to express identity', () => \{
			    let node;
			    const Component = props => (
			      <div ref=\{c => (node = c)\}>
			        <div key=\{props.swap ? 'banana' : 'apple'\} />
			        <div key=\{props.swap ? 'apple' : 'banana'\} />
			      </div>
			    );
			
			    const container = document.createElement('div');
			    ReactDOM.render(<Component />, container);
			    const origChildren = Array.from(node.childNodes);
			    ReactDOM.render(<Component swap=\{true\} />, container);
			    const newChildren = Array.from(node.childNodes);
			    expect(origChildren[0]).toBe(newChildren[1]);
			    expect(origChildren[1]).toBe(newChildren[0]);
			  \});
			
			  it('should use composite identity', () => \{
			    class Wrapper extends React.Component \{
			      render() \{
			        return <a>\{this.props.children\}</a>;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    let node1;
			    let node2;
			    ReactDOM.render(
			      <Wrapper key="wrap1">
			        <span ref=\{c => (node1 = c)\} />
			      </Wrapper>,
			      container,
			    );
			    ReactDOM.render(
			      <Wrapper key="wrap2">
			        <span ref=\{c => (node2 = c)\} />
			      </Wrapper>,
			      container,
			    );
			
			    expect(node1).not.toBe(node2);
			  \});
			
			  function renderAComponentWithKeyIntoContainer(key, container) \{
			    class Wrapper extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <span ref="span" key=\{key\} />
			          </div>
			        );
			      \}
			    \}
			
			    const instance = ReactDOM.render(<Wrapper />, container);
			    const span = instance.refs.span;
			    expect(ReactDOM.findDOMNode(span)).not.toBe(null);
			  \}
			
			  it('should allow any character as a key, in a detached parent', () => \{
			    const detachedContainer = document.createElement('div');
			    renderAComponentWithKeyIntoContainer("<'WEIRD/&\\\\key'>", detachedContainer);
			  \});
			
			  it('should allow any character as a key, in an attached parent', () => \{
			    // This test exists to protect against implementation details that
			    // incorrectly query escaped IDs using DOM tools like getElementById.
			    const attachedContainer = document.createElement('div');
			    document.body.appendChild(attachedContainer);
			
			    renderAComponentWithKeyIntoContainer("<'WEIRD/&\\\\key'>", attachedContainer);
			
			    document.body.removeChild(attachedContainer);
			  \});
			
			  it('should not allow scripts in keys to execute', () => \{
			    const h4x0rKey =
			      '"><script>window[\\'YOUVEBEENH4X0RED\\']=true;</script><div id="';
			
			    const attachedContainer = document.createElement('div');
			    document.body.appendChild(attachedContainer);
			
			    renderAComponentWithKeyIntoContainer(h4x0rKey, attachedContainer);
			
			    document.body.removeChild(attachedContainer);
			
			    // If we get this far, make sure we haven't executed the code
			    expect(window.YOUVEBEENH4X0RED).toBe(undefined);
			  \});
			
			  it('should let restructured components retain their uniqueness', () => \{
			    const instance0 = <span />;
			    const instance1 = <span />;
			    const instance2 = <span />;
			
			    class TestComponent extends React.Component \{
			      render() \{
			        return (
			          <div>
			            \{instance2\}
			            \{this.props.children[0]\}
			            \{this.props.children[1]\}
			          </div>
			        );
			      \}
			    \}
			
			    class TestContainer extends React.Component \{
			      render() \{
			        return (
			          <TestComponent>
			            \{instance0\}
			            \{instance1\}
			          </TestComponent>
			        );
			      \}
			    \}
			
			    expect(function() \{
			      ReactTestUtils.renderIntoDocument(<TestContainer />);
			    \}).not.toThrow();
			  \});
			
			  it('should let nested restructures retain their uniqueness', () => \{
			    const instance0 = <span />;
			    const instance1 = <span />;
			    const instance2 = <span />;
			
			    class TestComponent extends React.Component \{
			      render() \{
			        return (
			          <div>
			            \{instance2\}
			            \{this.props.children[0]\}
			            \{this.props.children[1]\}
			          </div>
			        );
			      \}
			    \}
			
			    class TestContainer extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <TestComponent>
			              \{instance0\}
			              \{instance1\}
			            </TestComponent>
			          </div>
			        );
			      \}
			    \}
			
			    expect(function() \{
			      ReactTestUtils.renderIntoDocument(<TestContainer />);
			    \}).not.toThrow();
			  \});
			
			  it('should let text nodes retain their uniqueness', () => \{
			    class TestComponent extends React.Component \{
			      render() \{
			        return (
			          <div>
			            \{this.props.children\}
			            <span />
			          </div>
			        );
			      \}
			    \}
			
			    class TestContainer extends React.Component \{
			      render() \{
			        return (
			          <TestComponent>
			            <div />
			            \{'second'\}
			          </TestComponent>
			        );
			      \}
			    \}
			
			    expect(function() \{
			      ReactTestUtils.renderIntoDocument(<TestContainer />);
			    \}).not.toThrow();
			  \});
			
			  it('should retain key during updates in composite components', () => \{
			    class TestComponent extends React.Component \{
			      render() \{
			        return <div>\{this.props.children\}</div>;
			      \}
			    \}
			
			    class TestContainer extends React.Component \{
			      state = \{swapped: false\};
			
			      swap = () => \{
			        this.setState(\{swapped: true\});
			      \};
			
			      render() \{
			        return (
			          <TestComponent>
			            \{this.state.swapped ? this.props.second : this.props.first\}
			            \{this.state.swapped ? this.props.first : this.props.second\}
			          </TestComponent>
			        );
			      \}
			    \}
			
			    const instance0 = <span key="A" />;
			    const instance1 = <span key="B" />;
			
			    let wrapped = <TestContainer first=\{instance0\} second=\{instance1\} />;
			
			    wrapped = ReactDOM.render(wrapped, document.createElement('div'));
			    const div = ReactDOM.findDOMNode(wrapped);
			
			    const beforeA = div.childNodes[0];
			    const beforeB = div.childNodes[1];
			    wrapped.swap();
			    const afterA = div.childNodes[1];
			    const afterB = div.childNodes[0];
			
			    expect(beforeA).toBe(afterA);
			    expect(beforeB).toBe(afterB);
			  \});
			
			  it('should not allow implicit and explicit keys to collide', () => \{
			    const component = (
			      <div>
			        <span />
			        <span key="0" />
			      </div>
			    );
			
			    expect(function() \{
			      ReactTestUtils.renderIntoDocument(component);
			    \}).not.toThrow();
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactIdentity-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactMount-test.js', () => {
        const sourceCode = `
			
			'use strict';
			
			
			let React;
			let ReactDOM;
			let ReactDOMServer;
			let ReactTestUtils;
			
			describe('ReactMount', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactDOMServer = require('react-server-renderer');
			    ReactTestUtils = require('test-utils');
			  \});
			
			  describe('unmountComponentAtNode', () => \{
			    it('throws when given a non-node', () => \{
			      const nodeArray = document.getElementsByTagName('div');
			      expect(() => \{
			        ReactDOM.unmountComponentAtNode(nodeArray);
			      \}).toThrow(
			        'container is not a element'
			      );
			    \});
			
			    it('returns false on non-React containers', () => \{
			      const d = document.createElement('div');
			      d.innerHTML = '<b>hellooo</b>';
			      expect(ReactDOM.unmountComponentAtNode(d)).toBe(false);
			      expect(d.textContent).toBe('hellooo');
			    \});
			
			    it('returns true on React containers', () => \{
			      const d = document.createElement('div');
			      ReactDOM.render(<b>hellooo</b>, d);
			      expect(d.textContent).toBe('hellooo');
			      expect(ReactDOM.unmountComponentAtNode(d)).toBe(true);
			      expect(d.textContent).toBe('');
			    \});
			  \});
			
			  it('warns when given a factory', () => \{
			    class Component extends React.Component \{
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    expect(() => ReactTestUtils.renderIntoDocument(Component)).toWarnDev(
			      'Functions are not valid as a React child. ' +
			      'This may happen if you return a Component instead of <Component /> from render. ' +
			      'Or maybe you meant to call this function rather than return it.',
			    );
			  \});
			
			  it('should render different components in same root', () => \{
			    const container = document.createElement('container');
			    document.body.appendChild(container);
			
			    ReactDOM.render(<div />, container);
			    expect(container.firstChild.nodeName).toBe('DIV');
			
			    ReactDOM.render(<span />, container);
			    expect(container.firstChild.nodeName).toBe('SPAN');
			  \});
			
			  it('should unmount and remount if the key changes', () => \{
			    const container = document.createElement('container');
			
			    const mockMount = jest.fn();
			    const mockUnmount = jest.fn();
			
			    class Component extends React.Component \{
			      componentDidMount = mockMount;
			      componentWillUnmount = mockUnmount;
			      render() \{
			        return <span>\{this.props.text\}</span>;
			      \}
			    \}
			
			    expect(mockMount.mock.calls.length).toBe(0);
			    expect(mockUnmount.mock.calls.length).toBe(0);
			
			    ReactDOM.render(<Component text="orange" key="A" />, container);
			    expect(container.firstChild.innerHTML).toBe('orange');
			    expect(mockMount.mock.calls.length).toBe(1);
			    expect(mockUnmount.mock.calls.length).toBe(0);
			
			    // If we change the key, the component is unmounted and remounted
			    ReactDOM.render(<Component text="green" key="B" />, container);
			    expect(container.firstChild.innerHTML).toBe('green');
			    expect(mockMount.mock.calls.length).toBe(2);
			    expect(mockUnmount.mock.calls.length).toBe(1);
			
			    // But if we don't change the key, the component instance is reused
			    ReactDOM.render(<Component text="blue" key="B" />, container);
			    expect(container.firstChild.innerHTML).toBe('blue');
			    expect(mockMount.mock.calls.length).toBe(2);
			    expect(mockUnmount.mock.calls.length).toBe(1);
			  \});
			
			  it('should reuse markup if rendering to the same target twice', () => \{
			    const container = document.createElement('container');
			    const instance1 = ReactDOM.render(<div />, container);
			    const instance2 = ReactDOM.render(<div />, container);
			
			    expect(instance1 === instance2).toBe(true);
			  \});
			
			  it('should warn if mounting into left padded rendered markup', () => \{
			    const container = document.createElement('container');
			    container.innerHTML = ReactDOMServer.renderToString(<div />) + ' ';
			
			    expect(() => ReactDOM.hydrate(<div />, container)).toWarnDev(
			      'Did not expect server HTML to contain the text node " " in <container>.',
			    );
			  \});
			
			  it('should warn if mounting into right padded rendered markup', () => \{
			    const container = document.createElement('container');
			    container.innerHTML = ' ' + ReactDOMServer.renderToString(<div />);
			
			    expect(() => ReactDOM.hydrate(<div />, container)).toWarnDev(
			      'Did not expect server HTML to contain the text node " " in <container>.',
			    );
			  \});
			
			  it('should not warn if mounting into non-empty node', () => \{
			    const container = document.createElement('container');
			    container.innerHTML = '<div></div>';
			
			    ReactDOM.render(<div />, container);
			  \});
			
			  it('should warn when mounting into document.body', () => \{
			    const iFrame = document.createElement('iframe');
			    document.body.appendChild(iFrame);
			
			    expect(() =>
			      ReactDOM.render(<div />, iFrame.contentDocument.body),
			    ).toWarnDev(
			      'Rendering components directly into document.body is discouraged',
			    );
			  \});
			
			  it('should account for escaping on a checksum mismatch', () => \{
			    const div = document.createElement('div');
			    const markup = ReactDOMServer.renderToString(
			      <div>This markup contains an nbsp entity: &nbsp; server text</div>,
			    );
			    div.innerHTML = markup;
			
			    expect(() =>
			      ReactDOM.hydrate(
			        <div>This markup contains an nbsp entity: &nbsp; client text</div>,
			        div,
			      ),
			    ).toWarnDev(
			      'Server: "This markup contains an nbsp entity:   server text" ' +
			      'Client: "This markup contains an nbsp entity:   client text"',
			    );
			  \});
			
			  it('should warn if render removes React-rendered children', () => \{
			    const container = document.createElement('container');
			
			    class Component extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <div />
			          </div>
			        );
			      \}
			    \}
			
			    ReactDOM.render(<Component />, container);
			
			    // Test that blasting away children throws a warning
			    const rootNode = container.firstChild;
			
			    expect(() => ReactDOM.render(<span />, rootNode)).toWarnDev(
			      'Warning: render(...): Replacing React-rendered children with a new ' +
			      'root component. If you intended to update the children of this node, ' +
			      'you should instead have the existing children update their state and ' +
			      'render the new components instead of calling ReactDOM.render.',
			    );
			  \});
			
			  it('should warn if the unmounted node was rendered by another copy of React', () => \{
			    jest.resetModules();
			    const ReactDOMOther = require('react-dom');
			    const container = document.createElement('div');
			
			    class Component extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <div />
			          </div>
			        );
			      \}
			    \}
			
			    ReactDOM.render(<Component />, container);
			    // Make sure ReactDOM and ReactDOMOther are different copies
			    //  expect(ReactDOM).not.toEqual(ReactDOMOther);
			
			    expect(() => ReactDOMOther.unmountComponentAtNode(container)).toWarnDev(
			      "Warning: unmountComponentAtNode(): The node you're attempting to unmount " +
			      'was rendered by another copy of React.',
			    );
			
			    // Don't throw a warning if the correct React copy unmounts the node
			    ReactDOM.unmountComponentAtNode(container);
			  \});
			
			  it('passes the correct callback context', () => \{
			    const container = document.createElement('div');
			    let calls = 0;
			
			    ReactDOM.render(<div />, container, function () \{
			      expect(this.nodeName).toBe('DIV');
			      calls++;
			    \});
			
			    // Update, no type change
			    ReactDOM.render(<div />, container, function () \{
			      expect(this.nodeName).toBe('DIV');
			      calls++;
			    \});
			
			    // Update, type change
			    ReactDOM.render(<span />, container, function () \{
			      expect(this.nodeName).toBe('SPAN');
			      calls++;
			    \});
			
			    // Batched update, no type change
			    ReactDOM.unstable_batchedUpdates(function () \{
			      ReactDOM.render(<span />, container, function () \{
			        expect(this.nodeName).toBe('SPAN');
			        calls++;
			      \});
			    \});
			
			    // Batched update, type change
			    ReactDOM.unstable_batchedUpdates(function () \{
			      ReactDOM.render(<article />, container, function () \{
			        expect(this.nodeName).toBe('ARTICLE');
			        calls++;
			      \});
			    \});
			
			    expect(calls).toBe(5);
			
			
			  \});
			
			  it(\`initial mount is sync inside batchedUpdates, but task work is deferred until \` +
			    \`the end of the batch\`, () => \{
			      const container1 = document.createElement('div');
			      const container2 = document.createElement('div');
			
			      class Foo extends React.Component \{
			        state = \{ active: false \};
			        componentDidMount() \{
			          this.setState(\{ active: true \});
			        \}
			        render() \{
			          return (
			            <div>\{this.props.children + (this.state.active ? '!' : '')\}</div>
			          );
			        \}
			      \}
			
			      ReactDOM.render(<div>1</div>, container1);
			
			      ReactDOM.unstable_batchedUpdates(() => \{
			        // Update. Does not flush yet.
			        ReactDOM.render(<div>2</div>, container1);
			        expect(container1.textContent).toEqual('1');
			
			        // Initial mount on another root. Should flush immediately.
			        ReactDOM.render(<Foo>a</Foo>, container2);
			        // The update did not flush yet.
			        expect(container1.textContent).toEqual('1');
			        // The initial mount flushed, but not the update scheduled in cDU.
			        expect(container2.textContent).toEqual('a');
			      \});
			      // All updates have flushed.
			      expect(container1.textContent).toEqual('2');
			      expect(container2.textContent).toEqual('a!');
			
			    \});
			
			  describe('mount point is a comment node', () => \{
			    return
			    let containerDiv;
			    let mountPoint;
			
			    beforeEach(() => \{
			      containerDiv = document.createElement('div');
			      containerDiv.innerHTML = 'A<!-- react-mount-point-unstable -->B';
			      mountPoint = containerDiv.childNodes[1];
			      expect(mountPoint.nodeType).toBe(COMMENT_NODE);
			    \});
			
			    it('renders at a comment node', () => \{
			      function Char(props) \{
			        return props.children;
			      \}
			      function list(chars) \{
			        return chars.split('').map(c => <Char key=\{c\}>\{c\}</Char>);
			      \}
			
			      ReactDOM.render(list('aeiou'), mountPoint);
			      expect(containerDiv.innerHTML).toBe(
			        'Aaeiou<!-- react-mount-point-unstable -->B',
			      );
			
			      ReactDOM.render(list('yea'), mountPoint);
			      expect(containerDiv.innerHTML).toBe(
			        'Ayea<!-- react-mount-point-unstable -->B',
			      );
			
			      ReactDOM.render(list(''), mountPoint);
			      expect(containerDiv.innerHTML).toBe(
			        'A<!-- react-mount-point-unstable -->B',
			      );
			    \});
			  \});
			  it("存在空组件", () => \{
			    const container = document.createElement('container');
			    class B extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{\};
			      \}
			      render() \{
			        return <b>bbb</b>;
			      \}
			    \}
			    class C extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{\};
			      \}
			      render() \{
			        return <b>ccc</b>;
			      \}
			    \}
			    function Empty() \{
			      return false;
			    \}
			    ReactDOM.render(
			      <div>
			        <strong>111</strong>
			        <strong>222</strong>
			        <Empty />
			        <Empty />
			        <B />
			        <C />
			      </div>, container
			    );
			    expect(container.textContent).toBe("111222bbbccc");
			    ReactDOM.unmountComponentAtNode(container)
			  \});
			  it("存在返回数组的组件", () => \{
			    const container = document.createElement('container');
			
			    class App extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{\};
			      \}
			      render() \{
			        return <div className="root">\{this.props.children\}</div>;
			      \}
			    \}
			    class A extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{\};
			      \}
			      render() \{
			        return [<a>aaa</a>, <a>bbb</a>, <a>ccc</a>, <a>ddd</a>];
			      \}
			    \}
			    function Last() \{
			      return <span>last</span>;
			    \}
			    function Empty() \{
			      return false;
			    \}
			    ReactDOM.render(
			      <div>
			        <strong>111</strong>
			        <App>
			          <A />
			        </App>
			        <Empty />
			        <Empty />
			        <Last />
			      </div>,
			      container
			    );
			    expect(container.textContent).toBe("111aaabbbcccdddlast");
			    ReactDOM.unmountComponentAtNode(container)
			  \});
			  it("返回false的组件不生成节点", () => \{
			    const container = document.createElement('container');
			    class Empty1 extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{\};
			      \}
			      render() \{
			        return false;
			      \}
			    \}
			
			    ReactDOM.render(<Empty1 />, container);
			    expect(container.textContent).toBe("");
			    ReactDOM.unmountComponentAtNode(container)
			  \});
			  it("返回null的组件不生成节点", () => \{
			    const container = document.createElement('container');
			    class Empty2 extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{\};
			      \}
			      render() \{
			        return null;
			      \}
			    \}
			
			    ReactDOM.render(<Empty2 />, container);
			    expect(container.textContent).toBe("");
			    ReactDOM.unmountComponentAtNode(container)
			  \});
			  it("返回true的组件不生成节点", () => \{
			    const container = document.createElement('container');
			    class Empty2 extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{\};
			      \}
			      render() \{
			        return true;
			      \}
			    \}
			
			    ReactDOM.render(<Empty2 />, container);
			    expect(container.textContent).toBe("");
			    ReactDOM.unmountComponentAtNode(container)
			  \});
			
			  it("对有key的元素进行重排", () => \{
			    const container = document.createElement('container');
			    class App extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{
			          a: 1
			        \};
			      \}
			      render() \{
			        return (<div>\{this.state.a ?
			          [<a key="a">111</a>, <a key="b">222</a>, <a key="c">333</a>] :
			          [<a key="c">333</a>, <a key="b">444</a>, <a key="a">111</a>]\}</div>);
			      \}
			    \}
			    let s = ReactDOM.render(<App />, container);
			    expect(container.textContent).toBe("111222333");
			    s.setState(\{ a: 0 \});
			    expect(container.textContent).toBe("333444111");
			    ReactDOM.unmountComponentAtNode(container)
			  \});
			  it("对有key的组件进行重排", () => \{
			    const container = document.createElement('container');
			
			    function A(props) \{
			      return <span>\{props.value\}</span>;
			    \}
			    class App extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{
			          a: 1
			        \};
			      \}
			      render() \{
			        return (<div>\{this.state.a ?
			          [<A key="a" value="1" />, <A key="b" value="2" />, <A key="c" value="3" />] :
			          [<A key="c" value="3" />, <A key="b" value="2" />, <A key="a" value="1" />]\}</div>);
			      \}
			    \}
			    var s = ReactDOM.render(<App />, container);
			    expect(container.textContent).toBe("123");
			    s.setState(\{ a: 0 \});
			    expect(container.textContent).toBe("321");
			    ReactDOM.unmountComponentAtNode(container);
			
			
			  \});
			  it("同一个元素节点中两个组件更新", () => \{
			    const container = document.createElement('container');
			    class Wrap extends React.Component \{
			      render()\{
			          return this.props.children
			      \}
			   \}
			    var values = [111, 222, 333, 444]
			    class App extends React.Component \{
			      state = \{
			        text: 111
			      \}
			      render() \{
			
			        return <div ref="div"><TextArea id="text1" value=\{values.shift()\} /><div id="div">\{this.state.text\}</div>
			          <Wrap><TextArea id="text2" value=\{values.shift()\} /></Wrap></div>
			      \}
			    \}
			    class TextArea extends React.Component \{
			      state = \{
			        text: 222
			      \}
			      componentDidMount() \{
			
			        this.setState(\{
			          text: 222
			        \})
			      \}
			      render() \{
			
			        return <textarea id=\{this.props.id\} value=\{this.props.value\}></textarea>
			      \}
			    \}
			
			
			
			    var instance = ReactDOM.render(<App id="app" />, container);
			
			    expect(Array.from(instance.refs.div.children).map(function (el) \{
			      return el.id
			    \})).toEqual(["text1", "div", "text2"])
			
			  \})
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactMount-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(25)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactMountDestruction-test.js', () => {
        const sourceCode = `
			const React = require('react');
			const ReactDOM = require('react-dom');
			
			describe('ReactMount', () => \{
			  it('should destroy a react root upon request', () => \{
			    const mainContainerDiv = document.createElement('div');
			    document.body.appendChild(mainContainerDiv);
			
			    const instanceOne = <div className="firstReactDiv" />;
			    const firstRootDiv = document.createElement('div');
			    mainContainerDiv.appendChild(firstRootDiv);
			    ReactDOM.render(instanceOne, firstRootDiv);
			
			    const instanceTwo = <div className="secondReactDiv" />;
			    const secondRootDiv = document.createElement('div');
			    mainContainerDiv.appendChild(secondRootDiv);
			    ReactDOM.render(instanceTwo, secondRootDiv);
			
			    // Test that two react roots are rendered in isolation
			    expect(firstRootDiv.firstChild.className).toBe('firstReactDiv');
			    expect(secondRootDiv.firstChild.className).toBe('secondReactDiv');
			
			    // Test that after unmounting each, they are no longer in the document.
			    ReactDOM.unmountComponentAtNode(firstRootDiv);
			    expect(firstRootDiv.firstChild).toBeNull();
			    ReactDOM.unmountComponentAtNode(secondRootDiv);
			    expect(secondRootDiv.firstChild).toBeNull();
			  \});
			
			  it('should warn when unmounting a non-container root node', () => \{
			    const mainContainerDiv = document.createElement('div');
			
			    const component = (
			      <div>
			        <div />
			      </div>
			    );
			    ReactDOM.render(component, mainContainerDiv);
			
			    // Test that unmounting at a root node gives a helpful warning
			    const rootDiv = mainContainerDiv.firstChild;
			    expect(() => ReactDOM.unmountComponentAtNode(rootDiv)).toWarnDev(
			      "Warning: unmountComponentAtNode(): The node you're attempting to " +
			        'unmount was rendered by React and is not a top-level container. You ' +
			        'may have accidentally passed in a React root node instead of its ' +
			        'container.',
			    );
			  \});
			
			  it('should warn when unmounting a non-container, non-root node', () => \{
			    const mainContainerDiv = document.createElement('div');
			
			    const component = (
			      <div>
			        <div>
			          <div />
			        </div>
			      </div>
			    );
			    ReactDOM.render(component, mainContainerDiv);
			
			    // Test that unmounting at a non-root node gives a different warning
			    const nonRootDiv = mainContainerDiv.firstChild.firstChild;
			    expect(() => ReactDOM.unmountComponentAtNode(nonRootDiv)).toWarnDev(
			      "Warning: unmountComponentAtNode(): The node you're attempting to " +
			        'unmount was rendered by React and is not a top-level container. ' +
			        'Instead, have the parent component update its state and rerender in ' +
			        'order to remove this component.',
			    );
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactMountDestruction-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactMultiChild-test.js', () => {
        const sourceCode = `
			
			/**
			 * Copyright (c) 2013-present, Facebook, Inc.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 *
			 * @emails react-core
			 */
			
			'use strict';
			
			describe('ReactMultiChild', () => \{
			  let React;
			  let ReactDOM;
			
			  beforeEach(() => \{
			    jest.resetModules();
			    React = require('react');
			    ReactDOM = require('react-dom');
			  \});
			
			  describe('reconciliation', () => \{
			    it('should update children when possible', () => \{
			      const container = document.createElement('div');
			
			      const mockMount = jest.fn();
			      const mockUpdate = jest.fn();
			      const mockUnmount = jest.fn();
			
			      class MockComponent extends React.Component \{
			        componentDidMount = mockMount;
			        componentDidUpdate = mockUpdate;
			        componentWillUnmount = mockUnmount;
			        render() \{
			          return <span />;
			        \}
			      \}
			
			      expect(mockMount.mock.calls.length).toBe(0);
			      expect(mockUpdate.mock.calls.length).toBe(0);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			
			      ReactDOM.render(
			        <div>
			          <MockComponent />
			        </div>,
			        container,
			      );
			
			      expect(mockMount.mock.calls.length).toBe(1);
			      expect(mockUpdate.mock.calls.length).toBe(0);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			
			      ReactDOM.render(
			        <div>
			          <MockComponent />
			        </div>,
			        container,
			      );
			
			      expect(mockMount.mock.calls.length).toBe(1);
			      expect(mockUpdate.mock.calls.length).toBe(1);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			    \});
			
			    it('should replace children with different constructors', () => \{
			      const container = document.createElement('div');
			
			      const mockMount = jest.fn();
			      const mockUnmount = jest.fn();
			
			      class MockComponent extends React.Component \{
			        componentDidMount = mockMount;
			        componentWillUnmount = mockUnmount;
			        render() \{
			          return <span />;
			        \}
			      \}
			
			      expect(mockMount.mock.calls.length).toBe(0);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			
			      ReactDOM.render(
			        <div>
			          <MockComponent />
			        </div>,
			        container,
			      );
			
			      expect(mockMount.mock.calls.length).toBe(1);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			
			      ReactDOM.render(
			        <div>
			          <span />
			        </div>,
			        container,
			      );
			
			      expect(mockMount.mock.calls.length).toBe(1);
			      expect(mockUnmount.mock.calls.length).toBe(1);
			    \});
			
			    it('should NOT replace children with different owners', () => \{
			      const container = document.createElement('div');
			
			      const mockMount = jest.fn();
			      const mockUnmount = jest.fn();
			
			      class MockComponent extends React.Component \{
			        componentDidMount = mockMount;
			        componentWillUnmount = mockUnmount;
			        render() \{
			          return <span />;
			        \}
			      \}
			
			      class WrapperComponent extends React.Component \{
			        render() \{
			          return this.props.children || <MockComponent />;
			        \}
			      \}
			
			      expect(mockMount.mock.calls.length).toBe(0);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			
			      ReactDOM.render(<WrapperComponent />, container);
			
			      expect(mockMount.mock.calls.length).toBe(1);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			
			      ReactDOM.render(
			        <WrapperComponent>
			          <MockComponent />
			        </WrapperComponent>,
			        container,
			      );
			
			      expect(mockMount.mock.calls.length).toBe(1);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			    \});
			
			    it('should replace children with different keys', () => \{
			      const container = document.createElement('div');
			
			      const mockMount = jest.fn();
			      const mockUnmount = jest.fn();
			
			      class MockComponent extends React.Component \{
			        componentDidMount = mockMount;
			        componentWillUnmount = mockUnmount;
			        render() \{
			          return <span />;
			        \}
			      \}
			
			      expect(mockMount.mock.calls.length).toBe(0);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			
			      ReactDOM.render(
			        <div>
			          <MockComponent key="A" />
			        </div>,
			        container,
			      );
			
			      expect(mockMount.mock.calls.length).toBe(1);
			      expect(mockUnmount.mock.calls.length).toBe(0);
			
			      ReactDOM.render(
			        <div>
			          <MockComponent key="B" />
			        </div>,
			        container,
			      );
			
			      expect(mockMount.mock.calls.length).toBe(2);
			      expect(mockUnmount.mock.calls.length).toBe(1);
			    \});
			
			    it('should warn for duplicated array keys with component stack info', () => \{
			      const container = document.createElement('div');
			
			      class WrapperComponent extends React.Component \{
			        render() \{
			          return <div>\{this.props.children\}</div>;
			        \}
			      \}
			
			      class Parent extends React.Component \{
			        render() \{
			          return (
			            <div>
			              <WrapperComponent>\{this.props.children\}</WrapperComponent>
			            </div>
			          );
			        \}
			      \}
			
			      ReactDOM.render(<Parent>\{[<div key="1" />]\}</Parent>, container);
			
			      expect(() =>
			        ReactDOM.render(
			          <Parent>\{[<div key="1" />, <div key="1" />]\}</Parent>,
			          container,
			        ),
			      ).toWarnDev(
			        'Encountered two children with the same key, \`1\`. ' +
			          'Keys should be unique so that components maintain their identity ' +
			          'across updates. Non-unique keys may cause children to be ' +
			          'duplicated and/or omitted — the behavior is unsupported and ' +
			          'could change in a future version.',
			        '    in div (at **)\\n' +
			          '    in WrapperComponent (at **)\\n' +
			          '    in div (at **)\\n' +
			          '    in Parent (at **)',
			      );
			    \});
			
			    it('should warn for duplicated iterable keys with component stack info', () => \{
			      const container = document.createElement('div');
			
			      class WrapperComponent extends React.Component \{
			        render() \{
			          return <div>\{this.props.children\}</div>;
			        \}
			      \}
			
			      class Parent extends React.Component \{
			        render() \{
			          return (
			            <div>
			              <WrapperComponent>\{this.props.children\}</WrapperComponent>
			            </div>
			          );
			        \}
			      \}
			
			      function createIterable(array) \{
			        return \{
			          '@@iterator': function() \{
			            let i = 0;
			            return \{
			              next() \{
			                const next = \{
			                  value: i < array.length ? array[i] : undefined,
			                  done: i === array.length,
			                \};
			                i++;
			                return next;
			              \},
			            \};
			          \},
			        \};
			      \}
			
			      ReactDOM.render(
			        <Parent>\{createIterable([<div key="1" />])\}</Parent>,
			        container,
			      );
			
			      expect(() =>
			        ReactDOM.render(
			          <Parent>\{createIterable([<div key="1" />, <div key="1" />])\}</Parent>,
			          container,
			        ),
			      ).toWarnDev(
			        'Encountered two children with the same key, \`1\`. ' +
			          'Keys should be unique so that components maintain their identity ' +
			          'across updates. Non-unique keys may cause children to be ' +
			          'duplicated and/or omitted — the behavior is unsupported and ' +
			          'could change in a future version.',
			        '    in div (at **)\\n' +
			          '    in WrapperComponent (at **)\\n' +
			          '    in div (at **)\\n' +
			          '    in Parent (at **)',
			      );
			    \});
			  \});
			
			  it('should warn for using maps as children with owner info', () => \{
			    class Parent extends React.Component \{
			      render() \{
			        return <div>\{new Map([['foo', 0], ['bar', 1]])\}</div>;
			      \}
			    \}
			    const container = document.createElement('div');
			    expect(() => ReactDOM.render(<Parent />, container)).toWarnDev(
			      'Warning: Using Maps as children is unsupported and will likely yield ' +
			        'unexpected results. Convert it to a sequence/iterable of keyed ' +
			        'ReactElements instead.\\n' +
			        '    in div (at **)\\n' +
			        '    in Parent (at **)',
			    );
			  \});
			
			  it('should reorder bailed-out children', () => \{
			    class LetterInner extends React.Component \{
			      render() \{
			        return <div>\{this.props.char\}</div>;
			      \}
			    \}
			
			    class Letter extends React.Component \{
			      render() \{
			        return <LetterInner char=\{this.props.char\} />;
			      \}
			      shouldComponentUpdate() \{
			        return false;
			      \}
			    \}
			
			    class Letters extends React.Component \{
			      render() \{
			        const letters = this.props.letters.split('');
			        return <div>\{letters.map(c => <Letter key=\{c\} char=\{c\} />)\}</div>;
			      \}
			    \}
			
			    const container = document.createElement('div');
			
			    // Two random strings -- some additions, some removals, some moves
			    ReactDOM.render(<Letters letters="XKwHomsNjIkBcQWFbiZU" />, container);
			    expect(container.textContent).toBe('XKwHomsNjIkBcQWFbiZU');
			    ReactDOM.render(<Letters letters="EHCjpdTUuiybDvhRJwZt" />, container);
			    expect(container.textContent).toBe('EHCjpdTUuiybDvhRJwZt');
			  \});
			
			  it('prepares new children before unmounting old', () => \{
			    const log = [];
			
			    class Spy extends React.Component \{
			      UNSAFE_componentWillMount() \{
			        log.push(this.props.name + ' componentWillMount');
			      \}
			      render() \{
			        log.push(this.props.name + ' render');
			        return <div />;
			      \}
			      componentDidMount() \{
			        log.push(this.props.name + ' componentDidMount');
			      \}
			      componentWillUnmount() \{
			        log.push(this.props.name + ' componentWillUnmount');
			      \}
			    \}
			
			    // These are reference-unequal so they will be swapped even if they have
			    // matching keys
			    const SpyA = props => <Spy \{...props\} />;
			    const SpyB = props => <Spy \{...props\} />;
			
			    const container = document.createElement('div');
			    ReactDOM.render(
			      <div>
			        <SpyA key="one" name="oneA" />
			        <SpyA key="two" name="twoA" />
			      </div>,
			      container,
			    );
			    ReactDOM.render(
			      <div>
			        <SpyB key="one" name="oneB" />
			        <SpyB key="two" name="twoB" />
			      </div>,
			      container,
			    );
			
			    expect(log).toEqual([
			      'oneA componentWillMount',
			      'oneA render',
			      'twoA componentWillMount',
			      'twoA render',
			      'oneA componentDidMount',
			      'twoA componentDidMount',
			
			      'oneB componentWillMount',
			      'oneB render',
			      'twoB componentWillMount',
			      'twoB render',
			      'oneA componentWillUnmount',
			      'twoA componentWillUnmount',
			
			      'oneB componentDidMount',
			      'twoB componentDidMount',
			    ]);
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactMultiChild-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactMultiChildReconcile-test.js', () => {
        const sourceCode = `
			const React = require('react');
			const ReactDOM = require('react-dom');
			
			const stripEmptyValues = function(obj) \{
			  const ret = \{\};
			  for (const name in obj) \{
			    if (!obj.hasOwnProperty(name)) \{
			      continue;
			    \}
			    if (obj[name] !== null && obj[name] !== undefined) \{
			      ret[name] = obj[name];
			    \}
			  \}
			  return ret;
			\};
			
			let idCounter = 123;
			
			/**
			 * Contains internal static internal state in order to test that updates to
			 * existing children won't reinitialize components, when moving children -
			 * reusing existing DOM/memory resources.
			 */
			class StatusDisplay extends React.Component \{
			  state = \{internalState: idCounter++\};
			
			  getStatus() \{
			    return this.props.status;
			  \}
			
			  getInternalState() \{
			    return this.state.internalState;
			  \}
			
			  componentDidMount() \{
			    this.props.onFlush();
			  \}
			
			  componentDidUpdate() \{
			    this.props.onFlush();
			  \}
			
			  render() \{
			    return <div>\{this.props.contentKey\}</div>;
			  \}
			\}
			
			/**
			 * Displays friends statuses.
			 */
			class FriendsStatusDisplay extends React.Component \{
			  /**
			   * Gets the order directly from each rendered child's \`index\` field.
			   * Refs are not maintained in the rendered order, and neither is
			   * \`this._renderedChildren\` (surprisingly).
			   */
			  getOriginalKeys() \{
			    const originalKeys = [];
			    for (const key in this.props.usernameToStatus) \{
			      if (this.props.usernameToStatus[key]) \{
			        originalKeys.push(key);
			      \}
			    \}
			    return originalKeys;
			  \}
			
			  /**
			   * Retrieves the rendered children in a nice format for comparing to the input
			   * \`this.props.usernameToStatus\`.
			   */
			  getStatusDisplays() \{
			    const res = \{\};
			    const originalKeys = this.getOriginalKeys();
			    for (let i = 0; i < originalKeys.length; i++) \{
			      const key = originalKeys[i];
			      res[key] = this.refs[key];
			    \}
			    return res;
			  \}
			
			  /**
			   * Verifies that by the time a child is flushed, the refs that appeared
			   * earlier have already been resolved.
			   * TODO: This assumption will likely break with incremental reconciler
			   * but our internal layer API depends on this assumption. We need to change
			   * it to be more declarative before making ref resolution indeterministic.
			   */
			  verifyPreviousRefsResolved(flushedKey) \{
			    const originalKeys = this.getOriginalKeys();
			    for (let i = 0; i < originalKeys.length; i++) \{
			      const key = originalKeys[i];
			      if (key === flushedKey) \{
			        // We are only interested in children up to the current key.
			        return;
			      \}
			      expect(this.refs[key]).toBeTruthy();
			    \}
			  \}
			
			  render() \{
			    const children = [];
			    for (const key in this.props.usernameToStatus) \{
			      const status = this.props.usernameToStatus[key];
			      children.push(
			        !status ? null : (
			          <StatusDisplay
			            key=\{key\}
			            ref=\{key\}
			            contentKey=\{key\}
			            onFlush=\{this.verifyPreviousRefsResolved.bind(this, key)\}
			            status=\{status\}
			          />
			        ),
			      );
			    \}
			    const childrenToRender = this.props.prepareChildren(children);
			    return <div>\{childrenToRender\}</div>;
			  \}
			\}
			
			function getInternalStateByUserName(statusDisplays) \{
			  return Object.keys(statusDisplays).reduce((acc, key) => \{
			    acc[key] = statusDisplays[key].getInternalState();
			    return acc;
			  \}, \{\});
			\}
			
			/**
			 * Verifies that the rendered \`StatusDisplay\` instances match the \`props\` that
			 * were responsible for allocating them. Checks the content of the user's status
			 * message as well as the order of them.
			 */
			function verifyStatuses(statusDisplays, props) \{
			  const nonEmptyStatusDisplays = stripEmptyValues(statusDisplays);
			  const nonEmptyStatusProps = stripEmptyValues(props.usernameToStatus);
			  let username;
			  expect(Object.keys(nonEmptyStatusDisplays).length).toEqual(
			    Object.keys(nonEmptyStatusProps).length,
			  );
			  for (username in nonEmptyStatusDisplays) \{
			    if (!nonEmptyStatusDisplays.hasOwnProperty(username)) \{
			      continue;
			    \}
			    expect(nonEmptyStatusDisplays[username].getStatus()).toEqual(
			      nonEmptyStatusProps[username],
			    );
			  \}
			
			  // now go the other way to make sure we got them all.
			  for (username in nonEmptyStatusProps) \{
			    if (!nonEmptyStatusProps.hasOwnProperty(username)) \{
			      continue;
			    \}
			    expect(nonEmptyStatusDisplays[username].getStatus()).toEqual(
			      nonEmptyStatusProps[username],
			    );
			  \}
			
			  expect(Object.keys(nonEmptyStatusDisplays)).toEqual(
			    Object.keys(nonEmptyStatusProps),
			  );
			\}
			
			/**
			 * For all statusDisplays that existed in the previous iteration of the
			 * sequence, verify that the state has been preserved. \`StatusDisplay\` contains
			 * a unique number that allows us to track internal state across ordering
			 * movements.
			 */
			function verifyStatesPreserved(lastInternalStates, statusDisplays) \{
			  let key;
			  for (key in statusDisplays) \{
			    if (!statusDisplays.hasOwnProperty(key)) \{
			      continue;
			    \}
			    if (lastInternalStates[key]) \{
			      expect(lastInternalStates[key]).toEqual(
			        statusDisplays[key].getInternalState(),
			      );
			    \}
			  \}
			\}
			
			/**
			 * Verifies that the internal representation of a set of \`renderedChildren\`
			 * accurately reflects what is in the DOM.
			 */
			function verifyDomOrderingAccurate(outerContainer, statusDisplays) \{
			  const containerNode = outerContainer.firstChild;
			  const statusDisplayNodes = containerNode.childNodes;
			  const orderedDomKeys = [];
			  for (let i = 0; i < statusDisplayNodes.length; i++) \{
			    const contentKey = statusDisplayNodes[i].textContent;
			    orderedDomKeys.push(contentKey);
			  \}
			
			  const orderedLogicalKeys = [];
			  let username;
			  for (username in statusDisplays) \{
			    if (!statusDisplays.hasOwnProperty(username)) \{
			      continue;
			    \}
			    const statusDisplay = statusDisplays[username];
			    orderedLogicalKeys.push(statusDisplay.props.contentKey);
			  \}
			  expect(orderedDomKeys).toEqual(orderedLogicalKeys);
			\}
			
			function testPropsSequenceWithPreparedChildren(sequence, prepareChildren) \{
			  const container = document.createElement('div');
			  const parentInstance = ReactDOM.render(
			    <FriendsStatusDisplay \{...sequence[0]\} prepareChildren=\{prepareChildren\} />,
			    container,
			  );
			  let statusDisplays = parentInstance.getStatusDisplays();
			  let lastInternalStates = getInternalStateByUserName(statusDisplays);
			  verifyStatuses(statusDisplays, sequence[0]);
			
			  for (let i = 1; i < sequence.length; i++) \{
			    ReactDOM.render(
			      <FriendsStatusDisplay
			        \{...sequence[i]\}
			        prepareChildren=\{prepareChildren\}
			      />,
			      container,
			    );
			    statusDisplays = parentInstance.getStatusDisplays();
			    verifyStatuses(statusDisplays, sequence[i]);
			    verifyStatesPreserved(lastInternalStates, statusDisplays);
			    verifyDomOrderingAccurate(container, statusDisplays);
			
			    lastInternalStates = getInternalStateByUserName(statusDisplays);
			  \}
			\}
			
			function prepareChildrenArray(childrenArray) \{
			  return childrenArray;
			\}
			
			function prepareChildrenIterable(childrenArray) \{
			  return \{
			    '@@iterator': function*() \{
			      // eslint-disable-next-line no-for-of-loops/no-for-of-loops
			      for (const child of childrenArray) \{
			        yield child;
			      \}
			    \},
			  \};
			\}
			
			function testPropsSequence(sequence) \{
			  testPropsSequenceWithPreparedChildren(sequence, prepareChildrenArray);
			  testPropsSequenceWithPreparedChildren(sequence, prepareChildrenIterable);
			\}
			
			describe('ReactMultiChildReconcile', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			  \});
			
			  it('should reset internal state if removed then readded in an array', () => \{
			    // Test basics.
			    const props = \{
			      usernameToStatus: \{
			        jcw: 'jcwStatus',
			      \},
			    \};
			
			    const container = document.createElement('div');
			    const parentInstance = ReactDOM.render(
			      <FriendsStatusDisplay
			        \{...props\}
			        prepareChildren=\{prepareChildrenArray\}
			      />,
			      container,
			    );
			    let statusDisplays = parentInstance.getStatusDisplays();
			    const startingInternalState = statusDisplays.jcw.getInternalState();
			
			    // Now remove the child.
			    ReactDOM.render(
			      <FriendsStatusDisplay prepareChildren=\{prepareChildrenArray\} />,
			      container,
			    );
			    statusDisplays = parentInstance.getStatusDisplays();
			    expect(statusDisplays.jcw).toBeFalsy();
			
			    // Now reset the props that cause there to be a child
			    ReactDOM.render(
			      <FriendsStatusDisplay
			        \{...props\}
			        prepareChildren=\{prepareChildrenArray\}
			      />,
			      container,
			    );
			    statusDisplays = parentInstance.getStatusDisplays();
			    expect(statusDisplays.jcw).toBeTruthy();
			    expect(statusDisplays.jcw.getInternalState()).not.toBe(
			      startingInternalState,
			    );
			  \});
			
			  it('should reset internal state if removed then readded in an iterable', () => \{
			    // Test basics.
			    const props = \{
			      usernameToStatus: \{
			        jcw: 'jcwStatus',
			      \},
			    \};
			
			    const container = document.createElement('div');
			    const parentInstance = ReactDOM.render(
			      <FriendsStatusDisplay
			        \{...props\}
			        prepareChildren=\{prepareChildrenIterable\}
			      />,
			      container,
			    );
			    let statusDisplays = parentInstance.getStatusDisplays();
			    const startingInternalState = statusDisplays.jcw.getInternalState();
			
			    // Now remove the child.
			    ReactDOM.render(
			      <FriendsStatusDisplay prepareChildren=\{prepareChildrenIterable\} />,
			      container,
			    );
			    statusDisplays = parentInstance.getStatusDisplays();
			    expect(statusDisplays.jcw).toBeFalsy();
			
			    // Now reset the props that cause there to be a child
			    ReactDOM.render(
			      <FriendsStatusDisplay
			        \{...props\}
			        prepareChildren=\{prepareChildrenIterable\}
			      />,
			      container,
			    );
			    statusDisplays = parentInstance.getStatusDisplays();
			    expect(statusDisplays.jcw).toBeTruthy();
			    expect(statusDisplays.jcw.getInternalState()).not.toBe(
			      startingInternalState,
			    );
			  \});
			
			  it('should create unique identity', () => \{
			    // Test basics.
			    const usernameToStatus = \{
			      jcw: 'jcwStatus',
			      awalke: 'awalkeStatus',
			      bob: 'bobStatus',
			    \};
			
			    testPropsSequence([\{usernameToStatus: usernameToStatus\}]);
			  \});
			
			  it('should preserve order if children order has not changed', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwstatus2',
			          jordanjcw: 'jordanjcwstatus2',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should transition from zero to one children correctly', () => \{
			    const PROPS_SEQUENCE = [
			      \{usernameToStatus: \{\}\},
			      \{
			        usernameToStatus: \{
			          first: 'firstStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should transition from one to zero children correctly', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          first: 'firstStatus',
			        \},
			      \},
			      \{usernameToStatus: \{\}\},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should transition from one child to null children', () => \{
			    testPropsSequence([
			      \{
			        usernameToStatus: \{
			          first: 'firstStatus',
			        \},
			      \},
			      \{\},
			    ]);
			  \});
			
			  it('should transition from null children to one child', () => \{
			    testPropsSequence([
			      \{\},
			      \{
			        usernameToStatus: \{
			          first: 'firstStatus',
			        \},
			      \},
			    ]);
			  \});
			
			  it('should transition from zero children to null children', () => \{
			    testPropsSequence([
			      \{
			        usernameToStatus: \{\},
			      \},
			      \{\},
			    ]);
			  \});
			
			  it('should transition from null children to zero children', () => \{
			    testPropsSequence([
			      \{\},
			      \{
			        usernameToStatus: \{\},
			      \},
			    ]);
			  \});
			
			  /**
			   * \`FriendsStatusDisplay\` renders nulls as empty children (it's a convention
			   * of \`FriendsStatusDisplay\`, nothing related to React or these test cases.
			   */
			  it('should remove nulled out children at the beginning', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: null,
			          jordanjcw: 'jordanjcwstatus2',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should remove nulled out children at the end', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwstatus2',
			          jordanjcw: null,
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should reverse the order of two children', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          userTwo: 'userTwoStatus',
			          userOne: 'userOneStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should reverse the order of more than two children', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          userThree: 'userThreeStatus',
			          userTwo: 'userTwoStatus',
			          userOne: 'userOneStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should cycle order correctly', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			          userFour: 'userFourStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			          userFour: 'userFourStatus',
			          userOne: 'userOneStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          userThree: 'userThreeStatus',
			          userFour: 'userFourStatus',
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          userFour: 'userFourStatus',
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          // Full circle!
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			          userFour: 'userFourStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should cycle order correctly in the other direction', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			          userFour: 'userFourStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          userFour: 'userFourStatus',
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          userThree: 'userThreeStatus',
			          userFour: 'userFourStatus',
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			          userFour: 'userFourStatus',
			          userOne: 'userOneStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          // Full circle!
			          userOne: 'userOneStatus',
			          userTwo: 'userTwoStatus',
			          userThree: 'userThreeStatus',
			          userFour: 'userFourStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should remove nulled out children and ignore new null children', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jordanjcw: 'jordanjcwstatus2',
			          jcw: null,
			          another: null,
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should remove nulled out children and reorder remaining', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			          john: 'johnStatus', // john will go away
			          joe: 'joeStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jordanjcw: 'jordanjcwStatus',
			          joe: 'joeStatus',
			          jcw: 'jcwStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should append children to the end', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			          jordanjcwnew: 'jordanjcwnewStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should append multiple children to the end', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			          jordanjcwnew: 'jordanjcwnewStatus',
			          jordanjcwnew2: 'jordanjcwnewStatus2',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should prepend children to the beginning', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          newUsername: 'newUsernameStatus',
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should prepend multiple children to the beginning', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          newNewUsername: 'newNewUsernameStatus',
			          newUsername: 'newUsernameStatus',
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should not prepend an empty child to the beginning', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          emptyUsername: null,
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should not append an empty child to the end', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			          emptyUsername: null,
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should not insert empty children in the middle', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwstatus2',
			          skipOverMe: null,
			          skipOverMeToo: null,
			          definitelySkipOverMe: null,
			          jordanjcw: 'jordanjcwstatus2',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should insert one new child in the middle', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwstatus2',
			          insertThis: 'insertThisStatus',
			          jordanjcw: 'jordanjcwstatus2',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should insert multiple new truthy children in the middle', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwstatus2',
			          insertThis: 'insertThisStatus',
			          insertThisToo: 'insertThisTooStatus',
			          definitelyInsertThisToo: 'definitelyInsertThisTooStatus',
			          jordanjcw: 'jordanjcwstatus2',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			
			  it('should insert non-empty children in middle where nulls were', () => \{
			    const PROPS_SEQUENCE = [
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwStatus',
			          insertThis: null,
			          insertThisToo: null,
			          definitelyInsertThisToo: null,
			          jordanjcw: 'jordanjcwStatus',
			        \},
			      \},
			      \{
			        usernameToStatus: \{
			          jcw: 'jcwstatus2',
			          insertThis: 'insertThisStatus',
			          insertThisToo: 'insertThisTooStatus',
			          definitelyInsertThisToo: 'definitelyInsertThisTooStatus',
			          jordanjcw: 'jordanjcwstatus2',
			        \},
			      \},
			    ];
			    testPropsSequence(PROPS_SEQUENCE);
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactMultiChildReconcile-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(28)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactStatelessComponent-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let PropTypes;
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			function StatelessComponent(props) \{
			  return <div>\{props.name\}</div>;
			\}
			
			describe('ReactStatelessComponent', () => \{
			  beforeEach(() => \{
			    jest.resetModuleRegistry();
			    PropTypes = require('prop-types');
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			  \});
			
			  it('should render stateless component', () => \{
			    const el = document.createElement('div');
			    ReactDOM.render(<StatelessComponent name="A" />, el);
			
			    expect(el.textContent).toBe('A');
			  \});
			
			  it('should update stateless component', () => \{
			    class Parent extends React.Component \{
			      render() \{
			        return <StatelessComponent \{...this.props\} />;
			      \}
			    \}
			
			    const el = document.createElement('div');
			    ReactDOM.render(<Parent name="A" />, el);
			    expect(el.textContent).toBe('A');
			
			    ReactDOM.render(<Parent name="B" />, el);
			    expect(el.textContent).toBe('B');
			  \});
			
			  it('should unmount stateless component', () => \{
			    const container = document.createElement('div');
			
			    ReactDOM.render(<StatelessComponent name="A" />, container);
			    expect(container.textContent).toBe('A');
			
			    ReactDOM.unmountComponentAtNode(container);
			    expect(container.textContent).toBe('');
			  \});
			
			  it('should pass context thru stateless component', () => \{
			    class Child extends React.Component \{
			      static contextTypes = \{
			        test: PropTypes.string.isRequired,
			      \};
			
			      render() \{
			        return <div>\{this.context.test\}</div>;
			      \}
			    \}
			
			    function Parent() \{
			      return <Child />;
			    \}
			
			    class GrandParent extends React.Component \{
			      static childContextTypes = \{
			        test: PropTypes.string.isRequired,
			      \};
			
			      getChildContext() \{
			        return \{test: this.props.test\};
			      \}
			
			      render() \{
			        return <Parent />;
			      \}
			    \}
			
			    const el = document.createElement('div');
			    ReactDOM.render(<GrandParent test="test" />, el);
			
			    expect(el.textContent).toBe('test');
			
			    ReactDOM.render(<GrandParent test="mest" />, el);
			
			    expect(el.textContent).toBe('mest');
			  \});
			
			  it('should warn for getDerivedStateFromProps on a functional component', () => \{
			    function StatelessComponentWithChildContext() \{
			      return null;
			    \}
			    StatelessComponentWithChildContext.getDerivedStateFromProps = function() \{\};
			
			    const container = document.createElement('div');
			
			    expect(() =>
			      ReactDOM.render(<StatelessComponentWithChildContext />, container),
			    ).toWarnDev(
			      'StatelessComponentWithChildContext: Stateless ' +
			        'functional components do not support getDerivedStateFromProps.',
			    );
			  \});
			
			  it('should warn for childContextTypes on a functional component', () => \{
			    function StatelessComponentWithChildContext(props) \{
			      return <div>\{props.name\}</div>;
			    \}
			
			    StatelessComponentWithChildContext.childContextTypes = \{
			      foo: PropTypes.string,
			    \};
			
			    const container = document.createElement('div');
			
			    expect(() =>
			      ReactDOM.render(
			        <StatelessComponentWithChildContext name="A" />,
			        container,
			      ),
			    ).toWarnDev(
			      'StatelessComponentWithChildContext(...): childContextTypes cannot ' +
			        'be defined on a functional component.',
			    );
			  \});
			
			  it('should throw when stateless component returns undefined', () => \{
			    function NotAComponent() \{\}
			  
			      ReactTestUtils.renderIntoDocument(
			        <div>
			          <NotAComponent />
			        </div>,
			      );
			    
			  \});
			
			  it('should throw on string refs in pure functions', () => \{
			    function Child() \{
			      return <div ref="me" />;
			    \}
			
			      ReactTestUtils.renderIntoDocument(<Child test="test" />);
			
			  \});
			
			  it('should warn when given a string ref', () => \{
			    function Indirection(props) \{
			      return <div>\{props.children\}</div>;
			    \}
			
			    class ParentUsingStringRef extends React.Component \{
			      render() \{
			        return (
			          <Indirection>
			            <StatelessComponent name="A" ref="stateless" />
			          </Indirection>
			        );
			      \}
			    \}
			
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<ParentUsingStringRef />),
			    ).toWarnDev(
			      'Warning: Stateless function components cannot be given refs. ' +
			        'Attempts to access this ref will fail.\\n\\nCheck the render method ' +
			        'of \`ParentUsingStringRef\`.\\n' +
			        '    in StatelessComponent (at **)\\n' +
			        '    in div (at **)\\n' +
			        '    in Indirection (at **)\\n' +
			        '    in ParentUsingStringRef (at **)',
			    );
			
			    // No additional warnings should be logged
			    ReactTestUtils.renderIntoDocument(<ParentUsingStringRef />);
			  \});
			
			  it('should warn when given a function ref', () => \{
			    function Indirection(props) \{
			      return <div>\{props.children\}</div>;
			    \}
			
			    class ParentUsingFunctionRef extends React.Component \{
			      render() \{
			        return (
			          <Indirection>
			            <StatelessComponent
			              name="A"
			              ref=\{arg => \{
			                expect(arg).toBe(null);
			              \}\}
			            />
			          </Indirection>
			        );
			      \}
			    \}
			
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<ParentUsingFunctionRef />),
			    ).toWarnDev(
			      'Warning: Stateless function components cannot be given refs. ' +
			        'Attempts to access this ref will fail.\\n\\nCheck the render method ' +
			        'of \`ParentUsingFunctionRef\`.\\n' +
			        '    in StatelessComponent (at **)\\n' +
			        '    in div (at **)\\n' +
			        '    in Indirection (at **)\\n' +
			        '    in ParentUsingFunctionRef (at **)',
			    );
			
			    // No additional warnings should be logged
			    ReactTestUtils.renderIntoDocument(<ParentUsingFunctionRef />);
			  \});
			
			  it('deduplicates ref warnings based on element or owner', () => \{
			    // When owner uses JSX, we can use exact line location to dedupe warnings
			    class AnonymousParentUsingJSX extends React.Component \{
			      render() \{
			        return <StatelessComponent name="A" ref=\{() => \{\}\} />;
			      \}
			    \}
			    Object.defineProperty(AnonymousParentUsingJSX, 'name', \{value: undefined\});
			
			    let instance1;
			
			    expect(() => \{
			      instance1 = ReactTestUtils.renderIntoDocument(
			        <AnonymousParentUsingJSX />,
			      );
			    \}).toWarnDev(
			      'Warning: Stateless function components cannot be given refs.',
			    );
			    // Should be deduped (offending element is on the same line):
			    instance1.forceUpdate();
			    // Should also be deduped (offending element is on the same line):
			    ReactTestUtils.renderIntoDocument(<AnonymousParentUsingJSX />);
			
			    // When owner doesn't use JSX, and is anonymous, we warn once per internal instance.
			    class AnonymousParentNotUsingJSX extends React.Component \{
			      render() \{
			        return React.createElement(StatelessComponent, \{
			          name: 'A',
			          ref: () => \{\},
			        \});
			      \}
			    \}
			    Object.defineProperty(AnonymousParentNotUsingJSX, 'name', \{
			      value: undefined,
			    \});
			
			    let instance2;
			    expect(() => \{
			      instance2 = ReactTestUtils.renderIntoDocument(
			        <AnonymousParentNotUsingJSX />,
			      );
			    \}).toWarnDev(
			      'Warning: Stateless function components cannot be given refs.',
			    );
			    // Should be deduped (same internal instance, no additional warnings)
			    instance2.forceUpdate();
			    // Could not be deduped (different internal instance):
			    expect(() =>
			      ReactTestUtils.renderIntoDocument(<AnonymousParentNotUsingJSX />),
			    ).toWarnDev('Warning: Stateless function components cannot be given refs.');
			
			    // When owner doesn't use JSX, but is named, we warn once per owner name
			    class NamedParentNotUsingJSX extends React.Component \{
			      render() \{
			        return React.createElement(StatelessComponent, \{
			          name: 'A',
			          ref: () => \{\},
			        \});
			      \}
			    \}
			    let instance3;
			    expect(() => \{
			      instance3 = ReactTestUtils.renderIntoDocument(<NamedParentNotUsingJSX />);
			    \}).toWarnDev(
			      'Warning: Stateless function components cannot be given refs.',
			    );
			    // Should be deduped (same owner name, no additional warnings):
			    instance3.forceUpdate();
			    // Should also be deduped (same owner name, no additional warnings):
			    ReactTestUtils.renderIntoDocument(<NamedParentNotUsingJSX />);
			  \});
			
			  // This guards against a regression caused by clearing the current debug fiber.
			  // https://github.com/facebook/react/issues/10831
			  it('should warn when giving a function ref with context', () => \{
			    function Child() \{
			      return null;
			    \}
			    Child.contextTypes = \{
			      foo: PropTypes.string,
			    \};
			
			    class Parent extends React.Component \{
			      static childContextTypes = \{
			        foo: PropTypes.string,
			      \};
			      getChildContext() \{
			        return \{
			          foo: 'bar',
			        \};
			      \}
			      render() \{
			        return <Child ref=\{function() \{\}\} />;
			      \}
			    \}
			
			    expect(() => ReactTestUtils.renderIntoDocument(<Parent />)).toWarnDev(
			      'Warning: Stateless function components cannot be given refs. ' +
			        'Attempts to access this ref will fail.\\n\\nCheck the render method ' +
			        'of \`Parent\`.\\n' +
			        '    in Child (at **)\\n' +
			        '    in Parent (at **)',
			    );
			  \});
			
			  it('should provide a null ref', () => \{
			    function Child() \{
			      return <div />;
			    \}
			
			    const comp = ReactTestUtils.renderIntoDocument(<Child />);
			    expect(!!comp).toBe(true);
			  \});
			
			  it('should use correct name in key warning', () => \{
			    function Child() \{
			      return <div>\{[<span />]\}</div>;
			    \}
			
			    expect(() => ReactTestUtils.renderIntoDocument(<Child />)).toWarnDev(
			      'Each child in an array or iterator should have a unique "key" prop.\\n\\n' +
			        'Check the render method of \`Child\`.',
			    );
			  \});
			
			  it('should support default props and prop types', () => \{
			    function Child(props) \{
			      return <div>\{props.test\}</div>;
			    \}
			    Child.defaultProps = \{test: 2\};
			    Child.propTypes = \{test: PropTypes.string\};
			
			    expect(() => ReactTestUtils.renderIntoDocument(<Child />)).toWarnDev(
			      'Warning: Failed prop type: Invalid prop \`test\` of type \`number\` ' +
			        'supplied to \`Child\`, expected \`string\`.\\n' +
			        '    in Child (at **)',
			    );
			  \});
			
			  it('should receive context', () => \{
			    class Parent extends React.Component \{
			      static childContextTypes = \{
			        lang: PropTypes.string,
			      \};
			
			      getChildContext() \{
			        return \{lang: 'en'\};
			      \}
			
			      render() \{
			        return <Child />;
			      \}
			    \}
			
			    function Child(props, context) \{
			      return <div>\{context.lang\}</div>;
			    \}
			    Child.contextTypes = \{lang: PropTypes.string\};
			
			    const el = document.createElement('div');
			    ReactDOM.render(<Parent />, el);
			    expect(el.textContent).toBe('en');
			  \});
			
			  it('should work with arrow functions', () => \{
			    let Child = function() \{
			      return <div />;
			    \};
			    // Will create a new bound function without a prototype, much like a native
			    // arrow function.
			    Child = Child.bind(this);
			
			    expect(() => ReactTestUtils.renderIntoDocument(<Child />)).not.toThrow();
			  \});
			
			  it('should allow simple functions to return null', () => \{
			    const Child = function() \{
			      return null;
			    \};
			    expect(() => ReactTestUtils.renderIntoDocument(<Child />)).not.toThrow();
			  \});
			
			  it('should allow simple functions to return false', () => \{
			    function Child() \{
			      return false;
			    \}
			    expect(() => ReactTestUtils.renderIntoDocument(<Child />)).not.toThrow();
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactStatelessComponent-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(19)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactTestUtils-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let createRenderer;
			let React;
			let ReactDOM;
			let ReactDOMServer;
			let ReactTestUtils;
			
			function getTestDocument(markup) \{
			  const doc = document.implementation.createHTMLDocument('');
			  doc.open();
			  doc.write(
			    markup ||
			      '<!doctype html><html><meta charset=utf-8><title>test doc</title>',
			  );
			  doc.close();
			  return doc;
			\}
			
			describe('ReactTestUtils', () => \{
			  beforeEach(() => \{
			   // createRenderer = require('react-test-renderer/shallow').createRenderer;
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactDOMServer = require('react-server-renderer');
			    ReactTestUtils = require('test-utils');
			  \});
			
			  it('Simulate should have locally attached media events', () => \{
			    expect(Object.keys(ReactTestUtils.Simulate).sort()).toMatchSnapshot();
			  \});
			
			  it('SimulateNative should have locally attached media events', () => \{
			    expect(Object.keys(ReactTestUtils.SimulateNative).sort()).toMatchSnapshot();
			  \});
			
			  it('gives Jest mocks a passthrough implementation with mockComponent()', () => \{
			    class MockedComponent extends React.Component \{
			      render() \{
			        throw new Error('Should not get here.');
			      \}
			    \}
			    // This is close enough to what a Jest mock would give us.
			    MockedComponent.prototype.render = jest.fn();
			
			    // Patch it up so it returns its children.
			    ReactTestUtils.mockComponent(MockedComponent);
			
			    const container = document.createElement('div');
			    ReactDOM.render(<MockedComponent>Hello</MockedComponent>, container);
			    expect(container.textContent).toBe('Hello');
			  \});
			
			  it('can scryRenderedComponentsWithType', () => \{
			    class Child extends React.Component \{
			      render() \{
			        return null;
			      \}
			    \}
			    class Wrapper extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <Child />
			          </div>
			        );
			      \}
			    \}
			    const renderedComponent = ReactTestUtils.renderIntoDocument(<Wrapper />);
			    const scryResults = ReactTestUtils.scryRenderedComponentsWithType(
			      renderedComponent,
			      Child,
			    );
			    expect(scryResults.length).toBe(1);
			  \});
			
			  it('can scryRenderedDOMComponentsWithClass with TextComponent', () => \{
			    class Wrapper extends React.Component \{
			      render() \{
			        return (
			          <div>
			            Hello <span>Jim</span>
			          </div>
			        );
			      \}
			    \}
			
			    const renderedComponent = ReactTestUtils.renderIntoDocument(<Wrapper />);
			    const scryResults = ReactTestUtils.scryRenderedDOMComponentsWithClass(
			      renderedComponent,
			      'NonExistentClass',
			    );
			    expect(scryResults.length).toBe(0);
			  \});
			
			  it('can scryRenderedDOMComponentsWithClass with className contains \\\\n', () => \{
			    class Wrapper extends React.Component \{
			      render() \{
			        return (
			          <div>
			            Hello <span className=\{'x\\ny'\}>Jim</span>
			          </div>
			        );
			      \}
			    \}
			
			    const renderedComponent = ReactTestUtils.renderIntoDocument(<Wrapper />);
			    const scryResults = ReactTestUtils.scryRenderedDOMComponentsWithClass(
			      renderedComponent,
			      'x',
			    );
			    expect(scryResults.length).toBe(1);
			  \});
			
			  it('can scryRenderedDOMComponentsWithClass with multiple classes', () => \{
			    class Wrapper extends React.Component \{
			      render() \{
			        return (
			          <div>
			            Hello <span className=\{'x y z'\}>Jim</span>
			          </div>
			        );
			      \}
			    \}
			
			    const renderedComponent = ReactTestUtils.renderIntoDocument(<Wrapper />);
			    const scryResults1 = ReactTestUtils.scryRenderedDOMComponentsWithClass(
			      renderedComponent,
			      'x y',
			    );
			    expect(scryResults1.length).toBe(1);
			
			    const scryResults2 = ReactTestUtils.scryRenderedDOMComponentsWithClass(
			      renderedComponent,
			      'x z',
			    );
			    expect(scryResults2.length).toBe(1);
			
			    const scryResults3 = ReactTestUtils.scryRenderedDOMComponentsWithClass(
			      renderedComponent,
			      ['x', 'y'],
			    );
			    expect(scryResults3.length).toBe(1);
			
			    expect(scryResults1[0]).toBe(scryResults2[0]);
			    expect(scryResults1[0]).toBe(scryResults3[0]);
			
			    const scryResults4 = ReactTestUtils.scryRenderedDOMComponentsWithClass(
			      renderedComponent,
			      ['x', 'a'],
			    );
			    expect(scryResults4.length).toBe(0);
			
			    const scryResults5 = ReactTestUtils.scryRenderedDOMComponentsWithClass(
			      renderedComponent,
			      ['x a'],
			    );
			    expect(scryResults5.length).toBe(0);
			  \});
			
			  it('traverses children in the correct order', () => \{
			    class Wrapper extends React.Component \{
			      render() \{
			        return <div>\{this.props.children\}</div>;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    ReactDOM.render(
			      <Wrapper>
			        \{null\}
			        <div>purple</div>
			      </Wrapper>,
			      container,
			    );
			    const tree = ReactDOM.render(
			      <Wrapper>
			        <div>orange</div>
			        <div>purple</div>
			      </Wrapper>,
			      container,
			    );
			
			    const log = [];
			    ReactTestUtils.findAllInRenderedTree(tree, function(child) \{
			      if (ReactTestUtils.isDOMComponent(child)) \{
			        log.push(ReactDOM.findDOMNode(child).textContent);
			      \}
			    \});
			
			    // Should be document order, not mount order (which would be purple, orange)
			    expect(log).toEqual(['orangepurple', 'orange', 'purple']);
			  \});
			
			  it('should support injected wrapper components as DOM components', () => \{
			    const injectedDOMComponents = [
			      'button',
			      'form',
			      'iframe',
			      'img',
			      'input',
			      'option',
			      'select',
			      'textarea',
			    ];
			
			    injectedDOMComponents.forEach(function(type) \{
			      const testComponent = ReactTestUtils.renderIntoDocument(
			        React.createElement(type),
			      );
			      expect(testComponent.tagName).toBe(type.toUpperCase());
			      expect(ReactTestUtils.isDOMComponent(testComponent)).toBe(true);
			    \});
			
			    // Full-page components (html, head, body) can't be rendered into a div
			    // directly...
			    class Root extends React.Component \{
			      render() \{
			        return (
			          <html ref="html">
			            <head ref="head">
			              <title>hello</title>
			            </head>
			            <body ref="body">hello, world</body>
			          </html>
			        );
			      \}
			    \}
			
			    const markup = ReactDOMServer.renderToString(<Root />);
			    const testDocument = getTestDocument(markup);
			    const component = ReactDOM.hydrate(<Root />, testDocument);
			
			    expect(component.refs.html.tagName).toBe('HTML');
			    expect(component.refs.head.tagName).toBe('HEAD');
			    expect(component.refs.body.tagName).toBe('BODY');
			    expect(ReactTestUtils.isDOMComponent(component.refs.html)).toBe(true);
			    expect(ReactTestUtils.isDOMComponent(component.refs.head)).toBe(true);
			    expect(ReactTestUtils.isDOMComponent(component.refs.body)).toBe(true);
			  \});
			
			  it('can scry with stateless components involved', () => \{
			    const Stateless = () => (
			      <div>
			        <hr />
			      </div>
			    );
			
			    class SomeComponent extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <Stateless />
			            <hr />
			          </div>
			        );
			      \}
			    \}
			
			    const inst = ReactTestUtils.renderIntoDocument(<SomeComponent />);
			    const hrs = ReactTestUtils.scryRenderedDOMComponentsWithTag(inst, 'hr');
			    expect(hrs.length).toBe(2);
			  \});
			
			  describe('Simulate', () => \{
			    it('should change the value of an input field', () => \{
			      const obj = \{
			        handler: function(e) \{
			          e.persist();
			        \},
			      \};
			      spyOnDevAndProd(obj, 'handler').and.callThrough();
			      const container = document.createElement('div');
			      const instance = ReactDOM.render(
			        <input type="text" onChange=\{obj.handler\} />,
			        container,
			      );
			
			      const node = ReactDOM.findDOMNode(instance);
			      node.value = 'giraffe';
			      ReactTestUtils.Simulate.change(node);
			
			      expect(obj.handler).toHaveBeenCalledWith(
			        jasmine.objectContaining(\{target: node\}),
			      );
			    \});
			
			    it('should change the value of an input field in a component', () => \{
			      class SomeComponent extends React.Component \{
			        render() \{
			          return (
			            <div>
			              <input
			                type="text"
			                ref="input"
			                onChange=\{this.props.handleChange\}
			              />
			            </div>
			          );
			        \}
			      \}
			
			      const obj = \{
			        handler: function(e) \{
			          e.persist();
			        \},
			      \};
			      spyOnDevAndProd(obj, 'handler').and.callThrough();
			      const container = document.createElement('div');
			      const instance = ReactDOM.render(
			        <SomeComponent handleChange=\{obj.handler\} />,
			        container,
			      );
			
			      const node = ReactDOM.findDOMNode(instance.refs.input);
			      node.value = 'zebra';
			      ReactTestUtils.Simulate.change(node);
			
			      expect(obj.handler).toHaveBeenCalledWith(
			        jasmine.objectContaining(\{target: node\}),
			      );
			    \});
			
			    it('should throw when attempting to use a React element', () => \{
			     /* class SomeComponent extends React.Component \{
			        render() \{
			          return <div onClick=\{this.props.handleClick\}>hello, world.</div>;
			        \}
			      \}
			
			      const handler = jasmine.createSpy('spy');
			      const shallowRenderer = createRenderer();
			      const result = shallowRenderer.render(
			        <SomeComponent handleClick=\{handler\} />,
			      );
			
			      expect(() => ReactTestUtils.Simulate.click(result)).toThrowError(
			        'TestUtils.Simulate expected a DOM node as the first argument but received ' +
			          'a React element. Pass the DOM node you wish to simulate the event on instead. ' +
			          'Note that TestUtils.Simulate will not work if you are using shallow rendering.',
			      );
			      expect(handler).not.toHaveBeenCalled();*/
			    \});
			
			    it('should throw when attempting to use a component instance', () => \{
			      class SomeComponent extends React.Component \{
			        render() \{
			          return <div onClick=\{this.props.handleClick\}>hello, world.</div>;
			        \}
			      \}
			
			      const handler = jasmine.createSpy('spy');
			      const container = document.createElement('div');
			      const instance = ReactDOM.render(
			        <SomeComponent handleClick=\{handler\} />,
			        container,
			      );
			
			      expect(() => ReactTestUtils.Simulate.click(instance)).toThrowError(
			        '第一个参数必须为元素节点',
			      );
			      expect(handler).not.toHaveBeenCalled();
			    \});
			
			    it('should not warn when used with extra properties', () => \{
			      const CLIENT_X = 100;
			
			      class Component extends React.Component \{
			        handleClick = e => \{
			          expect(e.clientX).toBe(CLIENT_X);
			        \};
			
			        render() \{
			          return <div onClick=\{this.handleClick\} />;
			        \}
			      \}
			
			      const element = document.createElement('div');
			      const instance = ReactDOM.render(<Component />, element);
			      ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance), \{
			        clientX: CLIENT_X,
			      \});
			    \});
			
			    it('should set the type of the event', () => \{
			      let event;
			      const stub = jest.genMockFn().mockImplementation(e => \{
			        e.persist();
			        event = e;
			      \});
			
			      const container = document.createElement('div');
			      const instance = ReactDOM.render(<div onKeyDown=\{stub\} />, container);
			      const node = ReactDOM.findDOMNode(instance);
			
			      ReactTestUtils.Simulate.keyDown(node);
			
			      expect(event.type).toBe('keydown');
			      expect(event.nativeEvent.type).toBe('keydown');
			    \});
			
			    it('should work with renderIntoDocument', () => \{
			      const onChange = jest.fn();
			
			      class MyComponent extends React.Component \{
			        render() \{
			          return (
			            <div>
			              <input type="text" onChange=\{onChange\} />
			            </div>
			          );
			        \}
			      \}
			
			      const instance = ReactTestUtils.renderIntoDocument(<MyComponent />);
			      const input = ReactTestUtils.findRenderedDOMComponentWithTag(
			        instance,
			        'input',
			      );
			      input.value = 'giraffe';
			      ReactTestUtils.Simulate.change(input);
			
			      expect(onChange).toHaveBeenCalledWith(
			        jasmine.objectContaining(\{target: input\}),
			      );
			    \});
			  \});
			
			  it('should call setState callback with no arguments', () => \{
			    let mockArgs;
			    class Component extends React.Component \{
			      componentDidMount() \{
			        this.setState(\{\}, (...args) => (mockArgs = args));
			      \}
			      render() \{
			        return false;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Component />);
			    expect(mockArgs.length).toEqual(0);
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactTestUtils-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(18)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactUpdates-test.js', () => {
        const sourceCode = `
			
			'use strict';
			
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			describe('ReactUpdates', () => \{
			  beforeEach(() => \{
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			  \});
			
			  it('should batch state when updating state twice', () => \{
			    let updateCount = 0;
			
			    class Component extends React.Component \{
			      state = \{x: 0\};
			
			      componentDidUpdate() \{
			        updateCount++;
			      \}
			
			      render() \{
			        return <div>\{this.state.x\}</div>;
			      \}
			    \}
			
			    const instance = ReactTestUtils.renderIntoDocument(<Component />);
			    expect(instance.state.x).toBe(0);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      instance.setState(\{x: 1\});
			      instance.setState(\{x: 2\});
			      expect(instance.state.x).toBe(0);
			      expect(updateCount).toBe(0);
			    \});
			
			    expect(instance.state.x).toBe(2);
			    expect(updateCount).toBe(1);
			  \});
			
			  it('should batch state when updating two different state keys', () => \{
			    let updateCount = 0;
			
			    class Component extends React.Component \{
			      state = \{x: 0, y: 0\};
			
			      componentDidUpdate() \{
			        updateCount++;
			      \}
			
			      render() \{
			        return (
			          <div>
			            (\{this.state.x\}, \{this.state.y\})
			          </div>
			        );
			      \}
			    \}
			
			    const instance = ReactTestUtils.renderIntoDocument(<Component />);
			    expect(instance.state.x).toBe(0);
			    expect(instance.state.y).toBe(0);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      instance.setState(\{x: 1\});
			      instance.setState(\{y: 2\});
			      expect(instance.state.x).toBe(0);
			      expect(instance.state.y).toBe(0);
			      expect(updateCount).toBe(0);
			    \});
			
			    expect(instance.state.x).toBe(1);
			    expect(instance.state.y).toBe(2);
			    expect(updateCount).toBe(1);
			  \});
			
			  it('should batch state and props together', () => \{
			    let updateCount = 0;
			
			    class Component extends React.Component \{
			      state = \{y: 0\};
			
			      componentDidUpdate() \{
			        updateCount++;
			      \}
			
			      render() \{
			        return (
			          <div>
			            (\{this.props.x\}, \{this.state.y\})
			          </div>
			        );
			      \}
			    \}
			
			    const container = document.createElement('div');
			    const instance = ReactDOM.render(<Component x=\{0\} />, container);
			    expect(instance.props.x).toBe(0);
			    expect(instance.state.y).toBe(0);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      ReactDOM.render(<Component x=\{1\} />, container);
			      instance.setState(\{y: 2\});
			      expect(instance.props.x).toBe(0);
			      expect(instance.state.y).toBe(0);
			      expect(updateCount).toBe(0);
			    \});
			
			    expect(instance.props.x).toBe(1);
			    expect(instance.state.y).toBe(2);
			    expect(updateCount).toBe(1);
			  \});
			
			  it('should batch parent/child state updates together', () => \{
			    let parentUpdateCount = 0;
			
			    class Parent extends React.Component \{
			      state = \{x: 0\};
			
			      componentDidUpdate() \{
			        parentUpdateCount++;
			      \}
			
			      render() \{
			        return (
			          <div>
			            <Child ref="child" x=\{this.state.x\} />
			          </div>
			        );
			      \}
			    \}
			
			    let childUpdateCount = 0;
			
			    class Child extends React.Component \{
			      state = \{y: 0\};
			
			      componentDidUpdate() \{
			        childUpdateCount++;
			      \}
			
			      render() \{
			        return <div>\{this.props.x + this.state.y\}</div>;
			      \}
			    \}
			
			    const instance = ReactTestUtils.renderIntoDocument(<Parent />);
			    const child = instance.refs.child;
			    expect(instance.state.x).toBe(0);
			    expect(child.state.y).toBe(0);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      instance.setState(\{x: 1\});
			      child.setState(\{y: 2\});
			      expect(instance.state.x).toBe(0);
			      expect(child.state.y).toBe(0);
			      expect(parentUpdateCount).toBe(0);
			      expect(childUpdateCount).toBe(0);
			    \});
			
			    expect(instance.state.x).toBe(1);
			    expect(child.state.y).toBe(2);
			    expect(parentUpdateCount).toBe(1);
			    expect(childUpdateCount).toBe(1);
			  \});
			
			  it('should batch child/parent state updates together', () => \{
			    let parentUpdateCount = 0;
			
			    class Parent extends React.Component \{
			      state = \{x: 0\};
			
			      componentDidUpdate() \{
			        parentUpdateCount++;
			      \}
			
			      render() \{
			        return (
			          <div>
			            <Child ref="child" x=\{this.state.x\} />
			          </div>
			        );
			      \}
			    \}
			
			    let childUpdateCount = 0;
			
			    class Child extends React.Component \{
			      state = \{y: 0\};
			
			      componentDidUpdate() \{
			        childUpdateCount++;
			      \}
			
			      render() \{
			        return <div>\{this.props.x + this.state.y\}</div>;
			      \}
			    \}
			
			    const instance = ReactTestUtils.renderIntoDocument(<Parent />);
			    const child = instance.refs.child;
			    expect(instance.state.x).toBe(0);
			    expect(child.state.y).toBe(0);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      child.setState(\{y: 2\});
			      instance.setState(\{x: 1\});
			      expect(instance.state.x).toBe(0);
			      expect(child.state.y).toBe(0);
			      expect(parentUpdateCount).toBe(0);
			      expect(childUpdateCount).toBe(0);
			    \});
			
			    expect(instance.state.x).toBe(1);
			    expect(child.state.y).toBe(2);
			    expect(parentUpdateCount).toBe(1);
			
			    // Batching reduces the number of updates here to 1.
			    expect(childUpdateCount).toBe(1);
			  \});
			
			  it('should support chained state updates', () => \{
			    
			    let updateCount = 0;
			
			    class Component extends React.Component \{
			      state = \{x: 0\};
			
			      componentDidUpdate() \{
			        updateCount++;
			      \}
			
			      render() \{
			        return <div>\{this.state.x\}</div>;
			      \}
			    \}
			
			    const instance = ReactTestUtils.renderIntoDocument(<Component />);
			    expect(instance.state.x).toBe(0);
			
			    let innerCallbackRun = false;
			    ReactDOM.unstable_batchedUpdates(function() \{
			      instance.setState(\{x: 1\}, function() \{
			        instance.setState(\{x: 2\}, function() \{
			          expect(this).toBe(instance);
			          innerCallbackRun = true;
			          expect(instance.state.x).toBe(2);
			          expect(updateCount).toBe(2);
			        \});
			        expect(instance.state.x).toBe(1);
			        expect(updateCount).toBe(1);
			      \});
			      expect(instance.state.x).toBe(0);
			      expect(updateCount).toBe(0);
			    \});
			
			    expect(innerCallbackRun).toBeTruthy();
			    expect(instance.state.x).toBe(2);
			    expect(updateCount).toBe(2);
			  \});
			
			  it('should batch forceUpdate together', () => \{
			    let shouldUpdateCount = 0;
			    let updateCount = 0;
			
			    class Component extends React.Component \{
			      state = \{x: 0\};
			
			      shouldComponentUpdate() \{
			        shouldUpdateCount++;
			      \}
			
			      componentDidUpdate() \{
			        updateCount++;
			      \}
			
			      render() \{
			        return <div>\{this.state.x\}</div>;
			      \}
			    \}
			
			    const instance = ReactTestUtils.renderIntoDocument(<Component />);
			    expect(instance.state.x).toBe(0);
			
			    let callbacksRun = 0;
			    ReactDOM.unstable_batchedUpdates(function() \{
			      instance.setState(\{x: 1\}, function() \{
			        callbacksRun++;
			      \});
			      instance.forceUpdate(function() \{
			        callbacksRun++;
			      \});
			      expect(instance.state.x).toBe(0);
			      expect(updateCount).toBe(0);
			    \});
			
			    expect(callbacksRun).toBe(2);
			    // shouldComponentUpdate shouldn't be called since we're forcing
			    expect(shouldUpdateCount).toBe(0);
			    expect(instance.state.x).toBe(1);
			    expect(updateCount).toBe(1);
			  \});
			
			  it('should update children even if parent blocks updates', () => \{
			    let parentRenderCount = 0;
			    let childRenderCount = 0;
			
			    class Parent extends React.Component \{
			      shouldComponentUpdate() \{
			        return false;
			      \}
			
			      render() \{
			        parentRenderCount++;
			        return <Child ref="child" />;
			      \}
			    \}
			
			    class Child extends React.Component \{
			      render() \{
			        childRenderCount++;
			        return <div />;
			      \}
			    \}
			
			    expect(parentRenderCount).toBe(0);
			    expect(childRenderCount).toBe(0);
			
			    let instance = <Parent />;
			    instance = ReactTestUtils.renderIntoDocument(instance);
			
			    expect(parentRenderCount).toBe(1);
			    expect(childRenderCount).toBe(1);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      instance.setState(\{x: 1\});
			    \});
			
			    expect(parentRenderCount).toBe(1);
			    expect(childRenderCount).toBe(1);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      instance.refs.child.setState(\{x: 1\});
			    \});
			
			    expect(parentRenderCount).toBe(1);
			    expect(childRenderCount).toBe(2);
			  \});
			
			  it('should not reconcile children passed via props', () => \{
			    let numMiddleRenders = 0;
			    let numBottomRenders = 0;
			
			    class Top extends React.Component \{
			      render() \{
			        return (
			          <Middle>
			            <Bottom />
			          </Middle>
			        );
			      \}
			    \}
			
			    class Middle extends React.Component \{
			      componentDidMount() \{
			        this.forceUpdate();
			      \}
			
			      render() \{
			        numMiddleRenders++;
			        return React.Children.only(this.props.children);
			      \}
			    \}
			
			    class Bottom extends React.Component \{
			      render() \{
			        numBottomRenders++;
			        return null;
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Top />);
			    expect(numMiddleRenders).toBe(2);
			    expect(numBottomRenders).toBe(1);
			  \});
			
			  it('should flow updates correctly', () => \{
			    let willUpdates = [];
			    let didUpdates = [];
			
			    const UpdateLoggingMixin = \{
			      UNSAFE_componentWillUpdate: function() \{
			        willUpdates.push(this.constructor.displayName);
			      \},
			      componentDidUpdate: function() \{
			        didUpdates.push(this.constructor.displayName);
			      \},
			    \};
			
			    class Box extends React.Component \{
			      render() \{
			        return <div ref="boxDiv">\{this.props.children\}</div>;
			      \}
			    \}
			    Object.assign(Box.prototype, UpdateLoggingMixin);
			
			    class Child extends React.Component \{
			      render() \{
			        return <span ref="span">child</span>;
			      \}
			    \}
			    Object.assign(Child.prototype, UpdateLoggingMixin);
			
			    class Switcher extends React.Component \{
			      state = \{tabKey: 'hello'\};
			      render() \{
			        const child = this.props.children;
			
			        return (
			          <Box ref="box">
			            <div
			              ref="switcherDiv"
			              style=\{\{
			                display: this.state.tabKey === child.key ? '' : 'none',
			              \}\}>
			              \{child\}
			            </div>
			          </Box>
			        );
			      \}
			    \}
			    Object.assign(Switcher.prototype, UpdateLoggingMixin);
			
			    class App extends React.Component \{
			      render() \{
			        return (
			          <Switcher ref="switcher">
			            <Child key="hello" ref="child" />
			          </Switcher>
			        );
			      \}
			    \}
			    Object.assign(App.prototype, UpdateLoggingMixin);
			
			    let root = <App />;
			    root = ReactTestUtils.renderIntoDocument(root);
			
			    function expectUpdates(desiredWillUpdates, desiredDidUpdates) \{
			      let i;
			      for (i = 0; i < desiredWillUpdates; i++) \{
			        expect(willUpdates).toContain(desiredWillUpdates[i]);
			      \}
			      for (i = 0; i < desiredDidUpdates; i++) \{
			        expect(didUpdates).toContain(desiredDidUpdates[i]);
			      \}
			      willUpdates = [];
			      didUpdates = [];
			    \}
			
			    function triggerUpdate(c) \{
			      c.setState(\{x: 1\});
			    \}
			
			    function testUpdates(components, desiredWillUpdates, desiredDidUpdates) \{
			      let i;
			
			      ReactDOM.unstable_batchedUpdates(function() \{
			        for (i = 0; i < components.length; i++) \{
			          triggerUpdate(components[i]);
			        \}
			      \});
			
			      expectUpdates(desiredWillUpdates, desiredDidUpdates);
			
			      // Try them in reverse order
			
			      ReactDOM.unstable_batchedUpdates(function() \{
			        for (i = components.length - 1; i >= 0; i--) \{
			          triggerUpdate(components[i]);
			        \}
			      \});
			
			      expectUpdates(desiredWillUpdates, desiredDidUpdates);
			    \}
			    testUpdates(
			      [root.refs.switcher.refs.box, root.refs.switcher],
			      // Owner-child relationships have inverse will and did
			      ['Switcher', 'Box'],
			      ['Box', 'Switcher'],
			    );
			
			    testUpdates(
			      [root.refs.child, root.refs.switcher.refs.box],
			      // Not owner-child so reconcile independently
			      ['Box', 'Child'],
			      ['Box', 'Child'],
			    );
			
			    testUpdates(
			      [root.refs.child, root.refs.switcher],
			      // Switcher owns Box and Child, Box does not own Child
			      ['Switcher', 'Box', 'Child'],
			      ['Box', 'Switcher', 'Child'],
			    );
			  \});
			
			  it('should queue mount-ready handlers across different roots', () => \{
			    // We'll define two components A and B, then update both of them. When A's
			    // componentDidUpdate handlers is called, B's DOM should already have been
			    // updated.
			
			    const bContainer = document.createElement('div');
			
			    let a;
			    let b;
			
			    let aUpdated = false;
			
			    class A extends React.Component \{
			      state = \{x: 0\};
			
			      componentDidUpdate() \{
			        expect(ReactDOM.findDOMNode(b).textContent).toBe('B1');
			        aUpdated = true;
			      \}
			
			      render() \{
			        let portal = null;
			        // If we're using Fiber, we use Portals instead to achieve this.
			        portal = ReactDOM.createPortal(<B ref=\{n => (b = n)\} />, bContainer);
			        return (
			          <div>
			            A\{this.state.x\}
			            \{portal\}
			          </div>
			        );
			      \}
			    \}
			
			    class B extends React.Component \{
			      state = \{x: 0\};
			
			      render() \{
			        return <div>B\{this.state.x\}</div>;
			      \}
			    \}
			
			    a = ReactTestUtils.renderIntoDocument(<A />);
			    ReactDOM.unstable_batchedUpdates(function() \{
			      a.setState(\{x: 1\});
			      b.setState(\{x: 1\});
			    \});
			
			    expect(aUpdated).toBe(true);
			  \});
			
			  it('should flush updates in the correct order', () => \{
			    const updates = [];
			
			    class Outer extends React.Component \{
			      state = \{x: 0\};
			
			      render() \{
			        updates.push('Outer-render-' + this.state.x);
			        return (
			          <div>
			            <Inner x=\{this.state.x\} ref="inner" />
			          </div>
			        );
			      \}
			
			      componentDidUpdate() \{
			        const x = this.state.x;
			        updates.push('Outer-didUpdate-' + x);
			        updates.push('Inner-setState-' + x);
			        this.refs.inner.setState(\{x: x\}, function() \{
			          updates.push('Inner-callback-' + x);
			        \});
			      \}
			    \}
			
			    class Inner extends React.Component \{
			      state = \{x: 0\};
			
			      render() \{
			        updates.push('Inner-render-' + this.props.x + '-' + this.state.x);
			        return <div />;
			      \}
			
			      componentDidUpdate() \{
			        updates.push('Inner-didUpdate-' + this.props.x + '-' + this.state.x);
			      \}
			    \}
			
			    const instance = ReactTestUtils.renderIntoDocument(<Outer />);
			
			    updates.push('Outer-setState-1');
			    instance.setState(\{x: 1\}, function() \{
			      updates.push('Outer-callback-1');
			      updates.push('Outer-setState-2');
			      instance.setState(\{x: 2\}, function() \{
			        updates.push('Outer-callback-2');
			      \});
			    \});
			
			    /* eslint-disable indent */
			    expect(updates).toEqual([
			      'Outer-render-0',
			      'Inner-render-0-0',
			
			      'Outer-setState-1',
			      'Outer-render-1',
			      'Inner-render-1-0',
			      'Inner-didUpdate-1-0',
			      'Outer-didUpdate-1',
			      // Happens in a batch, so don't re-render yet
			      'Inner-setState-1',
			      'Outer-callback-1',
			
			      // Happens in a batch
			      'Outer-setState-2',
			
			      // Flush batched updates all at once
			      'Outer-render-2',
			      'Inner-render-2-1',
			      'Inner-didUpdate-2-1',
			      'Inner-callback-1',
			      'Outer-didUpdate-2',
			      'Inner-setState-2',
			      'Outer-callback-2',
			      'Inner-render-2-2',
			      'Inner-didUpdate-2-2',
			      'Inner-callback-2',
			    ]);
			    /* eslint-enable indent */
			  \});
			
			  it('should flush updates in the correct order across roots', () => \{
			    const instances = [];
			    const updates = [];
			
			    class MockComponent extends React.Component \{
			      render() \{
			        updates.push(this.props.depth);
			        return <div />;
			      \}
			
			      componentDidMount() \{
			        instances.push(this);
			        if (this.props.depth < this.props.count) \{
			          ReactDOM.render(
			            <MockComponent
			              depth=\{this.props.depth + 1\}
			              count=\{this.props.count\}
			            />,
			            ReactDOM.findDOMNode(this),
			          );
			        \}
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<MockComponent depth=\{0\} count=\{2\} />);
			
			    expect(updates).toEqual([0, 1, 2]);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      // Simulate update on each component from top to bottom.
			      instances.forEach(function(instance) \{
			        instance.forceUpdate();
			      \});
			    \});
			
			    expect(updates).toEqual([0, 1, 2, 0, 1, 2]);
			  \});
			
			  it('should queue nested updates', () => \{
			    // See https://github.com/facebook/react/issues/1147
			
			    class X extends React.Component \{
			      state = \{s: 0\};
			
			      render() \{
			        if (this.state.s === 0) \{
			          return (
			            <div>
			              <span>0</span>
			            </div>
			          );
			        \} else \{
			          return <div>1</div>;
			        \}
			      \}
			
			      go = () => \{
			        this.setState(\{s: 1\});
			        this.setState(\{s: 0\});
			        this.setState(\{s: 1\});
			      \};
			    \}
			
			    class Y extends React.Component \{
			      render() \{
			        return (
			          <div>
			            <Z />
			          </div>
			        );
			      \}
			    \}
			
			    class Z extends React.Component \{
			      render() \{
			        return <div />;
			      \}
			
			      UNSAFE_componentWillUpdate() \{
			        x.go();
			      \}
			    \}
			
			    let x;
			    let y;
			
			    x = ReactTestUtils.renderIntoDocument(<X />);
			    y = ReactTestUtils.renderIntoDocument(<Y />);
			    expect(ReactDOM.findDOMNode(x).textContent).toBe('0');
			
			    y.forceUpdate();
			    expect(ReactDOM.findDOMNode(x).textContent).toBe('1');
			  \});
			
			  it('should queue updates from during mount', () => \{
			    // See https://github.com/facebook/react/issues/1353
			    let a;
			
			    class A extends React.Component \{
			      state = \{x: 0\};
			
			      UNSAFE_componentWillMount() \{
			        a = this;
			      \}
			
			      render() \{
			        return <div>A\{this.state.x\}</div>;
			      \}
			    \}
			
			    class B extends React.Component \{
			      UNSAFE_componentWillMount() \{
			        a.setState(\{x: 1\});
			      \}
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      ReactTestUtils.renderIntoDocument(
			        <div>
			          <A />
			          <B />
			        </div>,
			      );
			    \});
			
			    expect(a.state.x).toBe(1);
			    expect(ReactDOM.findDOMNode(a).textContent).toBe('A1');
			  \});
			
			  it('calls componentWillReceiveProps setState callback properly', () => \{
			    let callbackCount = 0;
			
			    class A extends React.Component \{
			      state = \{x: this.props.x\};
			
			      UNSAFE_componentWillReceiveProps(nextProps) \{
			        const newX = nextProps.x;
			        this.setState(\{x: newX\}, function() \{
			          // State should have updated by the time this callback gets called
			          expect(this.state.x).toBe(newX);
			          callbackCount++;
			        \});
			      \}
			
			      render() \{
			        return <div>\{this.state.x\}</div>;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    ReactDOM.render(<A x=\{1\} />, container);
			    ReactDOM.render(<A x=\{2\} />, container);
			    expect(callbackCount).toBe(1);
			  \});
			
			  it('does not call render after a component as been deleted', () => \{
			    let renderCount = 0;
			    let componentB = null;
			
			    class B extends React.Component \{
			      state = \{updates: 0\};
			
			      componentDidMount() \{
			        componentB = this;
			      \}
			
			      render() \{
			        renderCount++;
			        return <div />;
			      \}
			    \}
			
			    class A extends React.Component \{
			      state = \{showB: true\};
			
			      render() \{
			        return this.state.showB ? <B /> : <div />;
			      \}
			    \}
			
			    const component = ReactTestUtils.renderIntoDocument(<A />);
			
			    ReactDOM.unstable_batchedUpdates(function() \{
			      // B will have scheduled an update but the batching should ensure that its
			      // update never fires.
			      componentB.setState(\{updates: 1\});
			      component.setState(\{showB: false\});
			    \});
			
			    expect(renderCount).toBe(1);
			  \});
			
			  it('throws in setState if the update callback is not a function', () => \{
			     //没有意义的测试
			    return
			    function Foo() \{
			      this.a = 1;
			      this.b = 2;
			    \}
			
			    class A extends React.Component \{
			      state = \{\};
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    let component = ReactTestUtils.renderIntoDocument(<A />);
			
			    expect(() => \{
			      expect(() => component.setState(\{\}, 'no')).toWarnDev(
			        'setState(...): Expected the last optional \`callback\` argument to be ' +
			          'a function. Instead received: no.',
			      );
			    \}).toThrowError(
			      'Invalid argument passed as callback. Expected a function. Instead ' +
			        'received: no',
			    );
			    component = ReactTestUtils.renderIntoDocument(<A />);
			    expect(() => \{
			      expect(() => component.setState(\{\}, \{foo: 'bar'\})).toWarnDev(
			        'setState(...): Expected the last optional \`callback\` argument to be ' +
			          'a function. Instead received: [object Object].',
			      );
			    \}).toThrowError(
			      'Invalid argument passed as callback. Expected a function. Instead ' +
			        'received: [object Object]',
			    );
			    // Make sure the warning is deduplicated and doesn't fire again
			    component = ReactTestUtils.renderIntoDocument(<A />);
			    expect(() => component.setState(\{\}, new Foo())).toThrowError(
			      'Invalid argument passed as callback. Expected a function. Instead ' +
			        'received: [object Object]',
			    );
			  \});
			
			  it('throws in forceUpdate if the update callback is not a function', () => \{
			    //没有意义的测试
			    return
			    function Foo() \{
			      this.a = 1;
			      this.b = 2;
			    \}
			
			    class A extends React.Component \{
			      state = \{\};
			
			      render() \{
			        return <div />;
			      \}
			    \}
			
			    let component = ReactTestUtils.renderIntoDocument(<A />);
			
			    expect(() => \{
			      expect(() => component.forceUpdate('no')).toWarnDev(
			        'forceUpdate(...): Expected the last optional \`callback\` argument to be ' +
			          'a function. Instead received: no.',
			      );
			    \}).toThrowError(
			      'Invalid argument passed as callback. Expected a function. Instead ' +
			        'received: no',
			    );
			    component = ReactTestUtils.renderIntoDocument(<A />);
			    expect(() => \{
			      expect(() => component.forceUpdate(\{foo: 'bar'\})).toWarnDev(
			        'forceUpdate(...): Expected the last optional \`callback\` argument to be ' +
			          'a function. Instead received: [object Object].',
			      );
			    \}).toThrowError(
			      'Invalid argument passed as callback. Expected a function. Instead ' +
			        'received: [object Object]',
			    );
			    // Make sure the warning is deduplicated and doesn't fire again
			    component = ReactTestUtils.renderIntoDocument(<A />);
			    expect(() => component.forceUpdate(new Foo())).toThrowError(
			      'Invalid argument passed as callback. Expected a function. Instead ' +
			        'received: [object Object]',
			    );
			  \});
			
			  it('does not update one component twice in a batch (#2410)', () => \{
			    class Parent extends React.Component \{
			      getChild = () => \{
			        return this.refs.child;
			      \};
			
			      render() \{
			        return <Child ref="child" />;
			      \}
			    \}
			
			    let renderCount = 0;
			    let postRenderCount = 0;
			    let once = false;
			
			    class Child extends React.Component \{
			      state = \{updated: false\};
			
			      UNSAFE_componentWillUpdate() \{
			        if (!once) \{
			          once = true;
			          this.setState(\{updated: true\});
			        \}
			      \}
			
			      componentDidMount() \{
			        expect(renderCount).toBe(postRenderCount + 1);
			        postRenderCount++;
			      \}
			
			      componentDidUpdate() \{
			        expect(renderCount).toBe(postRenderCount + 1);
			        postRenderCount++;
			      \}
			
			      render() \{
			        expect(renderCount).toBe(postRenderCount);
			        renderCount++;
			        return <div />;
			      \}
			    \}
			
			    const parent = ReactTestUtils.renderIntoDocument(<Parent />);
			    const child = parent.getChild();
			    ReactDOM.unstable_batchedUpdates(function() \{
			      parent.forceUpdate();
			      child.forceUpdate();
			    \});
			  \});
			
			  it('does not update one component twice in a batch (#6371)', () => \{
			
			    let callbacks = [];
			    function emitChange() \{
			      callbacks.forEach(c => c());
			    \}
			
			    class App extends React.Component \{
			      constructor(props) \{
			        super(props);
			        this.state = \{showChild: true\};
			      \}
			      componentDidMount() \{
			        this.setState(\{showChild: false\});
			      \}
			      render() \{
			        return (
			          <div>
			            <ForceUpdatesOnChange />
			            \{this.state.showChild && <EmitsChangeOnUnmount />\}
			          </div>
			        );
			      \}
			    \}
			
			    class EmitsChangeOnUnmount extends React.Component \{
			      componentWillUnmount() \{
			        emitChange();
			      \}
			      render() \{
			        return null;
			      \}
			    \}
			
			    class ForceUpdatesOnChange extends React.Component \{
			      componentDidMount() \{
			        this.onChange = () => this.forceUpdate();
			        this.onChange();
			        callbacks.push(this.onChange);
			      \}
			      componentWillUnmount() \{
			        callbacks = callbacks.filter(c => c !== this.onChange);
			      \}
			      render() \{
			        return <div key=\{Math.random()\} onClick=\{function() \{\}\} />;
			      \}
			    \}
			
			    ReactDOM.render(<App />, document.createElement('div'));
			  \});
			
			  it('unstable_batchedUpdates should return value from a callback', () => \{
			    const result = ReactDOM.unstable_batchedUpdates(function() \{
			      return 42;
			    \});
			    expect(result).toEqual(42);
			  \});
			
			  it('unmounts and remounts a root in the same batch', () => \{
			    const container = document.createElement('div');
			    ReactDOM.render(<span>a</span>, container);
			    ReactDOM.unstable_batchedUpdates(function() \{
			      ReactDOM.unmountComponentAtNode(container);
			      ReactDOM.render(<span>b</span>, container);
			    \});
			    expect(container.textContent).toBe('b');
			  \});
			
			  it('handles reentrant mounting in synchronous mode', () => \{
			    let mounts = 0;
			    class Editor extends React.Component \{
			      render() \{
			        return <div>\{this.props.text\}</div>;
			      \}
			      componentDidMount() \{
			        mounts++;
			        // This should be called only once but we guard just in case.
			        if (!this.props.rendered) \{
			          this.props.onChange(\{rendered: true\});
			        \}
			      \}
			    \}
			
			    const container = document.createElement('div');
			    function render() \{
			      ReactDOM.render(
			        <Editor
			          onChange=\{newProps => \{
			            props = \{...props, ...newProps\};
			            render();
			          \}\}
			          \{...props\}
			        />,
			        container,
			      );
			    \}
			
			    let props = \{text: 'hello', rendered: false\};
			    render();
			    props = \{...props, text: 'goodbye'\};
			    render();
			    expect(container.textContent).toBe('goodbye');
			    expect(mounts).toBe(1);
			  \});
			
			  it('mounts and unmounts are sync even in a batch', () => \{
			    const ops = [];
			    const container = document.createElement('div');
			    ReactDOM.unstable_batchedUpdates(() => \{
			      ReactDOM.render(<div>Hello</div>, container);
			      ops.push(container.textContent);
			      ReactDOM.unmountComponentAtNode(container);
			      ops.push(container.textContent);
			    \});
			    expect(ops).toEqual(['Hello', '']);
			  \});
			
			  it(
			    'in sync mode, updates in componentWillUpdate and componentDidUpdate ' +
			      'should both flush in the immediately subsequent commit',
			    () => \{
			      let ops = [];
			      class Foo extends React.Component \{
			        state = \{a: false, b: false\};
			        UNSAFE_componentWillUpdate(_, nextState) \{
			          if (!nextState.a) \{
			            this.setState(\{a: true\});
			          \}
			        \}
			        componentDidUpdate() \{
			          ops.push('Foo updated');
			          if (!this.state.b) \{
			            this.setState(\{b: true\});
			          \}
			        \}
			        render() \{
			          ops.push(\`a: \$\{this.state.a\}, b: \$\{this.state.b\}\`);
			          return null;
			        \}
			      \}
			
			      const container = document.createElement('div');
			      // Mount
			      ReactDOM.render(<Foo />, container);
			      // Root update
			      ReactDOM.render(<Foo />, container);
			      expect(ops).toEqual([
			        // Mount
			        'a: false, b: false',
			        // Root update
			        'a: false, b: false',
			        'Foo updated',
			        // Subsequent update (both a and b should have flushed)
			        'a: true, b: true',
			        'Foo updated',
			        // There should not be any additional updates
			      ]);
			    \},
			  );
			
			  it(
			    'in sync mode, updates in componentWillUpdate and componentDidUpdate ' +
			      '(on a sibling) should both flush in the immediately subsequent commit',
			    () => \{
			      let ops = [];
			      class Foo extends React.Component \{
			        state = \{a: false\};
			        UNSAFE_componentWillUpdate(_, nextState) \{
			          if (!nextState.a) \{
			            this.setState(\{a: true\});
			          \}
			        \}
			        componentDidUpdate() \{
			          ops.push('Foo updated');
			        \}
			        render() \{
			          ops.push(\`a: \$\{this.state.a\}\`);
			          return null;
			        \}
			      \}
			
			      class Bar extends React.Component \{
			        state = \{b: false\};
			        componentDidUpdate() \{
			          ops.push('Bar updated');
			          if (!this.state.b) \{
			            this.setState(\{b: true\});
			          \}
			        \}
			        render() \{
			          ops.push(\`b: \$\{this.state.b\}\`);
			          return null;
			        \}
			      \}
			
			      const container = document.createElement('div');
			      // Mount
			      ReactDOM.render(
			        <div>
			          <Foo />
			          <Bar />
			        </div>,
			        container,
			      );
			      // Root update
			      ReactDOM.render(
			        <div>
			          <Foo />
			          <Bar />
			        </div>,
			        container,
			      );
			      expect(ops).toEqual([
			        // Mount
			        'a: false',
			        'b: false',
			        // Root update
			        'a: false',
			        'b: false',
			        'Foo updated',
			        'Bar updated',
			        // Subsequent update (both a and b should have flushed)
			        'a: true',
			        'b: true',
			        'Foo updated',
			        'Bar updated',
			        // There should not be any additional updates
			      ]);
			    \},
			  );
			
			  it('uses correct base state for setState inside render phase', () => \{
			    let ops = [];
			
			    class Foo extends React.Component \{
			      state = \{step: 0\};
			      render() \{
			        const memoizedStep = this.state.step;
			        this.setState(baseState => \{
			          const baseStep = baseState.step;
			          ops.push(\`base: \$\{baseStep\}, memoized: \$\{memoizedStep\}\`);
			          return baseStep === 0 ? \{step: 1\} : null;
			        \});
			        return null;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    expect(() => ReactDOM.render(<Foo />, container)).toWarnDev(
			      'Cannot update during an existing state transition',
			    );
			    expect(ops).toEqual(['base: 0, memoized: 0', 'base: 1, memoized: 1']);
			  \});
			
			  it('does not re-render if state update is null', () => \{
			    let container = document.createElement('div');
			
			    let instance;
			    let ops = [];
			    class Foo extends React.Component \{
			      render() \{
			        instance = this;
			        ops.push('render');
			        return <div />;
			      \}
			    \}
			    ReactDOM.render(<Foo />, container);
			
			    ops = [];
			    instance.setState(() => null);
			    expect(ops).toEqual([]);
			  \});
			
			  // Will change once we switch to async by default
			  it('synchronously renders hidden subtrees', () => \{
			    const container = document.createElement('div');
			    let ops = [];
			
			    function Baz() \{
			      ops.push('Baz');
			      return null;
			    \}
			
			    function Bar() \{
			      ops.push('Bar');
			      return null;
			    \}
			
			    function Foo() \{
			      ops.push('Foo');
			      return (
			        <div>
			          <div hidden=\{true\}>
			            <Bar />
			          </div>
			          <Baz />
			        </div>
			      );
			    \}
			
			    // Mount
			    ReactDOM.render(<Foo />, container);
			    expect(ops).toEqual(['Foo', 'Bar', 'Baz']);
			    ops = [];
			
			    // Update
			    ReactDOM.render(<Foo />, container);
			    expect(ops).toEqual(['Foo', 'Bar', 'Baz']);
			  \});
			
			  it('can render ridiculously large number of roots without triggering infinite update loop error', () => \{
			    class Foo extends React.Component \{
			      componentDidMount() \{
			        const limit = 1200;
			        for (let i = 0; i < limit; i++) \{
			          if (i < limit - 1) \{
			            ReactDOM.render(<div />, document.createElement('div'));
			          \} else \{
			            ReactDOM.render(<div />, document.createElement('div'), () => \{
			              // The "nested update limit" error isn't thrown until setState
			              this.setState(\{\});
			            \});
			          \}
			        \}
			      \}
			      render() \{
			        return null;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    ReactDOM.render(<Foo />, container);
			  \});
			
			  it('does not fall into an infinite update loop', () => \{
			    class NonTerminating extends React.Component \{
			      state = \{step: 0\};
			      componentDidMount() \{
			        this.setState(\{step: 1\});
			      \}
			      UNSAFE_componentWillUpdate() \{
			        this.setState(\{step: 2\});
			      \}
			      render() \{
			        return (
			          <div>
			            Hello \{this.props.name\}
			            \{this.state.step\}
			          </div>
			        );
			      \}
			    \}
			
			    const container = document.createElement('div');
			    expect(() => \{
			      ReactDOM.render(<NonTerminating />, container);
			    \}).toThrow('Maximum');
			  \});
			
			  it('does not fall into an infinite error loop', () => \{
			    function BadRender() \{
			      throw new Error('error');
			    \}
			
			    class ErrorBoundary extends React.Component \{
			      componentDidCatch() \{
			        this.props.parent.remount();
			      \}
			      render() \{
			        return <BadRender />;
			      \}
			    \}
			
			    class NonTerminating extends React.Component \{
			      state = \{step: 0\};
			      remount() \{
			        this.setState(state => (\{step: state.step + 1\}));
			      \}
			      render() \{
			        return <ErrorBoundary key=\{this.state.step\} parent=\{this\} />;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    expect(() => \{
			      ReactDOM.render(<NonTerminating />, container);
			    \}).toThrow('Maximum');
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\ReactUpdates-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(33)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\refs-destruction-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let React;
			let ReactDOM;
			let ReactTestUtils;
			
			let TestComponent;
			
			describe('refs-destruction', () => \{
			  beforeEach(() => \{
			    jest.resetModules();
			
			    React = require('react');
			    ReactDOM = require('react-dom');
			    ReactTestUtils = require('test-utils');
			
			    class ClassComponent extends React.Component \{
			      render() \{
			        return null;
			      \}
			    \}
			
			    TestComponent = class extends React.Component \{
			      render() \{
			        if (this.props.destroy) \{
			          return <div />;
			        \} else if (this.props.removeRef) \{
			          return (
			            <div>
			              <div />
			              <ClassComponent />
			            </div>
			          );
			        \} else \{
			          return (
			            <div>
			              <div ref="theInnerDiv" />
			              <ClassComponent ref="theInnerClassComponent" />
			            </div>
			          );
			        \}
			      \}
			    \};
			  \});
			
			  it('should remove refs when destroying the parent', () => \{
			    const container = document.createElement('div');
			    const testInstance = ReactDOM.render(<TestComponent />, container);
			    expect(ReactTestUtils.isDOMComponent(testInstance.refs.theInnerDiv)).toBe(
			      true,
			    );
			    expect(
			      Object.keys(testInstance.refs || \{\}).filter(key => testInstance.refs[key])
			        .length,
			    ).toEqual(2);
			    ReactDOM.unmountComponentAtNode(container);
			    expect(
			      Object.keys(testInstance.refs || \{\}).filter(key => testInstance.refs[key])
			        .length,
			    ).toEqual(0);
			  \});
			
			  it('should remove refs when destroying the child', () => \{
			    const container = document.createElement('div');
			    const testInstance = ReactDOM.render(<TestComponent />, container);
			    expect(ReactTestUtils.isDOMComponent(testInstance.refs.theInnerDiv)).toBe(
			      true,
			    );
			    expect(
			      Object.keys(testInstance.refs || \{\}).filter(key => testInstance.refs[key])
			        .length,
			    ).toEqual(2);
			    ReactDOM.render(<TestComponent destroy=\{true\} />, container);
			    expect(
			      Object.keys(testInstance.refs || \{\}).filter(key => testInstance.refs[key])
			        .length,
			    ).toEqual(0);
			  \});
			
			  it('should remove refs when removing the child ref attribute', () => \{
			    const container = document.createElement('div');
			    const testInstance = ReactDOM.render(<TestComponent />, container);
			    expect(ReactTestUtils.isDOMComponent(testInstance.refs.theInnerDiv)).toBe(
			      true,
			    );
			    expect(
			      Object.keys(testInstance.refs || \{\}).filter(key => testInstance.refs[key])
			        .length,
			    ).toEqual(2);
			    ReactDOM.render(<TestComponent removeRef=\{true\} />, container);
			    expect(
			      Object.keys(testInstance.refs || \{\}).filter(key => testInstance.refs[key])
			        .length,
			    ).toEqual(0);
			  \});
			  it("在componentWillUnmount中refs中的元素节点还能访问到父节点", ()=>\{
			    const container = document.createElement('div');
			    var a 
			    class Inner extends React.Component\{
			      render()\{
			        return <h2 ref="zzz">xxx</h2>
			      \}
			      componentWillUnmount()\{
			         a  = this.refs.zzz.parentNode;
			      \}
			    \}
			    ReactDOM.render(<h1><Inner /></h1>, container)
			    ReactDOM.unmountComponentAtNode(container)
			    expect(!!a).toBe(true)
			  \})
			  it('should not error when destroying child with ref asynchronously', () => \{
			    class Modal extends React.Component \{
			      componentDidMount() \{
			        this.div = document.createElement('div');
			        document.body.appendChild(this.div);
			        this.componentDidUpdate();
			      \}
			
			      componentDidUpdate() \{
			        ReactDOM.render(<div>\{this.props.children\}</div>, this.div);
			      \}
			
			      componentWillUnmount() \{
			        const self = this;
			        // some async animation
			        setTimeout(function() \{
			          expect(function() \{
			            ReactDOM.unmountComponentAtNode(self.div);
			          \}).not.toThrow();
			          document.body.removeChild(self.div);
			        \}, 0);
			      \}
			
			      render() \{
			        return null;
			      \}
			    \}
			
			    class AppModal extends React.Component \{
			      render() \{
			        return (
			          <Modal>
			            <a ref="ref" />
			          </Modal>
			        );
			      \}
			    \}
			
			    class App extends React.Component \{
			      render() \{
			        return this.props.hidden ? null : <AppModal onClose=\{this.close\} />;
			      \}
			    \}
			
			    const container = document.createElement('div');
			    ReactDOM.render(<App />, container);
			    ReactDOM.render(<App hidden=\{true\} />, container);
			    jest.runAllTimers();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\refs-destruction-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\refs-test.js', () => {
        const sourceCode = `
			'use strict';
			
			let React = require('react');
			let ReactTestUtils = require('test-utils');
			
			/**
			 * Counts clicks and has a renders an item for each click. Each item rendered
			 * has a ref of the form "clickLogN".
			 */
			class ClickCounter extends React.Component \{
				state = \{ count: this.props.initialCount \};
			
				triggerReset = () => \{
				    this.setState(\{ count: this.props.initialCount \});
				\};
			
				handleClick = () => \{
				    this.setState(\{ count: this.state.count + 1 \});
				\};
			
				render() \{
				    const children = [];
				    let i;
				    for (i = 0; i < this.state.count; i++) \{
				        children.push(<div className="clickLogDiv" key=\{'clickLog' + i\} ref=\{'clickLog' + i\} />);
				    \}
				    return (
				        <span className="clickIncrementer" onClick=\{this.handleClick\}>
				            \{children\}
				        </span>
				    );
				\}
			\}
			
			/**
			 * Only purpose is to test that refs are tracked even when applied to a
			 * component that is injected down several layers. Ref systems are difficult to
			 * build in such a way that ownership is maintained in an airtight manner.
			 */
			class GeneralContainerComponent extends React.Component \{
			    render() \{
			        return <div>\{this.props.children\}</div>;
			    \}
			\}
			
			/**
			 * Notice how refs ownership is maintained even when injecting a component
			 * into a different parent.
			 */
			class TestRefsComponent extends React.Component \{
				doReset = () => \{
				    this.refs.myCounter.triggerReset();
				\};
			
				render() \{
				    return (
				        <div>
				            <div ref="resetDiv" onClick=\{this.doReset\}>
								Reset Me By Clicking This.
				            </div>
				            <GeneralContainerComponent ref="myContainer">
				                <ClickCounter ref="myCounter" initialCount=\{1\} />
				            </GeneralContainerComponent>
				        </div>
				    );
				\}
			\}
			
			/**
			 * Render a TestRefsComponent and ensure that the main refs are wired up.
			 */
			const renderTestRefsComponent = function() \{
			    const testRefsComponent = ReactTestUtils.renderIntoDocument(<TestRefsComponent />);
			    expect(testRefsComponent instanceof TestRefsComponent).toBe(true);
			
			    const generalContainer = testRefsComponent.refs.myContainer;
			    expect(generalContainer instanceof GeneralContainerComponent).toBe(true);
			
			    const counter = testRefsComponent.refs.myCounter;
			    expect(counter instanceof ClickCounter).toBe(true);
			
			    return testRefsComponent;
			\};
			
			const expectClickLogsLengthToBe = function(instance, length) \{
			    const clickLogs = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'clickLogDiv');
			    expect(clickLogs.length).toBe(length);
			    expect(Object.keys(instance.refs.myCounter.refs).length).toBe(length);
			\};
			
			describe('reactiverefs', () => \{
			    beforeEach(() => \{
			        jest.resetModules();
			        React = require('react');
			        ReactTestUtils = require('test-utils');
			    \});
			
			    /**
				 * Ensure that for every click log there is a corresponding ref (from the
				 * perspective of the injected ClickCounter component.
				 */
			    it('Should increase refs with an increase in divs', () => \{
			        const testRefsComponent = renderTestRefsComponent();
			        const clickIncrementer = ReactTestUtils.findRenderedDOMComponentWithClass(
			            testRefsComponent,
			            'clickIncrementer'
			        );
			
			        expectClickLogsLengthToBe(testRefsComponent, 1);
			
			        // After clicking the reset, there should still only be one click log ref.
			        ReactTestUtils.Simulate.click(testRefsComponent.refs.resetDiv);
			        expectClickLogsLengthToBe(testRefsComponent, 1);
			
			        // Begin incrementing clicks (and therefore refs).
			        ReactTestUtils.Simulate.click(clickIncrementer);
			        expectClickLogsLengthToBe(testRefsComponent, 2);
			
			        ReactTestUtils.Simulate.click(clickIncrementer);
			        expectClickLogsLengthToBe(testRefsComponent, 3);
			
			        // Now reset again
			        ReactTestUtils.Simulate.click(testRefsComponent.refs.resetDiv);
			        expectClickLogsLengthToBe(testRefsComponent, 1);
			    \});
			\});
			
			describe('factory components', () => \{
			    it('Should correctly get the ref', () => \{
			        function Comp() \{
			            return <div ref="elemRef" />;
			        \}
			
			        const inst = ReactTestUtils.renderIntoDocument(<Comp />);
			        expect(inst.refs.elemRef.tagName).toBe('DIV');
			    \});
			\});
			
			/**
			 * Tests that when a ref hops around children, we can track that correctly.
			 */
			describe('ref swapping', () => \{
			    let RefHopsAround;
			    beforeEach(() => \{
			        jest.resetModules();
			        React = require('react');
			        ReactTestUtils = require('test-utils');
			
			        RefHopsAround = class extends React.Component \{
						state = \{ count: 0 \};
			
						moveRef = () => \{
						    this.setState(\{ count: this.state.count + 1 \});
						\};
			
						render() \{
						    const count = this.state.count;
						    /**
							 * What we have here, is three divs with refs (div1/2/3), but a single
							 * moving cursor ref \`hopRef\` that "hops" around the three. We'll call the
							 * \`moveRef()\` function several times and make sure that the hop ref
							 * points to the correct divs.
							 */
						    return (
						        <div>
						            <div className="first" ref=\{count % 3 === 0 ? 'hopRef' : 'divOneRef'\} />
						            <div className="second" ref=\{count % 3 === 1 ? 'hopRef' : 'divTwoRef'\} />
						            <div className="third" ref=\{count % 3 === 2 ? 'hopRef' : 'divThreeRef'\} />
						        </div>
						    );
						\}
			        \};
			    \});
			
			    it('Allow refs to hop around children correctly', () => \{
			        const refHopsAround = ReactTestUtils.renderIntoDocument(<RefHopsAround />);
			
			        const firstDiv = ReactTestUtils.findRenderedDOMComponentWithClass(refHopsAround, 'first');
			        const secondDiv = ReactTestUtils.findRenderedDOMComponentWithClass(refHopsAround, 'second');
			        const thirdDiv = ReactTestUtils.findRenderedDOMComponentWithClass(refHopsAround, 'third');
			
			        expect(refHopsAround.refs.hopRef).toEqual(firstDiv);
			        expect(refHopsAround.refs.divTwoRef).toEqual(secondDiv);
			        expect(refHopsAround.refs.divThreeRef).toEqual(thirdDiv);
			
			        refHopsAround.moveRef();
			        expect(refHopsAround.refs.divOneRef).toEqual(firstDiv);
			        expect(refHopsAround.refs.hopRef).toEqual(secondDiv);
			        expect(refHopsAround.refs.divThreeRef).toEqual(thirdDiv);
			
			        refHopsAround.moveRef();
			        expect(refHopsAround.refs.divOneRef).toEqual(firstDiv);
			        expect(refHopsAround.refs.divTwoRef).toEqual(secondDiv);
			        expect(refHopsAround.refs.hopRef).toEqual(thirdDiv);
			
			        /**
					 * Make sure that after the third, we're back to where we started and the
					 * refs are completely restored.
					 */
			        refHopsAround.moveRef();
			        expect(refHopsAround.refs.hopRef).toEqual(firstDiv);
			        expect(refHopsAround.refs.divTwoRef).toEqual(secondDiv);
			        expect(refHopsAround.refs.divThreeRef).toEqual(thirdDiv);
			    \});
			
			    it('always has a value for this.refs', () => \{
			        class Component extends React.Component \{
			            render() \{
			                return <div />;
			            \}
			        \}
			
			        const instance = ReactTestUtils.renderIntoDocument(<Component />);
			        expect(!!instance.refs).toBe(true);
			    \});
			
			    it('ref called correctly for stateless component', () => \{
			        let refCalled = 0;
			        function Inner(props) \{
			            return <a ref=\{props.saveA\} />;
			        \}
			
			        class Outer extends React.Component \{
						saveA = () => \{
						    refCalled++;
						\};
			
						componentDidMount() \{
						    this.setState(\{\});
						\}
			
						render() \{
						    return <Inner saveA=\{this.saveA\} />;
						\}
			        \}
			
			        ReactTestUtils.renderIntoDocument(<Outer />);
			        expect(refCalled).toBe(1);
			    \});
			
			    it('coerces numbers to strings', () => \{
			        class A extends React.Component \{
			            render() \{
			                return <div ref=\{1\} />;
			            \}
			        \}
			        const a = ReactTestUtils.renderIntoDocument(<A />);
			        expect(a.refs[1].nodeName).toBe('DIV');
			    \});
			\});
			
			describe('root level refs', () => \{
			    it('attaches and detaches root refs', () => \{
			        const ReactDOM = require('react-dom');
			        let inst = null;
			
			        // host node
			        let ref = jest.fn(value => (inst = value));
			        const container = document.createElement('div');
			        let result = ReactDOM.render(<div ref=\{ref\} />, container);
			        expect(ref).toHaveBeenCalledTimes(1);
			        expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
			        expect(result).toBe(ref.mock.calls[0][0]);
			        ReactDOM.unmountComponentAtNode(container);
			        expect(ref).toHaveBeenCalledTimes(2);
			        expect(ref.mock.calls[1][0]).toBe(null);
			
			        // composite
			        class Comp extends React.Component \{
			            method() \{
			                return true;
			            \}
			            render() \{
			                return <div>Comp</div>;
			            \}
			        \}
			
			        inst = null;
			        ref = jest.fn(value => (inst = value));
			        result = ReactDOM.render(<Comp ref=\{ref\} />, container);
			
			        expect(ref).toHaveBeenCalledTimes(1);
			        expect(inst).toBeInstanceOf(Comp);
			        expect(result).toBe(inst);
			
			        // ensure we have the correct instance
			        expect(result.method()).toBe(true);
			        expect(inst.method()).toBe(true);
			
			        ReactDOM.unmountComponentAtNode(container);
			        expect(ref).toHaveBeenCalledTimes(2);
			        expect(ref.mock.calls[1][0]).toBe(null);
			
			        // fragment
			        inst = null;
			        ref = jest.fn(value => (inst = value));
			        let divInst = null;
			        const ref2 = jest.fn(value => (divInst = value));
			        result = ReactDOM.render(
			            [
			                <Comp ref=\{ref\} key="a" />,
			                5,
			                <div ref=\{ref2\} key="b">
								Hello
			                </div>
			            ],
			            container
			        );
			
			        // first call should be \`Comp\`
			        expect(ref).toHaveBeenCalledTimes(1);
			        expect(ref.mock.calls[0][0]).toBeInstanceOf(Comp);
			        expect(result).toBe(ref.mock.calls[0][0]);
			
			        expect(ref2).toHaveBeenCalledTimes(1);
			        expect(divInst).toBeInstanceOf(HTMLDivElement);
			        expect(result).not.toBe(divInst);
			
			        ReactDOM.unmountComponentAtNode(container);
			        expect(ref).toHaveBeenCalledTimes(2);
			        expect(ref.mock.calls[1][0]).toBe(null);
			        expect(ref2).toHaveBeenCalledTimes(2);
			        expect(ref2.mock.calls[1][0]).toBe(null);
			
			        // null
			        result = ReactDOM.render(null, container);
			        expect(result).toBe(null);
			
			        // primitives
			        result = ReactDOM.render(5, container);
			        expect(result).toBeInstanceOf(Text);
			    \});
			\});
			
			describe('creating element with ref in constructor', () => \{
			    class RefTest extends React.Component \{
			        constructor(props) \{
			            super(props);
			            this.p = <p ref="p">Hello!</p>;
			        \}
			
			        render() \{
			            return <div>\{this.p\}</div>;
			        \}
			    \}
			
			    it('throws an error', () => \{
			        ReactTestUtils = require('test-utils');
			
			        //  expect(function() \{
			
			        ReactTestUtils.renderIntoDocument(<RefTest />);
			
			        //  \}).toThrowError(
			        //     'Element ref was specified as a string (p) but no owner was set. This could happen for one of' +
			        //     ' the following reasons:\\n' +
			        //     '1. You may be adding a ref to a functional component\\n' +
			        //     "2. You may be adding a ref to a component that was not created inside a component's render method\\n" +
			        //     '3. You have multiple copies of React loaded\\n' +
			        //     'See https://fb.me/react-refs-must-have-owner for more information.',
			        // );
			    \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\refs-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('rubylouvre_anu\\packages\\render\\dom\\__tests__\\renderSubtreeIntoContainer-test.js', () => {
        const sourceCode = `
			'use strict';
			
			const React = require('react');
			const PropTypes = require('prop-types');
			const ReactDOM = require('react-dom');
			const ReactTestUtils = require('test-utils');
			const renderSubtreeIntoContainer = require('react-dom')
			  .unstable_renderSubtreeIntoContainer;
			
			describe('renderSubtreeIntoContainer', () => \{
			  it('should pass context when rendering subtree elsewhere', () => \{
			    const portal = document.createElement('div');
			
			    class Component extends React.Component \{
			      static contextTypes = \{
			        foo: PropTypes.string.isRequired,
			      \};
			
			      render() \{
			        return <div>\{this.context.foo\}</div>;
			      \}
			    \}
			
			    class Parent extends React.Component \{
			      static childContextTypes = \{
			        foo: PropTypes.string.isRequired,
			      \};
			
			      getChildContext() \{
			        return \{
			          foo: 'bar',
			        \};
			      \}
			
			      render() \{
			        return null;
			      \}
			
			      componentDidMount() \{
			        expect(
			          function() \{
			            renderSubtreeIntoContainer(this, <Component />, portal);
			          \}.bind(this),
			        ).not.toThrow();
			      \}
			    \}
			
			    ReactTestUtils.renderIntoDocument(<Parent />);
			    expect(portal.firstChild.innerHTML).toBe('bar');
			  \});
			
			  it('should throw if parentComponent is invalid', () => \{
			    const portal = document.createElement('div');
			
			    class Component extends React.Component \{
			      static contextTypes = \{
			        foo: PropTypes.string.isRequired,
			      \};
			
			      render() \{
			        return <div>\{this.context.foo\}</div>;
			      \}
			    \}
			
			    // ESLint is confused here and thinks Parent is unused, presumably because
			    // it is only used inside of the class body?
			    // eslint-disable-next-line no-unused-vars
			    class Parent extends React.Component \{
			      static childContextTypes = \{
			        foo: PropTypes.string.isRequired,
			      \};
			
			      getChildContext() \{
			        return \{
			          foo: 'bar',
			        \};
			      \}
			
			      render() \{
			        return null;
			      \}
			
			      componentDidMount() \{
			        expect(function() \{
			          renderSubtreeIntoContainer(<Parent />, <Component />, portal);
			        \}).toThrowError('parentComponentmust be a valid React Component');
			      \}
			    \}
			  \});
			
			  it('should update context if it changes due to setState', () => \{
			    const container = document.createElement('div');
			    document.body.appendChild(container);
			    const portal = document.createElement('div');
			
			    class Component extends React.Component \{
			      static contextTypes = \{
			        foo: PropTypes.string.isRequired,
			        getFoo: PropTypes.func.isRequired,
			      \};
			
			      render() \{
			        return <div>\{this.context.foo + '-' + this.context.getFoo()\}</div>;
			      \}
			    \}
			
			    class Parent extends React.Component \{
			      static childContextTypes = \{
			        foo: PropTypes.string.isRequired,
			        getFoo: PropTypes.func.isRequired,
			      \};
			
			      state = \{
			        bar: 'initial',
			      \};
			
			      getChildContext() \{
			        return \{
			          foo: this.state.bar,
			          getFoo: () => this.state.bar,
			        \};
			      \}
			
			      render() \{
			        return null;
			      \}
			
			      componentDidMount() \{
			        renderSubtreeIntoContainer(this, <Component />, portal);
			      \}
			
			      componentDidUpdate() \{
			        renderSubtreeIntoContainer(this, <Component />, portal);
			      \}
			    \}
			
			    const instance = ReactDOM.render(<Parent />, container);
			    expect(portal.firstChild.innerHTML).toBe('initial-initial');
			    instance.setState(\{bar: 'changed'\});
			    expect(portal.firstChild.innerHTML).toBe('changed-changed');
			  \});
			
			  it('should update context if it changes due to re-render', () => \{
			    const container = document.createElement('div');
			    document.body.appendChild(container);
			    const portal = document.createElement('div');
			
			    class Component extends React.Component \{
			      static contextTypes = \{
			        foo: PropTypes.string.isRequired,
			        getFoo: PropTypes.func.isRequired,
			      \};
			
			      render() \{
			        return <div>\{this.context.foo + '-' + this.context.getFoo()\}</div>;
			      \}
			    \}
			
			    class Parent extends React.Component \{
			      static childContextTypes = \{
			        foo: PropTypes.string.isRequired,
			        getFoo: PropTypes.func.isRequired,
			      \};
			
			      getChildContext() \{
			        return \{
			          foo: this.props.bar,
			          getFoo: () => this.props.bar,
			        \};
			      \}
			
			      render() \{
			        return null;
			      \}
			
			      componentDidMount() \{
			        renderSubtreeIntoContainer(this, <Component />, portal);
			      \}
			
			      componentDidUpdate() \{
			        renderSubtreeIntoContainer(this, <Component />, portal);
			      \}
			    \}
			
			    ReactDOM.render(<Parent bar="initial" />, container);
			    expect(portal.firstChild.innerHTML).toBe('initial-initial');
			    ReactDOM.render(<Parent bar="changed" />, container);
			    expect(portal.firstChild.innerHTML).toBe('changed-changed');
			  \});
			
			  it('should render portal with non-context-provider parent', () => \{
			    const container = document.createElement('div');
			    document.body.appendChild(container);
			    const portal = document.createElement('div');
			
			    class Parent extends React.Component \{
			      render() \{
			        return null;
			      \}
			
			      componentDidMount() \{
			        renderSubtreeIntoContainer(this, <div>hello</div>, portal);
			      \}
			    \}
			
			    ReactDOM.render(<Parent bar="initial" />, container);
			    expect(portal.firstChild.innerHTML).toBe('hello');
			  \});
			
			  it('should get context through non-context-provider parent', () => \{
			    const container = document.createElement('div');
			    document.body.appendChild(container);
			    const portal = document.createElement('div');
			
			    class Parent extends React.Component \{
			      render() \{
			        return <Middle />;
			      \}
			      getChildContext() \{
			        return \{value: this.props.value\};
			      \}
			      static childContextTypes = \{
			        value: PropTypes.string.isRequired,
			      \};
			    \}
			
			    class Middle extends React.Component \{
			      render() \{
			        return null;
			      \}
			      componentDidMount() \{
			        renderSubtreeIntoContainer(this, <Child />, portal);
			      \}
			    \}
			
			    class Child extends React.Component \{
			      static contextTypes = \{
			        value: PropTypes.string.isRequired,
			      \};
			      render() \{
			        return <div>\{this.context.value\}</div>;
			      \}
			    \}
			
			    ReactDOM.render(<Parent value="foo" />, container);
			    expect(portal.textContent).toBe('foo');
			  \});
			
			  it('should get context through middle non-context-provider layer', () => \{
			    const container = document.createElement('div');
			    document.body.appendChild(container);
			    const portal1 = document.createElement('div');
			    const portal2 = document.createElement('div');
			
			    class Parent extends React.Component \{
			      render() \{
			        return null;
			      \}
			      getChildContext() \{
			        return \{value: this.props.value\};
			      \}
			      componentDidMount() \{
			        renderSubtreeIntoContainer(this, <Middle />, portal1);
			      \}
			      static childContextTypes = \{
			        value: PropTypes.string.isRequired,
			      \};
			    \}
			
			    class Middle extends React.Component \{
			      render() \{
			        return null;
			      \}
			      componentDidMount() \{
			        renderSubtreeIntoContainer(this, <Child />, portal2);
			      \}
			    \}
			
			    class Child extends React.Component \{
			      static contextTypes = \{
			        value: PropTypes.string.isRequired,
			      \};
			      render() \{
			        return <div>\{this.context.value\}</div>;
			      \}
			    \}
			
			    ReactDOM.render(<Parent value="foo" />, container);
			    expect(portal2.textContent).toBe('foo');
			  \});
			
			  it('fails gracefully when mixing React 15 and 16', () => \{
			    class C extends React.Component \{
			      render() \{
			        return <div />;
			      \}
			    \}
			    const c = ReactDOM.render(<C />, document.createElement('div'));
			    // React 15 calls this:
			    // https://github.com/facebook/react/blob/77b71fc3c4/src/renderers/dom/client/ReactMount.js#L478-L479
			    expect(() => \{
			      c._reactInternalInstance._processChildContext(\{\});
			    \}).toThrow(
			      __DEV__
			        ? '_processChildContext is not available in React 16+. This likely ' +
			          'means you have multiple copies of React and are attempting to nest ' +
			          'a React 15 tree inside a React 16 tree using ' +
			          "unstable_renderSubtreeIntoContainer, which isn't supported. Try to " +
			          'make sure you have only one copy of React (and ideally, switch to ' +
			          'ReactDOM.createPortal).'
			        : "Cannot read property '_processChildContext' of undefined",
			    );
			  \});
			\});`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\dom\\__tests__\\renderSubtreeIntoContainer-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('rubylouvre_anu\\packages\\render\\server\\__tests2__\\utils\\ReactDOMServerIntegrationTestUtils.js', () => {
        const sourceCode = `
			'use strict';
			
			const stream = require('stream');
			
			module.exports = function(initModules) \{
			  let ReactDOM;
			  let ReactDOMServer;
			
			  function resetModules() \{
			    (\{ReactDOM, ReactDOMServer\} = initModules());
			  \}
			
			  // Helper functions for rendering tests
			  // ====================================
			
			  // promisified version of ReactDOM.render()
			  function asyncReactDOMRender(reactElement, domElement, forceHydrate) \{
			    return new Promise(resolve => \{
			      if (forceHydrate) \{
			        ReactDOM.hydrate(reactElement, domElement);
			      \} else \{
			        ReactDOM.render(reactElement, domElement);
			      \}
			      // We can't use the callback for resolution because that will not catch
			      // errors. They're thrown.
			      resolve();
			    \});
			  \}
			  // performs fn asynchronously and expects count errors logged to console.error.
			  // will fail the test if the count of errors logged is not equal to count.
			  async function expectErrors(fn, count) \{
			    if (console.error.calls && console.error.calls.reset) \{
			      console.error.calls.reset();
			    \} else \{
			      // TODO: Rewrite tests that use this helper to enumerate expeceted errors.
			      // This will enable the helper to use the .toWarnDev() matcher instead of spying.
			      spyOnDev(console, 'error');
			    \}
			
			    const result = await fn();
			    if (
			      console.error.calls &&
			      console.error.calls.count() !== count &&
			      console.error.calls.count() !== 0
			    ) \{
			      console.log(
			        \`We expected \$\{count\} warning(s), but saw \$\{console.error.calls.count()\} warning(s).\`,
			      );
			      if (console.error.calls.count() > 0) \{
			        console.log(\`We saw these warnings:\`);
			        for (let i = 0; i < console.error.calls.count(); i++) \{
			          console.log(console.error.calls.argsFor(i)[0]);
			        \}
			      \}
			    \}
			    if (__DEV__) \{
			      expect(console.error).toHaveBeenCalledTimes(count);
			    \}
			    return result;
			  \}
			
			  // renders the reactElement into domElement, and expects a certain number of errors.
			  // returns a Promise that resolves when the render is complete.
			  function renderIntoDom(
			    reactElement,
			    domElement,
			    forceHydrate,
			    errorCount = 0,
			  ) \{
			    return expectErrors(async () => \{
			      await asyncReactDOMRender(reactElement, domElement, forceHydrate);
			      return domElement.firstChild;
			    \}, errorCount);
			  \}
			
			  async function renderIntoString(reactElement, errorCount = 0) \{
			    return await expectErrors(
			      () =>
			        new Promise(resolve =>
			          resolve(ReactDOMServer.renderToString(reactElement)),
			        ),
			      errorCount,
			    );
			  \}
			
			  // Renders text using SSR and then stuffs it into a DOM node; returns the DOM
			  // element that corresponds with the reactElement.
			  // Does not render on client or perform client-side revival.
			  async function serverRender(reactElement, errorCount = 0) \{
			    const markup = await renderIntoString(reactElement, errorCount);
			    const domElement = document.createElement('div');
			    domElement.innerHTML = markup;
			    return domElement.firstChild;
			  \}
			
			  // this just drains a readable piped into it to a string, which can be accessed
			  // via .buffer.
			  class DrainWritable extends stream.Writable \{
			    constructor(options) \{
			      super(options);
			      this.buffer = '';
			    \}
			
			    _write(chunk, encoding, cb) \{
			      this.buffer += chunk;
			      cb();
			    \}
			  \}
			
			  async function renderIntoStream(reactElement, errorCount = 0) \{
			    return await expectErrors(
			      () =>
			        new Promise(resolve => \{
			          let writable = new DrainWritable();
			          ReactDOMServer.renderToNodeStream(reactElement).pipe(writable);
			          writable.on('finish', () => resolve(writable.buffer));
			        \}),
			      errorCount,
			    );
			  \}
			
			  // Renders text using node stream SSR and then stuffs it into a DOM node;
			  // returns the DOM element that corresponds with the reactElement.
			  // Does not render on client or perform client-side revival.
			  async function streamRender(reactElement, errorCount = 0) \{
			    const markup = await renderIntoStream(reactElement, errorCount);
			    const domElement = document.createElement('div');
			    domElement.innerHTML = markup;
			    return domElement.firstChild;
			  \}
			
			  const clientCleanRender = (element, errorCount = 0) => \{
			    const div = document.createElement('div');
			    return renderIntoDom(element, div, false, errorCount);
			  \};
			
			  const clientRenderOnServerString = async (element, errorCount = 0) => \{
			    const markup = await renderIntoString(element, errorCount);
			    resetModules();
			
			    const domElement = document.createElement('div');
			    domElement.innerHTML = markup;
			    let serverNode = domElement.firstChild;
			
			    const firstClientNode = await renderIntoDom(
			      element,
			      domElement,
			      true,
			      errorCount,
			    );
			    let clientNode = firstClientNode;
			
			    // Make sure all top level nodes match up
			    while (serverNode || clientNode) \{
			      expect(serverNode != null).toBe(true);
			      expect(clientNode != null).toBe(true);
			      expect(clientNode.nodeType).toBe(serverNode.nodeType);
			      // Assert that the DOM element hasn't been replaced.
			      // Note that we cannot use expect(serverNode).toBe(clientNode) because
			      // of jest bug #1772.
			      expect(serverNode === clientNode).toBe(true);
			      serverNode = serverNode.nextSibling;
			      clientNode = clientNode.nextSibling;
			    \}
			    return firstClientNode;
			  \};
			
			  function BadMarkupExpected() \{\}
			
			  const clientRenderOnBadMarkup = async (element, errorCount = 0) => \{
			    // First we render the top of bad mark up.
			    const domElement = document.createElement('div');
			    domElement.innerHTML =
			      '<div id="badIdWhichWillCauseMismatch" data-reactroot="" data-reactid="1"></div>';
			    await renderIntoDom(element, domElement, true, errorCount + 1);
			
			    // This gives us the resulting text content.
			    const hydratedTextContent = domElement.textContent;
			
			    // Next we render the element into a clean DOM node client side.
			    const cleanDomElement = document.createElement('div');
			    await asyncReactDOMRender(element, cleanDomElement, true);
			    // This gives us the expected text content.
			    const cleanTextContent = cleanDomElement.textContent;
			
			    // The only guarantee is that text content has been patched up if needed.
			    expect(hydratedTextContent).toBe(cleanTextContent);
			
			    // Abort any further expects. All bets are off at this point.
			    throw new BadMarkupExpected();
			  \};
			
			  // runs a DOM rendering test as four different tests, with four different rendering
			  // scenarios:
			  // -- render to string on server
			  // -- render on client without any server markup "clean client render"
			  // -- render on client on top of good server-generated string markup
			  // -- render on client on top of bad server-generated markup
			  //
			  // testFn is a test that has one arg, which is a render function. the render
			  // function takes in a ReactElement and an optional expected error count and
			  // returns a promise of a DOM Element.
			  //
			  // You should only perform tests that examine the DOM of the results of
			  // render; you should not depend on the interactivity of the returned DOM element,
			  // as that will not work in the server string scenario.
			  function itRenders(desc, testFn) \{
			    it(\`renders \$\{desc\} with server string render\`, () => testFn(serverRender));
			    it(\`renders \$\{desc\} with server stream render\`, () => testFn(streamRender));
			    itClientRenders(desc, testFn);
			  \}
			
			  // run testFn in three different rendering scenarios:
			  // -- render on client without any server markup "clean client render"
			  // -- render on client on top of good server-generated string markup
			  // -- render on client on top of bad server-generated markup
			  //
			  // testFn is a test that has one arg, which is a render function. the render
			  // function takes in a ReactElement and an optional expected error count and
			  // returns a promise of a DOM Element.
			  //
			  // Since all of the renders in this function are on the client, you can test interactivity,
			  // unlike with itRenders.
			  function itClientRenders(desc, testFn) \{
			    it(\`renders \$\{desc\} with clean client render\`, () =>
			      testFn(clientCleanRender));
			    it(\`renders \$\{desc\} with client render on top of good server markup\`, () =>
			      testFn(clientRenderOnServerString));
			    it(\`renders \$\{desc\} with client render on top of bad server markup\`, async () => \{
			      try \{
			        await testFn(clientRenderOnBadMarkup);
			      \} catch (x) \{
			        // We expect this to trigger the BadMarkupExpected rejection.
			        if (!(x instanceof BadMarkupExpected)) \{
			          // If not, rethrow.
			          throw x;
			        \}
			      \}
			    \});
			  \}
			
			  function itThrows(desc, testFn, partialMessage) \{
			    it(\`throws \$\{desc\}\`, () => \{
			      return testFn().then(
			        () => expect(false).toBe('The promise resolved and should not have.'),
			        err => \{
			          expect(err).toBeInstanceOf(Error);
			          expect(err.message).toContain(partialMessage);
			        \},
			      );
			    \});
			  \}
			
			  function itThrowsWhenRendering(desc, testFn, partialMessage) \{
			    itThrows(
			      \`when rendering \$\{desc\} with server string render\`,
			      () => testFn(serverRender),
			      partialMessage,
			    );
			    itThrows(
			      \`when rendering \$\{desc\} with clean client render\`,
			      () => testFn(clientCleanRender),
			      partialMessage,
			    );
			
			    // we subtract one from the warning count here because the throw means that it won't
			    // get the usual markup mismatch warning.
			    itThrows(
			      \`when rendering \$\{desc\} with client render on top of bad server markup\`,
			      () =>
			        testFn((element, warningCount = 0) =>
			          clientRenderOnBadMarkup(element, warningCount - 1),
			        ),
			      partialMessage,
			    );
			  \}
			
			  // renders serverElement to a string, sticks it into a DOM element, and then
			  // tries to render clientElement on top of it. shouldMatch is a boolean
			  // telling whether we should expect the markup to match or not.
			  async function testMarkupMatch(serverElement, clientElement, shouldMatch) \{
			    const domElement = await serverRender(serverElement);
			    resetModules();
			    return renderIntoDom(
			      clientElement,
			      domElement.parentNode,
			      true,
			      shouldMatch ? 0 : 1,
			    );
			  \}
			
			  // expects that rendering clientElement on top of a server-rendered
			  // serverElement does NOT raise a markup mismatch warning.
			  function expectMarkupMatch(serverElement, clientElement) \{
			    return testMarkupMatch(serverElement, clientElement, true);
			  \}
			
			  // expects that rendering clientElement on top of a server-rendered
			  // serverElement DOES raise a markup mismatch warning.
			  function expectMarkupMismatch(serverElement, clientElement) \{
			    return testMarkupMatch(serverElement, clientElement, false);
			  \}
			
			  return \{
			    resetModules,
			    expectMarkupMismatch,
			    expectMarkupMatch,
			    itRenders,
			    itClientRenders,
			    itThrowsWhenRendering,
			    asyncReactDOMRender,
			    serverRender,
			    clientCleanRender,
			    clientRenderOnServerString,
			    renderIntoDom,
			    streamRender,
			  \};
			\};`

		const tests = extractFromSource(sourceCode, 'rubylouvre_anu\\packages\\render\\server\\__tests2__\\utils\\ReactDOMServerIntegrationTestUtils.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
});
