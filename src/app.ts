import { extractData } from './extractor';
import { ensureDirectoryCreatedAsync, extractZip, getFolderPath, readDir, tryRemoveDirectory, writeDataAsCsvToFileAsync, writeDataAsCsvToFileSafeAsync } from './fileSystem';
import { Metrics, Test } from './interfaces';

async function main() 
{
	const repos = readDir('repos');
	const reposPath: string[] = repos.filter(dirent => dirent.isFile() && dirent.name.endsWith('.zip')).map(zipFile => `repos/${zipFile.name}`)
	let allTests: Test[] = [];
	const allMetrics: Metrics[] = [];
	for(const repoPath of reposPath)
	{
		const folderPath = getFolderPath(repoPath);
		await ensureDirectoryCreatedAsync(folderPath);
		extractZip(repoPath, folderPath);
		const {metrics, tests} = extractData(folderPath)
		allMetrics.push(metrics)
		allTests = allTests.concat(tests);
		await tryRemoveDirectory(folderPath)
	}
	const metricsCsvFilePath = 'data/new_snapshot_data.csv'
	await writeDataAsCsvToFileAsync(allMetrics, metricsCsvFilePath);
	const snapshotTests = allTests.filter(test => test.assertions.some(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot))
		.map((snapshotTest, index) => ({id: index + 1, snippet: snapshotTest.codeSnippet, observation: "" }))
	const snapshotTestsCsvFilePath = 'data/snapshot_tests.csv'
	await writeDataAsCsvToFileSafeAsync(snapshotTests, snapshotTestsCsvFilePath);
}

main().catch(console.error)