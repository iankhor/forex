import CurrencyPairs from './CurrencyPairs'
import Rate from './Rate'
import { rateConfig } from './../config'

describe('CurrencyPair', () => {
	describe('track', () => {
		it('tracks currency pairs', () => {
			const currencyPair = new CurrencyPairs({ rateConfig })

			currencyPair.track('ABCPQR')
			currencyPair.track('XYZ123')

			const currencyPairsTracked = currencyPair.tracked.map((t) => t.currencyPair)

			expect(currencyPair.tracked).toHaveLength(2)
			expect(currencyPairsTracked).toEqual(expect.arrayContaining(['XYZ123', 'ABCPQR']))
		})

		it('does not duplicate its tracking for existing currency pair', () => {
			const currencyPair = new CurrencyPairs({ rateConfig })

			currencyPair.track('ABCPQR')
			currencyPair.track('ABCPQR')

			const currencyPairsTracked = currencyPair.tracked.map((t) => t.currencyPair)

			expect(currencyPair.tracked).toHaveLength(1)
			expect(currencyPairsTracked).toEqual(expect.arrayContaining(['ABCPQR']))
		})
	})

	describe('find', () => {
		it('returns Rate instance of desired currency pair', () => {
			const currencyPair = new CurrencyPairs({ rateConfig })

			currencyPair.track('ABCPQR')
			currencyPair.track('XYZ123')

			const rate = currencyPair.find('XYZ123') as Rate

			expect(rate.currencyPair).toEqual('XYZ123')
		})
	})
})
