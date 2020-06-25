## ;TLDR

An app to alert / display changes in forex spot prices

## Demo

## Instructions

## Brief

## High Level Design Thoughts

1. Calculate 5 min average and trend for one currency pair
2. Scale implementation to calculate multiple currency pairs in data stream

## Assumptions

1. The definition of a "5 minute average" is based on a simple moving average calculation where we take an average of the rates for the last 5 minutes/300 seconds at every second of streamed data received.
2. Streaming data comes in sequentially

## TODO

- read streams of different currency pairs which comes in at the same time, maybe a class to keep track of what has came in ?

- CurrencyPairTracker
- Trend
- Rates
