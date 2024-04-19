const { extractFromSource } = require('../../src/extractor');

describe('react-hook-form_react-hook-form', () => {
    it('react-hook-form_react-hook-form\\src\\__tests__\\controller.server.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ renderToString \} from 'react-dom/server';
			
			import \{ Controller \} from '../controller';
			import \{ useForm \} from '../useForm';
			
			describe('Controller with SSR', () => \{
			  // issue: https://github.com/react-hook-form/react-hook-form/issues/1398
			  it('should render correctly with as with component', () => \{
			    const Component = () => \{
			      const \{ control \} = useForm<\{
			        test: string;
			      \}>();
			
			      return (
			        <Controller
			          defaultValue="default"
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			        />
			      );
			    \};
			
			    renderToString(<Component />);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\controller.server.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\controller.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			  waitForElementToBeRemoved,
			\} from '@testing-library/react';
			
			import \{ Controller \} from '../controller';
			import \{ useFieldArray \} from '../useFieldArray';
			import \{ useForm \} from '../useForm';
			import \{ FormProvider \} from '../useFormContext';
			import \{ useWatch \} from '../useWatch';
			
			function Input(\{
			  onChange,
			  onBlur,
			  placeholder,
			\}: \{
			  onChange: (newValue: string) => void;
			  onBlur: () => void;
			  placeholder?: string;
			\}) \{
			  return (
			    <input
			      placeholder=\{placeholder\}
			      onChange=\{(event) => onChange(event.target.value)\}
			      onBlur=\{() => onBlur()\}
			    />
			  );
			\}
			
			describe('Controller', () => \{
			  it('should render correctly with as with string', () => \{
			    const Component = () => \{
			      const \{ control \} = useForm();
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    const input = screen.getByRole('textbox') as HTMLInputElement;
			
			    expect(input).toBeVisible();
			    expect(input.name).toBe('test');
			  \});
			
			  it('should render correctly with as with component', () => \{
			    const Component = () => \{
			      const \{ control \} = useForm();
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    const input = screen.getByRole('textbox') as HTMLInputElement;
			
			    expect(input).toBeVisible();
			    expect(input?.name).toBe('test');
			  \});
			
			  it('should reset value', async () => \{
			    const Component = () => \{
			      const \{ reset, control \} = useForm();
			
			      return (
			        <>
			          <Controller
			            defaultValue="default"
			            name="test"
			            render=\{(\{ field \}) => <input \{...field\} />\}
			            control=\{control\}
			          />
			          <button
			            type="button"
			            onClick=\{() =>
			              reset(\{
			                test: 'default',
			              \})
			            \}
			          >
			            reset
			          </button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByRole('textbox'), \{ target: \{ value: 'test' \} \});
			    expect(screen.getByRole('textbox')).toHaveValue('test');
			
			    fireEvent.click(screen.getByRole('button', \{ name: /reset/i \}));
			    expect(screen.getByRole('textbox')).toHaveValue('default');
			  \});
			
			  it('should set defaultValue to value props when input was reset', () => \{
			    const Component = () => \{
			      const \{ reset, control \} = useForm<\{
			        test: string;
			      \}>();
			
			      React.useEffect(() => \{
			        reset(\{ test: 'default' \});
			      \}, [reset]);
			
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    expect(screen.getByRole('textbox')).toHaveValue('default');
			  \});
			
			  it('should render when registered field values are updated', () => \{
			    const Component = () => \{
			      const \{ control \} = useForm();
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByRole('textbox'), \{ target: \{ value: 'test' \} \});
			
			    expect(screen.getByRole('textbox')).toHaveValue('test');
			  \});
			
			  it("should trigger component's onChange method and invoke setValue method", () => \{
			    let fieldValues: unknown;
			    const Component = () => \{
			      const \{ control, getValues \} = useForm();
			
			      return (
			        <>
			          <Controller
			            defaultValue=""
			            name="test"
			            render=\{(\{ field \}) => <input \{...field\} />\}
			            control=\{control\}
			          />
			          <button onClick=\{() => (fieldValues = getValues())\}>getValues</button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByRole('textbox'), \{
			      target: \{ value: 'test' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /getValues/ \}));
			
			    expect(fieldValues).toEqual(\{ test: 'test' \});
			  \});
			
			  it("should trigger component's onChange method and invoke trigger method", async () => \{
			    let errors: any;
			    const Component = () => \{
			      const \{ control, ...rest \} = useForm(\{ mode: 'onChange' \});
			
			      errors = rest.formState.errors;
			
			      return (
			        <Controller
			          defaultValue="test"
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			          rules=\{\{ required: true \}\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByRole('textbox'), \{
			      target: \{ value: '' \},
			    \});
			
			    await waitFor(() => expect(errors.test).toBeDefined());
			  \});
			
			  it("should trigger component's onBlur method and invoke trigger method", async () => \{
			    let errors: any;
			    const Component = () => \{
			      const \{ control, ...rest \} = useForm(\{ mode: 'onBlur' \});
			
			      errors = rest.formState.errors;
			
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			          rules=\{\{ required: true \}\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.blur(screen.getByRole('textbox'), \{
			      target: \{ value: '' \},
			    \});
			
			    await waitFor(() => expect(errors.test).toBeDefined());
			  \});
			
			  it('should set field to formState.touchedFields', async () => \{
			    let touched: any;
			    const Component = () => \{
			      const \{ control, formState \} = useForm(\{ mode: 'onBlur' \});
			
			      touched = formState.touchedFields;
			
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    expect(touched).toEqual(\{ test: true \});
			  \});
			
			  it('should call trigger method when re-validate mode is onBlur with blur event', async () => \{
			    const Component = () => \{
			      const \{
			        handleSubmit,
			        control,
			        formState: \{ errors \},
			      \} = useForm(\{
			        reValidateMode: 'onBlur',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <Controller
			            defaultValue=""
			            name="test"
			            render=\{(\{ field \}) => <input \{...field\} />\}
			            control=\{control\}
			            rules=\{\{ required: true \}\}
			          />
			          \{errors.test && <span role="alert">required</span>\}
			          <button>submit</button>
			        </form>
			      );
			    \};
			    render(<Component />);
			
			    fireEvent.blur(screen.getByRole('textbox'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
			
			    fireEvent.submit(screen.getByRole('button'));
			
			    fireEvent.input(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(await screen.findByRole('alert')).toBeVisible();
			
			    fireEvent.blur(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    await waitForElementToBeRemoved(screen.queryByRole('alert'));
			  \});
			
			  it('should invoke custom event named method', () => \{
			    let fieldValues: any;
			    const Component = () => \{
			      const \{ control, getValues \} = useForm();
			      return (
			        <>
			          <Controller
			            defaultValue=""
			            name="test"
			            render=\{(\{ field: props \}) => \{
			              return <input \{...props\} />;
			            \}\}
			            control=\{control\}
			          />
			          <button onClick=\{() => (fieldValues = getValues())\}>getValues</button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /getValues/ \}));
			
			    expect(fieldValues).toEqual(\{ test: 'test' \});
			  \});
			
			  it('should invoke custom onChange method', () => \{
			    const onChange = jest.fn();
			    const Component = () => \{
			      const \{ control \} = useForm<\{
			        test: string;
			      \}>();
			      return (
			        <>
			          <Controller
			            defaultValue=""
			            name="test"
			            render=\{(\{ field: \{ onBlur, value \} \}) => \{
			              return (
			                <Input placeholder="test" \{...\{ onChange, onBlur, value \}\} />
			              );
			            \}\}
			            control=\{control\}
			          />
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(onChange).toBeCalled();
			  \});
			
			  it('should invoke custom onBlur method', () => \{
			    const onBlur = jest.fn();
			    const Component = () => \{
			      const \{ control \} = useForm();
			      return (
			        <>
			          <Controller
			            defaultValue=""
			            name="test"
			            render=\{(\{ field: \{ onChange, value \} \}) => \{
			              return <Input \{...\{ onChange, onBlur, value \}\} />;
			            \}\}
			            control=\{control\}
			          />
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    expect(onBlur).toBeCalled();
			  \});
			
			  it('should update rules when rules gets updated', () => \{
			    let fieldsRef: any;
			    const Component = (\{ required = true \}: \{ required?: boolean \}) => \{
			      const \{ control \} = useForm();
			      fieldsRef = control._fields;
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          rules=\{\{ required \}\}
			          control=\{control\}
			        />
			      );
			    \};
			    const \{ rerender \} = render(<Component />);
			
			    rerender(<Component required=\{false\} />);
			
			    expect(fieldsRef.test.required).toBeFalsy();
			  \});
			
			  it('should set initial state from unmount state', () => \{
			    const Component = (\{ isHide \}: \{ isHide?: boolean \}) => \{
			      const \{ control \} = useForm();
			      return isHide ? null : (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			        />
			      );
			    \};
			
			    const \{ rerender \} = render(<Component />);
			
			    fireEvent.input(screen.getByRole('textbox'), \{ target: \{ value: 'test' \} \});
			
			    rerender(<Component isHide />);
			
			    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
			
			    rerender(<Component />);
			
			    expect(screen.getByRole('textbox')).toHaveValue('test');
			  \});
			
			  it('should skip validation when Controller is unmounted', async () => \{
			    const onValid = jest.fn();
			    const onInvalid = jest.fn();
			
			    const App = () => \{
			      const [show, setShow] = React.useState(true);
			      const \{ control, handleSubmit \} = useForm();
			
			      return (
			        <form onSubmit=\{handleSubmit(onValid, onInvalid)\}>
			          \{show && (
			            <Controller
			              render=\{(\{ field \}) => <input \{...field\} />\}
			              name=\{'test'\}
			              rules=\{\{
			                required: true,
			              \}\}
			              control=\{control\}
			            />
			          )\}
			          <button type=\{'button'\} onClick=\{() => setShow(false)\}>
			            toggle
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    await waitFor(() => expect(onInvalid).toBeCalledTimes(1));
			    expect(onValid).toBeCalledTimes(0);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    await waitFor(() => expect(onValid).toBeCalledTimes(1));
			    expect(onInvalid).toBeCalledTimes(1);
			  \});
			
			  it('should not set initial state from unmount state when input is part of field array', () => \{
			    const Component = () => \{
			      const \{ control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>();
			      const \{ fields, append, remove \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <Controller
			              key=\{field.id\}
			              defaultValue=\{field.value\}
			              name=\{\`test.\$\{i\}.value\` as const\}
			              render=\{(\{ field \}) => <input \{...field\} />\}
			              control=\{control\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: 'test' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => remove(0)\}>
			            remove
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.input(screen.getByRole('textbox'), \{ target: \{ value: 'test' \} \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /remove/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    expect(screen.getByRole('textbox')).toHaveValue('test');
			  \});
			
			  it('should not assign default value when field is removed with useFieldArray', () => \{
			    const Component = () => \{
			      const \{ control \} = useForm();
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <Controller
			                render=\{(\{ field \}) => <input \{...field\} />\}
			                name=\{\`test.\$\{i\}.value\`\}
			                defaultValue=\{''\}
			                control=\{control\}
			              />
			              <button type="button" onClick=\{() => remove(i)\}>
			                remove\{i\}
			              </button>
			            </div>
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    fireEvent.input(inputs[0], \{
			      target: \{ value: '1' \},
			    \});
			
			    fireEvent.input(inputs[1], \{
			      target: \{ value: '2' \},
			    \});
			
			    fireEvent.input(inputs[2], \{
			      target: \{ value: '3' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /remove1/i \}));
			
			    expect(screen.getAllByRole('textbox')[0]).toHaveValue('1');
			    expect(screen.getAllByRole('textbox')[1]).toHaveValue('3');
			  \});
			
			  it('should validate input when input is touched and with onTouched mode', async () => \{
			    let currentErrors: any = \{\};
			    const Component = () => \{
			      const \{
			        formState: \{ errors \},
			        control,
			      \} = useForm<\{ test: string \}>(\{
			        mode: 'onTouched',
			      \});
			
			      currentErrors = errors;
			
			      return (
			        <form>
			          <Controller
			            name=\{'test'\}
			            control=\{control\}
			            defaultValue=""
			            rules=\{\{ required: true \}\}
			            render=\{(\{ field \}) => <input \{...field\} />\}
			          />
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    const input = screen.getByRole('textbox');
			
			    fireEvent.blur(input);
			
			    await waitFor(() => expect(currentErrors.test).not.toBeUndefined());
			
			    fireEvent.input(input, \{
			      target: \{ value: '1' \},
			    \});
			
			    await waitFor(() => expect(currentErrors.test).toBeUndefined());
			  \});
			
			  it('should show invalid input when there is an error', async () => \{
			    const Component = () => \{
			      const \{ control \} = useForm(\{
			        mode: 'onChange',
			      \});
			
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field: props, fieldState \}) => (
			            <>
			              <input \{...props\} />
			              \{fieldState.invalid && <p>Input is invalid.</p>\}
			            </>
			          )\}
			          control=\{control\}
			          rules=\{\{
			            required: true,
			          \}\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(screen.queryByText('Input is invalid.')).not.toBeInTheDocument();
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    expect(await screen.findByText('Input is invalid.')).toBeVisible();
			  \});
			
			  it('should show input has been touched.', async () => \{
			    const Component = () => \{
			      const \{ control \} = useForm();
			
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field: props, fieldState \}) => (
			            <>
			              <input \{...props\} />
			              \{fieldState.isTouched && <p>Input is touched.</p>\}
			            </>
			          )\}
			          control=\{control\}
			          rules=\{\{
			            required: true,
			          \}\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    expect(screen.queryByText('Input is touched.')).not.toBeInTheDocument();
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    expect(await screen.findByText('Input is touched.')).toBeVisible();
			  \});
			
			  it('should show input is dirty.', async () => \{
			    const Component = () => \{
			      const \{ control \} = useForm();
			
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field: props, fieldState \}) => (
			            <>
			              <input \{...props\} />
			              \{fieldState.isTouched && <p>Input is dirty.</p>\}
			            </>
			          )\}
			          control=\{control\}
			          rules=\{\{
			            required: true,
			          \}\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    expect(screen.queryByText('Input is dirty.')).not.toBeInTheDocument();
			
			    const input = screen.getByRole('textbox');
			
			    fireEvent.focus(input);
			    fireEvent.blur(input);
			
			    expect(await screen.findByText('Input is dirty.')).toBeVisible();
			  \});
			
			  it('should display input error.', async () => \{
			    const Component = () => \{
			      const \{ control \} = useForm(\{
			        mode: 'onChange',
			      \});
			
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field: props, fieldState \}) => (
			            <>
			              <input \{...props\} />
			              \{fieldState.error && <p>\{fieldState.error.message\}</p>\}
			            </>
			          )\}
			          control=\{control\}
			          rules=\{\{
			            required: 'This is required',
			          \}\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    const input = screen.getByRole('textbox');
			
			    fireEvent.change(input, \{ target: \{ value: 'q' \} \});
			    fireEvent.change(input, \{ target: \{ value: '' \} \});
			
			    expect(await screen.findByText('This is required')).toBeVisible();
			  \});
			
			  it('should not trigger extra-render while not subscribed to any input state', () => \{
			    let count = 0;
			
			    const Component = () => \{
			      const \{ control \} = useForm();
			      count++;
			
			      return (
			        <Controller
			          defaultValue=""
			          name="test"
			          render=\{(\{ field: props, fieldState \}) => (
			            <>
			              <input \{...props\} />
			              \{fieldState.isTouched && <p>Input is dirty.</p>\}
			            </>
			          )\}
			          control=\{control\}
			          rules=\{\{
			            required: true,
			          \}\}
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(count).toEqual(1);
			  \});
			
			  it('should update Controller value with setValue', () => \{
			    const Component = () => \{
			      const \{ control, setValue \} = useForm<\{
			        test: string;
			      \}>();
			
			      React.useEffect(() => \{
			        setValue('test', 'data');
			      \}, [setValue]);
			
			      return (
			        <Controller
			          name=\{'test'\}
			          control=\{control\}
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          defaultValue=""
			        />
			      );
			    \};
			
			    render(<Component />);
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'data',
			    );
			  \});
			
			  it('should retain default value or defaultValues at Controller', () => \{
			    let getValuesMethod = () => \{\};
			    const Component = () => \{
			      const \{ control, getValues \} = useForm<\{
			        test: number;
			        test1: number;
			      \}>(\{
			        defaultValues: \{
			          test: 2,
			        \},
			      \});
			
			      getValuesMethod = getValues;
			
			      return (
			        <>
			          <Controller
			            render=\{(\{ field \}) => <input \{...field\} />\}
			            name=\{'test'\}
			            control=\{control\}
			          />
			          <Controller
			            render=\{(\{ field \}) => <input \{...field\} />\}
			            name=\{'test1'\}
			            defaultValue=\{1\}
			            control=\{control\}
			          />
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(getValuesMethod()).toEqual(\{
			      test: 2,
			      test1: 1,
			    \});
			  \});
			
			  it('should return correct isValid formState when input ref is not registered', async () => \{
			    const Component = () => \{
			      const \{
			        control,
			        formState: \{ isValid \},
			      \} = useForm<\{
			        test: string;
			        test1: string;
			      \}>(\{
			        mode: 'onChange',
			        defaultValues: \{
			          test: '2',
			          test1: '2',
			        \},
			      \});
			
			      return (
			        <>
			          <Controller
			            render=\{(\{ field \}) => (
			              <input value=\{field.value\} onChange=\{field.onChange\} />
			            )\}
			            rules=\{\{ required: true \}\}
			            name=\{'test'\}
			            control=\{control\}
			          />
			          <Controller
			            render=\{(\{ field \}) => (
			              <input value=\{field.value\} onChange=\{field.onChange\} />
			            )\}
			            rules=\{\{ required: true \}\}
			            name=\{'test1'\}
			            control=\{control\}
			          />
			          \{isValid ? 'true' : 'false'\}
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(screen.getByText('false')).toBeVisible();
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    expect(await screen.findByText('false')).toBeVisible();
			
			    fireEvent.input(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(await screen.findByText('true')).toBeVisible();
			  \});
			
			  it('should subscribe the correct dirty fields', () => \{
			    type FormValues = \{
			      test: string;
			    \};
			
			    const Component = () => \{
			      const \{
			        control,
			        formState: \{ dirtyFields, isDirty \},
			      \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: '',
			        \},
			      \});
			
			      return (
			        <>
			          <Controller
			            control=\{control\}
			            name=\{'test'\}
			            render=\{(\{ field \}) => <input \{...field\} />\}
			          />
			          <p>\{JSON.stringify(dirtyFields)\}</p>
			          <p>\{isDirty ? 'true' : 'false'\}</p>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{ target: \{ value: '1' \} \});
			
			    expect(screen.getByText('\{"test":true\}')).toBeVisible();
			    expect(screen.getByText('true')).toBeVisible();
			
			    fireEvent.change(screen.getByRole('textbox'), \{ target: \{ value: '' \} \});
			
			    expect(screen.getByText('\{\}')).toBeVisible();
			    expect(screen.getByText('false')).toBeVisible();
			  \});
			
			  it('should remove input value and reference with Controller and set shouldUnregister: true', () => \{
			    type FormValue = \{
			      test: string;
			    \};
			    const watchedValue: FormValue[] = [];
			    const Component = () => \{
			      const \{ control, watch \} = useForm<FormValue>(\{
			        defaultValues: \{
			          test: 'bill',
			        \},
			      \});
			      const [show, setShow] = React.useState(true);
			      watchedValue.push(watch());
			
			      return (
			        <>
			          \{show && (
			            <Controller
			              control=\{control\}
			              name=\{'test'\}
			              shouldUnregister
			              render=\{(\{ field \}) => <input \{...field\} />\}
			            />
			          )\}
			          <button onClick=\{() => setShow(false)\}>hide</button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(watchedValue).toEqual([
			      \{
			        test: 'bill',
			      \},
			      \{
			        test: 'bill',
			      \},
			      \{\},
			    ]);
			  \});
			
			  it('should set ref to empty object when ref is not defined', async () => \{
			    const App = () => \{
			      const [show, setShow] = React.useState(false);
			      const \{ control \} = useForm(\{
			        mode: 'onChange',
			        defaultValues: \{
			          test: '',
			        \},
			      \});
			
			      return (
			        <div>
			          \{show && (
			            <Controller
			              name=\{'test'\}
			              rules=\{\{ required: true \}\}
			              control=\{control\}
			              render=\{(\{ field \}) => (
			                <input value=\{field.value\} onChange=\{field.onChange\} />
			              )\}
			            />
			          )\}
			          <button onClick=\{() => setShow(!show)\}>setShow</button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    const input = screen.getByRole('textbox');
			
			    fireEvent.change(input, \{
			      target: \{ value: 'test' \},
			    \});
			
			    // Everything should be fine even if no ref on the controlled input
			    await waitFor(() => expect(input).toHaveValue('test'));
			  \});
			
			  it('should transform input value instead update via ref', () => \{
			    type FormValues = \{
			      test: number;
			    \};
			
			    const transform = \{
			      input: (x: number) => x / 10,
			    \};
			
			    function App() \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: 7200,
			        \},
			      \});
			
			      return (
			        <Controller
			          name="test"
			          control=\{control\}
			          render=\{(\{ field \}) => (
			            <input
			              type="number"
			              \{...field\}
			              value=\{transform.input(+field.value)\}
			              placeholder="test"
			            />
			          )\}
			        />
			      );
			    \}
			
			    render(<App />);
			
			    expect(
			      (screen.getByPlaceholderText('test') as HTMLInputElement).value,
			    ).toEqual('720');
			  \});
			
			  it('should mark mounted inputs correctly within field array', async () => \{
			    const App = () => \{
			      const \{
			        control,
			        handleSubmit,
			        formState: \{ errors \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: [\{ firstName: 'test' \}],
			        \},
			      \});
			      const \{ fields, prepend \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((field, index) => \{
			            return (
			              <div key=\{field.id\}>
			                <Controller
			                  control=\{control\}
			                  render=\{(\{ field \}) => <input \{...field\} />\}
			                  name=\{\`test.\$\{index\}.firstName\`\}
			                  rules=\{\{ required: true \}\}
			                />
			                \{errors?.test?.[index]?.firstName && <p>error</p>\}
			              </div>
			            );
			          \})\}
			          <button
			            type="button"
			            onClick=\{() =>
			              prepend(\{
			                firstName: '',
			              \})
			            \}
			          >
			            prepend
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'prepend' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(await screen.findByText('error')).toBeVisible();
			  \});
			
			  it('should not throw type error with field state', () => \{
			    type FormValues = \{
			      firstName: string;
			      deepNested: \{
			        test: string;
			      \};
			      todos: string[];
			      nestedValue: \{ test: string \};
			    \};
			
			    function App() \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          firstName: '',
			          deepNested: \{ test: '' \},
			          todos: [],
			          nestedValue: \{ test: '' \},
			        \},
			      \});
			
			      return (
			        <form>
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...field\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="firstName"
			          />
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...field\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="deepNested.test"
			          />
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...field\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="todos"
			          />
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...\{ ...field, value: field.value.test \}\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="nestedValue"
			          />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    expect(screen.getAllByRole('textbox').length).toEqual(4);
			  \});
			
			  it('should not cause type error with any', () => \{
			    function App() \{
			      const \{ control \} = useForm(\{
			        defaultValues: \{
			          firstName: '',
			          deepNested: \{ test: '' \},
			          todos: [],
			          nestedValue: \{ test: '' \},
			        \},
			      \});
			
			      return (
			        <form>
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...field\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="firstName"
			          />
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...field\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="deepNested.test"
			          />
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...field\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="todos"
			          />
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...\{ ...field, value: field.value.test \}\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="nestedValue"
			          />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    expect(screen.getAllByRole('textbox').length).toEqual(4);
			  \});
			
			  it('should not cause type error without generic type', () => \{
			    function App() \{
			      const \{ control \} = useForm(\{
			        defaultValues: \{
			          firstName: '',
			          deepNested: \{ test: '' \},
			          todos: [],
			          nestedValue: \{ test: '' \},
			        \},
			      \});
			
			      return (
			        <form>
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...field\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="firstName"
			          />
			          <Controller
			            render=\{(\{ field, fieldState \}) => (
			              <>
			                <input \{...field\} />
			                <p>\{fieldState.error?.message\}</p>
			              </>
			            )\}
			            control=\{control\}
			            name="deepNested.test"
			          />
			          <Controller
			            render=\{(\{ field \}) => (
			              <>
			                <input \{...field\} />
			              </>
			            )\}
			            control=\{control\}
			            name="todos"
			          />
			          <Controller
			            render=\{(\{ field \}) => (
			              <>
			                <input \{...\{ ...field, value: field.value.test \}\} />
			              </>
			            )\}
			            control=\{control\}
			            name="nestedValue"
			          />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    expect(screen.getAllByRole('textbox').length).toEqual(4);
			  \});
			
			  it('should unregister component within field array when field is unmounted', () => \{
			    const getValueFn = jest.fn();
			
			    const Child = () => \{
			      const \{ fields \} = useFieldArray(\{
			        name: 'names',
			      \});
			      const show = useWatch(\{ name: 'show' \});
			
			      return (
			        <>
			          <Controller
			            name=\{'show'\}
			            render=\{(\{ field \}) => (
			              <input
			                \{...field\}
			                checked=\{field.value\}
			                type="checkbox"
			                data-testid="checkbox"
			              />
			            )\}
			          />
			
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              \{show && (
			                <Controller
			                  shouldUnregister
			                  name=\{\`names.\$\{i\}.firstName\`\}
			                  render=\{(\{ field \}) => <input \{...field\} />\}
			                />
			              )\}
			            </div>
			          ))\}
			        </>
			      );
			    \};
			
			    function App() \{
			      const methods = useForm(\{
			        defaultValues: \{ show: true, names: [\{ firstName: '' \}] \},
			      \});
			
			      return (
			        <FormProvider \{...methods\}>
			          <Child />
			          <button
			            onClick=\{() => \{
			              getValueFn(methods.getValues());
			            \}\}
			          >
			            getValues
			          </button>
			        </FormProvider>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(getValueFn).toBeCalledWith(\{
			      names: [\{ firstName: '' \}],
			      show: true,
			    \});
			
			    fireEvent.click(screen.getByTestId('checkbox'));
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(getValueFn).toBeCalledWith(\{
			      show: false,
			    \});
			  \});
			
			  it('should set up defaultValues for controlled component with values prop', () => \{
			    function App() \{
			      const \{ control \} = useForm(\{
			        values: \{
			          firstName: 'test',
			        \},
			      \});
			
			      return (
			        <Controller
			          render=\{(\{ field \}) => <input \{...field\} />\}
			          control=\{control\}
			          name="firstName"
			        />
			      );
			    \}
			
			    render(<App />);
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'test',
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\controller.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(37)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\form.test.tsx', () => {
        const sourceCode = `
			import 'whatwg-fetch';
			
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ ResponseComposition, rest, RestContext \} from 'msw';
			import \{ setupServer \} from 'msw/node';
			
			import \{ Form \} from '../form';
			import \{ useForm \} from '../useForm';
			import \{ FormProvider \} from '../useFormContext';
			
			const server = setupServer(
			  rest.post('/success', (_, res: ResponseComposition, ctx: RestContext) => \{
			    return res(
			      ctx.json(\{
			        message: 'ok',
			      \}),
			    );
			  \}),
			  rest.post('/error', (_, res: ResponseComposition, ctx: RestContext) => \{
			    return res(ctx.status(500));
			  \}),
			  rest.post('/status', (_, res: ResponseComposition, ctx: RestContext) => \{
			    return res(ctx.status(201));
			  \}),
			  rest.post('/get', (_, res: ResponseComposition, ctx: RestContext) => \{
			    return res(ctx.status(200));
			  \}),
			  rest.post('/json', (req, res: ResponseComposition, ctx: RestContext) => \{
			    if (req.headers.get('content-type') === 'application/json') \{
			      return res(ctx.status(200));
			    \}
			
			    return res(ctx.status(500));
			  \}),
			);
			
			describe('Form', () => \{
			  beforeAll(() => server.listen());
			  afterEach(() => server.resetHandlers());
			  afterAll(() => server.close());
			
			  it('should support render with both form tag and headless', () => \{
			    const WithContext = () => \{
			      return (
			        <>
			          <Form />
			          <Form
			            render=\{() => \{
			              return null;
			            \}\}
			          />
			        </>
			      );
			    \};
			
			    const App = () => \{
			      const methods = useForm();
			      return (
			        <div>
			          <Form control=\{methods.control\}>
			            <input />
			          </Form>
			          <Form
			            control=\{methods.control\}
			            render=\{() => \{
			              return null;
			            \}\}
			          />
			
			          <FormProvider \{...methods\}>
			            <WithContext />
			          </FormProvider>
			        </div>
			      );
			    \};
			
			    render(<App />);
			  \});
			
			  it('should handle success request callback', async () => \{
			    const onSubmit = jest.fn();
			    const onError = jest.fn();
			
			    const App = () => \{
			      const [message, setMessage] = React.useState('');
			      const \{
			        control,
			        formState: \{ isSubmitSuccessful \},
			      \} = useForm();
			
			      return (
			        <Form
			          encType=\{'application/json'\}
			          action=\{'/success'\}
			          onSubmit=\{(\{ data, formData, formDataJson \}) => \{
			            data;
			            formData;
			            formDataJson;
			            onSubmit();
			          \}\}
			          control=\{control\}
			          onError=\{onError\}
			          onSuccess=\{async (\{ response \}) => \{
			            if (response) \{
			              const data: \{ message: string \} = await response.json();
			              setMessage(data.message);
			            \}
			          \}\}
			        >
			          <button>Submit</button>
			          <p>\{isSubmitSuccessful ? 'submitSuccessful' : 'submitFailed'\}</p>
			          <p>\{message\}</p>
			        </Form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      expect(onSubmit).toBeCalled();
			      expect(onError).not.toBeCalled();
			      screen.getByText('submitSuccessful');
			      screen.getByText('ok');
			    \});
			  \});
			
			  it('should handle error request callback', async () => \{
			    const onSubmit = jest.fn();
			    const onSuccess = jest.fn();
			
			    const App = () => \{
			      const \{
			        control,
			        formState: \{ isSubmitSuccessful, errors \},
			      \} = useForm();
			
			      return (
			        <Form
			          encType=\{'application/json'\}
			          action=\{'/error'\}
			          onSubmit=\{onSubmit\}
			          control=\{control\}
			        >
			          <button>Submit</button>
			          <p>\{isSubmitSuccessful ? 'submitSuccessful' : 'submitFailed'\}</p>
			          \{errors.root?.server && 'This is a server error'\}
			          <p>\{errors.root?.server?.type\}</p>
			        </Form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      expect(onSubmit).toBeCalled();
			      expect(onSuccess).not.toBeCalled();
			      screen.getByText('This is a server error');
			      screen.getByText('500');
			      screen.getByText('submitFailed');
			    \});
			  \});
			
			  it('should validate custom status code', async () => \{
			    const App = () => \{
			      const \{
			        control,
			        formState: \{ isSubmitSuccessful \},
			      \} = useForm();
			
			      return (
			        <Form
			          encType=\{'application/json'\}
			          action=\{'/status'\}
			          control=\{control\}
			          validateStatus=\{(status) => status === 200\}
			        >
			          <button>Submit</button>
			          <p>\{isSubmitSuccessful ? 'submitSuccessful' : 'submitFailed'\}</p>
			        </Form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      screen.getByText('submitFailed');
			    \});
			  \});
			
			  it('should support other request type', async () => \{
			    const App = () => \{
			      const \{
			        control,
			        formState: \{ isSubmitSuccessful \},
			      \} = useForm();
			
			      return (
			        <Form encType=\{'application/json'\} action=\{'/get'\} control=\{control\}>
			          <button>Submit</button>
			          <p>\{isSubmitSuccessful ? 'submitSuccessful' : 'submitFailed'\}</p>
			        </Form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      screen.getByText('submitSuccessful');
			    \});
			  \});
			
			  it('should support render props for react native', async () => \{
			    const App = () => \{
			      const \{
			        control,
			        formState: \{ isSubmitSuccessful \},
			      \} = useForm();
			
			      return (
			        <Form
			          control=\{control\}
			          render=\{(\{ submit \}) => \{
			            return (
			              <>
			                <button onClick=\{() => submit()\}>Submit</button>
			                <p>
			                  \{isSubmitSuccessful ? 'submitSuccessful' : 'submitFailed'\}
			                </p>
			              </>
			            );
			          \}\}
			        />
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      screen.getByText('submitSuccessful');
			    \});
			  \});
			
			  it('should support fetcher prop with external request', async () => \{
			    const fetcher = jest.fn();
			    const App = () => \{
			      const \{
			        control,
			        formState: \{ isSubmitSuccessful \},
			      \} = useForm();
			
			      return (
			        <Form
			          control=\{control\}
			          onSubmit=\{async () => \{
			            await fetcher();
			          \}\}
			        >
			          <button>Submit</button>
			          <p>\{isSubmitSuccessful ? 'submitSuccessful' : 'submitFailed'\}</p>
			        </Form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      screen.getByText('submitSuccessful');
			
			      expect(fetcher).toBeCalled();
			    \});
			  \});
			
			  it('should include application/json header with encType supplied', async () => \{
			    const onSuccess = jest.fn();
			    const App = () => \{
			      const \{
			        control,
			        formState: \{ isSubmitSuccessful \},
			      \} = useForm();
			
			      return (
			        <Form
			          encType=\{'application/json'\}
			          action=\{'/json'\}
			          control=\{control\}
			          onSuccess=\{onSuccess\}
			        >
			          <button>Submit</button>
			          <p>\{isSubmitSuccessful ? 'submitSuccessful' : 'submitFailed'\}</p>
			        </Form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      expect(onSuccess).toBeCalled();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\form.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\isPlainObject.test.ts', () => {
        const sourceCode = `
			import isPlainObject from '../utils/isPlainObject';
			
			describe('isPlainObject', function () \{
			  it('should identify plan object or not', function () \{
			    function test() \{
			      return \{
			        test: () => \{\},
			      \};
			    \}
			
			    expect(isPlainObject(Object.create(\{\}))).toBeTruthy();
			    expect(isPlainObject(Object.create(Object.prototype))).toBeTruthy();
			    expect(isPlainObject(\{ foo: 'bar' \})).toBeTruthy();
			    expect(isPlainObject(\{\})).toBeTruthy();
			    expect(isPlainObject(Object.create(null))).toBeFalsy();
			    expect(!isPlainObject(/foo/)).toBeTruthy();
			    expect(!isPlainObject(function () \{\})).toBeTruthy();
			    expect(!isPlainObject(['foo', 'bar'])).toBeTruthy();
			    expect(!isPlainObject([])).toBeTruthy();
			    expect(!isPlainObject(test)).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\isPlainObject.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\appendErrors.test.ts', () => {
        const sourceCode = `
			import appendErrors from '../../logic/appendErrors';
			
			describe('appendErrors', () => \{
			  it('should return empty object when validateAllFieldCriteria is false', () => \{
			    const errors = \{
			      test: \{
			        type: 'required',
			        message: 'test',
			      \},
			    \};
			    expect(appendErrors('test', false, errors, 'min', 'test')).toEqual(\{\});
			  \});
			
			  it('should return error object when validateAllFieldCriteria is true', () => \{
			    const errors = \{
			      test: \{
			        type: 'required',
			        message: 'test',
			        types: \{\},
			      \},
			    \};
			
			    expect(appendErrors('test', true, errors, 'required', 'test')).toEqual(\{
			      message: 'test',
			      type: 'required',
			      types: \{
			        required: 'test',
			      \},
			    \});
			
			    errors.test.types = \{ required: 'test' \};
			    expect(appendErrors('test', true, errors, 'min', 'test')).toEqual(\{
			      message: 'test',
			      type: 'required',
			      types: \{
			        required: 'test',
			        min: 'test',
			      \},
			    \});
			
			    errors.test.types = \{ ...errors.test.types, min: 'test' \};
			    expect(appendErrors('test', true, errors, 'max', 'test')).toEqual(\{
			      message: 'test',
			      type: 'required',
			      types: \{
			        required: 'test',
			        min: 'test',
			        max: 'test',
			      \},
			    \});
			
			    errors.test.types = \{ ...errors.test.types, max: 'test' \};
			    expect(appendErrors('test', true, errors, 'undefined', undefined)).toEqual(\{
			      message: 'test',
			      type: 'required',
			      types: \{
			        required: 'test',
			        min: 'test',
			        max: 'test',
			        undefined: true,
			      \},
			    \});
			
			    errors.test.types = \{
			      ...errors.test.types,
			      undefined: true,
			    \};
			    expect(
			      appendErrors('test', true, errors, 'invalid_string', [
			        'uppercase',
			        'lowercase',
			        'number',
			      ]),
			    ).toEqual(\{
			      message: 'test',
			      type: 'required',
			      types: \{
			        required: 'test',
			        min: 'test',
			        max: 'test',
			        undefined: true,
			        invalid_string: ['uppercase', 'lowercase', 'number'],
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\appendErrors.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\focusFieldBy.test.ts', () => {
        const sourceCode = `
			import focusFieldBy from '../../logic/focusFieldBy';
			import get from '../../utils/get';
			
			describe('focusFieldBy', () => \{
			  it('should focus on the first error it encounter', () => \{
			    const focus = jest.fn();
			    focusFieldBy(
			      \{
			        test: \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              name: 'test',
			              focus,
			            \},
			          \},
			        \},
			      \},
			      (key) =>
			        get(
			          \{
			            test: \{
			              message: 'test',
			              type: 'required',
			            \},
			          \},
			          String(key),
			        ),
			    );
			
			    expect(focus).toBeCalled();
			  \});
			
			  it('should focus on first option when options input error encounters', () => \{
			    const focus = jest.fn();
			    focusFieldBy(
			      \{
			        test: \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              name: 'test',
			            \},
			            refs: [
			              // @ts-expect-error
			              \{
			                focus,
			              \},
			            ],
			          \},
			        \},
			      \},
			      (key) =>
			        get(
			          \{
			            test: \{
			              message: 'test',
			              type: 'required',
			            \},
			          \},
			          String(key),
			        ),
			    );
			
			    expect(focus).toBeCalled();
			  \});
			
			  it('should not call focus when field is undefined', () => \{
			    expect(() => \{
			      focusFieldBy(
			        \{
			          test: undefined,
			        \},
			        (key) =>
			          get(
			            \{
			              test: \{
			                message: 'test',
			                type: 'required',
			              \},
			            \},
			            String(key),
			          ),
			      );
			    \}).not.toThrow();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\focusFieldBy.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\generateId.test.ts', () => {
        const sourceCode = `
			import generateId from '../../logic/generateId';
			
			describe('generateId', () => \{
			  it('should generate a unique id', () => \{
			    expect(/\\w\{8\}-\\w\{4\}-4\\w\{3\}-\\w\{4\}-\\w\{12\}/i.test(generateId())).toBeTruthy();
			  \});
			
			  it('should fallback to current date if performance is undefined', () => \{
			    // @ts-ignore
			    delete window.performance;
			    expect(/\\w\{8\}-\\w\{4\}-4\\w\{3\}-\\w\{4\}-\\w\{12\}/i.test(generateId())).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\generateId.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getCheckboxValue.test.ts', () => {
        const sourceCode = `
			import getCheckboxValue from '../../logic/getCheckboxValue';
			
			describe('getCheckboxValue', () => \{
			  it('should return default value if not valid or empty options', () => \{
			    expect(getCheckboxValue(undefined)).toEqual(\{
			      value: false,
			      isValid: false,
			    \});
			  \});
			
			  it('should return checked value if single checkbox is checked', () => \{
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: true,
			          value: '3',
			          // @ts-expect-error
			          attributes: \{ value: '3' \},
			        \},
			      ]),
			    ).toEqual(\{ value: '3', isValid: true \});
			  \});
			
			  it('should return true if single checkbox is checked and has no value', () => \{
			    expect(
			      // @ts-expect-error
			      getCheckboxValue([\{ name: 'bill', checked: true, attributes: \{\} \}]),
			    ).toEqual(\{ value: true, isValid: true \});
			  \});
			
			  it('should return true if single checkbox is checked and has empty value', () => \{
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: true,
			          value: '',
			          // @ts-expect-error
			          attributes: \{ value: 'test' \},
			        \},
			      ]),
			    ).toEqual(\{ value: true, isValid: true \});
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: true,
			          // @ts-expect-error
			          attributes: \{ value: 'test' \},
			        \},
			      ]),
			    ).toEqual(\{ value: true, isValid: true \});
			  \});
			
			  it('should return false if single checkbox is un-checked', () => \{
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: false,
			          // @ts-expect-error
			          attributes: \{\},
			        \},
			      ]),
			    ).toEqual(\{ value: false, isValid: false \});
			  \});
			
			  it('should return multiple selected values', () => \{
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: true,
			          value: '2',
			          // @ts-expect-error
			          attributes: \{ value: '2' \},
			        \},
			        \{
			          name: 'bill',
			          checked: true,
			          value: '3',
			          // @ts-expect-error
			          attributes: \{ value: '3' \},
			        \},
			      ]),
			    ).toEqual(\{ value: ['2', '3'], isValid: true \});
			  \});
			
			  it('should return values for checked boxes only', () => \{
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: false,
			          value: '2',
			          // @ts-expect-error
			          attributes: \{ value: '2' \},
			        \},
			        \{
			          name: 'bill',
			          checked: true,
			          value: '3',
			          // @ts-expect-error
			          attributes: \{ value: '3' \},
			        \},
			        \{
			          name: 'bill',
			          checked: false,
			          value: '4',
			          // @ts-expect-error
			          attributes: \{ value: '4' \},
			        \},
			      ]),
			    ).toEqual(\{ value: ['3'], isValid: true \});
			  \});
			
			  it('should return empty array for multi checkbox with no checked box', () => \{
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: false,
			          value: '2',
			          // @ts-expect-error
			          attributes: \{ value: '2' \},
			        \},
			        \{
			          name: 'bill',
			          checked: false,
			          value: '3',
			          // @ts-expect-error
			          attributes: \{ value: '3' \},
			        \},
			      ]),
			    ).toEqual(\{ value: [], isValid: false \});
			  \});
			
			  it('should not return error when check box ref is undefined', () => \{
			    expect(
			      getCheckboxValue([
			        // @ts-expect-error
			        undefined,
			        \{
			          name: 'bill',
			          checked: false,
			          value: '2',
			          // @ts-expect-error
			          attributes: \{ value: '2' \},
			        \},
			      ]),
			    ).toEqual(\{ value: [], isValid: false \});
			  \});
			
			  it('should return disabled input result', () => \{
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: true,
			          value: '2',
			          disabled: true,
			          // @ts-expect-error
			          attributes: \{ value: '2' \},
			        \},
			        \{
			          name: 'bill',
			          checked: true,
			          value: '3',
			          // @ts-expect-error
			          attributes: \{ value: '3' \},
			        \},
			      ]),
			    ).toEqual(\{
			      value: ['3'],
			      isValid: true,
			    \});
			
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: true,
			          value: '2',
			          disabled: true,
			          // @ts-expect-error
			          attributes: \{ value: '2' \},
			        \},
			        \{
			          name: 'bill',
			          disabled: true,
			          checked: true,
			          value: '3',
			          // @ts-expect-error
			          attributes: \{ value: '3' \},
			        \},
			      ]),
			    ).toEqual(\{
			      value: [],
			      isValid: false,
			    \});
			
			    expect(
			      getCheckboxValue([
			        \{
			          name: 'bill',
			          checked: true,
			          value: '2',
			          disabled: true,
			          // @ts-expect-error
			          attributes: \{ value: '2' \},
			        \},
			      ]),
			    ).toEqual(\{
			      value: false,
			      isValid: false,
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getCheckboxValue.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getDirtyFields.test.ts', () => {
        const sourceCode = `
			import getDirtyFields from '../../logic/getDirtyFields';
			
			describe('getDirtyFields', () => \{
			  it('should return all the dirty fields', () => \{
			    expect(
			      getDirtyFields(
			        \{\},
			        \{
			          test: \{
			            test1: 'bill',
			            test2: 'luo',
			          \},
			          test1: ['1', '2', '3'],
			          test2: [
			            \{
			              test1: 'bill',
			              test2: 'luo',
			            \},
			          ],
			        \},
			      ),
			    ).toEqual(\{
			      test: \{
			        test1: true,
			        test2: true,
			      \},
			      test1: [true, true, true],
			      test2: [
			        \{
			          test1: true,
			          test2: true,
			        \},
			      ],
			    \});
			
			    expect(
			      getDirtyFields(
			        \{
			          test: \{
			            test1: '',
			            test2: 'luo',
			          \},
			          test1: ['1'],
			          test2: [
			            \{
			              test1: 'bill',
			              test2: '',
			            \},
			          ],
			        \},
			        \{
			          test: \{
			            test1: 'bill',
			            test2: 'luo',
			          \},
			          test1: ['1', '2', '3'],
			          test2: [
			            \{
			              test1: 'bill',
			              test2: 'luo',
			            \},
			          ],
			        \},
			      ),
			    ).toEqual(\{
			      test: \{
			        test1: true,
			        test2: false,
			      \},
			      test1: [false, true, true],
			      test2: [
			        \{
			          test1: false,
			          test2: true,
			        \},
			      ],
			    \});
			  \});
			
			  it('should set correctly dirty', () => \{
			    expect(
			      getDirtyFields(
			        \{
			          test: [\{ data: 'bill' \}, \{ data: 'luo', data1: 'luo1' \}],
			        \},
			        \{
			          test: [\{ data: 'bill1' \}, \{ data: 'luo2' \}],
			        \},
			      ),
			    ).toEqual(\{
			      test: [
			        \{
			          data: true,
			        \},
			        \{
			          data: true,
			          data1: true,
			        \},
			      ],
			    \});
			  \});
			
			  it('should not set dirtyFields fields for nested input data which are deep equal', () => \{
			    expect(
			      getDirtyFields(
			        \{ test: [\{ data: 'luo', data1: 'luo1' \}] \},
			        \{ test: [\{ data: 'luo', data1: 'luo1' \}] \},
			      ),
			    ).toEqual(\{ test: [\{ data: false, data1: false \}] \});
			  \});
			
			  it('should unset dirtyFields fields when value matches', () => \{
			    expect(
			      getDirtyFields(
			        \{ test: [\{ data: 'bill' \}, \{ data: 'luo2', data1: 'luo1' \}] \},
			        \{ test: [\{ data: 'bill1' \}, \{ data: 'luo2' \}] \},
			      ),
			    ).toEqual(\{ test: [\{ data: true \}, \{ data: false, data1: true \}] \});
			  \});
			
			  it('should works in reverse dirtyFields fields check', () => \{
			    expect(
			      getDirtyFields(
			        \{ test: [\{ data: 'bill1' \}, \{ data: 'luo2' \}] \},
			        \{ test: [\{ data: 'bill' \}, \{ data: 'luo', data1: 'luo1' \}] \},
			      ),
			    ).toEqual(\{ test: [\{ data: true \}, \{ data: true, data1: true \}] \});
			
			    expect(
			      getDirtyFields(
			        \{ test: [\{ data: 'bill1' \}, \{ data: 'luo2' \}] \},
			        \{ test: [\{ data: 'bill' \}, \{ data: 'luo2', data1: 'luo1' \}] \},
			      ),
			    ).toEqual(\{ test: [\{ data: true \}, \{ data: false, data1: true \}] \});
			  \});
			
			  it('should work for empty values compare with defaultValues', () => \{
			    expect(
			      getDirtyFields(
			        \{ test: [] \},
			        \{ test: [\{ data: 'bill' \}, \{ data: 'luo2', data1: 'luo1' \}] \},
			      ),
			    ).toEqual(\{
			      test: [
			        \{
			          data: true,
			        \},
			        \{
			          data: true,
			          data1: true,
			        \},
			      ],
			    \});
			  \});
			
			  it('should set correctly with nested dirty', () => \{
			    expect(
			      getDirtyFields(
			        \{
			          test: [
			            \{ data: 'bill' \},
			            \{
			              data: 'luo',
			              data1: 'luo1',
			              nested: [\{ data: 'luo', data1: 'luo1' \}],
			              nested1: [\{ data: 'luo', data1: 'luo1' \}],
			            \},
			          ],
			        \},
			        \{ test: [\{ data: 'bill1' \}, \{ data: 'luo2' \}] \},
			      ),
			    ).toEqual(\{
			      test: [
			        \{
			          data: true,
			        \},
			        \{
			          data: true,
			          data1: true,
			          nested: [\{ data: true, data1: true \}],
			          nested1: [\{ data: true, data1: true \}],
			        \},
			      ],
			    \});
			  \});
			
			  it('should keep nested dirtyFields fields when value matches', () => \{
			    expect(
			      getDirtyFields(
			        \{
			          test: [
			            \{ data: 'bill' \},
			            \{
			              data: 'luo',
			              data1: 'luo1',
			              nested: [\{ data: 'luo', data1: 'luo1' \}],
			              nested1: [\{ data: 'luo', data1: 'luo1' \}],
			            \},
			          ],
			        \},
			        \{
			          test: [
			            \{ data: 'bill1' \},
			            \{
			              data: 'luo2',
			              data1: 'luo1',
			              nested: [\{ data: 'luo', data1: 'luo1' \}],
			            \},
			          ],
			        \},
			      ),
			    ).toEqual(\{
			      test: [
			        \{
			          data: true,
			        \},
			        \{
			          data: true,
			          data1: false,
			          nested: [\{ data: false, data1: false \}],
			          nested1: [\{ data: true, data1: true \}],
			        \},
			      ],
			    \});
			  \});
			
			  it('should reset dirtyFields fields', () => \{
			    expect(
			      getDirtyFields(
			        \{ test: [\{ data: 'bill' \}] \},
			        \{ test: [\{ data: 'bill' \}] \},
			      ),
			    ).toEqual(\{ test: [\{ data: false \}] \});
			  \});
			
			  it('should reset dirtyFields fields', () => \{
			    expect(
			      getDirtyFields(
			        \{
			          test: [
			            \{
			              test1: 'test',
			              test: [
			                \{
			                  test: 'test1',
			                \},
			              ],
			            \},
			          ],
			        \},
			        \{
			          test: [
			            \{
			              test1: 'test1',
			              test: null,
			            \},
			
			            \{
			              test1: 'test',
			              test: [
			                \{
			                  test: 'test1',
			                \},
			              ],
			            \},
			          ],
			        \},
			      ),
			    ).toEqual(\{
			      test: [
			        \{
			          test: [
			            \{
			              test: true,
			            \},
			          ],
			          test1: true,
			        \},
			        \{
			          test: [
			            \{
			              test: true,
			            \},
			          ],
			          test1: true,
			        \},
			      ],
			    \});
			  \});
			
			  it('should work out with different data type', () => \{
			    expect(
			      getDirtyFields(
			        \{
			          test: [
			            \{
			              test1: 'test',
			              test: [
			                \{
			                  test: 'test1',
			                \},
			              ],
			            \},
			          ],
			        \},
			        \{
			          test: [
			            \{
			              test1: 'test1',
			              test: true,
			            \},
			            \{
			              test1: 'test',
			              test: [
			                \{
			                  test: 'test1',
			                \},
			              ],
			            \},
			          ],
			        \},
			      ),
			    ).toEqual(\{
			      test: [
			        \{
			          test: [
			            \{
			              test: true,
			            \},
			          ],
			          test1: true,
			        \},
			        \{
			          test: [
			            \{
			              test: true,
			            \},
			          ],
			          test1: true,
			        \},
			      ],
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getDirtyFields.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getEventValue.test.ts', () => {
        const sourceCode = `
			import getEventValue from '../../logic/getEventValue';
			
			test('getEventValue should return correct value', () => \{
			  expect(
			    getEventValue(\{
			      target: \{ checked: true, type: 'checkbox' \},
			    \}),
			  ).toEqual(true);
			  expect(
			    getEventValue(\{
			      target: \{ checked: true, type: 'checkbox', value: 'test' \},
			    \}),
			  ).toEqual(true);
			  expect(getEventValue(\{ target: \{ value: 'test' \}, type: 'test' \})).toEqual(
			    'test',
			  );
			  expect(getEventValue(\{ data: 'test' \})).toEqual(\{ data: 'test' \});
			  expect(getEventValue('test')).toEqual('test');
			  expect(getEventValue(undefined)).toEqual(undefined);
			  expect(getEventValue(null)).toEqual(null);
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getEventValue.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getFieldValue.test.ts', () => {
        const sourceCode = `
			import getFieldValue from '../../logic/getFieldValue';
			import \{ Field \} from '../../types';
			
			jest.mock('../../logic/getRadioValue', () => (\{
			  __esModule: true,
			  default: () => (\{
			    value: 2,
			  \}),
			\}));
			
			jest.mock('../../logic/getCheckboxValue', () => (\{
			  __esModule: true,
			  default: () => (\{
			    value: 'testValue',
			  \}),
			\}));
			
			describe('getFieldValue', () => \{
			  it('should return correct value when type is radio', () => \{
			    expect(
			      getFieldValue(\{
			        name: 'test',
			        ref: \{
			          type: 'radio',
			          name: 'test',
			        \},
			      \}),
			    ).toBe(2);
			  \});
			
			  it('should return the correct value when type is checkbox', () => \{
			    expect(
			      getFieldValue(\{
			        name: 'test',
			        ref: \{
			          name: 'test',
			          type: 'checkbox',
			        \},
			      \}),
			    ).toBe('testValue');
			  \});
			
			  it('should return it value for other types', () => \{
			    expect(
			      getFieldValue(\{
			        name: 'test',
			        ref: \{
			          type: 'text',
			          name: 'bill',
			          value: 'value',
			        \},
			      \}),
			    ).toBe('value');
			  \});
			
			  it('should return empty string when radio input value is not found', () => \{
			    expect(getFieldValue(\{ ref: \{\} \} as Field['_f'])).toEqual(undefined);
			  \});
			
			  it('should return files for input type file', () => \{
			    expect(
			      getFieldValue(\{
			        name: 'test',
			        ref: \{
			          type: 'file',
			          name: 'test',
			          files: null,
			        \},
			      \}),
			    ).toEqual(null);
			  \});
			
			  it('should return undefined when input is not found', () => \{
			    expect(
			      getFieldValue(\{
			        name: 'test',
			        ref: \{
			          name: 'file',
			          files: null,
			        \},
			      \}),
			    ).toEqual(undefined);
			  \});
			
			  it('should not return value when the input is disabled', () => \{
			    expect(
			      getFieldValue(\{
			        name: 'test',
			        ref: \{
			          name: 'radio',
			          disabled: true,
			          type: 'radio',
			        \},
			      \}),
			    ).toEqual(undefined);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getFieldValue.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getFieldValueAs.test.ts', () => {
        const sourceCode = `
			import getFieldValueAs from '../../logic/getFieldValueAs';
			
			describe('getFieldValueAs', () => \{
			  it('should return undefined when value is undefined', () => \{
			    expect(
			      getFieldValueAs(undefined, \{
			        ref: \{
			          name: 'test',
			        \},
			        name: 'test',
			        valueAsNumber: true,
			        valueAsDate: false,
			      \}),
			    ).toBeUndefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getFieldValueAs.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getFocusFieldName.test.ts', () => {
        const sourceCode = `
			import getFocusFieldName from '../../logic/getFocusFieldName';
			
			describe('getFocusFieldName', () => \{
			  it('should return expected focus name', () => \{
			    expect(getFocusFieldName('test', 0, \{ shouldFocus: false \})).toEqual('');
			    expect(
			      getFocusFieldName('test', 0, \{ shouldFocus: true, focusName: 'test' \}),
			    ).toEqual('test');
			    expect(
			      getFocusFieldName('test', 0, \{ shouldFocus: true, focusIndex: 1 \}),
			    ).toEqual('test.1.');
			    expect(getFocusFieldName('test', 0)).toEqual('test.0.');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getFocusFieldName.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getNodeParentName.test.ts', () => {
        const sourceCode = `
			import getNodeParentName from '../../logic/getNodeParentName';
			
			describe('getNodeParentName', () => \{
			  it('should return parent name when name is field array', () => \{
			    expect(getNodeParentName('test.0')).toBe('test');
			    expect(getNodeParentName('test1.1')).toBe('test1');
			    expect(getNodeParentName('test.0.data.0')).toBe('test');
			    expect(getNodeParentName('test.data.0')).toBe('test.data');
			    expect(getNodeParentName('test.1st')).toBe('test.1st');
			  \});
			
			  it('should return empty string when name is not field array', () => \{
			    expect(getNodeParentName('test')).toBe('test');
			    expect(getNodeParentName('test0')).toBe('test0');
			    expect(getNodeParentName('te1st')).toBe('te1st');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getNodeParentName.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getRadioValue.test.ts', () => {
        const sourceCode = `
			import getRadioValue from '../../logic/getRadioValue';
			
			describe('getRadioValue', () => \{
			  it('should return default value if not valid or empty options', () => \{
			    expect(getRadioValue(undefined)).toEqual(\{
			      isValid: false,
			      value: null,
			    \});
			  \});
			
			  it('should return valid to true when value found', () => \{
			    expect(
			      getRadioValue([
			        \{ name: 'bill', checked: false, value: '1' \} as HTMLInputElement,
			        \{ name: 'bill', checked: true, value: '2' \} as HTMLInputElement,
			      ]),
			    ).toEqual(\{
			      isValid: true,
			      value: '2',
			    \});
			  \});
			
			  it('should return disabled input correctly', () => \{
			    expect(
			      getRadioValue([
			        \{
			          name: 'bill',
			          checked: false,
			          value: '1',
			          disabled: true,
			        \} as HTMLInputElement,
			        \{ name: 'bill', checked: true, value: '2' \} as HTMLInputElement,
			      ]),
			    ).toEqual(\{
			      isValid: true,
			      value: '2',
			    \});
			
			    expect(
			      getRadioValue([
			        \{
			          name: 'bill',
			          checked: false,
			          value: '1',
			        \} as HTMLInputElement,
			        \{
			          name: 'bill',
			          checked: true,
			          disabled: true,
			          value: '2',
			        \} as HTMLInputElement,
			      ]),
			    ).toEqual(\{
			      isValid: false,
			      value: null,
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getRadioValue.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getResolverOptions.test.ts', () => {
        const sourceCode = `
			import \{ InternalFieldName \} from '../..';
			import getResolverOptions from '../../logic/getResolverOptions';
			
			describe('getFielfs', () => \{
			  it('should return fields from \`fieldsNames\` and \`fieldsRef\`', () => \{
			    const fieldNames: Set<InternalFieldName> = new Set(['test.sub', 'test1']);
			    const fieldsRef: any = \{
			      test: \{
			        sub: \{
			          _f: \{
			            ref: \{ name: 'test.sub', value: 'test' \},
			            name: 'test.sub',
			            value: 'test',
			          \},
			        \},
			      \},
			      test1: \{
			        _f: \{
			          ref: \{ name: 'test1', value: 'test1' \},
			          name: 'test1',
			          value: 'test1',
			        \},
			      \},
			    \};
			
			    expect(getResolverOptions(fieldNames, fieldsRef, undefined, true))
			      .toMatchInlineSnapshot(\`
			      \{
			        "criteriaMode": undefined,
			        "fields": \{
			          "test": \{
			            "sub": \{
			              "name": "test.sub",
			              "ref": \{
			                "name": "test.sub",
			                "value": "test",
			              \},
			              "value": "test",
			            \},
			          \},
			          "test1": \{
			            "name": "test1",
			            "ref": \{
			              "name": "test1",
			              "value": "test1",
			            \},
			            "value": "test1",
			          \},
			        \},
			        "names": [
			          "test.sub",
			          "test1",
			        ],
			        "shouldUseNativeValidation": true,
			      \}
			    \`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getResolverOptions.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getRuleValue.test.ts', () => {
        const sourceCode = `
			import getRuleValue from '../../logic/getRuleValue';
			
			describe('getRuleValue', () => \{
			  it('should return associated rule value', () => \{
			    expect(getRuleValue('1990/09/09')).toEqual('1990/09/09');
			    expect(getRuleValue('2')).toEqual('2');
			    expect(getRuleValue(2)).toEqual(2);
			
			    expect(getRuleValue(/test/)).toEqual('test');
			
			    expect(getRuleValue(\{ value: '2', message: 'data' \})).toEqual('2');
			    expect(getRuleValue(\{ value: '1990/09/09', message: 'data' \})).toEqual(
			      '1990/09/09',
			    );
			    expect(getRuleValue(\{ value: 2, message: 'data' \})).toEqual(2);
			    expect(getRuleValue(\{ value: /test/, message: 'data' \})).toEqual('test');
			  \});
			
			  it('should return undefined when no value is set', () => \{
			    expect(getRuleValue(undefined)).toBeUndefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getRuleValue.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getValidateError.test.ts', () => {
        const sourceCode = `
			import getValidateError from '../../logic/getValidateError';
			
			describe('getValidateError', () => \{
			  it('should return field error in correct format', () => \{
			    expect(
			      getValidateError(
			        'This is a required field',
			        \{
			          name: 'test1',
			          value: '',
			        \},
			        'required',
			      ),
			    ).toEqual(\{
			      type: 'required',
			      message: 'This is a required field',
			      ref: \{
			        name: 'test1',
			        value: '',
			      \},
			    \});
			
			    expect(
			      getValidateError(
			        false,
			        \{
			          name: 'test1',
			          value: '',
			        \},
			        'required',
			      ),
			    ).toEqual(\{
			      type: 'required',
			      message: '',
			      ref: \{
			        name: 'test1',
			        value: '',
			      \},
			    \});
			  \});
			
			  it('should return undefined when called with non string result', () => \{
			    expect(getValidateError(undefined, () => \{\})).toBeUndefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getValidateError.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\getValueAndMessage.test.ts', () => {
        const sourceCode = `
			import getValueAndMessage from '../../logic/getValueAndMessage';
			
			describe('getValueAndMessage', () => \{
			  it('should return message and value correctly', () => \{
			    expect(getValueAndMessage(0).value).toEqual(0);
			    expect(getValueAndMessage(3).value).toEqual(3);
			    expect(getValueAndMessage(\{ value: 0, message: 'what' \}).value).toEqual(0);
			    expect(getValueAndMessage(\{ value: 2, message: 'what' \}).value).toEqual(2);
			    expect(getValueAndMessage(\{ value: 1, message: 'test' \}).message).toEqual(
			      'test',
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\getValueAndMessage.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\isNameInFieldArray.test.ts', () => {
        const sourceCode = `
			import isNameInFieldArray from '../../logic/isNameInFieldArray';
			
			describe('isNameInFieldArray', () => \{
			  it('should find match array field', () => \{
			    expect(isNameInFieldArray(new Set(['test']), 'test.0')).toBeTruthy();
			    expect(isNameInFieldArray(new Set(['te']), 'test.0')).toBeFalsy();
			    expect(isNameInFieldArray(new Set(['te']), 'test.0')).toBeFalsy();
			    expect(isNameInFieldArray(new Set(['test1']), 'test[0]')).toBeFalsy();
			    expect(isNameInFieldArray(new Set(['test1']), 'test.0')).toBeFalsy();
			    expect(
			      isNameInFieldArray(new Set(['test']), 'test.0.data[0]'),
			    ).toBeTruthy();
			    expect(isNameInFieldArray(new Set(['test']), 'test.0.data.0')).toBeTruthy();
			    expect(isNameInFieldArray(new Set(['test']), 'test1.0.data.0')).toBeFalsy();
			    expect(isNameInFieldArray(new Set(['test']), 'data.0.data.0')).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\isNameInFieldArray.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\isWatched.test.ts', () => {
        const sourceCode = `
			import isWatched from '../../logic/isWatched';
			
			describe('isWatched', () => \{
			  it('should return watched fields', () => \{
			    expect(
			      isWatched('', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(),
			        focus: '',
			        watchAll: true,
			      \}),
			    ).toBeTruthy();
			
			    expect(
			      isWatched('test', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(['test']),
			        focus: '',
			        watchAll: false,
			      \}),
			    ).toBeTruthy();
			  \});
			
			  it('should return true when watched with parent node', () => \{
			    expect(
			      isWatched('test.test', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(['test']),
			        focus: '',
			        watchAll: false,
			      \}),
			    ).toBeTruthy();
			
			    expect(
			      isWatched('test.test.test', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(['test.test']),
			        focus: '',
			        watchAll: false,
			      \}),
			    ).toBeTruthy();
			
			    expect(
			      isWatched('test.test.test', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(['testFail.test', 'test.test']),
			        focus: '',
			        watchAll: false,
			      \}),
			    ).toBeTruthy();
			
			    expect(
			      isWatched('test.0', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(['test']),
			        focus: '',
			        watchAll: false,
			      \}),
			    ).toBeTruthy();
			
			    expect(
			      isWatched('test.0.test', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(['test.0']),
			        focus: '',
			        watchAll: false,
			      \}),
			    ).toBeTruthy();
			  \});
			
			  it("should return false when watched with parent node that doesn't match child name", () => \{
			    expect(
			      isWatched('test.test.test', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(['tesk.test']),
			        focus: '',
			        watchAll: false,
			      \}),
			    ).toBeFalsy();
			
			    expect(
			      isWatched('test.test.test', \{
			        mount: new Set(),
			        unMount: new Set(),
			        array: new Set(),
			        watch: new Set(['testFail.test']),
			        focus: '',
			        watchAll: false,
			      \}),
			    ).toBeFalsy();
			  \});
			
			  it('should return falsy for blur event', () => \{
			    expect(
			      isWatched(
			        '',
			        \{
			          mount: new Set(),
			          unMount: new Set(),
			          array: new Set(),
			          watch: new Set(),
			          focus: '',
			          watchAll: true,
			        \},
			        true,
			      ),
			    ).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\isWatched.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\schemaErrorLookup.test.ts', () => {
        const sourceCode = `
			import schemaErrorLookup from '../../logic/schemaErrorLookup';
			
			describe('errorsLookup', () => \{
			  it('should be able to look up the error', () => \{
			    expect(
			      schemaErrorLookup<\{
			        test: \{
			          deep: string;
			        \};
			      \}>(
			        \{
			          test: \{
			            type: 'test',
			            message: 'error',
			            deep: \{
			              type: 'deep',
			              message: 'error',
			            \},
			          \},
			        \},
			        \{\},
			        'test.deep.whatever',
			      ),
			    ).toEqual(\{
			      error: \{
			        type: 'deep',
			        message: 'error',
			      \},
			      name: 'test.deep',
			    \});
			
			    expect(
			      schemaErrorLookup(
			        \{
			          test: \{
			            type: 'test',
			            message: 'error',
			          \},
			        \},
			        \{\},
			        'test.0.whatever',
			      ),
			    ).toEqual(\{
			      error: \{
			        type: 'test',
			        message: 'error',
			      \},
			      name: 'test',
			    \});
			
			    expect(
			      schemaErrorLookup(
			        \{
			          test: \{
			            type: 'test',
			            message: 'error',
			          \},
			        \},
			        \{\},
			        'test',
			      ),
			    ).toEqual(\{
			      error: \{
			        type: 'test',
			        message: 'error',
			      \},
			      name: 'test',
			    \});
			
			    expect(
			      schemaErrorLookup<\{
			        test: \{
			          deep: string;
			        \};
			        test1: \{
			          nested: \{
			            deepNested: string;
			          \};
			        \};
			      \}>(
			        \{
			          test: \{
			            type: 'test',
			            message: 'error',
			          \},
			          test1: \{
			            type: 'test',
			            message: 'error',
			            nested: \{
			              type: 'test',
			              message: 'error',
			              deepNested: \{
			                type: 'deepNested',
			                message: 'error',
			              \},
			            \},
			          \},
			        \},
			        \{\},
			        'test1.nested.deepNested.whatever',
			      ),
			    ).toEqual(\{
			      error: \{ message: 'error', type: 'deepNested' \},
			      name: 'test1.nested.deepNested',
			    \});
			  \});
			
			  it('should return undefined when not found', () => \{
			    expect(
			      schemaErrorLookup(
			        \{
			          test: \{
			            type: 'test',
			            message: 'error',
			          \},
			        \},
			        \{\},
			        'test1234',
			      ),
			    ).toEqual(\{ error: undefined, name: 'test1234' \});
			
			    expect(
			      schemaErrorLookup(
			        \{
			          test: \{
			            type: 'test',
			            message: 'error',
			          \},
			        \},
			        \{\},
			        'testX.1.test',
			      ),
			    ).toEqual(\{
			      name: 'testX.1.test',
			    \});
			
			    expect(
			      schemaErrorLookup<\{
			        test: \{
			          test: string;
			          test1: string;
			        \};
			      \}>(
			        \{
			          test: \{
			            test: \{
			              type: 'test',
			              message: 'error',
			            \},
			            test1: \{
			              type: 'test',
			              message: 'error',
			            \},
			          \},
			        \},
			        \{\},
			        'test.test2',
			      ),
			    ).toEqual(\{
			      name: 'test.test2',
			    \});
			  \});
			
			  it('should prevent error from reported when field is identified', () => \{
			    expect(
			      schemaErrorLookup<\{
			        test: \{
			          test: string;
			          test1: string;
			        \};
			      \}>(
			        \{
			          test: \{
			            test: \{
			              type: 'test',
			              message: 'error',
			            \},
			            test1: \{
			              type: 'test',
			              message: 'error',
			            \},
			          \},
			        \},
			        \{
			          test: \{
			            test1: \{
			              _f: \{
			                ref: \{\},
			                name: 'test',
			              \},
			            \},
			          \},
			        \},
			        'test.test1.whatever',
			      ),
			    ).toEqual(\{
			      name: 'test.test1.whatever',
			    \});
			
			    expect(
			      schemaErrorLookup<\{
			        test: \{
			          test: string;
			          test1: string;
			        \};
			      \}>(
			        \{
			          test: \{
			            test: \{
			              type: 'test',
			              message: 'error',
			            \},
			            test1: \{
			              type: 'test',
			              message: 'error',
			            \},
			          \},
			        \},
			        \{
			          test: \{
			            test1: \{
			              _f: \{
			                ref: \{\},
			                name: 'test',
			              \},
			            \},
			          \},
			        \},
			        'test.testXYZ',
			      ),
			    ).toEqual(\{
			      name: 'test.testXYZ',
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\schemaErrorLookup.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\shouldSubscribeByName.test.ts', () => {
        const sourceCode = `
			import shouldSubscribeByName from '../../logic/shouldSubscribeByName';
			
			describe('shouldSubscribeByName', () => \{
			  it('should return correct response for subscription name coverage', () => \{
			    expect(shouldSubscribeByName(undefined, 'test')).toBeTruthy();
			    expect(shouldSubscribeByName('test', undefined)).toBeTruthy();
			    expect(shouldSubscribeByName(['test'], undefined)).toBeTruthy();
			    expect(shouldSubscribeByName(['test'], 'test')).toBeTruthy();
			    expect(shouldSubscribeByName(['tes'], 'test')).toBeTruthy();
			    expect(shouldSubscribeByName(['test1'], 'test')).toBeTruthy();
			    expect(shouldSubscribeByName('test1', 'test')).toBeTruthy();
			    expect(shouldSubscribeByName('tes', 'test')).toBeTruthy();
			
			    expect(shouldSubscribeByName('testXXX', 'data')).toBeFalsy();
			    expect(shouldSubscribeByName(['testXXX'], 'data')).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\shouldSubscribeByName.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\skipValidation.test.ts', () => {
        const sourceCode = `
			import skipValidation from '../../logic/skipValidation';
			
			describe('should skip validation', () => \{
			  it('when is onChange mode and blur event', () => \{
			    expect(
			      skipValidation(
			        false,
			        false,
			        false,
			        \{
			          isOnChange: true,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: true,
			          isOnBlur: true,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeTruthy();
			  \});
			
			  it('when is onSubmit mode and re-validate on Submit', () => \{
			    expect(
			      skipValidation(
			        false,
			        false,
			        false,
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeTruthy();
			  \});
			
			  it('when is onSubmit mode and not submitted yet', () => \{
			    expect(
			      skipValidation(
			        false,
			        false,
			        false,
			        \{
			          isOnChange: true,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeTruthy();
			  \});
			
			  it('when on blur mode, not blur event and error gets clear', () => \{
			    expect(
			      skipValidation(
			        false,
			        false,
			        false,
			        \{
			          isOnChange: true,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: true,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeTruthy();
			  \});
			
			  it('when re-validate mode is blur, not blur event and has error ', () => \{
			    expect(
			      skipValidation(
			        false,
			        false,
			        true,
			        \{
			          isOnChange: true,
			          isOnBlur: true,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeTruthy();
			  \});
			
			  it('when is re-validate mode on submit and have error', () => \{
			    expect(
			      skipValidation(
			        false,
			        false,
			        true,
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeTruthy();
			  \});
			\});
			
			describe('should validate the input', () => \{
			  it('when form is submitted and there is error', () => \{
			    expect(
			      skipValidation(
			        false,
			        false,
			        true,
			        \{
			          isOnChange: true,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeFalsy();
			  \});
			
			  it('when mode is under all', () => \{
			    expect(
			      skipValidation(
			        false,
			        false,
			        false,
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: false,
			          isOnAll: true,
			        \},
			      ),
			    ).toBeFalsy();
			  \});
			
			  it('when user blur input and there is no more error', () => \{
			    expect(
			      skipValidation(
			        true,
			        false,
			        false,
			        \{
			          isOnChange: true,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: true,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeFalsy();
			  \});
			
			  it('when user blur and there is an error', () => \{
			    expect(
			      skipValidation(
			        true,
			        false,
			        false,
			        \{
			          isOnChange: true,
			          isOnBlur: false,
			        \},
			        \{
			          isOnChange: false,
			          isOnBlur: true,
			          isOnTouch: false,
			        \},
			      ),
			    ).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\skipValidation.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\logic\\validateField.test.tsx', () => {
        const sourceCode = `
			import getCheckboxValue from '../../logic/getCheckboxValue';
			import getRadioValue from '../../logic/getRadioValue';
			import validateField from '../../logic/validateField';
			
			jest.mock('../../logic/getRadioValue');
			jest.mock('../../logic/getCheckboxValue');
			
			describe('validateField', () => \{
			  it('should return required true when input not filled with required', async () => \{
			    (getRadioValue as jest.Mock).mockImplementation(() => (\{
			      value: '2',
			    \}));
			    (getCheckboxValue as jest.Mock).mockImplementation(() => (\{
			      value: false,
			      isValid: false,
			    \}));
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', value: '', name: 'test' \},
			            required: true,
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{ type: 'text', value: '', name: 'test' \},
			        message: '',
			        type: 'required',
			      \},
			    \});
			
			    const input = document.createElement('input');
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: input,
			            required: true,
			            valueAsNumber: true,
			          \},
			        \},
			        // @ts-expect-error
			        NaN,
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: input,
			        message: '',
			        type: 'required',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', value: '', name: 'test' \},
			            required: 'required',
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{ type: 'text', value: '', name: 'test' \},
			        message: 'required',
			        type: 'required',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            valueAsNumber: true,
			            mount: true,
			            name: 'test',
			            ref: \{ name: 'test' \},
			            required: 'required',
			          \},
			        \},
			        \{
			          test: 2,
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', value: '', name: 'test' \},
			            required: 'required',
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{ type: 'text', value: '', name: 'test' \},
			        message: 'required',
			        type: 'required',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', value: '', name: 'test' \},
			            required: \{
			              value: true,
			              message: 'required',
			            \},
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{ type: 'text', value: '', name: 'test' \},
			        message: 'required',
			        type: 'required',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', value: '', name: 'test' \},
			            required: \{
			              value: true,
			              message: 'required',
			            \},
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{ type: 'text', value: '', name: 'test' \},
			        message: 'required',
			        type: 'required',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', value: '', name: 'test' \},
			            required: \{
			              value: false,
			              message: 'required',
			            \},
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'radio', name: 'test' \},
			            required: true,
			          \},
			        \},
			        \{
			          test: false,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        type: 'required',
			        ref: \{ type: 'radio', name: 'test' \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', value: '', name: 'test' \},
			            required: 'test',
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: 'test',
			        type: 'required',
			        ref: \{ type: 'text', name: 'test', value: '' \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'radio', value: '', name: 'test' \},
			            required: 'test',
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: 'test',
			        type: 'required',
			        ref: \{ type: 'radio', name: 'test', value: '' \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'checkbox', name: 'test' \},
			            required: 'test',
			          \},
			        \},
			        \{
			          test: false,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: 'test',
			        type: 'required',
			        ref: \{ type: 'checkbox', name: 'test' \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', value: '0', name: 'test' \},
			            required: true,
			            value: '0',
			          \},
			        \},
			        \{
			          test: '0',
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			
			    (getCheckboxValue as jest.Mock).mockImplementation(() => (\{
			      value: 'test',
			      isValid: true,
			    \}));
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'checkbox', name: 'test' \},
			            required: 'test',
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            valueAsNumber: true,
			            ref: \{ name: 'test', value: '' \},
			            required: true,
			            value: NaN,
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'required',
			        message: '',
			        ref: \{
			          name: 'test',
			          value: '',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ name: 'test', type: 'file', value: '' \},
			            required: true,
			            value: \{\},
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'required',
			        message: '',
			        ref: \{
			          type: 'file',
			          name: 'test',
			          value: '',
			        \},
			      \},
			    \});
			  \});
			
			  it('should return max error', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			            value: 10,
			            required: true,
			            max: 0,
			          \},
			        \},
			        \{
			          test: 10,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: '',
			        ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			            value: 10,
			            required: true,
			            max: \{
			              value: 0,
			              message: 'max',
			            \},
			          \},
			        \},
			        \{
			          test: 10,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: 'max',
			        ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			            required: true,
			            max: \{
			              value: 0,
			              message: 'max',
			            \},
			            value: 10,
			          \},
			        \},
			        \{
			          test: 10,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: 'max',
			        ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: 8 \},
			            value: 8,
			            required: true,
			            max: 8,
			          \},
			        \},
			        \{
			          test: 8,
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			            value: 10,
			            max: 8,
			          \},
			        \},
			        \{
			          test: 10,
			        \},
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: '',
			        ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			        types: \{
			          max: true,
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'custom', name: 'test', valueAsNumber: NaN \},
			            value: '',
			            required: true,
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'required',
			        message: '',
			        ref: \{ type: 'custom', name: 'test', valueAsNumber: NaN \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'custom',
			              name: 'test',
			              valueAsNumber: NaN,
			            \},
			            value: undefined,
			            required: true,
			          \},
			        \},
			        \{
			          test: undefined,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'required',
			        message: '',
			        ref: \{
			          type: 'custom',
			          name: 'test',
			          value: undefined,
			          valueAsNumber: NaN,
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'custom',
			              name: 'test',
			              valueAsNumber: NaN,
			            \},
			            value: null,
			            required: true,
			          \},
			        \},
			        \{
			          test: null,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'required',
			        message: '',
			        ref: \{ type: 'custom', name: 'test', valueAsNumber: NaN \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'custom', name: 'test' \},
			            required: true,
			            value: 'ok',
			          \},
			        \},
			        \{
			          test: 'ok',
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'date',
			              name: 'test',
			            \},
			            value: '2019-2-13',
			            required: true,
			            max: '2019-1-12',
			          \},
			        \},
			        \{
			          test: '2019-2-13',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: '',
			        ref: \{
			          type: 'date',
			          name: 'test',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'week',
			              name: 'test',
			            \},
			            value: '2022-W18',
			            required: true,
			            max: \{
			              value: '2022-W17',
			              message: 'max',
			            \},
			          \},
			        \},
			        \{
			          test: '2022-W18',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: 'max',
			        ref: \{
			          type: 'week',
			          name: 'test',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'time',
			              name: 'test',
			            \},
			            value: '14:00',
			            required: true,
			            max: \{
			              value: '13:00',
			              message: 'max',
			            \},
			          \},
			        \},
			        \{
			          test: '14:00',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: 'max',
			        ref: \{
			          type: 'time',
			          name: 'test',
			        \},
			      \},
			    \});
			  \});
			
			  it('should return min error', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: -1 \},
			            value: -1,
			            required: true,
			            min: 0,
			          \},
			        \},
			        \{
			          test: -1,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: '',
			        ref: \{ type: 'number', name: 'test', valueAsNumber: -1 \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: -1 \},
			            value: -1,
			            required: true,
			            min: \{
			              value: 0,
			              message: 'min',
			            \},
			          \},
			        \},
			        \{
			          test: -1,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: 'min',
			        ref: \{ type: 'number', name: 'test', valueAsNumber: -1 \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: -1 \},
			            value: -1,
			            required: true,
			            min: \{
			              value: 0,
			              message: 'min',
			            \},
			          \},
			        \},
			        \{
			          test: -1,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: 'min',
			        ref: \{ type: 'number', name: 'test', valueAsNumber: -1 \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			            value: 10,
			            required: true,
			            min: 12,
			          \},
			        \},
			        \{
			          test: 10,
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: '',
			        ref: \{ type: 'number', name: 'test', valueAsNumber: 10 \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'date',
			              name: 'test',
			              valueAsDate: new Date('2019-2-12'),
			            \},
			            value: '2019-2-12',
			            required: true,
			            min: '2019-3-12',
			          \},
			        \},
			        \{
			          test: '2019-2-12',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: '',
			        ref: \{
			          type: 'date',
			          name: 'test',
			          valueAsDate: new Date('2019-2-12'),
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'date',
			              name: 'test',
			            \},
			            value: '2019-2-12',
			            required: true,
			            min: \{
			              value: '2019-3-12',
			              message: 'min',
			            \},
			          \},
			        \},
			        \{
			          test: '2019-2-12',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: 'min',
			        ref: \{
			          type: 'date',
			          name: 'test',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'date',
			              name: 'test',
			              valueAsDate: new Date('2019-2-12'),
			            \},
			            value: '2019-2-12',
			            required: true,
			            min: \{
			              value: '2019-3-12',
			              message: 'min',
			            \},
			          \},
			        \},
			        \{
			          test: '2019-2-12',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: 'min',
			        ref: \{
			          type: 'date',
			          name: 'test',
			          valueAsDate: new Date('2019-2-12'),
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'week',
			              name: 'test',
			            \},
			            value: '2022-W15',
			            required: true,
			            min: \{
			              value: '2022-W17',
			              message: 'min',
			            \},
			          \},
			        \},
			        \{
			          test: '2022-W15',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: 'min',
			        ref: \{
			          type: 'week',
			          name: 'test',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'time',
			              name: 'test',
			            \},
			            value: '12:00',
			            required: true,
			            min: \{
			              value: '13:00',
			              message: 'min',
			            \},
			          \},
			        \},
			        \{
			          test: '12:00',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: 'min',
			        ref: \{
			          type: 'time',
			          name: 'test',
			        \},
			      \},
			    \});
			  \});
			
			  it('should return min and max error for custom input', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: '', name: 'test' \},
			            value: '1',
			            required: true,
			            min: '4',
			          \},
			        \},
			        \{
			          test: '1',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'min',
			        message: '',
			        ref: \{ type: '', name: 'test' \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: '', name: 'test' \},
			            value: '4',
			            required: true,
			            max: '2',
			          \},
			        \},
			        \{
			          test: '4',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: '',
			        ref: \{ type: '', name: 'test' \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: '',
			              name: 'test',
			              valueAsDate: new Date('2019-2-12'),
			            \},
			            value: '2019-2-12',
			            required: true,
			            max: '2019-1-12',
			          \},
			        \},
			        \{
			          test: '2019-2-12',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'max',
			        message: '',
			        ref: \{
			          type: '',
			          name: 'test',
			          valueAsDate: new Date('2019-2-12'),
			        \},
			      \},
			    \});
			  \});
			
			  it('should return max length error ', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            maxLength: 12,
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: '',
			        type: 'maxLength',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            maxLength: \{
			              value: 12,
			              message: 'maxLength',
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: 'maxLength',
			        type: 'maxLength',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            maxLength: \{
			              value: 12,
			              message: 'maxLength',
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: 'maxLength',
			        type: 'maxLength',
			      \},
			    \});
			  \});
			
			  it('should return min length error ', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            minLength: 200,
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: '',
			        type: 'minLength',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            minLength: \{
			              value: 200,
			              message: 'minLength',
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: 'minLength',
			        type: 'minLength',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            minLength: \{
			              value: 200,
			              message: 'minLength',
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: 'minLength',
			        type: 'minLength',
			      \},
			    \});
			  \});
			
			  it('should return pattern error when not matching', async () => \{
			    const emailRegex =
			      /(?:[a-z0-9!#\$%&'*+/=?^_\`\{|\}~-]+(?:\\.[a-z0-9!#\$%&'*+/=?^_\`\{|\}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.)\{3\}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])/;
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            pattern: emailRegex,
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: '',
			        type: 'pattern',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            required: true,
			            value: 'This is a long text input',
			            pattern: \{
			              value: emailRegex,
			              message: 'regex failed',
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: 'regex failed',
			        type: 'pattern',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            pattern: \{
			              value: emailRegex,
			              message: 'regex failed',
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        message: 'regex failed',
			        type: 'pattern',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'test@test.com',
			            required: true,
			            pattern: emailRegex,
			          \},
			        \},
			        \{
			          test: 'test@test.com',
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: null,
			            required: false,
			            pattern: emailRegex,
			          \},
			        \},
			        \{
			          test: null,
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			  \});
			
			  it('should validate for custom validation', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            validate: (value) => value.toString().length > 3,
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            validate: (value) => value.toString().length < 3,
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        type: 'validate',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            required: true,
			            validate: \{
			              test: (value) => value.toString().length < 3,
			              test1: (value) => value.toString().length > 10,
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			        type: 'test',
			        message: '',
			      \},
			    \});
			
			    (getRadioValue as jest.Mock).mockImplementation(() => \{
			      return \{
			        isValid: false,
			        value: 'test',
			      \};
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input!',
			            validate: \{
			              test: (value) => value.toString().length < 3,
			              test1: (value) => value.toString().length > 10,
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input!',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{
			          name: 'test',
			          type: 'text',
			        \},
			        type: 'test',
			        message: '',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'radio',
			              name: 'test',
			            \},
			            value: 'This is a long text input!',
			            validate: \{
			              test: (value) => value.toString().length < 3,
			              test1: (value) => value.toString().length > 10,
			            \},
			            refs: [\{ type: 'data' \} as HTMLInputElement],
			          \},
			        \},
			        \{
			          test: 'This is a long text input!',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        ref: \{ type: 'data' \},
			        type: 'test',
			        message: '',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'radio',
			              name: 'test',
			            \},
			            value: 'This is a long text input!',
			            validate: \{
			              test: () => true,
			            \},
			            refs: [
			              \{
			                type: 'data',
			              \} as HTMLInputElement,
			            ],
			          \},
			        \},
			        \{
			          test: 'This is a long text input!',
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			  \});
			
			  it('should return error message when it is defined', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            validate: \{
			              test: (value) => \{
			                if (value.toString().length > 3) \{
			                  return 'max 3';
			                \}
			                return true;
			              \},
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'test',
			        message: 'max 3',
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            validate: \{
			              test: (value) => \{
			                if (value.toString().length > 3) \{
			                  return 'max 3';
			                \}
			                return true;
			              \},
			            \},
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'test',
			        message: 'max 3',
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			      \},
			    \});
			  \});
			
			  it('should return result or empty string when validate has error', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            validate: (value) => value.toString().length < 3 || 'bill',
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'validate',
			        message: 'bill',
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            validate: (value) => value.toString().length < 3 || 'bill',
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{
			      test: \{
			        type: 'validate',
			        message: 'bill',
			        ref: \{
			          type: 'text',
			          name: 'test',
			        \},
			      \},
			    \});
			  \});
			
			  it('if undefined returned from validate, no error is reported', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            validate: () => undefined,
			          \},
			        \},
			        \{
			          test: 'This is a long text input',
			        \},
			        false,
			      ),
			    ).toEqual(\{\});
			  \});
			
			  it('should do nothing when validate is not an object nor function', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{
			              type: 'text',
			              name: 'test',
			            \},
			            value: 'This is a long text input',
			            // @ts-expect-error
			            validate: 'validate',
			          \},
			        \},
			        'This is a long text input',
			        false,
			      ),
			    ).toEqual(\{\});
			  \});
			
			  it('should return all validation errors', async () => \{
			    (getRadioValue as jest.Mock).mockImplementation(() => (\{
			      value: '',
			    \}));
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', name: 'test' \},
			            value: '',
			            required: true,
			            minLength: 10,
			            pattern: /d/i,
			            validate: (value) => value === 'test',
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        ref: \{
			          name: 'test',
			          type: 'text',
			        \},
			        type: 'required',
			        types: \{
			          required: true,
			          validate: true,
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', name: 'test' \},
			            value: '123',
			            required: true,
			            minLength: 10,
			            pattern: /d/i,
			            validate: (value) => value === 'test',
			          \},
			        \},
			        \{
			          test: '123',
			        \},
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        ref: \{
			          name: 'test',
			          type: 'text',
			        \},
			        type: 'minLength',
			        types: \{
			          minLength: true,
			          pattern: true,
			          validate: true,
			        \},
			      \},
			    \});
			  \});
			
			  it('should handle pattern with g flag', async () => \{
			    const reusedRe = /a/g;
			
			    (getRadioValue as jest.Mock).mockImplementation(() => (\{
			      value: '',
			    \}));
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', name: 'test' \},
			            value: 'a',
			            required: true,
			            minLength: 10,
			            pattern: reusedRe,
			            validate: (value) => value === 'test',
			          \},
			        \},
			        \{
			          test: 'a',
			        \},
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        ref: \{
			          name: 'test',
			          type: 'text',
			        \},
			        type: 'minLength',
			        types: \{
			          minLength: true,
			          validate: true,
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', name: 'test' \},
			            value: 'a',
			            required: true,
			            minLength: 10,
			            pattern: reusedRe,
			            validate: (value) => value === 'test',
			          \},
			        \},
			        \{
			          test: 'a',
			        \},
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        ref: \{
			          name: 'test',
			          type: 'text',
			        \},
			        type: 'minLength',
			        types: \{
			          minLength: true,
			          validate: true,
			        \},
			      \},
			    \});
			  \});
			
			  it('should return all validation error messages', async () => \{
			    (getRadioValue as jest.Mock).mockImplementation(() => (\{
			      value: '',
			    \}));
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', name: 'test' \},
			            value: '',
			            required: 'test',
			            minLength: \{
			              value: 10,
			              message: 'minLength',
			            \},
			            pattern: \{
			              value: /d/i,
			              message: 'pattern',
			            \},
			            validate: \{
			              test: (value) => value === 'test',
			              test1: (value) => value == 'test' || 'Luo',
			              test2: (value) => value == 'test' || 'Bill',
			            \},
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: 'test',
			        ref: \{
			          name: 'test',
			          type: 'text',
			        \},
			        type: 'required',
			        types: \{
			          required: 'test',
			          test: true,
			          test1: 'Luo',
			          test2: 'Bill',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', name: 'test' \},
			            value: 'bil',
			            required: 'test',
			            minLength: \{
			              value: 10,
			              message: 'minLength',
			            \},
			            pattern: \{
			              value: /d/i,
			              message: 'pattern',
			            \},
			            validate: \{
			              test: (value) => value === 'test',
			              test1: (value) => value == 'test' || 'Luo',
			              test2: (value) => value == 'test' || 'Bill',
			            \},
			          \},
			        \},
			        \{
			          test: 'bil',
			        \},
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: 'minLength',
			        ref: \{
			          name: 'test',
			          type: 'text',
			        \},
			        type: 'minLength',
			        types: \{
			          minLength: 'minLength',
			          pattern: 'pattern',
			          test: true,
			          test1: 'Luo',
			          test2: 'Bill',
			        \},
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            mount: true,
			            name: 'test',
			            ref: \{ type: 'text', name: 'test' \},
			            value: 'bil',
			            required: 'test',
			            minLength: \{
			              value: 10,
			              message: 'minLength',
			            \},
			            pattern: \{
			              value: /d/i,
			              message: 'pattern',
			            \},
			            validate: \{
			              test: (value) => value === 'test',
			              test1: (value) => value == 'test' || 'Luo',
			              test2: (value) => value == 'test' || 'Bill',
			            \},
			          \},
			        \},
			        \{
			          test: 'bil',
			        \},
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: 'minLength',
			        ref: \{
			          name: 'test',
			          type: 'text',
			        \},
			        type: 'minLength',
			        types: \{
			          minLength: 'minLength',
			          pattern: 'pattern',
			          test: true,
			          test1: 'Luo',
			          test2: 'Bill',
			        \},
			      \},
			    \});
			  \});
			
			  describe('with Browser native validation', () => \{
			    it('should invoke setCustomValidity for invalid input', () => \{
			      const setCustomValidity = jest.fn();
			      const reportValidity = jest.fn();
			
			      validateField(
			        \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              setCustomValidity,
			              reportValidity,
			              name: 'test',
			              value: '',
			            \},
			            value: '',
			            required: true,
			            mount: true,
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			        true,
			      );
			
			      expect(setCustomValidity).toBeCalledWith('');
			      expect(reportValidity).toBeCalled();
			    \});
			
			    it('should invoke setCustomValidity for invalid input with its message', () => \{
			      const setCustomValidity = jest.fn();
			      const reportValidity = jest.fn();
			
			      validateField(
			        \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              setCustomValidity,
			              reportValidity,
			              name: 'test',
			              value: '',
			            \},
			            value: '',
			            required: 'something is wrong',
			            mount: true,
			          \},
			        \},
			        \{
			          test: '',
			        \},
			        false,
			        true,
			      );
			
			      expect(setCustomValidity).toBeCalledWith('something is wrong');
			      expect(reportValidity).toBeCalled();
			    \});
			
			    it('should invoke setCustomValidity with empty string for a valid input', () => \{
			      const setCustomValidity = jest.fn();
			      const reportValidity = jest.fn();
			
			      validateField(
			        \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              setCustomValidity,
			              reportValidity,
			              name: 'test',
			              value: 'test',
			            \},
			            value: 'test',
			            required: true,
			            mount: true,
			          \},
			        \},
			        \{
			          test: 'test',
			        \},
			        false,
			        true,
			      );
			
			      expect(setCustomValidity).toBeCalledWith('');
			      expect(reportValidity).toBeCalled();
			    \});
			
			    it('should abort validation early when input is disabled', async () => \{
			      expect(
			        await validateField(
			          \{
			            _f: \{
			              name: 'test',
			              ref: \{
			                name: 'test',
			                value: '',
			              \},
			              value: '',
			              required: 'something is wrong',
			              disabled: true,
			            \},
			          \},
			          \{
			            test: '',
			          \},
			          false,
			        ),
			      ).toEqual(\{\});
			    \});
			  \});
			
			  it('should validate field array with required attribute', async () => \{
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              name: 'test',
			              value: '',
			            \},
			            value: undefined,
			            required: true,
			            mount: true,
			          \},
			        \},
			        \{
			          test: undefined,
			        \},
			        false,
			        false,
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        ref: \{
			          name: 'test',
			          value: '',
			        \},
			        type: 'required',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              name: 'test',
			              value: '',
			            \},
			            value: [],
			            required: true,
			            mount: true,
			          \},
			        \},
			        [],
			        false,
			        false,
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        ref: \{
			          name: 'test',
			          value: '',
			        \},
			        type: 'required',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              name: 'test',
			              value: '',
			            \},
			            value: null,
			            required: true,
			            mount: true,
			          \},
			        \},
			        \{
			          test: null,
			        \},
			        false,
			        false,
			        true,
			      ),
			    ).toEqual(\{
			      test: \{
			        message: '',
			        ref: \{
			          name: 'test',
			          value: '',
			        \},
			        type: 'required',
			      \},
			    \});
			
			    expect(
			      await validateField(
			        \{
			          _f: \{
			            name: 'test',
			            ref: \{
			              name: 'test',
			              value: '',
			            \},
			            value: [],
			            required: true,
			            mount: true,
			          \},
			        \},
			        \{
			          test: [\{\}],
			        \},
			        false,
			        false,
			        true,
			      ),
			    ).toEqual(\{\});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\logic\\validateField.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(20)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\type.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			
			import \{ Controller \} from '../controller';
			import \{
			  FieldErrors,
			  FieldPath,
			  FieldValues,
			  Path,
			  PathValue,
			  UseFormRegister,
			\} from '../types';
			import \{ useController \} from '../useController';
			import \{ useFieldArray \} from '../useFieldArray';
			import \{ useForm \} from '../useForm';
			import \{ useFormState \} from '../useFormState';
			import \{ useWatch \} from '../useWatch';
			
			test('should not throw type error with path name', () => \{
			  type MissingCompanyNamePath = Path<\{
			    test: \{
			      test: \{
			        name: string;
			      \}[];
			      testName: string;
			    \};
			  \}>;
			
			  const test: MissingCompanyNamePath[] = [
			    'test',
			    'test.test',
			    'test.testName',
			    'test.test.0',
			    'test.test.0.name',
			  ];
			
			  test;
			\});
			
			test('should not throw type error with optional array fields', () => \{
			  type Thing = \{ id: string; name: string \};
			
			  interface FormData \{
			    name: string;
			    things?: Array<\{ name: string \}>;
			    items?: Array<Thing>;
			  \}
			
			  function App() \{
			    const \{ control, register \} = useForm<FormData>(\{
			      defaultValues: \{ name: 'test' \},
			    \});
			    const \{ fields, append \} = useFieldArray(\{ control, name: 'things' \});
			    const fieldArray = useFieldArray(\{ control, name: 'items' \});
			
			    return (
			      <div className="App">
			        <input \{...register('name')\} />
			
			        <button onClick=\{() => append(\{ name: '' \})\}>Add</button>
			
			        \{fields.map((field, index) => (
			          <div key=\{field.id\}>
			            <input \{...register(\`things.\$\{index\}.name\` as const)\} />
			          </div>
			        ))\}
			        \{fieldArray.fields.map((item) => \{
			          return <div key=\{item.id\}>\{item.name\}</div>;
			        \})\}
			      </div>
			    );
			  \}
			
			  App;
			\});
			
			test('should work with optional field with Controller', () => \{
			  type FormValues = \{
			    firstName: string;
			    lastName?: string;
			  \};
			
			  function App() \{
			    const \{ control \} = useForm<FormValues>();
			
			    return (
			      <div>
			        <Controller
			          name="firstName"
			          defaultValue=""
			          control=\{control\}
			          render=\{(\{ field: \{ value, onChange \} \}) => \{
			            return <input value=\{value\} onChange=\{onChange\} />;
			          \}\}
			        />
			        <Controller
			          name="lastName"
			          defaultValue=""
			          control=\{control\}
			          render=\{(\{ field: \{ value, onChange \} \}) => \{
			            return <input value=\{value\} onChange=\{onChange\} />;
			          \}\}
			        />
			      </div>
			    );
			  \}
			
			  App;
			\});
			
			test('should work with useWatch return correct array types', () => \{
			  type FormValues = \{
			    testString: string;
			    testNumber: number;
			    testObject: \{
			      testString: string;
			      test1String: string;
			    \};
			  \};
			
			  const App = () => \{
			    const \{ control \} = useForm<FormValues>();
			    const output: [
			      FormValues['testString'],
			      FormValues['testNumber'],
			      FormValues['testObject'],
			    ] = useWatch(\{
			      control,
			      name: ['testString', 'testNumber', 'testObject'],
			    \});
			
			    return output;
			  \};
			
			  App;
			\});
			
			test('should type errors correctly with Path generic', () => \{
			  interface InputProps<T extends FieldValues = FieldValues> \{
			    name: FieldPath<T>;
			    register: UseFormRegister<T>;
			    errors: FieldErrors<T>;
			  \}
			
			  function Input<T extends FieldValues = FieldValues>(\{
			    name,
			    register,
			    errors,
			  \}: InputProps<T>) \{
			    return (
			      <>
			        <input \{...register(name)\} />
			        \{errors[name] ? errors?.[name]?.message : 'no error'\}
			      </>
			    );
			  \}
			
			  Input;
			\});
			
			test('should allow unpackedValue and deep partial unpackValue for reset', () => \{
			  type Type1 = \{ name: string \};
			  type Type2 = \{ name: string \};
			
			  type Forms = \{
			    test: Type1;
			    test1: Type2;
			  \};
			
			  type FormMapKey = keyof Forms;
			
			  const Test = <T extends FormMapKey>() => \{
			    const \{ reset, getValues \} = useForm<Forms[T]>();
			    reset(getValues());
			  \};
			
			  Test;
			\});
			
			test('should infer context type into control', () => \{
			  function App() \{
			    const [isValid] = React.useState(true);
			    const \{ control \} = useForm<\{ test: \{\}[] \}, \{ isValid: boolean \}>(\{
			      resolver: (data, context) => \{
			        return \{
			          values: context?.isValid ? data : \{\},
			          errors: \{\},
			        \};
			      \},
			      context: \{
			        isValid,
			      \},
			    \});
			
			    useFieldArray(\{
			      name: 'test',
			      control,
			    \});
			
			    return null;
			  \}
			
			  App;
			\});
			
			test('should support optional field errors', () => \{
			  type Errors = FieldErrors<\{
			    steps?: \{ action: string \}[];
			    foo?: \{
			      bar: string;
			    \};
			    baz: \{ action: string \};
			  \}>;
			
			  const error = \{
			    type: 'test',
			    message: 'test',
			  \};
			
			  let errors: Errors = \{
			    steps: error,
			    foo: error,
			    baz: error,
			  \};
			
			  errors = \{
			    steps: [\{ action: error \}],
			    foo: \{
			      bar: error,
			    \},
			    baz: \{
			      action: error,
			    \},
			  \};
			
			  errors;
			\});
			
			test('should support nullable field errors', () => \{
			  type Errors = FieldErrors<\{
			    steps?: \{ action: string \}[] | null;
			    foo: \{
			      bar: string;
			    \} | null;
			    baz: \{ action: string \};
			  \}>;
			
			  const error = \{
			    type: 'test',
			    message: 'test',
			  \};
			
			  let errors: Errors = \{
			    steps: error,
			    foo: error,
			    baz: error,
			  \};
			
			  errors = \{
			    steps: [\{ action: error \}],
			    foo: \{
			      bar: error,
			    \},
			    baz: \{
			      action: error,
			    \},
			  \};
			
			  errors;
			\});
			
			test('should work with generic component path assertion', () => \{
			  function App<T extends FieldValues>() \{
			    const \{ register \} = useForm<T>();
			    const FIELD_DATA_EXTENSION = '__data';
			    const item = \{
			      value: 'data',
			    \};
			
			    register(\`FieldName\$\{FIELD_DATA_EXTENSION\}\` as FieldPath<T>, \{
			      value: item as PathValue<T, Path<T>>,
			    \});
			
			    return null;
			  \}
			
			  App;
			\});
			
			test('should infer async default values', () => \{
			  const formValues = \{
			    test: 'test',
			    test1: \{
			      nested: 'test',
			    \},
			    fieldArray: [\{ test: '' \}],
			  \};
			
			  function App() \{
			    const \{
			      register,
			      control,
			      formState,
			      setValue,
			      reset,
			      watch,
			      getValues,
			      getFieldState,
			      clearErrors,
			      unregister,
			      setFocus,
			      trigger,
			      setError,
			    \} = useForm<typeof formValues>(\{
			      defaultValues: async () => \{
			        return formValues;
			      \},
			    \});
			    useFieldArray(\{
			      name: 'fieldArray' as const,
			      control,
			    \});
			    useController(\{
			      name: 'test1.nested',
			      control,
			    \});
			    useWatch(\{
			      name: 'test1',
			      control,
			    \});
			    useFormState(\{
			      name: 'fieldArray',
			      control,
			    \});
			
			    setValue('test', 'data');
			    setValue('test1.nested', 'data');
			    reset(\{
			      test: 'test',
			      test1: \{
			        nested: 'test1',
			      \},
			    \});
			
			    watch('test');
			    watch('test1.nested');
			
			    getValues('test');
			    getValues('test1.nested');
			
			    getFieldState('test');
			    getFieldState('test1.nested');
			
			    clearErrors('test');
			    clearErrors('test1.nested');
			
			    unregister('test');
			    unregister('test1.nested');
			
			    setFocus('test');
			    setFocus('test1.nested');
			
			    trigger('test');
			    trigger('test1.nested');
			
			    setError('test', \{ type: 'test ' \});
			    setError('test1.nested', \{ type: 'test ' \});
			
			    return (
			      <form>
			        <input \{...register('test')\} />
			        <Controller render=\{() => <input />\} name=\{'test1'\} control=\{control\} />
			        <p>\{formState.errors?.test?.message\}</p>
			        <p>\{formState.errors?.test1?.message\}</p>
			        <p>\{formState.touchedFields.test\}</p>
			        <p>\{formState.touchedFields.test1?.nested\}</p>
			        <p>\{formState.dirtyFields.test\}</p>
			        <p>\{formState.dirtyFields.test1?.nested\}</p>
			      </form>
			    );
			  \}
			
			  App;
			\});
			
			test('should work for root error type', () => \{
			  const App = () => \{
			    const \{
			      setError,
			      formState: \{ errors \},
			    \} = useForm();
			
			    setError('root', \{
			      type: 'data',
			      message: 'test',
			    \});
			    setError('root.nested', \{
			      type: 'data',
			      message: 'test',
			    \});
			
			    React.useEffect(() => \{
			      setError('root.test', \{
			        type: 'root.test',
			      \});
			      setError('root', \{
			        type: 'root',
			      \});
			    \}, [setError]);
			
			    return (
			      <form>
			        <p>\{errors.root?.test?.message\}</p>
			        <p>\{errors.root?.message\}</p>
			      </form>
			    );
			  \};
			
			  App;
			\});
			
			it('should worked for error with type or message keyword', () => \{
			  type FormInputs = \{
			    object: \{ id: string; type: string; message: string \};
			  \};
			
			  const App = () => \{
			    const \{
			      register,
			      handleSubmit,
			      formState: \{ errors \},
			    \} = useForm<FormInputs>(\{
			      defaultValues: \{
			        object: \{
			          type: 'test',
			          id: 'test',
			        \},
			      \},
			    \});
			
			    const onSubmit = (data: FormInputs) => \{
			      alert(JSON.stringify(data));
			    \};
			
			    return (
			      <form onSubmit=\{handleSubmit(onSubmit)\}>
			        <label>Id</label>
			        <input type="number" \{...register('object.type', \{ min: 1 \})\} />
			        <input type="number" \{...register('object.id', \{ min: 1 \})\} />
			        <p>\{errors?.object?.id?.message\}</p>
			        <input type="submit" />
			      </form>
			    );
			  \};
			
			  App;
			\});
			
			test('should provide correct type for validate function with useFieldArray', () => \{
			  const App = () => \{
			    const \{ control \} = useForm<\{
			      test: \{
			        first: string;
			        last: string;
			      \}[];
			      test1: \{
			        first: string;
			        last: string;
			      \}[];
			    \}>(\{
			      defaultValues: \{
			        test: [
			          \{
			            first: 'value',
			            last: 'test',
			          \},
			        ],
			      \},
			    \});
			    useFieldArray(\{
			      control,
			      name: 'test',
			      rules: \{
			        validate: (data) => \{
			          return !!data.find((test) => test.first && test.last);
			        \},
			      \},
			    \});
			    useFieldArray(\{
			      control,
			      name: 'test1',
			      rules: \{
			        validate: \{
			          test: (data) => \{
			            return !!data.find((test) => test.first && test.last);
			          \},
			        \},
			      \},
			    \});
			
			    return null;
			  \};
			
			  App;
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\type.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(14)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useController.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			
			import \{ Controller \} from '../controller';
			import \{ Control, FieldPath, FieldValues \} from '../types';
			import \{ useController \} from '../useController';
			import \{ useForm \} from '../useForm';
			import \{ FormProvider, useFormContext \} from '../useFormContext';
			
			describe('useController', () => \{
			  it('should render input correctly', () => \{
			    const Component = () => \{
			      const \{ control \} = useForm<\{
			        test: string;
			        test1: \{ test: string \}[];
			      \}>();
			
			      useController(\{
			        name: 'test',
			        control,
			        defaultValue: '',
			      \});
			
			      return null;
			    \};
			
			    render(<Component />);
			  \});
			
			  it('should only subscribe to formState at each useController level', async () => \{
			    const renderCounter = [0, 0];
			    type FormValues = \{
			      test: string;
			      test1: string;
			    \};
			
			    const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const \{ field \} = useController(\{
			        name: 'test',
			        control,
			      \});
			
			      renderCounter[0]++;
			
			      return <input \{...field\} />;
			    \};
			
			    const Test1 = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const \{
			        field,
			        fieldState: \{ isDirty, isTouched \},
			      \} = useController(\{
			        name: 'test1',
			        control,
			      \});
			
			      renderCounter[1]++;
			
			      return (
			        <div>
			          <input \{...field\} />
			          \{isDirty && <p>isDirty</p>\}
			          \{isTouched && <p>isTouched</p>\}
			        </div>
			      );
			    \};
			
			    const Component = () => \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: '',
			          test1: '',
			        \},
			      \});
			
			      return (
			        <div>
			          <Test control=\{control\} />
			          <Test1 control=\{control\} />
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(renderCounter).toEqual([1, 1]);
			
			    fireEvent.change(screen.getAllByRole('textbox')[1], \{
			      target: \{
			        value: '1232',
			      \},
			    \});
			
			    expect(screen.getByText('isDirty')).toBeVisible();
			
			    fireEvent.blur(screen.getAllByRole('textbox')[1]);
			
			    expect(screen.getByText('isTouched')).toBeVisible();
			
			    expect(renderCounter).toEqual([1, 3]);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: '1232',
			      \},
			    \});
			
			    fireEvent.blur(screen.getAllByRole('textbox')[0]);
			
			    expect(renderCounter).toEqual([2, 5]);
			  \});
			
			  describe('checkbox', () => \{
			    it('should work for checkbox by spread the field object', async () => \{
			      const watchResult: unknown[] = [];
			      const Component = () => \{
			        const \{ control, watch \} = useForm<\{
			          test: string;
			        \}>();
			
			        watchResult.push(watch());
			
			        const \{ field \} = useController(\{
			          name: 'test',
			          control,
			          defaultValue: '',
			        \});
			
			        return <input type="checkbox" \{...field\} />;
			      \};
			
			      render(<Component />);
			
			      expect(watchResult).toEqual([\{\}]);
			
			      fireEvent.click(screen.getByRole('checkbox'));
			
			      expect(watchResult).toEqual([\{\}, \{ test: true \}]);
			
			      fireEvent.click(screen.getByRole('checkbox'));
			
			      expect(watchResult).toEqual([\{\}, \{ test: true \}, \{ test: false \}]);
			    \});
			
			    it('should work for checkbox by assign checked', async () => \{
			      const watchResult: unknown[] = [];
			      const Component = () => \{
			        const \{ control, watch \} = useForm<\{
			          test: boolean;
			        \}>();
			
			        watchResult.push(watch());
			
			        const \{ field \} = useController(\{
			          name: 'test',
			          control,
			        \});
			
			        return (
			          <input
			            type="checkbox"
			            checked=\{!!field.value\}
			            onChange=\{(e) => field.onChange(e.target.checked)\}
			          />
			        );
			      \};
			
			      render(<Component />);
			
			      expect(watchResult).toEqual([\{\}]);
			
			      fireEvent.click(screen.getByRole('checkbox'));
			
			      expect(watchResult).toEqual([\{\}, \{ test: true \}]);
			
			      fireEvent.click(screen.getByRole('checkbox'));
			
			      expect(watchResult).toEqual([\{\}, \{ test: true \}, \{ test: false \}]);
			    \});
			
			    it('should work for checkbox by assign value manually', async () => \{
			      const watchResult: unknown[] = [];
			      const Component = () => \{
			        const \{ control, watch \} = useForm<\{
			          test: string | boolean;
			        \}>();
			
			        watchResult.push(watch());
			
			        const \{ field \} = useController(\{
			          name: 'test',
			          control,
			          defaultValue: '',
			        \});
			
			        return (
			          <input
			            value="on"
			            type="checkbox"
			            checked=\{!!field.value\}
			            onChange=\{(e) =>
			              field.onChange(e.target.checked ? e.target.value : false)
			            \}
			          />
			        );
			      \};
			
			      render(<Component />);
			
			      expect(watchResult).toEqual([\{\}]);
			
			      fireEvent.click(screen.getByRole('checkbox'));
			
			      expect(watchResult).toEqual([\{\}, \{ test: 'on' \}]);
			
			      fireEvent.click(screen.getByRole('checkbox'));
			
			      expect(watchResult).toEqual([\{\}, \{ test: 'on' \}, \{ test: false \}]);
			    \});
			  \});
			
			  it('should subscribe to formState update with trigger re-render at root', () => \{
			    type FormValues = \{
			      test: string;
			    \};
			    let counter = 0;
			
			    const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const \{ field, formState \} = useController(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <>
			          <input \{...field\} />
			          <p>\{formState.dirtyFields.test && 'dirty'\}</p>
			          <p>\{formState.touchedFields.test && 'touched'\}</p>
			        </>
			      );
			    \};
			
			    const Component = () => \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: '',
			        \},
			      \});
			      counter++;
			
			      return <Test control=\{control\} />;
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    expect(counter).toEqual(1);
			
			    expect(screen.getByText('dirty')).toBeVisible();
			    expect(screen.getByText('touched')).toBeVisible();
			  \});
			
			  it('should not overwrite defaultValues with defaultValue', () => \{
			    const App = () => \{
			      const \{ control \} = useForm(\{
			        defaultValues: \{
			          test: 'bill',
			        \},
			      \});
			
			      return (
			        <Controller
			          render=\{(\{ field \}) => \{
			            return <input \{...field\} />;
			          \}\}
			          control=\{control\}
			          name=\{'test'\}
			          defaultValue=\{'luo'\}
			        />
			      );
			    \};
			
			    render(<App />);
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
			      'bill',
			    );
			  \});
			
			  it('should be able to update input value without ref', () => \{
			    const App = () => \{
			      const \{ control, setValue \} = useForm();
			      const \{ field \} = useController(\{
			        control,
			        name: 'test',
			        defaultValue: '',
			      \});
			
			      return (
			        <div>
			          <input value=\{field.value\} onChange=\{field.onChange\} />
			          <button
			            onClick=\{() => \{
			              setValue('test', 'data');
			            \}\}
			          >
			            setValue
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'data',
			    );
			  \});
			
			  it('should be able to setValue after reset', async () => \{
			    let renderCount = 0;
			
			    type FormValues = \{
			      name: string;
			    \};
			
			    const Input = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      renderCount++;
			      const \{ field \} = useController(\{
			        name: 'name',
			        control,
			        defaultValue: '',
			      \});
			
			      return <input \{...field\} />;
			    \};
			
			    function App() \{
			      const \{ reset, control, setValue \} = useForm<FormValues>();
			
			      React.useEffect(() => \{
			        reset(\{ name: 'initial' \});
			      \}, [reset]);
			
			      return (
			        <div>
			          <Input control=\{control\} />
			          <button type="button" onClick=\{() => setValue('name', 'test', \{\})\}>
			            setValue
			          </button>
			        </div>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'test',
			    );
			    expect(renderCount).toEqual(3);
			  \});
			
			  it('should invoke native validation with Controller', async () => \{
			    const setCustomValidity = jest.fn();
			    const reportValidity = jest.fn();
			    const focus = jest.fn();
			    const message = 'This is required';
			
			    type FormValues = \{
			      test: string;
			    \};
			
			    function Input(\{ control \}: \{ control: Control<FormValues> \}) \{
			      const \{ field \} = useController(\{
			        control,
			        rules: \{ required: message \},
			        name: 'test',
			      \});
			
			      return (
			        <div>
			          <input
			            \{...field\}
			            ref=\{() => \{
			              field.ref(\{
			                focus,
			                setCustomValidity,
			                reportValidity,
			              \});
			            \}\}
			          />
			        </div>
			      );
			    \}
			
			    function App() \{
			      const \{ handleSubmit, control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: '',
			        \},
			        mode: 'onChange',
			        shouldUseNativeValidation: true,
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <Input control=\{control\} />
			          <input type="submit" />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => expect(focus).toBeCalled());
			    expect(setCustomValidity).toBeCalledWith(message);
			    expect(reportValidity).toBeCalled();
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'bill',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => expect(setCustomValidity).toBeCalledTimes(3));
			    expect(reportValidity).toBeCalledTimes(3);
			    expect(focus).toBeCalledTimes(2);
			  \});
			
			  it('should update with inline defaultValue', async () => \{
			    const onSubmit = jest.fn();
			    const App = () => \{
			      const \{ control, handleSubmit \} = useForm();
			      useController(\{ control, defaultValue: 'test', name: 'test' \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit((data) => \{
			            onSubmit(data);
			          \})\}
			        >
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() =>
			      expect(onSubmit).toBeCalledWith(\{
			        test: 'test',
			      \}),
			    );
			  \});
			
			  it('should return defaultValues when component is not yet mounted', async () => \{
			    const defaultValues = \{
			      test: \{
			        deep: [
			          \{
			            test: '0',
			            test1: '1',
			          \},
			        ],
			      \},
			    \};
			
			    const App = () => \{
			      const \{ control, getValues \} = useForm<\{
			        test: \{
			          deep: \{ test: string; test1: string \}[];
			        \};
			      \}>(\{
			        defaultValues,
			      \});
			
			      const \{ field \} = useController(\{
			        control,
			        name: 'test.deep.0.test',
			      \});
			
			      return (
			        <div>
			          <input \{...field\} />
			          <p>\{JSON.stringify(getValues())\}</p>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    expect(true).toEqual(true);
			
			    expect(
			      await screen.findByText('\{"test":\{"deep":[\{"test":"0","test1":"1"\}]\}\}'),
			    ).toBeVisible();
			  \});
			
			  it('should trigger extra re-render and update latest value when setValue called during mount', async () => \{
			    const Child = () => \{
			      const \{ setValue \} = useFormContext();
			      const \{
			        field: \{ value \},
			      \} = useController(\{
			        name: 'content',
			      \});
			
			      React.useEffect(() => \{
			        setValue('content', 'expected value');
			      \}, [setValue]);
			
			      return <p>\{value\}</p>;
			    \};
			
			    function App() \{
			      const methods = useForm(\{
			        defaultValues: \{
			          content: 'default',
			        \},
			      \});
			
			      return (
			        <FormProvider \{...methods\}>
			          <form>
			            <Child />
			            <input type="submit" />
			          </form>
			        </FormProvider>
			      );
			    \}
			
			    render(<App />);
			
			    expect(await screen.findByText('expected value')).toBeVisible();
			  \});
			
			  it('should remount with input with current formValue', () => \{
			    let data: unknown;
			
			    function Input<T extends FieldValues>(\{
			      control,
			      name,
			    \}: \{
			      control: Control<T>;
			      name: FieldPath<T>;
			    \}) \{
			      const \{
			        field: \{ value \},
			      \} = useController(\{
			        control,
			        name,
			        shouldUnregister: true,
			      \});
			
			      data = value;
			
			      return null;
			    \}
			
			    const App = () => \{
			      const \{ control \} = useForm<\{
			        test: string;
			      \}>(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			      \});
			      const [toggle, setToggle] = React.useState(true);
			
			      return (
			        <div>
			          \{toggle && <Input control=\{control\} name=\{'test'\} />\}
			          <button onClick=\{() => setToggle(!toggle)\}>toggle</button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    expect(data).toEqual('test');
			
			    fireEvent.click(screen.getByRole('button'));
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(data).toBeUndefined();
			  \});
			
			  it('should always get the latest value for onBlur event', async () => \{
			    const watchResults: unknown[] = [];
			
			    const App = () => \{
			      const \{ control, watch \} = useForm();
			      const \{ field \} = useController(\{
			        control,
			        name: 'test',
			        defaultValue: '',
			      \});
			
			      watchResults.push(watch());
			
			      return (
			        <button
			          onClick=\{() => \{
			            field.onChange('updated value');
			            field.onBlur();
			          \}\}
			        >
			          test
			        </button>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(watchResults).toEqual([
			      \{\},
			      \{
			        test: 'updated value',
			      \},
			    ]);
			  \});
			
			  it('should focus and select the input text', () => \{
			    const select = jest.fn();
			    const focus = jest.fn();
			
			    const App = () => \{
			      const \{ control, setFocus \} = useForm(\{
			        defaultValues: \{
			          test: 'data',
			        \},
			      \});
			      const \{ field \} = useController(\{
			        control,
			        name: 'test',
			      \});
			
			      field.ref(\{
			        select,
			        focus,
			      \});
			
			      React.useEffect(() => \{
			        setFocus('test', \{ shouldSelect: true \});
			      \}, [setFocus]);
			
			      return null;
			    \};
			
			    render(<App />);
			
			    expect(select).toBeCalled();
			    expect(focus).toBeCalled();
			  \});
			
			  it('should update isValid correctly with strict mode', async () => \{
			    const App = () => \{
			      const form = useForm(\{
			        mode: 'onChange',
			        defaultValues: \{
			          name: '',
			        \},
			      \});
			      const \{ isValid \} = form.formState;
			
			      return (
			        <React.StrictMode>
			          <FormProvider \{...form\}>
			            <Controller
			              render=\{(\{ field \}) => (
			                <input value=\{field.value\} onChange=\{field.onChange\} />
			              )\}
			              name="name"
			              rules=\{\{
			                required: true,
			              \}\}
			            />
			            <p>\{isValid ? 'valid' : 'not'\}</p>
			          </FormProvider>
			        </React.StrictMode>
			      );
			    \};
			
			    render(<App />);
			
			    await waitFor(() => \{
			      screen.getByText('not');
			    \});
			  \});
			
			  it('should restore defaultValues with react strict mode double useEffect', () => \{
			    function Form() \{
			      return (
			        <Controller
			          name="lastName"
			          shouldUnregister=\{true\}
			          render=\{(\{ field \}) => <input \{...field\} />\}
			        />
			      );
			    \}
			
			    function App() \{
			      const methods = useForm(\{
			        defaultValues: \{
			          lastName: 'luo',
			        \},
			      \});
			      const \{
			        formState: \{ dirtyFields \},
			      \} = methods;
			
			      return (
			        <React.StrictMode>
			          <FormProvider \{...methods\}>
			            <form>
			              <Form />
			              \{dirtyFields.lastName ? 'dirty' : 'pristine'\}
			            </form>
			          </FormProvider>
			        </React.StrictMode>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'luo1',
			      \},
			    \});
			
			    screen.getByText('dirty');
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'luo',
			      \},
			    \});
			
			    screen.getByText('pristine');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useController.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(18)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\append.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Control, FieldPath \} from '../../types';
			import \{ useController \} from '../../useController';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			let i = 0;
			
			jest.mock('../../logic/generateId', () => () => String(i++));
			
			describe('append', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it('should append dirtyFields fields correctly', async () => \{
			    let dirtyInputs = \{\};
			    const Component = () => \{
			      const \{
			        register,
			        control,
			        formState: \{ dirtyFields \},
			      \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [
			            \{ value: 'plz change' \},
			            \{ value: 'dont change' \},
			            \{ value: 'dont change' \},
			          ],
			        \},
			      \});
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      dirtyInputs = dirtyFields;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          \{dirtyFields.test?.length && 'dirty'\}
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getAllByRole('textbox')[0], \{
			      target: \{ value: 'test' \},
			    \});
			    fireEvent.blur(screen.getAllByRole('textbox')[0]);
			
			    expect(await screen.findByText('dirty')).toBeVisible();
			
			    expect(dirtyInputs).toEqual(\{
			      test: [\{ value: true \}],
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(dirtyInputs).toEqual(\{
			      test: [
			        \{ value: true \},
			        \{ value: false \},
			        \{ value: false \},
			        \{ value: true \},
			      ],
			    \});
			  \});
			
			  it('should append data into the fields', () => \{
			    let currentFields: unknown[] = [];
			    const Component = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ test: string \}[];
			      \}>();
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      currentFields = fields;
			
			      return (
			        <form>
			          \{fields.map((field, index) => \{
			            return (
			              <input
			                key=\{field.id\}
			                \{...register(\`test.\$\{index\}.test\` as const)\}
			              />
			            );
			          \})\}
			          <button type=\{'button'\} onClick=\{() => append(\{ test: 'test' \})\}>
			            append
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              append([\{ test: 'test-batch' \}, \{ test: 'test-batch1' \}])
			            \}
			          >
			            appendBatch
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    expect(currentFields).toEqual([\{ id: '0', test: 'test' \}]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    expect(currentFields).toEqual([
			      \{ id: '0', test: 'test' \},
			      \{ id: '2', test: 'test' \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'appendBatch' \}));
			
			    expect(currentFields).toEqual([
			      \{ id: '0', test: 'test' \},
			      \{ id: '2', test: 'test' \},
			      \{ id: '5', test: 'test-batch' \},
			      \{ id: '6', test: 'test-batch1' \},
			    ]);
			  \});
			
			  it.each(['isDirty', 'dirtyFields'])(
			    'should be dirtyFields when value is appended with %s',
			    () => \{
			      let isDirtyValue;
			      let dirtyValue;
			
			      const Component = () => \{
			        const \{
			          register,
			          control,
			          formState: \{ isDirty, dirtyFields \},
			        \} = useForm<\{
			          test: \{ test: string \}[];
			        \}>();
			        const \{ fields, append \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        isDirtyValue = isDirty;
			        dirtyValue = dirtyFields;
			
			        return (
			          <form>
			            \{fields.map((field, index) => \{
			              return (
			                <input
			                  key=\{field.id\}
			                  \{...register(\`test.\$\{index\}.test\` as const)\}
			                />
			              );
			            \})\}
			            <button type=\{'button'\} onClick=\{() => append(\{ test: 'test' \})\}>
			              append
			            </button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      expect(isDirtyValue).toBeTruthy();
			      expect(dirtyValue).toEqual(\{
			        test: [\{ test: true \}, \{ test: true \}, \{ test: true \}],
			      \});
			    \},
			  );
			
			  it('should trigger reRender when user is watching the all field array', () => \{
			    const watched: unknown[] = [];
			    const Component = () => \{
			      const \{ register, watch, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>();
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      watched.push(watch());
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    expect(watched).toEqual([
			      \{\},
			      \{ test: [] \},
			      \{ test: [\{ value: '' \}] \},
			      \{ test: [\{ value: '' \}] \},
			    ]);
			  \});
			
			  it('should focus if shouldFocus is true', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{ test: [\{ value: '1' \}, \{ value: '2' \}] \},
			      \});
			      const \{ fields, append \} = useFieldArray(\{ control, name: 'test' \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '3' \})\}>
			            append
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    expect(inputs).toHaveLength(3);
			
			    expect(document.activeElement).toEqual(inputs[2]);
			  \});
			
			  it('should not focus if shouldFocus is false', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{ test: [\{ value: '1' \}, \{ value: '2' \}] \},
			      \});
			      const \{ fields, append \} = useFieldArray(\{ control, name: 'test' \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => append(\{ value: '3' \}, \{ shouldFocus: false \})\}
			          >
			            append
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    expect(inputs).toHaveLength(3);
			    expect(document.activeElement).toEqual(document.body);
			  \});
			
			  it('should return watched value with watch API', async () => \{
			    const renderedItems: any = [];
			    const Component = () => \{
			      const \{ watch, register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>();
			      const \{ fields, append \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			      const watched = watch('test');
			      renderedItems.push(watched);
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			            </div>
			          ))\}
			          <button onClick=\{() => append(\{ value: 'test' \})\}>append</button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    await waitFor(() =>
			      expect(renderedItems).toEqual([
			        undefined,
			        [],
			        [\{ value: 'test' \}],
			        [\{ value: 'test' \}],
			      ]),
			    );
			  \});
			
			  it('should append nested field value without its reference', () => \{
			    type FormValues = \{
			      test: \{ name: \{ deep: string \} \}[];
			    \};
			
			    function Input(\{
			      name,
			      control,
			    \}: \{
			      name: FieldPath<FormValues>;
			      control: Control<FormValues>;
			    \}) \{
			      const \{ field \} = useController(\{
			        name: name as 'test.0.name.deep',
			        control,
			      \});
			
			      return <input type="text" \{...field\} />;
			    \}
			
			    function FieldArray(\{
			      control,
			      name,
			      itemDefaultValue,
			    \}: \{
			      control: Control<FormValues>;
			      name: FieldPath<FormValues>;
			      itemDefaultValue: \{ name: \{ deep: string \} \};
			    \}) \{
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: name as 'test',
			      \});
			
			      return (
			        <>
			          \{fields.map((item, index) => (
			            <Input
			              key=\{item.id\}
			              name=\{\`test.\$\{index\}.name.deep\`\}
			              control=\{control\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(itemDefaultValue)\}>
			            Append
			          </button>
			        </>
			      );
			    \}
			
			    function App() \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [],
			        \},
			      \});
			
			      return (
			        <form>
			          <FieldArray
			            name="test"
			            control=\{control\}
			            itemDefaultValue=\{\{ name: \{ deep: '' \} \}\}
			          />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: '1234' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('');
			  \});
			
			  describe('with resolver', () => \{
			    it('should invoke resolver when formState.isValid true', async () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \});
			        const \{ append \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, append \};
			      \});
			
			      result.current.formState.isValid;
			
			      await act(async () => \{
			        result.current.append(\{ value: '1' \});
			      \});
			
			      expect(resolver).toBeCalledWith(
			        \{
			          test: [\{ value: '1' \}],
			        \},
			        undefined,
			        \{
			          criteriaMode: undefined,
			          fields: \{\},
			          names: [],
			        \},
			      );
			    \});
			
			    it('should not invoke resolver when formState.isValid false', () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \});
			        const \{ append \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, append \};
			      \});
			
			      act(() => \{
			        result.current.append(\{ value: '1' \});
			      \});
			
			      expect(resolver).toBeCalled();
			    \});
			  \});
			
			  it('should not omit keyName when provided', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [\{ id: '1234', test: 'data' \}],
			        \},
			      \});
			
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              append(\{
			                id: 'whatever',
			                test: '1234',
			              \});
			            \}\}
			          >
			            append
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText(
			        '\{"test":[\{"id":"1234","test":"data"\},\{"id":"whatever","test":"1234"\}]\}',
			      ),
			    ).toBeVisible();
			  \});
			
			  it('should not omit keyName when provided and defaultValue is empty', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>();
			
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              append(\{
			                id: 'whatever',
			                test: '1234',
			              \});
			            \}\}
			          >
			            append
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"whatever","test":"1234"\}]\}'),
			    ).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\append.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\focus.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			describe('useFieldArray focus', () => \{
			  it('should not focus any element when shouldFocus is set to false', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, prepend, append, insert \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => prepend(\{ value: '' \}, \{ shouldFocus: false \})\}
			          >
			            prepend
			          </button>
			          <button
			            type="button"
			            onClick=\{() => append(\{ value: '' \}, \{ shouldFocus: false \})\}
			          >
			            append
			          </button>
			          <button
			            type="button"
			            onClick=\{() => insert(1, \{ value: '' \}, \{ shouldFocus: false \})\}
			          >
			            insert
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert/i \}));
			
			    expect(document.activeElement).toEqual(document.body);
			  \});
			
			  it('should focus on the precise input index', () => \{
			    function App() \{
			      const \{ register, handleSubmit, control \} = useForm(\{
			        defaultValues: \{
			          test: [
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			            \{ value: '0' \},
			          ],
			        \},
			      \});
			      const \{ fields, insert \} = useFieldArray(\{ control, name: 'test' \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((field, index) => (
			            <div key=\{field.id\}>
			              <input
			                \{...register(\`test.\$\{index\}.value\`)\}
			                defaultValue=\{field.value\}
			              />
			              <button onClick=\{() => insert(1, \{ value: '' \})\}>insert</button>
			            </div>
			          ))\}
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: /insert/i \})[0]);
			
			    expect(document.activeElement).toEqual(screen.getAllByRole('textbox')[1]);
			  \});
			
			  it('should focus correct field array by focus index', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, prepend, append, insert \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => prepend(\{ value: '' \}, \{ focusIndex: 1 \})\}
			          >
			            prepend
			          </button>
			          <button
			            type="button"
			            onClick=\{() => append(\{ value: '' \}, \{ focusIndex: 0 \})\}
			          >
			            append
			          </button>
			          <button
			            type="button"
			            onClick=\{() => insert(1, \{ value: '' \}, \{ focusIndex: 0 \})\}
			          >
			            insert
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    expect(document.activeElement).toEqual(screen.getAllByRole('textbox')[0]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    expect(document.activeElement).toEqual(screen.getAllByRole('textbox')[1]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert/i \}));
			
			    expect(document.activeElement).toEqual(screen.getAllByRole('textbox')[0]);
			  \});
			
			  it('should focus correct field array by focus name', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, prepend, append, insert \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() =>
			              prepend(\{ value: '' \}, \{ focusName: 'test.1.value' \})
			            \}
			          >
			            prepend
			          </button>
			          <button
			            type="button"
			            onClick=\{() => append(\{ value: '' \}, \{ focusName: 'test.0.value' \})\}
			          >
			            append
			          </button>
			          <button
			            type="button"
			            onClick=\{() =>
			              insert(1, \{ value: '' \}, \{ focusName: 'test.0.value' \})
			            \}
			          >
			            insert
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    expect(document.activeElement).toEqual(screen.getAllByRole('textbox')[0]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    expect(document.activeElement).toEqual(screen.getAllByRole('textbox')[1]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert/i \}));
			
			    expect(document.activeElement).toEqual(screen.getAllByRole('textbox')[0]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\focus.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\insert.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  act as actComponent,
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			\} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Control, FieldPath \} from '../../types';
			import \{ useController \} from '../../useController';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			jest.useFakeTimers();
			
			let i = 0;
			
			jest.mock('../../logic/generateId', () => () => String(i++));
			
			describe('insert', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it('should insert data at index with single value', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ test: '1' \}, \{ test: '2' \}],
			        \},
			      \});
			      const \{ fields, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      return \{ fields, insert \};
			    \});
			
			    act(() => \{
			      result.current.insert(1, \{ test: '3' \});
			    \});
			
			    expect(result.current.fields).toEqual([
			      \{ id: '0', test: '1' \},
			      \{ id: '2', test: '3' \},
			      \{ id: '1', test: '2' \},
			    ]);
			  \});
			
			  it('should insert data at index with array value', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ test: '1' \}, \{ test: '2' \}],
			        \},
			      \});
			      const \{ fields, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      return \{ fields, insert \};
			    \});
			
			    act(() => \{
			      result.current.insert(1, [\{ test: '3' \}, \{ test: '4' \}]);
			    \});
			
			    expect(result.current.fields).toEqual([
			      \{ id: '0', test: '1' \},
			      \{ id: '2', test: '3' \},
			      \{ id: '3', test: '4' \},
			      \{ id: '1', test: '2' \},
			    ]);
			  \});
			
			  it.each(['isDirty', 'dirtyFields'])(
			    'should insert data to formState.%s at index with single value',
			    () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm<\{
			          test: \{ value: string; value1: string \}[];
			        \}>(\{
			          defaultValues: \{ test: [\{ value: '1' \}] \},
			        \});
			        const \{ fields, append, insert \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return \{ formState, fields, append, insert \};
			      \});
			
			      result.current.formState.isDirty;
			      result.current.formState.dirtyFields;
			
			      act(() => \{
			        result.current.append(\{ value: '2', value1: '' \});
			      \});
			
			      act(() => \{
			        result.current.insert(1, \{ value1: '3', value: '' \});
			      \});
			
			      expect(result.current.formState.isDirty).toBeTruthy();
			      expect(result.current.formState.dirtyFields).toEqual(\{
			        test: [
			          \{ value: false \},
			          \{ value1: true, value: true \},
			          \{ value: true, value1: true \},
			        ],
			      \});
			    \},
			  );
			
			  it.each(['isDirty', 'dirtyFields'])(
			    'should insert data to formState.%s at index with array value',
			    () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm<\{
			          test: \{ value1: string; value2: string; value: string \}[];
			        \}>(\{
			          defaultValues: \{ test: [\{ value: '1' \}] \},
			        \});
			        const \{ fields, append, insert \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return \{ formState, fields, append, insert \};
			      \});
			
			      result.current.formState.isDirty;
			      result.current.formState.dirtyFields;
			
			      act(() => \{
			        result.current.append(\{ value: '2', value1: '', value2: '' \});
			      \});
			
			      act(() => \{
			        result.current.insert(1, [
			          \{ value1: '3', value: '', value2: '' \},
			          \{ value2: '4', value: '', value1: '' \},
			        ]);
			      \});
			
			      expect(result.current.formState.isDirty).toBeTruthy();
			      expect(result.current.formState.dirtyFields).toEqual(\{
			        test: [
			          \{ value: false \},
			          \{ value1: true, value: true, value2: true \},
			          \{ value2: true, value: true, value1: true \},
			          \{ value: true, value1: true, value2: true \},
			        ],
			      \});
			    \},
			  );
			
			  it('should insert touched fields with single value', () => \{
			    let touched: any;
			    const Component = () => \{
			      const \{ register, formState, control \} = useForm(\{
			        defaultValues: \{ test: [\{ value: '1' \}, \{ value: '2' \}] \},
			      \});
			      const \{ fields, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      touched = formState.touchedFields;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => insert(1, \{ value: \`\$\{fields.length\}\` \})\}
			          >
			            insert
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.blur(screen.getAllByRole('textbox')[0]);
			    fireEvent.blur(screen.getAllByRole('textbox')[1]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert/i \}));
			
			    expect(touched).toEqual(\{
			      test: [\{ value: true \}, undefined, \{ value: true \}],
			    \});
			  \});
			
			  it('should insert touched fields with array value', () => \{
			    let touched: any;
			    const Component = () => \{
			      const \{ register, formState, control \} = useForm(\{
			        defaultValues: \{ test: [\{ value: '1' \}, \{ value: '2' \}] \},
			      \});
			      const \{ fields, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      touched = formState.touchedFields;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() =>
			              insert(1, [
			                \{ value: \`\$\{fields.length\}\` \},
			                \{ value: \`\$\{fields.length + 1\}\` \},
			              ])
			            \}
			          >
			            insert array
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.blur(screen.getAllByRole('textbox')[0]);
			    fireEvent.blur(screen.getAllByRole('textbox')[1]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert array/i \}));
			
			    expect(touched).toEqual(\{
			      test: [\{ value: true \}, undefined, undefined, \{ value: true \}],
			    \});
			  \});
			
			  it('should insert error with single value', async () => \{
			    let errors: any;
			    const Component = () => \{
			      const \{ register, handleSubmit, control, ...rest \} = useForm();
			      const \{ fields, append, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      errors = rest.formState.errors;
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.value\`, \{ required: true \})\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => insert(1, \{ value: '' \})\}>
			            insert
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert/i \}));
			
			    await waitFor(() => expect(errors.test[0]).toBeDefined());
			    expect(errors.test[1]).toBeUndefined();
			    expect(errors.test[2]).toBeDefined();
			  \});
			
			  it('should insert error with array value', async () => \{
			    let errors: any;
			    const Component = () => \{
			      const \{ register, handleSubmit, control, ...rest \} = useForm();
			      const \{ fields, append, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      errors = rest.formState.errors;
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.value\`, \{ required: true \})\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button
			            type="button"
			            onClick=\{() => insert(1, [\{ value: '' \}, \{ value: '' \}])\}
			          >
			            insert array
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert array/i \}));
			
			    await waitFor(() => expect(errors.test[0]).toBeDefined());
			    expect(errors.test[1]).toBeUndefined();
			    expect(errors.test[2]).toBeUndefined();
			    expect(errors.test[3]).toBeDefined();
			  \});
			
			  it('should focus if shouldFocus is true', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, insert \} = useFieldArray(\{ name: 'test', control \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => insert(1, \{ value: '' \})\}>
			            insert
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    expect(inputs).toHaveLength(3);
			    expect(document.activeElement).toEqual(inputs[1]);
			  \});
			
			  it('should not focus if shouldFocus is false', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, insert \} = useFieldArray(\{ name: 'test', control \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => insert(1, \{ value: '' \}, \{ shouldFocus: false \})\}
			          >
			            insert
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    expect(inputs).toHaveLength(3);
			    expect(document.activeElement).toEqual(document.body);
			  \});
			
			  it('should trigger reRender when user is watching the all field array', () => \{
			    const watched: any[] = [];
			    const Component = () => \{
			      const \{ register, watch, control \} = useForm<\{
			        test: \{
			          value: string;
			        \}[];
			      \}>();
			      const \{ fields, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      watched.push(watch());
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => insert(0, \{ value: '' \})\}>
			            insert
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'insert' \}));
			
			    expect(watched).toEqual([
			      \{\}, // first render
			      \{ test: [] \}, // render inside useEffect in useFieldArray
			      \{ test: [\{ value: '' \}] \}, // render inside insert method
			      \{ test: [\{ value: '' \}] \}, // render inside useEffect in useFieldArray
			    ]);
			  \});
			
			  it('should return watched value with watch API', async () => \{
			    const renderedItems: any = [];
			    const Component = () => \{
			      const \{ watch, register, control \} = useForm<\{
			        test: \{
			          value: string;
			        \}[];
			      \}>();
			      const \{ fields, append, insert \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			      const watched = watch('test');
			      const isInserted = React.useRef(false);
			      if (isInserted.current) \{
			        renderedItems.push(watched);
			      \}
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{\`\$\{field.id\}\`\}>
			              <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			            </div>
			          ))\}
			          <button onClick=\{() => append(\{ value: '' \})\}>append</button>
			          <button
			            onClick=\{() => \{
			              insert(1, \{ value: 'test' \});
			              isInserted.current = true;
			            \}\}
			          >
			            insert
			          </button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    fireEvent.change(inputs[0], \{
			      target: \{ name: 'test[0].value', value: '111' \},
			    \});
			    fireEvent.change(inputs[1], \{
			      target: \{ name: 'test[1].value', value: '222' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /insert/i \}));
			
			    expect(renderedItems).toEqual([
			      [\{ value: '111' \}, \{ value: 'test' \}, \{ value: '222' \}],
			      [\{ value: '111' \}, \{ value: 'test' \}, \{ value: '222' \}],
			    ]);
			  \});
			
			  it('should append nested field value without its reference', () => \{
			    type FormValues = \{
			      test: \{ name: \{ deep: string \} \}[];
			    \};
			
			    function Input(\{
			      name,
			      control,
			    \}: \{
			      name: FieldPath<FormValues>;
			      control: Control<FormValues>;
			    \}) \{
			      const \{ field \} = useController(\{
			        name: name as 'test.0.name.deep',
			        control,
			      \});
			
			      return <input type="text" \{...field\} />;
			    \}
			
			    function FieldArray(\{
			      control,
			      name,
			      itemDefaultValue,
			    \}: \{
			      control: Control<FormValues>;
			      name: FieldPath<FormValues>;
			      itemDefaultValue: \{ name: \{ deep: string \} \};
			    \}) \{
			      const \{ fields, insert \} = useFieldArray(\{
			        control,
			        name: name as 'test',
			      \});
			
			      return (
			        <>
			          \{fields.map((item, index) => (
			            <Input
			              key=\{item.id\}
			              name=\{\`test.\$\{index\}.name.deep\`\}
			              control=\{control\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => insert(0, itemDefaultValue)\}>
			            Append
			          </button>
			        </>
			      );
			    \}
			
			    function App() \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [],
			        \},
			      \});
			
			      return (
			        <form>
			          <FieldArray
			            name="test"
			            control=\{control\}
			            itemDefaultValue=\{\{ name: \{ deep: '' \} \}\}
			          />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: '1234' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('');
			  \});
			
			  describe('with resolver', () => \{
			    it('should invoke resolver when formState.isValid true', async () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \});
			        const \{ insert \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, insert \};
			      \});
			
			      result.current.formState.isValid;
			
			      await act(async () => \{
			        result.current.insert(0, \{ value: '1' \});
			      \});
			
			      expect(resolver).toBeCalledWith(
			        \{
			          test: [\{ value: '1' \}],
			        \},
			        undefined,
			        \{
			          criteriaMode: undefined,
			          fields: \{\},
			          names: [],
			        \},
			      );
			    \});
			
			    it('should not invoke resolver when formState.isValid false', () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \});
			        const \{ insert \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, insert \};
			      \});
			
			      act(() => \{
			        result.current.insert(0, \{ value: '1' \});
			      \});
			
			      expect(resolver).toBeCalled();
			    \});
			
			    it('should insert update fields during async submit', () => \{
			      type FormValues = \{
			        test: \{ name: string \}[];
			      \};
			
			      function App() \{
			        const \{ register, control \} = useForm<FormValues>();
			        const [value, setValue] = React.useState('');
			        const \{ fields, insert \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <div>
			            <form>
			              \{fields.map((field, index) => \{
			                return (
			                  <fieldset key=\{field.id\}>
			                    <input \{...register(\`test.\$\{index\}.name\`)\} />
			                  </fieldset>
			                );
			              \})\}
			            </form>
			
			            <form
			              onSubmit=\{(e) => \{
			                e.preventDefault();
			                const target = e.target as HTMLFormElement;
			
			                setTimeout(() => \{
			                  insert(0, \{
			                    name: value,
			                  \});
			                \}, 1000);
			
			                target.reset();
			              \}\}
			            >
			              <input
			                name="name"
			                data-testid="input"
			                value=\{value\}
			                onChange=\{(e) => setValue(e.target.value)\}
			              />
			              <button>submit</button>
			            </form>
			          </div>
			        );
			      \}
			
			      render(<App />);
			
			      fireEvent.change(screen.getByTestId('input'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      actComponent(() => \{
			        jest.advanceTimersByTime(1000);
			      \});
			
			      expect(
			        (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			      ).toEqual('test');
			
			      fireEvent.change(screen.getByTestId('input'), \{
			        target: \{
			          value: 'test1',
			        \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      actComponent(() => \{
			        jest.advanceTimersByTime(1000);
			      \});
			
			      expect(
			        (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			      ).toEqual('test1');
			    \});
			  \});
			
			  it('should not omit keyName when provided', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [\{ id: '1234', test: 'data' \}],
			        \},
			      \});
			
			      const \{ fields, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              insert(1, \{
			                id: 'whatever',
			                test: '1234',
			              \});
			            \}\}
			          >
			            insert
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'insert' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText(
			        '\{"test":[\{"id":"1234","test":"data"\},\{"id":"whatever","test":"1234"\}]\}',
			      ),
			    ).toBeVisible();
			  \});
			
			  it('should not omit keyName when provided and defaultValue is empty', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>();
			
			      const \{ fields, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              insert(0, \{
			                id: 'whatever',
			                test: '1234',
			              \});
			            \}\}
			          >
			            insert
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'insert' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"whatever","test":"1234"\}]\}'),
			    ).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\insert.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(16)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\move.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			let i = 0;
			
			jest.mock('../../logic/generateId', () => () => String(i++));
			
			describe('move', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it.each(['isDirty', 'dirtyFields'])(
			    'should move dirtyFields into pointed position when formState.%s is defined',
			    () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          defaultValues: \{ test: [\{ value: '1' \}] \},
			        \});
			        const methods = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			        return \{
			          formState,
			          ...methods,
			        \};
			      \});
			
			      result.current.formState.isDirty;
			      result.current.formState.dirtyFields;
			
			      act(() => \{
			        result.current.append(\{ value: '2' \});
			      \});
			
			      act(() => \{
			        result.current.append(\{ value: '3' \});
			      \});
			
			      act(() => \{
			        result.current.move(0, 1);
			      \});
			
			      expect(result.current.formState.isDirty).toBeTruthy();
			      expect(result.current.formState.dirtyFields).toEqual(\{
			        test: [\{ value: true \}, \{ value: true \}, \{ value: true \}],
			      \});
			    \},
			  );
			
			  it('should move errors', async () => \{
			    let errors: any;
			    const Component = () => \{
			      const \{ register, handleSubmit, control, ...rest \} = useForm(\{
			        defaultValues: \{ test: [\{ value: 'test' \}] \},
			      \});
			      const \{ fields, append, move \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      errors = rest.formState.errors;
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.value\` as const, \{ required: true \})\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => move(0, 1)\}>
			            move
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			
			    await waitFor(() => expect(errors.test[0]).toBeUndefined());
			    expect(errors.test[1]).toBeDefined();
			
			    fireEvent.click(screen.getByRole('button', \{ name: /move/i \}));
			
			    expect(errors.test[0]).toBeDefined();
			    expect(errors.test[1]).toBeUndefined();
			  \});
			
			  it('should move touched fields', async () => \{
			    let touched: any;
			    const Component = () => \{
			      const \{ register, formState, control \} = useForm(\{
			        defaultValues: \{ test: [\{ value: 'test' \}] \},
			      \});
			      const \{ fields, append, move \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      touched = formState.touchedFields;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => move(0, 1)\}>
			            move
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.blur(screen.getAllByRole('textbox')[0]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /move/i \}));
			
			    expect(touched).toEqual(\{
			      test: [undefined, \{ value: true \}],
			    \});
			  \});
			
			  it('should trigger reRender when user is watching the all field array', () => \{
			    const watched: any[] = [];
			    const Component = () => \{
			      const \{ register, watch, control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, move \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      watched.push(watch());
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => move(0, 1)\}>
			            move
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'move' \}));
			
			    expect(watched).toEqual([
			      \{ test: [\{ value: '1' \}, \{ value: '2' \}] \}, // first render
			      \{ test: [\{ value: '1' \}, \{ value: '2' \}] \}, // render inside useEffect in useFieldArray
			      \{ test: [\{ value: '2' \}, \{ value: '1' \}] \}, // render inside move method
			      \{ test: [\{ value: '2' \}, \{ value: '1' \}] \}, // render inside useEffect in useFieldArray
			    ]);
			  \});
			
			  it('should populate all fields with default values', () => \{
			    let getValues: any;
			    const Component = () => \{
			      const \{
			        register,
			        control,
			        getValues: tempGetValues,
			      \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      getValues = tempGetValues;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(getValues()).toEqual(\{ test: [\{ value: '1' \}, \{ value: '2' \}] \});
			  \});
			
			  it('should return watched value with watch API', async () => \{
			    const renderedItems: any = [];
			    const Component = () => \{
			      const \{ watch, register, control \} = useForm<\{
			        test: \{
			          value: string;
			        \}[];
			      \}>();
			      const \{ fields, append, move \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			      const watched = watch('test');
			      const isMoved = React.useRef(false);
			      if (isMoved.current) \{
			        renderedItems.push(watched);
			      \}
			
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{\`\$\{field.id\}\`\}>
			              <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			            </div>
			          ))\}
			          <button onClick=\{() => append(\{ value: '' \})\}>append</button>
			          <button
			            onClick=\{() => \{
			              move(0, 1);
			              isMoved.current = true;
			            \}\}
			          >
			            move
			          </button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    fireEvent.change(inputs[0], \{
			      target: \{ name: 'test[0].value', value: '111' \},
			    \});
			    fireEvent.change(inputs[1], \{
			      target: \{ name: 'test[1].value', value: '222' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /move/i \}));
			
			    await waitFor(() =>
			      expect(renderedItems).toEqual([
			        [\{ value: '222' \}, \{ value: '111' \}],
			        [\{ value: '222' \}, \{ value: '111' \}],
			      ]),
			    );
			  \});
			
			  describe('with resolver', () => \{
			    it('should invoke resolver when formState.isValid true', async () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			          defaultValues: \{
			            test: [\{ value: '1' \}, \{ value: '2' \}],
			          \},
			        \});
			        const \{ move \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, move \};
			      \});
			
			      result.current.formState.isValid;
			
			      await act(async () => \{
			        result.current.move(0, 1);
			      \});
			
			      expect(resolver).toBeCalledWith(
			        \{
			          test: [\{ value: '2' \}, \{ value: '1' \}],
			        \},
			        undefined,
			        \{
			          criteriaMode: undefined,
			          fields: \{\},
			          names: [],
			        \},
			      );
			    \});
			
			    it('should not invoke resolver when formState.isValid false', () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			          defaultValues: \{
			            test: [\{ value: '1' \}, \{ value: '2' \}],
			          \},
			        \});
			        const \{ move \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, move \};
			      \});
			
			      act(() => \{
			        result.current.move(0, 1);
			      \});
			
			      expect(resolver).toBeCalled();
			    \});
			  \});
			
			  it('should not omit keyName when provided', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [
			            \{ id: '1234', test: 'data' \},
			            \{ id: '4567', test: 'data1' \},
			          ],
			        \},
			      \});
			
			      const \{ fields, move \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              move(0, 1);
			            \}\}
			          >
			            move
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'move' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText(
			        '\{"test":[\{"id":"4567","test":"data1"\},\{"id":"1234","test":"data"\}]\}',
			      ),
			    ).toBeVisible();
			  \});
			
			  it('should not omit keyName when provided and defaultValue is empty', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			    let k = 0;
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>();
			
			      const \{ fields, append, move \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              move(0, 1);
			            \}\}
			          >
			            move
			          </button>
			
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              append(\{
			                id: 'whatever' + k,
			                test: '1234' + k,
			              \});
			              k = 1;
			            \}\}
			          >
			            append
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'move' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText(
			        '\{"test":[\{"id":"whatever1","test":"12341"\},\{"id":"whatever0","test":"12340"\}]\}',
			      ),
			    ).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\move.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\prepend.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Control, FieldPath \} from '../../types';
			import \{ useController \} from '../../useController';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			let i = 0;
			
			jest.mock('../../logic/generateId', () => () => String(i++));
			
			describe('prepend', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it('should pre-append data into the fields', async () => \{
			    let currentFields: any = [];
			
			    const Component = () => \{
			      const \{ control, register \} = useForm<\{
			        test: \{
			          test: string;
			        \}[];
			      \}>();
			      const \{ fields, prepend \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      currentFields = fields;
			
			      return (
			        <form>
			          \{fields.map((field, index) => (
			            <div key=\{field.id\}>
			              <input \{...register(\`test.\$\{index\}.test\` as const)\} />
			            </div>
			          ))\}
			          <button type=\{'button'\} onClick=\{() => prepend(\{ test: 'test' \})\}>
			            prepend
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              prepend([\{ test: 'test-batch' \}, \{ test: 'test-batch1' \}])
			            \}
			          >
			            prependBatch
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'prepend' \}));
			
			    expect(currentFields).toEqual([\{ id: '0', test: 'test' \}]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'prepend' \}));
			
			    expect(currentFields).toEqual([
			      \{ id: '2', test: 'test' \},
			      \{ id: '0', test: 'test' \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'prependBatch' \}));
			
			    expect(currentFields).toEqual([
			      \{ id: '5', test: 'test-batch' \},
			      \{ id: '6', test: 'test-batch1' \},
			      \{ id: '2', test: 'test' \},
			      \{ id: '0', test: 'test' \},
			    ]);
			  \});
			
			  it.each(['isDirty', 'dirtyFields'])(
			    'should be dirtyFields when value is prepended with %s',
			    () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ register, formState, control \} = useForm();
			        const \{ fields, prepend \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return \{ register, formState, fields, prepend \};
			      \});
			
			      result.current.formState.isDirty;
			      result.current.formState.dirtyFields;
			
			      act(() => \{
			        result.current.prepend(\{ value: 'test' \});
			      \});
			
			      act(() => \{
			        result.current.prepend(\{ value: 'test1' \});
			      \});
			
			      act(() => \{
			        result.current.prepend(\{ value: 'test2' \});
			      \});
			
			      expect(result.current.formState.isDirty).toBeTruthy();
			      expect(result.current.formState.dirtyFields).toEqual(\{
			        test: [\{ value: true \}, \{ value: true \}, \{ value: true \}],
			      \});
			    \},
			  );
			
			  it('should set prepended values to formState.touchedFields', () => \{
			    let touched: any;
			
			    const Component = () => \{
			      const \{ register, formState, control \} = useForm();
			      const \{ fields, prepend \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      touched = formState.touchedFields;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\`)\} />
			          ))\}
			          <button type="button" onClick=\{() => prepend(\{ value: \`test\$\{1\}\` \})\}>
			            prepend
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    fireEvent.blur(screen.getAllByRole('textbox')[0]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    expect(touched).toEqual(\{
			      test: [undefined, \{ value: true \}, \{ value: true \}],
			    \});
			  \});
			
			  it('should prepend error', async () => \{
			    let errors: any;
			    const Component = () => \{
			      const \{
			        register,
			        formState: \{ errors: tempErrors \},
			        handleSubmit,
			        control,
			      \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>();
			      const \{ fields, prepend \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      errors = tempErrors;
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.value\` as const, \{ required: true \})\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => prepend(\{ value: '' \})\}>
			            prepend
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    expect(errors.test).toBeUndefined();
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			
			    await waitFor(() => \{
			      expect(errors.test).toHaveLength(1);
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    await waitFor(() => \{
			      expect(errors.test).toHaveLength(2);
			    \});
			  \});
			
			  it('should trigger reRender when user is watching the all field array', () => \{
			    const watched: any[] = [];
			    const Component = () => \{
			      const \{ register, watch, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>();
			      const \{ fields, prepend \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      watched.push(watch());
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => prepend(\{ value: '' \})\}>
			            prepend
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'prepend' \}));
			
			    expect(watched).toEqual([
			      \{\}, // first render
			      \{ test: [] \}, // render inside useEffect in useFieldArray
			      \{ test: [\{ value: '' \}] \}, // render inside prepend method
			      \{ test: [\{ value: '' \}] \}, // render inside useEffect in useFieldArray
			    ]);
			  \});
			
			  it('should return watched value with watch API', async () => \{
			    const renderedItems: any = [];
			    const Component = () => \{
			      const \{ watch, register, control \} = useForm<\{
			        test: \{
			          value: string;
			        \}[];
			      \}>();
			      const \{ fields, append, prepend \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			      const watched = watch('test');
			      const isPrepended = React.useRef(false);
			      if (isPrepended.current) \{
			        renderedItems.push(watched);
			      \}
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{\`\$\{field.id\}\`\}>
			              <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			            </div>
			          ))\}
			          <button onClick=\{() => append(\{ value: '' \})\}>append</button>
			          <button
			            onClick=\{() => \{
			              prepend(\{ value: 'test' \});
			              isPrepended.current = true;
			            \}\}
			          >
			            prepend
			          </button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    fireEvent.input(inputs[0], \{
			      target: \{ name: 'test[0].value', value: '111' \},
			    \});
			    fireEvent.input(inputs[1], \{
			      target: \{ name: 'test[1].value', value: '222' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    await waitFor(() =>
			      expect(renderedItems).toEqual([
			        [\{ value: 'test' \}, \{ value: '111' \}, \{ value: '222' \}],
			        [\{ value: 'test' \}, \{ value: '111' \}, \{ value: '222' \}],
			      ]),
			    );
			  \});
			
			  it('should focus if shouldFocus is true', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, prepend \} = useFieldArray(\{ name: 'test', control \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => prepend(\{ value: '' \})\}>
			            prepend
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    expect(inputs).toHaveLength(3);
			    expect(document.activeElement).toEqual(inputs[0]);
			  \});
			
			  it('should not focus if shouldFocus is false', () => \{
			    const Component = () => \{
			      const \{ register, control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, prepend \} = useFieldArray(\{ name: 'test', control \});
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => prepend(\{ value: '' \}, \{ shouldFocus: false \})\}
			          >
			            prepend
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			    const inputs = screen.getAllByRole('textbox');
			
			    expect(inputs).toHaveLength(3);
			    expect(document.activeElement).toEqual(document.body);
			  \});
			
			  it('should append nested field value without its reference', () => \{
			    type FormValues = \{
			      test: \{ name: \{ deep: string \} \}[];
			    \};
			
			    function Input(\{
			      name,
			      control,
			    \}: \{
			      name: FieldPath<FormValues>;
			      control: Control<FormValues>;
			    \}) \{
			      const \{ field \} = useController(\{
			        name: name as 'test.0.name.deep',
			        control,
			      \});
			
			      return <input type="text" \{...field\} />;
			    \}
			
			    function FieldArray(\{
			      control,
			      name,
			      itemDefaultValue,
			    \}: \{
			      control: Control<FormValues>;
			      name: FieldPath<FormValues>;
			      itemDefaultValue: \{ name: \{ deep: string \} \};
			    \}) \{
			      const \{ fields, prepend \} = useFieldArray(\{
			        control,
			        name: name as 'test',
			      \});
			
			      return (
			        <>
			          \{fields.map((item, index) => (
			            <Input
			              key=\{item.id\}
			              name=\{\`test.\$\{index\}.name.deep\`\}
			              control=\{control\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => prepend(itemDefaultValue)\}>
			            Append
			          </button>
			        </>
			      );
			    \}
			
			    function App() \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [],
			        \},
			      \});
			
			      return (
			        <form>
			          <FieldArray
			            name="test"
			            control=\{control\}
			            itemDefaultValue=\{\{ name: \{ deep: '' \} \}\}
			          />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: '1234' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('');
			  \});
			
			  describe('with resolver', () => \{
			    it('should invoke resolver when formState.isValid true', async () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \});
			        const \{ prepend \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, prepend \};
			      \});
			
			      result.current.formState.isValid;
			
			      await act(async () => \{
			        result.current.prepend(\{ value: '1' \});
			      \});
			
			      expect(resolver).toBeCalledWith(
			        \{
			          test: [\{ value: '1' \}],
			        \},
			        undefined,
			        \{
			          criteriaMode: undefined,
			          fields: \{\},
			          names: [],
			        \},
			      );
			    \});
			
			    it('should not invoke resolver when formState.isValid false', () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \});
			        const \{ prepend \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, prepend \};
			      \});
			
			      act(() => \{
			        result.current.prepend(\{ value: '1' \});
			      \});
			
			      expect(resolver).toBeCalled();
			    \});
			  \});
			
			  it('should not omit keyName when provided', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [\{ id: '1234', test: 'data' \}],
			        \},
			      \});
			
			      const \{ fields, prepend \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              prepend(\{
			                id: 'whatever',
			                test: '1234',
			              \});
			            \}\}
			          >
			            prepend
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'prepend' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText(
			        '\{"test":[\{"id":"whatever","test":"1234"\},\{"id":"1234","test":"data"\}]\}',
			      ),
			    ).toBeVisible();
			  \});
			
			  it('should not omit keyName when provided and defaultValue is empty', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>();
			
			      const \{ fields, prepend \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              prepend(\{
			                id: 'whatever',
			                test: '1234',
			              \});
			            \}\}
			          >
			            prepend
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'prepend' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"whatever","test":"1234"\}]\}'),
			    ).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\prepend.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(12)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\remove.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  act as actComponent,
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			\} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Controller \} from '../../controller';
			import \{ Control, DeepMap, FieldError \} from '../../types';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			jest.useFakeTimers();
			
			let i = 0;
			
			jest.mock('../../logic/generateId', () => () => String(i++));
			
			describe('remove', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it('should update isDirty formState when item removed', () => \{
			    let formState: any;
			    const Component = () => \{
			      const \{
			        register,
			        control,
			        formState: tempFormState,
			      \} = useForm(\{
			        defaultValues: \{
			          test: [\{ name: 'default' \}],
			        \},
			      \});
			      const \{ fields, remove, append \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      formState = tempFormState;
			      formState.isDirty;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <input \{...register(\`test.\$\{i\}.name\` as const)\} />
			              <button type=\{'button'\} onClick=\{() => remove(i)\}>
			                remove
			              </button>
			            </div>
			          ))\}
			
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              append(\{
			                name: '',
			              \})
			            \}
			          >
			            append
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(formState.isDirty).toBeFalsy();
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    expect(formState.isDirty).toBeTruthy();
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: /remove/i \})[1]);
			
			    expect(formState.isDirty).toBeFalsy();
			  \});
			
			  it('should update isValid formState when item removed', async () => \{
			    let formState: any;
			    const Component = () => \{
			      const \{
			        register,
			        control,
			        formState: tempFormState,
			      \} = useForm(\{
			        mode: 'onChange',
			        defaultValues: \{
			          test: [\{ name: 'default' \}],
			        \},
			      \});
			      const \{ fields, remove, append \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      formState = tempFormState;
			
			      formState.isValid;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <input
			                \{...register(\`test.\$\{i\}.name\` as const, \{ required: true \})\}
			              />
			              <button type=\{'button'\} onClick=\{() => remove(i)\}>
			                remove
			              </button>
			            </div>
			          ))\}
			
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              append(\{
			                name: '',
			              \})
			            \}
			          >
			            append
			          </button>
			
			          <p>\{formState.isValid ? 'isValid' : 'notValid'\}</p>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    expect(await screen.findByText('notValid')).toBeVisible();
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: /remove/i \})[1]);
			
			    expect(await screen.findByText('isValid')).toBeVisible();
			  \});
			
			  it('should remove field according index', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: 'default' \}],
			        \},
			      \});
			      return useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			    \});
			
			    act(() => \{
			      result.current.append(\{ value: 'test' \});
			    \});
			
			    act(() => \{
			      result.current.remove(1);
			    \});
			
			    expect(result.current.fields).toEqual([\{ id: '0', value: 'default' \}]);
			
			    act(() => \{
			      result.current.remove(0);
			    \});
			
			    expect(result.current.fields).toEqual([]);
			  \});
			
			  it('should remove all field', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: 'default' \}],
			        \},
			      \});
			      return useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			    \});
			
			    act(() => \{
			      result.current.append(\{ value: 'test' \});
			    \});
			
			    act(() => \{
			      result.current.remove();
			    \});
			
			    expect(result.current.fields).toEqual([]);
			  \});
			
			  it('should remove specific fields when index is array', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: 'default' \}],
			        \},
			      \});
			      return useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			    \});
			
			    act(() => \{
			      result.current.append(\{ value: 'test' \});
			    \});
			
			    act(() => \{
			      result.current.remove([0, 1]);
			    \});
			
			    expect(result.current.fields).toEqual([]);
			  \});
			
			  it.each(['isDirty', 'dirtyFields'])(
			    'should be dirtyFields when value is remove with %s',
			    () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ register, formState, control \} = useForm(\{
			          defaultValues: \{
			            test: [\{ value: 'default' \}],
			          \},
			        \});
			        const \{ fields, append, remove \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return \{ register, formState, fields, append, remove \};
			      \});
			
			      result.current.formState.isDirty;
			      result.current.formState.dirtyFields;
			
			      act(() => \{
			        result.current.append(\{ value: 'test' \});
			      \});
			
			      act(() => \{
			        result.current.append(\{ value: 'test' \});
			      \});
			
			      act(() => \{
			        result.current.remove(0);
			      \});
			
			      expect(result.current.formState.isDirty).toBeTruthy();
			      expect(result.current.formState.dirtyFields).toEqual(\{
			        test: [\{ value: true \}, \{ value: true \}],
			      \});
			
			      act(() => \{
			        result.current.remove();
			      \});
			
			      expect(result.current.formState.isDirty).toBeTruthy();
			      expect(result.current.formState.dirtyFields).toEqual(\{
			        test: [\{ value: true \}],
			      \});
			    \},
			  );
			
			  it('should remove values from formState.touchedFields', () => \{
			    let touched: any;
			
			    const Component = () => \{
			      const \{ register, formState, control \} = useForm();
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      touched = formState.touchedFields;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\`)\} />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: 'append' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => remove(0)\}>
			            remove
			          </button>
			          <button type="button" onClick=\{() => remove()\}>
			            remove all
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    fireEvent.blur(inputs[0]);
			    fireEvent.blur(inputs[1]);
			    fireEvent.blur(inputs[2]);
			
			    expect(touched).toEqual(\{
			      test: [\{ value: true \}, \{ value: true \}, \{ value: true \}],
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			
			    expect(touched).toEqual(\{
			      test: [\{ value: true \}, \{ value: true \}],
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove all' \}));
			
			    expect(touched).toEqual(\{ test: [] \});
			  \});
			
			  it('should remove specific field if isValid is true', async () => \{
			    const Component = () => \{
			      const \{ register, formState, control \} = useForm(\{
			        mode: VALIDATION_MODE.onChange,
			      \});
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      formState.isValid;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.value\` as const, \{ required: true \})\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => remove(1)\}>
			            remove
			          </button>
			          <p>\{formState.isValid ? 'valid' : 'notValid'\}</p>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    expect(await screen.findByText('notValid')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    fireEvent.input(inputs[0], \{
			      target: \{ value: 'test' \},
			    \});
			
			    fireEvent.input(inputs[2], \{
			      target: \{ value: 'test' \},
			    \});
			
			    fireEvent.input(inputs[3], \{
			      target: \{ value: 'test' \},
			    \});
			
			    expect(await screen.findByText('notValid')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			
			    expect(await screen.findByText('valid')).toBeVisible();
			  \});
			
			  it('should remove all field if isValid is true', async () => \{
			    let isValid = false;
			    const Component = () => \{
			      const \{ register, formState, control \} = useForm(\{
			        mode: VALIDATION_MODE.onChange,
			      \});
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      isValid = formState.isValid;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.value\` as const, \{ required: true \})\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => remove()\}>
			            remove
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    await waitFor(() => expect(isValid).toBeFalsy());
			    expect(screen.getAllByRole('textbox')).toHaveLength(1);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    expect(screen.getAllByRole('textbox')).toHaveLength(2);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    await waitFor(() => expect(isValid).toBeFalsy());
			    expect(screen.getAllByRole('textbox')).toHaveLength(3);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			    await waitFor(() => expect(isValid).toBe(true));
			  \});
			
			  it('should remove error', async () => \{
			    let errors: any;
			    const Component = () => \{
			      const \{
			        register,
			        formState: \{ errors: tempErrors \},
			        handleSubmit,
			        control,
			      \} = useForm();
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      errors = tempErrors;
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.value\` as const, \{ required: true \})\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => remove(0)\}>
			            remove
			          </button>
			          <button type="button" onClick=\{() => remove()\}>
			            remove all
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			
			    await waitFor(() => expect(errors.test).toHaveLength(2));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove all' \}));
			
			    expect(errors.test).toBeUndefined();
			  \});
			
			  it('should remove nested field array error', async () => \{
			    type FormValues = \{
			      test: \{
			        nested: \{
			          test: string;
			          key: number;
			        \}[];
			      \}[];
			    \};
			
			    let mockKey = 0;
			    const callback = jest.fn();
			
			    const Nested = (\{
			      errors,
			      control,
			      index,
			    \}: \{
			      control: Control<FormValues>;
			      errors: DeepMap<Record<string, any>, FieldError>;
			      index: number;
			    \}) => \{
			      const \{ fields, append, remove \} = useFieldArray<
			        FormValues,
			        'test.0.nested'
			      >(\{
			        name: \`test.\$\{index\}.nested\` as 'test.0.nested',
			        control,
			      \});
			
			      return (
			        <fieldset>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <input
			                \{...control.register(
			                  \`test.\$\{index\}.nested.\$\{i\}.test\` as const,
			                  \{
			                    required: 'required',
			                  \},
			                )\}
			              />
			              \{errors?.test &&
			                errors.test[index]?.nested &&
			                errors.test[index].nested[i]?.test && (
			                  <span data-testid="nested-error">
			                    \{errors.test[index].nested[i].test.message\}
			                  </span>
			                )\}
			              <button type="button" onClick=\{() => remove(i)\}>
			                nested delete
			              </button>
			            </div>
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => append(\{ test: 'test', key: mockKey++ \})\}
			          >
			            nested append
			          </button>
			        </fieldset>
			      );
			    \};
			
			    const Component = () => \{
			      const \{
			        formState: \{ errors, isValid \},
			        handleSubmit,
			        control,
			      \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [\{ nested: [\{ test: '', key: mockKey \}] \}],
			        \},
			      \});
			      const \{ fields \} = useFieldArray(\{ name: 'test', control \});
			
			      return (
			        <>
			          <p>Valid: \{isValid.toString()\}</p>
			          <form onSubmit=\{handleSubmit(callback)\}>
			            \{fields.map((_, i) => (
			              <Nested
			                key=\{i.toString()\}
			                errors=\{errors\}
			                control=\{control\}
			                index=\{i\}
			              />
			            ))\}
			            <button>submit</button>
			          </form>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			    expect(await screen.findByTestId('nested-error')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: /nested delete/i \}));
			    await waitFor(() =>
			      expect(screen.queryByTestId('nested-error')).not.toBeInTheDocument(),
			    );
			    expect(await screen.findByText('Valid: true')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: /nested append/i \}));
			
			    expect(screen.queryByTestId('nested-error')).not.toBeInTheDocument();
			  \});
			
			  it('should trigger reRender when user is watching the all field array', () => \{
			    const watched: any[] = [];
			    const Component = () => \{
			      const \{ register, watch, control \} = useForm<\{
			        test: \{
			          value: string;
			        \}[];
			      \}>();
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      watched.push(watch());
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => remove(0)\}>
			            remove
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			
			    expect(watched).toEqual([
			      \{\}, // first render
			      \{ test: [] \}, // render inside useEffect in useFieldArray
			      \{ test: [\{ value: '' \}] \}, // render inside append method
			      \{ test: [\{ value: '' \}] \}, // render inside useEffect in useFieldArray
			      \{ test: [] \}, // render inside remove method
			      \{ test: [] \}, // render inside useEffect in useFieldArray
			    ]);
			  \});
			
			  it('should return watched value with watch API', async () => \{
			    const renderedItems: any = [];
			    const Component = () => \{
			      const \{ watch, register, control \} = useForm<\{
			        test: \{
			          value: string;
			        \}[];
			      \}>();
			      const \{ fields, append, remove \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			      const watched = watch('test');
			      const isRemoved = React.useRef(false);
			      if (isRemoved.current) \{
			        renderedItems.push(watched);
			      \}
			
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{\`\$\{field.id\}\`\}>
			              <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			            </div>
			          ))\}
			          <button onClick=\{() => append(\{ value: '' \})\}>append</button>
			          <button
			            onClick=\{() => \{
			              remove(2);
			              isRemoved.current = true;
			            \}\}
			          >
			            remove
			          </button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    fireEvent.change(inputs[0], \{
			      target: \{ name: 'test[0].value', value: '111' \},
			    \});
			    fireEvent.change(inputs[1], \{
			      target: \{ name: 'test[1].value', value: '222' \},
			    \});
			    fireEvent.change(inputs[2], \{
			      target: \{ name: 'test[2].value', value: '333' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /remove/i \}));
			
			    await waitFor(() =>
			      expect(renderedItems).toEqual([
			        [\{ value: '111' \}, \{ value: '222' \}],
			        [\{ value: '111' \}, \{ value: '222' \}],
			      ]),
			    );
			  \});
			
			  it('should remove dirtyFields fields with nested field inputs', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ register, formState, control \} = useForm(\{
			        defaultValues: \{
			          test: \{
			            data: [\{ value: 'default' \}],
			          \},
			        \},
			      \});
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test.data',
			      \});
			
			      return \{ register, formState, fields, append, remove \};
			    \});
			
			    result.current.formState.dirtyFields as Record<string, any>;
			    result.current.formState.isDirty;
			
			    act(() => \{
			      result.current.append(\{ value: 'test' \});
			    \});
			
			    expect(result.current.formState.isDirty).toBeTruthy();
			    expect(result.current.formState.dirtyFields).toEqual(\{
			      test: \{ data: [\{ value: false \}, \{ value: true \}] \},
			    \});
			
			    act(() => \{
			      result.current.remove(1);
			    \});
			
			    expect(result.current.formState.isDirty).toBeFalsy();
			    expect(result.current.formState.dirtyFields).toEqual(\{
			      test: \{ data: [\{ value: false \}] \},
			    \});
			  \});
			
			  it('should remove Controller by index without error', () => \{
			    const Component = () => \{
			      const \{ control, handleSubmit \} = useForm<\{
			        test: \{
			          firstName: string;
			        \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [],
			        \},
			      \});
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <ul>
			            \{fields.map((item, index) => \{
			              return (
			                <li key=\{item.id\}>
			                  <Controller
			                    render=\{(\{ field \}) => <input \{...field\} />\}
			                    name=\{\`test.\$\{index\}.firstName\` as const\}
			                    control=\{control\}
			                  />
			                  <button type="button" onClick=\{() => remove(index)\}>
			                    delete
			                  </button>
			                </li>
			              );
			            \})\}
			          </ul>
			          <section>
			            <button
			              type="button"
			              onClick=\{() => \{
			                append(\{ firstName: 'appendBill' \});
			              \}\}
			            >
			              append
			            </button>
			          </section>
			
			          <input type="submit" />
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'delete' \})[1]);
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'delete' \})[1]);
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'delete' \})[1]);
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'delete' \})[0]);
			  \});
			
			  it("should not reset Controller's value during remove when Field Array name is already registered", async () => \{
			    function Component() \{
			      const \{ control, handleSubmit \} = useForm(\{
			        defaultValues: \{
			          test: [\{ firstName: 'Bill', lastName: '' \}],
			        \},
			      \});
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <ul>
			            \{fields.map((item, index) => \{
			              return (
			                <li key=\{item.id\}>
			                  <Controller
			                    name=\{\`test.\$\{index\}.lastName\` as const\}
			                    control=\{control\}
			                    render=\{(\{ field \}) => <input \{...field\} />\}
			                  />
			                  <button type="button" onClick=\{() => remove(index)\}>
			                    Delete
			                  </button>
			                </li>
			              );
			            \})\}
			          </ul>
			          <button
			            type="button"
			            onClick=\{() => \{
			              append(\{ firstName: 'appendBill', lastName: 'appendLuo' \});
			            \}\}
			          >
			            append
			          </button>
			        </form>
			      );
			    \}
			
			    render(<Component />);
			
			    fireEvent.input(screen.getAllByRole('textbox')[0], \{
			      target: \{ name: 'test[0].lastName', value: '111' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'Delete' \})[1]);
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('111');
			  \});
			
			  describe('with resolver', () => \{
			    it('should invoke resolver when formState.isValid true', async () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			          defaultValues: \{
			            test: [\{ value: 'test' \}],
			          \},
			        \});
			        const \{ remove \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, remove \};
			      \});
			
			      result.current.formState.isValid;
			
			      await act(async () => \{
			        result.current.remove(0);
			      \});
			
			      expect(resolver).toBeCalledWith(
			        \{
			          test: [],
			        \},
			        undefined,
			        \{ criteriaMode: undefined, fields: \{\}, names: [] \},
			      );
			    \});
			
			    it('should not invoke resolver when formState.isValid false', () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			          defaultValues: \{
			            test: [\{ value: 'test' \}],
			          \},
			        \});
			        const \{ remove \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, remove \};
			      \});
			
			      act(() => \{
			        result.current.remove(0);
			      \});
			
			      expect(resolver).toBeCalled();
			    \});
			
			    it('should remove the first index correctly', async () => \{
			      let output: unknown;
			
			      type FormValues = \{
			        test: \{
			          firstName: string;
			          lastName: string;
			        \}[];
			      \};
			
			      const Component = () => \{
			        const \{ control, handleSubmit, register \} = useForm<FormValues>(\{
			          defaultValues: \{
			            test: [
			              \{
			                firstName: 'test',
			                lastName: 'test',
			              \},
			              \{
			                firstName: 'test1',
			                lastName: 'test1',
			              \},
			            ],
			          \},
			        \});
			        const \{ fields, remove \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        const onSubmit = (data: FormValues) => (output = data);
			
			        return (
			          <form onSubmit=\{handleSubmit(onSubmit)\}>
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <input \{...register(\`test.\$\{index\}.firstName\` as const)\} />
			                  <Controller
			                    name=\{\`test.\$\{index\}.lastName\` as const\}
			                    control=\{control\}
			                    render=\{() => <div />\}
			                  />
			                  <button
			                    type=\{'button'\}
			                    onClick=\{() => \{
			                      remove(index);
			                    \}\}
			                  >
			                    Remove
			                  </button>
			                </div>
			              );
			            \})\}
			            <button>Submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'Submit' \}));
			
			      await waitFor(() =>
			        expect(output).toEqual(\{
			          test: [
			            \{
			              firstName: 'test',
			              lastName: 'test',
			            \},
			            \{
			              firstName: 'test1',
			              lastName: 'test1',
			            \},
			          ],
			        \}),
			      );
			
			      fireEvent.click(screen.getAllByRole('button', \{ name: 'Remove' \})[0]);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'Submit' \}));
			
			      await waitFor(() =>
			        expect(output).toEqual(\{
			          test: [
			            \{
			              firstName: 'test1',
			              lastName: 'test1',
			            \},
			          ],
			        \}),
			      );
			    \});
			  \});
			
			  it('should remove correct value with async reset', async () => \{
			    let output = \{\};
			
			    function App() \{
			      const \{ handleSubmit, control, reset \} = useForm(\{
			        defaultValues: \{
			          test: [
			            \{
			              title: '',
			              description: '',
			            \},
			            \{
			              title: '',
			              description: '',
			            \},
			          ],
			        \},
			      \});
			      const \{ fields, remove \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      React.useEffect(() => \{
			        setTimeout(() => \{
			          reset(\{
			            test: [
			              \{
			                title: 'title1',
			                description: 'description1',
			              \},
			              \{
			                title: 'title2',
			                description: 'description2',
			              \},
			            ],
			          \});
			        \}, 2000);
			      \}, [reset]);
			
			      return (
			        <form onSubmit=\{handleSubmit((data) => (output = data))\}>
			          \{fields.map((field, index) => (
			            <div
			              key=\{field.id\}
			              style=\{\{ display: 'flex', alignItems: 'center' \}\}
			            >
			              <Controller
			                name=\{\`test.\$\{index\}.title\`\}
			                control=\{control\}
			                render=\{(\{ field \}) => <input \{...field\} />\}
			              />
			              <button type="button" onClick=\{() => remove(index)\}>
			                remove
			              </button>
			            </div>
			          ))\}
			          <button type="submit">submit</button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    actComponent(() => \{
			      jest.advanceTimersByTime(2000);
			    \});
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'remove' \})[1]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    await waitFor(() =>
			      expect(output).toEqual(\{
			        test: [\{ title: 'title1', description: 'description1' \}],
			      \}),
			    );
			  \});
			
			  it('should not omit keyName when provided', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [
			            \{ id: '1234', test: 'data' \},
			            \{ id: '4567', test: 'data1' \},
			          ],
			        \},
			      \});
			
			      const \{ fields, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              remove(0);
			            \}\}
			          >
			            remove
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"4567","test":"data1"\}]\}'),
			    ).toBeVisible();
			  \});
			
			  it('should not omit keyName when provided and defaultValue is empty', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			    let k = 0;
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>();
			
			      const \{ fields, append, remove \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              remove(0);
			            \}\}
			          >
			            remove
			          </button>
			
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              append(\{
			                id: 'whatever' + k,
			                test: '1234' + k,
			              \});
			              k = 1;
			            \}\}
			          >
			            append
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"whatever1","test":"12341"\}]\}'),
			    ).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\remove.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(21)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\replace.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			
			import \{ useController \} from '../../useController';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			import \{ FormProvider \} from '../../useFormContext';
			
			interface TestValue \{
			  x: string;
			\}
			
			interface DefaultValues \{
			  test: TestValue[];
			\}
			
			let i = 0;
			
			jest.mock('../../logic/generateId', () => () => String(i++));
			
			describe('replace', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it('should replace fields correctly', () => \{
			    let currentFields: any = [];
			    const defaultValues: DefaultValues = \{
			      test: [\{ x: '101' \}, \{ x: '102' \}, \{ x: '103' \}],
			    \};
			
			    const labelSingle = 'replace';
			
			    const labelBatch = 'replaceBatch';
			
			    const Component = () => \{
			      const \{ register, control \} = useForm<DefaultValues>(\{
			        defaultValues,
			      \});
			      const \{ fields, replace \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      currentFields = fields;
			
			      const handleSingleReplace = () => replace(\{ x: '201' \});
			
			      const handleBatchReplace = () => replace([\{ x: '301' \}, \{ x: '302' \}]);
			
			      return (
			        <form>
			          \{fields.map((field, index) => \{
			            return (
			              <input key=\{field.id\} \{...register(\`test.\$\{index\}.x\` as const)\} />
			            );
			          \})\}
			          <button type="button" onClick=\{handleSingleReplace\}>
			            \{labelSingle\}
			          </button>
			          <button type="button" onClick=\{handleBatchReplace\}>
			            \{labelBatch\}
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: labelSingle \}));
			
			    expect(currentFields).toEqual([\{ id: '3', x: '201' \}]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: labelBatch \}));
			
			    expect(currentFields).toEqual([
			      \{ id: '5', x: '301' \},
			      \{ id: '6', x: '302' \},
			    ]);
			  \});
			  it('should not omit keyName when provided', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [
			            \{ id: '1234', test: 'data' \},
			            \{ id: '4567', test: 'data1' \},
			          ],
			        \},
			      \});
			
			      const \{ fields, replace \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              replace([\{ id: 'test', test: 'data' \}]);
			            \}\}
			          >
			            replace
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'replace' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"test","test":"data"\}]\}'),
			    ).toBeVisible();
			  \});
			
			  it('should not omit keyName when provided and defaultValue is empty', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			    let k = 0;
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>();
			
			      const \{ fields, append, replace \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              replace([\{ id: 'whatever', test: 'data' \}]);
			            \}\}
			          >
			            replace
			          </button>
			
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              append(\{
			                id: 'whatever' + k,
			                test: '1234' + k,
			              \});
			              k = 1;
			            \}\}
			          >
			            append
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'replace' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"whatever","test":"data"\}]\}'),
			    ).toBeVisible();
			  \});
			
			  it('should not replace errors state', async () => \{
			    const App = () => \{
			      const \{
			        control,
			        register,
			        trigger,
			        formState: \{ errors \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: [
			            \{
			              firstName: '',
			            \},
			          ],
			        \},
			      \});
			      const \{ fields, replace \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      React.useEffect(() => \{
			        trigger();
			      \}, [trigger]);
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.firstName\` as const, \{
			                required: 'This is required',
			              \})\}
			            />
			          ))\}
			          <p>\{errors?.test?.[0]?.firstName?.message\}</p>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              replace([
			                \{
			                  firstName: 'firstName',
			                \},
			              ])
			            \}
			          >
			            update
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('This is required')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('This is required')).toBeVisible();
			  \});
			
			  it('should not affect other formState during replace action', () => \{
			    const ControlledInput = (\{ index \}: \{ index: number \}) => \{
			      const \{ field \} = useController(\{
			        name: \`fieldArray.\$\{index\}.firstName\`,
			      \});
			      return <input \{...field\} />;
			    \};
			
			    const defaultValue = \{
			      firstName: 'test',
			    \};
			
			    const FieldArray = () => \{
			      const \{ fields, replace \} = useFieldArray(\{
			        name: 'fieldArray',
			      \});
			
			      React.useEffect(() => \{
			        replace([defaultValue]);
			      \}, [replace]);
			
			      return (
			        <div>
			          \{fields.map((field, index) => \{
			            return <ControlledInput key=\{field.id\} index=\{index\} />;
			          \})\}
			
			          <button type="button" onClick=\{() => replace(defaultValue)\}>
			            replace
			          </button>
			        </div>
			      );
			    \};
			
			    function App() \{
			      const form = useForm(\{
			        mode: 'onChange',
			      \});
			      const [, updateState] = React.useState(0);
			
			      return (
			        <FormProvider \{...form\}>
			          <FieldArray />
			          <p>\{JSON.stringify(form.formState.touchedFields)\}</p>
			          <button onClick=\{() => updateState(1)\}>updateState</button>
			        </FormProvider>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.focus(screen.getByRole('textbox'));
			    fireEvent.blur(screen.getByRole('textbox'));
			    fireEvent.click(screen.getByRole('button', \{ name: 'replace' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'updateState' \}));
			
			    expect(
			      screen.getByText('\{"fieldArray":[\{"firstName":true\}]\}'),
			    ).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\replace.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\swap.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			let i = 0;
			
			jest.mock('../../logic/generateId', () => () => String(i++));
			
			describe('swap', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it('should swap into pointed position', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ register, control \} = useForm(\{
			        defaultValues: \{ test: [\{ value: '1' \}] \},
			      \});
			      const methods = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return \{ register, ...methods \};
			    \});
			
			    act(() => \{
			      result.current.append(\{ value: '2' \});
			    \});
			
			    act(() => \{
			      result.current.swap(0, 1);
			    \});
			
			    expect(result.current.fields).toEqual([
			      \{ id: '1', value: '2' \},
			      \{ id: '0', value: '1' \},
			    ]);
			  \});
			
			  it('should swap data order', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ register, control \} = useForm(\{
			        defaultValues: \{ test: [\{ value: '1' \}] \},
			      \});
			      const methods = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return \{ register, ...methods \};
			    \});
			
			    act(() => \{
			      result.current.append(\{ value: '2' \});
			    \});
			
			    act(() => \{
			      result.current.swap(0, 1);
			    \});
			
			    expect(result.current.fields).toEqual([
			      \{ id: '1', value: '2' \},
			      \{ id: '0', value: '1' \},
			    ]);
			  \});
			
			  it.each(['isDirty', 'dirtyFields'])(
			    'should swap dirtyFields order when formState.%s is defined',
			    () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          defaultValues: \{ test: [\{ value: '1' \}] \},
			        \});
			        const methods = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			        return \{
			          formState,
			          ...methods,
			        \};
			      \});
			
			      result.current.formState.isDirty;
			      result.current.formState.dirtyFields;
			
			      act(() => \{
			        result.current.append(\{ value: '2' \});
			      \});
			
			      act(() => \{
			        result.current.append(\{ value: '3' \});
			      \});
			
			      act(() => \{
			        result.current.swap(0, 1);
			      \});
			
			      expect(result.current.formState.isDirty).toBeTruthy();
			      expect(result.current.formState.dirtyFields).toEqual(\{
			        test: [\{ value: true \}, \{ value: true \}, \{ value: true \}],
			      \});
			    \},
			  );
			
			  it('should swap errors', async () => \{
			    let errors: any;
			    const Component = () => \{
			      const \{ register, handleSubmit, control, ...rest \} = useForm(\{
			        defaultValues: \{ test: [\{ value: 'test' \}] \},
			      \});
			      const \{ fields, append, swap \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      errors = rest.formState.errors;
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.value\` as const, \{ required: true \})\}
			            />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => swap(0, 1)\}>
			            swap
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			
			    await waitFor(() => expect(errors.test[0]).toBeUndefined());
			    expect(errors.test[1]).toBeDefined();
			
			    fireEvent.click(screen.getByRole('button', \{ name: /swap/i \}));
			
			    expect(errors.test[0]).toBeDefined();
			    expect(errors.test[1]).toBeUndefined();
			  \});
			
			  it('should swap touched fields', async () => \{
			    let touched: any;
			    const Component = () => \{
			      const \{ register, formState, control \} = useForm(\{
			        defaultValues: \{ test: [\{ value: 'test' \}] \},
			      \});
			      const \{ fields, append, swap \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      touched = formState.touchedFields;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			            append
			          </button>
			          <button type="button" onClick=\{() => swap(0, 1)\}>
			            swap
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    fireEvent.blur(screen.getAllByRole('textbox')[0]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /swap/i \}));
			
			    expect(touched).toEqual(\{
			      test: [undefined, \{ value: true \}],
			    \});
			  \});
			
			  it('should trigger reRender when user is watching the all field array', () => \{
			    const watched: any[] = [];
			    const Component = () => \{
			      const \{ register, watch, control \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}, \{ value: '2' \}],
			        \},
			      \});
			      const \{ fields, swap \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      watched.push(watch());
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => swap(0, 1)\}>
			            swap
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'swap' \}));
			
			    expect(watched).toEqual([
			      \{ test: [\{ value: '1' \}, \{ value: '2' \}] \}, // first render
			      \{ test: [\{ value: '1' \}, \{ value: '2' \}] \}, // render inside useEffect in useFieldArray
			      \{ test: [\{ value: '2' \}, \{ value: '1' \}] \}, // render inside swap method
			      \{ test: [\{ value: '2' \}, \{ value: '1' \}] \}, // render inside useEffect in useFieldArray
			    ]);
			  \});
			
			  it('should return watched value with watch API', async () => \{
			    const renderedItems: any = [];
			    const Component = () => \{
			      const \{ watch, register, control \} = useForm<\{
			        test: \{
			          value: string;
			        \}[];
			      \}>();
			      const \{ fields, append, swap \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			      const watched = watch('test');
			      const isSwapped = React.useRef(false);
			      if (isSwapped.current) \{
			        renderedItems.push(watched);
			      \}
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{\`\$\{field.id\}\`\}>
			              <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			            </div>
			          ))\}
			          <button onClick=\{() => append(\{ value: '' \})\}>append</button>
			          <button
			            onClick=\{() => \{
			              swap(0, 1);
			              isSwapped.current = true;
			            \}\}
			          >
			            swap
			          </button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			    fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			    const inputs = screen.getAllByRole('textbox');
			
			    fireEvent.input(inputs[0], \{
			      target: \{ name: 'test[0].value', value: '111' \},
			    \});
			    fireEvent.input(inputs[1], \{
			      target: \{ name: 'test[1].value', value: '222' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: /swap/i \}));
			
			    await waitFor(() =>
			      expect(renderedItems).toEqual([
			        [\{ value: '222' \}, \{ value: '111' \}],
			        [\{ value: '222' \}, \{ value: '111' \}],
			      ]),
			    );
			  \});
			
			  describe('with resolver', () => \{
			    it('should invoke resolver when formState.isValid true', async () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			          defaultValues: \{
			            test: [\{ value: '1' \}, \{ value: '2' \}],
			          \},
			        \});
			        const \{ swap \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, swap \};
			      \});
			
			      result.current.formState.isValid;
			
			      await act(async () => \{
			        result.current.swap(0, 1);
			      \});
			
			      expect(resolver).toBeCalledWith(
			        \{
			          test: [\{ value: '2' \}, \{ value: '1' \}],
			        \},
			        undefined,
			        \{
			          criteriaMode: undefined,
			          fields: \{\},
			          names: [],
			        \},
			      );
			    \});
			
			    it('should not invoke resolver when formState.isValid false', () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			          defaultValues: \{
			            test: [\{ value: '1' \}, \{ value: '2' \}],
			          \},
			        \});
			        const \{ swap \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, swap \};
			      \});
			
			      act(() => \{
			        result.current.swap(0, 1);
			      \});
			
			      expect(resolver).toBeCalled();
			    \});
			  \});
			
			  it('should not omit keyName when provided', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [
			            \{ id: '1234', test: 'data' \},
			            \{ id: '4567', test: 'data1' \},
			          ],
			        \},
			      \});
			
			      const \{ fields, swap \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              swap(0, 1);
			            \}\}
			          >
			            swap
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'swap' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText(
			        '\{"test":[\{"id":"4567","test":"data1"\},\{"id":"1234","test":"data"\}]\}',
			      ),
			    ).toBeVisible();
			  \});
			
			  it('should not omit keyName when provided and defaultValue is empty', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			    let k = 0;
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>();
			
			      const \{ fields, append, swap \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              swap(0, 1);
			            \}\}
			          >
			            swap
			          </button>
			
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              append(\{
			                id: 'whatever' + k,
			                test: '1234' + k,
			              \});
			              k = 1;
			            \}\}
			          >
			            append
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'swap' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText(
			        '\{"test":[\{"id":"whatever1","test":"12341"\},\{"id":"whatever0","test":"12340"\}]\}',
			      ),
			    ).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\swap.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\update.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Control \} from '../../types';
			import \{ useController \} from '../../useController';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			let i = 0;
			
			jest.mock('../../logic/generateId', () => () => String(i++));
			
			describe('update', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it('should update dirtyFields fields correctly', async () => \{
			    let dirtyInputs = \{\};
			    const Component = () => \{
			      const \{
			        register,
			        control,
			        formState: \{ dirtyFields \},
			      \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [
			            \{ value: 'plz change' \},
			            \{ value: 'dont change' \},
			            \{ value: 'dont change' \},
			          ],
			        \},
			      \});
			      const \{ fields, update \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      dirtyInputs = dirtyFields;
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => update(0, \{ value: 'changed' \})\}>
			            update
			          </button>
			          \{dirtyFields.test?.length && 'dirty'\}
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('dirty')).toBeVisible();
			
			    expect(dirtyInputs).toEqual(\{
			      test: [\{ value: true \}, \{ value: false \}, \{ value: false \}],
			    \});
			  \});
			
			  it.each(['isDirty', 'dirtyFields'])('should update state with %s', () => \{
			    let isDirtyValue;
			    let dirtyValue;
			
			    const Component = () => \{
			      const \{
			        register,
			        control,
			        formState: \{ isDirty, dirtyFields \},
			      \} = useForm<\{
			        test: \{ test: string \}[];
			      \}>(\{
			        defaultValues: \{\},
			      \});
			      const \{ fields, update \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      isDirtyValue = isDirty;
			      dirtyValue = dirtyFields;
			
			      return (
			        <form>
			          \{fields.map((field, index) => \{
			            return (
			              <input
			                key=\{field.id\}
			                \{...register(\`test.\$\{index\}.test\` as const)\}
			              />
			            );
			          \})\}
			          <button type=\{'button'\} onClick=\{() => update(2, \{ test: 'test1' \})\}>
			            update
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'update' \}));
			
			    expect(isDirtyValue).toBeTruthy();
			    expect(dirtyValue).toEqual(\{
			      test: [undefined, undefined, \{ test: true \}],
			    \});
			  \});
			
			  it('should trigger reRender when user update input and is watching the all field array', () => \{
			    const watched: any[] = [];
			    const Component = () => \{
			      const \{ register, watch, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>();
			      const \{ fields, update \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      watched.push(watch());
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button type="button" onClick=\{() => update(0, \{ value: '' \})\}>
			            update
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(watched).toEqual([
			      \{\},
			      \{
			        test: [],
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /update/i \}));
			
			    expect(watched).toEqual([
			      \{\},
			      \{
			        test: [],
			      \},
			      \{
			        test: [
			          \{
			            value: '',
			          \},
			        ],
			      \},
			      \{
			        test: [
			          \{
			            value: '',
			          \},
			        ],
			      \},
			    ]);
			  \});
			
			  it('should return watched value with update and watch API', async () => \{
			    const renderedItems: any = [];
			    const Component = () => \{
			      const \{ watch, register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>();
			      const \{ fields, update \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			      const watched = watch('test');
			      renderedItems.push(watched);
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			            </div>
			          ))\}
			          <button onClick=\{() => update(0, \{ value: 'test' \})\}>update</button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: /update/i \}));
			
			    await waitFor(() =>
			      expect(renderedItems).toEqual([
			        undefined,
			        [],
			        [\{ value: 'test' \}],
			        [\{ value: 'test' \}],
			      ]),
			    );
			  \});
			
			  it('should update group input correctly', () => \{
			    type FormValues = \{
			      test: \{
			        value: \{
			          firstName: string;
			          lastName: string;
			        \};
			      \}[];
			    \};
			
			    const fieldArrayValues: unknown[] = [];
			
			    const GroupInput = (\{
			      control,
			      index,
			    \}: \{
			      control: Control<FormValues>;
			      index: number;
			    \}) => \{
			      const \{ field \} = useController(\{
			        control,
			        name: \`test.\$\{index\}.value\` as const,
			      \});
			
			      return (
			        <div>
			          <input
			            value=\{field.value.firstName\}
			            onChange=\{(e) => \{
			              field.onChange(\{
			                ...field.value,
			                firstName: e.target.name,
			              \});
			            \}\}
			          />
			          <input
			            value=\{field.value.lastName\}
			            onChange=\{(e) => \{
			              field.onChange(\{
			                ...field.value,
			                lastName: e.target.name,
			              \});
			            \}\}
			          />
			        </div>
			      );
			    \};
			
			    const App = () => \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [
			            \{
			              value: \{
			                firstName: 'bill',
			                lastName: 'luo',
			              \},
			            \},
			          ],
			        \},
			      \});
			      const \{ fields, update \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      fieldArrayValues.push(fields);
			
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <GroupInput control=\{control\} index=\{i\} />
			            </div>
			          ))\}
			          <button
			            onClick=\{() =>
			              update(0, \{
			                value: \{ firstName: 'firstName', lastName: 'lastName' \},
			              \})
			            \}
			          >
			            update
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    expect(fieldArrayValues.at(-1)).toEqual([
			      \{
			        id: '0',
			        value: \{
			          firstName: 'bill',
			          lastName: 'luo',
			        \},
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('firstName');
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('lastName');
			
			    // Let's check all values of renders with implicitly the number of render (for each value)
			    expect(fieldArrayValues).toEqual([
			      [
			        \{
			          id: '0',
			          value: \{
			            firstName: 'bill',
			            lastName: 'luo',
			          \},
			        \},
			      ],
			      [
			        \{
			          id: '1',
			          value: \{
			            firstName: 'firstName',
			            lastName: 'lastName',
			          \},
			        \},
			      ],
			    ]);
			  \});
			
			  it('should update field array with single value', () => \{
			    let fieldArrayValues: \{ value: string \}[] | [] = [];
			    const App = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ value: string \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [
			            \{
			              value: 'bill',
			            \},
			          ],
			        \},
			      \});
			      const \{ fields, update \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      fieldArrayValues = fields;
			
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			            </div>
			          ))\}
			          <button onClick=\{() => update(0, \{ value: 'test' \})\}>update</button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'test',
			    );
			
			    expect(fieldArrayValues[0].value).toEqual('test');
			  \});
			
			  it('should update field array with multiple values', () => \{
			    let fieldArrayValues: \{ firstName: string; lastName: string \}[] | [] = [];
			
			    const App = () => \{
			      const \{ register, control \} = useForm<\{
			        test: \{ firstName: string; lastName: string \}[];
			      \}>(\{
			        defaultValues: \{
			          test: [
			            \{
			              firstName: 'bill',
			              lastName: 'luo',
			            \},
			            \{
			              firstName: 'bill1',
			              lastName: 'luo1',
			            \},
			          ],
			        \},
			      \});
			      const \{ fields, update \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      fieldArrayValues = fields;
			
			      return (
			        <div>
			          \{fields.map((field, i) => (
			            <div key=\{field.id\}>
			              <input \{...register(\`test.\$\{i\}.firstName\` as const)\} />
			              <input \{...register(\`test.\$\{i\}.lastName\` as const)\} />
			            </div>
			          ))\}
			          <button
			            onClick=\{() => \{
			              update(0, \{ firstName: 'test1', lastName: 'test2' \});
			              update(1, \{ firstName: 'test3', lastName: 'test4' \});
			            \}\}
			          >
			            update
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    expect(fieldArrayValues).toEqual([
			      \{
			        firstName: 'bill',
			        id: '0',
			        lastName: 'luo',
			      \},
			      \{
			        firstName: 'bill1',
			        id: '1',
			        lastName: 'luo1',
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('test1');
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('test2');
			    expect(
			      (screen.getAllByRole('textbox')[2] as HTMLInputElement).value,
			    ).toEqual('test3');
			    expect(
			      (screen.getAllByRole('textbox')[3] as HTMLInputElement).value,
			    ).toEqual('test4');
			
			    expect(fieldArrayValues).toEqual([
			      \{
			        firstName: 'test1',
			        id: '2',
			        lastName: 'test2',
			      \},
			      \{
			        firstName: 'test3',
			        id: '3',
			        lastName: 'test4',
			      \},
			    ]);
			  \});
			
			  describe('with resolver', () => \{
			    it('should invoke resolver when formState.isValid true', async () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \});
			        const \{ update \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, update \};
			      \});
			
			      result.current.formState.isValid;
			
			      await act(async () => \{
			        result.current.update(0, \{ value: '1' \});
			      \});
			
			      expect(resolver).toBeCalledWith(
			        \{
			          test: [\{ value: '1' \}],
			        \},
			        undefined,
			        \{
			          criteriaMode: undefined,
			          fields: \{\},
			          names: [],
			        \},
			      );
			    \});
			
			    it('should not invoke resolver when formState.isValid false', () => \{
			      const resolver = jest.fn().mockReturnValue(\{\});
			
			      const \{ result \} = renderHook(() => \{
			        const \{ formState, control \} = useForm(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \});
			        const \{ update \} = useFieldArray(\{ control, name: 'test' \});
			        return \{ formState, update \};
			      \});
			
			      act(() => \{
			        result.current.update(0, \{ value: '1' \});
			      \});
			
			      expect(resolver).toBeCalled();
			    \});
			  \});
			
			  it('should not omit keyName when provided', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [\{ id: '1234', test: 'data' \}],
			        \},
			      \});
			
			      const \{ fields, update \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              update(0, \{
			                id: 'whatever',
			                test: '1234',
			              \});
			            \}\}
			          >
			            update
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'update' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"whatever","test":"1234"\}]\}'),
			    ).toBeVisible();
			  \});
			
			  it('should not omit keyName when provided and defaultValue is empty', async () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        id: string;
			      \}[];
			    \};
			
			    const App = () => \{
			      const [data, setData] = React.useState<FormValues>();
			      const \{ control, register, handleSubmit \} = useForm<FormValues>();
			
			      const \{ fields, update \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(setData)\}>
			          \{fields.map((field, index) => \{
			            return <input key=\{field.id\} \{...register(\`test.\$\{index\}.test\`)\} />;
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              update(0, \{
			                id: 'whatever',
			                test: '1234',
			              \});
			            \}\}
			          >
			            update
			          </button>
			          <button>submit</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'update' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(
			      await screen.findByText('\{"test":[\{"id":"whatever","test":"1234"\}]\}'),
			    ).toBeVisible();
			  \});
			
			  it('should not update errors state', async () => \{
			    const App = () => \{
			      const \{
			        control,
			        register,
			        trigger,
			        formState: \{ errors \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: [
			            \{
			              firstName: '',
			            \},
			          ],
			        \},
			      \});
			      const \{ fields, update \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      React.useEffect(() => \{
			        trigger();
			      \}, [trigger]);
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{i\}.firstName\` as const, \{
			                required: 'This is required',
			              \})\}
			            />
			          ))\}
			          <p>\{errors?.test?.[0]?.firstName?.message\}</p>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              update(0, \{
			                firstName: 'firstName',
			              \})
			            \}
			          >
			            update
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('This is required')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('This is required')).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray\\update.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray.test.tsx', () => {
        const sourceCode = `
			import React, \{ useState \} from 'react';
			import \{
			  act as actComponent,
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			\} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ Controller \} from '../controller';
			import \{
			  Control,
			  FieldValues,
			  SubmitHandler,
			  UseFormRegister,
			  UseFormReturn,
			\} from '../types';
			import \{ useFieldArray \} from '../useFieldArray';
			import \{ useForm \} from '../useForm';
			import \{ FormProvider \} from '../useFormContext';
			import \{ useFormState \} from '../useFormState';
			
			let i = 0;
			
			jest.mock('../logic/generateId', () => () => String(i++));
			
			describe('useFieldArray', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  describe('initialize', () => \{
			    it('should return default fields value', () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ control \} = useForm();
			        return useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			      \});
			
			      expect(result.current.fields).toEqual([]);
			    \});
			
			    it('should populate default values into fields', () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ control \} = useForm(\{
			          defaultValues: \{ test: [\{ test: '1' \}, \{ test: '2' \}] \},
			        \});
			        return useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			      \});
			
			      expect(result.current.fields).toEqual([
			        \{ test: '1', id: '0' \},
			        \{ test: '2', id: '1' \},
			      ]);
			    \});
			
			    it('should render with FormProvider', () => \{
			      const Provider = (\{ children \}: \{ children: React.ReactNode \}) => \{
			        const methods = useForm();
			        return <FormProvider \{...methods\}>\{children\}</FormProvider>;
			      \};
			      const \{ result \} = renderHook(() => useFieldArray(\{ name: 'test' \}), \{
			        wrapper: Provider,
			      \});
			      expect(result.error).toBeUndefined();
			    \});
			  \});
			
			  describe('with should unregister false', () => \{
			    it('should still remain input value with toggle', () => \{
			      const Component = () => \{
			        const \{ register, control \} = useForm<\{
			          test: \{
			            value: string;
			          \}[];
			        \}>();
			        const [show, setShow] = React.useState(true);
			        const \{ fields, append \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <form>
			            \{show &&
			              fields.map((field, i) => (
			                <input
			                  key=\{field.id\}
			                  \{...register(\`test.\$\{i\}.value\` as const)\}
			                />
			              ))\}
			            <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			              append
			            </button>
			            <button type="button" onClick=\{() => setShow(!show)\}>
			              toggle
			            </button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			      expect(screen.getAllByRole('textbox').length).toEqual(1);
			      fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
			      fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			      expect(screen.getAllByRole('textbox').length).toEqual(1);
			    \});
			
			    it('should show errors during mount when mode is set to onChange', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          control,
			          formState: \{ isValid, errors \},
			        \} = useForm<\{ test: \{ value: string \}[] \}>(\{
			          defaultValues: \{
			            test: [\{ value: 'test' \}],
			          \},
			          resolver: async () => (\{
			            values: \{\},
			            errors: \{
			              test: [\{ value: \{ message: 'wrong', type: 'test' \} \}],
			            \},
			          \}),
			          mode: 'onChange',
			        \});
			        const \{ fields, append \} = useFieldArray(\{ name: 'test', control \});
			
			        return (
			          <form>
			            \{fields.map((field, i) => (
			              <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			            ))\}
			            <button
			              type="button"
			              onClick=\{() =>
			                append(\{
			                  value: 'test',
			                \})
			              \}
			            >
			              append
			            </button>
			
			            \{!isValid && <p>not valid</p>\}
			            \{errors.test && <p>errors</p>\}
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      expect(await screen.findByRole('textbox')).toBeVisible();
			      expect(await screen.findByText('not valid')).toBeVisible();
			    \});
			
			    it('should retain input values during unmount', async () => \{
			      type FormValues = \{
			        test: \{ name: string \}[];
			      \};
			
			      const FieldArray = (\{
			        control,
			        register,
			      \}: \{
			        control: Control<FormValues>;
			        register: UseFormRegister<FormValues>;
			      \}) => \{
			        const \{ fields \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, index) => \{
			              return (
			                <div key=\{item.id\}>
			                  <input \{...register(\`test.\$\{index\}.name\`)\} />
			                </div>
			              );
			            \})\}
			          </div>
			        );
			      \};
			
			      const App = () => \{
			        const [show, setShow] = React.useState(true);
			        const \{ control, register \} = useForm(\{
			          shouldUnregister: false,
			          defaultValues: \{
			            test: [\{ name: 'test' \}],
			          \},
			        \});
			
			        return (
			          <div>
			            \{show && <FieldArray control=\{control\} register=\{register\} />\}
			            <button type=\{'button'\} onClick=\{() => setShow(!show)\}>
			              toggle
			            </button>
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{ value: '12345' \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        '12345',
			      );
			    \});
			  \});
			
			  describe('with resolver', () => \{
			    it('should provide updated form value each action', async () => \{
			      let formData = \{\};
			      const Component = () => \{
			        const \{
			          register,
			          control,
			          formState: \{ isValid \},
			        \} = useForm<\{
			          data: string;
			          test: \{ value: string \}[];
			        \}>(\{
			          resolver: (data) => \{
			            formData = data;
			            return \{
			              values: \{\},
			              errors: \{\},
			            \};
			          \},
			        \});
			        const \{ fields, append \} = useFieldArray(\{ name: 'test', control \});
			
			        return (
			          <div>
			            <input \{...register('data')\} defaultValue="test" />
			            \{fields.map((field, i) => (
			              <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			            ))\}
			            <button onClick=\{() => append(\{ value: '' \})\}>append</button>
			            <span>\{isValid && 'valid'\}</span>
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      expect(await screen.findByText('valid')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(formData).toEqual(\{
			        data: 'test',
			        test: [\{ value: '' \}],
			      \});
			    \});
			
			    it('should provide correct form data with nested field array', async () => \{
			      type FormValues = \{
			        test: \{
			          value: string;
			          nestedArray: \{
			            value: string;
			          \}[];
			        \}[];
			      \};
			
			      let formData: any = \{\};
			      const Nested = (\{
			        index,
			        control,
			      \}: \{
			        control: Control<FormValues>;
			        index: number;
			      \}) => \{
			        const \{ fields, append \} = useFieldArray<FormValues>(\{
			          name: \`test.\$\{index\}.nestedArray\` as const,
			          control,
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <input
			                key=\{item.id\}
			                \{...control.register(
			                  \`test.\$\{index\}.nestedArray.\$\{i\}.value\` as const,
			                )\}
			              />
			            ))\}
			
			            <button type=\{'button'\} onClick=\{() => append(\{ value: 'test' \})\}>
			              Append Nest
			            </button>
			          </div>
			        );
			      \};
			
			      const Component = () => \{
			        const \{
			          register,
			          control,
			          formState: \{ isValid \},
			        \} = useForm<FormValues>(\{
			          resolver: (data) => \{
			            formData = data;
			            return \{
			              values: data,
			              errors: \{\},
			            \};
			          \},
			          mode: 'onChange',
			          defaultValues: \{
			            test: [\{ value: '1', nestedArray: [\{ value: '2' \}] \}],
			          \},
			        \});
			        const \{ fields, remove \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			
			        return (
			          <form>
			            \{fields.map((item, i) => (
			              <fieldset key=\{item.id\}>
			                <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			
			                <Nested control=\{control\} index=\{i\} />
			                <button type=\{'button'\} onClick=\{() => remove(i)\}>
			                  delete
			                </button>
			              </fieldset>
			            ))\}
			            <span>\{isValid && 'valid'\}</span>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'Append Nest' \}));
			
			      expect(await screen.findByText('valid')).toBeVisible();
			
			      expect(formData).toEqual(\{
			        test: [
			          \{
			            value: '1',
			            nestedArray: [\{ value: '2' \}, \{ value: 'test' \}],
			          \},
			        ],
			      \});
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'delete' \}));
			
			      expect(formData).toEqual(\{
			        test: [],
			      \});
			    \});
			
			    it('should report field array error during user action', async () => \{
			      const App = () => \{
			        const \{
			          register,
			          control,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: \{ value: string \}[];
			        \}>(\{
			          mode: 'onChange',
			          resolver: (data) => \{
			            return \{
			              values: data,
			              errors: \{
			                test: \{
			                  type: 'test',
			                  message: 'minLength',
			                \},
			              \},
			            \};
			          \},
			          defaultValues: \{
			            test: [\{ value: '1' \}],
			          \},
			        \});
			        const \{ fields, remove \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			
			        return (
			          <form>
			            \{errors.test && <p>minLength</p>\}
			
			            \{fields.map((item, i) => (
			              <fieldset key=\{item.id\}>
			                <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			                <button type=\{'button'\} onClick=\{() => remove(i)\}>
			                  delete
			                </button>
			              </fieldset>
			            ))\}
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect(screen.queryByText('minLength')).not.toBeInTheDocument();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('minLength')).toBeVisible();
			    \});
			
			    it('should not return schema error without user action', () => \{
			      const App = () => \{
			        const \{
			          register,
			          control,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: \{ value: string \}[];
			        \}>(\{
			          mode: 'onChange',
			          resolver: (data) => \{
			            return \{
			              values: data,
			              errors: \{
			                test: \{
			                  type: 'test',
			                  message: 'minLength',
			                \},
			              \},
			            \};
			          \},
			          defaultValues: \{
			            test: [],
			          \},
			        \});
			        const \{ fields \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			
			        return (
			          <form>
			            \{errors.test && <p>minLength</p>\}
			
			            \{fields.map((item, i) => (
			              <fieldset key=\{item.id\}>
			                <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			              </fieldset>
			            ))\}
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect(screen.queryByText('minLength')).not.toBeInTheDocument();
			    \});
			
			    it('should update error when user action corrects it', async () => \{
			      const App = () => \{
			        const \{
			          register,
			          control,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: \{ value: string \}[];
			        \}>(\{
			          mode: 'onChange',
			          resolver: (data) => \{
			            if (data.test.length > 1) \{
			              return \{
			                values: data,
			                errors: \{\},
			              \};
			            \} else \{
			              return \{
			                values: data,
			                errors: \{
			                  test: \{
			                    type: 'test',
			                    message: 'minLength',
			                  \},
			                \},
			              \};
			            \}
			          \},
			          defaultValues: \{
			            test: [],
			          \},
			        \});
			        const \{ fields, append \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			
			        return (
			          <form>
			            \{errors.test && <p>minLength</p>\}
			            \{fields.map((item, i) => (
			              <input key=\{item.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			            ))\}
			            <button
			              type=\{'button'\}
			              onClick=\{() =>
			                append(\{
			                  value: '',
			                \})
			              \}
			            >
			              append
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() =>
			        expect(screen.queryByText('minLength')).toBeInTheDocument(),
			      );
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() =>
			        expect(screen.queryByText('minLength')).not.toBeInTheDocument(),
			      );
			    \});
			
			    it('should update error when array is changed', async () => \{
			      const App = () => \{
			        const \{
			          register,
			          control,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: \{ value: string \}[];
			        \}>(\{
			          mode: 'onChange',
			          resolver: (data) => \{
			            const errors: \{ test?: any \} = \{\};
			            if (data.test.length > 4) \{
			              errors.test = \{ type: 'toobig', message: 'WAY too many items' \};
			            \} else if (data.test.length > 3) \{
			              errors.test = \{ type: 'toobig', message: 'Too many items' \};
			            \}
			            for (const [index, item] of data.test.entries()) \{
			              if (item.value === '') \{
			                errors.test = errors.test || [];
			                errors.test[index] = \{
			                  value: \{ type: 'required', message: 'Required' \},
			                \};
			              \}
			            \}
			
			            return \{
			              values: data,
			              errors,
			            \};
			          \},
			          defaultValues: \{
			            test: [\{ value: '0' \}, \{ value: '1' \}, \{ value: '2' \}],
			          \},
			        \});
			        const \{ fields, append, remove \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			
			        return (
			          <form>
			            \{errors.test?.type && <p>Array error: \{errors.test.message\}</p>\}
			            \{fields.map((item, i) => (
			              <div key=\{item.id\}>
			                <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			                <button type="button" onClick=\{() => remove(i)\}>
			                  remove
			                </button>
			                \{errors.test?.[i]?.value && (
			                  <span>
			                    Item \{i\} error: \{errors.test?.[i]?.value?.message\}
			                  </span>
			                )\}
			              </div>
			            ))\}
			            <button
			              type="button"
			              onClick=\{() =>
			                append(\{
			                  value: fields.length.toString(),
			                \})
			              \}
			            >
			              append
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      await waitFor(() =>
			        expect(screen.queryByText('Array error:')).not.toBeInTheDocument(),
			      );
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      await waitFor(() =>
			        expect(
			          screen.queryByText('Array error: Too many items'),
			        ).toBeInTheDocument(),
			      );
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      await waitFor(() =>
			        expect(
			          screen.queryByText('Array error: WAY too many items'),
			        ).toBeInTheDocument(),
			      );
			
			      fireEvent.click(screen.getAllByRole('button', \{ name: 'remove' \})[0]);
			
			      await waitFor(() =>
			        expect(
			          screen.queryByText('Array error: Too many items'),
			        ).toBeInTheDocument(),
			      );
			
			      fireEvent.click(screen.getAllByRole('button', \{ name: 'remove' \})[0]);
			
			      await waitFor(() =>
			        expect(screen.queryByText('Array error:')).not.toBeInTheDocument(),
			      );
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{ value: '' \},
			      \});
			
			      await waitFor(() =>
			        expect(
			          screen.queryByText('Item 0 error: Required'),
			        ).toBeInTheDocument(),
			      );
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      await waitFor(() => \{
			        expect(
			          screen.queryByText('Array error: Too many items'),
			        ).toBeInTheDocument();
			        expect(
			          screen.queryByText('Item 0 error: Required'),
			        ).toBeInTheDocument();
			      \});
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      await waitFor(() => \{
			        expect(
			          screen.queryByText('Array error: WAY too many items'),
			        ).toBeInTheDocument();
			        expect(
			          screen.queryByText('Item 0 error: Required'),
			        ).toBeInTheDocument();
			      \});
			
			      fireEvent.click(screen.getAllByRole('button', \{ name: 'remove' \})[4]);
			
			      await waitFor(() => \{
			        expect(
			          screen.queryByText('Array error: Too many items'),
			        ).toBeInTheDocument();
			        expect(
			          screen.queryByText('Item 0 error: Required'),
			        ).toBeInTheDocument();
			      \});
			
			      fireEvent.click(screen.getAllByRole('button', \{ name: 'remove' \})[3]);
			
			      await waitFor(() => \{
			        expect(
			          screen.queryByText('Array error: Too many items'),
			        ).not.toBeInTheDocument();
			        expect(
			          screen.queryByText('Item 0 error: Required'),
			        ).toBeInTheDocument();
			      \});
			    \});
			  \});
			
			  describe('when component unMount', () => \{
			    it('should keep field array values', async () => \{
			      let getValues: any;
			      const Component = () => \{
			        const [show, setShow] = React.useState(true);
			        const \{ register, control, getValues: tempGetValues \} = useForm();
			        const \{ fields, append \} = useFieldArray(\{ name: 'test', control \});
			        getValues = tempGetValues;
			
			        return (
			          <>
			            \{show && (
			              <div>
			                \{fields.map((_, i) => (
			                  <input key=\{i.toString()\} \{...register(\`test.\$\{i\}.value\`)\} />
			                ))\}
			                <button onClick=\{() => append(\{ value: '' \})\}>append</button>
			              </div>
			            )\}
			            <button type=\{'button'\} onClick=\{() => setShow(!show)\}>
			              setShow
			            </button>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      const button = screen.getByRole('button', \{ name: /append/i \});
			
			      fireEvent.click(button);
			
			      fireEvent.click(button);
			
			      fireEvent.click(button);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setShow' \}));
			
			      expect(getValues()).toEqual(\{
			        test: [\{ value: '' \}, \{ value: '' \}, \{ value: '' \}],
			      \});
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setShow' \}));
			      expect(screen.getAllByRole('textbox').length).toEqual(3);
			    \});
			
			    it('should remove reset method when field array is removed', () => \{
			      let controlTemp: any;
			      let fieldsTemp: unknown[] = [];
			
			      const App = () => \{
			        const \{ register, control \} = useForm(\{
			          defaultValues: \{
			            test: [\{ value: 'default' \}],
			          \},
			        \});
			        const \{ fields, append \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			        controlTemp = control;
			        fieldsTemp = fields;
			
			        return (
			          <form>
			            \{fields.map((field) => \{
			              return <input key=\{field.id\} \{...register('test.0.value')\} />;
			            \})\}
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                append(\{
			                  value: 'test',
			                \});
			              \}\}
			            >
			              append
			            </button>
			          </form>
			        );
			      \};
			
			      const \{ unmount \} = render(<App />);
			
			      expect(fieldsTemp).toEqual([\{ id: '0', value: 'default' \}]);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(fieldsTemp).toEqual([
			        \{ id: '0', value: 'default' \},
			        \{
			          id: '1',
			          value: 'test',
			        \},
			      ]);
			
			      unmount();
			
			      expect(controlTemp._names.array).toEqual(new Set(['test']));
			      expect(fieldsTemp).toEqual([
			        \{ id: '0', value: 'default' \},
			        \{
			          id: '1',
			          value: 'test',
			        \},
			      ]);
			    \});
			
			    it('should unset field array values correctly on DOM removing', async () => \{
			      interface NestedComponentProps
			        extends Pick<UseFormReturn<FormValues>, 'control' | 'register'> \{
			        childIndex: number;
			      \}
			
			      type FormValues = \{
			        test: \{
			          title: string;
			          nested: \{
			            name: string;
			          \}[];
			        \}[];
			        title: string;
			      \};
			
			      const NestedComponent = (\{
			        childIndex,
			        control,
			        register,
			      \}: NestedComponentProps) => \{
			        const \{ fields \} = useFieldArray(\{
			          control,
			          name: \`test.\$\{childIndex\}.nested\` as \`test.0.nested\`,
			        \});
			
			        return (
			          <div>
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <input
			                    \{...register(
			                      \`test.\$\{childIndex\}.nested.\$\{index\}.name\` as const,
			                    )\}
			                  />
			                </div>
			              );
			            \})\}
			          </div>
			        );
			      \};
			
			      const Component = () => \{
			        const \{ control, register \} = useForm<FormValues>();
			        const \{ fields, append, remove \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <form>
			            <input \{...register('title')\} />
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <input \{...register(\`test.\$\{index\}.title\` as const)\} />
			                  <button type="button" onClick=\{() => remove(index)\}>
			                    Remove child
			                  </button>
			                  <NestedComponent
			                    childIndex=\{index\}
			                    control=\{control\}
			                    register=\{register\}
			                  />
			                </div>
			              );
			            \})\}
			            <button
			              type="button"
			              onClick=\{() => append(\{ title: 'test', nested: [] \})\}
			            >
			              Add child
			            </button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      const addChild = () => fireEvent.click(screen.getByText('Add child'));
			
			      addChild();
			
			      expect(screen.getByText('Remove child')).toBeInTheDocument();
			
			      fireEvent.click(screen.getByText('Remove child'));
			
			      expect(screen.queryByText('Remove child')).not.toBeInTheDocument();
			
			      addChild();
			
			      expect(screen.getByText('Remove child')).toBeInTheDocument();
			    \});
			  \});
			
			  describe('with should unregister true', () => \{
			    it('should not unregister field if unregister method is triggered', () => \{
			      let getValues: any;
			      const Component = () => \{
			        const \{
			          register,
			          unregister,
			          control,
			          getValues: tempGetValues,
			        \} = useForm();
			        const \{ fields, append \} = useFieldArray(\{ name: 'test', control \});
			        getValues = tempGetValues;
			
			        React.useEffect(() => \{
			          if (fields.length >= 3) \{
			            unregister('test');
			          \}
			        \}, [fields, unregister]);
			
			        return (
			          <div>
			            \{fields.map((field, i) => (
			              <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\`)\} />
			            ))\}
			            <button type=\{'button'\} onClick=\{() => append(\{ value: '' \})\}>
			              append
			            </button>
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      const button = screen.getByRole('button', \{ name: /append/i \});
			
			      fireEvent.click(button);
			      fireEvent.click(button);
			      fireEvent.click(button);
			
			      expect(getValues()).toEqual(\{
			        test: [\{ value: '' \}, \{ value: '' \}, \{ value: '' \}],
			      \});
			    \});
			
			    it('should remove field array after useFieldArray is unmounted', () => \{
			      type FormValues = \{
			        test: \{ name: string \}[];
			      \};
			
			      const FieldArray = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			        const \{ fields \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, index) => \{
			              return (
			                <input key=\{item.id\} name=\{\`test.\$\{index\}.name\` as const\} />
			              );
			            \})\}
			          </div>
			        );
			      \};
			
			      const App = () => \{
			        const [show, setShow] = React.useState(true);
			        const \{ control \} = useForm<FormValues>(\{
			          shouldUnregister: true,
			          defaultValues: \{
			            test: [\{ name: 'test' \}],
			          \},
			        \});
			
			        return (
			          <div>
			            \{show && <FieldArray control=\{control\} />\}
			            <button type=\{'button'\} onClick=\{() => setShow(!show)\}>
			              toggle
			            </button>
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      expect(screen.getByRole('textbox')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
			    \});
			  \});
			
			  describe('setError', () => \{
			    it('should be able to set an field array error', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          setError,
			          control,
			          formState: \{ errors \},
			        \} = useForm();
			        const \{ fields, append, remove \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			
			        React.useEffect(() => \{
			          if (fields.length === 0) \{
			            setError('test', \{
			              type: 'min length',
			            \});
			          \}
			        \}, [fields, setError]);
			
			        return (
			          <div>
			            \{fields.map((_, i) => (
			              <div key=\{i.toString()\}>
			                <input \{...register(\`test.\$\{i\}.value\`)\} />
			                <button type=\{'button'\} onClick=\{() => remove(i)\}>
			                  delete
			                </button>
			              </div>
			            ))\}
			            <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			              append
			            </button>
			            <button>submit</button>
			            <p>\{errors.test && 'Error'\}</p>
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'delete' \}));
			
			      expect(await screen.findByText('Error')).toBeVisible();
			    \});
			  \});
			
			  describe('with reset', () => \{
			    it('should reset with field array', async () => \{
			      let fieldsTemp: unknown[] = [];
			
			      const App = () => \{
			        const \{ register, reset, control \} = useForm(\{
			          defaultValues: \{
			            test: [\{ value: 'default' \}],
			          \},
			        \});
			        const \{ fields, append \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			        fieldsTemp = fields;
			
			        return (
			          <form>
			            \{fields.map((field, index) => \{
			              return (
			                <input key=\{field.id\} \{...register(\`test.\$\{index\}.value\`)\} />
			              );
			            \})\}
			
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                append(\{ value: 'test' \});
			              \}\}
			            >
			              append
			            </button>
			
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                reset();
			              \}\}
			            >
			              reset
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			      expect(fieldsTemp).toEqual([\{ id: '4', value: 'default' \}]);
			    \});
			
			    it('should reset with field array with shouldUnregister set to false', () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ register, reset, control \} = useForm(\{
			          defaultValues: \{
			            test: [\{ value: 'default' \}],
			          \},
			        \});
			        const \{ fields, append \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			        return \{ register, reset, fields, append \};
			      \});
			
			      act(() => \{
			        result.current.append(\{ value: 'test' \});
			      \});
			
			      result.current.register('test.0.value');
			
			      act(() => \{
			        result.current.reset();
			      \});
			
			      expect(result.current.fields).toEqual([\{ id: '4', value: 'default' \}]);
			
			      act(() => \{
			        result.current.reset(\{
			          test: [\{ value: 'data' \}],
			        \});
			      \});
			
			      expect(result.current.fields).toEqual([\{ id: '6', value: 'data' \}]);
			    \});
			
			    it('should reset with async', async () => \{
			      type FormValues = \{
			        test: \{
			          value: string;
			          nestedArray: \{
			            value: string;
			          \}[];
			        \}[];
			      \};
			
			      const Nested = (\{
			        index,
			        control,
			      \}: \{
			        control: Control<FormValues>;
			        index: number;
			      \}) => \{
			        const \{ fields \} = useFieldArray<FormValues>(\{
			          name: \`test.\$\{index\}.nestedArray\` as const,
			          control,
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <input
			                key=\{item.id\}
			                \{...control.register(
			                  \`test.\$\{index\}.nestedArray.\$\{i\}.value\` as const,
			                )\}
			              />
			            ))\}
			          </div>
			        );
			      \};
			
			      const Component = () => \{
			        const \{ register, reset, control \} = useForm<FormValues>();
			        const \{ fields \} = useFieldArray(\{
			          name: 'test',
			          control,
			        \});
			
			        React.useEffect(() => \{
			          setTimeout(() => \{
			            reset(\{
			              test: [
			                \{ value: '1', nestedArray: [\{ value: '2' \}] \},
			                \{ value: '3', nestedArray: [\{ value: '4' \}] \},
			              ],
			            \});
			          \});
			        \}, [reset]);
			
			        return (
			          <form>
			            \{fields.map((item, i) => (
			              <fieldset key=\{item.id\}>
			                <input \{...register(\`test.\$\{i\}.value\` as const)\} />
			
			                <Nested control=\{control\} index=\{i\} />
			              </fieldset>
			            ))\}
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      await waitFor(() =>
			        expect(screen.getAllByRole('textbox')).toHaveLength(4),
			      );
			    \});
			  \});
			
			  describe('with setValue', () => \{
			    it.each(['isDirty', 'dirtyFields'])(
			      'should set name to dirtyFieldRef if array field values are different with default value when formState.%s is defined',
			      async (property) => \{
			        let setValue: any;
			        let formState: any;
			        const Component = () => \{
			          const \{
			            register,
			            control,
			            formState: tempFormState,
			            setValue: tempSetValue,
			            watch,
			          \} = useForm(\{
			            defaultValues: \{
			              test: [
			                \{ name: 'default' \},
			                \{ name: 'default1' \},
			                \{ name: 'default2' \},
			              ],
			            \},
			          \});
			          const \{ fields \} = useFieldArray(\{ name: 'test', control \});
			          watch();
			
			          setValue = tempSetValue;
			          formState = tempFormState;
			          formState[property];
			
			          return (
			            <form>
			              \{fields.map((field, i) => (
			                <input
			                  key=\{field.id\}
			                  \{...register(\`test.\$\{i\}.name\` as const)\}
			                />
			              ))\}
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        await actComponent(async () => \{
			          setValue(
			            'test',
			            [
			              \{ name: 'default_update' \},
			              \{ name: 'default1' \},
			              \{ name: 'default2' \},
			            ],
			            \{ shouldDirty: true \},
			          );
			        \});
			
			        if (property === 'dirtyFields') \{
			          expect(formState.dirtyFields).toEqual(\{
			            test: [\{ name: true \}, \{ name: false \}, \{ name: false \}],
			          \});
			        \} else \{
			          expect(formState.isDirty).toBeTruthy();
			        \}
			      \},
			    );
			
			    it.each(['dirtyFields'])(
			      'should unset name from dirtyFieldRef if array field values are not different with default value when formState.%s is defined',
			      (property) => \{
			        let setValue: any;
			        let formState: any;
			        const Component = () => \{
			          const \{
			            register,
			            control,
			            formState: tempFormState,
			            setValue: tempSetValue,
			          \} = useForm(\{
			            defaultValues: \{
			              test: [
			                \{ name: 'default' \},
			                \{ name: 'default1' \},
			                \{ name: 'default2' \},
			              ],
			            \},
			          \});
			          const \{ fields \} = useFieldArray(\{ name: 'test', control \});
			
			          setValue = tempSetValue;
			          formState = tempFormState;
			          formState[property];
			
			          return (
			            <form>
			              \{fields.map((field, i) => (
			                <input
			                  key=\{field.id\}
			                  \{...register(\`test.\$\{i\}.name\` as const)\}
			                />
			              ))\}
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        actComponent(() => \{
			          setValue(
			            'test',
			            [
			              \{ name: 'default_update' \},
			              \{ name: 'default1' \},
			              \{ name: 'default2' \},
			            ],
			            \{ shouldDirty: true \},
			          );
			        \});
			
			        if (property === 'dirtyFields') \{
			          expect(formState.dirtyFields).toEqual(\{
			            test: [\{ name: true \}, \{ name: false \}, \{ name: false \}],
			          \});
			        \} else \{
			          expect(formState.isDirty).toBeTruthy();
			        \}
			
			        actComponent(() => \{
			          setValue(
			            'test',
			            [\{ name: 'default' \}, \{ name: 'default1' \}, \{ name: 'default2' \}],
			            \{ shouldDirty: true \},
			          );
			        \});
			
			        expect(formState.dirtyFields).toEqual(\{
			          test: [
			            \{
			              name: false,
			            \},
			            \{
			              name: false,
			            \},
			            \{
			              name: false,
			            \},
			          ],
			        \});
			        expect(formState.isDirty).toBeFalsy();
			      \},
			    );
			
			    it('should set nested field array correctly', async () => \{
			      type FormValues = \{
			        test: \{
			          firstName: string;
			          lastName: string;
			          keyValue: \{ name: string \}[];
			        \}[];
			      \};
			
			      function NestedArray(\{
			        control,
			        index,
			      \}: \{
			        control: Control<FormValues>;
			        index: number;
			      \}) \{
			        const \{ fields \} = useFieldArray(\{
			          name: \`test.\$\{index\}.keyValue\` as 'test.0.keyValue',
			          control,
			        \});
			
			        return (
			          <ul>
			            \{fields.map((item, i) => (
			              <Controller
			                key=\{item.id\}
			                render=\{(\{ field \}) => (
			                  <input
			                    \{...field\}
			                    aria-label=\{\`test.\$\{index\}.keyValue.\$\{i\}.name\`\}
			                  />
			                )\}
			                name=\{\`test.\$\{index\}.keyValue.\$\{i\}.name\` as const\}
			                control=\{control\}
			              />
			            ))\}
			          </ul>
			        );
			      \}
			
			      function Component() \{
			        const \{ register, control, setValue \} = useForm<FormValues>(\{
			          defaultValues: \{
			            test: [
			              \{
			                firstName: 'Bill',
			                lastName: 'Luo',
			                keyValue: [\{ name: '1a' \}, \{ name: '1c' \}],
			              \},
			            ],
			          \},
			        \});
			        const \{ fields \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <form>
			            \{fields.map((item, index) => \{
			              return (
			                <div key=\{item.id\}>
			                  <input
			                    aria-label=\{\`test.\$\{index\}.firstName\`\}
			                    \{...register(\`test.\$\{index\}.firstName\` as const)\}
			                  />
			                  <NestedArray control=\{control\} index=\{index\} />
			                </div>
			              );
			            \})\}
			            <button
			              type="button"
			              onClick=\{() => setValue('test.0.keyValue', [\{ name: '2a' \}])\}
			            >
			              setValue
			            </button>
			          </form>
			        );
			      \}
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setValue' \}));
			
			      const input = screen.getByLabelText(
			        'test.0.keyValue.0.name',
			      ) as HTMLInputElement;
			
			      expect(input.value).toEqual('2a');
			
			      expect(
			        (screen.getByLabelText('test.0.firstName') as HTMLInputElement).value,
			      ).toEqual('Bill');
			    \});
			  \});
			
			  describe('array of array fields', () => \{
			    it('should remove correctly with nested field array and set shouldUnregister to false', () => \{
			      type FormValues = \{
			        fieldArray: \{
			          value: string;
			          nestedFieldArray: \{
			            value: string;
			          \}[];
			        \}[];
			      \};
			
			      const ArrayField = (\{
			        arrayIndex,
			        register,
			        control,
			      \}: \{
			        arrayIndex: number;
			        register: UseFormReturn<FormValues>['register'];
			        arrayField: Partial<FieldValues>;
			        control: Control<FormValues>;
			      \}) => \{
			        const \{ fields, append, remove \} = useFieldArray<FormValues>(\{
			          name: \`fieldArray.\$\{arrayIndex\}.nestedFieldArray\` as const,
			          control,
			        \});
			
			        return (
			          <div>
			            <input \{...register(\`fieldArray.\$\{arrayIndex\}.value\` as const)\} />
			            \{fields.map((nestedField, index) => (
			              <div key=\{nestedField.id\}>
			                <input
			                  \{...register(
			                    \`fieldArray.\$\{arrayIndex\}.nestedFieldArray.\$\{index\}.value\` as const,
			                  )\}
			                />
			                <button type="button" onClick=\{() => remove(index)\}>
			                  remove
			                </button>
			              </div>
			            ))\}
			            <button
			              type="button"
			              onClick=\{() => \{
			                append(\{
			                  value:
			                    \`fieldArray.\$\{arrayIndex\}.nestedFieldArray.\$\{fields.length\}.value\` as const,
			                \});
			              \}\}
			            >
			              Add nested array
			            </button>
			          </div>
			        );
			      \};
			
			      const Component = () => \{
			        const \{ register, control \} = useForm<FormValues>();
			        const \{ fields, append \} = useFieldArray(\{
			          name: 'fieldArray',
			          control,
			        \});
			
			        return (
			          <form>
			            \{fields.map((field, index) => (
			              <ArrayField
			                key=\{field.id\}
			                arrayIndex=\{index\}
			                arrayField=\{field\}
			                register=\{register\}
			                control=\{control\}
			              />
			            ))\}
			
			            <button
			              type="button"
			              onClick=\{() => \{
			                append(\{
			                  value: \`fieldArray[\$\{fields.length\}].value\`,
			                  nestedFieldArray: [],
			                \});
			              \}\}
			            >
			              Add array
			            </button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(
			        screen.getByRole('button', \{
			          name: 'Add array',
			        \}),
			      );
			
			      fireEvent.click(
			        screen.getByRole('button', \{
			          name: 'Add nested array',
			        \}),
			      );
			
			      fireEvent.click(
			        screen.getByRole('button', \{
			          name: 'Add nested array',
			        \}),
			      );
			
			      fireEvent.click(
			        screen.getAllByRole('button', \{
			          name: 'remove',
			        \})[0],
			      );
			
			      fireEvent.click(
			        screen.getAllByRole('button', \{
			          name: 'remove',
			        \})[0],
			      );
			
			      expect(screen.getAllByRole('textbox').length).toEqual(1);
			    \});
			
			    it('should prepend correctly with default values on nested array fields', () => \{
			      type FormInputs = \{
			        nest: \{
			          test: \{
			            value: string;
			            nestedArray: \{ value: string \}[];
			          \}[];
			        \};
			      \};
			
			      const ChildComponent = (\{
			        index,
			        control,
			      \}: \{
			        control: Control<FormInputs>;
			        index: number;
			      \}) => \{
			        const \{ fields \} = useFieldArray<FormInputs>(\{
			          name: \`nest.test.\$\{index\}.nestedArray\` as const,
			          control,
			        \});
			
			        return (
			          <>
			            \{fields.map((item, i) => (
			              <input
			                key=\{item.id\}
			                \{...control.register(
			                  \`nest.test.\$\{index\}.nestedArray.\$\{i\}.value\` as const,
			                )\}
			              />
			            ))\}
			          </>
			        );
			      \};
			
			      const Component = () => \{
			        const \{ register, control \} = useForm<FormInputs>(\{
			          defaultValues: \{
			            nest: \{
			              test: [
			                \{ value: '1', nestedArray: [\{ value: '2' \}, \{ value: '3' \}] \},
			                \{ value: '4', nestedArray: [\{ value: '5' \}] \},
			              ],
			            \},
			          \},
			        \});
			        const \{ fields, prepend \} = useFieldArray(\{
			          name: 'nest.test',
			          control,
			        \});
			
			        return (
			          <>
			            \{fields.map((item, i) => (
			              <div key=\{item.id\}>
			                <input \{...register(\`nest.test.\$\{i\}.value\` as const)\} />
			                <ChildComponent control=\{control\} index=\{i\} />
			              </div>
			            ))\}
			
			            <button
			              type=\{'button'\}
			              onClick=\{() => prepend(\{ value: 'test', nestedArray: [] \})\}
			            >
			              prepend
			            </button>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      expect(screen.getAllByRole('textbox')).toHaveLength(5);
			
			      fireEvent.click(screen.getByRole('button', \{ name: /prepend/i \}));
			
			      expect(screen.getAllByRole('textbox')).toHaveLength(6);
			
			      expect(
			        (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			      ).toEqual('test');
			    \});
			
			    it('should render correct amount of child array fields', async () => \{
			      type FormValues = \{
			        nest: \{
			          test: \{
			            value: string;
			            nestedArray: \{
			              value: string;
			            \}[];
			          \}[];
			        \};
			      \};
			      const ChildComponent = (\{
			        index,
			        control,
			      \}: \{
			        control: Control<FormValues>;
			        index: number;
			      \}) => \{
			        const \{ fields \} = useFieldArray<FormValues>(\{
			          name: \`nest.test.\$\{index\}.nestedArray\` as const,
			          control,
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <input
			                key=\{item.id\}
			                \{...control.register(
			                  \`nest.test.\$\{index\}.nestedArray.\$\{i\}.value\` as const,
			                )\}
			              />
			            ))\}
			          </div>
			        );
			      \};
			
			      const Component = () => \{
			        const \{ register, control \} = useForm(\{
			          defaultValues: \{
			            nest: \{
			              test: [
			                \{ value: '1', nestedArray: [\{ value: '2' \}] \},
			                \{ value: '3', nestedArray: [\{ value: '4' \}] \},
			              ],
			            \},
			          \},
			        \});
			        const \{ fields, remove, append \} = useFieldArray(\{
			          name: 'nest.test',
			          control,
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <div key=\{item.id\}>
			                <input \{...register(\`nest.test.\$\{i\}.value\` as const)\} />
			
			                <ChildComponent control=\{control\} index=\{i\} />
			
			                <button
			                  type=\{'button'\}
			                  onClick=\{() => remove(i)\}
			                  data-testid=\{item.value\}
			                >
			                  remove
			                </button>
			              </div>
			            ))\}
			
			            <button
			              type=\{'button'\}
			              onClick=\{() => append(\{ value: 'test', nestedArray: [] \})\}
			            >
			              append
			            </button>
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      expect(screen.getAllByRole('textbox')).toHaveLength(4);
			
			      fireEvent.click(screen.getByTestId('1'));
			
			      expect(screen.getAllByRole('textbox')).toHaveLength(2);
			
			      fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			      expect(screen.getAllByRole('textbox')).toHaveLength(3);
			    \});
			
			    it('should populate all array fields with setValue when name match Field Array', () => \{
			      type FormInputs = \{
			        nest: \{
			          value: number;
			          nestedArray: \{
			            value: number;
			          \}[];
			        \}[];
			      \};
			
			      const ChildComponent = (\{
			        index,
			        control,
			      \}: \{
			        control: Control<FormInputs>;
			        index: number;
			      \}) => \{
			        const \{ fields \} = useFieldArray<FormInputs>(\{
			          name: \`nest.\$\{index\}.nestedArray\` as const,
			          control,
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <label key=\{item.id\}>
			                \{\`nest.\$\{index\}.nestedArray.\$\{i\}.value\`\}
			                <input
			                  \{...control.register(
			                    \`nest.\$\{index\}.nestedArray.\$\{i\}.value\` as const,
			                  )\}
			                />
			              </label>
			            ))\}
			          </div>
			        );
			      \};
			
			      const Component = () => \{
			        const \{ register, control, setValue \} = useForm<FormInputs>();
			        const \{ fields \} = useFieldArray(\{
			          name: 'nest',
			          control,
			        \});
			
			        React.useEffect(() => \{
			          setValue('nest', [
			            \{
			              value: 1,
			              nestedArray: [
			                \{
			                  value: 11,
			                \},
			              ],
			            \},
			            \{
			              value: 2,
			              nestedArray: [
			                \{
			                  value: 21,
			                \},
			              ],
			            \},
			          ]);
			        \}, [setValue]);
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <div key=\{item.id\}>
			                <label>
			                  \{\`nest.\$\{i\}.value\`\}
			                  <input \{...register(\`nest.\$\{i\}.value\` as const)\} />
			                </label>
			
			                <ChildComponent control=\{control\} index=\{i\} />
			              </div>
			            ))\}
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      const nestInput0 = screen.getByRole('textbox', \{
			        name: 'nest.0.value',
			      \});
			      const nestInput1 = screen.getByRole('textbox', \{ name: 'nest.1.value' \});
			      const nestedArrayInput0 = screen.getByRole('textbox', \{
			        name: 'nest.0.nestedArray.0.value',
			      \});
			      const nestedArrayInput1 = screen.getByRole('textbox', \{
			        name: 'nest.1.nestedArray.0.value',
			      \});
			
			      expect(nestInput0).toHaveValue('1');
			      expect(nestedArrayInput0).toHaveValue('11');
			      expect(nestInput1).toHaveValue('2');
			      expect(nestedArrayInput1).toHaveValue('21');
			    \});
			
			    it('should populate all array fields correctly with setValue', () => \{
			      type FormValues = \{
			        nest: \{
			          value: number;
			          nestedArray: \{ value: number \}[];
			        \}[];
			      \};
			
			      const ChildComponent = (\{
			        index,
			        control,
			      \}: \{
			        control: Control<FormValues>;
			        index: number;
			      \}) => \{
			        const \{ fields \} = useFieldArray<FormValues>(\{
			          name: \`nest.\$\{index\}.nestedArray\` as const,
			          control,
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <label key=\{item.id\}>
			                \{\`nest.\$\{index\}.nestedArray.\$\{i\}.value\`\}
			                <input
			                  \{...control.register(
			                    \`nest.\$\{index\}.nestedArray.\$\{i\}.value\` as const,
			                  )\}
			                />
			              </label>
			            ))\}
			          </div>
			        );
			      \};
			
			      const Component = () => \{
			        const \{ register, control, setValue \} = useForm<FormValues>();
			        const \{ fields \} = useFieldArray(\{
			          name: 'nest',
			          control,
			        \});
			
			        React.useEffect(() => \{
			          setValue(
			            'nest',
			            [
			              \{
			                value: 1,
			                nestedArray: [
			                  \{
			                    value: 11,
			                  \},
			                ],
			              \},
			              \{
			                value: 2,
			                nestedArray: [
			                  \{
			                    value: 21,
			                  \},
			                ],
			              \},
			            ],
			            \{ shouldDirty: true \},
			          );
			        \}, [setValue]);
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <div key=\{item.id\}>
			                <label>
			                  \{\`nest.\$\{i\}.value\`\}
			                  <input \{...register(\`nest.\$\{i\}.value\` as const)\} />
			                </label>
			
			                <ChildComponent control=\{control\} index=\{i\} />
			              </div>
			            ))\}
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      const nestInput0 = screen.getByRole('textbox', \{ name: 'nest.0.value' \});
			      const nestInput1 = screen.getByRole('textbox', \{ name: 'nest.1.value' \});
			      const nestedArrayInput0 = screen.getByRole('textbox', \{
			        name: 'nest.0.nestedArray.0.value',
			      \});
			      const nestedArrayInput1 = screen.getByRole('textbox', \{
			        name: 'nest.1.nestedArray.0.value',
			      \});
			
			      expect(nestInput0).toHaveValue('1');
			      expect(nestedArrayInput0).toHaveValue('11');
			      expect(nestInput1).toHaveValue('2');
			      expect(nestedArrayInput1).toHaveValue('21');
			    \});
			
			    it('should worked with deep nested field array without chaining useFieldArray', () => \{
			      type FormValues = \{
			        nest: \{
			          value: string;
			          nestedArray: \{ deepNest: \{ value: string \}[] \};
			        \}[];
			      \};
			
			      const ChildComponent = (\{
			        index,
			        control,
			      \}: \{
			        control: Control<FormValues>;
			        index: number;
			      \}) => \{
			        const \{ fields, append \} = useFieldArray<FormValues>(\{
			          name: \`nest.\$\{index\}.nestedArray.deepNest\` as const,
			          control,
			        \});
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <label key=\{item.id\}>
			                \{\`nest.\$\{index\}.nestedArray.deepNest.\$\{i\}.value\`\}
			                <input
			                  \{...control.register(
			                    \`nest.\$\{index\}.nestedArray.deepNest.\$\{i\}.value\` as const,
			                  )\}
			                />
			              </label>
			            ))\}
			            <button type=\{'button'\} onClick=\{() => append(\{ value: 'test' \})\}>
			              append
			            </button>
			          </div>
			        );
			      \};
			
			      const Component = () => \{
			        const \{ register, control, setValue, reset \} = useForm<FormValues>();
			        const \{ fields \} = useFieldArray(\{
			          name: 'nest',
			          control,
			        \});
			
			        React.useEffect(() => \{
			          reset(\{
			            nest: [
			              \{
			                value: '1',
			                nestedArray: \{
			                  deepNest: [
			                    \{
			                      value: '1',
			                    \},
			                  ],
			                \},
			              \},
			            ],
			          \});
			        \}, [reset]);
			
			        return (
			          <div>
			            \{fields.map((item, i) => (
			              <div key=\{item.id\}>
			                <label>
			                  \{\`nest.\$\{i\}.value\`\}
			                  <input \{...register(\`nest.\$\{i\}.value\` as const)\} />
			                </label>
			                <ChildComponent control=\{control\} index=\{i\} />
			                <button
			                  type=\{'button'\}
			                  onClick=\{() => \{
			                    setValue(
			                      'nest',
			                      [
			                        \{
			                          value: 'newV1',
			                          nestedArray: \{
			                            deepNest: [
			                              \{
			                                value: 'new1',
			                              \},
			                              \{
			                                value: 'new2',
			                              \},
			                              \{
			                                value: 'new3',
			                              \},
			                            ],
			                          \},
			                        \},
			                      ],
			                      \{ shouldDirty: true \},
			                    );
			                  \}\}
			                >
			                  setValue
			                </button>
			              </div>
			            ))\}
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      expect(screen.getAllByRole('textbox')).toHaveLength(2);
			      const nestInput = screen.getByRole('textbox', \{ name: 'nest.0.value' \});
			      const deepNestInput0 = screen.getByRole('textbox', \{
			        name: 'nest.0.nestedArray.deepNest.0.value',
			      \});
			
			      expect(nestInput).toHaveValue('1');
			      expect(deepNestInput0).toHaveValue('1');
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setValue' \}));
			
			      const deepNestInput1 = screen.getByRole('textbox', \{
			        name: 'nest.0.nestedArray.deepNest.1.value',
			      \});
			      const deepNestInput2 = screen.getByRole('textbox', \{
			        name: 'nest.0.nestedArray.deepNest.2.value',
			      \});
			
			      expect(screen.getByRole('textbox', \{ name: 'nest.0.value' \})).toHaveValue(
			        'newV1',
			      );
			      expect(
			        screen.getByRole('textbox', \{
			          name: 'nest.0.nestedArray.deepNest.0.value',
			        \}),
			      ).toHaveValue('new1');
			      expect(deepNestInput1).toHaveValue('new2');
			      expect(deepNestInput2).toHaveValue('new3');
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      const deepNestInput3 = screen.getByRole('textbox', \{
			        name: 'nest.0.nestedArray.deepNest.3.value',
			      \});
			      expect(deepNestInput3).toHaveValue('test');
			    \});
			
			    it('should allow append with deeply nested field array even with flat structure', async () => \{
			      const watchValue: unknown[] = [];
			
			      const App = () => \{
			        const [data, setData] = React.useState(\{\});
			        const \{ control, handleSubmit, watch \} = useForm<\{
			          test: \{
			            yourDetails: \{
			              firstName: string[];
			              lastName: string[];
			            \};
			          \}[];
			        \}>();
			        const \{ fields, append \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        watchValue.push(watch());
			
			        return (
			          <form
			            onSubmit=\{handleSubmit((data) => \{
			              setData(data);
			            \})\}
			          >
			            \{fields.map((field) => \{
			              return <div key=\{field.id\} />;
			            \})\}
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                append(\{
			                  yourDetails: \{
			                    firstName: ['test', 'test1'],
			                    lastName: ['test', 'test1'],
			                  \},
			                \});
			              \}\}
			            >
			              append
			            </button>
			            <button>submit</button>
			            <p>\{JSON.stringify(data)\}</p>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect(watchValue.at(-1)).toEqual(\{ test: [] \});
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			      expect(watchValue.at(-1)).toEqual(\{
			        test: [
			          \{
			            yourDetails: \{
			              firstName: ['test', 'test1'],
			              lastName: ['test', 'test1'],
			            \},
			          \},
			        ],
			      \});
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			      expect(
			        await screen.findByText(
			          '\{"test":[\{"yourDetails":\{"firstName":["test","test1"],"lastName":["test","test1"]\}\}]\}',
			        ),
			      ).toBeVisible();
			
			      // Let's check all values of renders with implicitly the number of render (for each value)
			      expect(watchValue).toMatchSnapshot();
			    \});
			  \});
			
			  describe('submit form', () => \{
			    it('should not leave defaultValues as empty array', async () => \{
			      let submitData: any;
			      type FormValues = \{
			        test: \{
			          value: string;
			        \}[];
			      \};
			      const Component = () => \{
			        const \{ register, control, handleSubmit \} = useForm<FormValues>(\{
			          defaultValues: \{
			            test: [],
			          \},
			        \});
			        const \{ fields \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			        const onSubmit: SubmitHandler<FormValues> = (data) => \{
			          submitData = data;
			        \};
			
			        return (
			          <form onSubmit=\{handleSubmit(onSubmit)\}>
			            \{fields.map((field, i) => (
			              <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			            ))\}
			            <button>submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() =>
			        expect(submitData).toEqual(\{
			          test: [],
			        \}),
			      );
			    \});
			  \});
			
			  it('should custom register append, prepend and insert inputs with values', () => \{
			    type FormValues = \{
			      test: \{
			        test: string;
			        test1: string;
			        test2: \{
			          test: string;
			        \}[];
			      \}[];
			    \};
			    const watchValues: unknown[] = [];
			
			    const Component = () => \{
			      const \{ control, watch \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [],
			        \},
			      \});
			      const \{ append, prepend, insert \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      watchValues.push(watch('test'));
			
			      React.useEffect(() => \{
			        append(\{
			          test: 'append',
			          test1: 'append',
			          test2: [],
			        \});
			      \}, [append]);
			
			      return (
			        <form>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              prepend(\{
			                test: 'prepend',
			                test1: 'prepend',
			                test2: [],
			              \})
			            \}
			          >
			            prepend
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              insert(1, \{
			                test: 'insert',
			                test1: 'insert',
			                test2: [],
			              \})
			            \}
			          >
			            insert
			          </button>
			
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              append(\{
			                test: 'append',
			                test2: [
			                  \{
			                    test: 'test',
			                  \},
			                ],
			                test1: '',
			              \})
			            \}
			          >
			            deep append
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              prepend(\{
			                test: 'prepend',
			                test2: [
			                  \{
			                    test: 'test',
			                  \},
			                ],
			                test1: '',
			              \})
			            \}
			          >
			            deep prepend
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              insert(1, \{
			                test: 'insert',
			                test2: [
			                  \{
			                    test: 'test',
			                  \},
			                ],
			                test1: '',
			              \})
			            \}
			          >
			            deep insert
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(watchValues.at(-1)).toEqual([
			      \{
			        test: 'append',
			        test1: 'append',
			        test2: [],
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'prepend' \}));
			
			    expect(watchValues.at(-1)).toEqual([
			      \{ test: 'prepend', test1: 'prepend', test2: [] \},
			      \{
			        test: 'append',
			        test1: 'append',
			        test2: [],
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'insert' \}));
			
			    expect(watchValues.at(-1)).toEqual([
			      \{ test: 'prepend', test1: 'prepend', test2: [] \},
			      \{
			        test: 'insert',
			        test1: 'insert',
			        test2: [],
			      \},
			      \{
			        test: 'append',
			        test1: 'append',
			        test2: [],
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'deep append' \}));
			
			    expect(watchValues.at(-1)).toEqual([
			      \{ test: 'prepend', test1: 'prepend', test2: [] \},
			      \{
			        test: 'insert',
			        test1: 'insert',
			        test2: [],
			      \},
			      \{
			        test: 'append',
			        test1: 'append',
			        test2: [],
			      \},
			      \{
			        test: 'append',
			        test1: '',
			        test2: [
			          \{
			            test: 'test',
			          \},
			        ],
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'deep prepend' \}));
			
			    expect(watchValues.at(-1)).toEqual([
			      \{
			        test: 'prepend',
			        test1: '',
			        test2: [
			          \{
			            test: 'test',
			          \},
			        ],
			      \},
			      \{ test: 'prepend', test1: 'prepend', test2: [] \},
			      \{
			        test: 'insert',
			        test1: 'insert',
			        test2: [],
			      \},
			      \{
			        test: 'append',
			        test1: 'append',
			        test2: [],
			      \},
			      \{
			        test: 'append',
			        test1: '',
			        test2: [
			          \{
			            test: 'test',
			          \},
			        ],
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'deep insert' \}));
			
			    expect(watchValues.at(-1)).toEqual([
			      \{
			        test: 'prepend',
			        test1: '',
			        test2: [
			          \{
			            test: 'test',
			          \},
			        ],
			      \},
			      \{
			        test: 'insert',
			        test1: '',
			        test2: [
			          \{
			            test: 'test',
			          \},
			        ],
			      \},
			      \{ test: 'prepend', test1: 'prepend', test2: [] \},
			      \{
			        test: 'insert',
			        test1: 'insert',
			        test2: [],
			      \},
			      \{
			        test: 'append',
			        test1: 'append',
			        test2: [],
			      \},
			      \{
			        test: 'append',
			        test1: '',
			        test2: [
			          \{
			            test: 'test',
			          \},
			        ],
			      \},
			    ]);
			
			    // Let's check all values of renders with implicitly the number of render (for each value)
			    expect(watchValues).toMatchSnapshot();
			  \});
			
			  it('should append multiple inputs correctly', () => \{
			    type FormValues = \{
			      test: \{
			        value: string;
			      \}[];
			    \};
			
			    const watchedValue: unknown[] = [];
			
			    const Component = () => \{
			      const \{ register, control, watch \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [
			            \{
			              value: 'data',
			            \},
			          ],
			        \},
			      \});
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      watchedValue.push(watch());
			
			      return (
			        <form>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => \{
			              append([\{ value: 'test' \}, \{ value: 'test1' \}]);
			            \}\}
			          >
			            append
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(watchedValue.at(-1)).toEqual(\{
			      test: [
			        \{
			          value: 'data',
			        \},
			      ],
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(watchedValue.at(-1)).toEqual(\{
			      test: [
			        \{
			          value: 'data',
			        \},
			        \{ value: 'test' \},
			        \{ value: 'test1' \},
			      ],
			    \});
			
			    // Let's check all values of renders with implicitly the number of render (for each value)
			    expect(watchedValue).toMatchSnapshot();
			  \});
			
			  it('should update field array defaultValues when invoke setValue', async () => \{
			    type FormValues = \{
			      names: \{
			        name: string;
			      \}[];
			    \};
			
			    const result: unknown[] = [];
			
			    const Child = () => \{
			      const \{ fields \} = useFieldArray<FormValues>(\{
			        name: 'names',
			      \});
			
			      return (
			        <>
			          \{fields.map((item, index) => (
			            <Controller
			              key=\{item.id\}
			              name=\{\`names.\$\{index\}.name\` as const\}
			              render=\{(\{ field \}) => <input \{...field\} />\}
			            />
			          ))\}
			        </>
			      );
			    \};
			
			    function Component() \{
			      const [hide, setHide] = React.useState(true);
			      const methods = useForm<FormValues>(\{
			        defaultValues: \{
			          names: [\{ name: 'will' \}, \{ name: 'Mike' \}],
			        \},
			      \});
			      const \{ setValue \} = methods;
			
			      result.push(methods.watch());
			
			      return (
			        <form>
			          <FormProvider \{...methods\}>\{hide && <Child />\}</FormProvider>
			          <button type=\{'button'\} onClick=\{() => setValue('names', [])\}>
			            Change value
			          </button>
			          <button type=\{'button'\} onClick=\{() => setHide(!hide)\}>
			            Toggle hide
			          </button>
			        </form>
			      );
			    \}
			
			    render(<Component />);
			
			    expect(result.at(-1)).toEqual(\{
			      names: [
			        \{
			          name: 'will',
			        \},
			        \{
			          name: 'Mike',
			        \},
			      ],
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'Toggle hide' \}));
			
			    expect(screen.queryAllByRole('textbox')).toEqual([]);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'Change value' \}));
			
			    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
			
			    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'Toggle hide' \}));
			
			    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
			
			    expect(result.at(-1)).toEqual(\{ names: [] \});
			
			    // Let's check all values of renders with implicitly the number of render (for each value)
			    expect(result).toEqual([
			      \{
			        names: [
			          \{
			            name: 'will',
			          \},
			          \{
			            name: 'Mike',
			          \},
			        ],
			      \},
			      \{
			        names: [
			          \{
			            name: 'will',
			          \},
			          \{
			            name: 'Mike',
			          \},
			        ],
			      \},
			      \{
			        names: [],
			      \},
			      \{
			        names: [],
			      \},
			      \{
			        names: [],
			      \},
			    ]);
			  \});
			
			  it('should unregister field array when shouldUnregister set to true', () => \{
			    type FormValues = \{
			      test: \{
			        value: string;
			      \}[];
			    \};
			
			    const watchedValues: FormValues[] = [];
			
			    const Child = (\{
			      control,
			      register,
			    \}: \{
			      show: boolean;
			      control: Control<FormValues>;
			      register: UseFormRegister<FormValues>;
			    \}) => \{
			      const \{ fields \} = useFieldArray(\{
			        control,
			        name: 'test',
			        shouldUnregister: true,
			      \});
			
			      return (
			        <>
			          \{fields.map((field, i) => (
			            <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			          ))\}
			        </>
			      );
			    \};
			
			    const Component = () => \{
			      const \{ register, control, watch \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [\{ value: 'test' \}, \{ value: 'test1' \}],
			        \},
			      \});
			      const [show, setShow] = React.useState(true);
			
			      watchedValues.push(watch());
			
			      return (
			        <form>
			          \{show && <Child register=\{register\} control=\{control\} show=\{show\} />\}
			          <button type="button" onClick=\{() => setShow(!show)\}>
			            toggle
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(watchedValues.at(-1)).toEqual(\{
			      test: [\{ value: 'test' \}, \{ value: 'test1' \}],
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(watchedValues.at(-1)).toEqual(\{\});
			
			    // Let's check all values of renders with implicitly the number of render (for each value)
			    expect(watchedValues).toEqual([
			      \{
			        test: [
			          \{
			            value: 'test',
			          \},
			          \{
			            value: 'test1',
			          \},
			        ],
			      \},
			      \{
			        test: [
			          \{
			            value: 'test',
			          \},
			          \{
			            value: 'test1',
			          \},
			        ],
			      \},
			      \{\},
			    ]);
			  \});
			
			  it('should keep field values when field array gets unmounted and mounted', async () => \{
			    type FormValues = \{
			      test: \{ firstName: string \}[];
			    \};
			
			    const Test = (\{
			      register,
			      control,
			    \}: \{
			      register: UseFormRegister<FormValues>;
			      control: Control<FormValues>;
			    \}) => \{
			      const \{ fields, append \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      return (
			        <div>
			          \{fields.map((field, i) => \{
			            return (
			              <input
			                key=\{field.id\}
			                \{...register(\`test.\$\{i\}.firstName\` as const)\}
			              />
			            );
			          \})\}
			          <button
			            onClick=\{() =>
			              append(\{
			                firstName: 'test',
			              \})
			            \}
			          >
			            append
			          </button>
			        </div>
			      );
			    \};
			
			    const App = () => \{
			      const \{ control, register \} = useForm<FormValues>();
			      const [show, setShow] = React.useState(true);
			
			      return (
			        <>
			          \{show && <Test control=\{control\} register=\{register\} />\}
			          <button onClick=\{() => setShow(!show)\}>show</button>
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'show' \}));
			
			    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'show' \}));
			
			    expect(screen.getAllByRole('textbox').length).toEqual(2);
			  \});
			
			  it('should append deep nested field array correctly with strict mode', async () => \{
			    function App() \{
			      const \{ control, register, handleSubmit \} = useForm<\{
			        test: \{
			          yourDetail: \{
			            firstName: string;
			            lastName: string;
			          \};
			        \}[];
			      \}>();
			      const \{ fields, append \} = useFieldArray(\{
			        name: 'test',
			        control,
			      \});
			
			      return (
			        <React.StrictMode>
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <input \{...register(\`test.\$\{index\}.yourDetail.firstName\`)\} />
			                  <input \{...register(\`test.\$\{index\}.yourDetail.lastName\`)\} />
			                </div>
			              );
			            \})\}
			            <button
			              type="button"
			              onClick=\{() =>
			                append(\{
			                  yourDetail: \{
			                    firstName: 'bill',
			                    lastName: 'luo',
			                  \},
			                \})
			              \}
			            >
			              Append
			            </button>
			            <input type="submit" />
			          </form>
			        </React.StrictMode>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'Append' \}));
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('bill');
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('luo');
			  \});
			
			  it('should not populate defaultValue when field array is already mounted', async () => \{
			    type FormValues = \{
			      root: \{
			        test: string;
			        children: \{ name: string \}[];
			      \}[];
			    \};
			
			    const Child = (\{
			      control,
			      index,
			      register,
			    \}: \{
			      control: Control<FormValues>;
			      index: number;
			      register: UseFormRegister<FormValues>;
			    \}) => \{
			      const \{ fields, append \} = useFieldArray(\{
			        name: \`root.\$\{index\}.children\`,
			        control,
			      \});
			
			      return (
			        <div>
			          \{fields.map((field, k) => \{
			            return (
			              <div key=\{field.id\}>
			                <input \{...register(\`root.\$\{index\}.children.\$\{k\}.name\`)\} />
			              </div>
			            );
			          \})\}
			
			          <button
			            onClick=\{() => \{
			              append(\{
			                name: 'test',
			              \});
			            \}\}
			          >
			            append
			          </button>
			        </div>
			      );
			    \};
			
			    const App = () => \{
			      const \{ register, control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          root: [
			            \{
			              test: 'default',
			              children: [
			                \{
			                  name: 'child of index 0',
			                \},
			              ],
			            \},
			            \{
			              test: 'default1',
			              children: [],
			            \},
			          ],
			        \},
			      \});
			      const \{ fields, swap \} = useFieldArray(\{
			        control,
			        name: 'root',
			      \});
			
			      return (
			        <div>
			          \{fields.map((field, index) => \{
			            return (
			              <div key=\{field.id\}>
			                <input \{...register(\`root.\$\{index\}.test\` as const)\} />
			                <Child control=\{control\} register=\{register\} index=\{index\} />
			              </div>
			            );
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              swap(0, 1);
			            \}\}
			          >
			            swap
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'swap' \}));
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'append' \})[0]);
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('default1');
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('test');
			    expect(
			      (screen.getAllByRole('textbox')[2] as HTMLInputElement).value,
			    ).toEqual('default');
			    expect(
			      (screen.getAllByRole('textbox')[3] as HTMLInputElement).value,
			    ).toEqual('child of index 0');
			  \});
			
			  it('should update field array correctly when unmounted field', () => \{
			    type FormValues = \{
			      nest: \{
			        value: string;
			        nested: \{
			          value: string;
			        \}[];
			      \}[];
			    \};
			
			    function Nested(\{
			      control,
			      register,
			      index,
			    \}: \{
			      control: Control<FormValues>;
			      register: UseFormRegister<FormValues>;
			      index: number;
			    \}) \{
			      const \{ fields \} = useFieldArray(\{
			        control,
			        name: \`nest.\$\{index\}.nested\`,
			      \});
			
			      return (
			        <>
			          \{fields.map((field, i) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`nest.\$\{index\}.nested.\$\{i\}.value\`)\}
			            />
			          ))\}
			        </>
			      );
			    \}
			
			    function App() \{
			      const \{ control, register, setValue, getValues \} = useForm<FormValues>(\{
			        defaultValues: \{
			          nest: [
			            \{ value: '0', nested: [\{ value: '0sub1' \}, \{ value: '0sub2' \}] \},
			            \{ value: '1', nested: [\{ value: '1sub1' \}, \{ value: '1sub2' \}] \},
			            \{ value: '2', nested: [\{ value: '2sub1' \}, \{ value: '2sub2' \}] \},
			          ],
			        \},
			      \});
			      const \{ fields, remove \} = useFieldArray(\{
			        control,
			        name: 'nest',
			      \});
			
			      function handleAddInner() \{
			        setValue(\`nest.1.nested\`, [
			          ...getValues(\`nest.1.nested\`),
			          \{ value: \`1sub-new\` \},
			        ]);
			      \}
			
			      return (
			        <>
			          \{fields.map((field, index) => (
			            <div key=\{field.id\}>
			              <input \{...register(\`nest.\$\{index\}.value\`)\} />
			              <button type=\{'button'\} onClick=\{() => remove(index)\}>
			                remove\{index\}
			              </button>
			              <Nested index=\{index\} \{...\{ control, register \}\} />
			            </div>
			          ))\}
			
			          <button onClick=\{handleAddInner\}>set</button>
			        </>
			      );
			    \}
			
			    render(<App />);
			
			    expect(screen.getAllByRole('textbox').length).toEqual(9);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove1' \}));
			
			    expect(screen.getAllByRole('textbox').length).toEqual(6);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'set' \}));
			
			    expect(screen.getAllByRole('textbox').length).toEqual(7);
			    expect(
			      (screen.getAllByRole('textbox')[6] as HTMLInputElement).value,
			    ).toEqual('1sub-new');
			  \});
			
			  it('should update field array correctly with async invocation', async () => \{
			    type FormValues = \{
			      items: \{ id: string; name: string \}[];
			    \};
			
			    let controlObj: any = \{\};
			
			    const App = () => \{
			      const \{ register, control \} = useForm<FormValues>(\{
			        mode: 'onChange',
			        defaultValues: \{
			          items: [\{ name: 'one' \}, \{ name: 'two' \}],
			        \},
			      \});
			
			      controlObj = control;
			
			      const \{ fields, remove, insert \} = useFieldArray(\{
			        control,
			        name: 'items',
			      \});
			
			      return (
			        <form>
			          \{fields.map((field, index) => \{
			            return (
			              <div key=\{field.id\}>
			                <button
			                  type="button"
			                  onClick=\{() => \{
			                    setTimeout(() => \{
			                      remove(index);
			                    \});
			                  \}\}
			                >
			                  remove
			                </button>
			                <button
			                  type="button"
			                  onClick=\{() => \{
			                    setTimeout(() => \{
			                      insert(index + 1, \{
			                        name: 'test',
			                        id: '',
			                      \});
			                    \});
			                  \}\}
			                >
			                  copy
			                </button>
			                <input
			                  \{...register(\`items.\$\{index\}.name\` as const, \{
			                    required: true,
			                  \})\}
			                />
			              </div>
			            );
			          \})\}
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'copy' \})[0]);
			
			    fireEvent.click(screen.getAllByRole('button', \{ name: 'remove' \})[0]);
			
			    expect(controlObj._fields.items.length).toEqual(2);
			  \});
			
			  it('should avoid omit keyName when defaultValues contains keyName attribute', () => \{
			    let getValuesMethod: Function = () => \{\};
			
			    const App = () => \{
			      const \{ control, getValues \} = useForm(\{
			        defaultValues: \{
			          test: [\{ id: '1234', test: 'data' \}],
			        \},
			      \});
			
			      getValuesMethod = getValues;
			
			      useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return null;
			    \};
			
			    render(<App />);
			
			    expect(getValuesMethod()).toEqual(\{
			      test: [\{ id: '1234', test: 'data' \}],
			    \});
			  \});
			
			  describe('with rules', () => \{
			    it('should validate the minLength of the entire field array after submit and correct accordingly', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			        \} = useForm(\{
			          defaultValues: \{
			            test: [\{ test: '' \}],
			          \},
			        \});
			
			        const \{ append \} = useFieldArray(\{
			          control,
			          name: 'test',
			          rules: \{
			            minLength: \{
			              value: 2,
			              message: 'Min length should be 2',
			            \},
			          \},
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            <p>\{errors.test?.root?.message\}</p>
			            <button>submit</button>
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                append(\{
			                  test: '',
			                \});
			              \}\}
			            >
			              append
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			      \});
			
			      screen.getByText('Min length should be 2');
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			        fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			      \});
			
			      expect(screen.queryByAltText('Min length should be 2')).toBeNull();
			    \});
			
			    it('should validate with custom validation after submit and correct accordingly', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			        \} = useForm(\{
			          defaultValues: \{
			            test: [\{ test: '' \}],
			          \},
			        \});
			
			        const \{ append \} = useFieldArray(\{
			          control,
			          name: 'test',
			          rules: \{
			            validate: (values) => \{
			              if (Array.isArray(values) && values.length < 2) \{
			                return 'Min length should be 2';
			              \}
			
			              return true;
			            \},
			          \},
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            <p>\{errors.test?.root?.message\}</p>
			            <button>submit</button>
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                append(\{
			                  test: '',
			                \});
			              \}\}
			            >
			              append
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			      \});
			
			      screen.getByText('Min length should be 2');
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			        fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			      \});
			
			      expect(screen.queryByAltText('Min length should be 2')).toBeNull();
			    \});
			
			    it('should validate the maxLength of the entire field array after submit and correct accordingly', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			        \} = useForm(\{
			          defaultValues: \{
			            test: [\{ test: '' \}, \{ test: '' \}, \{ test: '' \}, \{ test: '' \}],
			          \},
			        \});
			
			        const \{ remove \} = useFieldArray(\{
			          control,
			          name: 'test',
			          rules: \{
			            maxLength: \{
			              value: 2,
			              message: 'Max length should be 2',
			            \},
			          \},
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            <p>\{errors.test?.root?.message\}</p>
			            <button>submit</button>
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                remove();
			              \}\}
			            >
			              remove
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			      \});
			
			      screen.getByText('Max length should be 2');
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			      \});
			
			      expect(screen.queryByAltText('Max length should be 2')).toBeNull();
			    \});
			
			    it('should respect the validation mode and trigger validation after each field array action', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			        \} = useForm(\{
			          defaultValues: \{
			            test: [\{ test: '' \}, \{ test: '' \}, \{ test: '' \}, \{ test: '' \}],
			          \},
			          mode: 'onChange',
			        \});
			
			        const \{ remove, append \} = useFieldArray(\{
			          control,
			          name: 'test',
			          rules: \{
			            maxLength: \{
			              value: 2,
			              message: 'Max length should be 2',
			            \},
			          \},
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            <p>\{errors.test?.root?.message\}</p>
			            <button>submit</button>
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                remove();
			              \}\}
			            >
			              remove
			            </button>
			
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                append(\{
			                  test: '',
			                \});
			              \}\}
			            >
			              append
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect(screen.queryByAltText('Max length should be 2')).toBeNull();
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			      \});
			
			      screen.getByText('Max length should be 2');
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			      \});
			
			      expect(screen.queryByAltText('Max length should be 2')).toBeNull();
			    \});
			
			    it('should not conflict with field level error', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			          register,
			        \} = useForm(\{
			          defaultValues: \{
			            test: [\{ test: '' \}, \{ test: '' \}, \{ test: '' \}, \{ test: '' \}],
			          \},
			          mode: 'onChange',
			        \});
			
			        const \{ remove, append, fields \} = useFieldArray(\{
			          control,
			          name: 'test',
			          rules: \{
			            maxLength: \{
			              value: 2,
			              message: 'Max length should be 2',
			            \},
			          \},
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <input
			                    \{...register(\`test.\$\{index\}.test\`, \{
			                      required: 'This is required',
			                    \})\}
			                  />
			                  <p>\{errors.test?.[index]?.test?.message\}</p>
			                </div>
			              );
			            \})\}
			            <p>\{errors.test?.root?.message\}</p>
			            <button>submit</button>
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                remove();
			              \}\}
			            >
			              remove
			            </button>
			
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                append(\{
			                  test: '',
			                \});
			              \}\}
			            >
			              append
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect(screen.queryByAltText('Max length should be 2')).toBeNull();
			      expect(screen.queryByAltText('This is required')).toBeNull();
			
			      await actComponent(async () => \{
			        fireEvent.change(screen.getAllByRole('textbox')[0], \{
			          target: \{
			            value: '1',
			          \},
			        \});
			      \});
			
			      await actComponent(async () => \{
			        fireEvent.change(screen.getAllByRole('textbox')[0], \{
			          target: \{
			            value: '',
			          \},
			        \});
			      \});
			
			      screen.getByText('This is required');
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			      \});
			
			      expect(screen.queryByAltText('Max length should be 2')).toBeNull();
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			      \});
			
			      expect(screen.queryByAltText('Max length should be 2')).toBeNull();
			    \});
			
			    it('should not throw error when required is not defined but minLength', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			          register,
			        \} = useForm<\{ test: \{ test: string \}[] \}>(\{
			          defaultValues: \{
			            test: [],
			          \},
			        \});
			
			        const \{ fields \} = useFieldArray(\{
			          control,
			          name: 'test',
			          rules: \{
			            maxLength: \{
			              value: 2,
			              message: 'Max length should be 2',
			            \},
			          \},
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <input
			                    \{...register(\`test.\$\{index\}.test\`, \{
			                      required: 'This is required',
			                    \})\}
			                  />
			                  <p>\{errors.test?.[index]?.test?.message\}</p>
			                </div>
			              );
			            \})\}
			            <p>\{errors.test?.root?.message\}</p>
			            <button>submit</button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button'));
			      \});
			
			      expect(screen.queryByAltText('Max length should be 2')).toBeNull();
			    \});
			
			    it('should throw error when required is defined', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			          register,
			        \} = useForm<\{ test: \{ test: string \}[] \}>(\{
			          defaultValues: \{
			            test: [],
			          \},
			        \});
			
			        const \{ fields \} = useFieldArray(\{
			          control,
			          name: 'test',
			          rules: \{
			            required: 'Please enter some data',
			          \},
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <input
			                    \{...register(\`test.\$\{index\}.test\`, \{
			                      required: 'This is required',
			                    \})\}
			                  />
			                  <p>\{errors.test?.[index]?.test?.message\}</p>
			                </div>
			              );
			            \})\}
			            <p>\{errors.test?.root?.message\}</p>
			            <button>submit</button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button'));
			      \});
			
			      expect(screen.queryByAltText('Please enter some data')).toBeNull();
			    \});
			  \});
			
			  describe('with nested field array ', () => \{
			    type FormValues = \{
			      fieldArray: \{
			        value: string;
			        nestedFieldArray: \{
			          value: string;
			        \}[];
			      \}[];
			    \};
			
			    const ArrayField = (\{
			      arrayIndex,
			      register,
			      control,
			    \}: \{
			      arrayIndex: number;
			      register: UseFormReturn<FormValues>['register'];
			      arrayField: Partial<FieldValues>;
			      control: Control<FormValues>;
			    \}) => \{
			      const \{ fields, append \} = useFieldArray(\{
			        name: \`fieldArray.\$\{arrayIndex\}.nestedFieldArray\` as const,
			        control,
			        rules: \{
			          required: 'This is required',
			          minLength: \{
			            value: 3,
			            message: 'Min length of 3',
			          \},
			        \},
			      \});
			
			      return (
			        <div>
			          \{fields.map((nestedField, index) => (
			            <div key=\{nestedField.id\}>
			              <input
			                \{...register(
			                  \`fieldArray.\$\{arrayIndex\}.nestedFieldArray.\$\{index\}.value\` as const,
			                )\}
			              />
			            </div>
			          ))\}
			          <button
			            type="button"
			            onClick=\{() => \{
			              append(\{
			                value:
			                  \`fieldArray.\$\{arrayIndex\}.nestedFieldArray.\$\{fields.length\}.value\` as const,
			              \});
			            \}\}
			          >
			            Add nested array
			          </button>
			        </div>
			      );
			    \};
			
			    it('should report field array error at the nested useFieldArray level when form submitted', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			        \} = useForm<FormValues>();
			        const \{ fields, append \} = useFieldArray(\{
			          name: 'fieldArray',
			          control,
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <ArrayField
			                    arrayIndex=\{index\}
			                    arrayField=\{field\}
			                    register=\{register\}
			                    control=\{control\}
			                  />
			                  <p>
			                    \{errors?.fieldArray?.[0]?.nestedFieldArray?.root?.message\}
			                  </p>
			                </div>
			              );
			            \})\}
			            <button
			              onClick=\{() =>
			                append(\{
			                  value: '',
			                  nestedFieldArray: [],
			                \})
			              \}
			              type=\{'button'\}
			            >
			              append
			            </button>
			            <button>submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			      \});
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			      \});
			
			      screen.getByText('This is required');
			    \});
			
			    it('should report field array error at the nested useFieldArray level during field level action', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          control,
			          handleSubmit,
			          formState: \{ errors \},
			        \} = useForm<FormValues>(\{
			          mode: 'onChange',
			        \});
			        const \{ fields, append \} = useFieldArray(\{
			          name: 'fieldArray',
			          control,
			        \});
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            \{fields.map((field, index) => \{
			              return (
			                <div key=\{field.id\}>
			                  <ArrayField
			                    arrayIndex=\{index\}
			                    arrayField=\{field\}
			                    register=\{register\}
			                    control=\{control\}
			                  />
			                  <p>
			                    \{errors?.fieldArray?.[0]?.nestedFieldArray?.root?.message\}
			                  </p>
			                </div>
			              );
			            \})\}
			            <button
			              onClick=\{() =>
			                append(\{
			                  value: '',
			                  nestedFieldArray: [],
			                \})
			              \}
			              type=\{'button'\}
			            >
			              append
			            </button>
			            <button>submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      await actComponent(async () => \{
			        fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			      \});
			
			      await actComponent(async () => \{
			        fireEvent.click(
			          screen.getByRole('button', \{ name: 'Add nested array' \}),
			        );
			      \});
			
			      screen.getByText('Min length of 3');
			    \});
			  \});
			
			  it('should update isValid correctly with rules props and inline validation', async () => \{
			    const App = () => \{
			      const \{
			        control,
			        register,
			        formState: \{ isValid \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: [\{ value: '1' \}],
			        \},
			      \});
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'test',
			        rules: \{
			          required: true,
			        \},
			      \});
			
			      return (
			        <div>
			          \{fields.map((field, index) => (
			            <input
			              key=\{field.id\}
			              \{...register(\`test.\$\{index\}.value\`, \{ required: true \})\}
			            />
			          ))\}
			
			          <button
			            onClick=\{() =>
			              append(\{
			                value: '',
			              \})
			            \}
			          >
			            Append
			          </button>
			
			          <p>\{isValid ? 'valid' : 'invalid'\}</p>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    await waitFor(() => \{
			      screen.getByText('valid');
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      screen.getByText('invalid');
			    \});
			  \});
			
			  describe('with formState observers', () => \{
			    it('should trigger reRender when user subscribes to root formState', async () => \{
			      type FormValues = \{ test: \{ value: string \}[] \};
			
			      const FieldArray = (\{
			        register,
			        control,
			      \}: \{
			        register: UseFormRegister<FormValues>;
			        control: Control<FormValues>;
			      \}) => \{
			        const \{ fields, append \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <>
			            \{fields.map((field, i) => (
			              <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			            ))\}
			            <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			              append
			            </button>
			          </>
			        );
			      \};
			
			      let renderCount = 0;
			      const Component = () => \{
			        const \{ register, control, formState \} = useForm<FormValues>();
			
			        formState.isDirty;
			        formState.dirtyFields;
			        formState.errors;
			
			        renderCount++;
			
			        return (
			          <form>
			            <FieldArray register=\{register\} control=\{control\} />
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			      await waitFor(() => expect(renderCount).toEqual(2));
			    \});
			
			    it('should trigger reRender on components that subscribe to useFieldArray fieldState', async () => \{
			      type FormValues = \{ test: \{ value: string \}[] \};
			      let rootRenderCount = 0;
			      let observerRenderCount = 0;
			
			      const FieldArray = (\{
			        register,
			        control,
			      \}: \{
			        register: UseFormRegister<FormValues>;
			        control: Control<FormValues>;
			      \}) => \{
			        const \{ fields, append \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <>
			            \{fields.map((field, i) => (
			              <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			            ))\}
			            <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			              append
			            </button>
			          </>
			        );
			      \};
			
			      const Observer = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			        const \{ isDirty, dirtyFields, errors \} = useFormState(\{
			          name: 'test',
			          control,
			        \});
			
			        observerRenderCount++;
			
			        return <p>\{JSON.stringify(\{ isDirty, dirtyFields, errors \})\}</p>;
			      \};
			
			      const Component = () => \{
			        const \{ register, control \} = useForm<FormValues>();
			
			        rootRenderCount++;
			
			        return (
			          <form>
			            <FieldArray register=\{register\} control=\{control\} />
			            <Observer control=\{control\} />
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			      await waitFor(() => \{
			        expect(rootRenderCount).toEqual(1);
			        expect(observerRenderCount).toEqual(2);
			      \});
			    \});
			
			    it('should unmount field array and remove its reference with shouldUnregister: true', () => \{
			      type FormValues = \{
			        type: string;
			        array: \{
			          data: string;
			        \}[];
			      \};
			
			      let array: \{ data: string \}[] = [];
			
			      function FieldArray(\{ control \}: \{ control: Control<FormValues> \}) \{
			        useFieldArray(\{
			          name: 'array' as const,
			          control,
			          shouldUnregister: true,
			        \});
			        return null;
			      \}
			
			      function App() \{
			        const methods = useForm(\{
			          defaultValues: \{
			            type: 'NO_CART',
			            array: [],
			          \},
			          shouldUnregister: true,
			        \});
			        const [toggle, setToggle] = useState(false);
			        const \{ control, watch \} = methods;
			        array = watch('array');
			
			        return (
			          <>
			            <button onClick=\{() => setToggle(!toggle)\} />
			            <form>\{toggle && <FieldArray control=\{control\} />\}</form>
			          </>
			        );
			      \}
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(array).toEqual([]);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(array).toBeUndefined();
			    \});
			
			    it('should not trigger reRender on components that do not subscribe to useFieldArray fieldState', async () => \{
			      type FormValues = \{ test: \{ value: string \}[]; other: string \};
			      let rootRenderCount = 0;
			      let notObserverRenderCount = 0;
			
			      const FieldArray = (\{
			        register,
			        control,
			      \}: \{
			        register: UseFormRegister<FormValues>;
			        control: Control<FormValues>;
			      \}) => \{
			        const \{ fields, append \} = useFieldArray(\{
			          control,
			          name: 'test',
			        \});
			
			        return (
			          <>
			            \{fields.map((field, i) => (
			              <input key=\{field.id\} \{...register(\`test.\$\{i\}.value\` as const)\} />
			            ))\}
			            <button type="button" onClick=\{() => append(\{ value: '' \})\}>
			              append
			            </button>
			          </>
			        );
			      \};
			
			      const NotObserver = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			        const \{ isDirty, dirtyFields, errors \} = useFormState(\{
			          name: 'other',
			          control,
			        \});
			
			        notObserverRenderCount++;
			
			        return <p>\{JSON.stringify(\{ isDirty, dirtyFields, errors \})\}</p>;
			      \};
			
			      const Component = () => \{
			        const \{ register, control \} = useForm<FormValues>();
			
			        rootRenderCount++;
			
			        return (
			          <form>
			            <FieldArray register=\{register\} control=\{control\} />
			            <NotObserver control=\{control\} />
			            <input \{...register('other')\} />
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: /append/i \}));
			
			      expect(rootRenderCount).toEqual(1);
			      expect(notObserverRenderCount).toEqual(1);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFieldArray.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(54)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\clearErrors.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ useForm \} from '../../useForm';
			
			describe('clearErrors', () => \{
			  it('should remove error', () => \{
			    const \{ result \} = renderHook(() => useForm<\{ input: string \}>());
			    act(() => \{
			      result.current.register('input');
			      result.current.setError('input', \{
			        type: 'test',
			        message: 'message',
			      \});
			    \});
			
			    act(() => result.current.clearErrors('input'));
			
			    expect(result.current.formState.errors).toEqual(\{\});
			  \});
			
			  it('should remove nested error', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ input: \{ nested: string \} \}>(),
			    );
			    result.current.formState.errors;
			    act(() =>
			      result.current.setError('input.nested', \{
			        type: 'test',
			      \}),
			    );
			    expect(result.current.formState.errors.input?.nested).toBeDefined();
			    act(() => result.current.clearErrors('input.nested'));
			    expect(result.current.formState.errors.input?.nested).toBeUndefined();
			  \});
			
			  it('should remove deep nested error and set it to undefined', async () => \{
			    let currentErrors = \{\};
			
			    const Component = () => \{
			      const \{
			        register,
			        formState: \{ errors \},
			        trigger,
			        clearErrors,
			      \} = useForm<\{
			        test: \{ data: string \};
			      \}>();
			
			      currentErrors = errors;
			      return (
			        <div>
			          <input type="text" \{...register('test.data', \{ required: true \})\} />
			          <button type=\{'button'\} onClick=\{() => trigger()\}>
			            submit
			          </button>
			          <button type=\{'button'\} onClick=\{() => clearErrors(['test.data'])\}>
			            clear
			          </button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    await waitFor(() =>
			      expect(currentErrors).toEqual(\{
			        test: \{
			          data: \{
			            message: '',
			            ref: screen.getByRole('textbox'),
			            type: 'required',
			          \},
			        \},
			      \}),
			    );
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'clear' \}));
			
			    expect(currentErrors).toEqual(\{\});
			  \});
			
			  it('should remove specified errors', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        input: string;
			        input1: string;
			        input2: string;
			        nest: \{ data: string; data1: string \};
			      \}>(),
			    );
			
			    result.current.formState.errors;
			
			    const error = \{
			      type: 'test',
			      message: 'message',
			    \};
			
			    act(() => \{
			      result.current.register('input');
			      result.current.register('input1');
			      result.current.register('input2');
			      result.current.setError('input', error);
			      result.current.setError('input1', error);
			      result.current.setError('input2', error);
			
			      result.current.register('nest.data');
			      result.current.register('nest.data1');
			      result.current.setError('nest.data', error);
			      result.current.setError('nest.data1', error);
			    \});
			
			    const errors = \{
			      input: \{
			        ...error,
			        ref: \{
			          name: 'input',
			        \},
			      \},
			      input1: \{
			        ...error,
			        ref: \{
			          name: 'input1',
			        \},
			      \},
			      input2: \{
			        ...error,
			        ref: \{
			          name: 'input2',
			        \},
			      \},
			      nest: \{
			        data: \{
			          ...error,
			          ref: \{
			            name: 'nest.data',
			          \},
			        \},
			        data1: \{
			          ...error,
			          ref: \{
			            name: 'nest.data1',
			          \},
			        \},
			      \},
			    \};
			    expect(result.current.formState.errors).toEqual(errors);
			
			    act(() => result.current.clearErrors(['input', 'input1', 'nest.data']));
			    expect(result.current.formState.errors).toEqual(\{
			      input2: errors.input2,
			      nest: \{
			        data1: errors.nest.data1,
			      \},
			    \});
			  \});
			
			  it('should remove all error', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ input: string; input1: string; input2: string \}>(),
			    );
			
			    result.current.formState.errors;
			
			    const error = \{
			      type: 'test',
			      message: 'message',
			    \};
			    act(() => result.current.setError('input', error));
			    act(() => result.current.setError('input1', error));
			    act(() => result.current.setError('input2', error));
			    expect(result.current.formState.errors).toEqual(\{
			      input: \{
			        ...error,
			        ref: undefined,
			        types: undefined,
			      \},
			      input1: \{
			        ...error,
			        ref: undefined,
			        types: undefined,
			      \},
			      input2: \{
			        ...error,
			        ref: undefined,
			        types: undefined,
			      \},
			    \});
			
			    act(() => result.current.clearErrors());
			    expect(result.current.formState.errors).toEqual(\{\});
			  \});
			
			  it('should prevent the submission if there is a custom error', async () => \{
			    const submit = jest.fn();
			    const \{ result \} = renderHook(() =>
			      useForm<\{ data: string; whatever: string \}>(),
			    );
			
			    result.current.register('data');
			
			    act(() => \{
			      result.current.setError('whatever', \{ type: 'server' \});
			    \});
			
			    await act(async () => await result.current.handleSubmit(submit)());
			    expect(submit).not.toBeCalled();
			
			    act(() => \{
			      result.current.clearErrors('whatever');
			    \});
			
			    await act(async () => await result.current.handleSubmit(submit)());
			    expect(submit).toBeCalled();
			  \});
			
			  it('should update isValid to true with setError', async () => \{
			    const App = () => \{
			      const \{
			        formState: \{ isValid \},
			        setError,
			        clearErrors,
			      \} = useForm(\{
			        mode: 'onChange',
			      \});
			
			      return (
			        <div>
			          <button
			            onClick=\{() => \{
			              setError('test', \{ type: 'test' \});
			            \}\}
			          >
			            setError
			          </button>
			
			          <button
			            onClick=\{() => \{
			              clearErrors();
			            \}\}
			          >
			            clearError
			          </button>
			          \{isValid ? 'yes' : 'no'\}
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('yes')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'setError' \}));
			
			    expect(await screen.findByText('no')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'clearError' \}));
			
			    expect(await screen.findByText('no')).toBeVisible();
			  \});
			
			  it('should be able to clear root error', () => \{
			    const App = () => \{
			      const \{ clearErrors \} = useForm();
			
			      React.useEffect(() => \{
			        clearErrors('root');
			        clearErrors('root.other');
			      \}, [clearErrors]);
			
			      return null;
			    \};
			
			    render(<App />);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\clearErrors.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\formState.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  act as actComponent,
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			\} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Controller \} from '../../controller';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			
			describe('formState', () => \{
			  describe('isValid', () => \{
			    it('should return isValid correctly with resolver', async () => \{
			      let isValidValue = false;
			
			      const Component = () => \{
			        const \{
			          register,
			          formState: \{ isValid \},
			        \} = useForm<\{ test: string \}>(\{
			          mode: 'onChange',
			          resolver: async (data) => \{
			            return \{
			              values: data.test ? data : \{\},
			              errors: data.test
			                ? \{\}
			                : \{
			                    test: \{
			                      message: 'issue',
			                      type: 'test',
			                    \},
			                  \},
			            \};
			          \},
			        \});
			
			        isValidValue = isValid;
			        return <input \{...register('test')\} />;
			      \};
			
			      render(<Component />);
			
			      expect(isValidValue).toBeFalsy();
			
			      fireEvent.input(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      await waitFor(() => expect(isValidValue).toBeTruthy());
			    \});
			
			    it('should return true for onBlur mode by default', async () => \{
			      const App = () => \{
			        const \{
			          formState: \{ isValid \},
			        \} = useForm<\{ test: string \}>(\{
			          mode: VALIDATION_MODE.onBlur,
			        \});
			
			        return <p>\{isValid ? 'valid' : 'invalid'\}</p>;
			      \};
			
			      render(<App />);
			
			      expect(await screen.findByText('valid')).toBeVisible();
			    \});
			
			    it('should return true for onChange mode by default', async () => \{
			      const App = () => \{
			        const \{
			          formState: \{ isValid \},
			        \} = useForm<\{ test: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			        \});
			
			        return <p>\{isValid ? 'valid' : 'invalid'\}</p>;
			      \};
			
			      render(<App />);
			
			      expect(await screen.findByText('valid')).toBeVisible();
			    \});
			
			    it('should return true for all mode by default', async () => \{
			      const App = () => \{
			        const \{
			          formState: \{ isValid \},
			        \} = useForm<\{ test: string \}>(\{
			          mode: VALIDATION_MODE.all,
			        \});
			
			        return <p>\{isValid ? 'valid' : 'invalid'\}</p>;
			      \};
			
			      render(<App />);
			
			      expect(await screen.findByText('valid')).toBeVisible();
			    \});
			
			    it('should return false when default value is not valid value', async () => \{
			      const \{ result \} = renderHook(() => \{
			        const methods = useForm<\{ input: string; issue: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			        \});
			
			        methods.formState.isValid;
			
			        return methods;
			      \});
			
			      await act(async () => \{
			        result.current.register('issue', \{ required: true \});
			        result.current.setValue('issue', '', \{ shouldValidate: true \});
			      \});
			
			      expect(result.current.formState.isValid).toBeFalsy();
			    \});
			
			    it('should return false when custom register with validation', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{ input: string; issue: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			        \}),
			      );
			
			      result.current.formState.isValid;
			
			      await act(async () => \{
			        result.current.register('issue', \{ required: true \});
			      \});
			
			      expect(result.current.formState.isValid).toBeFalsy();
			    \});
			
			    it('should update valid when toggle Controller', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          watch,
			          formState: \{ isValid \},
			        \} = useForm(\{
			          mode: 'onChange',
			          shouldUnregister: true,
			        \});
			        const test = watch('test');
			
			        return (
			          <div>
			            <p>\{isValid ? 'valid' : 'invalid'\}</p>
			            <Controller
			              control=\{control\}
			              rules=\{\{ required: true \}\}
			              render=\{(\{ field \}) => (
			                <select \{...field\} data-testid="select">
			                  <option value=\{''\}></option>
			                  <option value=\{'test'\}>test</option>
			                  <option value=\{'test1'\}>test1</option>
			                </select>
			              )\}
			              name=\{'test'\}
			            />
			
			            \{test === 'test1' && (
			              <>
			                <Controller
			                  control=\{control\}
			                  render=\{(\{ field \}) => <input \{...field\} />\}
			                  rules=\{\{ required: true \}\}
			                  name=\{'first.test'\}
			                />
			                <Controller
			                  control=\{control\}
			                  render=\{(\{ field \}) => <input \{...field\} />\}
			                  rules=\{\{ required: true \}\}
			                  name=\{'first.test1'\}
			                />
			              </>
			            )\}
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      expect(screen.getByText('invalid')).toBeVisible();
			
			      fireEvent.change(screen.getByTestId('select'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      expect(await screen.findByText('valid')).toBeVisible();
			
			      fireEvent.change(screen.getByTestId('select'), \{
			        target: \{
			          value: 'test1',
			        \},
			      \});
			
			      expect(await screen.findByText('invalid')).toBeVisible();
			
			      fireEvent.change(screen.getByTestId('select'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      expect(await screen.findByText('valid')).toBeVisible();
			
			      fireEvent.change(screen.getByTestId('select'), \{
			        target: \{
			          value: 'test1',
			        \},
			      \});
			
			      expect(await screen.findByText('invalid')).toBeVisible();
			    \});
			  \});
			
			  it('should be a proxy object that returns undefined for unknown properties', () => \{
			    const \{ result \} = renderHook(() => useForm());
			
			    // @ts-expect-error
			    expect(result.current.formState.nonExistentProperty).toBeUndefined();
			  \});
			
			  it('should be a proxy object that properly implements the has trap', () => \{
			    const \{ result \} = renderHook(() => useForm());
			
			    expect('nonExistentProperty' in result.current.formState).toBeFalsy();
			  \});
			
			  it('should be a proxy object that hasOwnProperty works on', () => \{
			    const \{ result \} = renderHook(() => useForm());
			
			    expect(result.current.formState).toHaveProperty('hasOwnProperty');
			  \});
			
			  describe('when using with reset API', () => \{
			    type FormValues = \{
			      foo: string;
			      foo1: string;
			    \};
			
			    it('should render isValid as true with reset at useEffect with valid data', async () => \{
			      function Component() \{
			        const \{
			          register,
			          control,
			          formState: \{ isValid \},
			          reset,
			        \} = useForm<FormValues>(\{
			          mode: 'onBlur',
			          defaultValues: \{ foo: '', foo1: '' \},
			        \});
			
			        React.useEffect(() => \{
			          reset(\{ foo: 'test', foo1: 'test2' \});
			        \}, [reset]);
			
			        return (
			          <div>
			            <h2>Form with controlled input</h2>
			            <Controller
			              name="foo"
			              rules=\{\{ required: true \}\}
			              control=\{control\}
			              render=\{(\{ field \}) => <input \{...field\} />\}
			            />
			            <input \{...register('foo1', \{ required: true \})\} />
			            \{isValid ? 'valid' : 'nope'\}
			          </div>
			        );
			      \}
			
			      render(<Component />);
			
			      expect(await screen.findByText('valid')).toBeVisible();
			    \});
			
			    it('should render isValid as false with reset at useEffect with valid data', async () => \{
			      function Component() \{
			        const \{
			          register,
			          control,
			          formState: \{ isValid \},
			          reset,
			        \} = useForm<FormValues>(\{
			          mode: 'onBlur',
			          defaultValues: \{ foo: '', foo1: '' \},
			        \});
			
			        React.useEffect(() => \{
			          reset(\{ foo: 'test', foo1: '' \});
			        \}, [reset]);
			
			        return (
			          <div>
			            <h2>Form with controlled input</h2>
			            <Controller
			              name="foo"
			              rules=\{\{ required: true \}\}
			              control=\{control\}
			              render=\{(\{ field \}) => <input \{...field\} />\}
			            />
			            <input \{...register('foo1', \{ required: true \})\} />
			            \{isValid ? 'valid' : 'nope'\}
			          </div>
			        );
			      \}
			
			      render(<Component />);
			
			      expect(await screen.findByText('nope')).toBeVisible();
			    \});
			  \});
			
			  it('should not update form state when there is a promise reject', async () => \{
			    const rejectPromiseFn = jest
			      .fn()
			      .mockRejectedValue(new Error('this is an error'));
			
			    const App = () => \{
			      const \{
			        register,
			        handleSubmit,
			        formState: \{ isSubmitSuccessful, isSubmitted \},
			      \} = useForm();
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			          <p>\{isSubmitted ? 'isSubmitted' : 'no'\}</p>
			          <p>
			            \{isSubmitSuccessful
			              ? 'isSubmitSuccessful'
			              : 'isNotSubmitSuccessful'\}
			          </p>
			          <button
			            type=\{'button'\}
			            onClick=\{() => handleSubmit(rejectPromiseFn)().catch(() => \{\})\}
			          >
			            Submit
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(screen.getByText('isNotSubmitSuccessful')).toBeVisible();
			  \});
			
			  it('should update isValid even with mode set to onSubmit', async () => \{
			    const App = () => \{
			      const \{
			        register,
			        handleSubmit,
			        formState: \{ isValid, errors \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: '',
			        \},
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <input \{...register('test', \{ required: true \})\} />
			          \{errors.test && <p>error</p>\}
			
			          <p>\{isValid ? 'valid' : 'invalid'\}</p>
			
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    await waitFor(() => screen.getByText('invalid'));
			    expect(screen.queryByText('error')).not.toBeInTheDocument();
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'value',
			      \},
			    \});
			
			    await waitFor(() => screen.getByText('valid'));
			    expect(screen.queryByText('error')).not.toBeInTheDocument();
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			    await waitFor(() =>
			      expect(screen.queryByText('error')).toBeInTheDocument(),
			    );
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'value',
			      \},
			    \});
			    await waitFor(() =>
			      expect(screen.queryByText('error')).not.toBeInTheDocument(),
			    );
			  \});
			
			  it('should update correct isValid formState with dynamic fields', async () => \{
			    const Component = () => \{
			      const \{
			        register,
			        control,
			        formState: \{ isValid \},
			      \} = useForm<\{
			        list: \{
			          firstName: string;
			          lastName: string;
			        \}[];
			        test: string;
			        test1: string;
			        test2: string;
			        test3: string;
			      \}>(\{
			        mode: 'onChange',
			      \});
			      const \{ append, fields \} = useFieldArray(\{
			        control,
			        name: 'list',
			      \});
			
			      return (
			        <form>
			          <Controller
			            render=\{(\{ field \}) => (
			              <input \{...field\} placeholder=\{field.name\} />
			            )\}
			            name=\{'test'\}
			            rules=\{\{ required: true \}\}
			            control=\{control\}
			            defaultValue=\{''\}
			          />
			          <input
			            \{...register('test1', \{ required: true \})\}
			            placeholder=\{'test1'\}
			          />
			          <input \{...register('test2')\} placeholder=\{'test2'\} />
			          <Controller
			            render=\{(\{ field \}) => (
			              <input \{...field\} placeholder=\{field.name\} />
			            )\}
			            name=\{'test3'\}
			            control=\{control\}
			            defaultValue=\{''\}
			          />
			          \{fields.map((field, index) => \{
			            return (
			              <div key=\{field.id\}>
			                <Controller
			                  render=\{(\{ field \}) => (
			                    <input \{...field\} placeholder=\{field.name\} />
			                  )\}
			                  name=\{\`list.\$\{index\}.firstName\` as const\}
			                  control=\{control\}
			                  rules=\{\{ required: true \}\}
			                />
			                <input
			                  \{...register(\`list.\$\{index\}.lastName\` as const, \{
			                    required: true,
			                  \})\}
			                  placeholder=\{\`list.\$\{index\}.lastName\`\}
			                />
			              </div>
			            );
			          \})\}
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              append(\{
			                firstName: '',
			                lastName: '',
			              \})
			            \}
			          >
			            append
			          </button>
			          <p>\{isValid ? 'valid' : 'inValid'\}</p>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(await screen.findByText('inValid')).toBeVisible();
			
			    fireEvent.change(screen.getByPlaceholderText('test'), \{
			      target: \{ value: '1' \},
			    \});
			    fireEvent.change(screen.getByPlaceholderText('test1'), \{
			      target: \{ value: '1' \},
			    \});
			
			    expect(await screen.findByText('valid')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('inValid')).toBeVisible();
			
			    fireEvent.change(screen.getByPlaceholderText('list.0.firstName'), \{
			      target: \{ value: '1' \},
			    \});
			    fireEvent.change(screen.getByPlaceholderText('list.0.lastName'), \{
			      target: \{ value: '1' \},
			    \});
			
			    expect(await screen.findByText('valid')).toBeVisible();
			
			    fireEvent.change(screen.getByPlaceholderText('list.0.lastName'), \{
			      target: \{ value: '' \},
			    \});
			
			    expect(await screen.findByText('inValid')).toBeVisible();
			
			    fireEvent.change(screen.getByPlaceholderText('list.0.lastName'), \{
			      target: \{ value: '1' \},
			    \});
			
			    expect(await screen.findByText('valid')).toBeVisible();
			
			    fireEvent.change(screen.getByPlaceholderText('list.0.firstName'), \{
			      target: \{ value: '' \},
			    \});
			
			    expect(await screen.findByText('inValid')).toBeVisible();
			
			    fireEvent.change(screen.getByPlaceholderText('list.0.firstName'), \{
			      target: \{ value: '1' \},
			    \});
			
			    expect(await screen.findByText('valid')).toBeVisible();
			  \});
			
			  it('should remind isSubmitting when form is invalid', async () => \{
			    const submittingState: boolean[] = [];
			
			    function App() \{
			      const \{
			        register,
			        formState: \{ isSubmitting \},
			        handleSubmit,
			      \} = useForm();
			
			      submittingState.push(isSubmitting);
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <input
			            \{...register('value', \{ required: true \})\}
			            defaultValue="Any default value!"
			          />
			          <button>Submit</button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    await actComponent(async () => \{
			      fireEvent.click(screen.getByRole('button'));
			    \});
			
			    expect(submittingState).toEqual([false, true, false]);
			  \});
			
			  describe('when defaultValue supplied', () => \{
			    it('should update isValid to true for validation with inline defaultValue', async () => \{
			      function App() \{
			        const \{
			          register,
			          formState: \{ isValid \},
			        \} = useForm(\{
			          mode: 'onChange',
			        \});
			
			        return (
			          <form>
			            <input
			              \{...register('value', \{ required: true \})\}
			              defaultValue="Any default value!"
			            />
			            <p>isValid = \{isValid ? 'true' : 'false'\}</p>
			          </form>
			        );
			      \}
			
			      render(<App />);
			
			      expect(await screen.findByText('isValid = true')).toBeVisible();
			    \});
			
			    it('should update isValid to true for Controller validation', async () => \{
			      function App() \{
			        const \{
			          control,
			          formState: \{ isValid \},
			        \} = useForm(\{
			          mode: 'onChange',
			        \});
			
			        return (
			          <form>
			            <Controller
			              control=\{control\}
			              render=\{(\{ field \}) => <input \{...field\} />\}
			              name=\{'test'\}
			              defaultValue="Any default value!"
			            />
			            <p>isValid = \{isValid ? 'true' : 'false'\}</p>
			            <button>Submit</button>
			          </form>
			        );
			      \}
			
			      render(<App />);
			
			      expect(await screen.findByText('isValid = true')).toBeVisible();
			    \});
			  \});
			
			  it('should not update dirty fields during blur event', async () => \{
			    let dirtyFieldsState = \{\};
			
			    const App = () => \{
			      const \{
			        handleSubmit,
			        register,
			        formState: \{ dirtyFields \},
			      \} = useForm();
			
			      dirtyFieldsState = dirtyFields;
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <input
			            \{...register('test', \{ setValueAs: (value) => value + '1' \})\}
			          />
			          <input type="submit" />
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    expect(dirtyFieldsState).toEqual(\{\});
			  \});
			
			  describe('when delay config is set', () => \{
			    const message = 'required.';
			
			    it('should only show error after 500ms with register', async () => \{
			      jest.useFakeTimers();
			
			      const App = () => \{
			        const \{
			          register,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: string;
			        \}>(\{
			          delayError: 500,
			          mode: 'onChange',
			        \});
			
			        return (
			          <div>
			            <input
			              \{...register('test', \{
			                maxLength: 4,
			              \})\}
			            />
			            \{errors.test && <p>\{message\}</p>\}
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: '123456',
			        \},
			      \});
			
			      expect(screen.queryByText(message)).not.toBeInTheDocument();
			
			      jest.advanceTimersByTime(500);
			
			      expect(await screen.findByText(message)).toBeVisible();
			    \});
			
			    it('should only show error after 500ms with Controller', async () => \{
			      const App = () => \{
			        const \{
			          control,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: string;
			        \}>(\{
			          delayError: 500,
			          mode: 'onChange',
			        \});
			
			        return (
			          <div>
			            <Controller
			              render=\{(\{ field \}) => <input \{...field\} />\}
			              rules=\{\{
			                maxLength: 4,
			              \}\}
			              control=\{control\}
			              name="test"
			              defaultValue=""
			            />
			            \{errors.test && <p>\{message\}</p>\}
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: '123456',
			        \},
			      \});
			
			      expect(screen.queryByText(message)).not.toBeInTheDocument();
			
			      actComponent(() => \{
			        jest.advanceTimersByTime(500);
			      \});
			
			      expect(await screen.findByText(message)).toBeVisible();
			    \});
			
			    it('should prevent error from showing once input is validated', async () => \{
			      jest.useFakeTimers();
			
			      const App = () => \{
			        const \{
			          register,
			          formState: \{ errors, isDirty \},
			        \} = useForm<\{
			          test: string;
			        \}>(\{
			          delayError: 500,
			          mode: 'onChange',
			        \});
			
			        return (
			          <div>
			            <p>Dirty: \{isDirty.toString()\}</p>
			            <input
			              \{...register('test', \{
			                maxLength: 4,
			              \})\}
			            />
			            \{errors.test && <p>\{message\}</p>\}
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      const input = screen.getByRole('textbox');
			
			      fireEvent.change(input, \{
			        target: \{
			          value: '123456',
			        \},
			      \});
			
			      expect(await screen.findByText('Dirty: true')).toBeVisible();
			      expect(screen.queryByText(message)).not.toBeInTheDocument();
			
			      fireEvent.change(input, \{
			        target: \{
			          value: '123',
			        \},
			      \});
			      expect(screen.queryByText(message)).not.toBeInTheDocument();
			
			      await actComponent(async () => \{
			        jest.advanceTimersByTime(500);
			      \});
			
			      expect(screen.queryByText(message)).not.toBeInTheDocument();
			    \});
			
			    describe('when delayError is provided', () => \{
			      it('should only show error after 500ms with register and render formState instantly', async () => \{
			        jest.useFakeTimers();
			
			        const message = 'required.';
			
			        const App = () => \{
			          const \{
			            register,
			            formState: \{ errors, isValid \},
			          \} = useForm<\{
			            test: string;
			          \}>(\{
			            delayError: 500,
			            mode: 'onChange',
			          \});
			
			          return (
			            <div>
			              \{isValid ? 'valid' : 'inValid'\}
			              <input
			                \{...register('test', \{
			                  required: true,
			                  maxLength: 4,
			                \})\}
			              />
			              \{errors.test && <p>\{message\}</p>\}
			            </div>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.change(screen.getByRole('textbox'), \{
			          target: \{
			            value: '123',
			          \},
			        \});
			
			        expect(screen.queryByText(message)).not.toBeInTheDocument();
			
			        expect(await screen.findByText('valid')).toBeVisible();
			
			        await actComponent(async () => \{
			          fireEvent.change(screen.getByRole('textbox'), \{
			            target: \{
			              value: '',
			            \},
			          \});
			        \});
			
			        await actComponent(async () => \{
			          await waitFor(() => screen.getByText('inValid'));
			        \});
			
			        expect(screen.queryByText(message)).toBeNull();
			
			        actComponent(() => \{
			          jest.advanceTimersByTime(500);
			        \});
			
			        expect(await screen.findByText(message)).toBeVisible();
			      \});
			    \});
			  \});
			
			  it('should return updated value with NaN data type', async () => \{
			    function App() \{
			      const \{ register, formState \} = useForm(\{
			        mode: 'onChange',
			        defaultValues: \{
			          value: '',
			        \},
			      \});
			
			      return (
			        <form>
			          \{formState.errors.value && <p>error</p>\}
			          <input
			            \{...register('value', \{
			              min: 0,
			              valueAsNumber: true,
			              validate: (value) => !Number.isNaN(value),
			            \})\}
			          />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '2a',
			      \},
			    \});
			
			    await waitFor(() => \{
			      screen.getByText('error');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\formState.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(24)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\getFieldState.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			
			import \{ Control \} from '../../types';
			import \{ useController \} from '../../useController';
			import \{ useForm \} from '../../useForm';
			
			type FormValues = \{
			  nested: \{
			    first: string;
			    last: string;
			  \};
			\};
			
			const NestedInput = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			  const \{ field \} = useController(\{
			    control,
			    name: 'nested',
			    rules: \{
			      validate: (data) => \{
			        return data.first && data.last ? true : 'This is required';
			      \},
			    \},
			  \});
			
			  return (
			    <fieldset>
			      <input
			        value=\{field.value.first\}
			        onChange=\{(e) => \{
			          field.onChange(\{
			            ...field.value,
			            first: e.target.value,
			          \});
			        \}\}
			        onBlur=\{field.onBlur\}
			      />
			      <input
			        value=\{field.value.last\}
			        onChange=\{(e) => \{
			          field.onChange(\{
			            ...field.value,
			            last: e.target.value,
			          \});
			        \}\}
			        onBlur=\{field.onBlur\}
			      />
			    </fieldset>
			  );
			\};
			
			describe('getFieldState', () => \{
			  describe('with field name supplied', () => \{
			    describe('when input is primitive data type', () => \{
			      it('should display error state', async () => \{
			        const App = () => \{
			          const \{
			            trigger,
			            register,
			            getFieldState,
			            formState: \{ errors \},
			          \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          errors;
			
			          return (
			            <form>
			              <input \{...register('test', \{ required: 'This is required' \})\} />
			              <button type=\{'button'\} onClick=\{() => trigger()\}>
			                trigger
			              </button>
			              <p>\{getFieldState('test')?.error?.message\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        expect(await screen.findByText('This is required')).toBeVisible();
			      \});
			
			      it('should display isValid state', async () => \{
			        const App = () => \{
			          const \{
			            trigger,
			            register,
			            getFieldState,
			            formState: \{ errors \},
			          \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          errors;
			
			          return (
			            <form>
			              <input \{...register('test', \{ required: 'This is required' \})\} />
			              <button type=\{'button'\} onClick=\{() => trigger()\}>
			                trigger
			              </button>
			              <p>\{getFieldState('test')?.invalid ? 'error' : 'valid'\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        expect(await screen.findByText('error')).toBeVisible();
			      \});
			
			      it('should display isTouched state', async () => \{
			        const App = () => \{
			          const \{
			            register,
			            getFieldState,
			            formState: \{ touchedFields \},
			          \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          touchedFields;
			
			          return (
			            <form>
			              <input \{...register('test')\} />
			              <p>\{getFieldState('test')?.isTouched ? 'touched' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.focus(screen.getByRole('textbox'));
			        fireEvent.blur(screen.getByRole('textbox'));
			
			        expect(screen.getByText('touched')).toBeVisible();
			      \});
			
			      it('should display isDirty state', async () => \{
			        const App = () => \{
			          const \{
			            register,
			            getFieldState,
			            formState: \{ dirtyFields \},
			          \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          dirtyFields;
			
			          return (
			            <form>
			              <input \{...register('test')\} />
			              <p>\{getFieldState('test')?.isDirty ? 'dirty' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.change(screen.getByRole('textbox'), \{
			          target: \{ value: ' test' \},
			        \});
			
			        expect(screen.getByText('dirty')).toBeVisible();
			      \});
			
			      it('should not have error', () => \{
			        const App = () => \{
			          const \{
			            register,
			            getFieldState,
			            formState: \{ dirtyFields \},
			          \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          dirtyFields;
			
			          return (
			            <form>
			              <input \{...register('test')\} />
			              <p>
			                \{getFieldState('test').error === undefined
			                  ? 'error undefined'
			                  : ''\}
			              </p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        expect(screen.getByText('error undefined')).toBeVisible();
			      \});
			    \});
			
			    describe('when input is nested data type', () => \{
			      it('should display error state', async () => \{
			        const App = () => \{
			          const \{
			            trigger,
			            getFieldState,
			            control,
			            formState: \{ errors \},
			          \} = useForm<FormValues>(\{
			            defaultValues: \{
			              nested: \{
			                first: '',
			                last: '',
			              \},
			            \},
			          \});
			
			          errors;
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <button type=\{'button'\} onClick=\{() => trigger()\}>
			                trigger
			              </button>
			              <p>\{getFieldState('nested')?.error?.message\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        expect(await screen.findByText('This is required')).toBeVisible();
			      \});
			
			      it('should display isValid state', async () => \{
			        const App = () => \{
			          const \{
			            trigger,
			            control,
			            getFieldState,
			            formState: \{ errors \},
			          \} = useForm<FormValues>(\{
			            defaultValues: \{
			              nested: \{
			                first: '',
			                last: '',
			              \},
			            \},
			          \});
			
			          errors;
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <button type=\{'button'\} onClick=\{() => trigger()\}>
			                trigger
			              </button>
			              <p>\{getFieldState('nested')?.invalid ? 'error' : 'valid'\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        expect(await screen.findByText('error')).toBeVisible();
			      \});
			
			      it('should display isTouched state', async () => \{
			        const App = () => \{
			          const \{
			            control,
			            getFieldState,
			            formState: \{ touchedFields \},
			          \} = useForm<FormValues>(\{
			            defaultValues: \{
			              nested: \{
			                first: '',
			                last: '',
			              \},
			            \},
			          \});
			
			          touchedFields;
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <p>\{getFieldState('nested')?.isTouched ? 'touched' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.focus(screen.getAllByRole('textbox')[0]);
			        fireEvent.blur(screen.getAllByRole('textbox')[0]);
			
			        expect(screen.getByText('touched')).toBeVisible();
			      \});
			
			      it('should display isDirty state', async () => \{
			        const App = () => \{
			          const \{
			            control,
			            getFieldState,
			            formState: \{ dirtyFields \},
			          \} = useForm<FormValues>(\{
			            defaultValues: \{
			              nested: \{
			                first: '',
			                last: '',
			              \},
			            \},
			          \});
			
			          dirtyFields;
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <p>\{getFieldState('nested')?.isDirty ? 'dirty' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.change(screen.getAllByRole('textbox')[0], \{
			          target: \{ value: ' test' \},
			        \});
			
			        expect(screen.getByText('dirty')).toBeVisible();
			      \});
			
			      it('should not have error', () => \{
			        const App = () => \{
			          const \{
			            control,
			            getFieldState,
			            formState: \{ dirtyFields \},
			          \} = useForm<FormValues>(\{
			            defaultValues: \{
			              nested: \{
			                first: '',
			                last: '',
			              \},
			            \},
			          \});
			
			          dirtyFields;
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <p>
			                \{getFieldState('nested').error === undefined
			                  ? 'error undefined'
			                  : ''\}
			              </p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        expect(screen.getByText('error undefined')).toBeVisible();
			      \});
			    \});
			  \});
			
			  describe('with form state and field name supplied', () => \{
			    describe('when input is primitive data type', () => \{
			      it('should display error state', async () => \{
			        const App = () => \{
			          const \{ trigger, register, getFieldState, formState \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          const \{ error \} = getFieldState('test', formState);
			
			          return (
			            <form>
			              <input \{...register('test', \{ required: 'This is required' \})\} />
			              <button type=\{'button'\} onClick=\{() => trigger()\}>
			                trigger
			              </button>
			              <p>\{error?.message\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        expect(await screen.findByText('This is required')).toBeVisible();
			      \});
			
			      it('should display isValid state', async () => \{
			        const App = () => \{
			          const \{ trigger, register, getFieldState, formState \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          const \{ invalid \} = getFieldState('test', formState);
			
			          return (
			            <form>
			              <input \{...register('test', \{ required: 'This is required' \})\} />
			              <button type=\{'button'\} onClick=\{() => trigger()\}>
			                trigger
			              </button>
			              <p>\{invalid ? 'error' : 'valid'\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        expect(await screen.findByText('error')).toBeVisible();
			      \});
			
			      it('should display isTouched state', async () => \{
			        const App = () => \{
			          const \{ register, getFieldState, formState \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          const \{ isTouched \} = getFieldState('test', formState);
			
			          return (
			            <form>
			              <input \{...register('test')\} />
			              <p>\{isTouched ? 'touched' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.focus(screen.getByRole('textbox'));
			        fireEvent.blur(screen.getByRole('textbox'));
			
			        expect(screen.getByText('touched')).toBeVisible();
			      \});
			
			      it('should display isDirty state', async () => \{
			        const App = () => \{
			          const \{ register, getFieldState, formState \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          const \{ isDirty \} = getFieldState('test', formState);
			
			          return (
			            <form>
			              <input \{...register('test')\} />
			              <p>\{isDirty ? 'dirty' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.change(screen.getByRole('textbox'), \{
			          target: \{ value: ' test' \},
			        \});
			
			        expect(screen.getByText('dirty')).toBeVisible();
			      \});
			
			      it('should not have error', () => \{
			        const App = () => \{
			          const \{ register, getFieldState, formState \} = useForm(\{
			            defaultValues: \{
			              test: '',
			            \},
			          \});
			
			          const \{ error \} = getFieldState('test', formState);
			
			          return (
			            <form>
			              <input \{...register('test')\} />
			              <p>\{error === undefined ? 'error undefined' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        expect(screen.getByText('error undefined')).toBeVisible();
			      \});
			    \});
			
			    describe('when input is nested data type', () => \{
			      it('should display error state', async () => \{
			        const App = () => \{
			          const \{ trigger, getFieldState, control, formState \} =
			            useForm<FormValues>(\{
			              defaultValues: \{
			                nested: \{
			                  first: '',
			                  last: '',
			                \},
			              \},
			            \});
			
			          const \{ error \} = getFieldState('nested', formState);
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <button type=\{'button'\} onClick=\{() => trigger()\}>
			                trigger
			              </button>
			              <p>\{error?.message\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        expect(await screen.findByText('This is required')).toBeVisible();
			      \});
			
			      it('should display isValid state', async () => \{
			        const App = () => \{
			          const \{ trigger, control, getFieldState, formState \} =
			            useForm<FormValues>(\{
			              defaultValues: \{
			                nested: \{
			                  first: '',
			                  last: '',
			                \},
			              \},
			            \});
			
			          const \{ invalid \} = getFieldState('nested', formState);
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <button type=\{'button'\} onClick=\{() => trigger()\}>
			                trigger
			              </button>
			              <p>\{invalid ? 'error' : 'valid'\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        expect(await screen.findByText('error')).toBeVisible();
			      \});
			
			      it('should display isTouched state', async () => \{
			        const App = () => \{
			          const \{ control, getFieldState, formState \} = useForm<FormValues>(\{
			            defaultValues: \{
			              nested: \{
			                first: '',
			                last: '',
			              \},
			            \},
			          \});
			
			          const \{ isTouched \} = getFieldState('nested', formState);
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <p>\{isTouched ? 'touched' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.focus(screen.getAllByRole('textbox')[0]);
			        fireEvent.blur(screen.getAllByRole('textbox')[0]);
			
			        expect(screen.getByText('touched')).toBeVisible();
			      \});
			
			      it('should display isDirty state', async () => \{
			        const App = () => \{
			          const \{ control, getFieldState, formState \} = useForm<FormValues>(\{
			            defaultValues: \{
			              nested: \{
			                first: '',
			                last: '',
			              \},
			            \},
			          \});
			
			          const \{ isDirty \} = getFieldState('nested', formState);
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <p>\{isDirty ? 'dirty' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        fireEvent.change(screen.getAllByRole('textbox')[0], \{
			          target: \{ value: ' test' \},
			        \});
			
			        expect(screen.getByText('dirty')).toBeVisible();
			      \});
			
			      it('should not have error', () => \{
			        const App = () => \{
			          const \{ control, getFieldState, formState \} = useForm<FormValues>(\{
			            defaultValues: \{
			              nested: \{
			                first: '',
			                last: '',
			              \},
			            \},
			          \});
			
			          const \{ error \} = getFieldState('nested', formState);
			
			          return (
			            <form>
			              <NestedInput control=\{control\} />
			              <p>\{error === undefined ? 'error undefined' : ''\}</p>
			            </form>
			          );
			        \};
			
			        render(<App />);
			
			        expect(screen.getByText('error undefined')).toBeVisible();
			      \});
			    \});
			  \});
			
			  describe('when field is not found', () => \{
			    it('should return field state', async () => \{
			      const App = () => \{
			        const \{ control, getFieldState, formState \} = useForm<FormValues>(\{
			          defaultValues: \{
			            nested: \{
			              first: '',
			              last: '',
			            \},
			          \},
			        \});
			
			        // @ts-expect-error expected to show type error for field name
			        const \{ isDirty \} = getFieldState('nestedMissing', formState);
			
			        // @ts-expect-error expected to show type error for field name
			        const \{ isTouched, error \} = getFieldState('nestedMissing');
			
			        return (
			          <form>
			            <NestedInput control=\{control\} />
			            <p>\{isDirty ? 'dirty' : 'notDirty'\}</p>
			            <p>\{isTouched ? 'touched' : 'notTouched'\}</p>
			            <p>\{error === undefined ? 'error undefined' : 'error defined'\}</p>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{ value: ' test' \},
			      \});
			
			      expect(screen.getByText('notDirty')).toBeVisible();
			      expect(screen.getByText('notTouched')).toBeVisible();
			      expect(screen.getByText('error undefined')).toBeVisible();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\getFieldState.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(21)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\getValues.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ renderHook \} from '@testing-library/react-hooks';
			
			import \{ Controller \} from '../../controller';
			import \{ useForm \} from '../../useForm';
			import \{ FormProvider, useFormContext \} from '../../useFormContext';
			import \{ useFormState \} from '../../useFormState';
			
			describe('getValues', () => \{
			  it('should return defaultValues before inputs mounted', () => \{
			    let values;
			
			    const Component = () => \{
			      const \{ getValues \} = useForm(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			      \});
			
			      values = getValues();
			
			      return null;
			    \};
			
			    const \{ rerender \} = render(<Component />);
			
			    expect(values).toEqual(\{
			      test: 'test',
			    \});
			
			    rerender(<Component />);
			
			    expect(values).toEqual(\{
			      test: 'test',
			    \});
			  \});
			
			  it('should call getFieldsValues and return all values', () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			    result.current.register('test');
			    result.current.setValue('test', 'test');
			    expect(result.current.getValues()).toEqual(\{ test: 'test' \});
			  \});
			
			  it('should get individual field value', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string \}>(\{
			        defaultValues: \{
			          test: '123',
			        \},
			      \}),
			    );
			    result.current.register('test');
			    expect(result.current.getValues('test')).toEqual('123');
			  \});
			
			  it('should get all field values', () => \{
			    const values = \{
			      test: 'test',
			      test1: 'test1',
			      test2: 'test2',
			    \};
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string; test1: string; test2: string \}>(\{
			        defaultValues: values,
			      \}),
			    );
			    result.current.register('test');
			    result.current.register('test1');
			    result.current.register('test2');
			
			    result.current.setValue('test', 'test');
			    result.current.setValue('test1', 'test1');
			    result.current.setValue('test2', 'test2');
			
			    expect(result.current.getValues(['test', 'test1', 'test2'])).toEqual([
			      'test',
			      'test1',
			      'test2',
			    ]);
			  \});
			
			  it('should get undefined when field not found', () => \{
			    const \{ result \} = renderHook(() => useForm());
			
			    expect(result.current.getValues('test')).toEqual(undefined);
			  \});
			
			  it('should get value from shallowFieldsStateRef by name', () => \{
			    const \{ result, unmount \} = renderHook(() =>
			      useForm<\{
			        test: string;
			      \}>(),
			    );
			
			    result.current.register('test');
			    result.current.setValue('test', 'test');
			
			    unmount();
			
			    expect(result.current.getValues('test')).toEqual('test');
			  \});
			
			  it('should get value from shallowFieldsStateRef by array', () => \{
			    const \{ result, unmount \} = renderHook(() =>
			      useForm<\{
			        test: string;
			      \}>(),
			    );
			
			    result.current.register('test');
			    result.current.setValue('test', 'test');
			
			    unmount();
			
			    expect(result.current.getValues(['test'])).toEqual(['test']);
			  \});
			
			  it('should get value from shallowFieldsStateRef', () => \{
			    const \{ result, unmount \} = renderHook(() =>
			      useForm<\{
			        test: string;
			      \}>(),
			    );
			
			    result.current.register('test');
			    result.current.setValue('test', 'test');
			
			    unmount();
			
			    expect(result.current.getValues()).toEqual(\{
			      test: 'test',
			    \});
			  \});
			
			  it('should get value from default value by name when field is not registered', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm(\{
			        defaultValues: \{
			          test: 'default',
			        \},
			      \}),
			    );
			
			    expect(result.current.getValues('test')).toEqual('default');
			  \});
			
			  it('should get value from default value by array when field is not registered', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm(\{
			        defaultValues: \{
			          test: 'default',
			        \},
			      \}),
			    );
			
			    expect(result.current.getValues(['test'])).toEqual(['default']);
			  \});
			
			  it('should not get value from default value when field is not registered', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm(\{
			        defaultValues: \{
			          test: 'default',
			        \},
			      \}),
			    );
			
			    expect(result.current.getValues()).toEqual(\{
			      test: 'default',
			    \});
			  \});
			
			  it('should return defaultValues when inputs are not registered', () => \{
			    let data: unknown;
			
			    const Component = () => \{
			      const \{ getValues \} = useForm(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			      \});
			
			      if (!data) \{
			        data = getValues();
			      \}
			
			      return null;
			    \};
			
			    render(<Component />);
			
			    expect(data).toEqual(\{ test: 'test' \});
			  \});
			
			  it('should return defaultValues deep merge with form values', async () => \{
			    let data: unknown;
			
			    const Component = () => \{
			      const \{ getValues, register \} = useForm(\{
			        defaultValues: \{
			          test: \{
			            firstName: 'test',
			            lastName: 'test',
			            time: new Date('1999-09-09'),
			            file: new File([''], 'filename'),
			          \},
			        \},
			      \});
			
			      if (!data) \{
			        data = getValues();
			      \}
			
			      return (
			        <div>
			          <input \{...register('test.firstName')\} />
			          <button
			            onClick=\{() => \{
			              data = getValues();
			            \}\}
			          >
			            getValues
			          </button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(data).toEqual(\{
			      test: \{
			        firstName: 'test',
			        lastName: 'test',
			        time: new Date('1999-09-09'),
			        file: new File([''], 'filename'),
			      \},
			    \});
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '1234',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(data).toMatchObject(\{
			      test: \{
			        firstName: '1234',
			        lastName: 'test',
			      \},
			    \});
			  \});
			
			  it('should return mounted input value after async reset', async () => \{
			    let updatedValue: unknown;
			
			    type FormValues = \{
			      firstName: string;
			    \};
			
			    function Form() \{
			      const \{ handleSubmit, reset, getValues \} = useFormContext();
			      const \{ isDirty, isValid \} = useFormState();
			
			      return (
			        <form
			          onSubmit=\{handleSubmit(async (data) => \{
			            await Promise.resolve();
			            reset(data);
			          \})\}
			        >
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              updatedValue = getValues();
			            \}\}
			          >
			            getValues
			          </button>
			          <button type="submit" disabled=\{!isDirty || !isValid\}>
			            submit
			          </button>
			
			          <Controller
			            name="firstName"
			            rules=\{\{ required: true \}\}
			            render=\{(\{ field \}) => <input \{...field\} />\}
			          />
			        </form>
			      );
			    \}
			
			    function App() \{
			      const methods = useForm<FormValues>(\{
			        defaultValues: \{
			          firstName: 'test',
			        \},
			      \});
			
			      return (
			        <FormProvider \{...methods\}>
			          <Form />
			        </FormProvider>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'test1' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(screen.getByRole('button', \{ name: 'submit' \})).toBeDisabled();
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'test2' \},
			    \});
			
			    await waitFor(() =>
			      expect(screen.getByRole('button', \{ name: 'submit' \})).not.toBeDisabled(),
			    );
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'getValues' \}));
			
			    expect(updatedValue).toEqual(\{
			      firstName: 'test2',
			    \});
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'test3' \},
			    \});
			
			    expect(screen.getByRole('button', \{ name: 'submit' \})).not.toBeDisabled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\getValues.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(14)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\handleSubmit.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			import isFunction from '../../utils/isFunction';
			
			describe('handleSubmit', () => \{
			  it('should invoke the callback when validation pass', async () => \{
			    const \{ result \} = renderHook(() => useForm());
			    const callback = jest.fn();
			
			    await act(async () => \{
			      await result.current.handleSubmit(callback)(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			    expect(callback).toBeCalled();
			  \});
			
			  it('should pass default value', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string; deep: \{ nested: string; values: string \} \}>(\{
			        mode: VALIDATION_MODE.onSubmit,
			        defaultValues: \{
			          test: 'data',
			          deep: \{
			            values: '5',
			          \},
			        \},
			      \}),
			    );
			
			    result.current.register('test');
			    result.current.register('deep.nested');
			    result.current.register('deep.values');
			
			    await act(async () => \{
			      await result.current.handleSubmit((data: any) => \{
			        expect(data).toEqual(\{
			          test: 'data',
			          deep: \{
			            nested: undefined,
			            values: '5',
			          \},
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  it('should not pass default value when field is not registered', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string; deep: \{ nested: string; values: string \} \}>(\{
			        mode: VALIDATION_MODE.onSubmit,
			        defaultValues: \{
			          test: 'data',
			          deep: \{
			            values: '5',
			          \},
			        \},
			      \}),
			    );
			
			    await act(async () => \{
			      await result.current.handleSubmit((data: any) => \{
			        expect(data).toEqual(\{
			          test: 'data',
			          deep: \{
			            values: '5',
			          \},
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  it('should not provide reference to _formValues as data', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string; deep: \{ values: string \} \}>(\{
			        mode: VALIDATION_MODE.onSubmit,
			        defaultValues: \{
			          test: 'data',
			          deep: \{
			            values: '5',
			          \},
			        \},
			      \}),
			    );
			
			    await act(async () => \{
			      await result.current.handleSubmit((data: any) => \{
			        data.deep.values = '12';
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			
			    await act(async () => \{
			      await result.current.handleSubmit((data: any) => \{
			        expect(data.deep).toEqual(\{ values: '5' \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  it('should not invoke callback when there are errors', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			
			    result.current.register('test', \{ required: true \});
			
			    const callback = jest.fn();
			
			    await act(async () => \{
			      await result.current.handleSubmit(callback)(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			    expect(callback).not.toBeCalled();
			  \});
			
			  it('should not focus if errors is exist', async () => \{
			    const focus = jest.fn();
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			    const \{ ref \} = result.current.register('test', \{ required: true \});
			
			    result.current.formState;
			
			    isFunction(ref) &&
			      ref(\{
			        focus,
			      \});
			
			    const callback = jest.fn();
			    await act(async () => \{
			      await result.current.handleSubmit(callback)(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			
			    expect(callback).not.toBeCalled();
			    expect(focus).toBeCalled();
			    expect(result.current.control._formState.errors?.test?.type).toBe(
			      'required',
			    );
			  \});
			
			  it('should not focus if shouldFocusError is false', async () => \{
			    const mockFocus = jest.spyOn(HTMLInputElement.prototype, 'focus');
			
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string \}>(\{ shouldFocusError: false \}),
			    );
			
			    result.current.register('test', \{ required: true \});
			    result.current.formState;
			
			    const callback = jest.fn();
			    await act(async () => \{
			      await result.current.handleSubmit(callback)(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			
			    expect(callback).not.toBeCalled();
			    expect(mockFocus).not.toBeCalled();
			    expect(result.current.control._formState.errors?.test?.type).toBe(
			      'required',
			    );
			  \});
			
			  it('should submit form data when inputs are removed', async () => \{
			    const \{ result, unmount \} = renderHook(() =>
			      useForm<\{
			        test: string;
			      \}>(),
			    );
			
			    result.current.register('test');
			    result.current.setValue('test', 'test');
			
			    unmount();
			
			    await act(async () =>
			      result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: 'test',
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent),
			    );
			  \});
			
			  it('should invoke onSubmit callback and reset nested errors when submit with valid form values', async () => \{
			    const callback = jest.fn();
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: \{ firstName: string; lastName: string \}[];
			      \}>(),
			    );
			    const validate = () => \{
			      return !!result.current
			        .getValues()
			        .test.some((\{ firstName \}) => firstName);
			    \};
			
			    result.current.register('test.0.firstName', \{
			      validate,
			    \});
			    result.current.register('test.0.lastName', \{
			      validate,
			    \});
			    result.current.register('test.1.firstName', \{
			      validate,
			    \});
			    result.current.register('test.1.lastName', \{
			      validate,
			    \});
			
			    await act(async () => \{
			      await result.current.handleSubmit(callback)(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			
			    expect(callback).not.toBeCalled();
			
			    result.current.setValue('test.0.firstName', 'test');
			
			    await act(async () => \{
			      await result.current.handleSubmit(callback)(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			
			    expect(callback).toBeCalled();
			  \});
			
			  it('should bubble the error up when an error occurs in the provided handleSubmit function', async () => \{
			    const errorMsg = 'this is an error';
			    const App = () => \{
			      const [error, setError] = React.useState('');
			      const \{ register, handleSubmit \} = useForm();
			
			      const rejectPromiseFn = jest.fn().mockRejectedValue(new Error(errorMsg));
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			          <p>\{error\}</p>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              handleSubmit(rejectPromiseFn)().catch((err) =>
			                setError(err.message),
			              )
			            \}
			          >
			            Submit
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText(errorMsg)).toBeVisible();
			  \});
			
			  describe('with validationSchema', () => \{
			    it('should invoke callback when error not found', async () => \{
			      const resolver = async (data: any) => \{
			        return \{
			          values: data,
			          errors: \{\},
			        \};
			      \};
			
			      const \{ result \} = renderHook(() =>
			        useForm<\{ test: string \}>(\{
			          mode: VALIDATION_MODE.onSubmit,
			          resolver,
			        \}),
			      );
			
			      result.current.register('test', \{ required: true \});
			
			      const callback = jest.fn();
			
			      await act(async () => \{
			        await result.current.handleSubmit(callback)(\{
			          preventDefault: () => \{\},
			          persist: () => \{\},
			        \} as React.SyntheticEvent);
			      \});
			      expect(callback).toBeCalled();
			    \});
			
			    it('should invoke callback with transformed values', async () => \{
			      const resolver = async () => \{
			        return \{
			          values: \{ test: 'test' \},
			          errors: \{\},
			        \};
			      \};
			
			      const \{ result \} = renderHook(() =>
			        useForm<\{ test: string \}>(\{
			          mode: VALIDATION_MODE.onSubmit,
			          resolver,
			        \}),
			      );
			
			      result.current.register('test', \{ required: true \});
			
			      const callback = jest.fn();
			
			      await act(async () => \{
			        await result.current.handleSubmit(callback)(\{
			          preventDefault: () => \{\},
			          persist: () => \{\},
			        \} as React.SyntheticEvent);
			      \});
			      expect(callback.mock.calls[0][0]).toEqual(\{ test: 'test' \});
			    \});
			  \});
			
			  describe('with onInvalid callback', () => \{
			    it('should invoke the onValid callback when validation pass', async () => \{
			      const \{ result \} = renderHook(() => useForm());
			      const onValidCallback = jest.fn();
			      const onInvalidCallback = jest.fn();
			
			      await act(async () => \{
			        await result.current.handleSubmit(
			          onValidCallback,
			          onInvalidCallback,
			        )(\{
			          preventDefault: () => \{\},
			          persist: () => \{\},
			        \} as React.SyntheticEvent);
			      \});
			      expect(onValidCallback).toBeCalledTimes(1);
			      expect(onInvalidCallback).not.toBeCalledTimes(1);
			    \});
			
			    it('should invoke the onInvalid callback when validation failed', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{
			          test: string;
			        \}>(),
			      );
			      result.current.register('test', \{ required: true \});
			      const onValidCallback = jest.fn();
			      const onInvalidCallback = jest.fn();
			
			      await act(async () => \{
			        await result.current.handleSubmit(
			          onValidCallback,
			          onInvalidCallback,
			        )(\{
			          preventDefault: () => \{\},
			          persist: () => \{\},
			        \} as React.SyntheticEvent);
			      \});
			
			      expect(onValidCallback).not.toBeCalledTimes(1);
			      expect(onInvalidCallback).toBeCalledTimes(1);
			    \});
			  \});
			
			  it('should not provide internal errors reference to onInvalid callback', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: string;
			      \}>(),
			    );
			    result.current.register('test', \{ required: true \});
			
			    await act(async () => \{
			      await result.current.handleSubmit(
			        () => \{\},
			        (errors) => \{
			          Object.freeze(errors);
			        \},
			      )(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			
			    await act(async () => \{
			      expect(() =>
			        result.current.setError('test', \{ message: 'Not enough', type: 'min' \}),
			      ).not.toThrow();
			    \});
			  \});
			
			  it('should be able to submit correctly when errors contains empty array object', async () => \{
			    const onSubmit = jest.fn();
			
			    const App = () => \{
			      const \{ register, control, handleSubmit \} = useForm(\{
			        defaultValues: \{
			          test: [\{ name: '1234' \}],
			        \},
			        mode: 'onChange',
			      \});
			      const \{ fields, remove \} = useFieldArray(\{ control, name: 'test' \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit(() => \{
			            onSubmit();
			          \})\}
			        >
			          \{fields.map((field, index) => \{
			            return (
			              <input
			                key=\{field.id\}
			                \{...register(\`test.\$\{index\}.name\`, \{ required: true \})\}
			              />
			            );
			          \})\}
			
			          <button type=\{'button'\} onClick=\{() => remove(0)\}>
			            remove
			          </button>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(onSubmit).not.toBeCalled();
			  \});
			
			  it('should be able to submit correctly when errors contains empty array object and errors state is subscribed', async () => \{
			    const onSubmit = jest.fn();
			
			    const App = () => \{
			      const \{
			        register,
			        control,
			        handleSubmit,
			        formState: \{ errors \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: [\{ name: '1234' \}],
			        \},
			        mode: 'onChange',
			      \});
			      const \{ fields, remove \} = useFieldArray(\{ control, name: 'test' \});
			
			      return (
			        <>
			          <p>Number of errors: \{Object.keys(errors).length\}</p>
			          <form
			            onSubmit=\{handleSubmit(() => \{
			              onSubmit();
			            \})\}
			          >
			            \{fields.map((field, index) => \{
			              return (
			                <input
			                  key=\{field.id\}
			                  \{...register(\`test.\$\{index\}.name\`, \{ required: true \})\}
			                />
			              );
			            \})\}
			
			            <button type=\{'button'\} onClick=\{() => remove(0)\}>
			              remove
			            </button>
			            <button>submit</button>
			          </form>
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    expect(await screen.findByText('Number of errors: 1')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'remove' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    await waitFor(() => expect(onSubmit).toBeCalled());
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\handleSubmit.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\register.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			  waitForElementToBeRemoved,
			\} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Controller \} from '../../controller';
			import \{ UseFormRegister \} from '../../types';
			import \{ useForm \} from '../../useForm';
			import \{ FormProvider, useFormContext \} from '../../useFormContext';
			import isFunction from '../../utils/isFunction';
			import isString from '../../utils/isString';
			
			describe('register', () => \{
			  it('should support register passed to ref', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string \}>(\{
			        defaultValues: \{
			          test: 'testData',
			        \},
			      \}),
			    );
			
			    const \{ ref \} = result.current.register('test');
			
			    isFunction(ref) &&
			      ref(\{
			        target: \{
			          value: 'testData',
			        \},
			      \});
			
			    await act(async () => \{
			      await result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: 'testData',
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  test.each([['text'], ['radio'], ['checkbox']])(
			    'should register field for %s type and remain its value after unmount',
			    async (type) => \{
			      const Component = () => \{
			        const \{
			          register,
			          watch,
			          formState: \{ isDirty \},
			        \} = useForm<\{
			          test: string;
			        \}>(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			        \});
			
			        const test = watch('test');
			
			        return (
			          <form>
			            <input type=\{type\} \{...register('test')\} />
			            <span role="alert">\{\`\$\{isDirty\}\`\}</span>
			            \{test\}
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      const ref = screen.getByRole(type === 'text' ? 'textbox' : type);
			
			      ref.remove();
			
			      expect(screen.getByRole('alert').textContent).toBe('false');
			
			      expect(screen.getByText('test')).toBeVisible();
			    \},
			  );
			
			  test.each([['text'], ['radio'], ['checkbox']])(
			    'should not register the same %s input',
			    async (type) => \{
			      const callback = jest.fn();
			      const Component = () => \{
			        const \{ register, handleSubmit \} = useForm<\{
			          test: string;
			        \}>();
			        return (
			          <div>
			            <input type=\{type\} \{...register('test')\} />
			
			            <button onClick=\{handleSubmit(callback)\}>submit</button>
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: /submit/ \}));
			
			      await waitFor(() =>
			        expect(callback).toHaveBeenCalledWith(
			          \{
			            test: type === 'checkbox' ? false : type === 'radio' ? null : '',
			          \},
			          expect.any(Object),
			        ),
			      );
			    \},
			  );
			
			  it('should determine checkbox group by type of reference value', async () => \{
			    const callback = jest.fn();
			    const Component = () => \{
			      const \{ register, handleSubmit \} = useForm<\{
			        test: string[];
			      \}>(\{
			        defaultValues: \{
			          test: [],
			        \},
			      \});
			      return (
			        <div>
			          <input type="checkbox" value="A" \{...register('test')\} />
			
			          <button onClick=\{handleSubmit(callback)\}>submit</button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('checkbox'));
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/ \}));
			
			    await waitFor(() =>
			      expect(callback).toHaveBeenCalledWith(
			        \{
			          test: ['A'],
			        \},
			        expect.any(Object),
			      ),
			    );
			  \});
			
			  it('should re-render if errors occurred with resolver when formState.isValid is defined', async () => \{
			    const Component = () => \{
			      const \{ register, formState \} = useForm<\{ test: string \}>(\{
			        resolver: async (data) => \{
			          return \{
			            values: data,
			            errors: \{
			              test: \{
			                type: 'test',
			              \},
			            \},
			          \};
			        \},
			      \});
			
			      return (
			        <div>
			          <input \{...register('test')\} />
			          <span role="alert">\{\`\$\{formState.isValid\}\`\}</span>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(screen.getByRole('alert').textContent).toBe('false');
			  \});
			
			  it('should be set default value when item is remounted again', async () => \{
			    const \{ result, unmount \} = renderHook(() => useForm<\{ test: string \}>());
			
			    result.current.register('test');
			
			    result.current.setValue('test', 'test');
			
			    unmount();
			
			    const ref = \{ type: 'text', name: 'test' \};
			
			    result.current.register('test');
			
			    expect(ref).toEqual(\{ type: 'text', name: 'test' \});
			
			    expect(result.current.getValues()).toEqual(\{ test: 'test' \});
			  \});
			
			  // issue: https://github.com/react-hook-form/react-hook-form/issues/2298
			  it('should reset isValid formState after reset with valid value in initial render', async () => \{
			    const Component = () => \{
			      const \{ register, reset, formState \} = useForm<\{
			        issue: string;
			        test: string;
			      \}>(\{
			        mode: VALIDATION_MODE.onChange,
			      \});
			
			      React.useEffect(() => \{
			        setTimeout(() => \{
			          reset(\{ issue: 'test', test: 'test' \});
			        \});
			      \}, [reset]);
			
			      return (
			        <div>
			          <input \{...register('test', \{ required: true \})\} />
			          <input type="text" \{...register('issue', \{ required: true \})\} />
			          <button disabled=\{!formState.isValid\}>submit</button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    await waitFor(() => \{
			      expect(screen.getByRole('button')).not.toBeDisabled();
			    \});
			  \});
			
			  it('should update isValid correctly with custom registered input', async () => \{
			    function Component() \{
			      const \{
			        register,
			        setValue,
			        formState: \{ isValid \},
			      \} = useForm(\{
			        defaultValues: \{ a: 'default', b: '' \},
			        mode: 'onChange',
			      \});
			
			      React.useEffect(() => \{
			        register('a', \{
			          required: 'required',
			        \});
			        register('b', \{
			          required: 'required',
			        \});
			      \}, [register]);
			
			      return (
			        <form>
			          <input
			            placeholder=\{'inputA'\}
			            onChange=\{(\{ target: \{ value \} \}) =>
			              setValue('a', value, \{ shouldDirty: true, shouldValidate: true \})
			            \}
			          />
			          <input
			            placeholder=\{'inputB'\}
			            onChange=\{(\{ target: \{ value \} \}) =>
			              setValue('b', value, \{ shouldDirty: true, shouldValidate: true \})
			            \}
			          />
			          <div>\{String(isValid)\}</div>
			        </form>
			      );
			    \}
			
			    render(<Component />);
			
			    expect(screen.getByText('false')).toBeVisible();
			
			    fireEvent.input(screen.getByPlaceholderText('inputA'), \{
			      target: \{ value: 'test' \},
			    \});
			
			    expect(await screen.findByText('false')).toBeVisible();
			
			    fireEvent.input(screen.getByPlaceholderText('inputB'), \{
			      target: \{ value: 'test' \},
			    \});
			
			    expect(await screen.findByText('true')).toBeVisible();
			  \});
			
			  it('should custom register with value and can be updated', async () => \{
			    const App = () => \{
			      const [inputValue, setInput] = React.useState(1);
			      const [data, setData] = React.useState('');
			      const \{ handleSubmit, register, setValue \} = useForm<\{ test: string \}>();
			
			      React.useEffect(() => \{
			        register('test', \{
			          value: 'bill',
			        \});
			      \}, [register]);
			
			      return (
			        <form>
			          <button
			            type=\{'button'\}
			            onClick=\{handleSubmit((data) => \{
			              setData(data.test);
			            \})\}
			          >
			            handleSubmit
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              setValue('test', '1234');
			              setInput(inputValue + 1);
			            \}\}
			          >
			            update
			          </button>
			          <p>\{data\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'handleSubmit' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'update' \}));
			
			    expect(await screen.findByText('bill')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'handleSubmit' \}));
			
			    expect(await screen.findByText('1234')).toBeVisible();
			  \});
			
			  it('should not affect or check against defaultChecked inputs', async () => \{
			    type FormValues = Partial<\{
			      radio: string;
			      checkbox: string[];
			    \}>;
			    let output: FormValues;
			
			    output = \{\};
			
			    function Component() \{
			      const \{ register, handleSubmit \} = useForm<FormValues>();
			
			      return (
			        <form
			          onSubmit=\{handleSubmit((data) => \{
			            output = data;
			          \})\}
			        >
			          <input \{...register('radio')\} type="radio" value="Yes" />
			          <input
			            \{...register('radio')\}
			            type="radio"
			            value="No"
			            defaultChecked
			          />
			          <input \{...register('checkbox')\} type="checkbox" value="Yes" />
			          <input
			            \{...register('checkbox')\}
			            type="checkbox"
			            value="No"
			            defaultChecked
			          />
			          <button />
			        </form>
			      );
			    \}
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() =>
			      expect(output).toEqual(\{
			        checkbox: ['No'],
			        radio: 'No',
			      \}),
			    );
			  \});
			
			  describe('when defaultValue is provided', () => \{
			    it('should check checkbox by default when value matches', async () => \{
			      type FormValues = Partial<\{
			        checkbox: string;
			      \}>;
			
			      function Component() \{
			        const \{ register \} = useForm<FormValues>(\{
			          defaultValues: \{
			            checkbox: 'A',
			          \},
			        \});
			
			        return (
			          <form>
			            <input \{...register('checkbox')\} type="checkbox" value="A" />
			            <button />
			          </form>
			        );
			      \}
			
			      render(<Component />);
			
			      expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(
			        true,
			      );
			    \});
			
			    it('should not check checkboxes when defaultValue is empty array', async () => \{
			      type FormValues = Partial<\{
			        checkbox: string[];
			      \}>;
			
			      function Component() \{
			        const \{ register \} = useForm<FormValues>(\{
			          defaultValues: \{
			            checkbox: [],
			          \},
			        \});
			
			        return (
			          <form>
			            <input \{...register('checkbox')\} type="checkbox" value="A" />
			            <button />
			          </form>
			        );
			      \}
			
			      render(<Component />);
			
			      expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(
			        false,
			      );
			    \});
			
			    it('should only check checkboxes when array defaultValue includes input value', async () => \{
			      type FormValues = Partial<\{
			        checkbox: string[];
			      \}>;
			
			      function Component() \{
			        const \{ register \} = useForm<FormValues>(\{
			          defaultValues: \{
			            checkbox: ['B'],
			          \},
			        \});
			
			        return (
			          <form>
			            <input
			              \{...register('checkbox')\}
			              type="checkbox"
			              value="A"
			              aria-label="checkbox-A"
			            />
			            <input \{...register('checkbox')\} type="checkbox" value="B" />
			            <button />
			          </form>
			        );
			      \}
			
			      render(<Component />);
			
			      expect(
			        (screen.getByLabelText('checkbox-A') as HTMLInputElement).checked,
			      ).toBe(false);
			    \});
			  \});
			
			  it('should remove input value and reference with shouldUnregister: true', () => \{
			    type FormValue = \{
			      test: string;
			    \};
			    const watchedValue: FormValue[] = [];
			    const Component = () => \{
			      const \{ register, watch \} = useForm<FormValue>(\{
			        defaultValues: \{
			          test: 'bill',
			        \},
			      \});
			      const [show, setShow] = React.useState(true);
			      watchedValue.push(watch());
			
			      return (
			        <>
			          \{show && <input \{...register('test', \{ shouldUnregister: true \})\} />\}
			          <button onClick=\{() => setShow(false)\}>hide</button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(watchedValue.at(-1)).toEqual(\{ test: 'bill' \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    // Let's check all values of renders with implicitly the number of render (for each value)
			    expect(watchedValue).toEqual([
			      \{
			        test: 'bill',
			      \},
			      \{
			        test: 'bill',
			      \},
			      \{\},
			    ]);
			  \});
			
			  it('should keep defaultValue with shouldUnregister: true when input unmounts', () => \{
			    type FormValue = \{
			      test: string;
			    \};
			
			    const Component = () => \{
			      const \{ register \} = useForm<FormValue>(\{
			        defaultValues: \{
			          test: 'bill',
			        \},
			        shouldUnregister: true,
			      \});
			      const [show, setShow] = React.useState(true);
			
			      return (
			        <>
			          \{show && <input \{...register('test', \{ shouldUnregister: true \})\} />\}
			          <button onClick=\{() => setShow(!show)\}>hide</button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'bill',
			    );
			
			    fireEvent.click(screen.getByRole('button'));
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'bill',
			    );
			  \});
			
			  it('should skip register absent fields which are checkbox/radio inputs', async () => \{
			    let data: unknown;
			
			    const App = () => \{
			      const \{ register, handleSubmit \} = useForm(\{
			        defaultValues: \{
			          test: ['1', '2', '3'],
			          nested: \{
			            test: \{\},
			            test1: [],
			          \},
			        \},
			      \});
			      return (
			        <form onSubmit=\{handleSubmit((d) => (data = d))\}>
			          <input type="checkbox" \{...register('test')\} value=\{'1'\} />
			          <input type="checkbox" \{...register('test')\} value=\{'2'\} />
			          <input type="checkbox" \{...register('test')\} value=\{'3'\} />
			          <button>Submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() =>
			      expect(data).toEqual(\{
			        nested: \{
			          test: \{\},
			          test1: [],
			        \},
			        test: ['1', '2', '3'],
			      \}),
			    );
			
			    fireEvent.click(screen.getAllByRole('checkbox')[0]);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() =>
			      expect(data).toEqual(\{
			        test: ['2', '3'],
			        nested: \{
			          test: \{\},
			          test1: [],
			        \},
			      \}),
			    );
			  \});
			
			  describe('register disabled', () => \{
			    it('should return undefined for disabled inputs', async () => \{
			      let output = \{\};
			      const defaultValues = \{
			        test: true,
			      \};
			
			      function App() \{
			        const \{ register, handleSubmit \} = useForm(\{
			          defaultValues: defaultValues,
			        \});
			
			        return (
			          <form
			            onSubmit=\{handleSubmit((values) => \{
			              output = values;
			            \})\}
			          >
			            \{[
			              \{ value: 'test', label: 'test' \},
			              \{ value: 'test1', label: 'test1' \},
			            ].map((item) => (
			              <input
			                key=\{item.value\}
			                type="checkbox"
			                \{...register('test', \{
			                  disabled: true,
			                \})\}
			              />
			            ))\}
			            <button type="submit">submit</button>
			          </form>
			        );
			      \}
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(output).toEqual(\{
			        test: undefined,
			      \});
			    \});
			
			    it('should omit all inputs which has disabled set to true', async () => \{
			      let outputData: object = \{\};
			      const watchedData: object[] = [];
			
			      const Component = () => \{
			        const \{ register, handleSubmit, watch \} = useForm<\{
			          test?: string;
			          test1?: string;
			          test2?: string;
			          test3?: string;
			          test4: string;
			        \}>();
			
			        watchedData.push(watch());
			
			        return (
			          <form
			            onSubmit=\{handleSubmit((data) => \{
			              outputData = data;
			            \})\}
			          >
			            <input \{...register('test')\} disabled />
			            <input
			              disabled
			              value=\{'test'\}
			              type=\{'checkbox'\}
			              \{...register('test1')\}
			            />
			            <input
			              disabled
			              value=\{'test'\}
			              type=\{'radio'\}
			              \{...register('test2')\}
			            />
			            <select \{...register('test3')\} disabled />
			            <input \{...register('test4')\} data-testid=\{'input'\} />
			            <button>Submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.change(screen.getByTestId('input'), \{
			        target: \{ value: '1234' \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(watchedData).toStrictEqual([
			        \{\},
			        \{
			          test: undefined,
			          test1: undefined,
			          test2: undefined,
			          test3: undefined,
			          test4: '1234',
			        \},
			      ]);
			
			      await waitFor(() =>
			        expect(outputData).toStrictEqual(\{
			          test: undefined,
			          test1: undefined,
			          test2: undefined,
			          test3: undefined,
			          test4: '1234',
			        \}),
			      );
			    \});
			
			    it('should validate value after toggling enabled/disabled on input', async () => \{
			      const defaultValue = 'Test';
			      const validate = jest.fn();
			      const submit = jest.fn();
			      const onSubmit = (values: unknown) => \{
			        submit(values);
			      \};
			
			      const App = () => \{
			        const [editable, setEditable] = React.useState(false);
			        const \{ register, handleSubmit \} = useForm();
			
			        return (
			          <form onSubmit=\{handleSubmit(onSubmit)\}>
			            <input
			              defaultValue=\{defaultValue\}
			              \{...register('test', \{ validate, disabled: !editable \})\}
			            />
			            <button type="button" onClick=\{() => setEditable(!editable)\}>
			              Toggle Edit
			            </button>
			            <button type="submit">Submit</button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect(validate).toBeCalledTimes(0);
			
			      fireEvent.click(screen.getByText('Toggle Edit'));
			      fireEvent.click(screen.getByText('Submit'));
			
			      expect(validate).toBeCalledWith(defaultValue, \{ test: 'Test' \});
			      await waitFor(() =>
			        expect(submit).toBeCalledWith(\{ test: defaultValue \}),
			      );
			
			      fireEvent.click(screen.getByText('Toggle Edit'));
			      fireEvent.click(screen.getByText('Submit'));
			
			      await waitFor(() => expect(submit).toBeCalledWith(\{ test: undefined \}));
			    \});
			
			    it('should not throw errors with disabled input', async () => \{
			      const message = 'Must have at least one checked!';
			
			      function Checkbox() \{
			        const \{ register \} = useFormContext();
			
			        return (
			          <>
			            <p>
			              Must select:
			              <input
			                type="checkbox"
			                value="test"
			                \{...register('test', \{
			                  disabled: false,
			                  validate: (value) => \{
			                    return value && value.length > 0 ? true : message;
			                  \},
			                \})\}
			              />
			              A
			            </p>
			          </>
			        );
			      \}
			
			      function App() \{
			        const formMethods = useForm(\{
			          mode: 'onSubmit',
			          defaultValues: \{ test: '' \},
			        \});
			        const \{ handleSubmit, formState \} = formMethods;
			
			        return (
			          <>
			            <FormProvider \{...formMethods\}>
			              <form onSubmit=\{handleSubmit(() => \{\})\}>
			                <Checkbox />
			                <button>Submit</button>
			                <p>\{formState.errors.test?.message\}</p>
			              </form>
			            </FormProvider>
			          </>
			        );
			      \}
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText(message)).toBeVisible();
			
			      fireEvent.click(screen.getByRole('checkbox'));
			      fireEvent.click(screen.getByRole('button'));
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() =>
			        expect(screen.queryByText(message)).not.toBeInTheDocument(),
			      );
			    \});
			
			    it('should affect a group of checked attribute with disabled attribute', () => \{
			      const App = () => \{
			        const \{ register \} = useForm();
			        const options = [
			          \{ checked: false, disabled: false, value: 'test' \},
			          \{ checked: true, disabled: true, value: 'test1' \},
			          \{ checked: false, disabled: false, value: 'test2' \},
			        ];
			
			        return (
			          <>
			            \{options.map((option, index) => \{
			              return (
			                <div key=\{index\}>
			                  <input
			                    \{...register('test')\}
			                    type="checkbox"
			                    disabled=\{option.disabled\}
			                    value=\{option.value\}
			                    defaultChecked=\{option.checked\}
			                    data-testid=\{'checkbox' + index\}
			                  />
			                </div>
			              );
			            \})\}
			          </>
			        );
			      \};
			
			      render(<App />);
			
			      expect(
			        (screen.getByTestId('checkbox0') as HTMLInputElement).checked,
			      ).toBeFalsy();
			      expect(
			        (screen.getByTestId('checkbox1') as HTMLInputElement).checked,
			      ).toBeTruthy();
			      expect(
			        (screen.getByTestId('checkbox2') as HTMLInputElement).checked,
			      ).toBeFalsy();
			    \});
			
			    it('should affect a single checked attribute with disabled attribute', () => \{
			      const App = () => \{
			        const \{ register \} = useForm<\{
			          test: boolean;
			          test1: boolean;
			          test2: boolean;
			        \}>(\{
			          defaultValues: \{
			            test: true,
			            test1: true,
			          \},
			        \});
			
			        return (
			          <div>
			            <input
			              \{...register('test')\}
			              type="checkbox"
			              disabled=\{true\}
			              data-testid="checkbox1"
			            />
			            <input
			              \{...register('test1')\}
			              type="checkbox"
			              disabled=\{true\}
			              data-testid="checkbox2"
			            />
			            <input
			              \{...register('test2')\}
			              type="checkbox"
			              disabled=\{true\}
			              defaultChecked=\{true\}
			              data-testid="checkbox3"
			            />
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      expect(
			        (screen.getByTestId('checkbox1') as HTMLInputElement).checked,
			      ).toBeTruthy();
			      expect(
			        (screen.getByTestId('checkbox2') as HTMLInputElement).checked,
			      ).toBeTruthy();
			      expect(
			        (screen.getByTestId('checkbox3') as HTMLInputElement).checked,
			      ).toBeTruthy();
			    \});
			
			    it('should work correctly with toggle disabled attribute and validation', async () => \{
			      type FormValues = \{
			        test: string;
			      \};
			
			      function Input(\{
			        disabled,
			        register,
			      \}: \{
			        disabled: boolean;
			        register: UseFormRegister<FormValues>;
			      \}) \{
			        const options = \{
			          disabled,
			          validate: (value: string) => \{
			            return value && value.length > 0
			              ? true
			              : 'Must have at least one checked!';
			          \},
			        \};
			
			        return (
			          <input type="checkbox" value="a" \{...register('test', options)\} />
			        );
			      \}
			
			      const App = () => \{
			        const [value, setValue] = React.useState(\{\});
			        const [disabled, setDisabled] = React.useState(false);
			        const \{
			          register,
			          handleSubmit,
			          formState: \{ errors \},
			        \} = useForm<FormValues>();
			
			        return (
			          <form onSubmit=\{handleSubmit(setValue)\}>
			            <Input register=\{register\} disabled=\{disabled\} />
			            \{errors.test && <p>error</p>\}
			            <button type=\{'button'\} onClick=\{() => setDisabled(!disabled)\}>
			              setDisabled
			            </button>
			            <button>submit</button>
			            <p>\{JSON.stringify(value)\}</p>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('checkbox'));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			      expect(await screen.findByText('\{"test":"a"\}')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setDisabled' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			      expect(await screen.findByText('\{\}')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setDisabled' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			      expect(await screen.findByText('\{"test":"a"\}')).toBeVisible();
			    \});
			  \});
			
			  describe('register valueAs', () => \{
			    it('should return number value with valueAsNumber', async () => \{
			      let output = \{\};
			      const Component = () => \{
			        const \{ register, handleSubmit \} = useForm<\{
			          test: number;
			          test1: boolean;
			        \}>();
			
			        return (
			          <form onSubmit=\{handleSubmit((data) => (output = data))\}>
			            <input \{...register('test', \{ valueAsNumber: true \})\} />
			            <input
			              \{...register('test1', \{
			                setValueAs: (value: string) => value === 'true',
			              \})\}
			            />
			            <button>submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.input(screen.getAllByRole('textbox')[0], \{
			        target: \{
			          value: '12345',
			        \},
			      \});
			
			      fireEvent.input(screen.getAllByRole('textbox')[1], \{
			        target: \{
			          value: 'true',
			        \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() => expect(output).toEqual(\{ test: 12345, test1: true \}));
			    \});
			
			    it('should return undefined value with setValueAs', async () => \{
			      let output = \{\};
			      const Component = () => \{
			        const \{ register, handleSubmit \} = useForm<\{
			          test: number;
			        \}>();
			
			        return (
			          <form onSubmit=\{handleSubmit((data) => (output = data))\}>
			            <input
			              \{...register('test', \{
			                setValueAs: (value: string) =>
			                  value === '' ? undefined : +value,
			              \})\}
			              defaultValue=\{12345\}
			            />
			            <button>submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.input(screen.getByRole('textbox'), \{
			        target: \{
			          value: '',
			        \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(output).toEqual(\{ test: undefined \});
			    \});
			
			    it('should return NaN when value is valid', async () => \{
			      let output = \{\};
			      const Component = () => \{
			        const \{ register, handleSubmit \} = useForm<\{
			          test: number;
			        \}>();
			
			        return (
			          <form onSubmit=\{handleSubmit((data) => (output = data))\}>
			            <input \{...register('test', \{ valueAsNumber: true \})\} />
			            <button>submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.input(screen.getByRole('textbox'), \{
			        target: \{
			          value: '',
			        \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() => expect(output).toEqual(\{ test: NaN \}));
			    \});
			
			    it('should validate input before the valueAs', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: number;
			          test1: number;
			        \}>(\{
			          mode: 'onChange',
			        \});
			
			        return (
			          <>
			            <input
			              \{...register('test', \{
			                validate: (data) => \{
			                  return !isString(data);
			                \},
			              \})\}
			            />
			            <span role="alert">\{errors.test && 'Not number'\}</span>
			
			            <input
			              \{...register('test1', \{
			                valueAsNumber: true,
			                min: 20,
			              \})\}
			            />
			            <span role="alert">\{errors.test1 && 'Number length'\}</span>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{
			          value: '123',
			        \},
			      \});
			
			      expect(await screen.findByText('Not number')).toBeVisible();
			
			      fireEvent.change(screen.getAllByRole('textbox')[1], \{
			        target: \{
			          value: '12',
			        \},
			      \});
			
			      expect(await screen.findByText('Number length')).toBeVisible();
			    \});
			
			    it('should be able to validate against formValues', async () => \{
			      const App = () => \{
			        const \{
			          register,
			          formState: \{ errors \},
			        \} = useForm(\{
			          mode: 'onChange',
			          defaultValues: \{
			            test: '',
			            test1: '',
			          \},
			        \});
			
			        return (
			          <>
			            <input
			              \{...register('test', \{
			                validate: (data, formValues) => data === formValues.test1,
			              \})\}
			            />
			            <span role="alert">\{errors.test ? 'Not number' : 'No error'\}</span>
			
			            <input \{...register('test1')\} />
			          </>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{
			          value: '1',
			        \},
			      \});
			
			      await waitFor(() => screen.findByText('Not number'));
			
			      fireEvent.change(screen.getAllByRole('textbox')[1], \{
			        target: \{
			          value: '11',
			        \},
			      \});
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{
			          value: '11',
			        \},
			      \});
			
			      await waitFor(() => screen.findByText('No error'));
			    \});
			
			    it('should send valueAs fields to schema validation', () => \{
			      let output: any;
			
			      const Component = () => \{
			        const \{ register, trigger \} = useForm<\{
			          test: number;
			          test1: any;
			          test2: boolean;
			        \}>(\{
			          resolver: (data) => \{
			            output = data;
			            return \{
			              values: \{
			                test: 1,
			                test1: 2,
			                test2: true,
			              \},
			              errors: \{\},
			            \};
			          \},
			        \});
			
			        return (
			          <form>
			            <input \{...register('test', \{ valueAsNumber: true \})\} />
			            <input \{...register('test1', \{ valueAsDate: true \})\} />
			            <input
			              \{...register('test2', \{ setValueAs: (data) => data === 'test' \})\}
			            />
			            <button type="button" onClick=\{() => trigger()\}>
			              trigger
			            </button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{ value: 1 \},
			      \});
			      fireEvent.change(screen.getAllByRole('textbox')[1], \{
			        target: \{ value: '1990' \},
			      \});
			      fireEvent.change(screen.getAllByRole('textbox')[2], \{
			        target: \{ value: 'test' \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(output).toEqual(\{
			        test: 1,
			
			        test1: new Date('1990'),
			        test2: true,
			      \});
			    \});
			
			    it('should send valueAs fields to in build validator', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          trigger,
			          formState: \{ errors \},
			        \} = useForm(\{
			          mode: 'onChange',
			        \});
			
			        return (
			          <>
			            <input
			              \{...register('test', \{
			                validate: (value) => \{
			                  return value === 1;
			                \},
			                valueAsNumber: true,
			              \})\}
			            />
			            \{errors.test && <p>test error</p>\}
			            <input
			              \{...register('test1', \{
			                validate: (value) => \{
			                  return value === 1;
			                \},
			                setValueAs: (value) => parseInt(value),
			              \})\}
			            />
			            \{errors.test1 && <p>test1 error</p>\}
			            <button onClick=\{() => trigger()\}>trigger</button>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('test error')).toBeVisible();
			      expect(screen.getByText('test1 error')).toBeVisible();
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{
			          value: '1',
			        \},
			      \});
			
			      fireEvent.change(screen.getAllByRole('textbox')[1], \{
			        target: \{
			          value: '1',
			        \},
			      \});
			
			      await waitForElementToBeRemoved(screen.queryByText('test error'));
			      expect(screen.queryByText('test1 error')).not.toBeInTheDocument();
			    \});
			
			    it('should send valueAs fields to resolver', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          trigger,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: number;
			          test1: number;
			        \}>(\{
			          mode: 'onChange',
			          resolver: async (data) => \{
			            const valid = !(isNaN(data.test) && isNaN(data.test1));
			
			            return \{
			              errors: valid
			                ? \{\}
			                : \{
			                    test: \{
			                      type: 'error',
			                      message: 'issue',
			                    \},
			                    test1: \{
			                      type: 'error',
			                      message: 'issue',
			                    \},
			                  \},
			              values: valid
			                ? \{
			                    test: 1,
			                    test1: 2,
			                  \}
			                : \{\},
			            \};
			          \},
			        \});
			
			        return (
			          <>
			            <input
			              \{...register('test', \{
			                validate: (value) => \{
			                  return value === 1;
			                \},
			                valueAsNumber: true,
			              \})\}
			            />
			            \{errors.test && <p>test error</p>\}
			            <input
			              \{...register('test1', \{
			                validate: (value) => \{
			                  return value === 1;
			                \},
			                setValueAs: (value) => parseInt(value),
			              \})\}
			            />
			            \{errors.test && <p>test1 error</p>\}
			            <button onClick=\{() => trigger()\}>trigger</button>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('test error')).toBeVisible();
			      expect(screen.getByText('test1 error')).toBeVisible();
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{
			          value: '1',
			        \},
			      \});
			
			      fireEvent.change(screen.getAllByRole('textbox')[1], \{
			        target: \{
			          value: '1',
			        \},
			      \});
			
			      await waitForElementToBeRemoved(screen.queryByText('test error'));
			      expect(screen.queryByText('test1 error')).not.toBeInTheDocument();
			    \});
			
			    it('should still validate with an error existed', async () => \{
			      function App() \{
			        const \{
			          register,
			          handleSubmit,
			          setError,
			          formState: \{ errors \},
			        \} = useForm<\{ firstName: string \}>();
			        const \{ name, ref, onBlur, onChange \} = register('firstName');
			
			        return (
			          <form
			            onSubmit=\{handleSubmit(() => \{
			              setError('firstName', \{
			                type: 'manual',
			                message: 'Empty',
			              \});
			            \})\}
			          >
			            <input
			              placeholder="First Name"
			              name=\{name\}
			              ref=\{ref\}
			              onBlur=\{onBlur\}
			              onChange=\{onChange\}
			            />
			            \{errors.firstName && <div>\{errors.firstName.message\}</div>\}
			            <input type="submit" />
			          </form>
			        );
			      \}
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('Empty')).toBeVisible();
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      await waitForElementToBeRemoved(screen.queryByText('Empty'));
			    \});
			  \});
			
			  it('should not register nested input', () => \{
			    const watchedValue: unknown[] = [];
			    let inputs: unknown;
			
			    const Checkboxes = (\{
			      value,
			      onChange,
			    \}: \{
			      value: boolean[];
			      onChange: (value: boolean[]) => void;
			    \}) => \{
			      const [checkboxValue, setCheckboxValue] = React.useState(value);
			
			      return (
			        <div>
			          \{value.map((_, index) => (
			            <input
			              key=\{index\}
			              onChange=\{(e) => \{
			                const updatedValue = checkboxValue.map((item, i) => \{
			                  if (index === i) \{
			                    return e.target.checked;
			                  \}
			                  return item;
			                \});
			
			                setCheckboxValue(updatedValue);
			                onChange(updatedValue);
			              \}\}
			              type="checkbox"
			              checked=\{checkboxValue[index]\}
			            />
			          ))\}
			        </div>
			      );
			    \};
			
			    function App() \{
			      const \{ control, watch \} = useForm(\{
			        defaultValues: \{
			          test: [true, false, false],
			        \},
			      \});
			      inputs = control._fields;
			      watchedValue.push(watch());
			
			      return (
			        <form>
			          <Controller
			            name="test"
			            control=\{control\}
			            render=\{(\{ field \}) => (
			              <Checkboxes onChange=\{field.onChange\} value=\{field.value\} />
			            )\}
			          />
			          <input type="submit" />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getAllByRole('checkbox')[0]);
			
			    expect(watchedValue).toEqual([
			      \{ test: [true, false, false] \},
			      \{ test: [false, false, false] \},
			    ]);
			
			    expect(inputs).toEqual(\{
			      test: \{
			        _f: \{
			          mount: true,
			          name: 'test',
			          ref: \{
			            name: 'test',
			          \},
			          value: [false, false, false],
			        \},
			      \},
			    \});
			  \});
			
			  describe('when setValueAs is presented with inputs', () => \{
			    it('should not update inputs correctly with useForm defaultValues', () => \{
			      const App = () => \{
			        const \{ register \} = useForm(\{
			          defaultValues: \{
			            test: '1234',
			          \},
			        \});
			        return (
			          <form>
			            <input
			              \{...register('test', \{ setValueAs: (value) => value + '5' \})\}
			            />
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        '1234',
			      );
			    \});
			
			    it('should not update inputs correctly with reset', () => \{
			      const App = () => \{
			        const \{ register, reset \} = useForm();
			
			        React.useEffect(() => \{
			          reset(\{
			            test: '1234',
			          \});
			        \}, [reset]);
			
			        return (
			          <form>
			            <input
			              \{...register('test', \{ setValueAs: (value) => value + '5' \})\}
			            />
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        '1234',
			      );
			    \});
			
			    it('should populate input as string and submit as datetime object ', async () => \{
			      let submitData: unknown;
			
			      const App = () => \{
			        const \{ register, handleSubmit \} = useForm<\{
			          test: Date | string;
			        \}>(\{
			          defaultValues: \{
			            test: '2020-10-10',
			          \},
			        \});
			
			        return (
			          <form
			            onSubmit=\{handleSubmit((data) => \{
			              submitData = data;
			            \})\}
			          >
			            <input \{...register('test', \{ valueAsDate: true \})\} />
			            <button>Submit</button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        '2020-10-10',
			      );
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() =>
			        expect(submitData).toEqual(\{
			          test: new Date('2020-10-10'),
			        \}),
			      );
			    \});
			  \});
			
			  it('should not throw error when register with non input ref', () => \{
			    const App = () => \{
			      const \{ register \} = useForm();
			
			      return (
			        <div \{...register('test')\}>
			          <h1>test</h1>
			        </div>
			      );
			    \};
			
			    render(<App />);
			  \});
			
			  it('should be able to register input/textarea/select when embedded deeply', async () => \{
			    let submitData: unknown;
			
			    const Select = React.forwardRef<HTMLDivElement>((_, ref) => \{
			      return (
			        <div ref=\{ref\}>
			          <select data-testid="select">
			            <option value=\{''\}></option>
			            <option value=\{'select'\}>select</option>
			          </select>
			        </div>
			      );
			    \});
			
			    Select.displayName = 'Select';
			
			    const Input = React.forwardRef<HTMLDivElement>((_, ref) => \{
			      return (
			        <div ref=\{ref\}>
			          <input data-testid="input" />
			        </div>
			      );
			    \});
			
			    Input.displayName = 'Input';
			
			    const Textarea = React.forwardRef<HTMLDivElement>((_, ref) => \{
			      return (
			        <div ref=\{ref\}>
			          <textarea data-testid="textarea" />
			        </div>
			      );
			    \});
			
			    Textarea.displayName = 'Textarea';
			
			    const App = () => \{
			      const \{ register, handleSubmit \} = useForm(\{
			        defaultValues: \{
			          input: 'input',
			          select: 'select',
			          textarea: 'textarea',
			        \},
			      \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit((data) => \{
			            submitData = data;
			          \})\}
			        >
			          <Input \{...register('input')\} />
			          <Select \{...register('select')\} />
			          <Textarea \{...register('textarea')\} />
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() =>
			      expect(submitData).toEqual(\{
			        input: 'input',
			        select: 'select',
			        textarea: 'textarea',
			      \}),
			    );
			
			    expect((screen.getByTestId('input') as HTMLInputElement).value).toEqual(
			      'input',
			    );
			    expect((screen.getByTestId('select') as HTMLSelectElement).value).toEqual(
			      'select',
			    );
			    expect(
			      (screen.getByTestId('textarea') as HTMLTextAreaElement).value,
			    ).toEqual('textarea');
			  \});
			
			  it('should should trigger deps validation', async () => \{
			    const App = () => \{
			      const \{ register, getValues, formState \} = useForm<\{
			        firstName: string;
			        lastName: string;
			      \}>(\{
			        mode: 'onChange',
			      \});
			
			      return (
			        <div>
			          <input
			            \{...register('firstName', \{
			              validate: (value) => \{
			                return getValues('lastName') === value;
			              \},
			            \})\}
			          />
			          \{formState.errors.firstName && <p>error</p>\}
			          <input \{...register('lastName', \{ deps: ['firstName'] \})\} />
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(await screen.findByText('error')).toBeVisible();
			
			    fireEvent.change(screen.getAllByRole('textbox')[1], \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    await waitForElementToBeRemoved(screen.queryByText('error'));
			  \});
			
			  it('should should trigger deps validation with schema validation', async () => \{
			    const App = () => \{
			      const \{ register, formState \} = useForm<\{
			        firstName: string;
			        lastName: string;
			      \}>(\{
			        mode: 'onChange',
			        resolver: (values) => \{
			          if (values.firstName === values.lastName) \{
			            return \{
			              errors: \{\},
			              values,
			            \};
			          \} else \{
			            return \{
			              errors: \{
			                firstName: \{
			                  type: 'error',
			                \},
			                lastName: \{
			                  type: 'error',
			                \},
			              \},
			              values,
			            \};
			          \}
			        \},
			      \});
			
			      return (
			        <div>
			          <input \{...register('firstName')\} />
			          \{formState.errors.firstName && <p>firstName error</p>\}
			          <input \{...register('lastName', \{ deps: ['firstName'] \})\} />
			          \{formState.errors.lastName && <p>lastName error</p>\}
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(await screen.findByText('firstName error')).toBeVisible();
			
			    fireEvent.change(screen.getAllByRole('textbox')[1], \{
			      target: \{
			        value: 'test1',
			      \},
			    \});
			
			    expect(await screen.findByText('lastName error')).toBeVisible();
			
			    fireEvent.change(screen.getAllByRole('textbox')[1], \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    await waitFor(() =>
			      expect(screen.queryByText(/error/)).not.toBeInTheDocument(),
			    );
			  \});
			
			  it('should trigger custom onChange event', async () => \{
			    const onChange = jest.fn();
			
			    const App = () => \{
			      const \{ register \} = useForm();
			
			      return (
			        <form>
			          <input \{...register('test', \{ onChange \})\} />
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.blur(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: 'value',
			      \},
			    \});
			
			    expect(onChange).toBeCalledTimes(0);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: 'value',
			      \},
			    \});
			
			    expect(onChange).toBeCalledTimes(1);
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        bubbles: true,
			        cancelable: false,
			        currentTarget: null,
			        type: 'change',
			      \}),
			    );
			  \});
			
			  it('should trigger custom onBlur event', async () => \{
			    const onBlur = jest.fn();
			
			    const App = () => \{
			      const \{ register \} = useForm();
			
			      return (
			        <form>
			          <input \{...register('test', \{ onBlur \})\} />
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: 'value',
			      \},
			    \});
			
			    expect(onBlur).toBeCalledTimes(0);
			
			    fireEvent.blur(screen.getAllByRole('textbox')[0]);
			
			    expect(onBlur).toBeCalledTimes(1);
			    expect(onBlur).toBeCalledWith(
			      expect.objectContaining(\{
			        bubbles: true,
			        cancelable: false,
			        currentTarget: null,
			        type: 'blur',
			      \}),
			    );
			  \});
			
			  it('should not programmatically set input file value with FileList', async () => \{
			    function App() \{
			      const \{ register, watch \} = useForm();
			      const moreDetail = watch('toggle');
			
			      return (
			        <form>
			          <input type="checkbox" \{...register('toggle')\} />
			
			          \{moreDetail && (
			            <div>
			              <label>Interests</label>
			              <input
			                type="file"
			                \{...register('Interests')\}
			                placeholder=\{'test'\}
			              />
			            </div>
			          )\}
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('checkbox'));
			
			    expect(await screen.findByPlaceholderText('test')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('checkbox'));
			
			    await waitFor(() =>
			      expect(screen.queryByPlaceholderText('test')).not.toBeInTheDocument(),
			    );
			
			    fireEvent.click(screen.getByRole('checkbox'));
			
			    expect(await screen.findByPlaceholderText('test')).toBeVisible();
			  \});
			
			  it('should set value before custom onChange', () => \{
			    const test = jest.fn();
			
			    const App = () => \{
			      const \{ register, getValues \} = useForm();
			
			      return (
			        <input
			          \{...register('test', \{
			            onChange: () => \{
			              test(getValues());
			            \},
			          \})\}
			        />
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'test' \},
			    \});
			
			    expect(test).toBeCalledWith(\{
			      test: 'test',
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\register.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(43)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\reset.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  act as actComponent,
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			\} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ Controller \} from '../../controller';
			import \{
			  Control,
			  UseFormRegister,
			  UseFormReset,
			  UseFormReturn,
			\} from '../../types';
			import \{ useController \} from '../../useController';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			import \{ useWatch \} from '../../useWatch';
			
			jest.useFakeTimers();
			
			describe('reset', () => \{
			  it('should reset the form and re-render the form', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			
			    result.current.register('test');
			    result.current.setValue('test', 'data');
			
			    expect(result.current.formState.isSubmitted).toBeFalsy();
			    await act(async () => \{
			      await result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: 'data',
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			
			    expect(result.current.formState.isSubmitted).toBeTruthy();
			    act(() => result.current.reset());
			    expect(result.current.formState.isSubmitted).toBeFalsy();
			  \});
			
			  it('should reset form value', () => \{
			    let methods: any;
			    const App = () => \{
			      methods = useForm<\{
			        test: string;
			      \}>();
			      return (
			        <form>
			          <input \{...methods.register('test')\} />
			        </form>
			      );
			    \};
			    render(<App />);
			
			    actComponent(() =>
			      methods.reset(\{
			        test: 'test',
			      \}),
			    );
			
			    expect(methods.getValues()).toEqual(\{
			      test: 'test',
			    \});
			  \});
			
			  it('should reset the form with callback action', () => \{
			    const App = () => \{
			      const \{ register, reset \} = useForm(\{
			        defaultValues: \{
			          test: '',
			        \},
			      \});
			
			      React.useEffect(() => \{
			        reset((formValues) => \{
			          return \{
			            ...formValues,
			            test: 'test',
			          \};
			        \});
			      \}, [reset]);
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'test',
			    );
			  \});
			
			  it('should set array value of multiple checkbox inputs correctly', async () => \{
			    const App = () => \{
			      const \{ register \} = useForm<\{
			        test: string[];
			      \}>(\{
			        defaultValues: \{
			          test: ['1', '2'],
			        \},
			      \});
			
			      return (
			        <>
			          <input type="checkbox" value=\{'1'\} \{...register('test')\} />
			          <input type="checkbox" value=\{'2'\} \{...register('test')\} />
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    screen
			      .getAllByRole('checkbox')
			      .forEach((checkbox) =>
			        expect((checkbox as HTMLInputElement).checked).toBeTruthy(),
			      );
			  \});
			
			  it('should reset the form if ref is HTMLElement and parent element is not form', async () => \{
			    const mockReset = jest.spyOn(window.HTMLFormElement.prototype, 'reset');
			    let methods: UseFormReturn<\{
			      test: string;
			    \}>;
			    const App = () => \{
			      methods = useForm<\{
			        test: string;
			      \}>();
			      return <input \{...methods.register('test')\} />;
			    \};
			    render(<App />);
			
			    actComponent(() => methods.reset());
			
			    expect(mockReset).not.toHaveBeenCalled();
			  \});
			
			  it('should set default value if values is specified to first argument', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: string;
			      \}>(),
			    );
			
			    result.current.register('test');
			
			    act(() => result.current.reset(\{ test: 'test' \}));
			
			    expect(result.current.control._defaultValues).toEqual(\{
			      test: 'test',
			    \});
			  \});
			
			  it('should reset unmountFieldsState value when shouldUnregister set to false', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: string;
			      \}>(),
			    );
			
			    result.current.register('test');
			
			    act(() => result.current.reset(\{ test: 'test' \}));
			  \});
			
			  it('should not reset unmountFieldsState value by default', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: string;
			      \}>(),
			    );
			
			    result.current.register('test');
			
			    act(() => result.current.reset(\{ test: 'test' \}));
			  \});
			
			  it('should not reset form values when keepValues is specified', () => \{
			    const App = () => \{
			      const \{ register, reset \} = useForm();
			
			      return (
			        <>
			          <input \{...register('test')\} />
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              reset(undefined, \{
			                keepValues: true,
			              \})
			            \}
			          >
			            reset
			          </button>
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'test',
			    );
			  \});
			
			  it('should not reset form defaultValues when keepDefaultValues is specified', async () => \{
			    const App = () => \{
			      const \{
			        register,
			        reset,
			        formState: \{ isDirty \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: 'test1',
			        \},
			      \});
			
			      return (
			        <>
			          <input \{...register('test')\} />
			          <p>\{isDirty ? 'dirty' : ''\}</p>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              reset(undefined, \{
			                keepValues: true,
			              \})
			            \}
			          >
			            reset
			          </button>
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'test',
			    );
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test2',
			      \},
			    \});
			
			    expect(await screen.findByText('dirty')).toBeVisible();
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test1',
			      \},
			    \});
			
			    expect(screen.queryByText('dirty')).not.toBeInTheDocument();
			  \});
			
			  it('should update dirty and dirtyFields when keepDefaultValues and updatedValues is provided', async () => \{
			    function App() \{
			      const \{
			        register,
			        reset,
			        formState: \{ isDirty, dirtyFields \},
			      \} = useForm(\{
			        defaultValues: \{
			          firstName: 'test',
			        \},
			      \});
			
			      return (
			        <form>
			          <input \{...register('firstName')\} placeholder="First Name" />
			          <p>\{isDirty ? 'dirty' : 'pristine'\}</p>
			          <p>\{JSON.stringify(dirtyFields)\}</p>
			
			          <button
			            type="button"
			            onClick=\{() => \{
			              reset(
			                \{
			                  firstName: 'other',
			                \},
			                \{
			                  keepDefaultValues: true,
			                \},
			              );
			            \}\}
			          >
			            test
			          </button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('dirty')).toBeVisible();
			    expect(screen.getByText('\{"firstName":true\}')).toBeVisible();
			  \});
			
			  it('should not reset if keepStateOption is specified', async () => \{
			    let formState = \{\};
			    const onSubmit = jest.fn();
			
			    const App = () => \{
			      const \{
			        register,
			        handleSubmit,
			        reset,
			        formState: \{ touchedFields, errors, isDirty \},
			      \} = useForm<\{ test: string \}>(\{
			        defaultValues: \{
			          test: '',
			        \},
			      \});
			
			      formState = \{ touchedFields, errors, isDirty \};
			
			      return (
			        <form onSubmit=\{handleSubmit(onSubmit)\}>
			          <input \{...register('test', \{ required: true, minLength: 3 \})\} />
			          <button>submit</button>
			          <button
			            onClick=\{() => \{
			              reset(
			                \{ test: '' \},
			                \{
			                  keepErrors: true,
			                  keepDirty: true,
			                  keepIsSubmitted: true,
			                  keepTouched: true,
			                  keepSubmitCount: true,
			                \},
			              );
			            \}\}
			            type=\{'button'\}
			          >
			            reset
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
			    await waitFor(() =>
			      expect(formState).toEqual(\{
			        errors: \{\},
			        isDirty: true,
			        touchedFields: \{
			          test: true,
			        \},
			      \}),
			    );
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			    expect(formState).toEqual(\{
			      errors: \{\},
			      isDirty: true,
			      touchedFields: \{
			        test: true,
			      \},
			    \});
			  \});
			
			  it('should reset field array fine with empty value', async () => \{
			    let data: unknown;
			    const App = () => \{
			      const \{ control, register, reset, handleSubmit \} = useForm<\{
			        test: \{
			          firstName: string;
			          lastName: string;
			        \}[];
			      \}>();
			      const \{ fields \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit((d) => \{
			            data = d;
			          \})\}
			        >
			          \{fields.map((field, index) => (
			            <div key=\{field.id\}>
			              <input \{...register(\`test.\$\{index\}.firstName\` as const)\} />
			              <Controller
			                control=\{control\}
			                name=\{\`test.\$\{index\}.lastName\` as const\}
			                render=\{(\{ field \}) => <input \{...field\} />\}
			              />
			            </div>
			          ))\}
			
			          <button>submit</button>
			
			          <button type=\{'button'\} onClick=\{() => reset()\}>
			            reset
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() =>
			              reset(\{
			                test: [\{ firstName: 'test', lastName: 'test' \}],
			              \})
			            \}
			          >
			            reset with value
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    const resetButton = screen.getByRole('button', \{ name: 'reset' \});
			    const submitButton = screen.getByRole('button', \{ name: 'submit' \});
			
			    fireEvent.click(resetButton);
			    fireEvent.click(submitButton);
			
			    await waitFor(() => expect(data).toEqual(\{\}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'reset with value' \}));
			    fireEvent.click(submitButton);
			
			    await waitFor(() =>
			      expect(data).toEqual(\{
			        test: [\{ firstName: 'test', lastName: 'test' \}],
			      \}),
			    );
			  \});
			
			  it('should return reset nested value', () => \{
			    const getValuesResult: unknown[] = [];
			
			    function App() \{
			      const [, update] = React.useState(\{\});
			      const \{ register, reset, getValues \} = useForm<\{
			        names: \{ name: string \}[];
			      \}>(\{
			        defaultValues: \{
			          names: [\{ name: 'test' \}],
			        \},
			      \});
			
			      React.useEffect(() => \{
			        reset(\{ names: [\{ name: 'Bill' \}, \{ name: 'Luo' \}] \});
			      \}, [reset]);
			
			      getValuesResult.push(getValues());
			
			      return (
			        <form>
			          <input \{...register('names.0.name')\} placeholder="Name" />
			          <button type=\{'button'\} onClick=\{() => update(\{\})\}>
			            update
			          </button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(getValuesResult).toEqual([
			      \{
			        names: [
			          \{
			            name: 'test',
			          \},
			        ],
			      \},
			      \{
			        names: [
			          \{
			            name: 'Bill',
			          \},
			          \{
			            name: 'Luo',
			          \},
			        ],
			      \},
			      \{
			        names: [
			          \{
			            name: 'Bill',
			          \},
			          \{
			            name: 'Luo',
			          \},
			        ],
			      \},
			    ]);
			  \});
			
			  it('should keep defaultValues after reset with shouldKeepDefaultValues', async () => \{
			    type FormValues = \{ test: string; test1: string \};
			    const ControlledInput = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const \{ field \} = useController(\{
			        name: 'test',
			        control,
			      \});
			
			      return <input \{...field\} />;
			    \};
			
			    function App() \{
			      const \{ control, register, reset \} = useForm<FormValues>(\{
			        defaultValues: \{ test: 'test', test1: 'test1' \},
			      \});
			      const resetData = () => \{
			        reset(undefined, \{ keepDefaultValues: true \});
			      \};
			
			      return (
			        <form>
			          <ControlledInput control=\{control\} />
			          <input \{...register('test1')\} />
			          <input type="button" onClick=\{resetData\} value="Reset" />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{ value: 'data' \},
			    \});
			
			    fireEvent.change(screen.getAllByRole('textbox')[1], \{
			      target: \{ value: 'data' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('test');
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('test1');
			  \});
			
			  describe('when reset optional props set to keepDirtyValues', () => \{
			    describe('with uncontrolled components', () => \{
			      let updatedDirtyFields: Record<string, boolean> = \{\};
			      let updatedDirty = false;
			      let submittedValue: unknown = \{\};
			
			      function App() \{
			        const [showButton, setShowButton] = React.useState(false);
			        const \{
			          reset,
			          register,
			          handleSubmit,
			          formState: \{ dirtyFields, isDirty \},
			        \} = useForm();
			
			        updatedDirtyFields = dirtyFields;
			        updatedDirty = isDirty;
			
			        React.useEffect(() => \{
			          setTimeout(() => \{
			            reset(
			              \{
			                firstName: 'bill',
			                lastName: 'luo',
			              \},
			              \{ keepDirtyValues: true \},
			            );
			            setShowButton(true);
			          \}, 500);
			        \}, [reset]);
			
			        return (
			          <form
			            onSubmit=\{handleSubmit((data) => \{
			              submittedValue = data;
			            \})\}
			          >
			            <input \{...register('firstName')\} placeholder="First Name" />
			            <input \{...register('lastName')\} placeholder="Last Name" />
			
			            \{showButton && (
			              <button
			                type="button"
			                onClick=\{() => \{
			                  reset();
			                \}\}
			              >
			                reset
			              </button>
			            )\}
			            <button>submit</button>
			          </form>
			        );
			      \}
			
			      it('should only update new reset values', async () => \{
			        render(<App />);
			
			        await waitFor(() =>
			          expect(
			            (screen.getByPlaceholderText('First Name') as HTMLInputElement)
			              .value,
			          ).toEqual('bill'),
			        );
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			        expect(updatedDirtyFields).toEqual(\{\});
			        expect(updatedDirty).toBeFalsy();
			
			        expect(
			          (screen.getByPlaceholderText('First Name') as HTMLInputElement).value,
			        ).toEqual('bill');
			
			        expect(updatedDirtyFields).toEqual(\{\});
			        expect(updatedDirty).toBeFalsy();
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			        await waitFor(() =>
			          expect(submittedValue).toEqual(\{
			            firstName: 'bill',
			            lastName: 'luo',
			          \}),
			        );
			      \});
			
			      it('should only update none dirty fields and keep other values updated', async () => \{
			        render(<App />);
			
			        fireEvent.change(screen.getByPlaceholderText('First Name'), \{
			          target: \{
			            value: 'test',
			          \},
			        \});
			
			        await waitFor(() =>
			          expect(
			            (screen.getByPlaceholderText('Last Name') as HTMLInputElement)
			              .value,
			          ).toEqual('luo'),
			        );
			
			        expect(updatedDirtyFields).toEqual(\{
			          firstName: true,
			        \});
			        expect(updatedDirty).toBeFalsy();
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			        await waitFor(() =>
			          expect(submittedValue).toEqual(\{
			            firstName: 'test',
			            lastName: 'luo',
			          \}),
			        );
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			        expect(
			          (screen.getByPlaceholderText('First Name') as HTMLInputElement).value,
			        ).toEqual('bill');
			
			        expect(updatedDirtyFields).toEqual(\{\});
			        expect(updatedDirty).toBeFalsy();
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			        await waitFor(() =>
			          expect(submittedValue).toEqual(\{
			            firstName: 'bill',
			            lastName: 'luo',
			          \}),
			        );
			      \});
			    \});
			
			    describe('with controlled components', () => \{
			      let updatedDirtyFields: Record<string, boolean> = \{\};
			      let updatedDirty = false;
			      let submittedValue: unknown = \{\};
			
			      function App() \{
			        const [showButton, setShowButton] = React.useState(false);
			        const \{
			          reset,
			          control,
			          handleSubmit,
			          formState: \{ dirtyFields, isDirty \},
			        \} = useForm(\{
			          defaultValues: \{
			            firstName: '',
			            lastName: '',
			          \},
			        \});
			
			        updatedDirtyFields = dirtyFields;
			        updatedDirty = isDirty;
			
			        React.useEffect(() => \{
			          setTimeout(() => \{
			            reset(
			              \{
			                firstName: 'bill',
			                lastName: 'luo',
			              \},
			              \{ keepDirtyValues: true \},
			            );
			            setShowButton(true);
			          \}, 500);
			        \}, [reset]);
			
			        return (
			          <form
			            onSubmit=\{handleSubmit((data) => \{
			              submittedValue = data;
			            \})\}
			          >
			            <Controller
			              control=\{control\}
			              render=\{(\{ field \}) => \{
			                return <input \{...field\} placeholder="First Name" />;
			              \}\}
			              name=\{'firstName'\}
			            />
			            <Controller
			              control=\{control\}
			              render=\{(\{ field \}) => \{
			                return <input \{...field\} placeholder="Last Name" />;
			              \}\}
			              name=\{'lastName'\}
			            />
			
			            \{showButton && (
			              <button
			                type="button"
			                onClick=\{() => \{
			                  reset();
			                \}\}
			              >
			                reset
			              </button>
			            )\}
			
			            <button>submit</button>
			          </form>
			        );
			      \}
			
			      it('should only update new reset values', async () => \{
			        render(<App />);
			
			        await waitFor(() =>
			          expect(
			            (screen.getByPlaceholderText('First Name') as HTMLInputElement)
			              .value,
			          ).toEqual('bill'),
			        );
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			        expect(updatedDirtyFields).toEqual(\{\});
			        expect(updatedDirty).toBeFalsy();
			
			        expect(
			          (screen.getByPlaceholderText('First Name') as HTMLInputElement).value,
			        ).toEqual('bill');
			
			        expect(updatedDirtyFields).toEqual(\{\});
			        expect(updatedDirty).toBeFalsy();
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			        await waitFor(() =>
			          expect(submittedValue).toEqual(\{
			            firstName: 'bill',
			            lastName: 'luo',
			          \}),
			        );
			      \});
			
			      it('should only update none dirty fields and keep other values updated', async () => \{
			        render(<App />);
			
			        fireEvent.change(screen.getByPlaceholderText('First Name'), \{
			          target: \{
			            value: 'test',
			          \},
			        \});
			
			        await waitFor(() =>
			          expect(
			            (screen.getByPlaceholderText('Last Name') as HTMLInputElement)
			              .value,
			          ).toEqual('luo'),
			        );
			
			        expect(updatedDirtyFields).toEqual(\{
			          firstName: true,
			        \});
			        expect(updatedDirty).toBeFalsy();
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			        await waitFor(() =>
			          expect(submittedValue).toEqual(\{
			            firstName: 'test',
			            lastName: 'luo',
			          \}),
			        );
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			        expect(
			          (screen.getByPlaceholderText('First Name') as HTMLInputElement).value,
			        ).toEqual('bill');
			
			        expect(updatedDirtyFields).toEqual(\{\});
			        expect(updatedDirty).toBeFalsy();
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			        await waitFor(() =>
			          expect(submittedValue).toEqual(\{
			            firstName: 'bill',
			            lastName: 'luo',
			          \}),
			        );
			      \});
			    \});
			  \});
			
			  it('should allow to reset unmounted field array', () => \{
			    type FormValues = \{
			      test: \{ name: string \}[];
			    \};
			
			    const FieldArray = (\{
			      control,
			      register,
			    \}: \{
			      control: Control<FormValues>;
			      register: UseFormRegister<FormValues>;
			    \}) => \{
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <div>
			          \{fields.map((field, index) => \{
			            return (
			              <input
			                key=\{field.id\}
			                \{...register(\`test.\$\{index\}.name\` as const)\}
			              />
			            );
			          \})\}
			          <button
			            onClick=\{() => \{
			              append(\{ name: '' \});
			            \}\}
			          >
			            append
			          </button>
			        </div>
			      );
			    \};
			
			    const App = () => \{
			      const [show, setShow] = React.useState(true);
			      const \{ control, register, reset \} = useForm<FormValues>();
			
			      return (
			        <div>
			          \{show && <FieldArray control=\{control\} register=\{register\} />\}
			          <button
			            onClick=\{() => \{
			              setShow(!show);
			            \}\}
			          >
			            toggle
			          </button>
			          <button
			            onClick=\{() => \{
			              reset(\{
			                test: [\{ name: 'test' \}],
			              \});
			            \}\}
			          >
			            reset
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    expect(screen.getAllByRole('textbox').length).toEqual(2);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			
			    expect(screen.getAllByRole('textbox').length).toEqual(1);
			  \});
			
			  it('should only return register input when reset is invoked with shouldUnregister:true', async () => \{
			    let submittedData = \{\};
			
			    const App = () => \{
			      const \{ reset, handleSubmit \} = useForm(\{
			        defaultValues: \{
			          test: 'bill',
			        \},
			        shouldUnregister: true,
			      \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit((data) => \{
			            submittedData = data;
			          \})\}
			        >
			          <button>submit</button>
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              reset(\{
			                test: '1234',
			              \});
			            \}\}
			          >
			            reset
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(submittedData).toEqual(\{\});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(submittedData).toEqual(\{\});
			  \});
			
			  it('should update controlled input correctly with shouldUnregister set to true', () => \{
			    function App() \{
			      const \{ register, reset, control \} = useForm(\{
			        defaultValues: \{ uncontrolled: '', control: '' \},
			        shouldUnregister: true,
			      \});
			
			      return (
			        <form>
			          <input \{...register('uncontrolled')\} />
			          <Controller
			            render=\{(\{ field \}) => (
			              <input
			                ref=\{field.ref\}
			                value=\{field.value\}
			                onChange=\{field.onChange\}
			              />
			            )\}
			            name="control"
			            control=\{control\}
			          />
			
			          <button
			            type="button"
			            onClick=\{() => \{
			              reset(\{ uncontrolled: 'uncontrolled', control: 'control' \});
			            \}\}
			          >
			            reset
			          </button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('uncontrolled');
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('control');
			  \});
			
			  it('should keep input values when keepValues is set to true', () => \{
			    function App() \{
			      const \{ register, handleSubmit, reset \} = useForm();
			      const [show, setShow] = React.useState(true);
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <input \{...register('firstName')\} placeholder="First Name" />
			          \{show && <input \{...register('lastName')\} placeholder="Last Name" />\}
			          <button
			            type="button"
			            onClick=\{() => \{
			              reset(\{\}, \{ keepValues: true \});
			            \}\}
			          >
			            reset
			          </button>
			          <button
			            type="button"
			            onClick=\{() => \{
			              setShow(!show);
			            \}\}
			          >
			            toggle
			          </button>
			          <input type="submit" />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{ value: 'test' \},
			    \});
			    fireEvent.change(screen.getAllByRole('textbox')[1], \{
			      target: \{ value: 'test' \},
			    \});
			    fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('test');
			  \});
			
			  it('should not update isMounted when isValid is subscribed', async () => \{
			    const mounted: unknown[] = [];
			
			    const App = () => \{
			      const \{ control, reset \} = useForm();
			
			      mounted.push(control._state.mount);
			
			      React.useEffect(() => \{
			        reset(\{\});
			      \}, [reset]);
			
			      return <form />;
			    \};
			
			    render(<App />);
			
			    expect(mounted).toEqual([false, true]);
			  \});
			
			  it('should update isMounted when isValid is subscribed', async () => \{
			    const mounted: unknown[] = [];
			    let tempControl: Control = \{\} as Control;
			
			    const App = () => \{
			      const \{
			        control,
			        reset,
			        formState: \{ isValid \},
			      \} = useForm();
			
			      mounted.push(control._state.mount);
			      tempControl = control;
			
			      React.useEffect(() => \{
			        reset(\{\});
			      \}, [reset]);
			
			      return (
			        <form>
			          <p>\{isValid ? 'true' : 'false'\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('false')).toBeVisible();
			
			    expect(mounted).toEqual([false, false]);
			
			    expect(tempControl._state.mount).toBeTruthy();
			  \});
			
			  it('should reset values but keep defaultValues', async () => \{
			    const App = () => \{
			      const \{ register, control, reset \} = useForm(\{
			        defaultValues: \{
			          test: 'test',
			          test1: 'test1',
			        \},
			      \});
			
			      return (
			        <>
			          <input \{...register('test')\} />
			          <Controller
			            control=\{control\}
			            render=\{(\{ field \}) => <input \{...field\} />\}
			            name=\{'test1'\}
			          />
			          <button
			            onClick=\{() => \{
			              reset(
			                \{
			                  test: 'changed1',
			                  test1: 'changed2',
			                \},
			                \{ keepDefaultValues: true \},
			              );
			            \}\}
			          >
			            reset
			          </button>
			          <p>\{JSON.stringify(control._defaultValues)\}</p>
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      await screen.findByText('\{"test":"test","test1":"test1"\}'),
			    ).toBeVisible();
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('changed1');
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('changed2');
			  \});
			
			  it('should allow reset at child level before useForm mounted', () => \{
			    type FormValues = \{
			      firstName: string;
			    \};
			
			    const NestChild = (\{ reset \}: \{ reset: UseFormReset<FormValues> \}) => \{
			      React.useEffect(() => \{
			        reset(\{
			          firstName: 'test',
			        \});
			      \}, [reset]);
			
			      return null;
			    \};
			
			    const Child = (\{ reset \}: \{ reset: UseFormReset<FormValues> \}) => \{
			      return <NestChild reset=\{reset\} />;
			    \};
			
			    function App() \{
			      const \{ register, reset, handleSubmit \} = useForm<FormValues>(\{
			        defaultValues: \{
			          firstName: '',
			        \},
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <input \{...register('firstName')\} />
			          <Child reset=\{reset\} />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'test',
			    );
			  \});
			
			  it('should reset field array async', () => \{
			    let tempFields: unknown[] = [];
			
			    function App() \{
			      const \{ control, reset \} = useForm<\{
			        names: \{
			          test: string;
			        \}[];
			      \}>(\{
			        defaultValues: \{
			          names: [],
			        \},
			      \});
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'names',
			      \});
			
			      tempFields = fields;
			
			      return (
			        <form>
			          <button
			            type="button"
			            onClick=\{() => \{
			              setTimeout(() => \{
			                reset();
			              \}, 100);
			            \}\}
			          >
			            reset
			          </button>
			          <button
			            type="button"
			            onClick=\{() =>
			              append(\{
			                test: '1',
			              \})
			            \}
			          >
			            append
			          </button>
			          <ul>
			            \{fields.map((item, index) => (
			              <Controller
			                key=\{item.id\}
			                render=\{(\{ field \}) => <input \{...field\} />\}
			                name=\{\`names.\$\{index\}.test\`\}
			                control=\{control\}
			              />
			            ))\}
			          </ul>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			    fireEvent.click(screen.getByRole('button', \{ name: 'append' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			    actComponent(() => \{
			      jest.advanceTimersByTime(100);
			    \});
			
			    expect(tempFields).toEqual([]);
			  \});
			
			  it('should reset the form after submitted', async () => \{
			    function App() \{
			      const \{
			        register,
			        control,
			        handleSubmit,
			        reset,
			        formState: \{ isDirty, dirtyFields \},
			      \} = useForm(\{
			        defaultValues: \{
			          something: 'anything',
			          test: [\{ firstName: 'Bill', lastName: 'Luo' \}],
			        \},
			      \});
			      const \{ fields \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit((data) => \{
			            reset(\{ ...data \});
			          \})\}
			        >
			          <p>is dirty? \{isDirty ? 'yes' : 'no'\}</p>
			          <p>\{JSON.stringify(dirtyFields)\}</p>
			          <input \{...register('something')\} />
			          <ul>
			            \{fields.map((item, index) => \{
			              return (
			                <li key=\{item.id\}>
			                  <input
			                    defaultValue=\{\`\$\{item.firstName\}\`\}
			                    \{...register(\`test.\$\{index\}.firstName\`)\}
			                  />
			
			                  <Controller
			                    render=\{(\{ field \}) => <input \{...field\} />\}
			                    name=\{\`test.\$\{index\}.lastName\`\}
			                    control=\{control\}
			                    defaultValue=\{item.lastName\}
			                  />
			                </li>
			              );
			            \})\}
			          </ul>
			
			          <button>Submit</button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{ value: '1' \},
			    \});
			    fireEvent.change(screen.getAllByRole('textbox')[1], \{
			      target: \{ value: '2' \},
			    \});
			    fireEvent.change(screen.getAllByRole('textbox')[2], \{
			      target: \{ value: '3' \},
			    \});
			
			    expect(screen.getByText(/yes/i)).toBeVisible();
			    expect(
			      screen.getByText(
			        \`\{"something":true,"test":[\{"firstName":true,"lastName":true\}]\}\`,
			      ),
			    ).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText(/no/i)).toBeVisible();
			
			    expect(
			      (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			    ).toEqual('1');
			    expect(
			      (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			    ).toEqual('2');
			    expect(
			      (screen.getAllByRole('textbox')[2] as HTMLInputElement).value,
			    ).toEqual('3');
			  \});
			
			  it('should keep isSubmitted value when keepIsSubmitted is true', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			
			    expect(result.current.formState.isSubmitted).toBeFalsy();
			
			    await act(() => result.current.reset(undefined, \{ keepIsSubmitted: true \}));
			    expect(result.current.formState.isSubmitted).toBeFalsy();
			
			    result.current.register('test');
			    result.current.setValue('test', 'data');
			
			    await act(async () => \{
			      await result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: 'data',
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			
			    expect(result.current.formState.isSubmitted).toBeTruthy();
			
			    act(() => result.current.reset(undefined, \{ keepIsSubmitted: true \}));
			
			    expect(result.current.formState.isSubmitted).toBeTruthy();
			  \});
			
			  it('should keep track on updated defaultValues', async () => \{
			    function App() \{
			      const \{
			        handleSubmit,
			        reset,
			        formState: \{ defaultValues \},
			      \} = useForm(\{
			        defaultValues: \{ firstName: 'Bill', lastName: 'Luo' \},
			      \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit(() => \{
			            reset(\{ firstName: 'Bill1', lastName: 'Luo1' \});
			          \})\}
			        >
			          <button>Submit</button>
			          <p>\{defaultValues?.firstName\}</p>
			          <p>\{defaultValues?.lastName\}</p>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      expect(screen.getByText('Bill1')).toBeVisible();
			      expect(screen.getByText('Luo1')).toBeVisible();
			    \});
			  \});
			
			  it('should return defaultValues in useWatch and watch when using calling reset with empty object', async () => \{
			    const defaultValues = \{
			      something: 'anything',
			    \};
			
			    function App() \{
			      const \{ control, reset, register, watch \} = useForm(\{
			        defaultValues,
			      \});
			      const watchValue = watch('something');
			      const useWatchValue = useWatch(\{
			        control,
			        name: 'something',
			      \});
			
			      return (
			        <form>
			          <input \{...register('something')\} />
			          <button
			            type="button"
			            onClick=\{() => \{
			              reset(\{\});
			            \}\}
			          >
			            reset
			          </button>
			          <p>watch: \{watchValue\}</p>
			          <p>useWatch: \{useWatchValue\}</p>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: '1' \},
			    \});
			
			    expect(screen.getByText('watch: 1')).toBeVisible();
			    expect(screen.getByText('useWatch: 1')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(screen.getByText('watch: anything')).toBeVisible();
			    expect(screen.getByText('useWatch: anything')).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\reset.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(32)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\resetField.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			
			import \{ useForm \} from '../../useForm';
			
			describe('resetField', () => \{
			  it('should reset input value', () => \{
			    const App = () => \{
			      const \{ register, resetField \} = useForm(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			      \});
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              resetField('test');
			            \}\}
			          >
			            reset
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '1234',
			      \},
			    \});
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      '1234',
			    );
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'test',
			    );
			  \});
			
			  it('should reset input touched field state', async () => \{
			    const App = () => \{
			      const \{
			        register,
			        resetField,
			        formState: \{ touchedFields \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			      \});
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			          <p>\{touchedFields.test ? 'touched' : 'noTouched'\}</p>
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              resetField('test');
			            \}\}
			          >
			            reset
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.focus(screen.getByRole('textbox'));
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    expect(await screen.findByText('touched')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('noTouched')).toBeVisible();
			  \});
			
			  it('should reset input dirty field and dirty state', async () => \{
			    const App = () => \{
			      const \{
			        register,
			        resetField,
			        formState: \{ dirtyFields, isDirty \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			      \});
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			          <p>\{dirtyFields.test ? 'dirty' : 'notDirty'\}</p>
			          <p>\{isDirty ? 'formDirty' : 'formNotDirty'\}</p>
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              resetField('test');
			            \}\}
			          >
			            reset
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '1234',
			      \},
			    \});
			
			    expect(await screen.findByText('dirty')).toBeVisible();
			    expect(screen.getByText('formDirty')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('notDirty')).toBeVisible();
			    expect(screen.getByText('formNotDirty')).toBeVisible();
			  \});
			
			  it('should reset input error field and isValid state', async () => \{
			    const App = () => \{
			      const \{
			        register,
			        resetField,
			        formState: \{ errors, isValid \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			        mode: 'onChange',
			      \});
			
			      return (
			        <form>
			          <input \{...register('test', \{ maxLength: 4 \})\} />
			          <p>\{errors.test ? 'error' : 'noError'\}</p>
			          <p>\{isValid ? 'valid' : 'NotValid'\}</p>
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              resetField('test');
			            \}\}
			          >
			            reset
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('valid')).toBeVisible();
			    expect(screen.getByText('noError')).toBeVisible();
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test12345',
			      \},
			    \});
			
			    expect(await screen.findByText('NotValid')).toBeVisible();
			    expect(screen.getByText('error')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('valid')).toBeVisible();
			    expect(screen.getByText('noError')).toBeVisible();
			  \});
			
			  it('should reset input file to empty string only', () => \{
			    const getValuesFn = jest.fn();
			
			    const App = () => \{
			      const \{ register, resetField, getValues \} = useForm(\{
			        defaultValues: \{
			          test: '',
			        \},
			      \});
			
			      return (
			        <form>
			          <input type=\{'file'\} \{...register('test')\} />
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              resetField('test', \{ defaultValue: '' \});
			            \}\}
			          >
			            reset
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              getValuesFn(getValues());
			            \}\}
			          >
			            getValues
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'getValues' \}));
			
			    expect(getValuesFn).toBeCalledWith(\{ test: '' \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			    expect(getValuesFn).toBeCalledWith(\{ test: '' \});
			  \});
			
			  describe('when provided with options', () => \{
			    it('should update input value and its defaultValue', () => \{
			      const App = () => \{
			        const \{ register, resetField \} = useForm(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			        \});
			
			        return (
			          <form>
			            <input \{...register('test')\} />
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                resetField('test', \{
			                  defaultValue: 'test1234',
			                \});
			              \}\}
			            >
			              reset
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: '1234',
			        \},
			      \});
			
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        '1234',
			      );
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        'test1234',
			      );
			    \});
			
			    it('should keep touched field state', async () => \{
			      const App = () => \{
			        const \{
			          register,
			          resetField,
			          formState: \{ touchedFields \},
			        \} = useForm(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			        \});
			
			        return (
			          <form>
			            <input \{...register('test')\} />
			            <p>\{touchedFields.test ? 'touched' : 'noTouched'\}</p>
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                resetField('test', \{ keepTouched: true \});
			              \}\}
			            >
			              reset
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.focus(screen.getByRole('textbox'));
			
			      fireEvent.blur(screen.getByRole('textbox'));
			
			      expect(await screen.findByText('touched')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('touched')).toBeVisible();
			    \});
			
			    it('should keep dirty field and isDirty state', async () => \{
			      const App = () => \{
			        const \{
			          register,
			          resetField,
			          formState: \{ dirtyFields, isDirty \},
			        \} = useForm(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			        \});
			
			        return (
			          <form>
			            <input \{...register('test')\} />
			            <p>\{dirtyFields.test ? 'dirty' : 'notDirty'\}</p>
			            <p>\{isDirty ? 'formDirty' : 'formNotDirty'\}</p>
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                resetField('test', \{ keepDirty: true \});
			              \}\}
			            >
			              reset
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: '1234',
			        \},
			      \});
			
			      expect(await screen.findByText('dirty')).toBeVisible();
			      expect(screen.getByText('formDirty')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('dirty')).toBeVisible();
			      expect(screen.getByText('formDirty')).toBeVisible();
			    \});
			
			    it('should skip reset error field and isValid state', async () => \{
			      const App = () => \{
			        const \{
			          register,
			          resetField,
			          formState: \{ errors, isValid \},
			        \} = useForm(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			          mode: 'onChange',
			        \});
			
			        return (
			          <form>
			            <input \{...register('test', \{ maxLength: 4 \})\} />
			            <p>\{errors.test ? 'error' : 'noError'\}</p>
			            <p>\{isValid ? 'valid' : 'NotValid'\}</p>
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                resetField('test', \{ keepError: true \});
			              \}\}
			            >
			              reset
			            </button>
			          </form>
			        );
			      \};
			
			      render(<App />);
			
			      expect(await screen.findByText('valid')).toBeVisible();
			      expect(screen.getByText('noError')).toBeVisible();
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'test12345',
			        \},
			      \});
			
			      expect(await screen.findByText('NotValid')).toBeVisible();
			      expect(screen.getByText('error')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('NotValid')).toBeVisible();
			      expect(screen.getByText('error')).toBeVisible();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\resetField.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\resolver.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			
			import \{ useForm \} from '../../useForm';
			
			describe('resolver', () => \{
			  it('should update context within the resolver', async () => \{
			    type FormValues = \{
			      test: string;
			    \};
			
			    const App = () => \{
			      const [test, setTest] = React.useState('');
			      const [data, setData] = React.useState(\{\});
			      const \{ handleSubmit \} = useForm<FormValues>(\{
			        resolver: (_, context) => \{
			          return \{
			            errors: \{\},
			            values: context as FormValues,
			          \};
			        \},
			        context: \{
			          test,
			        \},
			      \});
			
			      return (
			        <>
			          <input
			            value=\{test\}
			            onChange=\{(e) => \{
			              setTest(e.target.value);
			            \}\}
			          />
			          <button onClick=\{handleSubmit((data) => setData(data))\}>Test</button>
			          <p>\{JSON.stringify(data)\}</p>
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'test' \},
			    \});
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(
			      await screen.findByText('\{"test":"test"\}', undefined, \{ timeout: 3000 \}),
			    ).toBeVisible();
			  \});
			
			  it('should support resolver schema switching', async () => \{
			    type FormValues = \{
			      test: string;
			    \};
			
			    const fakeResolver = (schema: boolean) => async () => \{
			      return schema
			        ? \{
			            values: \{ test: 'ok' \},
			            errors: \{\},
			          \}
			        : \{
			            values: \{\},
			            errors: \{
			              test: \{
			                type: 'test',
			                value: \{ message: 'wrong', type: 'test' \},
			              \},
			            \},
			          \};
			    \};
			
			    const App = () => \{
			      const [schema, setSchema] = React.useState(false);
			      const [submit, setSubmit] = React.useState(false);
			      const \{
			        register,
			        handleSubmit,
			        formState: \{ errors \},
			      \} = useForm<FormValues>(\{
			        resolver: fakeResolver(schema),
			      \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit(() => \{
			            setSubmit(true);
			          \})\}
			        >
			          <input \{...register('test')\} />
			          \{errors.test && <p>Error</p>\}
			          \{submit && <p>Submitted</p>\}
			          <button onClick=\{() => setSchema(!schema)\}>Toggle</button>
			          <button>Submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'Submit' \}));
			
			    expect(await screen.findByText('Error')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'Toggle' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'Submit' \}));
			
			    expect(await screen.findByText('Submitted')).toBeVisible();
			  \});
			
			  it('should be called with the shouldUseNativeValidation option to true', async () => \{
			    const test = jest.fn();
			    const resolver = (a: any, b: any, c: any) => \{
			      test(a, b, c);
			      return \{
			        errors: \{\},
			        values: \{\},
			      \};
			    \};
			
			    const App = () => \{
			      const \{ register, handleSubmit \} = useForm(\{
			        resolver: async (data, context, options) =>
			          resolver(data, context, options),
			        shouldUseNativeValidation: true,
			      \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <input \{...register('test')\} />
			          <button>Submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(test.mock.calls[0][2]).toEqual(
			      expect.objectContaining(\{ shouldUseNativeValidation: true \}),
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\resolver.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\setError.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ DeepMap, ErrorOption, FieldError, GlobalError \} from '../../types';
			import \{ useForm \} from '../../useForm';
			
			describe('setError', () => \{
			  const tests: [string, ErrorOption, DeepMap<any, FieldError>][] = [
			    [
			      'should only set an error when it is not existed',
			      \{ type: 'test' \},
			      \{
			        input: \{
			          type: 'test',
			          message: undefined,
			          ref: undefined,
			        \},
			      \},
			    ],
			    [
			      'should set error message',
			      \{ type: 'test', message: 'test' \},
			      \{
			        input: \{
			          type: 'test',
			          message: 'test',
			          ref: undefined,
			          types: undefined,
			        \},
			      \},
			    ],
			    [
			      'should set multiple error type',
			      \{
			        types: \{ test1: 'test1', test2: 'test2' \},
			      \},
			      \{
			        input: \{
			          types: \{
			            test1: 'test1',
			            test2: 'test2',
			          \},
			          ref: undefined,
			        \},
			      \},
			    ],
			  ];
			
			  it.each(tests)('%s', (_, input, output) => \{
			    const \{ result \} = renderHook(() => useForm<\{ input: string \}>());
			
			    result.current.formState.errors;
			
			    act(() => \{
			      result.current.setError('input', input);
			    \});
			    expect(result.current.formState.errors).toEqual(output);
			    expect(result.current.formState.isValid).toBeFalsy();
			  \});
			
			  it('should update isValid with setError', async () => \{
			    const App = () => \{
			      const \{
			        formState: \{ isValid \},
			        setError,
			      \} = useForm(\{
			        mode: 'onChange',
			      \});
			
			      return (
			        <div>
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              setError('test', \{ type: 'test' \});
			            \}\}
			          >
			            setError
			          </button>
			          \{isValid ? 'yes' : 'no'\}
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('yes')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('no')).toBeVisible();
			  \});
			
			  it('should allow to set global error', async () => \{
			    const onSubmit = jest.fn();
			
			    type Errors = \{
			      root: \{
			        customError: GlobalError;
			        serverError: GlobalError;
			      \};
			    \};
			
			    type FormValues = \{
			      test: string;
			    \};
			
			    const App = () => \{
			      const \{
			        formState: \{ errors \},
			        handleSubmit,
			        setError,
			      \} = useForm<FormValues & Errors>(\{
			        mode: 'onChange',
			      \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit(() => \{
			            onSubmit();
			            setError('root.serverError', \{
			              type: '404',
			              message: 'not found',
			            \});
			          \})\}
			        >
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              setError('root.customError', \{
			                type: 'custom',
			                message: 'custom error',
			              \});
			            \}\}
			          >
			            setError
			          </button>
			
			          <p>\{errors?.root?.customError?.message\}</p>
			          <p>\{errors?.root?.serverError?.message\}</p>
			
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'setError' \}));
			
			    await waitFor(() => \{
			      screen.findByText('custom error');
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    await waitFor(() => \{
			      expect(onSubmit).toBeCalled();
			      expect(screen.queryByText('custom error')).not.toBeInTheDocument();
			    \});
			
			    await waitFor(() => \{
			      screen.findByText('not found');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\setError.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\setValue.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Controller \} from '../../controller';
			import \{ Control \} from '../../types';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			import get from '../../utils/get';
			import isFunction from '../../utils/isFunction';
			import \{ sleep \} from '../../utils/sleep';
			
			jest.useFakeTimers();
			
			describe('setValue', () => \{
			  it('should not setValue for unmounted state with shouldUnregister', () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test1: string \}>());
			
			    result.current.register('test1');
			    result.current.setValue('test1', 'data');
			  \});
			
			  it('should empty string when value is null or undefined when registered field is HTMLElement', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test?: string | null \}>(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			      \}),
			    );
			
			    const elm = document.createElement('input');
			    elm.type = 'text';
			    elm.name = 'test';
			
			    result.current.register('test');
			
			    result.current.setValue('test', null);
			
			    expect(elm).not.toHaveValue();
			
			    act(() => \{
			      result.current.unregister('test');
			    \});
			
			    expect(elm).not.toHaveValue();
			  \});
			
			  it('should set value of radio input correctly', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			
			    result.current.register('test');
			
			    result.current.setValue('test', '1');
			
			    await act(async () => \{
			      await result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: '1',
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  it('should set value of file input correctly if value is FileList', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: FileList \}>());
			
			    result.current.register('test');
			
			    // @ts-expect-error
			    const blob = new Blob([''], \{ type: 'image/png', lastModified: 1 \});
			    const file = blob as File;
			    const fileList = \{
			      0: file,
			      1: file,
			      length: 2,
			    \} as unknown as FileList;
			
			    act(() => result.current.setValue('test', fileList));
			
			    await act(async () => \{
			      await result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: fileList,
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  it('should set value of multiple checkbox input correctly', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string[] \}>());
			
			    const \{ ref \} = result.current.register('test');
			
			    const elm = document.createElement('input');
			    elm.type = 'checkbox';
			    elm.name = 'test';
			    elm.value = '2';
			
			    document.body.append(elm);
			    isFunction(ref) && ref(elm);
			
			    const \{ ref: ref1 \} = result.current.register('test');
			
			    const elm1 = document.createElement('input');
			    elm1.type = 'checkbox';
			    elm1.name = 'test';
			    elm1.value = '1';
			
			    document.body.append(elm1);
			
			    isFunction(ref1) && ref1(elm1);
			
			    result.current.setValue('test', ['1']);
			
			    await act(async () => \{
			      await result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: ['1'],
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  it('should set value of single checkbox input correctly', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			
			    result.current.register('test');
			
			    result.current.setValue('test', '1');
			
			    await act(async () => \{
			      await result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: '1',
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  it('should set value of multiple select correctly', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string[] \}>());
			    const \{ ref \} = result.current.register('test');
			
			    isFunction(ref) &&
			      ref(\{
			        type: 'checkbox',
			        refs: [\{\}, \{\}],
			      \});
			
			    result.current.setValue('test', ['1']);
			
			    await act(async () => \{
			      await result.current.handleSubmit((data) => \{
			        expect(data).toEqual(\{
			          test: ['1'],
			        \});
			      \})(\{
			        preventDefault: () => \{\},
			        persist: () => \{\},
			      \} as React.SyntheticEvent);
			    \});
			  \});
			
			  it('should update nested controlled input', () => \{
			    function App() \{
			      const \{ setValue, control \} = useForm(\{
			        defaultValues: \{
			          test: \{
			            deep: \{
			              field: 'test',
			            \},
			          \},
			        \},
			      \});
			
			      return (
			        <form>
			          <Controller
			            name="test.deep.field"
			            control=\{control\}
			            render=\{(\{ field \}) => <input \{...field\} />\}
			          />
			
			          <button
			            type="button"
			            onClick=\{() => \{
			              setValue('test.deep', \{
			                field: 'updateValue',
			              \});
			            \}\}
			          >
			            setValue
			          </button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			      'updateValue',
			    );
			  \});
			
			  it('should set object array value', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: \{
			          one: string;
			          two: string;
			          three: string;
			        \}[];
			      \}>(),
			    );
			
			    result.current.register('test.0.one');
			    result.current.register('test.0.two');
			    result.current.register('test.0.three');
			
			    act(() => \{
			      result.current.setValue('test', [
			        \{
			          one: 'ONE',
			          two: 'TWO',
			          three: 'THREE',
			        \},
			      ]);
			    \});
			
			    expect(result.current.getValues()).toEqual(\{
			      test: [
			        \{
			          one: 'ONE',
			          two: 'TWO',
			          three: 'THREE',
			        \},
			      ],
			    \});
			  \});
			
			  it('should set unmountFieldsState value when shouldUnregister is set to false', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: string;
			        checkbox: string[];
			        test1: \{ one: string; two: string; three: string \}[];
			      \}>(),
			    );
			
			    act(() => \{
			      result.current.setValue('test', '1');
			      result.current.setValue('checkbox', ['1', '2']);
			      result.current.setValue('test1.0', \{
			        one: 'ONE',
			        two: 'TWO',
			        three: 'THREE',
			      \});
			    \});
			  \});
			
			  it('should set nested value correctly ', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test1: string[];
			        test2: \{
			          key1: string;
			          key2: number;
			        \};
			        test3: \{
			          key1: string;
			          key2: number;
			        \}[];
			      \}>(),
			    );
			
			    result.current.register('test1');
			    result.current.register('test2');
			    result.current.register('test3');
			
			    act(() => \{
			      result.current.setValue('test1', ['1', '2', '3']);
			      result.current.setValue('test2', \{ key1: '1', key2: 2 \});
			      result.current.setValue('test3', [
			        \{ key1: '1', key2: 2 \},
			        \{ key1: '3', key2: 4 \},
			      ]);
			    \});
			
			    expect(result.current.control._fields['test1']).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test1', value: ['1', '2', '3'] \},
			        name: 'test1',
			      \},
			    \});
			    expect(result.current.control._fields['test2']).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test2', value: \{ key1: '1', key2: 2 \} \},
			        name: 'test2',
			      \},
			    \});
			    expect(result.current.control._fields['test3']).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{
			          name: 'test3',
			          value: [
			            \{ key1: '1', key2: 2 \},
			            \{ key1: '3', key2: 4 \},
			          ],
			        \},
			        name: 'test3',
			      \},
			    \});
			  \});
			
			  it('should work with array fields', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: string[];
			        test1: \{
			          test: string;
			        \}[];
			      \}>(),
			    );
			
			    result.current.register('test1.0.test');
			    result.current.register('test.0');
			    result.current.register('test.1');
			    result.current.register('test.2');
			
			    act(() => result.current.setValue('test', ['1', '2', '3']));
			
			    expect(get(result.current.control._fields, 'test.0')).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test.0', value: '1' \},
			        name: 'test.0',
			      \},
			    \});
			    expect(get(result.current.control._fields, 'test.1')).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test.1', value: '2' \},
			        name: 'test.1',
			      \},
			    \});
			    expect(get(result.current.control._fields, 'test.2')).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test.2', value: '3' \},
			        name: 'test.2',
			      \},
			    \});
			  \});
			
			  it('should worked with nested array fields with object', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test: \{
			          test: string;
			        \}[];
			      \}>(),
			    );
			
			    result.current.register('test.0.test');
			    result.current.register('test.1.test');
			    result.current.register('test.2.test');
			
			    act(() =>
			      result.current.setValue('test', [
			        \{ test: '1' \},
			        \{ test: '2' \},
			        \{ test: '3' \},
			      ]),
			    );
			
			    expect(get(result.current.control._fields, 'test.0.test')).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test.0.test', value: '1' \},
			        name: 'test.0.test',
			      \},
			    \});
			    expect(get(result.current.control._fields, 'test.1.test')).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test.1.test', value: '2' \},
			        name: 'test.1.test',
			      \},
			    \});
			    expect(get(result.current.control._fields, 'test.2.test')).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test.2.test', value: '3' \},
			        name: 'test.2.test',
			      \},
			    \});
			  \});
			
			  it('should work with object fields', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        test1: \{
			          test: string;
			        \}[];
			        test: \{
			          bill: string;
			          luo: string;
			          test: string;
			        \};
			      \}>(),
			    );
			
			    result.current.register('test1.0.test');
			    result.current.register('test.bill');
			    result.current.register('test.luo');
			    result.current.register('test.test');
			
			    act(() =>
			      result.current.setValue('test', \{ bill: '1', luo: '2', test: '3' \}),
			    );
			    expect(get(result.current.control._fields, 'test.bill')).toEqual(\{
			      _f: \{
			        ref: \{ name: 'test.bill', value: '1' \},
			        mount: true,
			        name: 'test.bill',
			      \},
			    \});
			    expect(get(result.current.control._fields, 'test.luo')).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test.luo', value: '2' \},
			        name: 'test.luo',
			      \},
			    \});
			    expect(get(result.current.control._fields, 'test.test')).toEqual(\{
			      _f: \{
			        mount: true,
			        ref: \{ name: 'test.test', value: '3' \},
			        name: 'test.test',
			      \},
			    \});
			  \});
			
			  it('should work for nested fields which are not registered', () => \{
			    const \{ result \} = renderHook(() => useForm());
			
			    result.current.register('test.test');
			    result.current.register('test1.test');
			
			    act(() => \{
			      result.current.setValue('test', \{
			        test: 'test',
			        test1: 'test1',
			        test2: 'test2',
			      \});
			    \});
			
			    expect(result.current.control._fields['test']).toEqual(\{
			      test: \{
			        _f: \{
			          mount: true,
			          name: 'test.test',
			          ref: \{
			            name: 'test.test',
			            value: 'test',
			          \},
			        \},
			      \},
			    \});
			  \});
			
			  describe('with watch', () => \{
			    it('should get watched value', () => \{
			      const \{ result \} = renderHook(() => \{
			        const \{ register, watch, setValue \} = useForm<\{ test: string \}>();
			
			        register('test');
			
			        React.useEffect(() => \{
			          setValue('test', 'abc');
			        \}, [setValue]);
			
			        return watch('test');
			      \});
			
			      expect(result.current).toBe('abc');
			    \});
			  \});
			
			  describe('with validation', () => \{
			    it('should be called trigger method if shouldValidate variable is true', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{
			          test: string;
			        \}>(),
			      );
			
			      result.current.register('test', \{
			        minLength: \{
			          value: 5,
			          message: 'min',
			        \},
			      \});
			
			      result.current.formState.dirtyFields;
			      result.current.formState.errors;
			
			      await act(async () =>
			        result.current.setValue('test', 'abc', \{
			          shouldValidate: true,
			        \}),
			      );
			
			      expect(result.current.formState.errors?.test?.message).toBe('min');
			    \});
			
			    it('should validate input correctly with existing error', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          setError,
			          setValue,
			          formState: \{ errors \},
			        \} = useForm(\{
			          defaultValues: \{
			            test: '',
			          \},
			        \});
			
			        return (
			          <>
			            <input \{...register('test', \{ required: true \})\} />
			            <button
			              onClick=\{() => \{
			                setError('test', \{ type: 'somethingWrong', message: 'test' \});
			              \}\}
			            >
			              setError
			            </button>
			            <button
			              onClick=\{() => \{
			                setValue('test', 'bill', \{
			                  shouldValidate: true,
			                \});
			              \}\}
			            >
			              update
			            </button>
			            <p>\{errors?.test?.message\}</p>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setError' \}));
			
			      expect(await screen.findByText('test')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'update' \}));
			
			      await waitFor(() =>
			        expect(screen.queryByText('test')).not.toBeInTheDocument(),
			      );
			    \});
			
			    it('should not be called trigger method if options is empty', async () => \{
			      const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			
			      result.current.register('test', \{
			        minLength: \{
			          value: 5,
			          message: 'min',
			        \},
			      \});
			
			      result.current.setValue('test', 'abc');
			
			      expect(result.current.formState.errors?.test).toBeUndefined();
			    \});
			
			    it('should be called trigger method if shouldValidate variable is true and field value is array', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{
			          test: string[];
			        \}>(),
			      );
			
			      const rules = \{
			        minLength: \{
			          value: 5,
			          message: 'min',
			        \},
			      \};
			
			      result.current.register('test.0', rules);
			      result.current.register('test.1', rules);
			      result.current.register('test.2', rules);
			
			      result.current.formState.errors;
			
			      await act(async () =>
			        result.current.setValue('test', ['abc1', 'abc2', 'abc3'], \{
			          shouldValidate: true,
			        \}),
			      );
			
			      expect(result.current.formState.errors?.test?.[0]?.message).toBe('min');
			      expect(result.current.formState.errors?.test?.[1]?.message).toBe('min');
			      expect(result.current.formState.errors?.test?.[2]?.message).toBe('min');
			    \});
			
			    it('should not be called trigger method if options is empty and field value is array', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{
			          test: string[];
			        \}>(),
			      );
			
			      const rules = \{
			        minLength: \{
			          value: 5,
			          message: 'min',
			        \},
			      \};
			
			      result.current.register('test.0', rules);
			      result.current.register('test.1', rules);
			      result.current.register('test.2', rules);
			
			      act(() => result.current.setValue('test', ['test', 'test1', 'test2']));
			
			      expect(result.current.formState.errors?.test).toBeUndefined();
			    \});
			  \});
			
			  describe('with dirty', () => \{
			    it.each(['isDirty', 'dirtyFields'])(
			      'should be dirtyFields when %s is defined when shouldDirty is true',
			      (property) => \{
			        const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			
			        result.current.formState[property as 'dirtyFields' | 'isDirty'];
			        result.current.formState.isDirty;
			        result.current.formState.dirtyFields;
			
			        result.current.register('test');
			
			        act(() =>
			          result.current.setValue('test', 'test', \{ shouldDirty: true \}),
			        );
			
			        expect(result.current.formState.isDirty).toBeTruthy();
			        expect(result.current.formState.dirtyFields).toEqual(\{ test: true \});
			      \},
			    );
			
			    it.each([
			      ['isDirty', ['test1', 'test2', 'test3'], [true, true, true]],
			      ['dirty', ['test1', 'test2', 'test3'], [true, true, true]],
			      ['isDirty', ['test1', '', 'test3'], [true, undefined, true]],
			      ['dirty', ['test1', '', 'test3'], [true, undefined, true]],
			    ])(
			      'should be dirtyFields when %s is defined when shouldDirty is true with array fields',
			      (property, values, dirtyFields) => \{
			        const \{ result \} = renderHook(() =>
			          useForm<\{
			            test: string[];
			          \}>(\{
			            defaultValues: \{
			              test: ['', '', ''],
			            \},
			          \}),
			        );
			
			        result.current.formState[property as 'isDirty' | 'dirtyFields'];
			        result.current.formState.isDirty;
			        result.current.formState.dirtyFields;
			
			        result.current.register('test.0');
			        result.current.register('test.1');
			        result.current.register('test.2');
			
			        act(() =>
			          result.current.setValue('test', values, \{
			            shouldDirty: true,
			          \}),
			        );
			
			        expect(result.current.formState.isDirty).toBeTruthy();
			        expect(result.current.formState.dirtyFields).toEqual(\{
			          test: dirtyFields,
			        \});
			      \},
			    );
			
			    it.each(['isDirty', 'dirtyFields'])(
			      'should not be dirtyFields when %s is defined when shouldDirty is false',
			      (property) => \{
			        const \{ result \} = renderHook(() =>
			          useForm<\{
			            test: string;
			          \}>(),
			        );
			
			        result.current.formState[property as 'isDirty' | 'dirtyFields'];
			
			        result.current.register('test');
			
			        act(() =>
			          result.current.setValue('test', 'test', \{ shouldDirty: false \}),
			        );
			
			        expect(result.current.formState.isDirty).toBeFalsy();
			        expect(result.current.formState.dirtyFields).toEqual(\{\});
			      \},
			    );
			
			    it.each(['isDirty', 'dirtyFields'])(
			      'should set name to dirtyFieldRef if field value is different with default value when formState.dirtyFields is defined',
			      (property) => \{
			        const \{ result \} = renderHook(() =>
			          useForm<\{ test: string \}>(\{
			            defaultValues: \{ test: 'default' \},
			          \}),
			        );
			        result.current.formState[property as 'dirtyFields' | 'isDirty'];
			        result.current.formState.isDirty;
			        result.current.formState.dirtyFields;
			
			        result.current.register('test');
			
			        act(() => result.current.setValue('test', '1', \{ shouldDirty: true \}));
			
			        expect(result.current.formState.isDirty).toBeTruthy();
			        expect(result.current.formState.dirtyFields.test).toBeTruthy();
			      \},
			    );
			
			    it.each(['isDirty', 'dirtyFields'])(
			      'should unset name from dirtyFieldRef if field value is not different with default value when formState.dirtyFields is defined',
			      (property) => \{
			        const \{ result \} = renderHook(() =>
			          useForm<\{ test: string \}>(\{
			            defaultValues: \{ test: 'default' \},
			          \}),
			        );
			        result.current.formState[property as 'isDirty' | 'dirtyFields'];
			        result.current.formState.isDirty;
			        result.current.formState.dirtyFields;
			
			        result.current.register('test');
			
			        act(() => result.current.setValue('test', '1', \{ shouldDirty: true \}));
			
			        expect(result.current.formState.isDirty).toBeTruthy();
			        expect(result.current.formState.dirtyFields.test).toBeTruthy();
			
			        act(() =>
			          result.current.setValue('test', 'default', \{ shouldDirty: true \}),
			        );
			
			        expect(result.current.formState.isDirty).toBeFalsy();
			        expect(result.current.formState.dirtyFields.test).toBeUndefined();
			      \},
			    );
			  \});
			
			  describe('with touched', () => \{
			    it('should update touched with shouldTouched config', () => \{
			      const App = () => \{
			        const \{
			          setValue,
			          register,
			          formState: \{ touchedFields \},
			        \} = useForm();
			
			        return (
			          <>
			            <p>\{Object.keys(touchedFields).map((field: string) => field)\}</p>
			            <input \{...register('test')\} />
			            <button
			              onClick=\{() => \{
			                setValue('test', 'data', \{ shouldTouch: true \});
			              \}\}
			            >
			              Test
			            </button>
			          </>
			        );
			      \};
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(screen.getByText('test')).toBeVisible();
			    \});
			  \});
			
			  describe('with strict mode', () => \{
			    it('should be able to set input value async', async () => \{
			      function App() \{
			        const \{ control, setValue \} = useForm();
			
			        React.useEffect(() => \{
			          sleep(1000);
			          setValue('name', 'test');
			        \}, [setValue]);
			
			        return (
			          <div className="App">
			            <form>
			              <Controller
			                defaultValue=""
			                name="name"
			                control=\{control\}
			                render=\{(\{ field \}) => \{
			                  return (
			                    <div>
			                      <input />
			                      <p>\{field.value\}</p>
			                    </div>
			                  );
			                \}\}
			              />
			            </form>
			          </div>
			        );
			      \}
			
			      render(
			        <React.StrictMode>
			          <App />
			        </React.StrictMode>,
			      );
			
			      jest.advanceTimersByTime(10000);
			
			      expect(await screen.findByText('test')).toBeVisible();
			    \});
			  \});
			
			  it('should set hidden input value correctly and reflect on the submission data', async () => \{
			    let submitData: Record<string, string> | undefined = undefined;
			
			    const Component = () => \{
			      const \{ register, handleSubmit, setValue \} = useForm<\{
			        test: string;
			      \}>();
			
			      return (
			        <div>
			          <input type="hidden" defaultValue="test" \{...register('test')\} />
			          <button
			            onClick=\{() => \{
			              setValue('test', 'changed');
			            \}\}
			          >
			            change
			          </button>
			          <button
			            onClick=\{handleSubmit((data) => \{
			              submitData = data;
			            \})\}
			          >
			            submit
			          </button>
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'change' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    await waitFor(() =>
			      expect(submitData).toEqual(\{
			        test: 'changed',
			      \}),
			    );
			  \});
			
			  it('should validate the input and return correct isValid formState', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: \{ data: string; data1: string \} \}>(\{
			        mode: VALIDATION_MODE.onChange,
			      \}),
			    );
			
			    result.current.formState.isValid;
			
			    await act(async () => \{
			      await result.current.register('test.data', \{ required: true \});
			      await result.current.register('test.data1', \{ required: true \});
			    \});
			
			    await act(async () => \{
			      await result.current.trigger();
			    \});
			
			    await act(async () => \{
			      result.current.setValue('test.data', 'test', \{ shouldValidate: true \});
			    \});
			
			    expect(result.current.formState.isValid).toBeFalsy();
			
			    await act(async () => \{
			      await result.current.setValue('test.data1', 'test', \{
			        shouldValidate: true,
			      \});
			    \});
			
			    expect(result.current.formState.isValid).toBeTruthy();
			  \});
			
			  it('should setValue with valueAs', async () => \{
			    let result: Record<string, string>;
			
			    function App() \{
			      const \{ register, handleSubmit, setValue \} = useForm();
			
			      React.useEffect(() => \{
			        setValue('setStringDate', '2021-04-23');
			      \}, [setValue]);
			
			      return (
			        <form
			          onSubmit=\{handleSubmit((data) => \{
			            result = data;
			          \})\}
			        >
			          <input
			            type="date"
			            \{...register('setStringDate', \{ valueAsDate: true \})\}
			          />
			          <input type="submit" />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() =>
			      expect(result).toEqual(\{
			        setStringDate: new Date('2021-04-23'),
			      \}),
			    );
			  \});
			
			  it('should set value for field array name correctly', () => \{
			    const inputId = 'name';
			
			    const App = () => \{
			      const \{ control, setValue \} = useForm<\{
			        names: \{ name: string; id?: string \}[];
			      \}>();
			
			      const \{ fields \} = useFieldArray(\{ control, name: 'names' \});
			
			      React.useEffect(() => \{
			        setValue('names', [\{ name: 'initial value' \}]);
			      \}, [setValue]);
			
			      const onChangeValue = () => \{
			        setValue('names.0', \{ name: 'updated value', id: 'test' \});
			      \};
			
			      return (
			        <>
			          \{fields.map((item, index) => (
			            <Controller
			              key=\{item.id\}
			              control=\{control\}
			              name=\{\`names.\$\{index\}.name\` as const\}
			              render=\{(\{ field \}) => <input data-testid=\{inputId\} \{...field\} />\}
			            />
			          ))\}
			          <button onClick=\{onChangeValue\}>Update</button>
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    expect(screen.getByTestId(inputId)).toHaveValue('initial value');
			
			    fireEvent.click(screen.getByText('Update'));
			
			    expect(screen.getByTestId(inputId)).toHaveValue('updated value');
			  \});
			
			  it('should set field array correctly without affect the parent field array', async () => \{
			    const fieldsValue: unknown[] = [];
			    type FormValues = \{
			      test: \{ name: string; nestedArray: \{ name: string \}[] \}[];
			    \};
			
			    const Child = (\{
			      control,
			      index,
			    \}: \{
			      control: Control<FormValues>;
			      index: number;
			    \}) => \{
			      useFieldArray(\{
			        control,
			        name: \`test.\$\{index\}.nestedArray\`,
			      \});
			
			      return null;
			    \};
			
			    const App = () => \{
			      const \{ setValue, control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          test: [\{ name: 'bill', nestedArray: [] \}],
			        \},
			      \});
			      const \{ fields \} = useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			
			      fieldsValue.push(fields);
			
			      return (
			        <div>
			          \{fields.map((field, index) => (
			            <Child key=\{field.id\} control=\{control\} index=\{index\} />
			          ))\}
			          <button
			            onClick=\{() => \{
			              setValue('test.0.nestedArray' as \`test.0.nestedArray\`, [
			                \{ name: 'append' \},
			              ]);
			            \}\}
			          >
			            setValue
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(fieldsValue.length).toEqual(1);
			  \});
			
			  it('should not register deeply nested inputs', () => \{
			    let fields: unknown;
			    let data: unknown;
			
			    const App = () => \{
			      const \{ setValue, control, getValues \} = useForm();
			      useFieldArray(\{
			        control,
			        name: 'test',
			      \});
			      const [, setShow] = React.useState(false);
			      fields = control._fields;
			
			      return (
			        <>
			          <button
			            onClick=\{() => \{
			              setValue('test', [
			                \{
			                  name: 'append',
			                  nestedArray: [\{ field1: 'append', field2: 'append' \}],
			                \},
			              ]);
			              setShow(true);
			            \}\}
			          >
			            setValue
			          </button>
			          <button
			            onClick=\{() => \{
			              data = getValues();
			            \}\}
			          >
			            getValues
			          </button>
			        </>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'setValue' \}));
			
			    expect(fields).toEqual(\{\});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'getValues' \}));
			
			    expect(data).toEqual(\{
			      test: [
			        \{
			          name: 'append',
			          nestedArray: [
			            \{
			              field1: 'append',
			              field2: 'append',
			            \},
			          ],
			        \},
			      ],
			    \});
			  \});
			
			  describe('when set field to null', () => \{
			    it('should be able to set correctly with register', () => \{
			      let result: unknown;
			
			      type FormData = \{
			        user: \{ name: string \} | null;
			      \};
			
			      function App() \{
			        const \{ setValue, watch, register \} = useForm<FormData>(\{
			          defaultValues: \{
			            user: \{
			              name: 'John Doe',
			            \},
			          \},
			        \});
			
			        result = watch();
			
			        register('user');
			
			        return (
			          <div>
			            <button onClick=\{() => setValue('user', null)\}>
			              Set user to null
			            </button>
			          </div>
			        );
			      \}
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(result).toEqual(\{
			        user: null,
			      \});
			    \});
			
			    it('should be able to set correctly without register', () => \{
			      let result: unknown;
			
			      type FormData = \{
			        user: \{ name: string \} | null;
			      \};
			
			      function App() \{
			        const \{ setValue, watch \} = useForm<FormData>(\{
			          defaultValues: \{
			            user: \{
			              name: 'John Doe',
			            \},
			          \},
			        \});
			
			        result = watch();
			
			        return (
			          <div>
			            <button onClick=\{() => setValue('user', null)\}>
			              Set user to null
			            </button>
			          </div>
			        );
			      \}
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(result).toEqual(\{
			        user: null,
			      \});
			    \});
			  \});
			
			  it('should only be able to update value of array which is not registered', async () => \{
			    const App = () => \{
			      const \{ setValue, watch \} = useForm(\{
			        defaultValues: \{
			          test: ['1', '2', '3'],
			        \},
			      \});
			
			      React.useEffect(() => \{
			        setValue('test', ['2', '2']);
			      \}, [setValue]);
			
			      const result = watch('test');
			
			      return <p>\{JSON.stringify(result)\}</p>;
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('["2","2"]')).toBeVisible();
			  \});
			
			  it('should only be able to update value of object which is not registered', async () => \{
			    const App = () => \{
			      const \{ setValue, watch \} = useForm<\{
			        test: \{
			          data: string;
			          data1: string;
			          data2: string;
			        \};
			      \}>(\{
			        defaultValues: \{
			          test: \{
			            data: '1',
			            data1: '2',
			          \},
			        \},
			      \});
			
			      React.useEffect(() => \{
			        setValue('test', \{
			          data: '2',
			          data1: '2',
			          data2: '3',
			        \});
			      \}, [setValue]);
			
			      const result = watch('test');
			
			      return <p>\{JSON.stringify(result)\}</p>;
			    \};
			
			    render(<App />);
			
			    expect(
			      await screen.findByText('\{"data":"2","data1":"2","data2":"3"\}'),
			    ).toBeVisible();
			  \});
			
			  it('should update nested object which contain date object without register', () => \{
			    const watchedValue: unknown[] = [];
			    const defaultValues = \{
			      userData: \{
			        userId: 'abc',
			        date: new Date('2021-06-15'),
			      \},
			    \};
			
			    function App() \{
			      const \{ setValue, watch \} = useForm(\{
			        defaultValues,
			      \});
			
			      const setUserData = () => \{
			        setValue('userData', \{
			          userId: '1234',
			          date: new Date('2021-12-17'),
			        \});
			      \};
			
			      watchedValue.push(watch('userData'));
			
			      return (
			        <div>
			          <form>
			            <button type="button" onClick=\{() => setUserData()\}>
			              Update
			            </button>
			          </form>
			        </div>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(watchedValue).toEqual([
			      \{
			        date: new Date('2021-06-15T00:00:00.000Z'),
			        userId: 'abc',
			      \},
			      \{
			        date: new Date('2021-12-17T00:00:00.000Z'),
			        userId: '1234',
			      \},
			    ]);
			  \});
			
			  it('should update isDirty even input is not registered', async () => \{
			    const App = () => \{
			      const \{
			        setValue,
			        formState: \{ isDirty \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: '',
			        \},
			      \});
			
			      React.useEffect(() => \{
			        setValue('test', '1234', \{ shouldDirty: true \});
			      \}, [setValue]);
			
			      return <p>\{isDirty ? 'dirty' : 'not'\}</p>;
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('dirty')).toBeVisible();
			  \});
			
			  it('should update both dirty and touched state', () => \{
			    const App = () => \{
			      const \{
			        register,
			        formState: \{ dirtyFields, touchedFields \},
			        setValue,
			      \} = useForm(\{
			        defaultValues: \{
			          firstName: '',
			        \},
			      \});
			
			      return (
			        <form>
			          <label>First Name</label>
			          <input type="text" \{...register('firstName')\} />
			          \{dirtyFields.firstName && <p>dirty</p>\}
			          \{touchedFields.firstName && <p>touched</p>\}
			
			          <button
			            type="button"
			            onClick=\{() =>
			              setValue('firstName', 'test', \{
			                shouldValidate: true,
			                shouldDirty: true,
			                shouldTouch: true,
			              \})
			            \}
			          >
			            setValue
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(screen.getByText('dirty')).toBeVisible();
			    expect(screen.getByText('touched')).toBeVisible();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\setValue.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(36)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\trigger.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../../constants';
			import \{ Control, FieldPath \} from '../../types';
			import \{ useController \} from '../../useController';
			import \{ useForm \} from '../../useForm';
			import \{ FormProvider \} from '../../useFormContext';
			import \{ useFormState \} from '../../useFormState';
			
			describe('trigger', () => \{
			  it('should remove all errors before set new errors when trigger entire form', async () => \{
			    const Component = () => \{
			      const [show, setShow] = React.useState(true);
			      const \{
			        register,
			        unregister,
			        trigger,
			        formState: \{ errors \},
			      \} = useForm<\{
			        test: string;
			      \}>();
			
			      return (
			        <div>
			          \{show && <input \{...register('test', \{ required: true \})\} />\}
			          <button type=\{'button'\} onClick=\{() => trigger()\}>
			            trigger
			          </button>
			          <button
			            type=\{'button'\}
			            onClick=\{() => \{
			              setShow(false);
			              unregister('test');
			            \}\}
			          >
			            toggle
			          </button>
			          \{errors.test && <span>error</span>\}
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'trigger' \}));
			
			    expect(await screen.findByText('error')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'trigger' \}));
			
			    await waitFor(() =>
			      expect(screen.queryByText('error')).not.toBeInTheDocument(),
			    );
			  \});
			
			  it('should return empty errors when field is found and validation pass', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			    const \{ errors \} = result.current.formState;
			
			    result.current.register('test');
			
			    await act(async () => \{
			      await result.current.trigger('test');
			    \});
			
			    await act(async () => \{
			      await expect(errors).toEqual(\{\});
			    \});
			  \});
			
			  it('should update value when value is supplied', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ test: string \}>());
			
			    const \{ errors \} = result.current.formState;
			
			    result.current.register('test', \{ required: true \});
			
			    result.current.setValue('test', 'abc');
			
			    await act(async () => \{
			      await result.current.trigger('test');
			    \});
			
			    expect(errors).toEqual(\{\});
			  \});
			
			  it('should trigger multiple fields validation', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string; test1: string \}>(\{
			        mode: VALIDATION_MODE.onChange,
			      \}),
			    );
			
			    result.current.formState.errors;
			
			    result.current.register('test', \{ required: 'required' \});
			    result.current.register('test1', \{ required: 'required' \});
			
			    await act(async () => \{
			      await result.current.trigger(['test', 'test1']);
			    \});
			
			    expect(result.current.formState.errors?.test?.message).toBe('required');
			    expect(result.current.formState.errors?.test1?.message).toBe('required');
			  \});
			
			  describe('with schema', () => \{
			    it('should return the error with single field validation', async () => \{
			      const resolver = async (data: any) => \{
			        return \{
			          values: data,
			          errors: \{
			            test: \{
			              type: 'test',
			            \},
			          \},
			        \};
			      \};
			
			      const \{ result \} = renderHook(() =>
			        useForm<\{ test: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \}),
			      );
			
			      result.current.formState.errors;
			
			      result.current.register('test', \{ required: true \});
			
			      await act(async () => \{
			        await result.current.trigger('test');
			      \});
			      expect(result.current.formState.errors).toEqual(\{
			        test: \{ type: 'test' \},
			      \});
			    \});
			
			    it('should return the status of the requested field with single field validation', async () => \{
			      const resolver = async (data: any) => \{
			        return \{
			          values: data,
			          errors: \{
			            test2: \{
			              type: 'test',
			            \},
			          \},
			        \};
			      \};
			
			      const \{ result \} = renderHook(() =>
			        useForm<\{ test1: string; test2: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \}),
			      );
			
			      result.current.formState.errors;
			
			      result.current.register('test1', \{ required: false \});
			      result.current.register('test2', \{ required: true \});
			
			      await act(async () =>
			        expect(await result.current.trigger('test2')).toBeFalsy(),
			      );
			
			      expect(result.current.formState.errors).toEqual(\{
			        test2: \{
			          type: 'test',
			        \},
			      \});
			    \});
			
			    it('should not trigger any error when schema validation result not found', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{ test: string; test1: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver: async () => \{
			            return \{
			              values: \{\},
			              errors: \{
			                test: \{
			                  type: 'test',
			                \},
			              \},
			            \};
			          \},
			        \}),
			      );
			
			      result.current.register('test', \{ required: true \});
			
			      await act(async () => \{
			        await result.current.trigger('test1');
			      \});
			
			      expect(result.current.formState.errors).toEqual(\{\});
			    \});
			
			    it('should support array of fields for schema validation', async () => \{
			      const resolver = async (data: any) => \{
			        return \{
			          values: data,
			          errors: \{
			            test1: \{
			              type: 'test1',
			            \},
			            test: \{
			              type: 'test',
			            \},
			          \},
			        \};
			      \};
			
			      const \{ result \} = renderHook(() =>
			        useForm<\{ test: string; test1: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \}),
			      );
			
			      result.current.formState.errors;
			
			      result.current.register('test', \{ required: true \});
			
			      await act(async () => \{
			        await result.current.trigger(['test', 'test1']);
			      \});
			
			      expect(result.current.formState.errors).toEqual(\{
			        test1: \{
			          type: 'test1',
			        \},
			        test: \{
			          type: 'test',
			        \},
			      \});
			    \});
			
			    it('should return the status of the requested fields with array of fields for validation', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{ test1: string; test2: string; test3: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver: async () => \{
			            return \{
			              values: \{\},
			              errors: \{
			                test3: \{
			                  type: 'test',
			                \},
			              \},
			            \};
			          \},
			        \}),
			      );
			
			      const \{ errors \} = result.current.formState;
			
			      result.current.register('test1', \{ required: false \});
			      result.current.register('test2', \{ required: false \});
			      result.current.register('test3', \{ required: true \});
			
			      await act(async () => \{
			        await result.current.trigger(['test1', 'test2']);
			      \});
			
			      await act(async () => \{
			        expect(errors).toEqual(\{\});
			      \});
			
			      await act(async () => \{
			        await result.current.trigger(['test3']);
			      \});
			
			      await act(async () => \{
			        expect(result.current.formState.errors).toEqual(\{
			          test3: \{
			            type: 'test',
			          \},
			        \});
			      \});
			    \});
			
			    it('should validate all fields when pass with undefined', async () => \{
			      const resolver = async (data: any) => \{
			        return \{
			          values: data,
			          errors: \{
			            test1: \{
			              type: 'test1',
			            \},
			            test: \{
			              type: 'test',
			            \},
			          \},
			        \};
			      \};
			
			      const \{ result \} = renderHook(() =>
			        useForm<\{ test1: string; test: string \}>(\{
			          mode: VALIDATION_MODE.onChange,
			          resolver,
			        \}),
			      );
			
			      result.current.formState.errors;
			
			      result.current.register('test', \{ required: true \});
			      result.current.register('test1', \{ required: true \});
			
			      await act(async () => \{
			        await result.current.trigger();
			      \});
			
			      expect(result.current.formState.errors).toEqual(\{
			        test1: \{
			          type: 'test1',
			        \},
			        test: \{
			          type: 'test',
			        \},
			      \});
			    \});
			
			    it('should update isValid with validation result at form level', async () => \{
			      const App = () => \{
			        const \{
			          register,
			          formState: \{ isValid \},
			          trigger,
			        \} = useForm<\{ test: string; test1: string \}>(\{
			          defaultValues: \{
			            test: '',
			          \},
			          resolver: async (data) => \{
			            if (data.test && data.test1) \{
			              return \{
			                errors: \{\},
			                values: \{
			                  test: '1',
			                  test1: '2',
			                \},
			              \};
			            \} else \{
			              return \{
			                errors: \{
			                  test: \{
			                    message: 'test',
			                    type: 'test',
			                  \},
			                \},
			                values: \{\},
			              \};
			            \}
			          \},
			        \});
			
			        return (
			          <div>
			            \{isValid ? 'yes' : 'no'\}
			            <input \{...register('test')\} />
			            <input \{...register('test1')\} />
			            <button
			              onClick=\{() => \{
			                trigger('test');
			              \}\}
			            >
			              trigger1
			            </button>
			            <button
			              onClick=\{() => \{
			                trigger('test1');
			              \}\}
			            >
			              trigger2
			            </button>
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'trigger1' \}));
			
			      expect(await screen.findByText('no')).toBeVisible();
			
			      fireEvent.change(screen.getAllByRole('textbox')[1], \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'trigger2' \}));
			
			      expect(await screen.findByText('yes')).toBeVisible();
			    \});
			
			    it('should update isValid for the entire useForm scope', async () => \{
			      const InputA = () => \{
			        const \{ isValid \} = useFormState(\{ name: 'name' \});
			
			        return <p>\{isValid ? 'test: valid' : 'test: invalid'\}</p>;
			      \};
			
			      const InputB = () => \{
			        const \{ isValid \} = useFormState(\{ name: 'email' \});
			
			        return <p>\{isValid ? 'test1: valid' : 'test1: invalid'\}</p>;
			      \};
			
			      function App() \{
			        const methods = useForm(\{
			          resolver: async (data) => \{
			            if (data.test && data.test1) \{
			              return \{
			                errors: \{\},
			                values: \{
			                  test: '1',
			                  test1: '2',
			                \},
			              \};
			            \} else \{
			              return \{
			                errors: \{
			                  test: \{
			                    message: 'test',
			                    type: 'test',
			                  \},
			                \},
			                values: \{\},
			              \};
			            \}
			          \},
			          mode: 'onChange',
			        \});
			
			        return (
			          <FormProvider \{...methods\}>
			            <form>
			              <input
			                onChange=\{(e) =>
			                  methods.setValue('test', e.target.value, \{
			                    shouldValidate: true,
			                  \})
			                \}
			              />
			              <InputA />
			              <input
			                onChange=\{(e) =>
			                  methods.setValue('test1', e.target.value, \{
			                    shouldValidate: true,
			                  \})
			                \}
			              />
			              <InputB />
			            </form>
			          </FormProvider>
			        );
			      \}
			
			      render(<App />);
			
			      expect(await screen.findByText('test: invalid')).toBeVisible();
			      expect(screen.getByText('test1: invalid')).toBeVisible();
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{ value: 'test' \},
			      \});
			
			      expect(await screen.findByText('test: invalid')).toBeVisible();
			      expect(screen.getByText('test1: invalid')).toBeVisible();
			
			      fireEvent.change(screen.getAllByRole('textbox')[1], \{
			        target: \{ value: 'test' \},
			      \});
			
			      expect(await screen.findByText('test: valid')).toBeVisible();
			      expect(screen.getByText('test1: valid')).toBeVisible();
			    \});
			  \});
			
			  it('should return the status of the requested fields with array of fields for validation', async () => \{
			    const resolver = async (data: any) => \{
			      return \{
			        values: data,
			        errors: \{ test3: 'test3' \},
			      \};
			    \};
			
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test1: string; test2: string; test3: string \}>(\{
			        mode: VALIDATION_MODE.onChange,
			        resolver,
			      \}),
			    );
			
			    result.current.register('test1', \{ required: false \});
			    result.current.register('test2', \{ required: false \});
			    result.current.register('test3', \{ required: true \});
			
			    await act(async () =>
			      expect(await result.current.trigger(['test1', 'test2'])).toBeTruthy(),
			    );
			
			    await act(async () =>
			      expect(await result.current.trigger(['test3', 'test2'])).toBeFalsy(),
			    );
			
			    await act(async () =>
			      expect(await result.current.trigger(['test3'])).toBeFalsy(),
			    );
			
			    await act(async () =>
			      expect(await result.current.trigger(['test1'])).toBeTruthy(),
			    );
			
			    await act(async () => expect(await result.current.trigger()).toBeFalsy());
			  \});
			
			  it('should return true when field is found and validation pass', async () => \{
			    const App = () => \{
			      const \{
			        register,
			        trigger,
			        formState: \{ isValid \},
			      \} = useForm();
			
			      React.useEffect(() => \{
			        register('test');
			      \}, [register]);
			
			      return (
			        <div>
			          <p>\{isValid ? 'yes' : 'no'\}</p>
			          <button
			            onClick=\{() => \{
			              trigger('test');
			            \}\}
			          >
			            trigger
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('yes')).toBeVisible();
			  \});
			
			  it('should remove all errors before set new errors when trigger entire form', async () => \{
			    const Component = () => \{
			      const [show, setShow] = React.useState(true);
			      const \{
			        register,
			        trigger,
			        formState: \{ errors \},
			      \} = useForm<\{
			        test: string;
			      \}>(\{
			        shouldUnregister: true,
			      \});
			
			      return (
			        <div>
			          \{show && <input \{...register('test', \{ required: true \})\} />\}
			          <button type=\{'button'\} onClick=\{() => trigger()\}>
			            trigger
			          </button>
			          <button type=\{'button'\} onClick=\{() => setShow(false)\}>
			            toggle
			          </button>
			          \{errors.test && <span>error</span>\}
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'trigger' \}));
			
			    expect(await screen.findByText('error')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'trigger' \}));
			
			    await waitFor(() =>
			      expect(screen.queryByText('error')).not.toBeInTheDocument(),
			    );
			  \});
			
			  it('should focus on errored input with build in validation', async () => \{
			    const Component = () => \{
			      const \{ register, trigger \} = useForm<\{
			        test: string;
			      \}>();
			
			      return (
			        <>
			          <input
			            \{...register('test', \{ required: true \})\}
			            placeholder=\{'test'\}
			          />
			          <button onClick=\{() => trigger('test', \{ shouldFocus: true \})\}>
			            trigger
			          </button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      expect(document.activeElement).toEqual(
			        screen.getByPlaceholderText('test'),
			      );
			    \});
			  \});
			
			  it('should focus on errored input with schema validation', async () => \{
			    const Component = () => \{
			      const \{ register, trigger \} = useForm<\{
			        test: string;
			      \}>(\{
			        resolver: () => (\{
			          values: \{\},
			          errors: \{
			            test: \{
			              type: 'test',
			            \},
			          \},
			        \}),
			      \});
			
			      return (
			        <>
			          <input \{...register('test')\} placeholder=\{'test'\} />
			          <button onClick=\{() => trigger('test', \{ shouldFocus: true \})\}>
			            trigger
			          </button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      expect(document.activeElement).toEqual(
			        screen.getByPlaceholderText('test'),
			      );
			    \});
			  \});
			
			  it('should focus on first errored input', async () => \{
			    const Component = () => \{
			      const \{ register, trigger \} = useForm<\{
			        test: string;
			        test2: string;
			      \}>();
			
			      return (
			        <>
			          <input
			            \{...register('test', \{ required: true \})\}
			            placeholder=\{'test'\}
			          />
			          <input
			            \{...register('test2', \{ required: true \})\}
			            placeholder=\{'test2'\}
			          />
			          <button onClick=\{() => trigger(undefined, \{ shouldFocus: true \})\}>
			            trigger
			          </button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => \{
			      expect(document.activeElement).toEqual(
			        screen.getByPlaceholderText('test'),
			      );
			    \});
			  \});
			
			  it('should return isValid for the entire form', async () => \{
			    const App = () => \{
			      const [isValid, setIsValid] = React.useState(true);
			      const \{ register, trigger, formState \} = useForm();
			
			      formState.isValid;
			
			      return (
			        <div>
			          <input
			            \{...register('firstName', \{ required: true \})\}
			            placeholder=\{'firstName'\}
			          />
			          <input
			            \{...register('lastName', \{ required: true \})\}
			            placeholder=\{'lastName'\}
			          />
			          <button
			            onClick=\{async () => \{
			              setIsValid(await trigger());
			            \}\}
			          >
			            trigger
			          </button>
			          <p>\{isValid ? 'true' : 'false'\}</p>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('false')).toBeVisible();
			
			    fireEvent.change(screen.getByPlaceholderText('firstName'), \{
			      target: \{
			        value: '1234',
			      \},
			    \});
			    fireEvent.change(screen.getByPlaceholderText('lastName'), \{
			      target: \{
			        value: '1234',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('true')).toBeVisible();
			  \});
			
			  it('should return correct valid state when trigger the entire form with build in validation', async () => \{
			    let isValid;
			
			    function App() \{
			      const \{ register, trigger \} = useForm();
			
			      const onTrigger = async () => \{
			        isValid = await trigger();
			      \};
			
			      return (
			        <form>
			          <input
			            \{...register('firstName', \{ required: true \})\}
			            placeholder="First name"
			          />
			          <input
			            \{...register('last.name', \{ required: true \})\}
			            placeholder="Last name"
			          />
			
			          <input type="button" onClick=\{onTrigger\} value="trigger" />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(isValid).toBeFalsy();
			  \});
			
			  it('should be able to trigger an object of fields', async () => \{
			    let isValid;
			
			    function App() \{
			      const \{
			        register,
			        trigger,
			        formState: \{ errors \},
			      \} = useForm(\{
			        defaultValues: \{
			          test: \{
			            firstName: '',
			            lastName: '',
			          \},
			        \},
			      \});
			
			      const onTrigger = async () => \{
			        isValid = await trigger('test');
			      \};
			
			      return (
			        <form>
			          <input
			            \{...register('test.firstName', \{ required: true \})\}
			            placeholder="First name"
			          />
			          \{errors?.test?.firstName && <p>firstName</p>\}
			
			          <input
			            \{...register('test.lastName', \{ required: true \})\}
			            placeholder="Last name"
			          />
			          \{errors?.test?.lastName && <p>lastName</p>\}
			
			          <input type="button" onClick=\{onTrigger\} value="trigger" />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(isValid).toBeFalsy();
			
			    expect(await screen.findByText('firstName')).toBeVisible();
			    expect(screen.getByText('lastName')).toBeVisible();
			  \});
			
			  it('should only trigger render on targeted input', async () => \{
			    type FormValue = \{
			      x: string;
			      y: string;
			    \};
			
			    function Input(\{
			      name,
			      control,
			    \}: \{
			      name: FieldPath<FormValue>;
			      control: Control<FormValue>;
			    \}) \{
			      const renderCount = React.useRef(0);
			      renderCount.current += 1;
			
			      const \{
			        fieldState: \{ error \},
			      \} = useController(\{
			        name,
			        control,
			        rules: \{
			          required: true,
			        \},
			      \});
			
			      error;
			
			      return <p>\{renderCount.current\}</p>;
			    \}
			
			    function App() \{
			      const \{ handleSubmit, control, trigger \} = useForm<FormValue>();
			      const onSubmit = () => \{\};
			
			      return (
			        <div>
			          <form onSubmit=\{handleSubmit(onSubmit)\}>
			            <Input name="x" control=\{control\} />
			            <Input name="y" control=\{control\} />
			
			            <button type="button" onClick=\{() => trigger('x')\}>
			              Trigger Validation on X
			            </button>
			          </form>
			        </div>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('1')).toBeVisible();
			    expect(screen.getByText('1')).toBeVisible();
			  \});
			
			  it('should skip additional validation when input validation already failed', async () => \{
			    let count = 0;
			
			    const App = () => \{
			      const \{
			        register,
			        trigger,
			        formState: \{ isValid \},
			      \} = useForm(\{
			        mode: 'onChange',
			      \});
			      const validate = () => \{
			        count++;
			        return false;
			      \};
			
			      return (
			        <form>
			          <p>\{isValid ? 'valid' : 'invalid'\}</p>
			          <input
			            \{...register('test', \{
			              validate,
			            \})\}
			          />
			          <button onClick=\{() => trigger('test')\} type=\{'button'\}>
			            submit
			          </button>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('invalid')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(count).toEqual(2);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\trigger.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(23)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\unregister.test.tsx', () => {
        const sourceCode = `
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ useForm \} from '../../useForm';
			
			describe('unregister', () => \{
			  it('should unregister an registered item', async () => \{
			    const \{ result \} = renderHook(() => useForm<\{ input: string \}>());
			
			    result.current.register('input');
			
			    await act(async () => \{
			      await result.current.unregister('input');
			    \});
			
			    expect(result.current.getValues()).toEqual(\{\});
			  \});
			
			  it('should unregister an registered item with array name', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        input: string;
			        input2: string;
			      \}>(),
			    );
			
			    result.current.register('input');
			    result.current.register('input');
			    result.current.register('input2');
			
			    await act(async () => \{
			      await result.current.unregister(['input', 'input2']);
			    \});
			
			    expect(result.current.getValues()).toEqual(\{\});
			  \});
			
			  it('should unregister all inputs', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{
			        input: string;
			        input2: string;
			      \}>(),
			    );
			
			    result.current.register('input');
			    result.current.register('input');
			    result.current.register('input2');
			
			    await act(async () => \{
			      await result.current.unregister();
			    \});
			
			    expect(result.current.getValues()).toEqual(\{\});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\unregister.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm\\watch.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ Controller \} from '../../controller';
			import \{ Control, FieldValues \} from '../../types';
			import \{ useFieldArray \} from '../../useFieldArray';
			import \{ useForm \} from '../../useForm';
			import \{ useWatch \} from '../../useWatch';
			import isFunction from '../../utils/isFunction';
			
			describe('watch', () => \{
			  it('should return undefined when input gets unregister', async () => \{
			    const Component = () => \{
			      const \{ register, watch, unregister \} = useForm<\{ test: string \}>();
			      const data = watch('test');
			
			      return (
			        <>
			          <input \{...register('test')\} />
			          <span>\{data\}</span>
			          <button type="button" onClick=\{() => unregister('test')\}>
			            hide
			          </button>
			        </>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(screen.getByText('test')).toBeVisible();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(screen.queryByText('test')).not.toBeInTheDocument();
			  \});
			
			  it('should watch individual input', async () => \{
			    const \{ result \} = renderHook(() => \{
			      return useForm<\{ test: string \}>(\{
			        defaultValues: \{
			          test: 'data',
			        \},
			      \});
			    \});
			
			    expect(result.current.watch('test')).toBe('data');
			
			    result.current.register('test');
			
			    await act(async () => \{
			      result.current.setValue('test', 'data1');
			    \});
			
			    act(() => \{
			      expect(result.current.watch('test')).toBe('data1');
			    \});
			  \});
			
			  it('should watch input when mode is under onChange', async () => \{
			    const \{ result \} = renderHook(() => \{
			      return useForm<\{ test: string \}>(\{
			        defaultValues: \{
			          test: 'data',
			        \},
			        mode: 'onChange',
			      \});
			    \});
			
			    expect(result.current.watch('test')).toBe('data');
			
			    result.current.register('test');
			
			    await act(async () => \{
			      result.current.setValue('test', 'data1');
			    \});
			
			    act(() => \{
			      expect(result.current.watch('test')).toBe('data1');
			    \});
			  \});
			
			  it('should watch input when mode is under all', async () => \{
			    const \{ result \} = renderHook(() => \{
			      return useForm<\{ test: string \}>(\{
			        defaultValues: \{
			          test: 'data',
			        \},
			        mode: 'all',
			      \});
			    \});
			
			    expect(result.current.watch('test')).toBe('data');
			
			    result.current.register('test');
			
			    await act(async () => \{
			      result.current.setValue('test', 'data1');
			    \});
			
			    act(() => \{
			      expect(result.current.watch('test')).toBe('data1');
			    \});
			  \});
			
			  it('should return default value if field is undefined', () => \{
			    renderHook(() => \{
			      const \{ watch \} = useForm<\{ test: string \}>(\{
			        defaultValues: \{ test: 'test' \},
			      \});
			
			      expect(watch()).toEqual(\{ test: 'test' \});
			    \});
			  \});
			
			  it('should return default value for single input', () => \{
			    const results: unknown[] = [];
			    const App = () => \{
			      const \{ watch \} = useForm<\{ test: string \}>();
			
			      results.push(watch('test', 'default'));
			
			      return null;
			    \};
			
			    render(<App />);
			
			    expect(results).toEqual(['default']);
			  \});
			
			  it('should return array of default value for array of inputs', () => \{
			    const results: unknown[] = [];
			    const App = () => \{
			      const \{ watch \} = useForm<\{ test: string; test1: string \}>();
			
			      results.push(
			        watch(['test', 'test1'], \{
			          test: 'default',
			          test1: 'test',
			        \}),
			      );
			
			      return null;
			    \};
			
			    render(<App />);
			
			    expect(results).toEqual([['default', 'test']]);
			  \});
			
			  it('should watch array of inputs', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string; test1: string \}>(),
			    );
			
			    expect(result.current.watch(['test', 'test1'])).toEqual([
			      undefined,
			      undefined,
			    ]);
			
			    const \{ ref \} = result.current.register('test');
			    isFunction(ref) &&
			      ref(\{
			        name: 'test',
			        value: 'data1',
			      \});
			
			    const \{ ref: ref1 \} = result.current.register('test1');
			    isFunction(ref1) &&
			      ref1(\{
			        name: 'test1',
			        value: 'data2',
			      \});
			
			    expect(result.current.watch(['test', 'test1'])).toEqual(['data1', 'data2']);
			  \});
			
			  it('should watch every fields', () => \{
			    const \{ result \} = renderHook(() =>
			      useForm<\{ test: string; test1: string \}>(),
			    );
			
			    const \{ ref \} = result.current.register('test');
			    isFunction(ref) &&
			      ref(\{
			        name: 'test',
			        value: 'data1',
			      \});
			
			    const \{ ref: ref1 \} = result.current.register('test1');
			    isFunction(ref1) &&
			      ref1(\{
			        name: 'test1',
			        value: 'data2',
			      \});
			
			    expect(result.current.watch()).toEqual(\{ test: 'data1', test1: 'data2' \});
			  \});
			
			  it('should watch the entire field array with callback', () => \{
			    const output: any[] = [];
			
			    const Component = () => \{
			      const \{ watch, register \} = useForm<\{
			        test: string;
			        test1: string;
			      \}>();
			
			      React.useEffect(() => \{
			        const subscription = watch((data) => \{
			          data.test;
			          data.test1;
			          output.push(data);
			        \});
			
			        return () => \{
			          subscription.unsubscribe();
			        \};
			      \}, [watch]);
			
			      return <input \{...register('test')\} />;
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test1',
			      \},
			    \});
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test2',
			      \},
			    \});
			
			    expect(output).toEqual([
			      \{
			        test: 'test',
			      \},
			      \{
			        test: 'test1',
			      \},
			      \{
			        test: 'test2',
			      \},
			    ]);
			  \});
			
			  it('should watch correctly with useFieldArray with action and then fallback to onChange', () => \{
			    type FormValues = \{
			      names: \{
			        name: string;
			      \}[];
			    \};
			
			    const output: object[] = [];
			
			    const Component = () => \{
			      const \{ control, handleSubmit, watch \} = useForm<FormValues>(\{
			        defaultValues: \{
			          names: [],
			        \},
			      \});
			      const \{ fields, append \} = useFieldArray(\{
			        control,
			        name: 'names',
			      \});
			
			      const handleAddElement = () => \{
			        append(\{ name: 'test' \});
			      \};
			
			      output.push(watch());
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          \{fields.map((item, index) => \{
			            return (
			              <div key=\{item.id\}>
			                <Controller
			                  control=\{control\}
			                  name=\{\`names.\$\{index\}.name\` as const\}
			                  render=\{(\{ field \}) => <input \{...field\} />\}
			                />
			              </div>
			            );
			          \})\}
			          <button type="button" onClick=\{handleAddElement\}>
			            Append
			          </button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(output.at(-1)).toEqual(\{
			      names: [],
			    \});
			
			    const appendButton = screen.getByRole('button');
			
			    fireEvent.click(appendButton);
			
			    fireEvent.click(appendButton);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{ value: '123' \},
			    \});
			
			    expect(output.at(-1)).toEqual(\{
			      names: [
			        \{
			          name: '123',
			        \},
			        \{
			          name: 'test',
			        \},
			      ],
			    \});
			
			    fireEvent.change(screen.getAllByRole('textbox')[1], \{
			      target: \{ value: '456' \},
			    \});
			
			    // Let's check all values of renders with implicitly the number of render (for each value)
			    expect(output).toMatchSnapshot();
			  \});
			
			  it('should have dirty marked when watch is enabled', async () => \{
			    function Component() \{
			      const \{
			        register,
			        formState: \{ isDirty \},
			        watch,
			      \} = useForm<\{
			        lastName: string;
			      \}>(\{
			        defaultValues: \{ lastName: '' \},
			      \});
			      watch('lastName');
			
			      return (
			        <form>
			          <input \{...register('lastName')\} />
			          <p>\{isDirty ? 'True' : 'False'\}</p>
			        </form>
			      );
			    \}
			
			    render(<Component />);
			
			    expect(screen.getByText('False')).toBeVisible();
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'test' \},
			    \});
			
			    expect(screen.getByText('True')).toBeVisible();
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: '' \},
			    \});
			
			    expect(await screen.findByText('False')).toBeVisible();
			  \});
			
			  it('should return deeply nested field values with defaultValues', async () => \{
			    let data;
			
			    function App() \{
			      const \{ register, watch \} = useForm<\{
			        test: \{
			          firstName: string;
			          lastName: string;
			        \};
			      \}>(\{
			        defaultValues: \{
			          test: \{ lastName: '', firstName: '' \},
			        \},
			      \});
			      data = watch();
			
			      return (
			        <form>
			          <input \{...register('test.lastName')\} />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '1234',
			      \},
			    \});
			
			    expect(data).toEqual(\{
			      test: \{
			        firstName: '',
			        lastName: '1234',
			      \},
			    \});
			  \});
			
			  it('should remove input value after input is unmounted with shouldUnregister: true', () => \{
			    const watched: unknown[] = [];
			    const App = () => \{
			      const [show, setShow] = React.useState(true);
			      const \{ watch, register \} = useForm(\{
			        shouldUnregister: true,
			      \});
			
			      watched.push(watch());
			
			      return (
			        <div>
			          \{show && <input \{...register('test')\} />\}
			          <button
			            onClick=\{() => \{
			              setShow(false);
			            \}\}
			          >
			            toggle
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    expect(watched).toEqual([\{\}]);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '1',
			      \},
			    \});
			
			    expect(watched).toEqual([
			      \{\},
			      \{
			        test: '1',
			      \},
			    ]);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(watched).toEqual([
			      \{\},
			      \{
			        test: '1',
			      \},
			      \{
			        test: '1',
			      \},
			      \{\},
			    ]);
			  \});
			
			  it('should flush additional render for shouldUnregister: true', async () => \{
			    const watchedData: unknown[] = [];
			
			    const App = () => \{
			      const \{ watch, reset, register \} = useForm(\{
			        shouldUnregister: true,
			      \});
			
			      React.useEffect(() => \{
			        reset(\{
			          test: '1234',
			          data: '1234',
			        \});
			      \}, [reset]);
			
			      const result = watch();
			
			      watchedData.push(result);
			
			      return (
			        <div>
			          <input \{...register('test')\} />
			          \{result.test && <p>\{result.test\}</p>\}
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    expect(await screen.findByText('1234')).toBeVisible();
			
			    expect(watchedData).toEqual([\{\}, \{\}, \{ test: '1234' \}]);
			  \});
			
			  it('should not be able to overwrite global watch state', () => \{
			    function Watcher<T extends FieldValues>(\{
			      control,
			    \}: \{
			      control: Control<T>;
			    \}) \{
			      useWatch(\{
			        control,
			      \});
			      return null;
			    \}
			
			    function App() \{
			      const \{ register, watch, control \} = useForm(\{
			        defaultValues: \{
			          firstName: '',
			        \},
			      \});
			      const \{ firstName \} = watch();
			
			      return (
			        <form>
			          <p>\{firstName\}</p>
			          <Watcher control=\{control\} />
			          <input \{...register('firstName')\} />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'bill',
			      \},
			    \});
			
			    screen.getByText('bill');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm\\watch.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(16)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm.server.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ renderToString \} from 'react-dom/server';
			
			import \{ useForm \} from '../useForm';
			
			describe('useForm with SSR', () => \{
			  it('should not output error', () => \{
			    const Component = () => \{
			      const \{ register \} = useForm<\{
			        test: string;
			      \}>();
			      return (
			        <div>
			          <input \{...register('test')\} />
			        </div>
			      );
			    \};
			
			    const spy = jest.spyOn(console, 'error');
			
			    expect(renderToString(<Component />)).toEqual(
			      '<div><input name="test"/></div>',
			    );
			
			    expect(spy).not.toHaveBeenCalled();
			  \});
			
			  it('should not pass down constrained API for server side rendering', () => \{
			    const App = () => \{
			      const \{ register \} = useForm<\{
			        test: string;
			      \}>();
			
			      return (
			        <div>
			          <input
			            \{...register('test', \{
			              required: true,
			              min: 2,
			              max: 2,
			              maxLength: 2,
			              minLength: 2,
			            \})\}
			          />
			        </div>
			      );
			    \};
			
			    expect(renderToString(<App />)).toEqual('<div><input name="test"/></div>');
			  \});
			
			  it('should pass down constrained API for server side rendering', () => \{
			    const App = () => \{
			      const \{ register \} = useForm<\{
			        test: string;
			      \}>(\{
			        shouldUseNativeValidation: true,
			      \});
			
			      return (
			        <div>
			          <input
			            \{...register('test', \{
			              required: true,
			              min: 2,
			              max: 2,
			              maxLength: 2,
			              minLength: 2,
			            \})\}
			          />
			        </div>
			      );
			    \};
			
			    expect(renderToString(<App />)).toEqual('<div><input name="test"/></div>');
			  \});
			
			  it('should support progress enhancement for form', () => \{
			    const App = () => \{
			      const \{ register \} = useForm<\{
			        test: string;
			      \}>(\{
			        progressive: true,
			      \});
			
			      return (
			        <div>
			          <input
			            \{...register('test', \{
			              required: true,
			              min: 2,
			              max: 2,
			              maxLength: 2,
			              minLength: 2,
			            \})\}
			          />
			        </div>
			      );
			    \};
			
			    expect(renderToString(<App />)).toEqual(
			      '<div><input required="" min="2" max="2" minLength="2" maxLength="2" name="test"/></div>',
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm.server.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useForm.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  act as actComponent,
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			  waitForElementToBeRemoved,
			\} from '@testing-library/react';
			import \{ act, renderHook \} from '@testing-library/react-hooks';
			
			import \{ VALIDATION_MODE \} from '../constants';
			import \{
			  Control,
			  RegisterOptions,
			  UseFormRegister,
			  UseFormReturn,
			\} from '../types';
			import isFunction from '../utils/isFunction';
			import \{ sleep \} from '../utils/sleep';
			import \{ Controller, useFieldArray, useForm \} from '../';
			
			describe('useForm', () => \{
			  describe('when component unMount', () => \{
			    it('should call unSubscribe', () => \{
			      const \{ result, unmount \} = renderHook(() => useForm<\{ test: string \}>());
			
			      result.current.register('test');
			      unmount();
			
			      expect(result.current.getValues()).toEqual(\{\});
			    \});
			
			    it('should remain array field values when inputs gets unmounted', () => \{
			      const \{ result, unmount \} = renderHook(() =>
			        useForm<\{ test: string[] \}>(),
			      );
			
			      result.current.register('test.0');
			      result.current.register('test.1');
			      result.current.register('test.2');
			
			      unmount();
			
			      expect(result.current.getValues()).toEqual(\{
			        test: [undefined, undefined, undefined],
			      \});
			    \});
			
			    it('should not unregister errors when unmounted', async () => \{
			      const \{ result, unmount \} = renderHook(() =>
			        useForm<\{
			          test: string;
			        \}>(),
			      );
			
			      result.current.formState.errors;
			      result.current.register('test', \{ required: true \});
			
			      await act(async () => \{
			        await result.current.handleSubmit(() => \{\})(\{
			          preventDefault: () => \{\},
			          persist: () => \{\},
			        \} as React.SyntheticEvent);
			      \});
			
			      expect(result.current.formState.errors.test).toBeDefined();
			
			      unmount();
			
			      expect(result.current.formState.errors.test).toBeDefined();
			    \});
			
			    it('should only unregister errors when unregister method invoked', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{
			          test: string;
			        \}>(),
			      );
			
			      result.current.formState.errors;
			      result.current.register('test', \{ required: true \});
			
			      await act(async () => \{
			        await result.current.handleSubmit(() => \{\})(\{
			          preventDefault: () => \{\},
			          persist: () => \{\},
			        \} as React.SyntheticEvent);
			      \});
			
			      expect(result.current.formState.errors.test).toBeDefined();
			
			      await act(async () => \{
			        result.current.unregister('test');
			      \});
			
			      expect(result.current.formState.errors.test).not.toBeDefined();
			    \});
			
			    it('should not unregister touched', () => \{
			      let formState: any;
			      const Component = () => \{
			        const \{ register, formState: tempFormState \} = useForm<\{
			          test: string;
			        \}>();
			        formState = tempFormState;
			
			        formState.touchedFields;
			
			        return (
			          <div>
			            <input \{...register('test', \{ required: true \})\} />
			          </div>
			        );
			      \};
			      const \{ unmount \} = render(<Component />);
			
			      fireEvent.blur(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      expect(formState.touchedFields.test).toBeDefined();
			      expect(formState.isDirty).toBeFalsy();
			
			      unmount();
			
			      expect(formState.touchedFields.test).toBeDefined();
			      expect(formState.isDirty).toBeFalsy();
			    \});
			
			    it('should update dirtyFields during unregister', () => \{
			      let formState: any;
			      const Component = () => \{
			        const \{ register, formState: tempFormState \} = useForm<\{
			          test: string;
			        \}>();
			        formState = tempFormState;
			
			        formState.isDirty;
			        formState.dirtyFields;
			
			        return <input \{...register('test', \{ required: true \})\} />;
			      \};
			      const \{ unmount \} = render(<Component />);
			
			      fireEvent.input(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      expect(formState.dirtyFields.test).toBeDefined();
			      expect(formState.isDirty).toBeTruthy();
			
			      unmount();
			
			      expect(formState.dirtyFields.test).toBeDefined();
			      expect(formState.isDirty).toBeTruthy();
			    \});
			
			    it('should only validate input which are mounted even with shouldUnregister: false', async () => \{
			      const Component = () => \{
			        const [show, setShow] = React.useState(true);
			        const \{
			          handleSubmit,
			          register,
			          formState: \{ errors \},
			        \} = useForm<\{
			          firstName: string;
			          lastName: string;
			        \}>();
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            \{show && <input \{...register('firstName', \{ required: true \})\} />\}
			            \{errors.firstName && <p>First name is required.</p>\}
			
			            <input \{...register('lastName', \{ required: true \})\} />
			            \{errors.lastName && <p>Last name is required.</p>\}
			
			            <button type=\{'button'\} onClick=\{() => setShow(!show)\}>
			              toggle
			            </button>
			            <button type=\{'submit'\}>submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			      expect(await screen.findByText('First name is required.')).toBeVisible();
			      expect(screen.getByText('Last name is required.')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			      expect(screen.getByText('Last name is required.')).toBeVisible();
			
			      await waitForElementToBeRemoved(
			        screen.queryByText('First name is required.'),
			      );
			    \});
			  \});
			
			  describe('when shouldUnregister set to true', () => \{
			    describe('with useFieldArray', () => \{
			      type FormValues = \{
			        test: string;
			        test1: string;
			        test2: \{
			          value: string;
			        \}[];
			      \};
			
			      const Child = (\{
			        control,
			        register,
			      \}: \{
			        control: Control<FormValues>;
			        register: UseFormRegister<FormValues>;
			      \}) => \{
			        const \{ fields \} = useFieldArray(\{
			          control,
			          name: 'test2',
			          shouldUnregister: true,
			        \});
			
			        return (
			          <>
			            \{fields.map((field, i) => (
			              <input
			                key=\{field.id\}
			                \{...register(\`test2.\$\{i\}.value\` as const)\}
			              />
			            ))\}
			          </>
			        );
			      \};
			
			      it('should remove and unregister inputs when inputs gets unmounted', async () => \{
			        let submittedData: FormValues;
			
			        const Component = () => \{
			          const [show, setShow] = React.useState(true);
			          const \{ register, handleSubmit, control \} = useForm<FormValues>(\{
			            shouldUnregister: true,
			            defaultValues: \{
			              test: 'bill',
			              test1: 'bill1',
			              test2: [\{ value: 'bill2' \}],
			            \},
			          \});
			
			          return (
			            <form onSubmit=\{handleSubmit((data) => (submittedData = data))\}>
			              \{show && (
			                <>
			                  <input \{...register('test')\} />
			                  <Controller
			                    control=\{control\}
			                    render=\{(\{ field \}) => <input \{...field\} />\}
			                    name=\{'test1'\}
			                  />
			                  <Child control=\{control\} register=\{register\} />
			                </>
			              )\}
			              <button>Submit</button>
			              <button type=\{'button'\} onClick=\{() => setShow(false)\}>
			                Toggle
			              </button>
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'Submit' \}));
			
			        await waitFor(() =>
			          expect(submittedData).toEqual(\{
			            test: 'bill',
			            test1: 'bill1',
			            test2: [
			              \{
			                value: 'bill2',
			              \},
			            ],
			          \}),
			        );
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'Toggle' \}));
			
			        fireEvent.click(screen.getByRole('button', \{ name: 'Submit' \}));
			
			        await waitFor(() => expect(submittedData).toEqual(\{\}));
			      \});
			    \});
			
			    it('should not mutate defaultValues', () => \{
			      const defaultValues = \{
			        test: \{
			          test: '123',
			          test1: '1234',
			        \},
			      \};
			
			      const Form = () => \{
			        const \{ register, control \} = useForm(\{
			          defaultValues,
			        \});
			        return (
			          <>
			            <input \{...register('test.test', \{ shouldUnregister: true \})\} />
			            <Controller
			              control=\{control\}
			              shouldUnregister
			              render=\{() => \{
			                return <input />;
			              \}\}
			              name=\{'test.test1'\}
			            />
			          </>
			        );
			      \};
			
			      const App = () => \{
			        const [show, setShow] = React.useState(true);
			        return (
			          <>
			            \{show && <Form />\}
			            <button
			              type=\{'button'\}
			              onClick=\{() => \{
			                setShow(!show);
			              \}\}
			            >
			              toggle
			            </button>
			          </>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      fireEvent.click(screen.getByRole('button'));
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(defaultValues).toEqual(\{
			        test: \{
			          test: '123',
			          test1: '1234',
			        \},
			      \});
			    \});
			
			    it('should not register or shallow defaultValues into submission data', () => \{
			      let data = \{\};
			
			      const App = () => \{
			        const \{ handleSubmit \} = useForm(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			        \});
			
			        return (
			          <button
			            onClick=\{handleSubmit((d) => \{
			              data = d;
			            \})\}
			          >
			            sumbit
			          </button>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(data).toEqual(\{\});
			    \});
			
			    it('should keep validation during unmount', async () => \{
			      const onSubmit = jest.fn();
			
			      function Component() \{
			        const \{
			          register,
			          handleSubmit,
			          watch,
			          formState: \{ errors, submitCount \},
			        \} = useForm<\{
			          firstName: string;
			          moreDetail: boolean;
			        \}>(\{
			          shouldUnregister: true,
			        \});
			        const moreDetail = watch('moreDetail');
			
			        return (
			          <>
			            <p>Submit count: \{submitCount\}</p>
			            <form onSubmit=\{handleSubmit(onSubmit)\}>
			              <input
			                placeholder="firstName"
			                \{...register('firstName', \{ maxLength: 3 \})\}
			              />
			              \{errors.firstName && <p>max length</p>\}
			              <input
			                type="checkbox"
			                \{...register('moreDetail')\}
			                placeholder=\{'checkbox'\}
			              />
			
			              \{moreDetail && <p>show more</p>\}
			              <button>Submit</button>
			            </form>
			          </>
			        );
			      \}
			
			      render(<Component />);
			
			      fireEvent.change(screen.getByPlaceholderText('firstName'), \{
			        target: \{
			          value: 'testtesttest',
			        \},
			      \});
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('Submit count: 1')).toBeVisible();
			      expect(screen.getByText('max length')).toBeVisible();
			
			      fireEvent.click(screen.getByPlaceholderText('checkbox'));
			
			      expect(screen.getByText('show more')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(await screen.findByText('Submit count: 2')).toBeVisible();
			      expect(screen.getByText('max length')).toBeVisible();
			    \});
			
			    it('should only unregister inputs when all checkboxes are unmounted', async () => \{
			      let result: Record<string, string> | undefined = undefined;
			
			      const Component = () => \{
			        const \{ register, handleSubmit \} = useForm(\{
			          shouldUnregister: true,
			        \});
			        const [radio1, setRadio1] = React.useState(true);
			        const [radio2, setRadio2] = React.useState(true);
			
			        return (
			          <form
			            onSubmit=\{handleSubmit((data) => \{
			              result = data;
			            \})\}
			          >
			            \{radio1 && (
			              <input \{...register('test')\} type=\{'radio'\} value=\{'1'\} />
			            )\}
			            \{radio2 && (
			              <input \{...register('test')\} type=\{'radio'\} value=\{'2'\} />
			            )\}
			            <button type=\{'button'\} onClick=\{() => setRadio1(!radio1)\}>
			              setRadio1
			            </button>
			            <button type=\{'button'\} onClick=\{() => setRadio2(!radio2)\}>
			              setRadio2
			            </button>
			            <button>Submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setRadio1' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'Submit' \}));
			
			      await waitFor(() => expect(result).toEqual(\{ test: null \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'setRadio2' \}));
			
			      fireEvent.click(screen.getByRole('button', \{ name: 'Submit' \}));
			
			      await waitFor(() => expect(result).toEqual(\{\}));
			    \});
			  \});
			
			  describe('when errors changes', () => \{
			    it('should display the latest error message', async () => \{
			      const Form = () => \{
			        const \{
			          register,
			          setError,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: string;
			        \}>();
			
			        React.useEffect(() => \{
			          setError('test', \{
			            type: 'data',
			            message: 'data',
			          \});
			        \}, [setError]);
			
			        return (
			          <div>
			            <input
			              \{...register('test', \{
			                maxLength: \{
			                  message: 'max',
			                  value: 3,
			                \},
			              \})\}
			              placeholder="test"
			              type="text"
			            />
			            <span role="alert">\{errors.test && errors.test.message\}</span>
			          </div>
			        );
			      \};
			
			      render(<Form />);
			
			      const span = screen.getByRole('alert');
			
			      await waitFor(() => expect(span.textContent).toBe('data'));
			
			      fireEvent.input(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      await waitFor(() => expect(span.textContent).toBe('data'));
			    \});
			  \});
			
			  describe('handleChangeRef', () => \{
			    const Component = (\{
			      resolver,
			      mode,
			      rules = \{ required: 'required' \},
			      onSubmit = () => \{\},
			    \}: \{
			      resolver?: any;
			      mode?: 'onBlur' | 'onSubmit' | 'onChange';
			      rules?: RegisterOptions<\{ test: string \}, 'test'>;
			      onSubmit?: () => void;
			    \}) => \{
			      const internationalMethods = useForm<\{ test: string \}>(\{
			        resolver,
			        mode,
			      \});
			      const \{
			        register,
			        handleSubmit,
			        formState: \{ errors, isValid, isDirty \},
			      \} = internationalMethods;
			      methods = internationalMethods;
			
			      return (
			        <div>
			          <input type="text" \{...register('test', resolver ? \{\} : rules)\} />
			          <span role="alert">
			            \{errors?.test?.message && errors.test.message\}
			          </span>
			          <button onClick=\{handleSubmit(onSubmit)\}>button</button>
			          <p>\{isValid ? 'valid' : 'invalid'\}</p>
			          <p>\{isDirty ? 'dirty' : 'pristine'\}</p>
			        </div>
			      );
			    \};
			    let methods: UseFormReturn<\{ test: string \}>;
			
			    describe('onSubmit mode', () => \{
			      it('should not contain error if value is valid', async () => \{
			        const onSubmit = jest.fn();
			
			        render(<Component onSubmit=\{onSubmit\} />);
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        fireEvent.click(screen.getByRole('button'));
			
			        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
			
			        const alert = await screen.findByRole('alert');
			        expect(alert.textContent).toBe('');
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        expect(alert.textContent).toBe('');
			      \});
			
			      it('should not contain error if name is invalid', async () => \{
			        const onSubmit = jest.fn();
			
			        render(<Component onSubmit=\{onSubmit\} />);
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        fireEvent.click(screen.getByRole('button'));
			
			        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
			
			        const alert = await screen.findByRole('alert');
			        expect(alert.textContent).toBe('');
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'wrongName', value: '' \},
			        \});
			
			        expect(alert.textContent).toBe('');
			      \});
			
			      it('should contain error if value is invalid with revalidateMode is onChange', async () => \{
			        const onSubmit = jest.fn();
			
			        render(<Component onSubmit=\{onSubmit\} />);
			
			        const input = screen.getByRole('textbox');
			
			        fireEvent.input(input, \{ target: \{ name: 'test', value: 'test' \} \});
			
			        fireEvent.click(screen.getByRole('button'));
			
			        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
			
			        expect(screen.getByRole('alert').textContent).toBe('');
			
			        fireEvent.input(input, \{ target: \{ name: 'test', value: '' \} \});
			
			        await waitFor(() =>
			          expect(screen.getByRole('alert').textContent).toBe('required'),
			        );
			      \});
			
			      it('should not call reRender method if the current error is the same as the previous error', async () => \{
			        render(<Component />);
			
			        const input = screen.getByRole('textbox');
			
			        fireEvent.input(input, \{ target: \{ name: 'test', value: '' \} \});
			
			        fireEvent.click(screen.getByRole('button'));
			
			        await waitFor(() =>
			          expect(screen.getByRole('alert').textContent).toBe('required'),
			        );
			
			        fireEvent.input(input, \{ target: \{ name: 'test', value: '' \} \});
			
			        expect(screen.getByRole('alert').textContent).toBe('required');
			      \});
			
			      it('should set name to formState.touchedFields when formState.touchedFields is defined', async () => \{
			        const onSubmit = jest.fn();
			
			        render(<Component onSubmit=\{onSubmit\} rules=\{\{\}\} />);
			
			        methods.formState.touchedFields;
			
			        fireEvent.click(screen.getByRole('button'));
			
			        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
			
			        fireEvent.blur(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        await waitFor(() =>
			          expect(methods.formState.touchedFields).toEqual(\{
			            test: true,
			          \}),
			        );
			        expect(screen.getByRole('alert').textContent).toBe('');
			      \});
			
			      // check https://github.com/react-hook-form/react-hook-form/issues/2153
			      it('should perform correct behavior when reValidateMode is onBlur', async () => \{
			        const onSubmit = jest.fn();
			
			        const Component = () => \{
			          const \{
			            register,
			            handleSubmit,
			            formState: \{ errors \},
			          \} = useForm<\{
			            test: string;
			          \}>(\{
			            reValidateMode: 'onBlur',
			          \});
			          return (
			            <form onSubmit=\{handleSubmit(onSubmit)\}>
			              <input type="text" \{...register('test', \{ required: true \})\} />
			              \{errors.test && <span role="alert">required</span>\}
			              <button>submit</button>
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{
			            value: 'test',
			          \},
			        \});
			
			        fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			
			        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ value: '' \},
			        \});
			
			        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
			
			        fireEvent.blur(screen.getByRole('textbox'));
			
			        expect(await screen.findByRole('alert')).toBeVisible();
			      \});
			    \});
			
			    describe('onChange', () => \{
			      it('should display error with onChange', async () => \{
			        render(<Component mode="onChange" />);
			
			        fireEvent.change(screen.getByRole('textbox'), \{
			          target: \{
			            value: 'test',
			          \},
			        \});
			
			        await waitFor(() => screen.getByText('valid'));
			
			        fireEvent.change(screen.getByRole('textbox'), \{
			          target: \{
			            value: '',
			          \},
			        \});
			
			        await waitFor(() =>
			          expect(screen.getByRole('alert').textContent).toBe('required'),
			        );
			      \});
			
			      it('should display error with onSubmit', async () => \{
			        render(<Component mode="onChange" />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        await waitFor(() =>
			          expect(screen.getByRole('alert').textContent).toBe('required'),
			        );
			      \});
			
			      it('should not display error with onBlur', async () => \{
			        render(<Component mode="onChange" />);
			
			        fireEvent.blur(screen.getByRole('textbox'), \{
			          target: \{
			            value: '',
			          \},
			        \});
			
			        expect(screen.getByRole('alert').textContent).toBe('');
			      \});
			    \});
			
			    describe('onBlur', () => \{
			      it('should display error with onBlur', async () => \{
			        render(<Component mode="onBlur" />);
			
			        fireEvent.blur(screen.getByRole('textbox'), \{
			          target: \{
			            value: '',
			          \},
			        \});
			
			        await waitFor(() =>
			          expect(screen.getByRole('alert').textContent).toBe('required'),
			        );
			      \});
			
			      it('should display error with onSubmit', async () => \{
			        render(<Component mode="onBlur" />);
			
			        fireEvent.click(screen.getByRole('button'));
			
			        await waitFor(() =>
			          expect(screen.getByRole('alert').textContent).toBe('required'),
			        );
			      \});
			
			      it('should not display error with onChange', async () => \{
			        render(<Component mode="onBlur" />);
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{
			            value: '',
			          \},
			        \});
			
			        expect(screen.getByRole('alert').textContent).toBe('');
			      \});
			    \});
			
			    describe('with watch', () => \{
			      it('should be return undefined or null value', () => \{
			        const \{ result \} = renderHook(() =>
			          useForm<\{
			            test: string | null;
			            test1?: string;
			          \}>(),
			        );
			
			        result.current.register('test');
			        result.current.register('test1');
			
			        act(() => \{
			          result.current.setValue('test', null);
			        \});
			
			        act(() => \{
			          result.current.setValue('test1', undefined);
			        \});
			
			        const test = result.current.watch('test');
			        const test1 = result.current.watch('test1');
			
			        expect(test).toBeNull();
			        expect(test1).toBeUndefined();
			      \});
			
			      it('should be called reRender method if isWatchAllRef is true', async () => \{
			        let watchedField: any;
			        const Component = () => \{
			          const \{ register, handleSubmit, watch \} = useForm<\{
			            test: string;
			          \}>();
			          watchedField = watch();
			          return (
			            <form onSubmit=\{handleSubmit(() => \{\})\}>
			              <input \{...register('test')\} />
			              <button>button</button>
			            </form>
			          );
			        \};
			        render(<Component />);
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        expect(watchedField).toEqual(\{ test: 'test' \});
			      \});
			
			      it('should be called reRender method if field is watched', async () => \{
			        let watchedField: any;
			        const Component = () => \{
			          const \{ register, handleSubmit, watch \} = useForm<\{
			            test: string;
			          \}>();
			          watchedField = watch('test');
			          return (
			            <form onSubmit=\{handleSubmit(() => \{\})\}>
			              <input \{...register('test')\} />
			              <button>button</button>
			            </form>
			          );
			        \};
			        render(<Component />);
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        expect(watchedField).toBe('test');
			      \});
			
			      it('should be called reRender method if array field is watched', async () => \{
			        let watchedField: any;
			        const Component = () => \{
			          const \{ register, handleSubmit, watch \} = useForm<\{
			            test: string[];
			          \}>();
			          watchedField = watch('test');
			          return (
			            <form onSubmit=\{handleSubmit(() => \{\})\}>
			              <input \{...register('test.0')\} />
			              <input \{...register('test.1')\} />
			              <input \{...register('test.2')\} />
			              <button>button</button>
			            </form>
			          );
			        \};
			        render(<Component />);
			
			        fireEvent.input(screen.getAllByRole('textbox')[0], \{
			          target: \{ name: 'test.0', value: 'test' \},
			        \});
			
			        expect(watchedField).toEqual(['test', '', '']);
			      \});
			    \});
			
			    describe('with resolver', () => \{
			      it('should contain error if value is invalid with resolver', async () => \{
			        const resolver = jest.fn(async (data: any) => \{
			          if (data.test) \{
			            return \{ values: data, errors: \{\} \};
			          \}
			          return \{
			            values: data,
			            errors: \{
			              test: \{
			                message: 'resolver error',
			              \},
			            \},
			          \};
			        \});
			
			        render(<Component resolver=\{resolver\} mode="onChange" />);
			
			        methods.formState.isValid;
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			        expect(await screen.findByText('dirty')).toBeVisible();
			        expect(resolver).toHaveBeenCalled();
			
			        expect(screen.getByRole('alert').textContent).toBe('');
			        expect(methods.formState.isValid).toBeTruthy();
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: '' \},
			        \});
			
			        await waitFor(() => \{
			          expect(screen.getByRole('alert')).toHaveTextContent('resolver error');
			        \});
			        expect(resolver).toHaveBeenCalled();
			        expect(methods.formState.isValid).toBeFalsy();
			      \});
			
			      it('with sync resolver it should contain error if value is invalid with resolver', async () => \{
			        const resolver = jest.fn((data: any) => \{
			          if (data.test) \{
			            return \{ values: data, errors: \{\} \};
			          \}
			          return \{
			            values: data,
			            errors: \{
			              test: \{
			                message: 'resolver error',
			              \},
			            \},
			          \};
			        \});
			
			        render(<Component resolver=\{resolver\} mode="onChange" />);
			
			        methods.formState.isValid;
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        await waitFor(() => expect(methods.formState.isValid).toBe(true));
			        expect(screen.getByRole('alert').textContent).toBe('');
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: '' \},
			        \});
			
			        expect(await screen.findByText('invalid')).toBeVisible();
			        expect(methods.formState.isValid).toBe(false);
			        expect(screen.getByRole('alert')).toHaveTextContent('resolver error');
			        expect(resolver).toHaveBeenCalled();
			      \});
			
			      it('should make isValid change to false if it contain error that is not related name with onChange mode', async () => \{
			        const resolver = jest.fn(async (data: any) => \{
			          if (data.test) \{
			            return \{ values: data, errors: \{\} \};
			          \}
			          return \{
			            values: data,
			            errors: \{
			              notRelatedName: \{
			                message: 'resolver error',
			              \},
			            \},
			          \};
			        \});
			
			        render(<Component resolver=\{resolver\} mode="onChange" />);
			
			        methods.formState.isValid;
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        await waitFor(() => expect(methods.formState.isValid).toBeTruthy());
			        expect(screen.getByRole('alert').textContent).toBe('');
			
			        fireEvent.input(screen.getByRole('textbox'), \{
			          target: \{ name: 'test', value: '' \},
			        \});
			
			        await waitFor(() => expect(methods.formState.isValid).toBeFalsy());
			        expect(resolver).toHaveBeenCalled();
			        expect(screen.getByRole('alert').textContent).toBe('');
			      \});
			
			      it("should call the resolver with the field being validated when an input's value change", async () => \{
			        const resolver = jest.fn((values: any) => (\{ values, errors: \{\} \}));
			        const onSubmit = jest.fn();
			
			        render(
			          <Component resolver=\{resolver\} onSubmit=\{onSubmit\} mode="onChange" />,
			        );
			
			        expect(await screen.findByText('valid')).toBeVisible();
			
			        const input = screen.getByRole('textbox');
			
			        expect(resolver).toHaveBeenCalledWith(
			          \{
			            test: '',
			          \},
			          undefined,
			          \{
			            criteriaMode: undefined,
			            fields: \{
			              test: \{
			                mount: true,
			                name: 'test',
			                ref: input,
			              \},
			            \},
			            names: ['test'],
			            shouldUseNativeValidation: undefined,
			          \},
			        );
			
			        resolver.mockClear();
			
			        fireEvent.input(input, \{
			          target: \{ name: 'test', value: 'test' \},
			        \});
			
			        expect(await screen.findByText('dirty')).toBeVisible();
			
			        expect(resolver).toHaveBeenCalledWith(
			          \{
			            test: 'test',
			          \},
			          undefined,
			          \{
			            criteriaMode: undefined,
			            fields: \{
			              test: \{
			                mount: true,
			                name: 'test',
			                ref: input,
			              \},
			            \},
			            names: ['test'],
			            shouldUseNativeValidation: undefined,
			          \},
			        );
			
			        resolver.mockClear();
			
			        fireEvent.click(screen.getByText(/button/i));
			
			        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
			
			        expect(resolver).toHaveBeenCalledWith(
			          \{
			            test: 'test',
			          \},
			          undefined,
			          \{
			            criteriaMode: undefined,
			            fields: \{
			              test: \{
			                mount: true,
			                name: 'test',
			                ref: input,
			              \},
			            \},
			            names: ['test'],
			            shouldUseNativeValidation: undefined,
			          \},
			        );
			      \});
			
			      it('should call the resolver with the field being validated when \`trigger\` is called', async () => \{
			        const resolver = jest.fn((values: any) => (\{ values, errors: \{\} \}));
			        const defaultValues = \{ test: \{ sub: 'test' \}, test1: 'test1' \};
			
			        const \{ result \} = renderHook(() =>
			          useForm<typeof defaultValues>(\{
			            mode: VALIDATION_MODE.onChange,
			            resolver,
			            defaultValues,
			          \}),
			        );
			
			        expect(resolver).not.toHaveBeenCalled();
			
			        await act(async () => \{
			          await result.current.register('test.sub');
			          await result.current.register('test1');
			        \});
			
			        await act(async () => \{
			          result.current.trigger('test.sub');
			        \});
			
			        const fields = \{
			          test: \{
			            sub: \{
			              mount: true,
			              name: 'test.sub',
			              ref: \{ name: 'test.sub' \},
			            \},
			          \},
			          test1: \{
			            mount: true,
			            name: 'test1',
			            ref: \{
			              name: 'test1',
			            \},
			          \},
			        \};
			
			        expect(resolver).toHaveBeenCalledWith(defaultValues, undefined, \{
			          criteriaMode: undefined,
			          fields,
			          names: ['test.sub', 'test1'],
			        \});
			
			        await act(async () => \{
			          result.current.trigger();
			        \});
			
			        expect(resolver).toHaveBeenNthCalledWith(2, defaultValues, undefined, \{
			          criteriaMode: undefined,
			          fields,
			          names: ['test.sub', 'test1'],
			        \});
			
			        await act(async () => \{
			          result.current.trigger(['test.sub', 'test1']);
			        \});
			
			        expect(resolver).toHaveBeenNthCalledWith(3, defaultValues, undefined, \{
			          criteriaMode: undefined,
			          fields,
			          names: ['test.sub', 'test1'],
			        \});
			      \});
			    \});
			  \});
			
			  describe('updateValid', () => \{
			    it('should be called resolver with default values if default value is defined', async () => \{
			      type FormValues = \{
			        test: string;
			      \};
			
			      const resolver = jest.fn(async (data: FormValues) => \{
			        return \{
			          values: data,
			          errors: \{\},
			        \};
			      \});
			
			      const \{ result \} = renderHook(() =>
			        useForm<FormValues>(\{
			          resolver,
			          defaultValues: \{ test: 'default' \},
			        \}),
			      );
			
			      const \{ ref \} = result.current.register('test');
			
			      isFunction(ref) &&
			        ref(\{
			          target: \{
			            value: '',
			          \},
			        \});
			
			      await act(async () => \{
			        await result.current.trigger();
			      \});
			
			      expect(resolver).toHaveBeenCalledWith(
			        \{
			          test: 'default',
			        \},
			        undefined,
			        \{
			          criteriaMode: undefined,
			          fields: \{
			            test: \{
			              mount: true,
			              name: 'test',
			              ref: \{
			                target: \{
			                  value: '',
			                \},
			                value: 'default',
			              \},
			            \},
			          \},
			          names: ['test'],
			        \},
			      );
			    \});
			
			    it('should be called resolver with field values if value is undefined', async () => \{
			      type FormValues = \{
			        test: string;
			      \};
			
			      const resolver = jest.fn(async (data: FormValues) => \{
			        return \{
			          values: data,
			          errors: \{\},
			        \};
			      \});
			
			      const \{ result \} = renderHook(() =>
			        useForm<FormValues>(\{
			          resolver,
			        \}),
			      );
			
			      result.current.register('test');
			
			      result.current.setValue('test', 'value');
			
			      result.current.trigger();
			
			      expect(resolver).toHaveBeenCalledWith(\{ test: 'value' \}, undefined, \{
			        criteriaMode: undefined,
			        fields: \{
			          test: \{
			            mount: true,
			            name: 'test',
			            ref: \{ name: 'test', value: 'value' \},
			          \},
			        \},
			        names: ['test'],
			      \});
			    \});
			  \});
			
			  describe('mode with onTouched', () => \{
			    it('should validate form only when input is been touched', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: string;
			        \}>(\{
			          mode: 'onTouched',
			        \});
			
			        return (
			          <>
			            <input
			              type="text"
			              \{...register('test', \{ required: 'This is required.' \})\}
			            />
			            \{errors.test?.message\}
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      const input = screen.getByRole('textbox');
			
			      fireEvent.focus(input);
			
			      fireEvent.blur(input);
			
			      expect(await screen.findByText('This is required.')).toBeVisible();
			
			      fireEvent.input(input, \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      await waitFor(() =>
			        expect(screen.queryByText('This is required.')).not.toBeInTheDocument(),
			      );
			
			      fireEvent.input(input, \{
			        target: \{
			          value: '',
			        \},
			      \});
			
			      expect(await screen.findByText('This is required.')).toBeVisible();
			    \});
			
			    it('should validate onFocusout event', async () => \{
			      const Component = () => \{
			        const \{
			          register,
			          formState: \{ errors \},
			        \} = useForm<\{
			          test: string;
			        \}>(\{
			          mode: 'onTouched',
			        \});
			
			        return (
			          <>
			            <input
			              type="text"
			              \{...register('test', \{ required: 'This is required.' \})\}
			            />
			            \{errors.test?.message\}
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      const input = screen.getByRole('textbox');
			
			      fireEvent.focus(input);
			
			      fireEvent.focusOut(input);
			
			      expect(await screen.findByText('This is required.')).toBeVisible();
			
			      fireEvent.input(input, \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      await waitFor(() =>
			        expect(screen.queryByText('This is required.')).not.toBeInTheDocument(),
			      );
			
			      fireEvent.input(input, \{
			        target: \{
			          value: '',
			        \},
			      \});
			
			      expect(await screen.findByText('This is required.')).toBeVisible();
			    \});
			  \});
			
			  describe('with schema validation', () => \{
			    it('should trigger and clear errors for group errors object', async () => \{
			      let errorsObject = \{\};
			
			      const Component = () => \{
			        const \{
			          formState: \{ errors \},
			          register,
			          handleSubmit,
			        \} = useForm<\{
			          checkbox: string[];
			        \}>(\{
			          mode: 'onChange',
			          resolver: (data) => \{
			            return \{
			              errors: \{
			                ...(data.checkbox.every((value) => !value)
			                  ? \{ checkbox: \{ type: 'error', message: 'wrong' \} \}
			                  : \{\}),
			              \},
			              values: \{\},
			            \};
			          \},
			        \});
			        errorsObject = errors;
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            \{[1, 2, 3].map((value, index) => (
			              <div key=\{\`test.\$\{index\}\`\}>
			                <label
			                  htmlFor=\{\`checkbox.\$\{index\}\`\}
			                >\{\`checkbox.\$\{index\}\`\}</label>
			                <input
			                  type=\{'checkbox'\}
			                  key=\{index\}
			                  id=\{\`checkbox.\$\{index\}\`\}
			                  \{...register(\`checkbox.\$\{index\}\` as const)\}
			                  value=\{value\}
			                />
			              </div>
			            ))\}
			
			            <button>Submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByLabelText('checkbox.0'));
			
			      fireEvent.click(screen.getByLabelText('checkbox.0'));
			
			      await waitFor(() =>
			        expect(errorsObject).toEqual(\{
			          checkbox: \{ type: 'error', message: 'wrong' \},
			        \}),
			      );
			
			      fireEvent.click(screen.getByLabelText('checkbox.0'));
			
			      await waitFor(() => expect(errorsObject).toEqual(\{\}));
			
			      fireEvent.click(screen.getByLabelText('checkbox.0'));
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() =>
			        expect(errorsObject).toEqual(\{
			          checkbox: \{ type: 'error', message: 'wrong' \},
			        \}),
			      );
			
			      fireEvent.click(screen.getByLabelText('checkbox.0'));
			
			      await waitFor(() => expect(errorsObject).toEqual(\{\}));
			    \});
			
			    it('should not clear errors for non checkbox parent inputs', async () => \{
			      let errorsObject = \{\};
			
			      const Component = () => \{
			        const \{
			          formState: \{ errors \},
			          register,
			          handleSubmit,
			        \} = useForm<\{
			          checkbox: [\{ test: string \}, \{ test1: string \}];
			        \}>(\{
			          mode: 'onChange',
			          resolver: (data) => \{
			            return \{
			              errors: \{
			                ...(!data.checkbox[0].test || !data.checkbox[1].test1
			                  ? \{
			                      checkbox: [
			                        \{
			                          ...(!data.checkbox[0].test
			                            ? \{ test: \{ type: 'error', message: 'wrong' \} \}
			                            : \{\}),
			                          ...(!data.checkbox[1].test1
			                            ? \{ test1: \{ type: 'error', message: 'wrong' \} \}
			                            : \{\}),
			                        \},
			                      ],
			                    \}
			                  : \{\}),
			              \},
			              values: \{\},
			            \};
			          \},
			        \});
			        errorsObject = errors;
			
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            <input type=\{'checkbox'\} \{...register(\`checkbox.0.test\`)\} />
			
			            <input \{...register(\`checkbox.1.test1\`)\} />
			            <button>Submit</button>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() =>
			        expect(errorsObject).toEqual(\{
			          checkbox: [
			            \{
			              test: \{ type: 'error', message: 'wrong' \},
			              test1: \{ type: 'error', message: 'wrong' \},
			            \},
			          ],
			        \}),
			      );
			
			      fireEvent.click(screen.getByRole('checkbox'));
			
			      fireEvent.click(screen.getByRole('button'));
			
			      await waitFor(() =>
			        expect(errorsObject).toEqual(\{
			          checkbox: [
			            \{
			              test1: \{ type: 'error', message: 'wrong' \},
			            \},
			          ],
			        \}),
			      );
			    \});
			
			    it('should have formState.isValid equals true with defined default values after executing resolver', async () => \{
			      const Toggle = () => \{
			        const [toggle, setToggle] = React.useState(false);
			
			        const \{ register, formState \} = useForm(\{
			          defaultValues: \{ test: 'Test' \},
			          mode: 'onChange',
			          resolver: async (values) => \{
			            if (!values.test) \{
			              return \{
			                values: \{\},
			                errors: \{
			                  test: \{
			                    type: 'required',
			                  \},
			                \},
			              \};
			            \}
			
			            return \{
			              values,
			              errors: \{\},
			            \};
			          \},
			        \});
			
			        return (
			          <>
			            <button onClick=\{() => setToggle(!toggle)\}>Toggle</button>
			            \{toggle && <input id="test" \{...register('test')\} />\}
			            <button disabled=\{!formState.isValid\}>Submit</button>
			          </>
			        );
			      \};
			
			      render(<Toggle />);
			
			      const toggle = () => fireEvent.click(screen.getByText('Toggle'));
			
			      toggle();
			
			      await waitFor(() => expect(screen.getByText('Submit')).toBeEnabled());
			
			      toggle();
			      toggle();
			
			      expect(screen.getByText('Submit')).toBeEnabled();
			    \});
			  \});
			
			  describe('control', () => \{
			    it('does not change across re-renders', () => \{
			      let control;
			
			      const Component = () => \{
			        const form = useForm<\{
			          test: string;
			        \}>();
			
			        control = form.control;
			
			        return (
			          <>
			            <input type="text" \{...form.register('test')\} />
			          </>
			        );
			      \};
			
			      const \{ rerender \} = render(<Component />);
			
			      const firstRenderControl = control;
			
			      rerender(<Component />);
			
			      const secondRenderControl = control;
			
			      expect(Object.is(firstRenderControl, secondRenderControl)).toBe(true);
			    \});
			  \});
			
			  describe('when input is not registered', () => \{
			    it('trigger should not throw warn', async () => \{
			      const \{ result \} = renderHook(() =>
			        useForm<\{
			          test: string;
			        \}>(),
			      );
			
			      await act(async () =>
			        expect(await result.current.trigger('test')).toBeTruthy(),
			      );
			    \});
			  \});
			
			  it('should unsubscribe to all subject when hook unmounts', () => \{
			    let tempControl: any;
			
			    const App = () => \{
			      const \{ control \} = useForm();
			      tempControl = control;
			
			      return null;
			    \};
			
			    const \{ unmount \} = render(<App />);
			
			    expect(tempControl._subjects.state.observers.length).toBeTruthy();
			
			    unmount();
			
			    expect(tempControl._subjects.state.observers.length).toBeFalsy();
			  \});
			
			  it('should update isValidating to true when other validation still running', async () => \{
			    jest.useFakeTimers();
			
			    function App() \{
			      const [stateValidation, setStateValidation] = React.useState(false);
			      const \{
			        register,
			        formState: \{ isValidating \},
			      \} = useForm(\{ mode: 'all' \});
			
			      return (
			        <div>
			          <p>isValidating: \{String(isValidating)\}</p>
			          <p>stateValidation: \{String(stateValidation)\}</p>
			          <form>
			            <input
			              \{...register('lastName', \{
			                required: true,
			                validate: () => \{
			                  setStateValidation(true);
			                  return new Promise((resolve) => \{
			                    setTimeout(() => \{
			                      setStateValidation(false);
			                      resolve(true);
			                    \}, 5000);
			                  \});
			                \},
			              \})\}
			              placeholder="async"
			            />
			
			            <input
			              \{...register('firstName', \{ required: true \})\}
			              placeholder="required"
			            />
			          </form>
			        </div>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByPlaceholderText('async'), \{
			      target: \{ value: 'test' \},
			    \});
			    fireEvent.change(screen.getByPlaceholderText('required'), \{
			      target: \{ value: 'test' \},
			    \});
			
			    screen.getByText('isValidating: true');
			    screen.getByText('stateValidation: true');
			
			    await actComponent(async () => \{
			      jest.runAllTimers();
			    \});
			
			    screen.getByText('isValidating: false');
			    screen.getByText('stateValidation: false');
			  \});
			
			  it('should update defaultValues async', async () => \{
			    const App = () => \{
			      const \{
			        register,
			        formState: \{ isLoading \},
			      \} = useForm<\{
			        test: string;
			      \}>(\{
			        defaultValues: async () => \{
			          await sleep(100);
			
			          return \{
			            test: 'test',
			          \};
			        \},
			      \});
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			          <p>\{isLoading ? 'loading...' : 'done'\}</p>
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    await waitFor(() => \{
			      screen.getByText('loading...');
			    \});
			
			    await waitFor(() => \{
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        'test',
			      );
			    \});
			
			    await waitFor(() => \{
			      screen.getByText('done');
			    \});
			  \});
			
			  it('should update async default values for controlled components', async () => \{
			    const App = () => \{
			      const \{ control \} = useForm<\{
			        test: string;
			      \}>(\{
			        defaultValues: async () => \{
			          await sleep(100);
			
			          return \{
			            test: 'test',
			          \};
			        \},
			      \});
			
			      return (
			        <form>
			          <Controller
			            control=\{control\}
			            render=\{(\{ field \}) => <input \{...field\} />\}
			            defaultValue=""
			            name=\{'test'\}
			          />
			        </form>
			      );
			    \};
			
			    render(<App />);
			
			    await waitFor(() => \{
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        'test',
			      );
			    \});
			  \});
			
			  it('should update async form values', async () => \{
			    type FormValues = \{
			      test: string;
			    \};
			
			    function Loader() \{
			      const [values, setValues] = React.useState<FormValues>(\{
			        test: '',
			      \});
			
			      const loadData = React.useCallback(async () => \{
			        await sleep(100);
			
			        setValues(\{
			          test: 'test',
			        \});
			      \}, []);
			
			      React.useEffect(() => \{
			        loadData();
			      \}, [loadData]);
			
			      return <App values=\{values\} />;
			    \}
			
			    const App = (\{ values \}: \{ values: FormValues \}) => \{
			      const \{ register \} = useForm(\{
			        values,
			      \});
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			        </form>
			      );
			    \};
			
			    render(<Loader />);
			
			    await waitFor(() => \{
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        'test',
			      );
			    \});
			  \});
			
			  it('should only update async form values which are not interacted', async () => \{
			    type FormValues = \{
			      test: string;
			      test1: string;
			    \};
			
			    function Loader() \{
			      const [values, setValues] = React.useState<FormValues>(\{
			        test: '',
			        test1: '',
			      \});
			
			      const loadData = React.useCallback(async () => \{
			        await sleep(100);
			
			        setValues(\{
			          test: 'test',
			          test1: 'data',
			        \});
			      \}, []);
			
			      React.useEffect(() => \{
			        loadData();
			      \}, [loadData]);
			
			      return <App values=\{values\} />;
			    \}
			
			    const App = (\{ values \}: \{ values: FormValues \}) => \{
			      const \{ register \} = useForm(\{
			        values,
			        resetOptions: \{
			          keepDirtyValues: true,
			        \},
			      \});
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			          <input \{...register('test1')\} />
			        </form>
			      );
			    \};
			
			    render(<Loader />);
			
			    fireEvent.change(screen.getAllByRole('textbox')[0], \{
			      target: \{
			        value: 'test1',
			      \},
			    \});
			
			    await waitFor(() => \{
			      expect(
			        (screen.getAllByRole('textbox')[0] as HTMLInputElement).value,
			      ).toEqual('test1');
			    \});
			
			    await waitFor(() => \{
			      expect(
			        (screen.getAllByRole('textbox')[1] as HTMLInputElement).value,
			      ).toEqual('data');
			    \});
			  \});
			
			  it('should not update isLoading when literal defaultValues are provided', async () => \{
			    const \{ result \} = renderHook(() =>
			      useForm(\{ defaultValues: \{ test: 'default' \} \}),
			    );
			
			    expect(result.current.formState.isLoading).toBe(false);
			  \});
			
			  it('should update isValidating to true when using with resolver', async () => \{
			    jest.useFakeTimers();
			
			    function App() \{
			      const \{
			        register,
			        formState: \{ isValidating \},
			      \} = useForm<\{
			        firstName: string;
			        lastName: string;
			      \}>(\{
			        mode: 'all',
			        defaultValues: \{
			          lastName: '',
			          firstName: '',
			        \},
			        resolver: async () => \{
			          await sleep(2000);
			
			          return \{
			            errors: \{\},
			            values: \{\},
			          \};
			        \},
			      \});
			
			      return (
			        <div>
			          <p>isValidating: \{String(isValidating)\}</p>
			          <input \{...register('lastName')\} placeholder="async" />
			          <input \{...register('firstName')\} placeholder="required" />
			        </div>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByPlaceholderText('async'), \{
			      target: \{ value: 'test' \},
			    \});
			    fireEvent.change(screen.getByPlaceholderText('async'), \{
			      target: \{ value: 'test1' \},
			    \});
			    fireEvent.change(screen.getByPlaceholderText('required'), \{
			      target: \{ value: 'test2' \},
			    \});
			    fireEvent.change(screen.getByPlaceholderText('required'), \{
			      target: \{ value: 'test3' \},
			    \});
			
			    screen.getByText('isValidating: true');
			
			    await actComponent(async () => \{
			      jest.runAllTimers();
			    \});
			
			    screen.getByText('isValidating: false');
			  \});
			
			  it('should update form values when values updates even with the same values', async () => \{
			    type FormValues = \{
			      firstName: string;
			    \};
			
			    function App() \{
			      const [firstName, setFirstName] = React.useState('C');
			      const values = React.useMemo(() => (\{ firstName \}), [firstName]);
			
			      const \{
			        register,
			        formState: \{ isDirty \},
			        watch,
			      \} = useForm<FormValues>(\{
			        defaultValues: \{
			          firstName: 'C',
			        \},
			        values,
			        resetOptions: \{ keepDefaultValues: true \},
			      \});
			      const formValues = watch();
			
			      return (
			        <form>
			          <button type="button" onClick=\{() => setFirstName('A')\}>
			            1
			          </button>
			          <button type="button" onClick=\{() => setFirstName('B')\}>
			            2
			          </button>
			          <button type="button" onClick=\{() => setFirstName('C')\}>
			            3
			          </button>
			          <input \{...register('firstName')\} placeholder="First Name" />
			          <p>\{isDirty ? 'dirty' : 'pristine'\}</p>
			          <p>\{formValues.firstName\}</p>
			          <input type="submit" />
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: '1' \}));
			
			    await waitFor(() => \{
			      screen.getByText('A');
			      screen.getByText('dirty');
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: '2' \}));
			
			    await waitFor(() => \{
			      screen.getByText('B');
			      screen.getByText('dirty');
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: '3' \}));
			
			    await waitFor(() => \{
			      screen.getByText('C');
			      screen.getByText('pristine');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useForm.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(52)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFormContext.server.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ renderToString \} from 'react-dom/server';
			
			import \{ useController \} from '../useController';
			import \{ useForm \} from '../useForm';
			import \{ FormProvider, useFormContext \} from '../useFormContext';
			import \{ useFormState \} from '../useFormState';
			import \{ useWatch \} from '../useWatch';
			
			describe('FormProvider', () => \{
			  it('should work correctly with Controller, useWatch, useFormState.', () => \{
			    const App = () => \{
			      const \{ field \} = useController(\{
			        name: 'test',
			        defaultValue: '',
			      \});
			      return <input \{...field\} />;
			    \};
			
			    const TestWatch = () => \{
			      const value = useWatch(\{
			        name: 'test',
			      \});
			
			      return <p>\{value\}</p>;
			    \};
			
			    const TestFormState = () => \{
			      const \{ isDirty \} = useFormState();
			
			      return <div>\{isDirty ? 'yes' : 'no'\}</div>;
			    \};
			
			    const TestUseFormContext = () => \{
			      const methods = useFormContext();
			      methods.register('test');
			      return null;
			    \};
			
			    const Component = () => \{
			      const methods = useForm();
			
			      return (
			        <FormProvider \{...methods\}>
			          <App />
			          <TestUseFormContext />
			          <TestWatch />
			          <TestFormState />
			        </FormProvider>
			      );
			    \};
			
			    const output = renderToString(<Component />);
			
			    expect(output).toEqual('<input name="test" value=""/><p></p><div>no</div>');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFormContext.server.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFormContext.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			
			import \{ useController \} from '../useController';
			import \{ useForm \} from '../useForm';
			import \{ FormProvider, useFormContext \} from '../useFormContext';
			import \{ useFormState \} from '../useFormState';
			import \{ useWatch \} from '../useWatch';
			import deepEqual from '../utils/deepEqual';
			
			describe('FormProvider', () => \{
			  it('should have access to all methods with useFormContext', () => \{
			    const mockRegister = jest.fn();
			    const Test = () => \{
			      const \{ register \} = useFormContext();
			
			      React.useEffect(() => \{
			        register('test');
			      \}, [register]);
			
			      return null;
			    \};
			
			    const App = () => \{
			      const methods = useForm();
			
			      return (
			        <FormProvider \{...methods\} register=\{mockRegister\}>
			          <form>
			            <Test />
			          </form>
			        </FormProvider>
			      );
			    \};
			
			    render(<App />);
			
			    expect(mockRegister).toHaveBeenCalled();
			  \});
			
			  it('should work correctly with Controller, useWatch, useFormState.', async () => \{
			    const TestComponent = () => \{
			      const \{ field \} = useController(\{
			        name: 'test',
			        defaultValue: '',
			      \});
			      return <input \{...field\} />;
			    \};
			
			    const TestWatch = () => \{
			      const value = useWatch(\{
			        name: 'test',
			      \});
			
			      return <p>Value: \{value === undefined ? 'undefined value' : value\}</p>;
			    \};
			
			    const TestFormState = () => \{
			      const \{ isDirty \} = useFormState();
			
			      return <div>Dirty: \{isDirty ? 'yes' : 'no'\}</div>;
			    \};
			
			    const Component = () => \{
			      const methods = useForm();
			      return (
			        <FormProvider \{...methods\}>
			          <TestComponent />
			          <TestWatch />
			          <TestFormState />
			        </FormProvider>
			      );
			    \};
			
			    render(<Component />);
			
			    const input = screen.getByRole('textbox');
			
			    expect(input).toBeVisible();
			    expect(await screen.findByText('Value: undefined value')).toBeVisible();
			    expect(screen.getByText('Dirty: no')).toBeVisible();
			
			    fireEvent.change(input, \{ target: \{ value: 'test' \} \});
			    expect(screen.getByText('Value: test')).toBeVisible();
			    expect(screen.getByText('Dirty: yes')).toBeVisible();
			  \});
			
			  it('should not throw type error', () => \{
			    type FormValues = \{
			      firstName: string;
			    \};
			
			    type Context = \{
			      someValue: boolean;
			    \};
			
			    function App() \{
			      const methods = useForm<FormValues, Context>();
			      const \{ handleSubmit, register \} = methods;
			
			      return (
			        <div>
			          <FormProvider \{...methods\}>
			            <form onSubmit=\{handleSubmit(() => \{\})\}>
			              <input \{...register('firstName')\} placeholder="First Name" />
			              <input type="submit" />
			            </form>
			          </FormProvider>
			        </div>
			      );
			    \}
			
			    render(<App />);
			  \});
			
			  it('should be able to access defaultValues within formState', () => \{
			    type FormValues = \{
			      firstName: string;
			      lastName: string;
			    \};
			
			    const defaultValues = \{
			      firstName: 'a',
			      lastName: 'b',
			    \};
			
			    const Test1 = () => \{
			      const methods = useFormState();
			
			      return (
			        <p>
			          \{deepEqual(methods.defaultValues, defaultValues)
			            ? 'context-yes'
			            : 'context-no'\}
			        </p>
			      );
			    \};
			
			    const Test = () => \{
			      const methods = useFormContext();
			
			      return (
			        <p>
			          \{deepEqual(methods.formState.defaultValues, defaultValues)
			            ? 'yes'
			            : 'no'\}
			        </p>
			      );
			    \};
			
			    const Component = () => \{
			      const methods = useForm<FormValues>(\{
			        defaultValues,
			      \});
			
			      return (
			        <FormProvider \{...methods\}>
			          <Test />
			          <Test1 />
			          <button
			            onClick=\{() => \{
			              methods.reset(\{
			                firstName: 'c',
			                lastName: 'd',
			              \});
			            \}\}
			          >
			            reset
			          </button>
			          <p>\{JSON.stringify(defaultValues)\}</p>
			        </FormProvider>
			      );
			    \};
			
			    render(<Component />);
			
			    expect(screen.getByText('yes')).toBeVisible();
			    expect(screen.getByText('context-yes')).toBeVisible();
			
			    screen.getByText(JSON.stringify(defaultValues));
			
			    fireEvent.click(screen.getByRole('button'));
			
			    waitFor(() => \{
			      expect(screen.getByText('yes')).not.toBeValid();
			      expect(screen.getByText('context-yes')).not.toBeVisible();
			
			      screen.getByText(
			        JSON.stringify(\{
			          firstName: 'c',
			          lastName: 'd',
			        \}),
			      );
			    \});
			  \});
			
			  it('should report errors correctly', async () => \{
			    const Child = () => \{
			      const \{
			        formState: \{ errors \},
			        register,
			        handleSubmit,
			      \} = useFormContext<\{
			        test: string;
			      \}>();
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <input \{...register('test', \{ required: 'This is required' \})\} />
			          <p>\{errors.test?.message\}</p>
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    const App = () => \{
			      const methods = useForm();
			
			      return (
			        <FormProvider \{...methods\}>
			          <Child />
			        </FormProvider>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    await waitFor(() => screen.getByText('This is required'));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFormContext.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useFormState.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen, waitFor \} from '@testing-library/react';
			
			import \{ Controller \} from '../controller';
			import \{ Control \} from '../types';
			import \{ useFieldArray \} from '../useFieldArray';
			import \{ useForm \} from '../useForm';
			import \{ FormProvider \} from '../useFormContext';
			import \{ useFormState \} from '../useFormState';
			import deepEqual from '../utils/deepEqual';
			
			describe('useFormState', () => \{
			  it('should render correct form state with isDirty, dirty, touched', () => \{
			    let count = 0;
			    const Test = (\{
			      control,
			    \}: \{
			      control: Control<\{
			        test: string;
			      \}>;
			    \}) => \{
			      const \{ isDirty, dirtyFields, touchedFields \} = useFormState(\{
			        control,
			      \});
			
			      return (
			        <>
			          <div>\{isDirty ? 'isDirty' : ''\}</div>
			          <div>\{dirtyFields['test'] ? 'dirty field' : ''\}</div>
			          <div>\{touchedFields['test'] ? 'isTouched' : ''\}</div>
			        </>
			      );
			    \};
			
			    const Component = () => \{
			      const \{ register, control \} = useForm<\{
			        test: string;
			      \}>();
			
			      count++;
			
			      return (
			        <div>
			          <input aria-label="test" \{...register('test')\} />
			          <Test control=\{control\} />
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByLabelText('test'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(screen.getByText('isDirty')).toBeVisible();
			    expect(screen.getByText('dirty field')).toBeVisible();
			    expect(count).toEqual(1);
			
			    fireEvent.blur(screen.getByLabelText('test'));
			    expect(screen.getByText('isTouched')).toBeVisible();
			    expect(count).toEqual(1);
			  \});
			
			  it('should render correct isolated errors message', async () => \{
			    let count = 0;
			    const Test = (\{ control \}: \{ control: Control \}) => \{
			      const \{ errors, isValid \} = useFormState(\{
			        control,
			      \});
			
			      return (
			        <>
			          <div>\{errors['test'] ? 'error' : 'valid'\}</div>
			          <div>\{isValid ? 'yes' : 'no'\}</div>
			        </>
			      );
			    \};
			
			    const Component = () => \{
			      const \{ register, control \} = useForm(\{
			        mode: 'onChange',
			      \});
			
			      count++;
			
			      return (
			        <div>
			          <input aria-label="test" \{...register('test', \{ minLength: 5 \})\} />
			          <Test control=\{control\} />
			        </div>
			      );
			    \};
			    render(<Component />);
			
			    await waitFor(() => expect(screen.getByText('yes')).toBeVisible());
			
			    fireEvent.input(screen.getByLabelText('test'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(await screen.findByText('error')).toBeVisible();
			    expect(screen.getByText('no')).toBeVisible();
			
			    fireEvent.input(screen.getByLabelText('test'), \{
			      target: \{
			        value: 'testtest',
			      \},
			    \});
			
			    expect(await screen.findByText('valid')).toBeVisible();
			    expect(screen.getByText('yes')).toBeVisible();
			
			    expect(count).toEqual(1);
			  \});
			
			  it('should update isValidating correctly', async () => \{
			    function Child() \{
			      const \{ isDirty, isValid, isValidating \} = useFormState();
			      const enabled = !isValidating && isDirty && isValid;
			
			      return (
			        <button disabled=\{!enabled\} type="submit">
			          Submit
			        </button>
			      );
			    \}
			
			    function App() \{
			      const formFunctions = useForm(\{
			        mode: 'onChange',
			      \});
			      const \{ register \} = formFunctions;
			
			      return (
			        <FormProvider \{...formFunctions\}>
			          <form>
			            <input \{...register('value', \{ required: true \})\} />
			            <Child />
			          </form>
			        </FormProvider>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '1',
			      \},
			    \});
			
			    await waitFor(() => \{
			      expect(screen.getByRole('button')).not.toBeDisabled();
			    \});
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '12',
			      \},
			    \});
			
			    await waitFor(() => \{
			      expect(screen.getByRole('button')).not.toBeDisabled();
			    \});
			  \});
			
			  it('should update formState separately with useFormState', async () => \{
			    let count = 0;
			    let testCount = 0;
			    let test1Count = 0;
			
			    const Test1 = (\{ control \}: \{ control: Control \}) => \{
			      const \{ isDirty, dirtyFields \} = useFormState(\{
			        control,
			      \});
			
			      testCount++;
			
			      return (
			        <>
			          <div>
			            \{dirtyFields['test'] ? 'hasDirtyField' : 'notHasDirtyField'\}
			          </div>
			          <div>\{isDirty ? 'isDirty' : 'notDirty'\}</div>
			        </>
			      );
			    \};
			
			    const Test = (\{ control \}: \{ control: Control \}) => \{
			      const \{ touchedFields \} = useFormState(\{
			        control,
			      \});
			
			      test1Count++;
			
			      return (
			        <>
			          <div>\{touchedFields['test'] ? 'isTouched' : 'notTouched'\}</div>
			        </>
			      );
			    \};
			
			    const Component = () => \{
			      const \{ register, control \} = useForm(\{
			        mode: 'onChange',
			      \});
			
			      count++;
			
			      return (
			        <div>
			          <input aria-label="test" \{...register('test', \{ minLength: 5 \})\} />
			          <Test control=\{control\} />
			          <Test1 control=\{control\} />
			        </div>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.input(screen.getByLabelText('test'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    expect(await screen.findByText('hasDirtyField')).toBeVisible();
			    expect(screen.getByText('isDirty')).toBeVisible();
			
			    expect(count).toEqual(1);
			    expect(testCount).toEqual(2);
			    expect(test1Count).toEqual(1);
			
			    fireEvent.blur(screen.getByLabelText('test'));
			    expect(screen.getByText('isTouched')).toBeVisible();
			
			    expect(count).toEqual(1);
			    expect(testCount).toEqual(2);
			    expect(test1Count).toEqual(2);
			
			    fireEvent.input(screen.getByLabelText('test'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    expect(count).toEqual(1);
			    expect(testCount).toEqual(2);
			    expect(test1Count).toEqual(2);
			  \});
			
			  it('should render correct submit state', async () => \{
			    let count = 0;
			    const Test = (\{ control \}: \{ control: Control \}) => \{
			      const \{ isSubmitted, submitCount \} = useFormState(\{
			        control,
			      \});
			
			      return (
			        <>
			          <div>\{isSubmitted ? 'isSubmitted' : ''\}</div>
			          <div>\{submitCount\}</div>
			        </>
			      );
			    \};
			
			    const Component = () => \{
			      const \{ control, handleSubmit \} = useForm();
			
			      count++;
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <Test control=\{control\} />
			          <button>Submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.findByText('isSubmitted')).toBeVisible();
			    expect(screen.getByText('1')).toBeVisible();
			
			    expect(count).toEqual(1);
			  \});
			
			  it('should only re-render when subscribed field name updated', async () => \{
			    let count = 0;
			
			    type FormValues = \{
			      firstName: string;
			      lastName: string;
			    \};
			
			    const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const \{ errors \} = useFormState(\{
			        control,
			        name: 'firstName',
			      \});
			
			      count++;
			
			      return <>\{errors?.firstName?.message\}</>;
			    \};
			
			    const Component = () => \{
			      const \{ control, register \} = useForm<FormValues>(\{
			        mode: 'onChange',
			        defaultValues: \{
			          firstName: 'a',
			          lastName: 'b',
			        \},
			      \});
			
			      return (
			        <form>
			          <Test control=\{control\} />
			          <input
			            \{...register('firstName', \{ required: true \})\}
			            placeholder=\{'firstName'\}
			          />
			          <input \{...register('lastName')\} />
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByPlaceholderText('firstName'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    await waitFor(() => expect(count).toEqual(2));
			  \});
			
			  it('should not re-render when subscribed field name is not included', async () => \{
			    let count = 0;
			
			    type FormValues = \{
			      firstName: string;
			      lastName: string;
			    \};
			
			    const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const \{ errors \} = useFormState(\{
			        control,
			        name: 'lastName',
			      \});
			
			      count++;
			
			      return <>\{errors?.lastName?.message\}</>;
			    \};
			
			    const Component = () => \{
			      const \{ control, register \} = useForm<FormValues>(\{
			        mode: 'onChange',
			        defaultValues: \{
			          firstName: 'a',
			          lastName: 'b',
			        \},
			      \});
			
			      return (
			        <form>
			          <Test control=\{control\} />
			          <input
			            \{...register('firstName', \{ required: true \})\}
			            placeholder=\{'firstName'\}
			          />
			          <input \{...register('lastName')\} />
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByPlaceholderText('firstName'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    expect(count).toEqual(1);
			  \});
			
			  it('should only re-render when subscribed field names updated', async () => \{
			    let count = 0;
			
			    type FormValues = \{
			      firstName: string;
			      lastName: string;
			      age: number;
			    \};
			
			    const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const \{ errors \} = useFormState(\{
			        control,
			        name: ['firstName', 'lastName'],
			      \});
			
			      count++;
			
			      return <>\{errors?.firstName?.message\}</>;
			    \};
			
			    const Component = () => \{
			      const \{ control, register \} = useForm<FormValues>(\{
			        mode: 'onChange',
			        defaultValues: \{
			          firstName: 'a',
			          lastName: 'b',
			        \},
			      \});
			
			      return (
			        <form>
			          <Test control=\{control\} />
			          <input
			            \{...register('firstName', \{ required: true \})\}
			            placeholder=\{'firstName'\}
			          />
			          <input
			            \{...register('lastName', \{ required: true \})\}
			            placeholder=\{'lastName'\}
			          />
			          <input
			            \{...register('age', \{ valueAsNumber: true, required: true \})\}
			            type="number"
			          />
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByPlaceholderText('firstName'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    fireEvent.change(screen.getByPlaceholderText('lastName'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    await waitFor(() => expect(count).toEqual(2));
			  \});
			
			  it('should only re-render when subscribed field names updated', async () => \{
			    let count = 0;
			
			    type FormValues = \{
			      firstName: string;
			      lastName: string;
			      age: number;
			    \};
			
			    const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const \{ errors \} = useFormState(\{
			        control,
			        name: ['age', 'lastName'],
			      \});
			
			      count++;
			
			      return <>\{errors?.firstName?.message\}</>;
			    \};
			
			    const Component = () => \{
			      const \{ control, register \} = useForm<FormValues>(\{
			        mode: 'onChange',
			        defaultValues: \{
			          firstName: 'a',
			          lastName: 'b',
			        \},
			      \});
			
			      return (
			        <form>
			          <Test control=\{control\} />
			          <input
			            \{...register('firstName', \{ required: true \})\}
			            placeholder=\{'firstName'\}
			          />
			          <input \{...register('lastName')\} placeholder=\{'lastName'\} />
			          <input
			            \{...register('age', \{ valueAsNumber: true, required: true \})\}
			            type="number"
			          />
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByPlaceholderText('firstName'), \{
			      target: \{
			        value: '',
			      \},
			    \});
			
			    expect(count).toEqual(1);
			  \});
			
			  it('should be able to stop the formState subscription', async () => \{
			    type FormValues = \{
			      test: string;
			    \};
			
			    function Child(\{ control \}: \{ control: Control<FormValues> \}) \{
			      const [disabled, setDisabled] = React.useState(true);
			      const \{ errors \} = useFormState(\{
			        control,
			        name: 'test',
			        disabled,
			      \});
			
			      return (
			        <div>
			          \{errors.test && <p>error</p>\}
			          <button onClick=\{() => setDisabled(!disabled)\}>toggle</button>
			        </div>
			      );
			    \}
			
			    const App = () => \{
			      const \{ trigger, register, control \} = useForm<FormValues>();
			
			      return (
			        <div>
			          <input \{...register('test', \{ required: true \})\} />
			          <Child control=\{control\} />
			          <button
			            onClick=\{() => \{
			              trigger();
			            \}\}
			          >
			            trigger
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'trigger' \}));
			
			    expect(screen.queryByText('error')).not.toBeInTheDocument();
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'toggle' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'trigger' \}));
			
			    expect(await screen.findByText('error')).toBeVisible();
			  \});
			
			  it('should not start early subscription and throw warning at strict mode', async () => \{
			    type FormValues = \{ test: \{ data: string \}[] \};
			
			    function FieldArray() \{
			      const \{ reset, control \} = useForm<FormValues>(\{
			        defaultValues: \{ test: [] \},
			      \});
			      const \{ fields, append \} = useFieldArray(\{ control, name: 'test' \});
			      return (
			        <div>
			          \{fields.map((field, index) => (
			            <div key=\{field.id\}>
			              <Controller
			                control=\{control\}
			                name=\{\`test.\$\{index\}.data\` as const\}
			                render=\{(\{ field \}) => <input \{...field\} />\}
			              />
			            </div>
			          ))\}
			          <button
			            onClick=\{() =>
			              append(\{
			                data: 'data',
			              \})
			            \}
			          >
			            add
			          </button>
			          <button onClick=\{() => reset(\{\})\}>reset</button>
			        </div>
			      );
			    \}
			
			    const App = () => \{
			      return (
			        <React.StrictMode>
			          <FieldArray />
			        </React.StrictMode>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'add' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'reset' \}));
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'add' \}));
			
			    expect(await screen.findAllByRole('textbox')).toHaveLength(1);
			  \});
			
			  it('should subscribe to exact form state update', () => \{
			    const App = () => \{
			      const \{ control, register \} = useForm();
			      const [exact, setExact] = React.useState(true);
			      const \{ touchedFields \} = useFormState(\{
			        name: 'test',
			        control,
			        exact,
			      \});
			
			      return (
			        <div>
			          <input \{...register('testData')\} />
			          <p>\{touchedFields.testData && 'touched'\}</p>
			
			          <button
			            onClick=\{() => \{
			              setExact(false);
			            \}\}
			          >
			            toggle
			          </button>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.focus(screen.getByRole('textbox'));
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    expect(screen.queryByText('touched')).not.toBeInTheDocument();
			
			    fireEvent.click(screen.getByRole('button'));
			
			    fireEvent.focus(screen.getByRole('textbox'));
			
			    fireEvent.blur(screen.getByRole('textbox'));
			
			    expect(screen.getByText('touched')).toBeVisible();
			  \});
			
			  it('should be able to access defaultValues', () => \{
			    type FormValues = \{
			      firstName: string;
			      lastName: string;
			    \};
			
			    const defaultValues = \{
			      firstName: 'a',
			      lastName: 'b',
			    \};
			
			    const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			      const formState = useFormState(\{
			        control,
			      \});
			
			      return (
			        <p>
			          \{deepEqual(formState.defaultValues, defaultValues) ? 'yes' : 'no'\}
			        </p>
			      );
			    \};
			
			    const Component = () => \{
			      const \{ control \} = useForm<FormValues>(\{
			        defaultValues,
			      \});
			
			      return <Test control=\{control\} />;
			    \};
			
			    render(<Component />);
			
			    expect(screen.getByText('yes')).toBeVisible();
			  \});
			
			  it('should conditionally update formState after mount', async () => \{
			    function DirtyState() \{
			      const \{ isDirty, isValid \} = useFormState();
			      return (
			        <div>
			          <p>\{isDirty ? 'dirty' : 'pristine'\}</p>
			          <p>\{isValid ? 'valid' : 'error'\}</p>
			        </div>
			      );
			    \}
			
			    function App() \{
			      const [showDirty, toggleShowDirty] = React.useReducer(
			        (prev) => !prev,
			        false,
			      );
			      const formMethods = useForm(\{
			        defaultValues: \{
			          firstname: '',
			        \},
			      \});
			
			      return (
			        <FormProvider \{...formMethods\}>
			          \{showDirty && <DirtyState />\}
			          <input \{...formMethods.register('firstname', \{ required: true \})\} />
			          <button type="button" onClick=\{toggleShowDirty\} />
			        </FormProvider>
			      );
			    \}
			
			    render(<App />);
			
			    expect(screen.queryByRole('pristine')).not.toBeInTheDocument();
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: 'test',
			      \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(await screen.queryByText('dirty')).toBeNull();
			    expect(await screen.findByText('valid')).toBeVisible();
			  \});
			
			  it('should subscribe and update formState', async () => \{
			    function App() \{
			      const \{ register, control, handleSubmit \} = useForm(\{
			        defaultValues: \{
			          firstName: '',
			        \},
			      \});
			      const \{ errors \} = useFormState(\{ control \});
			
			      return (
			        <form onSubmit=\{handleSubmit(() => \{\})\}>
			          <input \{...register('firstName', \{ required: 'Required' \})\} />
			          <p>\{errors.firstName?.message\}</p>
			          <button>Submit</button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    waitFor(() => screen.getByText('Required'));
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'data' \},
			    \});
			
			    waitFor(() =>
			      expect(screen.queryByText('Required')).not.toBeInTheDocument(),
			    );
			  \});
			
			  it('should return the latest values with async values', async () => \{
			    type FormValues = \{
			      firstName: string;
			    \};
			
			    function Input(\{ control \}: \{ control: Control<FormValues> \}) \{
			      const \{ isValid \} = useFormState(\{ control \});
			
			      return <p>\{isValid\}</p>;
			    \}
			
			    function Form(\{ values \}: \{ values: any \}) \{
			      const \{ getValues, control \} = useForm<FormValues>(\{
			        defaultValues: \{
			          firstName: '',
			        \},
			        values,
			        resetOptions: \{
			          keepDefaultValues: true,
			        \},
			      \});
			
			      return (
			        <>
			          <p>\{getValues().firstName\}</p>
			          <Input control=\{control\} />
			        </>
			      );
			    \}
			
			    function App() \{
			      return <Form values=\{\{ firstName: 'test' \}\} />;
			    \}
			
			    render(<App />);
			
			    await waitFor(() => \{
			      screen.getByText('test');
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useFormState.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(16)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\useWatch.test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  fireEvent,
			  render,
			  screen,
			  waitFor,
			  within,
			\} from '@testing-library/react';
			import \{ renderHook \} from '@testing-library/react-hooks';
			
			import \{
			  Control,
			  UseFieldArrayReturn,
			  UseFormRegister,
			  UseFormReturn,
			\} from '../types';
			import \{ useController \} from '../useController';
			import \{ useFieldArray \} from '../useFieldArray';
			import \{ useForm \} from '../useForm';
			import \{ FormProvider, useFormContext \} from '../useFormContext';
			import \{ useWatch \} from '../useWatch';
			
			let i = 0;
			
			jest.mock('../logic/generateId', () => () => String(i++));
			
			describe('useWatch', () => \{
			  beforeEach(() => \{
			    i = 0;
			  \});
			
			  it('should return default value in useForm', () => \{
			    let method;
			    let watched;
			    const Component = () => \{
			      method = useForm<\{ test: string \}>(\{ defaultValues: \{ test: 'test' \} \});
			      watched = useWatch(\{ control: method.control \});
			      return <div />;
			    \};
			    render(<Component />);
			
			    expect(watched).toEqual(\{ test: 'test' \});
			  \});
			
			  it('should return default value in useWatch', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm<\{ test: string \}>(\{
			        defaultValues: \{
			          test: 'test',
			        \},
			      \});
			      return useWatch(\{
			        control,
			        name: 'test',
			      \});
			    \});
			
			    expect(result.current).toEqual('test');
			  \});
			
			  it('should return default value for single input', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm<\{ test: string; test1: string \}>(\{
			        defaultValues: \{
			          test: 'test',
			          test1: 'test1',
			        \},
			      \});
			      return useWatch(\{
			        control,
			        name: 'test',
			      \});
			    \});
			
			    expect(result.current).toEqual('test');
			  \});
			
			  it('should return default values for array of inputs', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm<\{ test: string; test1: string \}>(\{
			        defaultValues: \{
			          test: 'test',
			          test1: 'test1',
			        \},
			      \});
			      return useWatch(\{
			        control,
			        name: ['test', 'test1'],
			      \});
			    \});
			
			    expect(result.current).toEqual(['test', 'test1']);
			  \});
			
			  it('should return own default value for single input', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm<\{ test: string; test1: string \}>(\{\});
			      return useWatch(\{
			        control,
			        name: 'test',
			        defaultValue: 'test',
			      \});
			    \});
			
			    expect(result.current).toEqual('test');
			  \});
			
			  it('should return own default value for array of inputs', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm<\{ test: string; test1: string \}>(\{\});
			      return useWatch(\{
			        control,
			        name: ['test', 'test1'],
			        defaultValue: \{
			          test: 'test',
			          test1: 'test1',
			        \},
			      \});
			    \});
			
			    expect(result.current).toEqual(['test', 'test1']);
			  \});
			
			  it('should return default value when name is undefined', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm<\{ test: string; test1: string \}>(\{
			        defaultValues: \{
			          test: 'test',
			          test1: 'test1',
			        \},
			      \});
			      return useWatch(\{
			        control,
			      \});
			    \});
			
			    expect(result.current).toEqual(\{ test: 'test', test1: 'test1' \});
			  \});
			
			  it('should return empty array when watch array fields', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm<\{ test: string \}>();
			      return useWatch(\{
			        control,
			        name: ['test'],
			      \});
			    \});
			
			    expect(result.current).toEqual([undefined]);
			  \});
			
			  it('should return undefined', () => \{
			    const \{ result \} = renderHook(() => \{
			      const \{ control \} = useForm<\{ test: string \}>();
			      return useWatch(\{
			        control,
			        name: 'test',
			      \});
			    \});
			
			    expect(result.current).toBeUndefined();
			  \});
			
			  it('should render with FormProvider', () => \{
			    const Provider = (\{ children \}: \{ children: React.ReactNode \}) => \{
			      const methods = useForm<\{ test: string \}>();
			      return <FormProvider \{...methods\}>\{children\}</FormProvider>;
			    \};
			    const \{ result \} = renderHook(() => useWatch(\{ name: 'test' \}), \{
			      wrapper: Provider,
			    \});
			    expect(result.error).toBeUndefined();
			  \});
			
			  it('should remove input with shouldUnregister: true and deeply nested', async () => \{
			    type FormValue = \{
			      test: string;
			    \};
			
			    let submitData = \{\};
			
			    const Child = (\{
			      control,
			      register,
			    \}: \{
			      register: UseFormRegister<FormValue>;
			      control: Control<FormValue>;
			    \}) => \{
			      const show = useWatch(\{
			        control,
			        name: 'test',
			      \});
			
			      return <>\{show && show !== 'test' && <input \{...register('test')\} />\}</>;
			    \};
			
			    const Component = () => \{
			      const \{ register, control, handleSubmit \} = useForm<FormValue>(\{
			        defaultValues: \{
			          test: 'bill',
			        \},
			        shouldUnregister: true,
			      \});
			
			      return (
			        <form
			          onSubmit=\{handleSubmit((data) => \{
			            submitData = data;
			          \})\}
			        >
			          <Child control=\{control\} register=\{register\} />
			          <button>submit</button>
			        </form>
			      );
			    \};
			
			    render(<Component />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'test' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button', \{ name: 'submit' \}));
			
			    expect(submitData).toEqual(\{\});
			  \});
			
			  it('should return defaultValue with shouldUnregister set to true and keepDefaultValues', () => \{
			    const output: unknown[] = [];
			
			    function App() \{
			      const \{ register, reset, control \} = useForm(\{
			        defaultValues: \{ test: 'test' \},
			        shouldUnregister: true,
			      \});
			      const inputs = useWatch(\{ control \});
			
			      output.push(inputs);
			
			      return (
			        <form>
			          <input \{...register('test')\} />
			          <button
			            type="button"
			            onClick=\{() => reset(undefined, \{ keepDefaultValues: true \})\}
			          >
			            Reset
			          </button>
			        </form>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.click(screen.getByRole('button'));
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{ value: 'test' \},
			    \});
			
			    fireEvent.click(screen.getByRole('button'));
			
			    expect(output).toEqual([
			      \{ test: 'test' \},
			      \{ test: 'test' \},
			      \{ test: 'test' \},
			      \{ test: 'test' \},
			      \{ test: 'test' \},
			    ]);
			  \});
			
			  it('should subscribe to exact input change', () => \{
			    const App = () => \{
			      const \{ control, register \} = useForm();
			      const value = useWatch(\{
			        name: 'test',
			        control,
			        exact: true,
			        defaultValue: 'test',
			      \});
			
			      return (
			        <div>
			          <input \{...register('test.0.data')\} />
			          <p>\{value\}</p>
			        </div>
			      );
			    \};
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '1234',
			      \},
			    \});
			
			    expect(screen.getByText('test')).toBeVisible();
			  \});
			
			  it('should return root object subscription', () => \{
			    function App() \{
			      const \{ register, control \} = useForm(\{
			        defaultValues: \{ field: \{ firstName: 'value' \} \},
			      \});
			      const field = useWatch(\{ control, name: 'field' \});
			
			      return (
			        <div>
			          <form>
			            <input \{...register('field.firstName')\} placeholder="First Name" />
			            <p>\{field.firstName\}</p>
			          </form>
			        </div>
			      );
			    \}
			
			    render(<App />);
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '123',
			      \},
			    \});
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '234',
			      \},
			    \});
			
			    fireEvent.change(screen.getByRole('textbox'), \{
			      target: \{
			        value: '345',
			      \},
			    \});
			
			    expect(screen.getByText('345')).toBeVisible();
			  \});
			
			  describe('when disabled prop is used', () => \{
			    it('should be able to disabled subscription and started with true', async () => \{
			      type FormValues = \{
			        test: string;
			      \};
			
			      const ChildComponent = (\{
			        control,
			      \}: \{
			        control: Control<FormValues>;
			      \}) => \{
			        const [disabled, setDisabled] = React.useState(true);
			        const test = useWatch(\{
			          control,
			          name: 'test',
			          disabled,
			        \});
			
			        return (
			          <div>
			            <p>\{test\}</p>
			            <button
			              onClick=\{() => \{
			                setDisabled(!disabled);
			              \}\}
			              type=\{'button'\}
			            >
			              toggle
			            </button>
			          </div>
			        );
			      \};
			
			      const App = () => \{
			        const \{ register, control \} = useForm<FormValues>(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			        \});
			
			        return (
			          <div>
			            <input \{...register('test')\} />
			            <ChildComponent control=\{control\} />
			          </div>
			        );
			      \};
			
			      render(<App />);
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'what',
			        \},
			      \});
			
			      expect(screen.getByText('test')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'what12345',
			        \},
			      \});
			
			      expect(screen.getByText('what12345')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: '12345',
			        \},
			      \});
			
			      expect(screen.getByText('what12345')).toBeVisible();
			    \});
			
			    it('should be able to toggle the subscription and started with false', async () => \{
			      type FormValues = \{
			        test: string;
			      \};
			
			      const ChildComponent = (\{
			        control,
			      \}: \{
			        control: Control<FormValues>;
			      \}) => \{
			        const [disabled, setDisabled] = React.useState(false);
			        const test = useWatch(\{
			          control,
			          name: 'test',
			          disabled,
			        \});
			
			        return (
			          <div>
			            <p>\{test\}</p>
			            <button
			              onClick=\{() => \{
			                setDisabled(!disabled);
			              \}\}
			              type=\{'button'\}
			            >
			              toggle
			            </button>
			          </div>
			        );
			      \};
			
			      const WatchApp = () => \{
			        const \{ register, control \} = useForm<FormValues>(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			        \});
			
			        return (
			          <div>
			            <input \{...register('test')\} />
			            <ChildComponent control=\{control\} />
			          </div>
			        );
			      \};
			
			      render(<WatchApp />);
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'what',
			        \},
			      \});
			
			      expect(screen.getByText('what')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'what12345',
			        \},
			      \});
			
			      expect(screen.getByText('what')).toBeVisible();
			    \});
			  \});
			
			  describe('update', () => \{
			    it('should partial re-render', async () => \{
			      type FormInputs = \{
			        child: string;
			        parent: string;
			      \};
			
			      let childCount = 0;
			      const Child = (\{
			        register,
			        control,
			      \}: Pick<UseFormReturn<FormInputs>, 'register' | 'control'>) => \{
			        useWatch(\{ name: 'child', control \});
			        childCount++;
			        return <input \{...register('child')\} />;
			      \};
			
			      let parentCount = 0;
			      const Parent = () => \{
			        const \{
			          register,
			          handleSubmit,
			          control,
			          formState: \{ errors \},
			        \} = useForm<FormInputs>();
			        parentCount++;
			        return (
			          <form onSubmit=\{handleSubmit(() => \{\})\}>
			            <>
			              <input \{...register('parent')\} />
			              <Child register=\{register\} control=\{control\} />
			              \{errors.parent\}
			              <button>submit</button>
			            </>
			          </form>
			        );
			      \};
			
			      render(<Parent />);
			
			      const childInput = screen.getAllByRole('textbox')[1];
			
			      fireEvent.input(childInput, \{
			        target: \{ value: 'test' \},
			      \});
			
			      expect(parentCount).toBe(1);
			      expect(childCount).toBe(2);
			
			      parentCount = 0;
			      childCount = 0;
			
			      fireEvent.submit(screen.getByRole('button', \{ name: /submit/i \}));
			
			      await waitFor(() => expect(parentCount).toBe(1));
			      expect(childCount).toBe(1);
			
			      parentCount = 0;
			      childCount = 0;
			
			      fireEvent.input(childInput, \{ target: \{ value: 'test1' \} \});
			
			      expect(parentCount).toBe(0);
			      expect(childCount).toBe(1);
			    \});
			
			    it('should only subscribe change at useWatch level instead of useForm', () => \{
			      type FormValues = \{
			        test: string;
			        test1: string;
			        test2: string;
			      \};
			
			      let parentRenderCount = 0;
			      let childRenderCount = 0;
			
			      const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			        useWatch(\{
			          control,
			        \});
			
			        childRenderCount++;
			
			        return <div>test</div>;
			      \};
			
			      const Component = () => \{
			        const \{ control, register \} = useForm<FormValues>();
			
			        parentRenderCount++;
			
			        return (
			          <div>
			            <Test control=\{control\} />
			            <input \{...register('test')\} />
			            <input \{...register('test1')\} />
			            <input \{...register('test2')\} />
			          </div>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.change(screen.getAllByRole('textbox')[0], \{
			        target: \{
			          value: '1234',
			        \},
			      \});
			
			      fireEvent.change(screen.getAllByRole('textbox')[1], \{
			        target: \{
			          value: '1234',
			        \},
			      \});
			
			      fireEvent.change(screen.getAllByRole('textbox')[2], \{
			        target: \{
			          value: '1234',
			        \},
			      \});
			
			      expect(parentRenderCount).toEqual(1);
			      expect(childRenderCount).toEqual(4);
			    \});
			
			    it("should not re-render external component when field name don't match", async () => \{
			      type FormInputs = \{ test1: string; test2: string \};
			
			      const Child = (\{ control \}: \{ control: Control<FormInputs> \}) => \{
			        useWatch(\{ name: 'test2', control \});
			
			        return <div />;
			      \};
			
			      const Parent = () => \{
			        const \{ register, control \} = useForm<FormInputs>();
			        useWatch(\{ name: 'test1', control \});
			
			        return (
			          <form>
			            <input \{...register('test1')\} />
			            <input \{...register('test2')\} />
			            <Child control=\{control\} />
			          </form>
			        );
			      \};
			
			      render(<Parent />);
			
			      fireEvent.input(screen.getAllByRole('textbox')[1], \{
			        target: \{
			          name: 'test2',
			          value: 'value',
			        \},
			      \});
			    \});
			
			    it('should not throw error when null or undefined is set', () => \{
			      const watchedValue: Record<string, any> = \{\};
			      const Component = () => \{
			        const \{ register, control \} = useForm<\{
			          test: string;
			          test1: string;
			        \}>();
			
			        register('test');
			        register('test1');
			
			        watchedValue['test'] = useWatch(\{ name: 'test', control \});
			        watchedValue['test1'] = useWatch(\{ name: 'test1', control \});
			
			        return <div />;
			      \};
			
			      render(<Component />);
			
			      expect(watchedValue).toEqual(\{ test: undefined, test1: undefined \});
			    \});
			
			    it('should return undefined when input gets unregistered', async () => \{
			      const Component = () => \{
			        const \{ register, control, unregister \} = useForm<\{ test: number \}>();
			        const [show, setShow] = React.useState(true);
			        const data: any = useWatch(\{ name: 'test', control \});
			
			        return (
			          <>
			            \{show && <input \{...register('test')\} />\}
			            <span>\{data\}</span>
			            <button
			              type="button"
			              onClick=\{() => \{
			                unregister('test');
			                setShow(false);
			              \}\}
			            >
			              hide
			            </button>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.input(screen.getByRole('textbox'), \{
			        target: \{
			          value: 'test',
			        \},
			      \});
			
			      expect(screen.getByText('test')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(screen.queryByText('test')).not.toBeInTheDocument();
			    \});
			
			    it('should return undefined when input get unregistered', () => \{
			      type FormValues = \{
			        test: string;
			      \};
			
			      const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			        const value = useWatch(\{
			          control,
			          name: 'test',
			        \});
			
			        return <div>\{value === undefined ? 'yes' : 'no'\}</div>;
			      \};
			
			      const Component = () => \{
			        const \{ register, control, unregister \} = useForm<FormValues>(\{
			          defaultValues: \{
			            test: 'test',
			          \},
			        \});
			
			        React.useEffect(() => \{
			          register('test');
			        \}, [register]);
			
			        return (
			          <>
			            <Test control=\{control\} />
			            <button onClick=\{() => unregister('test')\}>unregister</button>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(screen.getByText('yes')).toBeVisible();
			    \});
			  \});
			
			  describe('fieldArray', () => \{
			    it('should watch correct input update with single field array input', () => \{
			      const inputValues: string[] = [];
			
			      type FormValues = \{
			        labels: \{
			          displayName: string;
			          internalName: string;
			        \}[];
			      \};
			
			      function Item(\{
			        control,
			        register,
			        itemIndex,
			        remove,
			      \}: \{
			        control: Control<FormValues>;
			        register: UseFormReturn<FormValues>['register'];
			        remove: UseFieldArrayReturn['remove'];
			        itemIndex: number;
			      \}) \{
			        const actualValue = useWatch(\{
			          control,
			          name: \`labels.\$\{itemIndex\}.displayName\` as const,
			        \});
			        inputValues.push(actualValue);
			
			        return (
			          <div>
			            <input
			              \{...register(\`labels.\$\{itemIndex\}.displayName\` as const)\}
			              defaultValue=\{actualValue\}
			            />
			            <button type="button" onClick=\{() => remove(itemIndex)\}>
			              Remove
			            </button>
			          </div>
			        );
			      \}
			
			      const Component = () => \{
			        const \{ control, register \} = useForm<FormValues>(\{
			          defaultValues: \{
			            labels: [
			              \{
			                displayName: 'Type',
			                internalName: 'type',
			              \},
			              \{
			                displayName: 'Number',
			                internalName: 'number',
			              \},
			              \{
			                displayName: 'Totals',
			                internalName: 'totals',
			              \},
			            ],
			          \},
			        \});
			
			        const \{ fields, remove \} = useFieldArray(\{
			          control,
			          name: 'labels',
			        \});
			
			        return (
			          <form>
			            \{fields.map((item, itemIndex) => (
			              <Item
			                key=\{item.id\}
			                control=\{control\}
			                register=\{register\}
			                itemIndex=\{itemIndex\}
			                remove=\{remove\}
			              />
			            ))\}
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getAllByRole('button')[1]);
			
			      expect(inputValues).toEqual([
			        'Type',
			        'Number',
			        'Totals',
			        'Type',
			        'Totals',
			        'Type',
			        'Totals',
			      ]);
			    \});
			
			    it('should return shallow merged watch values', () => \{
			      const watchedValue: unknown[] = [];
			
			      function App() \{
			        const methods = useForm(\{
			          defaultValues: \{
			            name: 'foo',
			            arr: [],
			          \},
			          mode: 'onSubmit',
			          reValidateMode: 'onChange',
			          criteriaMode: 'all',
			          shouldUnregister: false,
			        \});
			
			        return (
			          <FormProvider \{...methods\}>
			            <input \{...methods.register('name')\} placeholder="First Name" />
			            <Preview />
			            <FieldArray />
			            <input type="submit" />
			          </FormProvider>
			        );
			      \}
			
			      function Preview() \{
			        const form = useWatch(\{\});
			        watchedValue.push(form);
			
			        return null;
			      \}
			
			      function FieldArray() \{
			        useFieldArray(\{
			          name: 'arr',
			          shouldUnregister: false,
			        \});
			
			        return null;
			      \}
			
			      render(<App />);
			
			      expect(watchedValue).toEqual([
			        \{
			          arr: [],
			          name: 'foo',
			        \},
			        \{
			          arr: [],
			          name: 'foo',
			        \},
			      ]);
			    \});
			  \});
			
			  describe('fieldArray with shouldUnregister true', () => \{
			    it('should watch correct input update with single field array input', async () => \{
			      const watchData: unknown[] = [];
			
			      type Unpacked<T> = T extends (infer U)[] ? U : T;
			
			      type FormValues = \{
			        items: \{ prop: string \}[];
			      \};
			
			      function App() \{
			        const rhfProps = useForm<FormValues>(\{
			          defaultValues: \{
			            items: [\{ prop: 'test' \}, \{ prop: 'test1' \}],
			          \},
			          shouldUnregister: true,
			        \});
			        const \{ control \} = rhfProps;
			
			        const \{ fields, insert, remove \} = useFieldArray(\{
			          control,
			          name: 'items',
			        \});
			
			        return (
			          <form>
			            \{fields.map((item, index) => \{
			              return (
			                <div key=\{item.id\}>
			                  <Child control=\{control\} index=\{index\} itemDefault=\{item\} />
			                  <button
			                    type="button"
			                    onClick=\{() => \{
			                      insert(index + 1, \{ prop: 'ShouldBeTHere' \});
			                    \}\}
			                  >
			                    insert
			                  </button>
			                  <button
			                    type="button"
			                    onClick=\{() => \{
			                      remove(index);
			                    \}\}
			                  >
			                    remove
			                  </button>
			                </div>
			              );
			            \})\}
			            <Watcher itemsDefault=\{fields\} control=\{control\} />
			            <input type="submit" />
			          </form>
			        );
			      \}
			
			      function Watcher(\{
			        itemsDefault,
			        control,
			      \}: \{
			        itemsDefault: FormValues['items'];
			        control: Control<FormValues>;
			      \}) \{
			        const useWatchedItems = useWatch(\{
			          name: 'items',
			          control,
			          defaultValue: itemsDefault,
			        \});
			
			        watchData.push(useWatchedItems);
			
			        return (
			          <div>
			            \{useWatchedItems.map((item, index) => \{
			              return (
			                <p key=\{index\}>
			                  Value \{index\}: \{item.prop\}
			                </p>
			              );
			            \})\}
			          </div>
			        );
			      \}
			
			      function Child(\{
			        index,
			        itemDefault,
			        control,
			      \}: \{
			        index: number;
			        itemDefault: Unpacked<FormValues['items']>;
			        control: Control<FormValues>;
			      \}) \{
			        const \{ field \} = useController(\{
			          name: \`items.\$\{index\}.prop\` as const,
			          control,
			          defaultValue: itemDefault.prop,
			        \});
			
			        return <input \{...field\} />;
			      \}
			
			      render(<App />);
			
			      expect(screen.getByText('Value 0: test')).toBeVisible();
			      expect(screen.getByText('Value 1: test1')).toBeVisible();
			      expect(
			        screen.queryByText('Value 1: ShouldBeTHere'),
			      ).not.toBeInTheDocument();
			
			      fireEvent.click(screen.getAllByRole('button', \{ name: 'insert' \})[0]);
			
			      expect(await screen.findByText('Value 1: ShouldBeTHere')).toBeVisible();
			      expect(screen.getByText('Value 2: test1')).toBeVisible();
			
			      fireEvent.click(screen.getAllByRole('button', \{ name: 'remove' \})[0]);
			
			      expect(
			        screen.queryByText('Value 2: ShouldBeTHere'),
			      ).not.toBeInTheDocument();
			
			      expect(watchData).toMatchSnapshot();
			    \});
			  \});
			
			  describe('reset', () => \{
			    it('should return updated default value with watched field after reset', async () => \{
			      type FormValues = \{
			        test: string;
			        name: string;
			      \};
			
			      function Watcher(\{ control \}: \{ control: Control<FormValues> \}) \{
			        const testField = useWatch<FormValues>(\{
			          name: 'test',
			          control: control,
			        \});
			
			        return <div>\{testField\}</div>;
			      \}
			
			      function Component() \{
			        const \{ reset, control \} = useForm<FormValues>(\{
			          defaultValues: \{
			            test: '',
			            name: '',
			          \},
			        \});
			
			        React.useEffect(() => \{
			          reset(\{
			            test: 'test',
			          \});
			        \}, [reset]);
			
			        return <Watcher control=\{control\} />;
			      \}
			
			      render(<Component />);
			
			      expect(await screen.findByText('test')).toBeVisible();
			    \});
			
			    it('should return default value of reset method', async () => \{
			      const Component = () => \{
			        const \{ register, reset, control \} = useForm<\{
			          test: string;
			        \}>();
			        const test = useWatch<\{
			          test: string;
			        \}>(\{ name: 'test', control \});
			
			        React.useEffect(() => \{
			          reset(\{ test: 'default' \});
			        \}, [reset]);
			
			        return (
			          <form>
			            <input \{...register('test')\} />
			            <span>\{test\}</span>
			          </form>
			        );
			      \};
			
			      render(<Component />);
			
			      expect(await screen.findByText('default')).toBeDefined();
			    \});
			
			    it('should re-register watched input after reset', async () => \{
			      type FormValues = \{
			        firstName: string;
			      \};
			
			      function LivePreview(\{ control \}: \{ control: Control<FormValues> \}) \{
			        const value = useWatch(\{
			          name: \`firstName\`,
			          defaultValue: 'yes',
			          control,
			        \});
			
			        return <p>\{value\}</p>;
			      \}
			
			      const Component = () => \{
			        const formMethods = useForm<FormValues>();
			        const \{ control, reset, register \} = formMethods;
			
			        React.useEffect(() => \{
			          reset(\{
			            firstName: 'firstName',
			          \});
			        \}, [reset]);
			
			        return (
			          <>
			            <input \{...register('firstName')\} />
			
			            <LivePreview control=\{control\} />
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      expect(screen.getByText('firstName')).toBeVisible();
			
			      fireEvent.change(screen.getByRole('textbox'), \{
			        target: \{ value: '123' \},
			      \});
			
			      expect(screen.getByText('123')).toBeVisible();
			    \});
			
			    it('should fallback to inline defaultValue with reset API', () => \{
			      const App = () => \{
			        const \{ control, reset \} = useForm();
			        const value = useWatch(\{
			          name: 'test',
			          defaultValue: 'yes',
			          control,
			        \});
			
			        React.useEffect(() => \{
			          reset(\{\});
			        \}, [reset]);
			
			        return <p>\{value ? 'yes' : 'no'\}</p>;
			      \};
			
			      render(<App />);
			
			      expect(screen.getByText('yes')).toBeVisible();
			    \});
			
			    describe('with useFieldArray', () => \{
			      // issue: https://github.com/react-hook-form/react-hook-form/issues/2229
			      it('should return current value with radio type', () => \{
			        type FormValues = \{
			          options: \{ option: string \}[];
			        \};
			        const watchedValue: object[] = [];
			
			        const Test = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			          const values = useWatch(\{ control \});
			          const options = values.options;
			          watchedValue.push(values);
			
			          return (
			            <div>
			              <p>First: \{options?.[0].option\}</p>
			              <p>Second: \{options?.[1].option\}</p>
			            </div>
			          );
			        \};
			
			        const Component = () => \{
			          const \{ register, reset, control \} = useForm<FormValues>();
			          const \{ fields \} = useFieldArray(\{ name: 'options', control \});
			
			          React.useEffect(() => \{
			            reset(\{
			              options: [
			                \{
			                  option: 'yes',
			                \},
			                \{
			                  option: 'yes',
			                \},
			              ],
			            \});
			          \}, [reset]);
			
			          return (
			            <form>
			              \{fields.map((_, i) => (
			                <div key=\{i.toString()\} data-testid=\{\`field-\$\{i\}\`\}>
			                  <label>
			                    Yes
			                    <input
			                      type="radio"
			                      value="yes"
			                      \{...register(\`options.\$\{i\}.option\` as const)\}
			                    />
			                  </label>
			                  <label>
			                    No
			                    <input
			                      type="radio"
			                      value="no"
			                      \{...register(\`options.\$\{i\}.option\` as const)\}
			                    />
			                  </label>
			                </div>
			              ))\}
			              <Test control=\{control\} />
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        const firstField = screen.getByTestId('field-0');
			        expect(within(firstField).getByLabelText('Yes')).toBeChecked();
			        expect(screen.getByText('First: yes')).toBeVisible();
			
			        const secondField = screen.getByTestId('field-1');
			        expect(within(secondField).getByLabelText('Yes')).toBeChecked();
			        expect(screen.getByText('Second: yes')).toBeVisible();
			
			        fireEvent.click(within(firstField).getByLabelText('No'));
			
			        expect(screen.getByText('First: no')).toBeVisible();
			        expect(screen.getByText('Second: yes')).toBeVisible();
			
			        // Let's check all values of renders with implicitly the number of render (for each value)
			        expect(watchedValue).toMatchSnapshot();
			      \});
			
			      it("should watch item correctly with useFieldArray's remove method", async () => \{
			        let watchedValue: \{ [x: string]: any \} | undefined;
			        const Component = () => \{
			          const \{ register, control \} = useForm<\{
			            test: \{
			              firstName: string;
			              lsatName: string;
			            \}[];
			          \}>(\{
			            defaultValues: \{
			              test: [\{ firstName: 'test' \}, \{ firstName: 'test1' \}],
			            \},
			          \});
			          const \{ fields, remove \} = useFieldArray(\{
			            name: 'test',
			            control,
			          \});
			          watchedValue = useWatch(\{
			            name: 'test',
			            control,
			          \});
			
			          return (
			            <form>
			              \{fields.map((item, i) => (
			                <div key=\{item.firstName\}>
			                  <input
			                    type="input"
			                    defaultValue=\{item.firstName\}
			                    \{...register(\`test.\$\{i\}.firstName\` as const)\}
			                  />
			
			                  <button type="button" onClick=\{() => remove(i)\}>
			                    remove
			                  </button>
			                </div>
			              ))\}
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        expect(watchedValue).toEqual([
			          \{ firstName: 'test' \},
			          \{ firstName: 'test1' \},
			        ]);
			
			        fireEvent.click(screen.getAllByRole('button')[0]);
			
			        expect(watchedValue).toEqual([\{ firstName: 'test1' \}]);
			      \});
			    \});
			
			    describe('with custom register', () => \{
			      it('should return default value of reset method when value is not empty', async () => \{
			        const Component = () => \{
			          const \{ register, reset, control \} = useForm<\{
			            test: string;
			          \}>();
			          const test = useWatch<\{
			            test: string;
			          \}>(\{
			            name: 'test',
			            control,
			          \});
			
			          React.useEffect(() => \{
			            register('test');
			          \}, [register]);
			
			          React.useEffect(() => \{
			            reset(\{ test: 'default1' \});
			          \}, [reset]);
			
			          return (
			            <form>
			              <input \{...register('test')\} />
			              <span data-testid="result">\{test\}</span>
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        expect((await screen.findByTestId('result')).textContent).toBe(
			          'default1',
			        );
			      \});
			
			      it('should return default value of reset method', async () => \{
			        const Component = () => \{
			          const \{ register, reset, control \} = useForm<\{
			            test: string;
			          \}>();
			          const test = useWatch<\{
			            test: string;
			          \}>(\{ name: 'test', control \});
			
			          React.useEffect(() => \{
			            register('test');
			          \}, [register]);
			
			          React.useEffect(() => \{
			            reset(\{ test: 'default' \});
			          \}, [reset]);
			
			          return (
			            <form>
			              <span>\{test\}</span>
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        expect(await screen.findByText('default')).toBeDefined();
			      \});
			
			      it('should return default value', async () => \{
			        const Component = () => \{
			          const \{ register, reset, control \} = useForm<\{ test: string \}>(\{
			            defaultValues: \{
			              test: 'test',
			            \},
			          \});
			          const test = useWatch<\{ test: string \}>(\{
			            name: 'test',
			            control,
			          \});
			
			          React.useEffect(() => \{
			            register('test');
			          \}, [register]);
			
			          React.useEffect(() => \{
			            reset();
			          \}, [reset]);
			
			          return (
			            <form>
			              <span>\{test\}</span>
			            </form>
			          );
			        \};
			
			        render(<Component />);
			
			        expect(await screen.findByText('test')).toBeDefined();
			      \});
			    \});
			  \});
			
			  describe('unregister', () => \{
			    it('should return correct value after input get unregistered', async () => \{
			      type FormValues = \{ test: string \};
			
			      const Component = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			        const test = useWatch<\{ test: string \}>(\{ name: 'test', control \});
			        return <div>\{test === undefined ? 'no' : test\}</div>;
			      \};
			
			      const Form = () => \{
			        const \{ control, unregister, register \} = useForm<FormValues>(\{
			          defaultValues: \{ test: 'test' \},
			        \});
			
			        return (
			          <>
			            <Component control=\{control\} />
			            <input \{...register('test')\} />
			            <button onClick=\{() => unregister('test')\}>unregister</button>
			          </>
			        );
			      \};
			
			      render(<Form />);
			
			      expect(screen.getByText('test')).toBeVisible();
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(screen.getByText('no')).toBeVisible();
			    \});
			  \});
			
			  describe('setValue', () => \{
			    it('should return correct value after input get unregistered', async () => \{
			      type FormValues = \{ test: string \};
			
			      const Child = (\{ register \}: UseFormReturn<FormValues>) => \{
			        return <input \{...register('test')\} />;
			      \};
			
			      const Component = (\{ control \}: \{ control: Control<FormValues> \}) => \{
			        const test = useWatch<\{ test: string \}>(\{ name: 'test', control \});
			        return <div>\{test === 'bill' ? 'no' : test\}</div>;
			      \};
			
			      const Form = () => \{
			        const methods = useForm<FormValues>(\{
			          defaultValues: \{ test: 'test' \},
			        \});
			
			        React.useEffect(() => \{
			          methods.setValue('test', 'bill');
			        \}, [methods]);
			
			        return (
			          <>
			            <Component control=\{methods.control\} />
			            <Child \{...methods\} />
			          </>
			        );
			      \};
			
			      render(<Form />);
			
			      expect(await screen.findByText('no')).toBeVisible();
			    \});
			
			    it('should keep set type after set value', async () => \{
			      const Form = () => \{
			        const \{ control, setValue \} = useForm(\{
			          defaultValues: \{ test: new Set(['test']) \},
			        \});
			        const \{ field \} = useController(\{
			          control,
			          name: 'test',
			        \});
			
			        React.useEffect(() => \{
			          setValue('test', new Set(['test']));
			        \}, [setValue]);
			
			        return <>\{field.value instanceof Set ? 'yes' : 'no'\}</>;
			      \};
			
			      render(<Form />);
			
			      await waitFor(() => \{
			        screen.getByText('yes');
			      \});
			    \});
			
			    it('should watch nested object field update', () => \{
			      interface FormData \{
			        one: \{
			          two: \{
			            dep: number;
			          \};
			        \};
			      \}
			
			      const Component1 = () => \{
			        const watchedDep = useWatch(\{ name: 'one.two.dep' \});
			        return <p>\{watchedDep\}</p>;
			      \};
			
			      const Component2 = () => \{
			        const \{ register, setValue \} = useFormContext<FormData>();
			        const field = register('one.two.dep');
			
			        return (
			          <>
			            <input \{...field\} />
			            <button
			              onClick=\{() => \{
			                setValue('one.two', \{ dep: 333 \});
			              \}\}
			            >
			              set deep
			            </button>
			          </>
			        );
			      \};
			
			      const Component: React.FC = () => \{
			        const form = useForm<FormData>(\{
			          defaultValues: \{
			            one: \{
			              two: \{
			                dep: 111,
			              \},
			            \},
			          \},
			        \});
			
			        return (
			          <>
			            <FormProvider \{...form\}>
			              <Component1 />
			              <Component2 />
			            </FormProvider>
			          </>
			        );
			      \};
			
			      render(<Component />);
			
			      fireEvent.click(screen.getByRole('button'));
			
			      expect(screen.getByText('333')).toBeVisible();
			
			      expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual(
			        '333',
			      );
			    \});
			  \});
			
			  describe('formContext', () => \{
			    it('should work with form context', async () => \{
			      const Component = () => \{
			        const test = useWatch<\{ test: string \}>(\{ name: 'test' \});
			        return <div>\{test\}</div>;
			      \};
			
			      const Form = () => \{
			        const methods = useForm<\{ test: string \}>(\{
			          defaultValues: \{ test: 'test' \},
			        \});
			
			        return (
			          <FormProvider \{...methods\}>
			            <Component />
			          </FormProvider>
			        );
			      \};
			
			      render(<Form />);
			
			      expect(await screen.findByText('test')).toBeDefined();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\useWatch.test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(39)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\cloneObject.test.ts', () => {
        const sourceCode = `
			import cloneObject from '../../utils/cloneObject';
			
			describe('clone', () => \{
			  it('should clone object and not mutate the original object', () => \{
			    const fileData = new File([''], 'filename');
			    const data = \{
			      items: [],
			      test: \{
			        date: new Date('2020-10-15'),
			        test0: 12,
			        test1: '12',
			        test2: [1, 2, 3, 4],
			        deep: \{
			          date: new Date('2020-10-15'),
			          test0: 12,
			          test1: '12',
			          test2: [
			            1,
			            2,
			            3,
			            4,
			            \{
			              file: fileData,
			            \},
			          ],
			          file: fileData,
			        \},
			      \},
			      file: fileData,
			      test2: new Set([1, 2]),
			      test1: new Map([
			        [1, 'one'],
			        [2, 'two'],
			        [3, 'three'],
			      ]),
			    \};
			
			    const copy = cloneObject(data);
			    expect(cloneObject(data)).toEqual(copy);
			
			    // @ts-expect-error
			    copy.test.what = '1243';
			    copy.test.date = new Date('2020-10-16');
			    // @ts-expect-error
			    copy.items[0] = 2;
			
			    expect(data).toEqual(\{
			      items: [],
			      test: \{
			        date: new Date('2020-10-15'),
			        test0: 12,
			        test1: '12',
			        test2: [1, 2, 3, 4],
			        deep: \{
			          date: new Date('2020-10-15'),
			          test0: 12,
			          test1: '12',
			          test2: [
			            1,
			            2,
			            3,
			            4,
			            \{
			              file: fileData,
			            \},
			          ],
			          file: fileData,
			        \},
			      \},
			      file: fileData,
			      test2: new Set([1, 2]),
			      test1: new Map([
			        [1, 'one'],
			        [2, 'two'],
			        [3, 'three'],
			      ]),
			    \});
			
			    // @ts-expect-error
			    data.items = [1, 2, 3];
			
			    expect(copy.items).toEqual([2]);
			  \});
			
			  it('should skip clone if a node is instance of function', () => \{
			    function testFunction() \{\}
			
			    const data = \{
			      test: \{
			        testFunction,
			        test: 'inner-string',
			        deep: \{
			          testFunction,
			          test: 'deep-string',
			        \},
			      \},
			      testFunction,
			      other: 'string',
			    \};
			
			    const copy = cloneObject(data);
			    data.test.deep.test = 'changed-deep-string';
			
			    expect(copy).toEqual(\{
			      test: \{
			        test: 'inner-string',
			        deep: \{
			          testFunction,
			          test: 'deep-string',
			        \},
			        testFunction,
			      \},
			      testFunction,
			      other: 'string',
			    \});
			  \});
			
			  describe('in presence of Array polyfills', () => \{
			    beforeAll(() => \{
			      // @ts-expect-error
			      Array.prototype.somePolyfill = () => 123;
			    \});
			
			    it('should skip polyfills while cloning', () => \{
			      const data = [1];
			      const copy = cloneObject(data);
			
			      expect(Object.hasOwn(copy, 'somePolyfill')).toBe(false);
			    \});
			
			    afterAll(() => \{
			      // @ts-expect-error
			      delete Array.prototype.somePolyfill;
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\cloneObject.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\compact.test.ts', () => {
        const sourceCode = `
			import filterOutFalsy from '../../utils/compact';
			
			describe('filterOutFalsy', () => \{
			  it('should return filtered array when array value is falsy ', () => \{
			    expect(filterOutFalsy([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
			    expect(filterOutFalsy([1, 2, false, 4])).toEqual([1, 2, 4]);
			    expect(filterOutFalsy([1, 2, '', 4])).toEqual([1, 2, 4]);
			    expect(filterOutFalsy([1, 2, undefined, 4])).toEqual([1, 2, 4]);
			    expect(filterOutFalsy([0, 1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\compact.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\createSubject.test.ts', () => {
        const sourceCode = `
			import createSubject from '../../utils/createSubject';
			
			describe('createSubject', () => \{
			  it('should subscribe to all the correct observer', () => \{
			    const subject = createSubject();
			    const next = jest.fn();
			
			    subject.subscribe(\{
			      next,
			    \});
			
			    subject.subscribe(\{
			      next,
			    \});
			
			    expect(subject.observers.length).toBe(2);
			
			    subject.next(2);
			
			    expect(next).toBeCalledTimes(2);
			    expect(next).toBeCalledWith(2);
			  \});
			
			  it('should unsubscribe observers', () => \{
			    const subject = createSubject();
			    const next1 = jest.fn();
			    const next2 = jest.fn();
			
			    const subscription = subject.subscribe(\{
			      next: next1,
			    \});
			
			    subject.subscribe(\{
			      next: next2,
			    \});
			
			    expect(subject.observers.length).toBe(2);
			
			    subscription.unsubscribe();
			
			    expect(subject.observers.length).toBe(1);
			
			    subject.next(2);
			
			    expect(next1).not.toBeCalled();
			    expect(next2).toBeCalledWith(2);
			  \});
			
			  it('should unsubscribe all observers', () => \{
			    const subject = createSubject();
			    const next = jest.fn();
			
			    subject.subscribe(\{
			      next,
			    \});
			
			    subject.subscribe(\{
			      next,
			    \});
			
			    expect(subject.observers.length).toBe(2);
			
			    subject.unsubscribe();
			
			    expect(subject.observers.length).toBe(0);
			
			    subject.next(2);
			    subject.next(2);
			
			    expect(next).not.toBeCalled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\createSubject.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\deepEqual.test.ts', () => {
        const sourceCode = `
			import deepEqual from '../../utils/deepEqual';
			
			describe('deepEqual', () => \{
			  it('should return false when two sets not match', () => \{
			    expect(
			      deepEqual([\{ test: '123' \}, \{ test: '455' \}, \{ test: '455' \}], []),
			    ).toBeFalsy();
			
			    expect(
			      deepEqual(
			        [\{ test: '123' \}, \{ test: '455' \}, \{ test: '455' \}],
			        [\{ test: '123' \}, \{ test: '455' \}, \{ test: '455', test1: 'what' \}],
			      ),
			    ).toBeFalsy();
			
			    expect(deepEqual([\{\}], [])).toBeFalsy();
			
			    expect(deepEqual([], [\{\}])).toBeFalsy();
			    expect(deepEqual(new Date(), new Date('1999'))).toBeFalsy();
			
			    expect(
			      deepEqual(
			        \{
			          unknown: undefined,
			          userName: '',
			          fruit: '',
			        \},
			        \{
			          userName: '',
			          fruit: '',
			          break: \{\},
			        \},
			      ),
			    ).toBeFalsy();
			  \});
			
			  it('should return false when either type is primitive', () => \{
			    expect(deepEqual(null, [])).toBeFalsy();
			    expect(deepEqual([], null)).toBeFalsy();
			    expect(deepEqual(\{\}, undefined)).toBeFalsy();
			    expect(deepEqual(undefined, \{\})).toBeFalsy();
			  \});
			
			  it('should return true when two sets matches', () => \{
			    expect(
			      deepEqual([\{ name: 'useFieldArray' \}], [\{ name: 'useFieldArray' \}]),
			    ).toBeTruthy();
			
			    expect(
			      deepEqual(
			        [\{ test: '123' \}, \{ test: '455' \}, \{ test: '455' \}],
			        [\{ test: '123' \}, \{ test: '455' \}, \{ test: '455' \}],
			      ),
			    ).toBeTruthy();
			
			    expect(deepEqual(\{\}, \{\})).toBeTruthy();
			
			    expect(deepEqual([], [])).toBeTruthy();
			
			    expect(
			      deepEqual(
			        [\{ test: '123' \}, \{ test: '455' \}],
			        [\{ test: '123' \}, \{ test: '455' \}],
			      ),
			    ).toBeTruthy();
			
			    expect(
			      deepEqual(
			        [
			          \{
			            test: '123',
			            nestedArray: [\{ test: '123' \}, \{ test: '455' \}, \{ test: '455' \}],
			          \},
			          \{
			            test: '455',
			            nestedArray: [\{ test: '123' \}, \{ test: '455' \}, \{ test: '455' \}],
			          \},
			        ],
			        [
			          \{
			            test: '123',
			            nestedArray: [\{ test: '123' \}, \{ test: '455' \}, \{ test: '455' \}],
			          \},
			          \{
			            test: '455',
			            nestedArray: [\{ test: '123' \}, \{ test: '455' \}, \{ test: '455' \}],
			          \},
			        ],
			      ),
			    ).toBeTruthy();
			  \});
			
			  it('should compare date time object valueOf', () => \{
			    expect(
			      deepEqual(\{ test: new Date('1990') \}, \{ test: new Date('1990') \}),
			    ).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\deepEqual.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\deepMerge.test.ts', () => {
        const sourceCode = `
			import \{ deepMerge \} from '../../utils/deepMerge';
			
			describe('deepMerge', () => \{
			  it('should deep merge object correctly', () => \{
			    expect(
			      deepMerge(
			        \{ test: \{ value: 1, data: \{ test: 1 \} \} \},
			        \{ test: \{ value2: 2 \} \},
			      ),
			    ).toEqual(\{
			      test: \{ value: 1, value2: 2, data: \{ test: 1 \} \},
			    \});
			
			    expect(deepMerge(\{ test: \{ value: 1 \} \}, \{\})).toEqual(\{
			      test: \{ value: 1 \},
			    \});
			
			    expect(deepMerge(\{\}, \{ test: [\{ value: '1' \}] \})).toEqual(\{
			      test: [\{ value: '1' \}],
			    \});
			
			    expect(deepMerge(\{ data: \{\} \}, \{ test: [\{ value: '1' \}] \})).toEqual(\{
			      data: \{\},
			      test: [\{ value: '1' \}],
			    \});
			  \});
			
			  it('should overwrite array value ', () => \{
			    expect(
			      deepMerge(\{ test: [\{ value: '2' \}] \}, \{ test: [\{ value: '1' \}] \}),
			    ).toEqual(\{
			      test: [\{ value: '1' \}],
			    \});
			  \});
			
			  it('should overwrite different data type', () => \{
			    expect(deepMerge(\{ test: [\{ value: '2' \}] \}, \{ test: \{\} \})).toEqual(\{
			      test: \{\},
			    \});
			  \});
			
			  it('should not merge object with date type', () => \{
			    expect(
			      deepMerge(\{ test: new Date() \}, \{ test: new Date('1999-02-02') \}),
			    ).toEqual(\{
			      test: new Date('1999-02-02'),
			    \});
			  \});
			
			  it('should deep merge array values  ', () => \{
			    expect(deepMerge([\{ hey: 'test' \}], [\{ id: 'id', text: '' \}])).toEqual([
			      \{ hey: 'test', id: 'id', text: '' \},
			    ]);
			
			    expect(deepMerge([\{ id: 'id', text: '' \}], [\{ hey: 'test' \}])).toEqual([
			      \{ hey: 'test', id: 'id', text: '' \},
			    ]);
			
			    expect(
			      deepMerge(
			        \{
			          test: [\{ id: 'id', text: '' \}],
			        \},
			        \{
			          test: [\{ hey: 'test' \}],
			        \},
			      ),
			    ).toEqual(\{
			      test: [\{ hey: 'test', id: 'id', text: '' \}],
			    \});
			  \});
			
			  it("should never merge non-objects, and always return the 'source' object", () => \{
			    expect(deepMerge(\{\}, 0)).toEqual(0);
			    expect(deepMerge(0, \{\})).toEqual(\{\});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\deepMerge.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\fillBooleanArray.test.ts', () => {
        const sourceCode = `
			import fillBooleanArray from '../../utils/fillBooleanArray';
			
			describe('filterBooleanArray', () => \{
			  it('should be filtered array', () => \{
			    expect(
			      fillBooleanArray([
			        \{ test: 'test', test1: 'test1' \},
			        'test2',
			        \{ test3: 'test3', test4: 'test4' \},
			      ]),
			    ).toEqual([
			      \{
			        test: true,
			        test1: true,
			      \},
			      true,
			      \{ test3: true, test4: true \},
			    ]);
			  \});
			
			  it('should be filtered object', () => \{
			    expect(fillBooleanArray(\{ test: 'test', test1: 'test1' \})).toEqual([
			      \{
			        test: true,
			        test1: true,
			      \},
			    ]);
			  \});
			
			  it('should be filtered string', () => \{
			    expect(fillBooleanArray('test')).toEqual([true]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\fillBooleanArray.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\fillEmptyArray.test.ts', () => {
        const sourceCode = `
			import fillEmptyArray from '../../utils/fillEmptyArray';
			
			describe('fillEmptyArray', () => \{
			  it('should return an array of undefined or empty array when value is an array', () => \{
			    expect(fillEmptyArray([1])).toEqual([undefined]);
			    expect(fillEmptyArray([])).toEqual([]);
			    expect(fillEmptyArray(['2', true])).toEqual([undefined, undefined]);
			    expect(fillEmptyArray([\{\}, \{\}])).toEqual([undefined, undefined]);
			    expect(fillEmptyArray([[], [3]])).toEqual([undefined, undefined]);
			  \});
			
			  it('should return undefined when value is not an array', () => \{
			    expect(fillEmptyArray(1)).toEqual(undefined);
			    expect(fillEmptyArray(\{\})).toEqual(undefined);
			    expect(fillEmptyArray('')).toEqual(undefined);
			    expect(fillEmptyArray(true)).toEqual(undefined);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\fillEmptyArray.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\get.test.ts', () => {
        const sourceCode = `
			import get from '../../utils/get';
			
			describe('get', () => \{
			  it('should get the right data', () => \{
			    const test = \{
			      bill: [1, 2, 3],
			      luo: [1, 3, \{ betty: 'test' \}],
			      betty: \{ test: \{ test1: [\{ test2: 'bill' \}] \} \},
			      'betty.test.test1[0].test1': 'test',
			      'dotted.filled': 'content',
			      'dotted.empty': '',
			    \};
			    expect(get(test, 'bill')).toEqual([1, 2, 3]);
			    expect(get(test, 'bill[0]')).toEqual(1);
			    expect(get(test, 'luo[2].betty')).toEqual('test');
			    expect(get(test, 'betty.test.test1[0].test2')).toEqual('bill');
			    expect(get(test, 'betty.test.test1[0].test1')).toEqual('test');
			    expect(get(test, 'betty.test.test1[0].test3')).toEqual(undefined);
			    expect(get(test, 'dotted.filled')).toEqual(test['dotted.filled']);
			    expect(get(test, 'dotted.empty')).toEqual(test['dotted.empty']);
			    expect(get(test, 'dotted.nonexistent', 'default')).toEqual('default');
			  \});
			
			  it('should get from the flat data', () => \{
			    const test = \{
			      bill: 'test',
			    \};
			    expect(get(test, 'bill')).toEqual('test');
			  \});
			
			  it('should return undefined when provided with empty path', () => \{
			    const test = \{
			      bill: 'test',
			    \};
			    expect(get(test, '')).toEqual(undefined);
			    expect(get(test, undefined)).toEqual(undefined);
			    // @ts-expect-error
			    expect(get(test, null)).toEqual(undefined);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\get.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\insert.test.ts', () => {
        const sourceCode = `
			import insert from '../../utils/insert';
			
			describe('insert', () => \{
			  it('should insert value at specific index in array', () => \{
			    expect(insert([1, 3, 4], 1, 2)).toEqual([1, 2, 3, 4]);
			    expect(
			      insert(
			        [
			          \{
			            firstName: '1',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '2',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '4',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			        ],
			        2,
			        \{
			          firstName: '3',
			          lastName: 'Luo',
			          id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			        \},
			      ),
			    ).toEqual([
			      \{
			        firstName: '1',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '2',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '3',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '4',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			    ]);
			  \});
			
			  it('should insert undefined as value when value to be inserted is falsy', () => \{
			    expect(insert([1, 2, 4], 2)).toEqual([1, 2, undefined, 4]);
			    expect(insert([1, 2, 4], 2, 0)).toEqual([1, 2, 0, 4]);
			    // @ts-expect-error
			    expect(insert([1, 2, 4], 2, false)).toEqual([1, 2, false, 4]);
			    // @ts-expect-error
			    expect(insert([1, 2, 4], 2, '')).toEqual([1, 2, '', 4]);
			    expect(insert([1, 2, 4], 2, undefined)).toEqual([1, 2, undefined, 4]);
			  \});
			
			  it('should spread value when it is an array at one deep-level', () => \{
			    expect(insert([1, 2], 2, [3, 4])).toEqual([1, 2, 3, 4]);
			    expect(insert([1, 2], 2, [3, [4]])).toEqual([1, 2, 3, [4]]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\insert.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isBoolean.test.ts', () => {
        const sourceCode = `
			import isBoolean from '../../utils/isBoolean';
			
			describe('isBoolean', () => \{
			  it('should return true when value is a boolean', () => \{
			    expect(isBoolean(true)).toBeTruthy();
			    expect(isBoolean(false)).toBeTruthy();
			  \});
			
			  it('should return false when value is not a boolean', () => \{
			    expect(isBoolean(null)).toBeFalsy();
			    expect(isBoolean(undefined)).toBeFalsy();
			    expect(isBoolean(-1)).toBeFalsy();
			    expect(isBoolean(0)).toBeFalsy();
			    expect(isBoolean(1)).toBeFalsy();
			    expect(isBoolean('')).toBeFalsy();
			    expect(isBoolean(\{\})).toBeFalsy();
			    expect(isBoolean([])).toBeFalsy();
			    expect(isBoolean(() => null)).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isBoolean.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isCheckBoxInput.test.ts', () => {
        const sourceCode = `
			import isCheckBoxInput from '../../utils/isCheckBoxInput';
			
			describe('isCheckBoxInput', () => \{
			  it('should return true when type is checkbox', () => \{
			    expect(isCheckBoxInput(\{ name: 'test', type: 'checkbox' \})).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isCheckBoxInput.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isEmptyObject.test.ts', () => {
        const sourceCode = `
			import isEmptyObject from '../../utils/isEmptyObject';
			
			describe('isEmptyObject', () => \{
			  it('should return true when value is an empty object', () => \{
			    expect(isEmptyObject(\{\})).toBeTruthy();
			  \});
			
			  it('should return false when value is not an empty object', () => \{
			    expect(isEmptyObject(null)).toBeFalsy();
			    expect(isEmptyObject(undefined)).toBeFalsy();
			    expect(isEmptyObject(-1)).toBeFalsy();
			    expect(isEmptyObject(0)).toBeFalsy();
			    expect(isEmptyObject(1)).toBeFalsy();
			    expect(isEmptyObject('')).toBeFalsy();
			    expect(isEmptyObject(() => null)).toBeFalsy();
			    expect(isEmptyObject(\{ foo: 'bar' \})).toBeFalsy();
			    expect(isEmptyObject([])).toBeFalsy();
			    expect(isEmptyObject(['foo', 'bar'])).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isEmptyObject.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isFileInput.test.ts', () => {
        const sourceCode = `
			import isFileInput from '../../utils/isFileInput';
			
			describe('isFileInput', () => \{
			  it('should return true when type is file', () => \{
			    expect(isFileInput(\{ name: 'test', type: 'file' \})).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isFileInput.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isFunction.test.ts', () => {
        const sourceCode = `
			import isFunction from '../../utils/isFunction';
			
			describe('isFunction', () => \{
			  it('should return true when value is a function', () => \{
			    expect(isFunction(() => null)).toBeTruthy();
			    expect(
			      isFunction(function foo() \{
			        return null;
			      \}),
			    ).toBeTruthy();
			  \});
			
			  it('should return false when value is not a function', () => \{
			    expect(isFunction(null)).toBeFalsy();
			    expect(isFunction(undefined)).toBeFalsy();
			    expect(isFunction(-1)).toBeFalsy();
			    expect(isFunction(0)).toBeFalsy();
			    expect(isFunction(1)).toBeFalsy();
			    expect(isFunction('')).toBeFalsy();
			    expect(isFunction(\{\})).toBeFalsy();
			    expect(isFunction([])).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isFunction.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isHTMLElement.test.ts', () => {
        const sourceCode = `
			import isHTMLElement from '../../utils/isHTMLElement';
			
			describe('isHTMLElement', () => \{
			  it('should return true when value is HTMLElement', () => \{
			    expect(isHTMLElement(document.createElement('input'))).toBeTruthy();
			  \});
			
			  it('should return true when HTMLElement is inside an iframe', () => \{
			    const iframe = document.createElement('iframe');
			    document.body.append(iframe);
			
			    const iframeDocument = iframe.contentDocument!;
			    const input = iframeDocument.createElement('input');
			    iframeDocument.body.append(input);
			    expect(isHTMLElement(input)).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isHTMLElement.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isKey.test.ts', () => {
        const sourceCode = `
			import isKey from '../../utils/isKey';
			
			describe('isKey', () => \{
			  it('should return true when it is not a deep key', () => \{
			    expect(isKey('test')).toBeTruthy();
			    expect(isKey('fooBar')).toBeTruthy();
			  \});
			
			  it('should return false when it is a deep key', () => \{
			    expect(isKey('test.foo')).toBeFalsy();
			    expect(isKey('test.foo[0]')).toBeFalsy();
			    expect(isKey('test[1]')).toBeFalsy();
			    expect(isKey('test.foo[0].bar')).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isKey.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isMessage.test.ts', () => {
        const sourceCode = `
			import isMessage from '../../utils/isMessage';
			
			describe('isBoolean', () => \{
			  it('should return true when value is a Message', () => \{
			    expect(isMessage('test')).toBeTruthy();
			  \});
			
			  it('should return false when value is not a Message', () => \{
			    expect(isMessage(null)).toBeFalsy();
			    expect(isMessage(undefined)).toBeFalsy();
			    expect(isMessage(-1)).toBeFalsy();
			    expect(isMessage(1)).toBeFalsy();
			    expect(isMessage(\{\})).toBeFalsy();
			    expect(isMessage([])).toBeFalsy();
			    expect(isMessage(() => null)).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isMessage.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isMultipleSelect.test.ts', () => {
        const sourceCode = `
			import isMultipleSelect from '../../utils/isMultipleSelect';
			
			describe('isMultipleSelect', () => \{
			  it('should return true when type is select-multiple', () => \{
			    expect(
			      isMultipleSelect(\{ name: 'test', type: 'select-multiple' \}),
			    ).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isMultipleSelect.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isNullOrUndefined.test.ts', () => {
        const sourceCode = `
			import isNullOrUndefined from '../../utils/isNullOrUndefined';
			
			describe('isNullOrUndefined', () => \{
			  it('should return true when object is null or undefined', () => \{
			    expect(isNullOrUndefined(null)).toBeTruthy();
			    expect(isNullOrUndefined(undefined)).toBeTruthy();
			  \});
			
			  it('should return false when object is neither null nor undefined', () => \{
			    expect(isNullOrUndefined(-1)).toBeFalsy();
			    expect(isNullOrUndefined(0)).toBeFalsy();
			    expect(isNullOrUndefined(1)).toBeFalsy();
			    expect(isNullOrUndefined('')).toBeFalsy();
			    expect(isNullOrUndefined(\{\})).toBeFalsy();
			    expect(isNullOrUndefined([])).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isNullOrUndefined.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isObject.test.ts', () => {
        const sourceCode = `
			import isObject from '../../utils/isObject';
			
			describe('isObject', () => \{
			  it('should return true when value is an object', () => \{
			    expect(isObject(\{\})).toBeTruthy();
			    expect(isObject(\{ foo: 'bar' \})).toBeTruthy();
			    expect(isObject(new Blob())).toBeTruthy();
			  \});
			
			  it('should return false when value is not an object or is null', () => \{
			    expect(isObject(null)).toBeFalsy();
			    expect(isObject(undefined)).toBeFalsy();
			    expect(isObject(-1)).toBeFalsy();
			    expect(isObject(0)).toBeFalsy();
			    expect(isObject(1)).toBeFalsy();
			    expect(isObject('')).toBeFalsy();
			    expect(isObject([])).toBeFalsy();
			    expect(isObject(['foo', 'bar'])).toBeFalsy();
			    expect(isObject(() => null)).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isObject.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isPrimitive.test.ts', () => {
        const sourceCode = `
			import isPrimitive from '../../utils/isPrimitive';
			
			describe('isPrimitive', () => \{
			  it('should return true when value is a string', () => \{
			    expect(isPrimitive('foobar')).toBeTruthy();
			  \});
			
			  it('should return true when value is a boolean', () => \{
			    expect(isPrimitive(false)).toBeTruthy();
			  \});
			
			  it('should return true when value is a number', () => \{
			    expect(isPrimitive(123)).toBeTruthy();
			  \});
			
			  it('should return true when value is a symbol', () => \{
			    expect(isPrimitive(Symbol())).toBeTruthy();
			  \});
			
			  it('should return true when value is null', () => \{
			    expect(isPrimitive(null)).toBeTruthy();
			  \});
			
			  it('should return true when value is undefined', () => \{
			    expect(isPrimitive(undefined)).toBeTruthy();
			  \});
			
			  it('should return false when value is an object', () => \{
			    expect(isPrimitive(\{\})).toBeFalsy();
			  \});
			
			  it('should return false when value is an array', () => \{
			    expect(isPrimitive([])).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isPrimitive.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isRadioInput.test.ts', () => {
        const sourceCode = `
			import isRadioInput from '../../utils/isRadioInput';
			
			describe('isRadioInput', () => \{
			  it('should return true when type is radio', () => \{
			    expect(isRadioInput(\{ name: 'test', type: 'radio' \})).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isRadioInput.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isRadioOrCheckbox.test.ts', () => {
        const sourceCode = `
			import isRadioOrCheckbox from '../../utils/isRadioOrCheckbox';
			
			describe('isRadioOrCheckbox', () => \{
			  it('should return true when type is either radio or checkbox', () => \{
			    expect(isRadioOrCheckbox(\{ name: 'test', type: 'radio' \})).toBeTruthy();
			    expect(isRadioOrCheckbox(\{ name: 'test', type: 'checkbox' \})).toBeTruthy();
			  \});
			
			  it('shoudl return false when type is neither radio nor checkbox', () => \{
			    expect(isRadioOrCheckbox(\{ name: 'test', type: 'text' \})).toBeFalsy();
			    expect(isRadioOrCheckbox(\{ name: 'test', type: 'email' \})).toBeFalsy();
			    expect(isRadioOrCheckbox(\{ name: 'test', type: 'date' \})).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isRadioOrCheckbox.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isRegex.test.ts', () => {
        const sourceCode = `
			import isRegex from '../../utils/isRegex';
			
			describe('isRegex', () => \{
			  it('should return true when it is a regex', () => \{
			    expect(isRegex(new RegExp('[a-z]'))).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isRegex.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isSelectInput.test.ts', () => {
        const sourceCode = `
			import isRadioInput from '../../utils/isSelectInput';
			
			describe('isSelectInput', () => \{
			  it('should return true when type is select-one', () => \{
			    expect(isRadioInput(\{ name: 'test', type: 'select-one' \})).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isSelectInput.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isString.test.ts', () => {
        const sourceCode = `
			import isString from '../../utils/isString';
			
			describe('isString', () => \{
			  it('should return true when value is a string', () => \{
			    expect(isString('')).toBeTruthy();
			    expect(isString('foobar')).toBeTruthy();
			  \});
			
			  it('should return false when value is not a string', () => \{
			    expect(isString(null)).toBeFalsy();
			    expect(isString(undefined)).toBeFalsy();
			    expect(isString(-1)).toBeFalsy();
			    expect(isString(0)).toBeFalsy();
			    expect(isString(1)).toBeFalsy();
			    expect(isString(\{\})).toBeFalsy();
			    expect(isString([])).toBeFalsy();
			    expect(isString(new String('test'))).toBeFalsy();
			    expect(isString(() => null)).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isString.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\isUndefined.test.ts', () => {
        const sourceCode = `
			import isUndefined from '../../utils/isUndefined';
			
			describe('isUndefined', () => \{
			  it('should return true when it is an undefined value', () => \{
			    expect(isUndefined(undefined)).toBeTruthy();
			  \});
			
			  it('should return false when it is not an undefined value', () => \{
			    expect(isUndefined(null)).toBeFalsy();
			    expect(isUndefined('')).toBeFalsy();
			    expect(isUndefined('undefined')).toBeFalsy();
			    expect(isUndefined(0)).toBeFalsy();
			    expect(isUndefined([])).toBeFalsy();
			    expect(isUndefined(\{\})).toBeFalsy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\isUndefined.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\move.test.ts', () => {
        const sourceCode = `
			import move from '../../utils/move';
			
			describe('move', () => \{
			  it('should be able to move element of array', () => \{
			    const data = [
			      \{
			        firstName: '1',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '2',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '3',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			    ];
			    move(data, 0, 2);
			    expect(data).toEqual([
			      \{
			        firstName: '2',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '3',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '1',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			    ]);
			  \});
			
			  it('should return empty array when data passed was not an array', () => \{
			    // @ts-expect-error
			    expect(move(\{\}, 0, 3)).toEqual([]);
			  \});
			
			  it('should move nested item with empty slot', () => \{
			    expect(move([\{ subFields: [\{ test: '1' \}] \}], 0, 1)).toEqual([
			      undefined,
			      \{ subFields: [\{ test: '1' \}] \},
			    ]);
			
			    expect(move([\{ subFields: [\{ test: '1' \}] \}], 0, 2)).toEqual([
			      undefined,
			      undefined,
			      \{ subFields: [\{ test: '1' \}] \},
			    ]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\move.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\objectHasFunction.test.ts', () => {
        const sourceCode = `
			import objectHasFunction from '../../utils/objectHasFunction';
			
			describe('objectHasFunction', () => \{
			  it('should detect if any object has function', () => \{
			    expect(objectHasFunction(\{\})).toBeFalsy();
			    expect(
			      objectHasFunction(\{
			        test: '',
			      \}),
			    ).toBeFalsy();
			
			    expect(
			      objectHasFunction(\{
			        test: () => \{\},
			      \}),
			    ).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\objectHasFunction.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\prepend.test.ts', () => {
        const sourceCode = `
			import prepend from '../../utils/prepend';
			
			describe('prepend', () => \{
			  it('should prepend value to an array', () => \{
			    expect(prepend([2, 3, 4], 1)).toEqual([1, 2, 3, 4]);
			    expect(
			      prepend(
			        [
			          \{
			            firstName: '2',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '3',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '4',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			        ],
			        \{
			          firstName: '1',
			          lastName: 'Luo',
			          id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			        \},
			      ),
			    ).toEqual([
			      \{
			        firstName: '1',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '2',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '3',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '4',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			    ]);
			  \});
			
			  it('should prepend undefined as value when value to be prepended is falsy', () => \{
			    expect(prepend([2, 3, 4], 0)).toEqual([0, 2, 3, 4]);
			    // @ts-expect-error
			    expect(prepend([2, 3, 4], false)).toEqual([false, 2, 3, 4]);
			    // @ts-expect-error
			    expect(prepend([2, 3, 4], '')).toEqual(['', 2, 3, 4]);
			    expect(prepend([2, 3, 4], undefined)).toEqual([undefined, 2, 3, 4]);
			  \});
			
			  it('should spread value when it is an array at one deep-level', () => \{
			    expect(prepend([3, 4], [1, 2])).toEqual([1, 2, 3, 4]);
			    expect(prepend([3, 4], [[1], 2])).toEqual([[1], 2, 3, 4]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\prepend.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\remove.test.ts', () => {
        const sourceCode = `
			import remove from '../../utils/remove';
			
			describe('remove', () => \{
			  it('should remove item accordingly', () => \{
			    expect(
			      remove([, , \{ type: 'required', message: '', ref: 'test' \}], 1),
			    ).toEqual([undefined, \{ type: 'required', message: '', ref: 'test' \}]);
			
			    expect(
			      remove([, , \{ type: 'required', message: '', ref: 'test' \}], [1, 2]),
			    ).toEqual([]);
			
			    expect(
			      remove([, , \{ type: 'required', message: '', ref: 'test' \}], [0, 1]),
			    ).toEqual([\{ type: 'required', message: '', ref: 'test' \}]);
			
			    expect(
			      remove(
			        [
			          ,
			          ,
			          \{ type: 'required', message: '', ref: 'test' \},
			          \{ type: 'required', message: '', ref: 'test' \},
			          null,
			          ,
			        ],
			        [3, 2],
			      ),
			    ).toEqual([]);
			
			    expect(
			      remove(
			        [
			          ,
			          ,
			          \{ type: 'required', message: '', ref: 'test' \},
			          \{ type: 'required', message: '', ref: 'test' \},
			          null,
			          ,
			        ],
			        [1, 4],
			      ),
			    ).toEqual([
			      undefined,
			      \{ type: 'required', message: '', ref: 'test' \},
			      \{ type: 'required', message: '', ref: 'test' \},
			      undefined,
			    ]);
			
			    expect(remove([true, true, true], [1])).toEqual([true, true]);
			    expect(remove([true, true, true], [0])).toEqual([true, true]);
			
			    expect(
			      remove([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [6, 7, 8, 9, 10, 11]),
			    ).toEqual([0, 1, 2, 3, 4, 5]);
			    expect(
			      remove([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [11, 10, 9, 8, 7, 6]),
			    ).toEqual([0, 1, 2, 3, 4, 5]);
			  \});
			
			  it('should remove correctly with indexes which contains gap', () => \{
			    expect(
			      remove(
			        [
			          ,
			          ,
			          \{ type: 'required', message: '', ref: 'test' \},
			          \{ type: 'required', message: '', ref: 'test' \},
			          null,
			          \{ type: 'required', message: '', ref: 'test' \},
			          ,
			          \{ type: 'required', message: '', ref: 'test' \},
			        ],
			        [2, 5],
			      ),
			    ).toEqual([
			      ,
			      ,
			      \{ type: 'required', message: '', ref: 'test' \},
			      null,
			      ,
			      \{ type: 'required', message: '', ref: 'test' \},
			    ]);
			  \});
			
			  it('should remove all items', () => \{
			    expect(
			      remove(
			        [
			          \{
			            firstName: '1',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '2',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '3',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '4',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '5',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '6',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '7',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '8',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			          \{
			            firstName: '9',
			            lastName: 'Luo',
			            id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			          \},
			        ],
			        [0, 1, 2, 3, 4, 5, 6, 7, 8],
			      ),
			    ).toEqual([]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\remove.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\set.test.ts', () => {
        const sourceCode = `
			import set from '../../utils/set';
			
			describe('set', () => \{
			  it('should set the correct values', () => \{
			    const test1 = \{ a: [\{ b: \{ c: 3 \} \}] \};
			    expect(set(test1, 'a[0].b.c', 4)).toEqual(4);
			    expect(test1.a[0].b.c).toEqual(4);
			
			    const test2 = \{ foo: \{ bar: 'baz' \} \};
			    expect(set(test2, 'foo.arr[0]', 3)).toEqual(3);
			    expect(test2).toEqual(\{
			      foo: \{
			        bar: 'baz',
			        arr: [3],
			      \},
			    \});
			
			    const test3 = \{ foo: \{ bar: 'baz' \} \};
			    expect(set(test3, 'foo.arr["1"]', true)).toEqual(true);
			    expect(test3).toEqual(\{
			      foo: \{
			        bar: 'baz',
			        arr: [, true],
			      \},
			    \});
			
			    const test4 = \{ foo: \{ bar: 'baz' \} \};
			    expect(set(test4, 'foo.obj.key', 'test')).toEqual('test');
			    expect(test4).toEqual(\{
			      foo: \{
			        bar: 'baz',
			        obj: \{ key: 'test' \},
			      \},
			    \});
			
			    const test5 = \{ foo: 1 \};
			    expect(set(test5, 'foo.obj.key', 3)).toEqual(3);
			    expect(test5).toEqual(\{
			      foo: \{
			        obj: \{
			          key: 3,
			        \},
			      \},
			    \});
			
			    const test6 = \{\};
			    expect(set(test6, 'foo.arr[0].obj.key', 1)).toEqual(1);
			    expect(test6).toEqual(\{
			      foo: \{
			        arr: [
			          \{
			            obj: \{
			              key: 1,
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\set.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\stringToPath.test.ts', () => {
        const sourceCode = `
			import stringToPath from '../../utils/stringToPath';
			
			describe('stringToPath', () => \{
			  it('should convert string to path', () => \{
			    expect(stringToPath('test')).toEqual(['test']);
			
			    expect(stringToPath('[test]]')).toEqual(['test']);
			
			    expect(stringToPath('test.test[2].data')).toEqual([
			      'test',
			      'test',
			      '2',
			      'data',
			    ]);
			
			    expect(stringToPath('test.test["2"].data')).toEqual([
			      'test',
			      'test',
			      '2',
			      'data',
			    ]);
			
			    expect(stringToPath("test.test['test'].data")).toEqual([
			      'test',
			      'test',
			      'test',
			      'data',
			    ]);
			
			    expect(stringToPath('test.test.2.data')).toEqual([
			      'test',
			      'test',
			      '2',
			      'data',
			    ]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\stringToPath.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\swap.test.ts', () => {
        const sourceCode = `
			import swap from '../../utils/swap';
			
			describe('swap', () => \{
			  it('should swap value positions', () => \{
			    const test1 = [1, 2, 3, 4];
			    swap(test1, 1, 2);
			    expect(test1).toEqual([1, 3, 2, 4]);
			
			    const test2 = [
			      \{
			        firstName: '1',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '2',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '3',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			    ];
			    swap(test2, 0, 2);
			    expect(test2).toEqual([
			      \{
			        firstName: '3',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '2',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			      \{
			        firstName: '1',
			        lastName: 'Luo',
			        id: '75309979-e340-49eb-8016-5f67bfb56c1c',
			      \},
			    ]);
			  \});
			
			  it('should swap undefined position when index is not exists', () => \{
			    const test1 = [1, 2, 3, 4];
			    swap(test1, 0, 4);
			    expect(test1).toEqual([undefined, 2, 3, 4, 1]);
			
			    const test2 = [1, 2, 3, 4];
			    swap(test2, 2, 6);
			    expect(test2).toEqual([1, 2, undefined, 4, undefined, undefined, 3]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\swap.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\unset.test.ts', () => {
        const sourceCode = `
			import unset from '../../utils/unset';
			
			describe('unset', () => \{
			  it('should unset the array', () => \{
			    const test = ['test', 'test1', 'test2'];
			    expect(unset(test, '[0]')).toEqual([undefined, 'test1', 'test2']);
			    expect(unset(test, '[1]')).toEqual([undefined, undefined, 'test2']);
			    expect(unset(test, '[2]')).toEqual([undefined, undefined, undefined]);
			  \});
			
			  it('should return original object when path is not defined', () => \{
			    const test = \{
			      test: 'test',
			    \};
			
			    expect(unset(test, '')).toEqual(test);
			  \});
			
			  it('should unset the flat object', () => \{
			    const test = \{
			      test: 'test',
			    \};
			
			    expect(unset(test, 'test')).toEqual(\{\});
			  \});
			
			  it('should not unset if specified field is undefined', () => \{
			    const test = \{
			      test: \{
			        test1: 'test',
			      \},
			    \};
			
			    expect(unset(test, 'testDummy.test1')).toEqual(\{ test: \{ test1: 'test' \} \});
			  \});
			
			  it('should unset the nest object', () => \{
			    const test = \{
			      test: \{
			        min: 'test',
			      \},
			    \};
			
			    expect(unset(test, 'test.min')).toEqual(\{\});
			  \});
			
			  it('should unset deep object', () => \{
			    const test = \{
			      test: \{
			        bill: \{
			          min: 'test',
			        \},
			      \},
			    \};
			
			    expect(unset(test, 'test.bill.min')).toEqual(\{\});
			  \});
			
			  it('should unset the including multiple field object', () => \{
			    const deep = \{
			      data: \{
			        firstName: 'test',
			        clear: undefined,
			        test: [\{ data1: '' \}, \{ data2: '' \}],
			        data: \{
			          test: undefined,
			          test1: \{
			            ref: \{
			              test: '',
			            \},
			          \},
			        \},
			      \},
			    \};
			
			    const test = \{
			      test: \{
			        bill: \{
			          min: [\{ deep \}],
			        \},
			        test: 'ha',
			      \},
			    \};
			
			    expect(unset(test, 'test.bill.min[0].deep')).toEqual(\{
			      test: \{
			        test: 'ha',
			      \},
			    \});
			  \});
			
			  it('should unset the object in array', () => \{
			    const test = \{
			      test: [\{ min: 'required' \}],
			    \};
			    expect(unset(test, 'test[0].min')).toEqual(\{\});
			  \});
			
			  it('should return empty object when inner object is empty object', () => \{
			    const test = \{
			      data: \{
			        firstName: \{\},
			      \},
			    \};
			
			    expect(unset(test, 'data.firstName')).toEqual(\{\});
			  \});
			
			  it('should clear empty array', () => \{
			    const test = \{
			      data: \{
			        firstName: \{
			          test: [
			            \{ name: undefined, email: undefined \},
			            \{ name: 'test', email: 'last' \},
			          ],
			          deep: \{
			            last: [
			              \{ name: undefined, email: undefined \},
			              \{ name: 'test', email: 'last' \},
			            ],
			          \},
			        \},
			      \},
			    \};
			
			    expect(unset(test, 'data.firstName.test[0]')).toEqual(\{
			      data: \{
			        firstName: \{
			          test: [undefined, \{ name: 'test', email: 'last' \}],
			          deep: \{
			            last: [
			              \{ name: undefined, email: undefined \},
			              \{ name: 'test', email: 'last' \},
			            ],
			          \},
			        \},
			      \},
			    \});
			
			    const test2 = \{
			      arrayItem: [
			        \{
			          test1: undefined,
			          test2: undefined,
			        \},
			      ],
			      data: 'test',
			    \};
			
			    expect(unset(test2, 'arrayItem[0].test1')).toEqual(\{
			      arrayItem: [
			        \{
			          test2: undefined,
			        \},
			      ],
			      data: 'test',
			    \});
			  \});
			
			  it('should only remove relevant data', () => \{
			    const data = \{
			      test: \{\},
			      testing: \{
			        key1: 1,
			        key2: [
			          \{
			            key4: 4,
			            key5: [],
			            key6: null,
			            key7: '',
			            key8: undefined,
			            key9: \{\},
			          \},
			        ],
			        key3: [],
			      \},
			    \};
			
			    expect(unset(data, 'test')).toEqual(\{
			      testing: \{
			        key1: 1,
			        key2: [
			          \{
			            key4: 4,
			            key5: [],
			            key6: null,
			            key7: '',
			            key8: undefined,
			            key9: \{\},
			          \},
			        ],
			        key3: [],
			      \},
			    \});
			  \});
			
			  it('should remove empty array item', () => \{
			    const data = \{
			      name: [
			        \{
			          message: 'test',
			        \},
			      ],
			    \};
			
			    expect(unset(data, 'name[0]')).toEqual(\{\});
			  \});
			
			  it('should not remove nested empty array item', () => \{
			    const data = \{
			      scenario: \{
			        steps: [
			          \{
			            content: \{
			              question: 'isRequired',
			            \},
			          \},
			        ],
			      \},
			    \};
			
			    expect(unset(data, 'scenario.steps[1].messages[0]')).toEqual(\{
			      scenario: \{
			        steps: [
			          \{
			            content: \{
			              question: 'isRequired',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			
			  it('should not remove parent if boolean value exists in array', () => \{
			    const data = \{
			      test: [true, undefined, true],
			    \};
			
			    expect(unset(data, 'test[2]')).toEqual(\{
			      test: [true, undefined, undefined],
			    \});
			  \});
			
			  it('should reset the array index', () => \{
			    const data = \{
			      test: [[\{ name: 'test' \}], [\{ name: 'test1' \}]],
			    \};
			    unset(data, 'test.0.0.name');
			
			    expect(data).toEqual(\{
			      test: [undefined, [\{ name: 'test1' \}]],
			    \});
			
			    const data1 = \{
			      test: [[\{ name: 'test' \}], [\{ name: 'test1' \}]],
			    \};
			    unset(data1, 'test.1.0.name');
			
			    expect(data1).toEqual(\{
			      test: [[\{ name: 'test' \}], undefined],
			    \});
			
			    const data2 = \{
			      test: [[[\{ name: 'test' \}]], [\{ name: 'test1' \}]],
			    \};
			    unset(data2, 'test.0.0.0.name');
			
			    expect(data2).toEqual(\{
			      test: [undefined, [\{ name: 'test1' \}]],
			    \});
			
			    const data3 = \{
			      test: [[[\{ name: 'test' \}]], [[\{ name: 'test1' \}]]],
			    \};
			    unset(data3, 'test.1.0.0.name');
			
			    expect(data3).toEqual(\{
			      test: [[[\{ name: 'test' \}]], undefined],
			    \});
			
			    const data4 = \{
			      test: \{
			        fields: ['1', '2'],
			      \},
			    \};
			    unset(data4, 'test.fields.1');
			
			    expect(data4).toEqual(\{
			      test: \{
			        fields: ['1', undefined],
			      \},
			    \});
			  \});
			
			  describe('when there are remaining props', () => \{
			    it('should not unset the array', () => \{
			      const test = \{
			        test: [\{ firstName: 'test' \}],
			      \};
			
			      // @ts-ignore
			      test.test.root = \{
			        test: 'message',
			      \};
			
			      unset(test, 'test.0.firstName');
			
			      // @ts-ignore
			      expect(test.test.root).toBeDefined();
			    \});
			  \});
			
			  describe('in presence of Array polyfills', () => \{
			    beforeAll(() => \{
			      // @ts-expect-error
			      Array.prototype.somePolyfill = () => 123;
			    \});
			
			    it('should delete empty arrays', () => \{
			      const data = \{
			        prop: [],
			      \};
			      unset(data, 'prop.0');
			
			      expect(data.prop).toBeUndefined();
			    \});
			
			    afterAll(() => \{
			      // @ts-expect-error
			      delete Array.prototype.somePolyfill;
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\unset.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('react-hook-form_react-hook-form\\src\\__tests__\\utils\\validationModeChecker.test.ts', () => {
        const sourceCode = `
			import \{ VALIDATION_MODE \} from '../../constants';
			import validationModeChecker from '../../logic/getValidationModes';
			
			describe('validationModeChecker', () => \{
			  it('should return correct mode', () => \{
			    expect(validationModeChecker(VALIDATION_MODE.onBlur)).toEqual(\{
			      isOnSubmit: false,
			      isOnBlur: true,
			      isOnChange: false,
			      isOnAll: false,
			      isOnTouch: false,
			    \});
			
			    expect(validationModeChecker(VALIDATION_MODE.onChange)).toEqual(\{
			      isOnSubmit: false,
			      isOnBlur: false,
			      isOnChange: true,
			      isOnAll: false,
			      isOnTouch: false,
			    \});
			
			    expect(validationModeChecker(VALIDATION_MODE.onSubmit)).toEqual(\{
			      isOnSubmit: true,
			      isOnBlur: false,
			      isOnChange: false,
			      isOnAll: false,
			      isOnTouch: false,
			    \});
			
			    expect(validationModeChecker(undefined)).toEqual(\{
			      isOnSubmit: true,
			      isOnBlur: false,
			      isOnChange: false,
			      isOnAll: false,
			      isOnTouch: false,
			    \});
			
			    expect(validationModeChecker(VALIDATION_MODE.all)).toEqual(\{
			      isOnSubmit: false,
			      isOnBlur: false,
			      isOnChange: false,
			      isOnAll: true,
			      isOnTouch: false,
			    \});
			
			    expect(validationModeChecker(VALIDATION_MODE.onTouched)).toEqual(\{
			      isOnSubmit: false,
			      isOnBlur: false,
			      isOnChange: false,
			      isOnAll: false,
			      isOnTouch: true,
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'react-hook-form_react-hook-form\\src\\__tests__\\utils\\validationModeChecker.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
});
