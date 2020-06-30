import { STREAM_DATA_RATE_MILISECONDS } from './../config'

import { Data } from './types'

export const parseData = (data: string): string[] => data.split('\n').filter(Boolean)

export const simulateDataStream = ({ data, streamer }: { data: string[]; streamer: any }): void => {
	data.forEach((d, i, array) => {
		setTimeout(() => {
			streamer.write(`${d}\n`)

			const isEndOfStream = i === array.length - 1
			if (isEndOfStream) streamer.end()
		}, i * STREAM_DATA_RATE_MILISECONDS)
	})
}

export const displayMessage = (data: Data, message = {}): void => {
	const { rate, ...timeStampAndCurrencyPair } = data

	console.info({ ...timeStampAndCurrencyPair, ...message })
}
