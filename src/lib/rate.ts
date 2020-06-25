export default class Rate {
	constructor({ averagePeriod = 1, trendDurationThreshold = 300, trendAlertPeriod = 60, currencyPair = '' } = {}) {
		this.#averagePeriod = averagePeriod
		this.#trendDurationThreshold = trendDurationThreshold
		this.#trendAlertPeriod = trendAlertPeriod
		this.currencyPair = currencyPair
	}

	trendDuration: number = 0
	currencyPair: string = ''

	#averagePeriod: number
	#history: number[] = []
	#trendDurationThreshold: number
	#trendAlertPeriod: number
	#trends: string[] = []

	record = (currentRate: number): void => {
		this.#history = [...this.#history, currentRate]

		const previousRate = this.#history[this.#history.length - 2]
		this.#recordTrend(previousRate, currentRate)
	}

	average = (): number | null => {
		return this.#suffientRatesToAverage() ? this.#sumOfRecentPeriod() / this.#averagePeriod : null
	}

	currentTrend = () => (this.#isTrending() ? this.#currentTrends()[0] : null)

	isSpotChangeAlert = (): boolean => {
		const currentRate = this.#history[this.#history.length - 1]
		const changePercent = Math.abs(currentRate / this.average() - 1) * 100

		return changePercent > 10 && this.#history.length > this.#averagePeriod
	}

	isTrendAlert = (): boolean =>
		this.#isTrending() && !(this.trendDuration % this.#trendAlertPeriod) && this.currentTrend() !== 'unchanged'

	// private instance fields

	#currentTrends = () => [...new Set(this.#recentTrendRange())]

	#recentTrendRange = () => {
		const recentTrend = this.#trends.slice(this.#trends.length - this.#trendDurationThreshold)
		return this.#trends.slice(this.#trends.length - this.#trendDurationThreshold)
	}

	#resetTrendDuration = () => (this.trendDuration = 1)

	#recordTrendDuration = () => {
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

	#isTrending = () => (this.#currentTrends().length === 1 ? true : false)
}
