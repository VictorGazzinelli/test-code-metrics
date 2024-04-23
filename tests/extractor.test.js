const { extractData } = require('../src/extractor');
const { ensureDirectoryCreatedAsync, extractZip, getFolderPath, tryRemoveDirectoryAsync } = require('../src/fileSystem');
const metrics = require('./fixtures/metrics.json');

describe('Metrics extraction', () => {
    const totalRepositories = metrics.length;
    let remainingRepositories = totalRepositories;
    metrics.forEach(expectedMetrics => {
        describe(`Extracting metrics for ${expectedMetrics.name}`, () => {
            let folderPath = '';

            beforeEach(async () => {
                console.log(`${remainingRepositories} of ${totalRepositories} repositories left to process.`);
                const repoPath = `repos/${expectedMetrics.name.replace(/\//g, '_')}.zip`;
                folderPath = getFolderPath(repoPath);
                await ensureDirectoryCreatedAsync(folderPath);
                await extractZip(repoPath, folderPath);
                remainingRepositories--;
            });

            it(`should correctly extract metrics for ${expectedMetrics.name}`, async () => {
                const {metrics, tests} = await extractData(folderPath)
                const normalizedActualMetrics = {
                    ...metrics,
                    testMethods: "" + metrics.testMethods,
                    snapshotTestMethods: "" + metrics.snapshotTestMethods,
                    assertions: "" + metrics.assertions,
                    snapshotAssertions: "" + metrics.snapshotAssertions,
                    hasOnlyFileST: "" + metrics.hasOnlyFileST,
                    hasOnlyInlineST: "" + metrics.hasOnlyInlineST,
                    hasBothST: "" + metrics.hasBothST,
                }
                expect(normalizedActualMetrics).toStrictEqual(expectedMetrics);
            });

            afterEach(async () => {
                if (folderPath) {
                    await tryRemoveDirectoryAsync(folderPath);
                }
            });
        });
    });
});