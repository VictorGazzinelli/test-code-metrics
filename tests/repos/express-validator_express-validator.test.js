const { extractFromSource } = require('../../src/extractor');

describe('express-validator_express-validator', () => {
    it('express-validator_express-validator\\src\\chain\\context-handler-impl.spec.ts', () => {
        const sourceCode = `
			import \{ ContextBuilder \} from '../context-builder';
			import \{ ChainCondition, CustomCondition \} from '../context-items';
			import \{ check \} from '../middlewares/check';
			import \{ Bail \} from '../context-items/bail';
			import \{ ContextHandler, ContextHandlerImpl \} from './';
			
			let builder: ContextBuilder;
			let contextHandler: ContextHandler<any>;
			
			beforeEach(() => \{
			  builder = new ContextBuilder();
			  jest.spyOn(builder, 'setOptional');
			  jest.spyOn(builder, 'setRequestBail');
			  jest.spyOn(builder, 'addItem');
			
			  contextHandler = new ContextHandlerImpl(builder, \{\});
			\});
			
			describe('#bail()', () => \{
			  it('adds a Bail item', () => \{
			    contextHandler.bail();
			    expect(builder.addItem).toHaveBeenCalledWith(new Bail());
			  \});
			
			  it('does not set request bail if level is unset or set to chain', () => \{
			    contextHandler.bail(\{\});
			    contextHandler.bail(\{ level: 'chain' \});
			    expect(builder.setRequestBail).not.toHaveBeenCalled();
			  \});
			
			  it('sets request bail if level is set to request', () => \{
			    contextHandler.bail(\{ level: 'request' \});
			    expect(builder.setRequestBail).toHaveBeenCalled();
			  \});
			\});
			
			describe('#if()', () => \{
			  it('adds a CustomCondition item', () => \{
			    const condition = () => true;
			    contextHandler.if(condition);
			    expect(builder.addItem).toHaveBeenCalledWith(new CustomCondition(condition));
			  \});
			
			  it('adds a ChainCondition item', () => \{
			    const condition = check();
			    contextHandler.if(condition);
			    expect(builder.addItem).toHaveBeenCalledWith(new ChainCondition(condition));
			  \});
			
			  it('throws if condition is not of a known type', () => \{
			    const bomb = () => contextHandler.if(\{\} as any);
			    expect(bomb).toThrowError();
			    expect(builder.addItem).not.toHaveBeenCalled();
			  \});
			\});
			
			describe('#optional()', () => \{
			  it('sets optional flag to undefined if arg is true', () => \{
			    contextHandler.optional();
			    expect(builder.setOptional).toHaveBeenNthCalledWith(1, 'undefined');
			
			    contextHandler.optional(true);
			    expect(builder.setOptional).toHaveBeenNthCalledWith(2, 'undefined');
			  \});
			
			  it('sets optional flag to arg value', () => \{
			    contextHandler.optional(\{ nullable: true \});
			    expect(builder.setOptional).toHaveBeenNthCalledWith(1, 'null');
			
			    contextHandler.optional(\{ checkFalsy: true \});
			    expect(builder.setOptional).toHaveBeenNthCalledWith(2, 'falsy');
			
			    contextHandler.optional(false);
			    expect(builder.setOptional).toHaveBeenNthCalledWith(3, false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\chain\\context-handler-impl.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('express-validator_express-validator\\src\\chain\\context-runner-impl.spec.ts', () => {
        const sourceCode = `
			import \{ Context \} from '../context';
			import \{ FieldInstance, InternalRequest, ValidationHalt, contextsKey \} from '../base';
			import \{ ContextBuilder \} from '../context-builder';
			import \{ ContextItem \} from '../context-items';
			import \{ Result \} from '../validation-result';
			import \{ ContextRunnerImpl \} from './context-runner-impl';
			
			let builder: ContextBuilder;
			let getDataSpy: jest.SpyInstance;
			let addFieldInstancesSpy: jest.SpyInstance;
			let selectFields: jest.Mock;
			let contextRunner: ContextRunnerImpl;
			
			const instances: FieldInstance[] = [
			  \{ location: 'query', path: 'foo', originalPath: 'foo', value: 123 \},
			  \{ location: 'query', path: 'bar', originalPath: 'bar', value: 456 \},
			];
			
			// Used in value persistence tests
			const nullify: ContextItem = \{
			  async run(context, _value, \{ location, path \}) \{
			    context.setData(path, undefined, location);
			  \},
			\};
			
			beforeEach(() => \{
			  builder = new ContextBuilder().setFields(['foo', 'bar']).setLocations(['query']);
			  getDataSpy = jest.spyOn(Context.prototype, 'getData');
			  addFieldInstancesSpy = jest.spyOn(Context.prototype, 'addFieldInstances');
			
			  selectFields = jest.fn().mockReturnValue(instances);
			  contextRunner = new ContextRunnerImpl(builder, selectFields);
			\});
			
			afterEach(() => \{
			  getDataSpy.mockRestore();
			  addFieldInstancesSpy.mockRestore();
			\});
			
			it('returns Result for current context', async () => \{
			  builder.addItem(\{
			    async run(context, value, meta) \{
			      context.addError(\{ type: 'field', value, meta \});
			    \},
			  \});
			  const result = await contextRunner.run(\{\});
			  expect(result).toBeInstanceOf(Result);
			  expect(result.array()).toHaveLength(2);
			\});
			
			it('selects and adds fields to the context', async () => \{
			  const req = \{ query: \{ foo: 123 \} \};
			  await contextRunner.run(req);
			
			  expect(selectFields).toHaveBeenCalledWith(req, ['foo', 'bar'], ['query']);
			  expect(addFieldInstancesSpy).toHaveBeenCalledWith(instances);
			\});
			
			it('runs items on the stack with required data', async () => \{
			  builder.addItem(\{ run: jest.fn() \}, \{ run: jest.fn() \});
			  getDataSpy.mockReturnValue(instances);
			
			  const req = \{ body: \{ foo: 'bar' \} \};
			  const \{ context \} = await contextRunner.run(req);
			
			  context.stack.forEach((item, i) => \{
			    expect(getDataSpy).toHaveBeenNthCalledWith(i + 1, \{ requiredOnly: true \});
			    expect(item.run).toHaveBeenCalledTimes(instances.length);
			
			    instances.forEach((instance, j) => \{
			      expect(item.run).toHaveBeenNthCalledWith(j + 1, context, instance.value, \{
			        req,
			        location: instance.location,
			        path: instance.path,
			      \});
			    \});
			  \});
			\});
			
			it('runs items on the stack in order', async () => \{
			  let item1Resolve = () => \{\};
			  const item1Promise = new Promise<void>(resolve => \{
			    item1Resolve = resolve;
			  \});
			  const item1: ContextItem = \{ run: jest.fn().mockReturnValueOnce(item1Promise) \};
			
			  let item2Resolve = () => \{\};
			  const item2Promise = new Promise<void>(resolve => \{
			    item2Resolve = resolve;
			  \});
			  const item2: ContextItem = \{ run: jest.fn().mockReturnValueOnce(item2Promise) \};
			
			  builder.addItem(item1, item2);
			  getDataSpy.mockReturnValue(instances);
			  const resultPromise = contextRunner.run(\{\});
			
			  // Item 2 hasn't run yet -- the item 1's promise hasn't resolved
			  expect(item1.run).toHaveBeenCalledTimes(2);
			  expect(item2.run).not.toHaveBeenCalled();
			
			  item1Resolve();
			
			  // Make sure whatever promises are still pending are flushed by awaiting on one
			  // that will be completed on the next tick
			  await new Promise(resolve => setTimeout(resolve));
			
			  // Item 1 hasn't run any more times. Item 2 has got the green signal to run.
			  expect(item1.run).toHaveBeenCalledTimes(2);
			  expect(item2.run).toHaveBeenCalledTimes(2);
			
			  // Item 2 is resolved, then so should the context runner
			  item2Resolve();
			  return resultPromise;
			\});
			
			it('does not run items if a previous context halts the whole request', async () => \{
			  const context1 = new ContextBuilder().setRequestBail().build();
			  const context2 = new ContextBuilder().addItem(\{ run: jest.fn() \}).build();
			
			  const req = \{\};
			  context1.addError(\{ type: 'field', value: 1, meta: \{ req, location: 'params', path: 'foo' \} \});
			
			  await new ContextRunnerImpl(context1, selectFields).run(req);
			  await new ContextRunnerImpl(context2, selectFields).run(req);
			
			  expect(context2.stack[0].run).not.toHaveBeenCalled();
			\});
			
			it('stops running items on paths that got a validation halt', async () => \{
			  builder.addItem(
			    \{
			      run: jest.fn().mockImplementationOnce(() => \{
			        throw new ValidationHalt();
			      \}),
			    \},
			    \{ run: jest.fn() \},
			  );
			  getDataSpy.mockReturnValue(instances);
			
			  const req = \{ body: \{ foo: 'bar' \} \};
			  const \{ context \} = await contextRunner.run(req);
			
			  expect(context.stack[1].run).toHaveBeenCalledTimes(1);
			  expect(context.stack[1].run).toHaveBeenCalledWith(context, instances[1].value, \{
			    req,
			    location: instances[1].location,
			    path: instances[1].path,
			  \});
			\});
			
			it('rethrows unexpected errors', async () => \{
			  const item1 = jest.fn().mockImplementationOnce(() => \{
			    throw new Error();
			  \});
			  builder.addItem(\{ run: item1 \});
			  getDataSpy.mockReturnValue(instances);
			
			  await expect(contextRunner.run(\{ body: \{\} \})).rejects.toThrowError();
			  expect(item1).toHaveBeenCalled();
			\});
			
			it('concats to req[contextsKey]', async () => \{
			  const req: InternalRequest = \{\};
			  const \{ context: context1 \} = await contextRunner.run(req);
			  const \{ context: context2 \} = await contextRunner.run(req);
			
			  expect(req[contextsKey]).toHaveLength(2);
			  expect(req[contextsKey]).toEqual([context1, context2]);
			\});
			
			describe('instance value persistence onto request', () => \{
			  beforeEach(() => \{
			    builder.addItem(nullify);
			  \});
			
			  it('happens on instance path, if defined', async () => \{
			    const req = \{ query: \{\} \};
			    await contextRunner.run(req);
			    expect(req.query).toHaveProperty('foo', undefined);
			    expect(req.query).toHaveProperty('bar', undefined);
			  \});
			
			  it('happens on request location, if path empty', async () => \{
			    selectFields.mockReturnValue([\{ location: 'query', path: '', originalPath: '', value: 123 \}]);
			
			    const req = \{ query: \{\} \};
			    await contextRunner.run(req);
			    expect(req.query).toBe(undefined);
			  \});
			
			  it('does not happen if value did not change', async () => \{
			    selectFields.mockReturnValue([
			      \{ location: 'query', path: 'foo', originalPath: 'foo', value: '123' \},
			    ]);
			    const req = \{ query: \{\} \};
			    await contextRunner.run(req);
			    expect(req.query).not.toHaveProperty('foo');
			  \});
			\});
			
			describe('with dryRun: true option', () => \{
			  it('does not concat to req[contextsKey]', async () => \{
			    const req: InternalRequest = \{\};
			    const \{ context \} = await contextRunner.run(req);
			    await contextRunner.run(req, \{ dryRun: true \});
			
			    expect(req[contextsKey]).toHaveLength(1);
			    expect(req[contextsKey]).toEqual([context]);
			  \});
			
			  it('does not persist instance value back into the request', async () => \{
			    builder.addItem(nullify);
			
			    const req = \{ query: \{ foo: 123, bar: 456 \} \};
			    await contextRunner.run(req, \{ dryRun: true \});
			    expect(req.query).toHaveProperty('foo', 123);
			    expect(req.query).toHaveProperty('bar', 456);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\chain\\context-runner-impl.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(13)
    });
    it('express-validator_express-validator\\src\\chain\\sanitizers-impl.spec.ts', () => {
        const sourceCode = `
			import * as validator from 'validator';
			import \{ Sanitization \} from '../context-items/sanitization';
			import \{ Meta \} from '../base';
			import \{ ContextBuilder \} from '../context-builder';
			import \{ Sanitizers \} from './sanitizers';
			import \{ SanitizersImpl \} from './sanitizers-impl';
			
			let chain: any;
			let builder: ContextBuilder;
			let sanitizers: Sanitizers<any>;
			
			beforeEach(() => \{
			  chain = \{\};
			  builder = new ContextBuilder();
			  jest.spyOn(builder, 'addItem');
			
			  sanitizers = new SanitizersImpl(builder, chain);
			\});
			
			it('has methods for all standard sanitizers', () => \{
			  // Cast is here to workaround the lack of index signature
			  const validatorModule = validator as any;
			
			  Object.keys(validator)
			    .filter((key): key is keyof Sanitizers<any> => \{
			      return (
			        key.startsWith('to') && typeof validatorModule[key] === 'function' && key !== 'toString'
			      );
			    \})
			    .forEach(key => \{
			      expect(sanitizers).toHaveProperty(key);
			
			      const ret = sanitizers[key].call(sanitizers);
			      expect(ret).toBe(chain);
			      expect(builder.addItem).toHaveBeenLastCalledWith(
			        new Sanitization(validatorModule[key], false, expect.any(Array)),
			      );
			    \});
			
			  sanitizers.blacklist('foo');
			  expect(builder.addItem).toHaveBeenLastCalledWith(
			    new Sanitization(validator.blacklist, false, ['foo']),
			  );
			
			  sanitizers.whitelist('bar');
			  expect(builder.addItem).toHaveBeenLastCalledWith(
			    new Sanitization(validator.whitelist, false, ['bar']),
			  );
			
			  sanitizers.stripLow(true);
			  expect(builder.addItem).toHaveBeenLastCalledWith(
			    new Sanitization(validator.stripLow, false, [true]),
			  );
			
			  sanitizers.ltrim('a');
			  expect(builder.addItem).toHaveBeenLastCalledWith(new Sanitization(validator.ltrim, false, ['a']));
			
			  sanitizers.rtrim('z');
			  expect(builder.addItem).toHaveBeenLastCalledWith(new Sanitization(validator.rtrim, false, ['z']));
			
			  sanitizers.trim('az');
			  expect(builder.addItem).toHaveBeenLastCalledWith(new Sanitization(validator.trim, false, ['az']));
			
			  sanitizers.escape();
			  expect(builder.addItem).toHaveBeenLastCalledWith(new Sanitization(validator.escape, false, []));
			
			  sanitizers.unescape();
			  expect(builder.addItem).toHaveBeenLastCalledWith(new Sanitization(validator.unescape, false, []));
			
			  sanitizers.normalizeEmail();
			  expect(builder.addItem).toHaveBeenLastCalledWith(
			    new Sanitization(validator.normalizeEmail, false, [undefined]),
			  );
			\});
			
			describe('#customSanitizer()', () => \{
			  it('adds custom sanitizer to the context', () => \{
			    const sanitizer = jest.fn();
			    const ret = sanitizers.customSanitizer(sanitizer);
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new Sanitization(sanitizer, true));
			  \});
			
			  it('adds a custom async sanitizer that resolves to the context', () => \{
			    const sanitizer = jest.fn(async () => 1);
			    const ret = sanitizers.customSanitizer(sanitizer);
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new Sanitization(sanitizer, true));
			  \});
			
			  it('adds a custom async sanitizer that rejects to the context', () => \{
			    const sanitizer = jest.fn(async () => \{
			      throw new Error('Dummy Error');
			    \});
			    const ret = sanitizers.customSanitizer(sanitizer);
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new Sanitization(sanitizer, true));
			  \});
			\});
			
			describe('#toArray()', () => \{
			  it('adds toArray() sanitizer to the context', () => \{
			    const ret = sanitizers.toArray();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new Sanitization(expect.any(Function), true));
			  \});
			
			  it('sanitizes to array', async () => \{
			    sanitizers.toArray();
			    const context = builder.build();
			    context.addFieldInstances([
			      \{
			        location: 'body',
			        path: 'foo',
			        originalPath: 'foo',
			        value: '',
			      \},
			    ]);
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const toArray = context.stack[0];
			
			    await toArray.run(context, [], meta);
			    expect(context.getData()[0].value).toEqual([]);
			
			    await toArray.run(context, 'foo', meta);
			    expect(context.getData()[0].value).toEqual(['foo']);
			
			    await toArray.run(context, ['foo'], meta);
			    expect(context.getData()[0].value).toEqual(['foo']);
			
			    await toArray.run(context, '', meta);
			    expect(context.getData()[0].value).toEqual(['']);
			
			    await toArray.run(context, null, meta);
			    expect(context.getData()[0].value).toEqual([null]);
			
			    await toArray.run(context, undefined, meta);
			    expect(context.getData()[0].value).toEqual([]);
			  \});
			\});
			
			describe('#toLowerCase()', () => \{
			  it('adds toLowerCase() sanitizer to the context', () => \{
			    const ret = sanitizers.toLowerCase();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new Sanitization(expect.any(Function), true));
			  \});
			  it('sanitizes to lowerCase', async () => \{
			    sanitizers.toLowerCase();
			    const context = builder.build();
			    context.addFieldInstances([
			      \{
			        location: 'body',
			        path: 'foo',
			        originalPath: 'foo',
			        value: '',
			      \},
			    ]);
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const toLowerCase = context.stack[0];
			
			    await toLowerCase.run(context, '', meta);
			    expect(context.getData()[0].value).toEqual('');
			
			    await toLowerCase.run(context, 'foo', meta);
			    expect(context.getData()[0].value).toEqual('foo');
			
			    await toLowerCase.run(context, 'FOO', meta);
			    expect(context.getData()[0].value).toEqual('foo');
			
			    await toLowerCase.run(context, '_FoO123', meta);
			    expect(context.getData()[0].value).toEqual('_foo123');
			
			    await toLowerCase.run(context, null, meta);
			    expect(context.getData()[0].value).toEqual(null);
			
			    await toLowerCase.run(context, undefined, meta);
			    expect(context.getData()[0].value).toEqual(undefined);
			  \});
			\});
			
			describe('#toUpperCase()', () => \{
			  it('adds toUpperCase() sanitizer to the context', () => \{
			    const ret = sanitizers.toUpperCase();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new Sanitization(expect.any(Function), true));
			  \});
			
			  it('sanitizes to UpperCase', async () => \{
			    sanitizers.toUpperCase();
			    const context = builder.build();
			    context.addFieldInstances([
			      \{
			        location: 'body',
			        path: 'foo',
			        originalPath: 'foo',
			        value: '',
			      \},
			    ]);
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const toUpperCase = context.stack[0];
			
			    await toUpperCase.run(context, '', meta);
			    expect(context.getData()[0].value).toEqual('');
			
			    await toUpperCase.run(context, 'foo', meta);
			    expect(context.getData()[0].value).toEqual('FOO');
			
			    await toUpperCase.run(context, 'FOO', meta);
			    expect(context.getData()[0].value).toEqual('FOO');
			
			    await toUpperCase.run(context, '_FoO123', meta);
			    expect(context.getData()[0].value).toEqual('_FOO123');
			
			    await toUpperCase.run(context, null, meta);
			    expect(context.getData()[0].value).toEqual(null);
			
			    await toUpperCase.run(context, undefined, meta);
			    expect(context.getData()[0].value).toEqual(undefined);
			  \});
			\});
			
			describe('#default()', () => \{
			  it('adds default() sanitizer to the context', () => \{
			    const ret = sanitizers.default(5);
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new Sanitization(expect.any(Function), true));
			  \});
			
			  it('sanitizes to default()', async () => \{
			    sanitizers.default(5);
			    const context = builder.build();
			    context.addFieldInstances([
			      \{
			        location: 'body',
			        path: 'foo',
			        originalPath: 'foo',
			        value: '',
			      \},
			    ]);
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const defaultSanitizer = context.stack[0];
			
			    await defaultSanitizer.run(context, 'foo', meta);
			    expect(context.getData()[0].value).toEqual('foo');
			
			    await defaultSanitizer.run(context, 10, meta);
			    expect(context.getData()[0].value).toEqual(10);
			
			    await defaultSanitizer.run(context, '', meta);
			    expect(context.getData()[0].value).toEqual(5);
			
			    await defaultSanitizer.run(context, undefined, meta);
			    expect(context.getData()[0].value).toEqual(5);
			
			    await defaultSanitizer.run(context, null, meta);
			    expect(context.getData()[0].value).toEqual(5);
			
			    await defaultSanitizer.run(context, NaN, meta);
			    expect(context.getData()[0].value).toEqual(5);
			  \});
			\});
			
			describe('#replace()', () => \{
			  it('adds replace() sanitizer to the context', () => \{
			    const ret = sanitizers.replace([], 'defaultValue');
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new Sanitization(expect.any(Function), true));
			  \});
			
			  it('sanitizes to replace with empty set', async () => \{
			    sanitizers.replace([], 'defaultValue');
			    const context = builder.build();
			    context.addFieldInstances([
			      \{
			        location: 'body',
			        path: 'foo',
			        originalPath: 'foo',
			        value: '',
			      \},
			    ]);
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const replace = context.stack[0];
			
			    await replace.run(context, '', meta);
			    expect(context.getData()[0].value).toEqual('');
			
			    await replace.run(context, undefined, meta);
			    expect(context.getData()[0].value).toEqual(undefined);
			
			    await replace.run(context, null, meta);
			    expect(context.getData()[0].value).toEqual(null);
			
			    await replace.run(context, NaN, meta);
			    expect(context.getData()[0].value).toEqual(NaN);
			
			    await replace.run(context, 'foo_', meta);
			    expect(context.getData()[0].value).toEqual('foo_');
			
			    await replace.run(context, 100, meta);
			    expect(context.getData()[0].value).toEqual(100);
			  \});
			
			  it('sanitizes to replace with custom set', async () => \{
			    sanitizers.replace(['foo', 'bar'], 'defaultValue');
			    const context = builder.build();
			    context.addFieldInstances([
			      \{
			        location: 'body',
			        path: 'foo',
			        originalPath: 'foo',
			        value: '',
			      \},
			    ]);
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const replace = context.stack[0];
			
			    await replace.run(context, 'foo', meta);
			    expect(context.getData()[0].value).toEqual('defaultValue');
			
			    await replace.run(context, 'bar', meta);
			    expect(context.getData()[0].value).toEqual('defaultValue');
			
			    await replace.run(context, undefined, meta);
			    expect(context.getData()[0].value).toEqual(undefined);
			
			    await replace.run(context, null, meta);
			    expect(context.getData()[0].value).toEqual(null);
			
			    await replace.run(context, NaN, meta);
			    expect(context.getData()[0].value).toEqual(NaN);
			
			    await replace.run(context, '_foo', meta);
			    expect(context.getData()[0].value).toEqual('_foo');
			
			    await replace.run(context, 100, meta);
			    expect(context.getData()[0].value).toEqual(100);
			  \});
			
			  it('sanitizes to replace with single value', async () => \{
			    sanitizers.replace('foo', 'defaultValue');
			    const context = builder.build();
			    context.addFieldInstances([
			      \{
			        location: 'body',
			        path: 'foo',
			        originalPath: 'foo',
			        value: '',
			      \},
			    ]);
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const replace = context.stack[0];
			
			    await replace.run(context, 'foo', meta);
			    expect(context.getData()[0].value).toEqual('defaultValue');
			
			    await replace.run(context, '_foo', meta);
			    expect(context.getData()[0].value).toEqual('_foo');
			
			    await replace.run(context, 100, meta);
			    expect(context.getData()[0].value).toEqual(100);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\chain\\sanitizers-impl.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(16)
    });
    it('express-validator_express-validator\\src\\chain\\validators-impl.spec.ts', () => {
        const sourceCode = `
			import * as validator from 'validator';
			import \{ Meta \} from '../base';
			import \{ CustomValidation, StandardValidation \} from '../context-items';
			import \{ ContextBuilder \} from '../context-builder';
			import \{ body \} from '../middlewares/validation-chain-builders';
			import \{ validationResult \} from '../validation-result';
			import \{ Validators \} from './validators';
			import \{ ValidatorsImpl \} from './validators-impl';
			
			let chain: any;
			let builder: ContextBuilder;
			let validators: Validators<any>;
			
			beforeEach(() => \{
			  chain = \{\};
			  builder = new ContextBuilder();
			  jest.spyOn(builder, 'addItem');
			
			  validators = new ValidatorsImpl(builder, chain);
			\});
			
			it('has methods for all standard validators', () => \{
			  // Cast is here to workaround the lack of index signature
			  const validatorModule = validator as any;
			
			  Object.keys(validator)
			    .filter((key): key is keyof Validators<any> => \{
			      return key.startsWith('is') && typeof validatorModule[key] === 'function';
			    \})
			    .forEach(key => \{
			      expect(validators).toHaveProperty(key);
			
			      const ret = validators[key].call(validators);
			      expect(ret).toBe(chain);
			      expect(builder.addItem).toHaveBeenCalledWith(
			        new StandardValidation(validatorModule[key], false, expect.any(Array)),
			      );
			    \});
			
			  validators.contains('foo');
			  expect(builder.addItem).toHaveBeenCalledWith(
			    new StandardValidation(validator.contains, false, ['foo', undefined]),
			  );
			
			  validators.equals('bar');
			  expect(builder.addItem).toHaveBeenCalledWith(
			    new StandardValidation(validator.equals, false, ['bar']),
			  );
			
			  validators.matches('baz');
			  expect(builder.addItem).toHaveBeenCalledWith(
			    new StandardValidation(validator.matches, false, ['baz', undefined]),
			  );
			\});
			
			describe('#custom()', () => \{
			  it('adds custom validator to the context', () => \{
			    const validator = jest.fn();
			    const ret = validators.custom(validator);
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new CustomValidation(validator, false));
			  \});
			\});
			
			describe('#exists()', () => \{
			  it('adds custom validator to the context', () => \{
			    const ret = validators.exists();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new CustomValidation(expect.any(Function), false));
			  \});
			
			  it('checks if context is not undefined by default', async () => \{
			    validators.exists();
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const exists = context.stack[0];
			
			    await exists.run(context, undefined, meta);
			    await exists.run(context, null, meta);
			    await exists.run(context, 0, meta);
			    await exists.run(context, '', meta);
			    await exists.run(context, false, meta);
			
			    expect(context.errors).toHaveLength(1);
			  \});
			
			  it('checks if context is not falsy when checkFalsy is true', async () => \{
			    validators.exists(\{ checkFalsy: true \});
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const exists = context.stack[0];
			
			    await exists.run(context, undefined, meta);
			    await exists.run(context, null, meta);
			    await exists.run(context, 0, meta);
			    await exists.run(context, '', meta);
			    await exists.run(context, false, meta);
			    await exists.run(context, true, meta);
			
			    expect(context.errors).toHaveLength(5);
			  \});
			
			  it('checks if context is not null when checkNull is true', async () => \{
			    validators.exists(\{ checkNull: true \});
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const exists = context.stack[0];
			
			    await exists.run(context, undefined, meta);
			    await exists.run(context, null, meta);
			    expect(context.errors).toHaveLength(2);
			
			    await exists.run(context, 0, meta);
			    await exists.run(context, '', meta);
			    await exists.run(context, false, meta);
			    await exists.run(context, true, meta);
			    expect(context.errors).toHaveLength(2);
			  \});
			\});
			
			describe('#isAlpha()', () => \{
			  it('checks options.ignore transformation from string[] to string', () => \{
			    const ret = validators.isAlpha('it-IT', \{ ignore: ['b', 'a', 'r'] \});
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(
			      new StandardValidation(validator.isAlpha, false, ['it-IT', \{ ignore: 'bar' \}]),
			    );
			  \});
			\});
			
			describe('default #isBoolean()', () => \{
			  it('adds validator to the context', () => \{
			    const ret = validators.isBoolean();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(
			      new StandardValidation(validator.isBoolean, false, expect.any(Array)),
			    );
			  \});
			
			  it('checks if context is strict boolean', async () => \{
			    validators.isBoolean();
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isBoolean = context.stack[0];
			
			    await isBoolean.run(context, true, meta);
			    await isBoolean.run(context, false, meta);
			    await isBoolean.run(context, 'true', meta);
			    await isBoolean.run(context, 'false', meta);
			    await isBoolean.run(context, 1, meta);
			    await isBoolean.run(context, 0, meta);
			    // The two below are passing because we are using a StandardValidator which passes the value to \`toString\`
			    await isBoolean.run(context, [false], meta);
			    await isBoolean.run(context, ['true'], meta);
			    expect(context.errors).toHaveLength(0);
			
			    await isBoolean.run(context, 'no', meta);
			    await isBoolean.run(context, 'True', meta);
			    await isBoolean.run(context, 'False', meta);
			    await isBoolean.run(context, 'yes', meta);
			    expect(context.errors).toHaveLength(4);
			  \});
			\});
			
			describe('strict #isBoolean()', () => \{
			  it('adds validator to the context', () => \{
			    const ret = validators.isBoolean(\{ strict: true \});
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new CustomValidation(expect.any(Function), false));
			  \});
			
			  it('checks if context is strict boolean', async () => \{
			    validators.isBoolean(\{ strict: true \});
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isBoolean = context.stack[0];
			
			    await isBoolean.run(context, true, meta);
			    await isBoolean.run(context, false, meta);
			    expect(context.errors).toHaveLength(0);
			
			    await isBoolean.run(context, 0, meta);
			    await isBoolean.run(context, 'true', meta);
			    await isBoolean.run(context, 'false', meta);
			    // The two below are not passing because we are using a custom validator which takes the raw value and does not pass it through \`toString\`
			    await isBoolean.run(context, [false], meta);
			    await isBoolean.run(context, ['true'], meta);
			    expect(context.errors).toHaveLength(5);
			  \});
			\});
			
			describe('loose #isBoolean()', () => \{
			  it('adds validator to the context', () => \{
			    const ret = validators.isBoolean(\{ loose: true \});
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(
			      new StandardValidation(validator.isBoolean, false, [\{ loose: true \}]),
			    );
			  \});
			
			  it('checks if context is strict boolean', async () => \{
			    validators.isBoolean(\{ loose: true \});
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isBoolean = context.stack[0];
			
			    await isBoolean.run(context, true, meta);
			    await isBoolean.run(context, false, meta);
			    await isBoolean.run(context, 'true', meta);
			    await isBoolean.run(context, 'false', meta);
			    await isBoolean.run(context, 'no', meta);
			    await isBoolean.run(context, 'True', meta);
			    await isBoolean.run(context, 'False', meta);
			    await isBoolean.run(context, 'FalSE', meta);
			    await isBoolean.run(context, 'yes', meta);
			    await isBoolean.run(context, 1, meta);
			    await isBoolean.run(context, 0, meta);
			
			    await isBoolean.run(context, [false], meta);
			    await isBoolean.run(context, ['true'], meta);
			    expect(context.errors).toHaveLength(0);
			  \});
			\});
			
			describe('#isString()', () => \{
			  it('adds custom validator to the context', () => \{
			    const ret = validators.isString();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new CustomValidation(expect.any(Function), false));
			  \});
			
			  it('checks if context is string', async () => \{
			    validators.isString();
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isString = context.stack[0];
			
			    await isString.run(context, 'foo', meta);
			    expect(context.errors).toHaveLength(0);
			
			    await isString.run(context, 1, meta);
			    await isString.run(context, true, meta);
			    await isString.run(context, null, meta);
			    await isString.run(context, undefined, meta);
			    await isString.run(context, [], meta);
			    expect(context.errors).toHaveLength(5);
			  \});
			\});
			
			describe('#isObject()', () => \{
			  it('adds custom validator to the context', () => \{
			    const ret = validators.isObject();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new CustomValidation(expect.any(Function), false));
			  \});
			
			  it('checks if context is object', async () => \{
			    validators.isObject();
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isObject = context.stack[0];
			
			    await isObject.run(context, \{\}, meta);
			    await isObject.run(context, \{ foo: 'foo' \}, meta);
			    expect(context.errors).toHaveLength(0);
			
			    await isObject.run(context, 'foo', meta);
			    await isObject.run(context, 5, meta);
			    await isObject.run(context, true, meta);
			    await isObject.run(context, null, meta);
			    await isObject.run(context, undefined, meta);
			    await isObject.run(context, ['foo'], meta);
			    expect(context.errors).toHaveLength(6);
			  \});
			
			  it('checks if context is object with options.strict not set', async () => \{
			    validators.isObject(\{\});
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isObject = context.stack[0];
			
			    await isObject.run(context, \{\}, meta);
			    await isObject.run(context, \{ foo: 'foo' \}, meta);
			    expect(context.errors).toHaveLength(0);
			
			    await isObject.run(context, 'foo', meta);
			    await isObject.run(context, 5, meta);
			    await isObject.run(context, true, meta);
			    await isObject.run(context, null, meta);
			    await isObject.run(context, undefined, meta);
			    await isObject.run(context, ['foo'], meta);
			    expect(context.errors).toHaveLength(6);
			  \});
			
			  it('checks if context is object with strict = false', async () => \{
			    validators.isObject(\{ strict: false \});
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isObject = context.stack[0];
			
			    await isObject.run(context, \{\}, meta);
			    await isObject.run(context, \{ foo: 'foo' \}, meta);
			    await isObject.run(context, ['foo'], meta);
			    await isObject.run(context, null, meta);
			    expect(context.errors).toHaveLength(0);
			
			    await isObject.run(context, 'foo', meta);
			    await isObject.run(context, 5, meta);
			    await isObject.run(context, true, meta);
			    await isObject.run(context, undefined, meta);
			    expect(context.errors).toHaveLength(4);
			  \});
			\});
			
			describe('#isArray()', () => \{
			  it('adds custom validator to the context', () => \{
			    const ret = validators.isArray();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(new CustomValidation(expect.any(Function), false));
			  \});
			
			  it('checks if context is array', async () => \{
			    validators.isArray();
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isArray = context.stack[0];
			
			    await isArray.run(context, [], meta);
			    expect(context.errors).toHaveLength(0);
			
			    await isArray.run(context, 1, meta);
			    await isArray.run(context, true, meta);
			    await isArray.run(context, null, meta);
			    await isArray.run(context, undefined, meta);
			    await isArray.run(context, 'foo', meta);
			    expect(context.errors).toHaveLength(5);
			  \});
			
			  it('checks if context is array of right length', async () => \{
			    validators.isArray(\{ min: 2, max: 5 \});
			    const context = builder.build();
			
			    const meta: Meta = \{ req: \{\}, location: 'body', path: 'foo' \};
			    const isArray = context.stack[0];
			
			    await isArray.run(context, [1, '2'], meta);
			    await isArray.run(context, ['1', undefined, '3'], meta);
			    await isArray.run(context, ['1', null, '3', '4', '5'], meta);
			    expect(context.errors).toHaveLength(0);
			
			    await isArray.run(context, [], meta);
			    await isArray.run(context, ['1'], meta);
			    await isArray.run(context, ['1', '2', '3', '4', '5', '6'], meta);
			    expect(context.errors).toHaveLength(3);
			  \});
			\});
			
			describe('#notEmpty()', () => \{
			  it('adds negated isEmpty() validator to the context', () => \{
			    const ret = validators.notEmpty();
			
			    expect(ret).toBe(chain);
			    expect(builder.addItem).toHaveBeenCalledWith(
			      new StandardValidation(validator.isEmpty, true, expect.any(Array)),
			    );
			  \});
			\});
			
			describe('correctly merges validator.matches flags', () => \{
			  it('correctly uses modifiers and string', () => \{
			    validators.matches('baz', 'gi');
			    expect(builder.addItem).toHaveBeenCalledWith(
			      new StandardValidation(validator.matches, false, ['baz', 'gi']),
			    );
			  \});
			
			  it('correctly uses modifiers and regex flags', () => \{
			    validators.matches(/baz/gi, 'm');
			    expect(builder.addItem).toHaveBeenCalledWith(
			      new StandardValidation(validator.matches, false, ['baz', 'mgi']),
			    );
			  \});
			\});
			
			describe('always correctly validates with validator.matches using the g flag', () => \{
			  const expectedErr = \{
			    type: 'field',
			    value: 'fo157115',
			    msg: 'INVALID USER FORMAT',
			    path: 'user',
			    location: 'body',
			  \};
			  [
			    \{ name: 'with valid value', user: 'it157115', expected: [] \},
			    \{
			      name: 'with invalid value',
			      user: 'fo157115',
			      expected: [expectedErr, expectedErr, expectedErr],
			    \},
			  ].forEach(config => \{
			    it(config.name, async () => \{
			      const req = \{ body: \{ user: config.user \} \};
			      const validator = body('user')
			        .toLowerCase()
			        .matches(/^(it)(\\d\{6\})\$/g)
			        .withMessage('INVALID USER FORMAT');
			
			      // try three times because per #1127 validation failed one other time
			      let i = 0;
			      const results = [];
			      while (++i < 3) \{
			        await validator.run(req);
			        results.push(...validationResult(req).array());
			      \}
			
			      expect(results).toEqual(config.expected);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\chain\\validators-impl.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(26)
    });
    it('express-validator_express-validator\\src\\context-builder.spec.ts', () => {
        const sourceCode = `
			import \{ ContextBuilder \} from './context-builder';
			import \{ ContextItem \} from './context-items';
			
			let builder: ContextBuilder;
			beforeEach(() => \{
			  builder = new ContextBuilder();
			\});
			
			describe('#setFields()', () => \{
			  it('builds a Context with the given fields', () => \{
			    const context = builder.setFields(['foo', 'bar']).build();
			    expect(context.fields).toEqual(['foo', 'bar']);
			  \});
			\});
			
			describe('#setLocations()', () => \{
			  it('builds a Context with the given location', () => \{
			    const context = builder.setLocations(['query', 'headers']).build();
			    expect(context.locations).toEqual(['query', 'headers']);
			  \});
			\});
			
			describe('#setMessage()', () => \{
			  it('builds a Context with the given message', () => \{
			    const context = builder.setMessage(\{ funny: true \}).build();
			    expect(context.message).toEqual(\{ funny: true \});
			  \});
			\});
			
			describe('#setOptional()', () => \{
			  it('builds a Context with the given optional flag', () => \{
			    let context = builder.setOptional('falsy').build();
			    expect(context.optional).toEqual('falsy');
			
			    context = builder.setOptional(false).build();
			    expect(context.optional).toBe(false);
			  \});
			\});
			
			describe('#setRequestBail()', () => \{
			  it('builders a Context with the bail flag set', () => \{
			    let context = builder.build();
			    expect(context.bail).toBe(false);
			
			    context = builder.setRequestBail().build();
			    expect(context.bail).toBe(true);
			  \});
			\});
			
			describe('#addItem()', () => \{
			  it('builds a Context with all the item pushed to the stack', () => \{
			    const item1: ContextItem = \{
			      run: () => Promise.resolve(),
			    \};
			    const item2: ContextItem = \{
			      run: () => Promise.resolve(),
			    \};
			    builder.addItem(item1).addItem(item2).addItem(item1, item2);
			
			    const context = builder.build();
			    expect(context.stack).toHaveLength(4);
			    expect(context.stack).toEqual([item1, item2, item1, item2]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\context-builder.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('express-validator_express-validator\\src\\context-items\\bail.spec.ts', () => {
        const sourceCode = `
			import \{ ContextBuilder \} from '../context-builder';
			import \{ ValidationHalt \} from '../base';
			import \{ Bail \} from './bail';
			
			it('does not throw if the context has no errors', () => \{
			  const context = new ContextBuilder().build();
			  return expect(new Bail().run(context)).resolves.toBeUndefined();
			\});
			
			it('throws a validation halt if the context has errors', () => \{
			  const context = new ContextBuilder().build();
			  context.addError(\{
			    type: 'field',
			    message: 'foo',
			    value: 'value',
			    meta: \{
			      req: \{\},
			      location: 'body',
			      path: 'bar',
			    \},
			  \});
			
			  expect(() => new Bail().run(context)).toThrowError(ValidationHalt);
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\context-items\\bail.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('express-validator_express-validator\\src\\context-items\\chain-condition.spec.ts', () => {
        const sourceCode = `
			import \{ ValidationChain \} from '../chain';
			import \{ check \} from '../middlewares/check';
			import \{ ContextBuilder \} from '../context-builder';
			import \{ Request, ValidationHalt \} from '../base';
			import \{ Result \} from '../validation-result';
			import \{ ChainCondition \} from './chain-condition';
			
			let condition: ValidationChain;
			let runItem: (req: Request) => Promise<void>;
			
			beforeEach(() => \{
			  condition = check('id', ['params']).isInt();
			
			  const item = new ChainCondition(condition);
			  runItem = req =>
			    item.run(new ContextBuilder().build(), 'id', \{
			      req,
			      location: 'params',
			      path: 'id',
			    \});
			\});
			
			it('runs the condition chain on the request', () => \{
			  condition.run = jest.fn().mockResolvedValue(new Result(e => e, []));
			
			  const req = \{\};
			  runItem(req);
			
			  expect(condition.run).toHaveBeenCalledWith(req, \{ dryRun: true \});
			\});
			
			it('does not throw if the chain has no errors', () => \{
			  const req = \{
			    params: \{ id: '123' \},
			  \};
			  return expect(runItem(req)).resolves.toBeUndefined();
			\});
			
			it('throws a validation halt if the chain has errors', () => \{
			  const req = \{
			    params: \{ id: 'bla' \},
			  \};
			  return expect(runItem(req)).rejects.toThrowError(ValidationHalt);
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\context-items\\chain-condition.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('express-validator_express-validator\\src\\context-items\\custom-condition.spec.ts', () => {
        const sourceCode = `
			import \{ ContextBuilder \} from '../context-builder';
			import \{ ValidationHalt \} from '../base';
			import \{ CustomCondition \} from './custom-condition';
			
			let condition: jest.Mock;
			let runItem: () => Promise<void>;
			
			beforeEach(() => \{
			  condition = jest.fn();
			
			  const item = new CustomCondition(condition);
			  runItem = () =>
			    item.run(new ContextBuilder().build(), 'foo', \{
			      req: \{\},
			      location: 'cookies',
			      path: 'foo',
			    \});
			\});
			
			it('runs the condition with the value and the meta', () => \{
			  condition.mockReturnValue(true);
			  runItem();
			
			  expect(condition).toHaveBeenCalledWith('foo', \{
			    req: \{\},
			    location: 'cookies',
			    path: 'foo',
			  \});
			\});
			
			it('does not throw if the condition is truthy', async () => \{
			  condition.mockReturnValueOnce(true);
			  await expect(runItem()).resolves.toBeUndefined();
			\});
			
			it('does not throw if the condition is a resolved promise', async () => \{
			  condition.mockResolvedValue('foo');
			  await expect(runItem()).resolves.toBeUndefined();
			\});
			
			it('throws a validation halt if the condition is falsy', async () => \{
			  condition.mockReturnValueOnce(false);
			  await expect(runItem()).rejects.toThrowError(ValidationHalt);
			
			  condition.mockReturnValueOnce(null);
			  await expect(runItem()).rejects.toThrowError(ValidationHalt);
			\});
			
			it('does not throw if a falsy value is resolved in a Promise', async () => \{
			  condition.mockResolvedValue(false);
			  await expect(runItem()).resolves.toBeUndefined();
			\});
			
			it('throws a validation halt if the condition is a rejected promise', async () => \{
			  condition.mockRejectedValue('foo');
			  await expect(runItem()).rejects.toThrowError(ValidationHalt);
			\});
			
			it('throws a validation halt if the condition throws', async () => \{
			  condition.mockImplementation(() => \{
			    throw new Error('woops');
			  \});
			  await expect(runItem()).rejects.toThrowError(ValidationHalt);
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\context-items\\custom-condition.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('express-validator_express-validator\\src\\context-items\\custom-validation.spec.ts', () => {
        const sourceCode = `
			import \{ Context \} from '../context';
			import \{ ContextBuilder \} from '../context-builder';
			import \{ Meta \} from '../base';
			import \{ CustomValidation \} from './custom-validation';
			
			let context: Context;
			let validator: jest.Mock;
			let validation: CustomValidation;
			const meta: Meta = \{
			  req: \{ cookies: \{ foo: 'bar' \} \},
			  location: 'cookies',
			  path: 'foo',
			\};
			
			beforeEach(() => \{
			  context = new ContextBuilder().setFields(['foo']).setLocations(['cookies']).build();
			  jest.spyOn(context, 'addError');
			
			  validator = jest.fn();
			\});
			
			// There are 4 tests that are pretty much the same with just small variations among them.
			// So it's made reusable here
			const createSyncTest = (options: \{ returnValue: any; addsError: boolean \}) => async () => \{
			  validator.mockReturnValue(options.returnValue);
			  await validation.run(context, 'bar', meta);
			  if (options.addsError) \{
			    expect(context.addError).toHaveBeenCalledWith(\{
			      type: 'field',
			      message: validation.message,
			      value: 'bar',
			      meta,
			    \});
			  \} else \{
			    expect(context.addError).not.toHaveBeenCalled();
			  \}
			\};
			
			describe('when not negated', () => \{
			  beforeEach(() => \{
			    validation = new CustomValidation(validator, false);
			    validation.message = 'nope';
			  \});
			
			  it(
			    'adds error if validator returns falsy',
			    createSyncTest(\{ returnValue: false, addsError: true \}),
			  );
			
			  it(
			    'does not add error if validator returns truthy',
			    createSyncTest(\{ returnValue: true, addsError: false \}),
			  );
			
			  describe('with message set', () => \{
			    it('adds error with validation message if validator throws', async () => \{
			      validator.mockImplementation(() => \{
			        throw new Error('boom');
			      \});
			      await validation.run(context, 'bar', meta);
			      expect(context.addError).toHaveBeenCalledWith(\{
			        type: 'field',
			        message: 'nope',
			        value: 'bar',
			        meta,
			      \});
			    \});
			
			    it('adds error with validation message if validator returns a promise that rejects', async () => \{
			      validator.mockRejectedValue('a bomb');
			      await validation.run(context, 'bar', meta);
			      expect(context.addError).toHaveBeenCalledWith(\{
			        type: 'field',
			        message: 'nope',
			        value: 'bar',
			        meta,
			      \});
			    \});
			  \});
			
			  describe('without message set', () => \{
			    beforeEach(() => \{
			      validation.message = undefined;
			    \});
			
			    it('adds error with thrown message if validator throws', async () => \{
			      validator.mockImplementation(() => \{
			        throw new Error('boom');
			      \});
			      await validation.run(context, 'bar', meta);
			      expect(context.addError).toHaveBeenCalledWith(\{
			        type: 'field',
			        message: 'boom',
			        value: 'bar',
			        meta,
			      \});
			    \});
			
			    it('adds error with rejection message if validator returns a promise that rejects', async () => \{
			      validator.mockRejectedValue('a bomb');
			      await validation.run(context, 'bar', meta);
			      expect(context.addError).toHaveBeenCalledWith(\{
			        type: 'field',
			        message: 'a bomb',
			        value: 'bar',
			        meta,
			      \});
			    \});
			  \});
			
			  it('does not add error if validator returns a promise that resolves', async () => \{
			    validator.mockResolvedValue(true);
			    await validation.run(context, 'bar', meta);
			    expect(context.addError).not.toHaveBeenCalled();
			  \});
			\});
			
			describe('when negated', () => \{
			  beforeEach(() => \{
			    validation = new CustomValidation(validator, true);
			    validation.message = 'nope';
			  \});
			
			  it(
			    'adds error if validator returns truthy',
			    createSyncTest(\{ returnValue: true, addsError: true \}),
			  );
			
			  it(
			    'does not add error if validator returns falsy',
			    createSyncTest(\{ returnValue: false, addsError: false \}),
			  );
			
			  it('does not add error if validator throws', async () => \{
			    validator.mockImplementation(() => \{
			      throw new Error('boom');
			    \});
			    await validation.run(context, 'bar', meta);
			    expect(context.addError).not.toHaveBeenCalled();
			  \});
			
			  it('does not add error if validator returns a promise that rejects', async () => \{
			    validator.mockRejectedValue('a bomb');
			    await validation.run(context, 'bar', meta);
			    expect(context.addError).not.toHaveBeenCalled();
			  \});
			
			  it('adds error with validation message if validator returns a promise that resolves', async () => \{
			    validator.mockResolvedValue(true);
			    await validation.run(context, 'bar', meta);
			    expect(context.addError).toHaveBeenCalledWith(\{
			      type: 'field',
			      message: 'nope',
			      value: 'bar',
			      meta,
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\context-items\\custom-validation.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
    it('express-validator_express-validator\\src\\context-items\\sanitization.spec.ts', () => {
        const sourceCode = `
			import \{ Context \} from '../context';
			import \{ Meta \} from '../base';
			import \{ ContextBuilder \} from '../context-builder';
			import \{ Sanitization \} from './sanitization';
			
			let context: Context;
			let sanitizer: jest.Mock;
			let sanitization: Sanitization;
			let toString: jest.Mock;
			const meta: Meta = \{
			  req: \{ cookies: \{ foo: 'bar' \} \},
			  location: 'cookies',
			  path: 'foo',
			\};
			
			beforeEach(() => \{
			  context = new ContextBuilder().build();
			  context.addFieldInstances([
			    \{
			      location: 'cookies',
			      path: 'foo',
			      originalPath: 'foo',
			      value: 123,
			    \},
			  ]);
			  jest.spyOn(context, 'setData');
			
			  sanitizer = jest.fn();
			  toString = jest.fn(val => val);
			  sanitization = new Sanitization(sanitizer, true, [], toString);
			\});
			
			it('persists sanitized value back into the context', async () => \{
			  sanitizer.mockReturnValue(1);
			  await sanitization.run(context, 'foo', meta);
			
			  expect(context.setData).toHaveBeenCalledWith(meta.path, 1, meta.location);
			\});
			
			describe('when sanitizer is a custom one', () => \{
			  it('calls it with the value and the meta', async () => \{
			    await sanitization.run(context, 'foo', meta);
			
			    expect(sanitizer).toHaveBeenCalledWith('foo', meta);
			  \});
			
			  it('calls it with the value of an async function and the meta', async () => \{
			    sanitizer = jest.fn(async value => 'foo ' + value);
			    sanitization = new Sanitization(sanitizer, true, [], toString);
			    await sanitization.run(context, 'bar', meta);
			
			    expect(sanitizer).toHaveBeenCalledWith('bar', meta);
			    expect(context.getData()[0].value).toBe('foo bar');
			  \});
			\});
			
			describe('when sanitizer is a standard one', () => \{
			  it('calls it with the stringified value of non-array field', async () => \{
			    toString.mockReturnValue('hey');
			    sanitization = new Sanitization(sanitizer, false, [], toString);
			
			    await sanitization.run(context, false, meta);
			    expect(toString).toHaveBeenCalledWith(false);
			    expect(sanitizer).toHaveBeenCalledWith('hey');
			  \});
			
			  it('calls it for each item in array field', async () => \{
			    toString.mockImplementation(val => \`hey\$\{val\}\`);
			    sanitization = new Sanitization(sanitizer, false, [], toString);
			
			    await sanitization.run(context, [1, 42], meta);
			    expect(toString).toHaveBeenNthCalledWith(1, 1);
			    expect(sanitizer).toHaveBeenNthCalledWith(1, 'hey1');
			    expect(toString).toHaveBeenNthCalledWith(2, 42);
			    expect(sanitizer).toHaveBeenNthCalledWith(2, 'hey42');
			  \});
			
			  it('calls it with the options', async () => \{
			    sanitization = new Sanitization(sanitizer, false, ['bar', false], toString);
			
			    await sanitization.run(context, 'foo', meta);
			    expect(sanitizer).toHaveBeenLastCalledWith('foo', 'bar', false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\context-items\\sanitization.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('express-validator_express-validator\\src\\context-items\\standard-validation.spec.ts', () => {
        const sourceCode = `
			import \{ ContextBuilder \} from '../context-builder';
			import \{ Meta \} from '../base';
			import \{ Context \} from '../context';
			import \{ StandardValidation \} from './standard-validation';
			
			let context: Context;
			let validator: jest.Mock;
			let validation: StandardValidation;
			let toString: jest.Mock;
			const meta: Meta = \{
			  req: \{ cookies: \{ foo: 'bar' \} \},
			  location: 'cookies',
			  path: 'foo',
			\};
			
			beforeEach(() => \{
			  context = new ContextBuilder().build();
			  jest.spyOn(context, 'addError');
			
			  validator = jest.fn();
			  toString = jest.fn(val => val);
			  validation = new StandardValidation(validator, false, [], toString);
			  validation.message = 'nope';
			\});
			
			const createTest = (options: \{ returnValue: any; addsError: boolean \}) => async () => \{
			  validator.mockReturnValue(options.returnValue);
			  await validation.run(context, 'bar', meta);
			  if (options.addsError) \{
			    expect(context.addError).toHaveBeenCalledWith(\{
			      type: 'field',
			      message: validation.message,
			      value: 'bar',
			      meta,
			    \});
			  \} else \{
			    expect(context.addError).not.toHaveBeenCalled();
			  \}
			\};
			
			it('calls the validator with the stringified value of non-array field', async () => \{
			  toString.mockReturnValue('hey');
			  await validation.run(context, false, meta);
			  expect(toString).toHaveBeenCalledWith(false);
			  expect(validator).toHaveBeenCalledWith('hey');
			\});
			
			it('calls the validator for each item in array field', async () => \{
			  toString.mockImplementation(val => \`hey\$\{val\}\`);
			  await validation.run(context, [1, 42], meta);
			  expect(toString).toHaveBeenNthCalledWith(1, 1);
			  expect(validator).toHaveBeenNthCalledWith(1, 'hey1');
			  expect(toString).toHaveBeenNthCalledWith(2, 42);
			  expect(validator).toHaveBeenNthCalledWith(2, 'hey42');
			\});
			
			it('calls the validator with the value and options', async () => \{
			  validation = new StandardValidation(validator, false, ['bar', true], toString);
			  await validation.run(context, 'foo', meta);
			
			  expect(validator).toHaveBeenCalledWith('foo', 'bar', true);
			\});
			
			describe('when not negated', () => \{
			  it('adds error if validator returns falsy', createTest(\{ returnValue: false, addsError: true \}));
			
			  it(
			    'does not add error if validator returns truthy',
			    createTest(\{ returnValue: true, addsError: false \}),
			  );
			\});
			
			describe('when negated', () => \{
			  beforeEach(() => \{
			    validation = new StandardValidation(validator, true, [], toString);
			    validation.message = 'nope';
			  \});
			
			  it('adds error if validator returns truthy', createTest(\{ returnValue: true, addsError: true \}));
			
			  it(
			    'does not add error if validator returns falsy',
			    createTest(\{ returnValue: false, addsError: false \}),
			  );
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\context-items\\standard-validation.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('express-validator_express-validator\\src\\context.spec.ts', () => {
        const sourceCode = `
			import \{ FieldInstance, FieldValidationError, Meta, UnknownFieldInstance \} from './base';
			import \{ Context \} from './context';
			import \{ ContextBuilder \} from './context-builder';
			
			let context: Context;
			let data: FieldInstance[];
			
			beforeEach(() => \{
			  context = new ContextBuilder().build();
			  data = [
			    \{
			      location: 'body',
			      originalPath: 'foo',
			      path: 'foo',
			      value: 123,
			    \},
			    \{
			      location: 'params',
			      originalPath: 'bar.baz',
			      path: 'bar.baz',
			      value: false,
			    \},
			  ];
			\});
			
			describe('#addError()', () => \{
			  const meta: Meta = \{
			    path: 'bar',
			    location: 'headers',
			    req: \{\},
			  \};
			
			  describe('for type single', () => \{
			    it('pushes an error with default error message', () => \{
			      context.addError(\{ type: 'field', value: 'foo', meta \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors).toContainEqual(\{
			        type: 'field',
			        value: 'foo',
			        msg: 'Invalid value',
			        path: 'bar',
			        location: 'headers',
			      \});
			    \});
			
			    it('pushes an error with context message', () => \{
			      context = new ContextBuilder().setMessage('context message').build();
			      context.addError(\{ type: 'field', value: 'foo', meta \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors).toContainEqual(\{
			        type: 'field',
			        value: 'foo',
			        msg: 'context message',
			        path: 'bar',
			        location: 'headers',
			      \});
			    \});
			
			    it('pushes an error with argument message', () => \{
			      context.addError(\{ type: 'field', message: 'oh noes', value: 'foo', meta \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors).toContainEqual(\{
			        type: 'field',
			        value: 'foo',
			        msg: 'oh noes',
			        path: 'bar',
			        location: 'headers',
			      \});
			    \});
			
			    it('pushes an error with the message function return ', () => \{
			      const message = jest.fn(() => 123);
			      context.addError(\{ type: 'field', message, value: 'foo', meta \});
			
			      expect(message).toHaveBeenCalledWith('foo', meta);
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors).toContainEqual(\{
			        type: 'field',
			        value: 'foo',
			        msg: 123,
			        path: 'bar',
			        location: 'headers',
			      \});
			    \});
			  \});
			
			  describe('for type alternative', () => \{
			    const req = \{\};
			    const nestedError: FieldValidationError = \{
			      type: 'field',
			      value: 'foo',
			      path: 'bar',
			      location: 'body',
			      msg: 'Oh no',
			    \};
			
			    it('pushes a request error with nested errors', () => \{
			      context.addError(\{
			        type: 'alternative',
			        req,
			        nestedErrors: [nestedError],
			      \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors).toContainEqual(\{
			        type: 'alternative',
			        msg: 'Invalid value',
			        nestedErrors: [nestedError],
			      \});
			    \});
			
			    it('pushes an error with default error message', () => \{
			      context.addError(\{
			        type: 'alternative',
			        req,
			        nestedErrors: [nestedError],
			      \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors[0].msg).toBe('Invalid value');
			    \});
			
			    it('pushes an error with argument message', () => \{
			      context.addError(\{
			        type: 'alternative',
			        req,
			        message: 'oh noes',
			        nestedErrors: [nestedError],
			      \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors[0].msg).toBe('oh noes');
			    \});
			
			    it('pushes an error with the message function return', () => \{
			      const message = jest.fn(() => 123);
			      context.addError(\{
			        type: 'alternative',
			        req,
			        message,
			        nestedErrors: [nestedError],
			      \});
			
			      expect(message).toHaveBeenCalledWith([nestedError], \{ req \});
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors[0].msg).toBe(123);
			    \});
			  \});
			
			  describe('for type alternative_grouped', () => \{
			    const req = \{\};
			    const nestedError: FieldValidationError = \{
			      type: 'field',
			      value: 'foo',
			      path: 'bar',
			      location: 'body',
			      msg: 'Oh no',
			    \};
			
			    it('pushes a request error with nested errors', () => \{
			      context.addError(\{
			        type: 'alternative_grouped',
			        req,
			        nestedErrors: [[nestedError]],
			      \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors).toContainEqual(\{
			        type: 'alternative_grouped',
			        msg: 'Invalid value',
			        nestedErrors: [[nestedError]],
			      \});
			    \});
			
			    it('pushes an error with default error message', () => \{
			      context.addError(\{
			        type: 'alternative_grouped',
			        req,
			        nestedErrors: [[nestedError]],
			      \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors[0].msg).toBe('Invalid value');
			    \});
			
			    it('pushes an error with argument message', () => \{
			      context.addError(\{
			        type: 'alternative_grouped',
			        req,
			        message: 'oh noes',
			        nestedErrors: [[nestedError]],
			      \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors[0].msg).toBe('oh noes');
			    \});
			
			    it('pushes an error with the message function return', () => \{
			      const message = jest.fn(() => 123);
			      context.addError(\{
			        type: 'alternative_grouped',
			        req,
			        message,
			        nestedErrors: [[nestedError]],
			      \});
			
			      expect(message).toHaveBeenCalledWith([[nestedError]], \{ req \});
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors[0].msg).toBe(123);
			    \});
			  \});
			
			  describe('for type unknown_fields', () => \{
			    const req = \{\};
			    const unknownField: UnknownFieldInstance = \{
			      path: 'fruit',
			      value: 'banana',
			      location: 'cookies',
			    \};
			
			    it('pushes an error with unknown fields', () => \{
			      context.addError(\{
			        type: 'unknown_fields',
			        req,
			        fields: [unknownField],
			      \});
			
			      expect(context.errors).toHaveLength(1);
			      expect(context.errors[0]).toMatchObject(\{
			        type: 'unknown_fields',
			        fields: [unknownField],
			      \});
			    \});
			
			    it('pushes an error with default error message', () => \{
			      context.addError(\{
			        type: 'unknown_fields',
			        req,
			        fields: [unknownField],
			      \});
			
			      expect(context.errors[0].msg).toBe('Invalid value');
			    \});
			
			    it('pushes an error with argument message', () => \{
			      context.addError(\{
			        type: 'unknown_fields',
			        req,
			        message: 'oh noes',
			        fields: [unknownField],
			      \});
			
			      expect(context.errors[0].msg).toBe('oh noes');
			    \});
			
			    it('pushes an error with the message function return', () => \{
			      const message = jest.fn(() => 'keep trying');
			      context.addError(\{
			        type: 'unknown_fields',
			        req,
			        message,
			        fields: [unknownField],
			      \});
			
			      expect(context.errors[0].msg).toBe('keep trying');
			      expect(message).toHaveBeenCalledWith([unknownField], \{ req \});
			    \});
			  \});
			
			  it('throws if the error type is incorrect', () => \{
			    // The ts-expect-error below adds a static guarantee that we're indeed using a type that isn't
			    // specified in the addError signature.
			    // @ts-expect-error
			    const fn = () => context.addError(\{ type: 'foo' \});
			    expect(fn).toThrow();
			  \});
			\});
			
			describe('#addFieldInstance()', () => \{
			  it('adds data to the context', () => \{
			    context.addFieldInstances(data);
			    expect(context.getData()).toEqual([data[0], data[1]]);
			  \});
			\});
			
			describe('#getData()', () => \{
			  it('returns all data when context not optional', () => \{
			    context.addFieldInstances(data);
			    expect(context.getData()).toEqual([data[0], data[1]]);
			  \});
			
			  it('filters out undefineds when context optional = undefined', () => \{
			    data[0].value = undefined;
			    context = new ContextBuilder().setOptional('undefined').build();
			    context.addFieldInstances(data);
			
			    expect(context.getData(\{ requiredOnly: true \})).toEqual([data[1]]);
			  \});
			
			  it('filters out undefineds and nulls when context optional = null', () => \{
			    data[0].value = null;
			    data[1].value = undefined;
			
			    context = new ContextBuilder().setOptional('null').build();
			    context.addFieldInstances(data);
			
			    expect(context.getData(\{ requiredOnly: true \})).toEqual([]);
			  \});
			
			  it('filters out falsies when context optional = falsy', () => \{
			    data[0].value = null;
			    data[1].value = undefined;
			    data.push(\{ ...data[0], value: 0 \}, \{ ...data[0], value: false \}, \{ ...data[0], value: '' \});
			
			    context = new ContextBuilder().setOptional('falsy').build();
			    context.addFieldInstances(data);
			
			    expect(context.getData(\{ requiredOnly: true \})).toEqual([]);
			  \});
			
			  describe('when same path occurs multiple times', () => \{
			    it('keeps only fields with value', () => \{
			      data = [
			        \{ ...data[0], value: undefined, location: 'body' \},
			        \{ ...data[0], value: 'boo', location: 'cookies' \},
			      ];
			
			      context.addFieldInstances(data);
			
			      expect(context.getData()).toEqual([data[1]]);
			    \});
			
			    it('filters out from the second undefined onwards if all values are undefined', () => \{
			      data = [
			        \{ ...data[0], value: undefined, location: 'body' \},
			        \{ ...data[0], value: undefined, location: 'cookies' \},
			      ];
			
			      context.addFieldInstances(data);
			
			      expect(context.getData()).toEqual([data[0]]);
			    \});
			
			    it('does not filter out second undefined when it contains a wildcard', () => \{
			      data = [
			        \{ ...data[0], originalPath: '*', value: undefined, location: 'body' \},
			        \{ ...data[0], originalPath: '*', value: undefined, location: 'cookies' \},
			      ];
			
			      context.addFieldInstances(data);
			
			      expect(context.getData()).toEqual([data[0], data[1]]);
			    \});
			  \});
			\});
			
			describe('#setData()', () => \{
			  it('overrides the value of an existing field instance', () => \{
			    context.addFieldInstances(data);
			    context.setData(data[0].path, 'bla', data[0].location);
			
			    expect(context.getData()).toContainEqual(\{
			      ...data[0],
			      value: 'bla',
			    \});
			  \});
			
			  it('throws if trying to write new data', () => \{
			    const bomb = () => \{
			      context.setData(data[0].path, 'bla', data[0].location);
			    \};
			
			    expect(bomb).toThrowError();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\context.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(27)
    });
    it('express-validator_express-validator\\src\\express-validator.spec.ts', () => {
        const sourceCode = `
			import \{ AlternativeValidationError, FieldValidationError, Meta, ValidationError \} from './base';
			import \{ ExpressValidator \} from './express-validator';
			
			describe('ExpressValidator', () => \{
			  let isAllowedDomain: jest.Mock;
			  let removeEmailAttribute: jest.Mock;
			  const createInstance = () => new ExpressValidator(\{ isAllowedDomain \}, \{ removeEmailAttribute \});
			
			  beforeEach(() => \{
			    isAllowedDomain = jest.fn(() => true);
			    removeEmailAttribute = jest.fn(value => value);
			  \});
			
			  describe.each([
			    ['check', ['body', 'cookies', 'headers', 'params', 'query']],
			    ['body', ['body']],
			    ['cookie', ['cookies']],
			    ['header', ['headers']],
			    ['param', ['params']],
			    ['query', ['query']],
			  ] as const)('#%s()', (method, locations) => \{
			    const foo = 'bar';
			    const req = \{
			      body: \{ foo \},
			      cookies: \{ foo \},
			      headers: \{ foo \},
			      params: \{ foo \},
			      query: \{ foo \},
			    \};
			
			    it(\`creates a validation chain for \$\{locations.join(', ')\}\`, async () => \{
			      const result = await createInstance()[method]('foo').isInt().run(req);
			      const errors = result.array() as FieldValidationError[];
			      expect(errors).toHaveLength(locations.length);
			      errors.forEach(error => \{
			        expect(locations).toContain(error.location);
			      \});
			    \});
			
			    it('creates a validation chain with the extension methods', async () => \{
			      const chain = createInstance()[method]('foo');
			      expect(chain.isAllowedDomain()).toBe(chain);
			      expect(chain.removeEmailAttribute()).toBe(chain);
			
			      await chain.run(req);
			      locations.forEach(location => \{
			        const meta: Meta = \{ req, location, path: 'foo' \};
			        expect(isAllowedDomain).toHaveBeenCalledWith(foo, meta);
			        expect(removeEmailAttribute).toHaveBeenCalledWith(foo, meta);
			      \});
			    \});
			  \});
			
			  describe('#checkExact()', () => \{
			    it('works with custom chains', async () => \{
			      const req = \{ query: \{ foo: 1 \} \};
			      const \{ query, checkExact \} = createInstance();
			      const result = await checkExact(query('bar').isAllowedDomain()).run(req);
			      const errors = result.mapped();
			      expect(isAllowedDomain).toHaveBeenCalled();
			      expect(errors._unknown_fields).toBeDefined();
			    \});
			  \});
			
			  describe('#oneOf()', () => \{
			    it('can be used with custom chains', async () => \{
			      const req = \{ query: \{ foo: 1 \} \};
			      const \{ check, oneOf \} = createInstance();
			      isAllowedDomain.mockImplementation(() => \{
			        throw new Error('wow');
			      \});
			
			      const result = await oneOf([check('foo').isString(), check('foo').isAllowedDomain()], \{
			        errorType: 'flat',
			      \}).run(req);
			      const [error] = result.array();
			      const \{ nestedErrors \} = error as AlternativeValidationError;
			      expect(nestedErrors[1]).toMatchObject(\{ msg: 'wow' \});
			    \});
			  \});
			
			  describe('#checkSchema()', () => \{
			    it('creates a schema with the extension methods', async () => \{
			      const \{ checkSchema \} = createInstance();
			      const custom = jest.fn();
			      const req = \{\};
			
			      const chains = checkSchema(\{
			        domain: \{
			          isAllowedDomain: true,
			          isCustom: \{ custom \},
			          removeEmailAttribute: true,
			        \},
			      \});
			
			      expect(chains[0].isAllowedDomain()).toBe(chains[0]);
			      expect(chains[0].removeEmailAttribute()).toBe(chains[0]);
			
			      await chains.run(req);
			      expect(isAllowedDomain).toHaveBeenCalled();
			      expect(removeEmailAttribute).toHaveBeenCalled();
			      expect(custom).toHaveBeenCalled();
			    \});
			
			    it('does not treat extension methods as inline custom validators/sanitizers', async () => \{
			      const \{ checkSchema \} = createInstance();
			      const custom = jest.fn();
			      const customSanitizer = jest.fn();
			      const req = \{\};
			
			      const chains = checkSchema(\{
			        domain: \{
			          // @ts-expect-error
			          isAllowedDomain: \{ custom \},
			          // @ts-expect-error
			          removeEmailAttribute: \{ customSanitizer \},
			        \},
			      \});
			
			      await chains.run(req);
			      // Should still run the instance implementation, instead of the inline ones
			      expect(isAllowedDomain).toHaveBeenCalled();
			      expect(removeEmailAttribute).toHaveBeenCalled();
			      expect(custom).not.toHaveBeenCalled();
			      expect(customSanitizer).not.toHaveBeenCalled();
			    \});
			  \});
			
			  describe('#validationResult()', () => \{
			    it('uses no error formatter by default', async () => \{
			      const req = \{\};
			      const \{ check, validationResult \} = new ExpressValidator();
			      await check('foo').exists().withMessage('not exists').run(req);
			
			      const [error] = validationResult(req).array();
			      expect(error).toEqual<ValidationError>(\{
			        type: 'field',
			        path: 'foo',
			        location: 'body',
			        value: undefined,
			        msg: 'not exists',
			      \});
			    \});
			
			    it('uses specified error formatter', async () => \{
			      const req = \{\};
			      const \{ check, validationResult \} = new ExpressValidator(undefined, undefined, \{
			        errorFormatter: err => \`\$\{err.type\}: \$\{err.msg\}\`,
			      \});
			      await check('foo').exists().withMessage('not exists').run(req);
			
			      const [error] = validationResult(req).array();
			      expect(error).toBe('field: not exists');
			    \});
			  \});
			
			  describe('#matchedData()', () => \{
			    it('can be used on custom chains', async () => \{
			      const req = \{ query: \{ foo: 1 \} \};
			      const \{ check, matchedData \} = createInstance();
			      await check('foo').isAllowedDomain().run(req);
			
			      const data = matchedData(req);
			      expect(data.foo).toBe(1);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\express-validator.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('express-validator_express-validator\\src\\field-selection.spec.ts', () => {
        const sourceCode = `
			import \{ reconstructFieldPath, selectFields, selectUnknownFields \} from './field-selection';
			
			describe('selectFields()', () => \{
			  it('selects single field from single location', () => \{
			    const req = \{ cookies: \{ foo: 'bar' \} \};
			    const instances = selectFields(req, ['foo'], ['cookies']);
			
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toEqual(\{
			      location: 'cookies',
			      path: 'foo',
			      originalPath: 'foo',
			      value: 'bar',
			    \});
			  \});
			
			  it('selects multiple fields from single location', () => \{
			    const req = \{ cookies: \{ foo: 'bar', baz: 'qux' \} \};
			    const instances = selectFields(req, ['foo', 'baz'], ['cookies']);
			
			    expect(instances).toHaveLength(2);
			    expect(instances[0]).toMatchObject(\{
			      location: 'cookies',
			      path: 'foo',
			      value: 'bar',
			    \});
			    expect(instances[1]).toMatchObject(\{
			      location: 'cookies',
			      path: 'baz',
			      value: 'qux',
			    \});
			  \});
			
			  it('selects single field from multiple locations', () => \{
			    const req = \{
			      cookies: \{ foo: 'bar' \},
			      params: \{\},
			    \};
			    const instances = selectFields(req, ['foo'], ['cookies', 'params']);
			
			    expect(instances).toHaveLength(2);
			    expect(instances[0]).toMatchObject(\{
			      location: 'cookies',
			      path: 'foo',
			      value: 'bar',
			    \});
			    expect(instances[1]).toMatchObject(\{
			      location: 'params',
			      path: 'foo',
			      value: undefined,
			    \});
			  \});
			
			  it('selects multiple fields from multiple locations', () => \{
			    const req = \{
			      cookies: \{ foo: 'bar' \},
			      params: \{ baz: 'qux' \},
			    \};
			    const instances = selectFields(req, ['foo', 'baz'], ['cookies', 'params']);
			
			    expect(instances).toHaveLength(4);
			    expect(instances[0]).toMatchObject(\{
			      location: 'cookies',
			      path: 'foo',
			      value: 'bar',
			    \});
			    expect(instances[1]).toMatchObject(\{
			      location: 'params',
			      path: 'foo',
			      value: undefined,
			    \});
			    expect(instances[2]).toMatchObject(\{
			      location: 'cookies',
			      path: 'baz',
			      value: undefined,
			    \});
			    expect(instances[3]).toMatchObject(\{
			      location: 'params',
			      path: 'baz',
			      value: 'qux',
			    \});
			  \});
			
			  it('selects nested key with dot-notation', () => \{
			    const req = \{
			      body: \{ foo: \{ bar: true \} \},
			    \};
			    const instances = selectFields(req, ['foo.bar'], ['body']);
			
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      location: 'body',
			      path: 'foo.bar',
			      value: true,
			    \});
			  \});
			
			  it('selects fields with special chars', () => \{
			    const req = \{
			      body: \{ 'http://foo.com': true \},
			    \};
			    const instances = selectFields(req, ['["http://foo.com"]'], ['body']);
			
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      location: 'body',
			      path: '["http://foo.com"]',
			      value: true,
			    \});
			  \});
			
			  it('selects array index with square brackets notation', () => \{
			    const req = \{
			      query: \{ foo: ['bar', 'baz'] \},
			    \};
			    const instances = selectFields(req, ['foo[1]'], ['query']);
			
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      location: 'query',
			      path: 'foo[1]',
			      value: 'baz',
			    \});
			  \});
			
			  it('selects from headers using lowercase', () => \{
			    const req = \{
			      headers: \{ 'content-type': 'application/json' \},
			    \};
			    const instances = selectFields(req, ['Content-Type'], ['headers']);
			
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      location: 'headers',
			      path: 'content-type',
			      originalPath: 'Content-Type',
			      value: 'application/json',
			    \});
			  \});
			
			  it('selects whole location when path is empty', () => \{
			    const req = \{
			      body: 'shake it, shake it!',
			    \};
			    const instances = selectFields(req, [''], ['body']);
			
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      location: 'body',
			      path: '',
			      originalPath: '',
			      value: 'shake it, shake it!',
			    \});
			  \});
			
			  it('selects inexistent properties', () => \{
			    const instances = selectFields(\{\}, ['foo.bar.baz'], ['cookies']);
			
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toEqual(\{
			      location: 'cookies',
			      path: 'foo.bar.baz',
			      originalPath: 'foo.bar.baz',
			      value: undefined,
			    \});
			  \});
			
			  it('does not select properties of primitives', () => \{
			    const req = \{
			      body: \{ foo: 1 \},
			    \};
			    const instances = selectFields(req, ['foo.toFixed'], ['body']);
			    expect(instances).toHaveLength(0);
			  \});
			
			  it('deduplicates field instances', () => \{
			    const req = \{
			      body: \{
			        foo: [\{ a: 123, b: 456 \}],
			      \},
			    \};
			
			    const instances = selectFields(req, ['*[0].*', 'foo.*.b'], ['body']);
			
			    expect(instances).toHaveLength(2);
			    expect(instances[0]).toMatchObject(\{
			      location: 'body',
			      path: 'foo[0].a',
			      value: 123,
			    \});
			    expect(instances[1]).toMatchObject(\{
			      location: 'body',
			      path: 'foo[0].b',
			      value: 456,
			    \});
			  \});
			
			  describe('wildcard', () => \{
			    it('selects all shallow instances of a key', () => \{
			      const req = \{
			        query: \{ foo: ['bar', 'baz'] \},
			      \};
			      const instances = selectFields(req, ['foo.*'], ['query']);
			
			      expect(instances).toHaveLength(2);
			      expect(instances[0]).toMatchObject(\{
			        location: 'query',
			        path: 'foo[0]',
			        originalPath: 'foo.*',
			        value: 'bar',
			      \});
			      expect(instances[1]).toMatchObject(\{
			        location: 'query',
			        path: 'foo[1]',
			        originalPath: 'foo.*',
			        value: 'baz',
			      \});
			    \});
			
			    it('selects all shallow instances when key is just the wildcard', () => \{
			      const req = \{
			        body: ['bar', 'baz'],
			      \};
			      const instances = selectFields(req, ['*'], ['body']);
			
			      expect(instances).toHaveLength(2);
			      expect(instances[0]).toMatchObject(\{
			        location: 'body',
			        path: '[0]',
			        originalPath: '*',
			        value: 'bar',
			      \});
			      expect(instances[1]).toMatchObject(\{
			        location: 'body',
			        path: '[1]',
			        originalPath: '*',
			        value: 'baz',
			      \});
			    \});
			
			    it('selects field if its path is a wildcard', () => \{
			      const req = \{
			        query: \{ '*': 'foo' \},
			      \};
			      const instances = selectFields(req, ['*'], ['query']);
			
			      expect(instances).toHaveLength(1);
			      expect(instances[0]).toMatchObject(\{
			        location: 'query',
			        path: '*',
			        originalPath: '*',
			        value: 'foo',
			      \});
			    \});
			
			    it('selects matching fields under wildcard branch', () => \{
			      const req = \{
			        query: \{ foo: \{ bar: \{ a: true \}, baz: \{ a: false, b: 1 \} \} \},
			      \};
			      const instances = selectFields(req, ['foo.*.a'], ['query']);
			
			      expect(instances).toHaveLength(2);
			      expect(instances[0]).toMatchObject(\{
			        location: 'query',
			        path: 'foo.bar.a',
			        originalPath: 'foo.*.a',
			        value: true,
			      \});
			      expect(instances[1]).toMatchObject(\{
			        location: 'query',
			        path: 'foo.baz.a',
			        originalPath: 'foo.*.a',
			        value: false,
			      \});
			    \});
			
			    it('selects nothing if wildcard position does not exist', () => \{
			      const req = \{
			        query: \{ foo: 'bar' \},
			      \};
			      const instances = selectFields(req, ['foo.*.baz'], ['query']);
			
			      expect(instances).toHaveLength(0);
			    \});
			  \});
			
			  describe('globstar', () => \{
			    it('selects all leaves that match a leaf globstar', () => \{
			      const req = \{
			        query: \{ foo: \{ a: \{ b: \{ c: 1 \} \}, d: \{ e: 2 \} \} \},
			      \};
			      const instances = selectFields(req, ['foo.**'], ['query']);
			
			      expect(instances).toHaveLength(2);
			      expect(instances[0]).toMatchObject(\{
			        location: 'query',
			        path: 'foo.a.b.c',
			        originalPath: 'foo.**',
			        value: 1,
			      \});
			      expect(instances[1]).toMatchObject(\{
			        location: 'query',
			        path: 'foo.d.e',
			        originalPath: 'foo.**',
			        value: 2,
			      \});
			    \});
			
			    it('selects deeply nested matching fields under a globstar branch', () => \{
			      const req = \{
			        query: \{ foo: \{ a: \{ b: \{ bar: 1 \} \}, c: \{ bar: 2 \} \} \},
			      \};
			      const instances = selectFields(req, ['foo.**.bar'], ['query']);
			
			      expect(instances).toHaveLength(2);
			      expect(instances[0]).toMatchObject(\{
			        location: 'query',
			        path: 'foo.a.b.bar',
			        originalPath: 'foo.**.bar',
			        value: 1,
			      \});
			      expect(instances[1]).toMatchObject(\{
			        location: 'query',
			        path: 'foo.c.bar',
			        originalPath: 'foo.**.bar',
			        value: 2,
			      \});
			    \});
			
			    it('selects branch and leaf when both match a globstar selector', () => \{
			      const req = \{
			        query: \{ foo: \{ foo: 1 \} \},
			      \};
			      const instances = selectFields(req, ['**.foo'], ['query']);
			
			      expect(instances).toHaveLength(2);
			      expect(instances[0]).toMatchObject(\{
			        location: 'query',
			        path: 'foo.foo',
			        originalPath: '**.foo',
			        value: 1,
			      \});
			      expect(instances[1]).toMatchObject(\{
			        location: 'query',
			        path: 'foo',
			        originalPath: '**.foo',
			        value: \{ foo: 1 \},
			      \});
			    \});
			
			    it('selects field if its path is a globstar', () => \{
			      const req = \{
			        query: \{ '**': 'foo' \},
			      \};
			      const instances = selectFields(req, ['**'], ['query']);
			
			      expect(instances).toHaveLength(1);
			      expect(instances[0]).toMatchObject(\{
			        location: 'query',
			        path: '**',
			        originalPath: '**',
			        value: 'foo',
			      \});
			    \});
			  \});
			\});
			
			describe('selectUnknownFields()', () => \{
			  it('selects top-level unknown fields', () => \{
			    const req = \{ body: \{ foo: 1, bar: 2, baz: 3 \} \};
			    const instances = selectUnknownFields(req, ['foo', 'baz'], ['body']);
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      path: 'bar',
			      value: 2,
			      location: 'body',
			    \});
			  \});
			
			  it('selects nested unknown fields', () => \{
			    const req = \{ body: \{ foo: \{ bar: 'hi', baz: 'hey' \} \} \};
			    const instances = selectUnknownFields(req, ['foo.bar'], ['body']);
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      path: 'foo.baz',
			      value: 'hey',
			      location: 'body',
			    \});
			  \});
			
			  it('selects nested unknown fields under an array', () => \{
			    const req = \{ body: \{ foo: ['bar', 'baz'] \} \};
			    const instances = selectUnknownFields(req, ['foo[0]'], ['body']);
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      path: 'foo[1]',
			      value: 'baz',
			      location: 'body',
			    \});
			  \});
			
			  // This one seems controversial.
			  // The nested property wouldn't pass validation - unless it's optional, in which case it's fair to
			  // argue that 'foo' should be selected?
			  it('does not select parent when only nested field is known and not an object', () => \{
			    const req = \{ body: \{ foo: 'bla' \} \};
			    const instances = selectUnknownFields(req, ['foo.bar'], ['body']);
			    expect(instances).toHaveLength(0);
			  \});
			
			  it('does not select any fields at a wildcard level', () => \{
			    const req = \{ body: \{ foo: 1, bar: 2 \} \};
			    const instances = selectUnknownFields(req, ['*'], ['body']);
			    expect(instances).toHaveLength(0);
			  \});
			
			  it('selects unknown fields nested under a wildcard', () => \{
			    const req = \{ body: \{ obj1: \{ foo: 1, bar: 2 \}, obj2: \{ foo: 3, baz: 4 \} \} \};
			    const instances = selectUnknownFields(req, ['*.foo'], ['body']);
			    expect(instances).toHaveLength(2);
			    expect(instances[0]).toMatchObject(\{
			      path: 'obj1.bar',
			      value: 2,
			      location: 'body',
			    \});
			    expect(instances[1]).toMatchObject(\{
			      path: 'obj2.baz',
			      value: 4,
			      location: 'body',
			    \});
			  \});
			
			  it('does not select any fields at a globstar level', () => \{
			    const req = \{ body: \{ foo: 1, bar: \{ baz: 2 \} \} \};
			    const instances = selectUnknownFields(req, ['**'], ['body']);
			    expect(instances).toHaveLength(0);
			  \});
			
			  it('selects unknown fields deeply nested under a globstar', () => \{
			    const req = \{ body: \{ obj1: \{ foo: 1, bar: 2 \}, obj2: \{ foo: 3, baz: \{ foo: 4, qux: 5 \} \} \} \};
			    const instances = selectUnknownFields(req, ['**.foo'], ['body']);
			    expect(instances).toHaveLength(2);
			    expect(instances[0]).toMatchObject(\{
			      path: 'obj1.bar',
			      value: 2,
			      location: 'body',
			    \});
			    expect(instances[1]).toMatchObject(\{
			      path: 'obj2.baz.qux',
			      value: 5,
			      location: 'body',
			    \});
			  \});
			
			  it('does not select any fields nested under a known field', () => \{
			    const req = \{ body: \{ obj1: \{ foo: 1, bar: 2 \} \} \};
			    const instances = selectUnknownFields(req, ['obj1', 'obj.foo'], ['body']);
			    expect(instances).toHaveLength(0);
			  \});
			
			  it('selects nothing if whole location is known', () => \{
			    const req = \{ body: 'foobar' \};
			    const instances = selectUnknownFields(req, [''], ['body']);
			    expect(instances).toHaveLength(0);
			  \});
			
			  it('selects whole location if it is unknown and not an object', () => \{
			    const req = \{ body: 'foobar' \};
			    const instances = selectUnknownFields(req, ['foo'], ['body']);
			    expect(instances).toHaveLength(1);
			    expect(instances[0]).toMatchObject(\{
			      path: '',
			      value: 'foobar',
			      location: 'body',
			    \});
			  \});
			
			  it('selects only from passed locations', () => \{
			    const req = \{ body: \{ foo: 1, bar: 2, baz: 3 \} \};
			    const instances = selectUnknownFields(req, ['foo', 'baz'], ['query']);
			    expect(instances).toHaveLength(0);
			  \});
			
			  it('selects from multiple locations', () => \{
			    const req = \{
			      body: \{ foo: 1, bar: 2 \},
			      query: \{ foo: 3, baz: 4 \},
			    \};
			    const instances = selectUnknownFields(req, ['foo'], ['body', 'query']);
			    expect(instances).toHaveLength(2);
			    expect(instances[0]).toMatchObject(\{
			      path: 'bar',
			      value: 2,
			      location: 'body',
			    \});
			    expect(instances[1]).toMatchObject(\{
			      path: 'baz',
			      value: 4,
			      location: 'query',
			    \});
			  \});
			\});
			
			describe('reconstructFieldPath()', () => \{
			  it.each([
			    ['single text segment', ['foo'], 'foo'],
			    ['multiple text segments', ['foo', 'bar', 'baz'], 'foo.bar.baz'],
			    ['trailing numeric segment', ['foo', '0'], 'foo[0]'],
			    ['numeric segment between text segments', ['foo', '0', 'bar'], 'foo[0].bar'],
			    ['numeric segment followed by numeric segment', ['foo', '0', '0'], 'foo[0][0]'],
			    ['text segment with a dot', ['foo', '.bar'], 'foo[".bar"]'],
			  ])('%s', (_name, input, expected) => \{
			    expect(reconstructFieldPath(input)).toBe(expected);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\field-selection.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(34)
    });
    it('express-validator_express-validator\\src\\matched-data.spec.ts', () => {
        const sourceCode = `
			import \{ check \} from './middlewares/validation-chain-builders';
			import \{ matchedData \} from './matched-data';
			import \{ oneOf \} from './middlewares/one-of';
			
			it('works if no validation or sanitization chains ran', () => \{
			  expect(matchedData(\{\})).toEqual(\{\});
			\});
			
			it('includes only valid, non-optional data by default', done => \{
			  const req = \{
			    headers: \{ foo: 'bla', bar: '123' \},
			  \};
			
			  const middleware = check(['foo', 'bar', 'baz']).optional().isInt();
			
			  middleware(req, \{\}, () => \{
			    expect(matchedData(req)).toEqual(\{
			      bar: '123',
			    \});
			
			    done();
			  \});
			\});
			
			it('includes data that was validated with wildcards', done => \{
			  const req = \{
			    headers: \{ foo: [1, 2, 3] \},
			    query: \{ bar: \{ baz: \{ qux: 4 \} \} \},
			  \};
			
			  check(['foo.*', '*.*.qux']).isInt()(req, \{\}, () => \{
			    expect(matchedData(req)).toEqual(\{
			      foo: [1, 2, 3],
			      bar: \{ baz: \{ qux: 4 \} \},
			    \});
			
			    done();
			  \});
			\});
			
			it('does not include valid data from invalid oneOf() chain group', done => \{
			  const req = \{
			    query: \{ foo: 'foo', bar: 123, baz: 'baz' \},
			  \};
			
			  oneOf([
			    [check('foo').equals('foo'), check('bar').not().isInt()],
			    [check('baz').equals('baz'), check('bar').isInt()],
			  ])(req, \{\}, () => \{
			    expect(matchedData(req)).toEqual(\{
			      bar: 123,
			      baz: 'baz',
			    \});
			    done();
			  \});
			\});
			
			describe('when option includeOptionals is true', () => \{
			  it('returns object with optional data', done => \{
			    const req = \{
			      headers: \{ foo: 'bla', bar: '123' \},
			    \};
			
			    const middleware = check(['foo', 'bar', 'baz']).optional().isInt();
			
			    middleware(req, \{\}, () => \{
			      const data = matchedData(req, \{ includeOptionals: true \});
			      expect(data).toHaveProperty('bar', '123');
			      expect(data).toHaveProperty('baz');
			
			      done();
			    \});
			  \});
			\});
			
			describe('when option onlyValidData is false', () => \{
			  it('returns object with invalid data', done => \{
			    const req = \{
			      headers: \{ foo: 'bla', bar: '123' \},
			    \};
			
			    check(['foo', 'bar']).isInt()(req, \{\}, () => \{
			      const data = matchedData(req, \{ onlyValidData: false \});
			      expect(data).toEqual(\{
			        foo: 'bla',
			        bar: '123',
			      \});
			
			      done();
			    \});
			  \});
			\});
			
			describe('when option locations is defined', () => \{
			  it('gathers only data from the locations specified', done => \{
			    const req = \{
			      headers: \{ foo: 'bla' \},
			      params: \{ bar: 123 \},
			      query: \{ baz: true \},
			    \};
			
			    check(['foo', 'bar', 'baz'])(req, \{\}, () => \{
			      const data = matchedData(req, \{
			        locations: ['params', 'query'],
			      \});
			
			      expect(data).toEqual(\{
			        bar: 123,
			        baz: true,
			      \});
			
			      done();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\matched-data.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(7)
    });
    it('express-validator_express-validator\\src\\middlewares\\check.spec.ts', () => {
        const sourceCode = `
			import \{ ContextHandlerImpl, ContextRunnerImpl, SanitizersImpl, ValidatorsImpl \} from '../chain';
			import \{ InternalRequest, contextsKey \} from '../base';
			import \{ check \} from './check';
			
			it('has context handler methods', () => \{
			  const chain = check('foo');
			  Object.keys(ContextHandlerImpl.prototype).forEach(method => \{
			    const fn = (chain as any)[method];
			    expect(typeof fn).toBe('function');
			  \});
			\});
			
			it('has sanitizer methods', () => \{
			  const chain = check('foo');
			  Object.keys(SanitizersImpl.prototype).forEach(method => \{
			    const fn = (chain as any)[method];
			    expect(typeof fn).toBe('function');
			  \});
			\});
			
			it('has validator methods', () => \{
			  const chain = check('foo');
			  Object.keys(ValidatorsImpl.prototype).forEach(method => \{
			    const fn = (chain as any)[method];
			    expect(typeof fn).toBe('function');
			  \});
			\});
			
			it('has context runner methods', () => \{
			  const chain = check('foo');
			  Object.keys(ContextRunnerImpl.prototype).forEach(method => \{
			    const fn = (chain as any)[method];
			    expect(typeof fn).toBe('function');
			  \});
			\});
			
			it('does not share contexts between chain runs', done => \{
			  const chain = check('foo', ['body']).isEmail();
			  const req1: InternalRequest = \{ body: \{ foo: 'bla' \} \};
			  chain(req1, \{\}, () => \{
			    const context1 = req1[contextsKey]![0];
			
			    const req2: InternalRequest = \{\};
			    chain(req2, \{\}, () => \{
			      expect(req2[contextsKey]).toHaveLength(1);
			      expect(req2[contextsKey]![0]).not.toBe(context1);
			      expect(req2[contextsKey]![0].errors).toHaveLength(1);
			      done();
			    \});
			  \});
			\});
			
			it('passes unexpected errors down to other middlewares', done => \{
			  const error = new Error();
			  const proto = ContextRunnerImpl.prototype;
			
			  const \{ run \} = proto;
			  proto.run = jest.fn().mockRejectedValue(error);
			
			  check('foo')(\{\}, \{\}, (err?: Error) => \{
			    expect(err).toBe(error);
			
			    proto.run = run;
			    done();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\middlewares\\check.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('express-validator_express-validator\\src\\middlewares\\exact.spec.ts', () => {
        const sourceCode = `
			import \{ checkExact \} from './exact';
			import \{ checkSchema \} from './schema';
			import \{ check \} from './validation-chain-builders';
			
			it.each([
			  ['single chain', check('banana')],
			  ['array of chains', [check('banana'), check('apple')]],
			  [
			    'mixed array of chains and array of chains',
			    [check('banana'), check('apple'), checkSchema(\{ pear: \{\} \})],
			  ],
			])('finds unknown fields given a %s', async (_description, chains) => \{
			  const req = \{
			    body: \{ banana: true \},
			    query: \{ orange: 1 \},
			  \};
			  const result = await checkExact(chains).run(req);
			  const errors = result.array();
			  expect(errors).toHaveLength(1);
			  expect(errors[0]).toMatchObject(\{
			    type: 'unknown_fields',
			    msg: 'Unknown field(s)',
			    fields: [\{ location: 'query', path: 'orange', value: 1 \}],
			  \});
			\});
			
			it('finds unknown fields from previously ran chains', async () => \{
			  const req = \{ query: \{ banana: 1, apple: 'red' \} \};
			  await check('banana').run(req);
			  const result = await checkExact().run(req);
			  const errors = result.array();
			  expect(errors).toHaveLength(1);
			  expect(errors[0]).toMatchObject(\{
			    type: 'unknown_fields',
			    msg: 'Unknown field(s)',
			    fields: [\{ location: 'query', path: 'apple', value: 'red' \}],
			  \});
			\});
			
			it('finds unknown fields only from the specified locations', async () => \{
			  const req = \{
			    body: \{ banana: 1 \},
			    headers: \{ apple: 'green' \},
			  \};
			  const result = await checkExact([], \{ locations: ['headers'] \}).run(req);
			  const errors = result.array();
			  expect(errors).toHaveLength(1);
			  expect(errors[0]).toMatchObject(\{
			    type: 'unknown_fields',
			    fields: [\{ location: 'headers', path: 'apple', value: 'green' \}],
			  \});
			\});
			
			it('finds unknown fields by default only from body, params and query', async () => \{
			  const req = \{
			    body: \{ banana: 1 \},
			    cookies: \{ apple: 2 \},
			    headers: \{ pear: 3 \},
			    params: \{ orange: 4 \},
			    query: \{ melon: 5 \},
			  \};
			  const result = await checkExact().run(req);
			  const errors = result.array();
			  expect(errors).toHaveLength(1);
			  expect(errors[0]).toMatchObject(\{
			    type: 'unknown_fields',
			    fields: [
			      \{ location: 'body', path: 'banana', value: 1 \},
			      \{ location: 'params', path: 'orange', value: 4 \},
			      \{ location: 'query', path: 'melon', value: 5 \},
			    ],
			  \});
			\});
			
			it('only adds an error if there are unknown fields', async () => \{
			  const req = \{
			    body: \{ banana: 1 \},
			    params: \{ apple: true \},
			  \};
			  const result = await checkExact([check('banana'), check('apple')]).run(req);
			  expect(result.isEmpty()).toBe(true);
			\});
			
			it('works as a middleware', done => \{
			  const req = \{\};
			  checkExact([])(req, \{\}, () => \{
			    done();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\middlewares\\exact.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('express-validator_express-validator\\src\\middlewares\\one-of.spec.ts', () => {
        const sourceCode = `
			import \{ InternalRequest, contextsKey \} from '../base';
			import \{ ContextRunnerImpl \} from '../chain/context-runner-impl';
			import \{ Result \} from '../validation-result';
			import \{ check \} from './validation-chain-builders';
			import \{ OneOfErrorType, OneOfOptions, oneOf \} from './one-of';
			
			const getOneOfContext = (req: InternalRequest) => \{
			  const contexts = req[contextsKey] || [];
			  return contexts[contexts.length - 1];
			\};
			
			it('runs chains passed to it as a dry-run', done => \{
			  const req = \{\};
			  const spy = jest.spyOn(ContextRunnerImpl.prototype, 'run');
			  oneOf([check('bar'), check('baz')])(req, \{\}, () => \{
			    expect(spy).toHaveBeenCalledTimes(3);
			    // Call 3 asserted by next test
			    expect(spy).toHaveBeenNthCalledWith(1, req, \{ dryRun: true \});
			    expect(spy).toHaveBeenNthCalledWith(2, req, \{ dryRun: true \});
			
			    spy.mockRestore();
			    done();
			  \});
			\});
			
			it('runs surrogate context created internally', done => \{
			  const req = \{\};
			  const spy = jest.spyOn(ContextRunnerImpl.prototype, 'run');
			  oneOf([check('bar'), check('baz')])(req, \{\}, () => \{
			    expect(spy).toHaveBeenCalledTimes(3);
			    // Calls 1 and 2 asserted by previous test
			    expect(spy).toHaveBeenNthCalledWith(3, req, undefined);
			
			    spy.mockRestore();
			    done();
			  \});
			\});
			
			it('runs in dry-run mode', async () => \{
			  const req = \{\};
			  const spy = jest.spyOn(ContextRunnerImpl.prototype, 'run');
			  await oneOf([check('bar'), check('baz')]).run(req, \{ dryRun: true \});
			  // Calls 1 and 2 asserted by previous test
			  expect(spy).toHaveBeenNthCalledWith(3, req, \{ dryRun: true \});
			  spy.mockRestore();
			\});
			
			it('passes unexpected errors down to other middlewares', done => \{
			  const error = new Error();
			  const spy = jest.spyOn(ContextRunnerImpl.prototype, 'run').mockRejectedValue(error);
			
			  oneOf([check('bar'), check('baz')])(\{\}, \{\}, (err?: any) => \{
			    expect(err).toBe(error);
			
			    spy.mockRestore();
			    done();
			  \});
			\});
			
			describe('with a list of chains', () => \{
			  it('sets a single error for the _error key', done => \{
			    const req: InternalRequest = \{
			      cookies: \{ foo: true, bar: 'def' \},
			    \};
			
			    oneOf([check('foo').isInt(), check('bar').isInt()])(req, \{\}, () => \{
			      const context = getOneOfContext(req);
			      expect(context.errors).toMatchSnapshot();
			      done();
			    \});
			  \});
			
			  it('does not set an error if any chain succeeded', done => \{
			    const req: InternalRequest = \{
			      cookies: \{ foo: true, bar: 123 \},
			    \};
			
			    oneOf([check('foo').isInt(), check('bar').isInt()])(req, \{\}, () => \{
			      const context = getOneOfContext(req);
			      expect(context.errors).toHaveLength(0);
			      done();
			    \});
			  \});
			\});
			
			describe('with a list of chain groups', () => \{
			  it('sets a single error for the _error key', done => \{
			    const req: InternalRequest = \{
			      cookies: \{ foo: true, bar: 'def', baz: 123 \},
			    \};
			
			    oneOf([[check('foo').isInt(), check('bar').isInt()], check('baz').isAlpha()])(req, \{\}, () => \{
			      const context = getOneOfContext(req);
			      expect(context.errors).toMatchSnapshot();
			      done();
			    \});
			  \});
			
			  it('does not set an error if any chain group succeeded', done => \{
			    const req: InternalRequest = \{
			      cookies: \{ foo: true, bar: 'def', baz: 'qux' \},
			    \};
			
			    oneOf([[check('foo').isInt(), check('bar').isInt()], check('baz').isAlpha()])(req, \{\}, () => \{
			      const context = getOneOfContext(req);
			      expect(context.errors).toHaveLength(0);
			      done();
			    \});
			  \});
			
			  it('stops running chains in a group when one of them has errors and request-level bail', done => \{
			    const req = \{
			      cookies: \{ foo: true, bar: 'def', baz: 'qux' \},
			    \};
			
			    const custom = jest.fn();
			    oneOf([
			      [check('foo').isInt().bail(\{ level: 'request' \}), check('bar').custom(custom)],
			      check('baz').isAlpha(),
			    ])(req, \{\}, () => \{
			      expect(custom).not.toHaveBeenCalled();
			      done();
			    \});
			  \});
			\});
			
			describe('error message', () => \{
			  it('is "Invalid value(s)" by default', done => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			
			    oneOf([check('foo').isInt()])(req, \{\}, () => \{
			      const context = getOneOfContext(req);
			      expect(context.errors[0]).toHaveProperty('msg', 'Invalid value(s)');
			      done();
			    \});
			  \});
			
			  it('can be a custom one', done => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			
			    oneOf([check('foo').isInt()], \{ message: 'not today' \})(req, \{\}, () => \{
			      const context = getOneOfContext(req);
			      expect(context.errors[0]).toHaveProperty('msg', 'not today');
			      done();
			    \});
			  \});
			
			  it('can be the return of a function', done => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			
			    const message = jest.fn(() => 'keep trying');
			    oneOf([check('foo').isInt()], \{ message \})(req, \{\}, () => \{
			      const context = getOneOfContext(req);
			      expect(context.errors).toMatchSnapshot();
			      done();
			    \});
			  \});
			\});
			
			describe('should let the user to choose between multiple error types', () => \{
			  const errors: OneOfErrorType[] = ['grouped', 'flat'];
			  it.each(errors)(\`%s error type\`, async errorType => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			    const options: OneOfOptions = \{
			      errorType,
			    \};
			
			    await oneOf([check('foo').isString(), check('bar').isFloat()], options).run(req);
			    const context = getOneOfContext(req);
			    expect(context.errors).toMatchSnapshot();
			  \});
			
			  it('least_errored error type', done => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true, bar: 'bar' \},
			    \};
			    const options: OneOfOptions = \{
			      errorType: 'least_errored',
			    \};
			
			    oneOf(
			      [
			        [check('foo').isFloat(), check('bar').isInt()],
			        [check('foo').isString(), check('bar').isString()], // least errored
			        [check('foo').isFloat(), check('bar').isBoolean()],
			      ],
			      options,
			    )(req, \{\}, () => \{
			      const context = getOneOfContext(req);
			      expect(context.errors).toMatchSnapshot();
			      done();
			    \});
			  \});
			\});
			
			describe('should default to grouped errorType', () => \{
			  it('when no options are provided', async () => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			    await oneOf([check('foo').isString(), check('bar').isFloat()]).run(req);
			    const context = getOneOfContext(req);
			    expect(context.errors[0]).toEqual(
			      expect.objectContaining(\{
			        type: 'alternative_grouped',
			        nestedErrors: [expect.anything(), expect.anything()],
			      \}),
			    );
			  \});
			
			  it('when invalid error type is provided', async () => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			    await oneOf([check('foo').isString(), check('bar').isFloat()], \{
			      // @ts-ignore
			      errorType: 'invalid error type',
			    \}).run(req);
			    const context = getOneOfContext(req);
			    expect(context.errors[0]).toEqual(
			      expect.objectContaining(\{
			        type: 'alternative_grouped',
			        nestedErrors: [expect.anything(), expect.anything()],
			      \}),
			    );
			  \});
			\});
			
			describe('imperatively run oneOf', () => \{
			  it('sets errors in context when validation fails', async () => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			
			    const middleware = oneOf([check('foo').isInt()]);
			    await middleware.run(req);
			
			    const context = getOneOfContext(req);
			    expect(context.errors.length).toEqual(1);
			  \});
			
			  it('should throw an error if ContextRunner throws', async () => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			    const error = new Error();
			    const spy = jest.spyOn(ContextRunnerImpl.prototype, 'run').mockRejectedValue(error);
			
			    const middleware = oneOf([check('foo').isBoolean()]);
			    await expect(middleware.run(req)).rejects.toThrow(error);
			    spy.mockRestore();
			  \});
			
			  it('sets no error in context when successful', async () => \{
			    const req: InternalRequest = \{
			      body: \{ foo: true \},
			    \};
			
			    const middleware = oneOf([check('foo').isBoolean()]);
			    const result = await middleware.run(req);
			
			    const context = getOneOfContext(req);
			    expect(result).toBeInstanceOf(Result);
			    expect(context.errors.length).toEqual(0);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\middlewares\\one-of.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(18)
    });
    it('express-validator_express-validator\\src\\middlewares\\schema.spec.ts', () => {
        const sourceCode = `
			import \{ ValidationChain \} from '../chain';
			import \{ checkSchema \} from './schema';
			
			const chainToContext = (chain: ValidationChain) => chain.builder.build();
			
			it('creates a validation chain for each field in the schema', () => \{
			  const chains = checkSchema(\{
			    foo: \{ isInt: true \},
			    bar: \{ isAlpha: true \},
			  \});
			
			  expect(chains).toHaveLength(2);
			  expect(chainToContext(chains[0]).fields).toEqual(['foo']);
			  expect(chainToContext(chains[1]).fields).toEqual(['bar']);
			\});
			
			it('creates chain with an error message', () => \{
			  const chain = checkSchema(\{
			    foo: \{
			      errorMessage: 'bar',
			    \},
			  \})[0];
			
			  expect(chainToContext(chain).message).toBe('bar');
			\});
			
			describe('locations', () => \{
			  it('includes by default all of them', () => \{
			    const chain = checkSchema(\{
			      foo: \{\},
			    \})[0];
			
			    expect(chainToContext(chain).locations).toEqual([
			      'body',
			      'cookies',
			      'headers',
			      'params',
			      'query',
			    ]);
			  \});
			
			  it('includes all of the specified ones', () => \{
			    const chain = checkSchema(
			      \{
			        foo: \{\},
			      \},
			      ['headers', 'cookies'],
			    )[0];
			
			    expect(chainToContext(chain).locations).toEqual(['headers', 'cookies']);
			  \});
			
			  it('includes location in "in" when string', () => \{
			    const chain = checkSchema(\{
			      foo: \{
			        in: 'body',
			      \},
			    \})[0];
			
			    expect(chainToContext(chain).locations).toEqual(['body']);
			  \});
			
			  it('includes locations in "in" when array', () => \{
			    const chain = checkSchema(\{
			      foo: \{
			        in: ['params', 'body'],
			      \},
			    \})[0];
			
			    expect(chainToContext(chain).locations).toEqual(['params', 'body']);
			  \});
			\});
			
			describe('on each field', () => \{
			  it('adds known validators/sanitizers', () => \{
			    const chain = checkSchema(\{
			      foo: \{
			        errorMessage: 'bla',
			        isInt: true,
			        escape: true,
			      \},
			    \})[0];
			
			    expect(chainToContext(chain).stack).toHaveLength(2);
			  \});
			
			  // #1223
			  it('does not warn and does not add disabled validators/sanitizers', () => \{
			    const spy = jest.spyOn(console, 'warn');
			
			    const chain = checkSchema(\{
			      foo: \{
			        isInt: false,
			        escape: false,
			      \},
			    \})[0];
			
			    expect(chainToContext(chain).stack).toHaveLength(0);
			    expect(spy).not.toHaveBeenCalled();
			    spy.mockRestore();
			  \});
			
			  it('warns and does not add unknown validators/sanitizers', () => \{
			    const spy = jest.spyOn(console, 'warn');
			
			    const chain = checkSchema(\{
			      foo: \{
			        // @ts-expect-error
			        isBla: true,
			      \},
			    \})[0];
			
			    expect(chainToContext(chain).stack).toHaveLength(0);
			    expect(spy).toHaveBeenCalled();
			    spy.mockRestore();
			  \});
			
			  it('warns and does not add validators called not and withMessage', () => \{
			    const spy = jest.spyOn(console, 'warn');
			
			    const chain = checkSchema(\{
			      foo: \{
			        // @ts-expect-error
			        withMessage: 'bla',
			        // @ts-expect-error
			        not: true,
			      \},
			    \})[0];
			
			    expect(chainToContext(chain).stack).toHaveLength(0);
			    expect(spy).toHaveBeenCalled();
			    spy.mockRestore();
			  \});
			
			  it('adds with options', async () => \{
			    const schema = checkSchema(\{
			      foo: \{
			        custom: \{
			          options: value => value > 0,
			        \},
			      \},
			      bar: \{
			        whitelist: \{
			          options: ['a'],
			        \},
			      \},
			    \});
			
			    const results = await Promise.all(
			      schema.map(chain =>
			        chain.run(\{
			          query: \{ foo: 0, bar: 'baz' \},
			        \}),
			      ),
			    );
			
			    expect(results[0].context.errors).toHaveLength(1);
			    expect(results[1].context.getData()).toContainEqual(
			      expect.objectContaining(\{ path: 'bar', value: 'a' \}),
			    );
			  \});
			
			  it('halts chain execution if "if" statement resolves to false', async () => \{
			    const schema = checkSchema(\{
			      foo: \{
			        isEmpty: \{
			          if: (value: any) => \{
			            return value !== '';
			          \},
			        \},
			      \},
			    \});
			
			    const \{ context \} = await schema[0].run(\{ query: \{ foo: '' \} \});
			
			    expect(context.errors).toHaveLength(0);
			  \});
			
			  it('sets error message', () => \{
			    const chain = checkSchema(\{
			      foo: \{
			        isInt: \{
			          errorMessage: 'bla',
			        \},
			      \},
			    \})[0];
			
			    expect(chainToContext(chain).stack[0]).toHaveProperty('message', 'bla');
			  \});
			
			  // #548
			  it('does not set error message from non-validators', () => \{
			    const chain = checkSchema(\{
			      foo: \{
			        isInt: \{
			          errorMessage: 'from toInt',
			        \},
			        optional: \{
			          errorMessage: 'from optional',
			        \},
			        toInt: \{
			          errorMessage: 'from toInt',
			        \},
			      \} as any, // as any because of JS consumers doing the wrong thing
			    \})[0];
			
			    const isInt = chainToContext(chain).stack[0];
			    expect(isInt).toHaveProperty('message', 'from toInt');
			  \});
			
			  it('can be marked as optional', () => \{
			    const schema = checkSchema(\{
			      foo: \{
			        optional: true,
			      \},
			      bar: \{
			        optional: \{
			          options: \{
			            checkFalsy: true,
			            nullable: true,
			          \},
			        \},
			      \},
			    \});
			
			    expect(chainToContext(schema[0]).optional).toBe('undefined');
			    expect(chainToContext(schema[1]).optional).toBe('falsy');
			  \});
			
			  it('can negate validators', async () => \{
			    const chain = checkSchema(\{
			      foo: \{
			        isEmpty: \{
			          negated: true,
			        \},
			      \},
			    \})[0];
			
			    const \{ context \} = await chain.run(\{ params: \{ foo: '' \} \});
			    expect(context.errors).toHaveLength(1);
			  \});
			
			  it('can set custom validators with random names', async () => \{
			    const validator1 = jest.fn();
			    const validator2 = jest.fn();
			    const schema = checkSchema(\{
			      foo: \{
			        isFoo: \{ custom: validator1 \},
			        replace: \{
			          options: ['foo', 'bar'],
			        \},
			        isBar: \{ custom: validator2 \},
			      \},
			    \});
			    await schema.run(\{
			      body: \{ foo: 'foo' \},
			    \});
			    expect(validator1).toHaveBeenCalledWith('foo', expect.objectContaining(\{\}));
			    expect(validator2).toHaveBeenCalledWith('bar', expect.objectContaining(\{\}));
			  \});
			
			  it('does not run a custom validator specified under a standard validator/sanitizer name', async () => \{
			    const validator = jest.fn();
			    const schema = checkSchema(\{
			      foo: \{
			        isInt: \{
			          // @ts-expect-error
			          custom: validator,
			        \},
			        toInt: \{
			          // @ts-expect-error
			          custom: validator,
			        \},
			      \},
			    \});
			    await schema.run(\{\});
			    expect(validator).not.toHaveBeenCalled();
			  \});
			
			  it('can set custom sanitizers with random names', async () => \{
			    const sanitizer1 = jest.fn(() => 'foo');
			    const sanitizer2 = jest.fn(() => 'baz');
			    const schema = checkSchema(\{
			      foo: \{
			        toFoo: \{ customSanitizer: sanitizer1 \},
			        replace: \{
			          options: ['foo', 'bar'],
			        \},
			        toBaz: \{ customSanitizer: sanitizer2 \},
			      \},
			    \});
			    await schema.run(\{
			      body: \{ foo: 1 \},
			    \});
			    expect(sanitizer1).toHaveBeenCalledWith(1, expect.objectContaining(\{\}));
			    expect(sanitizer2).toHaveBeenCalledWith('bar', expect.objectContaining(\{\}));
			  \});
			
			  it('does not run a custom sanitizer specified under a standard validator/sanitizer name', async () => \{
			    const sanitizer = jest.fn();
			    const schema = checkSchema(\{
			      foo: \{
			        isInt: \{
			          // @ts-expect-error
			          customSanitizer: sanitizer,
			        \},
			        toInt: \{
			          // @ts-expect-error
			          customSanitizer: sanitizer,
			        \},
			      \},
			    \});
			    await schema.run(\{\});
			    expect(sanitizer).not.toHaveBeenCalled();
			  \});
			\});
			
			describe('on schema that contains fields with bail methods', () => \{
			  it('stops validation chain with only one error', async () => \{
			    const schema = checkSchema(\{
			      foo: \{
			        exists: \{
			          bail: true,
			        \},
			        isLength: \{
			          options: \{
			            min: 5,
			          \},
			        \},
			      \},
			    \});
			
			    const \{ context \} = await schema[0].run(\{ params: \{\} \});
			    expect(context.errors).toHaveLength(1);
			  \});
			
			  it('does not bail if value is valid', async () => \{
			    const schema = checkSchema(\{
			      foo: \{
			        exists: \{
			          bail: true,
			        \},
			        isLength: \{
			          options: \{
			            max: 5,
			          \},
			        \},
			      \},
			    \});
			
			    const \{ context \} = await schema[0].run(\{ params: \{ foo: 'a' \} \});
			    expect(context.errors).toHaveLength(0);
			  \});
			
			  it('bails with message', async () => \{
			    const schema = checkSchema(\{
			      foo: \{
			        exists: \{
			          bail: true,
			          errorMessage: 'Value not exists',
			        \},
			        isLength: \{
			          options: \{
			            max: 5,
			          \},
			        \},
			      \},
			    \});
			
			    const \{ context \} = await schema[0].run(\{ params: \{\} \});
			    expect(context.errors).toHaveLength(1);
			    expect(chainToContext(schema[0]).stack[0]).toHaveProperty('message', 'Value not exists');
			  \});
			
			  it('support multiple bail methods', async () => \{
			    const schema = checkSchema(\{
			      foo: \{
			        exists: \{
			          bail: true,
			        \},
			        isEmail: \{
			          bail: true,
			        \},
			        isLength: \{
			          options: \{
			            min: 11,
			          \},
			        \},
			      \},
			    \});
			
			    const \{ context \} = await schema[0].run(\{ params: \{ foo: 'notAnEmail' \} \});
			    expect(context.errors).toHaveLength(1);
			  \});
			
			  it('support request-level bail methods', async () => \{
			    const schema = checkSchema(\{
			      foo: \{
			        isEmail: \{
			          bail: \{ level: 'request' \},
			        \},
			      \},
			      bar: \{
			        isEmail: true,
			      \},
			    \});
			
			    const contexts = await schema.run(\{ params: \{ foo: 'notAnEmail' \} \});
			    // there's no second context, as the second chain wasn't run.
			    expect(contexts).toHaveLength(1);
			    expect(contexts[0].array()).toHaveLength(1);
			  \});
			\});
			
			it('run checkSchema imperatively', async () => \{
			  const req = \{
			    body: \{ foo: 'foo' \},
			  \};
			  const schema = checkSchema(\{
			    foo: \{
			      exists: true,
			      isString: true,
			    \},
			  \});
			
			  return expect(schema.run(req)).resolves;
			\});
			
			it('correctly pass falsy values to \`options\` property of methods', async () => \{
			  const req = \{
			    body: \{ foo: undefined \},
			  \};
			  const schema = checkSchema(\{
			    foo: \{
			      in: ['body'],
			      default: \{ options: 0 \},
			    \},
			  \});
			  await schema.run(req);
			  expect(req.body.foo).toEqual(0);
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\middlewares\\schema.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(27)
    });
    it('express-validator_express-validator\\src\\middlewares\\validation-chain-builders.spec.ts', () => {
        const sourceCode = `
			import \{ Request, ValidationError \} from '../base';
			import \{ validationResult \} from '../validation-result';
			import \{ ValidationChain \} from '../chain';
			import \{
			  body,
			  buildCheckFunction,
			  check,
			  cookie,
			  header,
			  param,
			  query,
			\} from './validation-chain-builders';
			
			let req: Request;
			const runAndGetErrors = (chain: ValidationChain, req: Request) =>
			  new Promise<ValidationError[]>(resolve => \{
			    chain(req, \{\}, () => \{
			      resolve(validationResult(req).array());
			    \});
			  \});
			
			beforeEach(() => \{
			  req = \{
			    body: \{ foo: 'asd' \},
			    cookies: \{ foo: 'asd' \},
			    headers: \{ foo: 'asd' \},
			    params: \{ foo: 'asd' \},
			    query: \{ foo: 'asd' \},
			  \};
			\});
			
			describe('buildCheckFunction()', () => \{
			  it('creates a validation chain builder that checks custom locations', async () => \{
			    const custom = buildCheckFunction(['cookies', 'headers']);
			    const chain = custom('foo').isInt();
			    const errors = await runAndGetErrors(chain, req);
			    expect(errors).toHaveLength(2);
			    expect(errors[0]).toEqual(\{
			      type: 'field',
			      location: 'cookies',
			      msg: 'Invalid value',
			      path: 'foo',
			      value: 'asd',
			    \});
			    expect(errors![1]).toEqual(\{
			      type: 'field',
			      location: 'headers',
			      msg: 'Invalid value',
			      path: 'foo',
			      value: 'asd',
			    \});
			  \});
			\});
			
			describe('check()', () => \{
			  // TODO: Can't use it.each because it doesn't support done() in TypeScript
			  ['body', 'cookies', 'headers', 'params', 'query'].forEach(location => \{
			    it(\`checks \$\{location\}\`, async () => \{
			      const req: Request = \{ [location]: \{ foo: 'asd' \} \};
			      const chain = check('foo').isInt();
			      const errors = await runAndGetErrors(chain, req);
			      expect(errors).toHaveLength(1);
			      expect(errors[0]).toEqual(expect.objectContaining(\{ type: 'field', location \}));
			    \});
			  \});
			
			  it('checks all locations at the same time', async () => \{
			    const chain = check('foo').isInt();
			    const errors = await runAndGetErrors(chain, req);
			    expect(errors).toHaveLength(5);
			  \});
			\});
			
			describe('body()', () => \{
			  it('checks only the body location', async () => \{
			    const chain = body('foo').isInt();
			    const errors = await runAndGetErrors(chain, req);
			    expect(errors).toHaveLength(1);
			    expect(errors[0]).toEqual(expect.objectContaining(\{ type: 'field', location: 'body' \}));
			  \});
			\});
			
			describe('cookie()', () => \{
			  it('checks only the cookie location', async () => \{
			    const chain = cookie('foo').isInt();
			    const errors = await runAndGetErrors(chain, req);
			    expect(errors).toHaveLength(1);
			    expect(errors[0]).toEqual(expect.objectContaining(\{ type: 'field', location: 'cookies' \}));
			  \});
			\});
			
			describe('header()', () => \{
			  it('checks only the header location', async () => \{
			    const chain = header('foo').isInt();
			    const errors = await runAndGetErrors(chain, req);
			    expect(errors).toHaveLength(1);
			    expect(errors[0]).toEqual(expect.objectContaining(\{ type: 'field', location: 'headers' \}));
			  \});
			\});
			
			describe('param()', () => \{
			  it('checks only the param location', async () => \{
			    const chain = param('foo').isInt();
			    const errors = await runAndGetErrors(chain, req);
			    expect(errors).toHaveLength(1);
			    expect(errors[0]).toEqual(expect.objectContaining(\{ type: 'field', location: 'params' \}));
			  \});
			\});
			
			describe('query()', () => \{
			  it('checks only the query location', async () => \{
			    const chain = query('foo').isInt();
			    const errors = await runAndGetErrors(chain, req);
			    expect(errors).toHaveLength(1);
			    expect(errors[0]).toEqual(expect.objectContaining(\{ type: 'field', location: 'query' \}));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\middlewares\\validation-chain-builders.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('express-validator_express-validator\\src\\validation-result.spec.ts', () => {
        const sourceCode = `
			import \{ ValidationError, contextsKey \} from './base';
			import \{ ErrorFormatter, validationResult \} from './validation-result';
			import \{ ContextBuilder \} from './context-builder';
			
			const allErrors: ValidationError[] = [
			  \{ type: 'field', path: 'foo', msg: 'blabla', location: 'body', value: 123 \},
			  \{ type: 'field', path: 'foo', msg: 'watwat', location: 'body', value: 123 \},
			  \{ type: 'field', path: 'bar', msg: 'yay', location: 'query', value: 'qux' \},
			];
			
			const makeContextsList = (errors: ValidationError[]) => \{
			  const context1 = new ContextBuilder().build();
			  Object.defineProperty(context1, 'errors', \{
			    value: errors.slice(0, 1),
			  \});
			
			  const context2 = new ContextBuilder().build();
			  Object.defineProperty(context2, 'errors', \{
			    value: errors.slice(1),
			  \});
			
			  return [context1, context2];
			\};
			
			it('works when there are no errors', () => \{
			  const result = validationResult(\{\});
			  expect(() => result.throw()).not.toThrow();
			  expect(result.mapped()).toEqual(\{\});
			  expect(result.array()).toEqual([]);
			  expect(result.isEmpty()).toBe(true);
			\});
			
			describe('#isEmpty()', () => \{
			  it('returns whether there are errors', () => \{
			    let result = validationResult(\{ [contextsKey]: makeContextsList([]) \});
			    expect(result.isEmpty()).toBe(true);
			
			    result = validationResult(\{ [contextsKey]: makeContextsList(allErrors) \});
			    expect(result.isEmpty()).toBe(false);
			  \});
			\});
			
			describe('#array()', () => \{
			  it('returns all errors', () => \{
			    const result = validationResult(\{ [contextsKey]: makeContextsList(allErrors) \});
			    expect(result.array()).toEqual(allErrors);
			  \});
			
			  it('returns only the first error for each field when onlyFirstError = true', () => \{
			    const result = validationResult(\{ [contextsKey]: makeContextsList(allErrors) \});
			    expect(result.array(\{ onlyFirstError: true \})).toEqual([allErrors[0], allErrors[2]]);
			  \});
			\});
			
			describe('#mapped()', () => \{
			  it('returns an object with the first error of each field', () => \{
			    const result = validationResult(\{ [contextsKey]: makeContextsList(allErrors) \});
			    expect(result.mapped()).toEqual(\{
			      foo: allErrors[0],
			      bar: allErrors[2],
			    \});
			  \});
			\});
			
			describe('#throw()', () => \{
			  it('does not throw when there are no errors', () => \{
			    const result = validationResult(\{ [contextsKey]: makeContextsList([]) \});
			    expect(() => result.throw()).not.toThrow();
			  \});
			
			  it('throws when there are errors', () => \{
			    const result = validationResult(\{ [contextsKey]: makeContextsList(allErrors) \});
			    expect(() => result.throw()).toThrowError();
			  \});
			
			  it('throws error decorated as Result', done => \{
			    const result = validationResult(\{ [contextsKey]: makeContextsList(allErrors) \});
			    try \{
			      result.throw();
			      done(new Error('no errors thrown'));
			    \} catch (e) \{
			      expect(e.mapped()).toEqual(\{ foo: allErrors[0], bar: allErrors[2] \});
			      expect(e.array()).toEqual(allErrors);
			      done();
			    \}
			  \});
			\});
			
			describe('#formatWith()', () => \{
			  it('returns a new instance of Result', () => \{
			    const result = validationResult(\{ [contextsKey]: makeContextsList([]) \});
			    expect(result.formatWith(err => err.msg)).not.toBe(result);
			  \});
			
			  it('sets a new formatter that is used with #array()', () => \{
			    const formatter: ErrorFormatter = err => err.msg;
			    const result = validationResult(\{ [contextsKey]: makeContextsList(allErrors) \}).formatWith(
			      formatter,
			    );
			
			    expect(result.array()).toEqual(allErrors.map(formatter));
			  \});
			
			  it('sets a new formatter that is used with #mapped()', () => \{
			    const formatter: ErrorFormatter = err => err.msg;
			    const result = validationResult(\{ [contextsKey]: makeContextsList(allErrors) \}).formatWith(
			      formatter,
			    );
			
			    expect(result.mapped()).toEqual(\{
			      foo: formatter(allErrors[0]),
			      bar: formatter(allErrors[2]),
			    \});
			  \});
			\});
			
			describe('.withDefaults()', () => \{
			  it('lets specify custom default formatter', () => \{
			    let formatter: ErrorFormatter = err => \`\$\{err.type\} is broken, fix it\`;
			    const customFactory = validationResult.withDefaults(\{ formatter \});
			
			    let result = customFactory(\{ [contextsKey]: makeContextsList(allErrors) \});
			    expect(result.array()).toEqual(allErrors.map(formatter));
			
			    formatter = err => err.msg;
			    result = result.formatWith(formatter);
			    expect(result.array()).toEqual(allErrors.map(formatter));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'express-validator_express-validator\\src\\validation-result.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(12)
    });
});
