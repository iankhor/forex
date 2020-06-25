import CurrencyPairs from './lib/CurrencyPairs'
import Rate from './lib/Rate'
import fs from 'fs'
import { DEFAULT_DATA_FILE_PATH, AVERAGE_PERIOD_SECONDS, TREND_DURATION_THRESHOLD, TREND_ALERT_PERIOD } from './config'
import { parseData, simulateDataStream, displayMessage } from './lib/utils'
import jsonLines from 'jsonlines'
const streamer = jsonLines.parse()
const filePath = process.argv[2] || DEFAULT_DATA_FILE_PATH
!process.argv[2] && console.log(`No filepath supplied, using ${DEFAULT_DATA_FILE_PATH}\n`)

const rawData = fs.readFileSync(filePath, { encoding: 'utf-8' })
const dataStream = parseData(rawData)
const currencyPairs = new CurrencyPairs()

const processDataStream = (data) => {
	displayMessage(data, { rate: data.rate })

	currencyPairs.track(data.currencyPair)

	const rate = currencyPairs.find(data.currencyPair)
	const { record, currentTrend, trendDuration, isSpotChangeAlert, isTrendAlert } = rate as Rate

	record(data.rate)
	isSpotChangeAlert() && displayMessage(data, { alert: 'spotChange' })
	isTrendAlert() && displayMessage(data, { alert: currentTrend(), seconds: trendDuration })
}

console.info('Start of simulated stream')
streamer.on('data', processDataStream)
streamer.on('end', () => console.info('End of simulated stream'))
simulateDataStream({ data: dataStream, streamer })
