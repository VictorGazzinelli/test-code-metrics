const { extractFromSource } = require('../../src/extractor');

describe('grommet_grommet', () => {
    it('grommet_grommet\\e2e\\tests\\heading-test.js', () => {
        const sourceCode = `
			/* eslint-disable no-undef */
			import \{ screen \} from '@testing-library/testcafe';
			
			fixture('TextInput place holder').page(\`http://localhost:8080/\`);
			
			test('check heading', async (t) => \{
			  const heading = screen.getByRole('heading', \{ level: 1 \});
			  await t.expect(heading).exists;
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\e2e\\tests\\heading-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('grommet_grommet\\src\\js\\components\\Accordion\\__tests__\\Accordion-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ axe \} from 'jest-axe';
			import \{ render, screen \} from '@testing-library/react';
			import userEvent from '@testing-library/user-event';
			
			import \{ Accordion, AccordionPanel, Box, Grommet \} from '../..';
			
			const customTheme = \{
			  accordion: \{
			    heading: \{ level: '3' \},
			    hover: \{
			      background: 'background-contrast',
			    \},
			  \},
			\};
			
			describe('Accordion', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container, asFragment \} = render(
			      <Grommet>
			        <Accordion>
			          <AccordionPanel>Panel body 1</AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('no AccordionPanel', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Accordion />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('AccordionPanel', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Accordion>
			          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
			          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
			          \{false && (
			            <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
			          )\}
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('complex title', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Box background="dark-1">
			          <Accordion>
			            <AccordionPanel label=\{<div>Panel 1 complex</div>\}>
			              Panel body 1
			            </AccordionPanel>
			            \{undefined\}
			            <AccordionPanel label=\{<div>Panel 2 complex</div>\}>
			              Panel body 2
			            </AccordionPanel>
			          </Accordion>
			        </Box>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('complex header', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Accordion activeIndex=\{1\} animate=\{false\}>
			          <AccordionPanel header=\{<div>Panel 1 header</div>\}>
			            Panel body 1
			          </AccordionPanel>
			          \{undefined\}
			          <AccordionPanel header=\{<div>Panel 2 header</div>\}>
			            Panel body 2
			          </AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('change to second Panel', async () => \{
			    const user = userEvent.setup();
			    const onActive = jest.fn();
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Accordion onActive=\{onActive\}>
			          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
			          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 2/i \}));
			
			    expect(onActive).toBeCalled();
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('change to second Panel without onActive', async () => \{
			    const user = userEvent.setup();
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Accordion animate=\{false\}>
			          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
			          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 2/i \}));
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('multiple panels', async () => \{
			    const user = userEvent.setup();
			    const onActive = jest.fn();
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Accordion animate=\{false\} multiple onActive=\{onActive\}>
			          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
			          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 2/i \}));
			    expect(onActive).toBeCalledWith([1]);
			
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 1/i \}));
			    expect(onActive).toBeCalledWith([1, 0]);
			
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 2/i \}));
			    expect(onActive).toBeCalledWith([0]);
			
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 1/i \}));
			    expect(onActive).toBeCalledWith([]);
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('custom accordion', async () => \{
			    const user = userEvent.setup();
			
			    const \{ asFragment \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Accordion>
			          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.hover(screen.getByRole('tab', \{ name: 'Panel 1 FormDown' \}));
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('accordion border', () => \{
			    const \{ asFragment \} = render(
			      <Grommet
			        theme=\{\{
			          accordion: \{
			            border: undefined,
			            panel: \{
			              border: \{
			                side: 'horizontal',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Accordion>
			          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('change active index', async () => \{
			    const user = userEvent.setup();
			    const onActive = jest.fn();
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Accordion animate=\{false\} activeIndex=\{1\} onActive=\{onActive\}>
			          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
			          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 1/i \}));
			    expect(onActive).toBeCalledWith([0]);
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('focus and hover styles', async () => \{
			    const user = userEvent.setup();
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			    const \{ asFragment \} = render(
			      <Grommet theme=\{\{ accordion: \{ hover: \{ color: 'red' \} \} \}\}>
			        <Accordion>
			          <AccordionPanel
			            label="Panel 1"
			            onMouseOver=\{() => \{\}\}
			            onMouseOut=\{() => \{\}\}
			            onFocus=\{() => \{\}\}
			            onBlur=\{() => \{\}\}
			          >
			            Panel body 1
			          </AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 1/i \}));
			    expect(asFragment()).toMatchSnapshot();
			    expect(warnSpy).toHaveBeenCalled();
			    warnSpy.mockRestore();
			  \});
			
			  test('backward compatibility of hover.color = undefined', async () => \{
			    const user = userEvent.setup();
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			    const \{ asFragment \} = render(
			      <Grommet
			        theme=\{\{
			          accordion: \{
			            hover: \{ color: undefined \},
			          \},
			        \}\}
			      >
			        <Accordion>
			          <AccordionPanel
			            label="Panel 1"
			            onMouseOver=\{() => \{\}\}
			            onMouseOut=\{() => \{\}\}
			            onFocus=\{() => \{\}\}
			            onBlur=\{() => \{\}\}
			          >
			            Panel body 1
			          </AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			
			    await user.tab();
			    // hover color should be undefined
			    expect(asFragment()).toMatchSnapshot();
			    expect(warnSpy).toHaveBeenCalled();
			    warnSpy.mockRestore();
			  \});
			
			  test('theme hover of hover.heading.color', async () => \{
			    const user = userEvent.setup();
			    const \{ asFragment \} = render(
			      <Grommet
			        theme=\{\{
			          accordion: \{
			            hover: \{ heading: \{ color: 'teal' \} \},
			          \},
			        \}\}
			      >
			        <Accordion>
			          <AccordionPanel
			            label="Panel 1"
			            onMouseOver=\{() => \{\}\}
			            onMouseOut=\{() => \{\}\}
			            onFocus=\{() => \{\}\}
			            onBlur=\{() => \{\}\}
			          >
			            Panel body 1
			          </AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			
			    await user.tab();
			    // hover color should be undefined
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('set on hover', async () => \{
			    const user = userEvent.setup();
			    const onMouseOver1 = jest.fn();
			    const onMouseOut1 = jest.fn();
			    const onMouseOver2 = jest.fn();
			    const onMouseOut2 = jest.fn();
			    render(
			      <Grommet>
			        <Accordion>
			          <AccordionPanel
			            label="Panel 1"
			            onMouseOver=\{onMouseOver1\}
			            onMouseOut=\{onMouseOut1\}
			          >
			            Panel body 1
			          </AccordionPanel>
			          <AccordionPanel
			            label="Panel 2"
			            onMouseOver=\{onMouseOver2\}
			            onMouseOut=\{onMouseOut2\}
			          >
			            Panel body 2
			          </AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			
			    await user.hover(screen.getByRole('tab', \{ name: /Panel 1/i \}));
			    expect(onMouseOver1).toHaveBeenCalled();
			    await user.unhover(screen.getByRole('tab', \{ name: /Panel 1/i \}));
			    expect(onMouseOut1).toHaveBeenCalled();
			
			    await user.hover(screen.getByRole('tab', \{ name: /Panel 2/i \}));
			    expect(onMouseOver2).toHaveBeenCalled();
			    await user.unhover(screen.getByRole('tab', \{ name: /Panel 2/i \}));
			    expect(onMouseOver2).toHaveBeenCalled();
			  \});
			
			  test('wrapped panel', async () => \{
			    const user = userEvent.setup();
			    const onActive = jest.fn();
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Accordion animate=\{false\} onActive=\{onActive\}>
			          <AccordionPanel label="Panel 1">Panel body 1</AccordionPanel>
			          <AccordionPanel label="Panel 2">Panel body 2</AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    await user.click(screen.getByRole('tab', \{ name: /Panel 1/i \}));
			    expect(onActive).toBeCalledWith([0]);
			    expect(screen.getByText('Panel body 1')).not.toBeNull();
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('blur styles', async () => \{
			    const user = userEvent.setup();
			    const onBlur = jest.fn();
			    const \{ asFragment \} = render(
			      <Grommet theme=\{\{ accordion: \{ hover: \{ heading: \{ color: 'red' \} \} \} \}\}>
			        <Accordion>
			          <AccordionPanel
			            label="Panel 1"
			            onMouseOver=\{() => \{\}\}
			            onMouseOut=\{() => \{\}\}
			            onFocus=\{() => \{\}\}
			            onBlur=\{onBlur\}
			          >
			            Panel body 1
			          </AccordionPanel>
			        </Accordion>
			      </Grommet>,
			    );
			
			    // tab to the first accordion panel
			    await user.tab();
			    expect(asFragment()).toMatchSnapshot();
			    // tab away from the first accordion panel
			    await user.tab();
			    expect(onBlur).toHaveBeenCalled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Accordion\\__tests__\\Accordion-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('grommet_grommet\\src\\js\\components\\Anchor\\__tests__\\Anchor-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render \} from '@testing-library/react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ axe \} from 'jest-axe';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Anchor \} from '..';
			import \{ Box \} from '../../Box';
			
			describe('Anchor', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor>Link</Anchor>
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('renders with children', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor href="#">children</Anchor>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('warns about invalid label render', () => \{
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor href="#" label="Test">
			          invalid
			        </Anchor>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(warnSpy).toHaveBeenCalledWith(
			      'Anchor should not have children if icon or label is provided',
			    );
			
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			  \});
			
			  test('warns about invalid icon render', () => \{
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor href="#" icon=\{<svg />\}>
			          invalid
			        </Anchor>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(warnSpy).toHaveBeenCalledWith(
			      'Anchor should not have children if icon or label is provided',
			    );
			
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			  \});
			
			  test('shows no error for component used in as prop', () => \{
			    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor href="#" as=\{Box\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(errorSpy).not.toHaveBeenCalled();
			
			    errorSpy.mockReset();
			    errorSpy.mockRestore();
			  \});
			
			  test('focus renders', () => \{
			    const onFocus = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Anchor href="#" label="Test" onFocus=\{onFocus\} />
			      </Grommet>,
			    );
			    fireEvent.focus(getByText('Test'));
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onFocus).toHaveBeenCalledTimes(1);
			  \});
			
			  test('blur renders', () => \{
			    const onBlur = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Anchor href="#" label="Test" onBlur=\{onBlur\} />
			      </Grommet>,
			    );
			    fireEvent.blur(getByText('Test'));
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onBlur).toHaveBeenCalledTimes(1);
			  \});
			
			  test('disabled renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor disabled />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('icon label renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor icon=\{<svg />\} label="Test" onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('reverse icon label renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor reverse icon=\{<svg />\} label="Test" onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('size renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor size="xsmall" />
			        <Anchor size="small" />
			        <Anchor size="medium" />
			        <Anchor size="large" />
			        <Anchor size="xlarge" />
			        <Anchor size="xxlarge" />
			        <Anchor size="10px" />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('is clickable', () => \{
			    const onClick = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Anchor href="#" label="Test" onClick=\{onClick\} />
			      </Grommet>,
			    );
			    const anchor = getByText('Test');
			    fireEvent.click(anchor);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onClick).toBeCalled();
			  \});
			
			  test('renders tag', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor href="#" label="Test" as="span" />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('weight renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Anchor href="#" label="Normal" weight="normal" />
			        <Anchor href="#" label="Bold" weight="bold" />
			        <Anchor href="#" label="Bold" weight=\{500\} />
			        <Anchor href="#" label="Lighter" weight="lighter" />
			        <Anchor href="#" label="Bolder" weight="bolder" />
			        <Anchor href="#" label="Inherit" weight="inherit" />
			        <Anchor href="#" label="Initial" weight="initial" />
			        <Anchor href="#" label="Revert" weight="revert" />
			        <Anchor href="#" label="Unset" weight="unset" />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('gap renders', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{\{ anchor: \{ gap: 'xsmall' \} \}\}>
			        <Anchor icon=\{<svg />\} label="Theme Gap" href="#" />
			        <Anchor icon=\{<svg />\} label="Small Gap" href="#" gap="small" />
			        <Anchor icon=\{<svg />\} label="Medium Gap" href="#" gap="medium" />
			        <Anchor icon=\{<svg />\} label="Large Gap" href="#" gap="large" />
			        <Anchor icon=\{<svg />\} label="5px Gap" href="#" gap="5px" />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('renders a11yTitle and aria-label', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Anchor href="#" label="Test" a11yTitle="test" />
			        <Anchor href="#" label="Test" aria-label="test-2" />
			      </Grommet>,
			    );
			    expect(getByLabelText('test')).toBeTruthy();
			    expect(getByLabelText('test-2')).toBeTruthy();
			    expect(container).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Anchor\\__tests__\\Anchor-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('grommet_grommet\\src\\js\\components\\Avatar\\__tests__\\Avatar-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Favorite \} from 'grommet-icons';
			import \{ Box \} from '../../Box';
			import \{ Grommet \} from '../../Grommet';
			import \{ Stack \} from '../../Stack';
			import \{ Text \} from '../../Text';
			import \{ Avatar \} from '..';
			
			const src = '';
			
			describe('Avatar', () => \{
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Avatar />
			        <Avatar id="test id" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Avatar size="xsmall" src=\{src\} />
			        <Avatar size="small" src=\{src\} />
			        <Avatar src=\{src\} />
			        <Avatar size="large" src=\{src\} />
			        <Avatar size="xlarge" src=\{src\} />
			        <Avatar size="2xl" src=\{src\} />
			        <Avatar size="3xl" src=\{src\} />
			        <Avatar size="4xl" src=\{src\} />
			        <Avatar size="5xl" src=\{src\} />
			
			        <Avatar size="small">S</Avatar>
			        <Avatar size="medium">S</Avatar>
			        <Avatar size="large">S</Avatar>
			        <Avatar size="xlarge">S</Avatar>
			        <Avatar size="2xl">S</Avatar>
			        <Avatar size="3xl">S</Avatar>
			        <Avatar size="4xl">S</Avatar>
			        <Avatar size="5xl">S</Avatar>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('round renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Avatar src=\{src\} round=\{false\} />
			        <Avatar src=\{src\} round="xsmall" />
			        <Avatar src=\{src\} round="small" />
			        <Avatar src=\{src\} round="medium" />
			        <Avatar src=\{src\} round="large" />
			        <Avatar src=\{src\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('text renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Avatar background="dark-2">
			          <Text alignSelf="center" size="xlarge">
			            R
			          </Text>
			        </Avatar>
			        <Avatar background="brand">
			          <Text alignSelf="center" size="xlarge">
			            SY
			          </Text>
			        </Avatar>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('icon renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Avatar background="accent-4">
			          <Favorite color="accent-2" />
			        </Avatar>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('stack renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Stack anchor="bottom-right">
			          <Box>
			            <Box direction="row">
			              <Avatar size="xsmall" src=\{src\} />
			              <Box pad="xxsmall" />
			            </Box>
			            <Box pad="xxsmall" />
			          </Box>
			          <Avatar src=\{src\} size="42px" />
			        </Stack>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('text size changes according to theme', () => \{
			    const theme = \{
			      avatar: \{
			        text: \{
			          size: \{
			            small: '30px',
			            large: 'small',
			            '50px': '10px',
			          \},
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{theme\}>
			        <Box>
			          <Avatar>T1</Avatar>
			          <Avatar size="small">T2</Avatar>
			          <Avatar size="large">T3</Avatar>
			          <Avatar size="50px">T4</Avatar>
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Avatar\\__tests__\\Avatar-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(7)
    });
    it('grommet_grommet\\src\\js\\components\\Box\\__tests__\\Box-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Box, BoxProps \} from '..';
			
			describe('Box', () => \{
			  test('default', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('direction', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box direction="row" />
			        <Box direction="row-responsive" />
			        <Box direction="column" />
			        <Box direction="column-reverse" />
			        <Box direction="row-reverse" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('responsive', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box responsive />
			        <Box responsive=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('wrap', () => \{
			    const wrapProps: BoxProps['wrap'][] = [true, false, 'reverse'];
			    const \{ container \} = render(
			      <Grommet>
			        \{wrapProps.map((wrap) => (
			          <Box key=\{\`\$\{wrap\}\`\} wrap=\{wrap\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('justify', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box justify="start" />
			        <Box justify="center" />
			        <Box justify="between" />
			        <Box justify="around" />
			        <Box justify="evenly" />
			        <Box justify="end" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('align', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{/* Mapped values */\}
			        <Box align="start" />
			        <Box align="center" />
			        <Box align="baseline" />
			        <Box align="stretch" />
			        <Box align="end" />
			        \{/* Any valid CSS align-items strings */\}
			        <Box align="normal" />
			        <Box align="first baseline" />
			        <Box align="last baseline" />
			        <Box align="safe center" />
			        <Box align="unsafe center" />
			        <Box align="inherit" />
			        <Box align="initial" />
			        <Box align="unset" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('alignContent', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{/* Mapped values */\}
			        <Box alignContent="start" />
			        <Box alignContent="center" />
			        <Box alignContent="between" />
			        <Box alignContent="around" />
			        <Box alignContent="stretch" />
			        <Box alignContent="end" />
			        <Box alignContent="baseline" />
			        <Box alignContent="evenly" />
			        \{/* Any valid CSS align-content strings */\}
			        <Box alignContent="normal" />
			        <Box alignContent="first baseline" />
			        <Box alignContent="last baseline" />
			        <Box alignContent="space-between" />
			        <Box alignContent="space-around" />
			        <Box alignContent="space-evenly" />
			        <Box alignContent="safe center" />
			        <Box alignContent="unsafe center" />
			        <Box alignContent="inherit" />
			        <Box alignContent="initial" />
			        <Box alignContent="unset" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('alignSelf', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box alignSelf="start" />
			        <Box alignSelf="center" />
			        <Box alignSelf="stretch" />
			        <Box alignSelf="end" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  /* eslint-disable max-len */
			  test('background', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box background="brand" />
			        <Box background="accent-1" />
			        <Box background="neutral-1" />
			        <Box background="light-1" />
			        <Box background="dark-1" />
			        <Box background="status-critical" />
			        <Box background="#aabbcc" />
			        <Box background="#def" />
			        <Box background="rgb(90, 80, 50)" />
			        <Box background="rgba(200, 100, 150, 0.8)" />
			        <Box background="hsl(10, 50%, 20%)" />
			        <Box background="hsla(10, 50%, 70%, 0.7)" />
			        <Box background="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)" />
			        <Box
			          background=\{\{
			            image:
			              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
			            dark: false,
			          \}\}
			        />
			        <Box
			          background=\{\{
			            image:
			              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
			            dark: true,
			          \}\}
			        />
			        <Box
			          background=\{\{
			            image:
			              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
			            position: 'top center',
			          \}\}
			        />
			        <Box
			          background=\{\{
			            image:
			              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
			            opacity: 'strong',
			          \}\}
			        />
			        <Box
			          background=\{\{
			            image:
			              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
			            color: 'accent-1',
			          \}\}
			        />
			        <Box
			          background=\{\{
			            image:
			              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
			            size: 'contain',
			          \}\}
			        />
			        <Box
			          background=\{\{
			            image:
			              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
			            repeat: 'repeat',
			          \}\}
			        />
			        <Box
			          background=\{\{
			            image:
			              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
			            opacity: 0.5,
			          \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			  /* eslint-enable max-len */
			
			  test('basis', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box>
			          <Box basis="xsmall" />
			          <Box basis="small" />
			          <Box basis="medium" />
			          <Box basis="large" />
			          <Box basis="xlarge" />
			        </Box>
			        <Box direction="row">
			          <Box basis="full" />
			        </Box>
			        <Box direction="row">
			          <Box basis="1/2" />
			          <Box basis="2/4" />
			        </Box>
			        <Box direction="row">
			          <Box basis="1/3" />
			          <Box basis="2/3" />
			        </Box>
			        <Box direction="row">
			          <Box basis="1/4" />
			          <Box basis="3/4" />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('flex', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box>
			          <Box flex />
			          <Box flex=\{false\} />
			          <Box flex="grow" />
			          <Box flex="shrink" />
			          <Box flex=\{\{ grow: 2 \}\} />
			          <Box flex=\{\{ shrink: 2 \}\} />
			          <Box flex=\{\{ grow: 2, shrink: 2 \}\} />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box>
			          <Box fill />
			          <Box fill=\{false\} />
			          <Box fill="horizontal" />
			          <Box fill="vertical" />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('gap', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['xsmall', 'small', 'medium', 'large', '80px', 'none'].map((gap) => (
			          <Box key=\{gap\} gap=\{gap\} direction="row">
			            <Box />
			          </Box>
			        ))\}
			        <Box as="span" gap="small">
			          <span>first</span>
			          <span>second</span>
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('margin', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box margin="small" />
			        <Box margin="medium" />
			        <Box margin="large" />
			        <Box margin=\{\{ horizontal: 'small' \}\} />
			        <Box margin=\{\{ vertical: 'small' \}\} />
			        <Box margin=\{\{ bottom: 'small' \}\} />
			        <Box margin=\{\{ left: 'small' \}\} />
			        <Box margin=\{\{ right: 'small' \}\} />
			        <Box margin=\{\{ start: 'small' \}\} />
			        <Box margin=\{\{ end: 'small' \}\} />
			        <Box margin=\{\{ top: 'small' \}\} />
			        <Box margin=\{\{ top: 'small', left: 'medium', horizontal: 'large' \}\} />
			        <Box margin=\{\{ top: 'small', vertical: 'large' \}\} />
			        <Box
			          margin=\{\{
			            horizontal: 'large',
			            vertical: 'large',
			            left: 'small',
			          \}\}
			        />
			        <Box
			          margin=\{\{
			            top: 'small',
			            right: 'small',
			            left: 'small',
			            bottom: 'small',
			          \}\}
			        />
			        <Box
			          margin=\{\{
			            left: 'small',
			            right: 'medium',
			            bottom: 'large',
			            top: 'small',
			            horizontal: 'medium',
			            vertical: 'small',
			          \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box pad="small" />
			        <Box pad="medium" />
			        <Box pad="large" />
			        <Box pad=\{\{ horizontal: 'small' \}\} />
			        <Box pad=\{\{ vertical: 'small' \}\} />
			        <Box pad=\{\{ bottom: 'small' \}\} />
			        <Box pad=\{\{ left: 'small' \}\} />
			        <Box pad=\{\{ right: 'small' \}\} />
			        <Box pad=\{\{ start: 'small' \}\} />
			        <Box pad=\{\{ end: 'small' \}\} />
			        <Box pad=\{\{ top: 'small' \}\} />
			        <Box pad=\{\{ top: 'small', left: 'medium', horizontal: 'large' \}\} />
			        <Box pad=\{\{ horizontal: 'large', vertical: 'large' \}\} />
			        <Box
			          pad=\{\{
			            top: 'small',
			            right: 'medium',
			            horizontal: 'small',
			            vertical: 'large',
			          \}\}
			        />
			        <Box
			          pad=\{\{
			            top: 'medium',
			            right: 'medium',
			            left: 'medium',
			            bottom: 'medium',
			            horizontal: 'small',
			          \}\}
			        />
			        <Box
			          pad=\{\{
			            left: 'small',
			            right: 'medium',
			            bottom: 'large',
			            top: 'small',
			            horizontal: 'medium',
			            vertical: 'small',
			          \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('gridArea', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box gridArea="header" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('round', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box round />
			        <Box round="xsmall" />
			        <Box round="small" />
			        <Box round="medium" />
			        <Box round="large" />
			        <Box round="full" />
			        <Box round=\{\{ corner: 'left' \}\} />
			        <Box round=\{\{ corner: 'top' \}\} />
			        <Box round=\{\{ corner: 'right' \}\} />
			        <Box round=\{\{ corner: 'bottom' \}\} />
			        <Box round=\{\{ corner: 'top-left' \}\} />
			        <Box round=\{\{ corner: 'top-right' \}\} />
			        <Box round=\{\{ corner: 'bottom-left' \}\} />
			        <Box round=\{\{ corner: 'bottom-right' \}\} />
			        <Box round=\{\{ size: 'xsmall' \}\} />
			        <Box round=\{\{ size: 'small' \}\} />
			        <Box round=\{\{ size: 'medium' \}\} />
			        <Box round=\{\{ size: 'large' \}\} />
			        <Box round=\{\{ size: 'xlarge' \}\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box border="all" />
			        <Box border="horizontal" />
			        <Box border="vertical" />
			        <Box border="top" />
			        <Box border="left" />
			        <Box border="bottom" />
			        <Box border="right" />
			        <Box border=\{\{ color: 'accent-1' \}\} />
			        <Box border=\{\{ side: 'all' \}\} />
			        <Box border=\{\{ size: 'xsmall' \}\} />
			        <Box border=\{\{ size: 'small' \}\} />
			        <Box border=\{\{ size: 'medium' \}\} />
			        <Box border=\{\{ size: 'large' \}\} />
			        <Box border=\{\{ size: 'xlarge' \}\} />
			        <Box border=\{\{ style: 'dotted' \}\} />
			        <Box border=\{\{ style: 'double' \}\} />
			        <Box border=\{\{ style: 'dashed' \}\} />
			        <Box
			          border=\{[
			            \{ side: 'top', color: 'accent-1', size: 'medium', style: 'dotted' \},
			            \{ side: 'left', color: 'accent-2', size: 'large', style: 'dashed' \},
			          ]\}
			        />
			        <Box border="between" gap="small">
			          <Box>one</Box>
			          <Box>two</Box>
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('elevation', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box elevation="none" />
			        <Box elevation="xsmall" />
			        <Box elevation="small" />
			        <Box elevation="medium" />
			        <Box elevation="large" />
			        <Box elevation="xlarge" />
			        <Box background="dark-1" elevation="small">
			          <Box elevation="small" />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('as string', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box as="header" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('as function', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box as=\{(props) => <header className=\{props.className\} />\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('as component', () => \{
			    class Header extends React.Component<any> \{
			      render() \{
			        return <header className=\{this.props.className\} />;
			      \}
			    \}
			    const \{ container \} = render(
			      <Grommet>
			        <Box as=\{Header\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('tag proxied', () => \{
			    const \{ container: tagComponent \} = render(
			      <Grommet>
			        <Box tag="header" />
			      </Grommet>,
			    );
			    const \{ container: asComponent \} = render(
			      <Grommet>
			        <Box as="header" />
			      </Grommet>,
			    );
			
			    expect(tagComponent).toEqual(asComponent);
			  \});
			
			  test('animation', () => \{
			    const animationProps: BoxProps['animation'][] = [
			      'fadeIn',
			      'fadeOut',
			      'jiggle',
			      'pulse',
			      'rotateLeft',
			      'rotateRight',
			      'slideUp',
			      'slideDown',
			      'slideLeft',
			      'slideRight',
			      'zoomIn',
			      'zoomOut',
			    ];
			    const \{ container \} = render(
			      <Grommet>
			        \{animationProps.map((type) => (
			          <Box key=\{String(type)\} animation=\{type\} />
			        ))\}
			        <Box animation=\{['fadeIn', 'slideUp']\} />
			        <Box animation=\{\{ type: 'fadeIn', duration: 1000, delay: 500 \}\} />
			        <Box
			          animation=\{[
			            \{ type: 'fadeIn', duration: 1000, delay: 500 \},
			            \{ type: 'slideUp', duration: 1000, delay: 500 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('width', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box width="xsmall" />
			        <Box width="small" />
			        <Box width="medium" />
			        <Box width="large" />
			        <Box width="xlarge" />
			        <Box width="111px" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('width object', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box width=\{\{ width: '100px' \}\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('height', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box height="xsmall" />
			        <Box height="small" />
			        <Box height="medium" />
			        <Box height="large" />
			        <Box height="xlarge" />
			        <Box height="111px" />
			        <Box height=\{\{ min: 'small', max: '100%', height: 'large' \}\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onClick', () => \{
			    const onClick = jest.fn();
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Box onClick=\{onClick\}>test box</Box>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('test box'));
			
			    expect(onClick).toBeCalled();
			  \});
			
			  test('hoverIndicator', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box>
			          <Box onClick=\{() => \{\}\} hoverIndicator />
			          <Box onClick=\{() => \{\}\} hoverIndicator="background-contrast" />\\
			          <Box
			            onClick=\{() => \{\}\}
			            hoverIndicator=\{\{ color: 'background-contrast' \}\}
			          />
			          <Box
			            onClick=\{() => \{\}\}
			            hoverIndicator=\{\{
			              background: \{ color: 'background-contrast' \},
			              elevation: 'medium',
			            \}\}
			          />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders a11yTitle and aria-label', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Box a11yTitle="test" />
			        <Box aria-label="test-2" />
			      </Grommet>,
			    );
			    expect(getByLabelText('test')).toBeTruthy();
			    expect(getByLabelText('test-2')).toBeTruthy();
			    expect(container).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Box\\__tests__\\Box-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(30)
    });
    it('grommet_grommet\\src\\js\\components\\Button\\__tests__\\Button-kind-test.js', () => {
        const sourceCode = `
			import React from 'react';
			
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ axe \} from 'jest-axe';
			import \{ fireEvent, render \} from '@testing-library/react';
			import \{ Add \} from 'grommet-icons';
			
			import \{ Grommet, Button \} from '../..';
			import \{ buttonKindTheme \} from './theme/buttonKindTheme';
			
			describe('Button kind', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container, getByText \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{ default: \{\} \},
			        \}\}
			      >
			        <Button a11yTitle="Test button" label="Test" onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			
			    fireEvent.click(getByText('Test'));
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('default button', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{buttonKindTheme\}>
			        <Button />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('button with icon and align', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              color: undefined, // needed use case for the test coverage
			            \},
			          \},
			        \}\}
			      >
			        <Button icon=\{<Add />\} align="start" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('button icon colors', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              background: \{
			                color: '#666666',
			              \},
			              border: \{
			                color: '#666666',
			              \},
			              color: undefined, // needed use case for the test coverage
			            \},
			          \},
			        \}\}
			      >
			        <Button icon=\{<Add />\} color="#000" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`mouseOver and mouseOut events\`, async () => \{
			    const \{ container, getByText \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              background: '#000',
			            \},
			          \},
			        \}\}
			      >
			        <Button label="label" icon=\{<Add />\} />
			      </Grommet>,
			    );
			    fireEvent.mouseOver(getByText('label'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOut(getByText('label'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('primary button', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{buttonKindTheme\}>
			        <Button primary />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('secondary button', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{buttonKindTheme\}>
			        <Button secondary />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border on default button', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              border: \{
			                color: 'green',
			                width: '2px',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('no border on default button', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              border: false,
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('extend on default button', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              extend: \{
			                color: 'green',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{ default: \{\} \},
			        \}\}
			      >
			        <Button label="Test" fill />
			        <Button label="Test" fill="vertical" />
			        <Button label="Test" fill="horizontal" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('font on button default', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              font: \{
			                weight: 700,
			                height: '20px',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('font undefined', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              font: \{
			                weight: undefined,
			                height: undefined,
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('hover on default button', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              hover: \{
			                color: 'white',
			                background: 'green',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" plain hoverIndicator onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('opacity on default button', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              opacity: true,
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('padding on default button', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              padding: \{
			                horizontal: '12px',
			                vertical: '6px',
			              \},
			              background: \{
			                color: 'green',
			              \},
			              color: 'text',
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('render of children', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{buttonKindTheme\}>
			        <Button>Test</Button>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('no padding on default button', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              padding: '0px',
			              color: 'text',
			              border: \{
			                color: false,
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size of default button', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              size: \{
			                small: \{
			                  border: \{
			                    radius: '4px',
			                  \},
			                  pad: \{
			                    vertical: '4px',
			                    horizontal: '8px',
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Test" size="small" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`disabled state cursor should indicate the button cannot be 
			  clicked\`, () => \{
			    const \{ getByText \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{ default: \{\} \},
			        \}\}
			      >
			        <Button disabled label="Button" />
			      </Grommet>,
			    );
			
			    const button = getByText('Button');
			    // eslint-disable-next-line no-underscore-dangle
			    const cursorStyle = window.getComputedStyle(button)._values.cursor;
			    expect(cursorStyle).not.toBe('pointer');
			    expect(cursorStyle).toBe('default');
			  \});
			
			  test(\`disabled with hoverIndicator should not hover\`, () => \{
			    const \{ container, getByText \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{ default: \{\} \},
			        \}\}
			      >
			        <Button disabled hoverIndicator label="Button" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOver(getByText('Button'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should apply styling according to theme size definitions\`, () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{\},
			            size: \{
			              small: \{
			                border: \{
			                  radius: '4px',
			                \},
			                pad: \{
			                  vertical: '4px',
			                  horizontal: '8px',
			                \},
			              \},
			              medium: \{
			                border: \{
			                  radius: '4px',
			                \},
			                pad: \{
			                  vertical: '6px',
			                  horizontal: '12px',
			                \},
			              \},
			              large: \{
			                border: \{
			                  radius: '6px',
			                \},
			                pad: \{
			                  vertical: '6px',
			                  horizontal: '16px',
			                \},
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button label="Button" size="small" />
			        \{/* button with no size specified should have medium styling applied 
			        by default */\}
			        <Button label="Button" />
			        <Button label="Button" size="medium" />
			        <Button label="Button" size="large" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should be offset from top-right corner\`, () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              border: \{
			                color: 'border',
			                width: '2px',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button a11yTitle="Button, alert" label="Button" badge />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should display number content\`, () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              border: \{
			                color: 'border',
			                width: '2px',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button a11yTitle="Button, 2 unread alerts" label="Button" badge=\{2\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should display "+" when number is greater than max\`, () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              border: \{
			                color: 'border',
			                width: '2px',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button
			          a11yTitle="Button, 100 unread alerts"
			          label="Button"
			          badge=\{\{ value: 100, max: 9 \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should apply background\`, () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              border: \{
			                color: 'border',
			                width: '2px',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button
			          a11yTitle="Button, 100 unread alerts"
			          label="Button"
			          badge=\{\{
			            background: 'status-ok',
			            value: 100,
			          \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should render custom element\`, () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{
			              border: \{
			                color: 'border',
			                width: '2px',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button
			          a11yTitle="Button, Add user alert"
			          label="Button"
			          badge=\{<Add />\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should render relative to contents when button has no 
			  border or background\`, () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{ default: \{\} \},
			        \}\}
			      >
			        <Button a11yTitle="Button, Add user alert" icon=\{<Add />\} badge />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`hoverIndicator with color and background\`, () => \{
			    const \{ container, getByText \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{ default: \{\} \},
			        \}\}
			      >
			        <Button
			          hoverIndicator=\{\{
			            background: \{
			              color: 'pink',
			            \},
			            color: 'white',
			          \}\}
			          label="Button"
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOver(getByText('Button'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`hover secondary with color and background\`, () => \{
			    const \{ container, getByText \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{
			            default: \{\},
			            secondary: \{
			              color: 'white',
			              background: \{
			                color: 'skyblue',
			              \},
			            \},
			            hover: \{
			              secondary: \{
			                color: 'green',
			                background: \{
			                  color: 'orange',
			                \},
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Button secondary label="Button" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOver(getByText('Button'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`plain with icon\`, () => \{
			    const \{ asFragment \} = render(
			      <Grommet
			        theme=\{\{
			          button: \{ default: \{\} \},
			        \}\}
			      >
			        <Button plain icon=\{<Add />\} />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Button\\__tests__\\Button-kind-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(31)
    });
    it('grommet_grommet\\src\\js\\components\\Button\\__tests__\\Button-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import userEvent from '@testing-library/user-event';
			
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import '@testing-library/jest-dom';
			
			import \{ Add, Next \} from 'grommet-icons';
			import \{ Grommet, Button, Text \} from '../..';
			
			describe('Button', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button a11yTitle="Test button" label="Test" onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			
			    fireEvent.click(screen.getByText('Test'));
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('passes through the aria-label prop', async () => \{
			    const TEST_LABEL = 'Test Label';
			    const \{ container \} = render(
			      <Grommet>
			        <Button aria-label=\{TEST_LABEL\} label="Test" onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			
			    const button = screen.getByRole('button', \{ name: TEST_LABEL \});
			    expect(button).toHaveAttribute('aria-label', TEST_LABEL);
			
			    fireEvent.click(button);
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button label="Test" onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('children function', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button onClick=\{() => \{\}\}>
			          \{() => <div data-testid="children function" />\}
			        </Button>
			      </Grommet>,
			    );
			
			    expect(screen.getByTestId('children function')).toBeInTheDocument();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('children function with disabled prop', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button onClick=\{() => \{\}\} disabled>
			          \{(\{ disabled \}) => (
			            <Text>\{\`Button#1 \$\{disabled ? 'Disabled' : 'not Disabled'\}\`\}</Text>
			          )\}
			        </Button>
			        <Button onClick=\{() => \{\}\}>
			          \{(\{ disabled \}) => (
			            <Text>\{\`Button#2 \$\{disabled ? 'Disabled' : 'not Disabled'\}\`\}</Text>
			          )\}
			        </Button>
			      </Grommet>,
			    );
			
			    expect(
			      screen.getByRole('button', \{ name: 'Button#1 Disabled' \}),
			    ).toBeInTheDocument();
			    expect(
			      screen.getByRole('button', \{ name: 'Button#2 not Disabled' \}),
			    ).toBeInTheDocument();
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('warns about invalid label', () => \{
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => \{\});
			    const \{ container \} = render(
			      <Grommet>
			        <Button label="Test" onClick=\{() => \{\}\}>
			          invalid
			        </Button>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(warnSpy).toHaveBeenCalledWith(
			      'Button should not have children if icon or label is provided',
			    );
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			  \});
			
			  test('warns about invalid icon', () => \{
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => \{\});
			    const \{ container \} = render(
			      <Grommet>
			        <Button icon=\{<svg />\} onClick=\{() => \{\}\}>
			          invalid
			        </Button>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(warnSpy).toHaveBeenCalledWith(
			      'Button should not have children if icon or label is provided',
			    );
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			  \});
			
			  test('primary', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button primary label="Primary Button" onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			
			    expect(screen.getByRole('button', \{ name: 'Primary Button' \})).toHaveStyle(\{
			      'background-color': '#7D4CDB',
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button color="accent-1" label="accent-1" onClick=\{() => \{\}\} />
			        <Button
			          color="accent-1"
			          primary
			          label="primary accent-1"
			          onClick=\{() => \{\}\}
			        />
			        <Button
			          color="#111111"
			          primary
			          label="custom color #1"
			          onClick=\{() => \{\}\}
			        />
			        <Button
			          color="#123"
			          primary
			          label="custom color #2"
			          onClick=\{() => \{\}\}
			        />
			      </Grommet>,
			    );
			
			    expect(screen.getByRole('button', \{ name: 'accent-1' \})).toHaveStyle(\{
			      'background-color': 'transparent',
			    \});
			
			    expect(
			      screen.getByRole('button', \{ name: 'primary accent-1' \}),
			    ).toHaveStyle(\{
			      'background-color': '#6FFFB0',
			    \});
			
			    expect(screen.getByRole('button', \{ name: 'custom color #1' \})).toHaveStyle(
			      \{
			        'background-color': '#111111',
			      \},
			    );
			
			    expect(screen.getByRole('button', \{ name: 'custom color #2' \})).toHaveStyle(
			      \{
			        'background-color': '#123',
			      \},
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button fill label="fill" />
			        <Button fill=\{false\} label="fill false" />
			        <Button fill="horizontal" label="fill horizontal" />
			        <Button fill="vertical" label="fill vertical" />
			      </Grommet>,
			    );
			
			    expect(screen.getByRole('button', \{ name: 'fill' \})).toHaveStyle(\{
			      width: '100%',
			      height: '100%',
			    \});
			
			    expect(screen.getByRole('button', \{ name: 'fill false' \})).not.toHaveStyle(\{
			      width: '100%',
			      height: '100%',
			    \});
			
			    expect(screen.getByRole('button', \{ name: 'fill horizontal' \})).toHaveStyle(
			      \{
			        width: '100%',
			      \},
			    );
			
			    expect(screen.getByRole('button', \{ name: 'fill vertical' \})).toHaveStyle(\{
			      height: '100%',
			    \});
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('focus', async () => \{
			    const user = userEvent.setup();
			
			    const \{ container \} = render(
			      <Grommet>
			        <Button label="Test focus" onClick=\{() => \{\}\} />
			      </Grommet>,
			    );
			
			    const button = screen.getByRole('button', \{ name: 'Test focus' \});
			
			    expect(button).not.toHaveFocus();
			    expect(document.body).toHaveFocus();
			
			    await user.tab();
			
			    expect(button).toHaveFocus();
			    expect(document.body).not.toHaveFocus();
			
			    expect(button).toHaveStyleRule('box-shadow', '0 0 2px 2px #6FFFB0', \{
			      modifier: ':focus',
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('tip', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button label="Default Tip" onClick=\{() => \{\}\} tip="tooltip" />
			      </Grommet>,
			    );
			
			    expect(screen.queryByText('tooltip')).not.toBeInTheDocument();
			
			    fireEvent.mouseOver(screen.getByText('Default Tip'));
			    expect(screen.getByText('tooltip')).toBeInTheDocument();
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button disabled />
			        <Button disabled primary label="Button" />
			        <Button disabled label="Button" />
			        <Button disabled plain label="Button" />
			        <Button disabled plain=\{false\} label="Button" />
			        <Button disabled icon=\{<svg />\} />
			        <Button disabled icon=\{<svg />\} plain />
			        <Button disabled icon=\{<svg />\} plain=\{false\} />
			        <Button disabled icon=\{<svg />\} label="Button" />
			        <Button disabled icon=\{<svg />\} label="Button" plain />
			        <Button disabled icon=\{<svg />\} label="Button" primary />
			      </Grommet>,
			    );
			
			    const allButtons = screen.getAllByRole('button');
			
			    expect(allButtons).toHaveLength(11);
			    allButtons.forEach((button) => expect(button).toBeDisabled());
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('active', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button active label="Button" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('active + primary', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button active primary label="Button" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('icon label', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button
			          icon=\{<svg data-testid="icon" />\}
			          label="Test"
			          onClick=\{() => \{\}\}
			        />
			      </Grommet>,
			    );
			
			    expect(screen.getByTestId('icon')).toBeInTheDocument();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('reverse icon label', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button
			          reverse
			          icon=\{<svg data-testid="icon" />\}
			          label="Test"
			          onClick=\{() => \{\}\}
			        />
			      </Grommet>,
			    );
			
			    expect(screen.getByTestId('icon')).toBeInTheDocument();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('href', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button href="test" label="Button as link" />
			      </Grommet>,
			    );
			
			    expect(
			      screen.getByRole('link', \{ name: 'Button as link' \}),
			    ).toHaveAttribute('href', 'test');
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('hoverIndicator background', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button onClick=\{() => \{\}\} hoverIndicator="background">
			          hoverIndicator
			        </Button>
			      </Grommet>,
			    );
			
			    expect(
			      screen.getByRole('button', \{ name: 'hoverIndicator' \}),
			    ).toHaveStyleRule('background-color', 'rgba(221,221,221,0.4)', \{
			      modifier: ':hover',
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('hoverIndicator as object with color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button onClick=\{() => \{\}\} hoverIndicator=\{\{ color: 'brand' \}\}>
			          hoverIndicator
			        </Button>
			      </Grommet>,
			    );
			
			    expect(
			      screen.getByRole('button', \{ name: 'hoverIndicator' \}),
			    ).toHaveStyleRule('background-color', 'rgba(125,76,219,1)', \{
			      modifier: ':hover',
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('hoverIndicator as object with invalid color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button onClick=\{() => \{\}\} hoverIndicator=\{\{ color: 'invalid' \}\}>
			          hoverIndicator
			        </Button>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('hoverIndicator color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button onClick=\{() => \{\}\} hoverIndicator="dark-3">
			          hoverIndicator
			        </Button>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onClick', () => \{
			    const onClick = jest.fn();
			    render(
			      <Grommet>
			        <Button label="Test" onClick=\{onClick\} />
			      </Grommet>,
			    );
			
			    fireEvent.click(screen.getByRole('button'));
			    expect(onClick).toBeCalled();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button size="small" label="Small" />
			        <Button size="medium" label="Medium" />
			        <Button label="Default" />
			        <Button size="large" label="Large" />
			        <Button primary size="small" label="Small" />
			        <Button primary size="medium" label="Medium" />
			        <Button primary label="Default" />
			        <Button primary size="large" label="Large" />
			        <Button size="small" icon=\{<Add />\} primary />
			        <Button size="medium" icon=\{<Add />\} primary />
			        <Button icon=\{<Add />\} primary />
			        <Button size="large" icon=\{<Add />\} primary />
			        <Button size="small" label="Small" icon=\{<Next />\} reverse />
			        <Button size="medium" label="Medium" icon=\{<Next />\} reverse />
			        <Button label="Default" icon=\{<Next />\} reverse />
			        <Button size="large" label="Large" icon=\{<Next />\} reverse />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('as', () => \{
			    const Anchor = () => <a />;
			
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Button as="span" />
			        <Button as=\{Anchor\} />
			      </Grommet>,
			    );
			
			    expect(screen.queryByRole('button')).not.toBeInTheDocument();
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('a11yTitle', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button a11yTitle="Title" />
			        <Button aria-label="Title" />
			      </Grommet>,
			    );
			
			    const allButtons = screen.getAllByRole('button', \{ name: 'Title' \});
			
			    expect(allButtons).toHaveLength(2);
			    allButtons.forEach((button) =>
			      expect(button).toHaveAttribute('aria-label', 'Title'),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`disabled state cursor should indicate the button cannot be
			  clicked\`, () => \{
			    render(
			      <Grommet>
			        <Button disabled label="Button" />
			      </Grommet>,
			    );
			
			    const button = screen.getByRole('button', \{ name: 'Button' \});
			
			    expect(button).toHaveStyle(\{ cursor: 'default' \});
			
			    const cursorStyle = window.getComputedStyle(button).cursor;
			    expect(cursorStyle).not.toBe('pointer');
			    expect(cursorStyle).toBe('default');
			  \});
			
			  test(\`badge should be offset from top-right corner\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button a11yTitle="Button, alert" label="Button" badge />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should display number content\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button a11yTitle="Button, 2 unread alerts" label="Button" badge=\{2\} />
			      </Grommet>,
			    );
			
			    expect(screen.getByText('2')).toBeInTheDocument();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should display "+" when number is greater than max\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button
			          a11yTitle="Button, 100 unread alerts"
			          label="Button"
			          badge=\{\{ value: 100, max: 9 \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(screen.getByText('9+')).toBeInTheDocument();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should apply background\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button
			          a11yTitle="Button, 100 unread alerts"
			          label="Button"
			          badge=\{\{
			            background: 'status-ok',
			            value: 100,
			          \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should render custom element\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button
			          a11yTitle="Button, Add user alert"
			          label="Button"
			          badge=\{<Add data-testid="badge" />\}
			        />
			      </Grommet>,
			    );
			
			    expect(screen.getByTestId('badge')).toBeInTheDocument();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`badge should render relative to contents when button has no
			  border or background\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Button a11yTitle="Button, Add user alert" icon=\{<Add />\} badge />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`line-height should be zero for icon only\`, () => \{
			    const \{ getByRole \} = render(
			      <Grommet>
			        <Button icon=\{<Add />\} />
			      </Grommet>,
			    );
			
			    expect(getByRole('button')).toHaveStyleRule('line-height', '0');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Button\\__tests__\\Button-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(34)
    });
    it('grommet_grommet\\src\\js\\components\\Calendar\\__tests__\\Calendar-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ axe \} from 'jest-axe';
			import \{ fireEvent, render, act \} from '@testing-library/react';
			import \{ FormNextLink, FormPreviousLink \} from 'grommet-icons';
			import \{ Box, Button, Calendar, Grommet, Text, CalendarProps \} from '../..';
			
			const DATE = '2020-01-15T00:00:00-08:00';
			const DATES = [
			  '2020-01-12T00:00:00-08:00',
			  ['2020-01-08T00:00:00-08:00', '2020-01-10T00:00:00-08:00'],
			];
			
			describe('Calendar', () => \{
			  test('Calendar should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar date=\{DATE\} animate=\{false\} />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('date', () => \{
			    // need to set the date to avoid snapshot drift over time
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar date=\{DATE\} animate=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const disabledDate = new Date(DATE);
			    disabledDate.setDate(disabledDate.getDate() + 1);
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Calendar date=\{DATE\} disabled=\{[disabledDate.toISOString()]\} />
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('dates', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar dates=\{DATES\} animate=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('daysOfWeek', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar daysOfWeek dates=\{DATES\} animate=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar size="small" date=\{DATE\} animate=\{false\} />
			        <Calendar size="medium" date=\{DATE\} animate=\{false\} />
			        <Calendar size="large" date=\{DATE\} animate=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar fill date=\{DATE\} animate=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('firstDayOfWeek', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar firstDayOfWeek=\{0\} date=\{DATE\} animate=\{false\} />
			        <Calendar firstDayOfWeek=\{1\} date=\{DATE\} animate=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('reference', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar reference=\{DATE\} animate=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('showAdjacentDays', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar date=\{DATE\} animate=\{false\} />
			        <Calendar date=\{DATE\} animate=\{false\} showAdjacentDays=\{false\} />
			        <Calendar date=\{DATE\} animate=\{false\} showAdjacentDays="trim" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('header', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar
			          date=\{DATE\}
			          onSelect=\{() => \{\}\}
			          size="small"
			          bounds=\{['2020-09-08', '2020-12-13']\}
			          header=\{(\{
			            date,
			            locale,
			            onPreviousMonth,
			            onNextMonth,
			            previousInBound,
			            nextInBound,
			          \}) => (
			            <Box direction="row" align="center" justify="between">
			              <Button onClick=\{previousInBound ? onPreviousMonth : undefined\}>
			                <Box>
			                  <FormPreviousLink />
			                </Box>
			              </Button>
			              <Text size="small">
			                <strong>
			                  \{date.toLocaleDateString(locale, \{
			                    month: 'long',
			                    year: 'numeric',
			                  \})\}
			                </strong>
			              </Text>
			              <Button onClick=\{nextInBound ? onNextMonth : undefined\}>
			                <Box>
			                  <FormNextLink />
			                </Box>
			              </Button>
			            </Box>
			          )\}
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('children', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar date=\{DATE\} fill animate=\{false\}>
			          \{(\{ day \}) => <Box>\{day\}</Box>\}
			        </Calendar>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('select date', () => \{
			    const onSelect = jest.fn();
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Calendar date=\{DATE\} onSelect=\{onSelect\} animate=\{false\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('17'));
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-17T/));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('select dates', () => \{
			    const onSelect = jest.fn();
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Calendar dates=\{DATES\} onSelect=\{onSelect\} animate=\{false\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('17'));
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-17T/));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('first day sunday week monday', () => \{
			    // When the first day of the month is Sunday,
			    // and the request of firstDayOfWeek
			    // is Monday, we are verifying we are not missing a week, issue 3253.
			    const \{ container \} = render(
			      <Grommet>
			        <Calendar
			          firstDayOfWeek=\{1\}
			          date="2020-03-01T00:00:00-08:00"
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('change months', () => \{
			    jest.useFakeTimers();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Calendar date=\{DATE\} />
			      </Grommet>,
			    );
			    // Change the Calendar from January to December
			    fireEvent.click(getByLabelText('Go to December 2019'));
			    act(() => \{
			      jest.runAllTimers();
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    // Change the Calendar back to January
			    fireEvent.click(getByLabelText('Go to January 2020'));
			    act(() => \{
			      jest.runAllTimers();
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('select date with range', () => \{
			    const onSelect = jest.fn();
			    const \{ getByText \} = render(
			      <Grommet>
			        <Calendar date=\{DATE\} onSelect=\{onSelect\} range animate=\{false\} />
			      </Grommet>,
			    );
			    // expect to be selecting end date of range, because date serves
			    // as start. since selected date is < date we should set it as start
			    fireEvent.click(getByText('11'));
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/2020-01-11T/));
			    fireEvent.click(getByText('20'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-01-11T/),
			        expect.stringMatching(/^2020-01-20T/),
			      ],
			    ]);
			  \});
			
			  test('select date with range no date set', () => \{
			    const onSelect = jest.fn();
			    const \{ getByText \} = render(
			      <Grommet>
			        <Calendar
			          reference="2020-07-01T00:00:00-08:00"
			          onSelect=\{onSelect\}
			          range
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByText('17'));
			    fireEvent.click(getByText('20'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-07-17T/),
			        expect.stringMatching(/^2020-07-20T/),
			      ],
			    ]);
			  \});
			
			  test('select date greater and less than', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          dates=\{[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]\}
			          onSelect=\{onSelect\}
			          range
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    // select date greater than January 1st
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-01-03T/),
			        expect.stringMatching(/^2020-01-05T/),
			      ],
			    ]);
			    // select date less than January 3rd
			    // activeDate is end, since this is before the start
			    // date we should update the date
			    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/2020-01-01T/));
			  \});
			
			  test('select date with same start date', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          dates=\{[['2020-01-01T00:00:00-08:00', '2020-01-03T00:00:00-08:00']]\}
			          onSelect=\{onSelect\}
			          range
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    // selecting same starting day
			    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-03T/));
			  \});
			
			  test('select date with same date twice', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          reference="2020-01-01T00:00:00-08:00"
			          onSelect=\{onSelect\}
			          range
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-03T/));
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith(undefined);
			  \});
			
			  test('select date with same end date', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          dates=\{[['2020-01-01T00:00:00-08:00', '2020-01-03T00:00:00-08:00']]\}
			          onSelect=\{onSelect\}
			          range
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    // selecting same ending day
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-01T/));
			  \});
			
			  test('range as array', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          dates=\{[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]\}
			          onSelect=\{onSelect\}
			          range="array"
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    // select date greater than January 1st
			    // activeDate by default is start
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-01-03T/),
			        expect.stringMatching(/^2020-01-05T/),
			      ],
			    ]);
			    // select date less than January 3rd
			    // activeDate is end, since this is before the start
			    // date we should update the date
			    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
			    expect(onSelect).toBeCalledWith([
			      [expect.stringMatching(/^2020-01-01T/), undefined],
			    ]);
			
			    // should select end date again
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-01-01T/),
			        expect.stringMatching(/^2020-01-03T/),
			      ],
			    ]);
			
			    // should select start date, if great than end date, clear end date
			    fireEvent.click(getByLabelText('Sun Jan 05 2020'));
			    expect(onSelect).toBeCalledWith([
			      [expect.stringMatching(/^2020-01-05T/), undefined],
			    ]);
			  \});
			
			  test('range as array with date', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          date=\{[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]\}
			          onSelect=\{onSelect\}
			          range="array"
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    // select date greater than January 1st
			    // activeDate by default is start
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-01-03T/),
			        expect.stringMatching(/^2020-01-05T/),
			      ],
			    ]);
			    // select date less than January 3rd
			    // activeDate is end, since this is before the start
			    // date we should update the date
			    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
			    expect(onSelect).toBeCalledWith([
			      [expect.stringMatching(/^2020-01-01T/), undefined],
			    ]);
			
			    // should select end date again
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-01-01T/),
			        expect.stringMatching(/^2020-01-03T/),
			      ],
			    ]);
			
			    // should select start date, if great than end date, clear end date
			    fireEvent.click(getByLabelText('Sun Jan 05 2020'));
			    expect(onSelect).toBeCalledWith([
			      [expect.stringMatching(/^2020-01-05T/), undefined],
			    ]);
			  \});
			
			  test('activeDate start', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          activeDate="start"
			          dates=\{[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]\}
			          onSelect=\{onSelect\}
			          range="array"
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-01-03T/),
			        expect.stringMatching(/^2020-01-05T/),
			      ],
			    ]);
			  \});
			
			  test('activeDate end', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          activeDate="end"
			          dates=\{[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]\}
			          onSelect=\{onSelect\}
			          range="array"
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
			    expect(onSelect).toBeCalledWith([
			      [
			        expect.stringMatching(/^2020-01-01T/),
			        expect.stringMatching(/^2020-01-03T/),
			      ],
			    ]);
			  \});
			
			  test('daylight savings', () => \{
			    const onSelect = jest.fn();
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <Calendar
			          reference="2022-07-14T08:00:00.000Z"
			          onSelect=\{onSelect\}
			          animate=\{false\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByLabelText('Fri Jul 15 2022'));
			    expect(onSelect).toBeCalledWith(
			      expect.stringMatching(/^2022-07-15T08:00:00.000Z/),
			    );
			
			    // Change the Calendar from July to March
			    fireEvent.click(getByLabelText('Go to June 2022'));
			    fireEvent.click(getByLabelText('Go to May 2022'));
			    fireEvent.click(getByLabelText('Go to April 2022'));
			    fireEvent.click(getByLabelText('Go to March 2022'));
			
			    fireEvent.click(getByLabelText('Wed Mar 02 2022'));
			
			    const date = new Date();
			    const january = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
			    const july = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
			    const hasDaylightSavings = january !== july;
			
			    expect(onSelect).toBeCalledWith(
			      // expecting one hour diff bc of daylight savings shift, otherwise no shift
			      expect.stringMatching(
			        \`2022-03-02T0\$\{hasDaylightSavings ? 9 : 8\}:00:00.000Z\`,
			      ),
			    );
			  \});
			\});
			
			describe('Calendar Keyboard events', () => \{
			  let onSelect: CalendarProps['onSelect'];
			  let App: React.FC;
			
			  beforeEach(() => \{
			    onSelect = jest.fn();
			    App = () => (
			      <Grommet>
			        <Calendar
			          bounds=\{['2020-01-01', '2020-01-31']\}
			          date=\{DATE\}
			          onSelect=\{onSelect\}
			          animate=\{false\}
			        />
			      </Grommet>
			    );
			  \});
			
			  test('onEnter', async () => \{
			    const \{ getByText \} = render(<App />);
			    fireEvent.mouseOver(getByText('15'));
			    fireEvent.click(getByText('15'));
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    fireEvent.mouseOut(getByText('15'));
			    // Jan 15th is set to active
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-15T/));
			  \});
			
			  test('onKeyUp', () => \{
			    const \{ getByText \} = render(<App />);
			    fireEvent.mouseOver(getByText('15'));
			    fireEvent.click(getByText('15'));
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'ArrowUp',
			      keyCode: 38,
			      which: 38,
			    \});
			    // press enter to change date to active
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    // Jan 8th is set to active
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-08T/));
			  \});
			
			  test('onKeyDown', () => \{
			    const \{ getByText \} = render(<App />);
			    fireEvent.mouseOver(getByText('15'));
			    fireEvent.click(getByText('15'));
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'ArrowDown',
			      keyCode: 40,
			      which: 40,
			    \});
			    // press enter to change date to active
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    // Jan 22th is set to active
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-22T/));
			  \});
			
			  test('onKeyLeft', () => \{
			    const \{ getByText \} = render(<App />);
			    fireEvent.mouseOver(getByText('15'));
			    fireEvent.click(getByText('15'));
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'ArrowLeft',
			      keyCode: 37,
			      which: 37,
			    \});
			    // press enter to change date to active
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    // Jan 14th is set to active
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-14T/));
			  \});
			
			  test('onKeyRight', () => \{
			    const \{ getByText \} = render(<App />);
			    fireEvent.mouseOver(getByText('15'));
			    fireEvent.click(getByText('15'));
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'ArrowRight',
			      keyCode: 39,
			      which: 39,
			    \});
			    // press enter to change date to active
			    fireEvent.keyDown(getByText('15'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    // Jan 16th is set to active
			    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-16T/));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Calendar\\__tests__\\Calendar-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(32)
    });
    it('grommet_grommet\\src\\js\\components\\Card\\__tests__\\Card-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Box \} from '../../Box';
			import \{ Card \} from '..';
			import \{ CardBody \} from '../../CardBody';
			import \{ CardFooter \} from '../../CardFooter';
			import \{ CardHeader \} from '../../CardHeader';
			import \{ Grommet \} from '../../Grommet';
			import \{ Text \} from '../../Text';
			import \{ ThemeType \} from '../../..';
			
			const customTheme: ThemeType = \{
			  global: \{
			    font: \{
			      family: \`-apple-system,
			           BlinkMacSystemFont,
			           "Segoe UI"\`,
			    \},
			  \},
			  card: \{
			    container: \{
			      background: 'brand',
			      elevation: 'large',
			    \},
			    body: \{
			      pad: 'small',
			      background: 'light-1',
			    \},
			    header: \{
			      justify: 'start',
			      pad: 'small',
			    \},
			    footer: \{
			      pad: \{ horizontal: 'medium', vertical: 'small' \},
			      background: '#FFFFFF27',
			    \},
			  \},
			\};
			
			describe('Card', () => \{
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Card />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('header', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Card>
			          <CardHeader>header</CardHeader>
			        </Card>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('footer', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Card>
			          <CardFooter>footer</CardFooter>
			        </Card>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('children', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Card>
			          <Box>
			            <Text>test</Text>
			          </Box>
			        </Card>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('all', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Card>
			          <CardHeader>header</CardHeader>
			          <CardBody>body</CardBody>
			          <CardFooter>footer</CardFooter>
			        </Card>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('Themed', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Card width="small">
			          <CardHeader>header</CardHeader>
			          <CardBody>body</CardBody>
			          <CardFooter>footer</CardFooter>
			        </Card>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Card\\__tests__\\Card-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('grommet_grommet\\src\\js\\components\\Carousel\\__tests__\\Carousel-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{
			  render,
			  act,
			  fireEvent,
			  waitFor,
			  screen,
			\} from '@testing-library/react';
			import userEvent from '@testing-library/user-event';
			import 'jest-styled-components';
			import '@testing-library/jest-dom';
			
			import \{ Carousel \} from '..';
			import \{ Grommet \} from '../../Grommet';
			
			const getSlideOne = () => screen.getByText('Slide One');
			const getSlideTwo = () => screen.getByText('Slide Two');
			const getSlideThree = () => screen.getByText('Slide Three');
			
			describe('Carousel', () => \{
			  test('basic', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Carousel>
			          <div>Slide One</div>
			          <div>Slide Two</div>
			        </Carousel>
			      </Grommet>,
			    );
			    expect(getSlideOne()).toBeVisible();
			    expect(getSlideTwo()).not.toBeVisible();
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('basic with \`initialChild: 1\`', () => \{
			    render(
			      <Grommet>
			        <Carousel initialChild=\{1\}>
			          <div>Slide One</div>
			          <div>Slide Two</div>
			        </Carousel>
			      </Grommet>,
			    );
			
			    expect(getSlideTwo()).toBeVisible();
			    expect(getSlideOne()).not.toBeVisible();
			  \});
			
			  test('arrow navigation: next', async () => \{
			    jest.useFakeTimers();
			    const user = userEvent.setup(\{ delay: null \});
			
			    render(
			      <Grommet>
			        <Carousel controls="arrows">
			          <div>Slide One</div>
			          <div>Slide Two</div>
			        </Carousel>
			      </Grommet>,
			    );
			
			    /**
			     * - Currently on "Slide One"
			     * - Simulating click on the next arrow button
			     * - Expecting "Slide Two" to be visible
			     */
			    const nextButton = screen.getByRole('button', \{ name: /Go to slide 2/i \});
			    await user.click(nextButton);
			    act(() => \{
			      jest.advanceTimersByTime(1000);
			    \});
			    expect(getSlideOne()).not.toBeVisible();
			    expect(getSlideTwo()).toBeVisible();
			  \});
			
			  test('arrow navigation: previous', async () => \{
			    jest.useFakeTimers();
			    const user = userEvent.setup(\{ delay: null \});
			
			    render(
			      <Grommet>
			        <Carousel initialChild=\{1\} controls="arrows">
			          <div>Slide One</div>
			          <div>Slide Two</div>
			          <div>Slide Three</div>
			        </Carousel>
			      </Grommet>,
			    );
			
			    /**
			     * - Currently on "Slide Two"
			     * - Simulating click on the previous arrow button
			     * - Expecting "Slide One" to be visible
			     */
			    const previousButton = screen.getByRole('button', \{
			      name: /Go to slide 1/i,
			    \});
			    await user.click(previousButton);
			    act(() => \{
			      jest.advanceTimersByTime(1000);
			    \});
			    expect(getSlideTwo()).not.toBeVisible();
			    expect(getSlideOne()).toBeVisible();
			  \});
			
			  test('selector navigation: forward', async () => \{
			    jest.useFakeTimers();
			    const user = userEvent.setup(\{ delay: null \});
			
			    render(
			      <Grommet>
			        <Carousel controls="selectors">
			          <div>Slide One</div>
			          <div>Slide Two</div>
			          <div>Slide Three</div>
			        </Carousel>
			      </Grommet>,
			    );
			
			    /**
			     * - Currently on "Slide One"
			     * - Simulating click on the 3rd selector button
			     * - Expecting "Slide Three" to be visible
			     */
			    const thirdSelector = screen.getByRole('button', \{
			      name: /Jump to slide 3/i,
			    \});
			    await user.click(thirdSelector);
			    act(() => \{
			      jest.advanceTimersByTime(1000);
			    \});
			    expect(getSlideOne()).not.toBeVisible();
			    expect(getSlideThree()).toBeVisible();
			  \});
			
			  test('selector navigation: backward', async () => \{
			    jest.useFakeTimers();
			    const user = userEvent.setup(\{ delay: null \});
			
			    render(
			      <Grommet>
			        <Carousel initialChild=\{2\} controls="selectors">
			          <div>Slide One</div>
			          <div>Slide Two</div>
			          <div>Slide Three</div>
			        </Carousel>
			      </Grommet>,
			    );
			
			    /**
			     * - Currently on "Slide Three"
			     * - Simulating click on the 1st selector button
			     * - Expecting "Slide One" to be visible
			     */
			    const firstSelector = screen.getByRole('button', \{
			      name: /Jump to slide 1/i,
			    \});
			    await user.click(firstSelector);
			    act(() => \{
			      jest.advanceTimersByTime(1000);
			    \});
			    expect(getSlideThree()).not.toBeVisible();
			    expect(getSlideOne()).toBeVisible();
			  \});
			
			  test('play', async () => \{
			    jest.useFakeTimers();
			    render(
			      <Grommet>
			        <Carousel controls=\{false\} play=\{500\} wrap=\{false\}>
			          <div>Slide One</div>
			          <div>Slide Two</div>
			        </Carousel>
			      </Grommet>,
			    );
			
			    expect(getSlideOne()).toBeVisible();
			    await act(async () => \{
			      jest.advanceTimersByTime(600);
			    \});
			    await waitFor(() => \{
			      expect(getSlideOne()).not.toBeVisible();
			      expect(getSlideTwo()).toBeVisible();
			    \});
			  \});
			
			  test('keyboard: left arrow', async () => \{
			    render(
			      <Grommet>
			        <Carousel initialChild=\{1\} a11yTitle="test-carousel">
			          <div>Slide One</div>
			          <div>Slide Two</div>
			        </Carousel>
			      </Grommet>,
			    );
			    const carousel = screen.getByLabelText('test-carousel');
			    fireEvent.keyDown(carousel, \{
			      key: 'Left',
			      keyCode: 37,
			      which: 37,
			    \});
			    await waitFor(
			      () => \{
			        expect(getSlideTwo()).not.toBeVisible();
			        expect(getSlideOne()).toBeVisible();
			      \},
			      \{ timeout: 1200 \},
			    );
			  \});
			
			  test('keyboard: right arrow', async () => \{
			    render(
			      <Grommet>
			        <Carousel a11yTitle="test-carousel">
			          <div>Slide One</div>
			          <div>Slide Two</div>
			        </Carousel>
			      </Grommet>,
			    );
			    const carousel = screen.getByLabelText('test-carousel');
			    fireEvent.keyDown(carousel, \{
			      key: 'Right',
			      keyCode: 39,
			      which: 39,
			    \});
			    await waitFor(
			      () => \{
			        expect(getSlideOne()).not.toBeVisible();
			        expect(getSlideTwo()).toBeVisible();
			      \},
			      \{ timeout: 1200 \},
			    );
			  \});
			
			  test('controlled component', async () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Carousel controls="arrows" activeChild=\{1\}>
			          <div>Slide One</div>
			          <div>Slide Two</div>
			        </Carousel>
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			    expect(getSlideOne()).not.toBeVisible();
			    expect(getSlideTwo()).toBeVisible();
			  \});
			
			  test('interactive slide', async () => \{
			    const user = userEvent.setup(\{ delay: null \});
			
			    const someFunction = jest.fn();
			    render(
			      <Grommet>
			        <Carousel>
			          <div>
			            <span>Click the button below</span>
			            <button
			              aria-label="Test Button"
			              type="button"
			              onClick=\{someFunction\}
			            />
			          </div>
			        </Carousel>
			      </Grommet>,
			    );
			
			    await user.click(screen.getByLabelText('Test Button'));
			    expect(someFunction).toHaveBeenCalledTimes(1);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Carousel\\__tests__\\Carousel-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('grommet_grommet\\src\\js\\components\\Chart\\__tests__\\Chart-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Box \} from '../../Box';
			import \{ Chart, calcs, ChartProps \} from '..';
			
			type ChartValues = ChartProps['values'];
			
			const VALUES: ChartValues = [
			  \{ value: [1, 60], label: 'sixty' \},
			  \{ value: [0, 0], label: 'zero' \},
			];
			
			const UNDEFINED_VALUES: ChartValues = [
			  \{ value: [2, 60], label: 'sixty' \},
			  \{ value: [1] \},
			  \{ value: [0, 0], label: 'zero' \},
			];
			
			const STYLED_VALUES: ChartValues = [
			  \{
			    value: [1, 60],
			    label: 'sixty',
			    color: 'status-ok',
			    opacity: 'strong',
			    thickness: 'small',
			  \},
			  \{
			    value: [0, 0],
			    label: 'zero',
			    color: '#123456',
			    opacity: 0.27,
			    thickness: 27,
			  \},
			];
			
			describe('Chart', () => \{
			  test('should not have accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart values=\{VALUES\} />
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('default', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('opacity', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart opacity values=\{VALUES\} />
			        <Chart opacity=\{false\} values=\{VALUES\} />
			        <Chart opacity="strong" values=\{VALUES\} />
			        <Chart
			          type="bar"
			          values=\{[
			            \{ value: [7, 100], label: 'one hundred', opacity: true \},
			            \{ value: [6, 70], label: 'seventy', opacity: 'medium' \},
			            \{ value: [5, 60], label: 'sixty', opacity: 'weak' \},
			            \{ value: [4, 80], label: 'eighty', opacity: 'strong' \},
			            \{ value: [3, 40], label: 'forty', opacity: false \},
			            \{ value: [2, 0], label: 'zero', opacity: 0.3 \},
			          ]\}
			        />
			        <Chart
			          type="point"
			          point="circle"
			          values=\{[
			            \{ value: [7, 100], label: 'one hundred', opacity: true \},
			            \{ value: [6, 70], label: 'seventy', opacity: 'medium' \},
			            \{ value: [5, 60], label: 'sixty', opacity: 'weak' \},
			            \{ value: [4, 80], label: 'eighty', opacity: 'strong' \},
			            \{ value: [3, 40], label: 'forty', opacity: false \},
			            \{ value: [2, 0], label: 'zero', opacity: 0.3 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('type', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart type="bar" values=\{VALUES\} />
			        <Chart type="line" values=\{VALUES\} />
			        <Chart type="area" values=\{VALUES\} />
			        <Chart type="point" values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart size="xsmall" values=\{VALUES\} />
			        <Chart size="small" values=\{VALUES\} />
			        <Chart size="medium" values=\{VALUES\} />
			        <Chart size="large" values=\{VALUES\} />
			        <Chart size="xlarge" values=\{VALUES\} />
			        <Box width="large">
			          <Chart size=\{\{ width: 'full' \}\} values=\{VALUES\} />
			          <Chart size=\{\{ width: 'fill' \}\} values=\{VALUES\} />
			          <Chart size=\{\{ width: 'auto' \}\} values=\{VALUES\} />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('thickness', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart thickness="xsmall" values=\{VALUES\} />
			        <Chart thickness="small" values=\{VALUES\} />
			        <Chart thickness="medium" values=\{VALUES\} />
			        <Chart thickness="large" values=\{VALUES\} />
			        <Chart thickness="xlarge" values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('cap', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart round values=\{VALUES\} />
			        <Chart type="line" round values=\{VALUES\} />
			        <Chart type="area" round values=\{VALUES\} />
			        <Chart type="point" round values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('gap', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box width="large">
			          <Chart size=\{\{ width: 'auto' \}\} gap="small" values=\{VALUES\} />
			          <Chart size=\{\{ width: 'auto' \}\} gap="medium" values=\{VALUES\} />
			          <Chart size=\{\{ width: 'auto' \}\} gap="large" values=\{VALUES\} />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('dash', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart dash values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart color="brand" values=\{VALUES\} />
			        <Chart color=\{\{ color: 'brand', opacity: 'strong' \}\} values=\{VALUES\} />
			        <Chart
			          color=\{[
			            \{ value: 0, color: 'brand' \},
			            \{ value: 60, color: 'border' \},
			          ]\}
			          values=\{VALUES\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('point', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart type="point" point="circle" values=\{VALUES\} />
			        <Chart type="point" point="diamond" values=\{VALUES\} />
			        <Chart type="point" point="square" values=\{VALUES\} />
			        <Chart type="point" point="star" values=\{VALUES\} />
			        <Chart type="point" point="triangle" values=\{VALUES\} />
			        <Chart type="point" point="triangleDown" values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pattern', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart type="area" pattern="squares" values=\{VALUES\} />
			        <Chart type="area" pattern="circles" values=\{VALUES\} />
			        <Chart type="area" pattern="stripesHorizontal" values=\{VALUES\} />
			        <Chart type="area" pattern="stripesVertical" values=\{VALUES\} />
			        <Chart type="area" pattern="stripesDiagonalDown" values=\{VALUES\} />
			        <Chart type="area" pattern="stripesDiagonalUp" values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('value style', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart type="point" point="circle" values=\{STYLED_VALUES\} />
			        <Chart type="bar" values=\{STYLED_VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart pad="xsmall" values=\{VALUES\} />
			        <Chart
			          pad=\{\{ horizontal: 'medium', vertical: 'small' \}\}
			          values=\{VALUES\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('animate', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart type="bar" values=\{VALUES\} animate />
			        <Chart type="line" values=\{VALUES\} animate />
			        <Chart type="area" values=\{VALUES\} animate />
			        <Chart type="point" values=\{VALUES\} animate />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('undefined values', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Chart type="bar" values=\{UNDEFINED_VALUES\} />
			        <Chart type="line" values=\{UNDEFINED_VALUES\} />
			        <Chart type="area" values=\{UNDEFINED_VALUES\} />
			        <Chart type="point" values=\{UNDEFINED_VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('calcs basic', () => \{
			    const result = calcs([
			      [1, 2, 2],
			      [2, 2, 2],
			    ]);
			    expect(result).toMatchSnapshot();
			  \});
			
			  test('calcs with single value', () => \{
			    const result = calcs([1]);
			    expect(result).toMatchSnapshot();
			  \});
			
			  test('calcs with negative min', () => \{
			    const result = calcs([
			      [1, -2, -2],
			      [2, 2, 2],
			    ]);
			    expect(result).toMatchSnapshot();
			  \});
			
			  test('calcs large thickness', () => \{
			    const vals = Array(8).fill([1, 2, 3]);
			    const result = calcs(vals);
			    expect(result).toMatchSnapshot();
			  \});
			
			  test('calcs medium thickness', () => \{
			    const vals = Array(14).fill([1, 2, 3]);
			    const result = calcs(vals);
			    expect(result).toMatchSnapshot();
			  \});
			
			  test('calcs small thickness', () => \{
			    const vals = Array(24).fill([1, 2, 3]);
			    const result = calcs(vals);
			    expect(result).toMatchSnapshot();
			  \});
			
			  test('calcs xsmall thickness', () => \{
			    const vals = Array(64).fill([1, 2, 3]);
			    const result = calcs(vals);
			    expect(result).toMatchSnapshot();
			  \});
			
			  test('calcs hair thickness', () => \{
			    const vals = Array(124).fill([1, 2, 3]);
			    const result = calcs(vals);
			    expect(result).toMatchSnapshot();
			  \});
			
			  test('renders a11yTitle and aria-label', () => \{
			    const LABEL = 'Test Label';
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Chart a11yTitle=\{LABEL\} values=\{VALUES\} />
			        <Chart aria-label=\{\`\$\{LABEL\}-2\`\} values=\{VALUES\} />
			      </Grommet>,
			    );
			    expect(getByLabelText(LABEL)).toBeTruthy();
			    expect(getByLabelText(\`\$\{LABEL\}-2\`)).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Chart\\__tests__\\Chart-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(25)
    });
    it('grommet_grommet\\src\\js\\components\\Chart\\__tests__\\utils-test.js', () => {
        const sourceCode = `
			import \{ areNormalizedBoundsEquals, areNormalizedValuesEquals \} from '../utils';
			
			describe('utils', () => \{
			  test('areNormalizedValuesEquals', () => \{
			    console.warn = jest.fn();
			    const warnSpy = jest.spyOn(console, 'warn');
			
			    expect(
			      areNormalizedValuesEquals([\{ value: [1] \}], [\{ value: [1] \}]),
			    ).toBeTruthy();
			
			    expect(areNormalizedValuesEquals([\{ value: [1] \}], undefined)).toBeFalsy();
			
			    expect(
			      areNormalizedValuesEquals(
			        [\{ value: [1] \}],
			        [\{ value: [1] \}, \{ value: [2] \}],
			      ),
			    ).toBeFalsy();
			
			    expect(areNormalizedValuesEquals([], [])).toBeTruthy();
			
			    expect(
			      areNormalizedValuesEquals([\{ test: 'test' \}], [\{ value: [2] \}]),
			    ).toBeFalsy();
			
			    expect(
			      areNormalizedValuesEquals([\{ value: [1] \}], [\{ test: 'test' \}]),
			    ).toBeFalsy();
			
			    expect(warnSpy).toBeCalledTimes(6);
			    expect(warnSpy).toHaveBeenCalledWith(
			      \`This function will be removed in the upcoming releases.
			Please get in touch with us if you have concerns.\`,
			    );
			  \});
			
			  test('areNormalizedBoundsEquals', () => \{
			    console.warn = jest.fn();
			    const warnSpy = jest.spyOn(console, 'warn');
			
			    expect(
			      areNormalizedBoundsEquals(
			        [
			          [0, 1],
			          [0, 1],
			        ],
			        [
			          [0, 1],
			          [0, 1],
			        ],
			      ),
			    ).toBeTruthy();
			
			    expect(
			      areNormalizedBoundsEquals(
			        [
			          [0, 1],
			          [0, 1],
			        ],
			        undefined,
			      ),
			    ).toBeFalsy();
			
			    expect(
			      areNormalizedBoundsEquals(undefined, [
			        [0, 1],
			        [0, 1],
			      ]),
			    ).toBeFalsy();
			
			    expect(
			      areNormalizedBoundsEquals(
			        [],
			        [
			          [0, 1],
			          [0, 1],
			        ],
			      ),
			    ).toBeFalsy();
			
			    expect(areNormalizedBoundsEquals([], [])).toBeFalsy();
			
			    expect(warnSpy).toBeCalledTimes(5);
			    expect(warnSpy).toHaveBeenCalledWith(
			      \`This function will be removed in the upcoming releases.
			Please get in touch with us if you have concerns.\`,
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Chart\\__tests__\\utils-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('grommet_grommet\\src\\js\\components\\CheckBox\\__tests__\\CheckBox-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ CheckBox \} from '..';
			
			describe('CheckBox', () => \{
			  test('should not have accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox a11yTitle="test" />
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('label should not have accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox label="test" />
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox />
			        <CheckBox id="test id" name="test name" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('label renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox label="test label" />
			        <CheckBox label=\{<div>test label</div>\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('checked renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox checked />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('defaultChecked', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox defaultChecked />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox disabled />
			        <CheckBox disabled checked />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('reverse renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox reverse label="test label" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('toggle renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox toggle />
			        <CheckBox toggle checked />
			        <CheckBox toggle label="test label" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('reverse toggle fill', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox label="test label" reverse fill toggle />
			        <CheckBox fill toggle label="test label" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('indeterminate renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBox indeterminate />
			        <CheckBox indeterminate label="test label" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('indeterminate checked warns', () => \{
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			    render(
			      <Grommet>
			        <CheckBox indeterminate checked />
			      </Grommet>,
			    );
			    expect(warnSpy).toBeCalledWith(
			      'Checkbox cannot be "checked" and "indeterminate" at the same time.',
			    );
			
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			  \});
			
			  test('indeterminate toggle warns', () => \{
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			    render(
			      <Grommet>
			        <CheckBox indeterminate toggle />
			      </Grommet>,
			    );
			    expect(warnSpy).toBeCalledWith(
			      'Checkbox of type toggle does not have "indeterminate" state.',
			    );
			
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			  \});
			
			  test('controlled', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <CheckBox label="test-label" checked />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('test-label'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom theme', () => \{
			    const customTheme = \{
			      checkBox: \{
			        pad: \{
			          horizontal: 'small',
			          vertical: 'xsmall',
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <CheckBox label="test-label" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders a11yTitle and aria-label', async () => \{
			    const LABEL = 'Label';
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <CheckBox a11yTitle=\{LABEL\} />
			        <CheckBox aria-label=\{\`\$\{LABEL\}-2\`\} />
			      </Grommet>,
			    );
			    expect(getByLabelText(LABEL)).toBeTruthy();
			    expect(getByLabelText(\`\$\{LABEL\}-2\`)).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\CheckBox\\__tests__\\CheckBox-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(16)
    });
    it('grommet_grommet\\src\\js\\components\\CheckBoxGroup\\__tests__\\CheckBoxGroup-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ CheckBoxGroup \} from '..';
			
			describe('CheckBoxGroup', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBoxGroup options=\{['First', 'Second']\} />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('options renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBoxGroup options=\{['First', 'Second']\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('value renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBoxGroup value=\{['First']\} options=\{['First', 'Second']\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('initial value renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBoxGroup
			          value=\{['Wuhan', 'Jerusalem']\}
			          options=\{[
			            \{ label: 'Maui', value: 'Maui' \},
			            \{ label: 'Jerusalem', value: 'Jerusalem' \},
			            \{ label: 'Wuhan', value: 'Wuhan' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBoxGroup disabled options=\{['First', 'Second']\} />
			        <CheckBoxGroup options=\{[\{ label: 'First', disabled: true \}]\} />
			        <CheckBoxGroup options=\{[\{ label: 'First', disabled: true \}]\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onChange', () => \{
			    const onChange = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <CheckBoxGroup
			          options=\{[
			            \{ label: 'first-label', value: 'First' \},
			            \{ label: 'second-label', value: 'Second' \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByText('first-label'));
			    expect(onChange).toBeCalledTimes(1);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onClick for check and uncheck a CheckBox', () => \{
			    const onClick = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <CheckBoxGroup
			          options=\{[
			            \{ label: 'first-label', value: 'First' \},
			            \{ label: 'second-label', value: 'Second' \},
			          ]\}
			          onClick=\{onClick\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByText('first-label'));
			    expect(onClick).toBeCalledTimes(1);
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('first-label'));
			    expect(onClick).toBeCalledTimes(2);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('labelKey', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBoxGroup
			          labelKey="labelKeyTest"
			          options=\{[
			            \{ labelKeyTest: 'first-label', value: 'First' \},
			            \{ labelKeyTest: 'second-label', value: 'Second' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('valueKey', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CheckBoxGroup
			          valueKey="valueKeyTest"
			          options=\{[
			            \{ label: 'first-label', valueKeyTest: 'First' \},
			            \{ label: 'second-label', valueKeyTest: 'Second' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom theme', () => \{
			    const customTheme = \{
			      checkBoxGroup: \{
			        container: \{
			          gap: 'large',
			          margin: \{
			            vertical: 'small',
			          \},
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <CheckBoxGroup
			          valueKey="valueKeyTest"
			          options=\{[
			            \{ label: 'first-label', valueKeyTest: 'First' \},
			            \{ label: 'second-label', valueKeyTest: 'Second' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('no duplicated key error', () => \{
			    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
			
			    render(
			      <Grommet>
			        <CheckBoxGroup
			          value=\{['yes', 'yes-again']\}
			          options=\{[
			            \{ label: 'Yes!', value: 'yes' \},
			            \{ label: 'Yes!', value: 'yes-again' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(errorSpy).not.toBeCalledWith(
			      expect.stringMatching('same key'),
			      expect.stringMatching('Yes!'),
			      expect.anything(),
			    );
			
			    errorSpy.mockReset();
			    errorSpy.mockRestore();
			  \});
			
			  test('checked warning', () => \{
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			
			    render(
			      <Grommet>
			        <CheckBoxGroup
			          options=\{[
			            \{ label: 'first-label', value: 'First', checked: true \},
			            \{ label: 'second-label', value: 'Second' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(warnSpy).toBeCalled();
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\CheckBoxGroup\\__tests__\\CheckBoxGroup-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(12)
    });
    it('grommet_grommet\\src\\js\\components\\Clock\\__tests__\\Clock-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, act \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Clock, ClockExtendedProps \} from '..';
			import \{ ThemeType \} from '../../../themes';
			
			const DURATION = 'PT18H23M34S';
			const TIME = 'T18:23:34';
			const TIME2 = 'T18:23';
			const DATE = '2018-02-22T18:23:34-10:00';
			
			const CLOCKTYPES: ClockExtendedProps['type'][] = ['analog', 'digital'];
			const PRECISIONS: ClockExtendedProps['precision'][] = [
			  'hours',
			  'minutes',
			  'seconds',
			];
			const SIZES: ClockExtendedProps['size'][] = [
			  'xsmall',
			  'small',
			  'medium',
			  'large',
			  'xlarge',
			  'xxlarge',
			];
			
			describe('Clock', () => \{
			  test('time', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Clock run=\{false\} type="digital" time=\{DURATION\} />
			        <Clock run=\{false\} type="digital" time=\{TIME\} />
			        <Clock run=\{false\} type="digital" time=\{TIME2\} />
			        <Clock run=\{false\} type="digital" time=\{DATE\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('hourLimit', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Clock run=\{false\} type="digital" time=\{DURATION\} hourLimit=\{12\} />
			        <Clock run=\{false\} type="digital" time=\{DURATION\} hourLimit=\{24\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('run', () => \{
			    jest.useFakeTimers();
			    const \{ container \} = render(
			      <Grommet>
			        <Clock type="analog" run="forward" time=\{DURATION\} />
			        <Clock type="analog" run="backward" time=\{DURATION\} />
			        <Clock type="digital" run="forward" time=\{DURATION\} />
			        <Clock type="digital" run="backward" time=\{DURATION\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    act(() => \{
			      jest.advanceTimersByTime(1300);
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			
			    // give some time for the clock to move and use the callback
			  \});
			
			  CLOCKTYPES.forEach((type) =>
			    PRECISIONS.forEach((precision) =>
			      SIZES.forEach((size) =>
			        test(\`type \$\{type\} precision \$\{precision\} size \$\{size\}\`, () => \{
			          const \{ container \} = render(
			            <Grommet>
			              <Clock
			                run=\{false\}
			                type=\{type\}
			                precision=\{precision\}
			                size=\{size\}
			                time=\{DURATION\}
			              />
			            </Grommet>,
			          );
			
			          expect(container.firstChild).toMatchSnapshot();
			        \}),
			      ),
			    ),
			  );
			
			  PRECISIONS.forEach((precision) =>
			    test(\`type analog precision \$\{precision\} size huge\`, () => \{
			      const \{ container \} = render(
			        <Grommet>
			          <Clock
			            run=\{false\}
			            type="analog"
			            precision=\{precision\}
			            size="huge"
			            time=\{DURATION\}
			          />
			        </Grommet>,
			      );
			
			      expect(container.firstChild).toMatchSnapshot();
			    \}),
			  );
			
			  test('type digital custom size', () => \{
			    const override: ThemeType = \{
			      clock: \{
			        digital: \{
			          text: \{
			            customSize: \{
			              size: '30px',
			              height: 1.234,
			            \},
			          \},
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{override\}>
			        <Clock type="digital" run=\{false\} time=\{DURATION\} size="customSize" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Clock\\__tests__\\Clock-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('grommet_grommet\\src\\js\\components\\Collapsible\\__tests__\\Collapsible-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ render \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Collapsible \} from '..';
			import \{ Grommet \} from '../../Grommet';
			import \{ Text \} from '../../Text';
			
			describe('Collapsible', () => \{
			  test('no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Collapsible>
			          <Text>Example</Text>
			        </Collapsible>
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('open', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Collapsible open>
			          <Text>Example</Text>
			        </Collapsible>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onClick open default', () => \{
			    const \{ container, rerender \} = render(
			      <Grommet>
			        <Collapsible open>
			          <Text>Example</Text>
			        </Collapsible>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    rerender(
			      <Grommet>
			        <Collapsible open=\{false\}>
			          <Text>Example</Text>
			        </Collapsible>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Collapsible\\__tests__\\Collapsible-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('grommet_grommet\\src\\js\\components\\DataChart\\__tests__\\DataChart-test.js', () => {
        const sourceCode = `
			import React, \{ Fragment \} from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Box \} from '../../Box';
			import \{ Text \} from '../../Text';
			import \{ DataChart \} from '..';
			
			const data = [
			  \{ a: 1, b: 'one', c: 111111, d: '2020-06-24' \},
			  \{ a: 2, b: 'two', c: 222222, d: '2020-06-23' \},
			];
			
			describe('DataChart', () => \{
			  let warnSpy;
			
			  beforeEach(() => \{
			    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			  \});
			
			  afterEach(() => \{
			    warnSpy.mockRestore();
			  \});
			
			  test('default', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart data=\{data\} series="a" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('nothing', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart data=\{data\} />
			        <DataChart data=\{data\} series=\{[]\} />
			        <DataChart data=\{data\} series=\{[\{\}]\} />
			        <DataChart data=\{data\} series=\{[\{ property: 'a' \}, \{\}]\} />
			        <DataChart data=\{data\} chart=\{[]\} />
			        <DataChart data=\{data\} chart=\{[\{\}]\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('single', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{[data[0]]\}
			          series=\{['d', 'a']\}
			          axis=\{\{
			            x: \{ property: 'd' \},
			            y: \{ property: 'a' \},
			          \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('gap', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['small', 'medium', 'large'].map((gap) => (
			          <DataChart key=\{gap\} data=\{data\} series="a" gap=\{gap\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['small', 'medium', 'large'].map((pad) => (
			          <DataChart key=\{pad\} data=\{data\} series="a" pad=\{pad\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['fill', \{ width: 'fill' \}, \{ width: 'auto' \}].map((size, i) => (
			          // eslint-disable-next-line react/no-array-index-key
			          <DataChart key=\{i\} data=\{data\} series="a" size=\{size\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('axis', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[
			          true,
			          false,
			          \{ x: \{ property: 'd' \} \},
			          \{ y: \{ property: 'a' \} \},
			          \{ x: \{ property: 'd', granularity: 'fine' \} \},
			          \{ y: \{ property: 'a', granularity: 'fine' \} \},
			        ].map((axis, i) => (
			          // eslint-disable-next-line react/no-array-index-key
			          <DataChart key=\{i\} data=\{data\} series="a" axis=\{axis\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('dates', () => \{
			    const dateData = [];
			    for (let i = 0; i < 4; i += 1) \{
			      const digits = ((i % 12) + 1).toString().padStart(2, 0);
			      dateData.push(\{
			        second: \`2020-05-15T08:04:\$\{digits\}\`,
			        minute: \`2020-05-15T08:\$\{digits\}:00\`,
			        hour: \`2020-05-15T\$\{digits\}:00:00\`,
			        day: \`2020-05-\$\{digits\}T08:00:00\`,
			        month: \`2020-\$\{digits\}-15\`,
			        year: \`20\$\{digits\}-01-15\`,
			        percent: Math.abs(i * 10),
			        amount: i * 111111,
			      \});
			    \}
			    const \{ container \} = render(
			      <Grommet>
			        \{['second', 'minute', 'hour', 'day', 'month', 'year'].map((key) => (
			          <Fragment key=\{key\}>
			            <DataChart
			              data=\{dateData\}
			              series=\{[\{ property: key \}, 'amount']\}
			              axis
			              guide
			            />
			          </Fragment>
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('guide', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[
			          true,
			          false,
			          \{ x: \{ granularity: 'fine' \} \},
			          \{ y: \{ granularity: 'fine' \} \},
			        ].map((guide, i) => (
			          // eslint-disable-next-line react/no-array-index-key
			          <DataChart key=\{i\} data=\{data\} series="a" guide=\{guide\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('legend', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[true, false].map((legend, i) => (
			          // eslint-disable-next-line react/no-array-index-key
			          <DataChart key=\{i\} data=\{data\} series="a" legend=\{legend\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('detail', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[true, false].map((detail, i) => (
			          // eslint-disable-next-line react/no-array-index-key
			          <DataChart key=\{i\} data=\{data\} series="a" detail=\{detail\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('detail pad + thickness', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart data=\{data\} series="a" detail />
			        <DataChart data=\{data\} series="a" detail pad="small" />
			        <DataChart
			          data=\{data\}
			          series="a"
			          detail
			          pad=\{\{ horizontal: 'small' \}\}
			        />
			        <DataChart data=\{data\} series="a" detail pad=\{\{ vertical: 'small' \}\} />
			        <DataChart
			          data=\{data\}
			          series="a"
			          chart=\{[\{ property: 'a', thickness: 'large' \}]\}
			          detail
			          pad=\{\{ horizontal: 'xlarge' \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('axis x granularity', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((count) => (
			          <DataChart
			            key=\{count\}
			            data=\{Array.from(\{ length: count \}, (x, i) => (\{ a: i \}))\}
			            series="a"
			            axis=\{\{ x: \{ granularity: 'medium' \} \}\}
			          />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('type', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['bar', 'line', 'area'].map((type) => (
			          <DataChart
			            key=\{type\}
			            data=\{data\}
			            series="a"
			            chart=\{[\{ property: 'a', type \}]\}
			          />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('bars', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data\}
			          series=\{['a', 'c']\}
			          chart=\{[\{ property: ['a', 'c'], type: 'bars' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('bars colors', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data\}
			          series=\{['a', 'c']\}
			          chart=\{[
			            \{
			              property: [
			                \{ property: 'a', color: 'graph-1' \},
			                \{ property: 'c', color: 'graph-3' \},
			              ],
			              type: 'bars',
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('bars invalid', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data\}
			          series=\{['a']\}
			          chart=\{[\{ property: ['a', 'c', ''], type: 'bars' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('bars empty', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data\}
			          series=\{['a']\}
			          chart=\{[\{ property: [], type: 'bars' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('areas', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data\}
			          series=\{['a', 'c']\}
			          chart=\{[
			            \{
			              property: [
			                \{ property: 'a', thickness: 'hair', opacity: 'medium' \},
			                'c',
			              ],
			              type: 'areas',
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('lines', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data\}
			          series=\{['a', 'c']\}
			          chart=\{[\{ property: ['a', 'c'], type: 'lines' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('offset', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart data=\{data\} series=\{['a', 'c']\} offset />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('offset gap', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data\}
			          series=\{['a', 'c']\}
			          offset=\{\{ gap: 'xxsmall' \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('bounds align', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart data=\{data\} series=\{['a', 'c']\} bounds="align" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('bounds explicit', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart data=\{data\} series=\{['a', 'c']\} bounds=\{\{ y: [0, 100] \}\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('negative values', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[undefined, 'coarse', 'medium', 'find'].map((granularity) => (
			          <DataChart
			            key=\{granularity || 'u'\}
			            data=\{[\{ a: 1 \}, \{ a: -2 \}, \{ a: 3 \}]\}
			            series=\{['a']\}
			          />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('placeholder text', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data.map((\{ d \}) => (\{ d \}))\} // date only
			          series=\{['d', 'a']\}
			          bounds=\{\{ y: [0, 100] \}\}
			          placeholder="no data"
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('placeholder node', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataChart
			          data=\{data.map((\{ d \}) => (\{ d \}))\} // date only
			          series=\{['d', 'a']\}
			          bounds=\{\{ y: [0, 100] \}\}
			          placeholder=\{
			            <Box fill background="light-3" align="center" justify="center">
			              <Text>no data</Text>
			            </Box>
			          \}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\DataChart\\__tests__\\DataChart-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(27)
    });
    it('grommet_grommet\\src\\js\\components\\DataTable\\__tests__\\DataTable-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ render, fireEvent \} from '@testing-library/react';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Box \} from '../../Box';
			import \{ Text \} from '../../Text';
			import \{ DataTable \} from '..';
			
			const DATA = [];
			for (let i = 0; i < 95; i += 1) \{
			  DATA.push(\{ a: \`entry-\$\{i\}\`, b: i \});
			\}
			
			describe('DataTable', () => \{
			  test('empty', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('!primaryKey', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          primaryKey=\{false\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('paths', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b.c', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: \{ c: 1 \} \},
			            \{ a: 'two', b: \{ c: 2 \} \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('primaryKey', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          primaryKey="b"
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('footer', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A', footer: 'Total' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('footer node', () => \{
			    const \{ getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A', footer: <span>Total</span> \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(getByText('Total')).not.toBeNull();
			  \});
			
			  test('sortable', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'zero', b: 0 \},
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          sortable
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const headerCell = getByText('A');
			    fireEvent.click(headerCell, \{\});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('sort null data', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			            \{ property: 'c', header: 'C' \},
			            \{ property: 'd', header: 'D' \},
			          ]\}
			          data=\{[
			            \{ a: undefined, b: 0, c: 'first', d: 'y' \},
			            \{ a: 'one', b: 1, c: null \},
			            \{ a: 'two', b: 2, c: 'second' \},
			            \{ a: undefined, b: 3, c: null, d: 'z' \},
			          ]\}
			          sortable
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    let headerCell = getByText('A');
			    fireEvent.click(headerCell, \{\});
			    expect(container.firstChild).toMatchSnapshot();
			    headerCell = getByText('C');
			    fireEvent.click(headerCell, \{\});
			    expect(container.firstChild).toMatchSnapshot();
			    headerCell = getByText('D');
			    fireEvent.click(headerCell, \{\});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onSort', () => \{
			    const onSort = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'zero', b: 0 \},
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          onSort=\{onSort\}
			          sortable
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const headerCell = getByText('A');
			    fireEvent.click(headerCell, \{\});
			    expect(onSort).toBeCalledWith(
			      expect.objectContaining(\{ property: 'a', direction: 'asc' \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onSort external', () => \{
			    const onSort = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'zero', b: 0 \},
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          onSort=\{onSort\}
			          sort=\{\{ property: 'a', direction: 'asc', external: true \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const headerCell = getByText('A');
			    fireEvent.click(headerCell, \{\});
			    expect(onSort).toBeCalledWith(
			      expect.objectContaining(\{
			        property: 'a',
			        direction: 'desc',
			        external: true,
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('sort', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'zero', b: 0 \},
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          sort=\{\{ property: 'a', direction: 'asc' \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('sort nested object', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{
			              property: 'b.value',
			              header: 'Value',
			              render: (datum) => datum.b && datum.b.value,
			            \},
			          ]\}
			          data=\{[
			            \{ a: 'zero', b: \{ value: 1 \} \},
			            \{ a: 'one', b: \{ value: 2 \} \},
			            \{ a: 'two', b: \{ value: 3 \} \},
			          ]\}
			          sort=\{\{ property: 'b.value', direction: 'asc' \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.querySelectorAll('td').item(0).textContent).toBe('1');
			    expect(container.querySelectorAll('td').item(1).textContent).toBe('2');
			    expect(container.querySelectorAll('td').item(2).textContent).toBe('3');
			
			    fireEvent.click(getByText('Value'));
			
			    expect(container.querySelectorAll('td').item(0).textContent).toBe('3');
			    expect(container.querySelectorAll('td').item(1).textContent).toBe('2');
			    expect(container.querySelectorAll('td').item(2).textContent).toBe('1');
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('sort nested object with onSort', () => \{
			    const onSort = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{
			              property: 'b.value',
			              header: 'Value',
			              render: (datum) => datum.b && datum.b.value,
			            \},
			          ]\}
			          data=\{[
			            \{ a: 'zero', b: \{ value: 1 \} \},
			            \{ a: 'one', b: \{ value: 2 \} \},
			            \{ a: 'two', b: \{ value: 3 \} \},
			          ]\}
			          onSort=\{onSort\}
			          sort=\{\{ property: 'b.value', direction: 'asc' \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.querySelectorAll('td').item(0).textContent).toBe('1');
			    expect(container.querySelectorAll('td').item(1).textContent).toBe('2');
			    expect(container.querySelectorAll('td').item(2).textContent).toBe('3');
			
			    fireEvent.click(getByText('Value'));
			
			    expect(onSort).toBeCalledWith(
			      expect.objectContaining(\{ property: 'b.value' \}),
			    );
			
			    expect(container.querySelectorAll('td').item(0).textContent).toBe('3');
			    expect(container.querySelectorAll('td').item(1).textContent).toBe('2');
			    expect(container.querySelectorAll('td').item(2).textContent).toBe('1');
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('sort external', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'zero', b: 0 \},
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          sort=\{\{ property: 'a', direction: 'asc', external: true \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('search', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[\{ property: 'a', header: 'A', search: true \}]\}
			          data=\{[\{ a: 'Alpha' \}, \{ a: 'beta' \}, \{ a: '[]' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(container.querySelector('[aria-label="Open search by a"]'));
			    const searchInput = container.querySelector('[name="search-a"]');
			    expect(document.activeElement).toBe(searchInput);
			    fireEvent.change(searchInput, \{
			      target: \{ value: '[' \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('resizeable', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          resizeable
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('aggregate', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{
			              property: 'b',
			              header: 'B',
			              aggregate: 'sum',
			              footer: \{ aggregate: true \},
			            \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('aggregate with nested object', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{
			              property: 'obj.value',
			              header: 'object',
			              aggregate: 'sum',
			              footer: \{ aggregate: true \},
			            \},
			            \{
			              property: 'obj2.value',
			              header: 'object 2',
			              render: (datum) => datum.obj2.value,
			            \},
			          ]\}
			          data=\{[
			            \{ a: 'one', obj: \{ value: 1 \}, obj2: \{ value: 10 \} \},
			            \{ a: 'two', obj: \{ value: 2 \}, obj2: \{ value: 20 \} \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(getByText('3')).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('rowDetails', () => \{
			    const \{ container, getAllByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          rowDetails=\{(row) => <Box>\{row.a\}</Box>\}
			          primaryKey="b"
			        />
			      </Grommet>,
			    );
			    const expandButtons = getAllByLabelText('expand');
			    fireEvent.click(expandButtons[1], \{\});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('rowDetails condtional', () => \{
			    const \{ container, getAllByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          rowDetails=\{(row) => \{
			            if (row.b === '1.1') \{
			              return <Box> \{row.a\} </Box>;
			            \}
			            return (
			              <Box>
			                \{row.a\} : \{row.b\}\{' '\}
			              </Box>
			            );
			          \}\}
			          primaryKey="b"
			        />
			      </Grommet>,
			    );
			    const expandButtons = getAllByLabelText('expand');
			    fireEvent.click(expandButtons[1], \{\});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			  test('groupBy', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          groupBy="a"
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const headerCell = getByText('A');
			    fireEvent.click(headerCell, \{\});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('groupBy toggle', () => \{
			    function TestComponent() \{
			      const [groupBy, setGroupBy] = React.useState();
			      const toggle = () => setGroupBy(groupBy === undefined ? 'a' : undefined);
			
			      return (
			        <Grommet>
			          <button type="button" onClick=\{toggle\}>
			            toggle
			          </button>
			          <DataTable
			            columns=\{[
			              \{ property: 'a', header: 'A' \},
			              \{ property: 'b', header: 'B' \},
			            ]\}
			            data=\{[
			              \{ a: 'one', b: 1.1 \},
			              \{ a: 'one', b: 1.2 \},
			              \{ a: 'two', b: 2.1 \},
			              \{ a: 'two', b: 2.2 \},
			            ]\}
			            groupBy=\{groupBy\}
			          />
			        </Grommet>
			      );
			    \}
			    const \{ container, getByText \} = render(<TestComponent />);
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('toggle'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('toggle'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('click', () => \{
			    const onClickRow = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[\{ property: 'a', header: 'A' \}]\}
			          data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\}
			          onClickRow=\{onClickRow\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('beta'));
			    expect(onClickRow).toBeCalledWith(
			      expect.objectContaining(\{ datum: \{ a: 'beta' \} \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled click', () => \{
			    const onClickRow = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[\{ property: 'a', header: 'A' \}]\}
			          data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\}
			          disabled=\{['alpha']\}
			          onClickRow=\{onClickRow\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('beta'));
			    expect(onClickRow).toBeCalledWith(
			      expect.objectContaining(\{ datum: \{ a: 'beta' \} \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('background', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[
			          'accent-1',
			          ['accent-1', 'accent-2'],
			          \{ header: 'accent-1', body: 'accent-2', footer: 'accent-3' \},
			        ].map((background) => (
			          <DataTable
			            key=\{JSON.stringify(background)\}
			            columns=\{[
			              \{ property: 'a', header: 'A', footer: 'Total' \},
			              \{ property: 'b', header: 'B' \},
			            ]\}
			            data=\{[
			              \{ a: 'one', b: 1 \},
			              \{ a: 'two', b: 2 \},
			            ]\}
			            background=\{background\}
			          />
			        ))\}
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[
			          true,
			          'top',
			          \{ color: 'accent-1', side: 'top', size: 'small' \},
			          \{
			            header: 'top',
			            body: \{ color: 'accent-1', side: 'top', size: 'small' \},
			          \},
			        ].map((border) => (
			          <DataTable
			            key=\{JSON.stringify(border)\}
			            columns=\{[
			              \{ property: 'a', header: 'A', footer: 'Total' \},
			              \{ property: 'b', header: 'B' \},
			            ]\}
			            data=\{[
			              \{ a: 'one', b: 1 \},
			              \{ a: 'two', b: 2 \},
			            ]\}
			            border=\{border\}
			          />
			        ))\}
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[
			          'small',
			          \{ vertical: 'small', horizontal: 'medium' \},
			          \{
			            header: 'small',
			            body: \{ vertical: 'small', horizontal: 'medium' \},
			          \},
			        ].map((pad) => (
			          <DataTable
			            key=\{JSON.stringify(pad)\}
			            columns=\{[
			              \{ property: 'a', header: 'A', footer: 'Total' \},
			              \{ property: 'b', header: 'B' \},
			            ]\}
			            data=\{[
			              \{ a: 'one', b: 1 \},
			              \{ a: 'two', b: 2 \},
			            ]\}
			            pad=\{pad\}
			          />
			        ))\}
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('rowProps', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A', footer: 'Total' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          rowProps=\{\{
			            one: \{ background: 'accent-1', border: 'bottom', pad: 'large' \},
			          \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('groupBy property', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          groupBy=\{\{ property: 'a' \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const headerCell = getByText('A');
			    fireEvent.click(headerCell, \{\});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('groupBy expand', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          primaryKey="b"
			          groupBy=\{\{ property: 'a', expand: ['one'] \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('groupBy onExpand', () => \{
			    const onExpand = jest.fn((groupState) => groupState);
			    const \{ getAllByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          primaryKey="b"
			          groupBy=\{\{ property: 'a', onExpand \}\}
			        />
			      </Grommet>,
			    );
			
			    const expandButtons = getAllByLabelText('expand');
			    fireEvent.click(expandButtons[1], \{\});
			
			    expect(onExpand).toBeCalled();
			    expect(onExpand.mock.results[0].value).toEqual(['one']);
			    expect(onExpand.mock.results[0].value).toMatchSnapshot();
			  \});
			
			  test('replace', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          primaryKey="b"
			          step=\{2\}
			          replace
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('themeColumnSizes', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A', size: 'medium' \},
			            \{ property: 'b', header: 'B', size: 'small' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('absoluteColumnSizes', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A', size: '400px' \},
			            \{ property: 'b', header: 'B', size: '200px' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('relativeColumnSizes', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A', size: '2/3' \},
			            \{ property: 'b', header: 'B', size: '1/3' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[true, 'horizontal', 'vertical'].map((fill) => (
			          <DataTable
			            key=\{JSON.stringify(fill)\}
			            columns=\{[
			              \{ property: 'a', header: 'A', footer: 'Total' \},
			              \{ property: 'b', header: 'B' \},
			            ]\}
			            data=\{[
			              \{ a: 'one', b: 1 \},
			              \{ a: 'two', b: 2 \},
			            ]\}
			            fill=\{fill\}
			          />
			        ))\}
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pin', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[true, 'header', 'footer'].map((pin) => (
			          <DataTable
			            key=\{JSON.stringify(pin)\}
			            columns=\{[
			              \{ property: 'a', header: 'A', footer: 'Total', pin: true \},
			              \{ property: 'b', header: 'B' \},
			            ]\}
			            data=\{[
			              \{ a: 'one', b: 1 \},
			              \{ a: 'two', b: 2 \},
			            ]\}
			            pin=\{pin\}
			          />
			        ))\}
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pin + background', () => \{
			    const theme = \{
			      dataTable: \{
			        pinned: \{
			          header: \{
			            background: \{
			              color: 'blue',
			            \},
			          \},
			          footer: \{
			            background: \{
			              color: 'green',
			            \},
			          \},
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{theme\}>
			        \{[true, 'header', 'footer'].map((pin) => (
			          <DataTable
			            background=\{\{ pinned: 'red' \}\}
			            key=\{JSON.stringify(pin)\}
			            columns=\{[
			              \{ property: 'a', header: 'A', footer: 'Total', pin: true \},
			              \{ property: 'b', header: 'B' \},
			            ]\}
			            data=\{[
			              \{ a: 'one', b: 1 \},
			              \{ a: 'two', b: 2 \},
			            ]\}
			            pin=\{pin\}
			          />
			        ))\}
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pin + background context', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[
			          'background-back',
			          'background-front',
			          \{ color: 'background-back', dark: true \},
			        ].map((contextBackground) => (
			          <Box key=\{contextBackground\} background=\{contextBackground\}>
			            <DataTable
			              columns=\{[
			                \{ property: 'a', header: 'A', footer: 'Total', pin: true \},
			                \{ property: 'b', header: 'B' \},
			              ]\}
			              data=\{[
			                \{ a: 'one', b: 1 \},
			                \{ a: 'two', b: 2 \},
			              ]\}
			              pin
			            />
			          </Box>
			        ))\}
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('select', () => \{
			    const onSelect = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[\{ property: 'a', header: 'A' \}]\}
			          data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\}
			          primaryKey="a"
			          select=\{['alpha']\}
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByLabelText('select beta'));
			    expect(onSelect).toBeCalledWith(
			      expect.arrayContaining(['alpha', 'beta']),
			      undefined,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled select', () => \{
			    const onSelect = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[\{ property: 'a', header: 'A' \}]\}
			          data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\}
			          primaryKey="a"
			          disabled=\{['alpha']\}
			          select=\{['beta']\}
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('alpha'));
			    expect(onSelect).not.toBeCalled();
			  \});
			
			  test('custom theme', () => \{
			    const customTheme = \{
			      dataTable: \{
			        header: \{
			          background: 'skyblue',
			          border: \{
			            color: 'brand',
			            size: 'medium',
			          \},
			          gap: 'none',
			          pad: \{ horizontal: 'small', vertical: 'xsmall' \},
			          font: \{
			            weight: 'bold',
			          \},
			          hover: \{
			            background: \{
			              color: 'light-2',
			            \},
			          \},
			        \},
			        resize: \{
			          hover: \{
			            border: \{
			              color: 'red',
			              side: 'end',
			              size: 'xsmall',
			            \},
			          \},
			        \},
			      \},
			    \};
			
			    const \{ container, getByLabelText \} = render(
			      <Grommet theme=\{customTheme\}>
			        <DataTable
			          columns=\{[\{ property: 'a', header: 'A' \}]\}
			          data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\}
			          primaryKey="a"
			          select=\{['alpha']\}
			          sortable
			          resizeable
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOver(getByLabelText('select beta'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('units', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A', footer: 'Total' \},
			            \{ property: 'b', header: 'B', units: '(TiB)' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('placeholder', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A', footer: 'Total' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          placeholder="test placeholder"
			        />
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          placeholder=\{<Text weight="bold">test placeholder</Text>\}
			        />
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          placeholder=\{<Text weight="bold">test placeholder</Text>\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should paginate', () => \{
			    const \{ container, getAllByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{DATA\}
			          paginate
			        />
			      </Grommet>,
			    );
			
			    const results = getAllByText('entry', \{ exact: false \});
			    // default DataTable step 50
			    expect(results.length).toEqual(50);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should apply pagination styling', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{DATA\}
			          paginate=\{\{ background: 'red', margin: 'large' \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should show correct item index when "show" is a number', () => \{
			    const show = 15;
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{DATA\}
			          paginate
			          show=\{show\}
			        />
			      </Grommet>,
			    );
			
			    const result = getByText(\`entry-\$\{show\}\`);
			    expect(result).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should show correct page when "show" is \{ page: # \}', () => \{
			    const desiredPage = 2;
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{DATA\}
			          paginate
			          show=\{\{ page: desiredPage \}\}
			        />
			      </Grommet>,
			    );
			
			    const activePage = container.querySelector(
			      \`[aria-current="page"]\`,
			    ).innerHTML;
			
			    expect(activePage).toEqual(\`\$\{desiredPage\}\`);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should render correct num items per page (step)', () => \{
			    const step = 14;
			    const \{ container, getAllByText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{DATA\}
			          paginate
			          step=\{step\}
			        />
			      </Grommet>,
			    );
			
			    const results = getAllByText('entry', \{ exact: false \});
			
			    expect(results.length).toEqual(step);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should render new data when page changes', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{DATA\}
			          paginate
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByLabelText('Go to next page'));
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should not show paginate controls when data is empty array', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[]\}
			          paginate
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should not show paginate controls when length of data < step', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: \`entry-1\`, b: 1 \},
			            \{ a: \`entry-2\`, b: 2 \},
			            \{ a: \`entry-3\`, b: 3 \},
			          ]\}
			          paginate
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onSelect select/unselect all', () => \{
			    const onSelect = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B', primary: true \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    let headerCheckBox;
			    headerCheckBox = getByLabelText('select all');
			    fireEvent.click(headerCheckBox);
			    expect(onSelect).toBeCalledWith([1.1, 1.2, 2.1, 2.2]);
			    expect(container.firstChild).toMatchSnapshot();
			
			    // aria-label should have changed since all entries
			    // are selected
			    headerCheckBox = getByLabelText('unselect all');
			    fireEvent.click(headerCheckBox);
			    expect(onSelect).toBeCalledWith([]);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onSelect + groupBy should select/deselect all when grouped', () => \{
			    const onSelect = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B', primary: true \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          groupBy="a"
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    let headerCheckBox;
			    headerCheckBox = getByLabelText('select all');
			    fireEvent.click(headerCheckBox);
			    expect(container.firstChild).toMatchSnapshot();
			
			    // aria-label should have changed since all entries
			    // are selected
			    headerCheckBox = getByLabelText('unselect all');
			    fireEvent.click(headerCheckBox);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onSelect + groupBy should select all items within a group', () => \{
			    const onSelect = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B', primary: true \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          groupBy="a"
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			
			    const groupCheckBox = getByLabelText('select one');
			    fireEvent.click(groupCheckBox);
			    expect(onSelect).toBeCalledWith(
			      expect.arrayContaining([1.1, 1.2]),
			      expect.objectContaining(\{ a: 'one' \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`onSelect + groupBy should render indeterminate checkbox on table and 
			  group if subset of group items are selected\`, () => \{
			    const onSelect = jest.fn();
			    const \{ container, getAllByLabelText, getByLabelText \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          groupBy="a"
			          primaryKey="b"
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			
			    const groupCheckBox = getByLabelText('select one');
			    fireEvent.click(groupCheckBox);
			    const expandButtons = getAllByLabelText('expand');
			    fireEvent.click(expandButtons[1], \{\});
			
			    fireEvent.click(getByLabelText('unselect 1.1'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`onSelect + groupBy should render indeterminate checkbox on table and 
			  group when controlled\`, () => \{
			    const onSelect = jest.fn();
			    const \{ container \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b', header: 'B', primary: true \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: 1.1 \},
			            \{ a: 'one', b: 1.2 \},
			            \{ a: 'two', b: 2.1 \},
			            \{ a: 'two', b: 2.2 \},
			          ]\}
			          groupBy="a"
			          select=\{[1.1]\}
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('verticalAlign', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <DataTable
			          columns=\{[
			            \{ property: 'a', header: 'A' \},
			            \{ property: 'b.c', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'one', b: \{ c: 1 \} \},
			            \{ a: 'two', b: \{ c: 2 \} \},
			          ]\}
			          verticalAlign="top"
			        />
			        <DataTable
			          columns=\{[
			            \{
			              property: 'This is a long header that wraps',
			              header: 'A',
			              footer: 'This is a long footer that wraps',
			              size: 'xsmall',
			            \},
			            \{ property: 'b.c', header: 'B' \},
			          ]\}
			          data=\{[
			            \{ a: 'this is long data that might wrap also', b: \{ c: 1 \} \},
			            \{ a: 'two', b: \{ c: 2 \} \},
			          ]\}
			          verticalAlign=\{\{
			            header: 'bottom',
			            body: 'top',
			            footer: 'top',
			          \}\}
			        />
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\DataTable\\__tests__\\DataTable-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(59)
    });
    it('grommet_grommet\\src\\js\\components\\DateInput\\__tests__\\DateInput-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			import userEvent from '@testing-library/user-event';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import '@testing-library/jest-dom';
			import \{ Calendar as CalendarIcon, Clock as ClockIcon \} from 'grommet-icons';
			
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			import \{ Grommet \} from '../../Grommet';
			import \{ Button \} from '../../Button';
			import \{ DateInput \} from '..';
			import \{ Form \} from '../../Form';
			import \{ FormField \} from '../../FormField';
			
			const DATE = '2020-07-02T00:00:00-08:00';
			const DATE_FIRST = '2020-07-01T00:00:00-08:00';
			const DATES = ['2020-07-02T00:00:00-08:00', '2020-07-07T00:00:00-08:00'];
			const DATE_NOTZ = '2020-07-02';
			const DATES_NOTZ = ['2020-07-02', '2020-07-07'];
			
			describe('DateInput', () => \{
			  beforeEach(createPortal);
			
			  test('should reset date if passed empty string', async () => \{
			    const Test = () => \{
			      const [value, setValue] = React.useState(DATE);
			      return (
			        <Grommet>
			          <DateInput
			            id="item"
			            name="item"
			            format="mm/dd/yyyy"
			            value=\{value\}
			            inline
			          />
			          <Button label="Reset Date" onClick=\{() => setValue('')\} />
			        </Grommet>
			      );
			    \};
			    const \{ container, getByText \} = render(<Test />);
			    let dateInputValue = (container.querySelector('#item') as HTMLInputElement)
			      .value;
			
			    expect(dateInputValue).not.toEqual('');
			    fireEvent.click(getByText('Reset Date'));
			    dateInputValue = (container.querySelector('#item') as HTMLInputElement)
			      .value;
			    expect(dateInputValue).toEqual('');
			  \});
			
			  test('should reset date if passed an []', async () => \{
			    const Test = () => \{
			      const [value, setValue] = React.useState(DATES);
			      return (
			        <Grommet>
			          <DateInput
			            id="item"
			            name="item"
			            format="mm/dd/yyyy"
			            value=\{value\}
			            inline
			          />
			          <Button label="Reset Date" onClick=\{() => setValue([])\} />
			        </Grommet>
			      );
			    \};
			    const \{ container, getByText \} = render(<Test />);
			    let dateInputValue = (container.querySelector('#item') as HTMLInputElement)
			      .value;
			
			    expect(dateInputValue).not.toEqual('');
			    fireEvent.click(getByText('Reset Date'));
			    dateInputValue = (container.querySelector('#item') as HTMLInputElement)
			      .value;
			    expect(dateInputValue).toEqual('');
			  \});
			
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput format="mm/dd/yyyy" />
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput id="item" name="item" value=\{DATE\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('format', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput id="item" name="item" format="mm/dd/yyyy" value=\{DATE\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('reverse calendar icon', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="dd/mm/yyyy"
			          reverse
			          value=\{DATES\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('input props reverse as false', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="dd/mm/yyyy"
			          inputProps=\{\{ reverse: false \}\}
			          value=\{DATES\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('input props reverse as true', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="dd/mm/yyyy"
			          inputProps=\{\{ reverse: true \}\}
			          value=\{DATES\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('input props reverse as false with icon', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="dd/mm/yyyy"
			          icon=\{<ClockIcon />\}
			          inputProps=\{\{ reverse: false \}\}
			          value=\{DATES\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('input props reverse as true with icon', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="dd/mm/yyyy"
			          icon=\{<ClockIcon />\}
			          inputProps=\{\{ reverse: true \}\}
			          value=\{DATES\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('inline', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput id="item" name="item" inline value=\{DATE\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('format inline', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          inline
			          value=\{DATE\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('format disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          disabled
			          value=\{DATE\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('range', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput id="item" name="item" value=\{DATES\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('range inline', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput id="item" name="item" value=\{DATES\} inline />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('range format', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy-mm/dd/yyyy"
			          value=\{DATES\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('range format inline', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy-mm/dd/yyyy"
			          value=\{DATES\}
			          inline
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('dates initialized with empty array', async () => \{
			    const user = userEvent.setup();
			
			    const onChange = jest.fn((event) => event.value);
			
			    const \{ getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          defaultValue=\{[]\}
			          inline
			          onChange=\{onChange\}
			          calendarProps=\{\{
			            reference: DATE,
			          \}\}
			        />
			      </Grommet>,
			    );
			    await user.click(getByText('20'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith([
			      \`2020-07-20T08:00:00.000Z\`,
			      \`2020-07-20T08:00:00.000Z\`,
			    ]);
			  \});
			
			  test('focus', () => \{
			    const onFocus = jest.fn();
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          value=\{DATE\}
			          onFocus=\{onFocus\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.focus(getByPlaceholderText('mm/dd/yyyy'));
			    expect(onFocus).toHaveBeenCalled();
			
			    fireEvent.keyDown(getByPlaceholderText('mm/dd/yyyy'), \{
			      key: 'Space',
			      keyCode: 32,
			      which: 32,
			    \});
			    expect(document.getElementById('item__drop')).not.toBeNull();
			  \});
			
			  test('click', async () => \{
			    const user = userEvent.setup();
			
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          value=\{DATE\}
			          onFocus=\{() => \{\}\}
			        />
			      </Grommet>,
			    );
			
			    await user.click(getByPlaceholderText('mm/dd/yyyy'));
			    expect(document.getElementById('item__drop')).toBeNull();
			  \});
			
			  test('select inline', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          defaultValue=\{DATE\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('20'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-20T08:00:00.000Z');
			  \});
			
			  test('select inline without timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          defaultValue=\{DATE_NOTZ\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('20'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-20');
			  \});
			
			  test('select format inline', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          defaultValue=\{DATE\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('20'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-20T08:00:00.000Z');
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('select format inline', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ asFragment, getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          defaultValue=\{DATE_NOTZ\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.click(getByText('20'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-20');
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('select format', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          defaultValue=\{DATE\}
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.focus(getByPlaceholderText('mm/dd/yyyy'));
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.keyDown(getByPlaceholderText('mm/dd/yyyy'), \{
			      key: 'Space',
			      keyCode: 32,
			      which: 32,
			    \});
			    expectPortal('item__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('20'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-20T08:00:00.000Z');
			    expect(document.getElementById('item__drop')).toBeNull();
			  \});
			
			  test('select format no timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ asFragment, getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          defaultValue=\{DATE_NOTZ\}
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.focus(getByPlaceholderText('mm/dd/yyyy'));
			    expect(asFragment()).toMatchSnapshot();
			    fireEvent.keyDown(getByPlaceholderText('mm/dd/yyyy'), \{
			      key: 'Space',
			      keyCode: 32,
			      which: 32,
			    \});
			    expectPortal('item__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('20'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-20');
			    expect(document.getElementById('item__drop')).toBeNull();
			  \});
			
			  test('type format inline', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          defaultValue=\{DATE\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy'), \{
			      target: \{ value: '07/21/2020' \},
			    \});
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-21T08:00:00.000Z');
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('type format inline without timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ asFragment, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          defaultValue=\{DATE_NOTZ\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy'), \{
			      target: \{ value: '07/21/2020' \},
			    \});
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-21');
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('type format inline short', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="m/d/yy"
			          defaultValue=\{DATE\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('m/d/yy'), \{
			      target: \{ value: '7/21/20' \},
			    \});
			
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-21T08:00:00.000Z');
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('type format inline short without timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ asFragment, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="m/d/yy"
			          defaultValue=\{DATE_NOTZ\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('m/d/yy'), \{
			      target: \{ value: '7/21/20' \},
			    \});
			
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('2020-07-21');
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('type format inline partial', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          defaultValue=\{DATE\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy'), \{
			      target: \{ value: '07/21/202' \},
			    \});
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith(undefined);
			    // cannot check snapshot here as it will be relative to the current date
			  \});
			
			  test('type format inline partial without timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ asFragment, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy"
			          defaultValue=\{DATE_NOTZ\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy'), \{
			      target: \{ value: '07/21/202' \},
			    \});
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith(undefined);
			    // cannot check snapshot here as it will be relative to the current date
			  \});
			
			  test('select format inline range', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy-mm/dd/yyyy"
			          defaultValue=\{DATES\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    // new calendar logic adjust start date by default
			    fireEvent.click(getByText('10'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith([
			      '2020-07-10T08:00:00.000Z',
			      '2020-07-10T08:00:00.000Z',
			    ]);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('select format inline range without timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ asFragment, getByText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy-mm/dd/yyyy"
			          defaultValue=\{DATES_NOTZ\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    // new calendar logic adjust start date by default
			    fireEvent.click(getByText('10'));
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith(['2020-07-10', '2020-07-10']);
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('type format inline range', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy-mm/dd/yyyy"
			          defaultValue=\{DATES\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), \{
			      target: \{ value: '07/21/2020-07/23/2020' \},
			    \});
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith([
			      '2020-07-21T08:00:00.000Z',
			      '2020-07-23T08:00:00.000Z',
			    ]);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('type format inline range without timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ asFragment, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy-mm/dd/yyyy"
			          defaultValue=\{DATES_NOTZ\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), \{
			      target: \{ value: '07/21/2020-07/23/2020' \},
			    \});
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith(['2020-07-21', '2020-07-23']);
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('type format inline range partial', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy-mm/dd/yyyy"
			          defaultValue=\{DATES\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), \{
			      target: \{ value: '07/21/2020-07' \},
			    \});
			    expect(onChange).toHaveNthReturnedWith(1, ['2020-07-21T08:00:00.000Z']);
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), \{
			      target: \{ value: '07/21/2020-' \},
			    \});
			    expect(onChange).toHaveNthReturnedWith(2, ['2020-07-21T08:00:00.000Z']);
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), \{
			      target: \{ value: '07//2020-07/27/2021' \},
			    \});
			    // cannot check snapshot here as it will be relative to the current date
			
			    expect(onChange).toHaveBeenCalledTimes(2);
			  \});
			
			  test('type format inline range partial without timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const \{ asFragment, getByPlaceholderText \} = render(
			      <Grommet>
			        <DateInput
			          id="item"
			          name="item"
			          format="mm/dd/yyyy-mm/dd/yyyy"
			          defaultValue=\{DATES_NOTZ\}
			          inline
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), \{
			      target: \{ value: '07/21/2020-07' \},
			    \});
			    expect(onChange).toHaveNthReturnedWith(1, ['2020-07-21']);
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), \{
			      target: \{ value: '07/21/2020-' \},
			    \});
			    expect(onChange).toHaveNthReturnedWith(2, ['2020-07-21']);
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('mm/dd/yyyy-mm/dd/yyyy'), \{
			      target: \{ value: '07//2020-07/27/2021' \},
			    \});
			    // cannot check snapshot here as it will be relative to the current date
			
			    expect(onChange).toHaveBeenCalledTimes(2);
			  \});
			
			  test('controlled format inline', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const Test = () => \{
			      const [value, setValue] = React.useState(DATE);
			      return (
			        <Grommet>
			          <DateInput
			            id="item"
			            name="item"
			            format="mm/dd/yyyy"
			            value=\{value\}
			            inline
			            onChange=\{onChange\}
			          />
			          <Button label="first" onClick=\{() => setValue(DATE_FIRST)\} />
			        </Grommet>
			      );
			    \};
			    const \{ container, getByDisplayValue, getByText \} = render(<Test />);
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('first'));
			    expect(getByDisplayValue('07/01/2020')).not.toBeNull();
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onChange).not.toHaveBeenCalled();
			  \});
			
			  test('controlled format inline without timezone', () => \{
			    const onChange = jest.fn((event) => event.value);
			    const Test = () => \{
			      const [value, setValue] = React.useState(DATE_NOTZ);
			      return (
			        <Grommet>
			          <DateInput
			            id="item"
			            name="item"
			            format="mm/dd/yyyy"
			            value=\{value\}
			            inline
			            onChange=\{onChange\}
			          />
			          <Button label="first" onClick=\{() => setValue(DATE_FIRST)\} />
			        </Grommet>
			      );
			    \};
			    const \{ asFragment, getByDisplayValue, getByText \} = render(<Test />);
			    expect(asFragment()).toMatchSnapshot();
			
			    fireEvent.click(getByText('first'));
			    expect(getByDisplayValue('07/01/2020')).not.toBeNull();
			    expect(asFragment()).toMatchSnapshot();
			    expect(onChange).not.toHaveBeenCalled();
			  \});
			
			  test('should be displayed when value is controlled', async () => \{
			    const Test = () => \{
			      const [value, setValue] = React.useState<string[] | []>([]);
			      return (
			        <Grommet>
			          <DateInput
			            id="item"
			            name="item"
			            format="mm/dd/yyyy-mm/dd/yyyy"
			            value=\{value\}
			            inline
			          />
			          <Button label="Set Date" onClick=\{() => setValue(DATES)\} />
			        </Grommet>
			      );
			    \};
			    const \{ container, getByText \} = render(<Test />);
			    let dateInputValue = (container.querySelector('#item') as HTMLInputElement)
			      .value;
			
			    expect(dateInputValue).toEqual('');
			    fireEvent.click(getByText('Set Date'));
			    dateInputValue = (container.querySelector('#item') as HTMLInputElement)
			      .value;
			    expect(dateInputValue).toEqual('07/02/2020-07/07/2020');
			  \});
			
			  test('should be displayed when value is controlled without timezone', async () => \{
			    const Test = () => \{
			      const [value, setValue] = React.useState<string[] | []>([]);
			      return (
			        <Grommet>
			          <DateInput
			            id="item"
			            name="item"
			            format="mm/dd/yyyy-mm/dd/yyyy"
			            value=\{value\}
			            inline
			          />
			          <Button label="Set Date" onClick=\{() => setValue(DATES_NOTZ)\} />
			        </Grommet>
			      );
			    \};
			    const \{ container, getByText \} = render(<Test />);
			    let dateInputValue = (container.querySelector('#item') as HTMLInputElement)
			      .value;
			
			    expect(dateInputValue).toEqual('');
			    fireEvent.click(getByText('Set Date'));
			    dateInputValue = (container.querySelector('#item') as HTMLInputElement)
			      .value;
			    expect(dateInputValue).toEqual('07/02/2020-07/07/2020');
			  \});
			
			  test(\`dropProps should pass props to Drop
			  when not inline\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          dropProps=\{\{
			            plain: true,
			          \}\}
			          format="mm/dd/yyyy"
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`buttonProps should pass props to Button
			  when not inline and no format\`, () => \{
			    window.scrollTo = jest.fn();
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput
			          buttonProps=\{\{
			            disabled: true,
			          \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput disabled />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <DateInput size="xsmall" />
			        <DateInput size="small" />
			        <DateInput size="medium" />
			        <DateInput size="large" />
			        <DateInput size="xlarge" />
			        <DateInput size="xxlarge" />
			        <DateInput size="2xl" />
			        <DateInput size="3xl" />
			        <DateInput size="4xl" />
			        <DateInput size="5xl" />
			        <DateInput size="6xl" />
			        <DateInput size="16px" />
			        <DateInput size="1rem" />
			        <DateInput size="100%" />
			      </Grommet>,
			    );
			    expect(container.children).toMatchSnapshot();
			  \});
			
			  test('clicking calendar icon should open drop', async () => \{
			    const user = userEvent.setup();
			
			    render(
			      <Grommet>
			        <DateInput format="m/d/yy" defaultValue="2021-01-01" />
			      </Grommet>,
			    );
			    expect(
			      screen.queryByRole('heading', \{ name: /January 2021/i \}),
			    ).not.toBeInTheDocument();
			    await user.click(screen.getByRole('button', \{ name: /Calendar/i \}));
			    expect(
			      screen.getByRole('heading', \{ name: /January 2021/i \}),
			    ).toBeInTheDocument();
			  \});
			
			  test('handle focus in FormField', async () => \{
			    const user = userEvent.setup();
			
			    const onFocus = jest.fn();
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Form>
			          <FormField>
			            <DateInput format="mm/dd/yyyy" onFocus=\{onFocus\} />
			          </FormField>
			        </Form>
			      </Grommet>,
			    );
			    await user.tab();
			    expect(asFragment()).toMatchSnapshot();
			    await user.tab();
			    expect(asFragment()).toMatchSnapshot();
			    expect(onFocus).toHaveBeenCalledTimes(1);
			  \});
			
			  test('icon', () => \{
			    const \{ container \} = render(
			      <DateInput icon=\{<CalendarIcon color="red" />\} name="item" />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\DateInput\\__tests__\\DateInput-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(49)
    });
    it('grommet_grommet\\src\\js\\components\\Diagram\\__tests__\\Diagram-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import PropTypes from 'prop-types';
			import 'jest-styled-components';
			import \{ render \} from '@testing-library/react';
			
			import \{ Grommet, Box, Diagram, Stack \} from '../..';
			
			const Context = (\{ children \}: \{ children: React.ReactNode \}) => (
			  <Grommet>
			    <Stack>
			      <Box direction="row">
			        <Box id="1" pad="medium" />
			        <Box id="2" pad="medium" />
			      </Box>
			      \{children\}
			    </Stack>
			  </Grommet>
			);
			
			Context.propTypes = \{
			  children: PropTypes.node.isRequired,
			\};
			
			describe('Diagram', () => \{
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Context>
			        <Diagram connections=\{[\{ fromTarget: '1', toTarget: '2' \}]\} />
			      </Context>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('type', () => \{
			    const \{ container \} = render(
			      <Context>
			        <Diagram
			          connections=\{[
			            \{ fromTarget: '1', toTarget: '2', type: 'direct' \},
			            \{ fromTarget: '1', toTarget: '2', type: 'curved' \},
			            \{ fromTarget: '1', toTarget: '2', type: 'rectilinear' \},
			          ]\}
			        />
			      </Context>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('color', () => \{
			    const \{ container \} = render(
			      <Context>
			        <Diagram
			          connections=\{[\{ fromTarget: '1', toTarget: '2', color: 'brand' \}]\}
			        />
			      </Context>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('offset', () => \{
			    const \{ container \} = render(
			      <Context>
			        <Diagram
			          connections=\{[
			            \{ fromTarget: '1', toTarget: '2', offset: 'xsmall' \},
			            \{ fromTarget: '1', toTarget: '2', offset: 'small' \},
			            \{ fromTarget: '1', toTarget: '2', offset: 'medium' \},
			          ]\}
			        />
			      </Context>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('thickness', () => \{
			    const \{ container \} = render(
			      <Context>
			        <Diagram
			          connections=\{[
			            \{ fromTarget: '1', toTarget: '2', thickness: 'hair' \},
			            \{ fromTarget: '1', toTarget: '2', thickness: 'xxsmall' \},
			            \{ fromTarget: '1', toTarget: '2', thickness: 'xsmall' \},
			            \{ fromTarget: '1', toTarget: '2', thickness: 'small' \},
			            \{ fromTarget: '1', toTarget: '2', thickness: 'medium' \},
			            \{ fromTarget: '1', toTarget: '2', thickness: '5px' \},
			          ]\}
			        />
			      </Context>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('anchor', () => \{
			    const \{ container \} = render(
			      <Context>
			        <Diagram
			          connections=\{[
			            \{ fromTarget: '1', toTarget: '2', anchor: 'center' \},
			            \{ fromTarget: '1', toTarget: '2', anchor: 'horizontal' \},
			            \{ fromTarget: '1', toTarget: '2', anchor: 'vertical' \},
			          ]\}
			        />
			      </Context>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Diagram\\__tests__\\Diagram-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('grommet_grommet\\src\\js\\components\\Distribution\\__tests__\\Distribution-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ render \} from '@testing-library/react';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Distribution \} from '..';
			
			describe('Distribution', () => \{
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Distribution values=\{[]\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('values renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Distribution
			          values=\{[\{ value: 20 \}, \{ value: 3 \}, \{ value: 2 \}, \{ value: 1 \}]\}
			        >
			          \{value => <span>\{value.value\}</span>\}
			        </Distribution>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('undefined value', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Distribution values=\{[\{ value: 20 \}, \{ value: undefined \}]\}>
			          \{value => <span>\{value.value\}</span>\}
			        </Distribution>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('gap renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['xsmall', 'small', 'medium', 'large'].map(gap => (
			          <Distribution
			            key=\{gap\}
			            gap=\{gap\}
			            values=\{[\{ value: 3 \}, \{ value: 2 \}, \{ value: 1 \}]\}
			          >
			            \{value => <span>\{value.value\}</span>\}
			          </Distribution>
			        ))\}
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Distribution\\__tests__\\Distribution-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('grommet_grommet\\src\\js\\components\\Drop\\__tests__\\Drop-test.tsx', () => {
        const sourceCode = `
			import React, \{ useState, useEffect, useRef \} from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ axe \} from 'jest-axe';
			import \{ cleanup, fireEvent, render, waitFor \} from '@testing-library/react';
			
			import \{ expectPortal \} from '../../../utils/portal';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Drop, DropExtendedProps \} from '..';
			import \{ ThemeType \} from '../../../themes';
			
			const customTheme = \{
			  global: \{
			    drop: \{
			      elevation: 'large',
			      background: \{ dark: 'neutral-2', light: 'background-contrast' \},
			      border: \{ radius: '10px' \},
			      zIndex: '15',
			      margin: 'xsmall',
			    \},
			  \},
			\};
			
			interface TestInputProps extends DropExtendedProps \{
			  theme?: ThemeType;
			  containerTarget?: HTMLElement;
			  message?: string;
			\}
			const TestInput = (\{
			  theme,
			  containerTarget,
			  message = 'this is a test',
			  ...rest
			\}: TestInputProps) => \{
			  const [showDrop, setShowDrop] = useState<boolean>(false);
			
			  const inputRef = useRef<HTMLInputElement | null>(null);
			
			  useEffect(() => \{
			    setShowDrop(true);
			  \}, []);
			
			  let drop;
			
			  if (showDrop) \{
			    drop = (
			      <Drop id="drop-node" target=\{inputRef.current || undefined\} \{...rest\}>
			        \{message\}
			      </Drop>
			    );
			  \}
			  return (
			    <Grommet theme=\{theme\} containerTarget=\{containerTarget\}>
			      <input ref=\{inputRef\} aria-label="test" />
			      \{drop\}
			    </Grommet>
			  );
			\};
			
			interface TestButtonProps extends DropExtendedProps \{
			  theme?: ThemeType;
			  containerTarget?: HTMLElement;
			  message?: string;
			\}
			const TestButton = (\{
			  theme,
			  containerTarget,
			  message = 'this is a test',
			  ...rest
			\}: TestButtonProps) => \{
			  const [showDrop, setShowDrop] = useState<boolean>(false);
			
			  const buttonRef = useRef<HTMLButtonElement | null>(null);
			
			  useEffect(() => \{
			    setShowDrop(true);
			  \}, []);
			
			  let drop;
			
			  if (showDrop) \{
			    drop = (
			      <Drop
			        id="drop-node"
			        inline
			        target=\{buttonRef.current || undefined\}
			        \{...rest\}
			      >
			        \{message\}
			      </Drop>
			    );
			  \}
			  return (
			    <Grommet theme=\{theme\} containerTarget=\{containerTarget\}>
			      <button ref=\{buttonRef\} data-testid="drop-button" aria-label="test">
			        <span>click</span>
			        \{drop\}
			      </button>
			    </Grommet>
			  );
			\};
			
			describe('Drop', () => \{
			  test('should have no accessibility violations', async () => \{
			    window.scrollTo = jest.fn();
			    const \{ container \} = render(<TestInput />);
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('basic', () => \{
			    window.scrollTo = jest.fn();
			    render(<TestInput />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('align left right top bottom', () => \{
			    render(<TestInput align=\{\{ left: 'right', top: 'bottom' \}\} />);
			
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('align right right bottom top', () => \{
			    render(<TestInput align=\{\{ right: 'right', bottom: 'top' \}\} />);
			
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('align left left', () => \{
			    render(<TestInput align=\{\{ left: 'left', bottom: 'bottom' \}\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('align right left top top', () => \{
			    render(<TestInput align=\{\{ right: 'left', top: 'top' \}\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('align right right bottom top', () => \{
			    render(<TestInput align=\{\{ right: 'right', bottom: 'top' \}\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('align right right', () => \{
			    render(<TestInput align=\{\{ right: 'right' \}\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('invalid align', () => \{
			    // @ts-ignore
			    render(<TestInput align=\{\{ whatever: 'right' \}\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('no stretch', () => \{
			    render(<TestInput stretch=\{false\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('stretch = align', () => \{
			    const message =
			      'test test test test test test test test test test test test test test';
			    render(<TestInput stretch="align" message=\{message\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('close', () => \{
			    render(<TestInput />);
			    expectPortal('drop-node').toMatchSnapshot();
			
			    cleanup();
			    expect(document.getElementById('drop-node')).toBeNull();
			  \});
			
			  test('invoke onClickOutside', () => \{
			    const onClickOutside = jest.fn();
			    render(<TestInput onClickOutside=\{onClickOutside\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			
			    fireEvent(
			      document,
			      new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			    );
			    expect(onClickOutside).toBeCalled();
			  \});
			
			  test('resize', () => \{
			    render(<TestInput />);
			    Object.defineProperty(window, 'innerWidth', \{
			      writable: true,
			      configurable: true,
			      value: 1000,
			    \});
			    Object.defineProperty(window, 'innerHeight', \{
			      writable: true,
			      configurable: true,
			      value: 1000,
			    \});
			    fireEvent(window, new Event('resize', \{ bubbles: true, cancelable: true \}));
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('restrict focus', async () => \{
			    render(<TestInput restrictFocus />);
			    expect(document.activeElement).toMatchSnapshot();
			    expectPortal('drop-node').toMatchSnapshot();
			
			    await waitFor(() => cleanup());
			
			    expect(document.activeElement).toMatchSnapshot();
			  \});
			
			  test('default elevation renders', () => \{
			    render(<TestInput />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('theme elevation renders', () => \{
			    render(<TestInput theme=\{customTheme\} />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('elevation', () => \{
			    render(<TestInput theme=\{customTheme\} elevation="medium" />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('plain', () => \{
			    render(<TestInput plain />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('round', () => \{
			    render(<TestInput round="full" />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('margin', () => \{
			    render(<TestInput margin="small" />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('background', () => \{
			    render(<TestInput background="background-contrast" />);
			    expectPortal('drop-node').toMatchSnapshot();
			  \});
			
			  test('default containerTarget', () => \{
			    const \{ getByTestId \} = render(<TestInput data-testid="drop" />);
			    const actualRoot = getByTestId('drop')?.parentNode?.parentNode?.parentNode;
			    expect(actualRoot).toBe(document.body);
			  \});
			
			  const alignPositions: TestInputProps['align'][] = [
			    \{ top: 'bottom' \},
			    \{ top: 'top', left: 'right' \},
			    \{ top: 'top', right: 'left' \},
			    \{ top: 'bottom', right: 'left' \},
			    \{ top: 'bottom', right: 'right' \},
			    \{ top: 'bottom', left: 'right' \},
			    \{ top: 'bottom', left: 'left' \},
			    \{ bottom: 'top', right: 'left' \},
			    \{ right: 'right', bottom: 'top' \},
			    \{ bottom: 'top', left: 'left' \},
			    \{ bottom: 'top', left: 'right' \},
			    \{ bottom: 'top', right: 'left' \},
			    \{ bottom: 'bottom', left: 'right' \},
			    \{ bottom: 'bottom', right: 'left' \},
			  ];
			
			  alignPositions.forEach((alignPosition) => \{
			    const customMarginTheme = \{
			      global: \{
			        drop: \{
			          margin: 'small',
			          intelligentMargin: true,
			        \},
			      \},
			    \};
			
			    test(\`should render correct margin depending on value of align: 
			    \$\{JSON.stringify(alignPosition)\}\`, () => \{
			      render(
			        <TestInput
			          id="margin-drop-test"
			          theme=\{customMarginTheme\}
			          align=\{alignPosition\}
			        />,
			      );
			      expectPortal('margin-drop-test').toMatchSnapshot();
			    \});
			  \});
			\});
			
			test('custom containerTarget', () => \{
			  const target = document.createElement('div');
			  document.body.appendChild(target);
			  try \{
			    const \{ getByTestId \} = render(
			      <TestInput data-testid="drop" containerTarget=\{target\} />,
			    );
			    const actualRoot = getByTestId('drop')?.parentNode?.parentNode?.parentNode;
			    expect(actualRoot).toBe(target);
			  \} finally \{
			    document.body.removeChild(target);
			  \}
			\});
			
			test('inline', () => \{
			  window.scrollTo = jest.fn();
			  const \{ getByTestId \} = render(<TestButton />);
			  expect(getByTestId('drop-button')).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Drop\\__tests__\\Drop-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(26)
    });
    it('grommet_grommet\\src\\js\\components\\DropButton\\__tests__\\DropButton-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import 'jest-styled-components';
			
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ DropButton \} from '..';
			
			describe('DropButton', () => \{
			  beforeEach(createPortal);
			
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <DropButton
			        a11yTitle="test"
			        dropContent=\{<div id="drop-contents">drop contents</div>\}
			      />,
			    );
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('closed', () => \{
			    window.scrollTo = jest.fn();
			
			    const \{ container \} = render(
			      <DropButton
			        label="Dropper"
			        dropContent=\{<div id="drop-contents">drop contents</div>\}
			      />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('opened', () => \{
			    const \{ container \} = render(
			      <DropButton
			        label="Dropper"
			        open
			        dropContent=\{<div id="drop-contents">drop contents</div>\}
			      />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('open and close', () => \{
			    window.scrollTo = jest.fn();
			    const onClose = jest.fn((event) => event.persist());
			
			    const \{ getByText, container \} = render(
			      <DropButton
			        label="Dropper"
			        onClose=\{onClose\}
			        dropContent=\{<div id="drop-contents">Drop Contents</div>\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('drop-contents')).toBeNull();
			
			    fireEvent.click(getByText('Dropper'));
			    expectPortal('drop-contents').toMatchSnapshot();
			    expect(document.getElementById('drop-contents')).not.toBeNull();
			
			    fireEvent.click(getByText('Dropper'));
			    expect(document.getElementById('drop-contents')).toBeNull();
			    expect(window.scrollTo).toBeCalled();
			
			    expect(onClose).toBeCalledWith(expect.objectContaining(\{ type: 'click' \}));
			  \});
			
			  test('close by clicking outside', (done) => \{
			    const onClose = jest.fn();
			    const onOpen = jest.fn((event) => event.persist());
			
			    const \{ getByText, container \} = render(
			      <DropButton
			        label="Dropper"
			        onClose=\{onClose\}
			        onOpen=\{onOpen\}
			        dropContent=\{<div id="drop-contents">Drop Contents</div>\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('drop-contents')).toBeNull();
			
			    fireEvent.click(getByText('Dropper'));
			    expectPortal('drop-contents').toMatchSnapshot();
			
			    expect(onOpen).toBeCalledWith(expect.objectContaining(\{ type: 'click' \}));
			    expect(document.getElementById('drop-contents')).not.toBeNull();
			
			    fireEvent(
			      document,
			      new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			    );
			
			    setTimeout(() => \{
			      expect(document.getElementById('drop-contents')).toBeNull();
			      done();
			    \}, 50);
			
			    expect(onClose).toBeCalledWith(
			      expect.objectContaining(\{ type: 'mousedown' \}),
			    );
			  \});
			
			  test('disabled', () => \{
			    const \{ getByText, container \} = render(
			      <DropButton
			        disabled
			        label="Dropper"
			        dropContent=\{<div id="drop-contents">Drop Contents</div>\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('drop-contents')).toBeNull();
			
			    fireEvent.click(getByText('Dropper'));
			    expect(document.getElementById('drop-contents')).toBeNull();
			  \});
			
			  test('opened ref', () => \{
			    const ref = React.createRef();
			    const \{ container \} = render(
			      <DropButton
			        ref=\{ref\}
			        open
			        label="Dropper"
			        dropContent=\{<div id="drop-contents">Drop Contents</div>\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expectPortal('drop-contents').toMatchSnapshot();
			  \});
			
			  test('ref function', () => \{
			    const ref = jest.fn();
			    const \{ container \} = render(
			      <DropButton
			        ref=\{ref\}
			        open
			        label="Dropper"
			        dropContent=\{<div id="drop-contents">Drop Contents</div>\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(ref).toBeCalled();
			    expectPortal('drop-contents').toMatchSnapshot();
			  \});
			
			  test('rendersr a11yTitle and aria-label', () => \{
			    const LABEL = 'Test Label';
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <DropButton
			          label="Dropper"
			          aria-label=\{LABEL\}
			          dropContent=\{<div id="drop-contents">drop contents</div>\}
			        />
			        <DropButton
			          label="Dropper"
			          a11yTitle=\{\`\$\{LABEL\}-2\`\}
			          dropContent=\{<div id="drop-contents">drop contents</div>\}
			        />
			      </Grommet>,
			    );
			    expect(getByLabelText(LABEL)).toBeTruthy();
			    expect(getByLabelText(\`\$\{LABEL\}-2\`)).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\DropButton\\__tests__\\DropButton-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('grommet_grommet\\src\\js\\components\\FileInput\\__tests__\\FileInput-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ render \} from '@testing-library/react';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ FileInput \} from '..';
			
			describe('FileInput', () => \{
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FileInput name="file" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('multiple', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FileInput name="file" multiple />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('multiple aggregateThreshold', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FileInput name="file" multiple=\{\{ aggregateThreshold: 2 \}\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('accept', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FileInput name="file" accept="image/*" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FileInput name="file" disabled />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('messages', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FileInput
			          name="file"
			          messages=\{\{
			            browse: 'test browse',
			          \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('background', () => \{
			    const customTheme = \{
			      fileInput: \{
			        background: \{
			          color: 'background-contrast',
			        \},
			      \},
			    \};
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <FileInput name="file" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border', () => \{
			    const customTheme = \{
			      fileInput: \{
			        border: \{
			          color: 'brand',
			          size: 'large',
			        \},
			      \},
			    \};
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <FileInput name="file" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad', () => \{
			    const customTheme = \{
			      fileInput: \{
			        pad: 'small',
			      \},
			    \};
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <FileInput name="file" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('margin', () => \{
			    const customTheme = \{
			      fileInput: \{
			        margin: 'small',
			      \},
			    \};
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <FileInput name="file" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom theme input font size', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{\{ global: \{ input: \{ font: \{ size: '16px' \} \} \} \}\}>
			        <FileInput />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('maxSize', () => \{
			    const maxSize = 5000000;
			    const \{ container \} = render(
			      <Grommet>
			        <FileInput name="file" maxSize=\{maxSize\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('multiple max', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FileInput
			          name="file"
			          multiple=\{\{
			            max: 5,
			          \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\FileInput\\__tests__\\FileInput-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(13)
    });
    it('grommet_grommet\\src\\js\\components\\Footer\\__tests__\\Footer-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Footer \} from '..';
			
			describe('Footer', () => \{
			  test('default', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Footer />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Footer\\__tests__\\Footer-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('grommet_grommet\\src\\js\\components\\Form\\__tests__\\Form-test-controlled.js', () => {
        const sourceCode = `
			import React, \{ useState \} from 'react';
			
			import 'jest-styled-components';
			
			import \{ act, render, fireEvent, screen \} from '@testing-library/react';
			import \{ Grommet \} from '../../Grommet';
			import \{ Form \} from '..';
			import \{ FormField \} from '../../FormField';
			import \{ Button \} from '../../Button';
			import \{ TextInput \} from '../../TextInput';
			import \{ CheckBox \} from '../../CheckBox';
			import \{ Box \} from '../../Box';
			
			describe('Form controlled', () => \{
			  test('controlled', () => \{
			    const onSubmit = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{ test: '' \});
			      const onChange = React.useCallback(
			        (nextValue) => setValue(nextValue),
			        [],
			      );
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onSubmit=\{onSubmit\}>
			          <FormField name="test">
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'v' \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'v' \},
			        touched: \{ test: true \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled onValidate', () => \{
			    const onValidate = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{ test: '' \});
			      const onChange = React.useCallback(
			        (nextValue) => setValue(nextValue),
			        [],
			      );
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onValidate=\{onValidate\}>
			          <FormField name="test" required>
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onValidate).toBeCalledWith(
			      expect.objectContaining(\{
			        errors: \{ test: 'required' \},
			        infos: \{\},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled onValidate custom error', () => \{
			    const onValidate = jest.fn();
			    const errorMessage = 'One uppercase letter';
			    const testRules = \{
			      regexp: /(?=.*?[A-Z])/,
			      message: errorMessage,
			      status: 'error',
			    \};
			
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{ test: '' \});
			      const onChange = React.useCallback(
			        (nextValue) => setValue(nextValue),
			        [],
			      );
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onValidate=\{onValidate\}>
			          <FormField name="test" validate=\{testRules\}>
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onValidate).toBeCalledWith(
			      expect.objectContaining(\{
			        errors: \{ test: errorMessage \},
			        infos: \{\},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled onValidate custom info', () => \{
			    const onValidate = jest.fn();
			    const infoMessage = 'One uppercase letter';
			    const testRules = \{
			      regexp: /(?=.*?[A-Z])/,
			      message: infoMessage,
			      status: 'info',
			    \};
			
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{ test: '' \});
			      const onChange = React.useCallback(
			        (nextValue) => setValue(nextValue),
			        [],
			      );
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onValidate=\{onValidate\}>
			          <FormField name="test" validate=\{testRules\}>
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onValidate).toBeCalledWith(
			      expect.objectContaining(\{
			        errors: \{\},
			        infos: \{ test: infoMessage \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled lazy', () => \{
			    const onSubmit = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{ test: '' \});
			      React.useEffect(() => setValue(\{ test: 'test' \}), []);
			      const onChange = React.useCallback(
			        (nextValue) => setValue(nextValue),
			        [],
			      );
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onSubmit=\{onSubmit\}>
			          <FormField name="test">
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'v' \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'v' \},
			        touched: \{ test: true \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled input', () => \{
			    const onSubmit = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState('');
			      const onChange = React.useCallback(
			        (event) => setValue(event.target.value),
			        [],
			      );
			      return (
			        <Form onSubmit=\{onSubmit\}>
			          <FormField name="test">
			            <TextInput
			              name="test"
			              placeholder="test input"
			              value=\{value\}
			              onChange=\{onChange\}
			            />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'v' \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'v' \},
			        touched: \{ test: true \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled input lazy', () => \{
			    const onSubmit = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState('');
			      React.useEffect(() => setValue('test'), []);
			      const onChange = React.useCallback(
			        (event) => setValue(event.target.value),
			        [],
			      );
			      return (
			        <Form onSubmit=\{onSubmit\}>
			          <FormField name="test">
			            <TextInput
			              name="test"
			              placeholder="test input"
			              value=\{value\}
			              onChange=\{onChange\}
			            />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'v' \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'v' \},
			        touched: \{ test: true \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('lazy value', () => \{
			    const onSubmit = jest.fn();
			    const Test = () => \{
			      const [test, setTest] = React.useState('');
			      return (
			        <Form onSubmit=\{(\{ value, touched \}) => onSubmit(\{ value, touched \})\}>
			          <TextInput name="test" value=\{test\} />
			          <Button label="set" onClick=\{() => setTest('a')\} />
			          <Button label="submit" type="submit" />
			        </Form>
			      );
			    \};
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('set'));
			    fireEvent.click(getByText('submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'a' \},
			      \}),
			    );
			  \});
			
			  // deprecated FormField+input pattern
			  test('controlled FormField deprecated', () => \{
			    const onSubmit = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{ test: '' \});
			      const onChange = React.useCallback(
			        (nextValue) => setValue(nextValue),
			        [],
			      );
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onSubmit=\{onSubmit\}>
			          <FormField label="test" name="test" id="test" htmlFor="test" />
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByLabelText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByLabelText('test'), \{ target: \{ value: 'v' \} \});
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'v' \},
			        touched: \{ test: true \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled reset', () => \{
			    const onSubmit = jest.fn();
			    const onReset = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{ test: '' \});
			      const onChange = React.useCallback(
			        (nextValue) => setValue(nextValue),
			        [],
			      );
			      return (
			        <Grommet>
			          <Form
			            onReset=\{onReset\}
			            onChange=\{onChange\}
			            value=\{value\}
			            onSubmit=\{onSubmit\}
			          >
			            <FormField
			              a11yTitle="test"
			              name="test"
			              required
			              placeholder="test input"
			            />
			            <Button type="reset" primary label="Reset" />
			          </Form>
			        </Grommet>
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, queryByText \} = render(<Test />);
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'Input has changed' \},
			    \});
			    expect(getByPlaceholderText('test input').value).toBe('Input has changed');
			    fireEvent.click(getByText('Reset'));
			    expect(onReset).toBeCalledTimes(1);
			    expect(queryByText('Input has changed')).toBeNull();
			  \});
			
			  test('controlled onChange touched', () => \{
			    const onChange = jest.fn();
			    const onSubmit = jest.fn();
			    const Test = () => \{
			      const [value] = React.useState(\{ test: '' \});
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onSubmit=\{onSubmit\}>
			          <FormField name="test">
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'Input has changed' \},
			    \});
			
			    expect(onChange).toBeCalledWith(
			      \{ test: 'Input has changed' \},
			      \{ touched: \{ test: true \} \},
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`dynamicly removed fields using blur validation
			  don't keep validation errors\`, () => \{
			    jest.useFakeTimers();
			    const onValidate = jest.fn();
			    const onSubmit = jest.fn();
			
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{ name: '', toggle: false \});
			      return (
			        <Form
			          validate="blur"
			          value=\{value\}
			          onChange=\{(nextValue) => \{
			            const adjustedValue = \{ ...nextValue \};
			            if (!adjustedValue.toggle) delete adjustedValue.mood;
			            else if (!adjustedValue.mood) adjustedValue.mood = '';
			            setValue(adjustedValue);
			          \}\}
			          onValidate=\{onValidate\}
			          onSubmit=\{onSubmit\}
			        >
			          <FormField name="name">
			            <TextInput name="name" placeholder="test name" />
			          </FormField>
			          <FormField name="toggle">
			            <CheckBox name="toggle" label="toggle" />
			          </FormField>
			          \{value.toggle && (
			            <FormField name="mood" required>
			              <TextInput name="mood" placeholder="test mood" />
			            </FormField>
			          )\}
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByLabelText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const nameField = getByPlaceholderText('test name');
			    const toggleField = getByLabelText('toggle');
			
			    // add mood
			    fireEvent.click(toggleField);
			
			    expect(container.firstChild).toMatchSnapshot();
			    const moodField = getByPlaceholderText('test mood');
			
			    // focus in and out of mood, should fail validation
			    act(() => \{
			      moodField.focus();
			      toggleField.focus();
			    \});
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{
			        errors: \{ mood: 'required' \},
			        infos: \{\},
			        valid: false,
			      \}),
			    );
			
			    // set mood, should pass validation
			    act(() => moodField.focus());
			    fireEvent.change(moodField, \{ target: \{ value: 'testy' \} \});
			    act(() => toggleField.focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{ errors: \{\}, infos: \{\}, valid: true \}),
			    );
			
			    // clear mood, should fail validation
			    act(() => moodField.focus());
			    fireEvent.change(moodField, \{ target: \{ value: '' \} \});
			    act(() => toggleField.focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{
			        errors: \{ mood: 'required' \},
			        infos: \{\},
			        valid: false,
			      \}),
			    );
			
			    // remove mood, should clear validation
			    fireEvent.click(toggleField);
			
			    act(() => nameField.focus());
			    act(() => toggleField.focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{ errors: \{\}, infos: \{\}, valid: true \}),
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled Array of Form Fields', () => \{
			    const onSubmit = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{
			        phones: [
			          \{ number: '', ext: '' \},
			          \{ number: '', ext: '' \},
			          \{ number: '', ext: '' \},
			        ],
			      \});
			      const onChange = (nextValue) => setValue(nextValue);
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onSubmit=\{onSubmit\}>
			          \{value.phones.length &&
			            value.phones.map((phone, idx) => (
			              <Box
			                // eslint-disable-next-line react/no-array-index-key
			                key=\{idx\}
			                direction="row"
			                justify="between"
			                align="center"
			              >
			                <FormField name=\{\`phones[\$\{idx\}].number\`\}>
			                  <TextInput
			                    name=\{\`phones[\$\{idx\}].number\`\}
			                    placeholder=\{\`number test input \$\{idx + 1\}\`\}
			                  />
			                </FormField>
			                <FormField name=\{\`phones[\$\{idx\}].ext\`\}>
			                  <TextInput
			                    name=\{\`phones[\$\{idx\}].ext\`\}
			                    placeholder=\{\`ext test input \$\{idx + 1\}\`\}
			                  />
			                </FormField>
			              </Box>
			            ))\}
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('number test input 2'), \{
			      target: \{ value: '123456789' \},
			    \});
			    fireEvent.change(getByPlaceholderText('ext test input 3'), \{
			      target: \{ value: '999' \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{
			          phones: [
			            \{ number: '', ext: '' \},
			            \{ number: '123456789', ext: '' \},
			            \{ number: '', ext: '999' \},
			          ],
			        \},
			        touched: \{
			          'phones[1].number': true,
			          'phones[2].ext': true,
			        \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled Array of Form Fields onValidate', () => \{
			    const onValidate = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{
			        test: '',
			        phones: [
			          \{ number: '', ext: '' \},
			          \{ number: '', ext: '' \},
			        ],
			      \});
			      const onChange = (nextValue) => setValue(nextValue);
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onValidate=\{onValidate\}>
			          \{value.phones.length &&
			            value.phones.map((phone, idx) => (
			              <Box
			                // eslint-disable-next-line react/no-array-index-key
			                key=\{idx\}
			                direction="row"
			                justify="between"
			                align="center"
			              >
			                <FormField name=\{\`phones[\$\{idx\}].number\`\} required>
			                  <TextInput
			                    name=\{\`phones[\$\{idx\}].number\`\}
			                    placeholder=\{\`number test input \$\{idx + 1\}\`\}
			                  />
			                </FormField>
			                <FormField name=\{\`phones[\$\{idx\}].ext\`\}>
			                  <TextInput
			                    name=\{\`phones[\$\{idx\}].ext\`\}
			                    placeholder=\{\`ext test input \$\{idx + 1\}\`\}
			                  />
			                </FormField>
			              </Box>
			            ))\}
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onValidate).toBeCalledWith(
			      expect.objectContaining(\{
			        errors: \{
			          'phones[0].number': 'required',
			          'phones[1].number': 'required',
			        \},
			        infos: \{\},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controlled Array of Form Fields onValidate custom error', () => \{
			    const onValidate = jest.fn();
			    const errorMessage = 'Only Numbers';
			    const testRules = \{
			      regexp: /^[0-9]*\$/,
			      message: errorMessage,
			      status: 'error',
			    \};
			
			    const Test = () => \{
			      const [value, setValue] = React.useState(\{
			        test: '',
			        phones: [
			          \{ number: '', ext: '' \},
			          \{ number: '', ext: '' \},
			        ],
			      \});
			      const onChange = (nextValue) => setValue(nextValue);
			      return (
			        <Form value=\{value\} onChange=\{onChange\} onValidate=\{onValidate\}>
			          \{value.phones.length &&
			            value.phones.map((phone, idx) => (
			              <Box
			                // eslint-disable-next-line react/no-array-index-key
			                key=\{idx\}
			                direction="row"
			                justify="between"
			                align="center"
			              >
			                <FormField name=\{\`phones[\$\{idx\}].number\`\} validate=\{testRules\}>
			                  <TextInput
			                    name=\{\`phones[\$\{idx\}].number\`\}
			                    placeholder=\{\`number test input \$\{idx + 1\}\`\}
			                  />
			                </FormField>
			                <FormField name=\{\`phones[\$\{idx\}].ext\`\}>
			                  <TextInput
			                    name=\{\`phones[\$\{idx\}].ext\`\}
			                    placeholder=\{\`ext test input \$\{idx + 1\}\`\}
			                  />
			                </FormField>
			              </Box>
			            ))\}
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('number test input 2'), \{
			      target: \{ value: 'sadasd' \},
			    \});
			    fireEvent.click(getByText('Submit'));
			    expect(onValidate).toBeCalledWith(
			      expect.objectContaining(\{
			        errors: \{
			          'phones[1].number': errorMessage,
			        \},
			        infos: \{\},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('validate on mount - controlled form', () => \{
			    const Test = () => \{
			      const [formValue, setFormValue] = useState(\{
			        firstName: 'J',
			        middleName: '1',
			        lastName: '',
			        title: 1,
			      \});
			
			      return (
			        <Form
			          value=\{formValue\}
			          validate="change"
			          onChange=\{(nextValue) => setFormValue(nextValue)\}
			        >
			          <FormField
			            label="First Name"
			            htmlFor="first-name"
			            name="firstName"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (firstName) => \{
			                if (firstName && firstName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          >
			            <TextInput id="first-name" name="firstName" />
			          </FormField>
			          <FormField
			            label="Middle Name"
			            htmlFor="middle-name"
			            name="middleName"
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (middleName) => \{
			                if (middleName && middleName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          >
			            <TextInput id="middle-name" name="middleName" />
			          </FormField>
			          <FormField
			            label="Last Name"
			            htmlFor="last-name"
			            name="lastName"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (lastName) => \{
			                if (lastName && lastName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          >
			            <TextInput id="last-name" name="lastName" />
			          </FormField>
			          <FormField
			            label="Title"
			            htmlFor="title"
			            name="title"
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (title) => \{
			                if (title && title.length === 1) return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          >
			            <TextInput id="title" name="title" />
			          </FormField>
			        </Form>
			      );
			    \};
			
			    render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    // firstName triggers string length validation, but not regexp
			    expect(screen.queryAllByText('must be >1 character')).toHaveLength(1);
			    // middleName & title trigger regexp, but not string length validation
			    expect(screen.queryAllByText('invalid')).toHaveLength(2);
			    // lastName should not trigger required validation onMount
			    expect(screen.queryAllByText('required')).toHaveLength(0);
			  \});
			
			  test('validate on mount - controlled input', () => \{
			    const Test = () => \{
			      const [firstName, setFirstName] = useState('J');
			      const [middleName, setMiddleName] = useState('1');
			      const [lastName, setLastName] = useState('');
			      const [title, setTitle] = useState(1);
			
			      return (
			        <Form validate="change">
			          <FormField
			            label="First Name"
			            htmlFor="first-name"
			            name="firstName"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              () => \{
			                if (firstName && firstName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          >
			            <TextInput
			              id="first-name"
			              name="firstName"
			              value=\{firstName\}
			              onChange=\{(e) => \{
			                setFirstName(e.target.value);
			              \}\}
			            />
			          </FormField>
			          <FormField
			            label="Middle Name"
			            htmlFor="middle-name"
			            name="middleName"
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              () => \{
			                if (middleName && middleName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          >
			            <TextInput
			              id="middle-name"
			              name="middleName"
			              value=\{middleName\}
			              onChange=\{(e) => \{
			                setMiddleName(e.target.value);
			              \}\}
			            />
			          </FormField>
			          <FormField
			            label="Last Name"
			            htmlFor="last-name"
			            name="lastName"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              () => \{
			                if (lastName && lastName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          >
			            <TextInput
			              id="last-name"
			              name="lastName"
			              value=\{lastName\}
			              onChange=\{(e) => \{
			                setLastName(e.target.value);
			              \}\}
			            />
			          </FormField>
			          <FormField
			            label="Title"
			            htmlFor="title"
			            name="title"
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              () => \{
			                if (title && title.length === 1) return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          >
			            <TextInput
			              id="title"
			              name="title"
			              value=\{title\}
			              onChange=\{(e) => \{
			                setTitle(e.target.value);
			              \}\}
			            />
			          </FormField>
			        </Form>
			      );
			    \};
			
			    render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    // firstName triggers string length validation, but not regexp
			    expect(screen.queryAllByText('must be >1 character')).toHaveLength(1);
			    // middleName & title trigger regexp, but not string length validation
			    expect(screen.queryAllByText('invalid')).toHaveLength(2);
			    // lastName should not trigger required validation onMount
			    expect(screen.queryAllByText('required')).toHaveLength(0);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Form\\__tests__\\Form-test-controlled.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('grommet_grommet\\src\\js\\components\\Form\\__tests__\\Form-test-uncontrolled.js', () => {
        const sourceCode = `
			import React from 'react';
			
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import '@testing-library/jest-dom';
			
			import \{ act, render, fireEvent, screen \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Form \} from '..';
			import \{ FormField \} from '../../FormField';
			import \{ Button \} from '../../Button';
			import \{ Text \} from '../../Text';
			import \{ TextInput \} from '../../TextInput';
			import \{ Select \} from '../../Select';
			import \{ CheckBox \} from '../../CheckBox';
			import \{ RadioButtonGroup \} from '../../RadioButtonGroup';
			import \{ Box \} from '../../Box';
			import \{ DateInput \} from '../../DateInput';
			
			describe('Form accessibility', () => \{
			  test(\`TextInput in Form should have
			  no accessibility violations\`, async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form>
			          <FormField a11yTitle="test" />
			        </Form>
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('Select in Form should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form>
			          <FormField>
			            <Select options=\{['small', 'medium', 'large']\} a11yTitle="test" />
			          </FormField>
			        </Form>
			      </Grommet>,
			    );
			    const results = await axe(container, \{
			      rules: \{
			        /* This rule is flagged because Select is built using a 
			        TextInput within a DropButton. According to Dequeue and 
			        WCAG 4.1.2 "interactive controls must not have focusable 
			        descendants". Jest-axe is assuming that the input is focusable
			        and since the input is a descendant of the button the rule is 
			        flagged. However, the TextInput is built so that it is read 
			        only and cannot receive focus. Select is accessible 
			        according to the WCAG specification, but jest-axe is flagging
			        it so we are disabling this rule. */
			        'nested-interactive': \{ enabled: false \},
			      \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('CheckBox in Form should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form>
			          <FormField>
			            <CheckBox label="test" />
			          </FormField>
			        </Form>
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test(\`FormField with an explicit TextInput child
			  should have no accessibility violations\`, async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form>
			          <FormField>
			            <TextInput a11yTitle="test" />
			          </FormField>
			        </Form>
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test(\`Box with TextInput in Form should
			  have no accessibility violations\`, async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form>
			          <FormField>
			            <Box>
			              <TextInput a11yTitle="test" />
			            </Box>
			          </FormField>
			        </Form>
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			\});
			
			describe('Form uncontrolled', () => \{
			  test('empty', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('with field', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form>
			          <FormField name="test" />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('errors', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form errors=\{\{ test: 'missing' \}\}>
			          <FormField name="test" />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('infos', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form infos=\{\{ test: 'missing' \}\}>
			          <FormField name="test" />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('uncontrolled', () => \{
			    const onSubmit = jest.fn();
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Form onSubmit=\{onSubmit\}>
			          <FormField name="test">
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'v' \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'v' \},
			        touched: \{ test: true \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('uncontrolled onValidate', () => \{
			    const onValidate = jest.fn();
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Form onValidate=\{onValidate\}>
			          <FormField name="test" required>
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onValidate).toBeCalledWith(
			      expect.objectContaining(\{
			        errors: \{ test: 'required' \},
			        infos: \{\},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('uncontrolled onValidate custom error', () => \{
			    const onValidate = jest.fn();
			    const errorMessage = 'One uppercase letter';
			    const testRules = \{
			      regexp: /(?=.*?[A-Z])/,
			      message: errorMessage,
			      status: 'error',
			    \};
			
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Form onValidate=\{onValidate\}>
			          <FormField name="test" validate=\{testRules\}>
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onValidate).toBeCalledWith(
			      expect.objectContaining(\{
			        errors: \{ test: errorMessage \},
			        infos: \{\},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('uncontrolled onValidate custom info', () => \{
			    const onValidate = jest.fn();
			    const infoMessage = 'One uppercase letter';
			    const testRules = \{
			      regexp: /(?=.*?[A-Z])/,
			      message: infoMessage,
			      status: 'info',
			    \};
			
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Form onValidate=\{onValidate\}>
			          <FormField name="test" validate=\{testRules\}>
			            <TextInput name="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onValidate).toBeCalledWith(
			      expect.objectContaining(\{
			        errors: \{\},
			        infos: \{ test: infoMessage \},
			      \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('update', () => \{
			    const validate = jest
			      .fn()
			      .mockReturnValueOnce('too short')
			      .mockReturnValueOnce(undefined);
			    const validate2 = jest.fn().mockReturnValue(undefined);
			
			    const onSubmit = jest.fn();
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Form onSubmit=\{onSubmit\}>
			          <FormField
			            name="test"
			            required
			            validate=\{validate\}
			            placeholder="test input"
			          />
			          <FormField
			            name="test2"
			            placeholder="test-2 input"
			            validate=\{[validate2]\}
			          />
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'v' \},
			    \});
			    fireEvent.click(getByText('Submit'));
			
			    expect(validate).toBeCalledWith('v', \{ test: 'v' \});
			    expect(validate2).toBeCalledWith(undefined, \{ test: 'v' \});
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'value' \},
			    \});
			    fireEvent.change(getByPlaceholderText('test-2 input'), \{
			      target: \{ value: 'value-2' \},
			    \});
			
			    fireEvent.click(getByText('Submit'));
			    expect(validate).toBeCalledWith('value', \{
			      test: 'value',
			      test2: 'value-2',
			    \});
			    expect(validate2).toBeCalledWith('value-2', \{
			      test: 'value',
			      test2: 'value-2',
			    \});
			
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'value', test2: 'value-2' \},
			        touched: \{ test: true, test2: true \},
			      \}),
			    );
			  \});
			
			  test('regexp validation', () => \{
			    const onSubmit = jest.fn();
			    const \{ getByPlaceholderText, getByText, queryByText \} = render(
			      <Grommet>
			        <Form onSubmit=\{onSubmit\}>
			          <FormField
			            name="test"
			            required
			            validate=\{\{ regexp: /^[a-z]/i \}\}
			            placeholder="test input"
			          />
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: '1' \},
			    \});
			    fireEvent.click(getByText('Submit'));
			    expect(getByText('invalid')).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'a' \},
			    \});
			    fireEvent.click(getByText('Submit'));
			    expect(queryByText('invalid')).toBeNull();
			  \});
			
			  test('validate', () => \{
			    const onSubmit = jest.fn();
			    const \{ getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <Form onSubmit=\{onSubmit\}>
			          <FormField
			            name="test"
			            required
			            validate=\{[
			              (value) => (value.length === 1 ? 'simple string' : undefined),
			              (value) =>
			                value.length === 2 ? <Text> ReactNode </Text> : undefined,
			              (value) =>
			                value.length === 3
			                  ? \{ message: 'status error', status: 'error' \}
			                  : undefined,
			              (value) =>
			                value.length === 4
			                  ? \{ message: 'status info', status: 'info' \}
			                  : undefined,
			            ]\}
			            placeholder="test input"
			          />
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'a' \},
			    \});
			    fireEvent.click(getByText('Submit'));
			    expect(getByText('simple string')).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'ab' \},
			    \});
			    fireEvent.click(getByText('Submit'));
			    expect(getByText('ReactNode')).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'abc' \},
			    \});
			    fireEvent.click(getByText('Submit'));
			    expect(getByText('status error')).toMatchSnapshot();
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'abcd' \},
			    \});
			    fireEvent.click(getByText('Submit'));
			    expect(getByText('status info')).toMatchSnapshot();
			  \});
			
			  test('required validation', () => \{
			    const onSubmit = jest.fn();
			    const \{ getByPlaceholderText, getByText, queryByText \} = render(
			      <Grommet>
			        <Form onSubmit=\{onSubmit\}>
			          <FormField name="test" required placeholder="test input" />
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    fireEvent.click(getByText('Submit'));
			    expect(queryByText('required')).toMatchSnapshot();
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: '1' \},
			    \});
			    expect(queryByText('required')).toBeNull();
			  \});
			
			  test('should not submit when field is required and value is "[]"', () => \{
			    const onSubmit = jest.fn();
			    render(
			      <Grommet>
			        <Form onSubmit=\{onSubmit\}>
			          <FormField
			            label="Date Range"
			            htmlFor="date-range"
			            name="date-range"
			            required
			          >
			            <DateInput
			              name="date-range"
			              value=\{[]\}
			              format="mm/dd/yyyy-mm/dd/yyyy"
			            />
			          </FormField>
			          <Button type="submit" label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(screen.queryByText('required')).not.toBeInTheDocument();
			
			    fireEvent.click(screen.getByRole('button', \{ name: /submit/i \}));
			    expect(onSubmit).not.toHaveBeenCalled();
			    expect(screen.getByText('required')).toBeInTheDocument();
			  \});
			
			  test('reset clears form', () => \{
			    const onReset = jest.fn();
			    const \{ getByPlaceholderText, getByText, queryByText \} = render(
			      <Grommet>
			        <Form onReset=\{onReset\}>
			          <FormField name="test" required placeholder="test input" />
			          <Button type="reset" primary label="Reset" />
			        </Form>
			      </Grommet>,
			    );
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'Input has changed' \},
			    \});
			    fireEvent.click(getByText('Reset'));
			    expect(queryByText('Input has changed')).toBeNull();
			  \});
			
			  test('initial values', () => \{
			    const onSubmit = jest.fn();
			    const \{ getByText, queryByText \} = render(
			      <Grommet>
			        \{/* this test continues running forever if the whole event
			                passed to onSubmit */\}
			        <Form onSubmit=\{(\{ value, touched \}) => onSubmit(\{ value, touched \})\}>
			          <FormField
			            name="test"
			            required
			            placeholder="test input"
			            value="Initial value"
			          />
			          <FormField name="test2" value="Initial value2" />
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			    fireEvent.click(getByText('Submit'));
			    expect(queryByText('required')).toBeNull();
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'Initial value', test2: 'Initial value2' \},
			        touched: \{\},
			      \}),
			    );
			  \});
			
			  test('validate on change', async () => \{
			    jest.useFakeTimers();
			    const onChange = jest.fn();
			    window.scrollTo = jest.fn();
			
			    const \{ getByPlaceholderText, queryAllByText \} = render(
			      <Grommet>
			        <Form validate="change">
			          <FormField
			            label="Name"
			            name="name"
			            placeholder="name"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (name) => \{
			                if (name && name.length === 1) return 'must be >1 character';
			                return undefined;
			              \},
			              (name) => \{
			                if (name === 'good')
			                  return \{
			                    message: 'good',
			                    status: 'info',
			                  \};
			                return undefined;
			              \},
			            ]\}
			          />
			
			          <FormField label="Email" name="email" required>
			            <TextInput
			              a11yTitle="test"
			              name="email"
			              type="email"
			              placeholder="email"
			            />
			          </FormField>
			          <FormField
			            label="Size"
			            name="test-select"
			            htmlFor="test-select"
			            required
			            validate=\{(val) => \{
			              if (val === 'small')
			                return \{
			                  message: 'good',
			                  status: 'info',
			                \};
			              return undefined;
			            \}\}
			          >
			            <Select
			              a11yTitle="select form"
			              id="test-select"
			              name="test-select"
			              placeholder="test input"
			              options=\{['small', 'medium', 'large']\}
			              onChange=\{onChange\}
			            />
			          </FormField>
			          <Button label="submit" type="submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    // change input of first field
			    fireEvent.change(getByPlaceholderText('name'), \{
			      target: \{ value: 'Input has changed' \},
			    \});
			    // change input of second field
			    fireEvent.change(getByPlaceholderText('email'), \{
			      target: \{ value: 'Input has changed' \},
			    \});
			    // empty second field
			    fireEvent.change(getByPlaceholderText('email'), \{
			      target: \{ value: '' \},
			    \});
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    // emulate error on first field
			    fireEvent.change(getByPlaceholderText('name'), \{
			      target: \{ value: 'a' \},
			    \});
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    // change value of select
			    fireEvent.click(getByPlaceholderText('test input'));
			    fireEvent.click(document.activeElement.querySelector('button'));
			    window.scrollTo.mockRestore();
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			
			    expect(queryAllByText('required')).toHaveLength(1);
			    expect(queryAllByText('must be >1 character')).toHaveLength(1);
			    expect(queryAllByText('good')).toHaveLength(1);
			  \});
			
			  test('validate on mount', () => \{
			    const defaultValue = \{
			      firstName: 'J',
			      lastName: '',
			    \};
			
			    const \{ queryAllByText \} = render(
			      <Grommet>
			        <Form value=\{defaultValue\} validate="change">
			          <FormField
			            label="First Name"
			            name="firstName"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (firstName) => \{
			                if (firstName && firstName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          />
			
			          <FormField
			            label="Last Name"
			            name="lastName"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (lastName) => \{
			                if (lastName && lastName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(queryAllByText('must be >1 character')).toHaveLength(1);
			  \});
			
			  test('validate on blur', async () => \{
			    jest.useFakeTimers();
			    const onFocus = jest.fn();
			    const \{ getByText, getByPlaceholderText, queryAllByText, queryByText \} =
			      render(
			        <Grommet>
			          <Form validate="blur">
			            <FormField
			              onFocus=\{onFocus\}
			              label="Name"
			              name="name"
			              placeholder="name"
			              required
			              validate=\{[
			                \{ regexp: /^[a-z]/i \},
			                (name) => \{
			                  if (name && name.length === 1) return 'must be >1 character';
			                  return undefined;
			                \},
			                (name) => \{
			                  if (name === 'good')
			                    return \{
			                      message: 'good',
			                      status: 'info',
			                    \};
			                  return undefined;
			                \},
			              ]\}
			            />
			
			            <FormField onFocus=\{onFocus\} label="Email" name="email" required>
			              <TextInput
			                a11yTitle="test"
			                name="email"
			                type="email"
			                placeholder="email"
			              />
			            </FormField>
			            <Button onFocus=\{onFocus\} label="submit" type="submit" />
			          </Form>
			        </Grommet>,
			      );
			
			    // both fields have required error message
			    act(() => getByText('submit').focus());
			    fireEvent.click(getByText('submit'));
			    expect(queryAllByText('required')).toHaveLength(2);
			
			    // one fields has required error message
			    act(() => getByPlaceholderText('name').focus());
			    fireEvent.change(getByPlaceholderText('name'), \{
			      target: \{ value: 'Input has changed' \},
			    \});
			    act(() => getByText('submit').focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(queryAllByText('required')).toHaveLength(1);
			
			    // name field has new error and email field still has required error message
			    act(() => getByPlaceholderText('name').focus());
			    fireEvent.change(getByPlaceholderText('name'), \{
			      target: \{ value: 'a' \},
			    \});
			    act(() => getByText('submit').focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(queryByText('required')).toBeTruthy();
			    expect(queryByText('must be >1 character')).toBeTruthy();
			
			    //  new value in name does not remove the error message in email
			    act(() => getByPlaceholderText('name').focus());
			    fireEvent.change(getByPlaceholderText('name'), \{
			      target: \{ value: 'abc' \},
			    \});
			    expect(onFocus).toBeCalledTimes(6);
			    expect(queryByText('required')).toBeTruthy();
			    expect(queryByText('must be >1 character')).toBe(null);
			  \});
			
			  test('form validity', async () => \{
			    jest.useFakeTimers();
			    let valid;
			    const \{ getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <Form
			          validate="change"
			          onValidate=\{(validationResults) => \{
			            valid = validationResults.valid;
			          \}\}
			        >
			          <FormField
			            label="First Name"
			            name="firstName"
			            placeholder="First Name"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (firstName) => \{
			                if (firstName && firstName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          />
			          <FormField
			            label="Last Name"
			            name="lastName"
			            placeholder="Last Name"
			            required
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (lastName) => \{
			                if (lastName && lastName.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          />
			          <FormField
			            label="Address"
			            name="address"
			            placeholder="Address"
			            validate=\{[
			              \{ regexp: /^[a-z]/i \},
			              (address) => \{
			                if (address && address.length === 1)
			                  return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			          />
			          <FormField
			            label="Agree"
			            name="test-checkbox"
			            htmlFor="test-checkbox"
			            required
			          >
			            <CheckBox
			              label="test-checkbox"
			              name="test-checkbox"
			              id="test-checkbox"
			            />
			          </FormField>
			          <Button label="submit" type="submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    // verify validate on change
			    fireEvent.change(getByPlaceholderText('First Name'), \{
			      target: \{ value: 'J' \},
			    \});
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    expect(valid).toBeFalsy();
			
			    // first field fails validation, second field passes validation,
			    // form validity should be false
			    fireEvent.change(getByPlaceholderText('First Name'), \{
			      target: \{ value: 'J' \},
			    \});
			    fireEvent.change(getByPlaceholderText('Last Name'), \{
			      target: \{ value: 'Doe' \},
			    \});
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    expect(valid).toBeFalsy();
			
			    // first field passes validation, second field fails validation,
			    // form validity should be false
			    fireEvent.change(getByPlaceholderText('First Name'), \{
			      target: \{ value: 'John' \},
			    \});
			    fireEvent.change(getByPlaceholderText('Last Name'), \{
			      target: \{ value: 'D' \},
			    \});
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    expect(valid).toBeFalsy();
			
			    // first field fails validation, second field fails validation,
			    // form validity should be false
			    fireEvent.change(getByPlaceholderText('First Name'), \{
			      target: \{ value: 'J' \},
			    \});
			    fireEvent.change(getByPlaceholderText('Last Name'), \{
			      target: \{ value: 'D' \},
			    \});
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    expect(valid).toBeFalsy();
			
			    // first field passes validation, second field passes validation,
			    // third field fails validation, form validity should be false
			    fireEvent.change(getByPlaceholderText('First Name'), \{
			      target: \{ value: 'John' \},
			    \});
			    fireEvent.change(getByPlaceholderText('Last Name'), \{
			      target: \{ value: 'Doe' \},
			    \});
			    fireEvent.change(getByPlaceholderText('Address'), \{
			      target: \{ value: 'K' \},
			    \});
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    expect(valid).toBeFalsy();
			
			    // all fields pass validation except for checkbox,
			    // form validity should be false
			    fireEvent.change(getByPlaceholderText('First Name'), \{
			      target: \{ value: 'John' \},
			    \});
			    fireEvent.change(getByPlaceholderText('Last Name'), \{
			      target: \{ value: 'Doe' \},
			    \});
			    fireEvent.change(getByPlaceholderText('Address'), \{
			      target: \{ value: 'Easter Ave' \},
			    \});
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    expect(valid).toBeFalsy();
			
			    // all fields pass validation, form validity should be true
			    fireEvent.change(getByPlaceholderText('First Name'), \{
			      target: \{ value: 'John' \},
			    \});
			    fireEvent.change(getByPlaceholderText('Last Name'), \{
			      target: \{ value: 'Doe' \},
			    \});
			    fireEvent.click(getByText('test-checkbox'));
			    act(() => jest.advanceTimersByTime(1000)); // allow validations to run
			    expect(valid).toBeTruthy();
			  \});
			
			  test('uncontrolled without name', () => \{
			    const onSubmit = jest.fn();
			    const \{ getByPlaceholderText, getByText \} = render(
			      <Form onSubmit=\{onSubmit\}>
			        <FormField>
			          <TextInput a11yTitle="test" placeholder="test input" />
			        </FormField>
			        <Button type="submit" primary label="Submit" />
			      </Form>,
			    );
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'v' \},
			    \});
			    expect(getByPlaceholderText('test input').value).toBe('v');
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledTimes(1);
			  \});
			
			  test('uncontrolled reset without value', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText, getByText, queryByText \} = render(
			      <Grommet>
			        <Form onChange=\{onChange\}>
			          <FormField
			            name="test"
			            required
			            placeholder="test input"
			            a11yTitle="test"
			          />
			          <Button type="reset" primary label="Reset" />
			        </Form>
			      </Grommet>,
			    );
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'Input has changed' \},
			    \});
			    expect(getByPlaceholderText('test input').value).toBe('Input has changed');
			    expect(onChange).toBeCalledTimes(1);
			    fireEvent.click(getByText('Reset'));
			    expect(queryByText('Input has changed')).toBeNull();
			  \});
			
			  test('disabled FormField', () => \{
			    const onSubmit = jest.fn();
			    const \{ getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <Form onSubmit=\{onSubmit\}>
			          <FormField disabled>
			            <TextInput a11yTitle="test" placeholder="test input" />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'v' \},
			    \});
			    expect(getByPlaceholderText('test input').value).toBe('v');
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).not.toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ test: 'v' \},
			        touched: \{ test: true \},
			      \}),
			    );
			  \});
			
			  test('regexp validation with status', () => \{
			    const onSubmit = jest.fn();
			    const \{ getByPlaceholderText, getByText, getAllByText \} = render(
			      <Grommet>
			        <Form onSubmit=\{onSubmit\}>
			          <FormField
			            name="test"
			            required
			            error="invalid"
			            validate=\{\{
			              regexp: /^[a-z]/i,
			              status: 'info',
			            \}\}
			            placeholder="test input"
			            a11yTitle="test"
			          />
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: '1' \},
			    \});
			    expect(getByPlaceholderText('test input').value).toBe('1');
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledTimes(1);
			    expect(getAllByText('invalid')).toMatchSnapshot();
			  \});
			
			  test('custom component', () => \{
			    const CustomTextInput = (\{ name, value, onChange \}) => (
			      <div>
			        <input
			          type="text"
			          placeholder="Username"
			          name=\{name\}
			          id="test"
			          value=\{value\}
			          onChange=\{onChange\}
			        />
			      </div>
			    );
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Form onChange=\{onChange\}>
			          <FormField required>
			            <CustomTextInput name="test" onChange=\{onChange\} />
			          </FormField>
			        </Form>
			      </Grommet>,
			    );
			    fireEvent.change(getByPlaceholderText('Username'), \{
			      target: \{ value: 'v' \},
			    \});
			    expect(getByPlaceholderText('Username').value).toBe('v');
			    expect(onChange).toBeCalledTimes(1);
			  \});
			
			  /* The three following tests align with FormField's supported 'validate' types
			   * FormField's 'validate' prop accepts the following types:
			   * 1) object in the shape of: \{
			   *  regexp?: object,
			   *  message?: string | React.ReactNode,
			   *  status?: 'error' | 'info'
			   * \}
			   * 2) function: (...args: any[]) => any )
			   * 3) array of 1) and/or 2) above
			   */
			  test('should validate when supplied an object', () => \{
			    const regexValidation = \{
			      regexp: /(?=.*?[#?!@\$ %^&*-])/,
			      message: 'At least one special character or space',
			      status: 'error',
			    \};
			    const expectedMessage = 'At least one special character or space';
			
			    const \{ getByPlaceholderText, getByText, queryByText \} = render(
			      <Grommet>
			        <Form>
			          <FormField
			            label="Create a Password"
			            name="password"
			            // required
			            validate=\{regexValidation\}
			            // placeholder="Enter Password"
			          >
			            <TextInput name="password" placeholder="Enter Password" />
			          </FormField>
			          <Button type="submit" label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    const input = getByPlaceholderText('Enter Password');
			    const submitButton = getByText('Submit');
			
			    // Absence of a special character in input should display
			    // 'special character' error message
			    fireEvent.change(input, \{
			      target: \{ value: 'abcde' \},
			    \});
			    fireEvent.click(submitButton);
			    expect(getByText(expectedMessage).innerHTML).toBeTruthy();
			
			    // Including a special character should validate. 'Special character'
			    // error message should not be displayed.
			    fireEvent.change(input, \{
			      target: \{ value: 'abcde%' \},
			    \});
			    fireEvent.click(submitButton);
			    expect(queryByText(expectedMessage)).toBeNull();
			  \});
			
			  test('should validate when supplied a function', () => \{
			    const functionValidation = (combination) =>
			      combination === '12345'
			        ? \{
			            message:
			              "That's amazing. I've got the same combination on my luggage!",
			            status: 'info',
			          \}
			        : undefined;
			    const infoMessage =
			      "That's amazing. I've got the same combination on my luggage!";
			
			    const \{ getByPlaceholderText, getByText, queryByText \} = render(
			      <Grommet>
			        <Form>
			          <FormField
			            label="Druidia Shield Combination"
			            name="combination"
			            validate=\{functionValidation\}
			          >
			            <TextInput name="combination" placeholder="Enter Combination" />
			          </FormField>
			          <Button type="submit" label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    const input = getByPlaceholderText('Enter Combination');
			    const submitButton = getByText('Submit');
			
			    // If combination input matches value in function, should display
			    // info message
			    fireEvent.change(input, \{
			      target: \{ value: '12345' \},
			    \});
			    fireEvent.click(submitButton);
			    expect(getByText(infoMessage)).toBeTruthy();
			
			    // Combination info message should not be shown if value does not match.
			    fireEvent.change(input, \{
			      target: \{ value: 'abcde%' \},
			    \});
			    fireEvent.click(submitButton);
			    expect(queryByText(infoMessage)).toBeNull();
			  \});
			
			  test(\`should validate with array of objects and/or functions\`, () => \{
			    const validationArray = [
			      \{
			        regexp: /(?=.*?[0-9])/,
			        message: 'At least one number',
			        status: 'error',
			      \},
			      \{
			        regexp: /.\{5,\}/,
			        message: 'At least five characters',
			        status: 'error',
			      \},
			      (combination) =>
			        combination === '12345'
			          ? \{
			              message:
			                "That's amazing. I've got the same combination on my luggage!",
			              status: 'info',
			            \}
			          : undefined,
			      \{
			        regexp: /(?=.*?[#?!@\$ %^&*-])/,
			        message: 'At least one special character or space',
			        status: 'error',
			      \},
			    ];
			
			    const validationMessages = [
			      'At least one number',
			      'At least five characters',
			      "That's amazing. I've got the same combination on my luggage!",
			      'At least one special character or space',
			    ];
			
			    const \{ getByPlaceholderText, getByText, queryByText \} = render(
			      <Grommet>
			        <Form>
			          <FormField
			            label="Druidia Shield Combination"
			            name="combination"
			            validate=\{validationArray\}
			          >
			            <TextInput name="combination" placeholder="Enter Combination" />
			          </FormField>
			          <Button type="submit" label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    const input = getByPlaceholderText('Enter Combination');
			    const submitButton = getByText('Submit');
			
			    // Needs to include a number. Show message.
			    fireEvent.change(input, \{
			      target: \{ value: 'a' \},
			    \});
			    fireEvent.click(submitButton);
			    expect(getByText('At least one number')).toBeTruthy();
			
			    // Needs five characters. Show message.
			    fireEvent.change(input, \{
			      target: \{ value: '1' \},
			    \});
			    fireEvent.click(submitButton);
			    expect(getByText('At least five characters')).toBeTruthy();
			
			    // Still needs five characters. Show message.
			    fireEvent.change(input, \{
			      target: \{ value: '12' \},
			    \});
			    fireEvent.click(submitButton);
			    expect(getByText('At least five characters')).toBeTruthy();
			
			    // Input satifies condition in funciton. Show message.
			    fireEvent.change(input, \{
			      target: \{ value: '12345' \},
			    \});
			    fireEvent.click(submitButton);
			
			    expect(
			      getByText("That's amazing. I've got the same combination on my luggage!"),
			    ).toBeTruthy();
			
			    // No special character included. Show message.
			    fireEvent.change(input, \{
			      target: \{ value: '123456' \},
			    \});
			    fireEvent.click(submitButton);
			    expect(getByText('At least one special character or space')).toBeTruthy();
			
			    // All validation criteria met, so none of the messages should appear.
			    fireEvent.change(input, \{
			      target: \{ value: '123456%' \},
			    \});
			    fireEvent.click(submitButton);
			    validationMessages.forEach((message) =>
			      expect(queryByText(message)).toBeNull(),
			    );
			  \});
			
			  test('form with select', () => \{
			    const onChange = jest.fn();
			    window.scrollTo = jest.fn();
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Form>
			          <FormField>
			            <Select
			              a11yTitle="select form"
			              name="select"
			              placeholder="test input"
			              options=\{['small', 'medium', 'large']\}
			              onChange=\{onChange\}
			            />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    fireEvent.click(getByPlaceholderText('test input'));
			    fireEvent.click(document.activeElement.querySelector('button'));
			    expect(getByPlaceholderText('test input').value).toEqual('small');
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{ value: 'small' \}),
			    );
			    window.scrollTo.mockRestore();
			  \});
			
			  test('uncontrolled onChange with touched', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Form onChange=\{onChange\}>
			          <FormField
			            name="test"
			            required
			            placeholder="test input"
			            a11yTitle="test"
			          />
			          <Button type="reset" primary label="Reset" />
			        </Form>
			      </Grommet>,
			    );
			
			    fireEvent.change(getByPlaceholderText('test input'), \{
			      target: \{ value: 'Input has changed' \},
			    \});
			
			    expect(onChange).toBeCalledWith(
			      \{ test: 'Input has changed' \},
			      \{ touched: \{ test: true \} \},
			    );
			  \});
			
			  test('reset clears select, checkbox, radiobuttongroup', () => \{
			    const onReset = jest.fn();
			    const \{ container, getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <Form onReset=\{onReset\}>
			          <FormField
			            label="Select Size"
			            htmlFor="test-select"
			            name="test-select"
			          >
			            <Select
			              options=\{['small', 'medium', 'large']\}
			              name="test-select"
			              id="test-select"
			              placeholder="test select"
			            />
			          </FormField>
			          <FormField
			            label="CheckBox"
			            htmlFor="test-checkbox"
			            name="test-checkbox"
			          >
			            <CheckBox
			              label="test-checkbox"
			              name="test-checkbox"
			              id="test-checkbox"
			            />
			          </FormField>
			          <FormField
			            label="RadioButtonGroup"
			            htmlFor="test-radiobuttongroup"
			            name="test-radiobuttongroup"
			          >
			            <RadioButtonGroup
			              options=\{['one', 'two', 'three']\}
			              name="test-radiobuttongroup"
			              id="test-radiobuttongroup"
			            />
			          </FormField>
			          <Button type="reset" primary label="Reset" />
			        </Form>
			      </Grommet>,
			    );
			
			    fireEvent.click(getByPlaceholderText('test select'));
			    fireEvent.click(getByText('small'));
			    fireEvent.click(getByText('test-checkbox'));
			    fireEvent.click(getByText('two'));
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Reset'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('form with select without name prop', () => \{
			    const onChange = jest.fn();
			    window.scrollTo = jest.fn();
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Form>
			          <FormField>
			            <Select
			              a11yTitle="select form"
			              placeholder="test input"
			              options=\{['small', 'medium', 'large']\}
			              onChange=\{onChange\}
			            />
			          </FormField>
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      </Grommet>,
			    );
			
			    fireEvent.click(getByPlaceholderText('test input'));
			    fireEvent.click(document.activeElement.querySelector('button'));
			    expect(getByPlaceholderText('test input').value).toEqual('small');
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{ value: 'small' \}),
			    );
			    window.scrollTo.mockRestore();
			  \});
			
			  test(\`dynamicly removed fields using blur validation
			  don't keep validation errors\`, () => \{
			    jest.useFakeTimers();
			    const onValidate = jest.fn();
			    const onSubmit = jest.fn();
			
			    const Test = () => \{
			      const [toggle, setToggle] = React.useState(false);
			
			      return (
			        <Form validate="blur" onValidate=\{onValidate\} onSubmit=\{onSubmit\}>
			          <FormField name="name">
			            <TextInput name="name" placeholder="test name" />
			          </FormField>
			          <FormField name="toggle">
			            <CheckBox
			              name="toggle"
			              label="toggle"
			              onChange=\{(\{ target: \{ checked \} \}) => setToggle(checked)\}
			            />
			          </FormField>
			          \{toggle && (
			            <FormField name="mood" required>
			              <TextInput name="mood" placeholder="test mood" />
			            </FormField>
			          )\}
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByLabelText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const nameField = getByPlaceholderText('test name');
			    const toggleField = getByLabelText('toggle');
			
			    // add mood
			    fireEvent.click(toggleField);
			
			    expect(container.firstChild).toMatchSnapshot();
			    const moodField = getByPlaceholderText('test mood');
			
			    // focus in and out of mood, should fail validation
			    act(() => moodField.focus());
			    act(() => toggleField.focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{
			        errors: \{ mood: 'required' \},
			        infos: \{\},
			        valid: false,
			      \}),
			    );
			
			    // set mood, should pass validation
			    act(() => moodField.focus());
			    fireEvent.change(moodField, \{ target: \{ value: 'testy' \} \});
			    act(() => toggleField.focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{ errors: \{\}, infos: \{\}, valid: true \}),
			    );
			
			    // clear mood, should fail validation
			    act(() => moodField.focus());
			    fireEvent.change(moodField, \{ target: \{ value: '' \} \});
			    act(() => toggleField.focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{
			        errors: \{ mood: 'required' \},
			        infos: \{\},
			        valid: false,
			      \}),
			    );
			
			    // remove mood, should clear validation
			    fireEvent.click(toggleField);
			
			    act(() => nameField.focus());
			    act(() => toggleField.focus());
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{ errors: \{\}, infos: \{\}, valid: true \}),
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`valid flag on component mount\`, () => \{
			    jest.useFakeTimers();
			    const onValidate = jest.fn();
			
			    const defaultValue = \{
			      name: 'J',
			      mood: '',
			    \};
			
			    const Test = () => \{
			      const [value, setValue] = React.useState(defaultValue);
			
			      return (
			        <Form
			          value=\{value\}
			          validate="blur"
			          onChange=\{(nextValue) => \{
			            setValue(nextValue);
			          \}\}
			          onValidate=\{onValidate\}
			        >
			          <FormField
			            validate=\{[
			              (name) => \{
			                if (name && name.length === 1) return 'must be >1 character';
			                return undefined;
			              \},
			            ]\}
			            name="name"
			          >
			            <TextInput name="name" placeholder="test name" />
			          </FormField>
			          <Button label="Focus out" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    expect(onValidate).toHaveBeenNthCalledWith(
			      1,
			      expect.objectContaining(\{
			        errors: \{ name: 'must be >1 character' \},
			        infos: \{\},
			        valid: false,
			      \}),
			    );
			
			    const nameField = getByPlaceholderText('test name');
			
			    act(() => nameField.focus());
			    fireEvent.change(nameField, \{ target: \{ value: 'John' \} \});
			    act(() => getByText('Focus out').focus());
			
			    act(() => jest.advanceTimersByTime(200)); // allow validations to run
			    expect(onValidate).toHaveBeenLastCalledWith(
			      expect.objectContaining(\{
			        errors: \{\},
			        infos: \{\},
			        valid: true,
			      \}),
			    );
			  \});
			
			  test(\`dynamicly removed fields should be removed from form value\`, () => \{
			    jest.useFakeTimers();
			    const onValidate = jest.fn();
			    const onSubmit = jest.fn();
			
			    const Test = () => \{
			      const [toggle, setToggle] = React.useState(false);
			
			      return (
			        <Form validate="blur" onValidate=\{onValidate\} onSubmit=\{onSubmit\}>
			          <FormField name="name">
			            <TextInput name="name" placeholder="test name" />
			          </FormField>
			          <FormField name="toggle">
			            <CheckBox
			              name="toggle"
			              label="toggle"
			              onChange=\{(\{ target: \{ checked \} \}) => setToggle(checked)\}
			            />
			          </FormField>
			          \{toggle && (
			            <FormField name="mood" required>
			              <TextInput name="mood" placeholder="test mood" />
			            </FormField>
			          )\}
			          <Button type="submit" primary label="Submit" />
			        </Form>
			      );
			    \};
			    const \{ getByPlaceholderText, getByLabelText, getByText, container \} =
			      render(
			        <Grommet>
			          <Test />
			        </Grommet>,
			      );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const nameField = getByPlaceholderText('test name');
			    const toggleField = getByLabelText('toggle');
			
			    // add name
			    fireEvent.change(nameField, \{ target: \{ value: 'name' \} \});
			
			    // add mood
			    fireEvent.click(toggleField);
			
			    const moodField = getByPlaceholderText('test mood');
			
			    // set mood
			    fireEvent.change(moodField, \{ target: \{ value: 'happy' \} \});
			
			    // remove mood
			    fireEvent.click(toggleField);
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('Submit'));
			    expect(onSubmit).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ name: 'name', toggle: false \},
			      \}),
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Form\\__tests__\\Form-test-uncontrolled.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(39)
    });
    it('grommet_grommet\\src\\js\\components\\FormField\\__tests__\\FormField-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import styled from 'styled-components';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Alert, New, StatusInfo \} from 'grommet-icons';
			import \{ Grommet \} from '../../Grommet';
			import \{ Form \} from '../../Form';
			import \{ FormField \} from '..';
			import \{ TextInput \} from '../../TextInput';
			
			const CustomFormField = styled(FormField)\`
			  font-size: 40px;
			\`;
			
			describe('FormField', () => \{
			  test(\`should have no accessibility violations\`, async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField />
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('default', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField />
			        <FormField>
			          <TextInput />
			        </FormField>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('label', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField label="test label" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('help', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField help="test help" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('error', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField error="test error" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('info', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField info="test info" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('htmlFor', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField htmlFor="test-id" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('margin', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField margin="medium" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('empty margin', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField margin="none" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField pad />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('abut', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            border: \{
			              color: 'border',
			              error: \{
			                color: \{
			                  dark: 'white',
			                  light: 'status-critical',
			                \},
			              \},
			              size: 'large',
			              position: 'outer',
			              side: 'all',
			            \},
			            margin: \{ bottom: 'small' \},
			          \},
			        \}\}
			      >
			        <FormField htmlFor="test-id" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('abut with margin', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            border: \{
			              color: 'border',
			              error: \{
			                color: \{
			                  dark: 'white',
			                  light: 'status-critical',
			                \},
			              \},
			              size: 'large',
			              position: 'outer',
			              side: 'all',
			            \},
			            margin: \{ bottom: 'small' \},
			          \},
			        \}\}
			      >
			        <FormField margin="medium" htmlFor="test-id" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom formfield', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <CustomFormField htmlFor="test-id" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField disabled /> \{/* don't use FormField without Form */\}
			        <Form>
			          <FormField disabled />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('required', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FormField required /> \{/* don't use FormField without Form */\}
			        <Form>
			          <FormField required />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom label', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            label: \{
			              color: 'red',
			              size: 'small',
			              margin: 'xsmall',
			              weight: 600,
			            \},
			          \},
			        \}\}
			      >
			        <Form>
			          <FormField label="label" />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled with custom label', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            label: \{
			              color: 'red',
			              size: 'small',
			              margin: 'xsmall',
			              weight: 600,
			            \},
			            disabled: \{
			              label: \{
			                color: 'teal',
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Form>
			          <FormField disabled label="label" />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad with border undefined', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            border: undefined,
			            content: \{
			              pad: 'large',
			            \},
			          \},
			        \}\}
			      >
			        <Form>
			          <FormField label="label" pad />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom input margin', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            content: \{
			              margin: \{ vertical: 'large' \},
			            \},
			          \},
			        \}\}
			      >
			        <Form>
			          <FormField label="label" />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('contentProps', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Form>
			          <FormField
			            label="label"
			            contentProps=\{\{
			              border: false,
			            \}\}
			          />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom error and info icon and container', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            error: \{
			              icon: <Alert />,
			              container: \{
			                background: \{
			                  color: 'green',
			                \},
			              \},
			            \},
			            info: \{
			              icon: <StatusInfo />,
			              container: \{
			                pad: \{ horizontal: 'large' \},
			              \},
			            \},
			          \},
			        \}\}
			      >
			        <Form>
			          <FormField
			            label="label"
			            error="This is an error message."
			            info="Here is a little added info on FormField."
			            contentProps=\{\{
			              border: false,
			            \}\}
			          />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should render asterisk when requiredIndicator === true', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            label: \{
			              requiredIndicator: true,
			            \},
			          \},
			        \}\}
			      >
			        <Form>
			          <FormField label="label" required />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render custom indicator when requiredIndicator is
			  element\`, () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            label: \{
			              requiredIndicator: <New size="small" />,
			            \},
			          \},
			        \}\}
			      >
			        <Form>
			          <FormField label="label" required />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should not render asterisk when required.indicator === false', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          formField: \{
			            label: \{
			              requiredIndicator: true,
			            \},
			          \},
			        \}\}
			      >
			        <Form>
			          <FormField label="label" required=\{\{ indicator: false \}\} />
			        </Form>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\FormField\\__tests__\\FormField-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(24)
    });
    it('grommet_grommet\\src\\js\\components\\Grid\\__tests__\\Grid-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Grid \} from '..';
			
			describe('Grid', () => \{
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('a11yTitle and aria-label renders', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Grid a11yTitle="My Grid" />
			        <Grid aria-label="My Other Grid" />
			      </Grommet>,
			    );
			    expect(getByLabelText('My Grid')).toBeTruthy();
			    expect(getByLabelText('My Other Grid')).toBeTruthy();
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('rows renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid rows=\{[['small', 'medium'], 'large', 'medium']\} />
			        <Grid rows=\{['small', 'large', 'medium']\} />
			        <Grid rows="small" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('columns renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid columns=\{['1/2', '2/4']\} />
			        <Grid columns=\{['1/3', '2/3']\} />
			        <Grid columns=\{['1/4', '3/4']\} />
			        <Grid columns=\{[['1/2', '2/4'], '1/4', '3/4']\} />
			        <Grid columns="small" />
			        <Grid columns="1/3" />
			        <Grid columns="flex" />
			        <Grid columns=\{\{ count: 'fit', size: 'small' \}\} />
			        <Grid columns=\{\{ count: 'fill', size: ['small', 'medium'] \}\} />
			        <Grid columns=\{\{ count: 'fit', size: ['small', '1/2'] \}\} />
			        <Grid columns=\{\{ count: 'fit', size: ['1/4', 'medium'] \}\} />
			        \{/* designer scenario */\}
			        <Grid columns=\{\{ count: 'fill', size: [] \}\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('areas renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid
			          rows=\{['xxsmall', 'medium', 'xsmall']\}
			          columns=\{['3/4', '1/4']\}
			          areas=\{[
			            \{ name: 'header', start: [0, 0], end: [0, 1] \},
			            \{ name: 'main', start: [1, 0], end: [1, 0] \},
			            \{ name: 'sidebar', start: [1, 1], end: [1, 1] \},
			            \{ name: 'footer', start: [2, 0], end: [2, 1] \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('areas renders with warning and throws error', () => \{
			    console.error = jest.fn();
			    console.warn = jest.fn();
			    const warnSpy = jest.spyOn(console, 'warn');
			    expect(() => \{
			      render(
			        <Grommet>
			          <Grid
			            rows=\{['xxsmall', 'medium', 'xsmall']\}
			            columns="small"
			            areas=\{[
			              \{ name: 'header', start: [0, 0], end: [0, 1] \},
			              \{ name: 'main', start: [1, 0], end: [1, 0] \},
			              \{ name: 'sidebar', start: [1, 1], end: [1, 1] \},
			              \{ name: 'footer', start: [2, 0], end: [2, 1] \},
			            ]\}
			          />
			        </Grommet>,
			      );
			    \}).toThrow('props.columns.map is not a function');
			    expect(warnSpy).toHaveBeenCalledWith(
			      'Grid \`areas\` requires \`rows\` and \`columns\` to be arrays.',
			    );
			  \});
			
			  test('areas renders when given an array of string arrays', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid
			          rows=\{['xxsmall', 'medium', 'xsmall']\}
			          columns=\{['3/4', '1/4']\}
			          areas=\{[
			            ['header', 'header'],
			            ['sidebar', 'main'],
			            ['footer', 'footer'],
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('justify renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid justify="start" />
			        <Grid justify="center" />
			        <Grid justify="end" />
			        <Grid justify="stretch" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('align renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{/* Mapped values */\}
			        <Grid align="start" />
			        <Grid align="center" />
			        <Grid align="end" />
			        <Grid align="stretch" />
			        <Grid align="baseline" />
			        \{/* Any valid CSS align-items strings */\}
			        <Grid align="normal" />
			        <Grid align="first baseline" />
			        <Grid align="last baseline" />
			        <Grid align="safe center" />
			        <Grid align="unsafe center" />
			        <Grid align="inherit" />
			        <Grid align="initial" />
			        <Grid align="unset" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('justifyContent renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid justifyContent="start" />
			        <Grid justifyContent="center" />
			        <Grid justifyContent="between" />
			        <Grid justifyContent="around" />
			        <Grid justifyContent="end" />
			        <Grid justifyContent="stretch" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('alignContent renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{/* Mapped values */\}
			        <Grid alignContent="start" />
			        <Grid alignContent="center" />
			        <Grid alignContent="between" />
			        <Grid alignContent="around" />
			        <Grid alignContent="end" />
			        <Grid alignContent="stretch" />
			        <Grid alignContent="baseline" />
			        <Grid alignContent="evenly" />
			        \{/* Any valid CSS align-content strings */\}
			        <Grid alignContent="normal" />
			        <Grid alignContent="first baseline" />
			        <Grid alignContent="last baseline" />
			        <Grid alignContent="space-between" />
			        <Grid alignContent="space-around" />
			        <Grid alignContent="space-evenly" />
			        <Grid alignContent="safe center" />
			        <Grid alignContent="unsafe center" />
			        <Grid alignContent="inherit" />
			        <Grid alignContent="initial" />
			        <Grid alignContent="unset" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('gap renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid gap="small" />
			        <Grid gap="medium" />
			        <Grid gap="large" />
			        <Grid gap=\{\{ row: 'small' \}\} />
			        <Grid gap=\{\{ row: 'medium' \}\} />
			        <Grid gap=\{\{ row: 'large' \}\} />
			        <Grid gap=\{\{ column: 'small' \}\} />
			        <Grid gap=\{\{ column: 'medium' \}\} />
			        <Grid gap=\{\{ column: 'large' \}\} />
			        <Grid gap=\{\{ row: 'small', column: 'medium' \}\} />
			        <Grid gap=\{\{ test: 'test' \}\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid fill />
			        <Grid fill=\{false\} />
			        <Grid fill="horizontal" />
			        <Grid fill="vertical" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('responsive', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid responsive />
			        <Grid responsive=\{false\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('as renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid as="article" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('proxies tag', () => \{
			    const \{ container: tagComponent \} = render(
			      <Grommet>
			        <Grid tag="article" />
			      </Grommet>,
			    );
			    const \{ container: asComponent \} = render(
			      <Grommet>
			        <Grid as="article" />
			      </Grommet>,
			    );
			
			    expect(tagComponent).toEqual(asComponent);
			  \});
			
			  test('pad', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid pad="small" />
			        <Grid pad="medium" />
			        <Grid pad="large" />
			        <Grid pad=\{\{ horizontal: 'small' \}\} />
			        <Grid pad=\{\{ vertical: 'small' \}\} />
			        <Grid pad=\{\{ bottom: 'small' \}\} />
			        <Grid pad=\{\{ left: 'small' \}\} />
			        <Grid pad=\{\{ right: 'small' \}\} />
			        <Grid pad=\{\{ start: 'small' \}\} />
			        <Grid pad=\{\{ end: 'small' \}\} />
			        <Grid pad=\{\{ top: 'small' \}\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid border="all" />
			        <Grid border="horizontal" />
			        <Grid border="vertical" />
			        <Grid border="top" />
			        <Grid border="left" />
			        <Grid border="bottom" />
			        <Grid border="right" />
			        <Grid border=\{\{ color: 'accent-1' \}\} />
			        <Grid border=\{\{ side: 'all' \}\} />
			        <Grid border=\{\{ size: 'xsmall' \}\} />
			        <Grid border=\{\{ size: 'small' \}\} />
			        <Grid border=\{\{ size: 'medium' \}\} />
			        <Grid border=\{\{ size: 'large' \}\} />
			        <Grid border=\{\{ size: 'xlarge' \}\} />
			        <Grid border=\{\{ style: 'dotted' \}\} />
			        <Grid border=\{\{ style: 'double' \}\} />
			        <Grid border=\{\{ style: 'dashed' \}\} />
			        <Grid
			          border=\{[
			            \{ side: 'top', color: 'accent-1', size: 'medium', style: 'dotted' \},
			            \{ side: 'left', color: 'accent-2', size: 'large', style: 'dashed' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('width', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid width="xsmall" />
			        <Grid width="small" />
			        <Grid width="medium" />
			        <Grid width="large" />
			        <Grid width="xlarge" />
			        <Grid width="111px" />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('width object', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid width=\{\{ width: '100px', max: '100%' \}\} />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('height', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid height="xsmall" />
			        <Grid height="small" />
			        <Grid height="medium" />
			        <Grid height="large" />
			        <Grid height="xlarge" />
			        <Grid height="111px" />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('height object', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Grid height=\{\{ height: '100px', max: '100%' \}\} />
			      </Grommet>,
			    );
			    expect(container).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Grid\\__tests__\\Grid-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(22)
    });
    it('grommet_grommet\\src\\js\\components\\Grommet\\__tests__\\Grommet-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ hpe as hpeTheme \} from 'grommet-theme-hpe';
			
			import \{ Grommet \} from '..';
			import \{ AnnounceContext \} from '../../../contexts';
			import \{ grommet \} from '../../../themes/grommet';
			import \{ MessageContext \} from '../../../contexts/MessageContext';
			
			const TestAnnouncer = (\{ announce \}) => \{
			  React.useEffect(() => announce('hello', 'assertive'));
			  return <div>hi</div>;
			\};
			
			describe('Grommet', () => \{
			  test('basic', () => \{
			    const \{ container \} = render(<Grommet />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('grommet theme', () => \{
			    const \{ container \} = render(<Grommet theme=\{grommet\} />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('hpe theme', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{hpeTheme\}>Grommet App</Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('themeMode', () => \{
			    const \{ container \} = render(<Grommet theme=\{grommet\} themeMode="dark" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('cssVars', () => \{
			    const \{ container \} = render(<Grommet cssVars>Grommet App</Grommet>);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('full', () => \{
			    const \{ container \} = render(<Grommet full>Grommet App</Grommet>);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('full min', () => \{
			    const \{ container \} = render(<Grommet full="min">Grommet App</Grommet>);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('background', () => \{
			    const \{ container \} = render(
			      <Grommet full background="#0000ff">
			        Grommet App
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('announce', (done) => \{
			    const \{ container \} = render(
			      <Grommet>
			        <AnnounceContext.Consumer>
			          \{(announce) => <TestAnnouncer announce=\{announce\} />\}
			        </AnnounceContext.Consumer>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    // no style, no need for expectPortal
			    expect(
			      document.body.querySelector('#grommet-announcer[aria-live]'),
			    ).toMatchSnapshot();
			
			    setTimeout(() => \{
			      // should clear the aria-live container
			      expect(
			        document.body.querySelector('#grommet-announcer[aria-live]'),
			      ).toMatchSnapshot();
			      done();
			    \}, 600); // wait the aria-live container to clear
			  \});
			
			  test('messages', () => \{
			    const \{ container \} = render(
			      <Grommet
			        messages=\{\{
			          messages: \{
			            test: \{
			              label: 'My Label',
			            \},
			          \},
			        \}\}
			      >
			        <MessageContext.Consumer>
			          \{(\{ format \}) => format(\{ id: 'test.label' \})\}
			        </MessageContext.Consumer>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('message format function', () => \{
			    const messages = \{
			      'test.label': 'My Label',
			    \};
			    const \{ container \} = render(
			      <Grommet full background="#0000ff">
			        Grommet App
			      </Grommet>,
			
			      <Grommet messages=\{\{ format: (opts) => messages[opts.id] \}\}>
			        <MessageContext.Consumer>
			          \{(\{ format \}) => format(\{ id: 'test.label' \})\}
			        </MessageContext.Consumer>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Grommet\\__tests__\\Grommet-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('grommet_grommet\\src\\js\\components\\Header\\__tests__\\Header-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			
			import \{ Grommet, Header \} from '../..';
			
			describe('Header', () => \{
			  it('should forward a ref to the underlying header', () => \{
			    const ref = React.createRef<HTMLDivElement>();
			
			    render(
			      <Grommet>
			        <Header ref=\{ref\}>Hello, World!</Header>
			      </Grommet>,
			    );
			
			    expect(ref.current).not.toBe(null);
			    expect(ref.current?.nodeName).toBe('HEADER');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Header\\__tests__\\Header-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('grommet_grommet\\src\\js\\components\\Heading\\__tests__\\Heading-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Heading \} from '..';
			
			test('Heading renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Heading accepts ref', () => \{
			  const ref = React.createRef<HTMLHeadingElement>();
			  const \{ container \} = render(
			    <Grommet>
			      <Heading ref=\{ref\} />
			    </Grommet>,
			  );
			
			  expect(ref.current).not.toBeNull();
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Heading level renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading level=\{1\} />
			      <Heading level=\{2\} />
			      <Heading level=\{3\} />
			      <Heading level=\{4\} />
			      <Heading level="1" />
			      <Heading level="2" />
			      <Heading level="3" />
			      <Heading level="4" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Heading size renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading level=\{1\} size="small" />
			      <Heading level=\{1\} size="medium" />
			      <Heading level=\{1\} size="large" />
			      <Heading level=\{1\} size="xlarge" />
			      <Heading level=\{2\} size="small" />
			      <Heading level=\{2\} size="medium" />
			      <Heading level=\{2\} size="large" />
			      <Heading level=\{2\} size="xlarge" />
			      <Heading level=\{3\} size="small" />
			      <Heading level=\{3\} size="medium" />
			      <Heading level=\{3\} size="large" />
			      <Heading level=\{3\} size="xlarge" />
			      <Heading level=\{4\} size="small" />
			      <Heading level=\{4\} size="medium" />
			      <Heading level=\{4\} size="large" />
			      <Heading level=\{4\} size="xlarge" />
			      <Heading level=\{1\} size="77px" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Heading textAlign renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading textAlign="start" />
			      <Heading textAlign="center" />
			      <Heading textAlign="end" />
			      <Heading textAlign="justify" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Heading margin renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading margin="small" />
			      <Heading margin="medium" />
			      <Heading margin="large" />
			      <Heading margin="none" />
			      <Heading margin=\{\{ bottom: 'small' \}\} />
			      <Heading margin=\{\{ top: 'small' \}\} />
			      <Heading margin=\{\{ bottom: 'none' \}\} />
			      <Heading margin=\{\{ top: 'none' \}\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Heading color renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading color="brand" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			const LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
			
			test('Heading truncate renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading truncate=\{false\}>\{LONG\}</Heading>
			      <Heading truncate>\{LONG\}</Heading>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('responsive renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading responsive />
			      <Heading responsive=\{false\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Theme based font family renders', () => \{
			  const customTheme = \{
			    heading: \{
			      font: \{
			        family: 'Fira Sans',
			      \},
			      level: \{
			        1: \{
			          font: \{
			            family: 'Arial',
			          \},
			        \},
			        2: \{
			          font: \{
			            family: 'Roboto',
			          \},
			        \},
			        3: \{
			          font: \{
			            family: 'Ubuntu',
			          \},
			        \},
			      \},
			    \},
			  \};
			  const \{ container \} = render(
			    <Grommet theme=\{customTheme\}>
			      <Heading level=\{1\} />
			      <Heading level=\{2\} />
			      <Heading level=\{3\} />
			      <Heading level=\{4\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Theme based font weight renders', () => \{
			  const customTheme = \{
			    heading: \{
			      weight: 600,
			      level: \{
			        1: \{
			          font: \{
			            weight: '700',
			          \},
			        \},
			        2: \{
			          font: \{
			            weight: '400',
			          \},
			        \},
			        3: \{
			          font: \{
			            weight: '200',
			          \},
			        \},
			      \},
			    \},
			  \};
			  const \{ container \} = render(
			    <Grommet theme=\{customTheme\}>
			      <Heading level=\{1\} />
			      <Heading level=\{2\} />
			      <Heading level=\{3\} />
			      <Heading level=\{4\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Theme color renders', () => \{
			  const customTheme = \{
			    heading: \{
			      color: 'text-strong',
			    \},
			  \};
			  const \{ container \} = render(
			    <Grommet theme=\{customTheme\}>
			      <Heading level=\{1\} />
			      <Heading level=\{2\} />
			      <Heading level=\{3\} />
			      <Heading level=\{4\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Throws a warning when heading.level is undefined in the theme.', () => \{
			  global.console.warn = jest.fn();
			
			  const customTheme = \{
			    heading: \{
			      level: \{
			        6: undefined,
			      \},
			    \},
			  \};
			
			  render(
			    <Grommet theme=\{customTheme\}>
			      <Heading level=\{6\} />
			    </Grommet>,
			  );
			
			  const consoleMsg = 'Heading level 6 is not defined in your theme.';
			  expect(global.console.warn).toHaveBeenCalledWith(consoleMsg);
			\});
			
			test('Heading fill renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Heading fill />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Heading\\__tests__\\Heading-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(14)
    });
    it('grommet_grommet\\src\\js\\components\\Image\\__tests__\\Image-test.tsx', () => {
        const sourceCode = `
			import React, \{ useState \} from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			import userEvent from '@testing-library/user-event';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Image \} from '..';
			import \{ Button \} from '../../Button';
			
			const opacityTypes = ['weak', 'medium', 'strong', '0.3', true, false];
			const SRC =
			  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII='; // eslint-disable-line max-len
			
			test('image should have no violations', async () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Image src=\{SRC\} a11yTitle="Alt Text" />
			    </Grommet>,
			  );
			
			  const results = await axe(container);
			  expect(results).toHaveNoViolations();
			\});
			
			test('Image renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Image src=\{SRC\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Image renders with aria-label', () => \{
			  const \{ container, getByLabelText \} = render(
			    <Grommet>
			      <Image a11yTitle="aria-label-text" src=\{SRC\} />
			      <Image aria-label="aria-label-text-2" src=\{SRC\} />
			    </Grommet>,
			  );
			
			  expect(getByLabelText('aria-label-text')).toBeTruthy();
			  expect(getByLabelText('aria-label-text-2')).toBeTruthy();
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Image fit renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Image fit="cover" src=\{SRC\} />
			      <Image fit="contain" src=\{SRC\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			opacityTypes.forEach((opacity) => \{
			  test(\`Image opacity of \$\{opacity\} renders\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Image opacity=\{opacity\} src=\{SRC\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			
			test('Image fillProp renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Image fill src=\{SRC\} />
			      <Image fill=\{false\} src=\{SRC\} />
			      <Image fill="horizontal" src=\{SRC\} />
			      <Image fill="vertical" src=\{SRC\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Image onError', () => \{
			  const onError = jest.fn();
			  const \{ getByAltText \} = render(
			    <Grommet>
			      <Image alt="test" onError=\{onError\} />
			    </Grommet>,
			  );
			
			  fireEvent(getByAltText('test'), new Event('error'));
			
			  expect(onError).toHaveBeenCalledTimes(1);
			\});
			
			test('Image onLoad', () => \{
			  const onLoad = jest.fn();
			  render(
			    <Grommet>
			      <Image alt="test" onLoad=\{onLoad\} />
			    </Grommet>,
			  );
			
			  expect(onLoad).not.toHaveBeenCalled();
			
			  const image = screen.getByRole('img', \{ name: 'test' \});
			  fireEvent.load(image);
			
			  expect(onLoad).toHaveBeenCalledTimes(1);
			\});
			
			test('Image fallback', async () => \{
			  const user = userEvent.setup();
			
			  const onError = jest.fn();
			  const fallbackImage = 'https://v2.grommet.io/assets/IMG_4245.jpg';
			  const regularImage = 'https://v2.grommet.io/img/stak-hurrah.svg';
			
			  const Test = () => \{
			    const [imgSrc, setImgSrc] = useState('');
			    return (
			      <Grommet>
			        <Image
			          fill="horizontal"
			          fallback=\{fallbackImage\}
			          src=\{imgSrc\}
			          alt="test"
			          onError=\{onError\}
			        />
			        <Button
			          label="Update Image"
			          onClick=\{() => \{
			            setImgSrc(regularImage);
			          \}\}
			        />
			      </Grommet>
			    );
			  \};
			
			  const \{ getByAltText \} = render(<Test />);
			
			  fireEvent(getByAltText('test'), new Event('error'));
			  let imgSrc = screen.getByRole<HTMLImageElement>('img').src;
			  expect(imgSrc).toEqual(fallbackImage);
			
			  await user.click(screen.getByRole('button', \{ name: /Update Image/i \}));
			  imgSrc = screen.getByRole<HTMLImageElement>('img').src;
			  expect(imgSrc).toEqual(regularImage);
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Image\\__tests__\\Image-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(9)
    });
    it('grommet_grommet\\src\\js\\components\\InfiniteScroll\\__tests__\\InfiniteScroll-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, act \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet, Image, Box, InfiniteScrollProps \} from '../..';
			import \{ InfiniteScroll \} from '..';
			
			type InfiniteScrollItemType = InfiniteScrollProps['items'] extends (infer U)[]
			  ? U
			  : never;
			
			const simpleItems = (value: number) =>
			  Array(value)
			    .fill(\`\`)
			    .map((_, i) => \`item \$\{i + 1\}\`);
			
			const createPageItems = (allChildren: HTMLElement[]) => \{
			  const unfiltered = Array.from(allChildren);
			  // Removing any children which are serving as refs
			  return unfiltered.filter((childItem) => childItem.outerHTML.includes('item'));
			\};
			
			describe('InfiniteScroll', () => \{
			  const items: InfiniteScrollProps['items'] = [];
			  while (items.length < 4) items.push(items.length);
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll />
			        <InfiniteScroll items=\{items\}>
			          \{(
			            item: InfiniteScrollItemType,
			            index: number,
			            ref: React.MutableRefObject<HTMLInputElement>,
			          ) => (
			            <div ref=\{ref\} key=\{index\}>
			              \{item\}
			            </div>
			          )\}
			        </InfiniteScroll>
			        <InfiniteScroll items=\{items\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <div key=\{index\}>\{item\}</div>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('step', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{items\} step=\{2\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <div key=\{index\}>\{item\}</div>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('show', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{items\} step=\{2\} show=\{3\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <div key=\{index\}>\{item\}</div>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renderMarker', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll
			          items=\{items\}
			          step=\{2\}
			          renderMarker=\{(m) => <div>\{m\}</div>\}
			        >
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <div key=\{index\}>\{item\}</div>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('replace', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{items\} step=\{2\} replace>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <div key=\{index\}>\{item\}</div>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render expected items when supplied
			  assortment of mixed items\`, () => \{
			    const lorem = \`Lorem ipsum dolor sit amet, consectetur adipisicing elit,
			    sed do eiusmod temporincididunt ut labore et dolore magna
			    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
			    ullamco laboris nisi ut aliquip ex ea commodo consequat.
			    Duis aute irure dolor in reprehenderit in voluptate velit
			    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
			    occaecat cupidatat non proident, sunt in culpa qui officia
			    deserunt mollit anim id est laborum.\`;
			    const mixedItems: InfiniteScrollProps['items'] = [];
			    // Generate large array of mixed items to test different elements on a page
			    for (let i = 0; i < 200; i += 1) \{
			      switch (i % 5) \{
			        case 0:
			          mixedItems.push(<Box>Hello World</Box>);
			          break;
			        case 1:
			          mixedItems.push(\`This is a string at index \$\{i\}\`);
			          break;
			        case 2:
			          mixedItems.push(
			            <Image
			              a11yTitle="Gremlin"
			              src="https://v2.grommet.io/img/stak-hurrah.svg"
			            />,
			          );
			          break;
			        case 3:
			          switch (i % 4) \{
			            case 0:
			              mixedItems.push(lorem);
			              break;
			            case 1:
			              mixedItems.push(lorem.slice(140));
			              break;
			            case 2:
			              mixedItems.push(lorem + lorem);
			              break;
			            case 3:
			              mixedItems.push(lorem.slice(i, Math.min(i * 3, lorem.length)));
			              break;
			            default:
			              break;
			          \}
			          break;
			        case 4:
			          mixedItems.push(i * 186282);
			          break;
			        default:
			          break;
			      \}
			    \}
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{mixedItems\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <div key=\{index\}>\{item\}</div>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			
			describe('Number of Items Rendered', () => \{
			  test(\`Should render items equal to the length of 
			  step when step < items.length\`, () => \{
			    const step = 50;
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{simpleItems(1000)\} step=\{step\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // @ts-ignore
			    const pageItems = createPageItems(container.firstChild.children);
			    const expectedItems = step;
			    expect(pageItems.length).toEqual(expectedItems);
			  \});
			
			  test(\`Should render items equal to the length of
			  step when step = array.length\`, () => \{
			    const step = 200;
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{simpleItems(200)\} step=\{step\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // @ts-ignore
			    const pageItems = createPageItems(container.firstChild.children);
			    const expectedItems = step;
			    expect(pageItems.length).toEqual(expectedItems);
			  \});
			
			  test(\`Should render items equal to the length of
			  item array when step > array\`, () => \{
			    const numItems = 1000;
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{simpleItems(numItems)\} step=\{1050\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // @ts-ignore
			    const pageItems = createPageItems(container.firstChild.children);
			    const expectedItems = numItems;
			    expect(pageItems.length).toEqual(expectedItems);
			  \});
			
			  test(\`Should only contain unique items (i.e no duplicates)\`, () => \{
			    const step = 25;
			    const numItems = 200;
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{simpleItems(numItems)\} step=\{step\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // @ts-ignore
			    const pageItems = createPageItems(container.firstChild.children);
			    const distinctItems = new Set(pageItems);
			    /* Expected number of items should be at the show value rounded
			    up to the next step increment/ */
			    const expectedItems = step;
			    /* If the number of distinct items is equivalent to the length 
			    of results, then we have unique items. */
			    expect(distinctItems.size).toEqual(expectedItems);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			
			describe('show scenarios', () => \{
			  test(\`When show, show item should be visible in window\`, () => \{
			    jest.useFakeTimers();
			    // Mock scrollIntoView since JSDOM doesn't do layout.
			    // https://github.com/jsdom/jsdom/issues/1695#issuecomment-449931788
			    window.HTMLElement.prototype.scrollIntoView = jest.fn();
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll items=\{simpleItems(300)\} show=\{105\}>
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			    // advance timers so InfiniteScroll can scroll to show index
			    act(() => \{
			      jest.advanceTimersByTime(200);
			    \});
			    // item(104) = 'item 105' because indexing starts at 0.
			    // Need to modify this next selection to only be concerned with the
			    // visible window.
			    // @ts-ignore
			    const renderedItems = container.firstChild.children.item(104).outerHTML;
			    expect(renderedItems).toContain('item 105');
			  \});
			
			  test(\`When show, should only contain unique 
			          items (i.e no duplicates)\`, () => \{
			    const step = 25;
			    const numItems = 200;
			    const showIndex = 67;
			    const \{ container \} = render(
			      <Grommet>
			        <InfiniteScroll
			          items=\{simpleItems(numItems)\}
			          show=\{showIndex\}
			          step=\{step\}
			        >
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // @ts-ignore
			    const pageItems = createPageItems(container.firstChild.children);
			    const distinctItems = new Set(pageItems);
			    /* Expected number of items should be at the show value rounded
			    up to the next step increment/ */
			    const expectedItems = Math.ceil(showIndex / step) * step;
			    /* If the number of distinct items is equivalent to the length
			    of results, then we have unique items. */
			    expect(distinctItems.size).toEqual(expectedItems);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should display specified item when show is greater than step\`, () => \{
			    const step = 8;
			    const numItems = 200;
			    const showIndex = 41;
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <InfiniteScroll
			          items=\{simpleItems(numItems)\}
			          show=\{showIndex\}
			          step=\{step\}
			        >
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // Check to see that expected item exists
			    const expectedItem = getByText('item 42').innerHTML;
			    expect(expectedItem).toMatch(simpleItems(numItems)[showIndex]);
			
			    // Check to see that we have the total number of items we expect
			    // @ts-ignore
			    const pageItems = createPageItems(container.firstChild.children);
			    /* Expected number of items should be at the show value rounded
			    up to the next step increment/ */
			    const expectedItems = Math.ceil(showIndex / step) * step;
			    expect(pageItems.length).toEqual(expectedItems);
			  \});
			
			  test(\`should display specified item when show is less than step\`, () => \{
			    const step = 30;
			    const numItems = 200;
			    const showIndex = 26;
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <InfiniteScroll
			          items=\{simpleItems(numItems)\}
			          show=\{showIndex\}
			          step=\{step\}
			        >
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // Check to see that expected item exists
			    const expectedItem = getByText('item 27').innerHTML;
			    expect(expectedItem).toMatch(simpleItems(numItems)[showIndex]);
			
			    // Check to see that we have the total number of items we expect
			    // @ts-ignore
			    const pageItems = createPageItems(container.firstChild.children);
			
			    /* Expected number of items should be at the show value rounded
			    up to the next step increment/ */
			    const expectedItems = Math.ceil(showIndex / step) * step;
			    expect(pageItems.length).toEqual(expectedItems);
			  \});
			
			  test(\`should display specified item when show is 
			        greater than step and replace is true\`, () => \{
			    const step = 18;
			    const numItems = 200;
			    const showIndex = 88;
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <InfiniteScroll
			          items=\{simpleItems(numItems)\}
			          replace
			          show=\{showIndex\}
			          step=\{step\}
			        >
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // Check to see that expected item exists
			    const expectedItem = getByText('item 89').innerHTML;
			    expect(expectedItem).toMatch(simpleItems(numItems)[showIndex]);
			
			    // Check to see that our replace items have been removed from the DOM.
			    expect(container.firstChild).not.toContain('item 7');
			
			    /* Check to see that we have the total number of items we expect.
			     * When replace is true, the expected number of items should be less
			     * than or equal to the step * 2.
			     */
			
			    /*
			     * The following needs to be uncommented to for this test to pass.
			     */
			    // const pageItems = createPageItems(container.firstChild.children);
			    // const expectedItems = step * 2;
			    // expect(pageItems.length).toBeLessThanOrEqual(expectedItems);
			  \});
			
			  test(\`should display specified item when show is 
			        less than step and replace is true\`, () => \{
			    const step = 30;
			    const numItems = 200;
			    const showIndex = 26;
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <InfiniteScroll
			          items=\{simpleItems(numItems)\}
			          replace
			          show=\{showIndex\}
			          step=\{step\}
			        >
			          \{(item: InfiniteScrollItemType, index: number) => (
			            <Box key=\{index\}>\{item\}</Box>
			          )\}
			        </InfiniteScroll>
			      </Grommet>,
			    );
			
			    // Check to see that expected item exists
			    const expectedItem = getByText('item 27').innerHTML;
			    expect(expectedItem).toMatch(simpleItems(numItems)[showIndex]);
			
			    /* Check to see that we have the total number of items we expect.
			     * When replace is true, the expected number of items should be less
			     * than or equal to the step * 2.
			     */
			    // @ts-ignore
			    const pageItems = createPageItems(container.firstChild.children);
			    const expectedItems = step * 2;
			    expect(pageItems.length).toBeLessThanOrEqual(expectedItems);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\InfiniteScroll\\__tests__\\InfiniteScroll-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(16)
    });
    it('grommet_grommet\\src\\js\\components\\Keyboard\\__tests__\\Keyboard-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent, screen \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Keyboard \} from '..';
			
			describe('Keyboard', () => \{
			  test('onDown', () => \{
			    const onDown = jest.fn();
			    const \{ container \} = render(
			      <Grommet>
			        <Keyboard onDown=\{onDown\}>
			          <span>hi</span>
			        </Keyboard>
			      </Grommet>,
			    );
			
			    const element = screen.getByText('hi');
			
			    fireEvent.keyDown(element, \{ keyCode: 40 \});
			    fireEvent.keyDown(element, \{ which: 40 \});
			    fireEvent.keyDown(element, \{ which: 0 \});
			
			    expect(onDown).toHaveBeenCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onKeyDown', () => \{
			    const onDown = jest.fn();
			    const onKeyDown = jest.fn();
			    const \{ container \} = render(
			      <Grommet>
			        <Keyboard onDown=\{onDown\} onKeyDown=\{onKeyDown\}>
			          <span>hi</span>
			        </Keyboard>
			      </Grommet>,
			    );
			
			    const element = screen.getByText('hi');
			
			    fireEvent.keyDown(element, \{ keyCode: 40 \});
			
			    expect(onDown).toBeCalled();
			    expect(onKeyDown).toBeCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('change onKeyDown', () => \{
			    const firstOnKeyDown = jest.fn();
			    const secondOnKeyDown = jest.fn();
			
			    const \{ container, getByText, rerender \} = render(
			      <Keyboard target="document" onKeyDown=\{firstOnKeyDown\}>
			        <span>hi</span>
			      </Keyboard>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent(
			      getByText('hi'),
			      new KeyboardEvent('keydown', \{ bubbles: true, cancelable: true \}),
			    );
			    expect(firstOnKeyDown).toBeCalled();
			
			    rerender(
			      <Keyboard target="document" onKeyDown=\{secondOnKeyDown\}>
			        <span>hi</span>
			      </Keyboard>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent(
			      getByText('hi'),
			      new KeyboardEvent('keydown', \{ bubbles: true, cancelable: true \}),
			    );
			    expect(secondOnKeyDown).toBeCalled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Keyboard\\__tests__\\Keyboard-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('grommet_grommet\\src\\js\\components\\Layer\\__tests__\\Layer-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ render, fireEvent \} from '@testing-library/react';
			import \{ getByTestId, queryByTestId \} from '@testing-library/dom';
			import 'regenerator-runtime/runtime';
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			
			import \{ Grommet, Box, Layer, Select \} from '../..';
			import \{ LayerContainer \} from '../LayerContainer';
			
			const SimpleLayer = () => \{
			  const [showLayer, setShowLayer] = React.useState(true);
			
			  React.useEffect(() => setShowLayer(false), []);
			
			  let layer;
			  if (showLayer) \{
			    layer = <Layer data-testid="test-dom-removal">This is a test</Layer>;
			  \}
			  return <Box>\{layer\}</Box>;
			\};
			
			const FakeLayer = (\{ children, dataTestid, ...rest \}) => \{
			  const [showLayer, setShowLayer] = React.useState(false);
			
			  React.useEffect(() => setShowLayer(true), []);
			
			  let layer;
			  if (showLayer) \{
			    layer = (
			      <Layer onEsc=\{() => setShowLayer(false)\} \{...rest\}>
			        <div data-testid=\{dataTestid\}>
			          This is a layer
			          <input data-testid="test-input" />
			        </div>
			      </Layer>
			    );
			  \}
			  return (
			    <Box>
			      \{layer\}
			      \{children\}
			    </Box>
			  );
			\};
			
			const TargetLayer = (props) => \{
			  const [target, setTarget] = React.useState();
			  let layer;
			  if (target) \{
			    layer = (
			      <Layer \{...props\} target=\{target\}>
			        this is a test layer
			      </Layer>
			    );
			  \}
			  return (
			    <Grommet>
			      <div ref=\{setTarget\} />
			      \{layer\}
			    </Grommet>
			  );
			\};
			
			describe('Layer', () => \{
			  beforeEach(createPortal);
			  const positions = [
			    'top',
			    'bottom',
			    'left',
			    'right',
			    'start',
			    'end',
			    'center',
			    'top-left',
			    'top-right',
			    'bottom-left',
			    'bottom-right',
			  ];
			
			  const fullOptions = [true, false, 'horizontal', 'vertical'];
			
			  positions.forEach((position) =>
			    fullOptions.forEach((full) => \{
			      test(\`position: \$\{position\} - full: \$\{full\}\`, () => \{
			        render(
			          <Grommet>
			            <Layer id="position-full-test" position=\{position\} full=\{full\}>
			              This is a layer
			            </Layer>
			          </Grommet>,
			        );
			        expectPortal('position-full-test').toMatchSnapshot();
			      \});
			
			      test(\`should render correct border radius for position: \$\{position\} - 
			      full: \$\{full\}\`, () => \{
			        const theme = \{
			          layer: \{
			            border: \{
			              radius: 'large',
			              intelligentRounding: true,
			            \},
			          \},
			        \};
			        render(
			          <Grommet theme=\{theme\}>
			            <Layer id="border-radius-test" position=\{position\} full=\{full\}>
			              This is a layer
			            </Layer>
			          </Grommet>,
			        );
			        expectPortal('border-radius-test').toMatchSnapshot();
			      \});
			    \}),
			  );
			
			  ['none', 'xsmall', 'small', 'medium', 'large'].forEach((margin) =>
			    test(\`margin \$\{margin\}\`, () => \{
			      render(
			        <Grommet>
			          <Layer id="margin-test" margin=\{margin\}>
			            This is a layer
			          </Layer>
			        </Grommet>,
			      );
			      expectPortal('margin-test').toMatchSnapshot();
			    \}),
			  );
			
			  test(\`should apply background\`, () => \{
			    render(
			      <Grommet>
			        <Layer id="margin-test" background="brand">
			          This is a layer
			        </Layer>
			      </Grommet>,
			    );
			    expectPortal('margin-test').toMatchSnapshot();
			  \});
			
			  test(\`custom margin\`, () => \{
			    render(
			      <Grommet>
			        <Layer
			          id="margin-test"
			          margin=\{\{ top: '50px', bottom: '40px', left: '30px', right: '20px' \}\}
			        >
			          This is a layer
			        </Layer>
			      </Grommet>,
			    );
			    expectPortal('margin-test').toMatchSnapshot();
			  \});
			
			  test('hidden', () => \{
			    const \{ rerender \} = render(
			      <Grommet>
			        <Layer id="hidden-test" position="hidden">
			          This is a layer
			        </Layer>
			      </Grommet>,
			    );
			    expectPortal('hidden-test').toMatchSnapshot();
			
			    rerender(
			      <Grommet>
			        <Layer id="hidden-test" position="center">
			          This is a layer
			        </Layer>
			      </Grommet>,
			    );
			    expectPortal('hidden-test').toMatchSnapshot();
			  \});
			
			  test('plain', () => \{
			    // elevation should not be applied when Layer is plain
			    const theme = \{
			      layer: \{
			        container: \{
			          elevation: 'large',
			        \},
			      \},
			    \};
			
			    render(
			      <Grommet theme=\{theme\}>
			        <Layer id="plain-test" plain>
			          This is a plain layer
			        </Layer>
			      </Grommet>,
			    );
			    expectPortal('plain-test').toMatchSnapshot();
			  \});
			
			  test('non-modal', () => \{
			    render(
			      <Grommet>
			        <Layer id="non-modal-test" modal=\{false\}>
			          This is a non-modal layer
			        </Layer>
			      </Grommet>,
			    );
			    expectPortal('non-modal-test').toMatchSnapshot();
			  \});
			
			  test('dark context', () => \{
			    render(
			      <Grommet>
			        <Box background="dark-1">
			          <Layer id="non-modal-test" modal=\{false\}>
			            This is a non-modal layer
			          </Layer>
			        </Box>
			      </Grommet>,
			    );
			    expectPortal('non-modal-test').toMatchSnapshot();
			  \});
			
			  ['slide', 'fadeIn', false, true].forEach((animation) =>
			    test(\`animation \$\{animation\}\`, () => \{
			      render(
			        <Grommet>
			          <Layer id="animation-test" animation=\{animation\}>
			            This is a layer
			          </Layer>
			        </Grommet>,
			      );
			      expectPortal('animation-test').toMatchSnapshot();
			    \}),
			  );
			
			  test('invokes onEsc', () => \{
			    const onEsc = jest.fn();
			    render(
			      <Grommet>
			        <LayerContainer onEsc=\{onEsc\}>
			          <input data-testid="test-input" />
			        </LayerContainer>
			      </Grommet>,
			    );
			
			    const inputNode = getByTestId(document, 'test-input');
			    fireEvent.keyDown(inputNode, \{ key: 'Esc', keyCode: 27, which: 27 \});
			    expect(onEsc).toBeCalled();
			  \});
			
			  test('is accessible', (done) => \{
			    /* eslint-disable jsx-a11y/tabindex-no-positive */
			    render(
			      <Grommet>
			        <FakeLayer dataTestid="test-layer-node">
			          <div data-testid="test-body-node">
			            <input />
			            <input tabIndex="10" />
			          </div>
			        </FakeLayer>
			      </Grommet>,
			    );
			    /* eslint-enable jsx-a11y/tabindex-no-positive */
			
			    let bodyNode = getByTestId(document, 'test-body-node');
			    const layerNode = getByTestId(document, 'test-layer-node');
			    const inputNode = getByTestId(document, 'test-input');
			    expect(bodyNode).toMatchSnapshot();
			    expect(layerNode).toMatchSnapshot();
			
			    fireEvent.keyDown(inputNode, \{ key: 'Esc', keyCode: 27, which: 27 \});
			    // because of de-animation, we test both the initial and delayed states
			    bodyNode = getByTestId(document, 'test-body-node');
			    expect(bodyNode).toMatchSnapshot();
			    setTimeout(() => \{
			      expect(queryByTestId(document, 'test-layer-node')).toBeNull();
			      done();
			    \}, 300);
			  \});
			
			  test('focus on layer', () => \{
			    /* eslint-disable jsx-a11y/no-autofocus */
			    render(
			      <Grommet>
			        <Layer data-testid="focus-layer-test">
			          <input />
			        </Layer>
			        <input autoFocus />
			      </Grommet>,
			    );
			    /* eslint-disable jsx-a11y/no-autofocus */
			
			    const layerNode = getByTestId(document, 'focus-layer-test');
			    expect(layerNode).toMatchSnapshot();
			    expect(document.activeElement.nodeName).toBe('A');
			  \});
			
			  test('not steal focus from an autofocus focusable element', () => \{
			    /* eslint-disable jsx-a11y/no-autofocus */
			    render(
			      <Grommet>
			        <Layer data-testid="focus-layer-input-test">
			          <input autoFocus data-testid="focus-input" />
			          <button type="button">Button</button>
			        </Layer>
			      </Grommet>,
			    );
			    /* eslint-disable jsx-a11y/no-autofocus */
			    const layerNode = getByTestId(document, 'focus-layer-input-test');
			    const inputNode = getByTestId(document, 'focus-input');
			    expect(layerNode).toMatchSnapshot();
			    expect(document.activeElement).toBe(inputNode);
			  \});
			
			  test('target', () => \{
			    render(
			      <Grommet>
			        <TargetLayer id="target-test">This layer has a target</TargetLayer>
			      </Grommet>,
			    );
			    expectPortal('target-test').toMatchSnapshot();
			  \});
			
			  test('target not modal', () => \{
			    render(
			      <Grommet>
			        <TargetLayer id="target-test" modal=\{false\}>
			          This layer has a target
			        </TargetLayer>
			      </Grommet>,
			    );
			    expectPortal('target-test').toMatchSnapshot();
			  \});
			
			  test('unmounts from dom', () => \{
			    render(
			      <Grommet>
			        <SimpleLayer />
			      </Grommet>,
			    );
			    setTimeout(() => \{
			      expect(queryByTestId(document, 'test-dom-removal')).toBeNull();
			    \}, 1000);
			  \});
			
			  test('default containerTarget', () => \{
			    render(
			      <Grommet>
			        <Layer data-testid="layer">Test</Layer>
			      </Grommet>,
			    );
			    const layer = getByTestId(document, 'layer');
			    const actualRoot = layer.parentNode.parentNode.parentNode.parentNode;
			    expect(actualRoot).toBe(document.body);
			  \});
			
			  test('custom containerTarget', () => \{
			    const target = document.createElement('div');
			    document.body.appendChild(target);
			    try \{
			      render(
			        <Grommet containerTarget=\{target\}>
			          <Layer data-testid="layer">Test</Layer>
			        </Grommet>,
			      );
			      const layer = getByTestId(document, 'layer');
			      const actualRoot = layer.parentNode.parentNode.parentNode.parentNode;
			      expect(actualRoot).toBe(target);
			    \} finally \{
			      document.body.removeChild(target);
			    \}
			  \});
			
			  test('invoke onClickOutside when modal=\{true\}', () => \{
			    const onClickOutside = jest.fn();
			    render(
			      <Grommet>
			        <FakeLayer
			          id="layer-node"
			          onClickOutside=\{onClickOutside\}
			          animation=\{false\}
			        >
			          <div data-testid="test-body-node" />
			        </FakeLayer>
			      </Grommet>,
			    );
			    expectPortal('layer-node').toMatchSnapshot();
			
			    fireEvent(
			      document,
			      new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			    );
			    expect(onClickOutside).toHaveBeenCalledTimes(1);
			  \});
			
			  test('invoke onClickOutside when modal=\{false\}', () => \{
			    const onClickOutside = jest.fn();
			    render(
			      <Grommet>
			        <FakeLayer
			          id="layer-node"
			          onClickOutside=\{onClickOutside\}
			          modal=\{false\}
			          animation=\{false\}
			        >
			          <div data-testid="test-body-node" />
			        </FakeLayer>
			      </Grommet>,
			    );
			    expectPortal('layer-node').toMatchSnapshot();
			
			    fireEvent(
			      document,
			      new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			    );
			    expect(onClickOutside).toHaveBeenCalledTimes(1);
			  \});
			
			  test('invoke onClickOutside when modal=\{false\} and layer has target', () => \{
			    const onClickOutside = jest.fn();
			    render(
			      <TargetLayer
			        id="target-test"
			        onClickOutside=\{onClickOutside\}
			        modal=\{false\}
			        animation=\{false\}
			      />,
			    );
			    expectPortal('target-test').toMatchSnapshot();
			
			    fireEvent(
			      document,
			      new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			    );
			    expect(onClickOutside).toHaveBeenCalledTimes(1);
			  \});
			
			  test('invoke onClickOutside when modal=\{true\} and layer has target', () => \{
			    const onClickOutside = jest.fn();
			    render(
			      <TargetLayer
			        id="target-test"
			        onClickOutside=\{onClickOutside\}
			        animation=\{false\}
			      />,
			    );
			    expectPortal('target-test').toMatchSnapshot();
			
			    fireEvent(
			      document,
			      new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			    );
			    expect(onClickOutside).toHaveBeenCalledTimes(1);
			  \});
			
			  test('custom theme', () => \{
			    const theme = \{
			      layer: \{
			        container: \{
			          elevation: 'large',
			        \},
			      \},
			    \};
			
			    render(
			      <Grommet theme=\{theme\}>
			        <Layer id="custom-theme-test" animation=\{false\}>
			          This is a layer
			        </Layer>
			      </Grommet>,
			    );
			    expectPortal('custom-theme-test').toMatchSnapshot();
			  \});
			
			  test('invokes onEsc when modal=\{false\}', () => \{
			    jest.useFakeTimers();
			    window.scrollTo = jest.fn();
			    const onEsc = jest.fn();
			    const \{ getByText, queryByText \} = render(
			      <Grommet>
			        <Layer id="esc-test" onEsc=\{onEsc\} modal=\{false\} animation=\{false\}>
			          <Select options=\{['one', 'two', 'three']\} data-testid="test-select" />
			        </Layer>
			      </Grommet>,
			    );
			
			    const selectNode = getByTestId(document, 'test-select');
			
			    fireEvent.click(selectNode);
			    // advance timers so the select opens
			    jest.advanceTimersByTime(100);
			    // verify that select is open
			    expect(getByText('one')).toBeTruthy();
			
			    fireEvent.keyDown(document, \{
			      key: 'Esc',
			      keyCode: 27,
			      which: 27,
			    \});
			
			    // advance timers so the select closes
			    jest.advanceTimersByTime(100);
			    expect(queryByText('one')).toBeFalsy();
			    // onEsc should not be called on the Layer yet
			    expect(onEsc).toBeCalledTimes(0);
			
			    fireEvent.keyDown(document, \{
			      key: 'Esc',
			      keyCode: 27,
			      which: 27,
			    \});
			    expect(onEsc).toBeCalledTimes(1);
			    expectPortal('esc-test').toMatchSnapshot();
			  \});
			
			  test('should only place id on StyledLayer when singleId === true', () => \{
			    render(
			      <Grommet options=\{\{ layer: \{ singleId: true \} \}\}>
			        <Layer id="singleId-test" animation=\{false\}>
			          This is a layer
			        </Layer>
			      </Grommet>,
			    );
			    expectPortal('singleId-test').toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Layer\\__tests__\\Layer-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(26)
    });
    it('grommet_grommet\\src\\js\\components\\List\\__tests__\\List-test.js', () => {
        const sourceCode = `
			import React, \{ useState \} from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import '@testing-library/jest-dom';
			import userEvent from '@testing-library/user-event';
			import \{ render, fireEvent, screen \} from '@testing-library/react';
			
			import \{ axe \} from 'jest-axe';
			import \{ Grommet \} from '../../Grommet';
			import \{ List \} from '..';
			import \{ Box \} from '../../Box';
			import \{ Text \} from '../../Text';
			
			const data = [];
			for (let i = 0; i < 95; i += 1) \{
			  data.push(\`entry-\$\{i\}\`);
			\}
			
			describe('List', () => \{
			  test('should have no accessibility violations', async () => \{
			    const onClickItem = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <List
			          aria-label="List"
			          data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\}
			          onClickItem=\{onClickItem\}
			        />
			      </Grommet>,
			    );
			
			    fireEvent.click(getByText('alpha'));
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('renders a11yTitle and aria-label', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <List a11yTitle="test" data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\} />
			        <List aria-label="test-2" data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\} />
			      </Grommet>,
			    );
			    expect(getByLabelText('test')).toBeTruthy();
			    expect(getByLabelText('test-2')).toBeTruthy();
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('empty', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('data strings', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('data objects', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onClickItem', () => \{
			    const onClickItem = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <List
			          data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\}
			          onClickItem=\{onClickItem\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('beta'));
			    expect(onClickItem).toBeCalledWith(
			      expect.objectContaining(\{ item: \{ a: 'beta' \} \}),
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('background string', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} background="accent-1" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('background array', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List
			          data=\{['one', 'two', 'three', 'four']\}
			          background=\{['accent-1', 'accent-2']\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border boolean true', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} border />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border boolean false', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} border=\{false\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border side', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} border="horizontal" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border object', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List
			          data=\{['one', 'two']\}
			          border=\{\{ color: 'accent-1', side: 'horizontal', size: 'large' \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('children render', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\}>
			          \{(item, index) => \`\$\{item\} - \$\{index\}\`\}
			        </List>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('defaultItemProps', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List
			          data=\{['one', 'two']\}
			          defaultItemProps=\{\{
			            background: 'accent-1',
			            align: 'start',
			          \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('itemProps', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List
			          data=\{['one', 'two']\}
			          itemProps=\{\{
			            1: \{
			              background: 'accent-1',
			              border: \{ side: 'horizontal', size: 'small' \},
			              pad: 'large',
			            \},
			          \}\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('margin string', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} margin="large" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('margin object', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} margin=\{\{ horizontal: 'large' \}\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad string', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} pad="large" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('pad object', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['one', 'two']\} pad=\{\{ horizontal: 'large' \}\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('primaryKey', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          primaryKey="a"
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('secondaryKey', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List
			          data=\{[
			            \{ a: 'one', b: 1 \},
			            \{ a: 'two', b: 2 \},
			          ]\}
			          primaryKey="a"
			          secondaryKey="b"
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			
			describe('List events', () => \{
			  let onActive;
			  let onClickItem;
			  let App;
			
			  beforeEach(() => \{
			    onActive = jest.fn();
			    onClickItem = jest.fn();
			    App = () => (
			      <Grommet>
			        <List
			          data=\{[\{ a: 'alpha' \}, \{ a: 'beta' \}]\}
			          onClickItem=\{onClickItem\}
			          onActive=\{onActive\}
			        />
			      </Grommet>
			    );
			  \});
			
			  test('Enter key', () => \{
			    const \{ container, getByText \} = render(<App />);
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('beta'));
			    fireEvent.mouseOver(getByText('beta'));
			    fireEvent.keyDown(getByText('beta'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onActive).toHaveBeenCalledTimes(1);
			    // Reported bug: onEnter calls onClickItem twice instead of once.
			    // Issue #4173. Once fixed it should be
			    // \`expect(onClickItem).toHaveBeenCalledTimes(2);\`
			    expect(onClickItem).toHaveBeenCalledTimes(3);
			    // Both focus and active should be placed on 'beta'
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('ArrowUp key', () => \{
			    const \{ container, getByText \} = render(<App />);
			
			    fireEvent.click(getByText('beta'));
			    fireEvent.mouseOver(getByText('beta'));
			    fireEvent.keyDown(getByText('beta'), \{
			      key: 'ArrowUp',
			      keyCode: 38,
			      which: 38,
			    \});
			    expect(onClickItem).toHaveBeenCalledTimes(1);
			    expect(onActive).toHaveBeenCalledTimes(2);
			    // Focus on beta while \`active\` is on alpha
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('ArrowDown key', () => \{
			    const \{ container, getByText \} = render(<App />);
			
			    fireEvent.click(getByText('alpha'));
			    fireEvent.mouseOver(getByText('alpha'));
			    fireEvent.keyDown(getByText('alpha'), \{
			      key: 'ArrowDown',
			      keyCode: 40,
			      which: 40,
			    \});
			    expect(onClickItem).toHaveBeenCalledTimes(1);
			    expect(onActive).toHaveBeenCalledTimes(2);
			    // Focus on alpha while \`active\` is on beta
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('ArrowDown key on last element', () => \{
			    const \{ container, getByText \} = render(<App />);
			
			    fireEvent.click(getByText('beta'));
			    fireEvent.mouseOver(getByText('beta'));
			    fireEvent.keyDown(getByText('beta'), \{
			      key: 'ArrowDown',
			      keyCode: 40,
			      which: 40,
			    \});
			    expect(onClickItem).toHaveBeenCalledTimes(1);
			    expect(onActive).toHaveBeenCalledTimes(1);
			    // Both focus and active should be placed on 'beta'
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('focus and blur', () => \{
			    const \{ container, getByText \} = render(<App />);
			
			    fireEvent.focus(getByText('beta'));
			    // Both focus and active should be placed on 'beta'
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.blur(getByText('beta'));
			    // Focus on beta while \`active\` is not on beta
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onClickItem).toBeCalledTimes(0);
			  \});
			
			  test('mouse events', () => \{
			    const \{ container, getByText \} = render(<App />);
			
			    fireEvent.mouseOver(getByText('beta'));
			    // Both focus and active should be placed on 'beta'
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.mouseOut(getByText('beta'));
			    // Focus on beta while \`active\` is not on beta
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onClickItem).toBeCalledTimes(0);
			    expect(onActive).toHaveBeenCalledTimes(2);
			  \});
			
			  test('should paginate', () => \{
			    const \{ container, getAllByText \} = render(
			      <Grommet>
			        <List data=\{data\} paginate />
			      </Grommet>,
			    );
			
			    const results = getAllByText('entry', \{ exact: false \});
			    // default step 50
			    expect(results.length).toEqual(50);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should apply pagination styling', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{data\} paginate=\{\{ background: 'red', margin: 'large' \}\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should show correct item index when "show" is a number', () => \{
			    const show = 15;
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <List data=\{data\} show=\{show\} paginate />
			      </Grommet>,
			    );
			
			    const result = getByText(\`entry-\$\{show\}\`);
			    expect(result).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should show correct page when "show" is \{ page: # \}', () => \{
			    const desiredPage = 2;
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{data\} show=\{\{ page: desiredPage \}\} paginate />
			      </Grommet>,
			    );
			
			    const activePage = container.querySelector(
			      \`[aria-current="page"]\`,
			    ).innerHTML;
			
			    expect(activePage).toEqual(\`\$\{desiredPage\}\`);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should render correct num items per page (step)', () => \{
			    const step = 14;
			    const \{ container, getAllByText \} = render(
			      <Grommet>
			        <List data=\{data\} step=\{step\} paginate />
			      </Grommet>,
			    );
			
			    const results = getAllByText('entry', \{ exact: false \});
			
			    expect(results.length).toEqual(step);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should render new data when page changes', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <List data=\{data\} paginate />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByLabelText('Go to next page'));
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should not show paginate controls when length of data < step', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <List data=\{['entry-1', 'entry-2', 'entry-3']\} paginate />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			
			describe('List onOrder', () => \{
			  let onOrder;
			  let App;
			
			  beforeEach(() => \{
			    onOrder = jest.fn();
			    App = () => \{
			      const [ordered, setOrdered] = useState([\{ a: 'alpha' \}, \{ a: 'beta' \}]);
			      return (
			        <Grommet>
			          <List
			            data=\{ordered\}
			            primaryKey="a"
			            onOrder=\{(newData) => \{
			              setOrdered(newData);
			              onOrder(newData);
			            \}\}
			          />
			        </Grommet>
			      );
			    \};
			  \});
			
			  test('Mouse move down', () => \{
			    const \{ container \} = render(<App />);
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(container.querySelector('#alphaMoveDown'));
			    expect(onOrder).toHaveBeenCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('Keyboard move down', () => \{
			    const \{ container, getByText \} = render(<App />);
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('alpha'));
			    fireEvent.mouseOver(getByText('alpha'));
			    fireEvent.keyDown(getByText('alpha'), \{
			      key: 'ArrowDown',
			      keyCode: 40,
			      which: 40,
			    \});
			    // alpha's down arrow control should be active
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.keyDown(getByText('alpha'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onOrder).toHaveBeenCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('Keyboard move up', () => \{
			    const \{ container, getByText \} = render(<App />);
			
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('alpha'));
			    fireEvent.mouseOver(getByText('alpha'));
			    fireEvent.keyDown(getByText('alpha'), \{
			      key: 'ArrowDown',
			      keyCode: 40,
			      which: 40,
			    \});
			    fireEvent.keyDown(getByText('alpha'), \{
			      key: 'ArrowDown',
			      keyCode: 40,
			      which: 40,
			    \});
			    // beta's up arrow control should be active
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.keyDown(getByText('alpha'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onOrder).toHaveBeenCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			
			describe('List disabled', () => \{
			  const locations = [
			    'Boise',
			    'Fort Collins',
			    'Los Gatos',
			    'Palo Alto',
			    'San Francisco',
			  ];
			  const disabledLocations = ['Fort Collins', 'Palo Alto'];
			
			  test('Should apply disabled styling to items', () => \{
			    const App = () => (
			      <Grommet>
			        <List data=\{locations\} disabled=\{disabledLocations\} />
			      </Grommet>
			    );
			    const \{ asFragment \} = render(<App />);
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('Should render aria-disabled="true"', () => \{
			    const App = () => (
			      <Grommet>
			        <List data=\{locations\} disabled=\{disabledLocations\} />
			      </Grommet>
			    );
			    render(<App />);
			
			    const allItems = screen.getAllByRole('listitem');
			    expect(allItems).toHaveLength(locations.length);
			    let disabledCount = 0;
			    allItems.forEach((item) => \{
			      if (item.getAttribute('aria-disabled') === 'true') \{
			        disabledCount += 1;
			      \}
			    \});
			    expect(disabledCount).toBe(disabledLocations.length);
			  \});
			
			  test('Should apply disabled styling to items when data are objects', () => \{
			    const typeObjects = [
			      \{ city: 'Boise', state: 'Idaho' \},
			      \{ city: 'Fort Collins', state: 'Colorado' \},
			      \{ city: 'Los Gatos', state: 'California' \},
			      \{ city: 'Palo Alto', state: 'California' \},
			      \{ city: 'San Francisco', state: 'California' \},
			    ];
			
			    const App = () => (
			      <Grommet>
			        <List data=\{typeObjects\} disabled=\{disabledLocations\} itemKey="city" />
			      </Grommet>
			    );
			    const \{ asFragment \} = render(<App />);
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('Should apply disabled styling to items when data are children', () => \{
			    const App = () => (
			      <Grommet>
			        <List data=\{locations\} disabled=\{disabledLocations\}>
			          \{(item) => (
			            <Box>
			              <Text weight="bold">\{item\}</Text>
			            </Box>
			          )\}
			        </List>
			      </Grommet>
			    );
			    const \{ asFragment \} = render(<App />);
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('Disabled items should not call onClickItem with mouse', async () => \{
			    const onClickItem = jest.fn();
			    const user = userEvent.setup();
			
			    const App = () => (
			      <Grommet>
			        <List
			          data=\{locations\}
			          disabled=\{disabledLocations\}
			          onClickItem=\{onClickItem\}
			        />
			      </Grommet>
			    );
			    render(<App />);
			
			    const enabledItems = locations.filter(
			      (item) => !disabledLocations.includes(item),
			    );
			
			    await user.click(
			      screen.getByRole('option', \{
			        name: enabledItems[0],
			      \}),
			    );
			    await user.click(
			      screen.getByRole('option', \{
			        name: disabledLocations[0],
			      \}),
			    );
			    await user.click(
			      screen.getByRole('option', \{
			        name: enabledItems[enabledItems.length - 1],
			      \}),
			    );
			    await user.click(
			      screen.getByRole('option', \{
			        name: disabledLocations[disabledLocations.length - 1],
			      \}),
			    );
			
			    expect(onClickItem).toHaveBeenCalledTimes(2);
			  \});
			
			  test('Disabled items should not call onClickItem with keyboard', async () => \{
			    const onClickItem = jest.fn();
			    const user = userEvent.setup();
			
			    const App = () => (
			      <Grommet>
			        <List
			          data=\{locations\}
			          disabled=\{disabledLocations\}
			          onClickItem=\{(\{ item \}) => onClickItem(item)\}
			        />
			      </Grommet>
			    );
			    render(<App />);
			
			    const list = screen.getByRole('listbox');
			    await user.tab();
			    expect(list).toHaveFocus();
			    // user.keyboard is not behaving as expected
			    // await user.keyboard('[ArrowUp][Enter]');
			    const enabledItems = locations.filter(
			      (item) => !disabledLocations.includes(item),
			    );
			
			    fireEvent.keyDown(screen.getByRole('option', \{ name: enabledItems[0] \}), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			
			    fireEvent.keyDown(
			      screen.getByRole('option', \{ name: disabledLocations[0] \}),
			      \{
			        key: 'Enter',
			        keyCode: 13,
			        which: 13,
			      \},
			    );
			
			    fireEvent.keyDown(
			      screen.getByRole('option', \{
			        name: enabledItems[enabledItems.length - 1],
			      \}),
			      \{
			        key: 'Enter',
			        keyCode: 13,
			        which: 13,
			      \},
			    );
			
			    fireEvent.keyDown(
			      screen.getByRole('option', \{
			        name: disabledLocations[disabledLocations.length - 1],
			      \}),
			      \{
			        key: 'Enter',
			        keyCode: 13,
			        which: 13,
			      \},
			    );
			
			    expect(onClickItem).toHaveBeenCalledTimes(2);
			    expect(onClickItem).toHaveBeenCalledWith(enabledItems[0]);
			    expect(onClickItem).not.toHaveBeenCalledWith(disabledLocations[0]);
			  \});
			
			  test('Disabled items should be allowed to be re-ordered', async () => \{
			    const onOrder = jest.fn();
			    const user = userEvent.setup();
			
			    const App = () => \{
			      const [ordered, setOrdered] = useState(locations);
			      return (
			        <Grommet>
			          <List
			            data=\{ordered\}
			            disabled=\{disabledLocations\}
			            onOrder=\{(next) => \{
			              setOrdered(next);
			              onOrder(next);
			            \}\}
			          />
			        </Grommet>
			      );
			    \};
			
			    const \{ asFragment \} = render(<App />);
			
			    expect(asFragment()).toMatchSnapshot();
			
			    const disabledItem = screen.getByRole('button', \{
			      name: '2 Fort Collins move up',
			    \});
			    await user.click(disabledItem);
			    expect(onOrder).toHaveBeenCalled();
			    expect(asFragment()).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\List\\__tests__\\List-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(44)
    });
    it('grommet_grommet\\src\\js\\components\\Main\\__tests__\\Main-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ axe \} from 'jest-axe';
			import \{ render \} from '@testing-library/react';
			
			import \{ Grommet, Main \} from '../..';
			
			describe('Main', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Main />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Main\\__tests__\\Main-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('grommet_grommet\\src\\js\\components\\Markdown\\__tests__\\Markdown-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Markdown \} from '..';
			import \{ Box \} from '../../Box';
			
			const CONTENT = \`
			# H1
			
			Paragraph
			
			## H2
			
			### H3
			
			#### H4
			
			[a link](#)
			
			> i carry your heart with me
			
			![alt text](//v2.grommet.io/assets/IMG_4245.jpg "Markdown Image")
			
			Markdown | Less | Pretty
			--- | --- | ---
			*Still* | \\\`renders\\\` | **nicely**
			1 | 2 | 3
			\`;
			
			const Wrapper = props => <Box gap="small" \{...props\} />;
			
			test('Markdown renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Markdown>\{CONTENT\}</Markdown>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('wrapper', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Markdown
			        options=\{\{ wrapper: Wrapper \}\}
			      >\{CONTENT\}</Markdown>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Markdown\\__tests__\\Markdown-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('grommet_grommet\\src\\js\\components\\MaskedInput\\__tests__\\MaskedInput-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import 'core-js/stable';
			import 'regenerator-runtime/runtime';
			import 'jest-styled-components';
			import \{ fireEvent, render, waitFor \} from '@testing-library/react';
			import \{ getByText, screen \} from '@testing-library/dom';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import userEvent from '@testing-library/user-event';
			
			import \{ Search \} from 'grommet-icons';
			
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Keyboard \} from '../../Keyboard';
			import \{ MaskedInput \} from '..';
			
			describe('MaskedInput', () => \{
			  beforeEach(createPortal);
			
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <MaskedInput name="item" a11yTitle="axe-test" />,
			    );
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(<MaskedInput name="item" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('icon', () => \{
			    const \{ container \} = render(<MaskedInput icon=\{<Search />\} name="item" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('icon reverse', () => \{
			    const \{ container \} = render(
			      <MaskedInput icon=\{<Search />\} reverse name="item" />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ container \} = render(<MaskedInput disabled name="item" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('mask', async () => \{
			    const onChange = jest.fn();
			    const onFocus = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <MaskedInput
			        data-testid="test-input"
			        id="item"
			        name="item"
			        mask=\{[
			          \{
			            length: [1, 2],
			            options: ['aa', 'bb'],
			            regexp: /^[ab][ab]\$|^[ab]\$/,
			          \},
			          \{ fixed: '!' \},
			          \{
			            length: 1,
			            regexp: /^[ab]\$/,
			          \},
			        ]\}
			        value="a"
			        onChange=\{onChange\}
			        onFocus=\{onFocus\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.focus(getByTestId('test-input'));
			
			    await waitFor(() => screen.findByText('aa'));
			
			    expectPortal('masked-input-drop__item').toMatchSnapshot();
			    expect(onChange).not.toBeCalled();
			    expect(onFocus).toBeCalled();
			  \});
			
			  test('mask with long fixed', async () => \{
			    const onChange = jest.fn((event) => event.target.value);
			    const \{ getByTestId, container \} = render(
			      <MaskedInput
			        data-testid="test-input"
			        id="item"
			        name="item"
			        mask=\{[
			          \{ fixed: 'https://' \},
			          \{
			            regexp: /^[ab]+\$/,
			          \},
			        ]\}
			        value=""
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const input = getByTestId('test-input');
			
			    // Entering part of the fixed portion and then something that
			    // matches the next portion should auto-expand the fixed portion
			    fireEvent.change(input, \{
			      target: \{ value: 'hta' \},
			    \});
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('https://a');
			
			    // Removing all but a piece of the fixed portion should
			    // leave just that part of the fixed portion (like when
			    // you backspace over it)
			    fireEvent.change(input, \{
			      target: \{ value: 'http' \},
			    \});
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('http');
			  \});
			
			  test('option via mouse', async () => \{
			    const onChange = jest.fn((event) => event.target.value);
			    const \{ getByTestId, container \} = render(
			      <MaskedInput
			        data-testid="test-input"
			        plain
			        size="large"
			        id="item"
			        name="item"
			        mask=\{[
			          \{
			            length: [1, 2],
			            options: ['aa', 'bb'],
			            regexp: /^[ab][ab]\$|^[ab]\$/,
			          \},
			          \{ fixed: '!' \},
			        ]\}
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.focus(getByTestId('test-input'));
			
			    const option = await waitFor(() => getByText(document, 'aa'));
			
			    expectPortal('masked-input-drop__item').toMatchSnapshot();
			
			    fireEvent.click(option);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('aa!');
			  \});
			
			  test('option via keyboard', async () => \{
			    const onChange = jest.fn((event) => event.target.value);
			    const \{ getByTestId, container \} = render(
			      <MaskedInput
			        data-testid="test-input"
			        id="item"
			        name="item"
			        mask=\{[
			          \{
			            length: [1, 2],
			            options: ['aa', 'bb'],
			            regexp: /^[ab][ab]\$|^[ab]\$/,
			          \},
			          \{ fixed: '!' \},
			        ]\}
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const input = getByTestId('test-input');
			    fireEvent.focus(input);
			
			    await waitFor(() => screen.getByText('aa'));
			
			    // pressing enter here nothing will happen
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 38 \}); // up
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('aa!');
			  \});
			
			  test('should not enable to type beyond options via keyboard', async () => \{
			    const user = userEvent.setup();
			
			    const onChange = jest.fn((event) => event.target.value);
			    render(
			      <MaskedInput
			        data-testid="test-input"
			        id="item"
			        name="item"
			        mask=\{[
			          \{
			            options: ['aaa', 'aba', 'abb'],
			            regexp: /\\w\$/,
			          \},
			        ]\}
			        onChange=\{onChange\}
			      />,
			    );
			
			    await user.type(screen.getByRole('textbox'), 'abbb');
			
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('abb');
			  \});
			
			  test('restrictToOptions=false allows typing beyond options', async () => \{
			    const user = userEvent.setup();
			
			    const onChange = jest.fn((event) => event.target.value);
			    render(
			      <MaskedInput
			        data-testid="test-input"
			        id="item"
			        name="item"
			        mask=\{[
			          \{
			            restrictToOptions: false,
			            options: ['aaa', 'aba', 'abb'],
			            regexp: /\\w\$/,
			          \},
			        ]\}
			        onChange=\{onChange\}
			      />,
			    );
			
			    await user.type(screen.getByRole('textbox'), 'abbb');
			
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toHaveReturnedWith('abbb');
			  \});
			
			  test('Escape events should propagate if there is no drop', () => \{
			    const callback = jest.fn();
			    const \{ getByTestId \} = render(
			      <Grommet>
			        <Keyboard onEsc=\{callback\}>
			          <MaskedInput data-testid="test-input" id="item" name="item" />
			        </Keyboard>
			      </Grommet>,
			    );
			
			    fireEvent.change(getByTestId('test-input'), \{
			      target: \{ value: ' ' \},
			    \});
			    fireEvent.keyDown(getByTestId('test-input'), \{
			      key: 'Esc',
			      keyCode: 27,
			      which: 27,
			    \});
			    expect(callback).toBeCalled();
			  \});
			
			  test('next and previous without options', () => \{
			    const onChange = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <MaskedInput
			        data-testid="test-input"
			        id="item"
			        name="item"
			        mask=\{[
			          \{
			            length: [1, 2],
			            regexp: /^[ab][ab]\$|^[ab]\$/,
			          \},
			          \{ fixed: '!' \},
			        ]\}
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const input = getByTestId('test-input');
			    fireEvent.focus(input);
			
			    fireEvent.keyDown(input, \{ keyCode: 40 \});
			    fireEvent.keyDown(input, \{ keyCode: 40 \});
			    fireEvent.keyDown(input, \{ keyCode: 38 \});
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onChange).not.toBeCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('event target props are available option via mouse', async () => \{
			    const onChangeMock = jest.fn((event) => \{
			      const \{
			        target: \{ value, id, name \},
			      \} = event;
			      return \{ target: \{ id, value, name \} \};
			    \});
			    const \{ getByTestId, container \} = render(
			      <MaskedInput
			        data-testid="test-input"
			        plain
			        size="large"
			        id="item"
			        name="item"
			        mask=\{[
			          \{
			            length: [1, 2],
			            options: ['aa', 'bb'],
			            regexp: /^[ab][ab]\$|^[ab]\$/,
			          \},
			          \{ fixed: '!' \},
			        ]\}
			        onChange=\{onChangeMock\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.focus(getByTestId('test-input'));
			
			    await waitFor(() => screen.getByText('aa'));
			
			    expectPortal('masked-input-drop__item').toMatchSnapshot();
			
			    fireEvent.click(getByText(document, 'aa'));
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onChangeMock).toHaveBeenCalled();
			    expect(onChangeMock).toHaveReturnedWith(
			      expect.objectContaining(\{
			        target: expect.objectContaining(\{
			          id: 'item',
			          name: 'item',
			          value: 'aa!',
			        \}),
			      \}),
			    );
			  \});
			
			  test('event target props are available option via keyboard', async () => \{
			    const onChangeMock = jest.fn((event) => \{
			      const \{
			        target: \{ value, id, name \},
			      \} = event;
			      return \{ target: \{ id, value, name \} \};
			    \});
			    const \{ getByTestId, container \} = render(
			      <MaskedInput
			        data-testid="test-input"
			        id="item"
			        name="item"
			        size="medium"
			        mask=\{[
			          \{
			            length: [1, 2],
			            options: ['aa', 'bb'],
			            regexp: /^[ab][ab]\$|^[ab]\$/,
			          \},
			          \{ fixed: '!' \},
			        ]\}
			        onChange=\{onChangeMock\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const input = getByTestId('test-input');
			    fireEvent.focus(input);
			
			    await waitFor(() => screen.getByText('aa'));
			
			    // pressing enter here nothing will happen
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onChangeMock).not.toBeCalled();
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 38 \}); // up
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onChangeMock).toBeCalled();
			    expect(onChangeMock).toBeCalledTimes(1);
			    expect(onChangeMock).toHaveReturnedWith(
			      expect.objectContaining(\{
			        target: expect.objectContaining(\{
			          id: 'item',
			          name: 'item',
			          value: 'aa!',
			        \}),
			      \}),
			    );
			  \});
			
			  test('applies custom global.hover theme to options', async () => \{
			    const customTheme = \{
			      global: \{
			        hover: \{
			          background: \{
			            color: 'lightgreen',
			          \},
			          color: \{
			            dark: 'lightgrey',
			            light: 'brand',
			          \},
			        \},
			      \},
			    \};
			
			    const onChange = jest.fn((event) => event.target.value);
			    const \{ getByTestId, container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <MaskedInput
			          data-testid="test-input"
			          plain
			          size="large"
			          id="item"
			          name="item"
			          mask=\{[
			            \{
			              length: [1, 2],
			              options: ['aa', 'bb', 'cc'],
			              regexp: /^[ab][ab]\$|^[ab]\$/,
			            \},
			            \{ fixed: '!' \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.focus(getByTestId('test-input'));
			
			    await waitFor(() => screen.getByText('aa'));
			
			    const optionButton = getByText(document, 'bb').closest('button');
			    fireEvent.mouseOver(optionButton);
			    expect(optionButton).toMatchSnapshot();
			  \});
			
			  test('with no mask', async () => \{
			    const onChange = jest.fn((event) => event.target.value);
			    const \{ getByTestId, container \} = render(
			      <MaskedInput
			        data-testid="test-input"
			        plain
			        size="large"
			        id="item"
			        name="item"
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.change(getByTestId('test-input'), \{ target: \{ value: 'aa' \} \});
			
			    expect(onChange).toHaveBeenCalled();
			    expect(onChange).toReturnWith('aa');
			  \});
			
			  test('custom theme', async () => \{
			    const customTheme = \{
			      maskedInput: \{
			        container: \{
			          extend: 'svg \{ fill: red; stroke: red; \}',
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <MaskedInput
			          data-testid="test-input"
			          size="large"
			          id="item"
			          icon=\{<Search />\}
			          name="item"
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('textAlign end', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <MaskedInput value="1234" textAlign="end" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom theme input font size', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{\{ global: \{ input: \{ font: \{ size: '16px' \} \} \} \}\}>
			        <MaskedInput />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <MaskedInput size="xsmall" />
			        <MaskedInput size="small" />
			        <MaskedInput size="medium" />
			        <MaskedInput size="large" />
			        <MaskedInput size="xlarge" />
			        <MaskedInput size="xxlarge" />
			        <MaskedInput size="2xl" />
			        <MaskedInput size="3xl" />
			        <MaskedInput size="4xl" />
			        <MaskedInput size="5xl" />
			        <MaskedInput size="6xl" />
			        <MaskedInput size="16px" />
			        <MaskedInput size="1rem" />
			        <MaskedInput size="100%" />
			      </Grommet>,
			    );
			    expect(container.children).toMatchSnapshot();
			  \});
			
			  test('renders a11yTitle and aria-label', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <MaskedInput a11yTitle="masked-input-test" name="item" />
			        <MaskedInput aria-label="masked-input-test-2" name="item" />
			      </Grommet>,
			    );
			    expect(getByLabelText('masked-input-test')).toBeTruthy();
			    expect(getByLabelText('masked-input-test-2')).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\MaskedInput\\__tests__\\MaskedInput-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(22)
    });
    it('grommet_grommet\\src\\js\\components\\Menu\\__tests__\\Menu-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render, screen \} from '@testing-library/react';
			import \{ getByText as getByTextDOM \} from '@testing-library/dom';
			import \{ axe \} from 'jest-axe';
			
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import 'jest-styled-components';
			import '@testing-library/jest-dom/extend-expect';
			
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			
			import \{ Grommet, Menu \} from '../..';
			
			const customTheme = \{
			  menu: \{
			    drop: \{
			      align: \{
			        top: 'bottom',
			        left: 'right',
			      \},
			      elevation: 'xlarge',
			    \},
			    icons: \{
			      color: '#F08080',
			    \},
			  \},
			\};
			
			const defaultButtonTheme = \{
			  button: \{
			    default: \{
			      color: 'text-strong',
			      border: undefined,
			      padding: \{
			        horizontal: '12px',
			        vertical: '6px',
			      \},
			    \},
			  \},
			\};
			
			describe('Menu', () => \{
			  beforeEach(createPortal);
			
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Menu />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Menu
			          icon=\{<svg />\}
			          label="Test Menu"
			          id="test-menu"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom message', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Menu
			          label="Test Menu"
			          messages=\{\{ openMenu: 'Abrir Menu' \}\}
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom a11yTitle or aria-label', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Menu
			          a11yTitle="My Menu"
			          label="Test Menu"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			        <Menu
			          aria-label="My Menu 2"
			          label="Test Menu"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(getByLabelText('My Menu')).toBeTruthy();
			    expect(getByLabelText('My Menu 2')).toBeTruthy();
			
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('justify content', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['start', 'center', 'end', 'between', 'around', 'stretch'].map(
			          (justifyContent) => (
			            <Menu
			              key=\{justifyContent\}
			              label=\{\`\$\{justifyContent\} Menu\`\}
			              messages=\{\{ openMenu: 'Abrir Menu' \}\}
			              items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			              justifyContent=\{justifyContent\}
			            />
			          ),
			        )\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('gap between icon and label', () => \{
			    window.scrollTo = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Menu
			          open
			          label="actions"
			          items=\{[
			            \{ label: 'Item 1', icon: <svg />, gap: 'xlarge' \},
			            \{ label: 'Item 2' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    const firstItem = getByText('Item 1');
			    expect(
			      firstItem.querySelector('div[class^=StyledBox__StyledBoxGap]'),
			    ).toBeInTheDocument();
			
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('open and close on click', () => \{
			    window.scrollTo = jest.fn();
			    const \{ getByLabelText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[
			            \{ label: 'Item 1' \},
			            \{ label: 'Item 2', onClick: () => \{\} \},
			            \{ label: 'Item 3', href: '/test' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			
			    fireEvent.click(getByLabelText('Open Menu'));
			    expect(container.firstChild).toMatchSnapshot();
			    expectPortal('test-menu__drop').toMatchSnapshot();
			
			    fireEvent.click(getByLabelText('Close Menu'));
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			    expect(window.scrollTo).toBeCalled();
			  \});
			
			  test('close by clicking outside', (done) => \{
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			
			    fireEvent.click(getByText('Test'));
			    expectPortal('test-menu__drop').toMatchSnapshot();
			
			    fireEvent(
			      document,
			      new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			    );
			    setTimeout(() => \{
			      expect(document.getElementById('test-menu__drop')).toBeNull();
			      done();
			    \}, 50);
			  \});
			
			  test('select an item', () => \{
			    const onClick = jest.fn();
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[\{ label: 'Item 1', onClick \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('Test'));
			
			    // click in the first menu item
			    fireEvent.click(getByTextDOM(document, 'Item 1'));
			    expect(onClick).toBeCalled();
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			  \});
			
			  test('navigate through suggestions and select', () => \{
			    const onClick = jest.fn();
			    const \{ getByLabelText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2', onClick \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    // Pressing space opens drop
			    // First tab moves to first item
			    // Second tab moves to second item
			    // Enter selects the item
			    fireEvent.keyDown(getByLabelText('Open Menu'), \{
			      key: 'Space',
			      keyCode: 32,
			      which: 32,
			    \});
			    fireEvent.keyDown(document.activeElement.firstChild, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			    \});
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			    \});
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			
			    expect(onClick).toBeCalled();
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			  \});
			
			  test('tab through menu until it closes', () => \{
			    const \{ getByLabelText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    // Pressing space opens drop
			    // First tab moves to first item
			    // Second tab moves to second item
			    // Third tab moves beyond last menu item and closes menu
			    fireEvent.keyDown(getByLabelText('Open Menu'), \{
			      key: 'Space',
			      keyCode: 32,
			      which: 32,
			    \});
			    fireEvent.keyDown(document.activeElement.firstChild, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			    \});
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			    \});
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			    \});
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			  \});
			
			  test('shift + tab through menu until it closes', () => \{
			    const \{ getByLabelText, getByText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    // Pressing space opens drop
			    // First tab moves to first item
			    // Second tab moves to second item
			    // Next 3 Tabs + Shifts go back through menu in reverse order and close it
			    fireEvent.keyDown(getByLabelText('Open Menu'), \{
			      key: 'Space',
			      keyCode: 32,
			      which: 32,
			    \});
			
			    fireEvent.keyDown(document.activeElement.firstChild, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			    \});
			    expect(getByText('Item 1').parentElement).toHaveFocus();
			
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			    \});
			    expect(getByText('Item 2').parentElement).toHaveFocus();
			
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			      shiftKey: true,
			    \});
			    expect(getByText('Item 1').parentElement).toHaveFocus();
			
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			      shiftKey: true,
			    \});
			    expect(getByLabelText('Close Menu')).toHaveFocus();
			
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			      shiftKey: true,
			    \});
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			  \});
			
			  test('open on down close on esc', () => \{
			    const \{ getByLabelText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.keyDown(getByLabelText('Open Menu'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			    fireEvent.keyDown(getByLabelText('Close Menu'), \{
			      key: 'Esc',
			      keyCode: 27,
			      which: 27,
			    \});
			
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			  \});
			
			  test('open on up close on esc', () => \{
			    const \{ getByLabelText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    // Pressing up opens the menu
			    // Pressing escape closes it
			    fireEvent.keyDown(getByLabelText('Open Menu'), \{
			      key: 'Up',
			      keyCode: 38,
			      which: 38,
			    \});
			    expectPortal('test-menu__drop').toMatchSnapshot();
			
			    fireEvent.keyDown(getByLabelText('Close Menu'), \{
			      key: 'Esc',
			      keyCode: 27,
			      which: 27,
			    \});
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			  \});
			
			  test('close on tab', () => \{
			    const \{ getByLabelText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.keyDown(getByLabelText('Open Menu'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			    fireEvent.keyDown(getByLabelText('Open Menu'), \{
			      key: 'Tab',
			      keyCode: 9,
			      which: 9,
			    \});
			
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			  \});
			
			  test('with dropAlign top renders', () => \{
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          dropAlign=\{\{ top: 'top', right: 'right' \}\}
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.keyDown(getByText('Test'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			
			    expectPortal('test-menu__drop').toMatchSnapshot();
			  \});
			
			  test('with dropAlign bottom renders', () => \{
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          dropAlign=\{\{ bottom: 'bottom', left: 'left' \}\}
			          label="Test"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.keyDown(getByText('Test'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			
			    expectPortal('test-menu__drop').toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          disabled
			          label="Test"
			          items=\{[
			            \{ label: 'Item 1' \},
			            \{ label: 'Item 2', onClick: () => \{\} \},
			            \{ label: 'Item 3', href: '/test' \},
			          ]\}
			        />
			      </Grommet>,
			      \{
			        attachTo: document.body.firstChild,
			      \},
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			
			    fireEvent.click(getByText('Test'));
			
			    expect(document.getElementById('test-menu__drop')).toBeNull();
			  \});
			
			  test('reverse icon and label', () => \{
			    window.scrollTo = jest.fn();
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Menu
			          open
			          label="Test Menu"
			          items=\{[
			            \{ label: 'Item 1', icon: <svg />, reverse: true \},
			            \{ label: 'Item 2' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    // Label should come before icon
			    expect(getByText('Item 1').innerHTML).toEqual(
			      expect.stringMatching(/^Item 1/),
			    );
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('custom theme icon color', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Menu
			          label="Test Menu"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom theme with default button', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{defaultButtonTheme\}>
			        <Menu
			          label="Test Menu"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('menu with children when custom theme has default button', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{defaultButtonTheme\}>
			        <Menu items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}>
			          \{() => <>Test Menu</>\}
			        </Menu>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should apply themed drop props', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Menu
			          label="Test Menu"
			          items=\{[\{ label: 'Item 1' \}, \{ label: 'Item 2' \}]\}
			          open
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should group items', async () => \{
			    window.scrollTo = jest.fn();
			    render(
			      <Grommet>
			        <Menu
			          id="test-menu"
			          label="Test Menu"
			          items=\{[
			            [\{ label: 'Item 1' \}, \{ label: 'Item 2' \}],
			            [\{ label: 'Item 3' \}],
			          ]\}
			        />
			      </Grommet>,
			    );
			    fireEvent.keyDown(screen.getByText('Test Menu'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			
			    expectPortal('test-menu__drop').toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Menu\\__tests__\\Menu-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(24)
    });
    it('grommet_grommet\\src\\js\\components\\Meter\\__tests__\\Meter-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Meter \} from '..';
			
			const VALUES = [\{ value: 20, label: 'twenty', onHover: () => \{\} \}];
			
			describe('Meter', () => \{
			  test('default', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('single', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter value=\{25\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('many values', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter
			          values=\{[
			            \{ value: 5 \},
			            \{ value: 5 \},
			            \{ value: 5 \},
			            \{ value: 5 \},
			            \{ value: 5 \},
			            \{ value: 5 \},
			            \{ value: 5 \},
			            \{ value: 5 \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('boundary values', () => \{
			    // for https://github.com/grommet/grommet/issues/6190
			    const \{ container \} = render(
			      <Grommet>
			        <Meter
			          type="circle"
			          values=\{[\{ value: 2.26 \}, \{ value: 8.04 \}]\}
			          max=\{10.3\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('type', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter type="bar" values=\{VALUES\} />
			        <Meter type="circle" values=\{VALUES\} />
			        <Meter type="pie" values=\{VALUES\} />
			        <Meter type="semicircle" values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter size="xsmall" values=\{VALUES\} />
			        <Meter size="small" values=\{VALUES\} />
			        <Meter size="medium" values=\{VALUES\} />
			        <Meter size="large" values=\{VALUES\} />
			        <Meter size="xlarge" values=\{VALUES\} />
			        <Meter size="24px" values=\{VALUES\} />
			        <Meter size="full" values=\{VALUES\} />
			        <Meter type="circle" size="xsmall" values=\{VALUES\} />
			        <Meter type="circle" size="small" values=\{VALUES\} />
			        <Meter type="circle" size="medium" values=\{VALUES\} />
			        <Meter type="circle" size="large" values=\{VALUES\} />
			        <Meter type="circle" size="xlarge" values=\{VALUES\} />
			        <Meter type="circle" size="55px" values=\{VALUES\} />
			        <Meter type="circle" size="full" values=\{VALUES\} />
			        <Meter type="pie" size="xsmall" values=\{VALUES\} />
			        <Meter type="pie" size="small" values=\{VALUES\} />
			        <Meter type="pie" size="medium" values=\{VALUES\} />
			        <Meter type="pie" size="large" values=\{VALUES\} />
			        <Meter type="pie" size="xlarge" values=\{VALUES\} />
			        <Meter type="pie" size="55px" values=\{VALUES\} />
			        <Meter type="pie" size="full" values=\{VALUES\} />
			        <Meter type="semicircle" size="xsmall" values=\{VALUES\} />
			        <Meter type="semicircle" size="small" values=\{VALUES\} />
			        <Meter type="semicircle" size="medium" values=\{VALUES\} />
			        <Meter type="semicircle" size="large" values=\{VALUES\} />
			        <Meter type="semicircle" size="xlarge" values=\{VALUES\} />
			        <Meter type="semicircle" size="55px" values=\{VALUES\} />
			        <Meter type="semicircle" size="full" values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('thickness', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter thickness="xsmall" values=\{VALUES\} />
			        <Meter thickness="small" values=\{VALUES\} />
			        <Meter thickness="medium" values=\{VALUES\} />
			        <Meter thickness="large" values=\{VALUES\} />
			        <Meter thickness="xlarge" values=\{VALUES\} />
			        <Meter thickness="55px" values=\{VALUES\} />
			        <Meter type="circle" thickness="xsmall" values=\{VALUES\} />
			        <Meter type="circle" thickness="small" values=\{VALUES\} />
			        <Meter type="circle" thickness="medium" values=\{VALUES\} />
			        <Meter type="circle" thickness="large" values=\{VALUES\} />
			        <Meter type="circle" thickness="xlarge" values=\{VALUES\} />
			        <Meter type="circle" thickness="55px" values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('round', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter round values=\{VALUES\} />
			        <Meter type="circle" round values=\{VALUES\} />
			        <Meter type="semicircle" round values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('background', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter background="light-3" values=\{VALUES\} />
			        <Meter
			          background=\{\{ color: 'light-3', opacity: 'medium' \}\}
			          values=\{VALUES\}
			        />
			        <Meter type="circle" background="light-3" values=\{VALUES\} />
			        <Meter
			          type="circle"
			          background=\{\{ color: 'light-3', opacity: 'medium' \}\}
			          values=\{VALUES\}
			        />
			        <Meter
			          background=\{\{ color: 'light-3', opacity: 0.2 \}\}
			          values=\{VALUES\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('vertical', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Meter direction="vertical" values=\{VALUES\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Meter\\__tests__\\Meter-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('grommet_grommet\\src\\js\\components\\NameValueList\\__tests__\\NameValueList-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import \{ axe \} from 'jest-axe';
			
			import \{ render \} from '@testing-library/react';
			
			import \{ ThemeType \} from '../../../themes';
			import \{ Grommet \} from '../../Grommet';
			import \{ NameValueList \} from '..';
			import \{ NameValuePair \} from '../../NameValuePair';
			
			const data = \{
			  name: 'entry',
			  location: 'San Francisco',
			  health: 80,
			\};
			
			describe('NameValueList', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test(\`should render\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render correct width of name\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList nameProps=\{\{ width: 'xsmall' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render correct width of value\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList valueProps=\{\{ width: 'xsmall' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render correct width of value when value is array\`, () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <NameValueList valueProps=\{\{ width: 'xsmall' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test(\`should render correct alignment of name\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList nameProps=\{\{ align: 'end' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render correct alignment of value\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList valueProps=\{\{ align: 'start' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render pairs in a grid when layout="grid"\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList layout="grid">
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render name/value as a column when pairProps = \{ direction: 
			    'column' \}\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList pairProps=\{\{ direction: 'column' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render value above name when pairProps = \{ direction: 
			    'column-reverse' \}\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList pairProps=\{\{ direction: 'column-reverse' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render correct gap between rows and columns\`, () => \{
			    const customGapTheme: ThemeType = \{
			      nameValueList: \{
			        gap: \{ column: 'small', row: 'large' \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customGapTheme\}>
			        <NameValueList>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should support custom theme\`, () => \{
			    const customTheme: ThemeType = \{
			      nameValueList: \{
			        gap: \{ column: 'small', row: 'large' \},
			        pair: \{
			          column: \{
			            gap: \{
			              column: 'medium',
			              row: 'small',
			            \},
			          \},
			        \},
			        name: \{
			          width: 'xsmall',
			        \},
			        value: \{
			          width: 'small',
			        \},
			      \},
			      nameValuePair: \{
			        name: \{
			          color: 'brand',
			          weight: 'bold',
			        \},
			        value: \{
			          weight: 'lighter',
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <NameValueList>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\NameValueList\\__tests__\\NameValueList-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(12)
    });
    it('grommet_grommet\\src\\js\\components\\NameValuePair\\__tests__\\NameValuePair-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ render \} from '@testing-library/react';
			
			import \{ Box \} from '../../Box';
			import \{ Grommet \} from '../../Grommet';
			import \{ Meter \} from '../../Meter';
			import \{ NameValueList \} from '../../NameValueList';
			import \{ NameValuePair \} from '..';
			
			const data = \{
			  name: 'entry',
			  location: 'San Francisco',
			  health: 80,
			\};
			
			describe('NameValuePair', () => \{
			  test(\`should render name when name is typeof string\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render name when name is JSX Element\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList nameProps=\{\{ width: 'xsmall' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair
			              key=\{name\}
			              name=\{
			                <Box pad="small" background="brand">
			                  \{name\}
			                </Box>
			              \}
			            >
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render value when provided as child of type 
			  string or number\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList valueProps=\{\{ width: 'xsmall' \}\}>
			          \{Object.entries(data).map(([name, value]) => (
			            <NameValuePair key=\{name\} name=\{name\}>
			              \{value\}
			            </NameValuePair>
			          ))\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should render value when provided as child of type JSX Element\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <NameValueList nameProps=\{\{ align: 'end' \}\}>
			          \{Object.entries(data).map(([name, value]) => \{
			            let renderedValue: any = value;
			            if (name === 'health' && typeof value === 'number') \{
			              renderedValue = <Meter value=\{value\} />;
			            \}
			            return (
			              <NameValuePair key=\{name\} name=\{name\}>
			                \{renderedValue\}
			              </NameValuePair>
			            );
			          \})\}
			        </NameValueList>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\NameValuePair\\__tests__\\NameValuePair-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(4)
    });
    it('grommet_grommet\\src\\js\\components\\Nav\\__tests__\\Nav-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ axe \} from 'jest-axe';
			import \{ render \} from '@testing-library/react';
			
			import \{ Grommet, Nav \} from '../..';
			
			describe('Nav', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Nav />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Nav\\__tests__\\Nav-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('grommet_grommet\\src\\js\\components\\Notification\\__tests__\\Notification-test.js', () => {
        const sourceCode = `
			import React, \{ useState \} from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import '@testing-library/jest-dom';
			
			import \{ axe \} from 'jest-axe';
			import \{ render, screen, act \} from '@testing-library/react';
			import userEvent from '@testing-library/user-event';
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			
			import \{ Grommet, Notification, Button \} from '../..';
			
			const TestNotification = (\{ ...rest \}) => (
			  <Notification title="title" message="message" \{...rest\} />
			);
			
			describe('Notification', () => \{
			  beforeEach(createPortal);
			  test('should have no accessibility violations', async () => \{
			    const \{ container, asFragment \} = render(
			      <Grommet>
			        <Notification title="title" />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('should have no accessibility violations for toast', async () => \{
			    const \{ container, asFragment \} = render(
			      <Grommet>
			        <Notification toast title="title" message="message" />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('onClose', async () => \{
			    const user = userEvent.setup();
			
			    const onClose = jest.fn();
			    render(
			      <Grommet>
			        <Notification title="Title" onClose=\{onClose\} />
			      </Grommet>,
			    );
			
			    await user.click(screen.getByRole('button'));
			    expect(onClose).toBeCalled();
			  \});
			
			  [
			    'top',
			    'bottom',
			    'left',
			    'right',
			    'start',
			    'end',
			    'center',
			    'top-left',
			    'top-right',
			    'bottom-left',
			    'bottom-right',
			  ].forEach((positions) =>
			    test(\`position \$\{positions\}\`, () => \{
			      render(
			        <Grommet>
			          <Notification
			            id="position-test"
			            toast=\{\{ position: positions \}\}
			            title="title"
			            message="message"
			          >
			            This is a layer
			          </Notification>
			        </Grommet>,
			      );
			      expectPortal('position-test').toMatchSnapshot();
			    \}),
			  );
			
			  test('autoClose true', async () => \{
			    const user = userEvent.setup(\{ delay: null \});
			
			    jest.useFakeTimers();
			    const onOpen = jest.fn();
			    const onClose = jest.fn();
			    const Test = () => \{
			      const [visible, setVisible] = useState(false);
			      return (
			        <Grommet>
			          <Button
			            label="Show Notification"
			            onClick=\{() => \{
			              onOpen();
			              setVisible(true);
			            \}\}
			          />
			          \{visible && (
			            <Notification
			              toast=\{\{ autoClose: true \}\}
			              title="Status Title"
			              message="Messages should be at max two lines of text."
			              onClose=\{() => \{
			                onClose();
			                setVisible(false);
			              \}\}
			            />
			          )\}
			        </Grommet>
			      );
			    \};
			    render(<Test />);
			    await user.click(screen.getByRole('button', \{ name: 'Show Notification' \}));
			    expect(screen.getByText('Status Title')).toBeInTheDocument();
			    expect(onOpen).toHaveBeenCalled();
			    act(() => \{
			      jest.advanceTimersByTime(9000);
			    \});
			    expect(onClose).toHaveBeenCalled();
			  \});
			
			  test('autoClose false', async () => \{
			    const user = userEvent.setup(\{ delay: null \});
			
			    jest.useFakeTimers();
			    const onOpen = jest.fn();
			    const onClose = jest.fn();
			    const Test = () => \{
			      const [visible, setVisible] = useState(false);
			      return (
			        <Grommet>
			          <Button
			            label="Show Notification"
			            onClick=\{() => \{
			              onOpen();
			              setVisible(true);
			            \}\}
			          />
			          \{visible && (
			            <Notification
			              toast=\{\{ autoClose: false \}\}
			              title="Status Title"
			              message="Messages should be at max two lines of text."
			              onClose=\{() => \{
			                onClose();
			                setVisible(false);
			              \}\}
			            />
			          )\}
			        </Grommet>
			      );
			    \};
			    render(<Test />);
			    await user.click(screen.getByRole('button', \{ name: 'Show Notification' \}));
			    expect(onOpen).toHaveBeenCalled();
			    act(() => \{
			      jest.advanceTimersByTime(9000);
			    \});
			    expect(onClose).not.toHaveBeenCalled();
			  \});
			
			  test('custom theme', () => \{
			    const theme = \{
			      notification: \{
			        direction: 'row',
			        truncation: true,
			        container: \{
			          pad: 'medium',
			        \},
			        toast: \{
			          direction: 'column',
			          truncation: false,
			        \},
			        critical: \{
			          background: 'red',
			          toast: \{
			            background: 'background-front',
			          \},
			        \},
			      \},
			    \};
			
			    const Test = () => (
			      <Grommet theme=\{theme\}>
			        <TestNotification status="critical" />
			        <TestNotification toast title="Toast title" status="critical" />
			      </Grommet>
			    );
			    const \{ asFragment \} = render(<Test />);
			
			    expect(asFragment()).toMatchSnapshot();
			    expect(screen.getByText('Toast title')).toBeInTheDocument();
			  \});
			
			  test('actions', () => \{
			    render(
			      <Grommet>
			        <TestNotification
			          actions=\{[\{ href: '/some-link', label: 'Renew Subscription' \}]\}
			        />
			      </Grommet>,
			    );
			
			    const link = screen.getByRole('link', \{ name: 'Renew Subscription' \});
			    expect(link).toHaveAttribute('href', '/some-link');
			  \});
			
			  test('multi actions', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <TestNotification
			          actions=\{[
			            \{ href: '/some-link', label: 'Renew Subscription' \},
			            \{
			              href: '/link',
			              label: 'View More',
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('global', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <TestNotification global />
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('status', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <TestNotification global status="normal" />
			        <TestNotification global status="warning" />
			        <TestNotification global status="critical" />
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Notification\\__tests__\\Notification-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('grommet_grommet\\src\\js\\components\\Page\\__tests__\\Page-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Page \} from '..';
			import \{ Paragraph \} from '../../Paragraph';
			import \{ PageContent \} from '../../PageContent';
			
			describe('Page', () => \{
			  test('default kind', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Page>
			          <PageContent>
			            <Paragraph>content</Paragraph>
			          </PageContent>
			        </Page>
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('narrow', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Page kind="narrow">
			          <PageContent>
			            <Paragraph>content</Paragraph>
			          </PageContent>
			        </Page>
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('full', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Page kind="full">
			          <PageContent>
			            <Paragraph>content</Paragraph>
			          </PageContent>
			        </Page>
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('background fill', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <Page pad=\{\{ vertical: 'small' \}\}>
			          <PageContent background=\{\{ color: 'light-2', fill: 'horizontal' \}\}>
			            <Paragraph>content</Paragraph>
			          </PageContent>
			        </Page>
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  test('custom theme', () => \{
			    const customTheme = \{
			      page: \{
			        customKind: \{
			          alignSelf: 'start',
			          width: \{
			            min: '200px',
			            max: '500px',
			          \},
			        \},
			      \},
			    \};
			    const \{ asFragment \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Page>
			          <PageContent>
			            <Paragraph>content</Paragraph>
			          </PageContent>
			        </Page>
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Page\\__tests__\\Page-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('grommet_grommet\\src\\js\\components\\PageHeader\\__tests__\\PageHeader-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Anchor \} from '../../Anchor';
			import \{ Box \} from '../../Box';
			import \{ Button \} from '../../Button';
			import \{ PageHeader \} from '..';
			
			const sizes = ['small', 'medium', 'large'];
			
			describe('PageHeader', () => \{
			  test('basic', () => \{
			    const \{ asFragment \} = render(
			      <Grommet>
			        <PageHeader
			          title="Grommet"
			          subtitle=\{\`Grommet helps you build responsive and accessible 
			          mobile-first projects for the web with an easy to use component 
			          library.\`\}
			          actions=\{<Button label="Get Started" primary />\}
			          parent=\{<Anchor label="Parent Page" />\}
			        />
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			
			  sizes.forEach((size?: any) => \{
			    test(\`size - \$\{size\}\`, () => \{
			      const \{ asFragment \} = render(
			        <Grommet>
			          <PageHeader
			            title="Grommet"
			            subtitle=\{\`Grommet helps you build responsive and accessible 
			            mobile-first projects for the web with an easy to use component 
			            library.\`\}
			            actions=\{<Button label="Get Started" primary />\}
			            parent=\{<Anchor label="Parent Page" />\}
			            size=\{size\}
			          />
			        </Grommet>,
			      );
			
			      expect(asFragment()).toMatchSnapshot();
			    \});
			  \});
			
			  test('custom theme', () => \{
			    const customTheme = \{
			      pageHeader: \{
			        medium: \{
			          areas: [
			            ['parent', 'parent'],
			            ['title', 'null'],
			            ['subtitle', 'null'],
			            ['actions', 'actions'],
			          ],
			        \},
			      \},
			    \};
			
			    const \{ asFragment \} = render(
			      <Grommet theme=\{customTheme\}>
			        <PageHeader
			          title="Permissions"
			          subtitle="View and assign permissions."
			          actions=\{
			            <Box alignSelf="start">
			              <Button label="Edit" primary />
			            </Box>
			          \}
			          parent=\{<Anchor label="Settings" />\}
			        />
			      </Grommet>,
			    );
			
			    expect(asFragment()).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\PageHeader\\__tests__\\PageHeader-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('grommet_grommet\\src\\js\\components\\Pagination\\__tests__\\Pagination-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ render \} from '@testing-library/react';
			import \{ fireEvent \} from '@testing-library/dom';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Pagination \} from '..';
			
			const NUM_ITEMS = 237;
			const STEP = 10;
			const data = [];
			for (let i = 0; i < 95; i += 1) \{
			  data.push(\`entry-\$\{i\}\`);
			\}
			
			describe('Pagination', () => \{
			  test(\`should display the correct last page based on items length
			  and step\`, () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} />
			      </Grommet>,
			    );
			
			    // default step is 10
			    const expectedPageCount = Math.ceil(NUM_ITEMS / 10);
			    const lastPageButton = getByText(expectedPageCount.toString());
			
			    expect(lastPageButton).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should render correct numberEdgePages', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} numberEdgePages=\{3\} page=\{10\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should render correct numberMiddlePages when odd', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} numberMiddlePages=\{5\} page=\{10\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should render correct numberMiddlePages when even', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} numberMiddlePages=\{4\} page=\{10\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should show correct page when "page" is provided ', () => \{\});
			
			  test(\`should disable previous and next controls when numberItems
			  < step\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{10\} step=\{20\} />
			      </Grommet>,
			    );
			
			    const previousButtonDisabled = (
			      container.querySelector(
			        \`[aria-label="Go to previous page"]\`,
			      ) as HTMLButtonElement
			    ).hasAttribute('disabled');
			    const nextButtonDisabled = (
			      container.querySelector(
			        \`[aria-label="Go to next page"]\`,
			      ) as HTMLButtonElement
			    ).hasAttribute('disabled');
			
			    expect(previousButtonDisabled).toBeTruthy();
			    expect(nextButtonDisabled).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should disable previous and next controls when numberItems
			  === step\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{20\} step=\{20\} />
			      </Grommet>,
			    );
			
			    const previousButtonDisabled = (
			      container.querySelector(
			        \`[aria-label="Go to previous page"]\`,
			      ) as HTMLButtonElement
			    ).hasAttribute('disabled');
			    const nextButtonDisabled = (
			      container.querySelector(
			        \`[aria-label="Go to next page"]\`,
			      ) as HTMLButtonElement
			    ).hasAttribute('disabled');
			
			    expect(previousButtonDisabled).toBeTruthy();
			    expect(nextButtonDisabled).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should disable previous and next controls when numberItems
			  === 0\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{0\} />
			      </Grommet>,
			    );
			
			    const previousButtonDisabled = (
			      container.querySelector(
			        \`[aria-label="Go to previous page"]\`,
			      ) as HTMLButtonElement
			    ).hasAttribute('disabled');
			    const nextButtonDisabled = (
			      container.querySelector(
			        \`[aria-label="Go to next page"]\`,
			      ) as HTMLButtonElement
			    ).hasAttribute('disabled');
			
			    expect(previousButtonDisabled).toBeTruthy();
			    expect(nextButtonDisabled).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should set page to last page if page prop > total possible
			  pages\`, () => \{
			    const numberItems = 500;
			    const step = 50;
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Pagination numberItems=\{numberItems\} step=\{step\} page=\{700\} />
			      </Grommet>,
			    );
			
			    const expectedPage = \`\$\{Math.ceil(numberItems / step)\}\`;
			    fireEvent.click(getByText(expectedPage));
			    const activePage = (
			      container.querySelector(\`[aria-current="page"]\`) as HTMLButtonElement
			    ).innerHTML;
			
			    expect(activePage).toEqual(expectedPage);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  // how to not hard code so many values
			  test(\`should allow user to control page via state with page +
			  onChange\`, () => \{
			    const onChange = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} page=\{1\} onChange=\{onChange\} />
			      </Grommet>,
			    );
			
			    const nextPageButton = getByLabelText('Go to next page');
			    fireEvent.click(nextPageButton);
			
			    // step is 10 by default, so startIndex/endIndex are based on that
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{ page: 2, startIndex: 10, endIndex: 20 \}),
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should display next page of results when "next" is
			  selected\`, () => \{
			    const onChange = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} onChange=\{onChange\} />
			      </Grommet>,
			    );
			
			    const nextPageButton = getByLabelText('Go to next page');
			
			    // mouse click
			    fireEvent.click(nextPageButton);
			    expect(onChange).toBeCalledTimes(1);
			    expect(container.firstChild).toMatchSnapshot();
			
			    // keyboard enter
			    fireEvent.keyDown(nextPageButton, \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onChange).toBeCalledTimes(1);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should display previous page of results when "previous" is
			  selected\`, () => \{
			    const onChange = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} page=\{3\} onChange=\{onChange\} />
			      </Grommet>,
			    );
			
			    const previousPageButton = getByLabelText('Go to previous page');
			
			    // mouse click
			    fireEvent.click(previousPageButton);
			    expect(onChange).toBeCalledTimes(1);
			    expect(container.firstChild).toMatchSnapshot();
			
			    // keyboard enter
			    fireEvent.keyDown(previousPageButton, \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onChange).toBeCalledTimes(1);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should display page 'n' of results when "page n" is
			  selected\`, () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} />
			      </Grommet>,
			    );
			
			    const desiredPage = '2';
			    fireEvent.click(getByText(desiredPage));
			    const activePage = (
			      container.querySelector(\`[aria-current="page"]\`) as HTMLButtonElement
			    ).innerHTML;
			
			    expect(activePage).toEqual(desiredPage);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should disable previous button if on first page\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} />
			      </Grommet>,
			    );
			
			    const previousButtonDisabled = (
			      container.querySelector(
			        \`[aria-label="Go to previous page"]\`,
			      ) as HTMLButtonElement
			    ).hasAttribute('disabled');
			
			    expect(previousButtonDisabled).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should disable next button if on last page\`, () => \{
			    const lastPage = Math.ceil(NUM_ITEMS / STEP);
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} page=\{lastPage\} />
			      </Grommet>,
			    );
			
			    const nextButtonDisabled = (
			      container.querySelector(
			        \`[aria-label="Go to next page"]\`,
			      ) as HTMLButtonElement
			    ).hasAttribute('disabled');
			
			    expect(nextButtonDisabled).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should set numberMiddlePages = 1 if user provides value < 1\`, () => \{
			    console.warn = jest.fn();
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} numberMiddlePages=\{0\} />
			      </Grommet>,
			    );
			
			    expect(console.warn).toHaveBeenCalledTimes(1);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should apply custom theme\`, () => \{
			    const customTheme = \{
			      pagination: \{
			        container: \{
			          extend: \`background: red;\`,
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Pagination numberItems=\{NUM_ITEMS\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should apply button kind style when referenced by a string\`, () => \{
			    const customTheme = \{
			      button: \{
			        default: \{\},
			        bright: \{
			          color: 'text-strong',
			          border: \{
			            color: 'skyblue',
			            width: '2px',
			          \},
			        \},
			        active: \{
			          bright: \{
			            background: \{
			              color: '#CA9CEA',
			            \},
			            border: \{
			              color: 'transparent',
			            \},
			            color: 'text',
			          \},
			        \},
			      \},
			      pagination: \{
			        button: 'bright',
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Pagination numberItems=\{NUM_ITEMS\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should apply size\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} />
			        <Pagination numberItems=\{NUM_ITEMS\} size="small" />
			        <Pagination numberItems=\{NUM_ITEMS\} size="large" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should change the page on prop change\`, () => \{
			    const \{ container, rerender \} = render(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} page=\{1\} />
			      </Grommet>,
			    );
			
			    expect(
			      (container.querySelector(\`[aria-current="page"]\`) as HTMLButtonElement)
			        .innerHTML,
			    ).toBe('1');
			
			    rerender(
			      <Grommet>
			        <Pagination numberItems=\{NUM_ITEMS\} page=\{2\} />
			      </Grommet>,
			    );
			
			    expect(
			      (container.querySelector(\`[aria-current="page"]\`) as HTMLButtonElement)
			        .innerHTML,
			    ).toBe('2');
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should apply a11yTitle and aria-label\`, () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <Pagination a11yTitle="pagination-test" numberItems=\{NUM_ITEMS\} />
			        <Pagination aria-label="pagination-test-2" numberItems=\{NUM_ITEMS\} />
			      </Grommet>,
			    );
			
			    expect(getByLabelText('pagination-test')).toBeTruthy();
			    expect(getByLabelText('pagination-test-2')).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Pagination\\__tests__\\Pagination-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(21)
    });
    it('grommet_grommet\\src\\js\\components\\Paragraph\\__tests__\\Paragraph-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Paragraph \} from '..';
			
			test('Paragraph renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Paragraph />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Paragraph size renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Paragraph size="small" />
			      <Paragraph size="medium" />
			      <Paragraph size="large" />
			      <Paragraph size="xlarge" />
			      <Paragraph size="xxlarge" />
			      <Paragraph fill />
			      <Paragraph fill=\{false\} />
			      <Paragraph size="10px" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Paragraph margin renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Paragraph margin="small" />
			      <Paragraph margin="medium" />
			      <Paragraph margin="large" />
			      <Paragraph margin="none" />
			      <Paragraph margin=\{\{ bottom: 'small' \}\} />
			      <Paragraph margin=\{\{ top: 'small' \}\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Paragraph textAlign renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Paragraph textAlign="start" />
			      <Paragraph textAlign="center" />
			      <Paragraph textAlign="end" />
			      <Paragraph textAlign="justify" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Paragraph maxLines renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Paragraph maxLines=\{3\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Paragraph\\__tests__\\Paragraph-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('grommet_grommet\\src\\js\\components\\RadioButton\\__tests__\\RadioButton-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Box \} from '../../Box';
			import \{ RadioButton \} from '..';
			
			describe('RadioButton', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButton name="test" a11yTitle="test" />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButton name="test" value="1" />
			        <RadioButton id="test id" name="test" value="2" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('label', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButton label="test label" name="test" value="1" />
			        <RadioButton label=\{<div>test label</div>\} name="test" value="2" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('checked', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButton checked name="test" value="1" onChange=\{jest.fn()\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButton disabled name="test" value="1" />
			        <RadioButton disabled checked name="test" value="2" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('children', () => \{
			    const child = (\{ checked \}: \{ checked: boolean \}) => (
			      <Box pad="small" background=\{checked ? 'accent-1' : 'control'\} />
			    );
			
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButton name="test" value="1">
			          \{child\}
			        </RadioButton>
			        <RadioButton checked name="test" value="2" onChange=\{jest.fn()\}>
			          \{child\}
			        </RadioButton>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('label themed', () => \{
			    const customTheme = \{
			      radioButton: \{
			        font: \{
			          weight: 500,
			        \},
			      \},
			    \};
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <RadioButton label="test" name="test" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('background-color themed', () => \{
			    const customTheme = \{
			      radioButton: \{
			        check: \{
			          background: \{
			            color: 'red',
			          \},
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <RadioButton name="test" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('background-color themed symbolic', () => \{
			    const customTheme = \{
			      radioButton: \{
			        check: \{
			          background: \{
			            color: 'brand',
			          \},
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <RadioButton name="test" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should apply a11yTitle or aria-label', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <RadioButton name="test" a11yTitle="test" />
			        <RadioButton name="test" aria-label="test-2" />
			      </Grommet>,
			    );
			
			    expect(getByLabelText('test')).toBeTruthy();
			    expect(getByLabelText('test-2')).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\RadioButton\\__tests__\\RadioButton-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('grommet_grommet\\src\\js\\components\\RadioButtonGroup\\__tests__\\RadioButtonGroup-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent, waitFor \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Box \} from '../../Box';
			import \{ RadioButtonGroup \} from '..';
			
			describe('RadioButtonGroup', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup name="test" options=\{['option1']\} />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('string options', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup name="test" options=\{['one', 'two']\} value="one" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('number options', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup name="test" options=\{[1, 2]\} value=\{1\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('boolean options', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup name="test" options=\{[true, false]\} value />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('object options just value', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup
			          name="test"
			          options=\{[\{ value: 'one' \}, \{ value: 'two' \}]\}
			          value="two"
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('object options', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup
			          name="test"
			          options=\{[
			            \{ id: 'onE', label: 'One', value: 'one' \},
			            \{ id: 'twO', label: 'Two', value: 'two' \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('object options disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup
			          name="test"
			          options=\{[\{ value: 'one', disabled: true \}, \{ value: 'two' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('defaultValue', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup
			          name="test"
			          options=\{['one', 'two']\}
			          defaultValue="one"
			        />
			      </Grommet>,
			    );
			
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('children', () => \{
			    const child = (\{ checked \}) => (
			      <Box pad="small" background=\{checked ? 'accent-1' : 'control'\} />
			    );
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup name="test" options=\{['one', 'two']\} value="one">
			          \{child\}
			        </RadioButtonGroup>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('adding additional props', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RadioButtonGroup
			          name="test"
			          options=\{[
			            \{
			              id: 'ONE',
			              value: '1',
			              'data-testid': 'testid-1',
			            \},
			            \{
			              id: 'TWO',
			              value: '2',
			              'data-testid': 'testid-2',
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onChange fires with event when passed from props', () => \{
			    const radioGroupOptions = [
			      \{
			        id: 'ONE',
			        value: '1',
			        'data-testid': 'testid-1',
			      \},
			      \{
			        id: 'TWO',
			        value: '2',
			        'data-testid': 'testid-2',
			      \},
			    ];
			
			    const onChange = jest.fn((event) => \{
			      expect(event).toBeDefined();
			      expect(event).toHaveProperty(['target', 'value']);
			
			      const \{ target \} = event;
			      const option = radioGroupOptions.find(
			        (optn) => target.value === optn.value,
			      );
			
			      expect(option).not.toBeNull();
			      expect(target.value).toEqual(option.value);
			    \});
			
			    const \{ getByTestId \} = render(
			      <Grommet>
			        <RadioButtonGroup
			          name="test"
			          options=\{radioGroupOptions\}
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			
			    // Select first radio button
			    fireEvent.click(getByTestId('testid-1'));
			    expect(onChange).toBeCalledTimes(1);
			
			    // Select first radio button again - should not trigger onChange
			    fireEvent.click(getByTestId('testid-1'));
			    expect(onChange).toBeCalledTimes(1);
			
			    // Select second radio button
			    fireEvent.click(getByTestId('testid-2'));
			    expect(onChange).toBeCalledTimes(2);
			  \});
			
			  test('Works with keyboard', async () => \{
			    const onChange = jest.fn();
			
			    const \{ getByTestId \} = render(
			      <Grommet>
			        <RadioButtonGroup
			          name="test"
			          value="2"
			          options=\{[
			            \{
			              id: 'ONE',
			              value: '1',
			              'data-testid': 'testid-1',
			            \},
			            \{
			              id: 'TWO',
			              value: '2',
			              'data-testid': 'testid-2',
			            \},
			            \{
			              id: 'THREE',
			              value: '3',
			              'data-testid': 'testid-3',
			            \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			
			    // Focus radio '2' button and simulate ArrowDown key
			    // should result in selecting radio '3'
			    const middleRadioBtn = getByTestId('testid-2');
			    middleRadioBtn.focus();
			
			    // focusing the radio button results in internal state update
			    // so we wait (\`act\`) after focusing
			
			    await waitFor(() => getByTestId('testid-2'));
			    setTimeout(() => \{
			      fireEvent.keyDown(middleRadioBtn, \{
			        key: 'ArrowDown',
			        keyCode: 40,
			        which: 40,
			        bubbles: true,
			        cancelable: true,
			      \});
			      expect(onChange).toBeCalledTimes(1);
			      expect(onChange).toHaveBeenLastCalledWith(
			        expect.objectContaining(\{ target: \{ value: '3' \} \}),
			      );
			    \}, 50);
			
			    // Focus radio '2' button and simulate ArrowUp key
			    // should result in selecting radio '1'
			    middleRadioBtn.focus();
			    await waitFor(() => getByTestId('testid-2'));
			    setTimeout(() => \{
			      fireEvent.keyDown(middleRadioBtn, \{
			        key: 'ArrowUp',
			        keyCode: 38,
			        which: 38,
			        bubbles: true,
			        cancelable: true,
			      \});
			      expect(onChange).toBeCalledTimes(2);
			      expect(onChange).toHaveBeenLastCalledWith(
			        expect.objectContaining(\{ target: \{ value: '1' \} \}),
			      );
			    \}, 50);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\RadioButtonGroup\\__tests__\\RadioButtonGroup-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(12)
    });
    it('grommet_grommet\\src\\js\\components\\RangeInput\\__tests__\\RangeInput-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ RangeInput \} from '..';
			
			describe('RangeInput', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeInput value="50" a11yTitle="test" />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeInput value="50" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('track themed', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{\{ rangeInput: \{ track: \{ color: 'brand' \} \} \}\}>
			        <RangeInput value="10" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('track themed with color and opacity', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{ rangeInput: \{ track: \{ color: 'brand', opacity: 0.3 \} \} \}\}
			      >
			        <RangeInput value="10" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('with min and max offset', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeInput min=\{10\} max=\{20\} step=\{1\} value=\{15\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onFocus', () => \{
			    const onFocus = jest.fn();
			    const \{ container, getByDisplayValue \} = render(
			      <Grommet>
			        <RangeInput min=\{0\} max=\{10\} step=\{1\} value=\{5\} onFocus=\{onFocus\} />
			      </Grommet>,
			    );
			
			    fireEvent.focus(getByDisplayValue('5'));
			    expect(onFocus).toHaveBeenCalledTimes(1);
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onBlur', () => \{
			    const onBlur = jest.fn();
			    const \{ container, getByDisplayValue \} = render(
			      <Grommet>
			        <RangeInput min=\{0\} max=\{10\} step=\{1\} value=\{5\} onBlur=\{onBlur\} />
			      </Grommet>,
			    );
			
			    fireEvent.blur(getByDisplayValue('5'));
			    expect(onBlur).toHaveBeenCalledTimes(1);
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onChange', () => \{
			    const onChange = jest.fn();
			    const \{ container, getByDisplayValue \} = render(
			      <Grommet>
			        <RangeInput min=\{0\} max=\{10\} step=\{1\} value=\{5\} onChange=\{onChange\} />
			      </Grommet>,
			    );
			
			    fireEvent.change(getByDisplayValue('5'), \{
			      target: \{
			        value: '10',
			      \},
			    \});
			    expect(onChange).toBeCalledTimes(1);
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('with single color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeInput color="accent-3" min=\{1\} max=\{10\} step=\{1\} value=\{5\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('with multi color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeInput
			          color=\{[
			            \{ value: 3, color: '#FF0000', opacity: 0.5 \},
			            \{ value: 7, color: '#FFFF00' \},
			            \{ value: 10, color: '#00FF00' \},
			          ]\}
			          min=\{1\}
			          max=\{10\}
			          step=\{1\}
			          value=\{5\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\RangeInput\\__tests__\\RangeInput-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('grommet_grommet\\src\\js\\components\\RangeSelector\\__tests__\\RangeSelector-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ RangeSelector \} from '..';
			
			describe('RangeSelector', () => \{
			  test('should not have accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeSelector values=\{[20, 30]\} />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeSelector values=\{[20, 30]\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeSelector color="accent-1" values=\{[20, 30]\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('direction', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeSelector direction="horizontal" values=\{[20, 30]\} />
			        <RangeSelector direction="vertical" values=\{[20, 30]\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('invert', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeSelector invert values=\{[20, 30]\} />
			        <RangeSelector invert=\{false\} values=\{[20, 30]\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('max', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeSelector max=\{50\} values=\{[20, 30]\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('min', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <RangeSelector min=\{10\} values=\{[20, 30]\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('opacity', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['weak', 'medium', 'strong'].map((opacity) => (
			          <RangeSelector key=\{opacity\} opacity=\{opacity\} values=\{[20, 30]\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('round', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{['xsmall', 'small', 'medium', 'large', 'full'].map((round) => (
			          <RangeSelector key=\{round\} round=\{round\} values=\{[20, 30]\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{[
			          'xxsmall',
			          'xsmall',
			          'small',
			          'medium',
			          'large',
			          'xlarge',
			          'full',
			        ].map((size) => (
			          <RangeSelector key=\{size\} size=\{size\} values=\{[20, 30]\} />
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('step renders correct values', () => \{
			    let values;
			    const setValues = (newValues) => \{
			      values = newValues;
			    \};
			    const onChange = jest.fn((nextValues) => setValues(nextValues));
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <RangeSelector values=\{[0, 100]\} step=\{3\} onChange=\{onChange\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const lowerControl = getByLabelText('Lower Bounds');
			    fireEvent.mouseDown(lowerControl);
			    // fireEvent.mouseDown(lowerControl);
			    fireEvent.mouseMove(document, \{ clientX: 31, clientY: 20 \});
			    fireEvent.mouseUp(document);
			    expect(onChange).toBeCalled();
			    expect(values).toStrictEqual([33, 100]);
			
			    const upperControl = getByLabelText('Upper Bounds');
			    fireEvent.mouseDown(upperControl);
			    fireEvent.mouseMove(document, \{ clientX: 80, clientY: 15 \});
			    fireEvent.mouseUp(document);
			    expect(onChange).toBeCalled();
			    expect(values).toStrictEqual([0, 81]);
			  \});
			
			  test('handle keyboard', () => \{
			    const onChange = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <RangeSelector values=\{[20, 30]\} onChange=\{onChange\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const lowerControl = getByLabelText('Lower Bounds');
			    fireEvent.keyDown(lowerControl, \{ key: 'Left', keyCode: 37 \});
			    expect(onChange).toBeCalled();
			
			    fireEvent.keyDown(lowerControl, \{ key: 'Right', keyCode: 39 \});
			    expect(onChange).toBeCalled();
			
			    const upperControl = getByLabelText('Upper Bounds');
			    fireEvent.keyDown(upperControl, \{ key: 'Right', keyCode: 39 \});
			    expect(onChange).toBeCalled();
			
			    fireEvent.keyDown(upperControl, \{ key: 'Left', keyCode: 37 \});
			    expect(onChange).toBeCalled();
			  \});
			
			  test('handle mouse', () => \{
			    const onChange = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <RangeSelector values=\{[20, 30]\} onChange=\{onChange\} />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(container.firstChild.firstChild, \{
			      clientX: 0,
			      clientY: 0,
			    \});
			    expect(onChange).toBeCalled();
			
			    const lowerControl = getByLabelText('Lower Bounds');
			    fireEvent.mouseDown(lowerControl);
			    fireEvent.mouseMove(document, \{ clientX: 0, clientY: 0 \});
			    fireEvent.mouseUp(document);
			    expect(onChange).toBeCalled();
			
			    const upperControl = getByLabelText('Upper Bounds');
			    fireEvent.mouseDown(upperControl);
			    fireEvent.mouseMove(document, \{ clientX: 0, clientY: 0 \});
			    fireEvent.mouseUp(document);
			    expect(onChange).toBeCalled();
			  \});
			
			  test('handle touch gestures', () => \{
			    const onChange = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <RangeSelector values=\{[10, 20]\} onChange=\{onChange\} />
			      </Grommet>,
			    );
			    const rangeContainer = container.firstChild.firstChild;
			
			    const lowerControl = getByLabelText('Lower Bounds');
			    fireEvent.touchStart(lowerControl);
			    fireEvent.touchMove(rangeContainer, \{
			      changedTouches: [
			        \{
			          clientX: 0,
			          clientY: 0,
			        \},
			      ],
			    \});
			    expect(onChange).toBeCalled();
			
			    const upperControl = getByLabelText('Upper Bounds');
			    fireEvent.touchStart(upperControl);
			    fireEvent.touchMove(rangeContainer, \{
			      changedTouches: [
			        \{
			          clientX: 0,
			          clientY: 0,
			        \},
			      ],
			    \});
			    expect(onChange).toBeCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\RangeSelector\\__tests__\\RangeSelector-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(14)
    });
    it('grommet_grommet\\src\\js\\components\\RoutedAnchor\\__tests__\\RoutedAnchor-test.js', () => {
        const sourceCode = `
			import React, \{ Component \} from 'react';
			import PropTypes from 'prop-types';
			import \{ render, screen, fireEvent, createEvent \} from '@testing-library/react';
			import userEvent from '@testing-library/user-event';
			import 'jest-styled-components';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ RoutedAnchor \} from '..';
			
			class FakeRouter extends Component \{
			  static propTypes = \{
			    children: PropTypes.node.isRequired,
			    push: PropTypes.func.isRequired,
			    replace: PropTypes.func.isRequired,
			  \};
			
			  static childContextTypes = \{
			    router: PropTypes.shape(\{\}).isRequired,
			  \};
			
			  getChildContext() \{
			    const \{ push, replace \} = this.props;
			    return \{
			      router: \{
			        history: \{
			          push,
			          replace,
			        \},
			      \},
			    \};
			  \}
			
			  render() \{
			    const \{ children \} = this.props;
			    return <div>\{children\}</div>;
			  \}
			\}
			
			describe('RoutedAnchor', () => \{
			  const replace = jest.fn();
			  const push = jest.fn();
			  let warnSpy;
			
			  beforeEach(() => \{
			    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			  \});
			
			  afterEach(() => \{
			    warnSpy.mockRestore();
			  \});
			
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FakeRouter push=\{push\} replace=\{replace\}>
			          <RoutedAnchor label="Test" path="/" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    expect(warnSpy).toHaveBeenCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('is clickable', () => \{
			    const preventDefault = jest.fn();
			    const onClick = jest.fn();
			    render(
			      <Grommet>
			        <FakeRouter push=\{push\} replace=\{replace\}>
			          <RoutedAnchor label="Test" onClick=\{onClick\} path="/" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    const anchor = screen.getByRole('link');
			
			    const clickEvent = createEvent.click(anchor);
			    clickEvent.preventDefault = preventDefault;
			    fireEvent(anchor, clickEvent);
			
			    expect(onClick).toBeCalledTimes(1);
			    expect(push).toBeCalledTimes(1);
			    expect(preventDefault).toBeCalledTimes(1);
			    expect(warnSpy).toHaveBeenCalled();
			  \});
			
			  test('skips onClick if right clicked', async () => \{
			    const user = userEvent.setup();
			
			    const onClick = jest.fn();
			    render(
			      <Grommet>
			        <FakeRouter push=\{push\} replace=\{replace\}>
			          <RoutedAnchor label="Test" onClick=\{onClick\} path="/" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    const anchor = screen.getByRole('link');
			
			    await user.pointer([
			      \{ target: anchor \},
			      \{ keys: '[MouseRight]', target: anchor \},
			    ]);
			
			    expect(onClick).not.toHaveBeenCalled();
			    expect(warnSpy).toHaveBeenCalled();
			  \});
			
			  test('calls router context push', () => \{
			    const preventDefault = jest.fn();
			    render(
			      <Grommet>
			        <FakeRouter push=\{push\} replace=\{replace\}>
			          <RoutedAnchor label="Test" path="/" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    const anchor = screen.getByRole('link');
			
			    const clickEvent = createEvent.click(anchor);
			    clickEvent.preventDefault = preventDefault;
			    fireEvent(anchor, clickEvent);
			
			    expect(preventDefault).toHaveBeenCalled();
			    expect(push).toHaveBeenCalledWith('/');
			    expect(warnSpy).toHaveBeenCalled();
			  \});
			
			  test('calls router context replace', () => \{
			    const preventDefault = jest.fn();
			    render(
			      <Grommet>
			        <FakeRouter replace=\{replace\} push=\{push\}>
			          <RoutedAnchor label="Test" path="/" method="replace" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    const anchor = screen.getByRole('link');
			
			    const clickEvent = createEvent.click(anchor);
			    clickEvent.preventDefault = preventDefault;
			    fireEvent(anchor, clickEvent);
			
			    expect(preventDefault).toHaveBeenCalled();
			    expect(replace).toHaveBeenCalledWith('/');
			    expect(warnSpy).toHaveBeenCalled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\RoutedAnchor\\__tests__\\RoutedAnchor-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('grommet_grommet\\src\\js\\components\\RoutedButton\\__tests__\\RoutedButton-test.js', () => {
        const sourceCode = `
			import React, \{ Component \} from 'react';
			import PropTypes from 'prop-types';
			import \{ createEvent, fireEvent, render, screen \} from '@testing-library/react';
			import userEvent from '@testing-library/user-event';
			import 'jest-styled-components';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet, RoutedButton \} from '../..';
			
			class FakeRouter extends Component \{
			  static propTypes = \{
			    children: PropTypes.node.isRequired,
			    push: PropTypes.func.isRequired,
			    replace: PropTypes.func.isRequired,
			  \};
			
			  static childContextTypes = \{
			    router: PropTypes.shape(\{\}),
			  \};
			
			  getChildContext() \{
			    const \{ push, replace \} = this.props;
			    return \{
			      router: \{
			        history: \{
			          push,
			          replace,
			        \},
			      \},
			    \};
			  \}
			
			  render() \{
			    const \{ children \} = this.props;
			    return <div>\{children\}</div>;
			  \}
			\}
			
			describe('RoutedButton', () => \{
			  let push;
			  let replace;
			  let warning;
			  let warnSpy;
			
			  beforeEach(() => \{
			    push = jest.fn();
			    replace = jest.fn();
			    warning = \`This component will be deprecated in the upcoming releases.
			         Please refer to https://github.com/grommet/grommet/issues/2855
			         for more information.\`;
			
			    console.warn = jest.fn();
			    warnSpy = jest.spyOn(console, 'warn');
			  \});
			
			  afterEach(() => \{
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			    console.warn.mockReset();
			  \});
			
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <FakeRouter replace=\{replace\} push=\{push\}>
			          <RoutedButton label="Test" path="/" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    expect(warnSpy).toBeCalledWith(warning);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('RoutedButton is clickable', () => \{
			    const preventDefault = jest.fn();
			    const onClick = jest.fn();
			    render(
			      <Grommet>
			        <FakeRouter replace=\{replace\} push=\{push\}>
			          <RoutedButton label="Test" onClick=\{onClick\} path="/" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    const anchor = screen.getByRole('link');
			
			    const clickEvent = createEvent.click(anchor);
			    clickEvent.preventDefault = preventDefault;
			    fireEvent(anchor, clickEvent);
			
			    expect(onClick).toBeCalled();
			    expect(push).toHaveBeenCalled();
			    expect(preventDefault).toHaveBeenCalled();
			    expect(warnSpy).toHaveBeenCalledWith(warning);
			  \});
			
			  test('RoutedButton skips onClick if right clicked', async () => \{
			    const user = userEvent.setup();
			
			    const onClick = jest.fn();
			    render(
			      <Grommet>
			        <FakeRouter replace=\{replace\} push=\{push\}>
			          <RoutedButton label="Test" onClick=\{onClick\} path="/" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    const anchor = screen.getByRole('link');
			
			    await user.pointer([
			      \{ target: anchor \},
			      \{ keys: '[MouseRight]', target: anchor \},
			    ]);
			
			    expect(onClick).not.toHaveBeenCalled();
			    expect(warnSpy).toHaveBeenCalledWith(warning);
			  \});
			
			  test('RoutedButton calls router context push', () => \{
			    const preventDefault = jest.fn();
			    render(
			      <Grommet>
			        <FakeRouter replace=\{replace\} push=\{push\}>
			          <RoutedButton label="Test" path="/" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    const anchor = screen.getByRole('link');
			
			    const clickEvent = createEvent.click(anchor);
			    clickEvent.preventDefault = preventDefault;
			    fireEvent(anchor, clickEvent);
			
			    expect(preventDefault).toHaveBeenCalled();
			    expect(push).toHaveBeenCalledWith('/');
			
			    expect(warnSpy).toHaveBeenCalledWith(warning);
			  \});
			
			  test('RoutedButton calls router context replace', () => \{
			    const preventDefault = jest.fn();
			    render(
			      <Grommet>
			        <FakeRouter replace=\{replace\} push=\{push\}>
			          <RoutedButton label="Test" path="/" method="replace" />
			        </FakeRouter>
			      </Grommet>,
			    );
			
			    const anchor = screen.getByRole('link');
			
			    const clickEvent = createEvent.click(anchor);
			    clickEvent.preventDefault = preventDefault;
			    fireEvent(anchor, clickEvent);
			
			    expect(preventDefault).toHaveBeenCalled();
			    expect(replace).toHaveBeenCalledWith('/');
			    expect(warnSpy).toHaveBeenCalledWith(warning);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\RoutedButton\\__tests__\\RoutedButton-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('grommet_grommet\\src\\js\\components\\Select\\__tests__\\Select-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent, act, screen \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import 'jest-styled-components';
			import 'regenerator-runtime/runtime';
			
			import \{ CaretDown, CaretUp, FormDown \} from 'grommet-icons';
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			
			import \{ Box, Grommet, FormField \} from '../..';
			import \{ Select \} from '..';
			
			describe('Select', () => \{
			  window.scrollTo = jest.fn();
			  beforeEach(createPortal);
			
			  test('should not have accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Select options=\{['one', 'two', 'three']\} a11yTitle="test" />
			      </Grommet>,
			    );
			
			    const results = await axe(container, \{
			      rules: \{
			        /* This rule is flagged because Select is built using a 
			        TextInput within a DropButton. According to Dequeue and 
			        WCAG 4.1.2 "interactive controls must not have focusable 
			        descendants". Jest-axe is assuming that the input is focusable
			        and since the input is a descendant of the button the rule is 
			        flagged. However, the TextInput is built so that it is read 
			        only and cannot receive focus. Select is accessible 
			        according to the WCAG specification, but jest-axe is flagging
			        it so we are disabling this rule. */
			        'nested-interactive': \{ enabled: false \},
			      \},
			    \});
			    expect(results).toHaveNoViolations();
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Select id="test-select" options=\{['one', 'two']\} a11yTitle="Select" />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('dark', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Box fill background="dark-1" align="center" justify="center">
			          <Select placeholder="Select" options=\{['one', 'two']\} />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('prop: onOpen', () => \{
			    jest.useFakeTimers();
			    const onOpen = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        placeholder="test select"
			        id="test-select"
			        options=\{['one', 'two']\}
			        onOpen=\{onOpen\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('test-select__drop')).toBeNull();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			    expect(container.firstChild).toMatchSnapshot();
			    expectPortal('test-select__drop').toMatchSnapshot();
			    // advance timers so the select opens
			    jest.advanceTimersByTime(100);
			    // verify that select is open
			    expect(document.activeElement).toMatchSnapshot();
			
			    expect(onOpen).toHaveBeenCalledTimes(1);
			  \});
			
			  test('prop: onClose', () => \{
			    jest.useFakeTimers();
			    const onClose = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        placeholder="test select"
			        id="test-select"
			        options=\{['one', 'two']\}
			        onClose=\{onClose\}
			      />,
			    );
			
			    fireEvent.click(getByPlaceholderText('test select'));
			    // closes
			    fireEvent.click(getByPlaceholderText('test select'));
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('test-select__drop')).toBeNull();
			    // advance timers so the select closes
			    jest.advanceTimersByTime(100);
			    // verify that select was closed
			    expect(document.activeElement).toMatchSnapshot();
			    expect(onClose).toHaveBeenCalledTimes(1);
			  \});
			
			  test('0 value', () => \{
			    const \{ container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{[0, 1]\}
			        value=\{0\}
			      />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('search', () => \{
			    jest.useFakeTimers();
			    const onSearch = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{['one', 'two']\}
			        onSearch=\{onSearch\}
			        value="two"
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    // advance timers so select can open
			    act(() => \{
			      jest.advanceTimersByTime(200);
			    \});
			    // snapshot on search box
			    expectPortal('test-select__drop').toMatchSnapshot();
			    expect(document.activeElement).toMatchSnapshot();
			    // add content to search box
			    fireEvent.change(document.activeElement, \{ target: \{ value: 'o' \} \});
			    expect(document.activeElement).toMatchSnapshot();
			    expect(onSearch).toBeCalledWith('o');
			  \});
			
			  test('search and select', () => \{
			    jest.useFakeTimers();
			    const onSearch = jest.fn();
			    const onChange = jest.fn();
			    const Test = () => \{
			      const [options, setOptions] = React.useState(['one', 'two']);
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{options\}
			          onChange=\{onChange\}
			          onSearch=\{(arg) => \{
			            onSearch(arg);
			            setOptions(['two']);
			          \}\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(<Test />);
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    // advance timers so select can open
			    act(() => jest.advanceTimersByTime(200));
			    // snapshot on search box
			    expectPortal('test-select__drop').toMatchSnapshot();
			    expect(document.activeElement).toMatchSnapshot();
			    // add content to search box
			    fireEvent.change(document.activeElement, \{ target: \{ value: 't' \} \});
			    expect(document.activeElement).toMatchSnapshot();
			    expect(onSearch).toBeCalledWith('t');
			
			    fireEvent.click(getByText('two'));
			    expect(onChange).toBeCalledWith(expect.objectContaining(\{ value: 'two' \}));
			  \});
			
			  test('select an option with complex options', () => \{
			    const onChange = jest.fn();
			    const \{ getByText, container \} = render(
			      <Select
			        id="test-select"
			        plain
			        value=\{<span>one</span>\}
			        options=\{[\{ test: 'one' \}, \{ test: 'two' \}]\}
			        onChange=\{onChange\}
			      >
			        \{(option) => <span>\{option.test\}</span>\}
			      </Select>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('one'));
			
			    // pressing enter here nothing will happen
			    fireEvent.click(
			      document.getElementById('test-select__drop').querySelector('button'),
			    );
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{ value: \{ test: 'one' \} \}),
			    );
			    expect(window.scrollTo).toBeCalled();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Select
			        id="test-select"
			        size="large"
			        options=\{['one', 'two']\}
			        selected=\{[]\}
			        value=\{[]\}
			        onChange=\{() => \{\}\}
			      />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  ['small', 'medium', 'large'].forEach((dropHeight) => \{
			    test(\`\$\{dropHeight\} drop container height\`, () => \{
			      const \{ getByPlaceholderText \} = render(
			        <Select
			          id="test-select"
			          size="large"
			          options=\{['one', 'two']\}
			          selected=\{[]\}
			          value=\{[]\}
			          onChange=\{() => \{\}\}
			          dropHeight=\{dropHeight\}
			          placeholder="test select"
			        />,
			      );
			      fireEvent.click(getByPlaceholderText('test select'));
			      expect(document.activeElement).toMatchSnapshot();
			    \});
			  \});
			
			  test('onChange without valueKey', () => \{
			    const onChange = jest.fn();
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          labelKey="name"
			          value=\{value\}
			          options=\{[
			            \{
			              id: 1,
			              name: 'Value1',
			            \},
			            \{
			              id: 2,
			              name: 'Value2',
			            \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('Value1'));
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{
			          id: 1,
			          name: 'Value1',
			        \},
			      \}),
			    );
			  \});
			
			  test('onChange with valueKey string', () => \{
			    const onChange = jest.fn();
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          labelKey="name"
			          valueKey="id"
			          value=\{value\}
			          options=\{[
			            \{
			              id: 1,
			              name: 'Value1',
			            \},
			            \{
			              id: 2,
			              name: 'Value2',
			            \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('Value1'));
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{
			          id: 1,
			          name: 'Value1',
			        \},
			      \}),
			    );
			  \});
			
			  test('disabled key', () => \{
			    jest.useFakeTimers();
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          labelKey="name"
			          valueKey="id"
			          value=\{value\}
			          disabledKey="disabled"
			          options=\{[
			            \{
			              id: 1,
			              name: 'Value1',
			              disabled: true,
			            \},
			            \{
			              id: 2,
			              name: 'Value2',
			              disabled: false,
			            \},
			          ]\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			    jest.advanceTimersByTime(200);
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('complex options and children', () => \{
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{[\{ test: 'one' \}, \{ test: 'two' \}]\}
			      >
			        \{(option) => <span>\{option.test\}</span>\}
			      </Select>,
			    );
			    // before opening
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('test-select__drop')).toBeNull();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    // after opening
			    expect(container.firstChild).toMatchSnapshot();
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('select an option', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{['one', 'two']\}
			        onChange=\{onChange\}
			      />,
			    );
			    const select = getByPlaceholderText('test select');
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    // pressing enter here nothing will happen
			    fireEvent.click(
			      document.getElementById('test-select__drop').querySelector('button'),
			    );
			
			    // checks if select has a value assigned to it after option is selected
			    expect(select.value).toEqual('one');
			    expect(onChange).toBeCalledWith(expect.objectContaining(\{ value: 'one' \}));
			    expect(window.scrollTo).toBeCalled();
			  \});
			
			  test('select an option with enter', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{['one', 'two']\}
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			    // verify that keyboard navigation is working
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Up',
			      keyCode: 38,
			      which: 38,
			    \});
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onChange).toBeCalledWith(expect.objectContaining(\{ value: 'one' \}));
			    expect(window.scrollTo).toBeCalled();
			  \});
			
			  test('select an option with keypress', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{['one', 'two', 'three']\}
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			    // verify that keyboard navigation is working
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 't',
			      keyCode: 84,
			      which: 84,
			    \});
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onChange).toBeCalledWith(expect.objectContaining(\{ value: 'two' \}));
			    expect(window.scrollTo).toBeCalled();
			  \});
			
			  test('select an object with label key specific with keypress', () => \{
			    const onChange = jest.fn();
			    const options = [
			      \{ id: 1, name: 'one' \},
			      \{ id: 2, name: 'two' \},
			      \{ id: 3, name: 'three' \},
			    ];
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{options\}
			        labelKey="name"
			        valueKey="id"
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			    // verify that keyboard navigation is working
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 't',
			      keyCode: 84,
			      which: 84,
			    \});
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        value: \{ id: 2, name: 'two' \},
			      \}),
			    );
			    expect(window.scrollTo).toBeCalled();
			  \});
			
			  test('select on multiple keydown always picks first enabled option', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{['one', 'two', 'three']\}
			        onChange=\{onChange\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			    // verify that keyboard navigation is working
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 't',
			      keyCode: 84,
			      which: 84,
			    \});
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 't',
			      keyCode: 84,
			      which: 84,
			    \});
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        value: 'two',
			      \}),
			    );
			    expect(window.scrollTo).toBeCalled();
			  \});
			
			  test('disabled', () => \{
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        disabled
			        options=\{['one', 'two']\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.getElementById('test-select__drop')).toBeNull();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expect(container.firstChild).toMatchSnapshot();
			    // dropdown should still be null because select is disabled
			    expect(document.getElementById('test-select__drop')).toBeNull();
			  \});
			
			  test('empty results search', () => \{
			    const \{ getByPlaceholderText \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{[]\}
			        onSearch=\{() => \{\}\}
			        emptySearchMessage="no results"
			      />,
			    );
			    fireEvent.click(getByPlaceholderText('test select'));
			    // advance timers so that the select drop can open
			    act(() => \{
			      jest.advanceTimersByTime(200);
			    \});
			    fireEvent.change(document.activeElement, \{ target: \{ value: 'o' \} \});
			
			    expect(document.activeElement).toMatchSnapshot();
			  \});
			
			  test('open default state', () => \{
			    render(
			      <Select
			        open
			        id="test-select"
			        placeholder="test select"
			        options=\{['one', 'two']\}
			      />,
			    );
			
			    expect(document.getElementById('test-select__drop')).not.toBeNull();
			  \});
			
			  test('renders without icon', () => \{
			    const \{ container \} = render(
			      <Select id="test-select" options=\{['one', 'two']\} icon=\{false\} />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders custom icon', () => \{
			    const \{ container \} = render(
			      <Select id="test-select" options=\{['one', 'two']\} icon=\{CaretDown\} />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders default icon', () => \{
			    const \{ container \} = render(
			      <Select id="test-select" options=\{['one', 'two']\} icon />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('modifies select control style on open', () => \{
			    const customTheme = \{
			      select: \{
			        control: \{
			          extend: \{
			            background: 'purple',
			          \},
			          open: \{
			            background: 'lightgrey',
			          \},
			        \},
			        container: \{\},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Select
			          data-testid="test-select-style-open"
			          id="test-open-id"
			          options=\{['morning', 'afternoon', 'evening']\}
			          placeholder="Select..."
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const selectButton = document.getElementById('test-open-id');
			    let style;
			
			    style = window.getComputedStyle(selectButton);
			    expect(style.background).toBe('purple');
			
			    fireEvent.click(selectButton);
			    style = window.getComputedStyle(selectButton);
			    expect(style.background).toBe('lightgrey');
			
			    fireEvent.click(selectButton);
			    style = window.getComputedStyle(selectButton);
			    expect(style.background).toBe('purple');
			  \});
			
			  test(\`renders styled select options backwards compatible with legacy
			      documentation (select.options.box)\`, () => \{
			    const customTheme = \{
			      select: \{
			        options: \{
			          box: \{
			            background: 'lightblue',
			          \},
			        \},
			      \},
			    \};
			
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Select
			          data-testid="test-select-style-options-1"
			          id="test-options-style-id"
			          options=\{['morning', 'afternoon', 'evening']\}
			          placeholder="Select..."
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const selectButton = getByPlaceholderText('Select...');
			    fireEvent.click(selectButton);
			
			    const optionButton = getByText('morning').closest('button');
			    const style = window.getComputedStyle(optionButton.firstChild);
			    expect(style.background).toBe('lightblue');
			  \});
			
			  test('renders styled select options using select.options.container', () => \{
			    const customTheme = \{
			      select: \{
			        options: \{
			          container: \{
			            background: 'lightgreen',
			          \},
			        \},
			      \},
			    \};
			
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Select
			          data-testid="test-select-style-options-2"
			          id="test-options-style-id"
			          options=\{['morning', 'afternoon', 'evening']\}
			          placeholder="Select..."
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const selectButton = getByPlaceholderText('Select...');
			    fireEvent.click(selectButton);
			
			    const optionButton = getByText('morning').closest('button');
			    const style = window.getComputedStyle(optionButton.firstChild);
			    expect(style.background).toBe('lightgreen');
			  \});
			
			  test(\`renders styled select options combining select.options.box &&
			    select.options.container;
			    select.options.container prioritized if conflict\`, () => \{
			    const customTheme = \{
			      select: \{
			        options: \{
			          container: \{
			            background: 'lightgreen',
			          \},
			          box: \{
			            background: 'lightblue',
			            border: \{
			              side: 'bottom',
			              size: 'small',
			              color: 'blue',
			            \},
			          \},
			        \},
			      \},
			    \};
			
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Select
			          data-testid="test-select-style-options-3"
			          id="test-options-style-id"
			          options=\{['morning', 'afternoon', 'evening']\}
			          placeholder="Select..."
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const selectButton = getByPlaceholderText('Select...');
			    fireEvent.click(selectButton);
			
			    let style;
			    const optionButton = getByText('morning').closest('button');
			
			    style = window.getComputedStyle(optionButton.firstChild);
			    expect(style.background).not.toBe('lightblue');
			
			    style = window.getComputedStyle(optionButton.firstChild);
			    expect(style.background).toBe('lightgreen');
			    expect(style.borderBottom).toBe('2px solid blue');
			  \});
			
			  test('applies custom global.hover theme to options', () => \{
			    const customTheme = \{
			      global: \{
			        hover: \{
			          background: \{
			            color: 'lightgreen',
			          \},
			          color: \{
			            dark: 'lightgrey',
			            light: 'brand',
			          \},
			        \},
			      \},
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Select
			          data-testid="applies-custom-hover-style"
			          id="applies-custom-hover-style-id"
			          options=\{['morning', 'afternoon', 'evening']\}
			          placeholder="Select..."
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const selectButton = getByPlaceholderText('Select...');
			    fireEvent.click(selectButton);
			
			    const optionButton = getByText('afternoon').closest('button');
			    fireEvent.mouseOver(optionButton);
			    expect(optionButton).toMatchSnapshot();
			  \});
			
			  test('renders custom up and down icons', () => \{
			    const customTheme = \{
			      select: \{
			        icons: \{
			          down: FormDown,
			          up: CaretUp,
			        \},
			      \},
			    \};
			
			    const \{ getByPlaceholderText, container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Select
			          options=\{['morning', 'afternoon', 'evening']\}
			          placeholder="Select..."
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const selectButton = getByPlaceholderText('Select...');
			    fireEvent.click(selectButton);
			    // Check that custom up icon is applied when open
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('select an option then select a different option', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{['one', 'two']\}
			        onChange=\{onChange\}
			      />,
			    );
			    const select = getByPlaceholderText('test select');
			    fireEvent.click(getByPlaceholderText('test select'));
			    // select first option
			    fireEvent.click(
			      document.getElementById('test-select__drop').querySelector('button'),
			    );
			
			    // checks if select has a value assigned to it after option is selected
			    expect(select.value).toEqual('one');
			
			    fireEvent.click(getByPlaceholderText('test select'));
			    // select second option
			    fireEvent.click(
			      document
			        .getElementById('test-select__drop')
			        .querySelectorAll('button')[1],
			    );
			
			    // checks if select has a value assigned to it after option is selected
			    expect(select.value).toEqual('two');
			    expect(onChange).toHaveBeenCalledTimes(2);
			  \});
			
			  test('keyboard navigation with disabled option', () => \{
			    const \{ getByPlaceholderText \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        options=\{['one', 'two', 'three', 'four']\}
			        disabled=\{[1]\}
			        open
			      />,
			    );
			    const select = getByPlaceholderText('test select');
			    // should skip over disabled option
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Up',
			      keyCode: 38,
			      which: 38,
			    \});
			    // should skip oer disabled option
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Up',
			      keyCode: 38,
			      which: 38,
			    \});
			
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			
			    expect(select.value).toEqual('one');
			  \});
			
			  test('undefined option', () => \{
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{[undefined, 1, 2]\}
			        />
			      </Grommet>,
			    );
			    const select = getByPlaceholderText('test select');
			    fireEvent.click(getByPlaceholderText('test select'));
			    fireEvent.click(
			      document.getElementById('test-select__drop').querySelector('button'),
			    );
			    // if undefined value is selected select will have empty string value
			    expect(select.value).toEqual('');
			  \});
			
			  test('valueLabel', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{[undefined, 1, 2]\}
			          valueLabel="test"
			        />
			      </Grommet>,
			    );
			    expect(container.firsChild).toMatchSnapshot();
			  \});
			
			  test('onChange with valueLabel', () => \{
			    const onChange = jest.fn();
			    const Test = () => \{
			      const [value, setValue] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          value=\{value\}
			          valueLabel=\{<span>\{value || 'none'\}</span>\}
			          options=\{['one', 'two']\}
			          onChange=\{(event) => \{
			            setValue(event.value);
			            onChange(event);
			          \}\}
			        />
			      );
			    \};
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByText('none'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('one'));
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        value: 'one',
			        option: 'one',
			        target: expect.objectContaining(\{
			          value: 'one',
			        \}),
			      \}),
			    );
			  \});
			
			  test('selected', () => \{
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <Select
			          options=\{['one', 'two']\}
			          placeholder="test select"
			          id="test-select"
			          selected=\{0\}
			        />
			      </Grommet>,
			    );
			    const select = getByPlaceholderText('test select');
			    expect(container.firstChild).toMatchSnapshot();
			    expect(select.value).toEqual('one');
			  \});
			
			  test('keyboard navigation timeout', () => \{
			    jest.useFakeTimers();
			    // scrollIntoView is not implemented in jsdom, so we need to mock.
			    // Select keyboard / keyboard nav timeout uses InfiniteScroll which
			    // has scrollIntoView as part of its implementation.
			    window.HTMLElement.prototype.scrollIntoView = jest.fn();
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{['one', 'two', 'three']\}
			          disabled=\{[0]\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByPlaceholderText('test select'));
			    // key event to start keyboard navigation
			    fireEvent.keyDown(document.getElementById('test-select__select-drop'), \{
			      key: 'Down',
			      keyCode: 40,
			      which: 40,
			    \});
			    // advance timers to cause keyboard nav timeout
			    act(() => \{
			      jest.advanceTimersByTime(100);
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('Search timeout', () => \{
			    jest.useFakeTimers();
			    const onSearch = jest.fn();
			    const \{ container, getByPlaceholderText \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{['one', 'two']\}
			          onSearch=\{onSearch\}
			        />
			      </Grommet>,
			    );
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    // advance timers so select can open & have focus
			    act(() => \{
			      jest.advanceTimersByTime(200);
			    \});
			    // add content to search box
			    fireEvent.change(document.activeElement, \{ target: \{ value: 'o' \} \});
			    expect(container.firstChild).toMatchSnapshot();
			    // advance timers to cause search timeout
			    act(() => \{
			      jest.advanceTimersByTime(100);
			    \});
			    expect(document.activeElement).toMatchSnapshot();
			  \});
			
			  test('disabled option value', () => \{
			    jest.useFakeTimers();
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{['one', 'two']\}
			          disabled=\{['one']\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByPlaceholderText('test select'));
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('Clear option renders- top', () => \{
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          value=\{value\}
			          options=\{['one', 'two']\}
			          clear
			        />
			      );
			    \};
			    render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    fireEvent.click(screen.getByPlaceholderText('test select'));
			    fireEvent.click(screen.getByRole('option', \{ name: 'one' \}));
			    fireEvent.click(screen.getByPlaceholderText('test select'));
			    const clearButton = screen.getByRole('button', \{
			      name: 'Clear selection. Or, press down arrow to move to select options',
			    \});
			    expect(clearButton).toBeTruthy();
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('Clear option renders - bottom', () => \{
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          value=\{value\}
			          options=\{['one', 'two']\}
			          clear=\{\{ position: 'bottom' \}\}
			        />
			      );
			    \};
			    render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    fireEvent.click(screen.getByPlaceholderText('test select'));
			    fireEvent.click(screen.getByRole('option', \{ name: 'one' \}));
			    fireEvent.click(screen.getByPlaceholderText('test select'));
			    const clearButton = screen.getByRole('button', \{
			      name: 'Clear selection. Or, press shift tab to move to select options',
			    \});
			    expect(clearButton).toBeTruthy();
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('Clear option renders custom label', () => \{
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          value=\{value\}
			          options=\{['one', 'two']\}
			          clear=\{\{ label: 'test label' \}\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('Clear option renders correct label when wrapped in FormField', () => \{
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <FormField label="Test" name="test">
			          <Select
			            name="test"
			            id="test-select"
			            placeholder="test select"
			            value=\{value\}
			            options=\{['one', 'two']\}
			            clear
			          />
			        </FormField>
			      );
			    \};
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('Clear option clears value onClick', () => \{
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <FormField label="Test" name="test">
			          <Select
			            name="test"
			            id="test-select"
			            placeholder="test select"
			            value=\{value\}
			            options=\{['one', 'two']\}
			            clear
			          />
			        </FormField>
			      );
			    \};
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    const select = getByPlaceholderText('test select');
			    fireEvent.click(getByPlaceholderText('test select'));
			    fireEvent.click(
			      document
			        .getElementById('test-select__drop')
			        .querySelectorAll('button')[1],
			    );
			    fireEvent.click(getByPlaceholderText('test select'));
			    fireEvent.click(
			      document
			        .getElementById('test-select__drop')
			        .querySelectorAll('button')[0],
			    );
			    expect(select.value).toEqual('');
			  \});
			
			  test('default value', () => \{
			    const \{ container, getByDisplayValue \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{['one', 'two']\}
			          defaultValue="two"
			        />
			      </Grommet>,
			    );
			    const select = getByDisplayValue('two');
			    expect(container.firstChild).toMatchSnapshot();
			    expect(select.value).toEqual('two');
			  \});
			
			  test('default value object options', () => \{
			    const \{ container, getByDisplayValue \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{[
			            \{ label: 'one', value: 1 \},
			            \{ label: 'two', value: 2 \},
			          ]\}
			          defaultValue=\{2\}
			          labelKey="label"
			          valueKey=\{\{ key: 'value', reduce: true \}\}
			        />
			      </Grommet>,
			    );
			    const select = getByDisplayValue('two');
			    expect(container.firstChild).toMatchSnapshot();
			    expect(select.value).toEqual('two');
			  \});
			
			  test('default value clear', () => \{
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          defaultValue="two"
			          value=\{value\}
			          options=\{['one', 'two']\}
			          clear
			        />
			      );
			    \};
			    const \{ getByDisplayValue \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    const select = getByDisplayValue('two');
			    fireEvent.click(select);
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(
			      document
			        .getElementById('test-select__drop')
			        .querySelectorAll('button')[0],
			    );
			    expect(select.value).toEqual('');
			  \});
			
			  test('select option by typing should not break if caller passes JSX', () => \{
			    jest.useFakeTimers();
			    const onChange = jest.fn();
			
			    const \{ getByPlaceholderText, container \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{[<Box>JSX Element</Box>, 'one', 'two']\}
			          onChange=\{onChange\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    // advance timers so select can open
			    act(() => jest.advanceTimersByTime(200));
			    // add content to search box
			    fireEvent.keyDown(document.activeElement, \{
			      key: 't',
			      keyCode: 84,
			      which: 84,
			    \});
			    fireEvent.keyDown(document.activeElement, \{
			      key: 'Enter',
			      keyCode: 13,
			      which: 13,
			    \});
			    expect(onChange).toBeCalledWith(expect.objectContaining(\{ value: 'two' \}));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should apply a11yTitle or aria-label', () => \{
			    const \{ container, getByRole \} = render(
			      <Grommet>
			        <Select options=\{['one', 'two', 'three']\} a11yTitle="test" />
			        <Select options=\{['one', 'two', 'three']\} aria-label="test-select" />
			      </Grommet>,
			    );
			
			    expect(getByRole('button', \{ name: 'test' \})).toBeTruthy();
			    expect(getByRole('button', \{ name: 'test-select' \})).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  window.scrollTo.mockRestore();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Select\\__tests__\\Select-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(51)
    });
    it('grommet_grommet\\src\\js\\components\\Select\\__tests__\\SelectMultiple-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ act, render, fireEvent, screen \} from '@testing-library/react';
			import userEvent from '@testing-library/user-event';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import 'jest-styled-components';
			import '@testing-library/jest-dom';
			
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			
			import \{ Grommet \} from '../..';
			import \{ Select \} from '..';
			
			describe('Select Controlled', () => \{
			  window.scrollTo = jest.fn();
			  beforeEach(createPortal);
			
			  test('should not have accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Select options=\{['one', 'two', 'three']\} a11yTitle="test" multiple />
			      </Grommet>,
			    );
			    const results = await axe(container, \{
			      rules: \{
			        /* This rule is flagged because Select is built using a
			        TextInput within a DropButton. According to Dequeue and
			        WCAG 4.1.2 "interactive controls must not have focusable
			        descendants". Jest-axe is assuming that the input is focusable
			        and since the input is a descendant of the button the rule is
			        flagged. However, the TextInput is built so that it is read
			        only and cannot receive focus. Select is accessible
			        according to the WCAG specification, but jest-axe is flagging
			        it so we are disabling this rule. */
			        'nested-interactive': \{ enabled: false \},
			      \},
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('multiple', () => \{
			    const \{ container \} = render(
			      <Select
			        id="test-select"
			        multiple
			        options=\{['one', 'two']\}
			        selected=\{[]\}
			        value=\{[]\}
			      />,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('multiple values', () => \{
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        multiple
			        options=\{['one', 'two']\}
			        selected=\{[0, 1]\}
			        value=\{['one', 'two']\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expect(container.firstChild).toMatchSnapshot();
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('select another option', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        multiple
			        options=\{['one', 'two']\}
			        onChange=\{onChange\}
			        value=\{['two']\}
			        selected=\{[1]\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    fireEvent.click(
			      document.getElementById('test-select__drop').querySelector('button'),
			    );
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{ value: ['two', 'one'] \}),
			    );
			  \});
			
			  test('deselect an option', () => \{
			    const onChange = jest.fn();
			    const \{ getByPlaceholderText, container \} = render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        multiple
			        options=\{['one', 'two']\}
			        onChange=\{onChange\}
			        value=\{['one']\}
			        selected=\{[0]\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    fireEvent.click(
			      document.getElementById('test-select__drop').querySelector('button'),
			    );
			    expect(onChange).toBeCalledWith(expect.objectContaining(\{ value: [] \}));
			  \});
			
			  test('deselect all options should remove clear selection', async () => \{
			    const user = userEvent.setup();
			
			    render(
			      <Select
			        id="test-select"
			        placeholder="test select"
			        multiple
			        options=\{['one', 'two']\}
			        clear
			      />,
			    );
			
			    await user.click(screen.getByPlaceholderText('test select'));
			    await user.click(screen.getByRole('option', \{ name: 'one' \}));
			    await user.click(screen.getByPlaceholderText('test select'));
			
			    expect(screen.getByText('Clear selection')).toBeInTheDocument();
			
			    await user.click(screen.getByRole('option', \{ name: 'one' \}));
			    await user.click(screen.getByPlaceholderText('test select'));
			
			    expect(screen.queryByText('Clear selection')).not.toBeInTheDocument();
			  \});
			
			  test('multiple onChange without valueKey', () => \{
			    const onChange = jest.fn();
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          labelKey="name"
			          value=\{value\}
			          multiple
			          closeOnChange=\{false\}
			          options=\{[
			            \{
			              id: 1,
			              name: 'Value1',
			            \},
			            \{
			              id: 2,
			              name: 'Value2',
			            \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('Value1'));
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        value: [
			          \{
			            id: 1,
			            name: 'Value1',
			          \},
			        ],
			      \}),
			    );
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('Value2'));
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        value: [
			          \{
			            id: 1,
			            name: 'Value1',
			          \},
			          \{
			            id: 2,
			            name: 'Value2',
			          \},
			        ],
			      \}),
			    );
			  \});
			
			  test('multiple onChange with valueKey string', () => \{
			    const onChange = jest.fn();
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          labelKey="name"
			          valueKey="id"
			          value=\{value\}
			          multiple
			          options=\{[
			            \{
			              id: 1,
			              name: 'Value1',
			            \},
			            \{
			              id: 2,
			              name: 'Value2',
			            \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('Value1'));
			    expect(onChange).toBeCalledWith(
			      expect.objectContaining(\{
			        value: [
			          \{
			            id: 1,
			            name: 'Value1',
			          \},
			        ],
			      \}),
			    );
			  \});
			
			  test('multiple onChange with valueKey reduce', () => \{
			    const onChange = jest.fn();
			    const Test = () => \{
			      const [value] = React.useState();
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          labelKey="name"
			          valueKey=\{\{ key: 'id', reduce: true \}\}
			          value=\{value\}
			          multiple
			          options=\{[
			            \{
			              id: 1,
			              name: 'Value1',
			            \},
			            \{
			              id: 2,
			              name: 'Value2',
			            \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('Value1'));
			    expect(onChange).toBeCalledWith(expect.objectContaining(\{ value: [1] \}));
			  \});
			
			  test('multiple onChange toggle with valueKey reduce', () => \{
			    const onChange = jest.fn();
			    const Test = () => \{
			      const [value] = React.useState([1]);
			      return (
			        <Select
			          id="test-select"
			          placeholder="test select"
			          labelKey="name"
			          valueKey=\{\{ key: 'id', reduce: true \}\}
			          value=\{value\}
			          multiple
			          options=\{[
			            \{
			              id: 1,
			              name: 'Value1',
			            \},
			            \{
			              id: 2,
			              name: 'Value2',
			            \},
			          ]\}
			          onChange=\{onChange\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText, container \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			
			    expectPortal('test-select__drop').toMatchSnapshot();
			
			    fireEvent.click(getByText('Value1'));
			    expect(onChange).toBeCalledWith(expect.objectContaining(\{ value: [] \}));
			  \});
			
			  test('multiple with empty results', () => \{
			    const \{ getByPlaceholderText, container \} = render(
			      <Grommet>
			        <Select
			          id="test-select"
			          placeholder="test select"
			          options=\{['one', 'two']\}
			          multiple
			          value=\{[]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.click(getByPlaceholderText('test select'));
			    expectPortal('test-select__drop').toMatchSnapshot();
			  \});
			
			  test('should allow multiple selections when using search', () => \{
			    jest.useFakeTimers();
			    const onChange = jest.fn();
			    const onSearch = jest.fn();
			    const defaultOptions = [
			      \{
			        id: 1,
			        name: 'Value1',
			      \},
			      \{
			        id: 2,
			        name: 'Value2',
			      \},
			      \{
			        id: 15,
			        name: 'Value15',
			      \},
			      \{
			        id: 21,
			        name: 'Value21',
			      \},
			      \{
			        id: 22,
			        name: 'Value22',
			      \},
			    ];
			
			    const Test = () => \{
			      const [value, setValue] = React.useState();
			      const [options, setOptions] = React.useState(defaultOptions);
			
			      return (
			        <Select
			          id="test-select-mult-search"
			          placeholder="Select multiple options"
			          multiple
			          valueKey="id"
			          labelKey="name"
			          value=\{value\}
			          options=\{options\}
			          onChange=\{(\{ value: nextValue \}) => \{
			            onChange(nextValue);
			            setValue(nextValue);
			          \}\}
			          onClose=\{() => setOptions(defaultOptions)\}
			          onSearch=\{(text) => \{
			            onSearch(text);
			            const nextOptions = defaultOptions.filter(
			              (option) =>
			                option.name.toLowerCase().indexOf(text.toLowerCase()) >= 0,
			            );
			            setOptions(nextOptions);
			          \}\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    const selectInput = getByPlaceholderText('Select multiple options');
			    fireEvent.click(selectInput);
			    // advance timers so select can open & have focus
			    act(() => \{
			      jest.advanceTimersByTime(200);
			    \});
			
			    // focus is on search input, searching...
			    fireEvent.change(document.activeElement, \{ target: \{ value: '1' \} \});
			    expect(onSearch).toHaveBeenNthCalledWith(1, '1');
			    // make first selection
			    fireEvent.click(getByText('Value15'));
			    fireEvent.click(selectInput);
			    act(() => \{
			      jest.advanceTimersByTime(200);
			    \});
			
			    // searching again
			    fireEvent.change(document.activeElement, \{ target: \{ value: '2' \} \});
			    expect(onSearch).toHaveBeenNthCalledWith(2, '2');
			    // make second selection
			    fireEvent.click(getByText('Value21'));
			    expect(onChange).toHaveBeenNthCalledWith(2, [
			      \{ id: 15, name: 'Value15' \},
			      \{ id: 21, name: 'Value21' \},
			    ]);
			
			    fireEvent.click(selectInput);
			    act(() => \{
			      jest.advanceTimersByTime(200);
			    \});
			    // remove previous selection
			    fireEvent.click(getByText('Value15'));
			    expect(onChange).toHaveBeenNthCalledWith(3, [\{ id: 21, name: 'Value21' \}]);
			  \});
			
			  test(\`should allow multiple selections when options are
			  loaded lazily\`, () => \{
			    jest.useFakeTimers();
			    const onChange = jest.fn();
			    const optionsFromServer = [
			      \{
			        id: 1,
			        name: 'Value1',
			      \},
			      \{
			        id: 2,
			        name: 'Value2',
			      \},
			      \{
			        id: 15,
			        name: 'Value15',
			      \},
			      \{
			        id: 21,
			        name: 'Value21',
			      \},
			      \{
			        id: 22,
			        name: 'Value22',
			      \},
			    ];
			
			    const Test = () => \{
			      const [value, setValue] = React.useState();
			      const [options, setOptions] = React.useState([]);
			
			      // get options from mock server
			      React.useEffect(() => \{
			        setTimeout(() => \{
			          setOptions(optionsFromServer);
			        \}, 1000);
			      \}, []);
			
			      return (
			        <Select
			          id="test-select-mult-lazy"
			          placeholder="Select multiple lazyload options"
			          multiple
			          valueKey="id"
			          labelKey="name"
			          value=\{value\}
			          options=\{options\}
			          onChange=\{(\{ value: nextValue \}) => \{
			            onChange(nextValue);
			            setValue(nextValue);
			          \}\}
			        />
			      );
			    \};
			    const \{ getByPlaceholderText, getByText \} = render(
			      <Grommet>
			        <Test />
			      </Grommet>,
			    );
			
			    const selectInput = getByPlaceholderText(
			      'Select multiple lazyload options',
			    );
			    fireEvent.click(selectInput);
			    // advance timers so that options have been returned
			    act(() => \{
			      jest.advanceTimersByTime(1100);
			    \});
			    fireEvent.click(getByText('Value15'));
			    expect(onChange).toHaveBeenNthCalledWith(1, [\{ id: 15, name: 'Value15' \}]);
			    fireEvent.click(selectInput);
			    fireEvent.click(getByText('Value22'));
			    expect(onChange).toHaveBeenNthCalledWith(2, [
			      \{ id: 15, name: 'Value15' \},
			      \{ id: 22, name: 'Value22' \},
			    ]);
			  \});
			
			  window.scrollTo.mockRestore();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Select\\__tests__\\SelectMultiple-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(13)
    });
    it('grommet_grommet\\src\\js\\components\\Sidebar\\__tests__\\Sidebar-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Avatar \} from '../../Avatar';
			import \{ Grommet \} from '../../Grommet';
			import \{ Sidebar \} from '..';
			
			const src = '';
			
			describe('Sidebar', () => \{
			  test('renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Sidebar id="test id" name="test name" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('header', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Sidebar header=\{<Avatar src=\{src\} />\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('footer', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Sidebar footer=\{<Avatar src=\{src\} />\} />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('children', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Sidebar>
			          <Avatar src=\{src\} />
			          children test
			        </Sidebar>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('all', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Sidebar
			          footer=\{<Avatar>SY</Avatar>\}
			          header=\{<Avatar src=\{src\} />\}
			          background="brand"
			        >
			          test all props and children
			        </Sidebar>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Sidebar\\__tests__\\Sidebar-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('grommet_grommet\\src\\js\\components\\SkipLinks\\__tests__\\SkipLink-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ act, render, fireEvent \} from '@testing-library/react';
			
			import \{ Grommet, SkipLinks, SkipLink, SkipLinkTarget \} from '../..';
			
			describe('SkipLink', () => \{
			  test('basic', () => \{
			    jest.useFakeTimers();
			    const \{ container \} = render(
			      <Grommet>
			        <SkipLinks id="skip-links">
			          <SkipLink id="main" label="Main Content" />
			          <SkipLink id="footer" label="Footer" />
			        </SkipLinks>
			        <div>
			          <SkipLinkTarget id="main" />
			          Main Content
			          <input type="text" value="main content" onChange=\{() => \{\}\} />
			        </div>
			        <footer>
			          <SkipLinkTarget id="footer" />
			          <input type="text" value="footer" onChange=\{() => \{\}\} />
			        </footer>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    act(() => \{
			      document.getElementById('skip-links').querySelector('a').focus();
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(document.activeElement);
			    act(() => \{
			      document.getElementById('skip-links').querySelector('a').blur();
			    \});
			
			    act(() => \{
			      jest.runAllTimers();
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should allow for single skip link', () => \{
			    jest.useFakeTimers();
			    const \{ container \} = render(
			      <Grommet>
			        <SkipLinks id="skip-links">
			          <SkipLink id="main" label="Main Content" />
			        </SkipLinks>
			        <div>
			          <SkipLinkTarget id="main" />
			          Main Content
			          <input type="text" value="main content" onChange=\{() => \{\}\} />
			        </div>
			        <footer>
			          <input type="text" value="footer" onChange=\{() => \{\}\} />
			        </footer>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    document.getElementById('skip-links').querySelector('a').focus();
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(document.activeElement);
			    document.getElementById('skip-links').querySelector('a').blur();
			
			    act(() => \{
			      jest.runAllTimers();
			    \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\SkipLinks\\__tests__\\SkipLink-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(2)
    });
    it('grommet_grommet\\src\\js\\components\\Spinner\\__tests__\\Spinner-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'regenerator-runtime/runtime';
			import 'jest-axe/extend-expect';
			
			import \{ Node \} from 'grommet-icons';
			import \{ Grommet \} from '../../Grommet';
			import \{ Spinner \} from '..';
			import \{ ThemeType \} from '../../..';
			
			describe('Spinner', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Spinner />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Spinner size="xsmall" />
			        <Spinner size="small" />
			        <Spinner size="medium" />
			        <Spinner size="large" />
			        <Spinner size="xlarge" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Spinner color="graph-0" />
			        <Spinner color="graph-1" />
			        <Spinner color="graph-2" />
			        <Spinner color="graph-3" />
			        <Spinner color="graph-4" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('round renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Spinner round=\{false\} />
			        <Spinner round="small" />
			        <Spinner round="medium" />
			        <Spinner round="large" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('border renders', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Spinner
			          border=\{[
			            \{
			              side: 'all',
			              color: 'brand',
			              size: 'medium',
			              style: 'dotted',
			            \},
			          ]\}
			        />
			        <Spinner
			          border=\{[
			            \{
			              side: 'horizontal',
			              color: 'brand',
			              size: 'large',
			              style: 'inset',
			            \},
			          ]\}
			        />
			        <Spinner
			          border=\{[
			            \{ side: 'all', color: 'transparent', size: 'medium' \},
			            \{ side: 'horizontal', color: 'brand', size: 'medium' \},
			          ]\}
			        />
			        <Spinner
			          border=\{[
			            \{ side: 'all', color: 'background-contrast', size: 'medium' \},
			            \{ side: 'right', color: 'brand', size: 'medium' \},
			            \{ side: 'top', color: 'brand', size: 'medium' \},
			            \{ side: 'left', color: 'brand', size: 'medium' \},
			          ]\}
			        />
			        <Spinner
			          border=\{[\{ side: 'horizontal', color: 'brand', size: 'medium' \}]\}
			        />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('spinner changes according to theme', () => \{
			    const theme: ThemeType = \{
			      spinner: \{
			        size: \{ small: '30px' \},
			        container: \{
			          animation: \{ type: 'rotateLeft', duration: 900 \},
			          border: false,
			          background: 'red',
			          pad: 'large',
			          round: 'medium',
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{theme\}>
			        <Spinner />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('spinner icon changes according to theme', () => \{
			    const theme = \{
			      spinner: \{
			        icon: Node,
			        container: \{
			          color: 'accent-2',
			          align: 'center',
			          justify: 'center',
			          size: 'large',
			          animation: \{ type: 'rotateLeft', duration: 900 \},
			        \},
			      \},
			    \};
			
			    const \{ container \} = render(
			      <Grommet theme=\{theme\}>
			        <Spinner />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('spinner color renders over theme settings', () => \{
			    const theme: ThemeType = \{
			      spinner: \{
			        container: \{
			          border: [
			            \{ side: 'all', color: 'background-contrast', size: 'medium' \},
			            \{ side: 'right', color: 'green', size: 'medium' \},
			            \{ side: 'top', color: 'green', size: 'medium' \},
			            \{ side: 'left', color: 'green', size: 'medium' \},
			          ],
			        \},
			      \},
			    \};
			    const \{ container \} = render(
			      <Grommet theme=\{theme\}>
			        <Spinner color="#1479FB" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Spinner\\__tests__\\Spinner-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(8)
    });
    it('grommet_grommet\\src\\js\\components\\Stack\\__tests__\\Stack-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Stack \} from '..';
			
			const CONTENTS = [<div key=\{1\}>first</div>, <div key=\{2\}>second</div>];
			
			describe('Stack', () => \{
			  test('default', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Stack>\{CONTENTS\}</Stack>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('guidingChild', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Stack guidingChild="first">\{CONTENTS\}</Stack>
			        <Stack guidingChild="last">\{CONTENTS\}</Stack>
			        <Stack guidingChild=\{0\}>\{CONTENTS\}</Stack>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('anchor', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Stack anchor="center">\{CONTENTS\}</Stack>
			        <Stack anchor="top">\{CONTENTS\}</Stack>
			        <Stack anchor="left">\{CONTENTS\}</Stack>
			        <Stack anchor="bottom">\{CONTENTS\}</Stack>
			        <Stack anchor="right">\{CONTENTS\}</Stack>
			        <Stack anchor="top-left">\{CONTENTS\}</Stack>
			        <Stack anchor="bottom-left">\{CONTENTS\}</Stack>
			        <Stack anchor="top-right">\{CONTENTS\}</Stack>
			        <Stack anchor="bottom-right">\{CONTENTS\}</Stack>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Stack fill>\{CONTENTS\}</Stack>
			        <Stack fill=\{false\}>\{CONTENTS\}</Stack>
			        <Stack fill="horizontal">\{CONTENTS\}</Stack>
			        <Stack fill="vertical">\{CONTENTS\}</Stack>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('interactiveChild', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Stack interactiveChild="first">\{CONTENTS\}</Stack>
			        <Stack interactiveChild="last">\{CONTENTS\}</Stack>
			        <Stack interactiveChild=\{0\}>\{CONTENTS\}</Stack>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Stack\\__tests__\\Stack-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
    it('grommet_grommet\\src\\js\\components\\Table\\__tests__\\Table-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{
			  Grommet,
			  Table,
			  TableHeader,
			  TableFooter,
			  TableBody,
			  TableRow,
			  TableCell,
			\} from '../..';
			
			test('Table renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('Table caption renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table caption="Caption" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableHeader renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableHeader />
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableFooter renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableFooter />
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableBody renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableBody />
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableRow renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableBody>
			          <TableRow />
			        </TableBody>
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableCell renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableHeader>
			          <TableRow>
			            <TableCell />
			          </TableRow>
			        </TableHeader>
			        <TableBody>
			          <TableRow>
			            <TableCell />
			          </TableRow>
			        </TableBody>
			        <TableFooter>
			          <TableRow>
			            <TableCell />
			          </TableRow>
			        </TableFooter>
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableCell scope renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableHeader>
			          <TableRow>
			            <TableCell scope="col" />
			          </TableRow>
			        </TableHeader>
			        <TableBody>
			          <TableRow>
			            <TableCell scope="row" />
			          </TableRow>
			        </TableBody>
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableCell size renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableBody>
			          <TableRow>
			            <TableCell size="xsmall" />
			            <TableCell size="small" />
			            <TableCell size="medium" />
			            <TableCell size="large" />
			          </TableRow>
			        </TableBody>
			      </Table>
			
			      <Table>
			        <TableBody>
			          <TableRow>
			            <TableCell size="1/2" />
			            <TableCell size="2/4" />
			          </TableRow>
			        </TableBody>
			      </Table>
			
			      <Table>
			        <TableBody>
			          <TableRow>
			            <TableCell size="1/3" />
			            <TableCell size="2/3" />
			          </TableRow>
			        </TableBody>
			      </Table>
			
			      <Table>
			        <TableBody>
			          <TableRow>
			            <TableCell size="1/4" />
			            <TableCell size="3/4" />
			          </TableRow>
			        </TableBody>
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableCell verticalAlign renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableHeader>
			          <TableRow>
			            <TableCell verticalAlign="top" />
			            <TableCell verticalAlign="middle" />
			            <TableCell verticalAlign="bottom" />
			          </TableRow>
			        </TableHeader>
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableCell plain renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableHeader>
			          <TableRow>
			            <TableCell plain />
			          </TableRow>
			        </TableHeader>
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('TableCell border renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Table>
			        <TableHeader>
			          <TableRow>
			            <TableCell border="top" />
			            <TableCell border=\{\{ side: 'top', size: 'medium' \}\} />
			            <TableCell
			              border=\{[
			                \{ side: 'right', size: 'medium' \},
			                \{ side: 'bottom', size: 'large' \},
			              ]\}
			            />
			          </TableRow>
			        </TableHeader>
			      </Table>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Table\\__tests__\\Table-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(12)
    });
    it('grommet_grommet\\src\\js\\components\\Tabs\\__tests__\\Tabs-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import styled, \{ css \} from 'styled-components';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ axe \} from 'jest-axe';
			import \{ render, fireEvent \} from '@testing-library/react';
			
			import \{ Grommet, Tab, Tabs \} from '../..';
			import \{ ThemeType \} from '../../../themes';
			
			describe('Tabs', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tabs>
			          <Tab a11yTitle="test" />
			        </Tabs>
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container).toMatchSnapshot();
			  \});
			
			  test('no Tab', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tabs>
			          <Tab />
			        </Tabs>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('no Tabs', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tab />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('Tab', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tabs>
			          <Tab title="Tab 1">Tab body 1</Tab>
			          \{undefined\}
			          <Tab title="Tab 2">Tab body 2</Tab>
			        </Tabs>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('complex title', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tabs>
			          <Tab title=\{<div>Tab 1</div>\}>Tab body 1</Tab>
			          \{undefined\}
			          <Tab title=\{<div>Tab 2</div>\}>Tab body 2</Tab>
			        </Tabs>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('with icon + reverse', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tabs>
			          <Tab title="Tab 1" icon=\{<svg />\}>
			            Tab body 1
			          </Tab>
			          <Tab title="Tab 2" icon=\{<svg />\} reverse>
			            Tab body 2
			          </Tab>
			        </Tabs>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('alignControls', () => \{
			    const \{ container \} = render(
			      <Grommet full>
			        <Tabs alignControls="center">
			          <Tab title="Tab 1">Tab body 1</Tab>
			          <Tab title="Tab 2">Tab body 2</Tab>
			        </Tabs>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('Custom Tab component', () => \{
			    const CustomTab = () => <Tab title="Tab 1">Tab body 1</Tab>;
			    const \{ container \} = render(
			      <Grommet>
			        <Tabs>
			          <CustomTab />
			          <Tab title="Tab 2">Tab body 2</Tab>
			        </Tabs>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('change to second tab', () => \{
			    const onActive = jest.fn();
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Tabs onActive=\{onActive\}>
			          <Tab title="Tab 1">Tab body 1</Tab>
			          <Tab title="Tab 2">Tab body 2</Tab>
			        </Tabs>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('Tab 2'));
			    expect(onActive).toBeCalledWith(1);
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('set on hover', () => \{
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Tabs>
			          \{/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */\}
			          <Tab title="Tab 1" onMouseOver=\{() => \{\}\} onMouseOut=\{() => \{\}\}>
			            Tab body 1
			          </Tab>
			          <Tab title="Tab 2">Tab body 2</Tab>
			        </Tabs>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOver(getByText('Tab 1'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOver(getByText('Tab 2'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOut(getByText('Tab 1'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.mouseOut(getByText('Tab 2'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should style as disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tabs>
			          <Tab title="Enabled Tab">This tab is enabled</Tab>
			          <Tab title="Disabled Tab" disabled>
			            This tab is disabled
			          </Tab>
			        </Tabs>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should apply custom theme disabled style', () => \{
			    const disabledTextColor = 'blue';
			    const disabledBorderBottomColor = 'green';
			    const customTheme = \{
			      tab: \{
			        border: \{
			          disabled: \{
			            color: disabledBorderBottomColor,
			          \},
			        \},
			        disabled: \{
			          color: disabledTextColor,
			        \},
			      \},
			    \};
			
			    const \{ container, getByText \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Tabs>
			          <Tab title="Enabled Tab">This tab is enabled</Tab>
			          <Tab title="Disabled Tab" disabled>
			            This tab is disabled
			          </Tab>
			        </Tabs>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const disabledTab = getByText('Disabled Tab').parentElement!;
			    const disabledTabStyle = window.getComputedStyle(disabledTab);
			    expect(disabledTabStyle.color).toBe(disabledTextColor);
			    expect(disabledTabStyle.borderBottomColor).toBe(disabledBorderBottomColor);
			  \});
			
			  test(\`should apply custom theme disabled style when theme.button.default is 
			  defined\`, () => \{
			    const disabledTextColor = 'blue';
			    const disabledBorderBottomColor = 'green';
			    const customTheme = \{
			      button: \{
			        default: \{\},
			      \},
			      tab: \{
			        border: \{
			          disabled: \{
			            color: disabledBorderBottomColor,
			          \},
			        \},
			        disabled: \{
			          color: disabledTextColor,
			        \},
			      \},
			    \};
			
			    const \{ container, getByText \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Tabs>
			          <Tab title="Enabled Tab">This tab is enabled</Tab>
			          <Tab title="Disabled Tab" disabled>
			            This tab is disabled
			          </Tab>
			        </Tabs>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			
			    const disabledTab = getByText('Disabled Tab').parentElement!;
			    const disabledTabStyle = window.getComputedStyle(disabledTab);
			    expect(disabledTabStyle.color).toBe(disabledTextColor);
			    expect(disabledTabStyle.borderBottomColor).toBe(disabledBorderBottomColor);
			  \});
			
			  const ButtonTab = styled(Tab)<\{ active?: boolean \}>\`
			    \$\{(props) => css\`
			      background: \$\{props.active ? 'blue' : 'green'\};
			    \`\}
			  \`;
			
			  test('styled component should change tab color when active', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Tabs>
			          <ButtonTab title="About" />
			          <ButtonTab title="Activity" />
			          <ButtonTab title="Stickers" />
			        </Tabs>
			      </Grommet>,
			    );
			    fireEvent.click(getByText('Activity'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should have no default styles with plain prop', () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Tabs>
			          <Tab title="Title 1" plain />
			        </Tabs>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			    const plainTab = getByText('Title 1').parentElement!;
			    const plainTabStyle = window.getComputedStyle(plainTab);
			    expect(plainTabStyle.borderBottom).toBe('');
			  \});
			
			  test('should allow to extend tab styles', () => \{
			    const customTheme: ThemeType = \{
			      tab: \{
			        extend: \`color: red;
			                padding: 20px;
			                box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
			                margin: 30px;\`,
			      \},
			    \};
			    const \{ container, getByText \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Tabs>
			          <Tab title="Title 1" plain>
			            Some content
			          </Tab>
			          <Tab title="Title 2">Some content 2</Tab>
			        </Tabs>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			    const extendedPlainTab = getByText('Title 1')!;
			    const extendedPlainTabStyle = window.getComputedStyle(extendedPlainTab);
			    // color can be changed only when plain prop used
			    expect(extendedPlainTabStyle.color).toBe('red');
			
			    const extendedTab = getByText('Title 2')!;
			    const extendedTabStyle = window.getComputedStyle(extendedTab);
			    expect(extendedTabStyle.color).not.toBe('red');
			
			    const extendedTabParent = extendedTab.parentElement!;
			    const extendedTabParentStyle = window.getComputedStyle(extendedTabParent);
			    expect(extendedTabParentStyle.padding).toBe('20px');
			  \});
			
			  test('onClick', () => \{
			    const onClick = jest.fn();
			
			    const \{ getByText, container \} = render(
			      <Grommet>
			        <Tabs>
			          <Tab title="Tab 1">Tab body 1</Tab>
			          <Tab title="Tab 2" onClick=\{onClick\}>
			            Tab body 2
			          </Tab>
			        </Tabs>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByText('Tab 2'));
			    expect(onClick).toBeCalled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Tabs\\__tests__\\Tabs-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('grommet_grommet\\src\\js\\components\\Tag\\__tests__\\Tag-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, screen \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import userEvent from '@testing-library/user-event';
			
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import '@testing-library/jest-dom';
			
			import \{ Grommet, Tag \} from '../..';
			
			describe('Tag', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tag a11yTitle="Test tag" value="Test" />
			      </Grommet>,
			    );
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('passes through the aria-label prop', async () => \{
			    const TEST_LABEL = 'Test Label';
			    const \{ container \} = render(
			      <Grommet>
			        <Tag aria-label=\{TEST_LABEL\} data-testid="tag" value="Test" />
			      </Grommet>,
			    );
			    expect(screen.getByTestId('tag')).toHaveAttribute('aria-label', TEST_LABEL);
			
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tag name="Name" value="Value" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onClick', async () => \{
			    const user = userEvent.setup();
			
			    const onClick = jest.fn();
			    const \{ container \} = render(
			      <Grommet>
			        <Tag value="Test" onClick=\{onClick\} />
			      </Grommet>,
			    );
			
			    await user.click(screen.getByRole('button'));
			    expect(onClick).toBeCalled();
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onRemove', async () => \{
			    const user = userEvent.setup();
			
			    const onRemove = jest.fn();
			    const \{ container \} = render(
			      <Grommet>
			        <Tag value="Test" onRemove=\{onRemove\} />
			      </Grommet>,
			    );
			
			    await user.click(screen.getByRole('button'));
			    expect(onRemove).toBeCalled();
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tag size="xsmall" name="Name" value="Value" />
			        <Tag size="small" name="Name" value="Value" />
			        <Tag size="medium" name="Name" value="Value" />
			        <Tag size="large" name="Name" value="Value" />
			        <Tag size="xlarge" name="Name" value="Value" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Tag\\__tests__\\Tag-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('grommet_grommet\\src\\js\\components\\Text\\__tests__\\Text-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Text \} from '..';
			
			test('should have no accessibility violations', async () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text a11yTitle="test"> Example</Text>
			    </Grommet>,
			  );
			
			  const results = await axe(container);
			  expect(results).toHaveNoViolations();
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('renders', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text>text</Text>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('accepts ref', () => \{
			  const ref = React.createRef<HTMLParagraphElement>();
			  const \{ container \} = render(
			    <Grommet>
			      <Text ref=\{ref\}>text</Text>
			    </Grommet>,
			  );
			
			  expect(ref.current).not.toBeNull();
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('renders size', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text size="xsmall" />
			      <Text size="small" />
			      <Text size="medium" />
			      <Text size="large" />
			      <Text size="xlarge" />
			      <Text size="xxlarge" />
			      <Text size="2xl" />
			      <Text size="3xl" />
			      <Text size="4xl" />
			      <Text size="5xl" />
			      <Text size="6xl" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('renders textAlign', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text textAlign="start" />
			      <Text textAlign="center" />
			      <Text textAlign="end" />
			      <Text textAlign="justify" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('renders margin', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text margin="small" />
			      <Text margin="medium" />
			      <Text margin="large" />
			      <Text margin="none" />
			      <Text margin=\{\{ vertical: 'small' \}\} />
			      <Text margin=\{\{ horizontal: 'small' \}\} />
			      <Text margin=\{\{ bottom: 'small' \}\} />
			      <Text margin=\{\{ top: 'small' \}\} />
			      <Text margin=\{\{ left: 'small' \}\} />
			      <Text margin=\{\{ right: 'small' \}\} />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			const LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
			
			test('renders truncate', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text truncate=\{false\}>\{LONG\}</Text>
			      <Text truncate>\{LONG\}</Text>
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('renders color', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text color="status-critical" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('renders tag', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text as="div" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('proxies tag', () => \{
			  const \{ container: tagComponent \} = render(
			    <Grommet>
			      <Text tag="div" />
			    </Grommet>,
			  );
			  const \{ container: asComponent \} = render(
			    <Grommet>
			      <Text as="div" />
			    </Grommet>,
			  );
			
			  expect(tagComponent).toEqual(asComponent);
			\});
			
			test('renders weight', () => \{
			  const \{ container \} = render(
			    <Grommet>
			      <Text weight="normal" />
			      <Text weight="bold" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('renders tip', () => \{
			  const \{ container, getByText \} = render(
			    <Grommet>
			      <Text tip="tooltip">Default Tip</Text>
			    </Grommet>,
			  );
			
			  fireEvent.mouseOver(getByText('Default Tip'));
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('should apply a11yTitle or aria-label', () => \{
			  const \{ container, getByLabelText \} = render(
			    <Grommet>
			      <Text a11yTitle="test"> Example</Text>
			      <Text aria-label="test-2">Example</Text>
			    </Grommet>,
			  );
			
			  expect(getByLabelText('test')).toBeTruthy();
			  expect(getByLabelText('test-2')).toBeTruthy();
			  expect(container.firstChild).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Text\\__tests__\\Text-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(13)
    });
    it('grommet_grommet\\src\\js\\components\\TextArea\\__tests__\\TextArea-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ fireEvent, render \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ TextArea \} from '..';
			
			describe('TextArea', () => \{
			  test('should not have accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextArea a11yTitle="test" id="item" name="item" />
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextArea id="item" name="item" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('placeholder', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextArea id="item" name="item" placeholder="placeholder" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('plain', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextArea id="item" name="item" plain />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextArea disabled id="item" name="item" plain />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('focusIndicator', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextArea id="item" name="item" focusIndicator />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextArea id="item" name="item" fill />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  [true, false, 'horizontal', 'vertical'].forEach((resize) => \{
			    test(\`resize \$\{resize\}\`, () => \{
			      const \{ container \} = render(
			        <Grommet>
			          <TextArea id="item" name="item" resize=\{resize\} />
			        </Grommet>,
			      );
			
			      expect(container.firstChild).toMatchSnapshot();
			    \});
			  \});
			
			  ['small', 'medium', 'large'].forEach((size) => \{
			    test(\`size \$\{size\}\`, () => \{
			      const \{ container \} = render(
			        <Grommet>
			          <TextArea id="item" name="item" size=\{size\} />
			        </Grommet>,
			      );
			
			      expect(container.firstChild).toMatchSnapshot();
			    \});
			  \});
			
			  describe('Event tests', () => \{
			    const keyEvent = \{
			      key: 'Backspace',
			      keyCode: 8,
			      which: 8,
			    \};
			
			    test(\`onKeyDown\`, () => \{
			      let capturedEvent = null;
			      const callback = (event) => \{
			        const \{ key, keyCode, which \} = event;
			        capturedEvent = \{ key, keyCode, which \};
			      \};
			
			      const component = render(
			        <Grommet>
			          <TextArea
			            id="item"
			            name="item"
			            placeholder="item"
			            onKeyDown=\{callback\}
			          />
			        </Grommet>,
			      );
			
			      const textArea = component.getByPlaceholderText('item');
			
			      fireEvent.keyDown(textArea, keyEvent);
			
			      expect(capturedEvent).toEqual(expect.objectContaining(keyEvent));
			    \});
			
			    test(\`onKeyUp\`, () => \{
			      let capturedEvent = null;
			      const callback = (event) => \{
			        const \{ key, keyCode, which \} = event;
			        capturedEvent = \{ key, keyCode, which \};
			      \};
			
			      const component = render(
			        <Grommet>
			          <TextArea
			            id="item"
			            name="item"
			            placeholder="item"
			            onKeyUp=\{callback\}
			          />
			        </Grommet>,
			      );
			
			      const textArea = component.getByPlaceholderText('item');
			
			      fireEvent.keyUp(textArea, keyEvent);
			
			      expect(capturedEvent).toEqual(expect.objectContaining(keyEvent));
			    \});
			
			    test('onFocus', () => \{
			      const onFocus = jest.fn();
			      const \{ container, getByPlaceholderText \} = render(
			        <Grommet>
			          <TextArea name="item" placeholder="item" onFocus=\{onFocus\} />
			        </Grommet>,
			      );
			      fireEvent.focus(getByPlaceholderText('item'));
			      expect(container.firstChild).toMatchSnapshot();
			      expect(onFocus).toHaveBeenCalledTimes(1);
			    \});
			
			    test('onChange', () => \{
			      const onChange = jest.fn();
			      const \{ getByPlaceholderText \} = render(
			        <Grommet>
			          <TextArea name="item" placeholder="item" onChange=\{onChange\} />
			        </Grommet>,
			      );
			      const input = getByPlaceholderText('item');
			      fireEvent.change(input, \{
			        target: \{ value: 'Test' \},
			      \});
			      expect(input.value).toEqual('Test');
			      expect(onChange).toHaveBeenCalledTimes(1);
			    \});
			
			    test('onBlur is being called', () => \{
			      const onBlur = jest.fn();
			      const \{ getByPlaceholderText \} = render(
			        <Grommet>
			          <TextArea name="item" placeholder="item" onBlur=\{onBlur\} />
			        </Grommet>,
			      );
			      fireEvent.blur(getByPlaceholderText('item'));
			      expect(onBlur).toHaveBeenCalledTimes(1);
			    \});
			
			    test('renders size', () => \{
			      const \{ container \} = render(
			        <Grommet>
			          <TextArea size="xsmall" />
			          <TextArea size="small" />
			          <TextArea size="medium" />
			          <TextArea size="large" />
			          <TextArea size="xlarge" />
			          <TextArea size="xxlarge" />
			          <TextArea size="2xl" />
			          <TextArea size="3xl" />
			          <TextArea size="4xl" />
			          <TextArea size="5xl" />
			          <TextArea size="6xl" />
			          <TextArea size="16px" />
			          <TextArea size="1rem" />
			          <TextArea size="100%" />
			        </Grommet>,
			      );
			      expect(container.children).toMatchSnapshot();
			    \});
			  \});
			
			  test('custom theme input font size', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{\{ global: \{ input: \{ font: \{ size: '16px' \} \} \} \}\}>
			        <TextArea />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should apply a11yTitle or aria-label', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <TextArea a11yTitle="item" id="item" name="item" />
			        <TextArea aria-label="item-2" id="item-2" name="item-2" />
			      </Grommet>,
			    );
			
			    expect(getByLabelText('item')).toBeTruthy();
			    expect(getByLabelText('item-2')).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\TextArea\\__tests__\\TextArea-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('grommet_grommet\\src\\js\\components\\TextInput\\__tests__\\TextInput-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import 'regenerator-runtime/runtime';
			import \{ fireEvent, render, waitFor \} from '@testing-library/react';
			import \{ getByText, screen \} from '@testing-library/dom';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import \{ Search \} from 'grommet-icons';
			
			import \{ createPortal, expectPortal \} from '../../../utils/portal';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ TextInput \} from '..';
			import \{ Keyboard \} from '../../Keyboard';
			import \{ Text \} from '../../Text';
			
			describe('TextInput', () => \{
			  beforeEach(createPortal);
			
			  test('should not have accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextInput a11yTitle="aria-test" name="item" />
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('basic', () => \{
			    const \{ container \} = render(<TextInput name="item" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('a11yTitle or aria-label', () => \{
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <TextInput a11yTitle="aria-test" name="item" />
			        <TextInput aria-label="aria-test-2" name="item-2" />
			      </Grommet>,
			    );
			
			    expect(getByLabelText('aria-test')).toBeTruthy();
			    expect(getByLabelText('aria-test-2')).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('disabled', () => \{
			    const \{ container \} = render(<TextInput disabled name="item" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('icon', () => \{
			    const \{ container \} = render(<TextInput icon=\{<Search />\} name="item" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('icon reverse', () => \{
			    const \{ container \} = render(
			      <TextInput icon=\{<Search />\} reverse name="item" />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('suggestions', (done) => \{
			    const onChange = jest.fn();
			    const onFocus = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <TextInput
			        data-testid="test-input"
			        id="item"
			        name="item"
			        suggestions=\{['test', 'test1']\}
			        onChange=\{onChange\}
			        onFocus=\{onFocus\}
			      />,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.focus(getByTestId('test-input'));
			    fireEvent.change(getByTestId('test-input'), \{ target: \{ value: ' ' \} \});
			
			    setTimeout(() => \{
			      expectPortal('text-input-drop__item').toMatchSnapshot();
			      expect(onChange).toBeCalled();
			      expect(onFocus).toBeCalled();
			
			      fireEvent(
			        document,
			        new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			      );
			      expect(document.getElementById('text-input-drop__item')).toBeNull();
			      done();
			    \}, 50);
			  \});
			
			  test('complex suggestions', (done) => \{
			    const \{ getByTestId, container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{[\{ label: 'test', value: 'test' \}, \{ value: 'test1' \}]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.focus(getByTestId('test-input'));
			    fireEvent.change(getByTestId('test-input'), \{ target: \{ value: ' ' \} \});
			
			    setTimeout(() => \{
			      expectPortal('text-input-drop__item').toMatchSnapshot();
			
			      fireEvent(
			        document,
			        new MouseEvent('mousedown', \{ bubbles: true, cancelable: true \}),
			      );
			      expect(document.getElementById('text-input-drop__item')).toBeNull();
			      done();
			    \}, 50);
			  \});
			
			  test('close suggestion drop', (done) => \{
			    const \{ getByTestId, container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{['test', 'test1']\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.focus(getByTestId('test-input'));
			    fireEvent.change(getByTestId('test-input'), \{ target: \{ value: ' ' \} \});
			    setTimeout(() => \{
			      expectPortal('text-input-drop__item').toMatchSnapshot();
			
			      fireEvent.keyDown(getByTestId('test-input'), \{
			        key: 'Esc',
			        keyCode: 27,
			        which: 27,
			      \});
			      setTimeout(() => \{
			        expect(document.getElementById('text-input-drop__item')).toBeNull();
			        expect(container.firstChild).toMatchSnapshot();
			        done();
			      \}, 50);
			    \}, 50);
			  \});
			
			  test('let escape events propagage if there are no suggestions', (done) => \{
			    const callback = jest.fn();
			    const \{ getByTestId \} = render(
			      <Grommet>
			        <Keyboard onEsc=\{callback\}>
			          <TextInput data-testid="test-input" id="item" name="item" />
			        </Keyboard>
			      </Grommet>,
			    );
			
			    fireEvent.change(getByTestId('test-input'), \{ target: \{ value: ' ' \} \});
			    setTimeout(() => \{
			      fireEvent.keyDown(getByTestId('test-input'), \{
			        key: 'Esc',
			        keyCode: 27,
			        which: 27,
			      \});
			      expect(callback).toBeCalled();
			      done();
			    \}, 50);
			  \});
			
			  test('calls onSuggestionsOpen', (done) => \{
			    const onSuggestionsOpen = jest.fn();
			    const \{ getByTestId \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{['test', 'test1']\}
			          onSuggestionsOpen=\{onSuggestionsOpen\}
			        />
			      </Grommet>,
			    );
			
			    fireEvent.focus(getByTestId('test-input'));
			    setTimeout(() => \{
			      expectPortal('text-input-drop__item').toMatchSnapshot();
			      expect(onSuggestionsOpen).toBeCalled();
			      done();
			    \}, 50);
			  \});
			
			  test('calls onSuggestionsClose', (done) => \{
			    const onSuggestionsClose = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{['test', 'test1']\}
			          onSuggestionsClose=\{onSuggestionsClose\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.focus(getByTestId('test-input'));
			    setTimeout(() => \{
			      expectPortal('text-input-drop__item').toMatchSnapshot();
			
			      fireEvent.keyDown(getByTestId('test-input'), \{
			        key: 'Esc',
			        keyCode: 27,
			        which: 27,
			      \});
			      setTimeout(() => \{
			        expect(document.getElementById('text-input-drop__item')).toBeNull();
			        expect(onSuggestionsClose).toBeCalled();
			        expect(container.firstChild).toMatchSnapshot();
			        done();
			      \}, 50);
			    \}, 50);
			  \});
			
			  test('select suggestion', (done) => \{
			    const onSelect = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          plain
			          size="large"
			          id="item"
			          name="item"
			          suggestions=\{['test', 'test1']\}
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.focus(getByTestId('test-input'));
			    fireEvent.change(getByTestId('test-input'), \{ target: \{ value: ' ' \} \});
			    setTimeout(() => \{
			      expectPortal('text-input-drop__item').toMatchSnapshot();
			
			      // Casting a custom to a primitive by erasing type with unknown.
			      fireEvent.click(getByText(document as unknown as HTMLElement, 'test1'));
			      expect(container.firstChild).toMatchSnapshot();
			      expect(document.getElementById('text-input-drop__item')).toBeNull();
			      expect(onSelect).toBeCalledWith(
			        expect.objectContaining(\{ suggestion: 'test1' \}),
			      );
			      done();
			    \}, 50);
			  \});
			
			  test('select a suggestion with onSelect', () => \{
			    const onSelect = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{['test', \{ value: 'test1' \}]\}
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const input = getByTestId('test-input');
			    // pressing enter here nothing will happen
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 38 \}); // up
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onSelect).toBeCalledWith(
			      expect.objectContaining(\{
			        suggestion: 'test',
			      \}),
			    );
			  \});
			
			  test('auto-select 2nd suggestion with defaultSuggestion', () => \{
			    const onSelect = jest.fn();
			    const suggestions = ['test1', 'test2'];
			    const defaultSuggestionIndex = 1;
			    const \{ getByTestId \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          defaultSuggestion=\{defaultSuggestionIndex\}
			          suggestions=\{suggestions\}
			          onSuggestionSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			
			    const input = getByTestId('test-input');
			    // open drop - second should be automatically highlighted
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    // pressing enter here will select the second suggestion
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onSelect).toBeCalledWith(
			      expect.objectContaining(\{
			        suggestion: suggestions[defaultSuggestionIndex],
			      \}),
			    );
			  \});
			
			  test('auto-select 1st suggestion via typing with defaultSuggestion', () => \{
			    const onSelect = jest.fn();
			    const suggestions = ['nodefault1', 'default', 'nodefault2'];
			    const defaultSuggestionIndex = 1;
			    const \{ getByTestId \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          defaultSuggestion=\{defaultSuggestionIndex\}
			          suggestions=\{suggestions\}
			          onSuggestionSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			
			    const input = getByTestId('test-input');
			    // Set focus so drop opens and we track activeSuggestionIndex
			    fireEvent.focus(input);
			    // Fire a change event so that onChange is triggered.
			    fireEvent.change(input, \{ target: \{ value: 'ma' \} \});
			    // Each time we type, the active suggestion should reset to the suggestion
			    // matching the entered text, or the default suggestion index if no
			    // suggestion matches.  Now, when we hit enter, there's no match yet, so
			    // the default suggestion should be selected.
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onSelect).toBeCalledWith(
			      expect.objectContaining(\{
			        suggestion: 'default',
			      \}),
			    );
			  \});
			
			  test('do not select any suggestion without defaultSuggestion', () => \{
			    const onSelect = jest.fn();
			    const \{ getByTestId \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{['test1', 'test2']\}
			          onSuggestionSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			
			    const input = getByTestId('test-input');
			    // open drop
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    // pressing enter here closes drop but doesn't select
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    // if no suggestion had been selected, don't call onSelect
			    expect(onSelect).not.toBeCalled();
			
			    // open drop
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    // highlight first
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    // highlight second
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    // select highlighted
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onSelect).toBeCalledWith(
			      expect.objectContaining(\{
			        suggestion: 'test2',
			      \}),
			    );
			  \});
			
			  test('select a suggestion with onSuggestionSelect', () => \{
			    const onSuggestionSelect = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{['test', \{ value: 'test1' \}]\}
			          onSuggestionSelect=\{onSuggestionSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const input = getByTestId('test-input');
			    // pressing enter here nothing will happen
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 38 \}); // up
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onSuggestionSelect).toBeCalledWith(
			      expect.objectContaining(\{
			        suggestion: 'test',
			      \}),
			    );
			  \});
			
			  test('select with onSuggestionSelect when onSelect is present', () => \{
			    const onSelect = jest.fn();
			    const onSuggestionSelect = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{['test', \{ value: 'test1' \}]\}
			          onSelect=\{onSelect\}
			          onSuggestionSelect=\{onSuggestionSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const input = getByTestId('test-input');
			    // pressing enter here nothing will happen
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 40 \}); // down
			    fireEvent.keyDown(input, \{ keyCode: 38 \}); // up
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onSuggestionSelect).toBeCalledWith(
			      expect.objectContaining(\{
			        suggestion: 'test',
			      \}),
			    );
			  \});
			
			  test('handles next and previous without suggestion', () => \{
			    const onSelect = jest.fn();
			    const \{ getByTestId, container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			
			    const input = getByTestId('test-input');
			    fireEvent.keyDown(input, \{ keyCode: 40 \});
			    fireEvent.keyDown(input, \{ keyCode: 40 \});
			    fireEvent.keyDown(input, \{ keyCode: 38 \});
			    fireEvent.keyDown(input, \{ keyCode: 13 \}); // enter
			    expect(onSelect).not.toBeCalled();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  ['small', 'medium', 'large'].forEach((dropHeight) => \{
			    test(\`\$\{dropHeight\} drop height\`, (done) => \{
			      const \{ getByTestId \} = render(
			        <TextInput
			          data-testid="test-input"
			          id="item"
			          name="item"
			          suggestions=\{['test', 'test1']\}
			          dropHeight=\{dropHeight\}
			        />,
			      );
			
			      fireEvent.focus(getByTestId('test-input'));
			      setTimeout(() => \{
			        expectPortal('text-input-drop__item').toMatchSnapshot();
			        done();
			      \}, 50);
			    \});
			  \});
			
			  test('should return focus to input on select', async () => \{
			    const onSelect = jest.fn();
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-input-focus"
			          id="input-focus"
			          name="input-focus"
			          placeholder="Type to search..."
			          suggestions=\{['option0', 'option1', 'option2']\}
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			
			    const input = getByPlaceholderText('Type to search...');
			
			    expect(document.activeElement).not.toEqual(input);
			    fireEvent.focus(input);
			    expect(document.activeElement).not.toEqual(input);
			
			    const selection = await waitFor(() => screen.getByText('option1'));
			
			    fireEvent.click(selection);
			    expect(document.activeElement).toEqual(input);
			  \});
			
			  test('should return focus to ref on select', async () => \{
			    const inputRef = React.createRef<HTMLInputElement>();
			    const onSelect = jest.fn();
			    const \{ getByPlaceholderText \} = render(
			      <Grommet>
			        <TextInput
			          ref=\{inputRef\}
			          data-testid="test-input-focus"
			          id="input-focus"
			          name="input-focus"
			          placeholder="Type to search..."
			          suggestions=\{['option0', 'option1', 'option2']\}
			          onSelect=\{onSelect\}
			        />
			      </Grommet>,
			    );
			
			    const input = getByPlaceholderText('Type to search...');
			
			    expect(document.activeElement).not.toEqual(input);
			    fireEvent.focus(input);
			    expect(document.activeElement).not.toEqual(input);
			
			    const selection = await waitFor(() => screen.getByText('option2'));
			
			    fireEvent.click(selection);
			    expect(document.activeElement).toEqual(input);
			  \});
			
			  test('should not have padding when plain="full"', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextInput
			          plain="full"
			          name="name"
			          placeholder="should not have padding"
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should have padding when plain', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextInput plain name="name" placeholder="should still have padding" />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should show non-string placeholder', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="test-styled-placeholder"
			          id="styled-placeholder"
			          name="styled-placeholder"
			          placeholder=\{<Text>placeholder text</Text>\}
			        />
			      </Grommet>,
			    );
			
			    const placeholder = screen.getByText('placeholder text');
			    expect(placeholder).toBeTruthy();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('should hide non-string placeholder when having a value', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="styled-placeholder"
			          id="styled-placeholder"
			          name="styled-placeholder"
			          placeholder=\{<Text>placeholder text</Text>\}
			          value="test"
			        />
			      </Grommet>,
			    );
			
			    const placeholder = screen.queryByText('placeholder text');
			    expect(placeholder).toBeNull();
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`should only show default placeholder when placeholder is a
			  string\`, () => \{
			    const \{ container, getByTestId \} = render(
			      <Grommet>
			        <TextInput
			          data-testid="placeholder"
			          id="placeholder"
			          name="placeholder"
			          placeholder="placeholder text"
			        />
			      </Grommet>,
			    );
			
			    const placeholder = screen.queryByText('placeholder text');
			    fireEvent.change(getByTestId('placeholder'), \{
			      target: \{ value: 'something' \},
			    \});
			    expect(placeholder).toBeNull();
			    expect(container.firstChild).toMatchSnapshot();
			
			    // after value is removed, only one placeholder should be present
			    // nothing from styled placeholder should appear since placeholder
			    // is a string
			    fireEvent.change(getByTestId('placeholder'), \{ target: \{ value: '' \} \});
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('textAlign end', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextInput value="1234" textAlign="end" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom theme input font size', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{\{ global: \{ input: \{ font: \{ size: '16px' \} \} \} \}\}>
			        <TextInput />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders size', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <TextInput size="xsmall" />
			        <TextInput size="small" />
			        <TextInput size="medium" />
			        <TextInput size="large" />
			        <TextInput size="xlarge" />
			        <TextInput size="xxlarge" />
			        <TextInput size="2xl" />
			        <TextInput size="3xl" />
			        <TextInput size="4xl" />
			        <TextInput size="5xl" />
			        <TextInput size="6xl" />
			        <TextInput size="16px" />
			        <TextInput size="1rem" />
			        <TextInput size="100%" />
			      </Grommet>,
			    );
			    expect(container.children).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\TextInput\\__tests__\\TextInput-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(31)
    });
    it('grommet_grommet\\src\\js\\components\\Tip\\__tests__\\Tip-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent, waitFor \} from '@testing-library/react';
			import \{ screen \} from '@testing-library/dom';
			import \{ axe \} from 'jest-axe';
			import 'jest-styled-components';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			import userEvent from '@testing-library/user-event';
			
			import \{ Box \} from '../../Box';
			import \{ Button \} from '../../Button';
			import \{ Grommet \} from '../../Grommet';
			import \{ Tip \} from '..';
			
			describe('Tip', () => \{
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tip content="tooltip content"> Example</Tip>
			      </Grommet>,
			    );
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`mouseOver and mouseOut events on the Tip's child\`, async () => \{
			    const \{ getByText \} = render(
			      <Grommet>
			        <Tip
			          content=\{
			            <Box id="tooltip-id" data-testid="tooltip">
			              tooltip
			            </Box>
			          \}
			        >
			          Test Events
			        </Tip>
			      </Grommet>,
			    );
			
			    fireEvent.mouseOver(getByText('Test Events'));
			    const tooltip = await waitFor(() => screen.getByText('tooltip'));
			    expect(document.getElementById('tooltip-id')).not.toBeNull();
			    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();
			
			    fireEvent.mouseOut(getByText('Test Events'));
			    expect(document.getElementById('tooltip-id')).toBeNull();
			  \});
			
			  test(\`focus and blur events on the Tip's child\`, async () => \{
			    const \{ container, getByText \} = render(
			      <Grommet>
			        <Tip content="tooltip">
			          <Button label="Test Events" />
			        </Tip>
			      </Grommet>,
			    );
			
			    fireEvent.focus(getByText('Test Events'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.blur(getByText('Test Events'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('plain', async () => \{
			    const \{ getByText \} = render(
			      <Grommet>
			        <Tip plain content="tooltip">
			          Example
			        </Tip>
			      </Grommet>,
			    );
			
			    // Styles of plain are captured in snapshots only when applying mouseOver
			    fireEvent.mouseOver(getByText('Example'));
			    const tooltip = await waitFor(() => screen.getByText('tooltip'));
			    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();
			  \});
			
			  test('themed', async () => \{
			    const \{ getByText \} = render(
			      <Grommet
			        theme=\{\{
			          tip: \{
			            drop: \{
			              background: 'brand',
			              elevation: 'large',
			              margin: '21px',
			            \},
			          \},
			        \}\}
			      >
			        <Tip content="tooltip">Example</Tip>
			      </Grommet>,
			    );
			
			    fireEvent.mouseOver(getByText('Example'));
			    const tooltip = await waitFor(() => screen.getByText('tooltip'));
			    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();
			  \});
			
			  test(\`dropProps should pass props to Drop\`, async () => \{
			    const \{ getByText \} = render(
			      <Grommet>
			        <Tip
			          dropProps=\{\{
			            plain: false, // should display box-shadow
			          \}\}
			          content="hello dropProps"
			        >
			          Test dropProps
			        </Tip>
			      </Grommet>,
			    );
			
			    fireEvent.mouseOver(getByText('Test dropProps'));
			    const tooltip = await waitFor(() => screen.getByText('hello dropProps'));
			    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();
			  \});
			
			  test(\`should work with a child that isn't a React Element\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tip content="Hello">Not React Element</Tip>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`shouldn't crash with no children\`, () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <Tip />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test(\`throw error with more than one child\`, () => \{
			    console.error = jest.fn();
			    expect(() => \{
			      render(
			        <Grommet>
			          <Tip>
			            <Box>1</Box>
			            <Box>2</Box>
			          </Tip>
			        </Grommet>,
			      );
			    \}).toThrow(
			      \`React.Children.only expected to receive a single React element child.\`,
			    );
			  \});
			
			  test(\`throw error with more than one non React Element\`, () => \{
			    console.error = jest.fn();
			    expect(() => \{
			      render(
			        <Grommet>
			          <Tip>123 \{false\}</Tip>
			        </Grommet>,
			      );
			    \}).toThrow(
			      \`React.Children.only expected to receive a single React element child.\`,
			    );
			  \});
			
			  test(\`call child mouse and focus functions\`, async () => \{
			    const user = userEvent.setup();
			    const onMouseEnter = jest.fn();
			    const onMouseLeave = jest.fn();
			    const onFocus = jest.fn();
			    const onBlur = jest.fn();
			    render(
			      <Grommet>
			        <Tip content="tip info">
			          <Button
			            label="Button label"
			            onMouseEnter=\{onMouseEnter\}
			            onMouseLeave=\{onMouseLeave\}
			            onFocus=\{onFocus\}
			            onBlur=\{onBlur\}
			          />
			        </Tip>
			      </Grommet>,
			    );
			    await user.hover(screen.getByText('Button label'));
			    expect(onMouseEnter).toHaveBeenCalledTimes(1);
			    await user.unhover(screen.getByText('Button label'));
			    expect(onMouseLeave).toHaveBeenCalledTimes(1);
			    await user.tab();
			    expect(onFocus).toHaveBeenCalledTimes(1);
			    await user.tab();
			    expect(onBlur).toHaveBeenCalledTimes(1);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Tip\\__tests__\\Tip-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(11)
    });
    it('grommet_grommet\\src\\js\\components\\Video\\__tests__\\Video-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ render, fireEvent \} from '@testing-library/react';
			import \{ axe \} from 'jest-axe';
			import 'jest-axe/extend-expect';
			import 'regenerator-runtime/runtime';
			
			import \{ Grommet, Video \} from '../..';
			
			describe('Video', () => \{
			  let App;
			
			  beforeEach(() => \{
			    App = (\{ ...props \}) => (
			      <Grommet>
			        <Video \{...props\}>
			          <source key="source" src="small.mp4" type="video/mp4" />
			          <track key="track" />
			        </Video>
			      </Grommet>
			    );
			  \});
			
			  test('should have no accessibility violations', async () => \{
			    const \{ container \} = render(<App />);
			    const results = await axe(container);
			    expect(results).toHaveNoViolations();
			  \});
			
			  test('renders with theme', () => \{
			    const \{ container \} = render(
			      <Grommet
			        theme=\{\{
			          video: \{
			            controls: \{ background: '#000000' \},
			            scrubber: \{ track: \{ color: '#444444' \} \},
			          \},
			        \}\}
			      >
			        <Video>
			          <source key="source" src="small.mp4" type="video/mp4" />
			          <track key="track" />
			        </Video>
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('renders', () => \{
			    const \{ container \} = render(<App />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('autoPlay renders', () => \{
			    const \{ container \} = render(<App autoPlay />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('loop renders', () => \{
			    const \{ container \} = render(<App loop />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('mute renders', () => \{
			    const \{ container \} = render(<App mute />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controls below renders', () => \{
			    const \{ container \} = render(<App controls="below" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('controls over renders', () => \{
			    const \{ container \} = render(<App controls="over" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fit  cover renders', () => \{
			    const \{ container \} = render(<App fit="cover" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fit contain renders', () => \{
			    const \{ container \} = render(<App fit="contain" />);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('Play and Pause event handlers', () => \{
			    const onPlay = jest.fn();
			    const onPause = jest.fn();
			    const \{ container \} = render(
			      <App playing=\{false\} onPlay=\{onPlay\} onPause=\{onPause\} />,
			    );
			    const videoContainer = document.querySelector('video');
			    fireEvent.play(videoContainer);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onPlay).toHaveBeenCalled();
			    fireEvent.pause(videoContainer);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onPause).toHaveBeenCalled();
			  \});
			
			  test('mouse events handlers of controls', () => \{
			    const \{ container \} = render(<App />);
			
			    const videoContainer = document.querySelector('video');
			    fireEvent.mouseOver(videoContainer);
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.mouseMove(videoContainer);
			    expect(container.firstChild).toMatchSnapshot();
			    fireEvent.touchStart(videoContainer);
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('End event handler', () => \{
			    const onEnd = jest.fn();
			    const \{ container \} = render(<App onEnded=\{onEnd\} />);
			    // Need to fire play event to get video playing before we fire ended event.
			    const videoContainer = document.querySelector('video');
			    fireEvent.play(videoContainer);
			    fireEvent.ended(videoContainer);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onEnd).toHaveBeenCalled();
			  \});
			
			  test('Configure Menu Button', () => \{
			    window.scrollTo = jest.fn();
			    const \{ container, getByLabelText \} = render(<App />);
			    fireEvent.click(getByLabelText('open menu'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('scrubber', () => \{
			    window.scrollTo = jest.fn();
			    const \{ container, getByLabelText \} = render(<App />);
			    fireEvent.click(getByLabelText('scrubber'));
			
			    // targeting scrub function
			    fireEvent.mouseMove(getByLabelText('scrubber'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    // targeting setScrubTime
			    fireEvent.mouseLeave(getByLabelText('scrubber'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fullscreen button', () => \{
			    window.scrollTo = jest.fn();
			    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
			    const \{ getByLabelText \} = render(<App />);
			    fireEvent.click(getByLabelText('open menu'));
			    fireEvent.click(getByLabelText('full screen'));
			    /* expect warn to have been called because jest doesn't test in any browser,
			    will always have warning here due to the jest browser not supporting
			     fullscreen */
			    expect(warnSpy).toHaveBeenCalledWith(
			      "This browser doesn't support fullscreen.",
			    );
			    warnSpy.mockReset();
			    warnSpy.mockRestore();
			    window.scrollTo.mockRestore();
			  \});
			
			  test('play button', () => \{
			    const playStub = jest
			      .spyOn(window.HTMLMediaElement.prototype, 'play')
			      .mockImplementation(() => \{\});
			    const \{ getByLabelText \} = render(<App />);
			    fireEvent.click(getByLabelText('play'));
			    expect(playStub).toHaveBeenCalled();
			    playStub.mockRestore();
			  \});
			
			  test('volume controls', () => \{
			    const volMock = jest.fn();
			    window.scrollTo = jest.fn();
			    const \{ getByLabelText \} = render(<App onVolumeChange=\{volMock\} />);
			    fireEvent.click(getByLabelText('open menu'));
			    fireEvent.click(getByLabelText('volume down'));
			    expect(volMock).toHaveBeenCalled();
			    fireEvent.click(getByLabelText('volume up'));
			    expect(volMock).toHaveBeenCalledTimes(2);
			
			    window.scrollTo.mockRestore();
			  \});
			
			  test('timeUpdate event handler', () => \{
			    const onTimeUpdate = jest.fn();
			    const \{ container \} = render(<App onTimeUpdate=\{onTimeUpdate\} />);
			    const videoContainer = document.querySelector('video');
			    fireEvent.timeUpdate(videoContainer);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onTimeUpdate).toHaveBeenCalled();
			  \});
			
			  test('duration event handler', () => \{
			    const onDurationChange = jest.fn();
			    const \{ container \} = render(<App onDurationChange=\{onDurationChange\} />);
			    const videoContainer = document.querySelector('video');
			    fireEvent.durationChange(videoContainer);
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onDurationChange).toHaveBeenCalled();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\Video\\__tests__\\Video-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(20)
    });
    it('grommet_grommet\\src\\js\\components\\WorldMap\\__tests__\\WorldMap-test.tsx', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, fireEvent \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ Grommet \} from '../../Grommet';
			import \{ Text \} from '../../Text';
			import \{ WorldMap \} from '..';
			
			describe('WorldMap', () => \{
			  test('default', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <WorldMap />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('color', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <WorldMap color="brand" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('continents', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <WorldMap
			          continents=\{[
			            \{
			              name: 'Africa',
			              color: 'accent-1',
			              onClick: () => \{\},
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('places', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <WorldMap
			          places=\{[
			            \{
			              name: 'Sydney',
			              location: [-33.8830555556, 151.216666667],
			              color: 'accent-1',
			              onClick: () => \{\},
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onSelectPlace and events of places', () => \{
			    const onClick = jest.fn();
			    const onHover = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <WorldMap
			          places=\{[
			            \{
			              name: 'Sydney',
			              location: [-33.8830555556, 151.216666667],
			              onClick,
			              onHover,
			            \},
			          ]\}
			          onSelectPlace=\{() => \{\}\}
			        />
			      </Grommet>,
			    );
			    fireEvent.mouseOver(getByLabelText('Sydney'));
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onHover).toHaveBeenCalledTimes(1);
			
			    fireEvent.mouseOut(getByLabelText('Sydney'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByLabelText('Sydney'));
			    expect(onClick).toHaveBeenCalledTimes(1);
			
			    fireEvent.focus(getByLabelText('Sydney'));
			    fireEvent.blur(getByLabelText('Sydney'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('events on continents', () => \{
			    const onClick = jest.fn();
			    const onHover = jest.fn();
			    const \{ container, getByLabelText \} = render(
			      <Grommet>
			        <WorldMap
			          continents=\{[
			            \{
			              name: 'Africa',
			              onClick,
			              onHover,
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    fireEvent.mouseOver(getByLabelText('Africa'));
			    expect(container.firstChild).toMatchSnapshot();
			    expect(onHover).toHaveBeenCalledTimes(1);
			
			    fireEvent.mouseOut(getByLabelText('Africa'));
			    expect(container.firstChild).toMatchSnapshot();
			
			    fireEvent.click(getByLabelText('Africa'));
			    expect(onClick).toHaveBeenCalledTimes(1);
			
			    fireEvent.focus(getByLabelText('Africa'));
			    fireEvent.blur(getByLabelText('Africa'));
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('fill', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <WorldMap fill />
			        <WorldMap fill=\{false\} />
			        <WorldMap fill="horizontal" />
			        <WorldMap fill="vertical" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('onClick handlers', () => \{
			    const onPlaceClick = jest.fn();
			    const onContinentClick = jest.fn();
			
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <WorldMap
			          places=\{[
			            \{
			              name: 'Sydney',
			              location: [-33.8830555556, 151.216666667],
			              color: 'accent-1',
			              onClick: onPlaceClick,
			            \},
			          ]\}
			          continents=\{[
			            \{
			              name: 'Africa',
			              color: 'accent-1',
			              onClick: onContinentClick,
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    fireEvent.click(getByLabelText('Sydney'));
			    expect(onPlaceClick).toHaveBeenCalledTimes(1);
			    expect(onPlaceClick).toHaveBeenCalledWith('Sydney');
			
			    fireEvent.click(getByLabelText('Africa'));
			    expect(onContinentClick).toHaveBeenCalledTimes(1);
			    expect(onContinentClick).toHaveBeenCalledWith('Africa');
			  \});
			
			  test('onHover handlers', () => \{
			    const onPlaceHover = jest.fn();
			    const onContinentHover = jest.fn();
			
			    const \{ getByLabelText \} = render(
			      <Grommet>
			        <WorldMap
			          places=\{[
			            \{
			              name: 'Sydney',
			              location: [-33.8830555556, 151.216666667],
			              color: 'accent-1',
			              onHover: onPlaceHover,
			            \},
			          ]\}
			          continents=\{[
			            \{
			              name: 'Africa',
			              color: 'accent-1',
			              onHover: onContinentHover,
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    fireEvent.mouseEnter(getByLabelText('Sydney'));
			    expect(onPlaceHover).toHaveBeenCalledTimes(1);
			    expect(onPlaceHover).toHaveBeenCalledWith(true);
			    expect(onPlaceHover).not.toHaveBeenCalledWith(false);
			
			    fireEvent.mouseLeave(getByLabelText('Sydney'));
			    expect(onPlaceHover).toHaveBeenCalledTimes(2);
			    expect(onPlaceHover).toHaveBeenCalledWith(false);
			
			    fireEvent.mouseEnter(getByLabelText('Africa'));
			    expect(onContinentHover).toHaveBeenCalledTimes(1);
			    expect(onContinentHover).toHaveBeenCalledWith(true);
			    expect(onContinentHover).not.toHaveBeenCalledWith(false);
			
			    fireEvent.mouseLeave(getByLabelText('Africa'));
			    expect(onContinentHover).toHaveBeenCalledTimes(2);
			    expect(onContinentHover).toHaveBeenCalledWith(false);
			  \});
			
			  test('places content', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        <WorldMap
			          places=\{[
			            \{
			              name: 'Sydney',
			              location: [-33.8830555556, 151.216666667],
			              color: 'accent-1',
			              content: <Text>Sydney</Text>,
			              dropProps: \{
			                align: \{ left: 'right' \},
			                elevation: 'medium',
			                margin: \{ left: 'small' \},
			              \},
			            \},
			          ]\}
			        />
			      </Grommet>,
			    );
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\WorldMap\\__tests__\\WorldMap-test.tsx')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(10)
    });
    it('grommet_grommet\\src\\js\\components\\__tests__\\components-test.js', () => {
        const sourceCode = `
			import * as Components from '..';
			
			test('Components loads', () => \{
			  expect(Components).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\__tests__\\components-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(1)
    });
    it('grommet_grommet\\src\\js\\components\\__tests__\\FocusedContainer-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import 'jest-styled-components';
			import \{ cleanup, render, fireEvent \} from '@testing-library/react';
			
			import \{ FocusedContainer \} from '../FocusedContainer';
			
			describe('FocusedContainer', () => \{
			  test('basic', () => \{
			    jest.useFakeTimers();
			    const \{ container: trapped \} = render(
			      <div id="focus-trap-test">
			        <input id="test" />
			      </div>,
			    );
			    const \{ container: focuser \} = render(
			      <FocusedContainer id="container">
			        test focused container
			      </FocusedContainer>,
			    );
			    jest.runAllTimers();
			    expect(focuser.firstChild).toMatchSnapshot();
			    expect(trapped.firstChild).toMatchSnapshot(); // should have tabIndex="-1"
			
			    document.getElementById('test').focus();
			
			    expect(trapped.firstChild).toMatchSnapshot();
			  \});
			
			  test('restrict scroll', () => \{
			    jest.useFakeTimers();
			    const \{ container \} = render(
			      <FocusedContainer id="container" restrictScroll>
			        test focused container
			      </FocusedContainer>,
			    );
			
			    jest.runAllTimers();
			
			    expect(container.firstChild).toMatchSnapshot();
			    expect(document.body.style.overflow).toMatchSnapshot();
			
			    cleanup();
			
			    expect(document.body.style.overflow).toMatchSnapshot();
			  \});
			
			  test('blurs', () => \{
			    jest.useFakeTimers();
			    const \{ container: trapped \} = render(
			      <div id="focus-trap-test">
			        <input id="test" />
			      </div>,
			    );
			    const \{ container: focuser \} = render(
			      <FocusedContainer id="container">
			        test focused container
			      </FocusedContainer>,
			    );
			
			    jest.runAllTimers();
			
			    expect(focuser.firstChild).toMatchSnapshot();
			    expect(trapped.firstChild).toMatchSnapshot(); // should have tabIndex="-1"
			
			    fireEvent.blur(focuser);
			
			    expect(trapped.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\components\\__tests__\\FocusedContainer-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('grommet_grommet\\src\\js\\contexts\\ResponsiveContext\\__tests__\\ResponsiveContext-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render, screen \} from '@testing-library/react';
			import 'jest-styled-components';
			import 'regenerator-runtime/runtime';
			import '@testing-library/jest-dom';
			
			import \{ Grommet \} from '../../../components/Grommet';
			import \{ ResponsiveContext \} from '..';
			
			describe('ResponsiveContext', () => \{
			  describe('when viewport width is 768px', () => \{
			    beforeEach(() => \{
			      jest
			        .spyOn(document.body, 'clientWidth', 'get')
			        .mockImplementation(() => 768);
			    \});
			
			    test('should return small', () => \{
			      const \{ container \} = render(
			        <Grommet>
			          <ResponsiveContext.Consumer>
			            \{(size) => size\}
			          </ResponsiveContext.Consumer>
			        </Grommet>,
			      );
			
			      expect(screen.getByText('small')).toBeInTheDocument();
			      expect(container.firstChild).toMatchSnapshot();
			    \});
			  \});
			
			  describe('when viewport width is 1536px', () => \{
			    beforeEach(() => \{
			      jest
			        .spyOn(document.body, 'clientWidth', 'get')
			        .mockImplementation(() => 1536);
			    \});
			
			    test('should return medium', () => \{
			      const \{ container \} = render(
			        <Grommet>
			          <ResponsiveContext.Consumer>
			            \{(size) => size\}
			          </ResponsiveContext.Consumer>
			        </Grommet>,
			      );
			
			      expect(screen.getByText('medium')).toBeInTheDocument();
			      expect(container.firstChild).toMatchSnapshot();
			    \});
			  \});
			
			  describe('when viewport width is 1537px', () => \{
			    beforeEach(() => \{
			      jest
			        .spyOn(document.body, 'clientWidth', 'get')
			        .mockImplementation(() => 1537);
			    \});
			
			    test('should return large', () => \{
			      const \{ container \} = render(
			        <Grommet>
			          <ResponsiveContext.Consumer>
			            \{(size) => size\}
			          </ResponsiveContext.Consumer>
			        </Grommet>,
			      );
			
			      expect(screen.getByText('large')).toBeInTheDocument();
			      expect(container.firstChild).toMatchSnapshot();
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\contexts\\ResponsiveContext\\__tests__\\ResponsiveContext-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('grommet_grommet\\src\\js\\themes\\__tests__\\theme-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import 'jest-styled-components';
			
			import \{ hpe \} from 'grommet-theme-hpe';
			import \{ Add \} from 'grommet-icons';
			
			import \{
			  Grommet,
			  Anchor,
			  Box,
			  Button,
			  Text,
			  TextInput,
			\} from '../../components';
			import \{ ThemeContext \} from '../../contexts/ThemeContext';
			import \{ dark, grommet \} from '..';
			
			// hpe theme has deprecated the accent and neutral colors
			const hpeColors = [
			  'brand',
			  'background-contrast',
			  'background-front',
			  'control',
			  'graph-0',
			  'graph-1',
			  'graph-2',
			  'graph-3',
			  'graph-4',
			  'focus',
			  'status-critical',
			  'status-disabled',
			  'status-ok',
			  'status-unknown',
			  'status-warning',
			  'text',
			];
			
			const colors = [
			  'accent-1',
			  'accent-2',
			  'accent-3',
			  'brand',
			  'dark-1',
			  'dark-2',
			  'dark-3',
			  'dark-4',
			  'dark-5',
			  'dark-6',
			  'focus',
			  'light-1',
			  'light-2',
			  'light-3',
			  'light-4',
			  'light-5',
			  'light-6',
			  'neutral-1',
			  'neutral-2',
			  'neutral-3',
			  'status-critical',
			  'status-disabled',
			  'status-ok',
			  'status-unknown',
			  'status-warning',
			];
			
			const customTheme = \{
			  global: \{
			    input: \{
			      // test backwards compatibility that string value works for input pad
			      padding: '12px',
			      font: \{
			        height: '50px',
			        size: 'large',
			        weight: 'bold',
			      \},
			      extend: \`
			        &::-webkit-input-placeholder \{
			          font-weight: normal;
			        \}
			
			        &::-moz-placeholder \{
			          font-weight: normal;
			        \}
			
			        &:-ms-input-placeholder \{
			          font-weight: normal;
			        \}
			      \`,
			    \},
			    colors: \{
			      custom: '#cc6633',
			      placeholder: 'custom',
			    \},
			  \},
			\};
			
			describe('Grommet', () => \{
			  test('default theme', () => \{
			    const \{ container \} = render(
			      <Grommet>
			        \{colors.map((color) => (
			          <Box key=\{color\} background=\{color\}>
			            <Text>\{color\}</Text>
			          </Box>
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('grommet theme', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{grommet\}>
			        <Button label="test" />
			        <Button plain label="test" />
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('ThemeContext theme', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{grommet\}>
			        <ThemeContext.Extend
			          value=\{\{
			            global: \{
			              colors: \{
			                test: '#000',
			              \},
			            \},
			          \}\}
			        >
			          <Anchor color="test" label="Hello" />
			        </ThemeContext.Extend>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('dark theme', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{dark\}>
			        \{colors.map((color) => (
			          <Box key=\{color\} background=\{color\}>
			            <Text>\{color\}</Text>
			          </Box>
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('hpe theme', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{hpe\}>
			        \{hpeColors.map((color) => (
			          <Box key=\{color\} background=\{color\}>
			            <Text>\{color\}</Text>
			          </Box>
			        ))\}
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			
			  test('custom theme', () => \{
			    const \{ container \} = render(
			      <Grommet theme=\{customTheme\}>
			        <Box>
			          <Anchor icon=\{<Add />\} label="Add" />
			          <Anchor icon=\{<Add />\} label="Add" color="custom" />
			        </Box>
			        <Box background="dark-1">
			          <Anchor icon=\{<Add />\} label="Add" />
			          <Anchor icon=\{<Add />\} label="Add" color="custom" />
			        </Box>
			        <Box>
			          <TextInput value="Value" placeholder="Placeholder" />
			        </Box>
			      </Grommet>,
			    );
			
			    expect(container.firstChild).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\themes\\__tests__\\theme-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(6)
    });
    it('grommet_grommet\\src\\js\\utils\\__tests__\\colors-test.js', () => {
        const sourceCode = `
			import \{ colorIsDark, getRGBA \} from '..';
			
			describe('colorIsDark', () => \{
			  test('#666666', () => \{
			    const dark = colorIsDark('#666666');
			    expect(dark).toBe(true);
			  \});
			
			  test('#66666699', () => \{
			    const dark = colorIsDark('#66666699');
			    expect(dark).toBe(true);
			  \});
			
			  test('#666', () => \{
			    const dark = colorIsDark('#666');
			    expect(dark).toBe(true);
			  \});
			
			  test('rgba(102, 102, 102)', () => \{
			    const dark = colorIsDark('rgba(102, 102, 102)');
			    expect(dark).toBe(true);
			  \});
			
			  test('rgba(102, 102, 102, 0.5)', () => \{
			    const dark = colorIsDark('rgba(102, 102, 102, 0.5)');
			    expect(dark).toBe(true);
			  \});
			
			  test('#999999', () => \{
			    const dark = colorIsDark('#999999');
			    expect(dark).toBe(false);
			  \});
			
			  test('#99999999', () => \{
			    const dark = colorIsDark('#99999999');
			    expect(dark).toBe(false);
			  \});
			
			  test('#999', () => \{
			    const dark = colorIsDark('#999');
			    expect(dark).toBe(false);
			  \});
			
			  test('rgba(153, 153, 153)', () => \{
			    const dark = colorIsDark('rgba(153, 153, 153)');
			    expect(dark).toBe(false);
			  \});
			
			  test('rgba(153, 153, 153, 0.5)', () => \{
			    const dark = colorIsDark('rgba(153, 153, 153, 0.5)');
			    expect(dark).toBe(false);
			  \});
			
			  test('#FFFFFF11', () => \{
			    const dark = colorIsDark('#FFFFFF11');
			    expect(dark).toBe(undefined);
			  \});
			
			  test('#FFF1', () => \{
			    const dark = colorIsDark('#FFF1');
			    expect(dark).toBe(undefined);
			  \});
			
			  test('#11111111', () => \{
			    const dark = colorIsDark('#11111111');
			    expect(dark).toBe(undefined);
			  \});
			
			  test('rgba(102, 102, 102, 0.4)', () => \{
			    const dark = colorIsDark('rgba(102, 102, 102, 0.4)');
			    expect(dark).toBe(undefined);
			  \});
			\});
			
			describe('getRGBA', () => \{
			  test('#666666', () => \{
			    const rgba = getRGBA('#666666');
			    expect(rgba).toBe('rgba(102, 102, 102, 1)');
			  \});
			
			  test('#66666699', () => \{
			    const rgba = getRGBA('#66666699');
			    expect(rgba).toBe('rgba(102, 102, 102, 0.6)');
			  \});
			
			  test('#666666 0.4', () => \{
			    const rgba = getRGBA('#666666', 0.4);
			    expect(rgba).toBe('rgba(102, 102, 102, 0.4)');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\utils\\__tests__\\colors-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(17)
    });
    it('grommet_grommet\\src\\js\\utils\\__tests__\\mixins-test.js', () => {
        const sourceCode = `
			import \{ parseMetricToNum \} from '../mixins';
			
			afterAll(() => \{
			  jest.clearAllMocks();
			\});
			
			describe('Mixins parseMetricToNum', () => \{
			  global.console = \{
			    warn: jest.fn(),
			  \};
			
			  test('converts "12px" to 12', () => \{
			    const warn = jest.spyOn(global.console, 'warn');
			    const number = parseMetricToNum('12px');
			
			    expect(number).toBe(12);
			    expect(warn).not.toHaveBeenCalled();
			  \});
			
			  test('converts "12.5px" to 12', () => \{
			    const number = parseMetricToNum('12.5px');
			
			    expect(number).toBe(12.5);
			  \});
			
			  test('converts "12px 20px" to 12 & warns about usage', () => \{
			    const warn = jest.spyOn(global.console, 'warn');
			    const number = parseMetricToNum('12px 20px');
			
			    expect(number).toBe(12);
			    expect(warn).toHaveBeenCalledWith(
			      'Invalid single measurement value: "12px 20px"',
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\utils\\__tests__\\mixins-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('grommet_grommet\\src\\js\\utils\\__tests__\\object-test.js', () => {
        const sourceCode = `
			import \{ deepFreeze, deepMerge \} from '..';
			
			test('Object freezes', () => \{
			  const obj = deepFreeze(\{ a: 'b' \});
			
			  try \{
			    obj.a = 'c';
			    fail('cannot change object');
			  \} catch (e) \{
			    expect(e).toMatchSnapshot();
			  \}
			\});
			
			test('Object merges deep', () => \{
			  const obj = deepMerge(
			    \{
			      name: 'Someone',
			      address: \{
			        city: 'Palo Alto',
			      \},
			    \},
			    \{
			      age: '15',
			      address: \{
			        city: 'Mountain View',
			        country: 'US',
			      \},
			      profile: \{
			        username: 'someone',
			      \},
			    \},
			  );
			
			  expect(obj).toMatchSnapshot();
			\});
			
			test('Object merges deep with freezed object', () => \{
			  const obj = deepMerge(
			    deepFreeze(\{
			      name: 'Someone',
			      address: \{
			        city: 'Palo Alto',
			      \},
			    \}),
			    deepFreeze(\{
			      name: 'someone else',
			      age: '15',
			      address: \{
			        city: 'Mountain View',
			        country: 'US',
			      \},
			      profile: \{
			        username: 'someone',
			      \},
			    \}),
			  );
			
			  expect(obj).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\utils\\__tests__\\object-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(3)
    });
    it('grommet_grommet\\src\\js\\__tests__\\default-props-test.js', () => {
        const sourceCode = `
			import React from 'react';
			import \{ render \} from '@testing-library/react';
			import styled from 'styled-components';
			
			import 'jest-styled-components';
			
			import \{ grommet, defaultProps, extendDefaultTheme, Box, Grommet \} from '..';
			
			const CustomBox = styled.div\`
			  background: \$\{(props) => props.theme.global.colors.brand\};
			\`;
			CustomBox.defaultProps = \{\};
			Object.setPrototypeOf(CustomBox.defaultProps, defaultProps);
			
			test('default theme is used', () => \{
			  const \{ container \} = render(<Box background="brand" />);
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('extends default theme', () => \{
			  extendDefaultTheme(\{ global: \{ colors: \{ brand: '#ff0000' \} \} \});
			  const \{ container \} = render(<Box background="brand" />);
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('extends default theme twice', () => \{
			  extendDefaultTheme(\{ global: \{ colors: \{ brand: '#ff0000' \} \} \});
			  const \{ rerender, asFragment \} = render(<Box background="brand" />);
			
			  expect(asFragment()).toMatchSnapshot();
			
			  extendDefaultTheme(\{ global: \{ colors: \{ brand: '#0000ff' \} \} \});
			  rerender(<Box background="brand" />);
			
			  expect(asFragment()).toMatchSnapshot();
			\});
			
			test('uses Grommet theme instead of default', () => \{
			  extendDefaultTheme(\{ global: \{ colors: \{ brand: 'red' \} \} \});
			  const \{ container \} = render(
			    <Grommet theme=\{grommet\}>
			      <Box background="brand" />
			    </Grommet>,
			  );
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			
			test('leverages default theme', () => \{
			  extendDefaultTheme(\{ global: \{ colors: \{ brand: 'red' \} \} \});
			  const \{ container \} = render(<CustomBox />);
			
			  expect(container.firstChild).toMatchSnapshot();
			\});
			`

		const tests = extractFromSource(sourceCode, 'grommet_grommet\\src\\js\\__tests__\\default-props-test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
		const snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;

		expect(tests.length).toBe(5)
    });
});
