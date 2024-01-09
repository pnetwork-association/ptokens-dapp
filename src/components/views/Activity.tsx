import _ from 'lodash'
import { Chain, useNetwork } from 'wagmi'

import ActivityLine from '../molecules/ActivityLine'
import Box from '../atoms/Box'
import Container from '../atoms/Container'
import { useEvents } from '../../hooks/use-logs'
import { useEffect, useState } from 'react'
import { getAccount } from 'wagmi/actions'
import { EVENT_NAMES } from 'ptokens-assets-evm'

const Activity = (): JSX.Element => {
  const { chain } = useNetwork()
  const account = getAccount()
  const { events, isLoading } = useEvents(chain as Chain)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)

  useEffect(() => {
    setDataLoaded(!isLoading)
    if (events) console.log('events', events)
  }, [isLoading])

  return (
    <div className="flex justify-center items-start duration-700 p-4 scroll-smooth">
      <Container className='overflow-x-auto'>
        <Box className='!items-start overflow-auto justify-center max-lg:p-2'>
          <div className='lg:flex lg:justify-center lg:p-4 overflow-x-auto '>
            <table className="table table-lg bg-base-100 rounded-lg">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-center text-base text-white">Date</th>
                  <th className="text-center text-base text-white">Asset</th>
                  <th className="text-center text-base text-white">Path</th>
                  <th className="text-center text-base text-white">Amount</th>
                  <th className="text-center text-base text-white">Status</th>
                  <th className="text-center text-base text-white">Tracking</th>
                  <th className="text-center text-base text-white">Details</th>
                </tr>
              </thead>
              {dataLoaded ? (
                <tbody>
                  {events ? Object.values(events)
                    .filter((operations) => {
                      if (account.address) {
                        const userSend = Object.values(operations).find((operation) => {
                          return operation && operation.eventName === EVENT_NAMES.USER_OPERATION
                        })
                        return userSend && userSend.eventName === EVENT_NAMES.USER_OPERATION && userSend.args?.originAccount?.toLowerCase() === account.address.toLowerCase()
                      } else {
                        return true
                      }
                    })
                    .map((operations) => (
                    <ActivityLine  key={operations[0]?.operationId} operations={operations} />
                  )) : null }
                </tbody>
              ) : (
                <tbody className='lg:w-[95%]'>
                  <tr>
                    <td>
                      <div className="flex flex-row gap-4 w-full justify-center">
                        <div className="skeleton h-14 w-24 my-2 justify-center"></div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-4 items-center justify-center">
                        <div className="skeleton w-14 h-14 rounded-full shrink-0"></div>
                        <div className="flex flex-col gap-4 grow">
                          <div className="skeleton h-4 w-20"></div>
                          <div className="skeleton h-4 w-full"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-4 grow">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </td>
                    <td>
                      <div className="skeleton h-6 w-20"></div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-4 grow">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-4 grow">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </td>
                    <td>
                      <div className="skeleton h-8 w-20"></div>
                    </td>
                  </tr>
                </tbody>
              )}
              {/* foot */}
              {/* <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot> */}
            </table>
          </div>
        </Box>
      </Container>
    </div>
  )
}

export default Activity