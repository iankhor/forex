import Rate from './Rate'
import {
	AVERAGE_PERIOD_SECONDS,
	TREND_DURATION_THRESHOLD,
	TREND_ALERT_PERIOD,
	SPOT_CHANGE_ALERT_THRESHOLD_PERCENTAGE,
} from './../config'

const rateConfig = {
	averagePeriod: AVERAGE_PERIOD_SECONDS,
	trendDurationThreshold: TREND_DURATION_THRESHOLD,
	trendAlertPeriod: TREND_ALERT_PERIOD,
	spotChangePercentageAlert: SPOT_CHANGE_ALERT_THRESHOLD_PERCENTAGE,
}

export default class CurrencyPairs {
	tracked: Rate[] = []

	track = (currencyPair) => {
		if (this.#isTracked(currencyPair)) return

		this.tracked = [...this.tracked, new Rate({ ...rateConfig, currencyPair })]
	}

	find = (currencyPair) => this.tracked.find((cp) => cp.currencyPair === currencyPair)

	#isTracked = (currencyPair) => this.tracked.some((cp) => cp.currencyPair === currencyPair)
}
