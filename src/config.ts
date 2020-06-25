import path from 'path'

/**
 * Constants for app
 */
export const STREAM_DATA_RATE_MILISECONDS = 200
export const AVERAGE_PERIOD_SECONDS = 3 //5 minutes
export const DEFAULT_DATA_FILE_PATH = path.join(process.cwd(), 'data', 'input1.jsonl')
