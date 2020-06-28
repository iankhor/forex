import Rate from './../lib/Rate'
import jsonLines from 'jsonlines'

import { displayMessage } from './utils'

export const processDataStream = (data, currencyPairs): void => {
	displayMessage(data, { rate: data.rate })

	currencyPairs.track(data.currencyPair)

	const rate = currencyPairs.find(data.currencyPair)
	rate.record(data.rate)

	const { currentTrend, trendDuration, isSpotChangeAlert, isTrendAlert } = rate as Rate

	isSpotChangeAlert() && displayMessage(data, { alert: 'spotChange' })
	isTrendAlert() && displayMessage(data, { alert: currentTrend(), seconds: trendDuration })
}

export const setupDataStreamer = ({ currencyPairs }) => {
	const streamer = jsonLines.parse()

	console.info('Start of simulated stream')
	streamer.on('data', (data) => processDataStream(data, currencyPairs))
	streamer.on('end', () => console.info('End of simulated stream'))

	return streamer
}
