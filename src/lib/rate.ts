import {
	AVERAGE_PERIOD_SECONDS,
	TREND_DURATION_THRESHOLD_SECONDS,
	TREND_ALERT_FREQUENCY_SECONDS,
	SPOT_CHANGE_ALERT_THRESHOLD_PERCENTAGE,
} from './../config'

export default class Rate {
	constructor({
		averagePeriod = AVERAGE_PERIOD_SECONDS,
		trendDurationThreshold = TREND_DURATION_THRESHOLD_SECONDS,
		trendAlertFrequency = TREND_ALERT_FREQUENCY_SECONDS,
		currencyPair = '',
		spotChangePercentageAlert = SPOT_CHANGE_ALERT_THRESHOLD_PERCENTAGE,
	} = {}) {
		this.#averagePeriod = averagePeriod
		this.#trendDurationThreshold = trendDurationThreshold
		this.#trendAlertFrequency = trendAlertFrequency
		this.#spotChangePercentageAlert = spotChangePercentageAlert
		this.currencyPair = currencyPair
	}

	trendDuration: number = 0
	currencyPair: string = ''

	#spotChangePercentageAlert: number
	#averagePeriod: number
	#history: number[] = []
	#trendDurationThreshold: number
	#trendAlertFrequency: number
	#trends: string[] = []

	record = (currentRate: number): void => {
		this.#history = [...this.#history, currentRate]

		const previousRate = this.#history[this.#history.length - 2]
		this.#recordTrend(previousRate, currentRate)
	}

	currentTrend = (): string | null => (this.#isTrending() ? this.#currentTrends()[0] : null)

	isSpotChangeAlert = (): boolean => {
		const currentRate = this.#history[this.#history.length - 1]
		const changePercent = Math.abs(currentRate / this.#average() - 1) * 100

		return changePercent > this.#spotChangePercentageAlert && this.#suffientRatesToAverage()
	}

	isTrendAlert = (): boolean =>
		this.currentTrend() !== 'unchanged' &&
		!(this.trendDuration % this.#trendAlertFrequency) &&
		this.trendDuration >= this.#trendDurationThreshold

	// private instance fields

	#average = (): number => (this.#suffientRatesToAverage() ? this.#sumOfRecentPeriod() / this.#averagePeriod : 0)

	#currentTrends = (): string[] => [...new Set(this.#recentTrendRange())]

	#recentTrendRange = (): string[] => {
		const recentTrends = this.#trends.slice(this.#trends.length - this.#trendDurationThreshold)

		return recentTrends
	}

	#resetTrendDuration = (): void => {
		this.trendDuration = 1
	}

	#recordTrendDuration = (): void => {
		const currentTrend = this.#trends[this.#trends.length - 1]
		const previousTrend = this.#trends[this.#trends.length - 2]

		previousTrend === currentTrend ? this.trendDuration++ : this.#resetTrendDuration()
	}

	#recordTrend = (previousRate: number | undefined, currentRate: number) => {
		let currentTrend: string = ''

		switch (true) {
			case previousRate && currentRate > previousRate:
				currentTrend = 'rising'
				break
			case previousRate && currentRate < previousRate:
				currentTrend = 'falling'
				break
			default:
				currentTrend = 'unchanged'
				break
		}

		this.#trends = [...this.#trends, currentTrend]
		this.#recordTrendDuration()
	}

	#recentPeriod = (): number[] => this.#history.slice(this.#history.length - this.#averagePeriod)

	#suffientRatesToAverage = (): boolean => this.#history.length >= this.#averagePeriod

	#sumOfRecentPeriod = (): number =>
		this.#recentPeriod().reduce((accumulator, currentData) => accumulator + currentData)

	#isTrending = (): boolean => (this.#currentTrends().length === 1 ? true : false)
}
