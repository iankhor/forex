## ;TLDR

An app to alert / display changes in forex spot prices

## Demo

Spot Change

---

![](/docs/spot.gif)

Rising Rates

---

![](/docs/rising.gif)

## Instructions

To run app:

1. run `yarn start`
2. (optional) To run with your own input file, run `yarn start [PATH TO DATA FILE]`

```
Example:

yarn start `pwd`/data/myinput2_spot_change.jsonl
yarn start `pwd`/data/myinput3_trend_rising.jsonl
```

To run test:

1. run `yarn test`

## Brief

Implementation details:

1. Calculate 5 min average, trends (rising/falling), alerting methods when thresholds are triggered for _one_ currency pair (ie: src/lib/Rate.ts)
2. Scale implementation to handle _multiple_ currency pairs in data stream (ie: src/lib/CurrencyPairs.ts)
3. Simulate data stream to appear sequentially to app (ie: src/run.ts)

## Assumptions

1. The definition of a "5 minute average" is based on a simple moving average calculation where we take an average of the rates for the last 5 minutes/300 seconds at every second of streamed data received.
2. Streaming data comes in sequentially

## Other Notes

1. Utility functions to "simulate" the flow of data is not tested as its just for demonstration purposes (ie: src/lib/utils.ts)
