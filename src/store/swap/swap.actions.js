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
  PNETWORK_NODE_V3,
} from '../../constants/index'
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
// import pegoutPuosOnUltra from './utils/pegout-puos-on-ultra'
import { getAsaBalance, encodeUserData, buildPoolSwapTransactions } from './utils/algorand'
import { pTokensUtxoAssetBuilder, pTokensBlockstreamUtxoProvider } from 'ptokens-assets-utxo'
import { pTokensEvmAssetBuilder, pTokensEvmProvider } from 'ptokens-assets-evm'
import { pTokensEosioAssetBuilder, pTokensEosioProvider, getAmountInEosFormat } from 'ptokens-assets-eosio'
import { pTokensAlgorandAssetBuilder, pTokensAlgorandProvider } from 'ptokens-assets-algorand'
import { pTokensSwapBuilder } from 'ptokens-swap'
import { pTokensNode, pTokensNodeProvider } from 'ptokens-node'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import eosioTokenAbi from '../../utils/abi/eosio.token'

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
        const client = getReadOnlyProviderByBlockchain('ALGORAND')
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
        case 'ETH': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('ETH'),
            account: _account,
            dispatch: _dispatch,
          })
          break
        }
        case 'EOS': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('EOS'),
            account: _account,
            dispatch: _dispatch,
          })
          break
        }
        case 'TELOS': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('TELOS'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'TELOS',
          })
          break
        }
        case 'LIBRE': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('LIBRE'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'LIBRE',
          })
          break
        }
        case 'ULTRA': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('ULTRA'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'ULTRA',
          })
          break
        }
        case 'ORE': {
          loadEosioCompatibleBalances({
            assets: getAssetsByBlockchain('ORE'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'ORE',
          })
          break
        }
        case 'BSC': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('BSC'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'BSC',
          })
          break
        }
        case 'XDAI': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('XDAI'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'XDAI',
          })
          break
        }
        case 'POLYGON': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('POLYGON'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'POLYGON',
          })
          break
        }
        case 'ARBITRUM': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('ARBITRUM'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'ARBITRUM',
          })
          break
        }
        case 'LUXOCHAIN': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('LUXOCHAIN'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'LUXOCHAIN',
          })
          break
        }
        case 'ALGORAND': {
          loadAlgorandBalances({
            assets: getAssetsByBlockchain('ALGORAND'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'ALGORAND',
          })
          break
        }
        case 'FTM': {
          loadEvmCompatibleBalances({
            assets: getAssetsByBlockchain('FTM'),
            account: _account,
            dispatch: _dispatch,
            blockchain: 'FTM',
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
        case 'ETH': {
          loadEvmCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case 'EOS': {
          loadEosioCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case 'ORE': {
          loadEosioCompatibleBalance({ asset, account, dispatch: _dispatch })
          break
        }
        case 'BSC': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'BSC', dispatch: _dispatch })
          break
        }
        case 'POLYGON': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'POLYGON', dispatch: _dispatch })
          break
        }
        case 'XDAI': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'XDAI', dispatch: _dispatch })
          break
        }
        case 'TELOS': {
          loadEosioCompatibleBalance({ asset, account, blockchain: 'TELOS', dispatch: _dispatch })
          break
        }
        case 'LIBRE': {
          loadEosioCompatibleBalance({ asset, account, blockchain: 'LIBRE', dispatch: _dispatch })
          break
        }
        case 'ULTRA': {
          loadEosioCompatibleBalance({ asset, account, blockchain: 'ULTRA', dispatch: _dispatch })
          break
        }
        case 'ARBITRUM': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'ARBITRUM', dispatch: _dispatch })
          break
        }
        case 'LUXOCHAIN': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'LUXOCHAIN', dispatch: _dispatch })
          break
        }
        case 'ALGORAND': {
          loadAlgorandBalances({ assets: [asset], account, blockchain: 'ALGORAND', dispatch: _dispatch })
          break
        }
        case 'FTM': {
          loadEvmCompatibleBalance({ asset, account, blockchain: 'FTM', dispatch: _dispatch })
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

const utxoBlockchains = ['btc']
const evmBlockchains = ['eth', 'bsc', 'ftm', 'polygon', 'luxochain', 'arbitrum']
const eosioBlockchains = ['telos', 'eos', 'libre', 'ultra']
const algorandBlockchains = ['algorand']

const getBuilder = (_node, _asset) => {
  if (utxoBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensUtxoAssetBuilder(_node)
  if (evmBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensEvmAssetBuilder(_node)
  if (eosioBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensEosioAssetBuilder(_node)
  if (algorandBlockchains.includes(_asset.blockchain.toLowerCase())) return new pTokensAlgorandAssetBuilder(_node)
}

const getProvider = (_asset, _wallets) => {
  const wallet = _wallets[_asset.blockchain.toLowerCase()]
  if (utxoBlockchains.includes(_asset.blockchain.toLowerCase()))
    return new pTokensBlockstreamUtxoProvider(getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase()), {
      'Content-Type': 'text/plain',
    })
  else if (evmBlockchains.includes(_asset.blockchain.toLowerCase()))
    return new pTokensEvmProvider(
      _wallets[_asset.blockchain.toLowerCase()].provider ||
        getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase())
    )
  else if (eosioBlockchains.includes(_asset.blockchain.toLowerCase())) {
    const provider = new pTokensEosioProvider(
      getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase()),
      wallet.provider || undefined
    )
    if (wallet.account) provider.setActor(wallet.account)
    if (wallet.permission) provider.setPermission(wallet.permission)
    return provider
  } else if (algorandBlockchains.includes(_asset.blockchain.toLowerCase())) {
    const provider = new pTokensAlgorandProvider(
      getReadOnlyProviderByBlockchain(_asset.blockchain.toUpperCase()),
      wallet.provider || undefined
    )
    if (wallet.account) provider.setAccount(wallet.account)
    return provider
  }
}

const createAsset = async (_node, _asset, _wallets) => {
  const builder = getBuilder(_node, _asset)
  builder.setBlockchain(_asset.chainId)
  builder.setSymbol(_asset.symbol)
  builder.setDecimals(_asset.decimals)
  const provider = getProvider(_asset, _wallets)
  builder.setProvider(provider)
  const asset = await builder.build()
  return asset
}

const swap = (_from, _to, _amount, _address, _opts = {}) => {
  return async (_dispatch) => {
    try {
      _dispatch(resetProgress())
      const wallets = getWallets()

      const _fromNative = _from
      if (_from.requiresCurve) {
        _from = getAssetById(_fromNative.pTokenId)
      }

      const provider = new pTokensNodeProvider(PNETWORK_NODE_V3)
      const node = new pTokensNode(provider)
      const sourceAsset = await createAsset(node, _from, wallets, true)
      const destinationAsset = await createAsset(node, _to, wallets)
      const swapBuilder = new pTokensSwapBuilder(node)
      swapBuilder.setAmount(_amount)
      swapBuilder.setSourceAsset(sourceAsset)
      if (_from.isPseudoNative && _from.blockchain === 'ALGORAND') {
        _amount = BigNumber(_amount)
          .multipliedBy(10 ** _from.decimals)
          .toFixed()
        const swapInfo = { appId: _from.swapperAddress, inputAssetId: _from.address }
        const txs = await buildPoolSwapTransactions({
          amount: _amount,
          to: sourceAsset.identity,
          from: wallets[_from.blockchain.toLowerCase()].account,
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
              from: wallets[_from.blockchain.toLowerCase()].account,
              to: 'ultra.swap',
              // it is UOS we need to transfer to ultra.swap, not PUOS
              quantity: getAmountInEosFormat(_amount, _from.decimals, 'UOS'),
              memo: _address,
            },
          },
        ]
        sourceAsset.setCustomActions(actions)
      }
      // if (options.pegoutToTelosEvmAddress) {
      //   params.splice(1, 0, 'devm.ptokens')
      //   params[2] = web3.utils.asciiToHex(params[2])
      // }
      if (_to.isPseudoNative && _to.blockchain === 'ALGORAND') {
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
        const ptokenFromId = _from.id
        const ptokenFrom = getAssetById(ptokenFromId)
        const ptokenToId = _to.id
        const ptokenTo = getAssetById(ptokenToId)
        if (['pBTC', 'pLTC', 'pDOGE', 'pRVN', 'pLBC'].includes(ptokenTo.name))
          peginWithDepositAddress({ swap, ptokenFrom, ptokenTo, dispatch: _dispatch })
        else {
          peginWithWallet({
            swap,
            ptokenFrom,
            ptokenTo,
            dispatch: _dispatch,
          })
        }
      }
      // NOTE: pegout
      else if (!_from.isNative && !_fromNative.requiresCurve) {
        pegout({ swap: swap, ptokenFrom: _from, ptokenTo: _to, dispatch: _dispatch })
      } else if (!_from.isNative && _fromNative.requiresCurve) {
        const curveProvider = getReadOnlyProviderByBlockchain(_fromNative.blockchain.toUpperCase())
        pegoutFromCurve({
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
