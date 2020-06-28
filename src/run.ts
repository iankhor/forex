import fs from 'fs'

import { DEFAULT_DATA_FILE_PATH } from './config'
import CurrencyPairs from './lib/CurrencyPairs'
import { parseData, simulateDataStream } from './lib/utils'
import { setupDataStreamer } from './lib/dataStream'

const filePath = process.argv[2] || DEFAULT_DATA_FILE_PATH
!process.argv[2] && console.log(`No filepath supplied, using ${DEFAULT_DATA_FILE_PATH}\n`)

const rawData = fs.readFileSync(filePath, { encoding: 'utf-8' })
const data = parseData(rawData)

const currencyPairs = new CurrencyPairs()
const streamerConfig = { currencyPairs }
const streamer = setupDataStreamer(streamerConfig)

simulateDataStream({ data, streamer })
