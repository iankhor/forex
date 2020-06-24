import fs from 'fs'
import { DEFAULT_DATA_FILE_PATH } from './config'
import { parseData, simulateDataStream } from './lib/utils'
import jsonLines from 'jsonlines'

const streamer = jsonLines.parse()
const filePath = process.argv[2] || DEFAULT_DATA_FILE_PATH
!process.argv[2] && console.log(`No filepath supplied, using ${DEFAULT_DATA_FILE_PATH}\n`)

const rawData = fs.readFileSync(filePath, { encoding: 'utf-8' })
const dataStream = parseData(rawData)

console.info('Start of simulated stream')
streamer.on('data', (data) => console.info('Received data:', data))
streamer.on('end', () => console.info('End of simulated stream'))

simulateDataStream({ data: dataStream, streamer })
