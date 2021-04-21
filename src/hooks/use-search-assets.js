import { useMemo, useState } from 'react'

const useSearchAssets = _assets => {
  const [searchWord, setSearchWord] = useState('')

  const [assets] = useMemo(() => {
    return [
      _assets.filter(
        ({ name, nativeBlockchain, blockchain, address, symbol, coin }) =>
          name.toLowerCase().includes(searchWord.toLowerCase()) ||
          symbol.toLowerCase().includes(searchWord.toLowerCase()) ||
          (coin && coin.toLowerCase().includes(searchWord.toLowerCase())) ||
          nativeBlockchain.toLowerCase().includes(searchWord.toLowerCase()) ||
          `${name} on ${blockchain}`.toLowerCase().includes(searchWord.toLowerCase()) ||
          (address && address.toLowerCase() === searchWord.toLowerCase())
      )
    ]
  }, [_assets, searchWord])

  return [assets, setSearchWord]
}

export { useSearchAssets }
