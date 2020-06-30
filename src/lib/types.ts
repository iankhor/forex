import CurrencyPairs from './CurrencyPairs'

export type Data = {
	timestamp: number
	currencyPair: string
	rate: number
}

export type DataStream = Data[]

export type DataStreamerProps = {
	currencyPairs: CurrencyPairs
}
