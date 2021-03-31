export const adapt = (_symbol, _data) => {
  switch (_symbol) {
    case 'RAREBIT': {
      const { image, attributes, name } = _data
      return {
        image: image.replace('ipfs://', 'https://gateway.ipfs.io/'),
        attributes,
        name
      }
    }
    default: {
      throw new Error('Invalid NFT symbol')
    }
  }
}
