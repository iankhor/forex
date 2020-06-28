import path from 'path'

/**
 * Constants for app
 */
export const STREAM_DATA_RATE_MILISECONDS = 0
export const SPOT_CHANGE_ALERT_THRESHOLD_PERCENTAGE = 10
export const TREND_DURATION_THRESHOLD = 900 // 15 minutes
export const TREND_ALERT_PERIOD = 60 // 1 minute
export const AVERAGE_PERIOD_SECONDS = 300 //5 minutes
export const DEFAULT_DATA_FILE_PATH = path.join(process.cwd(), 'data', 'input1.jsonl')
