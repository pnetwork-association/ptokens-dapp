import { test, describe, expect } from 'vitest'
import { getCorrespondingTxExplorerLinkByBlockchain, getCorrespondingTokenExplorerLinkByBlockchain } from '../explorer'
import { Blockchain } from '../../constants'

describe('getCorrespondingTxExplorerLinkByBlockchain', () => {
  test.each([
    [Blockchain.Ethereum, 'https://etherscan.io/tx/txhash'],
    [Blockchain.XDAI, 'https://blockscout.com/poa/xdai/tx/txhash'],
    [Blockchain.Polygon, 'https://polygonscan.com/tx/txhash'],
    [Blockchain.BSC, 'https://bscscan.com/tx/txhash'],
    [Blockchain.EOS, 'https://bloks.io/tx/txhash'],
    [Blockchain.Telos, 'https://explorer.telos.net/transaction/txhash'],
    [Blockchain.Libre, 'https://lb.libre.org/v2/explore/transaction/txhash'],
    [Blockchain.Bitcoin, 'https://blockstream.info/tx/txhash'],
    [Blockchain.Litecoin, 'https://live.blockcypher.com/ltc/tx/txhash'],
    [Blockchain.Dogecoin, 'https://dogechain.info/tx/txhash'],
    [Blockchain.Ultra, 'https://explorer.mainnet.ultra.io/tx/txhash'],
    [Blockchain.Arbitrum, 'https://arbiscan.io/tx/txhash'],
    [Blockchain.Luxochain, 'https://explorer.luxochain.io/tx/txhash'],
    [Blockchain.Algorand, 'https://algoexplorer.io/tx/group/txhash'],
    [Blockchain.Fantom, 'https://ftmscan.com/tx/txhash'],
    [Blockchain.Ore, 'https://explorer.ore.network/tx/txhash'],
  ])('Should get the correct %s explorer link for the transaction', (blockchain, expected) => {
    const txHash = 'txhash'
    const ret = getCorrespondingTxExplorerLinkByBlockchain(blockchain, txHash)
    expect(ret).toStrictEqual(expected)
  })
})

describe('getCorrespondingTokenExplorerLinkByBlockchain', () => {
  test.each([
    [Blockchain.Ethereum, 'https://etherscan.io/token/tokenaddress'],
    [Blockchain.XDAI, 'https://blockscout.com/poa/xdai/address/tokenaddress'],
    [Blockchain.Polygon, 'https://polygonscan.com/address/tokenaddress'],
    [Blockchain.BSC, 'https://bscscan.com/token/tokenaddress'],
    [Blockchain.EOS, 'https://bloks.io/account/tokenaddress'],
    [Blockchain.Telos, 'https://explorer.telos.net/account/tokenaddress'],
    [Blockchain.Libre, 'https://lb.libre.org/v2/explore/account/tokenaddress'],
    [Blockchain.Bitcoin, 'https://blockstream.info/address/tokenaddress'],
    [Blockchain.Litecoin, 'https://live.blockcypher.com/ltc/address/tokenaddress'],
    [Blockchain.Dogecoin, 'https://dogechain.info/address/tokenaddress'],
    [Blockchain.Ultra, 'https://explorer.mainnet.ultra.io/account/tokenaddress'],
    [Blockchain.Arbitrum, 'https://arbiscan.io/token/tokenaddress'],
    [Blockchain.Luxochain, 'https://explorer.luxochain.io/token/tokenaddress'],
    [Blockchain.Algorand, 'https://algoexplorer.io/asset/tokenaddress'],
    [Blockchain.Fantom, 'https://ftmscan.com/token/tokenaddress'],
    [Blockchain.Ore, 'https://explorer.ore.network/account/tokenaddress'],
  ])('Should get the correct %s token link for the transaction', (blockchain, expected) => {
    const tokenAddress = 'tokenaddress'
    const ret = getCorrespondingTokenExplorerLinkByBlockchain(blockchain, tokenAddress)
    expect(ret).toStrictEqual(expected)
  })
})
