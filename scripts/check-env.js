/* eslint-disable no-console */
import { loadEnv } from 'vite'

const isEnvVariableDefined = (_variable) => (environment[_variable] ? true : false)

const environment = loadEnv('', process.cwd())
const variables = [
  'VITE_GOOGLE_ANALYTICS_TRACKING_ID',
  'VITE_WALLETCONNECT_PROJECT_ID',
  'VITE_GOOGLE_ANALYTICS_TRACKING_ID',
]
variables.map((_var) =>
  isEnvVariableDefined(_var) ? undefined : console.info(`Missing ${_var} in .env`) || process.exit(1)
)
process.exit(0)
