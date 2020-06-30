import Rate from './../lib/Rate'
import CurrencyPairs from './CurrencyPairs'
import jsonLines from 'jsonlines'

import { displayMessage } from './utils'
import { Data, DataStreamerProps } from './types'

export const processDataStream = (data: Data, currencyPairs: CurrencyPairs): void => {
	displayMessage(data, { rate: data.rate })

	currencyPairs.track(data.currencyPair)

	const rate = currencyPairs.find(data.currencyPair) as Rate
	rate.record(data.rate)

	const { currentTrend, trendDuration, isSpotChangeAlert, isTrendAlert } = rate

	isSpotChangeAlert() && displayMessage(data, { alert: 'spotChange' })
	isTrendAlert() && displayMessage(data, { alert: currentTrend(), seconds: trendDuration })
}

export const setupDataStreamer = ({ currencyPairs }: DataStreamerProps): void => {
	const streamer = jsonLines.parse()

	console.info('Start of simulated stream')
	streamer.on('data', (data: Data) => processDataStream(data, currencyPairs))
	streamer.on('end', () => console.info('End of simulated stream'))

	return streamer
}
