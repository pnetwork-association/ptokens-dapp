import _ from 'lodash'
import { EVENT_NAMES } from '@p.network/ptokens-assets-evm'
import { useEffect, useState, useRef } from 'react'

import { retreiveLogs } from '../app/features/activity/activity-utils'
import swapChains from '../constants/swap-chains'
import { Chain } from 'viem'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

const useEvents = (chain: Chain) => {
  const [events, setEvents] = useState<UnwrapPromise<ReturnType<typeof getLogs>> | null>(null)
  const isLoading = useRef(false) // only one call ongoing in any case

  const getLogs = async () => {
    isLoading.current = true
    const allLogs = (await Promise.all(Object.values(swapChains).map((chain) => retreiveLogs(chain.chainId, 30000)))).flat()
    const logsList = _.compact(allLogs)
    const logs = (await Promise.all(logsList.map(async (log) => {
      if (log?.eventName === EVENT_NAMES.OPERATION_EXECUTED) {
        const matchUserOperation = logsList.find(userLog => userLog?.eventName === EVENT_NAMES.USER_OPERATION && userLog.transactionHash === log.transactionHash)
        if (matchUserOperation?.eventName === EVENT_NAMES.USER_OPERATION) { // this is for ts that doesn't prompt me the props otherwise
          const destLogs = logsList.filter((logs) => logs.operationId === matchUserOperation.operationId)
          return { ...log, destinationUserOperation: { ...destLogs } }
        }
        return log
      }
      if (log?.eventName === EVENT_NAMES.USER_OPERATION) {
        const matchUserOperation = logsList.find(exLog => exLog?.eventName === EVENT_NAMES.OPERATION_EXECUTED && exLog.transactionHash === log.transactionHash)
        return matchUserOperation ? null : log
      }
      return log
    }))).filter(Boolean)
    const groupedLogsByOperationId = _.groupBy(logs, 'operationId')
    const operations = _.pickBy(groupedLogsByOperationId, (operation) => operation.find((step) => step?.eventName === EVENT_NAMES.USER_OPERATION))
    setEvents(operations)
    isLoading.current = false
    return operations
  }

  useEffect(() => {
    try {
      if (!isLoading.current) getLogs()
      const intervalId = setInterval(() => !isLoading.current && getLogs(), 20)
      return () => clearInterval(intervalId)
    }
    catch (_err) {
      console.error(_err)
    }
  }, [chain])
   
  return { events: events, isLoading: isLoading.current }
}

export { useEvents }