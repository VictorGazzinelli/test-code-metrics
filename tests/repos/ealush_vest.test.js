const { extractFromSource } = require('../../src/extractor');

describe('ealush_vest', () => {
    it('ealush_vest\\packages\\anyone\\src\\__tests__\\all.test.ts', () => {
        const sourceCode = `
			import \{ sample, random \} from 'lodash';
			
			import \{ TRUTHY_VALUES, FALSY_VALUES \} from './anyoneTestValues';
			
			import all from 'all';
			
			describe('methods/all', () => \{
			  describe('When only falsy values', () => \{
			    it('Should return false', () => \{
			      expect(
			        all(
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          )
			        )
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When only truthy values', () => \{
			    it('Should return true', () => \{
			      expect(
			        all(
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(TRUTHY_VALUES) : sample(TRUTHY_VALUES)
			          )
			        )
			      ).toBe(true);
			    \});
			  \});
			
			  describe('When some truthy values', () => \{
			    it('Should return false', () => \{
			      expect(
			        all.apply(null, [
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          ),
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(TRUTHY_VALUES) : sample(TRUTHY_VALUES)
			          ),
			        ])
			      ).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\anyone\\src\\__tests__\\all.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\anyone\\src\\__tests__\\any.test.ts', () => {
        const sourceCode = `
			import \{ sample, random \} from 'lodash';
			
			import \{ TRUTHY_VALUES, FALSY_VALUES \} from './anyoneTestValues';
			
			import any from 'any';
			
			describe('methods/any', () => \{
			  describe('When only falsy values', () => \{
			    it('Should return false', () => \{
			      expect(
			        any(
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          )
			        )
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When only truthy values', () => \{
			    it('Should return true', () => \{
			      expect(
			        any(
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(TRUTHY_VALUES) : sample(TRUTHY_VALUES)
			          )
			        )
			      ).toBe(true);
			    \});
			  \});
			
			  describe('When one truthy value', () => \{
			    it('Should return true', () => \{
			      expect(
			        any.apply(null, [
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          ),
			          sample(TRUTHY_VALUES),
			        ])
			      ).toBe(true);
			    \});
			  \});
			
			  describe('When some truthy values', () => \{
			    it('Should return true', () => \{
			      expect(
			        any.apply(null, [
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          ),
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(TRUTHY_VALUES) : sample(TRUTHY_VALUES)
			          ),
			        ])
			      ).toBe(true);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\anyone\\src\\__tests__\\any.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\anyone\\src\\__tests__\\none.test.ts', () => {
        const sourceCode = `
			import \{ sample, random \} from 'lodash';
			
			import \{ TRUTHY_VALUES, FALSY_VALUES \} from './anyoneTestValues';
			
			import none from 'none';
			
			describe('methods/none', () => \{
			  describe('When only falsy values', () => \{
			    it('Should return true', () => \{
			      expect(
			        none(
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          )
			        )
			      ).toBe(true);
			    \});
			  \});
			
			  describe('When only truthy values', () => \{
			    it('Should return false', () => \{
			      expect(
			        none(
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(TRUTHY_VALUES) : sample(TRUTHY_VALUES)
			          )
			        )
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When one truthy value', () => \{
			    it('Should return false', () => \{
			      expect(
			        none.apply(null, [
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          ),
			          sample(TRUTHY_VALUES),
			        ])
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When some truthy values', () => \{
			    it('Should return false', () => \{
			      expect(
			        none.apply(null, [
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          ),
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(TRUTHY_VALUES) : sample(TRUTHY_VALUES)
			          ),
			        ])
			      ).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\anyone\\src\\__tests__\\none.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\anyone\\src\\__tests__\\one.test.ts', () => {
        const sourceCode = `
			import \{ sample, random \} from 'lodash';
			
			import \{ TRUTHY_VALUES, FALSY_VALUES \} from './anyoneTestValues';
			
			import one from 'one';
			
			describe('methods/one', () => \{
			  describe('When only falsy values', () => \{
			    it('Should return false', () => \{
			      expect(
			        one(
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          )
			        )
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When only truthy values', () => \{
			    it('Should return false', () => \{
			      expect(
			        one(
			          ...Array.from(\{ length: random(2, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(TRUTHY_VALUES) : sample(TRUTHY_VALUES)
			          )
			        )
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When one truthy value', () => \{
			    it('Should return true', () => \{
			      expect(
			        one(
			          ...Array.from(\{ length: random(1, 10) \}, (_, i) =>
			            i % 2 === 0 ? sample(FALSY_VALUES) : sample(FALSY_VALUES)
			          ),
			          sample(TRUTHY_VALUES)
			        )
			      ).toBe(true);
			    \});
			  \});
			
			  describe('When some truthy values', () => \{
			    it('Should return false', () => \{
			      expect(
			        one(
			          ...Array.from(\{ length: random(2, 10) \}, () => sample(TRUTHY_VALUES)),
			          ...Array.from(\{ length: random(1, 10) \}, () => sample(FALSY_VALUES))
			        )
			      ).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\anyone\\src\\__tests__\\one.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\anyone\\src\\__tests__\\runAnyoneMethods.test.ts', () => {
        const sourceCode = `
			import \{ FALSY_VALUES, TRUTHY_VALUES \} from './anyoneTestValues';
			
			import run from 'runAnyoneMethods';
			
			describe('lib/run', () => \{
			  describe('When value is falsy', () => \{
			    it.each([FALSY_VALUES])('Should return \`false\` ("%s")', value =>
			      expect(run(value)).toBe(false)
			    );
			  \});
			
			  describe('When value is truthy', () => \{
			    it.each([TRUTHY_VALUES])('Should return \`true\` ("%s")', value =>
			      expect(run(value)).toBe(true)
			    );
			  \});
			
			  describe('When value is a function', () => \{
			    describe('When value is falsy', () => \{
			      it.each([FALSY_VALUES])('Should return \`false\` ("%s")', value =>
			        expect(run(() => value)).toBe(false)
			      );
			    \});
			
			    describe('When value is truthy', () => \{
			      it.each([TRUTHY_VALUES])('Should return \`true\` ("%s")', value =>
			        expect(run(() => value)).toBe(true)
			      );
			    \});
			  \});
			
			  describe('When the function throws an error', () => \{
			    it('Should return false', () => \{
			      expect(
			        run(() => \{
			          throw new Error();
			        \})
			      ).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\anyone\\src\\__tests__\\runAnyoneMethods.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\context\\src\\__tests__\\cascade.test.ts', () => {
        const sourceCode = `
			import \{ createCascade, CtxCascadeApi \} from 'context';
			
			describe('Cascading Context', () => \{
			  let ctx: CtxCascadeApi<any>;
			
			  beforeEach(() => \{
			    ctx = createCascade();
			  \});
			  describe('createCascade', () => \{
			    it('Should return a new context on each run', () => \{
			      expect(createCascade()).not.toBe(createCascade());
			    \});
			
			    it('Should return all methods', () => \{
			      expect(createCascade()).toMatchSnapshot();
			    \});
			  \});
			
			  describe('context.run', () => \{
			    it('Should create a new context instance', () => \{
			      const top = ctx.use();
			
			      ctx.run(\{\}, () => \{
			        expect(ctx.use()).not.toBe(top);
			      \});
			    \});
			
			    it('Should pass no arguments to the callback', () => \{
			      ctx.run(\{\}, (...args) => \{
			        expect(args).toHaveLength(0);
			      \});
			    \});
			
			    it('Adds provided \`ctxref\` properties to current context level', () => \{
			      ctx.run(
			        \{
			          id: 55,
			          user: 'boomsa',
			        \},
			        () => \{
			          expect(ctx.use().id).toBe(55);
			          expect(ctx.use().user).toBe('boomsa');
			        \}
			      );
			    \});
			
			    it('Returns undefined when property is not in context', () => \{
			      ctx.run(
			        \{
			          id: 55,
			        \},
			        () => \{
			          expect(ctx.use().id).toBe(55);
			          expect(ctx.use().user).toBeUndefined();
			        \}
			      );
			    \});
			
			    it('Should clear context after callback run', () => \{
			      expect(ctx.use()).toBeUndefined();
			      ctx.run(\{ a: 1 \}, () => \{
			        expect(ctx.use()).toMatchSnapshot();
			        ctx.run(\{ b: 2 \}, () => \{
			          expect(ctx.use()).toMatchSnapshot();
			        \});
			      \});
			      expect(ctx.use()).toBeUndefined();
			    \});
			
			    describe('Context nesting', () => \{
			      it('Should refer to closest defined value', () => \{
			        ctx.run(
			          \{
			            id: 99,
			            name: 'watermelonbunny',
			          \},
			          () => \{
			            expect(ctx.use().id).toBe(99);
			            expect(ctx.use().name).toBe('watermelonbunny');
			
			            ctx.run(
			              \{
			                name: 'Emanuelle',
			                color: 'blue',
			              \},
			              () => \{
			                expect(ctx.use().id).toBe(99);
			                expect(ctx.use().name).toBe('Emanuelle');
			                expect(ctx.use().color).toBe('blue');
			
			                ctx.run(\{\}, () => \{
			                  expect(ctx.use().id).toBe(99);
			                  expect(ctx.use().name).toBe('Emanuelle');
			                  expect(ctx.use().color).toBe('blue');
			                \});
			              \}
			            );
			          \}
			        );
			      \});
			
			      it('Should return previous context value after nested context run', () => \{
			        ctx.run(
			          \{
			            id: 99,
			            name: 'watermelonbunny',
			          \},
			          () => \{
			            ctx.run(
			              \{
			                name: 'Emanuelle',
			                color: 'blue',
			              \},
			              () => \{
			                ctx.run(\{\}, () => null);
			                expect(ctx.use().id).toBe(99);
			                expect(ctx.use().name).toBe('Emanuelle');
			                expect(ctx.use().color).toBe('blue');
			                expect(ctx.use()).toMatchInlineSnapshot(\`
			                  Object \{
			                    "color": "blue",
			                    "id": 99,
			                    "name": "Emanuelle",
			                  \}
			                \`);
			              \}
			            );
			            expect(ctx.use().id).toBe(99);
			            expect(ctx.use().name).toBe('watermelonbunny');
			            expect(ctx.use()).toMatchInlineSnapshot(\`
			              Object \{
			                "id": 99,
			                "name": "watermelonbunny",
			              \}
			            \`);
			          \}
			        );
			      \});
			    \});
			  \});
			
			  describe('context.bind', () => \{
			    it('Returns a function', () => \{
			      expect(typeof ctx.bind(\{\}, jest.fn())).toBe('function');
			    \});
			
			    it('Wraps the function with context', () => \{
			      return new Promise<void>(done => \{
			        const fn = () => \{
			          expect(ctx.use()).toMatchInlineSnapshot(\`
			            Object \{
			              "value": 55,
			            \}
			          \`);
			          done(); // this makes sure the function actually runs
			        \};
			        const bound = ctx.bind(\{ value: 55 \}, fn);
			        bound();
			      \});
			    \});
			
			    it('Passes runtime arguments to bound function', () => \{
			      const fn = jest.fn();
			      const args = Array.from(\{ length: 100 \}, (_, i) => \`\$\{i\}\`); // 1-100
			      ctx.bind(\{\}, fn)(...args);
			
			      expect(fn).toHaveBeenCalledWith(...args);
			    \});
			
			    it('Maintains normal context behavior when runs within context.run', () => \{
			      return new Promise<void>(done => \{
			        const fn = () => \{
			          expect(ctx.use()).toMatchObject(\{ value: 200, value2: 300 \});
			          expect(ctx.use()).toMatchInlineSnapshot(\`
			            Object \{
			              "value": 200,
			              "value2": 300,
			            \}
			          \`);
			          done();
			        \};
			
			        const bound = ctx.bind(\{ value2: 300 \}, fn);
			        ctx.run(\{ value: 200, value2: 200 \}, bound);
			      \});
			    \});
			  \});
			
			  describe('context.use', () => \{
			    describe('When in an active context', () => \{
			      it('Should return a cloned ctxRef object', () => \{
			        const ctxRef = \{ a: 1, b: 2 \};
			
			        ctx.run(ctxRef, () => \{
			          expect(ctx.use()).toEqual(ctxRef);
			        \});
			      \});
			
			      it('Should return a frozen context object', () => \{
			        const ctxRef = \{ a: 1, b: 2 \};
			
			        ctx.run(ctxRef, () => \{
			          expect(Object.isFrozen(ctx.use())).toBe(true);
			        \});
			      \});
			
			      describe('When before running the context', () => \{
			        it('Should return undefined', () => \{
			          expect(ctx.use()).toBeUndefined();
			        \});
			      \});
			
			      describe('When after closing the context', () => \{
			        it('Should return undefined', () => \{
			          ctx.run(\{\}, () => \{\});
			          expect(ctx.use()).toBeUndefined();
			        \});
			      \});
			    \});
			  \});
			
			  describe('context.useX', () => \{
			    describe('When in an active context', () => \{
			      it('Should return a cloned ctxRef object', () => \{
			        const ctxRef = \{ a: 1, b: 2 \};
			
			        ctx.run(ctxRef, () => \{
			          expect(ctx.useX()).toEqual(ctxRef);
			        \});
			      \});
			
			      it('Should return a frozen context object', () => \{
			        const ctxRef = \{ a: 1, b: 2 \};
			
			        ctx.run(ctxRef, () => \{
			          expect(Object.isFrozen(ctx.useX())).toBe(true);
			        \});
			      \});
			
			      describe('When before running the context', () => \{
			        it('Should throw error', () => \{
			          expect(() => ctx.useX()).toThrow('Not inside of a running context.');
			        \});
			
			        it('Should allow a custom context message', () => \{
			          expect(() => ctx.useX('Custom Failure Message')).toThrow(
			            'Custom Failure Message'
			          );
			        \});
			      \});
			
			      describe('When after closing the context', () => \{
			        beforeEach(() => \{
			          ctx.run(\{\}, () => \{\});
			        \});
			
			        it('Should return undefined', () => \{
			          expect(() => ctx.useX()).toThrow('Not inside of a running context.');
			        \});
			
			        it('Should allow a custom context message', () => \{
			          expect(() => ctx.useX('Custom Failure Message')).toThrow(
			            'Custom Failure Message'
			          );
			        \});
			      \});
			    \});
			  \});
			
			  describe('init argument', () => \{
			    it('Should run init function on every context.run', () => \{
			      const init = jest.fn();
			
			      const ctx = createCascade(init);
			
			      expect(init).not.toHaveBeenCalled();
			
			      ctx.run(\{\}, () => \{
			        expect(init).toHaveBeenCalledTimes(1);
			        ctx.run(\{\}, () => \{
			          expect(init).toHaveBeenCalledTimes(2);
			          ctx.run(\{\}, () => \{
			            expect(init).toHaveBeenCalledTimes(3);
			          \});
			        \});
			      \});
			      expect(init).toHaveBeenCalledTimes(3);
			
			      ctx.run(\{\}, () => \{
			        expect(init).toHaveBeenCalledTimes(4);
			      \});
			      expect(init).toHaveBeenCalledTimes(4);
			    \});
			
			    it('Should accept ctxRef as first argument', () => \{
			      const init = jest.fn();
			
			      const ctx = createCascade(init);
			      const ref1 = \{ a: 1, b: 2 \};
			      const ref2 = \{ a: 2, b: 3 \};
			
			      ctx.run(ref1, () => \{
			        ctx.run(ref2, () => null);
			      \});
			      expect(init.mock.calls[0][0]).toBe(ref1);
			      expect(init.mock.calls[1][0]).toBe(ref2);
			    \});
			
			    it('Should accept parentContext as second argument', () => \{
			      const init = jest.fn();
			
			      const ctx = createCascade(init);
			      let p1;
			      ctx.run(\{\}, () => \{
			        p1 = ctx.use();
			        ctx.run(\{\}, () => null);
			      \});
			      expect(init.mock.calls[0][1]).toBeUndefined();
			      expect(init.mock.calls[1][1]).toBe(p1);
			    \});
			
			    it('When not nullish, should use init value as ctxRef', () => \{
			      const ctx = createCascade<\{ override?: boolean; value?: string \}>(() => (\{
			        override: true,
			      \}));
			      ctx.run(\{ value: 'x' \}, () => \{
			        expect(ctx.useX().override).toBe(true);
			        expect(ctx.useX().value).toBeUndefined();
			      \});
			    \});
			
			    it('When nullish, should default to ctxRef', () => \{
			      const ctx = createCascade(() => null);
			
			      ctx.run(\{ value: 'x' \}, () => \{
			        expect(ctx.useX().value).toBe('x');
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\context\\src\\__tests__\\cascade.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(28)
    });
    it('ealush_vest\\packages\\context\\src\\__tests__\\context.test.ts', () => {
        const sourceCode = `
			import \{ createContext, CtxApi \} from 'context';
			
			describe('Context', () => \{
			  let ctx: CtxApi<any>;
			
			  beforeEach(() => \{
			    ctx = createContext();
			  \});
			
			  describe('Exposed Methods', () => \{
			    it('should have a use method', () => \{
			      expect(ctx.use).toBeInstanceOf(Function);
			    \});
			
			    it('should have a run method', () => \{
			      expect(ctx.run).toBeInstanceOf(Function);
			    \});
			  \});
			
			  describe('use', () => \{
			    describe('When not inside of an active context', () => \{
			      describe('When a default value was not provided', () => \{
			        it('should return undefined', () => \{
			          expect(ctx.use()).toBeUndefined();
			        \});
			      \});
			
			      describe('When a default value was provided', () => \{
			        beforeEach(() => \{
			          ctx = createContext('i am the default value!');
			        \});
			
			        it('should return the default value', () => \{
			          expect(ctx.use()).toBe('i am the default value!');
			        \});
			      \});
			    \});
			  \});
			
			  describe('useX', () => \{
			    describe('When not inside of an active context', () => \{
			      it('Should throw an error', () => \{
			        expect(() => \{
			          ctx.useX();
			        \}).toThrow('Not inside of a running context.');
			      \});
			
			      it('Should throw an error with a custom message when passed', () => \{
			        expect(() => \{
			          ctx.useX('i am the error message!');
			        \}).toThrow('i am the error message!');
			      \});
			
			      describe('When a default value was provided', () => \{
			        beforeEach(() => \{
			          ctx = createContext('i am the default value!');
			        \});
			        it('Should disregard default value', () => \{
			          expect(() => \{
			            ctx.useX();
			          \}).toThrow('Not inside of a running context.');
			        \});
			      \});
			    \});
			  \});
			
			  describe('run', () => \{
			    describe('It should set the current context value to the passed value', () => \{
			      it('should set the current context value to the passed value', () => \{
			        const value = \{ some: 'object' \};
			        ctx.run(value, () => \{
			          expect(ctx.use()).toBe(value);
			        \});
			      \});
			    \});
			
			    describe('When nesting run calls', () => \{
			      it("sets each layer's context with its respective value", () => \{
			        const value_a = \{ some: 'object' \};
			        ctx.run(value_a, () => \{
			          expect(ctx.use()).toBe(value_a);
			          const value_b = \{ another: 'obj' \};
			          ctx.run(value_b, () => \{
			            expect(ctx.use()).toBe(value_b);
			          \});
			        \});
			      \});
			
			      it('Restores the previous context value when exiting a context layer', () => \{
			        const value_a = \{ some: 'object' \};
			        ctx.run(value_a, () => \{
			          const value_b = \{ another: 'obj' \};
			          ctx.run(value_b, () => \{
			            expect(ctx.use()).toBe(value_b);
			          \});
			          expect(ctx.use()).toBe(value_a);
			        \});
			        expect(ctx.use()).toBeUndefined();
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\context\\src\\__tests__\\context.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('ealush_vest\\packages\\n4s\\src\\exports\\__tests__\\compose.test.ts', () => {
        const sourceCode = `
			import compose from 'compose';
			import \{ enforce \} from 'n4s';
			import * as ruleReturn from 'ruleReturn';
			import 'schema';
			import 'compounds';
			
			describe('compose', () => \{
			  it('Should create "and" relationship between composed rules', () => \{
			    const NumberAboveTen = compose(enforce.isNumber(), enforce.greaterThan(10));
			
			    expect(() => NumberAboveTen(5)).toThrow();
			    expect(() => NumberAboveTen('11')).toThrow();
			    expect(() => NumberAboveTen(10)).toThrow();
			    NumberAboveTen(11); // does not throw
			  \});
			
			  it('Should allow lazy evaluation of composed rules', () => \{
			    const NumericStringBetweenThreeAndFive = compose(
			      enforce.isNumeric(),
			      enforce.isString(),
			      enforce.greaterThan(3),
			      enforce.lessThan(5)
			    );
			
			    expect(NumericStringBetweenThreeAndFive.run('4')).toEqual(
			      ruleReturn.passing()
			    );
			    expect(NumericStringBetweenThreeAndFive.run('3')).toEqual(
			      ruleReturn.failing()
			    );
			    expect(NumericStringBetweenThreeAndFive.run(5)).toEqual(
			      ruleReturn.failing()
			    );
			    expect(NumericStringBetweenThreeAndFive.test('4')).toBe(true);
			    expect(NumericStringBetweenThreeAndFive.test('3')).toBe(false);
			    expect(NumericStringBetweenThreeAndFive.test(5)).toBe(false);
			  \});
			
			  it('Should allow running composite as part of a shape', () => \{
			    const Name = compose(
			      enforce.shape(\{
			        first: enforce.isString().isNotEmpty(),
			        last: enforce.isString().isNotEmpty(),
			        middle: enforce.optional(enforce.isString().isNotEmpty()),
			      \})
			    );
			
			    expect(
			      enforce
			        .shape(\{
			          name: Name,
			        \})
			        .run(\{
			          name: \{
			            first: 'John',
			            last: 'Doe',
			          \},
			        \})
			    ).toEqual(ruleReturn.passing());
			
			    expect(
			      enforce
			        .shape(\{
			          name: Name,
			        \})
			        .run(\{
			          name: \{
			            first: 'John',
			            last: 'Doe',
			            middle: '',
			          \},
			        \})
			    ).toEqual(ruleReturn.failing());
			  \});
			  it('Should allow composing compositions', () => \{
			    const Name = compose(
			      enforce.loose(\{
			        name: enforce.shape(\{
			          first: enforce.isString().isNotEmpty(),
			          last: enforce.isString().isNotEmpty(),
			          middle: enforce.optional(enforce.isString().isNotEmpty()),
			        \}),
			      \})
			    );
			
			    const Entity = compose(
			      enforce.loose(\{
			        id: enforce.isNumeric(),
			      \})
			    );
			
			    const User = compose(Name, Entity);
			
			    expect(
			      User.run(\{
			        id: '1',
			        name: \{
			          first: 'John',
			          middle: 'M',
			          last: 'Doe',
			        \},
			      \})
			    ).toEqual(ruleReturn.passing());
			    User(\{
			      id: '1',
			      name: \{
			        first: 'John',
			        middle: 'M',
			        last: 'Doe',
			      \},
			    \});
			
			    // failing
			    expect(
			      User.run(\{
			        id: '_',
			        name: \{
			          first: 'John',
			        \},
			      \})
			    ).toEqual(ruleReturn.failing());
			
			    expect(() =>
			      User(\{
			        name: \{
			          first: 'John',
			        \},
			        id: '__',
			      \})
			    ).toThrow();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\exports\\__tests__\\compose.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\n4s\\src\\lib\\__tests__\\isProxySupported.test.ts', () => {
        const sourceCode = `
			import isProxySupported from 'isProxySupported';
			
			describe('isProxySupported', () => \{
			  describe('When proxy is supported', () => \{
			    it('should return true', () => \{
			      expect(isProxySupported()).toBe(true);
			    \});
			  \});
			
			  describe('When proxy is not supported', () => \{
			    describe('When Proxy is undefined', () => \{
			      beforeEach(() => \{
			        Object.defineProperty(global, 'Proxy', \{
			          value: undefined,
			          configurable: true,
			        \});
			      \});
			
			      it('should return false', () => \{
			        expect(isProxySupported()).toBe(false);
			      \});
			    \});
			
			    describe('When proxy property does not exist on global object', () => \{
			      beforeEach(() => \{
			        // @ts-ignore
			        delete global.Proxy;
			      \});
			
			      it('should return false', () => \{
			        expect(isProxySupported()).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\lib\\__tests__\\isProxySupported.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\compounds\\__tests__\\allOf.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			import 'compounds';
			
			describe('allOf', () => \{
			  describe('Lazy Assertions', () => \{
			    describe('When all rules  are satisfied', () => \{
			      it('Should return a passing result', () => \{
			        expect(
			          enforce.allOf(enforce.isArray(), enforce.longerThan(2)).run([1, 2, 3])
			        ).toEqual(ruleReturn.passing());
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\compounds\\__tests__\\allOf.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\compounds\\__tests__\\noneOf.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			import 'compounds';
			
			describe('noneOf', () => \{
			  describe('Lazy Assertions', () => \{
			    describe('When none of the rules  are satisfied', () => \{
			      it('Should return a passing result', () => \{
			        expect(
			          enforce.noneOf(enforce.isArray(), enforce.longerThan(2)).run('x')
			        ).toEqual(ruleReturn.passing());
			      \});
			    \});
			
			    describe('When some of the rules are satisfied', () => \{
			      it('Should return a failing result', () => \{
			        expect(
			          enforce.noneOf(enforce.isArray(), enforce.longerThan(2)).run([2])
			        ).toEqual(ruleReturn.failing());
			      \});
			    \});
			
			    describe('When all of the rules are satisfied', () => \{
			      it('Should return a failing result', () => \{
			        expect(
			          enforce.noneOf(enforce.isArray(), enforce.longerThan(2)).run([2, 3])
			        ).toEqual(ruleReturn.failing());
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\compounds\\__tests__\\noneOf.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\compounds\\__tests__\\oneOf.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			
			import 'schema';
			import 'compounds';
			
			describe('enforce.oneOf', () => \{
			  it('Should fail when multiple enforcements are met', () => \{
			    expect(
			      enforce.oneOf(enforce.isNumber(), enforce.greaterThan(2)).run(3)
			    ).toEqual(ruleReturn.failing());
			  \});
			
			  it('Should pass when only one enforcement is met', () => \{
			    expect(
			      User.run(\{
			        name: \{
			          first: 'John',
			          last: 'Doe',
			        \},
			      \})
			    ).toEqual(ruleReturn.passing());
			    expect(User.run(\{ id: 11 \})).toEqual(ruleReturn.passing());
			  \});
			
			  it('Should fail when no enforcement is met', () => \{
			    expect(User.run(\{\})).toEqual(ruleReturn.failing());
			  \});
			\});
			
			const Entity = enforce.loose(\{
			  id: enforce.isNumber(),
			\});
			
			const Person = enforce.loose(\{
			  name: enforce.shape(\{
			    first: enforce.isString().longerThan(2),
			    last: enforce.isString().longerThan(2),
			  \}),
			\});
			const User = enforce.oneOf(Entity, Person);
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\compounds\\__tests__\\oneOf.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\isArrayOf.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import 'schema';
			import 'compounds';
			import * as ruleReturn from 'ruleReturn';
			
			describe('enforce.isArrayOf', () => \{
			  describe('lazy interface', () => \{
			    it('Should return a passing return for an empty array', () => \{
			      expect(enforce.isArrayOf(enforce.isString()).run([])).toEqual(
			        ruleReturn.passing()
			      );
			    \});
			
			    it('Should return a passing return for valid arrays', () => \{
			      expect(
			        enforce.isArrayOf(enforce.isString()).run(['a', 'b', 'c'])
			      ).toEqual(ruleReturn.passing());
			
			      expect(
			        enforce
			          .isArrayOf(enforce.anyOf(enforce.isString(), enforce.isNumber()))
			          .run([1, 'b', 'c'])
			      ).toEqual(ruleReturn.passing());
			
			      expect(
			        enforce
			          .isArrayOf(
			            enforce.shape(\{
			              id: enforce.isNumber(),
			              username: enforce.isString(),
			            \})
			          )
			          .run([
			            \{ id: 1, username: 'b' \},
			            \{ id: 2, username: 'c' \},
			          ])
			      ).toEqual(ruleReturn.passing());
			    \});
			
			    it('Should return a failing return for invalid arrays', () => \{
			      expect(enforce.isArrayOf(enforce.isString()).run([1, 2, 3])).toEqual(
			        ruleReturn.failing()
			      );
			
			      expect(
			        enforce
			          .isArrayOf(enforce.allOf(enforce.isString(), enforce.isNumber()))
			          .run([1, 2, 3])
			      ).toEqual(ruleReturn.failing());
			
			      expect(
			        enforce
			          .isArrayOf(
			            enforce.shape(\{
			              id: enforce.isNumber(),
			              username: enforce.isString(),
			            \})
			          )
			          .run([
			            \{ id: '1', username: 'b' \},
			            \{ id: '2', username: 'c' \},
			            \{ id: '3', username: 'd' \},
			          ])
			      ).toEqual(ruleReturn.failing());
			    \});
			  \});
			
			  describe('eager interface', () => \{
			    it('Should return silently for an empty array', () => \{
			      enforce([]).isArrayOf(enforce.isString());
			    \});
			
			    it('Should return silently for valid arrays', () => \{
			      enforce(['a', 'b', 'c']).isArrayOf(enforce.isString());
			
			      enforce([1, 'b', 'c']).isArrayOf(
			        enforce.anyOf(enforce.isString(), enforce.isNumber())
			      );
			
			      enforce([
			        \{ id: 1, username: 'b' \},
			        \{ id: 2, username: 'c' \},
			      ]).isArrayOf(
			        enforce.shape(\{
			          id: enforce.isNumber(),
			          username: enforce.isString(),
			        \})
			      );
			    \});
			
			    it('Should throw for invalid arrays', () => \{
			      expect(() => enforce([1, 2, 3]).isArrayOf(enforce.isString())).toThrow();
			
			      expect(() =>
			        enforce([1, 2, 3]).isArrayOf(
			          enforce.allOf(enforce.isString(), enforce.isNumber())
			        )
			      ).toThrow();
			
			      expect(() =>
			        enforce([
			          \{ id: '1', username: 'b' \},
			          \{ id: '2', username: 'c' \},
			          \{ id: '3', username: 'd' \},
			        ]).isArrayOf(
			          enforce.shape(\{
			            id: enforce.isNumber(),
			            username: enforce.isString(),
			          \})
			        )
			      ).toThrow();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\isArrayOf.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\loose.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			import 'schema';
			
			describe('enforce.loose for loose matching', () => \{
			  describe('lazy interface', () => \{
			    it('Should return a passing return when value has non-enforced keys', () => \{
			      expect(
			        enforce
			          .loose(\{ username: enforce.isString(), age: enforce.isNumber() \})
			          .run(\{ username: 'ealush', age: 31, foo: 'bar' \})
			      ).toEqual(ruleReturn.passing());
			    \});
			  \});
			  describe('eager interface', () => \{
			    it('Should return sliently return when value has non-enforced keys', () => \{
			      enforce(\{ username: 'ealush', age: 31, foo: 'bar' \}).loose(\{
			        username: enforce.isString(),
			        age: enforce.isNumber(),
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\loose.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\optional.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			import 'schema';
			import 'compounds';
			
			describe('enforce.optional', () => \{
			  describe('lazy interface', () => \{
			    it('Should return a passing result for nullable values', () => \{
			      expect(enforce.optional(enforce.isNumber()).run(null)).toEqual(
			        ruleReturn.passing()
			      );
			      expect(enforce.optional(enforce.isArray()).run(undefined)).toEqual(
			        ruleReturn.passing()
			      );
			
			      expect(
			        enforce
			          .shape(\{
			            firstName: enforce.isString(),
			            middleName: enforce.optional(enforce.isString()),
			            lastName: enforce.isString(),
			          \})
			          .run(\{
			            firstName: 'John',
			            lastName: 'Doe',
			          \})
			      ).toEqual(ruleReturn.passing());
			    \});
			
			    it('Should return passing result for non-nullable values that satisfy the tests', () => \{
			      expect(enforce.optional(enforce.isNumber()).run(2)).toEqual(
			        ruleReturn.passing()
			      );
			      expect(enforce.optional(enforce.isArray()).run([1, 2])).toEqual(
			        ruleReturn.passing()
			      );
			      expect(
			        enforce
			          .shape(\{
			            firstName: enforce.isString(),
			            middleName: enforce.optional(enforce.isString()),
			            lastName: enforce.isString(),
			          \})
			          .run(\{
			            firstName: 'John',
			            middleName: 'H.',
			            lastName: 'Doe',
			          \})
			      ).toEqual(ruleReturn.passing());
			    \});
			
			    it('Should return a failing result for non-nullable values that do not satisfy the tests', () => \{
			      expect(enforce.optional(enforce.isNumber()).run('2')).toEqual(
			        ruleReturn.failing()
			      );
			      expect(enforce.optional(enforce.isArray()).run('2')).toEqual(
			        ruleReturn.failing()
			      );
			      expect(
			        enforce
			          .shape(\{
			            firstName: enforce.isString(),
			            middleName: enforce.optional(enforce.isString().longerThan(3)),
			            lastName: enforce.isString(),
			          \})
			          .run(\{
			            firstName: 'John',
			            middleName: 'H.',
			            lastName: 'Doe',
			          \})
			      ).toEqual(ruleReturn.failing());
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\optional.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\partial.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			import \{ partial \} from 'schema';
			
			import 'compounds';
			
			describe('partial', () => \{
			  describe('Lazy Interface', () => \{
			    it('Should pass when wrapped fields are undefined or null', () => \{
			      const rules = enforce.shape(
			        partial(\{
			          username: enforce.isString().longerThan(3),
			          id: enforce.isNumeric(),
			        \})
			      );
			
			      partial(\{\});
			
			      expect(rules.run(\{\})).toEqual(ruleReturn.passing());
			      expect(
			        rules.run(\{
			          username: null,
			          id: null,
			        \})
			      ).toEqual(ruleReturn.passing());
			    \});
			
			    it('Should pass when wrapped fields are valid', () => \{
			      const rules = enforce.shape(
			        partial(\{
			          username: enforce.isString().longerThan(3),
			          id: enforce.isNumeric(),
			        \})
			      );
			
			      expect(rules.run(\{ username: 'foobar', id: 1 \})).toEqual(
			        ruleReturn.passing()
			      );
			    \});
			
			    it('Should pass when some wrapped fields are missing', () => \{
			      const rules = enforce.shape(
			        partial(\{
			          username: enforce.isString().longerThan(3),
			          id: enforce.isNumeric(),
			        \})
			      );
			
			      expect(rules.run(\{ username: 'foobar' \})).toEqual(ruleReturn.passing());
			    \});
			
			    it('Should fail when wrapped fields are invalid', () => \{
			      const rules = enforce.shape(
			        partial(\{
			          username: enforce.isString().longerThan(3),
			          id: enforce.isNumeric(),
			        \})
			      );
			
			      expect(rules.run(\{ username: 'foo', id: '1' \})).toEqual(
			        ruleReturn.failing()
			      );
			    \});
			  \});
			
			  describe('Eager interface', () => \{
			    it('Should pass when wrapped fields are undefined or null', () => \{
			      enforce(\{\}).shape(
			        partial(\{
			          username: enforce.isString().longerThan(3),
			          id: enforce.isNumeric(),
			        \})
			      );
			
			      enforce(\{
			        username: null,
			        id: null,
			      \}).shape(
			        partial(\{
			          username: enforce.isString().longerThan(3),
			          id: enforce.isNumeric(),
			        \})
			      );
			    \});
			
			    it('Should pass when wrapped fields are valid', () => \{
			      enforce(\{ username: 'foobar', id: 1 \}).shape(
			        partial(\{
			          username: enforce.isString().longerThan(3),
			          id: enforce.isNumeric(),
			        \})
			      );
			    \});
			
			    it('Should pass when some wrapped fields are missing', () => \{
			      enforce(\{ username: 'foobar' \}).shape(
			        partial(\{
			          username: enforce.isString().longerThan(3),
			          id: enforce.isNumeric(),
			        \})
			      );
			    \});
			
			    it('Should fail when wrapped fields are invalid', () => \{
			      expect(() =>
			        enforce(\{ username: 'foo', id: '1' \}).shape(
			          partial(\{
			            username: enforce.isString().longerThan(3),
			            id: enforce.isNumeric(),
			          \})
			        )
			      ).toThrow();
			    \});
			  \});
			
			  it("Should retain rule's original constraints", () => \{
			    expect(
			      enforce
			        .shape(
			          partial(\{
			            username: enforce.isString().longerThan(3),
			            id: enforce.isNumeric(),
			          \})
			        )
			        .run(\{ username: 'foobar', id: '1', foo: 'bar' \})
			    ).toEqual(ruleReturn.failing());
			
			    expect(
			      enforce
			        .loose(
			          partial(\{
			            username: enforce.isString().longerThan(3),
			            id: enforce.isNumeric(),
			          \})
			        )
			        .run(\{ username: 'foobar', id: '1', foo: 'bar' \})
			    ).toEqual(ruleReturn.passing());
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\partial.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\shape&loose.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			import 'schema';
			import 'compounds';
			
			/* eslint-disable sort-keys */
			
			// The base behavior of 'loose' and 'shape' is practically the same
			// so we cover them using the same tests.
			describe.each(['loose', 'shape'])('enforce.%s', (methodName: string) => \{
			  describe('lazy interface', () => \{
			    it('Should return a passing return when tests are valid', () => \{
			      expect(
			        enforce[methodName](\{
			          username: enforce.isString(),
			          age: enforce.isNumber().gt(18),
			        \}).run(\{ username: 'ealush', age: 31 \})
			      ).toEqual(ruleReturn.passing());
			    \});
			
			    it('Should return a failing return when tests are invalid', () => \{
			      expect(
			        enforce[methodName](\{
			          username: enforce.isString(),
			          age: enforce.isNumber().gt(18),
			        \}).run(\{ username: null, age: 0 \})
			      ).toEqual(ruleReturn.failing());
			    \});
			
			    describe('nested shapes', () => \{
			      it('Should return a passing return when tests are valid', () => \{
			        expect(
			          enforce[methodName](\{
			            username: enforce.isString(),
			            age: enforce.isNumber().gt(18),
			            address: enforce.shape(\{
			              street: enforce.isString(),
			              city: enforce.isString(),
			              state: enforce.isString(),
			              zip: enforce.isNumber(),
			            \}),
			          \}).run(\{
			            username: 'ealush',
			            age: 31,
			            address: \{
			              street: '123 Main St',
			              city: 'New York',
			              state: 'NY',
			              zip: 12345,
			            \},
			          \})
			        ).toEqual(ruleReturn.passing());
			      \});
			      it('Should return a failing return when tests are invalid', () => \{
			        expect(
			          enforce[methodName](\{
			            username: enforce.isString(),
			            age: enforce.isNumber().gt(18),
			            address: enforce.shape(\{
			              street: enforce.isString(),
			              city: enforce.isString(),
			              state: enforce.isString(),
			              zip: enforce.isNumber(),
			            \}),
			          \}).run(\{
			            username: 'ealush',
			            age: 31,
			            address: \{
			              street: '123 Main St',
			              city: null,
			            \},
			          \})
			        ).toEqual(ruleReturn.failing());
			      \});
			    \});
			  \});
			
			  describe('eager interface', () => \{
			    it('Should throw an error fora failing return', () => \{
			      expect(() => \{
			        enforce(\{ username: null, age: 0 \})[methodName](\{
			          username: enforce.isString(),
			          age: enforce.isNumber().gt(18),
			        \});
			      \}).toThrow();
			    \});
			
			    it('Should return silently for a passing return', () => \{
			      enforce(\{ username: 'ealush', age: 31 \})[methodName](\{
			        username: enforce.isString(),
			        age: enforce.isNumber().gt(18),
			      \});
			    \});
			
			    describe('nested shapes', () => \{
			      it('Should return silently when tests are valid', () => \{
			        enforce(\{
			          username: 'ealush',
			          age: 31,
			          address: \{
			            street: '123 Main St',
			            city: 'New York',
			            state: 'NY',
			            zip: 12345,
			          \},
			        \})[methodName](\{
			          username: enforce.isString(),
			          age: enforce.isNumber().gt(18),
			          address: enforce.shape(\{
			            street: enforce.isString(),
			            city: enforce.isString(),
			            state: enforce.isString(),
			            zip: enforce.isNumber(),
			          \}),
			        \});
			      \});
			      it('Should throw when tests are invalid', () => \{
			        expect(() => \{
			          enforce(\{
			            username: 'ealush',
			            age: 31,
			            address: \{
			              street: '123 Main St',
			              city: null,
			            \},
			          \})[methodName](\{
			            username: enforce.isString(),
			            age: enforce.isNumber().gt(18),
			            address: enforce.shape(\{
			              street: enforce.isString(),
			              city: enforce.isString(),
			              state: enforce.isString(),
			              zip: enforce.isNumber(),
			            \}),
			          \});
			        \}).toThrow();
			      \});
			    \});
			  \});
			\});
			
			/* eslint-enable sort-keys */
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\shape&loose.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\shape.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			import 'schema';
			import 'compounds';
			
			describe('enforce.shape excact matching', () => \{
			  describe('lazy interface', () => \{
			    it('Should return a failing return when value has non-enforced keys', () => \{
			      expect(
			        enforce
			          .shape(\{ username: enforce.isString(), age: enforce.isNumber() \})
			          .run(\{ username: 'ealush', age: 31, foo: 'bar' \})
			      ).toEqual(ruleReturn.failing());
			    \});
			  \});
			  describe('eager interface', () => \{
			    it('Should throw an error when value has non-enforced keys', () => \{
			      expect(() => \{
			        enforce(\{ username: 'ealush', age: 31, foo: 'bar' \}).shape(\{
			          username: enforce.isString(),
			          age: enforce.isNumber(),
			        \});
			      \}).toThrow();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\plugins\\schema\\__tests__\\shape.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\endsWith.test.ts', () => {
        const sourceCode = `
			import \{ endsWith \} from 'endsWith';
			
			describe('Tests isArray rule', () => \{
			  const word = 'meow';
			  const totallyDifferentWord = 'lorem';
			  it('Should return true for the same word', () => \{
			    expect(endsWith(word, word)).toBe(true);
			  \});
			
			  it('Should return true for a suffix', () => \{
			    expect(endsWith(word, word.substring(word.length / 2, word.length))).toBe(
			      true
			    );
			  \});
			
			  it('Should return true for empty suffix', () => \{
			    expect(endsWith(word, '')).toBe(true);
			  \});
			
			  it('Should return false for a wrong suffix', () => \{
			    expect(endsWith(word, word.substring(0, word.length - 1))).toBe(false);
			  \});
			
			  it('Should return false for a suffix which is a totally different word', () => \{
			    expect(endsWith(word, totallyDifferentWord)).toBe(false);
			  \});
			
			  it('Should return false for a suffix longer than the word', () => \{
			    expect(endsWith(word, word.repeat(2))).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\endsWith.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\equals.test.ts', () => {
        const sourceCode = `
			import \{ random, datatype \} from 'faker';
			import \{ sample \} from 'lodash';
			
			import \{ equals \} from 'equals';
			
			const VALUES = [
			  random.word(),
			  datatype.number(),
			  \{ [random.objectElement()]: random.word() \},
			  [random.arrayElement()],
			  datatype.boolean(),
			];
			
			const LOOSE_PAIRS = [
			  [1, '1'],
			  [1, true],
			  [false, 0],
			  [undefined, null],
			];
			
			describe('Equals rule', () => \{
			  it('Should return true for same value', () => \{
			    VALUES.forEach(value => expect(equals(value, value)).toBe(true));
			  \});
			
			  it('Should return true for same different value', () => \{
			    VALUES.forEach(value => \{
			      let sampled = value;
			
			      // consistently produce a different value
			      while (sampled === value) \{
			        sampled = sample(VALUES);
			      \}
			
			      expect(equals(value, sampled)).toBe(false);
			    \});
			  \});
			
			  it('Should treat loose equality as false', () => \{
			    LOOSE_PAIRS.forEach(pair => expect(equals(pair[0], pair[1])).toBe(false));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\equals.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\greaterThanOrEquals.test.ts', () => {
        const sourceCode = `
			import \{ random, datatype \} from 'faker';
			
			import \{ greaterThanOrEquals \} from 'greaterThanOrEquals';
			
			describe('Tests greaterThanOrEquals rule', () => \{
			  let arg0;
			
			  describe('Arguments are numbers', () => \{
			    beforeEach(() => \{
			      arg0 = datatype.number();
			    \});
			
			    describe('When first argument is larger', () => \{
			      it('Should return true', () => \{
			        expect(greaterThanOrEquals(arg0, arg0 - 1)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return true', () => \{
			        expect(greaterThanOrEquals(arg0, arg0 + 1)).toBe(false);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return true', () => \{
			        expect(greaterThanOrEquals(arg0, arg0)).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('Arguments are numeric strings', () => \{
			    describe('When first argument is larger', () => \{
			      it('Should return true', () => \{
			        expect(greaterThanOrEquals(\`\$\{arg0\}\`, \`\$\{arg0 - 1\}\`)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return true', () => \{
			        expect(greaterThanOrEquals(\`\$\{arg0\}\`, \`\$\{arg0 + 1\}\`)).toBe(false);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return true', () => \{
			        expect(greaterThanOrEquals(arg0, arg0)).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('Arguments are non numeric', () => \{
			    [random.word(), \`\$\{datatype.number()\}\`.split(''), \{\}].forEach(element => \{
			      it('Should return false', () => \{
			        expect(greaterThanOrEquals(element, 0)).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\greaterThanOrEquals.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\inside.test.ts', () => {
        const sourceCode = `
			import \{ inside \} from 'inside';
			
			describe('Inside rule', () => \{
			  it('Should correctly find a string inside an array', () => \{
			    expect(inside("I'm", ["I'm", 'gonna', 'pop', 'some', 'tags'])).toBe(true);
			    expect(inside('Eric', ['Eric', 'Kenny', 'Kyle', 'Stan'])).toBe(true);
			    expect(inside('myString', [1, [55], 'myString'])).toBe(true);
			  \});
			
			  it('Should fail to find a string inside an array in which it does not exist', () => \{
			    expect(inside('going to', ["I'm", 'gonna', 'pop', 'some', 'tags'])).toBe(
			      false
			    );
			  \});
			
			  it('Should correctly find a number inside an array', () => \{
			    expect(inside(1, [1, 2, 3])).toBe(true);
			    expect(inside(42, [43, 44, 45, 46, 42])).toBe(true);
			    expect(inside(0, [1, [55], 0])).toBe(true);
			  \});
			
			  it('Should fail to find a number inside an array in which it does not exist', () => \{
			    expect(inside(55, [1, 2, 3])).toBe(false);
			  \});
			
			  it('Should correctly find a boolean inside an array', () => \{
			    expect(inside(true, [true, false, true, false])).toBe(true);
			    expect(inside(false, ['true', false])).toBe(true);
			  \});
			
			  it('Should fail to find a boolean inside an array in which it does not exist', () => \{
			    expect(inside(true, ['true', false])).toBe(false);
			    expect(inside(false, [true, 'one', 'two'])).toBe(false);
			  \});
			
			  it('Should fail to find array elemets in another array in which they do not exist', () => \{
			    expect(inside(['no', 'treble'], ['all', 'about', 'the', 'bass'])).toBe(
			      false
			    );
			  \});
			
			  it('Should fail to find object keys in an array in which they do not exist', () => \{
			    expect(inside(['one', 'two'], ['three', 'four'])).toBe(false);
			  \});
			
			  it('Should correctly find a string inside another string', () => \{
			    expect(inside('pop', "I'm gonna pop some tags")).toBe(true);
			    expect(inside('Kenny', 'You Killed Kenny!')).toBe(true);
			  \});
			
			  it('Should failt to find a string inside another string in which it does not exist', () => \{
			    expect(inside('mugs', "I'm gonna pop some tags")).toBe(false);
			  \});
			
			  it('Should return false when either values is not an array or string', () => \{
			    // @ts-ignore
			    expect(inside('pop', 1)).toBe(false);
			    // @ts-ignore
			    expect(inside(1, 'pop')).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\inside.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(11)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isBetween.test.ts', () => {
        const sourceCode = `
			import \{ isBetween \} from 'isBetween';
			
			describe('Tests isBetween rule', () => \{
			  it('Should return true for 5 between 0 and 10', () => \{
			    expect(isBetween(5, 0, 10)).toBe(true);
			  \});
			
			  it('Should return true for 5 between 4 and 6', () => \{
			    expect(isBetween(5, 4, 6)).toBe(true);
			  \});
			
			  it('Should return true for 5 not between 5 and 6', () => \{
			    expect(isBetween(5, 5, 6)).toBe(true);
			  \});
			
			  it('Should return true -5 between -5 and -6', () => \{
			    expect(isBetween(-5, -6, -5)).toBe(true);
			  \});
			
			  it('Should return true for -5 between -1 and -10', () => \{
			    expect(isBetween(-5, -10, -1)).toBe(true);
			  \});
			
			  it('Should return true for 5 between 5 and 5', () => \{
			    expect(isBetween(5, 5, 5)).toBe(true);
			  \});
			
			  it('Should return false for bad type for value', () => \{
			    expect(isBetween('string', 5, 10)).toBe(false);
			  \});
			
			  it('Should return false for bad type for min', () => \{
			    expect(isBetween(5, 'string', 10)).toBe(false);
			  \});
			
			  it('Should return false for bad type for max', () => \{
			    expect(isBetween(5, 4, 'string')).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isBetween.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isBlank.test.ts', () => {
        const sourceCode = `
			import \{ isBlank, isNotBlank \} from 'isBlank';
			
			describe('isBlank', () => \{
			  it('Should return true for a string of white spaces', () => \{
			    expect(isBlank('   ')).toBe(true);
			  \});
			
			  it('Should return false for a string with at least a non-whitespace', () => \{
			    expect(isBlank('not blank')).toBe(false);
			  \});
			
			  it('Should return true for undefined', () => \{
			    expect(isBlank(undefined)).toBeTruthy();
			  \});
			
			  it('Should return true for null', () => \{
			    expect(isBlank(null)).toBeTruthy();
			  \});
			\});
			
			describe('isNotBlank', () => \{
			  it('Should return false for a string of white spaces', () => \{
			    expect(isNotBlank('   ')).toBe(false);
			  \});
			
			  it('Should return true for a string with at least a non-whitespace', () => \{
			    expect(isNotBlank('not blank')).toBe(true);
			  \});
			
			  it('Should return false for undefined', () => \{
			    expect(isNotBlank(undefined)).toBeFalsy();
			  \});
			
			  it('Should return false for null', () => \{
			    expect(isNotBlank(null)).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isBlank.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isBoolean.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import \{ isBoolean, isNotBoolean \} from 'isBoolean';
			
			describe('isBoolean', () => \{
			  it('Should pass for a boolean value', () => \{
			    expect(isBoolean(true)).toBe(true);
			    expect(isBoolean(false)).toBe(true);
			    expect(isBoolean(Boolean(1))).toBe(true);
			    enforce(true).isBoolean();
			    enforce(false).isBoolean();
			  \});
			
			  it('Should fail for a non boolean value', () => \{
			    expect(isBoolean('true')).toBe(false);
			    expect(isBoolean([false])).toBe(false);
			    expect(isBoolean(null)).toBe(false);
			    expect(() => enforce('true').isBoolean()).toThrow();
			  \});
			\});
			
			describe('isNotBoolean', () => \{
			  it('Should pass for a non boolean value', () => \{
			    expect(isNotBoolean('true')).toBe(true);
			    expect(isNotBoolean([false])).toBe(true);
			    expect(isNotBoolean(null)).toBe(true);
			    enforce('true').isNotBoolean();
			    enforce([false]).isNotBoolean();
			  \});
			
			  it('Should fail for a boolean value', () => \{
			    expect(isNotBoolean(true)).toBe(false);
			    expect(isNotBoolean(false)).toBe(false);
			    expect(isNotBoolean(Boolean(1))).toBe(false);
			    expect(() => enforce(true).isNotBoolean()).toThrow();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isBoolean.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isEmpty.test.ts', () => {
        const sourceCode = `
			import \{ isEmpty \} from 'vest-utils';
			
			describe('Tests isEmpty rule', () => \{
			  describe('Expect true', () => \{
			    it('Should return false for a non-empty array', () => \{
			      expect(isEmpty([1, 2, 3, 4, 5, 6])).toBe(false);
			    \});
			
			    it('Should return true for an empty array', () => \{
			      expect(isEmpty([])).toBe(true);
			    \});
			
			    it('Should return false for a non-empty objecd', () => \{
			      expect(isEmpty(\{ a: 1 \})).toBe(false);
			    \});
			
			    it('Should return true for an empty object', () => \{
			      expect(isEmpty(\{\})).toBe(true);
			    \});
			
			    it('Should return true for an empty string', () => \{
			      expect(isEmpty('')).toBe(true);
			    \});
			
			    it('Should return false for a non empty string', () => \{
			      expect(isEmpty('hey')).toBe(false);
			    \});
			
			    it('Should return true for zero', () => \{
			      expect(isEmpty(0)).toBe(true);
			    \});
			
			    it('Should return false for one', () => \{
			      expect(isEmpty(1)).toBe(false);
			    \});
			
			    it('Should return true for undefined', () => \{
			      expect(isEmpty(undefined)).toBe(true);
			    \});
			
			    it('Should return true for null', () => \{
			      expect(isEmpty(null)).toBe(true);
			    \});
			
			    it('Should return true for NaN', () => \{
			      expect(isEmpty(NaN)).toBe(true);
			    \});
			
			    it('Should return false for a Symbol', () => \{
			      expect(isEmpty(Symbol('hey'))).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isEmpty.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isEven.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ isEven \} from 'isEven';
			
			describe('Tests isEven rule', () => \{
			  describe('When value is an even number', () => \{
			    const evenNumbers: number[] = [];
			
			    beforeAll(() => \{
			      let counter = 0;
			      while (evenNumbers.length < 100) \{
			        evenNumbers.push(counter);
			        counter += 2;
			      \}
			    \});
			
			    it('Should return true', () => \{
			      evenNumbers.forEach(number => \{
			        expect(isEven(number)).toBe(true);
			      \});
			    \});
			
			    describe('When value is a numeric string', () => \{
			      it('Should return true', () => \{
			        evenNumbers.forEach(number => \{
			          expect(isEven(number.toString())).toBe(true);
			        \});
			      \});
			    \});
			
			    describe('When value is negative', () => \{
			      it('Should return true', () => \{
			        evenNumbers.forEach(number => \{
			          expect(isEven(-number)).toBe(true);
			        \});
			      \});
			    \});
			  \});
			
			  describe('When value is an odd number', () => \{
			    const oddNumbers: number[] = [];
			
			    beforeAll(() => \{
			      let counter = 1;
			      while (oddNumbers.length < 100) \{
			        oddNumbers.push(counter);
			        counter += 2;
			      \}
			    \});
			
			    it('Should return false', () => \{
			      oddNumbers.forEach((number: number) => \{
			        expect(isEven(number)).toBe(false);
			        expect(isEven(-number)).toBe(false);
			        expect(isEven(number.toString())).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('When value is non numeric', () => \{
			    it('Should return false', () => \{
			      [
			        faker.random.word(),
			        [],
			        new Function(),
			        new Object(),
			        'withNumber2',
			        '2hasNumber',
			      ].forEach(value => \{
			        expect(isEven(value)).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isEven.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isKeyOf.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import \{ isKeyOf, isNotKeyOf \} from 'isKeyOf';
			
			const FRUITES = \{
			  apples: 5,
			  bananas: 2,
			  cantelopes: 0,
			\};
			
			const TOP_GROSSING_MOVIES = \{
			  1976: 'Rocky',
			  1988: 'Rain Man',
			  2008: 'The Dark Knight',
			\};
			
			const DUMMY_KEY = 'key';
			
			describe('Tests isKeyOf rule', () => \{
			  describe('When the key exists in the object', () => \{
			    it('Should return true', () => \{
			      expect(isKeyOf('bananas', FRUITES)).toBe(true);
			      expect(isKeyOf(1976, TOP_GROSSING_MOVIES)).toBe(true);
			    \});
			
			    it('Should return true using enforce', () => \{
			      enforce('bananas').isKeyOf(FRUITES);
			      enforce(1976).isKeyOf(TOP_GROSSING_MOVIES);
			    \});
			  \});
			
			  describe('When the key does not exists in the object', () => \{
			    it('Should return false', () => \{
			      expect(isKeyOf('avocado', FRUITES)).toBe(false);
			      expect(isKeyOf(1999, TOP_GROSSING_MOVIES)).toBe(false);
			    \});
			
			    it.each([undefined, null, false, true, Object, [], '', Function.prototype])(
			      'Should throw when %s is an object',
			      v => \{
			        expect(() => enforce(DUMMY_KEY).isKeyOf(\{ v \})).toThrow();
			      \}
			    );
			  \});
			\});
			
			describe('Tests isNotKeyOf rule', () => \{
			  describe('When the key does not exists in the object', () => \{
			    it('Should return true', () => \{
			      expect(isNotKeyOf('avocado', FRUITES)).toBe(true);
			    \});
			
			    it('Should return true using enforce', () => \{
			      enforce(1999).isNotKeyOf(TOP_GROSSING_MOVIES);
			    \});
			  \});
			
			  describe('When the key exists in the object', () => \{
			    it('Should return false', () => \{
			      expect(isNotKeyOf(1976, TOP_GROSSING_MOVIES)).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isKeyOf.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isNaN.test.ts', () => {
        const sourceCode = `
			import * as NaNRule from 'isNaN';
			
			describe('Tests isNaN rule', () => \{
			  it('Should return true for \`NaN\` value', () => \{
			    expect(NaNRule.isNaN(NaN)).toBe(true);
			  \});
			
			  it.each([
			    undefined,
			    null,
			    false,
			    true,
			    Object,
			    Array(0),
			    '',
			    ' ',
			    0,
			    1,
			    '0',
			    '1',
			  ])('Should return false for %s value', v => \{
			    expect(NaNRule.isNaN(v)).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isNaN.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isNegative.test.ts', () => {
        const sourceCode = `
			import \{ isNegative \} from 'isNegative';
			
			describe('Tests isNegative rule', () => \{
			  it('Should return false for zero', () => \{
			    expect(isNegative(0)).toBe(false);
			  \});
			  describe('When argument is a negative number', () => \{
			    it('Should return true for negative numer', () => \{
			      expect(isNegative(-1)).toBe(true);
			    \});
			    it('should return true for negative desimal number', () => \{
			      expect(isNegative(-1.1)).toBe(true);
			    \});
			    it('should return true for negative string number', () => \{
			      expect(isNegative('-1')).toBe(true);
			    \});
			    it('should return true for negative decimal string number', () => \{
			      expect(isNegative('-1.10')).toBe(true);
			    \});
			  \});
			  describe('When argument is a positive number', () => \{
			    it('should return false for positive number', () => \{
			      expect(isNegative(10)).toBe(false);
			    \});
			    it('should return false for positive desimal number', () => \{
			      expect(isNegative(10.1)).toBe(false);
			    \});
			    it('should return false for positive string number', () => \{
			      expect(isNegative('10')).toBe(false);
			    \});
			  \});
			
			  describe('When argument is undefined or null or string', () => \{
			    it('should return false for undefined value', () => \{
			      // @ts-expect-error - testing bad usage
			      expect(isNegative()).toBe(false);
			    \});
			    it('should return false for null value', () => \{
			      // @ts-expect-error - testing bad usage
			      expect(isNegative(null)).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isNegative.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isNullish.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'n4s';
			
			describe('enforce.isNullish', () => \{
			  it('Should return true for \`null\` value', () => \{
			    expect(enforce.isNullish().test(null)).toBe(true);
			  \});
			
			  it('Should return true for \`undefined\` value', () => \{
			    expect(enforce.isNullish().test(undefined)).toBe(true);
			  \});
			
			  it.each([
			    NaN,
			    false,
			    true,
			    Object,
			    Array(0),
			    '',
			    ' ',
			    0,
			    1,
			    '0',
			    '1',
			    Function.prototype,
			  ])('Should return false for %s value', v => \{
			    expect(enforce.isNullish().test(v)).toBe(false);
			  \});
			\});
			
			describe('enforce.isNotNullish', () => \{
			  it('Should return false for \`null\` value', () => \{
			    expect(enforce.isNotNullish().test(null)).toBe(false);
			  \});
			
			  it('Should return false for \`undefined\` value', () => \{
			    expect(enforce.isNotNullish().test(undefined)).toBe(false);
			  \});
			
			  it.each([
			    NaN,
			    false,
			    true,
			    Object,
			    Array(0),
			    '',
			    ' ',
			    0,
			    1,
			    '0',
			    '1',
			    Function.prototype,
			  ])('Should return true for %s value', v => \{
			    expect(enforce.isNotNullish().test(v)).toBe(true);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isNullish.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isNumber.test.ts', () => {
        const sourceCode = `
			import \{ isNumber \} from 'isNumber';
			
			describe('Tests isNumber rule', () => \{
			  it('Should return true for a number', () => \{
			    expect(isNumber(42)).toBe(true);
			  \});
			
			  it('Should return true for a NaN', () => \{
			    expect(isNumber(NaN)).toBe(true);
			  \});
			
			  it('Should return false a string', () => \{
			    expect(isNumber('1')).toBe(false);
			  \});
			
			  it('Should return false an array', () => \{
			    expect(isNumber([1, 2, 3])).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isNumber.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isOdd.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ isOdd \} from 'isOdd';
			
			describe('Tests isOdd rule', () => \{
			  describe('When value is an odd number', () => \{
			    const oddNumbers: number[] = [];
			
			    beforeAll(() => \{
			      let counter = 1;
			      while (oddNumbers.length < 100) \{
			        oddNumbers.push(counter);
			        counter += 2;
			      \}
			    \});
			
			    it('Should return true', () => \{
			      oddNumbers.forEach(number => \{
			        expect(isOdd(number)).toBe(true);
			      \});
			    \});
			
			    describe('When value is a numeric string', () => \{
			      it('Should return true', () => \{
			        oddNumbers.forEach(number => \{
			          expect(isOdd(number.toString())).toBe(true);
			        \});
			      \});
			    \});
			
			    describe('When value is negative', () => \{
			      it('Should return true', () => \{
			        oddNumbers.forEach(number => \{
			          expect(isOdd(-number)).toBe(true);
			        \});
			      \});
			    \});
			  \});
			
			  describe('When value is an even number', () => \{
			    const evenNumbers: number[] = [];
			
			    beforeAll(() => \{
			      let counter = 0;
			      while (evenNumbers.length < 100) \{
			        evenNumbers.push(counter);
			        counter += 2;
			      \}
			    \});
			
			    it('Should return false', () => \{
			      evenNumbers.forEach((number: number) => \{
			        expect(isOdd(number)).toBe(false);
			        expect(isOdd(-number)).toBe(false);
			        expect(isOdd(number.toString())).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('When value is non numeric', () => \{
			    it('Should return false', () => \{
			      [
			        faker.random.word(),
			        [],
			        new Function(),
			        new Object(),
			        'withNumber1',
			        '1hasNumber',
			      ].forEach(value => \{
			        expect(isOdd(value)).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isOdd.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isPositive.test.ts', () => {
        const sourceCode = `
			import \{ isPositive \} from 'vest-utils';
			
			describe('Test isPositive rule', () => \{
			  it('Should return false for zero', () => \{
			    expect(isPositive(0)).toBe(false);
			  \});
			
			  describe('When argument is a positive number', () => \{
			    it('Should return true for positive number', () => \{
			      expect(isPositive(10)).toBe(true);
			    \});
			    it('should return true for positive desimal number', () => \{
			      expect(isPositive(10.1)).toBe(true);
			    \});
			    it('should return true for positive string number', () => \{
			      expect(isPositive('10')).toBe(true);
			    \});
			    it('should return true for positive decimal string number', () => \{
			      expect(isPositive('10.10')).toBe(true);
			    \});
			  \});
			
			  describe('When argument is a negative number', () => \{
			    it('Should return false for negative numer', () => \{
			      expect(isPositive(-1)).toBe(false);
			    \});
			    it('should return false for negative desimal number', () => \{
			      expect(isPositive(-1.1)).toBe(false);
			    \});
			    it('should return false for negative string number', () => \{
			      expect(isPositive('-1')).toBe(false);
			    \});
			    it('should return false for negative decimal string number', () => \{
			      expect(isPositive('-1.10')).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isPositive.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isString.test.ts', () => {
        const sourceCode = `
			import \{ isString \} from 'isString';
			
			describe('Tests isString rule', () => \{
			  it('Should return false for a number', () => \{
			    expect(isString(42)).toBe(false);
			  \});
			
			  it('Should return false for an array', () => \{
			    expect(isString([])).toBe(false);
			  \});
			
			  it('Should return true a string', () => \{
			    expect(isString('I love you')).toBe(true);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isString.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isTruthy.test.ts', () => {
        const sourceCode = `
			import \{ isTruthy \} from 'isTruthy';
			
			describe('Tests isTruthy rule', () => \{
			  const values = [
			    [0, false, 0],
			    [null, false, 'null'],
			    [undefined, false, 'undefined'],
			    [false, false, 'false'],
			    [\{\}, true, '\{\}'],
			    [[], true, '[]'],
			    ['', false, '""'],
			    [1, true, 1],
			    ['hi', true, 'hi'],
			    [new Date(), true, 'new Date()'],
			    [() => true, true, '() => true'],
			    [[1], true, '[1]'],
			  ];
			
			  for (const set of values) \{
			    const value = set[0],
			      expected = set[1],
			      name = set[2];
			
			    it(\`The value \$\{name\} with type \$\{typeof value\}  Should return \$\{expected\}\`, () => \{
			      expect(isTruthy(value)).toBe(expected);
			    \});
			  \}
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isTruthy.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isValueOf.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import \{ isValueOf, isNotValueOf \} from 'isValueOf';
			
			const testObject = \{
			  a: 'Bravo',
			  b: false,
			  c: 42,
			\};
			
			const testObject2 = \{
			  d: \{
			    greet: 'hello',
			  \},
			  e: null,
			  f: undefined,
			\};
			
			describe('isValueOf tests', () => \{
			  describe('When the value exists in the object', () => \{
			    it('Should return true using enforce', () => \{
			      enforce('Bravo').isValueOf(testObject);
			      enforce(42).isValueOf(testObject);
			      enforce(false).isValueOf(testObject);
			      enforce(null).isValueOf(testObject2);
			      enforce(undefined).isValueOf(testObject2);
			    \});
			
			    it('Should return true', () => \{
			      expect(isValueOf('Bravo', testObject)).toBe(true);
			      expect(isValueOf(42, testObject)).toBe(true);
			      expect(isValueOf(false, testObject)).toBe(true);
			      expect(isValueOf(null, testObject2)).toBe(true);
			      expect(isValueOf(undefined, testObject2)).toBe(true);
			    \});
			  \});
			  describe('When the value does not exist in the object', () => \{
			    it('Should return false', () => \{
			      expect(isValueOf('Alpha', testObject)).toBe(false);
			      expect(isValueOf(1, testObject)).toBe(false);
			      expect(isValueOf(true, testObject)).toBe(false);
			      expect(isValueOf(null, testObject)).toBe(false);
			      expect(isValueOf(\{ greet: 'hello' \}, testObject2)).toBe(false);
			    \});
			
			    it('Should throw using enforce', () => \{
			      expect(() => enforce('Alpha').isValueOf(testObject)).toThrow();
			      expect(() => enforce(null).isValueOf(testObject)).toThrow();
			    \});
			  \});
			
			  describe('When object to check is nullish', () => \{
			    it('Should return false', () => \{
			      expect(isValueOf('Bravo', null)).toBe(false);
			      expect(isValueOf('Bravo', undefined)).toBe(false);
			    \});
			  \});
			\});
			
			describe('isNotValueOf tests', () => \{
			  describe('When the value does not exist in the object', () => \{
			    it('Should return true using enforce', () => \{
			      enforce('Delta').isNotValueOf(testObject);
			    \});
			    it('Should return true', () => \{
			      expect(isNotValueOf('Alpha', testObject)).toBe(true);
			      expect(isNotValueOf(1, testObject)).toBe(true);
			      expect(isNotValueOf(true, testObject)).toBe(true);
			      expect(isNotValueOf(null, testObject)).toBe(true);
			    \});
			  \});
			  describe('When the value exists in the object', () => \{
			    it('Should return false', () => \{
			      expect(isNotValueOf('Bravo', testObject)).toBe(false);
			    \});
			    it('Should throw using enforce', () => \{
			      expect(() => enforce(42).isNotValueOf(testObject)).toThrow();
			    \});
			  \});
			
			  describe('When object to check is nullish', () => \{
			    it('Should return true', () => \{
			      expect(isNotValueOf('Bravo', null)).toBe(true);
			      expect(isNotValueOf('Bravo', undefined)).toBe(true);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\isValueOf.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\lessThan.test.ts', () => {
        const sourceCode = `
			import \{ random, datatype \} from 'faker';
			
			import \{ lessThan \} from 'lessThan';
			
			describe('Tests lessThan rule', () => \{
			  let arg0;
			
			  describe('Arguments are numbers', () => \{
			    beforeEach(() => \{
			      arg0 = datatype.number();
			    \});
			
			    describe('When first argument is larger', () => \{
			      it('Should return true', () => \{
			        expect(lessThan(arg0, arg0 - 1)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return true', () => \{
			        expect(lessThan(arg0, arg0 + 1)).toBe(true);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return false', () => \{
			        expect(lessThan(arg0, arg0)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('Arguments are numeric strings', () => \{
			    describe('When first argument is larger', () => \{
			      it('Should return true', () => \{
			        expect(lessThan(\`\$\{arg0\}\`, \`\$\{arg0 - 1\}\`)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return true', () => \{
			        expect(lessThan(\`\$\{arg0\}\`, \`\$\{arg0 + 1\}\`)).toBe(true);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return false', () => \{
			        expect(lessThan(arg0, arg0)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('Arguments are non numeric', () => \{
			    [random.word(), \`\$\{datatype.number()\}\`.split(''), \{\}].forEach(element => \{
			      it('Should return false', () => \{
			        expect(lessThan(element, 0)).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\lessThan.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\lessThanOrEquals.test.ts', () => {
        const sourceCode = `
			import \{ random, datatype \} from 'faker';
			
			import \{ lessThanOrEquals \} from 'lessThanOrEquals';
			
			describe('Tests lessThanOrEquals rule', () => \{
			  let arg0;
			
			  describe('Arguments are numbers', () => \{
			    beforeEach(() => \{
			      arg0 = datatype.number();
			    \});
			
			    describe('When first argument is larger', () => \{
			      it('Should return true', () => \{
			        expect(lessThanOrEquals(arg0, arg0 - 1)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return true', () => \{
			        expect(lessThanOrEquals(arg0, arg0 + 1)).toBe(true);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return true', () => \{
			        expect(lessThanOrEquals(arg0, arg0)).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('Arguments are numeric strings', () => \{
			    describe('When first argument is larger', () => \{
			      it('Should return true', () => \{
			        expect(lessThanOrEquals(\`\$\{arg0\}\`, \`\$\{arg0 - 1\}\`)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return true', () => \{
			        expect(lessThanOrEquals(\`\$\{arg0\}\`, \`\$\{arg0 + 1\}\`)).toBe(true);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return true', () => \{
			        expect(lessThanOrEquals(arg0, arg0)).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('Arguments are non numeric', () => \{
			    [random.word(), \`\$\{datatype.number()\}\`.split(''), \{\}].forEach(element => \{
			      it('Should return false', () => \{
			        expect(lessThanOrEquals(element, 0)).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\lessThanOrEquals.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\longerThanOrEquals.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ longerThanOrEquals \} from 'longerThanOrEquals';
			
			describe('Tests longerThanOrEquals rule', () => \{
			  const length = faker.datatype.number();
			  const word = faker.random.word();
			  const boolean = faker.datatype.boolean();
			
			  describe('First argument is array or string', () => \{
			    describe('When first argument is longer', () => \{
			      it('Should return true for an array longer than length', () => \{
			        expect(longerThanOrEquals(new Array(length), length - 1)).toBe(true);
			      \});
			
			      it('Should return true for a string longer than word length', () => \{
			        expect(longerThanOrEquals(word, word.length - 1)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is equal to a given value', () => \{
			      it('Should return true for an array equal to length', () => \{
			        expect(longerThanOrEquals(new Array(length), length)).toBe(true);
			      \});
			
			      it('Should return true for a string equal to word length', () => \{
			        expect(longerThanOrEquals(word, word.length)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is shorter', () => \{
			      it('Should return false for an array shorter than length', () => \{
			        expect(longerThanOrEquals(new Array(length), length + 1)).toBe(false);
			      \});
			
			      it('Should return false for a string shorter than word length', () => \{
			        expect(longerThanOrEquals(word, word.length + 1)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe("First argument isn't array or string", () => \{
			    it('Should throw error', () => \{
			      // @ts-expect-error - testing invalid input
			      expect(() => longerThanOrEquals(undefined, 0)).toThrow(TypeError);
			    \});
			
			    it('Should return false for number argument', () => \{
			      expect(longerThanOrEquals(length, 0)).toBe(false);
			    \});
			
			    it('Should return false for boolean argument', () => \{
			      expect(longerThanOrEquals(boolean, 0)).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\longerThanOrEquals.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\matches.test.ts', () => {
        const sourceCode = `
			import \{ matches \} from 'matches';
			
			const URL =
			    /(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]\{1,256\}\\.(?=.*[a-z])\{1,24\}\\b([-a-zA-Z0-9@:%_+.~#?&//=()]*)/,
			  LENGTH = /^[a-zA-Z]\{3,7\}\$/,
			  NUMBERS = '[0-9]';
			
			describe('Tests matches rule', () => \{
			  it('Should return true for a matching regex', () => \{
			    expect(matches('https://google.com', URL)).toBe(true);
			    expect(matches('github.com', URL)).toBe(true);
			    expect(matches('ealush', LENGTH)).toBe(true);
			  \});
			
			  it('Should return false for a non matching regex', () => \{
			    expect(matches('google', URL)).toBe(false);
			    expect(matches('Minimum1', LENGTH)).toBe(false);
			  \});
			
			  it('Should convert string to regex and return true', () => \{
			    expect(matches('9675309', NUMBERS)).toBe(true);
			    expect(matches('Minimum1', NUMBERS)).toBe(true);
			  \});
			
			  it('Should convert string to regex and return false', () => \{
			    expect(matches('no-match', NUMBERS)).toBe(false);
			    expect(matches('Minimum', NUMBERS)).toBe(false);
			  \});
			
			  it('Should return false if a valid RegExp nor a string were given', () => \{
			    // @ts-expect-error - testing bad usage
			    expect(matches('no-match', \{\})).toBe(false);
			    // @ts-expect-error - testing bad usage
			    expect(matches('no-match')).toBe(false);
			    // @ts-expect-error - testing bad usage
			    expect(matches('no-match', null)).toBe(false);
			    // @ts-expect-error - testing bad usage
			    expect(matches('no-match', 11)).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\matches.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\ruleCondition.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'n4s';
			import ruleReturn, \{ failing, passing \} from 'ruleReturn';
			
			describe('enforce.condition', () => \{
			  it('Should pass down enforced value to condition as the first argument', () => \{
			    const condition = jest.fn(() => true);
			
			    enforce(1).condition(condition);
			    expect(condition).toHaveBeenCalledWith(1);
			
			    enforce.condition(condition).run(2);
			    expect(condition).toHaveBeenCalledWith(2);
			  \});
			
			  describe('Lazy interface', () => \{
			    it('Should return a failing result if condition is failing', () => \{
			      expect(enforce.condition(() => false).run(1)).toEqual(failing());
			      expect(enforce.condition(() => failing()).run(1)).toEqual(failing());
			      expect(
			        enforce.condition(() => ruleReturn(false, 'failure message')).run(1)
			      ).toEqual(ruleReturn(false, 'failure message'));
			    \});
			
			    it('Should return a passing result if condition is passing', () => \{
			      expect(enforce.condition(() => true).run(1)).toEqual(passing());
			      expect(enforce.condition(() => passing()).run(1)).toEqual(passing());
			      expect(
			        enforce.condition(() => ruleReturn(true, 'success message')).run(1)
			      ).toEqual(passing());
			    \});
			  \});
			
			  describe('Eager interface', () => \{
			    it('Should throw an error if condition is failing', () => \{
			      expect(() => enforce(1).condition(() => false)).toThrow();
			
			      expect(() => enforce(1).condition(() => failing())).toThrow();
			
			      expect(() =>
			        enforce(1).condition(() => ruleReturn(false, 'failure message'))
			      ).toThrow();
			    \});
			
			    it('Should return silently if condition is passing', () => \{
			      expect(() => enforce(1).condition(() => true)).not.toThrow();
			
			      expect(() => enforce(1).condition(() => passing())).not.toThrow();
			
			      expect(() =>
			        enforce(1).condition(() => ruleReturn(true, 'success message'))
			      ).not.toThrow();
			    \});
			  \});
			
			  describe('Error handling', () => \{
			    it('Should fail if not a function', () => \{
			      // @ts-expect-error - testing bad usage
			      expect(() => enforce().condition('not a function')).toThrow();
			      expect(enforce.condition('not a function').run(1)).toEqual(failing());
			    \});
			
			    it('Should throw an error if condition returns a non-boolean or a non-ruleReturn', () => \{
			      expect(() => enforce(1).condition(() => 1)).toThrow();
			      expect(() => enforce(1).condition(() => undefined)).toThrow();
			      expect(() => enforce(1).condition(() => 'not a boolean')).toThrow();
			
			      // @ts-expect-error - testing bad usage
			      expect(() => enforce(1).condition(() => ruleReturn())).toThrow();
			      expect(() => enforce.condition(() => 1).run(1)).toThrow();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\ruleCondition.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\rules.test.ts', () => {
        const sourceCode = `
			import rules from 'rules';
			
			describe('Tests enforce rules API', () => \{
			  it('Should expose all enforce rules', () => \{
			    Object.keys(rules()).forEach(rule => \{
			      expect(rules()[rule]).toBeInstanceOf(Function);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\rules.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\shorterThan.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ shorterThan \} from 'shorterThan';
			
			describe('Tests shorterThan rule', () => \{
			  const length = faker.datatype.number();
			  const word = faker.random.word();
			  const boolean = faker.datatype.boolean();
			
			  describe('First argument is array or string', () => \{
			    describe('When first argument is shorter', () => \{
			      it('Should return true for an array shorter than length', () => \{
			        expect(shorterThan(new Array(length), length + 1)).toBe(true);
			      \});
			
			      it('Should return true for a string shorter than word length', () => \{
			        expect(shorterThan(word, word.length + 1)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is longer', () => \{
			      it('Should return false for an array longer than length', () => \{
			        expect(shorterThan(new Array(length), length - 1)).toBe(false);
			      \});
			
			      it('Should return false for a string longer than word length', () => \{
			        expect(shorterThan(word, word.length - 1)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is equal to a given value', () => \{
			      it('Should return false for an array equal to length', () => \{
			        expect(shorterThan(new Array(length), length)).toBe(false);
			      \});
			
			      it('Should return false for a string equal to word length', () => \{
			        expect(shorterThan(word, word.length)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe("First argument isn't array or string", () => \{
			    it('Should throw error', () => \{
			      // @ts-expect-error - testing wrong input
			      expect(() => shorterThan(undefined, 0)).toThrow(TypeError);
			    \});
			
			    it('Should return false for number argument', () => \{
			      expect(shorterThan(length, 0)).toBe(false);
			    \});
			
			    it('Should return false for boolean argument', () => \{
			      expect(shorterThan(boolean, 0)).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\shorterThan.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\shorterThanOrEquals.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ shorterThanOrEquals \} from 'shorterThanOrEquals';
			
			describe('Tests shorterThanOrEquals rule', () => \{
			  const length = faker.datatype.number();
			  const word = faker.random.word();
			  const boolean = faker.datatype.boolean();
			
			  describe('First argument is array or string', () => \{
			    describe('When first argument is shorter', () => \{
			      it('Should return true for an array shorter than length', () => \{
			        expect(shorterThanOrEquals(new Array(length), length + 1)).toBe(true);
			      \});
			
			      it('Should return true for a string shorter than word length', () => \{
			        expect(shorterThanOrEquals(word, word.length + 1)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is equal to a given value', () => \{
			      it('Should return true for an array equal to length', () => \{
			        expect(shorterThanOrEquals(new Array(length), length)).toBe(true);
			      \});
			
			      it('Should return true for a string equal to word length', () => \{
			        expect(shorterThanOrEquals(word, word.length)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is longer', () => \{
			      it('Should return false for an array longer than length', () => \{
			        expect(shorterThanOrEquals(new Array(length), length - 1)).toBe(false);
			      \});
			
			      it('Should return false for a string longer than length', () => \{
			        expect(shorterThanOrEquals(word, word.length - 1)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe("First argument isn't array or string", () => \{
			    it('Should throw error', () => \{
			      // @ts-expect-error - testing wrong input
			      expect(() => shorterThanOrEquals(undefined, 0)).toThrow(TypeError);
			    \});
			
			    it('Should return false for number argument', () => \{
			      expect(shorterThanOrEquals(length, 0)).toBe(false);
			    \});
			
			    it('Should return false for boolean argument', () => \{
			      expect(shorterThanOrEquals(boolean, 0)).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\shorterThanOrEquals.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\startsWith.test.ts', () => {
        const sourceCode = `
			import \{ startsWith \} from 'startsWith';
			
			describe('Tests isArray rule', () => \{
			  const word = 'meow';
			  const totallyDifferentWord = 'lorem';
			  it('Should return true for the same word', () => \{
			    expect(startsWith(word, word)).toBe(true);
			  \});
			
			  it('Should return true for a prefix', () => \{
			    expect(startsWith(word, word.substring(0, word.length / 2))).toBe(true);
			  \});
			
			  it('Should return true for empty prefix', () => \{
			    expect(startsWith(word, '')).toBe(true);
			  \});
			
			  it('Should return false for a wrong prefix', () => \{
			    expect(startsWith(word, word.substring(1, word.length - 1))).toBe(false);
			  \});
			
			  it('Should return false for a prefix which is a totally different word', () => \{
			    expect(startsWith(word, totallyDifferentWord)).toBe(false);
			  \});
			
			  it('Should return false for a prefix longer than the word', () => \{
			    expect(startsWith(word, word.repeat(2))).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\rules\\__tests__\\startsWith.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\n4s\\src\\runtime\\__tests__\\enforceContext.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import * as ruleReturn from 'ruleReturn';
			import 'schema';
			import 'compounds';
			
			let keepContext = jest.fn();
			
			describe('enforce.context', () => \{
			  beforeEach(() => \{
			    keepContext = jest.fn();
			  \});
			
			  describe('base structure', () => \{
			    it('Should match snapshot', () => \{
			      enforce(\{\}).someCustomRule();
			      expect(keepContext.mock.calls[0][0]).toMatchInlineSnapshot(\`
			        Object \{
			          "meta": Object \{\},
			          "parent": [Function],
			          "value": Object \{\},
			        \}
			      \`);
			    \});
			  \});
			
			  describe('When in top level', () => \{
			    it('Should return top level value when not in a nested rule', () => \{
			      enforce('some_value').someCustomRule();
			
			      expect(keepContext.mock.calls[0][0].value).toBe('some_value');
			    \});
			
			    test('context.parent() returns null when in top level', () => \{
			      enforce('some_value').someCustomRule();
			      expect(keepContext.mock.calls[0][0].parent()).toBeNull();
			    \});
			  \});
			
			  describe('context.parent traversal', () => \{
			    it('Allows traversal to parent values via "parent"', () => \{
			      enforce(\{
			        name: \{
			          first: 'Elle',
			        \},
			        siblings: ['Danny'],
			      \}).loose(\{
			        name: enforce
			          .shape(\{
			            first: enforce.isString().someCustomRule(),
			          \})
			          .someCustomRule(),
			        siblings: enforce
			          .isArrayOf(enforce.isString().someCustomRule())
			          .someCustomRule(),
			      \});
			
			      // first.parent() === name
			      expect(keepContext.mock.calls[0][0].parent()).toEqual(
			        keepContext.mock.calls[1][0]
			      );
			
			      // siblings[0].parent() === siblings
			      expect(keepContext.mock.calls[2][0].parent()).toEqual(
			        keepContext.mock.calls[3][0]
			      );
			    \});
			
			    it('Should return null when no further parents to traverse to', () => \{
			      enforce(\{
			        name: \{
			          first: 'Elle',
			        \},
			        siblings: ['Danny'],
			      \})
			        .loose(\{
			          name: enforce
			            .shape(\{
			              first: enforce.isString().someCustomRule(),
			            \})
			            .someCustomRule(),
			          siblings: enforce
			            .isArrayOf(enforce.isString().someCustomRule())
			            .someCustomRule(),
			        \})
			        .someCustomRule();
			
			      expect(
			        keepContext.mock.calls[0][0].parent().parent().parent()
			      ).toBeNull();
			      expect(keepContext.mock.calls[1][0].parent().parent()).toBeNull();
			      expect(keepContext.mock.calls[4][0].parent()).toBeNull();
			    \});
			  \});
			
			  describe('In schema rules', () => \{
			    describe.each(['shape', 'loose'])('enforce.%s', (methodName: string) => \{
			      it('Should add the current value within shape rules', () => \{
			        enforce(\{
			          name: \{
			            first: 'Elle',
			            last: 'Tester',
			            middle: 'Sophie',
			          \},
			        \})
			          [methodName](\{
			            name: enforce[methodName](\{
			              first: enforce.isString().someCustomRule(),
			              last: enforce.isString().someCustomRule(),
			              middle: enforce.optional(enforce.isString().someCustomRule()),
			            \}).someCustomRule(),
			          \})
			          .someCustomRule();
			
			        expect(keepContext.mock.calls[0][0].value).toBe('Elle'); // first
			        expect(keepContext.mock.calls[1][0].value).toBe('Tester'); // last
			        expect(keepContext.mock.calls[2][0].value).toBe('Sophie'); // middle
			        expect(keepContext.mock.calls[3][0].value).toEqual(\{
			          first: 'Elle',
			          last: 'Tester',
			          middle: 'Sophie',
			        \}); // name
			        expect(keepContext.mock.calls[4][0].value).toEqual(\{
			          name: \{
			            first: 'Elle',
			            last: 'Tester',
			            middle: 'Sophie',
			          \},
			        \}); // top level shape
			      \});
			      it('Adds name of current key to "meta"', () => \{
			        enforce(\{
			          name: \{
			            first: 'Elle',
			            last: 'Tester',
			            middle: 'Sophie',
			          \},
			        \})[methodName](\{
			          name: enforce[methodName](\{
			            first: enforce.isString().someCustomRule(),
			            last: enforce.isString().someCustomRule(),
			            middle: enforce.optional(enforce.isString().someCustomRule()),
			          \}).someCustomRule(),
			        \});
			
			        expect(keepContext.mock.calls[0][0].meta).toEqual(\{ key: 'first' \});
			        expect(keepContext.mock.calls[1][0].meta).toEqual(\{ key: 'last' \});
			        expect(keepContext.mock.calls[2][0].meta).toEqual(\{ key: 'middle' \});
			        expect(keepContext.mock.calls[3][0].meta).toEqual(\{ key: 'name' \});
			      \});
			    \});
			
			    describe('enforce.isArrayOf', () => \{
			      it('passes the current value into the context', () => \{
			        enforce(['Elle', 'Tester', 'Sophie']).isArrayOf(
			          enforce.isString().someCustomRule()
			        );
			
			        expect(keepContext.mock.calls[0][0].value).toBe('Elle');
			        expect(keepContext.mock.calls[1][0].value).toBe('Tester');
			        expect(keepContext.mock.calls[2][0].value).toBe('Sophie');
			      \});
			
			      it('passes the current index into the context meta field', () => \{
			        enforce(['Elle', 'Tester', 'Sophie']).isArrayOf(
			          enforce.isString().someCustomRule()
			        );
			        expect(keepContext.mock.calls[0][0].meta).toEqual(\{ index: 0 \});
			        expect(keepContext.mock.calls[1][0].meta).toEqual(\{ index: 1 \});
			        expect(keepContext.mock.calls[2][0].meta).toEqual(\{ index: 2 \});
			      \});
			    \});
			  \});
			
			  describe('real usecase example', () => \{
			    it('Should fail if username is in the friends list', () => \{
			      expect(() =>
			        enforce(\{
			          username: 'johndoe',
			          friends: ['Mike', 'Jim', 'johndoe'],
			        \}).shape(\{
			          username: enforce.isString(),
			          friends: enforce.isArrayOf(
			            enforce.isString().isFriendTheSameAsUser()
			          ),
			        \})
			      ).toThrow();
			    \});
			
			    it('Should pass if username is not in the friends list', () => \{
			      enforce(\{
			        username: 'johndoe',
			        friends: ['Mike', 'Jim'],
			      \}).shape(\{
			        username: enforce.isString(),
			        friends: enforce.isArrayOf(enforce.isString().isFriendTheSameAsUser()),
			      \});
			    \});
			  \});
			\});
			
			enforce.extend(\{
			  someCustomRule: () => \{
			    const context = enforce.context();
			
			    // Just an easy way of peeking
			    // into the context from the test
			    keepContext(context);
			    return true;
			  \},
			  isFriendTheSameAsUser: value => \{
			    const context = enforce.context();
			
			    if (value === context?.parent()?.parent()?.value.username) \{
			      return ruleReturn.failing();
			    \}
			
			    return true;
			  \},
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\runtime\\__tests__\\enforceContext.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(11)
    });
    it('ealush_vest\\packages\\n4s\\src\\runtime\\__tests__\\message.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'enforce';
			import ruleReturn from 'ruleReturn';
			
			describe('enforce..message()', () => \{
			  it('Should set the failure message in builtin rules', () => \{
			    expect(
			      enforce.equals(false).message('oof. Expected true to be false').run(true)
			    ).toEqual(ruleReturn(false, 'oof. Expected true to be false'));
			
			    expect(
			      enforce
			        .equals(false)
			        .message(() => 'oof. Expected true to be false')
			        .run(true)
			    ).toEqual(ruleReturn(false, 'oof. Expected true to be false'));
			  \});
			
			  it('Should set the failure message in custom rules', () => \{
			    expect(
			      enforce.ruleWithFailureMessage().message('oof. Failed again!').run(true)
			    ).toEqual(ruleReturn(false, 'oof. Failed again!'));
			
			    expect(
			      enforce
			        .ruleWithFailureMessage()
			        .message(() => 'oof. Failed again!')
			        .run(true)
			    ).toEqual(ruleReturn(false, 'oof. Failed again!'));
			  \});
			
			  describe('.message callback', () => \{
			    it('Should be passed the rule value as the first argument', () => \{
			      const msg = jest.fn(() => 'some message');
			      const arg = \{\};
			      expect(enforce.equals(false).message(msg).run(arg)).toEqual(
			        ruleReturn(false, 'some message')
			      );
			      expect(msg).toHaveBeenCalledWith(arg, undefined);
			    \});
			
			    it('Should pass original messages the second argument if exists', () => \{
			      const msg = jest.fn(() => 'some message');
			      const arg = \{\};
			      expect(
			        enforce.ruleWithFailureMessage(false).message(msg).run(arg)
			      ).toEqual(ruleReturn(false, 'some message'));
			      expect(msg).toHaveBeenCalledWith(arg, 'This should not be seen!');
			    \});
			  \});
			\});
			
			describe('enforce().message()', () => \{
			  it('should return message as a function', () => \{
			    expect(enforce(3).message).toBeInstanceOf(Function);
			  \});
			  it('should return message after chainning', () => \{
			    expect(enforce(1).equals(1).message).toBeInstanceOf(Function);
			  \});
			
			  it('Should throw a literal string', () => \{
			    let i;
			    try \{
			      enforce(1).message('oogie booogie').equals(2);
			    \} catch (e) \{
			      i = e;
			    \}
			    expect(i).toBe('oogie booogie');
			  \});
			
			  it('should throw the message error on failure', () => \{
			    expect(() => \{
			      enforce('').message('octopus').equals('evyatar');
			    \}).toThrow('octopus');
			  \});
			  it('should throw the message error on failure with the last message that failed', () => \{
			    expect(() => \{
			      enforce(10)
			        .message('must be a number!')
			        .isNumeric()
			        .message('too high')
			        .lessThan(8);
			    \}).toThrow('too high');
			  \});
			\});
			
			enforce.extend(\{
			  ruleWithFailureMessage: () => (\{
			    pass: false,
			    message: 'This should not be seen!',
			  \}),
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\runtime\\__tests__\\message.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\n4s\\src\\__tests__\\enforce.test.ts', () => {
        const sourceCode = `
			import * as ruleReturn from 'ruleReturn';
			
			const _proxy = global.Proxy;
			let enforce;
			
			[true, false].forEach(proxyEnabled => \{
			  describe(\`Proxy support (\$\{proxyEnabled\})\`, () => \{
			    beforeEach(() => \{
			      if (!proxyEnabled) \{
			        // @ts-expect-error - explicitly overriding proxy object
			        delete global.proxy;
			      \}
			      jest.resetModules();
			      jest.doMock('isProxySupported', () => () => proxyEnabled);
			      enforce = require('enforce').enforce;
			    \});
			
			    afterEach(() => \{
			      jest.resetModules();
			      global.Proxy = _proxy;
			    \});
			
			    describe('eager assertions', () => \{
			      it('Should throw an error when invalid', () => \{
			        expect(() => enforce('4').isNumber()).toThrow();
			        expect(() => enforce('4').isNumber().isNotNumeric()).toThrow();
			      \});
			
			      it('Should return silently when rule passes', () => \{
			        enforce(1).isNumber();
			        enforce(1).greaterThan(0);
			        enforce(1).greaterThan(0).lessThan(10);
			      \});
			
			      describe('Custom Assertions', () => \{
			        beforeEach(() => \{
			          enforce.extend(\{
			            startsWithUnderscore: (value: any) => (\{
			              pass: value.startsWith('_'),
			              message: value + ' does not start with underscore',
			            \}),
			          \});
			        \});
			
			        it('should return silently when rule passes', () => \{
			          enforce('_').startsWithUnderscore();
			          enforce('_').startsWithUnderscore().isString();
			        \});
			
			        it('should throw message string when rule fails', () => \{
			          expect(() => enforce(':(').startsWithUnderscore()).toThrow(
			            ':( does not start with underscore'
			          );
			          expect(() =>
			            enforce(':(').isString().startsWithUnderscore().isNumber()
			          ).toThrow(':( does not start with underscore');
			        \});
			      \});
			    \});
			
			    describe('enforce..test for boolean return', () => \{
			      it('Should return true when valid', () => \{
			        expect(enforce.isNumber().test(1)).toBe(true);
			        expect(enforce.isArray().test([])).toBe(true);
			        expect(enforce.greaterThan(5).test(6)).toBe(true);
			        expect(enforce.greaterThan(5).lessThan(7).test(6)).toBe(true);
			      \});
			
			      it('Should return false when invalid', () => \{
			        expect(enforce.isNumber().test('1')).toBe(false);
			        expect(enforce.isArray().test(\{\})).toBe(false);
			        expect(enforce.greaterThan(6).test(5)).toBe(false);
			        expect(enforce.greaterThan(7).lessThan(5).test(6)).toBe(false);
			      \});
			    \});
			
			    describe('enforce..run for structured return', () => \{
			      it('Should return pass:true when valid', () => \{
			        expect(enforce.isNumber().run(1)).toEqual(ruleReturn.passing());
			        expect(enforce.isArray().run([])).toEqual(ruleReturn.passing());
			        expect(enforce.greaterThan(5).run(6)).toEqual(ruleReturn.passing());
			        expect(enforce.greaterThan(5).lessThan(7).run(6)).toEqual(
			          ruleReturn.passing()
			        );
			      \});
			
			      it('Should return pass:false when invalid', () => \{
			        expect(enforce.isNumber().run('1')).toEqual(ruleReturn.failing());
			        expect(enforce.isArray().run(\{\})).toEqual(ruleReturn.failing());
			        expect(enforce.greaterThan(6).run(5)).toEqual(ruleReturn.failing());
			        expect(enforce.greaterThan(7).lessThan(5).run(6)).toEqual(
			          ruleReturn.failing()
			        );
			      \});
			    \});
			
			    describe('enforce.extend for custom validators', () => \{
			      beforeEach(() => \{
			        enforce.extend(\{
			          isEmail(value: string) \{
			            return \{
			              pass: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]\{2,4\}\$/i.test(value),
			              message: () => value + ' is not a valid email address',
			            \};
			          \},
			        \});
			      \});
			      describe('enforce..test for boolean return', () => \{
			        it('Should return true when valid', () => \{
			          expect(enforce.isEmail().test('example@gmail.com')).toBe(true);
			          expect(enforce.isEmail().isString().test('example@gmail.com')).toBe(
			            true
			          );
			        \});
			
			        it('Should return false when invalid', () => \{
			          expect(enforce.isEmail().test('example!gmail.com')).toBe(false);
			          expect(enforce.isEmail().isString().test('example!gmail.com')).toBe(
			            false
			          );
			        \});
			      \});
			
			      describe('enforce..run for structured return', () => \{
			        it('Should return pass:true when valid', () => \{
			          expect(enforce.isEmail().run('example@gmail.com')).toEqual(\{
			            pass: true,
			          \});
			
			          expect(enforce.isEmail().isString().run('example@gmail.com')).toEqual(
			            \{
			              pass: true,
			            \}
			          );
			        \});
			
			        it('Should return pass:false with message when invalid', () => \{
			          expect(enforce.isEmail().run('example!gmail.com')).toEqual(\{
			            pass: false,
			            message: 'example!gmail.com is not a valid email address',
			          \});
			
			          expect(enforce.isEmail().isString().run('example!gmail.com')).toEqual(
			            \{
			              pass: false,
			              message: 'example!gmail.com is not a valid email address',
			            \}
			          );
			        \});
			      \});
			
			      describe('When accessing a rule that does not exist', () => \{
			        it('Should return undefined', () => \{
			          expect(enforce.doesNotExist).toBeUndefined();
			        \});
			      \});
			    \});
			
			    describe('Test enforce().message', () => \{
			      it('Is enforce().message a function?', () => \{
			        expect(enforce('').message).toBeInstanceOf(Function);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\__tests__\\enforce.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('ealush_vest\\packages\\n4s\\src\\__tests__\\enforceEager.test.ts', () => {
        const sourceCode = `
			import enforceEager from 'enforceEager';
			
			const _proxy = global.Proxy;
			
			[true, false].forEach(proxyEnabled => \{
			  describe(\`with proxy \$\{proxyEnabled ? 'enabled' : 'disabled'\}\`, () => \{
			    beforeEach(() => \{
			      // @ts-expect-error - explicitly overriding proxy object
			      global.Proxy = proxyEnabled ? _proxy : undefined;
			    \});
			
			    afterEach(() => \{
			      global.Proxy = _proxy;
			    \});
			
			    it('should throw when rule fails', () => \{
			      expect(() => enforceEager([]).isString()).toThrow();
			      expect(() => enforceEager(1).greaterThan(1)).toThrow();
			      expect(() => enforceEager(1).greaterThan(1).lessThan(0)).toThrow();
			    \});
			
			    it('Should return silently when rule passes', () => \{
			      enforceEager(1).isNumber();
			      enforceEager(1).greaterThan(0);
			      enforceEager(1).greaterThan(0).lessThan(10);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\n4s\\src\\__tests__\\enforceEager.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('ealush_vest\\packages\\vast\\src\\__tests__\\vast.test.ts', () => {
        const sourceCode = `
			import \{ createState \} from 'vast';
			
			let state = createState();
			
			describe('vast state', () => \{
			  beforeEach(() => \{
			    state = createState();
			  \});
			
			  describe('createState', () => \{
			    it('Should return all stateRef methods', () => \{
			      expect(state).toMatchInlineSnapshot(\`
			        Object \{
			          "registerStateKey": [Function],
			          "reset": [Function],
			        \}
			      \`);
			    \});
			  \});
			
			  describe('state.registerStateKey', () => \{
			    it('Should return a function', () => \{
			      expect(typeof state.registerStateKey()).toBe('function');
			    \});
			
			    it('Should append another state key on each call', () => \{
			      const stateValues = Array.from(\{ length: 100 \}, () => Math.random());
			      const stateGetters = stateValues.map(value =>
			        state.registerStateKey(value)
			      );
			      expect(
			        stateGetters.every(
			          (stateGetter, i) => stateGetter()[0] === stateValues[i]
			        )
			      ).toBe(true);
			      expect(stateGetters).toHaveLength(100);
			    \});
			
			    describe('When initial value is a function', () => \{
			      it('Should generate initial state from key', () => \{
			        const initialStateKey = \{ key: 'value' \};
			        const stateGetter = state.registerStateKey(() => initialStateKey);
			        expect(stateGetter()[0]).toBe(initialStateKey);
			      \});
			    \});
			
			    describe('When initial value is not a function', () => \{
			      it('Should use provided value as initial state', () => \{
			        const stateValue = \{ key: 'value' \};
			        const stateGetter = state.registerStateKey(stateValue);
			        expect(stateGetter()[0]).toBe(stateValue);
			      \});
			    \});
			
			    describe('When initial value is not provided', () => \{
			      it('Should set initial state to undefined', () => \{
			        const stateGetter = state.registerStateKey();
			        expect(stateGetter()[0]).toBeUndefined();
			      \});
			    \});
			  \});
			
			  describe('State key function', () => \{
			    it('Should return an Array with two elements', () => \{
			      expect(state.registerStateKey()()).toHaveLength(2);
			      expect(state.registerStateKey('some value')()).toMatchInlineSnapshot(\`
			        Array [
			          "some value",
			          [Function],
			        ]
			      \`);
			    \});
			
			    describe('getting current value', () => \{
			      it('Should have current value in the first array element', () => \{
			        const stateGetter = state.registerStateKey('Some Value');
			        expect(stateGetter()[0]).toBe('Some Value');
			      \});
			    \});
			
			    describe('updating the state', () => \{
			      it('Should contain state updater in the second array element', () => \{
			        const stateGetter = state.registerStateKey('Some Value');
			        expect(typeof stateGetter()[1]).toBe('function');
			      \});
			
			      it('Should update the state with provided value', () => \{
			        const stateGetter = state.registerStateKey(\{ key: 'first-value' \});
			        const [, valueSetter] = stateGetter();
			        const nextValue = \{ key: 'second-value' \};
			        valueSetter(nextValue);
			        expect(stateGetter()[0]).toBe(nextValue);
			      \});
			
			      describe('When passing a function', () => \{
			        it('Should update the state with the result of the function', () => \{
			          const stateGetter = state.registerStateKey(\{ key: 'first-value' \});
			          const [, valueSetter] = stateGetter();
			          const nextValue = \{ key: 'second-value' \};
			          valueSetter(() => nextValue);
			          expect(stateGetter()[0]).toBe(nextValue);
			        \});
			
			        it('Should pass the function the current state value', () => \{
			          return new Promise<void>(done => \{
			            const stateGetter = state.registerStateKey('555');
			            const [currentState, valueSetter] = stateGetter();
			            expect(currentState).toBe('555');
			
			            valueSetter(prevState => \{
			              expect(prevState).toBe('555');
			              done();
			              return prevState;
			            \});
			          \});
			        \});
			      \});
			    \});
			  \});
			
			  describe('onStateChange and onUpdate handlers', () => \{
			    it('Should run onStateChange handler when updating the state', () => \{
			      const onStateChange = jest.fn();
			      state = createState(onStateChange);
			
			      const useKey1 = state.registerStateKey('v1');
			      const useKey2 = state.registerStateKey('v2');
			      expect(onStateChange).toHaveBeenCalledTimes(2);
			      useKey1()[1]('v1_1');
			      expect(onStateChange).toHaveBeenCalledTimes(3);
			      useKey2()[1]('v2_1');
			      expect(onStateChange).toHaveBeenCalledTimes(4);
			      expect(onStateChange).toHaveBeenCalledWith();
			    \});
			
			    it('Should run onUpdate handler when updating the key', () => \{
			      const onUpdate1 = jest.fn();
			      const onUpdate2 = jest.fn();
			      state = createState();
			
			      const useKey1 = state.registerStateKey('v1', onUpdate1);
			      const useKey2 = state.registerStateKey('v2', onUpdate2);
			      expect(onUpdate1).toHaveBeenCalledTimes(1);
			      expect(onUpdate1).toHaveBeenCalledWith('v1', undefined);
			      expect(onUpdate2).toHaveBeenCalledTimes(1);
			      const [, setKey1] = useKey1();
			      const [, setKey2] = useKey2();
			      setKey1('v1_1');
			      expect(onUpdate1).toHaveBeenCalledTimes(2);
			
			      // pass current state + previous state
			      expect(onUpdate1).toHaveBeenCalledWith('v1_1', 'v1');
			      setKey1('v1_2');
			      expect(onUpdate1).toHaveBeenCalledWith('v1_2', 'v1_1');
			      expect(onUpdate2).toHaveBeenCalledTimes(1);
			      setKey2('v2_1');
			      expect(onUpdate2).toHaveBeenCalledTimes(2);
			      expect(onUpdate2).toHaveBeenCalledWith('v2_1', 'v2');
			    \});
			
			    it('Should first run onUpdate and then onStateChange', () => \{
			      const onUpdate = jest.fn();
			      const onChange = jest.fn();
			      state = createState(onChange);
			
			      state.registerStateKey('v1', onUpdate);
			      expect(onUpdate.mock.invocationCallOrder[0]).toBeLessThan(
			        onChange.mock.invocationCallOrder[0]
			      );
			    \});
			  \});
			
			  describe('state.reset', () => \{
			    it('Should fill up the state with registered keys', () => \{
			      const s1 = state.registerStateKey(111);
			      const s2 = state.registerStateKey(222);
			      const s3 = state.registerStateKey(333);
			      const s4 = state.registerStateKey(444);
			      s1()[1](555);
			      s2()[1](666);
			      s3()[1](777);
			      s4()[1](888);
			
			      // sanity
			      expect(s1()[0]).toBe(555);
			      expect(s2()[0]).toBe(666);
			      expect(s3()[0]).toBe(777);
			      expect(s4()[0]).toBe(888);
			
			      state.reset();
			
			      // testing now that everything is back to initial value
			      expect(s1()[0]).toBe(111);
			      expect(s2()[0]).toBe(222);
			      expect(s3()[0]).toBe(333);
			      expect(s4()[0]).toBe(444);
			    \});
			
			    it('Should allow setting a value after a state reset', () => \{
			      const stateGetter = state.registerStateKey(() => 'hello!');
			      const [, stateSetter] = stateGetter();
			      state.reset();
			      stateSetter('Good Bye!');
			      expect(stateGetter()[0]).toBe('Good Bye!');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vast\\src\\__tests__\\vast.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(17)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\isolate\\isolates\\__tests__\\each.test.ts', () => {
        const sourceCode = `
			import * as vest from 'vest';
			
			describe('each', () => \{
			  describe('When callback is not a function', () => \{
			    it('should throw', () => \{
			      const control = jest.fn();
			      const suite = vest.create(() => \{
			        expect(() => \{
			          // @ts-expect-error
			          vest.each([null], null);
			        \}).toThrowErrorMatchingSnapshot();
			        control();
			      \});
			
			      suite();
			      expect(control).toHaveBeenCalledTimes(1);
			    \});
			  \});
			
			  it('Should pass to callback the current list item and index', () => \{
			    const cb = jest.fn();
			    const suite = vest.create(() => \{
			      vest.each([1, 2, 3, 'str'], cb);
			    \});
			
			    suite();
			
			    expect(cb).toHaveBeenCalledTimes(4);
			
			    expect(cb).toHaveBeenNthCalledWith(1, 1, 0);
			    expect(cb).toHaveBeenNthCalledWith(2, 2, 1);
			    expect(cb).toHaveBeenNthCalledWith(3, 3, 2);
			    expect(cb).toHaveBeenNthCalledWith(4, 'str', 3);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\isolate\\isolates\\__tests__\\each.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\isolate\\isolates\\__tests__\\group.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			import _ from 'lodash';
			import \{ enforce \} from 'n4s';
			
			import partition from '../../../../../testUtils/partition';
			import \{ dummyTest \} from '../../../../../testUtils/testDummy';
			
			import VestTest from 'VestTest';
			import group from 'group';
			import matchingGroupName from 'matchingGroupName';
			import * as vest from 'vest';
			
			let groupName = 'group_name_1';
			const groupName2 = 'group_name_2';
			
			const topLevelTestObjects: Record<string, VestTest> = \{\};
			const groupTestObjects: Record<string, VestTest> = \{\};
			
			describe('group: exclusion', () => \{
			  const validation = () =>
			    vest.create(
			      (\{
			        only,
			        skip,
			        skipGroup,
			        onlyGroup,
			      \}: \{
			        only?: string;
			        skip?: string;
			        skipGroup?: string;
			        onlyGroup?: string;
			      \} = \{\}) => \{
			        vest.only(only);
			        vest.skip(skip);
			        vest.only.group(onlyGroup);
			        vest.skip.group(skipGroup);
			
			        topLevelTestObjects['field_1'] = dummyTest.failing('field_1');
			        topLevelTestObjects['field_1'] = dummyTest.failing('field_1');
			        topLevelTestObjects['field_2'] = dummyTest.passing('field_2');
			        topLevelTestObjects['field_3'] = dummyTest.failingWarning('field_3');
			        topLevelTestObjects['field_4'] = dummyTest.passingWarning('field_4');
			        topLevelTestObjects['field_5'] = dummyTest.failing('field_5');
			
			        group(groupName, () => \{
			          groupTestObjects['field_1'] = dummyTest.failing('field_1');
			          groupTestObjects['field_2'] = dummyTest.passing('field_2');
			          groupTestObjects['field_3'] = dummyTest.failingWarning('field_3');
			          groupTestObjects['field_4'] = dummyTest.passingWarning('field_4');
			          groupTestObjects['field_6'] = dummyTest.failing('field_6');
			        \});
			
			        group(groupName2, () => \{
			          groupTestObjects['field_6'] = dummyTest.failing('field_6');
			          groupTestObjects['field_7'] = dummyTest.failing('field_7');
			          groupTestObjects['field_8'] = dummyTest.passing('field_8');
			        \});
			      \}
			    );
			  let res, suite;
			
			  beforeEach(() => \{
			    groupName = faker.random.word();
			    suite = validation();
			  \});
			
			  describe('When skipped', () => \{
			    beforeEach(() => \{
			      res = suite(\{ skipGroup: groupName \});
			    \});
			
			    it('produce result object with the group', () => \{
			      expect(res.groups[groupName]).toMatchInlineSnapshot(\`
			        Object \{
			          "field_1": Object \{
			            "errorCount": 0,
			            "errors": Array [],
			            "testCount": 0,
			            "valid": false,
			            "warnCount": 0,
			            "warnings": Array [],
			          \},
			          "field_2": Object \{
			            "errorCount": 0,
			            "errors": Array [],
			            "testCount": 0,
			            "valid": false,
			            "warnCount": 0,
			            "warnings": Array [],
			          \},
			          "field_3": Object \{
			            "errorCount": 0,
			            "errors": Array [],
			            "testCount": 0,
			            "valid": false,
			            "warnCount": 0,
			            "warnings": Array [],
			          \},
			          "field_4": Object \{
			            "errorCount": 0,
			            "errors": Array [],
			            "testCount": 0,
			            "valid": false,
			            "warnCount": 0,
			            "warnings": Array [],
			          \},
			          "field_6": Object \{
			            "errorCount": 0,
			            "errors": Array [],
			            "testCount": 0,
			            "valid": false,
			            "warnCount": 0,
			            "warnings": Array [],
			          \},
			        \}
			      \`);
			    \});
			
			    it('Should skip tests within group', () => \{
			      Object.values(groupTestObjects)
			        .filter(testObject => \{
			          return matchingGroupName(testObject, groupName);
			        \})
			        .forEach(testObject => \{
			          expect(testObject.testFn).not.toHaveBeenCalled();
			        \});
			    \});
			
			    it('Should run all tests outside of the group', () => \{
			      Object.values(topLevelTestObjects).forEach(testObject => \{
			        expect(testObject.testFn).toHaveBeenCalled();
			      \});
			
			      const [withGroup, withoutGroup] = partition(
			        Object.values(groupTestObjects),
			        testObject => matchingGroupName(testObject, groupName)
			      );
			      withGroup.forEach(testObject => \{
			        expect(testObject.testFn).not.toHaveBeenCalled();
			      \});
			      withoutGroup.forEach(testObject => \{
			        expect(testObject.testFn).toHaveBeenCalled();
			      \});
			    \});
			  \});
			
			  describe('When \`only\`ed', () => \{
			    beforeEach(() => \{
			      res = suite(\{ onlyGroup: groupName \});
			    \});
			    it('produce result object with group', () => \{
			      expect(res.groups).toHaveProperty(groupName);
			    \});
			
			    it('produce correct result object', () => \{
			      expect(res.testCount).toBe(5);
			      expect(res.errorCount).toBe(2);
			      expect(res.warnCount).toBe(1);
			      expect(res.tests['field_1'].errorCount).toBe(1);
			      expect(res.tests['field_1'].warnCount).toBe(0);
			      expect(res.tests['field_2'].errorCount).toBe(0);
			      expect(res.tests['field_2'].warnCount).toBe(0);
			      expect(res.tests['field_3'].errorCount).toBe(0);
			      expect(res.tests['field_3'].warnCount).toBe(1);
			      expect(res.tests['field_4'].errorCount).toBe(0);
			      expect(res.tests['field_4'].warnCount).toBe(0);
			      expect(res.tests['field_5'].errorCount).toBe(0);
			      expect(res.tests['field_5'].warnCount).toBe(0);
			      expect(res.tests['field_6'].errorCount).toBe(1);
			      expect(res.tests['field_6'].warnCount).toBe(0);
			    \});
			
			    it('Should run tests within group', () => \{
			      const [withGroup, withoutGroup] = partition(
			        Object.values(groupTestObjects),
			        testObject => \{
			          return matchingGroupName(testObject, groupName);
			        \}
			      );
			
			      withGroup.forEach(testObject => \{
			        expect(testObject.testFn).toHaveBeenCalled();
			      \});
			
			      withoutGroup.forEach(testObject => \{
			        expect(testObject.testFn).not.toHaveBeenCalled();
			      \});
			    \});
			  \});
			
			  describe('When skipped field inside \`only\`ed group', () => \{
			    beforeEach(() => \{
			      res = suite(\{ skip: 'field_1', onlyGroup: groupName \});
			    \});
			    it('produce result object with group', () => \{
			      expect(res.groups).toHaveProperty(groupName);
			    \});
			
			    it('Should run all tests within group but skipped test', () => \{
			      Object.values(groupTestObjects)
			        // all but skipped test
			        .filter((\{ fieldName \}) => fieldName !== 'field_1')
			        .filter(testObject => testObject.groupName === groupName)
			        .forEach(testObject => \{
			          expect(testObject.testFn).toHaveBeenCalled();
			        \});
			
			      Object.values(groupTestObjects)
			        // only skipped test
			        .filter((\{ fieldName \}) => fieldName === 'field_1')
			        .forEach(testObject => \{
			          expect(testObject.testFn).not.toHaveBeenCalled();
			        \});
			    \});
			    it('Should skip all tests outside of the group', () => \{
			      Object.values(topLevelTestObjects).forEach(testObject => \{
			        expect(testObject.testFn).not.toHaveBeenCalled();
			      \});
			    \});
			  \});
			\});
			
			describe('group: base case', () => \{
			  let inGroup, outsideGroup;
			  const validation = () =>
			    vest.create(() => \{
			      dummyTest.failing('field_1');
			      dummyTest.failing('field_1');
			      dummyTest.passing('field_2');
			      dummyTest.failingWarning('field_3');
			      dummyTest.passingWarning('field_4');
			      dummyTest.failing('field_5');
			
			      group(groupName, () => \{
			        dummyTest.failing('field_1');
			        dummyTest.passing('field_2');
			        dummyTest.failingWarning('field_3');
			        dummyTest.passingWarning('field_4');
			        inGroup = dummyTest.failing('field_6');
			      \});
			
			      outsideGroup = dummyTest.failing('last');
			    \});
			  let res;
			  beforeEach(() => \{
			    groupName = faker.random.word();
			    const suite = validation();
			    res = suite();
			  \});
			
			  it('Should contain all tests in tests object', () => \{
			    expect(res.tests).toHaveProperty('field_1');
			    expect(res.tests).toHaveProperty('field_2');
			    expect(res.tests).toHaveProperty('field_3');
			    expect(res.tests).toHaveProperty('field_4');
			    expect(res.tests).toHaveProperty('field_5');
			    expect(res.tests).toHaveProperty('field_6');
			  \});
			
			  it('Should contain only group test in group object', () => \{
			    expect(res.groups[groupName]).toHaveProperty('field_1');
			    expect(res.groups[groupName]).toHaveProperty('field_2');
			    expect(res.groups[groupName]).toHaveProperty('field_3');
			    expect(res.groups[groupName]).toHaveProperty('field_4');
			    expect(res.groups[groupName]).not.toHaveProperty('field_5');
			    expect(res.groups[groupName]).toHaveProperty('field_6');
			  \});
			
			  it('Should have all group errors inside test object', () => \{
			    expect(res.tests['field_1'].errors).toEqual(
			      expect.arrayContaining(res.groups[groupName]['field_1'].errors)
			    );
			
			    // This one is equal because it has no errors and no warnings - so both represent the base object
			    // The test count is different, though
			    expect(_.omit(res.tests['field_2'], 'testCount')).toMatchObject(
			      _.omit(res.groups[groupName]['field_2'], 'testCount')
			    );
			
			    expect(res.tests['field_3'].warnings).toEqual(
			      expect.arrayContaining(res.groups[groupName]['field_3'].warnings)
			    );
			
			    // This one is equal since it has no tests outside the group
			    expect(res.tests['field_6']).toEqual(res.groups[groupName]['field_6']);
			  \});
			
			  test('Group object is a subset of test object (negating previous test)', () => \{
			    expect(res.groups[groupName]['field_1'].errors).not.toEqual(
			      expect.arrayContaining(res.tests['field_1'].errors)
			    );
			
			    enforce(res.groups[groupName]['field_1'].errorCount).lte(
			      res.tests['field_1'].errorCount
			    );
			
			    expect(res.groups[groupName]['field_3'].warnings).not.toEqual(
			      expect.arrayContaining(res.tests['field_3'].warnings)
			    );
			    enforce(res.groups[groupName]['field_3'].warnCount).lte(
			      res.tests['field_3'].warnCount
			    );
			  \});
			
			  describe('Test object creation', () => \{
			    it('when in group, should create test with matching group property', () => \{
			      expect(inGroup.groupName).toBe(groupName);
			    \});
			
			    it('after exiting group, should create est without group property', () => \{
			      expect(outsideGroup).not.toHaveProperty('groupName');
			    \});
			  \});
			
			  test('Group validity', () => \{
			    const suite = vest.create(() => \{
			      vest.group('group_1', () => \{
			        vest.test('field_1', () => \{\});
			        vest.test('field_2', () => \{\});
			        vest.test('field_2', () => false);
			      \});
			      vest.group('group_2', () => \{
			        vest.test('field_1', () => false);
			        vest.test('field_2', () => \{\});
			      \});
			      vest.group('group_3', () => \{
			        vest.test('field_1', () => false);
			        vest.test('field_2', () => false);
			      \});
			      vest.group('group_4', () => \{
			        vest.test('field_1', () => \{\});
			        vest.test('field_2', () => \{\});
			      \});
			    \});
			
			    const res = suite();
			
			    expect(res.groups.group_1.field_1.valid).toBe(true);
			    expect(res.groups.group_1.field_2.valid).toBe(false);
			    expect(res.groups.group_2.field_1.valid).toBe(false);
			    expect(res.groups.group_2.field_2.valid).toBe(true);
			    expect(res.groups.group_3.field_1.valid).toBe(false);
			    expect(res.groups.group_3.field_2.valid).toBe(false);
			    expect(res.groups.group_4.field_1.valid).toBe(true);
			    expect(res.groups.group_4.field_2.valid).toBe(true);
			    expect(res.isValidByGroup('group_1')).toBe(false);
			    expect(res.isValidByGroup('group_1', 'field_1')).toBe(true);
			    expect(res.isValidByGroup('group_1', 'field_2')).toBe(false);
			    expect(res.isValidByGroup('group_2')).toBe(false);
			    expect(res.isValidByGroup('group_2', 'field_1')).toBe(false);
			    expect(res.isValidByGroup('group_2', 'field_2')).toBe(true);
			    expect(res.isValidByGroup('group_3')).toBe(false);
			    expect(res.isValidByGroup('group_3', 'field_1')).toBe(false);
			    expect(res.isValidByGroup('group_3', 'field_2')).toBe(false);
			    expect(res.isValidByGroup('group_4')).toBe(true);
			    expect(res.isValidByGroup('group_4', 'field_1')).toBe(true);
			    expect(res.isValidByGroup('group_4', 'field_2')).toBe(true);
			    expect(res).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\isolate\\isolates\\__tests__\\group.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(16)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\isolate\\isolates\\__tests__\\omitWhen.test.ts', () => {
        const sourceCode = `
			import * as vest from 'vest';
			import \{ omitWhen, only \} from 'vest';
			
			describe('omitWhen', () => \{
			  let suite, cb1, cb2, cb3, cb4, cb5, allFieldsPass;
			
			  beforeEach(() => \{
			    cb1 = jest.fn();
			    cb2 = jest.fn(() => (allFieldsPass ? undefined : false));
			    cb3 = jest.fn(() => (allFieldsPass ? undefined : false));
			    cb4 = jest.fn(() => (allFieldsPass ? undefined : false));
			    cb5 = jest.fn();
			
			    suite = vest.create((omitConditional, currentField) => \{
			      only(currentField);
			      vest.test('field_1', cb1);
			      vest.test('field_2', cb2);
			
			      omitWhen(omitConditional, () => \{
			        vest.test('field_1', cb3);
			        vest.test('field_3', cb4);
			        vest.test('field_4', cb5);
			      \});
			    \});
			  \});
			
			  afterEach(() => \{
			    allFieldsPass = undefined;
			  \});
			
			  describe('When conditional is falsy', () => \{
			    describe.each([
			      ['boolean conditional', false],
			      ['function conditional', () => false],
			    ])('%s', (_, omitConditional) => \{
			      it('Should run tests normally', () => \{
			        suite(omitConditional, 'field_1');
			        expect(cb1).toHaveBeenCalledTimes(1);
			        expect(cb2).not.toHaveBeenCalled();
			        expect(cb3).toHaveBeenCalledTimes(1);
			        expect(cb4).not.toHaveBeenCalled();
			        expect(cb5).not.toHaveBeenCalled();
			        expect(suite.get().hasErrors('field_1')).toBe(true);
			        expect(suite.get().tests.field_1.testCount).toBe(2);
			        expect(suite.get().tests.field_1.errorCount).toBe(1);
			        expect(suite.get().hasErrors('field_2')).toBe(false);
			        expect(suite.get().hasErrors('field_3')).toBe(false);
			        expect(suite.get().hasErrors('field_4')).toBe(false);
			        expect(suite.get().tests).toMatchSnapshot();
			        suite(omitConditional, 'field_4');
			        expect(cb1).toHaveBeenCalledTimes(1);
			        expect(cb2).not.toHaveBeenCalled();
			        expect(cb3).toHaveBeenCalledTimes(1);
			        expect(cb4).not.toHaveBeenCalled();
			        expect(cb5).toHaveBeenCalledTimes(1);
			        expect(suite.get().hasErrors('field_1')).toBe(true);
			        expect(suite.get().tests.field_1.testCount).toBe(2);
			        expect(suite.get().tests.field_1.errorCount).toBe(1);
			        expect(suite.get().hasErrors('field_2')).toBe(false);
			        expect(suite.get().hasErrors('field_3')).toBe(false);
			        expect(suite.get().hasErrors('field_4')).toBe(false);
			        expect(suite.get().tests.field_4.testCount).toBe(1);
			        expect(suite.get().tests.field_4.errorCount).toBe(0);
			        expect(suite.get().tests).toMatchSnapshot();
			      \});
			
			      it('Should have all tests within the omit block referenced in the result', () => \{
			        suite(omitConditional, 'field_1');
			        expect(suite.get().tests.field_1).toBeDefined();
			        expect(suite.get().tests.field_3).toBeDefined();
			        expect(suite.get().tests.field_4).toBeDefined();
			        expect(suite.get().tests).toMatchSnapshot();
			      \});
			
			      it('Should retain normal \`isValid\` functionality', () => \{
			        expect(suite.get().isValid()).toBe(false);
			        suite(omitConditional, 'field_1');
			        expect(suite.get().isValid()).toBe(false);
			        allFieldsPass = true;
			        suite(omitConditional);
			        expect(suite.get().isValid()).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('When conditional is truthy', () => \{
			    describe.each([
			      ['boolean conditional', true],
			      ['function conditional', () => true],
			    ])('%s', (_, omitConditional) => \{
			      it('Should avoid running the omitted tests', () => \{
			        suite(omitConditional, 'field_1');
			        expect(suite.get().tests.field_1.testCount).toBe(1);
			        suite(omitConditional, 'field_2');
			        expect(suite.get().tests.field_2.testCount).toBe(1);
			        suite(omitConditional, 'field_3');
			        expect(suite.get().tests.field_3.testCount).toBe(0);
			        suite(omitConditional, 'field_4');
			        expect(suite.get().tests.field_4.testCount).toBe(0);
			        expect(cb1).toHaveBeenCalledTimes(1);
			        expect(cb2).toHaveBeenCalledTimes(1);
			        expect(cb3).toHaveBeenCalledTimes(0);
			        expect(cb4).toHaveBeenCalledTimes(0);
			        expect(cb5).toHaveBeenCalledTimes(0);
			        suite(omitConditional);
			        expect(cb1).toHaveBeenCalledTimes(2);
			        expect(cb2).toHaveBeenCalledTimes(2);
			        expect(cb3).toHaveBeenCalledTimes(0);
			        expect(cb4).toHaveBeenCalledTimes(0);
			        expect(cb5).toHaveBeenCalledTimes(0);
			        expect(suite.get()).toMatchSnapshot();
			      \});
			
			      it('Should consider the suite as valid even without the omitted tests', () => \{
			        expect(suite.get().isValid()).toBe(false);
			        suite(omitConditional, 'field_1');
			        expect(suite.get().isValid()).toBe(false);
			        suite(omitConditional, 'field_2');
			        expect(suite.get().isValid()).toBe(false);
			        allFieldsPass = true;
			        suite(omitConditional, 'field_2');
			        expect(suite.get().tests.field_1.testCount).toBe(1);
			        expect(suite.get().tests.field_2.testCount).toBe(1);
			        expect(suite.get().tests.field_3.testCount).toBe(0);
			        expect(suite.get().tests.field_4.testCount).toBe(0);
			        expect(suite.get().isValid()).toBe(true);
			      \});
			
			      it('Should skip and not run omitted fields when no filter provided', () => \{
			        suite(omitConditional);
			        expect(suite.get().tests.field_1.testCount).toBe(1);
			        expect(suite.get().tests.field_2.testCount).toBe(1);
			        expect(suite.get().tests.field_3.testCount).toBe(0);
			        expect(suite.get().tests.field_4.testCount).toBe(0);
			        expect(suite.get()).toMatchSnapshot();
			      \});
			    \});
			  \});
			
			  describe('When the conditional changes between runs', () => \{
			    it('Should omit previously run fields if changes to \`true\`', () => \{
			      suite(false, 'field_1');
			      expect(suite.get().tests.field_1.testCount).toBe(2);
			      expect(cb1).toHaveBeenCalledTimes(1);
			      expect(cb3).toHaveBeenCalledTimes(1);
			      suite(true, 'field_1');
			      expect(suite.get().tests.field_1.testCount).toBe(1);
			      expect(cb1).toHaveBeenCalledTimes(2);
			      expect(cb3).toHaveBeenCalledTimes(1);
			    \});
			
			    it('Should run fields that were previously omitted when changing to \`false\`', () => \{
			      suite(true, 'field_3');
			      expect(suite.get().tests.field_3.testCount).toBe(0);
			      expect(cb4).toHaveBeenCalledTimes(0);
			      suite(false, 'field_3');
			      expect(suite.get().tests.field_3.testCount).toBe(1);
			      expect(cb4).toHaveBeenCalledTimes(1);
			    \});
			  \});
			
			  describe('nested calls', () => \{
			    let suite;
			
			    describe('omitted in non-omitted', () => \{
			      beforeEach(() => \{
			        suite = vest.create(() => \{
			          vest.omitWhen(false, () => \{
			            vest.test('outer', () => false);
			
			            vest.omitWhen(true, () => \{
			              vest.test('inner', () => false);
			            \});
			          \});
			        \});
			        suite();
			      \});
			      it('Should run \`outer\` and omit \`inner\`', () => \{
			        expect(suite.get().testCount).toBe(1);
			        expect(suite.get().hasErrors('outer')).toBe(true);
			        expect(suite.get().hasErrors('inner')).toBe(false);
			      \});
			    \});
			
			    describe('omitted in omitted', () => \{
			      beforeEach(() => \{
			        suite = vest.create(() => \{
			          vest.omitWhen(true, () => \{
			            vest.test('outer', () => false);
			
			            vest.omitWhen(true, () => \{
			              vest.test('inner', () => false);
			            \});
			          \});
			        \});
			        suite();
			      \});
			      it('Should omit both \`outer\` and \`inner\`', () => \{
			        expect(suite.get().testCount).toBe(0);
			        expect(suite.get().hasErrors('outer')).toBe(false);
			        expect(suite.get().hasErrors('inner')).toBe(false);
			      \});
			    \});
			    describe('non-omitted in omitted', () => \{
			      beforeEach(() => \{
			        suite = vest.create(() => \{
			          vest.omitWhen(true, () => \{
			            vest.test('outer', () => false);
			
			            vest.omitWhen(false, () => \{
			              vest.test('inner', () => false);
			            \});
			          \});
			        \});
			        suite();
			      \});
			      it('Should omit both', () => \{
			        expect(suite.get().testCount).toBe(0);
			        expect(suite.get().hasErrors('outer')).toBe(false);
			        expect(suite.get().hasErrors('inner')).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('When some tests of the same field are inside omitWhen and some not', () => \{
			    it('Should mark the field as invalid when failing', () => \{
			      const res = vest.create(() => \{
			        vest.test('f1', () => false);
			
			        vest.omitWhen(true, () => \{
			          vest.test('f1', () => false);
			        \});
			      \})();
			      expect(res.isValid()).toBe(false);
			      expect(res.isValid('f1')).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\isolate\\isolates\\__tests__\\omitWhen.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\isolate\\isolates\\__tests__\\skipWhen.test.ts', () => {
        const sourceCode = `
			import \{ dummyTest \} from '../../../../../testUtils/testDummy';
			
			import * as vest from 'vest';
			
			describe('skipWhen', () => \{
			  let fn = jest.fn();
			  beforeEach(() => \{
			    fn = jest.fn();
			    suite.reset();
			  \});
			  it('Should run callback both when condition is true or false', () => \{
			    let counter = 0;
			    const suite = vest.create(() => \{
			      vest.skipWhen(counter === 1, fn);
			
			      counter++;
			    \});
			    expect(fn).toHaveBeenCalledTimes(0);
			    suite();
			    expect(fn).toHaveBeenCalledTimes(1);
			    suite();
			    expect(fn).toHaveBeenCalledTimes(2);
			  \});
			
			  it('Should respect both boolean and function conditions', () => \{
			    const suite = vest.create(() => \{
			      vest.skipWhen(false, fn);
			      vest.skipWhen(true, fn);
			      vest.skipWhen(() => false, fn);
			      vest.skipWhen(() => true, fn);
			    \});
			
			    suite();
			
			    expect(fn).toHaveBeenCalledTimes(4);
			  \});
			
			  it('Should pass result draft to the functional condition', () => \{
			    const f = jest.fn();
			    const control = jest.fn();
			
			    vest.create(() => \{
			      vest.skipWhen(draft => \{
			        expect(draft.hasErrors()).toBe(false);
			        expect(draft).toMatchSnapshot();
			        control();
			        return false;
			      \}, f);
			      dummyTest.failing('f1', 'msg');
			      vest.skipWhen(draft => \{
			        expect(draft.hasErrors()).toBe(true);
			        expect(draft.hasErrors('f1')).toBe(true);
			        expect(draft.hasErrors('f2')).toBe(false);
			        expect(draft.hasErrors('f3')).toBe(false);
			        expect(draft).toMatchSnapshot();
			        control();
			        return false;
			      \}, f);
			      dummyTest.failing('f2', 'msg');
			      vest.skipWhen(draft => \{
			        expect(draft.hasErrors()).toBe(true);
			        expect(draft.hasErrors('f1')).toBe(true);
			        expect(draft.hasErrors('f2')).toBe(true);
			        expect(draft.hasErrors('f3')).toBe(false);
			        expect(draft).toMatchSnapshot();
			        control();
			        return false;
			      \}, f);
			      dummyTest.failing('f3', 'msg');
			    \})();
			
			    expect(control).toHaveBeenCalledTimes(3);
			  \});
			
			  it('Should skip tests when the condition is truthy', () => \{
			    const res = suite(true);
			    expect(res.tests.username.testCount).toBe(0);
			  \});
			
			  it('Should run tests when the condition is falsy', () => \{
			    const res = suite(false);
			    expect(res.tests.username.testCount).toBe(1);
			  \});
			
			  it('Should correctly refill the state when field is skipped', () => \{
			    const res = suite(false);
			    expect(res.tests.username.testCount).toBe(1);
			    suite(true);
			
			    expect(suite.get().tests.username.testCount).toBe(1);
			  \});
			
			  describe('nested calls', () => \{
			    let suite;
			
			    describe('skipped in non-skipped', () => \{
			      beforeEach(() => \{
			        suite = vest.create(() => \{
			          vest.skipWhen(false, () => \{
			            vest.test('outer', () => false);
			
			            vest.skipWhen(true, () => \{
			              vest.test('inner', () => false);
			            \});
			          \});
			        \});
			        suite();
			      \});
			      it('Should run \`outer\` and skip \`inner\`', () => \{
			        expect(suite.get().testCount).toBe(1);
			        expect(suite.get().hasErrors('outer')).toBe(true);
			        expect(suite.get().hasErrors('inner')).toBe(false);
			      \});
			    \});
			
			    describe('skipped in skipped', () => \{
			      beforeEach(() => \{
			        suite = vest.create(() => \{
			          vest.skipWhen(true, () => \{
			            vest.test('outer', () => false);
			
			            vest.skipWhen(true, () => \{
			              vest.test('inner', () => false);
			            \});
			          \});
			        \});
			        suite();
			      \});
			      it('Should skip both \`outer\` and \`inner\`', () => \{
			        expect(suite.get().testCount).toBe(0);
			        expect(suite.get().hasErrors('outer')).toBe(false);
			        expect(suite.get().hasErrors('inner')).toBe(false);
			      \});
			    \});
			    describe('non-skipped in skipped', () => \{
			      beforeEach(() => \{
			        suite = vest.create(() => \{
			          vest.skipWhen(true, () => \{
			            vest.test('outer', () => false);
			
			            vest.skipWhen(false, () => \{
			              vest.test('inner', () => false);
			            \});
			          \});
			        \});
			        suite();
			      \});
			      it('Should skip both', () => \{
			        expect(suite.get().testCount).toBe(0);
			        expect(suite.get().hasErrors('outer')).toBe(false);
			        expect(suite.get().hasErrors('inner')).toBe(false);
			      \});
			    \});
			  \});
			\});
			
			const suite = vest.create((skipTest: boolean) => \{
			  vest.skipWhen(skipTest, () => \{
			    vest.test('username', () => false);
			  \});
			  vest.test('control', () => false);
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\isolate\\isolates\\__tests__\\skipWhen.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summaryGenerators\\helpers\\__tests__\\nonMatchingSeverityProfile.test.ts', () => {
        const sourceCode = `
			import \{ Severity \} from 'Severity';
			import VestTest from 'VestTest';
			import nonMatchingSeverityProfile from 'nonMatchingSeverityProfile';
			
			describe('nonMatchingSeverityProfile', () => \{
			  let testObject: VestTest;
			
			  beforeEach(() => \{
			    testObject = new VestTest('field', jest.fn());
			  \});
			  describe('When matching', () => \{
			    describe('When both are warning', () => \{
			      it('should return false', () => \{
			        testObject.warn();
			        expect(nonMatchingSeverityProfile(Severity.WARNINGS, testObject)).toBe(
			          false
			        );
			      \});
			    \});
			
			    describe('When both are not warning', () => \{
			      it('should return false', () => \{
			        expect(nonMatchingSeverityProfile(Severity.ERRORS, testObject)).toBe(
			          false
			        );
			      \});
			    \});
			  \});
			
			  describe('When non matching', () => \{
			    describe('When test is warning', () => \{
			      it('should return true', () => \{
			        testObject.warn();
			        expect(nonMatchingSeverityProfile(Severity.ERRORS, testObject)).toBe(
			          true
			        );
			      \});
			    \});
			
			    describe('When severity is warning', () => \{
			      it('should return true', () => \{
			        expect(nonMatchingSeverityProfile(Severity.WARNINGS, testObject)).toBe(
			          true
			        );
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summaryGenerators\\helpers\\__tests__\\nonMatchingSeverityProfile.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summaryGenerators\\__tests__\\hasFailuresByTestObject.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ Severity \} from 'Severity';
			import VestTest from 'VestTest';
			import \{ hasFailuresByTestObject \} from 'hasFailuresByTestObjects';
			
			const fieldName: string = faker.random.word();
			
			describe('hasFailuresByTestObject', () => \{
			  let testObject: VestTest;
			
			  beforeEach(() => \{
			    const fieldName: string = faker.random.word();
			    testObject = new VestTest(fieldName, jest.fn());
			  \});
			
			  describe('When test did not fail', () => \{
			    it('Should return false', () => \{
			      expect(hasFailuresByTestObject(testObject, Severity.ERRORS)).toBe(false);
			      expect(hasFailuresByTestObject(testObject, Severity.WARNINGS)).toBe(
			        false
			      );
			      expect(
			        hasFailuresByTestObject(testObject, Severity.ERRORS, fieldName)
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When the test did fail', () => \{
			    beforeEach(() => \{
			      testObject.fail();
			    \});
			    describe('When field name is not provided', () => \{
			      describe('When non matching severity profile', () => \{
			        it('should return false', () => \{
			          expect(hasFailuresByTestObject(testObject, Severity.WARNINGS)).toBe(
			            false
			          );
			          testObject.warn();
			          expect(hasFailuresByTestObject(testObject, Severity.ERRORS)).toBe(
			            false
			          );
			        \});
			      \});
			
			      describe('When matching severity profile', () => \{
			        it('Should return true', () => \{
			          expect(hasFailuresByTestObject(testObject, Severity.ERRORS)).toBe(
			            true
			          );
			          testObject.warn();
			          expect(hasFailuresByTestObject(testObject, Severity.WARNINGS)).toBe(
			            true
			          );
			        \});
			      \});
			    \});
			    describe('When field name is provided', () => \{
			      describe('When field name matches', () => \{
			        it('should return false', () => \{
			          expect(
			            hasFailuresByTestObject(testObject, Severity.ERRORS, 'non_matching')
			          ).toBe(false);
			        \});
			      \});
			
			      describe('When field name matches', () => \{
			        it('Should continue with normal flow', () => \{
			          expect(hasFailuresByTestObject(testObject, Severity.WARNINGS)).toBe(
			            false
			          );
			          testObject.warn();
			          expect(hasFailuresByTestObject(testObject, Severity.ERRORS)).toBe(
			            false
			          );
			          testObject.fail();
			          expect(hasFailuresByTestObject(testObject, Severity.WARNINGS)).toBe(
			            true
			          );
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summaryGenerators\\__tests__\\hasFailuresByTestObject.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\collectFailureMessages.test.ts', () => {
        const sourceCode = `
			// TODO: Verify this test file is not needed and delete it
			import \{ dummyTest \} from '../../../../../../testUtils/testDummy';
			
			import create from 'create';
			import group from 'group';
			import \{ SuiteResult \} from 'produceSuiteResult';
			import * as vest from 'vest';
			
			describe('collectFailureMessages', () => \{
			  let suite, res: SuiteResult;
			
			  test('Result has an array of matching error messages', () => \{
			    const result = res.getErrors();
			    expect(result.field_1).toEqual([
			      'field_1_failure message 2',
			      'field_1_failure message 3',
			    ]);
			  \});
			
			  it('Should return filtered messages by the selected group', () => \{
			    const result = res.getErrorsByGroup('group_1');
			
			    expect(result).toEqual(\{
			      field_1: [],
			      field_2: ['field_2_failure message 1', 'field_2_failure message 3'],
			    \});
			  \});
			
			  it('Should return an empty object when no options and no failures', () => \{
			    expect(res.getErrors('nonexistent_field')).toEqual([]);
			  \});
			
			  it('Should return an object with an empty array when selected field has no errors', () => \{
			    expect(res.getErrors('v')).toEqual([]);
			  \});
			
			  describe('getErrors', () => \{
			    describe('When no options passed', () => \{
			      it('should match snapshot', () => \{
			        expect(res.getErrors()).toMatchSnapshot();
			      \});
			    \});
			
			    describe('When specific field requested', () => \{
			      it('Should match snapshot', () => \{
			        expect(res.getErrors('field_1')).toMatchSnapshot();
			        expect(res.getErrors('field_2')).toMatchSnapshot();
			        expect(res.getErrors('field_3')).toMatchSnapshot();
			      \});
			    \});
			  \});
			
			  describe('getWarnings', () => \{
			    describe('When no options passed', () => \{
			      it('should match snapshot', () => \{
			        expect(res.getWarnings()).toMatchSnapshot();
			      \});
			    \});
			
			    describe('When specific field requested', () => \{
			      it('Should match snapshot', () => \{
			        expect(res.getWarnings('field_1')).toMatchSnapshot();
			        expect(res.getWarnings('field_2')).toMatchSnapshot();
			        expect(res.getWarnings('field_3')).toMatchSnapshot();
			      \});
			    \});
			  \});
			
			  describe('getErrorsByGroup', () => \{
			    it('Should match snapshot', () => \{
			      expect(res.getErrorsByGroup('group_1')).toMatchSnapshot();
			    \});
			
			    describe('with field name', () => \{
			      it('Should match snapshot', () => \{
			        expect(res.getErrorsByGroup('group_1', 'field_1')).toMatchSnapshot();
			        expect(res.getErrorsByGroup('group_1', 'field_2')).toMatchSnapshot();
			        expect(res.getErrorsByGroup('group_1', 'field_3')).toMatchSnapshot();
			      \});
			    \});
			  \});
			  describe('getWarningsByGroup', () => \{
			    it('Should match snapshot', () => \{
			      expect(res.getWarningsByGroup('group_1')).toMatchSnapshot();
			    \});
			
			    describe('with field name', () => \{
			      it('Should match snapshot', () => \{
			        expect(res.getWarningsByGroup('group_1', 'field_1')).toMatchSnapshot();
			        expect(res.getWarningsByGroup('group_1', 'field_2')).toMatchSnapshot();
			        expect(res.getWarningsByGroup('group_1', 'field_3')).toMatchSnapshot();
			      \});
			    \});
			  \});
			
			  beforeEach(() => \{
			    suite = create(() => \{
			      dummyTest.passing('field_1', 'field_1_failure message 1');
			      dummyTest.failing('field_1', 'field_1_failure message 2');
			      dummyTest.failing('field_1', 'field_1_failure message 3');
			      group('group_1', () => \{
			        vest.test('field_1', () => false);
			        vest.test('field_3', () => \{\});
			      \});
			      dummyTest.failing('field_2', 'field_2_failure message 1', 'group_1');
			      dummyTest.passingWarning('field_2', 'field_2_warning message 1');
			      dummyTest.failingWarning('field_2', 'field_2_warning message 2');
			      dummyTest.failingWarning(
			        'field_2',
			        'field_2_warning message 3',
			        'group_1'
			      );
			      dummyTest.failing('field_2', 'field_2_failure message 3', 'group_1');
			      dummyTest.passing('v');
			
			      group('group_2', () => \{
			        dummyTest.passing('x');
			      \});
			    \});
			    suite();
			    res = suite.get();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\collectFailureMessages.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\getFailures.test.ts', () => {
        const sourceCode = `
			import \{ dummyTest \} from '../../../../../../testUtils/testDummy';
			
			import * as vest from 'vest';
			
			describe('->getFailures', () => \{
			  describe(\`getErrors\`, () => \{
			    describe('When no tests', () => \{
			      describe('When no parameters passed', () => \{
			        it('Should return an empty object', () => \{
			          const suite = vest.create(() => \{\});
			
			          expect(suite().getErrors()).toEqual(\{\});
			          expect(suite.get().getErrors()).toEqual(\{\});
			        \});
			      \});
			      describe('When requesting a fieldName', () => \{
			        it('Should return an empty array', () => \{
			          const suite = vest.create(() => \{\});
			          expect(suite().getErrors()).toEqual(\{\});
			          expect(suite.get().getErrors('field_2')).toEqual([]);
			        \});
			      \});
			    \});
			    describe('When no errors', () => \{
			      describe('When no parameters passed', () => \{
			        it('Should return an object no errors', () => \{
			          const suite = vest.create(() => \{
			            dummyTest.passing('f1');
			            dummyTest.passing('f2');
			          \});
			          expect(suite().getErrors()).toEqual(\{\});
			          expect(suite.get().getErrors()).toEqual(\{\});
			        \});
			      \});
			      describe('When requesting a fieldName', () => \{
			        it('Should return an empty array', () => \{
			          const suite = vest.create(() => \{
			            dummyTest.passing('field_1');
			            dummyTest.passing();
			          \});
			          expect(suite().getErrors('field_1')).toEqual([]);
			          expect(suite.get().getErrors('field_1')).toEqual([]);
			        \});
			      \});
			    \});
			
			    describe('When there are errors', () => \{
			      describe('When no parameters passed', () => \{
			        it('Should return an object with an array per field', () => \{
			          const suite = vest.create(() => \{
			            dummyTest.failing('field_1', 'msg_1');
			            dummyTest.failing('field_2', 'msg_2');
			            dummyTest.failing('field_2', 'msg_3');
			            dummyTest.passing('field_1', 'msg_4');
			            dummyTest.failingWarning('field_1', 'msg_5');
			          \});
			          expect(suite().getErrors()).toEqual(\{
			            field_1: ['msg_1'],
			            field_2: ['msg_2', 'msg_3'],
			          \});
			          expect(suite.get().getErrors()).toEqual(\{
			            field_1: ['msg_1'],
			            field_2: ['msg_2', 'msg_3'],
			          \});
			        \});
			      \});
			      describe('When requesting a fieldName', () => \{
			        it('Should return an empty array', () => \{
			          const suite = vest.create(() => \{
			            dummyTest.failing('field_1', 'msg_1');
			            dummyTest.failing('field_2', 'msg_2');
			            dummyTest.failing('field_2', 'msg_3');
			            dummyTest.passing('field_1', 'msg_4');
			            dummyTest.failingWarning('field_1', 'msg_5');
			          \});
			          expect(suite().getErrors('field_1')).toEqual(['msg_1']);
			          expect(suite.get().getErrors('field_1')).toEqual(['msg_1']);
			        \});
			      \});
			    \});
			  \});
			
			  describe(\`getWarnings\`, () => \{
			    describe('When no testObjects', () => \{
			      describe('When no parameters passed', () => \{
			        it('Should return an empty object', () => \{
			          const suite = vest.create(() => \{\});
			          expect(suite().getWarnings()).toEqual(\{\});
			          expect(suite.get().getWarnings()).toEqual(\{\});
			        \});
			      \});
			      describe('When requesting a fieldName', () => \{
			        it('Should return an empty array', () => \{
			          const suite = vest.create(() => \{\});
			          expect(suite().getWarnings('field_1')).toEqual([]);
			          expect(suite.get().getWarnings('field_1')).toEqual([]);
			        \});
			      \});
			    \});
			    describe('When no warnings', () => \{
			      describe('When no parameters passed', () => \{
			        it('Should return an empty object', () => \{
			          const suite = vest.create(() => \{
			            dummyTest.passing('x');
			            dummyTest.passing('y');
			          \});
			          expect(suite().getWarnings()).toEqual(\{\});
			          expect(suite.get().getWarnings()).toEqual(\{\});
			        \});
			      \});
			      describe('When requesting a fieldName', () => \{
			        it('Should return an empty array', () => \{
			          const suite = vest.create(() => \{
			            dummyTest.passing('field_1');
			            dummyTest.passing();
			          \});
			          expect(suite().getWarnings('field_1')).toEqual([]);
			          expect(suite.get().getWarnings('field_1')).toEqual([]);
			        \});
			      \});
			    \});
			
			    describe('When there are warnings', () => \{
			      describe('When no parameters passed', () => \{
			        it('Should return an object with an array per field', () => \{
			          const suite = vest.create(() => \{
			            dummyTest.failingWarning('field_1', 'msg_1');
			            dummyTest.failingWarning('field_2', 'msg_2');
			            dummyTest.failingWarning('field_2', 'msg_3');
			            dummyTest.passingWarning('field_1', 'msg_4');
			            dummyTest.failing('field_1', 'msg_5');
			          \});
			          expect(suite().getWarnings()).toEqual(\{
			            field_1: ['msg_1'],
			            field_2: ['msg_2', 'msg_3'],
			          \});
			          expect(suite.get().getWarnings()).toEqual(\{
			            field_1: ['msg_1'],
			            field_2: ['msg_2', 'msg_3'],
			          \});
			        \});
			      \});
			      describe('When requesting a fieldName', () => \{
			        it('Should return an empty array', () => \{
			          const suite = vest.create(() => \{
			            dummyTest.failingWarning('field_1', 'msg_1');
			            dummyTest.failingWarning('field_2', 'msg_2');
			            dummyTest.failingWarning('field_2', 'msg_3');
			            dummyTest.passingWarning('field_1', 'msg_4');
			            dummyTest.failing('field_1', 'msg_5');
			          \});
			          expect(suite().getWarnings('field_1')).toEqual(['msg_1']);
			          expect(suite.get().getWarnings('field_1')).toEqual(['msg_1']);
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\getFailures.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\getFailuresByGroup.test.ts', () => {
        const sourceCode = `
			import \{ dummyTest \} from '../../../../../../testUtils/testDummy';
			
			import group from 'group';
			import \{ create \} from 'vest';
			import * as vest from 'vest';
			
			const modes = ['SuiteRunResult', 'SuiteResult'];
			
			describe.each(modes)('produce method: %s', mode => \{
			  let suite;
			
			  function getRes(...args: any[]) \{
			    const res = suite(...args);
			    return mode === 'SuiteRunResult' ? res : suite.get();
			  \}
			
			  describe(\`\$\{mode\}->getErrorsByGroup\`, () => \{
			    describe('When no tests', () => \{
			      beforeEach(() => \{
			        suite = create(() => \{\});
			      \});
			      describe('When no fieldName passed', () => \{
			        it('Should return an object with empty message arrays', () => \{
			          expect(getRes().getErrorsByGroup('group_name')).toEqual(\{\});
			        \});
			      \});
			      describe('When fieldName passed', () => \{
			        it('Should return an empty array', () => \{
			          expect(getRes().getErrorsByGroup('group_name', 'field_name')).toEqual(
			            []
			          );
			        \});
			      \});
			    \});
			
			    describe('When no failures', () => \{
			      describe('When no fieldName passed', () => \{
			        it('Should return an object with empty message arrays', () => \{
			          suite = create(() => \{
			            dummyTest.passing('field_1', 'message', 'group_name');
			            dummyTest.passing('f2');
			          \});
			          expect(getRes().getErrorsByGroup('group_name')).toEqual(\{\});
			        \});
			      \});
			      describe('When fieldName passed', () => \{
			        it('Should return an empty array', () => \{
			          suite = create(() => \{
			            dummyTest.passing('field_1', 'message', 'group_name');
			            dummyTest.passing();
			          \});
			          expect(getRes().getErrorsByGroup('group_name', 'field_name')).toEqual(
			            []
			          );
			        \});
			      \});
			    \});
			
			    describe('When there are failures', () => \{
			      describe('When no fieldName passed', () => \{
			        it('Should return an object containing the error messages of each group', () => \{
			          suite = create(() => \{
			            dummyTest.failing('field_1', 'message_1', 'group_name');
			            dummyTest.failing('field_1', 'message_2');
			            dummyTest.failing('field_2');
			            dummyTest.failing('field_2', 'message_3', 'group_name');
			            dummyTest.failing('field_2', 'message_4', 'group_name');
			            dummyTest.failing('field_2', 'message_4', 'group_name_2');
			            dummyTest.passing('field_1');
			            dummyTest.passing('field_2');
			            dummyTest.passing('field_3');
			          \});
			          expect(getRes().getErrorsByGroup('group_name')).toEqual(\{
			            field_1: ['message_1'],
			            field_2: ['message_3', 'message_4'],
			          \});
			        \});
			      \});
			      describe('When fieldName passed', () => \{
			        it("Should return an array of the field's error messages", () => \{
			          suite = create(() => \{
			            group('group_name', () => \{
			              vest.test('field_1', 'message_1', () => false);
			              vest.test('field_2', 'message_3', () => false);
			            \});
			            vest.test('field_1', 'message_2', () => false);
			            vest.test('field_2', () => false);
			            vest.test('field_1', () => \{\});
			            vest.test('field_2', () => \{\});
			            vest.test('field_3', () => \{\});
			          \});
			          expect(getRes().getErrorsByGroup('group_name', 'field_1')).toEqual([
			            'message_1',
			          ]);
			          expect(getRes().getErrorsByGroup('group_name', 'field_2')).toEqual([
			            'message_3',
			          ]);
			        \});
			      \});
			    \});
			  \});
			  describe(\`\$\{mode\}->getWarningsByGroup\`, () => \{
			    describe('When no tests', () => \{
			      beforeEach(() => \{
			        suite = create(() => \{\});
			      \});
			      describe('When no fieldName passed', () => \{
			        it('Should return an object with empty message arrays', () => \{
			          expect(getRes().getWarningsByGroup('group_name')).toEqual(\{\});
			        \});
			      \});
			      describe('When fieldName passed', () => \{
			        it('Should return an empty array', () => \{
			          expect(
			            getRes().getWarningsByGroup('group_name', 'field_name')
			          ).toEqual([]);
			        \});
			      \});
			    \});
			
			    describe('When no failures', () => \{
			      describe('When no fieldName passed', () => \{
			        it('Should return an object with no message arrays', () => \{
			          suite = create(() => \{
			            dummyTest.passing('field_1', 'message', 'group_name');
			            dummyTest.passing();
			          \});
			          expect(getRes().getWarningsByGroup('group_name')).toEqual(\{\});
			        \});
			      \});
			      describe('When fieldName passed', () => \{
			        it('Should return an empty array', () => \{
			          suite = create(() => \{
			            dummyTest.passing('field_1', 'message', 'group_name');
			            dummyTest.passing();
			          \});
			          expect(
			            getRes().getWarningsByGroup('group_name', 'field_name')
			          ).toEqual([]);
			        \});
			      \});
			    \});
			
			    describe('When there are failures', () => \{
			      describe('When no fieldName passed', () => \{
			        it('Should return an object containing the warning messages of each group', () => \{
			          suite = create(() => \{
			            dummyTest.failingWarning('field_1', 'message_1', 'group_name');
			            dummyTest.failingWarning('field_1', 'message_2');
			            dummyTest.failingWarning('field_2');
			            dummyTest.failingWarning('field_2', 'message_3', 'group_name');
			            dummyTest.failingWarning('field_2', 'message_4', 'group_name');
			            dummyTest.failingWarning('field_2', 'message_4', 'group_name_2');
			            dummyTest.passing('field_1');
			            dummyTest.passing('field_2');
			            dummyTest.passing('field_3');
			          \});
			          expect(getRes().getWarningsByGroup('group_name')).toEqual(\{
			            field_1: ['message_1'],
			            field_2: ['message_3', 'message_4'],
			          \});
			        \});
			      \});
			      describe('When fieldName passed', () => \{
			        it("Should return an array of the field's warning messages", () => \{
			          suite = create(() => \{
			            group('group_name', () => \{
			              vest.test('field_1', 'message_1', () => \{
			                vest.warn();
			                return false;
			              \});
			              vest.test('field_2', 'message_3', () => \{
			                vest.warn();
			                return false;
			              \});
			            \});
			            vest.test('field_1', 'message_2', () => \{
			              vest.warn();
			              return false;
			            \});
			            vest.test('field_2', () => \{
			              vest.warn();
			              return false;
			            \});
			            vest.test('field_1', () => \{\});
			            vest.test('field_2', () => \{\});
			            vest.test('field_3', () => \{\});
			          \});
			          expect(getRes().getWarningsByGroup('group_name', 'field_1')).toEqual([
			            'message_1',
			          ]);
			          expect(getRes().getWarningsByGroup('group_name', 'field_2')).toEqual([
			            'message_3',
			          ]);
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\getFailuresByGroup.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\hasFailures.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ dummyTest \} from '../../../../../../testUtils/testDummy';
			
			import * as vest from 'vest';
			
			describe('produce method: hasFailures', () => \{
			  const fieldName = faker.random.word();
			
			  describe(\`hasErrors\`, () => \{
			    describe('When no test objects', () => \{
			      it('should return false', () => \{
			        const suite = vest.create(() => \{\});
			        const res = suite();
			        expect(res.hasErrors(fieldName)).toBe(false);
			        expect(suite.get().hasErrors(fieldName)).toBe(false);
			        expect(res.hasErrors()).toBe(false);
			        expect(suite.get().hasErrors()).toBe(false);
			      \});
			    \});
			
			    describe('When no failing test objects', () => \{
			      it('should return false', () => \{
			        const suite = vest.create(() => \{
			          dummyTest.passing(fieldName);
			          dummyTest.passing('field_1');
			          dummyTest.passing('field_2');
			        \});
			        const res = suite();
			        expect(res.hasErrors(fieldName)).toBe(false);
			        expect(suite.get().hasErrors(fieldName)).toBe(false);
			        expect(res.hasErrors()).toBe(false);
			        expect(suite.get().hasErrors()).toBe(false);
			      \});
			    \});
			
			    describe('When failed fields are warning', () => \{
			      it('should return false', () => \{
			        const suite = vest.create(() => \{
			          dummyTest.failingWarning();
			          dummyTest.passing(fieldName);
			        \});
			        const res = suite();
			        expect(res.hasErrors(fieldName)).toBe(false);
			        expect(suite.get().hasErrors(fieldName)).toBe(false);
			        expect(res.hasErrors()).toBe(false);
			        expect(suite.get().hasErrors()).toBe(false);
			      \});
			    \});
			
			    describe('When field has an error', () => \{
			      it('Should return true when some of the tests of the field are erroring', () => \{
			        const suite = vest.create(() => \{
			          dummyTest.passing();
			          dummyTest.failing(fieldName);
			        \});
			        const res = suite();
			        expect(res.hasErrors(fieldName)).toBe(true);
			        expect(suite.get().hasErrors(fieldName)).toBe(true);
			        expect(res.hasErrors()).toBe(true);
			        expect(suite.get().hasErrors()).toBe(true);
			      \});
			
			      it('should return true', () => \{
			        const suite = vest.create(() => \{
			          dummyTest.failing(fieldName);
			        \});
			        const res = suite();
			        expect(res.hasErrors(fieldName)).toBe(true);
			        expect(suite.get().hasErrors(fieldName)).toBe(true);
			        expect(res.hasErrors()).toBe(true);
			        expect(suite.get().hasErrors()).toBe(true);
			      \});
			    \});
			  \});
			
			  describe(\`hasWarnings\`, () => \{
			    describe('When no test objects', () => \{
			      it('should return false', () => \{
			        const suite = vest.create(() => \{\});
			        const res = suite();
			        expect(res.hasWarnings(fieldName)).toBe(false);
			        expect(suite.get().hasWarnings(fieldName)).toBe(false);
			        expect(res.hasWarnings()).toBe(false);
			        expect(suite.get().hasWarnings()).toBe(false);
			      \});
			    \});
			
			    describe('When no failing test objects', () => \{
			      it('should return false', () => \{
			        const suite = vest.create(() => \{
			          dummyTest.passingWarning(fieldName);
			          dummyTest.passing('field_1');
			        \});
			        const res = suite();
			        expect(res.hasWarnings(fieldName)).toBe(false);
			        expect(suite.get().hasWarnings(fieldName)).toBe(false);
			        expect(res.hasWarnings()).toBe(false);
			        expect(suite.get().hasWarnings()).toBe(false);
			      \});
			    \});
			
			    describe('When failed fields is not warning', () => \{
			      it('should return false', () => \{
			        const suite = vest.create(() => \{
			          dummyTest.failing(fieldName);
			        \});
			        const res = suite();
			        expect(res.hasWarnings(fieldName)).toBe(false);
			        expect(suite.get().hasWarnings(fieldName)).toBe(false);
			        expect(res.hasWarnings()).toBe(false);
			        expect(suite.get().hasWarnings()).toBe(false);
			      \});
			    \});
			
			    describe('When field is warning', () => \{
			      it('Should return true when some of the tests of the field are warning', () => \{
			        const suite = vest.create(() => \{
			          dummyTest.passingWarning();
			          dummyTest.failingWarning(fieldName);
			        \});
			        const res = suite();
			        expect(res.hasWarnings(fieldName)).toBe(true);
			        expect(suite.get().hasWarnings(fieldName)).toBe(true);
			        expect(res.hasWarnings()).toBe(true);
			        expect(suite.get().hasWarnings()).toBe(true);
			      \});
			
			      it('should return false', () => \{
			        const suite = vest.create(() => \{
			          dummyTest.failingWarning(fieldName);
			        \});
			        const res = suite();
			        expect(res.hasWarnings(fieldName)).toBe(true);
			        expect(suite.get().hasWarnings(fieldName)).toBe(true);
			        expect(res.hasWarnings()).toBe(true);
			        expect(suite.get().hasWarnings()).toBe(true);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\hasFailures.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\hasFailuresByGroup.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ dummyTest \} from '../../../../../../testUtils/testDummy';
			
			import * as vest from 'vest';
			
			const fieldName = faker.random.word();
			const groupName = faker.lorem.word();
			
			let suite;
			describe('hasErrorsByGroup', () => \{
			  describe('When no tests', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => undefined);
			
			      expect(suite().hasErrorsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When no failing tests', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => \{
			        dummyTest.passing();
			      \});
			      expect(suite().hasErrorsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When there are failing tests without a group', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => \{
			        dummyTest.failing();
			      \});
			      expect(suite().hasErrorsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When failing tests are from a different group', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => \{
			        vest.group('another_group', () => \{
			          dummyTest.failing('field_1', 'msg');
			        \});
			      \});
			
			      expect(suite().hasErrorsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When failing tests are from the same group but warning', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => \{
			        vest.group(groupName, () => \{
			          dummyTest.failingWarning('field_1', 'msg');
			        \});
			      \});
			      expect(suite().hasErrorsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When failing tests are from the same group', () => \{
			    it('Should return true', () => \{
			      suite = vest.create(() => \{
			        vest.group(groupName, () => \{
			          dummyTest.failing('field_1', 'msg');
			        \});
			      \});
			      expect(suite().hasErrorsByGroup(groupName)).toBe(true);
			    \});
			  \});
			
			  describe('When fieldName is provided', () => \{
			    describe('When not matching', () => \{
			      it('Should return false', () => \{
			        suite = vest.create(() => \{
			          vest.group(groupName, () => \{
			            dummyTest.failing('field_1', 'msg');
			          \});
			        \});
			        expect(suite().hasErrorsByGroup(groupName, 'non_matcing_field')).toBe(
			          false
			        );
			      \});
			    \});
			
			    describe('When matching', () => \{
			      it('Should return true', () => \{
			        suite = vest.create(() => \{
			          vest.group(groupName, () => \{
			            dummyTest.failing(fieldName, 'msg');
			          \});
			        \});
			        expect(suite().hasErrorsByGroup(groupName, fieldName)).toBe(true);
			      \});
			    \});
			  \});
			\});
			
			describe('hasWarningsByGroup', () => \{
			  describe('When no tests', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => undefined);
			      expect(suite().hasWarningsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When no failing tests', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => \{
			        vest.group(groupName, () => \{
			          dummyTest.passingWarning(fieldName, 'msg');
			        \});
			      \});
			      expect(suite().hasWarningsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When there are failing tests without a group', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => \{
			        dummyTest.failingWarning();
			      \});
			      expect(suite().hasWarningsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When failing tests are from a different group', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => \{
			        vest.group('another_group', () => \{
			          dummyTest.failingWarning('field_1', 'msg');
			        \});
			      \});
			      expect(suite().hasWarningsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When failing tests are from the same group but erroring', () => \{
			    it('Should return false', () => \{
			      suite = vest.create(() => \{
			        vest.group(groupName, () => \{
			          dummyTest.failing('field_1', 'msg');
			        \});
			      \});
			      expect(suite().hasWarningsByGroup(groupName)).toBe(false);
			    \});
			  \});
			
			  describe('When failing tests are from the same group', () => \{
			    it('Should return true', () => \{
			      suite = vest.create(() => \{
			        vest.group(groupName, () => \{
			          dummyTest.failingWarning(fieldName, 'msg');
			        \});
			      \});
			      expect(suite().hasWarningsByGroup(groupName)).toBe(true);
			    \});
			  \});
			
			  describe('When fieldName is provided', () => \{
			    describe('When not matching', () => \{
			      it('Should return false', () => \{
			        suite = vest.create(() => \{
			          vest.group(groupName, () => \{
			            dummyTest.failingWarning(fieldName, 'msg');
			          \});
			        \});
			        expect(suite().hasWarningsByGroup(groupName, 'non_matcing_field')).toBe(
			          false
			        );
			      \});
			    \});
			
			    describe('When matching', () => \{
			      it('Should return true', () => \{
			        suite = vest.create(() => \{
			          vest.group(groupName, () => \{
			            dummyTest.failingWarning(fieldName, 'msg');
			          \});
			        \});
			        expect(suite().hasWarningsByGroup(groupName, fieldName)).toBe(true);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\hasFailuresByGroup.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(16)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\isValid.test.ts', () => {
        const sourceCode = `
			import wait from 'wait';
			
			import \{ test, optional, create, skipWhen, warn, skip, only \} from 'vest';
			
			describe('isValid', () => \{
			  describe('Before any test ran', () => \{
			    it('Should return false', () => \{
			      const suite = create(() => \{
			        test('field_1', () => false);
			      \});
			
			      expect(suite.get().isValid()).toBe(false);
			    \});
			  \});
			
			  describe('When there are errors in the suite', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create((fieldToSkip: string) => \{
			        skip(fieldToSkip);
			        optional('field_1');
			
			        test('field_1', () => false);
			        test('field_2', () => false);
			        test('sanity', () => true);
			      \});
			    \});
			
			    it('Should return false when an optional test has errors', () => \{
			      expect(suite('field_2').isValid()).toBe(false);
			    \});
			    it('Should return false when a required test has errors', () => \{
			      expect(suite('field_1').isValid()).toBe(false);
			    \});
			
			    it('Should return false when the queried field is not optional and has errors', () => \{
			      expect(suite('field_2').isValid('field_2')).toBe(false);
			    \});
			
			    it('Should return true when the queried field is optional and has errors', () => \{
			      expect(suite('field_1').isValid('field_1')).toBe(true);
			    \});
			  \});
			
			  describe('When there are warnings in the suite', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(() => \{
			        test('field_1', () => \{
			          warn();
			          return false;
			        \});
			      \});
			    \});
			    it('Should return true when a required test has warnings', () => \{
			      expect(suite().isValid()).toBe(true);
			      expect(suite().isValid('field_1')).toBe(true);
			    \});
			
			    describe('When some of the tests for the required field are warnings', () => \{
			      beforeEach(() => \{
			        suite = create(() => \{
			          test('field_1', () => \{
			            warn();
			            return false;
			          \});
			          test('field_1', () => true);
			        \});
			      \});
			      it('Should return true when a required test has warnings', () => \{
			        expect(suite().isValid()).toBe(true);
			      \});
			    \});
			
			    describe('when a warning test in a required field is skipped', () => \{
			      beforeEach(() => \{
			        suite = create(() => \{
			          test('field_1', () => true);
			
			          skipWhen(true, () => \{
			            test('field_1', () => \{
			              warn();
			              return false;
			            \});
			          \});
			        \});
			      \});
			      it('Should return false even when the skipped field is warning', () => \{
			        expect(suite().isValid()).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('When a non optional field is skipped', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(fieldToSkip => \{
			        skip(fieldToSkip);
			        test('field_1', () => \{
			          return false;
			        \});
			        test('field_2', () => \{
			          return true;
			        \});
			        test('field_3', () => \{
			          return true;
			        \});
			      \});
			    \});
			    it('Should return false', () => \{
			      expect(suite('field_1').isValid()).toBe(false);
			    \});
			    it('Should return false', () => \{
			      expect(suite(['field_2', 'field_3']).isValid()).toBe(false);
			    \});
			  \});
			
			  describe('When the suite has an async optional test', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(() => \{
			        optional('field_1');
			        test('field_1', async () => \{
			          await wait(300);
			        \});
			      \});
			    \});
			
			    describe('When test is pending', () => \{
			      it('Should return true', () => \{
			        suite();
			        expect(suite.get().isValid()).toBe(true);
			        expect(suite.get().isValid('field_1')).toBe(true);
			      \});
			    \});
			    describe('When test is passing', () => \{
			      it('Should return true', async () => \{
			        suite();
			        await wait(300);
			        expect(suite.get().isValid()).toBe(true);
			        expect(suite.get().isValid('field_1')).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('When the suite has warning async tests', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(() => \{
			        test('field_1', async () => \{
			          warn();
			          await wait(300);
			        \});
			
			        test('field_1', () => \{
			          return true;
			        \});
			      \});
			    \});
			
			    it('Should return false as long as the test is pending', async () => \{
			      suite();
			      expect(suite.get().isValid()).toBe(false);
			      await wait(300);
			      expect(suite.get().isValid()).toBe(true);
			    \});
			
			    it('Should return false as long as the test is pending when querying a specific field', async () => \{
			      suite();
			      expect(suite.get().isValid('field_1')).toBe(false);
			      await wait(300);
			      expect(suite.get().isValid('field_1')).toBe(true);
			    \});
			  \});
			
			  describe('When the suite has async non-optional tests', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(currentField => \{
			        only(currentField);
			        optional('field_2');
			        test('field_1', async () => \{
			          await wait(300);
			        \});
			        test('field_2', () => \{
			          return true;
			        \});
			      \});
			    \});
			
			    describe('When test is pending', () => \{
			      it('Should return \`false\` for a required field', () => \{
			        const result = suite();
			
			        expect(result.isValid()).toBe(false);
			        expect(result.isValid('field_1')).toBe(false);
			      \});
			    \});
			
			    describe('When async test is passing', () => \{
			      it('Should return \`true\`', () => \{
			        return new Promise<void>(done => \{
			          suite().done(result => \{
			            expect(result.isValid()).toBe(true);
			            expect(result.isValid('field_1')).toBe(true);
			            expect(result.isValid('field_2')).toBe(true);
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe('When test is lagging', () => \{
			      it('Should return \`false\`', () => \{
			        suite();
			        const result = suite('field_2');
			
			        expect(result.isValid()).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('When a all required fields are passing', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(() => \{
			        test('field_1', () => \{
			          return true;
			        \});
			        test('field_1', () => \{
			          return true;
			        \});
			        test('field_2', () => \{
			          return true;
			        \});
			        test('field_3', () => \{
			          return true;
			        \});
			      \});
			    \});
			    it('Should return true', () => \{
			      expect(suite().isValid()).toBe(true);
			      expect(suite().isValid('field_1')).toBe(true);
			      expect(suite().isValid('field_2')).toBe(true);
			      expect(suite().isValid('field_3')).toBe(true);
			    \});
			  \});
			
			  describe('When a required field has some passing tests', () => \{
			    it('Should return false', () => \{
			      expect(
			        create(() => \{
			          test('field_1', () => true);
			          skipWhen(true, () => \{
			            test('field_1', () => \{
			              return true;
			            \});
			          \});
			        \})().isValid()
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When field name is specified', () => \{
			    it('Should return false when field did not run yet', () => \{
			      expect(
			        create(() => \{
			          skip('field_1');
			          test('field_1', () => true);
			        \})().isValid('field_1')
			      ).toBe(false);
			    \});
			
			    it('Should return false when testing for a field that does not exist', () => \{
			      expect(
			        create(() => \{
			          test('field_1', () => \{\});
			        \})().isValid('field 2')
			      ).toBe(false);
			    \});
			
			    it("Should return false when some of the field's tests ran", () => \{
			      expect(
			        create(() => \{
			          test('field_1', () => \{
			            return true;
			          \});
			          skipWhen(true, () => \{
			            test('field_1', () => \{
			              return true;
			            \});
			          \});
			        \})().isValid('field_1')
			      ).toBe(false);
			    \});
			
			    it('Should return false when the field has errors', () => \{
			      expect(
			        create(() => \{
			          test('field_1', () => \{
			            return false;
			          \});
			        \})().isValid('field_1')
			      ).toBe(false);
			    \});
			
			    it('Should return true when all the tests are passing', () => \{
			      expect(
			        create(() => \{
			          test('field_1', () => \{
			            return true;
			          \});
			        \})().isValid('field_1')
			      ).toBe(true);
			    \});
			
			    it('Should return true when the field only has warnings', () => \{
			      expect(
			        create(() => \{
			          test('field_1', () => \{
			            warn();
			            return false;
			          \});
			        \})().isValid('field_1')
			      ).toBe(true);
			    \});
			
			    it('Should return true if field is optional and did not run', () => \{
			      expect(
			        create(() => \{
			          optional('field_1');
			          skipWhen(true, () => \{
			            test('field_1', () => false);
			          \});
			        \})().isValid('field_1')
			      ).toBe(true);
			    \});
			  \});
			
			  describe('When querying a non existing field', () => \{
			    it('Should return false', () => \{
			      expect(
			        create(() => \{
			          test('field_1', () => true);
			        \})().isValid('field_2')
			      ).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\isValid.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(59)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\isValidByGroup.test.ts', () => {
        const sourceCode = `
			import wait from 'wait';
			
			import \{
			  test,
			  optional,
			  create,
			  skipWhen,
			  warn,
			  skip,
			  only,
			  group,
			\} from 'vest';
			
			const GROUP_NAME = 'group_1';
			
			describe('isValidByGroup', () => \{
			  describe('Before any test ran', () => \{
			    it('Should return false', () => \{
			      const suite = create(() => \{
			        group(GROUP_NAME, () => \{
			          test('field_1', () => \{\});
			        \});
			      \});
			
			      expect(suite.get().isValidByGroup(GROUP_NAME)).toBe(false);
			    \});
			  \});
			
			  describe('When there are errors in the group', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create((fieldToSkip: string) => \{
			        skip(fieldToSkip);
			        optional('field_1');
			
			        group(GROUP_NAME, () => \{
			          test('field_1', () => false);
			          test('field_2', () => false);
			          test('sanity', () => true);
			        \});
			      \});
			    \});
			
			    it('Should return false when an optional test has errors', () => \{
			      expect(suite('field_2').isValidByGroup(GROUP_NAME)).toBe(false);
			      expect(suite('field_2').isValidByGroup(GROUP_NAME, 'field_1')).toBe(
			        false
			      );
			    \});
			    it('Should return false when a required test has errors', () => \{
			      expect(suite('field_1').isValidByGroup(GROUP_NAME)).toBe(false);
			      expect(suite('field_1').isValidByGroup(GROUP_NAME, 'field_2')).toBe(
			        false
			      );
			    \});
			
			    it('Should return false when the queried field is not optional and has errors', () => \{
			      expect(suite('field_2').isValidByGroup(GROUP_NAME, 'field_2')).toBe(
			        false
			      );
			    \});
			
			    it('Should return true when the queried field is optional and has errors', () => \{
			      expect(suite('field_1').isValidByGroup(GROUP_NAME, 'field_1')).toBe(true);
			    \});
			  \});
			
			  describe('When there are warnings in the group', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(() => \{
			        group(GROUP_NAME, () => \{
			          test('field_1', () => \{
			            warn();
			            return false;
			          \});
			        \});
			      \});
			    \});
			    it('Should return true when a required test has warnings', () => \{
			      expect(suite().isValidByGroup(GROUP_NAME)).toBe(true);
			      expect(suite().isValidByGroup(GROUP_NAME, 'field_1')).toBe(true);
			    \});
			
			    describe('When some of the tests for the required field are warnings', () => \{
			      beforeEach(() => \{
			        suite = create(() => \{
			          test('field_1', () => \{
			            warn();
			            return false;
			          \});
			          test('field_1', () => true);
			        \});
			      \});
			      it('Should return true when a required test has warnings', () => \{
			        expect(suite().isValid()).toBe(true);
			      \});
			    \});
			
			    describe('when a warning test in a required field is skipped', () => \{
			      beforeEach(() => \{
			        suite = create(() => \{
			          test('field_1', () => true);
			
			          skipWhen(true, () => \{
			            test('field_1', () => \{
			              warn();
			              return false;
			            \});
			          \});
			        \});
			      \});
			      it('Should return false even when the skipped field is warning', () => \{
			        expect(suite().isValid()).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('When a non optional field is skipped', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(fieldToSkip => \{
			        skip(fieldToSkip);
			        group(GROUP_NAME, () => \{
			          test('field_1', () => \{
			            return false;
			          \});
			          test('field_2', () => \{
			            return true;
			          \});
			          test('field_3', () => \{
			            return true;
			          \});
			        \});
			      \});
			    \});
			    it('Should return false', () => \{
			      expect(suite('field_1').isValidByGroup(GROUP_NAME)).toBe(false);
			    \});
			    it('Should return false', () => \{
			      expect(suite(['field_2', 'field_3']).isValidByGroup(GROUP_NAME)).toBe(
			        false
			      );
			    \});
			  \});
			
			  describe('When the suite has an async optional test', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(() => \{
			        optional('field_1');
			
			        group(GROUP_NAME, () => \{
			          test('field_1', async () => \{
			            await wait(300);
			          \});
			        \});
			      \});
			    \});
			
			    describe('When test is pending', () => \{
			      it('Should return true', () => \{
			        suite();
			        expect(suite.get().isValidByGroup(GROUP_NAME)).toBe(true);
			        expect(suite.get().isValidByGroup(GROUP_NAME, 'field_1')).toBe(true);
			      \});
			    \});
			    describe('When test is passing', () => \{
			      it('Should return true', async () => \{
			        suite();
			        await wait(300);
			        expect(suite.get().isValidByGroup(GROUP_NAME)).toBe(true);
			        expect(suite.get().isValidByGroup(GROUP_NAME, 'field_1')).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('When the suite has warning async tests', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(() => \{
			        group(GROUP_NAME, () => \{
			          test('field_1', async () => \{
			            warn();
			            await wait(300);
			          \});
			
			          test('field_1', () => \{
			            return true;
			          \});
			        \});
			      \});
			    \});
			
			    it('Should return false as long as the test is pending', async () => \{
			      suite();
			      expect(suite.get().isValidByGroup(GROUP_NAME)).toBe(false);
			      await wait(300);
			      expect(suite.get().isValidByGroup(GROUP_NAME)).toBe(true);
			    \});
			
			    it('Should return false as long as the test is pending when querying a specific field', async () => \{
			      suite();
			      expect(suite.get().isValidByGroup(GROUP_NAME, 'field_1')).toBe(false);
			      await wait(300);
			      expect(suite.get().isValidByGroup(GROUP_NAME, 'field_1')).toBe(true);
			    \});
			  \});
			
			  describe('When the suite has async non-optional tests', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(currentField => \{
			        only(currentField);
			        optional('field_2');
			        group(GROUP_NAME, () => \{
			          test('field_1', async () => \{
			            await wait(300);
			          \});
			          test('field_2', () => \{
			            return true;
			          \});
			        \});
			      \});
			    \});
			
			    describe('When test is pending', () => \{
			      it('Should return \`false\` for a required field', () => \{
			        const result = suite();
			
			        expect(result.isValidByGroup(GROUP_NAME)).toBe(false);
			        expect(result.isValidByGroup(GROUP_NAME, 'field_1')).toBe(false);
			      \});
			    \});
			
			    describe('When async test is passing', () => \{
			      it('Should return \`true\`', () => \{
			        return new Promise<void>(done => \{
			          suite().done(result => \{
			            expect(result.isValidByGroup(GROUP_NAME)).toBe(true);
			            expect(result.isValidByGroup(GROUP_NAME, 'field_1')).toBe(true);
			            expect(result.isValidByGroup(GROUP_NAME, 'field_2')).toBe(true);
			            done();
			          \});
			        \});
			      \});
			    \});
			
			    describe('When test is lagging', () => \{
			      it('Should return \`false\`', () => \{
			        suite();
			        const result = suite('field_2');
			
			        expect(result.isValidByGroup(GROUP_NAME)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('When a all required fields are passing', () => \{
			    let suite;
			
			    beforeEach(() => \{
			      suite = create(() => \{
			        group(GROUP_NAME, () => \{
			          test('field_1', () => \{
			            return true;
			          \});
			          test('field_1', () => \{
			            return true;
			          \});
			          test('field_2', () => \{
			            return true;
			          \});
			          test('field_3', () => \{
			            return true;
			          \});
			        \});
			      \});
			    \});
			    it('Should return true', () => \{
			      expect(suite().isValidByGroup(GROUP_NAME)).toBe(true);
			      expect(suite().isValidByGroup(GROUP_NAME, 'field_1')).toBe(true);
			      expect(suite().isValidByGroup(GROUP_NAME, 'field_2')).toBe(true);
			      expect(suite().isValidByGroup(GROUP_NAME, 'field_3')).toBe(true);
			    \});
			  \});
			
			  describe('When a required field has some passing tests', () => \{
			    it('Should return false', () => \{
			      expect(
			        create(() => \{
			          group(GROUP_NAME, () => \{
			            test('field_1', () => true);
			            skipWhen(true, () => \{
			              test('field_1', () => \{
			                return true;
			              \});
			            \});
			          \});
			        \})().isValidByGroup(GROUP_NAME)
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When field name is specified', () => \{
			    it('Should return false when field did not run yet', () => \{
			      expect(
			        create(() => \{
			          skip('field_1');
			          group(GROUP_NAME, () => \{
			            test('field_1', () => true);
			          \});
			        \})().isValidByGroup(GROUP_NAME, 'field_1')
			      ).toBe(false);
			    \});
			
			    it('Should return false when testing for a field that does not exist', () => \{
			      expect(
			        create(() => \{
			          group(GROUP_NAME, () => \{
			            test('field_1', () => \{\});
			          \});
			        \})().isValidByGroup(GROUP_NAME, 'field 2')
			      ).toBe(false);
			    \});
			
			    it("Should return false when some of the field's tests ran", () => \{
			      expect(
			        create(() => \{
			          group(GROUP_NAME, () => \{
			            test('field_1', () => \{
			              return true;
			            \});
			            skipWhen(true, () => \{
			              test('field_1', () => \{
			                return true;
			              \});
			            \});
			          \});
			        \})().isValidByGroup(GROUP_NAME, 'field_1')
			      ).toBe(false);
			    \});
			
			    it('Should return false when the field has errors', () => \{
			      expect(
			        create(() => \{
			          group(GROUP_NAME, () => \{
			            test('field_1', () => false);
			          \});
			        \})().isValidByGroup(GROUP_NAME, 'field_1')
			      ).toBe(false);
			    \});
			
			    it('Should return true when all the tests are passing', () => \{
			      expect(
			        create(() => \{
			          group(GROUP_NAME, () => \{
			            test('field_1', () => \{\});
			          \});
			        \})().isValidByGroup(GROUP_NAME, 'field_1')
			      ).toBe(true);
			    \});
			
			    it('Should return true when the field only has warnings', () => \{
			      expect(
			        create(() => \{
			          group(GROUP_NAME, () => \{
			            test('field_1', () => \{
			              warn();
			              return false;
			            \});
			          \});
			        \})().isValidByGroup(GROUP_NAME, 'field_1')
			      ).toBe(true);
			    \});
			
			    it('Should return true if field is optional and did not run', () => \{
			      expect(
			        create(() => \{
			          optional('field_1');
			          skipWhen(true, () => \{
			            group(GROUP_NAME, () => \{
			              test('field_1', () => false);
			            \});
			          \});
			        \})().isValidByGroup(GROUP_NAME, 'field_1')
			      ).toBe(true);
			    \});
			  \});
			
			  describe('When querying a non existing field', () => \{
			    it('Should return false', () => \{
			      expect(
			        create(() => \{
			          group(GROUP_NAME, () => \{
			            test('field_1', () => true);
			          \});
			        \})().isValidByGroup(GROUP_NAME, 'field_2')
			      ).toBe(false);
			    \});
			  \});
			
			  describe('When querying a non existing group', () => \{
			    const suite = create(() => \{
			      group(GROUP_NAME, () => \{
			        test('field_1', () => true);
			      \});
			    \});
			    it('Should return false', () => \{
			      expect(suite().isValidByGroup('does-not-exist')).toBe(false);
			      expect(suite().isValidByGroup('does-not-exist', 'field_1')).toBe(false);
			    \});
			  \});
			
			  describe('When queried field is omitted', () => \{
			    it('Should return true', () => \{
			      expect(
			        create(() => \{
			          optional(\{
			            field_1: () => true,
			          \});
			          group(GROUP_NAME, () => \{
			            test('field_1', () => false);
			          \});
			        \})().isValidByGroup(GROUP_NAME)
			      ).toBe(true);
			    \});
			  \});
			
			  describe('When querying a field that is in a different group', () => \{
			    const suite = create(() => \{
			      group('group_1', () => \{
			        test('field_1', () => \{\});
			      \});
			      group('group_2', () => \{
			        test('field_2', () => \{\});
			      \});
			    \});
			
			    it('Should return false', () => \{
			      expect(suite().isValidByGroup('group_1', 'field_2')).toBe(false);
			      expect(suite().isValidByGroup('group_2', 'field_1')).toBe(false);
			    \});
			  \});
			
			  describe('When querying a field that is outside of a group', () => \{
			    const suite = create(() => \{
			      test('field_1', () => \{\});
			      group('group_1', () => \{
			        test('field_2', () => \{\});
			      \});
			    \});
			
			    it('Should return false', () => \{
			      expect(suite().isValidByGroup('group_1', 'field_1')).toBe(false);
			    \});
			  \});
			
			  describe('When the field exists both inside and outside of the group', () => \{
			    const suite = create(() => \{
			      test('field_1', () => false);
			      group('group_1', () => \{
			        test('field_1', () => \{\});
			      \});
			    \});
			
			    it('Should return the result of what is inside the group', () => \{
			      expect(suite().isValidByGroup('group_1', 'field_1')).toBe(true);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\summarySelectors\\__tests__\\isValidByGroup.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(72)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\__tests__\\done.test.ts', () => {
        const sourceCode = `
			import wait from 'wait';
			
			import \{ dummyTest \} from '../../../../../testUtils/testDummy';
			
			import * as vest from 'vest';
			
			describe('done', () => \{
			  describe('When no async tests', () => \{
			    it('Should call done callback immediately', () => \{
			      const result = vest.create(() => \{
			        dummyTest.passing();
			        dummyTest.passing();
			        dummyTest.failing();
			        dummyTest.failing();
			        dummyTest.passing();
			        dummyTest.failingWarning('field_2');
			      \})();
			
			      const doneCallback = jest.fn();
			      const fieldDoneCallback = jest.fn();
			
			      result.done(doneCallback).done('field_2', fieldDoneCallback);
			
			      expect(doneCallback).toHaveBeenCalled();
			      expect(fieldDoneCallback).toHaveBeenCalled();
			    \});
			  \});
			
			  describe('When suite lags and callbacks are registered again', () => \{
			    it('should only run most recent registered callbacks', async () => \{
			      const test = [];
			      const suite = vest.create(() => \{
			        test.push(dummyTest.failingAsync('test', \{ time: 100 \}));
			      \});
			
			      const doneCallback1 = jest.fn();
			      const fieldDoneCallback1 = jest.fn();
			      const doneCallback2 = jest.fn();
			      const fieldDoneCallback2 = jest.fn();
			
			      suite().done(doneCallback1).done('test', fieldDoneCallback1);
			      await wait(10);
			      suite().done(doneCallback2).done('test', fieldDoneCallback2);
			      await wait(100);
			      expect(doneCallback1).toHaveBeenCalledTimes(0);
			      expect(fieldDoneCallback1).toHaveBeenCalledTimes(0);
			      expect(doneCallback2).toHaveBeenCalledTimes(1);
			      expect(fieldDoneCallback2).toHaveBeenCalledTimes(1);
			    \});
			  \});
			
			  describe('When there are async tests', () => \{
			    describe('When field name is not passed', () => \{
			      it('Should run the done callback after all the fields finished running', () => \{
			        const check1 = jest.fn();
			        const check2 = jest.fn();
			        const check3 = jest.fn();
			        return new Promise<void>(done => \{
			          const doneCallback = jest.fn(() => \{
			            expect(check1).toHaveBeenCalled();
			            expect(check2).toHaveBeenCalled();
			            expect(check3).toHaveBeenCalled();
			            done();
			          \});
			          const result = vest.create(() => \{
			            dummyTest.passingAsync('field_1', \{ time: 1000 \});
			            dummyTest.failingAsync('field_2', \{ time: 100 \});
			            dummyTest.passingAsync('field_3', \{ time: 0 \});
			            dummyTest.failing();
			            dummyTest.passing();
			          \})();
			
			          result.done(doneCallback);
			
			          setTimeout(() => \{
			            expect(doneCallback).not.toHaveBeenCalled();
			            check1();
			          \});
			          setTimeout(() => \{
			            expect(doneCallback).not.toHaveBeenCalled();
			            check2();
			          \}, 150);
			          setTimeout(() => \{
			            expect(doneCallback).not.toHaveBeenCalled();
			            check3();
			          \}, 900);
			        \});
			      \});
			    \});
			  \});
			
			  describe('done arguments', () => \{
			    it('Should pass down the up to date validation result', () => \{
			      return new Promise<void>(done => \{
			        const result = vest.create(() => \{
			          dummyTest.failing('field_1', 'error message');
			          dummyTest.passing('field_2');
			          dummyTest.passingAsync('field_3', \{ time: 0 \});
			          dummyTest.failingAsync('field_4', \{
			            message: 'error_message',
			            time: 100,
			          \});
			          dummyTest.passingAsync('field_5', \{ time: 1000 \});
			        \})();
			
			        result
			          .done('field_2', res => \{
			            expect(res.getErrors()).toEqual(\{
			              field_1: ['error message'],
			            \});
			            expect(res).toMatchObject(\{
			              errorCount: 1,
			              groups: \{\},
			              testCount: 5,
			              tests: \{
			                field_1: \{
			                  errorCount: 1,
			                  errors: ['error message'],
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_2: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_3: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_4: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_5: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			              \},
			              warnCount: 0,
			            \});
			          \})
			          .done('field_3', res => \{
			            expect(res).toMatchObject(\{
			              errorCount: 1,
			              groups: \{\},
			              testCount: 5,
			              tests: \{
			                field_1: \{
			                  errorCount: 1,
			                  errors: ['error message'],
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_2: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_3: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_4: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_5: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			              \},
			              warnCount: 0,
			            \});
			          \})
			          .done('field_4', res => \{
			            expect(res.getErrors()).toEqual(\{
			              field_1: ['error message'],
			              field_4: ['error_message'],
			            \});
			            expect(res).toMatchObject(\{
			              errorCount: 2,
			              groups: \{\},
			              testCount: 5,
			              tests: \{
			                field_1: \{
			                  errorCount: 1,
			                  errors: ['error message'],
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_2: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_3: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_4: \{
			                  errorCount: 1,
			                  errors: ['error_message'],
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_5: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			              \},
			              warnCount: 0,
			            \});
			          \})
			          .done(res => \{
			            expect(res).toMatchObject(\{
			              errorCount: 2,
			              groups: \{\},
			              testCount: 5,
			              tests: \{
			                field_1: \{
			                  errorCount: 1,
			                  errors: ['error message'],
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_2: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_3: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_4: \{
			                  errorCount: 1,
			                  errors: ['error_message'],
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			                field_5: \{
			                  errorCount: 0,
			                  testCount: 1,
			                  warnCount: 0,
			                \},
			              \},
			              warnCount: 0,
			            \});
			            done();
			          \});
			      \});
			    \});
			  \});
			
			  describe('When a different field is run while a field is pending', () => \{
			    it('Should wait running done callbacks until all tests complete', () => \{
			      const suite = vest.create(only => \{
			        vest.only(only);
			
			        vest.test('async_1', async () => \{
			          await wait(1000);
			          throw new Error();
			        \});
			
			        vest.test('sync_2', () => false);
			      \});
			
			      suite('async_1');
			
			      return new Promise<void>(done => \{
			        suite('sync_2').done(res => \{
			          expect(res.hasErrors('async_1')).toBe(true);
			          done();
			        \});
			      \});
			    \});
			  \});
			
			  describe('When suite re-runs and a pending test is now skipped', () => \{
			    it('Should immediately call the second done callback, omit the first', async () => \{
			      const done_0 = jest.fn();
			      const done_1 = jest.fn();
			
			      const suite = vest.create(username => \{
			        vest.test('username', () => \{
			          vest.enforce(username).isNotBlank();
			        \});
			
			        vest.skipWhen(suite.get().hasErrors('username'), () => \{
			          vest.test('username', async () => \{
			            await wait(1000);
			            if (username === 'ealush') \{
			              throw new Error();
			            \}
			          \});
			        \});
			      \});
			
			      suite('ealush').done(done_0);
			      await wait(0);
			      expect(done_0).not.toHaveBeenCalled();
			      suite('').done(done_1);
			      expect(done_0).not.toHaveBeenCalled();
			      expect(done_1).toHaveBeenCalled();
			      await wait(1000);
			      expect(done_0).not.toHaveBeenCalled();
			    \});
			  \});
			
			  describe('Passing a field that does not exist', () => \{
			    it('Should call the callback immedaitely', () => \{
			      const cb = jest.fn();
			
			      const suite = vest.create(() => \{
			        vest.test('test', () => \{\});
			      \});
			
			      suite().done('non-existent', cb);
			
			      expect(cb).toHaveBeenCalled();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\__tests__\\done.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\__tests__\\produce.test.ts', () => {
        const sourceCode = `
			import \{ ser \} from '../../../../../testUtils/suiteDummy';
			import \{ dummyTest \} from '../../../../../testUtils/testDummy';
			
			import * as vest from 'vest';
			
			describe('produce method Suite Result', () => \{
			  describe('Base structure', () => \{
			    it('Should match snapshot', () => \{
			      const suite = vest.create(() => \{\});
			      expect(suite()).toMatchObject(\{
			        errorCount: 0,
			        groups: \{\},
			        testCount: 0,
			        tests: \{\},
			        warnCount: 0,
			      \});
			      expect(ser(suite())).toEqual(ser(suite.get()));
			    \});
			
			    it('Its methods should reflect the correct test data', () => \{
			      const suite = vest.create(() => \{
			        dummyTest.passing('field_1');
			        dummyTest.failing('field_1', 'message');
			        dummyTest.failing('field_1', 'failure_message');
			        dummyTest.failing('field_1', 'failure_message with group', 'group_1');
			        dummyTest.failingWarning('field_2', 'warning test');
			        dummyTest.failingWarning('field_2', 'another warning test');
			        dummyTest.passing('field_2');
			        dummyTest.passing('field_3', '', 'group_1');
			        dummyTest.failing('field_3', 'msg');
			        dummyTest.passing('field_4');
			        dummyTest.passing('field_5', '', 'group_2');
			        dummyTest.failingWarning('field_5', 'warning message', 'group_2');
			      \});
			
			      const res = suite();
			
			      expect(ser(suite.get())).toEqual(ser(res));
			
			      expect(res.hasErrors()).toBe(true);
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.hasErrors('field_2')).toBe(false);
			      expect(res.hasErrors('field_3')).toBe(true);
			      expect(res.hasErrors('field_4')).toBe(false);
			      expect(res.hasErrors('field_5')).toBe(false);
			      expect(res.hasWarnings('field_1')).toBe(false);
			      expect(res.hasWarnings('field_2')).toBe(true);
			      expect(res.hasWarnings('field_3')).toBe(false);
			      expect(res.hasWarnings('field_4')).toBe(false);
			      expect(res.hasWarnings('field_5')).toBe(true);
			      expect(res.getErrors()).toEqual(\{
			        field_1: ['message', 'failure_message', 'failure_message with group'],
			        field_3: ['msg'],
			      \});
			      expect(res.getWarnings()).toEqual(\{
			        field_2: ['warning test', 'another warning test'],
			        field_5: ['warning message'],
			      \});
			      expect(res.getErrors()).toEqual(\{
			        field_1: ['message', 'failure_message', 'failure_message with group'],
			        field_3: ['msg'],
			      \});
			      expect(res.hasErrorsByGroup('group_1')).toBe(true);
			      expect(res.hasErrorsByGroup('group_1', 'field_1')).toBe(true);
			      expect(res.hasErrorsByGroup('group_2')).toBe(false);
			      expect(res.hasErrorsByGroup('group_1', 'field_2')).toBe(false);
			      expect(res.hasErrorsByGroup('group_3')).toBe(false);
			      expect(res.hasWarningsByGroup('group_1')).toBe(false);
			      expect(res.hasWarningsByGroup('group_1', 'field_1')).toBe(false);
			      expect(res.hasWarningsByGroup('group_2')).toBe(true);
			      expect(res.hasWarningsByGroup('group_1', 'field_2')).toBe(false);
			      expect(res.hasWarningsByGroup('group_2', 'field_5')).toBe(true);
			    \});
			  \});
			
			  describe('Value memoization', () => \{
			    it('When unchanged, should produce a memoized result', () => \{
			      const suite = vest.create(() => \{
			        dummyTest.passing('field_1');
			        dummyTest.failing('field_1', 'message');
			      \});
			      const res = suite();
			      expect(res).toMatchObject(suite.get());
			      expect(suite.get()).toBe(suite.get());
			    \});
			
			    it('When changed, should produce a new result object', () => \{
			      const suite = vest.create((v1, v2) => \{
			        vest.test('f1', () => \{
			          vest.enforce(v1).equals(1);
			        \});
			        vest.test('f2', () => \{
			          vest.enforce(v2).equals(2);
			        \});
			      \});
			      const res1 = suite(1, 2);
			      const res2 = suite(1, 1);
			      suite(2, 1);
			      expect(res1).not.toMatchObject(suite.get());
			      expect(res1).not.toBe(suite.get());
			      expect(res2).not.toMatchObject(suite.get());
			      expect(res2).not.toBe(suite.get());
			    \});
			  \});
			\});
			
			describe('suite.get()', () => \{
			  describe('exposed methods', () => \{
			    it('Should have all exposed methods', () => \{
			      const suite = vest.create(() => \{\});
			      expect(suite.get()).toMatchInlineSnapshot(\`
			        Object \{
			          "errorCount": 0,
			          "getErrors": [Function],
			          "getErrorsByGroup": [Function],
			          "getWarnings": [Function],
			          "getWarningsByGroup": [Function],
			          "groups": Object \{\},
			          "hasErrors": [Function],
			          "hasErrorsByGroup": [Function],
			          "hasWarnings": [Function],
			          "hasWarningsByGroup": [Function],
			          "isValid": [Function],
			          "isValidByGroup": [Function],
			          "suiteName": undefined,
			          "testCount": 0,
			          "tests": Object \{\},
			          "valid": false,
			          "warnCount": 0,
			        \}
			      \`);
			    \});
			  \});
			\});
			
			describe('suite()', () => \{
			  describe('exposed methods', () => \{
			    it('Should have all exposed methods', () => \{
			      expect(vest.create(() => \{\})()).toMatchInlineSnapshot(\`
			        Object \{
			          "done": [Function],
			          "errorCount": 0,
			          "getErrors": [Function],
			          "getErrorsByGroup": [Function],
			          "getWarnings": [Function],
			          "getWarningsByGroup": [Function],
			          "groups": Object \{\},
			          "hasErrors": [Function],
			          "hasErrorsByGroup": [Function],
			          "hasWarnings": [Function],
			          "hasWarningsByGroup": [Function],
			          "isValid": [Function],
			          "isValidByGroup": [Function],
			          "suiteName": undefined,
			          "testCount": 0,
			          "tests": Object \{\},
			          "valid": false,
			          "warnCount": 0,
			        \}
			      \`);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\produce\\__tests__\\produce.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\__tests__\\create.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			import \{ noop \} from 'lodash';
			
			import \{ dummyTest \} from '../../../../testUtils/testDummy';
			
			import create from 'create';
			
			describe('Test createSuite module', () => \{
			  describe('Test suite Arguments', () => \{
			    it('allows omitting suite name', () => \{
			      expect(typeof create(jest.fn())).toBe('function');
			      expect(typeof create(jest.fn()).get).toBe('function');
			      expect(typeof create(jest.fn()).reset).toBe('function');
			      expect(typeof create(jest.fn()).remove).toBe('function');
			      expect(create(jest.fn()).get()).toMatchSnapshot();
			    \});
			
			    it.each([faker.random.word(), null, undefined, 0, 1, true, false, NaN, ''])(
			      'Throws an error when \`tests\` callback is not a function',
			      value => \{
			        expect(() => create(value)).toThrow(
			          'vest.create: Expected callback to be a function.'
			        );
			      \}
			    );
			
			    describe('When suite name is provided', () => \{
			      it('Should add suite name to suite result', () => \{
			        const res = create('form_name', () => \{\})();
			
			        expect(res.suiteName).toBe('form_name');
			      \});
			    \});
			  \});
			
			  describe('Return value', () => \{
			    it('should be a function', () => \{
			      expect(typeof create(noop)).toBe('function');
			    \});
			  \});
			
			  describe('When returned function is invoked', () => \{
			    it('Calls \`tests\` argument', () =>
			      new Promise<void>(done => \{
			        const validate = create(() => \{
			          done();
			        \});
			        validate();
			      \}));
			
			    it('Passes all arguments over to tests callback', () => \{
			      const testsCallback = jest.fn();
			      const params = [
			        1,
			        2,
			        3,
			        \{ [faker.random.word()]: [1, 2, 3] \},
			        false,
			        [faker.random.word()],
			      ];
			      const validate = create(testsCallback);
			      validate(...params);
			      expect(testsCallback).toHaveBeenCalledWith(...params);
			    \});
			  \});
			
			  describe('Initial run', () => \{
			    const testsCb = jest.fn();
			    const genValidate = () => create(testsCb);
			
			    it('Should initialize with an empty result object', () => \{
			      const validate = genValidate();
			      expect(Object.keys(validate.get().tests)).toHaveLength(0);
			      expect(Object.keys(validate.get().groups)).toHaveLength(0);
			
			      expect(validate.get().errorCount).toBe(0);
			      expect(validate.get().warnCount).toBe(0);
			      expect(validate.get().testCount).toBe(0);
			
			      expect(validate.get()).toMatchSnapshot();
			    \});
			
			    it('Should be able to get the suite from the result of createSuite', () => \{
			      const testsCb = jest.fn();
			      expect(create(testsCb).get()).toMatchSnapshot();
			    \});
			
			    it('Should be able to reset the suite from the result of createSuite', () => \{
			      const testSuite = create(() => \{
			        dummyTest.failing('f1', 'm1');
			      \});
			      testSuite();
			      expect(testSuite.get().hasErrors()).toBe(true);
			      expect(testSuite.get().testCount).toBe(1);
			      testSuite.reset();
			      expect(testSuite.get().hasErrors()).toBe(false);
			      expect(testSuite.get().testCount).toBe(0);
			    \});
			
			    it('Should return without calling tests callback', () => \{
			      const validate = create(testsCb);
			      expect(testsCb).not.toHaveBeenCalled();
			      validate();
			      expect(testsCb).toHaveBeenCalled();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\__tests__\\create.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\__tests__\\hasRemainingTests.test.ts', () => {
        const sourceCode = `
			import wait from 'wait';
			
			import hasRemainingTests from 'hasRemainingTests';
			import * as vest from 'vest';
			
			describe('hasRemainingTests', () => \{
			  let hasRemaining = null;
			  let count = 0;
			
			  beforeEach(() => \{
			    hasRemaining = null;
			    count = 0;
			  \});
			  describe('When no field specified', () => \{
			    describe('When no remaining tests', () => \{
			      it('should return false', () => \{
			        vest.create(() => \{
			          hasRemaining = hasRemainingTests();
			        \})();
			        expect(hasRemaining).toBe(false);
			      \});
			    \});
			
			    describe('When there are remaining tests', () => \{
			      it('pending tests return true', () => \{
			        vest.create(() => \{
			          vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          hasRemaining = hasRemainingTests();
			        \})();
			
			        expect(hasRemaining).toBe(true);
			      \});
			
			      it('lagging tests return true', () => \{
			        const suite = vest.create(() => \{
			          if (count) vest.skip('f1');
			          vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          count++;
			          hasRemaining = hasRemainingTests();
			        \});
			        suite();
			        suite();
			
			        expect(hasRemaining).toBe(true);
			      \});
			
			      it('lagging and pending tests return true', () => \{
			        const suite = vest.create(() => \{
			          if (count) vest.skip('f1');
			          vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          vest.test('f2', async () => \{
			            await wait(100);
			          \});
			          count++;
			          hasRemaining = hasRemainingTests();
			        \});
			
			        suite();
			        suite();
			
			        expect(hasRemaining).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('When field specified', () => \{
			    describe('When no remaining tests', () => \{
			      it('Should return false', () => \{
			        vest.create(() => \{
			          hasRemaining = hasRemainingTests('f1');
			        \})();
			        expect(hasRemaining).toBe(false);
			      \});
			    \});
			
			    describe('When remaining tests', () => \{
			      it('pending tests return true', () => \{
			        vest.create(() => \{
			          vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          hasRemaining = hasRemainingTests('f1');
			        \})();
			        expect(hasRemaining).toBe(true);
			      \});
			
			      it('lagging tests return true', () => \{
			        const suite = vest.create(() => \{
			          if (count) vest.skip('f1');
			          vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          count++;
			          hasRemaining = hasRemainingTests('f1');
			        \});
			        suite();
			        suite();
			
			        expect(hasRemaining).toBe(true);
			      \});
			
			      it('lagging and pending tests return true', () => \{
			        const suite = vest.create(() => \{
			          if (count) vest.skip('f1');
			          vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          vest.test('f2', async () => \{
			            await wait(100);
			          \});
			          count++;
			          hasRemaining = hasRemainingTests('f1') && hasRemainingTests('f2');
			        \});
			
			        suite();
			        suite();
			
			        expect(hasRemaining).toBe(true);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\__tests__\\hasRemainingTests.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\__tests__\\remove.test.ts', () => {
        const sourceCode = `
			import wait from 'wait';
			
			import \{ dummyTest \} from '../../../../testUtils/testDummy';
			
			import * as vest from 'vest';
			
			describe('suite.remove', () => \{
			  it('Should remove field from validation result', async () => \{
			    const suite = vest.create(() => \{
			      dummyTest.failing('field1');
			      dummyTest.failing('field1');
			      dummyTest.failingAsync('field1', \{ time: 100 \});
			      dummyTest.failing('field2');
			      dummyTest.passing('field2');
			      dummyTest.passing('field1');
			    \});
			    suite();
			    expect(suite.get().testCount).toBe(6);
			    expect(suite.get().tests.field1.testCount).toBe(4);
			    expect(suite.get().tests.field2.testCount).toBe(2);
			    suite.remove('field1');
			    expect(suite.get().testCount).toBe(2);
			    expect(suite.get().tests.field1).toBeUndefined();
			    await wait(150);
			    expect(suite.get().testCount).toBe(2);
			    expect(suite.get().tests.field1).toBeUndefined();
			  \});
			
			  it('Should clear the cache when removing a field', () => \{
			    const suite = vest.create(() => \{
			      dummyTest.failing('field1');
			      dummyTest.failing('field2');
			    \});
			    suite();
			    const res = suite.get();
			    suite.remove('field2');
			    expect(suite.get()).not.toBe(res);
			  \});
			
			  it('Should return silently when removing a field that does not exist', () => \{
			    const suite = vest.create(() => \{
			      dummyTest.failing('field1');
			      dummyTest.passing('field2');
			    \});
			    suite();
			    const res = suite.get();
			    suite.remove('field3');
			    expect(suite.get()).toBe(res);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\__tests__\\remove.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\suite\\__tests__\\resetField.test.ts', () => {
        const sourceCode = `
			import \{ create, test \} from 'vest';
			
			describe('suite.resetField', () => \{
			  let suite;
			
			  beforeEach(() => \{
			    suite = create(() => \{
			      test('field1', 'f1 error', () => false);
			      test('field2', 'f2 error', () => false);
			    \});
			    suite();
			  \});
			
			  it('Should reset the validity state of a field', () => \{
			    expect(suite.get().hasErrors('field1')).toBe(true);
			    expect(suite.get().hasErrors('field2')).toBe(true);
			    expect(suite.get().getErrors('field1')).toEqual(['f1 error']);
			    expect(suite.get().getErrors('field2')).toEqual(['f2 error']);
			    suite.resetField('field1');
			    expect(suite.get().hasErrors('field1')).toBe(false);
			    expect(suite.get().hasErrors('field2')).toBe(true);
			    expect(suite.get().getErrors('field1')).toEqual([]);
			    expect(suite.get().getErrors('field2')).toEqual(['f2 error']);
			    suite.resetField('field2');
			    expect(suite.get().hasErrors('field1')).toBe(false);
			    expect(suite.get().hasErrors('field2')).toBe(false);
			    expect(suite.get().getErrors('field1')).toEqual([]);
			    expect(suite.get().getErrors('field2')).toEqual([]);
			  \});
			
			  it('Should refresh the suite result', () => \{
			    const res = suite.get();
			    expect(res).toBe(suite.get());
			    suite.resetField('field1');
			    expect(res).not.toBe(suite.get());
			  \});
			
			  it('Should allow the field to keep updating (no final status)', () => \{
			    suite.resetField('field1');
			    expect(suite.get().hasErrors('field1')).toBe(false);
			    expect(suite.get().hasErrors('field2')).toBe(true);
			    suite();
			    expect(suite.get().hasErrors('field1')).toBe(true);
			    expect(suite.get().hasErrors('field2')).toBe(true);
			  \});
			
			  it('sanity', () => \{
			    expect(suite.get().tests).toMatchInlineSnapshot(\`
			      Object \{
			        "field1": Object \{
			          "errorCount": 1,
			          "errors": Array [
			            "f1 error",
			          ],
			          "testCount": 1,
			          "valid": false,
			          "warnCount": 0,
			          "warnings": Array [],
			        \},
			        "field2": Object \{
			          "errorCount": 1,
			          "errors": Array [
			            "f2 error",
			          ],
			          "testCount": 1,
			          "valid": false,
			          "warnCount": 0,
			          "warnings": Array [],
			        \},
			      \}
			    \`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\suite\\__tests__\\resetField.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\test\\test.memo.ts', () => {
        const sourceCode = `
			/* eslint-disable jest/valid-title */
			import \{ cache as createCache, isNull \} from 'vest-utils';
			
			import VestTest, \{ TestFn \} from 'VestTest';
			import \{ useCursor \} from 'isolateHooks';
			import registerPrevRunTest from 'registerPrevRunTest';
			import \{ useSuiteId \} from 'stateHooks';
			import type \{ TestBase \} from 'test';
			
			export default function testMemo(test: TestBase): TestMemo \{
			  const cache = createCache<VestTest>(10); // arbitrary cache size
			
			  /**
			   * Caches a test result based on the test's dependencies.
			   */
			  function memo(fieldName: string, ...args: ParametersWithoutMessage): VestTest;
			  function memo(fieldName: string, ...args: ParametersWithMessage): VestTest;
			  function memo(fieldName: string, ...args: ParamsOverload): VestTest \{
			    const cursorAt = useCursor().current();
			
			    const [deps, testFn, msg] = args.reverse() as [any[], TestFn, string];
			
			    // Implicit dependency for more specificity
			    const dependencies = [useSuiteId(), fieldName, cursorAt].concat(deps);
			
			    const cached = cache.get(dependencies);
			
			    if (isNull(cached)) \{
			      // cache miss
			      return cache(dependencies, () => test(fieldName, msg, testFn));
			    \}
			
			    if (cached[1].isCanceled()) \{
			      // cache hit, but test is canceled
			      cache.invalidate(dependencies);
			      return cache(dependencies, () => test(fieldName, msg, testFn));
			    \}
			
			    return registerPrevRunTest(cached[1]);
			  \}
			
			  return memo;
			\}
			
			type TestMemo = \{
			  (fieldName: string, ...args: ParametersWithoutMessage): VestTest;
			  (fieldName: string, ...args: ParametersWithMessage): VestTest;
			\};
			
			type ParametersWithoutMessage = [test: TestFn, dependencies: unknown[]];
			type ParametersWithMessage = [
			  message: string,
			  test: TestFn,
			  dependencies: unknown[]
			];
			
			type ParamsOverload = ParametersWithoutMessage | ParametersWithMessage;
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\test\\test.memo.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\key.test.ts', () => {
        const sourceCode = `
			import mockThrowError from '../../../../testUtils/mockThrowError';
			
			import * as vest from 'vest';
			import \{ create, test, skipWhen \} from 'vest';
			
			describe('key', () => \{
			  describe('When key is provided', () => \{
			    describe('When tests change their order between runs', () => \{
			      it('Should retain test results', () => \{
			        let count = 0;
			        const suite = create(() => \{
			          /**
			           * This test is pretty confusing, but its the most effective way to test this behavior.
			           *
			           * It basically checks that when provided, key is used to override default test order behavior.
			           * We don't mind the order of tests, because the key tells us which test really needs to get which state.
			           *
			           * The reason we have both skipWhen and and if block is this:
			           * if/else: to simulate reordering between runs
			           * skipWhen: to prevent running the tests so they have to get the previous state
			           */
			
			          skipWhen(count === 1, () => \{
			            if (count === 0) \{
			              test('field_1', () => false, 'field_1_key_1');
			              test('field_1', () => undefined, 'field_1_key_2');
			              test('field_2', () => false, 'field_2_key_1');
			              test('field_2', () => undefined, 'field_2_key_2');
			            \} else \{
			              test('field_2', () => undefined, 'field_2_key_2');
			              test('field_2', () => false, 'field_2_key_1');
			              test('field_1', () => undefined, 'field_1_key_2');
			              test('field_1', () => false, 'field_1_key_1');
			            \}
			          \});
			          count++;
			        \});
			
			        const res1 = suite();
			        const res2 = suite();
			
			        expect(res1.tests).toEqual(res2.tests);
			      \});
			    \});
			
			    describe('When two tests in two different isolates have the same key', () => \{
			      it('Should regarad each key as unique and retain each tests individual result', () => \{
			        const calls = [];
			        const suite = create(() => \{
			          const currentCall = [];
			
			          skipWhen(calls.length === 1, () => \{
			            vest.group('group_1', () => \{
			              currentCall.push(test('field1', () => false, 'key_1'));
			            \});
			
			            vest.group('group_2', () => \{
			              currentCall.push(test('field2', () => false, 'key_1'));
			            \});
			          \});
			
			          calls.push(currentCall);
			        \});
			
			        const res1 = suite();
			        const res2 = suite();
			
			        expect(calls[0][0]).toBe(calls[1][0]);
			        expect(calls[0][1]).toBe(calls[1][1]);
			        expect(calls[0][0]).not.toBe(calls[0][1]);
			        expect(calls[1][0]).not.toBe(calls[1][1]);
			        expect(res1.tests).toEqual(res2.tests);
			      \});
			    \});
			
			    describe('When tests without a key reorder get added above a test with a key', () => \{
			      let vest;
			      beforeEach(() => \{
			        vest = mockThrowError().vest;
			      \});
			      afterEach(() => \{
			        jest.resetModules();
			        jest.resetAllMocks();
			      \});
			      it('Should retain keyd tests', () => \{
			        const calls = [];
			        const suite = vest.create(() => \{
			          const currentCall = [];
			          vest.skipWhen(calls.length === 1, () => \{
			            if (calls.length === 1) \{
			              vest.test('reordered', () => false);
			            \}
			
			            currentCall.push(vest.test('field1', () => false, 'key_1'));
			            currentCall.push(vest.test('field2', () => false, 'key_2'));
			            currentCall.push(vest.test('field3', () => false, 'key_3'));
			
			            if (calls.length === 0) \{
			              vest.test('reordered', () => false);
			            \}
			          \});
			          calls.push(currentCall);
			        \});
			
			        const res1 = suite();
			        const res2 = suite();
			
			        expect(calls[0][0]).toBe(calls[1][0]);
			        expect(calls[0][1]).toBe(calls[1][1]);
			        expect(calls[0][2]).toBe(calls[1][2]);
			        expect(res1.tests.reordered).toEqual(\{
			          errorCount: 1,
			          errors: [],
			          testCount: 1,
			          valid: false,
			          warnCount: 0,
			          warnings: [],
			        \});
			        expect(res2.tests.reordered).toEqual(\{
			          errorCount: 0,
			          errors: [],
			          testCount: 0,
			          valid: false,
			          warnCount: 0,
			          warnings: [],
			        \});
			        expect(res1.tests).not.toEqual(res2.tests);
			        expect(res2.tests).toMatchInlineSnapshot(\`
			          Object \{
			            "field1": Object \{
			              "errorCount": 1,
			              "errors": Array [],
			              "testCount": 1,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			            "field2": Object \{
			              "errorCount": 1,
			              "errors": Array [],
			              "testCount": 1,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			            "field3": Object \{
			              "errorCount": 1,
			              "errors": Array [],
			              "testCount": 1,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			            "reordered": Object \{
			              "errorCount": 0,
			              "errors": Array [],
			              "testCount": 0,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			          \}
			        \`);
			      \});
			    \});
			
			    describe('When the same key is encountered twice', () => \{
			      let deferThrow, vest;
			      beforeEach(() => \{
			        const mock = mockThrowError();
			
			        deferThrow = mock.deferThrow;
			        vest = mock.vest;
			      \});
			
			      afterEach(() => \{
			        jest.resetAllMocks();
			        jest.resetModules();
			      \});
			
			      it('Should throw a deferred error', () => \{
			        const suite = vest.create(() => \{
			          vest.test('field1', () => false, 'key_1');
			          vest.test('field2', () => false, 'key_1');
			        \});
			        suite();
			        expect(deferThrow).toHaveBeenCalledWith(
			          \`Encountered the same test key "key_1" twice. This may lead to tests overriding each other's results, or to tests being unexpectedly omitted.\`
			        );
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\key.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\memo.test.ts', () => {
        const sourceCode = `
			import wait from 'wait';
			
			import promisify from 'promisify';
			import * as vest from 'vest';
			import \{ test as vestTest, enforce \} from 'vest';
			
			describe('test.memo', () => \{
			  describe('cache hit', () => \{
			    it('Should return without calling callback', () => \{
			      const cb1 = jest.fn();
			      const cb2 = jest.fn(() => new Promise<void>(() => undefined));
			      const suite = vest.create(() => \{
			        vestTest.memo('f1', cb1, [1]);
			        vestTest.memo('f1', cb2, [2]);
			      \});
			
			      suite();
			      expect(cb1).toHaveBeenCalledTimes(1);
			      expect(cb2).toHaveBeenCalledTimes(1);
			      suite();
			      expect(cb1).toHaveBeenCalledTimes(1);
			      expect(cb2).toHaveBeenCalledTimes(1);
			    \});
			
			    it('Should produce correct initial result', () => \{
			      const res = vest.create(() => \{
			        vestTest.memo('field1', 'msg1', () => false, [\{\}]);
			        vestTest.memo('field1', 'msg2', () => undefined, [\{\}]);
			        vestTest.memo('field2', () => undefined, [\{\}]);
			        vestTest.memo(
			          'field3',
			          () => \{
			            vest.warn();
			            return false;
			          \},
			          [\{\}]
			        );
			      \})();
			
			      expect(res.hasErrors('field1')).toBe(true);
			      expect(res.hasErrors('field2')).toBe(false);
			      expect(res.hasWarnings('field3')).toBe(true);
			      expect(res).toMatchSnapshot();
			    \});
			    describe('sync', () => \{
			      it('Should restore previous result on re-run', () => \{
			        const suite = vest.create(() => \{
			          vestTest.memo('field1', 'msg1', () => false, [1]);
			          vestTest.memo('field1', 'msg2', () => undefined, [2]);
			          vestTest.memo('field2', () => undefined, [3]);
			          vestTest.memo(
			            'field3',
			            () => \{
			              vest.warn();
			              return false;
			            \},
			            [4]
			          );
			        \});
			
			        const res = suite();
			
			        expect(res.hasErrors('field1')).toBe(true);
			        expect(res.hasErrors('field2')).toBe(false);
			        expect(res.hasWarnings('field3')).toBe(true);
			        expect(res).toMatchSnapshot();
			
			        const res2 = suite();
			        expect(res2.hasErrors('field1')).toBe(true);
			        expect(res2.hasErrors('field2')).toBe(false);
			        expect(res2.hasWarnings('field3')).toBe(true);
			        expect(res).isDeepCopyOf(res2);
			      \});
			    \});
			
			    describe('async', () => \{
			      it('Should immediately return previous result on re-run', async () => \{
			        \{
			          const suite = vest.create(() => \{
			            vestTest.memo(
			              'field1',
			              async () => \{
			                await wait(500);
			                enforce(1).equals(2);
			              \},
			              [1]
			            );
			            vestTest.memo(
			              'field2',
			              async () => \{
			                await wait(500);
			                enforce(1).equals(2);
			              \},
			              [2]
			            );
			          \});
			
			          const asyncSuite = promisify(suite);
			
			          let start = Date.now();
			          const res1 = await asyncSuite();
			          enforce(Date.now() - start).gte(500);
			
			          start = Date.now();
			          const res2 = suite();
			
			          expect(res1).isDeepCopyOf(res2);
			        \}
			      \});
			    \});
			
			    describe('Test is canceled', () => \{
			      it('Should refresh', async () => \{
			        let count = 0;
			        const tests = [];
			        const suite = vest.create(() => \{
			          count++;
			
			          tests.push(
			            vestTest.memo(
			              'f1',
			              async () => \{
			                await wait(10);
			              \},
			              [true]
			            )
			          );
			
			          if (count === 1) \{
			            tests[0].cancel();
			          \}
			        \});
			
			        suite();
			        suite();
			        suite();
			
			        expect(tests[0]).not.toBe(tests[1]);
			        expect(tests[1]).toBe(tests[2]);
			      \});
			    \});
			  \});
			
			  describe('cache miss', () => \{
			    it('Should run test normally', () => \{
			      const cb1 = jest.fn(res => res);
			      const cb2 = jest.fn(
			        res => new Promise<void>((resolve, rej) => (res ? resolve() : rej()))
			      );
			      const suite = vest.create((key, res) => \{
			        vestTest.memo('f1', () => cb1(res), [1, key]);
			        vestTest.memo('f2', () => cb2(res), [2, key]);
			      \});
			
			      expect(cb1).toHaveBeenCalledTimes(0);
			      expect(cb2).toHaveBeenCalledTimes(0);
			      suite('a', false);
			      expect(cb1).toHaveBeenCalledTimes(1);
			      expect(cb2).toHaveBeenCalledTimes(1);
			      expect(suite.get().hasErrors()).toBe(true);
			      suite('b', true);
			      expect(cb1).toHaveBeenCalledTimes(2);
			      expect(cb2).toHaveBeenCalledTimes(2);
			      expect(suite.get().hasErrors()).toBe(false);
			    \});
			  \});
			
			  describe('Collision detection', () => \{
			    describe('cross-field collision', () => \{
			      it('Should factor in field name', () => \{
			        const suite = vest.create(() => \{
			          vestTest.memo('f1', () => false, [1]);
			          vestTest.memo('f2', () => true, [1]);
			        \});
			
			        suite();
			        suite();
			        expect(suite.get().hasErrors('f1')).toBe(true);
			        expect(suite.get().hasErrors('f2')).toBe(false);
			      \});
			    \});
			
			    describe('same-field-same-suite collision', () => \{
			      it('Should factor in execution order', () => \{
			        const suite = vest.create(() => \{
			          vestTest.memo('f1', () => false, [1]);
			          vestTest.memo('f1', () => true, [1]);
			        \});
			
			        suite();
			        suite();
			        expect(suite.get().hasErrors('f1')).toBe(true);
			        expect(suite.get().errorCount).toBe(1);
			      \});
			    \});
			    describe('cross-suite collision', () => \{
			      it('Should factor in field name', () => \{
			        const suite1 = vest.create(() => \{
			          vestTest.memo('f1', () => false, [1]);
			          vestTest.memo('f2', () => true, [1]);
			        \});
			        const suite2 = vest.create(() => \{
			          vestTest.memo('f1', () => true, [1]);
			          vestTest.memo('f2', () => false, [1]);
			        \});
			
			        suite1();
			        suite2();
			        expect(suite1.get().hasErrors('f1')).toBe(true);
			        expect(suite1.get().hasErrors('f2')).toBe(false);
			        expect(suite2.get().hasErrors('f1')).toBe(false);
			        expect(suite2.get().hasErrors('f2')).toBe(true);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\memo.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\merging_of_previous_test_runs.test.ts', () => {
        const sourceCode = `
			import mockThrowError from '../../../../testUtils/mockThrowError';
			import \{ dummyTest \} from '../../../../testUtils/testDummy';
			
			import \{ create, skipWhen \} from 'vest';
			
			describe('Merging of previous test runs', () => \{
			  let suite;
			  let counter = 0;
			  let testContainer = [];
			
			  beforeEach(() => \{
			    counter = 0;
			    testContainer = [];
			  \});
			  describe('When test skipped in subsequent run', () => \{
			    it('Should merge its result from previous runs', () => \{
			      suite = create(() => \{
			        skipWhen(counter === 1, () => \{
			          testContainer.push([
			            dummyTest.failing('f1'),
			            dummyTest.failing('f2'),
			            dummyTest.passing('f3'),
			            dummyTest.failingWarning('f5'),
			            dummyTest.passingWarning('f6'),
			          ]);
			        \});
			        counter++;
			      \});
			
			      const resA = suite();
			      const resB = suite();
			
			      const [testsA, testsB] = testContainer;
			
			      // This checks the the suite result is the same for both runs
			      expect(resA).isDeepCopyOf(resB);
			
			      // This checks that the test objects are the same for both runs
			      expect(testsA).toEqual(testsB);
			    \});
			  \});
			
			  describe('When test changes in subsequent run', () => \{
			    it('Should update the result accordingly', () => \{
			      suite = create(() => \{
			        testContainer.push(
			          counter === 0 ? dummyTest.passing('f1') : dummyTest.failing('f1')
			        );
			
			        dummyTest.failing('f2');
			        counter++;
			      \});
			
			      const resA = suite();
			
			      // Checking that the result is correct
			      expect(resA.isValid('f1')).toBe(true);
			      expect(resA.isValid('f2')).toBe(false);
			      const resB = suite();
			      // Checking that the result is correct
			      expect(resB.isValid('f1')).toBe(false);
			      expect(resA.isValid('f2')).toBe(false);
			
			      const [f1A, f1B] = testContainer;
			
			      // Checking that the result updated
			      expect(resA).not.isDeepCopyOf(resB);
			
			      // Checking that the test updated
			      expect(f1A).not.toBe(f1B);
			    \});
			  \});
			
			  describe('When tests are passed in a different order between runs', () => \{
			    let deferThrow, vest;
			    beforeEach(() => \{
			      const mock = mockThrowError();
			      deferThrow = mock.deferThrow;
			      vest = mock.vest;
			    \});
			
			    afterAll(() => \{
			      jest.resetAllMocks();
			    \});
			
			    it('Should defer-throw an error', () => \{
			      const \{ create, test \} = vest;
			      suite = create(() => \{
			        testContainer.push(
			          counter === 0 ? test('f1', jest.fn()) : test('f2', () => false)
			        );
			        counter++;
			      \});
			
			      suite();
			      expect(deferThrow).not.toHaveBeenCalled();
			
			      suite();
			
			      expect(deferThrow).toHaveBeenCalledWith(
			        expect.stringContaining(
			          'Vest Critical Error: Tests called in different order than previous run.'
			        )
			      );
			    \});
			
			    describe('When test is omitted in subsequent run', () => \{
			      it('Should omit the test from the results', () => \{
			        const \{ create, test \} = vest;
			        suite = create(() => \{
			          test('f1', () => false);
			          if (counter === 0) \{
			            test('f2', () => false);
			          \}
			          test('f3', () => false);
			          counter++;
			        \});
			
			        const resA = suite();
			        expect(resA.tests.f2).toBeDefined();
			        expect(resA.hasErrors('f1')).toBe(true);
			        expect(resA.hasErrors('f2')).toBe(true);
			        expect(resA.hasErrors('f3')).toBe(true);
			        expect(resA.tests).toMatchInlineSnapshot(\`
			          Object \{
			            "f1": Object \{
			              "errorCount": 1,
			              "errors": Array [],
			              "testCount": 1,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			            "f2": Object \{
			              "errorCount": 1,
			              "errors": Array [],
			              "testCount": 1,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			            "f3": Object \{
			              "errorCount": 1,
			              "errors": Array [],
			              "testCount": 1,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			          \}
			        \`);
			
			        const resB = suite();
			        expect(resB.tests.f2).toBeUndefined();
			        expect(resB.hasErrors('f1')).toBe(true);
			        expect(resB.hasErrors('f2')).toBe(false);
			        expect(resB.hasErrors('f3')).toBe(true);
			        expect(resB.tests).toMatchInlineSnapshot(\`
			          Object \{
			            "f1": Object \{
			              "errorCount": 1,
			              "errors": Array [],
			              "testCount": 1,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			            "f3": Object \{
			              "errorCount": 1,
			              "errors": Array [],
			              "testCount": 1,
			              "valid": false,
			              "warnCount": 0,
			              "warnings": Array [],
			            \},
			          \}
			        \`);
			      \});
			
			      describe('When multiple tests are omitted between a test', () => \{
			        it('Should omit the tests from the results', () => \{
			          const \{ create, test \} = vest;
			          suite = create(() => \{
			            test('f1', () => false);
			            if (counter === 0) \{
			              test('f2', () => false);
			              test('f3', () => false);
			            \}
			            test('f4', () => false);
			            if (counter === 0) \{
			              test('f5', () => false);
			              test('f6', () => false);
			              test('f7', () => false);
			            \}
			            test('f4', () => false);
			            counter++;
			          \});
			
			          const resA = suite();
			          expect(resA.tests.f2).toBeDefined();
			          expect(resA.tests.f3).toBeDefined();
			          expect(resA.tests.f5).toBeDefined();
			          expect(resA.tests.f6).toBeDefined();
			          expect(resA.tests.f7).toBeDefined();
			          expect(resA.hasErrors('f1')).toBe(true);
			          expect(resA.hasErrors('f2')).toBe(true);
			          expect(resA.hasErrors('f3')).toBe(true);
			          expect(resA.hasErrors('f4')).toBe(true);
			          expect(resA.hasErrors('f5')).toBe(true);
			          expect(resA.hasErrors('f6')).toBe(true);
			          expect(resA.hasErrors('f7')).toBe(true);
			          expect(resA.tests).toMatchInlineSnapshot(\`
			            Object \{
			              "f1": Object \{
			                "errorCount": 1,
			                "errors": Array [],
			                "testCount": 1,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			              "f2": Object \{
			                "errorCount": 1,
			                "errors": Array [],
			                "testCount": 1,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			              "f3": Object \{
			                "errorCount": 1,
			                "errors": Array [],
			                "testCount": 1,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			              "f4": Object \{
			                "errorCount": 2,
			                "errors": Array [],
			                "testCount": 2,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			              "f5": Object \{
			                "errorCount": 1,
			                "errors": Array [],
			                "testCount": 1,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			              "f6": Object \{
			                "errorCount": 1,
			                "errors": Array [],
			                "testCount": 1,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			              "f7": Object \{
			                "errorCount": 1,
			                "errors": Array [],
			                "testCount": 1,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			            \}
			          \`);
			          const resB = suite();
			          expect(resB.tests.f2).toBeUndefined();
			          expect(resB.tests.f3).toBeUndefined();
			          expect(resB.tests.f5).toBeUndefined();
			          expect(resB.tests.f6).toBeUndefined();
			          expect(resB.tests.f7).toBeUndefined();
			          expect(resB.hasErrors('f1')).toBe(true);
			          expect(resB.hasErrors('f2')).toBe(false);
			          expect(resB.hasErrors('f3')).toBe(false);
			          expect(resB.hasErrors('f4')).toBe(true);
			          expect(resB.hasErrors('f5')).toBe(false);
			          expect(resB.hasErrors('f6')).toBe(false);
			          expect(resB.hasErrors('f7')).toBe(false);
			          expect(resB.tests).toMatchInlineSnapshot(\`
			            Object \{
			              "f1": Object \{
			                "errorCount": 1,
			                "errors": Array [],
			                "testCount": 1,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			              "f4": Object \{
			                "errorCount": 2,
			                "errors": Array [],
			                "testCount": 2,
			                "valid": false,
			                "warnCount": 0,
			                "warnings": Array [],
			              \},
			            \}
			          \`);
			        \});
			      \});
			
			      describe('When tests are added inbetween tests', () => \{
			        it('Should remove next tests in line', () => \{
			          const \{ create, test, skipWhen \} = vest;
			
			          const suite = create(() => \{
			            test('f1', () => false);
			            if (counter === 1) \{
			              test('f2', () => false);
			              test('f3', () => false);
			            \}
			
			            skipWhen(
			              () => counter === 1,
			              () => \{
			                test('f4', () => false);
			                test('f5', () => false);
			              \}
			            );
			            counter++;
			          \});
			
			          const resA = suite();
			          expect(resA.hasErrors('f4')).toBe(true);
			          expect(resA.hasErrors('f5')).toBe(true);
			
			          // This is testing that fact that the next test in line after f2 and f3
			          // got removed. We can see it because in normal situation, the test result is
			          // merged into the next test result.
			          const resB = suite();
			          expect(resB.hasErrors('f4')).toBe(false);
			          expect(resB.hasErrors('f5')).toBe(false);
			        \});
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\merging_of_previous_test_runs.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(24)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\runAsyncTest.test.ts', () => {
        const sourceCode = `
			import _ from 'lodash';
			
			import runCreateRef from '../../../../testUtils/runCreateRef';
			import \{ addTestObject \} from '../../../../testUtils/testObjects';
			
			import VestTest from 'VestTest';
			import context from 'ctx';
			import runAsyncTest from 'runAsyncTest';
			import \{ useTestCallbacks \} from 'stateHooks';
			import \{ initBus \} from 'vestBus';
			
			const message = 'some message string';
			
			const CASE_PASSING = 'passing';
			const CASE_FAILING = 'failing';
			
			let stateRef;
			
			describe.each([CASE_PASSING, CASE_FAILING])('runAsyncTest: %s', testCase => \{
			  let testObject, fieldName, bus;
			
			  beforeEach(() => \{
			    bus = initBus();
			  \});
			
			  const runRunAsyncTest = (testObject: VestTest) =>
			    context.run(
			      \{
			        stateRef,
			        bus,
			      \},
			      () => runAsyncTest(testObject)
			    );
			
			  beforeEach(() => \{
			    fieldName = 'field_1';
			    stateRef = runCreateRef();
			    context.run(\{ stateRef \}, () => \{
			      const [, setTestCallbacks] = useTestCallbacks();
			      setTestCallbacks(state => \{
			        state.fieldCallbacks = \{
			          ...state.fieldCallbacks,
			          [fieldName]: state.fieldCallbacks[fieldName] || [],
			        \};
			
			        return state;
			      \});
			    \});
			    testObject = new VestTest(fieldName, jest.fn(), \{
			      message,
			    \});
			    testObject.asyncTest =
			      testCase === CASE_PASSING ? Promise.resolve() : Promise.reject();
			    context.run(\{ stateRef \}, () => \{
			      testObject.setPending();
			    \});
			  \});
			
			  describe('State updates', () => \{
			    it('Should remove pending status from test object', () =>
			      new Promise<void>(done => \{
			        expect(testObject.status).toBe('PENDING');
			        runRunAsyncTest(testObject);
			        setTimeout(
			          context.bind(\{ stateRef \}, () => \{
			            expect(testObject.status).not.toBe('PENDING');
			            done();
			          \})
			        );
			      \}));
			  \});
			
			  describe('doneCallbacks', () => \{
			    let fieldCallback_1, fieldCallback_2, doneCallback;
			    beforeEach(() => \{
			      fieldCallback_1 = jest.fn();
			      fieldCallback_2 = jest.fn();
			      doneCallback = jest.fn();
			
			      context.run(\{ stateRef \}, () => \{
			        const [, setTestCallbacks] = useTestCallbacks();
			
			        setTestCallbacks(state => (\{
			          fieldCallbacks: \{
			            ...state.fieldCallbacks,
			            [fieldName]: (state.fieldCallbacks[fieldName] || []).concat(
			              fieldCallback_1,
			              fieldCallback_2
			            ),
			          \},
			          doneCallbacks: state.doneCallbacks.concat(doneCallback),
			        \}));
			      \});
			    \});
			    describe('When no remaining tests', () => \{
			      it('Should run all callbacks', () =>
			        new Promise<void>(done => \{
			          expect(fieldCallback_1).not.toHaveBeenCalled();
			          expect(fieldCallback_2).not.toHaveBeenCalled();
			          expect(doneCallback).not.toHaveBeenCalled();
			          runRunAsyncTest(testObject);
			          setTimeout(() => \{
			            expect(fieldCallback_1).toHaveBeenCalled();
			            expect(fieldCallback_2).toHaveBeenCalled();
			            expect(doneCallback).toHaveBeenCalled();
			            done();
			          \});
			        \}));
			    \});
			
			    describe('When there are more tests left', () => \{
			      beforeEach(() => \{
			        context.run(\{ stateRef \}, () => \{
			          const pendingTest = new VestTest('pending_field', jest.fn(), \{
			            message,
			          \});
			          addTestObject(pendingTest);
			          pendingTest.setPending();
			        \});
			      \});
			
			      it("Should only run current field's callbacks", () =>
			        new Promise<void>(done => \{
			          expect(fieldCallback_1).not.toHaveBeenCalled();
			          expect(fieldCallback_2).not.toHaveBeenCalled();
			          expect(doneCallback).not.toHaveBeenCalled();
			          runRunAsyncTest(testObject);
			          setTimeout(() => \{
			            expect(fieldCallback_1).toHaveBeenCalled();
			            expect(fieldCallback_2).toHaveBeenCalled();
			            expect(doneCallback).not.toHaveBeenCalled();
			            done();
			          \});
			        \}));
			    \});
			
			    describe('When test is canceled', () => \{
			      beforeEach(() => \{
			        context.run(\{ stateRef \}, () => \{
			          testObject.cancel();
			        \});
			      \});
			
			      it('Should return without running any callback', () =>
			        new Promise<void>(done => \{
			          expect(fieldCallback_1).not.toHaveBeenCalled();
			          expect(fieldCallback_2).not.toHaveBeenCalled();
			          expect(doneCallback).not.toHaveBeenCalled();
			          runRunAsyncTest(testObject);
			          setTimeout(() => \{
			            expect(fieldCallback_1).not.toHaveBeenCalled();
			            expect(fieldCallback_2).not.toHaveBeenCalled();
			            expect(doneCallback).not.toHaveBeenCalled();
			            done();
			          \});
			        \}));
			    \});
			  \});
			
			  describe('testObject', () => \{
			    let testObjectCopy;
			
			    beforeEach(() => \{
			      testObject.fail = jest.fn();
			      testObjectCopy = _.cloneDeep(testObject);
			    \});
			
			    if (testCase === CASE_PASSING) \{
			      it('Should keep test object unchanged except for status', () =>
			        new Promise<void>(done => \{
			          runRunAsyncTest(testObject);
			          setTimeout(() => \{
			            expect(testObject).toEqual(
			              Object.assign(testObjectCopy, \{ status: 'PASSING' \})
			            );
			            done();
			          \});
			        \}));
			
			      it('Should return without calling testObject.fail', () =>
			        new Promise<void>(done => \{
			          runRunAsyncTest(testObject);
			          setTimeout(() => \{
			            expect(testObject.fail).not.toHaveBeenCalled();
			            done();
			          \});
			        \}));
			    \}
			
			    if (testCase === CASE_FAILING) \{
			      it('Should call testObject.fail', () =>
			        new Promise<void>(done => \{
			          runRunAsyncTest(testObject);
			          setTimeout(() => \{
			            expect(testObject.fail).toHaveBeenCalled();
			            done();
			          \});
			        \}));
			
			      describe('When rejecting with a message', () => \{
			        const rejectionString = 'rejection string';
			        beforeEach(() => \{
			          testObject.asyncTest.catch(Function.prototype);
			          testObject.asyncTest = Promise.reject(rejectionString);
			        \});
			
			        it('Should set test message to rejection string', () =>
			          new Promise<void>(done => \{
			            runRunAsyncTest(testObject);
			            setTimeout(() => \{
			              expect(testObject.message).toBe(rejectionString);
			              done();
			            \});
			          \}));
			      \});
			    \}
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\runAsyncTest.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\test.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ create, test, warn, enforce \} from 'vest';
			
			let testObject;
			
			describe("Test Vest's \`test\` function", () => \{
			  describe('test callbacks', () => \{
			    describe('Warn hook', () => \{
			      it('Should be marked as warning when the warn hook gets called', () => \{
			        create(() => \{
			          testObject = test(faker.random.word(), faker.lorem.sentence(), () => \{
			            warn();
			          \});
			        \})();
			        expect(testObject.warns()).toBe(true);
			      \});
			    \});
			
			    describe('Sync', () => \{
			      it('Should be marked as failed after a thrown error', () => \{
			        create(() => \{
			          testObject = test(faker.random.word(), faker.lorem.sentence(), () => \{
			            throw new Error();
			          \});
			        \})();
			        expect(testObject.status).toBe('FAILED');
			        expect(testObject == false).toBe(true); //eslint-disable-line
			      \});
			
			      it('Should be marked as failed for an explicit false return', () => \{
			        create(() => \{
			          test(faker.random.word(), faker.lorem.sentence(), () => false);
			        \})();
			        expect(testObject.status).toBe('FAILED');
			        expect(testObject == false).toBe(true); //eslint-disable-line
			      \});
			
			      describe('Thrown with a message', () => \{
			        describe('When field has a message', () => \{
			          it("Should use field's own message", () => \{
			            const res = create(() => \{
			              test('field_with_message', 'some_field_message', () => \{
			                failWithString();
			              \});
			              test('warning_field_with_message', 'some_field_message', () => \{
			                warn();
			                failWithString();
			              \});
			            \})();
			
			            expect(res.getErrors('field_with_message')).toEqual([
			              'some_field_message',
			            ]);
			            expect(res.tests['field_with_message'].errors).toEqual([
			              'some_field_message',
			            ]);
			            expect(res.getWarnings('warning_field_with_message')).toEqual([
			              'some_field_message',
			            ]);
			            expect(res.tests['warning_field_with_message'].warnings).toEqual([
			              'some_field_message',
			            ]);
			          \});
			        \});
			        describe('When field does not have a message', () => \{
			          it('Should use message from enforce().message()', () => \{
			            const res = create(() => \{
			              test('field_without_message', () => \{
			                enforce(100).message('some_field_message').equals(0);
			              \});
			            \})();
			
			            expect(res.getErrors('field_without_message')).toEqual([
			              'some_field_message',
			            ]);
			          \});
			          it('Should use message from thrown error', () => \{
			            const res = create(() => \{
			              test('field_without_message', () => \{
			                failWithString();
			              \});
			              test('warning_field_without_message', () => \{
			                warn();
			                failWithString();
			              \});
			            \})();
			
			            expect(res.getErrors('field_without_message')).toEqual([
			              'I fail with a message',
			            ]);
			            expect(res.tests['field_without_message'].errors).toEqual([
			              'I fail with a message',
			            ]);
			            expect(res.getWarnings('warning_field_without_message')).toEqual([
			              'I fail with a message',
			            ]);
			            expect(res.tests['warning_field_without_message'].warnings).toEqual(
			              ['I fail with a message']
			            );
			          \});
			        \});
			      \});
			    \});
			
			    describe('async', () => \{
			      it('Should be marked as failed when a returned promise rejects', () =>
			        new Promise<void>(done => \{
			          create(() => \{
			            testObject = test(
			              faker.random.word(),
			              faker.lorem.sentence(),
			              () =>
			                new Promise((_, reject) => \{
			                  expect(testObject.status).not.toBe('FAILED');
			                  setTimeout(reject, 300);
			                \})
			            );
			            expect(testObject.status).not.toBe('FAILED');
			            setTimeout(() => \{
			              expect(testObject.status).toBe('FAILED');
			              done();
			            \}, 310);
			          \})();
			        \}));
			    \});
			  \});
			
			  describe('test params', () => \{
			    let testObject;
			    it('creates a test without a message and without a key', () => \{
			      create(() => \{
			        testObject = test('field_name', () => undefined);
			      \})();
			      expect(testObject.fieldName).toBe('field_name');
			      expect(testObject.key).toBeNull();
			      expect(testObject.message).toBeUndefined();
			      expect(testObject).toMatchSnapshot();
			    \});
			
			    it('creates a test without a key', () => \{
			      create(() => \{
			        testObject = test('field_name', 'failure message', () => undefined);
			      \})();
			      expect(testObject.fieldName).toBe('field_name');
			      expect(testObject.key).toBeNull();
			      expect(testObject.message).toBe('failure message');
			      expect(testObject).toMatchSnapshot();
			    \});
			
			    it('creates a test without a message and with a key', () => \{
			      create(() => \{
			        testObject = test('field_name', () => undefined, 'keyboardcat');
			      \})();
			      expect(testObject.fieldName).toBe('field_name');
			      expect(testObject.key).toBe('keyboardcat');
			      expect(testObject.message).toBeUndefined();
			      expect(testObject).toMatchSnapshot();
			    \});
			
			    it('creates a test with a message and with a key', () => \{
			      create(() => \{
			        testObject = test(
			          'field_name',
			          'failure message',
			          () => undefined,
			          'keyboardcat'
			        );
			      \})();
			      expect(testObject.fieldName).toBe('field_name');
			      expect(testObject.key).toBe('keyboardcat');
			      expect(testObject.message).toBe('failure message');
			      expect(testObject).toMatchSnapshot();
			    \});
			
			    it('throws when field name is not a string', () => \{
			      const control = jest.fn();
			      create(() => \{
			        // @ts-ignore
			        expect(() => test(undefined, () => undefined)).toThrow(
			          'Incompatible params passed to test function. fieldName must be a string'
			        );
			        // @ts-expect-error
			        expect(() => test(null, 'error message', () => undefined)).toThrow(
			          'Incompatible params passed to test function. fieldName must be a string'
			        );
			        expect(() =>
			          // @ts-expect-error
			          test(null, 'error message', () => undefined, 'key')
			        ).toThrow(
			          'Incompatible params passed to test function. fieldName must be a string'
			        );
			        control();
			      \})();
			      expect(control).toHaveBeenCalled();
			    \});
			
			    it('throws when callback is not a function', () => \{
			      const control = jest.fn();
			      create(() => \{
			        // @ts-expect-error
			        expect(() => test('x')).toThrow(
			          'Incompatible params passed to test function. Test callback must be a function'
			        );
			        // @ts-expect-error
			        expect(() => test('x', 'msg', undefined)).toThrow(
			          'Incompatible params passed to test function. Test callback must be a function'
			        );
			        // @ts-expect-error
			        expect(() => test('x', 'msg', undefined, 'key')).toThrow(
			          'Incompatible params passed to test function. Test callback must be a function'
			        );
			        control();
			      \})();
			      expect(control).toHaveBeenCalled();
			    \});
			  \});
			\});
			
			function failWithString(msg?: string) \{
			  throw msg ?? 'I fail with a message';
			\}
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\test.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(32)
    });
    it('ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\VestTest.test.ts', () => {
        const sourceCode = `
			import wait from 'wait';
			
			import VestTest from 'VestTest';
			import \{ useAllIncomplete \} from 'stateHooks';
			import * as vest from 'vest';
			
			const fieldName = 'unicycle';
			const message = 'I am Root.';
			
			describe('VestTest', () => \{
			  let testObject;
			
			  beforeEach(() => \{
			    testObject = new VestTest(fieldName, jest.fn(), \{
			      message,
			    \});
			  \});
			
			  test('TestObject constructor', () => \{
			    expect(testObject).toMatchSnapshot();
			  \});
			
			  it('Should have a unique id', () => \{
			    Array.from(
			      \{ length: 100 \},
			      () => new VestTest(fieldName, jest.fn(), \{ message \})
			    ).reduce((existing, \{ id \}) => \{
			      expect(existing[id]).toBeUndefined();
			      existing[id] = true;
			      return existing;
			    \}, \{\});
			  \});
			
			  describe('testObject.warn', () => \{
			    it('Should mark the test as warning', () => \{
			      expect(testObject.warns()).toBe(false);
			      testObject.warn();
			      expect(testObject.warns()).toBe(true);
			      expect(testObject).toMatchSnapshot();
			    \});
			  \});
			
			  describe('testObject.fail', () => \{
			    beforeEach(() => \{
			      jest.resetModules();
			
			      const VestTest = require('VestTest').default; // eslint-disable-line @typescript-eslint/no-var-requires
			      testObject = new VestTest(fieldName, jest.fn(), \{ message \});
			    \});
			
			    afterEach(() => \{
			      jest.resetAllMocks();
			    \});
			
			    it('Should set status to failed', () => \{
			      expect(testObject.status).not.toBe('FAILED');
			      testObject.fail();
			      expect(testObject.status).toBe('FAILED');
			    \});
			  \});
			
			  describe('testObject.valueOf', () => \{
			    test('When test did not fail', () => \{
			      expect(testObject.valueOf()).toBe(true);
			    \});
			
			    test('When test failed', () => \{
			      testObject.fail();
			      expect(testObject.valueOf()).toBe(false);
			    \});
			  \});
			
			  describe('testObject.cancel', () => \{
			    it('Should set the testObject to cancel', () => \{
			      let testObject: VestTest;
			      return new Promise<void>(done => \{
			        const suite = vest.create(() => \{
			          testObject = vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          vest.test('f2', async () => \{
			            await wait(100);
			          \});
			          testObject.cancel();
			        \});
			        suite();
			
			        expect(testObject.isCanceled()).toBe(true);
			        done();
			      \});
			    \});
			
			    it('Should be removed from the list of incomplete tests', () => \{
			      const control = jest.fn();
			      vest.create(() => \{
			        const testObject = vest.test('f1', async () => \{
			          await wait(100);
			        \});
			
			        expect(testObject.isPending()).toBe(true);
			        \{
			          const allIncomplete = useAllIncomplete();
			
			          expect(allIncomplete).toEqual(expect.arrayContaining([testObject]));
			        \}
			        testObject.cancel();
			        \{
			          const allIncomplete = useAllIncomplete();
			          expect(allIncomplete).toEqual(
			            expect.not.arrayContaining([testObject])
			          );
			        \}
			        control();
			      \})();
			      expect(control).toHaveBeenCalledTimes(1);
			    \});
			
			    describe('final statuses', () => \{
			      let control;
			      beforeEach(() => \{
			        control = jest.fn();
			      \});
			      it('keep status unchanged when \`failed\`', () => \{
			        vest.create(() => \{
			          // async so it is not a final status
			          const testObject = vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          testObject.fail();
			          expect(testObject.isFailing()).toBe(true);
			          testObject.skip();
			          expect(testObject.isSkipped()).toBe(false);
			          expect(testObject.isFailing()).toBe(true);
			          testObject.cancel();
			          expect(testObject.isCanceled()).toBe(false);
			          expect(testObject.isFailing()).toBe(true);
			          testObject.setPending();
			          expect(testObject.isPending()).toBe(false);
			          expect(testObject.isFailing()).toBe(true);
			          control();
			        \})();
			        expect(control).toHaveBeenCalledTimes(1);
			      \});
			
			      it('keep status unchanged when \`canceled\`', () => \{
			        vest.create(() => \{
			          // async so it is not a final status
			          const testObject = vest.test('f1', async () => \{
			            await wait(100);
			          \});
			          testObject.setStatus('CANCELED');
			          expect(testObject.isCanceled()).toBe(true);
			          testObject.fail();
			          expect(testObject.isCanceled()).toBe(true);
			          expect(testObject.isFailing()).toBe(false);
			          testObject.skip();
			          expect(testObject.isSkipped()).toBe(false);
			          expect(testObject.isCanceled()).toBe(true);
			          testObject.setPending();
			          expect(testObject.isPending()).toBe(false);
			          expect(testObject.isCanceled()).toBe(true);
			          control();
			        \})();
			        expect(control).toHaveBeenCalledTimes(1);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\core\\test\\__tests__\\VestTest.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('ealush_vest\\packages\\vest\\src\\exports\\__tests__\\classnames.test.ts', () => {
        const sourceCode = `
			import \{ dummyTest \} from '../../../testUtils/testDummy';
			import classnames from '../classnames';
			import promisify from '../promisify';
			
			import * as vest from 'vest';
			
			describe('Utility: classnames', () => \{
			  describe('When called without a vest result object', () => \{
			    it('Should throw an error', () => \{
			      expect(classnames).toThrow();
			      // @ts-expect-error - testing invalid input
			      expect(() => classnames(\{\})).toThrow();
			      // @ts-expect-error - testing invalid input
			      expect(() => classnames([])).toThrow();
			      // @ts-expect-error - testing invalid input
			      expect(() => classnames('invalid')).toThrow();
			    \});
			  \});
			
			  describe('When called with a vest result object', () => \{
			    it('Should return a function', async () => \{
			      const validate = vest.create(jest.fn());
			      expect(typeof classnames(validate())).toBe('function');
			      const promisifed = await promisify(vest.create(jest.fn()))();
			      expect(typeof classnames(promisifed)).toBe('function');
			    \});
			  \});
			
			  const validate = vest.create(() => \{
			    vest.skip('field_1');
			
			    dummyTest.failing('field_1');
			    dummyTest.failing('field_2');
			    dummyTest.failingWarning('field_2');
			    dummyTest.failingWarning('field_3');
			    dummyTest.passing('field_4');
			    dummyTest.failing('field_5');
			  \});
			
			  const res = validate();
			
			  describe('when all keys are provided', () => \{
			    const genClass = classnames(res, \{
			      invalid: 'invalid_string',
			      tested: 'tested_string',
			      untested: 'untested_string',
			      valid: 'valid_string',
			      warning: 'warning_string',
			    \});
			
			    it('Should produce a string matching the classnames object for each field', () => \{
			      expect(genClass('field_1')).toBe('untested_string');
			
			      // splitting and sorting to not rely on object order which is unspecified in the language
			      expect(genClass('field_2').split(' ').sort()).toEqual(
			        'invalid_string tested_string warning_string'.split(' ').sort()
			      );
			      expect(genClass('field_3').split(' ').sort()).toEqual(
			        'tested_string valid_string warning_string'.split(' ').sort()
			      );
			      expect(genClass('field_4').split(' ').sort()).toEqual(
			        'tested_string valid_string'.split(' ').sort()
			      );
			
			      expect(genClass('field_5').split(' ').sort()).toEqual(
			        'tested_string invalid_string'.split(' ').sort()
			      );
			
			      expect(genClass('field_6').split(' ').sort()).toEqual(
			        'untested_string'.split(' ').sort()
			      );
			    \});
			  \});
			
			  describe('When only some keys are provided', () => \{
			    const genClass = classnames(res, \{
			      invalid: 'invalid_string',
			    \});
			
			    it('Should produce a string matching the classnames object for each field', () => \{
			      expect(genClass('field_1')).toBe('');
			
			      // splitting and sorting to not rely on object order which is unspecified in the language
			      expect(genClass('field_2').split(' ').sort()).toEqual(
			        'invalid_string'.split(' ').sort()
			      );
			      expect(genClass('field_3').split(' ').sort()).toEqual(
			        ''.split(' ').sort()
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\exports\\__tests__\\classnames.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\vest\\src\\exports\\__tests__\\parser.test.ts', () => {
        const sourceCode = `
			import * as suiteDummy from '../../../testUtils/suiteDummy';
			import \{ ser \} from '../../../testUtils/suiteDummy';
			
			import \{ parse \} from 'parser';
			import * as vest from 'vest';
			
			describe('parser.parse', () => \{
			  describe('parse().invalid', () => \{
			    it('Should return true when provided suite result is failing and no field name is provided', () => \{
			      expect(parse(suiteDummy.failing()).invalid()).toBe(true);
			    \});
			
			    it('Should return false when provided suite result is passing and no field name is provided', () => \{
			      expect(parse(suiteDummy.passing()).invalid()).toBe(false);
			    \});
			
			    it('Should return true when provided field is failing', () => \{
			      expect(parse(suiteDummy.failing('username')).invalid('username')).toBe(
			        true
			      );
			    \});
			
			    it('Should return false when provided field is passing', () => \{
			      expect(parse(suiteDummy.passing('username')).invalid('username')).toBe(
			        false
			      );
			    \});
			
			    describe('Serialized Result', () => \{
			      it('Should return true when provided suite result is failing and no field name is provided', () => \{
			        expect(parse(ser(suiteDummy.failing())).invalid()).toBe(true);
			      \});
			
			      it('Should return false when provided suite result is passing and no field name is provided', () => \{
			        expect(parse(ser(suiteDummy.passing())).invalid()).toBe(false);
			      \});
			
			      it('Should return true when provided field is failing', () => \{
			        expect(
			          parse(ser(suiteDummy.failing('username'))).invalid('username')
			        ).toBe(true);
			      \});
			
			      it('Should return false when provided field is passing', () => \{
			        expect(
			          parse(ser(suiteDummy.passing('username'))).invalid('username')
			        ).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('parse().tested', () => \{
			    it('Should return true if any field is tested but no field is provided', () => \{
			      expect(parse(suiteDummy.passing()).tested()).toBe(true);
			    \});
			    it('Should return true if no field is tested', () => \{
			      expect(parse(suiteDummy.untested()).tested()).toBe(false);
			      expect(parse(suiteDummy.untested()).tested('field')).toBe(false);
			    \});
			    it('Should return true if provided field is tested', () => \{
			      expect(parse(suiteDummy.passing('username')).tested('username')).toBe(
			        true
			      );
			      expect(parse(suiteDummy.failing('username')).tested('username')).toBe(
			        true
			      );
			    \});
			
			    describe('Serialized Result', () => \{
			      it('Should return true if any field is tested but no field is provided', () => \{
			        expect(parse(ser(suiteDummy.passing())).tested()).toBe(true);
			      \});
			      it('Should return true if no field is tested', () => \{
			        expect(parse(ser(suiteDummy.untested())).tested()).toBe(false);
			        expect(parse(ser(suiteDummy.untested())).tested('field')).toBe(false);
			      \});
			      it('Should return true if provided field is tested', () => \{
			        expect(
			          parse(ser(suiteDummy.passing('username'))).tested('username')
			        ).toBe(true);
			        expect(
			          parse(ser(suiteDummy.failing('username'))).tested('username')
			        ).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('parse().untested', () => \{
			    it('Should return true if no field is tested', () => \{
			      expect(parse(suiteDummy.untested()).untested()).toBe(true);
			      expect(parse(suiteDummy.untested()).untested('username')).toBe(true);
			    \});
			
			    it('Should return true if provided field is untested while others are', () => \{
			      expect(
			        parse(
			          vest.create(() => \{
			            vest.test('x', () => \{\});
			            vest.skipWhen(true, () => \{
			              vest.test('untested', () => \{\});
			            \});
			          \})()
			        ).untested('untested')
			      ).toBe(true);
			    \});
			
			    it('Should return false if any field is tested', () => \{
			      expect(parse(suiteDummy.passing('username')).untested()).toBe(false);
			    \});
			
			    it('Should return false if provided field is tested', () => \{
			      expect(parse(suiteDummy.passing('username')).untested('username')).toBe(
			        false
			      );
			    \});
			
			    describe('Serialized Result', () => \{
			      it('Should return true if no field is tested', () => \{
			        expect(parse(ser(suiteDummy.untested())).untested()).toBe(true);
			      \});
			
			      it('Should return true if provided field is untested while others are', () => \{
			        expect(
			          parse(
			            ser(
			              vest.create(() => \{
			                vest.test('x', () => \{\});
			                vest.skipWhen(true, () => \{
			                  vest.test('untested', () => \{\});
			                \});
			              \})()
			            )
			          ).untested('untested')
			        ).toBe(true);
			      \});
			
			      it('Should return false if any field is tested', () => \{
			        expect(parse(ser(suiteDummy.passing('username'))).untested()).toBe(
			          false
			        );
			      \});
			
			      it('Should return false if provided field is tested', () => \{
			        expect(
			          parse(ser(suiteDummy.passing('username'))).untested('username')
			        ).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('parse().valid', () => \{
			    it('Should return true if all fields are passing', () => \{
			      expect(parse(suiteDummy.passing(['f1', 'f2', 'f3'])).valid()).toBe(true);
			      expect(parse(suiteDummy.passing(['f1', 'f2', 'f3'])).valid('f2')).toBe(
			        true
			      );
			    \});
			
			    it('Should return true if all required fields have been tested and are passing', () => \{
			      expect(
			        parse(suiteDummy.passingWithUntestedOptional('optional')).valid()
			      ).toBe(true);
			    \});
			
			    it('Should return true if all fields, including optional, pass', () => \{
			      expect(parse(suiteDummy.passingWithOptional('optional')).valid()).toBe(
			        true
			      );
			    \});
			
			    it('Should return false if suite has errors', () => \{
			      expect(parse(suiteDummy.failing()).valid()).toBe(false);
			    \});
			
			    it('Should return false if suite has failing optional tests', () => \{
			      expect(parse(suiteDummy.failingOptional()).valid()).toBe(false);
			    \});
			
			    it('Should return true if suite only has warnings', () => \{
			      expect(parse(suiteDummy.warning(['f1', 'f2', 'f3'])).valid()).toBe(true);
			    \});
			
			    it('Should return false if no tests ran', () => \{
			      expect(parse(suiteDummy.untested()).valid()).toBe(false);
			    \});
			
			    it('should return false if not all required fields ran', () => \{
			      expect(
			        parse(
			          vest.create(() => \{
			            vest.test('x', () => \{\});
			            vest.test('untested', () => \{\});
			            vest.skipWhen(true, () => \{
			              vest.test('untested', () => \{\});
			            \});
			          \})()
			        ).valid()
			      ).toBe(false);
			    \});
			
			    describe('With field name', () => \{
			      it('Should return false when field is untested', () => \{
			        expect(
			          parse(
			            vest.create(() => \{
			              vest.skipWhen(true, () => \{
			                vest.test('f1', () => \{\});
			              \});
			            \})()
			          ).valid('f1')
			        ).toBe(false);
			      \});
			
			      it('Should return true if optional field is untested', () => \{
			        expect(
			          parse(
			            vest.create(() => \{
			              vest.optional('f1');
			              vest.skipWhen(true, () => \{
			                vest.test('f1', () => \{\});
			              \});
			            \})()
			          ).valid('f1')
			        ).toBe(true);
			      \});
			
			      it('Should return true if field is passing', () => \{
			        expect(
			          parse(
			            vest.create(() => \{
			              vest.test('f1', () => \{\});
			              vest.test('f2', () => false);
			            \})()
			          ).valid('f1')
			        ).toBe(true);
			      \});
			
			      it('Should return false if field is failing', () => \{
			        expect(
			          parse(
			            vest.create(() => \{
			              vest.test('f1', () => \{\});
			              vest.test('f2', () => false);
			            \})()
			          ).valid('f2')
			        ).toBe(false);
			        expect(
			          parse(
			            vest.create(() => \{
			              vest.test('f1', () => \{\});
			              vest.test('f2', () => \{\});
			              vest.test('f2', () => false);
			            \})()
			          ).valid('f2')
			        ).toBe(false);
			      \});
			
			      it('Should return true if field is warning', () => \{
			        expect(
			          parse(
			            vest.create(() => \{
			              vest.test('f1', () => \{
			                vest.warn();
			                return false;
			              \});
			            \})()
			          ).valid('f1')
			        ).toBe(true);
			      \});
			    \});
			
			    describe('Serialized Result', () => \{
			      it('Should return true if all fields are passing', () => \{
			        expect(parse(ser(suiteDummy.passing(['f1', 'f2', 'f3']))).valid()).toBe(
			          true
			        );
			        expect(
			          parse(ser(suiteDummy.passing(['f1', 'f2', 'f3']))).valid('f2')
			        ).toBe(true);
			      \});
			
			      it('Should return true if all required fields have been tested and are passing', () => \{
			        expect(
			          parse(ser(suiteDummy.passingWithUntestedOptional('optional'))).valid()
			        ).toBe(true);
			      \});
			
			      it('Should return true if all fields, including optional, pass', () => \{
			        expect(
			          parse(ser(suiteDummy.passingWithOptional('optional'))).valid()
			        ).toBe(true);
			      \});
			
			      it('Should return false if suite has errors', () => \{
			        expect(parse(ser(suiteDummy.failing())).valid()).toBe(false);
			      \});
			
			      it('Should return false if suite has failing optional tests', () => \{
			        expect(parse(ser(suiteDummy.failingOptional())).valid()).toBe(false);
			      \});
			
			      it('Should return true if suite only has warnings', () => \{
			        expect(parse(ser(suiteDummy.warning(['f1', 'f2', 'f3']))).valid()).toBe(
			          true
			        );
			      \});
			
			      it('Should return false if no tests ran', () => \{
			        expect(parse(ser(suiteDummy.untested())).valid()).toBe(false);
			      \});
			
			      it('should return false if not all required fields ran', () => \{
			        expect(
			          parse(
			            ser(
			              vest.create(() => \{
			                vest.test('x', () => \{\});
			                vest.test('untested', () => \{\});
			                vest.skipWhen(true, () => \{
			                  vest.test('untested', () => \{\});
			                \});
			              \})()
			            )
			          ).valid()
			        ).toBe(false);
			      \});
			
			      describe('With field name', () => \{
			        it('Should return false when field is untested', () => \{
			          expect(
			            parse(
			              ser(
			                vest.create(() => \{
			                  vest.skipWhen(true, () => \{
			                    vest.test('f1', () => \{\});
			                  \});
			                \})()
			              )
			            ).valid('f1')
			          ).toBe(false);
			        \});
			
			        it('Should return true if optional field is untested', () => \{
			          expect(
			            parse(
			              ser(
			                vest.create(() => \{
			                  vest.optional('f1');
			                  vest.skipWhen(true, () => \{
			                    vest.test('f1', () => \{\});
			                  \});
			                \})()
			              )
			            ).valid('f1')
			          ).toBe(true);
			        \});
			
			        it('Should return true if field is passing', () => \{
			          expect(
			            parse(
			              ser(
			                vest.create(() => \{
			                  vest.test('f1', () => \{\});
			                  vest.test('f2', () => false);
			                \})()
			              )
			            ).valid('f1')
			          ).toBe(true);
			        \});
			
			        it('Should return false if field is failing', () => \{
			          expect(
			            parse(
			              ser(
			                vest.create(() => \{
			                  vest.test('f1', () => \{\});
			                  vest.test('f2', () => false);
			                \})()
			              )
			            ).valid('f2')
			          ).toBe(false);
			          expect(
			            parse(
			              ser(
			                vest.create(() => \{
			                  vest.test('f1', () => \{\});
			                  vest.test('f2', () => \{\});
			                  vest.test('f2', () => false);
			                \})()
			              )
			            ).valid('f2')
			          ).toBe(false);
			        \});
			
			        it('Should return true if field is warning', () => \{
			          expect(
			            parse(
			              ser(
			                vest.create(() => \{
			                  vest.test('f1', () => \{
			                    vest.warn();
			                    return false;
			                  \});
			                \})()
			              )
			            ).valid('f1')
			          ).toBe(true);
			        \});
			      \});
			    \});
			  \});
			
			  describe('parse().warning', () => \{
			    it('Should return true when the suite has warnings', () => \{
			      expect(parse(suiteDummy.warning()).warning()).toBe(true);
			    \});
			
			    it('Should return false when the suite is not warnings', () => \{
			      expect(parse(suiteDummy.failing()).warning()).toBe(false);
			    \});
			
			    describe('serialized result', () => \{
			      it('Should return true when the suite has warnings', () => \{
			        expect(parse(ser(suiteDummy.warning())).warning()).toBe(true);
			      \});
			
			      it('Should return false when the suite is not warnings', () => \{
			        expect(parse(ser(suiteDummy.failing())).warning()).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('When input is not a Vest object', () => \{
			    it('Should throw an error', () => \{
			      expect(() => \{
			        // @ts-ignore - this is not a vest object
			        parse(\{\});
			      \}).toThrow();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\exports\\__tests__\\parser.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(53)
    });
    it('ealush_vest\\packages\\vest\\src\\exports\\__tests__\\promisify.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ dummyTest \} from '../../../testUtils/testDummy';
			import promisify from '../promisify';
			
			import * as vest from 'vest';
			
			describe('Utility: promisify', () => \{
			  let validatorFn;
			  let validateAsync;
			
			  beforeEach(() => \{
			    validatorFn = jest.fn(vest.create(jest.fn()));
			    validateAsync = promisify(validatorFn);
			  \});
			
			  describe('Test arguments', () => \{
			    it('Should throw an error', () => \{
			      // @ts-expect-error - testing invalid input
			      const invalidValidateAsync = promisify('invalid');
			      expect(() => invalidValidateAsync()).toThrow();
			    \});
			  \});
			
			  describe('Return value', () => \{
			    it('should be a function', () => \{
			      expect(typeof promisify(jest.fn())).toBe('function');
			    \});
			
			    it('should be a promise', () =>
			      new Promise<void>(done => \{
			        const res = validateAsync();
			        expect(typeof res?.then).toBe('function');
			        res.then(() => done());
			      \}));
			  \});
			
			  describe('When returned function is invoked', () => \{
			    it('Calls \`validatorFn\` argument', () =>
			      new Promise<void>(done => \{
			        const validateAsync = promisify(vest.create(() => done()));
			        validateAsync();
			      \}));
			
			    it('Passes all arguments over to tests callback', async () => \{
			      const params = [
			        1,
			        \{ [faker.random.word()]: [1, 2, 3] \},
			        false,
			        [faker.random.word()],
			      ];
			
			      await validateAsync(...params);
			      expect(validatorFn).toHaveBeenCalledWith(...params);
			    \});
			  \});
			
			  describe('Initial run', () => \{
			    it('Produces correct validation', () =>
			      new Promise<void>(done => \{
			        const validate = vest.create(() => \{
			          dummyTest.failing('field_0');
			          dummyTest.failingAsync('field_1');
			        \});
			
			        const validatorAsync = promisify(validate);
			        const p = validatorAsync('me');
			
			        p.then(result => \{
			          expect(result.hasErrors('field_0')).toBe(true);
			          expect(result.hasErrors('field_1')).toBe(true);
			          done();
			        \});
			      \}));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\exports\\__tests__\\promisify.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\vest\\src\\hooks\\mode\\__tests__\\eager.test.ts', () => {
        const sourceCode = `
			import \{ dummyTest \} from '../../../../testUtils/testDummy';
			
			import \{ create, eager, only, group \} from 'vest';
			
			describe('mode: eager', () => \{
			  let suite;
			
			  describe('When tests fail', () => \{
			    beforeEach(() => \{
			      suite = create(include => \{
			        only(include);
			
			        eager();
			        dummyTest.failing('field_1', 'first-of-field_1');
			        dummyTest.failing('field_1', 'second-of-field_1'); // Should not run
			        dummyTest.failing('field_2', 'first-of-field_2');
			        dummyTest.failing('field_2', 'second-of-field_2'); // Should not run
			        dummyTest.failing('field_3', 'first-of-field_3');
			        dummyTest.failing('field_3', 'second-of-field_3'); // Should not run
			      \});
			    \});
			
			    it('Should fail fast for every failing field', () => \{
			      expect(suite.get().testCount).toBe(0); // sanity
			      suite();
			      expect(suite.get().testCount).toBe(3);
			      expect(suite.get().errorCount).toBe(3);
			      expect(suite.get().getErrors('field_1')).toEqual(['first-of-field_1']);
			      expect(suite.get().getErrors('field_2')).toEqual(['first-of-field_2']);
			      expect(suite.get().getErrors('field_3')).toEqual(['first-of-field_3']);
			    \});
			
			    describe('When test is \`only\`ed', () => \{
			      it('Should fail fast for failing field', () => \{
			        suite('field_1');
			        expect(suite.get().testCount).toBe(1);
			        expect(suite.get().errorCount).toBe(1);
			        expect(suite.get().getErrors('field_1')).toEqual(['first-of-field_1']);
			      \});
			    \});
			
			    describe('When test is in a group', () => \{
			      beforeEach(() => \{
			        suite = create(() => \{
			          eager();
			          group('group_1', () => \{
			            dummyTest.failing('field_1', 'first-of-field_1');
			          \});
			          dummyTest.failing('field_1', 'second-of-field_1');
			        \});
			      \});
			      it('Should fail fast for failing field', () => \{
			        suite();
			        expect(suite.get().testCount).toBe(1);
			        expect(suite.get().errorCount).toBe(1);
			        expect(suite.get().getErrors('field_1')).toEqual(['first-of-field_1']);
			      \});
			    \});
			  \});
			
			  describe('When tests pass', () => \{
			    beforeEach(() => \{
			      suite = create(() => \{
			        eager();
			        dummyTest.passing('field_1', 'first-of-field_1');
			        dummyTest.failing('field_1', 'second-of-field_1');
			        dummyTest.passing('field_2', 'first-of-field_2');
			        dummyTest.failing('field_2', 'second-of-field_2');
			        dummyTest.passing('field_3', 'first-of-field_3');
			        dummyTest.failing('field_3', 'second-of-field_3');
			      \});
			    \});
			
			    it('Should fail fast for every failing field', () => \{
			      expect(suite.get().testCount).toBe(0); // sanity
			      suite();
			      expect(suite.get().testCount).toBe(6);
			      expect(suite.get().errorCount).toBe(3);
			      expect(suite.get().getErrors('field_1')).toEqual(['second-of-field_1']);
			      expect(suite.get().getErrors('field_2')).toEqual(['second-of-field_2']);
			      expect(suite.get().getErrors('field_3')).toEqual(['second-of-field_3']);
			    \});
			  \});
			
			  describe('sanity', () => \{
			    beforeEach(() => \{
			      suite = create(() => \{
			        dummyTest.failing('field_1', 'first-of-field_1');
			        dummyTest.failing('field_1', 'second-of-field_1');
			        dummyTest.failing('field_2', 'first-of-field_2');
			        dummyTest.failing('field_2', 'second-of-field_2');
			        dummyTest.failing('field_3', 'first-of-field_3');
			        dummyTest.failing('field_3', 'second-of-field_3');
			      \});
			    \});
			
			    it('Should run all tests', () => \{
			      expect(suite.get().testCount).toBe(0); // sanity
			      suite();
			      expect(suite.get().testCount).toBe(6);
			      expect(suite.get().errorCount).toBe(6);
			    \});
			  \});
			
			  describe('When test used to fail and it now passes', () => \{
			    let run = 0;
			    beforeEach(() => \{
			      suite = create(() => \{
			        dummyTest.passing('field_1');
			
			        if (run === 0) \{
			          dummyTest.failing('field_1', 'second-of-field_1');
			        \} else \{
			          dummyTest.passing('field_1');
			        \}
			        run++;
			      \});
			    \});
			
			    it('Should treat test as passing', () => \{
			      suite();
			      expect(suite.get().hasErrors()).toBe(true);
			      expect(suite.get().getErrors('field_1')).toEqual(['second-of-field_1']);
			      suite();
			      expect(suite.get().hasErrors()).toBe(false);
			      expect(suite.get().getErrors('field_1')).toEqual([]);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\hooks\\mode\\__tests__\\eager.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\vest\\src\\hooks\\__tests__\\exclusive.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ dummyTest \} from '../../../testUtils/testDummy';
			
			import VestTest from 'VestTest';
			import context from 'ctx';
			import \{ isExcluded, isGroupExcluded, skip, only \} from 'exclusive';
			import group from 'group';
			import \{ ERROR_HOOK_CALLED_OUTSIDE \} from 'hookErrors';
			import * as vest from 'vest';
			
			let res, res1;
			
			describe('exclusive hooks', () => \{
			  let test1, test2, test3;
			
			  beforeEach(() => \{
			    test1 = new VestTest(faker.lorem.word(), jest.fn());
			    test2 = new VestTest(faker.lorem.slug(), jest.fn());
			    test3 = new VestTest(faker.random.word(), jest.fn());
			  \});
			
			  test('isExcluded should respect group exclusion', () => \{
			    let testObject;
			    let testObject1;
			    const validate = vest.create(() => \{
			      vest.skip.group('group_1');
			
			      testObject = dummyTest.failing();
			
			      group('group_1', () => \{
			        testObject1 = dummyTest.failing();
			      \});
			
			      res = isExcluded(testObject);
			      res1 = isExcluded(testObject1);
			    \});
			
			    validate();
			
			    expect(res).toBe(false);
			    expect(res1).toBe(true);
			  \});
			
			  describe('\`only\` hook', () => \{
			    describe('string input', () => \{
			      test('isExcluded returns false for included field', () => \{
			        vest.create(() => \{
			          vest.only(test1.fieldName);
			          res = isExcluded(test1);
			        \})();
			        expect(res).toBe(false);
			      \});
			
			      test('isGroupExcluded returns false for included groups', () => \{
			        vest.create(() => \{
			          vest.only('group_name');
			
			          group('group_name', () => \{
			            res = isGroupExcluded('group_name');
			          \});
			        \})();
			        expect(res).toBe(false);
			      \});
			
			      test('isExcluded returns true for non included field', () => \{
			        vest.create(() => \{
			          vest.only(test1.fieldName);
			          res1 = isExcluded(test1);
			          res = isExcluded(test2);
			        \})();
			        expect(res1).toBe(false);
			        expect(res).toBe(true);
			      \});
			
			      test('isGroupExcluded returns true for non included group', () => \{
			        vest.create(() => \{
			          vest.only.group('group_1');
			
			          group('group_1', jest.fn());
			          group('group_2', jest.fn());
			
			          res1 = isGroupExcluded('group_1');
			          res = isGroupExcluded('group_2');
			        \})();
			
			        expect(res1).toBe(false);
			        expect(res).toBe(true);
			      \});
			    \});
			
			    describe('array input', () => \{
			      test('isExcluded returns false for included field', () => \{
			        vest.create(() => \{
			          vest.only([test1.fieldName, test2.fieldName]);
			          res = isExcluded(test1);
			          res1 = isExcluded(test2);
			        \})();
			        expect(res).toBe(false);
			        expect(res1).toBe(false);
			      \});
			
			      test('isGroupExcluded returns false for included groups', () => \{
			        vest.create(() => \{
			          vest.only.group(['group_1', 'group_2']);
			
			          group('group_1', jest.fn());
			          group('group_2', jest.fn());
			          group('group_3', jest.fn());
			
			          res = [
			            isGroupExcluded('group_1'),
			            isGroupExcluded('group_2'),
			            isGroupExcluded('group_3'),
			          ];
			        \})();
			        expect(res).toEqual([false, false, true]);
			      \});
			
			      test('isExcluded returns true for non included field', () => \{
			        vest.create(() => \{
			          res = [isExcluded(test1), isExcluded(test2), isExcluded(test3)];
			          vest.only([test1.fieldName, test2.fieldName]);
			          res1 = [isExcluded(test1), isExcluded(test2), isExcluded(test3)];
			        \})();
			        expect(res).toEqual([false, false, false]);
			        expect(res1).toEqual([false, false, true]);
			      \});
			
			      test('isGroupExcluded returns true for non included groups', () => \{
			        vest.create(() => \{
			          vest.only.group(['group_1', 'group_2']);
			
			          group('group_3', jest.fn());
			          res = [
			            isGroupExcluded('group_1'),
			            isGroupExcluded('group_2'),
			            isGroupExcluded('group_3'),
			          ];
			        \})();
			        expect(res).toEqual([false, false, true]);
			      \});
			    \});
			  \});
			
			  describe('\`skip\` hook', () => \{
			    describe('string input', () => \{
			      test('isExcluded returns true for excluded field', () => \{
			        vest.create(() => \{
			          vest.skip(test1.fieldName);
			          res = isExcluded(test1);
			        \})();
			        expect(res).toBe(true);
			      \});
			
			      test('isGroupExcluded returns true for excluded groups', () => \{
			        vest.create(() => \{
			          vest.skip.group('group_1');
			          res = isGroupExcluded('group_1');
			          res1 = isGroupExcluded('group_2');
			        \})();
			
			        expect(res).toBe(true);
			        expect(res1).toBe(false);
			      \});
			
			      test('isExcluded returns false for non excluded field', () => \{
			        vest.create(() => \{
			          vest.skip(test1.fieldName);
			          res = isExcluded(vest.test(test2.fieldName, jest.fn()));
			        \})();
			        expect(res).toBe(false);
			      \});
			    \});
			
			    test('isGroupExcluded returns false for tests in non excluded groups', () => \{
			      vest.create(() => \{
			        vest.skip('group_1');
			        res = isExcluded(vest.test('field_1', jest.fn()));
			      \})();
			      expect(res).toBe(false);
			    \});
			
			    describe('array input', () => \{
			      test('isExcluded returns true for excluded field', () => \{
			        vest.create(() => \{
			          vest.skip([test1.fieldName, test2.fieldName]);
			
			          res = isExcluded(test1);
			          res1 = isExcluded(test2);
			        \})();
			        expect(res).toBe(true);
			        expect(res1).toBe(true);
			      \});
			
			      test('isGroupExcluded returns true for excluded groups', () => \{
			        vest.create(() => \{
			          vest.skip.group(['group_1', 'group_2']);
			          res = [isGroupExcluded('group_1'), isGroupExcluded('group_2')];
			        \})();
			        expect(res).toEqual([true, true]);
			      \});
			
			      test('isExcluded returns false for non included field', () => \{
			        vest.create(() => \{
			          vest.skip([test1.fieldName, test2.fieldName]);
			          res = isExcluded(test3);
			        \})();
			        expect(res).toBe(false);
			      \});
			
			      test('isGroupExcluded returns false for non excluded groups', () => \{
			        vest.create(() => \{
			          vest.skip(['group_1', 'group_2']);
			          res = isGroupExcluded('group_3');
			        \})();
			        expect(res).toBe(false);
			      \});
			    \});
			
			    describe('Field is in a non included group', () => \{
			      let suite;
			
			      beforeEach(() => \{
			        suite = vest.create(() => \{
			          vest.only.group('group_1');
			
			          vest.group('group_1', () => \{
			            vest.test('field_1', jest.fn());
			          \});
			          vest.group('group_2', () => \{
			            vest.test('field_2', jest.fn());
			          \});
			        \});
			        suite();
			      \});
			
			      it('Should exclude test', () => \{
			        expect(suite.get().tests.field_2.testCount).toBe(0);
			      \});
			    \});
			  \});
			
			  describe('Error handling', () => \{
			    describe('When called outside of a suite', () => \{
			      it('Should throw an error', () => \{
			        expect(() => only(faker.random.word())).toThrow(
			          ERROR_HOOK_CALLED_OUTSIDE
			        );
			        expect(() => skip(faker.random.word())).toThrow(
			          ERROR_HOOK_CALLED_OUTSIDE
			        );
			      \});
			    \});
			  \});
			\});
			
			describe('isExcluded', () => \{
			  let exclusion;
			
			  const runIsExcluded = (exclusion, testObject: VestTest) =>
			    context.run(\{\}, () => \{
			      Object.assign(context.useX().exclusion, exclusion);
			      const res = isExcluded(testObject);
			
			      return res;
			    \});
			
			  const genTest = (fieldName: string, groupName?: string) =>
			    new VestTest(fieldName, jest.fn(), \{
			      groupName,
			    \});
			  describe('skip', () => \{
			    beforeEach(() => \{
			      exclusion = \{ tests: \{ field_1: false, field_2: false \} \};
			    \});
			    it('returns true for skipped field', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_1'))).toBe(
			        true
			      );
			    \});
			    it('returns false for non skipped field', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3'))).toBe(false);
			      expect(runIsExcluded(exclusion, genTest('field_4', 'group_1'))).toBe(
			        false
			      );
			    \});
			  \});
			  describe('only', () => \{
			    beforeEach(() => \{
			      exclusion = \{ tests: \{ field_1: true, field_2: true \} \};
			    \});
			    it('returns false for included field', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1'))).toBe(false);
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_1'))).toBe(
			        false
			      );
			    \});
			    it('returns true for non included field', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_4', 'group_1'))).toBe(
			        true
			      );
			    \});
			  \});
			  describe('only+skip', () => \{
			    beforeEach(() => \{
			      exclusion = \{
			        tests: \{ field_1: true, field_2: true, field_3: false, field_4: false \},
			      \};
			    \});
			    it('returns false for included tests', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1'))).toBe(false);
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_1'))).toBe(
			        false
			      );
			    \});
			    it('returns true excluded tests', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_4', 'group_1'))).toBe(
			        true
			      );
			    \});
			    it('returns true for non included field', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_5'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_6', 'group_1'))).toBe(
			        true
			      );
			    \});
			  \});
			  describe('skip.group', () => \{
			    beforeEach(() => \{
			      exclusion = \{
			        groups: \{
			          group_1: false,
			          group_2: false,
			        \},
			      \};
			    \});
			
			    it('Returns true for tests in skipped group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_1'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_2'))).toBe(
			        true
			      );
			    \});
			    it('Returns false for tests in non skipped groups', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3', 'group_3'))).toBe(
			        false
			      );
			      expect(runIsExcluded(exclusion, genTest('field_4', 'group_4'))).toBe(
			        false
			      );
			    \});
			    it('Returns false for tests outside of any group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3'))).toBe(false);
			      expect(runIsExcluded(exclusion, genTest('field_4'))).toBe(false);
			    \});
			  \});
			  describe('only.group', () => \{
			    beforeEach(() => \{
			      exclusion = \{
			        groups: \{
			          group_1: true,
			          group_2: true,
			        \},
			      \};
			    \});
			
			    it('returns false for tests in included groups', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_1'))).toBe(
			        false
			      );
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_2'))).toBe(
			        false
			      );
			    \});
			
			    it('returns true for groups in non included groups', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_3'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_4'))).toBe(
			        true
			      );
			    \});
			
			    it('returns true for tests outside of any group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_2'))).toBe(true);
			    \});
			  \});
			
			  describe('only.group + only', () => \{
			    beforeEach(() => \{
			      exclusion = \{
			        groups: \{
			          group_1: true,
			          group_2: true,
			        \},
			        tests: \{ field_1: true, field_2: true \},
			      \};
			    \});
			
			    it('returns true for included tests outside of the group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_2'))).toBe(true);
			    \});
			
			    it('returns false for included tests in included groups', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_1'))).toBe(
			        false
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_2'))).toBe(
			        false
			      );
			    \});
			
			    it('returns true for included test in non included group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_3'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_4'))).toBe(
			        true
			      );
			    \});
			
			    it('returns true for non included test in included group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3', 'group_1'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_4', 'group_2'))).toBe(
			        true
			      );
			    \});
			
			    it('returns true for non included tests', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_4'))).toBe(true);
			    \});
			  \});
			
			  describe('skip.group + only', () => \{
			    beforeEach(() => \{
			      exclusion = \{
			        groups: \{
			          group_1: false,
			          group_2: false,
			        \},
			        tests: \{ field_1: true, field_2: true \},
			      \};
			    \});
			
			    it('returns true for included tests in excluded groups', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_1'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_1'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_3', 'group_1'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_2'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_2'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_3', 'group_2'))).toBe(
			        true
			      );
			    \});
			
			    it('returns false for included tests in non excluded groups', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_3'))).toBe(
			        false
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_3'))).toBe(
			        false
			      );
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_4'))).toBe(
			        false
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_4'))).toBe(
			        false
			      );
			    \});
			
			    it('returns true for non included tests', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_4'))).toBe(true);
			    \});
			
			    it('returns false for included tests outside of the group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1'))).toBe(false);
			      expect(runIsExcluded(exclusion, genTest('field_2'))).toBe(false);
			    \});
			  \});
			
			  describe('only.group + skip', () => \{
			    beforeEach(() => \{
			      exclusion = \{
			        groups: \{
			          group_1: true,
			          group_2: true,
			        \},
			        tests: \{ field_1: false, field_2: false \},
			      \};
			    \});
			
			    it('returns true for excluded tests', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1'))).toBe(true);
			      expect(runIsExcluded(exclusion, genTest('field_2'))).toBe(true);
			    \});
			    it('returns true for excluded test in included group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_1'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_2'))).toBe(
			        true
			      );
			    \});
			    it('returns true for excluded test in non included group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_1', 'group_3'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_2', 'group_4'))).toBe(
			        true
			      );
			    \});
			    it('returns false for non excluded test in included group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3', 'group_1'))).toBe(
			        false
			      );
			      expect(runIsExcluded(exclusion, genTest('field_4', 'group_2'))).toBe(
			        false
			      );
			    \});
			    it('returns true for non excluded test in non included group', () => \{
			      expect(runIsExcluded(exclusion, genTest('field_3', 'group_3'))).toBe(
			        true
			      );
			      expect(runIsExcluded(exclusion, genTest('field_4', 'group_4'))).toBe(
			        true
			      );
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\hooks\\__tests__\\exclusive.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(46)
    });
    it('ealush_vest\\packages\\vest\\src\\hooks\\__tests__\\include.test.ts', () => {
        const sourceCode = `
			import * as vest from 'vest';
			
			describe('include', () => \{
			  let cb1, cb2;
			
			  beforeEach(() => \{
			    cb1 = jest.fn(() => false);
			    cb2 = jest.fn(() => false);
			  \});
			
			  describe('When not passing a string fieldName', () => \{
			    it('Should throw an error', () => \{
			      // @ts-ignore
			      expect(() => vest.include(\{\})).toThrow();
			      // @ts-ignore
			      expect(() => vest.include(undefined)).toThrow();
			    \});
			  \});
			
			  describe('There is an \`onlyd\` field', () => \{
			    describe('\`include\` is run as-is without modifiers', () => \{
			      it('Should run the included test along with the onlyd test', () => \{
			        const suite = vest.create(() => \{
			          vest.only('field_1');
			          vest.include('field_2');
			
			          vest.test('field_1', () => false);
			          vest.test('field_2', () => false);
			        \});
			
			        const res = suite();
			        expect(res.hasErrors('field_1')).toBe(true);
			        expect(res.tests.field_1.testCount).toBe(1);
			        expect(res.hasErrors('field_2')).toBe(true);
			        expect(res.tests.field_2.testCount).toBe(1);
			        expect(res).toMatchSnapshot();
			      \});
			    \});
			
			    describe('include().when()', () => \{
			      describe('\`when\` param is a string', () => \{
			        describe('\`when\` param is a name of an onlyd field', () => \{
			          it('Should run included field along with the onlyd field', () => \{
			            const suite = vest.create(() => \{
			              vest.only('field_1');
			              vest.include('field_2').when('field_1');
			
			              vest.test('field_1', () => false);
			              vest.test('field_2', () => false);
			              vest.test('field_3', () => false);
			            \});
			
			            const res = suite();
			            expect(res.hasErrors('field_1')).toBe(true);
			            expect(res.tests.field_1.testCount).toBe(1);
			            expect(res.hasErrors('field_2')).toBe(true);
			            expect(res.tests.field_2.testCount).toBe(1);
			            expect(res.hasErrors('field_3')).toBe(false);
			            expect(res.tests.field_3.testCount).toBe(0);
			            expect(res).toMatchSnapshot();
			          \});
			        \});
			        describe('\`when\` param is a name of a non-included field', () => \{
			          it('Should avoid running the included field', () => \{
			            const suite = vest.create(() => \{
			              vest.only('field_1');
			              vest.include('field_2').when('field_3');
			
			              vest.test('field_1', () => false);
			              vest.test('field_2', () => false);
			              vest.test('field_3', () => false);
			            \});
			
			            const res = suite();
			            expect(res.hasErrors('field_1')).toBe(true);
			            expect(res.tests.field_1.testCount).toBe(1);
			            expect(res.hasErrors('field_2')).toBe(false);
			            expect(res.tests.field_2.testCount).toBe(0);
			            expect(res.hasErrors('field_3')).toBe(false);
			            expect(res.tests.field_3.testCount).toBe(0);
			            expect(res).toMatchSnapshot();
			          \});
			        \});
			        describe('\`when\` param is a name of a skipped field', () => \{
			          it('Should avoid running the included field', () => \{
			            const suite = vest.create(() => \{
			              vest.only('field_1');
			              vest.skip('field_3');
			              vest.include('field_2').when('field_3');
			
			              vest.test('field_1', () => false);
			              vest.test('field_2', () => false);
			              vest.test('field_3', () => false);
			            \});
			
			            const res = suite();
			            expect(res.hasErrors('field_1')).toBe(true);
			            expect(res.tests.field_1.testCount).toBe(1);
			            expect(res.hasErrors('field_2')).toBe(false);
			            expect(res.tests.field_2.testCount).toBe(0);
			            expect(res.hasErrors('field_3')).toBe(false);
			            expect(res.tests.field_3.testCount).toBe(0);
			            expect(res).toMatchSnapshot();
			          \});
			        \});
			      \});
			      describe('\`when\` param is a boolean', () => \{
			        describe('when \`true\`', () => \{
			          it('Should run included field', () => \{
			            const suite = vest.create(() => \{
			              vest.only('field_1');
			              vest.include('field_2').when(true);
			
			              vest.test('field_1', () => false);
			              vest.test('field_2', () => false);
			              vest.test('field_3', () => false);
			            \});
			
			            const res = suite();
			            expect(res.hasErrors('field_1')).toBe(true);
			            expect(res.tests.field_1.testCount).toBe(1);
			            expect(res.hasErrors('field_2')).toBe(true);
			            expect(res.tests.field_2.testCount).toBe(1);
			            expect(res.hasErrors('field_3')).toBe(false);
			            expect(res.tests.field_3.testCount).toBe(0);
			            expect(res).toMatchSnapshot();
			          \});
			        \});
			        describe('when \`false\`', () => \{
			          it('Should skip run included field', () => \{
			            const suite = vest.create(() => \{
			              vest.only('field_1');
			              vest.include('field_2').when(false);
			
			              vest.test('field_1', () => false);
			              vest.test('field_2', () => false);
			              vest.test('field_3', () => false);
			            \});
			
			            const res = suite();
			            expect(res.hasErrors('field_1')).toBe(true);
			            expect(res.tests.field_1.testCount).toBe(1);
			            expect(res.hasErrors('field_2')).toBe(false);
			            expect(res.tests.field_2.testCount).toBe(0);
			            expect(res.hasErrors('field_3')).toBe(false);
			            expect(res.tests.field_3.testCount).toBe(0);
			            expect(res).toMatchSnapshot();
			          \});
			        \});
			      \});
			      describe('\`when\` param is a function', () => \{
			        describe('when returning \`true\`', () => \{
			          it('Should run included field', () => \{
			            const suite = vest.create(() => \{
			              vest.only('field_1');
			              vest.include('field_2').when(() => true);
			
			              vest.test('field_1', () => false);
			              vest.test('field_2', () => false);
			              vest.test('field_3', () => false);
			            \});
			
			            const res = suite();
			            expect(res.hasErrors('field_1')).toBe(true);
			            expect(res.tests.field_1.testCount).toBe(1);
			            expect(res.hasErrors('field_2')).toBe(true);
			            expect(res.tests.field_2.testCount).toBe(1);
			            expect(res.hasErrors('field_3')).toBe(false);
			            expect(res.tests.field_3.testCount).toBe(0);
			            expect(res).toMatchSnapshot();
			          \});
			        \});
			        describe('when  returning\`false\`', () => \{
			          it('Should skip run included field', () => \{
			            const suite = vest.create(() => \{
			              vest.only('field_1');
			              vest.include('field_2').when(() => false);
			
			              vest.test('field_1', () => false);
			              vest.test('field_2', () => false);
			              vest.test('field_3', () => false);
			            \});
			
			            const res = suite();
			            expect(res.hasErrors('field_1')).toBe(true);
			            expect(res.tests.field_1.testCount).toBe(1);
			            expect(res.hasErrors('field_2')).toBe(false);
			            expect(res.tests.field_2.testCount).toBe(0);
			            expect(res.hasErrors('field_3')).toBe(false);
			            expect(res.tests.field_3.testCount).toBe(0);
			            expect(res).toMatchSnapshot();
			          \});
			        \});
			
			        describe('Callback evaluation', () => \{
			          it('Should run the callback for each matching test', () => \{
			            const cb = jest.fn(() => true);
			            const suite = vest.create(() => \{
			              vest.only('field_1');
			              vest.include('field_2').when(cb);
			
			              vest.test('field_1', () => false);
			              expect(cb).toHaveBeenCalledTimes(0);
			              vest.test('field_2', () => false);
			              expect(cb).toHaveBeenCalledTimes(1);
			              vest.test('field_3', () => false);
			              expect(cb).toHaveBeenCalledTimes(1);
			              vest.test('field_2', () => false);
			              expect(cb).toHaveBeenCalledTimes(2);
			            \});
			
			            suite();
			            expect(cb).toHaveBeenCalledTimes(2);
			          \});
			          it('Should evaluate per test run', () => \{
			            const cb1 = jest.fn(() => false);
			            const cb2 = jest.fn(() => false);
			            const cb3 = jest.fn(() => false);
			            const cb4 = jest.fn(() => false);
			
			            const suite = vest.create(() => \{
			              let shouldRun = false;
			              vest.only('x');
			              vest.include('field_1').when(() => shouldRun);
			
			              vest.test('field_1', cb1);
			              shouldRun = true;
			              vest.test('field_1', cb2);
			              shouldRun = false;
			              vest.test('field_1', cb3);
			              shouldRun = true;
			              vest.test('field_1', cb4);
			            \});
			
			            const res = suite();
			            expect(cb1).toHaveBeenCalledTimes(0);
			            expect(cb2).toHaveBeenCalledTimes(1);
			            expect(cb3).toHaveBeenCalledTimes(0);
			            expect(cb4).toHaveBeenCalledTimes(1);
			            expect(res.hasErrors('field_1')).toBe(true);
			            expect(res.tests.field_1.testCount).toBe(2);
			            expect(res).toMatchSnapshot();
			          \});
			        \});
			      \});
			    \});
			  \});
			
			  describe('Field is excluded via \`skip\`', () => \{
			    it('Should disregard \`include\` and avoid running the test', () => \{
			      const suite = vest.create(() => \{
			        vest.skip('field_1');
			        vest.include('field_1');
			
			        vest.test('field_1', () => false);
			        vest.test('field_2', () => false);
			      \});
			
			      const res = suite();
			      expect(res.hasErrors('field_1')).toBe(false);
			      expect(res.tests.field_1.testCount).toBe(0);
			      expect(res.hasErrors('field_2')).toBe(true);
			      expect(res.tests.field_2.testCount).toBe(1);
			      expect(res).toMatchSnapshot();
			    \});
			    it('Should disregard \`include.when\` and avoid running the test', () => \{
			      const suite = vest.create(() => \{
			        vest.skip('field_1');
			        vest.include('field_1').when(true);
			
			        vest.test('field_1', () => false);
			        vest.test('field_2', () => false);
			      \});
			
			      const res = suite();
			      expect(res.hasErrors('field_1')).toBe(false);
			      expect(res.tests.field_1.testCount).toBe(0);
			      expect(res.hasErrors('field_2')).toBe(true);
			      expect(res.tests.field_2.testCount).toBe(1);
			      expect(res).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Field is included via \`only\`', () => \{
			    it('Should disregard \`when\` condition and test the field anyway', () => \{
			      const suite = vest.create(() => \{
			        vest.only('field_1');
			        vest.include('field_1').when(false);
			
			        vest.test('field_1', () => false);
			      \});
			
			      const res = suite();
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.tests.field_1.testCount).toBe(1);
			    \});
			  \});
			  describe('Test is excluded by being out of an included group', () => \{
			    it('Should disregard \`include\` and avoid running the test', () => \{
			      const suite = vest.create(() => \{
			        vest.only.group('g1');
			        vest.include('field_1');
			        vest.group('g1', () => \{\});
			
			        vest.test('field_1', () => false);
			        vest.group('g2', () => \{
			          vest.test('field_1', () => false);
			        \});
			      \});
			
			      const res = suite();
			      expect(res.hasErrors('field_1')).toBe(false);
			      expect(res.tests.field_1.testCount).toBe(0);
			      expect(res).toMatchSnapshot();
			    \});
			  \});
			  describe('Test is excluded via \`skip.group\`', () => \{
			    it('Should disregard \`include\` and avoid running the test', () => \{
			      const suite = vest.create(() => \{
			        vest.skip.group('g1');
			        vest.include('field_1');
			
			        vest.group('g1', () => \{
			          vest.test('field_1', cb1);
			          vest.test('field_2', () => false);
			        \});
			        vest.test('field_1', cb2);
			      \});
			
			      const res = suite();
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.tests.field_1.testCount).toBe(1);
			      expect(cb1).toHaveBeenCalledTimes(0);
			      expect(cb2).toHaveBeenCalledTimes(1);
			      expect(res.hasErrors('field_2')).toBe(false);
			      expect(res.tests.field_2.testCount).toBe(0);
			      expect(res).toMatchSnapshot();
			    \});
			    it('Should disregard \`include.when\` and avoid running the test', () => \{
			      const suite = vest.create(() => \{
			        vest.skip.group('g1');
			        vest.include('field_1').when(true);
			
			        vest.group('g1', () => \{
			          vest.test('field_1', cb1);
			          vest.test('field_2', () => false);
			        \});
			        vest.test('field_1', cb2);
			      \});
			
			      const res = suite();
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.tests.field_1.testCount).toBe(1);
			      expect(cb1).toHaveBeenCalledTimes(0);
			      expect(cb2).toHaveBeenCalledTimes(1);
			      expect(res.hasErrors('field_2')).toBe(false);
			      expect(res.tests.field_2.testCount).toBe(0);
			      expect(res).toMatchSnapshot();
			    \});
			  \});
			  describe('Test is excluded via \`skipWhen\`', () => \{
			    it('Should disregard \`include\` and avoid running the matching tests', () => \{
			      const suite = vest.create(() => \{
			        vest.include('field_1');
			
			        vest.skipWhen(true, () => \{
			          vest.test('field_1', cb1);
			        \});
			        vest.test('field_1', cb2);
			      \});
			
			      const res = suite();
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.tests.field_1.testCount).toBe(1);
			      expect(cb1).not.toHaveBeenCalled();
			      expect(cb2).toHaveBeenCalled();
			      expect(res).toMatchSnapshot();
			    \});
			    it('Should disregard \`include.when\` and avoid running the matching tests', () => \{
			      const suite = vest.create(() => \{
			        vest.include('field_1').when(true);
			
			        vest.skipWhen(true, () => \{
			          vest.test('field_1', cb1);
			        \});
			        vest.test('field_1', cb2);
			      \});
			
			      const res = suite();
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.tests.field_1.testCount).toBe(1);
			      expect(cb1).not.toHaveBeenCalled();
			      expect(cb2).toHaveBeenCalled();
			      expect(res).toMatchSnapshot();
			    \});
			  \});
			  describe('When no \`skip\` or \`only\`', () => \{
			    test('include has no effect', () => \{
			      const suite = vest.create(() => \{
			        vest.include('field_1');
			
			        vest.test('field_1', () => false);
			        vest.test('field_2', () => false);
			      \});
			      const res = suite();
			
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.tests.field_1.testCount).toBe(1);
			      expect(res.hasErrors('field_2')).toBe(true);
			      expect(res.tests.field_2.testCount).toBe(1);
			      expect(res).toMatchSnapshot();
			    \});
			
			    test('include().when has no effect', () => \{
			      const suite = vest.create(() => \{
			        vest.include('field_1').when(false);
			
			        vest.test('field_1', () => false);
			        vest.test('field_2', () => false);
			      \});
			      const res = suite();
			
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.tests.field_1.testCount).toBe(1);
			      expect(res.hasErrors('field_2')).toBe(true);
			      expect(res.tests.field_2.testCount).toBe(1);
			      expect(res).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\hooks\\__tests__\\include.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(21)
    });
    it('ealush_vest\\packages\\vest\\src\\hooks\\__tests__\\optional.test.ts', () => {
        const sourceCode = `
			import \{ optional, create, test \} from 'vest';
			
			describe('optional hook', () => \{
			  describe('Functional Optional Interface', () => \{
			    it('Should omit test failures based on optional functions', () => \{
			      const suite = create(() => \{
			        optional(\{
			          f1: () => true,
			          f2: () => true,
			        \});
			
			        test('f1', () => false);
			        test('f2', () => false);
			      \});
			
			      const res = suite();
			
			      expect(res.hasErrors('f1')).toBe(false);
			      expect(res.hasErrors('f2')).toBe(false);
			      expect(res.isValid('f1')).toBe(true);
			      expect(res.isValid('f2')).toBe(true);
			      expect(res.isValid()).toBe(true);
			    \});
			
			    describe('example: "any of" test', () => \{
			      it('Should allow specifying custom optional based on other tests in the suite', () => \{
			        const suite = create(() => \{
			          optional(\{
			            f1: () => !suite.get().hasErrors('f2'),
			            f2: () => !suite.get().hasErrors('f1'),
			          \});
			
			          test('f1', () => false);
			          test('f2', () => true);
			        \});
			
			        const res = suite();
			
			        expect(res.hasErrors('f1')).toBe(false);
			        expect(res.hasErrors('f2')).toBe(false);
			        expect(res.isValid('f1')).toBe(true);
			        expect(res.isValid('f2')).toBe(true);
			        expect(res.isValid()).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('boolean optional field indicator', () => \{
			    describe('When true', () => \{
			      it('Should omit field as optional', () => \{
			        const suite = create(() => \{
			          optional(\{
			            field_1: true,
			          \});
			          test('field_1', () => false);
			        \});
			
			        const res = suite();
			
			        expect(res.hasErrors('field_1')).toBe(false);
			        expect(res.isValid('field_1')).toBe(true);
			        expect(res.isValid()).toBe(true);
			      \});
			    \});
			
			    describe('When false', () => \{
			      it('Should fail the field normally', () => \{
			        const suite = create(() => \{
			          optional(\{
			            field_1: false,
			          \});
			          test('field_1', () => false);
			        \});
			
			        const res = suite();
			
			        expect(res.hasErrors('field_1')).toBe(true);
			        expect(res.isValid('field_1')).toBe(false);
			        expect(res.isValid()).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\hooks\\__tests__\\optional.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('ealush_vest\\packages\\vest\\src\\hooks\\__tests__\\warn.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import context from 'ctx';
			import \{ ERROR_HOOK_CALLED_OUTSIDE \} from 'hookErrors';
			import * as vest from 'vest';
			
			const \{ create, test, warn \} = vest;
			
			describe('warn hook', () => \{
			  describe('When currentTest exists', () => \{
			    it('Should set warns to true', () => \{
			      let beforeWarn, afterWarn;
			      create(() => \{
			        test(faker.lorem.word(), faker.lorem.sentence(), () => \{
			          beforeWarn = context.useX().currentTest!.warns(); // eslint-disable-line @typescript-eslint/no-non-null-assertion
			          warn();
			          afterWarn = context.useX().currentTest!.warns(); // eslint-disable-line @typescript-eslint/no-non-null-assertion
			        \});
			      \})();
			
			      expect(beforeWarn).toBe(false);
			      expect(afterWarn).toBe(true);
			    \});
			  \});
			
			  describe('Error handling', () => \{
			    let warn, create;
			
			    beforeEach(() => \{
			      (\{ create, warn \} = require('vest'));
			    \});
			
			    it('Should throw error when currentTest is not present', () => \{
			      const done = jest.fn();
			      create(() => \{
			        expect(warn).toThrow(
			          "warn hook called outside of a test callback. It won't have an effect."
			        );
			        done();
			      \})();
			      expect(done).toHaveBeenCalled();
			    \});
			
			    it('Should throw error when no suite present', () => \{
			      expect(warn).toThrow(ERROR_HOOK_CALLED_OUTSIDE);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\hooks\\__tests__\\warn.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\vest\\src\\__tests__\\integration.async-tests.test.ts', () => {
        const sourceCode = `
			import * as vest from 'vest';
			
			function genSuite(\{ create, test, enforce, ...vest \}) \{
			  return create(() => \{
			    test('field_1', 'field_statement_1', () => false);
			    test('field_2', 'field_statement_2', () => \{
			      enforce(2).equals(3);
			    \});
			    test('field_3', 'field_statement_3', jest.fn());
			    test('field_4', 'field_statement_4', () => \{
			      vest.warn();
			      throw new Error();
			    \});
			    test('field_4', 'field_statement_4', () => \{
			      vest.warn();
			    \});
			    test('field_5', 'field_statement_5', () => false);
			    test('field_5', 'field_statement_6', () => false);
			    test(
			      'field_6',
			      'async_statement_1',
			      () =>
			        new Promise(res => \{
			          setTimeout(res, 250, null);
			        \})
			    );
			    test('field_7', () => Promise.reject('async_statement_2'));
			  \});
			\}
			
			let suite;
			describe('Stateful behavior', () => \{
			  let result, callback_1, callback_2, callback_3, control;
			
			  beforeEach(() => \{
			    suite = genSuite(\{ ...vest \});
			  \});
			
			  beforeAll(() => \{
			    callback_1 = jest.fn();
			    callback_2 = jest.fn();
			    callback_3 = jest.fn();
			    control = jest.fn();
			  \});
			
			  test('Should have all fields', () =>
			    new Promise<void>(done => \{
			      // ❗️Why is this test async? Because of the \`resetState\` beforeEach.
			      // We must not clean up before the suite is actually done.
			      result = suite(vest).done(done);
			      expect(result.tests).toHaveProperty('field_1');
			      expect(result.tests).toHaveProperty('field_2');
			      expect(result.tests).toHaveProperty('field_4');
			      expect(result.tests).toHaveProperty('field_5');
			      expect(result.tests).toHaveProperty('field_6');
			      expect(result.tests).toHaveProperty('field_7');
			      expect(result.hasErrors('field_7')).toBe(false);
			      expect(result.tests).toMatchSnapshot();
			    \}));
			
			  it('Should invoke done callback specified with sync field immediately, and the others after finishing', () =>
			    new Promise<void>(done => \{
			      result = suite(vest);
			      result
			        .done('field_1', callback_1)
			        .done('field_6', callback_2)
			        .done(callback_3);
			      expect(callback_1).toHaveBeenCalled();
			      expect(callback_2).not.toHaveBeenCalled();
			      expect(callback_3).not.toHaveBeenCalled();
			
			      setTimeout(() => \{
			        expect(callback_2).not.toHaveBeenCalled();
			        expect(callback_3).not.toHaveBeenCalled();
			        expect(suite.get().hasErrors('field_7')).toBe(true);
			        control();
			      \});
			
			      setTimeout(() => \{
			        expect(callback_2).toHaveBeenCalled();
			        expect(callback_3).toHaveBeenCalled();
			        expect(control).toHaveBeenCalled();
			        done();
			      \}, 250);
			    \}));
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\__tests__\\integration.async-tests.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(11)
    });
    it('ealush_vest\\packages\\vest\\src\\__tests__\\integration.base.test.ts', () => {
        const sourceCode = `
			import * as vest from 'vest';
			
			const suite = (\{ create, test, ...vest \}) =>
			  create(() => \{
			    vest.skip('field_5');
			    test('field_1', 'field_statement_1', () => false);
			    test('field_2', 'field_statement_2', () => \{
			      expect(2).toBe(3);
			    \});
			    test('field_3', 'field_statement_3', jest.fn());
			    test('field_4', 'field_statement_4', () => \{
			      vest.warn();
			      throw new Error();
			    \});
			
			    test('field_4', 'field_statement_4', () => \{
			      vest.warn();
			    \});
			    test('field_5', 'field_statement_5', () => false);
			    test('field_5', 'field_statement_6', () => false);
			  \})();
			
			describe('Base behavior', () => \{
			  let res;
			
			  beforeEach(() => \{
			    res = suite(vest);
			  \});
			
			  test('Should produce correct validation result', () => \{
			    expect(res.tests).toHaveProperty('field_1');
			    expect(res.tests).toHaveProperty('field_2');
			    expect(res.tests).toHaveProperty('field_3');
			    expect(res.tests).toHaveProperty('field_4');
			    expect(res.tests.field_5.testCount).toBe(0);
			    expect(suite(vest)).toMatchSnapshot();
			  \});
			
			  it('Should run done callbacks immediately', () => \{
			    const callback = jest.fn();
			    res.done(callback);
			
			    expect(callback).toHaveBeenCalled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\__tests__\\integration.base.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\vest\\src\\__tests__\\integration.exclusive.test.ts', () => {
        const sourceCode = `
			import * as vest from 'vest';
			
			let validate;
			
			beforeEach(() => \{
			  validate = genValidate(vest);
			\});
			
			describe('only', () => \{
			  it('Should only count included fields', () => \{
			    const res = validate(\{
			      only: ['field_1', 'field_2'],
			    \});
			
			    expect(res.tests.field_1.testCount).toBe(1);
			    expect(res.tests.field_2.testCount).toBe(1);
			    expect(res.tests.field_3.testCount).toBe(0);
			    expect(res.tests.field_4.testCount).toBe(0);
			    expect(res.tests.field_5.testCount).toBe(0);
			  \});
			  it('Should only count included field', () => \{
			    const res = validate(\{
			      only: 'field_1',
			    \});
			
			    expect(res.tests.field_1.testCount).toBe(1);
			    expect(res.tests.field_2.testCount).toBe(0);
			    expect(res.tests.field_3.testCount).toBe(0);
			    expect(res.tests.field_4.testCount).toBe(0);
			    expect(res.tests.field_5.testCount).toBe(0);
			  \});
			\});
			describe('skip', () => \{
			  it('Should count all but excluded fields', () => \{
			    const res = validate(\{
			      skip: ['field_1', 'field_2'],
			    \});
			
			    expect(res.tests.field_1.testCount).toBe(0);
			    expect(res.tests.field_2.testCount).toBe(0);
			    expect(res.tests.field_3.testCount).toBe(1);
			    expect(res.tests.field_4.testCount).toBe(1);
			    expect(res.tests.field_5.testCount).toBe(1);
			  \});
			
			  it('Should count all but excluded field', () => \{
			    const res = validate(\{
			      skip: 'field_1',
			    \});
			
			    expect(res.tests.field_1.testCount).toBe(0);
			    expect(res.tests.field_2.testCount).toBe(1);
			    expect(res.tests.field_3.testCount).toBe(1);
			    expect(res.tests.field_4.testCount).toBe(1);
			    expect(res.tests.field_5.testCount).toBe(1);
			  \});
			\});
			
			describe('Combined', () => \{
			  test('Last declaration wins', () => \{
			    const res = validate(\{
			      only: ['field_1', 'field_2', 'field_3'],
			      skip: ['field_1'],
			      skip_last: 'field_3',
			    \});
			
			    expect(res.tests.field_1.testCount).toBe(1);
			    expect(res.tests.field_2.testCount).toBe(1);
			    expect(res.tests.field_3.testCount).toBe(0);
			  \});
			\});
			
			function genValidate(vest) \{
			  return vest.create((exclusion: Record<string, string | string[]> = \{\}) => \{
			    vest.skip(exclusion?.skip);
			    vest.only(exclusion?.only);
			    vest.skip(exclusion?.skip_last);
			
			    vest.test('field_1', 'msg', Function.prototype);
			    vest.test('field_2', 'msg', Function.prototype);
			    vest.test('field_3', 'msg', Function.prototype);
			    vest.test('field_4', 'msg', Function.prototype);
			    vest.test('field_5', 'msg', Function.prototype);
			  \});
			\}
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\__tests__\\integration.exclusive.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('ealush_vest\\packages\\vest\\src\\__tests__\\integration.stateful-async.test.ts', () => {
        const sourceCode = `
			import wait from 'wait';
			
			import \{ dummyTest \} from '../../testUtils/testDummy';
			
			import * as vest from 'vest';
			
			const suite = (\{ create, ...vest \}) =>
			  create((\{ skip, skipGroup \}) => \{
			    vest.skip(skip);
			    vest.skip.group(skipGroup);
			
			    vest.group('group', () => \{
			      dummyTest.failingAsync('field_1', \{ message: 'field_1_group_message' \});
			      dummyTest.failingAsync('field_4', \{ message: 'field_4_group_message' \});
			    \});
			
			    dummyTest.failing('field_1', 'field_message_1');
			
			    dummyTest.failingAsync('field_2', \{
			      time: 50,
			      message: 'rejection_message_1',
			    \});
			
			    dummyTest.passing('field_2', 'field_message_2');
			
			    dummyTest.passingAsync('field_3', \{ message: 'field_message_3' \});
			    dummyTest.failingAsync('field_3', \{ message: 'field_message_3' \});
			  \});
			
			let validate, callback_1, callback_2, callback_3, callback_4, control;
			
			describe('Stateful async tests', () => \{
			  beforeEach(() => \{
			    callback_1 = jest.fn();
			    callback_2 = jest.fn();
			    callback_3 = jest.fn();
			    callback_4 = jest.fn();
			    control = jest.fn();
			    validate = suite(vest);
			  \});
			
			  it('Should only run callbacks for last suite run', () =>
			    new Promise<void>(done => \{
			      validate(vest).done(callback_1).done('field_3', callback_2);
			      expect(callback_1).not.toHaveBeenCalled();
			      expect(callback_2).not.toHaveBeenCalled();
			      validate(vest).done(callback_3).done('field_3', callback_4);
			      expect(callback_3).not.toHaveBeenCalled();
			      expect(callback_4).not.toHaveBeenCalled();
			      setTimeout(() => \{
			        expect(callback_1).not.toHaveBeenCalled();
			        expect(callback_2).not.toHaveBeenCalled();
			        expect(callback_3).not.toHaveBeenCalled();
			        expect(callback_4).toHaveBeenCalled();
			        control();
			      \});
			      setTimeout(() => \{
			        expect(callback_1).not.toHaveBeenCalled();
			        expect(callback_2).not.toHaveBeenCalled();
			        expect(callback_3).toHaveBeenCalledTimes(1);
			        expect(control).toHaveBeenCalled();
			        done();
			      \}, 50);
			    \}));
			
			  it('Merges skipped validations from previous suite', () =>
			    new Promise<void>(done => \{
			      const res = validate(\{ skipGroup: 'group', skip: 'field_3' \});
			      expect(res.testCount).toBe(3);
			      expect(res.errorCount).toBe(1);
			      expect(res.warnCount).toBe(0);
			      expect(res.hasErrors('field_1')).toBe(true);
			      expect(res.tests.field_1.errorCount).toBe(1);
			      expect(res.hasErrors('field_2')).toBe(false);
			      expect(res.hasErrors('field_3')).toBe(false);
			      expect(res.hasErrors('field_4')).toBe(false);
			      expect(res).toMatchSnapshot();
			      setTimeout(() => \{
			        const res = validate.get();
			
			        expect(res.testCount).toBe(3);
			        expect(res.errorCount).toBe(2);
			        expect(res.warnCount).toBe(0);
			        expect(res.tests.field_1.errorCount).toBe(1);
			        expect(res.hasErrors('field_2')).toBe(true);
			        expect(res.hasErrors('field_3')).toBe(false);
			        expect(res.hasErrors('field_4')).toBe(false);
			        expect(res).toMatchSnapshot();
			
			        validate(\{ skip: 'field_2' \}).done(res => \{
			          expect(res.testCount).toBe(7);
			          expect(res.errorCount).toBe(5);
			          expect(res.warnCount).toBe(0);
			          expect(res.tests.field_1.errorCount).toBe(2);
			          expect(res.hasErrors('field_2')).toBe(true);
			          expect(res.hasErrors('field_3')).toBe(true);
			          expect(res.hasErrors('field_4')).toBe(true);
			          expect(res).toMatchSnapshot();
			          done();
			        \});
			      \}, 50);
			    \}));
			
			  it('Should discard of re-tested async tests', async () => \{
			    const tests = [];
			    const control = jest.fn();
			    const suite = vest.create(() => \{
			      tests.push(
			        vest.test('field_1', async () => \{
			          await wait(100);
			          throw new Error();
			        \})
			      );
			    \});
			    suite().done(() => \{
			      control(0);
			    \});
			    await wait(5);
			    suite().done(() => \{
			      control(1);
			    \});
			    await wait(100);
			    expect(control).toHaveBeenCalledTimes(1);
			    expect(control).toHaveBeenCalledWith(1);
			
			    expect(tests[0].status).toBe('CANCELED');
			    expect(tests[1].status).toBe('FAILED');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\__tests__\\integration.stateful-async.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\vest\\src\\__tests__\\integration.stateful-tests.test.ts', () => {
        const sourceCode = `
			import \{ enforce \} from 'n4s';
			
			import * as vest from 'vest';
			
			describe('Stateful behavior', () => \{
			  let result;
			  const validate = genValidate(vest);
			
			  test('Should merge skipped fields with previous values', () => \{
			    result = validate(\{ only: 'field_1' \});
			    expect(result.tests.field_1.errorCount).toBe(1);
			    expect(result.errorCount).toBe(1);
			    expect(Object.keys(result.tests)).toHaveLength(5); // including 4 skipped tests
			    expect(result.tests).toHaveProperty('field_1');
			    expect(result).toMatchSnapshot();
			
			    result = validate(\{ only: 'field_5' \});
			    expect(result.errorCount).toBe(3);
			    expect(result.tests.field_1.errorCount).toBe(1);
			    expect(result.tests.field_5.errorCount).toBe(2);
			    expect(Object.keys(result.tests)).toHaveLength(5); // including 4 skipped tests
			    expect(result.tests).toHaveProperty('field_1');
			    expect(result.tests).toHaveProperty('field_5');
			    expect(result).toMatchSnapshot();
			
			    result = validate();
			    expect(result.errorCount).toBe(4);
			    expect(result.tests.field_1.errorCount).toBe(1);
			    expect(result.tests.field_2.errorCount).toBe(1);
			    expect(result.tests.field_4.warnCount).toBe(1);
			    expect(result.tests.field_5.errorCount).toBe(2);
			    expect(Object.keys(result.tests)).toHaveLength(5);
			    expect(result).toMatchSnapshot();
			  \});
			\});
			
			describe('more complex', () => \{
			  const \{ test, enforce, create, skipWhen \} = vest;
			
			  const data: Record<string, string> = \{\};
			
			  it('Should run correctly', () => \{
			    expect(suite.get().hasErrors()).toBe(false);
			    expect(suite.get()).toMatchSnapshot();
			
			    data.username = 'user_1';
			    suite(data, 'username');
			
			    expect(suite.get().hasErrors()).toBe(false);
			    expect(suite.get()).toMatchSnapshot();
			
			    suite(data, 'password');
			    expect(suite.get().hasErrors()).toBe(true);
			    expect(suite.get().tests.password).toMatchInlineSnapshot(\`
			      Object \{
			        "errorCount": 1,
			        "errors": Array [
			          "password is required",
			        ],
			        "testCount": 1,
			        "valid": false,
			        "warnCount": 0,
			        "warnings": Array [],
			      \}
			    \`);
			    expect(suite.get()).toMatchSnapshot();
			
			    suite(data, 'confirm');
			    expect(suite.get().tests.confirm).toMatchInlineSnapshot(\`
			      Object \{
			        "errorCount": 0,
			        "errors": Array [],
			        "testCount": 0,
			        "valid": false,
			        "warnCount": 0,
			        "warnings": Array [],
			      \}
			    \`);
			    expect(suite.get()).toMatchSnapshot();
			    expect(suite.get().hasErrors('password')).toBe(true);
			    expect(suite.get().hasErrors('confirm')).toBe(false);
			
			    data.password = '123456';
			    suite(data, 'password');
			    expect(suite.get().tests.confirm).toMatchInlineSnapshot(\`
			      Object \{
			        "errorCount": 0,
			        "errors": Array [],
			        "testCount": 0,
			        "valid": false,
			        "warnCount": 0,
			        "warnings": Array [],
			      \}
			    \`);
			    data.confirm = '123456';
			    suite(data, 'confirm');
			    expect(suite.get().hasErrors('password')).toBe(false);
			    expect(suite.get().hasErrors('confirm')).toBe(false);
			    expect(suite.get().tests.confirm).toMatchInlineSnapshot(\`
			      Object \{
			        "errorCount": 0,
			        "errors": Array [],
			        "testCount": 1,
			        "valid": true,
			        "warnCount": 0,
			        "warnings": Array [],
			      \}
			    \`);
			  \});
			
			  const suite = create((data: Record<string, unknown> = \{\}, only: string) => \{
			    vest.only(only);
			
			    test('username', 'username is required', () => \{
			      enforce(data.username).isNotEmpty();
			    \});
			
			    test('username', 'username must be at least 3 characters', () => \{
			      enforce(data.username).longerThanOrEquals(3);
			    \});
			
			    test('password', 'password is required', () => \{
			      enforce(data.password).isNotEmpty();
			    \});
			
			    skipWhen(
			      draft => draft.hasErrors('password'),
			      () => \{
			        test('confirm', 'passwords do not match', () => \{
			          enforce(data.confirm).equals(data.password);
			        \});
			      \}
			    );
			  \});
			\});
			
			function genValidate(\{ create, test, ...vest \}) \{
			  return create((\{ only \}: \{ only?: string | string[] \} = \{\}) => \{
			    vest.only(only);
			    test('field_1', 'field_statement_1', () => false);
			    test('field_2', 'field_statement_2', () => \{
			      enforce(2).equals(3);
			    \});
			    test('field_3', 'field_statement_3', jest.fn());
			    test('field_4', 'field_statement_4', () => \{
			      vest.warn();
			      throw new Error();
			    \});
			    test('field_4', 'field_statement_4', () => \{
			      vest.warn();
			    \});
			    test('field_5', 'field_statement_5', () => false);
			    test('field_5', 'field_statement_6', () => false);
			  \});
			\}
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\__tests__\\integration.stateful-tests.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(13)
    });
    it('ealush_vest\\packages\\vest\\src\\__tests__\\isolate.test.ts', () => {
        const sourceCode = `
			import mockThrowError from '../../testUtils/mockThrowError';
			
			import \{ IsolateTypes \} from 'IsolateTypes';
			
			describe('isolate', () => \{
			  let firstRun = true;
			  let vest, isolate, skipWhen, dummyTest;
			  let deferThrow;
			
			  beforeEach(() => \{
			    firstRun = true;
			    const mock = mockThrowError();
			    deferThrow = mock.deferThrow;
			    vest = mock.vest;
			    skipWhen = vest.skipWhen;
			    isolate = require('isolate').isolate;
			    dummyTest = require('../../testUtils/testDummy').dummyTest;
			  \});
			
			  afterEach(() => \{
			    jest.resetModules();
			    jest.resetAllMocks();
			  \});
			
			  describe('Base behavior', () => \{
			    it("Should throw an error if the callback isn't a function", () => \{
			      expect(() => isolate(\{\}, 'not a function')).toThrow();
			    \});
			
			    it('Should retain test results between runs', () => \{
			      const f1 = jest.fn(() => false);
			      const f2 = jest.fn(() => false);
			      const suite = genSuite(() => \{
			        skipWhen(!firstRun, () => \{
			          isolate(\{ type: IsolateTypes.DEFAULT \}, () => \{
			            vest.test('f1', f1);
			            vest.test('f2', f2);
			          \});
			        \});
			      \});
			
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(true);
			      expect(suite.get().hasErrors('f2')).toBe(true);
			      expect(f1).toHaveBeenCalledTimes(1);
			      expect(f2).toHaveBeenCalledTimes(1);
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(true);
			      expect(suite.get().hasErrors('f2')).toBe(true);
			      expect(f1).toHaveBeenCalledTimes(1);
			      expect(f2).toHaveBeenCalledTimes(1);
			    \});
			  \});
			
			  describe('When order changes within the isolate', () => \{
			    it('Should contain test order changes within the isolate', () => \{
			      const suite = genSuite(() => \{
			        dummyTest.failing('f1');
			
			        isolate(\{ type: IsolateTypes.EACH \}, () => \{
			          dummyTest.failing('f2');
			          if (!firstRun) \{
			            dummyTest.failing('f3');
			            dummyTest.failing('f4');
			          \}
			        \});
			
			        vest.skipWhen(!firstRun, () => \{
			          dummyTest.failing('f5');
			        \});
			      \});
			
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(true);
			      expect(suite.get().hasErrors('f2')).toBe(true);
			      expect(suite.get().hasErrors('f3')).toBe(false);
			      expect(suite.get().hasErrors('f4')).toBe(false);
			      expect(suite.get().hasErrors('f5')).toBe(true);
			      expect(suite.get().tests.f1).toBeDefined();
			      expect(suite.get().tests.f2).toBeDefined();
			      expect(suite.get().tests.f3).toBeUndefined();
			      expect(suite.get().tests.f4).toBeUndefined();
			      expect(suite.get().tests.f5).toBeDefined();
			
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(true);
			      expect(suite.get().hasErrors('f2')).toBe(true);
			      expect(suite.get().hasErrors('f3')).toBe(true);
			      expect(suite.get().hasErrors('f4')).toBe(true);
			
			      // without "isolate" this assertion would fail
			      // because the test would have been overwritten
			      expect(suite.get().hasErrors('f5')).toBe(true);
			
			      expect(suite.get().tests.f1).toBeDefined();
			      expect(suite.get().tests.f2).toBeDefined();
			      expect(suite.get().tests.f3).toBeDefined();
			      expect(suite.get().tests.f4).toBeDefined();
			      expect(suite.get().tests.f5).toBeDefined();
			    \});
			
			    it('Should only retain the state of the unmoved state before the order index', () => \{
			      const suite = genSuite(() => \{
			        isolate(\{ type: IsolateTypes.EACH \}, () => \{
			          skipWhen(!firstRun, () => \{
			            dummyTest.failing('f1');
			          \});
			          if (!firstRun) \{
			            dummyTest.failing('f2');
			          \}
			          skipWhen(!firstRun, () => \{
			            dummyTest.failing('f3');
			          \});
			        \});
			
			        suite();
			        expect(suite.get().hasErrors('f1')).toBe(true);
			        expect(suite.get().hasErrors('f2')).toBe(false);
			        expect(suite.get().hasErrors('f3')).toBe(true);
			        expect(suite.get().tests.f1).toBeDefined();
			        expect(suite.get().tests.f2).toBeUndefined();
			        expect(suite.get().tests.f3).toBeDefined();
			
			        suite();
			        expect(suite.get().hasErrors('f1')).toBe(true);
			        expect(suite.get().hasErrors('f2')).toBe(true);
			        expect(suite.get().hasErrors('f3')).toBe(false);
			        expect(suite.get().tests.f1).toBeDefined();
			        expect(suite.get().tests.f2).toBeDefined();
			        expect(suite.get().tests.f3).toBeDefined();
			      \});
			    \});
			  \});
			
			  describe('When test order changes before the isolate opens', () => \{
			    it('Should clean up follow up tests. Reregister', () => \{
			      const suite = genSuite(() => \{
			        dummyTest.failing('f1');
			        if (!firstRun) \{
			          dummyTest.failing('f6');
			        \}
			
			        // this way we can tell if the state is kept or discarded.
			        // if the state is kept, they should be invalid. Otherwise
			        // they should be untested.
			        skipWhen(!firstRun, () => \{
			          isolate(\{ type: IsolateTypes.EACH \}, () => \{
			            dummyTest.failing('f2');
			            dummyTest.failing('f3');
			            dummyTest.failing('f4');
			          \});
			
			          dummyTest.failing('f5');
			        \});
			      \});
			
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(true);
			      expect(suite.get().hasErrors('f2')).toBe(true);
			      expect(suite.get().hasErrors('f3')).toBe(true);
			      expect(suite.get().hasErrors('f4')).toBe(true);
			      expect(suite.get().hasErrors('f5')).toBe(true);
			      expect(suite.get().hasErrors('f6')).toBe(false);
			      expect(suite.get().tests.f1).toBeDefined();
			      expect(suite.get().tests.f2).toBeDefined();
			      expect(suite.get().tests.f3).toBeDefined();
			      expect(suite.get().tests.f4).toBeDefined();
			      expect(suite.get().tests.f5).toBeDefined();
			      expect(suite.get().tests.f6).toBeUndefined();
			
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(true);
			      expect(suite.get().hasErrors('f2')).toBe(false);
			      expect(suite.get().hasErrors('f3')).toBe(false);
			      expect(suite.get().hasErrors('f4')).toBe(false);
			      expect(suite.get().hasErrors('f5')).toBe(false);
			      expect(suite.get().hasErrors('f6')).toBe(true);
			      expect(suite.get().tests.f1).toBeDefined();
			      expect(suite.get().tests.f2).toBeDefined();
			      expect(suite.get().tests.f3).toBeDefined();
			      expect(suite.get().tests.f4).toBeDefined();
			      expect(suite.get().tests.f5).toBeDefined();
			      expect(suite.get().tests.f6).toBeDefined();
			    \});
			  \});
			
			  describe('When an incorrect isolate is encountered', () => \{
			    it('Should replace isolate completely', () => \{
			      const suite = genSuite(() => \{
			        if (firstRun) \{
			          isolate(\{ type: IsolateTypes.EACH \}, () => \{
			            dummyTest.failing('f1');
			          \});
			        \} else \{
			          isolate(\{ type: IsolateTypes.EACH \}, () => \{
			            dummyTest.failing('f2');
			          \});
			        \}
			      \});
			
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(true);
			      expect(suite.get().hasErrors('f2')).toBe(false);
			      expect(suite.get().tests.f1).toBeDefined();
			      expect(suite.get().tests.f2).toBeUndefined();
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(false);
			      expect(suite.get().hasErrors('f2')).toBe(true);
			      expect(suite.get().tests.f1).toBeUndefined();
			      expect(suite.get().tests.f2).toBeDefined();
			    \});
			  \});
			
			  describe('When an isolate is present when a test was expected', () => \{
			    it('Should erase test history, and re-register', () => \{
			      const suite = genSuite(() => \{
			        if (firstRun) \{
			          dummyTest.failing('f1');
			        \} else \{
			          isolate(\{ type: IsolateTypes.EACH \}, () => \{
			            dummyTest.failing('f2');
			          \});
			        \}
			      \});
			
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(true);
			      expect(suite.get().hasErrors('f2')).toBe(false);
			      expect(suite.get().tests.f1).toBeDefined();
			      expect(suite.get().tests.f2).toBeUndefined();
			      suite();
			      expect(suite.get().hasErrors('f1')).toBe(false);
			      expect(suite.get().hasErrors('f2')).toBe(true);
			      expect(suite.get().tests.f1).toBeUndefined();
			      expect(suite.get().tests.f2).toBeDefined();
			    \});
			
			    describe('Errors', () => \{
			      it('should throw a deferred error when the tests are out of order', () => \{
			        const suite = genSuite(() => \{
			          isolate(\{ type: IsolateTypes.GROUP \}, () => \{
			            dummyTest.failing(firstRun ? 'f1' : 'f2');
			          \});
			        \});
			
			        suite();
			        expect(deferThrow).toHaveBeenCalledTimes(0);
			        suite();
			        expect(deferThrow).toHaveBeenCalledTimes(1);
			        expect(deferThrow).toHaveBeenCalledWith(
			          expect.stringContaining(
			            'Vest Critical Error: Tests called in different order than previous run'
			          )
			        );
			      \});
			
			      it('Should allow unordered tests within an each isolate', () => \{
			        const suite = genSuite(() => \{
			          isolate(\{ type: IsolateTypes.EACH \}, () => \{
			            dummyTest.failing(firstRun ? 'f1' : 'f2');
			          \});
			        \});
			
			        suite();
			        expect(deferThrow).toHaveBeenCalledTimes(0);
			        suite();
			        expect(deferThrow).toHaveBeenCalledTimes(0);
			      \});
			    \});
			  \});
			
			  function genSuite(cb) \{
			    return vest.create(() => \{
			      cb();
			      firstRun = false;
			    \});
			  \}
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\__tests__\\isolate.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\vest\\src\\__tests__\\state_refill.test.ts', () => {
        const sourceCode = `
			import * as vest from 'vest';
			
			describe('state refill', () => \{
			  it('Should refill test state according to the execution order', () => \{
			    const suiteStates = [];
			    const suite = vest.create(() => \{
			      const currentRun = [suite.get()];
			      expect(suite.get().hasErrors('field1')).toBe(false);
			      vest.test('field1', () => false);
			      expect(suite.get().tests.field1.errorCount).toBe(1);
			      currentRun.push(suite.get());
			      vest.test('field1', () => false);
			      expect(suite.get().tests.field1.errorCount).toBe(2);
			      currentRun.push(suite.get());
			      expect(suite.get().hasErrors('field2')).toBe(false);
			      vest.test('field2', () => false);
			      currentRun.push(suite.get());
			      vest.test('field2', () => true);
			      expect(suite.get().tests.field2.errorCount).toBe(1);
			      currentRun.push(suite.get());
			      expect(suite.get().hasErrors('field3')).toBe(false);
			      vest.test('field3', () => undefined);
			      expect(suite.get().hasErrors('field3')).toBe(false);
			      expect(suite.get().tests.field3.errorCount).toBe(0);
			      currentRun.push(suite.get());
			      expect(suite.get().hasWarnings('field4')).toBe(false);
			      vest.test('field4', () => \{
			        vest.warn();
			        return false;
			      \});
			      expect(suite.get().hasWarnings('field4')).toBe(true);
			      currentRun.push(suite.get());
			      suiteStates.push(currentRun);
			    \});
			
			    expect(suite()).isDeepCopyOf(suite());
			    suiteStates[0].forEach((suiteState, i) => \{
			      expect(suiteState).isDeepCopyOf(suiteStates[1][i]);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\src\\__tests__\\state_refill.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\vest\\testUtils\\testDummy.ts', () => {
        const sourceCode = `
			/* eslint-disable jest/valid-title */
			import faker from 'faker';
			
			import \{ test, warn \} from 'vest';
			
			/**
			 * Generates dummy vest tests.
			 */
			const testDummy = () => \{
			  const failing = (
			    name: string = faker.random.word(),
			    message: string = faker.random.words(),
			    groupName?: string
			  ) => \{
			    const to = test(
			      name,
			      message,
			      jest.fn(() => \{
			        throw new Error();
			      \})
			    );
			
			    if (groupName) \{
			      to.groupName = groupName;
			    \}
			
			    return to;
			  \};
			
			  const failingWarning = (
			    name = faker.random.word(),
			    message = faker.random.words(),
			    groupName?: string
			  ) => \{
			    const to = test(
			      name,
			      message,
			      jest.fn(() => \{
			        warn();
			        throw new Error();
			      \})
			    );
			
			    if (groupName) \{
			      to.groupName = groupName;
			    \}
			
			    return to;
			  \};
			
			  const passing = (
			    name = faker.random.word(),
			    message = faker.random.words(),
			    groupName?: string
			  ) => \{
			    const to = test(name, message, jest.fn());
			
			    if (groupName) \{
			      to.groupName = groupName;
			    \}
			
			    return to;
			  \};
			
			  const passingWarning = (
			    name = faker.random.word(),
			    message = faker.random.words(),
			    groupName?: string
			  ) => \{
			    const to = test(
			      name,
			      message,
			      jest.fn(() => \{
			        warn();
			      \})
			    );
			    if (groupName) \{
			      to.groupName = groupName;
			    \}
			    return to;
			  \};
			
			  const failingAsync = (
			    name = faker.random.word(),
			    \{ message = faker.random.words(), time = 0 \} = \{\}
			  ) =>
			    test(
			      name,
			      message,
			      jest.fn(
			        () =>
			          new Promise((_, reject) => \{
			            setTimeout(reject, time);
			          \})
			      )
			    );
			
			  const failingWarningAsync = (
			    name = faker.random.word(),
			    \{ message = faker.random.words(), time = 0 \} = \{\}
			  ) =>
			    test(
			      name,
			      message,
			      jest.fn(() => \{
			        warn();
			        return new Promise((_, reject) => \{
			          setTimeout(reject, time);
			        \});
			      \})
			    );
			
			  const passingAsync = (
			    name = faker.random.word(),
			    \{ message = faker.random.words(), time = 0 \} = \{\}
			  ) =>
			    test(
			      name,
			      message,
			      jest.fn(
			        () =>
			          new Promise(resolve => \{
			            setTimeout(resolve, time);
			          \})
			      )
			    );
			
			  const passingWarningAsync = (
			    name = faker.random.word(),
			    \{ message = faker.random.words(), time = 0 \} = \{\}
			  ) =>
			    test(
			      name,
			      message,
			      jest.fn(() => \{
			        warn();
			        return new Promise(resolve => \{
			          setTimeout(resolve, time);
			        \});
			      \})
			    );
			
			  return \{
			    failing,
			    failingAsync,
			    failingWarning,
			    failingWarningAsync,
			    passing,
			    passingAsync,
			    passingWarning,
			    passingWarningAsync,
			  \};
			\};
			
			export const dummyTest = testDummy();
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\testUtils\\testDummy.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('ealush_vest\\packages\\vest\\testUtils\\__tests__\\partition.test.ts', () => {
        const sourceCode = `
			import partition from '../partition';
			
			describe('partition', () => \{
			  it('Should correctly partition array', () => \{
			    expect(partition([300, 200, 10, 50, 0, -500], v => v <= 100))
			      .toMatchInlineSnapshot(\`
			      Array [
			        Array [
			          10,
			          50,
			          0,
			          -500,
			        ],
			        Array [
			          300,
			          200,
			        ],
			      ]
			    \`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest\\testUtils\\__tests__\\partition.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\bindNot.test.ts', () => {
        const sourceCode = `
			import \{ bindNot \} from 'vest-utils';
			
			describe('bindNot', () => \{
			  it('Should return return a function', () => \{
			    expect(typeof bindNot(jest.fn())).toBe('function');
			  \});
			
			  test('calling returned function runs accepted function', () => \{
			    const fn = jest.fn();
			
			    expect(fn).not.toHaveBeenCalled();
			    const not = bindNot(fn);
			    expect(fn).not.toHaveBeenCalled();
			    not();
			    expect(fn).toHaveBeenCalledTimes(1);
			  \});
			
			  it('Should pass arguments to accepted function', () => \{
			    const fn = jest.fn();
			
			    const not = bindNot(fn);
			    not(1, 2, 3, 4);
			    expect(fn).toHaveBeenCalledWith(1, 2, 3, 4);
			  \});
			
			  it('Should return the boolean negation of the original function', () => \{
			    expect(bindNot(() => true)()).toBe(false);
			    expect(bindNot(() => false)()).toBe(true);
			    expect(bindNot(() => 'string')()).toBe(false);
			    expect(bindNot(() => [])()).toBe(false);
			    expect(bindNot(() => '')()).toBe(true);
			    expect(bindNot(() => 0)()).toBe(true);
			    expect(bindNot(() => NaN)()).toBe(true);
			    expect(bindNot(() => null)()).toBe(true);
			    expect(bindNot(() => undefined)()).toBe(true);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\bindNot.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\bus.test.ts', () => {
        const sourceCode = `
			import \{ createBus \} from 'bus';
			
			describe('bus', () => \{
			  it('should be a function', () => \{
			    expect(createBus).toBeInstanceOf(Function);
			  \});
			
			  it('should return a bus', () => \{
			    const bus = createBus();
			    expect(bus).toBeInstanceOf(Object);
			    expect(bus.emit).toBeInstanceOf(Function);
			    expect(bus.on).toBeInstanceOf(Function);
			  \});
			
			  it('should emit events', () => \{
			    const bus = createBus();
			    const spy = jest.fn();
			    bus.on('test', spy);
			    bus.emit('test');
			    expect(spy).toHaveBeenCalled();
			  \});
			
			  it('should emit events with data', () => \{
			    const bus = createBus();
			    const spy = jest.fn();
			    bus.on('test', spy);
			    bus.emit('test', 'testData');
			    expect(spy).toHaveBeenCalledWith('testData');
			  \});
			
			  it('should emit events with multiple listeners', () => \{
			    const bus = createBus();
			    const spy1 = jest.fn();
			    const spy2 = jest.fn();
			    bus.on('test', spy1);
			    bus.on('test', spy2);
			    bus.emit('test');
			    expect(spy1).toHaveBeenCalled();
			    expect(spy2).toHaveBeenCalled();
			  \});
			
			  it('should emit events with multiple listeners and data', () => \{
			    const bus = createBus();
			    const spy1 = jest.fn();
			    const spy2 = jest.fn();
			    bus.on('test', spy1);
			    bus.on('test', spy2);
			    bus.emit('test', 'test1');
			    expect(spy1).toHaveBeenCalledWith('test1');
			    expect(spy2).toHaveBeenCalledWith('test1');
			  \});
			
			  test('on returns an object with an \`off\` function', () => \{
			    const bus = createBus();
			    const spy = jest.fn();
			    const off = bus.on('test', spy);
			    expect(off).toBeInstanceOf(Object);
			    expect(off.off).toBeInstanceOf(Function);
			  \});
			
			  test('off should remove a listener', () => \{
			    const bus = createBus();
			    const spy = jest.fn();
			    const off = bus.on('test', spy);
			    off.off();
			    bus.emit('test');
			    expect(spy).not.toHaveBeenCalled();
			  \});
			
			  test('off should only remove specific handler', () => \{
			    const bus = createBus();
			    const spy1 = jest.fn();
			    const spy2 = jest.fn();
			    const off = bus.on('test', spy1);
			    bus.on('test', spy2);
			    off.off();
			    bus.emit('test');
			    expect(spy1).not.toHaveBeenCalled();
			    expect(spy2).toHaveBeenCalled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\bus.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\cache.test.ts', () => {
        const sourceCode = `
			import _ from 'lodash';
			
			import \{ cache \} from 'vest-utils';
			
			describe('lib: cache', () => \{
			  let c: ReturnType<typeof cache>;
			
			  beforeEach(() => \{
			    c = cache();
			  \});
			  it('should return a function', () => \{
			    expect(typeof cache()).toBe('function');
			  \});
			
			  it('Should create a new function on each call', () => \{
			    expect(cache()).not.toBe(cache());
			  \});
			
			  describe('on cache miss', () => \{
			    it('Should call passed cache action function and return its value', () => \{
			      const cacheAction = jest.fn(() => (\{\}));
			      const res = c([\{\}], cacheAction);
			      expect(cacheAction).toHaveBeenCalledTimes(1);
			      expect(res).toBe(cacheAction.mock.results[0].value);
			    \});
			  \});
			
			  describe('On cache hit', () => \{
			    it('Should return cached result', () => \{
			      const cacheAction = jest.fn(() => \{
			        Math.random();
			      \});
			      const depsArray = [true, false, \{\}];
			      const res1 = c(depsArray, cacheAction);
			      expect(res1).toBe(cacheAction.mock.results[0].value);
			      const res2 = c(depsArray, cacheAction);
			      expect(res2).toBe(res1);
			    \});
			
			    it('Should return without calling the cache action', () => \{
			      const cacheAction = jest.fn();
			      const depsArray = [Math.random()];
			      c(depsArray, cacheAction);
			      expect(cacheAction).toHaveBeenCalledTimes(1);
			      c(depsArray, cacheAction);
			      expect(cacheAction).toHaveBeenCalledTimes(1);
			    \});
			
			    it('Should limit cache results to \`maxSize\`', () => \{
			      const cacheSize = _.random(5, 10);
			      const callCount = _.random(cacheSize, cacheSize + 10);
			      const diff = callCount - cacheSize;
			      /**
			       * Doing a nested check to combat the auto cleanup of the cache.
			       * Otherwise, each access to the cache would purge the oldest results
			       * and we wouldn't get an accurate read - so instantiating a new cache
			       * for each index is a good workaround.
			       */
			      Array.from(\{ length: callCount \}, (_, i) => \{
			        const c = cache(/*maxSize*/ cacheSize);
			        const results = Array.from(\{ length: callCount \}, (_, j) =>
			          c([j], Math.random)
			        );
			
			        if (i < diff) \{
			          // Here we generate a fresh \`null\` result
			          expect(c([i], () => null)).toBeNull();
			        \} else \{
			          // Here we retrieve an existing result
			          expect(c([i], () => null)).toBe(results[i]);
			        \}
			      \});
			    \});
			  \});
			  it('Should take into account the deps array in its entirety', () => \{
			    const deps = Array.from(\{ length: 100 \}, () =>
			      _.sample([\{\}, false, Math.random(), true, () => null])
			    );
			    const c = cache();
			    const res = c([...deps], Math.random);
			    expect(c([...deps], () => undefined)).toBe(res);
			    const sliced = deps.slice(0, -1);
			    expect(c(sliced, () => null)).toBeNull();
			  \});
			
			  describe('cache.get', () => \{
			    describe('On cache miss', () => \{
			      it('Should return null', () => \{
			        expect(c.get([1, 2, 3])).toBeNull();
			        c([1, 2, 3], Math.random);
			        expect(c.get([1, 2, '3'])).toBeNull();
			      \});
			    \});
			
			    describe('On cache hit', () => \{
			      it('Should return cached key and item from cache storage', () => \{
			        const res = c([1, 2, 3], Math.random);
			        expect(c.get([1, 2, 3])?.[0]).toEqual([1, 2, 3]);
			        expect(c.get([1, 2, 3])?.[1]).toEqual(res);
			      \});
			    \});
			  \});
			
			  describe('cache.invalidate', () => \{
			    it('Should remove cached item from cache storage by its dependcies', () => \{
			      const deps = [1, 2, 3];
			      c(deps, Math.random);
			      expect(c.get(deps)).not.toBeNull();
			      c.invalidate(deps);
			      expect(c.get(deps)).toBeNull();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\cache.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(10)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\defaultTo.test.ts', () => {
        const sourceCode = `
			import \{ defaultTo \} from 'vest-utils';
			
			describe('defaultTo', () => \{
			  describe('When value is a function', () => \{
			    it('Should call the function', () => \{
			      const value = jest.fn(() => 'return value');
			
			      expect(defaultTo(value, 'fallback value')).toBe('return value');
			      expect(value).toHaveBeenCalled();
			    \});
			    describe('When value is nullish', () => \{
			      it('Should return fallback value', () => \{
			        expect(defaultTo(null, 'fallback value')).toBe('fallback value');
			        expect(defaultTo(undefined, 'fallback value')).toBe('fallback value');
			      \});
			    \});
			
			    describe('When value is not nullish', () => \{
			      it('Should use value', () => \{
			        expect(defaultTo('value', 'fallback value')).toBe('value');
			      \});
			    \});
			  \});
			
			  describe('When value is not a function', () => \{
			    describe('When the value is nullish', () => \{
			      it('Should return fallback value', () => \{
			        expect(defaultTo(null, 'fallback value')).toBe('fallback value');
			        expect(defaultTo(undefined, 'fallback value')).toBe('fallback value');
			      \});
			    \});
			    describe('When the value is not nullish', () => \{
			      it.each([0, false, true, 1, [], \{\}, NaN])(
			        'Should return the same value',
			        value => \{
			          expect(defaultTo(value, 'fallback value')).toBe(value);
			        \}
			      );
			    \});
			  \});
			
			  describe('When the fallback value is a function', () => \{
			    it('Should call the function and return its return value', () => \{
			      const fallbackValue = jest.fn(() => 'fallback value');
			
			      expect(defaultTo(null, fallbackValue)).toBe('fallback value');
			      expect(fallbackValue).toHaveBeenCalled();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\defaultTo.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\deferThrow.test.ts', () => {
        const sourceCode = `
			import \{ deferThrow \} from 'vest-utils';
			
			// @ts-ignore
			const _to = global.setTimeout;
			describe('deferThrow', () => \{
			  beforeEach(() => \{
			    // @ts-ignore
			    global.setTimeout = jest.fn();
			  \});
			
			  afterEach(() => \{
			    global.setTimeout = _to;
			  \});
			  it('Should start a timer', () => \{
			    deferThrow();
			    expect(global.setTimeout).toHaveBeenCalled();
			  \});
			
			  it('Should throw a timed out error with the provided message', () => \{
			    deferThrow('message');
			    const timeoutCB = global.setTimeout.mock.calls[0][0];
			    expect(() => timeoutCB()).toThrow('message');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\deferThrow.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\greaterThan.test.ts', () => {
        const sourceCode = `
			import \{ random, datatype \} from 'faker';
			
			import \{ greaterThan \} from 'greaterThan';
			
			describe('Tests greaterThan rule', () => \{
			  let arg0;
			
			  describe('Arguments are numbers', () => \{
			    beforeEach(() => \{
			      arg0 = datatype.number();
			    \});
			
			    describe('When first argument is larger', () => \{
			      it('Should return true', () => \{
			        expect(greaterThan(arg0, arg0 - 1)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return true', () => \{
			        expect(greaterThan(arg0, arg0 + 1)).toBe(false);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return false', () => \{
			        expect(greaterThan(arg0, arg0)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('Arguments are numeric strings', () => \{
			    describe('When first argument is larger', () => \{
			      it('Should return true', () => \{
			        expect(greaterThan(\`\$\{arg0\}\`, \`\$\{arg0 - 1\}\`)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return true', () => \{
			        expect(greaterThan(\`\$\{arg0\}\`, \`\$\{arg0 + 1\}\`)).toBe(false);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return false', () => \{
			        expect(greaterThan(arg0, arg0)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe('Arguments are non numeric', () => \{
			    [random.word(), \`\$\{datatype.number()\}\`.split(''), \{\}].forEach(element => \{
			      it('Should return false', () => \{
			        expect(greaterThan(element, 0)).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\greaterThan.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\invariant.test.ts', () => {
        const sourceCode = `
			import \{ invariant \} from 'vest-utils';
			
			describe('invariant', () => \{
			  it('should throw an error when condition is false', () => \{
			    expect(() => \{
			      invariant(false, 'message');
			    \}).toThrow(Error);
			  \});
			
			  it("Should throw an error with the message if it's a string", () => \{
			    expect(() => \{
			      invariant(false, 'message');
			    \}).toThrow('message');
			  \});
			
			  it('should contintue when condition is true', () => \{
			    expect(() => \{
			      invariant(true, 'message');
			    \}).not.toThrow();
			  \});
			
			  describe('When passed message is a string object', () => \{
			    it('should throw the value of the string object', () => \{
			      expect(() => \{
			        invariant(false, new String('message'));
			      \}).toThrow('message');
			    \});
			  \});
			
			  describe('Shen passed message is a function', () => \{
			    it('should throw the value of the function', () => \{
			      expect(() => \{
			        invariant(false, () => 'message');
			      \}).toThrow('message');
			    \});
			  \});
			
			  describe('When message is falsy', () => \{
			    it('should throw an error with the message', () => \{
			      expect(() => \{
			        invariant(false, '');
			      \}).toThrow('');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\invariant.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\isArray.test.ts', () => {
        const sourceCode = `
			import \{ isArray \} from 'isArrayValue';
			
			describe('Tests isArray rule', () => \{
			  it('Should return true for an empty array', () => \{
			    expect(isArray([])).toBe(true);
			  \});
			
			  it('Should return true for an array with elements', () => \{
			    expect(isArray([1, 2, 3])).toBe(true);
			  \});
			
			  it('Should return false a string', () => \{
			    expect(isArray('1')).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\isArray.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\isNull.test.ts', () => {
        const sourceCode = `
			import \{ isNull \} from 'isNull';
			
			describe('Tests isNull rule', () => \{
			  it('Should return true for \`null\` value', () => \{
			    expect(isNull(null)).toBe(true);
			  \});
			
			  it.each([
			    undefined,
			    NaN,
			    false,
			    true,
			    Object,
			    Array(0),
			    '',
			    ' ',
			    0,
			    1,
			    '0',
			    '1',
			    Function.prototype,
			  ])('Should return false for %s value', v => \{
			    expect(isNull(v)).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\isNull.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\isNumeric.test.ts', () => {
        const sourceCode = `
			import \{ isNumeric \} from 'isNumeric';
			
			const NUMERICS = ['-10', '0', 0xff, '0xFF', '8e5', '3.1415', +10, '0144'];
			
			const NON_NUMERICS = [
			  '-0x42',
			  '7.2acdgs',
			  '',
			  \{\},
			  NaN,
			  null,
			  true,
			  Infinity,
			  undefined,
			];
			
			describe('Tests isNumeric rule', () => \{
			  it('Should return true for numeric values', () => \{
			    NUMERICS.forEach(value => expect(isNumeric(value)).toBe(true));
			  \});
			
			  it('Should return false for non numeric values', () => \{
			    // @ts-expect-error - testing bad usage
			    NON_NUMERICS.forEach(value => expect(isNumeric(value)).toBe(false));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\isNumeric.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\isUndefined.test.ts', () => {
        const sourceCode = `
			import \{ isUndefined \} from 'isUndefined';
			
			describe('Tests isUndefined rule', () => \{
			  it('Should return true for \`undefined\` value', () => \{
			    expect(isUndefined(undefined)).toBe(true);
			    expect(isUndefined()).toBe(true);
			  \});
			
			  it.each([
			    null,
			    NaN,
			    false,
			    true,
			    Object,
			    Array(0),
			    '',
			    ' ',
			    0,
			    1,
			    '0',
			    '1',
			    () => undefined,
			  ])('Should return false for %s value', v => \{
			    expect(isUndefined(v)).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\isUndefined.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\lengthEquals.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ lengthEquals \} from 'lengthEquals';
			
			describe('Tests lengthEquals rule', () => \{
			  const length = faker.datatype.number();
			  const word = faker.random.word();
			  const boolean = faker.datatype.boolean();
			
			  describe('First argument is array or string', () => \{
			    describe('When first argument is equal to a given value', () => \{
			      it('Should return true for an array equal to length', () => \{
			        expect(lengthEquals(new Array(length), length)).toBe(true);
			      \});
			
			      it('Should return true for a string equal to word length', () => \{
			        expect(lengthEquals(word, word.length)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is shorter', () => \{
			      it('Should return false for an array shorter than length', () => \{
			        expect(lengthEquals(new Array(length), length + 1)).toBe(false);
			      \});
			
			      it('Should return false for a string shorter than word length', () => \{
			        expect(lengthEquals(word, word.length + 1)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is longer', () => \{
			      it('Should return false for an array longer than length', () => \{
			        expect(lengthEquals(new Array(length), length - 1)).toBe(false);
			      \});
			
			      it('Should return false for a string longer than word length', () => \{
			        expect(lengthEquals(word, word.length - 1)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe("First argument isn't array or string", () => \{
			    it('Should throw error', () => \{
			      // @ts-expect-error - testing wrong input
			      expect(() => lengthEquals(undefined, 0)).toThrow(TypeError);
			    \});
			
			    it('Should return false for number argument', () => \{
			      expect(lengthEquals(length, 0)).toBe(false);
			    \});
			
			    it('Should return false for boolean argument', () => \{
			      expect(lengthEquals(boolean, 0)).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\lengthEquals.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\longerThan.test.ts', () => {
        const sourceCode = `
			import faker from 'faker';
			
			import \{ longerThan \} from 'longerThan';
			
			describe('Tests longerThan rule', () => \{
			  const length = faker.datatype.number();
			  const word = faker.random.word();
			  const boolean = faker.datatype.boolean();
			
			  describe('First argument is array or string', () => \{
			    describe('When first argument is longer', () => \{
			      it('Should return true for an array longer than length', () => \{
			        expect(longerThan(new Array(length), length - 1)).toBe(true);
			      \});
			
			      it('Should return true for a string longer than word length', () => \{
			        expect(longerThan(word, word.length - 1)).toBe(true);
			      \});
			    \});
			
			    describe('When first argument is shorter', () => \{
			      it('Should return false for an array shorter than length', () => \{
			        expect(longerThan(new Array(length), length + 1)).toBe(false);
			      \});
			
			      it('Should return false for a string shorter than word length', () => \{
			        expect(longerThan(word, word.length + 1)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is equal to a given value', () => \{
			      it('Should return false for an array equal to length', () => \{
			        expect(longerThan(new Array(length), length)).toBe(false);
			      \});
			
			      it('Should return false for a string equal to word length', () => \{
			        expect(longerThan(word, word.length)).toBe(false);
			      \});
			    \});
			  \});
			
			  describe("First argument isn't array or string", () => \{
			    it('Should throw error', () => \{
			      // @ts-expect-error - testing wrong input
			      expect(() => longerThan(undefined, 0)).toThrow(TypeError);
			    \});
			
			    it('Should return false for number argument', () => \{
			      expect(longerThan(length, 0)).toBe(false);
			    \});
			
			    it('Should return false for boolean argument', () => \{
			      expect(longerThan(boolean, 0)).toBe(false);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\longerThan.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\mapFirst.test.ts', () => {
        const sourceCode = `
			import \{ mapFirst \} from 'vest-utils';
			
			describe('mapFirst', () => \{
			  it('should return the broken out result', () => \{
			    const result = mapFirst([1, 2, 3], (value, breakout) => \{
			      breakout(value === 3, \{ pass: true \});
			    \});
			
			    expect(result).toEqual(\{ pass: true \});
			  \});
			
			  it('Should respect the breakout conditional', () => \{
			    const result = mapFirst([1, 2, 3], (_, breakout) => \{
			      breakout(false, 0);
			      breakout(false, 0);
			      breakout(true, 1);
			    \});
			
			    expect(result).toBe(1);
			  \});
			
			  describe('When not broken out', () => \{
			    it('Should return undefined', () => \{
			      const result = mapFirst([1, 2, 3], () => \{\});
			
			      expect(result).toBeUndefined();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\mapFirst.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\numberEquals.test.ts', () => {
        const sourceCode = `
			import \{ random, datatype \} from 'faker';
			
			import \{ numberEquals \} from 'numberEquals';
			
			describe('Tests numberEquals rule', () => \{
			  let arg0;
			
			  describe('Arguments are numbers', () => \{
			    beforeEach(() => \{
			      arg0 = datatype.number();
			    \});
			
			    describe('When first argument is larger', () => \{
			      it('Should return false', () => \{
			        expect(numberEquals(arg0, arg0 - 1)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return false', () => \{
			        expect(numberEquals(arg0, arg0 + 1)).toBe(false);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return true', () => \{
			        expect(numberEquals(arg0, arg0)).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('Arguments are numeric strings', () => \{
			    describe('When first argument is larger', () => \{
			      it('Should return false', () => \{
			        expect(numberEquals(\`\$\{arg0\}\`, \`\$\{arg0 - 1\}\`)).toBe(false);
			      \});
			    \});
			
			    describe('When first argument is smaller', () => \{
			      it('Should return false', () => \{
			        expect(numberEquals(\`\$\{arg0\}\`, \`\$\{arg0 + 1\}\`)).toBe(false);
			      \});
			    \});
			
			    describe('When values are equal', () => \{
			      it('Should return true', () => \{
			        expect(numberEquals(arg0, arg0)).toBe(true);
			      \});
			    \});
			  \});
			
			  describe('Arguments are non numeric', () => \{
			    [random.word(), \`\$\{datatype.number()\}\`.split(''), \{\}].forEach(element => \{
			      it('Should return false', () => \{
			        expect(numberEquals(element, 0)).toBe(false);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\numberEquals.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\optionalFunctionValue.test.ts', () => {
        const sourceCode = `
			import \{ optionalFunctionValue \} from 'vest-utils';
			
			describe('optionalFunctionValue', () => \{
			  describe('When not a function', () => \{
			    it.each([0, undefined, false, true, 1, [], \{\}, null, NaN])(
			      'Should return the same value',
			      value => \{
			        expect(optionalFunctionValue(value)).toBe(value);
			      \}
			    );
			  \});
			
			  describe('When value is a function', () => \{
			    it('Should call the function and return its return value', () => \{
			      const value = jest.fn(() => 'return value');
			
			      expect(optionalFunctionValue(value)).toBe('return value');
			      expect(value).toHaveBeenCalled();
			    \});
			    it('Should run with arguments arry', () => \{
			      const value = jest.fn((...args) => args.join('|'));
			      const args = [1, 2, 3, 4];
			      expect(optionalFunctionValue(value, ...args)).toBe('1|2|3|4');
			      expect(value).toHaveBeenCalledWith(...args);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\optionalFunctionValue.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('ealush_vest\\packages\\vest-utils\\src\\__tests__\\seq.test.ts', () => {
        const sourceCode = `
			import seq, \{ genSeq \} from 'seq';
			
			describe('lib:seq', () => \{
			  it('Should return a new id on each run', () => \{
			    Array.from(\{ length: 100 \}, () => seq()).reduce((existing, seq) => \{
			      expect(existing).not.toHaveProperty(seq.toString());
			      Object.assign(existing, \{ [seq]: true \});
			      expect(existing).toHaveProperty(seq.toString());
			      return existing;
			    \}, \{\});
			  \});
			
			  describe('genSeq', () => \{
			    it('Creates a namespaced sequence', () => \{
			      const seq = genSeq('test');
			      expect(seq()).toBe('test_0');
			      expect(seq()).toBe('test_1');
			      expect(seq()).toBe('test_2');
			
			      const seq2 = genSeq('test2');
			      expect(seq2()).toBe('test2_0');
			      expect(seq2()).toBe('test2_1');
			      expect(seq2()).toBe('test2_2');
			
			      expect(seq()).toBe('test_3');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'ealush_vest\\packages\\vest-utils\\src\\__tests__\\seq.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
});
