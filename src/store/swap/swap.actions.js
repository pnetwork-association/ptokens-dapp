import axios from 'axios'
import assets from '../../settings/swap-assets'
import settings from '../../settings'
import {
  ASSETS_LOADED,
  SHOW_DEPOSIT_ADDRESS_MODAL,
  HIDE_DEPOSIT_ADDRESS_MODAL,
  PROGRESS_UPDATED,
  PROGRESS_RESET,
  UPDATE_SWAP_BUTTON,
  BPM_LOADED,
  SWAPPERS_BALANCES_LOADED,
  Blockchain,
} from '../../constants'
import {
  loadEvmCompatibleBalances,
  loadEosioCompatibleBalances,
  loadEvmCompatibleBalance,
  loadEosioCompatibleBalance,
  loadAlgorandBalances,
} from './utils/balances'
import { parseError } from '../../utils/errors'
import { updateInfoModal } from '../pages/pages.actions'
import { getReadOnlyProviderByBlockchain } from '../../utils/read-only-providers'
import peginWithDepositAddress from './utils/pegin-with-deposit-address'
import peginWithWallet from './utils/pegin-with-wallet'
import pegout from './utils/pegout'
import pegoutFromCurve from './utils/pegout-curve'
import { getAssetsByBlockchain, getAssetById } from './swap.selectors'
import { getWallets, getWalletByBlockchain } from '../wallets/wallets.selectors'
import { getDefaultSelection } from './utils/default-selection'
import { getAsaBalance, encodeUserData, buildPoolSwapTransactions } from './utils/algorand'
import { getAmountInEosFormat } from 'ptokens-assets-eosio'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import eosioTokenAbi from '../../utils/abi/eosio.token'
import { createAsset, getSwapBuilder } from '../../utils/ptokens'

