import Rate from './Rate'

// describe('Rates', () => {
// 	describe('add', () => {
// 		it('add a new rate to an existing rates', () => {
// 			const rates = new Rate()
// 			rates.add(2)
// 			rates.add(8)
// 			expect(rates.current).toEqual([2, 8])
// 		})
// 	})

// 	describe('average', () => {
// 		describe('average period is equal to availables rates', () => {
// 			it('calculates the moving average given a period', () => {
// 				const rates = new Rate({ averagePeriod: 2 })

// 				rates.add(1)
// 				rates.add(5)

// 				expect(rates.average()).toEqual(3)
// 			})
// 		})

// 		describe('average period is more than availables rates', () => {
// 			it('returns the moving average of the most recent rates', () => {
// 				const rates = new Rate({ averagePeriod: 2 })

// 				rates.add(1)
// 				rates.add(5)
// 				rates.add(3)

// 				expect(rates.average()).toEqual(4)
// 			})
// 		})

// 		describe('average period is less than availables rates', () => {
// 			it('calculates the moving average given a period that matches the ', () => {
// 				const rates = new Rate({ averagePeriod: 2 })

// 				rates.add(1)

// 				expect(rates.average()).toEqual(null)
// 			})
// 		})
// 	})
// })
