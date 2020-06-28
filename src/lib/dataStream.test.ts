import { processDataStream } from './dataStream'
import CurrencyPairs from './CurrencyPairs'
import { displayMessage } from './utils'

jest.mock('./utils')

const mockDisplayMessage = displayMessage as jest.Mock<any>

describe('processDataStream', () => {
	it('does magic', () => {
		const currencyPairs = new CurrencyPairs()
		processDataStream({}, currencyPairs)

		expect(mockDisplayMessage).toHaveBeenCalledTimes(1)
	})
})
