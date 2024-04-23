export interface Metrics
{
    name: string;
    testMethods: number;
    snapshotTestMethods: number;
    assertions: number;
    snapshotAssertions: number;
    hasOnlyFileST: number;
    hasOnlyInlineST: number;
    hasBothST: number;
}

export interface Test 
{
    identifier: string;
    name: string;
    assertions: Assert[];
    repoName: string;
    fileName: string;
    startLine: number;
    endLine: number;
    codeSnippet: string;
}
 
export interface Assert 
{
    identifier: string;
    isFileSnapshot: boolean;
    isInlineSnapshot: boolean;
}

export interface Data 
{
    metrics: Metrics;
    tests: Test[];
}
