import { extractData } from './extractor';
import { ensureDirectoryCreatedAsync, extractZip, getFolderPath, readDir, tryRemoveDirectoryAsync, writeDataAsCsvToFileAsync, writeDataAsCsvToFileSafeAsync } from './fileSystem';
import { Metrics, Test } from './interfaces';
import { calculateFinitePopulationSampleSize, drawRandomNumbers } from './statistics';

async function main() 
{
	const repos = readDir('repos');
	const reposPath: string[] = repos
		.filter(dirent => dirent.isFile() && dirent.name.endsWith('.zip'))
		.map(zipFile => `repos/${zipFile.name}`)
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
		await tryRemoveDirectoryAsync(folderPath)
	}
	const metricsCsvFilePath = 'data/new_snapshot_data.csv'
	await writeDataAsCsvToFileAsync(allMetrics, metricsCsvFilePath);
	const totalSnapshotMethods = 34866 // data provided by the research paper 'An Empirical Study on the Use of Snapshot Testing'
	const zScore = 1.96 // Z-score for 95% confidence level
	const marginOfError = 5;  // Margin of error as a percentage
	const populationProportion = 0.5;  // Estimated proportion of the population
	const sampleSize = calculateFinitePopulationSampleSize(zScore, marginOfError, populationProportion, totalSnapshotMethods);
	const snapshotTests = allTests
		.filter(test => test.assertions.some(assertion => assertion.isFileSnapshot || assertion.isInlineSnapshot))
		.map((snapshotTest, index) => ({id: index + 1, repo: snapshotTest.repoName, file: snapshotTest.fileName, snippet: snapshotTest.codeSnippet, observation: "" }))
	const randomNumbers: number[] = drawRandomNumbers(snapshotTests.length, sampleSize)
	const snapshotTestsForObservation = snapshotTests.filter(st => randomNumbers.includes(st.id))
	const snapshotTestsCsvFilePath = 'data/observed_snapshot_tests.csv'
	await writeDataAsCsvToFileSafeAsync(snapshotTestsForObservation, snapshotTestsCsvFilePath);
}

main().catch(console.error)