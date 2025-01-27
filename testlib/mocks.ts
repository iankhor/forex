export const mockRawDataStream = ({
	duration = 1,
	currencyPairName = 'CNYUSD',
	rate = 1.2345,
	startTime = 1554933784.023,
} = {}) => {
	let data = ''
	for (let i = 1; i <= duration; i++) {
		data = data.concat(`{ "timestamp": ${startTime + i}, "currencyPair": "${currencyPairName}", "rate": ${rate} }\n`)
	}

	return data
}
