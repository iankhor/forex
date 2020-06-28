import { processDataStream } from './dataStream'
import CurrencyPairs from './CurrencyPairs'
import Rate from './Rate'
import { displayMessage } from './utils'

jest.mock('./utils')

const mockDisplayMessage = displayMessage as jest.Mock<any>

describe('processDataStream', () => {
	const rateConfig = {
		averagePeriod: 2,
		spotChangePercentageAlert: 5,
		trendDurationThreshold: 2,
		trendAlertPeriod: 2,
	}

	// TODO: refactor
	it('alerts when spot price changes above a percentage', () => {
		const currencyPair = new CurrencyPairs({ rateConfig })

		currencyPair.track('ABCPQR')
		const rate = currencyPair.find('ABCPQR') as Rate

		const exisitingMockData = [{ rate: 1 }, { rate: 1 }, { rate: 2 }]
		exisitingMockData.forEach((d) => rate.record(d.rate))
		const mockCurrentData = { rate: 5, currencyPair: 'ABCPQR' }
		processDataStream(mockCurrentData, currencyPair)

		expect(mockDisplayMessage).toHaveBeenCalledWith(mockCurrentData, { alert: 'spotChange' })
	})

	it('alerts when price is trending', () => {
		const currencyPair = new CurrencyPairs({ rateConfig })

		currencyPair.track('ABCPQR')
		const rate = currencyPair.find('ABCPQR') as Rate

		const exisitingMockData = [{ rate: 1 }, { rate: 1 }, { rate: 2 }]
		exisitingMockData.forEach((d) => rate.record(d.rate))
		const mockCurrentData = { rate: 5, currencyPair: 'ABCPQR' }
		processDataStream(mockCurrentData, currencyPair)

		expect(mockDisplayMessage).toHaveBeenCalledWith(mockCurrentData, { alert: 'rising', seconds: 2 })
	})
})
