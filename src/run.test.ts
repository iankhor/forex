import run from 'inquirer-test'

// This spec requires a rerun of jest as it relies on node and the latest compiled run.js
const runPath = `${process.cwd()}/build/run.js`

test('the app runs', async () => {
	// extended jest's default timeout as the simulated data streams at 1 second per data point
	jest.setTimeout(10000)

	const mockDataStream = `${process.cwd()}/testlib/fixtures/mock_stream_short.jsonl`
	const result = await run([runPath, mockDataStream], [])

	expect(result).toMatch(new RegExp('Start of simulated stream', 'g'))
})
