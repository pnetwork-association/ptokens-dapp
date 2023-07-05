import { Blockchain } from 'ptokens-constants'

const slicer = (_address: string) => `${_address.slice(0, 6)}...${_address.slice(_address.length - 4, _address.length)}`

const slicerByBlockchain = (_address: string | null, _blockchain: Blockchain) => {
  switch (_blockchain) {
    default: {
      return _address ? slicer(_address) : null
    }
  }
}

export { slicer, slicerByBlockchain }
