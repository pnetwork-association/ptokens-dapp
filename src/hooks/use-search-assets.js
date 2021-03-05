import { useMemo, useState } from 'react'

const useSearchAssets = _assets => {
  const [searchWord, setSearchWord] = useState('')

  const [assets] = useMemo(() => {
    return [
      _assets.filter(
        ({ name, blockchain, address }) =>
          name.toLowerCase().includes(searchWord.toLowerCase()) ||
          `${name} on ${blockchain}`.toLowerCase().includes(searchWord.toLowerCase()) ||
          (address && address.toLowerCase() === searchWord.toLowerCase())
      )
    ]
  }, [_assets, searchWord])

  return [assets, setSearchWord]
}

export { useSearchAssets }
