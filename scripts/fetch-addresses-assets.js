// NOTE: before run this scripts go to settings/swap-assets and change export default into module.exports =
const fs = require('fs')

const { NodeSelector } = require('ptokens-node-selector')
const { constants, helpers } = require('ptokens-utils')

const assets = require('../src/settings/swap-assets')

const start = async () => {
  try {
    const nodeSelector = new NodeSelector()
    await nodeSelector.fetchNodes('mainnet')

    const nodes = await Promise.all(
      assets.map(({ workingName, blockchain, network, skipNodeSelection }) => {
        if (skipNodeSelection) {
          return null
        }

        const { hostBlockchain, hostNetwork, nativeBlockchain, nativeNetwork } = helpers.parseParams(
          {
            pToken: workingName,
            blockchain: helpers.getBlockchainType(blockchain.toLowerCase()),
            network,
          },
          helpers.getNativeBlockchainFromPtokenName(workingName)
        )

        return new Promise((_resolve) =>
          nodeSelector
            .select({
              timeout: 20 * 1000,
              pToken: workingName.toLowerCase() === 'peth' ? 'pweth' : workingName.toLowerCase(),
              nativeBlockchain,
              nativeNetwork,
              hostBlockchain,
              hostNetwork,
            })
            .then(_resolve)
            .catch((_err) => {
              console.error(_err)
              _resolve(null)
            })
        )
      })
    )

    const pTokensAddresses = await Promise.all(
      nodes.map(
        (_node) =>
          new Promise((_resolve) =>
            _node
              ? _node
                  .getInfo()
                  .then(({ smart_contract_address, host_smart_contract_address }) => {
                    _resolve(
                      smart_contract_address
                        ? smart_contract_address
                        : host_smart_contract_address
                        ? host_smart_contract_address
                        : null
                    )
                  })
                  .catch((_err) => {
                    console.error(_err)
                    _resolve(null)
                  })
              : _resolve(null)
          )
      )
    )

    const assetsWithAddress = assets.map((_asset, _index) => {
      const nativeAddress = constants.tokens[helpers.getBlockchainType(_asset.blockchain)]
        ? constants.tokens[helpers.getBlockchainType(_asset.blockchain)][_asset.network][_asset.symbol]
        : null

      return {
        address: nativeAddress ? nativeAddress : pTokensAddresses[_index],
        ..._asset,
      }
    })

    fs.writeFileSync(
      './src/settings/swap-assets.js',
      `
      const swapAssets = ${JSON.stringify(assetsWithAddress)}

      export default swapAssets
    `
    )
  } catch (_err) {
    console.error(_err)
  }
  process.exit(0)
}

start()
