import Rate from './Rate'

describe('Rates', () => {
	it('has a currencyPair field', () => {
		const rate = new Rate({ currencyPair: 'ABCPQE' })

		expect(rate.currencyPair).toEqual('ABCPQE')
	})

	describe('trendDuration', () => {
		describe('constant trend', () => {
			it('counts the duration of a trend', () => {
				const rate = new Rate()

				const mockDataStream = [{ rate: 1 }, { rate: 2 }, { rate: 3 }, { rate: 4 }]
				mockDataStream.forEach((d) => rate.record(d.rate))

				expect(rate.trendDuration).toEqual(3)
			})
		})

		describe('changing (volatile) trend', () => {
			it('resets the count', () => {
				const rate = new Rate()

				const mockDataStream = [{ rate: 1 }, { rate: 9 }, { rate: 10 }, { rate: 6 }]
				mockDataStream.forEach((d) => rate.record(d.rate))

				expect(rate.trendDuration).toEqual(1)
			})
		})
	})

	describe('currentTrend', () => {
		describe('volatile rates', () => {
			it('returns null', () => {
				const rate = new Rate()

				const mockDataStream = [{ rate: 1 }, { rate: 2 }, { rate: 1 }, { rate: 2 }]
				mockDataStream.forEach((d) => rate.record(d.rate))

				expect(rate.currentTrend()).toEqual(null)
			})
		})

		describe('rising rates', () => {
			it('returns rising', () => {
				const rate = new Rate({ trendDurationThreshold: 2 })

				const mockDataStream = [{ rate: 1 }, { rate: 2 }, { rate: 3 }, { rate: 4 }]
				mockDataStream.forEach((d) => rate.record(d.rate))

				expect(rate.currentTrend()).toEqual('rising')
			})
		})

		describe('falling rates', () => {
			it('returns falling', () => {
				const rate = new Rate({ trendDurationThreshold: 3 })

				const mockDataStream = [{ rate: 4 }, { rate: 3 }, { rate: 2 }, { rate: 1 }]
				mockDataStream.forEach((d) => rate.record(d.rate))

				expect(rate.currentTrend()).toEqual('falling')
			})
		})

		describe('constant rates', () => {
			it('returns unchanged', () => {
				const rate = new Rate({ trendDurationThreshold: 3 })

				const mockDataStream = [{ rate: 2 }, { rate: 2 }, { rate: 2 }, { rate: 2 }]
				mockDataStream.forEach((d) => rate.record(d.rate))

				expect(rate.currentTrend()).toEqual('unchanged')
			})
		})
	})

	describe('isSpotChangeAlert', () => {
		it('is true when the change in spot rate is more than the desired alert percentage', () => {
			const rate = new Rate({
				spotChangePercentageAlert: 5,
				averagePeriod: 2,
			})

			const mockDataStream = [{ rate: 1 }, { rate: 2 }, { rate: 3 }]
			mockDataStream.forEach((d) => rate.record(d.rate))

			expect(rate.isSpotChangeAlert()).toEqual(true)
		})

		it('is false when the change in spot rate is less than the desired alert percentage', () => {
			const rate = new Rate({
				spotChangePercentageAlert: 5,
				averagePeriod: 2,
			})

			const mockDataStream = [{ rate: 1 }, { rate: 1 }, { rate: 1 }]
			mockDataStream.forEach((d) => rate.record(d.rate))

			expect(rate.isSpotChangeAlert()).toEqual(false)
		})
	})

	describe('isTrendAlert', () => {
		it('is false when trend is unchanged', () => {
			const rate = new Rate({ trendDurationThreshold: 2 })

			const mockDataStream = [{ rate: 1 }, { rate: 1 }, { rate: 1 }, { rate: 1 }]
			mockDataStream.forEach((d) => rate.record(d.rate))

			expect(rate.isTrendAlert()).toEqual(false)
		})

		it('is true is it trend is rising', () => {
			const rate = new Rate({ trendDurationThreshold: 3, trendAlertFrequency: 1 })

			const mockDataStream = [{ rate: 1 }, { rate: 2 }, { rate: 3 }, { rate: 4 }]
			mockDataStream.forEach((d) => rate.record(d.rate))

			expect(rate.isTrendAlert()).toEqual(true)
		})

		it('is true is it trend is falling', () => {
			const rate = new Rate({ trendDurationThreshold: 3, trendAlertFrequency: 1 })

			const mockDataStream = [{ rate: 5 }, { rate: 4 }, { rate: 3 }, { rate: 2 }]
			mockDataStream.forEach((d) => rate.record(d.rate))

			expect(rate.isTrendAlert()).toEqual(true)
		})

		it('is true alert period is a multiple of the trend duration', () => {
			const rate = new Rate({ trendDurationThreshold: 2, trendAlertFrequency: 2 })

			const mockDataStream = [{ rate: 5 }, { rate: 1 }, { rate: 0 }]
			mockDataStream.forEach((d) => rate.record(d.rate))

			expect(rate.isTrendAlert()).toEqual(true)
		})

		it('is false alert period is NOT a multiple of the trend duration', () => {
			const rate = new Rate({ trendDurationThreshold: 2, trendAlertFrequency: 3 })

			const mockDataStream = [{ rate: 5 }, { rate: 1 }, { rate: 0 }]
			mockDataStream.forEach((d) => rate.record(d.rate))

			expect(rate.isTrendAlert()).toEqual(false)
		})
	})
})
