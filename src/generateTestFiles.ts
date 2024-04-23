import { ensureDirectoryCreatedAsync, extractZip, getFolderPath, readDir, getTestFiles, readFile, tryRemoveDirectoryAsync, writeFile } from './fileSystem';
import { extractFromSource } from './extractor'

type PathObject = { path: string, [key: string]: any };

type GroupedObjects = { [prefix: string]: PathObject[] };

function groupByPathPrefix(objects: PathObject[]): GroupedObjects 
{
    const groups = new Map<string, PathObject[]>();

    for (const obj of objects) 
    {
        const [prefix] = obj.path.split("\\");
        if (!groups.has(prefix))
            groups.set(prefix, []);
        groups.get(prefix)?.push(obj);
    }

    const groupedObjects: GroupedObjects = {};
    groups.forEach((value, key) => {
        groupedObjects[key] = value;
    });

    return groupedObjects;
}

function writeTestFiles(groupedObjects: GroupedObjects, directory: string): void 
{
    for (const key in groupedObjects) 
    {
        const fileName = `${directory}/${key}.test.js`;
        let content = `const { extractFromSource } = require('../../src/extractor');\n`;
        content += `\n`
        content += `describe('${key}', () => {\n`;
        for (const obj of groupedObjects[key]) 
        {
            content += `    it('${obj.path.replace(/\\/g, '\\\\')}', () => {\n`;
            content += `        const sourceCode = \`\n`;
            const embeddedTestSourceCode = obj.sourceCode
                .replace(/\\/g, '\\\\')
                .replace(/`/g, '\\`')
                .replace(/\$/g, '\\$')
                .replace(/{/g, '\\{')
                .replace(/}/g, '\\}')
                .split('\n')
                .map((line: string) => `\t\t\t${line}`)
                .join('\n');
            content += `${embeddedTestSourceCode}`;
            content += `\`\n`;
            content += `\n`;
            content += `\t\tconst tests = extractFromSource(sourceCode, '${obj.path.replace(/\\/g, '\\\\')}')\n`;
            content += `\t\tconst assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;\n`;
            content += `\t\tconst snapshotAssertions = tests.flatMap(test => test.assertions).filter(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot).length;\n`;
            content += `\n`;
            content += `\t\texpect(tests.length).toBe(${obj.tests.length})`;
            content += `\t\texpect(assertions).toBe(${obj.tests.flatMap((test: any) => test.assertions).filter((assertion:any) => ['expect', 'assert'].includes(assertion.identifier)).length})`;
            content += `\t\texpect(snapshotAssertions).toBe(${obj.tests.flatMap((test:any) => test.assertions).filter((assertion:any) => assertion.isFileSnapshot || assertion.isInlineSnapshot).length})`;
            content += `\n`;
            content += `    });\n`;
        }
        content += `});\n`;
        writeFile(content, fileName)
    }
}


async function main() 
{
	const repos =  readDir('repos');
    const testRepos = [
        'express-validator/express-validator',
        'poooi/poi',
        'ealush/vest',
        'roxiness/routify',
        'jupyterlab/jupyterlab-git',
        'infernojs/inferno',
        'react-hook-form/react-hook-form',
        'frontity/frontity',
        'fuse-box/fuse-box',
        'seleniumhq/selenium-ide',
        'urigo/graphql-mesh',
        'effector/effector',
        'facebook/jest',
        'jestjs/jest',
        'grommet/grommet',
        'rubylouvre/anu',
        'mattermost/mattermost-mobile',
        'grafana/grafana',
        'opensearch-project/opensearch-dashboards',
        'elastic/kibana',
    ].map(name => `repos/${name.replace('/','_')}.zip`)
    const testReposPath = repos.filter(dirent => dirent.isFile() && dirent.name.endsWith('.zip'))
        .map(zipFile => `repos/${zipFile.name}`)
        .filter(name => testRepos.includes(name))
    let allTestData: any = []
	for(const repoPath of testReposPath)
	{
		const folderPath = getFolderPath(repoPath);
		await ensureDirectoryCreatedAsync(folderPath);
		extractZip(repoPath, folderPath);
        const testFiles = getTestFiles(folderPath);
        const testData = testFiles
            .map(testFilePath => {
                const path = testFilePath;
                const sourceCode = readFile(path);
                const tests = extractFromSource(sourceCode, path)
                return {path, sourceCode, tests}
            })
            .filter(obj => obj.tests.length > 0)
        allTestData = allTestData.concat(testData);
        await tryRemoveDirectoryAsync(folderPath)
	}
    const allGroupedTestData: GroupedObjects = groupByPathPrefix(allTestData)
    const testsDirectory = 'tests/repos';
    await ensureDirectoryCreatedAsync(testsDirectory);
    writeTestFiles(allGroupedTestData, testsDirectory)
}

main().catch(console.error)