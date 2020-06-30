import fs from 'fs'

import {
	DEFAULT_DATA_FILE_PATH,
	AVERAGE_PERIOD_SECONDS,
	TREND_DURATION_THRESHOLD_SECONDS,
	TREND_ALERT_FREQUENCY_SECONDS,
	SPOT_CHANGE_ALERT_THRESHOLD_PERCENTAGE,
} from './config'
import CurrencyPairs from './lib/CurrencyPairs'
import { parseData, simulateDataStream } from './lib/utils'
import { setupDataStreamer } from './lib/dataStream'

const rateConfig = {
	averagePeriod: AVERAGE_PERIOD_SECONDS,
	trendDurationThreshold: TREND_DURATION_THRESHOLD_SECONDS,
	trendAlertFrequency: TREND_ALERT_FREQUENCY_SECONDS,
	spotChangePercentageAlert: SPOT_CHANGE_ALERT_THRESHOLD_PERCENTAGE,
}

const filePath = process.argv[2] || DEFAULT_DATA_FILE_PATH
!process.argv[2] && console.log(`No filepath supplied, using ${DEFAULT_DATA_FILE_PATH}\n`)

const rawData = fs.readFileSync(filePath, { encoding: 'utf-8' })
const data = parseData(rawData)

const currencyPairs = new CurrencyPairs({ rateConfig })
const streamerConfig = { currencyPairs }
const streamer = setupDataStreamer(streamerConfig)

simulateDataStream({ data, streamer })