const loadSwapData = (_opts = {}) => {
  const {
    defaultSelection: { pToken, asset, from, to, algorand_from_assetid, algorand_to_assetid, host_symbol } = {},
  } = _opts
  return async (_dispatch) => {
    try {
      _dispatch({
        type: ASSETS_LOADED,
        payload: {
          assets: [
            ...assets,
            ...getDefaultSelection(assets, {
              pToken,
              asset,
              from,
              to,
              algorand_from_assetid,
              algorand_to_assetid,
              host_symbol,
            }),
          ],
        },
      })

      const loadSwapperAmount = async () => {
        const ret = {}
        const client = getReadOnlyProviderByBlockchain(Blockchain.Algorand)
        const amounts = (
          await Promise.all(
            assets
              .filter((asset) => asset.swapperAddress)
              .map(async (asset) => [
                {
                  swapperAddress: asset.swapperAddress,
                  assetId: asset.address,
                  amount: await getAsaBalance(client, parseInt(asset.swapperAddress), asset.address),
                },
                {
                  swapperAddress: asset.swapperAddress,
                  assetId: asset.ptokenAddress,
                  amount: await getAsaBalance(client, parseInt(asset.swapperAddress), asset.ptokenAddress),
                },
              ])
          )
        ).flat()
        amounts.forEach((_obj) => {
          if (ret[_obj.swapperAddress] === undefined) ret[_obj.swapperAddress] = {}
          ret[_obj.swapperAddress][_obj.assetId] = _obj.amount
        })
        _dispatch({
          type: SWAPPERS_BALANCES_LOADED,
          payload: {
            swappersBalances: ret,
          },
        })
      }

      const loadBpm = async () => {
        try {
          const resp = await axios.get(settings.api.bpm, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const bpm = Object.fromEntries(resp.data.map((_el) => [_el.bridgeName, _el]))
          _dispatch({
            type: BPM_LOADED,
            payload: {
              bpm,
            },
          })
        } catch (err) {
          console.error('BPM API error:', err.message)
        }
      }

      const wallets = getWallets()
      Object.keys(wallets).forEach((_network) => {
        if (wallets[_network] && wallets[_network].account) {
          _dispatch(loadBalances(wallets[_network].account, _network))
        }
      })

      loadBpm()
      setInterval(() => loadBpm(), 1000 * 20)

      loadSwapperAmount()
      setInterval(() => loadSwapperAmount(), 1000 * 10)
    } catch (_err) {
      console.error(_err)
    }
  }
}

const loadBalances = (_account, _blockchain) => {
  return async (_dispatch) => {
    try {
      switch (_blockchain.toUpperCase()) {
        case Blockchain.Ethereum: {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Ethereum),
            account: _account,
            dispatch: _dispatch,
          })
          break
        }
        case Blockchain.EOS: {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.EOS),
            account: _account,
            dispatch: _dispatch,
          })
          break
        }
        case Blockchain.Telos: {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Telos),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Telos,
          })
          break
        }
        case Blockchain.Libre: {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Libre),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Libre,
          })
          break
        }
        case Blockchain.Ultra: {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Ultra),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Ultra,
          })
          break
        }
        case Blockchain.Ore: {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Ore),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Ore,
          })
          break
        }
        case Blockchain.BSC: {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.BSC),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.BSC,
          })
          break
        }
        case Blockchain.XDAI: {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.XDAI),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.XDAI,
          })
          break
        }
        case Blockchain.Polygon: {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Polygon),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Polygon,
          })
          break
        }
        case Blockchain.Arbitrum: {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Arbitrum),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Arbitrum,
          })
          break
        }
        case Blockchain.Luxochain: {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Luxochain),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Luxochain,
          })
          break
        }
        case Blockchain.Algorand: {
          loadAlgorandBalances({
            assets: getAssetsByBlockchain(Blockchain.Algorand),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Algorand,
          })
          break
        }
        case Blockchain.Fantom: {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain(Blockchain.Fantom),
            account: _account,
            dispatch: _dispatch,
            blockchain: Blockchain.Fantom,
          })
          break
        }
        default:
          break
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const loadBalanceByAssetId = (_id) => {
  return async (_dispatch) => {
    try {
      const asset = getAssetById(_id)
      const wallet = getWalletByBlockchain(asset.blockchain)
      if (!wallet || !wallet.account) {
        return
      }
      const account = wallet.account

      switch (asset.blockchain) {
        case Blockchain.Ethereum: {
          loadEvmCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case Blockchain.EOS: {
          loadEosioCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case Blockchain.Ore: {
          loadEosioCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case Blockchain.BSC: {
          loadEvmCompatibleBalance({ asset, account, blockchain: Blockchain.BSC, dispatch: _dispatch })
          break
        }
        case Blockchain.Polygon: {
          loadEvmCompatibleBalance({ asset, account, blockchain: Blockchain.Polygon, dispatch: _dispatch })
          break
        }
        case Blockchain.XDAI: {
          loadEvmCompatibleBalance({ asset, account, blockchain: Blockchain.XDAI, dispatch: _dispatch })
          break
        }
        case Blockchain.Telos: {
          loadEosioCompatibleBalance({ asset, account, blockchain: Blockchain.Telos, dispatch: _dispatch })
          break
        }
        case Blockchain.Libre: {
          loadEosioCompatibleBalance({ asset, account, blockchain: Blockchain.Libre, dispatch: _dispatch })
          break
        }
        case Blockchain.Ultra: {
          loadEosioCompatibleBalance({ asset, account, blockchain: Blockchain.Ultra, dispatch: _dispatch })
          break
        }
        case Blockchain.Arbitrum: {
          loadEvmCompatibleBalance({ asset, account, blockchain: Blockchain.Arbitrum, dispatch: _dispatch })
          break
        }
        case Blockchain.Luxochain: {
          loadEvmCompatibleBalance({ asset, account, blockchain: Blockchain.Luxochain, dispatch: _dispatch })
          break
        }
        case Blockchain.Algorand: {
          loadAlgorandBalances({ assets: [asset], account, blockchain: Blockchain.Algorand, dispatch: _dispatch })
          break
        }
        case Blockchain.Fantom: {
          loadEvmCompatibleBalance({ asset, account, blockchain: Blockchain.Fantom, dispatch: _dispatch })
          break
        }
        default: {
          break
        }
      }
    } catch (_err) {
      console.error(_err)
    }
  }
}

const swap = (_from, _to, _amount, _address, _opts = {}) => {
  return async (_dispatch) => {
    try {
      _dispatch(resetProgress())
      const wallets = getWallets()

      const _fromNative = _from
      if (_from.requiresCurve) {
        _from = getAssetById(_fromNative.PTokenId)
      }

      const sourceAsset = await createAsset(_from, wallets, true)
      const destinationAsset = await createAsset(_to, wallets)
      const swapBuilder = getSwapBuilder()
      swapBuilder.setAmount(_amount)
      swapBuilder.setSourceAsset(sourceAsset)
      if (_from.isPseudoNative && _from.blockchain === Blockchain.Algorand) {
        _amount = BigNumber(_amount)
          .multipliedBy(10 ** _from.decimals)
          .toFixed()
        const swapInfo = { appId: _from.swapperAddress, inputAssetId: _from.address }
        const txs = await buildPoolSwapTransactions({
          amount: _amount,
          to: sourceAsset.identity,
          from: wallets[_from.blockchain].account,
          assetIndex: _from.ptokenAddress,
          destinationChainId: _to.chainId,
          nativeAccount: _address,
          swapInfo,
        })
        sourceAsset.setCustomTransactions(txs)
      } else if (_from.id === 'PUOS_ON_ULTRA_MAINNET') {
        const actions = [
          {
            contractAddress: 'eosio.token',
            method: 'transfer',
            abi: eosioTokenAbi,
            arguments: {
              from: wallets[_from.blockchain].account,
              to: 'ultra.swap',
              // it is UOS we need to transfer to ultra.swap, not PUOS
              quantity: getAmountInEosFormat(_amount, _from.decimals, 'UOS'),
              memo: _address,
            },
          },
        ]
        sourceAsset.setCustomActions(actions)
      }
      if (_opts.pegoutToTelosEvmAddress) {
        const web3 = new Web3()
        swapBuilder.addDestinationAsset(destinationAsset, 'devm.ptokens', web3.utils.asciiToHex(_address))
      } else if (_to.isPseudoNative && _to.blockchain === Blockchain.Algorand) {
        _amount = BigNumber(_amount)
          .multipliedBy(10 ** _from.decimals)
          .toFixed()
        const web3 = new Web3()
        const input_asset_id = _to.ptokenAddress
        const output_asset_id = _to.address
        const metadata = web3.utils.bytesToHex(
          encodeUserData(_address, parseInt(input_asset_id, 10), _amount, parseInt(output_asset_id, 10), 0)
        )
        swapBuilder.addDestinationAsset(destinationAsset, _to.swapperAddress, metadata)
      } else if (_to.id === 'PUOS_ON_ULTRA_MAINNET') {
        const web3 = new Web3()
        swapBuilder.addDestinationAsset(destinationAsset, 'ultra.swap', web3.utils.utf8ToHex(_address))
      } else {
        swapBuilder.addDestinationAsset(destinationAsset, _address)
      }
      const swap = swapBuilder.build()

      // // NOTE: pegin
      if (_from.isNative) {
        if (['pBTC', 'pLTC', 'pDOGE', 'pRVN', 'pLBC'].includes(_to.name))
          await peginWithDepositAddress({ swap, ptokenFrom: _from, ptokenTo: _to, dispatch: _dispatch })
        else {
          await peginWithWallet({
            swap,
            ptokenFrom: _from,
            ptokenTo: _to,
            dispatch: _dispatch,
          })
        }
      }
      // NOTE: pegout
      else if (!_from.isNative && !_fromNative.requiresCurve) {
        await pegout({ swap: swap, ptokenFrom: _from, ptokenTo: _to, dispatch: _dispatch })
      } else if (!_from.isNative && _fromNative.requiresCurve) {
        const curveProvider = getReadOnlyProviderByBlockchain(_fromNative.blockchain.toUpperCase())
        await pegoutFromCurve({
          swap: swap,
          provider: curveProvider,
          tokenFrom: _fromNative,
          ptokenFrom: _from,
          ptokenTo: _to,
          dispatch: _dispatch,
        })
      }
    } catch (_err) {
      console.error(_err)
      const { showModal } = parseError(_err)
      if (showModal) {
        _dispatch(
          updateInfoModal({
            show: true,
            text: 'Error during pegin, try again!',
            showMoreText: _err.message ? _err.message : _err,
            showMoreLabel: 'Show Details',
            icon: 'cancel',
          })
        )
      }
      _dispatch(updateSwapButton('Swap'))
      _dispatch(resetProgress())
    }
  }
}

const showDepositAddressModal = (_asset, _depositAddress) => {
  return {
    type: SHOW_DEPOSIT_ADDRESS_MODAL,
    payload: {
      depositAddressModal: {
        asset: _asset,
        show: true,
        value: _depositAddress,
      },
    },
  }
}

const hideDepositAddressModal = () => {
  return (_dispatch) => {
    _dispatch(resetProgress())
    _dispatch({
      type: HIDE_DEPOSIT_ADDRESS_MODAL,
    })
  }
}

const updateProgress = (_progress) => {
  return {
    type: PROGRESS_UPDATED,
    payload: {
      progress: _progress,
    },
  }
}

const resetProgress = () => {
  return {
    type: PROGRESS_RESET,
  }
}

const updateSwapButton = (_text, _disabled = false, _link = '') => {
  return {
    type: UPDATE_SWAP_BUTTON,
    payload: {
      swapButton: {
        text: _text,
        disabled: _disabled,
        link: _link,
      },
    },
  }
}

export {
  loadSwapData,
  loadBalances,
  loadBalanceByAssetId,
  showDepositAddressModal,
  hideDepositAddressModal,
  swap,
  updateProgress,
  resetProgress,
  updateSwapButton,
}
