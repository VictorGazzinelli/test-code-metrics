//@ts-ignore
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { getTestFiles, readFile } from "./fileSystem";
import { Data, Metrics, Test } from "./interfaces";

function getPlugins (filePath: string): any[]
{
    if(filePath.includes('kaorun343_vue-property-decorator'))
        return [
            "typescript",
            ["decorators", { decoratorsBeforeExport: true }],
            "classProperties",
            "optionalChaining",
            "vue",
            "importAssertions",
            "jsx",
            ["optionalChainingAssign", { version: "2023-07" }],
            "vue-jsx",
            "explicitResourceManagement",
        ]
    if(filePath.includes('react-grid-layout_react-resizable'))
        return [
            "jsx",
            "flow",
            "decorators-legacy",
            "classProperties",
            "explicitResourceManagement",
            "importAssertions",
            "vue-jsx",
            ["optionalChainingAssign", { version: "2023-07" }],
        ]
    return [
        "jsx",
        "typescript",
        "decorators-legacy",
        "classProperties",
        "explicitResourceManagement",
        "importAssertions",
        "vue-jsx",
        ["optionalChainingAssign", { version: "2023-07" }],
    ]
}

export function extractFromSource (sourceCode: string, filePath: string) 
{
    const testMethods: Test[] = [];
    const expectAliases: string[] = ["expect", "jestExpect", "expectComponent", "expectShallowComponent"];
    try
    {
        const ast = parser.parse(sourceCode, {
            sourceType: 'module',
            plugins: getPlugins(filePath)
        });
        let currentTest: Test | null = null;
        traverse(ast, {
            enter(path: any) 
            {
                if (path.node.type === 'CallExpression' && ['it', 'test'].includes(path.node.callee.name))
                {
                    const args = path.node.arguments.map((arg: any) => arg.value);
                    currentTest = {
                        identifier: path.node.callee.name,
                        name: args[0],
                        assertions: [],
                        repoName: filePath.split("\\")[0].replace('_','/'),
                        fileName: filePath.split("\\").pop()!,
                        startLine: path.node.loc.start.line,
                        endLine: path.node.loc.end.line,
                        codeSnippet: sourceCode.split('\n').slice(path.node.loc.start.line - 1, path.node.loc.end.line).join('\n')
                    };
                    testMethods.push(currentTest);
                }
                if (currentTest) {
                    let currentTestAssert = null;
                    // Scenario 1: Direct CallExpression without MemberExpression expect(true)
                    if (path.node.type === 'CallExpression' && expectAliases.includes(path.node.callee.name) && !path.parentPath.isMemberExpression()) {
                        currentTestAssert = {
                            identifier: path.node.callee.name,
                            isFileSnapshot: false,
                            isInlineSnapshot: false,
                        };
                    }                        
                    // Scenario 2: Handling MemberExpression specifically (original scenario) expect().toMatchSnapshot() or expect().toMatchInlineSnapshot()
                    else if (path.node.type === 'MemberExpression' && expectAliases.includes(path.node.object?.callee?.name) && !['rejects','resolves'].includes(path.node.property.name)) {
                        currentTestAssert = {
                            identifier: path.node.object?.callee?.name,
                            isFileSnapshot: path.node.property && path.node.property.type === 'Identifier' && path.node.property.name === 'toMatchSnapshot',
                            isInlineSnapshot: path.node.property && path.node.property.type === 'Identifier' && path.node.property.name === 'toMatchInlineSnapshot',
                        };
                    }
                    // Scenario 3: Handling MemberExpression with promises await expect().rejects.toMatchSnapshot() or expect().resolves.toMatchInlineSnapshot()
                    else if (path.node.type === 'MemberExpression' && expectAliases.includes(path.node.object?.callee?.name) && ['rejects','resolves'].includes(path.node.property.name) && path.parentPath?.node?.type === 'MemberExpression' && path.parentPath?.node?.property) {
                        currentTestAssert = {
                            identifier: path.node.object?.callee?.name,
                            isFileSnapshot: path.parentPath.node.property.name === 'toMatchSnapshot',
                            isInlineSnapshot: path.parentPath.node.property.name === 'toMatchInlineSnapshot',
                        };
                    }
                    // Scenario 4: Resolves or Rejects without a snapshot assertion
                    else if (path.node.type === 'AwaitExpression' && path.node.argument.type === 'MemberExpression' && ['resolves', 'rejects'].includes(path.node.argument.property.name)) {
                        currentTestAssert = {
                            identifier: path.node.argument.object?.callee?.name,
                            isFileSnapshot: false,
                            isInlineSnapshot: false,
                        };
                    }
                    // Scenario 5: Direct CallExpression for assert.equal()
                    else if (path.node.type === 'CallExpression' && path.node.callee.type === 'MemberExpression' && path.node.callee.object.name === 'assert' && path.node.callee.property.name) {
                        currentTestAssert = {
                            identifier: 'assert',
                            isFileSnapshot: false,
                            isInlineSnapshot: false,
                        };
                    }
                    else if (path.node.type === 'MemberExpression' && expectAliases.includes(path.node.object?.callee?.name) && ['rejects','resolves'].includes(path.node.property.name) && path.node.object.arguments?.length > 0 && path.node.object.arguments[0].arguments?.length > 0 && path.node.object.arguments[0].arguments[0].type == 'ArrayExpression') {
                        currentTestAssert = {
                            identifier: path.node.object?.callee?.name,
                            isFileSnapshot: false,
                            isInlineSnapshot: false,
                        };
                    }
                    if (currentTestAssert) {
                        currentTest.assertions.push(currentTestAssert);
                    }
                }
            },
            exit(path: any) 
            {
                if (path.node.type === 'CallExpression' && ['it', 'test'].includes(path.node.callee.name))
                    currentTest = null;
            },
        });
    }
    catch(error: any)
    {
        console.error("Failed to process file: " + filePath);
        console.error("Error type: " + error.name);
        console.error("Error message: " + error.message);
    }
  
    return testMethods;
};

function extractTestsFromFile(filePath: string): Test[]
{
    const sourceCode: string = readFile(filePath);
    const fileTests: Test[] = extractFromSource(sourceCode, filePath);
    
    return fileTests;
}

export function extractTestsFromFiles(filesPath: string[]): Test[]
{
    const allTests: Test[] = filesPath.flatMap((filePath: string) => {
      const tests = extractTestsFromFile(filePath);
      return tests;
    });

    return allTests;
}

export function extractData(folderPath: string): Data
{
  const name: string = folderPath.replace('_','/')
  const testFiles: string[] = getTestFiles(folderPath)
  const tests: Test[] = extractTestsFromFiles(testFiles)
  const testMethods: number = tests.length
  const snapshotTestMethods: number = tests.filter(test => test.assertions.some(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot)).length;
  const assertions: number = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;
  const snapshotAssertions: number = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;
  const hasOnlyFileST: number = +tests.every(test => test.assertions.filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).every(assertion => assertion.isFileSnapshot));
  const hasOnlyInlineST: number = +tests.every(test => test.assertions.filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).every(assertion => assertion.isInlineSnapshot));
  const hasBothST: number = +(!hasOnlyFileST && !hasOnlyInlineST);
  const metrics: Metrics = { name, testMethods, snapshotTestMethods, assertions, snapshotAssertions, hasOnlyFileST, hasOnlyInlineST, hasBothST }

  return {metrics, tests};
}