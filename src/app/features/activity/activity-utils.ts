// import { getPublicClient } from "wagmi/actions"
// import { getChainByNetworkId, getNetworkIdByChainId } from "../../../constants/swap-chains"
import { Chain } from "@p.network/ptokens-constants"
// import { getEvmHubAddress, getOperationIdFromLog, pTokensEvmProvider, operationEvents, EVENT_NAMES } from '@p.network/ptokens-assets-evm'
// import { PublicClient } from "wagmi"

// export const operationEventsAbi = eventsAbi.filter((event) => Object.values(EVENT_NAMES).includes(event.name as EVENT_NAMES))

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

enum BlockTime {
  GnosisMainnet = 5,
  PolygonMainnet = 2,
  BscMainnet = 3,
  EthereumMainnet = 12,
}

export const blockTimePerChain = new Map<Chain, BlockTime>([
  [Chain.EthereumMainnet, BlockTime.EthereumMainnet],
  [Chain.GnosisMainnet, BlockTime.GnosisMainnet],
  [Chain.BscMainnet, BlockTime.BscMainnet],
  [Chain.PolygonMainnet, BlockTime.PolygonMainnet],
])

// const retreiveLogsChunck = async (_chainId: number, _address: string, _fromBlock: bigint, _toBlock: bigint, publicClient: PublicClient, originHubAddress: string) => {
//   // const publicClient = getPublicClient({ chainId: _chainId })
//   const networkId = getNetworkIdByChainId(_chainId)
//   if (!networkId) throw new Error('No NetworkId found for the chain selected')
//   try{
//     const logs = await publicClient.getLogs({ 
//       address: _address as `0x${string}`,
//       events: operationEvents,
//       fromBlock: _fromBlock,
//       toBlock: _toBlock,
//     })
//     return logs
//       .filter((log) => log.eventName === EVENT_NAMES.USER_OPERATION && log.args.forwardDestinationNetworkId !== '0x00000000' ? getChainByNetworkId(log.args.forwardDestinationNetworkId as NetworkId) : log) // exclude chains not supporte on dApp
//       .filter((log) => log.eventName === EVENT_NAMES.USER_OPERATION ? !log.args.isForProtocol : log) // remove protocol generated UserOperations
//       .map((log) => ({...log, operationId: getOperationIdFromLog(log, networkId), networkId: networkId, originHubAddress: originHubAddress}))
//   } catch (_err) {
//     console.error(_err)
//   }
// }

// export const retreiveLogs = async (_chainId: number, _secondsInThePast: number, _chuncksLength = 3000) => {
//   const publicClient = getPublicClient({ chainId: _chainId })
//   const networkId = getNetworkIdByChainId(_chainId)
//   if (!networkId) throw new Error('No NetworkId found for the chain selected')
//   const blockTime = blockTimePerChain.get(networkId)
//   if (!blockTime) throw new Error('No Block information found')
//   // @ts-ignore
//   const originHubAddress = await getEvmHubAddress(networkId, new pTokensEvmProvider(publicClient))
//   const totalBlocksIntThePast = BigInt(Math.round(_secondsInThePast / blockTime))
//   const currentBlock = await publicClient.getBlockNumber()
//   const array = Array.from({ length: Math.ceil(Number(totalBlocksIntThePast) / _chuncksLength) }, (_, index) => Number(currentBlock) - index * _chuncksLength)
//   const logs = await Promise.all(array.map(async (fromBlock) => {
//     await delay(1000 * array.indexOf(fromBlock))
//     return await retreiveLogsChunck(_chainId, originHubAddress, BigInt(fromBlock),  BigInt(fromBlock + _chuncksLength), publicClient, originHubAddress)
//   }))
//   return logs.flat()
// }