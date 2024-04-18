import { ensureDirectoryCreatedAsync, extractZip, getFolderPath, readDir, getTestFiles, readFile, tryRemoveDirectory, writeFile } from './fileSystem';
import { extractFromSource } from './extractor'

type PathObject = { path: string, [key: string]: any };
type GroupedObjects = { [prefix: string]: PathObject[] };

function groupByPathPrefix(objects: PathObject[]): GroupedObjects {
    const groups = new Map<string, PathObject[]>();

    for (const obj of objects) {
        const [prefix] = obj.path.split("\\");
        if (!groups.has(prefix)) {
            groups.set(prefix, []);
        }
        groups.get(prefix)?.push(obj);
    }

    const groupedObjects: GroupedObjects = {};
    groups.forEach((value, key) => {
        groupedObjects[key] = value;
    });

    return groupedObjects;
}

function writeTestFiles(groupedObjects: GroupedObjects, directory: string): void {
    for (const key in groupedObjects) {
        const fileName = `${directory}/${key}.test.js`;
        let content = `const { extractFromSource } = require('../../src/extractor');\n`;
        content += `\n`
        content += `describe('${key}', () => {\n`;

        for (const obj of groupedObjects[key]) {
            content += `    it('${obj.path.replace(/\\/g, '\\\\')}', () => {\n`;
            content += `        const sourceCode = \`\n`;
            const indentedAndEscapedSourceCode = obj.sourceCode
                .replace(/\\/g, '\\\\') // Escapes backslashes first to avoid escaping escape characters created in the next step
                .replace(/`/g, '\\`') // Escapes backticks
                .replace(/\$/g, '\\$') // Escapes dollar signs
                .replace(/{/g, '\\{') // Escapes opening curly braces
                .replace(/}/g, '\\}') // Escapes closing curly braces
                .split('\n')
                .map((line: string) => `\t\t\t${line}`) // Adds indentation
                .join('\n');
            content += `${indentedAndEscapedSourceCode}`;
            content += `\`\n`;
            content += `\n`;
            content += `\t\tconst tests = extractFromSource(sourceCode, '${obj.path.replace(/\\/g, '\\\\')}')\n`;
            content += `\t\tconst assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;\n`;
            content += `\n`;
            content += `\t\texpect(tests.length).toBe(${obj.tests.length})`;
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
        'rebassjs/grid',
        'nitin42/making-a-custom-react-renderer',
        'prettier/tslint-config-prettier',
        'plus1tv/react-anime',
        'reactjsresources/react-webpack-babel',
        'mateodelnorte/meta',
        'geekyants/react-native-easy-grid',
        'hyperfuse/react-anime',
        'express-validator/express-validator',
        'poooi/poi',
        'ealush/vest',
        'roxiness/routify',
        'babel/minify',
        'jupyterlab/jupyterlab-git',
        'auth0/lock',
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
        const testData = testFiles.map(testFilePath => {
            const path = testFilePath;
            const sourceCode = readFile(path);
            const tests = extractFromSource(sourceCode, path)
            return {path, sourceCode, tests}
        }).filter(obj => obj.tests.length > 0)
        allTestData = allTestData.concat(testData);
        await tryRemoveDirectory(folderPath)
	}
    const allGroupedTestData: GroupedObjects = groupByPathPrefix(allTestData)
    const testsDirectory = 'tests/repos';
    await ensureDirectoryCreatedAsync(testsDirectory);
    writeTestFiles(allGroupedTestData, testsDirectory)
}

main().catch(console.error)