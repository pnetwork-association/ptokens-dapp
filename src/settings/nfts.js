const nfts = [
  {
    internalId: 'RAREBITBUNNIES_ON_ETH',
    name: 'Rarebit Bunnies',
    type: 'ERC1155',
    portalsAddress: '0x82a19ab3B463359bb07151d8De9b6630428EC7Cc',
    contractAddress: '0x61bd6B10C7bf3e548F8659d016079e099510a4Dc',
    symbol: 'RAREBITBUNNIES',
    isNative: true,
    blockchain: 'ETH',
    fromBlock: 11701037,
    loadDataKey: 'erc1155',
    supportedBlockchains: ['BSC']
  },
  {
    internalId: 'RAREBITBUNNIES_ON_BSC',
    name: 'Rarebit Bunnies',
    type: 'ERC1155',
    portalsAddress: '0xF6fD8bE7D3B9fd9B52f18f78a07963777383B898',
    contractAddress: '0xF6fD8bE7D3B9fd9B52f18f78a07963777383B898',
    symbol: 'RAREBITBUNNIES',
    isNative: false,
    blockchain: 'BSC',
    fromBlock: 6170510,
    loadDataKey: 'erc1155',
    supportedBlockchains: ['ETH']
  },
  {
    internalId: 'CHAINGUARDIANS_ON_ETH',
    name: 'Chain Guardians',
    type: 'ERC721',
    portalsAddress: '0x8CdA44DD19DaA90D9E20319d9a4e7731a7f9c56d',
    contractAddress: '0x3CD41EC039c1F2DD1f76144bb3722E7b503f50ab',
    symbol: 'CGT',
    isNative: true,
    blockchain: 'ETH',
    loadDataKey: 'cgt',
    supportedBlockchains: ['BSC'],
    baseUri: 'https://api.chainguardians.io/api/opensea'
  },
  {
    internalId: 'CHAINGUARDIANS_ON_BSC',
    name: 'Chain Guardians',
    type: 'ERC721',
    portalsAddress: '0x17D8214A8B81A0F55fcd4E401B098579Cb457008',
    contractAddress: '0x17D8214A8B81A0F55fcd4E401B098579Cb457008',
    symbol: 'pCGT',
    isNative: false,
    blockchain: 'BSC',
    loadDataKey: 'cgt',
    supportedBlockchains: ['ETH'],
    baseUri: 'https://api.chainguardians.io/api/opensea'
  }
]

export default nfts
