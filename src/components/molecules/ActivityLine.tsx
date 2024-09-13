

import { getPrettierAddress } from "../../utils/utils"
import { Operations, SwapType, useOperation } from "../../hooks/use-operation"
import { RiFileCopyLine, RiExternalLinkLine  } from "react-icons/ri"
import { useEffect, useState } from "react"
import { getPublicClient } from "wagmi/actions"
import { getChainByNetworkId } from "../../constants/swap-chains"
import { EVENT_NAMES, getOperationChallengePeriod, getOperationStatus, pTokensEvmProvider } from "@p.network/ptokens-assets-evm"
import { INTERIM_CHAIN_NETWORK_ID } from "@p.network/ptokens-constants"
import { formatDistanceToNow, differenceInMinutes, isPast } from 'date-fns'
import { getCorrespondingTxExplorerLinkByChain } from "../../utils/explorer"

type ActivityLineProps = {
  operations: Operations
}

enum OperationStatus {
  NotQueued,
  Queued,
  Executed,
  Cancelled
}

const ActivityLine = ({operations}: ActivityLineProps): JSX.Element => {
  // const [interimStatus, setInterimStatus] = useState<OperationStatus>(OperationStatus.NotQueued)
  // const [destinationStatus, setDestinationStatus] = useState<OperationStatus>(OperationStatus.NotQueued)
  const [queueEta, setQueueEta] = useState<Date>()
  const [totalQueueEta, setTotalQueueEta] = useState<Date>()
  const {
    date,
    swapType,
    originChain,
    destinationChain,
    originAsset,
    userSend,
    destUserSend,
    amount,
    isInterimDestination,
    interimQueueOperation,
    interimExecuteOperation,
    interimCancelOperation,
    destinationQueueOperation,
    destinationCancelOperation,
    destinationExecuteOperation,
  } = useOperation(operations)

  // useEffect(() => {
    // if (userSend?.operationId == "0xb02b63a4a67fb9e5c02c7587c8de3e03c8ca077301ceee8437805aa931be2591") {
    //   const a = new Date(date2)
    // console.log('debug', destinationStatus, interimStatus)
    // }
    //   console.log('isComplete()', date,
    //   swapType,
    //   originChain,
    //   destinationChain,
    //   originAsset,
    //   userSend,
    //   destUserSend,
    //   amount,
    //   interimQueueOperation,
    //   interimExecuteOperation,
    //   interimCancelOperation,
    //   destinationQueueOperation,
    //   destinationCancelOperation,
    //   destinationExecuteOperation,
    //   isInterimOrigin,
    //   isInterimDestination,)
    // }
  // }, [operations])

  useEffect(() => {
    if (queueEta) {
      if (!isInterimDestination && !destinationQueueOperation)
        setTotalQueueEta(new Date(queueEta.getTime() + 10 * 60000)) // add 10 minutes for teh destination
      else
        setTotalQueueEta(queueEta)
    }
  }, [queueEta])

  const isComplete = () => isInterimDestination ?
    /* interimStatus === OperationStatus.Executed && */ interimExecuteOperation :
    /* interimStatus === OperationStatus.Executed && */ interimExecuteOperation /* && destinationStatus === OperationStatus.Executed */ && destinationExecuteOperation

  const isChallenged = () => isInterimDestination ?
    interimCancelOperation /* && interimStatus === OperationStatus.Queued */ :
    interimCancelOperation /* && interimStatus === OperationStatus.Queued */ || destinationCancelOperation /* && destinationStatus === OperationStatus.Queued */

  useEffect(() => {
    const fetchEta = async () => {
      if (!isComplete() && userSend && userSend.eventName === EVENT_NAMES.USER_OPERATION && interimQueueOperation && interimQueueOperation.eventName === EVENT_NAMES.OPERATION_QUEUED) {
        const publicClient = getPublicClient({chainId: getChainByNetworkId(INTERIM_CHAIN_NETWORK_ID).chainId})
        // @ts-ignore
        const interimEvmProvider = new pTokensEvmProvider(publicClient)
        const args = [
          userSend.blockHash,
          userSend.transactionHash,
          userSend.args.optionsMask,
          userSend.args.nonce,
          userSend.args.underlyingAssetDecimals, 
          userSend.args.assetAmount,
          userSend.args.userDataProtocolFeeAssetAmount,
          userSend.args.networkFeeAssetAmount,
          userSend.args.forwardNetworkFeeAssetAmount,
          userSend.args.underlyingAssetTokenAddress,
          userSend.args.originNetworkId,
          userSend.args.destinationNetworkId,
          userSend.args.forwardDestinationNetworkId,
          userSend.args.underlyingAssetNetworkId,
          userSend.args.originAccount,
          userSend.args.destinationAccount,
          userSend.args.underlyingAssetName,
          userSend.args.underlyingAssetSymbol,
          userSend.args.userData,
          userSend.args.isForProtocol,
        ]
        const interimOpStatus = await getOperationStatus(interimQueueOperation.originHubAddress, interimEvmProvider, args) as OperationStatus
        // setInterimStatus(interimOpStatus)
        if (interimOpStatus === OperationStatus.Queued) {
          const interimEtaData = await getOperationChallengePeriod(interimQueueOperation.originHubAddress, interimEvmProvider, args)
          setQueueEta(new Date(Number(interimEtaData[1]) * 1000))
        }
        if (
          !isInterimDestination &&
          interimOpStatus === OperationStatus.Executed && 
          interimExecuteOperation && 
          'destinationUserOperation' in interimExecuteOperation && 
          destUserSend && 
          destUserSend.eventName === EVENT_NAMES.USER_OPERATION &&
          destinationQueueOperation && 
          destinationQueueOperation.eventName === EVENT_NAMES.OPERATION_QUEUED
        ) {
          const destinationPublicClient = getPublicClient({chainId: destinationChain?.chainId})
          // @ts-ignore
          const destEvmProvider = new pTokensEvmProvider(destinationPublicClient)
          const args = [
            destUserSend.blockHash,
            destUserSend.transactionHash,
            destUserSend.args.optionsMask,
            destUserSend.args.nonce,
            destUserSend.args.underlyingAssetDecimals,
            destUserSend.args.assetAmount,
            destUserSend.args.userDataProtocolFeeAssetAmount,
            destUserSend.args.networkFeeAssetAmount,
            destUserSend.args.forwardNetworkFeeAssetAmount,
            destUserSend.args.underlyingAssetTokenAddress,
            destUserSend.args.originNetworkId,
            destUserSend.args.destinationNetworkId,
            destUserSend.args.forwardDestinationNetworkId,
            destUserSend.args.underlyingAssetNetworkId,
            destUserSend.args.originAccount,
            destUserSend.args.destinationAccount,
            destUserSend.args.underlyingAssetName,
            destUserSend.args.underlyingAssetSymbol,
            destUserSend.args.userData,
            destUserSend.args.isForProtocol,
          ]
          const destOpStatus = await getOperationStatus(destinationQueueOperation.originHubAddress, destEvmProvider, args) as OperationStatus
          // setDestinationStatus(destOpStatus)
          if (destOpStatus === OperationStatus.Queued) {
            const destinationEtaData = await getOperationChallengePeriod(destinationQueueOperation.originHubAddress, destEvmProvider, args)
            setQueueEta(new Date(Number(destinationEtaData[1]) * 1000))
          }
        }
      }
    }
    fetchEta()
  }, [userSend, interimQueueOperation, destUserSend, destinationQueueOperation])

  return (
    <tr key={userSend?.operationId}>
      <th className="text-center">
          {date ? (
            <div>
              <span className="badge badge-ghost badge-lg">{date.toLocaleDateString()}</span>
              <br/>
              <span className="font-normal">{date.toLocaleTimeString()}</span>
            </div>
          ) : (
            <div className="flex flex-row gap-4 w-full justify-center">
              <div className="skeleton h-14 w-24 my-2 justify-center"></div>
            </div>
          )}
      </th>
      <td>
        <div className="flex items-center justify-start gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={`/svg/${originAsset?.image}`} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{originAsset?.symbol}</div>
            {swapType && (
              <div className="text-sm opacity-50">{SwapType[swapType]}</div>
            )}
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center pr-12">
          <span className="flex">From</span>
          <img src={`/svg/${originChain?.image}`} className="ml-2 max-w-[20px] max-h-[20px]" alt="Not found" />
          <span className="flex ml-2">To</span>
          <img src={`/svg/${destinationChain?.image}`} className="ml-2 max-w-[20px] max-h-[20px]" alt="Not found" />
        </div>
      </td>
      <td className="text-center">
        <span className="badge badge-ghost badge-lg">{`${amount} ${originAsset?.symbol}`}</span>
      </td>
      <td className="text-center">
        <div>
          <span className="badge badge-ghost badge-lg">
            {isComplete() ? (
              'Completed'
            ) : isChallenged() ? (
              'Challenged'
            ) : (
              'Pending'
            )}
          </span>
          {(!isComplete() && !totalQueueEta || !isComplete() && totalQueueEta && isPast(totalQueueEta) &&  differenceInMinutes(new Date(), totalQueueEta) > 2) && (
            <div className="text-sm opacity-50">Waiting for relayers</div>
          )}
          {!isComplete() && totalQueueEta && isPast(totalQueueEta) && differenceInMinutes(new Date(), totalQueueEta) <= 2 ? (
            <div className="text-sm opacity-50">ETA: any moment</div>
          ) : !isComplete() && totalQueueEta && !isPast(totalQueueEta) && (
            <div className="text-sm opacity-50">ETA: {formatDistanceToNow(totalQueueEta)}</div>
          )}
        </div>
      </td>
      <td className="text-center">
        {userSend?.operationId && (
          <div>
            {isComplete() && isInterimDestination && interimExecuteOperation && (
              <div className="badge badge-ghost badge-lg bg-green-400">
                <a href={`${getCorrespondingTxExplorerLinkByChain(getChainByNetworkId(INTERIM_CHAIN_NETWORK_ID).blockchain, interimExecuteOperation.transactionHash)}`} target="_blank" className="text-black font-medium" rel="noopener noreferrer">Final Tx</a>
                <div className="text-black ml-2 mb-0.5">
                  <RiExternalLinkLine size={11}/>
                </div>
              </div>
            )}
            {isComplete() && !isInterimDestination && destinationExecuteOperation && (
              <div className="badge badge-ghost badge-lg bg-green-400">
                <a href={`${getCorrespondingTxExplorerLinkByChain(getChainByNetworkId(destinationExecuteOperation.networkId).blockchain, destinationExecuteOperation.transactionHash)}`} target="_blank" className="text-black font-medium" rel="noopener noreferrer">Final Tx</a>
                <div className="text-black ml-2 mb-0.5">
                  <RiExternalLinkLine size={11}/>
                </div>
              </div>
            )}
            {!isComplete() && userSend && (
              <div className="badge badge-ghost badge-lg bg-blue-300">
                <a href={`${getCorrespondingTxExplorerLinkByChain(getChainByNetworkId(userSend.networkId).blockchain, userSend.transactionHash)}`} target="_blank" className="text-black font-medium" rel="noopener noreferrer">User Tx</a>
                <div className="text-black ml-2 mb-0.5">
                  <RiExternalLinkLine size={11}/>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center mt-1">
              <span className="flex items-center text-sm font-semibold">
                {getPrettierAddress(userSend.operationId.toString(), 5)}
              </span>
              <button className="ml-2 btn btn-outline !px-1 !h-4 !min-h-0 btn-xs" onClick={() => {navigator.clipboard.writeText(userSend.operationId.toString())}}>
                <RiFileCopyLine />
              </button>
            </div>
          </div>
        )}
      </td>
      <td className="text-center">
        <button className="btn btn-outline btn-sm btn-disabled">details</button>
      </td>
    </tr>
  )
}

export default ActivityLine