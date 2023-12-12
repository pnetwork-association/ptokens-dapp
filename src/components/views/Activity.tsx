import _ from 'lodash'
import { Chain, useNetwork } from 'wagmi'

import ActivityLine from '../molecules/ActivityLine'
import Box from '../atoms/Box'
import Container from '../atoms/Container'
import { useEvents } from '../../hooks/use-logs'
import { useEffect, useState } from 'react'

const Activity = (): JSX.Element => {
  const { chain } = useNetwork()
  const { events, isLoading } = useEvents(chain as Chain)
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)

  useEffect(() => {
    setDataLoaded(!isLoading)
  }, [isLoading])

  return (
    <div className="flex justify-center items-start duration-700 p-5 scroll-smooth">
      <Container className='w-[1280px]'>
        <Box>
          <div className='py-8 w-[95%]'>
        {/* <div className="overflow-x-auto"> */}
          <table className="table table-lg bg-base-100 rounded-lg ">
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
                {events ? Object.values(events).map((operations) => (
                  <ActivityLine  key={operations[0]?.operationId} operations={operations} />
                )) : null }
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>
                    <div className="flex flex-row gap-4 w-full justify-center">
                      <div className="skeleton h-14 w-44 my-2 justify-center"></div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center justify-center">
                      <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                      <div className="flex flex-col gap-4 grow">
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-4 grow">
                      <div className="skeleton h-4 w-28"></div>
                      <div className="skeleton h-4 w-full"></div>
                    </div>
                  </td>
                  <td>
                    <div className="skeleton h-6 w-28"></div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-4 grow">
                      <div className="skeleton h-4 w-28"></div>
                      <div className="skeleton h-4 w-full"></div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-4 grow">
                      <div className="skeleton h-4 w-28"></div>
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