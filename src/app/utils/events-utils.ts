import { PublicClient } from "viem"


// export const getOperationByType = (operations: LogWithId[], eventName: EVENT_NAMES) => {
//   if (operations.length < 1) throw new Error('No operation found')
//   const operation = operations.find((operation) => operation.eventName === eventName.toString())
//   // if (!operation && eventName === EVENT_NAMES.USER_OPERATION)
//   //   throw new Error(`No UserOperation found for operationId ${operations[0].operationId}`)
//   return operation
// }

export const getDatefromBlock = async (blockNumber: bigint, publicClient: PublicClient) => {
  const block = await publicClient.getBlock({
    blockNumber: blockNumber
  })
  const dateInMilliseconds = Number(block.timestamp * 1000n)
  return new Date(dateInMilliseconds)
}
