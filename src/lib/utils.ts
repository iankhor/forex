import { STREAM_DATA_RATE_MILISECONDS } from './../config'

export const parseData = (data: string): string[] => data.split('\n').filter(Boolean)

export const simulateDataStream = ({ data, streamer }) => {
	data.forEach((data, i, array) => {
		setTimeout(() => {
			streamer.write(`${data}\n`)

			const isEndOfStream = i === array.length - 1
			if (isEndOfStream) streamer.end()
		}, i * STREAM_DATA_RATE_MILISECONDS)
	})
}

export const displayMessage = (data, message = {}) => {
	const { rate, ...timeStampAndCurrencyPair } = data

	console.info({ ...timeStampAndCurrencyPair, ...message })
}
