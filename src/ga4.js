import ReactGA from 'react-ga4'

const GOOGLE_ANALYTICS_TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID

export const initialize = (_) =>
  GOOGLE_ANALYTICS_TRACKING_ID ? ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID) : console.warn('GA4 not initialized')

export const sendPageView = (_) => GOOGLE_ANALYTICS_TRACKING_ID && ReactGA.send('pageview')

export const setPageLocation = (_locationPathname) =>
  GOOGLE_ANALYTICS_TRACKING_ID & ReactGA.set({ page: _locationPathname })

export const sendEvent = (_name, _params = null) =>
  GOOGLE_ANALYTICS_TRACKING_ID && (_params ? ReactGA.event(_name, _params) : ReactGA.event(_name))
