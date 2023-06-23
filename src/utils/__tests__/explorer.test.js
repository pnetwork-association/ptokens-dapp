import { test, describe, expect } from 'vitest'

import { getCorrespondingTxExplorerLinkByBlockchain, getCorrespondingTokenExplorerLinkByBlockchain } from '../explorer'

describe('getCorrespondingTxExplorerLinkByBlockchain', () => {
  test.each([
    ['ETH', 'https://etherscan.io/tx/txhash'],
    ['XDAI', 'https://blockscout.com/poa/xdai/tx/txhash'],
    ['POLYGON', 'https://polygonscan.com/tx/txhash'],
    ['BSC', 'https://bscscan.com/tx/txhash'],
    ['EOS', 'https://bloks.io/tx/txhash'],
    ['TELOS', 'https://explorer.telos.net/transaction/txhash'],
    ['LIBRE', 'https://lb.libre.org/v2/explore/transaction/txhash'],
    ['BTC', 'https://blockstream.info/tx/txhash'],
    ['LTC', 'https://live.blockcypher.com/ltc/tx/txhash'],
    ['RVN', 'https://ravencoin.network/tx/txhash'],
    ['DOGE', 'https://dogechain.info/tx/txhash'],
    ['LBC', 'https://explorer.lbry.com/tx/txhash'],
    ['ULTRA', 'https://explorer.mainnet.ultra.io/tx/txhash'],
    ['ARBITRUM', 'https://arbiscan.io/tx/txhash'],
    ['LUXOCHAIN', 'https://explorer.luxochain.io/tx/txhash'],
    ['ALGORAND', 'https://algoexplorer.io/tx/group/txhash'],
    ['FTM', 'https://ftmscan.com/tx/txhash'],
    ['ORE', 'https://explorer.ore.network/tx/txhash'],
  ])('Should get the correct %s explorer link for the transaction', (blockchain, expected) => {
    const txHash = 'txhash'
    const ret = getCorrespondingTxExplorerLinkByBlockchain(blockchain, txHash)
    expect(ret).toStrictEqual(expected)
  })
})

describe('getCorrespondingTokenExplorerLinkByBlockchain', () => {
  test.each([
    ['ETH', 'https://etherscan.io/token/tokenaddress'],
    ['XDAI', 'https://blockscout.com/poa/xdai/address/tokenaddress'],
    ['POLYGON', 'https://polygonscan.com/address/tokenaddress'],
    ['BSC', 'https://bscscan.com/token/tokenaddress'],
    ['EOS', 'https://bloks.io/account/tokenaddress'],
    ['TELOS', 'https://explorer.telos.net/account/tokenaddress'],
    ['LIBRE', 'https://lb.libre.org/v2/explore/account/tokenaddress'],
    ['BTC', 'https://blockstream.info/address/tokenaddress'],
    ['LTC', 'https://live.blockcypher.com/ltc/address/tokenaddress'],
    ['RVN', 'https://ravencoin.network/address/tokenaddress'],
    ['DOGE', 'https://dogechain.info/address/tokenaddress'],
    ['LBC', 'https://explorer.lbry.com/address/tokenaddress'],
    ['ULTRA', 'https://explorer.mainnet.ultra.io/account/tokenaddress'],
    ['ARBITRUM', 'https://arbiscan.io/token/tokenaddress'],
    ['LUXOCHAIN', 'https://explorer.luxochain.io/token/tokenaddress'],
    ['ALGORAND', 'https://algoexplorer.io/asset/tokenaddress'],
    ['FTM', 'https://ftmscan.com/token/tokenaddress'],
    ['ORE', 'https://explorer.ore.network/account/tokenaddress'],
  ])('Should get the correct %s token link for the transaction', (blockchain, expected) => {
    const tokenAddress = 'tokenaddress'
    const ret = getCorrespondingTokenExplorerLinkByBlockchain(blockchain, tokenAddress)
    expect(ret).toStrictEqual(expected)
  })
})
