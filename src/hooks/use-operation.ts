import { useEffect, useState } from "react"
import { useEvents } from "./use-logs"
import { Chain, getChainByBlockchain, getChainByNetworkId } from "../constants/swap-chains"
import { getPublicClient } from "wagmi/actions"
import { getDatefromBlock } from "../app/utils/events-utils"
import { EVENT_NAMES } from "ptokens-assets-evm"
import { INTERIM_CHAIN_NETWORK_ID, NetworkId } from "ptokens-constants"
import _ from "lodash"
import swapAssets, { Asset, HostAsset, NativeAsset } from "../constants/swap-assets"
import { weiToNative } from "../utils/amount-utils"

type UnwrapDictionary<T> = T extends _.Dictionary<infer U> ? U : T

type UnwrapArray<T> = T extends (infer U)[] ? U : T;

export type Operations = UnwrapDictionary<ReturnType<typeof useEvents>['events']>

export type Operation = UnwrapArray<Operations>

export enum SwapType {
  Mint,
  MintAndTransfer,
  Redeem,
  Transfer,
}

export const useOperation = (operations: Operations) => {
  const [date, setDate] = useState<Date>()
  const [swapType, setSwapType] = useState<SwapType>()
  const [originChain, setOriginChain] = useState<Chain>()
  const [destinationChain, setDestinationChain] = useState<Chain>()
  const [originAsset, setOriginAsset] = useState<Asset>()
  const [userSend, setUserSend] = useState<Operation>()
  const [destUserSend, setDestUserSend] = useState<Operation>()
  const [interimQueueOperation, setInterimQueueOperation] = useState<Operation>()
  const [interimCancelOperation, setInterimCancelOperation] = useState<Operation>()
  const [interimExecuteOperation, setInterimExecuteOperation] = useState<Operation>()
  const [destinationQueueOperation, setDestinationQueueOperation] = useState<Operation>()
  const [destinationCancelOperation, setDestinationCancelOperation] = useState<Operation>()
  const [destinationExecuteOperation, setDestinationExecuteOperation] = useState<Operation>()
  const [amount, setAmount] = useState<string>()
  // const [isInterimOrigin, setIsInterimOrigin] = useState<boolean>(false)
  const [isInterimDestination, setIsInterimDestination] = useState<boolean>(false)

  useEffect(() => {
    if (operations) {
      const userOperation = operations.find((operation) => operation?.eventName === EVENT_NAMES.USER_OPERATION)
      if (!userOperation || userOperation.eventName !== EVENT_NAMES.USER_OPERATION) throw new Error('Operations without userSend') // infer correct ts args type
      setUserSend(userOperation)

      const interimQueueOperation = operations.find((operation) => operation?.eventName === EVENT_NAMES.OPERATION_QUEUED)
      if (!interimQueueOperation) setInterimQueueOperation(null)
      if (interimQueueOperation) {
        if (interimQueueOperation.eventName !== EVENT_NAMES.OPERATION_QUEUED) throw new Error('Interim Queue Operation incorrectly retreived') // infer correct ts args type
        setInterimQueueOperation(interimQueueOperation)
      }

      const interimCancelOperation = operations.find((operation) => operation?.eventName === EVENT_NAMES.OPERATION_CANCELLED)
      if (!interimCancelOperation) setInterimCancelOperation(null)
      if (interimCancelOperation) {
        if (interimCancelOperation.eventName !== EVENT_NAMES.OPERATION_CANCELLED) throw new Error('Interim Queue Operation incorrectly retreived') // infer correct ts args type
        setInterimCancelOperation(interimCancelOperation)
      }

      const interimExecuteOperation = operations.find((operation) => operation?.eventName === EVENT_NAMES.OPERATION_EXECUTED)
      if (!interimExecuteOperation) setInterimExecuteOperation(null)
      if (interimExecuteOperation) {
        if (interimExecuteOperation.eventName !== EVENT_NAMES.OPERATION_EXECUTED) throw new Error('Interim Execute Operation incorrectly retreived') // infer correct ts args type
        setInterimExecuteOperation(interimExecuteOperation)
        if ('destinationUserOperation' in interimExecuteOperation) {
          const destinationUserOperation = Object.values(interimExecuteOperation.destinationUserOperation).find((operation) => typeof operation === 'object' && 'eventName' in operation && operation?.eventName === EVENT_NAMES.USER_OPERATION)
          if (!destinationUserOperation) setDestUserSend(null)
          if (destinationUserOperation) {
            if (typeof destinationUserOperation === 'object' && 'eventName' in destinationUserOperation && destinationUserOperation.eventName === EVENT_NAMES.USER_OPERATION) // infer correct ts args type
            setDestUserSend(destinationUserOperation)
          }
          if (!userOperation || userOperation.eventName !== EVENT_NAMES.USER_OPERATION) throw new Error('Operations without userSend') // infer correct ts args type
          setUserSend(userOperation)

          const destQueueOperation = Object.values(interimExecuteOperation.destinationUserOperation).find((operation) => typeof operation === 'object' && 'eventName' in operation && operation?.eventName === EVENT_NAMES.OPERATION_QUEUED)
          if (!destQueueOperation) setDestinationQueueOperation(null)
          if (destQueueOperation) {
            if (typeof destQueueOperation === 'object' && 'eventName' in destQueueOperation && destQueueOperation.eventName === EVENT_NAMES.OPERATION_QUEUED) // infer correct ts args type
            setDestinationQueueOperation(destQueueOperation)
          }

          const destCancelOperation = Object.values(interimExecuteOperation.destinationUserOperation).find((operation) => typeof operation === 'object' && 'eventName' in operation && operation?.eventName === EVENT_NAMES.OPERATION_CANCELLED)
          if (!destCancelOperation) setDestinationCancelOperation(null)
          if (destCancelOperation) {
            if (typeof destCancelOperation === 'object' && 'eventName' in destCancelOperation && destCancelOperation.eventName === EVENT_NAMES.OPERATION_CANCELLED) // infer correct ts args type
            setDestinationCancelOperation(destCancelOperation)
          }
          const destExecuteOperation = Object.values(interimExecuteOperation.destinationUserOperation).find((operation) => typeof operation === 'object' && 'eventName' in operation && operation?.eventName === EVENT_NAMES.OPERATION_EXECUTED)
          if (!destExecuteOperation) setDestinationExecuteOperation(null)
          if (destExecuteOperation) {
            if (typeof destExecuteOperation === 'object' && 'eventName' in destExecuteOperation && destExecuteOperation.eventName === EVENT_NAMES.OPERATION_EXECUTED) // infer correct ts args type
            setDestinationExecuteOperation(destExecuteOperation)
          }
        }
      }
    }
  }, [operations])

  useEffect(() => {
    const computeDate = async () => {
      if (userSend && userSend.eventName === EVENT_NAMES.USER_OPERATION) {
        if (userSend.args.assetAmount)
          setAmount(weiToNative(userSend.args.assetAmount.toString(), Number(userSend.args.underlyingAssetDecimals)))
        setOriginChain(getChainByNetworkId(userSend.args.originNetworkId as NetworkId))
        setDestinationChain(getChainByNetworkId(userSend.args.forwardDestinationNetworkId as NetworkId))
        if (userSend.args.forwardDestinationNetworkId === INTERIM_CHAIN_NETWORK_ID)
          setIsInterimDestination(true)
        // if (userSend.args.originNetworkId === INTERIM_CHAIN_NETWORK_ID)
        //   setIsInterimOrigin(true) 
        const assetAddress = userSend.args.assetTokenAddress
        const underlyingAssetAddress = userSend.args.underlyingAssetTokenAddress
        if (assetAddress === underlyingAssetAddress) 
        setOriginAsset(Object.values(swapAssets).find((asset) => (asset as NativeAsset).address === assetAddress))
        else setOriginAsset(Object.values(swapAssets).find((asset) => 
          (asset as HostAsset).nativeSymbol === userSend.args.underlyingAssetSymbol && 
          getChainByBlockchain((asset as HostAsset).nativeBlockchain) === getChainByNetworkId(userSend.args.underlyingAssetNetworkId as NetworkId)
          ))
        if (userSend.args.originNetworkId === userSend.args.forwardDestinationNetworkId && assetAddress === underlyingAssetAddress)
          setSwapType(SwapType.Mint)
        else if (userSend.args.originNetworkId !== userSend.args.forwardDestinationNetworkId && assetAddress === underlyingAssetAddress)
          setSwapType(SwapType.MintAndTransfer)
        else if (assetAddress !== underlyingAssetAddress &&
          userSend.args.optionsMask === "0x0000000000000000000000000000000000000000000000000000000000000000")
          setSwapType(SwapType.Transfer)
        else if (assetAddress !== underlyingAssetAddress &&
          userSend.args.optionsMask === "0x0000000000000000000000000000000000000000000000000000000000000001")
          setSwapType(SwapType.Redeem)
        const operationBlockNumber = userSend.blockNumber
        const chainId = getChainByNetworkId(userSend.networkId).chainId
        const publicClient = getPublicClient({ chainId: chainId })
        const date = await getDatefromBlock(operationBlockNumber, publicClient)
        setDate(date)
      }
    }
    computeDate()
  }, [userSend])

  return { 
    date: date,
    swapType: swapType,
    originChain: originChain,
    destinationChain: destinationChain,
    originAsset: originAsset,
    amount: amount,
    // isInterimOrigin: isInterimOrigin,
    isInterimDestination: isInterimDestination,
    userSend: userSend,
    destUserSend: destUserSend,
    interimQueueOperation: interimQueueOperation,
    interimCancelOperation: interimCancelOperation,
    interimExecuteOperation: interimExecuteOperation,
    destinationQueueOperation: destinationQueueOperation,
    destinationCancelOperation: destinationCancelOperation,
    destinationExecuteOperation: destinationExecuteOperation,
  }
}