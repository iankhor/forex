import run from 'inquirer-test'

console.log('FEATURE SPECS, WILL TAKE ABOUT 3-4 mins ')
// This spec requires a rerun of jest as it relies on node and the latest compiled run.js
const runPath = `${process.cwd()}/build/run.js`

test('the app runs', async () => {
	jest.setTimeout(10000)

	const mockDataStream = `${process.cwd()}/testlib/fixtures/mock_stream_short.jsonl`
	const result = await run([runPath, mockDataStream], [])

	expect(result).toMatch(new RegExp('Start of simulated stream', 'g'))
	expect(result).toMatch(
		new RegExp("Received data: { timestamp: 1554933785.023, currencyPair: 'CNYUSD', rate: 1.23456 }", 'g')
	)
	expect(result).toMatch(new RegExp('End of simulated stream', 'g'))
})

test.skip('alerts user when rate is more than 10% of 5 minute average', async () => {
	jest.setTimeout(70000)

	const mockDataStream = `${process.cwd()}/testlib/fixtures/mock_stream_10percent_change.jsonl`
	const result = await run([runPath, mockDataStream], [])

	expect(result).toMatch(
		new RegExp('{ "timestamp": 1554934085.023, "currencyPair": "EURUSD", "alert": "spotChange" }', 'g')
	)
})

test.skip('alerts user when price is rising/falling for 15 minutes', async () => {
	jest.setTimeout(300000)

	const mockDataStream = `${process.cwd()}/testlib/fixtures/mock_stream_fall.jsonl`
	const result = await run([runPath, mockDataStream], [])

	expect(result).toMatch(
		new RegExp('{ "timestamp": 1554934085.023, "currencyPair": "EURUSD", "alert": "spotChange" }', 'g')
	)
})
