import run from 'inquirer-test'

// This spec requires a rerun of jest as it relies on node and the latest compiled run.js
const runPath = `${process.cwd()}/build/run.js`

test('the app runs', async () => {
	const mockDataStream = `${process.cwd()}/testlib/fixtures/mock_data_stream.jsonl`
	const result = await run([runPath, mockDataStream], [])

	expect(result).toMatch(new RegExp('Start of simulated stream', 'g'))
	expect(result).toMatch(new RegExp("{ timestamp: 1554934083.023, currencyPair: 'EURUSD', rate: 1.2345 }", 'g'))
	expect(result).toMatch(new RegExp("{ timestamp: 1554934085.023, currencyPair: 'EURUSD', rate: 1.4814 }", 'g'))
	expect(result).toMatch(new RegExp('End of simulated stream', 'g'))
})
