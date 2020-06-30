import Rate from './Rate'
import { RateConfig } from './types'

export default class CurrencyPairs {
	constructor({ rateConfig }: { rateConfig: RateConfig }) {
		this.#rateConfig = rateConfig
	}

	tracked: Rate[] = []
	#rateConfig = {}

	track = (currencyPair: string): void => {
		if (this.#isTracked(currencyPair)) return

		this.tracked = [...this.tracked, new Rate({ ...this.#rateConfig, currencyPair })]
	}

	find = (currencyPair: string): Rate | undefined => this.tracked.find((cp) => cp.currencyPair === currencyPair)

	#isTracked = (currencyPair: string): boolean => this.tracked.some((cp) => cp.currencyPair === currencyPair)
}
