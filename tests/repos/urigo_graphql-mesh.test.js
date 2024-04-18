const { extractFromSource } = require('../../src/extractor');

describe('urigo_graphql-mesh', () => {
    it('urigo_graphql-mesh\\examples\\federation-example\\tests\\federation-example.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ join \} = require('path');
			
			const \{ mkdirSync, readFileSync, writeFileSync \} = require('fs');
			
			const problematicModulePath = join(__dirname, '../../../node_modules/core-js/features/array');
			const emptyModuleContent = 'module.exports = \{\};';
			
			const exampleQuery = readFileSync(join(__dirname, '../gateway/example-query.graphql'), 'utf8');
			
			// Fix core-js issue
			mkdirSync(problematicModulePath, \{ recursive: true \});
			writeFileSync(join(problematicModulePath, './flat.js'), emptyModuleContent);
			writeFileSync(join(problematicModulePath, './flat-map.js'), emptyModuleContent);
			
			const configAndServices\$ = Promise.all([
			  findAndParseConfig(\{
			    dir: join(__dirname, '../gateway'),
			  \}),
			  require('../services/accounts'),
			  require('../services/inventory'),
			  require('../services/products'),
			  require('../services/reviews'),
			]);
			const mesh\$ = configAndServices\$.then(([config]) => getMesh(config));
			
			describe('Federation Example', () => \{
			  it('should give correct response for example queries', async () => \{
			    const \{ execute \} = await mesh\$;
			    const result = await execute(exampleQuery);
			    expect(result?.errors).toBeFalsy();
			    expect(result?.data).toMatchSnapshot();
			  \});
			  afterAll(() => \{
			    configAndServices\$.then(([config, ...services]) => services.map(service => service.stop()));
			    mesh\$.then(mesh => mesh.destroy());
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\federation-example\\tests\\federation-example.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\examples\\graphql-file-upload-example\\test\\graphql-file-upload-example.test.js', () => {
        const sourceCode = `
			const uploadFilesServer = require('../upload-files/server');
			const resizeImageServer = require('../resize-image/server');
			const \{ File \} = require('cross-undici-fetch');
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ join \} = require('path');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			
			const mesh\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\}).then(config => getMesh(config));
			
			describe('Upload Example', () => \{
			  beforeAll(async () => \{
			    await uploadFilesServer.start();
			    await resizeImageServer.start();
			  \});
			  afterAll(async () => \{
			    await uploadFilesServer.stop();
			    await resizeImageServer.stop();
			    const mesh = await mesh\$;
			    mesh.destroy();
			  \});
			  it('should give correct response', async () => \{
			    const \{ execute \} = await mesh\$;
			    const file = new File([Buffer.from('CONTENT')], 'test.txt');
			    const result = await execute(
			      /* GraphQL */ \`
			        mutation UploadFile(\$upload: Upload!) \{
			          uploadFile(upload: \$upload) \{
			            filename
			          \}
			        \}
			      \`,
			      \{
			        upload: file,
			      \}
			    );
			    expect(result?.data?.uploadFile?.filename).toBe('test.txt');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\graphql-file-upload-example\\test\\graphql-file-upload-example.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\examples\\grpc-example\\tests\\grpc.test.js', () => {
        const sourceCode = `
			require('json-bigint-patch');
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ printSchema, lexicographicSortSchema \} = require('graphql');
			const \{ readFile \} = require('fs-extra');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			const startGrpcServer = require('../start-server');
			const grpc\$ = startGrpcServer(300);
			jest.setTimeout(15000);
			
			describe('gRPC Example', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      printSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('grpc-schema');
			  \});
			  it('should get movies correctly', async () => \{
			    const GetMoviesQuery = await readFile(join(__dirname, '../example-queries/GetMovies.query.graphql'), 'utf8');
			    const \{ execute \} = await mesh\$;
			    await grpc\$;
			    const result = await execute(GetMoviesQuery);
			    expect(result).toMatchSnapshot('get-movies-grpc-example-result');
			  \});
			  it('should fetch movies by cast as a subscription correctly', async () => \{
			    const MoviesByCastSubscription = await readFile(
			      join(__dirname, '../example-queries/MoviesByCast.subscription.graphql'),
			      'utf8'
			    );
			    const \{ subscribe \} = await mesh\$;
			    await grpc\$;
			    const result = await subscribe(MoviesByCastSubscription);
			    expect(Symbol.asyncIterator in result).toBeTruthy();
			    const resultIterator = result[Symbol.asyncIterator]();
			    expect(await resultIterator.next()).toMatchSnapshot('movies-by-cast-grpc-example-result-1');
			    expect(await resultIterator.next()).toMatchSnapshot('movies-by-cast-grpc-example-result-2');
			    await resultIterator.return();
			  \});
			  afterAll(() => \{
			    mesh\$.then(mesh => mesh.destroy());
			    grpc\$.then(grpc => grpc.forceShutdown());
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\grpc-example\\tests\\grpc.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('urigo_graphql-mesh\\examples\\hello-world\\tests\\hello-world.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ readFile \} = require('fs-extra');
			const \{ basename, join \} = require('path');
			
			const \{ introspectionFromSchema, lexicographicSortSchema \} = require('graphql');
			
			const mesh\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\}).then(config => getMesh(config));
			
			describe('Hello World', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      introspectionFromSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot();
			  \});
			  it('should give correct response', async () => \{
			    const \{ execute \} = await mesh\$;
			    const result = await execute(/* GraphQL */ \`
			      query HelloWorld \{
			        greeting
			      \}
			    \`);
			    expect(result?.errors).toBeFalsy();
			    expect(result).toMatchSnapshot();
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\hello-world\\tests\\hello-world.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\json-schema-example\\tests\\artifacts.test.ts', () => {
        const sourceCode = `
			import \{ join \} from 'path';
			import \{ fs \} from '@graphql-mesh/cross-helpers';
			
			const \{ readFile \} = fs.promises;
			
			describe('Artifacts', () => \{
			  it('should execute queries', async () => \{
			    const \{ getBuiltMesh \} = await import('../.mesh/index');
			    const \{ execute \} = await getBuiltMesh();
			    const query = await readFile(join(__dirname, '../example-query.graphql'), 'utf-8');
			    const executionResult = await execute(query, \{\});
			    expect(executionResult?.data?.me?.firstName).toBeDefined();
			    expect(executionResult?.data?.me?.jobTitle).toBeDefined();
			    expect(executionResult?.data?.me?.lastName).toBeDefined();
			    expect(executionResult?.data?.me?.company?.name).toBeDefined();
			    expect(executionResult?.data?.me?.company?.type).toBeDefined();
			    expect(executionResult?.data?.me?.company?.employers).toHaveLength(2);
			    expect(executionResult?.data?.me?.company?.employers[0]?.firstName).toBeDefined();
			    expect(executionResult?.data?.me?.company?.employers[0]?.jobTitle).toBeDefined();
			    expect(executionResult?.data?.me?.company?.employers[0]?.lastName).toBeDefined();
			  \});
			  it('should load and run SDK correctly', async () => \{
			    const \{ getMeshSDK \} = await import('../.mesh/index');
			    const meshSdk = getMeshSDK();
			    const sdkResult = await meshSdk.ExampleMeQuery();
			    expect(sdkResult?.me?.firstName).toBeDefined();
			    expect(sdkResult?.me?.jobTitle).toBeDefined();
			    expect(sdkResult?.me?.lastName).toBeDefined();
			    expect(sdkResult?.me?.company?.name).toBeDefined();
			    expect(sdkResult?.me?.company?.type).toBeDefined();
			    expect(sdkResult?.me?.company?.employers).toHaveLength(2);
			    expect(sdkResult?.me?.company?.employers?.[0]?.firstName).toBeDefined();
			    expect(sdkResult?.me?.company?.employers?.[0]?.jobTitle).toBeDefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\json-schema-example\\tests\\artifacts.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\json-schema-example\\tests\\json-schema-example.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ readFile \} = require('fs-extra');
			const \{ join \} = require('path');
			
			const \{ printSchema, lexicographicSortSchema \} = require('graphql');
			
			const mesh\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\}).then(config => getMesh(config));
			
			describe('JSON Schema Example', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      printSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot();
			  \});
			  it('should give correct response', async () => \{
			    const \{ execute \} = await mesh\$;
			    const query = await readFile(join(__dirname, '../example-query.graphql'), 'utf8');
			    const result = await execute(query);
			    expect(result?.data?.me?.firstName).toBeDefined();
			    expect(result?.data?.me?.jobTitle).toBeDefined();
			    expect(result?.data?.me?.lastName).toBeDefined();
			    expect(result?.data?.me?.company?.name).toBeDefined();
			    expect(result?.data?.me?.company?.type).toBeDefined();
			    expect(result?.data?.me?.company?.employers).toHaveLength(2);
			    expect(result?.data?.me?.company?.employers[0]?.firstName).toBeDefined();
			    expect(result?.data?.me?.company?.employers[0]?.jobTitle).toBeDefined();
			    expect(result?.data?.me?.company?.employers[0]?.lastName).toBeDefined();
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\json-schema-example\\tests\\json-schema-example.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\mongoose-example\\tests\\mongoose-example.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ introspectionFromSchema, printSchema, lexicographicSortSchema \} = require('graphql');
			const \{ loadDocuments \} = require('@graphql-tools/load');
			const \{ GraphQLFileLoader \} = require('@graphql-tools/graphql-file-loader');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('Mongoose', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(printSchema(lexicographicSortSchema(schema))).toMatchSnapshot();
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\mongoose-example\\tests\\mongoose-example.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\examples\\mysql-employees\\tests\\mysql-employees.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ printSchema, lexicographicSortSchema \} = require('graphql');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('MySQL Employees', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      printSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('mysql-employees-schema');
			  \});
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    for (const source of documents) \{
			      const result = await execute(source.document);
			      expect(result).toMatchSnapshot(basename(source.location) + '-query-result');
			    \}
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\mysql-employees\\tests\\mysql-employees.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\mysql-rfam\\tests\\mysql-rfam.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ introspectionFromSchema, lexicographicSortSchema \} = require('graphql');
			
			describe.skip('MySQL Rfam', () => \{
			  jest.setTimeout(30000);
			  let config\$, mesh\$;
			  beforeAll(() => \{
			    config\$ = findAndParseConfig(\{
			      dir: join(__dirname, '..'),
			    \});
			    config\$.then(config => getMesh(config));
			  \});
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      introspectionFromSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('mysql-rfam-schema');
			  \});
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    for (const source of documents) \{
			      const result = await execute(source.document);
			      expect(result).toMatchSnapshot(basename(source.location) + '-query-result');
			    \}
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\mysql-rfam\\tests\\mysql-rfam.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\neo4j-example\\tests\\neo4j-example.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ printSchema, lexicographicSortSchema \} = require('graphql');
			
			describe.skip('Neo4j', () => \{
			  let config\$, mesh\$;
			  beforeAll(() => \{
			    config\$ = findAndParseConfig(\{
			      dir: join(__dirname, '..'),
			    \});
			    mesh\$ = config\$.then(config => getMesh(config));
			  \});
			  jest.setTimeout(30000);
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(printSchema(lexicographicSortSchema(schema))).toMatchSnapshot();
			  \});
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    for (const source of documents) \{
			      const result = await execute(source.document);
			      expect(result).toMatchSnapshot(basename(source.location) + '-query-result');
			    \}
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\neo4j-example\\tests\\neo4j-example.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\odata-trippin\\tests\\odata-trippin.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ introspectionFromSchema, lexicographicSortSchema \} = require('graphql');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(15000);
			
			describe('OData TripPin', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      introspectionFromSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('odata-trippin-schema');
			  \});
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    for (const source of documents) \{
			      const result = await execute(source.document);
			      expect(result).toMatchSnapshot(basename(source.location) + '-query-result');
			    \}
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\odata-trippin\\tests\\odata-trippin.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\openapi-javascript-wiki\\tests\\javascript-wiki.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ introspectionFromSchema, lexicographicSortSchema \} = require('graphql');
			const \{ readFile \} = require('fs-extra');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(15000);
			
			describe('JavaScript Wiki', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      introspectionFromSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('javascript-wiki-schema');
			  \});
			  it('should give correct response for viewsInPastMonth', async () => \{
			    const viewsInPastMonthQuery = await readFile(
			      join(__dirname, '../example-queries/views-in-past-month.graphql'),
			      'utf8'
			    );
			    const \{ execute \} = await mesh\$;
			    const result = await execute(viewsInPastMonthQuery);
			    expect(result.errors).toBeFalsy();
			    expect(typeof result?.data?.viewsInPastMonth).toBe('number');
			  \});
			  it('should give correct response for wikipediaMetrics within specific range', async () => \{
			    const wikipediaMetricsQuery = await readFile(
			      join(__dirname, '../example-queries/wikipedia-metrics.graphql'),
			      'utf8'
			    );
			    const \{ execute \} = await mesh\$;
			    const result = await execute(wikipediaMetricsQuery);
			    expect(result).toMatchSnapshot('wikipedia-metrics-result');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\openapi-javascript-wiki\\tests\\javascript-wiki.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('urigo_graphql-mesh\\examples\\openapi-location-weather\\tests\\location-weather.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ introspectionFromSchema, lexicographicSortSchema \} = require('graphql');
			const \{ readFile \} = require('fs-extra');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('Location Weather', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      introspectionFromSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('location-weather-schema');
			  \});
			  it.skip('should give correct response for todayForecast', async () => \{
			    const todayForecastQuery = await readFile(join(__dirname, '../example-query.graphql'), 'utf8');
			    const \{ execute \} = await mesh\$;
			    const result = await execute(todayForecastQuery);
			    console.log(result.errors[0]);
			    expect(result.errors).toBeFalsy();
			    expect(result?.data?.findCitiesUsingGET?.data?.length).toBeGreaterThan(0);
			    const found = result.data.findCitiesUsingGET.data[0];
			    expect(found.name).toBe('Istanbul');
			    // expect(typeof found.todayForecast?.maxTemp).toBe('number');
			    // expect(typeof found.todayForecast?.minTemp).toBe('number');
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\openapi-location-weather\\tests\\location-weather.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\examples\\postgres-geodb\\test\\test.ts', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ printSchema, lexicographicSortSchema \} = require('graphql');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('PostgresGeoDB', () => \{
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    const result = await execute(documents[0].document);
			    expect(result?.data?.allCities?.nodes?.[0]?.countrycode).toBeTruthy();
			    expect(result?.data?.allCities?.nodes?.[0]?.developers?.[0]?.login).toBeTruthy();
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\postgres-geodb\\test\\test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\examples\\soap-demo\\tests\\soap-demo.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ lexicographicSortSchema \} = require('graphql');
			const \{ MeshStore, InMemoryStoreStorageAdapter \} = require('@graphql-mesh/store');
			const \{ printSchemaWithDirectives \} = require('@graphql-tools/utils');
			
			const store = new MeshStore('soap', new InMemoryStoreStorageAdapter(), \{
			  readonly: false,
			  validate: false,
			\});
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			  store,
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('SOAP Country Info', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(printSchemaWithDirectives(lexicographicSortSchema(schema))).toMatchSnapshot('soap-demo-schema');
			  \});
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    for (const source of documents) \{
			      const result = await execute(source.document);
			      expect(result).toMatchSnapshot(basename(source.location) + '-soap-demo-result');
			    \}
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\soap-demo\\tests\\soap-demo.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\sqlite-chinook\\tests\\sqlite-chinook.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ introspectionFromSchema, lexicographicSortSchema, printSchema \} = require('graphql');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('SQLite Chinook', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      introspectionFromSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('sqlite-chinook-schema');
			  \});
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    for (const source of documents) \{
			      const result = await execute(source.document);
			      expect(result).toMatchSnapshot(basename(source.location) + '-sqlite-chinook-result');
			    \}
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\sqlite-chinook\\tests\\sqlite-chinook.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\thrift-calculator\\tests\\thrift-calculator.test.ts', () => {
        const sourceCode = `
			import \{ findAndParseConfig \} from '@graphql-mesh/cli';
			import \{ getMesh \} from '@graphql-mesh/runtime';
			import \{ basename, join \} from 'path';
			import \{ introspectionFromSchema, lexicographicSortSchema \} from 'graphql';
			import \{ loadDocuments \} from '@graphql-tools/load';
			import \{ GraphQLFileLoader \} from '@graphql-tools/graphql-file-loader';
			import thriftServer from '../src/main';
			import \{ mkdirSync, writeFileSync \} from 'fs';
			
			const problematicModulePath = join(__dirname, '../../../node_modules/core-js/modules');
			const emptyModuleContent = 'module.exports = \{\};';
			
			// Fix core-js issue
			mkdirSync(problematicModulePath, \{ recursive: true \});
			writeFileSync(join(problematicModulePath, './es.array.join.js'), emptyModuleContent);
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('Thrift Calculator', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      introspectionFromSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('thrift-calculator-schema');
			  \});
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    for (const source of documents) \{
			      const result = await execute(source.document, \{\});
			      expect(result.errors).toBeFalsy();
			      expect(result).toMatchSnapshot(basename(source.location) + '-thrift-calculator-result');
			    \}
			  \});
			  afterAll(() => \{
			    mesh\$.then(mesh => mesh.destroy());
			    thriftServer.close();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\thrift-calculator\\tests\\thrift-calculator.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\examples\\type-merging-batching-example\\tests\\type-merging-batching-example.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ basename, join \} = require('path');
			
			const \{ lexicographicSortSchema \} = require('graphql');
			const \{ loadDocuments \} = require('@graphql-tools/load');
			const \{ GraphQLFileLoader \} = require('@graphql-tools/graphql-file-loader');
			const \{ printSchemaWithDirectives \} = require('@graphql-tools/utils');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('Type Merging and Batching Example', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(printSchemaWithDirectives(lexicographicSortSchema(schema))).toMatchSnapshot();
			  \});
			  it('should give correct response for example queries', async () => \{
			    const \{ documents \} = await config\$;
			    const \{ execute \} = await mesh\$;
			    for (const source of documents) \{
			      const result = await execute(source.document);
			      expect(result).toMatchSnapshot(basename(source.location) + '-query-result');
			    \}
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\examples\\type-merging-batching-example\\tests\\type-merging-batching-example.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\apollo-link\\test\\apollo-link.test.ts', () => {
        const sourceCode = `
			import \{ ApolloClient, FetchResult, InMemoryCache \} from '@apollo/client/core';
			import \{ MeshInstance \} from '@graphql-mesh/runtime';
			import \{ MeshApolloLink \} from '../src';
			import \{ getTestMesh \} from '../../testing/getTestMesh';
			import \{ parse \} from 'graphql';
			import \{ observableToAsyncIterable \} from '@graphql-tools/utils';
			
			describe('GraphApolloLink', () => \{
			  let client: ApolloClient<any>;
			  let mesh: MeshInstance;
			  beforeEach(async () => \{
			    mesh = await getTestMesh();
			    client = new ApolloClient(\{
			      link: new MeshApolloLink(mesh),
			      cache: new InMemoryCache(),
			    \});
			  \});
			  afterEach(() => \{
			    mesh?.destroy();
			  \});
			  it('should handle queries correctly', async () => \{
			    const result = await client.query(\{
			      query: parse(/* GraphQL */ \`
			        query Greetings \{
			          greetings
			        \}
			      \`),
			    \});
			    expect(result.error).toBeUndefined();
			    expect(result.errors?.length).toBeFalsy();
			    expect(result.data).toEqual(\{
			      greetings: 'This is the \`greetings\` field of the root \`Query\` type',
			    \});
			  \});
			  it('should handle subscriptions correctly', async () => \{
			    const observable = client.subscribe(\{
			      query: parse(/* GraphQL */ \`
			        subscription Time \{
			          time
			        \}
			      \`),
			    \});
			    const asyncIterable =
			      observableToAsyncIterable<FetchResult<any, Record<string, any>, Record<string, any>>>(observable);
			    let i = 0;
			    for await (const result of asyncIterable) \{
			      i++;
			      if (i === 2) \{
			        break;
			      \}
			      expect(result.errors?.length).toBeFalsy();
			      const date = new Date(result?.data?.time);
			      expect(date.getFullYear()).toBe(new Date().getFullYear());
			    \}
			    expect(i).toBe(2);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\apollo-link\\test\\apollo-link.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\cache\\file\\test\\cache.spec.ts', () => {
        const sourceCode = `
			describe('file', () => \{
			  it('dummy', async () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\cache\\file\\test\\cache.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\cache\\localforage\\test\\cache.spec.ts', () => {
        const sourceCode = `
			describe('localforage', () => \{
			  it('dummy', async () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\cache\\localforage\\test\\cache.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\cache\\redis\\test\\cache.spec.ts', () => {
        const sourceCode = `
			/* eslint-disable no-new */
			import RedisCache from '../src';
			import Redis from 'ioredis';
			import \{ PubSub \} from '@graphql-mesh/utils';
			
			jest.mock('ioredis');
			
			describe('redis', () => \{
			  beforeEach(() => jest.clearAllMocks());
			  const pubsub = new PubSub();
			
			  describe('constructor', () => \{
			    it('never call Redis constructor if no config is provided', async () => \{
			      new RedisCache(\{ pubsub \});
			
			      expect(Redis).toHaveBeenCalledTimes(0);
			    \});
			
			    it('passes configuration to redis client with default options, url case', async () => \{
			      new RedisCache(\{ url: 'redis://password@localhost:6379', pubsub \});
			
			      expect(Redis).toHaveBeenCalledWith(
			        'redis://password@localhost:6379?lazyConnect=true&enableAutoPipelining=true&enableOfflineQueue=true'
			      );
			    \});
			
			    it('passes configuration to redis client with default options, host, port & password case', async () => \{
			      new RedisCache(\{ port: '6379', password: 'testpassword', host: 'localhost', pubsub \});
			
			      expect(Redis).toHaveBeenCalledWith(\{
			        enableAutoPipelining: true,
			        enableOfflineQueue: true,
			        host: 'localhost',
			        lazyConnect: true,
			        password: 'testpassword',
			        port: 6379,
			      \});
			    \});
			
			    it('prefers url over specific properties if both given', () => \{
			      new RedisCache(\{ url: 'redis://localhost:6379', host: 'ignoreme', port: '9999', pubsub \});
			
			      expect(Redis).toHaveBeenCalledWith(
			        'redis://localhost:6379?lazyConnect=true&enableAutoPipelining=true&enableOfflineQueue=true'
			      );
			    \});
			
			    it.each(['http://', 'https://', 'ftp://', null, undefined])(
			      'throws an error if protocol does not match [%s]',
			      protocol => \{
			        expect(() => \{
			          new RedisCache(\{ url: \`\$\{protocol\}localhost:6379\`, pubsub \});
			        \}).toThrowError('Redis URL must use either redis:// or rediss://');
			      \}
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\cache\\redis\\test\\cache.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\cli\\test\\cli.spec.ts', () => {
        const sourceCode = `
			describe('runtime', () => \{
			  it('dummy', async () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\cli\\test\\cli.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\graphql\\test\\handler.spec.ts', () => {
        const sourceCode = `
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import GraphQLHandler from '../src';
			import \{ PubSub, defaultImportFn, DefaultLogger \} from '@graphql-mesh/utils';
			import \{ promises as fsPromises \} from 'fs';
			import \{ join \} from 'path';
			import \{ buildASTSchema, buildSchema, introspectionFromSchema \} from 'graphql';
			import \{ InMemoryStoreStorageAdapter, MeshStore \} from '@graphql-mesh/store';
			
			const \{ readFile \} = fsPromises;
			
			const logger = new DefaultLogger('tests');
			
			describe('graphql', () => \{
			  it('handle SDL files correctly as endpoint', async () => \{
			    const sdlFilePath = './fixtures/schema.graphql';
			    const store = new MeshStore('.mesh', new InMemoryStoreStorageAdapter(), \{
			      readonly: false,
			      validate: false,
			    \});
			    const handler = new GraphQLHandler(\{
			      name: 'SDLSchema',
			      config: \{
			        schema: sdlFilePath,
			      \},
			      baseDir: __dirname,
			      cache: new InMemoryLRUCache(),
			      pubsub: new PubSub(),
			      store,
			      importFn: defaultImportFn,
			      logger,
			    \});
			    const absoluteFilePath = join(__dirname, sdlFilePath);
			    const schemaStringFromFile = await readFile(absoluteFilePath, 'utf-8');
			    const schemaFromFile = buildSchema(schemaStringFromFile);
			    const \{ schema: schemaFromHandler \} = await handler.getMeshSource();
			    expect(introspectionFromSchema(schemaFromHandler)).toStrictEqual(introspectionFromSchema(schemaFromFile));
			  \});
			  it('handle code files exports GraphQLSchema correctly', async () => \{
			    const schemaFilePath = './fixtures/schema.js';
			    const store = new MeshStore('.mesh', new InMemoryStoreStorageAdapter(), \{
			      readonly: false,
			      validate: false,
			    \});
			    const handler = new GraphQLHandler(\{
			      name: 'SDLSchema',
			      config: \{
			        schema: schemaFilePath,
			      \},
			      baseDir: __dirname,
			      cache: new InMemoryLRUCache(),
			      pubsub: new PubSub(),
			      store,
			      importFn: defaultImportFn,
			      logger,
			    \});
			    const absoluteFilePath = join(__dirname, schemaFilePath);
			    const schemaFromFile = require(absoluteFilePath);
			    const \{ schema: schemaFromHandler \} = await handler.getMeshSource();
			    expect(introspectionFromSchema(schemaFromHandler)).toStrictEqual(introspectionFromSchema(schemaFromFile));
			  \});
			  it('handle code files exports DocumentNode correctly', async () => \{
			    const schemaFilePath = './fixtures/schema-document.js';
			    const store = new MeshStore('.mesh', new InMemoryStoreStorageAdapter(), \{
			      readonly: false,
			      validate: false,
			    \});
			    const handler = new GraphQLHandler(\{
			      name: 'SDLSchema',
			      config: \{
			        schema: schemaFilePath,
			      \},
			      baseDir: __dirname,
			      cache: new InMemoryLRUCache(),
			      pubsub: new PubSub(),
			      store,
			      importFn: defaultImportFn,
			      logger,
			    \});
			    const absoluteFilePath = join(__dirname, schemaFilePath);
			    const schemaDocumentFromFile = require(absoluteFilePath);
			    const schemaFromFile = buildASTSchema(schemaDocumentFromFile);
			    const \{ schema: schemaFromHandler \} = await handler.getMeshSource();
			    expect(introspectionFromSchema(schemaFromHandler)).toStrictEqual(introspectionFromSchema(schemaFromFile));
			  \});
			  it('handle code files exports string correctly', async () => \{
			    const schemaFilePath = './fixtures/schema-str.js';
			    const store = new MeshStore('.mesh', new InMemoryStoreStorageAdapter(), \{
			      readonly: false,
			      validate: false,
			    \});
			    const handler = new GraphQLHandler(\{
			      name: 'SDLSchema',
			      config: \{
			        schema: schemaFilePath,
			      \},
			      baseDir: __dirname,
			      cache: new InMemoryLRUCache(),
			      pubsub: new PubSub(),
			      store,
			      importFn: defaultImportFn,
			      logger,
			    \});
			    const absoluteFilePath = join(__dirname, schemaFilePath);
			    const schemaStringFromFile = require(absoluteFilePath);
			    const schemaFromFile = buildSchema(schemaStringFromFile);
			    const \{ schema: schemaFromHandler \} = await handler.getMeshSource();
			    expect(introspectionFromSchema(schemaFromHandler)).toStrictEqual(introspectionFromSchema(schemaFromFile));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\graphql\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\grpc\\test\\handler.spec.ts', () => {
        const sourceCode = `
			import \{ join \} from 'path';
			import \{ GraphQLSchema, printSchema, validateSchema \} from 'graphql';
			
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import GrpcHandler from '../src';
			import \{ InMemoryStoreStorageAdapter, MeshStore \} from '@graphql-mesh/store';
			import \{ DefaultLogger \} from '@graphql-mesh/utils';
			import type \{ YamlConfig \} from '@graphql-mesh/types';
			
			describe.each<[string, string]>([
			  ['Movie', 'movie.proto'],
			  ['Empty', 'empty.proto'],
			  ['Nested', 'nested.proto'],
			  ['Import Nested', 'import-nested.proto'],
			  ['With All Values', 'allvalues.proto'],
			  ['No Package Nested', 'nopackage-nested.proto'],
			  ['With Underscores', 'underscores.proto'],
			  ['Outside', 'outside.proto'],
			  ['Custom Message', 'custom-message.proto'],
			  ['Custom Message2', 'custom-message-2.proto'],
			  ['Comments', 'comments.proto'],
			])('Interpreting Protos', (name, file) => \{
			  test(\`should load the \$\{name\} proto\`, async () => \{
			    const cache = new InMemoryLRUCache();
			    const pubsub = new PubSub();
			    const config: YamlConfig.GrpcHandler = \{
			      endpoint: 'localhost',
			      protoFilePath: \{
			        file: join(__dirname, './fixtures/proto-tests', file),
			        load: \{ includeDirs: [join(__dirname, './fixtures/proto-tests')] \},
			      \},
			    \};
			    const store = new MeshStore(name, new InMemoryStoreStorageAdapter(), \{
			      readonly: false,
			      validate: false,
			    \});
			    const logger = new DefaultLogger(name);
			    const handler = new GrpcHandler(\{
			      name: Date.now().toString(),
			      config,
			      cache,
			      pubsub,
			      store,
			      logger,
			      importFn: m => import(m),
			      baseDir: __dirname,
			    \});
			
			    const \{ schema \} = await handler.getMeshSource();
			
			    expect(schema).toBeInstanceOf(GraphQLSchema);
			    expect(validateSchema(schema)).toHaveLength(0);
			    expect(printSchema(schema)).toMatchSnapshot();
			  \});
			\});
			
			describe('Load proto with prefixQueryMethod', () => \{
			  test(\`should load the retrieve-movie.proto\`, async () => \{
			    const name = 'retrieve-movie';
			    const file = 'retrieve-movie.proto';
			
			    const cache = new InMemoryLRUCache();
			    const pubsub = new PubSub();
			    const config: YamlConfig.GrpcHandler = \{
			      endpoint: 'localhost',
			      protoFilePath: \{
			        file: join(__dirname, './fixtures/proto-tests', file),
			        load: \{ includeDirs: [join(__dirname, './fixtures/proto-tests')] \},
			      \},
			      prefixQueryMethod: ['get', 'list', 'retrieve'],
			    \};
			    const store = new MeshStore(name, new InMemoryStoreStorageAdapter(), \{
			      readonly: false,
			      validate: false,
			    \});
			    const logger = new DefaultLogger(name);
			    const handler = new GrpcHandler(\{
			      name: Date.now().toString(),
			      config,
			      cache,
			      pubsub,
			      store,
			      logger,
			      importFn: m => import(m),
			      baseDir: __dirname,
			    \});
			
			    const \{ schema \} = await handler.getMeshSource();
			
			    expect(schema).toBeInstanceOf(GraphQLSchema);
			    expect(validateSchema(schema)).toHaveLength(0);
			    expect(printSchema(schema)).toContain('AnotherExample_RetrieveMovies');
			    expect(printSchema(schema)).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\grpc\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\grpc\\test\\scalars.spec.ts', () => {
        const sourceCode = `
			import \{ getGraphQLScalar, isScalarType \} from '../src/scalars';
			
			describe.each<[string, string]>([
			  ['bool', 'Boolean'],
			  ['bytes', 'Byte'],
			  ['double', 'Float'],
			  ['fixed32', 'Int'],
			  ['fixed64', 'BigInt'],
			  ['float', 'Float'],
			  ['int32', 'Int'],
			  ['int64', 'BigInt'],
			  ['sfixed32', 'Int'],
			  ['sfixed64', 'BigInt'],
			  ['sint32', 'Int'],
			  ['sint64', 'BigInt'],
			  ['string', 'String'],
			  ['uint32', 'UnsignedInt'],
			  ['uint64', 'BigInt'],
			])('Valid Scalars', (scalarType, scalarGqlType) => \{
			  test(\`getGraphQLScalar should return the proper graphql scalar for \$\{scalarType\}\`, () => \{
			    expect(getGraphQLScalar(scalarType)).toBe(scalarGqlType);
			  \});
			  test(\`isScalarType should return true for \$\{scalarType\}\`, () => \{
			    expect(isScalarType(scalarType)).toBe(true);
			  \});
			\});
			
			describe('Invalid Scalars', () => \{
			  test('getGraphQLScalar should throw an error', () => \{
			    expect(() => getGraphQLScalar('randomType')).toThrow(/Could not find GraphQL Scalar for type/);
			  \});
			  test('isScalarType should return false for none scalars', () => \{
			    expect(isScalarType('randomType')).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\grpc\\test\\scalars.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\grpc\\test\\utils.spec.ts', () => {
        const sourceCode = `
			/* eslint-disable @typescript-eslint/no-floating-promises */
			import \{ Metadata \} from '@grpc/grpc-js';
			
			import \{ addMetaDataToCall \} from '../src/utils';
			
			describe('grpc utils', () => \{
			  describe('addMetaDataToCall', () => \{
			    const grpcClientMethod = jest.fn();
			    const input = \{ sport: 'Baseball' \};
			    const context = \{ team: 'Oakland As', players: \{ pitcher: 'Kershaw' \}, number: 42 \};
			    const binarySportsTeam = Buffer.from([68, 111, 100, 103, 101, 114, 115, 32, 82, 117, 108, 101, 33]);
			    const binaryPlayer = Buffer.from([75, 101, 114, 115, 104, 97, 119]);
			
			    function createExpectedMetadata(key: string, value: string | Buffer): Metadata \{
			      const meta = new Metadata();
			      meta.add(key, value);
			
			      return meta;
			    \}
			
			    test(\`when no metadata is supplied by the config\`, () => \{
			      addMetaDataToCall(grpcClientMethod, input, context, undefined);
			      expect(grpcClientMethod).toHaveBeenCalledWith(input, expect.any(Function));
			    \});
			
			    describe.each<[string, Record<string, string | Buffer | string[]>, Metadata]>([
			      ['static', \{ sportsTeam: 'Dodgers' \}, createExpectedMetadata('sportsTeam', 'Dodgers')],
			      ['static all lowercase', \{ sportsteam: 'Dodgers' \}, createExpectedMetadata('sportsteam', 'Dodgers')],
			      ['dynamic', \{ bestPlayer: ['players', 'pitcher'] \}, createExpectedMetadata('bestplayer', 'Kershaw')],
			      ['dynamic number', \{ jerseyNumber: ['number'] \}, createExpectedMetadata('jerseynumber', '42')],
			      [
			        'dynamic underscore key',
			        \{ best_player: ['players', 'pitcher'] \},
			        createExpectedMetadata('best_player', 'Kershaw'),
			      ],
			      [
			        'static binary',
			        \{ 'sportsTeam-bin': binarySportsTeam \},
			        createExpectedMetadata('sportsTeam-bin', binarySportsTeam),
			      ],
			      ['dynamic binary', \{ 'bestPlayer-bin': binaryPlayer \}, createExpectedMetadata('bestPlayer-bin', binaryPlayer)],
			    ])('should generate gRPC Metadata', (type, config, expectedMetadata) => \{
			      beforeEach(() => \{
			        grpcClientMethod.mockClear();
			      \});
			
			      test(\`when \$\{type\} metadata is supplied by the config\`, () => \{
			        addMetaDataToCall(grpcClientMethod, input, context, config);
			        expect(grpcClientMethod).toHaveBeenCalledWith(input, expectedMetadata, expect.any(Function));
			      \});
			    \});
			
			    describe.each<[string, Record<string, string | Buffer | string[]>]>([
			      ['static binary', \{ sportsTeam: binarySportsTeam \}],
			      ['dynamic binary', \{ bestPlayer: binaryPlayer \}],
			    ])('should throw errors when generating gRPC Metadata', (type, config) => \{
			      test(\`when \$\{type\} metadata is supplied by the config\`, () => \{
			        expect(() => addMetaDataToCall(grpcClientMethod, input, context, config)).toThrow(
			          /keys that don't end with '-bin' must have String values/
			        );
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\grpc\\test\\utils.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\mongoose\\test\\handler.spec.ts', () => {
        const sourceCode = `
			describe('mongoose', () => \{
			  it('dummy', async () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\mongoose\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\mysql\\test\\handler.spec.ts', () => {
        const sourceCode = `
			describe('mysql', () => \{
			  it('dummy', () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\mysql\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\neo4j\\test\\handler.spec.ts', () => {
        const sourceCode = `
			describe('neo4j', () => \{
			  it('dummy', async () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\neo4j\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\odata\\test\\handler.spec.ts', () => {
        const sourceCode = `
			import \{ MeshPubSub, KeyValueCache, Logger \} from '@graphql-mesh/types';
			import \{ printSchema, GraphQLInterfaceType, parse, ExecutionResult \} from 'graphql';
			// eslint-disable-next-line import/no-extraneous-dependencies
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ addMock, resetMocks, MockResponse as Response, mockFetch \} from './custom-fetch';
			import \{ path, fs \} from '@graphql-mesh/cross-helpers';
			import \{ PubSub, DefaultLogger \} from '@graphql-mesh/utils';
			import ODataHandler from '../src';
			import \{ InMemoryStoreStorageAdapter, MeshStore \} from '@graphql-mesh/store';
			
			const TripPinMetadata = fs.readFileSync(path.resolve(__dirname, './fixtures/trippin-metadata.xml'), 'utf8');
			const PersonMockData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './fixtures/russellwhyte.json'), 'utf-8'));
			const TripMockData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './fixtures/trip.json'), 'utf-8'));
			const BasicMetadata = fs.readFileSync(path.resolve(__dirname, './fixtures/simple-metadata.xml'), 'utf-8');
			
			const baseDir = __dirname;
			const importFn = (id: string) => require(id);
			
			describe('odata', () => \{
			  let pubsub: MeshPubSub;
			  let cache: KeyValueCache;
			  let store: MeshStore;
			  let logger: Logger;
			  beforeEach(() => \{
			    pubsub = new PubSub();
			    cache = new InMemoryLRUCache();
			    store = new MeshStore('odata', new InMemoryStoreStorageAdapter(), \{
			      readonly: false,
			      validate: false,
			    \});
			    logger = new DefaultLogger('ODataTest');
			    resetMocks();
			  \});
			  it('should create a GraphQL schema from a simple OData endpoint', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			    expect(printSchema(source.schema)).toMatchSnapshot();
			  \});
			  it('should create correct GraphQL schema for functions with entity set paths', async () => \{
			    addMock('http://sample.service.com/\$metadata', async () => new Response(BasicMetadata));
			    const handler = new ODataHandler(\{
			      name: 'SampleService',
			      config: \{
			        baseUrl: 'http://sample.service.com',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			    expect(printSchema(source.schema)).toMatchSnapshot();
			  \});
			  it('should declare arguments for fields created from bound functions', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			    const personType = source.schema.getType('IPerson') as GraphQLInterfaceType;
			    const getFriendsTripsFunction = personType.getFields().GetFriendsTrips;
			    expect(getFriendsTripsFunction.args).toHaveLength(2);
			    const personArg = getFriendsTripsFunction.args.find(arg => arg.name === 'person');
			    expect(personArg).not.toBeFalsy();
			    expect(personArg.type.toString()).toBe('PersonInput');
			    const userNameArg = getFriendsTripsFunction.args.find(arg => arg.name === 'userName');
			    expect(userNameArg).not.toBeFalsy();
			    expect(userNameArg.type.toString()).toBe('String!');
			  \});
			  it('should generate correct HTTP request for requesting an EntitySet', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = 'https://services.odata.org/TripPinRESTierService/People';
			    const correctMethod = 'GET';
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(JSON.stringify(\{ value: [PersonMockData] \}));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        \{
			          People \{
			            UserName
			            FirstName
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			  \});
			  it('should generate correct HTTP request for requesting a single Entity by ID', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People/SOMEID/\`;
			    const correctMethod = 'GET';
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(JSON.stringify(PersonMockData));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        \{
			          PeopleByUserName(UserName: "SOMEID") \{
			            UserName
			            FirstName
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			  \});
			  it('should generate correct HTTP request for requesting a complex property', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/Airports/KSFO/?\$select=IcaoCode,Location\`;
			    const correctMethod = 'GET';
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(
			        JSON.stringify(\{
			          '@odata.type': 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airport',
			          IcaoCode: Date.now().toString(),
			          Location: \{
			            '@odata.type': 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.AirportLocation',
			            Loc: '',
			          \},
			        \})
			      );
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        \{
			          AirportsByIcaoCode(IcaoCode: "KSFO") \{
			            IcaoCode
			            Location \{
			              Loc
			            \}
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			  \});
			  it('should generate correct HTTP request for query options', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People?\$filter=FirstName eq 'Scott'\`;
			    const correctMethod = 'GET';
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(JSON.stringify(\{ value: [PersonMockData] \}));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        \{
			          People(queryOptions: \{ filter: "FirstName eq 'Scott'" \}) \{
			            UserName
			            FirstName
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(decodeURIComponent(sentRequest!.url)).toBe(decodeURIComponent(correctUrl));
			  \});
			  it('should generate correct HTTP request for \$count', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People/\$count\`;
			    const correctMethod = 'GET';
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(JSON.stringify(20));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        \{
			          PeopleCount
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			  \});
			  it('should generate correct HTTP request for creating an entity', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People\`;
			    const correctMethod = 'POST';
			    const correctBody = \{
			      UserName: 'lewisblack',
			      FirstName: 'Lewis',
			      LastName: 'Black',
			      Emails: ['lewisblack@example.com'],
			      Gender: 'Male',
			      FavoriteFeature: 'Feature1',
			      Features: ['Feature1', 'Feature2'],
			      AddressInfo: [
			        \{
			          Address: '187 Suffolk Ln.',
			          City: \{
			            Name: 'Boise',
			            CountryRegion: 'United States',
			            Region: 'ID',
			          \},
			        \},
			      ],
			    \};
			    let sentRequest: any;
			    addMock(correctUrl, async request => \{
			      sentRequest = request.clone();
			      const bodyObj = await request.json();
			      bodyObj['@odata.type'] = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person';
			      return new Response(JSON.stringify(bodyObj));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      variables: \{
			        input: correctBody,
			      \},
			      document: parse(/* GraphQL */ \`
			        mutation CreatePeople(\$input: PersonInput) \{
			          createPeople(input: \$input) \{
			            UserName
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			    expect(await sentRequest!.json()).toStrictEqual(correctBody);
			  \});
			  it('should generate correct HTTP request for deleting an entity', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People/SOMEID/\`;
			    const correctMethod = 'DELETE';
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(JSON.stringify(\{\}));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        mutation \{
			          deletePeopleByUserName(UserName: "SOMEID")
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			  \});
			  it('should generate correct HTTP request for updating an entity', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People/SOMEID/\`;
			    const correctMethod = 'PATCH';
			    const correctBody = \{
			      FirstName: 'Mirs',
			      LastName: 'King',
			    \};
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request.clone();
			      const returnBody = await request.json();
			      returnBody['@odata.type'] = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Person';
			      return new Response(JSON.stringify(returnBody));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      variables: \{
			        UserName: 'SOMEID',
			        input: correctBody,
			      \},
			      document: parse(/* GraphQL */ \`
			        mutation UpdatePeople(\$UserName: String!, \$input: PersonUpdateInput!) \{
			          updatePeopleByUserName(UserName: \$UserName, input: \$input) \{
			            FirstName
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			    expect(await sentRequest!.text()).toBe(JSON.stringify(correctBody));
			  \});
			  it('should generate correct HTTP request for invoking unbound functions', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/GetNearestAirport(lat = 33, lon = -118)?\$select=IcaoCode,Name\`;
			    const correctMethod = 'GET';
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(
			        JSON.stringify(\{
			          '@odata.type': 'Microsoft.OData.Service.Sample.TrippinInMemory.Models.Airport',
			          IcaoCode: Date.now().toString(),
			          Name: 'Name',
			        \})
			      );
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        \{
			          GetNearestAirport(lat: 33, lon: -118) \{
			            IcaoCode
			            Name
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(decodeURIComponent(sentRequest!.url)).toBe(correctUrl);
			  \});
			  it('should generate correct HTTP request for invoking bound functions', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People/russellwhyte/Trips/0/Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetInvolvedPeople?\$select=UserName\`;
			    const correctMethod = 'GET';
			    let sentRequest: Request;
			    addMock(\`https://services.odata.org/TripPinRESTierService/People/russellwhyte/\`, async () => \{
			      return new Response(JSON.stringify(PersonMockData));
			    \});
			    addMock(
			      \`https://services.odata.org/TripPinRESTierService/People/russellwhyte/Trips?\$filter=TripId eq 0&\$select=TripId\`,
			      async () => \{
			        return new Response(JSON.stringify(TripMockData));
			      \}
			    );
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(
			        JSON.stringify(\{
			          value: [],
			        \})
			      );
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        \{
			          PeopleByUserName(UserName: "russellwhyte") \{
			            UserName
			            Trips(queryOptions: \{ filter: "TripId eq 0" \}) \{
			              TripId
			              GetInvolvedPeople \{
			                UserName
			              \}
			            \}
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			  \});
			  it('should generate correct HTTP request for invoking bound functions with arguments', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People/russellwhyte/Microsoft.OData.Service.Sample.TrippinInMemory.Models.GetFriendsTrips(userName='ronaldmundy')?\$select=TripId,Name\`;
			    const correctMethod = 'GET';
			    let sentRequest: Request;
			    addMock(\`https://services.odata.org/TripPinRESTierService/People/russellwhyte/\`, async () => \{
			      return new Response(JSON.stringify(PersonMockData));
			    \});
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(
			        JSON.stringify(\{
			          value: [],
			        \})
			      );
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        \{
			          PeopleByUserName(UserName: "russellwhyte") \{
			            UserName
			            GetFriendsTrips(userName: "ronaldmundy") \{
			              TripId
			              Name
			            \}
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url.replace(/'/g, '%27')).toBe(correctUrl.replace(/'/g, '%27')); // apostrophe gets percent-encoded
			  \});
			  it('should generate correct HTTP request for invoking unbound actions', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/ResetDataSource\`;
			    const correctMethod = 'POST';
			    let sentRequest: Request;
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(JSON.stringify(true));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        mutation \{
			          ResetDataSource
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			  \});
			  it('should generate correct HTTP request for invoking bound actions', async () => \{
			    addMock('https://services.odata.org/TripPinRESTierService/\$metadata', async () => new Response(TripPinMetadata));
			    const correctUrl = \`https://services.odata.org/TripPinRESTierService/People/russellwhyte/Microsoft.OData.Service.Sample.TrippinInMemory.Models.ShareTrip\`;
			    const correctMethod = 'POST';
			    const correctBody = \{
			      userName: 'scottketchum',
			      tripId: 0,
			    \};
			    let sentRequest: Request;
			    addMock(\`https://services.odata.org/TripPinRESTierService/People/russellwhyte/\`, async () => \{
			      return new Response(JSON.stringify(PersonMockData));
			    \});
			    addMock(correctUrl, async request => \{
			      sentRequest = request;
			      return new Response(JSON.stringify(true));
			    \});
			    const handler = new ODataHandler(\{
			      name: 'TripPin',
			      config: \{
			        baseUrl: 'https://services.odata.org/TripPinRESTierService',
			      \},
			      pubsub,
			      cache,
			      store,
			      baseDir,
			      importFn,
			      logger,
			      fetchFn: mockFetch,
			    \});
			    const source = await handler.getMeshSource();
			
			    const graphqlResult = (await source.executor(\{
			      context: \{\},
			      document: parse(/* GraphQL */ \`
			        mutation \{
			          PeopleByUserName(UserName: "russellwhyte") \{
			            ShareTrip(userName: "scottketchum", tripId: 0)
			          \}
			        \}
			      \`),
			    \})) as ExecutionResult;
			
			    expect(graphqlResult.errors).toBeFalsy();
			    expect(sentRequest!.method).toBe(correctMethod);
			    expect(sentRequest!.url).toBe(correctUrl);
			    expect(await sentRequest!.text()).toBe(JSON.stringify(correctBody));
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\odata\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(16)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\authentication.test.ts', () => {
        const sourceCode = `
			/* eslint-disable camelcase */
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import \{ graphql, GraphQLSchema \} from 'graphql';
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ startServer, stopServer \} from './example_api_server';
			
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/example_oas.json');
			const PORT = 3003;
			// update PORT for this test case:
			oas.servers[0].variables.port.default = String(PORT);
			
			let createdSchema: GraphQLSchema;
			
			/**
			 * Set up the schema first and run example API server
			 */
			beforeAll(() => \{
			  return Promise.all([
			    openAPIToGraphQL.createGraphQLSchema(oas, \{ fetch \}).then((\{ schema \}) => \{
			      createdSchema = schema;
			    \}),
			    startServer(PORT),
			  ]);
			\});
			
			/**
			 * Shut down API server
			 */
			afterAll(() => \{
			  return stopServer();
			\});
			
			test('Get patent using basic auth', () => \{
			  const query = \`\{
			    viewerBasicAuth (username: "arlene123", password: "password123") \{
			      patentWithId (patentId: "100") \{
			        patentId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerBasicAuth: \{
			          patentWithId: \{
			            patentId: '100',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get patent using API key', () => \{
			  const query = \`\{
			    viewerApiKey2 (apiKey: "abcdef") \{
			      patentWithId (patentId: "100") \{
			        patentId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerApiKey2: \{
			          patentWithId: \{
			            patentId: '100',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get patent using API key 3', () => \{
			  const query = \`\{
			    viewerApiKey3 (apiKey: "abcdef") \{
			      patentWithId (patentId: "100") \{
			        patentId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerApiKey3: \{
			          patentWithId: \{
			            patentId: '100',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get project using API key 1', () => \{
			  const query = \`\{
			    viewerApiKey (apiKey: "abcdef") \{
			      projectWithId (projectId: 1) \{
			        active
			        projectId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerApiKey: \{
			          projectWithId: \{
			            active: true,
			            projectId: 1,
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get project using API key passed as option - viewer is disabled', async () => \{
			  const \{ schema \} = await openAPIToGraphQL.createGraphQLSchema(oas, \{
			    viewer: false,
			    headers: \{
			      access_token: 'abcdef',
			    \},
			    fetch,
			  \});
			  const query = \`\{
			    projectWithId (projectId: 1) \{
			      projectId
			    \}
			  \}\`;
			  return graphql(\{
			    schema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        projectWithId: \{
			          projectId: 1,
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get project using API key passed in the requestOptions - viewer is disabled', async () => \{
			  const \{ schema \} = await openAPIToGraphQL.createGraphQLSchema(oas, \{
			    viewer: false,
			    requestOptions: \{
			      headers: \{
			        access_token: 'abcdef',
			      \},
			    \},
			    fetch,
			  \});
			  const query = \`\{
			    projectWithId (projectId: 1) \{
			      projectId
			    \}
			  \}\`;
			  return graphql(\{
			    schema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        projectWithId: \{
			          projectId: 1,
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get project using API key 2', () => \{
			  const query = \`\{
			    viewerApiKey2 (apiKey: "abcdef") \{
			      projectWithId (projectId: 1) \{
			        projectId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerApiKey2: \{
			          projectWithId: \{
			            projectId: 1,
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Post project using API key 1', () => \{
			  const query = \`mutation \{
			    mutationViewerApiKey (apiKey: "abcdef") \{
			      postProjectWithId (projectWithIdInput: \{
			        projectId: 123
			        leadId: "arlene"
			      \}) \{
			        projectLead \{
			          name
			        \}
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        mutationViewerApiKey: \{
			          postProjectWithId: \{
			            projectLead: \{
			              name: 'Arlene L McMahon',
			            \},
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Post project using API key 2', () => \{
			  const query = \`mutation \{
			    mutationViewerApiKey2 (apiKey: "abcdef") \{
			      postProjectWithId (projectWithIdInput: \{
			        projectId: 123
			        leadId: "arlene"
			      \}) \{
			        projectLead \{
			          name
			        \}
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        mutationViewerApiKey2: \{
			          postProjectWithId: \{
			            projectLead: \{
			              name: 'Arlene L McMahon',
			            \},
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get project using API key 3', async () => \{
			  const query = \`\{
			    viewerApiKey3 (apiKey: "abcdef") \{
			      projectWithId (projectId: 1) \{
			        projectId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerApiKey3: \{
			          projectWithId: \{
			            projectId: 1,
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get project using API key 3 passed as option - viewer is disabled', async () => \{
			  const \{ schema \} = await openAPIToGraphQL.createGraphQLSchema(oas, \{
			    viewer: false,
			    headers: \{
			      cookie: 'access_token=abcdef',
			    \},
			    fetch,
			  \});
			  const query = \`\{
			    projectWithId (projectId: 1) \{
			      projectId
			    \}
			  \}\`;
			  return graphql(\{
			    schema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        projectWithId: \{
			          projectId: 1,
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get project using API key 3 passed in the requestOptions - viewer is disabled', async () => \{
			  const \{ schema \} = await openAPIToGraphQL.createGraphQLSchema(oas, \{
			    viewer: false,
			    requestOptions: \{
			      headers: \{
			        cookie: 'access_token=abcdef',
			      \},
			    \},
			    fetch,
			  \});
			  const query = \`\{
			    projectWithId (projectId: 1) \{
			      projectId
			    \}
			  \}\`;
			  return graphql(\{
			    schema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        projectWithId: \{
			          projectId: 1,
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Basic AnyAuth usage', () => \{
			  const query = \`\{
			    viewerAnyAuth(exampleApiBasicProtocol: \{username: "arlene123", password: "password123"\}) \{
			      patentWithId (patentId: "100") \{
			        patentId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerAnyAuth: \{
			          patentWithId: \{
			            patentId: '100',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Basic AnyAuth usage with extraneous auth data', () => \{
			  const query = \`\{
			    viewerAnyAuth(exampleApiKeyProtocol: \{apiKey: "abcdef"\}, exampleApiBasicProtocol: \{username: "arlene123", password: "password123"\}) \{
			      patentWithId (patentId: "100") \{
			        patentId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerAnyAuth: \{
			          patentWithId: \{
			            patentId: '100',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Basic AnyAuth usage with multiple operations', () => \{
			  const query = \`\{
			    viewerAnyAuth(exampleApiKeyProtocol2: \{apiKey: "abcdef"\}) \{
			      patentWithId (patentId: "100") \{
			        patentId
			      \}
			      projectWithId (projectId: 1) \{
			        projectId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerAnyAuth: \{
			          patentWithId: \{
			            patentId: '100',
			          \},
			          projectWithId: \{
			            projectId: 1,
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('AnyAuth with multiple operations with different auth requirements', () => \{
			  const query = \`\{
			    viewerAnyAuth(exampleApiBasicProtocol: \{username: "arlene123", password: "password123"\}, exampleApiKeyProtocol: \{apiKey: "abcdef"\}) \{
			      patentWithId (patentId: "100") \{
			        patentId
			      \}
			      projectWithId (projectId: 1) \{
			        projectId
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerAnyAuth: \{
			          patentWithId: \{
			            patentId: '100',
			          \},
			          projectWithId: \{
			            projectId: 1,
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			// This request can only be fulfilled using AnyAuth
			test.skip('AnyAuth with multiple operations with different auth requirements in a link', () => \{
			  const query = \`\{
			    viewerAnyAuth(exampleApiBasicProtocol: \{username: "arlene123", password: "password123"\}, exampleApiKeyProtocol: \{apiKey: "abcdef"\}) \{
			      projectWithId (projectId: 3) \{
			        projectId
			        patentId2
			        patent \{
			          patentId
			        \}
			        projectLead \{
			          name
			        \}
			      \}
			    \}
			  \}\`;
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerAnyAuth: \{
			          projectWithId: \{
			            projectId: 3,
			            patentId2: '100',
			            patent: \{
			              patentId: '100',
			            \},
			            projectLead: \{
			              name: 'William B Ropp',
			            \},
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Extract token from context', () => \{
			  const query = \`\{
			    secure
			  \}\`;
			
			  return openAPIToGraphQL
			    .createGraphQLSchema(oas, \{
			      tokenJSONpath: '\$.user.token',
			      viewer: true,
			      fetch,
			    \})
			    .then((\{ schema \}) => \{
			      return graphql(\{
			        schema,
			        source: query,
			        contextValue: \{ user: \{ token: 'abcdef' \} \},
			      \}).then((result: any) => \{
			        expect(result).toEqual(\{
			          data: \{
			            secure: 'A secure message.',
			          \},
			        \});
			      \});
			    \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\authentication.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(17)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\cloudfunction.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ GraphQLSchema, parse, validate \} from 'graphql';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/cloudfunction.json');
			
			let createdSchema: GraphQLSchema;
			
			beforeAll(async () => \{
			  const \{ schema \} = await openAPIToGraphQL.createGraphQLSchema(oas, \{ fetch \});
			  createdSchema = schema;
			\});
			
			test('Get response', async () => \{
			  const query = \`mutation \{
			    mutationViewerBasicAuth (username: "test" password: "data") \{
			      postTestAction2 (payloadInput: \{age: 27\}) \{
			        payload
			        age
			      \}
			    \}
			  \}\`;
			  // validate that 'limit' parameter is covered by options:
			  const ast = parse(query);
			  const errors = validate(createdSchema, ast);
			  expect(errors).toEqual([]);
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\cloudfunction.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\docusign.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals test, expect */
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ Options \} from '../src/openapi-to-graphql/types/options';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/docusign.json');
			
			test('Generate schema without problems', () => \{
			  const options: Options<any, any, any> = \{
			    strict: false,
			    fetch,
			  \};
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    expect(schema).toBeTruthy();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\docusign.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api.test.ts', () => {
        const sourceCode = `
			/* eslint-disable no-extend-native */
			/* eslint-disable camelcase */
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import \{ graphql, parse, validate, GraphQLSchema, GraphQLInputObjectType, GraphQLObjectType \} from 'graphql';
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ Options \} from '../src/openapi-to-graphql/types/options';
			import \{ startServer, stopServer \} from './example_api_server';
			import \{ GraphQLOperationType \} from '../src/openapi-to-graphql/types/graphql';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/example_oas.json');
			const PORT = 3002;
			// Update PORT for this test case:
			oas.servers[0].variables.port.default = String(PORT);
			
			let createdSchema: GraphQLSchema;
			
			/**
			 * Set up the schema first and run example API server
			 */
			beforeAll(() => \{
			  return Promise.all([
			    openAPIToGraphQL
			      .createGraphQLSchema(oas, \{
			        fillEmptyResponses: true,
			        fetch,
			      \})
			      .then((\{ schema, report \}) => \{
			        createdSchema = schema;
			      \}),
			    startServer(PORT),
			  ]);
			\});
			
			/**
			 * Shut down API server
			 */
			afterAll(() => \{
			  return stopServer();
			\});
			
			test('Get descriptions', () => \{
			  // Get all the descriptions of the fields on the GraphQL object type Car
			  const query = \`\{
			    __type(name: "Car") \{
			      name
			      fields \{
			        description
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        __type: \{
			          name: 'Car',
			          fields: [
			            \{
			              description: 'The color of the car.',
			            \},
			            \{
			              description: null,
			            \},
			            \{
			              description: null,
			            \},
			            \{
			              description: 'The model of the car.',
			            \},
			            \{
			              description: 'The rating of the car.',
			            \},
			            \{
			              description: 'Arbitrary (string) tags describing an entity.',
			            \},
			          ],
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get resource (incl. enum)', () => \{
			  // Status is an enum
			  const query = \`\{
			    user (username: "arlene") \{
			      name
			      status
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{ user: \{ name: 'Arlene L McMahon', status: 'STAFF' \} \},
			    \});
			  \});
			\});
			
			test('Get resource 2', () => \{
			  const query = \`\{
			    company (id: "binsol") \{
			      legalForm
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{ data: \{ company: \{ legalForm: 'public' \} \} \});
			  \});
			\});
			
			// OAS allows you to define response objects with HTTP code with the XX wildcard syntax
			test('Get resource with status code: 2XX', () => \{
			  const query = \`\{
			    papers \{
			      name
			      published
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        papers: [
			          \{ name: 'Deliciousness of apples', published: true \},
			          \{ name: 'How much coffee is too much coffee?', published: false \},
			          \{
			            name: 'How many tennis balls can fit into the average building?',
			            published: true,
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * Some operations do not have a response body. The option fillEmptyResponses
			 * allows OtG to handle these cases.
			 */
			test('Get resource with no response schema and status code: 204 and fillEmptyResponses', () => \{
			  const query = \`\{
			    bonuses
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        bonuses: null,
			      \},
			    \});
			  \});
			\});
			
			// Link objects in the OAS allow OtG to create nested GraphQL objects that resolve on different API calls
			test('Get nested resource via link \$response.body#/...', () => \{
			  const query = \`\{
			    user (username: "arlene") \{
			      name
			      employerCompany \{
			        legalForm
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        user: \{
			          name: 'Arlene L McMahon',
			          employerCompany: \{
			            legalForm: 'public',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get nested resource via link \$request.path#/... and \$request.query#/', () => \{
			  const query = \`\{
			    productWithId (productId: "123" productTag: "blah") \{
			      productName
			      reviews \{
			        text
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        productWithId: \{
			          productName: 'Super Product',
			          reviews: [\{ text: 'Great product' \}, \{ text: 'I love it' \}],
			        \},
			      \},
			    \});
			  \});
			\});
			
			// Both an operationId and an operationRef can be used to create a link object
			test('Get nested resource via link operationRef', () => \{
			  const query = \`\{
			    productWithId (productId: "123" productTag: "blah") \{
			      productName
			      reviewsWithOperationRef \{
			        text
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        productWithId: \{
			          productName: 'Super Product',
			          reviewsWithOperationRef: [\{ text: 'Great product' \}, \{ text: 'I love it' \}],
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get nested lists of resources', () => \{
			  const query = \`\{
			    user(username: "arlene") \{
			      name
			      friends \{
			        name
			        friends \{
			          name
			          friends \{
			            name
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        user: \{
			          name: 'Arlene L McMahon',
			          friends: [
			            \{
			              name: 'William B Ropp',
			              friends: [
			                \{
			                  name: 'William B Ropp',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'John C Barnes',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'Heather J Tate',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			              ],
			            \},
			            \{
			              name: 'John C Barnes',
			              friends: [
			                \{
			                  name: 'William B Ropp',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'John C Barnes',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'Heather J Tate',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			              ],
			            \},
			            \{
			              name: 'Heather J Tate',
			              friends: [
			                \{
			                  name: 'William B Ropp',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'John C Barnes',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'Heather J Tate',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			              ],
			            \},
			          ],
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get nested lists of resources without specifying a path param for the parent resource', () => \{
			  const query = \`\{
			    users(limit: 1) \{
			      name
			      friends \{
			        name
			        friends \{
			          name
			          friends \{
			            name
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then(result => \{
			    expect(result).toEqual(\{
			      data: \{
			        users: [
			          \{
			            name: 'Arlene L McMahon',
			            friends: [
			              \{
			                name: 'William B Ropp',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'Heather J Tate',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			              \{
			                name: 'John C Barnes',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'Heather J Tate',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			              \{
			                name: 'Heather J Tate',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'Heather J Tate',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			            ],
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			// Links can be defined with some parameters as constants or variables
			test('Link parameters as constants and variables', () => \{
			  const query = \`\{
			    scanner(query: "hello") \{
			      body
			      basicLink\{
			        body
			      \}
			      variableLink\{
			        body
			      \}
			      constantLink\{
			        body
			      \}
			      everythingLink\{
			        body
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        scanner: \{
			          body: 'hello',
			          basicLink: \{
			            body: 'hello',
			          \},
			          variableLink: \{
			            body: '_hello_hellohelloabchello123',
			          \},
			          constantLink: \{
			            body: '123',
			          \},
			          everythingLink: \{
			            body: 'http://localhost:3002/api/scanner_get_200_hello_application/json_keep-alive',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Nested links with constants and variables', () => \{
			  const query = \`\{
			    scanner(query: "val") \{
			      body
			      basicLink\{
			        body
			        basicLink\{
			          body
			          basicLink\{
			            body
			          \}
			        \}
			      \}
			      variableLink\{
			        body
			        constantLink\{
			          body
			          everythingLink\{
			            body
			            everythingLink\{
			              body
			            \}
			          \}
			        \}
			      \}
			      constantLink\{
			        body
			      \}
			      everythingLink\{
			        body
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        scanner: \{
			          body: 'val',
			          basicLink: \{
			            body: 'val',
			            basicLink: \{
			              body: 'val',
			              basicLink: \{
			                body: 'val',
			              \},
			            \},
			          \},
			          variableLink: \{
			            body: '_val_valvalabcval123',
			            constantLink: \{
			              body: '123',
			              everythingLink: \{
			                body: 'http://localhost:3002/api/copier_get_200_123_application/json_keep-alive',
			                everythingLink: \{
			                  body: 'http://localhost:3002/api/copier_get_200_http://localhost:3002/api/copier_get_200_123_application/json_keep-alive_application/json_keep-alive',
			                \},
			              \},
			            \},
			          \},
			          constantLink: \{
			            body: '123',
			          \},
			          everythingLink: \{
			            body: 'http://localhost:3002/api/scanner_get_200_val_application/json_keep-alive',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Link parameters as constants and variables with request payload', () => \{
			  const query = \`mutation \{
			    postScanner(query: "query", path: "path", textPlain2Input: "body") \{
			      body
			      everythingLink2 \{
			        body
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        postScanner: \{
			          body: 'req.body: body, req.query.query: query, req.path.path: path',
			          everythingLink2: \{
			            body: 'http://localhost:3002/api/scanner/path_post_200_body_query_path_application/json_req.body: body, req.query.query: query, req.path.path: path_query_path_keep-alive',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get response for users with providing correct parameter', () => \{
			  const query = \`\{
			    users (limit: 2) \{
			      name
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        users: [\{ name: 'Arlene L McMahon' \}, \{ name: 'William B Ropp' \}],
			      \},
			    \});
			  \});
			\});
			
			test('Get response with providing parameter with falsy value', () => \{
			  const query = \`\{
			    users (limit: 0) \{
			      name
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        users: [],
			      \},
			    \});
			  \});
			\});
			
			test('Get response without providing parameter with default value', () => \{
			  const query = \`\{
			    productReviews (id: "100") \{
			      text
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        productReviews: [\{ text: 'Great product' \}, \{ text: 'I love it' \}],
			      \},
			    \});
			  \});
			\});
			
			test('Get response with header parameters', () => \{
			  const query = \`\{
			    snack(snackType: CHIPS, snackSize: SMALL)
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        snack: 'Here is a small chips',
			      \},
			    \});
			  \});
			\});
			
			/**
			 * Content-type and accept headers should not change because they are
			 * linked to GraphQL object types with static schemas
			 */
			test('Get JSON response even with non-JSON accept header', () => \{
			  const query = \`\{
			    office (id: 2) \{
			      employerId
			      roomNumber,
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        office: \{
			          employerId: 'binsol',
			          roomNumber: 102,
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get response with cookies', () => \{
			  const query = \`\{
			    cookie (cookieType: CHOCOLATE_CHIP, cookieSize: MEGA_SIZED)
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        cookie: 'Thanks for your cookie preferences: "cookie_type=chocolate chip; cookie_size=mega-sized;"',
			      \},
			    \});
			  \});
			\});
			
			/**
			 * GraphQL (input) object type also consider the preferred name when generating
			 * a name
			 */
			test('Ensure good naming for operations with duplicated schemas', () => \{
			  const query = \`query \{
			    cleanDesks
			    dirtyDesks
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        cleanDesks: '5 clean desks',
			        dirtyDesks: '5 dirty desks',
			      \},
			    \});
			  \});
			\});
			
			/**
			 * CASE: 64 bit int - return number instead of integer, leading to use of
			 * GraphQLFloat, which can support 64 bits:
			 */
			test('Get response containing 64-bit integer (using GraphQLBigInt)', async () => \{
			  const query = \`\{
			    productReviews (id: "100") \{
			      timestamp
			    \}
			  \}\`;
			
			  const result = await graphql(\{ schema: createdSchema, source: query \});
			  expect(result).toEqual(\{
			    data: \{
			      productReviews: [\{ timestamp: 1502787600000000 \}, \{ timestamp: 1502787400000000 \}],
			    \},
			  \});
			\});
			
			test('Get array of strings', () => \{
			  const query = \`\{
			    user (username: "arlene") \{
			      hobbies
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        user: \{
			          hobbies: ['tap dancing', 'bowling'],
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get array of objects', () => \{
			  const query = \`\{
			    company (id: "binsol") \{
			      offices\{
			        street
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        company: \{
			          offices: [
			            \{
			              street: '122 Elk Rd Little',
			            \},
			            \{
			              street: '124 Elk Rd Little',
			            \},
			          ],
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Get single resource', () => \{
			  const query = \`\{
			    user(username: "arlene")\{
			      name
			      address\{
			        street
			      \},
			      address2\{
			        city
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        user: \{
			          name: 'Arlene L McMahon',
			          address: \{
			            street: '4656 Cherry Camp Road',
			          \},
			          address2: \{
			            city: 'Macomb',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Post resource', () => \{
			  const query = \`mutation \{
			    postUser (userInput: \{
			      name: "Mr. New Guy"
			      address: \{
			        street: "Home streeet 1"
			        city: "Hamburg"
			      \}
			      employerId: "binsol"
			      hobbies: "soccer"
			    \}) \{
			      name
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        postUser: \{
			          name: 'Mr. New Guy',
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Post resource and get nested resource back', () => \{
			  const query = \`mutation \{
			    postUser (userInput: \{
			      name: "Mr. New Guy"
			      address: \{
			        street: "Home streeet 1"
			        city: "Hamburg"
			      \}
			      employerId: "binsol"
			      hobbies: "soccer"
			    \}) \{
			      name
			      employerCompany \{
			        ceoUser \{
			          name
			        \}
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        postUser: \{
			          name: 'Mr. New Guy',
			          employerCompany: \{
			            ceoUser: \{
			              name: 'John C Barnes',
			            \},
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Post resource with non-application/json content-type request and response bodies', () => \{
			  const query = \`mutation \{
			    postPaper(textPlainInput: "happy")
			  \}\`;
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        postPaper: 'You sent the paper idea: happy',
			      \},
			    \});
			  \});
			\});
			
			test(
			  'Operation id is correctly sanitized, schema names and fields are ' +
			    'correctly sanitized, path and query parameters are correctly sanitized, ' +
			    'received data is correctly sanitized',
			  () => \{
			    const query = \`\{
			      productWithId(productId: "this-path", productTag: "And a tag") \{
			        productId
			        productTag
			      \}
			    \}\`;
			
			    return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          productWithId: \{
			            productId: 'this-path',
			            productTag: 'And a tag',
			          \},
			        \},
			      \});
			    \});
			  \}
			);
			
			test('Request data is correctly de-sanitized to be sent', () => \{
			  const query = \`mutation \{
			    postProductWithId (productWithIdInput: \{
			      productName: "Soccer ball"
			      productId: "ball123"
			      productTag:"sports"
			    \}) \{
			      productName
			      productId
			      productTag
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        postProductWithId: \{
			          productName: 'Soccer ball',
			          productId: 'ball123',
			          productTag: 'sports',
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Fields with arbitrary JSON (e.g., maps) can be returned', () => \{
			  // Testing additionalProperties field in schemas
			  const query = \`\{
			    cars \{
			      tags
			    \}
			  \}\`;
			
			  // Testing empty properties field
			  const query2 = \`\{
			    cars \{
			      features
			    \}
			  \}\`;
			
			  const promise = graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        cars: [
			          \{
			            tags: null,
			          \},
			          \{
			            tags: \{
			              speed: 'extreme',
			            \},
			          \},
			          \{
			            tags: \{
			              impression: 'decadent',
			              condition: 'slightly beat-up',
			            \},
			          \},
			          \{
			            tags: \{
			              impression: 'decadent',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			
			  const promise2 = graphql(\{
			    schema: createdSchema,
			    source: query2,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        cars: [
			          \{
			            features: \{
			              color: 'banana yellow to be specific',
			            \},
			          \},
			          \{
			            features: null,
			          \},
			          \{
			            features: null,
			          \},
			          \{
			            features: null,
			          \},
			        ],
			      \},
			    \});
			  \});
			
			  return Promise.all([promise, promise2]);
			\});
			
			test('Capitalized enum values can be returned', () => \{
			  const query = \`\{
			    car (username: "arlene") \{
			      kind
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        car: \{
			          kind: 'SEDAN',
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Define header and query options', () => \{
			  const options: Options<any, any, any> = \{
			    headers: \{
			      exampleHeader: 'some-value',
			    \},
			    qs: \{
			      limit: '30',
			    \},
			    fetch,
			  \};
			
			  const query = \`\{
			    status2 (globalquery: "test")
			  \}\`;
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    // validate that 'limit' parameter is covered by options:
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          status2: 'Ok',
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Resolve simple allOf', () => \{
			  const query = \`\{
			    user (username: "arlene") \{
			      name
			      nomenclature \{
			        genus
			        species
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        user: \{
			          name: 'Arlene L McMahon',
			          nomenclature: \{
			            genus: 'Homo',
			            species: 'sapiens',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			// The \$ref is contained in the suborder field
			test('Resolve ref in allOf', () => \{
			  const query = \`\{
			    user (username: "arlene") \{
			      name
			      nomenclature \{
			        suborder
			        genus
			        species
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        user: \{
			          name: 'Arlene L McMahon',
			          nomenclature: \{
			            suborder: 'Haplorhini',
			            genus: 'Homo',
			            species: 'sapiens',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			// The nested allOf is contained in the family field
			test('Resolve nested allOf', () => \{
			  const query = \`\{
			    user (username: "arlene") \{
			      name
			      nomenclature \{
			        family
			        genus
			        species
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        user: \{
			          name: 'Arlene L McMahon',
			          nomenclature: \{
			            family: 'Hominidae',
			            genus: 'Homo',
			            species: 'sapiens',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			// The circular nested allOf is contained in the familyCircular field
			test('Resolve circular allOf', () => \{
			  const query = \`\{
			    __type(name: "FamilyObject") \{
			      fields \{
			        name
			        type \{
			          name
			        \}
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__type.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'familyCircular';
			      \})
			    ).toEqual(\{
			      name: 'familyCircular',
			      type: \{
			        name: 'FamilyObject',
			      \},
			    \});
			  \});
			\});
			
			test('Resolve oneOf, which becomes a union type', () => \{
			  const query = \`\{
			    __type(name: "AssetListItem") \{
			      kind
			      possibleTypes \{
			        name
			        description
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    type carType = \{
			      name: string;
			      description: string;
			    \};
			
			    // Sort result because the order of the possibleTypes can change depending on Node version
			    const possibleTypes = result.data.__type.possibleTypes as carType[];
			    possibleTypes.sort((a, b) => \{
			      return a.name.localeCompare(b.name);
			    \});
			
			    expect(result).toEqual(\{
			      data: \{
			        __type: \{
			          kind: 'UNION',
			          possibleTypes: [
			            \{
			              name: 'Car',
			              description: 'A car',
			            \},
			            \{
			              name: 'Trashcan',
			              description: null,
			            \},
			            \{
			              name: 'User',
			              description: 'A user represents a natural person',
			            \},
			          ],
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Union type', () => \{
			  const query = \`\{
			    asset(companyId: "binsol") \{
			      ... on User \{
			        name
			        address \{
			          city
			        \}
			      \}
			      ... on Trashcan \{
			        contents
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        asset: [
			          \{
			            name: 'Arlene L McMahon',
			            address: \{
			              city: 'Elk Grove Village',
			            \},
			          \},
			          \{\},
			          \{
			            contents: [
			              \{
			                type: 'apple',
			                message: 'Half-eaten',
			              \},
			              \{
			                type: 'sock',
			                message: 'Lost one',
			              \},
			            ],
			          \},
			          \{
			            name: 'William B Ropp',
			            address: \{
			              city: 'Macomb',
			            \},
			          \},
			          \{\},
			          \{
			            contents: [
			              \{
			                type: 'sock',
			                message: 'Lost one',
			              \},
			            ],
			          \},
			          \{
			            name: 'John C Barnes',
			            address: \{
			              city: 'Tucson',
			            \},
			          \},
			          \{\},
			          \{
			            contents: [],
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			// Extensions provide more information about failed API calls
			test('Error contains extension', () => \{
			  const query = \`query \{
			    user(username: "abcdef") \{
			      name
			    \}
			  \}\`;
			
			  return graphql(\{
			    schema: createdSchema,
			    source: query,
			  \}).then(error => \{
			    const extensions = error.errors[0].extensions;
			    expect(extensions).toBeDefined();
			
			    // Remove headers because it contains fields that may change from run to run
			    delete extensions.responseHeaders;
			    expect(extensions).toEqual(\{
			      method: 'get',
			      path: '/users/\{username\}',
			      statusCode: 404,
			      statusText: 'Not Found',
			      responseBody: \{
			        message: 'Wrong username',
			      \},
			    \});
			  \});
			\});
			
			test('Option provideErrorExtensions should prevent error extensions from being created', () => \{
			  const options: Options<any, any, any> = \{
			    provideErrorExtensions: false,
			    fetch,
			  \};
			
			  const query = \`query \{
			    user(username: "abcdef") \{
			      name
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toMatchObject(\{
			        errors: [
			          \{
			            message: 'Could not invoke operation GET /users/\{username\}',
			            locations: [
			              \{
			                line: 2,
			                column: 5,
			              \},
			            ],
			            path: ['user'],
			          \},
			        ],
			        data: \{
			          user: null,
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Option customResolver', () => \{
			  const options: Options<any, any, any> = \{
			    customResolvers: \{
			      'Example API': \{
			        '/users/\{username\}': \{
			          get: () => \{
			            return \{
			              name: 'Jenifer Aldric',
			            \};
			          \},
			        \},
			      \},
			    \},
			    fetch,
			  \};
			
			  const query = \`query \{
			    user(username: "abcdef") \{
			      name
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          user: \{
			            name: 'Jenifer Aldric',
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Option customResolver with links', () => \{
			  const options: Options<any, any, any> = \{
			    customResolvers: \{
			      'Example API': \{
			        '/users/\{username\}': \{
			          get: () => \{
			            return \{
			              name: 'Jenifer Aldric',
			              employerId: 'binsol',
			            \};
			          \},
			        \},
			      \},
			    \},
			    fetch,
			  \};
			
			  const query = \`query \{
			    user(username: "abcdef") \{
			      name
			      employerId
			      employerCompany \{
			        name
			        ceoUsername
			        ceoUser \{
			          name
			        \}
			      \}
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          user: \{
			            name: 'Jenifer Aldric',
			            employerId: 'binsol',
			            employerCompany: \{
			              name: 'Binary Solutions',
			              ceoUsername: 'johnny',
			              ceoUser: \{
			                name: 'Jenifer Aldric',
			              \},
			            \},
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Option customResolver using resolver arguments', () => \{
			  const options: Options<any, any, any> = \{
			    customResolvers: \{
			      'Example API': \{
			        '/users/\{username\}': \{
			          get: (obj, args: any, context, info) => \{
			            return \{
			              name: args.username,
			            \};
			          \},
			        \},
			      \},
			    \},
			    fetch,
			  \};
			
			  const query = \`query \{
			    user(username: "abcdef") \{
			      name
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          user: \{
			            name: 'abcdef',
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Option customResolver using resolver arguments that are sanitized', () => \{
			  const options: Options<any, any, any> = \{
			    customResolvers: \{
			      'Example API': \{
			        '/products/\{product-id\}': \{
			          get: (obj, args, context, info) => \{
			            return \{
			              // Note that the argument name is sanitized
			              productName: 'abcdef',
			            \};
			          \},
			        \},
			      \},
			    \},
			    fetch,
			  \};
			
			  const query = \`\{
			    productWithId (productId: "123" productTag: "blah") \{
			      productName
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          productWithId: \{
			            productName: 'abcdef',
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Option addLimitArgument', () => \{
			  const options: Options<any, any, any> = \{
			    addLimitArgument: true,
			    fetch,
			  \};
			
			  const query = \`query \{
			    user(username: "arlene") \{
			      name
			      friends (limit: 3) \{
			        name
			        friends (limit: 2) \{
			          name
			          friends (limit: 1) \{
			            name
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          user: \{
			            name: 'Arlene L McMahon',
			            friends: [
			              \{
			                name: 'William B Ropp',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			              \{
			                name: 'John C Barnes',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			              \{
			                name: 'Heather J Tate',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			            ],
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Content property in parameter object', () => \{
			  const query = \`\{
			    coordinates(lat: 3, long: 5) \{
			      lat,
			      long
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        coordinates: \{
			          lat: 8,
			          long: 10,
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Handle objects without defined properties with arbitrary GraphQL JSON type', () => \{
			  const query = \`\{
			    trashcan(username:"arlene") \{
			      brand,
			      contents
			    \}
			    trashcans \{
			      contents
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        trashcan: \{
			          brand: 'Garbage Emporium',
			          contents: [
			            \{
			              type: 'apple',
			              message: 'Half-eaten',
			            \},
			            \{
			              type: 'sock',
			              message: 'Lost one',
			            \},
			          ],
			        \},
			        trashcans: [
			          \{
			            contents: [
			              \{
			                type: 'apple',
			                message: 'Half-eaten',
			              \},
			              \{
			                type: 'sock',
			                message: 'Lost one',
			              \},
			            ],
			          \},
			          \{
			            contents: [
			              \{
			                type: 'sock',
			                message: 'Lost one',
			              \},
			            ],
			          \},
			          \{
			            contents: [],
			          \},
			          \{
			            contents: [
			              \{
			                type: 'tissue',
			                message: 'Used',
			              \},
			            ],
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			test('Handle input objects without defined properties with arbitrary GraphQL JSON type', () => \{
			  const query = \`mutation \{
			    postOfficeTrashCan(trashcan2Input: \{
			      type: "sandwich",
			      message: "moldy",
			      tasteRating: 0
			    \}, username: "arlene") \{
			      brand
			      contents
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        postOfficeTrashCan: \{
			          brand: 'Garbage Emporium',
			          contents: [
			            \{
			              type: 'apple',
			              message: 'Half-eaten',
			            \},
			            \{
			              type: 'sock',
			              message: 'Lost one',
			            \},
			            \{
			              type: 'sandwich',
			              message: 'moldy',
			              tasteRating: 0,
			            \},
			          ],
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Generate "Equivalent to..." messages', () => \{
			  const options: Options<any, any, any> = \{
			    // Used to simplify test. Otherwise viewers will polute query/mutation fields.
			    viewer: false,
			    fetch,
			  \};
			
			  // Check if query/mutation fields have the message
			  const query = \`query \{
			    __schema \{
			      queryType \{
			        fields \{
			          type \{
			            name
			          \}
			          description
			        \}
			      \}
			      mutationType \{
			        fields \{
			          type \{
			            name
			          \}
			          description
			        \}
			      \}
			    \}
			  \}\`;
			
			  const promise = openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      // Make sure all query fields have the message
			      expect(
			        result.data.__schema.queryType.fields.every((field: \{ description: string | string[] \}) => \{
			          return field.description.includes('\\n\\nEquivalent to GET ');
			        \})
			      ).toBe(true);
			
			      // Make sure all mutation fields have the message
			      expect(
			        result.data.__schema.mutationType.fields.every((field: \{ description: string | string[] \}) => \{
			          return field.description.includes('\\n\\nEquivalent to ');
			        \})
			      ).toBe(true);
			
			      // Check full message on a particular field
			      expect(
			        result.data.__schema.queryType.fields.find((field: \{ type: \{ name: string \} \}) => \{
			          return field.type.name === 'Car';
			        \})
			      ).toEqual(\{
			        type: \{
			          name: 'Car',
			        \},
			        description: 'Returns a car to test nesting of sub operations\\n\\nEquivalent to GET /users/\{username\}/car',
			      \});
			    \});
			  \});
			
			  // Check link field description
			  const query2 = \`query \{
			    __type(name: "User") \{
			      fields \{
			        type \{
			          name
			        \}
			        description
			      \}
			    \}
			  \}\`;
			
			  const promise2 = graphql(\{
			    schema: createdSchema,
			    source: query2,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__type.fields.find((field: \{ type: \{ name: string \} \}) => \{
			        return field.type.name === 'Company';
			      \})
			    ).toEqual(\{
			      type: \{
			        name: 'Company',
			      \},
			      description: "Allows to fetch the user's employer company.\\n\\nEquivalent to GET /companies/\{id\}",
			    \});
			  \});
			
			  return Promise.all([promise, promise2]);
			\});
			
			test('Withhold "Equivalent to..." messages', () => \{
			  const options: Options<any, any, any> = \{
			    // Used to simplify test. Otherwise viewers will polute query/mutation fields.
			    viewer: false,
			    equivalentToMessages: false,
			    fetch,
			  \};
			
			  // Check query/mutation field descriptions
			  const query = \`query \{
			    __schema \{
			      queryType \{
			        fields \{
			          type \{
			            name
			          \}
			          description
			        \}
			      \}
			      mutationType \{
			        fields \{
			          type \{
			            name
			          \}
			          description
			        \}
			      \}
			    \}
			  \}\`;
			
			  const promise = openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(
			        result.data.__schema.queryType.fields.every((field: \{ description: string | string[] \}) => \{
			          return field.description.includes('\\n\\nEquivalent to GET ');
			        \})
			      ).toBe(false);
			
			      expect(
			        result.data.__schema.mutationType.fields.every((field: \{ description: string | string[] \}) => \{
			          return field.description.includes('\\n\\nEquivalent to ');
			        \})
			      ).toBe(false);
			    \});
			  \});
			
			  // Check link field description
			  const query2 = \`query \{
			    __type(name: "User") \{
			      fields \{
			        type \{
			          name
			        \}
			        description
			      \}
			    \}
			  \}\`;
			
			  const promise2 = openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{
			      schema,
			      source: query2,
			    \}).then((result: any) => \{
			      expect(
			        result.data.__type.fields.find((field: \{ type: \{ name: string \} \}) => \{
			          return field.type.name === 'Company';
			        \})
			      ).toEqual(\{
			        type: \{
			          name: 'Company',
			        \},
			        description: "Allows to fetch the user's employer company.",
			      \});
			    \});
			  \});
			
			  return Promise.all([promise, promise2]);
			\});
			
			test('UUID format becomes GraphQL ID type', () => \{
			  const query = \`\{
			    __type(name: "Company") \{
			      fields \{
			        name
			        type \{
			          name
			          kind
			        \}
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(
			      result.data.__type.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'id';
			      \})
			    ).toEqual(\{
			      name: 'id',
			      type: \{
			        name: 'ID',
			        kind: 'SCALAR',
			      \},
			    \});
			  \});
			\});
			
			test('Option idFormats', () => \{
			  const options: Options<any, any, any> = \{
			    idFormats: ['specialIdFormat'],
			    fetch,
			  \};
			
			  // Check query/mutation field descriptions
			  const query = \`\{
			    __type(name: "PatentWithId") \{
			      fields \{
			        name
			        type \{
			          kind
			          ofType \{
			            name
			            kind
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(
			        result.data.__type.fields.find((field: \{ name: string \}) => \{
			          return field.name === 'patentId';
			        \})
			      ).toEqual(\{
			        name: 'patentId',
			        type: \{
			          kind: 'NON_NULL',
			          ofType: \{
			            name: 'ID',
			            kind: 'SCALAR',
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Required properties for input object types', () => \{
			  const userInputType = createdSchema.getType('UserInput') as GraphQLInputObjectType;
			
			  // The exclamation mark shows that it is a required (non-nullable) property
			  expect(userInputType.toConfig().fields.address.type.toString()).toEqual('AddressInput!');
			  expect(userInputType.toConfig().fields.address2.type.toString()).toEqual('AddressInput');
			\});
			
			test('Option selectQueryOrMutationField', () => \{
			  const query = \`\{
			    __schema \{
			      queryType \{
			        fields \{
			          name
			          description
			        \}
			      \}
			      mutationType \{
			        fields \{
			          name
			          description
			        \}
			      \}
			    \}
			  \}\`;
			
			  // The users field should exist as a Query field
			  const promise = graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'user';
			      \})
			    ).toEqual(\{
			      name: 'user',
			      description: 'Returns a user from the system.\\n\\nEquivalent to GET /users/\{username\}',
			    \});
			
			    expect(
			      result.data.__schema.mutationType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'user';
			      \})
			    ).toEqual(undefined);
			  \});
			
			  const options: Options<any, any, any> = \{
			    selectQueryOrMutationField: \{
			      'Example API': \{
			        '/users/\{username\}': \{
			          get: GraphQLOperationType.Mutation,
			        \},
			      \},
			    \},
			    fetch,
			  \};
			
			  // The users (now named getUserByUsername) field should exist as a Mutation field
			  const promise2 = openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(
			        result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			          return field.name === 'getUserByUsername';
			        \})
			      ).toEqual(undefined);
			
			      expect(
			        result.data.__schema.mutationType.fields.find((field: \{ name: string \}) => \{
			          return field.name === 'getUserByUsername';
			        \})
			      ).toEqual(\{
			        name: 'getUserByUsername',
			        description: 'Returns a user from the system.\\n\\nEquivalent to GET /users/\{username\}',
			      \});
			    \});
			  \});
			
			  return Promise.all([promise, promise2]);
			\});
			
			test('Header arguments are not created when they are provided through headers option', () => \{
			  // The GET snack operation has a snack_type and snack_size header arguments
			  const options: Options<any, any, any> = \{
			    headers: \{
			      snack_type: 'chips',
			      snack_size: 'large',
			    \},
			    fetch,
			  \};
			
			  const query = \`\{
			    __schema \{
			      queryType \{
			        fields \{
			          name
			          args \{
			            name
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(
			        result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			          return field.name === 'snack';
			        \})
			      ).toEqual(\{
			        name: 'snack',
			        args: [], // No arguments
			      \});
			    \});
			  \});
			\});
			
			test('Header arguments are not created when they are provided through requestOptions option', () => \{
			  // The GET snack operation has a snack_type and snack_size header arguments
			  const options: Options<any, any, any> = \{
			    requestOptions: \{
			      headers: \{
			        snack_type: 'chips',
			        snack_size: 'large',
			      \},
			    \},
			    fetch,
			  \};
			
			  const query = \`\{
			    __schema \{
			      queryType \{
			        fields \{
			          name
			          args \{
			            name
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(
			        result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			          return field.name === 'snack';
			        \})
			      ).toEqual(\{
			        name: 'snack',
			        args: [], // No arguments
			      \});
			    \});
			  \});
			\});
			
			test('Query string arguments are not created when they are provided through qs option', () => \{
			  // The GET status operation has a limit query string parameter
			  const options: Options<any, any, any> = \{
			    qs: \{
			      limit: '10',
			    \},
			    fetch,
			  \};
			
			  const query = \`\{
			    __schema \{
			      queryType \{
			        fields \{
			          name
			          args \{
			            name
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(
			        result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			          return field.name === 'users';
			        \})
			      ).toEqual(\{
			        name: 'users',
			        args: [], // No arguments
			      \});
			    \});
			  \});
			\});
			
			test('Non-nullable properties for object types', () => \{
			  const coordinates = createdSchema.getType('Coordinates') as GraphQLObjectType;
			
			  // The exclamation mark shows that it is a required (non-nullable) property
			  expect(coordinates.toConfig().fields.lat.type.toString()).toEqual('Float!');
			  expect(coordinates.toConfig().fields.long.type.toString()).toEqual('Float!');
			\});
			
			test('Option genericPayloadArgName', () => \{
			  const query = \`\{
			    __schema \{
			      mutationType \{
			        fields \{
			          name
			          args \{
			            name
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  // The postUser field should have a userInput argument
			  const promise = graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(
			      result.data.__schema.mutationType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'postUser';
			      \})
			    ).toEqual(\{
			      name: 'postUser',
			      args: [
			        \{
			          name: 'userInput',
			        \},
			      ],
			    \});
			  \});
			
			  const options: Options<any, any, any> = \{
			    genericPayloadArgName: true,
			    fetch,
			  \};
			
			  // The postUser field should now have a requestPody argument
			  const promise2 = openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(
			        result.data.__schema.mutationType.fields.find((field: \{ name: string \}) => \{
			          return field.name === 'postUser';
			        \})
			      ).toEqual(\{
			        name: 'postUser',
			        args: [
			          \{
			            name: 'requestBody',
			          \},
			        ],
			      \});
			    \});
			  \});
			
			  return Promise.all([promise, promise2]);
			\});
			
			test('Non-nullable properties from nested allOf', () => \{
			  // Check query/mutation field descriptions
			  const query = \`\{
			    __type(name: "Nomenclature") \{
			      fields \{
			        name
			        type \{
			          kind
			          ofType \{
			            name
			            kind
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, \{ fetch \}).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(
			        result.data.__type.fields.find((field: \{ name: string \}) => \{
			          return field.name === 'family';
			        \})
			      ).toEqual(\{
			        name: 'family',
			        type: \{
			          kind: 'NON_NULL',
			          ofType: \{
			            name: 'String',
			            kind: 'SCALAR',
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(60)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api2.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import \{ graphql, GraphQLSchema \} from 'graphql';
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ startServer, stopServer \} from './example_api2_server';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/example_oas2.json');
			const PORT = 3004;
			// Update PORT for this test case:
			oas.servers[0].variables.port.default = String(PORT);
			
			let createdSchema: GraphQLSchema;
			
			/**
			 * This test suite is used to verify the behavior of the operationIdFieldNames
			 * option.
			 *
			 * It is necessary to make a separate OAS because we need all of operations to
			 * have operationIDs.
			 */
			
			/**
			 * Set up the schema first and run example API server
			 */
			beforeAll(() => \{
			  return Promise.all([
			    openAPIToGraphQL.createGraphQLSchema(oas, \{ operationIdFieldNames: true, fetch \}).then((\{ schema, report \}) => \{
			      createdSchema = schema;
			    \}),
			    startServer(PORT),
			  ]);
			\});
			
			/**
			 * Shut down API server
			 */
			afterAll(() => \{
			  return stopServer();
			\});
			
			/**
			 * There should be two operations.
			 *
			 * One will be given a field name from the operationId, i.e. user, and the other
			 * one, because it does not have an operationId defined, will have an
			 * autogenerated field name based on the path, i.e. getUser
			 */
			test('The option operationIdFieldNames should allow both operations to be present', () => \{
			  let oasGetCount = 0;
			  for (const path in oas.paths) \{
			    for (const method in oas.paths[path]) \{
			      if (method === 'get') oasGetCount++;
			    \}
			  \}
			
			  const gqlTypes = Object.keys(createdSchema.getQueryType().getFields()).length;
			  expect(gqlTypes).toEqual(oasGetCount);
			\});
			
			test('Querying the two operations', () => \{
			  const query = \`query \{
			    getUser \{
			      name
			    \}
			    user \{
			      name
			    \}
			  \}\`;
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        getUser: \{
			          name: 'Arlene L McMahon',
			        \},
			        user: \{
			          name: 'William B Ropp',
			        \},
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api2.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api3.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ Options \} from '../src/openapi-to-graphql/types/options';
			import \{ graphql, parse, validate, GraphQLSchema \} from 'graphql';
			import * as api from './example_api_server';
			import * as api2 from './example_api3_server';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/example_oas.json');
			const oas3 = require('./fixtures/example_oas3.json');
			const PORT = 3005;
			const PORT2 = 3006;
			// Update PORT for this test case:
			oas.servers[0].variables.port.default = String(PORT);
			oas3.servers[0].variables.port.default = String(PORT2);
			
			/**
			 * This test suite is used to verify the behavior of interOAS links, i.e.
			 * links across different OASs
			 */
			
			let createdSchema: GraphQLSchema;
			
			/**
			 * Set up the schema first and run example API server
			 */
			beforeAll(() => \{
			  return Promise.all([
			    openAPIToGraphQL.createGraphQLSchema([oas, oas3], \{ fetch \}).then((\{ schema, report \}) => \{
			      createdSchema = schema;
			    \}),
			    api.startServer(PORT),
			    api2.startServer(PORT2),
			  ]);
			\});
			
			/**
			 * Shut down API server
			 */
			afterAll(() => \{
			  return Promise.all([api.stopServer(), api2.stopServer()]);
			\});
			
			test('Basic query on two APIs', () => \{
			  const query = \`query \{
			    author(authorId: "arlene")\{
			      name
			    \},
			    book(bookId: "software") \{
			      title
			    \},
			    user(username: "arlene") \{
			      name
			    \}
			  \}\`;
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        author: \{
			          name: 'Arlene L McMahon',
			        \},
			        book: \{
			          title: 'The OpenAPI-to-GraphQL Cookbook',
			        \},
			        user: \{
			          name: 'Arlene L McMahon',
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Two APIs with independent links', () => \{
			  const query = \`query \{
			    author(authorId: "arlene") \{
			      name
			      masterpieceTitle,
			      masterpiece \{
			        title
			      \}
			    \},
			    book(bookId: "software") \{
			      title
			      authorName
			      author \{
			        name
			        masterpiece \{
			          author \{
			            name
			          \}
			        \}
			      \}
			    \},
			    user(username: "arlene") \{
			      name
			      employerCompany \{
			        name
			      \}
			    \}
			  \}\`;
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        author: \{
			          name: 'Arlene L McMahon',
			          masterpieceTitle: 'software',
			          masterpiece: \{
			            title: 'The OpenAPI-to-GraphQL Cookbook',
			          \},
			        \},
			        book: \{
			          title: 'The OpenAPI-to-GraphQL Cookbook',
			          authorName: 'arlene',
			          author: \{
			            name: 'Arlene L McMahon',
			            masterpiece: \{
			              author: \{
			                name: 'Arlene L McMahon',
			              \},
			            \},
			          \},
			        \},
			        user: \{
			          name: 'Arlene L McMahon',
			          employerCompany: \{
			            name: 'Binary Solutions',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Two APIs with interrelated links', () => \{
			  const query = \`query \{
			    author(authorId: "arlene") \{
			      name
			      employee\{
			        name
			        employerCompany\{
			          name
			        \}
			        author\{
			          name
			          masterpiece\{
			            title
			            author\{
			              name
			              employee\{
			                name
			              \}
			            \}
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        author: \{
			          name: 'Arlene L McMahon',
			          employee: \{
			            name: 'Arlene L McMahon',
			            employerCompany: \{
			              name: 'Binary Solutions',
			            \},
			            author: \{
			              name: 'Arlene L McMahon',
			              masterpiece: \{
			                title: 'The OpenAPI-to-GraphQL Cookbook',
			                author: \{
			                  name: 'Arlene L McMahon',
			                  employee: \{
			                    name: 'Arlene L McMahon',
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Two APIs with viewers', () => \{
			  const query = \`query \{
			    viewerApiKey (apiKey: "abcdef")\{
			      nextWork(authorId: "arlene") \{
			        title
			        author \{
			          name
			        \}
			      \}
			    \}
			    viewerBasicAuth2 (username: "arlene123", password: "password123") \{
			      patentWithId (patentId: "100") \{
			        patentId
			      \}
			    \}
			  \}\`;
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerApiKey: \{
			          nextWork: \{
			            title: 'OpenAPI-to-GraphQL for Power Users',
			            author: \{
			              name: 'Arlene L McMahon',
			            \},
			          \},
			        \},
			        viewerBasicAuth2: \{
			          patentWithId: \{
			            patentId: '100',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Two APIs with AnyAuth viewer', () => \{
			  const query = \`\{
			    viewerAnyAuth(exampleApiKeyProtocol2: \{apiKey: "abcdef"\}, exampleApi3BasicProtocol: \{username: "arlene123", password: "password123"\}) \{
			      projectWithId(projectId: 1) \{
			        projectLead\{
			          name
			        \}
			      \}
			      nextWork(authorId: "arlene") \{
			        title
			      \}
			    \}
			  \}\`;
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerAnyAuth: \{
			          projectWithId: \{
			            projectLead: \{
			              name: 'Arlene L McMahon',
			            \},
			          \},
			          nextWork: \{
			            title: 'OpenAPI-to-GraphQL for Power Users',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Two APIs with AnyAuth viewer and interrelated links', () => \{
			  const query = \`\{
			    viewerAnyAuth(exampleApiKeyProtocol2: \{apiKey: "abcdef"\}, exampleApi3BasicProtocol: \{username: "arlene123", password: "password123"\}) \{
			      projectWithId(projectId: 1) \{
			        projectLead\{
			          name
			          author \{
			            name
			            nextWork \{
			              title
			            \}
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        viewerAnyAuth: \{
			          projectWithId: \{
			            projectLead: \{
			              name: 'Arlene L McMahon',
			              author: \{
			                name: 'Arlene L McMahon',
			                nextWork: \{
			                  title: 'OpenAPI-to-GraphQL for Power Users',
			                \},
			              \},
			            \},
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Option customResolver with two APIs', () => \{
			  const options: Options<any, any, any> = \{
			    fetch,
			    customResolvers: \{
			      'Example API': \{
			        '/users/\{username\}': \{
			          get: () => \{
			            return \{
			              name: 'Jenifer Aldric',
			            \};
			          \},
			        \},
			      \},
			      'Example API 3': \{
			        '/authors/\{authorId\}': \{
			          get: () => \{
			            return \{
			              name: 'Jenifer Aldric, the author',
			            \};
			          \},
			        \},
			      \},
			    \},
			  \};
			  const query = \`query \{
			    user(username: "abcdef") \{
			      name
			    \}
			    author(authorId: "abcdef") \{
			      name
			    \}
			  \}\`;
			  return openAPIToGraphQL.createGraphQLSchema([oas, oas3], options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          user: \{
			            name: 'Jenifer Aldric',
			          \},
			          author: \{
			            name: 'Jenifer Aldric, the author',
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			
			test('Option customResolver with two APIs and interrelated links', () => \{
			  const options: Options<any, any, any> = \{
			    fetch,
			    customResolvers: \{
			      'Example API': \{
			        '/users/\{username\}': \{
			          get: () => \{
			            return \{
			              name: 'Jenifer Aldric',
			              employerId: 'binsol',
			            \};
			          \},
			        \},
			      \},
			      'Example API 3': \{
			        '/authors/\{authorId\}': \{
			          get: () => \{
			            return \{
			              name: 'Jenifer Aldric, the author',
			              masterpieceTitle: 'A collection of stories',
			            \};
			          \},
			        \},
			        '/books/\{bookId\}': \{
			          get: () => \{
			            return \{
			              title: 'A collection of stories for babies',
			              authorName: 'Jenifer Aldric, yet another author',
			            \};
			          \},
			        \},
			      \},
			    \},
			  \};
			  const query = \`query \{
			    author(authorId: "abcdef") \{
			      name
			      employee\{
			        name
			        employerCompany\{
			          name
			        \}
			        author\{
			          name
			          masterpiece\{
			            title
			            author\{
			              name
			              employee\{
			                name
			              \}
			            \}
			          \}
			        \}
			      \}
			    \}
			  \}\`;
			  return openAPIToGraphQL.createGraphQLSchema([oas, oas3], options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          author: \{
			            name: 'Jenifer Aldric, the author',
			            employee: \{
			              name: 'Jenifer Aldric',
			              employerCompany: \{
			                name: 'Binary Solutions',
			              \},
			              author: \{
			                name: 'Jenifer Aldric, the author',
			                masterpiece: \{
			                  title: 'A collection of stories for babies',
			                  author: \{
			                    name: 'Jenifer Aldric, the author',
			                    employee: \{
			                      name: 'Jenifer Aldric',
			                    \},
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \},
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api3.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api4.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import \{ graphql, GraphQLSchema \} from 'graphql';
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/example_oas4.json');
			
			// This test suite is used to verify the behavior of anyOf and oneOf handling
			
			let createdSchema: GraphQLSchema;
			
			/**
			 * Set up the schema
			 */
			beforeAll(() => \{
			  return openAPIToGraphQL.createGraphQLSchema(oas, \{ fetch \}).then((\{ schema, report \}) => \{
			    createdSchema = schema;
			  \});
			\});
			
			const anyOfQuery = \`\{
			  __schema \{
			    queryType \{
			      fields \{
			        name
			        description
			        type \{
			          name
			          kind
			          fields \{
			            name
			            type \{
			              name
			            \}
			          \}
			        \}
			      \}
			    \}
			  \}
			\}\`;
			
			const oneOfQuery = \`\{
			  __schema \{
			    queryType \{
			      fields \{
			        name
			        description
			        type \{
			          name
			          kind
			          possibleTypes \{
			            name
			            fields \{
			              type \{
			                name
			              \}
			            \}
			          \}
			        \}
			      \}
			    \}
			  \}
			\}\`;
			
			/**
			 * anyOf contains two member schemas
			 *
			 * Both member schemas contain the same field 'commonAttribute'
			 *
			 * Because they are the same, the created GraphQL object should only have one
			 * 'commonAttribute' field
			 */
			test('Basic anyOf test using the same member schemas\\n\\nEquivalent to GET /anyOf', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf';
			      \})
			    ).toEqual(\{
			      name: 'anyOf',
			      description: 'Basic anyOf test using the same member schemas\\n\\nEquivalent to GET /anyOf',
			      type: \{
			        name: 'AnyOf',
			        kind: 'OBJECT',
			        fields: [
			          \{
			            name: 'commonAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains two member schemas
			 *
			 * One member schema contains a 'commonAttribute' field and the other
			 * member schema contains a 'differentAttribute' field
			 *
			 * Because they are the different, the created GraphQL object should have both
			 * fields
			 */
			test('Basic anyOf test with different member schemas\\n\\nEquivalent to GET /anyOf2', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf2';
			      \})
			    ).toEqual(\{
			      name: 'anyOf2',
			      description: 'Basic anyOf test with different member schemas\\n\\nEquivalent to GET /anyOf2',
			      type: \{
			        name: 'AnyOf2',
			        kind: 'OBJECT',
			        fields: [
			          \{
			            name: 'commonAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			          \{
			            name: 'differentAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains two member schemas
			 *
			 * Both member schemas contain the same complex nested field
			 *
			 * Because they are the same, the created GraphQL object should only have one
			 * field
			 */
			test('anyOf test with the same nested member schemas\\n\\nEquivalent to GET /anyOf3', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf3';
			      \})
			    ).toEqual(\{
			      name: 'anyOf3',
			      description: 'anyOf test with the same nested member schemas\\n\\nEquivalent to GET /anyOf3',
			      type: \{
			        name: 'AnyOf3',
			        kind: 'OBJECT',
			        fields: [
			          \{
			            name: 'commonAttribute',
			            type: \{
			              name: 'CommonAttribute5',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains two member schemas
			 *
			 * The member schemas contain complex nested fields that are different at the root
			 * level.
			 *
			 * Because they are different at the root level, the created GraphQL object
			 * should have two fields.
			 */
			test('anyOf test with different nested member schemas\\n\\nEquivalent to GET /anyOf4', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf4';
			      \})
			    ).toEqual(\{
			      name: 'anyOf4',
			      description: 'anyOf test with different nested member schemas\\n\\nEquivalent to GET /anyOf4',
			      type: \{
			        name: 'AnyOf4',
			        kind: 'OBJECT',
			        fields: [
			          \{
			            name: 'commonAttribute',
			            type: \{
			              name: 'CommonAttribute5',
			            \},
			          \},
			          \{
			            name: 'differentAttribute',
			            type: \{
			              name: 'DifferentAttribute3',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains two member schemas
			 *
			 * The member schemas contain complex nested fields that are same at the root
			 * level but different at other levels.
			 *
			 * This leads to a conlict because the same field has different schemas. As a
			 * result, the field will use the arbitrary JSON type.
			 */
			test('anyOf test with different nested member schemas, leading to conflict\\n\\nEquivalent to GET /anyOf5', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf5';
			      \})
			    ).toEqual(\{
			      name: 'anyOf5',
			      description: 'anyOf test with different nested member schemas, leading to conflict\\n\\nEquivalent to GET /anyOf5',
			      type: \{
			        name: 'AnyOf5',
			        kind: 'OBJECT',
			        fields: [
			          \{
			            name: 'commonAttribute',
			            type: \{
			              name: 'JSON',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains two member schemas
			 *
			 * The member schemas are of different types. One is an object type and the other
			 * is an scalar type.
			 *
			 * This leads to a conlict. As a result, the field will use the arbitrary JSON
			 * type.
			 */
			test('anyOf test with incompatible member schema types\\n\\nEquivalent to GET /anyOf6', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf6';
			      \})
			    ).toEqual(\{
			      name: 'anyOf6',
			      description: 'anyOf test with incompatible member schema types\\n\\nEquivalent to GET /anyOf6',
			      type: \{
			        name: 'JSON',
			        kind: 'SCALAR',
			        fields: null,
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains three member schemas
			 *
			 * Only one of the member schemas is an object type schema.
			 *
			 * The created type should be able to pick out the object type schema without
			 * defaulting to the arbitrary JSON type.
			 */
			test('anyOf test with some extraneous member schemas\\n\\nEquivalent to GET /anyOf7', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf7';
			      \})
			    ).toEqual(\{
			      name: 'anyOf7',
			      description: 'anyOf test with some extraneous member schemas\\n\\nEquivalent to GET /anyOf7',
			      type: \{
			        name: 'AnyOf7',
			        kind: 'OBJECT',
			        fields: [
			          \{
			            name: 'commonAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains three member schemas
			 *
			 * None of the member schemas are object type schemas. As a result, it defaults to the
			 * arbitrary JSON type.
			 */
			test('anyOf test with no object type member schemas\\n\\nEquivalent to GET /anyOf8', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf8';
			      \})
			    ).toEqual(\{
			      name: 'anyOf8',
			      description: 'anyOf test with no object type member schemas\\n\\nEquivalent to GET /anyOf8',
			      type: \{
			        name: 'JSON',
			        kind: 'SCALAR',
			        fields: null,
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains three member schemas
			 *
			 * None of the member schemas are object type schemas but because there is an
			 * external type provided in the root schema, it can utilize the proper typing.
			 */
			test('anyOf test with extraneous member schemas with external type\\n\\nEquivalent to GET /anyOf9', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf9';
			      \})
			    ).toEqual(\{
			      name: 'anyOf9',
			      description: 'anyOf test with extraneous member schemas with external type\\n\\nEquivalent to GET /anyOf9',
			      type: \{
			        name: 'Int',
			        kind: 'SCALAR',
			        fields: null,
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains two member schemas and allOf contains an additional one
			 *
			 * None of the schemas have conflicts so all three should be utilized
			 */
			test('Basic anyOf test with allOf\\n\\nEquivalent to GET /anyOf10', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf10';
			      \})
			    ).toEqual(\{
			      name: 'anyOf10',
			      description: 'Basic anyOf test with allOf\\n\\nEquivalent to GET /anyOf10',
			      type: \{
			        name: 'AnyOf10',
			        kind: 'OBJECT',
			        fields: [
			          \{
			            name: 'anotherAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			          \{
			            name: 'commonAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			          \{
			            name: 'differentAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * anyOf contains two member schemas and allOf contains an additional one that
			 * is nested in another anyOf
			 *
			 * Resolving the allOf should correctly collapse all of the (nested) anyOfs
			 * and allow all three schemas to be utilized
			 */
			test('anyOf test with allOf, requiring anyOf collapse\\n\\nEquivalent to GET /anyOf11', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: anyOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'anyOf11';
			      \})
			    ).toEqual(\{
			      name: 'anyOf11',
			      description: 'anyOf test with allOf, requiring anyOf collapse\\n\\nEquivalent to GET /anyOf11',
			      type: \{
			        name: 'AnyOf11',
			        kind: 'OBJECT',
			        fields: [
			          \{
			            name: 'anotherAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			          \{
			            name: 'commonAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			          \{
			            name: 'differentAttribute',
			            type: \{
			              name: 'String',
			            \},
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * oneOf contains two member schemas
			 *
			 * Because the schemas are different object types, the created GraphQL union
			 * type has two differnet member types.
			 */
			test('Basic oneOf test\\n\\nEquivalent to GET /oneOf', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: oneOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'oneOf';
			      \})
			    ).toEqual(\{
			      name: 'oneOf',
			      description: 'Basic oneOf test\\n\\nEquivalent to GET /oneOf',
			      type: \{
			        name: 'OneOf',
			        kind: 'UNION',
			        possibleTypes: [
			          \{
			            name: 'CommonAttributeObject',
			            fields: [
			              \{
			                type: \{
			                  name: 'String',
			                \},
			              \},
			            ],
			          \},
			          \{
			            name: 'DifferentAttributeObject',
			            fields: [
			              \{
			                type: \{
			                  name: 'String',
			                \},
			              \},
			            ],
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * oneOf contains two member schemas
			 *
			 * Because one of the member schemas is not an object type, then default to
			 * the arbitrary JSON type.
			 */
			test('oneOf test with non-object type member schema\\n\\nEquivalent to GET /oneOf2', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: oneOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'oneOf2';
			      \})
			    ).toEqual(\{
			      name: 'oneOf2',
			      description: 'oneOf test with non-object type member schema\\n\\nEquivalent to GET /oneOf2',
			      type: \{
			        name: 'JSON',
			        kind: 'SCALAR',
			        possibleTypes: null,
			      \},
			    \});
			  \});
			\});
			
			/**
			 * oneOf contains two member schemas
			 *
			 * None of the member schemas are object types, therefore default to
			 * the arbitrary JSON type.
			 */
			test('oneOf test with no object type member schemas\\n\\nEquivalent to GET /oneOf3', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: oneOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'oneOf3';
			      \})
			    ).toEqual(\{
			      name: 'oneOf3',
			      description: 'oneOf test with no object type member schemas\\n\\nEquivalent to GET /oneOf3',
			      type: \{
			        name: 'JSON',
			        kind: 'SCALAR',
			        possibleTypes: null,
			      \},
			    \});
			  \});
			\});
			
			/**
			 * oneOf contains two member schemas
			 *
			 * The member schemas contain extranous data but because the root schema contains a
			 * type, it is able to utilize the proper type.
			 */
			test('oneOf test with extraneous member schemas\\n\\nEquivalent to GET /oneOf4', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: oneOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'oneOf4';
			      \})
			    ).toEqual(\{
			      name: 'oneOf4',
			      description: 'oneOf test with extraneous member schemas\\n\\nEquivalent to GET /oneOf4',
			      type: \{
			        name: 'Int',
			        kind: 'SCALAR',
			        possibleTypes: null,
			      \},
			    \});
			  \});
			\});
			
			/**
			 * oneOf contains two member schemas and an allOf
			 *
			 * Only schemas within the oneOf should be utilized
			 *
			 * TODO: verify this behavior and also create a test with additional root properties
			 */
			test('Basic oneOf test with allOf\\n\\nEquivalent to GET /oneOf5', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: oneOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'oneOf5';
			      \})
			    ).toEqual(\{
			      name: 'oneOf5',
			      description: 'Basic oneOf test with allOf\\n\\nEquivalent to GET /oneOf5',
			      type: \{
			        name: 'OneOf5',
			        kind: 'UNION',
			        possibleTypes: [
			          \{
			            name: 'CommonAttributeObject',
			            fields: [
			              \{
			                type: \{
			                  name: 'String',
			                \},
			              \},
			            ],
			          \},
			          \{
			            name: 'DifferentAttributeObject',
			            fields: [
			              \{
			                type: \{
			                  name: 'String',
			                \},
			              \},
			            ],
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			
			/**
			 * oneOf contains two member schemas and allOf contains an additional one that
			 * is nested in another oneOf
			 *
			 * Resolving the allOf should correctly collapse all of the (nested) oneOfs
			 * and allow all three schemas to be utilized
			 */
			test('oneOf test with allOf, requiring oneOf collapse\\n\\nEquivalent to GET /oneOf6', () => \{
			  return graphql(\{
			    schema: createdSchema,
			    source: oneOfQuery,
			  \}).then((result: any) => \{
			    expect(
			      result.data.__schema.queryType.fields.find((field: \{ name: string \}) => \{
			        return field.name === 'oneOf6';
			      \})
			    ).toEqual(\{
			      name: 'oneOf6',
			      description: 'oneOf test with allOf, requiring oneOf collapse\\n\\nEquivalent to GET /oneOf6',
			      type: \{
			        name: 'OneOf6',
			        kind: 'UNION',
			        possibleTypes: [
			          \{
			            name: 'CommonAttributeObject',
			            fields: [
			              \{
			                type: \{
			                  name: 'String',
			                \},
			              \},
			            ],
			          \},
			          \{
			            name: 'DifferentAttributeObject',
			            fields: [
			              \{
			                type: \{
			                  name: 'String',
			                \},
			              \},
			            ],
			          \},
			          \{
			            name: 'AnotherAttributeObject',
			            fields: [
			              \{
			                type: \{
			                  name: 'String',
			                \},
			              \},
			            ],
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api4.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(17)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api5.test.ts', () => {
        const sourceCode = `
			/* eslint-disable camelcase */
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import \{ graphql, GraphQLSchema \} from 'graphql';
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ startServer, stopServer \} from './example_api5_server';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/example_oas5.json');
			const PORT = 3007;
			// Update PORT for this test case:
			oas.servers[0].variables.port.default = String(PORT);
			
			let createdSchema: GraphQLSchema;
			
			/**
			 * Set up the schema first and run example API server
			 */
			beforeAll(() => \{
			  return Promise.all([
			    openAPIToGraphQL
			      .createGraphQLSchema(oas, \{
			        simpleNames: true,
			        fetch,
			      \})
			      .then((\{ schema, report \}) => \{
			        createdSchema = schema;
			      \}),
			    startServer(PORT),
			  ]);
			\});
			
			/**
			 * Shut down API server
			 */
			afterAll(() => \{
			  return stopServer();
			\});
			
			// Testing the simpleNames option
			
			/**
			 * Because of the simpleNames option, 'o_d_d___n_a_m_e' will not be turned into
			 * 'oDDNAME'.
			 */
			test('Basic simpleNames option test', () => \{
			  const query = \`\{
			    o_d_d___n_a_m_e \{
			      data
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        o_d_d___n_a_m_e: \{
			          data: 'odd name',
			        \},
			      \},
			    \});
			  \});
			\});
			
			/**
			 * 'w-e-i-r-d___n-a-m-e' contains GraphQL unsafe characters.
			 *
			 * Because of the simpleNames option, 'w-e-i-r-d___n-a-m-e' will be turned into
			 * 'weird___name' and not 'wEIRDNAME'.
			 */
			test('Basic simpleNames option test with GraphQL unsafe values', () => \{
			  const query = \`\{
			    weird___name \{
			      data
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        weird___name: \{
			          data: 'weird name',
			        \},
			      \},
			    \});
			  \});
			\});
			
			/**
			 * 'w-e-i-r-d___n-a-m-e2' contains GraphQL unsafe characters.
			 *
			 * Because of the simpleNames option, 'w-e-i-r-d___n-a-m-e2' will be turned into
			 * 'weird___name2' and not 'wEIRDNAME2'.
			 */
			test('Basic simpleNames option test with GraphQL unsafe values and a parameter', () => \{
			  const query = \`\{
			    weird___name2 (funky___parameter: "Arnold") \{
			      data
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        weird___name2: \{
			          data: 'weird name 2 param: Arnold',
			        \},
			      \},
			    \});
			  \});
			\});
			
			/**
			 * Because of the simpleNames option, 'w-e-i-r-d___n-a-m-e___l-i-n-k' will be
			 * turned into 'weird___name___link' and not 'wEIRDNAMELINK'.
			 */
			test('Basic simpleNames option test with a link', () => \{
			  const query = \`\{
			    o_d_d___n_a_m_e \{
			      weird___name___link \{
			        data
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        o_d_d___n_a_m_e: \{
			          weird___name___link: \{
			            data: 'weird name',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			/**
			 * Because of the simpleNames option, 'w-e-i-r-d___n-a-m-e2___l-i-n-k' will be
			 * turned into 'weird___name2___link' and not 'wEIRDNAME2LINK'.
			 */
			test('Basic simpleNames option test with a link that has parameters', () => \{
			  const query = \`\{
			    o_d_d___n_a_m_e \{
			      weird___name2___link \{
			        data
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        o_d_d___n_a_m_e: \{
			          weird___name2___link: \{
			            data: 'weird name 2 param: Charles',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			
			/**
			 * Because of the simpleNames option, 'w-e-i-r-d___n-a-m-e3___l-i-n-k' will be
			 * turned into 'weird___name3___link3' and not 'wEIRDNAME3LINK'.
			 */
			test('Basic simpleNames option test with a link that has exposed parameters', () => \{
			  const query = \`\{
			    o_d_d___n_a_m_e \{
			      weird___name3___link (funky___parameter: "Brittany") \{
			        data
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        o_d_d___n_a_m_e: \{
			          weird___name3___link: \{
			            data: 'weird name 3 param: Brittany',
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api5.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api6.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import \{ graphql, parse, validate, GraphQLSchema \} from 'graphql';
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ Options \} from '../src/openapi-to-graphql/types/options';
			import \{ startServer, stopServer \} from './example_api6_server';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/example_oas6.json');
			const PORT = 3008;
			// Update PORT for this test case:
			oas.servers[0].variables.port.default = String(PORT);
			
			let createdSchema: GraphQLSchema;
			
			/**
			 * Set up the schema first and run example API server
			 */
			beforeAll(() => \{
			  return Promise.all([
			    openAPIToGraphQL.createGraphQLSchema(oas, \{ fetch \}).then((\{ schema \}) => \{
			      createdSchema = schema;
			    \}),
			    startServer(PORT),
			  ]);
			\});
			
			/**
			 * Shut down API server
			 */
			afterAll(() => \{
			  return stopServer();
			\});
			
			test('Option requestOptions should work with links', () => \{
			  // Verifying the behavior of the link by itself
			  const query = \`\{
			    object \{
			      object2Link \{
			        data
			      \}
			      withParameter: object2Link (specialheader: "extra data")\{
			        data
			      \}
			    \}
			  \}\`;
			
			  const promise = graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result.data).toEqual(\{
			      object: \{
			        object2Link: \{
			          data: 'object2',
			        \},
			        withParameter: \{
			          data: "object2 with special header: 'extra data'",
			        \},
			      \},
			    \});
			  \});
			
			  const options: Options<any, any, any> = \{
			    fetch,
			    requestOptions: \{
			      headers: \{
			        specialheader: 'requestOptions',
			      \},
			    \},
			  \};
			
			  const query2 = \`\{
			    object \{
			      object2Link \{
			        data
			      \}
			    \}
			  \}\`;
			
			  const promise2 = openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query2);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{
			      schema: schema,
			      source: query2,
			    \}).then((result: any) => \{
			      expect(result).toEqual(\{
			        data: \{
			          object: \{
			            object2Link: \{
			              data: "object2 with special header: 'requestOptions'", // Data from requestOptions in a link
			            \},
			          \},
			        \},
			      \});
			    \});
			  \});
			
			  return Promise.all([promise, promise2]);
			\});
			
			// Simple scalar fields on the request body
			test('Simple request body using application/x-www-form-urlencoded', () => \{
			  const query = \`mutation \{
			    postFormUrlEncoded (petInput: \{
			      name: "Mittens",
			      status: "healthy",
			      weight: 6
			    \}) \{
			      name
			      status
			      weight
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result.data).toEqual(\{
			      postFormUrlEncoded: \{
			        name: 'Mittens',
			        status: 'healthy',
			        weight: 6,
			      \},
			    \});
			  \});
			\});
			
			/**
			 * The field 'previousOwner' should be desanitized to 'previous_owner'
			 *
			 * Status is a required field so it is also included
			 */
			test('Request body using application/x-www-form-urlencoded and desanitization of field name', () => \{
			  const query = \`mutation \{
			    postFormUrlEncoded (petInput: \{
			      previousOwner: "Martin",
			      status: "healthy"
			    \}) \{
			      previousOwner
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result.data).toEqual(\{
			      postFormUrlEncoded: \{
			        previousOwner: 'Martin',
			      \},
			    \});
			  \});
			\});
			
			/**
			 * The field 'history' is an object
			 *
			 * Status is a required field so it is also included
			 */
			test('Request body using application/x-www-form-urlencoded containing object', () => \{
			  const query = \`mutation \{
			    postFormUrlEncoded (petInput: \{
			      history: \{
			        data: "Friendly"
			      \}
			      status: "healthy"
			    \}) \{
			      history \{
			        data
			      \}
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result.data).toEqual(\{
			      postFormUrlEncoded: \{
			        history: \{
			          data: 'Friendly',
			        \},
			      \},
			    \});
			  \});
			\});
			
			test('Request body using application/x-www-form-urlencoded containing object with no properties', () => \{
			  const query = \`mutation \{
			    postFormUrlEncoded (petInput: \{
			      history2: \{
			        data: "Friendly"
			      \}
			      status: "healthy"
			    \}) \{
			      history2
			    \}
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result.data).toEqual(\{
			      postFormUrlEncoded: \{
			        history2: \{
			          data: 'Friendly',
			        \},
			      \},
			    \});
			  \});
			\});
			
			/**
			 * '/cars/\{id\}' should create a 'car' field
			 *
			 * Also the path parameter just contains the term 'id'
			 */
			test('inferResourceNameFromPath() field with simple plural form', () => \{
			  const query = \`\{
			    car (id: "Super Speed")
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result.data).toEqual(\{
			      car: 'Car ID: Super Speed',
			    \});
			  \});
			\});
			
			//
			/**
			 * '/cacti/\{cactusId\}' should create an 'cactus' field
			 *
			 * Also the path parameter is the combination of the singular form and 'id'
			 */
			test('inferResourceNameFromPath() field with irregular plural form', () => \{
			  const query = \`\{
			    cactus (cactusId: "Spikey")
			  \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result.data).toEqual(\{
			      cactus: 'Cactus ID: Spikey',
			    \});
			  \});
			\});
			
			/**
			 * '/eateries/\{eatery\}/breads/\{breadName\}/dishes/\{dishKey\}/ should create an
			 * 'eateryBreadDish' field
			 *
			 * The path parameters are the singular form, some combination with the term
			 * 'name', and some combination with the term 'key'
			 */
			test('inferResourceNameFromPath() field with long path', () => \{
			  const query = \`\{
			  eateryBreadDish(eatery: "Mike's", breadName:"challah", dishKey: "bread pudding")
			 \}\`;
			
			  return graphql(\{ schema: createdSchema, source: query \}).then((result: any) => \{
			    expect(result.data).toEqual(\{
			      eateryBreadDish: "Parameters combined: Mike's challah bread pudding",
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api6.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api_combined.test.ts', () => {
        const sourceCode = `
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import \{ graphql, parse, validate \} from 'graphql';
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ Options \} from '../src/openapi-to-graphql/types/options';
			import \{ startServer, stopServer \} from './example_api_server';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const oas = require('./fixtures/example_oas_combined.json');
			const PORT = 3010;
			// Update PORT for this test case:
			oas.servers[0].variables.port.default = String(PORT);
			
			/**
			 * Set up the schema first and run example API server
			 */
			beforeAll(() => \{
			  return Promise.all([
			    openAPIToGraphQL.createGraphQLSchema(oas, \{
			      fillEmptyResponses: true,
			      fetch,
			    \}),
			    startServer(PORT),
			  ]);
			\});
			
			/**
			 * Shut down API server
			 */
			afterAll(() => \{
			  return stopServer();
			\});
			
			test('addLimitArgument and allOf', () => \{
			  const options: Options<any, any, any> = \{
			    addLimitArgument: true,
			    fetch,
			  \};
			
			  const query = \`query \{
			    cars(limit: 1) \{
			      model
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result.data.cars.length).toEqual(1);
			    \});
			  \});
			\});
			
			test('addLimitArgument but no value provided', () => \{
			  const options: Options<any, any, any> = \{
			    addLimitArgument: true,
			    fetch,
			  \};
			
			  const query = \`query \{
			    cars \{
			      model
			    \}
			  \}\`;
			
			  return openAPIToGraphQL.createGraphQLSchema(oas, options).then((\{ schema \}) => \{
			    const ast = parse(query);
			    const errors = validate(schema, ast);
			    expect(errors).toEqual([]);
			    return graphql(\{ schema, source: query \}).then((result: any) => \{
			      expect(result.errors).toBeUndefined();
			      expect(result.data.cars.length).toEqual(4);
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\example_api_combined.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\government_social_work.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import \{ createGraphQLSchema \} from '../src/openapi-to-graphql';
			import * as Oas3Tools from '../src/openapi-to-graphql/oas_3_tools';
			import \{ GraphQLSchema, parse, validate \} from 'graphql';
			
			/**
			 * Set up the schema first
			 */
			const oas = require('./fixtures/government_social_work.json');
			
			let createdSchema: GraphQLSchema;
			beforeAll(async () => \{
			  const \{ schema \} = await createGraphQLSchema(oas);
			  createdSchema = schema;
			\});
			
			test('All query endpoints present', () => \{
			  let oasGetCount = 0;
			  for (const path in oas.paths) \{
			    for (const method in oas.paths[path]) \{
			      if (method === 'get') oasGetCount++;
			    \}
			  \}
			  const gqlTypes = Object.keys(createdSchema.getQueryType().getFields()).length;
			  expect(gqlTypes).toEqual(oasGetCount);
			\});
			
			test('All mutation endpoints present', () => \{
			  let oasMutCount = 0;
			  for (const path in oas.paths) \{
			    for (const method in oas.paths[path]) \{
			      if (Oas3Tools.isHttpMethod(method) && method !== 'get') oasMutCount++;
			    \}
			  \}
			  const gqlTypes = Object.keys(createdSchema.getMutationType().getFields()).length;
			  expect(gqlTypes).toEqual(oasMutCount);
			\});
			
			test('Get resource', () => \{
			  const query = \`\{
			    assessmentTypes (
			      contentType: ""
			      acceptLanguage: ""
			      userAgent:""
			      apiVersion:"1.1.0"
			      offset: "40"
			      limit: "test"
			    ) \{
			      data \{
			        assessmentTypeId
			      \}
			    \}
			  \}\`;
			  const ast = parse(query);
			  const errors = validate(createdSchema, ast);
			  expect(errors).toEqual([]);
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\government_social_work.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\handler.spec.ts', () => {
        const sourceCode = `
			import OpenAPIHandler from '../src';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ resolve \} from 'path';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ printSchemaWithDirectives \} from '@graphql-tools/utils';
			import \{ InMemoryStoreStorageAdapter, MeshStore \} from '@graphql-mesh/store';
			import \{ DefaultLogger \} from '@graphql-mesh/utils';
			
			describe('openapi', () => \{
			  it('should create a GraphQL schema from a simple local swagger file', async () => \{
			    const handler = new OpenAPIHandler(\{
			      baseDir: __dirname,
			      logger: new DefaultLogger('TEST'),
			      importFn: m => import(m),
			      name: 'Instagram',
			      config: \{
			        source: resolve(__dirname, './fixtures/instagram.json'),
			      \},
			      pubsub: new PubSub(),
			      cache: new InMemoryLRUCache(),
			      store: new MeshStore('openapi', new InMemoryStoreStorageAdapter(), \{
			        readonly: false,
			        validate: false,
			      \}),
			    \});
			    const source = await handler.getMeshSource();
			
			    expect(printSchemaWithDirectives(source.schema)).toMatchSnapshot();
			  \});
			
			  it('should create a GraphQL schema from some complex local swagger file', async () => \{
			    const handler = new OpenAPIHandler(\{
			      baseDir: __dirname,
			      logger: new DefaultLogger('TEST'),
			      importFn: m => import(m),
			      name: 'Kubernetes',
			      config: \{
			        source: resolve(__dirname, './fixtures/kubernetes.json'),
			      \},
			      pubsub: new PubSub(),
			      cache: new InMemoryLRUCache(),
			      store: new MeshStore('openapi', new InMemoryStoreStorageAdapter(), \{
			        readonly: false,
			        validate: false,
			      \}),
			    \});
			    const source = await handler.getMeshSource();
			
			    expect(printSchemaWithDirectives(source.schema)).toMatchSnapshot();
			  \});
			
			  it('should create a GraphQL schema from a simple local openapi file, adding limit arg', async () => \{
			    const handler = new OpenAPIHandler(\{
			      baseDir: __dirname,
			      logger: new DefaultLogger('TEST'),
			      importFn: m => import(m),
			      name: 'Example OAS3',
			      config: \{
			        source: resolve(__dirname, './fixtures/example_oas_combined.json'),
			        operationIdFieldNames: true,
			      \},
			      pubsub: new PubSub(),
			      cache: new InMemoryLRUCache(),
			      store: new MeshStore('openapi', new InMemoryStoreStorageAdapter(), \{
			        readonly: false,
			        validate: false,
			      \}),
			    \});
			    const source = await handler.getMeshSource();
			    expect(
			      source.schema
			        .getQueryType()
			        .getFields()
			        .getAllCars.args.some(it => it.name === 'limit')
			    ).toBe(true);
			  \});
			
			  it('should create a GraphQL schema from a simple local openapi file, without limit arg', async () => \{
			    const handler = new OpenAPIHandler(\{
			      baseDir: __dirname,
			      logger: new DefaultLogger('TEST'),
			      importFn: m => import(m),
			      name: 'Example OAS3',
			      config: \{
			        source: resolve(__dirname, './fixtures/example_oas_combined.json'),
			        addLimitArgument: false,
			        operationIdFieldNames: true,
			      \},
			      pubsub: new PubSub(),
			      cache: new InMemoryLRUCache(),
			      store: new MeshStore('openapi', new InMemoryStoreStorageAdapter(), \{
			        readonly: false,
			        validate: false,
			      \}),
			    \});
			    const source = await handler.getMeshSource();
			    expect(
			      source.schema
			        .getQueryType()
			        .getFields()
			        .getAllCars.args.some(it => it.name === 'limit')
			    ).toBe(false);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\ibm_language_translator.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ GraphQLSchema, GraphQLObjectType \} from 'graphql';
			import \{ fetch \} from 'cross-undici-fetch';
			
			/**
			 * Set up the schema first
			 */
			const oas = require('./fixtures/ibm_language_translator.json');
			
			let createdSchema: GraphQLSchema;
			beforeAll(() => \{
			  return openAPIToGraphQL.createGraphQLSchema(oas, \{ fetch \}).then((\{ schema, report \}) => \{
			    createdSchema = schema;
			  \});
			\});
			
			test('All IBM Language Translator query endpoints present', () => \{
			  let oasGetCount = 0;
			  for (const path in oas.paths) \{
			    for (const method in oas.paths[path]) \{
			      if (method === 'get') oasGetCount++;
			    \}
			  \}
			  const gqlTypes = Object.keys(
			    (createdSchema.getQueryType().getFields().viewerAnyAuth.type as GraphQLObjectType).getFields()
			  ).length;
			
			  expect(gqlTypes).toEqual(oasGetCount);
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\ibm_language_translator.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\instagram.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ GraphQLSchema, GraphQLObjectType \} from 'graphql/type';
			import \{ fetch \} from 'cross-undici-fetch';
			
			/**
			 * Set up the schema first
			 */
			const oas = require('./fixtures/instagram.json');
			
			let createdSchema: GraphQLSchema;
			beforeAll(() => \{
			  return openAPIToGraphQL.createGraphQLSchema(oas, \{ fetch \}).then((\{ schema, report \}) => \{
			    createdSchema = schema;
			  \});
			\});
			
			test('All Instagram query endpoints present', () => \{
			  let oasGetCount = 0;
			  for (const path in oas.paths) \{
			    for (const method in oas.paths[path]) \{
			      if (method === 'get') oasGetCount++;
			    \}
			  \}
			  const gqlTypes = Object.keys(
			    (createdSchema.getQueryType().getFields().viewerAnyAuth.type as GraphQLObjectType).getFields()
			  ).length;
			  expect(gqlTypes).toEqual(oasGetCount);
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\instagram.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\json-like-body.test.ts', () => {
        const sourceCode = `
			import \{ printSchema \} from 'graphql';
			import \{ createGraphQLSchema \} from '../src/openapi-to-graphql';
			
			describe('JSON Like Bodies', () => \{
			  it('should treat */* as application/json', async () => \{
			    const openAPISchema = \{
			      openapi: '3.0.1',
			      info: \{
			        title: 'OpenAPI definition',
			        version: 'v0',
			      \},
			      servers: [
			        \{
			          url: 'https://not-real.com',
			          description: 'Generated server url',
			        \},
			      ],
			      paths: \{
			        '/api/v1/countries': \{
			          get: \{
			            tags: ['Attributes'],
			            operationId: 'retrieveCountries',
			            responses: \{
			              '200': \{
			                description: 'OK',
			                content: \{
			                  '*/*': \{
			                    schema: \{
			                      type: 'array',
			                      items: \{
			                        \$ref: '#/components/schemas/Country',
			                      \},
			                    \},
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \},
			        '/api/v1/provinces/country/\{countryID\}': \{
			          get: \{
			            tags: ['Attributes'],
			            operationId: 'retrieveProvinces',
			            parameters: [
			              \{
			                name: 'countryID',
			                in: 'path',
			                required: true,
			                schema: \{
			                  type: 'string',
			                \},
			              \},
			            ],
			            responses: \{
			              '200': \{
			                description: 'OK',
			                content: \{
			                  '*/*': \{
			                    schema: \{
			                      type: 'array',
			                      items: \{
			                        \$ref: '#/components/schemas/Province',
			                      \},
			                    \},
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \},
			      \},
			      components: \{
			        schemas: \{
			          Country: \{
			            type: 'object',
			            properties: \{
			              code: \{
			                type: 'string',
			              \},
			              name: \{
			                type: 'string',
			              \},
			              id: \{
			                type: 'string',
			              \},
			            \},
			          \},
			          Province: \{
			            type: 'object',
			            properties: \{
			              country: \{
			                \$ref: '#/components/schemas/Country',
			              \},
			              name: \{
			                type: 'string',
			              \},
			              id: \{
			                type: 'string',
			              \},
			            \},
			          \},
			        \},
			      \},
			    \};
			    const graphQLSchema = await createGraphQLSchema(openAPISchema as any);
			    expect(printSchema(graphQLSchema.schema)).toMatchSnapshot('*/* snapshot');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\json-like-body.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\oas_3_tools.test.ts', () => {
        const sourceCode = `
			/* eslint-disable camelcase */
			// Copyright IBM Corp. 2017. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			import * as Oas3Tools from '../src/openapi-to-graphql/oas_3_tools';
			
			/* globals test, expect */
			
			const \{ GraphQLSchema, GraphQLObjectType, GraphQLString, graphql \} = require('graphql');
			
			test('Applying sanitize multiple times does not change outcome', () => \{
			  const str = 'this Super*annoying-string()';
			  const once = Oas3Tools.sanitize(str, Oas3Tools.CaseStyle.PascalCase);
			  const twice = Oas3Tools.sanitize(once, Oas3Tools.CaseStyle.PascalCase);
			  expect(twice).toEqual(once);
			\});
			
			test('Sanitize object keys', () => \{
			  const obj = \{
			    a_key: \{
			      'b&**key': 'test !!',
			    \},
			  \};
			  const clean = Oas3Tools.sanitizeObjectKeys(obj);
			  expect(clean).toEqual(\{
			    aKey: \{
			      bKey: 'test !!',
			    \},
			  \});
			\});
			
			test('Sanitize object keys including array', () => \{
			  const obj = \{
			    a_key: \{
			      'b&**key': 'test !!',
			      'asf blah': [\{ 'a)(a': 'test2' \}],
			    \},
			  \};
			  const clean = Oas3Tools.sanitizeObjectKeys(obj);
			  expect(clean).toEqual(\{
			    aKey: \{
			      bKey: 'test !!',
			      asfBlah: [
			        \{
			          aA: 'test2',
			        \},
			      ],
			    \},
			  \});
			\});
			
			test('Sanitize object keys when given an array', () => \{
			  const obj = [
			    \{
			      'a)(a': \{
			        b_2: 'test',
			      \},
			    \},
			  ];
			  const clean = Oas3Tools.sanitizeObjectKeys(obj);
			  expect(clean).toEqual([
			    \{
			      aA: \{
			        b2: 'test',
			      \},
			    \},
			  ]);
			\});
			
			const mapping = \{
			  productId: 'product-id',
			  productName: 'product-name',
			  productTag: 'product-tag',
			\};
			
			test('Desanitize object keys', () => \{
			  const obj = \{
			    productId: '123',
			    info: \{
			      productName: 'Soccer',
			    \},
			  \};
			  const raw = Oas3Tools.desanitizeObjectKeys(obj, mapping);
			  expect(raw).toEqual(\{
			    'product-id': '123',
			    info: \{
			      'product-name': 'Soccer',
			    \},
			  \});
			\});
			
			test('Desanitize object keys including array', () => \{
			  const obj = \{
			    productId: \{
			      info: [\{ productName: 'test1' \}, \{ productTag: 'test2' \}],
			    \},
			  \};
			  const clean = Oas3Tools.desanitizeObjectKeys(obj, mapping);
			  expect(clean).toEqual(\{
			    'product-id': \{
			      info: [\{ 'product-name': 'test1' \}, \{ 'product-tag': 'test2' \}],
			    \},
			  \});
			\});
			
			test('Desanitize object keys when given an array', () => \{
			  const obj = [
			    \{
			      productName: \{
			        productTag: 'test',
			      \},
			    \},
			  ];
			  const clean = Oas3Tools.desanitizeObjectKeys(obj, mapping);
			  expect(clean).toEqual([
			    \{
			      'product-name': \{
			        'product-tag': 'test',
			      \},
			    \},
			  ]);
			\});
			
			test('Desanitize object keys with null value', () => \{
			  const obj: any = \{
			    productId: null,
			  \};
			  const raw = Oas3Tools.desanitizeObjectKeys(obj, mapping);
			  expect(raw).toEqual(\{
			    'product-id': null,
			  \});
			\});
			
			test('Properly treat null values during sanitization', () => \{
			  const schema = new GraphQLSchema(\{
			    query: new GraphQLObjectType(\{
			      name: 'Query',
			      fields: \{
			        User: \{
			          name: 'name',
			          type: new GraphQLObjectType(\{
			            name: 'user',
			            fields: \{
			              name: \{
			                type: GraphQLString,
			              \},
			            \},
			          \}),
			          resolve: (root: any, args: any, context: any) => \{
			            const data: any = \{
			              name: null,
			            \};
			            return Oas3Tools.sanitizeObjectKeys(data);
			          \},
			        \},
			      \},
			    \}),
			  \});
			
			  const query = \`\{
			    User \{
			      name
			    \}
			  \}\`;
			
			  graphql(\{ schema, source: query \}).then((result: any) => \{
			    expect(result).toEqual(\{
			      data: \{
			        User: \{
			          name: null,
			        \},
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\oas_3_tools.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\stripe.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ GraphQLSchema, GraphQLObjectType \} from 'graphql';
			import \{ fetch \} from 'cross-undici-fetch';
			
			/**
			 * Set up the schema first
			 */
			const oas = require('./fixtures/stripe.json');
			
			let createdSchema: GraphQLSchema;
			beforeAll(() => \{
			  return openAPIToGraphQL.createGraphQLSchema(oas, \{ fetch \}).then((\{ schema \}) => \{
			    createdSchema = schema;
			  \});
			\});
			
			test('All Stripe query endpoints present', () => \{
			  let oasGetCount = 0;
			  for (const path in oas.paths) \{
			    for (const method in oas.paths[path]) \{
			      if (method === 'get') oasGetCount++;
			    \}
			  \}
			  const gqlTypes = Object.keys(
			    (createdSchema.getQueryType().getFields().viewerAnyAuth.type as GraphQLObjectType).getFields()
			  ).length;
			
			  expect(gqlTypes).toEqual(oasGetCount);
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\stripe.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\weather_underground.test.ts', () => {
        const sourceCode = `
			// Copyright IBM Corp. 2017,2018. All Rights Reserved.
			// Node module: openapi-to-graphql
			// This file is licensed under the MIT License.
			// License text available at https://opensource.org/licenses/MIT
			
			'use strict';
			
			/* globals beforeAll, test, expect */
			
			import * as openAPIToGraphQL from '../src/openapi-to-graphql/index';
			import \{ GraphQLSchema \} from 'graphql';
			import \{ fetch \} from 'cross-undici-fetch';
			import \{ getValidOAS3 \} from '../src/openapi-to-graphql/oas_3_tools';
			
			/**
			 * Set up the schema first
			 */
			const oas = require('./fixtures/weather_underground.json');
			
			let createdSchema: GraphQLSchema;
			beforeAll(async () => \{
			  const validOas = await getValidOAS3(oas);
			  const \{ schema \} = await openAPIToGraphQL.createGraphQLSchema(validOas, \{ fetch \});
			  createdSchema = schema;
			\});
			
			test('All Weather Underground query endpoints present', () => \{
			  let oasGetCount = 0;
			  for (const path in oas.paths) \{
			    for (const method in oas.paths[path]) \{
			      if (method === 'get') oasGetCount++;
			    \}
			  \}
			  const gqlTypes = Object.keys(createdSchema.getQueryType().getFields()).length;
			  expect(gqlTypes).toEqual(oasGetCount);
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\openapi\\test\\weather_underground.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\postgraphile\\test\\cli.spec.ts', () => {
        const sourceCode = `
			describe('runtime', () => \{
			  it('dummy', async () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\postgraphile\\test\\cli.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\soap\\test\\handler.spec.ts', () => {
        const sourceCode = `
			describe('soap', () => \{
			  it('dummy', async () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\soap\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\thrift\\test\\handler.spec.ts', () => {
        const sourceCode = `
			import ThriftHandler from '../src';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ join \} from 'path';
			import \{ printSchema \} from 'graphql';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ InMemoryStoreStorageAdapter, MeshStore \} from '@graphql-mesh/store';
			import \{ DefaultLogger \} from '@graphql-mesh/utils';
			
			describe('thrift', () => \{
			  it('should create a GraphQL Schema from Thrift IDL', async () => \{
			    const thriftHandler = new ThriftHandler(\{
			      name: 'Twitter',
			      config: \{
			        idl: join(__dirname, './fixtures/twitter.thrift'),
			        hostName: 'localhost',
			        port: 4444,
			        path: '/twitter',
			        serviceName: 'twitter-service',
			      \},
			      cache: new InMemoryLRUCache(),
			      pubsub: new PubSub(),
			      store: new MeshStore('.mesh', new InMemoryStoreStorageAdapter(), \{ readonly: false, validate: false \}),
			      baseDir: __dirname,
			      logger: new DefaultLogger('TEST'),
			      importFn: m => import(m),
			    \});
			    const source = await thriftHandler.getMeshSource();
			    expect(printSchema(source.schema)).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\thrift\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\handlers\\tuql\\test\\handler.spec.ts', () => {
        const sourceCode = `
			describe('tuql', () => \{
			  it('dummy', () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\handlers\\tuql\\test\\handler.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\json-machete\\tests\\compareJSONSchemas.test.ts', () => {
        const sourceCode = `
			import \{ compareJSONSchemas \} from '../src/compareJSONSchemas';
			
			describe('compareJSONSchemas', () => \{
			  it('should throw on removed field', async () => \{
			    const oldSchema = \{
			      type: 'object',
			      title: 'Foo',
			      properties: \{
			        id: \{
			          type: 'string',
			        \},
			        bar: \{
			          type: 'string',
			        \},
			      \},
			    \} as const;
			
			    const newSchema = \{
			      type: 'object',
			      title: 'Foo',
			      properties: \{
			        id: \{
			          type: 'string',
			        \},
			      \},
			    \} as const;
			
			    try \{
			      await compareJSONSchemas(oldSchema, newSchema);
			      expect(true).toBe(false);
			    \} catch (e) \{
			      expect(e.errors).toBeDefined();
			      const errors = [...e.errors];
			      expect(errors).toHaveLength(2);
			      expect(errors[0].message).toBe(\`/properties/bar/type is changed from string to undefined\`);
			      expect(errors[1].message).toBe(\`/properties doesn't have bar\`);
			    \}
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\json-machete\\tests\\compareJSONSchemas.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\json-machete\\tests\\dereferenceObject.test.ts', () => {
        const sourceCode = `
			import \{ JSONSchemaObject \} from '@json-schema-tools/meta-schema';
			import \{ dereferenceObject \} from '../src/dereferenceObject';
			
			describe('dereferenceObject', () => \{
			  it('should resolve all \$ref', async () => \{
			    const schema = \{
			      \$ref: '#/definitions/Container',
			      definitions: \{
			        Container: \{
			          type: 'object',
			          title: 'Container',
			          properties: \{
			            authors: \{
			              type: 'array',
			              items: \{
			                \$ref: '#/definitions/Author',
			              \},
			            \},
			            posts: \{
			              type: 'array',
			              items: \{
			                \$ref: '#/definitions/Post',
			              \},
			            \},
			          \},
			        \},
			        Author: \{
			          type: 'object',
			          title: 'Author',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			            name: \{
			              type: 'string',
			            \},
			          \},
			        \},
			        Post: \{
			          type: 'object',
			          title: 'Post',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			            title: \{
			              type: 'string',
			            \},
			            content: \{
			              type: 'string',
			            \},
			            author: \{
			              \$ref: '#/definitions/Author',
			            \},
			          \},
			        \},
			      \},
			    \};
			    const result = await dereferenceObject<JSONSchemaObject>(schema);
			    expect(result.title).toBe('Container');
			    expect(result.properties.posts.items.title).toBe('Post');
			    expect(result.properties.posts.items.properties.author.title).toBe('Author');
			    expect(result.properties.posts.items.properties.author === result.properties.authors.items).toBeTruthy();
			  \});
			  it('should dereference external references', async () => \{
			    const result = await dereferenceObject<JSONSchemaObject>(
			      \{
			        \$ref: './fixtures/PostsResponse.json',
			      \},
			      \{
			        cwd: __dirname,
			      \}
			    );
			    expect(result.title).toBe('PostsResponse');
			    expect(result.properties.items.items.title).toBe('Post');
			    expect(result.properties.items.items.properties.author.title).toBe('Author');
			  \});
			  it('should dereference OpenAPI schemas', async () => \{
			    const openapiSchema = \{
			      openapi: '3.0.0',
			      info: \{
			        version: '1.0.0',
			        title: 'Swagger Petstore',
			        license: \{
			          name: 'MIT',
			        \},
			      \},
			      servers: [
			        \{
			          url: 'http://petstore.swagger.io/v1',
			        \},
			      ],
			      paths: \{
			        '/pets': \{
			          get: \{
			            summary: 'List all pets',
			            operationId: 'listPets',
			            tags: ['pets'],
			            parameters: [
			              \{
			                name: 'limit',
			                in: 'query',
			                description: 'How many items to return at one time (max 100)',
			                required: false,
			                schema: \{
			                  type: 'integer',
			                  format: 'int32',
			                \},
			              \},
			            ],
			            responses: \{
			              '200': \{
			                description: 'A paged array of pets',
			                headers: \{
			                  'x-next': \{
			                    description: 'A link to the next page of responses',
			                    schema: \{
			                      type: 'string',
			                    \},
			                  \},
			                \},
			                content: \{
			                  'application/json': \{
			                    schema: \{
			                      \$ref: '#/components/schemas/Pets',
			                    \},
			                  \},
			                \},
			              \},
			              default: \{
			                description: 'unexpected error',
			                content: \{
			                  'application/json': \{
			                    schema: \{
			                      \$ref: '#/components/schemas/Error',
			                    \},
			                  \},
			                \},
			              \},
			            \},
			          \},
			          post: \{
			            summary: 'Create a pet',
			            operationId: 'createPets',
			            tags: ['pets'],
			            responses: \{
			              '201': \{
			                description: 'Null response',
			              \},
			              default: \{
			                description: 'unexpected error',
			                content: \{
			                  'application/json': \{
			                    schema: \{
			                      \$ref: '#/components/schemas/Error',
			                    \},
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \},
			        '/pets/\{petId\}': \{
			          get: \{
			            summary: 'Info for a specific pet',
			            operationId: 'showPetById',
			            tags: ['pets'],
			            parameters: [
			              \{
			                name: 'petId',
			                in: 'path',
			                required: true,
			                description: 'The id of the pet to retrieve',
			                schema: \{
			                  type: 'string',
			                \},
			              \},
			            ],
			            responses: \{
			              '200': \{
			                description: 'Expected response to a valid request',
			                content: \{
			                  'application/json': \{
			                    schema: \{
			                      \$ref: '#/components/schemas/Pet',
			                    \},
			                  \},
			                \},
			              \},
			              default: \{
			                description: 'unexpected error',
			                content: \{
			                  'application/json': \{
			                    schema: \{
			                      \$ref: '#/components/schemas/Error',
			                    \},
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \},
			      \},
			      components: \{
			        schemas: \{
			          Pet: \{
			            type: 'object',
			            required: ['id', 'name'],
			            properties: \{
			              id: \{
			                type: 'integer',
			                format: 'int64',
			              \},
			              name: \{
			                type: 'string',
			              \},
			              tag: \{
			                type: 'string',
			              \},
			            \},
			          \},
			          Pets: \{
			            type: 'array',
			            items: \{
			              \$ref: '#/components/schemas/Pet',
			            \},
			          \},
			          Error: \{
			            type: 'object',
			            required: ['code', 'message'],
			            properties: \{
			              code: \{
			                type: 'integer',
			                format: 'int32',
			              \},
			              message: \{
			                type: 'string',
			              \},
			            \},
			          \},
			        \},
			      \},
			    \};
			    const dereferencedObject = await dereferenceObject(openapiSchema);
			    expect(dereferencedObject.paths['/pets/\{petId\}'].get.responses[200].content['application/json'].schema).toBe(
			      openapiSchema.components.schemas.Pet
			    );
			    expect(dereferencedObject.paths['/pets'].get.responses[200].content['application/json'].schema).toBe(
			      openapiSchema.components.schemas.Pets
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\json-machete\\tests\\dereferenceObject.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('urigo_graphql-mesh\\packages\\json-machete\\tests\\healJSONSchema.test.ts', () => {
        const sourceCode = `
			import \{ JSONSchema, JSONSchemaObject \} from '@json-schema-tools/meta-schema';
			import \{ healJSONSchema \} from '../src/healJSONSchema';
			
			describe('healJSONSchema', () => \{
			  it('should add titles for non-primitive definitions if missing', async () => \{
			    const schema: JSONSchema = \{
			      type: 'object',
			      title: 'SomeSchema',
			      properties: \{
			        foo: \{
			          type: 'string',
			          pattern: '^(\\\\([0-9]\{3\}\\\\))?[0-9]\{3\}-[0-9]\{4\}\$',
			        \},
			        bar: \{
			          type: 'object',
			          properties: \{
			            qux: \{
			              type: 'number',
			              format: 'int64',
			            \},
			          \},
			        \},
			      \},
			    \};
			    const healedSchema = (await healJSONSchema(schema)) as JSONSchemaObject;
			    expect(healedSchema.properties.bar.title).toBe('bar');
			    expect(healedSchema.properties.foo.title).toBe('foo');
			  \});
			  it('should add missing type: object if properties are in the definitions', async () => \{
			    const schema = \{
			      title: 'SomeSchema',
			      properties: \{
			        foo: \{
			          type: 'string',
			        \},
			      \},
			    \};
			    const healedSchema = (await healJSONSchema(schema)) as JSONSchemaObject;
			    expect(healedSchema.type).toBe('object');
			  \});
			  it('should add missing type: array if items are in the definitions', async () => \{
			    const schema = \{
			      title: 'SomeSchema',
			      properties: \{
			        foo: \{
			          items: \{
			            type: 'string',
			          \},
			        \},
			      \},
			    \};
			    const healedSchema = (await healJSONSchema(schema)) as JSONSchemaObject;
			    expect(healedSchema.properties.foo.type).toBe('array');
			  \});
			  it('should add missing properties if required is provided but no properties', async () => \{
			    const schema = \{
			      required: ['foo'],
			    \};
			    const healedSchema = (await healJSONSchema(schema)) as JSONSchemaObject;
			    expect(healedSchema.properties.foo).toBeDefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\json-machete\\tests\\healJSONSchema.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\json-machete\\tests\\referenceJSONSchema.test.ts', () => {
        const sourceCode = `
			import \{ JSONSchemaObject \} from '@json-schema-tools/meta-schema';
			import \{ referenceJSONSchema \} from '../src/referenceJSONSchema';
			
			describe('referenceJSONSchema', () => \{
			  it('should create definitions under definitions prop and put references in other places', async () => \{
			    const Post: JSONSchemaObject = \{
			      type: 'object',
			      title: 'Post',
			      properties: \{
			        id: \{
			          type: 'string',
			        \},
			        title: \{
			          type: 'string',
			        \},
			        content: \{
			          type: 'string',
			        \},
			      \},
			    \};
			    const Author = \{
			      type: 'object',
			      title: 'Author',
			      properties: \{
			        id: \{
			          type: 'string',
			        \},
			        name: \{
			          type: 'string',
			        \},
			        posts: \{
			          type: 'array',
			          items: Post,
			        \},
			      \},
			    \};
			    Post.properties.author = Author;
			    const result = await referenceJSONSchema(\{
			      type: 'object',
			      title: 'Container',
			      properties: \{
			        authors: \{
			          type: 'array',
			          items: Author,
			        \},
			        posts: \{
			          type: 'array',
			          items: Post,
			        \},
			      \},
			    \});
			    expect(result).toStrictEqual(\{
			      \$ref: '#/definitions/Container',
			      definitions: \{
			        Container: \{
			          type: 'object',
			          title: 'Container',
			          properties: \{
			            authors: \{
			              type: 'array',
			              items: \{
			                \$ref: '#/definitions/Author',
			              \},
			            \},
			            posts: \{
			              type: 'array',
			              items: \{
			                \$ref: '#/definitions/Post',
			              \},
			            \},
			          \},
			        \},
			        Author: \{
			          type: 'object',
			          title: 'Author',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			            name: \{
			              type: 'string',
			            \},
			            posts: \{
			              type: 'array',
			              items: \{
			                \$ref: '#/definitions/Post',
			              \},
			            \},
			          \},
			        \},
			        Post: \{
			          type: 'object',
			          title: 'Post',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			            title: \{
			              type: 'string',
			            \},
			            content: \{
			              type: 'string',
			            \},
			            author: \{
			              \$ref: '#/definitions/Author',
			            \},
			          \},
			        \},
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\json-machete\\tests\\referenceJSONSchema.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\loaders\\json-schema\\test\\getComposerFromSchema.test.ts', () => {
        const sourceCode = `
			import \{ getComposerFromJSONSchema \} from '../src/getComposerFromJSONSchema';
			import \{
			  execute,
			  GraphQLBoolean,
			  GraphQLFloat,
			  GraphQLInt,
			  GraphQLString,
			  isListType,
			  isObjectType,
			  isScalarType,
			  parse,
			  printType,
			\} from 'graphql';
			import \{
			  EnumTypeComposer,
			  InputTypeComposer,
			  ListComposer,
			  ObjectTypeComposer,
			  ScalarTypeComposer,
			  SchemaComposer,
			  UnionTypeComposer,
			\} from 'graphql-compose';
			import \{ JSONSchema \} from '@json-schema-tools/meta-schema';
			import \{
			  GraphQLBigInt,
			  GraphQLDateTime,
			  GraphQLEmailAddress,
			  GraphQLIPv4,
			  GraphQLIPv6,
			  GraphQLJSON,
			  GraphQLTime,
			  GraphQLURL,
			\} from 'graphql-scalars';
			import \{ DefaultLogger \} from '@graphql-mesh/utils';
			import \{ printSchemaWithDirectives \} from '@graphql-tools/utils';
			import \{ JSONSchemaObject \} from 'json-machete';
			
			describe('getComposerFromJSONSchema', () => \{
			  const logger = new DefaultLogger('getComposerFromJSONSchema - test');
			  it('should return JSON scalar if given schema is boolean true', async () => \{
			    const result = await getComposerFromJSONSchema(true, logger);
			    expect(result.input.getType()).toBe(GraphQLJSON);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLJSON);
			  \});
			  it('should generate a new scalar type that validates the value against the given pattern in string schema', async () => \{
			    const pattern = '^\\\\d\{10\}\$';
			    const title = 'ExampleRegEx';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'string',
			      pattern,
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    // Scalar types are both input and output types
			    expect(result.input).toBe(result.output);
			    const outputComposer = result.output as ScalarTypeComposer;
			    expect(isScalarType(outputComposer.getType())).toBeTruthy();
			    expect(outputComposer.getTypeName()).toBe(title);
			    const serializeFn = outputComposer.getSerialize();
			    expect(() => serializeFn('not-valid-phone-number')).toThrow();
			    expect(serializeFn('1231231234')).toBe('1231231234');
			  \});
			  it('should generate a new scalar type that validates the value against the given const in string schema', async () => \{
			    const constStr = 'FOO';
			    const title = 'ExampleConst';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'string',
			      const: constStr,
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    // Scalar types are both input and output types
			    expect(result.input).toBe(result.output);
			    const outputComposer = result.output as ScalarTypeComposer;
			    expect(isScalarType(outputComposer.getType())).toBeTruthy();
			    expect(outputComposer.getTypeName()).toBe(title);
			    const serializeFn = outputComposer.getSerialize();
			    expect(() => serializeFn('bar')).toThrow();
			    expect(serializeFn(constStr)).toBe(constStr);
			  \});
			  it('should generate a new enum type from enum schema', async () => \{
			    const enumValues = ['foo', 'bar', 'qux'];
			    const title = 'ExampleEnum';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'string',
			      enum: enumValues,
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    // Enum types are both input and output types
			    expect(result.input).toBe(result.output);
			    const outputComposer = result.output as EnumTypeComposer;
			    expect(outputComposer.toSDL()).toBe(
			      /* GraphQL */ \`
			enum ExampleEnum \{
			  foo
			  bar
			  qux
			\}\`.trim()
			    );
			  \});
			  it('should generate a new enum type from enum schema by sanitizing enum keys', async () => \{
			    const enumValues = ['0-foo', '1+bar', '2)qux'];
			    const title = 'ExampleEnum';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'string',
			      enum: enumValues,
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    // Enum types are both input and output types
			    expect(result.input).toBe(result.output);
			    const outputComposer = result.output as EnumTypeComposer;
			    expect(outputComposer.toSDL()).toMatchInlineSnapshot(\`
			      "enum ExampleEnum \{
			        _0_foo
			        _1_PLUS_bar
			        _2_RIGHT_PARENTHESIS_qux
			      \}"
			    \`);
			  \});
			  it('should generate union types from oneOf object types', async () => \{
			    const inputSchema: JSONSchema = \{
			      title: 'User',
			      type: 'object',
			      oneOf: [
			        \{
			          title: 'Writer',
			          type: 'object',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			            name: \{
			              type: 'string',
			            \},
			            posts: \{
			              type: 'array',
			              items: \{
			                title: 'Post',
			                type: 'object',
			                properties: \{
			                  id: \{
			                    type: 'string',
			                  \},
			                  title: \{
			                    type: 'string',
			                  \},
			                  content: \{
			                    type: 'string',
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \},
			        \{
			          title: 'Admin',
			          type: 'object',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			            name: \{
			              type: 'string',
			            \},
			            permissions: \{
			              type: 'array',
			              items: \{
			                title: 'AdminPermission',
			                type: 'string',
			                enum: ['edit', 'delete'],
			              \},
			            \},
			          \},
			        \},
			      ],
			    \};
			    const outputSchema = /* GraphQL */ \`
			union User = Writer | Admin
			
			type Writer \{
			  id: String
			  name: String
			  posts: [Post]
			\}
			
			\$\{printType(GraphQLString)\}
			
			type Post \{
			  id: String
			  title: String
			  content: String
			\}
			
			type Admin \{
			  id: String
			  name: String
			  permissions: [AdminPermission]
			\}
			
			enum AdminPermission \{
			  edit
			  delete
			\}
			    \`.trim();
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    const unionComposer = result.output as UnionTypeComposer;
			    expect(
			      unionComposer.toSDL(\{
			        deep: true,
			      \})
			    ).toBe(outputSchema);
			  \});
			  it('should generate an input union type for oneOf definitions that contain scalar types', async () => \{
			    const title = 'ExampleOneOf';
			    const inputSchema: JSONSchema = \{
			      title,
			      oneOf: [
			        \{
			          type: 'string',
			        \},
			        \{
			          type: 'object',
			          title: 'ExampleObject',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			          \},
			        \},
			      ],
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(
			      (result.input as InputTypeComposer).toSDL(\{
			        deep: true,
			      \})
			    ).toBe(
			      /* GraphQL */ \`
			input ExampleOneOf_Input @oneOf \{
			  String: String
			  ExampleObject_Input: ExampleObject_Input
			\}
			
			\$\{printType(GraphQLString)\}
			
			input ExampleObject_Input \{
			  id: String
			\}
			    \`.trim()
			    );
			  \});
			  it('should generate merged object types from allOf definitions', async () => \{
			    const inputSchema: JSONSchema = \{
			      title: 'ExampleAllOf',
			      allOf: [
			        \{
			          type: 'object',
			          title: 'Foo',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			          \},
			          required: ['id'],
			        \},
			        \{
			          type: 'object',
			          title: 'Bar',
			          properties: \{
			            name: \{
			              type: 'string',
			            \},
			          \},
			          required: ['name'],
			        \},
			      ],
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect((result.input as InputTypeComposer).toSDL()).toBe(
			      /* GraphQL */ \`
			input ExampleAllOf_Input \{
			  id: String!
			  name: String!
			\}
			    \`.trim()
			    );
			    expect((result.output as InputTypeComposer).toSDL()).toBe(
			      /* GraphQL */ \`
			type ExampleAllOf \{
			  id: String!
			  name: String!
			\}
			    \`.trim()
			    );
			  \});
			  it('should generate container types and fields for allOf definitions that contain scalar types', async () => \{
			    const title = 'ExampleAllOf';
			    const inputSchema: JSONSchema = \{
			      title,
			      allOf: [
			        \{
			          type: 'string',
			        \},
			        \{
			          type: 'object',
			          title: 'ExampleObject',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			          \},
			        \},
			      ],
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    const outputComposer = result.output as ObjectTypeComposer;
			    expect(isObjectType(outputComposer.getType())).toBeTruthy();
			    expect(outputComposer.getTypeName()).toBe(title);
			    expect(outputComposer.getFieldNames().includes('String')).toBeTruthy();
			    expect(outputComposer.getFieldNames().includes('id')).toBeTruthy();
			  \});
			  it('should generate correct types for anyOf definitions', async () => \{
			    const inputSchema: JSONSchema = \{
			      title: 'ExampleAnyOf',
			      anyOf: [
			        \{
			          type: 'object',
			          title: 'Foo',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			          \},
			          required: ['id'],
			        \},
			        \{
			          type: 'object',
			          title: 'Bar',
			          properties: \{
			            name: \{
			              type: 'string',
			            \},
			          \},
			          required: ['name'],
			        \},
			      ],
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect((result.input as InputTypeComposer).toSDL()).toBe(
			      /* GraphQL */ \`
			input ExampleAnyOf_Input \{
			  id: String!
			  name: String!
			\}
			    \`.trim()
			    );
			    expect((result.output as InputTypeComposer).toSDL()).toBe(
			      /* GraphQL */ \`
			type ExampleAnyOf \{
			  id: String!
			  name: String!
			\}
			    \`.trim()
			    );
			  \});
			  it('should generate container types and fields for anyOf definitions that contain scalar types', async () => \{
			    const title = 'ExampleAnyOf';
			    const inputSchema: JSONSchema = \{
			      title,
			      allOf: [
			        \{
			          type: 'string',
			        \},
			        \{
			          type: 'object',
			          title: 'ExampleObject',
			          properties: \{
			            id: \{
			              type: 'string',
			            \},
			          \},
			        \},
			      ],
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    const outputComposer = result.output as ObjectTypeComposer;
			    expect(isObjectType(outputComposer.getType())).toBeTruthy();
			    expect(outputComposer.getTypeName()).toBe(title);
			    expect(outputComposer.getFieldNames().includes('String')).toBeTruthy();
			    expect(outputComposer.getFieldNames().includes('id')).toBeTruthy();
			  \});
			  it('should return Boolean for boolean definition', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'boolean',
			    \};
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			
			    expect(result.input.getType()).toBe(GraphQLBoolean);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLBoolean);
			  \});
			  it('should return Void for null definition', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'null',
			    \};
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			
			    expect(result.input.getType().name).toBe('Void');
			    expect((result.output as ScalarTypeComposer).getType().name).toBe('Void');
			  \});
			  it('should return BigInt for int64 definition', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'integer',
			      format: 'int64',
			    \};
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			
			    expect(result.input.getType()).toBe(GraphQLBigInt);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLBigInt);
			  \});
			  it('should return Int for int32 definition', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'integer',
			      format: 'int32',
			    \};
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			
			    expect(result.input.getType()).toBe(GraphQLInt);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLInt);
			  \});
			  it('should return Int for integer definitions without format', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'integer',
			    \};
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			
			    expect(result.input.getType()).toBe(GraphQLInt);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLInt);
			  \});
			  it('should return Float for number definition', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'number',
			    \};
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			
			    expect(result.input.getType()).toBe(GraphQLFloat);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLFloat);
			  \});
			  it('should generate scalar types for minLength definition', async () => \{
			    const title = 'NonEmptyString';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'string',
			      minLength: 1,
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    const inputComposer = result.input as ScalarTypeComposer;
			    expect(inputComposer).toBe(result.output);
			    expect(inputComposer.getTypeName()).toBe(title);
			    const serializeFn = inputComposer.getSerialize();
			    expect(() => serializeFn('')).toThrow();
			    expect(serializeFn('aa')).toBe('aa');
			  \});
			  it('should generate scalar types for maxLength definition', async () => \{
			    const title = 'NonEmptyString';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'string',
			      maxLength: 2,
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    const inputComposer = result.input as ScalarTypeComposer;
			    expect(inputComposer).toBe(result.output);
			    expect(inputComposer.getTypeName()).toBe(title);
			    const serializeFn = inputComposer.getSerialize();
			    expect(() => serializeFn('aaa')).toThrow();
			    expect(serializeFn('a')).toBe('a');
			  \});
			  it('should generate scalar types for both minLength and maxLength definition', async () => \{
			    const title = 'NonEmptyString';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'string',
			      minLength: 1,
			      maxLength: 2,
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    const inputComposer = result.input as ScalarTypeComposer;
			    expect(inputComposer).toBe(result.output);
			    expect(inputComposer.getTypeName()).toBe(title);
			    const serializeFn = inputComposer.getSerialize();
			    expect(() => serializeFn('aaa')).toThrow();
			    expect(() => serializeFn('')).toThrow();
			    expect(serializeFn('a')).toBe('a');
			  \});
			  it('should return DateTime scalar for date-time format', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'string',
			      format: 'date-time',
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(result.input.getType()).toBe(GraphQLDateTime);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLDateTime);
			  \});
			  it('should return Time scalar for time format', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'string',
			      format: 'time',
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(result.input.getType()).toBe(GraphQLTime);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLTime);
			  \});
			  it('should return EmailAddress scalar for email format', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'string',
			      format: 'email',
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(result.input.getType()).toBe(GraphQLEmailAddress);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLEmailAddress);
			  \});
			  it('should return IPv4 scalar for email format', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'string',
			      format: 'ipv4',
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(result.input.getType()).toBe(GraphQLIPv4);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLIPv4);
			  \});
			  it('should return IPv6 scalar for email format', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'string',
			      format: 'ipv6',
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(result.input.getType()).toBe(GraphQLIPv6);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLIPv6);
			  \});
			  it('should return URL scalar for uri format', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'string',
			      format: 'uri',
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(result.input.getType()).toBe(GraphQLURL);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLURL);
			  \});
			  it('should return String for string definitions without format', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'string',
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(result.input.getType()).toBe(GraphQLString);
			    expect((result.output as ScalarTypeComposer).getType()).toBe(GraphQLString);
			  \});
			  it('should return list type for array definitions with items as object', async () => \{
			    const inputSchema: JSONSchema = \{
			      type: 'array',
			      items: \{
			        type: 'string',
			      \},
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(isListType(result.input.getType())).toBeTruthy();
			    expect((result.input as ListComposer).ofType.getType()).toBe(GraphQLString);
			    expect(isListType((result.output as ListComposer).getType())).toBeTruthy();
			    expect((result.output as ListComposer).ofType.getType()).toBe(GraphQLString);
			  \});
			  it('should return generic JSON type for array definitions with contains', async () => \{
			    const title = 'ExampleArray';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'array',
			      contains: \{
			        type: 'string',
			      \},
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(result.input).toBe(result.output);
			    const outputComposer = result.output as ListComposer;
			    expect(isListType(outputComposer.getType())).toBeTruthy();
			    expect(isScalarType(outputComposer.ofType.getType())).toBeTruthy();
			    expect(outputComposer.ofType.getTypeName()).toBe(title);
			  \});
			  it('should return union type inside a list type if array definition has items as an array', async () => \{
			    const title = 'FooOrBar';
			    const inputSchema: JSONSchema = \{
			      title: 'ExampleObject',
			      type: 'object',
			      properties: \{
			        fooOrBar: \{
			          title,
			          type: 'array',
			          items: [
			            \{
			              title: 'Foo',
			              type: 'object',
			              properties: \{
			                id: \{
			                  type: 'string',
			                \},
			              \},
			            \},
			            \{
			              title: 'Bar',
			              type: 'object',
			              properties: \{
			                name: \{
			                  type: 'string',
			                \},
			              \},
			            \},
			          ],
			        \},
			      \},
			    \};
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(
			      (result.output as ObjectTypeComposer).toSDL(\{
			        deep: true,
			      \})
			    ).toBe(
			      /* GraphQL */ \`
			type ExampleObject \{
			  fooOrBar: [FooOrBar]
			\}
			
			union FooOrBar = Foo | Bar
			
			type Foo \{
			  id: String
			\}
			
			\$\{printType(GraphQLString)\}
			
			type Bar \{
			  name: String
			\}
			\`.trim()
			    );
			  \});
			  it('should create correct object types from object definition', async () => \{
			    const title = 'ExampleObject';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'object',
			      properties: \{
			        id: \{
			          type: 'string',
			        \},
			      \},
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect((result.input as InputTypeComposer).toSDL()).toBe(
			      /* GraphQL */ \`
			input ExampleObject_Input \{
			  id: String
			\}
			     \`.trim()
			    );
			    expect((result.output as InputTypeComposer).toSDL()).toBe(
			      /* GraphQL */ \`
			type ExampleObject \{
			  id: String
			\}
			     \`.trim()
			    );
			  \});
			  it('should create correct object types from object definition with additionalProperties', async () => \{
			    const title = 'ExampleObject';
			    const inputSchema: JSONSchema = \{
			      title,
			      type: 'object',
			      properties: \{
			        id: \{
			          type: 'string',
			        \},
			      \},
			      additionalProperties: \{
			        type: 'string',
			      \},
			    \};
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			    expect((result.input as InputTypeComposer).toSDL()).toContain(
			      /* GraphQL */ \`
			scalar ExampleObject_Input
			     \`.trim()
			    );
			    expect((result.output as InputTypeComposer).toSDL()).toBe(
			      /* GraphQL */ \`
			type ExampleObject \{
			  id: String
			  additionalProperties: JSON
			\}
			     \`.trim()
			    );
			  \});
			  it('should return GraphQLSchema if object definition given with _schema title', async () => \{
			    const inputSchema: JSONSchema = \{
			      title: '_schema',
			      type: 'object',
			      properties: \{
			        query: \{
			          title: 'Query',
			          type: 'object',
			          properties: \{
			            foo: \{
			              type: 'string',
			            \},
			          \},
			        \},
			      \},
			    \};
			    const \{ output \} = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(output instanceof SchemaComposer).toBeTruthy();
			    expect((output as SchemaComposer).toSDL()).toContain(
			      /* GraphQL */ \`
			type Query \{
			  foo: String
			\}
			     \`.trim()
			    );
			  \});
			  it('should return Query type if object definition given with Query title', async () => \{
			    const inputSchema: JSONSchema = \{
			      title: 'Query',
			      type: 'object',
			      properties: \{
			        foo: \{
			          type: 'string',
			        \},
			      \},
			    \};
			    const \{ output \} = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(output instanceof ObjectTypeComposer).toBeTruthy();
			    expect((output as SchemaComposer).toSDL()).toContain(
			      /* GraphQL */ \`
			type Query \{
			  foo: String
			\}
			     \`.trim()
			    );
			  \});
			  it('should return Mutation type if object definition given with Query title', async () => \{
			    const inputSchema: JSONSchema = \{
			      title: 'Mutation',
			      type: 'object',
			      properties: \{
			        foo: \{
			          type: 'string',
			        \},
			      \},
			    \};
			    const \{ output \} = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(output instanceof ObjectTypeComposer).toBeTruthy();
			    expect((output as SchemaComposer).toSDL()).toContain(
			      /* GraphQL */ \`
			type Mutation \{
			  foo: String
			\}
			     \`.trim()
			    );
			  \});
			  it('should return Subscription type if object definition given with Subscription title', async () => \{
			    const inputSchema: JSONSchema = \{
			      title: 'Subscription',
			      type: 'object',
			      properties: \{
			        foo: \{
			          type: 'string',
			        \},
			      \},
			    \};
			    const \{ output \} = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(output instanceof ObjectTypeComposer).toBeTruthy();
			    expect((output as SchemaComposer).toSDL()).toContain(
			      /* GraphQL */ \`
			type Subscription \{
			  foo: String
			\}
			     \`.trim()
			    );
			  \});
			  it('should add arguments to Query fields with the object definition QueryTitle', async () => \{
			    const inputSchema: JSONSchema = \{
			      title: '_schema',
			      type: 'object',
			      properties: \{
			        query: \{
			          title: 'Query',
			          type: 'object',
			          properties: \{
			            foo: \{
			              type: 'string',
			            \},
			          \},
			        \},
			        queryInput: \{
			          title: 'QueryInput',
			          type: 'object',
			          properties: \{
			            foo: \{
			              title: 'Foo',
			              type: 'object',
			              properties: \{
			                bar: \{
			                  type: 'string',
			                \},
			              \},
			            \},
			          \},
			        \},
			      \},
			    \};
			    const \{ output \} = await getComposerFromJSONSchema(inputSchema, logger);
			    expect(output instanceof SchemaComposer).toBeTruthy();
			    expect((output as SchemaComposer).toSDL()).toBe(
			      /* GraphQL */ \`
			type Query \{
			  foo(input: Foo_Input): String
			\}
			
			\$\{printType(GraphQLString)\}
			
			input Foo_Input \{
			  bar: String
			\}
			     \`.trim()
			    );
			  \});
			  it('should choose correct type in union type generated from oneOf', async () => \{
			    const FooOrBar = \{
			      title: 'FooOrBar',
			      oneOf: [
			        \{
			          title: 'Foo',
			          type: 'object',
			          properties: \{
			            fooId: \{
			              type: 'string',
			            \},
			          \},
			          required: ['fooId'],
			        \},
			        \{
			          title: 'Bar',
			          type: 'object',
			          properties: \{
			            barId: \{
			              type: 'string',
			            \},
			          \},
			        \},
			      ],
			    \};
			    const inputSchema: JSONSchema = \{
			      title: '_schema',
			      type: 'object',
			      properties: \{
			        query: \{
			          title: 'Query',
			          type: 'object',
			          properties: \{
			            fooOrBarButFoo: FooOrBar,
			            fooOrBarButBar: FooOrBar,
			          \},
			        \},
			      \},
			    \};
			
			    const result = await getComposerFromJSONSchema(inputSchema, logger);
			
			    const schemaComposer = result.output as SchemaComposer;
			    const fooId = 'FOO_ID';
			    const barId = 'BAR_ID';
			    schemaComposer.addResolveMethods(\{
			      Query: \{
			        fooOrBarButFoo: () => (\{
			          fooId: 'FOO_ID',
			        \}),
			        fooOrBarButBar: () => (\{
			          barId: 'BAR_ID',
			        \}),
			      \},
			    \});
			    const schema = schemaComposer.buildSchema();
			    const executionResponse: any = await execute(\{
			      schema,
			      document: parse(/* GraphQL */ \`
			        fragment FooOrBarFragment on FooOrBar \{
			          __typename
			          ... on Foo \{
			            fooId
			          \}
			          ... on Bar \{
			            barId
			          \}
			        \}
			        query TestQuery \{
			          fooOrBarButFoo \{
			            ...FooOrBarFragment
			          \}
			          fooOrBarButBar \{
			            ...FooOrBarFragment
			          \}
			        \}
			      \`),
			    \});
			    expect(executionResponse?.data?.fooOrBarButFoo?.__typename).toBe('Foo');
			    expect(executionResponse?.data?.fooOrBarButFoo?.fooId).toBe(fooId);
			    expect(executionResponse?.data?.fooOrBarButBar?.__typename).toBe('Bar');
			    expect(executionResponse?.data?.fooOrBarButBar?.barId).toBe(barId);
			  \});
			  it('should handle non-string enum values', async () => \{
			    const FooEnum = \{
			      title: 'FooEnum',
			      type: 'string' as const,
			      enum: [-1, 1],
			    \};
			    const \{ output \} = await getComposerFromJSONSchema(FooEnum, logger);
			    expect(output instanceof EnumTypeComposer).toBeTruthy();
			    const enumTypeComposer = output as EnumTypeComposer;
			    const enumValuesMap = enumTypeComposer.getFields();
			    expect(enumValuesMap).toMatchInlineSnapshot(\`
			      Object \{
			        "NEGATIVE_1": Object \{
			          "deprecationReason": undefined,
			          "description": undefined,
			          "directives": Array [],
			          "extensions": Object \{\},
			          "value": -1,
			        \},
			        "_1": Object \{
			          "deprecationReason": undefined,
			          "description": undefined,
			          "directives": Array [],
			          "extensions": Object \{\},
			          "value": 1,
			        \},
			      \}
			    \`);
			  \});
			  it('should handle strings with non-latin characters', async () => \{
			    const FooEnum = \{
			      title: 'FooEnum',
			      type: 'string' as const,
			      enum: ['לא', 'כן'],
			    \};
			
			    const \{ output \} = await getComposerFromJSONSchema(FooEnum, logger);
			    expect(output instanceof EnumTypeComposer).toBeTruthy();
			    const enumTypeComposer = output as EnumTypeComposer;
			    const enumValuesMap = enumTypeComposer.getFields();
			    expect(enumValuesMap).toMatchInlineSnapshot(\`
			      Object \{
			        "_1499__1503_": Object \{
			          "deprecationReason": undefined,
			          "description": undefined,
			          "directives": Array [],
			          "extensions": Object \{\},
			          "value": "כן",
			        \},
			        "_1500__1488_": Object \{
			          "deprecationReason": undefined,
			          "description": undefined,
			          "directives": Array [],
			          "extensions": Object \{\},
			          "value": "לא",
			        \},
			      \}
			    \`);
			  \});
			  it('should handle invalid property names', async () => \{
			    const jsonSchema: JSONSchemaObject = \{
			      type: 'object',
			      title: '_schema',
			      properties: \{
			        query: \{
			          type: 'object',
			          title: 'Query',
			          properties: \{
			            foo: \{
			              type: 'object',
			              title: 'Foo',
			              properties: \{
			                '0Bar': \{
			                  type: 'object',
			                  title: 'Bar',
			                  properties: \{
			                    barId: \{
			                      type: 'string',
			                    \},
			                  \},
			                \},
			                '1Baz': \{
			                  type: 'object',
			                  title: 'Baz',
			                  properties: \{
			                    bazId: \{
			                      type: 'string',
			                    \},
			                  \},
			                \},
			              \},
			            \},
			          \},
			        \},
			        queryInput: \{
			          type: 'object',
			          title: 'QueryInput',
			          properties: \{
			            foo: \{
			              type: 'object',
			              title: 'Foo_Input',
			              properties: \{
			                '0BarId': \{
			                  type: 'string',
			                \},
			                '1BazId': \{
			                  type: 'string',
			                \},
			              \},
			            \},
			          \},
			        \},
			      \},
			    \};
			    const \{ output \} = await getComposerFromJSONSchema(jsonSchema, logger);
			    expect(output instanceof SchemaComposer).toBeTruthy();
			    const schema = (output as SchemaComposer).buildSchema();
			    expect(printSchemaWithDirectives(schema)).toMatchInlineSnapshot(\`
			      "schema \{
			        query: Query
			      \}
			
			      type Query \{
			        foo(input: Foo_Input_Input): Foo
			      \}
			
			      type Foo \{
			        _0Bar: Bar
			        _1Baz: Baz
			      \}
			
			      type Bar \{
			        barId: String
			      \}
			
			      type Baz \{
			        bazId: String
			      \}
			
			      input Foo_Input_Input \{
			        _0BarId: String
			        _1BazId: String
			      \}"
			    \`);
			  \});
			  it('should workaround GraphQLjs falsy enum values bug', async () => \{
			    const values = [0, false, ''];
			    const FooEnum = \{
			      title: 'FooEnum',
			      type: ['number', 'boolean', 'string'] as any,
			      enum: values,
			    \};
			    const \{ output \} = await getComposerFromJSONSchema(FooEnum, logger);
			    expect(output instanceof EnumTypeComposer).toBeTruthy();
			    const enumTypeComposer = output as EnumTypeComposer;
			    const enumValuesMap = enumTypeComposer.getFields();
			    Object.values(enumValuesMap).forEach((valueConfig, i) => \{
			      expect(valueConfig.value).toBe(values[i]?.toString());
			    \});
			    expect.assertions(4);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\loaders\\json-schema\\test\\getComposerFromSchema.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(42)
    });
    it('urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\authentication.test.ts', () => {
        const sourceCode = `
			import \{ execute, parse \} from 'graphql';
			import \{ join \} from 'path';
			import \{ loadGraphQLSchemaFromOpenAPI \} from '../src/loadGraphQLSchemaFromOpenAPI';
			import \{ startServer, stopServer \} from '../../../handlers/openapi/test/example_api_server';
			import \{ fetch \} from 'cross-undici-fetch';
			
			const PORT = 3003;
			const oasFilePath = join(__dirname, '../../../handlers/openapi/test/fixtures/example_oas.json');
			const baseUrl = \`http://localhost:\$\{PORT\}/api\`;
			
			// We don't create viewers for each security scheme definition in OAS like openapi-to-graphql
			// But instead we let user to define them with string interpolation
			// No need to test every single query and mutation because this only tests the interpolation behavior
			
			describe('Authentication', () => \{
			  /**
			   * Set up the schema first and run example API server
			   */
			  beforeAll(async () => \{
			    await startServer(PORT);
			  \});
			  /**
			   * Shut down API server
			   */
			  afterAll(async () => \{
			    await stopServer();
			  \});
			  it('should get patent using basic auth', async () => \{
			    const query = /* GraphQL */ \`
			      query \{
			        get_patent_with_id(patent_id: "100", usernameAndPassword: "arlene123:password123") \{
			          patent_id
			        \}
			      \}
			    \`;
			    const createdSchema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      oasFilePath,
			      baseUrl,
			      operationHeaders: \{
			        authorization: 'Basic \{args.usernameAndPassword|base64\}',
			      \},
			      fetch,
			    \});
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			    expect(result).toEqual(\{
			      data: \{
			        get_patent_with_id: \{
			          patent_id: '100',
			        \},
			      \},
			    \});
			  \});
			  it('Get patent using API key in the header', async () => \{
			    const query = /* GraphQL */ \`
			      query \{
			        get_patent_with_id(patent_id: "100", apiKey: "abcdef") \{
			          patent_id
			        \}
			      \}
			    \`;
			    const createdSchema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      oasFilePath,
			      baseUrl,
			      operationHeaders: \{
			        access_token: '\{args.apiKey\}',
			      \},
			      fetch,
			    \});
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			
			    expect(result).toEqual(\{
			      data: \{
			        get_patent_with_id: \{
			          patent_id: '100',
			        \},
			      \},
			    \});
			  \});
			  it('Get patent using API key in the cookie', async () => \{
			    const query = /* GraphQL */ \`
			      query \{
			        get_patent_with_id(patent_id: "100", apiKey: "abcdef") \{
			          patent_id
			        \}
			      \}
			    \`;
			    const createdSchema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      oasFilePath,
			      baseUrl,
			      operationHeaders: \{
			        cookie: 'access_token=\{args.apiKey\}',
			      \},
			      fetch,
			    \});
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			
			    expect(result).toEqual(\{
			      data: \{
			        get_patent_with_id: \{
			          patent_id: '100',
			        \},
			      \},
			    \});
			  \});
			  it('Get patent using API key in the query string', async () => \{
			    const query = /* GraphQL */ \`
			      query \{
			        get_patent_with_id(patent_id: "100", apiKey: "abcdef") \{
			          patent_id
			        \}
			      \}
			    \`;
			    const createdSchema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      oasFilePath,
			      baseUrl,
			      queryParams: \{
			        access_token: '\{args.apiKey\}',
			      \},
			      fetch,
			    \});
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			
			    expect(result).toEqual(\{
			      data: \{
			        get_patent_with_id: \{
			          patent_id: '100',
			        \},
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\authentication.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\cloudfunction.test.ts', () => {
        const sourceCode = `
			import \{ GraphQLSchema, parse, validate \} from 'graphql';
			import \{ join \} from 'path';
			import \{ loadGraphQLSchemaFromOpenAPI \} from '../src/loadGraphQLSchemaFromOpenAPI';
			import \{ printSchemaWithDirectives \} from '@graphql-tools/utils';
			
			describe('Cloudfunction', () => \{
			  let createdSchema: GraphQLSchema;
			  beforeAll(async () => \{
			    createdSchema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      oasFilePath: join(__dirname, '../../../handlers/openapi/test/fixtures/cloudfunction.json'),
			      operationHeaders: \{
			        Authorization: 'Basic \{args.usernamePassword|base64\}',
			      \},
			      ignoreErrorResponses: true, // Because Error type is invalid in the OAS file
			    \});
			  \});
			  it('should generate correct schema', () => \{
			    expect(printSchemaWithDirectives(createdSchema)).toMatchSnapshot('cloudfunction-schema');
			  \});
			  it('should validate the following query', () => \{
			    const query = /* GraphQL */ \`
			      mutation \{
			        post_test_action_2(input: \{ age: 27 \}, usernamePassword: "test:data") \{
			          payload
			          age
			        \}
			      \}
			    \`;
			    const document = parse(query);
			    const errors = validate(createdSchema, document);
			    expect(errors).toEqual([]);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\cloudfunction.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\docusign.test.ts', () => {
        const sourceCode = `
			import \{ GraphQLSchema \} from 'graphql';
			import \{ join \} from 'path';
			import \{ loadGraphQLSchemaFromOpenAPI \} from '../src/loadGraphQLSchemaFromOpenAPI';
			import \{ printSchemaWithDirectives \} from '@graphql-tools/utils';
			
			describe('Docusign', () => \{
			  let createdSchema: GraphQLSchema;
			  beforeAll(async () => \{
			    createdSchema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      oasFilePath: join(__dirname, '../../../handlers/openapi/test/fixtures/docusign.json'),
			      ignoreErrorResponses: true,
			      // It is not possible to provide a union type with File scalar
			    \});
			  \});
			  it('should generate correct schema', () => \{
			    expect(printSchemaWithDirectives(createdSchema)).toMatchSnapshot('docusign-schema');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\docusign.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\example_api.test.ts', () => {
        const sourceCode = `
			import \{ execute, GraphQLObjectType, GraphQLSchema, parse \} from 'graphql';
			import \{ loadGraphQLSchemaFromOpenAPI \} from '../src/loadGraphQLSchemaFromOpenAPI';
			
			import \{ startServer, stopServer \} from '../../../handlers/openapi/test/example_api_server';
			import \{ join \} from 'path';
			import \{ fetch \} from 'cross-undici-fetch';
			
			let createdSchema: GraphQLSchema;
			const PORT = 3002;
			const baseUrl = \`http://localhost:\$\{PORT\}/api\`;
			
			describe('example_api', () => \{
			  beforeAll(async () => \{
			    createdSchema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      fetch,
			      baseUrl,
			      oasFilePath: join(__dirname, '../../../handlers/openapi/test/fixtures/example_oas.json'),
			    \});
			    await startServer(PORT);
			  \});
			  afterAll(() => stopServer());
			
			  it('should get descriptions', async () => \{
			    // Get all the descriptions of the fields on the GraphQL object type car
			    const carType = createdSchema.getType('car') as GraphQLObjectType;
			    expect(carType).toBeDefined();
			    const carFields = carType.getFields();
			    expect(carFields).toBeDefined();
			    expect(carFields.model.description).toBe('The model of the car.');
			    expect(carFields.color.description).toBe('The color of the car.');
			  \});
			
			  it('should get resource (incl. enum)', async () => \{
			    // Status is an enum
			    const query = /* GraphQL */ \`
			      \{
			        getUserByUsername(username: "arlene") \{
			          name
			          status
			        \}
			      \}
			    \`;
			
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			
			    expect(result).toEqual(\{
			      data: \{ getUserByUsername: \{ name: 'Arlene L McMahon', status: 'staff' \} \},
			    \});
			  \});
			
			  // OAS allows you to define response objects with HTTP code with the XX wildcard syntax
			  it('should get resource with status code: 2XX', async () => \{
			    const query = /* GraphQL */ \`
			      \{
			        getPapers \{
			          name
			          published
			        \}
			      \}
			    \`;
			
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			    expect(result).toEqual(\{
			      data: \{
			        getPapers: [
			          \{ name: 'Deliciousness of apples', published: true \},
			          \{ name: 'How much coffee is too much coffee?', published: false \},
			          \{
			            name: 'How many tennis balls can fit into the average building?',
			            published: true,
			          \},
			        ],
			      \},
			    \});
			  \});
			
			  /**
			   * Some operations do not have a response body.
			   */
			  it('should get resource with no response schema and status code: 204', async () => \{
			    const query = /* GraphQL */ \`
			      \{
			        getBonuses
			      \}
			    \`;
			
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			    expect(result).toEqual(\{
			      data: \{
			        getBonuses: '',
			      \},
			    \});
			  \});
			
			  // Link objects in the OAS allow OtG to create nested GraphQL objects that resolve on different API calls
			  it('should get nested resource via link \$response.body#/...', async () => \{
			    const query = /* GraphQL */ \`
			      \{
			        getUserByUsername(username: "arlene") \{
			          name
			          employerCompany \{
			            legalForm
			          \}
			        \}
			      \}
			    \`;
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			    expect(result).toEqual(\{
			      data: \{
			        getUserByUsername: \{
			          name: 'Arlene L McMahon',
			          employerCompany: \{
			            legalForm: 'public',
			          \},
			        \},
			      \},
			    \});
			  \});
			
			  it('should get nested resource via link \$request.path#/... and \$request.query#/', async () => \{
			    const query = /* GraphQL */ \`
			      \{
			        get_product_with_id(product_id: "123", input: \{ product_tag: "blah" \}) \{
			          product_name
			          reviews \{
			            text
			          \}
			        \}
			      \}
			    \`;
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			    expect(result).toEqual(\{
			      data: \{
			        get_product_with_id: \{
			          product_name: 'Super Product',
			          reviews: [\{ text: 'Great product' \}, \{ text: 'I love it' \}],
			        \},
			      \},
			    \});
			  \});
			
			  // Both an operationId and an operationRef can be used to create a link object
			  it('should get nested resource via link operationRef', async () => \{
			    const query = /* GraphQL */ \`
			      \{
			        get_product_with_id(product_id: "123", input: \{ product_tag: "blah" \}) \{
			          product_name
			          reviewsWithOperationRef \{
			            text
			          \}
			        \}
			      \}
			    \`;
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			    expect(result).toEqual(\{
			      data: \{
			        get_product_with_id: \{
			          product_name: 'Super Product',
			          reviewsWithOperationRef: [\{ text: 'Great product' \}, \{ text: 'I love it' \}],
			        \},
			      \},
			    \});
			  \});
			
			  it('should get nested lists of resources', async () => \{
			    const query = /* GraphQL */ \`
			      \{
			        getUserByUsername(username: "arlene") \{
			          name
			          friends \{
			            name
			            friends \{
			              name
			              friends \{
			                name
			              \}
			            \}
			          \}
			        \}
			      \}
			    \`;
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			    expect(result).toEqual(\{
			      data: \{
			        getUserByUsername: \{
			          name: 'Arlene L McMahon',
			          friends: [
			            \{
			              name: 'William B Ropp',
			              friends: [
			                \{
			                  name: 'William B Ropp',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'John C Barnes',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'Heather J Tate',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			              ],
			            \},
			            \{
			              name: 'John C Barnes',
			              friends: [
			                \{
			                  name: 'William B Ropp',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'John C Barnes',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'Heather J Tate',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			              ],
			            \},
			            \{
			              name: 'Heather J Tate',
			              friends: [
			                \{
			                  name: 'William B Ropp',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'John C Barnes',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			                \{
			                  name: 'Heather J Tate',
			                  friends: [
			                    \{
			                      name: 'William B Ropp',
			                    \},
			                    \{
			                      name: 'John C Barnes',
			                    \},
			                    \{
			                      name: 'Heather J Tate',
			                    \},
			                  ],
			                \},
			              ],
			            \},
			          ],
			        \},
			      \},
			    \});
			  \});
			
			  it('should get nested lists of resources without specifying a path param for the parent resource', async () => \{
			    const query = /* GraphQL */ \`
			      \{
			        getUsers(input: \{ limit: 1 \}) \{
			          name
			          friends \{
			            name
			            friends \{
			              name
			              friends \{
			                name
			              \}
			            \}
			          \}
			        \}
			      \}
			    \`;
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			
			    expect(result).toEqual(\{
			      data: \{
			        getUsers: [
			          \{
			            name: 'Arlene L McMahon',
			            friends: [
			              \{
			                name: 'William B Ropp',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'Heather J Tate',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			              \{
			                name: 'John C Barnes',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'Heather J Tate',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			              \{
			                name: 'Heather J Tate',
			                friends: [
			                  \{
			                    name: 'William B Ropp',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'John C Barnes',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                  \{
			                    name: 'Heather J Tate',
			                    friends: [
			                      \{
			                        name: 'William B Ropp',
			                      \},
			                      \{
			                        name: 'John C Barnes',
			                      \},
			                      \{
			                        name: 'Heather J Tate',
			                      \},
			                    ],
			                  \},
			                ],
			              \},
			            ],
			          \},
			        ],
			      \},
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\example_api.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\example_api_combined.test.ts', () => {
        const sourceCode = `
			import \{ execute, GraphQLSchema, parse \} from 'graphql';
			import \{ join \} from 'path';
			import \{ loadGraphQLSchemaFromOpenAPI \} from '../src/loadGraphQLSchemaFromOpenAPI';
			import \{ printSchemaWithDirectives \} from '@graphql-tools/utils';
			import \{ fetch \} from 'cross-undici-fetch';
			import \{ startServer, stopServer \} from '../../../handlers/openapi/test/example_api_server';
			
			const PORT = 3010;
			const oasFilePath = join(__dirname, '../../../handlers/openapi/test/fixtures/example_oas_combined.json');
			const baseUrl = \`http://localhost:\$\{PORT\}/api\`;
			
			describe('Example API Combined', () => \{
			  let createdSchema: GraphQLSchema;
			  beforeAll(async () => \{
			    await startServer(PORT);
			    createdSchema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      oasFilePath,
			      baseUrl,
			      fetch,
			    \});
			  \});
			  afterAll(async () => \{
			    await stopServer();
			  \});
			  it('should generate correct schema', () => \{
			    expect(printSchemaWithDirectives(createdSchema)).toMatchSnapshot('example_oas_combined-schema');
			  \});
			  it('should handle allOf correctly', async () => \{
			    const query = /* GraphQL */ \`
			      query \{
			        getAllCars \{
			          model
			        \}
			      \}
			    \`;
			    const result = await execute(\{
			      schema: createdSchema,
			      document: parse(query),
			    \});
			    expect(result).toMatchSnapshot('example_oas_combined-query-result');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\example_api_combined.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\multiple-responses-swagger.test.ts', () => {
        const sourceCode = `
			import \{ printSchema \} from 'graphql';
			import \{ join \} from 'path';
			import loadGraphQLSchemaFromOpenAPI from '../src';
			
			describe('Multiple Responses Swagger', () => \{
			  it('should create correct response types with 204 empty response', async () => \{
			    const schema = await loadGraphQLSchemaFromOpenAPI('test', \{
			      oasFilePath: join(__dirname, 'fixtures', 'multiple-responses-swagger.yml'),
			    \});
			    expect(printSchema(schema)).toMatchInlineSnapshot(\`
			      "directive @oneOf on INPUT_OBJECT | FIELD_DEFINITION
			
			      type Query \{
			        \\\\"\\\\"\\\\"Optional extended description in Markdown.\\\\"\\\\"\\\\"
			        foo_by_id: foo_by_id_response
			      \}
			
			      union foo_by_id_response = Foo | Error
			
			      type Foo \{
			        id: String
			      \}
			
			      type Error \{
			        message: String
			        stack: String
			      \}
			
			      type Mutation \{
			        \\\\"\\\\"\\\\"Optional extended description in Markdown.\\\\"\\\\"\\\\"
			        post: post_response
			      \}
			
			      union post_response = Void_container | Error
			
			      type Void_container \{
			        Void: Void
			      \}
			
			      \\\\"\\\\"\\\\"Represents empty values\\\\"\\\\"\\\\"
			      scalar Void"
			    \`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\loaders\\openapi\\tests\\multiple-responses-swagger.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\plugins\\rate-limit\\tests\\rate-limit.spec.ts', () => {
        const sourceCode = `
			/* eslint-disable import/no-extraneous-dependencies */
			import \{ DefaultLogger, PubSub \} from '@graphql-mesh/utils';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import useMeshRateLimit from '../src';
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			import \{ envelop, useSchema \} from '@envelop/core';
			import \{ Logger \} from '@graphql-mesh/types';
			
			describe('Rate Limit Plugin', () => \{
			  let pubsub: PubSub;
			  let cache: InMemoryLRUCache;
			  let logger: Logger;
			
			  beforeEach(() => \{
			    pubsub = new PubSub();
			    cache = new InMemoryLRUCache();
			    logger = new DefaultLogger('test-rate-limit');
			  \});
			
			  afterEach(() => \{
			    pubsub.publish('destroy', \{\} as any);
			  \});
			
			  it('should throw an error if the rate limit is exceeded', async () => \{
			    let numberOfCalls = 0;
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => \{
			            numberOfCalls++;
			            return 'bar';
			          \},
			        \},
			      \},
			    \});
			    const getEnveloped = envelop(\{
			      plugins: [
			        useSchema(schema),
			        useMeshRateLimit(\{
			          config: [
			            \{
			              type: 'Query',
			              field: 'foo',
			              max: 5,
			              ttl: 5000,
			              identifier: '\{context.userId\}',
			            \},
			          ],
			          logger,
			          cache,
			          pubsub,
			        \}),
			      ],
			    \});
			    const query = /* GraphQL */ \`
			      \{
			        foo
			      \}
			    \`;
			    const executeQuery = async () => \{
			      const \{ schema, execute, parse, contextFactory \} = getEnveloped(\{
			        userId: '1',
			      \});
			      return execute(\{
			        schema,
			        document: parse(query),
			        contextValue: await contextFactory(),
			      \});
			    \};
			    for (let i = 0; i < 5; i++) \{
			      const result = await executeQuery();
			
			      expect(result).toEqual(\{
			        data: \{
			          foo: 'bar',
			        \},
			      \});
			    \}
			    const result = await executeQuery();
			
			    // Resolver shouldn't be called
			    expect(numberOfCalls).toBe(5);
			    expect(result.data?.foo).toBeUndefined();
			    const firstError = result.errors?.[0];
			    expect(firstError.message).toBe('Rate limit of "Query.foo" exceeded for "1"');
			    expect(firstError.path).toEqual(['foo']);
			  \});
			  it('should reset tokens when the ttl is expired', async () => \{
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => 'bar',
			        \},
			      \},
			    \});
			    const getEnveloped = envelop(\{
			      plugins: [
			        useSchema(schema),
			        useMeshRateLimit(\{
			          config: [
			            \{
			              type: 'Query',
			              field: 'foo',
			              max: 5,
			              ttl: 1000,
			              identifier: '\{context.userId\}',
			            \},
			          ],
			          cache,
			          pubsub,
			          logger,
			        \}),
			      ],
			    \});
			    const query = /* GraphQL */ \`
			      \{
			        foo
			      \}
			    \`;
			    const executeQuery = async () => \{
			      const \{ schema, execute, parse, contextFactory \} = getEnveloped(\{
			        userId: '1',
			      \});
			      return execute(\{
			        schema,
			        document: parse(query),
			        contextValue: await contextFactory(),
			      \});
			    \};
			    for (let i = 0; i < 5; i++) \{
			      const result = await executeQuery();
			
			      expect(result).toEqual(\{
			        data: \{
			          foo: 'bar',
			        \},
			      \});
			    \}
			    await new Promise(resolve => setTimeout(resolve, 1000));
			    const result = await executeQuery();
			
			    expect(result.errors?.length).toBeFalsy();
			    expect(result.data?.foo).toBe('bar');
			  \});
			  it('should provide different tokens for different identifiers', async () => \{
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => 'bar',
			        \},
			      \},
			    \});
			    const getEnveloped = envelop(\{
			      plugins: [
			        useSchema(schema),
			        useMeshRateLimit(\{
			          config: [
			            \{
			              type: 'Query',
			              field: 'foo',
			              max: 1,
			              ttl: 1000,
			              identifier: '\{context.userId\}',
			            \},
			          ],
			          cache,
			          pubsub,
			          logger,
			        \}),
			      ],
			    \});
			    const query = /* GraphQL */ \`
			      \{
			        foo
			      \}
			    \`;
			
			    for (let i = 0; i < 2; i++) \{
			      const executeQuery = async () => \{
			        const \{ schema, execute, parse, contextFactory \} = getEnveloped(\{
			          userId: \`User\$\{i\}\`,
			        \});
			        return execute(\{
			          schema,
			          document: parse(query),
			          contextValue: await contextFactory(),
			        \});
			      \};
			      const resultSuccessful = await executeQuery();
			
			      expect(resultSuccessful).toEqual(\{
			        data: \{
			          foo: 'bar',
			        \},
			      \});
			
			      const \{ schema, execute, parse, contextFactory \} = getEnveloped(\{
			        userId: \`User\$\{i\}\`,
			      \});
			
			      const resultFails = await execute(\{
			        schema,
			        document: parse(query),
			        contextValue: await contextFactory(),
			      \});
			
			      expect(resultFails.data?.foo).toBeUndefined();
			      const firstError = resultFails.errors?.[0];
			      expect(firstError.message).toBe(\`Rate limit of "Query.foo" exceeded for "User\$\{i\}"\`);
			      expect(firstError.path).toEqual(['foo']);
			    \}
			
			    expect.assertions(8);
			  \});
			  it('should return other fields even if one of them has fails', async () => \{
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			          bar: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => 'FOO',
			          bar: () => 'BAR',
			        \},
			      \},
			    \});
			
			    const getEnveloped = envelop(\{
			      plugins: [
			        useSchema(schema),
			        useMeshRateLimit(\{
			          config: [
			            \{
			              type: 'Query',
			              field: 'foo',
			              max: 1,
			              ttl: 1000,
			              identifier: '\{context.userId\}',
			            \},
			          ],
			          cache,
			          pubsub,
			          logger,
			        \}),
			      ],
			    \});
			
			    const executeQuery = async () => \{
			      const \{ schema, execute, parse, contextFactory \} = getEnveloped(\{
			        userId: 'MYUSER',
			      \});
			      return execute(\{
			        schema,
			        document: parse(/* GraphQL */ \`
			          query TestQuery \{
			            foo
			            bar
			          \}
			        \`),
			        contextValue: await contextFactory(),
			      \});
			    \};
			
			    await executeQuery();
			    const result = await executeQuery();
			    expect(result.data.bar).toBe('BAR');
			    expect(result.errors?.[0]?.message).toBe(\`Rate limit of "Query.foo" exceeded for "MYUSER"\`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\plugins\\rate-limit\\tests\\rate-limit.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\runtime\\test\\runtime.spec.ts', () => {
        const sourceCode = `
			describe('runtime', () => \{
			  it('dummy', async () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\runtime\\test\\runtime.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\store\\test\\mesh-store.spec.ts', () => {
        const sourceCode = `
			import \{
			  ValidationError,
			  InMemoryStoreStorageAdapter,
			  MeshStore,
			  PredefinedProxyOptions,
			  ReadonlyStoreError,
			\} from '../src';
			
			describe('MeshStore and storage', () => \{
			  describe('MeshStore', () => \{
			    const storage = new InMemoryStoreStorageAdapter();
			
			    beforeEach(() => \{
			      storage.clear();
			    \});
			
			    it('should read/write when store is writable', async () => \{
			      const store = new MeshStore('test', storage, \{ readonly: false, validate: false \});
			      const item = store.proxy('file.json', PredefinedProxyOptions.JsonWithoutValidation);
			
			      let value = await item.get();
			      expect(value).toBeUndefined();
			      await item.set(\{ test: 1 \});
			      value = await item.get();
			      expect(value).toBeDefined();
			      expect(value.test).toBe(1);
			    \});
			
			    it('should prevent write when store is readonly', async () => \{
			      expect.assertions(3);
			      const store = new MeshStore('test', storage, \{ readonly: true, validate: false \});
			      const item = store.proxy('file.json', PredefinedProxyOptions.JsonWithoutValidation);
			
			      const value = await item.get();
			      expect(value).toBeUndefined();
			
			      try \{
			        await item.set(\{ test: 1 \});
			      \} catch (e) \{
			        expect(e instanceof ReadonlyStoreError).toBeTruthy();
			        expect(e.message).toBe(
			          \`Unable to set value for "file.json" under "test" because the store is in read-only mode.\`
			        );
			      \}
			    \});
			
			    it('should validate writes and prevent write in case of a validation error', async () => \{
			      expect.assertions(3);
			      const store = new MeshStore('test', storage, \{ readonly: false, validate: true \});
			      const item = store.proxy('file.json', \{
			        codify: value => \`module.exports = \$\{JSON.stringify(value)\}\`,
			        validate: (a: any, b: any) => \{
			          if (a.test === 1 && b.test === 2) \{
			            throw new Error('Validation failed! you changed 1 to 2!');
			          \}
			        \},
			      \});
			
			      try \{
			        await item.set(\{ test: 1 \});
			      \} catch (e) \{
			        // Shouldn't get there, no validations at first write
			        expect(true).toBeFalsy();
			      \}
			
			      try \{
			        await item.set(\{ test: 2 \});
			      \} catch (e) \{
			        expect(e instanceof ValidationError).toBeTruthy();
			        expect(e.message).toBe(
			          \`Validation failed for "file.json" under "test": Validation failed! you changed 1 to 2!\`
			        );
			      \}
			
			      const value = await item.get();
			      expect(value).toStrictEqual(\{
			        test: 1,
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\store\\test\\mesh-store.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\cache\\test\\cache.spec.ts', () => {
        const sourceCode = `
			import \{ YamlConfig, MeshPubSub, KeyValueCache, MeshTransformOptions, ImportFn \} from '@graphql-mesh/types';
			import LocalforageCache from '@graphql-mesh/cache-localforage';
			import \{ addResolversToSchema, makeExecutableSchema \} from '@graphql-tools/schema';
			import \{
			  GraphQLSchema,
			  buildSchema,
			  execute,
			  parse,
			  DocumentNode,
			  GraphQLObjectType,
			  OperationDefinitionNode,
			  FieldNode,
			\} from 'graphql';
			import CacheTransform from '../src';
			import \{ computeCacheKey \} from '../src/compute-cache-key';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import dayjs from 'dayjs';
			import \{ hashObject \} from '@graphql-mesh/string-interpolation';
			
			const wait = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));
			const importFn: ImportFn = m => import(m);
			
			const MOCK_DATA = [
			  \{
			    id: '1',
			    username: 'dotansimha',
			    email: 'dotan@mail.com',
			    profile: \{
			      name: 'Dotan',
			      age: 10,
			    \},
			  \},
			  \{
			    id: '2',
			    username: 'ardatan',
			    email: 'arda@mail.com',
			    profile: \{
			      name: 'Ardatan',
			      age: 12,
			    \},
			  \},
			  \{
			    id: '3',
			    username: 'kamilkisiela',
			    email: 'kamil@mail.com',
			    profile: \{
			      name: 'Kamil',
			      age: 5,
			    \},
			  \},
			];
			
			const spies = \{
			  Mutation: \{
			    updateUser: jest.fn().mockImplementation((_, \{ userId, name \}) => \{
			      const user = MOCK_DATA.find(u => u.id.toString() === userId.toString());
			
			      if (!user) \{
			        throw new Error(\`Unable to find user \$\{userId\}!\`);
			      \}
			
			      user.profile.name = name;
			
			      return user;
			    \}),
			    deleteUser: jest.fn().mockImplementation((_, \{ userIdToDelete \}) => \{
			      const user = MOCK_DATA.find(u => u.id.toString() === userIdToDelete.toString());
			
			      if (!user) \{
			        throw new Error(\`Unable to find user \$\{userIdToDelete\}!\`);
			      \}
			
			      return true;
			    \}),
			  \},
			  Query: \{
			    user: jest.fn().mockImplementation((_, \{ id \}) => \{
			      return MOCK_DATA.find(u => u.id.toString() === id.toString());
			    \}),
			    users: jest.fn().mockImplementation((_, \{ filter \}) => \{
			      if (!filter) \{
			        return MOCK_DATA;
			      \}
			
			      return MOCK_DATA.find(u => \{
			        if (filter.email && u.email === filter.email) \{
			          return true;
			        \}
			        if (filter.username && u.username === filter.username) \{
			          return true;
			        \}
			        if (filter.name && u.profile.name === filter.name) \{
			          return true;
			        \}
			        if (filter.age && u.profile.age === filter.age) \{
			          return true;
			        \}
			
			        return false;
			      \});
			    \}),
			  \},
			  User: \{
			    friend: jest.fn().mockImplementation((_, \{ id \}) => \{
			      return MOCK_DATA.find(u => u.id.toString() === id.toString());
			    \}),
			  \},
			\};
			
			describe('cache', () => \{
			  let schema: GraphQLSchema;
			  let cache: KeyValueCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = undefined;
			
			  beforeEach(() => \{
			    const baseSchema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        user(id: ID!): User
			        users(filter: SearchUsersInput): [User!]!
			      \}
			
			      type Mutation \{
			        updateUser(userId: ID!, name: String!): User
			        deleteUser(userIdToDelete: ID!): Boolean
			      \}
			
			      input SearchUsersInput \{
			        username: String
			        email: String
			        name: String
			        age: String
			      \}
			
			      type User \{
			        id: ID!
			        username: String!
			        email: String!
			        profile: Profile!
			        friend(id: ID!): User
			      \}
			
			      type Profile \{
			        name: String!
			        age: Int!
			      \}
			    \`);
			
			    schema = addResolversToSchema(\{
			      schema: baseSchema,
			      resolvers: spies,
			    \});
			
			    cache = new LocalforageCache();
			    pubsub = new PubSub();
			
			    spies.Query.user.mockClear();
			    spies.Query.users.mockClear();
			  \});
			
			  describe('Resolvers Composition', () => \{
			    it('should replace resolvers correctly with a specific type and field', async () => \{
			      expect(schema.getQueryType()?.getFields().user.resolve.name).toBe(spies.Query.user.bind(null).name);
			
			      const transform = new CacheTransform(\{
			        apiName: 'test',
			        importFn,
			        cache,
			        config: [
			          \{
			            field: 'Query.user',
			          \},
			        ],
			        pubsub,
			        baseDir,
			      \});
			      const modifiedSchema = transform.transformSchema(schema);
			
			      expect(modifiedSchema!.getQueryType()?.getFields().user.resolve.name).not.toBe(spies.Query.user.bind(null).name);
			      expect(modifiedSchema!.getQueryType()?.getFields().users.resolve.name).toBe(spies.Query.users.bind(null).name);
			    \});
			
			    it('should replace resolvers correctly with a wildcard', async () => \{
			      expect(schema.getQueryType()?.getFields().user.resolve.name).toBe(spies.Query.user.bind(null).name);
			      expect(schema.getQueryType()?.getFields().users.resolve.name).toBe(spies.Query.users.bind(null).name);
			
			      const transform = new CacheTransform(\{
			        apiName: 'test',
			        importFn,
			        cache,
			        config: [
			          \{
			            field: 'Query.*',
			          \},
			        ],
			        pubsub,
			        baseDir,
			      \});
			
			      const modifiedSchema = transform.transformSchema(schema);
			
			      expect(modifiedSchema!.getQueryType()?.getFields().user.resolve.name).not.toBe(spies.Query.user.bind(null).name);
			      expect(modifiedSchema!.getQueryType()?.getFields().users.resolve.name).not.toBe(
			        spies.Query.users.bind(null).name
			      );
			    \});
			  \});
			
			  describe('Cache Wrapper', () => \{
			    const checkCache = async (config: YamlConfig.CacheTransformConfig[], cacheKeyToCheck?: string) => \{
			      const transform = new CacheTransform(\{
			        apiName: 'test',
			        importFn,
			        cache,
			        config,
			        pubsub,
			        baseDir,
			      \});
			
			      const modifiedSchema = transform.transformSchema(schema);
			
			      const executeOptions = \{
			        schema: modifiedSchema!,
			        document: parse(/* GraphQL */ \`
			          query user \{
			            user(id: 1) \{
			              id
			              username
			            \}
			          \}
			        \`),
			        contextValue: \{\},
			      \};
			
			      const queryType = schema.getType('Query') as GraphQLObjectType;
			      const queryFields = queryType.getFields();
			      const operation = executeOptions.document.definitions[0] as OperationDefinitionNode;
			      const cacheKey =
			        cacheKeyToCheck ||
			        computeCacheKey(\{
			          keyStr: undefined,
			          args: \{ id: '1' \},
			          info: \{
			            fieldName: 'user',
			            parentType: queryType,
			            returnType: queryFields.user.type,
			            schema,
			            fieldNodes: operation.selectionSet.selections as FieldNode[],
			            fragments: \{\},
			            rootValue: \{\},
			            operation,
			            variableValues: \{\},
			            path: \{
			              prev: null,
			              key: 'user',
			            \},
			          \} as any,
			        \});
			
			      // No data in cache before calling it
			      expect(await cache.get(cacheKey)).not.toBeDefined();
			      // Run it for the first time
			      await execute(executeOptions);
			      // Original resolver should now be called
			      expect(spies.Query.user.mock.calls.length).toBe(1);
			      // Data should be stored in cache
			      const data: any = await cache.get(cacheKey);
			      const mockData = MOCK_DATA[0];
			      expect(data.id).toBe(mockData.id);
			      expect(data.username).toBe(mockData.username);
			      // Running it again
			      await execute(executeOptions);
			      // No new calls to the original resolver
			      expect(spies.Query.user.mock.calls.length).toBe(1);
			
			      return \{
			        cache,
			        executeAgain: () => execute(executeOptions),
			        executeDocument: (operation: DocumentNode, variables: Record<string, any> = \{\}) =>
			          execute(\{
			            schema: modifiedSchema,
			            document: operation,
			            variableValues: variables,
			          \}),
			      \};
			    \};
			
			    it('Should wrap resolver correctly with caching - without cacheKey', async () => \{
			      await checkCache([
			        \{
			          field: 'Query.user',
			        \},
			      ]);
			    \});
			
			    it('Should wrap resolver correctly with caching with custom key', async () => \{
			      const cacheKey = \`customUser\`;
			
			      await checkCache(
			        [
			          \{
			            field: 'Query.user',
			            cacheKey,
			          \},
			        ],
			        cacheKey
			      );
			    \});
			
			    it('Should wrap resolver correctly with caching with custom key', async () => \{
			      const cacheKey = \`customUser\`;
			
			      await checkCache(
			        [
			          \{
			            field: 'Query.user',
			            cacheKey,
			          \},
			        ],
			        cacheKey
			      );
			    \});
			
			    it('Should clear cache correctly when TTL is set', async () => \{
			      const key = 'user-1';
			      const \{ cache, executeAgain \} = await checkCache(
			        [
			          \{
			            field: 'Query.user',
			            cacheKey: key,
			            invalidate: \{
			              ttl: 1,
			            \},
			          \},
			        ],
			        key
			      );
			
			      expect(await cache.get(key)).toBeDefined();
			      await wait(1.1);
			      expect(await cache.get(key)).not.toBeDefined();
			      await executeAgain();
			      expect(await cache.get(key)).toBeDefined();
			    \});
			
			    it('Should wrap resolver correctly with caching with custom calculated key - and ensure calling resovler again when key is different', async () => \{
			      const \{ cache, executeDocument \} = await checkCache(
			        [
			          \{
			            field: 'Query.user',
			            cacheKey: \`query-user-\{args.id\}\`,
			          \},
			        ],
			        'query-user-1'
			      );
			
			      const otherIdQuery = parse(/* GraphQL */ \`
			        query user \{
			          user(id: 2) \{
			            id
			          \}
			        \}
			      \`);
			
			      expect(await cache.get('query-user-2')).not.toBeDefined();
			      await executeDocument(otherIdQuery);
			      const cachedObj: any = await cache.get('query-user-2');
			      const mockObj = MOCK_DATA[1];
			      expect(cachedObj.id).toBe(mockObj.id);
			      expect(spies.Query.user.mock.calls.length).toBe(2);
			      await executeDocument(otherIdQuery);
			      expect(spies.Query.user.mock.calls.length).toBe(2);
			    \});
			
			    it('Should work correctly with argsHash', async () => \{
			      const expectedHash = \`query-user-\$\{hashObject(\{ id: '1' \})\}\`;
			
			      await checkCache(
			        [
			          \{
			            field: 'Query.user',
			            cacheKey: \`query-user-\{argsHash\}\`,
			          \},
			        ],
			        expectedHash
			      );
			    \});
			
			    it('Should work correctly with hash helper', async () => \{
			      const expectedHash = hashObject('1');
			
			      await checkCache(
			        [
			          \{
			            field: 'Query.user',
			            cacheKey: \`\{args.id|hash\}\`,
			          \},
			        ],
			        expectedHash
			      );
			    \});
			
			    it('Should work correctly with date helper', async () => \{
			      const expectedHash = \`1-\$\{dayjs(new Date()).format(\`yyyy-MM-dd\`)\}\`;
			
			      await checkCache(
			        [
			          \{
			            field: 'Query.user',
			            cacheKey: \`\{args.id\}-\{yyyy-MM-dd|date\}\`,
			          \},
			        ],
			        expectedHash
			      );
			    \});
			  \});
			
			  describe('Opration-based invalidation', () => \{
			    it('Should invalidate cache when mutation is done based on key', async () => \{
			      const transform = new CacheTransform(\{
			        apiName: 'test',
			        importFn,
			        config: [
			          \{
			            field: 'Query.user',
			            cacheKey: 'query-user-\{args.id\}',
			            invalidate: \{
			              effectingOperations: [
			                \{
			                  operation: 'Mutation.updateUser',
			                  matchKey: 'query-user-\{args.userId\}',
			                \},
			                \{
			                  operation: 'Mutation.deleteUser',
			                  matchKey: 'query-user-\{args.userIdToDelete\}',
			                \},
			              ],
			            \},
			          \},
			        ],
			        cache,
			        pubsub,
			        baseDir,
			      \});
			
			      const schemaWithCache = transform.transformSchema(schema);
			
			      const expectedCacheKey = \`query-user-1\`;
			
			      const executeOptions = \{
			        schema: schemaWithCache!,
			        document: parse(/* GraphQL */ \`
			          query user \{
			            user(id: 1) \{
			              id
			              name
			            \}
			          \}
			        \`),
			      \};
			
			      // Make sure cache works as needed, runs resolvers logic only once
			      expect(await cache.get(expectedCacheKey)).not.toBeDefined();
			      expect(spies.Query.user.mock.calls.length).toBe(0);
			      await execute(executeOptions);
			      expect(await cache.get(expectedCacheKey)).toBeDefined();
			      expect(spies.Query.user.mock.calls.length).toBe(1);
			      await execute(executeOptions);
			      expect(spies.Query.user.mock.calls.length).toBe(1);
			
			      // Run effecting mutation
			      await execute(\{
			        schema: schemaWithCache!,
			        document: parse(/* GraphQL */ \`
			          mutation updateUser \{
			            updateUser(userId: 1, name: "test new") \{
			              id
			              name
			            \}
			          \}
			        \`),
			      \});
			
			      // Cache should be empty now, no calls for resolvers since then
			      expect(await cache.get(expectedCacheKey)).not.toBeDefined();
			      expect(spies.Query.user.mock.calls.length).toBe(1);
			
			      // Running again query, cache should be filled and resolver should get called again
			      await execute(executeOptions);
			      expect(await cache.get(expectedCacheKey)).toBeDefined();
			      expect(spies.Query.user.mock.calls.length).toBe(2);
			    \});
			
			    describe('Subfields', () => \{
			      it('Should cache queries including subfield arguments', async () => \{
			        const transform = new CacheTransform(\{
			          apiName: 'test',
			          importFn,
			          config: [\{ field: 'Query.user' \}],
			          cache,
			          pubsub,
			          baseDir,
			        \});
			        const schemaWithCache = transform.transformSchema(schema);
			
			        // First query should call resolver and fill cache
			        const executeOptions1 = \{
			          schema: schemaWithCache,
			          document: parse(/* GraphQL */ \`
			            query \{
			              user(id: 1) \{
			                friend(id: 2) \{
			                  id
			                \}
			              \}
			            \}
			          \`),
			        \};
			        const \{ data: actual1 \}: any = await execute(executeOptions1);
			        expect(spies.Query.user.mock.calls.length).toBe(1);
			        expect(actual1.user.friend.id).toBe('2');
			
			        // Second query should call resolver and also fill cache
			        const executeOptions2 = \{
			          schema: schemaWithCache,
			          document: parse(/* GraphQL */ \`
			            query \{
			              user(id: 1) \{
			                friend(id: 3) \{
			                  id
			                \}
			              \}
			            \}
			          \`),
			        \};
			        const \{ data: actual2 \}: any = await execute(executeOptions2);
			        expect(spies.Query.user.mock.calls.length).toBe(2);
			        expect(actual2.user.friend.id).toBe('3');
			
			        // Repeat both queries, no new calls for resolver
			        const \{ data: repeat1 \}: any = await execute(executeOptions1);
			        const \{ data: repeat2 \}: any = await execute(executeOptions2);
			        expect(spies.Query.user.mock.calls.length).toBe(2);
			        expect(repeat1.user.friend.id).toBe('2');
			        expect(repeat2.user.friend.id).toBe('3');
			      \});
			    \});
			
			    describe('Race condition', () => \{
			      it('should wait for local cache transform to finish writing the entry', async () => \{
			        const options: MeshTransformOptions<YamlConfig.CacheTransformConfig[]> = \{
			          apiName: 'test',
			          importFn,
			          config: [
			            \{
			              field: 'Query.foo',
			              cacheKey: 'random',
			            \},
			          ],
			          cache,
			          pubsub,
			          baseDir,
			        \};
			
			        let callCount = 0;
			        const schema = makeExecutableSchema(\{
			          typeDefs: /* GraphQL */ \`
			            type Query \{
			              foo: String
			            \}
			          \`,
			          resolvers: \{
			            Query: \{
			              foo: () => new Promise(resolve => setTimeout(() => resolve((callCount++).toString()), 300)),
			            \},
			          \},
			        \});
			        const transform = new CacheTransform(options);
			        const transformedSchema = transform.transformSchema(schema);
			        const query = /* GraphQL */ \`
			          \{
			            foo1: foo
			            foo2: foo
			          \}
			        \`;
			        const result = await execute(\{
			          schema: transformedSchema,
			          document: parse(query),
			        \});
			
			        expect(result.data.foo2).toBe(result.data.foo1);
			      \});
			
			      it('should wait for other cache transform to finish writing the entry when delay >= safe threshold)', async () => \{
			        let callCount = 0;
			        const options: MeshTransformOptions<YamlConfig.CacheTransformConfig[]> = \{
			          apiName: 'test',
			          importFn,
			          config: [
			            \{
			              field: 'Query.foo',
			              cacheKey: 'random',
			            \},
			          ],
			          cache,
			          pubsub,
			          baseDir,
			        \};
			        function getNewSchema() \{
			          return makeExecutableSchema(\{
			            typeDefs: /* GraphQL */ \`
			              type Query \{
			                foo: String
			              \}
			            \`,
			            resolvers: \{
			              Query: \{
			                foo: async () => \{
			                  callCount++;
			                  await new Promise(resolve => setTimeout(resolve, 300));
			                  return 'FOO';
			                \},
			              \},
			            \},
			          \});
			        \}
			        const transform1 = new CacheTransform(options);
			        const transformedSchema1 = transform1.transformSchema(getNewSchema());
			        const transform2 = new CacheTransform(options);
			        const transformedSchema2 = transform2.transformSchema(getNewSchema());
			        const query = /* GraphQL */ \`
			          \{
			            foo
			          \}
			        \`;
			
			        await execute(\{
			          schema: transformedSchema1,
			          document: parse(query),
			        \});
			        await wait(0);
			        await execute(\{
			          schema: transformedSchema2,
			          document: parse(query),
			        \});
			
			        expect(callCount).toBe(1);
			      \});
			
			      it('should fail to wait for other cache transform to finish writing the entry when delay < safe threshold', async () => \{
			        let callCount = 0;
			        const options: MeshTransformOptions<YamlConfig.CacheTransformConfig[]> = \{
			          apiName: 'test',
			          importFn,
			          config: [
			            \{
			              field: 'Query.foo',
			              cacheKey: 'random',
			            \},
			          ],
			          cache,
			          pubsub,
			          baseDir,
			        \};
			        function getNewSchema() \{
			          return makeExecutableSchema(\{
			            typeDefs: /* GraphQL */ \`
			              type Query \{
			                foo: String
			              \}
			            \`,
			            resolvers: \{
			              Query: \{
			                foo: async () => \{
			                  callCount++;
			                  await new Promise(resolve => setTimeout(resolve, 300));
			                  return 'FOO';
			                \},
			              \},
			            \},
			          \});
			        \}
			        const transform1 = new CacheTransform(options);
			        const transformedSchema1 = transform1.transformSchema(getNewSchema());
			        const transform2 = new CacheTransform(options);
			        const transformedSchema2 = transform2.transformSchema(getNewSchema());
			        const query = /* GraphQL */ \`
			          \{
			            foo
			          \}
			        \`;
			        await Promise.all([
			          execute(\{
			            schema: transformedSchema1,
			            document: parse(query),
			          \}),
			          execute(\{
			            schema: transformedSchema2,
			            document: parse(query),
			          \}),
			        ]);
			        expect(callCount).toBe(2);
			      \});
			    \});
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\cache\\test\\cache.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(15)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\encapsulate\\test\\encapsulate.spec.ts', () => {
        const sourceCode = `
			import Transform from '../src/index';
			import \{ execute, parse, getIntrospectionQuery \} from 'graphql';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ ImportFn, MeshPubSub \} from '@graphql-mesh/types';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			
			describe('encapsulate', () => \{
			  const baseDir: string = undefined;
			  const importFn: ImportFn = m => import(m);
			  const schema = makeExecutableSchema(\{
			    typeDefs: /* GraphQL */ \`
			      type Query \{
			        getSomething: String
			        getSomethingElse: String
			      \}
			
			      type Mutation \{
			        doSomething: String
			        doSomethingElse: String
			      \}
			
			      type Subscription \{
			        notify: String!
			      \}
			    \`,
			    resolvers: \{
			      Query: \{
			        getSomething: () => 'boop',
			      \},
			      Mutation: \{
			        doSomething: () => 'noop',
			      \},
			    \},
			  \});
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			
			  beforeEach(() => \{
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should wrap the schema and group Mutation correctly', async () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new Transform(\{
			          config: \{\},
			          cache,
			          pubsub,
			          baseDir,
			          apiName: 'test',
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getMutationType().getFields().test).toBeDefined();
			    expect(newSchema.getMutationType().getFields().notify).not.toBeDefined();
			    expect(newSchema.getMutationType().getFields().test.type.toString()).toBe('testMutation!');
			  \});
			
			  it('should wrap the schema and group Subscription correctly', async () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new Transform(\{
			          config: \{\},
			          cache,
			          pubsub,
			          baseDir,
			          apiName: 'test',
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getSubscriptionType().getFields().test).toBeDefined();
			    expect(newSchema.getSubscriptionType().getFields().getSomething).not.toBeDefined();
			    expect(newSchema.getSubscriptionType().getFields().test.type.toString()).toBe('testSubscription!');
			  \});
			
			  it('should wrap the schema and group Query correctly', async () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new Transform(\{
			          config: \{\},
			          cache,
			          pubsub,
			          baseDir,
			          apiName: 'test',
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getQueryType().getFields().test).toBeDefined();
			    expect(newSchema.getQueryType().getFields().getSomething).not.toBeDefined();
			    expect(newSchema.getQueryType().getFields().test.type.toString()).toBe('testQuery!');
			  \});
			
			  it('should execute queries the same way and preserve execution flow', async () => \{
			    const \{ data: resultBefore \} = await execute(\{
			      schema,
			      document: parse(\`\{ getSomething \}\`),
			    \});
			    expect(resultBefore.getSomething).toBe('boop');
			
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new Transform(\{
			          config: \{\},
			          cache,
			          pubsub,
			          baseDir,
			          apiName: 'test',
			          importFn,
			        \}),
			      ],
			    \});
			
			    const \{ data: resultAfter \}: any = await execute(\{
			      schema: newSchema,
			      document: parse(\`\{ test \{ getSomething \} \}\`),
			    \});
			
			    expect(resultAfter.test.getSomething).toBe('boop');
			  \});
			
			  it('should execute mutations the same way and preserve execution flow', async () => \{
			    const \{ data: resultBefore \} = await execute(\{
			      schema,
			      document: parse(\`mutation \{ doSomething \}\`),
			    \});
			    expect(resultBefore.doSomething).toBe('noop');
			
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new Transform(\{
			          config: \{\},
			          cache,
			          pubsub,
			          baseDir,
			          apiName: 'test',
			          importFn,
			        \}),
			      ],
			    \});
			
			    const \{ data: resultAfter \}: any = await execute(\{
			      schema: newSchema,
			      document: parse(\`mutation \{ test \{ doSomething \} \}\`),
			    \});
			
			    expect(resultAfter.test.doSomething).toBe('noop');
			  \});
			
			  it("should be able to introspect even it's partial", async () => \{
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          getSomething: String
			          getSomethingElse: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          getSomething: () => 'boop',
			        \},
			      \},
			    \});
			
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new Transform(\{
			          config: \{\},
			          cache,
			          pubsub,
			          baseDir,
			          apiName: 'test',
			          importFn,
			        \}),
			      ],
			    \});
			
			    const \{ data \} = await execute(\{
			      schema: newSchema,
			      document: parse(getIntrospectionQuery()),
			    \});
			
			    expect(data).not.toBeNull();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\encapsulate\\test\\encapsulate.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(6)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\extend\\test\\extend.spec.ts', () => {
        const sourceCode = `
			describe('transform-extend', () => \{
			  it('dummy', () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\extend\\test\\extend.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\federation\\test\\federation.spec.ts', () => {
        const sourceCode = `
			describe('transform-federation', () => \{
			  it('dummy', () => \{\});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\federation\\test\\federation.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\filter-schema\\test\\transform.spec.ts', () => {
        const sourceCode = `
			import \{ buildSchema, printSchema \} from 'graphql';
			import FilterSchemaTransform from '../src';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ ImportFn \} from '@graphql-mesh/types';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			import \{ pruneSchema \} from '@graphql-tools/utils';
			
			describe('filter', () => \{
			  const cache = new InMemoryLRUCache();
			  const pubsub = new PubSub();
			  const baseDir: string = undefined;
			  const importFn: ImportFn = m => import(m);
			
			  it('filters correctly with array of rules', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        posts: [Post]
			      \}
			
			      type Post \{
			        id: ID
			        message: String
			        author: User
			        comments: [Comment]
			      \}
			
			      type Comment \{
			        id: ID
			        message: String
			      \}
			
			      type Query \{
			        user(pk: ID!, name: String, age: Int): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: ['!Comment', 'User.posts.\{message, author\}', 'Query.user.!pk'],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			  posts: [Post]
			\}
			
			type Post \{
			  id: ID
			  message: String
			  author: User
			\}
			
			type Query \{
			  user(name: String, age: Int): User
			\}
			\`.trim()
			    );
			  \});
			
			  it('filters correctly with declarative syntax', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        posts: [Post]
			      \}
			
			      type Post \{
			        id: ID
			        message: String
			        author: User
			        comments: [Comment]
			      \}
			
			      type Comment \{
			        id: ID
			        message: String
			      \}
			
			      type Query \{
			        user(pk: ID!, name: String, age: Int): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: \{ filters: ['!Comment', 'User.posts.\{message, author\}', 'Query.user.!pk'] \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			  posts: [Post]
			\}
			
			type Post \{
			  id: ID
			  message: String
			  author: User
			\}
			
			type Query \{
			  user(name: String, age: Int): User
			\}
			\`.trim()
			    );
			  \});
			
			  it("filters correctly on 'bare' mode", async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        posts: [Post]
			        notifications: [Notification]
			        mentions: [Mention]
			      \}
			
			      type Post \{
			        id: ID
			        message: String
			        author: User
			        comments: [Comment]
			      \}
			
			      type Comment \{
			        id: ID
			        message: String
			      \}
			
			      type Notification \{
			        type: Int
			        content: String
			      \}
			
			      type Mention \{
			        reference: ID
			        link: String
			      \}
			
			      type LooseType \{
			        foo: String
			        bar: String
			      \}
			
			      type Query \{
			        user(pk: ID!, name: String, age: Int): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: \{
			            mode: 'bare',
			            filters: [
			              '!Comment',
			              'Type.!LooseType',
			              'Type.!\{Notification, Mention\}',
			              'Query.user.!\{notifications, mentions\}',
			              'User.posts.\{message, author\}',
			              'Query.user.!pk',
			            ],
			          \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			  posts: [Post]
			\}
			
			type Post \{
			  id: ID
			  message: String
			  author: User
			\}
			
			type Query \{
			  user(name: String, age: Int): User
			\}
			\`.trim()
			    );
			  \});
			
			  it("filters correctly arguments on all fields in Type, with 'bare' mode", async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			      \}
			
			      type Query \{
			        userOne(pk: ID!, name: String, age: Int): User
			        userTwo(pk: ID!, name: String, age: Int): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: \{
			            mode: 'bare',
			            filters: ['Query.*.!pk'],
			          \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			\}
			
			type Query \{
			  userOne(name: String, age: Int): User
			  userTwo(name: String, age: Int): User
			\}
			\`.trim()
			    );
			  \});
			
			  it("filters correctly arguments on all fields in Type, plus specific field arguments; with 'bare' mode", async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			      \}
			
			      type Query \{
			        userOne(pk: ID!, name: String, age: Int): User
			        userTwo(pk: ID!, name: String, age: Int): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: \{
			            mode: 'bare',
			            filters: ['Query.*.!pk', 'Query.userOne.!age'],
			          \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			\}
			
			type Query \{
			  userOne(name: String): User
			  userTwo(name: String, age: Int): User
			\}
			\`.trim()
			    );
			  \});
			
			  it("filters correctly arguments on all fields in Type, with 'wrap' mode", async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			      \}
			
			      type Query \{
			        userOne(pk: ID!, name: String, age: Int): User
			        userTwo(pk: ID!, name: String, age: Int): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: \{
			            mode: 'wrap',
			            filters: ['Query.*.!pk'],
			          \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			\}
			
			type Query \{
			  userOne(name: String, age: Int): User
			  userTwo(name: String, age: Int): User
			\}
			\`.trim()
			    );
			  \});
			
			  it("filters correctly arguments on all fields in Type, plus specific field arguments; with 'wrap' mode", async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			      \}
			
			      type Query \{
			        userOne(pk: ID!, name: String, age: Int): User
			        userTwo(pk: ID!, name: String, age: Int): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: \{
			            mode: 'wrap',
			            filters: ['Query.*.!pk', 'Query.userOne.!age'],
			          \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			\}
			
			type Query \{
			  userOne(name: String): User
			  userTwo(name: String, age: Int): User
			\}
			\`.trim()
			    );
			  \});
			
			  it('should filter out fields', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        a: String
			        b: String
			        c: String
			        d: String
			        e: String
			      \}
			
			      type Book \{
			        id: ID
			        name: String
			        authorId: ID
			        author: User
			      \}
			
			      type Query \{
			        user: User
			        admin: User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: ['User.!\{a,b,c,d,e\}', 'Query.!admin', 'Book.\{id,name,author\}'],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			\}
			
			type Book \{
			  id: ID
			  name: String
			  author: User
			\}
			
			type Query \{
			  user: User
			\}
			\`.trim()
			    );
			  \});
			
			  it('should remove type with pruning if all fields are filtered out', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        foo: String
			        bar: String
			      \}
			      type Mutation \{
			        baz: String
			        qux: String
			      \}
			    \`);
			
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: ['Mutation.!*'],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			    expect(printSchema(pruneSchema(schema)).trim()).toBe(
			      /* GraphQL */ \`
			type Query \{
			  foo: String
			  bar: String
			\}
			\`.trim()
			    );
			  \});
			  it('should filter out fields if array syntax is used only with one element', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        a: String
			        b: String
			        c: String
			        d: String
			        e: String
			      \}
			
			      type Book \{
			        id: ID
			        name: String
			        authorId: ID
			        author: User
			      \}
			
			      type Query \{
			        user: User
			        admin: User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: ['User.\{id, username\}', 'Query.!\{admin\}', 'Book.\{id\}'],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  username: String
			\}
			
			type Book \{
			  id: ID
			\}
			
			type Query \{
			  user: User
			\}
			\`.trim()
			    );
			  \});
			
			  it('should filter out single type, with pending-deprecation syntax', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        a: String
			        b: String
			        c: String
			        d: String
			        e: String
			      \}
			
			      type Book \{
			        id: ID
			        name: String
			        authorId: ID
			        author: User
			      \}
			
			      type Query \{
			        user: User
			        admin: User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: ['!Book'],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			  a: String
			  b: String
			  c: String
			  d: String
			  e: String
			\}
			
			type Query \{
			  user: User
			  admin: User
			\}
			\`.trim()
			    );
			  \});
			
			  it('filters out single type and multiple types rules', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        posts: [Post]
			      \}
			
			      type Post \{
			        id: ID
			        message: String
			        author: User
			      \}
			
			      type Comment \{
			        id: ID
			        message: String
			      \}
			
			      type Notification \{
			        type: Int
			        content: String
			      \}
			
			      type Mention \{
			        reference: ID
			        link: String
			      \}
			
			      type Query \{
			        user(id: ID!): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: \{ mode: 'bare', filters: ['Type.!Comment', 'Type.!\{Notification, Mention\}'] \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			  posts: [Post]
			\}
			
			type Post \{
			  id: ID
			  message: String
			  author: User
			\}
			
			type Query \{
			  user(id: ID!): User
			\}
			\`.trim()
			    );
			  \});
			
			  it('handles whitelist filtering for types correctly', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        posts: [Post]
			      \}
			
			      type Post \{
			        id: ID
			        message: String
			        author: User
			      \}
			
			      type Comment \{
			        id: ID
			        message: String
			      \}
			
			      type Notification \{
			        type: Int
			        content: String
			      \}
			
			      type Mention \{
			        reference: ID
			        link: String
			      \}
			
			      type Query \{
			        user(id: ID!): User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          // bizarre case, but logic should still work
			          config: \{ mode: 'bare', filters: ['Type.\{Query, User, Post, String, ID\}'] \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			  posts: [Post]
			\}
			
			type Post \{
			  id: ID
			  message: String
			  author: User
			\}
			
			type Query \{
			  user(id: ID!): User
			\}
			\`.trim()
			    );
			  \});
			
			  it('should filter out fields of filtered types', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			        a: String
			        b: String
			        c: String
			        d: String
			        e: String
			      \}
			
			      type Book \{
			        id: ID
			        name: String
			        authorId: ID
			        author: User
			      \}
			
			      type Query \{
			        book: Book
			        user: User
			        admin: User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: ['!User'],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    // TODO: temporary fix
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type Book \{
			  id: ID
			  name: String
			  authorId: ID
			\}
			
			type Query \{
			  book: Book
			\}
			\`.trim()
			    );
			  \});
			
			  it('should filter out directive fields of filtered types', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      input AuthRule \{
			        and: [AuthRule]
			        or: [AuthRule]
			        not: AuthRule
			        rule: String
			      \}
			
			      directive @auth(query: AuthRule, add: AuthRule, update: AuthRule, delete: AuthRule, role: String!) on OBJECT
			
			      type User \{
			        id: ID
			        name: String
			        username: String
			        a: String
			        b: String
			        c: String
			        d: String
			        e: String
			      \}
			
			      type Book \{
			        id: ID
			        name: String
			        authorId: ID
			        author: User
			      \}
			
			      type Query \{
			        user: User
			        admin: User
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: ['!AuthRule'],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			directive @auth(role: String!) on OBJECT
			
			type User \{
			  id: ID
			  name: String
			  username: String
			  a: String
			  b: String
			  c: String
			  d: String
			  e: String
			\}
			
			type Book \{
			  id: ID
			  name: String
			  authorId: ID
			  author: User
			\}
			
			type Query \{
			  user: User
			  admin: User
			\}
			\`.trim()
			    );
			  \});
			
			  it('should filter out arguments of root field', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type User \{
			        id: ID
			        name: String
			        username: String
			      \}
			
			      type Book \{
			        id: ID
			        name: String
			        author: User
			      \}
			
			      type Query \{
			        user(pk: ID!, name: String, age: Int): User
			        book(pk: ID!, title: String): Book
			      \}
			    \`);
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        FilterSchemaTransform(\{
			          config: ['Query.user.!\{pk, age\}', 'Query.book.title'],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    expect(printSchema(schema).trim()).toBe(
			      /* GraphQL */ \`
			type User \{
			  id: ID
			  name: String
			  username: String
			\}
			
			type Book \{
			  id: ID
			  name: String
			  author: User
			\}
			
			type Query \{
			  user(name: String): User
			  book(title: String): Book
			\}
			\`.trim()
			    );
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\filter-schema\\test\\transform.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(16)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\hoist-field\\test\\transform.spec.ts', () => {
        const sourceCode = `
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ MeshPubSub \} from '@graphql-mesh/types';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			import \{ buildSchema, GraphQLField, GraphQLObjectType, printSchema \} from 'graphql';
			import \{ defaultImportFn, PubSub \} from '@graphql-mesh/utils';
			
			import HoistFieldTransform from '../src';
			
			describe('hoist', () => \{
			  const importFn = defaultImportFn;
			  const schema = buildSchema(/* GraphQL */ \`
			    type Query \{
			      users(limit: Int!, page: Int): UserSearchResult
			    \}
			
			    type UserSearchResult \{
			      page: Int!
			      results: [User!]!
			    \}
			
			    type User \{
			      id: ID!
			      name: String!
			    \}
			  \`);
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = undefined;
			
			  beforeEach(() => \{
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should hoist field with string pathConfig array', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new HoistFieldTransform(\{
			          config: [
			            \{
			              typeName: 'Query',
			              pathConfig: ['users', 'results'],
			              newFieldName: 'users',
			            \},
			          ],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    expect(queryType).toBeDefined();
			
			    const fields = queryType.getFields();
			    expect(fields.users).toBeDefined();
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should hoist field with mixed pathConfig array', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new HoistFieldTransform(\{
			          config: [
			            \{
			              typeName: 'Query',
			              pathConfig: [
			                \{
			                  fieldName: 'users',
			                  filterArgs: [],
			                \},
			                'results',
			              ],
			              newFieldName: 'users',
			            \},
			          ],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    expect(queryType).toBeDefined();
			
			    const fields = queryType.getFields();
			    expect(fields.users).toBeDefined();
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should hoist field and filter args with global flag', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new HoistFieldTransform(\{
			          config: [
			            \{
			              typeName: 'Query',
			              pathConfig: ['users', 'results'],
			              newFieldName: 'users',
			              filterArgsInPath: true,
			            \},
			          ],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    expect(queryType).toBeDefined();
			
			    const fields = queryType.getFields();
			    expect(fields.users).toBeDefined();
			
			    const args = (fields.users as GraphQLField<any, any>).args;
			    expect(args.length).toEqual(0);
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should hoist field and filter individual args via pathConfig', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new HoistFieldTransform(\{
			          config: [
			            \{
			              typeName: 'Query',
			              pathConfig: [
			                \{
			                  fieldName: 'users',
			                  filterArgs: ['limit'],
			                \},
			                'results',
			              ],
			              newFieldName: 'users',
			            \},
			          ],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    expect(queryType).toBeDefined();
			
			    const fields = queryType.getFields();
			    expect(fields.users).toBeDefined();
			
			    const args = (fields.users as GraphQLField<any, any>).args;
			    expect(args.length).toEqual(1);
			    expect(args[0].name).toEqual('page');
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should hoist field and filter individual args via pathConfig independent of global flag', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new HoistFieldTransform(\{
			          config: [
			            \{
			              typeName: 'Query',
			              pathConfig: [
			                \{
			                  fieldName: 'users',
			                  filterArgs: ['limit'],
			                \},
			                'results',
			              ],
			              newFieldName: 'users',
			              filterArgsInPath: true,
			            \},
			          ],
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    expect(queryType).toBeDefined();
			
			    const fields = queryType.getFields();
			    expect(fields.users).toBeDefined();
			
			    const args = (fields.users as GraphQLField<any, any>).args;
			    expect(args.length).toEqual(1);
			    expect(args[0].name).toEqual('page');
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\hoist-field\\test\\transform.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(5)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\mock\\test\\mocking.spec.ts', () => {
        const sourceCode = `
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			import \{ YamlConfig, MeshPubSub, ImportFn \} from '@graphql-mesh/types';
			import \{ buildSchema, execute, graphql, parse \} from 'graphql';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import MockingTransform from '../src';
			
			describe('mocking', () => \{
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = __dirname;
			  const importFn: ImportFn = m => import(m);
			
			  beforeEach(() => \{
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should mock fields and resolvers should not get called', async () => \{
			    let queryUserCalled = false;
			    let userFullNameCalled = false;
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type User \{
			          id: ID
			          fullName: String
			        \}
			        type Query \{
			          users: [User]
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          users: () => \{
			            queryUserCalled = true;
			            return [\{\}, \{\}, \{\}, \{\}, \{\}, \{\}];
			          \},
			        \},
			        User: \{
			          id: () => 'NOTID',
			          fullName: () => \{
			            userFullNameCalled = true;
			            return 'fullName';
			          \},
			        \},
			      \},
			    \});
			    const mockingConfig: YamlConfig.MockingConfig = \{
			      mocks: [
			        \{
			          apply: 'User.fullName',
			          faker: '\{\{name.lastName\}\}, \{\{name.firstName\}\} \{\{name.suffix\}\}',
			        \},
			      ],
			    \};
			    const transformedSchema = await wrapSchema(\{
			      schema,
			      transforms: [
			        new MockingTransform(\{
			          config: mockingConfig,
			          cache,
			          pubsub,
			          baseDir,
			          apiName: '',
			          importFn,
			        \}),
			      ],
			    \});
			    const result = await graphql(\{
			      schema: transformedSchema,
			      source: /* GraphQL */ \`
			        \{
			          users \{
			            id
			            fullName
			          \}
			        \}
			      \`,
			      contextValue: \{\},
			    \});
			
			    const users = result.data?.users;
			    expect(users).toBeTruthy();
			    expect(users[0]).toBeTruthy();
			    expect(users[0].id).not.toBe('NOTID');
			    expect(users[0].fullName).not.toBe('fullName');
			    expect(queryUserCalled).toBeFalsy();
			    expect(userFullNameCalled).toBeFalsy();
			  \});
			
			  it('should mock fields by using the "custom" property', async () => \{
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type User \{
			          id: ID
			          fullName: String
			        \}
			        type Query \{
			          users: [User]
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          users: () => [],
			        \},
			        User: \{
			          id: () => 'sample-id-coming-from-the-resolver',
			          fullName: () => 'Sample name coming from the resolver',
			        \},
			      \},
			    \});
			
			    const mockingConfig: YamlConfig.MockingConfig = \{
			      mocks: [
			        \{
			          apply: 'User.id',
			          custom: './mocks.ts#id',
			        \},
			        \{
			          apply: 'User.fullName',
			          custom: './mocks.ts#fullName',
			        \},
			      ],
			    \};
			
			    const transformedSchema = await wrapSchema(\{
			      schema,
			      transforms: [
			        new MockingTransform(\{
			          config: mockingConfig,
			          cache,
			          pubsub,
			          baseDir,
			          apiName: '',
			          importFn,
			        \}),
			      ],
			    \});
			
			    const result = await graphql(\{
			      schema: transformedSchema,
			      source: /* GraphQL */ \`
			        \{
			          users \{
			            id
			            fullName
			          \}
			        \}
			      \`,
			      contextValue: \{\},
			    \});
			
			    const users = result.data?.users;
			    expect(users).toBeTruthy();
			    expect(users[0]).toBeTruthy();
			    expect(users[0].id).toBe('sample-id');
			    expect(users[0].fullName).toBe('John Snow');
			  \});
			  it('should custom resolvers work with mock store', async () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        user(id: ID): User
			      \}
			      type Mutation \{
			        addUser(name: String): User
			        updateUser(id: ID, name: String): User
			      \}
			      type User \{
			        id: ID
			        name: String
			      \}
			    \`);
			    const mockedSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new MockingTransform(\{
			          config: \{
			            mocks: [
			              \{
			                apply: 'Query.user',
			                custom: './mocks.ts#GetUserMock',
			              \},
			              \{
			                apply: 'Mutation.addUser',
			                custom: './mocks.ts#AddUserMock',
			              \},
			              \{
			                apply: 'Mutation.updateUser',
			                custom: './mocks.ts#UpdateUserMock',
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			          apiName: '',
			          importFn,
			        \}),
			      ],
			    \});
			    const ADD_USER = parse(/* GraphQL */ \`
			      mutation AddUser \{
			        addUser(name: "John Doe") \{
			          id
			          name
			        \}
			      \}
			    \`);
			    const addUserResult: any = await execute(\{
			      schema: mockedSchema,
			      document: ADD_USER,
			    \});
			    expect(addUserResult?.data?.addUser?.name).toBe('John Doe');
			    const addedUserId = addUserResult.data.addUser.id;
			    const GET_USER = parse(/* GraphQL */ \`
			      query GetUser \{
			        user(id: "\$\{addedUserId\}") \{
			          id
			          name
			        \}
			      \}
			    \`);
			    const getUserResult: any = await execute(\{ schema: mockedSchema, document: GET_USER \});
			    expect(getUserResult?.data?.user?.id).toBe(addedUserId);
			    expect(getUserResult?.data?.user?.name).toBe('John Doe');
			    const UPDATE_USER = parse(/* GraphQL */ \`
			      mutation UpdateUser \{
			        updateUser(id: "\$\{addedUserId\}", name: "Jane Doe") \{
			          id
			          name
			        \}
			      \}
			    \`);
			    const updateUserResult: any = await execute(\{ schema: mockedSchema, document: UPDATE_USER \});
			    expect(updateUserResult?.data?.updateUser?.id).toBe(addedUserId);
			    expect(updateUserResult?.data?.updateUser?.name).toBe('Jane Doe');
			  \});
			  it('should declarative API work with mock store', async () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        user(id: ID): User
			      \}
			      type Mutation \{
			        addUser(name: String): User
			        updateUser(id: ID, name: String): User
			      \}
			      type User \{
			        id: ID
			        name: String
			      \}
			    \`);
			    const mockedSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new MockingTransform(\{
			          config: \{
			            mocks: [
			              \{
			                apply: 'Query.user',
			                store: \{
			                  type: 'User',
			                  key: '\{args.id\}',
			                \},
			              \},
			              \{
			                apply: 'Mutation.addUser',
			                updateStore: [
			                  \{
			                    type: 'User',
			                    key: '\{random\}',
			                    fieldName: 'name',
			                    value: '\{args.name\}',
			                  \},
			                ],
			                store: \{
			                  type: 'User',
			                  key: '\{random\}',
			                \},
			              \},
			              \{
			                apply: 'Mutation.updateUser',
			                updateStore: [
			                  \{
			                    type: 'User',
			                    key: '\{args.id\}',
			                    fieldName: 'name',
			                    value: '\{args.name\}',
			                  \},
			                ],
			                store: \{
			                  type: 'User',
			                  key: '\{args.id\}',
			                \},
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			          apiName: '',
			          importFn,
			        \}),
			      ],
			    \});
			    const ADD_USER = parse(/* GraphQL */ \`
			      mutation AddUser \{
			        addUser(name: "John Doe") \{
			          id
			          name
			        \}
			      \}
			    \`);
			    const addUserResult: any = await execute(\{ schema: mockedSchema, document: ADD_USER \});
			    expect(addUserResult?.data?.addUser?.name).toBe('John Doe');
			    const addedUserId = addUserResult.data.addUser.id;
			    const GET_USER = parse(/* GraphQL */ \`
			      query GetUser \{
			        user(id: "\$\{addedUserId\}") \{
			          id
			          name
			        \}
			      \}
			    \`);
			    const getUserResult: any = await execute(\{ schema: mockedSchema, document: GET_USER \});
			    expect(getUserResult?.data?.user?.id).toBe(addedUserId);
			    expect(getUserResult?.data?.user?.name).toBe('John Doe');
			    const UPDATE_USER = parse(/* GraphQL */ \`
			      mutation UpdateUser \{
			        updateUser(id: "\$\{addedUserId\}", name: "Jane Doe") \{
			          id
			          name
			        \}
			      \}
			    \`);
			    const updateUserResult: any = await execute(\{ schema: mockedSchema, document: UPDATE_USER \});
			    expect(updateUserResult?.data?.updateUser?.id).toBe(addedUserId);
			    expect(updateUserResult?.data?.updateUser?.name).toBe('Jane Doe');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\mock\\test\\mocking.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\naming-convention\\test\\naming-convention.spec.ts', () => {
        const sourceCode = `
			import NamingConventionTransform from '../src/index';
			import \{ buildSchema, printSchema, GraphQLObjectType, GraphQLEnumType, execute, parse \} from 'graphql';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ ImportFn, MeshPubSub \} from '@graphql-mesh/types';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			import \{ addResolversToSchema \} from '@graphql-tools/schema';
			
			describe('namingConvention', () => \{
			  const schema = buildSchema(/* GraphQL */ \`
			    type Query \{
			      user: user!
			      userById(userId: ID!): user!
			    \}
			    type user \{
			      Id: ID!
			      Type: userType
			    \}
			    enum userType \{
			      admin
			      moderator
			      newbie
			    \}
			  \`);
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = undefined;
			  const importFn: ImportFn = m => import(m);
			
			  beforeEach(() => \{
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should change the name of a types, enums, fields and fieldArguments', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new NamingConventionTransform(\{
			          apiName: '',
			          importFn,
			          config: \{
			            typeNames: 'pascalCase',
			            enumValues: 'upperCase',
			            fieldNames: 'camelCase',
			            fieldArgumentNames: 'snakeCase',
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('user')).toBeUndefined();
			    const userObjectType = newSchema.getType('User') as GraphQLObjectType;
			    expect(userObjectType).toBeDefined();
			
			    const userObjectTypeFields = userObjectType.getFields();
			    expect(userObjectTypeFields.Id).toBeUndefined();
			    expect(userObjectTypeFields.id).toBeDefined();
			
			    expect(newSchema.getType('userType')).toBeUndefined();
			    const userTypeEnumType = newSchema.getType('UserType') as GraphQLEnumType;
			    expect(userTypeEnumType).toBeDefined();
			    expect(userTypeEnumType.getValue('Admin')).toBeUndefined();
			    const adminValue = userTypeEnumType.getValue('ADMIN');
			    expect(adminValue).toBeDefined();
			    // expect(adminValue.value).toBe('admin');
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			  it('should execute the transformed schema properly', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        user(input: UserSearchInput): User
			        userById(userId: ID!): User
			      \}
			      type User \{
			        id: ID
			        first_name: String
			        last_name: String
			      \}
			      input UserSearchInput \{
			        id: ID
			        first_name: String
			        last_name: String
			      \}
			    \`);
			    let userInput;
			    schema = addResolversToSchema(\{
			      schema,
			      resolvers: \{
			        Query: \{
			          user: (root, args, context, info) => \{
			            userInput = args?.input;
			            return userInput;
			          \},
			          userById: (root, args, context, info) => \{
			            return \{ id: args.userId, first_name: 'John', last_name: 'Doe' \};
			          \},
			        \},
			      \},
			    \});
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        new NamingConventionTransform(\{
			          apiName: '',
			          importFn,
			          cache,
			          pubsub,
			          config: \{
			            fieldNames: 'camelCase',
			            fieldArgumentNames: 'snakeCase',
			          \},
			          baseDir,
			        \}),
			      ],
			    \});
			    const result = await execute(\{
			      schema,
			      document: parse(/* GraphQL */ \`
			        \{
			          user(input: \{ id: "0", firstName: "John", lastName: "Doe" \}) \{
			            id
			            firstName
			            lastName
			          \}
			        \}
			      \`),
			    \});
			    // Pass non-transformed input to the real schema
			    expect(userInput).toEqual(\{
			      id: '0',
			      first_name: 'John',
			      last_name: 'Doe',
			    \});
			    // Pass transformed output to the client
			    expect(result?.data?.user).toEqual(\{
			      id: '0',
			      firstName: 'John',
			      lastName: 'Doe',
			    \});
			
			    const result2 = await execute(\{
			      schema,
			      document: parse(/* GraphQL */ \`
			        \{
			          userById(user_id: "1") \{
			            id
			            firstName
			            lastName
			          \}
			        \}
			      \`),
			    \});
			    // Pass transformed output to the client
			    expect(result2.data?.userById).toEqual(\{
			      id: '1',
			      firstName: 'John',
			      lastName: 'Doe',
			    \});
			  \});
			  it('should be skipped if the result gonna be empty string', async () => \{
			    let schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        _: String!
			      \}
			    \`);
			    schema = addResolversToSchema(\{
			      schema,
			      resolvers: \{
			        Query: \{
			          _: (root, args, context, info) => \{
			            return 'test';
			          \},
			        \},
			      \},
			    \});
			    schema = wrapSchema(\{
			      schema,
			      transforms: [
			        new NamingConventionTransform(\{
			          apiName: '',
			          importFn,
			          cache,
			          pubsub,
			          config: \{
			            fieldNames: 'camelCase',
			          \},
			          baseDir,
			        \}),
			      ],
			    \});
			    const \{ data \} = await execute(\{
			      schema,
			      document: parse(/* GraphQL */ \`
			        \{
			          _
			        \}
			      \`),
			    \});
			    expect(data?._).toEqual('test');
			  \});
			  it('should skip fields of Federation spec', async () => \{
			    const typeDefs = /* GraphQL */ \`
			type Query \{
			  _service: String!
			  _entities: [String!]!
			\}\`.trim();
			    const schema = wrapSchema(\{
			      schema: buildSchema(typeDefs),
			      transforms: [
			        new NamingConventionTransform(\{
			          apiName: '',
			          importFn,
			          cache,
			          pubsub,
			          config: \{
			            fieldNames: 'snakeCase',
			          \},
			          baseDir,
			        \}),
			      ],
			    \});
			    expect(printSchema(schema)).toBe(typeDefs);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\naming-convention\\test\\naming-convention.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\prefix\\test\\barePrefix.spec.ts', () => {
        const sourceCode = `
			import PrefixTransform from '../src';
			import \{ buildSchema, printSchema, GraphQLSchema, GraphQLObjectType \} from 'graphql';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ MeshPubSub \} from '@graphql-mesh/types';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			
			describe('barePrefix', () => \{
			  let schema: GraphQLSchema;
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = undefined;
			
			  beforeEach(() => \{
			    schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        user: User!
			        posts: [Post!]!
			      \}
			
			      type User \{
			        id: ID!
			      \}
			
			      type Post \{
			        id: ID!
			        title: String!
			      \}
			    \`);
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should prefix all schema types when prefix is specified explicitly', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            mode: 'bare',
			            value: 'T_',
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('User')).toBeUndefined();
			    expect(newSchema.getType('T_User')).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should not modify root types', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            mode: 'bare',
			            value: 'T_',
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_Query')).toBeUndefined();
			  \});
			
			  it('should not modify default scalar types', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            mode: 'bare',
			            value: 'T_',
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    const postFields = (newSchema.getType('T_Post') as GraphQLObjectType).getFields();
			    expect(postFields.id.type.toString()).toBe('ID!');
			    expect(postFields.title.type.toString()).toBe('String!');
			  \});
			
			  it('should use apiName when its available', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          apiName: 'MyApi',
			          config: \{ mode: 'bare' \},
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('User')).toBeUndefined();
			    expect(newSchema.getType('MyApi_User')).toBeDefined();
			  \});
			
			  it('should allow to ignore types', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            mode: 'bare',
			            value: 'T_',
			            ignore: ['User'],
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('User')).toBeDefined();
			  \});
			
			  it('should modify fields', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            mode: 'bare',
			            value: 'T_',
			            includeRootOperations: true,
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_User')).toBeDefined();
			    expect((newSchema.getType('Query') as GraphQLObjectType).getFields()).toHaveProperty('T_user');
			  \});
			
			  it('should allow to ignore all fields in Type', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            mode: 'bare',
			            value: 'T_',
			            includeRootOperations: true,
			            ignore: ['Query'],
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    const queryFields = (newSchema.getType('Query') as GraphQLObjectType).getFields();
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_User')).toBeDefined();
			    expect(newSchema.getType('User')).toBeUndefined();
			    expect(queryFields).not.toHaveProperty('T_user');
			    expect(queryFields).toHaveProperty('user');
			    expect(queryFields).not.toHaveProperty('T_posts');
			    expect(queryFields).toHaveProperty('posts');
			  \});
			
			  it('should allow to ignore specific fields', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            mode: 'bare',
			            value: 'T_',
			            includeRootOperations: true,
			            ignore: ['Query.user'],
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    const queryFields = (newSchema.getType('Query') as GraphQLObjectType).getFields();
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_User')).toBeDefined();
			    expect(newSchema.getType('User')).toBeUndefined();
			    expect(queryFields).not.toHaveProperty('T_user');
			    expect(queryFields).toHaveProperty('user');
			    expect(queryFields).toHaveProperty('T_posts');
			    expect(queryFields).not.toHaveProperty('posts');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\prefix\\test\\barePrefix.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(8)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\prefix\\test\\wrapPrefix.spec.ts', () => {
        const sourceCode = `
			import PrefixTransform from '../src';
			import \{ buildSchema, printSchema, GraphQLSchema, GraphQLObjectType \} from 'graphql';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ MeshPubSub \} from '@graphql-mesh/types';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			
			describe('wrapPrefix', () => \{
			  let schema: GraphQLSchema;
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = undefined;
			
			  beforeEach(() => \{
			    schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        user: User!
			        posts: [Post!]!
			      \}
			
			      type User \{
			        id: ID!
			      \}
			
			      type Post \{
			        id: ID!
			        title: String!
			      \}
			    \`);
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should prefix all schema types when prefix is specified explicitly', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            value: 'T_',
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('User')).toBeUndefined();
			    expect(newSchema.getType('T_User')).toBeDefined();
			    expect((newSchema.getType('Query') as GraphQLObjectType).getFields()).not.toHaveProperty('T_user');
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should not modify root types', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            value: 'T_',
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_Query')).toBeUndefined();
			  \});
			
			  it('should not modify default scalar types', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            value: 'T_',
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    const postFields = (newSchema.getType('T_Post') as GraphQLObjectType).getFields();
			    expect(postFields.id.type.toString()).toBe('ID!');
			    expect(postFields.title.type.toString()).toBe('String!');
			  \});
			
			  it('should use apiName when its available', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{\},
			          apiName: 'MyApi',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('User')).toBeUndefined();
			    expect(newSchema.getType('MyApi_User')).toBeDefined();
			  \});
			
			  it('should allow to ignore types', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            value: 'T_',
			            ignore: ['User'],
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('User')).toBeDefined();
			  \});
			
			  it('should modify fields', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            value: 'T_',
			            includeRootOperations: true,
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_User')).toBeDefined();
			    expect((newSchema.getType('Query') as GraphQLObjectType).getFields()).toHaveProperty('T_user');
			  \});
			
			  it('should allow to ignore all fields in Type', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            value: 'T_',
			            includeRootOperations: true,
			            ignore: ['Query'],
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    const queryFields = (newSchema.getType('Query') as GraphQLObjectType).getFields();
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_User')).toBeDefined();
			    expect(newSchema.getType('User')).toBeUndefined();
			    expect(queryFields).not.toHaveProperty('T_user');
			    expect(queryFields).toHaveProperty('user');
			    expect(queryFields).not.toHaveProperty('T_posts');
			    expect(queryFields).toHaveProperty('posts');
			  \});
			
			  it('should allow to ignore specific fields', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            value: 'T_',
			            includeRootOperations: true,
			            ignore: ['Query.user'],
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    const queryFields = (newSchema.getType('Query') as GraphQLObjectType).getFields();
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_User')).toBeDefined();
			    expect(newSchema.getType('User')).toBeUndefined();
			    expect(queryFields).not.toHaveProperty('T_user');
			    expect(queryFields).toHaveProperty('user');
			    expect(queryFields).toHaveProperty('T_posts');
			    expect(queryFields).not.toHaveProperty('posts');
			  \});
			
			  it('should allow to ignore types', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new PrefixTransform(\{
			          config: \{
			            value: 'T_',
			            includeRootOperations: true,
			            includeTypes: false,
			          \},
			          apiName: '',
			          baseDir,
			          cache,
			          pubsub,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			    expect(newSchema.getType('Query')).toBeDefined();
			    expect(newSchema.getType('T_User')).toBeUndefined();
			    expect(newSchema.getType('User')).toBeDefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\prefix\\test\\wrapPrefix.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(9)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\rate-limit\\tests\\rate-limit.spec.ts', () => {
        const sourceCode = `
			import \{ defaultImportFn, PubSub \} from '@graphql-mesh/utils';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import RateLimitTransform from '../src';
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			import \{ execute, parse \} from 'graphql';
			
			describe('Rate Limit Transform', () => \{
			  let pubsub: PubSub;
			  let cache: InMemoryLRUCache;
			
			  beforeEach(() => \{
			    pubsub = new PubSub();
			    cache = new InMemoryLRUCache();
			  \});
			
			  afterEach(() => \{
			    pubsub.publish('destroy', \{\} as any);
			  \});
			
			  const baseDir = process.cwd();
			  const importFn = defaultImportFn;
			  const apiName = 'rate-limit-test';
			  it('should throw an error if the rate limit is exceeded', async () => \{
			    let numberOfCalls = 0;
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => \{
			            numberOfCalls++;
			            return 'bar';
			          \},
			        \},
			      \},
			    \});
			    const rateLimitTransform = new RateLimitTransform(\{
			      apiName,
			      config: [
			        \{
			          type: 'Query',
			          field: 'foo',
			          max: 5,
			          ttl: 5000,
			          identifier: '\{context.userId\}',
			        \},
			      ],
			      baseDir,
			      cache,
			      pubsub,
			      importFn,
			    \});
			    const wrappedSchema = wrapSchema(\{
			      schema,
			      transforms: [rateLimitTransform],
			    \});
			    const query = /* GraphQL */ \`
			      \{
			        foo
			      \}
			    \`;
			    const executeQuery = () =>
			      execute(\{
			        schema: wrappedSchema,
			        document: parse(query),
			        contextValue: \{
			          userId: '1',
			        \},
			      \});
			    for (let i = 0; i < 5; i++) \{
			      const result = await executeQuery();
			
			      expect(result).toEqual(\{
			        data: \{
			          foo: 'bar',
			        \},
			      \});
			    \}
			    const result = await executeQuery();
			
			    // Resolver shouldn't be called
			    expect(numberOfCalls).toBe(5);
			    expect(result.data?.foo).toBeNull();
			    const firstError = result.errors?.[0];
			    expect(firstError.message).toBe('Rate limit of "Query.foo" exceeded for "1"');
			    expect(firstError.path).toEqual(['foo']);
			  \});
			  it('should reset tokens when the ttl is expired', async () => \{
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => 'bar',
			        \},
			      \},
			    \});
			    const rateLimitTransform = new RateLimitTransform(\{
			      apiName,
			      config: [
			        \{
			          type: 'Query',
			          field: 'foo',
			          max: 5,
			          ttl: 1000,
			          identifier: '\{context.userId\}',
			        \},
			      ],
			      baseDir,
			      cache,
			      pubsub,
			      importFn,
			    \});
			    const wrappedSchema = wrapSchema(\{
			      schema,
			      transforms: [rateLimitTransform],
			    \});
			    const query = /* GraphQL */ \`
			      \{
			        foo
			      \}
			    \`;
			    const executeQuery = () =>
			      execute(\{
			        schema: wrappedSchema,
			        document: parse(query),
			        contextValue: \{
			          userId: '1',
			        \},
			      \});
			    for (let i = 0; i < 5; i++) \{
			      const result = await executeQuery();
			
			      expect(result).toEqual(\{
			        data: \{
			          foo: 'bar',
			        \},
			      \});
			    \}
			    await new Promise(resolve => setTimeout(resolve, 1000));
			    const result = await executeQuery();
			
			    expect(result.errors?.length).toBeFalsy();
			    expect(result.data?.foo).toBe('bar');
			  \});
			  it('should provide different tokens for different identifiers', async () => \{
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => 'bar',
			        \},
			      \},
			    \});
			    const rateLimitTransform = new RateLimitTransform(\{
			      apiName,
			      config: [
			        \{
			          type: 'Query',
			          field: 'foo',
			          max: 1,
			          ttl: 1000,
			          identifier: '\{context.userId\}',
			        \},
			      ],
			      baseDir,
			      cache,
			      pubsub,
			      importFn,
			    \});
			    const wrappedSchema = wrapSchema(\{
			      schema,
			      transforms: [rateLimitTransform],
			    \});
			    const query = /* GraphQL */ \`
			      \{
			        foo
			      \}
			    \`;
			
			    for (let i = 0; i < 2; i++) \{
			      const executeQuery = () =>
			        execute(\{
			          schema: wrappedSchema,
			          document: parse(query),
			          contextValue: \{
			            userId: \`User\$\{i\}\`,
			          \},
			        \});
			      const resultSuccessful = await executeQuery();
			
			      expect(resultSuccessful).toEqual(\{
			        data: \{
			          foo: 'bar',
			        \},
			      \});
			
			      const resultFails = await execute(\{
			        schema: wrappedSchema,
			        document: parse(query),
			        contextValue: \{
			          userId: \`User\$\{i\}\`,
			        \},
			      \});
			
			      expect(resultFails.data?.foo).toBeNull();
			      const firstError = resultFails.errors?.[0];
			      expect(firstError.message).toBe(\`Rate limit of "Query.foo" exceeded for "User\$\{i\}"\`);
			      expect(firstError.path).toEqual(['foo']);
			    \}
			
			    expect.assertions(8);
			  \});
			  it('should return other fields even if one of them has fails', async () => \{
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			          bar: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => 'FOO',
			          bar: () => 'BAR',
			        \},
			      \},
			    \});
			
			    const rateLimitTransform = new RateLimitTransform(\{
			      apiName,
			      config: [
			        \{
			          type: 'Query',
			          field: 'foo',
			          max: 1,
			          ttl: 1000,
			          identifier: '\{context.userId\}',
			        \},
			      ],
			      baseDir,
			      cache,
			      pubsub,
			      importFn,
			    \});
			
			    const wrappedSchema = wrapSchema(\{
			      schema,
			      transforms: [rateLimitTransform],
			    \});
			
			    const executeQuery = () =>
			      execute(\{
			        schema: wrappedSchema,
			        document: parse(/* GraphQL */ \`
			          query TestQuery \{
			            foo
			            bar
			          \}
			        \`),
			        contextValue: \{
			          userId: 'MYUSER',
			        \},
			      \});
			
			    await executeQuery();
			    const result = await executeQuery();
			    expect(result.data.bar).toBe('BAR');
			    expect(result.errors?.[0]?.message).toBe(\`Rate limit of "Query.foo" exceeded for "MYUSER"\`);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\rate-limit\\tests\\rate-limit.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(4)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\rename\\test\\bareRename.spec.ts', () => {
        const sourceCode = `
			import RenameTransform from './../src/index';
			import \{ buildSchema, graphql, GraphQLObjectType \} from 'graphql';
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ ImportFn, MeshPubSub \} from '@graphql-mesh/types';
			import \{ PubSub \} from '@graphql-mesh/utils';
			
			describe('rename', () => \{
			  const schema = makeExecutableSchema(\{
			    typeDefs: /* GraphQL */ \`
			      type Query \{
			        my_user: MyUser!
			        my_book: MyBook!
			        profile(profile_id: ID!, role: String): Profile
			      \}
			
			      type MyUser \{
			        id: ID!
			      \}
			
			      type Profile \{
			        id: ID!
			      \}
			
			      type MyBook \{
			        id: ID!
			      \}
			    \`,
			    resolvers: \{
			      Query: \{ my_user: () => (\{ id: 'userId' \}), profile: (_, args) => (\{ id: \`profile_\$\{args.profile_id\}\` \}) \},
			    \},
			  \});
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = undefined;
			  const importFn: ImportFn = m => import(m);
			
			  beforeEach(() => \{
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should change the name of a type', () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'MyUser',
			            \},
			            to: \{
			              type: 'User',
			            \},
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			
			    expect(newSchema.getType('MyUser')).toBeUndefined();
			    expect(newSchema.getType('User')).toBeDefined();
			  \});
			
			  it('should change the name of a field', () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'my_user',
			            \},
			            to: \{
			              type: 'Query',
			              field: 'user',
			            \},
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.my_user).toBeUndefined();
			    expect(fieldMap.user).toBeDefined();
			  \});
			
			  it('should resolve correctly renamed field', async () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'MyUser',
			              field: 'id',
			            \},
			            to: \{
			              type: 'MyUser',
			              field: 'userId',
			            \},
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const transformedSchema = transform.transformSchema(schema, \{\} as any);
			    const result = await graphql(\{
			      schema: transformedSchema,
			      source: /* GraphQL */ \`
			        \{
			          my_user \{
			            userId
			          \}
			        \}
			      \`,
			    \});
			
			    expect(result.data).toMatchObject(\{ my_user: \{ userId: 'userId' \} \});
			  \});
			
			  it('should change the name of multiple type names', () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'My(.*)',
			            \},
			            to: \{
			              type: '\$1',
			            \},
			            useRegExpForTypes: true,
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			
			    expect(newSchema.getType('MyUser')).toBeUndefined();
			    expect(newSchema.getType('User')).toBeDefined();
			    expect(newSchema.getType('MyBook')).toBeUndefined();
			    expect(newSchema.getType('Book')).toBeDefined();
			  \});
			
			  it('should change the name of multiple fields', () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'my_(.*)',
			            \},
			            to: \{
			              type: 'Query',
			              field: '\$1',
			            \},
			            useRegExpForFields: true,
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.my_user).toBeUndefined();
			    expect(fieldMap.user).toBeDefined();
			    expect(fieldMap.my_book).toBeUndefined();
			    expect(fieldMap.book).toBeDefined();
			  \});
			
			  it('should replace the first occurrence of a substring in a field', () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'o(.*)',
			            \},
			            to: \{
			              type: 'Query',
			              field: '\$1',
			            \},
			            useRegExpForFields: true,
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.my_book).toBeUndefined();
			    expect(fieldMap.my_bok).toBeDefined();
			  \});
			
			  it('should replace all occurrences of a substring in a type', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        api_user_v1_api: ApiUserV1Api!
			      \}
			
			      type ApiUserV1Api \{
			        id: ID!
			      \}
			    \`);
			
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Api(.*?)',
			            \},
			            to: \{
			              type: '\$1',
			            \},
			            useRegExpForTypes: true,
			            regExpFlags: 'g',
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    expect(newSchema.getType('ApiUserV1Api')).toBeUndefined();
			    expect(newSchema.getType('UserV1')).toBeDefined();
			  \});
			
			  it('should replace all occurrences of multiple substrings in a type', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        api_user_v1_api: ApiUserV1Api!
			      \}
			
			      type ApiUserV1Api \{
			        id: ID!
			      \}
			    \`);
			
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Api|V1(.*?)',
			            \},
			            to: \{
			              type: '\$1',
			            \},
			            useRegExpForTypes: true,
			            regExpFlags: 'g',
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    expect(newSchema.getType('ApiUserV1Api')).toBeUndefined();
			    expect(newSchema.getType('User')).toBeDefined();
			  \});
			
			  it('should replace all occurrences of a substring in a field', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        api_user_v1_api: ApiUserV1Api!
			      \}
			
			      type ApiUserV1Api \{
			        id: ID!
			      \}
			    \`);
			
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'api_|_api(.*?)',
			            \},
			            to: \{
			              type: 'Query',
			              field: '\$1',
			            \},
			            useRegExpForFields: true,
			            regExpFlags: 'g',
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.api_user_v1_api).toBeUndefined();
			    expect(fieldMap.user_v1).toBeDefined();
			  \});
			
			  it('should replace all occurrences of multiple substrings in a field', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        api_user_v1_api: ApiUserV1Api!
			      \}
			
			      type ApiUserV1Api \{
			        id: ID!
			      \}
			    \`);
			
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'api_|_api|v1_|_v1(.*?)',
			            \},
			            to: \{
			              type: 'Query',
			              field: '\$1',
			            \},
			            useRegExpForFields: true,
			            regExpFlags: 'g',
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.api_user_v1_api).toBeUndefined();
			    expect(fieldMap.user).toBeDefined();
			  \});
			
			  it('should only affect specified type', () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'o(.*)',
			            \},
			            to: \{
			              type: 'Query',
			              field: '\$1',
			            \},
			            useRegExpForFields: true,
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.my_book).toBeUndefined();
			    expect(fieldMap.my_bok).toBeDefined();
			
			    const myUserType = newSchema.getType('MyUser') as GraphQLObjectType;
			    const myUserFields = myUserType.getFields();
			
			    expect(myUserFields.id).toBeDefined();
			
			    const myBookType = newSchema.getType('MyBook') as GraphQLObjectType;
			    const myBookFields = myBookType.getFields();
			
			    expect(myBookFields.id).toBeDefined();
			  \});
			
			  it('should only affect specified field argument', () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'profile',
			              argument: 'profile_id',
			            \},
			            to: \{
			              type: 'Query',
			              field: 'profile',
			              argument: 'profileId',
			            \},
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.profile.args.find(a => a.name === 'role')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profile_id')).toBeUndefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profileId')).toBeDefined();
			  \});
			
			  it('should resolve correctly field with renamed argument', async () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'profile',
			              argument: 'profile_id',
			            \},
			            to: \{
			              type: 'Query',
			              field: 'profile',
			              argument: 'profileId',
			            \},
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn,
			    \});
			
			    const transformedSchema = transform.transformSchema(schema, \{\} as any);
			    const result = await graphql(\{
			      schema: transformedSchema,
			      source: /* GraphQL */ \`
			        \{
			          profile(profileId: "abc123") \{
			            id
			          \}
			        \}
			      \`,
			    \});
			
			    expect(result.data).toMatchObject(\{ profile: \{ id: 'profile_abc123' \} \});
			  \});
			
			  it('should only affect field argument only if type and field are specified', () => \{
			    const transform = new RenameTransform(\{
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              argument: 'profile_id',
			            \},
			            to: \{
			              argument: 'profileId',
			            \},
			          \},
			        ],
			      \},
			      apiName: '',
			      cache,
			      pubsub,
			      baseDir,
			      importFn: m => import(m),
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.profile.args.find(a => a.name === 'role')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profile_id')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profileId')).toBeUndefined();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\rename\\test\\bareRename.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\rename\\test\\wrapRename.spec.ts', () => {
        const sourceCode = `
			import RenameTransform from './../src/index';
			import \{ buildSchema, graphql, GraphQLObjectType, printSchema \} from 'graphql';
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ MeshPubSub \} from '@graphql-mesh/types';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			
			describe('rename', () => \{
			  const schema = makeExecutableSchema(\{
			    typeDefs: /* GraphQL */ \`
			      type Query \{
			        my_user: MyUser!
			        my_book: MyBook!
			        profile(profile_id: ID!, role: String, some_argument: String, another_argument: Int): Profile
			      \}
			
			      type MyUser \{
			        id: ID!
			      \}
			
			      type Profile \{
			        id: ID!
			      \}
			
			      type MyBook \{
			        id: ID!
			      \}
			    \`,
			    resolvers: \{
			      Query: \{ my_user: () => (\{ id: 'userId' \}), profile: (_, args) => (\{ id: \`profile_\$\{args.profile_id\}\` \}) \},
			    \},
			  \});
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = undefined;
			
			  beforeEach(() => \{
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should change the name of a type', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            renames: [
			              \{
			                from: \{
			                  type: 'MyUser',
			                \},
			                to: \{
			                  type: 'User',
			                \},
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('MyUser')).toBeUndefined();
			    expect(newSchema.getType('User')).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should change the name of a field', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'my_user',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: 'user',
			                \},
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.my_user).toBeUndefined();
			    expect(fieldMap.user).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should resolve correctly renamed field', async () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: 'MyUser',
			                  field: 'id',
			                \},
			                to: \{
			                  type: 'MyUser',
			                  field: 'userId',
			                \},
			              \},
			            ],
			          \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    const result = await graphql(\{
			      schema: newSchema,
			      source: /* GraphQL */ \`
			        \{
			          my_user \{
			            userId
			          \}
			        \}
			      \`,
			    \});
			
			    expect(result.data).toMatchObject(\{ my_user: \{ userId: 'userId' \} \});
			  \});
			
			  it('should change the name of multiple type names', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: 'My(.*)',
			                \},
			                to: \{
			                  type: '\$1',
			                \},
			                useRegExpForTypes: true,
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('MyUser')).toBeUndefined();
			    expect(newSchema.getType('User')).toBeDefined();
			    expect(newSchema.getType('MyBook')).toBeUndefined();
			    expect(newSchema.getType('Book')).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should change the name of multiple fields', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'my_(.*)',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: '\$1',
			                \},
			                useRegExpForFields: true,
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.my_user).toBeUndefined();
			    expect(fieldMap.user).toBeDefined();
			    expect(fieldMap.my_book).toBeUndefined();
			    expect(fieldMap.book).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should replace the first occurrence of a substring in a field', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'o(.*)',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: '\$1',
			                \},
			                useRegExpForFields: true,
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.my_book).toBeUndefined();
			    expect(fieldMap.my_bok).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should replace all occurrences of a substring in a type', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        api_user_v1_api: ApiUserV1Api!
			      \}
			
			      type ApiUserV1Api \{
			        id: ID!
			      \}
			    \`);
			
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            renames: [
			              \{
			                from: \{
			                  type: 'Api(.*?)',
			                \},
			                to: \{
			                  type: '\$1',
			                \},
			                useRegExpForTypes: true,
			                regExpFlags: 'g',
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('ApiUserV1Api')).toBeUndefined();
			    expect(newSchema.getType('UserV1')).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should replace all occurrences of multiple substrings in a type', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        api_user_v1_api: ApiUserV1Api!
			      \}
			
			      type ApiUserV1Api \{
			        id: ID!
			      \}
			    \`);
			
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            renames: [
			              \{
			                from: \{
			                  type: 'Api|V1(.*?)',
			                \},
			                to: \{
			                  type: '\$1',
			                \},
			                useRegExpForTypes: true,
			                regExpFlags: 'g',
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    expect(newSchema.getType('ApiUserV1Api')).toBeUndefined();
			    expect(newSchema.getType('User')).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should replace all occurrences of a substring in a field', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        api_user_v1_api: ApiUserV1Api!
			      \}
			
			      type ApiUserV1Api \{
			        id: ID!
			      \}
			    \`);
			
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'api_|_api(.*?)',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: '\$1',
			                \},
			                useRegExpForFields: true,
			                regExpFlags: 'g',
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.api_user_v1_api).toBeUndefined();
			    expect(fieldMap.user_v1).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should replace all occurrences of multiple substrings in a field', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        api_user_v1_api: ApiUserV1Api!
			      \}
			
			      type ApiUserV1Api \{
			        id: ID!
			      \}
			    \`);
			
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'api_|_api|v1_|_v1(.*?)',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: '\$1',
			                \},
			                useRegExpForFields: true,
			                regExpFlags: 'g',
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.api_user_v1_api).toBeUndefined();
			    expect(fieldMap.user).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should only affect specified type', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'o(.*)',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: '\$1',
			                \},
			                useRegExpForFields: true,
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.my_book).toBeUndefined();
			    expect(fieldMap.my_bok).toBeDefined();
			
			    const myUserType = newSchema.getType('MyUser') as GraphQLObjectType;
			    const myUserFields = myUserType.getFields();
			
			    expect(myUserFields.id).toBeDefined();
			
			    const myBookType = newSchema.getType('MyBook') as GraphQLObjectType;
			    const myBookFields = myBookType.getFields();
			
			    expect(myBookFields.id).toBeDefined();
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should only affect specified field argument', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'profile',
			                  argument: 'profile_id',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: 'profile',
			                  argument: 'profileId',
			                \},
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    // TODO: uncomment following line once #3778 is fixed
			    // expect(fieldMap.profile.args.find(a => a.name === 'role')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profile_id')).toBeUndefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profileId')).toBeDefined();
			
			    expect(fieldMap.profile.args.find(a => a.name === 'another_argument')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'some_argument')).toBeDefined();
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should only affect specified field match argument', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'profile',
			                  argument: '(profile)_(id)',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: 'profile',
			                  argument: '\$1Id',
			                \},
			                useRegExpForArguments: true,
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    // TODO: uncomment following line once #3778 is fixed
			    // expect(fieldMap.profile.args.find(a => a.name === 'role')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profile_id')).toBeUndefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profileId')).toBeDefined();
			
			    expect(fieldMap.profile.args.find(a => a.name === 'another_argument')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'some_argument')).toBeDefined();
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should only affect specified match type and match field argument', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: '(.uer.)',
			                  field: '(.rofil.)',
			                  argument: 'profile_id',
			                \},
			                to: \{
			                  type: '\$1',
			                  field: '\$1',
			                  argument: 'profileId',
			                \},
			                useRegExpForTypes: true,
			                useRegExpForFields: true,
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    // TODO: uncomment following line once #3778 is fixed
			    // expect(fieldMap.profile.args.find(a => a.name === 'role')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profile_id')).toBeUndefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profileId')).toBeDefined();
			
			    expect(fieldMap.profile.args.find(a => a.name === 'another_argument')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'some_argument')).toBeDefined();
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  it('should resolve correctly field with renamed argument', async () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  type: 'Query',
			                  field: 'profile',
			                  argument: 'profile_id',
			                \},
			                to: \{
			                  type: 'Query',
			                  field: 'profile',
			                  argument: 'profileId',
			                \},
			              \},
			            ],
			          \},
			          apiName: '',
			          cache,
			          pubsub,
			          baseDir,
			          importFn: m => import(m),
			        \}),
			      ],
			    \});
			
			    const result = await graphql(\{
			      schema: newSchema,
			      source: /* GraphQL */ \`
			        \{
			          profile(profileId: "abc123") \{
			            id
			          \}
			        \}
			      \`,
			    \});
			
			    expect(result.data).toMatchObject(\{ profile: \{ id: 'profile_abc123' \} \});
			  \});
			
			  it('should only affect field argument only if type and field are specified', () => \{
			    const newSchema = wrapSchema(\{
			      schema,
			      transforms: [
			        new RenameTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            mode: 'wrap',
			            renames: [
			              \{
			                from: \{
			                  argument: 'profile_id',
			                \},
			                to: \{
			                  argument: 'profileId',
			                \},
			              \},
			            ],
			          \},
			          cache,
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const fieldMap = queryType.getFields();
			
			    expect(fieldMap.profile.args.find(a => a.name === 'role')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profile_id')).toBeDefined();
			    expect(fieldMap.profile.args.find(a => a.name === 'profileId')).toBeUndefined();
			
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			
			  // TODO
			  it.skip('should move a root field from a root type to another', () => \{
			    const schema = buildSchema(/* GraphQL */ \`
			      type Query \{
			        foo: String
			      \}
			
			      type Mutation \{
			        bar: String
			      \}
			    \`);
			
			    const transform = new RenameTransform(\{
			      apiName: '',
			      importFn: m => import(m),
			      config: \{
			        mode: 'bare',
			        renames: [
			          \{
			            from: \{
			              type: 'Mutation',
			              field: 'bar',
			            \},
			            to: \{
			              type: 'Query',
			              field: 'bar',
			            \},
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			    \});
			
			    const newSchema = transform.transformSchema(schema, \{\} as any);
			
			    const queryType = newSchema.getType('Query') as GraphQLObjectType;
			    const queryFieldMap = queryType.getFields();
			
			    expect(queryFieldMap.bar).toBeDefined();
			    expect(printSchema(newSchema)).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\rename\\test\\wrapRename.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(16)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\replace-field\\test\\replace-field.spec.ts', () => {
        const sourceCode = `
			import \{ join \} from 'path';
			import \{ execute, parse, printSchema, GraphQLObjectType \} from 'graphql';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ ImportFn, MeshPubSub \} from '@graphql-mesh/types';
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			import \{ PubSub \} from '@graphql-mesh/utils';
			
			import ReplaceFieldTransform from '../src';
			import \{ pruneSchema \} from '@graphql-tools/utils';
			
			const importFn: ImportFn = m =>
			  import(m).catch(e => \{
			    console.error(\`Import failed;\`, e);
			    throw e;
			  \});
			
			describe('replace-field', () => \{
			  const mockQueryBooks = jest.fn().mockImplementation(() => (\{ books: [\{ title: 'abc' \}, \{ title: 'def' \}] \}));
			  const mockBooksApiResponseBooks = jest.fn().mockImplementation(() => [\{ title: 'ghi' \}, \{ title: 'lmn' \}]);
			
			  const schemaDefs = /* GraphQL */ \`
			    type Query \{
			      books: BooksApiResponse
			    \}
			
			    type BooksApiResponse \{
			      """
			      Retrieve a list of Books
			      """
			      books(maxResults: Int, orderBy: String): [Book]
			    \}
			
			    type Book \{
			      title: String!
			      author: Author!
			      code: String
			    \}
			
			    type Author \{
			      name: String!
			      age: Int!
			    \}
			  \`;
			  let cache: InMemoryLRUCache;
			  let pubsub: MeshPubSub;
			  const baseDir: string = undefined;
			
			  beforeEach(() => \{
			    jest.clearAllMocks();
			  \});
			
			  afterEach(() => \{
			    cache = new InMemoryLRUCache();
			    pubsub = new PubSub();
			  \});
			
			  it('should replace correctly field Type only', async () => \{
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect(transformedSchema.getType('BooksApiResponse')).toBeUndefined();
			    expect((transformedSchema.getType('Query') as GraphQLObjectType).getFields().books.type.toString()).toBe('[Book]');
			    expect(printSchema(transformedSchema)).toMatchSnapshot();
			  \});
			
			  it('should replace correctly field Type with additional type definitions', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      books: [
			        \{ title: 'abc', author: \{ age: 50 \} \},
			        \{ title: 'def', author: \{\} \},
			      ],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        typeDefs: /* GraphQL */ \`
			          type NewAuthor \{
			            age: String
			          \}
			        \`,
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			            scope: 'hoistValue',
			          \},
			          \{
			            from: \{
			              type: 'Author',
			              field: 'age',
			            \},
			            to: \{
			              type: 'NewAuthor',
			              field: 'age',
			            \},
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			        BooksApiResponse: \{
			          books: mockBooksApiResponseBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect((transformedSchema.getType('Author') as GraphQLObjectType).getFields().age.type.toString()).toBe('String');
			    expect(printSchema(transformedSchema)).toMatchSnapshot();
			
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            title
			            author \{
			              age
			            \}
			          \}
			        \}
			      \`),
			    \});
			    expect(mockQueryBooks).toHaveBeenCalledTimes(1);
			    expect(mockBooksApiResponseBooks).not.toHaveBeenCalled();
			    expect(result.data.books).toEqual([
			      \{ title: 'abc', author: \{ age: '50' \} \},
			      \{ title: 'def', author: \{ age: null \} \},
			    ]);
			  \});
			
			  it('should replace correctly field with hoistValue and resolver function', async () => \{
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			            scope: 'hoistValue',
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			        BooksApiResponse: \{
			          books: mockBooksApiResponseBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect(transformedSchema.getType('BooksApiResponse')).toBeUndefined();
			    expect((transformedSchema.getType('Query') as GraphQLObjectType).getFields().books.type.toString()).toBe('[Book]');
			
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            title
			          \}
			        \}
			      \`),
			    \});
			    expect(mockQueryBooks).toHaveBeenCalledTimes(1);
			    expect(mockBooksApiResponseBooks).not.toHaveBeenCalled();
			    expect(result.data.books).toEqual([\{ title: 'abc' \}, \{ title: 'def' \}]);
			  \});
			
			  it('should replace correctly field with hoistValue and default-field-resolver', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      books: [
			        \{ title: 'abc', author: \{ name: 'abra' \} \},
			        \{ title: 'def', author: \{ name: 'cadabra' \} \},
			      ],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Book',
			              field: 'author',
			            \},
			            to: \{
			              type: 'Author',
			              field: 'name',
			            \},
			            scope: 'hoistValue',
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect(transformedSchema.getType('Author')).toBeUndefined();
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().author.type.toString()).toBe('String!');
			
			    const result: any = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            books \{
			              title
			              author
			            \}
			          \}
			        \}
			      \`),
			    \});
			    expect(result.data.books.books).toEqual([
			      \{ title: 'abc', author: 'abra' \},
			      \{ title: 'def', author: 'cadabra' \},
			    ]);
			  \});
			
			  it('should replace correctly mtultiple fields with hoistValue and defined resolver function as well as default-field-resolver', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      books: [
			        \{ title: 'abc', author: \{ name: 'abra' \} \},
			        \{ title: 'def', author: \{ name: 'cadabra' \} \},
			      ],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			            scope: 'hoistValue',
			          \},
			          \{
			            from: \{
			              type: 'Book',
			              field: 'author',
			            \},
			            to: \{
			              type: 'Author',
			              field: 'name',
			            \},
			            scope: 'hoistValue',
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			        BooksApiResponse: \{
			          books: mockBooksApiResponseBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect(transformedSchema.getType('BooksApiResponse')).toBeUndefined();
			    expect(transformedSchema.getType('Author')).toBeUndefined();
			    expect((transformedSchema.getType('Query') as GraphQLObjectType).getFields().books.type.toString()).toBe('[Book]');
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().author.type.toString()).toBe('String!');
			    expect(printSchema(transformedSchema)).toMatchSnapshot();
			
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            title
			            author
			          \}
			        \}
			      \`),
			    \});
			    expect(mockQueryBooks).toHaveBeenCalledTimes(1);
			    expect(mockBooksApiResponseBooks).not.toHaveBeenCalled();
			    expect(result.data.books).toEqual([
			      \{ title: 'abc', author: 'abra' \},
			      \{ title: 'def', author: 'cadabra' \},
			    ]);
			  \});
			
			  it('should replace correctly field with composer wrapping resolver function', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      availableBooks: [\{ title: 'abc' \}, \{ title: 'def' \}],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			            composer: join(__dirname, './fixtures/composer.js#books'),
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			        BooksApiResponse: \{
			          books: mockBooksApiResponseBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            title
			            isAvailable
			          \}
			        \}
			      \`),
			    \});
			    expect(mockQueryBooks).toHaveBeenCalledTimes(1);
			    expect(mockBooksApiResponseBooks).not.toHaveBeenCalled();
			    expect(result.data.books).toEqual([\{ title: 'abc' \}, \{ title: 'def' \}]);
			  \});
			
			  it('should replace correctly field with composer wrapping default-field-resolver', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      books: [
			        \{ title: 'abc', code: 'def' \},
			        \{ title: 'ghi', code: 'lmn' \},
			      ],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        typeDefs: /* GraphQL */ \`
			          type NewBook \{
			            code: String!
			          \}
			        \`,
			        replacements: [
			          \{
			            from: \{
			              type: 'Book',
			              field: 'code',
			            \},
			            to: \{
			              type: 'NewBook',
			              field: 'code',
			            \},
			            composer: join(__dirname, './fixtures/composer.js#code'),
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().code.type.toString()).toBe('String!');
			
			    const result: any = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            books \{
			              title
			              code
			            \}
			          \}
			        \}
			      \`),
			    \});
			    expect(result.data.books.books).toEqual([
			      \{ title: 'abc', code: 'store001_def' \},
			      \{ title: 'ghi', code: 'store001_lmn' \},
			    ]);
			  \});
			
			  it('should replace correctly renamed field with Type only', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      books: [
			        \{ title: 'abc', author: \{ name: 'abra' \} \},
			        \{ title: 'def', author: \{ name: 'cadabra' \} \},
			      ],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        typeDefs: /* GraphQL */ \`
			          type NewAuthor \{
			            name: String
			          \}
			        \`,
			        replacements: [
			          \{
			            from: \{
			              type: 'Author',
			              field: 'name',
			            \},
			            to: \{
			              type: 'NewAuthor',
			              field: 'name',
			            \},
			            name: 'fullName',
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect((transformedSchema.getType('Author') as GraphQLObjectType).getFields().name).toBeUndefined();
			    expect((transformedSchema.getType('Author') as GraphQLObjectType).getFields().fullName.type.toString()).toBe(
			      'String'
			    );
			
			    const result: any = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            books \{
			              title
			              author \{
			                fullName
			              \}
			            \}
			          \}
			        \}
			      \`),
			    \});
			    expect(result.data.books.books).toEqual([
			      \{ title: 'abc', author: \{ fullName: 'abra' \} \},
			      \{ title: 'def', author: \{ fullName: 'cadabra' \} \},
			    ]);
			  \});
			
			  it('should replace correctly renamed field with hoistValue and resolver function', async () => \{
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			            scope: 'hoistValue',
			            name: 'ourBooks',
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			        BooksApiResponse: \{
			          books: mockBooksApiResponseBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect(transformedSchema.getType('BooksApiResponse')).toBeUndefined();
			    expect((transformedSchema.getType('Query') as GraphQLObjectType).getFields().books).toBeUndefined();
			    expect((transformedSchema.getType('Query') as GraphQLObjectType).getFields().ourBooks.type.toString()).toBe(
			      '[Book]'
			    );
			
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          ourBooks \{
			            title
			          \}
			        \}
			      \`),
			    \});
			    expect(mockQueryBooks).toHaveBeenCalledTimes(1);
			    expect(mockBooksApiResponseBooks).not.toHaveBeenCalled();
			    expect(result.data.ourBooks).toEqual([\{ title: 'abc' \}, \{ title: 'def' \}]);
			  \});
			
			  it('should replace correctly renamed field with hoistValue and default-field-resolver', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      books: [
			        \{ title: 'abc', author: \{ name: 'abra' \} \},
			        \{ title: 'def', author: \{ name: 'cadabra' \} \},
			      ],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Book',
			              field: 'author',
			            \},
			            to: \{
			              type: 'Author',
			              field: 'name',
			            \},
			            name: 'authorName',
			            scope: 'hoistValue',
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect(transformedSchema.getType('Author')).toBeUndefined();
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().author).toBeUndefined();
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().authorName.type.toString()).toBe(
			      'String!'
			    );
			
			    const result: any = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            books \{
			              title
			              authorName
			            \}
			          \}
			        \}
			      \`),
			    \});
			    expect(result.data.books.books).toEqual([
			      \{ title: 'abc', authorName: 'abra' \},
			      \{ title: 'def', authorName: 'cadabra' \},
			    ]);
			  \});
			
			  it('should replace correctly renamed field with composer wrapping resolver function', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      availableBooks: [\{ title: 'abc' \}, \{ title: 'def' \}],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			            name: 'ourBooks',
			            composer: join(__dirname, './fixtures/composer.js#books'),
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			        BooksApiResponse: \{
			          books: mockBooksApiResponseBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect((transformedSchema.getType('Query') as GraphQLObjectType).getFields().books).toBeUndefined();
			    expect((transformedSchema.getType('Query') as GraphQLObjectType).getFields().ourBooks.type.toString()).toBe(
			      '[Book]'
			    );
			
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          ourBooks \{
			            title
			            isAvailable
			          \}
			        \}
			      \`),
			    \});
			    expect(mockQueryBooks).toHaveBeenCalledTimes(1);
			    expect(mockBooksApiResponseBooks).not.toHaveBeenCalled();
			    expect(result.data.ourBooks).toEqual([\{ title: 'abc' \}, \{ title: 'def' \}]);
			  \});
			
			  it('should replace correctly renamed field with composer wrapping default-field-resolver', async () => \{
			    mockQueryBooks.mockReturnValueOnce(\{
			      books: [
			        \{ title: 'abc', code: undefined \},
			        \{ title: 'def', code: 'ghi' \},
			      ],
			    \});
			
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        typeDefs: /* GraphQL */ \`
			          type NewBook \{
			            isAvailable: Boolean
			          \}
			        \`,
			        replacements: [
			          \{
			            from: \{
			              type: 'Book',
			              field: 'code',
			            \},
			            to: \{
			              type: 'NewBook',
			              field: 'isAvailable',
			            \},
			            name: 'isAvailable',
			            composer: join(__dirname, './fixtures/composer.js#isAvailable'),
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{
			          books: mockQueryBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().code).toBeUndefined();
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().isAvailable.type.toString()).toBe(
			      'Boolean'
			    );
			
			    const result: any = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            books \{
			              title
			              isAvailable
			            \}
			          \}
			        \}
			      \`),
			    \});
			    expect(result.data.books.books).toEqual([
			      \{ title: 'abc', isAvailable: false \},
			      \{ title: 'def', isAvailable: true \},
			    ]);
			  \});
			
			  it('should replace correctly whole field config', async () => \{
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			            scope: 'config',
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			      resolvers: \{
			        Query: \{ books: mockQueryBooks \},
			        BooksApiResponse: \{
			          books: mockBooksApiResponseBooks,
			        \},
			      \},
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			    const queryBooks = (transformedSchema.getType('Query') as GraphQLObjectType).getFields().books;
			
			    expect(printSchema(transformedSchema)).toMatchSnapshot();
			
			    expect(transformedSchema.getType('BooksApiResponse')).toBeUndefined();
			    expect(queryBooks.type.toString()).toBe('[Book]');
			    expect(queryBooks.description).toBe('Retrieve a list of Books');
			    expect(queryBooks.args).toEqual(
			      expect.arrayContaining([
			        expect.objectContaining(\{ name: 'maxResults' \}),
			        expect.objectContaining(\{ name: 'orderBy' \}),
			      ])
			    );
			
			    expect(mockBooksApiResponseBooks).not.toHaveBeenCalled();
			    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			    // @ts-ignore
			    await queryBooks.resolve();
			    expect(mockBooksApiResponseBooks).toHaveBeenCalledTimes(1);
			
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          books \{
			            title
			          \}
			        \}
			      \`),
			    \});
			    expect(mockQueryBooks).not.toHaveBeenCalled();
			    expect(mockBooksApiResponseBooks).toHaveBeenCalledTimes(2);
			    expect(result.data.books).toEqual([\{ title: 'ghi' \}, \{ title: 'lmn' \}]);
			  \});
			
			  it('applies multiple replaces to obtain a cleaner schema', () => \{
			    const transform = new ReplaceFieldTransform(\{
			      config: \{
			        typeDefs: /* GraphQL */ \`
			          type NewBook \{
			            isAvailable: Boolean
			          \}
			        \`,
			        replacements: [
			          \{
			            from: \{
			              type: 'Query',
			              field: 'books',
			            \},
			            to: \{
			              type: 'BooksApiResponse',
			              field: 'books',
			            \},
			          \},
			          \{
			            from: \{
			              type: 'Book',
			              field: 'code',
			            \},
			            to: \{
			              type: 'NewBook',
			              field: 'isAvailable',
			            \},
			            name: 'isAvailable',
			            composer: join(__dirname, './fixtures/composer.js#isAvailable'),
			          \},
			          \{
			            from: \{
			              type: 'Book',
			              field: 'author',
			            \},
			            to: \{
			              type: 'Author',
			              field: 'name',
			            \},
			            scope: 'hoistValue',
			          \},
			        ],
			      \},
			      cache,
			      pubsub,
			      baseDir,
			      apiName: '',
			      importFn,
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: schemaDefs,
			    \});
			    const transformedSchema = pruneSchema(transform.transformSchema(schema));
			
			    expect(transformedSchema.getType('BooksApiResponse')).toBeUndefined();
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().code).toBeUndefined();
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().isAvailable.type.toString()).toBe(
			      'Boolean'
			    );
			    expect(transformedSchema.getType('Author')).toBeUndefined();
			    expect((transformedSchema.getType('Book') as GraphQLObjectType).getFields().author.type.toString()).toBe('String!');
			
			    expect(printSchema(transformedSchema)).toMatchSnapshot();
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\replace-field\\test\\replace-field.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(14)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\resolvers-composition\\test\\transform.spec.ts', () => {
        const sourceCode = `
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ join \} from 'path';
			import ResolversCompositionTransform, \{ ResolversComposition \} from '../src';
			import \{ execute, parse \} from 'graphql';
			
			describe('transform', () => \{
			  const baseDir: string = undefined;
			
			  it('should handle composition functions from external modules', async () => \{
			    const transform = new ResolversCompositionTransform(\{
			      cache: new InMemoryLRUCache(),
			      pubsub: new PubSub(),
			      config: [
			        \{
			          resolver: 'Query.foo',
			          composer: join(__dirname, './fixtures/composer.js'),
			        \},
			      ],
			      baseDir,
			      apiName: '',
			      importFn: m => import(m),
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => 'BAR',
			        \},
			      \},
			    \});
			    const transformedSchema = transform.transformSchema(schema);
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          foo
			        \}
			      \`),
			    \});
			    expect(result.data?.foo).toBe('FOO');
			  \});
			  it('should handle composition functions from functions', async () => \{
			    const composer: ResolversComposition = next => (root, args, context, info) => 'FOO';
			    const transform = new ResolversCompositionTransform(\{
			      cache: new InMemoryLRUCache(),
			      pubsub: new PubSub(),
			      config: [
			        \{
			          resolver: 'Query.foo',
			          composer,
			        \},
			      ],
			      baseDir,
			      apiName: '',
			      importFn: m => import(m),
			    \});
			    const schema = makeExecutableSchema(\{
			      typeDefs: /* GraphQL */ \`
			        type Query \{
			          foo: String
			        \}
			      \`,
			      resolvers: \{
			        Query: \{
			          foo: () => 'BAR',
			        \},
			      \},
			    \});
			    const transformedSchema = transform.transformSchema(schema);
			    const result = await execute(\{
			      schema: transformedSchema,
			      document: parse(/* GraphQL */ \`
			        \{
			          foo
			        \}
			      \`),
			    \});
			    expect(result.data?.foo).toBe('FOO');
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\resolvers-composition\\test\\transform.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\transforms\\snapshot\\test\\snapshot.spec.ts', () => {
        const sourceCode = `
			import SnapshotTransform from '../src';
			import \{ computeSnapshotFilePath \} from '../src/compute-snapshot-file-path';
			import \{ makeExecutableSchema \} from '@graphql-tools/schema';
			import \{ graphql, GraphQLResolveInfo \} from 'graphql';
			import InMemoryLRUCache from '@graphql-mesh/cache-localforage';
			import \{ MeshPubSub \} from '@graphql-mesh/types';
			import \{ PubSub \} from '@graphql-mesh/utils';
			import \{ join \} from 'path';
			import \{ tmpdir \} from 'os';
			import \{ wrapSchema \} from '@graphql-tools/wrap';
			import _ from 'lodash';
			import graphqlFields from 'graphql-fields';
			import \{ mkdir, rmdirs \} from '@graphql-mesh/utils';
			
			describe('snapshot', () => \{
			  const baseDir: string = undefined;
			  const outputDir = join(tmpdir(), '__snapshots__');
			  const users = [
			    \{
			      id: '0',
			      name: 'Uri Goldshtein',
			      age: 20,
			      email: 'uri.goldshtein@gmail.com',
			      address: 'Earth',
			    \},
			    \{
			      id: '1',
			      name: 'Dotan Simha',
			      age: 19,
			      email: 'dotansimha@gmail.com',
			      address: 'Moon',
			    \},
			  ];
			  let pubsub: MeshPubSub;
			  beforeEach(async () => \{
			    pubsub = new PubSub();
			    await mkdir(outputDir);
			  \});
			  afterEach(async () => \{
			    await rmdirs(outputDir);
			  \});
			  it('it writes correct output', async () => \{
			    const schema = wrapSchema(\{
			      schema: makeExecutableSchema(\{
			        typeDefs: /* GraphQL */ \`
			          type Query \{
			            user(id: ID): User
			          \}
			          type User \{
			            id: ID
			            name: String
			            age: Int
			            email: String
			            address: String
			          \}
			        \`,
			        resolvers: \{
			          Query: \{
			            user: (_, args) => users.find(user => args.id === user.id),
			          \},
			        \},
			      \}),
			      transforms: [
			        new SnapshotTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            apply: ['Query.user'],
			            outputDir,
			          \},
			          cache: new InMemoryLRUCache(),
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    await graphql(\{
			      schema,
			      source: /* GraphQL */ \`
			        \{
			          user(id: "0") \{
			            id
			            name
			            age
			            email
			            address
			          \}
			        \}
			      \`,
			    \});
			
			    const fileName = computeSnapshotFilePath(\{
			      info: \{
			        parentType: \{
			          name: 'Query',
			        \},
			        fieldName: 'user',
			      \} as GraphQLResolveInfo,
			      args: \{ id: '0' \},
			      outputDir,
			    \});
			
			    expect(await import(fileName)).toMatchObject(users[0]);
			  \});
			
			  it('should not call again if there is snapshot created', async () => \{
			    let calledCounter = 0;
			    const schema = wrapSchema(\{
			      schema: makeExecutableSchema(\{
			        typeDefs: /* GraphQL */ \`
			          type Query \{
			            user(id: ID): User
			          \}
			          type User \{
			            id: ID
			            name: String
			            age: Int
			            email: String
			            address: String
			          \}
			        \`,
			        resolvers: \{
			          Query: \{
			            user: (_, args) => \{
			              calledCounter++;
			              return users.find(user => args.id === user.id);
			            \},
			          \},
			        \},
			      \}),
			      transforms: [
			        new SnapshotTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            apply: ['Query.user'],
			            outputDir,
			          \},
			          cache: new InMemoryLRUCache(),
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const doTheRequest = () =>
			      graphql(\{
			        schema,
			        source: /* GraphQL */ \`
			          \{
			            user(id: "1") \{
			              id
			              name
			              age
			              email
			              address
			            \}
			          \}
			        \`,
			      \});
			    await doTheRequest();
			    expect(calledCounter).toBe(1);
			    await doTheRequest();
			    expect(calledCounter).toBe(1);
			  \});
			  it('should respect selection set if respectSelectionSet is true', async () => \{
			    let calledCounter = 0;
			    const schema = wrapSchema(\{
			      schema: makeExecutableSchema(\{
			        typeDefs: /* GraphQL */ \`
			          type Query \{
			            user(id: ID): User
			          \}
			          type User \{
			            id: ID
			            name: String
			            age: Int
			            email: String
			            address: String
			          \}
			        \`,
			        resolvers: \{
			          Query: \{
			            user: (_, args, info) => \{
			              calledCounter++;
			              // filter results by selection set to project user object
			              // this mimics SQL handler behaviors
			              const fieldMap: Record<string, any> = graphqlFields(info);
			              const fields = Object.keys(fieldMap).filter(fieldName => Object.keys(fieldMap[fieldName]).length === 0);
			              const foundUser = users.find(user => args.id === user.id);
			              return foundUser ?? _.pick(foundUser, ...fields);
			            \},
			          \},
			        \},
			      \}),
			      transforms: [
			        new SnapshotTransform(\{
			          apiName: '',
			          importFn: m => import(m),
			          config: \{
			            apply: ['Query.user'],
			            outputDir,
			            respectSelectionSet: true,
			          \},
			          cache: new InMemoryLRUCache(),
			          pubsub,
			          baseDir,
			        \}),
			      ],
			    \});
			
			    const doTheRequest = () =>
			      graphql(\{
			        schema,
			        source: /* GraphQL */ \`
			          \{
			            user(id: "1") \{
			              id
			              name
			              age
			              email
			              address
			            \}
			          \}
			        \`,
			      \});
			    await doTheRequest();
			    expect(calledCounter).toBe(1);
			    await doTheRequest();
			    expect(calledCounter).toBe(1);
			
			    const doTheSecondRequest = () =>
			      graphql(\{
			        schema,
			        source: /* GraphQL */ \`
			          \{
			            user(id: "1") \{
			              id
			              name
			            \}
			          \}
			        \`,
			      \});
			    await doTheSecondRequest();
			    expect(calledCounter).toBe(2);
			    await doTheSecondRequest();
			    expect(calledCounter).toBe(2);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\transforms\\snapshot\\test\\snapshot.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(3)
    });
    it('urigo_graphql-mesh\\packages\\urql\\test\\urql-exchange.test.ts', () => {
        const sourceCode = `
			import \{ createClient, Client, OperationResult \} from '@urql/core';
			import \{ MeshInstance \} from '@graphql-mesh/runtime';
			import \{ meshExchange \} from '../src';
			import \{ getTestMesh \} from '../../testing/getTestMesh';
			import \{ observableToAsyncIterable \} from '@graphql-tools/utils';
			import \{ pipe, toObservable \} from 'wonka';
			
			describe('graphExchange', () => \{
			  let client: Client;
			  let mesh: MeshInstance;
			  beforeEach(async () => \{
			    mesh = await getTestMesh();
			    client = createClient(\{
			      url: 'http://mesh.com',
			      exchanges: [meshExchange(mesh)],
			    \});
			  \});
			  afterEach(() => \{
			    mesh?.destroy();
			  \});
			  it('should handle queries correctly', async () => \{
			    const result = await client
			      .query(
			        /* GraphQL */ \`
			          query Greetings \{
			            greetings
			          \}
			        \`
			      )
			      .toPromise();
			    expect(result.error).toBeUndefined();
			    expect(result.data).toEqual(\{
			      greetings: 'This is the \`greetings\` field of the root \`Query\` type',
			    \});
			  \});
			  it('should handle subscriptions correctly', async () => \{
			    const observable = pipe(
			      client.subscription(/* GraphQL */ \`
			        subscription Time \{
			          time
			        \}
			      \`),
			      toObservable
			    );
			
			    const asyncIterable = observableToAsyncIterable<OperationResult<any>>(observable);
			    let i = 0;
			    for await (const result of asyncIterable) \{
			      i++;
			      if (i === 2) \{
			        break;
			      \}
			      expect(result.error).toBeFalsy();
			      const date = new Date(result?.data?.time);
			      expect(date.getFullYear()).toBe(new Date().getFullYear());
			    \}
			    expect(i).toBe(2);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\urql\\test\\urql-exchange.test.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\utils\\test\\pubsub.spec.ts', () => {
        const sourceCode = `
			import \{ PubSub \} from '../src/pubsub';
			
			describe('Mesh PubSub', () => \{
			  it('should handle topics properly', async () => \{
			    const randomTopicName = Date.now().toString();
			    const pubSub = new PubSub();
			    const randomValues = new Array(10).fill(0).map(() => Date.now());
			
			    process.nextTick(() => \{
			      for (const value of randomValues) \{
			        pubSub.publish(randomTopicName, value);
			      \}
			    \});
			
			    const collectedValues: number[] = [];
			    for await (const value of pubSub.asyncIterator(randomTopicName)) \{
			      collectedValues.push(value);
			      if (collectedValues.length === randomValues.length) \{
			        break;
			      \}
			    \}
			
			    expect(collectedValues).toMatchObject(randomValues);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\utils\\test\\pubsub.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\packages\\utils\\test\\read-file-or-url.spec.ts', () => {
        const sourceCode = `
			import \{ writeFileSync \} from 'fs';
			import \{ tmpdir \} from 'os';
			import \{ join, relative \} from 'path';
			import \{ DefaultLogger \} from '../src/logger';
			import \{ readFile \} from '../src/read-file-or-url';
			import \{ fetch \} from 'cross-undici-fetch';
			
			describe('readFile', () => \{
			  it('should convert relative paths to absolute paths correctly', async () => \{
			    const tmpFileAbsolutePath = join(tmpdir(), './tmpfile.json');
			    const tmpFileContent = \{
			      test: 'TEST',
			    \};
			    writeFileSync(tmpFileAbsolutePath, JSON.stringify(tmpFileContent));
			    const tmpFileRelativePath = relative(process.cwd(), tmpFileAbsolutePath);
			    const receivedFileContent = await readFile(tmpFileRelativePath, \{
			      cwd: process.cwd(),
			      fetch,
			      logger: new DefaultLogger(),
			      importFn: m => import(m),
			    \});
			    expect(receivedFileContent).toStrictEqual(tmpFileContent);
			  \});
			  it('should respect absolute paths correctly', async () => \{
			    const tmpFileAbsolutePath = join(tmpdir(), './tmpfile.json');
			    const tmpFileContent = \{
			      test: 'TEST',
			    \};
			    writeFileSync(tmpFileAbsolutePath, JSON.stringify(tmpFileContent));
			    const receivedFileContent = await readFile(tmpFileAbsolutePath, \{
			      cwd: process.cwd(),
			      fetch,
			      logger: new DefaultLogger(),
			      importFn: m => import(m),
			    \});
			    expect(receivedFileContent).toStrictEqual(tmpFileContent);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\utils\\test\\read-file-or-url.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
    it('urigo_graphql-mesh\\packages\\utils\\test\\with-filter.spec.ts', () => {
        const sourceCode = `
			import \{ withFilter \} from '../src/with-filter';
			
			function isEven(x: number) \{
			  if (x === undefined) \{
			    throw Error('Undefined value passed to filterFn');
			  \}
			  return x % 2 === 0;
			\}
			
			const testFiniteAsyncIterator: AsyncIterableIterator<number> = (async function* () \{
			  for (const value of [1, 2, 3, 4, 5, 6, 7, 8]) \{
			    yield value;
			  \}
			\})();
			
			describe('withFilter', () => \{
			  it('works properly with finite asyncIterators', async () => \{
			    const filteredAsyncIterator = await withFilter(() => testFiniteAsyncIterator, isEven)();
			
			    for (let i = 1; i <= 4; i++) \{
			      const result = await filteredAsyncIterator.next();
			      expect(result).toBeDefined();
			      expect(result.value).toEqual(i * 2);
			      expect(result.done).toBe(false);
			    \}
			    const doneResult = await filteredAsyncIterator.next();
			    expect(doneResult).toBeDefined();
			    expect(doneResult.value).toBeUndefined();
			    expect(doneResult.done).toBe(true);
			  \});
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\packages\\utils\\test\\with-filter.spec.ts')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(1)
    });
    it('urigo_graphql-mesh\\website\\src\\pages\\api\\covid\\json-schema-covid\\tests\\json-schema-covid.test.js', () => {
        const sourceCode = `
			const \{ findAndParseConfig \} = require('@graphql-mesh/cli');
			const \{ getMesh \} = require('@graphql-mesh/runtime');
			const \{ join \} = require('path');
			
			const \{ printSchema, lexicographicSortSchema \} = require('graphql');
			const \{ readFile \} = require('fs-extra');
			
			const config\$ = findAndParseConfig(\{
			  dir: join(__dirname, '..'),
			\});
			
			const mesh\$ = config\$.then(config => getMesh(config));
			jest.setTimeout(30000);
			
			describe('JSON Schema Covid', () => \{
			  it('should generate correct schema', async () => \{
			    const \{ schema \} = await mesh\$;
			    expect(
			      printSchema(lexicographicSortSchema(schema), \{
			        descriptions: false,
			      \})
			    ).toMatchSnapshot('json-schema-covid-schema');
			  \});
			  it('should give correct response for STEP 1: 2 sources side by side', async () => \{
			    const getDataStep1Query = await readFile(join(__dirname, '../example-queries/getData_step1.graphql'), 'utf8');
			    const \{ execute \} = await mesh\$;
			    const result = await execute(getDataStep1Query);
			    expect(result.errors).toBeFalsy();
			    // Check exposed response metadata
			    expect(result.data?.population?._response).toMatchSnapshot('json-schema-covid-response-metadata');
			
			    expect(typeof result?.data?.case?.confirmed).toBe('number');
			    expect(result?.data?.case?.countryRegion).toBe('France');
			    expect(typeof result?.data?.case?.deaths).toBe('number');
			
			    expect(result?.data?.population?.records).toHaveLength(1);
			    expect(result?.data?.population?.records[0]?.fields?.country_name).toBe('France');
			    expect(typeof result?.data?.population?.records[0]?.fields?.value).toBe('number');
			  \});
			  it.skip('should give correct response for STEP1: 2 sources side by side', async () => \{
			    const getDataStep1Query = await readFile(join(__dirname, '../example-queries/getData_step1.graphql'), 'utf8');
			    const \{ execute \} = await mesh\$;
			    const result = await execute(getDataStep1Query);
			    expect(result.errors?.length).toBeFalsy();
			    expect(typeof result?.data?.case?.confirmed).toBe('number');
			    expect(result?.data?.case?.countryRegion).toBe('France');
			    expect(typeof result?.data?.case?.deaths).toBe('number');
			
			    expect(result?.data?.population?.records?.length).toBe(1);
			    expect(result?.data?.population?.records[0]?.fields?.country_name).toBe('France');
			    expect(typeof result?.data?.population?.records[0]?.fields?.value).toBe('number');
			  \});
			  it.skip('should give correct response for STEP2: 2 sources combined', async () => \{
			    const getDataStep2Query = await readFile(join(__dirname, '../example-queries/getData_step2.graphql'), 'utf8');
			    const \{ execute \} = await mesh\$;
			    const result = await execute(getDataStep2Query);
			    expect(result.errors).toBeFalsy();
			    expect(typeof result?.data?.case?.confirmed).toBe('number');
			    expect(typeof result?.data?.case?.deaths).toBe('number');
			
			    expect(result?.data?.case?.population?.records?.length).toBe(1);
			    expect(typeof result?.data?.case?.population?.records[0]?.fields?.value).toBe('number');
			  \});
			  it.skip('should give correct response for STEP3_1: 2 sources combined to get ratios', async () => \{
			    const getDataStep3_1Query = await readFile(join(__dirname, '../example-queries/getData_step3_1.graphql'), 'utf8');
			    const \{ execute \} = await mesh\$;
			    const result = await execute(getDataStep3_1Query);
			    expect(result.errors).toBeFalsy();
			    expect(typeof result?.data?.fr?.deathRatio).toBe('number');
			
			    expect(typeof result?.data?.at?.deathRatio).toBe('number');
			  \});
			  it.skip('should give correct response for STEP3_2: 2 sources combined to get ratios & case & population', async () => \{
			    const getDataStep3_2Query = await readFile(join(__dirname, '../example-queries/getData_step3_2.graphql'), 'utf8');
			    const \{ execute \} = await mesh\$;
			    const result = await execute(getDataStep3_2Query);
			    expect(result.errors).toBeFalsy();
			    expect(typeof result?.data?.fr?.deathRatio).toBe('number');
			    expect(typeof result?.data?.fr?.case?.deaths).toBe('number');
			    expect(result?.data?.fr?.population?.records?.length).toBe(1);
			    expect(typeof result?.data?.fr?.population?.records[0]?.fields?.value).toBe('number');
			
			    expect(typeof result?.data?.at?.deathRatio).toBe('number');
			    expect(typeof result?.data?.at?.case?.deaths).toBe('number');
			    expect(result?.data?.at?.population?.records?.length).toBe(1);
			    expect(typeof result?.data?.at?.population?.records[0]?.fields?.value).toBe('number');
			  \});
			  afterAll(() => mesh\$.then(mesh => mesh.destroy()));
			\});
			`

		const tests = extractFromSource(sourceCode, 'urigo_graphql-mesh\\website\\src\\pages\\api\\covid\\json-schema-covid\\tests\\json-schema-covid.test.js')
		const assertions = tests.flatMap(test => test.assertions).filter(assertion => ['expect', 'assert'].includes(assertion.identifier)).length;

		expect(tests.length).toBe(2)
    });
});
