import Rate from './Rate'

export default class CurrencyPairs {
	constructor({ rateConfig }) {
		this.#rateConfig = rateConfig
	}

	tracked: Rate[] = []
	#rateConfig = {}

	track = (currencyPair) => {
		if (this.#isTracked(currencyPair)) return

		this.tracked = [...this.tracked, new Rate({ ...this.#rateConfig, currencyPair })]
	}

	find = (currencyPair) => this.tracked.find((cp) => cp.currencyPair === currencyPair)

	#isTracked = (currencyPair) => this.tracked.some((cp) => cp.currencyPair === currencyPair)
}
