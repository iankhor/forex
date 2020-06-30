import { processDataStream } from './dataStream'
import CurrencyPairs from './CurrencyPairs'
import Rate from './Rate'
import { displayMessage } from './utils'

jest.mock('./utils')

const mockDisplayMessage = displayMessage as jest.Mock<any>

describe('processDataStream', () => {
	const setupTest = ({ testConfig = {} } = {}) => {
		const defaultConfig = {
			averagePeriod: 2,
			trendDurationThreshold: 2,
			spotChangePercentageAlert: 5,
			trendAlertFrequency: 2,
		}
		const currencyPair = new CurrencyPairs({ rateConfig: { ...defaultConfig, ...testConfig } })

		currencyPair.track('ABCPQR')
		const rate = currencyPair.find('ABCPQR') as Rate

		const exisitingMockData = [{ rate: 1 }, { rate: 1 }, { rate: 2 }]
		exisitingMockData.forEach((d) => rate.record(d.rate))

		return currencyPair
	}

	afterEach(() => jest.clearAllMocks())

	describe('spot change alert', () => {
		it('triggers alerts when spot price changes above the alert percentage', () => {
			const currencyPair = setupTest({
				testConfig: { spotChangePercentageAlert: 2 },
			})

			const mockCurrentData = { rate: 5, currencyPair: 'ABCPQR' }
			processDataStream(mockCurrentData, currencyPair)

			expect(mockDisplayMessage).toHaveBeenCalledWith(mockCurrentData, { alert: 'spotChange' })
		})

		it('does not trigger alerts when spot price changes is below the alert percentage', () => {
			const currencyPair = setupTest({
				testConfig: { spotChangePercentageAlert: 200 },
			})

			const mockCurrentData = { rate: 5, currencyPair: 'ABCPQR' }
			processDataStream(mockCurrentData, currencyPair)

			expect(mockDisplayMessage).not.toHaveBeenCalledWith(mockCurrentData, { alert: 'spotChange' })
		})
	})

	describe('trend alert', () => {
		it('triggers alerts when price is trending', () => {
			const currencyPair = setupTest({
				testConfig: { trendDurationThreshold: 5 },
			})

			const mockCurrentData = { rate: 5, currencyPair: 'ABCPQR' }
			processDataStream(mockCurrentData, currencyPair)

			expect(mockDisplayMessage).toHaveBeenCalledWith(mockCurrentData, { alert: 'rising', seconds: 2 })
		})

		it('does not triggers alerts when price is not trending', () => {
			const currencyPair = setupTest({
				testConfig: { trendDurationThreshold: 900 },
			})

			const mockCurrentData = { rate: 5, currencyPair: 'ABCPQR' }
			processDataStream(mockCurrentData, currencyPair)

			expect(mockDisplayMessage).not.toHaveBeenCalledWith(mockCurrentData, { alert: 'rising', seconds: 2 })
		})

		describe('trend alert period', () => {
			it('triggers alert at desired frequency', () => {
				const currencyPair = setupTest({
					testConfig: { trendAlertFrequency: 2 },
				})

				const mockCurrentData = { rate: 5, currencyPair: 'ABCPQR' }
				processDataStream(mockCurrentData, currencyPair)

				expect(mockDisplayMessage).toHaveBeenCalledWith(mockCurrentData, { alert: 'rising', seconds: 2 })
			})

			it('does not triggers alert outside desired frequency', () => {
				const currencyPair = setupTest({
					testConfig: { trendAlertFrequency: 900 },
				})

				const mockCurrentData = { rate: 5, currencyPair: 'ABCPQR' }
				processDataStream(mockCurrentData, currencyPair)

				expect(mockDisplayMessage).not.toHaveBeenCalledWith(mockCurrentData, { alert: 'rising', seconds: 2 })
			})
		})
	})
})
