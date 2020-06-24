export const parseData = (data: string): string[] => data.split('\n').filter(Boolean)

export const simulateDataStream = ({ data, streamer }) => {
	data.forEach((data, i, array) => {
		setTimeout(() => {
			streamer.write(`${data}\n`)

			const isEndOfStream = i === array.length - 1
			if (isEndOfStream) streamer.end()
		}, i * 1000)
	})
}
