export default class Rates {
	current: number[] = []
	#averagePeriod: number

	constructor({ averagePeriod = 1 } = {}) {
		this.#averagePeriod = averagePeriod
	}

	add = (rate: number): number[] => (this.current = [...this.current, rate])

	average = (): number | null =>
		this.#suffientRatesToAverage() ? this.#sumOfRecentPeriod() / this.#averagePeriod : null

	#suffientRatesToAverage = (): boolean => this.current.length >= this.#averagePeriod

	#recentPeriod = (): number[] => this.current.slice(this.current.length - this.#averagePeriod)

	#sumOfRecentPeriod = (): number =>
		this.#recentPeriod().reduce((accumulator, currentData) => accumulator + currentData)
}
