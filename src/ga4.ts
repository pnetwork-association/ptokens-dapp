import ReactGA from 'react-ga4'

const GOOGLE_ANALYTICS_TRACKING_ID: string = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID as string

export const initialize = () =>
  GOOGLE_ANALYTICS_TRACKING_ID ? ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID) : console.warn('GA4 not initialized')

export const sendPageView = () => GOOGLE_ANALYTICS_TRACKING_ID && ReactGA.send('pageview')

export const setPageLocation = (_locationPathname: string) =>
  GOOGLE_ANALYTICS_TRACKING_ID && ReactGA.set({ page: _locationPathname })

export const sendEvent = (_name: string, _params: Record<string, unknown> | null = null) =>
  GOOGLE_ANALYTICS_TRACKING_ID && (_params ? ReactGA.event(_name, _params) : ReactGA.event(_name))
